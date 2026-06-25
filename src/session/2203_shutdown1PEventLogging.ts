// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getDynamicConfig_CACHED_MAY_BE_STALE as Dk,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {P2,S8} from "../config/2187_S8.ts";
import {cbn,vu} from "../mcp/2200_mcpServerName.ts";
import {TZe,KQ} from "../../vendor/m2039.ts";
import {getOrCreateUserID as T8,tr} from "./5228_shouldSkipPluginAutoupdate.ts";
import {fUe,n$r} from "../telemetry/2202_n$r.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {profileCheckpoint as ta,z9} from "./0243_profileReport.ts";
import {oK,dn} from "../config/0137_namespace.ts";
import {Yt,O1e,Es} from "../../vendor/m641.ts";
import {t$r,bSi} from "../../vendor/m2200.ts";
import {cUe} from "../../vendor/m2179.ts";
import {Ife} from "../../vendor/m2182.ts";
import {J_} from "../../vendor/m446.ts";
import {Ie,vn} from "./0621_length.ts";
import {R2r} from "../../vendor/m2185.ts";
import {YU} from "../../vendor/m459.ts";
import {qe} from "../config/0236_setHasFormattedOutput.ts";
import {zZe} from "../../vendor/m2163.ts";
import {jQ} from "../../vendor/m2117.ts";
var hUe = {};
ft(hUe, {
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
  return Dk(uad, {});
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
function ASi() {
  return Dk(dad, {});
}
function _getPreInitQueueForTesting() {
  return G7;
}

// Reset all module-level state for test isolation
function _reset1PStateForTesting() {
  XQ = null, Nfe = null, o$r = null, G7 = [];
}

// Gracefully flush and shut down the OTEL logger provider
async function shutdown1PEventLogging() {
  if (!Nfe) return;
  try {
    await Nfe.shutdown();
  } catch {}
}

// 1P event logging is enabled when the feature is not disabled via config
function is1PEventLoggingEnabled() {
  return !P2();
}

// Emit a single event to the 1P OTEL logger (awaitable, so caller can wait for delivery)
async function logEventTo1PAsync(logger: any, eventName: string, metadata: any = {}) {
  try {
    let coreMetadata = await cbn({
        model: metadata.model,
        betas: metadata.betas
      }),
      eventPayload = {
        event_name: eventName,
        event_id: r$r.randomUUID(),
        core_metadata: coreMetadata,
        user_metadata: TZe(!0),
        event_metadata: metadata
      },
      userId = T8();
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
  if (!XQ) {
    // Logger not ready yet — buffer up to RSi events in pre-init queue
    if (G7 !== null && G7.length < RSi) G7.push({
      eventName: eventName,
      metadata: metadata
    });
    return;
  }
  if (fUe("firstParty")) return; // killed flag set, skip
  logEventTo1PAsync(XQ, eventName, metadata);
}

// Awaitable version of logEventTo1P — lets callers wait for the emit
async function logEventTo1PAwaitable(eventName: string, metadata: any = {}) {
  if (!is1PEventLoggingEnabled()) return;
  if (!XQ) {
    if (G7 !== null && G7.length < RSi) G7.push({
      eventName: eventName,
      metadata: metadata
    });
    return;
  }
  if (fUe("firstParty")) return;
  return logEventTo1PAsync(XQ, eventName, metadata);
}

// Always returns "production" — environment tag for GrowthBook experiment events
function fad() {
  return "production";
}

// Emit a GrowthBook experiment assignment event to 1P logging
function logGrowthBookExperimentTo1P(experimentEvent: any) {
  if (!is1PEventLoggingEnabled()) return;
  if (!XQ || fUe("firstParty")) return;
  let userId = T8(),
    {
      accountUuid: accountUuid,
      organizationUuid: organizationUuid
    } = TZe(!0),
    payload = {
      event_type: "GrowthbookExperimentEvent",
      event_id: r$r.randomUUID(),
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
        user_attributes: Pe({
          appVersion: experimentEvent.userAttributes.appVersion
        })
      }),
      ...(experimentEvent.experimentMetadata && {
        experiment_metadata: Pe(experimentEvent.experimentMetadata)
      }),
      environment: fad()
    },
    now = new Date();
  XQ.emit({
    timestamp: now,
    observedTimestamp: now,
    body: "growthbook_experiment",
    attributes: payload
  });
}

// Set up the OTEL LoggerProvider with the configured exporter and batch processor
function initialize1PEventLogging() {
  if (ta("1p_event_logging_start"), !is1PEventLoggingEnabled()) {
    G7 = null; // discard queued events; 1P logging disabled
    return;
  }
  let batchConfig = ASi();
  o$r = batchConfig,
  // save config snapshot for change-detection in reinitialize
  ta("1p_event_after_growthbook_config");
  let scheduledDelayMs = batchConfig.scheduledDelayMillis || oK(process.env.OTEL_LOGS_EXPORT_INTERVAL, had),
    maxBatchSize = batchConfig.maxExportBatchSize || gad,
    maxQueueSize = batchConfig.maxQueueSize || _ad,
    runtimeEnv = Yt(),
    // detect WSL, macOS, etc.
    serviceAttributes = {
      [dbn.ATTR_SERVICE_NAME]: "claude-code",
      [dbn.ATTR_SERVICE_VERSION]: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    };
  if (runtimeEnv === "wsl") {
    let wslVersion = O1e();
    if (wslVersion) serviceAttributes["wsl.version"] = wslVersion;
  }
  let otelResource = ESi.resourceFromAttributes(serviceAttributes),
    exporter = new t$r({
      maxBatchSize: maxBatchSize,
      skipAuth: batchConfig.skipAuth,
      maxAttempts: batchConfig.maxAttempts,
      path: batchConfig.path,
      baseUrl: batchConfig.baseUrl,
      isKilled: () => fUe("firstParty") // abort export if killed flag set
    });
  if (Nfe = new cUe({
    resource: otelResource,
    processors: [new Ife(exporter, {
      scheduledDelayMillis: scheduledDelayMs,
      maxExportBatchSize: maxBatchSize,
      maxQueueSize: maxQueueSize
    })]
  }), XQ = Nfe.getLogger("com.anthropic.claude_code.events", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION), G7 !== null) {
    // Drain the pre-init queue now that the logger is ready
    let preInitQueue = G7;
    G7 = null;
    for (let {
      eventName: eventName,
      metadata: metadata
    } of preInitQueue) logEventTo1P(eventName, metadata);
  }
}

// Re-initialize if the GrowthBook batch config has changed since last init
async function reinitialize1PEventLoggingIfConfigChanged() {
  if (!is1PEventLoggingEnabled() || !Nfe) return;
  let newConfig = ASi();
  if (J_(newConfig, o$r)) return; // config unchanged, nothing to do
  let oldProvider = Nfe,
    oldLogger = XQ;
  XQ = null;
  try {
    await oldProvider.forceFlush();
  } catch {} // flush pending events before swapping
  Nfe = null;
  try {
    initialize1PEventLogging();
  } catch (err) {
    // Rollback to old provider if re-init fails
    Nfe = oldProvider, XQ = oldLogger, Ie(err);
    return;
  }
  oldProvider.shutdown().catch(() => {}); // async shutdown of old provider
}

// Module-level state
var ESi: any,
  // OTEL SDK namespace (resourceFromAttributes)
  dbn: any,
  // OTEL semantic conventions (ATTR_SERVICE_NAME, etc.)
  r$r: any,
  // Node.js crypto module (for randomUUID)
  uad = "tengu_event_sampling_config",
  // GrowthBook key for per-event sampling config
  dad = "tengu_1p_event_batch_config",
  // GrowthBook key for batch export config
  XQ = null,
  // Active OTEL logger instance (null until initialized)
  Nfe = null,
  // Active LoggerProvider instance
  o$r = null,
  // Last-seen batch config snapshot (for change detection)
  G7: any,
  // Pre-init event queue (null after initialization)
  RSi = 1024,
  // Max pre-init queue length
  had = 1e4,
  // Default scheduled delay ms (10s)
  gad = 200,
  // Default max export batch size
  _ad = 8192; // Default max queue size

// Lazy initialization block — runs once when this module is first required
var GM = b(() => {
  R2r();
  YU();
  tr();
  qe();
  dn();
  vn();
  Es();
  tn();
  z9();
  KQ();
  S8();
  bSi();
  jn();
  vu();
  n$r();
  ESi = x(zZe(), 1), dbn = x(jQ(), 1), r$r = require("crypto");
  G7 = [];
});
export {hUe,getEventSamplingConfig,shouldSampleEvent,ASi,_getPreInitQueueForTesting,_reset1PStateForTesting,shutdown1PEventLogging,is1PEventLoggingEnabled,logEventTo1PAsync,logEventTo1P,logEventTo1PAwaitable,fad,logGrowthBookExperimentTo1P,initialize1PEventLogging,reinitialize1PEventLoggingIfConfigChanged,ESi,dbn,r$r,uad,dad,XQ,Nfe,o$r,G7,RSi,had,gad,_ad,GM};
