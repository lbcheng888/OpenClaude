// @ts-nocheck
import {ft,x,b} from "../../runtime.ts";
import {Wge,$Xr} from "../../vendor/m3195.ts";
import {nv,qHe} from "../telemetry/3195_content.ts";
import {getTracerProvider as Wde,getCachedTelemetryResource as Lir,setCachedTelemetryResource as Mir,setTracerProvider as hJt,setLoggerProvider as pJt,setEventLogger as mJt,setMeterProvider as fJt,getLoggerProvider as hSt,getMeterProvider as Oir,z_,isGatewayAuthPinned as QLe,getCachedOtlpHttpAgentFactory as Nir,setCachedOtlpHttpAgentFactory as Fir,lt} from "../session/0132_sent.ts";
import {Yt,O1e,Es} from "../../vendor/m641.ts";
import {$vn,H8r} from "../../vendor/m2602.ts";
import {BN,IEe} from "../../vendor/m452.ts";
import {aro,lro,ESa} from "../../vendor/m3445.ts";
import {c4e} from "../../vendor/m3434.ts";
import {bUt} from "../../vendor/m3440.ts";
import {cUe} from "../../vendor/m2179.ts";
import {Ife} from "../../vendor/m2182.ts";
import {qxt,y2r} from "../../vendor/m2173.ts";
import {logForDebugging as A,getHasFormattedOutput as Ocr,qe} from "./0236_setHasFormattedOutput.ts";
import {$ro,Uro} from "../../vendor/m3513.ts";
import {Wro,qro} from "../../vendor/m3517.ts";
import {oK,dn} from "./0137_namespace.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {Xka} from "../../vendor/m3637.ts";
import {u1n} from "../../vendor/m3523.ts";
import {oHa,rHa} from "../../vendor/m3641.ts";
import {Vxa} from "../../vendor/m3748.ts";
import {JSn} from "../../vendor/m2180.ts";
import {Yxa} from "../../vendor/m3750.ts";
import {nDa,tDa} from "../../vendor/m3754.ts";
import {gMn} from "../../vendor/m3441.ts";
import {iDa} from "../../vendor/m3756.ts";
import {mDa,pDa} from "../../vendor/m3760.ts";
import {nt} from "../../vendor/m127.ts";
import {sro,_Sa} from "../../vendor/m3444.ts";
import {H1e,$d} from "./0620_$d.ts";
import {getSubscriptionType as vi,isClaudeAISubscriber as Eo,is1PApiCustomer as WBe,getOtelHeadersFromHelper as DBr,lo} from "./2036_withOAuthRefreshLock.ts";
import {profileCheckpoint as ta,z9} from "../session/0243_profileReport.ts";
import {cro,ASa} from "./3447_level.ts";
import {kaa,Zst} from "./3197_agentId.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {qae,KXr,Z4} from "../agent/3198_code.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {getSettings_DEPRECATED as $o,br} from "./0745_updateSettingsForSource.ts";
import {$Ae,xXe} from "../../vendor/m1486.ts";
import {getProxyUrl as rF,shouldBypassProxy as i7,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {u2,zK} from "./0751_bytes.ts";
import {N5,mYe} from "./0750_level.ts";
import {R2r} from "../../vendor/m2185.ts";
import {pSa} from "../../vendor/m3442.ts";
import {xi} from "../../vendor/m2096.ts";
import {pg} from "../../vendor/m2138.ts";
import {zZe} from "../../vendor/m2163.ts";
import {TUt} from "../../vendor/m3424.ts";
import {jQ} from "../../vendor/m2117.ts";
import {hvt} from "../../vendor/m748.ts";
var Rao = {};
ft(Rao, {
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
function Cao(delayMs: number, timeoutLabel: string): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout((rejectFn: any, label: any) => rejectFn(new Aao(label)), delayMs, reject, timeoutLabel).unref();
  });
}

