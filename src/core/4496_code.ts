// @ts-nocheck
import {ud as K3,mc as G1} from "../config/0645_maxBytes.ts";
import {execFileNoThrow as B6,oa as l7} from "../../vendor/m684.ts";
import {b0 as YL} from "../../vendor/m2206.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {b as L,M as u} from "../../runtime.ts";
import {O4 as Op} from "../../vendor/m2337.ts";
// Restored from obfuscated Claude Code 2.1.177.
//
// PURPOSE: "Continue in Claude Desktop" deep-link bridge. This module detects
// whether the Claude Desktop app is installed (and new enough), builds a
// `claude://resume?session=<id>` deep link for the current CLI session, and
// hands that link off to the OS so Desktop can take over the session. It is
// the backing logic for the `/desktop` slash command.
//
// Only minified file-local symbols are renamed/typed. All cross-module
// references (B6, K3, v_, N, YL, Op, u, L, w_, FH, l7, G1) are preserved
// byte-for-byte; their behavior is unchanged. Names that were already
// recovered to their real identifiers are kept as-is.

// ---------------------------------------------------------------------------
// External symbols referenced by this module (declared elsewhere in the
// bundle). Typed loosely here purely so this file type-checks in isolation;
// these declarations do not exist at runtime and never alter logic.
// ---------------------------------------------------------------------------

/** Result of running an external command (subprocess wrapper). */
interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

/** Run an external binary with args, resolving to its exit code and output. */
declare function B6(binary: string, args: string[]): Promise<CommandResult>;
/** True if the given filesystem path exists. */
declare const K3: (path: string) => Promise<boolean>;
/** Current (active) session id. */
declare function v_(): string;
/** Structured/debug logger. */
declare function N(message: string): void;
/** Semver "greater-than-or-equal" comparison: true if `version` >= `min`. */
declare function YL(version: string, min: string): boolean;
/** Lazily-resolved semver module factory (returns the CJS namespace). */
declare function Op(): unknown;
/** esbuild CJS->ESM interop helper. */
declare function u<T = unknown>(mod: unknown, interop: number): T;
/** esbuild lazy module-init wrapper: runs `init` once, returns the trigger. */
declare function L(init: () => void): () => void;
// Lazy-init dependencies pulled in by `izq` (the module bootstrapper) below.
declare function w_(): void;
declare function FH(): void;
declare function l7(): void;
declare function G1(): void;

/** Minimal shape of the imported semver module used here (only `.coerce`). */
interface SemverModule {
  /** Coerce a loose version string into a parsed semver, or null. */
  coerce(value: string): { version: string } | null;
}

// ---------------------------------------------------------------------------
// Module
// ---------------------------------------------------------------------------

/**
 * True when running from an internal Anthropic build of the CLI (the binary
 * path lives under one of the `build-ant*` / `build-external*` directories).
 * Used to target the `claude-dev` URL scheme and Electron-specific opening.
 */
function isInternalBuild(): boolean {
  let candidatePaths = [process.argv[1] || "", process.execPath || ""],
    internalBuildMarkers = ["/build-ant/", "/build-ant-native/", "/build-external/", "/build-external-native/"];
  return candidatePaths.some(path => internalBuildMarkers.some(marker => path.includes(marker)));
}

/**
 * Build the deep-link URL that asks Claude Desktop to resume the given
 * session, e.g. `claude://resume?session=<sessionId>` (or `claude-dev://`
 * for internal builds).
 */
function buildResumeDeepLink(sessionId: string): string {
  let scheme = isInternalBuild() ? "claude-dev" : "claude",
    url = new URL(`${scheme}://resume`);
  return url.searchParams.set("session", sessionId), url.toString();
}

/**
 * Detect whether Claude Desktop (and a handler for its URL scheme) is
 * installed on the current OS. Internal builds always report installed.
 */
async function isDesktopInstalled(): Promise<boolean> {
  if (isInternalBuild()) return !0;
  let platform = "darwin";
  if (platform === "darwin") return K3("/Applications/Claude.app");else if (platform === "linux") {
    let {
      code: exitCode,
      stdout: schemeHandler
    } = await B6("xdg-mime", ["query", "default", "x-scheme-handler/claude"]);
    return exitCode === 0 && schemeHandler.trim().length > 0;
  } else if (platform === "win32") {
    let {
      code: exitCode
    } = await B6("reg", ["query", "HKEY_CLASSES_ROOT\\claude", "/ve"]);
    return exitCode === 0;
  }
  return !1;
}

