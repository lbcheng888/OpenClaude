// @ts-nocheck
import {Tl,mn} from "../telemetry/0600_feature_name.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {getClaudeAIOAuthTokens as qs,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getOrganizationUUID as y2,aI} from "../config/1293_storeOAuthAccountInfo.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {withOAuth401Retry as N0,kk} from "../api/2037_withOAuth401Retry.ts";
import {ho} from "../../vendor/m572.ts";
import {getOAuthHeaders as YS,NR} from "../api/2195_updateSessionTitle.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {mo,__export as j_,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
// @ts-nocheck
/**
 * Module: core/3336_environment_id
 *
 * Remote ("teleport") environment management for the first-party Anthropic
 * API provider. Provides helpers to list the organization's configured remote
 * environments, create a default Anthropic-cloud environment, and small
 * accessors/predicates over an environment descriptor (its `environment_id`).
 *
 * All remote-environment operations require:
 *  - the first-party Anthropic API provider (`Rr() === "firstParty"`),
 *  - a Claude.ai OAuth access token (API-key auth is rejected), and
 *  - a resolvable organization UUID.
 *
 * NOTE: This is 1:1 restored code. Module-level symbol names that are
 * referenced from OTHER bundle modules (e.g. `MOn`, `f_e`, `NOn`, `OBt`,
 * `Bee`, `mat`, `uga`, `nle`) are kept EXACTLY as in the obfuscated bundle —
 * renaming them would break those cross-module references. Likewise, symbols
 * imported from sibling modules (`Tl`, `Rr`, `qs`, `y2`, `Hs`, `ho`, `YS`,
 * `N0`, `mo`, `j_`, `A`, `Ie`, `Ot`, `hn`, `b`, etc.) are kept verbatim. Only
 * file-internal locals and parameters have been given meaningful names and types.
 */

// --- Cross-module bundle symbols (defined/consumed elsewhere; kept verbatim) ---

/** esbuild lazy module-init wrapper (`__esm`): runs `init` once, memoized. */
declare const b: <T>(init: () => T) => () => T;

/**
 * Telemetry wrapper: runs the async `work`, emits a `tengu_feature_ok` event
 * on success or `tengu_feature_bad` on failure, then returns the result or
 * rethrows.
 */
declare function Tl<T>(featureName: string, work: () => Promise<T>): Promise<T>;

/** Returns the active API provider kind (e.g. "firstParty", "vertex"). */
declare function Rr(): string;

/** Returns the current OAuth account/auth state (carrying `accessToken`), if any. */
declare function qs(): { accessToken?: string } | null | undefined;

/** Resolves the current organization UUID, or a falsy value if unavailable. */
declare function y2(): Promise<string | null | undefined>;

/** Returns runtime endpoint configuration, including `BASE_API_URL`. */
declare function Hs(): { BASE_API_URL: string };

/** Retry/backoff wrapper around an HTTP call; returns the final response. */
declare function N0<T>(call: () => Promise<T>): Promise<T>;

/** Minimal shape of an HTTP response as consumed by this module. */
interface HttpResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
}

/** Per-request options (headers, timeout, abort signal) for the HTTP client. */
interface HttpRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

/** The shared axios-compatible instance used for first-party HTTP requests. */
declare const ho: {
  get(url: string, config?: HttpRequestConfig): Promise<HttpResponse>;
  post(url: string, data?: unknown, config?: HttpRequestConfig): Promise<HttpResponse>;
};

/** Builds the standard Authorization headers for a bearer access token. */
declare function YS(accessToken: string): Record<string, string>;

/** Normalizes an unknown thrown value into an Error-like object (`.message`). */
declare function mo(error: unknown): Error;

/** Predicate: true when the error is a known/expected (loggable) failure. */
declare function j_(error: unknown): boolean;

/** Diagnostic logger: `A(message, { level })`. */
declare function A(message: string, options?: { level?: string }): void;

/** Reports an unexpected (non-cancellation) error through the error pipeline. */
declare function Ie(error: Error): void;

/** Returns the current global app state snapshot (carrying `hasRemoteEnvironment`). */
declare function Ot(): { hasRemoteEnvironment?: boolean };

/** Applies a state-update reducer to the global app state. */
declare function hn(update: (state: any) => any): void;

// Sibling module initializers invoked during this module's lazy init.
declare function ap(): void;
declare function Sc(): void;
declare function aI(): void;
declare function mn(): void;
declare function lo(): void;
declare function tr(): void;
declare function qe(): void;
declare function Ct(): void;
declare function kk(): void;
declare function vn(): void;
declare function Ps(): void;
declare function NR(): void;

// --- Module types ---

/**
 * A remote environment descriptor as returned by the environment-providers API.
 * Only the fields touched by this module are typed; the rest are opaque.
 */
interface RemoteEnvironment {
  environment_id: string;
  name?: string;
  kind?: string;
  [key: string]: unknown;
}

// --- Module functions ---

