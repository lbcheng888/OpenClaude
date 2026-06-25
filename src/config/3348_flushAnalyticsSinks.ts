// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {GM,hUe} from "../session/2203_shutdown1PEventLogging.ts";
import {Q7,KBt} from "../permissions/5229_trackDatadogEvent.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {mie,mz} from "../../vendor/m2349.ts";
import {du,iw} from "../../vendor/m2302.ts";
import {MF,nS} from "./2351_nS.ts";
import {SAn,jqr} from "../../vendor/m2423.ts";
import {Ne} from "../../vendor/m583.ts";
import {DAi,hg} from "../../vendor/m2280.ts";
import {getIsInteractive as ck,isSessionPersistenceDisabled as $9,getSessionId as It,getIsScrollDraining as WLe,getLastMainRequestId as iSt,lt} from "../session/0132_sent.ts";
import {sessionIdExists as JBt,getCurrentSessionTitle as ph,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Ce,Ct,allTools as R_} from "../../vendor/m197.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {Hga,kga,GBt} from "../../vendor/m3346.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Cs,tp} from "./2284_loggedTmuxCcDisable.ts";
import {Wd,Gga} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {GKe,ud} from "../../vendor/m134.ts";
import {Wga,QPn} from "../agent/5180_bigint.ts";
import {profileReport as Zbt,z9} from "../session/0243_profileReport.ts";
import {Ve} from "../../vendor/m5.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {ep} from "../../vendor/m2223.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Pje,ZX} from "../../vendor/m673.ts";
import {mK,setBgExitCause as iA} from "../../vendor/m231.ts";
import {Uto} from "../../vendor/m3345.ts";
import {vd,Ws} from "../session/1465_promise.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn,Zar} from "./0137_namespace.ts";
import {IA,aO} from "../telemetry/2225_names.ts";
import {LP,registerProcessIOErrorHandlers as Acr} from "../../vendor/m232.ts";
import {aA,kc} from "../../vendor/m234.ts";
import {qBt} from "../../vendor/m3343.ts";
// @ts-nocheck
/**
 * Graceful shutdown orchestration + analytics-sink flushing for Claude Code.
 *
 * Owns the process-wide shutdown state machine: signal handlers (SIGINT/SIGTERM/
 * SIGHUP), uncaught-exception / unhandled-rejection breakers, terminal-mode
 * cleanup, the resume hint, the orphan-detection watchdog and the final flush of
 * the analytics sinks (1P event logging + Datadog) before the process exits.
 *
 * Ported from v2.1.185 (config/3332_flushAnalyticsSinks.ts); v190 added the
 * proxy-aware error-data extraction helpers (hasProxyInChain / ownDataString /
 * protoDataString) and reworked the inline error classifier accordingly.
 */

/** Returns the currently active worktree-session descriptor (or null). */
function _f() {
  return VBt;
}
/** Records the active worktree session; remembers its name unless it joined an existing one. */
function _at(worktreeSession) {
  if (VBt = worktreeSession, worktreeSession && !worktreeSession.enteredExisting) qto = worktreeSession.worktreeName;
}
/** Resolves the worktree name to surface in the resume hint (null when joined an existing one). */
function Iga() {
  if (VBt) return VBt.enteredExisting ? null : VBt.worktreeName;
  return qto;
}
/** Clears the remembered worktree name. */
function h_e() {
  qto = null;
}
var VBt = null,
  qto = null;
var xga = {};
ft(xga, {
  flushAnalyticsSinks: () => flushAnalyticsSinks
});
/**
 * Flushes the analytics sinks (1P event logging + Datadog) with a 500ms cap,
 * so a slow/hung sink can never block process exit.
 */
