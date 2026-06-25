// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {XU,rI} from "../config/0586_rI.ts";
import {normalizeModelStringForAPI as Pp,getMainLoopModel as gs,Ro,getMarketingNameForModel as ug} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr,setClientDataCacheKeyGetter as xao} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getAPIProvider as Rr,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {Ne} from "../../vendor/m583.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {ho} from "../../vendor/m572.ts";
import {WFr,PBe} from "../config/2026_error.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {getAnthropicApiKey as Gv,shouldUseWIFAuth as dE,getClaudeAIOAuthTokens as qs,Vv,lo,isClaudeAISubscriber as Eo} from "../config/2036_withOAuthRefreshLock.ts";
import {getWIFTokenCache as qAe,getWIFCredentials as DXe,PXe} from "./1489_withCredentialsLock.ts";
import {getOauthConfig as Hs,OAUTH_BETA_HEADER as eI,Sc} from "./0465_getOauthConfig.ts";
import {withOAuth401Retry as N0,kk} from "./2037_withOAuth401Retry.ts";
import {Rbn,WSi,VSi,_$r} from "../../vendor/m2207.ts";
import {J_,$X} from "../../vendor/m446.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {__export as j_,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {$Ae,xXe} from "../../vendor/m1486.ts";
import {z_,lt} from "../session/0132_sent.ts";
import {Fg} from "../../vendor/m5.ts";
import {FNe,TAe,h2} from "../../vendor/m1285.ts";
import {ap} from "../../vendor/m573.ts";
import {MS} from "../../vendor/m460.ts";
import {Ir} from "../../vendor/m584.ts";
import {ej,tB,Tae} from "../telemetry/2743_raw.ts";
import {h7,b5s} from "../telemetry/1454_model.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
/**
 * Bootstrap data fetching for Claude Code.
 *
 * Calls the `/api/claude_cli/bootstrap` (firstParty) or gateway `/v1/models`
 * endpoints to retrieve client data, additional model options/costs, model
 * access entitlements, auto-compact windows, and the caller's OAuth account.
 * Results are validated with zod and cached to disk (per-org slots) so that
 * unchanged payloads avoid redundant writes.
 */

/** Module export namespace object (populated by `ft` below). */
var Iao = {};
ft(Iao, {
  fetchBootstrapData: () => fetchBootstrapData,
  buildBootstrapRequestConfig: () => buildBootstrapRequestConfig,
  buildBootstrapInputs: () => buildBootstrapInputs
});

/**
 * Collect the inputs needed to issue a bootstrap request:
 * entrypoint, resolved model, CLI version string, and the active org UUID.
 */
function buildBootstrapInputs() {
  return {
    entrypoint: XU(),
    model: Pp(gs()),
    ccVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    organizationUuid: Ot().oauthAccount?.organizationUuid ?? null
  };
}

/**
 * Build the HTTP request config (query params + user agent) from bootstrap inputs.
 * @param bootstrapInputs result of {@link buildBootstrapInputs}
 */
function buildBootstrapRequestConfig(bootstrapInputs) {
  return {
    params: {
      entrypoint: bootstrapInputs.entrypoint,
      model: bootstrapInputs.model
    },
    userAgent: `claude-code/${bootstrapInputs.ccVersion}`
  };
}

/**
 * Merge a server-returned `oauth_account` payload into the locally cached
 * OAuth account, mapping snake_case fields to camelCase. Returns the existing
 * account unchanged if either side is missing or the account UUID mismatches.
 * @param existingAccount currently cached OAuth account
 * @param oauthAccountPayload server `oauth_account` object (snake_case)
 */
function HDa(existingAccount, oauthAccountPayload) {
  if (!existingAccount || !oauthAccountPayload) return existingAccount;
  if (oauthAccountPayload.account_uuid != null && oauthAccountPayload.account_uuid !== existingAccount.accountUuid) return existingAccount;
  let mergedFields = {
    organizationType: oauthAccountPayload.organization_type ?? null,
    organizationRateLimitTier: oauthAccountPayload.organization_rate_limit_tier ?? null,
    userRateLimitTier: oauthAccountPayload.user_rate_limit_tier ?? null,
    seatTier: oauthAccountPayload.seat_tier ?? null
  };
  if (oauthAccountPayload.account_email != null) mergedFields.emailAddress = oauthAccountPayload.account_email;
  if (oauthAccountPayload.organization_uuid != null) mergedFields.organizationUuid = oauthAccountPayload.organization_uuid;
  if (oauthAccountPayload.organization_name != null) mergedFields.organizationName = oauthAccountPayload.organization_name;
  return {
    ...existingAccount,
    ...mergedFields
  };
}

