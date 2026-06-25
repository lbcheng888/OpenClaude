// @ts-nocheck
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {waitForScrollIdle as cgt,lt as ct} from "../session/0132_sent.ts";
import {Hge as nhe,Y1t as JOt} from "../api/3029_expanded.ts";
import {Pae as bae,kHe as bxe,P9e as l$e} from "../../vendor/m3147.ts";
import {cn as ln,Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
import {isAxiosError as nT} from "../../vendor/m573.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function rg_(e, t) {
  let n = isTelemetryInitialized.resolve(t),
    r = isTelemetryInitialized.resolve(e);
  if (r !== n && !r.startsWith(n + isTelemetryInitialized.sep)) return v(`fetchOfficialMarketplaceFromGcs: refusing path outside cache dir: ${e}`, {
    level: "error"
  }), null;
  await cgt();
  let o = performance.now(),
    s = "failed",
    i,
    a,
    l;
  try {
    let c = await nhe.get(`${Tb4}/latest`, {
      responseType: "text",
      timeout: 1e4
    });
    if (i = String(c.data).trim(), !i) throw Error("latest pointer returned empty body");
    let u = isTelemetryInitialized.join(e, ".gcs-sha");
    if ((await KL.readFile(u, "utf8").then(y => y.trim(), () => null)) === i) return s = "noop", i;
    let p = await nhe.get(`${Tb4}/${i}.zip`, {
        responseType: "arraybuffer",
        timeout: 60000
      }),
      m = Buffer.from(p.data);
    a = m.length;
    let f = await bae(m),
      A = bxe(m),
      h = `${e}.staging`;
    await KL.rm(h, {
      recursive: true,
      force: true
    }), await KL.mkdir(h, {
      recursive: true
    });
    for (let [y, T] of Object.entries(f)) {
      if (!y.startsWith(HRq)) continue;
      let S = y.slice(HRq.length);
      if (!S || S.endsWith("/")) continue;
      let C = isTelemetryInitialized.join(h, S);
      await KL.mkdir(isTelemetryInitialized.dirname(C), {
        recursive: true
      }), await KL.writeFile(C, T);
      let R = A[y];
      if (R && R & 73) await KL.chmod(C, R & 511).catch(() => {});
    }
    await KL.writeFile(isTelemetryInitialized.join(h, ".gcs-sha"), i);
    let g = `${e}.backup`;
    await KL.rm(g, {
      recursive: true,
      force: true
    }).catch(() => {});
    let _ = false;
    try {
      await KL.rename(e, g), _ = true;
    } catch (y) {
      if (ln(y) !== "ENOENT") throw y;
    }
    try {
      await KL.rename(h, e);
    } catch (y) {
      if (_) await KL.rename(g, e).catch(() => {});
      throw y;
    }
    return await KL.rm(g, {
      recursive: true,
      force: true
    }).catch(() => {}), s = "updated", i;
  } catch (c) {
    return l = eGq(c), v(`Official marketplace GCS fetch failed: ${Se(c)}`, {
      level: "warn"
    }), null;
  } finally {
    j("tengu_plugin_remote_fetch", {
      source: Qe("marketplace_gcs"),
      host: Qe("downloads.claude.ai"),
      is_official: true,
      outcome: s,
      duration_ms: Math.round(performance.now() - o),
      ...(a !== undefined && {
        bytes: a
      }),
      ...(i && {
        sha: i
      }),
      ...(l && {
        error_kind: l
      })
    });
  }
}
function eGq(e) {
  if (nT(e)) {
    if (e.code === "ECONNABORTED") return "timeout";
    if (e.response) return `http_${e.response.status}`;
    return "network";
  }
  let t = ln(e);
  if (t && /^E[A-Z]+$/.test(t) && !t.startsWith("ERR_")) return F9p.has(t) ? `fs_${t}` : "fs_other";
  if (typeof e?.code === "number") return "zip_parse";
  let n = Se(e);
  if (/unzip|invalid zip|central directory/i.test(n)) return "zip_parse";
  if (/empty body/.test(n)) return "empty_latest";
  return "other";
}
var KL,
  isTelemetryInitialized,
  Tb4 = "https://downloads.claude.ai/claude-code-releases/plugins/claude-plugins-official",
  HRq = "marketplaces/claude-plugins-official/",
  F9p;
var Bho = b(() => {
  ct();
  Ct();
  JOt();
  je();
  l$e();
  St();
  KL = require("fs/promises"), isTelemetryInitialized = require("path");
  F9p = new Set(["ENOSPC", "EACCES", "EPERM", "EXDEV", "EBUSY", "ENOENT", "ENOTDIR", "EROFS", "EMFILE", "ENAMETOOLONG"]);
});
export {rg_ as U5t,eGq as nzp,KL as SL,isTelemetryInitialized as rne,Tb4 as jll,HRq as Yll,F9p as tzp,Bho as MEo};
