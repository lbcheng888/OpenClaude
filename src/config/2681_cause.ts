// @ts-nocheck
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {nu as b5,lr as P8} from "../../vendor/m233.ts";
import {Ie as EH,vn as S6} from "../session/0621_length.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {$c as N5,Ct as L_} from "../../vendor/m197.ts";
import {b as L,x as u} from "../../runtime.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {dn as A6} from "./0137_namespace.ts";
import {Ii as l7,execFileNoThrow as B6} from "../../vendor/m690.ts";
import {u$i as jR7,ekn as gJ6} from "../../vendor/m2679.ts";
import {tI as mR,Rf as WY,T5 as OF} from "../../vendor/m465.ts";
import {Za as P4} from "../../vendor/m127.ts";
/**
 * Ripgrep integration module.
 *
 * Responsible for discovering, configuring, and invoking ripgrep (rg) for
 * file-system search operations.  Supports both the system-installed binary
 * and the embedded binary bundled inside the Claude native executable.
 */

// ---------------------------------------------------------------------------
// Cross-module symbols (kept AS-IS to preserve linkage)
// ---------------------------------------------------------------------------
// BR_ – child_process module (set in lazy-init block)
// MR7 – os module (set in lazy-init block)
// Rx8 – path module default-import wrapper (set in lazy-init block)
// UR_ – memoised ripgrep config resolver (set in lazy-init block)
// t_  – getPlatform(): "wsl" | "windows" | "macos" | "linux"
// u_  – getCwd(): string  (current working directory)
// P4  – isTrueEnvVar(val: string | undefined): boolean
// gJ6 – resolveCommand(cmd, extraArgs): { cmd: string }
// WY  – isBundledBinary(): boolean
// OF  – executableHasEmbeddedRipgrep(path: string): boolean
// b5  – countOccurrences(haystack: string | Buffer, needle: string): number
// N5  – UserAbortError class
// N   – debugLog(msg: string, opts?: { level: string }): void
// EH  – reportError(err: unknown): void
// c   – trackEvent(name: string, props: Record<string, unknown>): void
// B6  – runCommand(cmd: string, args: string[], opts?: object): Promise<{ code: number; stdout: string }>
// V6  – memoize(fn, keyFn?): typeof fn  (lazy memoised factory)
// L   – lazyInit(fn): () => void  (module-level lazy initialiser)
// u   – importDefault<T>(mod: T): { default: T }  (bundler interop)
// c7, y_, Fq, FH, A6, L_, l7, jR7, S6, y9, P8, mR – peer module init fns
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** How ripgrep was located. */
type RipgrepMode = "system" | "embedded";

/** Resolved ripgrep executable configuration. */
interface RipgrepConfig {
  mode: RipgrepMode;
  command: string;
  args: string[];
  argv0?: string;
}

/** Result of the first-use availability test. */
interface RipgrepAvailability {
  working: boolean;
  lastTested: number;
  config: RipgrepConfig;
}

/** Callback shape used by {@link spawnRipgrepWithCallback}. */
type RipgrepCallback = (err: NodeJS.ErrnoException | null, stdout: string, stderr: string) => void;

// ---------------------------------------------------------------------------
// Helper: wrap ENOENT errors in system-mode context
// ---------------------------------------------------------------------------

/**
 * If `err` is an ENOENT produced in system-ripgrep mode, wraps it so callers
 * can distinguish "binary not found" from "path not found".
 */
function wrapRipgrepEnoent(err: NodeJS.ErrnoException): NodeJS.ErrnoException {
  if (err.code === "ENOENT" && UR_().mode === "system") {
    let wrapped = Error(XO3, {
      cause: err
    }) as NodeJS.ErrnoException;
    return wrapped.code = "ENOENT", wrapped;
  }
  return err;
}

// ---------------------------------------------------------------------------
// Helper: extract { rgPath, rgArgs, argv0 } from current config
// ---------------------------------------------------------------------------

/** Returns the resolved ripgrep binary path and argument prefix. */
function getRipgrepPaths(): {
  rgPath: string;
  rgArgs: string[];
  argv0: string | undefined;
} {
  let cfg = UR_();
  return {
    rgPath: cfg.command,
    rgArgs: cfg.args,
    argv0: cfg.argv0
  };
}

