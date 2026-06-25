// @ts-nocheck
import {Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Z6n,e5n,t5n,T_o} from "../../vendor/m4258.ts";
import {q6n,W6n,l_o} from "../../vendor/m4250.ts";
import {kce,Uye} from "../../vendor/m4181.ts";
import {withTimeout as Oc} from "../telemetry/1488_withTimeout.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {b,x} from "../../runtime.ts";
// @ts-nocheck
/**
 * REPL replay engine.
 *
 * Re-executes the JS code blocks a previous assistant session ran inside the
 * sandboxed REPL (VM), feeding back the *cached* tool-call results so the replay
 * is deterministic. Detects "drift": cases where the replayed code makes a
 * different sequence of tool calls than the original run (a sign of
 * nondeterminism such as Date.now / Math.random taking a different branch).
 */

/** A cached tool-call outcome from the original run: either a success or an error. */
type ToolCallOutcome =
  | { kind: "ok"; toolName: string; result: unknown }
  | { kind: "err"; toolName: string; error: string };

/** Collect every completed/errored tool-state entry as a replayable outcome. */
function b_o(toolStates: Map<unknown, { phase: string; toolName: string; error?: string; result?: unknown }>): ToolCallOutcome[] {
  return Array.from(toolStates.values()).filter(state => state.phase === "complete" || state.phase === "error").map(state => state.phase === "error" ? {
    kind: "err",
    toolName: state.toolName,
    error: state.error ?? ""
  } : {
    kind: "ok",
    toolName: state.toolName,
    result: state.result
  });
}

