<RULE[wiki_skills]>
# LLM-Wiki Skills Integration

When the user asks you to interact with their personal knowledge base (the "wiki" or "HUB"), or explicitly invokes commands like `/wiki ingest`, `/wiki query`, `/wiki compile`, etc., you have access to a suite of specialized skills.

These skills have been converted from the llm-wiki repository and are available globally with the prefix `wiki-`. 

Before trying to manually manage the wiki directory structure or indexes, check if one of these skills fits the task:
- **Core Operations**: `wiki-wiki`, `wiki-project`, `wiki-session`, `wiki-feedback`
- **Ingestion & Data Collection**: `wiki-ingest`, `wiki-ingest-collection`, `wiki-collect`, `wiki-dataset`
- **Knowledge Processing**: `wiki-compile`, `wiki-thesis`, `wiki-lint`, `wiki-refresh`
- **Search & Reporting**: `wiki-query`, `wiki-research`, `wiki-inventory`, `wiki-ll`, `wiki-output`
- **Maintenance**: `wiki-archive`, `wiki-assess`, `wiki-audit`, `wiki-retract`, `wiki-librarian`

Use these skills instead of ad-hoc scripts whenever appropriate. If a skill seems relevant to your current task, use the `view_file` tool on the SKILL.md file for the specific command in the `C:\Users\hotgh\.gemini\config\skills\` directory to read its full instructions.
</RULE[wiki_skills]>
