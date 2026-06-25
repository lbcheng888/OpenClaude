// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {firstPartyNameToCanonical,getMarketingNameForModel,DEFAULT_3P_SONNET_KEY,Ro as Mo,DEFAULT_3P_OPUS_KEY,DEFAULT_3P_HAIKU_KEY} from "../permissions/1458_swapShrinksContextWindow.ts";
import {ed as bd,h2 as z2} from "../../vendor/m1285.ts";
import {getAPIProvider,Ps as li} from "./1287_usesFirstPartyModelIds.ts";
import {nt as st} from "../../vendor/m127.ts";
import {NNe as Svt,Uoe as qoe,_Ae as LEe,$oe as gme} from "../config/1285_BedrockClient.ts";
import {t2 as P2,E1e as kMe} from "../../vendor/m614.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {HN as fromNumber,Le as fromEnum} from "../../vendor/m5.ts";
import {Zf as ky,tet as eQe} from "../mcp/2200_mcpServerName.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {jXe as JYe,zXe as YYe} from "../core/1621_default.ts";
import {ey as Z_,RNe as D1e} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {refreshAndGetAwsCredentials,lo as Ao} from "../config/2036_withOAuthRefreshLock.ts";
import {dn as sn} from "../config/0137_namespace.ts";
/** Module namespace object for bedrock upgrade/key utilities */
var w1o = {};
isFullscreenWithTTY(w1o, {
  upgradeKey: () => upgradeKey,
  probeBedrockModel: () => probeBedrockModel,
  findBedrockUpgradeCandidates: () => findBedrockUpgradeCandidates,
  checkBedrockDefaultAvailability: () => checkBedrockDefaultAvailability
});

/** Extracts the model tier ("sonnet", "opus", or "haiku") from a model key string */
function v1o(modelKey: string): string | undefined {
  if (modelKey.startsWith("sonnet")) return "sonnet";
  if (modelKey.startsWith("opus")) return "opus";
  if (modelKey.startsWith("haiku")) return "haiku";
  return;
}

/** Looks up the canonical bundle key for a given first-party model name */
function Goc(firstPartyName: string): string | undefined {
  let canonicalName = firstPartyNameToCanonical(firstPartyName);
  for (let bundleKey of yVt) if (firstPartyNameToCanonical(bd[bundleKey].firstParty) === canonicalName) return bundleKey;
  return;
}

/** Returns a compound key string representing the upgrade path from one key to another */
function upgradeKey(upgradeInfo: any): string {
  return `${upgradeInfo.fromKey}-to-${upgradeInfo.toKey}`;
}

