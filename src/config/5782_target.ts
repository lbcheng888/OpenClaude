// @ts-nocheck
import {In,sp,cn,mo,Ct} from "../../vendor/m197.ts";
import {B2n,RB,Y_e} from "../../vendor/m3873.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {CJn,TVt} from "../../vendor/m5125.ts";
import {NBl,dDo} from "../git-shell/5112_type.ts";
import {MSc,NSc} from "../../vendor/m5778.ts";
import {initializeGrowthBook as B0,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {VI,Ygl,mPe,WRo,qRo,Jgl,dne} from "../../vendor/m4605.ts";
import {AT,fue} from "../../vendor/m4610.ts";
import {zd,bL} from "../../vendor/m4515.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Pt,He,mn} from "../telemetry/0600_feature_name.ts";
import {KRo,sht,_Pe} from "../../vendor/m4607.ts";
import {getProcessStartTimeAsync as mF,isSameProcessAsync as Xv,lE} from "../../vendor/m1461.ts";
import {DSc,PSc} from "../session/5778_log.ts";
import {qSc,WSc} from "../telemetry/5781_jsonPath.ts";
import {WORKER_KINDS as RJ,yVt} from "../../vendor/m5124.ts";
import {isDaemonServiceRecalled as b$r,fC} from "./2212_shouldShowLaunchComposer.ts";
import {b} from "../../runtime.ts";
import {sGe,Kue} from "./5153_proto.ts";
/**
 * Daemon supervisor lifecycle (v2.1.190).
 *
 * Resolves the on-disk identity of the running binary (realpath + mtime) so the
 * supervisor can detect upgrades, then runs the full daemon start sequence:
 * yield/displace any existing daemon, acquire the lock, spin up the bg manager
 * and worker pool, and finally drive shutdown with a classified cause.
 */

/**
 * Resolve the canonical path + mtime of a binary so we can later detect
 * upgrades. Returns null when the file no longer exists (ENOENT etc).
 */
async function GSc(binaryPath) {
  try {
    let resolvedTarget = await Xrr.realpath(binaryPath),
      stats = await Xrr.stat(resolvedTarget);
    return {
      target: resolvedTarget,
      mtimeMs: stats.mtimeMs
    };
  } catch (err) {
    if (In(err)) return null;
    throw err;
  }
}

/**
 * True when the on-disk binary identity has changed (different realpath, or —
 * unless an env override disables mtime checks — a different mtime).
 */
function YXm(previousIdentity, currentIdentity) {
  if (previousIdentity.target !== currentIdentity.target) return !0;
  return !B2n() && previousIdentity.mtimeMs !== currentIdentity.mtimeMs;
}

/**
 * Handle a bg-manager startup failure. A benign listen EADDRINUSE/EACCES is
 * logged as a warning; anything else is reported as a real error.
 */
function JXm(err) {
  if (sp(err) && err.syscall === "listen" && (err.code === "EADDRINUSE" || err.code === "EACCES")) {
    A(`bg manager start failed (listen): ${err.code} ${err.message}`, {
      level: "warn"
    });
    return;
  }
  Ie(err);
}

/**
 * Start and supervise the daemon. Negotiates with any existing daemon (yield or
 * refuse), acquires the lock, launches the bg manager + worker pool, then blocks
 * until a shutdown trigger (upgrade / idle / shutdown op / yield / signal) fires.
 */
async function KSc(options) {
  let {
      jsonPath: jsonPath,
      logPath: logPath,
      origin: origin,
      spawnedBy: spawnedBy,
      signal: signal,
      watch: watch = CJn,
      createAuth: createAuth = NBl,
      staleCheckIntervalMs: staleCheckIntervalMs = zXm,
      idleGraceMs: idleGraceMs = VSc,
      startupIdleGraceMs: startupIdleGraceMs = jXm
    } = options,
    logger = await MSc(logPath);
  logger.write("supervisor", `─── daemon start ─── version=${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION} pid=${process.pid} origin=${origin}`), B0();
  let existingDaemon = await VI(),
    askedToYield = !1;
  if (existingDaemon && existingDaemon.origin === "transient" && origin !== "transient") {
    askedToYield = !0, logger.write("supervisor", `transient daemon running (pid=${existingDaemon.pid}, origin=transient) — asking it to yield to origin=${origin}`);
    let yieldResponse = await AT({
      proto: zd,
      op: "yield"
    });
    if (yieldResponse.ok && yieldResponse.op === "yield" && yieldResponse.yielding) {
      let yieldDeadline = Date.now() + 5000;
      while (existingDaemon && Date.now() < yieldDeadline) await Kn(100), existingDaemon = await VI();
      if (W("tengu_daemon_yield_takeover", {
        ok: !existingDaemon,
        new_origin: Le(origin)
      }), existingDaemon) logger.write("supervisor", "yield acked but lock still held after 5s — refusing to start");
    } else logger.write("supervisor", yieldResponse.ok ? "existing daemon refused to yield (it reports origin!=transient)" : `existing daemon unreachable on control socket (${yieldResponse.error}); not taking over`);
  }
  if (existingDaemon) {
    let conflictReason = askedToYield ? `origin=${existingDaemon.origin ?? "unknown"}; asked it to yield but the handover failed (see above)` : origin === "transient" ? `origin=${existingDaemon.origin ?? "unknown"}; an on-demand daemon never displaces a running one` : `origin=${existingDaemon.origin ?? "unknown"}; only a transient daemon can be displaced`,
      stopHint = Yt() === "windows" ? `Stop it with \`taskkill /PID ${existingDaemon.pid}\`, then retry.` : "Run `claude daemon stop` to stop it, then retry.";
    if (logger.write("supervisor", `another daemon is already running (pid=${existingDaemon.pid}, version=${existingDaemon.version}, ${conflictReason}). ${stopHint}`), askedToYield) Pt("daemon_start", "daemon_start_yield_failed");else He("daemon_start");
    return await logger.close(), {
      upgradeDetected: !1,
      exitCode: 1
    };
  }
  let invocation = RB({
      pinToCurrentBinary: !0
    }),
    binaryPath = B2n() ? KRo() : invocation.prefixArgs[0] ?? invocation.cmd,
    binaryIdentity = await GSc(binaryPath).catch(err => {
      if (sp(err)) A(`binaryIdentity(${binaryPath}) failed at startup: ${err.code}`, {
        level: "error"
      });else Ie(err);
      return null;
    }),
    daemonRecord = {
      pid: process.pid,
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      jsonPath: jsonPath,
      logPath: logPath,
      startedAt: Date.now(),
      origin: origin,
      spawnedBy: spawnedBy,
      procStart: await mF(process.pid),
      launchTarget: binaryIdentity?.target
    },
    lockAcquired = await Ygl(daemonRecord);
  if (!lockAcquired) {
    let lockHolder = await mPe();
    if (lockHolder) {
      let holderAlive = !1;
      try {
        process.kill(lockHolder.pid, 0), holderAlive = (await WRo(lockHolder.pid)) && (await Xv(lockHolder.pid, lockHolder.procStart));
      } catch (killErr) {
        if (cn(killErr) !== "ESRCH") holderAlive = !0;
      }
      if (holderAlive) return logger.write("supervisor", `another daemon won the lock race (pid=${lockHolder.pid}) — exiting`), He("daemon_start"), await logger.close(), {
        upgradeDetected: !1,
        exitCode: 1
      };
      lockAcquired = await qRo(daemonRecord);
    } else lockAcquired = await qRo(daemonRecord);
    if (!lockAcquired) return logger.write("supervisor", "another daemon won the lock race — exiting"), He("daemon_start"), await logger.close(), {
      upgradeDetected: !1,
      exitCode: 1
    };
  }
  let workerPool = null,
    authManager = createAuth(signal, msg => logger.write("supervisor", msg), () => workerPool?.hasOAuthConsumer() ?? !1),
    upgradeDetected = !1,
    shutdownRequested = !1,
    serviceRecalled = !1,
    yielded = !1,
    displaced = !1,
    resolveExit = null,
    onYield = () => {
      if (origin !== "transient") return !1;
      if (!yielded) yielded = !0, logger.write("supervisor", "yielding to a foreground/service daemon — bg workers will be re-adopted"), W("tengu_daemon_yield", {}), resolveExit?.();
      return !0;
    },
    onNudge = async () => {
      if (upgradeDetected || !binaryIdentity) return upgradeDetected;
      let currentIdentity;
      try {
        currentIdentity = await GSc(binaryPath);
      } catch (err) {
        if (sp(err)) A(`binaryIdentity(${binaryPath}) poll failed: ${err.code}`, {
          level: "error"
        });else Ie(err);
        return !1;
      }
      if (signal.aborted || serviceRecalled) return !1;
      if (currentIdentity !== null && !YXm(binaryIdentity, currentIdentity)) return !1;
      if (upgradeDetected = !0, currentIdentity === null) logger.write("supervisor", `binary at ${binaryPath} was deleted (was ${binaryIdentity.target}) — exiting for upgrade`);else {
        let changeDesc = binaryIdentity.target === currentIdentity.target ? "mtime changed" : `${binaryIdentity.target} → ${currentIdentity.target}`;
        logger.write("supervisor", `binary at ${binaryPath} changed (${changeDesc}) — self-restarting for upgrade`);
      }
      return resolveExit?.(), !0;
    },
    managerRef = {
      manager: null
    },
    idleTimer = null,
    idleExitTriggered = !1,
    everHadKeepAlive = !1,
    countActiveHandles = () => (managerRef.manager?.leaseCount() ?? 0) + (managerRef.manager?.liveHandleCount() ?? 0),
    scheduleIdleExit = () => {
      if (origin !== "transient") return;
      if (idleExitTriggered || upgradeDetected || shutdownRequested || yielded || signal.aborted) return;
      if (countActiveHandles() > 0) {
        if (everHadKeepAlive = !0, idleTimer) clearTimeout(idleTimer), idleTimer = null;
        return;
      }
      if (idleTimer) return;
      let graceMs = everHadKeepAlive ? idleGraceMs : startupIdleGraceMs;
      idleTimer = setTimeout(() => {
        if (idleTimer = null, countActiveHandles() > 0) {
          everHadKeepAlive = !0;
          return;
        }
        if (signal.aborted || upgradeDetected) return;
        idleExitTriggered = !0;
        let configuredWorkerCount = workerPool?.workerCount() ?? 0;
        logger.write("supervisor", `idle ${Math.round(graceMs / 1000)}s with no clients — exiting` + (configuredWorkerCount > 0 ? ` (stopping ${configuredWorkerCount} configured workers)` : "")), W("tengu_daemon_idle_exit", {
          grace_ms: graceMs,
          never_had_client: !everHadKeepAlive,
          cfg_workers: configuredWorkerCount
        }), resolveExit?.();
      }, graceMs), idleTimer.unref();
    };
  authManager.ready.then(() => DSc(msg => logger.write("bg", msg), {
    getAuthSnapshot: origin === "service" ? () => authManager.getAuthSnapshot() : void 0,
    onNudge: onNudge,
    onShutdown: () => {
      shutdownRequested = !0, logger.write("supervisor", "shutdown requested via control socket"), resolveExit?.();
    },
    onYield: onYield,
    onKeepAliveChange: scheduleIdleExit
  })).then(async manager => {
    if (signal.aborted) {
      let lockHolder = await mPe().catch(() => null);
      return void manager.close({
        displaced: lockHolder !== null && lockHolder.pid !== daemonRecord.pid
      });
    }
    managerRef.manager = manager, scheduleIdleExit();
  }).catch(err => {
    let report = mo(err),
      errno = cn(err),
      flattenedMessage = report.message.replace(/\s*\n\s*/g, " ");
    logger.write("supervisor", `bg manager failed to start: ${errno ? `[${errno}] ` : ""}${flattenedMessage} — control pipe unavailable`), JXm(err);
  }), workerPool = await qSc({
    jsonPath: jsonPath,
    invocation: invocation,
    logger: logger,
    authManager: authManager,
    watch: watch
  });
  let workerCount = workerPool.workerCount();
  if (logger.write("supervisor", `workers=${workerCount}`), workerCount > 0) logger.write("supervisor", "daemon.json has configured workers but they do not pin the supervisor — they stop when the last client lease and bg job are gone");
  if (W("tengu_daemon_start", {
    worker_kinds: Object.keys(RJ).length,
    worker_count: workerCount,
    origin: Le(origin)
  }), He("daemon_start"), scheduleIdleExit(), await new Promise(resolve => {
    if (resolveExit = resolve, signal.aborted || upgradeDetected || idleExitTriggered || shutdownRequested || yielded) return void resolve();
    if (signal.addEventListener("abort", () => resolve(), {
      once: !0
    }), !binaryIdentity) logger.write("supervisor", `binary identity unresolvable at ${binaryPath}; upgrade polling disabled`);
    let pollTimer = setInterval(() => {
      if (signal.aborted || upgradeDetected || serviceRecalled || yielded) return clearInterval(pollTimer);
      if (onNudge(), origin === "service" && b$r()) serviceRecalled = !0, logger.write("supervisor", "service recall flag set — draining workers and uninstalling service"), resolveExit?.();
      if (origin === "transient" && !yielded) mPe().then(lockHolder => {
        if (lockHolder && lockHolder.pid !== daemonRecord.pid && !yielded && !signal.aborted) displaced = !0, yielded = !0, logger.write("supervisor", `lockfile now held by pid=${lockHolder.pid} — displaced, yielding`), W("tengu_daemon_yield", {
          displaced: !0,
          displaced_by_pid: lockHolder.pid
        }), resolveExit?.();
      }).catch(() => {});
    }, staleCheckIntervalMs);
    pollTimer.unref();
  }), resolveExit = null, idleTimer) clearTimeout(idleTimer), idleTimer = null;
  if (upgradeDetected) W("tengu_daemon_self_restart_on_upgrade", {});
  if (serviceRecalled) W("tengu_copper_lantern", {});
  let shutdownCause = upgradeDetected ? "upgrade" : serviceRecalled ? "service_recall" : displaced ? "displaced" : yielded ? "yield" : shutdownRequested ? "shutdown_op" : idleExitTriggered ? "idle_exit" : signal.aborted ? "signal" : "unknown",
    uptimeMs = Date.now() - daemonRecord.startedAt;
  if (logger.write("supervisor", `shutting down (cause=${shutdownCause}, uptime=${Math.round(uptimeMs / 1000)}s, leases=${managerRef.manager?.leaseCount() ?? -1}, live_workers=${managerRef.manager?.liveHandleCount() ?? -1})`), W("tengu_daemon_exit", {
    cause: Le(shutdownCause),
    uptime_ms: uptimeMs,
    lease_count: managerRef.manager?.leaseCount() ?? -1,
    live_handles: managerRef.manager?.liveHandleCount() ?? -1,
    ever_had_keep_alive: everHadKeepAlive,
    origin: Le(origin)
  }), workerPool.disposeWatcher(), await workerPool.drainReloads(), !displaced && origin === "transient") {
    let lockHolder = await mPe().catch(() => null);
    displaced = lockHolder !== null && lockHolder.pid !== daemonRecord.pid;
  }
  let lockReleased = !1,
    releaseLock = async () => {
      if (lockReleased) return;
      lockReleased = !0;
      let lockHolder = await mPe();
      if (lockHolder && lockHolder.pid === daemonRecord.pid && lockHolder.startedAt === daemonRecord.startedAt) await Jgl();
    };
  if (yielded) await managerRef.manager?.close({
    displaced: displaced
  }), managerRef.manager = null;
  if (idleExitTriggered || serviceRecalled || yielded) {
    if (await releaseLock(), serviceRecalled) managerRef.manager?.killAll("SIGTERM");
  }
  if (await Promise.all([managerRef.manager?.close({
    displaced: displaced
  }), workerPool.stop()]), await releaseLock(), serviceRecalled) await sht();
  return await logger.close(), authManager.dispose(), {
    upgradeDetected: upgradeDetected,
    exitCode: 0
  };
}
var Xrr,
  zXm = 60000,
  VSc = 5000,
  jXm;
var zSc = b(() => {
  fC();
  mn();
  jn();
  kt();
  qe();
  Ct();
  lE();
  vn();
  Es();
  Y_e();
  dDo();
  fue();
  sGe();
  PSc();
  bL();
  TVt();
  dne();
  NSc();
  WSc();
  _Pe();
  yVt();
  Xrr = require("fs/promises"), jXm = Kue + VSc;
});

export {GSc,YXm,JXm,KSc,Xrr,zXm,VSc,jXm,zSc};
