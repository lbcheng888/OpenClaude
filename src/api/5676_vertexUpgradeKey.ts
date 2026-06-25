// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {firstPartyNameToCanonical,getMarketingNameForModel,DEFAULT_3P_SONNET_KEY,Ro as Mo,DEFAULT_3P_OPUS_KEY,DEFAULT_3P_HAIKU_KEY} from "../permissions/1458_swapShrinksContextWindow.ts";
import {ed as bd,h2 as z2} from "../../vendor/m1285.ts";
import {getAPIProvider,Ps as li} from "./1287_usesFirstPartyModelIds.ts";
import {nt as st} from "../../vendor/m127.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {HN as fromNumber,Le as fromEnum} from "../../vendor/m5.ts";
import {Zf as ky,tet as eQe} from "../mcp/2200_mcpServerName.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {vyn as WAn,Ryn as jAn} from "../core/2024_default.ts";
import {ey as Z_,RNe as D1e} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {refreshGcpCredentialsIfNeeded,lo as Ao} from "../config/2036_withOAuthRefreshLock.ts";
import {buildVertexGoogleAuth,wyn as GAn} from "../../vendor/m2024.ts";
import {xre as yre,KKe as yWe,dn as sn} from "../config/0137_namespace.ts";
var I1o = {};
isFullscreenWithTTY(I1o, {
  vertexUpgradeKey: () => vertexUpgradeKey,
  probeVertexModel: () => probeVertexModel,
  findVertexUpgradeCandidates: () => findVertexUpgradeCandidates,
  checkVertexDefaultAvailability: () => checkVertexDefaultAvailability
});

/** Extract the model tier ("sonnet" | "opus" | "haiku") from a model key prefix. */
function H1o(modelKey: string): string | undefined {
  if (modelKey.startsWith("sonnet")) return "sonnet";
  if (modelKey.startsWith("opus")) return "opus";
  if (modelKey.startsWith("haiku")) return "haiku";
  return;
}

/** Find the model registry key whose firstParty canonical name matches the given name. */
function Koc(modelName: string): string | undefined {
  let canonicalName = firstPartyNameToCanonical(modelName);
  for (let registryKey of TVt) if (firstPartyNameToCanonical(bd[registryKey].firstParty) === canonicalName) return registryKey;
  return;
}

/** Build a string key representing a model upgrade transition: "fromKey-to-toKey". */
function vertexUpgradeKey(upgradeCandidate: any): string {
  return `${upgradeCandidate.fromKey}-to-${upgradeCandidate.toKey}`;
}

/**
 * Find all Vertex model upgrade candidates.
 * For each tier, checks if the env var is pinned to an older model than the current default,
 * and verifies the newer default is actually accessible on Vertex.
 */
