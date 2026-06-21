// @ts-nocheck
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {st as q_,_l as P4} from "../../vendor/m5.ts";
import {Hpe as j3H,L2 as DI} from "./0640_existsSync.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
import {ns as aq} from "../mcp/2194_mcpServerName.ts";
/**
 * Shell tool configuration for Windows PowerShell / Bash selection.
 *
 * Determines whether to use PowerShell or Bash as the interactive shell tool
 * on Windows, based on the `CLAUDE_CODE_USE_POWERSHELL_TOOL` env var, platform
 * detection, Git Bash availability, and the `tengu_cobalt_ridge` feature flag.
 */

/** Display name constant for the PowerShell shell tool. */
var POWERSHELL_TOOL_NAME = "PowerShell";

/**
 * Returns `true` if the PowerShell tool should be used instead of Bash.
 *
 * Decision order:
 * 1. On non-Windows platforms → always false (never use PowerShell).
 * 2. `CLAUDE_CODE_USE_POWERSHELL_TOOL=false` → force false.
 * 3. `CLAUDE_CODE_USE_POWERSHELL_TOOL=true`  → force true.
 * 4. Git Bash not found on disk                → default true (fall back to PowerShell).
 * 5. Otherwise consult the `tengu_cobalt_ridge` feature flag (default false).
 */
function shouldUsePowerShellTool(): boolean {
  let envValue = process.env.CLAUDE_CODE_USE_POWERSHELL_TOOL;
  if (t_() !== "windows") return q_(envValue);
  if (P4(envValue)) return !1;
  if (q_(envValue)) return !0;
  if (j3H() === null) return !0;
  return Y_("tengu_cobalt_ridge", !1);
}

/**
 * Returns `true` if a usable Bash shell is available on the current platform.
 *
 * On non-Windows this is always `true`. On Windows it requires Git Bash to
 * be installed (i.e. `findGitBashPath()` returns a non-null path).
 */
function isBashAvailable(): boolean {
  if (t_() !== "windows") return !0;
  return j3H() !== null;
}

/**
 * Returns the name of the default shell to use: `"bash"` or `"powershell"`.
 *
 * Delegates to `isBashAvailable()` — if Bash is available it wins; otherwise
 * falls back to PowerShell.
 */
function getDefaultShellName(): "bash" | "powershell" {
  return isBashAvailable() ? "bash" : "powershell";
}

/** Mutable list of all interactive shell tool names (Bash + PowerShell). */
var shellToolNames: string[];

/** Module initialiser — populates `shellToolNames` after dependencies are ready. */
var O$ = L(() => {
  o6();
  A6();
  y9();
  DI();
  shellToolNames = [aq, POWERSHELL_TOOL_NAME];
});

export {POWERSHELL_TOOL_NAME as Js,shouldUsePowerShellTool as tN,isBashAvailable as Su,getDefaultShellName as E2e,shellToolNames as eN,O$ as oA};
