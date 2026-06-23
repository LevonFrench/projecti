// app.js - Client router and interaction layer for Illuminati Game Reference Archive

// Roman Numerals for Navigation Sections
const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

// Card Details Mapping for the Art Gallery
const CARD_MAP = {
    "adepts.gif": {
        name: "Adepts of Hermes",
        type: "Illuminati Faction",
        stats: { Power: "7/7", Resistance: "N/A", Income: "2 MB" },
        desc: "Masters of alchemy and occult secrets. May make one privileged attack per turn at no cost. Modern adaptation concept: Shuts down opponent reaction spells and grants magic alignment synergy."
    },
    "bavaria.gif": {
        name: "Bavarian Illuminati",
        type: "Illuminati Faction",
        stats: { Power: "10/10", Resistance: "N/A", Income: "9 MB" },
        desc: "The quintessential shadow puppet masters. May pay 5 Megabucks to declare an attack privileged. Modern adaptation concept: Raw statistical dominance, unblockable commands, and brute force."
    },
    "bermuda.gif": {
        name: "Bermuda Triangle",
        type: "Illuminati Faction",
        stats: { Power: "8/8", Resistance: "N/A", Income: "9 MB" },
        desc: "Reality warpers manipulating geographical layout. Reorganizes its control structure freely at turn end. Modern adaptation concept: Layout shifting, grid swap maneuvers, and complex spatial synergies."
    },
    "ufo.gif": {
        name: "UFOs",
        type: "Illuminati Faction",
        stats: { Power: "6/6", Resistance: "N/A", Income: "8 MB" },
        desc: "Extraterrestrial conspirators with hidden motives. Chooses its victory condition in secret at start. Modern adaptation concept: Double deploy actions, high tempo, and variable secret objectives."
    },
    "cthulhu.gif": {
        name: "Servants of Cthulhu",
        type: "Illuminati Faction",
        stats: { Power: "9/9", Resistance: "N/A", Income: "7 MB" },
        desc: "Apocalyptic cultists eager for destruction. Receives +2 on all destruction attacks. Modern adaptation concept: Board clear capabilities, graveyard buffs, and sacrificing cards for resources."
    },
    "discordia.gif": {
        name: "Discordian Society",
        type: "Illuminati Faction",
        stats: { Power: "8/8", Resistance: "N/A", Income: "8 MB" },
        desc: "Pranksters propagating absolute chaos. Immune to Government/Straight cards, +4 to control Weird cards. Modern adaptation concept: Rule breaking, immunity buffs, and chaotic alignment chains."
    },
    "gnomes.gif": {
        name: "Gnomes of Zurich",
        type: "Illuminati Faction",
        stats: { Power: "7/7", Resistance: "N/A", Income: "12 MB" },
        desc: "International bankers commanding global wealth. Redistributes money freely between treasuries. Modern adaptation concept: Resource hoarding, interest scaling damage, and slush fund buffering."
    },
    "network.gif": {
        name: "The Network",
        type: "Illuminati Faction",
        stats: { Power: "7/7", Resistance: "N/A", Income: "9 MB" },
        desc: "Information brokers monitoring digital links. Draws two cards during draw phase. Modern adaptation concept: Card drawing supremacy, deck cycling, and hand reveal counters."
    },
    "shangri-la.gif": {
        name: "Shangri-La",
        type: "Illuminati Faction",
        stats: { Power: "5/5", Resistance: "N/A", Income: "8 MB" },
        desc: "Peaceful monks radiating spiritual balance. +4 to control Peaceful groups. Modern adaptation concept: Peaceful alignment protection, heavy defensive shields, and health recovery."
    },
    "2nd-bullet.gif": {
        name: "The Second Bullet",
        type: "Special Plot",
        stats: { Timing: "Anytime", Effect: "Cancel/Redirect", Target: "Attacker" },
        desc: "Alters the vector of critical physical strikes. Forces an opponent to redirect or completely repeat an attack. Modern adaptation concept: Trap card that intercepts damage and strikes back."
    },
    "Atomic_Monster.gif": {
        name: "Atomic Monster",
        type: "Group Card",
        stats: { Power: "5", Resistance: "4", Income: "0 MB" },
        desc: "A giant radioactive reptile spawned by weapons testing. Alignments: Violent, Weird. +2 to destroy cards. Modern adaptation concept: Devastating direct attack node that deals splash damage."
    },
    "KKK.gif": {
        name: "K.K.K.",
        type: "Group Card",
        stats: { Power: "2", Resistance: "2", Income: "0 MB" },
        desc: "Extremist hate group. Alignments: Conservative, Violent, Fanatic. Deals double damage to Liberal nodes. Modern adaptation concept: Specialized low-cost offense node targeting specific alignments."
    },
    "Smash_the_State.gif": {
        name: "Don't Forget To Smash The State",
        type: "Special Plot",
        stats: { Timing: "Action Phase", Effect: "Bonus Damage", Target: "Government" },
        desc: "A rallying cry that incites anti-establishment riots. Grants +10 to attacks destroying Government nodes. Modern adaptation concept: Spells that strip defensive armor from Government targets."
    },
    "angel_feather.gif": {
        name: "Angel's Feather",
        type: "Artifact",
        stats: { Host: "Any Group", Effect: "Revive/Protect", Power: "N/A" },
        desc: "A holy relic offering divine protection. Equipping card becomes immune to instant-kill spell effects. Modern adaptation concept: Equip card granting death prevention and a health buffer."
    },
    "clipper_chip.gif": {
        name: "Clipper Chip",
        type: "Group Card",
        stats: { Power: "4", Resistance: "5", Income: "2 MB" },
        desc: "Government-standard surveillance chip. Alignments: Straight, Government. Reveals opponent's face-down cards. Modern adaptation concept: Tech utility card exposing traps and hand contents."
    },
    "crystal_skull.gif": {
        name: "Crystal Skull",
        type: "Artifact",
        stats: { Host: "Any Group", Effect: "Mind Control", Power: "N/A" },
        desc: "Mystical alien skull channeling telepathic power. Enables host card to execute control attacks at range. Modern adaptation concept: Equip card adding target range and mind-control capabilities."
    },
    "oregon_crud.gif": {
        name: "Oregon Crud",
        type: "Special Plot",
        stats: { Timing: "Anytime", Effect: "Stat Debuff", Target: "1 Group" },
        desc: "A bizarre bio-weapon virus causing mild mass hysteria. Instantly halves a target node's Power and Resistance. Modern adaptation concept: Poison damage-over-time debuff that reduces stats each turn."
    },
    "Hitlers_Brain.gif": {
        name: "Hitler's Brain",
        type: "Artifact",
        stats: { Host: "Any Group", Effect: "Command Buff", Power: "N/A" },
        desc: "A jarred brain providing tactical command structures. Grants +2 Power to all surrounding Violent cards. Modern adaptation concept: Equip card adding offensive stats to violent alignments."
    },
    "deasil_engine.gif": {
        name: "Deasil Engine",
        type: "Artifact",
        stats: { Host: "Any Group", Effect: "Extra Action", Power: "N/A" },
        desc: "A hyper-efficient motor boosting operational speed. Host card can execute two actions per round. Modern adaptation concept: Equip card granting extra action charges and speed buffs."
    },
    "eco-guerillas.gif": {
        name: "Eco-Guerrillas",
        type: "Group Card",
        stats: { Power: "0/3", Resistance: "6", Income: "1 MB" },
        desc: "Radical environmental strike team. Alignments: Liberal, Violent, Weird. Bypasses standard front guards. Modern adaptation concept: Piercing damage dealer that ignores wall defenses."
    },
    "grassroots_support.gif": {
        name: "Grassroots Support",
        type: "Special Plot",
        stats: { Timing: "Action Phase", Effect: "Stat Buff", Target: "1 Group" },
        desc: "A wave of popular backing. Grants +5 to control checks for Liberal or Peaceful cards. Modern adaptation concept: Target spell that boosts control success rate for a turn."
    }
};

