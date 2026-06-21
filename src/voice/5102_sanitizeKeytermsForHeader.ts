// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as u} from "../../runtime.ts";
import {xp as WO,bt as L_} from "../../vendor/m195.ts";
import {ra as KK,MMe as eNH,Ap as ZO} from "../config/0614_Ap.ts";
import {fo as $q} from "../../vendor/m566.ts";
import {getOauthConfig as F9,Dc as u1} from "../api/0459_getOauthConfig.ts";
import {getUserAgent as An,fk as g0} from "../api/2032_withOAuth401Retry.ts";
import {st as q_} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isAnthropicAuthEnabled as sf,getClaudeAIOAuthTokens as H7,checkAndRefreshOAuthTokenIfNeeded as sY,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {getClientPlatform as L0} from "../config/0048_ISSUES_EXPLAINER.ts";
import {koe as S8H,S7 as El} from "../config/0746_bytes.ts";
import {getWebSocketProxyUrl as ks,Z_ as Af} from "../config/1021_shouldBypassProxyWithCidr.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {Gp as BO} from "../../vendor/m567.ts";
import {sn as A6} from "../config/0047_namespace.ts";
// Voice subsystem — voice stream client.
//
// Manages the hold-to-talk voice dictation transport: probing connectivity to
// the backend, opening the speech-to-text WebSocket, framing audio chunks, and
// dispatching transcript / endpoint / error events back to the caller.
//
// Cross-module references (j_, WO, KK, eNH, $q, F9, An, q_, Y_, sf, H7, sY, N,
// L0, S8H, ks, d_, u, L, and the init imports BO/u1/...) are left as-is; they
// resolve at runtime against other bundled modules.

var p04 = {};
j_(p04, {
  sanitizeKeytermsForHeader: () => sanitizeKeytermsForHeader,
  probeVoiceConnectivity: () => probeVoiceConnectivity,
  isVoiceStreamAvailable: () => isVoiceStreamAvailable,
  isTypedInterimsEnabled: () => isTypedInterimsEnabled,
  connectVoiceStream: () => connectVoiceStream,
  FINALIZE_TIMEOUTS_MS: () => FINALIZE_TIMEOUTS_MS
});

/**
 * Render a numeric status code as a string only when it is a valid integer
 * within [min, max]; otherwise return "unknown". Used to build safe telemetry
 * codes (e.g. `http_404`, `ws_closed_1006`) from untrusted status values.
 */
function formatCodeInRange(value: unknown, min: number, max: number): string {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max
    ? String(value)
    : "unknown";
}

/**
 * Derive a lowercase telemetry token from a WebSocket/socket error, falling
 * back to "unknown" when no code can be extracted.
 */
function errorCodeForTelemetry(error: unknown): string {
  return WO(error)?.toLowerCase() ?? "unknown";
}

/**
 * Probe whether the voice backend is reachable. Returns a short status token
 * describing the outcome:
 *   - "skipped_privacy"     — disabled by privacy/consent settings
 *   - `cf_mitigated_<code>` — Cloudflare challenged the request
 *   - `http_<code>`         — reached the API and got an HTTP status
 *   - "timeout"             — request timed out
 *   - "fetch_failed"        — network failure
 */
async function probeVoiceConnectivity(): Promise<string> {
  if (KK() || eNH()) return "skipped_privacy";
  try {
    let response = await $q.get(`${F9().BASE_API_URL}/api/hello`, {
        headers: {
          "User-Agent": An()
        },
        timeout: PROBE_TIMEOUT_MS,
        validateStatus: () => !0,
        maxRedirects: 0
      }),
      statusCode = formatCodeInRange(response.status, 100, 599);
    return response.headers["cf-mitigated"] !== void 0 ? `cf_mitigated_${statusCode}` : `http_${statusCode}`;
  } catch (error) {
    let code = $q.isAxiosError(error) ? error.code : void 0;
    return code === "ECONNABORTED" || code === "ETIMEDOUT" ? "timeout" : "fetch_failed";
  }
}

/**
 * Whether interim (in-progress) transcripts should be forwarded as typed text.
 * Enabled by the CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED env var, otherwise
 * gated behind the "tengu_brick_follow" feature flag.
 */
function isTypedInterimsEnabled(): boolean {
  if (q_(process.env.CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED)) return !0;
  return Y_("tengu_brick_follow", !1);
}

/**
 * Whether the voice stream feature is usable right now: the feature is enabled
 * and a valid OAuth access token is available.
 */
function isVoiceStreamAvailable(): boolean {
  if (!sf()) return !1;
  let auth = H7();
  return auth !== null && auth.accessToken !== null;
}

