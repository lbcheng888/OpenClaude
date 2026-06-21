// @ts-nocheck
import {getAgentDefinitionsWithOverrides,isCustomAgent,scrubPathsConfig} from "./4454_toAgentInfos.ts";
import {EF,K4} from "../session/2521_id.ts";
import {vc,Lp,Uie,fC,kA,ma,$we,Bwe,pg,WH,Q4,Ret,mg} from "../agent/2580_level.ts";
import {waitForPolicyLimitsToLoad,zF} from "../telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {isPolicyAllowed,rd} from "../../vendor/m2205.ts";
import {SOl,bOl} from "../../vendor/m5125.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {Oe,isTmuxControlMode,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {xp,Se,bt} from "../../vendor/m195.ts";
import {spawnBgSession,T5t} from "../session/5133_withStdinPositional.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {Lye,$ue,jft,A5t,y8e,vOl,rko,ROl,Wft} from "../session/5127_confirmed.ts";
import {p5t,qft,Y7n} from "../telemetry/5125_Y7n.ts";
import {$b,doe,QT} from "../../vendor/m642.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,Qe} from "../../vendor/m5.ts";
import {pO,MM} from "../../vendor/m126.ts";
import {b} from "../../runtime.ts";
import {u_o,CLAUDE_AGENT} from "./4452_CLAUDE_AGENT.ts";
/** Convert an agent definition to a minimal agent info object (name, description, initialPrompt, color). */
function IOl(agentDef: any): any {
  return {
    name: agentDef.agentType,
    description: agentDef.whenToUse,
    initialPrompt: agentDef.initialPrompt,
    color: agentDef.color
  };
}

/** Find an agent template by name from a list, or fall back to the default (fPe). */
function sko(agentConfig: any, agentList: any): any {
  if (!agentConfig?.agent) return fPe;
  let agentName = agentConfig.agent;
  return agentList?.find((item: any) => item.name.toLowerCase() === agentName.toLowerCase()) ?? {
    ...fPe,
    name: agentName
  };
}

/** Return all active custom agents as info objects. */
async function DOl(context: any): Promise<any> {
  let {
    activeAgents: activeAgents
  } = await getAgentDefinitionsWithOverrides(context);
  return activeAgents.filter(isCustomAgent).map(IOl);
}

/** Scan a directory and return a map of subdirectory names to their paths (only git repos). */
async function POl(dirPath: any): Promise<any> {
  let entries: any;
  try {
    entries = await $U.readdir(dirPath, {
      withFileTypes: !0
    });
  } catch {
    return {};
  }
  let subdirChecks = entries.filter((entry: any) => (entry.isDirectory() || entry.isSymbolicLink()) && !entry.name.startsWith(".") && !/\s/.test(entry.name)).map(async (entry: any) => {
      let fullPath = Vft.join(dirPath, entry.name);
      try {
        return await $U.stat(Vft.join(fullPath, ".git")), [entry.name, fullPath];
      } catch {
        return null;
      }
    }),
    gitRepos = (await Promise.all(subdirChecks)).filter((item: any) => item !== null);
  return Object.fromEntries(gitRepos);
}

/** Replace image placeholders in a prompt string with file paths, writing base64 images to disk if needed. */
async function iko(prompt: any, imageMap: any, sessionId: any): Promise<any> {
  let imageRefs = EF(prompt).filter((ref: any) => imageMap[ref.id]?.type === "image");
  if (imageRefs.length === 0) return prompt;
  let outputDir = vc(sessionId),
    result = prompt;
  for (let idx = imageRefs.length - 1; idx >= 0; idx--) {
    let ref = imageRefs[idx],
      imageEntry = imageMap[ref.id],
      sourcePath = imageEntry.sourcePath;
    if (!sourcePath) {
      await $U.mkdir(outputDir, {
        recursive: !0
      });
      let ext = (imageEntry.mediaType ?? "image/png").split("/")[1] ?? "png";
      sourcePath = Vft.join(outputDir, `pasted-${ref.id}.${ext}`), await $U.writeFile(sourcePath, imageEntry.content, {
        encoding: "base64"
      });
    }
    result = result.slice(0, ref.index) + sourcePath + result.slice(ref.index + ref.match.length);
  }
  return result;
}

