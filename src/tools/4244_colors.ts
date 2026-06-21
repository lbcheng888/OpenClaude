// @ts-nocheck
import {qce as Rce,Y0 as K0} from "../artifact/4303_Y0.ts";
import {o_e as jge,u$t as W2t} from "../../vendor/m4336.ts";
import {Lc as Vc,Ri,pi as ai} from "./2227_userFacingName.ts";
import {Cs as vs,Ph as rg} from "../../vendor/m2224.ts";
import {PA as MA,kNi as E1i,Lv as Hv,ox as tx,C2e as t2e} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {SS as mS,Ln,lo,xE as kC} from "./5190_userPromptCount.ts";
import {b,M as L} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ct,logEvent as j} from "../../vendor/m131.ts";
import {$u as od,Qi as Xi} from "../mcp/2194_mcpServerName.ts";
import {ch as uh,rN as K1} from "../../vendor/m2727.ts";
import {Ql as Xl,Fr as Lr} from "../../vendor/m4405.ts";
import {qe as je,logForDebugging as v} from "../config/0234_setHasFormattedOutput.ts";
import {bt as St,s9o as Q2o} from "../../vendor/m195.ts";
import {Ba,getGithubRepo as LMe} from "../../vendor/m693.ts";
import {dr as fr,zd as Xd} from "../../vendor/m231.ts";
import {S_e as s_e,Lce as Sce} from "../../vendor/m4169.ts";
import {_5a as t8a,h5a as Zja,g5a as e8a} from "../../vendor/m4230.ts";
import {T5a as r8a,y5a as n8a} from "../tui/4232_verbose.tsx";
import {wpo as Tdo,K3n as l3n,G5a as x8a,V5a as k8a,vpo as ydo} from "../core/4242_kind.ts";
import {mpo as ldo,L3n as J9n,M3n as X9n} from "../../vendor/m4232.ts";
import {X5a as O8a,K5a as H8a,Y5a as D8a,J5a as P8a,z5a as I8a} from "../../vendor/m4242.ts";
import {Epo as gdo,$5a as C8a,U5a as E8a,G3n as i3n,V3n as a3n} from "../../vendor/m4240.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// @ts-nocheck
function buildReplToolset(callerTools, replOptions) {
  let permittedTools = Rce(jge(), replOptions),
    callerNames = new Set(callerTools.map(tool => tool.name)),
    merged = callerTools.filter(tool => !Vc(tool, vs) && !Vc(tool, MA));
  for (let tool of permittedTools) if (!callerNames.has(tool.name)) merged.push(tool);
  return merged;
}
function stringifyResultValue(value, depth) {
  if (typeof value === "string" && value.trim() !== "") return value;
  let record = tryFormatRecordOfStrings(value);
  if (record !== undefined) return record;
  try {
    return nodeUtil.inspect(value, {
      colors: false,
      depth: depth,
      customInspect: false
    });
  } catch {
    return "[non-serializable value]";
  }
}
function tryFormatRecordOfStrings(value) {
  try {
    if (value === null || typeof value !== "object" || Array.isArray(value) || value.constructor?.name !== "Object") return;
    let entries = Object.entries(value);
    if (entries.length === 0 || entries.some(([key, val]) => typeof val !== "string" || RESERVED_RECORD_KEYS_2.has(key))) return;
    return entries.map(([key, val]) => `${key}:
${val}`).join(`

`);
  } catch {
    return;
  }
}
function buildVirtualMessagesFromCalls(callMap) {
  let messages = [];
  for (let call of callMap.values()) {
    if (call.phase === "start" || call.phase === "executing") continue;
    messages.push(mS({
      content: [{
        type: "tool_use",
        id: call.toolUseId,
        name: call.toolName,
        input: call.toolInput
      }],
      isVirtual: true
    })), messages.push(Ln({
      content: [{
        type: "tool_result",
        tool_use_id: call.toolUseId,
        content: call.phase === "error" ? call.error ?? "" : "",
        is_error: call.phase === "error"
      }],
      toolUseResult: call.result,
      isVirtual: true
    }));
  }
  return messages;
}
function upsertToolCallState(callMap, progress) {
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
function collectImagesFromCalls(callMap) {
  let images = [];
  for (let call of callMap.values()) {
    if (call.phase !== "complete") continue;
    let result = call.result;
    if (result != null && typeof result === "object" && result.type === "image" && result.file != null && typeof result.file === "object" && typeof result.file.base64 === "string" && result.file.base64.length > 0 && typeof result.file.type === "string") images.push({
      base64: result.file.base64,
      mediaType: result.file.type
    });
  }
  return images.slice(0, MAX_IMAGES);
}
function collectPdfsFromCalls(callMap) {
  let documents = [];
  for (let call of callMap.values()) {
    if (call.phase !== "complete") continue;
    let result = call.result;
    if (result != null && typeof result === "object" && result.type === "pdf" && result.file != null && typeof result.file === "object" && typeof result.file.base64 === "string" && result.file.base64.length > 0) documents.push({
      base64: result.file.base64
    });
  }
  return documents.slice(0, MAX_PDFS);
}
function getMaxResultSizeChars() {
  let match = E1i()?.match(/trim(\d+)k/);
  return match ? parseInt(match[1], 10) * 1000 : 1e5;
}
function createRejectablePromise() {
  let reject;
  return {
    promise: new Promise((_resolve, rej) => {
      reject = rej;
    }),
    reject: reject
  };
}
function createScriptTimeBudget(timeoutMs, onExpire) {
  let activeToolCalls = 0,
    remainingMs = timeoutMs,
    resumedAt = 0,
    timer,
    expired = false;
  function start() {
    if (expired || timer !== undefined || activeToolCalls > 0) return;
    if (remainingMs <= 0) {
      expired = true, onExpire();
      return;
    }
    resumedAt = Date.now(), timer = setTimeout(() => {
      expired = true, onExpire();
    }, remainingMs), timer.unref?.();
  }
  function pause() {
    if (timer === undefined) return;
    clearTimeout(timer), timer = undefined, remainingMs -= Date.now() - resumedAt;
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
      expired = true, pause();
    }
  };
}
function recordExecutedCode(code) {
  let t = new Map(),
    n = (r, o) => {
      t.delete(r.toolUseId), code(r, o);
    };
  return {
    arm: r => {
      let o = t.get(r.toolUseId);
      if (o !== undefined) clearTimeout(o), t.delete(r.toolUseId);
      if (r.nativeTimeoutMs === undefined) return;
      let s = Math.ceil(r.nativeTimeoutMs * O0p) + P0p;
      if (s >= RESERVED_RECORD_KEYS) return;
      let i = setTimeout(n, s, r, s);
      i.unref?.(), t.set(r.toolUseId, i);
    },
    clear: r => {
      let o = t.get(r);
      if (o !== undefined) clearTimeout(o), t.delete(r);
    },
    cancel: () => {
      for (let r of t.values()) clearTimeout(r);
      t.clear();
    }
  };
}
function M0p(e) {
  return;
}
var nodeUtil,
  getReplInputSchema,
  getReplOutputSchema,
  DEFAULT_TIMEOUT_MS,
  MAX_TIMEOUT_MS = 30000,
  RESERVED_RECORD_KEYS = 600000,
  RESERVED_RECORD_KEYS_2,
  MAX_IMAGES = 8,
  MAX_PDFS = 4,
  kuK,
  P0p = 5000,
  O0p = 1.5;
