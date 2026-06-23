# Handoff

Initialized the git repository, created the initial commit, pushed it to the remote origin, compiled the Illuminati card game knowledge base, and built the reference website.

## Actions Completed
1. Created `README.md` with "# projecti".
2. Initialized Git repository (`git init`).
3. Added `README.md` and created the first commit.
4. Renamed branch to `main`.
5. Added remote origin `https://github.com/LevonFrench/projecti.git`.
6. Pushed to remote `main` branch.
7. Copied global `AGENTS.md` to the local customization directory at `.agents/AGENTS.md`.
8. Initialized the project knowledge base `.wiki/` conforming to standard subfolders (`wiki`, `raw`, `inbox`, `output`, `inventory`, `datasets`).
9. Created structured index files for each subdirectory and top-level directory.
10. Researched and compiled the comprehensive **Illuminati Card Game KB** inside `.wiki/wiki/topics/illuminati/`:
    - `_index.md`: Main reference landing page detailing original game mechanics and modern adaptation design principles.
    - `factions.md`: Catalog of all 8 primary secret societies plus the Church of the SubGenius, detailing their statistics, special rules, goals, and generic playstyle adaptations.
    - `groups.md`: Complete directory of the 83 classic Group cards, sorted by alignments, detailing their stats (Power, Resistance, Income), abilities, and adaptations to modern digital card actions.
    - `specials.md`: Detailed breakdown of the 15 Special action cards, translated to modern special card categories.
    - `mechanics.md`: Comprehensive system design document detailing turn states, core calculations, conflict math, bidding systems, and trading rules.
    - `inwo.md`: Detailed catalog and overview of the *Illuminati: New World Order (INWO)* CCG spinoff (1994), its mechanical differences, sets, and conspiracy folklore.
    - `expansions.md`: Breakdowns of the classic boxed game expansions (Expansion Sets 1-4, Brainwash mechanics, Deluxe releases, Bavarian Fire Drill, Mutual Assured Distraction, Alternative Truths, and Illuminati 2020).
    - `strategies.md`: Detailed strategy guide outlining playstyles, network topologies, bidding war management, threat levels, and table talk.
    - `history_and_creator.md`: Deep research on Steve Jackson's biography, the origin of the game (1981-1982), and the landmark 1990 Secret Service raid on SJ Games that catalyzed the founding of the Electronic Frontier Foundation (EFF).
    - `editions_and_variants.md`: Chronological overview of all boxed editions, spinoffs, standalones, and digital versions of the game.
11. Created and updated the project activity log `log.md`.
12. Downloaded 21 official card art preview assets directly from Steve Jackson Games' servers to the local assets folder: `.wiki/wiki/topics/illuminati/assets/`.
13. Designed and built a standalone offline-first reference website in the [website/](file:///j:/projects/projecti/website) directory implementing the Atelier Zero design language (warm paper backgrounds, Georgia typography, metadata coordinates, and coral accents).
14. Created [compile_kb.js](file:///j:/projects/projecti/website/compile_kb.js) to parse and build the articles/assets database into [data.js](file:///j:/projects/projecti/website/data.js), avoiding local CORS issues.
15. Created the semantic interface structure in [index.html](file:///j:/projects/projecti/website/index.html) and layout system in [styles.css](file:///j:/projects/projecti/website/styles.css).
16. Implemented client-side SPA routing, custom Markdown-to-HTML parser, search filters, and detail overlay popup modals in [app.js](file:///j:/projects/projecti/website/app.js).
17. Ran local HTTP server and browser tests to verify layouts; fixed `grid-template-cols` typos in `.gallery-grid` and `.modal-grid` within `styles.css` to restore proper desktop multi-column and modal displays.
18. Logged compilation and website tasks in `.wiki/log.md`, and marked all checklist items complete in `task.md`.
