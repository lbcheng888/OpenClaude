// @ts-nocheck
import {LO} from "../../vendor/m2707.ts";
import {pat,Ato} from "../../vendor/m3332.ts";
import {PP,YL} from "../../vendor/m123.ts";
import {switchSession as ZE,getSessionId as It,setMainThreadAgentType as nK,getMainLoopModelOverride as by,setMainLoopModelOverride as Bg,latchRefusalFallbackModel as xKe,getInitialMainLoopModel as l5,setOriginalCwd as Gx,lt} from "../session/0132_sent.ts";
import {FT,xS} from "../../vendor/m122.ts";
import {j2n,Pq} from "../session/3880_trackSequence.ts";
import {HBo,kBo} from "../telemetry/5450_restoreGoalFromTranscript.ts";
import {oo,b} from "../../runtime.ts";
import {HE,oH} from "../agent/3332_id.ts";
import {KOe,mtr} from "../../vendor/m5448.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {parseUserSpecifiedModel as Qo,isExemptDefaultResolvingPick as XT,normalizeModelStringForAPI as Pp,getCanonicalName as So,getUserSpecifiedModelSetting as w3,isModeDependentModelSetting as SXe,Ro} from "./1458_swapShrinksContextWindow.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {fM,FS} from "../../vendor/m722.ts";
import {bte,lce} from "../../vendor/m3960.ts";
import {cy,c9n} from "./5219_verifyAutoModeGateAccess.ts";
import {usesFirstPartyModelIds as Vu,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Bo} from "../../vendor/m5.ts";
import {Sfe,mI} from "../config/2029_mI.ts";
import {uBs,h2} from "../../vendor/m1285.ts";
import {nw} from "../../vendor/m2215.ts";
import {C1l,YGt} from "../config/5059_isDeprecated.ts";
import {k_,X5,GS} from "../api/2028_used.ts";
import {pct,Iao} from "../api/3764_fetchBootstrapData.ts";
import {getAgentDefinitionsWithOverrides as nP,getActiveAgentsFromList as jB,kg} from "./4476_toAgentInfos.ts";
import {getCurrentWorktreeSession as _f} from "../config/3348_flushAnalyticsSinks.ts";
import {saveWorktreeState as Qq,resetSessionFilePointer as XY,recordContentReplacement as T8e,restoreSessionMetadata as Jue,adoptResumedSessionFile as Yue,saveMode as bOe,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {clearMemoryFileCaches as Vk,ZR} from "../config/2729_stripHtmlComments.ts";
import {eDe,Mqt} from "../../vendor/m4275.ts";
import {bT,Dw} from "../core/5176_encoding.ts";
import {reanchorGitFileWatcher as UK,VP} from "../../vendor/m696.ts";
import {getIsGit as Ay,ia} from "../../vendor/m698.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {restoreWorktreeSession as iQn,qI} from "../session/5205_worktreeBranchName.ts";
import {wc,po} from "../tools/5224_userPromptCount.ts";
import {renameRecordingForSession as X7t,Q7t} from "../../vendor/m5447.ts";
import {w$n,V$} from "../telemetry/3911_contextWindow.ts";
import {S7,vd} from "../session/1465_promise.ts";
import {nt} from "../../vendor/m127.ts";
import {y1,SW} from "../telemetry/2793_consumer.ts";
import {removeInterruptedMessage as c9t,Xle} from "./3885_restoreSkillStateFromMessages.ts";
import {UW} from "../config/3317_fileStates.ts";
import {dn} from "../config/0137_namespace.ts";
/**
 * Extract the current todos list from the last assistant message that contains a tool_use
 * referencing the LO tool (TodoWrite/task list tool).
 */
function W2m(messages: any[]): any[] {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type !== "assistant") continue;
    let toolUseBlock = msg.message.content.find((contentItem: any) => contentItem.type === "tool_use" && contentItem.name === LO);
    if (!toolUseBlock || toolUseBlock.type !== "tool_use") continue;
    let toolInput = toolUseBlock.input;
    if (toolInput === null || typeof toolInput !== "object") return [];
    let parseResult = pat().safeParse(toolInput.todos);
    return parseResult.success ? parseResult.data : [];
  }
  return [];
}