/**
 * Perform the actual bootstrap network fetch, selecting endpoint and auth
 * (gateway model discovery, WIF, OAuth bearer, or API key) based on the
 * current provider mode and available credentials. Returns the validated
 * response payload, or null when skipped / no usable auth.
 * @param bootstrapInputs result of {@link buildBootstrapInputs}
 */
async function Mbp(bootstrapInputs) {
  if (Rr() === "gateway") {
    if (!Ne.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY) return A("[Bootstrap] Skipped gateway /v1/models (CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY not set)"), {
      additional_model_options: []
    };
    return Fbp();
  }
  if (Vi()) return A("[Bootstrap] Skipped: Nonessential traffic disabled"), null;
  if (Rr() !== "firstParty") return A("[Bootstrap] Skipped: 3P provider"), null;
  let {
      params: requestParams,
      userAgent: userAgentHeader
    } = buildBootstrapRequestConfig(bootstrapInputs),
    fetchFromBaseUrl = async (baseUrl, authHeaders) => {
      A("[Bootstrap] Fetching");
      let response = await ho.get(`${baseUrl}/api/claude_cli/bootstrap`, {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": userAgentHeader,
            ...WFr(),
            ...authHeaders
          },
          params: requestParams,
          timeout: 5000
        }),
        parsed = Lbp().safeParse(response.data);
      if (!parsed.success) return A(`[Bootstrap] Response failed validation: ${parsed.error.message}`), Pt("api_bootstrap_fetch", "parse_failed"), null;
      return A("[Bootstrap] Fetch ok"), parsed.data;
    },
    apiKey = Gv();
  if (!apiKey && dE()) try {
    let [wifCredentials, providerConfig] = await Promise.all([qAe(), DXe()]);
    if (wifCredentials !== null) return await fetchFromBaseUrl(Ne.ANTHROPIC_BASE_URL || providerConfig?.baseURL || Hs().BASE_API_URL, {
      ...providerConfig?.extraHeaders,
      Authorization: `Bearer ${await wifCredentials.getToken()}`,
      "anthropic-beta": eI
    });
  } catch (wifError) {
    return A(`[Bootstrap] WIF fetch failed: ${ho.isAxiosError(wifError) ? wifError.response?.status ?? wifError.code : wifError instanceof Error ? wifError.constructor.name : "unknown"}`), Pt("api_bootstrap_fetch", "wif_unavailable"), null;
  }
  if (!(qs()?.accessToken && Vv()) && !apiKey) return A("[Bootstrap] Skipped: no usable OAuth, WIF, or API key"), null;
  try {
    return await N0(async () => {
      let accessToken = qs()?.accessToken,
        authHeaders;
      if (accessToken && Vv()) authHeaders = {
        Authorization: `Bearer ${accessToken}`,
        "anthropic-beta": eI
      };else if (apiKey) authHeaders = {
        "x-api-key": apiKey
      };else return A("[Bootstrap] No auth available on retry, aborting"), null;
      return fetchFromBaseUrl(Hs().BASE_API_URL, authHeaders);
    });
  } catch (fetchError) {
    throw A(`[Bootstrap] Fetch failed: ${ho.isAxiosError(fetchError) ? fetchError.response?.status ?? fetchError.code : "unknown"}`), xe("api_bootstrap_fetch", "request_failed"), fetchError;
  }
}

/**
 * Top-level entrypoint: gather inputs, fetch bootstrap data, merge the OAuth
 * account, and persist client data / model options / costs / access / windows
 * into the per-org cache slots when the payload has changed.
 */
