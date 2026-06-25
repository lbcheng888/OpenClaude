// @ts-nocheck
import {getAgentDefinitionsWithOverrides as nP,isBuiltInAgent as Gh,kg} from "./4476_toAgentInfos.ts";
import {VF,J2} from "../session/2532_id.ts";
import {ec,Id,Nie,mT,Pm,Oi,Awe,Ewe,Tg,bI,T4,Dnt,Pf} from "../agent/2591_level.ts";
import {waitForPolicyLimitsToLoad as F6,_B} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {X2l,Q2l} from "../../vendor/m5155.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {xe,Pt,He,mn} from "../telemetry/0600_feature_name.ts";
import {Xd,Ce,Ct} from "../../vendor/m197.ts";
import {spawnBgSession as IJ,qVt} from "../session/5163_withStdinPositional.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {cSe,zue,i_t,FVt,cGe,t$l,uPo,r$l,a_t} from "../session/5157_confirmed.ts";
import {LVt,iGe,qJn} from "../telemetry/5155_qJn.ts";
import {Vb,coe,VT} from "../../vendor/m648.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {PP,YL} from "../../vendor/m123.ts";
import {b} from "../../runtime.ts";
import {oCo,CLAUDE_AGENT as rCo} from "./4474_CLAUDE_AGENT.ts";
// @ts-nocheck
function a$l(agentDef) {
  return {
    name: agentDef.agentType,
    description: agentDef.whenToUse,
    initialPrompt: agentDef.initialPrompt,
    color: agentDef.color
  };
}
function pPo(agentConfig, agentList) {
  if (!agentConfig?.agent) return uSe;
  let agentName = agentConfig.agent;
  return agentList?.find(item => item.name.toLowerCase() === agentName.toLowerCase()) ?? {
    ...uSe,
    name: agentName
  };
}
async function l$l(context) {
  let {
    activeAgents: activeAgents
  } = await nP(context);
  return activeAgents.filter(n => !Gh(n)).map(a$l);
}
async function c$l(dirPath) {
  let entries;
  try {
    entries = await iU.readdir(dirPath, {
      withFileTypes: true
    });
  } catch {
    return {};
  }
  let subdirChecks = entries.filter(entry => (entry.isDirectory() || entry.isSymbolicLink()) && !entry.name.startsWith(".") && !/\s/.test(entry.name)).map(async entry => {
      let fullPath = c_t.join(dirPath, entry.name);
      try {
        return await iU.stat(c_t.join(fullPath, ".git")), [entry.name, fullPath];
      } catch {
        return null;
      }
    }),
    gitRepos = (await Promise.all(subdirChecks)).filter(item => item !== null);
  return Object.fromEntries(gitRepos);
}
async function mPo(prompt, imageMap, sessionId) {
  let imageRefs = VF(prompt).filter(ref => imageMap[ref.id]?.type === "image");
  if (imageRefs.length === 0) return prompt;
  let outputDir = ec(sessionId),
    result = prompt;
  for (let idx = imageRefs.length - 1; idx >= 0; idx--) {
    let ref = imageRefs[idx],
      imageEntry = imageMap[ref.id],
      sourcePath = imageEntry.sourcePath;
    if (!sourcePath) {
      await iU.mkdir(outputDir, {
        recursive: true
      });
      let ext = (imageEntry.mediaType ?? "image/png").split("/")[1] ?? "png";
      sourcePath = c_t.join(outputDir, `pasted-${ref.id}.${ext}`), await iU.writeFile(sourcePath, imageEntry.content, {
        encoding: "base64"
      });
    }
    result = result.slice(0, ref.index) + sourcePath + result.slice(ref.index + ref.match.length);
  }
  return result;
}
function u$l(flags) {
  UVt = flags;
}
function d$l() {
  return UVt;
}
function fPo(options) {
  if (!options) return [];
  return [...(options.model ? ["--model", options.model] : []), ...(options.effort ? ["--effort", options.effort] : []), ...(options.permissionMode ? ["--permission-mode", options.permissionMode] : []), ...(options.allowBypass ? ["--allow-dangerously-skip-permissions"] : []), ...(options.jsonSchema ? ["--json-schema", options.jsonSchema] : []), ...(options.appendSystemPrompt ? ["--append-system-prompt", options.appendSystemPrompt] : [])];
}
async function KJn(agentTemplate, intent, sessionId, cwd, routineName, spawnOptions) {
  if (routineName) {
    if (await F6(), !Xs(X2l)) return {
      ok: false,
      error: Q2l
    };
  }
  A("[PERF:bg-dispatch-start]");
  let jobSessionId = sessionId ?? BVt.randomUUID(),
    shortId = jobSessionId.slice(0, 8),
    jobCwd = cwd ?? Lt(),
    agentFlags = routineName ? ["--routine", routineName] : ["--agent", agentTemplate.name],
    allFlags = [...UVt, ...agentFlags, ...fPo(spawnOptions)],
    jobDir = ec(shortId);
  try {
    await iU.mkdir(c_t.join(jobDir, "tmp"), {
      recursive: true
    }), await Id(jobDir, Nie({
      template: routineName ? {
        name: routineName,
        description: ""
      } : agentTemplate,
      routine: routineName,
      respawnFlags: allFlags,
      intent: intent,
      ...(routineName && !intent && {
        tempo: "idle",
        detail: "(idle \u2014 waiting for trigger)"
      }),
      sessionId: jobSessionId,
      cwd: jobCwd,
      originCwd: jobCwd
    }));
  } catch (writeErr) {
    return await iU.rm(jobDir, {
      recursive: true,
      force: true
    }).catch(() => {}), mT(jobDir), xe("fleet_view_dispatch", "state_write_failed", {
      errno: Xd(writeErr) ?? "unknown"
    }), {
      ok: false,
      error: `Couldn't create the job \u2014 ${Ce(writeErr)}`
    };
  }
  let spawnArgs = [...allFlags, ...(intent ? ["--", intent] : [])],
    dispatchStart = Date.now(),
    spawnResult = await IJ(spawnArgs, jobSessionId, "fleet", jobCwd),
    gateBlocked = !spawnResult.ok && spawnResult.reason === "gate_blocked";
  if (!spawnResult.ok && !spawnResult.alive && spawnResult.reason === "ack_timeout" && Date.now() - dispatchStart < 2000) A(`bg: dispatch fast-failed (${Date.now() - dispatchStart}ms) \u2014 retrying once`, {
    level: "warn"
  }), await Kn(500), spawnResult = await IJ(spawnArgs, jobSessionId, "fleet", jobCwd);
  if (!spawnResult.ok) {
    if (spawnResult.alive) return Pt("fleet_view_dispatch", "alive_collision"), {
      ok: false,
      error: spawnResult.error
    };
    if (!gateBlocked) await cSe(shortId).catch(() => {});
    return await iU.rm(jobDir, {
      recursive: true,
      force: true
    }).catch(() => {}), mT(jobDir), (spawnResult.reason === "gate_blocked" ? Pt : xe)("fleet_view_dispatch", spawnResult.reason ?? "spawn_failed"), {
      ok: false,
      error: spawnResult.error,
      reason: spawnResult.reason
    };
  }
  if (A("[PERF:bg-dispatch-end]"), spawnResult.rescued) Pt("fleet_view_dispatch", "rescued");else He("fleet_view_dispatch");
  return {
    ok: true,
    jobId: spawnResult.short,
    sessionId: jobSessionId
  };
}
function $Vt() {
  return true;
}
async function p$l(intent, sessionId, cwd) {
  let jobSessionId = sessionId ?? BVt.randomUUID(),
    shortId = jobSessionId.slice(0, 8),
    jobCwd = cwd ?? Lt(),
    jobDir = ec(shortId);
  try {
    await iU.mkdir(c_t.join(jobDir, "tmp"), {
      recursive: true
    }), await Id(jobDir, Nie({
      template: pRm,
      intent: intent,
      sessionId: jobSessionId,
      cwd: jobCwd,
      originCwd: jobCwd
    }));
  } catch (writeErr) {
    return await iU.rm(jobDir, {
      recursive: true,
      force: true
    }).catch(() => {}), mT(jobDir), xe("fleet_view_dispatch_exec", "state_write_failed", {
      errno: Xd(writeErr) ?? "unknown"
    }), {
      ok: false,
      error: `Couldn't create the job \u2014 ${Ce(writeErr)}`
    };
  }
  let spawnResult = await IJ([], jobSessionId, "fleet", jobCwd, {
    intent: intent,
    exec: intent
  });
  if (!spawnResult.ok) {
    if (spawnResult.alive) return Pt("fleet_view_dispatch_exec", "alive_collision"), {
      ok: false,
      error: spawnResult.error
    };
    return await cSe(shortId).catch(() => {}), await iU.rm(jobDir, {
      recursive: true,
      force: true
    }).catch(() => {}), mT(jobDir), xe("fleet_view_dispatch_exec", spawnResult.reason ?? "spawn_failed"), {
      ok: false,
      error: spawnResult.error,
      reason: spawnResult.reason
    };
  }
  return He("fleet_view_dispatch_exec"), {
    ok: true,
    jobId: spawnResult.short,
    sessionId: jobSessionId
  };
}
function hPo() {
  return dSe;
}
function m$l(sessionId) {
  if (dSe?.sessionId === sessionId) dSe.ready = true;
}
async function zJn(context, reset = false, spawnOptions) {
  if (reset) VJn = false;
  if (dSe || l_t || VJn) return;
  if (LVt()) {
    Pt("job_spare_ensure", "low_mem");
    return;
  }
  let spareSessionId = BVt.randomUUID(),
    spareShortId = spareSessionId.slice(0, 8);
  A(`[PERF:bg-spare-start] ${spareShortId}`), l_t = (async () => {
    try {
      let spareCwd = await Vb(context),
        spawnResult = await IJ([...UVt, "--agent", spawnOptions?.agent ?? uSe.name, ...fPo(spawnOptions)], spareSessionId, "spare", spareCwd);
      if (!spawnResult.ok) {
        await zue(spareShortId, {
          internal: true
        }).catch(() => {}), (spawnResult.reason === "gate_blocked" ? Pt : xe)("job_spare_ensure", spawnResult.reason ?? "spawn_failed");
        return;
      }
      if (VJn) {
        await zue(spareShortId, {
          internal: true
        }), Pt("job_spare_ensure", "discarded_after_spawn");
        return;
      }
      dSe = {
        jobId: spareShortId,
        sessionId: spareSessionId,
        cwd: spareCwd,
        ready: false,
        defaults: spawnOptions
      }, A(`[PERF:bg-spare-spawned] ${spareShortId}`), He("job_spare_ensure");
    } catch {
      await zue(spareShortId, {
        internal: true
      }).catch(() => {}), xe("job_spare_ensure", "threw");
    }
  })();
  try {
    await l_t;
  } finally {
    l_t = null;
  }
}
async function f$l(intent, agentOverride) {
  A("[PERF:bg-claim-start]");
  let spareJob = dSe;
  dSe = null;
  let agentTemplate = agentOverride ?? pPo(spareJob?.defaults),
    onMiss = async (reason, detail) => {
      if (A(`[bg-spare] claim miss (${reason})${detail ? `: ${detail}` : ""}`), W("tengu_bg_spare_claim_fail", {
        reason: Le(reason)
      }), spareJob) {
        let {
          removed: removed,
          error: deleteError
        } = await zue(spareJob.jobId, {
          internal: true,
          knownGone: reason === "enojob"
        });
        if (!removed) return xe("job_claim_spare", "job_claim_spare_delete_failed"), A(`[bg-spare] deleteJob unconfirmed (${deleteError ?? "unknown"}) \u2014 cold-dispatching with fresh sessionId; spare ${spareJob.jobId} dir preserved`, {
          level: "warn"
        }), KJn(agentTemplate, intent, undefined, spareJob.cwd, undefined, spareJob.defaults);
      }
      return Pt("job_claim_spare", reason), KJn(agentTemplate, intent, spareJob?.sessionId, spareJob?.cwd, undefined, spareJob?.defaults);
    };
  if (!spareJob) return onMiss("no-spare");
  let newState = i_t(Nie({
    template: agentTemplate,
    respawnFlags: [...UVt, "--agent", agentTemplate.name, ...fPo(spareJob.defaults)],
    intent: intent,
    sessionId: spareJob.sessionId,
    cwd: spareJob.cwd,
    originCwd: spareJob.cwd
  }), intent);
  try {
    let claimResult = await FVt(spareJob.jobId, intent, undefined, newState);
    if (claimResult) return onMiss(claimResult.err === cGe ? "enojob" : "reply", claimResult.err);
  } catch (claimErr) {
    return onMiss("reply-throw", Ce(claimErr));
  }
  return await Id(ec(spareJob.jobId), newState).catch(Pm), A("[PERF:bg-claim-end]"), He("job_claim_spare"), He("fleet_view_dispatch"), {
    ok: true,
    jobId: spareJob.jobId,
    sessionId: spareJob.sessionId
  };
}
async function h$l() {
  if (VJn = true, l_t) await l_t.catch(() => {});
  let spareSnapshot = dSe;
  if (dSe = null, spareSnapshot) await zue(spareSnapshot.jobId, {
    internal: true
  });
}
async function u_t(shortId, options) {
  if (options?.knownAlive && options.knownState && !options.force) return {
    ok: false,
    alive: true,
    short: options.knownState.daemonShort ?? shortId,
    state: options.knownState,
    error: `Session ${shortId} is already running`
  };
  let jobDir = ec(shortId),
    savedState = options?.knownState ?? (await Oi(jobDir));
  if (!savedState) return xe("job_respawn", "job_respawn_state_missing"), {
    ok: false,
    error: "Can't respawn \u2014 that job's saved state is missing",
    alive: false
  };
  let daemonShort = savedState.daemonShort ?? shortId,
    probeStart = Date.now(),
    probeResult = await t$l(daemonShort),
    probeMs = Date.now() - probeStart,
    isAlive = probeResult.alive;
  if (!options?.force && isAlive) return {
    ok: false,
    alive: true,
    short: daemonShort,
    state: savedState,
    error: `Session ${shortId} is already running`
  };
  if (!options?.force && Awe(savedState)) {
    if (probeResult.daemonUp && probeResult.present) return {
      ok: false,
      alive: true,
      short: daemonShort,
      state: savedState,
      error: `Session ${shortId} has exited; attach shows the captured output`
    };
    return Pt("job_respawn", "exec_output_expired"), {
      ok: false,
      alive: false,
      state: savedState,
      error: "Output no longer available \u2014 this shell command has exited"
    };
  }
  if (options?.knownState) mT(jobDir);
  let freshState = options?.knownState ? (await Oi(jobDir)) ?? savedState : savedState,
    freshDaemonShort = freshState.daemonShort ?? shortId,
    newSessionId = freshState.resumeSessionId ?? (PP(savedState.sessionId) !== null ? savedState.sessionId : BVt.randomUUID()),
    killStart = Date.now(),
    killMs = 0,
    waitMs = 0,
    linkScanPromise = null,
    docPromise = null,
    skipCeremony = probeResult.daemonUp && !probeResult.alive && !probeResult.present && freshDaemonShort === daemonShort;
  if (skipCeremony) linkScanPromise = uPo(freshDaemonShort), docPromise = coe(newSessionId, freshState.cwd, freshState.linkScanPath);else {
    let killResult = await cSe(freshDaemonShort, savedState);
    if (killMs = Date.now() - killStart, isAlive && !killResult.confirmed) return W("tengu_bg_respawn_unconfirmed_bail", {}), Pt("job_respawn", "job_respawn_kill_unconfirmed"), {
      ok: false,
      alive: isAlive,
      short: freshDaemonShort,
      state: savedState,
      error: killResult.error ?? "Couldn't stop the previous worker \u2014 supervisor may be starting, retry in a moment"
    };
    let waitStart = Date.now(),
      waitDeadline = waitStart + 3000;
    while (Date.now() < waitDeadline) {
      if (!(await r$l(freshDaemonShort))) break;
      await Kn(100);
    }
    waitMs = Date.now() - waitStart;
  }
  let transcriptStart = Date.now(),
    transcriptResult = await (docPromise ?? coe(newSessionId, freshState.cwd, freshState.linkScanPath)),
    transcriptMs = Date.now() - transcriptStart;
  if (linkScanPromise) {
    let linkStart = Date.now(),
      linkResult = await linkScanPromise;
    if (killMs = Date.now() - linkStart, linkResult.anyMatch) transcriptResult = await coe(newSessionId, freshState.cwd, freshState.linkScanPath);
  }
  let hasMessages = transcriptResult.hasMessages;
  if (!hasMessages) W("tengu_bg_respawn_no_transcript", {
    via: Le(transcriptResult.via),
    had_link_scan_path: freshState.linkScanPath !== undefined
  }), await iU.rm(transcriptResult.path, {
    force: true
  }).catch(() => {});
  let execIntent = savedState.template === "exec" && savedState.respawnFlags.length === 0 ? savedState.intent : undefined,
    parsedRespawnFlags = iGe(freshState.respawnFlags),
    respawnArgs = execIntent ? [] : parsedRespawnFlags.length > 0 ? parsedRespawnFlags : savedState.routine ? ["--routine", savedState.routine] : savedState.template !== "bg" ? ["--agent", savedState.template] : [],
    initialPrompt = freshState.resumeSessionId !== undefined && newSessionId !== savedState.sessionId,
    spawnArgs = execIntent ? undefined : options?.initialPrompt ?? freshState.queuedPrompt ?? (hasMessages || initialPrompt ? undefined : savedState.intent),
    bridgeInfo = [...(hasMessages && !execIntent ? ["--resume", newSessionId] : []), ...(options?.replyOnResume && hasMessages && !execIntent && !spawnArgs && !respawnArgs.includes("--reply-on-resume") ? ["--reply-on-resume"] : []), ...respawnArgs, ...(spawnArgs ? ["--", spawnArgs] : [])],
    dispatchStart = Ewe(freshState.bridgeSessionId, freshState.bridgeSessionSeq, freshState.bridgeOutboundOnly),
    extraSpawnOpts = Date.now(),
    spawnResult = execIntent || savedState.bgIsolation === "none" || savedState.providerEnv || savedState.sessionPermissionRules || savedState.memoryToggledOff ? {
      ...(execIntent && {
        intent: execIntent,
        exec: execIntent
      }),
      ...(savedState.bgIsolation === "none" && {
        bgIsolation: "none"
      }),
      ...(savedState.providerEnv && {
        providerEnv: savedState.providerEnv
      }),
      ...(savedState.sessionPermissionRules && {
        sessionPermissionRules: savedState.sessionPermissionRules
      }),
      ...(savedState.memoryToggledOff && {
        memoryToggledOff: true
      })
    } : undefined,
    M = await IJ(bridgeInfo, newSessionId, "fleet", freshState.cwd, spawnResult, dispatchStart, shortId);
  if (!M.ok && !M.alive && M.reason === "ack_timeout" && Date.now() - extraSpawnOpts < 2000) A(`bg: respawn dispatch fast-failed (${Date.now() - extraSpawnOpts}ms) \u2014 retrying once`, {
    level: "warn"
  }), await Kn(500), M = await IJ(bridgeInfo, newSessionId, "fleet", freshState.cwd, spawnResult, dispatchStart, shortId);
  let totalMs = Date.now() - extraSpawnOpts,
    N = Date.now() - probeStart;
  if (A(`[PERF:respawn] ${shortId}: total=${N}ms probe=${probeMs}ms kill=${killMs}ms${skipCeremony ? " (ceremony skipped)" : ""} wait=${waitMs}ms transcript=${transcriptMs}ms dispatch=${totalMs}ms ok=${M.ok}`), W("tengu_bg_respawn", {
    total_ms: N,
    probe_ms: probeMs,
    kill_ms: killMs,
    wait_ms: waitMs,
    transcript_ms: transcriptMs,
    dispatch_ms: totalMs,
    skipped_kill: skipCeremony,
    daemon_up: probeResult.daemonUp,
    was_present: probeResult.present,
    forced: options?.force === true,
    ok: M.ok
  }), !M.ok) {
    if (M.alive) Pt("job_respawn", "already_alive");else xe("job_respawn", "job_respawn_spawn_failed");
    let J = false;
    if (!M.alive && options?.initialPrompt) {
      let K = {
        ...freshState,
        queuedPrompt: options.initialPrompt,
        updatedAt: new Date().toISOString()
      };
      J = await Id(jobDir, K).then(() => true, j => (Pm(j), false));
    }
    return {
      ok: false,
      error: M.error,
      alive: M.alive ?? false,
      short: M.short,
      state: savedState,
      queued: J
    };
  }
  W("tengu_bg_agent_action", {
    action: Ve("respawn"),
    agent: savedState.template,
    wasSettled: Tg(savedState)
  }), mT(jobDir);
  let F = (await Oi(jobDir)) ?? freshState;
  if (F.state === "failed" && F.updatedAt > freshState.updatedAt) return Pt("job_respawn", "crashed_during_spawn"), {
    ok: true,
    short: M.short,
    state: F
  };
  let wasTerminal = spawnArgs ? i_t(F, spawnArgs) : F,
    updatedStateObj = freshState.state === "failed" || freshState.state === "stopped" || !!execIntent,
    z = {
      ...wasTerminal,
      state: updatedStateObj ? "starting" : freshState.state,
      ...(spawnArgs ? {
        inFlight: undefined
      } : {
        ...(!updatedStateObj && freshState.tempo === "active" ? bI(freshState.state) || freshState.routine ? {
          tempo: "idle"
        } : {
          tempo: "blocked",
          needs: T4,
          ...(Dnt.includes(freshState.state) && {
            state: "working"
          })
        } : {
          tempo: updatedStateObj ? "idle" : freshState.tempo
        }),
        detail: updatedStateObj ? "" : freshState.detail,
        inFlight: {
          tasks: 0,
          queued: 0,
          kinds: []
        }
      }),
      ...(hasMessages ? {} : {
        firstTerminalAt: null
      }),
      daemonShort: M.short,
      queuedPrompt: undefined,
      updatedAt: new Date().toISOString(),
      backend: "daemon"
    };
  return await Id(jobDir, z).catch(Pm), He("job_respawn"), {
    ok: true,
    short: M.short,
    state: z
  };
}
var BVt,
  iU,
  c_t,
  uSe,
  UVt,
  pRm,
  dSe = null,
  l_t = null,
  VJn = false;
var gPo = b(() => {
  qVt();
  qJn();
  J2();
  mn();
  kt();
  _B();
  Bu();
  oCo();
  kg();
  Po();
  qe();
  Ct();
  VT();
  YL();
  a_t();
  Pf();
  BVt = require("crypto"), iU = require("fs/promises"), c_t = require("path");
  uSe = a$l(rCo);
  UVt = [];
  pRm = {
    name: "exec",
    description: ""
  };
});

export {a$l,pPo,l$l,c$l,mPo,u$l,d$l,fPo,KJn,$Vt,p$l,hPo,m$l,zJn,f$l,h$l,u_t,BVt,iU,c_t,uSe,UVt,pRm,dSe,l_t,VJn,gPo};
