// @ts-nocheck
import {sleep as Fn} from "../telemetry/1488_withTimeout.ts";
import {cn as ln,Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {VRe as NXe,ZT,sO as T1} from "../config/2194_level.ts";
import {wn as xn,pf as wA} from "../config/0693_timestamp.ts";
import {p7t as eWt,LGe as E8e,UKl as W$l} from "../../vendor/m5321.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Pt as Bt,He,mn as cn} from "../telemetry/0600_feature_name.ts";
import {XZa as p7a,QZa as m7a,W5e as Jqe} from "../config/4324_activityCallback.ts";
import {getClientPlatform as qx,Fg as Yh} from "../../vendor/m5.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {getProxyFetchOptions as sT,ey as Z_} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {GHr as RCr,VJe as kze} from "../session/1289_getAccessToken.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
class CoalescingRetryUploader {
  inflight = null;
  pending = null;
  closed = false;
  config;
  constructor(H) {
    this.config = H;
  }
  enqueue(H) {
    if (this.closed) return;
    this.pending = this.pending ? mergeWorkerStatePatch(this.pending, H) : H, this.drain();
  }
  close() {
    this.closed = true, this.pending = null;
  }
  async flush() {
    while (!this.closed) if (this.inflight) await this.inflight;else if (this.pending) await this.drain();else return;
  }
  async drain() {
    if (this.inflight || this.closed) return;
    if (!this.pending) return;
    let H = this.pending;
    this.pending = null, this.inflight = this.sendWithRetry(H).then(() => {
      if (this.inflight = null, this.pending && !this.closed) this.drain();
    });
  }
  async sendWithRetry(H) {
    let _ = H,
      q = 0;
    while (!this.closed) {
      if (await this.config.send(_)) return;
      if (q++, await Fn(this.retryDelay(q)), this.pending && !this.closed) _ = mergeWorkerStatePatch(_, this.pending), this.pending = null;
    }
  }
  retryDelay(H) {
    let _ = Math.min(this.config.baseDelayMs * 2 ** (H - 1), this.config.maxDelayMs),
      q = Math.random() * this.config.jitterMs;
    return _ + q;
  }
}
function mergeWorkerStatePatch(H, _) {
  let q = {
    ...H
  };
  for (let [K, O] of Object.entries(_)) if ((K === "external_metadata" || K === "internal_metadata") && q[K] && typeof q[K] === "object" && typeof O === "object" && O !== null) q[K] = {
    ...q[K],
    ...O
  };else q[K] = O;
  return q;
}
var noopRemoteClientModule = () => {};
function isDroppableHttpStatus(H) {
  return H === 400 || H === 413 || H === 422;
}
function getErrorCode(H) {
  let _ = ln(H);
  if (_) return _;
  if (H && typeof H === "object" && "name" in H && typeof H.name === "string") return H.name;
  return;
}
function isRetryableWorkerRegistrationFailure(H) {
  return H instanceof WorkerInitializationError && H.reason === "worker_register_failed" && !isDroppableHttpStatus(H.httpStatus);
}
class CCRClient {
  workerEpoch = 0;
  heartbeatIntervalMs;
  heartbeatJitterFraction;
  heartbeatTimer = null;
  heartbeatInFlight = false;
  closed = false;
  consecutiveAuthFailures = 0;
  consecutiveNotFound = 0;
  currentState = null;
  sessionBaseUrl;
  sessionId;
  streamEventBuffer = [];
  streamEventTimer = null;
  streamedEphemeralSinceLastAssistant = false;
  workerState;
  eventUploader;
  internalEventUploader;
  onInternalBatchAcked;
  deliveryUploader;
  pendingProcessingAcks = [];
  onEpochMismatch;
  getAuthHeaders;
  onDiagnostic;
  constructor(H, t, n) {
    if (this.onEpochMismatch = n?.onEpochMismatch ?? (() => {
      process.exit(1);
    }), this.heartbeatIntervalMs = n?.heartbeatIntervalMs ?? DEFAULT_HEARTBEAT_INTERVAL_MS, this.heartbeatJitterFraction = n?.heartbeatJitterFraction ?? 0, this.getAuthHeaders = n?.getAuthHeaders ?? NXe, this.onDiagnostic = n?.onDiagnostic, t.protocol !== "http:" && t.protocol !== "https:") throw Error(`CCRClient: Expected http(s) URL, got ${t.protocol}`);
    let r = t.pathname.replace(/\/$/, "");
    this.sessionBaseUrl = `${t.protocol}//${t.host}${r}`, this.sessionId = r.split("/").pop() || "", this.workerState = new CoalescingRetryUploader({
      send: async o => {
        let s = await this.request("put", "/worker", {
          worker_epoch: this.workerEpoch,
          ...o
        }, "PUT worker");
        if (s.ok) return true;
        if (isDroppableHttpStatus(s.status)) return xn("warn", "cli_worker_state_4xx_dropped", {
          status: s.status
        }), true;
        return false;
      },
      baseDelayMs: 500,
      maxDelayMs: 30000,
      jitterMs: 500
    }), this.eventUploader = new eWt({
      maxBatchSize: 100,
      maxBatchBytes: 10485760,
      maxQueueSize: 1e5,
      send: async o => {
        let s = await this.request("post", "/worker/events", {
          worker_epoch: this.workerEpoch,
          events: o
        }, "client events");
        if (s.ok) return;
        if (isDroppableHttpStatus(s.status)) {
          let i = o.filter(l => !l.ephemeral),
            a = o.length - i.length;
          if (a > 0) {
            if (v(`CCRClient: client event POST rejected (${s.status}) \u2014 dropping ${a} ephemeral event(s), retrying ${i.length} durable event(s)`, {
              level: "warn"
            }), Bt("ccr_partial_messages", "ephemeral_dropped_on_4xx"), o.splice(0, o.length, ...i), i.length === 0) return;
            let l = await this.request("post", "/worker/events", {
              worker_epoch: this.workerEpoch,
              events: i
            }, "client events (durable retry)");
            if (l.ok) return;
            if (!isDroppableHttpStatus(l.status)) throw new E8e("client event POST failed", l.retryAfterMs);
          }
          if (i.length > 0) this.droppedDurableEventBatches++;
          xn("warn", "cli_worker_events_4xx_dropped", {
            status: s.status,
            count: i.length
          });
          return;
        }
        throw new E8e("client event POST failed", s.retryAfterMs);
      },
      baseDelayMs: 500,
      maxDelayMs: 30000,
      jitterMs: 500
    }), this.internalEventUploader = new eWt({
      maxBatchSize: 100,
      maxBatchBytes: 10485760,
      maxQueueSize: 200,
      send: async o => {
        let s = await this.request("post", "/worker/internal-events", {
          worker_epoch: this.workerEpoch,
          events: o
        }, "internal events");
        if (s.ok) {
          Promise.resolve().then(() => this.onInternalBatchAcked?.(o)).catch(() => {});
          return;
        }
        if (isDroppableHttpStatus(s.status)) {
          xn("warn", "cli_worker_internal_events_4xx_dropped", {
            status: s.status,
            count: o.length
          });
          return;
        }
        throw new E8e("internal event POST failed", s.retryAfterMs);
      },
      baseDelayMs: 500,
      maxDelayMs: 30000,
      jitterMs: 500
    }), this.deliveryUploader = new eWt({
      maxBatchSize: 64,
      maxQueueSize: 64,
      send: async o => {
        let s = await this.request("post", "/worker/events/delivery", {
          worker_epoch: this.workerEpoch,
          updates: o.map(i => ({
            event_id: i.eventId,
            status: i.status
          }))
        }, "delivery batch");
        if (s.ok) return;
        if (isDroppableHttpStatus(s.status)) {
          xn("warn", "cli_worker_delivery_4xx_dropped", {
            status: s.status,
            count: o.length
          });
          return;
        }
        throw new E8e("delivery POST failed", s.retryAfterMs);
      },
      baseDelayMs: 500,
      maxDelayMs: 30000,
      jitterMs: 500
    }), H.setOnEvent(o => {
      this.reportDelivery(o.event_id, "received");
    });
  }
  async initialize(e) {
    let t = Date.now();
    if (Object.keys(this.getAuthHeaders()).length === 0) throw new WorkerInitializationError("no_auth_headers");
    if (e === undefined) {
      let c = process.env.CLAUDE_CODE_WORKER_EPOCH;
      e = c ? parseInt(c, 10) : NaN;
    }
    if (isNaN(e)) throw new WorkerInitializationError("missing_epoch");
    this.workerEpoch = e;
    let n = this.getWorkerState();
    await Promise.race([n.catch(() => null), Fn(WORKER_STATE_RESTORE_TIMEOUT_MS)]);
    let r = {
        ok: false
      },
      o = new Set(),
      s = 10,
      i = 0;
    for (let c = 1; c <= s; c++) {
      if (i = c, r = await this.request("put", "/worker", {
        worker_status: "idle",
        worker_epoch: this.workerEpoch,
        external_metadata: {
          pending_action: null,
          task_summary: null
        }
      }, "PUT worker (init)"), r.ok || this.closed) break;
      if (r.reason) o.add(r.reason);
      if (this.onDiagnostic?.(`PUT /worker failed (${r.reason ?? "unknown"}) attempt=${c}/${s}, ${Math.round((Date.now() - t) / 1000)}s elapsed`), isDroppableHttpStatus(r.status)) break;
      if (c < s) {
        let u = Math.min(500 * 2 ** (c - 1), 30000) + Math.random() * 500;
        await Fn(u);
      }
    }
    if (!r.ok) {
      if (!this.closed) xn("error", "cli_worker_init_put_retries_exhausted"), this.onDiagnostic?.(`PUT /worker retries exhausted: ${i} attempts over ${Math.round((Date.now() - t) / 1000)}s, errors=[${[...o].join(",") || "unknown"}]`);
      throw new WorkerInitializationError("worker_register_failed", r.status);
    }
    this.currentState = "idle", this.startHeartbeat(), p7a(() => {
      this.writeEvent({
        type: "keep_alive"
      });
    }), v(`CCRClient: initialized, epoch=${this.workerEpoch}`), xn("info", "cli_worker_lifecycle_initialized", {
      epoch: this.workerEpoch,
      duration_ms: Date.now() - t
    });
    let {
      metadata: a,
      durationMs: l
    } = await n;
    if (!this.closed) xn("info", "cli_worker_state_restored", {
      duration_ms: l,
      had_state: a.external !== null || a.internal !== null
    });
    return a;
  }
  async getWorkerState() {
    let e = Date.now(),
      t = this.getAuthHeaders();
    if (Object.keys(t).length === 0) return {
      metadata: {
        external: null,
        internal: null
      },
      durationMs: 0
    };
    let n = await this.getWithRetry(`${this.sessionBaseUrl}/worker`, t, "worker_state");
    return {
      metadata: {
        external: n?.worker?.external_metadata ?? null,
        internal: n?.worker?.internal_metadata ?? null
      },
      durationMs: Date.now() - e
    };
  }
  async request(H, _, n, r, {
    timeout: o = 1e4
  } = {}) {
    let s = this.getAuthHeaders();
    if (Object.keys(s).length === 0) return {
      ok: false,
      reason: "no_auth_headers"
    };
    let i = `${this.sessionBaseUrl}${_}`;
    try {
      let a = await fetch(i, {
        method: H.toUpperCase(),
        headers: {
          ...s,
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-client-platform": qx(),
          "User-Agent": Yh()
        },
        body: Oe(n),
        signal: AbortSignal.timeout(o),
        ...sT({
          url: i
        })
      });
      if (a.body?.cancel(), a.ok) return this.consecutiveAuthFailures = 0, this.consecutiveNotFound = 0, {
        ok: true
      };
      if (a.status === 409) this.handleEpochMismatch();
      if (a.status === 404) {
        if (this.consecutiveNotFound++, this.consecutiveNotFound >= MAX_NOT_FOUND_FAILURES) v(`CCRClient: ${this.consecutiveNotFound} consecutive 404s \u2014 session gone, exiting`, {
          level: "error"
        }), xn("error", "cli_worker_session_not_found"), this.onDiagnostic?.(`${this.consecutiveNotFound} consecutive 404s on ${_} \u2014 session gone, exiting`), this.onEpochMismatch();
      }
      if (a.status === 401 || a.status === 403) {
        let l = ZT(),
          c = l ? RCr(l) : null;
        if (c !== null && c * 1000 < Date.now()) v(`CCRClient: session_token expired (exp=${new Date(c * 1000).toISOString()}) \u2014 no refresh was delivered, exiting`, {
          level: "error"
        }), xn("error", "cli_worker_token_expired_no_refresh"), this.onDiagnostic?.(`session_token expired (exp=${new Date(c * 1000).toISOString()}) \u2014 no refresh delivered, exiting`), this.onEpochMismatch();
        if (this.consecutiveAuthFailures++, this.consecutiveAuthFailures >= MAX_AUTH_FAILURES) v(`CCRClient: ${this.consecutiveAuthFailures} consecutive auth failures with a valid-looking token \u2014 server-side auth unrecoverable, exiting`, {
          level: "error"
        }), xn("error", "cli_worker_auth_failures_exhausted"), this.onDiagnostic?.(`${this.consecutiveAuthFailures} consecutive auth failures (HTTP ${a.status}) with valid-looking token \u2014 exiting`), this.onEpochMismatch();
      }
      if (v(`CCRClient: ${r} returned ${a.status}`, {
        level: "warn"
      }), xn("warn", "cli_worker_request_failed", {
        method: H,
        path: _,
        status: a.status
      }), a.status === 429) {
        let l = a.headers.get("retry-after"),
          c = l ? parseInt(l, 10) : NaN;
        if (!isNaN(c) && c >= 0) return {
          ok: false,
          retryAfterMs: c * 1000,
          status: a.status,
          reason: `http_${a.status}`
        };
      }
      return {
        ok: false,
        status: a.status,
        reason: `http_${a.status}`
      };
    } catch (a) {
      return v(`CCRClient: ${r} failed: ${Se(a)}`, {
        level: "warn"
      }), xn("warn", "cli_worker_request_error", {
        method: H,
        path: _,
        error_code: getErrorCode(a)
      }), {
        ok: false,
        reason: `fetch_failed:${getErrorCode(a)}`
      };
    }
  }
  reportState(H, t) {
    if (H === this.currentState && !t) return;
    this.currentState = H, this.workerState.enqueue({
      worker_status: H,
      requires_action_details: t ? {
        tool_name: t.tool_name,
        display_tool_name: t.display_tool_name,
        action_description: t.action_description,
        raw_command: t.raw_command,
        request_id: t.request_id,
        tool_use_id: t.tool_use_id
      } : null
    });
  }
  reportMetadata(H) {
    this.workerState.enqueue({
      external_metadata: normalizePostTurnSummaryMetadata(H)
    });
  }
  reportInternalMetadata(e) {
    this.workerState.enqueue({
      internal_metadata: e
    });
  }
  handleEpochMismatch() {
    v("CCRClient: Epoch mismatch (409), shutting down", {
      level: "error"
    }), xn("error", "cli_worker_epoch_mismatch"), this.onDiagnostic?.(`worker epoch mismatch (409), epoch=${this.workerEpoch} \u2014 superseded by a newer worker, exiting`), this.onEpochMismatch();
  }
  startHeartbeat() {
    this.stopHeartbeat();
    let e = () => {
        let n = this.heartbeatIntervalMs * this.heartbeatJitterFraction * (2 * Math.random() - 1);
        this.heartbeatTimer = setTimeout(t, this.heartbeatIntervalMs + n);
      },
      t = () => {
        if (this.sendHeartbeat(), this.heartbeatTimer === null) return;
        e();
      };
    e();
  }
  stopHeartbeat() {
    if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null;
  }
  async sendHeartbeat() {
    if (this.heartbeatInFlight) return;
    this.heartbeatInFlight = true;
    try {
      if ((await this.request("post", "/worker/heartbeat", {
        session_id: this.sessionId,
        worker_epoch: this.workerEpoch
      }, "Heartbeat", {
        timeout: 5000
      })).ok) v("CCRClient: Heartbeat sent");
    } finally {
      this.heartbeatInFlight = false;
    }
  }
  async writeEvent(H) {
    if (H.type === "stream_event") {
      if (this.streamEventBuffer.push(H), this.streamedEphemeralSinceLastAssistant = true, !this.streamEventTimer) this.streamEventTimer = setTimeout(() => void this.flushStreamEventBuffer(), STREAM_EVENT_FLUSH_MS);
      return;
    }
    if (await this.flushStreamEventBuffer(), H.type === "assistant" && this.streamedEphemeralSinceLastAssistant) He("ccr_partial_messages"), this.streamedEphemeralSinceLastAssistant = false;
    await this.eventUploader.enqueue(this.toClientEvent(H));
  }
  toClientEvent(e) {
    let t = e,
      n = t.historical === true,
      r = e.type === "system" && t.subtype === "thinking_tokens";
    return {
      payload: {
        ...t,
        uuid: typeof t.uuid === "string" ? t.uuid : cryptoModule.randomUUID()
      },
      ...(n && {
        historical: true
      }),
      ...(r && {
        ephemeral: true
      })
    };
  }
  async flushStreamEventBuffer() {
    if (this.streamEventTimer) clearTimeout(this.streamEventTimer), this.streamEventTimer = null;
    if (this.streamEventBuffer.length === 0) return;
    let e = this.streamEventBuffer;
    this.streamEventBuffer = [];
    let t = e.filter(n => {
      if (Buffer.byteLength(Oe(n)) <= MAX_EPHEMERAL_STREAM_EVENT_BYTES) return true;
      return v(`CCRClient: dropping oversize ephemeral stream_event (>${MAX_EPHEMERAL_STREAM_EVENT_BYTES} bytes)`, {
        level: "warn"
      }), Bt("ccr_partial_messages", "oversize_ephemeral_skipped"), false;
    });
    await this.eventUploader.enqueue(t.map(n => ({
      payload: n,
      ephemeral: true
    })));
  }
  async writeInternalEvent(e, t, {
    isCompaction: n = false,
    agentId: r,
    preservedEventIds: o
  } = {}) {
    let s = o;
    if (s && s.length > MAX_PRESERVED_EVENT_IDS) j("tengu_ccr_preserved_event_ids_clamped", {
      originalCount: s.length,
      cap: MAX_PRESERVED_EVENT_IDS
    }), s = s.slice(-MAX_PRESERVED_EVENT_IDS);
    let i = {
      payload: {
        type: e,
        ...t,
        uuid: typeof t.uuid === "string" ? t.uuid : cryptoModule.randomUUID()
      },
      ...(n && {
        is_compaction: true
      }),
      ...(r && {
        session_agent_id: r
      }),
      ...(s?.length && {
        preserved_event_ids: s
      })
    };
    await this.internalEventUploader.enqueue(i);
  }
  flushInternalEvents() {
    return this.internalEventUploader.flush();
  }
  flushDeliveryAcks() {
    return this.deliveryUploader.flush();
  }
  async flush() {
    return await this.flushStreamEventBuffer(), this.eventUploader.flush();
  }
  droppedDurableEventBatches = 0;
  get droppedDurableBatches() {
    return this.droppedDurableEventBatches;
  }
  async flushWorkerState() {
    return this.workerState.flush();
  }
  async readInternalEvents(e) {
    return this.paginatedGet("/worker/internal-events", {
      limit: "1000",
      ...(e && {
        after_event_id: e
      })
    }, "internal_events");
  }
  async readSubagentInternalEvents() {
    return this.paginatedGet("/worker/internal-events", {
      subagents: "true",
      limit: "1000"
    }, "subagent_events");
  }
  async paginatedGet(H, _, q) {
    let r = this.getAuthHeaders();
    if (Object.keys(r).length === 0) return null;
    let o = [],
      s,
      i = 0,
      a = 0,
      l = null;
    do {
      let c = new URL(`${this.sessionBaseUrl}${H}`);
      for (let [m, f] of Object.entries(_)) c.searchParams.set(m, f);
      if (s) c.searchParams.set("cursor", s), c.searchParams.delete("after_event_id");
      let u = !s && _.after_event_id !== undefined,
        d,
        p = await this.getWithRetry(c.toString(), r, q, m => {
          i++, l ??= m.headers.get("content-encoding");
          let f = m.headers.get("content-length");
          if (f !== null && a !== null) a += Number(f);else a = null;
        }, (m, f) => {
          if (!u) return;
          if (m === 400) d = "rejected";else if (f === "after_event_id_not_found") d = "not-found";
        });
      if (!p) {
        if (d) {
          v(`CCRClient: after_event_id ${d === "rejected" ? "rejected by server (gate off)" : "not found (stale anchor)"} \u2014 refetching without anchor`, {
            level: "warn"
          }), xn("warn", d === "rejected" ? "cli_worker_after_event_id_rejected" : "cli_worker_after_event_id_not_found", {
            context: q
          });
          let {
              after_event_id: m,
              ...f
            } = _,
            A = await this.paginatedGet(H, f, q);
          if (!A) return null;
          return {
            ...A,
            anchorFallback: d
          };
        }
        return null;
      }
      o.push(...(p.data ?? [])), s = p.next_cursor;
    } while (s);
    return v(`CCRClient: Read ${o.length} internal events from ${H}${_.subagents ? " (subagents)" : ""}`), {
      events: o,
      stats: {
        pageCount: i,
        bytesReceived: a,
        contentEncoding: l ?? "none"
      }
    };
  }
  async getWithRetry(H, _, n, r, o) {
    for (let s = 1; s <= 10; s++) {
      let i;
      try {
        if (i = await fetch(H, {
          headers: {
            ..._,
            "anthropic-version": "2023-06-01",
            "anthropic-client-platform": qx(),
            "User-Agent": Yh()
          },
          signal: AbortSignal.timeout(30000),
          ...sT({
            url: H
          })
        }), i.ok) {
          let l = await i.json();
          return r?.(i), l;
        }
      } catch (l) {
        if (v(`CCRClient: GET ${H} failed (attempt ${s}/10): ${Se(l)}`, {
          level: "warn"
        }), s < 10) {
          let c = Math.min(500 * 2 ** (s - 1), 30000) + Math.random() * 500;
          await Fn(c);
        }
        continue;
      }
      let a;
      if (i.status === 404 && o) try {
        let l = await i.json();
        if (typeof l?.error?.type === "string") a = l.error.type;
      } catch {} else i.body?.cancel();
      if (i.status === 409) this.handleEpochMismatch();
      if (isDroppableHttpStatus(i.status) || a === "after_event_id_not_found") return v(`CCRClient: GET ${H} returned ${i.status} \u2014 permanent, not retrying`, {
        level: "warn"
      }), o?.(i.status, a), null;
      if (v(`CCRClient: GET ${H} returned ${i.status} (attempt ${s}/10)`, {
        level: "warn"
      }), s < 10) {
        let l = Math.min(500 * 2 ** (s - 1), 30000) + Math.random() * 500;
        await Fn(l);
      }
    }
    return v("CCRClient: GET retries exhausted", {
      level: "error"
    }), xn("error", "cli_worker_get_retries_exhausted", {
      context: n
    }), null;
  }
  reportDelivery(e, t) {
    if (t === "processing") {
      if (this.closed) return;
      if (this.pendingProcessingAcks.push(e) === 1) queueMicrotask(() => {
        let n = this.pendingProcessingAcks;
        if (this.pendingProcessingAcks = [], this.closed || n.length === 0) return;
        this.request("post", "/worker/events/delivery", {
          worker_epoch: this.workerEpoch,
          updates: n.map(r => ({
            event_id: r,
            status: "processing"
          }))
        }, "processing ack");
      });
      return;
    }
    this.deliveryUploader.enqueue({
      eventId: e,
      status: t
    });
  }
  getWorkerEpoch() {
    return this.workerEpoch;
  }
  get internalEventsPending() {
    return this.internalEventUploader.pendingCount;
  }
  close() {
    if (this.closed = true, this.stopHeartbeat(), m7a(), this.streamEventTimer) clearTimeout(this.streamEventTimer), this.streamEventTimer = null;
    this.streamEventBuffer = [], this.pendingProcessingAcks = [], this.workerState.close(), this.eventUploader.close(), this.internalEventUploader.close(), this.deliveryUploader.close();
  }
}
function normalizePostTurnSummaryMetadata(H) {
  let _ = H.post_turn_summary;
  if (!hasStatusCategory(_) || _.status_category !== "blocked") return H;
  return {
    ...H,
    post_turn_summary: {
      ..._,
      status_category: "need_input"
    }
  };
}
function hasStatusCategory(H) {
  return H !== null && typeof H === "object" && "status_category" in H && typeof H.status_category === "string";
}
var cryptoModule,
  DEFAULT_HEARTBEAT_INTERVAL_MS = 20000,
  STREAM_EVENT_FLUSH_MS = 100,
  MAX_EPHEMERAL_STREAM_EVENT_BYTES = 61440,
  MAX_PRESERVED_EVENT_IDS = 1536,
  WorkerInitializationError,
  MAX_AUTH_FAILURES = 10,
  MAX_NOT_FOUND_FAILURES = 3,
  WORKER_STATE_RESTORE_TIMEOUT_MS = 1e4;
var dWq = b(() => {
  kze();
  cn();
  Ct();
  je();
  wA();
  St();
  Z_();
  Jqe();
  T1();
  Xt();
  W$l();
  noopRemoteClientModule();
  cryptoModule = require("crypto");
  WorkerInitializationError = class WorkerInitializationError extends Error {
    reason;
    httpStatus;
    constructor(H, _) {
      super(`CCRClient init failed: ${H}`);
      this.reason = H;
      this.httpStatus = _;
    }
  };
});
export {CoalescingRetryUploader as wNo,mergeWorkerStatePatch as $Kl,noopRemoteClientModule as qKl,isDroppableHttpStatus as BOe,getErrorCode as GKl,isRetryableWorkerRegistrationFailure as VKl,CCRClient as m7t,normalizePostTurnSummaryMetadata as TMm,hasStatusCategory as SMm,cryptoModule as HNo,DEFAULT_HEARTBEAT_INTERVAL_MS as fMm,STREAM_EVENT_FLUSH_MS as hMm,MAX_EPHEMERAL_STREAM_EVENT_BYTES as WKl,MAX_PRESERVED_EVENT_IDS as kNo,WorkerInitializationError as UOe,MAX_AUTH_FAILURES as gMm,MAX_NOT_FOUND_FAILURES as _Mm,WORKER_STATE_RESTORE_TIMEOUT_MS as yMm,dWq as INo};