/**
 * Normalize and pack a list of key terms into a single comma-separated value
 * suitable for the `x-config-keyterms` HTTP header. Each term is stripped of
 * commas and non-printable-ASCII characters and whitespace-collapsed; empty and
 * duplicate terms are skipped; terms are appended until the total length
 * (including separators) would exceed KEYTERMS_HEADER_MAX_LENGTH.
 */
function sanitizeKeytermsForHeader(keyterms: readonly string[]): string {
  let seen = new Set<string>(),
    accepted: string[] = [],
    totalLength = 0;
  for (let raw of keyterms) {
    let term = raw.replace(/,/g, " ").replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim();
    if (!term || seen.has(term)) continue;
    let addedLength = term.length + (accepted.length > 0 ? 1 : 0);
    if (totalLength + addedLength > KEYTERMS_HEADER_MAX_LENGTH) break;
    seen.add(term), accepted.push(term), totalLength += addedLength;
  }
  return accepted.join(",");
}

/** Callbacks the voice stream invokes as transcription progresses. */
interface VoiceStreamHandlers {
  /** Called once the socket is open and ready; receives the control handle. */
  onReady(controller: VoiceStreamController): void;
  /** Called with a transcript fragment; `isFinal` distinguishes finals from interims. */
  onTranscript(text: string, isFinal: boolean): void;
  /** Called on a transcription or connection error, with optional metadata. */
  onError(message: string, meta?: { fatal?: boolean; connectFailureCode?: string }): void;
  /** Called once the socket has closed. */
  onClose(): void;
}

/** Optional connection parameters. */
interface VoiceStreamOptions {
  language?: string;
  keyterms?: string[];
}

/** Control handle returned to the caller via onReady. */
interface VoiceStreamController {
  send(chunk: ArrayLike<number> | Buffer): void;
  finalize(): Promise<string>;
  close(): void;
  isConnected(): boolean;
}

/**
 * Open a speech-to-text WebSocket and wire it up to the supplied handlers.
 *
 * Builds the wss:// URL (honoring the VOICE_STREAM_BASE_URL override), attaches
 * OAuth/auth headers plus optional sanitized key terms, then manages the full
 * session lifecycle: periodic KeepAlive frames, audio chunk forwarding,
 * interim/final transcript promotion, graceful finalize via CloseStream, and
 * error/close reporting with telemetry-safe failure codes.
 *
 * Returns the controller, or null if no OAuth token is available.
 */
