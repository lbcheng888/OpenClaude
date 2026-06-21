// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {De,Rn} from "../session/0615_length.ts";
import {getGlobalConfig,saveGlobalConfig,Qn,checkHasTrustDialogAccepted} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logGrowthBookExperimentTo1P,is1PEventLoggingEnabled,I1} from "../session/2197_shutdown1PEventLogging.ts";
import {je} from "../../vendor/m577.ts";
import {_ni,JQ} from "../../vendor/m2034.ts";
import {getInitialSettings,yr} from "../config/0740_updateSettingsForSource.ts";
import {k2,xH} from "../config/0580_xH.ts";
import {_o,bt} from "../../vendor/m195.ts";
import {_Go} from "../../vendor/m441.ts";
import {B3} from "../../vendor/m453.ts";
import {lt,getSessionTrustAccepted,getIsNonInteractiveSession} from "../session/0131_sent.ts";
import {qe} from "../config/0234_setHasFormattedOutput.ts";
import {Lr} from "../../vendor/m578.ts";
import {fk,getAuthHeaders} from "./2032_withOAuth401Retry.ts";
import {r5,mni} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {kg} from "../../vendor/m129.ts";
import {Xt} from "../config/0228_encoding.ts";
import {jkt,Wni} from "./2045_type.ts";
import {ca} from "../../vendor/m5.ts";
import {wn} from "../../vendor/m45.ts";
import {kGo} from "../../vendor/m454.ts";
import {PZt} from "../../vendor/m440.ts";
/** Module exports namespace object */
var $Nr = {};
isFullscreenWithTTY($Nr, {
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
  getFeatureValue_CACHED_WITH_REFRESH: () => bK,
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
function Hfi(callback: any): void {
  try {
    Promise.resolve(callback()).catch(err => {
      De(err);
    });
  } catch (err) {
    De(err);
  }
}

/** Subscribe to GrowthBook refresh events; fires callback immediately if features already loaded */
function onGrowthBookRefresh(callback: any): any {
  let isActive = !0,
    unsubscribe = sQe.subscribe(() => Hfi(callback));
  if (u5.size > 0) queueMicrotask(() => {
    if (isActive && u5.size > 0) Hfi(callback);
  });
  return () => {
    isActive = !1, unsubscribe();
  };
}

/** Returns the env override map, marking it as initialized on first access */
function xHt(): any {
  if (!LNr) LNr = !0;
  return Ifi;
}

/** Check if a feature key has an env-level override */
function hasGrowthBookEnvOverride(featureKey: any): any {
  let overrides = xHt();
  return overrides !== null && featureKey in overrides;
}

/** Check whether a feature comes from an experiment (local pve map or cached config) */
function isFeatureFromExperiment(featureKey: any): any {
  if (pve.has(featureKey)) return !0;
  if (!isGrowthBookEnabled()) return !1;
  return (getGlobalConfig().cachedExperimentFeatures ?? []).includes(featureKey);
}

/** No-op placeholder for config overrides getter */
function kHt(): any {
  return;
}

/** Return all features from in-memory map or fall back to cached config */
function getAllGrowthBookFeatures(): any {
  if (u5.size > 0) return Object.fromEntries(u5);
  return getGlobalConfig().cachedGrowthBookFeatures ?? {};
}

/** True when in-memory feature map has been populated from a fresh fetch */
function hasFreshGrowthBookFeatures(): any {
  return u5.size > 0;
}

/** Return the set of non-default feature keys */
function getNonDefaultFeatureKeys(): any {
  return O_n;
}

/** Return config overrides map (or empty object) */
function getGrowthBookConfigOverrides(): any {
  return kHt() ?? {};
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
function M_n(featureKey: any): void {
  if (ONr.has(featureKey)) return;
  let experimentInfo = pve.get(featureKey);
  if (experimentInfo) ONr.add(featureKey), logGrowthBookExperimentTo1P({
    experimentId: experimentInfo.experimentId,
    variationId: experimentInfo.variationId,
    userAttributes: getUserAttributes(),
    experimentMetadata: {
      feature_id: featureKey
    }
  });
}

/** Process remote eval payload: populate in-memory feature/experiment maps */
async function Pfi(growthBookInstance: any): Promise<any> {
  let payload = growthBookInstance.getPayload();
  if (!payload?.features || Object.keys(payload.features).length === 0) return !1;
  pve.clear(), O_n.clear();
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
      if (expDef?.key && expResult.variationId !== void 0) pve.set(featureKey, {
        experimentId: expDef.key,
        variationId: expResult.variationId
      });
    }
    if (featureObj.source !== void 0 && featureObj.source !== "defaultValue" && featureObj.source !== "unknownFeature") O_n.add(featureKey);
  }
  if (skipped.length > 0) {
    if (!PNr) PNr = !0, De(Error(`processRemoteEvalPayload: skipped non-object features [${skipped.join(", ")}]`));
    if (Object.keys(featuresOut).length === 0) return !1;
  }
  await growthBookInstance.setPayload({
    ...payload,
    features: featuresOut
  }), u5.clear();
  for (let [featureKey, featureObj] of Object.entries(featuresOut)) {
    let resolvedValue = "value" in featureObj ? featureObj.value : featureObj.defaultValue;
    if (resolvedValue !== void 0) u5.set(featureKey, resolvedValue);
  }
  return !0;
}

/** Persist fresh GrowthBook features and experiment keys to global config cache */
function Ofi(): void {
  let featuresSnapshot = Object.fromEntries(u5),
    experimentKeys = Array.from(pve.keys()).sort();
  saveGlobalConfig(cfg => ({
    ...cfg,
    cachedGrowthBookFeatures: featuresSnapshot,
    cachedExperimentFeatures: experimentKeys,
    cachedGrowthBookFeaturesAt: Date.now()
  }));
}

/** GrowthBook is enabled only when not disabled by env and 1P logging is active */
function isGrowthBookEnabled(): any {
  return !je.DISABLE_GROWTHBOOK && is1PEventLoggingEnabled();
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
  let identityInfo = _ni(),
    email = identityInfo.email,
    autoUpdatesChannel = getInitialSettings()?.autoUpdatesChannel,
    releaseChannelOverride = void 0,
    apiHost = getApiBaseUrlHost(),
    entrypoint = k2(),
    accountOverride = void 0,
    accountUuid = identityInfo.accountUuid || process.env.CLAUDE_CODE_ACCOUNT_UUID || accountOverride?.accountUuid,
    organizationUuid = identityInfo.organizationUuid || process.env.CLAUDE_CODE_ORGANIZATION_UUID || accountOverride?.organizationUuid;
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
    })
  };
}