// Sets up the global context manager and initializes the tracer provider if telemetry is enabled
function bootstrapTelemetry() {
  if (ste.context.setGlobalContextManager(Wge), !process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta";
  if (nv() && !Wde()) CDa();
}

// Builds and caches the OpenTelemetry resource with service name, version, OS, host arch, and env attributes
function EDa() {
  let cachedResource = Lir();
  if (cachedResource) return cachedResource;
  let platform = Yt(),
    serviceAttrs = {
      [r0e.ATTR_SERVICE_NAME]: "claude-code",
      [r0e.ATTR_SERVICE_VERSION]: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    };
  if (platform === "wsl") {
    let wslVersion = O1e();
    if (wslVersion) serviceAttrs["wsl.version"] = wslVersion;
  }
  let serviceResource = nY.resourceFromAttributes(serviceAttrs),
    osResource = nY.resourceFromAttributes(nY.osDetector.detect().attributes || {}),
    hostDetected = nY.hostDetector.detect(),
    hostArchAttrs = hostDetected.attributes?.[r0e.SEMRESATTRS_HOST_ARCH] ? {
      [r0e.SEMRESATTRS_HOST_ARCH]: hostDetected.attributes[r0e.SEMRESATTRS_HOST_ARCH]
    } : {},
    hostResource = nY.resourceFromAttributes(hostArchAttrs),
    envAttrsRaw = $vn(),
    hasCustomEnvAttrs = Object.keys(envAttrsRaw).length > 0,
    rawEnvDetected = nY.envDetector.detect().attributes || {},
    filteredEnvResource = nY.resourceFromAttributes(hasCustomEnvAttrs ? BN(rawEnvDetected, (val: any, key: any) => key.startsWith("user.") || key.startsWith("identity.")) : rawEnvDetected),
    mergedResource = serviceResource.merge(osResource).merge(hostResource).merge(filteredEnvResource).merge(nY.resourceFromAttributes(envAttrsRaw));
  return Mir(mergedResource), mergedResource;
}

// Initializes the global tracer, logger, and event logger providers using the built-in (non-3P) OTLP exporters
function CDa() {
  let resource = EDa(),
    spanExporter = new aro(),
    spanProcessor = new c4e(spanExporter, {
      scheduledDelayMillis: SDa
    }),
    tracerProvider = new bUt({
      resource: resource,
      spanProcessors: [spanProcessor]
    });
  ste.trace.setGlobalTracerProvider(tracerProvider), hJt(tracerProvider);
  let logExporter = new lro(),
    loggerProvider = new cUe({
      resource: resource,
      processors: [new Ife(logExporter, {
        scheduledDelayMillis: TDa
      })]
    });
  qxt.setGlobalLoggerProvider(loggerProvider), pJt(loggerProvider);
  let eventLogger = qxt.getLogger("com.anthropic.claude_code.events", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION);
  mJt(eventLogger), process.on("beforeExit", async () => {
    await loggerProvider.forceFlush().catch(() => {}), await tracerProvider.forceFlush().catch(() => {});
  }), process.on("exit", () => {
    loggerProvider.forceFlush().catch(() => {}), tracerProvider.forceFlush().catch(() => {});
  }), vbp(spanExporter, logExporter).catch((err: any) => A(`Beta tracing exporter wiring failed: ${err}`, {
    level: "error"
  }));
}

// Wires up beta tracing/logging exporters to the BETA_TRACING_ENDPOINT if set
async function vbp(spanExporter: any, logExporter: any) {
  let betaEndpoint = process.env.BETA_TRACING_ENDPOINT;
  if (!betaEndpoint) return;
  let [{
    OTLPTraceExporter: TraceExporterClass
  }, {
    OTLPLogExporter: LogExporterClass
  }] = await Promise.all([Promise.resolve().then(() => ($ro(), Uro)), Promise.resolve().then(() => (Wro(), qro))]);
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
async function wbp() {
  let exporterTypes = parseExporterTypes(process.env.OTEL_METRICS_EXPORTER),
    exportIntervalMs = oK(process.env.OTEL_METRIC_EXPORT_INTERVAL, Rbp);
  A(`[3P telemetry] getOtlpReaders: types=${Pe(exporterTypes)}, interval=${exportIntervalMs}, protocol=${process.env.OTEL_EXPORTER_OTLP_PROTOCOL}, endpoint=${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}`);
  let exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") {
    let consoleExporter = new o0e.ConsoleMetricExporter(),
      originalExport = consoleExporter.export.bind(consoleExporter);
    consoleExporter.export = (metrics: any, callback: any) => {
      if (metrics.resource && metrics.resource.attributes) A(`
=== Resource Attributes ===`), A(Pe(metrics.resource.attributes)), A(`===========================
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
          } = await Promise.resolve().then(() => x(Xka(), 1));
          exporters.push(new OtlpGrpcMetricExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPMetricExporter: OtlpHttpJsonMetricExporter
          } = await Promise.resolve().then(() => x(u1n(), 1));
          exporters.push(new OtlpHttpJsonMetricExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPMetricExporter: OtlpHttpProtobufMetricExporter
          } = await Promise.resolve().then(() => (oHa(), rHa));
          exporters.push(new OtlpHttpProtobufMetricExporter(exporterConfig));
          break;
        }
      default:
        throw Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${otlpProtocol}`);
    }
  } else if (exporterType === "prometheus") {
    let {
      PrometheusExporter: PrometheusExporterClass
    } = await Promise.resolve().then(() => x(Vxa(), 1));
    exporters.push(new PrometheusExporterClass());
  } else throw Error(`Unknown exporter type set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${exporterType}`);
  return exporters.map((exporter: any) => {
    if ("export" in exporter) return new o0e.PeriodicExportingMetricReader({
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
  A(`[3P telemetry] getOtlpLogExporters: types=${Pe(exporterTypes)}, protocol=${otlpProtocol}, endpoint=${otlpEndpoint}`);
  let exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") exporters.push(new JSn());else if (exporterType === "otlp") {
    let exporterConfig = getOTLPExporterConfig("logs");
    switch (otlpProtocol) {
      case "grpc":
        {
          let {
            OTLPLogExporter: OtlpGrpcLogExporter
          } = await Promise.resolve().then(() => x(Yxa(), 1));
          exporters.push(new OtlpGrpcLogExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPLogExporter: OtlpHttpJsonLogExporter
          } = await Promise.resolve().then(() => (Wro(), qro));
          exporters.push(new OtlpHttpJsonLogExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPLogExporter: OtlpHttpProtobufLogExporter
          } = await Promise.resolve().then(() => (nDa(), tDa));
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
async function kbp() {
  let exporterTypes = parseExporterTypes(process.env.OTEL_TRACES_EXPORTER),
    exporters: any[] = [];
  for (let exporterType of exporterTypes) if (exporterType === "console") exporters.push(new gMn());else if (exporterType === "otlp") {
    let otlpProtocol = process.env.OTEL_EXPORTER_OTLP_TRACES_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim(),
      exporterConfig = getOTLPExporterConfig("traces");
    switch (otlpProtocol) {
      case "grpc":
        {
          let {
            OTLPTraceExporter: OtlpGrpcTraceExporter
          } = await Promise.resolve().then(() => x(iDa(), 1));
          exporters.push(new OtlpGrpcTraceExporter());
          break;
        }
      case "http/json":
        {
          let {
            OTLPTraceExporter: OtlpHttpJsonTraceExporter
          } = await Promise.resolve().then(() => ($ro(), Uro));
          exporters.push(new OtlpHttpJsonTraceExporter(exporterConfig));
          break;
        }
      case "http/protobuf":
        {
          let {
            OTLPTraceExporter: OtlpHttpProtobufTraceExporter
          } = await Promise.resolve().then(() => (mDa(), pDa));
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
  return nt(process.env.CLAUDE_CODE_ENABLE_TELEMETRY);
}

// Creates a PeriodicExportingMetricReader with the BigQuery exporter and a 5-minute interval
function Hbp() {
  let bigQueryExporter = new sro();
  return new o0e.PeriodicExportingMetricReader({
    exporter: bigQueryExporter,
    exportIntervalMillis: 300000
  });
}

// BigQuery metrics are enabled for first-party API customers or enterprise/team Claude AI subscribers
function isBigQueryMetricsEnabled() {
  if (H1e()) return !1;
  let subscriptionType = vi(),
    isEnterpriseOrTeam = Eo() && (subscriptionType === "enterprise" || subscriptionType === "team");
  return WBe() || isEnterpriseOrTeam;
}

// Full telemetry initialization: sets up propagators, meter/logger/tracer providers, and shutdown hooks
async function initializeTelemetry() {
  if (ta("telemetry_init_start"), bootstrapTelemetry(), ste.propagation.setGlobalPropagator(new hDa.W3CTraceContextPropagator()), Ocr()) for (let envVarName of ["OTEL_METRICS_EXPORTER", "OTEL_LOGS_EXPORTER", "OTEL_TRACES_EXPORTER"]) {
    let currentVal = process.env[envVarName];
    if (currentVal?.includes("console")) process.env[envVarName] = currentVal.split(",").map((entry: string) => entry.trim()).filter((entry: string) => entry !== "console").join(",");
  }
  ste.diag.setLogger(new cro(), ste.DiagLogLevel.ERROR), kaa();
  let metricReaders: any[] = [],
    telemetryEnabled = isTelemetryEnabled();
  if (A(`[3P telemetry] isTelemetryEnabled=${telemetryEnabled} (CLAUDE_CODE_ENABLE_TELEMETRY=${process.env.CLAUDE_CODE_ENABLE_TELEMETRY})`), telemetryEnabled) metricReaders.push(...(await wbp()));
  if (isBigQueryMetricsEnabled()) metricReaders.push(Hbp());
  let telemetryResource = EDa();
  if (nv()) {
    if (!Wde()) CDa();
    let meterProvider = new o0e.MeterProvider({
      resource: telemetryResource,
      views: [],
      readers: metricReaders
    });
    return fJt(meterProvider), Si(async () => {
      let shutdownTimeoutMs = oK(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS, 2000);
      try {
        qae();
        let logProvider = hSt(),
          tracerProv = Wde(),
          shutdownPromises = [meterProvider.shutdown()];
        if (logProvider) shutdownPromises.push(logProvider.forceFlush().then(() => logProvider.shutdown()));
        if (tracerProv) shutdownPromises.push(tracerProv.forceFlush().then(() => tracerProv.shutdown()));
        await Promise.race([Promise.all(shutdownPromises), Cao(shutdownTimeoutMs, "OpenTelemetry shutdown timeout")]);
      } catch {}
    }), meterProvider.getMeter("com.anthropic.claude_code", {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION);
  }
  let nonTtyMeterProvider = new o0e.MeterProvider({
    resource: telemetryResource,
    views: [],
    readers: metricReaders
  });
  if (fJt(nonTtyMeterProvider), telemetryEnabled) {
    let logExporters = await getOtlpLogExporters();
    if (A(`[3P telemetry] Created ${logExporters.length} log exporter(s)`), logExporters.length > 0) {
      let loggerProvider = new cUe({
        resource: telemetryResource,
        processors: logExporters.map((logExp: any) => new Ife(logExp, {
          scheduledDelayMillis: oK(process.env.OTEL_LOGS_EXPORT_INTERVAL, TDa)
        }))
      });
      qxt.setGlobalLoggerProvider(loggerProvider), pJt(loggerProvider);
      let eventLogger = qxt.getLogger("com.anthropic.claude_code.events", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION);
      mJt(eventLogger), A("[3P telemetry] Event logger set successfully"), process.on("beforeExit", async () => {
        await loggerProvider?.forceFlush(), await Wde()?.forceFlush();
      }), process.on("exit", () => {
        loggerProvider?.forceFlush(), Wde()?.forceFlush();
      });
    }
  }
  if (telemetryEnabled && KXr()) {
    let traceExporters = await kbp();
    if (traceExporters.length > 0) {
      let spanProcessors = traceExporters.map((traceExp: any) => new c4e(traceExp, {
          scheduledDelayMillis: oK(process.env.OTEL_TRACES_EXPORT_INTERVAL, SDa)
        })),
        tracerProvider = new bUt({
          resource: telemetryResource,
          spanProcessors: spanProcessors
        });
      ste.trace.setGlobalTracerProvider(tracerProvider), hJt(tracerProvider), process.on("beforeExit", async () => {
        await tracerProvider.forceFlush();
      });
    }
  }
  return Si(async () => {
    let shutdownTimeoutMs = oK(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS, 2000);
    try {
      qae();
      let shutdownPromises = [nonTtyMeterProvider.shutdown()],
        logProvider = hSt();
      if (logProvider) shutdownPromises.push(logProvider.shutdown());
      let tracerProv = Wde();
      if (tracerProv) shutdownPromises.push(tracerProv.shutdown());
      await Promise.race([Promise.all(shutdownPromises), Cao(shutdownTimeoutMs, "OpenTelemetry shutdown timeout")]);
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("timeout")) A(`
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
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION);
}

// Flushes all telemetry providers (meters, loggers, tracers), with a timeout guard
async function flushTelemetry() {
  let meterProvider = Oir();
  if (!meterProvider) return;
  let flushTimeoutMs = oK(process.env.CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS, 5000);
  try {
    let flushPromises = [meterProvider.forceFlush()],
      logProvider = hSt();
    if (logProvider) flushPromises.push(logProvider.forceFlush());
    let tracerProv = Wde();
    if (tracerProv) flushPromises.push(tracerProv.forceFlush());
    await Promise.race([Promise.all(flushPromises), Cao(flushTimeoutMs, "OpenTelemetry flush timeout")]), A("Telemetry flushed successfully");
  } catch (err: any) {
    if (err instanceof Aao) A(`Telemetry flush timed out after ${flushTimeoutMs}ms. Some metrics may not be exported.`, {
      level: "warn"
    });else A(`Telemetry flush failed: ${Ce(err)}`, {
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
  let settings = $o(),
    exporterConfig: any = {},
    gatewayAuth = z_();
  if (QLe(gatewayAuth)) {
    let pinnedUrl = gatewayAuth.url;
    return exporterConfig.url = `${pinnedUrl}/v1/${signalType}`, exporterConfig.headers = async () => {
      await $Ae();
      let currentAuth = z_();
      if (!currentAuth || currentAuth.url !== pinnedUrl) return {};
      return {
        Authorization: `Bearer ${currentAuth.jwt}`
      };
    }, exporterConfig.httpAgentOptions = fDa(pinnedUrl), exporterConfig;
  }
  let envHeaders = parseOtelHeadersEnvVar();
  if (settings?.otelHeadersHelper) exporterConfig.headers = async () => {
    let helperHeaders = await DBr();
    return {
      ...envHeaders,
      ...helperHeaders
    };
  };else if (Object.keys(envHeaders).length > 0) exporterConfig.headers = async () => envHeaders;
  return exporterConfig.httpAgentOptions = fDa(process.env[`OTEL_EXPORTER_OTLP_${signalType.toUpperCase()}_ENDPOINT`] ?? process.env.OTEL_EXPORTER_OTLP_ENDPOINT), exporterConfig;
}

// Returns true if the given URL resolves to localhost / loopback (skip proxy for local endpoints)
function Dbp(endpointUrl: string | undefined): boolean {
  if (!endpointUrl) return !1;
  try {
    let hostname = new URL(endpointUrl).hostname.toLowerCase();
    return hostname === "localhost" || hostname === "::1" || hostname === "[::1]" || /^127(\.\d{1,3}){3}$/.test(hostname);
  } catch {
    return !1;
  }
}

// Returns a cached or new HTTP/HTTPS agent factory for OTLP exporters, optionally routing through a proxy
function fDa(endpointUrl: string | undefined): any {
  let proxyUrl = rF(),
    useProxy = !!(proxyUrl && !Dbp(endpointUrl) && !(endpointUrl && i7(endpointUrl))),
    cachedFactory = Nir(useProxy);
  if (cachedFactory) return cachedFactory;
  let tlsOptions = u2(),
    caCert = N5(),
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
        if (!proxyAgent) proxyAgent = new yDa.HttpsProxyAgent(proxyUrl, {
          ...tlsConfig,
          keepAlive: !0,
          maxSockets: 1
        });
        return proxyAgent;
      }
      if (protocol === "http:") {
        if (!httpAgent) httpAgent = new gDa.default.Agent({
          keepAlive: !0,
          maxSockets: 1
        });
        return httpAgent;
      }
      if (!httpsAgent) httpsAgent = new _Da.default.Agent({
        ...tlsConfig,
        keepAlive: !0,
        maxSockets: 1
      });
      return httpsAgent;
    };
  return Fir(useProxy, agentFactory), agentFactory;
}
var ste,
  hDa,
  nY,
  o0e,
  r0e,
  gDa,
  _Da,
  yDa,
  Rbp = 60000,
  TDa = 5000,
  SDa = 5000,
  Aao;
var vao = b(() => {
  y2r();
  R2r();
  pSa();
  IEe();
  lt();
  lo();
  Es();
  mYe();
  ud();
  qe();
  dn();
  Ct();
  H8r();
  xXe();
  zK();
  $d();
  ey();
  br();
  tn();
  z9();
  qHe();
  _Sa();
  $Xr();
  ESa();
  ASa();
  Zst();
  Z4();
  ste = x(xi(), 1), hDa = x(pg(), 1), nY = x(zZe(), 1), o0e = x(TUt(), 1), r0e = x(jQ(), 1), gDa = x(require("http")), _Da = x(require("https")), yDa = x(hvt(), 1);
  Aao = class Aao extends Error {};
});

export {Rao,Cao,bootstrapTelemetry,EDa,CDa,vbp,parseExporterTypes,wbp,getOtlpLogExporters,kbp,isTelemetryEnabled,Hbp,isBigQueryMetricsEnabled,initializeTelemetry,flushTelemetry,parseOtelHeadersEnvVar,getOTLPExporterConfig,Dbp,fDa,ste,hDa,nY,o0e,r0e,gDa,_Da,yDa,Rbp,TDa,SDa,Aao,vao};
