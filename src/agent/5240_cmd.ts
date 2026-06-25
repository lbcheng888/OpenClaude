// @ts-nocheck
import {RB,Y_e} from "../../vendor/m3873.ts";
import {Tx,sWt,oWt,iWt,aht,uN,CTe,CL} from "../../vendor/m4609.ts";
import {YQn,s8l} from "../telemetry/5238_skipCache.ts";
import {yR,zf} from "../../vendor/m133.ts";
import {J8,U2e,i8r} from "../../vendor/m2589.ts";
import {iGe} from "../telemetry/5155_qJn.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {kOt,wOt,F2e,vOt,r8r,o8r} from "./2589_F2e.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce,cn,In,Ct} from "../../vendor/m197.ts";
import {nt,Ni} from "../../vendor/m127.ts";
import {kVt,jDo} from "../../vendor/m5149.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Oi,ec,Tg,Ewe,Pf} from "./2591_level.ts";
import {Le,Ve,Bo} from "../../vendor/m5.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {getProcessStartTimeAsync as mF,getProcessStartTime as Mme,lE} from "../../vendor/m1461.ts";
import {QMo,Z5l} from "../../vendor/m5236.ts";
import {WJn,aGe,MVt} from "../../vendor/m5155.ts";
import {cc} from "../../vendor/m2459.ts";
import {VUe,yve,dO} from "../../vendor/m2278.ts";
import {coe,VT} from "../../vendor/m648.ts";
import {NG,rue,bL} from "../../vendor/m4515.ts";
import {S8t,F8e} from "../../vendor/m4514.ts";
import {readAndClearBgExitCause as Ccr,mK} from "../../vendor/m231.ts";
import {c8l,u8l} from "../telemetry/5239_proto.ts";
import {b} from "../../runtime.ts";
import {dn} from "../config/0137_namespace.ts";
import {ig} from "../../vendor/m130.ts";
// Spawns a background PTY process and returns the PTY handle
function t1o() {
  return (execPath: any, execArgs: any, spawnOpts: any) => {
    let {
        cmd: binCmd,
        prefixArgs: binPrefixArgs
      } = RB({
        pinToCurrentBinary: !0
      }),
      stderrFd: any;
    try {
      stderrFd = F_t.openSync(Tx(spawnOpts.ptySock), "w");
    } catch {}
    try {
      let proc = Bun.spawn([binCmd, ...binPrefixArgs, "--bg-pty-host", spawnOpts.ptySock, String(spawnOpts.cols), String(spawnOpts.rows), "--", execPath, ...execArgs], {
        cwd: spawnOpts.cwd,
        env: spawnOpts.env,
        stdio: ["ignore", "ignore", stderrFd ?? "ignore"],
        detached: !0,
        windowsHide: !0
      });
      return proc.unref(), YQn(spawnOpts.ptySock, proc.pid, void 0, spawnOpts.short, proc, spawnOpts.ptyAuth);
    } finally {
      if (stderrFd !== void 0) F_t.closeSync(stderrFd);
    }
  };
}

// Builds the argv array for spawning the background worker
function _8l(dispatchSpec: any, attemptNum: any, hasMessages: any, sessionId: any, respawnFlags: any) {
  if (dispatchSpec.launch.mode === "exec") return dispatchSpec.launch.args.map(yR);
  if (attemptNum > 1 && hasMessages) return J8(["--resume", sessionId, ...iGe(respawnFlags)]);
  if (attemptNum > 1 && sessionId !== dispatchSpec.sessionId) return J8(["--session-id", sessionId, ...iGe(respawnFlags)]);
  if (dispatchSpec.launch.mode === "resume") return J8([...(dispatchSpec.launch.fork ? ["--session-id", dispatchSpec.sessionId, "--fork-session"] : []), "--resume", dispatchSpec.launch.sessionId, ...iGe(dispatchSpec.launch.flagArgs)]);
  return J8(iGe(dispatchSpec.launch.args));
}

// Builds the environment variables object for a background worker process
function y8l(dispatchSpec: any, jobDir: any, authSnapshotPath: any, rendezvousSockPath: any, socketTokens: any) {
  let baseEnv: any = {
      ...process.env
    },
    workerEnv: any = {
      ...baseEnv,
      ...(authSnapshotPath && {
        CLAUDE_BG_AUTH_SNAPSHOT_PATH: authSnapshotPath
      }),
      ...(Yt() === "windows" && {
        CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT: "1"
      }),
      ...dispatchSpec.env,
      CLAUDE_CODE_SESSION_KIND: "bg",
      CLAUDE_BG_BACKEND: "daemon",
      CLAUDE_ENABLE_STREAM_WATCHDOG: "1",
      CLAUDE_BG_SOURCE: dispatchSpec.source,
      CLAUDE_JOB_DIR: jobDir,
      CLAUDE_CODE_SESSION_NAME: dispatchSpec.seed?.name || dispatchSpec.seed?.intent || dispatchSpec.short,
      CLAUDE_BG_RENDEZVOUS_SOCK: rendezvousSockPath,
      FORCE_COLOR: "3",
      COLORTERM: "truecolor",
      BROWSER: "true"
    };
  if (process.env.CLAUDE_CONFIG_DIR) workerEnv.CLAUDE_CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR;
  if (dispatchSpec.isolation === "worktree") workerEnv.CLAUDE_BG_ISOLATION = "worktree";
  // Strip terminal/session env vars that shouldn't leak into bg worker
  for (let envKey of o1o) if (!dispatchSpec.env?.[envKey]) delete workerEnv[envKey];
  for (let envKey of s1o) if (!dispatchSpec.env?.[envKey]) delete workerEnv[envKey];
  for (let envKey of Object.keys(workerEnv)) if (kOt.some((prefix: any) => envKey.startsWith(prefix)) && !dispatchSpec.env?.[envKey]) delete workerEnv[envKey];
  if (i1o(baseEnv)) {
    // Host-managed auth: strip credential env vars
    for (let authKey of wOt) delete workerEnv[authKey];
    let hostAuthEnvVar = baseEnv.CLAUDE_CODE_HOST_AUTH_ENV_VAR;
    if (hostAuthEnvVar) delete workerEnv[hostAuthEnvVar];
  } else if (baseEnv.ANTHROPIC_BASE_URL) delete workerEnv.ANTHROPIC_AUTH_TOKEN;
  if (socketTokens) workerEnv.CLAUDE_BG_RV_AUTH = socketTokens.rvAuth, workerEnv.CLAUDE_BG_PTY_AUTH = socketTokens.ptyAuth;
  if (authSnapshotPath) delete workerEnv.CLAUDE_CODE_OAUTH_TOKEN;
  if (dispatchSpec.launch.mode === "exec") {
    // exec mode: strip most CLAUDE_* vars to run arbitrary commands cleanly
    for (let envKey of Object.keys(workerEnv)) if (envKey.startsWith("CLAUDE_") && envKey !== "CLAUDE_JOB_DIR" && envKey !== "CLAUDE_CONFIG_DIR" && envKey !== "CLAUDE_BG_PTY_AUTH" || envKey.startsWith("OTEL_")) delete workerEnv[envKey];
    delete workerEnv.BROWSER, workerEnv.CLAUDE_PTY_HOST_EXEC = "1";
  }
  return workerEnv;
}

