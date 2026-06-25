// @ts-nocheck
import {y7,Ph} from "../agent/1459_agentType.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {getUserAgent as N7,kk} from "../api/2037_withOAuth401Retry.ts";
import {getSessionId as It,z_,getIsNonInteractiveSession as kr,isGatewayAuthExpired as car,lt} from "../session/0132_sent.ts";
import {Txr} from "../../vendor/m1459.ts";
import {logForDebugging as A,isDebugToStdErr as ZL,getMinDebugLogLevel as SMe,qe} from "./0236_setHasFormattedOutput.ts";
import {nt,Za} from "../../vendor/m127.ts";
import {checkAndRefreshOAuthTokenIfNeeded as Dh,getClaudeAIOAuthTokens as qs,isAnthropicAuthEnabled as aT,refreshAndGetAwsCredentials as A3,refreshGcpCredentialsIfNeeded as OBe,getAnthropicApiKey as Gv,shouldUseWIFAuth as dE,getApiKeyFromApiKeyHelper as sZe,lo} from "./2036_withOAuthRefreshLock.ts";
import {B5s,Imn} from "../agent/1461_ISSUES_EXPLAINER.ts";
import {getProxyAuthFromHelper as Oln,getProxyFetchOptions as nT,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {getProviderForModel as w_,isFirstPartyAnthropicBaseUrl as Su,getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {t2,b1e,E1e} from "../../vendor/m614.ts";
import {$Ae,xXe} from "../../vendor/m1486.ts";
import {UU} from "../api/0196_baseURL.ts";
import {jXe,zXe} from "../core/1621_default.ts";
import {Kzs,Vzs} from "../core/1629_default.ts";
import {_oi,goi} from "../../vendor/m1946.ts";
import {Ioi,Hoi} from "../core/1957_default.ts";
import {vyn,Ryn} from "../core/2024_default.ts";
import {wyn,iai} from "../../vendor/m2024.ts";
import {xre,rA,KKe,dn} from "./0137_namespace.ts";
import {getWIFTokenCache as qAe,getWIFCredentials as DXe,PXe} from "../api/1489_withCredentialsLock.ts";
import {rDr,OXe} from "../../vendor/m1489.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {getSmallFastModel as xR,getMainLoopModel as gs,getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,getClientDataAtis as zFr,ATIS_REQUEST_HEADER as KFr,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {b} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {mn,He} from "../telemetry/0600_feature_name.ts";
/**
 * Anthropic SDK client construction + streaming byte-watchdog.
 *
 * Builds the right Anthropic SDK client for the active provider route
 * (firstParty / gateway / bedrock / foundry / anthropicAws / mantle / vertex),
 * wiring auth headers, custom headers, proxy fetch options, and an optional
 * idle byte-stream watchdog that aborts stalled SSE / event-stream responses.
 */

/** Build a console-backed SDK logger (used when debug-to-stderr is enabled). */
function xRe() {
  return {
    error: (message: unknown, ...rest: unknown[]) => console.error("[Anthropic SDK ERROR]", message, ...rest),
    warn: (message: unknown, ...rest: unknown[]) => console.error("[Anthropic SDK WARN]", message, ...rest),
    info: (message: unknown, ...rest: unknown[]) => console.error("[Anthropic SDK INFO]", message, ...rest),
    debug: (message: unknown, ...rest: unknown[]) => console.error("[Anthropic SDK DEBUG]", message, ...rest)
  };
}

/**
 * Construct an Anthropic SDK client for the resolved provider route.
 * @param apiKey       explicit API key override (else resolved from env/config)
 * @param maxRetries   SDK retry count
 * @param model        target model id
 * @param fetchOverride optional fetch implementation override
 * @param source       request source tag (for debug logging)
 * @param agentContext per-agent context (carries agentId / parentAgentId headers)
 */
async function p8({
  apiKey: apiKey,
  maxRetries: maxRetries,
  model: model,
  fetchOverride: fetchOverride,
  source: source,
  agentContext: agentContext
}) {
  let containerId = process.env.CLAUDE_CODE_CONTAINER_ID,
    remoteSessionId = process.env.CLAUDE_CODE_REMOTE_SESSION_ID,
    clientApp = process.env.CLAUDE_AGENT_SDK_CLIENT_APP,
    resolvedAgentContext = y7(agentContext) ? void 0 : agentContext,
    customHeaders = WFr(),
    defaultHeaders: Record<string, string> = {
      "x-app": Ws() ? "cli-bg" : "cli",
      "User-Agent": N7(),
      "X-Claude-Code-Session-Id": It(),
      ...customHeaders,
      ...(containerId && {
        "x-claude-remote-container-id": containerId
      }),
      ...(remoteSessionId && {
        "x-claude-remote-session-id": remoteSessionId
      }),
      ...(clientApp && {
        "x-client-app": clientApp
      }),
      ...(resolvedAgentContext?.agentId && {
        "x-claude-code-agent-id": Txr(resolvedAgentContext.agentId)
      }),
      ...(resolvedAgentContext?.parentAgentId && {
        "x-claude-code-parent-agent-id": Txr(resolvedAgentContext.parentAgentId)
      })
    };
  if (A(`[API:request] Creating client, ANTHROPIC_CUSTOM_HEADERS present: ${!!process.env.ANTHROPIC_CUSTOM_HEADERS}, has Authorization header: ${!!customHeaders.Authorization}`), nt(process.env.CLAUDE_CODE_ADDITIONAL_PROTECTION)) defaultHeaders["x-anthropic-additional-protection"] = "true";
  A("[API:auth] OAuth token check starting"), await Dh(), A("[API:auth] OAuth token check complete");
  let oauthTokens = qs(),
    useOAuthToken = B5s({
      anthropicAuthEnabled: aT(),
      oauthScopes: oauthTokens?.scopes
    });
  if (!useOAuthToken && !z_()) await qZu(defaultHeaders, kr());
  await Oln();
  let fetchImpl = YZu(fetchOverride, source),
    provider = w_(model);
  UZu();
  let awsRegionOverride = provider === "bedrock" || provider === "mantle" ? await t2() : void 0,
    clientOptions: Record<string, unknown> = {
      defaultHeaders: defaultHeaders,
      maxRetries: maxRetries,
      timeout: parseInt(process.env.API_TIMEOUT_MS || String(600000), 10),
      dangerouslyAllowBrowser: !0,
      fetchOptions: nT({
        forAnthropicAPI: !0,
        hasBodyIdleWatchdog: jZu(provider),
        url: WZu(provider, model, awsRegionOverride)
      }),
      ...(fetchImpl && {
        fetch: fetchImpl
      }),
      ...$Zu
    };
  if (provider === "gateway") {
    await $Ae();
    let gatewaySession = z_();
    if (!gatewaySession || car()) throw Error("Cloud gateway session expired — run /login to reconnect.");
    let {
      rest: restHeaders
    } = U0t(clientOptions.defaultHeaders);
    return new UU({
      ...clientOptions,
      defaultHeaders: {
        ...restHeaders,
        Authorization: `Bearer ${gatewaySession.jwt}`
      },
      apiKey: null,
      baseURL: gatewaySession.url,
      authToken: gatewaySession.jwt,
      ...(ZL() && {
        logger: xRe()
      })
    });
  }
  if (provider === "bedrock") {
    let {
        AnthropicBedrock: AnthropicBedrock
      } = await Promise.resolve().then(() => (jXe(), zXe)),
      awsRegion = kyn(model, awsRegionOverride),
      skipBedrockAuth = nt(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH),
      splitAuth = U0t(clientOptions.defaultHeaders),
      bedrockHeaders = {
        ...splitAuth.rest,
        Authorization: null,
        ...(process.env.ANTHROPIC_BEDROCK_SERVICE_TIER && {
          "X-Amzn-Bedrock-Service-Tier": process.env.ANTHROPIC_BEDROCK_SERVICE_TIER
        })
      },
      bearerToken = process.env.AWS_BEARER_TOKEN_BEDROCK?.trim(),
      authHeaderValue = bearerToken ? `Bearer ${bearerToken}` : skipBedrockAuth ? splitAuth.value : void 0,
      awsCredentials = !authHeaderValue && !skipBedrockAuth ? await A3() : null,
      bedrockOptions = {
        ...clientOptions,
        defaultHeaders: bedrockHeaders,
        awsRegion: awsRegion,
        apiKey: null,
        ...(skipBedrockAuth && !authHeaderValue && {
          skipAuth: !0
        }),
        ...(authHeaderValue && {
          apiKey: authHeaderValue.match(/^Bearer (.+)$/i)?.[1] ?? authHeaderValue,
          defaultHeaders: {
            ...bedrockHeaders,
            Authorization: authHeaderValue
          }
        }),
        ...(ZL() && {
          logger: xRe()
        })
      };
    return awsCredentials ? new AnthropicBedrock({
      ...bedrockOptions,
      awsAccessKey: awsCredentials.accessKeyId,
      awsSecretKey: awsCredentials.secretAccessKey,
      awsSessionToken: awsCredentials.sessionToken
    }) : new AnthropicBedrock(bedrockOptions);
  }
  if (provider === "foundry") {
    let {
        AnthropicFoundry: AnthropicFoundry
      } = await Promise.resolve().then(() => (Kzs(), Vzs)),
      azureTokenProvider;
    if (!process.env.ANTHROPIC_FOUNDRY_API_KEY) if (nt(process.env.CLAUDE_CODE_SKIP_FOUNDRY_AUTH)) azureTokenProvider = () => Promise.resolve("");else {
      let {
        DefaultAzureCredential: DefaultAzureCredential,
        getBearerTokenProvider: getBearerTokenProvider
      } = await Promise.resolve().then(() => (_oi(), goi));
      azureTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default");
    }
    let foundryOptions = {
      ...clientOptions,
      ...(azureTokenProvider && {
        azureADTokenProvider: azureTokenProvider
      }),
      ...(ZL() && {
        logger: xRe()
      })
    };
    return new AnthropicFoundry(foundryOptions);
  }
  if (provider === "anthropicAws") {
    let {
        AnthropicAws: AnthropicAws
      } = await Promise.resolve().then(() => (Ioi(), Hoi)),
      skipAnthropicAwsAuth = nt(process.env.CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH),
      splitAuth = U0t(clientOptions.defaultHeaders),
      authHeaderValue = skipAnthropicAwsAuth ? splitAuth.value : void 0,
      anthropicAwsOptions: Record<string, unknown> = {
        ...clientOptions,
        defaultHeaders: {
          ...splitAuth.rest,
          Authorization: null
        },
        ...(skipAnthropicAwsAuth && !authHeaderValue && {
          skipAuth: !0
        }),
        ...(authHeaderValue && {
          apiKey: authHeaderValue.match(/^Bearer (.+)$/i)?.[1] ?? authHeaderValue,
          defaultHeaders: {
            ...splitAuth.rest,
            Authorization: authHeaderValue
          }
        }),
        ...(ZL() && {
          logger: xRe()
        })
      };
    if (!process.env.ANTHROPIC_AWS_API_KEY && !skipAnthropicAwsAuth) {
      let awsCredentials = await A3();
      if (awsCredentials) anthropicAwsOptions.awsAccessKey = awsCredentials.accessKeyId, anthropicAwsOptions.awsSecretAccessKey = awsCredentials.secretAccessKey, anthropicAwsOptions.awsSessionToken = awsCredentials.sessionToken;
    }
    return new AnthropicAws(anthropicAwsOptions);
  }
  if (provider === "mantle") {
    let {
        AnthropicBedrockMantle: AnthropicBedrockMantle
      } = await Promise.resolve().then(() => (jXe(), zXe)),
      skipMantleAuth = nt(process.env.CLAUDE_CODE_SKIP_MANTLE_AUTH),
      splitAuth = U0t(clientOptions.defaultHeaders),
      authHeaderValue = skipMantleAuth ? splitAuth.value : void 0,
      bearerToken = process.env.AWS_BEARER_TOKEN_BEDROCK?.trim(),
      awsCredentials = !bearerToken && !skipMantleAuth ? await A3() : null;
    return new AnthropicBedrockMantle({
      ...clientOptions,
      defaultHeaders: bearerToken ? {
        ...splitAuth.rest,
        Authorization: `Bearer ${bearerToken}`
      } : {
        ...splitAuth.rest,
        Authorization: null
      },
      awsRegion: kyn(model, awsRegionOverride),
      ...(skipMantleAuth && !authHeaderValue && {
        skipAuth: !0
      }),
      ...(authHeaderValue && {
        apiKey: authHeaderValue.match(/^Bearer (.+)$/i)?.[1] ?? authHeaderValue,
        defaultHeaders: {
          ...splitAuth.rest,
          Authorization: authHeaderValue
        }
      }),
      ...(awsCredentials && {
        awsAccessKey: awsCredentials.accessKeyId,
        awsSecretAccessKey: awsCredentials.secretAccessKey,
        awsSessionToken: awsCredentials.sessionToken
      }),
      ...(ZL() && {
        logger: xRe()
      })
    });
  }
  if (provider === "vertex") {
    if (!nt(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)) await OBe();
    let [{
        AnthropicVertex: AnthropicVertex
      }, {
        buildVertexGoogleAuth: buildVertexGoogleAuth
      }] = await Promise.all([Promise.resolve().then(() => (vyn(), Ryn)), Promise.resolve().then(() => (wyn(), iai))]),
      gcloudProject = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || process.env.gcloud_project || process.env.google_cloud_project,
      appCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.google_application_credentials,
      googleAuth = await buildVertexGoogleAuth(nt(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH) ? {
        kind: "skip"
      } : {
        kind: "default"
      }, gcloudProject || appCredentials ? void 0 : process.env.ANTHROPIC_VERTEX_PROJECT_ID),
      vertexOptions = {
        ...clientOptions,
        region: xre(model),
        googleAuth: googleAuth,
        ...(ZL() && {
          logger: xRe()
        })
      };
    return new AnthropicVertex(vertexOptions);
  }
  let resolvedApiKey = apiKey || Gv();
  if (!resolvedApiKey && dE()) {
    let wifTokenCache = await qAe();
    if (wifTokenCache !== null) {
      let wifCredentials = await DXe(),
        {
          rest: restHeaders
        } = U0t(defaultHeaders),
        wifToken = await wifTokenCache.getToken();
      return new UU({
        apiKey: null,
        authToken: wifToken,
        baseURL: process.env.ANTHROPIC_BASE_URL || wifCredentials?.baseURL,
        ...clientOptions,
        defaultHeaders: {
          ...restHeaders,
          Authorization: `Bearer ${wifToken}`,
          ...wifCredentials?.extraHeaders
        },
        ...(ZL() && {
          logger: xRe()
        })
      });
    }
  }
  let firstPartyOptions = {
    apiKey: useOAuthToken ? null : resolvedApiKey,
    authToken: useOAuthToken ? oauthTokens?.accessToken : void 0,
    ...!1,
    ...clientOptions,
    ...(ZL() && {
      logger: xRe()
    })
  };
  return new UU(firstPartyOptions);
}

/** Apply an `Authorization: Bearer <token>` header from env or api-key helper. */
async function qZu(headers: Record<string, string>, source: unknown) {
  let token = (rA() ? void 0 : process.env.ANTHROPIC_AUTH_TOKEN) || (await sZe(source));
  if (token) headers.Authorization = `Bearer ${token}`;
}

/** Resolve the base URL for a given provider route. */
function WZu(provider: string, model: string, awsRegionOverride: string | undefined) {
  switch (provider) {
    case "bedrock":
      return process.env.ANTHROPIC_BEDROCK_BASE_URL || `https://bedrock-runtime.${kyn(model, awsRegionOverride)}.amazonaws.com`;
    case "mantle":
      return process.env.ANTHROPIC_BEDROCK_MANTLE_BASE_URL || `https://bedrock-mantle.${kyn(model, awsRegionOverride)}.api.aws`;
    case "anthropicAws":
      return process.env.ANTHROPIC_AWS_BASE_URL || `https://aws-external-anthropic.${b1e()}.api.aws`;
    case "vertex":
      return process.env.ANTHROPIC_VERTEX_BASE_URL || KKe(xre(model));
    case "foundry":
      return rDr();
    case "gateway":
      return z_()?.url;
    case "firstParty":
      return process.env.ANTHROPIC_BASE_URL || Hs().BASE_API_URL;
  }
}

/** Pick the AWS region for the model, honoring the small/fast-model region override. */
function kyn(model: string, awsRegionOverride: string | undefined) {
  let smallFastRegion = process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION;
  if (model && smallFastRegion) {
    let smallFastModel = xR();
    if (smallFastModel !== gs() && So(model) === So(smallFastModel)) return smallFastRegion;
  }
  return awsRegionOverride ?? b1e();
}

/** Split out the (case-insensitive) Authorization header from the rest. */
function U0t(headers: Record<string, string>) {
  let rest: Record<string, string> = {},
    authValue;
  for (let [key, value] of Object.entries(headers)) if (key.toLowerCase() === "authorization") authValue = value;else rest[key] = value;
  return {
    value: authValue,
    rest: rest
  };
}

/** Parse ANTHROPIC_CUSTOM_HEADERS (newline-separated "Key: Value") into an object. */
function WFr() {
  let parsed: Record<string, string> = {},
    raw = process.env.ANTHROPIC_CUSTOM_HEADERS;
  if (!raw) return parsed;
  let lines = raw.split(/\n|\r\n/);
  for (let line of lines) {
    if (!line.trim()) continue;
    let colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    let key = line.slice(0, colonIndex).trim(),
      value = line.slice(colonIndex + 1).trim();
    if (key) parsed[key] = value;
  }
  return parsed;
}

/** Stream idle timeout floor (ms): max of env override and 5 minutes. */
function GFr() {
  return Math.max(Number(process.env.CLAUDE_STREAM_IDLE_TIMEOUT_MS) || 0, 300000);
}

/** Compute the byte-stream idle-deadline (ms), clamped to [GZu, VZu]. */
function VFr(provider: string) {
  let idleFloor = GFr(),
    defaultDeadline = provider === "firstParty" ? KZu : idleFloor,
    deadline = idleFloor,
    byteIdleEnv = Number(process.env.CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS),
    hasStreamIdleEnv = Number(process.env.CLAUDE_STREAM_IDLE_TIMEOUT_MS) > 0;
  if (Number.isFinite(byteIdleEnv) && byteIdleEnv > 0) deadline = byteIdleEnv;else if (!hasStreamIdleEnv) {
    deadline = defaultDeadline;
    let featureDeadline = it("tengu_byte_stream_idle_timeout_ms", defaultDeadline);
    if (typeof featureDeadline === "number" && Number.isFinite(featureDeadline) && featureDeadline > 0) deadline = featureDeadline;
  }
  return Math.min(Math.max(deadline, GZu), VZu);
}

/**
 * Wrap a ReadableStream of bytes with an idle watchdog.
 * If no bytes arrive within `idleMs`, the stream errors with StreamIdleTimeoutError;
 * if the gap is explained by system sleep/suspend, it aborts with StreamSuspendedError
 * so the request can be retried on a fresh connection. A partial-stall warning is
 * logged progressively at 15s/30s/60s/120s.
 */
function zZu(sourceStream: ReadableStream<Uint8Array>, idleMs: number, cfRay: string | undefined, chunkTimes: { lastAt: number } | undefined) {
  let idleTimer: ReturnType<typeof setTimeout> | null = null,
    stallTimer: ReturnType<typeof setTimeout> | null = null,
    stallStage = 0,
    bytesTotal = 0,
    streamStart = performance.now(),
    firstByteAt: number | null = null,
    bodyReadPending = !1,
    stallStages = [15000, 30000, 60000, 120000],
    clearStallTimer = () => {
      if (stallTimer !== null) clearTimeout(stallTimer), stallTimer = null;
    },
    clearIdleTimer = () => {
      if (idleTimer !== null) clearTimeout(idleTimer), idleTimer = null;
    },
    clearAllTimers = () => {
      clearIdleTimer(), clearStallTimer();
    },
    lastChunkAt = 0,
    lastWallClock = 0,
    armStallTimer = (controller: ReadableStreamDefaultController) => {
      if (clearStallTimer(), stallStage >= stallStages.length) return;
      let stageMs = stallStages[stallStage],
        elapsedSinceLastChunk = performance.now() - lastChunkAt;
      stallTimer = setTimeout(() => {
        if (stallTimer = null, controller.desiredSize === null) return;
        if (performance.now() - lastChunkAt < stageMs / 2) {
          armStallTimer(controller);
          return;
        }
        try {
          A(`[Stall] stream_idle_partial lastChunkAgeMs=${Math.round(performance.now() - lastChunkAt)} bytesTotal=${bytesTotal} idleDeadlineMs=${idleMs}`, {
            level: "warn"
          });
        } catch {}
        stallStage++, armStallTimer(controller);
      }, Math.max(0, stageMs - elapsedSinceLastChunk)), stallTimer.unref?.();
    },
    armIdleTimer = (controller: ReadableStreamDefaultController) => {
      clearAllTimers(), lastChunkAt = performance.now(), lastWallClock = Date.now(), stallStage = 0, armStallTimer(controller), idleTimer = setTimeout(() => {
        idleTimer = null;
        let nowPerf = performance.now(),
          nowWall = Date.now(),
          lateMs = Math.round(nowPerf - lastChunkAt - idleMs),
          sleptMs = Math.max(0, Math.round(nowWall - lastWallClock - (nowPerf - lastChunkAt))),
          readableErrored = controller.desiredSize === null;
        if (lateMs < -idleMs / 2) {
          A(`[byte-watchdog] aborting: late=${lateMs}ms slept=${sleptMs}ms (sleep/suspend)`);
          let suspendError = new cai(sleptMs);
          try {
            controller.error(suspendError);
          } catch {}
          reader.cancel(suspendError).catch(() => {});
          return;
        }
        try {
          if (A(`[byte-watchdog] firing: idle=${idleMs}ms late=${lateMs}ms errored=${readableErrored} bodyReadPending=${bodyReadPending}`, {
            level: "warn"
          }), wn("warn", "cli_byte_watchdog_fired", {
            idle_ms: idleMs,
            late_ms: lateMs,
            readable_errored: readableErrored,
            body_read_pending: bodyReadPending
          }), lateMs >= 1000) W("tengu_byte_watchdog_fired_late", {
            idle_ms: idleMs,
            late_ms: lateMs,
            readable_errored: readableErrored
          });
        } catch {}
        let idleError = new Hyn(idleMs, bytesTotal, firstByteAt !== null ? Math.round(firstByteAt - streamStart) : void 0, bodyReadPending, cfRay, sleptMs);
        try {
          controller.error(idleError);
        } catch {}
        reader.cancel(idleError).catch(() => {});
      }, idleMs);
    },
    reader = sourceStream.getReader();
  return new ReadableStream({
    start(controller) {
      armIdleTimer(controller);
    },
    async pull(controller) {
      bodyReadPending = !0;
      let chunk;
      try {
        chunk = await reader.read();
      } catch (readErr) {
        bodyReadPending = !1, clearAllTimers();
        try {
          controller.error(readErr);
        } catch {}
        return;
      }
      if (bodyReadPending = !1, chunk.done) {
        clearAllTimers();
        try {
          controller.close();
        } catch {}
        return;
      }
      let value = chunk.value;
      if (firstByteAt === null && value.byteLength > 0) firstByteAt = performance.now();
      if (bytesTotal += value.byteLength, chunkTimes) chunkTimes.lastAt = performance.now();
      armIdleTimer(controller);
      try {
        controller.enqueue(value);
      } catch {
        clearAllTimers();
      }
    },
    cancel(reason) {
      return clearAllTimers(), reader.cancel(reason);
    }
  });
}

/** Whether the byte watchdog is enabled (env disable/enable, else feature default). */
function uai() {
  if (Za(process.env.CLAUDE_ENABLE_BYTE_WATCHDOG)) return !1;
  if (nt(process.env.CLAUDE_ENABLE_BYTE_WATCHDOG)) return !0;
  return it("tengu_stream_watchdog_default_on", !0);
}

/** Providers eligible for the watchdog by default (firstParty / anthropicAws). */
function dai(provider: string) {
  return provider === "firstParty" && Su() || provider === "anthropicAws" && !process.env.ANTHROPIC_AWS_BASE_URL;
}

/** Whether the watchdog is enabled for Bedrock (env opt-in). */
function pai() {
  return nt(process.env.CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK);
}

/** Whether the watchdog applies to this provider (default-eligible or Bedrock opt-in). */
function aai(provider: string) {
  return dai(provider) || provider === "bedrock" && pai();
}

/** Whether the response body should carry an idle watchdog for this provider. */
function jZu(provider: string) {
  if (!uai()) return !1;
  return aai(provider) && aai(Rr());
}

/**
 * Build the fetch wrapper that injects request-id / ATIS headers, logs requests,
 * and wraps streaming response bodies with the idle byte watchdog.
 */
function YZu(fetchOverride: typeof fetch | undefined, source: string | undefined) {
  let baseFetch = fetchOverride ?? globalThis.fetch,
    provider = Rr(),
    watchdogEligible = dai(provider);
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    let headers = new Headers(init?.headers);
    if (watchdogEligible && !headers.has(oZe)) headers.set(oZe, lai.randomUUID());
    if (watchdogEligible) {
      let atisData = zFr();
      if (atisData !== void 0) headers.set(KFr, atisData);
    }
    try {
      let urlString = input instanceof Request ? input.url : String(input),
        requestId = headers.get(oZe);
      if (A(`[API REQUEST] ${new URL(urlString).pathname}${requestId ? ` ${oZe}=${requestId}` : ""} source=${source ?? "unknown"}`), SMe() === "verbose") A(`[API REQUEST AUTH] ${Pe(JZu(headers))}`, {
        level: "verbose"
      });
    } catch {}
    let response = await baseFetch(input, {
        ...init,
        headers: headers
      }),
      contentType = response.headers.get("content-type"),
      isSseStream = watchdogEligible && contentType?.includes("text/event-stream"),
      isBedrockEventStream = provider === "bedrock" && contentType?.includes("vnd.amazon.eventstream") && pai();
    if ((isSseStream || isBedrockEventStream) && response.body && uai()) {
      let idleMs = VFr(provider),
        cfRay = response.headers.get("cf-ray") ?? (isBedrockEventStream ? response.headers.get("x-amzn-requestid") ?? void 0 : void 0),
        chunkTimes = {
          lastAt: 0
        },
        wrapped = new Response(zZu(response.body, idleMs, cfRay, chunkTimes), response);
      return Object.defineProperty(wrapped, "url", {
        value: response.url
      }), Object.defineProperty(wrapped, "_chunkTimes", {
        value: chunkTimes
      }), wrapped;
    }
    return response;
  };
}

/** Redact the Authorization header and collect anthropic-* headers for debug logging. */
function JZu(headers: Headers) {
  let authHeader = headers.get("authorization"),
    redactedAuth = authHeader ? `${authHeader.includes(" ") ? mi(authHeader, " ") : "<opaque>"} ***` : "none",
    relevantHeaders: Record<string, string> = {};
  return headers.forEach((value, name) => {
    if (name === "anthropic-beta" || name.startsWith("x-anthropic-")) relevantHeaders[name] = value;
  }), {
    auth: redactedAuth,
    headers: relevantHeaders
  };
}

var lai,
  UZu,
  $Zu,
  oZe = "x-client-request-id",
  GZu = 1e4,
  VZu = 1800000,
  KZu = 180000,
  Hyn,
  cai;
var PBe = b(() => {
  jx();
  Wi();
  Ph();
  lo();
  Imn();
  vd();
  kk();
  Ro();
  Ps();
  ey();
  lt();
  Sc();
  E1e();
  qe();
  pf();
  dn();
  xXe();
  tn();
  lr();
  mn();
  jn();
  kt();
  PXe();
  OXe();
  lai = require("crypto");
  UZu = Hn(() => He("provider_route")), $Zu = {
    __auth: {
      provider: null,
      tokenCache: null,
      resolution: null,
      error: null,
      extraHeaders: {}
    }
  };
  Hyn = class Hyn extends Error {
    idleMs;
    bytesReceived;
    ttfbMs;
    bodyReadPending;
    cfRay;
    sleptMs;
    constructor(e, t = 0, n, r = !0, o, s = 0) {
      super(`stream idle: no bytes for ${e}ms`);
      this.name = "StreamIdleTimeoutError", this.idleMs = e, this.bytesReceived = t, this.ttfbMs = n, this.bodyReadPending = r, this.cfRay = o, this.sleptMs = s;
    }
  };
  cai = class cai extends Error {
    sleptMs;
    code = "StreamSuspended";
    constructor(e) {
      super("Stream watchdog detected system suspend; aborting to retry on a fresh connection");
      this.sleptMs = e;
      this.name = "StreamSuspendedError";
    }
  };
});
export {xRe,p8,qZu,WZu,kyn,U0t,WFr,GFr,VFr,zZu,uai,dai,pai,aai,jZu,YZu,JZu,lai,UZu,$Zu,oZe,GZu,VZu,KZu,Hyn,cai,PBe};
