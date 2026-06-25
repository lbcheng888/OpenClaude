// @ts-nocheck
import {Ne as je,AR as tk} from "../../vendor/m583.ts";
import {getInitialSettings,br as yr} from "./0745_updateSettingsForSource.ts";
import {getClientType,isReplBridgeActive as yH,getInferenceProfileBackingModelCached,lt} from "../session/0132_sent.ts";
import {O1t as oLt,gT as bT,d9e as r$e} from "../core/2809_toInfraSessionId.ts";
import {yS as ES,WB as EU} from "../../vendor/m4274.ts";
import {getMainLoopModel,isFableFamilyOrPinnedModel as mv,getPublicModelName,getPublicModelDisplayName,getCanonicalName,normalizeModelStringForAPI,Ro as Mo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {TAe as MEe,Mdn as Qln,h2 as z2} from "../../vendor/m1285.ts";
import {GJe as Kze,gQ as yQ} from "../../vendor/m1287.ts";
import {Wns as VJo,Ud as initKp} from "../../vendor/m615.ts";
import {Yeo as mJr,gOn as v0n,mIe as wke,Nfa as Raa,UW as vW} from "./3317_fileStates.ts";
import {Ie as De,vn as Rn} from "../session/0621_length.ts";
import {isMemoryFileAccess,dSo as yAo} from "../tools/4377_registerSessionFileAccessHooks.ts";
import {Nm as qf,D_ as ry} from "../agent/2784_withFileTypes.ts";
import {Krn as dtn,VT as QT} from "../../vendor/m648.ts";
import {QEe as gbe,pd as Pd} from "../../vendor/m706.ts";
import {logForDebugging,qe} from "./0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {ry as ty,fa as Ua} from "../../vendor/m2253.ts";
import {dm as ef,vs as Ws} from "../../vendor/m2256.ts";
import {dw as ex,Ec as zc} from "../../vendor/m2593.ts";
import {gDe as P6e} from "../../vendor/m4377.ts";
function mXa() {
  if (je.CLAUDE_CODE_SUPPRESS_SESSION_ATTRIBUTION) return null;
  if (getInitialSettings().attribution?.sessionUrl === !1) return null;
  if (getClientType() === "remote") {
    let e = process.env.CLAUDE_CODE_REMOTE_SESSION_ID;
    if (!e) return null;
    let t = process.env.SESSION_INGRESS_URL;
    if (oLt(e, t)) return null;
    return bT(e, t);
  }
  if (yH()) {
    let e = ES();
    if (!e || e.outboundOnly) return null;
    if (oLt(e.bridgeSessionId, e.sessionIngressUrl)) return null;
    return bT(e.bridgeSessionId, e.sessionIngressUrl);
  }
  return null;
}
function IUp(e, t) {
  return {
    commit: e.commit ? `${e.commit}
Claude-Session: ${t}` : `Claude-Session: ${t}`,
    pr: e.pr ? `${e.pr}

${t}` : t
  };
}
function qdt() {
  let e = mXa(),
    t = DUp();
  return e ? IUp(t, e) : t;
}
function DUp() {
  let e = getMainLoopModel(),
    t = mv(e) ? getPublicModelName(MEe.firstParty) : fXa(e) ? getPublicModelName(e) : "Claude",
    n = `\uD83E\uDD16 Generated with [Claude Code](${r$e})`,
    r = `Co-Authored-By: ${t} <noreply@anthropic.com>`,
    o = getInitialSettings(),
    s = o.attribution;
  if (s && (s.commit !== void 0 || s.pr !== void 0)) return {
    commit: s.commit ?? r,
    pr: s.pr ?? n
  };
  if (o.includeCoAuthoredBy === !1) return {
    commit: "",
    pr: ""
  };
  return {
    commit: r,
    pr: n
  };
}
function fXa(e) {
  if (getPublicModelDisplayName(e) === null) return !1;
  let t = Kze(e);
  if (t !== e && Object.hasOwn(Qln, t)) return !0;
  let n = getCanonicalName(e),
    r = normalizeModelStringForAPI(e).toLowerCase(),
    o = r.indexOf(n),
    s = n.length;
  if (o === -1 && n.endsWith("-0")) {
    let u = n.slice(0, -2);
    o = r.indexOf(u), s = u.length;
  }
  if (o === -1) {
    if (!e.includes("application-inference-profile")) return !1;
    let u = getInferenceProfileBackingModelCached(normalizeModelStringForAPI(e));
    return !!u && fXa(u);
  }
  let i = r.slice(0, o),
    a = r.slice(o + s),
    l = i === "" || /[./]$/.test(i),
    c = /^(?:-fast|-latest)?(?:-v\d+@\d{8}|[-@]\d{8})?(?:-v\d+(?::\d+)?)?$/.test(a);
  return l && c;
}
function dXa(e) {
  for (let t of VJo) if (e.includes(`<${t}>`)) return !0;
  return !1;
}
function PUp(e) {
  let t = 0;
  for (let n of e) {
    if (n.type !== "user") continue;
    let r = n.message?.content;
    if (!r) continue;
    let o = !1;
    if (typeof r === "string") {
      if (dXa(r)) continue;
      o = r.trim().length > 0;
    } else if (Array.isArray(r)) o = r.some(s => {
      if (!s || typeof s !== "object" || !("type" in s)) return !1;
      return s.type === "text" && typeof s.text === "string" && !dXa(s.text) || s.type === "image" || s.type === "document";
    });
    if (o) t++;
  }
  return t;
}
function OUp(e) {
  let t = e.filter(n => n.type === "user" && !("isSidechain" in n && n.isSidechain) && !("isMeta" in n && n.isMeta) && !("isCompactSummary" in n && n.isCompactSummary));
  return PUp(t);
}
async function LUp(e) {
  let t = e.attribution;
  if (!t) return null;
  let n = t.fileStates,
    o = n instanceof Map ? Array.from(n.keys()) : Object.keys(n);
  if (o.length === 0) return null;
  try {
    return await mJr([t], o);
  } catch (s) {
    return De(s), null;
  }
}
function NUp(e) {
  let t = 0;
  for (let n of e) {
    if (n.type !== "assistant") continue;
    let r = n.message?.content;
    if (!Array.isArray(r)) continue;
    for (let o of r) {
      if (o.type !== "tool_use" || !MUp.has(o.name)) continue;
      if (isMemoryFileAccess(o.name, o.input)) t++;
    }
  }
  return t;
}
async function BUp() {
  try {
    let e = qf(),
      t = (await pXa.stat(e)).size,
      r = (await dtn(e, t)).postBoundaryBuf,
      o = gbe(r),
      s = o.findLastIndex(a => a.type === "system" && "subtype" in a && a.subtype === "compact_boundary"),
      i = s >= 0 ? o.slice(s + 1) : o;
    return {
      promptCount: OUp(i),
      memoryAccessCount: NUp(i)
    };
  } catch {
    return {
      promptCount: 0,
      memoryAccessCount: 0
    };
  }
}
async function AXa(e) {
  let t = mXa(),
    n = await FUp(e, t);
  if (!t || n.includes(t)) return n;
  return n ? `${n}

${t}` : t;
}
async function FUp(e, t) {
  let n = getInitialSettings();
  if (n.attribution?.pr) return n.attribution.pr;
  if (n.includeCoAuthoredBy === !1) return "";
  let r = `\uD83E\uDD16 Generated with [Claude Code](${r$e})`,
    o = e();
  if (logForDebugging(`PR Attribution: appState.attribution exists: ${!!o.attribution}`), o.attribution) {
    let f = o.attribution.fileStates,
      h = f instanceof Map ? f.size : Object.keys(f).length;
    logForDebugging(`PR Attribution: fileStates count: ${h}`);
  }
  let [s, {
      promptCount: i,
      memoryAccessCount: a
    }, l] = await Promise.all([LUp(o), BUp(), v0n(wke())]),
    c = s?.summary.claudePercent ?? 0;
  logForDebugging(`PR Attribution: claudePercent: ${c}, promptCount: ${i}, memoryAccessCount: ${a}`);
  let u = getCanonicalName(getMainLoopModel()),
    d = l ? u : Raa(u);
  if (c === 0 && i === 0 && a === 0) return logForDebugging("PR Attribution: returning default (no data)"), r;
  let p = a > 0 ? `, ${a} ${a === 1 ? "memory" : "memories"} recalled` : "",
    m = `\uD83E\uDD16 Generated with [Claude Code](${r$e}) (${c}% ${i}-shotted by ${d}${p})`;
  return logForDebugging(`PR Attribution: returning summary: ${m}`), m;
}
var pXa, MUp;
var gqn = b(() => {
  lt();
  EU();
  initKp();
  ty();
  ef();
  ex();
  vW();
  qe();
  tk();
  Pd();
  Rn();
  z2();
  Mo();
  yQ();
  yAo();
  ry();
  QT();
  yr();
  P6e();
  pXa = require("fs/promises");
  MUp = new Set([Ws, Ua, zc]);
});
export {mXa as jrl,IUp as m8p,qdt as i8e,DUp as f8p,fXa as Yrl,dXa as Krl,PUp as h8p,OUp as g8p,LUp as _8p,NUp as T8p,BUp as S8p,AXa as Jrl,FUp as b8p,pXa as zrl,MUp as y8p,gqn as L6t};
