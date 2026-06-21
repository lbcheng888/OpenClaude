// @ts-nocheck
import {dY as Xz,RNt as sNt,xNt as iNt} from "../config/3358_key.ts";
import {Eua as uca,Cua as dca,vua as pca,UXr as $Jr} from "../tui/3357_rerender.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getGatewayAuth as V_,lt as ct} from "../session/0131_sent.ts";
import {getOauthConfig as Is,OAUTH_BETA_HEADER as SH,Dc as Hc} from "./0459_getOauthConfig.ts";
import {Rbe as dbe,a1e as $Me} from "../config/0735_settings.ts";
import {Mpe as gpe,Qtn as ctn,Lpe as hpe,J7e as I7e,Its as bes,iEt as Mbt} from "../../vendor/m712.ts";
import {zca as Lla} from "../../vendor/m3338.ts";
import {getAnthropicApiKeyWithSource as $g,getClaudeAIOAuthTokens as di,checkAndRefreshOAuthTokenIfNeeded as wh,handleOAuth401Error as IB,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {sle as zae,B9e as f9e} from "./5191_model.ts";
import {sleep as Fn} from "../telemetry/1483_withTimeout.ts";
import {oCe as qEe,PYe as AYe} from "../../vendor/m1481.ts";
import {tg as Yh} from "../config/0048_ISSUES_EXPLAINER.ts";
import {fo as ho} from "../../vendor/m566.ts";
import {wua as mca,Rua as fca} from "../../vendor/m3358.ts";
import {Lb as Db,bt as St} from "../../vendor/m195.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {Vca as Pla,Kca as Ola} from "../../vendor/m3337.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {buildDefaultSystemPromptSections as rL,eae as jie} from "../../vendor/m2666.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {K_n as a_n} from "../../vendor/m2206.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {b} from "../../runtime.ts";
import {Gp as cm} from "../../vendor/m567.ts";
// @ts-nocheck
function qJr() {
  if (gca(), wke) return;
  if (Xz()) wke = new Promise(e => {
    dW = e, setTimeout(t => {
      if (dW === t) {
        if (uca()) {
          v("Remote settings: Loading promise timeout deferred \u2014 consent dialog pending");
          return;
        }
        v("Remote settings: Loading promise timed out, resolving anyway"), dW(), dW = null;
      }
    }, i5d, e);
  });
}
function a5d() {
  let e = V_();
  if (e) return `${e.url}/managed/settings`;
  return `${Is().BASE_API_URL}/api/claude_code/settings`;
}
function Aca(e) {
  if (!e) return e;
  return dbe(e, "remote managed settings").settings ?? {};
}
async function l5d() {
  return null;
}
function jJr() {
  return Xz();
}
async function p9e() {
  if (wke) await wke;
}
function WJr() {
  return Xz() && !gpe();
}
function gca() {
  Lla(async () => {
    if (WJr()) await p9e();
  });
}
function c5d() {
  let e = V_();
  if (e) return {
    headers: {
      Authorization: `Bearer ${e.jwt}`
    }
  };
  try {
    let {
      key: n
    } = $g({
      skipRetrievingKeyFromApiKeyHelper: true
    });
    if (n) return {
      headers: {
        "x-api-key": n
      }
    };
  } catch {}
  let t = di();
  if (t?.accessToken) return {
    headers: {
      Authorization: `Bearer ${t.accessToken}`,
      "anthropic-beta": SH
    },
    accessToken: t.accessToken
  };
  return {
    headers: {},
    error: "No authentication available"
  };
}
async function Zr8(e, t = {}) {
  let n = await l5d();
  if (n) return n;
  let r = null,
    o = V_() && !t.background ? 0 : o5d;
  for (let s = 1; s <= o + 1; s++) {
    if (r = await xU3(e), r.success) return r;
    if (r.skipRetry) return r;
    if (s > o) return r;
    let i = zae(s);
    v(`Remote settings: Retry ${s}/${o} after ${i}ms`), await Fn(i);
  }
  return r;
}
async function xU3(e, t = false) {
  let n;
  try {
    await wh(), await qEe();
    let r = c5d();
    if (n = r.accessToken, r.error) return {
      success: false,
      error: "Authentication required for remote settings",
      skipRetry: true
    };
    let o = a5d(),
      s = {
        ...r.headers,
        "User-Agent": Yh()
      };
    if (e) s["If-None-Match"] = `"${e}"`;
    let i = await ho.get(o, {
      headers: s,
      timeout: r5d,
      validateStatus: c => c === 200 || c === 204 || c === 304 || c === 404
    });
    if (i.status === 304) return v("Remote settings: Using cached settings (304)"), {
      success: true,
      settings: null,
      checksum: e
    };
    if (i.status === 204 || i.status === 404) return v(`Remote settings: No settings found (${i.status})`), {
      success: true,
      settings: {},
      checksum: undefined
    };
    let a = mca().safeParse(i.data);
    if (!a.success) return v(`Remote settings: Invalid response format - ${a.error.message}`), {
      success: false,
      error: "Invalid remote settings format",
      skipRetry: true
    };
    let l = dbe(a.data.settings, "remote managed settings");
    if (!l.settings && Object.keys(a.data.settings).length > 0) return v("Remote settings: Settings validation failed - no fields could be salvaged"), {
      success: false,
      error: "Invalid settings structure",
      skipRetry: true
    };
    if (l.errors.length > 0) v(`Remote settings: Payload contains ${l.errors.length} invalid entries; applying the salvaged subset`);
    return v("Remote settings: Fetched successfully"), {
      success: true,
      settings: a.data.settings,
      salvagedSettings: l.errors.length > 0 ? l.settings ?? {} : undefined,
      checksum: a.data.checksum
    };
  } catch (r) {
    let {
      kind: o,
      status: s,
      message: i
    } = Db(r);
    if (s === 404) return {
      success: true,
      settings: {},
      checksum: ""
    };
    switch (o) {
      case "auth":
        if (s === 401 && n && !t) {
          await IB(n);
          let a = di()?.accessToken;
          if (a && a !== n) return j("tengu_remote_settings_401_force_refresh_retry", {}), xU3(e, true);
        }
        return {
          success: false,
          error: "Not authorized for remote settings",
          skipRetry: true
        };
      case "timeout":
        return {
          success: false,
          error: "Remote settings request timeout"
        };
      case "network":
        return {
          success: false,
          error: "Cannot connect to server"
        };
      default:
        return {
          success: false,
          error: i
        };
    }
  }
}
async function x7K(raw) {
  try {
    let t = ctn(),
      n = await lst.open(t, "w", 384);
    try {
      await n.writeFile(Oe(raw, null, 2), {
        encoding: "utf-8"
      }), await n.datasync();
    } finally {
      await n.close();
    }
    v(`Remote settings: Saved to ${t}`);
  } catch (t) {
    v(`Remote settings: Failed to save - ${t instanceof Error ? t.message : "unknown error"}`);
  }
}
async function uU3() {
  if (Rr8(), sNt(), wke = null, dW = null, hpe()) return;
  try {
    let e = ctn();
    await lst.unlink(e);
  } catch {}
}
async function Gr8(e = {}) {
  if (!Xz()) return {
    settings: null,
    fetchSucceeded: true
  };
  let t = hpe();
  if (t) return v(`Remote settings: Using override file ${t} (CLAUDE_CODE_REMOTE_SETTINGS_PATH), skipping API fetch`), {
    settings: gpe(),
    fetchSucceeded: true
  };
  let n = gpe(),
    r = n ? Pla(n) : undefined;
  try {
    let o = await Zr8(r, e);
    if (!o.success) {
      if (Pe("remote_managed_settings_pull", "remote_managed_settings_fetch_failed"), n) return v("Remote settings: Using stale cache after fetch failure"), I7e(n), {
        settings: n,
        fetchSucceeded: false
      };
      return {
        settings: null,
        fetchSucceeded: false
      };
    }
    if (o.settings === null && n) return v("Remote settings: Cache still valid (304 Not Modified)"), I7e(n), He("remote_managed_settings_pull"), {
      settings: n,
      fetchSucceeded: true
    };
    let s = o.settings || {};
    if (Object.keys(s).length > 0) {
      let a = Aca(n),
        l = Aca(s),
        c = await dca(a, l);
      if (!pca(c)) return v("Remote settings: User rejected new settings, using cached settings"), {
        settings: n,
        fetchSucceeded: true
      };
      return I7e(s), await x7K(o.salvagedSettings ?? s), v("Remote settings: Applied new settings successfully"), He("remote_managed_settings_pull"), {
        settings: s,
        fetchSucceeded: true
      };
    }
    return I7e(s), await x7K({}), v("Remote settings: Saved empty sentinel (404 response)"), He("remote_managed_settings_pull"), {
      settings: s,
      fetchSucceeded: true
    };
  } catch {
    if (Pe("remote_managed_settings_pull", "remote_managed_settings_unexpected"), n) return v("Remote settings: Using stale cache after error"), I7e(n), {
      settings: n,
      fetchSucceeded: false
    };
    return {
      settings: null,
      fetchSucceeded: false
    };
  }
}
async function ny_() {
  if (gca(), Xz() && !wke) wke = new Promise(e => {
    dW = e;
  });
  if (gpe() && dW) dW(), dW = null;
  try {
    let {
      settings: e,
      fetchSucceeded: t
    } = await Gr8();
    if (Xz() && !hpe()) p7K();
    if (e !== null) pU3();
    return t;
  } finally {
    GxH();
  }
}
function GxH() {
  if (dW) dW(), dW = null;
}
async function mU3() {
  if (Rr8(), sNt(), wke = null, dW = null, !Xz()) return pU3(), true;
  qJr();
  let e;
  try {
    ({
      fetchSucceeded: e
    } = await Gr8());
  } finally {
    GxH();
  }
  if (v("Remote settings: Refreshed after auth change"), !hpe()) p7K();
  return pU3(), e;
}
function pU3() {
  try {
    bes(), rL.notifyChange("policySettings");
  } catch (e) {
    Ie(e);
  }
}
async function m7K(checksum) {
  try {
    if (await checksum()) return {
      valid: true
    };
  } catch (t) {
    Ie(t);
  }
  return {
    valid: false,
    message: p0H
  };
}
async function u7K() {
  if (!Xz()) return;
  let e = gpe(),
    t = e ? Oe(e) : null;
  try {
    await Gr8({
      background: true
    });
    let n = gpe();
    if ((n ? Oe(n) : null) !== t) v("Remote settings: Changed during background poll"), pU3();
  } catch {}
}
function p7K() {
  if (aNt !== null) return;
  if (!Xz()) return;
  aNt = a_n(() => void u7K(), s5d, {
    unref: true
  }), qi(aNt);
}
function Rr8() {
  aNt?.[Symbol.dispose](), aNt = null;
}
var lst,
  r5d = 1e4,
  o5d = 5,
  s5d = 3600000,
  aNt = null,
  wke = null,
  dW = null,
  i5d = 30000,
  p0H = "Your organization requires remote managed settings to load, but they could not be loaded. Run `claude auth login` to re-authenticate, check your network connection, or contact your administrator.";
var m9e = b(() => {
  cm();
  ct();
  Hc();
  mo();
  Jd();
  je();
  St();
  AYe();
  wn();
  jie();
  $Me();
  Ola();
  Xt();
  cn();
  Ct();
  f9e();
  $Jr();
  iNt();
  Mbt();
  fca();
  lst = require("fs/promises");
});

export {qJr as $Xr,a5d as HGd,Aca as xua,l5d as IGd,jJr as qXr,p9e as M9e,WJr as jXr,gca as Hua,c5d as DGd,Zr8 as PGd,xU3 as Iua,x7K as kua,uU3 as Dua,Gr8 as WXr,ny_ as xDn,GxH as Pua,mU3 as kst,pU3 as RDn,m7K as GXr,u7K as LGd,p7K as Oua,Rr8 as Lua,lst as xst,r5d as wGd,o5d as RGd,s5d as xGd,aNt as kNt,wke as jke,dW as kW,i5d as kGd,p0H as OGd,m9e as N9e};