/** Fetch feature value: check env override, config override, then async GrowthBook init */
async function Mfi(featureKey: any, defaultValue: any, logExposure: any): Promise<any> {
  let envOverrides = xHt();
  if (envOverrides && featureKey in envOverrides) return envOverrides[featureKey];
  let configOverrides = kHt();
  if (configOverrides && featureKey in configOverrides) return configOverrides[featureKey];
  if (!isGrowthBookEnabled()) return defaultValue;
  let gbInstance = await initializeGrowthBook();
  if (!gbInstance) return defaultValue;
  let resolvedValue: any;
  if (u5.has(featureKey)) resolvedValue = u5.get(featureKey);else resolvedValue = gbInstance.getFeatureValue(featureKey, defaultValue);
  if (logExposure) M_n(featureKey);
  return resolvedValue;
}

/** Deprecated async feature value getter — always logs experiment exposure */
async function getFeatureValue_DEPRECATED(featureKey: any, defaultValue: any): Promise<any> {
  return Mfi(featureKey, defaultValue, !0);
}

/** Synchronous feature value getter; may use stale cached data */
function getFeatureValue_CACHED_MAY_BE_STALE(featureKey: any, defaultValue: any): any {
  let envOverrides = xHt();
  if (envOverrides && featureKey in envOverrides) return envOverrides[featureKey];
  let configOverrides = kHt();
  if (configOverrides && featureKey in configOverrides) return configOverrides[featureKey];
  if (!isGrowthBookEnabled()) return defaultValue;
  if (pve.has(featureKey)) M_n(featureKey);else wHt.add(featureKey);
  if (u5.has(featureKey)) return u5.get(featureKey);
  try {
    let cachedVal = getGlobalConfig().cachedGrowthBookFeatures?.[featureKey];
    return cachedVal !== void 0 ? cachedVal : defaultValue;
  } catch {
    return defaultValue;
  }
}