// Simple Markdown to HTML Parser
function parseMarkdown(md) {
    let html = md;
    
    // Escape HTML to prevent XSS (keep basic tag syntax if parsed)
    html = html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Handle bold and italic formatting
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code class="mono-span">$1</code>');

    // Split lines to process blocks
    const lines = html.split('\n');
    let inList = false;
    let listType = ''; // 'ul' or 'ol'
    let inTable = false;
    let tableHeaders = [];
    let tableRows = [];
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Handle Horizontal Rules
        if (line === '---' || line === '***') {
            closeBlocks();
            result.push('<hr>');
            continue;
        }
        
        // Handle Headers
        if (line.startsWith('# ')) {
            closeBlocks();
            result.push(`<h1>${line.substring(2)}</h1>`);
            continue;
        }
        if (line.startsWith('## ')) {
            closeBlocks();
            result.push(`<h2>${line.substring(3)}</h2>`);
            continue;
        }
        if (line.startsWith('### ')) {
            closeBlocks();
            result.push(`<h3>${line.substring(4)}</h3>`);
            continue;
        }
        
        // Handle Callouts / Blockquotes
        if (line.startsWith('&gt; ')) {
            closeBlocks();
            let quoteContent = line.substring(5).trim();
            
            // Check for GitHub Alerts [!NOTE], [!IMPORTANT], etc.
            if (quoteContent.startsWith('[!NOTE]') || quoteContent.startsWith('[!IMPORTANT]') || quoteContent.startsWith('[!WARNING]')) {
                const type = quoteContent.match(/\[!(.+)\]/)[1];
                let contentText = '';
                // Gather subsequent quote lines for callout body
                while (i + 1 < lines.length && lines[i + 1].trim().startsWith('&gt; ')) {
                    i++;
                    contentText += ' ' + lines[i].trim().substring(5).trim();
                }
                result.push(`<div class="callout"><div class="callout-title">${type}</div>${contentText || quoteContent}</div>`);
            } else {
                result.push(`<blockquote>${quoteContent}</blockquote>`);
            }
            continue;
        }
        
        // Handle Tables
        if (line.startsWith('|') && line.endsWith('|')) {
            if (inList) closeList();
            
            // Check if it's separator row |---|---|
            if (line.match(/^\|[\s-:\\|]+$/)) {
                continue; 
            }
            
            const cols = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            
            if (!inTable) {
                inTable = true;
                tableHeaders = cols;
            } else {
                tableRows.push(cols);
            }
            continue;
        } else if (inTable) {
            closeTable();
        }
        
        // Handle Unordered Lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (inList && listType !== 'ul') {
                closeList();
            }
            if (!inList) {
                inList = true;
                listType = 'ul';
                result.push('<ul>');
            }
            result.push(`<li>${line.substring(2)}</li>`);
            continue;
        }
        
        // Handle Ordered Lists
        if (line.match(/^\d+\.\s/)) {
            if (inList && listType !== 'ol') {
                closeList();
            }
            if (!inList) {
                inList = true;
                listType = 'ol';
                result.push('<ol>');
            }
            const content = line.replace(/^\d+\.\s/, '');
            result.push(`<li>${content}</li>`);
            continue;
        }
        
        // Regular Paragraphs
        if (line === '') {
            closeBlocks();
        } else {
            if (inList || inTable) {
                closeBlocks();
            }
            result.push(`<p>${line}</p>`);
        }
    }
    
    closeBlocks();
    
    function closeList() {
        if (inList) {
            result.push(listType === 'ul' ? '</ul>' : '</ol>');
            inList = false;
        }
    }
    
    function closeTable() {
        if (inTable) {
            let tableHtml = '<table><thead><tr>';
            tableHeaders.forEach(h => {
                tableHtml += `<th>${h}</th>`;
            });
            tableHtml += '</tr></thead><tbody>';
            tableRows.forEach(row => {
                tableHtml += '<tr>';
                row.forEach(cell => {
                    tableHtml += `<td>${cell}</td>`;
                });
                tableHtml += '</tr>';
            });
            tableHtml += '</tbody></table>';
            result.push(tableHtml);
            inTable = false;
            tableHeaders = [];
            tableRows = [];
        }
    }
    
    function closeBlocks() {
        closeList();
        closeTable();
    }
    
    let parsedHtml = result.join('\n');
    
    // Resolve Wiki links [[slug|Name]] or [[slug]]
    parsedHtml = parsedHtml.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (match, slug, name) => {
        return `<a href="#" class="wiki-link" data-article="${slug}">${name}</a>`;
    });
    parsedHtml = parsedHtml.replace(/\[\[([^\]]+)\]\]/g, (match, slug) => {
        return `<a href="#" class="wiki-link" data-article="${slug}">${slug}</a>`;
    });
    
    // Clean up local markdown file references (e.g. groups.md) to route inside the SPA
    parsedHtml = parsedHtml.replace(/\b([a-z0-9_]+)\.md\b/gi, (match, slug) => {
        return `#${slug}`;
    });
    
    return parsedHtml;
}

