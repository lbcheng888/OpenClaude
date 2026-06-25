// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {FNe as TM_,h2 as vm} from "../../vendor/m1285.ts";
import {Ne as oH,AR as Sy} from "../../vendor/m583.ts";
import {lt as w_} from "../session/0132_sent.ts";
import {dn as A6} from "../config/0137_namespace.ts";
// Subsystem: api — Anthropic API client / streaming / message assembly.
//
// This module resolves which API "provider" (backend) the client should talk
// to (first-party Anthropic API, Amazon Bedrock, Google Vertex, Microsoft
// Foundry, the "anthropicAws" Claude Platform on AWS, the Bedrock "mantle"
// variant, or a cloud gateway) based on environment variables, and exposes a
// set of predicates describing that provider's capabilities and routing.

/**
 * The API provider/backend identifier.
 * - "firstParty": the public Anthropic API (api.anthropic.com).
 * - "bedrock": Amazon Bedrock.
 * - "vertex": Google Vertex AI.
 * - "foundry": Microsoft Foundry.
 * - "anthropicAws": Claude Platform on AWS.
 * - "mantle": Amazon Bedrock (Mantle variant).
 * - "gateway": a cloud gateway proxy.
 */
type ApiProvider = "firstParty" | "bedrock" | "vertex" | "foundry" | "anthropicAws" | "mantle" | "gateway";

/** Per-provider model-id mapping returned by TM_(): provider name -> concrete model id (or null when unavailable for that provider). */
type ModelProviderMap = Partial<Record<ApiProvider, string | null>>;

// Bundler-generated namespace object holding this module's exports; wired up by
// the __export helper (j_) below. (file-local artifact)
var moduleExports = {};
j_(moduleExports, {
  usesFirstPartyModelIds: () => usesFirstPartyModelIds,
  shouldPropagateTraceContext: () => shouldPropagateTraceContext,
  isFirstPartyProvider: () => isFirstPartyProvider,
  isFirstPartyApiBackend: () => isFirstPartyApiBackend,
  isFirstPartyAnthropicHost: () => isFirstPartyAnthropicHost,
  isFirstPartyAnthropicBaseUrl: () => isFirstPartyAnthropicBaseUrl,
  isActualFirstPartyAnthropicBaseUrl: () => isActualFirstPartyAnthropicBaseUrl,
  hasFirstPartyCapabilities: () => hasFirstPartyCapabilities,
  getSecondaryProvider: () => getSecondaryProvider,
  getProviderForModel: () => getProviderForModel,
  getAPIProviderForAnalytics: () => getAPIProviderForAnalytics,
  getAPIProvider: () => getAPIProvider,
  THIRD_PARTY_PROVIDER_LABELS: () => THIRD_PARTY_PROVIDER_LABELS
});

/**
 * Resolve the active API provider from environment variables.
 * The first truthy CLAUDE_CODE_USE_* flag wins; defaults to "firstParty".
 */
function getAPIProvider(): ApiProvider {
  return q_(process.env.CLAUDE_CODE_USE_BEDROCK) ? "bedrock" : q_(process.env.CLAUDE_CODE_USE_FOUNDRY) ? "foundry" : q_(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) ? "anthropicAws" : q_(process.env.CLAUDE_CODE_USE_MANTLE) ? "mantle" : q_(process.env.CLAUDE_CODE_USE_VERTEX) ? "vertex" : "firstParty";
}

/** The active API provider, normalized for analytics/telemetry reporting. */
function getAPIProviderForAnalytics() {
  return tH(getAPIProvider());
}

/** Whether the active provider is the first-party Anthropic API. */
function isFirstPartyProvider(): boolean {
  return getAPIProvider() === "firstParty";
}

/**
 * Optional secondary provider that can fulfill requests alongside the primary.
 * Currently only Bedrock with the CLAUDE_CODE_USE_MANTLE flag yields "mantle".
 */
function getSecondaryProvider(): ApiProvider | null {
  if (getAPIProvider() === "bedrock" && q_(process.env.CLAUDE_CODE_USE_MANTLE)) return "mantle";
  return null;
}

/**
 * True for Bedrock "mantle"-style model ids: a name prefixed with "anthropic."
 * that is NOT version-suffixed (e.g. "...-v1" / "...-v2:0").
 */
function isUnversionedAnthropicBedrockModelId(modelId: string): boolean {
  return modelId.startsWith("anthropic.") && !/-v\d+(:\d+)?$/.test(modelId);
}

