// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {isCoordinatorMode as dg,_L as KV} from "./2705_matchSessionMode.ts";
import {st as q_,_l as P4,fromEnum as tH} from "../../vendor/m5.ts";
import {getIsNonInteractiveSession as u8,lt as w_} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {xpe as w3H,vbt as jj_,initKp as UO} from "../../vendor/m609.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Ln as U6,lo as zq} from "../tools/5190_userPromptCount.ts";
import {Cs as G9,Ph as KA} from "../../vendor/m2224.ts";
import {sn as A6} from "../config/0047_namespace.ts";
import {R4 as Dn} from "../agent/2214_available.ts";
// Fork subagent: gating, child-message construction and child-detection.
//
// This module implements the "fork" subagent experiment. A fork is a worker
// agent that inherits the parent's full conversation transcript, executes a
// single directive, and stops. The module decides whether forking is enabled
// (from env vars / kill-switch / gradual rollout gate), builds the system
// messages that turn the inherited transcript into a fork worker prompt, and
// detects whether a given transcript already belongs to a fork child.
//
// External references kept verbatim (resolved in other modules):
//   dg   - global kill-switch / "disabled everywhere" predicate (true => off).
//   q_   - env-var "is truthy / explicitly enabled" parser.
//   P4   - env-var "is explicitly falsy / disabled" parser.
//   u8   - secondary disable predicate (e.g. unsupported environment).
//   Y_   - feature-gate / gradual-rollout check: Y_(gateName, default).
//   tH   - string normalizer producing a telemetry-safe value.
//   c    - telemetry event logger: c(eventName, payload).
//   N    - diagnostic logger: N(message, { level }).
//   U6   - build a "user"-role transcript message from { content, ... }.
//   L    - run-once lazy module-initializer wrapper.
//   j_   - export-binding helper (defines the module's exported getters).
//   w3H  - the fork marker tag name, emitted as `<${w3H}>...</${w3H}>`.
//   jj_  - directive prefix string prepended to the worker's task line.
//   G9   - the Agent/Task tool name (used to tell forks not to re-spawn).
//   w_, UO, KV, o6, y_, FH, A6, zq, Dn, KA - dependency module initializers.

/** A single block inside an assistant/user message's `content` array. */
interface MessageContentBlock {
  type: string;
  text?: string;
  id?: string;
  [key: string]: unknown;
}

