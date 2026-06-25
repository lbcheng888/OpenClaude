// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {K9,tQt,RX,nQt} from "../../vendor/m241.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {eEe,tn} from "../config/0230_encoding.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {getSessionId as It,lt} from "./0132_sent.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {nt} from "../../vendor/m127.ts";
// @ts-nocheck
// Startup profiling subsystem.
//
// Records performance.mark() checkpoints during CLI startup, then on shutdown:
//   - emits a `tengu_startup_perf` telemetry event with per-phase timings, and
//   - (when detailed profiling is enabled) writes a human-readable .txt report
//     plus a machine-readable .json dump under the `startup-perf` data directory.
//
// Two activation paths:
//   - detailed profiling: opt-in via CLAUDE_CODE_PROFILE_STARTUP (writes files).
//   - telemetry sampling: a small random fraction of runs emit timing telemetry.
//
// NOTE: all short/mangled identifiers below that are NOT renamed
// (ft, K9, Wt, eEe, A, W, or, It, x, b, Jbt/zcr and the *() module
// initializers) are cross-module bundle references and are preserved exactly.
//
// --- Cross-module bundle references (defined elsewhere; preserved verbatim) ---
// ft(target, defs):        registers lazy-getter exports onto `target`.
// K9():  returns the performance API surface (mark/getEntriesByType).
// RX(v): rounds a millisecond value for display.
// tQt(): formats one profiling report row (startTime, delta, name, memUsage, ...).
// W(event, payload):       telemetry event logger.
// A(message):              startup/console output.
// Wt():                    filesystem accessor (mkdirSync, ...).
// or():                    base data directory path.
// It():                    current session identifier.
// nt(envValue):            parse an env var into a boolean.
// eEe(path, data, opts):   write a file.
// Jbt / pathModule:        Node "path" module.
// zcr / osModule:          Node "os" module (default export).
// x, b:                    bundle helpers (require wrap / lazy init).

/** A pair of marker names [startMarker, endMarker] delimiting a startup phase. */
type PhaseMarkerPair = [startMarker: string, endMarker: string];

/** Per-phase metadata emitted to telemetry / written to the JSON report. */
interface StartupPerfMetadata {
  late: boolean;
  total_time_ms?: number;
  gap_unaccounted_ms?: number;
  free_mem_mb: number;
  load_avg_1m: number;
  checkpoint_count: number;
  ccr_session_id?: string;
  node_boot_ms?: number;
  spawn_to_first_checkpoint_ms?: number;
  // Per-phase durations recorded as `${phase}_ms`, plus any extra startup context.
  [key: string]: unknown;
}

var profileReportExports = {};
ft(profileReportExports, {
  profileReport: () => profileReport,
  profileCheckpoint: () => profileCheckpoint,
  logStartupPerf: () => logStartupPerf,
  isDetailedProfilingEnabled: () => isDetailedProfilingEnabled,
  getStartupPerfLogPath: () => getStartupPerfLogPath,
  getStartupPerfJsonPath: () => getStartupPerfJsonPath,
  addStartupContext: () => addStartupContext
});

/**
 * Merge additional key/value context into the metadata emitted with the
 * startup-perf report. No-op unless profiling is active.
 */
function addStartupContext(context: Record<string, unknown>): void {
  if (!profilingActive) return;
  Object.assign(extraStartupContext, context);
}

/**
 * Record a startup checkpoint via performance.mark(). When `once` is set the
 * checkpoint is recorded at most once per process. Returns true if the mark
 * was recorded, false if profiling is inactive or the once-key was a duplicate.
 */
function profileCheckpoint(name: string, {
  once: once = !1
}: { once?: boolean } = {}): boolean {
  if (!profilingActive) return !1;
  if (once) {
    if (onceCheckpointKeys.has(name)) return !1;
    onceCheckpointKeys.add(name);
  }
  if (K9().mark(name), detailedProfilingEnabled) memorySnapshots.push(process.memoryUsage());
  return !0;
}

/**
 * Build the human-readable startup profiling report from the recorded marks
 * and memory snapshots. Returns an explanatory string when profiling is off
 * or no checkpoints exist.
 */
function buildStartupProfilingReport(): string {
  if (!detailedProfilingEnabled) return "Startup profiling not enabled";
  let marks = K9().getEntriesByType("mark");
  if (marks.length === 0) return "No profiling checkpoints recorded";
  let lines: string[] = [];
  lines.push("=".repeat(80)), lines.push("STARTUP PROFILING REPORT"), lines.push("=".repeat(80)), lines.push("");
  let previousStartTime = 0;
  for (let [index, mark] of marks.entries()) lines.push(tQt(mark.startTime, mark.startTime - previousStartTime, mark.name, memorySnapshots[index], 8, 7)), previousStartTime = mark.startTime;
  let lastMark = marks.at(-1);
  return lines.push(""), lines.push(`Total startup time: ${RX(lastMark?.startTime ?? 0)}ms`), lines.push("=".repeat(80)), lines.join(`
`);
}

