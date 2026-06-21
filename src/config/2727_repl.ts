// @ts-nocheck
import {Yw,mq} from "../session/2725_iFi.ts";
import {getIsNonInteractiveSession,getSdkBetas,lt} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {wti,Rti,nE,SLr,KQ,jS} from "../api/2023_used.ts";
import {getCanonicalName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Tae,Jtt} from "../../vendor/m2725.ts";
import {ehe,rb} from "../permissions/5178_level.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {nN} from "../../vendor/m4410.ts";
/** Validates that a value is a finite number in [0, 1). */
function aFi(fraction: any): number | null {
  return typeof fraction === "number" && Number.isFinite(fraction) && fraction >= 0 && fraction < 1 ? fraction : null;
}

/** Validates and parses an object with repl/sdk fraction fields. */
function kwd(entry: any): {
  repl: number;
  sdk: number;
} | null {
  if (typeof entry !== "object" || entry === null) return null;
  let raw = entry,
    replFraction = aFi(raw.repl),
    sdkFraction = aFi(raw.sdk);
  return replFraction === null || sdkFraction === null ? null : {
    repl: replFraction,
    sdk: sdkFraction
  };
}

/** Parses the arm-table feature flag value: maps window sizes to {repl, sdk} fractions. */
function uFi(tableObj: any): {
  entries: any[];
  defaultEntry: any | null;
} | null {
  if (typeof tableObj !== "object" || tableObj === null || Array.isArray(tableObj)) return null;
  let entries = [],
    defaultEntry = null;
  for (let [windowKey, entryVal] of Object.entries(tableObj)) {
    let parsed = kwd(entryVal);
    if (parsed === null) return null;
    if (windowKey === "default") {
      defaultEntry = parsed;
      continue;
    }
    let windowSize = Number(windowKey);
    if (!Number.isSafeInteger(windowSize) || windowSize <= 0) return null;
    entries.push({
      windowSize: windowSize,
      ...parsed
    });
  }
  if (entries.length === 0 && defaultEntry === null) return null;
  return {
    entries: entries,
    defaultEntry: defaultEntry
  };
}

/** Finds the best matching entry for a given window size (exact match or default). */
function dFi(table: any, windowSize: number): {
  kind: string;
  entry: any;
} | null {
  let exactMatch = table.entries.find((entry: any) => entry.windowSize === windowSize);
  if (exactMatch !== void 0) return {
    kind: "exact",
    entry: exactMatch
  };
  return table.defaultEntry === null ? null : {
    kind: "default",
    entry: table.defaultEntry
  };
}

/** Computes the compact threshold: contextWindow minus 13000, optionally clamped by a test override pct. */
function Swn(contextWindow: number, compactConfig: any): number {
  let compactThreshold = contextWindow - 13000,
    testPctOverride = compactConfig.testPctOverride;
  if (testPctOverride !== void 0 && !isNaN(testPctOverride) && testPctOverride > 0 && testPctOverride <= 100) return Math.min(Math.floor(contextWindow * (testPctOverride / 100)), compactThreshold);
  return compactThreshold;
}

/** Computes the precompute arm threshold, buffered by precomputeBufferFraction and capped by compact threshold. */
function A8r(contextWindow: number, compactConfig: any): number {
  return Math.min(contextWindow - Math.round(contextWindow * compactConfig.precomputeBufferFraction), Swn(contextWindow, compactConfig));
}

/** Returns the context pressure level (ok/warn/compact/blocked) and percent remaining. */
function pFi(usedTokens: number, contextWindow: number, compactConfig: any, r: number = contextWindow): {
  level: string;
  pctLeft?: number;
} {
  let compactThreshold = Swn(contextWindow, compactConfig),
    effectiveWindow = compactConfig.enabled ? compactThreshold : contextWindow,
    warnThreshold = effectiveWindow - 20000,
    testBlockingOverride = compactConfig.testBlockingOverride,
    blockingLimit = testBlockingOverride !== void 0 && !isNaN(testBlockingOverride) && testBlockingOverride > 0 ? testBlockingOverride : r - 3000,
    pctLeft = Math.max(0, Math.round((effectiveWindow - usedTokens) / effectiveWindow * 100));
  if (usedTokens >= blockingLimit) return {
    level: "blocked",
    pctLeft: pctLeft
  };
  if (compactConfig.enabled && usedTokens >= compactThreshold) return {
    level: "compact",
    pctLeft: pctLeft
  };
  if (usedTokens >= warnThreshold) return {
    level: "warn",
    pctLeft: pctLeft
  };
  return {
    level: "ok"
  };
}
var lFi = 13000,
  cFi = 3000,
  f8r = 0.2;
var h8r = () => {};

