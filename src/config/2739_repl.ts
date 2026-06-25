// @ts-nocheck
import {ev,D4} from "../session/2737_V4i.ts";
import {getIsNonInteractiveSession as kr,getSdkBetas as BT,lt} from "../session/0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getSubscriptionType as vi,lo} from "./2036_withOAuthRefreshLock.ts";
import {Ne} from "../../vendor/m583.ts";
import {Eai,Cai,iE,XFr,WQ,GS} from "../api/2028_used.ts";
import {getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {_ae,Qrt} from "../../vendor/m2737.ts";
import {pge,rb} from "../permissions/5211_level.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {f1} from "../../vendor/m4432.ts";
/** Validates that a value is a finite number in [0, 1). */
function K4i(fraction: any): number | null {
  return typeof fraction === "number" && Number.isFinite(fraction) && fraction >= 0 && fraction < 1 ? fraction : null;
}
/** Validates and parses an object with repl/sdk fraction fields. */
function aMd(entry: any): {
  repl: number;
  sdk: number;
} | null {
  if (typeof entry !== "object" || entry === null) return null;
  let raw = entry,
    replFraction = K4i(raw.repl),
    sdkFraction = K4i(raw.sdk);
  return replFraction === null || sdkFraction === null ? null : {
    repl: replFraction,
    sdk: sdkFraction
  };
}
/** Parses the arm-table feature flag value: maps window sizes to {repl, sdk} fractions. */
function Y4i(tableObj: any): {
  entries: any[];
  defaultEntry: any | null;
} | null {
  if (typeof tableObj !== "object" || tableObj === null || Array.isArray(tableObj)) return null;
  let entries: any[] = [],
    defaultEntry: any = null;
  for (let [windowKey, entryVal] of Object.entries(tableObj)) {
    let parsed = aMd(entryVal);
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
function J4i(table: any, windowSize: number): {
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
function uHn(contextWindow: number, compactConfig: any): number {
  let compactThreshold = contextWindow - 13000,
    testPctOverride = compactConfig.testPctOverride;
  if (testPctOverride !== void 0 && !isNaN(testPctOverride) && testPctOverride > 0 && testPctOverride <= 100) return Math.min(Math.floor(contextWindow * (testPctOverride / 100)), compactThreshold);
  return compactThreshold;
}
/** Computes the precompute arm threshold, buffered by precomputeBufferFraction and capped by compact threshold. */
function VKr(contextWindow: number, compactConfig: any): number {
  return Math.min(contextWindow - Math.round(contextWindow * compactConfig.precomputeBufferFraction), uHn(contextWindow, compactConfig));
}
/** Returns the context pressure level (ok/warn/compact/blocked) and percent remaining. */
function X4i(usedTokens: number, contextWindow: number, compactConfig: any, blockingBaseWindow: number = contextWindow): {
  level: string;
  pctLeft?: number;
} {
  let compactThreshold = uHn(contextWindow, compactConfig),
    effectiveWindow = compactConfig.enabled ? compactThreshold : contextWindow,
    warnThreshold = effectiveWindow - 20000,
    testBlockingOverride = compactConfig.testBlockingOverride,
    blockingLimit = testBlockingOverride !== void 0 && !isNaN(testBlockingOverride) && testBlockingOverride > 0 ? testBlockingOverride : blockingBaseWindow - 3000,
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
var z4i = 13000,
  j4i = 3000,
  GKr = 0.2;
var KKr = () => {};
/** Parses a context-window size string ("auto", "Xm", "Xk", or raw number). */
function YKr(rawValue: string): number | undefined {
  let normalized = rawValue.trim().toLowerCase();
  if (normalized === "auto") return "auto";
  let parsedSize: number;
  if (normalized.endsWith("m")) parsedSize = parseFloat(normalized) * 1e6;else if (normalized.endsWith("k")) parsedSize = parseFloat(normalized) * 1000;else {
    let intVal = parseInt(normalized, 10);
    parsedSize = intVal >= 100 && intVal <= 1000 ? intVal * 1000 : intVal;
  }
  if (!Number.isFinite(parsedSize) || parsedSize < dHn || parsedSize > jKr) return;
  return Math.round(parsedSize);
}
/** Returns an experiment-driven window size override for opus-4-8 in interactive sessions. */
function JKr(canonicalModelName: string): number | undefined {
  if (!ev()) return;
  if (kr()) return;
  if (canonicalModelName !== "claude-opus-4-8") return;
  let featureValue = it("tengu_amber_redwood2", "");
  if (!featureValue) return;
  let parsedWindow = YKr(featureValue);
  return typeof parsedWindow === "number" ? parsedWindow : void 0;
}
/** Picks the value for the current surface key, falling back to the default property. */
function Z4i(map: any, surfaceKey: string | undefined): any {
  if (surfaceKey && Object.hasOwn(map, surfaceKey)) return map[surfaceKey];
  return map.default;
}
/** Resolves a window override entry that may be a scalar or a surface-keyed object. */
function nqi(override: any): number | undefined {
  if (typeof override === "number") return override;
  if (typeof override !== "object" || override === null || Array.isArray(override)) return;
  let {
      surfaces: surfaces,
      ...byPlatform
    } = override,
    platformKey = vi(),
    entrypoint = Ne.CLAUDE_CODE_ENTRYPOINT,
    surfaceMap = entrypoint && surfaces && Object.hasOwn(surfaces, entrypoint) ? surfaces[entrypoint] : void 0;
  if (surfaceMap) {
    let surfaceValue = Z4i(surfaceMap, platformKey);
    if (surfaceValue !== void 0) return surfaceValue;
  }
  return Z4i(byPlatform, platformKey);
}
/** Looks up an experiment-driven window override for a model from the static override map. */
function lMd(canonicalModelName: string): number | undefined {
  if (!ev()) return;
  if (!Object.hasOwn(Q4i, canonicalModelName)) return;
  return nqi(Q4i[canonicalModelName]);
}
/** Returns a model-specific window override from client data (settings or runtime injection). */
function uMd(canonicalModelName: string): {
  window: number | null;
  replacesDefault: boolean;
} {
  if (!ev()) return {
    window: null,
    replacesDefault: !1
  };
  let validateWindow = (val: any) => typeof val === "number" && Number.isInteger(val) && val >= dHn && val <= jKr ? val : null,
    readSource = (source: any): {
      window: number | null;
      present: boolean;
    } => {
      if (typeof source !== "object" || source === null || Array.isArray(source)) return {
        window: null,
        present: !1
      };
      if (!Object.hasOwn(source, canonicalModelName)) return {
        window: null,
        present: !1
      };
      return {
        window: validateWindow(nqi(source[canonicalModelName])),
        present: !0
      };
    },
    fromRowan = readSource(Eai()?.rowan_thicket),
    fromRuntime = readSource(Cai());
  return {
    window: fromRowan.window ?? fromRuntime.window,
    replacesDefault: fromRuntime.present
  };
}
/** Resolves the effective context window for a model, with source tagging (env/settings/clientdata/experiment/model-default/auto). */
function T$(modelId: string, settingsWindow: number | undefined): {
  window: number;
  configured: number;
  source: string;
} {
  let canonicalName = So(modelId),
    sdkBetas = BT(),
    maxWindow = iE(modelId, sdkBetas);
  if (process.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW) {
    let envParsed = _ae("CLAUDE_CODE_AUTO_COMPACT_WINDOW", process.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, dHn, jKr);
    if (envParsed.status !== "invalid") {
      let envWindow = Math.max(dHn, envParsed.effective);
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
  let clientData = uMd(canonicalName);
  if (clientData.window !== null) return {
    window: Math.min(maxWindow, clientData.window),
    configured: clientData.window,
    source: "clientdata"
  };
  let experimentWindow = JKr(canonicalName);
  if (experimentWindow !== void 0) return {
    window: Math.min(maxWindow, experimentWindow),
    configured: experimentWindow,
    source: "experiment"
  };
  if (maxWindow < 1e6 && (cMd.has(canonicalName) || XFr(modelId, sdkBetas))) return {
    window: Math.min(maxWindow, WQ),
    configured: WQ,
    source: "model-default"
  };
  let staticOverride = clientData.replacesDefault ? void 0 : lMd(canonicalName);
  if (staticOverride !== void 0) return {
    window: Math.min(maxWindow, staticOverride),
    configured: staticOverride,
    source: "model-default"
  };
  return {
    window: maxWindow,
    configured: maxWindow,
    source: "auto"
  };
}
/** Returns true if the window was set via an explicit source (not auto/experiment). */
function Ike(modelId: string, settingsWindow: number | undefined): boolean {
  let {
    source: source
  } = T$(modelId, settingsWindow);
  return source === "env" || source === "settings" || source === "clientdata" || source === "model-default";
}
/** Returns just the source string for the window resolution. */
function pHn(modelId: string, settingsWindow: number | undefined): string {
  return T$(modelId, settingsWindow).source;
}
/** Returns available tokens: effective window minus system prompt size (capped at tqi). */
function aee(modelId: string, settingsWindow: number | undefined): number {
  let systemPromptSize = Math.min(pge(modelId), tqi),
    resolvedSettings = ev() ? settingsWindow : void 0,
    {
      window: effectiveWindow
    } = T$(modelId, resolvedSettings);
  return effectiveWindow - systemPromptSize;
}
/** Returns max possible available tokens for the model (no settings override). */
function dMd(modelId: string): number {
  let systemPromptSize = Math.min(pge(modelId), tqi);
  return iE(modelId, BT()) - systemPromptSize;
}
/** One-shot logger for malformed arm table payloads (fires only once per process). */
function mMd(payloadType: string): void {
  if (eqi) return;
  eqi = !0, W("tengu_precompute_arm_table_malformed", {
    payloadType: payloadType
  });
}
/** Reads the scalar precompute buffer fraction from the feature flag, falling back to default. */
function zKr(): number {
  let featureVal = it("tengu_amber_rokovoko", GKr);
  return typeof featureVal === "number" && Number.isFinite(featureVal) && featureVal >= 0 && featureVal < 1 ? featureVal : GKr;
}
/** Resolves the precompute buffer fraction via arm table lookup or scalar fallback. */
function XKr(modelId: string, settingsWindow: number | undefined, sessionKind: string): {
  fraction: number;
  source: string;
  matchedWindowKey?: number;
} {
  let tableRaw = it(pMd, null);
  if (tableRaw === null || tableRaw === void 0) return {
    fraction: zKr(),
    source: "scalar"
  };
  let parsedTable = Y4i(tableRaw);
  if (parsedTable === null) return mMd(Le(Array.isArray(tableRaw) ? "array" : typeof tableRaw)), {
    fraction: zKr(),
    source: "malformed"
  };
  let resolvedSettings = ev() ? settingsWindow : void 0,
    {
      window: effectiveWindow
    } = T$(modelId, resolvedSettings),
    tableEntry = J4i(parsedTable, effectiveWindow);
  if (tableEntry === null) return {
    fraction: zKr(),
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
function fMd(modelId: string, settingsWindow: number | undefined, sessionKind: string): number {
  return XKr(modelId, settingsWindow, sessionKind).fraction;
}
/** Builds the compact config object for a model+session. */
function QKr(modelId: string, settingsWindow: number | undefined, sessionKind?: string): any {
  let pctOverrideEnv = process.env.CLAUDE_AUTOCOMPACT_PCT_OVERRIDE,
    blockingLimitEnv = process.env.CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE;
  return {
    enabled: ev(),
    precomputeBufferFraction: fMd(modelId, settingsWindow, sessionKind),
    testPctOverride: pctOverrideEnv ? parseFloat(pctOverrideEnv) : void 0,
    testBlockingOverride: blockingLimitEnv ? parseInt(blockingLimitEnv, 10) : void 0
  };
}
/** Returns the compact trigger threshold (tokens remaining). */
function $Mt(modelId: string, settingsWindow: number | undefined): number {
  return uHn(aee(modelId, settingsWindow), QKr(modelId, settingsWindow));
}
/** Returns the context pressure level for a given token count and model. */
function xke(usedTokens: number, modelId: string, settingsWindow: number | undefined): {
  level: string;
  pctLeft?: number;
} {
  let compactConfig = QKr(modelId, settingsWindow),
    resolvedSettings = compactConfig.enabled ? settingsWindow : void 0;
  return X4i(usedTokens, aee(modelId, resolvedSettings), compactConfig, dMd(modelId));
}
/** Returns true if usedTokens has reached the precompute arm threshold. */
function rqi(usedTokens: number, modelId: string, settingsWindow: number | undefined, sessionKind: string): boolean {
  let compactConfig = QKr(modelId, settingsWindow, sessionKind),
    resolvedSettings = compactConfig.enabled ? settingsWindow : void 0,
    availTokens = aee(modelId, resolvedSettings);
  if (!D4() && !Ike(modelId, settingsWindow)) return usedTokens >= VKr(availTokens, compactConfig);
  let {
    window: effectiveWindow
  } = T$(modelId, resolvedSettings);
  if (effectiveWindow < WQ) return !1;
  return usedTokens >= VKr(availTokens, compactConfig);
}
var tqi = 20000,
  dHn = 1e5,
  jKr = 1e6,
  Q4i: any,
  cMd: Set<string>,
  pMd = "tengu_amber_moleskin",
  eqi = !1;
var ZKr = b(() => {
  lt();
  lo();
  GS();
  Ir();
  Qrt();
  Ro();
  jn();
  kt();
  rb();
  f1();
  KKr();
  Q4i = {};
  cMd = new Set(["claude-sonnet-4-6", "claude-opus-4-6"]);
});
export {K4i,aMd,Y4i,J4i,uHn,VKr,X4i,z4i,j4i,GKr,KKr,YKr,JKr,Z4i,nqi,lMd,uMd,T$,Ike,pHn,aee,dMd,mMd,zKr,XKr,fMd,QKr,$Mt,xke,rqi,tqi,dHn,jKr,Q4i,cMd,pMd,eqi,ZKr};
