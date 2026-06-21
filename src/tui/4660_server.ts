// @ts-nocheck
import {mt as ft,configProtoStore as fo} from "../../vendor/m2458.ts";
import {Mae as Cae,CL as fL} from "../mcp/3149_scope.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {Tnn as Dtn,Snn as Ptn,scalar as ZI} from "../mcp/0728_serverName.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {ic as oc,Ny as Ly} from "../../vendor/m2574.ts";
import {pr as Ar} from "../../vendor/m2562.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {b,M as L} from "../../runtime.ts";
import {yb as hb} from "../../vendor/m4521.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function v6t(e) {
  let t = stripMcpServerPrefix.c(24),
    {
      server: n,
      onSelectTool: r,
      onBack: o
    } = e,
    s = ft(d7p),
    i;
  e: {
    if (n.client.type !== "connected") {
      let y;
      if (t[0] === Symbol.for("react.memo_cache_sentinel")) y = [], t[0] = y;else y = t[0];
      i = y;
      break e;
    }
    let _;
    if (t[1] !== s || t[2] !== n.name) _ = Cae(s, n.name).sort(u7p), t[1] = s, t[2] = n.name, t[3] = _;else _ = t[3];
    i = _;
  }
  let a = i,
    l = Gn(a, c7p),
    c;
  if (t[4] !== n.name || t[5] !== a) {
    let _;
    if (t[7] !== n.name) _ = (y, T) => {
      let S = Dtn(y.name, n.name),
        C = y.userFacingName ? y.userFacingName({}) : S,
        R = Ptn(C),
        k = y.isReadOnly?.({}) ?? false,
        x = y.isDestructive?.({}) ?? false,
        I = y.isOpenWorld?.({}) ?? false,
        H = y.mcpInfo?.effectiveMaxPermission;
      if (H === "blocked") return {
        label: R,
        value: T.toString(),
        disabled: true,
        description: "disabled by your organization",
        descriptionColor: "warning"
      };
      let P = [];
      if (k) P.push("read-only");
      if (x) P.push("destructive");
      if (I) P.push("open-world");
      if (H === "ask") P.push("ask-only");
      return {
        label: R,
        value: T.toString(),
        description: P.length > 0 ? P.join(", ") : undefined
      };
    }, t[7] = n.name, t[8] = _;else _ = t[8];
    c = a.map(_), t[4] = n.name, t[5] = a, t[6] = c;
  } else c = t[6];
  let u = c,
    d = a.length - l,
    p;
  if (t[9] !== l || t[10] !== d || t[11] !== a.length) p = l > 0 ? `${d} ${En(d, "tool")} \xB7 ${l} disabled by your organization` : `${a.length} ${En(a.length, "tool")}`, t[9] = l, t[10] = d, t[11] = a.length, t[12] = p;else p = t[12];
  let m = p,
    f = `Tools for ${n.name}`,
    A;
  if (t[13] === Symbol.for("react.memo_cache_sentinel")) A = cleanToolDisplayName.default.createElement(hn, null, cleanToolDisplayName.default.createElement(lt, {
    chord: ["up", "down"],
    action: "navigate"
  }), cleanToolDisplayName.default.createElement(lt, {
    chord: "enter",
    action: "select"
  }), cleanToolDisplayName.default.createElement(ur, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "back"
  })), t[13] = A;else A = t[13];
  let h;
  if (t[14] !== o || t[15] !== r || t[16] !== a || t[17] !== u) h = a.length === 0 ? cleanToolDisplayName.default.createElement(oc, null, "No tools available") : cleanToolDisplayName.default.createElement(Ar, {
    options: u,
    onChange: _ => {
      let y = a[parseInt(_)];
      if (y) r(y);
    },
    onCancel: o
  }), t[14] = o, t[15] = r, t[16] = a, t[17] = u, t[18] = h;else h = t[18];
  let g;
  if (t[19] !== o || t[20] !== m || t[21] !== f || t[22] !== h) g = cleanToolDisplayName.default.createElement(Vn, {
    title: f,
    subtitle: m,
    onCancel: o,
    inputGuide: A
  }, h), t[19] = o, t[20] = m, t[21] = f, t[22] = h, t[23] = g;else g = t[23];
  return g;
}
function c7p(e) {
  return e.mcpInfo?.effectiveMaxPermission === "blocked";
}
function u7p(e, t) {
  let n = e.mcpInfo?.effectiveMaxPermission === "blocked" ? 1 : 0,
    r = t.mcpInfo?.effectiveMaxPermission === "blocked" ? 1 : 0;
  return n - r;
}
function d7p(e) {
  return e.mcp.tools;
}
var stripMcpServerPrefix, cleanToolDisplayName;
var countWhere = b(() => {
  ZI();
  fL();
  fo();
  fr();
  Ec();
  hb();
  qs();
  Di();
  Ly();
  ts();
  stripMcpServerPrefix = L(nt(), 1), cleanToolDisplayName = L(Te(), 1);
});

export {v6t as Z6t,c7p as Kzp,u7p as zzp,d7p as Yzp,stripMcpServerPrefix as tml,cleanToolDisplayName as EDe,countWhere as q5n};
