// @ts-nocheck
import {doe as D8H,kje as BdH,Xl as G1} from "./0651_maxBytes.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {hs as Z9,Tu as W5} from "../../vendor/m649.ts";
import {cn as L6,sp as TT,Ct as L_} from "../../vendor/m197.ts";
import {ARn as Of6,k2e as pSH} from "../../vendor/m2523.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {vja as CxK,Rja as SxK} from "../../vendor/m4243.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Attachment validation and upload utilities.
 *
 * Provides helpers to:
 *  - map file extensions to MIME types
 *  - validate that attachment paths are real local files
 *  - resolve file metadata and upload attachments to the filestore
 */

/**
 * Returns the MIME type string for a given file path based on its extension,
 * or `undefined` if the extension is not in the lookup map.
 */
function getMimeTypeByExtension(filePath: string): string | undefined {
  return MIME_TYPE_MAP[nodePath.extname(filePath).toLowerCase()];
}

/**
 * Returns `true` when the attachment entry is a pre-resolved object
 * (i.e. already has `file_uuid`, `file_name`, etc.) rather than a plain
 * string path that still needs to be stat-ed and uploaded.
 */
function isPreResolvedAttachment(attachment: unknown): attachment is object {
  return typeof attachment !== "string";
}

/**
 * Given that a file was not found at `resolvedPath`, attempts to infer
 * the most likely intended relative path and returns a suggestion string,
 * or `undefined` if no plausible correction can be found.
 *
 * @param originalInput - The original (possibly relative) attachment string the caller provided.
 * @param resolvedPath  - The absolute path that was derived from `originalInput`.
 * @param cwd           - The current working directory at the time of validation.
 */
async function suggestSimilarPath(originalInput: string, resolvedPath: string, cwd: string): Promise<string | undefined> {
  let existing = await D8H(resolvedPath);
  if (existing) return existing;
  if (!nodePath.isAbsolute(originalInput)) {
    let [firstSegment, ...rest] = originalInput.split(/[\\/]+/);
    if (firstSegment === nodePath.basename(cwd) && rest.length > 0) {
      let candidate = nodePath.join(cwd, ...rest);
      try {
        if ((await fsPromises.stat(candidate)).isFile()) return rest.join("/");
      } catch {}
    }
  }
  return BdH(resolvedPath);
}

/**
 * Validates a list of attachment entries (strings or pre-resolved objects).
 * Returns `{ result: true }` when all string entries are accessible local
 * files, or `{ result: false, message, errorCode }` on the first failure.
 */
async function HI6(attachments: Array<string | object>): Promise<{
  result: boolean;
  message?: string;
  errorCode?: number;
}> {
  let cwd = u_();
  for (let attachment of attachments) {
    if (isPreResolvedAttachment(attachment)) continue;
    if (/^[a-z][a-z0-9+.-]+:\/\//i.test(attachment)) return {
      result: !1,
      message: `Attachment "${attachment}" looks like a URL, not a local file path. This tool can only send files that exist on the local filesystem — download or write the content to a local file first, then pass that path.`,
      errorCode: 1
    };
    let resolvedPath = Z9(attachment);
    if (resolvedPath.startsWith("\\\\") || resolvedPath.startsWith("//")) return {
      result: !1,
      message: `Attachment "${attachment}" is a UNC network path, which is not supported.`,
      errorCode: 1
    };
    try {
      if (!(await fsPromises.stat(resolvedPath)).isFile()) return {
        result: !1,
        message: `Attachment "${attachment}" is not a regular file.`,
        errorCode: 1
      };
    } catch (err) {
      let errorCode = L6(err);
      if (errorCode === "ENOENT") {
        let suggestion = await suggestSimilarPath(attachment, resolvedPath, cwd);
        return {
          result: !1,
          message: `Attachment "${attachment}" does not exist. Current working directory: ${cwd}.` + (suggestion ? ` Did you mean "${suggestion}"?` : ""),
          errorCode: 1
        };
      }
      if (TT(err)) return {
        result: !1,
        message: `Attachment "${attachment}" is not accessible (${errorCode}).`,
        errorCode: 1
      };
      throw err;
    }
  }
  return {
    result: !0
  };
}

