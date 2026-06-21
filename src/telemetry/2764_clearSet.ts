// @ts-nocheck
import {$f as pz,HF as hC} from "../core/2683_HF.ts";
import {Ws as I9,ef as oT} from "../../vendor/m2248.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_} from "../../vendor/m5.ts";
import {Ie as EH,ln as f6} from "./0594_feature_name.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {q2e as sbH,hnt as W__} from "../../vendor/m2756.ts";
import {Iz as Ar,e$i as GC7,oxe as NWH} from "../mcp/2763_pendingChanges.ts";
import {b as L} from "../../runtime.ts";
import {ty as cA,Ua as mK} from "../../vendor/m2245.ts";
import {ex as cW,zc as a1} from "../../vendor/m2582.ts";
import {VR as AZ,yu as E5} from "../../vendor/m2249.ts";
import {Vw as vP,$c as u1} from "../../vendor/m2695.ts";
import {ree as Ie,nb as BJ} from "../config/2668_ree.ts";
import {Btt as oH_,initModelResolutionModule as Ip} from "../../vendor/m2694.ts";
import {oA as H$,eN as dv} from "../config/2697_oA.ts";
import {Xt as a_} from "../config/0228_encoding.ts";
// @ts-nocheck
function countMessageTokens(msg) {
  if (!msg.content) return 0;
  if (typeof msg.content === "string") return pz(msg.content);
  return msg.content.reduce((acc, block) => {
    if (block.type === "text") return acc + pz(block.text);else if (block.type === "image" || block.type === "document") return acc + IMAGE_TOKEN_ESTIMATE;
    return acc;
  }, 0);
}
function collectClearableToolUseIds(messages) {
  let toolUseIds = [];
  for (let msg of messages) if (msg.type === "assistant" && Array.isArray(msg.message.content)) {
    for (let block of msg.message.content) if (block.type === "tool_use" && clearableToolNames.has(block.name)) toolUseIds.push(block.id);
  }
  return toolUseIds;
}
function extractWrittenFilePaths(messages, persistedIds) {
  let filePaths = [];
  for (let msg of messages) {
    if (msg.type !== "assistant" || !Array.isArray(msg.message.content)) continue;
    for (let block of msg.message.content) if (block.type === "tool_use" && block.name === I9 && persistedIds.has(block.id)) {
      let filePath = block.input.file_path;
      if (typeof filePath === "string") filePaths.push(filePath);
    }
  }
  return filePaths;
}
function isAlreadyCleared(content) {
  return typeof content === "string" && (content === CLEARED_PLACEHOLDER || content.startsWith(PERSISTED_PREFIX));
}
function computeClearCandidates(messages, _unused) {
  let q = collectClearableToolUseIds(messages),
    K = Math.max(1, _unused),
    O = new Set(q.slice(-K)),
    T = new Set(q.filter(Y => !O.has(Y))),
    z = 0,
    $ = [];
  if (T.size > 0) for (let Y of messages) {
    if (Y.type !== "user" || !Array.isArray(Y.message.content)) continue;
    for (let w of Y.message.content) if (w.type === "tool_result" && T.has(w.tool_use_id) && !isAlreadyCleared(w.content)) z += countMessageTokens(w), $.push(w);
  }
  return {
    clearSet: T,
    keepSet: O,
    tokensSaved: z,
    candidates: $
  };
}
function applyToolResultClearing(messages, clearSet, persistedUrlMap) {
  if (clearSet.size === 0) return [...messages];
  return messages.map(msg => {
    if (msg.type !== "user" || !Array.isArray(msg.message.content)) return msg;
    let mutated = false,
      newContent = msg.message.content.map(block => {
        if (block.type !== "tool_result" || !clearSet.has(block.tool_use_id)) return block;
        let replacementContent = Array.isArray(block.content) && block.content.some(b => b.type === "image" || b.type === "document") ? CLEARED_PLACEHOLDER : persistedUrlMap?.get(block.tool_use_id) ?? CLEARED_PLACEHOLDER;
        if (block.content === replacementContent) return block;
        return mutated = true, {
          ...block,
          content: replacementContent
        };
      });
    return mutated ? {
      ...msg,
      message: {
        ...msg.message,
        content: newContent
      }
    } : msg;
  });
}
async function runKeepRecentMicroCompact(messages, agentId, opts) {
  let {
    keepSet: keepSet,
    tokensSaved: tokensSaved,
    candidates: candidates
  } = computeClearCandidates(messages, opts.keepRecent);
  if (tokensSaved < MIN_TOKENS_TO_COMPACT) return null;
  let candidateIds = new Set(candidates.map(b => b.tool_use_id)),
    persistedUrlMap = new Map();
  for (let block of candidates) {
    let persistedUrl = block.content ? await opts.persist?.(block.content, block.tool_use_id) : null;
    persistedUrlMap.set(block.tool_use_id, persistedUrl ?? CLEARED_PLACEHOLDER);
  }
  let updatedMessages = applyToolResultClearing(messages, candidateIds, persistedUrlMap);
  if (c("tengu_time_based_microcompact", {
    toolsCleared: candidateIds.size,
    toolsKept: keepSet.size,
    keepRecent: opts.keepRecent,
    tokensSaved: tokensSaved,
    trigger: K_("context_hint")
  }), EH("compact_micro_keep_recent"), y(`[KEEP-RECENT MC] context_hint trigger, cleared ${candidateIds.size} tool results (~${tokensSaved} tokens), kept last ${keepSet.size}`), sbH(), Ar() && agentId) GC7(agentId);
  return {
    messages: updatedMessages,
    tokensSaved: tokensSaved,
    clearedIds: candidateIds,
    clearedContent: persistedUrlMap
  };
}
var CLEARED_PLACEHOLDER = "[Old tool result content cleared]",
  PERSISTED_PREFIX = "<persisted-output>",
  MIN_TOKENS_TO_COMPACT = 20000,
  IMAGE_TOKEN_ESTIMATE = 2000,
  clearableToolNames;
var t26 = L(() => {
  cA();
  oT();
  cW();
  AZ();
  vP();
  Ie();
  oH_();
  UH();
  H$();
  a_();
  f6();
  v_();
  NWH();
  hC();
  W__();
  clearableToolNames = new Set([I9, ...dv, u1, E5, Ip, BJ, mK, a1]);
});

export {countMessageTokens as qxd,collectClearableToolUseIds as jxd,extractWrittenFilePaths as r$i,isAlreadyCleared as Wxd,computeClearCandidates as H5r,applyToolResultClearing as DOt,runKeepRecentMicroCompact as o$i,CLEARED_PLACEHOLDER as yRn,PERSISTED_PREFIX as Fxd,MIN_TOKENS_TO_COMPACT as k5r,IMAGE_TOKEN_ESTIMATE as Uxd,clearableToolNames as $xd,t26 as TRn};
