// @ts-nocheck
import {qt as d_,tn as H6} from "./0230_encoding.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {addWatchedRepo as x58,onRepoBranchChange as u58,getCachedBranchForRepo as m58,VP as wN} from "../../vendor/m696.ts";
import {J_ as LJ,$X as Hs} from "../../vendor/m446.ts";
import {b as L} from "../../runtime.ts";
/**
 * Repo-checkout mapping utilities.
 *
 * Parses CLAUDE_CODE_REPO_CHECKOUTS and CLAUDE_CODE_BASE_REFS environment
 * variables (JSON objects encoded as strings) into Maps, and watches the git
 * branches for every checkout so that callers can be notified when the active
 * branch changes.
 */

/**
 * Parses a JSON-encoded `Record<string, string>` value into a `Map<string,
 * string>`. Returns an empty Map on missing input or parse errors.
 */
function parseEnvJsonMap(rawJson: string | undefined): Map<string, string> {
  let result: Map<string, string> = new Map();
  if (!rawJson) return result;
  try {
    let parsed = d_(rawJson);
    if (parsed && typeof parsed === "object") {
      for (let [key, value] of Object.entries(parsed)) if (typeof value === "string") result.set(key, value);
    }
  } catch (err) {
    N(`[repo-checkouts] Failed to parse env map: ${GH(err)}`, {
      level: "error"
    });
  }
  return result;
}

/** Returns the cached repo-checkout map (keyed by checkout label, valued by absolute path). */
function getRepoCheckoutsMap(): Map<string, string> {
  if (repoCheckoutsCache) return repoCheckoutsCache;
  let rawEnv = process.env.CLAUDE_CODE_REPO_CHECKOUTS;
  if (!rawEnv) return repoCheckoutsCache = new Map([["", u_()]]), repoCheckoutsCache;
  return repoCheckoutsCache = parseEnvJsonMap(rawEnv), repoCheckoutsCache;
}

/** Returns the cached base-refs map (keyed by checkout label, valued by git ref). */
function getBaseRefsMap(): Map<string, string> {
  if (baseRefsCache) return baseRefsCache;
  return baseRefsCache = parseEnvJsonMap(process.env.CLAUDE_CODE_BASE_REFS), baseRefsCache;
}

/**
 * Finds the checkout label for a given directory path by checking which
 * checkout root is a prefix of `dirPath`. Returns `undefined` if no match.
 */
function findCheckoutKeyForDir(dirPath: string): string | undefined {
  for (let [checkoutKey, checkoutPath] of getRepoCheckoutsMap()) if (dirPath === checkoutPath || dirPath.startsWith(checkoutPath + pathModule.sep)) return checkoutKey;
  return;
}

/**
 * Initialises branch-watching for all repo checkouts and registers the
 * provided callback to be invoked whenever the current-branch state changes.
 */
async function initRepoCheckoutWatcher(onBranchChange: ((update: {
  current_branches: Record<string, string>;
}) => void) | null): Promise<void> {
  branchChangeCallback = onBranchChange;
  for (let [, checkoutPath] of getRepoCheckoutsMap()) await x58(checkoutPath);
  u58(() => void pollCurrentBranches());
}

/** Polls all checkout paths for their current branch and fires the callback if anything changed. */
async function pollCurrentBranches(): Promise<void> {
  let checkouts = getRepoCheckoutsMap();
  if (checkouts.size === 0) return;
  let branchSnapshot: Record<string, string> = {};
  for (let [checkoutKey, checkoutPath] of checkouts) {
    let branch = await m58(checkoutPath);
    if (branch !== void 0) branchSnapshot[checkoutKey] = branch;
  }
  if (LJ(branchSnapshot, prevBranchState)) return;
  prevBranchState = branchSnapshot, branchChangeCallback?.({
    current_branches: branchSnapshot
  });
}

// --- Module-level mutable state ---

var pathModule: typeof import("path"),
  /** Cached result of parsing CLAUDE_CODE_REPO_CHECKOUTS. Null until first call. */
  repoCheckoutsCache: Map<string, string> | null = null,
  /** Cached result of parsing CLAUDE_CODE_BASE_REFS. Null until first call. */
  baseRefsCache: Map<string, string> | null = null,
  /** Callback to notify when current-branch state changes. */
  branchChangeCallback: ((update: {
    current_branches: Record<string, string>;
  }) => void) | null = null,
  /** Last-known branch state; used to skip no-op notifications. */
  prevBranchState: Record<string, string>;

// Lazy module initialiser (esbuild bundle pattern).
var t$6 = L(() => {
  Hs();
  Fq();
  FH();
  L_();
  wN();
  H6();
  pathModule = require("path");
  prevBranchState = {};
});
export {parseEnvJsonMap as eCi,getRepoCheckoutsMap as v9r,getBaseRefsMap as tCi,findCheckoutKeyForDir as nCi,initRepoCheckoutWatcher as oCi,pollCurrentBranches as w9r,pathModule as ZEi,repoCheckoutsCache as Net,baseRefsCache as TEn,branchChangeCallback as rCi,prevBranchState as QEi,t$6 as SEn};
