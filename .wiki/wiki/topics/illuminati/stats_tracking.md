---
title: "System Design: State Tracking and Treasury Specifications"
type: specification
tags: [state, database, statistics, graph, treasury]
confidence: high
volatility: warm
project: projecti
---

# System Design: State Tracking and Treasury Specifications

This document defines the data structures and algorithms required to represent a player's Power Structure, track decentralized card treasuries, and calculate dynamic modifications to card stats (Power, Resistance, Income).

---

## 1. Power Structure Representation (Graph Representation)

A player's Power Structure is represented as a **directed tree graph** $T = (V, E)$ rooted at the player's core Illuminati card.

### 1.1 Node Data Structure (`CardNode`)
Each node $v \in V$ contains the following state attributes:
```json
{
  "nodeId": "unique-uuid",
  "cardId": "cia",
  "treasury": 12,
  "inwardArrow": "TOP", 
  "outwardArrows": {
    "LEFT": null,
    "RIGHT": "unique-uuid-child1",
    "BOTTOM": null
  }
}
```

### 1.2 Structural Rules & Graph Constraints
1.  **Exactly One Parent**: For all nodes $v$ except the root (Illuminati card), there exists exactly one inward control edge: $\text{indegree}(v) = 1$.
2.  **Root Constraints**: The root node $R$ (Illuminati card) has $\text{indegree}(R) = 0$ and exactly 4 outward arrows (`TOP`, `RIGHT`, `BOTTOM`, `LEFT`).
3.  **Outward Arrow Mapping**: Subordinate nodes are attached to specific outward arrows of their parent node. A node can have between 0 and 3 outward arrows depending on its card attributes.
4.  **No Cycles**: The graph must contain no cycles. Standard tree-traversal algorithms (DFS/BFS) are used to update node states.

---

## 2. Dynamic Stat Calculations

Cards have static base attributes printed on them. However, their active attributes are evaluated dynamically at runtime based on the game state.

### 2.1 Power Calculation
A card's active power $P_{\text{active}}$ is calculated as:

$$P_{\text{active}} = P_{\text{base}} + \Delta P_{\text{alignments}} + \Delta P_{\text{artifacts}} + \Delta P_{\text{specials}}$$

*   **Base Power** ($P_{\text{base}}$): Static power value (e.g., $6$ for *FBI*).
*   **Alignment Modifiers** ($\Delta P_{\text{alignments}}$): Alignment-specific bonuses from other cards in the structure. E.g., if another card in the structure grants $+2$ Power to all *Violent* cards, and the node is *Violent*, add $2$.
*   **Artifact Modifiers** ($\Delta P_{\text{artifacts}}$): Buffs from equipped items.
*   **Special Modifiers** ($\Delta P_{\text{specials}}$): Temporary buffs from active Special plot cards.

### 2.2 Resistance Calculation
Active Resistance $R_{\text{active}}$ is calculated dynamically when the card is attacked:

$$R_{\text{active}} = R_{\text{base}} + \Delta R_{\text{defense\_bonus}} + \Delta R_{\text{special\_modifiers}}$$

*   **Base Resistance** ($R_{\text{base}}$): Static resistance (e.g., $5$ for *Clipper Chip*).
*   **Power Structure Defense Bonus** ($\Delta R_{\text{defense\_bonus}}$): Calculated by traversing the tree to find the node's distance $d$ from the root Illuminati card:
    *   $d = 1$ (directly attached to Illuminati card): $+10$ Defense.
    *   $d = 2$ (one node between card and Illuminati card): $+5$ Defense.
    *   $d = 3$ (two nodes between card and Illuminati card): $+2$ Defense.
    *   $d \ge 4$: $0$ Defense.

---

## 3. Decentralized Treasury Specification

Unlike typical games with a central player bank, money in *Illuminati* is siphoned into local card treasuries. The backend must enforce decentralized transaction logic:

### 3.1 Treasury States
*   Each `CardNode` has a non-negative integer attribute `treasury`.
*   All additions/deductions must target a specific node ID's treasury.

### 3.2 Transaction Enforcement Rules
1.  **Local vs. Global Cash**: When a player spends money to aid/interfere in an attack, or play a card, they must specify the *source* node:
    *   *Illuminati Card Treasury*: Can be spent on *any* action or attack by the player, and can be given to other players during trades.
    *   *Group Card Treasury*: Can only be spent to:
        *   Fund an attack initiated by that *specific* Group card.
        *   Defend that *specific* Group card when it is targeted by an opponent's attack (counts double: $1$ MB spent = $-2$ to target roll).
2.  **Adjacency Money Transfers (Free Phase)**: During Phase 5 (Money Transfer), money can only be transferred between adjacent nodes:
    *   $\text{transfer}(A, B)$ is valid if and only if $A$ is the parent of $B$, or $B$ is the parent of $A$.
3.  **Action Money Transfers (Action Phase)**: Spending 1 action point to transfer money allows the player to move cash between *any* two nodes in their structure, bypassing adjacency checks.
4.  **Treasury Division on Capture**: When a card $C$ is successfully controlled by an opponent:
    *   $C.\text{treasury} = \lfloor C.\text{treasury} / 2 \rfloor$.
    *   The remaining half of the treasury is returned to the Bank.
    *   All cards controlled by $C$ (its sub-tree) undergo the same division: $S.\text{treasury} = \lfloor S.\text{treasury} / 2 \rfloor$ for all $S$ in the sub-tree.
