// @ts-nocheck
import {bd as uz,z2 as vm} from "../../vendor/m1280.ts";
import {DEFAULT_3P_SONNET_KEY as e8H,DEFAULT_3P_OPUS_KEY as t8H,DEFAULT_3P_HAIKU_KEY as HqH,DEFAULT_3P_FABLE_KEY as lM_,Mo as iq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {buildVertexGoogleAuth as toH,GAn as Iz6} from "../../vendor/m2019.ts";
import {$l as T1,X2 as bm} from "../../vendor/m1450.ts";
import {WAn as bz6,jAn as Cz6} from "../core/2019_default.ts";
import {Z_ as Af,D1e as MnH} from "../config/1021_shouldBypassProxyWithCidr.ts";
import {yWe as TQH,sn as A6} from "../config/0047_namespace.ts";
import {b as L} from "../../runtime.ts";
/**
 * Vertex AI (Google Cloud) credential validation and model probing.
 *
 * This module supports the onboarding / configuration flow for running Claude
 * Code against Anthropic models hosted on Google Cloud Vertex AI. It can:
 *   - resolve the per-tier Vertex model ids from the shared model registry (`uz`),
 *   - validate that the configured GCP credentials work end-to-end by issuing a
 *     tiny test request to the Vertex-hosted Haiku model, and
 *   - turn low-level GCP / Vertex errors into actionable, user-facing messages.
 *
 * NOTE: This is a 1:1 restoration. All external symbols (`uz`, `e8H`, `t8H`,
 * `HqH`, `lM_`, `toH`, `T1`, `TQH`, `FmH`'s SDK imports, `L`, and the module
 * init thunks `A6`/`bm`/`vm`/`iq`/`Iz6`) are kept exactly as emitted by the
 * bundler so cross-module references remain intact.
 */

// ---------------------------------------------------------------------------
// External symbol type surface (declared from observed usage; not redefined).
// ---------------------------------------------------------------------------

/** Identifier kind used in the model registry `uz` for each tier. */
type ModelTierKey = unknown;

/** A single entry of the shared model registry `uz`. */
interface ModelRegistryEntry {
  /** Vertex AI model id (e.g. "claude-3-5-haiku@..."). */
  vertex: string;
  /** First-party (Anthropic API) model id. */
  firstParty: string;
  /** Amazon Bedrock model id. */
  bedrock: string;
}

/** Shared model registry keyed by tier key constants. */
declare const uz: Record<string, ModelRegistryEntry>;

/** Tier-key constants into `uz`: sonnet / opus / haiku / fable. */
declare const e8H: string;
declare const t8H: string;
declare const HqH: string;
declare const lM_: string;

/** Vertex configuration passed in from the onboarding flow. */
interface VertexAuthConfig {
  authMethod: "serviceAccount" | "adc" | "bearer" | string;
  keyFile?: string;
  projectId?: string;
  region: string;
}

/** Credential descriptor handed to `toH` to build a GoogleAuth instance. */
type GoogleAuthCredential =
  | { kind: "keyFile"; path: string }
  | { kind: "default" }
  | { kind: "skip" };

/** Builds a GoogleAuth instance for the given credential + project. */
declare function toH(credential: GoogleAuthCredential, projectId?: string): Promise<{
  getClient(): Promise<{ getAccessToken(): Promise<unknown> }>;
  getCredentials(): Promise<{ client_email?: string }>;
}>;

/** Normalizes a model id for use as the Vertex `model` request parameter. */
declare function T1(model: string): string;

/** Maps a Vertex region to its API base URL. */
declare function TQH(region: string): string;

/** esbuild `__esm` lazy module-init wrapper. */
declare function L<T>(init: () => T): () => T;

// Sibling-module init thunks invoked by this module's own init thunk.
declare function A6(): void;
declare function bm(): void;
declare function vm(): void;
declare function iq(): void;
declare function Iz6(): void;

/** Result of `validateVertexCredentials`. */
type VertexCredentialCheck =
  | { status: "ok"; identity: string; note: string }
  | { status: "error"; error: string; command?: string };

/** Classification of a failed Vertex test request. */
type VertexProbeReason = "auth" | "permission" | "model" | "network" | "other";

/**
 * Result of probing a Vertex model with a tiny request. `reason` is declared
 * optional (rather than as a discriminated union) because the caller accesses
 * `reason` only after an early `return` on the `ok` branch, which TS does not
 * narrow across statements; this keeps the original control flow type-clean.
 */
type VertexProbeResult = { ok: boolean; reason?: VertexProbeReason };

// ---------------------------------------------------------------------------
// Implementation.
// ---------------------------------------------------------------------------

/**
 * Returns the Vertex AI model id for each model tier from the registry.
 */
function getVertexModelIds(): { sonnet: string; opus: string; haiku: string; fable: string } {
  return {
    sonnet: uz[e8H].vertex,
    opus: uz[t8H].vertex,
    haiku: uz[HqH].vertex,
    fable: uz[lM_].vertex,
  };
}

/**
 * Lists every Vertex model id in the registry whose id contains `substring`
 * (case-insensitive), deduplicated and sorted in reverse order.
 */
function listMatchingVertexModels(substring: string): string[] {
  let matches = new Set<string>();
  for (let entry of Object.values(uz))
    if (entry.vertex.toLowerCase().includes(substring)) matches.add(entry.vertex);
  return [...matches].sort().reverse();
}

/**
 * Builds the GoogleAuth credential descriptor for the given config.
 * Uses an explicit key file for service-account auth, otherwise ADC.
 */
function resolveGoogleAuthCredential(config: VertexAuthConfig): GoogleAuthCredential {
  if (config.authMethod === "serviceAccount" && config.keyFile)
    return {
      kind: "keyFile",
      path: config.keyFile,
    };
  return {
    kind: "default",
  };
}

/**
 * Validates the configured Vertex AI credentials end-to-end: resolves an
 * access token (with a timeout), determines the caller identity, then issues
 * a tiny test request to the Vertex-hosted Haiku model and maps the outcome
 * to a user-facing status.
 */
async function validateVertexCredentials(config: VertexAuthConfig): Promise<VertexCredentialCheck> {
  let identity: string;
  try {
    let googleAuth = await toH(resolveGoogleAuthCredential(config), config.projectId),
      tokenPromise = (async () => {
        await (await googleAuth.getClient()).getAccessToken();
      })(),
      timeoutPromise = new Promise((resolve, reject) =>
        setTimeout((reject2) => reject2(Error("Timed out waiting for GCP credentials")), GCP_CREDENTIAL_TIMEOUT_MS, reject)
      );
    await Promise.race([tokenPromise, timeoutPromise]);
    let clientEmail: string | undefined;
    try {
      clientEmail = (await googleAuth.getCredentials()).client_email;
    } catch {
      clientEmail = void 0;
    }
    identity =
      clientEmail ??
      (config.authMethod === "serviceAccount"
        ? `service account (${config.keyFile})`
        : "Application Default Credentials");
  } catch (error) {
    return {
      status: "error",
      ...describeVertexCredentialError(error, config),
    };
  }
  let haikuModel = getVertexModelIds().haiku,
    probeResult = await probeVertexModelAuth(config, haikuModel);
  if (probeResult.ok)
    return {
      status: "ok",
      identity,
      note: `Test request to ${haikuModel} succeeded.`,
    };
  switch (probeResult.reason) {
    case "auth":
      return {
        status: "error",
        error: "Got a token, but Vertex AI rejected it. The credential may lack the cloud-platform scope.",
      };
    case "permission":
      return {
        status: "error",
        error: `Permission denied calling Vertex AI in project "${config.projectId}". The principal needs the aiplatform.endpoints.predict permission (Vertex AI User role), and the Vertex AI API must be enabled.`,
      };
    case "model":
      return {
        status: "ok",
        identity,
        note: `Credentials work, but ${haikuModel} returned not-found in ${config.region}. Pin a model you have access to on the next step, or try the 'global' region.`,
      };
    case "network":
      return {
        status: "error",
        error: `Could not reach Vertex AI in region "${config.region}". Check the region name and your network.`,
      };
    case "other":
      return {
        status: "ok",
        identity,
        note: `Credentials work, but the test request to ${haikuModel} failed. You can pin a different model on the next step.`,
      };
  }
}

/**
 * Issues a minimal (`max_tokens: 1`) Vertex request for `model` and classifies
 * the result. HTTP statuses map to reasons: 401→auth, 403→permission,
 * 400/404→model, 429→ok (rate-limited but reachable), undefined→network.
 */
async function probeVertexModelAuth(config: VertexAuthConfig, model: string): Promise<VertexProbeResult> {
  let client;
  try {
    client = await createAnthropicVertexClient(config);
  } catch {
    return {
      ok: !1,
      reason: "auth",
    };
  }
  try {
    return (
      await client.messages.create({
        model: T1(model),
        max_tokens: 1,
        messages: [
          {
            role: "user",
            content: ".",
          },
        ],
      }),
      {
        ok: !0,
      }
    );
  } catch (error: any) {
    let status = error?.status;
    if (status === 401)
      return {
        ok: !1,
        reason: "auth",
      };
    if (status === 403)
      return {
        ok: !1,
        reason: "permission",
      };
    if (status === 400 || status === 404)
      return {
        ok: !1,
        reason: "model",
      };
    if (status === 429)
      return {
        ok: !0,
      };
    if (status === void 0)
      return {
        ok: !1,
        reason: "network",
      };
    return {
      ok: !1,
      reason: "other",
    };
  }
}

/**
 * Lazily imports the AnthropicVertex SDK and proxy fetch helper, then
 * constructs an AnthropicVertex client wired to the configured region,
 * project, GoogleAuth, and (optionally proxied) base URL.
 */
async function createAnthropicVertexClient(config: VertexAuthConfig) {
  let [{ AnthropicVertex }, { getProxyFetchOptions }] = await Promise.all([
      Promise.resolve().then(() => (bz6(), Cz6)),
      Promise.resolve().then(() => (Af(), MnH)),
    ]),
    googleAuth = await toH(resolveGoogleAuthCredential(config), config.projectId);
  return new AnthropicVertex({
    region: config.region,
    projectId: config.projectId,
    googleAuth,
    maxRetries: 0,
    timeout: 15000,
    fetchOptions: getProxyFetchOptions({
      url: process.env.ANTHROPIC_VERTEX_BASE_URL || TQH(config.region),
    }),
  });
}

/**
 * Translates a low-level GCP / Vertex error into an actionable, user-facing
 * message (and optional remediation command) based on the error text and the
 * configured auth method.
 */
function describeVertexCredentialError(
  error: any,
  config: VertexAuthConfig
): { error: string; command?: string } {
  let message = error?.message ?? String(error);
  if (config.authMethod === "serviceAccount" && /ENOENT|no such file/i.test(message))
    return {
      error: `Service account key file not found: ${config.keyFile}`,
    };
  if (/Could not load the default credentials/i.test(message))
    return config.authMethod === "adc"
      ? {
          error: "No Application Default Credentials found. Run:",
          command: GCLOUD_ADC_LOGIN_COMMAND,
        }
      : {
          error:
            "No GCP credentials found in the environment. Set GOOGLE_APPLICATION_CREDENTIALS or run gcloud auth application-default login.",
        };
  if (/invalid_grant|Token has been expired|reauth/i.test(message)) {
    if (config.authMethod === "serviceAccount")
      return {
        error:
          "Service account credentials have been revoked or expired. Obtain a new key file from GCP IAM (IAM → Service Accounts → Keys → Add Key).",
      };
    if (config.authMethod === "adc")
      return {
        error: "GCP credentials expired. Run:",
        command: GCLOUD_ADC_LOGIN_COMMAND,
      };
    return {
      error:
        "GCP credentials in the environment have expired or been revoked. Refresh them (gcloud auth application-default login for ADC, or replace the GOOGLE_APPLICATION_CREDENTIALS key file).",
    };
  }
  if (/Unable to detect a Project Id/i.test(message))
    return {
      error: "Could not determine a GCP project from the credentials. Go back and set the project ID explicitly.",
    };
  if (/Timed out waiting for GCP/i.test(message))
    return {
      error: "Timed out resolving GCP credentials (no ADC, no key file, and no GCE metadata server).",
      ...(config.authMethod === "adc" && {
        command: GCLOUD_ADC_LOGIN_COMMAND,
      }),
    };
  return {
    error: message,
  };
}

/** Timeout (ms) for resolving GCP credentials before giving up. */
var GCP_CREDENTIAL_TIMEOUT_MS = 12000,
  /** Remediation command shown when ADC credentials are missing/expired. */
  GCLOUD_ADC_LOGIN_COMMAND = "gcloud auth application-default login";

/** esbuild `__esm` init thunk: runs this module's sibling-module initializers. */
var initModule = L(() => {
  A6();
  bm();
  vm();
  iq();
  Iz6();
});

export {getVertexModelIds as hoo,listMatchingVertexModels as xIa,resolveGoogleAuthCredential as kIa,validateVertexCredentials as HIa,probeVertexModelAuth as i4e,createAnthropicVertexClient as gAp,describeVertexCredentialError as _Ap,GCP_CREDENTIAL_TIMEOUT_MS as hAp,GCLOUD_ADC_LOGIN_COMMAND as Aoo,initModule as goo};
