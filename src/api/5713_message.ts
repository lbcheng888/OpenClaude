// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Lb as LM,bt as L_} from "../../vendor/m195.ts";
import {je as oH} from "../../vendor/m577.ts";
import {kn as I6,SA as L$} from "../config/0689_timestamp.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {si as _7,gT as rf} from "../../vendor/m2190.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Remote file staging and stream holdback helpers.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function eLq({
  message: H,
  held: _,
  holdBackActive: q,
  emit: K
}) {
  if (q) {
    _.push(H);
    return;
  }
  Hhq(_, K), K(H);
}
function Hhq(H: RestoredUnknown, _: RestoredUnknown): RestoredUnknown {
  for (let q of H) _(q);
  H.length = 0;
}
var Se4 = {};
j_(Se4, {
  stageFile: () => stageFile,
  resolveStageFileRoot: () => resolveStageFileRoot,
  destFromMountPath: () => destFromMountPath,
  STAGE_FILE_ROOT: () => STAGE_FILE_ROOT,
  STAGE_FILE_MOUNT_PREFIX: () => STAGE_FILE_MOUNT_PREFIX,
  DEFAULT_STAGE_FILE_ROOT: () => DEFAULT_STAGE_FILE_ROOT
});
function resolveStageFileRoot(H: RestoredUnknown): RestoredUnknown {
  if (!H) return DEFAULT_STAGE_FILE_ROOT;
  if (!zo6(H)) throw Error("CLAUDE_STAGE_FILE_ROOT must be an absolute path");
  return ke4(H);
}
function destFromMountPath(H: RestoredUnknown): RestoredUnknown {
  if (H.includes("\x00")) throw Error("mount_path contains null bytes");
  if (!zo6(H)) throw Error("mount_path must be absolute");
  let _ = ke4(H),
    q = Ne4(STAGE_FILE_MOUNT_PREFIX, _);
  if (q === "" || q === "." || q.split(Ve4).includes("..") || zo6(q)) throw Error(`mount_path must be under ${STAGE_FILE_MOUNT_PREFIX}/`);
  return mVT(STAGE_FILE_ROOT, q);
}
function BVT(H: RestoredUnknown, _: RestoredUnknown): RestoredUnknown {
  let q = Ne4(H, _);
  if (q === ".." || q.startsWith(".." + Ve4) || zo6(q)) {
    let K = Error("dest parent escaped stage root");
    throw K.code = "STAGE_PARENT_ESCAPE", K;
  }
}
function UVT(H: RestoredUnknown): RestoredUnknown {
  return typeof H === "object" && H !== null && H.code === "EROFS";
}
function Le4(H: RestoredUnknown, _: RestoredUnknown): RestoredUnknown {
  let {
    kind: q,
    status: K
  } = LM(_);
  return {
    kind: q,
    status: K,
    message: `${H} failed: ${q}${K ? ` ${K}` : ""}`
  };
}
async function stageFile(H: RestoredUnknown): RestoredUnknown {
  if (!oH.CLAUDE_CODE_REMOTE_SESSION_ID) return {
    ok: !1,
    error: "CLAUDE_CODE_REMOTE_SESSION_ID unset"
  };
  let q;
  try {
    q = destFromMountPath(H.mount_path);
  } catch (w) {
    return {
      ok: !1,
      error: w instanceof Error ? w.message : String(w)
    };
  }
  try {
    if ((await xu.stat(q)).isFile()) return I6("debug", "stage_file_noop_already_present", {}), c("tengu_stage_file_completed", {
      ok: !0,
      noop_already_present: !0,
      duration_ms: 0
    }), {
      ok: !0,
      noop: "already_present"
    };
  } catch {}
  let K = performance.now(),
    O = () => Math.round(performance.now() - K),
    T,
    z;
  try {
    let f = await _7.get("/worker/files", {
      auth: "session-jwt",
      host: "ccr-session",
      headers: {
        "anthropic-version": "2023-06-01"
      },
      timeout: Re4
    });
    if (!f.ok) return c("tengu_stage_file_completed", {
      ok: !1,
      gated: !0,
      duration_ms: O()
    }), I6("warn", "stage_file_list_gated", {
      reason: f.reason,
      duration_ms: O()
    }), {
      ok: !1,
      error: `list gated: ${f.reason}`
    };
    if (T = f.data.filestore_jwt, z = f.data.filesystem_id, !T || !z) return {
      ok: !1,
      error: "list returned incomplete credential"
    };
  } catch (w) {
    let {
      kind: f,
      status: j,
      message: J
    } = Le4("list", w);
    return c("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: O()
    }), I6("warn", "stage_file_list_failed", {
      kind: f,
      status: j,
      duration_ms: O()
    }), {
      ok: !1,
      error: J
    };
  }
  let $;
  try {
    let w = await _7.post("/v1/filestore/fs/readFile", {
      filesystem_id: z,
      path: H.mount_path
    }, {
      auth: "none",
      host: "api",
      headers: {
        Authorization: `Bearer ${T}`
      },
      responseType: "arraybuffer",
      timeout: Re4,
      maxContentLength: pVT
    });
    if (!w.ok) return c("tengu_stage_file_completed", {
      ok: !1,
      gated: !0,
      duration_ms: O()
    }), I6("warn", "stage_file_read_gated", {
      reason: w.reason,
      duration_ms: O()
    }), {
      ok: !1,
      error: `read gated: ${w.reason}`
    };
    $ = Buffer.from(w.data);
  } catch (w) {
    let {
      kind: f,
      status: j,
      message: J
    } = Le4("read", w);
    return c("tengu_stage_file_completed", {
      ok: !1,
      duration_ms: O()
    }), I6("warn", "stage_file_read_failed", {
      kind: f,
      status: j,
      duration_ms: O()
    }), {
      ok: !1,
      error: J
    };
  }
  let Y = O(),
    A = `${q}.tmp.${Date.now()}.${Math.random().toString(36).slice(2)}`;
  try {
    await xu.mkdir(Ge4(q), {
      recursive: !0
    });
    let w = await xu.realpath(STAGE_FILE_ROOT),
      f = await xu.realpath(Ge4(q));
    BVT(w, f), await xu.writeFile(A, $), await xu.chmod(A, 292), await xu.rename(A, q);
  } catch (w) {
    if (await xu.unlink(A).catch(() => {}), UVT(w) && !oH.CLAUDE_STAGE_FILE_ROOT) return c("tengu_stage_file_completed", {
      ok: !0,
      noop: !0,
      fetch_ms: Y,
      duration_ms: O(),
      bytes: 0
    }), I6("debug", "stage_file_noop_readonly_mount", {
      duration_ms: O()
    }), {
      ok: !0,
      noop: "readonly_mount"
    };
    let f = typeof w === "object" && w !== null && "code" in w ? String(w.code) : "unknown";
    return c("tengu_stage_file_completed", {
      ok: !1,
      fetch_ms: Y,
      duration_ms: O(),
      bytes: $.length
    }), I6("warn", "stage_file_write_failed", {
      code: f,
      duration_ms: O()
    }), {
      ok: !1,
      error: `write failed: ${f}`
    };
  }
  return c("tengu_stage_file_completed", {
    ok: !0,
    fetch_ms: Y,
    duration_ms: O(),
    bytes: $.length
  }), I6("info", "stage_file_ok", {
    bytes: $.length,
    fetch_ms: Y,
    duration_ms: O()
  }), {
    ok: !0
  };
}
var xu,
  he4,
  Ge4,
  zo6,
  mVT,
  ke4,
  Ne4,
  Ve4,
  DEFAULT_STAGE_FILE_ROOT = "/mnt/user-data/uploads",
  STAGE_FILE_ROOT,
  STAGE_FILE_MOUNT_PREFIX = "/uploads",
  pVT = 67108864,
  Re4 = 30000;
var Ce4 = L(() => {
  L$();
  _q();
  L_();
  y_();
  rf();
  xu = require("fs/promises"), he4 = require("path"), {
    dirname: Ge4,
    isAbsolute: zo6,
    join: mVT,
    normalize: ke4,
    relative: Ne4,
    sep: Ve4
  } = he4.posix;
  STAGE_FILE_ROOT = resolveStageFileRoot(oH.CLAUDE_STAGE_FILE_ROOT);
});
export {eLq as gNo,Hhq as _No,Se4 as Mlc,resolveStageFileRoot,destFromMountPath,BVT as z4m,UVT as Y4m,Le4 as xlc,stageFile,xu as r3,he4 as klc,Ge4 as wlc,zo6 as hZn,mVT as V4m,ke4 as Hlc,Ne4 as Ilc,Ve4 as Dlc,DEFAULT_STAGE_FILE_ROOT,STAGE_FILE_ROOT,STAGE_FILE_MOUNT_PREFIX,pVT as K4m,Re4 as Rlc,Ce4 as Nlc};