/** Safely read a string-typed property `key` from `obj`; returns "" otherwise. */
function lYa(obj: unknown, key: string): string {
  if (obj === null || typeof obj !== "object") return "";
  let value = (obj as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

/** A REPL code block started by the assistant. */
interface ReplBlockStart {
  id: string;
  code: string;
}

/** Extract the REPL code blocks invoked by an assistant message. */
function u2p(message: any): ReplBlockStart[] {
  if (message.type !== "assistant" || message.isVirtual) return [];
  let content = message.message.content;
  if (!Array.isArray(content)) return [];
  return content.filter(part => part.type === "tool_use" && part.name === Mf).map(part => ({
    id: part.id,
    code: lYa(part.input, "code")
  }));
}

/** Read the tool name from a virtual assistant message (the pending tool call). */
function d2p(message: any): string | undefined {
  if (message.type !== "assistant" || !message.isVirtual) return;
  let content = message.message.content;
  if (!Array.isArray(content)) return;
  let firstPart = content[0];
  return firstPart?.type === "tool_use" ? firstPart.name : void 0;
}

/** Build a cached outcome from a virtual user (tool_result) message. */
function p2p(message: any, toolName: string): ToolCallOutcome | undefined {
  if (message.type !== "user" || !message.isVirtual) return;
  let content = message.message.content;
  if (!Array.isArray(content)) return;
  let firstPart = content[0];
  if (firstPart?.type !== "tool_result") return;
  return firstPart.is_error ? {
    kind: "err",
    toolName,
    error: typeof firstPart.content === "string" ? firstPart.content : ""
  } : {
    kind: "ok",
    toolName,
    result: message.toolUseResult
  };
}

/** Did the real (non-virtual) user message for `toolUseId` carry an error? */
function m2p(message: any, toolUseId: string): boolean | undefined {
  if (message.type !== "user" || message.isVirtual) return;
  let content = message.message.content;
  if (!Array.isArray(content)) return;
  if (!content.some(part => part.type === "tool_result" && part.tool_use_id === toolUseId)) return;
  return lYa(message.toolUseResult, "error").length > 0;
}

/** A reconstructed REPL block: its code plus the ordered tool calls it made and whether it threw. */
interface ReplBlock {
  code: string;
  calls: ToolCallOutcome[];
  threw: boolean;
}

/** Walk a transcript and reconstruct the ordered REPL blocks with their cached tool calls. */
function n5n(messages: Iterable<any>): ReplBlock[] {
  let blocks: ReplBlock[] = [],
    current: (ReplBlock & { replId: string; pendingName: string | undefined }) | undefined,
    flush = () => {
      if (!current) return;
      blocks.push({
        code: current.code,
        calls: current.calls,
        threw: current.threw
      }), current = void 0;
    };
  for (let message of messages) {
    if (message.type !== "assistant" && message.type !== "user") continue;
    if (message.isVirtual) {
      if (!current) continue;
      let pendingName = d2p(message);
      if (pendingName !== void 0) {
        current.pendingName = pendingName;
        continue;
      }
      let toolName = current.pendingName;
      if (toolName === void 0) continue;
      let outcome = p2p(message, toolName);
      if (!outcome) continue;
      current.calls.push(outcome), current.pendingName = void 0;
      continue;
    }
    let starts = u2p(message);
    if (starts.length > 0) {
      for (let start of starts) flush(), current = {
        replId: start.id,
        code: start.code,
        calls: [],
        threw: !1,
        pendingName: void 0
      };
      continue;
    }
    if (current) {
      let threw = m2p(message, current.replId);
      if (threw !== void 0) current.threw = threw;
    }
  }
  return flush(), blocks;
}

/** Wrap an error value as the sentinel returned by replayed tool wrappers on error. */
function f2p(error: string): { error: string } {
  return {
    error
  };
}

/**
 * Build replacement tool wrappers that replay cached outcomes in order.
 * Records drift (up to `h2p` entries) when the replayed call sequence diverges
 * from the cached sequence. Throws `cYa` if more calls happen than were cached.
 */
function g2p(cachedCalls: ToolCallOutcome[], toolNames: string[]) {
  let consumed = 0,
    drift: string[] = [],
    recordDrift = (entry: string) => {
      if (drift.length < h2p) drift.push(entry);
    },
    consume = (invokedName: string) => {
      let cached = cachedCalls[consumed];
      if (!cached) throw new cYa(invokedName, cachedCalls.length);
      if (consumed++, cached.toolName !== invokedName) recordDrift(`position ${consumed - 1}: expected ${cached.toolName}, invoked ${invokedName}`);
      return cached;
    },
    makeWrapper = (toolName: string) => async function () {
      await new Promise(resolve => setImmediate(resolve));
      let cached = consume(toolName);
      return cached.kind === "ok" ? cached.result : f2p(cached.error);
    };
  return {
    wrappers: Object.fromEntries(toolNames.map(toolName => [toolName, makeWrapper(toolName)])),
    diagnostics: () => ({
      consumed,
      total: cachedCalls.length,
      drift
    })
  };
}

/** Outcome of replaying a single REPL block. */
type ReplayResult =
  | { kind: "ok"; consumed: number; total: number }
  | { kind: "drift"; reason: string; consumed: number; total: number }
  | { kind: "threw"; error: string };

/** Replay one REPL block inside the VM, swapping in the cached tool wrappers. */
async function _2p(session: any, block: ReplBlock): Promise<ReplayResult> {
  let toolNames = [...session.toolWrapperNames],
    {
      wrappers,
      diagnostics
    } = g2p(block.calls, toolNames),
    saved = toolNames.map(name => [name, Z6n(session.vmContext, name)]);
  toolNames.forEach(name => {
    session.vmContext[name] = session.sealers.asyncDataPropagate(wrappers[name]);
  }), e5n(session);
  try {
    let preparedCode = q6n(block.code),
      replayValue = new aYa.Script(preparedCode, {
        filename: "repl-replay.js",
        importModuleDynamically: () => {
          throw kce("import() is not available in REPL code.");
        }
      }).runInContext(session.vmContext, {
        timeout: S_o
      });
    await Oc(session.sealers.awaitVM(replayValue).then(resolved => t5n(session, W6n(resolved))), S_o, `REPL replay timed out after ${S_o}ms`);
    let diag = diagnostics();
    if (block.threw) return {
      kind: "drift",
      reason: "original threw, replay succeeded",
      consumed: diag.consumed,
      total: diag.total
    };
    if (diag.drift.length > 0 || diag.consumed !== diag.total) return {
      kind: "drift",
      reason: diag.drift[0] ?? `consumed ${diag.consumed}/${diag.total} cached calls`,
      consumed: diag.consumed,
      total: diag.total
    };
    return {
      kind: "ok",
      consumed: diag.consumed,
      total: diag.total
    };
  } catch (err) {
    let diag = diagnostics(),
      errorMessage = session.sealers.errMsg(err);
    if (block.threw) {
      if (diag.drift.length > 0 || diag.consumed !== diag.total) return {
        kind: "drift",
        reason: diag.drift[0] ?? `consumed ${diag.consumed}/${diag.total} before expected throw`,
        consumed: diag.consumed,
        total: diag.total
      };
      return {
        kind: "ok",
        consumed: diag.consumed,
        total: diag.total
      };
    }
    return {
      kind: "threw",
      error: errorMessage
    };
  } finally {
    saved.forEach(([name, value]) => {
      session.vmContext[name] = value;
    }), session.console.clear();
  }
}

/** Replay every block in sequence, logging any non-ok result. */
async function uYa(session: any, blocks: ReplBlock[]): Promise<ReplayResult[]> {
  let results: ReplayResult[] = [];
  for (let block of blocks) {
    let result = await _2p(session, block);
    if (results.push(result), result.kind !== "ok") A(`REPL replay ${result.kind} at block ${results.length}/${blocks.length}: ${"error" in result ? result.error : result.reason}`, {
      level: "warn"
    });
  }
  return results;
}

/** Summarize replay results: counts of clean / drifted / threw blocks plus a message. */
function dYa(results: ReplayResult[]) {
  let okCount = zn(results, result => result.kind === "ok"),
    driftedCount = zn(results, result => result.kind === "drift"),
    threwCount = zn(results, result => result.kind === "threw"),
    summary = threwCount > 0 || driftedCount > 0 ? `${okCount}/${results.length} blocks replayed cleanly (${driftedCount} drifted, ${threwCount} threw)` : `${okCount} blocks replayed`;
  return {
    ok: okCount,
    drifted: driftedCount,
    threw: threwCount,
    summary
  };
}

var aYa,
  cYa,
  h2p = 100,
  S_o = 30000;
var E_o = b(() => {
  qe();
  Uye();
  $A();
  l_o();
  T_o();
  aYa = x(require("vm"));
  cYa = class cYa extends Error {
    constructor(invokedName: string, cachedCount: number) {
      super(`REPL replay: ${invokedName} invoked but only ${cachedCount} calls were cached. ` + "The replayed code is making more tool calls than the original — " + "likely nondeterminism (Date.now, Math.random) took a different branch.");
      this.name = "ReplayCacheExhausted";
    }
  };
});

export {b_o,lYa,u2p,d2p,p2p,m2p,n5n,f2p,g2p,_2p,uYa,dYa,aYa,cYa,h2p,S_o,E_o};
