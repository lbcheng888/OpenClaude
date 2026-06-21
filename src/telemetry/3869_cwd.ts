// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {execFileNoThrowWithCwd as c8,oa as l7} from "../../vendor/m684.ts";
import {gitExe as Rq,findGitRoot as V5,Ba as gK} from "../../vendor/m693.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Oe as IH,isTmuxControlMode as n_,Ie as vH,ln as M6} from "./0594_feature_name.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_,fromEnum as tH} from "../../vendor/m5.ts";
import {zd as n5,dr as P8} from "../../vendor/m231.ts";
import {SQe as wtH,Mw as CW} from "../config/2221_recursive.ts";
import {iDa as EVK,nFn as SS6} from "../api/3868_level.ts";
import {b as L} from "../../runtime.ts";
/**
 * Git bundle creation and upload for CCR (Cloud Code Review) seed bundles.
 *
 * Implements the "bundle upload" path that packages the current git repo into a
 * compact `.bundle` file and uploads it to the Anthropic Files API so that a
 * remote CCR session can clone it.  Three bundle scopes are tried in order:
 *   1. `--all`       – every ref in the repo
 *   2. `HEAD`        – just the current branch tip
 *   3. squashed-root – a single synthetic commit containing only the working-tree
 *
 * The maximum bundle size is controlled by the `tengu_ccr_bundle_max_bytes`
 * feature flag (default 100 MiB).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GitObjectStats {
  /** Size of all pack files in bytes (size-pack * 1024), or null on error. */
  sizeBytes: number | null;
  /** Number of packed objects (in-pack), or null on error. */
  inPackCount: number | null;
}

type BundleScope = "all" | "head" | "squashed";
type BundleFailReason = "git_error" | "too_large" | "no_changes" | "empty_repo" | "stash_failed";

type BundleResult =
  | { ok: true; size: number; scope: BundleScope }
  | { ok: false; error: string; failReason: BundleFailReason };

interface BundleUploadOptions {
  /** Working directory to use; falls back to process cwd. */
  cwd?: string;
  /** AbortSignal forwarded to every spawned git subprocess. */
  signal?: AbortSignal;
  /** Base ref for squash-diff: if provided a `seed-base` parent commit is created. */
  baseRef?: string;
}

interface BundleUploadSuccess {
  success: true;
  fileId: string;
  bundleSizeBytes: number;
  scope: BundleScope;
  hasWip: boolean;
}

interface BundleUploadFailure {
  success: false;
  error: string;
  failReason?: BundleFailReason;
}

type BundleUploadResult = BundleUploadSuccess | BundleUploadFailure;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Returns the configured max bundle byte limit from the feature flag. */
function getBundleMaxBytes(): number {
  return Y_("tengu_ccr_bundle_max_bytes", null) ?? SAO;
}

/**
 * Runs `git count-objects -v` in `repoDir` and returns the size-pack (bytes)
 * and in-pack (object count) values parsed from stdout.
 */
async function getGitObjectStats(
  repoDir: string,
  abortSignal: AbortSignal | undefined
): Promise<GitObjectStats> {
  let result = await c8(Rq(), ["count-objects", "-v"], {
    cwd: repoDir,
    abortSignal: abortSignal
  });
  if (result.code !== 0) return {
    sizeBytes: null,
    inPackCount: null
  };
  let sizePackMatch = result.stdout.match(/^size-pack:\s*(\d+)/m),
    inPackMatch = result.stdout.match(/^in-pack:\s*(\d+)/m);
  return {
    sizeBytes: sizePackMatch ? Number(sizePackMatch[1]) * 1024 : null,
    inPackCount: inPackMatch ? Number(inPackMatch[1]) : null
  };
}

/**
 * Returns true when the current repo is so large that bundling should be
 * skipped entirely (> 3× cap AND either > 100× cap or > 5M packed objects).
 */
