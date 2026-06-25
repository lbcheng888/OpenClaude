// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {isCancel as wS,isAxiosError as Ff,ap as BO} from "../../vendor/m573.ts";
import {orn as Ts_,Xze as YdH} from "../../vendor/m574.ts";
import {ho as $q} from "../../vendor/m572.ts";
// Module: core/0567_isCancel
//
// Re-exports a small set of axios helpers (`isCancel`, `isAxiosError`) and
// provides `externalHttp`, an axios wrapper restricted to NON-Anthropic
// (third-party) endpoints. Every request is gated by `assertNotAnthropicHost`
// so that traffic destined for Anthropic-operated hosts is forced through the
// first-party client (which enforces the 3P data-residency rules) instead.
//
// Cross-module bundle symbols kept verbatim (defined/consumed by other modules,
// renaming them here would break those references):
//   j_   — esbuild export-binding helper (defines live-getter exports)
//   L    — esbuild lazy module-init wrapper (__esm)
//   hQq  — this module's export namespace object (consumed by config/0568)
//   C0   — this module's lazy-init function (called from many modules)
//   $q   — the axios instance
//   Ts_  — predicate: URL string points at an Anthropic-operated host
//   BO, YdH — sibling module initializers invoked during init

declare const j_: <T extends object>(target: T, getters: { [K in keyof T]?: () => T[K] }) => void;
declare const L: <T>(init: () => T) => () => T;
declare const $q: import("axios").AxiosStatic;
/** True when the given URL string targets an Anthropic-operated host. */
declare function Ts_(url: string): boolean;
declare function BO(): void;
declare function YdH(): void;
/** axios `isCancel` (re-exported as `isCancel`). */
declare const wS: typeof $q.isCancel;
/** axios `isAxiosError` (re-exported as `isAxiosError`). */
declare const Ff: typeof $q.isAxiosError;

/** Axios-compatible request config (optionally carrying a `baseURL`). */
type RequestConfig = {
  baseURL?: string;
} & Record<string, unknown>;

/** Export namespace object for this module (live getters wired by `j_`). */
var hQq: {
  isCancel: typeof wS;
  isAxiosError: typeof Ff;
  externalHttp: typeof externalHttp;
} = {} as any;
j_(hQq, {
  isCancel: () => wS,
  isAxiosError: () => Ff,
  externalHttp: () => externalHttp
});

/**
 * Guards an outgoing third-party request: throws if either the request URL or
 * the config's `baseURL` resolves to an Anthropic-operated host. Such traffic
 * must go through the first-party client (`src/services/http/firstParty`),
 * which enforces the third-party data-residency gate.
 */
function assertNotAnthropicHost(url: string, config?: RequestConfig): void {
  for (let candidate of [url, config?.baseURL]) if (candidate && Ts_(candidate)) throw Error(`externalHttp: ${candidate} is Anthropic-operated. Use firstPartyApi from ` + "src/services/http/firstParty — it enforces the 3P data-residency gate.");
}

/**
 * Axios client wrapper for outbound third-party HTTP. Each method validates the
 * target host via {@link assertNotAnthropicHost} before delegating to the
 * underlying axios instance. Methods that carry a request body (`post`, `put`,
 * `patch`) receive the config as their third argument; the others as the
 * second.
 */
var externalHttp: {
  get: typeof $q.get;
  head: typeof $q.head;
  post: typeof $q.post;
  put: typeof $q.put;
  patch: typeof $q.patch;
  delete: typeof $q.delete;
};
var C0 = L(() => {
  BO();
  YdH();
  BO();
  externalHttp = {
    get(url, config) {
      return assertNotAnthropicHost(url, config), $q.get(url, config);
    },
    head(url, config) {
      return assertNotAnthropicHost(url, config), $q.head(url, config);
    },
    post(url, data, config) {
      return assertNotAnthropicHost(url, config), $q.post(url, data, config);
    },
    put(url, data, config) {
      return assertNotAnthropicHost(url, config), $q.put(url, data, config);
    },
    patch(url, data, config) {
      return assertNotAnthropicHost(url, config), $q.patch(url, data, config);
    },
    delete(url, config) {
      return assertNotAnthropicHost(url, config), $q.delete(url, config);
    }
  };
});
export {hQq as Ges,assertNotAnthropicHost as Qze,externalHttp,C0 as _k};
