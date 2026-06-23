---
confidence: high
volatility: warm
project: projecti
---

# Illuminati Game Rules & System Architecture

This document serves as the comprehensive software design specification for the core mechanics, turn states, and math formulas of Steve Jackson's classic **Illuminati** card game. It is structured to act as a system design document for building the game from scratch.

---

## 1. System Entities & State Representation

### 1.1 Global State
1. **The Bank**: An infinite pool of Megabucks (MB) tokens.
2. **Uncontrolled Area**: A shared pool of face-up Group cards on the table.
3. **Dead Pile**: Card graveyard for destroyed Group cards.
4. **Turn Tracker**: Active player index, cycling counter-clockwise.
5. **Deck**: Shuffled pile of Group and Special cards.

### 1.2 Card Entities
All cards are represented by unique IDs and fall into three categories:

#### A. Illuminati Cards (Factions)
*   **Attributes**: Name, Power (A/B format, e.g., 10/10 where the second number is Transferable Power), Income, Special Ability, Victory Condition.
*   **Constraints**: Have no Resistance (cannot be attacked directly), no inward control arrow, and four outward control arrows.

#### B. Group Cards (Puppets)
*   **Attributes**: Name, Power (or Power/Transferable Power), Resistance, Income, Alignments, Special Ability (if any).
*   **Node Structure**: 
    *   **Inward Arrow**: Exactly one (located on top, left, bottom, or right).
    *   **Outward Arrows**: Between zero and three. Used to control subordinates.

#### C. Special Cards (Actions)
*   **Attributes**: Name, Activation Timing, Text Effect.
*   **Constraints**: One-time use, kept face-down or face-up in a player's private hand, do not count against the hand limit (no hand limit exists, but count must be visible to opponents).

### 1.3 Player State
*   **Active Faction**: The player's assigned Illuminati card.
*   **Power Structure**: A directed tree graph rooted at the player's Illuminati card. Nodes are Group cards; edges represent control arrows.
*   **Treasury**: Megabucks tokens placed directly on individual card nodes. Money in the game is decentralized (e.g., money on the *CIA* belongs to the *CIA*'s treasury, not the player's central *Illuminati* treasury).
*   **Hand**: Owned Special cards.

---

## 2. Turn State Machine (Sequence of Play)

A single player's turn is divided into seven sequential phases. The state machine must resolve these phases deterministically:

```
[Phase 1: Collect Income]
          │
          ▼
[Phase 2: Draw Card]
          │
          ▼
[Phase 3: Action Phase] (2 Actions Allowed)
          │
          ▼
[Phase 4: Free Actions]
          │
          ▼
[Phase 5: Money Transfer Phase]
          │
          ▼
[Phase 6: Faction Special Ability Phase]
          │
          ▼
[Phase 7: Board Maintenance]
```

### Phase 1: Collect Income
*   **Trigger**: Start of turn.
*   **Resolution**: Loop through all active nodes in the player's Power Structure. For each node with a positive Income value, transfer that amount of Megabucks (MB) from the Bank directly onto that card.
*   **Special Card Rules**:
    *   **I.R.S.**: During the owning player's income phase, the player tax each opponent 2 MB. Tax money is siphoned from any of the opponent's treasuries and placed on the I.R.S. card. If an opponent has 0 MB across their structure, they pay nothing.
    *   **Post Office**: Costs 1 MB per turn to maintain. The owner must pay 1 MB from the Post Office's treasury, its master's treasury, or the Illuminati treasury. If unpaid, the Post Office becomes uncontrolled.

### Phase 2: Draw Card
*   **Resolution**: Draw the top card from the Deck.
    *   **If Group Card**: Place it face-up in the Uncontrolled Area.
    *   **If Special Card**: Add it to the active player's private hand.
    *   *Note*: The Network draws and turns over two cards during this phase.

### Phase 3: Action Phase
*   **Resolution**: The player has exactly **two regular action points**. They may spend them on:
    1.  **Attack to Control** (Costs 1 action)
    2.  **Attack to Neutralize** (Costs 1 action)
    3.  **Attack to Destroy** (Costs 1 action)
    4.  **Transfer Money** (Costs 1 action)
    5.  **Move a Group** (Costs 1 action)
    6.  **Transfer Group (Gift/Trade)** (Each group card transferred counts as 1 action for the player whose turn it is).
    *   *Passing Option*: A player may declare a Pass (spending no actions, free actions, or transfers) to immediately collect 5 MB from the Bank and place it on their Illuminati card treasury.

