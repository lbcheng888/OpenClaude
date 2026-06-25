// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
// Restored from obfuscated Claude Code 2.1.177 — permissions subsystem.
//
// This module defines the built-in "claude" agent: the catch-all agent
// definition used by FleetView when no specific agent name is typed. The
// agent's system-prompt addendum teaches the model the messaging conventions a
// background-job classifier relies on to track job state (narrate / restate /
// result: / needs input: / failed:).
//
// 1:1 reverse engineering: only names, TypeScript types, and doc comments were
// added. All control flow, operators, string literals, and cross-module/property
// references are preserved exactly. `j_` and `L` are external bundle helpers
// (esbuild interop / lazy-module wrapper) imported from other chunks, so they
// keep their original minified names. Only symbols declared in this module are
// renamed.

// ---------------------------------------------------------------------------
// Minimal local type alias (erased at runtime; does not affect behavior).
// ---------------------------------------------------------------------------

/** Built-in agent definition descriptor (as consumed by the agent registry). */
interface AgentDefinition {
  /** Stable identifier for this agent type. */
  agentType: string;
  /** Human-facing hint describing when this agent should be selected. */
  whenToUse: string;
  /** Tool allow-list; `["*"]` grants all tools. */
  tools: string[];
  /** Where the definition originates (built-in, project settings, etc.). */
  source: string;
  /** Filesystem base directory backing the definition. */
  baseDir: string;
  /** When true, `getSystemPrompt()` is appended to the base prompt rather than replacing it. */
  appendSystemPrompt: boolean;
  /** Produces the system-prompt fragment for this agent. */
  getSystemPrompt: () => string;
}

// ---------------------------------------------------------------------------
// Module exports object (esbuild interop shim).
// ---------------------------------------------------------------------------

var claudeAgentExports = {};
j_(claudeAgentExports, {
  CLAUDE_AGENT: () => CLAUDE_AGENT
});

/**
 * Built-in "claude" catch-all agent definition.
 *
 * Used as FleetView's default agent when no agent name is typed. Its system
 * prompt is appended to the base prompt and instructs the model on the
 * background-job messaging conventions a status classifier reads from the
 * message text alone (it cannot see tool output, subagent reports, or human
 * replies): narrate the approach, restate results/replies in prose, emit
 * `result:` as the sole completion signal, `needs input:` only when one human
 * action unblocks it, and `failed:` when the task is structurally impossible.
 */
var CLAUDE_AGENT: AgentDefinition;

/**
 * Lazy module initializer (esbuild `__esmMin` wrapper): assigns `CLAUDE_AGENT`
 * the first time this module is used.
 */
var initClaudeAgentModule = L(() => {
  CLAUDE_AGENT = {
    agentType: "claude",
    whenToUse: "Catch-all for any task that doesn't fit a more specific agent. FleetView's default when no agent name is typed.",
    tools: ["*"],
    source: "built-in",
    baseDir: "built-in",
    appendSystemPrompt: !0,
    getSystemPrompt: () => `This session is a background job. The user may be live or away — respond naturally either way. A classifier reads only your message text (not tool output, subagent reports, or human replies) to track state in the job list, so the conventions below always apply.

**Narrate.** One line on your approach before acting. After each chunk: what happened, what's next.

**Restate.** State results in your own text even if a tool already printed them — the extractor can't see tool output. If the human replies, open your next turn by restating what they said before acting on it.

For noisy investigation (grep sweeps, log trawls, broad search), spawn a subagent and keep only the findings here.

**Completed.** First run a sanity check (test, build, re-read the ask) and say what you checked. Then write \`result:\` on its own line with a self-contained one-line headline — readable by someone who never saw the ask. That line is the *only* completion signal; prose like "done" or "finished" is not detected. \`result:\` means the ask is delivered — pushing or launching something that still needs to settle is narration, not \`result:\`. Skip it only for greetings and clarifying questions; an answer to a question *is* a deliverable.

**Needs input.** Only when one human action unblocks you (auth, a decision, access you can't grant yourself) *and* guessing is costlier than the round-trip. If a reasonable guess exists: make it, note the assumption, keep working. When truly stuck, write \`needs input:\` on its own line stating exactly what you need.

**Failed.** The task is structurally impossible as framed (wrong repo, missing binary, premise false). Write \`failed:\` on its own line with the reason.

Everything else: keep working.`
  };
});
export {claudeAgentExports as oul,CLAUDE_AGENT,initClaudeAgentModule as oCo};
