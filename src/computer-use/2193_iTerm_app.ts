// @ts-nocheck
import {je as oH} from "../../vendor/m577.ts";
import {collectFlagValueIndexes as O1} from "../mcp/0728_serverName.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Computer-use subsystem: macOS terminal bundle ID resolution and platform defaults.
 *
 * Provides helpers to map terminal names (TERM_PROGRAM / oH.terminal) to their
 * macOS CFBundleIdentifier, and exposes the default platform config for computer-use.
 */

/**
 * Returns the CFBundleIdentifier for the currently-running terminal application.
 *
 * Checks the `__CFBundleIdentifier` env var first (set by macOS when launched from an
 * app bundle), then falls back to looking up `oH.terminal` in the known-terminal map.
 * Returns `null` if neither source yields a bundle ID.
 */
function nF9(): string | null {
  let bundleIdFromEnv: string | undefined = process.env.__CFBundleIdentifier;
  if (bundleIdFromEnv) return bundleIdFromEnv;
  return sR5[oH.terminal ?? ""] ?? null;
}

/**
 * Returns `true` if the sanitized MCP server name of `serverName` equals the
 * computer-use subsystem identifier (`"computer-use"`).
 */
function tDH(serverName: string): boolean {
  return O1(serverName) === wn;
}

/** The MCP subsystem name / server key used for computer-use. */
var wn = "computer-use";

/** Bundle ID for the headless / no-window CLI variant of Claude Code. */
var n28 = "com.anthropic.claude-code.cli-no-window";

/** Map from TERM_PROGRAM value (or terminal name) to macOS CFBundleIdentifier. */
var sR5: Record<string, string>;

/**
 * Default computer-use platform configuration.
 *
 * `screenshotFiltering` is set to `"native"` (macOS screenshot APIs),
 * `platform` identifies the host OS.
 */
var U16: { screenshotFiltering: string; platform: string };

/** Lazy initializer: populates `sR5` (terminal→bundleId map) and `U16` (platform config). */
var LOH = L(() => {
  _q();
  sR5 = {
    "iTerm.app": "com.googlecode.iterm2",
    Apple_Terminal: "com.apple.Terminal",
    ghostty: "com.mitchellh.ghostty",
    kitty: "net.kovidgoyal.kitty",
    WarpTerminal: "dev.warp.Warp-Stable",
    vscode: "com.microsoft.VSCode"
  };
  U16 = {
    screenshotFiltering: "native",
    platform: "darwin"
  };
});

export {nF9 as dfi,tDH as uve,wn as _K,n28 as yNr,sR5 as wJu,U16 as w_n,LOH as wfe};
