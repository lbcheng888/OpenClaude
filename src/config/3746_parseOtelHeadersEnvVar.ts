// @ts-nocheck
import {isFullscreenWithTTY,M,b} from "../../runtime.ts";
import {Ihe,lKr} from "../../vendor/m3181.ts";
import {Xw,Zxe} from "../telemetry/3181_content.ts";
import {getTracerProvider,getCachedTelemetryResource,setCachedTelemetryResource,setTracerProvider,setLoggerProvider,setEventLogger,setMeterProvider,getLoggerProvider,getMeterProvider,getGatewayAuth,isGatewayAuthPinned,getCachedOtlpHttpAgentFactory,setCachedOtlpHttpAgentFactory,lt} from "../session/0131_sent.ts";
import {zt,$Me,qs} from "../../vendor/m635.ts";
import {XEn,Q3r} from "../../vendor/m2591.ts";
import {yee,Vnt} from "../../vendor/m3017.ts";
import {vQr,wQr,ama} from "../../vendor/m3429.ts";
import {Y9e} from "../../vendor/m3418.ts";
import {GNt} from "../../vendor/m3424.ts";
import {pFe} from "../../vendor/m2174.ts";
import {Tfe} from "../../vendor/m2177.ts";
import {AHt,G1r} from "../../vendor/m2168.ts";
import {logForDebugging,getHasFormattedOutput,qe} from "./0234_setHasFormattedOutput.ts";
import {sZr,oZr} from "../../vendor/m3497.ts";
import {aZr,iZr} from "../../vendor/m3501.ts";
import {RV,sn} from "./0047_namespace.ts";
import {Le,Xt} from "./0228_encoding.ts";
import {MSa} from "../../vendor/m3621.ts";
import {gOn} from "../../vendor/m3507.ts";
import {jSa,qSa} from "../../vendor/m3625.ts";
import {Hva} from "../../vendor/m3732.ts";
import {g_n} from "../../vendor/m2175.ts";
import {Ova} from "../../vendor/m3734.ts";
import {$va,Uva} from "../../vendor/m3738.ts";
import {EPn} from "../../vendor/m3425.ts";
import {Gva} from "../../vendor/m3740.ts";
import {Qva,Xva} from "../../vendor/m3744.ts";
import {st} from "../../vendor/m5.ts";
import {EQr,nma} from "../../vendor/m3428.ts";
import {MMe,Ap} from "./0614_Ap.ts";
import {getSubscriptionType,isClaudeAISubscriber,is1PApiCustomer,getOtelHeadersFromHelper,Ao} from "./2031_withOAuthRefreshLock.ts";
import {profileCheckpoint,x3} from "../session/0241_profileReport.ts";
import {RQr,cma} from "./3431_level.ts";
import {kea,Zrt} from "./3183_agentId.ts";
import {Gi,ReactHooks} from "../../vendor/m133.ts";
import {jae,mKr,Nq} from "../agent/3184_code.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {getSettings_DEPRECATED,yr} from "./0740_updateSettingsForSource.ts";
import {oCe,PYe} from "../../vendor/m1481.ts";
import {getProxyUrl,O7,Z_} from "./1021_shouldBypassProxyWithCidr.ts";
import {j2,S7} from "./0746_bytes.ts";
import {S8,AKe} from "./0745_level.ts";
import {Q1r} from "../../vendor/m2180.ts";
import {Xpa} from "../../vendor/m3426.ts";
import {Xi} from "../../vendor/m2091.ts";
import {ag} from "../../vendor/m2133.ts";
import {zXe} from "../../vendor/m2158.ts";
import {jNt} from "../../vendor/m3408.ts";
import {QQ} from "../../vendor/m2112.ts";
import {qEt} from "../../vendor/m743.ts";
var jno = {};
isFullscreenWithTTY(jno, {
  parseOtelHeadersEnvVar: () => parseOtelHeadersEnvVar,
  parseExporterTypes: () => parseExporterTypes,
  isTelemetryEnabled: () => isTelemetryEnabled,
  isBigQueryMetricsEnabled: () => isBigQueryMetricsEnabled,
  initializeTelemetry: () => initializeTelemetry,
  getOtlpLogExporters: () => getOtlpLogExporters,
  getOTLPExporterConfig: () => getOTLPExporterConfig,
  flushTelemetry: () => flushTelemetry,
  bootstrapTelemetry: () => bootstrapTelemetry
});

