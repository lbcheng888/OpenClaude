// @ts-nocheck
import {gL} from "../../vendor/m2695.ts";
import {mst,qJr} from "../../vendor/m3316.ts";
import {pO,MM} from "../../vendor/m126.ts";
import {switchSession,getSessionId,setMainThreadAgentType,getMainLoopModelOverride,setMainLoopModelOverride,latchRefusalFallbackModel,getInitialMainLoopModel,setOriginalCwd,lt} from "../session/0131_sent.ts";
import {qT,zE} from "../../vendor/m125.ts";
import {zBn,_6} from "../session/3862_trackSequence.ts";
import {lLo,aLo} from "../telemetry/5417_restoreGoalFromTranscript.ts";
import {ro,b} from "../../runtime.ts";
import {TE,Nk} from "../agent/3316_id.ts";
import {KPe,pXn} from "../../vendor/m5415.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {parseUserSpecifiedModel,isExemptDefaultResolvingPick,normalizeModelStringForAPI,getCanonicalName,getUserSpecifiedModelSetting,isModeDependentModelSetting,Mo} from "./1453_swapShrinksContextWindow.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {t1,eC} from "../../vendor/m717.ts";
import {Gte,xce} from "../../vendor/m4087.ts";
import {ly,f$n} from "./5185_verifyAutoModeGateAccess.ts";
import {usesFirstPartyModelIds,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,fromEnumOpt,st} from "../../vendor/m5.ts";
import {dfe,NH} from "../config/2024_NH.ts";
import {hOs,z2} from "../../vendor/m1280.ts";
import {WR} from "../../vendor/m2207.ts";
import {nHl,R8t} from "../config/5029_isDeprecated.ts";
import {T_,N8,jS} from "../api/2023_used.ts";
import {getAgentDefinitionsWithOverrides,getActiveAgentsFromList,scrubPathsConfig} from "./4454_toAgentInfos.ts";
import {getCurrentWorktreeSession} from "../config/3332_flushAnalyticsSinks.ts";
import {saveWorktreeState,resetSessionFilePointer,recordContentReplacement,restoreSessionMetadata,adoptResumedSessionFile,saveMode,ja} from "./5143_writeRemoteAgentMetadata.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {x_,initXL} from "../agent/3279_code.ts";
import {clearMemoryFileCaches,zw} from "../config/2717_stripHtmlComments.ts";
import {a0e,y3t} from "../../vendor/m4257.ts";
import {xT,yx} from "../core/5144_encoding.ts";
import {reanchorGitFileWatcher,vO} from "../../vendor/m691.ts";
import {getIsGit,Ba} from "../../vendor/m693.ts";
import {ES,EU} from "../../vendor/m4256.ts";
import {restoreWorktreeSession,hI} from "../session/5172_worktreeBranchName.ts";
import {nu,lo} from "../tools/5190_userPromptCount.ts";
import {renameRecordingForSession,wGt} from "../../vendor/m5414.ts";
import {M2n,H9} from "../telemetry/4045_contextWindow.ts";
import {Y7,hp} from "../session/1460_promise.ts";
import {Q$,_q} from "../telemetry/2781_consumer.ts";
import {removeInterruptedMessage,tce} from "./3867_restoreSkillStateFromMessages.ts";
import {vW} from "../config/3301_fileStates.ts";
import {sn} from "../config/0047_namespace.ts";
/**
 * Extract the current todos list from the last assistant message that contains a tool_use
 * referencing the gL tool (TodoWrite/task list tool).
 */
function OPm(messages: any[]): any[] {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type !== "assistant") continue;
    let toolUseBlock = msg.message.content.find((contentItem: any) => contentItem.type === "tool_use" && contentItem.name === gL);
    if (!toolUseBlock || toolUseBlock.type !== "tool_use") continue;
    let toolInput = toolUseBlock.input;
    if (toolInput === null || typeof toolInput !== "object") return [];
    let parseResult = mst().safeParse(toolInput.todos);
    return parseResult.success ? parseResult.data : [];
  }
  return [];
}

