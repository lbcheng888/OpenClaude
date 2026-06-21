// @ts-nocheck
import {OT,gue} from "../../vendor/m4582.ts";
import {Cp,rM} from "../../vendor/m4493.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {yI,yne} from "../../vendor/m4577.ts";
import {Ie,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {o5n,r5n,hDe,TJ,gDe} from "../../vendor/m4579.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {getDaemonColdStart,getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Le,Xt} from "./0228_encoding.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {W7n,Kxo} from "./5122_cmd.ts";
import {dn,xp,Se,bt} from "../../vendor/m195.ts";
import {bgSupervisorNoun,isDaemonServiceInstallEnabled,isDaemonCliEnabled,bv} from "./2204_shouldShowLaunchComposer.ts";
import {wN,$He} from "../../vendor/m3864.ts";
import {sU,Pge} from "../../vendor/m3855.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Xpt,RTo} from "../../vendor/m4576.ts";
import {bJ,sM} from "../../vendor/m4581.ts";
import {b,M} from "../../runtime.ts";
import {O4} from "../../vendor/m2337.ts";
// Poll the daemon's ping endpoint until it responds OK or the deadline passes
async function mPe(timeoutMs: number): Promise<boolean> {
  let deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if ((await OT({
      proto: Cp,
      op: "ping"
    })).ok) return !0;
    await l5t.setTimeout(100);
  }
  return !1;
}

// Nudge the daemon and wait for it to converge (restart in-place or confirm up)
async function KAm(forceTransient: boolean): Promise<string> {
  let startMs = Date.now(),
    gotResponse = !1,
    lastState = "restarting",
    deadline = Date.now() + 1e4;
  while (Date.now() < deadline) {
    let nudgeResult = await OT({
      proto: Cp,
      op: "nudge"
    });
    if (nudgeResult.ok && nudgeResult.op === "nudge") {
      if (gotResponse = !0, !nudgeResult.restarting) {
        // Daemon confirmed stable — check if a newer binary should take over
        if (await JAm(nudgeResult.version, forceTransient)) return "down";
        if (Date.now() - startMs > 200) logEvent("tengu_bg_skew_nudge", {
          converged: !0,
          duration_ms: Date.now() - startMs
        });
        return "up";
      }
      lastState = "restarting", await l5t.setTimeout(100);
      continue;
    }
    if (!nudgeResult.ok && nudgeResult.code === "ETIMEOUT") {
      gotResponse = !0, lastState = "etimeout", await l5t.setTimeout(100);
      continue;
    }
    if (!nudgeResult.ok && nudgeResult.code === "ENOCONN") {
      // No socket connection — check if the daemon process is actually alive
      if (!gotResponse && (await yI().catch(() => null))) gotResponse = !0;
      if (!gotResponse) return "down";
      lastState = "enoconn", await l5t.setTimeout(100);
      continue;
    }
    return "up";
  }
  return logEvent("tengu_bg_skew_nudge", {
    converged: !1,
    restarting: lastState === "restarting",
    etimeout: lastState === "etimeout",
    enoconn: lastState === "enoconn"
  }), "down";
}

