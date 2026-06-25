// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,hasFreshGrowthBookFeatures as JRe,getDynamicConfig_CACHED_MAY_BE_STALE as Dk,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isFableCreditsRequired as yir,hasFableConsentSessionFallback as cJt,setFableConsentSessionFallback as Cir,lt} from "../session/0132_sent.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber as Eo,isEnterprisePAYGSubscriber as Ome,getRateLimitTier as U3,getSubscriptionType as vi,getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Hkt,WS} from "../api/1453_month.ts";
import {b} from "../../runtime.ts";
import {MS} from "../../vendor/m460.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
/** Parse a date string (possibly missing T separator or timezone) into a Unix ms timestamp. */
function AMd(dateStr) {
  let normalized = dateStr.replace(/^(\d{4}-\d{2}-\d{2}) (?=\d{2}:)/, "$1T"),
    hasT = normalized.includes("T"),
    hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
  return Date.parse(hasT && !hasTimezone ? `${normalized}Z` : normalized);
}
/** Get the parsed tengu_saffron_lattice feature config, cached by raw value. */
function RMd() {
  let rawValue = it("tengu_saffron_lattice", mqi);
  if (gHn === null || gHn.raw !== rawValue) {
    let parsed = CMd().safeParse(rawValue);
    gHn = {
      raw: rawValue,
      parsed: parsed.success ? parsed.data : mqi
    };
  }
  return gHn.parsed;
}
/** Check if the given date string represents a moment that has already passed (cached). */
function vMd(dateStr) {
  if (dateStr === void 0) return !1;
  if (_Hn === null || _Hn.value !== dateStr) _Hn = {
    value: dateStr,
    ms: AMd(dateStr)
  };
  return Date.now() >= _Hn.ms;
}
/** Returns true if overage consent/payment is required, either from rate limits or credits-only tier. */
function fge() {
  return Tae() || yir();
}
/** Returns true if the user needs to consent to overage or pay (plan limit ended), false if disabled. */
function Tae() {
  let config = RMd();
  if (config.enabled === !1) return !1;
  return config.overageConsentRequired === !0 || vMd(config.planLimitsEndDate);
}
/** Returns true if extra usage is structurally disabled (non-firstParty, non-subscriber, enterprise PAYG, or zero tier). */
function tB() {
  return Rr() !== "firstParty" || !Eo() || Ome() || U3() === "default_claude_zero";
}
/** Get the parsed tengu_saffron_credits_only_tiers feature config (string array), cached by raw value. */
function kMd() {
  let rawValue = it("tengu_saffron_credits_only_tiers", fqi);
  if (yHn === null || yHn.raw !== rawValue) {
    let parsed = wMd().safeParse(rawValue);
    if (!parsed.success) A("tengu_saffron_credits_only_tiers: unparseable value, using default", {
      level: "warn"
    });
    yHn = {
      raw: rawValue,
      parsed: parsed.success ? parsed.data : fqi
    };
  }
  return yHn.parsed;
}
/** Returns true if this is an enterprise account that is not enterprise PAYG. */
function HMd() {
  return vi() === "enterprise" && !Ome();
}
/** Returns true if the current rate limit tier is credits-only (enterprise or in the credits-only tiers list). */
function Sae() {
  if (HMd()) return !0;
  let tier = vi();
  if (tier === null) return !1;
  return kMd().includes(tier);
}
/** Returns the tengu_saffron_picker_dim feature flag (default false). */
function hqi() {
  return it("tengu_saffron_picker_dim", !1);
}
/** Returns true if extra usage is disabled at org level or because overage was not provisioned. */
function gqi() {
  let disabledReason = Ot().cachedExtraUsageDisabledReason;
  return disabledReason === "org_level_disabled" || disabledReason === "overage_not_provisioned";
}
/** Returns true if extra usage is disabled (not provisioned, org-disabled, or out of credits). */
function IMd() {
  let disabledReason = Ot().cachedExtraUsageDisabledReason;
  return disabledReason === "overage_not_provisioned" || disabledReason === "org_level_disabled" || disabledReason === "out_of_credits";
}
/** Returns the canonical account/org identifier (org UUID, acct: prefixed UUID, or null). */
function _qi() {
  let accountInfo = hc();
  if (!accountInfo) return null;
  if (accountInfo.organizationUuid) return accountInfo.organizationUuid;
  return accountInfo.accountUuid ? `acct:${accountInfo.accountUuid}` : null;
}
/** Returns true if the user has given fable overage consent v2 (checks global config keyed by org/account UUID). */
function KMt() {
  if (_qi() === null) return cJt();
  let accountInfo = hc();
  if (!accountInfo) return cJt();
  let consentMap = Ot().fableOverageConsentV2;
  return accountInfo.organizationUuid !== void 0 && consentMap?.[accountInfo.organizationUuid] === !0 || accountInfo.accountUuid !== void 0 && consentMap?.[`acct:${accountInfo.accountUuid}`] === !0;
}
/** Persist fable overage consent v2 for the given entity key in global config. */
function xMd(entityKey) {
  if (Ot().fableOverageConsentV2?.[entityKey] === !0) return;
  hn(cfg => ({
    ...cfg,
    fableOverageConsentV2: {
      ...cfg.fableOverageConsentV2,
      [entityKey]: !0
    }
  }));
}
/** Set fable overage consent: uses session fallback if no account UUID, otherwise persists to config. */
function Pke() {
  let entityKey = _qi();
  if (entityKey === null) {
    Cir(!0);
    return;
  }
  xMd(entityKey);
}
/** Returns true if extra usage is currently enabled (null=enabled, undefined=disabled, else check Hkt). */
function Oke() {
  let disabledReason = Ot().cachedExtraUsageDisabledReason;
  if (disabledReason === void 0) return !1;
  if (disabledReason === null) return !0;
  return Hkt(disabledReason);
}
/** Returns true if usage is NOT currently allowed (consent+enabled, or structurally blocked, or no overage required). */
function r7r() {
  if (KMt() && Oke()) return !0;
  if (tB()) return !0;
  return !fge();
}
/** Returns true if the given model id has a non-empty block override configured via tengu-model-error-overrides. */
function yqi(modelId) {
  if (!JRe()) return !1;
  let overrides = Dk("tengu-model-error-overrides", {});
  if (typeof overrides !== "object" || overrides === null) return !1;
  let override = overrides[modelId];
  if (typeof override !== "object" || override === null) return !1;
  let blockReason = override.block;
  return typeof blockReason === "string" && blockReason.trim() !== "";
}
/** Returns true if usage is currently allowed (not credits-only tier and not blocked). */
function zMt() {
  if (Sae()) return !1;
  return !r7r();
}
/** Returns true if the overage consent prompt should be shown (allowed, or overage required but disabled). */
function Tqi() {
  if (Sae()) return !1;
  if (zMt()) return !0;
  return fge() && !tB() && IMd();
}
var CMd,
  gHn = null,
  mqi,
  _Hn = null,
  wMd,
  fqi,
  yHn = null;
var ej = b(() => {
  MS();
  lt();
  jn();
  lo();
  tr();
  qe();
  WS();
  Ps();
  CMd = ve(() => jt.object({
    enabled: jt.boolean().optional(),
    planLimitsEndDate: jt.string().optional(),
    hideRateLimitsDescription: jt.boolean().optional(),
    overageConsentRequired: jt.boolean().optional()
  }));
  mqi = {};
  wMd = ve(() => jt.array(jt.string())), fqi = ["enterprise"];
});

export {AMd,RMd,vMd,fge,Tae,tB,kMd,HMd,Sae,hqi,gqi,IMd,_qi,KMt,xMd,Pke,Oke,r7r,yqi,zMt,Tqi,CMd,gHn,mqi,_Hn,wMd,fqi,yHn,ej};
