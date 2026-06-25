// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {DEFAULT_MANTLE_OPUS_KEY as eYe,getMarketingNameForModel as Ng,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getAPIProvider as Hr,Ps as si} from "./1287_usesFirstPartyModelIds.ts";
import {Ne as Ge,AR as YI} from "../../vendor/m583.ts";
import {ed as Ed,h2 as N2} from "../../vendor/m1285.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue,Ve as Qe} from "../../vendor/m5.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {jXe as DYe,zXe as IYe} from "../core/1621_default.ts";
import {ey as Z_,RNe as d1e} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {t2 as E2,E1e as uMe} from "../../vendor/m614.ts";
import {refreshAndGetAwsCredentials as W3,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
// @ts-nocheck
var Rnc = {};
pt(Rnc, {
  probeMantleModel: () => probeMantleModel,
  checkMantleDefaultAvailability: () => checkMantleDefaultAvailability
});
async function checkMantleDefaultAvailability(modelKey = eYe) {
  if (Hr() !== "mantle") return [];
  if (Ge.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) return [];
  if (Ge.ANTHROPIC_DEFAULT_OPUS_MODEL) return [];
  let mantleId = Ed[modelKey].mantle;
  if (!mantleId) return [];
  j("tengu_mantle_default_check", {});
  let isReachable = await probeMantleModel(mantleId);
  if (j("tengu_mantle_probe_result", {
    model_key: Ue(modelKey),
    accessible: Qe(isReachable ? "true" : "false")
  }), isReachable) return [];
  let defaultDisplayName = Ng(Ed[modelKey].firstParty) ?? mantleId,
    triedNames = [defaultDisplayName],
    currentIdx = wnc.indexOf(modelKey);
  for (let fallbackIdx = currentIdx - 1; fallbackIdx >= 0; fallbackIdx--) {
    let fallbackKey = wnc[fallbackIdx];
    if (!fallbackKey.startsWith("opus")) continue;
    let fallbackMantleId = Ed[fallbackKey].mantle,
      fallbackReachable = await probeMantleModel(fallbackMantleId);
    j("tengu_mantle_probe_result", {
      model_key: Ue(fallbackKey),
      accessible: Qe(fallbackReachable ? "true" : "false")
    });
    let fallbackDisplayName = Ng(Ed[fallbackKey].firstParty) ?? fallbackMantleId;
    if (fallbackReachable) return v(`[mantle-fallback] default=${modelKey} fallback=${fallbackKey}`), [{
      kind: "fallback",
      tier: "opus",
      envVar: "ANTHROPIC_DEFAULT_OPUS_MODEL",
      defaultKey: modelKey,
      defaultName: defaultDisplayName,
      fallbackKey: fallbackKey,
      fallbackName: fallbackDisplayName,
      fallbackMantleId: fallbackMantleId
    }];
    triedNames.push(fallbackDisplayName);
  }
  return v(`[mantle-fallback] default=${modelKey} exhausted \u2014 no working Opus`), [{
    kind: "exhausted",
    tier: "opus",
    defaultName: defaultDisplayName,
    triedNames: triedNames
  }];
}
async function probeMantleModel(mantleModelId) {
  try {
    let [{
        AnthropicBedrockMantle: MantleClient
      }, {
        getProxyFetchOptions: getProxyOpts
      }] = await Promise.all([Promise.resolve().then(() => (DYe(), IYe)), Promise.resolve().then(() => (Z_(), d1e))]),
      awsRegion = await E2(),
      clientOptions = {
        awsRegion: awsRegion,
        maxRetries: 0,
        timeout: 8000,
        fetchOptions: getProxyOpts({
          url: Ge.ANTHROPIC_BEDROCK_MANTLE_BASE_URL || `https://bedrock-mantle.${awsRegion}.api.aws`
        })
      },
      client,
      bearerToken = Ge.AWS_BEARER_TOKEN_BEDROCK;
    if (bearerToken) client = new MantleClient({
      ...clientOptions,
      apiKey: bearerToken
    });else {
      let skipAuth = Ge.CLAUDE_CODE_SKIP_MANTLE_AUTH,
        awsCreds = skipAuth ? null : await W3();
      client = awsCreds ? new MantleClient({
        ...clientOptions,
        awsAccessKey: awsCreds.accessKeyId,
        awsSecretAccessKey: awsCreds.secretAccessKey,
        awsSessionToken: awsCreds.sessionToken
      }) : new MantleClient({
        ...clientOptions,
        ...(skipAuth && {
          skipAuth: true
        })
      });
    }
    return await client.messages.create({
      model: mantleModelId,
      max_tokens: 1,
      messages: [{
        role: "user",
        content: "."
      }]
    }), true;
  } catch (err) {
    if (err?.status === 429) return true;
    return false;
  }
}
var wnc;
var xnc = b(() => {
  Ct();
  mo();
  uMe();
  je();
  YI();
  N2();
  Fo();
  si();
  wnc = Object.keys(Ed).filter(key => Ed[key].mantle !== null);
});
export {Rnc as xpc,checkMantleDefaultAvailability,probeMantleModel,wnc as Ipc,xnc as Dpc};