/** Public alias: getFeatureValue_CACHED_WITH_REFRESH */
function bK(featureKey: any, defaultValue: any, n: any): any {
  return getFeatureValue_CACHED_MAY_BE_STALE(featureKey, defaultValue);
}

/** Check security restriction gate; blocks on pending init if needed */
async function checkSecurityRestrictionGate(gateKey: any): Promise<any> {
  let envOverrides = xHt();
  if (envOverrides && gateKey in envOverrides) return Boolean(envOverrides[gateKey]);
  let configOverrides = kHt();
  if (configOverrides && gateKey in configOverrides) return Boolean(configOverrides[gateKey]);
  if (!isGrowthBookEnabled()) return !1;
  if (RHt) await RHt;
  let cachedVal = getGlobalConfig().cachedGrowthBookFeatures?.[gateKey];
  if (cachedVal !== void 0) return Boolean(cachedVal);
  return !1;
}

/** Check gate using cache; falls back to blocking async init if not cached */
async function checkGate_CACHED_OR_BLOCKING(gateKey: any): Promise<any> {
  let envOverrides = xHt();
  if (envOverrides && gateKey in envOverrides) return Boolean(envOverrides[gateKey]);
  let configOverrides = kHt();
  if (configOverrides && gateKey in configOverrides) return Boolean(configOverrides[gateKey]);
  if (!isGrowthBookEnabled()) return !1;
  if (getGlobalConfig().cachedGrowthBookFeatures?.[gateKey] === !0) {
    if (pve.has(gateKey)) M_n(gateKey);else wHt.add(gateKey);
    return !0;
  }
  return Mfi(gateKey, !1, !0);
}

/** Reinitialize GrowthBook after authentication changes */
function refreshGrowthBookAfterAuthChange(): void {
  if (!isGrowthBookEnabled()) return;
  try {
    resetGrowthBook(), sQe.emit(), RHt = initializeGrowthBook().catch(err => (De(_o(err)), null)).finally(() => {
      RHt = null;
    });
  } catch (err) {
    De(_o(err));
  }
}

/** Reset all GrowthBook state: clear timers, maps, caches, and memoized fns */
function resetGrowthBook(): void {
  if (stopPeriodicGrowthBookRefresh(), CHt) process.off("beforeExit", CHt), CHt = null;
  if (vHt) process.off("exit", vHt), vHt = null;
  Hfe?.destroy(), Hfe = null, NNr = !1, PNr = !1, RHt = null, pve.clear(), O_n.clear(), wHt.clear(), ONr.clear(), u5.clear(), MNr.cache?.clear?.(), initializeGrowthBook.cache?.clear?.(), Ifi = null, LNr = !1;
}

/** Periodic refresh interval in ms (6 hours) */
function nXu(): number {
  return 21600000;
}

/** Get the cached ATIS string from global config if present */
function getClientDataAtis(): any {
  let atisVal = getGlobalConfig().clientDataCache?.atis;
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
    }), gbInstance !== Hfe) return;
    let didUpdate = await Pfi(gbInstance);
    if (gbInstance !== Hfe) return;
    if (didUpdate) Ofi(), sQe.emit();
  } catch (err) {
    De(_o(err));
  }
}

/** Start periodic refresh interval and register beforeExit cleanup */
function setupPeriodicGrowthBookRefresh(): void {
  if (!isGrowthBookEnabled()) return;
  if (yFe) clearInterval(yFe);
  if (yFe = setInterval(() => {
    refreshGrowthBookFeatures();
  }, nXu()), yFe.unref?.(), !oQe) oQe = () => {
    stopPeriodicGrowthBookRefresh();
  }, process.once("beforeExit", oQe);
}