async function isRepoBundleTooLarge(opts: BundleUploadOptions | undefined): Promise<boolean> {
  let repoDir = V5(opts?.cwd ?? u_());
  if (!repoDir) return !1;
  let {
    sizeBytes: size,
    inPackCount: inPack
  } = await getGitObjectStats(repoDir, opts?.signal);
  if (size === null) return !1;
  let cap = getBundleMaxBytes();
  return size > 3 * cap && (size > 100 * cap || inPack !== null && inPack > 5000000);
}

/**
 * Creates a git bundle file at `outputPath` in `repoDir`, trying `--all`,
 * then `HEAD`, then a squashed-root commit — each time falling back if the
 * resulting file exceeds `maxBytes`.
 *
 * @param repoDir     - Absolute path to the git repository root.
 * @param outputPath  - Destination path for the `.bundle` file.
 * @param maxBytes    - Maximum allowed bundle size in bytes.
 * @param hasStash    - Whether uncommitted WIP was captured as refs/seed/stash.
 * @param abortSignal - Optional AbortSignal for subprocess cancellation.
 * @param baseRef     - Optional base ref for squash-diff parent.
 */
async function createGitBundle(
  repoDir: string,
  outputPath: string,
  maxBytes: number,
  hasStash: boolean,
  abortSignal: AbortSignal | undefined,
  baseRef: string | undefined
): Promise<BundleResult> {
  let extraRefs = hasStash ? ["refs/seed/stash"] : [],
    runBundle = (refSpec: string) => c8(Rq(), ["bundle", "create", outputPath, refSpec, ...extraRefs], {
      cwd: repoDir,
      abortSignal: abortSignal
    }),
    {
      sizeBytes: packSize,
      inPackCount: inPack
    } = await getGitObjectStats(repoDir, abortSignal),
    overCap = packSize !== null && packSize > maxBytes,
    overTripleCap = packSize !== null && packSize > 3 * maxBytes,
    tooLarge = overTripleCap && (packSize !== null && packSize > 100 * maxBytes || inPack !== null && inPack > 5000000);
  if (overCap) N(`[gitBundle] size-pack ${(packSize / 1024 / 1024).toFixed(0)}MB > ${(maxBytes / 1024 / 1024).toFixed(0)}MB cap; skipping --all${overTripleCap ? " and HEAD" : ""}${tooLarge ? " and squashed" : ""}`);
  if (!overCap) {
    let allResult = await runBundle("--all");
    if (allResult.code !== 0) return {
      ok: !1,
      error: `git bundle create --all failed (${allResult.code}): ${allResult.stderr.slice(0, 200)}`,
      failReason: "git_error"
    };
    let {
      size: allSize
    } = await _4_.stat(outputPath);
    if (allSize <= maxBytes) return {
      ok: !0,
      size: allSize,
      scope: "all"
    };
    N(`[gitBundle] --all bundle is ${(allSize / 1024 / 1024).toFixed(1)}MB (> ${(maxBytes / 1024 / 1024).toFixed(0)}MB), retrying HEAD-only`);
  }
  if (!overTripleCap) {
    let headResult = await runBundle("HEAD");
    if (headResult.code !== 0) return {
      ok: !1,
      error: `git bundle create HEAD failed (${headResult.code}): ${headResult.stderr.slice(0, 200)}`,
      failReason: "git_error"
    };
    let {
      size: headSize
    } = await _4_.stat(outputPath);
    if (headSize <= maxBytes) return {
      ok: !0,
      size: headSize,
      scope: "head"
    };
    N(`[gitBundle] HEAD bundle is ${(headSize / 1024 / 1024).toFixed(1)}MB, retrying squashed-root`);
  }
  if (tooLarge) return {
    ok: !1,
    error: "Repo is too large to bundle. Please setup GitHub on https://claude.ai/code",
    failReason: "too_large"
  };
  let treeRef = hasStash ? "refs/seed/stash^{tree}" : "HEAD^{tree}",
    parentArgs: string[] = [];
  if (baseRef) {
    let [treeRevResult, baseRevResult] = await Promise.all([treeRef, `${baseRef}^{tree}`].map(ref => c8(Rq(), ["rev-parse", ref], {
      cwd: repoDir,
      abortSignal: abortSignal
    })));
    if (treeRevResult?.code === 0 && treeRevResult.stdout.trim() === baseRevResult?.stdout.trim()) return {
      ok: !1,
      error: "It doesn't look like you have any new commits or changes to review. Stage or commit them first?",
      failReason: "no_changes"
    };
    let baseCommitResult = await c8(Rq(), ["commit-tree", `${baseRef}^{tree}`, "-m", "seed-base"], {
      cwd: repoDir,
      abortSignal: abortSignal
    });
    if (baseCommitResult.code === 0) parentArgs = ["-p", baseCommitResult.stdout.trim()];else N(`[gitBundle] baseRef commit-tree failed (${baseCommitResult.code}), squashing without parent: ${baseCommitResult.stderr.slice(0, 200)}`);
  }
  let squashCommitResult = await c8(Rq(), ["commit-tree", treeRef, ...parentArgs, "-m", "seed"], {
    cwd: repoDir,
    abortSignal: abortSignal
  });
  if (squashCommitResult.code !== 0) return {
    ok: !1,
    error: `git commit-tree failed (${squashCommitResult.code}): ${squashCommitResult.stderr.slice(0, 200)}`,
    failReason: "git_error"
  };
  let squashCommitHash = squashCommitResult.stdout.trim();
  await c8(Rq(), ["update-ref", "refs/seed/root", squashCommitHash], {
    cwd: repoDir
  });
  let squashBundleResult = await c8(Rq(), ["bundle", "create", outputPath, "refs/seed/root"], {
    cwd: repoDir,
    abortSignal: abortSignal
  });
  if (squashBundleResult.code !== 0) return {
    ok: !1,
    error: `git bundle create refs/seed/root failed (${squashBundleResult.code}): ${squashBundleResult.stderr.slice(0, 200)}`,
    failReason: "git_error"
  };
  let {
    size: squashSize
  } = await _4_.stat(outputPath);
  if (squashSize <= maxBytes) return {
    ok: !0,
    size: squashSize,
    scope: "squashed"
  };
  return {
    ok: !1,
    error: "Repo is too large to bundle. Please setup GitHub on https://claude.ai/code",
    failReason: "too_large"
  };
}