async function findVertexUpgradeCandidates(): Promise<any[]> {
  if (getAPIProvider() !== "vertex") return [];
  if (st(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return [];
  let pinnedTiers: any[] = [];
  for (let tier of Object.keys(oZn)) {
    let tierConfig = oZn[tier],
      pinnedEnvVar: string | undefined,
      pinnedKey: string | undefined;
    for (let envVarName of tierConfig.envVarPriority) {
      let envValue = process.env[envVarName];
      if (!envValue) continue;
      let resolvedKey = Koc(envValue);
      if (!resolvedKey || H1o(resolvedKey) !== tier || resolvedKey === tierConfig.defaultKey) continue;
      pinnedEnvVar = envVarName, pinnedKey = resolvedKey;
      break;
    }
    if (!pinnedEnvVar || !pinnedKey) continue;
    let defaultKey = tierConfig.defaultKey,
      pinnedIdx = TVt.indexOf(pinnedKey),
      defaultIdx = TVt.indexOf(defaultKey);
    if (pinnedIdx >= defaultIdx) continue;
    pinnedTiers.push({
      tier: tier,
      envVar: pinnedEnvVar,
      pinnedKey: pinnedKey,
      defaultKey: defaultKey
    });
  }
  if (pinnedTiers.length === 0) return [];
  logEvent("tengu_vertex_upgrade_check", {
    stale_tiers: fromNumber(pinnedTiers.length)
  });
  let candidates = (await Promise.all(pinnedTiers.map(async pinnedTier => {
    let vertexModelId = bd[pinnedTier.defaultKey].vertex,
      accessible = await probeVertexModel(vertexModelId);
    if (logEvent("tengu_vertex_probe_result", {
      tier: fromEnum(pinnedTier.tier),
      model_id: ky(vertexModelId),
      accessible: accessible
    }), !accessible) return null;
    let pinnedMarketingName = getMarketingNameForModel(bd[pinnedTier.pinnedKey].firstParty),
      defaultMarketingName = getMarketingNameForModel(bd[pinnedTier.defaultKey].firstParty);
    if (!pinnedMarketingName || !defaultMarketingName) return null;
    return {
      tier: pinnedTier.tier,
      envVar: pinnedTier.envVar,
      fromKey: pinnedTier.pinnedKey,
      fromMarketingName: pinnedMarketingName,
      toKey: pinnedTier.defaultKey,
      toMarketingName: defaultMarketingName,
      toVertexId: vertexModelId
    };
  }))).filter(pinnedTier => pinnedTier !== null);
  return logForDebugging(`[vertex-upgrade] tiersWithPin=${pinnedTiers.length} candidates=${candidates.length}`), candidates;
}

/**
 * Check which Vertex default models are unavailable (unpinned tiers) and find fallback candidates.
 */
async function checkVertexDefaultAvailability(): Promise<any[]> {
  if (getAPIProvider() !== "vertex") return [];
  if (st(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return [];
  let unpinnedTiers: any[] = [];
  for (let tier of Object.keys(oZn)) {
    let tierConfig = oZn[tier];
    // Skip tiers where env vars are set and map to this tier
    if (tierConfig.envVarPriority.some((envVarName: string) => {
      let envValue = process.env[envVarName];
      if (!envValue) return !1;
      let resolvedKey = Koc(envValue);
      if (!resolvedKey) return !0;
      return H1o(resolvedKey) === tier;
    })) continue;
    unpinnedTiers.push({
      tier: tier,
      envVar: tierConfig.envVarPriority.at(-1),
      defaultKey: tierConfig.defaultKey
    });
  }
  if (unpinnedTiers.length === 0) return [];
  logEvent("tengu_vertex_default_check", {
    unpinned_tiers: fromNumber(unpinnedTiers.length)
  });
  let probeResults = await Promise.all(unpinnedTiers.map(async unpinnedTier => {
      let modelEntry = bd[unpinnedTier.defaultKey],
        accessible = await probeVertexModel(modelEntry.vertex);
      if (logEvent("tengu_vertex_probe_result", {
        tier: fromEnum(unpinnedTier.tier),
        model_id: fromEnum(modelEntry.vertex),
        accessible: accessible
      }), accessible) return null;
      let fallbackResult = await p3m(unpinnedTier.defaultKey, unpinnedTier.tier);
      if (!fallbackResult) return null;
      let defaultMarketingName = getMarketingNameForModel(modelEntry.firstParty),
        fallbackMarketingName = getMarketingNameForModel(bd[fallbackResult.key].firstParty);
      if (!defaultMarketingName || !fallbackMarketingName) return null;
      return {
        tier: unpinnedTier.tier,
        envVar: unpinnedTier.envVar,
        defaultKey: unpinnedTier.defaultKey,
        defaultName: defaultMarketingName,
        fallbackKey: fallbackResult.key,
        fallbackName: fallbackMarketingName,
        fallbackVertexId: bd[fallbackResult.key].vertex,
        ...(fallbackResult.crossTier && {
          crossTier: !0
        })
      };
    })),
    fallbacks: any[] = [];
  for (let probeResult of probeResults) if (probeResult !== null) fallbacks.push(probeResult);
  return logForDebugging(`[vertex-fallback] unpinnedTiers=${unpinnedTiers.length} fallbacks=${fallbacks.length}`), fallbacks;
}

/** Find the best available fallback model for a given model key and tier. */
async function p3m(defaultKey: string, tier: string): Promise<any> {
  for (let candidateKey of m3m(defaultKey, tier)) if (await probeVertexModel(bd[candidateKey].vertex)) return {
    key: candidateKey
  };
  // For opus, try cross-tier fallback to sonnet
  if (tier === "opus") {
    let sonnetKey = DEFAULT_3P_SONNET_KEY;
    if (await probeVertexModel(bd[sonnetKey].vertex)) return {
      key: sonnetKey,
      crossTier: !0
    };
  }
  return null;
}

/** Get all older model keys of the same tier, in reverse order (newest first). */
function m3m(defaultKey: string, tier: string): string[] {
  let startIdx = TVt.indexOf(defaultKey),
    olderKeys: string[] = [];
  for (let idx = startIdx - 1; idx >= 0; idx--) {
    let candidateKey = TVt[idx];
    if (H1o(candidateKey) === tier) olderKeys.push(candidateKey);
  }
  return olderKeys;
}

/**
 * Probe whether a Vertex model ID is accessible by sending a minimal test message.
 * Returns true if accessible (including 429 rate-limit), false otherwise.
 */
async function probeVertexModel(vertexModelId: any): Promise<boolean> {
  try {
    let [{
      AnthropicVertex: VertexClient
    }, {
      getProxyFetchOptions: getProxyFetchOptions
    }] = await Promise.all([Promise.resolve().then(() => (WAn(), jAn)), Promise.resolve().then(() => (Z_(), D1e))]);
    if (!st(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)) await refreshGcpCredentialsIfNeeded();
    let gcpProject = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || process.env.gcloud_project || process.env.google_cloud_project,
      appCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.google_application_credentials,
      // Use ANTHROPIC_VERTEX_PROJECT_ID only if no gcloud env vars are set
      vertexProjectId = gcpProject || appCredentials ? void 0 : process.env.ANTHROPIC_VERTEX_PROJECT_ID,
      googleAuth = await buildVertexGoogleAuth(st(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH) ? {
        kind: "skip"
      } : {
        kind: "default"
      }, vertexProjectId),
      region = yre(vertexModelId);
    return await new VertexClient({
      region: region,
      googleAuth: googleAuth,
      maxRetries: 0,
      timeout: 8000,
      fetchOptions: getProxyFetchOptions({
        url: process.env.ANTHROPIC_VERTEX_BASE_URL || yWe(region)
      })
    }).messages.create({
      model: vertexModelId,
      max_tokens: 1,
      messages: [{
        role: "user",
        content: "."
      }]
    }), !0;
  } catch (err: any) {
    // 429 means the model exists but is rate-limited - treat as accessible
    if (err?.status === 429) return !0;
    return !1;
  }
}
var TVt: string[], oZn: any;

/** Module initializer: sets up model key list and tier configuration. */
var D1o = b(() => {
  Ct();
  eQe();
  Ao();
  qe();
  sn();
  z2();
  Mo();
  li();
  GAn();
  TVt = Object.keys(bd), oZn = {
    sonnet: {
      envVarPriority: ["ANTHROPIC_DEFAULT_SONNET_MODEL"],
      defaultKey: DEFAULT_3P_SONNET_KEY
    },
    opus: {
      envVarPriority: ["ANTHROPIC_DEFAULT_OPUS_MODEL"],
      defaultKey: DEFAULT_3P_OPUS_KEY
    },
    haiku: {
      envVarPriority: ["ANTHROPIC_SMALL_FAST_MODEL", "ANTHROPIC_DEFAULT_HAIKU_MODEL"],
      defaultKey: DEFAULT_3P_HAIKU_KEY
    }
  };
});
export {I1o as j2o,H1o as z2o,Koc as Hpc,vertexUpgradeKey,findVertexUpgradeCandidates,checkVertexDefaultAvailability,p3m as hKm,m3m as gKm,probeVertexModel,TVt as jzt,oZn as irr,D1o as Y2o};
