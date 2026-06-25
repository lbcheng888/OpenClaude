// @ts-nocheck
import {wn,pf} from "./0693_timestamp.ts";
import {b} from "../../runtime.ts";
/**
 * Secure per-user temp directory management.
 *
 * Resolves a `claude-<uid>` scratch directory under the system temp base,
 * validates its ownership/permissions to defend against attacker-planted
 * symlinks or pre-created directories, and provides helpers for generating
 * temp file paths.
 */

/** Base temp directory: honors CLAUDE_CODE_TMPDIR override, else `/tmp`. */
function xF(): string {
  if (process.env.CLAUDE_CODE_TMPDIR) return process.env.CLAUDE_CODE_TMPDIR;
  return "/tmp";
}

/**
 * Validate that `dirPath` is a real directory owned by the current uid and
 * locked to mode 0700. Throws on any mismatch (possible symlink/squatting
 * attack). On root-in-container ownership mismatch, warns and tolerates.
 */
function Mbi(dirPath: string): void {
  let currentUid = process.getuid?.();
  if (currentUid === void 0) return;
  let remediationHint =
      "Set CLAUDE_CODE_TMPDIR to a directory you control, or ask an administrator to remove it.",
    dirStat = ive.lstatSync(dirPath);
  if (!dirStat.isDirectory())
    throw Error(
      `Temp directory ${dirPath} is not a directory (may be an attacker-planted symlink). Refusing to use it. ${remediationHint}`,
    );
  if (dirStat.uid !== currentUid) {
    if (currentUid === 0 && process.env.CLAUDE_CODE_CONTAINER_ID) {
      wn("warn", "tempdir_owner_mismatch", {
        observed_uid: dirStat.uid,
      });
      return;
    }
    throw Error(
      `Temp directory ${dirPath} is owned by uid ${dirStat.uid}, expected ${currentUid}. Refusing to use it — another user may have pre-created it. ${remediationHint}`,
    );
  }
  // 511 == 0o777 mask, 448 == 0o700: enforce owner-only access.
  if ((dirStat.mode & 511) !== 448) ive.chmodSync(dirPath, 448);
}

/**
 * Ensure the per-user temp directory exists (mode 0700) and is validated,
 * caching the resolved path in `Obi` to avoid repeated mkdir/validation.
 */
function hE(): string {
  let dirName = `claude-${process.getuid?.() ?? 0}`,
    tempDir = $bn.join(xF(), dirName);
  if (tempDir !== Obi) {
    if (typeof process.getuid === "function")
      (ive.mkdirSync(tempDir, {
        recursive: !0,
        mode: 448,
      }),
      Mbi(tempDir));
    else
      try {
        ive.mkdirSync(tempDir, {
          recursive: !0,
          mode: 448,
        });
      } catch {}
    Obi = tempDir;
  }
  return tempDir;
}

/**
 * Like `hE`, but falls back to a `/tmp`-based directory when the resolved
 * path's byte length would exceed the platform socket-path limit (`pld`).
 * Result is memoized in `U$r` keyed by the original directory.
 */
function bet(): string {
  let primaryDir = hE();
  if (Buffer.byteLength(primaryDir) <= pld) return primaryDir;
  let fallbackBase = "/tmp";
  if (U$r?.forDir === primaryDir) return U$r.result;
  let fallbackDir = $bn.join(fallbackBase, `claude-${process.getuid?.() ?? 0}`),
    resolved = fallbackDir;
  try {
    (ive.mkdirSync(fallbackDir, {
      recursive: !0,
      mode: 448,
    }),
    Mbi(fallbackDir));
  } catch {
    resolved = primaryDir;
  }
  return (
    (U$r = {
      forDir: primaryDir,
      result: resolved,
    }),
    resolved
  );
}

/**
 * Build a temp file path inside the per-user temp directory. Uses a
 * sha256-derived stable suffix when a `contentHash` is supplied, else a
 * random UUID.
 */
function Eet(
  prefix = "claude-prompt",
  extension = ".md",
  options?: { contentHash?: string },
): string {
  let suffix = options?.contentHash
    ? Ubn.createHash("sha256").update(options.contentHash).digest("hex").slice(0, 16)
    : Ubn.randomUUID();
  return $bn.join(hE(), `${prefix}-${suffix}${extension}`);
}

var Ubn: typeof import("crypto"),
  ive: typeof import("fs"),
  Lbi: typeof import("os"),
  $bn: typeof import("path"),
  /** Max byte length before falling back to a shorter `/tmp` path. */
  pld = 44,
  /** Cached resolved per-user temp directory. */
  Obi: string | undefined,
  /** Memoized fallback result: { forDir, result }. */
  U$r: { forDir: string; result: string } | undefined;

var UR = b(() => {
  pf();
  (Ubn = require("crypto")),
    (ive = require("fs")),
    (Lbi = require("os")),
    ($bn = require("path"));
});

export {xF,Mbi,hE,bet,Eet,Ubn,ive,Lbi,$bn,pld,Obi,U$r,UR as resolveToolAlias};
