// @ts-nocheck
import {Owt as dD_,Pwt as cD_} from "../../vendor/m1184.ts";
import {t2 as wF,E1e as GdH} from "../../vendor/m614.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {getAWSClientProxyConfig as DnH,ey as Af} from "./1026_shouldBypassProxyWithCidr.ts";
import {x as u,b as L} from "../../runtime.ts";
import {T3 as hm} from "../../vendor/m755.ts";
import {Zu as P3} from "../../vendor/m855.ts";
import {refreshAndGetAwsCredentials as ll,lo as Mq} from "./2036_withOAuthRefreshLock.ts";
import {Odn as x96,wHr as Ej8} from "../../vendor/m1283.ts";
import {hwt as ND_,Lln as m66} from "../../vendor/m1026.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {lt as w_,setInferenceProfileBackingModel as Ke6} from "../session/0132_sent.ts";
import {qe as FH,logForDebugging as N} from "./0236_setHasFormattedOutput.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Bedrock client factory and inference-profile utilities.
 *
 * Exports (via `HOH` lazy-init module):
 *   - `OM_`  memoized list of anthropic inference profile IDs available in this account
 *   - `onH`  memoized resolver: inference-profile ID → backing model ID
 *
 * Internal helpers (not exported across modules):
 *   - `RDH`           find an inference-profile ID in a list by needle + optional region prefix
 *   - `createBedrockClient` / `createBedrockRuntimeClient`  factory functions
 *   - `isAnthropicModelId`, `extractModelIdFromArn`, `getBedrockRegionPrefix`,
 *     `adaptModelIdToRegion`, `getGeoRegionPrefix`, `stripModelDisplayMarkers`
 *
 * Cross-module symbols kept as-is to preserve linkage:
 *   j_, L, V6, u, N, c7, w_, Mq, GdH, FH, A6, Af, m66, ND_,
 *   wF, DnH, ll, q_, hm, P3, dD_, cD_, x96, Ej8, Ke6, AbortSignal
 */

/**
 * Find an inference-profile ID from `profileIds` that contains `needle`.
 * When `regionPrefix` is provided, prefer profiles whose ID starts with
 * `<regionPrefix>.<needle…>`.
 */
function RDH(profileIds: string[], needle: string, regionPrefix?: string): string | null {
  if (regionPrefix) {
    let preferred = profileIds.find(id => id.startsWith(`${regionPrefix}.`) && id.includes(needle));
    if (preferred) return preferred;
  }
  return profileIds.find(id => id.includes(needle)) ?? null;
}

/**
 * Create a low-level `BedrockClient` (control-plane) configured with the
 * current AWS region, optional proxy handler, and optional no-auth scheme
 * when `CLAUDE_CODE_SKIP_BEDROCK_AUTH` is set.
 */
async function createBedrockClient() {
  let {
      BedrockClient: BedrockClientClass
    } = await Promise.resolve().then(() => (dD_(), cD_)),
    region = await wF(),
    skipAuth = q_(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH),
    clientConfig: Record<string, unknown> = {
      region,
      ...(process.env.ANTHROPIC_BEDROCK_BASE_URL && {
        endpoint: process.env.ANTHROPIC_BEDROCK_BASE_URL
      }),
      ...(await DnH({
        url: process.env.ANTHROPIC_BEDROCK_BASE_URL || `https://bedrock.${region}.amazonaws.com`
      })),
      ...(skipAuth && {
        requestHandler: new (await Promise.resolve().then(() => u(hm(), 1))).NodeHttpHandler(),
        httpAuthSchemes: [{
          schemeId: "smithy.api#noAuth",
          identityProvider: () => async () => ({}),
          signer: new (await Promise.resolve().then(() => u(P3(), 1))).NoAuthSigner()
        }],
        httpAuthSchemeProvider: () => [{
          schemeId: "smithy.api#noAuth"
        }]
      })
    };
  if (!skipAuth && !process.env.AWS_BEARER_TOKEN_BEDROCK) {
    let awsCredentials = await ll();
    if (awsCredentials) clientConfig.credentials = {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
      sessionToken: awsCredentials.sessionToken
    };
  }
  return new BedrockClientClass(clientConfig);
}

