// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {getDynamicConfig_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {u$,s5} from "../config/2182_s5.ts";
import {k_n,$u} from "../mcp/2194_mcpServerName.ts";
import {SXe,JQ} from "../../vendor/m2034.ts";
import {getOrCreateUserID,Qn} from "./5194_shouldSkipPluginAutoupdate.ts";
import {gFe,xNr} from "../telemetry/2196_xNr.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {profileCheckpoint,x3} from "./0241_profileReport.ts";
import {RV,sn} from "../config/0047_namespace.ts";
import {zt,$Me,qs} from "../../vendor/m635.ts";
import {RNr,vfi} from "../../vendor/m2194.ts";
import {pFe} from "../../vendor/m2174.ts";
import {Tfe} from "../../vendor/m2177.ts";
import {aT} from "../../vendor/m442.ts";
import {De,Rn} from "./0615_length.ts";
import {Q1r} from "../../vendor/m2180.ts";
import {B3} from "../../vendor/m453.ts";
import {qe} from "../config/0234_setHasFormattedOutput.ts";
import {zXe} from "../../vendor/m2158.ts";
import {QQ} from "../../vendor/m2112.ts";
var _Fe = {};
isFullscreenWithTTY(_Fe, {
  shutdown1PEventLogging: () => shutdown1PEventLogging,
  shouldSampleEvent: () => shouldSampleEvent,
  reinitialize1PEventLoggingIfConfigChanged: () => reinitialize1PEventLoggingIfConfigChanged,
  logGrowthBookExperimentTo1P: () => logGrowthBookExperimentTo1P,
  logEventTo1PAwaitable: () => logEventTo1PAwaitable,
  logEventTo1PAsync: () => logEventTo1PAsync,
  logEventTo1P: () => logEventTo1P,
  is1PEventLoggingEnabled: () => is1PEventLoggingEnabled,
  initialize1PEventLogging: () => initialize1PEventLogging,
  getEventSamplingConfig: () => getEventSamplingConfig,
  _reset1PStateForTesting: () => _reset1PStateForTesting,
  _getPreInitQueueForTesting: () => _getPreInitQueueForTesting
});

// Returns the dynamic GrowthBook config for per-event sampling rates
function getEventSamplingConfig() {
  return getDynamicConfig_CACHED_MAY_BE_STALE(qJu, {});
}

// Returns null if event should not be sampled, 0 if dropped, or the sample_rate if accepted
function shouldSampleEvent(eventName: string): number | null {
  let samplingConfig = getEventSamplingConfig()[eventName];
  if (!samplingConfig) return null;
  let sampleRate = samplingConfig.sample_rate;
  if (typeof sampleRate !== "number" || sampleRate < 0 || sampleRate > 1) return null;
  if (sampleRate >= 1) return null; // always logged, no special sampling
  if (sampleRate <= 0) return 0; // never logged
  return Math.random() < sampleRate ? sampleRate : 0;
}

// Returns the dynamic GrowthBook config for 1P event batch/export settings
function xfi() {
  return getDynamicConfig_CACHED_MAY_BE_STALE(jJu, {});
}
function _getPreInitQueueForTesting() {
  return TK;
}

// Reset all module-level state for test isolation
function _reset1PStateForTesting() {
  getSessionOverrides = null, xfe = null, HNr = null, TK = [];
}

// Gracefully flush and shut down the OTEL logger provider
async function shutdown1PEventLogging() {
  if (!xfe) return;
  try {
    await xfe.shutdown();
  } catch {}
}

// 1P event logging is enabled when the feature is not disabled via config
function is1PEventLoggingEnabled() {
  return !u$();
}

