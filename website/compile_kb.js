const fs = require('fs');
const path = require('path');

const kbDir = path.join(__dirname, '..', '.wiki', 'wiki', 'topics', 'illuminati');
const outputFilePath = path.join(__dirname, 'data.js');

function parseMarkdownFile(filePath) {
    const filename = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    let frontmatter = {};
    let markdown = content;
    
    // Parse frontmatter if present
    if (content.startsWith('---')) {
        const endOfFrontmatter = content.indexOf('---', 3);
        if (endOfFrontmatter !== -1) {
            const rawFrontmatter = content.substring(3, endOfFrontmatter).trim();
            markdown = content.substring(endOfFrontmatter + 3).trim();
            
            rawFrontmatter.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
                    frontmatter[key] = value;
                }
            });
        }
    }
    
    // Attempt to extract title from markdown if not in frontmatter
    let title = frontmatter.title;
    if (!title) {
        const titleMatch = markdown.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            title = titleMatch[1].trim();
        } else {
            title = filename.replace('.md', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
    }
    
    return {
        id: filename.replace('.md', ''),
        filename,
        title,
        frontmatter,
        markdown
    };
}

function compile() {
    console.log(`Scanning KB directory: ${kbDir}`);
    if (!fs.existsSync(kbDir)) {
        console.error("KB directory does not exist!");
        process.exit(1);
    }
    
    const files = fs.readdirSync(kbDir)
        .filter(f => f.endsWith('.md') && f !== '_index.md' && f !== 'new_cards.md' && f !== 'new_cards_suggested.md');
        
    const articles = [];
    
    files.forEach(file => {
        const filePath = path.join(kbDir, file);
        console.log(`Processing article: ${file}`);
        try {
            const parsed = parseMarkdownFile(filePath);
            articles.push(parsed);
        } catch (e) {
            console.error(`Error parsing ${file}:`, e);
        }
    });
    
    // Reorder articles logically for reading
    const order = [
        'history_and_creator',
        'editions_and_variants',
        'card_counts_and_lists',
        'factions',
        'mechanics',
        'turn_sequence_details',
        'stats_tracking',
        'rule_logic_spec',
        'backend_architecture_plan',
        'groups',
        'specials',
        'inwo',
        'expansions',
        'strategies'
    ];
    
    articles.sort((a, b) => {
        let indexA = order.indexOf(a.id);
        let indexB = order.indexOf(b.id);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    // Extract list of downloaded cards from wiki assets directory for dynamic loading
    const wikiAssetsDir = path.join(kbDir, 'assets');
    const websiteAssetsDir = path.join(__dirname, 'assets');
    let cardAssets = [];
    if (fs.existsSync(wikiAssetsDir)) {
        cardAssets = fs.readdirSync(wikiAssetsDir).filter(f => f.endsWith('.gif') || f.endsWith('.png') || f.endsWith('.jpg'));
        
        // Ensure website assets directory exists
        if (!fs.existsSync(websiteAssetsDir)) {
            fs.mkdirSync(websiteAssetsDir, { recursive: true });
        }
        
        // Copy each asset from wiki to website assets if not present or size differs
        cardAssets.forEach(file => {
            const srcPath = path.join(wikiAssetsDir, file);
            const destPath = path.join(websiteAssetsDir, file);
            
            let shouldCopy = true;
            if (fs.existsSync(destPath)) {
                const srcStat = fs.statSync(srcPath);
                const destStat = fs.statSync(destPath);
                if (srcStat.size === destStat.size) {
                    shouldCopy = false;
                }
            }
            
            if (shouldCopy) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied asset to website: ${file}`);
            }
        });
    }
    
    const outputContent = `// Auto-generated from compile_kb.js. Do not edit directly.
window.WIKI_DATA = {
    generatedAt: "${new Date().toISOString()}",
    cardAssets: ${JSON.stringify(cardAssets, null, 4)},
    articles: ${JSON.stringify(articles, null, 4)}
};
console.log("Illuminati KB Database loaded successfully. " + window.WIKI_DATA.articles.length + " articles compiled.");
`;

    fs.writeFileSync(outputFilePath, outputContent, 'utf8');
    console.log(`Successfully compiled KB data to: ${outputFilePath}`);
}

compile();