/**
 * Attempt to resume a session by switching to the session file identified in flags.
 * Returns false if this is not a plain resume (fork or flag-based session id present).
 */
function bWl(flags: any): boolean {
  if (typeof flags.resume !== "string" || flags.forkSession || flags.hasSessionIdFlag) return !1;
  let sessionPath = pO(flags.resume);
  if (!sessionPath) return !1;
  return switchSession(qT(sessionPath), "resume"), !0;
}

/**
 * Restore file history snapshots and goal-from-transcript state, and todos for the current session.
 */
function RGt(sessionData: any, updateState: any): void {
  if (sessionData.fileHistorySnapshots && sessionData.fileHistorySnapshots.length > 0) zBn(sessionData.fileHistorySnapshots, (snapshot: any) => {
    updateState((prevState: any) => ({
      ...prevState,
      fileHistory: snapshot
    }));
  });
  if ((lLo(), ro(aLo)).restoreGoalFromTranscript(sessionData.messages, updateState), !TE() && sessionData.messages && sessionData.messages.length > 0) {
    let todos = OPm(sessionData.messages);
    if (todos.length > 0) {
      let sessionId = getSessionId();
      updateState((prevState: any) => ({
        ...prevState,
        todos: {
          ...prevState.todos,
          [sessionId]: todos
        }
      }));
    }
  }
}

/** No-op placeholder for attribution extraction (intentionally empty). */
function LPm(sessionData: any): void {
  return;
}

/**
 * Build a standalone agent context object from name and color settings.
 * Returns undefined when both are absent; treats "default" color as undefined.
 */
function xGt(agentName: string | undefined, agentColor: string | undefined): any {
  if (!agentName && !agentColor) return;
  return {
    name: agentName ?? "",
    color: agentColor === "default" ? void 0 : agentColor
  };
}

/**
 * Resolve which agent definition and agent type to activate for the resumed session.
 * If the saved agent type is no longer available, falls back to undefined (default behavior).
 */
function sTe(savedAgentType: any, mainThreadAgentDefinition: any, agentDefinitions: any): any {
  if (mainThreadAgentDefinition) return {
    agentDefinition: mainThreadAgentDefinition,
    agentType: void 0
  };
  if (!savedAgentType) return setMainThreadAgentType(void 0), KPe(void 0), {
    agentDefinition: void 0,
    agentType: void 0
  };
  let matchedAgent = agentDefinitions.activeAgents.find((agentEntry: any) => agentEntry.agentType === savedAgentType);
  if (!matchedAgent) return logForDebugging(`Resumed session had agent "${savedAgentType}" but it is no longer available. Using default behavior.`), setMainThreadAgentType(void 0), KPe(void 0), {
    agentDefinition: void 0,
    agentType: void 0
  };
  if (setMainThreadAgentType(matchedAgent.agentType), KPe(matchedAgent), !getMainLoopModelOverride() && matchedAgent.model && matchedAgent.model !== "inherit") {
    let parsedModel = parseUserSpecifiedModel(matchedAgent.model);
    if (isExemptDefaultResolvingPick(parsedModel) || isModelAllowed(parsedModel)) setMainLoopModelOverride(parsedModel);else logForDebugging(`Agent model "${matchedAgent.model}" is not in the availableModels allowlist; keeping the session model`, {
      level: "warn"
    });
  }
  return {
    agentDefinition: matchedAgent,
    agentType: matchedAgent.agentType
  };
}

/**
 * Determine which permission mode to restore, if any, for the resumed session.
 * Returns undefined when the mode should not be changed.
 */
