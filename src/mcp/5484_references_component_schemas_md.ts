// @ts-nocheck
import {b as L} from "../../runtime.ts";
/*
 * mcp/5444_references_component_schemas_md.ts - MCP and plugin reference restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
var xB4 = `# Component Schemas

Detailed format specifications for every plugin component type. Reference this when implementing components in Phase 4.

## Skills

**Location**: \`skills/skill-name/SKILL.md\`
**Format**: Markdown with YAML frontmatter

### Frontmatter Fields

| Field         | Required | Type   | Description                                             |
| ------------- | -------- | ------ | ------------------------------------------------------- |
| \`name\`        | Yes      | String | Skill identifier (lowercase, hyphens; matches dir name) |
| \`description\` | Yes      | String | Third-person description with trigger phrases           |
| \`metadata\`    | No       | Map    | Arbitrary key-value pairs (e.g., \`version\`, \`author\`)   |

### Example Skill

\`\`\`yaml
---
name: api-design
description: >
  This skill should be used when the user asks to "design an API",
  "create API endpoints", "review API structure", or needs guidance
  on REST API best practices, endpoint naming, or request/response design.
metadata:
  version: "0.1.0"
---
\`\`\`

### Writing Style Rules

- **Frontmatter description**: Third-person ("This skill should be used when..."), with specific trigger phrases in quotes.
- **Body**: Imperative/infinitive form ("Parse the config file," not "You should parse the config file").
- **Length**: Keep SKILL.md body under 3,000 words (ideally 1,500-2,000). Move detailed content to \`references/\`.

### Skill Directory Structure

\`\`\`
skill-name/
\u251C\u2500\u2500 SKILL.md              # Core knowledge (required)
\u251C\u2500\u2500 references/           # Detailed docs loaded on demand
\u2502   \u251C\u2500\u2500 patterns.md
\u2502   \u2514\u2500\u2500 advanced.md
\u251C\u2500\u2500 examples/             # Working code examples
\u2502   \u2514\u2500\u2500 sample-config.json
\u2514\u2500\u2500 scripts/              # Utility scripts
    \u2514\u2500\u2500 validate.sh
\`\`\`

### Progressive Disclosure Levels

1. **Metadata** (always in context): name + description (~100 words)
2. **SKILL.md body** (when skill triggers): core knowledge (<5k words)
3. **Bundled resources** (as needed): references, examples, scripts (unlimited)

## Agents

**Location**: \`agents/agent-name.md\`
**Format**: Markdown with YAML frontmatter

### Frontmatter Fields

| Field         | Required | Type   | Description                                         |
| ------------- | -------- | ------ | --------------------------------------------------- |
| \`name\`        | Yes      | String | Lowercase, hyphens, 3-50 chars                      |
| \`description\` | Yes      | String | Triggering conditions with \`<example>\` blocks       |
| \`model\`       | Yes      | String | \`inherit\`, \`sonnet\`, \`opus\`, or \`haiku\`             |
| \`color\`       | Yes      | String | \`blue\`, \`cyan\`, \`green\`, \`yellow\`, \`magenta\`, \`red\` |
| \`tools\`       | No       | Array  | Restrict to specific tools                          |

### Example Agent

\`\`\`markdown
---
name: code-reviewer
description: Use this agent when the user asks for a thorough code review or wants detailed analysis of code quality, security, and best practices.

<example>
Context: User has just written a new module
user: "Can you do a deep review of this code?"
assistant: "I'll use the code-reviewer agent to provide a thorough analysis."
<commentary>
User explicitly requested a detailed review, which matches this agent's specialty.
</commentary>
</example>

<example>
Context: User is about to merge a PR
user: "Review this before I merge"
assistant: "Let me run a comprehensive review using the code-reviewer agent."
<commentary>
Pre-merge review benefits from the agent's structured analysis process.
</commentary>
</example>

model: inherit
color: blue
tools: ["Read", "Grep", "Glob"]
---

You are a code review specialist focused on identifying issues across security, performance, maintainability, and correctness.

**Your Core Responsibilities:**

1. Analyze code structure and organization
2. Identify security vulnerabilities
3. Flag performance concerns
4. Check adherence to best practices

**Analysis Process:**

1. Read all files in scope
2. Identify patterns and anti-patterns
3. Categorize findings by severity
4. Provide specific remediation suggestions

**Output Format:**
Present findings grouped by severity (Critical, Warning, Info) with:

- File path and line number
- Description of the issue
- Suggested fix
\`\`\`

### Agent Naming Rules

- 3-50 characters
- Lowercase letters, numbers, hyphens only
- Must start and end with alphanumeric
- No underscores, spaces, or special characters

### Color Guidelines

- Blue/Cyan: Analysis, review
- Green: Success-oriented tasks
- Yellow: Caution, validation
- Red: Critical, security
- Magenta: Creative, generation

## Hooks

**Location**: \`hooks/hooks.json\`
**Format**: JSON

### Available Events

| Event              | When it fires                   |
| ------------------ | ------------------------------- |
| \`PreToolUse\`       | Before a tool call executes     |
| \`PostToolUse\`      | After a tool call completes     |
| \`Stop\`             | When Claude finishes a response |
| \`SubagentStop\`     | When a subagent finishes        |
| \`SessionStart\`     | When a session begins           |
| \`SessionEnd\`       | When a session ends             |
| \`UserPromptSubmit\` | When the user sends a message   |
| \`PreCompact\`       | Before context compaction       |
| \`Notification\`     | When a notification fires       |

### Hook Types

**Prompt-based** (recommended for complex logic):

\`\`\`json
{
  "type": "prompt",
  "prompt": "Evaluate whether this file write follows project conventions: $TOOL_INPUT",
  "timeout": 30
}
\`\`\`

Supported events: Stop, SubagentStop, UserPromptSubmit, PreToolUse.

**Command-based** (deterministic checks):

\`\`\`json
{
  "type": "command",
  "command": "bash \${CLAUDE_PLUGIN_ROOT}/hooks/scripts/validate.sh",
  "timeout": 60
}
\`\`\`

### Example hooks.json

\`\`\`json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Check that this file write follows project coding standards. If it violates standards, explain why and block.",
          "timeout": 30
        }
      ]
    }
  ],
  "SessionStart": [
    {
      "matcher": "",
      "hooks": [
        {
          "type": "command",
          "command": "cat \${CLAUDE_PLUGIN_ROOT}/context/project-context.md",
          "timeout": 10
        }
      ]
    }
  ]
}
\`\`\`

### Hook Output Format (Command Hooks)

Command hooks return JSON to stdout:

\`\`\`json
{
  "decision": "block",
  "reason": "File write violates naming convention"
}
\`\`\`

Decisions: \`approve\`, \`block\`, \`ask_user\` (ask for confirmation).

## MCP Servers

**Location**: \`.mcp.json\` at plugin root
**Format**: JSON

### Server Types

**stdio** (local process):

\`\`\`json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["\${CLAUDE_PLUGIN_ROOT}/servers/server.js"],
      "env": {
        "API_KEY": "\${API_KEY}"
      }
    }
  }
}
\`\`\`

**SSE** (remote server, server-sent events transport):

\`\`\`json
{
  "mcpServers": {
    "asana": {
      "type": "sse",
      "url": "https://mcp.asana.com/sse"
    }
  }
}
\`\`\`

**HTTP** (remote server, streamable HTTP transport):

\`\`\`json
{
  "mcpServers": {
    "api-service": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer \${API_TOKEN}"
      }
    }
  }
}
\`\`\`

### Environment Variable Expansion

All MCP configs support \`\${VAR_NAME}\` substitution:

- \`\${CLAUDE_PLUGIN_ROOT}\` \u2014 plugin directory (always use for portability)
- \`\${ANY_ENV_VAR}\` \u2014 user environment variables

Document all required environment variables in the plugin README.

### Directory Servers Without a URL

Some MCP directory entries have no \`url\` because the endpoint is dynamic. Plugins can reference these servers by **name** instead \u2014 if the server name in the plugin's MCP config matches the directory entry name, it is treated the same as a URL match.

## Commands (Legacy)

> **Prefer \`skills/*/SKILL.md\` for new plugins.** The Cowork UI now presents commands and skills as a single "Skills" concept. The \`commands/\` format still works, but only use it if you specifically need the single-file format with \`$ARGUMENTS\`/\`$1\` substitution and inline bash execution.

**Location**: \`commands/command-name.md\`
**Format**: Markdown with optional YAML frontmatter

### Frontmatter Fields

| Field           | Required | Type            | Description                                         |
| --------------- | -------- | --------------- | --------------------------------------------------- |
| \`description\`   | No       | String          | Brief description shown in \`/help\` (under 60 chars) |
| \`allowed-tools\` | No       | String or Array | Tools the command can use                           |
| \`model\`         | No       | String          | Model override: \`sonnet\`, \`opus\`, \`haiku\`           |
| \`argument-hint\` | No       | String          | Documents expected arguments for autocomplete       |

### Example Command

\`\`\`markdown
---
description: Review code for security issues
allowed-tools: Read, Grep, Bash(git:*)
argument-hint: [file-path]
---

Review @$1 for security vulnerabilities including:

- SQL injection
- XSS attacks
- Authentication bypass
- Insecure data handling

Provide specific line numbers, severity ratings, and remediation suggestions.
\`\`\`

### Key Rules

- Commands are instructions FOR Claude, not messages for the user. Write them as directives.
- \`$ARGUMENTS\` captures all arguments as a single string; \`$1\`, \`$2\`, \`$3\` capture positional arguments.
- \`@path\` syntax includes file contents in the command context.
- \`!\` backtick syntax executes bash inline for dynamic context (e.g., \`\` !\`git diff --name-only\` \`\`).
- Use \`\${CLAUDE_PLUGIN_ROOT}\` to reference plugin files portably.

### allowed-tools Patterns

\`\`\`yaml
# Specific tools
allowed-tools: Read, Write, Edit, Bash(git:*)

# Bash with specific commands only
allowed-tools: Bash(npm:*), Read

# MCP tools (specific)
allowed-tools: ["mcp__plugin_name_server__tool_name"]
\`\`\`

## CONNECTORS.md

**Location**: Plugin root
**When to create**: When the plugin references external tools by category rather than specific product

### Format

\`\`\`markdown
# Connectors

## How tool references work

Plugin files use \`~~category\` as a placeholder for whatever tool the user
connects in that category. For example, \`~~project tracker\` might mean
Asana, Linear, Jira, or any other project tracker with an MCP server.

Plugins are tool-agnostic \u2014 they describe workflows in terms of categories
rather than specific products.

## Connectors for this plugin

| Category        | Placeholder         | Included servers | Other options            |
| --------------- | ------------------- | ---------------- | ------------------------ |
| Chat            | \`~~chat\`            | Slack            | Microsoft Teams, Discord |
| Project tracker | \`~~project tracker\` | Linear           | Asana, Jira, Monday      |
\`\`\`

### Using ~~ Placeholders

In plugin files (skills, agents), reference tools generically:

\`\`\`markdown
Check ~~project tracker for open tickets assigned to the user.
Post a summary to ~~chat in the team channel.
\`\`\`

During customization (via the cowork-plugin-customizer skill), these get replaced with specific tool names.

## README.md

Every plugin should include a README with:

1. **Overview** \u2014 what the plugin does
2. **Components** \u2014 list of skills, agents, hooks, MCP servers
3. **Setup** \u2014 any required environment variables or configuration
4. **Usage** \u2014 how to trigger each skill
5. **Customization** \u2014 if CONNECTORS.md exists, mention it
`;
var IB4 = (): any => {};
var mB4 = `# Example Plugins

Three complete plugin structures at different complexity levels. Use these as templates when implementing in Phase 4.

## Minimal Plugin: Single Skill

A simple plugin with one skill and no other components.

### Structure

\`\`\`
meeting-notes/
\u251C\u2500\u2500 .claude-plugin/
\u2502   \u2514\u2500\u2500 plugin.json
\u251C\u2500\u2500 skills/
\u2502   \u2514\u2500\u2500 meeting-notes/
\u2502       \u2514\u2500\u2500 SKILL.md
\u2514\u2500\u2500 README.md
\`\`\`

### plugin.json

\`\`\`json
{
  "name": "meeting-notes",
  "version": "0.1.0",
  "description": "Generate structured meeting notes from transcripts",
  "author": {
    "name": "User"
  }
}
\`\`\`

### skills/meeting-notes/SKILL.md

\`\`\`markdown
---
name: meeting-notes
description: >
  Generate structured meeting notes from a transcript. Use when the user asks
  to "summarize this meeting", "create meeting notes", "extract action items
  from this transcript", or provides a meeting transcript file.
---

Read the transcript file the user provided and generate structured meeting notes.

Include these sections:

1. **Attendees** \u2014 list all participants mentioned
2. **Summary** \u2014 2-3 sentence overview of the meeting
3. **Key Decisions** \u2014 numbered list of decisions made
4. **Action Items** \u2014 table with columns: Owner, Task, Due Date
5. **Open Questions** \u2014 anything unresolved

Write the notes to a new file named after the transcript with \`-notes\` appended.
\`\`\`

---

## Standard Plugin: Skills + MCP

A plugin that combines domain knowledge, user-initiated actions, and external service integration.

### Structure

\`\`\`
code-quality/
\u251C\u2500\u2500 .claude-plugin/
\u2502   \u2514\u2500\u2500 plugin.json
\u251C\u2500\u2500 skills/
\u2502   \u251C\u2500\u2500 coding-standards/
\u2502   \u2502   \u251C\u2500\u2500 SKILL.md
\u2502   \u2502   \u2514\u2500\u2500 references/
\u2502   \u2502       \u2514\u2500\u2500 style-rules.md
\u2502   \u251C\u2500\u2500 review-changes/
\u2502   \u2502   \u2514\u2500\u2500 SKILL.md
\u2502   \u2514\u2500\u2500 fix-lint/
\u2502       \u2514\u2500\u2500 SKILL.md
\u251C\u2500\u2500 .mcp.json
\u2514\u2500\u2500 README.md
\`\`\`

### plugin.json

\`\`\`json
{
  "name": "code-quality",
  "version": "0.1.0",
  "description": "Enforce coding standards with reviews, linting, and style guidance",
  "author": {
    "name": "User"
  }
}
\`\`\`

### skills/review-changes/SKILL.md

\`\`\`markdown
---
name: review-changes
description: >
  Review code changes for style and quality issues. Use when the user asks to
  "review my changes", "check this diff", "review for style violations", or
  wants a code quality pass on uncommitted work.
---

Run \`git diff --name-only\` to get the list of changed files.

For each changed file:

1. Read the file
2. Check against the coding-standards skill for style violations
3. Identify potential bugs or anti-patterns
4. Flag any security concerns

Present a summary with:

- File path
- Issue severity (Error, Warning, Info)
- Description and suggested fix
\`\`\`

### skills/fix-lint/SKILL.md

\`\`\`markdown
---
name: fix-lint
description: >
  Auto-fix linting issues in changed files. Use when the user asks to
  "fix lint errors", "clean up linting", or "auto-fix my lint issues".
---

Run the linter: \`npm run lint -- --format json 2>&1\`

Parse the linter output and fix each issue:

- For auto-fixable issues, apply the fix directly
- For manual-fix issues, make the correction following project conventions
- Skip issues that require architectural changes

After all fixes, run the linter again to confirm clean output.
\`\`\`

### skills/coding-standards/SKILL.md

\`\`\`yaml
---
name: coding-standards
description: >
  This skill should be used when the user asks about "coding standards",
  "style guide", "naming conventions", "code formatting rules", or needs
  guidance on project-specific code quality expectations.
metadata:
  version: "0.1.0"
---
\`\`\`

\`\`\`markdown
# Coding Standards

Project coding standards and conventions for consistent, high-quality code.

## Core Rules

- Use camelCase for variables and functions
- Use PascalCase for classes and types
- Prefer const over let; avoid var
- Maximum line length: 100 characters
- Use explicit return types on all exported functions

## Import Order

1. External packages
2. Internal packages (aliased with @/)
3. Relative imports
4. Type-only imports last

## Additional Resources

- **\`references/style-rules.md\`** \u2014 complete style rules by language
\`\`\`

### .mcp.json

\`\`\`json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
\`\`\`

---

## Full-Featured Plugin: All Component Types

A plugin using skills, agents, hooks, and MCP integration with tool-agnostic connectors.

### Structure

\`\`\`
engineering-workflow/
\u251C\u2500\u2500 .claude-plugin/
\u2502   \u2514\u2500\u2500 plugin.json
\u251C\u2500\u2500 skills/
\u2502   \u251C\u2500\u2500 team-processes/
\u2502   \u2502   \u251C\u2500\u2500 SKILL.md
\u2502   \u2502   \u2514\u2500\u2500 references/
\u2502   \u2502       \u2514\u2500\u2500 workflow-guide.md
\u2502   \u251C\u2500\u2500 standup-prep/
\u2502   \u2502   \u2514\u2500\u2500 SKILL.md
\u2502   \u2514\u2500\u2500 create-ticket/
\u2502       \u2514\u2500\u2500 SKILL.md
\u251C\u2500\u2500 agents/
\u2502   \u2514\u2500\u2500 ticket-analyzer.md
\u251C\u2500\u2500 hooks/
\u2502   \u2514\u2500\u2500 hooks.json
\u251C\u2500\u2500 .mcp.json
\u251C\u2500\u2500 CONNECTORS.md
\u2514\u2500\u2500 README.md
\`\`\`

### plugin.json

\`\`\`json
{
  "name": "engineering-workflow",
  "version": "0.1.0",
  "description": "Streamline engineering workflows: standup prep, ticket management, and code quality",
  "author": {
    "name": "User"
  },
  "keywords": ["engineering", "workflow", "tickets", "standup"]
}
\`\`\`

### agents/ticket-analyzer.md

\`\`\`markdown
---
name: ticket-analyzer
description: Use this agent when the user needs to analyze tickets, triage incoming issues, or prioritize a backlog.

<example>
Context: User is preparing for sprint planning
user: "Help me triage these new tickets"
assistant: "I'll use the ticket-analyzer agent to review and categorize the tickets."
<commentary>
Ticket triage requires systematic analysis across multiple dimensions, making the agent appropriate.
</commentary>
</example>

<example>
Context: User has a large backlog
user: "Prioritize my backlog for next sprint"
assistant: "Let me analyze the backlog using the ticket-analyzer agent to recommend priorities."
<commentary>
Backlog prioritization is a multi-step autonomous task well-suited for the agent.
</commentary>
</example>

model: inherit
color: cyan
tools: ["Read", "Grep"]
---

You are a ticket analysis specialist. Analyze tickets for priority, effort, and dependencies.

**Your Core Responsibilities:**

1. Categorize tickets by type (bug, feature, tech debt, improvement)
2. Estimate relative effort (S, M, L, XL)
3. Identify dependencies between tickets
4. Recommend priority ordering

**Analysis Process:**

1. Read all ticket descriptions
2. Categorize each by type
3. Estimate effort based on scope
4. Map dependencies
5. Rank by impact-to-effort ratio

**Output Format:**
| Ticket | Type | Effort | Dependencies | Priority |
|--------|------|--------|-------------|----------|
| ... | ... | ... | ... | ... |

Followed by a brief rationale for the top 5 priorities.
\`\`\`

### hooks/hooks.json

\`\`\`json
{
  "SessionStart": [
    {
      "matcher": "",
      "hooks": [
        {
          "type": "command",
          "command": "echo '## Team Context\\n\\nSprint cycle: 2 weeks. Standup: daily at 9:30 AM. Use ~~project tracker for ticket management.'",
          "timeout": 5
        }
      ]
    }
  ]
}
\`\`\`

### CONNECTORS.md

\`\`\`markdown
# Connectors

## How tool references work

Plugin files use \`~~category\` as a placeholder for whatever tool the user
connects in that category. Plugins are tool-agnostic.

## Connectors for this plugin

| Category        | Placeholder         | Included servers | Other options       |
| --------------- | ------------------- | ---------------- | ------------------- |
| Project tracker | \`~~project tracker\` | Linear           | Asana, Jira, Monday |
| Chat            | \`~~chat\`            | Slack            | Microsoft Teams     |
| Source control  | \`~~source control\`  | GitHub           | GitLab, Bitbucket   |
\`\`\`

### .mcp.json

\`\`\`json
{
  "mcpServers": {
    "linear": {
      "type": "sse",
      "url": "https://mcp.linear.app/sse"
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.claude.com/mcp"
    }
  }
}
\`\`\`
`;
var uB4 = (): any => {};
var BB4 = '# MCP Discovery and Connection\n\nHow to find and connect MCPs during plugin customization.\n\n## Available Tools\n\n### `search_mcp_registry`\nSearch the MCP directory for available connectors.\n\n**Input:** `{ "keywords": ["array", "of", "search", "terms"] }`\n\n**Output:** Up to 10 results, each with:\n- `name`: MCP display name\n- `description`: One-liner description\n- `tools`: List of tool names the MCP provides\n- `url`: MCP endpoint URL (use this in `.mcp.json`)\n- `directoryUuid`: UUID for use with suggest_connectors\n- `connected`: Boolean - whether user has this MCP connected\n\n### `suggest_connectors`\nDisplay Connect buttons to let users install/connect MCPs.\n\n**Input:** `{ "directoryUuids": ["uuid1", "uuid2"] }`\n\n**Output:** Renders UI with Connect buttons for each MCP\n\n## Category-to-Keywords Mapping\n\n| Category | Search Keywords |\n|----------|-----------------|\n| `project-management` | `["asana", "jira", "linear", "monday", "tasks"]` |\n| `software-coding` | `["github", "gitlab", "bitbucket", "code"]` |\n| `chat` | `["slack", "teams", "discord"]` |\n| `documents` | `["google docs", "notion", "confluence"]` |\n| `calendar` | `["google calendar", "calendar"]` |\n| `email` | `["gmail", "outlook", "email"]` |\n| `design-graphics` | `["figma", "sketch", "design"]` |\n| `analytics-bi` | `["datadog", "grafana", "analytics"]` |\n| `crm` | `["salesforce", "hubspot", "crm"]` |\n| `wiki-knowledge-base` | `["notion", "confluence", "outline", "wiki"]` |\n| `data-warehouse` | `["bigquery", "snowflake", "redshift"]` |\n| `conversation-intelligence` | `["gong", "chorus", "call recording"]` |\n\n## Workflow\n\n1. **Find customization point**: Look for `~~`-prefixed values (e.g., `~~Jira`)\n2. **Check earlier phase findings**: Did you already learn which tool they use?\n   - **Yes**: Search for that specific tool to get its `url`, skip to step 5\n   - **No**: Continue to step 3\n3. **Search**: Call `search_mcp_registry` with mapped keywords\n4. **Present choices and ask user**: Show all results, ask which they use\n5. **Connect if needed**: If not connected, call `suggest_connectors`\n6. **Update MCP config**: Add config using the `url` from search results\n\n## Updating Plugin MCP Configuration\n\n### Finding the Config File\n\n1. **Check `plugin.json`** for an `mcpServers` field:\n   ```json\n   {\n     "name": "my-plugin",\n     "mcpServers": "./config/servers.json"\n   }\n   ```\n   If present, edit the file at that path.\n\n2. **If no `mcpServers` field**, use `.mcp.json` at the plugin root (default).\n\n3. **If `mcpServers` points only to `.mcpb` files** (bundled servers), create a new `.mcp.json` at the plugin root.\n\n### Config File Format\n\nBoth wrapped and unwrapped formats are supported:\n\n```json\n{\n  "mcpServers": {\n    "github": {\n      "type": "http",\n      "url": "https://api.githubcopilot.com/mcp/"\n    }\n  }\n}\n```\n\nUse the `url` field from `search_mcp_registry` results.\n\n### Directory Entries Without a URL\n\nSome directory entries have no `url` because the endpoint is dynamic \u2014 the admin provides it when connecting the server. These servers can still be referenced in the plugin\'s MCP config by **name**: if the MCP server name in the config matches the directory entry name, it is treated the same as a URL match.\n\n## Example: Fully Configured `.mcp.json`\n\n```json\n{\n  "mcpServers": {\n    "github": {\n      "type": "http",\n      "url": "https://api.githubcopilot.com/mcp/",\n      "headers": {\n        "Authorization": "Bearer ${GITHUB_TOKEN}"\n      }\n    },\n    "asana": {\n      "type": "sse",\n      "url": "https://mcp.asana.com/sse"\n    },\n    "slack": {\n      "type": "http",\n      "url": "https://slack.mcp.claude.com/mcp"\n    },\n    "figma": {\n      "type": "http",\n      "url": "https://mcp.figma.com/mcp"\n    },\n    "datadog": {\n      "type": "http",\n      "url": "https://api.datadoghq.com/mcp",\n      "headers": {\n        "DD-API-KEY": "${DATADOG_API_KEY}",\n        "DD-APPLICATION-KEY": "${DATADOG_APP_KEY}"\n      }\n    }\n  },\n  "recommendedCategories": [\n    "source-control",\n    "project-management",\n    "chat",\n    "documents",\n    "wiki-knowledge-base",\n    "design-graphics",\n    "analytics-bi"\n  ]\n}\n\n```\n';
var pB4 = (): any => {};
var FB4 = `# Knowledge MCP Search Strategies

Query patterns for gathering organizational context during plugin customization.

## Finding Tool Names

**Source control:**
- Search: "GitHub" OR "GitLab" OR "Bitbucket"
- Search: "pull request" OR "merge request"
- Look for: repository links, CI/CD mentions

**Project management:**
- Search: "Asana" OR "Jira" OR "Linear" OR "Monday"
- Search: "sprint" AND "tickets"
- Look for: task links, project board mentions

**Chat:**
- Search: "Slack" OR "Teams" OR "Discord"
- Look for: channel mentions, integration discussions

**Analytics:**
- Search: "Datadog" OR "Grafana" OR "Mixpanel"
- Search: "monitoring" OR "observability"
- Look for: dashboard links, alert configurations

**Design:**
- Search: "Figma" OR "Sketch" OR "Adobe XD"
- Look for: design file links, handoff discussions

**CRM:**
- Search: "Salesforce" OR "HubSpot"
- Look for: deal mentions, customer record links

## Finding Organization Values

**Workspace/project IDs:**
- Search for existing integrations or bookmarked links
- Look for admin/setup documentation

**Team conventions:**
- Search: "story points" OR "estimation"
- Search: "workflow" OR "ticket status"
- Look for engineering process docs

**Channel/team names:**
- Search: "standup" OR "engineering" OR "releases"
- Look for channel naming patterns

## When Knowledge MCPs Are Unavailable

If no knowledge MCPs are configured, skip automatic discovery and proceed directly to AskUserQuestion for all categories. Note: AskUserQuestion always includes a Skip button and a free-text input box for custom answers, so do not include \`None\` or \`Other\` as options.
`;
var UB4 = (): any => {};
var QB4 = `# Cowork Plugin Authoring

Create a new Cowork plugin from scratch, or customize an existing one for a specific organization. Both paths deliver a ready-to-install \`.plugin\` file at the end.

## Determining the Mode

Decide from the user's request:

- **Customize** \u2014 the user names an existing installed plugin ("customize the X plugin", "configure X for my company", "set up the X plugin", "update the X skill"). Follow **Customizing an Existing Plugin** below.
- **Create** \u2014 the user wants to build a plugin from scratch ("create a plugin for X", "make a new plugin", "build a plugin that does X"). Follow **Creating a New Plugin** below.

> **Nontechnical output**: Keep all user-facing conversation in plain language. Never mention file paths, directory structures, schema fields, \`~~\` prefixes, or placeholders unless the user asks. Frame everything in terms of what the plugin will do.

> **AskUserQuestion**: When you need input, use AskUserQuestion. Don't assume "industry standard" defaults are correct. AskUserQuestion always includes a Skip button and a free-text input box for custom answers, so do not include \`None\` or \`Other\` as options.

## Plugin Architecture

A plugin is a self-contained directory that extends Claude with skills, agents, hooks, and MCP server integrations.

### Directory Structure

\`\`\`
plugin-name/
\u251C\u2500\u2500 .claude-plugin/
\u2502   \u2514\u2500\u2500 plugin.json           # Required: plugin manifest
\u251C\u2500\u2500 skills/                   # Skills (subdirectories with SKILL.md)
\u2502   \u2514\u2500\u2500 skill-name/
\u2502       \u251C\u2500\u2500 SKILL.md
\u2502       \u2514\u2500\u2500 references/
\u251C\u2500\u2500 agents/                   # Subagent definitions (.md files)
\u251C\u2500\u2500 .mcp.json                 # MCP server definitions
\u2514\u2500\u2500 README.md                 # Plugin documentation
\`\`\`

> **Legacy \`commands/\` format**: Older plugins may include a \`commands/\` directory with single-file \`.md\` slash commands. This format still works, but new plugins should use \`skills/*/SKILL.md\` instead \u2014 the Cowork UI presents both as a single "Skills" concept, and the skills format supports progressive disclosure via \`references/\`. Treat \`commands/*.md\` files the same way you would \`skills/*/SKILL.md\` when customizing.

**Rules:**

- \`.claude-plugin/plugin.json\` is always required
- Component directories (\`skills/\`, \`agents/\`) go at the plugin root, not inside \`.claude-plugin/\`
- Only create directories for components the plugin actually uses
- Use kebab-case for all directory and file names

### plugin.json Manifest

Located at \`.claude-plugin/plugin.json\`. Minimal required field is \`name\`.

\`\`\`json
{
  "name": "plugin-name",
  "version": "0.1.0",
  "description": "Brief explanation of plugin purpose",
  "author": {
    "name": "Author Name"
  }
}
\`\`\`

**Name rules:** kebab-case, lowercase with hyphens, no spaces or special characters.
**Version:** semver format (MAJOR.MINOR.PATCH). Start at \`0.1.0\`.

Optional fields: \`homepage\`, \`repository\`, \`license\`, \`keywords\`.

Custom component paths can be specified (supplements, does not replace, auto-discovery):

\`\`\`json
{
  "commands": "./custom-commands",
  "agents": ["./agents", "./specialized-agents"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./.mcp.json"
}
\`\`\`

### Component Summary

Detailed schemas for each component type are in \`references/component-schemas.md\`.

| Component                          | Location            | Format                      |
| ---------------------------------- | ------------------- | --------------------------- |
| Skills                             | \`skills/*/SKILL.md\` | Markdown + YAML frontmatter |
| MCP Servers                        | \`.mcp.json\`         | JSON                        |
| Agents (uncommonly used in Cowork) | \`agents/*.md\`       | Markdown + YAML frontmatter |
| Hooks (rarely used in Cowork)      | \`hooks/hooks.json\`  | JSON                        |
| Commands (legacy)                  | \`commands/*.md\`     | Markdown + YAML frontmatter |

This schema is shared with Claude Code's plugin system, but you're building for Claude Cowork, a desktop app for knowledge work. Cowork users will usually find skills the most useful. **Scaffold new plugins with \`skills/*/SKILL.md\` \u2014 do not create \`commands/\` unless the user explicitly needs the legacy single-file format.**

### Customizable plugins with \`~~\` placeholders

> **Do not use or ask about this pattern by default.** Only introduce \`~~\` placeholders if the user explicitly says they want people outside their organization to use the plugin. You can mention it as an option if they want to distribute externally, but do not proactively ask with AskUserQuestion.

When a plugin is intended to be shared outside the author's company, it might reference external tools by category rather than specific product (e.g., "project tracker" instead of "Jira"). Use generic language and mark these as requiring customization with two tilde characters: \`create an issue in ~~project tracker\`.

If any tool categories are used, write a \`CONNECTORS.md\` file at the plugin root to explain:

\`\`\`markdown
# Connectors

## How tool references work

Plugin files use \`~~category\` as a placeholder for whatever tool the user
connects in that category. Plugins are tool-agnostic \u2014 they describe
workflows in terms of categories rather than specific products.

## Connectors for this plugin

| Category        | Placeholder         | Options                         |
| --------------- | ------------------- | ------------------------------- |
| Chat            | \`~~chat\`            | Slack, Microsoft Teams, Discord |
| Project tracker | \`~~project tracker\` | Linear, Asana, Jira             |
\`\`\`

### \${CLAUDE_PLUGIN_ROOT} Variable

Use \`\${CLAUDE_PLUGIN_ROOT}\` for all intra-plugin path references in hooks and MCP configs. Never hardcode absolute paths.

## Creating a New Plugin

Build from scratch through a five-phase guided conversation.

### Phase 1: Discovery

Understand what the user wants to build and why. Ask (only what is unclear \u2014 skip questions the user's initial request already answers):

- What should this plugin do? What problem does it solve?
- Who will use it and in what context?
- Does it integrate with any external tools or services?
- Is there a similar plugin or workflow to reference?

Summarize understanding and confirm before proceeding.

### Phase 2: Component Planning

Based on discovery, determine which component types are needed:

- **Skills** \u2014 Specialized knowledge Claude loads on-demand, or user-initiated actions (domain expertise, reference schemas, workflow guides, deploy/configure/analyze/review actions)
- **MCP Servers** \u2014 External service integration (databases, APIs, SaaS tools)
- **Agents (uncommon)** \u2014 Autonomous multi-step tasks (validation, generation, analysis)
- **Hooks (rare)** \u2014 Automatic behavior on certain events (enforce policies, load context, validate operations)

Present a component plan table including types you decided not to create:

\`\`\`
| Component | Count | Purpose |
|-----------|-------|---------|
| Skills    | 3     | Domain knowledge for X, /do-thing, /check-thing |
| Agents    | 0     | Not needed |
| Hooks     | 1     | Validate writes |
| MCP       | 1     | Connect to service Y |
\`\`\`

Get user confirmation before proceeding.

### Phase 3: Design & Clarifying Questions

Specify each component in detail. Resolve all ambiguities before implementation. Present questions grouped by component type and wait for answers.

**Skills:**

- What user queries should trigger this skill?
- What knowledge domains does it cover?
- Should it include reference files for detailed content?
- If it represents a user-initiated action: what arguments does it accept, and what tools does it need? (Read, Write, Bash, Grep, etc.)

**Agents:**

- Should it trigger proactively or only when requested?
- What tools does it need?
- What output format?

**Hooks:**

- Which events? (PreToolUse, PostToolUse, Stop, SessionStart, etc.)
- What behavior \u2014 validate, block, modify, add context?
- Prompt-based (LLM-driven) or command-based (deterministic script)?

**MCP Servers:**

- What server type? (stdio for local, SSE for hosted with OAuth, HTTP for REST APIs)
- What authentication method?
- What tools should be exposed?

If the user says "whatever you think is best," provide specific recommendations and get explicit confirmation.

### Phase 4: Implementation

Create all plugin files following best practices.

1. Create the plugin directory structure
2. Create \`plugin.json\` manifest
3. Create each component (see \`references/component-schemas.md\` for exact formats)
4. Create \`README.md\` documenting the plugin

**Guidelines:**

- **Skills** use progressive disclosure: lean SKILL.md body (under 3,000 words), detailed content in \`references/\`. Frontmatter description must be third-person with specific trigger phrases. Skill bodies are instructions FOR Claude, not messages to the user \u2014 write them as directives.
- **Agents** need a description with \`<example>\` blocks showing triggering conditions, plus a system prompt in the markdown body.
- **Hooks** config goes in \`hooks/hooks.json\`. Use \`\${CLAUDE_PLUGIN_ROOT}\` for script paths. Prefer prompt-based hooks for complex logic.
- **MCP configs** go in \`.mcp.json\` at plugin root. Use \`\${CLAUDE_PLUGIN_ROOT}\` for local server paths. Document required env vars in README.

### Phase 5: Review

1. Summarize what was created \u2014 list each component and its purpose
2. Ask if the user wants any adjustments
3. Run \`claude plugin validate <path-to-plugin-json>\` to check the plugin structure. If this command is unavailable (e.g., when running inside Cowork), verify manually:
   - \`.claude-plugin/plugin.json\` exists and contains valid JSON with at least a \`name\` field
   - The \`name\` field is kebab-case (lowercase letters, numbers, and hyphens only)
   - Any component directories referenced by the plugin (\`commands/\`, \`skills/\`, \`agents/\`, \`hooks/\`) actually exist and contain files in the expected formats \u2014 \`.md\` for commands/skills/agents, \`.json\` for hooks
   - Each skill subdirectory contains a \`SKILL.md\`
   - Report what passed and what didn't, the same way the CLI validator would

   Fix any errors, then proceed to **Packaging**.

## Customizing an Existing Plugin

Customize a plugin for a specific organization \u2014 either by setting up a generic plugin template for the first time, or by tweaking an already-configured plugin.

### Finding the plugin

Run \`find mnt/.local-plugins mnt/.plugins ~/.claude/plugins/synced -type d -name "*<plugin-name>*" 2>/dev/null\` to locate the plugin directory, then read its files to understand its structure before making changes.

If you cannot find the plugin directory in any of those locations, let the user know: "I couldn't find an installed plugin named '<plugin-name>'. If it's installed on your desktop, open this task from the Cowork desktop app so I can access it."

### Determining the Customization Mode

After locating the plugin, check for \`~~\`-prefixed placeholders: \`grep -rn '~~\\w' /path/to/plugin --include='*.md' --include='*.json'\`

> **Default rule**: If \`~~\` placeholders exist, default to **Generic plugin setup** unless the user explicitly asks to customize a specific part of the plugin.

**1. Generic plugin setup** \u2014 The plugin contains \`~~\`-prefixed placeholders. These are customization points in a template that need to be replaced with real values (e.g., \`~~Jira\` \u2192 \`Asana\`, \`~~your-team-channel\` \u2192 \`#engineering\`).

**2. Scoped customization** \u2014 No \`~~\` placeholders exist, and the user asked to customize a specific part of the plugin (e.g., "customize the connectors", "update the standup skill", "change the ticket tool"). Read the plugin files to find the relevant section(s) and focus only on those. Do not scan the entire plugin or present unrelated customization items.

**3. General customization** \u2014 No \`~~\` placeholders exist, and the user wants to modify the plugin broadly. Read the plugin's files to understand its current configuration, then ask the user what they'd like to change.

> **Important**: Never change the name of the plugin or skill being customized. Do not rename directories, files, or the plugin/skill name fields.

### Customization Workflow

#### Phase 0: Gather User Intent (scoped and general customization only)

Check whether the user provided free-form context alongside their request (e.g., "customize the standup skill \u2014 we do async standups in #eng-updates every morning").

- **If the user provided context**: Record it and use it to pre-fill answers in Phase 3 \u2014 skip asking questions the user already answered here.
- **If the user did not provide context**: Ask a single open-ended question using AskUserQuestion before proceeding. Tailor it to what they asked to customize \u2014 e.g., "What changes do you have in mind for the brief skill?" or "What would you like to change about how this plugin works?" Keep it short and specific.

#### Phase 1: Gather Context from Knowledge MCPs

Use company-internal knowledge MCPs to collect information relevant to the customization scope. See \`references/search-strategies.md\` for detailed query patterns.

**What to gather** (scope to what's relevant):

- Tool names and services the organization uses
- Organizational processes and workflows
- Team conventions (naming, statuses, estimation scales)
- Configuration values (workspace IDs, project names, team identifiers)

**Sources to search:**

1. **Chat/Slack MCPs** \u2014 tool mentions, integrations, workflow discussions
2. **Document MCPs** \u2014 onboarding docs, tool guides, setup instructions
3. **Email MCPs** \u2014 license notifications, admin emails, setup invitations

Record all findings for use in Phase 3.

#### Phase 2: Create Todo List

Build a todo list of changes to make, scoped appropriately:

- **Scoped customization**: Only items related to the specific section the user asked about.
- **Generic plugin setup**: Run \`grep -rn '~~\\w' /path/to/plugin --include='*.md' --include='*.json'\` to find all placeholder customization points. Group them by theme.
- **General customization**: Read the plugin files, understand the current config, and based on the user's request, identify what needs to change.

Use user-friendly descriptions that focus on the plugin's purpose:

- **Good**: "Learn how standup prep works at Company"
- **Bad**: "Replace placeholders in skills/standup-prep/SKILL.md"

#### Phase 3: Complete Todo Items

Work through each item using context from Phase 0 and Phase 1.

**If the user's free-form input (Phase 0) or knowledge MCPs (Phase 1) provided a clear answer**: Apply directly without confirmation.

**Otherwise**: Use AskUserQuestion. Don't assume "industry standard" defaults are correct \u2014 if neither the user's input nor knowledge MCPs provided a specific answer, ask.

**Types of changes:**

1. **Placeholder replacements** (generic setup): \`~~Jira\` \u2192 \`Asana\`, \`~~your-org-channel\` \u2192 \`#engineering\`
2. **Content updates**: Modifying instructions, skills, workflows, or references to match the organization
3. **URL pattern updates**: \`tickets.example.com/your-team/123\` \u2192 \`app.asana.com/0/PROJECT_ID/TASK_ID\`
4. **Configuration values**: Workspace IDs, project names, team identifiers

If the user doesn't know or skips, leave the value unchanged (or the \`~~\`-prefixed placeholder, for generic setup).

#### Phase 4: Search for Useful MCPs

After customization items are resolved, connect MCPs for any tools that were identified or changed. See \`references/mcp-servers.md\` for the full workflow, category-to-keywords mapping, and config file format.

For each tool identified during customization:

1. Search the registry: \`search_mcp_registry(keywords=[...])\` using category keywords from \`references/mcp-servers.md\`, or search for the specific tool name if already known
2. If unconnected: \`suggest_connectors(directoryUuids=["chosen-uuid"])\` \u2014 user completes auth
3. Update the plugin's MCP config file (check \`plugin.json\` for custom location, otherwise \`.mcp.json\` at root)

Collect all MCP results and present them together in the summary output \u2014 don't present MCPs one at a time during this phase.

### Summary Output

After customization, present the user with a summary of what was learned grouped by source. Always include the MCPs sections showing which were connected and which the user should still connect:

\`\`\`markdown
## From searching Slack

- You use Asana for project management
- Sprint cycles are 2 weeks

## From searching documents

- Story points use T-shirt sizes

## From your answers

- Ticket statuses are: Backlog, In Progress, In Review, Done
\`\`\`

Then present the MCPs that were connected during setup and any that the user should still connect, with instructions.

If no knowledge MCPs were available in Phase 1, and the user had to answer at least one question manually, include a note at the end:

> By the way, connecting sources like Slack or Microsoft Teams would let me find answers automatically next time you customize a plugin.

Then proceed to **Packaging**.

## Packaging

After create or customize completes, package the plugin as a \`.plugin\` file and deliver it with the SendUserFile tool:

1. Zip the plugin directory:
   \`\`\`bash
   cd /path/to/plugin-dir && zip -r /tmp/plugin-name.plugin . -x "setup/*" -x "*.DS_Store"
   \`\`\`
2. Call \`SendUserFile\` with \`files: ["/tmp/plugin-name.plugin"]\`, \`status: "normal"\`, and a short caption summarizing what was built or changed.

The \`.plugin\` file will appear in the chat as a rich preview where the user can browse the files and accept the plugin by pressing a button.

> **Naming**: Use the plugin name from \`plugin.json\` (for create) or the original plugin directory name (for customize) as the \`.plugin\` filename. Do not rename the plugin or its files during customization \u2014 only replace placeholder values and update content.

## Best Practices

- **Start small**: Begin with the minimum viable set of components. A plugin with one well-crafted skill is more useful than one with five half-baked components.
- **Progressive disclosure for skills**: Core knowledge in SKILL.md, detailed reference material in \`references/\`, working examples in \`examples/\`.
- **Clear trigger phrases**: Skill descriptions should include specific phrases users would say. Agent descriptions should include \`<example>\` blocks.
- **Skills are for Claude**: Write skill body content as instructions for Claude to follow, not documentation for the user to read.
- **Imperative writing style**: Use verb-first instructions in skills ("Parse the config file," not "You should parse the config file").
- **Portability**: Always use \`\${CLAUDE_PLUGIN_ROOT}\` for intra-plugin paths, never hardcoded paths.
- **Security**: Use environment variables for credentials, HTTPS for remote servers, least-privilege tool access.

## Additional Resources

- **\`references/component-schemas.md\`** \u2014 Detailed format specifications for every component type (skills, agents, hooks, MCP, legacy commands, CONNECTORS.md)
- **\`references/example-plugins.md\`** \u2014 Three complete example plugin structures at different complexity levels
- **\`references/mcp-servers.md\`** \u2014 MCP discovery workflow, category-to-keywords mapping, config file locations, example \`.mcp.json\`
- **\`references/search-strategies.md\`** \u2014 Knowledge MCP query patterns for finding tool names and org values
`;
var gB4 = (): any => {};
var cB4, dB4;
var lB4 = L((): any => {
  IB4();
  uB4();
  pB4();
  UB4();
  gB4();
  cB4 = QB4, dB4 = {
    "references/component-schemas.md": xB4,
    "references/example-plugins.md": mB4,
    "references/mcp-servers.md": BB4,
    "references/search-strategies.md": FB4
  };
});
export {xB4 as P7l,IB4 as D7l,mB4 as L7l,uB4 as O7l,BB4 as N7l,pB4 as M7l,FB4 as F7l,UB4 as B7l,QB4 as $7l,gB4 as U7l,cB4 as q7l,dB4 as j7l,lB4 as W7l};
