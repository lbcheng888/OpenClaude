// @ts-nocheck
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
import {normalizePatternsToPath as b8_,getFileReadIgnorePatterns as I8_,Xm as o$} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Qut as C8_,r3t as Ay_} from "../../vendor/m3934.ts";
import {Qie as e9H,tee as we} from "./2681_cause.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
// ---------------------------------------------------------------------------
// Glob-file-listing helpers: pattern base-dir splitting + ripgrep-backed
// paginated file listing.
//
// 1:1 restoration of obfuscated Claude Code 2.1.177 chunk `3325_baseDir.ts`.
// Only internal (file-private) symbols were renamed; behavior, control flow,
// operators (!0/!1), string literals, and every cross-module reference are
// preserved EXACTLY.
//
// Cross-module identifiers kept verbatim (defined in other chunks):
//   Rr       - Node.js `path` module (required inside `l8K`)
//   b8_      - build array of deny-glob patterns from permission map + cwd
//   I8_      - extract read-deny permission map from tool-use context
//   q_       - parse boolean from env-var string
//   C8_      - async per-directory extra ripgrep globs (from .gitignore etc.)
//   e9H      - ripgrep runner → Promise<string[]> of file paths
//   t_       - get current platform string ("windows" | "wsl" | "macos" | "linux")
//   A6       - lazy module initializer (dependency)
//   o$       - lazy module initializer (dependency)
//   y9       - lazy module initializer (dependency)
//   Ay_      - lazy module initializer (dependency)
//   we       - lazy module initializer (dependency)
//   L        - lazy/once module-init wrapper
// ---------------------------------------------------------------------------

/**
 * Result of splitting a potentially-glob-containing path into a static
 * base directory and the remaining relative glob pattern.
 */
interface GlobSplitResult {
  /** The deepest static directory prefix (no glob metacharacters). */
  baseDir: string;
  /** The pattern portion relative to `baseDir`. */
  relativePattern: string;
}

/**
 * Split a glob `pattern` string into its longest static `baseDir` prefix and
 * the remaining `relativePattern`.
 *
 * If there are no glob metacharacters (`*`, `?`, `[`, `{`) the whole path is
 * split with `path.dirname` / `path.basename`.  Otherwise the last path
 * separator before the first metacharacter marks the split point.
 *
 * On Windows, a bare drive root like `C:` is normalised to `C:\`.
 */
function splitGlobPattern(globPattern: string): GlobSplitResult {
  let globMetaRegex = /[*?[{]/,
    firstMetaMatch = globPattern.match(globMetaRegex);
  if (!firstMetaMatch || firstMetaMatch.index === void 0) {
    let dir = Rr.dirname(globPattern),
      base = Rr.basename(globPattern);
    return {
      baseDir: dir,
      relativePattern: base
    };
  }
  let staticPrefix = globPattern.slice(0, firstMetaMatch.index),
    lastSepIndex = Math.max(staticPrefix.lastIndexOf("/"), staticPrefix.lastIndexOf(Rr.sep));
  if (lastSepIndex === -1) return {
    baseDir: "",
    relativePattern: globPattern
  };
  let baseDir = staticPrefix.slice(0, lastSepIndex),
    relativePattern = globPattern.slice(lastSepIndex + 1);
  if (baseDir === "" && lastSepIndex === 0) baseDir = "/";
  if (t_() === "windows" && /^[A-Za-z]:$/.test(baseDir)) baseDir = baseDir + Rr.sep;
  return {
    baseDir: baseDir,
    relativePattern: relativePattern
  };
}

/**
 * List files matching a glob pattern using ripgrep, with optional pagination.
 *
 * When `pattern` is absolute the pattern is first split into a `baseDir` and
 * a relative glob so ripgrep is invoked from the correct directory.
 *
 * @param pattern     The glob pattern (may be relative or absolute).
 * @param cwd         The working directory passed to ripgrep.
 * @param pagination  `limit` and `offset` for result slicing.
 * @param abortSignal AbortSignal forwarded to the ripgrep process.
 * @param toolContext Tool-call context used to derive deny-glob exclusions.
 * @returns An object with the matching `files` array and a `truncated` flag.
 */
async function d8K(pattern: string, cwd: string, {
  limit: limit,
  offset: offset
}: {
  limit: number;
  offset: number;
}, abortSignal: AbortSignal, toolContext: unknown): Promise<{
  files: string[];
  truncated: boolean;
}> {
  let searchDir = cwd,
    effectivePattern = pattern;
  if (Rr.isAbsolute(pattern)) {
    let {
      baseDir: splitBase,
      relativePattern: splitPattern
    } = splitGlobPattern(pattern);
    if (splitBase) searchDir = splitBase, effectivePattern = splitPattern;
  }
  let denyGlobs = b8_(I8_(toolContext), searchDir),
    noIgnore = q_(process.env.CLAUDE_CODE_GLOB_NO_IGNORE || "true"),
    showHidden = q_(process.env.CLAUDE_CODE_GLOB_HIDDEN || "true"),
    rgArgs = ["--files", "--glob", effectivePattern, "--sort=modified", ...(noIgnore ? ["--no-ignore"] : []), ...(showHidden ? ["--hidden"] : [])];
  for (let excludeGlob of denyGlobs) rgArgs.push("--glob", `!${excludeGlob}`);
  for (let extraGlob of await C8_(searchDir)) rgArgs.push("--glob", extraGlob);
  let _unusedNull = null,
    rawResults: string[],
    didTruncate = !1;
  rawResults = await e9H(rgArgs, searchDir, abortSignal);
  let absoluteFiles = rawResults.map(filePath => Rr.isAbsolute(filePath) ? filePath : Rr.join(searchDir, filePath)),
    truncated = didTruncate || absoluteFiles.length > offset + limit;
  return {
    files: absoluteFiles.slice(offset, offset + limit),
    truncated: truncated
  };
}

/** Node.js `path` module — populated inside the lazy initializer `l8K`. */
var Rr: typeof import("path");

/** Lazy module initializer for this chunk. */
var l8K = L(() => {
  A6();
  o$();
  y9();
  Ay_();
  we();
  Rr = require("path");
});
export {splitGlobPattern as sHp,d8K as IUa,Rr as fY,l8K as xUa};
