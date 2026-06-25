// @ts-nocheck
import {ft,b,oo} from "../../runtime.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {PERMISSION_MODES as KP,jN} from "../../vendor/m721.ts";
import {lut,Pqe,Dqe,ST,Mn,fS,sut,po} from "../tools/5224_userPromptCount.ts";
import {Ne} from "../../vendor/m583.ts";
import {getSessionOverrides as eZ} from "../../vendor/m2215.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Sco} from "../config/3883_x0e.ts";
import {addInvokedSkill as OSt,getSessionId as It,getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {seedSentSkillNames as Hco,suppressNextSkillListing as kco,GA} from "../agent/4451_tryGetPDFReference.ts";
import {loadTranscriptFile as Qle,buildConversationChain as Z_e,removeExtraFields as aut,loadMessageLogs as Z2n,getSessionIdFromLog as fh,getLastSessionLog as Iqe,isLiteLog as ute,loadFullLog as eye,checkResumeConsistency as Ico,findDeferredToolMarkerInTranscript as xco,getCurrentSessionTitle as ph,cacheHookSessionTitle as xqe,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {rut,Rco} from "../../vendor/m3883.ts";
import {NHe,HI} from "../telemetry/3173_error.ts";
import {Pt,He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {e$n,Dw} from "../core/5176_encoding.ts";
import {FT,xS} from "../../vendor/m122.ts";
import {Y2n,Pq} from "../session/3880_trackSequence.ts";
import {gW,vot,jke} from "../../vendor/m2780.ts";
import {Mc,W$} from "../config/3882_entrypoint.ts";
import {J_e,i9t} from "../telemetry/3881_stdout.ts";
import {Sk,VT} from "../../vendor/m648.ts";
import {Ir} from "../../vendor/m584.ts";
import {parsePermissionRule as d$,fke} from "../../vendor/m2704.ts";
import {Kkn} from "../../vendor/m2705.ts";
var bFa = {};
ft(bFa, {
  restoreSkillStateFromMessages: () => restoreSkillStateFromMessages,
  removeInterruptedMessage: () => removeInterruptedMessage,
  loadMessagesFromJsonlPath: () => loadMessagesFromJsonlPath,
  loadConversationForResume: () => loadConversationForResume,
  getResumePrompt: () => getResumePrompt,
  findLiveNonInteractiveSession: () => findLiveNonInteractiveSession,
  dropRetractedMessages: () => dropRetractedMessages,
  deserializeMessagesWithInterruptDetection: () => deserializeMessagesWithInterruptDetection,
  deserializeMessages: () => deserializeMessages,
  dedupeSessionStartHookMessages: () => dedupeSessionStartHookMessages
});
/**
 * Normalize an attachment message so it carries a human-readable `displayPath`.
 * Drops ephemeral/UI-only attachment kinds (compaction reminders, pen-mode, etc.),
 * rewrites `new_file`/`new_directory` to their stable `file`/`directory` forms, and
 * back-fills `displayPath` (relative to cwd) when missing.
 */
function normalizeAttachmentDisplayPath(message: any): any {
  if (message.type !== "attachment") return message;
  let attachment = message.attachment;
  if (Kvp.has(attachment.type)) return null;
  if (attachment.type === "new_file") return {
    ...message,
    attachment: {
      ...attachment,
      type: "file",
      displayPath: out.relative(Lt(), attachment.filename)
    }
  };
  if (attachment.type === "new_directory") return {
    ...message,
    attachment: {
      ...attachment,
      type: "directory",
      displayPath: out.relative(Lt(), attachment.path)
    }
  };
  if (!("displayPath" in attachment)) {
    let sourcePath = "filename" in attachment ? attachment.filename : "path" in attachment ? attachment.path : "skillDir" in attachment ? attachment.skillDir : void 0;
    if (sourcePath) return {
      ...message,
      attachment: {
        ...attachment,
        displayPath: out.relative(Lt(), sourcePath)
      }
    };
  }
  return message;
}
/**
 * Strip non-string text blocks (interrupted-stream artifacts) from a user/assistant
 * message. Returns null when nothing was removed, otherwise a shallow clone whose
 * `content` keeps only valid blocks.
 */
function dropNonStringTextBlocks(message: any): any {
  if (message.type !== "assistant" && message.type !== "user") return null;
  let content = message.message.content;
  if (!Array.isArray(content)) return null;
  let filtered = content.filter((block: any) => block.type !== "text" || typeof block.text === "string");
  if (filtered.length === content.length) return null;
  return {
    ...message,
    message: {
      ...message.message,
      content: filtered
    }
  };
}
function getResumePrompt(): string {
  return process.env.CLAUDE_CODE_RESUME_PROMPT || "Continue from where you left off.";
}
function removeInterruptedMessage(messages: any[], target: any): void {
  let index = messages.findIndex((m: any) => m.uuid === target.uuid);
  if (index !== -1) messages.splice(index, 2);
}
function deserializeMessages(rawMessages: any[]): any[] {
  return deserializeMessagesWithInterruptDetection(rawMessages).messages;
}
function deserializeMessagesWithInterruptDetection(rawMessages: any[], deferredToolUseIds?: Set<any>, skipInterruptResume?: boolean): { messages: any[]; turnInterruptionState: any } {
  try {
    let retained = dropRetractedMessages(rawMessages),
      droppedCount = 0,
      cleaned = retained.map(normalizeAttachmentDisplayPath).filter((m: any) => m !== null).flatMap((m: any) => {
        let stripped = dropNonStringTextBlocks(m);
        if (stripped === null) return [m];
        droppedCount += 1;
        let strippedContent = stripped.message.content;
        if (Array.isArray(strippedContent) && strippedContent.length === 0) return [];
        return [stripped];
      });
    if (droppedCount > 0) A(`deserializeMessages: dropped non-string text block(s) from ${droppedCount} message(s) — interrupted-stream artifact`, {
      level: "warn"
    });
    let validPermissionModes = new Set(KP);
    for (let m of cleaned) if (m.type === "user" && m.permissionMode !== void 0 && !validPermissionModes.has(m.permissionMode)) m.permissionMode = void 0;
    let chained = lut(cleaned, deferredToolUseIds, Ne.CLAUDE_CODE_RESUME_INTERRUPTED_TURN ? {
        dropSiblingBlocks: !0
      } : void 0),
      normalized = Pqe(chained),
      messages = Dqe(normalized),
      interruptionState = deferredToolUseIds?.size || skipInterruptResume ? {
        kind: "none"
      } : classifyTurnInterruption(messages),
      turnInterruptionState;
    if (interruptionState.kind === "interrupted_turn") {
      let [resumeMessage] = ST([Mn({
        content: getResumePrompt(),
        isMeta: !0
      })]);
      messages.push(resumeMessage), turnInterruptionState = {
        kind: "interrupted_prompt",
        message: resumeMessage
      };
    } else turnInterruptionState = interruptionState;
    let lastNonSystemIndex = messages.findLastIndex((m: any) => m.type !== "system" && m.type !== "progress");
    if (!skipInterruptResume && lastNonSystemIndex !== -1 && messages[lastNonSystemIndex].type === "user") messages.splice(lastNonSystemIndex + 1, 0, fS({
      content: eZ
    }));
    return {
      messages,
      turnInterruptionState
    };
  } catch (err) {
    throw Ie(err), err;
  }
}
/**
 * Inspect the tail of a message chain to decide whether the last turn was
 * interrupted, completed, or left a dangling user prompt. Returns a discriminated
 * union: { kind: "none" | "interrupted_turn" | "interrupted_prompt"; message? }.
 */
function classifyTurnInterruption(messages: any[]): any {
  if (messages.length === 0) return {
    kind: "none"
  };
  let lastIndex = messages.findLastIndex((m: any) => m.type !== "system" && m.type !== "progress" && !(m.type === "assistant" && m.isApiErrorMessage && m.message.stop_reason !== "refusal")),
    last = lastIndex !== -1 ? messages[lastIndex] : void 0;
  if (!last) return {
    kind: "none"
  };
  if (last.type === "assistant") {
    if (last.isApiErrorMessage) W("tengu_refusal_turn_classified_complete", {});
    return {
      kind: "none"
    };
  }
  if (last.type === "user") {
    if (last.isMeta || last.isCompactSummary) return {
      kind: "none"
    };
    if (sut(last)) {
      if (isToolResultTurnComplete(last, messages, lastIndex)) return {
        kind: "none"
      };
      return {
        kind: "interrupted_turn"
      };
    }
    return {
      kind: "interrupted_prompt",
      message: last
    };
  }
  if (last.type === "attachment") {
    for (let i = lastIndex - 1; i >= 0; i--) {
      let prior = messages[i];
      if (prior.type === "system" || prior.type === "progress" || prior.type === "attachment" || prior.type === "assistant" && prior.isApiErrorMessage && prior.message.stop_reason !== "refusal") continue;
      if (prior.type === "assistant" && prior.isApiErrorMessage && prior.message.stop_reason === "refusal") return W("tengu_refusal_turn_classified_complete", {}), {
        kind: "none"
      };
      if (prior.type === "user" && sut(prior) && isToolResultTurnComplete(prior, messages, i)) return {
        kind: "none"
      };
      break;
    }
    return {
      kind: "interrupted_turn"
    };
  }
  return {
    kind: "none"
  };
}
/**
 * Given a user message whose first content block is a tool_result, walk backwards to
 * find the matching tool_use and decide whether that tool's turn counts as complete
 * (brief/legacy-brief/send-user-file tools, or a terminal MCP tool with no error).
 */
function isToolResultTurnComplete(userMessage: any, messages: any[], index: number): boolean {
  let content = userMessage.message.content;
  if (!Array.isArray(content)) return !1;
  let firstBlock = content[0];
  if (firstBlock?.type !== "tool_result") return !1;
  let toolUseId = firstBlock.tool_use_id;
  for (let i = index - 1; i >= 0; i--) {
    let prior = messages[i];
    if (prior.type !== "assistant") continue;
    for (let block of prior.message.content) if (block.type === "tool_use" && block.id === toolUseId) return block.name === Wvp || block.name === Gvp || block.name === Vvp || Sco().has(block.name) && !firstBlock.is_error;
  }
  return !1;
}
function restoreSkillStateFromMessages(messages: any[]): void {
  for (let message of messages) {
    if (message.type !== "attachment") continue;
    if (message.attachment.type === "invoked_skills") {
      for (let skill of message.attachment.skills) if (skill.name && skill.path && skill.content) OSt(skill.name, skill.path, skill.content, null);
    }
    if (message.attachment.type === "skill_listing") if (message.attachment.names) Hco(message.attachment.names);else kco();
  }
}
async function loadMessagesFromJsonlPath(jsonlPath: string): Promise<{ messages: any[]; sessionId: any }> {
  let {
      messages,
      leafUuids
    } = await Qle(jsonlPath),
    latestLeaf = null,
    latestTime = 0;
  for (let entry of messages.values()) {
    if (entry.isSidechain || !leafUuids.has(entry.uuid)) continue;
    let entryTime = new Date(entry.timestamp).getTime();
    if (entryTime > latestTime) latestTime = entryTime, latestLeaf = entry;
  }
  if (!latestLeaf) return {
    messages: [],
    sessionId: void 0
  };
  let chain = Z_e(messages, latestLeaf);
  return {
    messages: aut(chain),
    sessionId: latestLeaf.sessionId
  };
}
async function findLiveNonInteractiveSession(sessionId: any): Promise<{ kind: any } | null> {
  let sessions = await Promise.resolve().then(() => (rut(), Rco)).then((mod: any) => mod.listAllLiveSessions()).catch(() => []);
  for (let session of sessions) if (session.sessionId === sessionId && session.kind && session.kind !== "interactive") return {
    kind: session.kind
  };
  return null;
}
function dedupeSessionStartHookMessages(existingMessages: any[], newMessages: any[]): any[] {
  if (newMessages.length === 0) return [];
  let seenKeys = new Set();
  for (let message of existingMessages) for (let key of sessionStartHookKeys(message)) seenKeys.add(key);
  if (seenKeys.size === 0) return [...newMessages];
  let changed = !1,
    result = [];
  for (let message of newMessages) {
    let keys = sessionStartHookKeys(message);
    if (keys.length === 0 || message.type !== "attachment") {
      result.push(message);
      continue;
    }
    let attachment = message.attachment;
    if (attachment.type === "hook_additional_context" && attachment.content.length > 1) {
      let kept = attachment.content.filter((entry: any) => !seenKeys.has(normalizeHookOutputKey(entry)));
      if (kept.length === 0) continue;
      changed = !0, result.push(kept.length === attachment.content.length ? message : {
        ...message,
        attachment: {
          ...attachment,
          content: kept
        }
      });
      continue;
    }
    if (seenKeys.has(keys[0])) continue;
    changed = !0, result.push(message);
  }
  if (!changed) return [];
  return result;
}
function sessionStartHookKeys(message: any): any[] {
  if (message.type !== "attachment") return [];
  let attachment = message.attachment;
  if (!("hookEvent" in attachment) || attachment.hookEvent !== "SessionStart") return [];
  if (attachment.type === "hook_additional_context") return attachment.content.map(normalizeHookOutputKey);
  if (attachment.type === "hook_success" && attachment.content !== "") return [normalizeHookOutputKey(attachment.content)];
  return [];
}
function normalizeHookOutputKey(text: string): string {
  if (!text.startsWith(NHe)) return text;
  return text.replace(/(Full output saved to: ).*$/m, "$1<persisted>");
}
function dropRetractedMessages(messages: any[]): any[] {
  let retractedUuids = new Set(messages.flatMap((m: any) => m.type === "system" && m.subtype === "model_refusal_fallback" && m.retractedMessageUuids !== void 0 ? m.retractedMessageUuids.map((u: any) => u.slice(0, TFa)) : []));
  if (retractedUuids.size === 0) return messages;
  let retained = messages.filter((m: any) => m.type === "system" || !retractedUuids.has(m.uuid.slice(0, TFa)));
  if (retained.length !== messages.length) W("tengu_resume_retracted_dropped", {
    dropped: messages.length - retained.length,
    chain_length: messages.length
  });
  return retained;
}
async function loadConversationForResume(sessionRef: any, jsonlPath: any, options: any): Promise<any> {
  try {
    let session = null,
      messages = null,
      sessionId;
    if (sessionRef === void 0) {
      let logsPromise = Z2n(),
        liveSessionIds = new Set();
      try {
        let {
            listAllLiveSessions
          } = await Promise.resolve().then(() => (rut(), Rco)),
          liveSessions = await listAllLiveSessions();
        liveSessionIds = new Set(liveSessions.flatMap((s: any) => s.kind && s.kind !== "interactive" && s.sessionId ? [s.sessionId] : []));
      } catch {}
      session = (await logsPromise).find((log: any) => {
        if (log.sessionKind) return !1;
        let logSessionId = fh(log);
        return !logSessionId || !liveSessionIds.has(logSessionId);
      }) ?? null;
    } else if (jsonlPath && typeof sessionRef === "string") session = await Iqe(sessionRef, jsonlPath), sessionId = session?.messages.at(-1)?.sessionId ?? sessionRef;else if (typeof sessionRef === "string") session = (await Iqe(sessionRef)) ?? (await loadSessionFromWorktree(sessionRef)), sessionId = sessionRef;else session = sessionRef;
    if (!session && !messages) return Pt("session_resume", "not_found"), null;
    if (session) {
      if (ute(session)) session = await eye(session);
      if (!sessionId) sessionId = fh(session);
      if (sessionId) await e$n(session, FT(sessionId));
      Y2n(session, !options.forkSession && sessionId ? FT(sessionId) : void 0), messages = session.messages, Ico(messages);
    }
    messages = dropRetractedMessages(messages), restoreSkillStateFromMessages(messages);
    let fullPath = session?.fullPath ?? jsonlPath,
      deferredToolUse = fullPath ? (await xco(fullPath)) ?? void 0 : void 0,
      deserialized = deserializeMessagesWithInterruptDetection(messages, deferredToolUse ? new Set([deferredToolUse.toolUseID]) : void 0, options.replyOnResume);
    messages = deserialized.messages;
    let hooksStart = performance.now(),
      hookMessages = await gW("resume", {
        sessionId,
        sessionTitle: ph(It()) ?? session?.customTitle
      });
    Mc("hooks_init_ms", performance.now() - hooksStart, hooksStart);
    let pendingTitle = vot();
    if (pendingTitle) xqe(pendingTitle);
    return messages.push(...dedupeSessionStartHookMessages(messages, hookMessages)), He("session_resume"), {
      messages,
      turnInterruptionState: deserialized.turnInterruptionState,
      deferredToolUse,
      fileHistorySnapshots: session?.fileHistorySnapshots,
      attributionSnapshots: session?.attributionSnapshots,
      contentReplacements: session?.contentReplacements,
      contextCollapseCommits: session?.contextCollapseCommits,
      contextCollapseSnapshot: session?.contextCollapseSnapshot,
      sessionId,
      agentName: session?.agentName,
      agentColor: session?.agentColor,
      agentSetting: session?.agentSetting,
      customTitle: session?.customTitle,
      aiTitle: session?.aiTitle,
      tag: session?.tag,
      mode: session?.mode,
      permissionMode: session?.permissionMode,
      isolationLatch: session?.isolationLatch,
      worktreeSession: session?.worktreeSession,
      prNumber: session?.prNumber,
      prUrl: session?.prUrl,
      prRepository: session?.prRepository,
      bridgeSessionId: session?.bridgeSessionId,
      bridgeLastSeq: session?.bridgeLastSeq,
      bridgeDialogKinds: session?.bridgeDialogKinds,
      fullPath: session?.fullPath
    };
  } catch (err) {
    throw xe("session_resume", "load_failed"), Ie(err), err;
  }
}
async function loadSessionFromWorktree(sessionId: string): Promise<any> {
  for (let root of await J_e(gr())) for (let dir of await Sk(root)) {
    let session = await Iqe(sessionId, out.join(dir, `${sessionId}.jsonl`));
    if (session) return W("tengu_resume_worktree_fallback", {}), session;
  }
  return null;
}
var out,
  Wvp,
  Gvp,
  Vvp,
  Kvp,
  TFa = 24;
var Xle = b(() => {
  kt();
  Po();
  lt();
  mn();
  xS();
  jN();
  GA();
  qe();
  Ir();
  Pq();
  i9t();
  vn();
  po();
  Dw();
  jke();
  _a();
  VT();
  W$();
  HI();
  out = require("path"), Wvp = (d$(), oo(fke)).BRIEF_TOOL_NAME, Gvp = (d$(), oo(fke)).LEGACY_BRIEF_TOOL_NAME, Vvp = oo(Kkn).SEND_USER_FILE_TOOL_NAME, Kvp = new Set(["compaction_reminder", "companion_intro", "echo_activities", "pen_mode_enter", "pen_mode_exit", "verify_plan_reminder"]);
});
export {bFa,normalizeAttachmentDisplayPath as zvp,dropNonStringTextBlocks as jvp,getResumePrompt,removeInterruptedMessage,deserializeMessages,deserializeMessagesWithInterruptDetection,classifyTurnInterruption as Yvp,isToolResultTurnComplete as _Fa,restoreSkillStateFromMessages,loadMessagesFromJsonlPath,findLiveNonInteractiveSession,dedupeSessionStartHookMessages,sessionStartHookKeys as yFa,normalizeHookOutputKey as vco,dropRetractedMessages,loadConversationForResume,loadSessionFromWorktree as Xvp,out,Wvp,Gvp,Vvp,Kvp,TFa,Xle};