/**
 * Finalize startup profiling. The first invocation emits the (non-late) report;
 * a later second invocation emits a one-time "late" report capturing phases
 * that completed after the initial report.
 */
function profileReport(): void {
  if (reportWritten) {
    if (!lateReportWritten) lateReportWritten = !0, logStartupPerf({
      late: !0
    }), writeStartupProfilingFiles();
    return;
  }
  reportWritten = !0, logStartupPerf({
    late: !1
  }), writeStartupProfilingFiles();
}

/**
 * Write the .txt and .json startup-perf reports to disk. No-op unless detailed
 * profiling is enabled.
 */
function writeStartupProfilingFiles(): void {
  if (!detailedProfilingEnabled) return;
  let logPath = getStartupPerfLogPath(),
    logDir = Jbt.dirname(logPath);
  Wt().mkdirSync(logDir), eEe(logPath, buildStartupProfilingReport(), {
    encoding: "utf8",
    flush: !0
  });
  let marks = K9().getEntriesByType("mark");
  eEe(getStartupPerfJsonPath(), JSON.stringify({
    metadata: buildStartupPerfMetadata({
      late: !1
    }) ?? {},
    marks: marks.map(mark => ({
      name: mark.name,
      startTime: mark.startTime
    })),
    memory: memorySnapshots,
    nodeBootMs: nodeBootMs
  }, null, 2), {
    encoding: "utf8",
    flush: !0
  }), A("Startup profiling report:"), A(buildStartupProfilingReport());
}

/** True when detailed (file-writing) startup profiling is enabled. */
function isDetailedProfilingEnabled(): boolean {
  return detailedProfilingEnabled;
}

/** Absolute path of the human-readable startup-perf report for this session. */
function getStartupPerfLogPath(): string {
  return Jbt.join(or(), "startup-perf", `${It()}.txt`);
}

/** Absolute path of the JSON startup-perf dump for this session. */
function getStartupPerfJsonPath(): string {
  return Jbt.join(or(), "startup-perf", `${It()}.json`);
}

/**
 * Compute per-phase timings and environment metadata from the recorded marks.
 *
 * In `late` mode only phases not already accounted for in the initial report
 * are included (and none are re-marked as recorded); returns null if there are
 * no marks, or no new phases in late mode.
 */
function buildStartupPerfMetadata({
  late: late
}: { late: boolean }): StartupPerfMetadata | null {
  let marks = K9().getEntriesByType("mark");
  if (marks.length === 0) return null;
  let startTimeByName = new Map<string, number>();
  for (let mark of marks) startTimeByName.set(mark.name, mark.startTime);
  let mainAfterRunTime = startTimeByName.get("main_after_run"),
    metadata = {} as StartupPerfMetadata,
    recordedPhaseCount = 0,
    accountedTotalMs = 0;
  for (let [phase, [startMarker, endMarker]] of Object.entries(phaseMarkerPairs)) {
    if (late && recordedPhases.has(phase)) continue;
    let phaseStart = startTimeByName.get(startMarker),
      phaseEnd = startTimeByName.get(endMarker);
    if (phaseStart !== void 0 && phaseEnd !== void 0) {
      let durationMs = Math.round(phaseEnd - phaseStart);
      if (metadata[`${phase}_ms`] = durationMs, recordedPhaseCount++, !late) recordedPhases.add(phase);
      if (!excludedFromAccountedTotal.has(phase) && (mainAfterRunTime === void 0 || phaseEnd <= mainAfterRunTime)) accountedTotalMs += durationMs;
    }
  }
  if (late) {
    if (recordedPhaseCount === 0) return null;
    metadata.late = !0;
  } else metadata.late = !1;
  let totalTimeMs = metadata.total_time_ms;
  if (typeof totalTimeMs === "number") metadata.gap_unaccounted_ms = Math.max(0, totalTimeMs - accountedTotalMs);
  metadata.free_mem_mb = Math.round(zcr.default.freemem() / 1048576), metadata.load_avg_1m = Math.round((zcr.default.loadavg()[0] ?? 0) * 100) / 100, metadata.checkpoint_count = marks.length;
  let remoteSessionId = process.env.CLAUDE_CODE_REMOTE_SESSION_ID;
  if (remoteSessionId) metadata.ccr_session_id = remoteSessionId;
  if (nodeBootMs !== void 0) metadata.node_boot_ms = nodeBootMs;
  let spawnTimestampMs = Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS ?? process.env.CLAUDE_CODE_SPAWN_TIMESTAMP_MS ?? "", 10);
  if (Number.isFinite(spawnTimestampMs) && firstCheckpointTimestamp !== void 0) metadata.spawn_to_first_checkpoint_ms = Math.round(firstCheckpointTimestamp - spawnTimestampMs);
  return Object.assign(metadata, extraStartupContext), metadata;
}

/**
 * Emit the `tengu_startup_perf` telemetry event with computed startup metadata.
 * No-op unless this run was sampled for telemetry, or if there is no metadata.
 */
