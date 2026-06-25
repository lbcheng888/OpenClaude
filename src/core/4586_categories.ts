// @ts-nocheck
import {formatTokens as formatTokenCount,formatTokenEstimate as formatSkillTokenCount,Xo as H9} from "../../vendor/m240.ts";
import {Kje as formatSkillSource,wm as bz} from "../../vendor/m707.ts";
import {b as L} from "../../runtime.ts";
import {lr as P8} from "../../vendor/m233.ts";
// Context-usage report builder.
//
// This module renders a human-readable Markdown summary of how the model's
// context window is being consumed: a per-category token breakdown plus
// optional sections for MCP tools, custom agents, memory files and skills.
//
// Cross-module helpers (defined in other bundles, referenced as-is):
//   formatTokenCount (j4): formats a raw token count for display (e.g. "12.3k").
//   formatSkillTokenCount (Q6H): formats a token count for the Skills table.
//   formatSkillSource (HlH): maps a skill source id to a human-readable label.

/** Formats a raw token count into a compact display string. */
declare function formatTokenCount(tokens: number): string;
/** Formats a token count for the Skills table (variant of formatTokenCount). */
declare function formatSkillTokenCount(tokens: number): string;
/** Maps a skill's source identifier to a human-readable label. */
declare function formatSkillSource(source: string): string;

/** Lazy module-initialization wrapper (runs the init callback exactly once). */
declare function L(init: () => void): unknown;

// Sibling module initializers pulled in by this module's lazy init.
declare function H9(): void;
declare function bz(): void;
declare function P8(): void;

/** A single named token-usage category (e.g. "System prompt", "Free space"). */
interface ContextCategory {
  name: string;
  tokens: number;
}

/** An MCP tool entry with its originating server. */
interface McpToolUsage {
  name: string;
  serverName: string;
  tokens: number;
}

/** Where an agent definition originates from. */
type AgentSource = "projectSettings" | "userSettings" | "localSettings" | "flagSettings" | "policySettings" | "plugin" | "built-in" | (string & {});

/** A custom agent's token usage and provenance. */
interface AgentUsage {
  agentType: string;
  source: AgentSource;
  tokens: number;
}

/** A memory file's token usage. */
interface MemoryFileUsage {
  type: string;
  path: string;
  tokens: number;
}

/** Frontmatter for a single skill contributing to context. */
interface SkillFrontmatter {
  name: string;
  source: string;
  pluginName?: string;
  tokens: number;
}

/** Aggregate skills usage, broken down per skill via frontmatter entries. */
interface SkillsUsage {
  tokens: number;
  skillFrontmatter: SkillFrontmatter[];
}

/** Token-usage breakdown by message role/segment (presence gates other sections). */
type MessageBreakdown = unknown;
/** Tooling provided by the system prompt (presence is checked but not rendered). */
type SystemTool = unknown;
/** System-prompt sections (presence is checked but not rendered). */
type SystemPromptSection = unknown;

/** Full set of inputs needed to render the context-usage report. */
interface ContextUsageReport {
  categories: ContextCategory[];
  totalTokens: number;
  rawMaxTokens: number;
  percentage: number | string;
  model: string;
  memoryFiles: MemoryFileUsage[];
  mcpTools: McpToolUsage[];
  agents: AgentUsage[];
  skills: SkillsUsage | undefined;
  messageBreakdown: MessageBreakdown;
  systemTools: SystemTool[] | undefined;
  systemPromptSections: SystemPromptSection[] | undefined;
}

/**
 * Builds the Markdown context-usage report shown to the user.
 *
 * @param report The aggregated token-usage data for the current context window.
 * @param _ Unused second argument (kept to preserve the original signature).
 * @returns A Markdown string with the usage summary and per-section tables.
 */
