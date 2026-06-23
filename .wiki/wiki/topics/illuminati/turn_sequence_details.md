---
title: "System Design: Turn Sequence and Phase Resolution Specification"
type: specification
tags: [rules, turn, phase, state-machine, timing]
confidence: high
volatility: warm
project: projecti
---

# System Design: Turn Sequence and Phase Resolution Specification

This document defines the formal software execution sequence for turn phases, player choices, timing windows, trade protocols, and interrupt structures in *Illuminati*. It is designed as a software spec to guide turn-state machine implementation.

---

## 1. Turn State Machine Overview

A game session cycles through players in a fixed queue order (counter-clockwise). Each player's turn is a state machine executing 7 distinct phases sequentially:

```
[Phase 1: COLLECT_INCOME]
          │
          ▼
[Phase 2: DRAW_CARD]
          │
          ▼
[Phase 3: ACTION_PHASE] (Consume Action Points)
          │
          ▼
[Phase 4: FREE_ACTIONS] (Declare non-cost activities)
          │
          ▼
[Phase 5: MONEY_TRANSFER] (Execute free adjacent transfers)
          │
          ▼
[Phase 6: FACTION_SPECIALS] (Resolve end-of-turn faction traits)
          │
          ▼
[Phase 7: MAINTENANCE] (Verify board state, trigger cleanup)
```

---

## 2. Detailed Phase Specifications & State Transitions

### 2.1 Phase 1: COLLECT_INCOME
*   **System Action**: 
    1. Scan the active player's Power Structure tree.
    2. For each node $N$, retrieve its static `Income` attribute.
    3. If $N.\text{Income} > 0$, increment $N.\text{Treasury}$ by $N.\text{Income}$ Megabucks (MB), drawing from the global Bank.
*   **Timing / Passive Resolution**:
    *   **I.R.S. (Passive)**: If another player controls the *I.R.S.* group, and it is the active player's income phase, deduct 2 MB from any of the active player's treasuries and add it to the *I.R.S.* treasury. If the active player has 0 MB total, skip deduction.
    *   **Post Office (Maintenance cost)**: If the active player controls the *Post Office*, deduct 1 MB from its treasury, its parent treasury, or the core Illuminati card treasury. If unpaid, set the *Post Office* (and all its child nodes) to the `Uncontrolled Area` before drawing.

### 2.2 Phase 2: DRAW_CARD
*   **System Action**:
    1. Pop the top card from the `Deck` stack.
    2. Read card `type` attribute:
        *   `type === 'Group'`: Push the card onto the `Uncontrolled Area` array.
        *   `type === 'Special'`: Push the card onto the active player's `Hand` array.
*   **Faction Mutator**:
    *   **The Network**: If the active player's faction is *The Network*, execute the pop action twice. Both Group cards go to the `Uncontrolled Area`, or Specials to the player's hand.

### 2.3 Phase 3: ACTION_PHASE
*   **System State Variables**:
    *   `action_points = 2`
*   **Loop Condition**: Execute while `action_points > 0` and the player has not declared a `Pass`.
*   **Allowed Operations**:
    *   **Attack to Control / Neutralize / Destroy** (Consumes 1 action point). Initiates the combat resolve pipeline (defined in [[rule_logic_spec|Rule Logic Spec]] ([Rule Logic Spec](rule_logic_spec.md))).
    *   **Transfer Money** (Consumes 1 action point). Moves any quantity of Megabucks between *any* two treasuries in the player's structure (need not be adjacent).
    *   **Move a Group** (Consumes 1 action point). Re-attaches a controlled group to a different open outward arrow in the player's structure.
    *   **Gift / Trade Group** (Consumes 1 action point per card transferred to another player).
    *   **Bribery / Special Action** (Consumes 1 action point if specified by the Special card text, e.g. *Bribery*).
