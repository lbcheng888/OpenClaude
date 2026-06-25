// @ts-nocheck
import {isFirstPartyProvider as Nl,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Ne} from "../../vendor/m583.ts";
import {hasStoredOAuthToken as pE,lo} from "./2036_withOAuthRefreshLock.ts";
import {getCurrentProjectConfig as eh,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {hasWorktreeCreateHook as rZ,kUe} from "../../vendor/m2241.ts";
import {findCanonicalGitRoot as zm,getBranch as Ry,isBranchOnOrigin as bRt,ia} from "../../vendor/m698.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
/**
 * Remote-agent / "neapolitan" feature gating and git-branch resolution helpers.
 *
 * These functions decide whether the remote-agent experience is available and
 * resolve the branch a remote agent should run against. Identifiers here are
 * cross-module references resolved through the bundle's lazy init graph.
 */

/**
 * Whether the "neapolitan" remote-agent feature should be enabled.
 *
 * Requires: a usable workspace, not already running inside a remote Claude Code
 * session, a passing prerequisite check, prior remote-session usage, and a
 * detected remote environment. Final decision is gated by the
 * `tengu_neapolitan` experiment flag (defaulting to disabled).
 */
function Sqt(): boolean {
  if (!Nl()) return !1;
  if (Ne.CLAUDE_CODE_REMOTE) return !1;
  if (!pE()) return !1;
  if (!eh().hasUsedRemoteSession || !Ot().hasRemoteEnvironment) return !1;
  return it("tengu_neapolitan", !1);
}

/**
 * Whether a remote agent can be launched: either remote mode is forced, or the
 * current working directory maps to a known remote repository.
 */
function Uza(): boolean {
  return rZ() || zm(Lt()) !== null;
}

/**
 * Resolve the branch name a remote agent should run against.
 *
 * Returns `undefined` for a detached HEAD or when the local branch has not been
 * pushed to origin (after logging a warning), otherwise returns the branch name.
 */
async function $za(): Promise<string | undefined> {
  let workingDir = Lt(),
    branchName = await Ry(workingDir);
  if (branchName === "HEAD") return;
  if (await bRt(branchName, workingDir)) return branchName;
  A(`[remote agent] local branch '${branchName}' is not pushed to origin; remote agent will run against the repository's default branch`);
  return;
}

/**
 * Normalize a permission mode for remote execution: drop "bubble", map
 * "bypassPermissions" to "auto", and pass any other mode through unchanged.
 */
function qza(permissionMode: string): string | undefined {
  if (permissionMode === "bubble") return;
  if (permissionMode === "bypassPermissions") return "auto";
  return permissionMode;
}

/** Lazy module initializer wiring this config module's dependencies. */
var Ygo = b(() => {
  jn();
  lo();
  tr();
  Po();
  qe();
  Ir();
  ia();
  kUe();
  Ps();
});

export {Sqt,Uza,$za,qza,Ygo};