/** Set the global base flags for background sessions. */
function OOl(flags: any): any {
  _5t = flags;
}

/** Get the global base flags for background sessions. */
function LOl(): any {
  return _5t;
}

/** Build CLI flag array from agent/task spawn options. */
function ako(options: any): any {
  if (!options) return [];
  return [...(options.model ? ["--model", options.model] : []), ...(options.effort ? ["--effort", options.effort] : []), ...(options.permissionMode ? ["--permission-mode", options.permissionMode] : []), ...(options.allowBypass ? ["--allow-dangerously-skip-permissions"] : []), ...(options.jsonSchema ? ["--json-schema", options.jsonSchema] : []), ...(options.appendSystemPrompt ? ["--append-system-prompt", options.appendSystemPrompt] : [])];
}

/** Dispatch a background agent/routine job, with retry on fast-fail and policy checks. */
async function Z7n(agentTemplate: any, intent: any, sessionId: any, cwd: any, routineName: any, spawnOptions: any): Promise<any> {
  if (routineName) {
    if (await waitForPolicyLimitsToLoad(), !isPolicyAllowed(SOl)) return {
      ok: !1,
      error: bOl
    };
  }
  logForDebugging("[PERF:bg-dispatch-start]");
  let jobSessionId = sessionId ?? g5t.randomUUID(),
    shortId = jobSessionId.slice(0, 8),
    jobCwd = cwd ?? Pt(),
    agentFlags = routineName ? ["--routine", routineName] : ["--agent", agentTemplate.name],
    allFlags = [..._5t, ...agentFlags, ...ako(spawnOptions)],
    jobDir = vc(shortId);
  try {
    await $U.mkdir(Vft.join(jobDir, "tmp"), {
      recursive: !0
    }), await Lp(jobDir, Uie({
      template: routineName ? {
        name: routineName,
        description: ""
      } : agentTemplate,
      routine: routineName,
      respawnFlags: allFlags,
      intent: intent,
      ...(routineName && !intent && {
        tempo: "idle",
        detail: "(idle — waiting for trigger)"
      }),
      sessionId: jobSessionId,
      cwd: jobCwd,
      originCwd: jobCwd
    }));
  } catch (writeErr) {
    return await $U.rm(jobDir, {
      recursive: !0,
      force: !0
    }).catch(() => {}), fC(jobDir), Oe("fleet_view_dispatch", "state_write_failed", {
      errno: xp(writeErr) ?? "unknown"
    }), {
      ok: !1,
      error: `Couldn't create the job — ${Se(writeErr)}`
    };
  }
  let spawnArgs = [...allFlags, ...(intent ? ["--", intent] : [])],
    dispatchStart = Date.now(),
    spawnResult = await spawnBgSession(spawnArgs, jobSessionId, "fleet", jobCwd),
    gateBlocked = !spawnResult.ok && spawnResult.reason === "gate_blocked";
  if (!spawnResult.ok && !spawnResult.alive && spawnResult.reason === "ack_timeout" && Date.now() - dispatchStart < 2000) logForDebugging(`bg: dispatch fast-failed (${Date.now() - dispatchStart}ms) — retrying once`, {
    level: "warn"
  }), await sleep(500), spawnResult = await spawnBgSession(spawnArgs, jobSessionId, "fleet", jobCwd);
  if (!spawnResult.ok) {
    if (spawnResult.alive) return isTmuxControlMode("fleet_view_dispatch", "alive_collision"), {
      ok: !1,
      error: spawnResult.error
    };
    if (!gateBlocked) await Lye(shortId).catch(() => {});
    return await $U.rm(jobDir, {
      recursive: !0,
      force: !0
    }).catch(() => {}), fC(jobDir), (spawnResult.reason === "gate_blocked" ? isTmuxControlMode : Oe)("fleet_view_dispatch", spawnResult.reason ?? "spawn_failed"), {
      ok: !1,
      error: spawnResult.error,
      reason: spawnResult.reason
    };
  }
  if (logForDebugging("[PERF:bg-dispatch-end]"), spawnResult.rescued) isTmuxControlMode("fleet_view_dispatch", "rescued");else Ie("fleet_view_dispatch");
  return {
    ok: !0,
    jobId: spawnResult.short,
    sessionId: jobSessionId
  };
}

