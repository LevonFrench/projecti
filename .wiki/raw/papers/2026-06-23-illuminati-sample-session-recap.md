---
title: "Source Ingestion: Illuminati 4-Player Sample Game Play Transcript"
source: "Synthesized game log matching tournament-level mechanics and rules"
type: transcript
tags: [session, transcript, play-by-play, turn log]
confidence: high
volatility: cold
---

# Ingested Transcript: Illuminati 4-Player Sample Game Play Transcript

This log records the play-by-play sequence of a 4-player game session of Steve Jackson's *Illuminati* card game, documenting turn structure, attack math, and bidding logic.

---

## 1. Setup & Player Roles
*   **Player 1**: **Bavarian Illuminati** (Special: Privileged Attack for 5 MB)
*   **Player 2**: **Bermuda Triangle** (Special: End-of-turn structure reorganization)
*   **Player 3**: **Servants of Cthulhu** (Special: +2 to destroy, receives bonuses for destructions)
*   **Player 4**: **Gnomes of Zurich** (Special: Move money freely at turn end)
*   **Game Goal**: Basic Victory = Control 10 Groups.

---

## 2. Play Log

### Round 1: Turn 1 (Active: Bavarian Illuminati)
1.  **Phase 1: Collect Income**: Bavaria collects 9 MB on its Illuminati card.
2.  **Phase 2: Draw Card**: Draws "FBI" (Group card). FBI is placed in the Uncontrolled Area.
3.  **Phase 3: Actions**:
    *   **Action 1: Attack to Control "FBI"**:
        *   FBI Alignments: Government, Straight. FBI Resistance: 6.
        *   Attacker: Bavarian Illuminati (Power: 10/10).
        *   Modifiers: Bavarian (no alignments) vs FBI = 0.
        *   Base Target Roll (TR): $10 (\text{Power}) - 6 (\text{Resistance}) = 4$.
        *   *Bidding*: Bavaria spends 4 MB from its Illuminati treasury to add +4 to the roll. Final TR = 8.
        *   *Roll*: Bavaria rolls $2d6 \rightarrow [3, 2] = 5$. Success!
        *   *Resolution*: FBI is attached to Bavaria's top outward arrow. Half of FBI's starting treasury (0 MB) remains. Bavaria transfers 2 MB from its Illuminati card to the FBI.
    *   **Action 2: Attack to Control "Big Media"** (in Uncontrolled Area):
        *   Big Media Alignments: Straight, Liberal. Big Media Resistance: 6.
        *   Attacker: FBI (Power: 6. FBI has 1 open outward arrow).
        *   Modifiers: FBI (Straight) vs Big Media (Straight) = Identical matching alignment (+4 modifier).
        *   Base Target Roll (TR): $6 (\text{FBI Power}) + 4 (\text{Alignment}) - 6 (\text{Big Media Resistance}) = 4$.
        *   *Bidding*: Bavaria spends 3 MB from the FBI treasury to add +3. Final TR = 7.
        *   *Roll*: Rolls $2d6 \rightarrow [4, 4] = 8$. Failure! (Roll must be $\le 7$).
        *   *Resolution*: Big Media remains in the Uncontrolled Area.
4.  **Phase 4: Free Actions**: None.
5.  **Phase 5: Money Transfers**: None.
6.  **Phase 6: Special Abilities**: None.
7.  **Phase 7: Maintenance**: 3 cards in Uncontrolled Area (FBI is captured, so deck draws to replenish. Draws "K.K.K.").

---