var $8a = b(() => {
  Xr();
  Ct();
  od();
  Ri();
  K0();
  uh();
  Xl();
  je();
  St();
  Ba();
  lo();
  fr();
  s_e();
  rg();
  Hv();
  W2t();
  t8a();
  r8a();
  Tdo();
  ldo();
  O8a();
  gdo();
  nodeUtil = require("util"), getReplInputSchema = L(require("vm"));
  getReplOutputSchema = Re(() => E.strictObject({
    code: E.string().describe("JavaScript code to execute. Supports top-level await. State persists across calls."),
    description: E.string().optional().describe('Clear, concise description of what this script does in active voice (5-10 words). E.g. "Trace upgrade message to its GrowthBook flag"'),
    timeout: E.number().optional().describe("Optional timeout in milliseconds (default 30000, max 600000)")
  })), DEFAULT_TIMEOUT_MS = Re(() => E.object({
    code: E.string().describe("The code that was executed"),
    result: E.unknown().describe("Return value from the code execution"),
    stdout: E.string().describe("Captured console.log output"),
    stderr: E.string().describe("Captured console.error output"),
    error: E.string().optional().describe("Error message if execution failed"),
    registeredTools: E.array(E.string()).optional().describe("Names of tools registered during this execution"),
    images: E.array(E.object({
      base64: E.string(),
      mediaType: E.string()
    })).optional().describe("Images returned by inner Read calls \u2014 surfaced as image content blocks"),
    documents: E.array(E.object({
      base64: E.string()
    })).optional().describe("PDFs returned by inner Read calls \u2014 surfaced as document content blocks")
  })), RESERVED_RECORD_KEYS_2 = new Set(["stdout", "stderr", "error", "result"]);
  kuK = ai({
    name: MA,
    searchHint: "execute JavaScript with programmatic tool access",
    get maxResultSizeChars() {
      return getMaxResultSizeChars();
    },
    async prompt() {
      return Zja();
    },
    async description() {
      return e8a();
    },
    get inputSchema() {
      return getReplOutputSchema();
    },
    get outputSchema() {
      return DEFAULT_TIMEOUT_MS();
    },
    isEnabled() {
      return tx();
    },
    isConcurrencySafe() {
      return false;
    },
    isReadOnly() {
      return false;
    },
    toAutoClassifierInput(e) {
      return e.code;
    },
    async checkPermissions() {
      return {
        behavior: "allow"
      };
    },
    async call(e, t, n, r, o) {
      let s = t.agentId ?? t2e,
        i = t.getReplContexts()[s],
        {
          code: a,
          timeout: l
        } = e;
      M0p(a);
      let c = Math.min(l ?? MAX_TIMEOUT_MS, RESERVED_RECORD_KEYS),
        u = K1(t.abortController),
        d = {
          ...t,
          abortController: u
        },
        p = new Map(),
        m = createRejectablePromise(),
        f = createScriptTimeBudget(c, () => m.reject(Error(`REPL execution timed out after ${c}ms of script time (inner tool calls excluded). Script may still be running \u2014 avoid unbounded awaits.`))),
        A = recordExecutedCode((k, x) => {
          j("tengu_repl_inner_watchdog_fired", {
            toolName: Xi(k.toolName),
            watchdogMs: x,
            nativeTimeoutMs: k.nativeTimeoutMs
          }), u.abort(), m.reject(Error(`REPL inner tool call ${k.toolName} exceeded ${x}ms watchdog (native timeout ${k.nativeTimeoutMs ?? "unset"}). The call may be hung \u2014 try a shorter timeout on the tool itself.`));
        }),
        h = k => {
          if (k.type !== "progress") {
            o?.(k);
            return;
          }
          let x = k.data;
          switch (upsertToolCallState(p, x), x.phase) {
            case "start":
              f.onToolStart();
              break;
            case "executing":
              A.arm(x);
              break;
            case "complete":
            case "error":
              A.clear(x.toolUseId), f.onToolEnd();
              break;
          }
          o?.(x.result === undefined ? k : {
            ...k,
            data: {
              ...x,
              result: undefined
            }
          });
        },
        g,
        _ = t.messages[0],
        y = _ !== undefined && kC(_) ? _.uuid : null;
      if (i && i.boundaryUuid === y) g = i, g.console.clear(), g.clearAllTimers(), C8a(g, buildReplToolset(t.options.tools, Lr(t)), d, n, r, h);else {
        i?.clearAllTimers(), i?.console.clear();
        let k = buildReplToolset(t.options.tools, Lr(t));
        g = E8a(k, d, n, r, h), g.boundaryUuid = y, g.helperState.repo = await LMe().catch(() => null);
        let x = t.replHydration ?? {
            kind: "fresh"
          },
          I = x.kind === "fork" && i ? {
            kind: "fresh"
          } : x;
        try {
          let H = I.kind === "fork" ? I.log : I.kind === "resume" ? l3n(t.messages) : [];
          if (H.length > 0) {
            let P = performance.now(),
              O = await x8a(g, H),
              D = Math.round(performance.now() - P),
              {
                summary: M
              } = k8a(O);
            if (v(`REPL state hydrated from ${I.kind} in ${D}ms: ${M}`, {
              level: "info"
            }), I.kind === "resume") g.replayLog = [...H];
          }
        } catch (H) {
          v(`REPL state hydration failed: ${H instanceof Error ? H.message : g.sealers.toStr(H)}`, {
            level: "warn"
          });
        }
        g.clearAllTimers(), t.setReplContext(s, g);
      }
      let {
          vmContext: T,
          registeredTools: S,
          console: C
        } = g,
        R = new Set(S.keys());
      i3n(g);
      try {
        let k = J9n(a),
          I = new getReplInputSchema.Script(k, {
            filename: "repl-tool-code.js",
            importModuleDynamically: () => {
              throw Sce("import() is not available in REPL code.");
            }
          }).runInContext(T, {
            timeout: c
          }),
          H = t.abortController.signal,
          P = () => m.reject(Error("REPL execution interrupted"));
        if (H.aborted) P();else H.addEventListener("abort", P, {
          once: true
        });
        f.start();
        let O = setTimeout(V => V(Error(`REPL execution exceeded hard wall-clock limit of ${RESERVED_RECORD_KEYS}ms. An inner tool call may be hung \u2014 try a shorter timeout on the tool itself, or split the work.`)), RESERVED_RECORD_KEYS, m.reject);
        O.unref?.();
        let D = await Promise.race([g.sealers.awaitVM(I).then(V => a3n(g, X9n(V))), m.promise]).finally(() => {
            clearTimeout(O), H.removeEventListener("abort", P);
          }),
          M = [...S.keys()].filter(V => !R.has(V)),
          U = collectImagesFromCalls(p),
          $ = collectPdfsFromCalls(p),
          F = Array.from(p.values()).filter(V => V.phase === "start" || V.phase === "executing"),
          W = C.getStderr(),
          G = F.length ? (W ? W + `
` : "") + `\u26A0 ${F.length} tool call(s) still pending at script end \u2014 ` + `results discarded: ${F.map(V => V.toolName).join(", ")}. Add 'await'.` : W,
          K = {
            code: a,
            result: D,
            stdout: C.getStdout(),
            stderr: G,
            ...(M.length > 0 && {
              registeredTools: M
            }),
            ...(U.length > 0 && {
              images: U
            }),
            ...($.length > 0 && {
              documents: $
            })
          },
          Q = M.length > 0 ? n8a(S, g.sealers) : undefined;
        return g.replayLog.push({
          code: a,
          calls: ydo(p),
          threw: false
        }), {
          data: K,
          newMessages: buildVirtualMessagesFromCalls(p),
          ...(Q && {
            newTools: Q
          })
        };
      } catch (k) {
        if (k instanceof Error && k.stack) v(`REPL error stack trace:
${k.stack}`, {
          level: "error"
        });
        let x = Array.from(p.values()).filter(O => O.phase === "error"),
          I = k instanceof Error ? Q2o(k) : g.sealers.toStr(k),
          H = x.length ? I + `

Inner tool errors (likely root cause):
` + x.map(O => `- ${O.toolName}: ${O.error}`).join(`
`) : I,
          P = {
            code: a,
            result: null,
            stdout: C.getStdout(),
            stderr: C.getStderr(),
            error: H
          };
        return g.replayLog.push({
          code: a,
          calls: ydo(p),
          threw: true
        }), {
          data: P,
          newMessages: buildVirtualMessagesFromCalls(p)
        };
      } finally {
        u.abort(), f.cancel(), A.cancel(), g.clearAllTimers();
      }
    },
    userFacingName() {
      return "REPL";
    },
    isTransparentWrapper() {
      return true;
    },
    getToolUseSummary(e) {
      if (!e?.code) return null;
      let t = Xd(e.code);
      if (t && t.length > 50) return t.slice(0, 49) + "\u2026";
      return t ?? null;
    },
    renderToolUseMessage: H8a,
    renderToolUseRejectedMessage: D8a,
    renderToolUseErrorMessage: P8a,
    renderToolUseProgressMessage: I8a,
    mapToolResultToToolResultBlockParam(e, t) {
      let n = "";
      if (!e.stdout && !e.stderr && !e.error && e.result !== undefined && !e.registeredTools?.length) n = stringifyResultValue(e.result, 10);else {
        let r = [];
        if (e.stdout) r.push(`stdout:
${e.stdout}`);
        if (e.stderr) r.push(`stderr:
${e.stderr}`);
        if (e.error) r.push(`error: ${e.error}`);
        if (e.result !== undefined) r.push(`result: ${stringifyResultValue(e.result, 10)}`);
        if (e.registeredTools?.length) r.push(`Registered tools: ${e.registeredTools.join(", ")}`);
        n = r.join(`

`) || "";
      }
      if (e.images?.length || e.documents?.length) {
        let r = getMaxResultSizeChars(),
          o = n.length > r ? n.slice(0, r) + `
[\u2026 ${n.length - r} more chars truncated \u2014 block-bearing REPL results are capped at ${r} chars of text]` : n || "(no text output)";
        return {
          tool_use_id: t,
          type: "tool_result",
          content: [{
            type: "text",
            text: o
          }, ...(e.images ?? []).map(s => ({
            type: "image",
            source: {
              type: "base64",
              media_type: s.mediaType,
              data: s.base64
            }
          })), ...(e.documents ?? []).map(s => ({
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: s.base64
            }
          }))]
        };
      }
      return {
        tool_use_id: t,
        type: "tool_result",
        content: n,
        is_error: !!e.error
      };
    }
  });
});

export {buildReplToolset as Q5a,stringifyResultValue as Z5a,tryFormatRecordOfStrings as nOp,buildVirtualMessagesFromCalls as eWa,upsertToolCallState as rOp,collectImagesFromCalls as oOp,collectPdfsFromCalls as iOp,getMaxResultSizeChars as tWa,createRejectablePromise as lOp,createScriptTimeBudget as cOp,recordExecutedCode as pOp,M0p as mOp,nodeUtil as nWa,getReplInputSchema as rWa,getReplOutputSchema as QPp,DEFAULT_TIMEOUT_MS as ZPp,MAX_TIMEOUT_MS as eOp,RESERVED_RECORD_KEYS as z3n,RESERVED_RECORD_KEYS_2 as tOp,MAX_IMAGES as sOp,MAX_PDFS as aOp,kuK as Rpo,P0p as uOp,O0p as dOp,$8a as oWa};
