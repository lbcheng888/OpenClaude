// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {_o,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Text} from "../../vendor/m2423.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {Box} from "../../vendor/m2422.ts";
import {E} from "../../vendor/m319.ts";
import {qt,Xt} from "../config/0228_encoding.ts";
import {b,M} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {we} from "../../vendor/m455.ts";
function qxl(e: any): any {
  let t = xwo.c(36),
    {
      chromeClient: n,
      onDone: r
    } = e,
    [o, s] = pR.useState(null),
    [i, a] = pR.useState(null),
    [l, c] = pR.useState(!1),
    u = pR.useRef(!1),
    d: any;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) d = getGlobalConfig().chromeExtension?.pairedDeviceId, t[0] = d;else d = t[0];
  let p = d,
    m: any,
    f: any;
  if (t[1] !== n) m = () => (u.current = !1, Wlm(n).then((H: any) => {
    if (!u.current) s(H);
  }).catch((H: any) => {
    if (Oe("chrome_browser_picker", "list_failed"), !u.current) a(_o(H).message);
  }), () => {
    u.current = !0;
  }), f = [n], t[1] = n, t[2] = m, t[3] = f;else m = t[2], f = t[3];
  pR.useEffect(m, f);
  let A: any;
  if (t[4] !== r) A = function (I: any) {
    if (u.current) return;
    u.current = !0, r(I);
  }, t[4] = r, t[5] = A;else A = t[5];
  let h = A,
    g: any;
  if (t[6] !== o || t[7] !== n || t[8] !== h || t[9] !== l) g = function (I: any) {
    if (l) return;
    c(!0);
    let P = o?.find((L: any) => L.deviceId === I);
    jxl(n, "select_browser", {
      deviceId: I
    }).then(() => {
      Ie("chrome_browser_picker"), h(P ? `Now using browser "${P.name}" for Chrome actions.` : void 0);
    }).catch((L: any) => {
      Oe("chrome_browser_picker", "select_failed"), logForDebugging(`claude-in-chrome select_browser failed: ${_o(L).message}`, {
        level: "error"
      }), h(`Couldn't switch browser: ${_o(L).message}`);
    });
  }, t[6] = o, t[7] = n, t[8] = h, t[9] = l, t[10] = g;else g = t[10];
  let _ = g;
  if (i) {
    let H = `Couldn't list connected browsers: ${i}`,
      I: any;
    if (t[11] !== H) I = pR.default.createElement(Text, {
      color: "error"
    }, H), t[11] = H, t[12] = I;else I = t[12];
    let P: any;
    if (t[13] !== h || t[14] !== I) P = pR.default.createElement(Rwo, {
      onDone: h
    }, I), t[13] = h, t[14] = I, t[15] = P;else P = t[15];
    return P;
  }
  if (o === null) {
    let H: any;
    if (t[16] === Symbol.for("react.memo_cache_sentinel")) H = pR.default.createElement(Text, {
      dimColor: !0
    }, "Looking for connected browsers\u2026"), t[16] = H;else H = t[16];
    let I: any;
    if (t[17] !== h) I = pR.default.createElement(Rwo, {
      onDone: h
    }, H), t[17] = h, t[18] = I;else I = t[18];
    return I;
  }
  if (o.length === 0) {
    let H: any;
    if (t[19] === Symbol.for("react.memo_cache_sentinel")) H = pR.default.createElement(Text, null, "No browsers are connected. Open Chrome with the Claude extension and make sure you're signed in to the same claude.ai account."), t[19] = H;else H = t[19];
    let I: any;
    if (t[20] !== h) I = pR.default.createElement(Rwo, {
      onDone: h
    }, H), t[20] = h, t[21] = I;else I = t[21];
    return I;
  }
  let y: any;
  if (t[22] !== o) {
    let H: any;
    if (t[24] === Symbol.for("react.memo_cache_sentinel")) H = (I: any) => ({
      value: I.deviceId,
      label: pR.default.createElement(pR.default.Fragment, null, pR.default.createElement(Text, null, I.name), pR.default.createElement(Text, {
        dimColor: !0
      }, " ", "\xB7 ", I.osPlatform ?? "unknown OS", I.deviceId === p ? " \xB7 current" : ""))
    }), t[24] = H;else H = t[24];
    y = o.map(H), t[22] = o, t[23] = y;
  } else y = t[23];
  let T = y,
    S = o.length === 1 ? "One browser is connected:" : `Choose which browser to use (${o.length} connected):`,
    v: any;
  if (t[25] !== S) v = pR.default.createElement(Text, null, S), t[25] = S, t[26] = v;else v = t[26];
  let R: any;
  if (t[27] !== h) R = () => h(), t[27] = h, t[28] = R;else R = t[28];
  let k: any;
  if (t[29] !== _ || t[30] !== T || t[31] !== R) k = pR.default.createElement(pr, {
    options: T,
    onChange: _,
    onCancel: R,
    defaultFocusValue: p,
    hideIndexes: !0
  }), t[29] = _, t[30] = T, t[31] = R, t[32] = k;else k = t[32];
  let x: any;
  if (t[33] !== k || t[34] !== v) x = pR.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, v, k), t[33] = k, t[34] = v, t[35] = x;else x = t[35];
  return x;
}
function Rwo(e: any): any {
  let t = xwo.c(6),
    {
      onDone: n,
      children: r
    } = e,
    o: any;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) o = [{
    value: "back",
    label: "\u2039 Back"
  }], t[0] = o;else o = t[0];
  let s: any;
  if (t[1] !== n) s = pR.default.createElement(pr, {
    options: o,
    onChange: () => n(),
    onCancel: () => n(),
    hideIndexes: !0
  }), t[1] = n, t[2] = s;else s = t[2];
  let i: any;
  if (t[3] !== r || t[4] !== s) i = pR.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, r, s), t[3] = r, t[4] = s, t[5] = i;else i = t[5];
  return i;
}
async function Wlm(e: any): Promise<any> {
  let t = await jxl(e, "list_connected_browsers", {});
  if (!t) return [];
  let n = E.array(jlm()).safeParse(qt(t));
  return n.success ? n.data : [];
}
async function jxl(e: any, t: any, n: any): Promise<any> {
  let r = await e.client.callTool({
      name: t,
      arguments: n
    }),
    o = Array.isArray(r.content) ? r.content[0] : void 0;
  return o && typeof o === "object" && "text" in o && typeof o.text === "string" ? o.text : void 0;
}
var xwo: any, pR: any, jlm: any;
var Wxl = b(() => {
  Xr();
  Yl();
  ze();
  ln();
  Qn();
  qe();
  bt();
  Xt();
  xwo = M(rt(), 1), pR = M(Te(), 1), jlm = we(() => E.object({
    deviceId: E.string(),
    name: E.string().default("Browser"),
    osPlatform: E.string().optional()
  }));
});
export {qxl,Rwo,Wlm,jxl,xwo,pR,jlm,Wxl};
