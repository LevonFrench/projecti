---
title: "Strategy & Tactics Guide"
type: reference
status: active
created: 2026-06-23
updated: 2026-06-23
confidence: high
volatility: warm
project: projecti
---

# Illuminati Strategy & Tactics Guide

Steve Jackson's *Illuminati* is a game of high player interaction, math-based combat, resource management, and social manipulation. Winning requires not just calculating attack rolls, but managing table threats, structuring networks defensively, and exploiting faction-specific traits.

This guide details the core tactical principles and faction strategies of the game, providing a framework for AI playstyles and balancing mechanics in our modern digital adaptation.

---

## 1. Faction-Specific Strategies

Each secret society has a unique passive ability and win condition. Playing a faction successfully requires leaning heavily into its specific mechanical advantages.

### 1.1 Bavarian Illuminati (The Dominator)
* **Goal**: Power sum of 35+
* **Strategy**: 
  * The Bavarians rely on raw strength. Their ability to declare a **Privileged Attack** (paying 5 MB) is the most powerful closing tool in the game.
  * Save the Privileged capability for the final turn to capture a game-winning group (such as the *Federal Reserve* or *Multinational Oil Co.*) when other players have pooled money to stop you.
  * Prioritize high-power, high-resistance cards to make your structure naturally immune to low-cost attack attempts.

### 1.2 Bermuda Triangle (The Network Shifter)
* **Goal**: 1 group of each of the 10 alignments (or 3 groups of 5 alignments)
* **Strategy**:
  * Bermuda is the most adaptive faction. Their ability to reorganize their control links at the end of the turn allows them to bypass the "overlapping cards" rule and optimize arrow placement.
  * Build a "wide" structure early. Capture groups with diverse alignments regardless of where they fit, then use **Spatial Reorganization** to link them into an optimal tree structure.
  * Shift high-defense groups to the front lines (adjacent to Bermuda) at the end of your turn, and shift high-income or weak groups to the back rows for protection.

### 1.3 Discordian Society (The Agent of Chaos)
* **Goal**: Control 5 *Weird* groups
* **Strategy**:
  * Discord's immunity to *Government* and *Straight* groups makes them incredibly hard to attack for factions like the Gnomes or the Bavarian Illuminati, who rely on those alignments.
  * Focus heavily on capturing and defending Weird groups (getting a +4 bonus). 
  * Use Weird alignments as a defensive wall: place Weird cards on your outer edges to block incoming attacks from Straight/Government-heavy opponents.

### 1.4 Gnomes of Zurich (The Slush Fund Capitalist)
* **Goal**: Accumulate 150 Megabucks
* **Strategy**:
  * Gnomes win by hoarding resources, not necessarily by capturing many cards.
  * Their **Slush Fund** ability allows them to move money freely at the end of the turn. This makes their money immune to targeted siphoning cards (like the *I.R.S.* or *White Collar Crime*) because they can consolidate their wealth onto high-resistance nodes.
  * Build high-income loops. Capture corporate giants and pass turns early to gather money. When attacked, distribute your massive wealth to defending nodes to make target rolls mathematically impossible for the attacker.

### 1.5 The Network (The Data Miner)
* **Goal**: Combined Transferable Power of 25+
* **Strategy**:
  * The Network draws two cards per turn, giving them unmatched card advantage and first access to powerful Special cards.
  * Prioritize groups that have **Transferable Power** (e.g., *Phone Company*, *Big Media*). These groups can assist in attacks anywhere on the board without needing to spend action points or be adjacent.
  * Build a highly cooperative structure where multiple nodes can pool their Transferable Power to take over or destroy target groups instantly.

### 1.6 Servants of Cthulhu (The World Ender)
* **Goal**: Destroy 8 group cards
* **Strategy**:
  * Cthulhu does not care about holding a massive structure; they care about body counts.
  * Leverage the **+2 destruction bonus** and choose alignments that are opposite to the target to gain a massive +4 combat bonus (since opposite alignments aid in destruction, unlike control).
  * Target weak, high-income cards controlled by other players. Destroying them cripples their economy while advancing your win condition.
  * Do not hesitate to destroy your own useless, low-defense groups if you need to reach your 8-card target.