// ---------------------------------------------------------------------------
// Helper: detect EAGAIN / "Resource temporarily unavailable" in stderr
// ---------------------------------------------------------------------------

/** Returns true when `stderrOutput` signals an EAGAIN / resource-busy error. */
function isEagainError(stderrOutput: string): boolean {
  return stderrOutput.includes("os error 11") || stderrOutput.includes("Resource temporarily unavailable");
}

// ---------------------------------------------------------------------------
// Core: spawn/exec ripgrep with a callback
// ---------------------------------------------------------------------------

/**
 * Spawns (or execFile-s) ripgrep with `rgFlags` and `cwd`, calling `callback`
 * when done.
 *
 * When `argv0` is set (embedded-binary mode) `spawn` is used so we can
 * override argv[0]; otherwise `execFile` is used for simplicity.
 *
 * @param rgFlags        - Extra flags to pass to rg (e.g. search patterns).
 * @param searchDir      - The directory to search in.
 * @param signal         - AbortSignal to cancel the search.
 * @param callback       - Called with (err, stdout, stderr) when complete.
 * @param singleThreaded - When true, forces `-j 1` (single-threaded) mode.
 */
function spawnRipgrepWithCallback(rgFlags: string[], searchDir: string, signal: AbortSignal, callback: RipgrepCallback, singleThreaded: boolean = !1): ReturnType<typeof BR_.spawn> | ReturnType<typeof BR_.execFile> {
  let {
      rgPath: binaryPath,
      rgArgs: baseArgs,
      argv0: argv0Override
    } = getRipgrepPaths(),
    singleThreadFlag = singleThreaded ? ["-j", "1"] : [],
    allArgs = [...baseArgs, ...singleThreadFlag, ...rgFlags, searchDir],
    defaultTimeoutMs = t_() === "wsl" ? 60000 : 20000,
    envTimeoutSecs = parseInt(process.env.CLAUDE_CODE_GLOB_TIMEOUT_SECONDS || "", 10) || 0,
    timeoutMs = envTimeoutSecs > 0 ? envTimeoutSecs * 1000 : defaultTimeoutMs;
  if (argv0Override) {
    let childProc = BR_.spawn(binaryPath, allArgs, {
        argv0: argv0Override,
        cwd: u_(),
        signal: signal,
        windowsHide: !0
      }),
      stdoutBuf = "",
      stderrBuf = "",
      stdoutTruncated = !1,
      stderrTruncated = !1;
    childProc.stdout?.on("data", (chunk: Buffer) => {
      if (!stdoutTruncated) {
        if (stdoutBuf += chunk.toString(), stdoutBuf.length > pR_) stdoutBuf = stdoutBuf.slice(0, pR_), stdoutTruncated = !0;
      }
    }), childProc.stderr?.on("data", (chunk: Buffer) => {
      if (!stderrTruncated) {
        if (stderrBuf += chunk.toString(), stderrBuf.length > pR_) stderrBuf = stderrBuf.slice(0, pR_), stderrTruncated = !0;
      }
    });
    let killTimerId: ReturnType<typeof setTimeout>,
      timedOut = !1,
      timeoutTimer = setTimeout(() => {
        timedOut = !0, childProc.kill("SIGTERM"), killTimerId = setTimeout((p: typeof childProc) => p.kill("SIGKILL"), 5000, childProc);
      }, timeoutMs),
      callbackFired = !1;
    return childProc.on("close", (exitCode: number | null, sig: NodeJS.Signals | null) => {
      if (callbackFired) return;
      if (callbackFired = !0, clearTimeout(timeoutTimer), clearTimeout(killTimerId), exitCode === 0 || exitCode === 1) callback(null, stdoutBuf, stderrBuf);else {
        let err = Error(`ripgrep exited with code ${exitCode}${sig ? ` (signal ${sig})` : ""}`) as NodeJS.ErrnoException;
        err.code = exitCode ?? void 0, err.signal = sig ?? (timedOut ? "SIGTERM" : void 0), callback(err, stdoutBuf, stderrBuf);
      }
    }), childProc.on("error", (err: NodeJS.ErrnoException) => {
      if (callbackFired) return;
      if (callbackFired = !0, clearTimeout(timeoutTimer), clearTimeout(killTimerId), err.code === "ENOENT") clearRipgrepCache();
      callback(err, stdoutBuf, stderrBuf);
    }), childProc;
  }
  return BR_.execFile(binaryPath, allArgs, {
    cwd: u_(),
    maxBuffer: pR_,
    signal: signal,
    timeout: timeoutMs,
    killSignal: "SIGKILL"
  }, callback);
}

