// @ts-nocheck
import {Zw,bW} from "../config/3273_bW.ts";
import {Su,oA} from "../config/2697_oA.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {yu,VR} from "../../vendor/m2249.ts";
import {$c,Vw} from "../../vendor/m2695.ts";
import {nb,ree} from "../config/2668_ree.ts";
import {initModelResolutionModule,Btt} from "../../vendor/m2694.ts";
import {isUsing3PServices,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {yr,getSettings_DEPRECATED} from "../config/0740_updateSettingsForSource.ts";
import {Xt,Le} from "../config/0228_encoding.ts";
import {freshFeatureValues} from "../tools/2698_allErrors.ts";
import {ns} from "../mcp/2194_mcpServerName.ts";
// Builds the system prompt for the claude-code-guide agent.
// Chooses file-system tools (find/grep) vs. bash-based tools depending on whether
// the session uses native (non-3P) services.
function r6p() {
  // When using native services, prefer find/grep; otherwise use bash tool alternatives
  let fileToolList: string = Zw() && Su() ? `${Ws}, \`find\`, and \`grep\`` : `${Ws}, ${yu}, and ${$c}`;
  return `You are the Claude guide agent. Your primary responsibility is helping users understand and use Claude Code, the Claude Agent SDK, and the Claude API (formerly the Anthropic API) effectively.

**Your expertise spans three domains:**

1. **Claude Code** (the CLI tool): Installation, configuration, hooks, skills, MCP servers, keyboard shortcuts, IDE integrations, settings, and workflows.

2. **Claude Agent SDK**: A framework for building custom AI agents based on Claude Code technology. Available for Node.js/TypeScript and Python.

3. **Claude API**: The Claude API (formerly known as the Anthropic API) for direct model interaction, tool use, and integrations.

**Documentation sources:**

- **Claude Code docs** (${n6p}): Fetch this for questions about the Claude Code CLI tool, including:
  - Installation, setup, and getting started
  - Hooks (pre/post command execution)
  - Custom skills
  - MCP server configuration
  - IDE integrations (VS Code, JetBrains)
  - Settings files and configuration
  - Keyboard shortcuts and hotkeys
  - Subagents and plugins
  - Sandboxing and security

- **Claude Agent SDK docs** (${url}): Fetch this for questions about building agents with the SDK, including:
  - SDK overview and getting started (Python and TypeScript)
  - Agent configuration + custom tools
  - Session management and permissions
  - MCP integration in agents
  - Hosting and deployment
  - Cost tracking and context management
  Note: Agent SDK docs are part of the Claude API documentation at the same URL.

- **Claude API docs** (${url}): Fetch this for questions about the Claude API (formerly the Anthropic API), including:
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
6. Use ${initModelResolutionModule} if docs don't cover the topic
7. Reference local project files (CLAUDE.md, .claude/ directory) when relevant using ${fileToolList}

**Guidelines:**
- Always prioritize official documentation over assumptions
- Your training data about Claude Code commands, flags, and settings may be out of date. If ${nb} or ${initModelResolutionModule} fail or you cannot reach the documentation, do not silently answer from memory: tell the user you could not reach the documentation, give the best answer you have, and explicitly note it may be out of date with a link to https://code.claude.com/docs.
- Keep responses concise and actionable
- Include specific examples or code snippets when helpful
- Reference exact documentation URLs in your responses
- Help users discover features by proactively suggesting related commands, shortcuts, or capabilities

Complete the user's request by providing accurate, documentation-based guidance.`;
}

// Returns a footer instruction for where to report issues/missing features.
// 3P (third-party) sessions get the public GitHub issues URL; first-party gets the /feedback slash command.
function o6p() {
  if (isUsing3PServices()) return `- When you cannot find an answer or the feature doesn't exist, direct the user to ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.ISSUES_EXPLAINER}`;
  return "- When you cannot find an answer or the feature doesn't exist, direct the user to use /feedback to report a feature request or bug";
}

// Public constants: docs map URL, API reference URL, and agent type identifier
var n6p = "https://code.claude.com/docs/en/claude_code_docs_map.md",
  url = "https://platform.claude.com/llms.txt",
  i_o = "claude-code-guide",
  drl: any;

// Lazy-initialized agent definition object (drl) for the claude-code-guide built-in agent
var a_o = b(() => {
  // Initialize all dependency modules before building the agent definition
  ef();
  VR();
  Vw();
  ree();
  Btt();
  Ao();
  bW();
  yr();
  oA();
  Xt();
  drl = {
    agentType: i_o,
    whenToUse: `Use this agent when the user asks questions ("Can Claude...", "Does Claude...", "How do I...") about: (1) Claude Code (the CLI tool) - features, hooks, slash commands, MCP servers, settings, IDE integrations, keyboard shortcuts; (2) Claude Agent SDK - building custom agents; (3) Claude API (formerly Anthropic API) - API usage, tool use, Anthropic SDK usage. **IMPORTANT:** Before spawning a new agent, check if there is already a running or recently completed claude-code-guide agent that you can continue via ${freshFeatureValues}.`,
    get tools() {
      // Native sessions get the MCP tool (ns) + bash; 3P sessions use bash-alternative tools
      return Zw() && Su() ? [ns, Ws, nb, initModelResolutionModule] : [yu, $c, Ws, nb, initModelResolutionModule];
    },
    source: "built-in",
    baseDir: "built-in",
    model: "haiku",
    permissionMode: "dontAsk",
    getSystemPrompt({
      toolUseContext: e
    }: {
      toolUseContext: any;
    }) {
      let allCommands: any[] = e.options.commands,
        contextSections: string[] = [],
        // Filter to prompt-type commands (skills/slash commands)
        promptCommands: any[] = allCommands.filter((cmd: any) => cmd.type === "prompt");

      // Append custom skills section if any exist
      if (promptCommands.length > 0) {
        let skillLines: string = promptCommands.map((cmd: any) => `- /${cmd.name}: ${cmd.description}`).join(`\n`);
        contextSections.push(`**Available custom skills in this project:**\n${skillLines}`);
      }

      // Append custom (non-built-in) agent definitions
      let customAgents: any[] = e.options.agentDefinitions.activeAgents.filter((agentDef: any) => agentDef.source !== "built-in");
      if (customAgents.length > 0) {
        let agentLines: string = customAgents.map((agentDef: any) => `- ${agentDef.agentType}: ${agentDef.whenToUse}`).join(`\n`);
        contextSections.push(`**Available custom agents configured:**\n${agentLines}`);
      }

      // Append configured MCP servers section if any
      let mcpClientList: any[] = e.options.mcpClients;
      if (mcpClientList && mcpClientList.length > 0) {
        let mcpLines: string = mcpClientList.map((mcpClient: any) => `- ${mcpClient.name}`).join(`\n`);
        contextSections.push(`**Configured MCP servers:**\n${mcpLines}`);
      }

      // Append plugin skills (skills that come from plugins, not the project itself)
      let pluginSkills: any[] = allCommands.filter((cmd: any) => cmd.type === "prompt" && cmd.source === "plugin");
      if (pluginSkills.length > 0) {
        let pluginLines: string = pluginSkills.map((cmd: any) => `- /${cmd.name}: ${cmd.description}`).join(`\n`);
        contextSections.push(`**Available plugin skills:**\n${pluginLines}`);
      }

      // Append user settings.json if non-empty
      let userSettings: any = getSettings_DEPRECATED();
      if (Object.keys(userSettings).length > 0) {
        let settingsJson: string = Le(userSettings, null, 2);
        contextSections.push(`**User's settings.json:**\n\`\`\`json\n${settingsJson}\n\`\`\``);
      }

      // Build final system prompt: base guide prompt + issues footer + optional config context
      let issuesFooter: string = o6p(),
        basePrompt: string = `${r6p()}\n${issuesFooter}`;
      if (contextSections.length > 0) return `${basePrompt}\n\n---\n\n# User's Current Configuration\n\nThe user has the following custom setup in their environment:\n\n${contextSections.join(`\n\n`)}\n\nWhen answering questions, consider these configured features and proactively suggest them when relevant.`;
      return basePrompt;
    }
  };
});
export {r6p,o6p,n6p,url,i_o,drl,a_o};
