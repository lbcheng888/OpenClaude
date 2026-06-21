// @ts-nocheck
import {dbe as ejH,dtn as is_,JT as Cj,ube as tjH,QT as Ij} from "../../vendor/m642.ts";
import {st as q_} from "../../vendor/m5.ts";
import {Hg as pw,_Se as OjH,Xt as H6} from "../config/0228_encoding.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
/**
 * Transcript loading, branch selection, compact-boundary repair, and API shaping.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Read transcript bytes, optionally skipping compacted pre-boundary content. */
async function readTranscriptBuffer(H: any, _: any) : any {
  try {
    if (_ > ejH && !q_(process.env.CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP)) return (await is_(H, _)).postBoundaryBuf;
    return await zP4.readFile(H);
  } catch {
    return null;
  }
}
/** Parse JSONL transcript entries from a buffer. */
function parseTranscriptEntries(H: any) : any {
  using _ = pw`parseTranscriptEntries(${H.length} bytes)`;
  let q = [],
    K = 10,
    O = H.length,
    T = 0;
  while (T < O) {
    let z = H.indexOf(K, T);
    if (z === -1) z = O;
    let $ = T;
    while ($ < z && H[$] <= 32) $++;
    if (T = z + 1, $ >= z) continue;
    let Y = H.toString("utf-8", $, z);
    try {
      let A = OjH(Y),
        w = A.type;
      if ((w === "user" || w === "assistant" || w === "progress" || w === "system" || w === "attachment") && typeof A.uuid === "string") q.push(A);
    } catch {}
  }
  return q;
}
/** Select the latest visible conversation branch and repair compact-boundary parentage. */
function selectActiveTranscriptBranch(H: any) : any {
  let _ = new Map();
  for (let j of H) _.set(j.uuid, j);
  for (let j of _.values()) {
    if (j.type !== "system" || j.subtype !== "compact_boundary") continue;
    let J = j.compactMetadata?.preservedMessages,
      D = j.compactMetadata?.preservedSegment;
    if (J) {
      if (J.uuids.length === 0 || J.uuids.some(Z => !_.has(Z))) continue;
      let M = J.anchorUuid;
      for (let Z of J.uuids) {
        let W = _.get(Z);
        _.set(Z, {
          ...W,
          parentUuid: M
        }), M = Z;
      }
      let X = J.uuids[0],
        P = J.uuids.at(-1);
      for (let [Z, W] of _) if (W.parentUuid === J.anchorUuid && Z !== X) _.set(Z, {
        ...W,
        parentUuid: P
      });
    } else if (D) {
      let M = _.get(D.headUuid);
      if (M) _.set(D.headUuid, {
        ...M,
        parentUuid: D.anchorUuid
      });
      for (let [X, P] of _) if (P.parentUuid === D.anchorUuid && X !== D.headUuid) _.set(X, {
        ...P,
        parentUuid: D.tailUuid
      });
    }
  }
  let q = new Map();
  for (let j = 0; j < H.length; j++) q.set(H[j].uuid, j);
  let K = new Set();
  for (let j of _.values()) if (j.parentUuid) K.add(j.parentUuid);
  let O = [..._.values()].filter(j => !K.has(j.uuid)),
    T = [];
  for (let j of O) {
    let J = j,
      D = new Set();
    while (J) {
      if (D.has(J.uuid)) break;
      if (D.add(J.uuid), J.type === "user" || J.type === "assistant") {
        T.push(J);
        break;
      }
      J = J.parentUuid ? _.get(J.parentUuid) : void 0;
    }
  }
  if (T.length === 0) return [];
  let z = T.filter(j => !j.isSidechain && !j.teamName && !j.isMeta),
    $ = j => j.reduce((J, D) => (q.get(D.uuid) ?? -1) > (q.get(J.uuid) ?? -1) ? D : J),
    Y = z.length > 0 ? $(z) : $(T),
    A = [],
    w = new Set(),
    f = _.get(Y.uuid);
  while (f) {
    if (w.has(f.uuid)) break;
    w.add(f.uuid), A.push(f), f = f.parentUuid ? _.get(f.parentUuid) : void 0;
  }
  return A.reverse(), reattachOffBranchToolResults(_, A, w);
}
/** Read an assistant API message id from a transcript entry. */
function getAssistantMessageId(H: any) : any {
  if (H.type !== "assistant") return;
  let _ = H.message;
  if (typeof _ !== "object" || _ === null) return;
  let q = _.id;
  return typeof q === "string" ? q : void 0;
}
/** Detect user entries that carry tool_result content. */
function isUserToolResultEntry(H: any) : any {
  if (H.type !== "user" || !H.parentUuid) return !1;
  let _ = H.message;
  if (typeof _ !== "object" || _ === null) return !1;
  let q = _.content;
  if (!Array.isArray(q)) return !1;
  return q.some(K => typeof K === "object" && K !== null && K.type === "tool_result");
}
/** Reattach sibling assistant/tool-result entries that share assistant ids. */
function reattachOffBranchToolResults(H: any, _: any, q: any) : any {
  let K = _.filter(f => f.type === "assistant");
  if (K.length === 0) return _;
  let O = new Map();
  for (let f of K) {
    let j = getAssistantMessageId(f);
    if (j) O.set(j, f);
  }
  let T = new Map(),
    z = new Map();
  for (let f of H.values()) {
    let j = getAssistantMessageId(f);
    if (j) {
      let J = T.get(j);
      if (J) J.push(f);else T.set(j, [f]);
    } else if (isUserToolResultEntry(f)) {
      let J = f.parentUuid,
        D = z.get(J);
      if (D) D.push(f);else z.set(J, [f]);
    }
  }
  let $ = new Set(),
    Y = new Map(),
    A = 0;
  for (let f of K) {
    let j = getAssistantMessageId(f);
    if (!j || $.has(j)) continue;
    $.add(j);
    let J = T.get(j) ?? [f],
      D = J.filter(W => !q.has(W.uuid)),
      M = [];
    for (let W of J) {
      let G = z.get(W.uuid);
      if (!G) continue;
      for (let R of G) if (!q.has(R.uuid)) M.push(R);
    }
    if (D.length === 0 && M.length === 0) continue;
    let X = (W, G) => (W.timestamp ?? "").localeCompare(G.timestamp ?? "");
    D.sort(X), M.sort(X);
    let P = O.get(j),
      Z = [...D, ...M];
    for (let W of Z) q.add(W.uuid);
    A += Z.length, Y.set(P.uuid, Z);
  }
  if (A === 0) return _;
  let w = [];
  for (let f of _) {
    w.push(f);
    let j = Y.get(f.uuid);
    if (j) w.push(...j);
  }
  return w;
}
/** Filter transcript entries for exported session history. */
function shouldIncludeTranscriptEntry(H: any, _: any) : any {
  if (H.type === "user" || H.type === "assistant") ;else if (H.type === "system" && _) ;else return !1;
  if (H.isMeta) return !1;
  if (H.isSidechain) return !1;
  if (H.teamName) return !1;
  return !0;
}
/** Cross-module shaper: convert transcript entry to public history row. */
function OMq(H: any, _: any) : any {
  return {
    type: H.type,
    uuid: H.uuid,
    session_id: H.sessionId,
    message: H.message,
    parent_tool_use_id: _ ?? null,
    timestamp: H.timestamp
  };
}
/** Cross-module helper: apply offset/limit to transcript rows. */
function TMq(H: any, _: any) : any {
  let q = _?.offset ?? 0;
  if (_?.limit !== void 0 && _.limit > 0) return H.slice(q, q + _.limit);
  if (q > 0) return H.slice(q);
  return H;
}
/** Cross-module formatter: parse raw transcript objects into public rows. */
function $P4(H: any, _: any) : any {
  let q = [];
  for (let K of H) {
    if (typeof K !== "object" || K === null) continue;
    let O = K,
      T = O.type;
    if ((T === "user" || T === "assistant" || T === "progress" || T === "system" || T === "attachment") && typeof O.uuid === "string") q.push(O);
  }
  return formatTranscriptEntries(q, _);
}
/** Format transcript entries after branch selection and filtering. */
function formatTranscriptEntries(H: any, _: any) : any {
  let q = selectActiveTranscriptBranch(H),
    K = _?.includeSystemMessages ?? !1,
    T = q.filter(z => shouldIncludeTranscriptEntry(z, K)).map(z => OMq(z));
  return TMq(T, _);
}
/** Cross-module loader: read a session transcript from disk. */
async function AP4(H: any, _: any) : any {
  if (!Cj(H)) return [];
  let q = await tjH(H, _?.dir);
  if (!q) return [];
  let K = await readTranscriptBuffer(q.filePath, q.fileSize);
  if (!K) return [];
  return formatTranscriptEntries(parseTranscriptEntries(K), _);
}
var zP4;
var zMq = L(() => {
  A6();
  Ij();
  H6();
  zP4 = require("fs/promises");
});
export {readTranscriptBuffer as Qdm,parseTranscriptEntries as Zdm,selectActiveTranscriptBranch as epm,getAssistantMessageId as NRo,isUserToolResultEntry as tpm,reattachOffBranchToolResults as npm,shouldIncludeTranscriptEntry as rpm,OMq as BRo,TMq as FRo,$P4 as QIl,formatTranscriptEntries as ZIl,AP4 as e0l,zP4 as XIl,zMq as URo};
