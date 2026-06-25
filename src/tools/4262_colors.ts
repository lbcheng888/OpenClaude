// @ts-nocheck
import {$te,cx} from "../artifact/4323_cx.ts";
import {Rye,Z3t} from "../../vendor/m4356.ts";
import {Gl,ri,Ks} from "./2235_userFacingName.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {Mf,f3i,$A,gw,I$e} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {fS,Mn,po,NE} from "./5224_userPromptCount.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {vu,Pi} from "../mcp/2200_mcpServerName.ts";
import {lh,h1} from "../../vendor/m2739.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {Ct,e8o} from "../../vendor/m197.ts";
import {ia,getGithubRepo as z1e} from "../../vendor/m698.ts";
import {lr,Cd} from "../../vendor/m233.ts";
import {Uye,kce} from "../../vendor/m4181.ts";
import {Nja,Lja,Mja} from "../../vendor/m4248.ts";
import {Bja,Fja} from "./4250_children.ts";
import {E_o,n5n,uYa,dYa,b_o} from "../core/4260_kind.ts";
import {l_o,q6n,W6n} from "../../vendor/m4250.ts";
import {_Ya,mYa,hYa,gYa,fYa} from "../../vendor/m4260.ts";
import {T_o,iYa,sYa,e5n,t5n} from "../../vendor/m4258.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * REPL tool implementation (v2.1.190).
 *
 * Provides a JavaScript REPL tool that executes code inside a persistent VM
 * context, with programmatic access to a filtered set of inner tools. Manages a
 * script-time budget (excluding inner tool calls), per-tool watchdog timers, a
 * hard wall-clock limit, and collection of images/PDFs produced by inner Read
 * calls so they can be surfaced as content blocks.
 */

/**
 * Build the set of tools exposed inside the REPL: the permitted built-in REPL
 * tools plus the caller's tools (minus a couple of excluded categories),
 * deduplicated by name (caller tools win).
 */
function yYa(callerTools, replOptions) {
  let permittedTools = $te(Rye(), replOptions),
    callerNames = new Set(callerTools.map(tool => tool.name)),
    merged = callerTools.filter(tool => !Gl(tool, ls) && !Gl(tool, Mf));
  for (let tool of permittedTools) if (!callerNames.has(tool.name)) merged.push(tool);
  return merged;
}

/** Stringify a REPL result value for display, falling back to util.inspect. */
function TYa(value, depth) {
  if (typeof value === "string" && value.trim() !== "") return value;
  let record = E2p(value);
  if (record !== void 0) return record;
  try {
    return EYa.inspect(value, {
      colors: !1,
      depth: depth,
      customInspect: !1
    });
  } catch {
    return "[non-serializable value]";
  }
}

/**
 * If the value is a plain object whose values are all strings (and whose keys
 * don't collide with reserved result keys), render it as a blank-line-separated
 * list of `key:\nvalue` blocks; otherwise return undefined.
 */
function E2p(value) {
  try {
    if (value === null || typeof value !== "object" || Array.isArray(value) || value.constructor?.name !== "Object") return;
    let entries = Object.entries(value);
    if (entries.length === 0 || entries.some(([key, val]) => typeof val !== "string" || b2p.has(key))) return;
    return entries.map(([key, val]) => `${key}:
${val}`).join(`

`);
  } catch {
    return;
  }
}

/**
 * Build synthetic (virtual) tool_use / tool_result message pairs from the
 * recorded inner tool-call states, skipping calls still in progress.
 */
function SYa(callMap) {
  let messages = [];
  for (let call of callMap.values()) {
    if (call.phase === "start" || call.phase === "executing") continue;
    messages.push(fS({
      content: [{
        type: "tool_use",
        id: call.toolUseId,
        name: call.toolName,
        input: call.toolInput
      }],
      isVirtual: !0
    })), messages.push(Mn({
      content: [{
        type: "tool_result",
        tool_use_id: call.toolUseId,
        content: call.phase === "error" ? call.error ?? "" : "",
        is_error: call.phase === "error"
      }],
      toolUseResult: call.result,
      isVirtual: !0
    }));
  }
  return messages;
}