*   **Pass Condition**: If `action_points === 2` and the player selects `Pass`:
    *   Deduct 2 action points.
    *   Add 5 MB to the player's core *Illuminati* card treasury from the Bank.
    *   Transition immediately to Phase 4.

### 2.4 Phase 4: FREE_ACTIONS
*   **System Action**: Allow the active player to execute any number of the following non-cost operations in any order:
    *   **Drop Group**: Choose a controlled group node $G$. Detach $G$ from its parent. Place $G$ and all its descendant nodes in the `Uncontrolled Area`. All money on those cards is returned to the Bank.
    *   **Play Special Card**: Select a Special card from `Hand`. Verify its timing constraints, resolve its logic, and move it to the `Discard Pile`.
    *   **Trade Resources**: Exchange cash (between Illuminati cards only) or Special cards with other players.

### 2.5 Phase 5: MONEY_TRANSFER
*   **System State Variables**:
    *   `free_transfers_remaining = 2`
*   **System Action**: While `free_transfers_remaining > 0`, the player can move any amount of money from treasury $A$ to treasury $B$ *if and only if* $A$ and $B$ share a direct parent-child edge in the Power Structure graph.
*   **State Update**: Decrement `free_transfers_remaining` by 1 per move action.

### 2.6 Phase 6: FACTION_SPECIALS
*   **System Action**: Execute logic for active faction end-of-turn abilities:
    *   **Gnomes of Zurich**: Reset money transfer limits; allow unlimited transfers of Megabucks between any card nodes in their Power Structure.
    *   **Bermuda Triangle**: Allow the player to drag and drop nodes to rearrange card control attachments, skipping the regular action-cost movement check. Open arrows and physical boundaries must still be respected.

### 2.7 Phase 7: MAINTENANCE
*   **System Action**:
    *   Count active items in the `Uncontrolled Area`.
    *   If `Uncontrolled Area.length < 3`:
        *   While count is $< 3$:
            *   Pop card $C$ from `Deck`.
            *   If $C.\text{type} === \text{'Group'}$, add to `Uncontrolled Area` and increment count.
            *   If $C.\text{type} === \text{'Special'}$, move $C$ directly to `Discard Pile` (Specials drawn during maintenance are lost).
    *   Evaluate all players' victory status via the victory checking algorithm.
    *   Increment the global turn tracker to transition active control to the next player in the queue.

---

## 3. Timing Windows & Special Card Interrupts

The game is highly asynchronous due to player interventions. The backend must enforce strict resolution priorities:

### 3.1 The Bidding and Roll Window
Whenever an attack is declared, the system opens a **Bidding Window**:
1.  **Declaration**: Attacker selects attacker node, target node, and type of attack.
2.  **Aiding**: Active player and opponents can declare supporting/opposing alignment cards.
3.  **Bidding Loop**: Players can click to spend MB to alter target roll numbers:
    *   Attacker spends MB $\rightarrow$ target roll increases by +1 per MB.
    *   Defender spends MB $\rightarrow$ if from target treasury, decreases target roll by -2 per MB; if from Illuminati treasury, decreases by -1 per MB.
    *   Interferers spend MB $\rightarrow$ alters roll by +1 or -1 depending on target recipient.
4.  **Special Interrupts**: Players can play Special cards (e.g. *Murphys Law*, *Deep Agent*) during the bidding loop.
5.  **Freeze / Commit**: The active player clicks "Roll Dice". The Bidding Window closes. No further inputs or money spends are accepted. Dice roll resolves.

### 3.2 Trade and Deal Binding Windows
*   **Immediate Action Deals**: If Player A agrees to give Player B 5 MB in exchange for a Special card *right now*, the transaction is executed automatically by the UI/backend. This deal is **binding**.
*   **Future Action Deals**: If Player A agrees to not attack Player B's *IRS* next turn if Player B pays 5 MB now, the money is transferred, but the promise is logged as a text contract. The game engine does **not** enforce the promise. It is **non-binding**.