async function fetchBootstrapData() {
  try {
    let bootstrapInputs = buildBootstrapInputs(),
      bootstrapResponse = await Mbp(bootstrapInputs);
    if (!bootstrapResponse) return;
    He("api_bootstrap_fetch");
    let clientData = bootstrapResponse.client_data ?? null,
      additionalModelOptions = bootstrapResponse.additional_model_options ?? [],
      additionalModelCosts = bootstrapResponse.additional_model_costs ?? {},
      modelAccess = bootstrapResponse.model_access ?? [],
      autoCompactWindows = bootstrapResponse.auto_compact_windows ?? null,
      config = Ot(),
      mergedOauthAccount = HDa(config.oauthAccount, bootstrapResponse.oauth_account),
      cacheKey = Rbn({
        ...bootstrapInputs,
        organizationUuid: mergedOauthAccount?.organizationUuid ?? bootstrapInputs.organizationUuid
      }),
      cachedSlot = config.clientDataCacheSlots?.[cacheKey],
      slotHit = cachedSlot !== void 0 && "data" in cachedSlot && typeof cachedSlot.at === "number",
      oauthAccountUnchanged = J_(mergedOauthAccount, config.oauthAccount),
      slotStale = slotHit && Date.now() - cachedSlot.at > WSi;
    if (W("tengu_client_data_cache_key", {
      slot_hit: slotHit,
      slot_changed: !slotHit || !J_(cachedSlot.data ?? null, clientData),
      legacy_fallback: !slotHit && config.clientDataCache != null,
      slot_stale: slotStale
    }), slotHit && J_(cachedSlot.data ?? null, clientData) && !slotStale && J_(config.additionalModelOptionsCache, additionalModelOptions) && J_(config.additionalModelCostsCache, additionalModelCosts) && J_(config.modelAccessCache ?? [], modelAccess) && J_(config.autoCompactWindowsCache ?? null, autoCompactWindows) && oauthAccountUnchanged) {
      A("[Bootstrap] Cache unchanged, skipping write");
      return;
    }
    A("[Bootstrap] Cache updated, persisting to disk"), hn(prevConfig => {
      let nextOauthAccount = HDa(prevConfig.oauthAccount, bootstrapResponse.oauth_account),
        nextCacheKey = Rbn({
          ...bootstrapInputs,
          organizationUuid: nextOauthAccount?.organizationUuid ?? null
        });
      return {
        ...prevConfig,
        clientDataCacheSlots: VSi(prevConfig.clientDataCacheSlots, nextCacheKey, {
          data: clientData,
          at: Date.now()
        }),
        additionalModelOptionsCache: additionalModelOptions,
        additionalModelCostsCache: additionalModelCosts,
        modelAccessCache: modelAccess,
        autoCompactWindowsCache: autoCompactWindows,
        oauthAccount: nextOauthAccount
      };
    });
  } catch (error) {
    if (j_(error)) A(`[Bootstrap] fetchBootstrapData failed: ${error}`, {
      level: "error"
    });else Ie(error);
  }
}

/**
 * Gateway model-discovery path: fetch `/v1/models`, filter to claude/anthropic
 * models for the current account tier, and map them into the
 * `additional_model_options` shape.
 */
async function Fbp() {
  await $Ae();
  let gatewayConfig = z_();
  if (!gatewayConfig) return null;
  try {
    let response = await ho.get(`${gatewayConfig.url}/v1/models`, {
        headers: {
          Authorization: `Bearer ${gatewayConfig.jwt}`,
          "anthropic-version": "2023-06-01",
          "User-Agent": Fg()
        },
        params: {
          limit: 1000
        },
        timeout: 5000
      }),
      parsed = Nbp().safeParse(response.data);
    if (!parsed.success) return A(`[Bootstrap] Gateway /v1/models failed validation: ${parsed.error.message}`), null;
    let modelOptions = parsed.data.data.filter(model => /^(claude|anthropic)/i.test(model.id)).filter(model => {
      let modelTier = FNe(model.id);
      return modelTier === null || modelTier === TAe;
    }).map(model => ({
      value: model.id,
      label: model.display_name ?? model.id,
      description: model.description ?? ""
    }));
    return A(`[Bootstrap] Gateway /v1/models → ${modelOptions.length} custom options`), {
      additional_model_options: modelOptions
    };
  } catch (gatewayError) {
    return A(`[Bootstrap] Gateway /v1/models fetch failed: ${ho.isAxiosError(gatewayError) ? gatewayError.response?.status ?? gatewayError.code : "unknown"}`), null;
  }
}

