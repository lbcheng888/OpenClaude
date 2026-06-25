// @ts-nocheck
import {$j as Xz,rUt as sNt,oUt as iNt} from "../config/3374_key.ts";
import {F_a as uca,B_a as dca,U_a as pca,Eno as $Jr} from "../telemetry/3373_rerender.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {z_ as V_,lt as ct} from "../session/0132_sent.ts";
import {getOauthConfig as Is,OAUTH_BETA_HEADER as SH,Sc as Hc} from "./0465_getOauthConfig.ts";
import {cCe as dbe,eNe as $Me} from "../config/0740_settings.ts";
import {Wpe as gpe,Don as ctn,qpe as hpe,jje as I7e,was as bes,PRt as Mbt} from "../../vendor/m717.ts";
import {i_a as Lla} from "../../vendor/m3354.ts";
import {getAnthropicApiKeyWithSource as $g,getClaudeAIOAuthTokens as di,checkAndRefreshOAuthTokenIfNeeded as wh,handleOAuth401Error as IB,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {qj as zae,Q3e as f9e} from "./5225_model.ts";
import {sleep as Fn} from "../telemetry/1488_withTimeout.ts";
import {$Ae as qEe,xXe as AYe} from "../../vendor/m1486.ts";
import {Fg as Yh} from "../../vendor/m5.ts";
import {ho} from "../../vendor/m572.ts";
import {$_a as mca,q_a as fca} from "../../vendor/m3374.ts";
import {Fb as Db,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {o_a as Pla,s_a as Ola} from "../../vendor/m3353.ts";
import {xe as Pe,He,mn as cn} from "../telemetry/0600_feature_name.ts";
import {xO as rL,Xie as jie} from "../../vendor/m2677.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {Hbn as a_n} from "../../vendor/m2214.ts";
import {Si as qi,ud as Jd} from "../../vendor/m134.ts";
import {b} from "../../runtime.ts";
import {ap as cm} from "../../vendor/m573.ts";
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
export {qJr as Cno,a5d as _tp,Aca as W_a,l5d as ytp,jJr as Ano,p9e as Y3e,WJr as Rno,gca as V_a,c5d as Ttp,Zr8 as Stp,xU3 as K_a,x7K as G_a,uU3 as z_a,Gr8 as vno,ny_ as bLn,GxH as j_a,mU3 as J3e,pU3 as SLn,m7K as wno,u7K as Etp,p7K as Y_a,Rr8 as J_a,lst as vat,r5d as mtp,o5d as ftp,s5d as htp,aNt as sUt,wke as IIe,dW as GW,i5d as gtp,p0H as btp,m9e as X3e};