/** A transcript message (assistant or user) as stored in the conversation. */
interface TranscriptMessage {
  type: string;
  uuid?: string;
  message: {
    role?: string;
    content: MessageContentBlock[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * How the fork-subagent feature came to be enabled.
 * - "env"        : turned on explicitly via CLAUDE_CODE_FORK_SUBAGENT.
 * - "gb_rollout" : turned on by the gradual-rollout feature gate.
 * - "disabled"   : not enabled.
 */
type ForkSubagentSource = "env" | "gb_rollout" | "disabled";

/** A built-in agent definition (matches the `FORK_AGENT` shape below). */
interface AgentDefinition {
  agentType: string;
  whenToUse: string;
  tools: string[];
  maxTurns: number;
  model: string;
  permissionMode: string;
  source: string;
  baseDir: string;
  getSystemPrompt: () => string;
}

var Nh7 = {};
j_(Nh7, {
  isInForkChild: () => isInForkChild,
  isForkSubagentEnabled: () => isForkSubagentEnabled,
  getForkSubagentSource: () => getForkSubagentSource,
  buildWorktreeNotice: () => buildWorktreeNotice,
  buildForkedMessages: () => buildForkedMessages,
  buildChildMessage: () => buildChildMessage,
  _resetForkSubagentSourceTelemetryForTesting: () => _resetForkSubagentSourceTelemetryForTesting,
  FORK_SUBAGENT_TYPE: () => FORK_SUBAGENT_TYPE,
  FORK_AGENT: () => FORK_AGENT
});

/**
 * Compute, from scratch, why (and whether) the fork subagent is enabled.
 *
 * Resolution order: a global kill-switch and explicit env disable win first,
 * then an explicit env enable, then a secondary disable predicate, then the
 * gradual-rollout gate. Anything unmatched falls through to "disabled".
 */
function computeForkSubagentSource(): ForkSubagentSource {
  if (dg()) return "disabled";
  if (q_(process.env.CLAUDE_CODE_FORK_SUBAGENT)) return "env";
  if (P4(process.env.CLAUDE_CODE_FORK_SUBAGENT)) return "disabled";
  if (u8()) return "disabled";
  if (Y_(FORK_SUBAGENT_GATE, !1)) return "gb_rollout";
  return "disabled";
}

/**
 * Return the cached fork-subagent source, computing it once on first call.
 *
 * On the first non-"disabled" result it caches the value and emits the
 * `tengu_fork_subagent_enabled` telemetry event with the normalized source.
 */
function getForkSubagentSource(): ForkSubagentSource {
  if (cachedForkSubagentSource !== null) return cachedForkSubagentSource;
  let source = computeForkSubagentSource();
  if (source !== "disabled") cachedForkSubagentSource = source, c(FORK_SUBAGENT_ENABLED_EVENT, {
    source: tH(source)
  });
  return source;
}

/** Test-only: clear the cached source so telemetry/resolution re-runs. */
function _resetForkSubagentSourceTelemetryForTesting(): void {
  cachedForkSubagentSource = null;
}

/** Whether the fork subagent feature is active by any source. */
function isForkSubagentEnabled(): boolean {
  return getForkSubagentSource() !== "disabled";
}

/**
 * Detect whether a transcript already belongs to a fork child.
 *
 * Returns true if any user message carries a text block containing the fork
 * marker tag (`<${w3H}>`), which is injected by `buildChildMessage`.
 */
function isInForkChild(messages: TranscriptMessage[]): boolean {
  return messages.some(message => {
    if (message.type !== "user") return !1;
    let content = message.message.content;
    if (!Array.isArray(content)) return !1;
    return content.some(block => block.type === "text" && block.text.includes(`<${w3H}>`));
  });
}

/**
 * Build the messages that convert an assistant turn into a fork directive.
 *
 * The originating assistant message's `tool_use` blocks are acknowledged with
 * synthetic `tool_result` blocks (so the inherited transcript stays valid),
 * and a user message carrying the fork child prompt is appended. If the
 * assistant message has no `tool_use` blocks, an error is logged and only the
 * child message is returned.
 *
 * @param directive       The directive text given to the fork worker.
 * @param assistantMessage The assistant message that triggered the fork.
 * @returns The transcript messages to append for the fork child.
 */
function buildForkedMessages(directive: string, assistantMessage: TranscriptMessage): TranscriptMessage[] {
  let clonedAssistantMessage = {
      ...assistantMessage,
      uuid: cryptoModule.randomUUID(),
      message: {
        ...assistantMessage.message,
        content: [...assistantMessage.message.content]
      }
    },
    toolUseBlocks = assistantMessage.message.content.filter(block => block.type === "tool_use");
  if (toolUseBlocks.length === 0) return N(`No tool_use blocks found in assistant message for fork directive: ${directive.slice(0, 50)}...`, {
    level: "error"
  }), [U6({
    content: [{
      type: "text",
      text: buildChildMessage(directive)
    }]
  })];
  let toolResultBlocks = toolUseBlocks.map(block => ({
      type: "tool_result",
      tool_use_id: block.id,
      content: [{
        type: "text",
        text: FORK_STARTED_RESULT_TEXT
      }]
    })),
    childMessage = U6({
      content: [...toolResultBlocks, {
        type: "text",
        text: buildChildMessage(directive)
      }]
    });
  return [clonedAssistantMessage, childMessage];
}

/**
 * Build the fork child's system prompt, wrapping the directive in the fork
 * marker tag and the operating rules a worker fork must follow.
 *
 * @param directive The single directive the fork worker should execute.
 */
function buildChildMessage(directive: string): string {
  return `<${w3H}>
You are a worker fork. The transcript above is the parent's history — inherited reference, not your situation. You are NOT a continuation of that agent. Execute ONE directive, then stop.

Hard rules:
- Do NOT spawn subagents with the ${G9} tool. The "default to forking" guidance is for the parent; you ARE the fork, execute directly.${""}
- One shot: report once and stop. No follow-up questions, no proposed next steps, no waiting for the user.

Guidelines (your directive may override any of these):
- Stay in scope. Other forks may be handling adjacent work; if you spot something outside your directive, note it in a sentence and move on.
- Open with one line restating your task, so the parent can spot scope drift at a glance.
- Be concise — as short as the answer allows, no shorter. Plain text, no preamble, no meta-commentary.
- If you committed changes, list the paths and commit hashes in your report.
</${w3H}>

${jj_}${directive}`;
}

/**
 * Build the notice shown to a fork operating inside an isolated git worktree,
 * explaining that inherited paths refer to the parent's working directory and
 * must be translated to this worktree root.
 *
 * @param parentCwd     The parent agent's working directory.
 * @param worktreePath  The fork's isolated worktree root.
 */
function buildWorktreeNotice(parentCwd: string, worktreePath: string): string {
  return `You've inherited the conversation context above from a parent agent working in ${parentCwd}. You are operating in an isolated git worktree at ${worktreePath} — same repository, same relative file structure, separate working copy. Paths in the inherited context refer to the parent's working directory; translate them to your worktree root. Re-read files before editing if the parent may have modified them since they appear in the context. Your changes stay in this worktree and will not affect the parent's files.`;
}

var cryptoModule: typeof import("crypto"),
  /** Feature gate name driving the fork-subagent gradual rollout. */
  FORK_SUBAGENT_GATE = "tengu_copper_fox",
  /** Telemetry event emitted once when the fork subagent is first enabled. */
  FORK_SUBAGENT_ENABLED_EVENT = "tengu_fork_subagent_enabled",
  /** Memoized resolved source; null until first computed. */
  cachedForkSubagentSource: ForkSubagentSource | null = null,
  /** The subagent type identifier for forks. */
  FORK_SUBAGENT_TYPE = "fork",
  /** The built-in fork agent definition (populated in module init). */
  FORK_AGENT: AgentDefinition,
  /** Placeholder tool_result text shown while a fork runs in the background. */
  FORK_STARTED_RESULT_TEXT = "Fork started — processing in background";

var QzH = L(() => {
  w_();
  UO();
  KV();
  o6();
  y_();
  FH();
  A6();
  zq();
  Dn();
  KA();
  cryptoModule = require("crypto");
  FORK_AGENT = {
    agentType: FORK_SUBAGENT_TYPE,
    whenToUse: 'Fork — inherits full conversation context. Selected explicitly via subagent_type: "fork" when the fork experiment is active; never the default.',
    tools: ["*"],
    maxTurns: 200,
    model: "inherit",
    permissionMode: "bubble",
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => ""
  };
});

export {Nh7 as qNi,computeForkSubagentSource as NCd,getForkSubagentSource,_resetForkSubagentSourceTelemetryForTesting,isForkSubagentEnabled,isInForkChild,buildForkedMessages,buildChildMessage,buildWorktreeNotice,cryptoModule as UNi,FORK_SUBAGENT_GATE as LCd,FORK_SUBAGENT_ENABLED_EVENT as MCd,cachedForkSubagentSource as lwn,FORK_SUBAGENT_TYPE,FORK_AGENT,FORK_STARTED_RESULT_TEXT as FCd,QzH as LRe};