// ---------------------------------------------------------------------------
// Count files using ripgrep --files
// ---------------------------------------------------------------------------

/**
 * Counts files in `searchDir` matching the given ripgrep flags (e.g.
 * `--files --hidden`).  Returns the count of newline-separated lines in
 * stdout.
 */
async function countFilesWithRipgrep(rgFlags: string[], searchDir: string, signal: AbortSignal): Promise<number> {
  let {
    rgPath: binaryPath,
    rgArgs: baseArgs,
    argv0: argv0Override
  } = getRipgrepPaths();
  return new Promise((resolve, reject) => {
    let childProc = BR_.spawn(binaryPath, [...baseArgs, ...rgFlags, searchDir], {
        argv0: argv0Override,
        cwd: u_(),
        signal: signal,
        windowsHide: !0,
        stdio: ["ignore", "pipe", "ignore"]
      }),
      lineCount = 0;
    childProc.stdout?.on("data", (chunk: Buffer) => {
      lineCount += b5(chunk, `
`);
    });
    let callbackFired = !1;
    childProc.on("close", (exitCode: number | null) => {
      if (callbackFired) return;
      if (callbackFired = !0, exitCode === 0 || exitCode === 1 || exitCode === null) resolve(lineCount);else reject(Error(`rg --files exited ${exitCode}`));
    }), childProc.on("error", (err: NodeJS.ErrnoException) => {
      if (callbackFired) return;
      callbackFired = !0;
      let wrappedErr = wrapRipgrepEnoent(err);
      if (err.code === "ENOENT" && argv0Override) clearRipgrepCache();
      reject(wrappedErr);
    });
  });
}

// ---------------------------------------------------------------------------
// Public: glob search (returns matching file paths)
// ---------------------------------------------------------------------------

/**
 * Runs a ripgrep glob/file-search and resolves with the list of matching
 * paths, or rejects with a {@link QJ6} (RipgrepTimeoutError) on timeout or a
 * {@link N5} (UserAbortError) on cancellation.
 *
 * Automatically retries in single-threaded mode (`-j 1`) when EAGAIN is
 * detected.
 */
async function runRipgrepFileSearch(rgFlags: string[], searchDir: string, signal: AbortSignal): Promise<string[]> {
  return WR7().catch((err: unknown) => {
    EH(err);
  }), new Promise((resolve, reject) => {
    let handleResult = (err: NodeJS.ErrnoException | null, stdoutData: string, stderrData: string, isRetry: boolean) => {
      if (!err) {
        resolve(stdoutData.trim().split(`
`).map((line: string) => line.replace(/\r$/, "")).filter(Boolean));
        return;
      }
      if (err.code === 1) {
        resolve([]);
        return;
      }
      if (["ENOENT", "EACCES", "EPERM"].includes(err.code as string)) {
        reject(wrapRipgrepEnoent(err));
        return;
      }
      if (!isRetry && isEagainError(stderrData)) {
        N("rg EAGAIN error detected, retrying with single-threaded mode (-j 1)"), c("tengu_ripgrep_eagain_retry", {}), spawnRipgrepWithCallback(rgFlags, searchDir, signal, (retryErr: NodeJS.ErrnoException | null, retryStdout: string, retryStderr: string) => {
          handleResult(retryErr, retryStdout, retryStderr, !0);
        }, !0);
        return;
      }
      let hasStdout = stdoutData && stdoutData.trim().length > 0,
        isKilledBySignal = err.signal === "SIGTERM" || err.signal === "SIGKILL" || err.code === "ABORT_ERR",
        isMaxBufferExceeded = err.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER",
        isUnexpectedExit = err.code === void 0 && (err.signal === void 0 || PO3.has(err.signal as NodeJS.Signals)),
        partialResults: string[] = [];
      if (hasStdout) {
        if (partialResults = stdoutData.trim().split(`
`).map((line: string) => line.replace(/\r$/, "")).filter(Boolean), partialResults.length > 0 && (isKilledBySignal || isMaxBufferExceeded || isUnexpectedExit)) partialResults = partialResults.slice(0, -1);
      }
      if (N(`rg error (signal=${err.signal}, code=${err.code}, stderr: ${stderrData}), ${partialResults.length} results`), err.code !== 2 && err.code !== "ABORT_ERR") if (isKilledBySignal || isMaxBufferExceeded || isUnexpectedExit || isEagainError(stderrData)) N(`rg failed (signal=${err.signal}, code=${err.code}): ${err.message}`, {
        level: "error"
      });else EH(err);
      if (isKilledBySignal && partialResults.length === 0) {
        if (signal.aborted && signal.reason?.name !== "TimeoutError") {
          reject(new N5());
          return;
        }
        reject(new QJ6(`Ripgrep search timed out after ${t_() === "wsl" ? 60 : 20} seconds. The search may have matched files but did not complete in time. Try searching a more specific path or pattern.`, partialResults));
        return;
      }
      resolve(partialResults);
    };
    spawnRipgrepWithCallback(rgFlags, searchDir, signal, (err: NodeJS.ErrnoException | null, stdout: string, stderr: string) => {
      handleResult(err, stdout, stderr, !1);
    });
  });
}

