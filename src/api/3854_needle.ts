// @ts-nocheck
import {Uoe as c8H,qJe as anH,$oe as HOH} from "../config/1285_BedrockClient.ts";
import {ed as uz,h2 as vm} from "../../vendor/m1285.ts";
import {DEFAULT_3P_SONNET_KEY as e8H,DEFAULT_3P_OPUS_KEY as t8H,DEFAULT_3P_HAIKU_KEY as HqH,DEFAULT_3P_FABLE_KEY as lM_,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getAWSClientProxyConfig as DnH,ey as Af,RNe as MnH} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {xIr as bJ8,IIr as CJ8} from "../../vendor/m1355.ts";
import {Owt as dD_,Pwt as cD_} from "../../vendor/m1184.ts";
import {nl as T1,T2 as bm} from "../../vendor/m1455.ts";
import {jXe as Z2_,zXe as W2_} from "../core/1621_default.ts";
import {lXe as PiH,aXe as XiH} from "../../vendor/m1447.ts";
import {b as L} from "../../runtime.ts";
/**
 * AWS Bedrock connection setup & validation.
 *
 * This module powers the onboarding / "connect to Bedrock" flow: it resolves
 * AWS credentials from the chosen auth method (SSO profile, static access key,
 * environment, or a Bedrock bearer API key), performs a live validation request
 * against Bedrock, and translates AWS SDK errors into human-friendly guidance.
 *
 * NOTE on naming: symbols defined and consumed entirely within this module are
 * renamed for readability. Symbols crossing the module boundary keep their
 * original (bundler) names so external callers/imports continue to resolve:
 *   - `evK` (the validation entry point, called from core/4090_goBack)
 *   - `W9q` (the module init thunk, invoked from core/4090_goBack)
 *   - external helpers: `uz`, `c8H`, `anH`, `T1`, `DnH`, model-id keys
 *     (`e8H`, `t8H`, `HqH`, `lM_`), and the lazy `Promise.resolve().then(...)`
 *     dynamic-import shims (`Z2_`/`W2_`, `Af`/`MnH`, `bJ8`/`CJ8`, `dD_`/`cD_`,
 *     `PiH`/`XiH`).
 */

/**
 * Describes how to authenticate to AWS Bedrock during validation/setup.
 * The shape is a discriminated-ish union keyed by `authMethod`; only the fields
 * relevant to each method are guaranteed present.
 */
