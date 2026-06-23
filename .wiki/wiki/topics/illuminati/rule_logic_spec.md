---
title: "System Design: Rule Logic and Roll Calculation Specification"
type: specification
tags: [rules, math, algorithm, conflict, combat]
confidence: high
volatility: warm
project: projecti
---

# System Design: Rule Logic and Roll Calculation Specification

This document maps out the mathematical formulas, lookup tables, and logical flowcharts required to resolve attacks, calculate target rolls, evaluate alignments, and update node hierarchies.

---

## 1. The Dice Roll Success Rule

*   All conflict is resolved using a **2d6 roll**.
*   Let $TR$ be the calculated **Target Roll** (success threshold).
*   **Automatic Failure**: Any roll of **11 or 12** is an automatic failure, regardless of how high $TR$ is.
*   **Automatic Success**: A roll of **2** is an automatic success, provided the final calculated target roll $TR \ge 2$.
*   **Standard Resolution**: The roll succeeds if the rolled value $D \le TR$.

---

## 2. Attack Math Formulas

### 2.1 Attack to Control
The Target Roll ($TR$) calculation is:

$$TR = P_{\text{attacker}} + M_{\text{alignments}} + B_{\text{attacker}} + P_{\text{aids}} - R_{\text{target}} - B_{\text{defender}} - D_{\text{distance\_defense}}$$

Where:
*   $P_{\text{attacker}}$: Active power of the attacking node.
*   $M_{\text{alignments}}$: Net alignment modifier.
*   $B_{\text{attacker}}$: Megabucks spent by the attacker (from attacker card's treasury or Illuminati treasury).
*   $P_{\text{aids}}$: Sum of Transferable Power from aiding friendly cards.
*   $R_{\text{target}}$: Base Resistance of the target card.
*   $B_{\text{defender}}$: Defensive bidding score. Equal to $2 \times (\text{MB spent from target treasury}) + 1 \times (\text{MB spent from defender Illuminati treasury})$.
*   $D_{\text{distance\_defense}}$: Defensive structural bonus (0, 2, 5, or 10) if the target is controlled by an opponent.

---

### 2.2 Attack to Neutralize
Identical to Attack to Control, but the attacker does not need an open control arrow, and receives a flat **+6 bonus** to the calculation:

$$TR = P_{\text{attacker}} + M_{\text{alignments}} + B_{\text{attacker}} + P_{\text{aids}} - R_{\text{target}} - B_{\text{defender}} - D_{\text{distance\_defense}} + 6$$

---

### 2.3 Attack to Destroy
The defending node defends with its active **Power** instead of its Resistance. Does not require an open control arrow:

$$TR = P_{\text{attacker}} + M_{\text{destruction\_alignments}} + B_{\text{attacker}} + P_{\text{aids}} - P_{\text{target}} - B_{\text{defender}} - D_{\text{distance\_defense}}$$

---

## 3. Modifier Evaluation Logic

### 3.1 Alignment Modifier Matrix ($M_{\text{alignments}}$)
Alignments are checked between the **Attacking Node** and the **Target Node**:

*   **Attack to Control / Neutralize**:
    *   For each alignment $A_i$ shared by both cards: $+4$ modifier.
    *   For each alignment $A_j$ of the attacker that is the *opposite* of an alignment on the target: $-4$ modifier.
*   **Attack to Destroy**:
    *   For each alignment $A_i$ shared by both cards: $-4$ modifier (like-minded cards protect each other).
    *   For each alignment $A_j$ of the attacker that is the *opposite* of an alignment on the target: $+4$ modifier (ideological opposites destroy each other).

#### Alignment Opposites Table
```
Alignment       Opposite Alignment
----------------------------------
Government      Weird
Conservative    Liberal
Violent         Peaceful
Straight        Weird
Criminal        (No opposite)
Fanatic         Fanatic (Fanatics are opposite to ALL other Fanatics)
Media           (No opposite. Note: Media receives +4 to control/destroy Media)
```

---

## 4. Hierarchy Modification Algorithms

When an attack succeeds, the system must update the directed tree graphs:

### 4.1 Capture Node Routine (`resolveCapture`)
```
Input: AttackingNode A, TargetNode T, ArrowLocation arrow
1. If T is controlled by an opponent:
    a. Detach T from its current parent node.
    b. For each Node N in T's sub-tree (descendants):
        i. Divide N.treasury by 2 (round down).
    c. Remove T and its sub-tree from the opponent's Power Structure list.
2. If T is in the Uncontrolled Area:
    a. Remove T from Uncontrolled Area list.
3. Attach T's inwardArrow to A's outwardArrows[arrow].
4. Add T and its sub-tree to A's player's Power Structure.
5. Check for card overlap conflicts:
    a. If overlaps occur:
        i. Trigger UI overlap resolution mode.
        ii. Drop unresolved overlapping descendant nodes to Uncontrolled Area.
```

### 4.2 Neutralize Node Routine (`resolveNeutralize`)
```
Input: TargetNode T
1. Detach T from its parent node.
2. For each Node N in T's sub-tree (T plus all descendants):
    a. Set N.treasury = 0 (money returns to the Bank).
    b. If N !== T:
        i. Keep N attached as a child of its parent (T's structure remains intact).
3. Move T and all its descendants to the Uncontrolled Area list.
4. Remove T and descendants from the player's Power Structure.
```

### 4.3 Destroy Node Routine (`resolveDestroy`)
```
Input: TargetNode T
1. Detach T from its parent node.
2. Set T.treasury = 0.
3. Move T to the Dead Pile list.
4. For each immediate child node C of T:
    a. Run resolveNeutralize(C). (Subordinate cards become uncontrolled, but their trees remain intact).
```