/** Parses a context-window size string ("auto", "Xm", "Xk", or raw number). */
function y8r(rawValue: string): number | undefined {
  let normalized = rawValue.trim().toLowerCase();
  if (normalized === "auto") return "auto";
  let parsedSize: number;
  if (normalized.endsWith("m")) parsedSize = parseFloat(normalized) * 1e6;else if (normalized.endsWith("k")) parsedSize = parseFloat(normalized) * 1000;else {
    let intVal = parseInt(normalized, 10);
    parsedSize = intVal >= 100 && intVal <= 1000 ? intVal * 1000 : intVal;
  }
  if (!Number.isFinite(parsedSize) || parsedSize < bwn || parsedSize > _8r) return;
  return Math.round(parsedSize);
}

/** Returns an experiment-driven window size override for opus-4-8 in interactive sessions. */
function T8r(canonicalModelName: string): number | undefined {
  if (!Yw()) return;
  if (getIsNonInteractiveSession()) return;
  if (canonicalModelName !== "claude-opus-4-8") return;
  let featureValue = getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_redwood2", "");
  if (!featureValue) return;
  let parsedWindow = y8r(featureValue);
  return typeof parsedWindow === "number" ? parsedWindow : void 0;
}

/** Returns a model-specific window override from client data (settings or runtime injection). */
function Iwd(canonicalModelName: string): number | null {
  if (!Yw()) return null;
  let validateWindow = (val: any) => typeof val === "number" && Number.isInteger(val) && val >= bwn && val <= _8r ? val : null,
    rowan = wti()?.rowan_thicket;
  if (typeof rowan === "object" && rowan !== null && !Array.isArray(rowan)) {
    let windowVal = validateWindow(rowan[canonicalModelName]);
    if (windowVal !== null) return windowVal;
  }
  return validateWindow(Rti()?.[canonicalModelName]);
}

/** Resolves the effective context window for a model, with source tagging (env/settings/clientdata/experiment/model-default/auto). */
function J$(modelId: string, settingsWindow: number | undefined): {
  window: number;
  configured: number;
  source: string;
} {
  let canonicalName = getCanonicalName(modelId),
    sdkBetas = getSdkBetas(),
    maxWindow = nE(modelId, sdkBetas);
  if (process.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW) {
    let envParsed = Tae("CLAUDE_CODE_AUTO_COMPACT_WINDOW", process.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, bwn, _8r);
    if (envParsed.status !== "invalid") {
      let envWindow = Math.max(bwn, envParsed.effective);
      return {
        window: Math.min(maxWindow, envWindow),
        configured: envWindow,
        source: "env"
      };
    }
  }
  if (settingsWindow !== void 0) return {
    window: Math.min(maxWindow, settingsWindow),
    configured: settingsWindow,
    source: "settings"
  };
  let clientDataWindow = Iwd(canonicalName);
  if (clientDataWindow !== null) return {
    window: Math.min(maxWindow, clientDataWindow),
    configured: clientDataWindow,
    source: "clientdata"
  };
  let experimentWindow = T8r(canonicalName);
  if (experimentWindow !== void 0) return {
    window: Math.min(maxWindow, experimentWindow),
    configured: experimentWindow,
    source: "experiment"
  };
  if (maxWindow < 1e6 && (Hwd.has(canonicalName) || SLr(modelId, sdkBetas))) return {
    window: Math.min(maxWindow, KQ),
    configured: KQ,
    source: "model-default"
  };
  let configuredWindow = (Yw() && Object.hasOwn(mFi, canonicalName) ? mFi[canonicalName] : void 0) ?? maxWindow;
  return {
    window: Math.min(maxWindow, configuredWindow),
    configured: configuredWindow,
    source: "auto"
  };
}

/** Returns true if the window was set via an explicit source (not auto). */
function VRe(modelId: string, settingsWindow: number | undefined): boolean {
  let {
    source: source
  } = J$(modelId, settingsWindow);
  return source === "env" || source === "settings" || source === "clientdata" || source === "model-default";
}

/** Returns just the source string for the window resolution. */
function Ewn(modelId: string, settingsWindow: number | undefined): string {
  return J$(modelId, settingsWindow).source;
}

/** Returns available tokens: effective window minus system prompt size (capped at AFi). */
function cee(modelId: string, settingsWindow: number | undefined): number {
  let systemPromptSize = Math.min(ehe(modelId), AFi),
    resolvedSettings = Yw() ? settingsWindow : void 0,
    {
      window: effectiveWindow
    } = J$(modelId, resolvedSettings);
  return effectiveWindow - systemPromptSize;
}

/** Returns max possible available tokens for the model (no settings override). */
function Dwd(modelId: string): number {
  let systemPromptSize = Math.min(ehe(modelId), AFi);
  return nE(modelId, getSdkBetas()) - systemPromptSize;
}

/** One-shot logger for malformed arm table payloads (fires only once per process). */
function Owd(payloadType: string): void {
  if (fFi) return;
  fFi = !0, logEvent("tengu_precompute_arm_table_malformed", {
    payloadType: payloadType
  });
}