/** Always returns true (spare job eligibility stub). */
function y5t(): any {
  return !0;
}

/** Dispatch an exec-mode background job (runs a shell command directly). */
async function MOl(intent: any, sessionId: any, cwd: any): Promise<any> {
  let jobSessionId = sessionId ?? g5t.randomUUID(),
    shortId = jobSessionId.slice(0, 8),
    jobCwd = cwd ?? Pt(),
    jobDir = vc(shortId);
  try {
    await $U.mkdir(Vft.join(jobDir, "tmp"), {
      recursive: !0
    }), await Lp(jobDir, Uie({
      template: thm,
      intent: intent,
      sessionId: jobSessionId,
      cwd: jobCwd,
      originCwd: jobCwd
    }));
  } catch (writeErr) {
    return await $U.rm(jobDir, {
      recursive: !0,
      force: !0
    }).catch(() => {}), fC(jobDir), Oe("fleet_view_dispatch_exec", "state_write_failed", {
      errno: xp(writeErr) ?? "unknown"
    }), {
      ok: !1,
      error: `Couldn't create the job — ${Se(writeErr)}`
    };
  }
  let spawnResult = await spawnBgSession([], jobSessionId, "fleet", jobCwd, {
    intent: intent,
    exec: intent
  });
  if (!spawnResult.ok) {
    if (spawnResult.alive) return isTmuxControlMode("fleet_view_dispatch_exec", "alive_collision"), {
      ok: !1,
      error: spawnResult.error
    };
    return await Lye(shortId).catch(() => {}), await $U.rm(jobDir, {
      recursive: !0,
      force: !0
    }).catch(() => {}), fC(jobDir), Oe("fleet_view_dispatch_exec", spawnResult.reason ?? "spawn_failed"), {
      ok: !1,
      error: spawnResult.error,
      reason: spawnResult.reason
    };
  }
  return Ie("fleet_view_dispatch_exec"), {
    ok: !0,
    jobId: spawnResult.short,
    sessionId: jobSessionId
  };
}

/** Get the current warm spare job (or null if none). */
function lko(): any {
  return Mye;
}

/** Mark the warm spare session as ready (if session ID matches). */
function NOl(sessionId: any): any {
  if (Mye?.sessionId === sessionId) Mye.ready = !0;
}

/** Ensure a warm spare background session exists; no-op if one is already spawning or ready. */
async function eKn(context: any, reset: boolean = !1, spawnOptions: any): Promise<any> {
  if (reset) Q7n = !1;
  if (Mye || Gft || Q7n) return;
  if (p5t()) {
    isTmuxControlMode("job_spare_ensure", "low_mem");
    return;
  }
  let spareSessionId = g5t.randomUUID(),
    spareShortId = spareSessionId.slice(0, 8);
  logForDebugging(`[PERF:bg-spare-start] ${spareShortId}`), Gft = (async () => {
    try {
      let spareCwd = await $b(context),
        spawnResult = await spawnBgSession([..._5t, "--agent", spawnOptions?.agent ?? fPe.name, ...ako(spawnOptions)], spareSessionId, "spare", spareCwd);
      if (!spawnResult.ok) {
        await $ue(spareShortId, {
          internal: !0
        }).catch(() => {}), (spawnResult.reason === "gate_blocked" ? isTmuxControlMode : Oe)("job_spare_ensure", spawnResult.reason ?? "spawn_failed");
        return;
      }
      if (Q7n) {
        await $ue(spareShortId, {
          internal: !0
        }), isTmuxControlMode("job_spare_ensure", "discarded_after_spawn");
        return;
      }
      Mye = {
        jobId: spareShortId,
        sessionId: spareSessionId,
        cwd: spareCwd,
        ready: !1,
        defaults: spawnOptions
      }, logForDebugging(`[PERF:bg-spare-spawned] ${spareShortId}`), Ie("job_spare_ensure");
    } catch {
      await $ue(spareShortId, {
        internal: !0
      }).catch(() => {}), Oe("job_spare_ensure", "threw");
    }
  })();
  try {
    await Gft;
  } finally {
    Gft = null;
  }
}

