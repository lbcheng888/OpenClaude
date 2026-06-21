// @ts-nocheck
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {getTranscriptPathForSession as nV,isSyncedTranscriptEntry as Qc6,ja as iK} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {xE as qX,lo as zq} from "../tools/5190_userPromptCount.ts";
import {hP as Ok,ry as lw} from "./2772_withFileTypes.ts";
import {dbe as ejH,QT as Ij} from "../../vendor/m642.ts";
import {lYt as Ql_,ws as M9} from "../../vendor/m228.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {Pn as b6,bt as L_} from "../../vendor/m195.ts";
import {b as L} from "../../runtime.ts";
/* Backfills transcript events that the server is missing after compaction. */
/* Restored Claude Code 2.1.177 module: Persistence backfill after compaction..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
async function syncPersistenceEventsAfterCompaction(H: any, _: any, q: any): Promise<any> {
  let [K, O] = await Promise.all([_.readMain(), _.readSubagents()]),
    T = new Set();
  for (let A of K?.events ?? []) {
    let w = A.payload.uuid;
    if (typeof w === "string") T.add(w);
  }
  for (let A of O?.events ?? []) {
    let w = A.payload.uuid;
    if (typeof w === "string") T.add(w);
  }
  N(`[persistence-sync] Server has ${T.size} events since compaction`);
  // FIXME: unverified name: z
  let z = (A: any): any => {
      N(`[persistence-sync] Write failed: ${A}`);
    },
    $ = await readMissingTranscriptEvents(nV(v_()), T);
  for (let A of $) H("transcript", A, {
    ...(qX(A) && {
      isCompaction: !0,
      preservedEventIds: A.compactMetadata.preservedMessages?.uuids
    })
  }).catch(z);
  let Y = 0;
  for (let {
    agentId: A,
    path: w
  } of await getRecentSubagentTranscriptPaths(q)) {
    let f = await readMissingTranscriptEvents(w, T);
    for (let j of f) H("transcript", j, {
      ...(qX(j) && {
        isCompaction: !0,
        preservedEventIds: j.compactMetadata.preservedMessages?.uuids
      }),
      agentId: A
    }).catch(z);
    Y += f.length;
  }
  return N(`[persistence-sync] Uploaded ${$.length} main + ${Y} subagent entries`), {
    uploadedMain: $.length,
    uploadedSubagents: Y
  };
}
async function getRecentSubagentTranscriptPaths(H: any): Promise<any> {
  let q = (await Promise.all(H.map(async ($: any): Promise<any> => {
      let Y = Ok($);
      try {
        let A = await Cv4.stat(Y);
        return {
          agentId: $,
          path: Y,
          size: A.size,
          mtimeMs: A.mtimeMs
        };
      } catch {
        return null;
      }
    }))).filter(($: any): any => $ !== null),
    K = q.filter(($: any): any => $.size <= ejH),
    O = K.sort(($: any, Y: any): any => Y.mtimeMs - $.mtimeMs).slice(0, Ev4),
    T = q.length - K.length,
    z = K.length - O.length;
  if (T > 0 || z > 0) N(`[persistence-sync] Subagent backfill capped: ${T} over ${ejH}B, ${z} beyond ${Ev4}-agent limit (live stream unaffected)`);
  return O;
}
async function readMissingTranscriptEvents(H: any, _: any): Promise<any> {
  let q = [];
  try {
    for await (let K of Ql_(H)) {
      let O;
      try {
        O = d_(K);
      } catch {
        continue;
      }
      if (!Qc6(O)) continue;
      if (qX(O)) break;
      if (!_.has(O.uuid)) q.push(O);
    }
  } catch (K) {
    if (b6(K)) return [];
    throw K;
  }
  return q.reverse();
}
var Cv4,
  Ev4 = 20;
var Iv4 = L((): any => {
  w_();
  FH();
  L_();
  M9();
  zq();
  lw();
  iK();
  Ij();
  H6();
  Cv4 = require("fs/promises");
});

export {syncPersistenceEventsAfterCompaction as k3l,getRecentSubagentTranscriptPaths as BRm,readMissingTranscriptEvents as R3l,Cv4 as x3l,Ev4 as w3l,Iv4 as H3l};