// Emit a single event to the 1P OTEL logger (awaitable, so caller can wait for delivery)
async function logEventTo1PAsync(logger: any, eventName: string, metadata: any = {}) {
  try {
    let coreMetadata = await k_n({
        model: metadata.model,
        betas: metadata.betas
      }),
      eventPayload = {
        event_name: eventName,
        event_id: kNr.randomUUID(),
        core_metadata: coreMetadata,
        user_metadata: SXe(!0),
        event_metadata: metadata
      },
      userId = getOrCreateUserID();
    if (userId) eventPayload.user_id = userId;
    let now = new Date();
    logger.emit({
      timestamp: now,
      observedTimestamp: now,
      body: eventName,
      attributes: eventPayload
    });
  } catch (err) {}
}

// Fire-and-forget event log; queues events if logger not yet initialized
function logEventTo1P(eventName: string, metadata: any = {}) {
  if (!is1PEventLoggingEnabled()) return;
  if (!getSessionOverrides) {
    // Logger not ready yet — buffer up to kfi events in pre-init queue
    if (TK !== null && TK.length < kfi) TK.push({
      eventName: eventName,
      metadata: metadata
    });
    return;
  }
  if (gFe("firstParty")) return; // killed flag set, skip
  logEventTo1PAsync(getSessionOverrides, eventName, metadata);
}

// Awaitable version of logEventTo1P — lets callers wait for the emit
async function logEventTo1PAwaitable(eventName: string, metadata: any = {}) {
  if (!is1PEventLoggingEnabled()) return;
  if (!getSessionOverrides) {
    if (TK !== null && TK.length < kfi) TK.push({
      eventName: eventName,
      metadata: metadata
    });
    return;
  }
  if (gFe("firstParty")) return;
  return logEventTo1PAsync(getSessionOverrides, eventName, metadata);
}

// Always returns "production" — environment tag for GrowthBook experiment events
function VJu() {
  return "production";
}

// Emit a GrowthBook experiment assignment event to 1P logging
function logGrowthBookExperimentTo1P(experimentEvent: any) {
  if (!is1PEventLoggingEnabled()) return;
  if (!getSessionOverrides || gFe("firstParty")) return;
  let userId = getOrCreateUserID(),
    {
      accountUuid: accountUuid,
      organizationUuid: organizationUuid
    } = SXe(!0),
    payload = {
      event_type: "GrowthbookExperimentEvent",
      event_id: kNr.randomUUID(),
      experiment_id: experimentEvent.experimentId,
      variation_id: experimentEvent.variationId,
      ...(userId && {
        device_id: userId
      }),
      ...(accountUuid && {
        account_uuid: accountUuid
      }),
      ...(organizationUuid && {
        organization_uuid: organizationUuid
      }),
      ...(experimentEvent.userAttributes && {
        session_id: experimentEvent.userAttributes.sessionId,
        user_attributes: Le({
          appVersion: experimentEvent.userAttributes.appVersion
        })
      }),
      ...(experimentEvent.experimentMetadata && {
        experiment_metadata: Le(experimentEvent.experimentMetadata)
      }),
      environment: VJu()
    },
    now = new Date();
  getSessionOverrides.emit({
    timestamp: now,
    observedTimestamp: now,
    body: "growthbook_experiment",
    attributes: payload
  });
}

