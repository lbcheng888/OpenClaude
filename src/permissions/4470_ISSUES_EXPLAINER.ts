// @ts-nocheck
import {ov,NW} from "../config/3289_NW.ts";
import {Yc,Zm} from "../config/2709_Zm.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {nb,eee} from "../config/2679_eee.ts";
import {w4,$rt} from "../../vendor/m2706.ts";
import {isUsing3PServices as F7,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {br,getSettings_DEPRECATED as $o} from "../config/0745_updateSettingsForSource.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {o_} from "../tools/2710_allErrors.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
// @ts-nocheck
// Builds the system prompt for the claude-code-guide agent.
// Chooses file-system tools (find/grep) vs. bash-based tools depending on whether
// the session uses native (non-3P) services.
function buildGuideSystemPrompt() {
  // When using native services, prefer find/grep; otherwise use bash tool alternatives
  let fileToolList: string = ov() && Yc() ? `${vs}, \`find\`, and \`grep\`` : `${vs}, ${su}, and ${Cc}`;
  return `You are the Claude guide agent. Your primary responsibility is helping users understand and use Claude Code, the Claude Agent SDK, and the Claude API (formerly the Anthropic API) effectively.

**Your expertise spans three domains:**

1. **Claude Code** (the CLI tool): Installation, configuration, hooks, skills, MCP servers, keyboard shortcuts, IDE integrations, settings, and workflows.

2. **Claude Agent SDK**: A framework for building custom AI agents based on Claude Code technology. Available for Node.js/TypeScript and Python.

3. **Claude API**: The Claude API (formerly known as the Anthropic API) for direct model interaction, tool use, and integrations.

**Documentation sources:**

- **Claude Code docs** (${Uzp}): Fetch this for questions about the Claude Code CLI tool, including:
  - Installation, setup, and getting started
  - Hooks (pre/post command execution)
  - Custom skills
  - MCP server configuration
  - IDE integrations (VS Code, JetBrains)
  - Settings files and configuration
  - Keyboard shortcuts and hotkeys
  - Subagents and plugins
  - Sandboxing and security

- **Claude Agent SDK docs** (${Jcl}): Fetch this for questions about building agents with the SDK, including:
  - SDK overview and getting started (Python and TypeScript)
  - Agent configuration + custom tools
  - Session management and permissions
  - MCP integration in agents
  - Hosting and deployment
  - Cost tracking and context management
  Note: Agent SDK docs are part of the Claude API documentation at the same URL.

- **Claude API docs** (${Jcl}): Fetch this for questions about the Claude API (formerly the Anthropic API), including:
  - Messages API and streaming
  - Tool use (function calling) and Anthropic-defined tools (computer use, code execution, web search, text editor, bash, programmatic tool calling, tool search tool, context editing, Files API, structured outputs)
  - Vision, PDF support, and citations
  - Extended thinking and structured outputs
  - MCP connector for remote MCP servers
  - Cloud provider integrations (Bedrock, Vertex AI, Foundry)

**Approach:**
1. Determine which domain the user's question falls into
2. Use ${nb} to fetch the appropriate docs map
3. Identify the most relevant documentation URLs from the map
4. Fetch the specific documentation pages
5. Provide clear, actionable guidance based on official documentation
6. Use ${w4} if docs don't cover the topic
7. Reference local project files (CLAUDE.md, .claude/ directory) when relevant using ${fileToolList}

**Guidelines:**
- Always prioritize official documentation over assumptions
- Your training data about Claude Code commands, flags, and settings may be out of date. If ${nb} or ${w4} fail or you cannot reach the documentation, do not silently answer from memory: tell the user you could not reach the documentation, give the best answer you have, and explicitly note it may be out of date with a link to https://code.claude.com/docs.
- Keep responses concise and actionable
- Include specific examples or code snippets when helpful
- Reference exact documentation URLs in your responses
- Help users discover features by proactively suggesting related commands, shortcuts, or capabilities

Complete the user's request by providing accurate, documentation-based guidance.`;
}

// Returns a footer instruction for where to report issues/missing features.
// 3P (third-party) sessions get the public GitHub issues URL; first-party gets the /feedback slash command.
function buildIssuesFooter() {
  if (F7()) return `- When you cannot find an answer or the feature doesn't exist, direct the user to ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.ISSUES_EXPLAINER}`;
  return "- When you cannot find an answer or the feature doesn't exist, direct the user to use /feedback to report a feature request or bug";
}

// Public constants: docs map URL, API reference URL, and agent type identifier
var Uzp = "https://code.claude.com/docs/en/claude_code_docs_map.md",
  Jcl = "https://platform.claude.com/llms.txt",
  eCo = "claude-code-guide",
  Xcl;

// Lazy-initialized agent definition object (Xcl) for the claude-code-guide built-in agent
var tCo = b(() => {
  // Initialize all dependency modules before building the agent definition
  dm();
  ow();
  XR();
  eee();
  $rt();
  lo();
  NW();
  br();
  Zm();
  tn();
  Xcl = {
    agentType: eCo,
    whenToUse: `Use this agent when the user asks questions ("Can Claude...", "Does Claude...", "How do I...") about: (1) Claude Code (the CLI tool) - features, hooks, slash commands, MCP servers, settings, IDE integrations, keyboard shortcuts; (2) Claude Agent SDK - building custom agents; (3) Claude API (formerly Anthropic API) - API usage, tool use, Anthropic SDK usage. **IMPORTANT:** Before spawning a new agent, check if there is already a running or recently completed claude-code-guide agent that you can continue via ${o_}.`,
    get tools() {
      // Native sessions get the MCP tool (Mo) + bash; 3P sessions use bash-alternative tools
      return ov() && Yc() ? [Mo, vs, nb, w4] : [su, Cc, vs, nb, w4];
    },
    source: "built-in",
    baseDir: "built-in",
    model: "haiku",
    permissionMode: "dontAsk",
    getSystemPrompt({
      toolUseContext: toolUseContext
    }: {
      toolUseContext: any;
    }) {
      let allCommands: any[] = toolUseContext.options.commands,
        contextSections: string[] = [],
        // Filter to prompt-type commands (skills/slash commands)
        promptCommands: any[] = allCommands.filter((cmd: any) => cmd.type === "prompt");
      if (promptCommands.length > 0) {
        let skillLines: string = promptCommands.map((cmd: any) => `- /${cmd.name}: ${cmd.description}`).join(`
`);
        contextSections.push(`**Available custom skills in this project:**
${skillLines}`);
      }
      // Append custom (non-built-in) agent definitions
      let customAgents: any[] = toolUseContext.options.agentDefinitions.activeAgents.filter((agentDef: any) => agentDef.source !== "built-in");
      if (customAgents.length > 0) {
        let agentLines: string = customAgents.map((agentDef: any) => `- ${agentDef.agentType}: ${agentDef.whenToUse}`).join(`
`);
        contextSections.push(`**Available custom agents configured:**
${agentLines}`);
      }
      // Append configured MCP servers section if any
      let mcpClientList: any[] = toolUseContext.options.mcpClients;
      if (mcpClientList && mcpClientList.length > 0) {
        let mcpLines: string = mcpClientList.map((mcpClient: any) => `- ${mcpClient.name}`).join(`
`);
        contextSections.push(`**Configured MCP servers:**
${mcpLines}`);
      }
      // Append plugin skills (skills that come from plugins, not the project itself)
      let pluginSkills: any[] = allCommands.filter((cmd: any) => cmd.type === "prompt" && cmd.source === "plugin");
      if (pluginSkills.length > 0) {
        let pluginLines: string = pluginSkills.map((cmd: any) => `- /${cmd.name}: ${cmd.description}`).join(`
`);
        contextSections.push(`**Available plugin skills:**
${pluginLines}`);
      }
      // Append user settings.json if non-empty
      let userSettings: any = $o();
      if (Object.keys(userSettings).length > 0) {
        let settingsJson: string = Pe(userSettings, null, 2);
        contextSections.push(`**User's settings.json:**
\`\`\`json
${settingsJson}
\`\`\``);
      }
      // Build final system prompt: base guide prompt + issues footer + optional config context
      let issuesFooter: string = buildIssuesFooter(),
        basePrompt: string = `${buildGuideSystemPrompt()}
${issuesFooter}`;
      if (contextSections.length > 0) return `${basePrompt}

---

# User's Current Configuration

The user has the following custom setup in their environment:

${contextSections.join(`

`)}

When answering questions, consider these configured features and proactively suggest them when relevant.`;
      return basePrompt;
    }
  };
});
export {buildGuideSystemPrompt as $zp,buildIssuesFooter as qzp,Uzp,Jcl,eCo,Xcl,tCo};