async function MPm(savedMode: any, permissionModeCliSet: any): Promise<any> {
  if (permissionModeCliSet || !savedMode) return;
  let resolvedMode = t1(savedMode);
  if (resolvedMode === "default" && savedMode !== "default") return;
  if (resolvedMode === "plan" || resolvedMode === "bypassPermissions") return;
  if (resolvedMode === "default") {
    {
      let {
        isAutoModeFromFallback: checkFallback
      } = await Promise.resolve().then(() => (Gte(), xce));
      if (checkFallback()) return "default";
    }
    return;
  }
  if (resolvedMode === "auto") {
    let {
      isAutoModeGateEnabled: checkGate
    } = await Promise.resolve().then(() => (ly(), f$n));
    if (!checkGate()) return;
  }
  return resolvedMode;
}

/** Returns true when a custom model is already set (env, override, or non-first-party). */
function cLo(): boolean {
  return Boolean(getMainLoopModelOverride() !== void 0 || process.env.ANTHROPIC_MODEL || !usesFirstPartyModelIds());
}

/**
 * Attempt to restore the session's saved model string, logging an event and warning message
 * when restoration is skipped or declined. Returns the model string on success.
 */
function p5e(messages: any[], fallbackModel: any, warnCallback: any, logWrapper: any = (fn: any) => fn()): any {
  if (cLo()) return;
  let checkResult = CWl(messages, fallbackModel);
  if (checkResult.kind === "none") return;
  if (checkResult.kind === "mode_dependent_setting") {
    logWrapper(() => logEvent("tengu_resume_model_restore", {
      outcome: fromEnum("skipped_mode_dependent_setting"),
      is_eap: !1
    }));
    return;
  }
  if (checkResult.kind === "declined") logWrapper(() => logEvent("tengu_resume_model_restore", {
    outcome: fromEnum("declined"),
    decline_reason: fromEnumOpt(checkResult.reason),
    is_eap: dfe(checkResult.model)
  }));
  if (checkResult.kind === "declined") {
    let displayFallback = fallbackModel && normalizeModelStringForAPI(fallbackModel) || "the default model";
    warnCallback?.(`Session model ${checkResult.model} could not be restored (${NPm[checkResult.reason]}) — using ${displayFallback} instead.`);
    return;
  }
  return checkResult.model;
}

/**
 * Like p5e but returns the model string directly without logging/warning side effects.
 */
function EWl(messages: any[], fallbackModel: any): any {
  let checkResult = CWl(messages, fallbackModel);
  return checkResult.kind === "ok" ? checkResult.model : void 0;
}

/**
 * Check if a mode-dependent setting (opusplan/haiku) is compatible with the given canonical model name.
 */
function BPm(modeSetting: string, canonicalModelName: string): boolean {
  if (modeSetting === "opusplan") return canonicalModelName.includes("opus") || canonicalModelName.includes("sonnet");
  if (modeSetting === "haiku") return canonicalModelName.includes("haiku") || canonicalModelName.includes("sonnet");
  return !1;
}

/**
 * Walk the message history backwards to find the most recent assistant model and determine
 * whether it can be restored (ok), was declined for a known reason, is mode-dependent, or
 * no saved model was found (none).
 */
function CWl(messages: any[], fallbackModel: any): any {
  let allowedCanonicalNames = new Set(hOs.map(getCanonicalName));
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type !== "assistant" || msg.isMeta || msg.message.model === WR) continue;
    let savedModel = msg.message.model;
    let userModelSetting = getUserSpecifiedModelSetting();
    if (isModeDependentModelSetting(userModelSetting) && !dfe(savedModel) && BPm(userModelSetting, getCanonicalName(savedModel))) return {
      kind: "mode_dependent_setting"
    };
    let declineReason = !(allowedCanonicalNames.has(getCanonicalName(savedModel)) || dfe(savedModel)) ? "unknown_family" : !isExemptDefaultResolvingPick(savedModel) && !isModelAllowed(savedModel) ? "not_allowed" : nHl(savedModel) ? "retired" : void 0;
    if (declineReason) return {
      kind: "declined",
      model: savedModel,
      reason: declineReason
    };
    if (fallbackModel && T_(fallbackModel) && N8(savedModel) && getCanonicalName(parseUserSpecifiedModel(normalizeModelStringForAPI(fallbackModel))) === getCanonicalName(savedModel)) return {
      kind: "ok",
      model: savedModel + "[1m]"
    };
    return {
      kind: "ok",
      model: savedModel
    };
  }
  return {
    kind: "none"
  };
}

