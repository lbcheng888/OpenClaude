// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {getAPIProvider as l8,isFirstPartyAnthropicBaseUrl as T3,Ps as V7} from "./1287_usesFirstPartyModelIds.ts";
import {or as Y8,dn as A6} from "../config/0137_namespace.ts";
import {Vi as KK,$d as ZO} from "../config/0620_$d.ts";
import {getAnthropicApiKey as JW,lo as Mq} from "../config/2036_withOAuthRefreshLock.ts";
import {Fg as iY} from "../../vendor/m5.ts";
import {getProxyFetchOptions as lf,ey as Af} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {C as k} from "../../vendor/m321.ts";
import {J_ as LJ,$X as Hs} from "../../vendor/m446.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {pd as FO,ba as $K} from "../../vendor/m706.ts";
import {ve as kH} from "../../vendor/m461.ts";
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
export {isGatewayModelDiscoveryEnabled as A5s,getGatewayCacheDir as R5s,getGatewayModelsCachePath as v5s,mg9 as hmn,pg9 as w5s,fs as E5s,fsPromises as fmn,path as lxr,GATEWAY_DISCOVERY_TIMEOUT_MS as p9u,gatewayModelSchema as C5s,gatewayModelsCacheSchema as m9u,readGatewayModelsCache as axr,WP8 as gmn};