/** Reads the scalar precompute buffer fraction from the feature flag, falling back to default. */
function g8r(): number {
  let featureVal = getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_rokovoko", f8r);
  return typeof featureVal === "number" && Number.isFinite(featureVal) && featureVal >= 0 && featureVal < 1 ? featureVal : f8r;
}

/** Resolves the precompute buffer fraction via arm table lookup or scalar fallback. */
function S8r(modelId: string, settingsWindow: number | undefined, sessionKind: string): {
  fraction: number;
  source: string;
  matchedWindowKey?: number;
} {
  let tableRaw = getFeatureValue_CACHED_MAY_BE_STALE(Pwd, null);
  if (tableRaw === null || tableRaw === void 0) return {
    fraction: g8r(),
    source: "scalar"
  };
  let parsedTable = uFi(tableRaw);
  if (parsedTable === null) return Owd(fromEnum(Array.isArray(tableRaw) ? "array" : typeof tableRaw)), {
    fraction: g8r(),
    source: "malformed"
  };
  let resolvedSettings = Yw() ? settingsWindow : void 0,
    {
      window: effectiveWindow
    } = J$(modelId, resolvedSettings),
    tableEntry = dFi(parsedTable, effectiveWindow);
  if (tableEntry === null) return {
    fraction: g8r(),
    source: "table_no_match"
  };
  let kind = sessionKind === "sdk" ? "sdk" : "repl",
    fractionVal = tableEntry.entry[kind];
  return tableEntry.kind === "exact" ? {
    fraction: fractionVal,
    source: "table_exact",
    matchedWindowKey: tableEntry.entry.windowSize
  } : {
    fraction: fractionVal,
    source: "table_default"
  };
}

/** Returns just the precompute buffer fraction. */
function Lwd(modelId: string, settingsWindow: number | undefined, sessionKind: string): number {
  return S8r(modelId, settingsWindow, sessionKind).fraction;
}

/** Builds the compact config object for a model+session. */
function b8r(modelId: string, settingsWindow: number | undefined, sessionKind?: string): any {
  let pctOverrideEnv = process.env.CLAUDE_AUTOCOMPACT_PCT_OVERRIDE,
    blockingLimitEnv = process.env.CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE;
  return {
    enabled: Yw(),
    precomputeBufferFraction: Lwd(modelId, settingsWindow, sessionKind),
    testPctOverride: pctOverrideEnv ? parseFloat(pctOverrideEnv) : void 0,
    testBlockingOverride: blockingLimitEnv ? parseInt(blockingLimitEnv, 10) : void 0
  };
}

/** Returns the compact trigger threshold (tokens remaining). */
function lOt(modelId: string, settingsWindow: number | undefined): number {
  return Swn(cee(modelId, settingsWindow), b8r(modelId, settingsWindow));
}

/** Returns the context pressure level for a given token count and model. */
function KRe(usedTokens: number, modelId: string, settingsWindow: number | undefined): {
  level: string;
  pctLeft?: number;
} {
  let compactConfig = b8r(modelId, settingsWindow),
    resolvedSettings = compactConfig.enabled ? settingsWindow : void 0;
  return pFi(usedTokens, cee(modelId, resolvedSettings), compactConfig, Dwd(modelId));
}

/** Returns true if usedTokens has reached the precompute arm threshold. */
function hFi(usedTokens: number, modelId: string, settingsWindow: number | undefined, sessionKind: string): boolean {
  let compactConfig = b8r(modelId, settingsWindow, sessionKind),
    resolvedSettings = compactConfig.enabled ? settingsWindow : void 0,
    availTokens = cee(modelId, resolvedSettings);
  if (!mq() && !VRe(modelId, settingsWindow)) return usedTokens >= A8r(availTokens, compactConfig);
  let {
    window: effectiveWindow
  } = J$(modelId, resolvedSettings);
  if (effectiveWindow < KQ) return !1;
  return usedTokens >= A8r(availTokens, compactConfig);
}
var AFi = 20000,
  bwn = 1e5,
  _8r = 1e6,
  mFi,
  Hwd,
  Pwd = "tengu_amber_moleskin",
  fFi = !1;
var E8r = b(() => {
  lt();
  jS();
  Jtt();
  Mo();
  zn();
  Ct();
  rb();
  nN();
  h8r();
  mFi = {}, Hwd = new Set(["claude-sonnet-4-6", "claude-opus-4-6"]);
});
export {aFi,kwd,uFi,dFi,Swn,A8r,pFi,lFi,cFi,f8r,h8r,y8r,T8r,Iwd,J$,VRe,Ewn,cee,Dwd,Owd,g8r,S8r,Lwd,b8r,lOt,KRe,hFi,AFi,bwn,_8r,mFi,Hwd,Pwd,fFi,E8r};
