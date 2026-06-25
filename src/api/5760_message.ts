// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Fb,Ct} from "../../vendor/m197.ts";
import {Ne} from "../../vendor/m583.ts";
import {wn,pf} from "../config/0693_timestamp.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
/**
 * Remote file staging and stream holdback helpers.
 *
 * Restored from the Claude Code 2.1.190 bundle (ported from the 2.1.185
 * readable body). Local comments and TypeScript-only helper aliases document
 * inferred intent; link-time symbols, literals, operators, property names,
 * and control flow are preserved.
 */
type RestoredUnknown = any;

/**
 * Emit a single stream message, respecting holdback state.
 * When holdback is active the message is buffered; otherwise any buffered
 * messages are flushed first, then the current message is emitted.
 */
function a9o({
  message: message,
  held: held,
  holdBackActive: holdBackActive,
  emit: emit
}: {
  message: RestoredUnknown;
  held: RestoredUnknown[];
  holdBackActive: boolean;
  emit: (value: RestoredUnknown) => void;
}): void {
  if (holdBackActive) {
    held.push(message);
    return;
  }
  l9o(held, emit), emit(message);
}

/** Flush every buffered message through the emitter and clear the buffer. */
function l9o(held: RestoredUnknown[], emit: (value: RestoredUnknown) => void): void {
  for (let item of held) emit(item);
  held.length = 0;
}

var d9o = {};
ft(d9o, {
  stageFile: () => stageFile,
  resolveStageFileRoot: () => resolveStageFileRoot,
  destFromMountPath: () => destFromMountPath,
  STAGE_FILE_ROOT: () => STAGE_FILE_ROOT,
  STAGE_FILE_MOUNT_PREFIX: () => STAGE_FILE_MOUNT_PREFIX,
  DEFAULT_STAGE_FILE_ROOT: () => DEFAULT_STAGE_FILE_ROOT
});

/** Resolve and validate the configured stage-file root (must be absolute). */
function resolveStageFileRoot(root: RestoredUnknown): RestoredUnknown {
  if (!root) return DEFAULT_STAGE_FILE_ROOT;
  if (!Lrr(root)) throw Error("CLAUDE_STAGE_FILE_ROOT must be an absolute path");
  return Byc(root);
}

/** Map an absolute mount path under the upload prefix to its on-disk dest. */
function destFromMountPath(mountPath: RestoredUnknown): RestoredUnknown {
  if (mountPath.includes("\x00")) throw Error("mount_path contains null bytes");
  if (!Lrr(mountPath)) throw Error("mount_path must be absolute");
  let normalized = Byc(mountPath),
    relativePath = Uyc(STAGE_FILE_MOUNT_PREFIX, normalized);
  if (relativePath === "" || relativePath === "." || relativePath.split($yc).includes("..") || Lrr(relativePath)) throw Error(`mount_path must be under ${STAGE_FILE_MOUNT_PREFIX}/`);
  return ZYm(STAGE_FILE_ROOT, relativePath);
}

/** Guard against the resolved dest escaping the stage root via `..`. */
function tJm(stageRoot: RestoredUnknown, destParent: RestoredUnknown): void {
  let relativePath = Uyc(stageRoot, destParent);
  if (relativePath === ".." || relativePath.startsWith(".." + $yc) || Lrr(relativePath)) {
    let escapeError = Error("dest parent escaped stage root");
    throw escapeError.code = "STAGE_PARENT_ESCAPE", escapeError;
  }
}

/** True when the error indicates a read-only filesystem (EROFS). */
function nJm(error: RestoredUnknown): boolean {
  return typeof error === "object" && error !== null && error.code === "EROFS";
}

/** Build a normalized failure descriptor from a thrown request error. */
function Nyc(operation: RestoredUnknown, error: RestoredUnknown): RestoredUnknown {
  let {
    kind: kind,
    status: status
  } = Fb(error);
  return {
    kind: kind,
    status: status,
    message: `${operation} failed: ${kind}${status ? ` ${status}` : ""}`
  };
}

/**
 * Fetch a remote file via the filestore worker API and atomically write it
 * into the local stage-file root. Returns an ok/error result and emits
 * telemetry for each outcome (already-present, gated, http, read-only mount).
 */
