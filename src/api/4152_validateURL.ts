// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {Z4a as P3a,Q4a as D3a} from "../../vendor/m4150.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {L$a as A2a,M$a as h2a} from "../../vendor/m4096.ts";
import {fo as ho} from "../../vendor/m566.ts";
import {getWebFetchUserAgent as gLr,fk as uk} from "./2032_withOAuth401Retry.ts";
import {Fl as pc,vu as ju,bt as St} from "../../vendor/m195.ts";
import {P$a as p2a,O$a as m2a,uco as f2a} from "./4096_url.ts";
import {aco as olo,lco as slo} from "../../vendor/m4093.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {getSettings_DEPRECATED as es,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {isBinaryContentType as zVr,persistBinaryContent as h$e,TMt as YLt} from "../agent/3158_persistBinaryContent.ts";
import {vMi as yLi,ree as zZ} from "../config/2668_ree.ts";
import {iU as ZF,rb as eb} from "../permissions/5178_level.ts";
import {Wc as jc} from "./3868_level.ts";
import {Gp as cm} from "../../vendor/m567.ts";
import {S7e as r7e,j3 as R3} from "../../vendor/m636.ts";
import {Ct} from "../../vendor/m131.ts";
// @ts-nocheck
var $kK = {};
pt($kK, {
  validateURL: () => validateURL,
  isPreapprovedUrl: () => isPreapprovedUrl,
  isPermittedRedirect: () => isPermittedRedirect,
  getWithPermittedRedirects: () => getWithPermittedRedirects,
  getURLMarkdownContent: () => getURLMarkdownContent,
  convertHtmlToMarkdown: () => convertHtmlToMarkdown,
  clearWebFetchCache: () => clearWebFetchCache,
  checkDomainBlocklist: () => checkDomainBlocklist,
  applyPromptToMarkdown: () => applyPromptToMarkdown,
  WebFetchTransportError: () => WebFetchTransportError,
  MAX_MARKDOWN_LENGTH: () => MAX_MARKDOWN_LENGTH
});
function clearWebFetchCache() {
  contentCache.clear(), domainAllowCache.clear();
}
function getTurndownInstance() {
  return turndownInstancePromise ??= Promise.resolve().then(() => (P3a(), D3a)).then(turndownModule => {
    let instance = new turndownModule.default();
    return instance.remove(["style", "script", "noscript", "iframe"]), instance;
  });
}
async function convertHtmlToMarkdown(html) {
  try {
    let markdown = (await getTurndownInstance()).turndown(html.slice(0, MAX_HTML_LENGTH));
    if (html.length > MAX_HTML_LENGTH) markdown += `

[Content truncated due to length...]`;
    return markdown;
  } catch (error) {
    return v(`Turndown failed, falling back to raw HTML: ${error instanceof Error ? error.message : String(error)}`, {
      level: "error"
    }), html;
  }
}
function isPreapprovedUrl(url) {
  try {
    let parsed = new URL(url);
    return A2a(parsed.hostname, parsed.pathname);
  } catch {
    return false;
  }
}
function validateURL(url) {
  if (url.length > MAX_URL_LENGTH) return false;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.username || parsed.password) return false;
  if (parsed.hostname.split(".").length < 2) return false;
  return true;
}
async function checkDomainBlocklist(hostname) {
  if (domainAllowCache.has(hostname)) return {
    status: "allowed"
  };
  try {
    let response = await ho.get(`https://api.anthropic.com/api/web/domain_info?domain=${encodeURIComponent(hostname)}`, {
      timeout: DOMAIN_CHECK_TIMEOUT_MS
    });
    if (response.status === 200) {
      if (response.data.can_fetch === true) return domainAllowCache.set(hostname, true), {
        status: "allowed"
      };
      return {
        status: "blocked"
      };
    }
    return {
      status: "check_failed",
      error: Error(`Domain check returned status ${response.status}`)
    };
  } catch (error) {
    return v(`Domain blocklist check failed for ${hostname}: ${error instanceof Error ? error.message : String(error)}`, {
      level: "error"
    }), {
      status: "check_failed",
      error: error
    };
  }
}
function isPermittedRedirect(fromUrl, toUrl) {
  try {
    let from = new URL(fromUrl),
      to = new URL(toUrl);
    if (to.protocol !== from.protocol) return false;
    if (to.port !== from.port) return false;
    if (to.username || to.password) return false;
    let stripWww = host => host.replace(/^www\./, ""),
      fromHost = stripWww(from.hostname),
      toHost = stripWww(to.hostname);
    return fromHost === toHost;
  } catch (error) {
    return false;
  }
}
async function getWithPermittedRedirects(url, signal, isRedirectAllowed, redirectCount = 0) {
  if (redirectCount > MAX_REDIRECTS) throw new TooManyRedirectsError(MAX_REDIRECTS);
  let response = await ho.get(url, {
      signal: signal,
      timeout: FETCH_TIMEOUT_MS,
      maxRedirects: 0,
      responseType: "arraybuffer",
      maxContentLength: MAX_CONTENT_LENGTH,
      validateStatus: () => true,
      headers: {
        Accept: "text/markdown, text/html, */*",
        "User-Agent": gLr()
      }
    }).catch(error => {
      if (ho.isAxiosError(error) && !ho.isCancel(error)) throw new WebFetchTransportError(error.message, error.code);
      throw error;
    }),
    {
      status: statusCode,
      headers: headers
    } = response;
  if (statusCode >= 200 && statusCode < 300) return response;
  if (REDIRECT_STATUS_CODES.has(statusCode)) {
    let location = headers.location;
    if (typeof location !== "string" || location.trim() === "") return {
      type: "http_error",
      statusCode: statusCode
    };
    let resolvedUrl = new URL(location, url).toString();
    return isRedirectAllowed(url, resolvedUrl) ? getWithPermittedRedirects(resolvedUrl, signal, isRedirectAllowed, redirectCount + 1) : {
      type: "redirect",
      originalUrl: url,
      redirectUrl: resolvedUrl,
      statusCode: statusCode
    };
  }
  if (statusCode === 403 && headers["x-proxy-error"] === "blocked-by-allowlist") throw new EgressBlockedError(new URL(url).hostname);
  let retryAfter = headers["retry-after"];
  return {
    type: "http_error",
    statusCode: statusCode,
    ...(typeof retryAfter === "string" && /^[0-9]{1,6}$/.test(retryAfter) && {
      retryAfter: retryAfter
    })
  };
}
function isRedirectOutcome(outcome) {
  return "type" in outcome && outcome.type === "redirect";
}
function isHttpErrorOutcome(outcome) {
  return "type" in outcome && outcome.type === "http_error";
}
async function getURLMarkdownContent(url, options) {
  if (!validateURL(url)) throw new pc("Invalid URL", "web-fetch-invalid-url");
  let cached = contentCache.get(url);
  if (cached) return {
    bytes: cached.bytes,
    code: cached.code,
    codeText: cached.codeText,
    content: cached.content,
    contentType: cached.contentType,
    persistedPath: cached.persistedPath,
    persistedSize: cached.persistedSize
  };
  if (p2a()) {
    let httpsUrl = url.replace(/^http:\/\//i, "https://"),
      proxyResult = await m2a(httpsUrl, options.signal);
    if (!proxyResult.ok) {
      if (proxyResult.source === "target" && proxyResult.errorType === olo) return {
        type: "provenance_denied",
        url: httpsUrl,
        errorMessage: proxyResult.errorMessage
      };
      throw new pc(Oe({
        error_type: proxyResult.errorType,
        source: proxyResult.source,
        message: proxyResult.errorMessage
      }), "web-fetch-ccr-proxy");
    }
    if (proxyResult.destinationUrl && !isPermittedRedirect(httpsUrl, proxyResult.destinationUrl)) return {
      type: "redirect",
      originalUrl: httpsUrl,
      redirectUrl: proxyResult.destinationUrl,
      statusCode: 302
    };
    let byteLength = Buffer.byteLength(proxyResult.content, "utf8"),
      proxyContent = {
        content: proxyResult.content,
        bytes: byteLength,
        code: 200,
        codeText: "OK",
        contentType: proxyResult.contentType
      };
    return contentCache.set(url, proxyContent, {
      size: Math.max(1, byteLength)
    }), proxyContent;
  }
  let parsedUrl,
    fetchUrl = url;
  try {
    if (parsedUrl = new URL(url), parsedUrl.protocol === "http:") parsedUrl.protocol = "https:", fetchUrl = parsedUrl.toString();
    let hostname = parsedUrl.hostname;
    if (!es().skipWebFetchPreflight) switch ((await checkDomainBlocklist(hostname)).status) {
      case "allowed":
        break;
      case "blocked":
        throw new DomainBlockedError(hostname);
      case "check_failed":
        throw new DomainCheckFailedError(hostname);
    }
  } catch (preflightError) {
    if (preflightError instanceof DomainBlockedError || preflightError instanceof DomainCheckFailedError) throw preflightError;
    Ie(preflightError);
  }
  let fetchResult = await getWithPermittedRedirects(fetchUrl, options.signal, isPermittedRedirect);
  if (isRedirectOutcome(fetchResult) || isHttpErrorOutcome(fetchResult)) return fetchResult;
  let bodyBuffer = Buffer.from(fetchResult.data);
  fetchResult.data = null;
  let contentType = String(fetchResult.headers["content-type"] ?? ""),
    persistedPath,
    persistedSize;
  if (zVr(contentType)) {
    let persistName = `webfetch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      persistResult = await h$e(bodyBuffer, contentType, persistName);
    if (!("error" in persistResult)) persistedPath = persistResult.filepath, persistedSize = persistResult.size;
  }
  let rawByteLength = bodyBuffer.length,
    rawText = bodyBuffer.toString("utf-8"),
    content,
    contentByteLength;
  if (contentType.includes("text/html")) content = await convertHtmlToMarkdown(rawText), contentByteLength = Buffer.byteLength(content);else content = rawText, contentByteLength = rawByteLength;
  let fetched = {
    bytes: rawByteLength,
    code: fetchResult.status,
    codeText: fetchResult.statusText,
    content: content,
    contentType: contentType,
    persistedPath: persistedPath,
    persistedSize: persistedSize
  };
  return contentCache.set(url, fetched, {
    size: Math.max(1, contentByteLength)
  }), fetched;
}
async function applyPromptToMarkdown(prompt, markdown, signal, isNonInteractiveSession, promptExtra, s) {
  let i = markdown.length > MAX_MARKDOWN_LENGTH ? markdown.slice(0, MAX_MARKDOWN_LENGTH) + `

[Content truncated due to length...]` : markdown,
    a = yLi(i, prompt, promptExtra),
    l = await ZF({
      systemPrompt: jc([]),
      userPrompt: a,
      signal: signal,
      options: {
        querySource: "web_fetch_apply",
        agents: [],
        isNonInteractiveSession: isNonInteractiveSession,
        hasAppendSystemPrompt: false,
        mcpTools: [],
        agentContext: s
      }
    });
  if (signal.aborted) throw new ju();
  let {
    content: c
  } = l.message;
  if (c.length > 0) {
    let u = c[0];
    if ("text" in u) return u.text;
  }
  return "No response from model";
}
var DomainBlockedError,
  DomainCheckFailedError,
  EgressBlockedError,
  TooManyRedirectsError,
  WebFetchTransportError,
  CONTENT_CACHE_TTL_MS = 900000,
  CONTENT_CACHE_MAX_SIZE = 52428800,
  contentCache,
  domainAllowCache,
  turndownInstancePromise,
  MAX_URL_LENGTH = 2000,
  MAX_CONTENT_LENGTH = 10485760,
  FETCH_TIMEOUT_MS = 60000,
  DOMAIN_CHECK_TIMEOUT_MS = 1e4,
  MAX_REDIRECTS = 10,
  MAX_MARKDOWN_LENGTH = 1e5,
  MAX_HTML_LENGTH = 1048576,
  REDIRECT_STATUS_CODES;
var R8q = b(() => {
  cm();
  r7e();
  Ct();
  eb();
  je();
  St();
  uk();
  wn();
  YLt();
  Er();
  Xt();
  f2a();
  h2a();
  zZ();
  slo();
  DomainBlockedError = class DomainBlockedError extends Error {
    constructor(hostname) {
      super(`Claude Code is unable to fetch from ${hostname}`);
      this.name = "DomainBlockedError";
    }
  };
  DomainCheckFailedError = class DomainCheckFailedError extends Error {
    constructor(hostname) {
      super(`Unable to verify if domain ${hostname} is safe to fetch. This may be due to network restrictions or enterprise security policies blocking claude.ai.`);
      this.name = "DomainCheckFailedError";
    }
  };
  EgressBlockedError = class EgressBlockedError extends Error {
    domain;
    constructor(hostname) {
      super(Oe({
        error_type: "EGRESS_BLOCKED",
        domain: hostname,
        message: `Access to ${hostname} is blocked by the network egress proxy.`
      }));
      this.domain = hostname;
      this.name = "EgressBlockedError";
    }
  };
  TooManyRedirectsError = class TooManyRedirectsError extends Error {
    constructor(max) {
      super(`Too many redirects (exceeded ${max})`);
      this.name = "TooManyRedirectsError";
    }
  };
  WebFetchTransportError = class WebFetchTransportError extends Error {
    code;
    constructor(message, code) {
      super(message);
      this.name = "WebFetchTransportError", this.code = code;
    }
  };
  contentCache = new R3({
    maxSize: CONTENT_CACHE_MAX_SIZE,
    ttl: CONTENT_CACHE_TTL_MS
  }), domainAllowCache = new R3({
    max: 128,
    ttl: 300000
  });
  REDIRECT_STATUS_CODES = new Set([301, 302, 303, 307, 308]);
});

export {$kK as iqa,clearWebFetchCache,getTurndownInstance as WHp,convertHtmlToMarkdown,isPreapprovedUrl,validateURL,checkDomainBlocklist,isPermittedRedirect,getWithPermittedRedirects,isRedirectOutcome as JHp,isHttpErrorOutcome as XHp,getURLMarkdownContent,applyPromptToMarkdown,DomainBlockedError as Ouo,DomainCheckFailedError as Luo,EgressBlockedError as nqa,TooManyRedirectsError as rqa,WebFetchTransportError,CONTENT_CACHE_TTL_MS as UHp,CONTENT_CACHE_MAX_SIZE as $Hp,contentCache as o9n,domainAllowCache as Muo,turndownInstancePromise as jHp,MAX_URL_LENGTH as GHp,MAX_CONTENT_LENGTH as VHp,FETCH_TIMEOUT_MS as KHp,DOMAIN_CHECK_TIMEOUT_MS as zHp,MAX_REDIRECTS as eqa,MAX_MARKDOWN_LENGTH,MAX_HTML_LENGTH as tqa,REDIRECT_STATUS_CODES as YHp,R8q as Fuo};
