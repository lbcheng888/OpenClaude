// @ts-nocheck
import {isKeybindingCustomizationEnabled as sZ,Le as tH} from "../../vendor/m5.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {b as L} from "../../runtime.ts";
/**
 * Telemetry helpers for file-operation events (`tengu_file_operation`).
 *
 * Emits a hashed representation of the file path (and optionally the file
 * content) so that analytics can track which files are being operated on
 * without logging raw paths or content.
 */

// ---------------------------------------------------------------------------
// Cross-module symbols — keep AS-IS to preserve linkage
// ---------------------------------------------------------------------------
// sZ   : tagString(s: string) => string  — identity type-tag helper
// tH   : tagString(s: string) => string  — identity type-tag helper
// c    : logEvent(name: string, props: object) => void  — analytics sink
// y_   : initTelemetry() — module-init dependency
// L    : lazyInit(fn) — lazy module initializer factory

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Compute a truncated (16-char) SHA-256 hex digest of `input`.
 * Used to hash file paths before emitting them in telemetry.
 */
function hashFilePathShort(input: string): string {
  return sZ(cryptoModule.createHash("sha256").update(input).digest("hex").slice(0, 16));
}

/**
 * Compute a full SHA-256 hex digest of `input`.
 * Used to hash file content before emitting it in telemetry.
 */
function hashContentFull(input: string): string {
  return sZ(cryptoModule.createHash("sha256").update(input).digest("hex"));
}

// ---------------------------------------------------------------------------
// Exported function
// ---------------------------------------------------------------------------

/**
 * Emit a `tengu_file_operation` telemetry event.
 *
 * The file path and (when present and within the size limit) the file content
 * are SHA-256 hashed so raw data is never sent to the analytics back-end.
 *
 * @param params - Describes the file operation being performed.
 * @param params.operation - The operation type (e.g. "read", "write").
 * @param params.tool      - The tool that triggered the operation.
 * @param params.filePath  - Absolute or relative path of the file.
 * @param params.content   - Optional file content; only hashed when its byte
 *   length does not exceed `MAX_CONTENT_HASH_BYTES` (100 KiB).
 * @param params.type      - Optional sub-type of the operation.
 */
function logFileOperation(params: {
  operation: string;
  tool: string;
  filePath: string;
  content?: string;
  type?: string;
}): void {
  let props: {
    operation: string;
    tool: string;
    filePathHash: string;
    contentHash?: string;
    type?: string;
  } = {
    operation: tH(params.operation),
    tool: tH(params.tool),
    filePathHash: hashFilePathShort(params.filePath)
  };
  if (params.content !== void 0 && params.content.length <= MAX_CONTENT_HASH_BYTES) props.contentHash = hashContentFull(params.content);
  if (params.type !== void 0) props.type = tH(params.type);
  c("tengu_file_operation", props);
}

// ---------------------------------------------------------------------------
// Module-level variables and lazy initializer
// ---------------------------------------------------------------------------

/** The Node.js `crypto` module, populated during lazy init. */
var cryptoModule: typeof import("crypto");

/** Maximum content size (in bytes) eligible for content hashing: 100 KiB. */
var MAX_CONTENT_HASH_BYTES: number = 102400;

/** Lazy module initializer — loads the `crypto` built-in. */
var kv6 = L(() => {
  y_();
  cryptoModule = require("crypto");
});
export {hashFilePathShort as Dkp,hashContentFull as Pkp,logFileOperation as Ste,cryptoModule as quo,MAX_CONTENT_HASH_BYTES as Okp,kv6 as V$n};