async function stageFile(request: RestoredUnknown): RestoredUnknown {
  if (!Ne.CLAUDE_CODE_REMOTE_SESSION_ID) return {
    ok: !1,
    error: "CLAUDE_CODE_REMOTE_SESSION_ID unset"
  };
  let dest;
  try {
    dest = destFromMountPath(request.mount_path);
  } catch (err) {
    return {
      ok: !1,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  if (!request.force) try {
    if ((await v9.stat(dest)).isFile()) return wn("debug", "stage_file_noop_already_present", {}), W("tengu_stage_file_completed", {
      ok: !0,
      noop_already_present: !0,
      duration_ms: 0
    }), {
      ok: !0,
      noop: "already_present"
    };
  } catch {}
  let startTime = performance.now(),
    elapsedMs = () => Math.round(performance.now() - startTime),
    filestoreJwt,
    filesystemId;
  try {
    let listResponse = await Vs.get("/worker/files", {
      auth: "session-jwt",
      host: "ccr-session",
      headers: {
        "anthropic-version": "2023-06-01"
      },
      timeout: Myc
    });
    if (!listResponse.ok) return W("tengu_stage_file_completed", {
      ok: !1,
      gated: !0,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_list_gated", {
      reason: listResponse.reason,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: `list gated: ${listResponse.reason}`
    };
    if (listResponse.status < 200 || listResponse.status >= 300) return W("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_list_failed", {
      kind: "http",
      status: listResponse.status,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: `list failed: http ${listResponse.status}`
    };
    if (filestoreJwt = listResponse.data.filestore_jwt, filesystemId = listResponse.data.filesystem_id, !filestoreJwt || !filesystemId) return {
      ok: !1,
      error: "list returned incomplete credential"
    };
  } catch (err) {
    let {
      kind: kind,
      status: status,
      message: message
    } = Nyc("list", err);
    return W("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_list_failed", {
      kind: kind,
      status: status,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: message
    };
  }
  let fileBuffer;
  try {
    let readResponse = await Vs.post("/v1/filestore/fs/readFile", {
      filesystem_id: filesystemId,
      path: request.mount_path
    }, {
      auth: "none",
      host: "api",
      headers: {
        Authorization: `Bearer ${filestoreJwt}`
      },
      responseType: "arraybuffer",
      timeout: Myc,
      maxContentLength: eJm
    });
    if (!readResponse.ok) return W("tengu_stage_file_completed", {
      ok: !1,
      gated: !0,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_read_gated", {
      reason: readResponse.reason,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: `read gated: ${readResponse.reason}`
    };
    if (readResponse.status < 200 || readResponse.status >= 300) return W("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_read_failed", {
      kind: "http",
      status: readResponse.status,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: `read failed: http ${readResponse.status}`
    };
    fileBuffer = Buffer.from(readResponse.data);
  } catch (err) {
    let {
      kind: kind,
      status: status,
      message: message
    } = Nyc("read", err);
    return W("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: elapsedMs()
    }), wn("warn", "stage_file_read_failed", {
      kind: kind,
      status: status,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: message
    };
  }
  let fetchMs = elapsedMs(),
    tmpPath = `${dest}.tmp.${Date.now()}.${Math.random().toString(36).slice(2)}`;
  try {
    await v9.mkdir(Lyc(dest), {
      recursive: !0
    });
    let realStageRoot = await v9.realpath(STAGE_FILE_ROOT),
      realDestParent = await v9.realpath(Lyc(dest));
    tJm(realStageRoot, realDestParent), await v9.writeFile(tmpPath, fileBuffer), await v9.chmod(tmpPath, 292), await v9.rename(tmpPath, dest);
  } catch (err) {
    if (await v9.unlink(tmpPath).catch(() => {}), nJm(err) && !Ne.CLAUDE_STAGE_FILE_ROOT) return W("tengu_stage_file_completed", {
      ok: !0,
      noop: !0,
      fetch_ms: fetchMs,
      duration_ms: elapsedMs(),
      bytes: 0
    }), wn("debug", "stage_file_noop_readonly_mount", {
      duration_ms: elapsedMs()
    }), {
      ok: !0,
      noop: "readonly_mount"
    };
    let errorCode = typeof err === "object" && err !== null && "code" in err ? String(err.code) : "unknown";
    return W("tengu_stage_file_completed", {
      ok: !1,
      fetch_ms: fetchMs,
      duration_ms: elapsedMs(),
      bytes: fileBuffer.length
    }), wn("warn", "stage_file_write_failed", {
      code: errorCode,
      duration_ms: elapsedMs()
    }), {
      ok: !1,
      error: `write failed: ${errorCode}`
    };
  }
  return W("tengu_stage_file_completed", {
    ok: !0,
    fetch_ms: fetchMs,
    duration_ms: elapsedMs(),
    bytes: fileBuffer.length
  }), wn("info", "stage_file_ok", {
    bytes: fileBuffer.length,
    fetch_ms: fetchMs,
    duration_ms: elapsedMs()
  }), {
    ok: !0
  };
}

var v9,
  Fyc,
  Lyc,
  Lrr,
  ZYm,
  Byc,
  Uyc,
  $yc,
  DEFAULT_STAGE_FILE_ROOT = "/mnt/user-data/uploads",
  STAGE_FILE_ROOT,
  STAGE_FILE_MOUNT_PREFIX = "/uploads",
  eJm = 67108864,
  Myc = 30000;
var p9o = b(() => {
  pf();
  Ir();
  Ct();
  kt();
  lT();
  v9 = require("fs/promises"), Fyc = require("path"), {
    dirname: Lyc,
    isAbsolute: Lrr,
    join: ZYm,
    normalize: Byc,
    relative: Uyc,
    sep: $yc
  } = Fyc.posix;
  STAGE_FILE_ROOT = resolveStageFileRoot(Ne.CLAUDE_STAGE_FILE_ROOT);
});

export {a9o,l9o,d9o,resolveStageFileRoot,destFromMountPath,tJm,nJm,Nyc,stageFile,v9 as isFullscreenEnabled,Fyc,Lyc,Lrr,ZYm,Byc,Uyc,$yc,DEFAULT_STAGE_FILE_ROOT,STAGE_FILE_ROOT,STAGE_FILE_MOUNT_PREFIX,eJm,Myc,p9o};