async function flushAnalyticsSinks() {
  try {
    let [{
        shutdown1PEventLogging: flush1PEventLogging
      }, {
        shutdownDatadog: flushDatadog
      }] = await Promise.all([Promise.resolve().then(() => (GM(), hUe)), Promise.resolve().then(() => (Q7(), KBt))]),
      pendingFlushes = [flush1PEventLogging(), flushDatadog()];
    await Promise.race([Promise.all(pendingFlushes), Kn(500)]);
  } catch {}
}
var QOn = () => {};
var YBt = {};
ft(YBt, {
  setupGracefulShutdown: () => setupGracefulShutdown,
  resetShutdownState: () => resetShutdownState,
  releaseShutdownClaim: () => releaseShutdownClaim,
  recordUncaughtAndCheckBreaker: () => recordUncaughtAndCheckBreaker,
  protoDataString: () => protoDataString,
  ownDataString: () => ownDataString,
  markStartupActionStarted: () => markStartupActionStarted,
  isShuttingDown: () => isShuttingDown,
  hasProxyInChain: () => hasProxyInChain,
  gracefulShutdownSync: () => gracefulShutdownSync,
  gracefulShutdown: () => gracefulShutdown,
  getPendingShutdownForTesting: () => getPendingShutdownForTesting,
  flushAnalyticsSinks: () => G3e,
  exitIfStartupNeverMounted: () => exitIfStartupNeverMounted,
  emitScrollTelemetrySummary: () => emitScrollTelemetrySummary,
  disarmOrphanCheck: () => disarmOrphanCheck,
  cleanupTerminalModes: () => cleanupTerminalModes,
  claimShutdown: () => claimShutdown,
  STARTUP_MOUNT_GRACE_MS: () => STARTUP_MOUNT_GRACE_MS
});
/**
 * Restores the terminal to a usable state: shows the cursor, unmounts the
 * alt-screen renderer if active, drains stdin, and clears the terminal title.
 */
function cleanupTerminalModes() {
  if (!process.stdout.isTTY) return;
  try {
    g_e.writeSync(1, mie);
    let renderer = du.get(process.stdout);
    if (renderer?.isAltScreenActive) try {
      renderer.unmount();
    } catch {
      g_e.writeSync(1, MF());
    }
    if (renderer?.drainStdin(), renderer?.detachForShutdown(), SAn(), !Ne.CLAUDE_CODE_DISABLE_TERMINAL_TITLE) g_e.writeSync(1, DAi);
  } catch {}
}
/** Prints the "resume this session" hint once, with the worktree flag when applicable. */
function Wto() {
  if (eLn) return;
  if (process.stdout.isTTY && ck() && !$9()) try {
    let sessionId = It();
    if (!JBt(sessionId)) return;
    let sessionTitle = ph(sessionId),
      resumeArg;
    if (sessionTitle) resumeArg = `"${sessionTitle.replaceAll("\\", "\\\\").replaceAll('"', "\\\"")}"`;else resumeArg = sessionId;
    let worktreeName = Iga(),
      worktreeFlag = worktreeName ? `--worktree ${worktreeName} ` : "";
    g_e.writeSync(1, bt.dim(`
Resume this session with:
claude ${worktreeFlag}--resume ${resumeArg}
`)), eLn = !0;
  } catch {}
}
/** Hard process exit: cancels the watchdog timer, drains stdin, then exits (SIGKILL fallback). */
function Gto(exitCode) {
  if (AIe !== void 0) clearTimeout(AIe), AIe = void 0;
  try {
    du.get(process.stdout)?.drainStdin();
  } catch {}
  try {
    process.exit(exitCode);
  } catch (exitError) {
    process.kill(process.pid, "SIGKILL");
  }
  throw Error("unreachable");
}
/** Synchronous entry point: kicks off the async graceful shutdown and records the pending promise. */
function gracefulShutdownSync(exitCode = 0, reason = "other", options) {
  process.exitCode = exitCode, Xto = gracefulShutdown(exitCode, reason, options).catch(shutdownError => {
    A(`Graceful shutdown failed: ${shutdownError}`, {
      level: "error"
    }), cleanupTerminalModes(), Wto(), Gto(exitCode);
  }).catch(() => {});
}
/**
 * Records an uncaught exception against the loop breaker; resets the count when
 * outside the time window. Returns true once the breaker trips.
 */