/** Finds Bedrock model candidates where the user is pinned to an older model than the current default */
async function findBedrockUpgradeCandidates(): Promise<any[]> {
  if (getAPIProvider() !== "bedrock") return [];
  if (st(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return [];
  let pinnedTiers: any[] = [];
  for (let tier of Object.keys(nZn)) {
    let tierConfig = nZn[tier],
      matchedEnvVar: string | undefined,
      matchedRaw: string | undefined,
      matchedKey: string | undefined;
    for (let envVarName of tierConfig.envVarPriority) {
      let envValue = process.env[envVarName];
      if (!envValue) continue;
      if (envValue.includes("application-inference-profile")) continue;
      let resolvedKey = Goc(envValue);
      if (!resolvedKey || v1o(resolvedKey) !== tier || resolvedKey === tierConfig.defaultKey) continue;
      matchedEnvVar = envVarName, matchedRaw = envValue, matchedKey = resolvedKey;
      break;
    }
    if (!matchedEnvVar || !matchedRaw || !matchedKey) continue;
    let defaultKey = tierConfig.defaultKey,
      pinnedIdx = yVt.indexOf(matchedKey),
      defaultIdx = yVt.indexOf(defaultKey);
    if (pinnedIdx >= defaultIdx) continue;
    pinnedTiers.push({
      tier: tier,
      envVar: matchedEnvVar,
      pinnedRaw: matchedRaw,
      pinnedKey: matchedKey,
      defaultKey: defaultKey
    });
  }
  if (pinnedTiers.length === 0) return [];
  let bedrockRegionList: any;
  try {
    bedrockRegionList = await Svt();
  } catch {
    return [];
  }
  let awsRegion = qoe(await P2()),
    upgradeCandidates: any[] = [];
  for (let tierEntry of pinnedTiers) {
    let firstPartyId = bd[tierEntry.defaultKey].firstParty,
      regionalId = LEe(bedrockRegionList, firstPartyId, awsRegion);
    if (!regionalId) continue;
    let fromMarketingName = getMarketingNameForModel(bd[tierEntry.pinnedKey].firstParty),
      toMarketingName = getMarketingNameForModel(bd[tierEntry.defaultKey].firstParty);
    if (!fromMarketingName || !toMarketingName) continue;
    upgradeCandidates.push({
      tier: tierEntry.tier,
      envVar: tierEntry.envVar,
      fromKey: tierEntry.pinnedKey,
      fromMarketingName: fromMarketingName,
      toKey: tierEntry.defaultKey,
      toMarketingName: toMarketingName,
      toBedrockId: regionalId
    });
  }
  logEvent("tengu_bedrock_upgrade_check", {
    stale_tiers: fromNumber(upgradeCandidates.length)
  });
  let probedCandidates = (await Promise.all(upgradeCandidates.map(async candidateEntry => {
    let probeResult = await probeBedrockModel(candidateEntry.toBedrockId, candidateEntry.tier);
    return logEvent("tengu_bedrock_probe_result", {
      tier: fromEnum(candidateEntry.tier),
      model_id: ky(candidateEntry.toBedrockId),
      accessible: probeResult
    }), probeResult ? candidateEntry : null;
  }))).filter(candidateEntry => candidateEntry !== null);
  return logForDebugging(`[bedrock-upgrade] tiersWithPin=${pinnedTiers.length} candidates=${probedCandidates.length}`), probedCandidates;
}

/** Checks if default Bedrock models (non-pinned) are accessible and finds fallbacks if not */
async function checkBedrockDefaultAvailability(): Promise<any[]> {
  if (getAPIProvider() !== "bedrock") return [];
  if (st(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return [];
  let unpinnedTiers: any[] = [];
  for (let tier of Object.keys(nZn)) {
    let tierConfig = nZn[tier];
    if (tierConfig.envVarPriority.some((envVarName: string) => {
      let envValue = process.env[envVarName];
      if (!envValue) return !1;
      let resolvedKey = Goc(envValue);
      if (!resolvedKey) return !0;
      return v1o(resolvedKey) === tier;
    })) continue;
    unpinnedTiers.push({
      tier: tier,
      envVar: tierConfig.envVarPriority.at(-1),
      defaultKey: tierConfig.defaultKey
    });
  }
  if (unpinnedTiers.length === 0) return [];
  logEvent("tengu_bedrock_default_check", {
    unpinned_tiers: fromNumber(unpinnedTiers.length)
  });
  let bedrockRegionList: any = null;
  try {
    bedrockRegionList = await Svt();
  } catch {
    return [];
  }
  let awsRegion = qoe(await P2()),
    probeResults = await Promise.all(unpinnedTiers.map(async tierEntry => {
      let modelDef = bd[tierEntry.defaultKey],
        regionalId = LEe(bedrockRegionList, modelDef.firstParty, awsRegion);
      if (!regionalId) return null;
      let probeResult = await probeBedrockModel(regionalId, tierEntry.tier);
      if (logEvent("tengu_bedrock_probe_result", {
        tier: fromEnum(tierEntry.tier),
        model_id: ky(regionalId),
        accessible: probeResult
      }), probeResult) return null;
      let fallback = await i3m(tierEntry.defaultKey, tierEntry.tier, bedrockRegionList, awsRegion);
      if (!fallback) return null;
      let defaultMarketingName = getMarketingNameForModel(modelDef.firstParty),
        fallbackMarketingName = getMarketingNameForModel(bd[fallback.key].firstParty);
      if (!defaultMarketingName || !fallbackMarketingName) return null;
      return {
        tier: tierEntry.tier,
        envVar: tierEntry.envVar,
        defaultKey: tierEntry.defaultKey,
        defaultName: defaultMarketingName,
        fallbackKey: fallback.key,
        fallbackName: fallbackMarketingName,
        fallbackBedrockId: fallback.regionalId,
        ...(fallback.crossTier && {
          crossTier: !0
        })
      };
    })),
    fallbackList: any[] = [];
  for (let tierEntry of probeResults) if (tierEntry !== null) fallbackList.push(tierEntry);
  return logForDebugging(`[bedrock-fallback] unpinnedTiers=${unpinnedTiers.length} fallbacks=${fallbackList.length}`), fallbackList;
}

/** Finds the best available older-version fallback for a given default key and tier */
async function i3m(defaultKey: string, tier: string, bedrockRegionList: any, awsRegion: string): Promise<any> {
  async function tryProbe(candidateKey: string, candidateTier: string): Promise<string | null> {
    let regionalId = LEe(bedrockRegionList, bd[candidateKey].firstParty, awsRegion);
    if (!regionalId) return null;
    return (await probeBedrockModel(regionalId, candidateTier)) ? regionalId : null;
  }
  for (let candidateKey of a3m(defaultKey, tier)) {
    let foundRegionalId = await tryProbe(candidateKey, tier);
    if (foundRegionalId) return {
      key: candidateKey,
      regionalId: foundRegionalId
    };
  }
  if (tier === "opus") {
    let sonnetRegionalId = await tryProbe(DEFAULT_3P_SONNET_KEY, "sonnet");
    if (sonnetRegionalId) return {
      key: DEFAULT_3P_SONNET_KEY,
      regionalId: sonnetRegionalId,
      crossTier: !0
    };
  }
  return null;
}

/** Returns all model keys of the same tier that are older (lower index) than the given key */
function a3m(defaultKey: string, tier: string): string[] {
  let startIdx = yVt.indexOf(defaultKey),
    olderKeys: string[] = [];
  for (let idx = startIdx - 1; idx >= 0; idx--) {
    let candidateKey = yVt[idx];
    if (v1o(candidateKey) === tier) olderKeys.push(candidateKey);
  }
  return olderKeys;
}

/** Probes a Bedrock model by sending a minimal message and checking if the endpoint is accessible */
async function probeBedrockModel(modelId: string, tier: string): Promise<boolean> {
  try {
    let [{
        AnthropicBedrock: BedrockClient
      }, {
        getProxyFetchOptions: getProxyOptions
      }] = await Promise.all([Promise.resolve().then(() => (JYe(), YYe)), Promise.resolve().then(() => (Z_(), D1e))]),
      region = tier === "haiku" && process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION ? process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION : await P2(),
      clientOptions: any = {
        awsRegion: region,
        maxRetries: 0,
        timeout: 8000,
        fetchOptions: getProxyOptions({
          url: process.env.ANTHROPIC_BEDROCK_BASE_URL || `https://bedrock-runtime.${region}.amazonaws.com`
        })
      },
      bedrockClient: any;
    if (process.env.AWS_BEARER_TOKEN_BEDROCK) bedrockClient = new BedrockClient({
      ...clientOptions,
      apiKey: process.env.AWS_BEARER_TOKEN_BEDROCK
    });else {
      let skipAuth = st(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH),
        awsCreds = skipAuth ? null : await refreshAndGetAwsCredentials();
      bedrockClient = awsCreds ? new BedrockClient({
        ...clientOptions,
        awsAccessKey: awsCreds.accessKeyId,
        awsSecretKey: awsCreds.secretAccessKey,
        awsSessionToken: awsCreds.sessionToken
      }) : new BedrockClient({
        ...clientOptions,
        ...(skipAuth && {
          skipAuth: !0
        })
      });
    }
    return await bedrockClient.messages.create({
      model: modelId,
      max_tokens: 1,
      messages: [{
        role: "user",
        content: "."
      }]
    }), !0;
  } catch (err: any) {
    if (err?.status === 429) return !0;
    return !1;
  }
}
var yVt: string[], nZn: Record<string, any>;

/** Lazy initializer: sets up yVt (all model keys) and nZn (tier config map) */
var R1o = b(() => {
  Ct();
  eQe();
  Ao();
  kMe();
  qe();
  sn();
  gme();
  z2();
  Mo();
  li();
  yVt = Object.keys(bd), nZn = {
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
export {w1o as V2o,v1o as G2o,Goc as kpc,upgradeKey,findBedrockUpgradeCandidates,checkBedrockDefaultAvailability,i3m as uKm,a3m as dKm,probeBedrockModel,yVt as zzt,nZn as orr,R1o as K2o};