/** Claim the warm spare for a new intent, falling back to a fresh dispatch on any mismatch. */
async function BOl(intent: any, agentOverride: any): Promise<any> {
  logForDebugging("[PERF:bg-claim-start]");
  let spareJob = Mye;
  Mye = null;
  let agentTemplate = agentOverride ?? sko(spareJob?.defaults),
    onMiss = async (reason: any, detail: any) => {
      if (logForDebugging(`[bg-spare] claim miss (${reason})${detail ? `: ${detail}` : ""}`), logEvent("tengu_bg_spare_claim_fail", {
        reason: fromEnum(reason)
      }), spareJob) {
        let {
          removed: removed,
          error: deleteError
        } = await $ue(spareJob.jobId, {
          internal: !0,
          knownGone: reason === "enojob"
        });
        if (!removed) return Oe("job_claim_spare", "job_claim_spare_delete_failed"), logForDebugging(`[bg-spare] deleteJob unconfirmed (${deleteError ?? "unknown"}) — cold-dispatching with fresh sessionId; spare ${spareJob.jobId} dir preserved`, {
          level: "warn"
        }), Z7n(agentTemplate, intent, void 0, spareJob.cwd, void 0, spareJob.defaults);
      }
      return isTmuxControlMode("job_claim_spare", reason), Z7n(agentTemplate, intent, spareJob?.sessionId, spareJob?.cwd, void 0, spareJob?.defaults);
    };
  if (!spareJob) return onMiss("no-spare");
  let newState = jft(Uie({
    template: agentTemplate,
    respawnFlags: [..._5t, "--agent", agentTemplate.name, ...ako(spareJob.defaults)],
    intent: intent,
    sessionId: spareJob.sessionId,
    cwd: spareJob.cwd,
    originCwd: spareJob.cwd
  }), intent);
  try {
    let claimResult = await A5t(spareJob.jobId, intent, void 0, newState);
    if (claimResult) return onMiss(claimResult.err === y8e ? "enojob" : "reply", claimResult.err);
  } catch (claimErr) {
    return onMiss("reply-throw", Se(claimErr));
  }
  return await Lp(vc(spareJob.jobId), newState).catch(kA), logForDebugging("[PERF:bg-claim-end]"), Ie("job_claim_spare"), Ie("fleet_view_dispatch"), {
    ok: !0,
    jobId: spareJob.jobId,
    sessionId: spareJob.sessionId
  };
}

/** Discard the warm spare session (cancel pending spawn and delete the spare job). */
async function FOl(): Promise<any> {
  if (Q7n = !0, Gft) await Gft.catch(() => {});
  let spareSnapshot = Mye;
  if (Mye = null, spareSnapshot) await $ue(spareSnapshot.jobId, {
    internal: !0
  });
}