/** Lazily-initialized zod schemas: bootstrap response and gateway models response. */
var Lbp, Nbp;
var pct = b(() => {
  ap();
  $X();
  lo();
  MS();
  lt();
  Sc();
  tr();
  qe();
  rI();
  Ir();
  Ct();
  xXe();
  kk();
  vn();
  h2();
  ej();
  Ro();
  Ps();
  h7();
  $d();
  mn();
  kt();
  PXe();
  _$r();
  PBe();
  Lbp = ve(() => jt.object({
    client_data: jt.record(jt.unknown()).nullish(),
    additional_model_options: jt.array(jt.object({
      model: jt.string(),
      name: jt.string(),
      description: jt.string(),
      disabled_reason: jt.string().nullish()
    }).transform(({
      model: modelId,
      name: modelName,
      description: modelDescription,
      disabled_reason: disabledReason
    }) => {
      let modelTier = FNe(Pp(modelId)),
        tierLabel = modelTier ? ug(modelId) : null,
        resolvedDescription = modelDescription;
      if (modelTier && tierLabel && disabledReason == null) {
        let labeledDescription = modelDescription ? modelDescription.startsWith(tierLabel) ? modelDescription : `${tierLabel} \xB7 ${modelDescription}` : tierLabel,
          pricingLabel = b5s(modelId);
        if (resolvedDescription = pricingLabel && !Eo() && !labeledDescription.includes("per Mtok") ? `${labeledDescription} \xB7 ${pricingLabel}` : labeledDescription, modelTier === TAe && Eo() && !tB() && Tae()) resolvedDescription = `${resolvedDescription} \xB7 Requires usage credits`;
      }
      return {
        value: modelId,
        label: disabledReason != null ? `${modelName} (disabled)` : modelName,
        description: disabledReason ? resolvedDescription ? `${resolvedDescription} \xB7 ${disabledReason}` : disabledReason : resolvedDescription,
        ...(disabledReason != null && {
          disabled: !0
        })
      };
    })).nullish(),
    additional_model_costs: jt.record(jt.object({
      input_tokens: jt.number(),
      output_tokens: jt.number(),
      prompt_cache_write_tokens: jt.number(),
      prompt_cache_write_1h_tokens: jt.number().nullish(),
      prompt_cache_read_tokens: jt.number(),
      web_search_requests: jt.number().nullish()
    }).transform(costEntry => ({
      inputTokens: costEntry.input_tokens,
      outputTokens: costEntry.output_tokens,
      promptCacheWriteTokens: costEntry.prompt_cache_write_tokens,
      ...(costEntry.prompt_cache_write_1h_tokens != null && {
        promptCacheWrite1hTokens: costEntry.prompt_cache_write_1h_tokens
      }),
      promptCacheReadTokens: costEntry.prompt_cache_read_tokens,
      webSearchRequests: costEntry.web_search_requests ?? 0.01
    }))).nullish(),
    model_access: jt.array(jt.object({
      api_name: jt.string(),
      entitled: jt.boolean()
    }).transform(({
      api_name: apiName,
      entitled: entitled
    }) => ({
      apiName: apiName,
      entitled: entitled
    }))).nullish(),
    oauth_account: jt.object({
      account_uuid: jt.string().nullish(),
      account_email: jt.string().nullish(),
      organization_uuid: jt.string().nullish(),
      organization_name: jt.string().nullish(),
      organization_type: jt.string().nullish(),
      organization_rate_limit_tier: jt.string().nullish(),
      user_rate_limit_tier: jt.string().nullish(),
      seat_tier: jt.string().nullish()
    }).passthrough().nullish(),
    auto_compact_windows: jt.record(jt.string(), jt.unknown()).nullish()
  }));
  xao(() => Rbn(buildBootstrapInputs()));
  Nbp = ve(() => jt.object({
    data: jt.array(jt.object({
      id: jt.string(),
      display_name: jt.string().nullish(),
      description: jt.string().nullish()
    }))
  }));
});

export {Iao,buildBootstrapInputs,buildBootstrapRequestConfig,HDa,Mbp,fetchBootstrapData,Fbp,Lbp,Nbp,pct};