/**
 * Bundles the current git repository and uploads it to the Files API.
 *
 * Steps:
 *   1. Resolve the git repo root (fail if not in a repo).
 *   2. Clean up any leftover seed refs from a previous attempt.
 *   3. Capture uncommitted changes via `git stash create` → refs/seed/stash.
 *   4. Create the smallest possible bundle (all → HEAD → squashed).
 *   5. Upload the bundle to the Files API via EVK.
 *   6. Clean up the temp file and seed refs unconditionally (finally).
 *
 * @param uploadOpts   - Options passed to the Files API upload (baseUrl, oauthToken, …).
 * @param bundleOpts   - Optional cwd / signal / baseRef overrides.
 */
async function uploadGitBundleForCcr(
  uploadOpts: unknown,
  bundleOpts: BundleUploadOptions | undefined
): Promise<BundleUploadResult> {
  let cwd = bundleOpts?.cwd ?? u_(),
    repoDir = V5(cwd);
  if (!repoDir) return IH("teleport_git_bundle_upload", "empty_repo"), {
    success: !1,
    error: "Not in a git repository"
  };
  for (let ref of ["refs/seed/stash", "refs/seed/root"]) await c8(Rq(), ["update-ref", "-d", ref], {
    cwd: repoDir
  });
  let emptyCheckResult = await c8(Rq(), ["for-each-ref", "--count=1", "refs/"], {
    cwd: repoDir
  });
  if (emptyCheckResult.code === 0 && emptyCheckResult.stdout.trim() === "") return c("tengu_ccr_bundle_upload", {
    outcome: O_("empty_repo")
  }), IH("teleport_git_bundle_upload", "empty_repo"), {
    success: !1,
    error: "Repository has no commits yet",
    failReason: "empty_repo"
  };
  let stashCreateResult = await c8(Rq(), ["stash", "create"], {
      cwd: repoDir,
      abortSignal: bundleOpts?.signal
    }),
    stashHash = stashCreateResult.code === 0 ? stashCreateResult.stdout.trim() : "",
    hasWip = stashHash !== "";
  if (stashCreateResult.code !== 0 && stashCreateResult.stderr.trim() === "") N(`[gitBundle] git stash create exited ${stashCreateResult.code} with no output — treating as no uncommitted changes`);else if (stashCreateResult.code !== 0) {
    if (N(`[gitBundle] git stash create failed (${stashCreateResult.code}): ${stashCreateResult.stderr.slice(0, 200)}`), (await c8(Rq(), ["rev-parse", "--verify", "HEAD"], {
      cwd: repoDir
    })).code === 0) return c("tengu_ccr_bundle_upload", {
      outcome: O_("stash_failed")
    }), IH("teleport_git_bundle_upload", "stash_failed"), {
      success: !1,
      error: `Could not capture uncommitted changes (git stash create: ${n5(stashCreateResult.stderr.trim())}). Run \`git add .\` or commit, then retry.`,
      failReason: "stash_failed"
    };
  } else if (hasWip) N(`[gitBundle] Captured WIP as stash ${stashHash}`), await c8(Rq(), ["update-ref", "refs/seed/stash", stashHash], {
    cwd: repoDir
  });
  let tempBundlePath = wtH("ccr-seed", ".bundle");
  try {
    let maxBytes = getBundleMaxBytes(),
      bundleResult = await createGitBundle(repoDir, tempBundlePath, maxBytes, hasWip, bundleOpts?.signal, bundleOpts?.baseRef);
    if (!bundleResult.ok) return N(`[gitBundle] ${bundleResult.error}`), c("tengu_ccr_bundle_upload", {
      outcome: tH(bundleResult.failReason),
      max_bytes: maxBytes
    }), IH("teleport_git_bundle_upload", bundleResult.failReason), {
      success: !1,
      error: bundleResult.error,
      failReason: bundleResult.failReason
    };
    let uploadResult = await EVK(tempBundlePath, "_source_seed.bundle", uploadOpts, {
      signal: bundleOpts?.signal
    });
    if (!uploadResult.success) return c("tengu_ccr_bundle_upload", {
      outcome: O_("failed")
    }), IH("teleport_git_bundle_upload", "upload_failed"), {
      success: !1,
      error: uploadResult.error
    };
    if (N(`[gitBundle] Uploaded ${uploadResult.size} bytes as file_id ${uploadResult.fileId}`), c("tengu_ccr_bundle_upload", {
      outcome: O_("success"),
      size_bytes: uploadResult.size,
      scope: tH(bundleResult.scope),
      has_wip: hasWip
    }), bundleResult.scope === "head") n_("teleport_git_bundle_upload", "fallback_head");else if (bundleResult.scope === "squashed") n_("teleport_git_bundle_upload", "fallback_squashed");else vH("teleport_git_bundle_upload");
    return {
      success: !0,
      fileId: uploadResult.fileId,
      bundleSizeBytes: uploadResult.size,
      scope: bundleResult.scope,
      hasWip: hasWip
    };
  } finally {
    try {
      await _4_.unlink(tempBundlePath);
    } catch {
      N(`[gitBundle] Could not delete ${tempBundlePath} (non-fatal)`);
    }
    for (let ref of ["refs/seed/stash", "refs/seed/root"]) await c8(Rq(), ["update-ref", "-d", ref], {
      cwd: repoDir
    });
  }
}

// ---------------------------------------------------------------------------
// Module-level variables
// ---------------------------------------------------------------------------

var _4_: typeof import("fs/promises"),
  /** Default max bundle size: 100 MiB. */
  SAO = 104857600;

/** Lazy initializer — loads fs/promises and all peer modules. */
var Jqq = L(() => {
  y_();
  M6();
  o6();
  SS6();
  Fq();
  FH();
  l7();
  gK();
  P8();
  CW();
  _4_ = require("fs/promises");
});

export {getBundleMaxBytes as lDa,getGitObjectStats as cDa,isRepoBundleTooLarge as uDa,createGitBundle as hhp,uploadGitBundleForCcr as qoo,_4_ as dlt,SAO as Ahp,Jqq as joo};
