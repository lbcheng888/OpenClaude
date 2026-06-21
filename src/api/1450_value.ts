// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {getAPIProvider as l8,isFirstPartyAnthropicBaseUrl as T3,li as V7} from "./1282_usesFirstPartyModelIds.ts";
import {tr as Y8,sn as A6} from "../config/0047_namespace.ts";
import {ra as KK,Ap as ZO} from "../config/0614_Ap.ts";
import {getAnthropicApiKey as JW,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {tg as iY} from "../config/0048_ISSUES_EXPLAINER.ts";
import {getProxyFetchOptions as lf,Z_ as Af} from "../config/1021_shouldBypassProxyWithCidr.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {E as k} from "../../vendor/m319.ts";
import {aT as LJ,durationUnitMillis as Hs} from "../../vendor/m442.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {b as L} from "../../runtime.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Pd as FO,Fa as $K} from "../../vendor/m701.ts";
import {we as kH} from "../../vendor/m455.ts";
/** A model record as returned by the gateway's /v1/models endpoint. */
interface GatewayModel {
  id: string;
  display_name?: string;
}

/** Shape of the on-disk gateway models cache file. */
interface GatewayModelsCache {
  baseUrl: string;
  fetchedAt: number;
  models: GatewayModel[];
}

/** A selectable model option surfaced in the model picker UI. */
interface ModelOption {
  value: string;
  label: string;
  description: string;
}

/**
 * Whether gateway model discovery is enabled. Requires the opt-in env flag, a
 * first-party provider, a non-first-party base URL predicate, and a configured
 * ANTHROPIC_BASE_URL to talk to.
 */
function isGatewayModelDiscoveryEnabled(): boolean {
  if (!q_(process.env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY)) return !1;
  if (l8() !== "firstParty") return !1;
  if (T3()) return !1;
  if (!process.env.ANTHROPIC_BASE_URL) return !1;
  return !0;
}

/** Directory under the Claude config home where caches are stored. */
function getGatewayCacheDir(): string {
  return path.join(Y8(), "cache");
}

/** Full path of the cached gateway models JSON file. */
function getGatewayModelsCachePath(): string {
  return path.join(getGatewayCacheDir(), "gateway-models.json");
}

/**
 * Read the cached gateway models and map them to UI model options.
 * Returns an empty list when discovery is disabled, no cache exists, or the
 * cache was fetched against a different base URL than the current one.
 *
 * Exported entry point (referenced cross-module by its original name `mg9`;
 * renaming would break those callers, so the name is preserved).
 */
function mg9(): ModelOption[] {
  if (!isGatewayModelDiscoveryEnabled()) return [];
  let cache = readGatewayModelsCache(getGatewayModelsCachePath());
  if (!cache || cache.baseUrl !== process.env.ANTHROPIC_BASE_URL) return [];
  return cache.models.map(model => ({
    value: model.id,
    label: model.display_name || model.id,
    description: "From gateway"
  }));
}

/**
 * Fetch the gateway's model list from `<baseUrl>/v1/models`, filter it to
 * Claude/Anthropic models, and persist the result to the on-disk cache.
 * No-ops when discovery is disabled, in essential-traffic mode, when no
 * credentials are available, or when the cache is already up to date.
 *
 * Exported entry point (referenced cross-module by its original name `pg9`;
 * renaming would break those callers, so the name is preserved).
 */