### Phase 4: Free Actions
*   **Resolution**: The player may execute any number of free actions. These do not cost action points and can be performed before, between, or after regular actions:
    *   *Drop Group*: Return a controlled group (and all its sub-nodes) to the Uncontrolled Area.
    *   *Play Special Card*: Activate a Special card from the hand (except Bribery, which costs a regular action).
    *   *Give/Trade Special Cards/Cash*: Trade resources with another player.

### Phase 5: Money Transfer Phase
*   **Resolution**: The player may make up to **two free money transfers**.
    *   *Rule*: Money can only be moved between adjacent (connected) card nodes in the player's Power Structure tree.
    *   *Note*: Moving money as a regular action during Phase 3 allows unlimited transfers, but Phase 5 is capped at two.

### Phase 6: Faction Special Ability Phase
*   **Resolution**: Factions with end-of-turn abilities resolve them now:
    *   **Gnomes of Zurich**: Can redistribute money freely between any treasuries in their Power Structure.
    *   **Bermuda Triangle**: Can reorganize their Power Structure tree layout freely (re-linking cards to open arrows, provided arrows and overlaps permit).

### Phase 7: Board Maintenance
*   **Resolution**: Count the cards in the Uncontrolled Area. If there are fewer than three, draw cards from the deck until there are exactly three. If any Special cards are drawn during this catch-up phase, discard them immediately.

---

## 3. Attack Mechanics & Conflict Resolution

Attacks are the primary conflict engine. An attack involves an **Attacker Node** (initiator), a **Target Node**, and optional **Aiding Nodes** and **Treasury Spending**.

### 3.1 Attack Restrictions
*   An attacking Group node must have at least one open outward-pointing control arrow to execute an *Attack to Control*.
*   No group node (except the UFOs) can attack or aid an attack more than once per turn.
*   Illuminati cards can attack, but cannot be targeted by attacks.

### 3.2 The Core Bidding & Math Formulas

To resolve an attack, the game calculates a **Target Roll (TR)** value. The player must roll less than or equal to this target number on **2d6** to succeed.

$$\text{Success Condition: } \text{Roll}(2d6) \le \text{Target Roll (TR)}$$

#### Formula A: Attack to Control
$$\text{TR} = \text{Attacker Power} + \text{Alignment Modifiers} + \text{Attacking Treasury Spending} + \text{Aiding Power} - \text{Target Resistance} - \text{Defending Treasury Spending} - \text{Defending Power Structure Modifiers}$$

#### Formula B: Attack to Neutralize
Identical to Attack to Control, but the attacker receives a flat **+6 bonus** to the calculation, and does not require an open control arrow.
$$\text{TR} = \text{Formula A Math} + 6$$

#### Formula C: Attack to Destroy
The defending node defends with its **Power** rather than its Resistance. Does not require an open control arrow.
$$\text{TR} = \text{Attacker Power} + \text{Destruction Alignment Modifiers} + \text{Attacking Treasury} + \text{Aiding Power} - \text{Target Power} - \text{Defending Treasury} - \text{Defending Power Structure Modifiers}$$

---

### 3.3 Variable Modifiers Breakdown

#### 1. Alignment Modifiers
*   **Attack to Control / Neutralize**:
    *   **Identical Alignments**: **+4** to Attacker Power per match.
    *   **Opposing Alignments**: **-4** from Attacker Power per opposite pair.
*   **Attack to Destroy**:
    *   **Identical Alignments**: **-4** from Attacker Power per match (like-minded groups protect each other).
    *   **Opposing Alignments**: **+4** to Attacker Power per opposite pair (differing philosophies make destruction easier).
*   *Special Cases*:
    *   **Fanatics**: Opposite to all other Fanatics (+4 to destroy, -4 to control).
    *   **Criminal/Media**: Criminal has no opposite. Media has no opposite; however, Media gets +4 when trying to control or destroy another Media card.

#### 2. Power Structure Position Modifier (Defending Bonus)
If the target card is already controlled by an opponent, it receives a defensive bonus to its Resistance (or defending Power) based on its structural distance from the opponent's Illuminati card:
*   **Adjacent (1 link away)**: **+10 Defense**
*   **1 Card Away (2 links away)**: **+5 Defense**
*   **2 Cards Away (3 links away)**: **+2 Defense**
*   **3+ Cards Away**: **0 Defense**

```
[Illuminati] ──(+10)──> [Group A] ──(+5)──> [Group B] ──(+2)──> [Group C] ────> [Group D]
```