/**
 * Pick the provider to use for a specific model id. Falls back to the primary
 * provider unless a secondary provider is configured and is the only one that
 * can serve this model (or the model is a mantle-style Bedrock id).
 */
function getProviderForModel(modelId?: string): ApiProvider {
  if (modelId) {
    let secondaryProvider = getSecondaryProvider();
    if (secondaryProvider) {
      if (secondaryProvider === "mantle" && isUnversionedAnthropicBedrockModelId(modelId)) return secondaryProvider;
      let primaryProvider = getAPIProvider(),
        modelProviderMap: ModelProviderMap | null | undefined = TM_(modelId);
      if (modelProviderMap && modelProviderMap[primaryProvider] === null && modelProviderMap[secondaryProvider] !== null) return secondaryProvider;
    }
  }
  return getAPIProvider();
}

/**
 * Whether the given provider (default: active) uses first-party Anthropic
 * model ids (firstParty, anthropicAws, gateway).
 */
function usesFirstPartyModelIds(provider: ApiProvider = getAPIProvider()): boolean {
  return provider === "firstParty" || provider === "anthropicAws" || provider === "gateway";
}

/**
 * Whether the given provider (default: active) exposes first-party
 * capabilities (firstParty, anthropicAws, foundry, mantle).
 */
function hasFirstPartyCapabilities(provider: ApiProvider = getAPIProvider()): boolean {
  return provider === "firstParty" || provider === "anthropicAws" || provider === "foundry" || provider === "mantle";
}

/** True when both the provider is first-party AND the base URL points at the first-party API. */
function isFirstPartyApiBackend(): boolean {
  return getAPIProvider() === "firstParty" && isFirstPartyAnthropicBaseUrl();
}

/**
 * Whether the configured base URL is the first-party Anthropic API.
 * Honors the _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL override.
 */
function isFirstPartyAnthropicBaseUrl(): boolean {
  if (oH._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL) return !0;
  return isActualFirstPartyAnthropicBaseUrl();
}

/**
 * Whether ANTHROPIC_BASE_URL actually resolves to the first-party host.
 * An unset base URL is treated as first-party.
 */
function isActualFirstPartyAnthropicBaseUrl(): boolean {
  let baseUrl = process.env.ANTHROPIC_BASE_URL;
  if (!baseUrl) return !0;
  return isFirstPartyAnthropicHost(baseUrl);
}

/** Whether the given URL's host is the first-party Anthropic API host. */
function isFirstPartyAnthropicHost(url: string): boolean {
  try {
    let host = new URL(url).host;
    return ["api.anthropic.com"].includes(host);
  } catch {
    return !1;
  }
}

/**
 * Whether W3C trace context (traceparent) should be propagated on requests:
 * true for the first-party base URL or when CLAUDE_CODE_PROPAGATE_TRACEPARENT is set.
 */
function shouldPropagateTraceContext(): boolean {
  return isFirstPartyAnthropicBaseUrl() || q_(process.env.CLAUDE_CODE_PROPAGATE_TRACEPARENT);
}

/** Human-readable labels for the third-party (non-firstParty) providers. */
var THIRD_PARTY_PROVIDER_LABELS: Partial<Record<ApiProvider, string>>;

// Lazy module initializer (bundler __esmMin entry); referenced across modules
// as V7() to ensure this module's side-effecting setup has run.
var V7 = L(() => {
  w_();
  Sy();
  A6();
  vm();
  THIRD_PARTY_PROVIDER_LABELS = {
    bedrock: "Amazon Bedrock",
    vertex: "Google Vertex AI",
    foundry: "Microsoft Foundry",
    anthropicAws: "Claude Platform on AWS",
    mantle: "Amazon Bedrock (Mantle)",
    gateway: "Cloud gateway"
  };
});
export {moduleExports as dBs,getAPIProvider,getAPIProviderForAnalytics,isFirstPartyProvider,getSecondaryProvider,isUnversionedAnthropicBedrockModelId as PBu,getProviderForModel,usesFirstPartyModelIds,hasFirstPartyCapabilities,isFirstPartyApiBackend,isFirstPartyAnthropicBaseUrl,isActualFirstPartyAnthropicBaseUrl,isFirstPartyAnthropicHost,shouldPropagateTraceContext,THIRD_PARTY_PROVIDER_LABELS,V7 as Ps};