/**
 * Create a `BedrockRuntimeClient` (data-plane) with the same auth/proxy
 * configuration as `createBedrockClient`.
 */
async function createBedrockRuntimeClient() {
  let {
      BedrockRuntimeClient: BedrockRuntimeClientClass
    } = await Promise.resolve().then(() => (x96(), Ej8)),
    region = await wF(),
    skipAuth = q_(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH),
    clientConfig: Record<string, unknown> = {
      region,
      ...(process.env.ANTHROPIC_BEDROCK_BASE_URL && {
        endpoint: process.env.ANTHROPIC_BEDROCK_BASE_URL
      }),
      ...(await DnH({
        url: process.env.ANTHROPIC_BEDROCK_BASE_URL || `https://bedrock-runtime.${region}.amazonaws.com`
      })),
      ...(skipAuth && {
        requestHandler: new (await Promise.resolve().then(() => u(hm(), 1))).NodeHttpHandler(),
        httpAuthSchemes: [{
          schemeId: "smithy.api#noAuth",
          identityProvider: () => async () => ({}),
          signer: new (await Promise.resolve().then(() => u(P3(), 1))).NoAuthSigner()
        }],
        httpAuthSchemeProvider: () => [{
          schemeId: "smithy.api#noAuth"
        }]
      })
    };
  if (!skipAuth && !process.env.AWS_BEARER_TOKEN_BEDROCK) {
    let awsCredentials = await ll();
    if (awsCredentials) clientConfig.credentials = {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
      sessionToken: awsCredentials.sessionToken
    };
  }
  return new BedrockRuntimeClientClass(clientConfig);
}

/**
 * Returns `true` when `modelId` is a first-party Anthropic model identifier
 * (i.e. starts with `"anthropic."`).
 */
function isAnthropicModelId(modelId: string): boolean {
  return modelId.startsWith("anthropic.");
}

/**
 * If `modelId` is an ARN, return only the final path segment (the bare model
 * ID).  Otherwise return the string unchanged.
 */
function extractModelIdFromArn(modelId: string): string {
  if (!modelId.startsWith("arn:")) return modelId;
  let slashIdx = modelId.lastIndexOf("/");
  if (slashIdx === -1) return modelId;
  return modelId.substring(slashIdx + 1);
}

/**
 * Extract the Bedrock cross-region region prefix (e.g. `"us"`, `"eu"`) from a
 * model ID that may contain one.  Returns `undefined` when no prefix is found.
 */
function getBedrockRegionPrefix(modelId: string): string | undefined {
  let bareId = extractModelIdFromArn(modelId);
  for (let prefix of ND_) if (bareId.startsWith(`${prefix}.anthropic.`)) return prefix;
  return;
}

/**
 * Replace an existing Bedrock cross-region prefix in `modelId` with `newPrefix`,
 * or prepend `newPrefix` when the model is a plain `anthropic.*` ID.
 * Returns `modelId` unchanged when it carries no prefix and is not first-party.
 */
function adaptModelIdToRegion(modelId: string, newPrefix: string): string {
  let existingPrefix = getBedrockRegionPrefix(modelId);
  if (existingPrefix) return modelId.replace(`${existingPrefix}.`, `${newPrefix}.`);
  if (isAnthropicModelId(modelId)) return `${newPrefix}.${modelId}`;
  return modelId;
}

/**
 * Map an AWS region string to a Bedrock geo-region prefix used in model IDs.
 * Falls back to `"global"` for unrecognised regions.
 */
function getGeoRegionPrefix(awsRegion: string | null | undefined): string {
  let region = awsRegion ?? "";
  if (region.startsWith("us-gov-")) return "us-gov";
  if (region.startsWith("us-")) return "us";
  if (region.startsWith("eu-")) return "eu";
  if (region.startsWith("ap-")) return "apac";
  return "global";
}