/** Insert or update the recorded state for an inner tool call by toolUseId. */
function C2p(callMap, progress) {
  let existing = callMap.get(progress.toolUseId);
  if (existing) existing.phase = progress.phase, existing.result = progress.result, existing.error = progress.error;else callMap.set(progress.toolUseId, {
    toolUseId: progress.toolUseId,
    toolName: progress.toolName,
    toolInput: progress.toolInput,
    phase: progress.phase,
    result: progress.result,
    error: progress.error
  });
}

/** Collect base64 images produced by completed inner tool calls (capped). */
function A2p(callMap) {
  let images = [];
  for (let call of callMap.values()) {
    if (call.phase !== "complete") continue;
    let result = call.result;
    if (result != null && typeof result === "object" && result.type === "image" && result.file != null && typeof result.file === "object" && typeof result.file.base64 === "string" && result.file.base64.length > 0 && typeof result.file.type === "string") images.push({
      base64: result.file.base64,
      mediaType: result.file.type
    });
  }
  return images.slice(0, R2p);
}

/** Collect base64 PDFs produced by completed inner tool calls (capped). */
function v2p(callMap) {
  let documents = [];
  for (let call of callMap.values()) {
    if (call.phase !== "complete") continue;
    let result = call.result;
    if (result != null && typeof result === "object" && result.type === "pdf" && result.file != null && typeof result.file === "object" && typeof result.file.base64 === "string" && result.file.base64.length > 0) documents.push({
      base64: result.file.base64
    });
  }
  return documents.slice(0, w2p);
}

/** Compute the max result-size char budget, honoring a `trim<N>k` override. */
function bYa() {
  let match = f3i()?.match(/trim(\d+)k/);
  return match ? parseInt(match[1], 10) * 1000 : 1e5;
}

/** Create a promise paired with an externally-callable reject function. */
function k2p() {
  let reject;
  return {
    promise: new Promise((_resolve, rej) => {
      reject = rej;
    }),
    reject: reject
  };
}

/**
 * Script-time budget that counts down only while no inner tool call is active.
 * Pauses the timer during inner tool calls and resumes when they finish; fires
 * onExpire once the remaining budget is exhausted.
 */
function H2p(timeoutMs, onExpire) {
  let activeToolCalls = 0,
    remainingMs = timeoutMs,
    resumedAt = 0,
    timer,
    expired = !1;
  function start() {
    if (expired || timer !== void 0 || activeToolCalls > 0) return;
    if (remainingMs <= 0) {
      expired = !0, onExpire();
      return;
    }
    resumedAt = Date.now(), timer = setTimeout(() => {
      expired = !0, onExpire();
    }, remainingMs), timer.unref?.();
  }
  function pause() {
    if (timer === void 0) return;
    clearTimeout(timer), timer = void 0, remainingMs -= Date.now() - resumedAt;
  }
  return {
    start: start,
    onToolStart: () => {
      if (activeToolCalls++ === 0) pause();
    },
    onToolEnd: () => {
      if (--activeToolCalls === 0) start();
    },
    cancel: () => {
      expired = !0, pause();
    }
  };
}

/**
 * Per-inner-tool watchdog registry: arms a timeout for each executing inner
 * tool call (scaled from its native timeout) and fires the callback if the call
 * overruns; provides clear/cancel to tear timers down.
 */
function D2p(onWatchdog) {
  let timers = new Map(),
    fire = (call, watchdogMs) => {
      timers.delete(call.toolUseId), onWatchdog(call, watchdogMs);
    };
  return {
    arm: call => {
      let existing = timers.get(call.toolUseId);
      if (existing !== void 0) clearTimeout(existing), timers.delete(call.toolUseId);
      if (call.nativeTimeoutMs === void 0) return;
      let watchdogMs = Math.ceil(call.nativeTimeoutMs * x2p) + I2p;
      if (watchdogMs >= r5n) return;
      let timer = setTimeout(fire, watchdogMs, call, watchdogMs);
      timer.unref?.(), timers.set(call.toolUseId, timer);
    },
    clear: toolUseId => {
      let existing = timers.get(toolUseId);
      if (existing !== void 0) clearTimeout(existing), timers.delete(toolUseId);
    },
    cancel: () => {
      for (let timer of timers.values()) clearTimeout(timer);
      timers.clear();
    }
  };
}

