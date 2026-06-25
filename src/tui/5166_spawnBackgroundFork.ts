// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getMainLoopModelOverride as by,getReplConfigArgv as KLe,getOriginalCwd as gr,getMemoryToggledOff as Kx,getSessionId as It,lt} from "../session/0132_sent.ts";
import {getCurrentWorktreeSession as _f,_at,h_e,gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {getCurrentSessionFile as MPo,flushSessionStorage as _v,getCurrentSessionTitle as ph,getCurrentSessionAiTitle as FG,isTranscriptPersistenceDisabled as s9,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {withTimeout as Oc} from "../telemetry/1488_withTimeout.ts";
import {ove,Cp} from "../config/2223_level.ts";
import {spawnBgSession as IJ,stripResumeFlags as ZJn,formatBgHints as KVt,qVt} from "../session/5163_withStdinPositional.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ec,Oi,Id,Mie,Pf} from "../agent/2591_level.ts";
import {Swe,U2e} from "../../vendor/m2589.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {Le} from "../../vendor/m5.ts";
import {Yht,Hzn} from "../permissions/4799_once.ts";
import {P_,_W,Vce,cL,Gce,po} from "../tools/5224_userPromptCount.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {xv,Ud} from "../../vendor/m615.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {shellToolNames as mv,isReplMode as IG} from "../../vendor/m4331.ts";
import {y8t,Mft} from "../agent/4514_label.ts";
import {p_t,JVt,YVt,m_t,nXn,rXn,sXn,iXn} from "../../vendor/m5164.ts";
import {BN,IEe} from "../../vendor/m452.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {hTe,R8t} from "../../vendor/m4516.ts";
import {je} from "../../vendor/m2462.ts";
import {qI} from "../session/5205_worktreeBranchName.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var K$l = {};
ft(K$l, {
  spawnBackgroundFork: () => spawnBackgroundFork,
  deriveBackgroundSeed: () => deriveBackgroundSeed,
  call: () => call
});
/**
 * Spawn a forked copy of the current session as a detached background job.
 *
 * @param sessionMeta       session metadata (becomes part of the spawned env)
 * @param prompt            initial prompt text to hand to the background fork
 * @param effortOrModel     effort value when a string, otherwise undefined
 * @param permissionMode    permission mode flag passed through to the child
 * @param workingDirs       map of additional working directories
 * @param allowRules        { session, cliArg } allow rules
 * @param denyRules         { session, cliArg } deny rules
 * @param trigger           how the background was triggered ("left_arrow" | "command")
 * @param messages          conversation messages (used for AI title derivation)
 * @param options           { replyOnResume, providedSessionId, extraEnv }
 */
async function spawnBackgroundFork(sessionMeta, prompt, effortOrModel, permissionMode, workingDirs, allowRules, denyRules, trigger, messages, options) {
  let modelOverride = by(),
    effortValue: string | undefined = typeof effortOrModel === "string" ? effortOrModel : void 0,
    sessionWorkingDirs = Array.from(workingDirs.values()).filter(dir => dir.source === "session").map(dir => dir.path),
    sessionAllow = allowRules.session ?? [],
    sessionDeny = denyRules.session ?? [],
    sessionPermissionRules = sessionAllow.length > 0 || sessionDeny.length > 0 ? {
      allow: [...sessionAllow],
      deny: [...sessionDeny]
    } : void 0,
    cliAllow = allowRules.cliArg ?? [],
    cliDeny = denyRules.cliArg ?? [],
    worktreeSession = _f(),
    handedOff = Boolean(worktreeSession && !worktreeSession.enteredExisting),
    currentSessionFile = MPo();
  await Oc(_v(), 2000, "flush timeout").catch(() => {});
  let forkArgv = [...(currentSessionFile !== null ? ["--resume", currentSessionFile, "--fork-session"] : []), ...(options?.replyOnResume ? ["--reply-on-resume"] : []), ...KLe(), ...sessionWorkingDirs.flatMap(dir => ["--add-dir", dir]), ...cliAllow.flatMap(rule => ["--allowed-tools", rule]), ...cliDeny.flatMap(rule => ["--disallowed-tools", rule]), ...(modelOverride ? ["--model", modelOverride] : []), ...(effortValue && ove() ? ["--effort", effortValue] : []), "--permission-mode", permissionMode, ...(prompt ? ["--", prompt] : [])],
    spawnResult = await IJ(forkArgv, options?.providedSessionId, "repl", worktreeSession?.worktreePath ?? gr(), {
      ...sessionMeta,
      worktree: handedOff ? {
        path: worktreeSession.worktreePath,
        branch: worktreeSession.worktreeBranch,
        hookBased: worktreeSession.hookBased ?? !1,
        originCwd: worktreeSession.originalCwd
      } : void 0,
      sessionPermissionRules,
      memoryToggledOff: Kx() || void 0
    }, options?.extraEnv).catch(err => ({
      ok: !1,
      error: `Couldn't background — ${Ce(err)}`,
      reason: void 0
    }));
  if (!spawnResult.ok) {
    W("tengu_background_spawn_failed", {});
    let queuedForRetry = !1;
    if (trigger === "left_arrow" && options?.providedSessionId !== void 0 && currentSessionFile !== null && !spawnResult.alive) {
      let agentDir = ec(options.providedSessionId.slice(0, 8)),
        agentMeta = await Oi(agentDir);
      if (agentMeta) {
        let forkSessionFile = aXn.join(aXn.dirname(currentSessionFile), `${options.providedSessionId}.jsonl`);
        queuedForRetry = await f_t.copyFile(currentSessionFile, forkSessionFile).then(() => Id(agentDir, {
          ...agentMeta,
          state: "failed",
          tempo: "idle",
          needs: void 0,
          block: void 0,
          inFlight: void 0,
          detail: "couldn't start in the background — press Enter to retry",
          linkScanPath: forkSessionFile,
          respawnFlags: Swe(ZJn(forkArgv)),
          updatedAt: new Date().toISOString()
        }).catch(async writeErr => {
          throw await f_t.rm(forkSessionFile, {
            force: !0
          }).catch(() => {}), writeErr;
        })).then(() => !0, writeErr => (Ie(writeErr), !1));
      }
      if (queuedForRetry && worktreeSession) _at(null), h_e();
    }
    if (trigger === "left_arrow") if (queuedForRetry) Pt("repl_background_fork", "queued_for_later");else xe("repl_background_fork", "spawn_failed");
    return {
      ok: !1,
      error: spawnResult.error,
      queued: queuedForRetry,
      reason: spawnResult.reason
    };
  }
  if (W("tengu_background", {
    via_flag: !1,
    via: Le(trigger)
  }), trigger === "left_arrow") He("repl_background_fork");
  if (worktreeSession) _at(null), h_e();
  if (sessionMeta.name === void 0 && spawnResult.sessionId) {
    let shortId = spawnResult.short,
      titlePromise = Yht(P_([...messages]), AbortSignal.timeout(GRm)).then(aiTitle => aiTitle ? Mie(shortId, aiTitle, "auto") : void 0).catch(() => {});
    if (trigger === "command") Si(() => titlePromise);
  }
  return {
    ok: !0,
    short: spawnResult.short,
    handedOff,
    hadWorktree: worktreeSession !== null
  };
}
/**
 * Derive the seed (intent/name/detail) for a background session from the
 * conversation history. Walks messages newest-first to find the latest
 * assistant snippet and the most recent meaningful user prompt.
 */
function deriveBackgroundSeed(messages, fallbackIntent) {
  let intent = fallbackIntent,
    foundUserMessage = !1,
    detail;
  for (let idx = messages.length - 1; idx >= 0; idx--) {
    let message = messages[idx];
    if (message.type === "assistant" && detail === void 0) {
      let assistantText = _W(message);
      if (assistantText) detail = assistantText.replace(/\s+/g, " ").trim().slice(0, 120);
    }
    if (message.type === "user" && !message.isMeta && !Vce(message)) {
      let userText = cL(message)?.trim();
      if (userText && Gce(userText)) {
        if (userText.startsWith(`<${xv}>`)) foundUserMessage = !0;
        continue;
      }
      if (foundUserMessage = !0, !intent && userText) intent = userText;
    }
    if (foundUserMessage && intent && detail !== void 0) break;
  }
  if (!foundUserMessage && !fallbackIntent) return null;
  let userTitle = ph(It()),
    aiTitle = FG(It());
  return {
    intent: (intent || "(backgrounded)").slice(0, 200),
    name: userTitle ?? aiTitle,
    nameSource: userTitle ? "user" : aiTitle ? "auto" : void 0,
    detail
  };
}
/** Confirmation UI component for backgrounding the current session. */
function VRm(props) {
  let cache = G$l.c(56),
    {
      onDone,
      prompt,
      seed,
      messages,
      isMidTurn
    } = props,
    effortValue = _t(XRm),
    permissionMode = _t(JRm),
    workingDirs = _t(YRm),
    allowRules = _t(jRm),
    denyRules = _t(zRm),
    tasks = _t(KRm),
    queueState = mv(),
    inFlightSummary;
  if (cache[0] !== tasks) inFlightSummary = y8t(tasks), cache[0] = tasks, cache[1] = inFlightSummary;else inFlightSummary = cache[1];
  let inFlight = inFlightSummary,
    carryOverCount,
    abandonable;
  if (cache[2] !== tasks) {
    let liveCheck = p_t(tasks);
    carryOverCount = JVt(tasks, liveCheck), abandonable = y8t(BN(tasks, task => YVt(task, liveCheck)), {
      cronFilter: task => !m_t(task, liveCheck)
    }), cache[2] = tasks, cache[3] = carryOverCount, cache[4] = abandonable;
  } else carryOverCount = cache[3], abandonable = cache[4];
  let summaryInfo;
  if (cache[5] !== carryOverCount || cache[6] !== abandonable) summaryInfo = {
    carryOverCount,
    abandonable
  }, cache[5] = carryOverCount, cache[6] = abandonable, cache[7] = summaryInfo;else summaryInfo = cache[7];
  let {
      carryOverCount: carryOver,
      abandonable: abandonableSummary
    } = summaryInfo,
    [confirmed, setConfirmed] = h_t.useState(abandonableSummary.count === 0),
    spawnedRef = h_t.useRef(!1),
    runBackground;
  if (cache[8] !== abandonableSummary.count || cache[9] !== workingDirs || cache[10] !== allowRules || cache[11] !== denyRules || cache[12] !== carryOver || cache[13] !== confirmed || cache[14] !== effortValue || cache[15] !== inFlight.count || cache[16] !== isMidTurn || cache[17] !== messages || cache[18] !== onDone || cache[19] !== permissionMode || cache[20] !== prompt || cache[21] !== seed || cache[22] !== queueState || cache[23] !== tasks) runBackground = () => {
    if (!confirmed || spawnedRef.current) return;
    spawnedRef.current = !0, (async () => {
      let checkpoint = await nXn(tasks),
        forkSessionId;
      if (checkpoint) {
        forkSessionId = V$l.randomUUID();
        try {
          let agentDir = ec(forkSessionId.slice(0, 8));
          await f_t.mkdir(agentDir, {
            recursive: !0,
            mode: 448
          }), await rXn(agentDir, checkpoint.payload), await checkpoint.checkpointAgents(queueState);
        } catch {
          forkSessionId = void 0;
        }
      }
      let result = await spawnBackgroundFork(seed, prompt, effortValue, permissionMode, workingDirs, allowRules, denyRules, "command", messages, {
        replyOnResume: isMidTurn,
        providedSessionId: forkSessionId
      });
      if (result.ok) {
        if (checkpoint && forkSessionId) checkpoint.disown(queueState);
        W("tengu_background_fork", {
          confirmed: abandonableSummary.count > 0,
          inflight_count: inFlight.count,
          carryover_count: carryOver,
          mid_turn: isMidTurn,
          had_prompt: prompt.length > 0,
          had_worktree: result.hadWorktree,
          worktree_handed_off: result.handedOff,
          ...sXn(forkSessionId ? checkpoint?.payload : null)
        }), onDone(), await gi(0, "prompt_input_exit", {
          suppressResumeHint: !0,
          finalMessage: KVt(result.short, result.handedOff ? "(worktree handed off)" : void 0)
        });
      } else {
        if (forkSessionId) checkpoint?.abandon();
        onDone(result.error);
      }
    })();
  }, cache[8] = abandonableSummary.count, cache[9] = workingDirs, cache[10] = allowRules, cache[11] = denyRules, cache[12] = carryOver, cache[13] = confirmed, cache[14] = effortValue, cache[15] = inFlight.count, cache[16] = isMidTurn, cache[17] = messages, cache[18] = onDone, cache[19] = permissionMode, cache[20] = prompt, cache[21] = seed, cache[22] = queueState, cache[23] = tasks, cache[24] = runBackground;else runBackground = cache[24];
  let effectDeps;
  if (cache[25] !== workingDirs || cache[26] !== allowRules || cache[27] !== denyRules || cache[28] !== confirmed || cache[29] !== effortValue || cache[30] !== inFlight.count || cache[31] !== isMidTurn || cache[32] !== messages || cache[33] !== onDone || cache[34] !== permissionMode || cache[35] !== prompt || cache[36] !== seed || cache[37] !== queueState || cache[38] !== tasks) effectDeps = [confirmed, effortValue, permissionMode, workingDirs, allowRules, denyRules, inFlight.count, isMidTurn, seed, onDone, prompt, messages, tasks, queueState], cache[25] = workingDirs, cache[26] = allowRules, cache[27] = denyRules, cache[28] = confirmed, cache[29] = effortValue, cache[30] = inFlight.count, cache[31] = isMidTurn, cache[32] = messages, cache[33] = onDone, cache[34] = permissionMode, cache[35] = prompt, cache[36] = seed, cache[37] = queueState, cache[38] = tasks, cache[39] = effectDeps;else effectDeps = cache[39];
  if (h_t.useEffect(runBackground, effectDeps), confirmed) {
    let backgroundingNode;
    if (cache[40] === Symbol.for("react.memo_cache_sentinel")) backgroundingNode = XVt.jsx(v, {
      dimColor: !0,
      children: "Backgrounding…"
    }), cache[40] = backgroundingNode;else backgroundingNode = cache[40];
    return backgroundingNode;
  }
  let onDecline;
  if (cache[41] !== inFlight.count || cache[42] !== onDone) onDecline = () => {
    W("tengu_background_declined", {
      inflight_count: inFlight.count
    }), onDone();
  }, cache[41] = inFlight.count, cache[42] = onDone, cache[43] = onDecline;else onDecline = cache[43];
  let handleCancel = onDecline,
    carryOverText;
  if (cache[44] !== carryOver) carryOverText = carryOver > 0 ? ` ${carryOver} ${Sn(carryOver, "task")} will carry over to the background session.` : "", cache[44] = carryOver, cache[45] = carryOverText;else carryOverText = cache[45];
  let carryOverSuffix = carryOverText,
    subtitle = `${abandonableSummary.summary} will be stopped.${carryOverSuffix}`,
    abandonCount = abandonableSummary.count,
    abandonNoun;
  if (cache[46] !== abandonableSummary.count) abandonNoun = Sn(abandonableSummary.count, "task"), cache[46] = abandonableSummary.count, cache[47] = abandonNoun;else abandonNoun = cache[47];
  let confirmLabel = `Background anyway (${abandonCount} ${abandonNoun} will be stopped)`,
    handleConfirm;
  if (cache[48] === Symbol.for("react.memo_cache_sentinel")) handleConfirm = () => setConfirmed(!0), cache[48] = handleConfirm;else handleConfirm = cache[48];
  let confirmDialog;
  if (cache[49] !== handleCancel || cache[50] !== confirmLabel) confirmDialog = XVt.jsx(Bl, {
    confirmLabel,
    cancelLabel: "Stay",
    onConfirm: handleConfirm,
    onCancel: handleCancel
  }), cache[49] = handleCancel, cache[50] = confirmLabel, cache[51] = confirmDialog;else confirmDialog = cache[51];
  let dialog;
  if (cache[52] !== handleCancel || cache[53] !== confirmDialog || cache[54] !== subtitle) dialog = XVt.jsx(Jn, {
    title: "Background this session?",
    subtitle,
    onCancel: handleCancel,
    children: confirmDialog
  }), cache[52] = handleCancel, cache[53] = confirmDialog, cache[54] = subtitle, cache[55] = dialog;else dialog = cache[55];
  return dialog;
}
function KRm(state) {
  return state.tasks;
}
function zRm(state) {
  return state.toolPermissionContext.alwaysDenyRules;
}
function jRm(state) {
  return state.toolPermissionContext.alwaysAllowRules;
}
function YRm(state) {
  return state.toolPermissionContext.additionalWorkingDirectories;
}
function JRm(state) {
  return state.toolPermissionContext.mode;
}
function XRm(state) {
  return state.effortValue;
}
var G$l,
  V$l,
  f_t,
  aXn,
  h_t,
  XVt,
  /** Entry point: validate state and return the confirmation component (or null). */
  call = async (onDone, ctx, rawPrompt) => {
    if (Ws()) return W("tengu_background_already_bg", {}), onDone(), hTe(), null;
    if (s9()) return onDone("Cannot background — session persistence is disabled, so the forked job would have nothing to resume."), null;
    let prompt = (rawPrompt ?? "").trim(),
      seed = deriveBackgroundSeed(ctx.messages, prompt);
    if (seed === null) return onDone("Nothing to background yet — send a message first."), null;
    return XVt.jsx(VRm, {
      onDone,
      prompt,
      seed,
      messages: ctx.messages,
      isMidTurn: ctx.isMidTurn ?? !1
    });
  },
  GRm = 3000;
var LPo = b(() => {
  IEe();
  lt();
  qVt();
  d_();
  di();
  Ud();
  R8t();
  je();
  U2e();
  Pf();
  mn();
  kt();
  uo();
  IG();
  ud();
  vd();
  Cp();
  Ct();
  Mft();
  Np();
  vn();
  po();
  _a();
  lr();
  qI();
  Hzn();
  iXn();
  G$l = x(tt(), 1), V$l = require("crypto"), f_t = require("fs/promises"), aXn = require("path"), h_t = x(et(), 1), XVt = x(oe(), 1);
});

export {K$l,spawnBackgroundFork,deriveBackgroundSeed,VRm,KRm,zRm,jRm,YRm,JRm,XRm,G$l,V$l,f_t,aXn,h_t,XVt,call as WRm,GRm,LPo};