/**
 * Attempt to resume a session by switching to the session file identified in flags.
 * Returns false if this is not a plain resume (fork or flag-based session id present).
 */
function sQl(flags: any): boolean {
  if (typeof flags.resume !== "string" || flags.forkSession || flags.hasSessionIdFlag) return !1;
  let sessionPath = PP(flags.resume);
  if (!sessionPath) return !1;
  return ZE(FT(sessionPath), "resume"), !0;
}

/**
 * Restore file history snapshots and goal-from-transcript state, and todos for the current session.
 */
function Z7t(sessionData: any, updateState: any): void {
  if (sessionData.fileHistorySnapshots && sessionData.fileHistorySnapshots.length > 0) j2n(sessionData.fileHistorySnapshots, (snapshot: any) => {
    updateState((prevState: any) => ({
      ...prevState,
      fileHistory: snapshot
    }));
  });
  if ((HBo(), oo(kBo)).restoreGoalFromTranscript(sessionData.messages, updateState), !HE() && sessionData.messages && sessionData.messages.length > 0) {
    let todos = W2m(sessionData.messages);
    if (todos.length > 0) {
      let sessionId = It();
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
function G2m(sessionData: any): void {
  return;
}

/**
 * Build a standalone agent context object from name and color settings.
 * Returns undefined when both are absent; treats "default" color as undefined.
 */
function ezt(agentName: string | undefined, agentColor: string | undefined): any {
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
function NSe(savedAgentType: any, mainThreadAgentDefinition: any, agentDefinitions: any): any {
  if (mainThreadAgentDefinition) return {
    agentDefinition: mainThreadAgentDefinition,
    agentType: void 0
  };
  if (!savedAgentType) return nK(void 0), KOe(void 0), {
    agentDefinition: void 0,
    agentType: void 0
  };
  let matchedAgent = agentDefinitions.activeAgents.find((agentEntry: any) => agentEntry.agentType === savedAgentType);
  if (!matchedAgent) return A(`Resumed session had agent "${savedAgentType}" but it is no longer available. Using default behavior.`), nK(void 0), KOe(void 0), {
    agentDefinition: void 0,
    agentType: void 0
  };
  if (nK(matchedAgent.agentType), KOe(matchedAgent), !by() && matchedAgent.model && matchedAgent.model !== "inherit") {
    let parsedModel = Qo(matchedAgent.model);
    if (XT(parsedModel) || Oa(parsedModel)) Bg(parsedModel);else A(`Agent model "${matchedAgent.model}" is not in the availableModels allowlist; keeping the session model`, {
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
async function V2m(savedMode: any, permissionModeCliSet: any): Promise<any> {
  if (permissionModeCliSet || !savedMode) return;
  let resolvedMode = fM(savedMode);
  if (resolvedMode === "default" && savedMode !== "default") return;
  if (resolvedMode === "plan" || resolvedMode === "bypassPermissions") return;
  if (resolvedMode === "default") {
    {
      let {
        isAutoModeFromFallback: checkFallback
      } = await Promise.resolve().then(() => (bte(), lce));
      if (checkFallback()) return "default";
    }
    return;
  }
  if (resolvedMode === "auto") {
    let {
      isAutoModeGateEnabled: checkGate
    } = await Promise.resolve().then(() => (cy(), c9n));
    if (!checkGate()) return;
  }
  return resolvedMode;
}

/** Returns true when a custom model is already set (env, override, or non-first-party). */
function IBo(): boolean {
  return Boolean(by() !== void 0 || process.env.ANTHROPIC_MODEL || !Vu());
}

/**
 * Attempt to restore the session's saved model string, logging an event and warning message
 * when restoration is skipped or declined. Returns the model string on success.
 */
function nVe(messages: any[], fallbackModel: any, warnCallback: any, logWrapper: any = (fn: any) => fn()): any {
  if (IBo()) return;
  let checkResult = aQl(messages, fallbackModel);
  if (checkResult.kind === "none") return;
  if (checkResult.kind === "mode_dependent_setting") {
    logWrapper(() => W("tengu_resume_model_restore", {
      outcome: Le("skipped_mode_dependent_setting"),
      is_eap: !1
    }));
    return;
  }
  if (checkResult.kind === "declined") logWrapper(() => W("tengu_resume_model_restore", {
    outcome: Le("declined"),
    decline_reason: Bo(checkResult.reason),
    is_eap: Sfe(checkResult.model)
  }));
  if (checkResult.kind === "declined") {
    let displayFallback = fallbackModel && Pp(fallbackModel) || "the default model";
    warnCallback?.(`Session model ${checkResult.model} could not be restored (${K2m[checkResult.reason]}) — using ${displayFallback} instead.`);
    return;
  }
  return checkResult.model;
}

/**
 * Like nVe but returns the model string directly without logging/warning side effects.
 */
function iQl(messages: any[], fallbackModel: any): any {
  let checkResult = aQl(messages, fallbackModel);
  return checkResult.kind === "ok" ? checkResult.model : void 0;
}

/**
 * Check if a mode-dependent setting (opusplan/haiku) is compatible with the given canonical model name.
 */
function z2m(modeSetting: string, canonicalModelName: string): boolean {
  if (modeSetting === "opusplan") return canonicalModelName.includes("opus") || canonicalModelName.includes("sonnet");
  if (modeSetting === "haiku") return canonicalModelName.includes("haiku") || canonicalModelName.includes("sonnet");
  return !1;
}

/**
 * Walk the message history backwards to find the most recent assistant model and determine
 * whether it can be restored (ok), was declined for a known reason, is mode-dependent, or
 * no saved model was found (none).
 */
function aQl(messages: any[], fallbackModel: any): any {
  let allowedCanonicalNames = new Set(uBs.map(So));
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type !== "assistant" || msg.isMeta || msg.message.model === nw) continue;
    let savedModel = msg.message.model,
      userModelSetting = w3();
    if (SXe(userModelSetting) && !Sfe(savedModel) && z2m(userModelSetting, So(savedModel))) return {
      kind: "mode_dependent_setting"
    };
    let declineReason = !(allowedCanonicalNames.has(So(savedModel)) || Sfe(savedModel)) ? "unknown_family" : !XT(savedModel) && !Oa(savedModel) ? "not_allowed" : C1l(savedModel) ? "retired" : void 0;
    if (declineReason) return {
      kind: "declined",
      model: savedModel,
      reason: declineReason
    };
    if (fallbackModel && k_(fallbackModel) && X5(savedModel) && So(Qo(Pp(fallbackModel))) === So(savedModel)) return {
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
function j2m(messages: any[], fallbackModel: any): boolean {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") {
      let normalizedFallback = Pp(msg.fallbackModel),
        normalizedTarget = Pp(fallbackModel);
      return normalizedFallback === normalizedTarget || So(normalizedFallback) === So(normalizedTarget);
    }
  }
  return !1;
}

/**
 * Mark the most recent model_refusal_fallback system message as neutralized by fork.
 */
function tzt(messages: any[]): void {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") msg.neutralizedByFork = !0;
  }
}

/**
 * Return the fallback model from the most recent model_refusal_fallback message if it was
 * neutralized by a fork; otherwise returns undefined.
 */
function Y2m(messages: any[]): any {
  for (let msgIdx = messages.length - 1; msgIdx >= 0; msgIdx--) {
    let msg = messages[msgIdx];
    if (msg?.type === "system" && msg.subtype === "model_refusal_fallback") return msg.neutralizedByFork === !0 ? {
      fallbackModel: msg.fallbackModel
    } : void 0;
  }
  return;
}

/** Log a model restore telemetry event with the given outcome and model. */
function ftr(outcome: string, model: any): void {
  W("tengu_resume_model_restore", {
    outcome: Le(outcome),
    is_eap: Sfe(model)
  });
}

/** Kick off an async fetch of bootstrap data, ignoring the result. */
function rQl(): void {
  Promise.resolve().then(() => (pct(), Iao)).then(mod => mod.fetchBootstrapData());
}

/**
 * Restore the main loop model override, handling refusal-fallback latching logic.
 * If the model was previously refused (and not neutralized), skips restore and re-latches.
 */
function rVe(messages: any[], restoredModel: any, isFork: any): any {
  if (!j2m(messages, restoredModel)) return Bg(restoredModel), rQl(), ftr("restored", restoredModel), restoredModel;
  if (isFork) {
    W("tengu_refusal_fallback_resume_latch", {
      action: Le("fork_skip_restore")
    }), ftr("skipped_fork_fallback", restoredModel);
    return;
  }
  let neutralized = Y2m(messages);
  if (neutralized && Pp(neutralized.fallbackModel) === Pp(restoredModel)) {
    W("tengu_refusal_fallback_resume_latch", {
      action: Le("fork_neutralized_skip")
    }), ftr("skipped_fork_neutralized", restoredModel);
    return;
  }
  return Bg(restoredModel), rQl(), xKe({
    fallbackModel: restoredModel,
    previousOverride: void 0,
    previousAppStateModel: l5() ?? null,
    previousModelForSession: null
  }), ftr("restored", restoredModel), W("tengu_refusal_fallback_resume_latch", {
    action: Le("relatch")
  }), restoredModel;
}

/**
 * Build the merged agent definitions for the resumed session, combining overrides with
 * CLI-supplied agents. Clears the cache before fetching.
 */
async function J2m(hasSessionMode: boolean, currentCwd: any, cliAgents: any[], agentDefinitions: any): Promise<any> {
  if (!hasSessionMode) return agentDefinitions;
  nP.cache.clear?.();
  let overrides = await nP(currentCwd),
    mergedAgents = [...overrides.allAgents, ...cliAgents];
  return {
    ...overrides,
    allAgents: mergedAgents,
    activeAgents: jB(mergedAgents)
  };
}

/**
 * Restore the working directory for the resumed session. Handles worktree sessions,
 * cwd changes, and refreshes all cwd-dependent caches (git, memory files, XL index, etc).
 */
function nzt(worktreeSession: any, targetCwd: any): void {
  let currentWorktree = _f();
  if (currentWorktree) {
    Qq(currentWorktree);
    return;
  }
  if (!worktreeSession) {
    if (worktreeSession === null) return;
    if (!targetCwd || Lt() === targetCwd) return;
    try {
      process.chdir(targetCwd);
    } catch {
      return;
    }
    O_(targetCwd), Gx(Lt()), Vk(), eDe(), bT.cache.clear?.(), UK(), Ay.cache.clear?.(), yS()?.refreshGitBranch?.();
    return;
  }
  try {
    process.chdir(worktreeSession.worktreePath);
  } catch {
    Qq(null);
    return;
  }
  O_(worktreeSession.worktreePath), Gx(Lt()), iQn(worktreeSession), Vk(), eDe(), bT.cache.clear?.(), UK(), yS()?.refreshGitBranch?.();
}

/**
 * Tear down a worktree session: resets to the original cwd and clears all caches.
 * No-op if no worktree session is active or if the path already matches.
 */
function lQl(worktreePath: any): void {
  let currentWorktree = _f();
  if (!currentWorktree) return;
  if (iQn(null), Vk(), eDe(), bT.cache.clear?.(), currentWorktree.worktreePath === worktreePath) return;
  try {
    process.chdir(currentWorktree.originalCwd);
  } catch {
    return;
  }
  O_(currentWorktree.originalCwd), Gx(Lt()), UK(), yS()?.refreshGitBranch?.();
}

/**
 * Full session restore: switches session file, restores metadata, cwd, model, agents,
 * permission mode, todos, and computes the merged initial state for the resumed session.
 */
async function htr(sessionData: any, resumeFlags: any, context: any): Promise<any> {
  let sessionModeMessage: any;
  if (sessionModeMessage = context.modeApi?.matchSessionMode(sessionData.mode), sessionModeMessage) sessionData.messages.push(wc(sessionModeMessage, "warning"));
  if (!resumeFlags.forkSession) {
    let sessionIdToUse = resumeFlags.sessionIdOverride ?? sessionData.sessionId;
    if (sessionIdToUse) ZE(FT(sessionIdToUse), "resume", resumeFlags.transcriptPath ? oQl.dirname(resumeFlags.transcriptPath) : null), await X7t(), await XY(), w$n(sessionIdToUse);
  } else if (sessionData.contentReplacements?.length) await T8e(sessionData.contentReplacements);
  if (Jue(resumeFlags.forkSession ? {
    ...sessionData,
    worktreeSession: void 0,
    bridgeSessionId: void 0,
    bridgeLastSeq: void 0,
    bridgeDialogKinds: void 0
  } : sessionData), !resumeFlags.forkSession) nzt(sessionData.worktreeSession), Yue();
  let {
      agentDefinition: restoredAgentDef,
      agentType: restoredAgentType
    } = NSe(sessionData.agentSetting, context.mainThreadAgentDefinition, context.agentDefinitions),
    restoredPermissionMode = await V2m(sessionData.permissionMode, context.permissionModeCliSet);
  if (resumeFlags.forkSession) tzt(sessionData.messages);
  let restoredModelCandidate = nVe(sessionData.messages, context.initialState.mainLoopModel, (warningText: any) => sessionData.messages.push(wc(warningText, "warning"))),
    restoredModel = restoredModelCandidate ? rVe(sessionData.messages, restoredModelCandidate, resumeFlags.forkSession) : void 0,
    restoredToolPermissionContext: any;
  if (restoredPermissionMode) {
    let {
        transitionPermissionMode: transitionFn
      } = await Promise.resolve().then(() => (cy(), c9n)),
      currentToolCtx = context.initialState.toolPermissionContext;
    try {
      restoredToolPermissionContext = {
        ...transitionFn(currentToolCtx.mode, restoredPermissionMode, currentToolCtx),
        mode: restoredPermissionMode
      };
    } catch (transitionErr: any) {
      A(`[sessionRestore] transitionPermissionMode rejected restored mode '${restoredPermissionMode}': ${transitionErr}`);
    }
  }
  bOe(context.modeApi?.isCoordinatorMode() ? "coordinator" : "normal");
  let attributionData = resumeFlags.includeAttribution ? G2m(sessionData) : void 0,
    standaloneCtxBase = ezt(sessionData.agentName, sessionData.agentColor),
    standaloneAgentContext = context.initialState.standaloneAgentContext ? {
      ...standaloneCtxBase,
      ...context.initialState.standaloneAgentContext
    } : standaloneCtxBase;
  S7(standaloneAgentContext?.name);
  let mergedAgentDefinitions = await J2m(!!sessionModeMessage, context.currentCwd, context.cliAgents, context.agentDefinitions),
    initialMessage = context.initialState.initialMessage;
  if (nt(process.env.CLAUDE_CODE_RESUME_INTERRUPTED_TURN) && sessionData.turnInterruptionState?.kind === "interrupted_prompt" && y1(sessionData.turnInterruptionState.message.origin)) A("[sessionRestore] Auto-resuming interrupted turn for bg crash-respawn"), c9t(sessionData.messages, sessionData.turnInterruptionState.message), initialMessage = {
    message: sessionData.turnInterruptionState.message
  };
  let mergedInitialState = context.initialState;
  return (HBo(), oo(kBo)).restoreGoalFromTranscript(sessionData.messages, (updater: any) => {
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
var oQl, K2m;
var oVe = b(() => {
  lt();
  WB();
  Mqt();
  V$();
  kt();
  kg();
  xS();
  Q7t();
  ZR();
  UW();
  vd();
  GS();
  Xle();
  Po();
  qe();
  dn();
  Pq();
  VP();
  ia();
  SW();
  mtr();
  po();
  h2();
  YGt();
  mI();
  Ro();
  eO();
  Ps();
  FS();
  Dw();
  KO();
  _a();
  oH();
  Ato();
  YL();
  qI();
  oQl = require("path");
  K2m = {
    unknown_family: "not a model this version of Claude Code recognizes",
    not_allowed: "not allowed by this account's model settings",
    retired: "retired"
  };
});

export {W2m,sQl,Z7t,G2m,ezt,NSe,V2m,IBo,nVe,iQl,z2m,aQl,j2m,tzt,Y2m,ftr,rQl,rVe,J2m,nzt,lQl,htr,oQl,K2m,oVe};
