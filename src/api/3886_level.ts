// @ts-nocheck
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {sleep} from "../telemetry/1488_withTimeout.ts";
import {ho as fo} from "../../vendor/m572.ts";
import {isTmuxControlMode as Pt,Po as Go} from "../../vendor/m638.ts";
import {Ce as Se,Ct as bt} from "../../vendor/m197.ts";
import {zn as Wn} from "./0465_getOauthConfig.ts";
import {He as Ie,Pt as isTmuxControlMode,xe as Oe,mn as ln} from "../telemetry/0600_feature_name.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
import {b,x as M} from "../../runtime.ts";
import {ap as Gp} from "../../vendor/m573.ts";
import {xM as g1,z0r as _Rr,HAe as VEe} from "../../vendor/m1450.ts";
function X0a(e, t) {
  let n = new Set();
  for (let r of e) if (!t.has(r)) n.add(r);
  return n;
}
function Q0a(e, t) {
  for (let n of e) if (!t.has(n)) return !1;
  return !0;
}
function Wc(e) {
  return e;
}
function rDa() {
  return process.env.ANTHROPIC_BASE_URL || process.env.CLAUDE_CODE_API_BASE_URL || "https://api.anthropic.com";
}
function $oo(e) {
  logForDebugging(`[files-api] ${e}`, {
    level: "error"
  });
}
function Fge(e) {
  logForDebugging(`[files-api] ${e}`);
}
async function oDa(e, t) {
  let n = "";
  for (let r = 1; r <= tFn; r++) {
    let o = await t(r);
    if (o.done) return o.value;
    if (n = o.error || `${e} failed`, Fge(`${e} attempt ${r}/${tFn} failed: ${n}`), r < tFn) {
      let s = chp * Math.pow(2, r - 1);
      Fge(`Retrying ${e} in ${s}ms...`), await sleep(s);
    }
  }
  throw Error(`${n} after ${tFn} attempts`);
}
async function uhp(e, t) {
  let r = `${t.baseUrl || rDa()}/v1/files/${e}/content`,
    o = {
      Authorization: `Bearer ${t.oauthToken}`,
      "anthropic-version": nDa,
      "anthropic-beta": tDa
    };
  return Fge(`Downloading file ${e} from ${r}`), oDa(`Download file ${e}`, async () => {
    try {
      let s = await fo.get(r, {
        headers: o,
        responseType: "arraybuffer",
        timeout: 60000,
        validateStatus: i => i < 500
      });
      if (s.status === 200) return Fge(`Downloaded file ${e} (${s.data.length} bytes)`), {
        done: !0,
        value: Buffer.from(s.data)
      };
      if (s.status === 404) throw Error(`File not found: ${e}`);
      if (s.status === 401) throw Error("Authentication failed: invalid or missing API key");
      if (s.status === 403) throw Error(`Access denied to file: ${e}`);
      return {
        done: !1,
        error: `status ${s.status}`
      };
    } catch (s) {
      if (!fo.isAxiosError(s)) throw s;
      return {
        done: !1,
        error: s.message
      };
    }
  });
}
function dhp(e, t, n) {
  let r = y6.normalize(n);
  if (r.startsWith("..")) return $oo(`Invalid file path: ${n}. Path must not traverse above workspace`), null;
  let o = y6.join(e, t, "uploads"),
    i = [y6.join(e, t, "uploads") + y6.sep, y6.sep + "uploads" + y6.sep].find(l => r.startsWith(l)),
    a = i ? r.slice(i.length) : r;
  return y6.join(o, a);
}
async function php(e, t) {
  let {
      fileId: n,
      relativePath: r
    } = e,
    o = dhp(Pt(), t.sessionId, r);
  if (!o) return {
    fileId: n,
    path: "",
    success: !1,
    error: `Invalid file path: ${r}`
  };
  try {
    let s = await uhp(n, t),
      i = y6.dirname(o);
    return await ult.mkdir(i, {
      recursive: !0
    }), await ult.writeFile(o, s), Fge(`Saved file ${n} to ${o} (${s.length} bytes)`), {
      fileId: n,
      path: o,
      success: !0,
      bytesWritten: s.length
    };
  } catch (s) {
    return $oo(`Failed to download file ${n}: ${Se(s)}`), {
      fileId: n,
      path: o,
      success: !1,
      error: Se(s)
    };
  }
}
async function fhp(e, t, n) {
  let r = Array(e.length),
    o = 0;
  async function s() {
    while (o < e.length) {
      let l = o++,
        c = e[l];
      if (c !== void 0) r[l] = await t(c, l);
    }
  }
  let i = [],
    a = Math.min(n, e.length);
  for (let l = 0; l < a; l++) i.push(s());
  return await Promise.all(i), r;
}
async function sDa(e, t, n = mhp) {
  if (e.length === 0) return [];
  Fge(`Downloading ${e.length} file(s) for session ${t.sessionId}`);
  let r = Date.now(),
    o = await fhp(e, a => php(a, t), n),
    s = Date.now() - r,
    i = Wn(o, a => a.success);
  if (Fge(`Downloaded ${i}/${e.length} file(s) in ${s}ms`), i === e.length) Ie("api_files_download");else if (i > 0) isTmuxControlMode("api_files_download", "partial_failed");else Oe("api_files_download", "all_failed");
  return o;
}
async function iDa(e, t, n, r) {
  let s = `${n.baseUrl || rDa()}/v1/files`,
    i = {
      Authorization: `Bearer ${n.oauthToken}`,
      "anthropic-version": nDa,
      "anthropic-beta": tDa
    };
  Fge(`Uploading file ${e} as ${t}`);
  let a;
  try {
    a = await ult.readFile(e);
  } catch (m) {
    return logEvent("tengu_file_upload_failed", {
      error_type: Qe("file_read")
    }), {
      path: t,
      error: Se(m),
      success: !1
    };
  }
  let l = a.length;
  if (l > Z0a) return logEvent("tengu_file_upload_failed", {
    error_type: Qe("file_too_large")
  }), {
    path: t,
    error: `File exceeds maximum size of ${Z0a} bytes (actual: ${l})`,
    success: !1
  };
  let c = `----FormBoundary${eDa.randomUUID()}`,
    u = y6.basename(t),
    d = [];
  d.push(Buffer.from(`--${c}\r
Content-Disposition: form-data; name="file"; filename="${u}"\r
Content-Type: application/octet-stream\r
\r
`)), d.push(a), d.push(Buffer.from(`\r
`)), d.push(Buffer.from(`--${c}\r
Content-Disposition: form-data; name="purpose"\r
\r
user_data\r
`)), d.push(Buffer.from(`--${c}--\r
`));
  let p = Buffer.concat(d);
  try {
    return await oDa(`Upload file ${t}`, async () => {
      try {
        let m = await fo.post(s, p, {
          headers: {
            ...i,
            "Content-Type": `multipart/form-data; boundary=${c}`,
            "Content-Length": p.length.toString()
          },
          timeout: 120000,
          signal: r?.signal,
          validateStatus: f => f < 500
        });
        if (m.status === 200 || m.status === 201) {
          let f = m.data?.id;
          if (!f) return {
            done: !1,
            error: "Upload succeeded but no file ID returned"
          };
          return Fge(`Uploaded file ${e} -> ${f} (${l} bytes)`), {
            done: !0,
            value: {
              path: t,
              fileId: f,
              size: l,
              success: !0
            }
          };
        }
        if (m.status === 401) throw logEvent("tengu_file_upload_failed", {
          error_type: Qe("auth")
        }), new g4e("Authentication failed: invalid or missing API key");
        if (m.status === 403) throw logEvent("tengu_file_upload_failed", {
          error_type: Qe("forbidden")
        }), new g4e("Access denied for upload");
        if (m.status === 413) throw logEvent("tengu_file_upload_failed", {
          error_type: Qe("size")
        }), new g4e("File too large for upload");
        return {
          done: !1,
          error: `status ${m.status}`
        };
      } catch (m) {
        if (m instanceof g4e) throw m;
        if (fo.isCancel(m)) throw new g4e("Upload canceled");
        if (fo.isAxiosError(m)) return {
          done: !1,
          error: m.message
        };
        throw m;
      }
    });
  } catch (m) {
    if (m instanceof g4e) return {
      path: t,
      error: m.message,
      success: !1
    };
    return logEvent("tengu_file_upload_failed", {
      error_type: Qe("network")
    }), {
      path: t,
      error: Se(m),
      success: !1
    };
  }
}
function aDa(e) {
  let t = [],
    n = e.flatMap(r => r.split(" ").filter(Boolean));
  for (let r of n) {
    let o = r.indexOf(":");
    if (o === -1) continue;
    let s = r.substring(0, o),
      i = r.substring(o + 1);
    if (!s || !i) {
      $oo(`Invalid file spec: ${r}. Both file_id and path are required`);
      continue;
    }
    t.push({
      fileId: s,
      relativePath: i
    });
  }
  return t;
}
var eDa,
  ult,
  y6,
  tDa,
  nDa = "2023-06-01",
  tFn = 3,
  chp = 500,
  Z0a = 524288000,
  mhp = 5,
  g4e;
var nFn = b(() => {
  Gp();
  g1();
  Go();
  qe();
  bt();
  ln();
  Ct();
  eDa = require("crypto"), ult = M(require("fs/promises")), y6 = M(require("path")), tDa = `${_Rr.header},${VEe.header}`;
  g4e = class g4e extends Error {
    constructor(e) {
      super(e);
      this.name = "UploadNonRetriableError";
    }
  };
});
export {X0a as EFa,Q0a as CFa,Wc as vc,rDa as kFa,$oo as Dco,Fge as tye,oDa as HFa,uhp as Zvp,dhp as ewp,php as twp,fhp as rwp,sDa as IFa,iDa as xFa,aDa as DFa,eDa as RFa,ult as cut,y6 as Oq,tDa as vFa,nDa as wFa,tFn as t$n,chp as Qvp,Z0a as AFa,mhp as nwp,g4e as Oqe,nFn as n$n};
