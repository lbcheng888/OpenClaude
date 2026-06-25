// @ts-nocheck
import {AT,fue} from "../../vendor/m4610.ts";
import {zd,bL} from "../../vendor/m4515.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {VI,dne} from "../../vendor/m4605.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {FKn,NKn,gPe,sJ,_Pe} from "../../vendor/m4607.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {getDaemonColdStart as FJn,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {NJn,ePo} from "./5152_cmd.ts";
import {cn,Xd,Ce,Ct} from "../../vendor/m197.ts";
import {bgSupervisorNoun as wy,isDaemonServiceInstallEnabled as QRe,isDaemonCliEnabled as $fe,fC} from "./2212_shouldShowLaunchComposer.ts";
import {U1,x0e} from "./3883_x0e.ts";
import {RB,Y_e} from "../../vendor/m3873.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {rht,URo} from "../../vendor/m4604.ts";
import {aJ,CL} from "../../vendor/m4609.ts";
import {b,x} from "../../runtime.ts";
import {t4} from "../../vendor/m2347.ts";
// @ts-nocheck
async function mPe(timeoutMs) {
  let deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if ((await AT({
      proto: zd,
      op: "ping"
    })).ok) return true;
    await xVt.setTimeout(100);
  }
  return false;
}
async function KAm(forceTransient) {
  let startMs = Date.now(),
    gotResponse = false,
    lastState = "restarting",
    deadline = Date.now() + 1e4;
  while (Date.now() < deadline) {
    let nudgeResult = await AT({
      proto: zd,
      op: "nudge"
    });
    if (nudgeResult.ok && nudgeResult.op === "nudge") {
      if (gotResponse = true, !nudgeResult.restarting) {
        if (await JAm(nudgeResult.version, forceTransient)) return "down";
        if (Date.now() - startMs > 200) W("tengu_bg_skew_nudge", {
          converged: true,
          duration_ms: Date.now() - startMs
        });
        return "up";
      }
      lastState = "restarting", await xVt.setTimeout(100);
      continue;
    }
    if (!nudgeResult.ok && nudgeResult.code === "ETIMEOUT") {
      gotResponse = true, lastState = "etimeout", await xVt.setTimeout(100);
      continue;
    }
    if (!nudgeResult.ok && nudgeResult.code === "ENOCONN") {
      if (!gotResponse && (await VI().catch(() => null))) gotResponse = true;
      if (!gotResponse) return "down";
      lastState = "enoconn", await xVt.setTimeout(100);
      continue;
    }
    return "up";
  }
  return W("tengu_bg_skew_nudge", {
    converged: false,
    restarting: lastState === "restarting",
    etimeout: lastState === "etimeout",
    enoconn: lastState === "enoconn"
  }), "down";
}
async function N6(options = {}) {
  let startMs = Date.now();
  if ((await KAm(options.forceTransient ?? false)) === "up") return He("daemon_ensure_running"), {
    ok: true
  };
  let isServiceEnabled = await V2l(),
    isExecStale = isServiceEnabled && (await FKn());
  if (isExecStale) W("tengu_bg_daemon_service_stale_exec", {}), A("daemon service exec path is stale (binary deleted) \u2014 falling back to transient spawn. Run 'claude daemon install' to repair.", {
    level: "warn"
  });
  let usedService = false;
  if (isServiceEnabled && !isExecStale) {
    usedService = true, options.onStarting?.();
    let zombieErr = await G2l();
    if (zombieErr) return xe("daemon_ensure_running", "daemon_ensure_zombie_kill_failed"), {
      ok: false,
      reason: zombieErr
    };
    let serviceRestartResult = await NKn(),
      reachable = await mPe(5000);
    if (W("tengu_bg_daemon_install", {
      outcome_ok: reachable,
      via_service: true,
      fresh_install: false,
      duration_ms: Date.now() - startMs,
      platform_darwin: Yt() === "macos",
      platform_linux: Yt() === "linux",
      platform_windows: Yt() === "windows"
    }), reachable) return He("daemon_ensure_running"), {
      ok: true
    };
    W("tengu_bg_daemon_service_poll_fallthrough", {
      sr_ok: serviceRestartResult.ok
    }), A(`daemon service did not become reachable within 5s${serviceRestartResult.ok ? "" : ` (${serviceRestartResult.error})`} \u2014 falling back to transient spawn. Run 'claude daemon install' to repair.`, {
      level: "warn"
    });
  }
  if (!isServiceEnabled && !options.forceTransient && FJn() === "ask" && K2l() && !Ot().daemonInstallPromptDismissed) return W("tengu_bg_daemon_cold_start_ask", {}), {
    ok: false,
    askInstall: true,
    reason: "No background daemon is running. Run 'claude daemon install' to set it up as a persistent service."
  };
  if (!usedService) {
    options.onStarting?.();
    let zombieErr = await G2l();
    if (zombieErr) return xe("daemon_ensure_running", "daemon_ensure_zombie_kill_failed"), {
      ok: false,
      reason: zombieErr
    };
  }
  let spawnGapMs = tPo === null ? null : Date.now() - tPo;
  tPo = Date.now();
  let encodedOrigin = Pe({
      label: lRm(),
      cwd: Lt(),
      pid: process.pid
    }),
    {
      err: spawnErr,
      stderrPath: stderrLogPath
    } = await NJn(["daemon", "run", "--origin", "transient", "--spawned-by", encodedOrigin]);
  if (spawnErr) {
    if (stderrLogPath) HJ.rm(nPo.dirname(stderrLogPath), {
      recursive: true,
      force: true
    }).catch(() => {});
    return W("tengu_bg_daemon_spawn_failed", {
      errno_enoent: cn(spawnErr) === "ENOENT",
      errno_eacces: cn(spawnErr) === "EACCES",
      errno: Xd(spawnErr) ?? "unknown"
    }), xe("daemon_ensure_running", "daemon_ensure_spawn_failed"), {
      ok: false,
      reason: `spawn ${wy()}: ${Ce(spawnErr)}`
    };
  }
  let reachable = await mPe(30000),
    hadClockJump = Date.now() - startMs > 60000;
  if (!reachable && hadClockJump) reachable = await mPe(5000);
  if (!reachable && !hadClockJump) reachable = await mPe(Kue - 30000);
  let hadStderr = false,
    stderrErrno;
  if (!reachable && stderrLogPath) {
    let stderrContent = ((await U1(stderrLogPath, 1048576)) ?? "").slice(0, 2000);
    if (stderrContent.length > 0) hadStderr = true, A(`daemon: transient spawn stderr:
${stderrContent}`, {
      level: "error"
    }), stderrErrno = [...stderrContent.matchAll(/\bE[A-Z]{2,14}\b/g)].find(matchArr => !"/\\".includes(stderrContent[matchArr.index - 1] ?? "."))?.[0];
  }
  if (stderrLogPath) HJ.rm(nPo.dirname(stderrLogPath), {
    recursive: true,
    force: true
  }).catch(() => {});
  if (W("tengu_bg_daemon_install", {
    outcome_ok: reachable,
    via_service: false,
    fresh_install: false,
    clock_jump: hadClockJump,
    duration_ms: Date.now() - startMs,
    platform_darwin: Yt() === "macos",
    platform_linux: Yt() === "linux",
    platform_windows: Yt() === "windows",
    had_stderr: hadStderr,
    ...(spawnGapMs !== null && {
      spawn_gap_ms: spawnGapMs
    }),
    ...(stderrErrno && {
      stderr_errno: stderrErrno
    })
  }), reachable) return cRm(), He("daemon_ensure_running"), {
    ok: true
  };
  return xe("daemon_ensure_running", "daemon_ensure_transient_unreachable"), {
    ok: false,
    reason: `${wy()} did not become reachable within ${Kue / 1000}s`
  };
}
async function W2l(filePath) {
  try {
    return (await HJ.stat(await HJ.realpath(filePath))).mtimeMs;
  } catch {
    return null;
  }
}
function sRm() {
  let cliArgs = RB();
  return cliArgs.prefixArgs[0] ?? cliArgs.cmd;
}
function iRm(versionInfo) {
  if (versionInfo.daemonOrigin !== "transient") return false;
  if (versionInfo.daemonVersion === versionInfo.clientVersion) return false;
  if (versionInfo.daemonTarget === versionInfo.clientTarget) return false;
  if (!versionInfo.daemonTarget) return DVt.valid(versionInfo.clientVersion) !== null && DVt.valid(versionInfo.daemonVersion) !== null && DVt.gt(versionInfo.clientVersion, versionInfo.daemonVersion);
  if (versionInfo.clientMtimeMs === null || versionInfo.daemonMtimeMs === null) return false;
  return versionInfo.clientMtimeMs > versionInfo.daemonMtimeMs;
}
async function JAm(daemonVersion, forceTransient) {
  if (daemonVersion === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION) return false;
  if (!it("tengu_bg_binary_takeover", true)) return false;
  if (await V2l()) return false;
  if (!forceTransient && FJn() === "ask" && K2l() && !Ot().daemonInstallPromptDismissed) return false;
  let clientExecPath = await HJ.realpath(sRm()).catch(() => null);
  if (!clientExecPath) return false;
  let daemonInfo = await VI().catch(() => null);
  if (!daemonInfo) return false;
  let [clientMtimeMs, daemonMtimeMs] = await Promise.all([W2l(clientExecPath), daemonInfo.launchTarget ? W2l(daemonInfo.launchTarget) : Promise.resolve(null)]);
  if (!iRm({
    daemonVersion: daemonInfo.version,
    daemonOrigin: daemonInfo.origin,
    daemonTarget: daemonInfo.launchTarget,
    clientVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    clientTarget: clientExecPath,
    daemonMtimeMs: daemonMtimeMs,
    clientMtimeMs: clientMtimeMs
  })) return false;
  let waitResult = await rht(daemonInfo.pid);
  if (waitResult === "timed-out") {
    try {
      process.kill(daemonInfo.pid, "SIGKILL");
    } catch {}
    waitResult = await rht(daemonInfo.pid);
  }
  if (waitResult !== "exited") return false;
  return A(`bg: ${wy()} pid ${daemonInfo.pid} runs ${daemonInfo.version}; this binary (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}) is a newer build \u2014 retired the stale ${wy()} so new sessions use the current binary`, {
    level: "warn"
  }), W("tengu_bg_daemon_binary_takeover", {
    daemon_age_ms: Date.now() - daemonInfo.startedAt
  }), true;
}
async function G2l() {
  let daemonInfo = await VI().catch(() => null);
  if (!daemonInfo || Date.now() - daemonInfo.startedAt <= 5000) return null;
  let pingResult = await AT({
      proto: zd,
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
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    };
  if (pingResult.ok || pingResult.code === "ETIMEOUT") return W("tengu_bg_daemon_zombie_false_positive", {
    ...diagInfo,
    recheck_etimeout: !pingResult.ok
  }), null;
  let socketExists = false;
  try {
    socketExists = await HJ.lstat(aJ()).then(() => true, () => false);
  } catch {}
  if (A(`bg: supervisor pid ${daemonInfo.pid} alive but control socket unreachable \u2014 signalling restart`, {
    level: "warn"
  }), (await rht(daemonInfo.pid)) === "eperm") return `${wy()} socket missing; could not restart supervisor (EPERM)`;
  return W("tengu_bg_daemon_zombie_restart", {
    pid: daemonInfo.pid,
    ...diagInfo,
    sock_exists: socketExists
  }), null;
}
async function V2l() {
  if (process.env.CLAUDE_CONFIG_DIR || !gPe()) return false;
  return sJ().catch(() => false);
}
function lRm() {
  let cliArgv = process.argv.slice(2);
  if (cliArgv[0] === "agents") return "claude agents";
  if (cliArgv.includes("--bg")) return "claude --bg";
  return "claude";
}
async function cRm() {
  let platform = Yt();
  if (platform !== "linux" && platform !== "wsl") return;
  let logindConf = await HJ.readFile("/etc/systemd/logind.conf", "utf8").catch(() => "");
  if (!/^\s*KillUserProcesses\s*=\s*yes\b/im.test(logindConf)) return;
  A("logind KillUserProcesses=yes \u2014 SSH disconnect will kill the transient daemon and its background jobs. Run `loginctl enable-linger $USER` or `claude daemon install` to keep it alive across logout.", {
    level: "warn"
  });
}
function K2l() {
  return QRe() && gPe() && !process.env.CLAUDE_CONFIG_DIR && $fe();
}
var HJ,
  nPo,
  DVt,
  xVt,
  Kue = 45000,
  tPo = null;
var sGe = b(() => {
  fC();
  mn();
  jn();
  kt();
  tr();
  Po();
  qe();
  Ct();
  x0e();
  URo();
  Es();
  Y_e();
  tn();
  dne();
  _Pe();
  fue();
  CL();
  bL();
  ePo();
  HJ = require("fs/promises"), nPo = require("path"), DVt = x(t4(), 1), xVt = require("timers/promises");
});

export {mPe as mOe,KAm as oRm,N6,W2l,sRm,iRm,JAm as aRm,G2l,V2l,lRm,cRm,K2l,HJ,nPo,DVt,xVt,Kue,tPo,sGe};