// Writes an auth snapshot file (macOS only) and returns its path
async function n1o(shortId: any, authSnapshot: any) {
  if (!authSnapshot || Yt() !== "macos") return;
  let snapshotPath = sWt(shortId);
  try {
    return await dV.mkdir(oWt(), {
      recursive: !0,
      mode: 448
    }), await dV.writeFile(snapshotPath, JSON.stringify(authSnapshot), {
      mode: 384
    }), snapshotPath;
  } catch (err: any) {
    A(`writeAuthSnapshot failed: ${Ce(err)}`, {
      level: "warn"
    });
    return;
  }
}

// Writes a socket tokens file (non-Windows) and returns its path
async function r1o(shortId: any, socketTokensData: any) {
  if (Yt() === "windows") return;
  let tokensFilePath = iWt(shortId);
  try {
    return await dV.mkdir(oWt(), {
      recursive: !0,
      mode: 448
    }), await dV.writeFile(tokensFilePath, JSON.stringify(socketTokensData), {
      mode: 384
    }), tokensFilePath;
  } catch (err: any) {
    A(`writeSocketTokensFile failed: ${Ce(err)}`, {
      level: "warn"
    });
    return;
  }
}

// Returns true if authentication is managed by the host process (unix socket, managed auth, or host env var)
function i1o(envVars: any) {
  return !!envVars.ANTHROPIC_UNIX_SOCKET || nt(envVars.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) || !!envVars.CLAUDE_CODE_HOST_AUTH_ENV_VAR;
}

// Serializes a worker phase for debug logging
function T8l(workerPhase: any) {
  return workerPhase.kind === "retiring" ? `retiring:${workerPhase.reason}` : workerPhase.kind === "retired" ? `retired:${workerPhase.outcome}` : workerPhase.kind;
}

// Returns true if transitioning from currentPhase to nextPhase is a legal state machine move
function kDm(currentPhase: any, nextPhase: any) {
  if (currentPhase.kind === "retired") return !1;
  switch (nextPhase.kind) {
    case "spawning":
      return currentPhase.kind === "upgrading" || currentPhase.kind === "running";
    case "running":
      return currentPhase.kind === "spawning";
    case "upgrading":
      return currentPhase.kind === "running";
    case "retiring":
      return !0;
    case "retired":
      return !0;
  }
}

// Background worker manager: tracks a single spawned daemon process and its PTY connection
class uV {
  dispatch: any;
  spawnPty: any;
  getAuthSnapshot: any;
  via: any;
  record: any;
  onStream = Ni();
  onState = Ni();
  onSettle = Ni();
  onRepaintDone = Ni();
  attachers = new Map();
  lastInputAttacher: any;
  pty: any;
  procStart: any;
  ptyCols = 200;
  ptyRows = 50;
  decModes = kVt();
  execTracker: any;
  execLastLine: any;
  offData: any;
  offExit: any;
  ring: any[] = [];
  ringBytes = 0;
  ringSpawnMark = 0;
  attempt = 0;
  lastSpawnAt = 0;
  fastCrashStreak = 0;
  lastExitCause: any;
  backoffTimer: any = null;
  pidPoll: any = null;
  rv: any;
  rvSockPath: any;
  ptySockPath: any;
  rvAuth = e1o.randomBytes(16).toString("hex");
  ptyAuth = e1o.randomBytes(16).toString("hex");
  unverifiedSock: any;
  phase: any = {
    kind: "spawning"
  };
  workerReady = !1;
  resizeDeferred = !1;
  lastInputAt: any;
  deleteJobDirOnSettle = !1;
  get shouldDeleteJobDir() {
    return this.deleteJobDirOnSettle;
  }
  adoptedAt: any;
  lastRvHeartbeat: any;
  stalledLogged = !1;
  lastCheckPidAt = Date.now();
  replyChain = Promise.resolve();
  killOutcome: any = "killed";
  get isKilling() {
    return this.phase.kind === "retiring" && this.phase.reason === "reap";
  }
  get isRetiring() {
    return this.phase.kind === "retiring" && this.phase.reason === "grace";
  }
  get isBooting() {
    return !this.record.outcome && (this.phase.kind === "upgrading" || !this.workerReady);
  }
  get isUnverified() {
    return this.unverifiedSock !== void 0;
  }
  getPhase() {
    return this.phase;
  }
  get isTransitioning() {
    return this.phase.kind !== "running" || !this.pty || this.record.pid === 0;
  }
  get isDetached() {
    return this.phase.kind === "retiring" && this.phase.reason === "stop";
  }

  // Validates and applies a phase transition; logs and returns false if illegal
  transitionTo(nextPhase: any) {
    if (!kDm(this.phase, nextPhase)) return A(`[bg] illegal worker-phase transition ${T8l(this.phase)} → ${T8l(nextPhase)} for ${this.record.short}`, {
      level: "warn"
    }), W("tengu_bg_phase_illegal", {}), !1;
    return this.phase = nextPhase, !0;
  }

  // Asks the worker to shut down gracefully via rendezvous; falls back to SIGTERM after 5s
  shutdownWorker() {
    let rvSent = this.rv?.send({
      type: "shutdown"
    }) ?? !1;
    if (!rvSent) this.sigtermWorker();else setTimeout((workerRef: any) => {
      let currentPhase = workerRef.phase;
      if ((currentPhase.kind === "upgrading" || currentPhase.kind === "retiring" && currentPhase.reason === "grace") && !workerRef.record.outcome) workerRef.sigtermWorker();
    }, 5000, this).unref();
    return rvSent;
  }

