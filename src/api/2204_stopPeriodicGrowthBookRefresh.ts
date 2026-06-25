// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,getCurrentProjectConfig as eh,getCachedClientData as pI,tr,checkHasTrustDialogAccepted as kd} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logGrowthBookExperimentTo1P as i$r,is1PEventLoggingEnabled as G3,GM} from "../session/2203_shutdown1PEventLogging.ts";
import {Ne} from "../../vendor/m583.ts";
import {mli,KQ} from "../../vendor/m2039.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {XU,rI} from "../config/0586_rI.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {hJo} from "../../vendor/m445.ts";
import {YU} from "../../vendor/m459.ts";
import {lt,getSessionTrustAccepted as BKe,getIsNonInteractiveSession as kr} from "../session/0132_sent.ts";
import {qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ir} from "../../vendor/m584.ts";
import {kk,getAuthHeaders as _8} from "./2037_withOAuth401Retry.ts";
import {y8,lli} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {ig} from "../../vendor/m130.ts";
import {tn} from "../config/0230_encoding.ts";
import {gxt,Bli} from "./2050_type.ts";
import {Ni} from "../../vendor/m127.ts";
import {Hn} from "../../vendor/m100.ts";
import {vJo} from "../../vendor/m460.ts";
import {mnn} from "../../vendor/m444.ts";
/** Module exports namespace object */
var h$r = {};
ft(h$r, {
  stopPeriodicGrowthBookRefresh: () => stopPeriodicGrowthBookRefresh,
  setupPeriodicGrowthBookRefresh: () => setupPeriodicGrowthBookRefresh,
  setGrowthBookConfigOverride: () => setGrowthBookConfigOverride,
  resetGrowthBook: () => resetGrowthBook,
  refreshGrowthBookFeatures: () => refreshGrowthBookFeatures,
  refreshGrowthBookAfterAuthChange: () => refreshGrowthBookAfterAuthChange,
  onGrowthBookRefresh: () => onGrowthBookRefresh,
  isGrowthBookEnabled: () => isGrowthBookEnabled,
  isFeatureFromExperiment: () => isFeatureFromExperiment,
  initializeGrowthBook: () => initializeGrowthBook,
  hasGrowthBookEnvOverride: () => hasGrowthBookEnvOverride,
  hasFreshGrowthBookFeatures: () => hasFreshGrowthBookFeatures,
  getUserAttributes: () => getUserAttributes,
  getNonDefaultFeatureKeys: () => getNonDefaultFeatureKeys,
  getGrowthBookConfigOverrides: () => getGrowthBookConfigOverrides,
  getFeatureValue_DEPRECATED: () => getFeatureValue_DEPRECATED,
  getFeatureValue_CACHED_WITH_REFRESH: () => getFeatureValue_CACHED_WITH_REFRESH,
  getFeatureValue_CACHED_MAY_BE_STALE: () => getFeatureValue_CACHED_MAY_BE_STALE,
  getDynamicConfig_CACHED_MAY_BE_STALE: () => getDynamicConfig_CACHED_MAY_BE_STALE,
  getDynamicConfig_BLOCKS_ON_INIT: () => getDynamicConfig_BLOCKS_ON_INIT,
  getClientDataAtis: () => getClientDataAtis,
  getApiBaseUrlHost: () => getApiBaseUrlHost,
  getAllGrowthBookFeatures: () => getAllGrowthBookFeatures,
  clearGrowthBookConfigOverrides: () => clearGrowthBookConfigOverrides,
  checkSecurityRestrictionGate: () => checkSecurityRestrictionGate,
  checkGate_CACHED_OR_BLOCKING: () => checkGate_CACHED_OR_BLOCKING,
  ATIS_REQUEST_HEADER: () => ATIS_REQUEST_HEADER
});
/** Fire callback safely, catching both sync and async errors */
function vSi(callback: any): void {
  try {
    Promise.resolve(callback()).catch(err => {
      Ie(err);
    });
  } catch (err) {
    Ie(err);
  }
}
/** Subscribe to GrowthBook refresh events; fires callback immediately if features already loaded */
function onGrowthBookRefresh(callback: any): any {
  let isActive = !0,
    unsubscribe = set.subscribe(() => vSi(callback));
  if (R8.size > 0) queueMicrotask(() => {
    if (isActive && R8.size > 0) vSi(callback);
  });
  return () => {
    isActive = !1, unsubscribe();
  };
}
/** Returns the env override map, marking it as initialized on first access */
function tDt(): any {
  if (!c$r) c$r = !0;
  return wSi;
}
/** Check if a feature key has an env-level override */
function hasGrowthBookEnvOverride(featureKey: any): any {
  let overrides = tDt();
  return overrides !== null && featureKey in overrides;
}
/** Check whether a feature comes from an experiment (local pve map or cached config) */
function isFeatureFromExperiment(featureKey: any): any {
  if (YRe.has(featureKey)) return !0;
  if (!isGrowthBookEnabled()) return !1;
  return (Ot().cachedExperimentFeatures ?? []).includes(featureKey);
}
/** No-op placeholder for config overrides getter */
function nDt(): any {
  return;
}
/** Return all features from in-memory map or fall back to cached config */
function getAllGrowthBookFeatures(): any {
  if (R8.size > 0) return Object.fromEntries(R8);
  return Ot().cachedGrowthBookFeatures ?? {};
}
/** True when in-memory feature map has been populated from a fresh fetch */
function hasFreshGrowthBookFeatures(): any {
  return R8.size > 0;
}
/** Return the set of non-default feature keys */
function getNonDefaultFeatureKeys(): any {
  return fbn;
}
/** Return config overrides map (or empty object) */
function getGrowthBookConfigOverrides(): any {
  return nDt() ?? {};
}
/** No-op: set a config override for a feature key */
function setGrowthBookConfigOverride(featureKey: any, value: any): any {
  return;
}
/** No-op: clear all config overrides */
function clearGrowthBookConfigOverrides(): any {
  return;
}
/** Log experiment exposure for a feature key if not already logged */
function gbn(featureKey: any): void {
  if (l$r.has(featureKey)) return;
  let experimentInfo = YRe.get(featureKey);
  if (experimentInfo) l$r.add(featureKey), i$r({
    experimentId: experimentInfo.experimentId,
    variationId: experimentInfo.variationId,
    userAttributes: getUserAttributes(),
    experimentMetadata: {
      feature_id: featureKey
    }
  });
}
/** Process remote eval payload: populate in-memory feature/experiment maps */
async function HSi(growthBookInstance: any): Promise<any> {
  let payload = growthBookInstance.getPayload();
  if (!payload?.features || Object.keys(payload.features).length === 0) return !1;
  YRe.clear(), fbn.clear();
  let featuresOut: any = {},
    skipped: any[] = [];
  for (let [featureKey, featureVal] of Object.entries(payload.features)) {
    let featureObj = featureVal;
    if (featureObj === null || typeof featureObj !== "object") {
      skipped.push(`${featureKey}:${featureObj === null ? "null" : typeof featureObj}`);
      continue;
    }
    if ("value" in featureObj && !("defaultValue" in featureObj)) featuresOut[featureKey] = {
      ...featureObj,
      defaultValue: featureObj.value
    };else featuresOut[featureKey] = featureObj;
    if (featureObj.source === "experiment" && featureObj.experimentResult) {
      let {
        experimentResult: expResult,
        experiment: expDef
      } = featureObj;
      if (expDef?.key && expResult.variationId !== void 0) YRe.set(featureKey, {
        experimentId: expDef.key,
        variationId: expResult.variationId
      });
    }
    if (featureObj.source !== void 0 && featureObj.source !== "defaultValue" && featureObj.source !== "unknownFeature") fbn.add(featureKey);
  }
  if (skipped.length > 0) {
    if (!a$r) a$r = !0, Ie(Error(`processRemoteEvalPayload: skipped non-object features [${skipped.join(", ")}]`));
    if (Object.keys(featuresOut).length === 0) return !1;
  }
  await growthBookInstance.setPayload({
    ...payload,
    features: featuresOut
  }), R8.clear();
  for (let [featureKey, featureObj] of Object.entries(featuresOut)) {
    let resolvedValue = "value" in featureObj ? featureObj.value : featureObj.defaultValue;
    if (resolvedValue !== void 0) R8.set(featureKey, resolvedValue);
  }
  return !0;
}
/** Persist fresh GrowthBook features and experiment keys to global config cache */
function ISi(): void {
  let featuresSnapshot = Object.fromEntries(R8),
    experimentKeys = Array.from(YRe.keys()).sort();
  hn(cfg => ({
    ...cfg,
    cachedGrowthBookFeatures: featuresSnapshot,
    cachedExperimentFeatures: experimentKeys,
    cachedGrowthBookFeaturesAt: Date.now()
  }));
}
/** GrowthBook is enabled only when not disabled by env and 1P logging is active */
function isGrowthBookEnabled(): any {
  return !Ne.DISABLE_GROWTHBOOK && G3();
}
/** Return the API base URL host if it differs from the default */
function getApiBaseUrlHost(): any {
  let baseUrl = process.env.ANTHROPIC_BASE_URL;
  if (!baseUrl) return;
  try {
    let host = new URL(baseUrl).host;
    if (host === "api.anthropic.com") return;
    return host;
  } catch {
    return;
  }
}
/** Build user attribute object for GrowthBook targeting */
function getUserAttributes(): any {
  let identityInfo = mli(),
    email = identityInfo.email,
    autoUpdatesChannel = Fr()?.autoUpdatesChannel,
    releaseChannelOverride = void 0,
    apiHost = getApiBaseUrlHost(),
    entrypoint = XU(),
    accountOverride = void 0,
    accountUuid = identityInfo.accountUuid || process.env.CLAUDE_CODE_ACCOUNT_UUID || accountOverride?.accountUuid,
    organizationUuid = identityInfo.organizationUuid || process.env.CLAUDE_CODE_ORGANIZATION_UUID || accountOverride?.organizationUuid || void 0;
  return {
    id: identityInfo.deviceId,
    sessionId: identityInfo.sessionId,
    deviceID: identityInfo.deviceId,
    platform: identityInfo.platform,
    ...(apiHost && {
      apiBaseUrlHost: apiHost
    }),
    ...(organizationUuid && {
      organizationUUID: organizationUuid
    }),
    ...(accountUuid && {
      accountUUID: accountUuid
    }),
    ...(identityInfo.userType && {
      userType: identityInfo.userType
    }),
    ...(identityInfo.subscriptionType && {
      subscriptionType: identityInfo.subscriptionType
    }),
    ...(identityInfo.rateLimitTier && {
      rateLimitTier: identityInfo.rateLimitTier
    }),
    ...(identityInfo.firstTokenTime && {
      firstTokenTime: identityInfo.firstTokenTime
    }),
    ...(email && {
      email: email
    }),
    ...(identityInfo.appVersion && {
      appVersion: identityInfo.appVersion
    }),
    ...(identityInfo.githubActionsMetadata && {
      githubActionsMetadata: identityInfo.githubActionsMetadata
    }),
    ...(releaseChannelOverride && {
      releaseChannel: releaseChannelOverride
    }),
    ...(entrypoint && {
      entrypoint: entrypoint
    }),
    ...(eh().hasUsedRemoteSession && {
      hasUsedRemoteSession: !0
    }),
    ...(Ot().hasRemoteEnvironment && {
      hasRemoteEnvironment: !0
    })
  };
}
/** Fetch feature value: check env override, config override, then async GrowthBook init */
async function DSi(featureKey: any, defaultValue: any, logExposure: any): Promise<any> {
  let envOverrides = tDt();
  if (envOverrides && featureKey in envOverrides) return envOverrides[featureKey];
  let configOverrides = nDt();
  if (configOverrides && featureKey in configOverrides) return configOverrides[featureKey];
  if (!isGrowthBookEnabled()) return defaultValue;
  let gbInstance = await initializeGrowthBook();
  if (!gbInstance) return defaultValue;
  let resolvedValue: any;
  if (R8.has(featureKey)) resolvedValue = R8.get(featureKey);else resolvedValue = gbInstance.getFeatureValue(featureKey, defaultValue);
  if (logExposure) gbn(featureKey);
  return resolvedValue;
}
/** Deprecated async feature value getter — always logs experiment exposure */
async function getFeatureValue_DEPRECATED(featureKey: any, defaultValue: any): Promise<any> {
  return DSi(featureKey, defaultValue, !0);
}
/** Synchronous feature value getter; may use stale cached data */
function getFeatureValue_CACHED_MAY_BE_STALE(featureKey: any, defaultValue: any): any {
  let envOverrides = tDt();
  if (envOverrides && featureKey in envOverrides) return envOverrides[featureKey];
  let configOverrides = nDt();
  if (configOverrides && featureKey in configOverrides) return configOverrides[featureKey];
  if (!isGrowthBookEnabled()) return defaultValue;
  if (YRe.has(featureKey)) gbn(featureKey);else Zxt.add(featureKey);
  if (R8.has(featureKey)) return R8.get(featureKey);
  try {
    let cachedVal = Ot().cachedGrowthBookFeatures?.[featureKey];
    return cachedVal !== void 0 ? cachedVal : defaultValue;
  } catch {
    return defaultValue;
  }
}
/** Public alias: getFeatureValue_CACHED_WITH_REFRESH (delegates to may-be-stale getter) */
function getFeatureValue_CACHED_WITH_REFRESH(featureKey: any, defaultValue: any, n: any): any {
  return getFeatureValue_CACHED_MAY_BE_STALE(featureKey, defaultValue);
}
/** Check security restriction gate; blocks on pending init if needed */
async function checkSecurityRestrictionGate(gateKey: any): Promise<any> {
  let envOverrides = tDt();
  if (envOverrides && gateKey in envOverrides) return Boolean(envOverrides[gateKey]);
  let configOverrides = nDt();
  if (configOverrides && gateKey in configOverrides) return Boolean(configOverrides[gateKey]);
  if (!isGrowthBookEnabled()) return !1;
  if (eDt) await eDt;
  let cachedVal = Ot().cachedGrowthBookFeatures?.[gateKey];
  if (cachedVal !== void 0) return Boolean(cachedVal);
  return !1;
}
/** Check gate using cache; falls back to blocking async init if not cached */
async function checkGate_CACHED_OR_BLOCKING(gateKey: any): Promise<any> {
  let envOverrides = tDt();
  if (envOverrides && gateKey in envOverrides) return Boolean(envOverrides[gateKey]);
  let configOverrides = nDt();
  if (configOverrides && gateKey in configOverrides) return Boolean(configOverrides[gateKey]);
  if (!isGrowthBookEnabled()) return !1;
  if (Ot().cachedGrowthBookFeatures?.[gateKey] === !0) {
    if (YRe.has(gateKey)) gbn(gateKey);else Zxt.add(gateKey);
    return !0;
  }
  return DSi(gateKey, !1, !0);
}
/** Reinitialize GrowthBook after authentication changes */
function refreshGrowthBookAfterAuthChange(): void {
  if (!isGrowthBookEnabled()) return;
  try {
    resetGrowthBook(), set.emit(), eDt = initializeGrowthBook().catch(err => (Ie(mo(err)), null)).finally(() => {
      eDt = null;
    });
  } catch (err) {
    Ie(mo(err));
  }
}
/** Reset all GrowthBook state: clear timers, maps, caches, and memoized fns */
function resetGrowthBook(): void {
  if (stopPeriodicGrowthBookRefresh(), Xxt) process.off("beforeExit", Xxt), Xxt = null;
  if (Qxt) process.off("exit", Qxt), Qxt = null;
  Bfe?.destroy(), Bfe = null, d$r = !1, a$r = !1, eDt = null, YRe.clear(), fbn.clear(), Zxt.clear(), l$r.clear(), R8.clear(), u$r.cache?.clear?.(), initializeGrowthBook.cache?.clear?.(), wSi = null, c$r = !1;
}
/** Periodic refresh interval in ms (6 hours) */
function Aad(): number {
  return 21600000;
}
/** Get the cached ATIS string from global config if present */
function getClientDataAtis(): any {
  let atisVal = pI()?.atis;
  return typeof atisVal === "string" && atisVal.length > 0 ? atisVal : void 0;
}
/** Refresh GrowthBook features from remote; persist on success */
async function refreshGrowthBookFeatures(): Promise<void> {
  if (!isGrowthBookEnabled()) return;
  try {
    let gbInstance = await initializeGrowthBook();
    if (!gbInstance) return;
    if (await gbInstance.refreshFeatures({
      skipCache: !0
    }), gbInstance !== Bfe) return;
    let didUpdate = await HSi(gbInstance);
    if (gbInstance !== Bfe) return;
    if (didUpdate) ISi(), set.emit();
  } catch (err) {
    Ie(mo(err));
  }
}
/** Start periodic refresh interval and register beforeExit cleanup */
function setupPeriodicGrowthBookRefresh(): void {
  if (!isGrowthBookEnabled()) return;
  if (gUe) clearInterval(gUe);
  if (gUe = setInterval(() => {
    refreshGrowthBookFeatures();
  }, Aad()), gUe.unref?.(), !oet) oet = () => {
    stopPeriodicGrowthBookRefresh();
  }, process.once("beforeExit", oet);
}
/** Stop periodic refresh interval and remove beforeExit listener */
function stopPeriodicGrowthBookRefresh(): void {
  if (gUe) clearInterval(gUe), gUe = null;
  if (oet) process.removeListener("beforeExit", oet), oet = null;
}
/** Blocking async dynamic config getter (delegates to deprecated fn) */
async function getDynamicConfig_BLOCKS_ON_INIT(featureKey: any, defaultValue: any): Promise<any> {
  return getFeatureValue_DEPRECATED(featureKey, defaultValue);
}
/** Synchronous dynamic config getter using potentially stale cache */
function getDynamicConfig_CACHED_MAY_BE_STALE(featureKey: any, defaultValue: any): any {
  return getFeatureValue_CACHED_MAY_BE_STALE(featureKey, defaultValue);
}
/** Module-level state: GrowthBook client instance and various flags/maps */
var Bfe = null,
  a$r = !1,
  Xxt = null,
  Qxt = null,
  d$r = !1,
  YRe,
  fbn,
  R8,
  Zxt,
  l$r,
  eDt = null,
  set,
  wSi = null,
  c$r = !1,
  u$r,
  initializeGrowthBook,
  ATIS_REQUEST_HEADER = "x-cc-atis",
  gUe = null,
  oet = null;
