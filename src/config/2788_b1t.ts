// @ts-nocheck
import {subprocessEnv as QN,VM as Vv} from "../agent/2231_subprocessEnv.ts";
import {b as L} from "../../runtime.ts";
/**
 * Subprocess environment variable allowlist management.
 *
 * Tracks which env vars may be passed to child processes, combining:
 *  - a hardcoded set of always-forwarded vars (shell/session infrastructure)
 *  - session-scoped env vars registered at session start
 *  - env vars discovered by the spawn-env probe of the user's shell
 *
 * The allowlist is only valid once a shell snapshot has been obtained and
 * the spawn-env probe has completed (or explicitly nulled out on failure).
 */

/** Sets whether a shell snapshot is currently available. */
function VM6(snapshotAvailable: boolean | string): void {
  isSnapshotEnabled = snapshotAvailable;
}

/** Updates the set of session-scoped env var names that are allowed to pass through. */
function SV7(keys: Iterable<string>): void {
  sessionEnvVarAllowlist = new Set(keys);
}

/**
 * Records the env var keys discovered by the spawn-env probe.
 * Pass null when the probe failed; those keys will be excluded from the allowlist.
 */
function yM6(keys: string[] | null): void {
  spawnEnvProbeKeys = keys === null ? null : new Set(keys);
}

/**
 * Returns the complete set of allowed env var names for subprocess spawning,
 * or null if the allowlist is not yet ready (no snapshot or probe still pending).
 */
function Mh_(): Set<string> | null {
  if (!isSnapshotEnabled || spawnEnvProbeKeys === null) return null;
  let allowedKeys = new Set(Object.keys(QN()));
  for (let key of alwaysAllowedEnvVars) allowedKeys.add(key);
  for (let key of sessionEnvVarAllowlist) allowedKeys.add(key);
  for (let key of spawnEnvProbeKeys) allowedKeys.add(key);
  return allowedKeys;
}
var isSnapshotEnabled: boolean | string = !1,
  sessionEnvVarAllowlist: Set<string>,
  spawnEnvProbeKeys: Set<string> | null = null,
  alwaysAllowedEnvVars: string[];

/** Lazy-init block: sets up the env var allowlist module. */
var Xh_ = L(() => {
  Vv();
  sessionEnvVarAllowlist = new Set();
  alwaysAllowedEnvVars = ["SHELL", "GIT_EDITOR", "CLAUDECODE", "AI_AGENT", "CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_CHILD_SESSION", "TRACEPARENT", "CLAUDE_CODE_EXECPATH", "TMUX", "TMPDIR", "CLAUDE_CODE_TMPDIR", "TMPPREFIX", "BUN_OPTIONS", "TEMP", "TMP", "CLAUDE_EFFORT"];
});
export {VM6 as TIn,SV7 as y8i,yM6 as SIn,Mh_ as S1t,isSnapshotEnabled as g8i,sessionEnvVarAllowlist as _8i,spawnEnvProbeKeys as Rzr,alwaysAllowedEnvVars as iFd,Xh_ as b1t};
