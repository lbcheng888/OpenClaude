// @ts-nocheck
import {v1t as COt,w8i as x2i,w1t as vOt,k8i as k2i} from "./2792_eventName.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {s2 as R2,VT as GT} from "../../vendor/m648.ts";
import {getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0132_sent.ts";
import {Js as oi,rT as iT} from "../../vendor/m1294.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {formatFileSize as nl,Xo as ds} from "../../vendor/m240.ts";
import {cn as ln,mo as _o,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Pi as Xi,vu as od} from "../mcp/2200_mcpServerName.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function PXi(e, t, n = COt) {
  if (!Number.isFinite(t)) return t;
  let o = ut(sUd, {})?.[e];
  if (typeof o === "number" && Number.isFinite(o) && o > 0) return o;
  return Math.min(t, n);
}
function iUd() {
  return CP6.join(R2(gr()), kt());
}
function xae() {
  return CP6.join(iUd(), GVr);
}
function GLt(e, t) {
  let n = t ? "json" : "txt";
  return CP6.join(xae(), `${e}.${n}`);
}
async function fhe() {
  try {
    await oi().mkdir(xae());
  } catch {}
}
async function Ixe(e, t) {
  let n = Array.isArray(e);
  if (n) {
    if (e.some(l => l.type !== "text")) return {
      error: "Cannot persist tool results containing non-text content"
    };
  }
  await fhe();
  let r = GLt(t, n),
    o = n ? Oe(e, null, 2) : e;
  try {
    await oi().writeExclusive(r, o), v(`Persisted tool result to ${r} (${nl(o.length)})`);
  } catch (a) {
    if (ln(a) !== "EEXIST") return v(`Failed to persist tool result to ${r}: ${selectResultsToShed(_o(a))}`, {
      level: "error"
    }), {
      error: selectResultsToShed(_o(a))
    };
  }
  let {
    preview: s,
    hasMore: i
  } = ensureToolResultsDir(o, wrt);
  return {
    filepath: r,
    originalSize: o.length,
    isJson: n,
    preview: s,
    hasMore: i
  };
}
function Dxe(e) {
  let t = `${Hxe}
`;
  return t += `Output too large (${nl(e.originalSize)}). Full output saved to: ${e.filepath}

`, t += `Preview (first ${nl(wrt)}):
`, t += e.preview, t += e.hasMore ? `
...
` : `
`, t += VVr, t;
}
async function getEffectiveThreshold(toolName, maxResultSizeChars, n) {
  let r = toolName.mapToolResultToToolResultBlockParam(maxResultSizeChars, n);
  return buildResultFilePath(r, toolName.name, PXi(toolName.name, toolName.maxResultSizeChars, toolName.persistenceThresholdCeiling));
}
async function getSessionDir(e, t, n, r) {
  return buildResultFilePath(e, t, PXi(t, n, r));
}
function getToolResultsDir(e) {
  if (!e) return true;
  if (typeof e === "string") return e.trim() === "";
  if (!Array.isArray(e)) return false;
  if (e.length === 0) return true;
  return e.every(t => typeof t === "object" && "type" in t && t.type === "text" && "text" in t && (typeof t.text !== "string" || t.text.trim() === ""));
}
async function buildResultFilePath(toolUseId, isJson, n) {
  let r = toolUseId.content;
  if (getToolResultsDir(r)) return j("tengu_tool_empty_result", {
    toolName: Xi(isJson)
  }), {
    ...toolUseId,
    content: `(${isJson} completed with no output)`
  };
  if (!r) return toolUseId;
  if (containsBinaryContent(r)) return toolUseId;
  let o = computeContentLength(r),
    s = n ?? x2i;
  if (o <= s) return toolUseId;
  let i = await Ixe(r, toolUseId.tool_use_id);
  if (persistToolResultContent(i)) return toolUseId;
  let a = Dxe(i);
  return j("tengu_tool_result_persisted", {
    toolName: Xi(isJson),
    originalSizeBytes: i.originalSize,
    persistedSizeBytes: a.length,
    estimatedOriginalTokens: Math.ceil(i.originalSize / vOt),
    estimatedPersistedTokens: Math.ceil(a.length / vOt),
    thresholdUsed: s
  }), {
    ...toolUseId,
    content: a
  };
}
function ensureToolResultsDir(e, t) {
  if (e.length <= t) return {
    preview: e,
    hasMore: false
  };
  let r = e.slice(0, t).lastIndexOf(`
`),
    o = r > t * 0.5 ? r : t;
  return {
    preview: e.slice(0, o),
    hasMore: true
  };
}
function persistToolResultContent(content) {
  return "error" in content;
}
function buildPersistedOutputStub() {
  return {
    seenIds: new Set(),
    replacements: new Map()
  };
}
function n__(tool) {
  return {
    seenIds: new Set(tool.seenIds),
    replacements: new Map(tool.replacements)
  };
}
function rl7(block, toolName) {
  if (!ut("tengu_hawthorn_steeple", false)) return;
  if (block) return groupToolResultsByTurn(block, toolName ?? []);
  return buildPersistedOutputStub();
}
function isEmptyToolResult(content) {
  return typeof content === "string" && (content.startsWith(Hxe) || content === oUd);
}
function containsBinaryContent(content) {
  return Array.isArray(content) && content.some(item => typeof item === "object" && "type" in item && (item.type === "image" || item.type === "document"));
}
function computeContentLength(content) {
  if (typeof content === "string") return content.length;
  return content.reduce((acc, item) => acc + (item.type === "text" ? item.text.length : 0), 0);
}
function applyResultPersistence(block) {
  let t = new Map();
  for (let n of block) {
    if (n.type !== "assistant") continue;
    let r = n.message.content;
    if (!Array.isArray(r)) continue;
    for (let o of r) if (o.type === "tool_use") t.set(o.id, o.name);
  }
  return t;
}
function slicePreview(text) {
  if (text.type !== "user" || !Array.isArray(text.message.content)) return [];
  return text.message.content.flatMap(t => {
    if (t.type !== "tool_result" || !t.content) return [];
    if (isEmptyToolResult(t.content)) return [];
    if (containsBinaryContent(t.content)) return [];
    return [{
      toolUseId: t.tool_use_id,
      content: t.content,
      size: computeContentLength(t.content)
    }];
  });
}
function isPersistError(result) {
  let t = [],
    n = [],
    r = () => {
      if (n.length > 0) t.push(n);
      n = [];
    },
    o = new Set();
  for (let s of result) if (s.type === "user") n.push(...slicePreview(s));else if (s.type === "assistant") {
    if (!o.has(s.message.id)) r(), o.add(s.message.id);
  }
  return r(), t;
}
function ak_(e, t) {
  return e.reduce((n, r) => {
    let o = t.replacements.get(r.toolUseId);
    if (o !== undefined) n.mustReapply.push({
      ...r,
      replacement: o
    });else if (t.seenIds.has(r.toolUseId)) n.frozen.push(r);else n.fresh.push(r);
    return n;
  }, {
    mustReapply: [],
    frozen: [],
    fresh: []
  });
}
function al7(state, t, n) {
  let r = [...state].sort((i, a) => a.size - i.size),
    o = [],
    s = t + state.reduce((i, a) => i + a.size, 0);
  for (let i of r) {
    if (s <= n) break;
    o.push(i), s -= i.size;
  }
  return o;
}
function sl7(messages, replacements) {
  return messages.map(n => {
    if (n.type !== "user" || !Array.isArray(n.message.content)) return n;
    let r = n.message.content;
    if (!r.some(s => s.type === "tool_result" && replacements.has(s.tool_use_id))) return n;
    return {
      ...n,
      message: {
        ...n.message,
        content: r.map(s => {
          if (s.type !== "tool_result") return s;
          let i = replacements.get(s.tool_use_id);
          return i === undefined ? s : {
            ...s,
            content: i
          };
        })
      }
    };
  });
}
async function isAlreadyPersistedContent(content) {
  let t = await Ixe(content.content, content.toolUseId);
  if (persistToolResultContent(t)) return null;
  return {
    content: Dxe(t),
    originalSize: t.originalSize
  };
}
async function buildToolUseIdToNameMap(messages, t, n = new Set()) {
  let r = isPersistError(messages),
    o = n.size > 0 ? applyResultPersistence(messages) : undefined,
    s = f => o !== undefined && n.has(o.get(f) ?? ""),
    i = k2i,
    a = new Map(),
    l = [],
    c = 0,
    u = 0;
  for (let f of r) {
    let {
      mustReapply: A,
      frozen: h,
      fresh: g
    } = ak_(f, t);
    if (A.forEach(k => a.set(k.toolUseId, k.replacement)), c += A.length, g.length === 0) {
      f.forEach(k => t.seenIds.add(k.toolUseId));
      continue;
    }
    g.filter(k => s(k.toolUseId)).forEach(k => t.seenIds.add(k.toolUseId));
    let y = g.filter(k => !s(k.toolUseId)),
      T = h.reduce((k, x) => k + x.size, 0),
      S = y.reduce((k, x) => k + x.size, 0),
      C = T + S > i ? al7(y, T, i) : [],
      R = new Set(C.map(k => k.toolUseId));
    if (f.filter(k => !R.has(k.toolUseId)).forEach(k => t.seenIds.add(k.toolUseId)), C.length === 0) continue;
    u++, l.push(...C);
  }
  if (a.size === 0 && l.length === 0) return {
    messages: messages,
    newlyReplaced: []
  };
  let d = await Promise.all(l.map(async f => [f, await isAlreadyPersistedContent(f)])),
    p = [],
    m = 0;
  for (let [f, A] of d) {
    if (t.seenIds.add(f.toolUseId), A === null) continue;
    m += f.size, a.set(f.toolUseId, A.content), t.replacements.set(f.toolUseId, A.content), p.push({
      kind: "tool-result",
      toolUseId: f.toolUseId,
      replacement: A.content
    }), j("tengu_tool_result_persisted_message_budget", {
      originalSizeBytes: A.originalSize,
      persistedSizeBytes: A.content.length,
      estimatedOriginalTokens: Math.ceil(A.originalSize / vOt),
      estimatedPersistedTokens: Math.ceil(A.content.length / vOt)
    });
  }
  if (a.size === 0) return {
    messages: messages,
    newlyReplaced: []
  };
  if (p.length > 0) v(`Per-message budget: persisted ${p.length} tool results across ${u} over-budget message(s), shed ~${nl(m)}, ${c} re-applied`), j("tengu_message_level_tool_result_budget_enforced", {
    resultsPersisted: p.length,
    messagesOverBudget: u,
    replacedSizeBytes: m,
    reapplied: c
  });
  return {
    messages: sl7(messages, a),
    newlyReplaced: p
  };
}
async function extractPersistableToolResults(message, t, n, r) {
  if (!t) return message;
  let o = await buildToolUseIdToNameMap(message, t, r);
  if (o.newlyReplaced.length > 0) n?.(o.newlyReplaced);
  return o.messages;
}
function groupToolResultsByTurn(messages, t, n) {
  let r = buildPersistedOutputStub(),
    o = new Set(isPersistError(messages).flat().map(s => s.toolUseId));
  for (let s of o) r.seenIds.add(s);
  for (let s of t) if (s.kind === "tool-result" && o.has(s.toolUseId)) r.replacements.set(s.toolUseId, s.replacement);
  if (n) {
    for (let [s, i] of n) if (o.has(s) && !r.replacements.has(s)) r.replacements.set(s, i);
  }
  return r;
}
function categoriseToolResults(results, state, n) {
  if (!results) return;
  return groupToolResultsByTurn(state, n, results.replacements);
}
function selectResultsToShed(candidates) {
  let t = candidates;
  if (t.code) switch (t.code) {
    case "ENOENT":
      return `Directory not found: ${t.path ?? "unknown path"}`;
    case "EACCES":
      return `Permission denied: ${t.path ?? "unknown path"}`;
    case "ENOSPC":
      return "No space left on device";
    case "EROFS":
      return "Read-only file system";
    case "EMFILE":
      return "Too many open files";
    case "EEXIST":
      return `File already exists: ${t.path ?? "unknown path"}`;
    default:
      return `${t.code}: ${t.message}`;
  }
  return candidates.message;
}
var CP6,
  GVr = "tool-results",
  Hxe = "<persisted-output>",
  VVr = "</persisted-output>",
  oUd = "[Old tool result content cleared]",
  sUd = "tengu_velvet_ibis",
  wrt = 2000;
var LL = b(() => {
  ct();
  Yn();
  Ct();
  od();
  iT();
  je();
  St();
  ds();
  GT();
  Xt();
  CP6 = require("path");
});
export {PXi as Zsa,iUd as hKd,xae as Bae,GLt as jNt,fhe as qge,Ixe as FHe,Dxe as BHe,getEffectiveThreshold as jst,getSessionDir as eia,getToolResultsDir as gKd,buildResultFilePath as tia,ensureToolResultsDir as YNt,persistToolResultContent as UHe,buildPersistedOutputStub as JNt,n__ as nia,rl7 as ria,isEmptyToolResult as _Kd,containsBinaryContent as oia,computeContentLength as sia,applyResultPersistence as yKd,slicePreview as TKd,isPersistError as iia,ak_ as SKd,al7 as bKd,sl7 as EKd,isAlreadyPersistedContent as CKd,buildToolUseIdToNameMap as AKd,extractPersistableToolResults as aia,groupToolResultsByTurn as jxn,categoriseToolResults as Yxn,selectResultsToShed as Qsa,CP6 as zxn,GVr as TXr,Hxe as NHe,VVr as SXr,oUd as mKd,sUd as fKd,wrt as zst,LL as HI};