// App Controller Class
class ArchiveApp {
    constructor() {
        this.articles = window.WIKI_DATA.articles;
        this.cardAssets = window.WIKI_DATA.cardAssets;
        
        this.navContainer = document.getElementById('article-nav');
        this.contentContainer = document.getElementById('content-display');
        this.searchBox = document.getElementById('search-box');
        
        this.titleDisplay = document.getElementById('title-display');
        this.markerDisplay = document.getElementById('marker-display');
        this.dateDisplay = document.getElementById('date-display');
        
        // Modal Overlay Elements
        this.cardOverlay = document.getElementById('card-overlay');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.modalImg = document.getElementById('modal-card-img');
        this.modalName = document.getElementById('modal-card-name');
        this.modalType = document.getElementById('modal-card-type');
        this.modalStats = document.getElementById('modal-card-stats');
        this.modalDesc = document.getElementById('modal-card-desc');
        
        this.init();
    }
    
    init() {
        this.renderNavigation();
        this.bindEvents();
        
        // Load default article from URL hash or default to the first article
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.loadArticle(initialHash);
        } else {
            this.loadArticle(this.articles[0].id);
        }
    }
    
    renderNavigation() {
        this.navContainer.innerHTML = '';
        
        // Inject Article Navigation links
        this.articles.forEach((art, index) => {
            const romanNum = ROMAN_NUMERALS[index] || (index + 1).toString();
            const li = document.createElement('li');
            li.innerHTML = `
                <a class="nav-item" data-id="${art.id}">
                    ${art.title}
                    <span class="nav-num">${romanNum}</span>
                </a>
            `;
            this.navContainer.appendChild(li);
        });
        
        // Add card asset gallery navigation link at the end
        const galleryIndex = this.articles.length;
        const romanNum = ROMAN_NUMERALS[galleryIndex] || (galleryIndex + 1).toString();
        const li = document.createElement('li');
        li.innerHTML = `
            <a class="nav-item" data-id="card-assets">
                Card Art Previews
                <span class="nav-num">${romanNum}</span>
            </a>
        `;
        this.navContainer.appendChild(li);
    }
    
    bindEvents() {
        // Navigation click events
        this.navContainer.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                const id = navItem.dataset.id;
                this.loadArticle(id);
            }
        });
        
        // Search filter input event
        this.searchBox.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Modal close button
        this.closeModalBtn.addEventListener('click', () => {
            this.cardOverlay.classList.remove('active');
        });
        
        // Close modal when clicking outside content
        this.cardOverlay.addEventListener('click', (e) => {
            if (e.target === this.cardOverlay) {
                this.cardOverlay.classList.remove('active');
            }
        });
        
        // SPA inner link click interceptor
        this.contentContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('wiki-link')) {
                e.preventDefault();
                const targetId = e.target.dataset.article;
                this.loadArticle(targetId);
            }
        });
        
        // Hash change navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash) this.loadArticle(hash);
        });
    }
    
    loadArticle(id) {
        // Find article in database
        const article = this.articles.find(a => a.id === id);
        
        // Update active class in sidebar nav
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.id === id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update URL hash
        if (window.location.hash !== `#${id}`) {
            window.location.hash = id;
        }
        
        if (id === 'card-assets') {
            this.contentContainer.className = 'gallery-content';
            this.renderCardGallery();
            return;
        }
        
        if (!article) {
            // Fallback if not found
            this.contentContainer.className = 'article-content';
            this.contentContainer.innerHTML = `<p>Article with reference id <code>${id}</code> could not be located in database.</p>`;
            this.titleDisplay.innerText = "Error: Reference Missing";
            return;
        }
        
        // Render Standard Article
        this.contentContainer.className = 'article-content';
        const artIndex = this.articles.findIndex(a => a.id === id);
        const romanNum = ROMAN_NUMERALS[artIndex] || (artIndex + 1).toString();
        
        this.markerDisplay.innerText = `SECTION ${romanNum}`;
        this.titleDisplay.innerHTML = article.title;
        this.dateDisplay.innerText = article.frontmatter.updated || "2026.06.23";
        
        // Clear Search Box during standard navigation to prevent confusing states
        this.searchBox.value = '';
        
        // Render parsed markdown
        this.contentContainer.innerHTML = parseMarkdown(article.markdown);
        this.contentContainer.scrollTop = 0;
    }
    
    renderCardGallery() {
        const galleryIndex = this.articles.length;
        const romanNum = ROMAN_NUMERALS[galleryIndex] || (galleryIndex + 1).toString();
        
        this.markerDisplay.innerText = `SECTION ${romanNum}`;
        this.titleDisplay.innerText = "Card Art Previews";
        this.dateDisplay.innerText = "2026.06.23";
        
        let galleryHtml = `
            <p>Directly scraped and parsed from Steve Jackson Games' official archives. Click on any card thumbnail to inspect its statistics and gameplay design annotations.</p>
            <hr>
            <div class="gallery-grid" id="gallery-grid-inner">
        `;
        
        this.cardAssets.forEach(file => {
            const cardInfo = CARD_MAP[file] || { name: file.replace('.gif', '').replace(/_/g, ' '), type: "UNKNOWN" };
            galleryHtml += `
                <div class="card-item" data-file="${file}">
                    <div class="card-image-wrapper">
                        <img class="card-gif" src="../.wiki/wiki/topics/illuminati/assets/${file}" alt="${cardInfo.name}">
                    </div>
                    <div class="card-title">${cardInfo.name}</div>
                    <div class="card-alignment">${cardInfo.type}</div>
                </div>
            `;
        });
        
        galleryHtml += `</div>`;
        this.contentContainer.innerHTML = galleryHtml;
        
        // Add card click events inside the grid
        const grid = document.getElementById('gallery-grid-inner');
        grid.addEventListener('click', (e) => {
            const cardItem = e.target.closest('.card-item');
            if (cardItem) {
                const file = cardItem.dataset.file;
                this.showCardDetails(file);
            }
        });
    }
    
    showCardDetails(file) {
        const cardInfo = CARD_MAP[file] || {
            name: file.replace('.gif', '').replace(/_/g, ' '),
            type: "Unclassified Card",
            stats: { Power: "N/A", Resistance: "N/A", Income: "N/A" },
            desc: "Archived card asset from Steve Jackson Games' collectible card releases. Stats are currently unclassified."
        };
        
        this.modalImg.src = `../.wiki/wiki/topics/illuminati/assets/${file}`;
        this.modalName.innerHTML = cardInfo.name;
        this.modalType.innerText = cardInfo.type;
        this.modalDesc.innerText = cardInfo.desc;
        
        // Render Stats Grid
        this.modalStats.innerHTML = '';
        Object.entries(cardInfo.stats).forEach(([statName, statVal]) => {
            const item = document.createElement('div');
            item.className = 'stat-item';
            item.innerHTML = `
                <span>${statName}</span>
                <span>${statVal}</span>
            `;
            this.modalStats.appendChild(item);
        });
        
        this.cardOverlay.classList.add('active');
    }
    
    handleSearch(query) {
        this.contentContainer.className = 'article-content';
        if (!query.trim()) {
            // Restore active article if search is cleared
            const activeNav = this.navContainer.querySelector('.nav-item.active');
            if (activeNav) {
                this.loadArticle(activeNav.dataset.id);
            }
            return;
        }
        
        const cleanQuery = query.toLowerCase();
        
        this.markerDisplay.innerText = "SEARCH RESULTS";
        this.titleDisplay.innerText = `Searching: "${query}"`;
        this.dateDisplay.innerText = "CABAL DECRYPTOR";
        
        let matches = [];
        
        // Search articles content
        this.articles.forEach(art => {
            const titleMatch = art.title.toLowerCase().includes(cleanQuery);
            const contentMatch = art.markdown.toLowerCase().includes(cleanQuery);
            
            if (titleMatch || contentMatch) {
                // Find matching snippets
                let snippet = "";
                if (contentMatch) {
                    const idx = art.markdown.toLowerCase().indexOf(cleanQuery);
                    const start = Math.max(0, idx - 40);
                    const end = Math.min(art.markdown.length, idx + query.length + 80);
                    snippet = "..." + art.markdown.substring(start, end).replace(/\n/g, ' ') + "...";
                } else {
                    snippet = art.markdown.substring(0, 120).replace(/\n/g, ' ') + "...";
                }
                
                matches.push({
                    type: 'Article',
                    title: art.title,
                    linkId: art.id,
                    snippet: snippet
                });
            }
        });
        
        // Search Card assets
        Object.entries(CARD_MAP).forEach(([file, card]) => {
            const nameMatch = card.name.toLowerCase().includes(cleanQuery);
            const descMatch = card.desc.toLowerCase().includes(cleanQuery);
            
            if (nameMatch || descMatch) {
                matches.push({
                    type: 'Card Art',
                    title: card.name,
                    linkId: 'card-assets',
                    snippet: card.desc,
                    file: file
                });
            }
        });
        
        if (matches.length === 0) {
            this.contentContainer.innerHTML = `
                <div class="callout"><div class="callout-title">No Records Found</div>
                No records matching your decrypt query were located in the active databases. Try searching for "Secret Service", "Bavarian", "Gnomes", or "Special".</div>
            `;
            return;
        }
        
        let resultsHtml = `<p>Found ${matches.length} matching entries in active archives:</p><hr><ul>`;
        
        matches.forEach(m => {
            if (m.type === 'Article') {
                resultsHtml += `
                    <li style="margin-bottom: 20px; list-style: none;">
                        <a href="#" class="wiki-link" data-article="${m.linkId}" style="font-weight: 700; font-family: var(--font-display); font-size: 18px; color: var(--accent-coral);">${m.title}</a>
                        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--fg-ink-faint); margin-left: 8px;">[ARTICLE]</span>
                        <p style="font-size: 13.5px; line-height: 1.4; color: var(--fg-ink-mute); margin-top: 4px;">${m.snippet}</p>
                    </li>
                `;
            } else {
                resultsHtml += `
                    <li style="margin-bottom: 20px; list-style: none;">
                        <a href="#" class="card-search-link" data-file="${m.file}" style="font-weight: 700; font-family: var(--font-display); font-size: 18px; color: var(--fg-ink);">${m.title}</a>
                        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-mustard); margin-left: 8px;">[CARD ART]</span>
                        <p style="font-size: 13.5px; line-height: 1.4; color: var(--fg-ink-mute); margin-top: 4px;">${m.snippet}</p>
                    </li>
                `;
            }
        });
        
        resultsHtml += `</ul>`;
        this.contentContainer.innerHTML = resultsHtml;
        
        // Add card overlays triggers to search results
        this.contentContainer.querySelectorAll('.card-search-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCardDetails(link.dataset.file);
            });
        });
    }
}

// Boot the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ArchiveApp();
});