function recordUncaughtAndCheckBreaker(now) {
  if (U3e) return !1;
  if (now - Kto > Vto) yat = 0, Kto = now, zBt = [];
  if (yat++, yat >= jep) return U3e = !0, !0;
  return !1;
}
/** Marks that a startup action has begun (used to detect "started but never mounted"). */
function markStartupActionStarted(action) {
  jto = !0, Yto = action;
}
/** True when a startup action started but has not yet completed. */
function Nga() {
  return jto && !Yto;
}
/** Exits with code 1 if the UI never mounted (and startup isn't still in progress). */
function exitIfStartupNeverMounted(errorInput) {
  if (du.everMounted || Nga() || isShuttingDown()) return;
  try {
    g_e.writeSync(2, `Claude Code could not start: ${Ce(errorInput)}
`);
  } catch {}
  gracefulShutdown(1);
}
/** Schedules the never-mounted check after the startup grace period. */
function Pga(errorInput) {
  if (!ck() || du.everMounted || Nga() || isShuttingDown()) return;
  setTimeout(exitIfStartupNeverMounted, STARTUP_MOUNT_GRACE_MS, errorInput).unref();
}
/**
 * Walks the prototype chain (bounded to 128 hops) looking for a Proxy. Returns
 * true if any link is a proxy, so callers avoid triggering proxy traps when
 * reading error fields.
 */
function hasProxyInChain(value) {
  if (value === null || typeof value !== "object" && typeof value !== "function") return !1;
  let current = value;
  for (let hop = 0; hop < 128; hop++) {
    if (current === null) return !1;
    if (tLn.types.isProxy(current)) return !0;
    current = Object.getPrototypeOf(current);
  }
  return !0;
}
/** Reads an own string-valued data property without invoking getters/proxy traps. */
function ownDataString(value, key) {
  if (value === null || typeof value !== "object") return;
  if (tLn.types.isProxy(value)) return;
  let descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && "value" in descriptor && typeof descriptor.value === "string" ? descriptor.value : void 0;
}
/** Reads a string-valued data property along the prototype chain (bounded), skipping proxies. */
function protoDataString(value, key) {
  if (value === null || typeof value !== "object") return;
  let current = value;
  for (let hop = 0; hop < 128; hop++) {
    if (current === null) return;
    if (tLn.types.isProxy(current)) return;
    let descriptor = Object.getOwnPropertyDescriptor(current, key);
    if (descriptor) return "value" in descriptor && typeof descriptor.value === "string" ? descriptor.value : void 0;
    current = Object.getPrototypeOf(current);
  }
  return;
}
/** True for an MCP connection-closed error (McpError with code -32000). */
function Jep(value) {
  try {
    return value instanceof Error && value.name === "McpError" && value.code === -32000;
  } catch {
    return !1;
  }
}
/** Whether a shutdown is currently in progress. */
function isShuttingDown() {
  return W3e;
}
/** Arms the orphan-detection watchdog: exits if stdout/stdin become unusable. */
function $ga() {
  if ($3e !== void 0 || !process.stdin.isTTY) return;
  $3e = setInterval(() => {
    if (WLe()) return;
    if (!process.stdout.writable || !process.stdin.readable) clearInterval($3e), wn("info", "shutdown_signal", {
      signal: "orphan_detected"
    }), gracefulShutdown(129);
  }, 30000), $3e.unref();
}
/** Disarms the orphan-detection watchdog. */
function disarmOrphanCheck() {
  if ($3e !== void 0) clearInterval($3e), $3e = void 0;
}
/** Marks shutdown as claimed and stops the orphan watchdog. */
function claimShutdown() {
  W3e = !0, disarmOrphanCheck();
}
/** Releases the shutdown claim and re-arms the orphan watchdog. */
function releaseShutdownClaim() {
  W3e = !1, $ga();
}
/** Emits a one-shot scroll telemetry summary on exit (interactive sessions only). */
function emitScrollTelemetrySummary() {
  try {
    if (ck() && Hga()) W("tengu_scroll_summary", {
      ...kga(),
      fullscreen: Cs()
    });
  } catch {}
}
/** Exported flush wrapper: lazily imports and runs flushAnalyticsSinks, swallowing errors. */
async function G3e() {
  try {
    let {
      flushAnalyticsSinks: flush
    } = await Promise.resolve().then(() => (QOn(), xga));
    await flush();
  } catch {}
}
/** Resets all module-level shutdown state (primarily for tests). */
function resetShutdownState() {
  if (W3e = !1, eLn = !1, yat = 0, Kto = 0, U3e = !1, zBt = [], jto = !1, Yto = !1, AIe !== void 0) clearTimeout(AIe), AIe = void 0;
  disarmOrphanCheck(), Xto = void 0;
}
/** Returns the in-flight shutdown promise, if any (test hook). */
function getPendingShutdownForTesting() {
  return Xto;
}
/**
 * Full async graceful shutdown: arms a hard-exit watchdog, cleans the terminal,
 * runs renderer teardown, session-end hooks and analytics flush (each guarded),
 * then exits. Idempotent \u2014 a second call while shutting down is a no-op.
 */
