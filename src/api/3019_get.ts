// @ts-nocheck
import {EMe as gNH,ZVe as YdH} from "../../vendor/m568.ts";
import {b as L} from "../../runtime.ts";
import {Gp as BO} from "../../vendor/m567.ts";
import {fo as $q} from "../../vendor/m566.ts";
/**
 * HTTP client restricted to the public Claude downloads CDN (downloads.claude.ai).
 *
 * Wraps the shared axios instance ($q) with a guard that rejects any request
 * whose resolved URL does not target downloads.claude.ai.  Only a `get` method
 * is exposed because the CDN is read-only.
 *
 * Parallel modules:
 *   - externalHttp (core/0567_isCancel.ts) — non-Anthropic hosts
 *   - firstPartyApi — api.anthropic.com, enforces data-residency gate
 */

/**
 * Asserts that the effective URL of a GET request resolves to the public
 * downloads CDN (downloads.claude.ai).
 *
 * Resolution rules mirror axios: if `url` is absolute, it is the effective
 * URL; if `config.baseURL` is set and `url` is relative, the effective URL
 * is `baseURL`; if `url` is relative and `baseURL` is absent, `url` itself
 * is used as-is.
 *
 * Throws if the effective URL does not satisfy `gNH` (i.e. is not on the
 * downloads CDN).
 */
function assertIsDownloadsCdnUrl(
  url: string,
  config?: { baseURL?: string; [key: string]: unknown }
): void {
  let baseURL = config?.baseURL,
    isAbsolute = ABSOLUTE_URL_REGEX.test(url);
  // Determine the effective URL: prefer the first value that is present and
  // NOT already known to be on the downloads CDN (gNH returns true).
  // If none of the branches is non-null, the effective URL is on the CDN
  // and we skip the check.
  if (
    (isAbsolute && !gNH(url)
      ? url
      : baseURL != null && !gNH(baseURL)
      ? baseURL
      : !isAbsolute && baseURL == null
      ? url
      : null) !== null
  )
    throw Error(
      `downloads: request (url="${url}"` +
        (baseURL != null ? `, baseURL="${baseURL}"` : "") +
        ") does not resolve to the public CDN (downloads.claude.ai). Use firstPartyApi for api.anthropic.com (residency-gated) or externalHttp for non-Anthropic hosts."
    );
}

/** Regex that matches absolute URLs (scheme-relative or scheme-prefixed). */
var ABSOLUTE_URL_REGEX: RegExp;

/**
 * HTTP client for the downloads.claude.ai public CDN.
 *
 * Only `get` is exposed; all calls are validated by `assertIsDownloadsCdnUrl`
 * before being forwarded to the underlying axios instance (`$q`).
 */
var downloadsHttp: { get: typeof $q.get };

/** Lazy module initializer. */
var th_ = L(() => {
  BO();
  YdH();
  BO();
  ABSOLUTE_URL_REGEX = /^([a-z][a-z\d+\-.]*:)?\/\//i;
  downloadsHttp = {
    get(url: string, config?: unknown) {
      return assertIsDownloadsCdnUrl(url, config as any), $q.get(url, config as any);
    },
  };
});

export {assertIsDownloadsCdnUrl as WMd,ABSOLUTE_URL_REGEX as jMd,downloadsHttp as _he,th_ as SLt};