/**
 * Check if the messages contain a model_refusal_fallback system message that matches
 * the provided fallback model, indicating a prior refusal for this model.
 */
function FPm(messages: any[], fallbackModel: any): boolean {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") {
      let normalizedFallback = normalizeModelStringForAPI(msg.fallbackModel);
      let normalizedTarget = normalizeModelStringForAPI(fallbackModel);
      return normalizedFallback === normalizedTarget || getCanonicalName(normalizedFallback) === getCanonicalName(normalizedTarget);
    }
  }
  return !1;
}

/**
 * Mark the most recent model_refusal_fallback system message as neutralized by fork.
 */
function kGt(messages: any[]): void {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") msg.neutralizedByFork = !0;
  }
}

/**
 * Return the fallback model from the most recent model_refusal_fallback message if it was
 * neutralized by a fork; otherwise returns undefined.
 */
function UPm(messages: any[]): any {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") return msg.neutralizedByFork === !0 ? {
      fallbackModel: msg.fallbackModel
    } : void 0;
  }
  return;
}

/** Log a model restore telemetry event with the given outcome and model. */
function mXn(outcome: string, model: any): void {
  logEvent("tengu_resume_model_restore", {
    outcome: fromEnum(outcome),
    is_eap: dfe(model)
  });
}

/**
 * Restore the main loop model override, handling refusal-fallback latching logic.
 * If the model was previously refused (and not neutralized), skips restore and re-latches.
 */
function m5e(messages: any[], restoredModel: any, isFork: any): any {
  if (!FPm(messages, restoredModel)) return setMainLoopModelOverride(restoredModel), mXn("restored", restoredModel), restoredModel;
  if (isFork) {
    logEvent("tengu_refusal_fallback_resume_latch", {
      action: fromEnum("fork_skip_restore")
    }), mXn("skipped_fork_fallback", restoredModel);
    return;
  }
  let neutralized = UPm(messages);
  if (neutralized && normalizeModelStringForAPI(neutralized.fallbackModel) === normalizeModelStringForAPI(restoredModel)) {
    logEvent("tengu_refusal_fallback_resume_latch", {
      action: fromEnum("fork_neutralized_skip")
    }), mXn("skipped_fork_neutralized", restoredModel);
    return;
  }
  return setMainLoopModelOverride(restoredModel), latchRefusalFallbackModel({
    fallbackModel: restoredModel,
    previousOverride: void 0,
    previousAppStateModel: getInitialMainLoopModel() ?? null,
    previousModelForSession: null
  }), mXn("restored", restoredModel), logEvent("tengu_refusal_fallback_resume_latch", {
    action: fromEnum("relatch")
  }), restoredModel;
}

/**
 * Build the merged agent definitions for the resumed session, combining overrides with
 * CLI-supplied agents. Clears the cache before fetching.
 */
async function $Pm(hasSessionMode: boolean, currentCwd: any, cliAgents: any[], agentDefinitions: any): Promise<any> {
  if (!hasSessionMode) return agentDefinitions;
  getAgentDefinitionsWithOverrides.cache.clear?.();
  let overrides = await getAgentDefinitionsWithOverrides(currentCwd);
  let mergedAgents = [...overrides.allAgents, ...cliAgents];
  return {
    ...overrides,
    allAgents: mergedAgents,
    activeAgents: getActiveAgentsFromList(mergedAgents)
  };
}

/**
 * Restore the working directory for the resumed session. Handles worktree sessions,
 * cwd changes, and refreshes all cwd-dependent caches (git, memory files, XL index, etc).
 */
