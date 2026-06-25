// @ts-nocheck
import {KEe,Krn,WT,VEe,VT} from "../../vendor/m648.ts";
import {nt} from "../../vendor/m127.ts";
import {$g,Zbe,tn} from "../config/0230_encoding.ts";
import {b} from "../../runtime.ts";
import {dn} from "../config/0137_namespace.ts";
// @ts-nocheck
/**
 * Transcript loading, branch selection, compact-boundary repair, and API shaping.
 *
 * Claude Code 2.1.190 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Read transcript bytes, optionally skipping compacted pre-boundary content. */
async function readTranscriptBuffer(filePath: any, fileSize: any): any {
  try {
    if (fileSize > KEe && !nt(process.env.CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP)) return (await Krn(filePath, fileSize)).postBoundaryBuf;
    return await RFl.readFile(filePath);
  } catch {
    return null;
  }
}
/** Parse JSONL transcript entries from a buffer, yielding to the event loop periodically. */
async function parseTranscriptEntries(buffer: any): any {
  using _span = $g`parseTranscriptEntries(${buffer.length} bytes)`;
  let entries = [],
    newlineByte = 10,
    bufferLength = buffer.length,
    cursor = 0,
    nextYieldAt = CFl;
  while (cursor < bufferLength) {
    if (cursor >= nextYieldAt) await new Promise(resolve => setImmediate(resolve)), nextYieldAt = cursor + CFl;
    let lineEnd = buffer.indexOf(newlineByte, cursor);
    if (lineEnd === -1) lineEnd = bufferLength;
    let lineStart = cursor;
    while (lineStart < lineEnd && buffer[lineStart] <= 32) lineStart++;
    if (cursor = lineEnd + 1, lineStart >= lineEnd) continue;
    let lineText = buffer.toString("utf-8", lineStart, lineEnd);
    try {
      let parsed = Zbe(lineText),
        entryType = parsed.type;
      if ((entryType === "user" || entryType === "assistant" || entryType === "progress" || entryType === "system" || entryType === "attachment") && typeof parsed.uuid === "string") entries.push(parsed);
    } catch {}
  }
  return entries;
}
/** Select the latest visible conversation branch and repair compact-boundary parentage. */
async function selectActiveTranscriptBranch(rawEntries: any): any {
  let byUuid = new Map();
  for (let entry of rawEntries) byUuid.set(entry.uuid, entry);
  let yieldCounter = 0;
  for (let entry of byUuid.values()) {
    if (entry.type !== "system" || entry.subtype !== "compact_boundary") continue;
    let preservedMessages = entry.compactMetadata?.preservedMessages,
      preservedSegment = entry.compactMetadata?.preservedSegment;
    if (preservedMessages) {
      if (preservedMessages.uuids.length === 0 || preservedMessages.uuids.some(uuid => !byUuid.has(uuid))) continue;
      let chainParent = preservedMessages.anchorUuid;
      for (let uuid of preservedMessages.uuids) {
        let preserved = byUuid.get(uuid);
        byUuid.set(uuid, {
          ...preserved,
          parentUuid: chainParent
        }), chainParent = uuid;
      }
      let firstUuid = preservedMessages.uuids[0],
        lastUuid = preservedMessages.uuids.at(-1);
      for (let [uuid, candidate] of byUuid) {
        if (++yieldCounter % AFl === 0) await new Promise(resolve => setImmediate(resolve));
        if (candidate.parentUuid === preservedMessages.anchorUuid && uuid !== firstUuid) byUuid.set(uuid, {
          ...candidate,
          parentUuid: lastUuid
        });
      }
    } else if (preservedSegment) {
      let head = byUuid.get(preservedSegment.headUuid);
      if (head) byUuid.set(preservedSegment.headUuid, {
        ...head,
        parentUuid: preservedSegment.anchorUuid
      });
      for (let [uuid, candidate] of byUuid) {
        if (++yieldCounter % AFl === 0) await new Promise(resolve => setImmediate(resolve));
        if (candidate.parentUuid === preservedSegment.anchorUuid && uuid !== preservedSegment.headUuid) byUuid.set(uuid, {
          ...candidate,
          parentUuid: preservedSegment.tailUuid
        });
      }
    }
  }
  let orderByUuid = new Map();
  for (let index = 0; index < rawEntries.length; index++) orderByUuid.set(rawEntries[index].uuid, index);
  let referencedParents = new Set();
  for (let entry of byUuid.values()) if (entry.parentUuid) referencedParents.add(entry.parentUuid);
  let roots = [...byUuid.values()].filter(entry => !referencedParents.has(entry.uuid)),
    leafCandidates = [];
  for (let root of roots) {
    let walker = root,
      visited = new Set();
    while (walker) {
      if (visited.has(walker.uuid)) break;
      if (visited.add(walker.uuid), walker.type === "user" || walker.type === "assistant") {
        leafCandidates.push(walker);
        break;
      }
      walker = walker.parentUuid ? byUuid.get(walker.parentUuid) : void 0;
    }
  }
  if (leafCandidates.length === 0) return [];
  let visibleCandidates = leafCandidates.filter(entry => !entry.isSidechain && !entry.teamName && !entry.isMeta),
    pickLatest = candidates => candidates.reduce((best, current) => (orderByUuid.get(current.uuid) ?? -1) > (orderByUuid.get(best.uuid) ?? -1) ? current : best),
    tip = visibleCandidates.length > 0 ? pickLatest(visibleCandidates) : pickLatest(leafCandidates),
    branch = [],
    branchUuids = new Set(),
    node = byUuid.get(tip.uuid);
  while (node) {
    if (branchUuids.has(node.uuid)) break;
    branchUuids.add(node.uuid), branch.push(node), node = node.parentUuid ? byUuid.get(node.parentUuid) : void 0;
  }
  return branch.reverse(), await new Promise(resolve => setImmediate(resolve)), reattachOffBranchToolResults(byUuid, branch, branchUuids);
}
/** Read an assistant API message id from a transcript entry. */
function getAssistantMessageId(entry: any): any {
  if (entry.type !== "assistant") return;
  let message = entry.message;
  if (typeof message !== "object" || message === null) return;
  let messageId = message.id;
  return typeof messageId === "string" ? messageId : void 0;
}
/** Detect user entries that carry tool_result content. */
function isUserToolResultEntry(entry: any): any {
  if (entry.type !== "user" || !entry.parentUuid) return !1;
  let message = entry.message;
  if (typeof message !== "object" || message === null) return !1;
  let content = message.content;
  if (!Array.isArray(content)) return !1;
  return content.some(part => typeof part === "object" && part !== null && part.type === "tool_result");
}
/** Reattach sibling assistant/tool-result entries that share assistant ids. */
function reattachOffBranchToolResults(byUuid: any, branch: any, branchUuids: any): any {
  let branchAssistants = branch.filter(entry => entry.type === "assistant");
  if (branchAssistants.length === 0) return branch;
  let assistantById = new Map();
  for (let entry of branchAssistants) {
    let messageId = getAssistantMessageId(entry);
    if (messageId) assistantById.set(messageId, entry);
  }
  let entriesByAssistantId = new Map(),
    toolResultsByParent = new Map();
  for (let entry of byUuid.values()) {
    let messageId = getAssistantMessageId(entry);
    if (messageId) {
      let bucket = entriesByAssistantId.get(messageId);
      if (bucket) bucket.push(entry);else entriesByAssistantId.set(messageId, [entry]);
    } else if (isUserToolResultEntry(entry)) {
      let parentUuid = entry.parentUuid,
        bucket = toolResultsByParent.get(parentUuid);
      if (bucket) bucket.push(entry);else toolResultsByParent.set(parentUuid, [entry]);
    }
  }
  let seenAssistantIds = new Set(),
    appendByAssistantUuid = new Map(),
    appendCount = 0;
  for (let entry of branchAssistants) {
    let messageId = getAssistantMessageId(entry);
    if (!messageId || seenAssistantIds.has(messageId)) continue;
    seenAssistantIds.add(messageId);
    let sameIdEntries = entriesByAssistantId.get(messageId) ?? [entry],
      offBranchAssistants = sameIdEntries.filter(sibling => !branchUuids.has(sibling.uuid)),
      offBranchToolResults = [];
    for (let sibling of sameIdEntries) {
      let toolResults = toolResultsByParent.get(sibling.uuid);
      if (!toolResults) continue;
      for (let toolResult of toolResults) if (!branchUuids.has(toolResult.uuid)) offBranchToolResults.push(toolResult);
    }
    if (offBranchAssistants.length === 0 && offBranchToolResults.length === 0) continue;
    let byTimestamp = (a, b) => (a.timestamp ?? "").localeCompare(b.timestamp ?? "");
    offBranchAssistants.sort(byTimestamp), offBranchToolResults.sort(byTimestamp);
    let branchAssistant = assistantById.get(messageId),
      appended = [...offBranchAssistants, ...offBranchToolResults];
    for (let item of appended) branchUuids.add(item.uuid);
    appendCount += appended.length, appendByAssistantUuid.set(branchAssistant.uuid, appended);
  }
  if (appendCount === 0) return branch;
  let result = [];
  for (let entry of branch) {
    result.push(entry);
    let appended = appendByAssistantUuid.get(entry.uuid);
    if (appended) result.push(...appended);
  }
  return result;
}
/** Filter transcript entries for exported session history. */
function shouldIncludeTranscriptEntry(entry: any, includeSystem: any): any {
  if (entry.type === "user" || entry.type === "assistant") ;else if (entry.type === "system" && includeSystem) ;else return !1;
  if (entry.isMeta) return !1;
  if (entry.isSidechain) return !1;
  if (entry.teamName) return !1;
  return !0;
}
/** Cross-module shaper: convert transcript entry to public history row. */
function Kxo(entry: any, parentToolUseId: any): any {
  return {
    type: entry.type,
    uuid: entry.uuid,
    session_id: entry.sessionId,
    message: entry.message,
    parent_tool_use_id: parentToolUseId ?? null,
    timestamp: entry.timestamp
  };
}
/** Cross-module helper: apply offset/limit to transcript rows. */
function zxo(rows: any, options: any): any {
  let offset = options?.offset ?? 0;
  if (options?.limit !== void 0 && options.limit > 0) return rows.slice(offset, offset + options.limit);
  if (offset > 0) return rows.slice(offset);
  return rows;
}
/** Cross-module formatter: parse raw transcript objects into public rows. */
async function vFl(rawObjects: any, options: any): any {
  let entries = [];
  for (let obj of rawObjects) {
    if (typeof obj !== "object" || obj === null) continue;
    let entry = obj,
      entryType = entry.type;
    if ((entryType === "user" || entryType === "assistant" || entryType === "progress" || entryType === "system" || entryType === "attachment") && typeof entry.uuid === "string") entries.push(entry);
  }
  return wFl(entries, options);
}
/** Format transcript entries after branch selection and filtering. */
async function wFl(entries: any, options: any): any {
  let branch = await selectActiveTranscriptBranch(entries),
    includeSystem = options?.includeSystemMessages ?? !1,
    rows = branch.filter(entry => shouldIncludeTranscriptEntry(entry, includeSystem)).map(entry => Kxo(entry));
  return zxo(rows, options);
}
/** Cross-module loader: read a session transcript from disk. */
async function kFl(sessionId: any, options: any): any {
  if (!WT(sessionId)) return [];
  let location = await VEe(sessionId, options?.dir);
  if (!location) return [];
  let buffer = await readTranscriptBuffer(location.filePath, location.fileSize);
  if (!buffer) return [];
  return wFl(await parseTranscriptEntries(buffer), options);
}
var RFl,
  CFl = 524288,
  AFl = 8192;
var jxo = b(() => {
  dn();
  VT();
  tn();
  RFl = require("fs/promises");
});

export {readTranscriptBuffer as cbm,parseTranscriptEntries as ubm,selectActiveTranscriptBranch as dbm,getAssistantMessageId as Vxo,isUserToolResultEntry as pbm,reattachOffBranchToolResults as mbm,shouldIncludeTranscriptEntry as fbm,Kxo,zxo,vFl,wFl,kFl,RFl,CFl,AFl,jxo};
