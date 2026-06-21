// @ts-nocheck
import {getAPIProvider,li} from "./1282_usesFirstPartyModelIds.ts";
import {je} from "../../vendor/m577.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {ra,Ap} from "../config/0614_Ap.ts";
import {fo} from "../../vendor/m566.ts";
import {tg} from "../config/0048_ISSUES_EXPLAINER.ts";
import {mLr,NBe} from "../config/2021_error.ts";
import {k2,xH} from "../config/0580_xH.ts";
import {normalizeModelStringForAPI,getMainLoopModel,Mo,getMarketingNameForModel} from "../permissions/1453_swapShrinksContextWindow.ts";
import {isTmuxControlMode,Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {getAnthropicApiKey,shouldUseWIFAuth,getClaudeAIOAuthTokens,hasProfileScope,Ao,isClaudeAISubscriber} from "../config/2031_withOAuthRefreshLock.ts";
import {getWIFTokenCache,getWIFCredentials,LYe} from "./1484_withCredentialsLock.ts";
import {getOauthConfig,OAUTH_BETA_HEADER,Dc} from "./0459_getOauthConfig.ts";
import {withOAuth401Retry,fk} from "./2032_withOAuth401Retry.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {aT,durationUnitMillis} from "../../vendor/m442.ts";
import {K_,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {oCe,PYe} from "../../vendor/m1481.ts";
import {getGatewayAuth,lt} from "../session/0131_sent.ts";
import {W1e,MEe,z2} from "../../vendor/m1280.ts";
import {b} from "../../runtime.ts";
import {Gp} from "../../vendor/m567.ts";
import {iv} from "../../vendor/m454.ts";
import {Lr} from "../../vendor/m578.ts";
import {eW,D0,the,X$} from "../telemetry/2730_raw.ts";
import {P8,Hun} from "../telemetry/1449_model.ts";
import {we} from "../../vendor/m455.ts";
import {hn} from "../../vendor/m251.ts";
/**
 * Merges OAuth account fields from a bootstrap response into the stored account record.
 * Only updates if account_uuid matches (or is absent).
 */
function mwa(currentAccount: any, responseAccount: any): any {
  if (!currentAccount || !responseAccount) return currentAccount;
  if (responseAccount.account_uuid != null && responseAccount.account_uuid !== currentAccount.accountUuid) return currentAccount;
  let updatedFields: any = {
    organizationType: responseAccount.organization_type ?? null,
    organizationRateLimitTier: responseAccount.organization_rate_limit_tier ?? null,
    userRateLimitTier: responseAccount.user_rate_limit_tier ?? null,
    seatTier: responseAccount.seat_tier ?? null
  };
  if (responseAccount.account_email != null) updatedFields.emailAddress = responseAccount.account_email;
  if (responseAccount.organization_uuid != null) updatedFields.organizationUuid = responseAccount.organization_uuid;
  if (responseAccount.organization_name != null) updatedFields.organizationName = responseAccount.organization_name;
  return {
    ...currentAccount,
    ...updatedFields
  };
}

/**
 * Fetches bootstrap data from the API (first-party or gateway).
 * Returns bootstrap payload or null if skipped/unavailable.
 */
async function Yup(): Promise<any> {
  if (getAPIProvider() === "gateway") {
    if (!je.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY) return logForDebugging("[Bootstrap] Skipped gateway /v1/models (CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY not set)"), {
      additional_model_options: []
    };
    return Xup();
  }
  if (ra()) return logForDebugging("[Bootstrap] Skipped: Nonessential traffic disabled"), null;
  if (getAPIProvider() !== "firstParty") return logForDebugging("[Bootstrap] Skipped: 3P provider"), null;
  // Core fetch helper: sends the bootstrap request with given base URL and auth headers
  let fetchBootstrap = async (baseUrl: any, authHeaders: any) => {
    logForDebugging("[Bootstrap] Fetching");
    let response = await fo.get(`${baseUrl}/api/claude_cli/bootstrap`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": tg(),
          ...mLr(),
          ...authHeaders
        },
        params: {
          entrypoint: k2(),
          model: normalizeModelStringForAPI(getMainLoopModel())
        },
        timeout: 5000
      }),
      parseResult = zup().safeParse(response.data);
    if (!parseResult.success) return logForDebugging(`[Bootstrap] Response failed validation: ${parseResult.error.message}`), isTmuxControlMode("api_bootstrap_fetch", "parse_failed"), null;
    return logForDebugging("[Bootstrap] Fetch ok"), parseResult.data;
  };
  let apiKey = getAnthropicApiKey();
  // WIF (Workload Identity Federation) auth path
  if (!apiKey && shouldUseWIFAuth()) try {
    let [tokenCache, wifCredentials] = await Promise.all([getWIFTokenCache(), getWIFCredentials()]);
    if (tokenCache !== null) return await fetchBootstrap(je.ANTHROPIC_BASE_URL || wifCredentials?.baseURL || getOauthConfig().BASE_API_URL, {
      ...wifCredentials?.extraHeaders,
      Authorization: `Bearer ${await tokenCache.getToken()}`,
      "anthropic-beta": OAUTH_BETA_HEADER
    });
  } catch (wifError) {
    return logForDebugging(`[Bootstrap] WIF fetch failed: ${fo.isAxiosError(wifError) ? wifError.response?.status ?? wifError.code : wifError instanceof Error ? wifError.constructor.name : "unknown"}`), isTmuxControlMode("api_bootstrap_fetch", "wif_unavailable"), null;
  }
  // OAuth / API key path
  if (!(getClaudeAIOAuthTokens()?.accessToken && hasProfileScope()) && !apiKey) return logForDebugging("[Bootstrap] Skipped: no usable OAuth, WIF, or API key"), null;
  try {
    return await withOAuth401Retry(async () => {
      let oauthAccessToken = getClaudeAIOAuthTokens()?.accessToken,
        headers: any;
      if (oauthAccessToken && hasProfileScope()) headers = {
        Authorization: `Bearer ${oauthAccessToken}`,
        "anthropic-beta": OAUTH_BETA_HEADER
      };else if (apiKey) headers = {
        "x-api-key": apiKey
      };else return logForDebugging("[Bootstrap] No auth available on retry, aborting"), null;
      return fetchBootstrap(getOauthConfig().BASE_API_URL, headers);
    });
  } catch (fetchError) {
    throw logForDebugging(`[Bootstrap] Fetch failed: ${fo.isAxiosError(fetchError) ? fetchError.response?.status ?? fetchError.code : "unknown"}`), Oe("api_bootstrap_fetch", "request_failed"), fetchError;
  }
}

