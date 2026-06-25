// @ts-nocheck
import {g1e,Xze} from "../../vendor/m574.ts";
import {b} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
import {ho} from "../../vendor/m572.ts";
/**
 * Expand `${VAR}` / `${VAR:-default}` references in a string using process.env.
 *
 * @param input - The raw string possibly containing `${...}` placeholders.
 * @returns The expanded string plus the list of variable names that had no
 *          environment value and no default (left untouched in the output).
 */
function hee(input: string): { expanded: string; missingVars: string[] } {
  let missingVars: string[] = [];
  return {
    expanded: input.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*(?::-[^}]*)?)\}/g, (matchText, refBody) => {
      /** Index of the `:-` default-value separator, or -1 if absent. */
      let separatorIndex = refBody.indexOf(":-"),
        /** Variable name portion of the reference. */
        varName = separatorIndex === -1 ? refBody : refBody.slice(0, separatorIndex),
        /** Default value when the variable is unset, or undefined if none given. */
        defaultValue = separatorIndex === -1 ? void 0 : refBody.slice(separatorIndex + 2),
        /** Current environment value for the variable. */
        envValue = process.env[varName];
      if (envValue !== void 0) return envValue;
      if (defaultValue !== void 0) return defaultValue;
      return missingVars.push(varName), matchText;
    }),
    missingVars: missingVars
  };
}

/**
 * Guard that a download request targets the public Claude CDN.
 *
 * Throws if neither the request URL nor the optional baseURL resolves to
 * downloads.claude.ai. Use firstPartyApi for api.anthropic.com (residency-gated)
 * or externalHttp for non-Anthropic hosts.
 *
 * @param requestUrl - The request URL (may be relative or absolute).
 * @param requestOptions - Optional request options carrying a baseURL.
 */
function Rqd(requestUrl: string, requestOptions?: { baseURL?: string | null }): void {
  let baseUrl = requestOptions?.baseURL,
    /** Whether the request URL is absolute (has a scheme/protocol). */
    isAbsoluteUrl = Aqd.test(requestUrl);
  if ((isAbsoluteUrl && !g1e(requestUrl) ? requestUrl : baseUrl != null && !g1e(baseUrl) ? baseUrl : !isAbsoluteUrl && baseUrl == null ? requestUrl : null) !== null) throw Error(`downloads: request (url="${requestUrl}"` + (baseUrl != null ? `, baseURL="${baseUrl}"` : "") + ") does not resolve to the public CDN (downloads.claude.ai). Use firstPartyApi for api.anthropic.com (residency-gated) or externalHttp for non-Anthropic hosts.");
}

/** Matches an absolute URL with an optional scheme followed by `//`. */
var Aqd: RegExp, Hge: { get(url: string, options?: { baseURL?: string | null }): unknown };

var Y1t = b(() => {
  ap();
  Xze();
  ap();
  Aqd = /^([a-z][a-z\d+\-.]*:)?\/\//i;
  Hge = {
    get(url, options) {
      return Rqd(url, options), ho.get(url, options);
    }
  };
});

export {hee,Rqd,Aqd,Hge,Y1t};