/** No-op hook for the executed code (reserved). */
function P2p(code) {
  return;
}
var EYa,
  CYa,
  y2p,
  T2p,
  S2p = 30000,
  r5n = 600000,
  b2p,
  R2p = 8,
  w2p = 4,
  C_o,
  I2p = 5000,
  x2p = 1.5;
var AYa = b(() => {
  Qr();
  kt();
  vu();
  ri();
  cx();
  lh();
  xl();
  qe();
  Ct();
  ia();
  po();
  lr();
  Uye();
  fg();
  $A();
  Z3t();
  Nja();
  Bja();
  E_o();
  l_o();
  _Ya();
  T_o();
  EYa = require("util"), CYa = x(require("vm"));
  y2p = ve(() => C.strictObject({
    code: C.string().describe("JavaScript code to execute. Supports top-level await. State persists across calls."),
    description: C.string().optional().describe('Clear, concise description of what this script does in active voice (5-10 words). E.g. "Trace upgrade message to its GrowthBook flag"'),
    timeout: C.number().optional().describe("Optional timeout in milliseconds (default 30000, max 600000)")
  })), T2p = ve(() => C.object({
    code: C.string().describe("The code that was executed"),
    result: C.unknown().describe("Return value from the code execution"),
    stdout: C.string().describe("Captured console.log output"),
    stderr: C.string().describe("Captured console.error output"),
    error: C.string().optional().describe("Error message if execution failed"),
    registeredTools: C.array(C.string()).optional().describe("Names of tools registered during this execution"),
    images: C.array(C.object({
      base64: C.string(),
      mediaType: C.string()
    })).optional().describe("Images returned by inner Read calls — surfaced as image content blocks"),
    documents: C.array(C.object({
      base64: C.string()
    })).optional().describe("PDFs returned by inner Read calls — surfaced as document content blocks")
  })), b2p = new Set(["stdout", "stderr", "error", "result"]);
  C_o = Ks({
    name: Mf,
    searchHint: "execute JavaScript with programmatic tool access",
    get maxResultSizeChars() {
      return bYa();
    },
    async prompt() {
      return Lja();
    },
    async description() {
      return Mja();
    },
    get inputSchema() {
      return y2p();
    },
    get outputSchema() {
      return T2p();
    },
    isEnabled() {
      return gw();
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    toAutoClassifierInput(input) {
      return input.code;
    },
    async checkPermissions() {
      return {
        behavior: "allow"
      };
    },
    async call(input, ctx, n, r, onProgress) {
      let agentId = ctx.agentId ?? I$e,
        existingCtx = ctx.getReplContexts()[agentId],
        {
          code: code,
          timeout: timeout
        } = input;
      P2p(code);
      let effectiveTimeout = Math.min(timeout ?? S2p, r5n),
        innerAbort = h1(ctx.abortController),
        innerCtx = {
          ...ctx,
          abortController: innerAbort
        },
        callMap = new Map(),
        rejectable = k2p(),
        budget = H2p(effectiveTimeout, () => rejectable.reject(Error(`REPL execution timed out after ${effectiveTimeout}ms of script time (inner tool calls excluded). Script may still be running — avoid unbounded awaits.`))),
        watchdog = D2p((call, watchdogMs) => {
          W("tengu_repl_inner_watchdog_fired", {
            toolName: Pi(call.toolName),
            watchdogMs: watchdogMs,
            nativeTimeoutMs: call.nativeTimeoutMs
          }), innerAbort.abort(), rejectable.reject(Error(`REPL inner tool call ${call.toolName} exceeded ${watchdogMs}ms watchdog (native timeout ${call.nativeTimeoutMs ?? "unset"}). The call may be hung — try a shorter timeout on the tool itself.`));
        }),
        handleProgress = event => {
          if (event.type !== "progress") {
            onProgress?.(event);
            return;
          }
          let data = event.data;
          switch (C2p(callMap, data), data.phase) {
            case "start":
              budget.onToolStart();
              break;
            case "executing":
              watchdog.arm(data);
              break;
            case "complete":
            case "error":
              watchdog.clear(data.toolUseId), budget.onToolEnd();
              break;
          }
          onProgress?.(data.result === void 0 ? event : {
            ...event,
            data: {
              ...data,
              result: void 0
            }
          });
        },
        replCtx,
        firstMessage = ctx.messages[0],
        boundaryUuid = firstMessage !== void 0 && NE(firstMessage) ? firstMessage.uuid : null;
      if (existingCtx && existingCtx.boundaryUuid === boundaryUuid) replCtx = existingCtx, replCtx.console.clear(), replCtx.clearAllTimers(), iYa(replCtx, yYa(ctx.options.tools, Mr(ctx)), innerCtx, n, r, handleProgress);else {
        existingCtx?.clearAllTimers(), existingCtx?.console.clear();
        let toolset = yYa(ctx.options.tools, Mr(ctx));
        replCtx = sYa(toolset, innerCtx, n, r, handleProgress), replCtx.boundaryUuid = boundaryUuid, replCtx.helperState.repo = await z1e().catch(() => null);
        let hydration = ctx.replHydration ?? {
            kind: "fresh"
          },
          resolvedHydration = hydration.kind === "fork" && existingCtx ? {
            kind: "fresh"
          } : hydration;
        try {
          let replayEntries = resolvedHydration.kind === "fork" ? resolvedHydration.log : resolvedHydration.kind === "resume" ? n5n(ctx.messages) : [];
          if (replayEntries.length > 0) {
            let hydrateStart = performance.now(),
              hydrateResult = await uYa(replCtx, replayEntries),
              hydrateMs = Math.round(performance.now() - hydrateStart),
              {
                summary: summary
              } = dYa(hydrateResult);
            if (A(`REPL state hydrated from ${resolvedHydration.kind} in ${hydrateMs}ms: ${summary}`, {
              level: "info"
            }), resolvedHydration.kind === "resume") replCtx.replayLog = [...replayEntries];
          }
        } catch (hydrateErr) {
          A(`REPL state hydration failed: ${replCtx.sealers.errMsg(hydrateErr)}`, {
            level: "warn"
          });
        }
        replCtx.clearAllTimers(), ctx.setReplContext(agentId, replCtx);
      }
      let {
          vmContext: vmContext,
          registeredTools: registeredTools,
          console: replConsole
        } = replCtx,
        preExistingToolNames = new Set(registeredTools.keys());
      e5n(replCtx);
      try {
        let preparedCode = q6n(code),
          runResult = new CYa.Script(preparedCode, {
            filename: "repl-tool-code.js",
            importModuleDynamically: () => {
              throw kce("import() is not available in REPL code.");
            }
          }).runInContext(vmContext, {
            timeout: effectiveTimeout
          }),
          abortSignal = ctx.abortController.signal,
          onAbort = () => rejectable.reject(Error("REPL execution interrupted"));
        if (abortSignal.aborted) onAbort();else abortSignal.addEventListener("abort", onAbort, {
          once: !0
        });
        budget.start();
        let hardLimitTimer = setTimeout(reject => reject(Error(`REPL execution exceeded hard wall-clock limit of ${r5n}ms. An inner tool call may be hung — try a shorter timeout on the tool itself, or split the work.`)), r5n, rejectable.reject);
        hardLimitTimer.unref?.();
        let resultValue = await Promise.race([replCtx.sealers.awaitVM(runResult).then(value => t5n(replCtx, W6n(value))), rejectable.promise]).finally(() => {
            clearTimeout(hardLimitTimer), abortSignal.removeEventListener("abort", onAbort);
          }),
          newToolNames = [...registeredTools.keys()].filter(name => !preExistingToolNames.has(name)),
          images = A2p(callMap),
          documents = v2p(callMap),
          pendingCalls = Array.from(callMap.values()).filter(call => call.phase === "start" || call.phase === "executing"),
          stderrText = replConsole.getStderr(),
          finalStderr = pendingCalls.length ? (stderrText ? stderrText + `
` : "") + `⚠ ${pendingCalls.length} tool call(s) still pending at script end — ` + `results discarded: ${pendingCalls.map(call => call.toolName).join(", ")}. Add 'await'.` : stderrText,
          data = {
            code: code,
            result: resultValue,
            stdout: replConsole.getStdout(),
            stderr: finalStderr,
            ...(newToolNames.length > 0 && {
              registeredTools: newToolNames
            }),
            ...(images.length > 0 && {
              images: images
            }),
            ...(documents.length > 0 && {
              documents: documents
            })
          },
          newTools = newToolNames.length > 0 ? Fja(registeredTools, replCtx.sealers) : void 0;
        return replCtx.replayLog.push({
          code: code,
          calls: b_o(callMap),
          threw: !1
        }), {
          data: data,
          newMessages: SYa(callMap),
          ...(newTools && {
            newTools: newTools
          })
        };
      } catch (execErr) {
        if (execErr instanceof Error && execErr.stack) A(`REPL error stack trace:
${execErr.stack}`, {
          level: "error"
        });
        let erroredCalls = Array.from(callMap.values()).filter(call => call.phase === "error"),
          baseErrMsg = execErr instanceof Error ? e8o(execErr) : replCtx.sealers.toStr(execErr),
          errorText = erroredCalls.length ? baseErrMsg + `

Inner tool errors (likely root cause):
` + erroredCalls.map(call => `- ${call.toolName}: ${call.error}`).join(`
`) : baseErrMsg,
          errorData = {
            code: code,
            result: null,
            stdout: replConsole.getStdout(),
            stderr: replConsole.getStderr(),
            error: errorText
          };
        return replCtx.replayLog.push({
          code: code,
          calls: b_o(callMap),
          threw: !0
        }), {
          data: errorData,
          newMessages: SYa(callMap)
        };
      } finally {
        innerAbort.abort(), budget.cancel(), watchdog.cancel(), replCtx.clearAllTimers();
      }
    },
    userFacingName() {
      return "REPL";
    },
    isTransparentWrapper() {
      return !0;
    },
    getToolUseSummary(input) {
      if (!input?.code) return null;
      let summary = Cd(input.code);
      if (summary && summary.length > 50) return summary.slice(0, 49) + "…";
      return summary ?? null;
    },
    renderToolUseMessage: mYa,
    renderToolUseRejectedMessage: hYa,
    renderToolUseErrorMessage: gYa,
    renderToolUseProgressMessage: fYa,
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      let text = "";
      if (!result.stdout && !result.stderr && !result.error && result.result !== void 0 && !result.registeredTools?.length) text = TYa(result.result, 10);else {
        let parts = [];
        if (result.stdout) parts.push(`stdout:
${result.stdout}`);
        if (result.stderr) parts.push(`stderr:
${result.stderr}`);
        if (result.error) parts.push(`error: ${result.error}`);
        if (result.result !== void 0) parts.push(`result: ${TYa(result.result, 10)}`);
        if (result.registeredTools?.length) parts.push(`Registered tools: ${result.registeredTools.join(", ")}`);
        text = parts.join(`

`) || "";
      }
      if (result.images?.length || result.documents?.length) {
        let charBudget = bYa(),
          truncatedText = text.length > charBudget ? text.slice(0, charBudget) + `
[… ${text.length - charBudget} more chars truncated — block-bearing REPL results are capped at ${charBudget} chars of text]` : text || "(no text output)";
        return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: [{
            type: "text",
            text: truncatedText
          }, ...(result.images ?? []).map(image => ({
            type: "image",
            source: {
              type: "base64",
              media_type: image.mediaType,
              data: image.base64
            }
          })), ...(result.documents ?? []).map(doc => ({
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: doc.base64
            }
          }))]
        };
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: text,
        is_error: !!result.error
      };
    }
  });
});
export {yYa,TYa,E2p,SYa,C2p,A2p,v2p,bYa,k2p,H2p,D2p,P2p,EYa,CYa,y2p,T2p,S2p,r5n,b2p,R2p,w2p,C_o,I2p,x2p,AYa};