function HGt(worktreeSession: any, targetCwd: any): void {
  let currentWorktree = getCurrentWorktreeSession();
  if (currentWorktree) {
    saveWorktreeState(currentWorktree);
    return;
  }
  if (!worktreeSession) {
    if (worktreeSession === null) return;
    if (!targetCwd || Pt() === targetCwd) return;
    try {
      process.chdir(targetCwd);
    } catch {
      return;
    }
    x_(targetCwd), setOriginalCwd(Pt()), clearMemoryFileCaches(), a0e(), xT.cache.clear?.(), reanchorGitFileWatcher(), getIsGit.cache.clear?.(), ES()?.refreshGitBranch?.();
    return;
  }
  try {
    process.chdir(worktreeSession.worktreePath);
  } catch {
    saveWorktreeState(null);
    return;
  }
  x_(worktreeSession.worktreePath), setOriginalCwd(Pt()), restoreWorktreeSession(worktreeSession), clearMemoryFileCaches(), a0e(), xT.cache.clear?.(), reanchorGitFileWatcher(), ES()?.refreshGitBranch?.();
}

/**
 * Tear down a worktree session: resets to the original cwd and clears all caches.
 * No-op if no worktree session is active or if the path already matches.
 */
function vWl(worktreePath: any): void {
  let currentWorktree = getCurrentWorktreeSession();
  if (!currentWorktree) return;
  if (restoreWorktreeSession(null), clearMemoryFileCaches(), a0e(), xT.cache.clear?.(), currentWorktree.worktreePath === worktreePath) return;
  try {
    process.chdir(currentWorktree.originalCwd);
  } catch {
    return;
  }
  x_(currentWorktree.originalCwd), setOriginalCwd(Pt()), reanchorGitFileWatcher(), ES()?.refreshGitBranch?.();
}

/**
 * Full session restore: switches session file, restores metadata, cwd, model, agents,
 * permission mode, todos, and computes the merged initial state for the resumed session.
 */