// Ensure the background daemon is running, starting it if needed
async function lj(options: any = {}): Promise<any> {
  let startMs = Date.now();
  if ((await KAm(options.forceTransient ?? !1)) === "up") return Ie("daemon_ensure_running"), {
    ok: !0
  };
  let isServiceEnabled = await AOl(),
    isExecStale = isServiceEnabled && (await o5n());
  if (isExecStale) logEvent("tengu_bg_daemon_service_stale_exec", {}), logForDebugging("daemon service exec path is stale (binary deleted) — falling back to transient spawn. Run 'claude daemon install' to repair.", {
    level: "warn"
  });
  let usedService = !1;
  if (isServiceEnabled && !isExecStale) {
    usedService = !0, options.onStarting?.();
    // Kill any zombie daemon before restarting via service
    let zombieErr = await fOl();
    if (zombieErr) return Oe("daemon_ensure_running", "daemon_ensure_zombie_kill_failed"), {
      ok: !1,
      reason: zombieErr
    };
    let serviceRestartResult = await r5n(),
      reachable = await mPe(5000);
    if (logEvent("tengu_bg_daemon_install", {
      outcome_ok: reachable,
      via_service: !0,
      fresh_install: !1,
      duration_ms: Date.now() - startMs,
      platform_darwin: zt() === "macos",
      platform_linux: zt() === "linux",
      platform_windows: zt() === "windows"
    }), reachable) return Ie("daemon_ensure_running"), {
      ok: !0
    };
    logEvent("tengu_bg_daemon_service_poll_fallthrough", {
      sr_ok: serviceRestartResult.ok
    }), logForDebugging(`daemon service did not become reachable within 5s${serviceRestartResult.ok ? "" : ` (${serviceRestartResult.error})`} — falling back to transient spawn. Run 'claude daemon install' to repair.`, {
      level: "warn"
    });
  }
  // Prompt user to install daemon service if not yet set up and conditions are met
  if (!isServiceEnabled && !options.forceTransient && getDaemonColdStart() === "ask" && hOl() && !getGlobalConfig().daemonInstallPromptDismissed) return logEvent("tengu_bg_daemon_cold_start_ask", {}), {
    ok: !1,
    askInstall: !0,
    reason: "No background daemon is running. Run 'claude daemon install' to set it up as a persistent service."
  };
  if (!usedService) {
    options.onStarting?.();
    let zombieErr = await fOl();
    if (zombieErr) return Oe("daemon_ensure_running", "daemon_ensure_zombie_kill_failed"), {
      ok: !1,
      reason: zombieErr
    };
  }
  // Track time since last spawn to detect rapid respawns (clock jumps)
  let spawnGapMs = zxo === null ? null : Date.now() - zxo;
  zxo = Date.now();
  let encodedOrigin = Le({
      label: XAm(),
      cwd: Pt(),
      pid: process.pid
    }),
    {
      err: spawnErr,
      stderrPath: stderrLogPath
    } = await W7n(["daemon", "run", "--origin", "transient", "--spawned-by", encodedOrigin]);
  if (spawnErr) {
    if (stderrLogPath) NJ.rm(Yxo.dirname(stderrLogPath), {
      recursive: !0,
      force: !0
    }).catch(() => {});
    return logEvent("tengu_bg_daemon_spawn_failed", {
      errno_enoent: dn(spawnErr) === "ENOENT",
      errno_eacces: dn(spawnErr) === "EACCES",
      errno: xp(spawnErr) ?? "unknown"
    }), Oe("daemon_ensure_running", "daemon_ensure_spawn_failed"), {
      ok: !1,
      reason: `spawn ${bgSupervisorNoun()}: ${Se(spawnErr)}`
    };
  }
  let reachable = await mPe(30000),
    hadClockJump = Date.now() - startMs > 60000;
  if (!reachable && hadClockJump) reachable = await mPe(5000);
  if (!reachable && !hadClockJump) reachable = await mPe(Uue - 30000);
  let hadStderr = !1,
    stderrErrno: string | undefined;
  if (!reachable && stderrLogPath) {
    let stderrContent = ((await wN(stderrLogPath, 1048576)) ?? "").slice(0, 2000);
    if (stderrContent.length > 0) hadStderr = !0, logForDebugging(`daemon: transient spawn stderr:\n${stderrContent}`, {
      level: "error"
    }), stderrErrno = [...stderrContent.matchAll(/\bE[A-Z]{2,14}\b/g)].find(matchArr => !"/\\".includes(stderrContent[matchArr.index - 1] ?? "."))?.[0];
  }
  if (stderrLogPath) NJ.rm(Yxo.dirname(stderrLogPath), {
    recursive: !0,
    force: !0
  }).catch(() => {});
  if (logEvent("tengu_bg_daemon_install", {
    outcome_ok: reachable,
    via_service: !1,
    fresh_install: !1,
    clock_jump: hadClockJump,
    duration_ms: Date.now() - startMs,
    platform_darwin: zt() === "macos",
    platform_linux: zt() === "linux",
    platform_windows: zt() === "windows",
    had_stderr: hadStderr,
    ...(spawnGapMs !== null && {
      spawn_gap_ms: spawnGapMs
    }),
    ...(stderrErrno && {
      stderr_errno: stderrErrno
    })
  }), reachable) return QAm(), Ie("daemon_ensure_running"), {
    ok: !0
  };
  return Oe("daemon_ensure_running", "daemon_ensure_transient_unreachable"), {
    ok: !1,
    reason: `${bgSupervisorNoun()} did not become reachable within ${Uue / 1000}s`
  };
}

