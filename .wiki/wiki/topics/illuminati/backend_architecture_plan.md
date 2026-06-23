---
title: "System Design: Backend Architecture and Real-Time Protocol Specification"
type: specification
tags: [backend, database, websocket, schema, multiplayer]
confidence: high
volatility: warm
project: projecti
---

# System Design: Backend Architecture and Real-Time Protocol Specification

This document details the backend system design, database schemas, real-time sync protocols, and event-driven state transitions required to support a multiplayer online session of the *Illuminati* card game.

---

## 1. System Topology & Backend Tech Stack

To manage the complex bidding wars and real-time diplomatic negotiations, the system uses an event-driven, stateful server architecture.

```
┌──────────────┐           ┌──────────────┐
│  Web Client  │◄─────────►│  WebSockets  │
└──────────────┘           └──────┬───────┘
                                  │ (JSON Events)
                                  ▼
                          ┌──────────────┐
                          │  Game Engine │
                          │  (Stateful)  │
                          └──────┬───────┘
                                  │ (Sync / Save)
                                  ▼
                          ┌──────────────┐
                          │  Redis Cache │ (Hot state cache)
                          └──────┬───────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │  PostgreSQL  │ (Relational DB)
                          └──────────────┘
```

*   **Runtime Environment**: Node.js with TypeScript.
*   **State Cache**: Redis. Used to store active match states with millisecond-level responsiveness for bidding events.
*   **Persistent Storage**: PostgreSQL. Tracks card registries, user authentication, match histories, and audit logs.
*   **Communication**: WebSocket (ws) for real-time bidirectional state updates.

---

## 2. Database Schema Design (PostgreSQL)

```sql
-- User accounts
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Active and archived match sessions
CREATE TABLE matches (
    match_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(20) NOT NULL, -- 'PENDING', 'ACTIVE', 'COMPLETED'
    player_count INT NOT NULL,
    current_turn_index INT DEFAULT 0,
    current_phase VARCHAR(20) DEFAULT 'COLLECT_INCOME',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player participation in matches
CREATE TABLE match_players (
    match_player_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(match_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id),
    faction_id VARCHAR(50) NOT NULL, -- e.g., 'bavarian'
    turn_order INT NOT NULL,
    eliminated BOOLEAN DEFAULT FALSE,
    UNIQUE(match_id, turn_order)
);

-- Chronological log of all events for replay and audits
CREATE TABLE match_events (
    event_id BIGSERIAL PRIMARY KEY,
    match_id UUID REFERENCES matches(match_id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    player_order_index INT NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'ATTACK_DECLARED', 'BID_PLACED', 'CARD_CAPTURED'
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Real-Time WebSocket API Protocol (JSON Payloads)

All operations are transmitted as JSON payloads over a WebSocket connection.

### 3.1 Client-to-Server Commands

#### A. Declare Attack (`ATTACK_DECLARE`)
Sent by the active player to initiate the bidding window for an attack.
```json
{
  "action": "ATTACK_DECLARE",
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "payload": {
    "attackerNodeId": "uuid-fbi-node",
    "targetNodeId": "uuid-bigmedia-node",
    "attackType": "CONTROL", -- 'CONTROL', 'NEUTRALIZE', 'DESTROY'
    "arrowLocation": "RIGHT" -- for CONTROL type
  }
}
```

#### B. Place Bid (`BID_PLACE`)
Sent by any player during the bidding loop to inject money from a treasury into the roll calculation.
```json
{
  "action": "BID_PLACE",
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "payload": {
    "sourceNodeId": "uuid-fbi-node", -- or the player's core Illuminati card node ID
    "amount": 2, -- Megabucks spent
    "targetAlignmentAid": "ATTACK" -- 'ATTACK' (helps attacker) or 'DEFENSE' (helps defender)
  }
}
```

#### C. Transfer Cash (`CASH_TRANSFER`)
Sent to move cash within the player's structure.
```json
{
  "action": "CASH_TRANSFER",
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "payload": {
    "sourceNodeId": "uuid-illuminati-card",
    "destinationNodeId": "uuid-fbi-node",
    "amount": 5
  }
}
```

#### D. End Phase (`PHASE_END`)
Sent to notify the engine that the player is ready to transition to the subsequent phase.
```json
{
  "action": "PHASE_END",
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "payload": {
    "currentPhase": "ACTION_PHASE"
  }
}
```

---

### 3.2 Server-to-Client Broadcasts

#### A. State Sync Broadcast (`MATCH_STATE_SYNC`)
Sent to all players whenever the match state changes.
```json
{
  "event": "MATCH_STATE_SYNC",
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "state": {
    "currentTurn": 2,
    "activePlayerIndex": 0,
    "phase": "ACTION_PHASE",
    "uncontrolledArea": [
      { "nodeId": "uuid-bigmedia", "cardId": "big_media", "treasury": 0 }
    ],
    "deadPile": [],
    "players": [
      {
        "userId": "uuid-user-1",
        "faction": "bavarian",
        "treasuryTotal": 14,
        "powerStructure": {
          "nodeId": "uuid-bavaria-root",
          "cardId": "bavarian_illuminati",
          "treasury": 10,
          "outwardArrows": {
            "RIGHT": {
              "nodeId": "uuid-fbi-node",
              "cardId": "fbi",
              "treasury": 4,
              "outwardArrows": {}
            }
          }
        }
      }
    ],
    "biddingState": null -- Contains active attack details, aids, and spent cash during combat resolution
  }
}
```

---

## 4. Live Match State Schema (Redis Cache JSON)

The live match state cached in Redis follows this schema for rapid state checks:
```json
{
  "matchId": "d3b07384-d113-49d5-a83d-e4c1cf604085",
  "deck": ["cia", "fbi", "kkk", "big_media", "angel_feather"],
  "uncontrolledArea": [
    { "nodeId": "uuid-bigmedia", "cardId": "big_media", "treasury": 0 }
  ],
  "deadPile": [],
  "turn": {
    "activePlayerIndex": 0,
    "phase": "ACTION_PHASE",
    "actionsRemaining": 2
  },
  "biddingWindow": {
    "attackerNodeId": "uuid-bavaria-root",
    "targetNodeId": "uuid-bigmedia",
    "type": "CONTROL",
    "arrowLocation": "RIGHT",
    "bids": [
      { "playerId": "uuid-user-1", "nodeId": "uuid-bavaria-root", "amount": 3, "target": "ATTACK" }
    ],
    "aids": [],
    "privilegeStatus": "STANDARD" -- 'STANDARD', 'PRIVILEGED'
  }
}
```
"
