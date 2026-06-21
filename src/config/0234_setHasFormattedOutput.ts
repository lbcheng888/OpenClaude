// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {cLe as EkH,YWe as qQH,ng as $w} from "../../vendor/m132.ts";
import {j2o as Wyq,W2o as Zyq,q2o as Pyq} from "../../vendor/m134.ts";
import {Pn as b6,Lre as rY_,bt as L_} from "../../vendor/m195.ts";
import {getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {jt as Q_,ws as M9} from "../../vendor/m228.ts";
import {Gi as m7,ReactHooks as U3} from "../../vendor/m133.ts";
import {Le as bH,Xt as H6} from "./0228_encoding.ts";
import {Kc as x1,tv as SX} from "../../vendor/m232.ts";
import {writeToStderr as EQH,fO as tk} from "../../vendor/m230.ts";
import {tr as Y8,sn as A6} from "./0047_namespace.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
import {st as q_} from "../../vendor/m5.ts";
var _Sq = {};
j_(_Sq, {
  setHasFormattedOutput: () => setHasFormattedOutput,
  resetDebugLogRotationForTest: () => resetDebugLogRotationForTest,
  resetDebugCaches: () => resetDebugCaches,
  maybeRotateDebugLog: () => maybeRotateDebugLog,
  logForDebugging: () => logForDebugging,
  logAntError: () => logAntError,
  isDebugToStdErr: () => isDebugToStdErr,
  isDebugMode: () => isDebugMode,
  getMinDebugLogLevel: () => getMinDebugLogLevel,
  getHasFormattedOutput: () => getHasFormattedOutput,
  getDebugLogPath: () => getDebugLogPath,
  getDebugFilter: () => getDebugFilter,
  getDebugFilePath: () => getDebugFilePath,
  flushDebugLogs: () => flushDebugLogs,
  enableDebugLogging: () => enableDebugLogging
});

/** Returns process.argv with everything after `--` stripped off. */
function getArgvBeforeDashDash(): string[] {
  if (typeof process > "u" || !Array.isArray(process.argv)) return [];
  let dashDashIndex = process.argv.indexOf("--");
  return dashDashIndex === -1 ? process.argv : process.argv.slice(0, dashDashIndex);
}

/** Enables debug logging at runtime and returns the previous debug mode state. */
function enableDebugLogging(): boolean {
  let prevDebugMode = isDebugMode() || !1;
  return eEq = !0, isDebugMode.cache.clear?.(), prevDebugMode;
}

/** Clears all memoised debug-related caches and resets rotation state. */
function resetDebugCaches(): void {
  getMinDebugLogLevel.cache.clear?.(), isDebugMode.cache.clear?.(), getDebugFilter.cache.clear?.(), isDebugToStdErr.cache.clear?.(), getDebugFilePath.cache.clear?.(), nkH?.dispose(), nkH = null, dH8.cache.clear?.(), lkH = -1, qA_ = !1, sl_ = null;
}

/**
 * Resolves a raw file path string to an absolute path, or returns null if the
 * path is considered empty/falsy by `EkH`.
 */
function resolveDebugFilePath(rawPath: string): string | null {
  return EkH(rawPath) ? null : F5H.resolve(rawPath);
}

/**
 * Returns true if the given message should be written to the debug log,
 * taking debug mode and the active debug filter into account.
 */
function passesDebugFilter(message: string): boolean {
  if (!isDebugMode()) return !1;
  if (typeof process > "u" || typeof process.versions > "u" || typeof process.versions.node > "u") return !1;
  let filter = getDebugFilter();
  return Wyq(message, filter);
}

/** Sets whether the current output stream supports formatted (rich) output. */
function setHasFormattedOutput(value: boolean): void {
  UH8 = value;
}

/** Returns whether the current output stream supports formatted (rich) output. */
function getHasFormattedOutput(): boolean {
  return UH8;
}

/**
 * Rotates the debug log file once it exceeds `maxSize` bytes.
 * Tracks cumulative size across calls; the first call stats the file on disk.
 */
async function maybeRotateDebugLog(
  filePath: string,
  bytesWritten: number,
  maxSize: number = t11
): Promise<void> {
  if (lkH < 0) lkH = await qS.stat(filePath).then((stats: { size: number }) => stats.size).catch(() => 0);
  else lkH += bytesWritten;
  if (lkH <= maxSize || qA_) return;
  qA_ = !0;
  try {
    let rotatedPath = filePath.endsWith(".txt") ? `${filePath.slice(0, -4)}.1.txt` : `${filePath}.1`;
    try {
      await qS.rename(filePath, rotatedPath);
    } catch (renameErr: unknown) {
      if (!b6(renameErr)) await qS.unlink(rotatedPath).catch(() => {}), await qS.rename(filePath, rotatedPath).catch(() => qS.unlink(filePath).catch(() => {}));
    }
    lkH = 0;
  } finally {
    qA_ = !1;
  }
}

/** Resets log rotation state (for use in tests). */
function resetDebugLogRotationForTest(): void {
  lkH = -1, qA_ = !1;
}

/**
 * Computes a fallback log file path in the same directory as `logPath`,
 * named after the current session ID with a `.txt` extension.
 */
function computeFallbackLogPath(logPath: string): string {
  return sl_ = F5H.join(logPath, `${v_()}.txt`), sl_;
}

/**
 * Appends `content` to `logPath`, optionally creating `dirPath` first.
 * Falls back to a sibling path via `computeFallbackLogPath` if the append
 * fails with a path-related error.
 */
async function appendToLogFile(
  shouldMkdir: boolean,
  dirPath: string,
  logPath: string,
  content: string
): Promise<void> {
  if (shouldMkdir) await qS.mkdir(dirPath, {
    recursive: !0
  }).catch(() => {});
  let effectivePath = logPath;
  try {
    await qS.appendFile(logPath, content);
  } catch (appendErr: unknown) {
    if (!rY_(appendErr)) throw appendErr;
    effectivePath = computeFallbackLogPath(logPath), await qS.appendFile(effectivePath, content);
  }
  await maybeRotateDebugLog(effectivePath, Buffer.byteLength(content)).catch(swallowError), dH8();
}

/** No-op error handler used to silently swallow non-critical log write errors. */
function swallowError(): void {}

/** Returns (and lazily creates) the singleton buffered log writer. */
function getOrCreateLogWriter(): ReturnType<typeof qQH> {
  if (!nkH) {
    let lastDirPath: string | null = null;
    nkH = qQH({
      writeFn: (content: string) => {
        let logPath = getDebugLogPath(),
          dirPath = F5H.dirname(logPath),
          dirChanged = lastDirPath !== dirPath;
        if (lastDirPath = dirPath, isDebugMode()) {
          if (dirChanged) try {
            Q_().mkdirSync(dirPath);
          } catch {}
          let effectivePath = logPath;
          try {
            Q_().appendFileSync(logPath, content);
          } catch (syncAppendErr: unknown) {
            if (!rY_(syncAppendErr)) throw syncAppendErr;
            effectivePath = computeFallbackLogPath(logPath), Q_().appendFileSync(effectivePath, content);
          }
          maybeRotateDebugLog(effectivePath, Buffer.byteLength(content)).catch(swallowError), dH8();
          return;
        }
        al_ = al_.then(appendToLogFile.bind(null, dirChanged, dirPath, logPath, content)).catch(swallowError);
      },
      flushIntervalMs: 1000,
      maxBufferSize: 100,
      immediateMode: isDebugMode()
    }), m7(async () => {
      nkH?.dispose(), await al_;
    });
  }
  return nkH;
}

/** Flushes any buffered debug log entries and waits for all pending writes. */
async function flushDebugLogs(): Promise<void> {
  nkH?.flush(), await al_;
}

/**
 * Writes a structured debug log entry if debug mode is active and the
 * message passes the current filter.
 */
function logForDebugging(
  message: string,
  {
    level: logLevel
  }: { level?: string } = {
    level: "debug"
  }
): void {
  if (xH8[logLevel] < xH8[getMinDebugLogLevel()]) return;
  if (!passesDebugFilter(message)) return;
  if (UH8 && message.includes(`\n`)) message = bH(message);
  let entry = `${new Date().toISOString()} [${logLevel.toUpperCase()}] ${x1(message.trim())}\n`;
  if (isDebugToStdErr()) {
    EQH(entry);
    return;
  }
  getOrCreateLogWriter().write(entry);
}

/** Returns the active debug log file path, preferring explicit flags over env vars. */
function getDebugLogPath(): string {
  return getDebugFilePath() ?? sl_ ?? process.env.CLAUDE_CODE_DEBUG_LOGS_DIR ?? F5H.join(Y8(), "debug", `${v_()}.txt`);
}

/** Logs an Anthropic API error. Currently a no-op placeholder. */
function logAntError(_err: unknown, _context?: unknown): void {
  return;
}

// ── module-level state ──────────────────────────────────────────────────────

var qS: typeof import("fs/promises"),
  F5H: typeof import("path"),
  /** Maps log level names to their numeric priority. */
  xH8: Record<string, number>,
  /** Memoised: minimum log level that will actually be written. */
  getMinDebugLogLevel: (() => string) & { cache: Map<unknown, unknown> },
  /** True after `enableDebugLogging()` has been called. */
  eEq: boolean = !1,
  /** Memoised: true when any debug output channel is active. */
  isDebugMode: (() => boolean) & { cache: Map<unknown, unknown> },
  /** Memoised: compiled filter pattern from `--debug=<filter>`, or null. */
  getDebugFilter: (() => unknown | null) & { cache: Map<unknown, unknown> },
  /** Memoised: true when `--debug-to-stderr` / `-d2e` is present. */
  isDebugToStdErr: (() => boolean) & { cache: Map<unknown, unknown> },
  /** Memoised: explicit debug file path from `--debug-file`, or null. */
  getDebugFilePath: (() => string | null) & { cache: Map<unknown, unknown> },
  /** Whether the output stream supports formatted (rich) rendering. */
  UH8: boolean = !1,
  /** Maximum debug log file size before rotation (10 MiB). */
  t11: number = 10485760,
  /** Singleton buffered log writer, created on first use. */
  nkH: ReturnType<typeof qQH> | null = null,
  /** Promise chain serialising async log writes. */
  al_: Promise<void>,
  /** Current tracked byte size of the active log file; -1 = unread. */
  lkH: number = -1,
  /** True while a log rotation is in progress (prevents re-entrant rotation). */
  qA_: boolean = !1,
  /** Fallback log path used when the primary path is inaccessible. */
  sl_: string | null = null,
  /** Memoised async function that updates the `latest` symlink. */
  dH8: (() => Promise<void>) & { cache: Map<unknown, unknown> };

var _debugModuleInit = L(() => {
  c7();
  w_();
  $w();
  U3();
  Zyq();
  A6();
  L_();
  M9();
  tk();
  SX();
  H6();
  qS = require("fs/promises"), F5H = require("path"), xH8 = {
    verbose: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
  }, getMinDebugLogLevel = V6(() => {
    let level = process.env.CLAUDE_CODE_DEBUG_LOG_LEVEL?.toLowerCase().trim();
    if (level && Object.hasOwn(xH8, level)) return level;
    return "debug";
  });
  isDebugMode = V6(() => {
    let argv = getArgvBeforeDashDash();
    return eEq || q_(process.env.DEBUG) || q_(process.env.DEBUG_SDK) || argv.includes("--debug") || argv.includes("-d") || isDebugToStdErr() || argv.some((arg: string) => arg.startsWith("--debug=")) || getDebugFilePath() !== null;
  });
  getDebugFilter = V6(() => {
    let debugArg = getArgvBeforeDashDash().find((arg: string) => arg.startsWith("--debug="));
    if (!debugArg) return null;
    let filterStr = debugArg.substring(8);
    return Pyq(filterStr);
  }), isDebugToStdErr = V6(() => {
    let argv = getArgvBeforeDashDash();
    return argv.includes("--debug-to-stderr") || argv.includes("-d2e");
  }), getDebugFilePath = V6(() => {
    let argv = getArgvBeforeDashDash();
    for (let i = 0; i < argv.length; i++) {
      let arg = argv[i];
      if (arg.startsWith("--debug-file=")) return resolveDebugFilePath(arg.substring(13));
      if (arg === "--debug-file" && i + 1 < argv.length) return resolveDebugFilePath(argv[i + 1]);
    }
    return null;
  });
  al_ = Promise.resolve();
  dH8 = V6(async () => {
    try {
      let logPath = getDebugLogPath(),
        dirPath = F5H.dirname(logPath),
        latestLinkPath = F5H.join(dirPath, "latest");
      await qS.unlink(latestLinkPath).catch(() => {}), await qS.symlink(logPath, latestLinkPath);
    } catch {}
  });
});

export {_Sq as S3o,getArgvBeforeDashDash as gYt,enableDebugLogging,resetDebugCaches,resolveDebugFilePath as _3o,passesDebugFilter as X_c,setHasFormattedOutput,getHasFormattedOutput,maybeRotateDebugLog,resetDebugLogRotationForTest,computeFallbackLogPath as T3o,appendToLogFile as eyc,swallowError as esr,getOrCreateLogWriter as tyc,flushDebugLogs,logForDebugging,getDebugLogPath,logAntError,qS as uB,F5H as npe,xH8 as Zor,getMinDebugLogLevel,eEq as y3o,isDebugMode,getDebugFilter,isDebugToStdErr,getDebugFilePath,UH8 as osr,t11 as Q_c,nkH as wLe,al_ as AYt,lkH as vLe,qA_ as _yt,sl_ as hYt,dH8 as csr,_debugModuleInit as qe};