/**
 * Strip ANSI-style dim/bright markers (`[1m]` / `[2m]`) that some Bedrock
 * model-display strings embed.
 */
var stripModelDisplayMarkers = (modelId: string) => modelId.replace(/\[(1|2)m\]/gi, ""),
  /** Memoized list of anthropic inference-profile IDs (populated inside HOH). */
  OM_: (() => Promise<string[]>) | undefined,
  /**
   * Memoized resolver: given an inference-profile ID, return the backing
   * model ID (populated inside HOH).
   */
  onH: ((profileId: string) => Promise<string | null>) | undefined;

/** Lazy-init module: sets up `OM_` and `onH`. */
var HOH = L(() => {
  c7();
  w_();
  Mq();
  GdH();
  FH();
  A6();
  Af();
  m66();
  m66();

  /**
   * List all SYSTEM_DEFINED inference profiles available in the account and
   * return those whose ID contains `"anthropic"`.
   */
  OM_ = V6(async function (): Promise<string[]> {
    let [bedrockClient, {
        ListInferenceProfilesCommand
      }] = await Promise.all([createBedrockClient(), Promise.resolve().then(() => (dD_(), cD_))]),
      profileIds: string[] = [],
      nextToken: string | undefined;
    try {
      do {
        let command = new ListInferenceProfilesCommand({
            ...(nextToken && {
              nextToken
            }),
            typeEquals: "SYSTEM_DEFINED"
          }),
          response = await bedrockClient.send(command, {
            abortSignal: AbortSignal.timeout(8000)
          });
        if (response.inferenceProfileSummaries) profileIds.push(...response.inferenceProfileSummaries);
        nextToken = response.nextToken;
      } while (nextToken);
      return profileIds.filter((entry: any) => entry.inferenceProfileId?.includes("anthropic")).map((entry: any) => entry.inferenceProfileId).filter(Boolean);
    } catch (err) {
      throw N(`Bedrock ListInferenceProfiles failed: ${err instanceof Error ? err.message : String(err)}`, {
        level: "error"
      }), err;
    }
  });

  /**
   * Resolve `profileId` to the ARN of its first backing model, then strip
   * the path prefix to return only the bare model ID.  Stores the result in
   * the shared inference-profile cache via `Ke6`.
   */
  onH = V6(async function (profileId: string): Promise<string | null> {
    let normalizedId = stripModelDisplayMarkers(profileId),
      backingModelId: string | null = null;
    try {
      let [bedrockClient, {
          GetInferenceProfileCommand
        }] = await Promise.all([createBedrockClient(), Promise.resolve().then(() => (dD_(), cD_))]),
        modelArn = (await bedrockClient.send(new GetInferenceProfileCommand({
          inferenceProfileIdentifier: normalizedId
        }), {
          abortSignal: AbortSignal.timeout(8000)
        })).models?.[0]?.modelArn;
      if (modelArn) {
        let slashIdx = modelArn.lastIndexOf("/");
        backingModelId = slashIdx >= 0 ? modelArn.substring(slashIdx + 1) : modelArn;
      }
    } catch (err) {
      N(`Failed to resolve Bedrock inference profile backing model for ${normalizedId}: ${err instanceof Error ? err.message : String(err)}`, {
        level: "error"
      });
    }
    return Ke6(normalizedId, backingModelId), backingModelId;
  }, stripModelDisplayMarkers);
});
export {RDH as _Ae,createBedrockClient as iBs,createBedrockRuntimeClient as aBs,isAnthropicModelId as kHr,extractModelIdFromArn as DBu,getBedrockRegionPrefix as Ldn,adaptModelIdToRegion as qJe,getGeoRegionPrefix as Uoe,stripModelDisplayMarkers as sBs,OM_ as NNe,onH as yAe,HOH as $oe};