// Returns a Promise that rejects with a TimeoutError after `delayMs` milliseconds
function $no(delayMs: number, timeoutLabel: string): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout((rejectFn: any, label: any) => rejectFn(new qno(label)), delayMs, reject, timeoutLabel).unref();
  });
}

// Sets up the global context manager and initializes the tracer provider if telemetry is enabled
function bootstrapTelemetry() {
  if (dte.context.setGlobalContextManager(Ihe), !process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta";
  if (Xw() && !getTracerProvider()) lwa();
}

// Builds and caches the OpenTelemetry resource with service name, version, OS, host arch, and env attributes
function awa() {
  let cachedResource = getCachedTelemetryResource();
  if (cachedResource) return cachedResource;
  let platform = zt(),
    serviceAttrs = {
      [hHe.ATTR_SERVICE_NAME]: "claude-code",
      [hHe.ATTR_SERVICE_VERSION]: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    };
  if (platform === "wsl") {
    let wslVersion = $Me();
    if (wslVersion) serviceAttrs["wsl.version"] = wslVersion;
  }
  let serviceResource = vY.resourceFromAttributes(serviceAttrs),
    osResource = vY.resourceFromAttributes(vY.osDetector.detect().attributes || {}),
    hostDetected = vY.hostDetector.detect(),
    hostArchAttrs = hostDetected.attributes?.[hHe.SEMRESATTRS_HOST_ARCH] ? {
      [hHe.SEMRESATTRS_HOST_ARCH]: hostDetected.attributes[hHe.SEMRESATTRS_HOST_ARCH]
    } : {},
    hostResource = vY.resourceFromAttributes(hostArchAttrs),
    envAttrsRaw = XEn(),
    hasCustomEnvAttrs = Object.keys(envAttrsRaw).length > 0,
    rawEnvDetected = vY.envDetector.detect().attributes || {},
    filteredEnvResource = vY.resourceFromAttributes(hasCustomEnvAttrs ? yee(rawEnvDetected, (val: any, key: any) => key.startsWith("user.") || key.startsWith("identity.")) : rawEnvDetected),
    mergedResource = serviceResource.merge(osResource).merge(hostResource).merge(filteredEnvResource).merge(vY.resourceFromAttributes(envAttrsRaw));
  return setCachedTelemetryResource(mergedResource), mergedResource;
}

// Initializes the global tracer, logger, and event logger providers using the built-in (non-3P) OTLP exporters
function lwa() {
  let resource = awa(),
    spanExporter = new vQr(),
    spanProcessor = new Y9e(spanExporter, {
      scheduledDelayMillis: swa
    }),
    tracerProvider = new GNt({
      resource: resource,
      spanProcessors: [spanProcessor]
    });
  dte.trace.setGlobalTracerProvider(tracerProvider), setTracerProvider(tracerProvider);
  let logExporter = new wQr(),
    loggerProvider = new pFe({
      resource: resource,
      processors: [new Tfe(logExporter, {
        scheduledDelayMillis: owa
      })]
    });
  AHt.setGlobalLoggerProvider(loggerProvider), setLoggerProvider(loggerProvider);
  let eventLogger = AHt.getLogger("com.anthropic.claude_code.events", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION);
  setEventLogger(eventLogger), process.on("beforeExit", async () => {
    await loggerProvider.forceFlush().catch(() => {}), await tracerProvider.forceFlush().catch(() => {});
  }), process.on("exit", () => {
    loggerProvider.forceFlush().catch(() => {}), tracerProvider.forceFlush().catch(() => {});
  }), Fup(spanExporter, logExporter).catch((err: any) => logForDebugging(`Beta tracing exporter wiring failed: ${err}`, {
    level: "error"
  }));
}

// Wires up beta tracing/logging exporters to the BETA_TRACING_ENDPOINT if set
async function Fup(spanExporter: any, logExporter: any) {
  let betaEndpoint = process.env.BETA_TRACING_ENDPOINT;
  if (!betaEndpoint) return;
  let [{
    OTLPTraceExporter: TraceExporterClass
  }, {
    OTLPLogExporter: LogExporterClass
  }] = await Promise.all([Promise.resolve().then(() => (sZr(), oZr)), Promise.resolve().then(() => (aZr(), iZr))]);
  spanExporter.setDelegate(new TraceExporterClass({
    url: `${betaEndpoint}/v1/traces`
  })), logExporter.setDelegate(new LogExporterClass({
    url: `${betaEndpoint}/v1/logs`
  }));
}

// Splits a comma-separated exporter type string, trims whitespace, and removes "none" entries
function parseExporterTypes(exporterEnvValue: string | undefined): string[] {
  return (exporterEnvValue || "").trim().split(",").filter(Boolean).map((exporterType: string) => exporterType.trim()).filter((exporterType: string) => exporterType !== "none");
}

// Builds metric readers for each configured exporter type (console, otlp via grpc/http, prometheus)
async function Uup() {
  let exporterTypes = parseExporterTypes(process.env.OTEL_METRICS_EXPORTER),
    exportIntervalMs = RV(process.env.OTEL_METRIC_EXPORT_INTERVAL, Bup);
  logForDebugging(`[3P telemetry] getOtlpReaders: types=${Le(exporterTypes)}, interval=${exportIntervalMs}, protocol=${process.env.OTEL_EXPORTER_OTLP_PROTOCOL}, endpoint=${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}`);
  let exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") {
    let consoleExporter = new gHe.ConsoleMetricExporter(),
      originalExport = consoleExporter.export.bind(consoleExporter);
    consoleExporter.export = (metrics: any, callback: any) => {
      if (metrics.resource && metrics.resource.attributes) logForDebugging(`
=== Resource Attributes ===`), logForDebugging(Le(metrics.resource.attributes)), logForDebugging(`===========================
`);
      return originalExport(metrics, callback);
    }, exporters.push(consoleExporter);
  } else if (exporterType === "otlp") {
    let otlpProtocol = process.env.OTEL_EXPORTER_OTLP_METRICS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim(),
      exporterConfig = getOTLPExporterConfig("metrics");
    switch (otlpProtocol) {
      case "grpc":
        {
          let {
            OTLPMetricExporter: OtlpGrpcMetricExporter
          } = await Promise.resolve().then(() => M(MSa(), 1));
          exporters.push(new OtlpGrpcMetricExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPMetricExporter: OtlpHttpJsonMetricExporter
          } = await Promise.resolve().then(() => M(gOn(), 1));
          exporters.push(new OtlpHttpJsonMetricExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPMetricExporter: OtlpHttpProtobufMetricExporter
          } = await Promise.resolve().then(() => (jSa(), qSa));
          exporters.push(new OtlpHttpProtobufMetricExporter(exporterConfig));
          break;
        }
      default:
        throw Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`);
    }
  } else if (exporterType === "prometheus") {
    let {
      PrometheusExporter: PrometheusExporterClass
    } = await Promise.resolve().then(() => M(Hva(), 1));
    exporters.push(new PrometheusExporterClass());
  } else throw Error(`Unknown exporter type set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${exporterType}`);
  return exporters.map((exporter: any) => {
    if ("export" in exporter) return new gHe.PeriodicExportingMetricReader({
      exporter: exporter,
      exportIntervalMillis: exportIntervalMs
    });
    return exporter;
  });
}

// Returns OTLP log exporters for each configured log exporter type (console, otlp via grpc/http/protobuf)
async function getOtlpLogExporters() {
  let exporterTypes = parseExporterTypes(process.env.OTEL_LOGS_EXPORTER),
    otlpProtocol = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim(),
    otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  logForDebugging(`[3P telemetry] getOtlpLogExporters: types=${Le(exporterTypes)}, protocol=${otlpProtocol}, endpoint=${otlpEndpoint}`);
  let exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") exporters.push(new g_n());else if (exporterType === "otlp") {
    let exporterConfig = getOTLPExporterConfig("logs");
    switch (otlpProtocol) {
      case "grpc":
        {
          let {
            OTLPLogExporter: OtlpGrpcLogExporter
          } = await Promise.resolve().then(() => M(Ova(), 1));
          exporters.push(new OtlpGrpcLogExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPLogExporter: OtlpHttpJsonLogExporter
          } = await Promise.resolve().then(() => (aZr(), iZr));
          exporters.push(new OtlpHttpJsonLogExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPLogExporter: OtlpHttpProtobufLogExporter
          } = await Promise.resolve().then(() => ($va(), Uva));
          exporters.push(new OtlpHttpProtobufLogExporter(exporterConfig));
          break;
        }
      default:
        throw Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`);
    }
  } else throw Error(`Unknown exporter type set in OTEL_LOGS_EXPORTER env var: ${exporterType}`);
  return exporters;
}