async function gracefulShutdown(exitCode = 0, reason = "other", options) {
  if (W3e) return;
  if (W3e = !0, options?.suppressResumeHint) eLn = !0;
  let {
      executeSessionEndHooks: executeSessionEndHooks,
      getSessionEndHookTimeoutMs: getSessionEndHookTimeoutMs
    } = await Promise.resolve().then(() => (Wd(), Gga)),
    hookTimeoutMs = getSessionEndHookTimeoutMs();
  AIe = setTimeout(timerExitCode => {
    cleanupTerminalModes(), Wto(), Gto(timerExitCode);
  }, Math.max(5000, hookTimeoutMs + 3500), exitCode), AIe.unref(), process.exitCode = exitCode, cleanupTerminalModes(), Wto();
  let cleanupTimer;
  try {
    let cleanupTask = (async () => {
      try {
        await GKe();
      } catch {}
    })();
    await Promise.race([cleanupTask, new Promise((resolve, reject) => {
      cleanupTimer = setTimeout(rejectFn => rejectFn(new qga()), 2000, reject);
    })]), clearTimeout(cleanupTimer);
  } catch {
    clearTimeout(cleanupTimer);
  }
  try {
    await Wga();
  } catch {}
  try {
    await executeSessionEndHooks(reason, {
      ...options,
      signal: AbortSignal.timeout(hookTimeoutMs)
    });
  } catch {}
  try {
    Zbt();
  } catch {}
  emitScrollTelemetrySummary();
  let lastRequestId = iSt();
  if (lastRequestId) W("tengu_cache_eviction_hint", {
    scope: Ve("session_end"),
    last_request_id: xr(lastRequestId)
  });
  if (await G3e(), options?.finalMessage) try {
    g_e.writeSync(2, options.finalMessage + `
`);
  } catch {}
  Gto(exitCode);
}
/** Builds the telemetry payload fragment carrying a hash of the error message. */
function Oga(errorInfo) {
  if (!errorInfo.error_message) return {};
  return {
    error_message_hash: ep(errorInfo.error_message)
  };
}
var tLn,
  g_e,
  eLn = !1,
  setupGracefulShutdown,
  jep = 10,
  Vto = 5000,
  yat = 0,
  Kto = 0,
  U3e = !1,
  Yep = 3,
  zBt,
  STARTUP_MOUNT_GRACE_MS = 1e4,
  jto = !1,
  Yto = !1,
  W3e = !1,
  AIe,
  $3e,
  Xto,
  qga;
