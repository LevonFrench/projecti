---
title: "Classic Boxed Game Expansions"
type: reference
status: active
created: 2026-06-23
updated: 2026-06-23
confidence: high
volatility: warm
project: projecti
---

# Steve Jackson's Illuminati Classic Expansions

The original 1982 *Illuminati* boxed game expanded significantly over the decades. What began as a pocket-sized game grew into a complex strategy ecosystem with new mechanics, group designations, and custom win conditions.

This document breaks down the mechanical additions introduced in each expansion of the classic boxed game, which provides critical design references for modular expansions in our digital adaptation.

---

## 1. Pocket Box Expansions (1982–1985)

Before the release of the Deluxe Edition, the original black-and-white Pocket Box edition received four expansion sets. These sets introduced the extra cards and rules that would form the foundation of the modern version.

### 1.1 Expansion Set 1 (1982)
* **Scope**: Introduced 24 new Group cards and 4 new Special cards.
* **Key Additions**: Added iconic groups like the *Congressional Wives*, *Yuppies*, and the *Pentagon*, which gave the Government and Corporate alignments stronger footholds in the early meta.

### 1.2 Expansion Set 2 (1983)
* **Scope**: Introduced another 24 Group cards and 4 Special cards.
* **Key Additions**: Included the *Orbital Mind Control* and the *Men in Black*. This set also established the "alignment-shifting" themes that would later be codified in the Brainwash expansion.

### 1.3 Expansion Set 3: Brainwash (1985)
This was the most mechanically significant expansion in the game's history. It did not just add cards; it modified the core game rules by introducing three major systems:

#### A. The Brainwash Mechanic
Normally, a player can only Control, Neutralize, or Destroy a group. The Brainwash action allows a player to rewrite a group's core identity:
* **Action**: Costs **1 regular action point** to initiate an attack to Brainwash.
* **Objective**: Alter one or more alignments on a target Group card (e.g., changing a *Liberal* group into a *Conservative* group, or adding the *Criminal* alignment).
* **Bidding & Math**: Similar to an Attack to Control, but the rolling player targets the group's Resistance and spends money to override its philosophy.
* **Visual Representation**: The expansion included a board with tracks for each alignment, using custom tokens to track what shifts had been applied to groups.

#### B. Propaganda
* Shifting public opinion across the entire board. By spending resources on a general "Propaganda Campaign," a player could temporarily weaken the Resistance of all groups of a specific alignment (e.g., making all *Weird* groups easier to control) or make it impossible for certain opposite alignments to form alliances.

#### C. Official "Media" Card Designation
* Prior to this, media cards (like Big Media, Tabloids, TV Preachers) were treated as standard groups. The expansion officially designated a class of **Media Groups**, giving them a global rules modifier:
  * Media groups receive a flat **+4 bonus** on any attempt to control, neutralize, or destroy another Media group.
  * This created a "Media War" sub-game where players fought for control of the narrative.

### 1.4 Expansion Set 4 (1985)
* **Scope**: Provided a final batch of cards to round out the pocket-box era.
* **Key Additions**: Added the *Church of the SubGenius* as a playable faction, bringing a slack-based recovery playstyle to the table.

---

## 2. Deluxe Edition Expansions (2007–Present)

With the release of the updated color Deluxe Edition, Steve Jackson Games began releasing larger, thematic expansions.

### 2.1 Bavarian Fire Drill (2007)
A 110-card expansion that brought the game into the internet age, introducing modern conspiracy groups (e.g., *Bloggers*, *Flash Mobs*, *LulzSec* analogs) and a brand-new card type: **Artifacts**.

#### The Artifact Mechanic
Artifacts are powerful objects that do not have their own Power or Resistance but must be attached to an existing Group card in your Power Structure:
* **Function**: They grant permanent passive bonuses or new active abilities to the host card (e.g., the *Shroud of Turin* grants defensive immunity, while the *Holy Grail* boosts income).
* **Targeting**: Artifacts can be stolen by launching an "Attack to Control" directly against the artifact rather than the host group. If the host group is destroyed or neutralized, the artifact becomes uncontrolled or goes to the dead pile depending on the specific card rules.

### 2.2 Mutual Assured Distraction (2010)
A media-focused expansion that introduced cards satirizing 24-hour news cycles, viral social media trends, and political theater.
* **New Rules**: Introduced localized event triggers that could force board-wide resets or lock down specific alignments if too many "Distraction" cards were active in play.

### 2.3 Alternative Truths (2018)
Focused on modern "fake news" and post-truth political dynamics.
* **Mechanical Highlight**: Introduced **New World Order (NWO) Cards** that acted similarly to global modifiers. When a player puts an NWO card into play, it overrides standard board rules (e.g., reversing the bonuses for matching alignments or making all *Government* groups lose their income) until replaced by another NWO card.

### 2.4 Illuminati 2020 (2020)
An expansion capturing the specific societal anxieties, lockdowns, and digital shifts of the year 2020.
* **Key Themes**: Pandemic lockdowns, remote work, institutional distrust, and massive tech conglomerates.

---

## 3. Design Guidelines for Our Modern Adaptation

To implement expansions in our digital card game:

1. **Modular Rule Mutators (NWO Cards)**: Incorporating global rule mutators that players can deploy to disrupt their opponent's strategy (e.g., playing a "Post-Truth Era" card to reverse alignment modifiers).
2. **Item Slots (Artifacts)**: Giving certain Group nodes the ability to equip "Items" or "Assets" (Artifacts) that enhance their stats or grant special active commands.
3. **Dynamic Alignment Shifting (Brainwashing)**: Enabling cards to undergo status changes that modify their alignments. A digital system makes tracking these shifts seamless without requiring physical boards or counters.