async function pg9(): Promise<void> {
  if (!isGatewayModelDiscoveryEnabled()) return;
  if (KK()) return;
  try {
    let baseUrl = process.env.ANTHROPIC_BASE_URL;
    if (!baseUrl) return;
    let authToken = process.env.ANTHROPIC_AUTH_TOKEN,
      apiKey = JW();
    if (!authToken && !apiKey) return;
    let customHeaders: Record<string, string> = {};
    for (let line of (process.env.ANTHROPIC_CUSTOM_HEADERS ?? "").split(/\r?\n/)) {
      let colonIndex = line.indexOf(":");
      if (colonIndex <= 0) continue;
      let headerName = line.slice(0, colonIndex).trim(),
        headerValue = line.slice(colonIndex + 1).trim();
      if (headerName && headerValue) customHeaders[headerName] = headerValue;
    }
    let requestUrl = `${baseUrl.replace(/\/+$/, "")}/v1/models?limit=1000`,
      response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          ...(authToken ? {
            Authorization: `Bearer ${authToken}`
          } : apiKey ? {
            "x-api-key": apiKey
          } : {}),
          "anthropic-version": "2023-06-01",
          "User-Agent": iY(),
          ...customHeaders
        },
        redirect: "error",
        signal: AbortSignal.timeout(GATEWAY_DISCOVERY_TIMEOUT_MS),
        ...lf({
          url: requestUrl
        })
      });
    if (!response.ok) {
      N(`[gatewayDiscovery] non-OK status ${response.status}`);
      return;
    }
    let responseBody = await response.json(),
      parsed = k.object({
        data: k.array(gatewayModelSchema())
      }).safeParse(responseBody);
    if (!parsed.success) {
      N("[gatewayDiscovery] response body failed validation");
      return;
    }
    let usableModels = parsed.data.data.filter((model: GatewayModel) => /^(claude|anthropic)/i.test(model.id));
    if (usableModels.length === 0) {
      N("[gatewayDiscovery] 0 usable models after filter");
      return;
    }
    let cachePath = getGatewayModelsCachePath(),
      existingCache = readGatewayModelsCache(cachePath);
    if (existingCache && existingCache.baseUrl === baseUrl && LJ(existingCache.models, usableModels)) return;
    await fsPromises.mkdir(getGatewayCacheDir(), {
      recursive: !0
    }), await fsPromises.writeFile(cachePath, bH({
      baseUrl: baseUrl,
      fetchedAt: Date.now(),
      models: usableModels
    }), {
      encoding: "utf-8",
      mode: 384
    }), readGatewayModelsCache.cache.delete(cachePath), N(`[gatewayDiscovery] cached ${usableModels.length} models`);
  } catch (error) {
    N(`[gatewayDiscovery] fetch failed: ${error instanceof Error ? error.message : "unknown"}`);
  }
}
var fs: typeof import("fs"),
  fsPromises: typeof import("fs/promises"),
  path: typeof import("path"),
  /** Timeout (ms) for the gateway /v1/models request. */
  GATEWAY_DISCOVERY_TIMEOUT_MS = 3000,
  /** Lazily-built schema validating a single gateway model record. */
  gatewayModelSchema: () => ZodType<GatewayModel>,
  /** Lazily-built schema validating the on-disk gateway models cache file. */
  gatewayModelsCacheSchema: () => ZodType<GatewayModelsCache>,
  /** Memoized reader for the on-disk gateway models cache (keyed by file path). */
  readGatewayModelsCache: ((path: string) => GatewayModelsCache | null) & {
    cache: Map<string, GatewayModelsCache | null>;
  };

// Lazy module initializer (bundler __esmMin entry); referenced across modules
// as WP8() to ensure this module's side-effecting setup has run.
var WP8 = L(() => {
  Hs();
  c7();
  a8();
  Mq();
  FH();
  A6();
  FO();
  ZO();
  Af();
  H6();
  V7();
  fs = require("fs"), fsPromises = require("fs/promises"), path = require("path"), gatewayModelSchema = kH(() => k.object({
    id: k.string(),
    display_name: k.string().optional()
  }).strip()), gatewayModelsCacheSchema = kH(() => k.object({
    baseUrl: k.string(),
    fetchedAt: k.number(),
    models: k.array(gatewayModelSchema())
  }));
  readGatewayModelsCache = V6((cachePath: string) => {
    try {
      let text = fs.readFileSync(cachePath, "utf-8"),
        parsed = gatewayModelsCacheSchema().safeParse($K(text, !1));
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }, (cachePath: string) => cachePath);
});
export {isGatewayModelDiscoveryEnabled as x$s,getGatewayCacheDir as k$s,getGatewayModelsCachePath as H$s,mg9 as Dun,pg9 as I$s,fs as w$s,fsPromises as Iun,path as ORr,GATEWAY_DISCOVERY_TIMEOUT_MS as YPu,gatewayModelSchema as R$s,gatewayModelsCacheSchema as JPu,readGatewayModelsCache as PRr,WP8 as Pun};