### Round 2: Turn 3 (Active: Servants of Cthulhu)
1.  **Phase 1: Collect Income**: Cthulhu collects 7 MB. Currently controls "Eco-Guerrillas" (Violent, Liberal, Weird) and "Nuclear Power Companies" (Straight, Conservative).
2.  **Phase 2: Draw Card**: Draws "Clipper Chip" (Group card). Places it in the Uncontrolled Area.
3.  **Phase 3: Actions**:
    *   **Action 1: Attack to Destroy "Nuclear Power Companies"**:
        *   Cthulhu wishes to destroy this card in their own structure to collect a Cthulhu faction destruction count and free up a control arrow.
        *   Attacker: Servants of Cthulhu (Power: 9/9. Special: +2 to destroy).
        *   Target: Nuclear Power Companies (Power: 5/4. Resistance: 6).
        *   Modifiers:
            *   Cthulhu Faction destruction bonus: +2.
            *   Alignment Modifiers (Attack to Destroy): Cthulhu (Violent, Weird) vs Nuclear Power Companies (Straight, Conservative). No matches.
        *   Defending Node: Defends with its Power (5) because it's a destruction attack, plus the structural defender bonus. Since it is adjacent to the Cthulhu card, it receives a +10 structural defender bonus.
        *   Base Target Roll (TR): $9 (\text{Cthulhu Power}) + 2 (\text{Special}) - [5 (\text{Target Power}) + 10 (\text{Defense})] = 11 - 15 = -4$.
        *   *Bidding*:
            *   Cthulhu spends 10 MB from its Illuminati treasury. TR rises to 6.
            *   Gnomes of Zurich spend 2 MB from their Illuminati treasury to aid the defender (-2 to roll). TR falls to 4.
            *   Cthulhu spends another 4 MB. TR rises to 8.
            *   Final TR = 8.
        *   *Roll*: Rolls $2d6 \rightarrow [2, 1] = 3$. Success!
        *   *Resolution*: Nuclear Power Companies is sent to the Dead Pile. Cthulhu's destruction counter increases to 1.
    *   **Action 2: Attack to Control "K.K.K."** (in Uncontrolled Area):
        *   KKK Alignments: Conservative, Violent, Fanatic. Resistance: 2.
        *   Attacker: Eco-Guerrillas (Power: 0/3. Transferable Power: 3. Alignments: Liberal, Violent, Weird).
        *   Modifiers:
            *   Eco-Guerrillas (Violent) vs KKK (Violent) = +4 matching alignment.
            *   Eco-Guerrillas (Liberal) vs KKK (Conservative) = -4 opposing alignment.
            *   Net Alignments = 0.
        *   Base Target Roll: $3 (\text{Eco-Guerrillas Transferable Power}) - 2 (\text{KKK Resistance}) = 1$.
        *   *Bidding*: Cthulhu spends 6 MB from Eco-Guerrillas. TR rises to 7.
        *   *Roll*: Rolls $2d6 \rightarrow [3, 3] = 6$. Success!
        *   *Resolution*: KKK is attached to Eco-Guerrillas' outward arrow.
4.  **Phase 4: Free Actions**: None.
5.  **Phase 5: Money Transfers**: None.
6.  **Phase 6: Special Abilities**: None.
7.  **Phase 7: Maintenance**: Replenishes Uncontrolled Area.

---

### Round 3: Turn 2 (Active: Gnomes of Zurich)
1.  **Phase 1: Collect Income**: Gnomes collect 12 MB on Illuminati card.
2.  **Phase 2: Draw Card**: Draws "Murphy's Law" (Special card). Added to hand.
3.  **Phase 3: Actions**:
    *   **Action 1: Attack to Neutralize "FBI"** (Controlled by Bavaria):
        *   Attacker: Gnomes of Zurich (Power: 7/7).
        *   Target: FBI (Resistance: 6).
        *   Modifiers: Gnomes vs FBI = 0.
        *   Defending Bonus: FBI is adjacent to Bavaria's Illuminati card (+10 Defense).
        *   Neutralize Bonus: +6 flat bonus for neutralization attack.
        *   Base Target Roll: $7 (\text{Gnome Power}) + 6 (\text{Neutralize}) - 6 (\text{FBI Resistance}) - 10 (\text{Defending Bonus}) = -3$.
        *   *Bidding*:
            *   Gnomes spend 12 MB from their Illuminati treasury. TR rises to 9.
            *   Bavaria spends 4 MB from FBI's treasury to defend. FBI treasury spends count double (-8 to roll). TR falls to 1.
            *   Gnomes spend another 8 MB from Gnome Illuminati. TR rises to 9.
            *   Bavaria plays Special card "Deep Agent" to declare the Gnome attack blocked.
            *   Gnomes play "Murphy's Law" from hand to cancel the "Deep Agent" play.
            *   Bavaria spends 2 MB from Bavaria Illuminati card (-2 to roll). TR falls to 7.
            *   Final TR = 7.
        *   *Roll*: Rolls $2d6 \rightarrow [4, 2] = 6$. Success!
        *   *Resolution*: FBI and all its subordinates are detached and returned to the Uncontrolled Area. All money on them goes to the Bank.
4.  **Phase 4: Free Actions**: None.
5.  **Phase 5: Money Transfers**: None.
6.  **Phase 6: Special Abilities**: Gnomes move 5 MB from Gnome Illuminati card to "IRS" (currently controlled) using their end-of-turn free money redistribution ability.
7.  **Phase 7: Maintenance**: Replenishes Uncontrolled Area.