// Returns OTLP trace exporters for each configured trace exporter type (console, otlp via grpc/http/protobuf)
async function $up() {
  let exporterTypes = parseExporterTypes(process.env.OTEL_TRACES_EXPORTER),
    exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") exporters.push(new EPn());else if (exporterType === "otlp") {
    let otlpProtocol = process.env.OTEL_EXPORTER_OTLP_TRACES_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim(),
      exporterConfig = getOTLPExporterConfig("traces");
    switch (otlpProtocol) {
      case "grpc":
        {
          let {
            OTLPTraceExporter: OtlpGrpcTraceExporter
          } = await Promise.resolve().then(() => M(Gva(), 1));
          exporters.push(new OtlpGrpcTraceExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPTraceExporter: OtlpHttpJsonTraceExporter
          } = await Promise.resolve().then(() => (sZr(), oZr));
          exporters.push(new OtlpHttpJsonTraceExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPTraceExporter: OtlpHttpProtobufTraceExporter
          } = await Promise.resolve().then(() => (Qva(), Xva));
          exporters.push(new OtlpHttpProtobufTraceExporter(exporterConfig));
          break;
        }
      default:
        throw Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_TRACES_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`);
    }
  } else throw Error(`Unknown exporter type set in OTEL_TRACES_EXPORTER env var: ${exporterType}`);
  return exporters;
}

// Returns true if CLAUDE_CODE_ENABLE_TELEMETRY env var is truthy
function isTelemetryEnabled() {
  return st(process.env.CLAUDE_CODE_ENABLE_TELEMETRY);
}

// Creates a PeriodicExportingMetricReader with the BigQuery exporter and a 5-minute interval
function qup() {
  let bigQueryExporter = new EQr();
  return new gHe.PeriodicExportingMetricReader({
    exporter: bigQueryExporter,
    exportIntervalMillis: 300000
  });
}

// BigQuery metrics are enabled for first-party API customers or enterprise/team Claude AI subscribers
function isBigQueryMetricsEnabled() {
  if (MMe()) return !1;
  let subscriptionType = getSubscriptionType(),
    isEnterpriseOrTeam = isClaudeAISubscriber() && (subscriptionType === "enterprise" || subscriptionType === "team");
  return is1PApiCustomer() || isEnterpriseOrTeam;
}

// Full telemetry initialization: sets up propagators, meter/logger/tracer providers, and shutdown hooks
async function initializeTelemetry() {
  if (profileCheckpoint("telemetry_init_start"), bootstrapTelemetry(), dte.propagation.setGlobalPropagator(new ewa.W3CTraceContextPropagator()), getHasFormattedOutput()) for (let envVarName of ["OTEL_METRICS_EXPORTER", "OTEL_LOGS_EXPORTER", "OTEL_TRACES_EXPORTER"]) {
    let currentVal = process.env[envVarName];
    if (currentVal?.includes("console")) process.env[envVarName] = currentVal.split(",").map((entry: string) => entry.trim()).filter((entry: string) => entry !== "console").join(",");
  }
  dte.diag.setLogger(new RQr(), dte.DiagLogLevel.ERROR), kea();
  let metricReaders: any[] = [],
    telemetryEnabled = isTelemetryEnabled();
  if (logForDebugging(`[3P telemetry] isTelemetryEnabled=${telemetryEnabled} (CLAUDE_CODE_ENABLE_TELEMETRY=${process.env.CLAUDE_CODE_ENABLE_TELEMETRY})`), telemetryEnabled) metricReaders.push(...(await Uup()));
  if (isBigQueryMetricsEnabled()) metricReaders.push(qup());
  let telemetryResource = awa();
  if (Xw()) {
    if (!getTracerProvider()) lwa();
    let meterProvider = new gHe.MeterProvider({
      resource: telemetryResource,
      views: [],
      readers: metricReaders
    });
    return setMeterProvider(meterProvider), Gi(async () => {
      let shutdownTimeoutMs = RV(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS, 2000);
      try {
        jae();
        let logProvider = getLoggerProvider(),
          tracerProv = getTracerProvider(),
          shutdownPromises = [meterProvider.shutdown()];
        if (logProvider) shutdownPromises.push(logProvider.forceFlush().then(() => logProvider.shutdown()));
        if (tracerProv) shutdownPromises.push(tracerProv.forceFlush().then(() => tracerProv.shutdown()));
        await Promise.race([Promise.all(shutdownPromises), $no(shutdownTimeoutMs, "OpenTelemetry shutdown timeout")]);
      } catch {}
    }), meterProvider.getMeter("com.anthropic.claude_code", {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION);
  }
  let nonTtyMeterProvider = new gHe.MeterProvider({
    resource: telemetryResource,
    views: [],
    readers: metricReaders
  });
  if (setMeterProvider(nonTtyMeterProvider), telemetryEnabled) {
    let logExporters = await getOtlpLogExporters();
    if (logForDebugging(`[3P telemetry] Created ${logExporters.length} log exporter(s)`), logExporters.length > 0) {
      let loggerProvider = new pFe({
        resource: telemetryResource,
        processors: logExporters.map((logExp: any) => new Tfe(logExp, {
          scheduledDelayMillis: RV(process.env.OTEL_LOGS_EXPORT_INTERVAL, owa)
        }))
      });
      AHt.setGlobalLoggerProvider(loggerProvider), setLoggerProvider(loggerProvider);
      let eventLogger = AHt.getLogger("com.anthropic.claude_code.events", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION);
      setEventLogger(eventLogger), logForDebugging("[3P telemetry] Event logger set successfully"), process.on("beforeExit", async () => {
        await loggerProvider?.forceFlush(), await getTracerProvider()?.forceFlush();
      }), process.on("exit", () => {
        loggerProvider?.forceFlush(), getTracerProvider()?.forceFlush();
      });
    }
  }
  if (telemetryEnabled && mKr()) {
    let traceExporters = await $up();
    if (traceExporters.length > 0) {
      let spanProcessors = traceExporters.map((traceExp: any) => new Y9e(traceExp, {
          scheduledDelayMillis: RV(process.env.OTEL_TRACES_EXPORT_INTERVAL, swa)
        })),
        tracerProvider = new GNt({
          resource: telemetryResource,
          spanProcessors: spanProcessors
        });
      dte.trace.setGlobalTracerProvider(tracerProvider), setTracerProvider(tracerProvider), process.on("beforeExit", async () => {
        await tracerProvider.forceFlush();
      });
    }
  }
  return Gi(async () => {
    let shutdownTimeoutMs = RV(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS, 2000);
    try {
      jae();
      let shutdownPromises = [nonTtyMeterProvider.shutdown()],
        logProvider = getLoggerProvider();
      if (logProvider) shutdownPromises.push(logProvider.shutdown());
      let tracerProv = getTracerProvider();
      if (tracerProv) shutdownPromises.push(tracerProv.shutdown());
      await Promise.race([Promise.all(shutdownPromises), $no(shutdownTimeoutMs, "OpenTelemetry shutdown timeout")]);
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("timeout")) logForDebugging(`
OpenTelemetry telemetry flush timed out after ${shutdownTimeoutMs}ms

To resolve this issue, you can:
1. Increase the timeout by setting CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS env var (e.g., 5000 for 5 seconds)
2. Check if your OpenTelemetry backend is experiencing scalability issues
3. Disable OpenTelemetry by unsetting CLAUDE_CODE_ENABLE_TELEMETRY env var

Current timeout: ${shutdownTimeoutMs}ms
`, {
        level: "error"
      });
      throw err;
    }
  }), nonTtyMeterProvider.getMeter("com.anthropic.claude_code", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION);
}

// Flushes all telemetry providers (meters, loggers, tracers), with a timeout guard
async function flushTelemetry() {
  let meterProvider = getMeterProvider();
  if (!meterProvider) return;
  let flushTimeoutMs = RV(process.env.CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS, 5000);
  try {
    let flushPromises = [meterProvider.forceFlush()],
      logProvider = getLoggerProvider();
    if (logProvider) flushPromises.push(logProvider.forceFlush());
    let tracerProv = getTracerProvider();
    if (tracerProv) flushPromises.push(tracerProv.forceFlush());
    await Promise.race([Promise.all(flushPromises), $no(flushTimeoutMs, "OpenTelemetry flush timeout")]), logForDebugging("Telemetry flushed successfully");
  } catch (err: any) {
    if (err instanceof qno) logForDebugging(`Telemetry flush timed out after ${flushTimeoutMs}ms. Some metrics may not be exported.`, {
      level: "warn"
    });else logForDebugging(`Telemetry flush failed: ${Se(err)}`, {
      level: "error"
    });
  }
}

// Parses the OTEL_EXPORTER_OTLP_HEADERS env var (comma-separated key=value pairs) into a plain object
function parseOtelHeadersEnvVar(): Record<string, string> {
  let headers: Record<string, string> = {},
    rawHeadersEnv = process.env.OTEL_EXPORTER_OTLP_HEADERS;
  if (rawHeadersEnv) for (let headerEntry of rawHeadersEnv.split(",")) {
    let [headerKey, ...headerValueParts] = headerEntry.split("=");
    if (headerKey && headerValueParts.length > 0) headers[headerKey.trim()] = headerValueParts.join("=").trim();
  }
  return headers;
}

// Builds the OTLP exporter config object: URL, auth headers (gateway JWT or env), and HTTP agent options
function getOTLPExporterConfig(signalType: string): any {
  let settings = getSettings_DEPRECATED(),
    exporterConfig: any = {},
    gatewayAuth = getGatewayAuth();
  if (isGatewayAuthPinned(gatewayAuth)) {
    let pinnedUrl = gatewayAuth.url;
    return exporterConfig.url = `${pinnedUrl}/v1/${signalType}`, exporterConfig.headers = async () => {
      await oCe();
      let currentAuth = getGatewayAuth();
      if (!currentAuth || currentAuth.url !== pinnedUrl) return {};
      return {
        Authorization: `Bearer ${currentAuth.jwt}`
      };
    }, exporterConfig.httpAgentOptions = Zva(pinnedUrl), exporterConfig;
  }
  let envHeaders = parseOtelHeadersEnvVar();
  if (settings?.otelHeadersHelper) exporterConfig.headers = async () => {
    let helperHeaders = await getOtelHeadersFromHelper();
    return {
      ...envHeaders,
      ...helperHeaders
    };
  };else if (Object.keys(envHeaders).length > 0) exporterConfig.headers = async () => envHeaders;
  return exporterConfig.httpAgentOptions = Zva(process.env[`OTEL_EXPORTER_OTLP_${signalType.toUpperCase()}_ENDPOINT`] ?? process.env.OTEL_EXPORTER_OTLP_ENDPOINT), exporterConfig;
}

// Returns true if the given URL resolves to localhost / loopback (skip proxy for local endpoints)
function Gup(endpointUrl: string | undefined): boolean {
  if (!endpointUrl) return !1;
  try {
    let hostname = new URL(endpointUrl).hostname.toLowerCase();
    return hostname === "localhost" || hostname === "::1" || hostname === "[::1]" || /^127(\.\d{1,3}){3}$/.test(hostname);
  } catch {
    return !1;
  }
}

// Returns a cached or new HTTP/HTTPS agent factory for OTLP exporters, optionally routing through a proxy
function Zva(endpointUrl: string | undefined): any {
  let proxyUrl = getProxyUrl(),
    useProxy = !!(proxyUrl && !Gup(endpointUrl) && !(endpointUrl && O7(endpointUrl))),
    cachedFactory = getCachedOtlpHttpAgentFactory(useProxy);
  if (cachedFactory) return cachedFactory;
  let tlsOptions = j2(),
    caCert = S8(),
    tlsConfig = {
      ...tlsOptions,
      ...(caCert && {
        ca: caCert
      })
    },
    httpAgent: any,
    httpsAgent: any,
    proxyAgent: any,
    agentFactory = (protocol: string) => {
      if (useProxy) {
        if (!proxyAgent) proxyAgent = new rwa.HttpsProxyAgent(proxyUrl, {
          ...tlsConfig,
          keepAlive: !0,
          maxSockets: 1
        });
        return proxyAgent;
      }
      if (protocol === "http:") {
        if (!httpAgent) httpAgent = new twa.default.Agent({
          keepAlive: !0,
          maxSockets: 1
        });
        return httpAgent;
      }
      if (!httpsAgent) httpsAgent = new nwa.default.Agent({
        ...tlsConfig,
        keepAlive: !0,
        maxSockets: 1
      });
      return httpsAgent;
    };
  return setCachedOtlpHttpAgentFactory(useProxy, agentFactory), agentFactory;
}
var dte: any,
  ewa: any,
  vY: any,
  gHe: any,
  hHe: any,
  twa: any,
  nwa: any,
  rwa: any,
  Bup = 60000,
  owa = 5000,
  swa = 5000,
  qno: any;
var Wno = b(() => {
  G1r();
  Q1r();
  Xpa();
  Vnt();
  lt();
  Ao();
  qs();
  AKe();
  ReactHooks();
  qe();
  sn();
  bt();
  Q3r();
  PYe();
  S7();
  Ap();
  Z_();
  yr();
  Xt();
  x3();
  Zxe();
  nma();
  lKr();
  ama();
  cma();
  Zrt();
  Nq();
  dte = M(Xi(), 1), ewa = M(ag(), 1), vY = M(zXe(), 1), gHe = M(jNt(), 1), hHe = M(QQ(), 1), twa = M(require("http")), nwa = M(require("https")), rwa = M(qEt(), 1);
  qno = class qno extends Error {};
});
export {jno,$no,bootstrapTelemetry,awa,lwa,Fup,parseExporterTypes,Uup,getOtlpLogExporters,$up,isTelemetryEnabled,qup,isBigQueryMetricsEnabled,initializeTelemetry,flushTelemetry,parseOtelHeadersEnvVar,getOTLPExporterConfig,Gup,Zva,dte,ewa,vY,gHe,hHe,twa,nwa,rwa,Bup,owa,swa,qno,Wno};