/**
 * Fetches bootstrap data and persists the result to global config cache.
 * Skips the write if nothing changed.
 */
async function Aat(): Promise<void> {
  try {
    let bootstrapData = await Yup();
    if (!bootstrapData) return;
    Ie("api_bootstrap_fetch");
    let clientData = bootstrapData.client_data ?? null,
      additionalModelOptions = bootstrapData.additional_model_options ?? [],
      additionalModelCosts = bootstrapData.additional_model_costs ?? {},
      autoCompactWindows = bootstrapData.auto_compact_windows ?? null,
      globalConfig = getGlobalConfig(),
      mergedOauthAccount = mwa(globalConfig.oauthAccount, bootstrapData.oauth_account),
      oauthAccountUnchanged = aT(mergedOauthAccount, globalConfig.oauthAccount);
    if (aT(globalConfig.clientDataCache, clientData) && aT(globalConfig.additionalModelOptionsCache, additionalModelOptions) && aT(globalConfig.additionalModelCostsCache, additionalModelCosts) && aT(globalConfig.autoCompactWindowsCache ?? null, autoCompactWindows) && oauthAccountUnchanged) {
      logForDebugging("[Bootstrap] Cache unchanged, skipping write");
      return;
    }
    logForDebugging("[Bootstrap] Cache updated, persisting to disk"), saveGlobalConfig(existingConfig => ({
      ...existingConfig,
      clientDataCache: clientData,
      additionalModelOptionsCache: additionalModelOptions,
      additionalModelCostsCache: additionalModelCosts,
      autoCompactWindowsCache: autoCompactWindows,
      oauthAccount: mwa(existingConfig.oauthAccount, bootstrapData.oauth_account)
    }));
  } catch (err) {
    if (K_(err)) logForDebugging(`[Bootstrap] fetchBootstrapData failed: ${err}`, {
      level: "error"
    });else De(err);
  }
}

/**
 * Fetches available models from the gateway /v1/models endpoint.
 * Filters to Claude/Anthropic models and maps them to option objects.
 */