/** Module initializer: sets up GrowthBook singleton factory and memoized init */
var jn = b(() => {
  hJo();
  YU();
  lt();
  tr();
  qe();
  rI();
  Ir();
  Ct();
  kk();
  vn();
  y8();
  br();
  ig();
  tn();
  KQ();
  gxt();
  GM();
  YRe = new Map(), fbn = new Set(), R8 = new Map(), Zxt = new Set(), l$r = new Set(), set = Ni();
  u$r = Hn(() => {
    if (!isGrowthBookEnabled()) return null;
    let userAttrs = getUserAttributes(),
      clientKey = vJo(),
      apiHost = "https://api.anthropic.com/",
      authResult = kd() || BKe() || kr() ? _8() : {
        headers: {},
        error: "trust not established"
      },
      isTrusted = !authResult.error;
    d$r = isTrusted;
    let gbClient = new mnn({
      apiHost: apiHost,
      clientKey: clientKey,
      attributes: userAttrs,
      remoteEval: !0,
      cacheKeyAttributes: ["id", "organizationUUID"],
      ...(!authResult.error && {
        apiHostRequestHeaders: authResult.headers
      }),
      ...!1
    });
    if (Bfe = gbClient, !isTrusted) return {
      client: gbClient,
      initialized: Promise.resolve()
    };
    let initPromise = gbClient.init({
      timeout: 5000
    }).then(async initResult => {
      if (Bfe !== gbClient) return;
      let didUpdate = await HSi(gbClient);
      if (Bfe !== gbClient) return;
      if (didUpdate) {
        for (let pendingKey of Zxt) gbn(pendingKey);
        Zxt.clear(), ISi(), set.emit();
      }
    }).catch(err => {});
    return Xxt = () => Bfe?.destroy(), Qxt = () => Bfe?.destroy(), process.on("beforeExit", Xxt), process.on("exit", Qxt), {
      client: gbClient,
      initialized: initPromise
    };
  }), initializeGrowthBook = Hn(async () => {
    let gbEntry = u$r();
    if (!gbEntry) return null;
    if (!d$r) {
      if (kd() || BKe() || kr()) {
        if (!_8().error) {
          if (resetGrowthBook(), gbEntry = u$r(), !gbEntry) return null;
        }
      }
    }
    return await gbEntry.initialized, setupPeriodicGrowthBookRefresh(), gbEntry.client;
  });
  lli(getFeatureValue_CACHED_MAY_BE_STALE);
  Bli(getFeatureValue_CACHED_MAY_BE_STALE);
});