async function connectVoiceStream(
  handlers: VoiceStreamHandlers,
  options?: VoiceStreamOptions
): Promise<VoiceStreamController | null> {
  await sY();
  let auth = H7();
  if (!auth?.accessToken) return N("[voice_stream] No OAuth token available"), null;
  let baseUrl = process.env.VOICE_STREAM_BASE_URL || F9().BASE_API_URL.replace("https://", "wss://").replace("http://", "ws://");
  if (process.env.VOICE_STREAM_BASE_URL) N(`[voice_stream] Using VOICE_STREAM_BASE_URL override: ${process.env.VOICE_STREAM_BASE_URL}`);
  let typedInterims = isTypedInterimsEnabled(),
    query = new URLSearchParams({
      encoding: "linear16",
      sample_rate: "16000",
      channels: "1",
      endpointing_ms: "300",
      utterance_end_ms: "1000",
      language: options?.language ?? "en",
      use_conversation_engine: "true",
      ...(typedInterims && {
        forward_interims: "typed"
      }),
      stt_provider: "deepgram-nova3"
    }),
    url = `${baseUrl}${VOICE_STREAM_PATH}?${query.toString()}`;
  N(`[voice_stream] Connecting to ${url}`);
  let requestHeaders: Record<string, string> = {
    Authorization: `Bearer ${auth.accessToken}`,
    "User-Agent": An(),
    "x-app": "cli",
    "anthropic-client-platform": L0()
  };
  if (options?.keyterms?.length) {
    let keytermsHeader = sanitizeKeytermsForHeader(options.keyterms);
    if (keytermsHeader) requestHeaders["x-config-keyterms"] = keytermsHeader;
  }
  let tlsOptions = S8H(),
    socketOptions = {
      headers: requestHeaders,
      proxy: ks(url),
      tls: tlsOptions || void 0
    },
    socket = new WsModule.default(url, socketOptions),
    // Interval handle for periodic KeepAlive frames.
    keepAliveTimer: ReturnType<typeof setInterval> | null = null,
    // Whether the socket is currently open/connected.
    connected = !1,
    // Whether the socket ever successfully opened (distinguishes connect
    // failures from mid-session closes for failure-code reporting).
    everOpened = !1,
    // Whether CloseStream has been sent / the stream is closing down.
    closing = !1,
    // Whether finalize() has been initiated.
    finalizing = !1,
    // Whether an upgrade rejection ("unexpected-response") occurred.
    upgradeRejected = !1,
    // Resolver for the in-flight finalize() promise; null when not finalizing.
    resolveFinalize: ((reason: string) => void) | null = null,
    // Cancels the "no data" finalize timeout once data arrives after CloseStream.
    cancelNoDataTimeout: (() => void) | null = null,
    controller: VoiceStreamController = {
      send(chunk) {
        if (socket.readyState !== WsModule.default.OPEN) return;
        if (closing) {
          N(`[voice_stream] Dropping audio chunk after CloseStream: ${String(chunk.length)} bytes`);
          return;
        }
        N(`[voice_stream] Sending audio chunk: ${String(chunk.length)} bytes`), socket.send(Buffer.from(chunk));
      },
      finalize() {
        if (finalizing || closing) return Promise.resolve("ws_already_closed");
        return finalizing = !0, new Promise<string>(resolve => {
          let safetyTimeout = setTimeout(() => resolveFinalize?.("safety_timeout"), FINALIZE_TIMEOUTS_MS.safety),
            noDataTimeout = setTimeout(() => resolveFinalize?.("no_data_timeout"), FINALIZE_TIMEOUTS_MS.noData);
          if (cancelNoDataTimeout = () => {
            clearTimeout(noDataTimeout), cancelNoDataTimeout = null;
          }, resolveFinalize = reason => {
            if (clearTimeout(safetyTimeout), clearTimeout(noDataTimeout), resolveFinalize = null, cancelNoDataTimeout = null, pendingInterim) {
              N(`[voice_stream] Promoting unreported interim before ${reason} resolve`);
              let promoted = pendingInterim;
              pendingInterim = "", handlers.onTranscript(promoted, !0);
            }
            N(`[voice_stream] Finalize resolved via ${reason}`), resolve(reason);
          }, socket.readyState === WsModule.default.CLOSED || socket.readyState === WsModule.default.CLOSING) {
            resolveFinalize("ws_already_closed");
            return;
          }
          setTimeout(() => {
            if (closing = !0, socket.readyState === WsModule.default.OPEN) N("[voice_stream] Sending CloseStream (finalize)"), socket.send(CLOSE_STREAM_FRAME);
          }, 0);
        });
      },
      close() {
        if (closing = !0, keepAliveTimer) clearInterval(keepAliveTimer), keepAliveTimer = null;
        if (connected = !1, socket.readyState === WsModule.default.OPEN) socket.close();
      },
      isConnected() {
        return connected && socket.readyState === WsModule.default.OPEN;
      }
    };
  socket.on("open", () => {
    N("[voice_stream] WebSocket connected"), connected = !0, everOpened = !0, N("[voice_stream] Sending initial KeepAlive"), socket.send(KEEP_ALIVE_FRAME), keepAliveTimer = setInterval(ws => {
      if (ws.readyState === WsModule.default.OPEN) N("[voice_stream] Sending periodic KeepAlive"), ws.send(KEEP_ALIVE_FRAME);
    }, KEEP_ALIVE_INTERVAL_MS, socket), handlers.onReady(controller);
  });
  // Most recent interim transcript not yet promoted to final ("" when none).
  let pendingInterim = "";
  socket.on("message", raw => {
    let text = raw.toString();
    N(`[voice_stream] Message received (${String(text.length)} chars)`);
    let frame;
    try {
      frame = d_(text);
    } catch {
      return;
    }
    switch (frame.type) {
      case "TranscriptInterim":
      case "TranscriptText":
        {
          let transcript = frame.data;
          if (N(`[voice_stream] ${frame.type} (${String(transcript?.length ?? 0)} chars)`), closing) cancelNoDataTimeout?.();
          if (transcript) pendingInterim = transcript, handlers.onTranscript(transcript, !1);
          break;
        }
      case "TranscriptEndpoint":
        {
          N(`[voice_stream] TranscriptEndpoint received (${String(pendingInterim.length)} chars pending)`);
          let promoted = pendingInterim;
          if (pendingInterim = "", promoted) handlers.onTranscript(promoted, !0);
          if (closing) resolveFinalize?.("post_closestream_endpoint");
          break;
        }
      case "TranscriptError":
        {
          let message = frame.description ?? frame.error_code ?? "unknown transcription error";
          if (N(`[voice_stream] TranscriptError: ${message}`), !finalizing) handlers.onError(message);
          break;
        }
      case "error":
        {
          let message = frame.message ?? `unstructured error frame (keys: ${Object.keys(frame).join(", ")})`;
          if (N(`[voice_stream] Server error: ${message}`), !finalizing) handlers.onError(message);
          break;
        }
      default:
        break;
    }
  }), socket.on("close", (code, reasonBuf) => {
    let reason = reasonBuf?.toString() ?? "";
    if (N(`[voice_stream] WebSocket closed: code=${String(code)} reason="${reason}"`), connected = !1, keepAliveTimer) clearInterval(keepAliveTimer), keepAliveTimer = null;
    if (pendingInterim) {
      N("[voice_stream] Promoting unreported interim transcript to final on close");
      let promoted = pendingInterim;
      pendingInterim = "", handlers.onTranscript(promoted, !0);
    }
    if (resolveFinalize?.("ws_close"), !finalizing && !upgradeRejected && code !== 1000 && code !== 1005) handlers.onError(`Connection closed: code ${String(code)}${reason ? ` — ${reason}` : ""}`, everOpened ? void 0 : {
      connectFailureCode: `ws_closed_${formatCodeInRange(code, 1000, 4999)}`
    });
    handlers.onClose();
  });
  // The `ws` library may log upgrade-rejection details to console.error during
  // the synchronous listener setup below; suppress it temporarily.
  let consoleRef = console,
    originalConsoleError = consoleRef.error;
  if (originalConsoleError) consoleRef.error = noopConsoleError;
  try {
    socket.on("unexpected-response", (request, response) => {
      let statusCode = response.statusCode ?? 0;
      if (statusCode === 101) {
        N("[voice_stream] unexpected-response fired with 101; ignoring");
        return;
      }
      if (N(`[voice_stream] Upgrade rejected: status=${String(statusCode)} cf-mitigated=${String(response.headers["cf-mitigated"])} cf-ray=${String(response.headers["cf-ray"])}`), upgradeRejected = !0, response.resume(), request.destroy(), finalizing) return;
      handlers.onError(`WebSocket upgrade rejected with HTTP ${String(statusCode)}`, {
        fatal: statusCode >= 400 && statusCode < 500,
        connectFailureCode: response.headers["cf-mitigated"] !== void 0 ? `cf_mitigated_${formatCodeInRange(statusCode, 100, 599)}` : `upgrade_rejected_${formatCodeInRange(statusCode, 100, 599)}`
      });
    });
  } finally {
    if (originalConsoleError) consoleRef.error = originalConsoleError;
  }
  return socket.on("error", error => {
    if (N(`[voice_stream] WebSocket error: ${error.message}`, {
      level: "error"
    }), !finalizing) handlers.onError(`Voice stream connection error: ${error.message}`, everOpened ? void 0 : {
      connectFailureCode: `ws_error_${errorCodeForTelemetry(error)}`
    });
  }), controller;
}

