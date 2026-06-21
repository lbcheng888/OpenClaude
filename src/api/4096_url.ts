// @ts-nocheck
import {je as dH,tk as $y} from "../../vendor/m577.ts";
import {getAPIProvider as u8,li as $7} from "./1282_usesFirstPartyModelIds.ts";
import {cve as foH,UO as Av} from "../config/2189_level.ts";
import {fo as Dq} from "../../vendor/m566.ts";
import {isCancel as AS,Gp as iO} from "../../vendor/m567.ts";
import {vu as m5,bt as R_} from "../../vendor/m195.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {iv as s2} from "../../vendor/m454.ts";
import {we as NH} from "../../vendor/m455.ts";
import {hn as R6} from "../../vendor/m251.ts";
// @ts-nocheck
function getSessionId() {
  let sessionId = dH.CLAUDE_CODE_SESSION_ID;
  if (sessionId && (sessionId.startsWith("cse_") || sessionId.startsWith("session_"))) return sessionId;
  return;
}
function shouldUseCCRProxy() {
  if (u8() !== "firstParty") return false;
  if (!dH.CLAUDE_CODE_WEBFETCH_USE_CCR_PROXY) return false;
  return !!getSessionId();
}
function buildProxyUrl() {
  return `${(dH.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "")}/v1/code/sessions/${encodeURIComponent(getSessionId())}/worker/web-fetch`;
}
async function fetchViaProxy(targetUrl, signal) {
  let authHeaders = foH(),
    response;
  try {
    response = await Dq.post(buildProxyUrl(), {
      url: targetUrl
    }, {
      signal: signal,
      timeout: 40000,
      maxContentLength: 12582912,
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      validateStatus: () => true
    });
  } catch (err) {
    if (AS(err)) throw new m5();
    let errorCode = err instanceof Error && "code" in err ? String(err.code) : undefined;
    return y(`ccr webfetch-proxy transport error: ${errorCode}`, {
      level: "warn"
    }), {
      ok: false,
      source: "proxy",
      statusCode: 502,
      errorType: "PROXY_TRANSPORT",
      errorMessage: `Request to the WebFetch proxy failed (${errorCode ?? "transport error"}).`
    };
  }
  if (response.status !== 200) {
    let T = typeof response.data?.message === "string" ? response.data.message.slice(0, 200) : undefined;
    return y(`ccr webfetch-proxy returned HTTP ${response.status}${T ? `: ${T}` : ""}`, {
      level: "warn"
    }), {
      ok: false,
      source: "proxy",
      statusCode: response.status,
      errorType: "PROXY_REJECTED",
      errorMessage: `The WebFetch proxy rejected the request (HTTP ${response.status}${T ? `: ${T}` : ""}).`
    };
  }
  let parsed = proxyResponseSchema().safeParse(response.data);
  if (!parsed.success) return y(`ccr webfetch-proxy returned unparseable body: ${parsed.error.message}`, {
    level: "warn"
  }), {
    ok: false,
    source: "proxy",
    statusCode: 502,
    errorType: "PROXY_BAD_RESPONSE",
    errorMessage: "The WebFetch proxy returned a malformed response."
  };
  if (parsed.data.error) return y(`ccr webfetch-proxy fetch error: ${parsed.data.error.error_type}`, {
    level: "warn"
  }), {
    ok: false,
    source: "target",
    statusCode: 502,
    errorType: parsed.data.error.error_type,
    errorMessage: parsed.data.error.error_message
  };
  return {
    ok: true,
    content: parsed.data.text,
    contentType: parsed.data.content_type || "text/plain",
    destinationUrl: parsed.data.destination_url || undefined
  };
}
var proxyResponseSchema;
var initModule = L(() => {
  iO();
  s2();
  UH();
  $y();
  R_();
  $7();
  Av();
  proxyResponseSchema = NH(() => R6.object({
    url: R6.string().optional().default(""),
    destination_url: R6.string().nullable().optional(),
    title: R6.string().optional().default(""),
    text: R6.string().optional().default(""),
    content_type: R6.string().nullable().optional(),
    error: R6.object({
      error_type: R6.string(),
      error_message: R6.string()
    }).nullable().optional()
  }));
});

export {getSessionId as n9t,shouldUseCCRProxy as P$a,buildProxyUrl as xRp,fetchViaProxy as O$a,proxyResponseSchema as RRp,initModule as uco};