function logStartupPerf({
  late: late
}: { late: boolean } = {
  late: !1
}): void {
  if (!sampledForTelemetry) return;
  let metadata = buildStartupPerfMetadata({
    late: late
  });
  if (metadata === null) return;
  W("tengu_startup_perf", metadata);
}

var zcr: typeof import("os") & { default: typeof import("os") },
  Jbt: typeof import("path"),
  detailedProfilingEnabled: boolean,
  samplingRate = 0.005,
  sampledForTelemetry: boolean,
  profilingActive: boolean,
  memorySnapshots: NodeJS.MemoryUsage[],
  phaseMarkerPairs: Record<string, PhaseMarkerPair>,
  excludedFromAccountedTotal: Set<string>,
  firstCheckpointTimestamp: number | undefined,
  nodeBootMs: number | undefined,
  extraStartupContext: Record<string, unknown>,
  onceCheckpointKeys: Set<string>,
  reportWritten = !1,
  lateReportWritten = !1,
  recordedPhases: Set<string>;

var initProfileReportModule = b(() => {
  lt();
  kt();
  qe();
  dn();
  ps();
  nQt();
  tn();
  zcr = x(require("os")), Jbt = require("path"), detailedProfilingEnabled = nt(process.env.CLAUDE_CODE_PROFILE_STARTUP), sampledForTelemetry = Math.random() < samplingRate, profilingActive = detailedProfilingEnabled || sampledForTelemetry, memorySnapshots = [], phaseMarkerPairs = {
    import_time: ["cli_entry", "main_tsx_imports_loaded"],
    main_imports: ["cli_before_main_import", "main_tsx_entry"],
    mdm_keychain_await: ["preAction_start", "preAction_after_mdm"],
    init_time: ["init_function_start", "init_function_end"],
    init_safe_env: ["init_configs_enabled", "init_safe_env_vars_applied"],
    init_network: ["init_after_remote_settings_check", "init_network_configured"],
    init_tail: ["init_network_configured", "init_function_end"],
    settings_time: ["eagerLoadSettings_start", "eagerLoadSettings_end"],
    tools_loaded: ["init_function_end", "action_tools_loaded"],
    preaction_tail: ["init_function_end", "action_handler_start"],
    action_prologue: ["action_handler_start", "action_after_input_prompt"],
    action_setup_span: ["action_after_input_prompt", "action_after_setup"],
    mcp_configs: ["action_tools_loaded", "action_mcp_configs_loaded"],
    plugins_init: ["action_mcp_configs_loaded", "action_after_plugins_init"],
    headless_setup: ["action_after_plugins_init", "before_validateForceLoginOrg"],
    force_login_org: ["before_validateForceLoginOrg", "before_connectMcp"],
    mcp_connect: ["before_connectMcp", "after_connectMcp_claudeai"],
    mcp_connect_user: ["before_mcp_connect_user", "after_mcp_connect_user"],
    mcp_connect_connector: ["before_mcp_connect_connector", "after_mcp_connect_connector"],
    growthbook_init: ["before_growthbook_init", "after_growthbook_init"],
    prewait: ["after_connectMcp_claudeai", "after_print_import"],
    sandbox_init: ["before_sandbox_init", "after_sandbox_init"],
    load_initial_messages: ["before_loadInitialMessages", "after_loadInitialMessages"],
    process_user_input: ["before_processUserInput", "after_processUserInput"],
    total_time: ["cli_entry", "main_after_run"]
  }, excludedFromAccountedTotal = new Set(["total_time", "main_imports", "mdm_keychain_await", "init_safe_env", "init_network", "init_tail", "mcp_connect_user", "mcp_connect_connector", "growthbook_init", "preaction_tail", "action_prologue", "action_setup_span"]);
  if (profilingActive) profileCheckpoint("profiler_initialized");
  firstCheckpointTimestamp = profilingActive ? Date.now() : void 0, nodeBootMs = profilingActive ? Math.round(process.uptime() * 1000) : void 0, extraStartupContext = {};
  onceCheckpointKeys = new Set();
  recordedPhases = new Set();
});

export {profileReportExports as NWo,addStartupContext,profileCheckpoint,buildStartupProfilingReport as wWo,profileReport,writeStartupProfilingFiles as xWo,isDetailedProfilingEnabled,getStartupPerfLogPath,getStartupPerfJsonPath,buildStartupPerfMetadata as MWo,logStartupPerf,zcr,Jbt,detailedProfilingEnabled as Xbt,samplingRate as mHc,sampledForTelemetry as DWo,profilingActive as Qbt,memorySnapshots as Jcr,phaseMarkerPairs as fHc,excludedFromAccountedTotal as hHc,firstCheckpointTimestamp as RWo,nodeBootMs as jcr,extraStartupContext as PWo,onceCheckpointKeys as vWo,reportWritten as kWo,lateReportWritten as HWo,recordedPhases as IWo,initProfileReportModule as z9};