// Set up the OTEL LoggerProvider with the configured exporter and batch processor
function initialize1PEventLogging() {
  if (profileCheckpoint("1p_event_logging_start"), !is1PEventLoggingEnabled()) {
    TK = null; // discard queued events; 1P logging disabled
    return;
  }
  let batchConfig = xfi();
  HNr = batchConfig,
  // save config snapshot for change-detection in reinitialize
  profileCheckpoint("1p_event_after_growthbook_config");
  let scheduledDelayMs = batchConfig.scheduledDelayMillis || RV(process.env.OTEL_LOGS_EXPORT_INTERVAL, KJu),
    maxBatchSize = batchConfig.maxExportBatchSize || zJu,
    maxQueueSize = batchConfig.maxQueueSize || YJu,
    runtimeEnv = zt(),
    // detect WSL, macOS, etc.
    serviceAttributes = {
      [I_n.ATTR_SERVICE_NAME]: "claude-code",
      [I_n.ATTR_SERVICE_VERSION]: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    };
  if (runtimeEnv === "wsl") {
    let wslVersion = $Me();
    if (wslVersion) serviceAttributes["wsl.version"] = wslVersion;
  }
  let otelResource = wfi.resourceFromAttributes(serviceAttributes),
    exporter = new RNr({
      maxBatchSize: maxBatchSize,
      skipAuth: batchConfig.skipAuth,
      maxAttempts: batchConfig.maxAttempts,
      path: batchConfig.path,
      baseUrl: batchConfig.baseUrl,
      isKilled: () => gFe("firstParty") // abort export if killed flag set
    });
  if (xfe = new pFe({
    resource: otelResource,
    processors: [new Tfe(exporter, {
      scheduledDelayMillis: scheduledDelayMs,
      maxExportBatchSize: maxBatchSize,
      maxQueueSize: maxQueueSize
    })]
  }), getSessionOverrides = xfe.getLogger("com.anthropic.claude_code.events", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION), TK !== null) {
    // Drain the pre-init queue now that the logger is ready
    let preInitQueue = TK;
    TK = null;
    for (let {
      eventName: eventName,
      metadata: metadata
    } of preInitQueue) logEventTo1P(eventName, metadata);
  }
}

// Re-initialize if the GrowthBook batch config has changed since last init
async function reinitialize1PEventLoggingIfConfigChanged() {
  if (!is1PEventLoggingEnabled() || !xfe) return;
  let newConfig = xfi();
  if (aT(newConfig, HNr)) return; // config unchanged, nothing to do
  let oldProvider = xfe,
    oldLogger = getSessionOverrides;
  getSessionOverrides = null;
  try {
    await oldProvider.forceFlush();
  } catch {} // flush pending events before swapping
  xfe = null;
  try {
    initialize1PEventLogging();
  } catch (err) {
    // Rollback to old provider if re-init fails
    xfe = oldProvider, getSessionOverrides = oldLogger, De(err);
    return;
  }
  oldProvider.shutdown().catch(() => {}); // async shutdown of old provider
}

// Module-level state
var wfi: any,
  // OTEL SDK namespace (resourceFromAttributes)
  I_n: any,
  // OTEL semantic conventions (ATTR_SERVICE_NAME, etc.)
  kNr: any,
  // Node.js crypto module (for randomUUID)
  qJu = "tengu_event_sampling_config",
  // GrowthBook key for per-event sampling config
  jJu = "tengu_1p_event_batch_config",
  // GrowthBook key for batch export config
  getSessionOverrides = null,
  // Active OTEL logger instance (null until initialized)
  xfe = null,
  // Active LoggerProvider instance
  HNr = null,
  // Last-seen batch config snapshot (for change detection)
  TK: any,
  // Pre-init event queue (null after initialization)
  kfi = 1024,
  // Max pre-init queue length
  KJu = 1e4,
  // Default scheduled delay ms (10s)
  zJu = 200,
  // Default max export batch size
  YJu = 8192; // Default max queue size

// Lazy initialization block — runs once when this module is first required
var I1 = b(() => {
  Q1r();
  B3();
  Qn();
  qe();
  sn();
  Rn();
  qs();
  Xt();
  x3();
  JQ();
  s5();
  vfi();
  zn();
  $u();
  xNr();
  wfi = M(zXe(), 1), I_n = M(QQ(), 1), kNr = require("crypto");
  TK = [];
});
export {_Fe,getEventSamplingConfig,shouldSampleEvent,xfi,_getPreInitQueueForTesting,_reset1PStateForTesting,shutdown1PEventLogging,is1PEventLoggingEnabled,logEventTo1PAsync,logEventTo1P,logEventTo1PAwaitable,VJu,logGrowthBookExperimentTo1P,initialize1PEventLogging,reinitialize1PEventLoggingIfConfigChanged,wfi,I_n,kNr,qJu,jJu,getSessionOverrides,xfe,HNr,TK,kfi,KJu,zJu,YJu,I1};