/** Resolved metadata for a single attachment after stat / upload. */
interface ResolvedAttachment {
  path: string;
  size: number;
  isImage: boolean;
  file_uuid?: string;
  media_type?: string;
}

/** Options passed to `_I6` (resolveAndUploadAttachments). */
interface UploadOptions {
  replBridgeEnabled?: boolean;
  signal?: AbortSignal;
}

/**
 * Resolves each attachment entry to `ResolvedAttachment` metadata.
 * Pre-resolved entries (objects with `file_uuid`) are passed through
 * directly; string paths are stat-ed locally and uploaded to the
 * filestore via `uploadBriefAttachment`.
 */
async function _I6(attachments: Array<string | {
  file_name: string;
  size: number;
  is_image: boolean;
  file_uuid: string;
  media_type?: string;
}>, options: UploadOptions): Promise<ResolvedAttachment[]> {
  let resolved: ResolvedAttachment[] = [],
    localIndices: number[] = [];
  for (let attachment of attachments) {
    if (isPreResolvedAttachment(attachment)) {
      resolved.push({
        path: attachment.file_name,
        size: attachment.size,
        isImage: attachment.is_image,
        file_uuid: attachment.file_uuid,
        media_type: attachment.media_type ?? getMimeTypeByExtension(attachment.file_name)
      });
      continue;
    }
    let resolvedPath = Z9(attachment);
    if (resolvedPath.startsWith("\\\\") || resolvedPath.startsWith("//")) throw Error(`Attachment "${attachment}" is a UNC network path, which is not supported.`);
    let stat = await fsPromises.stat(resolvedPath);
    localIndices.push(resolved.length), resolved.push({
      path: resolvedPath,
      size: stat.size,
      isImage: Of6.test(resolvedPath),
      media_type: getMimeTypeByExtension(resolvedPath)
    });
  }
  if (localIndices.length === 0) return resolved;
  let useBrief = options.replBridgeEnabled || q_(process.env.CLAUDE_CODE_BRIEF_UPLOAD) || !!process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE || q_(process.env.CLAUDE_CODE_REMOTE),
    {
      uploadBriefAttachment
    } = await Promise.resolve().then(() => (CxK(), SxK)),
    uploadResults = await Promise.all(localIndices.map(idx => uploadBriefAttachment(resolved[idx].path, resolved[idx].size, {
      replBridgeEnabled: useBrief,
      signal: options.signal
    })));
  return localIndices.forEach((idx, i) => {
    if (uploadResults[i] !== void 0) resolved[idx] = {
      ...resolved[idx],
      file_uuid: uploadResults[i]
    };
  }), resolved;
}
var fsPromises: typeof import("fs/promises"), nodePath: typeof import("path"), /** Map from lowercase file extension (including leading dot) to MIME type string. */
  MIME_TYPE_MAP: Record<string, string>;

/** Lazy initializer for the attachment utilities module. */
var DKq = L(() => {
  Fq();
  A6();
  L_();
  G1();
  pSH();
  W5();
  fsPromises = require("fs/promises"), nodePath = require("path"), MIME_TYPE_MAP = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",
    ".heic": "image/heic",
    ".heif": "image/heif",
    ".avif": "image/avif",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".mp4": "video/mp4",
    ".m4v": "video/x-m4v",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".avi": "video/x-msvideo",
    ".mkv": "video/x-matroska",
    ".mp3": "audio/mpeg",
    ".m4a": "audio/mp4",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".aac": "audio/aac",
    ".flac": "audio/flac",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".log": "text/plain",
    ".md": "text/markdown",
    ".json": "application/json",
    ".csv": "text/csv",
    ".html": "text/html",
    ".htm": "text/html",
    ".xml": "application/xml",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".zip": "application/zip"
  };
});
export {getMimeTypeByExtension as wja,isPreResolvedAttachment as kja,suggestSimilarPath as IUp,HI6 as B6n,_I6 as U6n,fsPromises as F6n,nodePath as Jxe,MIME_TYPE_MAP as HUp,DKq as i_o};
