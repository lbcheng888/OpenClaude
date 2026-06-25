// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {or,dn} from "./0137_namespace.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {xF,resolveToolAlias as UR} from "./2229_observed_uid.ts";
import {igc,sgc,lgc} from "./5731_pluginId.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {xDe,DDe} from "./4456_path.ts";
import {resolvePluginRoot as eVn,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {setSyncedPluginDirs as wSt,lt} from "../session/0132_sent.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function xVt() {
  return nt(process.env.CLAUDE_CODE_SYNC_PLUGINS);
}
function kVt() {
  let e = parseInt(process.env.CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS || "", 10);
  return e > 0 ? e : 30000;
}
function kac() {
  let e = process.env.CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS;
  if (e !== undefined && e !== "") {
    let t = parseInt(e, 10);
    if (Number.isFinite(t) && t >= 0) return t;
  }
  return 1e4;
}
function Iac() {
  Rht ??= rNo();
}
function Dac() {
  return Rht ??= rNo(), Rht;
}
function Pac() {
  return Rht = (Rht ?? Promise.resolve()).catch(() => {}).then(() => rNo()), Rht;
}
function Oac() {
  return mZn;
}
function HVt() {
  return nB.join(or(), "plugins", "synced");
}
function Lac() {
  return nB.join(HVt(), xac);
}
async function Mac() {
  try {
    let e = await II.readFile(Lac(), "utf8");
    return qt(e);
  } catch {
    return null;
  }
}
async function w4m(e) {
  await II.mkdir(HVt(), {
    recursive: true
  }), await vf(Lac(), Pe(e, null, 2));
}
function pZn() {
  return nB.join(HVt(), ".staging");
}
function RVt(e) {
  let t = e.replace(/[<>:"|?*\\/]/g, "_"),
    n = t.toLowerCase();
  if (n === xac || n === ".staging") throw Error("plugin name resolves to reserved path");
  let r = HVt(),
    o = nB.join(r, t),
    s = nB.relative(r, o);
  if (!s || nB.isAbsolute(s) || s === ".." || s.startsWith(`..${nB.sep}`)) throw Error(`invalid plugin name: ${e}`);
  return o;
}
function R4m(e, t) {
  let n = new Map(t.map(l => [l.pluginId, l])),
    r = new Set(e.map(l => l.pluginId)),
    o = new Set(),
    s = [],
    i = [];
  for (let l of e) {
    let c = n.get(l.pluginId),
      u;
    try {
      u = RVt(l.name);
    } catch {
      if (wn("warn", "plugins_sync_invalid_name"), c) i.push(c);
      continue;
    }
    if (o.has(u)) {
      if (wn("warn", "plugins_sync_name_collision"), c) i.push(c);
      continue;
    }
    if (o.add(u), !c || c.updatedAt !== l.updatedAt || c.name !== l.name) s.push({
      plugin: l,
      prev: c
    });else i.push(c);
  }
  let a = t.filter(l => !r.has(l.pluginId));
  return {
    toDownload: s,
    toRemove: a,
    carryover: i,
    liveDirs: o
  };
}
async function Tac(e, t) {
  let n = RVt(e.name),
    r = nB.join(pZn(), nB.relative(HVt(), n)),
    o = nB.join(xF(), `claude-plugin-${process.pid}-${Math.random().toString(36).slice(2)}.zip`);
  try {
    let s = Date.now(),
      i = await igc(e.pluginId, o);
    if (t.downloadMs.push(Date.now() - s), !i.ok) return i;
    let a = Date.now();
    try {
      await II.rm(r, {
        recursive: true,
        force: true
      }), await II.mkdir(pZn(), {
        recursive: true
      });
      let l = await Fn("unzip", ["-q", "-o", o, "-d", r]),
        c = l.code === 0 ? await H4m(r).catch(() => "walk_failed") : "unzip_failed";
      if (c !== "ok") wn("info", "plugins_sync_unzip_fallback", {
        code: l.code,
        verdict: c
      }), await II.rm(r, {
        recursive: true,
        force: true
      }), await xDe(o, r);
      let u = await eVn(r),
        d = nB.join(pZn(), `.trash-${process.pid}-${Math.random().toString(36).slice(2)}`);
      try {
        await II.rename(n, d), Hac.push(II.rm(d, {
          recursive: true,
          force: true
        }).catch(() => {}));
      } catch {
        await II.rm(n, {
          recursive: true,
          force: true
        });
      }
      return await II.rename(u, n), {
        ok: true
      };
    } finally {
      t.extractMs.push(Date.now() - a);
    }
  } finally {
    await II.rm(o, {
      force: true
    }).catch(() => {}), await II.rm(r, {
      recursive: true,
      force: true
    }).catch(() => {});
  }
}
async function k4m(e, t) {
  try {
    return await Tac(e, t);
  } catch {
    return wn("warn", "plugins_sync_extract_retry"), await Kn(x4m), Tac(e, t);
  }
}
async function H4m(e, t = v4m) {
  let n = 0,
    r;
  async function o(a) {
    for (let l = 0; l < a.length && !r; l += Sac) {
      let c = a.slice(l, l + Sac);
      for (let u of await Promise.all(c.map(d => II.lstat(d)))) if (n += u.size, n > t) {
        r = "oversize";
        return;
      }
    }
  }
  async function s(a) {
    for (let l = 0; l < a.length && !r; l += bac) await Promise.all(a.slice(l, l + bac).map(i));
  }
  async function i(a) {
    if (r) return;
    let l = [],
      c = [];
    for (let u of await II.readdir(a, {
      withFileTypes: true
    })) {
      if (u.isSymbolicLink()) {
        r = "symlink";
        return;
      }
      if (u.isDirectory()) l.push(nB.join(a, u.name));else c.push(nB.join(a, u.name));
    }
    if (r) return;
    await Promise.all([o(c), s(l)]);
  }
  return await i(e), r ?? "ok";
}
async function Eac(e, t, n) {
  let r = 0,
    o = Array.from({
      length: Math.min(t, e.length)
    }, async () => {
      while (true) {
        let s = r++;
        if (s >= e.length) return;
        await n(e[s]);
      }
    });
  await Promise.all(o);
}
function Cac(e, t, n) {
  let r = `${e.name}@synced`;
  mZn.push(t === "network-error" ? {
    type: t,
    source: r,
    plugin: e.name,
    url: e.pluginId,
    details: n
  } : {
    type: t,
    source: r,
    plugin: e.name,
    error: n
  });
}
async function rNo() {
  let e = Date.now();
  mZn = [];
  let t;
  try {
    t = Rac.monitorEventLoopDelay({
      resolution: 20
    }), t.enable();
  } catch {}
  let n = () => {
      if (!t) return {};
      return t.disable(), {
        loop_lag_p95_ms: Math.round(t.percentile(95) / 1e6),
        loop_lag_max_ms: Math.round(t.max / 1e6)
      };
    },
    r,
    o = {
      downloadMs: [],
      extractMs: []
    };
  try {
    wn("info", "plugins_sync_starting");
    let s = Date.now(),
      i = await sgc();
    if (r = Date.now() - s, !i.success) {
      let S = n();
      wn("warn", "plugins_sync_list_failed", {
        duration_ms: Date.now() - e,
        list_ms: r,
        ...S
      }), W("tengu_plugins_sync_list_failed", {
        duration_ms: Date.now() - e,
        list_ms: r,
        ...S
      }), await wac();
      return;
    }
    let a = await Mac(),
      l = a !== null,
      {
        toDownload: c,
        toRemove: u,
        carryover: d,
        liveDirs: p
      } = R4m(i.plugins, a?.plugins ?? []),
      m = async S => {
        try {
          let v = RVt(S);
          if (p.has(v)) return;
          await II.rm(v, {
            recursive: true,
            force: true
          });
        } catch {}
      };
    if (await Promise.all(Hac.splice(0)), await II.rm(pZn(), {
      recursive: true,
      force: true
    }).catch(() => {}), c.length === 0 && u.length === 0) {
      wSt([...p]), wn("info", "plugins_sync_no_changes", {
        count: d.length,
        duration_ms: Date.now() - e,
        list_ms: r,
        had_manifest: l,
        ...n()
      });
      return;
    }
    let f = [],
      A = [],
      h_2 = Date.now();
    await Eac(c, yac, async ({
      plugin: S,
      prev: v
    }) => {
      let R_2;
      try {
        if (R_2 = await k4m(S, o), !R_2.ok) wn("warn", "plugins_sync_download_failed"), Cac(S, "network-error", R_2.reason);
      } catch (k) {
        R_2 = {
          ok: false,
          reason: Ce(k)
        }, wn("warn", "plugins_sync_extract_failed"), Cac(S, "generic-error", R_2.reason);
      }
      if (R_2.ok) {
        if (f.push(S), v && v.name !== S.name) await m(v.name);
      } else if (v) A.push(v);
    });
    let g_2 = Date.now() - h_2,
      __2 = vac(o);
    await Eac(u, yac, S => m(S.name));
    let y = [...d, ...f, ...A];
    wSt(y.map(S => RVt(S.name))), await w4m({
      lastUpdated: Date.now(),
      plugins: y
    });
    let T_2 = n();
    wn("info", "plugins_sync_complete", {
      downloaded: f.length,
      removed: u.length,
      failed: mZn.length,
      duration_ms: Date.now() - e,
      list_ms: r,
      download_extract_ms: g_2,
      had_manifest: l,
      ...__2,
      ...T_2
    }), W("tengu_plugins_sync_success", {
      downloaded: f.length,
      removed: u.length,
      total: i.plugins.length,
      duration_ms: Date.now() - e,
      list_ms: r,
      download_extract_ms: g_2,
      had_manifest: l,
      ...__2,
      ...T_2
    });
  } catch (s) {
    let i = n(),
      a = {
        ...(r !== undefined && {
          list_ms: r
        }),
        ...(o.downloadMs.length > 0 && vac(o))
      };
    wn("error", "plugins_sync_unexpected_error", {
      kind: s instanceof Error ? s.constructor.name : "unknown",
      duration_ms: Date.now() - e,
      ...a,
      ...i
    }), W("tengu_plugins_sync_error", {
      duration_ms: Date.now() - e,
      ...a,
      ...i
    }), await wac();
  }
}
function vac(e) {
  return {
    download_ms_sum: e.downloadMs.reduce((t, n) => t + n, 0),
    download_ms_max: Math.max(0, ...e.downloadMs),
    extract_ms_sum: e.extractMs.reduce((t, n) => t + n, 0),
    extract_ms_max: Math.max(0, ...e.extractMs)
  };
}
async function wac() {
  let e = await Mac();
  if (!e) return;
  let t = [];
  for (let n of e.plugins) try {
    t.push(RVt(n.name));
  } catch {}
  wSt(t);
}
var II,
  nB,
  Rac,
  yac = 6,
  xac = "manifest.json",
  v4m = 536870912,
  Rht = null,
  mZn,
  Hac,
  x4m = 500,
  Sac = 256,
  bac = 16;
var oNo = b(() => {
  lt();
  Pv();
  pf();
  dn();
  Ct();
  Ii();
  Eg();
  DDe();
  tn();
  UR();
  kt();
  lgc();
  II = require("fs/promises"), nB = require("path"), Rac = require("perf_hooks");
  mZn = [], Hac = [];
});

export {xVt as njt,kVt as rjt,kac as Tgc,Iac as bgc,Dac as Egc,Pac as Cgc,Oac as Agc,HVt as ojt,Lac as Rgc,Mac as vgc,w4m as Z7m,pZn as vrr,RVt as tjt,R4m as ezm,Tac as ugc,k4m as nzm,H4m as rzm,Eac as mgc,Cac as fgc,rNo as H$o,vac as hgc,wac as ggc,II as scalar,nB as AN,Rac as _gc,yac as cgc,xac as ygc,v4m as Q7m,Rht as Jyt,mZn as wrr,Hac as Sgc,x4m as tzm,Sac as dgc,bac as pgc,oNo as I$o};
