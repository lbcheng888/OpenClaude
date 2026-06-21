// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Dc as u1,ALLOWED_OAUTH_BASE_URLS as La_} from "./0459_getOauthConfig.ts";
/**
 * Validates that a URL string targets an approved Anthropic API endpoint.
 *
 * Returns null if the URL is permitted, or a human-readable error string explaining
 * why it was rejected (unparseable, wrong scheme for a known host, or unapproved host).
 */
function cV4(urlString: string): string | null {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(urlString);
  } catch {
    return `could not parse ${jsonQuote(urlString)} as a URL`;
  }
  if (approvedAnthropicHosts.has(parsedUrl.hostname)) {
    if (parsedUrl.protocol !== "wss:" && parsedUrl.protocol !== "https:")
      return `scheme ${jsonQuote(parsedUrl.protocol)} is not permitted for host ${jsonQuote(parsedUrl.hostname)}; only wss:// and https:// are accepted`;
    return null;
  }
  return `host ${jsonQuote(parsedUrl.hostname)} is not an approved Anthropic endpoint`;
}

/** Wraps a value in JSON.stringify for safe inclusion in error messages. */
var jsonQuote = (value: unknown): string => JSON.stringify(value),
  /** Set of approved Anthropic API hostnames (populated at module init). */
  approvedAnthropicHosts: Set<string>;

/** Lazy module initialiser — populates {@link approvedAnthropicHosts} from well-known
 *  endpoints plus any additional base-URLs declared in `La_`. */
var dV4 = L(() => {
  u1();
  approvedAnthropicHosts = new Set([
    "api.anthropic.com",
    "api-staging.anthropic.com",
    ...La_.map((baseUrl: string) => new URL(baseUrl).hostname),
  ]);
});

export {cV4 as b$l,jsonQuote as gYn,approvedAnthropicHosts as dwm,dV4 as E$l};
