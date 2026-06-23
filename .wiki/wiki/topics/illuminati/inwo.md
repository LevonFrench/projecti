---
title: "Illuminati: New World Order (INWO)"
type: reference
status: active
created: 2026-06-23
updated: 2026-06-23
confidence: high
volatility: warm
project: projecti
---

# Illuminati: New World Order (INWO) CCG Spinoff

Released in 1994, **Illuminati: New World Order (INWO)** is Steve Jackson Games' collectible card game (CCG) adaptation of the classic 1982 board game. Designed by Steve Jackson, it won the **1994 Origins Award for Best Card Game** and brought the satirical world-conquest mechanics into the height of the 1990s CCG boom.

This document analyzes the design, mechanical structure, expansions, and cultural impact of the INWO CCG, serving as a key reference for building our modern digital card game adaptation.

---

## 1. Key Mechanical Differences from Classic Boxed Game

While INWO retains the core concept of controlling groups to form a branched Power Structure under a central Illuminati card, it alters several core systems to fit a fast-paced, customizable card game format:

### 1.1 Deck Building
Unlike the shared deck of the original board game, each player in INWO constructs a custom deck of at least 45 cards (with standard rules usually recommending 50–60 cards).
* **Composition**: The deck is split into **Groups** (orange/yellow cards representing Puppets) and **Plots** (blue cards representing action events, alignments shifts, and bonuses).
* **Deck Limitations**: A player can include up to 3 copies of any card in their deck, except for Illuminati cards, of which they may only have 1 (starting in play).

### 1.2 Action Tokens
Instead of a player having a fixed "two actions per turn" budget, INWO distributes actions locally across the Power Structure using **Action Tokens**:
* **Generation**: Each Illuminati card and most Group cards generate action tokens at the start of the turn (typically 1 token for the Illuminati and 1 token for groups with a Power of 3 or higher).
* **Usage**: Action tokens are expended to declare attacks, defend against attacks, activate card abilities, or draw Plot cards.
* **Tactical Depth**: This creates localized action economies. Players must choose whether to spend their Illuminati's token to initiate a major attack or save it to bolster defenses during opponent turns.

### 1.3 Plots vs. Specials
Plots in INWO act as customizable action cards. 
* **Types**: Plots include **Instant Plots** (resolved and discarded immediately), **Exposed Plots** (played face-up on the board to grant ongoing effects), and **Hidden Plots** (kept in hand to surprise opponents).
* **Plot Deck**: Players draw from their private Plot deck by spending Action Tokens or through specific card abilities.

### 1.4 Attack Calculations
INWO streamlines the bidding math. Success is still determined by rolling equal to or less than a calculated Target Number on **2d6**:
* **Initiating**: An attack is declared by spending an Action Token from a controlled Group.
* **Aiding**: Other groups under the player's control can spend their Action Tokens to aid the attack, adding their Power (or Transferable Power) to the roll.
* **Defense**: The defender (or other players) can spend Action Tokens to aid the defense.
* **Money**: Instead of Megabucks, players can accumulate and spend **Power Structure Money** or resources to modify rolls, but the reliance on individual card treasuries is heavily streamlined in favor of Action Token pacing.

---

## 2. Release History & Card Sets

INWO was released in several printings and expansions before going out of print in the late 1990s:

| Set / Edition | Release Year | Size | Format & Distribution | Key Notes |
| :--- | :---: | :---: | :--- | :--- |
| **Limited Edition** | 1994 | 409 cards | Starter decks and booster packs | Black borders. Highly collectible first printing. |
| **Unlimited Edition** | 1995 | 409 cards | Starter decks and booster packs | Blue borders. Included minor rule tweaks and text clarifications. |
| **Factory Set** | 1995 | 450 cards | Complete collector's box set | Contains one of each base card, plus three copies of each Illuminati card and blank cards. |
| **Assassins** | 1995 | 125 cards | 8-card booster packs | First booster expansion. Introduced the *Assassins* faction and assassination-themed plots. |
| **SubGenius** | 1998 | 100 cards | Standalone / Complete set | Collaboration with the Church of the SubGenius. Cards sold as a complete, non-random set. |
| **Bavarian Fire Drill** | 1998 | 110 cards | Boosters / Complete set | Final official expansion. Introduced "Artifact" cards and modern conspiracy tropes. |

*Note: Three additional promo cards (Trading Card Games, The Great Pyramids, and Pyramid Marketing Schemes) brought the total base set list to 412 cards.*

---

## 3. Cultural Impact & Conspiracy Folklore

One of the most notable aspects of INWO is its long-lasting legacy in internet folklore and pop culture.

### 3.1 The "Prophecy" Phenomenon
Due to the game's satirical focus on real-world conspiracy theories, several cards illustrated by artist **Dan Smith** depicted scenarios that bore striking visual or thematic resemblances to major historical events occurring years or decades after their 1994 release. Most notably:
* **Terrorist Nuke**: Depicts an explosion ripping through a skyscraper, resembling the 9/11 attacks on the World Trade Center.
* **Pentagon**: Shows the Pentagon burning, mirroring the 9/11 attack on the building.
* **Epidemic / Population Control**: Mentions global quarantine and medical mandates, frequently cited during the COVID-19 pandemic.
* **Combined Disasters**: Depicts a clock tower collapsing amidst an earthquake, which conspiracy theorists linked to the 2011 Tohoku earthquake and Fukushima disaster.

### 3.2 Satirical Reality vs. Conspiracy Interpretation
While conspiracy theories claim the game was a "leaked plan" of the New World Order, the creators have repeatedly documented that the game was inspired by Shea and Wilson's *The Illuminatus! Trilogy*, and the cards simply satirized historical and contemporary conspiracy theories of the early 1990s. 

From a game design perspective, the success of these cards illustrates the **timelessness of conspiracy tropes**—the themes of government cover-ups, bioweapons, media manipulation, and false flag operations are cyclical, and a modern adaptation can tap into these same structural tropes.

---

## 4. Design Guidelines for Our Modern Adaptation

When drawing inspiration from INWO for our modern project, we should leverage several of its structural innovations:

1. **Action Points as local resources (Charges)**: Rather than a global turn energy pool, we can assign "Charges" or action limits to individual card nodes. This forces players to construct balanced networks where groups protect themselves and fuel each other's attacks.
2. **The Plot Hand**: Implementing a secondary resource deck for "Plot/Event" cards allows for strategic variety. Players can select specialized event packages to support their deck theme (e.g., a "Corporate Market Crash" deck vs. an "Occult alignment shift" deck).
3. **Synergy Nodes**: INWO's groups have distinct outward-pointing arrows. In a digital interface, we can visualize this network dynamically, highlighting available slots and active connection paths with glowing lines.