/**
 * Predicate over an environment descriptor. Currently always returns false.
 * FIXME: unverified name — semantics are hardcoded in this build.
 */
function MOn(environment: RemoteEnvironment): boolean {
  return !1;
}

/** Returns the `environment_id` of a remote environment descriptor. */
function f_e(environment: RemoteEnvironment): string {
  return environment.environment_id;
}

/**
 * Predicate over an environment id: when true, callers skip fetching the
 * remote environment list. Currently always returns false.
 * FIXME: unverified name — semantics are hardcoded in this build.
 */
function NOn(environmentId: string | undefined): boolean {
  return !1;
}

/** Wraps an environment id into a `{ environment_id }` config fragment. */
function OBt(environmentId: string): { environment_id: string } {
  return {
    environment_id: environmentId
  };
}

/**
 * Fetches the organization's configured remote environments from the
 * first-party Anthropic API. Requires the first-party provider and a Claude.ai
 * OAuth access token (API-key auth is not accepted).
 *
 * Side effect: reconciles the global `hasRemoteEnvironment` flag with whether
 * any environments were returned.
 *
 * @param accessToken Optional explicit access token; falls back to the current
 *   OAuth account's token.
 * @returns The list of remote environment descriptors.
 */
async function Bee(accessToken?: string): Promise<RemoteEnvironment[]> {
  return Tl("teleport_environments_list", async () => {
    if (Rr() !== "firstParty") throw Error("Remote environments are only available on the first-party Anthropic API provider.");
    let token = accessToken ?? qs()?.accessToken;
    if (!token) throw Error("Claude Code web sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");
    let orgUuid = await y2();
    if (!orgUuid) throw Error("Unable to get organization UUID");
    let url = `${Hs().BASE_API_URL}/v1/environment_providers`;
    try {
      let response = await N0(() => ho.get(url, {
        headers: {
          ...YS(qs()?.accessToken ?? token),
          "x-organization-uuid": orgUuid
        },
        timeout: 15000
      }));
      if (response.status !== 200) throw Error(`Failed to fetch environments: ${response.status} ${response.statusText}`);
      let hasEnvironments = response.data.environments.length > 0;
      if (Ot().hasRemoteEnvironment !== hasEnvironments) hn(state => state.hasRemoteEnvironment === hasEnvironments ? state : {
        ...state,
        hasRemoteEnvironment: hasEnvironments
      });
      return response.data.environments;
    } catch (error) {
      let normalizedError = mo(error);
      if (j_(error)) A(`fetchEnvironments failed: ${normalizedError.message}`, {
        level: "error"
      });else Ie(normalizedError);
      throw normalizedError;
    }
  });
}

/**
 * Creates a default Anthropic-cloud remote environment (Python 3.11 + Node 20,
 * trusted default network access). Requires the first-party provider and a
 * Claude.ai OAuth access token.
 *
 * @param name        Display name for the environment (defaults to "Default").
 * @param signal      Optional abort signal for the request.
 * @param accessToken Optional explicit access token; falls back to the current
 *   OAuth account's token.
 * @returns The created environment payload.
 */
async function mat(name: string = "Default", signal?: AbortSignal, accessToken?: string): Promise<unknown> {
  return Tl("teleport_default_environment_create", async () => {
    if (Rr() !== "firstParty") throw Error("Remote environments are only available on the first-party Anthropic API provider.");
    let token = accessToken ?? qs()?.accessToken;
    if (!token) throw Error("No access token available");
    let orgUuid = await y2();
    if (!orgUuid) throw Error("Unable to get organization UUID");
    let url = `${Hs().BASE_API_URL}/v1/environment_providers/cloud/create`;
    return (await ho.post(url, {
      name: name,
      kind: "anthropic_cloud",
      description: "Default - trusted network access",
      config: {
        environment_type: "anthropic",
        cwd: "/home/user",
        init_script: null,
        environment: {},
        languages: [{
          name: "python",
          version: "3.11"
        }, {
          name: "node",
          version: "20"
        }],
        network_config: {
          allowed_hosts: [],
          allow_default_hosts: !0
        }
      }
    }, {
      headers: {
        ...YS(token),
        "anthropic-beta": "ccr-byoc-2025-07-29",
        "x-organization-uuid": orgUuid
      },
      timeout: 15000,
      signal: signal
    })).data;
  });
}

/**
 * Returns the list of legacy environments. Currently always returns an empty
 * list.
 * FIXME: unverified name — semantics are hardcoded in this build.
 */
async function uga(accessToken?: string): Promise<RemoteEnvironment[]> {
  return [];
}

// Lazy module-initializer: wires up sibling modules this module depends on.
var nle = b(() => {
  ap();
  Sc();
  aI();
  mn();
  lo();
  tr();
  qe();
  Ct();
  kk();
  vn();
  Ps();
  NR();
});

export {MOn,f_e,NOn,OBt,Bee,mat,uga,nle};