// Get the mtime of the resolved real path for a binary, used to detect newer builds
async function mOl(filePath: string): Promise<number | null> {
  try {
    return (await NJ.stat(await NJ.realpath(filePath))).mtimeMs;
  } catch {
    return null;
  }
}

// Determine the CLI command label used to invoke the current process
function zAm(): string {
  let cliArgs = sU();
  return cliArgs.prefixArgs[0] ?? cliArgs.cmd;
}

// Check whether the client binary is newer than the running daemon and should take over
function YAm(versionInfo: any): boolean {
  if (versionInfo.daemonOrigin !== "transient") return !1;
  if (versionInfo.daemonVersion === versionInfo.clientVersion) return !1;
  if (versionInfo.daemonTarget === versionInfo.clientTarget) return !1;
  // If no target path, fall back to semver comparison
  if (!versionInfo.daemonTarget) return c5t.valid(versionInfo.clientVersion) !== null && c5t.valid(versionInfo.daemonVersion) !== null && c5t.gt(versionInfo.clientVersion, versionInfo.daemonVersion);
  if (versionInfo.clientMtimeMs === null || versionInfo.daemonMtimeMs === null) return !1;
  return versionInfo.clientMtimeMs > versionInfo.daemonMtimeMs;
}

// Attempt binary takeover: kill a stale transient daemon so new sessions use the newer binary
async function JAm(daemonVersion: string, forceTransient: boolean): Promise<boolean> {
  if (daemonVersion === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION) return !1;
  if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_binary_takeover", !0)) return !1;
  if (await AOl()) return !1;
  if (!forceTransient && getDaemonColdStart() === "ask" && hOl() && !getGlobalConfig().daemonInstallPromptDismissed) return !1;
  let clientExecPath = await NJ.realpath(zAm()).catch(() => null);
  if (!clientExecPath) return !1;
  let daemonInfo = await yI().catch(() => null);
  if (!daemonInfo) return !1;
  let [clientMtimeMs, daemonMtimeMs] = await Promise.all([mOl(clientExecPath), daemonInfo.launchTarget ? mOl(daemonInfo.launchTarget) : Promise.resolve(null)]);
  if (!YAm({
    daemonVersion: daemonInfo.version,
    daemonOrigin: daemonInfo.origin,
    daemonTarget: daemonInfo.launchTarget,
    clientVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION,
    clientTarget: clientExecPath,
    daemonMtimeMs: daemonMtimeMs,
    clientMtimeMs: clientMtimeMs
  })) return !1;
  let waitResult = await Xpt(daemonInfo.pid);
  if (waitResult === "timed-out") {
    try {
      process.kill(daemonInfo.pid, "SIGKILL");
    } catch {}
    waitResult = await Xpt(daemonInfo.pid);
  }
  if (waitResult !== "exited") return !1;
  return logForDebugging(`bg: ${bgSupervisorNoun()} pid ${daemonInfo.pid} runs ${daemonInfo.version}; this binary (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}) is a newer build — retired the stale ${bgSupervisorNoun()} so new sessions use the current binary`, {
    level: "warn"
  }), logEvent("tengu_bg_daemon_binary_takeover", {
    daemon_age_ms: Date.now() - daemonInfo.startedAt
  }), !0;
}