### 1.7 Society of Assassins (The Silent Killer)
* **Goal**: Control 6 *Violent* groups
* **Strategy**:
  * The Assassins excel at neutralizing groups (+4 bonus). Neutralizing a card drops it to the Uncontrolled Area, removing it from the opponent's structure and stripping its money.
  * Target the root nodes of opponent branches. By neutralizing a key connector card, you force all its subordinate cards to become uncontrolled, instantly dismantling their structure.
  * Hoard Violent cards to fuel your win condition. Use their high attack stats to defend your perimeter.

### 1.8 UFOs (The Shape-shifter)
* **Goal**: Secret Goal (chosen from other factions' goals)
* **Strategy**:
  * Choose a goal that matches the layout of the deck or the factions in play. If Gnomes are in play and generating massive money, copying the Gnomes' money goal or Cthulhu's destruction goal can surprise the table.
  * Take advantage of **Multiple Operations** (making two attacks per turn). This gives you extreme tempo. You can neutralize a defender's shields with your first attack and capture them with your second.

### 1.9 Church of the SubGenius (The Slacker)
* **Goal**: Accumulate 100 Megabucks or a specific card count
* **Strategy**:
  * SubGenius turns failure into a resource. Whenever their cards are captured, neutralized, or destroyed, they receive 10 MB.
  * Bait opponents into attacking your weak, exposed outer nodes. Let them spend their valuable resources to capture a card, only for you to receive a massive cash injection that you can use to launch a counter-offensive.

---

## 2. Core Strategic Concepts

Regardless of your faction, several mathematical and structural concepts apply to all games:

### 2.1 Power Structure Topology: Tall vs. Wide

When building your tree, you face a trade-off between **defense** and **expansion**:

```
Tall Structure (Deep Tree):
[Illuminati] ──> [Node A (+10 Def)] ──> [Node B (+5 Def)] ──> [Node C (+2 Def)]

Wide Structure (Shallow Tree):
               ┌──> [Node A (+10 Def)]
[Illuminati]  ├──> [Node B (+10 Def)]
               └──> [Node C (+10 Def)]
```

* **The Tall Structure**:
  * *Pros*: Excellent defensive buffers. Deeper nodes are heavily protected by the proximity modifiers (+10, +5, +2).
  * *Cons*: Single point of failure. If an opponent successfully neutralizes *Node A*, both *Node B* and *Node C* are instantly detached and lost.
* **The Wide Structure**:
  * *Pros*: Resilient. Destroying or capturing one node does not impact the others. All primary nodes receive the maximum +10 defensive proximity modifier.
  * *Cons*: Arrow bottleneck. Illuminati cards only have 4 outward control arrows. Once those are filled, you must build deeper or stop expanding.

**Tactical Rule**: Build *wide* for your primary, high-income, or high-value cards, and build *tall* only when using low-value cards as temporary expansion slots.

### 2.2 Treasury Bidding War Management

Money is the ultimate equalizer in combat. Since 1 MB from a card's own treasury defends at **-2** to the roll (compared to -1 from the Illuminati treasury), local money is twice as efficient as central money.
* **Aggressor Baiting**: Before launching a major attack, initiate a "probe" attack on a minor card to force the defender to deplete their local treasury. Once their pockets are empty, launch your primary attack.
* **The Treasury Shield**: Always keep at least 2–4 MB directly on your most vulnerable outer nodes. The threat of a doubled defense modifier will deter casual attacks.

### 2.3 Threat Management and Table Talk

Because the victory check occurs at the end of every turn, a player who reaches their victory condition during their turn will not win if an opponent can dismantle their structure before the turn ends.
* **Fly Under the Radar**: Avoid looking like the leader. If you are close to winning, keep your winning cards in your hand (Plots) or leave them in the Uncontrolled Area until you can sweep them all up in a single, explosive turn.
* **Kingmaking**: If another player is about to win, the rest of the table must pool their money and actions to stop them. Use diplomacy to coordinate who spends their resources so you don't exhaust your own treasury.
