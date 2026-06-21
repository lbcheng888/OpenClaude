// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isFableCreditsRequired,hasFableConsentSessionFallback,setFableConsentSessionFallback,lt} from "../session/0131_sent.ts";
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber,isEnterprisePAYGSubscriber,getRateLimitTier,getOauthAccountInfo,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {xRr,tE} from "../api/1448_month.ts";
import {b} from "../../runtime.ts";
import {iv} from "../../vendor/m454.ts";
import {we} from "../../vendor/m455.ts";
import {hn} from "../../vendor/m251.ts";
/** Parse a date string (possibly missing T separator or timezone) into a Unix ms timestamp. */
function wFi(dateStr: any): number {
  let normalized = dateStr.replace(/^(\d{4}-\d{2}-\d{2}) (?=\d{2}:)/, "$1T"),
    hasT = normalized.includes("T"),
    hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
  return Date.parse(hasT && !hasTimezone ? `${normalized}Z` : normalized);
}
/** Get the parsed tengu_saffron_lattice feature config, cached by raw value. */
function the() {
  let rawValue = getFeatureValue_CACHED_MAY_BE_STALE("tengu_saffron_lattice", vFi);
  if (wwn === null || wwn.raw !== rawValue) {
    let parsed = jwd().safeParse(rawValue);
    wwn = {
      raw: rawValue,
      parsed: parsed.success ? parsed.data : vFi
    };
  }
  return wwn.parsed;
}
/** Format a date string into a short "Mon D" locale string in UTC, or undefined if invalid. */
function xwn(dateStr: any): string | undefined {
  if (!dateStr) return;
  let ms = wFi(dateStr);
  if (Number.isNaN(ms)) return;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
}
/** Check if the given date string represents a moment that has already passed. */
function Wwd(dateStr: any): boolean {
  if (dateStr === void 0) return !1;
  if (Rwn === null || Rwn.value !== dateStr) Rwn = {
    value: dateStr,
    ms: wFi(dateStr)
  };
  return Date.now() >= Rwn.ms;
}
/** Returns true if the user needs to consent to overage or pay (plan limit ended or credits required). */
function X$() {
  let config = the();
  return config.overageConsentRequired === !0 || Wwd(config.planLimitsEndDate) || isFableCreditsRequired();
}
/** Returns true if extra usage is structurally disabled (non-firstParty, non-subscriber, enterprise PAYG, or zero tier). */
function D0() {
  return getAPIProvider() !== "firstParty" || !isClaudeAISubscriber() || isEnterprisePAYGSubscriber() || getRateLimitTier() === "default_claude_zero";
}
/** Returns true if extra usage is disabled at org level or because overage was not provisioned. */
function RFi() {
  let disabledReason = getGlobalConfig().cachedExtraUsageDisabledReason;
  return disabledReason === "org_level_disabled" || disabledReason === "overage_not_provisioned";
}
/** Returns the canonical account/org identifier (org UUID, acct: prefixed UUID, or null). */
function xFi() {
  let accountInfo = getOauthAccountInfo();
  if (!accountInfo) return null;
  if (accountInfo.organizationUuid) return accountInfo.organizationUuid;
  return accountInfo.accountUuid ? `acct:${accountInfo.accountUuid}` : null;
}
/** Returns true if the user has given fable overage consent (checks global config keyed by org/account UUID). */
function P2e() {
  if (xFi() === null) return hasFableConsentSessionFallback();
  let accountInfo = getOauthAccountInfo();
  if (!accountInfo) return hasFableConsentSessionFallback();
  let consentMap = getGlobalConfig().fableOverageConsent;
  return accountInfo.organizationUuid !== void 0 && consentMap?.[accountInfo.organizationUuid] === !0 || accountInfo.accountUuid !== void 0 && consentMap?.[`acct:${accountInfo.accountUuid}`] === !0;
}
/** Persist fable overage consent for the given entity key in global config. */
function Gwd(entityKey: any) {
  if (getGlobalConfig().fableOverageConsent?.[entityKey] === !0) return;
  saveGlobalConfig(cfg => ({
    ...cfg,
    fableOverageConsent: {
      ...cfg.fableOverageConsent,
      [entityKey]: !0
    }
  }));
}
/** Set fable overage consent: uses session fallback if no account UUID, otherwise persists to config. */
function kwn() {
  let entityKey = xFi();
  if (entityKey === null) {
    setFableConsentSessionFallback(!0);
    return;
  }
  Gwd(entityKey);
}
/** Returns true if extra usage is currently enabled (null=enabled, undefined=disabled, else check xRr). */
function YRe() {
  let disabledReason = getGlobalConfig().cachedExtraUsageDisabledReason;
  if (disabledReason === void 0) return !1;
  if (disabledReason === null) return !0;
  return xRr(disabledReason);
}
/** Returns true if usage is currently allowed (consented+enabled, or structurally not blocked, or consent not required). */
function R8r() {
  if (P2e() && YRe()) return !0;
  if (D0()) return !0;
  return !X$();
}
/** Returns true if usage is NOT currently allowed. */
function Hwn() {
  return !R8r();
}
var jwd,
  wwn = null,
  vFi,
  Rwn = null;
var eW = b(() => {
  iv();
  lt();
  zn();
  Ao();
  Qn();
  tE();
  li();
  jwd = we(() => hn.object({
    enabled: hn.boolean().optional(),
    planLimitsEndDate: hn.string().optional(),
    hideRateLimitsDescription: hn.boolean().optional(),
    overageConsentRequired: hn.boolean().optional()
  }));
  vFi = {
    enabled: !1
  };
});
export {wFi,the,xwn,Wwd,X$,D0,RFi,xFi,P2e,Gwd,kwn,YRe,R8r,Hwn,jwd,wwn,vFi,Rwn,eW};