function xm_(report: ContextUsageReport, _: unknown): string {
  let {
      categories,
      totalTokens,
      rawMaxTokens,
      percentage,
      model,
      memoryFiles,
      mcpTools,
      agents,
      skills,
      messageBreakdown,
      systemTools,
      systemPromptSections
    } = report,
    markdown = `## Context Usage

`;
  markdown += `**Model:** ${model}  
`, markdown += `**Tokens:** ${formatTokenCount(totalTokens)} / ${formatTokenCount(rawMaxTokens)} (${percentage}%)
`, markdown += `
`;
  let visibleCategories = categories.filter(category => category.tokens > 0 && category.name !== "Free space" && category.name !== "Autocompact buffer");
  if (visibleCategories.length > 0) {
    markdown += `### Estimated usage by category

`, markdown += `| Category | Tokens | Percentage |
`, markdown += `|----------|--------|------------|
`;
    for (let category of visibleCategories) {
      let categoryPercent = (category.tokens / rawMaxTokens * 100).toFixed(1);
      markdown += `| ${category.name} | ${formatTokenCount(category.tokens)} | ${categoryPercent}% |
`;
    }
    let freeSpace = categories.find(category => category.name === "Free space");
    if (freeSpace && freeSpace.tokens > 0) {
      let freeSpacePercent = (freeSpace.tokens / rawMaxTokens * 100).toFixed(1);
      markdown += `| Free space | ${formatTokenCount(freeSpace.tokens)} | ${freeSpacePercent}% |
`;
    }
    let autocompactBuffer = categories.find(category => category.name === "Autocompact buffer");
    if (autocompactBuffer && autocompactBuffer.tokens > 0) {
      let autocompactPercent = (autocompactBuffer.tokens / rawMaxTokens * 100).toFixed(1);
      markdown += `| Autocompact buffer | ${formatTokenCount(autocompactBuffer.tokens)} | ${autocompactPercent}% |
`;
    }
    markdown += `
`;
  }
  if (mcpTools.length > 0) {
    markdown += `### MCP Tools

`, markdown += `| Tool | Server | Tokens |
`, markdown += `|------|--------|--------|
`;
    for (let tool of mcpTools) markdown += `| ${tool.name} | ${tool.serverName} | ${formatTokenCount(tool.tokens)} |
`;
    markdown += `
`;
  }
  if (systemTools && systemTools.length > 0, systemPromptSections && systemPromptSections.length > 0, agents.length > 0) {
    markdown += `### Custom Agents

`, markdown += `| Agent Type | Source | Tokens |
`, markdown += `|------------|--------|--------|
`;
    for (let agent of agents) {
      let sourceLabel: string;
      switch (agent.source) {
        case "projectSettings":
          sourceLabel = "Project";
          break;
        case "userSettings":
          sourceLabel = "User";
          break;
        case "localSettings":
          sourceLabel = "Local";
          break;
        case "flagSettings":
          sourceLabel = "Flag";
          break;
        case "policySettings":
          sourceLabel = "Policy";
          break;
        case "plugin":
          sourceLabel = "Plugin";
          break;
        case "built-in":
          sourceLabel = "Built-in";
          break;
        default:
          sourceLabel = String(agent.source);
      }
      markdown += `| ${agent.agentType} | ${sourceLabel} | ${formatTokenCount(agent.tokens)} |
`;
    }
    markdown += `
`;
  }
  if (memoryFiles.length > 0) {
    markdown += `### Memory Files

`, markdown += `| Type | Path | Tokens |
`, markdown += `|------|------|--------|
`;
    for (let memoryFile of memoryFiles) markdown += `| ${memoryFile.type} | ${memoryFile.path} | ${formatTokenCount(memoryFile.tokens)} |
`;
    markdown += `
`;
  }
  if (skills && skills.tokens > 0 && skills.skillFrontmatter.length > 0) {
    markdown += `### Skills

`, markdown += `| Skill | Source | Tokens |
`, markdown += `|-------|--------|--------|
`;
    for (let skill of skills.skillFrontmatter) {
      let skillSourceLabel = formatSkillSource(skill.source) + (skill.pluginName ? ` (${skill.pluginName})` : "");
      markdown += `| ${skill.name} | ${skillSourceLabel} | ${formatSkillTokenCount(skill.tokens)} |
`;
    }
    markdown += `
`;
  }
  return markdown;
}

/** Lazy initializer for this module; pulls in its sibling modules once. */
var Q$q = L(() => {
  H9();
  bz();
  P8();
});
export {xm_ as Y8t,Q$q as vRo};