var WsModule: typeof import("ws"),
  KEEP_ALIVE_FRAME = '{"type":"KeepAlive"}',
  CLOSE_STREAM_FRAME = '{"type":"CloseStream"}',
  noopConsoleError = () => {},
  VOICE_STREAM_PATH = "/api/ws/speech_to_text/voice_stream",
  KEEP_ALIVE_INTERVAL_MS = 8000,
  FINALIZE_TIMEOUTS_MS: { safety: number; noData: number },
  PROBE_TIMEOUT_MS = 1500,
  KEYTERMS_HEADER_MAX_LENGTH = 1024;

var aMq = L(() => {
  BO();
  u1();
  Mq();
  FH();
  A6();
  L_();
  g0();
  El();
  ZO();
  Af();
  H6();
  o6();
  WsModule = u(require("ws")), FINALIZE_TIMEOUTS_MS = {
    safety: 5000,
    noData: 1500
  };
});

export {p04 as uPl,formatCodeInRange as O7n,errorCodeForTelemetry as afm,probeVoiceConnectivity,isTypedInterimsEnabled,isVoiceStreamAvailable,sanitizeKeytermsForHeader,connectVoiceStream,WsModule as Pye,KEEP_ALIVE_FRAME as aPl,CLOSE_STREAM_FRAME as rfm,noopConsoleError as ofm,VOICE_STREAM_PATH as sfm,KEEP_ALIVE_INTERVAL_MS as ifm,FINALIZE_TIMEOUTS_MS,PROBE_TIMEOUT_MS as lfm,KEYTERMS_HEADER_MAX_LENGTH as cfm,aMq as Dxo};
