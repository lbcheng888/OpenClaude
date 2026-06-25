// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Vs as ei,lT as dT} from "../../vendor/m2195.ts";
import {Vi as ta,$d as hp} from "../config/0620_$d.ts";
import {getStrictMcpConfig as MTe,lt as ct} from "../session/0132_sent.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
import {He,Pt as Bt,mn as cn} from "./0600_feature_name.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function KKu() {
  return {
    urls: undefined
  };
}
function Qpi(e) {
  try {
    let t = new URL(e);
    return t.search = "", t.username = "", t.password = "", t.hash = "", t.toString().replace(/\/$/, "");
  } catch {
    return;
  }
}
function zKu() {
  let e = ut("tengu_mcp_directory_visibility", Jpi);
  return Array.isArray(e) && e.every(t => typeof t === "string") ? e.filter(t => t.length > 0) : Jpi;
}
async function YKu(e) {
  let t = new Set(),
    n = e.join(","),
    r;
  for (let o = 0; o < Xpi; o++) {
    let s = new URLSearchParams({
      version: "latest",
      limit: "100",
      visibility: n
    });
    if (r) s.set("cursor", r);
    let i = await ei.get(`/mcp-registry/v0/servers?${s}`, {
      auth: "none",
      timeout: 5000
    });
    if (!i.ok) break;
    for (let a of i.data.servers ?? []) for (let l of a.server?.remotes ?? []) {
      let c = Qpi(l.url);
      if (c) t.add(c);
    }
    if (r = i.data.metadata?.nextCursor, !r) break;
  }
  return t;
}
async function createEmptyUrlCache(e) {
  let t = new Set(),
    n = e.join(","),
    r;
  for (let o = 0; o < Xpi; o++) {
    let s = new URLSearchParams({
      limit: "500",
      visibility: n
    });
    if (r) s.set("cursor", r);
    let i = await ei.get(`/api/directory/servers?${s}`, {
      auth: "none",
      timeout: 5000
    });
    if (!i.ok) break;
    for (let a of i.data.servers ?? []) {
      if (a.type !== "remote") continue;
      let l = a.remote?.url;
      if (!l) continue;
      let c = Qpi(l);
      if (c) t.add(c);
    }
    if (r = i.data.next_cursor ?? undefined, !r) break;
  }
  return t;
}
async function normaliseRegistryUrl() {
  if (ta()) return;
  if (MTe()) return;
  let e = ut("tengu_mcp_directory_bff", false),
    t = Qe(e ? "bff" : "legacy"),
    n = zKu();
  if (n.length === 0) {
    k1r.urls = new Set(), He("mcp_registry_fetch"), j("tengu_mcp_registry_fetch", {
      source: t,
      success: true,
      url_count: 0,
      duration_ms: 0,
      empty_visibility: true
    });
    return;
  }
  let r = Date.now();
  try {
    let o = e ? await createEmptyUrlCache(n) : await YKu(n);
    k1r.urls = o, v(`[mcp-registry] Loaded ${o.size} official MCP URLs (${e ? "bff" : "legacy"})`), He("mcp_registry_fetch"), j("tengu_mcp_registry_fetch", {
      source: t,
      success: true,
      url_count: o.size,
      duration_ms: Date.now() - r
    });
  } catch (o) {
    v(`Failed to fetch MCP registry: ${Se(o)}`, {
      level: "error"
    }), Bt("mcp_registry_fetch", "fetch_failed"), j("tengu_mcp_registry_fetch", {
      source: t,
      success: false,
      url_count: 0,
      duration_ms: Date.now() - r
    });
  }
}
function getVisibilityFilters(e) {
  return k1r.urls?.has(e) ?? false;
}
var Jpi,
  Xpi = 20,
  k1r;
var H1r = b(() => {
  ct();
  je();
  St();
  hp();
  cn();
  Yn();
  Ct();
  dT();
  Jpi = ["commercial", "gsuite", "enterprise", "health"];
  k1r = KKu();
});
export {KKu as qid,Qpi as rSi,zKu as Wid,YKu as Gid,createEmptyUrlCache as Vid,normaliseRegistryUrl as oSi,getVisibilityFilters as sSi,Jpi as tSi,Xpi as nSi,k1r as G2r,H1r as V2r};