interface BedrockAuthConfig {
  /** Selected credential source. */
  authMethod: "bearer" | "profile" | "accessKey" | "environment" | string;
  /** AWS region (e.g. "us-east-1"). */
  region: string;
  /** Bedrock bearer API key (only for `authMethod === "bearer"`). */
  bearerToken?: string;
  /** Named AWS profile (only for `authMethod === "profile"`). */
  awsProfile?: string;
  /** Static credentials (only for `authMethod === "accessKey"`). */
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

/** Resolved AWS credentials returned by a credential provider. */
interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

/** A function that asynchronously resolves AWS credentials on demand. */
type AwsCredentialProvider = () => Promise<AwsCredentials>;

/** A single resolved model id together with its regional fallback. */
interface ModelNeedleFallback {
  /** The first-party (Anthropic) model identifier. */
  needle: string;
  /** The Bedrock model id rewritten for the config's geo (region prefix). */
  fallback: string;
}

/** The four model families exposed for Bedrock validation. */
interface BedrockModelMappings {
  sonnet: ModelNeedleFallback;
  opus: ModelNeedleFallback;
  haiku: ModelNeedleFallback;
  fable: ModelNeedleFallback;
}

/**
 * Build the per-family model id mappings for a given region.
 *
 * For each family it returns the first-party model id (`needle`) plus a
 * `fallback` id where the Bedrock model name's region prefix has been rewritten
 * to match the region's geo group (us / eu / apac / global / us-gov).
 *
 * @param config Region string (or auth config region) used to derive the geo.
 */
function getBedrockModelMappings(config: string): BedrockModelMappings {
  let geo = c8H(config),
    forFamily = (familyKey: string): ModelNeedleFallback => ({
      needle: uz[familyKey].firstParty,
      fallback: anH(uz[familyKey].bedrock, geo)
    });
  return {
    sonnet: forFamily(e8H),
    opus: forFamily(t8H),
    haiku: forFamily(HqH),
    fable: forFamily(lM_)
  };
}

/** Result of a successful Bedrock validation. */
interface BedrockValidationOk {
  status: "ok";
  /** Caller identity (STS ARN/UserId) or a descriptive label. */
  identity: string;
  /** Discovered SYSTEM_DEFINED inference profile ids containing "anthropic". */
  profiles: string[];
  /** Optional human-readable note about caveats (e.g. model not enabled). */
  note?: string;
}

/** Result of a failed Bedrock validation. */
interface BedrockValidationError {
  status: "error";
  /** Human-friendly error message. */
  error?: string;
  /** Suggested remediation command (e.g. `aws sso login --profile ...`). */
  command?: string;
}
type BedrockValidationResult = BedrockValidationOk | BedrockValidationError;

/**
 * Validate a Bedrock connection for the given auth config.
 *
 * Bearer-key auth is validated via a tiny live Messages request; all other auth
 * methods are validated by calling STS GetCallerIdentity (to confirm
 * credentials/identity) and then enumerating SYSTEM_DEFINED inference profiles
 * to discover the available Anthropic profiles.
 *
 * EXPORTED (used by core/4090_goBack). Original name preserved.
 */
async function evK(config: BedrockAuthConfig): Promise<BedrockValidationResult> {
  if (config.authMethod === "bearer") return validateBedrockBearerKey(config);
  try {
    let credentialProvider = await resolveAwsCredentialsProvider(config),
      clientConfig = {
        ...(await DnH({
          url: `https://bedrock.${config.region}.amazonaws.com`
        })),
        region: config.region,
        ...(credentialProvider && {
          credentials: credentialProvider
        })
      },
      {
        STSClient,
        GetCallerIdentityCommand
      } = await Promise.resolve().then(() => (bJ8(), CJ8)),
      callerIdentity = await new STSClient(clientConfig).send(new GetCallerIdentityCommand({})),
      identity = callerIdentity.Arn ?? callerIdentity.UserId ?? "(unknown)",
      {
        BedrockClient,
        ListInferenceProfilesCommand
      } = await Promise.resolve().then(() => (dD_(), cD_)),
      bedrockClient = new BedrockClient(clientConfig),
      profiles: string[] = [],
      nextToken: string | undefined;
    do {
      let page = await bedrockClient.send(new ListInferenceProfilesCommand({
        ...(nextToken && {
          nextToken
        }),
        typeEquals: "SYSTEM_DEFINED"
      }));
      for (let summary of page.inferenceProfileSummaries ?? []) if (summary.inferenceProfileId?.includes("anthropic")) profiles.push(summary.inferenceProfileId);
      nextToken = page.nextToken;
    } while (nextToken);
    return {
      status: "ok",
      identity,
      profiles
    };
  } catch (err) {
    return {
      status: "error",
      ...describeBedrockError(err, config)
    };
  }
}

/** Reason a model probe failed (or a benign "ok" outcome). */
type ProbeReason = "auth" | "permission" | "model" | "network" | "other";

/** Outcome of probing a specific model on Bedrock. */
type ProbeResult = {
  ok: true;
} | {
  ok: false;
  reason: ProbeReason;
};

/**
 * Probe a specific model id by issuing a minimal (1-token) Messages request.
 *
 * Distinguishes failure causes from the HTTP status:
 *   401 → auth, 403 → permission, 400/404 → model unavailable,
 *   429 → treated as ok (rate-limited but reachable & authorized),
 *   undefined status → network, anything else → other.
 *
 * @param config Bedrock auth config.
 * @param model  Model id to probe.
 */
async function probeBedrockModel(config: BedrockAuthConfig, model: string): Promise<ProbeResult> {
  let client;
  try {
    client = await createBedrockClientForProbe(config);
  } catch {
    return {
      ok: !1,
      reason: "auth"
    };
  }
  try {
    return await client.messages.create({
      model: T1(model),
      max_tokens: 1,
      messages: [{
        role: "user",
        content: "."
      }]
    }), {
      ok: !0
    };
  } catch (err) {
    let status = (err as {
      status?: number;
    } | null)?.status;
    if (status === 401) return {
      ok: !1,
      reason: "auth"
    };
    if (status === 403) return {
      ok: !1,
      reason: "permission"
    };
    if (status === 400 || status === 404) return {
      ok: !1,
      reason: "model"
    };
    if (status === 429) return {
      ok: !0
    };
    if (status === void 0) return {
      ok: !1,
      reason: "network"
    };
    return {
      ok: !1,
      reason: "other"
    };
  }
}

/**
 * Construct an `AnthropicBedrock` SDK client configured for probing, wiring up
 * region, proxy fetch options, zero retries, and the resolved auth (bearer key,
 * SigV4 static credentials, or default credential chain).
 */
async function createBedrockClientForProbe(config: BedrockAuthConfig) {
  let [{
      AnthropicBedrock
    }, {
      getProxyFetchOptions
    }] = await Promise.all([Promise.resolve().then(() => (Z2_(), W2_)), Promise.resolve().then(() => (Af(), MnH))]),
    baseClientConfig = {
      awsRegion: config.region,
      maxRetries: 0,
      fetchOptions: getProxyFetchOptions({
        url: process.env.ANTHROPIC_BEDROCK_BASE_URL || `https://bedrock-runtime.${config.region}.amazonaws.com`
      })
    },
    auth = await resolveBedrockAuth(config);
  switch (auth.kind) {
    case "bearer":
      return new AnthropicBedrock({
        ...baseClientConfig,
        apiKey: auth.token
      });
    case "sigv4":
      return new AnthropicBedrock({
        ...baseClientConfig,
        awsAccessKey: auth.accessKeyId,
        awsSecretKey: auth.secretAccessKey,
        awsSessionToken: auth.sessionToken
      });
    case "default":
      return new AnthropicBedrock(baseClientConfig);
  }
}

/** Resolved auth descriptor used to construct the AnthropicBedrock client. */
type ResolvedBedrockAuth = {
  kind: "bearer";
  token: string | undefined;
} | {
  kind: "default";
} | {
  kind: "sigv4";
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};

/**
 * Resolve the auth descriptor for the probe client. Bearer config yields a
 * bearer token; otherwise it resolves the AWS credential provider — falling
 * back to the default credential chain when none is available, or producing
 * SigV4 static credentials.
 */
async function resolveBedrockAuth(config: BedrockAuthConfig): Promise<ResolvedBedrockAuth> {
  if (config.authMethod === "bearer") return {
    kind: "bearer",
    token: config.bearerToken
  };
  let credentialProvider = await resolveAwsCredentialsProvider(config);
  if (!credentialProvider) return {
    kind: "default"
  };
  let credentials = await credentialProvider();
  return {
    kind: "sigv4",
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken
  };
}

/**
 * Validate a Bedrock bearer API key by probing the region's haiku fallback
 * model, mapping the probe outcome to onboarding-friendly status messages.
 */
async function validateBedrockBearerKey(config: BedrockAuthConfig): Promise<BedrockValidationResult> {
  let model = getBedrockModelMappings(config.region).haiku.fallback,
    probe = await probeBedrockModel(config, model);
  if (probe.ok) return {
    status: "ok",
    identity: "Bedrock API key",
    profiles: [],
    note: `Test request to ${model} succeeded.`
  };
  switch (probe.reason) {
    case "auth":
      return {
        status: "error",
        error: "Invalid Bedrock API key. Check the key and try again."
      };
    case "permission":
      return {
        status: "error",
        error: "API key was rejected. Your IAM policy may be missing bedrock:CallWithBearerToken or bedrock:InvokeModel."
      };
    case "model":
      return {
        status: "ok",
        identity: "Bedrock API key",
        profiles: [],
        note: `The key works, but ${model} is not enabled in your account. Pin a model you have access to on the next step.`
      };
    case "network":
      return {
        status: "error",
        error: `Could not reach Bedrock in region "${config.region}". Check the region name and your network.`
      };
    case "other":
      return {
        status: "error",
        error: "The test request failed. Check the key and region."
      };
  }
}

/**
 * Resolve an AWS credential provider for the given auth config.
 *
 *   - "profile":    use the Node provider chain for the named SSO/profile.
 *   - "accessKey":  return a provider yielding the static credentials.
 *   - "environment"/default: return undefined (let the SDK use its defaults).
 */
async function resolveAwsCredentialsProvider(config: BedrockAuthConfig): Promise<AwsCredentialProvider | undefined> {
  switch (config.authMethod) {
    case "profile":
      {
        let {
          fromNodeProviderChain
        } = await Promise.resolve().then(() => (PiH(), XiH));
        return fromNodeProviderChain({
          profile: config.awsProfile,
          ignoreCache: !0
        });
      }
    case "accessKey":
      return async () => ({
        accessKeyId: config.accessKeyId!,
        secretAccessKey: config.secretAccessKey!,
        ...(config.sessionToken && {
          sessionToken: config.sessionToken
        })
      });
    case "environment":
      return;
    default:
      return;
  }
}

/**
 * Translate an AWS SDK error into a user-facing message (and optional
 * remediation command), branching on the error's `name` and the auth method.
 */
function describeBedrockError(error: unknown, config: BedrockAuthConfig): {
  error?: string;
  command?: string;
} {
  let err = error as {
      name?: string;
      message?: string;
    } | null,
    name = err?.name ?? "Error",
    message = err?.message ?? String(error),
    ssoLoginCommand = config.authMethod === "profile" ? `aws sso login --profile ${config.awsProfile}` : void 0;
  switch (name) {
    case "CredentialsProviderError":
      return config.authMethod === "profile" ? {
        error: `Could not load credentials for profile "${config.awsProfile}". If this is an SSO profile, run:`,
        command: ssoLoginCommand
      } : {
        error: `No AWS credentials found. ${message}`
      };
    case "ExpiredTokenException":
    case "TokenRefreshRequired":
      return config.authMethod === "profile" ? {
        error: "SSO session expired. Run:",
        command: ssoLoginCommand
      } : {
        error: `Credentials expired. ${message}`
      };
    case "ForbiddenException":
      return config.authMethod === "profile" ? {
        error: `SSO portal denied access to the role for profile "${config.awsProfile}". The permission set may have been revoked — check your AWS access portal.`
      } : {
        error: `Forbidden. ${message}`
      };
    case "AccessDeniedException":
      return {
        error: `Access denied. Your IAM role needs bedrock:ListInferenceProfiles permission. ${message}`
      };
    case "UnrecognizedClientException":
    case "InvalidSignatureException":
      return {
        error: `Invalid credentials. ${message}`
      };
    case "UnknownEndpoint":
    case "ENOTFOUND":
      return {
        error: `Cannot reach AWS in region "${config.region}". Check the region name and your network.`
      };
    default:
      return {
        error: `${name}: ${message}`
      };
  }
}

/**
 * Module init thunk (bundler-generated). Eagerly pulls in the dependency
 * modules this file relies on. EXPORTED (invoked from core/4090_goBack).
 * Original name preserved.
 */
var W9q = L(() => {
  bm();
  HOH();
  vm();
  iq();
  Af();
});
export {getBedrockModelMappings as Ylo,evK as w1a,probeBedrockModel as yqe,createBedrockClientForProbe as qRp,resolveBedrockAuth as WRp,validateBedrockBearerKey as GRp,resolveAwsCredentialsProvider as k1a,describeBedrockError as VRp,W9q as Jlo};
