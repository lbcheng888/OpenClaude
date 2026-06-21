// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {mt as ft,configProtoStore as fo} from "../../vendor/m2458.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Oc as Dc,b_ as T_} from "../../vendor/m2039.ts";
import {openInChrome as F0t,CLAUDE_IN_CHROME_MCP_SERVER_NAME as iP,oL as zO} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {isChromeExtensionInstalled as iue,rye as aue} from "../permissions/4648_shouldSuppressChromeOffer.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {qxl as TRl,Wxl as bRl} from "../tui/4996_chromeClient.tsx";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {aD as sD,bne as pne} from "../../vendor/m4590.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {isClaudeAISubscriber as Co,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var reactCompilerRuntime = {};
pt(reactCompilerRuntime, {
  call: () => Cim
});
function gim(e) {
  let t = PERMISSIONS_URL.c(47),
    {
      onDone: n,
      isExtensionInstalled: r,
      configEnabled: o,
      isClaudeAISubscriber: s,
      isWSL: i
    } = e,
    a = ft(Eim),
    [l, c] = RECONNECT_URL.useState(0),
    [u, d] = RECONNECT_URL.useState(o ?? false),
    [p, m] = RECONNECT_URL.useState(false),
    [f, A] = RECONNECT_URL.useState(r),
    [h, g] = RECONNECT_URL.useState("menu"),
    _;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) _ = false, t[0] = _;else _ = t[0];
  let y = _,
    T;
  if (t[1] !== a) T = a.find(selectMcpClients), t[1] = a, t[2] = T;else T = t[2];
  let S = T,
    C = S !== undefined,
    R;
  if (t[3] === Symbol.for("react.memo_cache_sentinel")) R = vt().chromeExtension?.pairedDeviceName, t[3] = R;else R = t[3];
  let k = R,
    x;
  if (t[4] === Symbol.for("react.memo_cache_sentinel")) x = function (Y) {
    if (y) Dc(Y);else F0t(Y).catch(Ie);
  }, t[4] = x;else x = t[4];
  let I = x,
    H;
  if (t[5] !== u) H = function (Y) {
    e: switch (Y) {
      case "install-extension":
        {
          c(isConnectedChromeClient), m(true), I(call);
          break e;
        }
      case "reconnect":
        {
          c(incrementKey), iue().then(J => {
            if (A(J), J) m(false);
          }).catch(Ie), I(him);
          break e;
        }
      case "manage-permissions":
        {
          c(ClaudeInChromeSettings), I(tD4);
          break e;
        }
      case "toggle-default":
        {
          let J = !u;
          un(ee => ({
            ...ee,
            claudeInChromeDefaultEnabled: J
          })), d(J);
          break e;
        }
      case "select-browser":
        g("select-browser");
    }
  }, t[5] = u, t[6] = H;else H = t[6];
  let P = H,
    O;
  if (t[7] !== u || t[8] !== C || t[9] !== f) {
    O = [];
    let V = f ? "" : " (requires extension)";
    if (!f && !y) {
      let oe;
      if (t[11] === Symbol.for("react.memo_cache_sentinel")) oe = {
        label: "Install Chrome extension",
        value: "install-extension"
      }, t[11] = oe;else oe = t[11];
      O.push(oe);
    }
    if (C) {
      let oe;
      if (t[12] === Symbol.for("react.memo_cache_sentinel")) oe = {
        label: "Select browser\u2026",
        value: "select-browser"
      }, t[12] = oe;else oe = t[12];
      O.push(oe);
    }
    let Y;
    if (t[13] === Symbol.for("react.memo_cache_sentinel")) Y = RECONNECT_URL.default.createElement(w, null, "Manage permissions"), t[13] = Y;else Y = t[13];
    let J;
    if (t[14] !== V) J = {
      label: RECONNECT_URL.default.createElement(RECONNECT_URL.default.Fragment, null, Y, RECONNECT_URL.default.createElement(w, {
        dimColor: true
      }, V)),
      value: "manage-permissions"
    }, t[14] = V, t[15] = J;else J = t[15];
    let ee;
    if (t[16] === Symbol.for("react.memo_cache_sentinel")) ee = RECONNECT_URL.default.createElement(w, null, "Reconnect extension"), t[16] = ee;else ee = t[16];
    let te;
    if (t[17] !== V) te = {
      label: RECONNECT_URL.default.createElement(RECONNECT_URL.default.Fragment, null, ee, RECONNECT_URL.default.createElement(w, {
        dimColor: true
      }, V)),
      value: "reconnect"
    }, t[17] = V, t[18] = te;else te = t[18];
    let ne = `Enabled by default: ${u ? "Yes" : "No"}`,
      re;
    if (t[19] !== ne) re = {
      label: ne,
      value: "toggle-default"
    }, t[19] = ne, t[20] = re;else re = t[20];
    O.push(J, te, re), t[7] = u, t[8] = C, t[9] = f, t[10] = O;
  } else O = t[10];
  let D = i || !s,
    M;
  if (t[21] !== n) M = () => n(), t[21] = n, t[22] = M;else M = t[22];
  let U;
  if (t[23] === Symbol.for("react.memo_cache_sentinel")) U = RECONNECT_URL.default.createElement(w, null, "Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code. Navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs and network requests."), t[23] = U;else U = t[23];
  let $;
  if (t[24] !== i) $ = i && RECONNECT_URL.default.createElement(w, {
    color: "error"
  }, "Claude in Chrome is not supported in WSL at this time."), t[24] = i, t[25] = $;else $ = t[25];
  let F;
  if (t[26] !== s) F = !s && RECONNECT_URL.default.createElement(w, {
    color: "error"
  }, "Claude in Chrome requires a claude.ai subscription."), t[26] = s, t[27] = F;else F = t[27];
  let W;
  if (t[28] !== S || t[29] !== P || t[30] !== C || t[31] !== D || t[32] !== f || t[33] !== n || t[34] !== O || t[35] !== l || t[36] !== p || t[37] !== h) W = !D && RECONNECT_URL.default.createElement(RECONNECT_URL.default.Fragment, null, !y && RECONNECT_URL.default.createElement(B, {
    flexDirection: "column"
  }, RECONNECT_URL.default.createElement(w, null, "Status:", " ", C ? RECONNECT_URL.default.createElement(w, {
    color: "success"
  }, "Enabled") : RECONNECT_URL.default.createElement(w, {
    color: "inactive"
  }, "Disabled")), RECONNECT_URL.default.createElement(w, null, "Extension:", " ", f ? RECONNECT_URL.default.createElement(w, {
    color: "success"
  }, "Installed") : RECONNECT_URL.default.createElement(w, {
    color: "warning"
  }, "Not detected")), C && k ? RECONNECT_URL.default.createElement(w, null, "Browser: ", RECONNECT_URL.default.createElement(w, {
    color: "success"
  }, k)) : null), h === "select-browser" && S ? RECONNECT_URL.default.createElement(TRl, {
    chromeClient: S,
    onDone: V => {
      if (g("menu"), c(_im), V) n(V);
    }
  }) : RECONNECT_URL.default.createElement(Ar, {
    key: l,
    options: O,
    onChange: P,
    hideIndexes: true
  }), p && RECONNECT_URL.default.createElement(w, {
    color: "warning"
  }, "Once installed, select ", '"Reconnect extension"', " to connect."), RECONNECT_URL.default.createElement(w, null, RECONNECT_URL.default.createElement(w, {
    dimColor: true
  }, "Usage: "), RECONNECT_URL.default.createElement(w, null, "claude --chrome"), RECONNECT_URL.default.createElement(w, {
    dimColor: true
  }, " or "), RECONNECT_URL.default.createElement(w, null, "claude --no-chrome")), RECONNECT_URL.default.createElement(w, {
    dimColor: true
  }, "Site-level permissions are inherited from the Chrome extension. Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on.")), t[28] = S, t[29] = P, t[30] = C, t[31] = D, t[32] = f, t[33] = n, t[34] = O, t[35] = l, t[36] = p, t[37] = h, t[38] = W;else W = t[38];
  let G;
  if (t[39] === Symbol.for("react.memo_cache_sentinel")) G = RECONNECT_URL.default.createElement(sD, {
    url: "https://code.claude.com/docs/en/chrome"
  }), t[39] = G;else G = t[39];
  let K;
  if (t[40] !== W || t[41] !== $ || t[42] !== F) K = RECONNECT_URL.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, U, $, F, W, G), t[40] = W, t[41] = $, t[42] = F, t[43] = K;else K = t[43];
  let Q;
  if (t[44] !== K || t[45] !== M) Q = RECONNECT_URL.default.createElement(Vn, {
    title: "Claude in Chrome (beta)",
    onCancel: M,
    color: "chromeYellow"
  }, K), t[44] = K, t[45] = M, t[46] = Q;else Q = t[46];
  return Q;
}
function _im(e) {
  return e + 1;
}
function ClaudeInChromeSettings(props) {
  return props + 1;
}
function incrementKey(value) {
  return value + 1;
}
function isConnectedChromeClient(client) {
  return client + 1;
}
function selectMcpClients(state) {
  return state.name === iP && state.type === "connected";
}
function Eim(e) {
  return e.mcp.clients;
}
var PERMISSIONS_URL,
  RECONNECT_URL,
  call = "https://claude.ai/chrome",
  tD4 = "https://clau.de/chrome/permissions",
  him = "https://clau.de/chrome/reconnect",
  Cim = async function (e) {
    let t = await iue().catch(s => (v(`[Claude in Chrome] Extension detection failed: ${s instanceof Error ? s.message : String(s)}`, {
        level: "error"
      }), false)),
      n = vt(),
      r = Co(),
      o = Ge.isWslEnvironment();
    return RECONNECT_URL.default.createElement(gim, {
      onDone: e,
      isExtensionInstalled: t,
      configEnabled: n.claudeInChromeDefaultEnabled,
      isClaudeAISubscriber: r,
      isWSL: o
    });
  };
var vRl = b(() => {
  zl();
  Di();
  pne();
  Je();
  fo();
  mo();
  T_();
  zO();
  aue();
  nr();
  je();
  Or();
  an();
  wn();
  bRl();
  PERMISSIONS_URL = L(nt(), 1), RECONNECT_URL = L(Te(), 1);
});

export {reactCompilerRuntime as Vxl,gim as zlm,_im as Ylm,ClaudeInChromeSettings as Jlm,incrementKey as Xlm,isConnectedChromeClient as Qlm,selectMcpClients as Zlm,Eim as ecm,PERMISSIONS_URL as Gxl,RECONNECT_URL as lf,call as Glm,tD4 as Vlm,him as Klm,Cim as tcm,vRl as Kxl};