export {h$r,vSi,onGrowthBookRefresh,tDt,hasGrowthBookEnvOverride,isFeatureFromExperiment,nDt,getAllGrowthBookFeatures,hasFreshGrowthBookFeatures,getNonDefaultFeatureKeys,getGrowthBookConfigOverrides,setGrowthBookConfigOverride,clearGrowthBookConfigOverrides,gbn,HSi,ISi,isGrowthBookEnabled,getApiBaseUrlHost,getUserAttributes,DSi,getFeatureValue_DEPRECATED,getFeatureValue_CACHED_MAY_BE_STALE,getFeatureValue_CACHED_WITH_REFRESH as K7,checkSecurityRestrictionGate,checkGate_CACHED_OR_BLOCKING,refreshGrowthBookAfterAuthChange,resetGrowthBook,Aad,getClientDataAtis,refreshGrowthBookFeatures,setupPeriodicGrowthBookRefresh,stopPeriodicGrowthBookRefresh,getDynamicConfig_BLOCKS_ON_INIT,getDynamicConfig_CACHED_MAY_BE_STALE,Bfe,a$r,Xxt,Qxt,d$r,YRe,fbn,R8,Zxt,l$r,eDt,set,wSi,c$r,u$r,initializeGrowthBook,ATIS_REQUEST_HEADER,gUe,oet,jn};
