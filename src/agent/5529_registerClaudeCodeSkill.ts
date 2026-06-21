// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {getSettings_DEPRECATED,yr} from "../config/0740_updateSettingsForSource.ts";
import {Di,dr} from "../../vendor/m231.ts";
import {$Wn,Ljt,Vje} from "../../vendor/m4762.ts";
import {mQe} from "../../vendor/m2206.ts";
import {isUsing3PServices,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {aXl,lXl,cXl} from "../permissions/5528_references_live_sources_md.ts";
import {ap,BE} from "../../vendor/m5006.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
// Module namespace object for __export registrations
var pXl = {};
isFullscreenWithTTY(pXl, {
  registerClaudeCodeSkill: () => registerClaudeCodeSkill,
  CLAUDE_CODE_SKILL_NAME: () => CLAUDE_CODE_SKILL_NAME,
  CLAUDE_CODE_SKILL_DESCRIPTION: () => CLAUDE_CODE_SKILL_DESCRIPTION
});

// Builds a markdown summary of the running build: commands, custom skills, agents, MCP servers, settings keys, recent changelog
function mFm(context, changelogEntries) {
  let sections = [],
    visibleCommands = context.options.commands.filter(cmd => !cmd.isHidden),
    isBuiltinCommand = cmd => cmd.type !== "prompt" || cmd.source === "builtin" || cmd.source === "bundled",
    builtinCommands = visibleCommands.filter(isBuiltinCommand);
  if (builtinCommands.length > 0) {
    let commandLines = builtinCommands.map(cmd => {
      let aliasText = cmd.aliases?.length ? ` (aliases: ${cmd.aliases.map(alias => `/${alias}`).join(", ")})` : "";
      return `- /${cmd.name}${aliasText}: ${cmd.description}`;
    }).sort();
    sections.push(`**Available commands (${builtinCommands.length} in this build):**
${commandLines.join(`
`)}`);
  }
  let customSkills = visibleCommands.filter(cmd => !isBuiltinCommand(cmd));
  if (customSkills.length > 0) {
    let skillLines = customSkills.map(cmd => `- /${cmd.name}: ${cmd.description}`).sort();
    sections.push(`**Custom skills configured:**
${skillLines.join(`
`)}`);
  }
  let customAgents = context.options.agentDefinitions.activeAgents.filter(agent => agent.source !== "built-in");
  if (customAgents.length > 0) {
    let agentLines = customAgents.map(agent => `- ${agent.agentType}: ${agent.whenToUse}`).sort();
    sections.push(`**Custom agents configured:**
${agentLines.join(`
`)}`);
  }
  let mcpClients = context.options.mcpClients;
  if (mcpClients && mcpClients.length > 0) {
    let serverLines = mcpClients.map(client => `- ${client.name}`).sort();
    sections.push(`**Configured MCP servers:**
${serverLines.join(`
`)}`);
  }
  let settingsKeys = Object.keys(getSettings_DEPRECATED()).sort();
  if (settingsKeys.length > 0) sections.push(`**Settings keys configured (values omitted):** ${settingsKeys.join(", ")}. To see values, the user can run \`claude config list\` or open \`~/.claude/settings.json\`.`);
  let versionParts = Di({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION, "-"),
    recentReleases = $Wn(changelogEntries).filter(([versionKey]) => mQe(versionKey, versionParts)).slice(-10).reverse();
  if (recentReleases.length > 0) {
    let releaseBlocks = recentReleases.map(([versionKey, bulletPoints]) => `### ${versionKey}
` + bulletPoints.map(point => `- ${point}`).join(`
`));
    sections.push(`**Recent releases (you are running v${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}):**
${releaseBlocks.join(`

`)}`);
  }
  if (isUsing3PServices()) sections.push("**Provider context:** This session is not using Anthropic's first-party API. WebSearch may be unavailable, `/feedback` is unavailable, and some features behave differently \u2014 check the docs page for the user's specific provider. Direct issues to https://github.com/anthropics/claude-code/issues.");
  return sections.join(`

`);
}

// Assembles the full skill prompt: static docs reference + dynamic build info + user query
function fFm(userQuery, context, changelogEntries) {
  let parts = [aXl],
    // Static Claude Code documentation/reference preamble
    buildContext = mFm(context, changelogEntries);
  if (buildContext) parts.push(`---

# Current Build

Generated from the running Claude Code binary at invocation time. This is ground truth \u2014 it overrides your training data and any documentation when they disagree about what exists in this build.

${buildContext}`);
  if (userQuery.trim()) parts.push(`---

## User Request

${userQuery}`);
  return parts.join(`

`);
}

// Registers the "claude-code-docs" skill with the skill registry (ap = addPlugin/registerSkill)
function registerClaudeCodeSkill() {
  ap({
    name: CLAUDE_CODE_SKILL_NAME,
    menuDescription: "Answer questions about Claude Code features and settings",
    description: CLAUDE_CODE_SKILL_DESCRIPTION,
    allowedTools: ["Read", "Grep", "Glob", "WebFetch"],
    argumentHint: "[question]",
    userInvocable: !0,
    files: lXl,
    isEnabled() {
      return getFeatureValue_CACHED_MAY_BE_STALE("tengu_birch_kettle", !1);
    },
    async getPromptForCommand(userInput, context) {
      logEvent("tengu_claude_code_skill_loaded", {
        has_args: userInput.trim().length > 0
      });
      let changelog = await Ljt(); // Fetch changelog data
      return [{
        type: "text",
        text: fFm(userInput, context, changelog)
      }];
    }
  });
}
var CLAUDE_CODE_SKILL_NAME = "claude-code-docs",
  pFm = `Answer questions about Claude Code itself: commands, flags, settings, hooks, skills, MCP servers, subagents, IDE integrations, sandboxing, deployment. Verifies against the running build before recommending any command, flag, or setting.
`,
  CLAUDE_CODE_SKILL_DESCRIPTION;

// Lazy init block: wires up module dependencies and appends trigger/skip rules to the skill description
var mXl = b(() => {
  zn();
  Ct();
  Ao();
  Vje();
  yr();
  dr();
  BE();
  cXl();
  CLAUDE_CODE_SKILL_DESCRIPTION = pFm + `TRIGGER when: user asks how Claude Code works ("Can Claude\u2026", "Does Claude\u2026", "How do I\u2026", "Is there a way to\u2026"); user asks about a slash command, CLI flag, settings key, hook, skill, MCP server, subagent, keybinding, or .claude/ directory; user wants to configure, customize, or troubleshoot Claude Code; YOU are about to recommend a Claude Code slash command, flag, or setting and have not verified it exists in this build.
` + "SKIP: questions about building applications with the Claude API or Anthropic SDK (use /claude-api), general programming questions, questions about the user's own codebase.";
});
export {pXl,mFm,fFm,registerClaudeCodeSkill,CLAUDE_CODE_SKILL_NAME,pFm,CLAUDE_CODE_SKILL_DESCRIPTION,mXl};