/**
 * Read the installed Claude Desktop version (macOS only, via the app's
 * Info.plist `CFBundleShortVersionString`). Returns null if it can't be read.
 */
async function readDesktopVersion(): Promise<string | null> {
  {
    let {
      code: exitCode,
      stdout: rawVersion
    } = await B6("defaults", ["read", "/Applications/Claude.app/Contents/Info.plist", "CFBundleShortVersionString"]);
    if (exitCode !== 0) return null;
    let version = rawVersion.trim();
    return version.length > 0 ? version : null;
  }
  return null;
}

/** Installation/readiness status of Claude Desktop for session handoff. */
type DesktopStatus =
  | { status: "not-installed" }
  | { status: "version-too-old"; version: string }
  | { status: "ready"; version: string };

/**
 * Determine whether Claude Desktop is ready to receive a session: checks that
 * it is installed and, when a version is readable, that it meets the minimum
 * required version (`MIN_DESKTOP_VERSION`).
 */
async function getDesktopStatus(): Promise<DesktopStatus> {
  if (!(await isDesktopInstalled())) return {
    status: "not-installed"
  };
  let rawVersion: string | null;
  try {
    rawVersion = await readDesktopVersion();
  } catch {
    return {
      status: "ready",
      version: "unknown"
    };
  }
  if (!rawVersion) return {
    status: "ready",
    version: "unknown"
  };
  let coerced = semver.coerce(rawVersion);
  if (!coerced || !YL(coerced.version, MIN_DESKTOP_VERSION)) return {
    status: "version-too-old",
    version: rawVersion
  };
  return {
    status: "ready",
    version: rawVersion
  };
}

/**
 * Open a deep link via the OS. Internal builds drive the `Electron` app with
 * AppleScript; otherwise the platform `open` handler is used. Returns true on
 * success (exit code 0).
 */
async function openDeepLink(deepLinkUrl: string): Promise<boolean> {
  N(`Opening deep link: ${deepLinkUrl}`);
  {
    if (isInternalBuild()) {
      let {
        code: electronExitCode
      } = await B6("osascript", ["-e", `tell application "Electron" to open location "${deepLinkUrl}"`]);
      return electronExitCode === 0;
    }
    let {
      code: openExitCode
    } = await B6("open", [deepLinkUrl]);
    return openExitCode === 0;
  }
  return !1;
}

/** Outcome of attempting to hand the current session off to Claude Desktop. */
type ResumeInDesktopResult =
  | { success: true; deepLinkUrl: string }
  | { success: false; error: string; deepLinkUrl?: string };

/**
 * Hand the current CLI session over to Claude Desktop: validate that Desktop
 * is installed and new enough, build the `claude://resume` deep link for the
 * active session, and open it. Returns a success/error result with the URL.
 */
async function resumeInDesktop(): Promise<ResumeInDesktopResult> {
  let sessionId = v_(),
    status = await getDesktopStatus();
  if (status.status === "not-installed") return {
    success: !1,
    error: "Claude Desktop is not installed. Install it from https://claude.ai/download"
  };
  if (status.status === "version-too-old") return {
    success: !1,
    error: `Claude Desktop ${status.version} is too old to resume this session. Please update to ${MIN_DESKTOP_VERSION} or later.`
  };
  let deepLinkUrl = buildResumeDeepLink(sessionId);
  if (!(await openDeepLink(deepLinkUrl))) return {
    success: !1,
    error: "Failed to open Claude Desktop. Please try opening it manually.",
    deepLinkUrl: deepLinkUrl
  };
  return {
    success: !0,
    deepLinkUrl: deepLinkUrl
  };
}

/** Imported semver module (resolved lazily by `izq`). */
var semver: SemverModule,
  /** Minimum Claude Desktop version required to resume a CLI session. */
  MIN_DESKTOP_VERSION = "1.1.9669";

/** Lazy module initializer: pulls dependencies and binds the semver import. */
var izq = L(() => {
  w_();
  FH();
  l7();
  G1();
  semver = u<SemverModule>(Op(), 1);
});

export {isInternalBuild as iyo,buildResumeDeepLink as Xjp,isDesktopInstalled as ayo,readDesktopVersion as Qjp,getDesktopStatus as lyo,openDeepLink as Zjp,resumeInDesktop as xsl,semver as Rsl,MIN_DESKTOP_VERSION as a8n,izq as cyo};
