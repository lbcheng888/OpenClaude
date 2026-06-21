// @ts-nocheck
import {Ul as tK,ln as M6} from "../telemetry/0594_feature_name.ts";
import {getAPIProvider as l8,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {getClaudeAIOAuthTokens as H7,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {getOrganizationUUID as vI,DH as Ih} from "../config/1288_storeOAuthAccountInfo.ts";
import {getOauthConfig as F9,Dc as u1} from "../api/0459_getOauthConfig.ts";
import {withOAuth401Retry as KL,fk as g0} from "../api/2032_withOAuth401Retry.ts";
import {fo as $q} from "../../vendor/m566.ts";
import {getOAuthHeaders as vJ,Dw as RW} from "../api/2190_updateSessionTitle.ts";
import {_o as Dq,K_ as mw,bt as L_} from "../../vendor/m195.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
import {Gp as BO} from "../../vendor/m567.ts";
/**
 * Module: core/4024_environment_id
 *
 * Remote ("teleport") environment management for the first-party Anthropic
 * API provider. Provides helpers to list the organization's configured remote
 * environments, create a default Anthropic-cloud environment, and small
 * accessors/predicates over an environment descriptor (its `environment_id`).
 *
 * All remote-environment operations require:
 *  - the first-party Anthropic API provider (`l8() === "firstParty"`),
 *  - a Claude.ai OAuth access token (API-key auth is rejected), and
 *  - a resolvable organization UUID.
 *
 * NOTE: This is 1:1 restored code. Module-level symbol names that are
 * referenced from OTHER bundle modules (e.g. `PS6`, `BYH`, `WS6`, `wb_`,
 * `xHH`, `iK_`, `INK`, `Z4H`) are kept EXACTLY as in the obfuscated bundle —
 * renaming them would break those cross-module references. Likewise, symbols
 * imported from sibling modules are kept verbatim. Only file-internal locals
 * and parameters have been given meaningful names and types.
 */

// --- Cross-module bundle symbols (defined/consumed elsewhere; kept verbatim) ---

/** esbuild lazy module-init wrapper (`__esm`): runs `init` once, memoized. */
declare const L: <T>(init: () => T) => () => T;

/**
 * Telemetry wrapper: runs the async `work`, emits a `tengu_feature_ok` event
 * on success or `tengu_feature_bad` on failure (using `errorCode` to classify
 * the thrown error), then returns the result or rethrows.
 */
declare function tK<T>(
  featureName: string,
  work: () => Promise<T>,
  errorCode?: (error: unknown) => string
): Promise<T>;

/** Returns the active API provider kind (e.g. "firstParty", "vertex"). */
declare function l8(): string;

/** Returns the current OAuth account/auth state (carrying `accessToken`), if any. */
declare function H7(): { accessToken?: string } | null | undefined;

/** Resolves the current organization UUID, or a falsy value if unavailable. */
declare function vI(): Promise<string | null | undefined>;

/** Returns runtime endpoint configuration, including `BASE_API_URL`. */
declare function F9(): { BASE_API_URL: string };

/** Retry/backoff wrapper around an HTTP call; returns the final response. */
declare function KL<T>(call: () => Promise<T>): Promise<T>;

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
declare const $q: {
  get(url: string, config?: HttpRequestConfig): Promise<HttpResponse>;
  post(url: string, data?: unknown, config?: HttpRequestConfig): Promise<HttpResponse>;
};

/** Builds the standard Authorization headers for a bearer access token. */
declare function vJ(accessToken: string): Record<string, string>;

/** Normalizes an unknown thrown value into an Error-like object (`.message`). */
declare function Dq(error: unknown): Error;

/** Predicate: true when the error is a known/expected (loggable) failure. */
declare function mw(error: unknown): boolean;

/** Diagnostic logger: `N(message, { level })`. */
declare function N(message: string, options?: { level?: string }): void;

/** Reports an unexpected (non-cancellation) error through the error pipeline. */
declare function EH(error: Error): void;

// Sibling module initializers invoked during this module's lazy init.
declare function BO(): void;
declare function u1(): void;
declare function Ih(): void;
declare function M6(): void;
declare function Mq(): void;
declare function FH(): void;
declare function L_(): void;
declare function g0(): void;
declare function S6(): void;
declare function V7(): void;
declare function RW(): void;

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
function PS6(environment: RemoteEnvironment): boolean {
  return !1;
}

/** Returns the `environment_id` of a remote environment descriptor. */
function BYH(environment: RemoteEnvironment): string {
  return environment.environment_id;
}

/**
 * Predicate over an environment id: when true, callers skip fetching the
 * remote environment list. Currently always returns false.
 * FIXME: unverified name — semantics are hardcoded in this build.
 */
function WS6(environmentId: string | undefined): boolean {
  return !1;
}

/** Wraps an environment id into a `{ environment_id }` config fragment. */
function wb_(environmentId: string): { environment_id: string } {
  return {
    environment_id: environmentId
  };
}

/**
 * Fetches the organization's configured remote environments from the
 * first-party Anthropic API. Requires the first-party provider and a Claude.ai
 * OAuth access token (API-key auth is not accepted).
 *
 * @param accessToken Optional explicit access token; falls back to the current
 *   OAuth account's token.
 * @returns The list of remote environment descriptors.
 */
async function xHH(accessToken?: string): Promise<RemoteEnvironment[]> {
  return tK("teleport_environments_list", async () => {
    if (l8() !== "firstParty") throw Error("Remote environments are only available on the first-party Anthropic API provider.");
    let token = accessToken ?? H7()?.accessToken;
    if (!token) throw Error("Claude Code web sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");
    let orgUuid = await vI();
    if (!orgUuid) throw Error("Unable to get organization UUID");
    let url = `${F9().BASE_API_URL}/v1/environment_providers`;
    try {
      let response = await KL(() => $q.get(url, {
        headers: {
          ...vJ(H7()?.accessToken ?? token),
          "x-organization-uuid": orgUuid
        },
        timeout: 15000
      }));
      if (response.status !== 200) throw Error(`Failed to fetch environments: ${response.status} ${response.statusText}`);
      return response.data.environments;
    } catch (error) {
      let normalizedError = Dq(error);
      if (mw(error)) N(`fetchEnvironments failed: ${normalizedError.message}`, {
        level: "error"
      });else EH(normalizedError);
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
async function iK_(name: string = "Default", signal?: AbortSignal, accessToken?: string): Promise<unknown> {
  return tK("teleport_default_environment_create", async () => {
    if (l8() !== "firstParty") throw Error("Remote environments are only available on the first-party Anthropic API provider.");
    let token = accessToken ?? H7()?.accessToken;
    if (!token) throw Error("No access token available");
    let orgUuid = await vI();
    if (!orgUuid) throw Error("Unable to get organization UUID");
    let url = `${F9().BASE_API_URL}/v1/environment_providers/cloud/create`;
    return (await $q.post(url, {
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
        ...vJ(token),
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
async function INK(accessToken?: string): Promise<RemoteEnvironment[]> {
  return [];
}

// Lazy module-initializer: wires up sibling modules this module depends on.
var Z4H = L(() => {
  BO();
  u1();
  Ih();
  M6();
  Mq();
  FH();
  L_();
  g0();
  S6();
  V7();
  RW();
});

export {PS6 as G0n,BYH as tge,WS6 as V0n,wb_ as oNt,xHH as Gee,iK_ as fst,INK as eca,Z4H as rle};
