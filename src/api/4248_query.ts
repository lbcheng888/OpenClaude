// @ts-nocheck
import {getAPIProvider,li} from "./1282_usesFirstPartyModelIds.ts";
import {je,tk} from "../../vendor/m577.ts";
import {n9t,uco} from "./4096_url.ts";
import {cve,UO} from "../config/2189_level.ts";
import {fo} from "../../vendor/m566.ts";
import {isCancel,Gp} from "../../vendor/m567.ts";
import {vu,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {iv} from "../../vendor/m454.ts";
import {we} from "../../vendor/m455.ts";
import {hn} from "../../vendor/m251.ts";
/** Returns true when the CCR websearch proxy should be used (first-party provider + env flag + session ID present). */
function cWa() {
  if (getAPIProvider() !== "firstParty") return !1;
  if (!je.CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY) return !1;
  return !!n9t();
}

/** Builds the CCR websearch proxy URL for the current session. */
function SOp() {
  return `${(je.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "")}/v1/code/sessions/${encodeURIComponent(n9t())}/worker/web-search`;
}

/** Sends a websearch query through the CCR proxy and returns structured results or an error descriptor. */
async function uWa(query: any, signal: any) {
  let headers = cve(),
    response;
  try {
    response = await fo.post(SOp(), {
      query: query
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
    if (isCancel(err)) throw new vu();
    let errCode = err instanceof Error && "code" in err ? String(err.code) : void 0;
    return logForDebugging(`ccr websearch-proxy transport error: ${errCode}`, {
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
    return logForDebugging(`ccr websearch-proxy returned HTTP ${response.status}${errMsg ? `: ${errMsg}` : ""}`, {
      level: "warn"
    }), {
      ok: !1,
      source: "proxy",
      statusCode: response.status,
      errorType: "PROXY_REJECTED",
      errorMessage: `The WebSearch proxy rejected the request (HTTP ${response.status}${errMsg ? `: ${errMsg}` : ""}).`
    };
  }
  let parsed = TOp().safeParse(response.data);
  if (!parsed.success) return logForDebugging(`ccr websearch-proxy returned unparseable body: ${parsed.error.message}`, {
    level: "warn"
  }), {
    ok: !1,
    source: "proxy",
    statusCode: 502,
    errorType: "PROXY_BAD_RESPONSE",
    errorMessage: "The WebSearch proxy returned a malformed response."
  };
  if (parsed.data.error) return logForDebugging(`ccr websearch-proxy search error: ${parsed.data.error.error_type}`, {
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
var TOp;

/** Module initializer: sets up TOp (zod schema for proxy response) and ensures side-effect imports are loaded. */
var dWa = b(() => {
  Gp();
  iv();
  qe();
  tk();
  bt();
  li();
  UO();
  uco();
  TOp = we(() => hn.object({
    results: hn.array(hn.object({
      title: hn.string().optional().default(""),
      url: hn.string().optional().default(""),
      snippet: hn.string().optional().default("")
    })).optional().default([]),
    error: hn.object({
      error_type: hn.string(),
      error_message: hn.string()
    }).nullable().optional()
  }));
});
export {cWa,SOp,uWa,TOp,dWa};