/** Stop periodic refresh interval and remove beforeExit listener */
function stopPeriodicGrowthBookRefresh(): void {
  if (yFe) clearInterval(yFe), yFe = null;
  if (oQe) process.removeListener("beforeExit", oQe), oQe = null;
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
var Hfe = null,
  PNr = !1,
  CHt = null,
  vHt = null,
  NNr = !1,
  pve,
  O_n,
  u5,
  wHt,
  ONr,
  RHt = null,
  sQe,
  Ifi = null,
  LNr = !1,
  MNr,
  initializeGrowthBook,
  ATIS_REQUEST_HEADER = "x-cc-atis",
  yFe = null,
  oQe = null;

/** Module initializer: sets up GrowthBook singleton factory and memoized init */
var zn = b(() => {
  _Go();
  B3();
  lt();
  Qn();
  qe();
  xH();
  Lr();
  bt();
  fk();
  Rn();
  r5();
  yr();
  kg();
  Xt();
  JQ();
  jkt();
  I1();
  pve = new Map(), O_n = new Set(), u5 = new Map(), wHt = new Set(), ONr = new Set(), sQe = ca();
  MNr = wn(() => {
    if (!isGrowthBookEnabled()) return null;
    let userAttrs = getUserAttributes(),
      clientKey = kGo(),
      apiHost = "https://api.anthropic.com/",
      authResult = checkHasTrustDialogAccepted() || getSessionTrustAccepted() || getIsNonInteractiveSession() ? getAuthHeaders() : {
        headers: {},
        error: "trust not established"
      },
      isTrusted = !authResult.error;
    NNr = isTrusted;
    let gbClient = new PZt({
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
    if (Hfe = gbClient, !isTrusted) return {
      client: gbClient,
      initialized: Promise.resolve()
    };
    let initPromise = gbClient.init({
      timeout: 5000
    }).then(async initResult => {
      if (Hfe !== gbClient) return;
      let didUpdate = await Pfi(gbClient);
      if (Hfe !== gbClient) return;
      if (didUpdate) {
        for (let pendingKey of wHt) M_n(pendingKey);
        wHt.clear(), Ofi(), sQe.emit();
      }
    }).catch(err => {});
    return CHt = () => Hfe?.destroy(), vHt = () => Hfe?.destroy(), process.on("beforeExit", CHt), process.on("exit", vHt), {
      client: gbClient,
      initialized: initPromise
    };
  }), initializeGrowthBook = wn(async () => {
    let gbEntry = MNr();
    if (!gbEntry) return null;
    if (!NNr) {
      if (checkHasTrustDialogAccepted() || getSessionTrustAccepted() || getIsNonInteractiveSession()) {
        if (!getAuthHeaders().error) {
          if (resetGrowthBook(), gbEntry = MNr(), !gbEntry) return null;
        }
      }
    }
    return await gbEntry.initialized, setupPeriodicGrowthBookRefresh(), gbEntry.client;
  });
  mni(getFeatureValue_CACHED_MAY_BE_STALE);
  Wni(getFeatureValue_CACHED_MAY_BE_STALE);
});
export {$Nr,Hfi,onGrowthBookRefresh,xHt,hasGrowthBookEnvOverride,isFeatureFromExperiment,kHt,getAllGrowthBookFeatures,hasFreshGrowthBookFeatures,getNonDefaultFeatureKeys,getGrowthBookConfigOverrides,setGrowthBookConfigOverride,clearGrowthBookConfigOverrides,M_n,Pfi,Ofi,isGrowthBookEnabled,getApiBaseUrlHost,getUserAttributes,Mfi,getFeatureValue_DEPRECATED,getFeatureValue_CACHED_MAY_BE_STALE,bK,checkSecurityRestrictionGate,checkGate_CACHED_OR_BLOCKING,refreshGrowthBookAfterAuthChange,resetGrowthBook,nXu,getClientDataAtis,refreshGrowthBookFeatures,setupPeriodicGrowthBookRefresh,stopPeriodicGrowthBookRefresh,getDynamicConfig_BLOCKS_ON_INIT,getDynamicConfig_CACHED_MAY_BE_STALE,Hfe,PNr,CHt,vHt,NNr,pve,O_n,u5,wHt,ONr,RHt,sQe,Ifi,LNr,MNr,initializeGrowthBook,ATIS_REQUEST_HEADER,yFe,oQe,zn};
