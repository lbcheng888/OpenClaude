// @ts-nocheck
import {b as L} from "../../runtime.ts";
/** Returns the base tmp directory: CLAUDE_CODE_TMPDIR env override or "/tmp". */
function getBaseTmpDir(): string {
  if (process.env.CLAUDE_CODE_TMPDIR) return process.env.CLAUDE_CODE_TMPDIR;
  return "/tmp";
}

/**
 * Validates that a temp directory is safe to use: must exist as a real directory,
 * be owned by the current user, and have permissions 0700 (mode bits 448 = 0o700).
 * Throws if validation fails. Silently chmod-fixes if permissions are wrong.
 */
function validateTmpDirSecurity(dirPath: string): void {
  let uid = process.getuid?.();
  if (uid === void 0) return;
  let advice = "Set CLAUDE_CODE_TMPDIR to a directory you control, or ask an administrator to remove it.",
    stat = j2H.lstatSync(dirPath);
  if (!stat.isDirectory()) throw Error(`Temp directory ${dirPath} is not a directory (may be an attacker-planted symlink). Refusing to use it. ${advice}`);
  if (stat.uid !== uid) throw Error(`Temp directory ${dirPath} is owned by uid ${stat.uid}, expected ${uid}. Refusing to use it — another user may have pre-created it. ${advice}`);
  if ((stat.mode & 511) !== 448) j2H.chmodSync(dirPath, 448);
}

/** Returns (and lazily creates) the per-uid claude temp directory, e.g. /tmp/claude-1000. */
function getClaudeTmpDir(): string {
  let dirName = `claude-${process.getuid?.() ?? 0}`,
    dirPath = qf6.join(getBaseTmpDir(), dirName);
  if (dirPath !== cachedTmpDir) {
    if (typeof process.getuid === "function") j2H.mkdirSync(dirPath, {
      recursive: !0,
      mode: 448
    }), validateTmpDirSecurity(dirPath);else try {
      j2H.mkdirSync(dirPath, {
        recursive: !0,
        mode: 448
      });
    } catch {}
    cachedTmpDir = dirPath;
  }
  return dirPath;
}

/**
 * Returns a tmp dir path guaranteed to fit within AF_UNIX socket path limits.
 * If the per-uid dir exceeds MAX_UNIX_SOCKET_TMP_DIR_BYTES bytes, falls back to /tmp.
 * Result is memoized per base dir.
 */
function getSocketCompatibleTmpDir(): string {
  let baseDir = getClaudeTmpDir();
  if (Buffer.byteLength(baseDir) <= MAX_UNIX_SOCKET_TMP_DIR_BYTES) return baseDir;
  let fallbackBase = "/tmp";
  if (socketTmpDirCache?.forDir === baseDir) return socketTmpDirCache.result;
  let fallbackDir = qf6.join(fallbackBase, `claude-${process.getuid?.() ?? 0}`),
    result = fallbackDir;
  try {
    j2H.mkdirSync(fallbackDir, {
      recursive: !0,
      mode: 448
    }), validateTmpDirSecurity(fallbackDir);
  } catch {
    result = baseDir;
  }
  return socketTmpDirCache = {
    forDir: baseDir,
    result
  }, result;
}

/**
 * Generates a unique temp file path under the claude tmp dir.
 * @param prefix   Filename prefix (default: "claude-prompt")
 * @param ext      File extension (default: ".md")
 * @param options  Optional object with contentHash for deterministic naming
 */
function makeTempFilePath(prefix = "claude-prompt", ext = ".md", options?: { contentHash?: string }): string {
  let uniquePart = options?.contentHash ? _f6.createHash("sha256").update(options.contentHash).digest("hex").slice(0, 16) : _f6.randomUUID();
  return qf6.join(getClaudeTmpDir(), `${prefix}-${uniquePart}${ext}`);
}

var _f6: typeof import("crypto"),
  j2H: typeof import("fs"),
  jM7: typeof import("os"),
  qf6: typeof import("path"),
  /** Max byte length of a tmp dir path to remain compatible with AF_UNIX socket name limits. */
  MAX_UNIX_SOCKET_TMP_DIR_BYTES = 44,
  /** Cached path of the last created per-uid claude tmp dir. */
  cachedTmpDir: string | undefined,
  /** Memoized result of getSocketCompatibleTmpDir, keyed by forDir. */
  socketTmpDirCache: { forDir: string; result: string } | undefined;

var CW = L(() => {
  _f6 = require("crypto"), j2H = require("fs"), jM7 = require("os"), qf6 = require("path");
});

export {getBaseTmpDir as lF,validateTmpDirSecurity as MAi,getClaudeTmpDir as JS,getSocketCompatibleTmpDir as TQe,makeTempFilePath as SQe,_f6 as syn,j2H as Sve,jM7 as LAi,qf6 as iyn,MAX_UNIX_SOCKET_TMP_DIR_BYTES as jXu,cachedTmpDir as OAi,socketTmpDirCache as uBr,CW as Mw};