var Np = b(() => {
  Gc();
  Wi();
  Pje();
  lt();
  mK();
  iw();
  jqr();
  nS();
  mz();
  hg();
  kt();
  QT();
  Uto();
  ud();
  vd();
  qe();
  pf();
  Ir();
  dn();
  Ct();
  IA();
  tp();
  LP();
  aA();
  QPn();
  GBt();
  _a();
  z9();
  tLn = require("util"), g_e = require("fs");
  setupGracefulShutdown = Hn(() => {
    ZX(() => {});
    let parentPid = process.ppid;
    if (process.on("SIGINT", () => {
      if (process.argv.includes("-p") || process.argv.includes("--print")) return;
      wn("info", "shutdown_signal", {
        signal: "SIGINT"
      }), gracefulShutdown(0);
    }), process.on("SIGTERM", () => {
      let sigtermContext = {
        uptime_s: Math.round(process.uptime()),
        ppid_changed: process.ppid !== parentPid,
        stdin_at_eof: process.stdin.readableEnded,
        stdin_destroyed: process.stdin.destroyed,
        is_tty: process.stdin.isTTY ?? !1
      };
      wn("info", "shutdown_signal", {
        signal: "SIGTERM",
        ...sigtermContext
      }), W("tengu_shutdown_signal", {
        signal: Ve("SIGTERM"),
        ...sigtermContext
      }), gracefulShutdown(143);
    }), process.env.CLAUDE_BG_BACKEND === "daemon") process.on("SIGHUP", () => {
      wn("info", "shutdown_signal", {
        signal: "SIGHUP_ignored_bg"
      });
    });else process.on("SIGHUP", () => {
      wn("info", "shutdown_signal", {
        signal: "SIGHUP"
      }), gracefulShutdown(129);
    }), $ga();
    Acr((errorPhase, errorKind) => {
      if (!ck()) return;
      wn("info", "shutdown_signal", {
        signal: `${errorPhase}_${errorKind}`
      }), gracefulShutdown(0);
    });
    let classifyError = errorValue => {
      let isProxied = hasProxyInChain(errorValue);
      if (!(!isProxied && errorValue instanceof Error)) {
        if (typeof errorValue === "string") return {
          error_name: "string",
          error_message: kc(errorValue).slice(0, 2000),
          isHostError: !1
        };
        let errorName = isProxied ? ownDataString(errorValue, "name") : protoDataString(errorValue, "name"),
          errorMessage = ownDataString(errorValue, "message"),
          nameAndMessage = [];
        if (errorName !== void 0) nameAndMessage.push(errorName);
        if (errorMessage !== void 0) nameAndMessage.push(errorMessage);
        let joinedMessage = nameAndMessage.length > 0 ? kc(nameAndMessage.join(": ")).slice(0, 2000) : void 0,
          errorStack = ownDataString(errorValue, "stack");
        return {
          error_name: "non-error",
          error_message: joinedMessage,
          error_stack: errorStack !== void 0 ? kc(errorStack).slice(0, 4000) : void 0,
          isHostError: !1
        };
      }
      let hostError = errorValue,
        hostName,
        hostMessage,
        hostStack;
      try {
        hostName = hostError.name;
      } catch {}
      try {
        hostMessage = hostError.message;
      } catch {}
      try {
        hostStack = hostError.stack;
      } catch {}
      return {
        error_name: typeof hostName === "string" ? hostName : "Error",
        error_message: typeof hostMessage === "string" ? kc(hostMessage).slice(0, 2000) : void 0,
        error_stack: typeof hostStack === "string" ? kc(hostStack).slice(0, 4000) : void 0,
        isHostError: !0
      };
    };
    process.on("uncaughtException", uncaughtValue => {
      if (U3e) return;
      let errorInfo = classifyError(uncaughtValue);
      wn("error", "uncaught_exception", errorInfo);
      let telemetryExtra = errorInfo.isHostError ? aO(uncaughtValue) : Oga(errorInfo);
      if (W("tengu_uncaught_exception", {
        error_name: errorInfo.error_name,
        ...telemetryExtra
      }), Zar()) {
        if (U3e = !0, A(`Uncaught exception under CLAUDE_CODE_SUPERVISED \u2014 exiting ${qBt}: ${errorInfo.error_name}`, {
          level: "error"
        }), Ws() && !isShuttingDown()) iA("uncaught:" + errorInfo.error_name);
        gracefulShutdown(qBt);
        return;
      }
      let breakerTripped = recordUncaughtAndCheckBreaker(Date.now());
      if (zBt.length < Yep || breakerTripped) zBt.push({
        name: errorInfo.error_name,
        message: (errorInfo.error_message ?? "").slice(0, 200),
        topFrame: telemetryExtra.error_top_frame
      });
      if (breakerTripped) {
        W("tengu_uncaught_exception_loop", {
          count: yat,
          window_ms: Vto,
          error_name: errorInfo.error_name,
          error_message_hash: telemetryExtra.error_message_hash
        }), cleanupTerminalModes();
        try {
          for (let loopEntry of zBt) g_e.writeSync(2, `Uncaught exception (loop): ${loopEntry.name}: ${loopEntry.message}${loopEntry.topFrame ? ` at ${loopEntry.topFrame}` : ""}
`);
          g_e.writeSync(2, `Uncaught exception loop detected (${yat} in ${Vto}ms) \u2014 forcing shutdown
`);
        } catch {}
        gracefulShutdown(1);
        return;
      }
      if (Ws() && !isShuttingDown()) {
        iA("uncaught:" + errorInfo.error_name), gracefulShutdown(1);
        return;
      }
      Pga(errorInfo.error_message ?? errorInfo.error_name);
    }), process.on("unhandledRejection", rejectionValue => {
      if (U3e) return;
      let errorInfo = classifyError(rejectionValue);
      if (W3e && errorInfo.isHostError && Jep(rejectionValue)) {
        A(`Swallowed MCP ConnectionClosed during shutdown: ${Ce(rejectionValue)}`);
        return;
      }
      if (wn("error", "unhandled_rejection", errorInfo), W("tengu_unhandled_rejection", {
        error_name: errorInfo.error_name,
        ...(errorInfo.isHostError ? aO(rejectionValue) : Oga(errorInfo))
      }), errorInfo.isHostError && R_(rejectionValue)) {
        A("Swallowed unhandled AbortError rejection (not exiting bg/supervised worker)");
        return;
      }
      if (Zar()) {
        if (U3e = !0, A(`Unhandled rejection under CLAUDE_CODE_SUPERVISED \u2014 exiting ${qBt}: ${errorInfo.error_name}`, {
          level: "error"
        }), Ws() && !isShuttingDown()) iA("unhandled:" + errorInfo.error_name);
        gracefulShutdown(qBt);
        return;
      }
      if (Ws() && !isShuttingDown()) {
        iA("unhandled:" + errorInfo.error_name), gracefulShutdown(1);
        return;
      }
      Pga(errorInfo.error_message ?? errorInfo.error_name);
    });
  });
  zBt = [];
  qga = class qga extends Error {
    constructor() {
      super("Cleanup timeout");
    }
  };
});

export {_f as getCurrentWorktreeSession,_at,Iga,h_e,VBt,qto,xga,flushAnalyticsSinks,QOn,YBt,cleanupTerminalModes,Wto,Gto,gracefulShutdownSync,recordUncaughtAndCheckBreaker,markStartupActionStarted,Nga,exitIfStartupNeverMounted,Pga,hasProxyInChain,ownDataString,protoDataString,Jep,isShuttingDown,$ga,disarmOrphanCheck,claimShutdown,releaseShutdownClaim,emitScrollTelemetrySummary,G3e,resetShutdownState,getPendingShutdownForTesting,gracefulShutdown,Oga,tLn,g_e,eLn,setupGracefulShutdown,jep,Vto,yat,Kto,U3e,Yep,zBt,STARTUP_MOUNT_GRACE_MS,jto,Yto,W3e,AIe,$3e,Xto,qga,Np as isAmberSentinelEnabled};