async function fXn(sessionData: any, resumeFlags: any, context: any): Promise<any> {
  let sessionModeMessage: any;
  if (sessionModeMessage = context.modeApi?.matchSessionMode(sessionData.mode), sessionModeMessage) sessionData.messages.push(nu(sessionModeMessage, "warning"));
  if (!resumeFlags.forkSession) {
    let sessionIdToUse = resumeFlags.sessionIdOverride ?? sessionData.sessionId;
    if (sessionIdToUse) switchSession(qT(sessionIdToUse), "resume", resumeFlags.transcriptPath ? SWl.dirname(resumeFlags.transcriptPath) : null), await renameRecordingForSession(), await resetSessionFilePointer(), M2n(sessionIdToUse);
  } else if (sessionData.contentReplacements?.length) await recordContentReplacement(sessionData.contentReplacements);
  if (restoreSessionMetadata(resumeFlags.forkSession ? {
    ...sessionData,
    worktreeSession: void 0,
    bridgeSessionId: void 0,
    bridgeLastSeq: void 0,
    bridgeDialogKinds: void 0
  } : sessionData), !resumeFlags.forkSession) HGt(sessionData.worktreeSession), adoptResumedSessionFile();
  let {
    agentDefinition: restoredAgentDef,
    agentType: restoredAgentType
  } = sTe(sessionData.agentSetting, context.mainThreadAgentDefinition, context.agentDefinitions);
  let restoredPermissionMode = await MPm(sessionData.permissionMode, context.permissionModeCliSet);
  if (resumeFlags.forkSession) kGt(sessionData.messages);
  let restoredModelCandidate = p5e(sessionData.messages, context.initialState.mainLoopModel, (warningText: any) => sessionData.messages.push(nu(warningText, "warning")));
  let restoredModel = restoredModelCandidate ? m5e(sessionData.messages, restoredModelCandidate, resumeFlags.forkSession) : void 0;
  let restoredToolPermissionContext: any;
  if (restoredPermissionMode) {
    let {
      transitionPermissionMode: transitionFn
    } = await Promise.resolve().then(() => (ly(), f$n));
    let currentToolCtx = context.initialState.toolPermissionContext;
    try {
      restoredToolPermissionContext = {
        ...transitionFn(currentToolCtx.mode, restoredPermissionMode, currentToolCtx),
        mode: restoredPermissionMode
      };
    } catch (transitionErr: any) {
      logForDebugging(`[sessionRestore] transitionPermissionMode rejected restored mode '${restoredPermissionMode}': ${transitionErr}`);
    }
  }
  saveMode(context.modeApi?.isCoordinatorMode() ? "coordinator" : "normal");
  let attributionData = resumeFlags.includeAttribution ? LPm(sessionData) : void 0;
  let standaloneCtxBase = xGt(sessionData.agentName, sessionData.agentColor);
  let standaloneAgentContext = context.initialState.standaloneAgentContext ? {
    ...standaloneCtxBase,
    ...context.initialState.standaloneAgentContext
  } : standaloneCtxBase;
  Y7(standaloneAgentContext?.name);
  let mergedAgentDefinitions = await $Pm(!!sessionModeMessage, context.currentCwd, context.cliAgents, context.agentDefinitions);
  let initialMessage = context.initialState.initialMessage;
  if (st(process.env.CLAUDE_CODE_RESUME_INTERRUPTED_TURN) && sessionData.turnInterruptionState?.kind === "interrupted_prompt" && Q$(sessionData.turnInterruptionState.message.origin)) logForDebugging("[sessionRestore] Auto-resuming interrupted turn for bg crash-respawn"), removeInterruptedMessage(sessionData.messages, sessionData.turnInterruptionState.message), initialMessage = {
    message: sessionData.turnInterruptionState.message
  };
  let mergedInitialState = context.initialState;
  return (lLo(), ro(aLo)).restoreGoalFromTranscript(sessionData.messages, (updater: any) => {
    mergedInitialState = updater(mergedInitialState);
  }), {
    messages: sessionData.messages.filter((msg: any) => !(msg.type === "system" && msg.subtype === "bridge_status")),
    fileHistorySnapshots: sessionData.fileHistorySnapshots,
    contentReplacements: sessionData.contentReplacements,
    agentName: sessionData.agentName,
    agentColor: sessionData.agentColor === "default" ? void 0 : sessionData.agentColor,
    restoredAgentDef: restoredAgentDef,
    initialState: {
      ...mergedInitialState,
      initialMessage: initialMessage,
      ...(!resumeFlags.forkSession && sessionData.bridgeSessionId && !(mergedInitialState.replBridgeEnabled && !mergedInitialState.replBridgeOutboundOnly) && {
        replBridgeEnabled: !0,
        replBridgeOutboundOnly: !1
      }),
      ...(restoredAgentType && {
        agent: restoredAgentType
      }),
      ...(restoredModel && {
        mainLoopModel: restoredModel
      }),
      ...(attributionData && {
        attribution: attributionData
      }),
      ...(standaloneAgentContext && {
        standaloneAgentContext: standaloneAgentContext
      }),
      ...(restoredToolPermissionContext && {
        toolPermissionContext: restoredToolPermissionContext
      }),
      agentDefinitions: mergedAgentDefinitions
    }
  };
}
var SWl: any, NPm: any;
var f5e = b(() => {
  lt();
  EU();
  y3t();
  H9();
  Ct();
  scrubPathsConfig();
  zE();
  wGt();
  zw();
  vW();
  hp();
  jS();
  tce();
  Go();
  qe();
  sn();
  _6();
  vO();
  Ba();
  _q();
  pXn();
  lo();
  z2();
  R8t();
  NH();
  Mo();
  MO();
  li();
  eC();
  yx();
  initXL();
  ja();
  Nk();
  qJr();
  MM();
  hI();
  SWl = require("path");
  NPm = {
    unknown_family: "not a model this version of Claude Code recognizes",
    not_allowed: "not allowed by this account's model settings",
    retired: "retired"
  };
});
export {OPm,bWl,RGt,LPm,xGt,sTe,MPm,cLo,p5e,EWl,BPm,CWl,FPm,kGt,UPm,mXn,m5e,$Pm,HGt,vWl,fXn,SWl,NPm,f5e};
