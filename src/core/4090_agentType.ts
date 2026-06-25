// @ts-nocheck
import {b as L} from "../../runtime.ts";
/**
 * Built-in "general-purpose" agent definition.
 *
 * This module declares the single built-in agent type that Claude Code ships
 * with: a general-purpose research/search/multi-step agent that has access to
 * all tools. The exported config (`zAH`) is consumed by the agent registry and
 * lookup code (e.g. core/5664_requestedAgent.ts) which matches on
 * `agentType` and calls `getSystemPrompt()` to obtain the agent's prompt.
 *
 * Cross-module symbols intentionally kept with their original (bundle) names:
 *  - `zAH` : the built-in general-purpose agent config object.
 *  - `GI_` : the lazy module initializer that builds `zAH` on first access.
 *  - `yMO` : the agent's system-prompt factory, assigned to `getSystemPrompt`.
 *  - `L`   : esbuild `__esm` lazy-init helper
 *            (computer-use/0006_getPrototypeOf.ts), referenced verbatim.
 */

/**
 * An agent-type configuration descriptor.
 *
 * Describes a registerable agent: its identifier, when the model should reach
 * for it, which tools it may use, where it came from, and a factory that
 * produces its system prompt.
 */
interface AgentTypeConfig {
  /** Stable identifier used to look up / dispatch to this agent. */
  agentType: string;
  /** Guidance shown to the model describing when to delegate to this agent. */
  whenToUse: string;
  /** Allowed tool names; `["*"]` grants access to every tool. */
  tools: string[];
  /** Origin of the agent definition (e.g. "built-in"). */
  source: string;
  /** Base directory associated with the agent (e.g. "built-in"). */
  baseDir: string;
  /** Lazily produces the agent's system prompt. */
  getSystemPrompt: () => string;
}

/**
 * Build the system prompt for the built-in general-purpose agent.
 *
 * Returns the full instruction text: role framing, reporting expectations,
 * strengths, and operating guidelines (search/analysis behavior plus the
 * no-unnecessary-files rules).
 */
function yMO(): string {
  return `${"You are an agent for Claude Code, Anthropic's official CLI for Claude. Given the user's message, you should use the tools available to complete the task. Complete the task fully—don't gold-plate, but don't leave it half-done."} When you complete the task, respond with a concise report covering what was done and any key findings — the caller will relay this to the user, so it only needs the essentials.

${`Your strengths:
- Searching for code, configurations, and patterns across large codebases
- Analyzing multiple files to understand system architecture
- Investigating complex questions that require exploring many files
- Performing multi-step research tasks

Guidelines:
- For file searches: search broadly when you don't know where something lives. Use Read when you know the specific file path.
- For analysis: Start broad and narrow down. Use multiple search strategies if the first doesn't yield results.
- Be thorough: Check multiple locations, consider different naming conventions, look for related files.
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested.`}`;
}

/** The built-in general-purpose agent config; populated by `GI_` on first use. */
var zAH: AgentTypeConfig;

/**
 * Lazy initializer (esbuild `__esm`) that constructs the built-in
 * general-purpose agent config `zAH` exactly once.
 */
var GI_ = L(() => {
  zAH = {
    agentType: "general-purpose",
    whenToUse: "General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you.",
    tools: ["*"],
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: yMO
  };
});
export {yMO as qPp,zAH as wye,GI_ as n4t};