async function Xup(): Promise<any> {
  await oCe();
  let gatewayAuth = getGatewayAuth();
  if (!gatewayAuth) return null;
  try {
    let response = await fo.get(`${gatewayAuth.url}/v1/models`, {
        headers: {
          Authorization: `Bearer ${gatewayAuth.jwt}`,
          "anthropic-version": "2023-06-01",
          "User-Agent": tg()
        },
        params: {
          limit: 1000
        },
        timeout: 5000
      }),
      parseResult = Jup().safeParse(response.data);
    if (!parseResult.success) return logForDebugging(`[Bootstrap] Gateway /v1/models failed validation: ${parseResult.error.message}`), null;
    // Filter to Claude/Anthropic models, exclude non-standard aliases
    let modelOptions = parseResult.data.data.filter((modelEntry: any) => /^(claude|anthropic)/i.test(modelEntry.id)).filter((modelEntry: any) => {
      let aliasType = W1e(modelEntry.id);
      return aliasType === null || aliasType === MEe;
    }).map((modelEntry: any) => ({
      value: modelEntry.id,
      label: modelEntry.display_name ?? modelEntry.id,
      description: modelEntry.description ?? ""
    }));
    return logForDebugging(`[Bootstrap] Gateway /v1/models → ${modelOptions.length} custom options`), {
      additional_model_options: modelOptions
    };
  } catch (fetchError) {
    return logForDebugging(`[Bootstrap] Gateway /v1/models fetch failed: ${fo.isAxiosError(fetchError) ? fetchError.response?.status ?? fetchError.code : "unknown"}`), null;
  }
}
var zup, Jup;
// Module initializer: sets up lazy Zod schema validators for bootstrap response shapes
var mNn = b(() => {
  Gp();
  durationUnitMillis();
  Ao();
  iv();
  lt();
  Dc();
  Qn();
  qe();
  xH();
  Lr();
  bt();
  PYe();
  fk();
  Rn();
  z2();
  eW();
  Mo();
  li();
  P8();
  Ap();
  ln();
  LYe();
  NBe();
  zup = we(() => hn.object({
    client_data: hn.record(hn.unknown()).nullish(),
    additional_model_options: hn.array(hn.object({
      model: hn.string(),
      name: hn.string(),
      description: hn.string(),
      disabled_reason: hn.string().nullish()
    }).transform(({
      model: e,
      name: t,
      description: n,
      disabled_reason: r
    }) => {
      let o = W1e(normalizeModelStringForAPI(e)),
        s = o ? getMarketingNameForModel(e) : null,
        i = n;
      if (o && s && r == null) {
        let a = n ? n.startsWith(s) ? n : `${s} \xB7 ${n}` : s,
          l = Hun(e);
        if (i = l && !isClaudeAISubscriber() && !a.includes("per Mtok") ? `${a} \xB7 ${l}` : a, o === MEe && isClaudeAISubscriber() && !D0() && !the().hideRateLimitsDescription) i = X$() ? `${i} \xB7 Draws from usage credits` : `${i} \xB7 Uses your limits ~2\xD7 faster than Opus`;
      }
      return {
        value: e,
        label: r != null ? `${t} (disabled)` : t,
        description: r ? i ? `${i} \xB7 ${r}` : r : i,
        ...(r != null && {
          disabled: !0
        })
      };
    })).nullish(),
    additional_model_costs: hn.record(hn.object({
      input_tokens: hn.number(),
      output_tokens: hn.number(),
      prompt_cache_write_tokens: hn.number(),
      prompt_cache_write_1h_tokens: hn.number().nullish(),
      prompt_cache_read_tokens: hn.number(),
      web_search_requests: hn.number().nullish()
    }).transform(e => ({
      inputTokens: e.input_tokens,
      outputTokens: e.output_tokens,
      promptCacheWriteTokens: e.prompt_cache_write_tokens,
      ...(e.prompt_cache_write_1h_tokens != null && {
        promptCacheWrite1hTokens: e.prompt_cache_write_1h_tokens
      }),
      promptCacheReadTokens: e.prompt_cache_read_tokens,
      webSearchRequests: e.web_search_requests ?? 0.01
    }))).nullish(),
    oauth_account: hn.object({
      account_uuid: hn.string().nullish(),
      account_email: hn.string().nullish(),
      organization_uuid: hn.string().nullish(),
      organization_name: hn.string().nullish(),
      organization_type: hn.string().nullish(),
      organization_rate_limit_tier: hn.string().nullish(),
      user_rate_limit_tier: hn.string().nullish(),
      seat_tier: hn.string().nullish()
    }).passthrough().nullish(),
    auto_compact_windows: hn.record(hn.string(), hn.number().int()).nullish()
  }));
  Jup = we(() => hn.object({
    data: hn.array(hn.object({
      id: hn.string(),
      display_name: hn.string().nullish(),
      description: hn.string().nullish()
    }))
  }));
});
export {mwa,Yup,Aat,Xup,zup,Jup,mNn};
