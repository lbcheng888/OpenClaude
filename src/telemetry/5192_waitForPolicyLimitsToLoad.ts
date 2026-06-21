// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getCachePath as tve,setSessionCache as Afe,isPolicyLimitsEligible as t$,loadCachedResponse as cHt,getSessionCache as lHt,wK as dK,rd as sd} from "../../vendor/m2205.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getOauthConfig as Is,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {getAnthropicApiKeyWithSource as $g,shouldUseWIFAuth as oE,isClaudeAISubscriber as Co,getClaudeAIOAuthTokens as di,checkAndRefreshOAuthTokenIfNeededWithOutcome as bAn,getAuthTokenSource as sk,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {sle as zae,B9e as f9e} from "../api/5191_model.ts";
import {sleep as Fn} from "./1483_withTimeout.ts";
import {getAuthHeadersAsync as ckt,fk as uk} from "../api/2032_withOAuth401Retry.ts";
import {tg as Yh} from "../config/0048_ISSUES_EXPLAINER.ts";
import {fo as ho} from "../../vendor/m566.ts";
import {zNr as oNr,V_n as i_n,YNr as sNr} from "../../vendor/m2204.ts";
import {Lb as Db,dn as ln,bt as St} from "../../vendor/m195.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,fromEnumOpt as us} from "../../vendor/m5.ts";
import {isTmuxControlMode as Bt,Oe as Pe,Ie as He,ln as cn} from "./0594_feature_name.ts";
import {K_n as a_n} from "../../vendor/m2206.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {Gp as cm} from "../../vendor/m567.ts";
import {rXr as oJr} from "../../vendor/m3328.ts";
// @ts-nocheck
var Vy_ = {};
pt(Vy_, {
  waitForPolicyLimitsToLoad: () => waitForPolicyLimitsToLoad,
  stopBackgroundPolling: () => stopBackgroundPolling,
  startBackgroundPolling: () => startBackgroundPolling,
  shouldAwaitPolicyLimitsOnStartup: () => shouldAwaitPolicyLimitsOnStartup,
  refreshPolicyLimits: () => refreshPolicyLimits,
  recordPolicyLimitsStartupAwaitResult: () => recordPolicyLimitsStartupAwaitResult,
  logPolicyLimitsCacheStateAtFirstPrompt: () => logPolicyLimitsCacheStateAtFirstPrompt,
  loadPolicyLimits: () => loadPolicyLimits,
  initializePolicyLimitsLoadingPromise: () => initializePolicyLimitsLoadingPromise,
  clearPolicyLimitsCache: () => clearPolicyLimitsCache,
  _resetPolicyLimitsForTesting: () => _resetPolicyLimitsForTesting,
  POLICY_LIMITS_COLD_AWAIT_MS: () => POLICY_LIMITS_COLD_AWAIT_MS,
  FAIL_CLOSED_SHADOW_CACHE_TTL_MS: () => FAIL_CLOSED_SHADOW_CACHE_TTL_MS
});
function tBl() {
  try {
    return Math.max(0, Date.now() - ZNl.statSync(tve()).mtimeMs);
  } catch {
    return;
  }
}
function recordPolicyLimitsStartupAwaitResult(e) {
  QHo = e;
}
function ZHo() {
  if (stopBackgroundPolling(), Afe(null), Pue?.(), m8e = null, Pue = null, p8e !== null) clearTimeout(p8e), p8e = null;
}
function _resetPolicyLimitsForTesting() {
  ZHo(), KHo = false, $ft = "not_started", YHo = false, $Kn = undefined, QHo = "not_awaited", zHo = false;
}
function initializePolicyLimitsLoadingPromise() {
  if (m8e) return;
  if (t$()) m8e = new Promise(e => {
    Pue = e, p8e = setTimeout(t => {
      if (Pue === t) v("Policy limits: Loading promise timed out, resolving anyway"), Pue(), Pue = null;
    }, fTm, e);
  });
}
function hTm() {
  return `${Is().BASE_API_URL}/api/claude_code/policy_limits`;
}
function JHo(e) {
  if (Array.isArray(e)) return e.map(JHo);
  if (e !== null && typeof e === "object") {
    let t = {};
    for (let [n, r] of Object.entries(e).sort(([o], [s]) => o.localeCompare(s))) t[n] = JHo(r);
    return t;
  }
  return e;
}
function gTm(e) {
  let t = JHo(e),
    n = Oe(t);
  return `sha256:${QNl.createHash("sha256").update(n).digest("hex")}`;
}
function shouldAwaitPolicyLimitsOnStartup() {
  return t$() && cHt() === null;
}
async function waitForPolicyLimitsToLoad() {
  if (m8e) await m8e;
}
function _Tm() {
  let e = null;
  try {
    e = $g({
      skipRetrievingKeyFromApiKeyHelper: true
    }).key;
  } catch {}
  if (!e && oE()) return "wif";
  if (Co() && di()?.accessToken) return "oauth";
  return e ? "api_key" : "oauth";
}
async function yTm(e) {
  let t = null;
  for (let n = 1; n <= VHo + 1; n++) {
    if (t = await TTm(e), t.attempts = n, t.success) return t;
    if (t.skipRetry) return t;
    if (n > VHo) return t;
    let r = zae(n);
    v(`Policy limits: Retry ${n}/${VHo} after ${r}ms`), await Fn(r);
  }
  return t;
}
async function TTm(e) {
  let t;
  try {
    t = await bAn();
    let n = await ckt();
    if (n.error) return {
      success: false,
      error: "Authentication required for policy limits",
      errorCode: "auth_failed",
      authUnavailableReason: n.reasonCode,
      tokenRefreshOutcome: t,
      skipRetry: true
    };
    let r = hTm(),
      o = {
        ...n.headers,
        "User-Agent": Yh()
      };
    if (e) o["If-None-Match"] = `"${e}"`;
    let s = await ho.get(r, {
      headers: o,
      timeout: pTm,
      validateStatus: a => a === 200 || a === 304 || a === 404
    });
    if (s.status === 304) return v("Policy limits: Using cached restrictions (304)"), {
      success: true,
      response: null,
      etag: e
    };
    if (s.status === 404) return v("Policy limits: No restrictions found (404)"), {
      success: true,
      response: oNr,
      etag: undefined
    };
    let i = i_n().safeParse(s.data);
    if (!i.success) return v(`Policy limits: Invalid response format - ${i.error.message}`), {
      success: false,
      error: "Invalid policy limits format",
      errorCode: "parse_failed"
    };
    return v("Policy limits: Fetched successfully"), {
      success: true,
      response: i.data
    };
  } catch (n) {
    let {
      kind: r,
      status: o,
      message: s
    } = Db(n);
    switch (v(`Policy limits: fetch failed (${r}${o ? ` ${o}` : ""}) \u2014 ${s}`), r) {
      case "auth":
        return {
          success: false,
          error: "Not authorized for policy limits",
          errorCode: "auth_failed",
          httpStatus: o,
          tokenRefreshOutcome: t,
          skipRetry: true
        };
      case "timeout":
        return {
          success: false,
          error: "Policy limits request timeout",
          errorCode: "timeout"
        };
      case "network":
        return {
          success: false,
          error: "Cannot connect to server",
          errorCode: "network_error"
        };
      default:
        return {
          success: false,
          error: s,
          errorCode: "request_failed",
          httpStatus: o
        };
    }
  }
}
async function STm(e) {
  try {
    let t = tve();
    await f8e.writeFile(t, Oe(e, null, 2), {
      encoding: "utf-8",
      mode: 384
    }), v(`Policy limits: Saved to ${t}`);
  } catch (t) {
    if (v(`Policy limits: Failed to save - ${t instanceof Error ? t.message : "unknown error"}`), !zHo) zHo = true, j("tengu_policy_limits_cache_write_failed", {
      errno: Ue(bTm(t))
    });
  }
}
function bTm(e) {
  let t = ln(e);
  switch (t) {
    case "EACCES":
    case "EPERM":
    case "EROFS":
    case "ENOSPC":
    case "EDQUOT":
    case "ENOENT":
    case "ENOTDIR":
    case "EMFILE":
    case "ENFILE":
    case "EBUSY":
      return t;
    default:
      return "other";
  }
}
async function rBl(e, t = false) {
  let n = e === "policy_limits_load" && !YHo;
  if (n) YHo = true;
  if (!t$()) return null;
  if (n) $ft = "in_flight";
  let r = cHt(),
    o = tBl();
  if (r && !lHt()) Afe(r);
  let s = r ? gTm(r) : undefined,
    i = _Tm(),
    a = Date.now();
  try {
    let l = await yTm(s);
    if (n) $ft = l.success ? "succeeded" : "failed", $Kn = l.success ? undefined : l.errorCode ?? "request_failed";
    let c = Date.now();
    if (j("tengu_policy_limits_fetch", {
      duration_ms: c - a,
      ms_since_startup: c - nBl,
      success: l.success,
      had_cache: r !== null,
      cache_age_ms: o,
      attempts: l.attempts,
      is_load: e === "policy_limits_load",
      awaited: t,
      auth_type: Ue(i),
      error_code: us(l.errorCode),
      token_source: Ue(sk().source),
      auth_unavailable_reason: us(l.authUnavailableReason),
      token_refresh_outcome: i === "oauth" ? us(l.tokenRefreshOutcome) : undefined,
      http_status: l.httpStatus
    }), !l.success) {
      if (r) return v("Policy limits: Using stale cache after fetch failure"), Afe(r), Bt(e, "stale_cache_used"), r;
      return Pe(e, l.errorCode ?? "request_failed"), null;
    }
    if (l.response === null && r) {
      v("Policy limits: Cache still valid (304 Not Modified)"), Afe(r);
      try {
        let d = new Date();
        await f8e.utimes(tve(), d, d);
      } catch {}
      return He(e), r;
    }
    let u = l.response ?? oNr;
    return Afe(u), await STm(u), v(Object.keys(u.restrictions).length > 0 ? "Policy limits: Applied new restrictions successfully" : "Policy limits: No restrictions (cached empty)"), He(e), u;
  } catch {
    if (n && $ft === "in_flight") $ft = "failed", $Kn = "unexpected_error";
    if (r) return v("Policy limits: Using stale cache after error"), Afe(r), Bt(e, "stale_cache_used"), r;
    return Pe(e, "unexpected_error"), null;
  }
}
function logPolicyLimitsCacheStateAtFirstPrompt() {
  if (KHo) return;
  KHo = true;
  let e = t$(),
    t = dK() !== null,
    n = e ? tBl() : undefined,
    r = $ft,
    o = QHo,
    s = $Kn,
    i;
  j("tengu_policy_limits_cache_state_at_first_prompt", {
    eligible: e,
    has_cache: t,
    cache_age_ms: n,
    would_fail_closed: e && (!t || (n ?? 1 / 0) > FAIL_CLOSED_SHADOW_CACHE_TTL_MS),
    ms_since_startup: Date.now() - nBl,
    load_state: Ue(r),
    startup_fetch_error_code: us(s),
    startup_await_result: Ue(o),
    error_reporting_gate: i
  });
}
async function loadPolicyLimits({
  startupAwaited: e = false
} = {}) {
  if (t$() && !m8e) m8e = new Promise(n => {
    Pue = n;
  });
  let t = Pue;
  try {
    if (await rBl("policy_limits_load", e), t$()) startBackgroundPolling();
  } finally {
    if (t) {
      if (t(), Pue === t) {
        if (Pue = null, p8e) clearTimeout(p8e), p8e = null;
      }
    }
  }
}
async function refreshPolicyLimits() {
  if (ZHo(), initializePolicyLimitsLoadingPromise(), !t$()) return;
  try {
    await f8e.unlink(tve());
  } catch {}
  await loadPolicyLimits(), v("Policy limits: Refreshed after auth change");
}
async function clearPolicyLimitsCache() {
  ZHo();
  try {
    await f8e.unlink(tve());
  } catch {}
}
async function ETm() {
  if (!t$()) return;
  let e = lHt(),
    t = e ? Oe(e) : null;
  try {
    await rBl("policy_limits_poll");
    let n = lHt();
    if ((n ? Oe(n) : null) !== t) v("Policy limits: Changed during background poll");
  } catch {}
}
function startBackgroundPolling() {
  if (UKn !== null) return;
  if (!t$()) return;
  if (UKn = a_n(() => void ETm(), mTm, {
    unref: true
  }), !XNl) XNl = true, qi(stopBackgroundPolling);
}
function stopBackgroundPolling() {
  UKn?.[Symbol.dispose](), UKn = null;
}
var QNl,
  ZNl,
  f8e,
  pTm = 1e4,
  VHo = 5,
  mTm = 3600000,
  UKn = null,
  XNl = false,
  m8e = null,
  Pue = null,
  p8e = null,
  fTm = 30000,
  POLICY_LIMITS_COLD_AWAIT_MS = 5000,
  FAIL_CLOSED_SHADOW_CACHE_TTL_MS = 86400000,
  KHo = false,
  zHo = false,
  nBl,
  $ft = "not_started",
  YHo = false,
  $Kn,
  QHo = "not_awaited";