// ---------------------------------------------------------------------------
// Public: ripgrep status info
// ---------------------------------------------------------------------------

/** Returns a snapshot of the current ripgrep mode, path, and working state. */
function getRipgrepInfo(): {
  mode: RipgrepMode;
  path: string;
  working: boolean | null;
} {
  let cfg = UR_();
  return {
    mode: cfg.mode,
    path: cfg.command,
    working: YeH?.working ?? null
  };
}

// ---------------------------------------------------------------------------
// Internal: clear caches when binary is no longer valid
// ---------------------------------------------------------------------------

/** Clears all ripgrep-related memoisation caches. */
function clearRipgrepCache(): void {
  if (UR_.cache?.clear?.(), YeH?.working !== !1) WR7.cache?.clear?.(), YeH = null;
}

// ---------------------------------------------------------------------------
// Module-level variable declarations
// ---------------------------------------------------------------------------

var BR_: typeof import("child_process"),
  MR7: typeof import("os"),
  Rx8: {
    default: typeof import("path");
  },
  UR_: (() => RipgrepConfig) & {
    cache?: {
      clear?: () => void;
    };
  },
  /** Error message shown when ripgrep binary is not found in PATH. */
  XO3 = "ripgrep not found on PATH. Install it (brew install ripgrep / apt install ripgrep / winget install BurntSushi.ripgrep.MSVC) or use the native claude binary which embeds it.",
  /** Max bytes buffered from ripgrep stdout/stderr (20 MB). */
  pR_ = 20000000,
  /** Signals that indicate the process was interrupted by the user/OS. */
  PO3: Set<NodeJS.Signals>,
  /** RipgrepTimeoutError class — thrown when rg exceeds the per-search timeout. */
  QJ6: {
    new (message: string, partialResults: string[]): Error & {
      partialResults: string[];
      name: string;
    };
  },
  /** countFilesRoundedRg — memoised rounded file-count helper. */
  cJ6: ((searchDir: string, signal: AbortSignal, ignoreGlobs?: string[]) => Promise<number | undefined>) & {
    cache?: {
      clear?: () => void;
    };
  },
  /** Cached result of the first-use availability test (null = not yet run). */
  YeH: RipgrepAvailability | null = null,
  /** testRipgrepWorking — memoised first-use availability test. */
  WR7: (() => Promise<void>) & {
    cache?: {
      clear?: () => void;
    };
  };

// ---------------------------------------------------------------------------
// Lazy module initialiser
// ---------------------------------------------------------------------------

