// @ts-nocheck
import {getAPIProvider as Rr,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {y4t,Qmo} from "./4109_url.ts";
import {VRe,sO} from "../config/2194_level.ts";
import {ho} from "../../vendor/m572.ts";
import {isCancel as $P,ap} from "../../vendor/m573.ts";
import {$c,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {MS} from "../../vendor/m460.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
/** Returns true when the CCR websearch proxy should be used (first-party provider + env flag + session ID present). */
function HYa() {
  if (Rr() !== "firstParty") return !1;
  if (!Ne.CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY) return !1;
  return !!y4t();
}

/** Builds the CCR websearch proxy URL for the current session. */
function $2p() {
  return `${(Ne.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "")}/v1/code/sessions/${encodeURIComponent(y4t())}/worker/web-search`;
}

/** Sends a websearch query through the CCR proxy and returns structured results or an error descriptor. */
async function IYa(query: any, signal: any, options: any) {
  let headers = VRe(),
    response;
  try {
    response = await ho.post($2p(), {
      query: query,
      ...(options?.allowed_domains?.length && {
        allowed_domains: options.allowed_domains
      }),
      ...(options?.blocked_domains?.length && {
        blocked_domains: options.blocked_domains
      })
    }, {
      signal: signal,
      timeout: 40000,
      maxContentLength: 12582912,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      validateStatus: () => !0
    });
  } catch (err) {
    if ($P(err)) throw new $c();
    let errCode = err instanceof Error && "code" in err ? String(err.code) : void 0;
    return A(`ccr websearch-proxy transport error: ${errCode}`, {
      level: "warn"
    }), {
      ok: !1,
      source: "proxy",
      statusCode: 502,
      errorType: "PROXY_TRANSPORT",
      errorMessage: `Request to the WebSearch proxy failed (${errCode ?? "transport error"}).`
    };
  }
  if (response.status !== 200) {
    let errMsg = typeof response.data?.message === "string" ? response.data.message.slice(0, 200) : void 0;
    return A(`ccr websearch-proxy returned HTTP ${response.status}${errMsg ? `: ${errMsg}` : ""}`, {
      level: "warn"
    }), {
      ok: !1,
      source: "proxy",
      statusCode: response.status,
      errorType: "PROXY_REJECTED",
      errorMessage: `The WebSearch proxy rejected the request (HTTP ${response.status}${errMsg ? `: ${errMsg}` : ""}).`
    };
  }
  let parsed = U2p().safeParse(response.data);
  if (!parsed.success) return A(`ccr websearch-proxy returned unparseable body: ${parsed.error.message}`, {
    level: "warn"
  }), {
    ok: !1,
    source: "proxy",
    statusCode: 502,
    errorType: "PROXY_BAD_RESPONSE",
    errorMessage: "The WebSearch proxy returned a malformed response."
  };
  if (parsed.data.error) return A(`ccr websearch-proxy search error: ${parsed.data.error.error_type}`, {
    level: "warn"
  }), {
    ok: !1,
    source: "target",
    statusCode: 502,
    errorType: parsed.data.error.error_type,
    errorMessage: parsed.data.error.error_message
  };
  return {
    ok: !0,
    results: parsed.data.results.filter(result => result.url).map(result => ({
      title: result.title,
      url: result.url
    }))
  };
}
var U2p;

/** Module initializer: sets up U2p (zod schema for proxy response) and ensures side-effect imports are loaded. */
var xYa = b(() => {
  ap();
  MS();
  qe();
  AR();
  Ct();
  Ps();
  sO();
  Qmo();
  U2p = ve(() => jt.object({
    results: jt.array(jt.object({
      title: jt.string().optional().default(""),
      url: jt.string().optional().default(""),
      snippet: jt.string().optional().default("")
    })).optional().default([]),
    error: jt.object({
      error_type: jt.string(),
      error_message: jt.string()
    }).nullable().optional()
  }));
});

export {HYa,$2p,IYa,U2p,xYa};