var $F = b(() => {
  cm();
  Hc();
  mo();
  Jd();
  je();
  St();
  uk();
  Xt();
  cn();
  Ct();
  f9e();
  oJr();
  sd();
  sNr();
  QNl = require("crypto"), ZNl = require("fs"), f8e = require("fs/promises");
  nBl = Date.now();
});

export {Vy_ as dNt,tBl as vFl,recordPolicyLimitsStartupAwaitResult,ZHo as s0o,_resetPolicyLimitsForTesting,initializePolicyLimitsLoadingPromise,hTm as Jbm,JHo as n0o,gTm as Xbm,shouldAwaitPolicyLimitsOnStartup,waitForPolicyLimitsToLoad,_Tm as Qbm,yTm as Zbm,TTm as eEm,STm as tEm,bTm as nEm,rBl as RFl,logPolicyLimitsCacheStateAtFirstPrompt,loadPolicyLimits,refreshPolicyLimits,clearPolicyLimitsCache,ETm as rEm,startBackgroundPolling,stopBackgroundPolling,QNl as bFl,ZNl as EFl,f8e as L8e,pTm as Vbm,VHo as QIo,mTm as Kbm,UKn as xzn,XNl as SFl,m8e as O8e,Pue as Vue,p8e as P8e,fTm as zbm,POLICY_LIMITS_COLD_AWAIT_MS,FAIL_CLOSED_SHADOW_CACHE_TTL_MS,KHo as ZIo,zHo as e0o,nBl as wFl,$ft as dAt,YHo as t0o,$Kn as kzn,QHo as o0o,$F as zF};
