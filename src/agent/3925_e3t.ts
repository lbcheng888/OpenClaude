// @ts-nocheck
import {getInitialSettings as n8,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {getOriginalCwd as G8,lt as w_} from "../session/0132_sent.ts";
import {getCurrentWorktreeSession as z$} from "../config/3348_flushAnalyticsSinks.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {findGitRoot as V5,isLinkedWorktree as xj_,ia as gK} from "../../vendor/m698.ts";
import {hasWorktreeCreateHook as kTH,kUe as vaH} from "../../vendor/m2241.ts";
import {lge as pzH} from "../../vendor/m2704.ts";
import {b as L} from "../../runtime.ts";
/**
 * Background-session worktree isolation write-guard.
 *
 * In "background" (`bg`) Claude Code sessions and in subagents, file edits to the
 * shared repository checkout can be rejected until the session has isolated its
 * changes into a git worktree. This module computes the effective isolation mode
 * and, for any candidate write target, decides whether the write is currently
 * allowed — returning a human-readable rejection message when it is not.
 *
 * Cross-module helpers referenced here (assigned by this module's lazy
 * initializer `KC_`):
 *   - n8()  — read merged Claude Code settings/config.
 *   - G8()  — git repository root (project working directory).
 *   - u_()  — current working directory.
 *   - z$()  — current bg-session worktree isolation state, or undefined when the
 *             session has not been isolated. Shape: { originalCwd, worktreePath }.
 *   - V5(p) — git repository identity for path `p` (used to detect repo membership).
 *   - kTH() — whether the current location is inside a git repository.
 *   - xj_(p)— whether `p` resolves to the main repo rather than an actual worktree.
 *   - pzH   — the name of the EnterWorktree tool (interpolated into guidance text).
 */

/** Effective background-session isolation mode. */
type BgIsolationMode = "worktree" | "none";

/**
 * Tool execution context passed to {@link s7_} alongside the target file path.
 * Only the fields this guard reads are typed; other fields may be present.
 */
interface WorktreeGuardContext {
  /** Worktree path this subagent is isolated into, when spawned with `isolation: "worktree"`. */
  agentWorktree?: string;
  /** Identifier of the running subagent, when this write originates from a subagent. */
  agentId?: string;
}

/**
 * Resolve the effective background-session worktree isolation mode.
 *
 * The `CLAUDE_BG_ISOLATION` environment variable takes precedence when set to a
 * recognized value ("worktree" or "none"); otherwise the repository's configured
 * `worktree.bgIsolation` setting is used.
 *
 * NOTE: kept under its bundle name `M_q` because it is also referenced by other
 * modules (e.g. the agent system-prompt builder in agent/5152), so renaming it
 * would break those cross-module references.
 */
function M_q(): BgIsolationMode | undefined {
  let envMode = process.env.CLAUDE_BG_ISOLATION;
  if (envMode === "worktree" || envMode === "none") return envMode;
  return n8().worktree?.bgIsolation;
}

/**
 * Decide whether a write to `targetPath` is permitted under worktree isolation.
 *
 * Returns `null` when the write is allowed, or a guidance message explaining why
 * the write is blocked (so the caller can surface it as a tool error). The guard
 * fires for subagents isolated into a worktree and for background sessions whose
 * changes have not yet been isolated.
 *
 * @param targetPath Absolute path of the file about to be written.
 * @param context Tool execution context (subagent worktree / agent id).
 */
function s7_(targetPath: string, context: WorktreeGuardContext): string | null {
  {
    if (context.agentWorktree) {
      let repoRoot = G8();
      return targetPath.startsWith(repoRoot + nodePath.sep) && !targetPath.startsWith(context.agentWorktree + nodePath.sep) ? `This agent is isolated in the worktree ${context.agentWorktree}. Edit the worktree copy of this file instead of the shared-checkout path.` : null;
    }
    if (process.env.CLAUDE_CODE_SESSION_KIND !== "bg") return null;
    let isolationState = z$();
    if (isolationState) return targetPath.startsWith(isolationState.originalCwd + nodePath.sep) && !targetPath.startsWith(isolationState.worktreePath + nodePath.sep) ? `This session is now isolated in ${isolationState.worktreePath}. Edit the worktree copy of this file instead of the shared-checkout path.` : null;
    if (M_q() === "none") return null;
    let guardedRoot = context.agentId ? G8() : u_();
    if (!targetPath.startsWith(guardedRoot + nodePath.sep)) return null;
    if (!V5(guardedRoot) && !kTH()) return null;
    if (xj_(guardedRoot)) return null;
    if (context.agentId) return `This subagent's parent bg session hasn't isolated yet, so writes to the shared checkout are blocked. Re-spawn this agent with \`isolation: "worktree"\`, or have the parent call ${pzH} before spawning. (To disable this guard for this repo, set \`"worktree": {"bgIsolation": "none"}\` in .claude/settings.json.)`;
    return `This background session hasn't isolated its changes yet. Call ${pzH} first so edits land in a worktree instead of the shared checkout, then retry this edit using the worktree path. (To disable this guard for this repo, set \`"worktree": {"bgIsolation": "none"}\` in .claude/settings.json.)`;
  }
  return null;
}

/** Node.js `path` module, populated by the lazy module initializer {@link KC_}. */
var nodePath: typeof import("path");

/**
 * Lazy module initializer (esbuild `__esm` style). Callers invoke `KC_()` to
 * ensure this module's cross-module dependencies are loaded and `nodePath` is
 * bound before using {@link s7_}.
 */
var KC_ = L(() => {
  w_();
  Fq();
  gK();
  vaH();
  N8();
  nodePath = require("path");
});
export {M_q as $uo,s7_ as Gut,nodePath as Wut,KC_ as e3t};