/** Respawn a stopped/failed background job by its short ID, reusing transcript and queued prompt where available. */
async function Kft(shortId: any, options: any): Promise<any> {
  if (options?.knownAlive && options.knownState && !options.force) return {
    ok: !1,
    alive: !0,
    short: options.knownState.daemonShort ?? shortId,
    state: options.knownState,
    error: `Session ${shortId} is already running`
  };
  let jobDir = vc(shortId),
    savedState = options?.knownState ?? (await ma(jobDir));
  if (!savedState) return Oe("job_respawn", "job_respawn_state_missing"), {
    ok: !1,
    error: "Can't respawn — that job's saved state is missing",
    alive: !1
  };
  let daemonShort = savedState.daemonShort ?? shortId,
    probeStart = Date.now(),
    probeResult = await vOl(daemonShort),
    probeMs = Date.now() - probeStart,
    isAlive = probeResult.alive;
  if (!options?.force && isAlive) return {
    ok: !1,
    alive: !0,
    short: daemonShort,
    state: savedState,
    error: `Session ${shortId} is already running`
  };
  if (!options?.force && $we(savedState)) {
    if (probeResult.daemonUp && probeResult.present) return {
      ok: !1,
      alive: !0,
      short: daemonShort,
      state: savedState,
      error: `Session ${shortId} has exited; attach shows the captured output`
    };
    return isTmuxControlMode("job_respawn", "exec_output_expired"), {
      ok: !1,
      alive: !1,
      state: savedState,
      error: "Output no longer available — this shell command has exited"
    };
  }
  if (options?.knownState) fC(jobDir);
  let freshState = options?.knownState ? (await ma(jobDir)) ?? savedState : savedState,
    freshDaemonShort = freshState.daemonShort ?? shortId,
    newSessionId = freshState.resumeSessionId ?? (pO(savedState.sessionId) !== null ? savedState.sessionId : g5t.randomUUID()),
    killStart = Date.now(),
    killMs = 0,
    waitMs = 0,
    linkScanPromise = null,
    docPromise = null,
    skipCeremony = probeResult.daemonUp && !probeResult.alive && !probeResult.present && freshDaemonShort === daemonShort;
  if (skipCeremony) linkScanPromise = rko(freshDaemonShort), docPromise = doe(newSessionId, savedState.cwd, freshState.linkScanPath);else {
    let killResult = await Lye(freshDaemonShort, savedState);
    if (killMs = Date.now() - killStart, isAlive && !killResult.confirmed) return logEvent("tengu_bg_respawn_unconfirmed_bail", {}), isTmuxControlMode("job_respawn", "job_respawn_kill_unconfirmed"), {
      ok: !1,
      alive: isAlive,
      short: freshDaemonShort,
      state: savedState,
      error: killResult.error ?? "Couldn't stop the previous worker — supervisor may be starting, retry in a moment"
    };
    let waitStart = Date.now(),
      waitDeadline = waitStart + 3000;
    while (Date.now() < waitDeadline) {
      if (!(await ROl(freshDaemonShort))) break;
      await sleep(100);
    }
    waitMs = Date.now() - waitStart;
  }
  let transcriptStart = Date.now(),
    transcriptResult = await (docPromise ?? doe(newSessionId, savedState.cwd, freshState.linkScanPath)),
    transcriptMs = Date.now() - transcriptStart;
  if (linkScanPromise) {
    let linkStart = Date.now(),
      linkResult = await linkScanPromise;
    if (killMs = Date.now() - linkStart, linkResult.anyMatch) transcriptResult = await doe(newSessionId, savedState.cwd, freshState.linkScanPath);
  }
  let hasMessages = transcriptResult.hasMessages;
  if (!hasMessages) logEvent("tengu_bg_respawn_no_transcript", {
    via: fromEnum(transcriptResult.via),
    had_link_scan_path: freshState.linkScanPath !== void 0
  }), await $U.rm(transcriptResult.path, {
    force: !0
  }).catch(() => {});
  let execIntent = savedState.template === "exec" && savedState.respawnFlags.length === 0 ? savedState.intent : void 0,
    parsedRespawnFlags = qft(freshState.respawnFlags),
    respawnArgs = execIntent ? [] : parsedRespawnFlags.length > 0 ? parsedRespawnFlags : savedState.routine ? ["--routine", savedState.routine] : savedState.template !== "bg" ? ["--agent", savedState.template] : [],
    initialPrompt = execIntent ? void 0 : options?.initialPrompt ?? freshState.queuedPrompt ?? (hasMessages ? void 0 : savedState.intent),
    spawnArgs = [...(hasMessages && !execIntent ? ["--resume", newSessionId] : []), ...respawnArgs, ...(initialPrompt ? ["--", initialPrompt] : [])],
    bridgeInfo = Bwe(freshState.bridgeSessionId, freshState.bridgeSessionSeq, freshState.bridgeOutboundOnly),
    dispatchStart = Date.now(),
    extraSpawnOpts = execIntent || savedState.bgIsolation === "none" || savedState.providerEnv || savedState.sessionPermissionRules || savedState.memoryToggledOff ? {
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
        memoryToggledOff: !0
      })
    } : void 0,
    spawnResult = await spawnBgSession(spawnArgs, newSessionId, "fleet", savedState.cwd, extraSpawnOpts, bridgeInfo, shortId);
  if (!spawnResult.ok && !spawnResult.alive && spawnResult.reason === "ack_timeout" && Date.now() - dispatchStart < 2000) logForDebugging(`bg: respawn dispatch fast-failed (${Date.now() - dispatchStart}ms) — retrying once`, {
    level: "warn"
  }), await sleep(500), spawnResult = await spawnBgSession(spawnArgs, newSessionId, "fleet", savedState.cwd, extraSpawnOpts, bridgeInfo, shortId);
  let dispatchMs = Date.now() - dispatchStart,
    totalMs = Date.now() - probeStart;
  if (logForDebugging(`[PERF:respawn] ${shortId}: total=${totalMs}ms probe=${probeMs}ms kill=${killMs}ms${skipCeremony ? " (ceremony skipped)" : ""} wait=${waitMs}ms transcript=${transcriptMs}ms dispatch=${dispatchMs}ms ok=${spawnResult.ok}`), logEvent("tengu_bg_respawn", {
    total_ms: totalMs,
    probe_ms: probeMs,
    kill_ms: killMs,
    wait_ms: waitMs,
    transcript_ms: transcriptMs,
    dispatch_ms: dispatchMs,
    skipped_kill: skipCeremony,
    daemon_up: probeResult.daemonUp,
    was_present: probeResult.present,
    forced: options?.force === !0,
    ok: spawnResult.ok
  }), !spawnResult.ok) {
    if (spawnResult.alive) isTmuxControlMode("job_respawn", "already_alive");else Oe("job_respawn", "job_respawn_spawn_failed");
    let queued = !1;
    if (!spawnResult.alive && options?.initialPrompt) {
      let updatedState = {
        ...freshState,
        queuedPrompt: options.initialPrompt,
        updatedAt: new Date().toISOString()
      };
      queued = await Lp(jobDir, updatedState).then(() => !0, saveErr => (kA(saveErr), !1));
    }
    return {
      ok: !1,
      error: spawnResult.error,
      alive: spawnResult.alive ?? !1,
      short: spawnResult.short,
      state: savedState,
      queued: queued
    };
  }
  logEvent("tengu_bg_agent_action", {
    action: Qe("respawn"),
    agent: savedState.template,
    wasSettled: pg(savedState)
  }), fC(jobDir);
  let latestState = (await ma(jobDir)) ?? freshState;
  if (latestState.state === "failed" && latestState.updatedAt > freshState.updatedAt) return isTmuxControlMode("job_respawn", "crashed_during_spawn"), {
    ok: !0,
    short: spawnResult.short,
    state: latestState
  };
  let stateWithPrompt = initialPrompt ? jft(latestState, initialPrompt) : latestState,
    wasTerminal = freshState.state === "failed" || freshState.state === "stopped" || !!execIntent,
    updatedStateObj = {
      ...stateWithPrompt,
      state: wasTerminal ? "starting" : freshState.state,
      ...(initialPrompt ? {
        inFlight: void 0
      } : {
        ...(!wasTerminal && freshState.tempo === "active" ? WH(freshState.state) || freshState.routine ? {
          tempo: "idle"
        } : {
          tempo: "blocked",
          needs: Q4,
          ...(Ret.includes(freshState.state) && {
            state: "working"
          })
        } : {
          tempo: wasTerminal ? "idle" : freshState.tempo
        }),
        detail: wasTerminal ? "" : freshState.detail,
        inFlight: {
          tasks: 0,
          queued: 0,
          kinds: []
        }
      }),
      ...(hasMessages ? {} : {
        firstTerminalAt: null
      }),
      daemonShort: spawnResult.short,
      queuedPrompt: void 0,
      updatedAt: new Date().toISOString(),
      backend: "daemon"
    };
  return await Lp(jobDir, updatedStateObj).catch(kA), Ie("job_respawn"), {
    ok: !0,
    short: spawnResult.short,
    state: updatedStateObj
  };
}
var g5t,
  $U,
  Vft,
  fPe,
  _5t,
  thm,
  Mye = null,
  Gft = null,
  Q7n = !1;
var cko = b(() => {
  T5t();
  Y7n();
  K4();
  ln();
  Ct();
  zF();
  rd();
  u_o();
  scrubPathsConfig();
  Go();
  qe();
  bt();
  QT();
  MM();
  Wft();
  mg();
  g5t = require("crypto"), $U = require("fs/promises"), Vft = require("path");
  fPe = IOl(CLAUDE_AGENT);
  _5t = [];
  thm = {
    name: "exec",
    description: ""
  };
});
export {IOl,sko,DOl,POl,iko,OOl,LOl,ako,Z7n,y5t,MOl,lko,NOl,eKn,BOl,FOl,Kft,g5t,$U,Vft,fPe,_5t,thm,Mye,Gft,Q7n,cko};