var we = L(() => {
  c7();
  y_();
  Fq();
  FH();
  A6();
  L_();
  l7();
  jR7();
  S6();
  y9();
  P8();
  mR();
  BR_ = require("child_process"), MR7 = require("os"), Rx8 = u(require("path")), UR_ = V6(() => {
    if (P4(process.env.USE_BUILTIN_RIPGREP)) {
      let {
        cmd: resolvedCmd
      } = gJ6("rg", []);
      if (resolvedCmd !== "rg") return {
        mode: "system",
        command: resolvedCmd,
        args: []
      };
    }
    if (WY()) {
      let embeddedCfg = {
        mode: "embedded",
        command: process.execPath,
        args: ["--no-config"],
        argv0: "rg"
      };
      if (OF(process.execPath)) return embeddedCfg;
      let {
        cmd: systemCmd
      } = gJ6("rg", []);
      if (systemCmd !== "rg") return {
        mode: "system",
        command: systemCmd,
        args: []
      };
      return embeddedCfg;
    }
    let {
      cmd: defaultCmd
    } = gJ6("rg", []);
    return {
      mode: "system",
      command: defaultCmd,
      args: []
    };
  });
  PO3 = new Set(["SIGHUP", "SIGINT", "SIGPIPE"]);
  QJ6 = class QJ6 extends Error {
    partialResults: string[];
    constructor(message: string, partialResults: string[]) {
      super(message);
      this.partialResults = partialResults;
      this.name = "RipgrepTimeoutError";
    }
  };
  cJ6 = V6(async (searchDir: string, signal: AbortSignal, ignoreGlobs: string[] = []) => {
    if (Rx8.resolve(searchDir) === Rx8.resolve(MR7.homedir())) return;
    try {
      let count: number,
        _unused = null;
      {
        let flags = ["--files", "--hidden"];
        ignoreGlobs.forEach((glob: string) => {
          flags.push("--glob", `!${glob}`);
        }), count = await countFilesWithRipgrep(flags, searchDir, signal);
      }
      if (count === 0) return 0;
      let magnitude = Math.floor(Math.log10(count)),
        roundingBase = Math.pow(10, magnitude);
      return Math.round(count / roundingBase) * roundingBase;
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") N(`countFilesRoundedRg failed: ${err}`, {
        level: "error"
      });
    }
  }, (searchDir: string, _signal: AbortSignal, ignoreGlobs: string[] = []) => `${searchDir}|${ignoreGlobs.join(",")}`);
  WR7 = V6(async () => {
    if (YeH !== null) return;
    let cfg = UR_();
    try {
      let result: {
        code: number;
        stdout: string;
      };
      if (cfg.argv0) {
        let proc = Bun.spawn([cfg.command, "--version"], {
            argv0: cfg.argv0,
            cwd: u_(),
            stderr: "ignore",
            stdout: "pipe",
            windowsHide: !0
          }),
          [stdoutText, exitCode] = await Promise.all([proc.stdout.text(), proc.exited]);
        result = {
          code: exitCode,
          stdout: stdoutText
        };
      } else result = await B6(cfg.command, [...cfg.args, "--version"], {
        timeout: 5000
      });
      let isWorking = result.code === 0 && !!result.stdout && result.stdout.startsWith("ripgrep ");
      YeH = {
        working: isWorking,
        lastTested: Date.now(),
        config: cfg
      }, N(`Ripgrep first use test: ${isWorking ? "PASSED" : "FAILED"} (mode=${cfg.mode}, path=${cfg.command})`), c("tengu_ripgrep_availability", {
        working: isWorking ? 1 : 0,
        using_system: cfg.mode === "system" ? 1 : 0
      });
    } catch (err) {
      YeH = {
        working: !1,
        lastTested: Date.now(),
        config: cfg
      }, N(`Ripgrep first use test threw (mode=${cfg.mode}, path=${cfg.command}): ${err instanceof Error ? err.message : String(err)}`, {
        level: "error"
      });
    }
  });
});
export {wrapRipgrepEnoent as f$i,getRipgrepPaths as h$e,isEagainError as d$i,spawnRipgrepWithCallback as p$i,countFilesWithRipgrep as Axd,runRipgrepFileSearch as Qie,getRipgrepInfo as h$i,clearRipgrepCache as _$i,BR_ as wLt,MR7 as m$i,Rx8 as AGr,UR_ as kLt,XO3 as Exd,pR_ as vLt,PO3 as Cxd,QJ6 as tkn,cJ6 as nkn,YeH as frt,WR7 as g$i,we as tee};