#### 3. Treasury Spending Bidding War
Players can spend Megabucks to alter the roll target:
*   **Attacker Spending**: Each 1 MB spent from the *attacking card's treasury* or the player's *Illuminati treasury* adds **+1** to the Target Roll.
*   **Defender Spending**: If targeted, the defending player can spend MB to lower the target roll:
    *   Each 1 MB spent from the *defending card's own treasury* counts double (**-2** to the Target Roll).
    *   Each 1 MB spent from the defender's *Illuminati treasury* counts single (**-1** to the Target Roll).
*   **Interference (Other Players)**: Other players at the table can intervene by contributing money from their *Illuminati treasury only*. Each 1 MB spent changes the Target Roll by **+1** or **-1** (player specifies whom they are aiding).
*   **Resolution of Bidding**: The bidding goes back and forth. No money can be spent after the dice are rolled. All spent money goes to the Bank.

#### 4. Transferable Power (Aiding Attacks)
*   An allied node with Transferable Power (e.g. stats 7/4, where 4 is transferable power) can add its power value directly to the attack.
*   *Condition*: The aiding card must not have declared an attack of its own this turn. All aiding declarations must be made at the start of the attack, before any money is spent.

#### 5. Absolute Failure Rule
*   Regardless of how high the final Target Roll calculation is (e.g. TR is 15), a dice roll of **11 or 12 is an automatic failure**.
*   A roll of **2 is an automatic success**, provided the calculated target roll is at least 2.

---

### 3.4 Attack Resolutions

*   **Attack to Control Success**:
    *   The target card and all its subordinate puppets are attached to the attacker's Power Structure.
    *   The target's inward arrow must line up with the capturing node's open outward arrow.
    *   **Treasury Capture**: Half of the Megabucks (round down) residing on the captured cards remain on them; the other half is returned to the Bank.
    *   **Treasury Injection**: The capturing card can immediately transfer any amount of its own treasury to the newly captured card.
    *   **Overlap Conflict**: If adding the card causes physical card overlapping, the player may rearrange subordinate nodes. Any card that cannot fit without overlapping must be dropped to the Uncontrolled Area.
*   **Attack to Neutralize Success**:
    *   The target card and all its subordinate cards are detached and placed in the Uncontrolled Area.
    *   All money on the neutralized cards is returned to the Bank.
*   **Attack to Destroy Success**:
    *   The target card is sent to the Dead Pile.
    *   All subordinate cards controlled by the destroyed card become uncontrolled (placed in the Uncontrolled Area).
    *   All money on the destroyed card goes to the Bank.

---

## 4. Diplomatic, Trade, and Action Restrictions

### 4.1 Privilege
*   An attack can be declared **Privileged** at its launch.
*   **Trigger**: The attacker discards any one Special card from their hand (or the Bavarian Illuminati uses their faction ability by paying 5 MB).
*   **Effect**: No other player can interfere with this attack (no money can be spent by outside players for or against the roll).
*   **Counter-Play**: The privilege status can be abolished if another player plays the *Deep Agent* special card or discards any two Special cards.

### 4.2 Trade and Gift Protocols
*   Players can trade money, Special cards, and Group cards.
*   **Timing**: Money and Special cards can be traded at any time (except during a privileged attack).
*   **Cash Limits**: Cash can only be transferred directly between Illuminati treasuries. Controlled groups cannot give or receive money during trades.
*   **Group Trades**: Group cards can only be traded if it is the turn of one of the players involved in the transaction. Each group card exchanged costs **1 action point** to the active player.

### 4.3 Deal Binding Rule
*   Deals are only legally binding in-game if they can be executed **immediately** (e.g., trading a card for 5 MB right now).
*   Deals involving future promises (e.g., "I won't attack you next turn if you give me 5 MB now") are **not binding**. Players are free to break future promises, reflecting the duplicitous nature of the game.

---

## 5. End States & Victory Conditions

At the end of every turn (including other players' turns), the system checks for victory:

### 5.1 Player Elimination
A player is eliminated from the game if, at any time after their third turn, they control **no groups except their core Illuminati card**. Their money is returned to the Bank.

### 5.2 Victory Conditions
A player wins if they satisfy either condition at the end of a turn:

1.  **The Basic Goal (Structure Size)**: Controls a set number of groups. This target is determined at the start of the game based on the player count:
    *   **2 Players**: 13 Groups
    *   **3 Players**: 12 Groups
    *   **4 Players**: 10 Groups
    *   **5 Players**: 9 Groups
    *   **6 Players**: 8 Groups
    *   **7-8 Players**: 8 Groups
2.  **The Special Goal (Faction-Specific)**: Meets their faction's unique, asymmetric goal (e.g., Gnomes of Zurich amassing 150 MB, Servants of Cthulhu destroying 8 groups).