  // Respawns the worker if it's running a stale CLI version and is currently idle
  async respawnIfIdleStale(pinnedShorts: any, trigger: any = "sweep") {
    if (this.dispatch.launch.mode === "exec") return {
      respawned: !1,
      reason: "not-stale"
    };
    if (this.isTransitioning) return {
      respawned: !1,
      reason: "in-progress"
    };
    if (this.record.outcome) return {
      respawned: !1,
      reason: "no-state"
    };
    if (this.attachers.size > 0) return {
      respawned: !1,
      reason: "attached"
    };
    if (!this.record.cliVersion || this.record.cliVersion === {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION) return {
      respawned: !1,
      reason: "not-stale"
    };
    if (trigger !== "attach" && this.lastInputAt && Date.now() - this.lastInputAt < wDm) return {
      respawned: !1,
      reason: "busy"
    };
    let checkTimestamp = Date.now(),
      sessionState = await Oi(ec(this.dispatch.short));
    if (this.isTransitioning) return {
      respawned: !1,
      reason: "in-progress"
    };
    if (this.record.outcome) return {
      respawned: !1,
      reason: "no-state"
    };
    if (this.attachers.size > 0) return {
      respawned: !1,
      reason: "attached"
    };
    if (this.lastInputAt && this.lastInputAt >= checkTimestamp) return {
      respawned: !1,
      reason: "busy"
    };
    if (!sessionState) return {
      respawned: !1,
      reason: "no-state"
    };
    if (Tg(sessionState) && trigger === "sweep" && !pinnedShorts?.has(this.dispatch.short)) return {
      respawned: !1,
      reason: "settled"
    };
    if (!Tg(sessionState) && sessionState.tempo !== "idle") return {
      respawned: !1,
      reason: "busy"
    };
    let inFlightKinds = sessionState.inFlight?.kinds ?? [],
      onlyRetirableInFlight = Tg(sessionState) && inFlightKinds.length > 0 && inFlightKinds.every((kind: any) => h8l.includes(kind));
    if ((sessionState.inFlight?.queued ?? 0) > 0 || (sessionState.inFlight?.tasks ?? 0) > 0 && !onlyRetirableInFlight || inFlightKinds.includes("session_cron")) return {
      respawned: !1,
      reason: "inflight"
    };
    if (!this.transitionTo({
      kind: "upgrading"
    })) return {
      respawned: !1,
      reason: "in-progress"
    };
    return this.onState.emit({
      pid: this.record.pid
    }), W("tengu_bg_respawn_stale", {
      short: this.dispatch.short,
      rvSent: this.shutdownWorker(),
      trigger: Le(trigger)
    }), {
      respawned: !0
    };
  }

  // Retires (gracefully stops) a settled worker after it has been idle long enough
  async retireIfSettled(graceMs: any, pinnedShorts: any, bridgeGraceMs: any = graceMs) {
    if (this.isTransitioning) return {
      retired: !1,
      reason: "in-progress"
    };
    if (this.record.outcome) return {
      retired: !1,
      reason: "no-state"
    };
    if (this.attachers.size > 0) return {
      retired: !1,
      reason: "attached"
    };
    if (pinnedShorts?.has(this.dispatch.short)) return {
      retired: !1,
      reason: "pinned"
    };
    if (this.adoptedAt && Date.now() - this.adoptedAt < RDm) return {
      retired: !1,
      reason: "recent-adopt"
    };
    if (this.lastInputAt && Date.now() - this.lastInputAt < graceMs) return {
      retired: !1,
      reason: "recent-input"
    };
    let sessionState = await Oi(ec(this.dispatch.short));
    if (this.isTransitioning || this.attachers.size > 0) return {
      retired: !1,
      reason: "in-progress"
    };
    if (this.lastInputAt && Date.now() - this.lastInputAt < graceMs) return {
      retired: !1,
      reason: "recent-input"
    };
    if (!sessionState) {
      // Spare worker with no session state: retire if old enough
      if (this.dispatch.source === "spare" && Date.now() - this.dispatch.createdAt > graceMs) {
        if (!this.transitionTo({
          kind: "retiring",
          reason: "grace"
        })) return {
          retired: !1,
          reason: "in-progress"
        };
        return W("tengu_bg_retired", {
          short: this.dispatch.short,
          rvSent: this.shutdownWorker(),
          settledForMs: Date.now() - this.dispatch.createdAt,
          state: Ve("stale-spare")
        }), {
          retired: !0
        };
      }
      return {
        retired: !1,
        reason: "no-state"
      };
    }
    if (this.dispatch.source !== "shell" && !sessionState.name && !sessionState.intent && !sessionState.worktreePath && sessionState.template === "bg" && sessionState.state === "working" && sessionState.tempo === "blocked") {
      // Empty bg session idle too long: retire it and clean up
      let ageMsEmpty = Date.now() - Date.parse(sessionState.createdAt);
      if (ageMsEmpty < vDm) return {
        retired: !1,
        reason: "empty-idle-grace"
      };
      if (!this.transitionTo({
        kind: "retiring",
        reason: "grace"
      })) return {
        retired: !1,
        reason: "in-progress"
      };
      return this.deleteJobDirOnSettle = !0, W("tengu_bg_retired", {
        short: this.dispatch.short,
        rvSent: this.shutdownWorker(),
        settledForMs: ageMsEmpty,
        state: Ve("empty-idle")
      }), {
        retired: !0
      };
    }
    if (!(Tg(sessionState) || this.dispatch.launch.mode !== "exec" && (sessionState.tempo === "idle" || sessionState.state === "blocked" && sessionState.tempo === "blocked"))) return {
      retired: !1,
      reason: "not-settled"
    };
    let inFlightKinds = sessionState.inFlight?.kinds ?? [],
      onlyRetirableInFlight = Tg(sessionState) && inFlightKinds.length > 0 && inFlightKinds.every((kind: any) => h8l.includes(kind));
    if ((sessionState.inFlight?.queued ?? 1) > 0 || (sessionState.inFlight?.tasks ?? 1) > 0 && !onlyRetirableInFlight) return {
      retired: !1,
      reason: "inflight"
    };
    if (inFlightKinds.includes("session_cron")) return {
      retired: !1,
      reason: "session-cron"
    };
    if (sessionState.routine) return {
      retired: !1,
      reason: "routine"
    };
    let effectiveGraceMs = sessionState.bridgeSessionId ? Math.max(graceMs, bridgeGraceMs) : graceMs,
      settledForMs = sessionState.updatedAt && Date.now() - Date.parse(sessionState.updatedAt);
    if (!settledForMs || settledForMs < effectiveGraceMs) return {
      retired: !1,
      reason: "grace"
    };
    if (!this.transitionTo({
      kind: "retiring",
      reason: "grace"
    })) return {
      retired: !1,
      reason: "in-progress"
    };
    return W("tengu_bg_retired", {
      short: this.dispatch.short,
      rvSent: this.shutdownWorker(),
      settledForMs: settledForMs,
      bridged: !!sessionState.bridgeSessionId,
      detritusOnly: onlyRetirableInFlight,
      state: sessionState.state
    }), {
      retired: !0
    };
  }

  // Sends SIGTERM to the PTY process
  sigtermWorker() {
    try {
      this.pty?.kill("SIGTERM");
    } catch {}
  }
  constructor(dispatchSpec: any, spawnPtyFn: any, getAuthSnapshotFn: any, viaLabel: any, initialRecordFields: any) {
    this.dispatch = dispatchSpec;
    this.spawnPty = spawnPtyFn;
    this.getAuthSnapshot = getAuthSnapshotFn;
    this.via = viaLabel;
    if (this.record = {
      short: dispatchSpec.short,
      nonce: dispatchSpec.nonce,
      sessionId: dispatchSpec.sessionId,
      pid: 0,
      attempt: 0,
      startedAt: Date.now(),
      cwd: dispatchSpec.cwd,
      backend: "daemon",
      tempo: "active",
      state: "starting",
      detail: "",
      intent: dispatchSpec.seed?.intent ?? "",
      name: dispatchSpec.seed?.name,
      agent: dispatchSpec.agent,
      routine: dispatchSpec.routine,
      worktreePath: dispatchSpec.worktree?.path,
      cliVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      source: dispatchSpec.source,
      ...initialRecordFields
    }, dispatchSpec.cols) this.ptyCols = dispatchSpec.cols;
    if (dispatchSpec.rows) this.ptyRows = dispatchSpec.rows;
  }

  // Creates and immediately starts spawning a new background worker
  static spawn(dispatchSpec: any, spawnPtyFn: any, getAuthSnapshotFn: any, spawnOpts: any) {
    let workerInstance = new uV(dispatchSpec, spawnPtyFn ?? t1o(), getAuthSnapshotFn, "cold");
    if (spawnOpts?.afterUpgrade) return workerInstance.attempt = 1, workerInstance.buildBridgeReattachEnvFromState().then((reattachEnv: any) => workerInstance.doSpawn(reattachEnv)).catch(Ie), workerInstance;
    return workerInstance.doSpawn(dispatchSpec.reattachEnv).catch(Ie), workerInstance;
  }

  // Claims an existing spare worker process, wiring it up without re-spawning
  static claim(dispatchSpec: any, spareWorkerInfo: any) {
    let workerInstance = new uV(dispatchSpec, spareWorkerInfo.spawnPty, spareWorkerInfo.getAuthSnapshot, "spare", {
      pid: spareWorkerInfo.pid,
      attempt: 1,
      state: "running",
      cliVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    });
    if (workerInstance.attempt = 1, workerInstance.ptySockPath = spareWorkerInfo.ptySockPath, workerInstance.rvSockPath = aht(dispatchSpec.short), spareWorkerInfo.ptyAuth) workerInstance.ptyAuth = spareWorkerInfo.ptyAuth;
    return workerInstance.wirePty(YQn(spareWorkerInfo.ptySockPath, spareWorkerInfo.pid, void 0, dispatchSpec.short, void 0, workerInstance.ptyAuth)), workerInstance.resize(dispatchSpec.cols ?? 200, dispatchSpec.rows ?? 50), workerInstance.connectRv(), mF(spareWorkerInfo.pid, {
      skipCache: !0
    }).then((procStartTime: any) => {
      if (workerInstance.record.pid !== spareWorkerInfo.pid || workerInstance.isDetached || workerInstance.record.outcome) return;
      if (procStartTime) workerInstance.procStart = procStartTime;
      workerInstance.patch({
        pid: spareWorkerInfo.pid
      });
    }), workerInstance;
  }

  // Returns the auth tokens for socket connections
  socketAuth() {
    return {
      rvAuth: this.rvAuth,
      ptyAuth: this.ptyAuth
    };
  }

  // Builds env/argv for a claim frame without actually spawning
  static buildClaimFrame(dispatchSpec: any, authSnapshotPath: any, socketTokens: any) {
    let jobDirPath = ec(dispatchSpec.short),
      claimEnv = y8l(dispatchSpec, jobDirPath, authSnapshotPath, aht(dispatchSpec.short), socketTokens);
    if (delete claimEnv.CLAUDE_BG_PTY_AUTH, dispatchSpec.reattachEnv) Object.assign(claimEnv, dispatchSpec.reattachEnv);
    let claimArgv = _8l(dispatchSpec, 1, !1, dispatchSpec.sessionId, dispatchSpec.respawnFlags);
    return {
      env: claimEnv,
      argv: claimArgv
    };
  }

  // Adopts an existing worker process from a previous supervisor after restart
  static async adopt(shortId: any, rosterEntry: any, spawnPtyFn: any, getAuthSnapshotFn: any) {
    try {
      process.kill(rosterEntry.pid, 0);
    } catch (killErr: any) {
      let errCode = cn(killErr);
      if (errCode === "ESRCH" || errCode === "EPERM") return null;
    }
    let procStartTime = await mF(rosterEntry.pid);
    if (procStartTime && rosterEntry.procStart !== procStartTime) return null;
    let workerInstance = new uV(rosterEntry.dispatch, spawnPtyFn, getAuthSnapshotFn, "adopted", {
      pid: rosterEntry.pid,
      attempt: rosterEntry.attempt,
      startedAt: rosterEntry.startedAt,
      messagingSock: rosterEntry.messagingSock,
      state: "adopted",
      detail: "adopted from previous supervisor",
      cliVersion: rosterEntry.cliVersion,
      ...(rosterEntry.ptySock ? {} : {
        legacy: !0
      })
    });
    if (workerInstance.attempt = rosterEntry.attempt, workerInstance.procStart = rosterEntry.procStart, workerInstance.workerReady = !0, workerInstance.adoptedAt = Date.now(), workerInstance.rvSockPath = rosterEntry.rendezvousSock, workerInstance.ptySockPath = rosterEntry.ptySock, rosterEntry.rvAuth) workerInstance.rvAuth = rosterEntry.rvAuth;
    if (rosterEntry.ptyAuth) workerInstance.ptyAuth = rosterEntry.ptyAuth;
    if (workerInstance.dispatch.launch.mode === "exec") workerInstance.execTracker = QMo(ec(workerInstance.dispatch.short)), workerInstance.workerReady = !0;
    if (rosterEntry.ptySock) workerInstance.wirePty(YQn(rosterEntry.ptySock, rosterEntry.pid, workerInstance.procStart, workerInstance.dispatch.short, void 0, workerInstance.ptyAuth)), workerInstance.ptyCols = 0, workerInstance.seedFocus(!1);
    if (rosterEntry.decModes) workerInstance.decModes.seed(rosterEntry.decModes);
    if (workerInstance.connectRv(), rosterEntry.pendingRespawn === "upgrade") workerInstance.transitionTo({
      kind: "upgrading"
    }), setTimeout((ref: any) => {
      if (ref.phase.kind === "upgrading" && !ref.record.outcome) ref.sigtermWorker();
    }, 5000, workerInstance).unref();
    return workerInstance;
  }

  // Creates a worker entry for a process whose PID cannot be verified (pty.sock-based tracking only)
  static unverified(shortId: any, rosterEntry: any) {
    let workerInstance = new uV(rosterEntry.dispatch, void 0, void 0, "adopted", {
      pid: rosterEntry.pid,
      attempt: rosterEntry.attempt,
      startedAt: rosterEntry.startedAt,
      messagingSock: rosterEntry.messagingSock,
      state: "adopted",
      detail: "adopted (pid unverifiable; tracking via pty.sock)",
      cliVersion: rosterEntry.cliVersion
    });
    if (workerInstance.attempt = rosterEntry.attempt, workerInstance.procStart = rosterEntry.procStart, workerInstance.rvSockPath = rosterEntry.rendezvousSock, workerInstance.ptySockPath = rosterEntry.ptySock, rosterEntry.rvAuth) workerInstance.rvAuth = rosterEntry.rvAuth;
    if (rosterEntry.ptyAuth) workerInstance.ptyAuth = rosterEntry.ptyAuth;
    return workerInstance.unverifiedSock = rosterEntry.ptySock, workerInstance.lastInputAt = Date.now(), workerInstance.pidPoll = setInterval((ref: any) => {
      if (ref.record.outcome || !ref.unverifiedSock) return;
      WJn(ref.unverifiedSock).then((sockExists: any) => {
        if (sockExists || ref.record.outcome || ref.phase.kind !== "spawning") return;
        ref.settle("crashed");
      });
    }, ZMo, workerInstance), workerInstance.pidPoll.unref(), W("tengu_bg_adopt_unverified", {
      short: shortId
    }), workerInstance;
  }

  // Returns last N ring-buffer chunks (or all if n <= 0)
  tail(count: any) {
    return count > 0 ? this.ring.slice(-count) : [];
  }
  ringSnapshot() {
    return this.ring;
  }

  // Returns a truncated text snippet of output before the worker finished initializing (for error display)
  preInitErrorTail() {
    let preInitOutput = cc(this.ring.slice(this.ringSpawnMark).join("")).replace(/\s+/g, " ").trim();
    if (!preInitOutput) return;
    return preInitOutput.length > f8l ? `…${preInitOutput.slice(-f8l)}` : preInitOutput;
  }
  decModeSnapshot() {
    return this.decModes.snapshot();
  }

  // Forwards input to the PTY and tracks last-input timestamp
  write(inputData: any) {
    this.lastInputAt = Date.now(), this.pty?.write(inputData);
  }
  noteActivity() {
    this.lastInputAt = Date.now();
  }

  // Shifts grace-period clocks forward (e.g. after a system sleep/wake)
  shiftGraceClocksForward(deltaMs: any) {
    if (deltaMs <= 0) return;
    if (this.adoptedAt !== void 0) this.adoptedAt += deltaMs;
    if (this.lastInputAt !== void 0) this.lastInputAt += deltaMs;
  }

  // Sends a focus gain/loss escape sequence to the PTY
  seedFocus(hasFocus: any) {
    if (this.dispatch.launch.mode === "exec") return;
    this.pty?.write(hasFocus ? VUe : yve);
  }

  // Resizes the PTY; on Windows defers until the worker is ready
  resize(cols: any, rows: any) {
    if (this.ptyCols = cols, this.ptyRows = rows, Yt() === "windows" && !this.workerReady) {
      this.resizeDeferred = !0;
      return;
    }
    try {
      this.pty?.resize(cols, rows);
    } catch {}
  }

  // Signals the PTY process group with SIGWINCH (for screen reader re-render)
  signalPtyPgrp() {
    if (Yt() === "windows" || !this.record.pid) return;
    setTimeout((pid: any) => {
      try {
        process.kill(-pid, "SIGWINCH");
      } catch {}
    }, 15, this.record.pid);
  }

  // Triggers a full repaint, temporarily shrinking the terminal width if needed to force a redraw
  resizeForRepaint(cols: any, rows: any) {
    if (cols !== this.ptyCols || rows !== this.ptyRows) return this.resize(cols, rows), this.signalPtyPgrp(), this.rv?.send({
      type: "repaint"
    }), () => {};
    let repaintSent = this.rv?.send({
        type: "repaint"
      }) === !0,
      cancelFn: any = () => {},
      repaintTimer = setTimeout((targetCols: any, targetRows: any) => {
        if (cancelFn(), this.ptyCols !== targetCols || this.ptyRows !== targetRows) return;
        let shrunkCols = Math.max(2, targetCols - 1);
        this.resize(shrunkCols, targetRows), this.signalPtyPgrp(), setTimeout((origCols: any, origRows: any, checkCols: any) => {
          if (this.ptyCols === checkCols && this.ptyRows === origRows) this.resize(origCols, origRows), this.signalPtyPgrp();
        }, 30, targetCols, targetRows, shrunkCols);
      }, repaintSent ? 50 : 0, cols, rows);
    if (repaintSent) cancelFn = this.onRepaintDone.subscribe(() => {
      cancelFn(), clearTimeout(repaintTimer);
    });
    return () => {
      cancelFn(), clearTimeout(repaintTimer);
    };
  }

  // Returns the roster entry fields for persisting this worker across supervisor restarts
  rosterEntry() {
    return {
      pid: this.record.pid,
      procStart: this.procStart,
      sessionId: this.record.sessionId,
      rendezvousSock: this.rvSockPath ?? aht(this.dispatch.short),
      ptySock: this.record.legacy ? void 0 : this.ptySockPath ?? uN(this.dispatch.short),
      messagingSock: this.record.messagingSock,
      cliVersion: this.record.cliVersion,
      startedAt: this.record.startedAt,
      attempt: this.attempt,
      cwd: this.dispatch.cwd,
      worktreePath: this.dispatch.worktree?.path,
      dispatch: this.cappedDispatch(),
      pendingRespawn: this.phase.kind === "upgrading" ? "upgrade" : void 0,
      decModes: this.decModes.snapshot(),
      rvAuth: this.rvAuth,
      ptyAuth: this.ptyAuth
    };
  }

  // Returns a JSON-safe version of dispatch, capping strings at g8l bytes and omitting reattachEnv
  cappedDispatch() {
    return JSON.parse(JSON.stringify(this.dispatch, (fieldName: any, fieldVal: any) => fieldName === "reattachEnv" || fieldName === "attachStallRespawns" ? void 0 : typeof fieldVal === "string" && fieldVal.length > g8l ? fieldVal.slice(0, g8l) : fieldVal));
  }

  // Sends a reply to the worker (via rendezvous if blocked, otherwise via PTY bracketed paste)
  async reply(replyText: any) {
    this.lastInputAt = Date.now(), this.lastInputAttacher = void 0;
    let sessionState = await Oi(ec(this.dispatch.short));
    if ((!sessionState || (sessionState.tempo ?? this.record.tempo) === "blocked") && this.rv?.send({
      type: "reply",
      text: replyText
    })) return !0;
    if (this.pty) {
      let useBracketedPaste = this.dispatch.launch.mode !== "exec";
      return this.replyChain = this.replyChain.then(() => new Promise((resolve: any) => {
        this.pty?.write(useBracketedPaste ? `\x1B[200~${replyText}\x1B[201~` : replyText), setTimeout((resolveFn: any) => {
          this.pty?.write("\r"), resolveFn();
        }, 10, resolve);
      })), !0;
    }
    return this.rv?.send({
      type: "reply",
      text: replyText
    }) ?? !1;
  }

  // Forwards attacher capability flags to the worker via rendezvous
  sendAttacherCaps(caps: any) {
    return this.rv?.send({
      type: "attacher-caps",
      caps: caps
    }) ?? !1;
  }

  // Kills the worker process with the given signal, settling with the given outcome label
  kill(signal: any = "SIGTERM", outcomeLabel: any = "killed", detailMsg: any) {
    if (this.phase.kind === "retired") return;
    if (this.killOutcome = outcomeLabel, detailMsg) this.patch({
      detail: detailMsg
    });
    if (this.transitionTo({
      kind: "retiring",
      reason: "reap"
    }), this.backoffTimer) clearTimeout(this.backoffTimer), this.backoffTimer = null;
    if (this.unverifiedSock) {
      aGe(this.unverifiedSock).finally(() => this.settle(this.killOutcome));
      return;
    }
    if (this.pty) try {
      this.pty.kill(signal);
    } catch {} else if (this.record.pid && !this.pidRecycled()) try {
      process.kill(-this.record.pid, signal);
    } catch {
      try {
        process.kill(this.record.pid, signal);
      } catch {}
    }
    if (!this.pty) this.settle(this.killOutcome);
  }

  // Stops tracking the worker (without killing it) and cleans up all subscriptions
  stop() {
    if (this.phase.kind === "retiring" && this.phase.reason === "reap") this.settle(this.killOutcome);else if (this.phase.kind === "retiring" && this.phase.reason === "grace") this.settle("done");else if (this.phase.kind !== "retired") this.transitionTo({
      kind: "retiring",
      reason: "stop"
    });
    if (this.backoffTimer) clearTimeout(this.backoffTimer), this.backoffTimer = null;
    this.clearLiveness(), this.offData?.dispose(), this.offExit?.dispose(), this.execTracker?.dispose(), this.execTracker = void 0, this.pty?.dispose(), this.pty = void 0;
  }

  // Performs the actual spawn attempt: prepares env/argv, creates the PTY, wires event handlers
  async doSpawn(reattachEnv: any) {
    this.attempt++, this.workerReady = !1, this.resizeDeferred = !1, this.ringSpawnMark = this.ring.length, this.lastSpawnAt = Date.now();
    let dispatchSpec = this.dispatch,
      jobDir = ec(dispatchSpec.short);
    await dV.mkdir(S8l.join(jobDir, "tmp"), {
      recursive: !0
    }).catch(() => {});
    let authSnapshotPath = dispatchSpec.launch.mode === "exec" ? void 0 : await n1o(dispatchSpec.short, this.getAuthSnapshot?.()),
      socketTokensPath = await r1o(dispatchSpec.short, dispatchSpec.launch.mode === "exec" ? {
        ptyAuth: this.socketAuth().ptyAuth
      } : this.socketAuth()),
      sourceSessionId = dispatchSpec.launch.mode === "resume" ? dispatchSpec.launch.sessionId : void 0,
      hasMessages = !1,
      sourceSessionEmpty = !1,
      activeSessionId = dispatchSpec.sessionId,
      currentRespawnFlags = dispatchSpec.respawnFlags,
      spawnCwd = dispatchSpec.cwd;
    if (this.attempt > 1) {
      let latestState = await Oi(jobDir);
      activeSessionId = latestState?.resumeSessionId ?? dispatchSpec.sessionId, currentRespawnFlags = latestState?.respawnFlags ?? dispatchSpec.respawnFlags, spawnCwd = latestState?.cwd ?? dispatchSpec.cwd;
      let messageCheck = await coe(activeSessionId, spawnCwd, latestState?.linkScanPath);
      if (hasMessages = messageCheck.hasMessages, sourceSessionEmpty = !hasMessages && sourceSessionId !== void 0 && !(await coe(sourceSessionId, spawnCwd, void 0)).hasMessages, !hasMessages) await dV.unlink(messageCheck.path).catch(() => {});
    }
    if (this.phase.kind === "retiring" || this.phase.kind === "retired" || this.record.outcome) {
      if (socketTokensPath) dV.unlink(socketTokensPath).catch(() => {});
      return;
    }
    if (sourceSessionEmpty) return this.patch({
      state: "crashed",
      detail: `source session ${sourceSessionId} not found`
    }), this.settle("crashed");
    if (!this.spawnPty) return this.patch({
      state: "crashed",
      detail: "Bun.Terminal unavailable (running under Node?)"
    }), W("tengu_bg_pty_unavailable", {
      short: this.dispatch.short
    }), this.settle("crashed");
    let spawnArgv = _8l(dispatchSpec, this.attempt, hasMessages, activeSessionId, currentRespawnFlags),
      spawnEnv = y8l(dispatchSpec, jobDir, authSnapshotPath, this.rvSockPath ?? aht(dispatchSpec.short), this.socketAuth());
    if (this.attempt > 1 && hasMessages) spawnEnv.CLAUDE_CODE_RESUME_INTERRUPTED_TURN = "1";
    if (reattachEnv) Object.assign(spawnEnv, reattachEnv);
    if (socketTokensPath) delete spawnEnv.CLAUDE_BG_RV_AUTH, delete spawnEnv.CLAUDE_BG_PTY_AUTH, spawnEnv.CLAUDE_BG_SOCKET_TOKENS_PATH = socketTokensPath;
    let spawnCols = this.ptyCols || (dispatchSpec.cols ?? 200),
      spawnRows = this.ptyRows || (dispatchSpec.rows ?? 50),
      ptyHandle: any;
    try {
      let {
        cmd: binCmd,
        prefixArgs: binPrefixArgs
      } = dispatchSpec.launch.mode === "exec" ? {
        cmd: yR(dispatchSpec.launch.cmd),
        prefixArgs: []
      } : RB({
        pinToCurrentBinary: !0
      });
      ptyHandle = this.spawnPty(binCmd, [...binPrefixArgs, ...spawnArgv], {
        cols: spawnCols,
        rows: spawnRows,
        cwd: spawnCwd,
        env: spawnEnv,
        ptySock: this.ptySockPath ?? uN(dispatchSpec.short),
        short: dispatchSpec.short,
        ptyAuth: this.ptyAuth
      });
    } catch (spawnErr: any) {
      if (In(spawnErr)) {
        let cwdExists = await dV.access(spawnCwd).then(() => !0, () => !1);
        if (this.record.outcome) return;
        if (!cwdExists) return this.settleCwdGone("cold", spawnCwd);
        let crashDetail = dispatchSpec.launch.mode === "exec" ? `${dispatchSpec.launch.cmd}: command not found` : "daemon binary was deleted (upgrade in progress) — run your command again to use the new version";
        W("tengu_bg_spawn_binary_gone", {
          short: this.dispatch.short,
          attempt: this.attempt
        }), this.patch({
          state: "crashed",
          detail: crashDetail
        });
        let crashMsg = `\r
\x1B[2m[${crashDetail}]\x1B[0m\r
`;
        return this.pushRing(crashMsg), this.onStream.emit(crashMsg), this.settle("crashed");
      }
      return this.scheduleRespawn(Ce(spawnErr));
    }
    if (dispatchSpec.launch.mode === "exec") this.execTracker?.dispose(), this.execTracker = QMo(jobDir), this.workerReady = !0;
    if (Yt() === "windows") dV.writeFile(CTe(dispatchSpec.short), String(ptyHandle.pid)).catch(() => {});
    this.wirePty(ptyHandle), this.rv?.close(), this.rv = void 0, this.lastRvHeartbeat = void 0, this.stalledLogged = !1, this.connectRv(), this.patch({
      pid: ptyHandle.pid,
      attempt: this.attempt,
      state: this.attempt > 1 ? "resuming" : "running",
      detail: "",
      cliVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    }), W("tengu_bg_worker_spawn", {
      short: this.dispatch.short,
      attempt: this.attempt,
      source: Le(this.dispatch.source),
      launch_mode: Le(this.dispatch.launch.mode)
    }), mF(ptyHandle.pid, {
      skipCache: !0
    }).then((procStartTime: any) => {
      if (!procStartTime || this.record.pid !== ptyHandle.pid || this.isDetached || this.record.outcome) return;
      this.procStart = procStartTime, this.patch({
        pid: ptyHandle.pid
      });
    });
  }

  // Wires data/exit handlers onto a PTY handle and transitions phase to "running"
  wirePty(ptyHandle: any) {
    this.pty = ptyHandle, this.transitionTo({
      kind: "running"
    }), this.decModes = kVt(), ptyHandle.onResume?.(() => {
      this.rv?.send({
        type: "repaint"
      });
    }), this.offData = ptyHandle.onData((chunk: any) => {
      if (this.decModes.feed(chunk) && this.record.pid) this.onState.emit({
        pid: this.record.pid
      });
      this.execTracker?.feed(chunk), this.pushRing(chunk.includes(NG) ? chunk.replaceAll(NG, "") : chunk), this.onStream.emit(chunk);
    });
    let exitHandled = !1;
    this.offExit = ptyHandle.onExit(({
      exitCode: exitCode,
      signal: exitSignal
    }: any) => {
      if (exitHandled) return;
      exitHandled = !0, this.offData?.dispose(), this.execLastLine = this.execTracker?.lastLine, this.execTracker?.dispose(), this.execTracker = void 0, this.pty = void 0, this.onExit(exitCode, exitSignal);
    });
  }

  // Appends data to the ring buffer, trimming the front when it exceeds the size cap
  pushRing(chunk: any) {
    if (this.ring.push(chunk), this.ringBytes += chunk.length, this.ringBytes > S8t * 1.25 && this.ring.length > 1) {
      let trimCount = 0,
        trimBytes = 0;
      while (this.ringBytes - trimBytes > S8t && trimCount < this.ring.length - 1) trimBytes += this.ring[trimCount].length, trimCount++;
      this.ring.splice(0, trimCount), this.ringBytes -= trimBytes, this.ringSpawnMark = Math.max(0, this.ringSpawnMark - trimCount);
    }
  }

  // Merges fields into the record and emits a state change event
  patch(fields: any) {
    Object.assign(this.record, fields), this.onState.emit(fields);
  }

  // Handles PTY exit: decides whether to settle, schedule respawn, or handle upgrade
  onExit(exitCode: any, exitSignal: any) {
    if (this.isDetached) return;
    if (this.phase.kind === "retired") return;
    let uptimeMs = this.lastSpawnAt ? Date.now() - this.lastSpawnAt : void 0,
      isFastCrash = uptimeMs !== void 0 && uptimeMs < m8l && exitCode !== 0;
    if (isFastCrash) this.fastCrashStreak++;else this.fastCrashStreak = 0;
    let repeatedFastCrash = this.fastCrashStreak >= 3,
      preInitTail = this.workerReady ? void 0 : this.preInitErrorTail(),
      exitCauseStr = exitCode !== 0 ? Ccr(ec(this.dispatch.short)) : void 0,
      sameExitCause = isFastCrash && !!exitCauseStr && exitCauseStr === this.lastExitCause;
    this.lastExitCause = isFastCrash ? exitCauseStr : void 0;
    let causeDetail = preInitTail ? ` — ${preInitTail}` : exitCauseStr ? ` — ${exitCauseStr}` : "",
      isExecInterrupted = this.dispatch.launch.mode === "exec" && (exitSignal === "SIGINT" || exitSignal === "SIGQUIT"),
      settleOutcome: any;
    if (this.phase.kind === "retiring" && this.phase.reason === "reap") settleOutcome = this.killOutcome;else if (this.phase.kind === "retiring" && this.phase.reason === "grace") settleOutcome = "done";else if (this.phase.kind === "upgrading") settleOutcome = void 0;else if (exitCode === 0) settleOutcome = "done";else if (this.dispatch.launch.mode === "exec") settleOutcome = isExecInterrupted ? "killed" : "crashed";else if (!this.workerReady && (this.attempt >= 2 || preInitTail) || repeatedFastCrash || sameExitCause || this.attempt >= p8l) settleOutcome = "crashed";
    if (W("tengu_bg_worker_exit", {
      short: this.dispatch.short,
      code: exitCode ?? void 0,
      signal: exitSignal,
      attempt: this.attempt,
      procUptimeMs: uptimeMs,
      source: Le(this.dispatch.source),
      launch_mode: Le(this.dispatch.launch.mode),
      outcome: Bo(settleOutcome),
      exitCause: exitCauseStr
    }), this.phase.kind === "retiring") return this.settle(this.phase.reason === "reap" ? this.killOutcome : "done");
    if (this.phase.kind === "upgrading") {
      this.transitionTo({
        kind: "spawning"
      }), this.attempt = 1, this.fastCrashStreak = 0, this.lastExitCause = void 0, this.patch({
        pid: 0,
        state: "starting",
        detail: "upgrading"
      }), this.procStart = void 0, this.buildBridgeReattachEnvFromState().then((reattachEnv: any) => this.doSpawn(reattachEnv)).catch(Ie);
      return;
    }
    if (exitCode === 0) {
      if (this.dispatch.launch.mode === "exec") {
        if (!this.execLastLine && this.ringBytes > 0) W("tengu_bg_exec_no_lastline", {
          ring_bytes: this.ringBytes
        });
        this.patch({
          detail: this.execLastLine || "(no output)"
        });
      }
      return this.settle("done");
    }
    let exitDesc = exitSignal ? `${exitSignal} (${exitCode})` : `exit ${exitCode}`;
    if (this.dispatch.launch.mode === "exec") {
      let lastOutputLine = this.execLastLine;
      return this.patch({
        state: isExecInterrupted ? "stopped" : "crashed",
        detail: lastOutputLine ? `${exitDesc} — ${lastOutputLine}` : `${exitDesc}${causeDetail}`
      }), this.settle(isExecInterrupted ? "killed" : "crashed");
    }
    if (!this.workerReady && exitCauseStr === "spare_postclaim:ENOENT") try {
      F_t.accessSync(this.dispatch.cwd);
    } catch {
      return this.settleCwdGone("spare");
    }
    if (!this.workerReady && (this.attempt >= 2 || preInitTail)) return this.patch({
      state: "crashed",
      detail: `${exitDesc} before init${causeDetail}`
    }), this.settle("crashed");
    if (repeatedFastCrash || sameExitCause) return this.patch({
      state: "crashed",
      detail: sameExitCause ? `${exitDesc} \xD7${this.attempt}${causeDetail}` : `${exitDesc} within ${m8l / 1000}s of spawn \xD7${this.fastCrashStreak}${causeDetail}`
    }), this.settle("crashed");
    this.scheduleRespawn(`${exitDesc}${causeDetail}`);
  }

  // Settles with "crashed" after logging that the working directory has been deleted
  settleCwdGone(spawnVia: any, cwd: any = this.dispatch.cwd) {
    let cwdGoneMsg = `working directory no longer exists: ${cwd}`;
    W("tengu_bg_spawn_cwd_gone", {
      short: this.dispatch.short,
      attempt: this.attempt,
      via: Le(spawnVia)
    }), this.patch({
      state: "crashed",
      detail: cwdGoneMsg
    });
    let displayMsg = `\r
\x1B[2m[${cwdGoneMsg} — this job cannot be respawned]\x1B[0m\r
`;
    this.pushRing(displayMsg), this.onStream.emit(displayMsg), this.settle("crashed");
  }

  // Fetches bridge session state and builds a reattach env block for upgrading
  async buildBridgeReattachEnvFromState() {
    let sessionState = await Oi(ec(this.dispatch.short)).catch(() => null);
    if (!sessionState) return;
    return Ewe(sessionState.bridgeSessionId, sessionState.bridgeSessionSeq, sessionState.bridgeOutboundOnly);
  }

  // Schedules a respawn after exponential backoff; if max attempts exceeded, settles as crashed
  scheduleRespawn(crashReason: any) {
    if (this.attempt >= p8l) return W("tengu_bg_respawn_exhausted", {
      short: this.dispatch.short,
      attempts: this.attempt
    }), this.patch({
      state: "crashed",
      detail: crashReason
    }), this.settle("crashed");
    if (this.phase.kind === "running") this.transitionTo({
      kind: "spawning"
    });
    this.patch({
      pid: 0,
      state: "crashed",
      detail: `${crashReason}; respawning`
    }), this.procStart = void 0;
    let respawnMsg = `\r
\x1B[2m[worker crashed (${crashReason}) — respawning…]\x1B[0m\r
`;
    this.pushRing(respawnMsg), this.onStream.emit(respawnMsg), this.backoffTimer = setTimeout(() => {
      if (this.backoffTimer = null, this.phase.kind !== "retiring" && this.phase.kind !== "retired") this.doSpawn().catch(Ie);
    }, CDm), this.backoffTimer.unref();
  }

  // Emits the settled outcome and tears down liveness infrastructure
  settle(outcome: any) {
    if (this.record.outcome) return;
    W("tengu_bg_settle", {
      short: this.dispatch.short,
      outcome: Le(outcome),
      uptimeMs: Date.now() - this.record.startedAt,
      attempt: this.attempt
    }), this.transitionTo({
      kind: "retired",
      outcome: outcome
    }), this.clearLiveness(), this.patch({
      outcome: outcome,
      settledAt: Date.now(),
      tempo: "idle"
    }), this.onSettle.emit(outcome);
  }

  // Connects or reconnects the rendezvous socket listener for IPC with the worker
  connectRv() {
    if (this.rv || this.isDetached || this.record.outcome) return;
    if (this.dispatch.launch.mode === "exec") {
      this.startPidPoll();
      return;
    }
    this.rv = c8l(this.rvSockPath ?? aht(this.dispatch.short), (rvMsg: any) => {
      if (rvMsg.type === "heartbeat") this.lastRvHeartbeat = Date.now();else if (rvMsg.type === "reply-rejected") A(`[bg] worker ${this.dispatch.short} rejected reply: rv auth token mismatch — respawn the worker to re-key`, {
        level: "warn"
      }), W("tengu_bg_rv_reply_rejected", {});else if (rvMsg.type === "done") this.settle(rvMsg.outcome);else if (rvMsg.type === "state") this.patch(rvMsg.patch);else if (rvMsg.type === "detach-request") {
        let decodedMsg = rue(rvMsg.msg),
          targetAttacher = this.attachers.get(this.lastInputAttacher);
        if (!rvMsg.broadcast && targetAttacher) targetAttacher.deliver(decodedMsg);else if (this.attachers.size > 0) for (let attacher of this.attachers.values()) attacher.deliver(decodedMsg);else this.onStream.emit(decodedMsg);
      } else if (rvMsg.type === "repaint-done") this.onRepaintDone.emit();
    }, () => void this.checkPid(), () => {
      if (this.workerReady = !0, this.resizeDeferred) this.resizeDeferred = !1, this.resize(this.ptyCols, this.ptyRows);
      if (this.attachers.size > 0) {
        let lastAttacher = [...this.attachers.values()].at(-1);
        this.sendAttacherCaps(lastAttacher.caps ?? null);
      } else this.sendAttacherCaps(null);
    }, this.rvAuth), this.startPidPoll();
  }

  // Starts the periodic PID liveness poll if not already running
  startPidPoll() {
    if (this.pidPoll) return;
    this.lastCheckPidAt = Date.now(), this.pidPoll = setInterval(() => void this.checkPid(!0), ZMo), this.pidPoll.unref();
  }

  // Returns true if the PID slot has been recycled (process start time changed)
  pidRecycled() {
    if (!this.procStart || !this.record.pid) return !1;
    let currentProcStart = Mme(this.record.pid);
    return currentProcStart !== void 0 && currentProcStart !== this.procStart;
  }
  async pidRecycledAsync() {
    if (!this.procStart || !this.record.pid) return !1;
    let currentProcStart = await mF(this.record.pid);
    return currentProcStart !== void 0 && currentProcStart !== this.procStart;
  }
  pidPollTick = 0;

  // Periodic liveness check: verifies the worker process still exists and hasn't stalled
  async checkPid(fromPoll: any = !1) {
    if (this.record.outcome || !this.record.pid) return;
    let elapsedMs = Date.now() - this.lastCheckPidAt;
    this.lastCheckPidAt = Date.now();
    let systemSlept = elapsedMs > ZMo * 3;
    if (systemSlept && this.lastRvHeartbeat !== void 0) this.lastRvHeartbeat = Date.now();
    if (!this.pty) try {
      process.kill(this.record.pid, 0);
    } catch (killErr: any) {
      let errCode = cn(killErr);
      if (errCode === "ESRCH" || errCode === "EPERM") this.logVanished(!1, fromPoll), this.settle(this.isKilling ? "killed" : "crashed");
      return;
    }
    let lastHeartbeatAt = this.lastRvHeartbeat;
    if (!systemSlept && !this.stalledLogged && lastHeartbeatAt !== void 0 && Date.now() - lastHeartbeatAt > ADm) {
      let currentState = await Oi(ec(this.dispatch.short));
      if (!this.stalledLogged && (currentState?.tempo ?? this.record.tempo) === "active") this.stalledLogged = !0, W("tengu_bg_worker_stalled", {
        short: this.dispatch.short,
        sinceMs: Date.now() - lastHeartbeatAt
      });
    }
    if (this.pty) return;
    if (fromPoll && this.pidPollTick++ % 12 !== 0) return;
    if (await this.pidRecycledAsync()) {
      if (this.record.outcome || this.pty) return;
      this.logVanished(!0, fromPoll), this.settle(this.isKilling ? "killed" : "crashed");
    }
  }

  // Logs a worker-vanished event (process disappeared without an exit event)
  logVanished(pidRecycled: any, fromPoll: any) {
    if (this.isKilling) return;
    W("tengu_bg_worker_vanished", {
      short: this.dispatch.short,
      recycled: pidRecycled,
      fromPoll: fromPoll,
      uptimeMs: Date.now() - this.record.startedAt
    });
  }

  // Clears the PID poll interval and closes the rendezvous connection
  clearLiveness() {
    if (this.pidPoll) clearInterval(this.pidPoll), this.pidPoll = null;
    this.rv?.close(), this.rv = void 0, this.lastRvHeartbeat = void 0, this.stalledLogged = !1;
  }
}
var e1o: any,
  F_t: any,
  dV: any,
  S8l: any,
  CDm = 1e4,
  p8l = 20,
  m8l = 5000,
  f8l = 200,
  ZMo = 5000,
  ADm = 120000,
  RDm = 120000,
  vDm = 300000,
  h8l: any,
  wDm = 3600000,
  g8l = 4096,
  o1o: any,
  s1o: any;
var a1o = b(() => {
  dO();
  U2e();
  Pf();
  kt();
  zf();
  qe();
  dn();
  Ct();
  lE();
  vn();
  F2e();
  Es();
  Y_e();
  VT();
  ig();
  jDo();
  Z5l();
  CL();
  bL();
  s8l();
  F8e();
  MVt();
  u8l();
  mK();
  e1o = require("crypto"), F_t = require("fs"), dV = require("fs/promises"), S8l = require("path"), h8l = ["local_bash", "in_process_teammate", "dream"];
  o1o = ["CLAUDE_CODE_QUESTION_PREVIEW_FORMAT", "GITHUB_ACTIONS", "CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_CODE_EXECPATH", "CLAUDE_BG_RV_AUTH", "CLAUDE_BG_PTY_AUTH", "CLAUDE_BG_SOCKET_TOKENS_PATH", "CLAUDE_CODE_COORDINATOR_MODE", "CLAUDE_AX_SCREEN_READER", "ANTHROPIC_MODEL", "TERM_PROGRAM", "TERM_PROGRAM_VERSION", "__CFBundleIdentifier", "KITTY_WINDOW_ID", "WT_SESSION", "KONSOLE_VERSION", "VTE_VERSION", "ZED_TERM", "ZELLIJ", "TMUX", "TMUX_PANE", "STY", "LC_TERMINAL", "SSH_CONNECTION", "SSH_CLIENT", "SSH_TTY", "COLORFGBG", "CURSOR_TRACE_ID", "GIT_ASKPASS", "SSH_ASKPASS", "SSH_ASKPASS_REQUIRE", "VSCODE_GIT_ASKPASS_MAIN", "VSCODE_GIT_ASKPASS_NODE", "VSCODE_GIT_ASKPASS_EXTRA_ARGS", "VSCODE_GIT_IPC_HANDLE", "TERMINAL_EMULATOR", "ITERM_SESSION_ID", "GNOME_TERMINAL_SERVICE", "XTERM_VERSION", "ALACRITTY_LOG", "TILIX_ID", "TERMINATOR_UUID", "ConEmuANSI", "ConEmuPID", "ConEmuTask", "MSYSTEM", "CLAUDE_CODE_SSE_PORT", "FORCE_CODE_TERMINAL"], s1o = [...i8r, ...vOt, ...r8r, ...o8r, "ANTHROPIC_CUSTOM_HEADERS", "ANTHROPIC_UNIX_SOCKET", "CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST", "CLAUDE_CODE_HOST_AUTH_ENV_VAR"];
});

export {t1o,_8l,y8l,n1o,r1o,i1o,T8l,kDm,uV,e1o,F_t,dV,S8l,CDm,p8l,m8l,f8l,ZMo,ADm,RDm,vDm,h8l,wDm,g8l,o1o,s1o,a1o};
