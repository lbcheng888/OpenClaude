// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {jsc,zsc} from "./5564_SKILL_PROMPT.ts";
import {getSettings_DEPRECATED as $o,br} from "../config/0745_updateSettingsForSource.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {wzn,ZWt,CWe} from "../../vendor/m4794.ts";
import {fet} from "../../vendor/m2214.ts";
import {isUsing3PServices as F7,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
var Qsc = {};
ft(Qsc, {
  registerClaudeCodeSkill: () => registerClaudeCodeSkill,
  CLAUDE_CODE_SKILL_NAME: () => CLAUDE_CODE_SKILL_NAME,
  CLAUDE_CODE_SKILL_DESCRIPTION: () => CLAUDE_CODE_SKILL_DESCRIPTION
});
/**
 * Lazily imports and memoizes the skill's bundled assets module
 * (exposing SKILL_FILES and SKILL_PROMPT). The memo is stored in M5m.
 */
function Ysc(): Promise<typeof zsc> {
  return M5m ??= Promise.resolve().then(() => (jsc(), zsc));
}
/**
 * Builds the "Current Build" context block: a human-readable snapshot of the
 * running binary's commands, custom skills, agents, MCP servers, settings keys,
 * recent releases, and provider context.
 *
 * @param appContext - Runtime context holding options (commands, agents, MCP clients).
 * @param changelogSource - Raw changelog source parsed by wzn into version entries.
 * @returns A newline-joined markdown summary, or "" if nothing applies.
 */
function F5m(appContext: any, changelogSource: any): string {
  let sections: string[] = [],
    allCommands = appContext.options.commands.filter((command: any) => !command.isHidden),
    isBuiltinCommand = (command: any) => command.type !== "prompt" || command.source === "builtin" || command.source === "bundled",
    builtinCommands = allCommands.filter(isBuiltinCommand);
  if (builtinCommands.length > 0) {
    let lines = builtinCommands.map((command: any) => {
      let aliasSuffix = command.aliases?.length ? ` (aliases: ${command.aliases.map((alias: string) => `/${alias}`).join(", ")})` : "";
      return `- /${command.name}${aliasSuffix}: ${command.description}`;
    }).sort();
    sections.push(`**Available commands (${builtinCommands.length} in this build):**
${lines.join(`
`)}`);
  }
  let customCommands = allCommands.filter((command: any) => !isBuiltinCommand(command));
  if (customCommands.length > 0) {
    let lines = customCommands.map((command: any) => `- /${command.name}: ${command.description}`).sort();
    sections.push(`**Custom skills configured:**
${lines.join(`
`)}`);
  }
  let customAgents = appContext.options.agentDefinitions.activeAgents.filter((agent: any) => agent.source !== "built-in");
  if (customAgents.length > 0) {
    let lines = customAgents.map((agent: any) => `- ${agent.agentType}: ${agent.whenToUse}`).sort();
    sections.push(`**Custom agents configured:**
${lines.join(`
`)}`);
  }
  let mcpClients = appContext.options.mcpClients;
  if (mcpClients && mcpClients.length > 0) {
    let lines = mcpClients.map((client: any) => `- ${client.name}`).sort();
    sections.push(`**Configured MCP servers:**
${lines.join(`
`)}`);
  }
  let settingsKeys = Object.keys($o()).sort();
  if (settingsKeys.length > 0) sections.push(`**Settings keys configured (values omitted):** ${settingsKeys.join(", ")}. To see values, the user can run \`claude config list\` or open \`~/.claude/settings.json\`.`);
  let currentVersion = mi({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, "-"),
    recentReleases = wzn(changelogSource).filter(([version]: [string, any]) => fet(version, currentVersion)).slice(-10).reverse();
  if (recentReleases.length > 0) {
    let lines = recentReleases.map(([version, entries]: [string, string[]]) => `### ${version}
` + entries.map((entry: string) => `- ${entry}`).join(`
`));
    sections.push(`**Recent releases (you are running v${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}):**
${lines.join(`

`)}`);
  }
  if (F7()) sections.push("**Provider context:** This session is not using Anthropic's first-party API. WebSearch may be unavailable, `/feedback` is unavailable, and some features behave differently — check the docs page for the user's specific provider. Direct issues to https://github.com/anthropics/claude-code/issues.");
  return sections.join(`

`);
}
/**
 * Assembles the full skill prompt: base skill prompt, the live "Current Build"
 * context block, and the optional user request, joined by markdown separators.
 *
 * @param basePrompt - The static skill prompt text.
 * @param userRequest - The user's question (may be empty/whitespace).
 * @param appContext - Runtime context passed through to F5m.
 * @param changelogSource - Changelog source passed through to F5m.
 * @returns The combined prompt text.
 */
function B5m(basePrompt: string, userRequest: string, appContext: any, changelogSource: any): string {
  let parts: string[] = [basePrompt],
    currentBuild = F5m(appContext, changelogSource);
  if (currentBuild) parts.push(`---

# Current Build

Generated from the running Claude Code binary at invocation time. This is ground truth — it overrides your training data and any documentation when they disagree about what exists in this build.

${currentBuild}`);
  if (userRequest.trim()) parts.push(`---

## User Request

${userRequest}`);
  return parts.join(`

`);
}
/**
 * Registers the built-in "claude-code-docs" skill, which answers questions about
 * Claude Code's own features and settings, verifying against the running build.
 */
function registerClaudeCodeSkill() {
  Td({
    name: CLAUDE_CODE_SKILL_NAME,
    menuDescription: "Answer questions about Claude Code features and settings",
    description: CLAUDE_CODE_SKILL_DESCRIPTION,
    allowedTools: ["Read", "Grep", "Glob", "WebFetch"],
    argumentHint: "[question]",
    userInvocable: !0,
    files: () => Ysc().then(skillModule => skillModule.SKILL_FILES),
    isEnabled() {
      return it("tengu_birch_kettle", !1);
    },
    async getPromptForCommand(userRequest: string, appContext: any) {
      W("tengu_claude_code_skill_loaded", {
        has_args: userRequest.trim().length > 0
      });
      let [changelogSource, {
        SKILL_PROMPT: skillPrompt
      }] = await Promise.all([ZWt(), Ysc()]);
      return [{
        type: "text",
        text: B5m(skillPrompt, userRequest, appContext, changelogSource)
      }];
    }
  });
}
var M5m: Promise<typeof zsc> | undefined,
  CLAUDE_CODE_SKILL_NAME = "claude-code-docs",
  N5m = `Answer questions about Claude Code itself: commands, flags, settings, hooks, skills, MCP servers, subagents, IDE integrations, sandboxing, deployment. Verifies against the running build before recommending any command, flag, or setting.
`,
  CLAUDE_CODE_SKILL_DESCRIPTION: string;
var Zsc = b(() => {
  jn();
  kt();
  lo();
  CWe();
  br();
  lr();
  Cb();
  CLAUDE_CODE_SKILL_DESCRIPTION = N5m + `TRIGGER when: user asks how Claude Code works ("Can Claude…", "Does Claude…", "How do I…", "Is there a way to…"); user asks about a slash command, CLI flag, settings key, hook, skill, MCP server, subagent, keybinding, or .claude/ directory; user wants to configure, customize, or troubleshoot Claude Code; YOU are about to recommend a Claude Code slash command, flag, or setting and have not verified it exists in this build.
` + "SKIP: questions about building applications with the Claude API or Anthropic SDK (use /claude-api), general programming questions, questions about the user's own codebase.";
});
export {Qsc,Ysc,F5m,B5m,registerClaudeCodeSkill,M5m,CLAUDE_CODE_SKILL_NAME,N5m,CLAUDE_CODE_SKILL_DESCRIPTION,Zsc};