// Check for a zombie daemon (pid alive but socket dead) and signal it to restart
async function fOl(): Promise<string | null> {
  let daemonInfo = await yI().catch(() => null);
  if (!daemonInfo || Date.now() - daemonInfo.startedAt <= 5000) return null;
  let pingResult = await OT({
      proto: Cp,
      op: "ping"
    }, {
      timeoutMs: 1000
    }),
    diagInfo = {
      started_ago_ms: Date.now() - daemonInfo.startedAt,
      origin_transient: daemonInfo.origin === "transient",
      origin_service: daemonInfo.origin === "service",
      version_skew: daemonInfo.version !== {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    };
  // If ping succeeded or timed out, daemon isn't truly a zombie
  if (pingResult.ok || pingResult.code === "ETIMEOUT") return logEvent("tengu_bg_daemon_zombie_false_positive", {
    ...diagInfo,
    recheck_etimeout: !pingResult.ok
  }), null;
  let socketExists = !1;
  try {
    socketExists = await NJ.lstat(bJ()).then(() => !0, () => !1);
  } catch {}
  if (logForDebugging(`bg: supervisor pid ${daemonInfo.pid} alive but control socket unreachable — signalling restart`, {
    level: "warn"
  }), (await Xpt(daemonInfo.pid)) === "eperm") return `${bgSupervisorNoun()} socket missing; could not restart supervisor (EPERM)`;
  return logEvent("tengu_bg_daemon_zombie_restart", {
    pid: daemonInfo.pid,
    ...diagInfo,
    sock_exists: socketExists
  }), null;
}

// Check if the daemon service backend is currently installed and enabled
async function AOl(): Promise<boolean> {
  if (process.env.CLAUDE_CONFIG_DIR || !hDe()) return !1;
  return TJ().catch(() => !1);
}

// Compute a short label for the spawn origin based on CLI args
function XAm(): string {
  let cliArgv = process.argv.slice(2);
  if (cliArgv[0] === "agents") return "claude agents";
  if (cliArgv.includes("--bg")) return "claude --bg";
  return "claude";
}

// Warn if running under systemd-logind with KillUserProcesses=yes (daemon will die on logout)
async function QAm(): Promise<void> {
  let platform = zt();
  if (platform !== "linux" && platform !== "wsl") return;
  let logindConf = await NJ.readFile("/etc/systemd/logind.conf", "utf8").catch(() => "");
  if (!/^\s*KillUserProcesses\s*=\s*yes\b/im.test(logindConf)) return;
  logForDebugging("logind KillUserProcesses=yes — SSH disconnect will kill the transient daemon and its background jobs. Run `loginctl enable-linger $USER` or `claude daemon install` to keep it alive across logout.", {
    level: "warn"
  });
}

// Return true if the user should be offered daemon service install
function hOl(): boolean {
  return isDaemonServiceInstallEnabled() && hDe() && !process.env.CLAUDE_CONFIG_DIR && isDaemonCliEnabled();
}
var NJ: any,
  Yxo: any,
  c5t: any,
  l5t: any,
  Uue = 45000,
  zxo: number | null = null;
var h8e = b(() => {
  bv();
  ln();
  zn();
  Ct();
  Qn();
  Go();
  qe();
  bt();
  $He();
  RTo();
  qs();
  Pge();
  Xt();
  yne();
  gDe();
  gue();
  sM();
  rM();
  Kxo();
  NJ = require("fs/promises"), Yxo = require("path"), c5t = M(O4(), 1), l5t = require("timers/promises");
});
export {mPe,KAm,lj,mOl,zAm,YAm,JAm,fOl,AOl,XAm,QAm,hOl,NJ,Yxo,c5t,l5t,Uue,zxo,h8e};
