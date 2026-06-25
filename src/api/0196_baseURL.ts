// @ts-nocheck
import {runStartupDialog as sT} from "../../vendor/m142.ts";
import {W6o as Q2o,G6o as Z2o,K6o as t$o,z6o as n$o,initSessionMetadataPersistence as MV,V6o as e$o,B6o as z2o,JSt as b_t,zJt as fzt,KJt as mzt,slr as Hrr} from "../core/0140_key.ts";
import {Qs as mi,ma as Ia,elr as vrr,Uo as es,Xr as Yr,qp as xm,WSt as A_t,Zde as Gde,sK as E3,uk as TH,Qde as Wde,YH as SH,sMe as dLe,KSt as __t,jSt as T_t,GSt as h_t,oMe as uLe,YSt as S_t,VSt as g_t,zSt as y_t} from "../../vendor/m137.ts";
import {llr as Prr,JH as serializeToolResult,tpe as Kde,ZSt as v_t} from "../../vendor/m143.ts";
import {resolveCredentialsFromConfig,defaultCredentials,oXt as vzt} from "../../vendor/m149.ts";
import {TokenCache,ZJt as Tzt} from "../../vendor/m141.ts";
import {is as Ss,oA as QC} from "../../vendor/m158.ts";
import {M6o as G2o,rlr as xrr,VJt as pzt,F6o as K2o,Wbe as lSe} from "../../vendor/m138.ts";
import {OAUTH_API_BETA_HEADER,TX as SX} from "../../vendor/m140.ts";
import {cMe as ALe,iXt as Rzt} from "../../vendor/m153.ts";
import {lXt as kzt,dk as Yx} from "../../vendor/m154.ts";
import {b} from "../../runtime.ts";
import {blr as Vrr} from "../../vendor/m157.ts";
import {a7e as dGe} from "../../vendor/m194.ts";
import {ecr as wor,Ybe as fSe} from "../../vendor/m188.ts";
import {dcr as Nor,i7e as uGe} from "../../vendor/m193.ts";
import {Zlr as vor,TR as slowOpTracer} from "../../vendor/m187.ts";
import {ucr as Mor,BU as _2} from "../../vendor/m192.ts";
import {cXt as Hzt} from "../../vendor/m156.ts";
class BaseAnthropic {
  get credentials() {
    return this._authState.provider;
  }
  constructor({
    baseURL: e = sT("ANTHROPIC_BASE_URL"),
    apiKey: t,
    authToken: n,
    ...r
  } = {}) {
    if (Bor.add(this), this._requestAuthFlags = new WeakMap(), Jzt.set(this, void 0), t === void 0) t = r.profile != null ? null : sT("ANTHROPIC_API_KEY") ?? null;
    if (n === void 0) n = r.profile != null ? null : sT("ANTHROPIC_AUTH_TOKEN") ?? null;
    if (r.profile != null && (r.credentials != null || r.config != null)) throw TypeError("Pass at most one of `profile`, `credentials`, or `config`.");
    let o = {
      apiKey: t,
      authToken: n,
      ...r,
      baseURL: e || "https://api.anthropic.com"
    };
    if (!o.dangerouslyAllowBrowser && Q2o()) throw new mi(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
    this.baseURL = o.baseURL, this._baseURLIsExplicit = r.__baseURLIsExplicit ?? !!e, this.timeout = o.timeout ?? For.DEFAULT_TIMEOUT, this.logger = o.logger ?? console;
    let s = "warn";
    this.logLevel = s, this.logLevel = Prr(o.logLevel, "ClientOptions.logLevel", this) ?? Prr(sT("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? s, this.fetchOptions = o.fetchOptions, this.maxRetries = o.maxRetries ?? 2, this.fetch = o.fetch ?? Z2o(), Ia(this, Jzt, t$o, "f");
    let i = sT("ANTHROPIC_CUSTOM_HEADERS");
    if (i) {
      let l = {};
      for (let c of i.split(`
`)) {
        let u = c.indexOf(":");
        if (u >= 0) l[c.substring(0, u).trim()] = c.substring(u + 1).trim();
      }
      o.defaultHeaders = {
        ...l,
        ...o.defaultHeaders
      };
    }
    let a = r.__auth;
    if (delete o.__auth, delete o.__baseURLIsExplicit, this._options = o, this.apiKey = typeof t === "string" ? t : null, this.authToken = n, a) {
      if (this._authState = a, !this._baseURLIsExplicit && a.baseURL) this.baseURL = a.baseURL;
    } else if (this._authState = {
      provider: null,
      tokenCache: null,
      resolution: null,
      error: null,
      extraHeaders: {}
    }, this.apiKey == null && this.authToken == null) {
      let l = o.credentials ?? null;
      if (l) this._authState.provider = l, this._authState.tokenCache = this._makeTokenCache(l);else if (o.config != null) {
        let c = resolveCredentialsFromConfig(o.config, this._credentialResolverOptions());
        this._authState.provider = c.provider, this._authState.tokenCache = this._makeTokenCache(c.provider), this._authState.extraHeaders = c.extraHeaders, this._applyCredentialBaseURL(c.baseURL);
      } else if (o.profile != null) this._authState.resolution = this._resolveDefaultCredentials(o.profile);else this._authState.resolution = this._resolveDefaultCredentials();
    }
  }
  _applyCredentialBaseURL(e) {
    if (!e) return;
    let t = e.replace(/\/+$/, "");
    if (this._authState.baseURL = t, !this._baseURLIsExplicit) this.baseURL = t;
  }
  _credentialResolverOptions() {
    return {
      baseURL: this.baseURL,
      fetch: this.fetch,
      userAgent: this.getUserAgent(),
      onCacheWriteError: e => {
        serializeToolResult(this).debug("credential cache write failed (best-effort)", e);
      },
      onSafetyWarning: e => {
        serializeToolResult(this).warn(e);
      }
    };
  }
  _makeTokenCache(e) {
    return new TokenCache(e, t => {
      serializeToolResult(this).debug("advisory token refresh failed; serving cached token", t);
    });
  }
  withOptions(e) {
    let t = "credentials" in e || "config" in e || "profile" in e,
      n = "apiKey" in e || "authToken" in e || t,
      r = {
        ...this._options,
        ...(this._baseURLIsExplicit ? {
          baseURL: this.baseURL
        } : {}),
        maxRetries: this.maxRetries,
        timeout: this.timeout,
        logger: this.logger,
        logLevel: this.logLevel,
        fetch: this.fetch,
        fetchOptions: this.fetchOptions,
        apiKey: this.apiKey,
        authToken: this.authToken,
        credentials: this.credentials,
        ...(t ? {
          credentials: void 0,
          config: void 0,
          profile: void 0
        } : {}),
        ...e,
        __auth: n ? void 0 : this._authState,
        __baseURLIsExplicit: "baseURL" in e ? !0 : this._baseURLIsExplicit
      };
    return new this.constructor(r);
  }
  async _resolveDefaultCredentials(e) {
    try {
      let t = await defaultCredentials(this._credentialResolverOptions(), e);
      if (t) this._authState.provider = t.provider, this._authState.tokenCache = this._makeTokenCache(t.provider), this._authState.extraHeaders = t.extraHeaders, this._applyCredentialBaseURL(t.baseURL);else if (e != null) throw new mi(`Profile "${e}" could not be resolved (no <config_dir>/configs/${e}.json found).`);
    } catch (t) {
      this._authState.error = t;
    } finally {
      this._authState.resolution = null;
    }
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({
    values: e,
    nulls: t
  }) {
    if (e.get("x-api-key") || e.get("authorization")) return;
    if (this._authState.error) throw this._authState.error;
    if (this._authState.tokenCache || this._authState.resolution) return;
    if (this.apiKey && e.get("x-api-key")) return;
    if (t.has("x-api-key")) return;
    if (this.authToken && e.get("authorization")) return;
    if (t.has("authorization")) return;
    throw Error('Could not resolve authentication method. Expected one of apiKey, authToken, credentials, config, or profile to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted');
  }
  _authFlags(e) {
    let t = this._requestAuthFlags.get(e);
    if (!t) t = {
      usedTokenCache: !1,
      didRefreshFor401: !1
    }, this._requestAuthFlags.set(e, t);
    return t;
  }
  async authHeaders(e) {
    if (this._authState.resolution) await this._authState.resolution;
    if (this._authState.error) return;
    if (this._authState.tokenCache && this.apiKey == null) {
      let t = await this._authState.tokenCache.getToken();
      return this._authFlags(e).usedTokenCache = !0, Ss([{
        Authorization: `Bearer ${t}`
      }]);
    }
    return Ss([await this.apiKeyAuth(e), await this.bearerAuth(e)]);
  }
  async apiKeyAuth(e) {
    if (this.apiKey == null) return;
    return Ss([{
      "X-Api-Key": this.apiKey
    }]);
  }
  async bearerAuth(e) {
    if (this.authToken == null) return;
    return Ss([{
      Authorization: `Bearer ${this.authToken}`
    }]);
  }
  stringifyQuery(e) {
    return n$o(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${MV}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${vrr()}`;
  }
  makeStatusError(e, t, n, r) {
    return es.generate(e, t, n, r);
  }
  buildURL(e, t, n) {
    let r = !Yr(this, Bor, "m", e9o).call(this) && n || this.baseURL,
      o = G2o(e) ? new URL(e) : new URL(r + (r.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)),
      s = this.defaultQuery(),
      i = Object.fromEntries(o.searchParams);
    if (!xrr(s) || !xrr(i)) t = {
      ...i,
      ...s,
      ...t
    };
    if (typeof t === "object" && t && !Array.isArray(t)) o.search = this.stringifyQuery(t);
    return o.toString();
  }
  _calculateNonstreamingTimeout(e) {
    if (3600 * e / 128000 > 600) throw new mi("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
    return 600000;
  }
  async prepareOptions(e) {}
  async prepareRequest(e, {
    url: t,
    options: n
  }) {
    if (this._authState.tokenCache && this.apiKey == null) {
      let r = e.headers instanceof Headers ? e.headers : new Headers(e.headers);
      for (let [s, i] of Object.entries(this._authState.extraHeaders)) if (!r.has(s)) r.set(s, i);
      if (!r.get("anthropic-beta")?.split(",").map(s => s.trim())?.includes(OAUTH_API_BETA_HEADER)) r.append("anthropic-beta", OAUTH_API_BETA_HEADER);
      e.headers = r;
    }
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, n) {
    return this.request(Promise.resolve(n).then(r => ({
      method: e,
      path: t,
      ...r
    })));
  }
  request(e, t = null) {
    return new ALe(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, n) {
    let r = await e,
      o = r.maxRetries ?? this.maxRetries;
    if (t == null) t = o, this._requestAuthFlags.delete(r);
    await this.prepareOptions(r);
    let {
      req: s,
      url: i,
      timeout: a
    } = await this.buildRequest(r, {
      retryCount: o - t
    });
    await this.prepareRequest(s, {
      url: i,
      options: r
    });
    let l = "log_" + (Math.random() * 16777216 | 0).toString(16).padStart(6, "0"),
      c = n === void 0 ? "" : `, retryOf: ${n}`,
      u = Date.now();
    if (serializeToolResult(this).debug(`[${l}] sending request`, Kde({
      retryOfRequestLogID: n,
      method: r.method,
      url: i,
      options: r,
      headers: s.headers
    })), r.signal?.aborted) throw new xm();
    let d = new AbortController(),
      p = await this.fetchWithTimeout(i, s, a, d).catch(A_t),
      m = Date.now();
    if (p instanceof globalThis.Error) {
      let h = `retrying, ${t} attempts remaining`;
      if (r.signal?.aborted) throw new xm();
      let g = Gde(p) || /timed? ?out/i.test(String(p) + ("cause" in p ? String(p.cause) : ""));
      if (t) return serializeToolResult(this).info(`[${l}] connection ${g ? "timed out" : "failed"} - ${h}`), serializeToolResult(this).debug(`[${l}] connection ${g ? "timed out" : "failed"} (${h})`, Kde({
        retryOfRequestLogID: n,
        url: i,
        durationMs: m - u,
        message: p.message
      })), this.retryRequest(r, t, n ?? l);
      if (serializeToolResult(this).info(`[${l}] connection ${g ? "timed out" : "failed"} - error; no more retries left`), serializeToolResult(this).debug(`[${l}] connection ${g ? "timed out" : "failed"} (error; no more retries left)`, Kde({
        retryOfRequestLogID: n,
        url: i,
        durationMs: m - u,
        message: p.message
      })), g) throw new E3();
      throw new TH({
        cause: p
      });
    }
    let f = [...p.headers.entries()].filter(([h]) => h === "request-id").map(([h, g]) => ", " + h + ": " + JSON.stringify(g)).join(""),
      A = `[${l}${c}${f}] ${s.method} ${i} ${p.ok ? "succeeded" : "failed"} with status ${p.status} in ${m - u}ms`;
    if (!p.ok) {
      let h = await this.shouldRetry(p, r);
      if (t && h) {
        let v = `retrying, ${t} attempts remaining`;
        return await e$o(p.body), serializeToolResult(this).info(`${A} - ${v}`), serializeToolResult(this).debug(`[${l}] response error (${v})`, Kde({
          retryOfRequestLogID: n,
          url: p.url,
          status: p.status,
          headers: p.headers,
          durationMs: m - u
        })), this.retryRequest(r, t, n ?? l, p.headers);
      }
      let g = h ? "error; no more retries left" : "error; not retryable";
      serializeToolResult(this).info(`${A} - ${g}`);
      let _ = await p.text().catch(v => A_t(v).message),
        y = pzt(_),
        T = y ? void 0 : _;
      throw serializeToolResult(this).debug(`[${l}] response error (${g})`, Kde({
        retryOfRequestLogID: n,
        url: p.url,
        status: p.status,
        headers: p.headers,
        message: T,
        durationMs: Date.now() - u
      })), this.makeStatusError(p.status, y, T, p.headers);
    }
    return serializeToolResult(this).info(A), serializeToolResult(this).debug(`[${l}] response start`, Kde({
      retryOfRequestLogID: n,
      url: p.url,
      status: p.status,
      headers: p.headers,
      durationMs: m - u
    })), {
      response: p,
      options: r,
      controller: d,
      requestLogID: l,
      retryOfRequestLogID: n,
      startTime: u
    };
  }
  getAPIList(e, t, n) {
    return this.requestAPIList(t, n && "then" in n ? n.then(r => ({
      method: "get",
      path: e,
      ...r
    })) : {
      method: "get",
      path: e,
      ...n
    });
  }
  requestAPIList(e, t) {
    let n = this.makeRequest(t, null, void 0);
    return new kzt(this, n, e);
  }
  async fetchWithTimeout(e, t, n, r) {
    let {
        signal: o,
        method: s,
        ...i
      } = t || {},
      a = this._makeAbort(r);
    if (o) o.addEventListener("abort", a, {
      once: !0
    });
    let l = setTimeout(a, n),
      c = globalThis.ReadableStream && i.body instanceof globalThis.ReadableStream || typeof i.body === "object" && i.body !== null && Symbol.asyncIterator in i.body,
      u = {
        signal: r.signal,
        ...(c ? {
          duplex: "half"
        } : {}),
        method: "GET",
        ...i
      };
    if (s) u.method = s.toUpperCase();
    try {
      return await this.fetch.call(void 0, e, u);
    } finally {
      clearTimeout(l);
    }
  }
  async shouldRetry(e, t) {
    let n = this._authFlags(t);
    if (e.status === 401 && this._authState.tokenCache && n.usedTokenCache && !n.didRefreshFor401) return n.didRefreshFor401 = !0, this._authState.tokenCache.invalidate(), !0;
    let r = e.headers.get("x-should-retry");
    if (r === "true") return !0;
    if (r === "false") return !1;
    if (e.status === 408) return !0;
    if (e.status === 409) return !0;
    if (e.status === 429) return !0;
    if (e.status >= 500) return !0;
    return !1;
  }
  async retryRequest(e, t, n, r) {
    let o,
      s = r?.get("retry-after-ms");
    if (s) {
      let a = parseFloat(s);
      if (!Number.isNaN(a)) o = a;
    }
    let i = r?.get("retry-after");
    if (i && !o) {
      let a = parseFloat(i);
      if (!Number.isNaN(a)) o = a * 1000;else o = Date.parse(i) - Date.now();
    }
    if (o === void 0) {
      let a = e.maxRetries ?? this.maxRetries;
      o = this.calculateDefaultRetryTimeoutMillis(t, a);
    }
    return await z2o(o), this.makeRequest(e, t - 1, n);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    let o = t - e,
      s = Math.min(0.5 * Math.pow(2, o), 8),
      i = 1 - Math.random() * 0.25;
    return s * i * 1000;
  }
  calculateNonstreamingTimeout(e, t) {
    if (3600000 * e / 128000 > 600000 || t != null && e > t) throw new mi("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
    return 600000;
  }
  async buildRequest(e, {
    retryCount: t = 0
  } = {}) {
    let n = {
        ...e
      },
      {
        method: r,
        path: o,
        query: s,
        defaultBaseURL: i
      } = n;
    if (this._authState.resolution) await this._authState.resolution;
    if (!this._baseURLIsExplicit && this._authState.baseURL && this.baseURL !== this._authState.baseURL) this.baseURL = this._authState.baseURL;
    let a = this.buildURL(o, s, i);
    if ("timeout" in n) K2o("timeout", n.timeout);
    n.timeout = n.timeout ?? this.timeout;
    let {
        bodyHeaders: l,
        body: c
      } = this.buildBody({
        options: n
      }),
      u = await this.buildHeaders({
        options: e,
        method: r,
        bodyHeaders: l,
        retryCount: t
      });
    return {
      req: {
        method: r,
        headers: u,
        ...(n.signal && {
          signal: n.signal
        }),
        ...(globalThis.ReadableStream && c instanceof globalThis.ReadableStream && {
          duplex: "half"
        }),
        ...(c && {
          body: c
        }),
        ...(this.fetchOptions ?? {}),
        ...(n.fetchOptions ?? {})
      },
      url: a,
      timeout: n.timeout
    };
  }
  async buildHeaders({
    options: e,
    method: t,
    bodyHeaders: n,
    retryCount: r
  }) {
    let o = {};
    if (this.idempotencyHeader && t !== "get") {
      if (!e.idempotencyKey) e.idempotencyKey = this.defaultIdempotencyKey();
      o[this.idempotencyHeader] = e.idempotencyKey;
    }
    let s = Ss([o, {
      Accept: "application/json",
      "User-Agent": this.getUserAgent(),
      "X-Stainless-Retry-Count": String(r),
      ...(e.timeout ? {
        "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1000))
      } : {}),
      ...b_t(),
      ...(this._options.dangerouslyAllowBrowser ? {
        "anthropic-dangerous-direct-browser-access": "true"
      } : void 0),
      "anthropic-version": "2023-06-01"
    }, await this.authHeaders(e), this._options.defaultHeaders, n, e.headers]);
    return this.validateHeaders(s), s.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({
    options: {
      body: e,
      headers: t
    }
  }) {
    if (!e) return {
      bodyHeaders: void 0,
      body: void 0
    };
    let n = Ss([t]);
    if (ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e === "string" && n.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || globalThis.ReadableStream && e instanceof globalThis.ReadableStream) return {
      bodyHeaders: void 0,
      body: e
    };else if (typeof e === "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next === "function")) return {
      bodyHeaders: void 0,
      body: fzt(e)
    };else if (typeof e === "object" && n.values.get("content-type") === "application/x-www-form-urlencoded") return {
      bodyHeaders: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: this.stringifyQuery(e)
    };else return Yr(this, Jzt, "f").call(this, {
      body: e,
      headers: n
    });
  }
}
var Bor,
  For,
  Jzt,
  e9o,
  t9o = "\\n\\nHuman:",
  n9o = "\\n\\nAssistant:",
  y2;
var isCompletedWithKeepalive = b(() => {
  Wde();
  lSe();
  mzt();
  Hrr();
  SH();
  SX();
  Tzt();
  vzt();
  Yx();
  Vrr();
  dGe();
  Rzt();
  wor();
  Nor();
  vor();
  Mor();
  mzt();
  QC();
  v_t();
  lSe();
  For = BaseAnthropic, Jzt = new WeakMap(), Bor = new WeakSet(), e9o = function () {
    return this.baseURL !== "https://api.anthropic.com";
  };
  BaseAnthropic.Anthropic = For;
  BaseAnthropic.HUMAN_PROMPT = t9o;
  BaseAnthropic.AI_PROMPT = n9o;
  BaseAnthropic.DEFAULT_TIMEOUT = 600000;
  BaseAnthropic.AnthropicError = mi;
  BaseAnthropic.APIError = es;
  BaseAnthropic.APIConnectionError = TH;
  BaseAnthropic.APIConnectionTimeoutError = E3;
  BaseAnthropic.APIUserAbortError = xm;
  BaseAnthropic.NotFoundError = dLe;
  BaseAnthropic.ConflictError = __t;
  BaseAnthropic.RateLimitError = T_t;
  BaseAnthropic.BadRequestError = h_t;
  BaseAnthropic.AuthenticationError = uLe;
  BaseAnthropic.InternalServerError = S_t;
  BaseAnthropic.PermissionDeniedError = g_t;
  BaseAnthropic.UnprocessableEntityError = y_t;
  BaseAnthropic.toFile = Hzt;
  y2 = class y2 extends BaseAnthropic {
    constructor() {
      super(...arguments);
      this.completions = new fSe(this), this.messages = new _2(this), this.models = new uGe(this), this.beta = new slowOpTracer(this);
    }
  };
  y2.Completions = fSe;
  y2.Messages = _2;
  y2.Models = uGe;
  y2.Beta = slowOpTracer;
});
export {BaseAnthropic,Bor as pcr,For as mcr,Jzt as HXt,e9o as V5o,t9o as K5o,n9o as z5o,y2 as UU,isCompletedWithKeepalive as cK};
