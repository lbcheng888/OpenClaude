// @ts-nocheck
import {r7e as jdH,xH as kh} from "../config/0580_xH.ts";
import {dp as MO,sn as A6} from "../config/0047_namespace.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Gi as m7,ReactHooks as U3} from "../../vendor/m133.ts";
import {b as L} from "../../runtime.ts";
// Agent subsystem — query-source categorization & process/memory bookkeeping.
//
// This module provides two related concerns:
//   1. Classifying/normalizing the `querySource` string that tags every model
//      request (e.g. "repl_main_thread", "sdk", "agent:custom:foo") into a
//      coarse category (main / subagent / auxiliary) and extracting attribution
//      prefixes from it.
//   2. Tracking child processes (mcp stdio servers, shells, lsp, ...) and the
//      process's own peak memory, then emitting a one-shot SDK memory-summary
//      telemetry event at shutdown.
//
// Behavior is preserved 1:1 with the obfuscated original; only names, types,
// and comments have been added.

/** Coarse category a `querySource` string maps to. */
type QuerySourceCategory = "main" | "subagent" | "auxiliary";

/** Kind label attached to a tracked child process. */
type ChildProcessKind = "bash_shell" | "mcp_stdio" | "lsp" | "other" | string;

/** Per-child bookkeeping record stored in {@link childProcessTracker}. */
interface ChildProcessRecord {
  /** What sort of child this is (used to bucket peak RSS in telemetry). */
  kind: ChildProcessKind;
  /** Highest RSS (bytes) observed for this child so far. */
  peakRssBytes: number;
  /** Set once the child is gone; dead records stop being sampled. */
  dead: boolean;
}

/** A memory-attribution provider: reports entry count and optional byte size. */
type MemoryAttributionProvider = () => { entries: number; bytes?: number };

/** The shape emitted in the `tengu_sdk_memory_summary` telemetry event. */
type MemorySummary = Record<string, number | undefined>;

/** Baseline/peak process memory snapshot captured at startup. */
interface ProcessMemorySnapshot {
  rss: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
}

/**
 * Classify a `querySource` string into a coarse category.
 *
 * - `undefined` → undefined (no source).
 * - "repl_main_thread*" or "sdk" → "main".
 * - "agent:*", "hook_agent", "verification_agent" → "subagent".
 * - anything else → "auxiliary".
 */
function categorizeQuerySource(querySource: string | undefined): QuerySourceCategory | undefined {
  if (querySource === void 0) return;
  if (querySource.startsWith("repl_main_thread") || querySource === "sdk") return "main";
  if (querySource.startsWith("agent:") || querySource === "hook_agent" || querySource === "verification_agent") return "subagent";
  return "auxiliary";
}

/** True when the query source is absent or categorizes as the main thread. */
function isMainQuerySource(querySource: string | undefined): boolean {
  return querySource === void 0 || categorizeQuerySource(querySource) === "main";
}

/**
 * Return the segment of a colon-delimited identifier before the first ":",
 * or undefined when there is no colon prefix (used to pull e.g. the plugin
 * name out of "plugin:skill").
 */
function extractColonPrefix(value: string): string | undefined {
  let colonIndex = value.indexOf(":");
  return colonIndex > 0 ? value.slice(0, colonIndex) : void 0;
}

/**
 * Normalize a `querySource` for telemetry: collapse any "agent:custom:<name>"
 * down to the generic "agent:custom", otherwise pass the source through.
 */
function normalizeQuerySource(querySource: string | undefined): string | undefined {
  if (querySource?.startsWith("agent:custom:")) return "agent:custom";
  return querySource;
}

/**
 * Register a named memory-attribution provider. At memory-summary time each
 * provider is invoked to report its entry count / byte size into the summary.
 */
function registerMemoryAttribution(name: string, provider: MemoryAttributionProvider): void {
  memoryAttributionProviders.set(name, provider);
}

/**
 * Begin tracking a child process by pid so its peak RSS can be folded into the
 * SDK memory summary. No-op unless running under the SDK entrypoint, and never
 * in simple/bare mode. Re-registering a still-live pid is ignored.
 */
function trackChildProcess(kind: ChildProcessKind, pid: number): void {
  // `jdH` = isSdkEntrypoint (cross-module), `MO` = isSimpleOrBareMode (cross-module).
  if (!jdH() || MO()) return;
  if (!Number.isFinite(pid) || pid <= 0) return;
  let existing = childProcessTracker.get(pid);
  if (existing && !existing.dead) return;
  childProcessCount++, childProcessTracker.set(pid, {
    kind: kind,
    peakRssBytes: readChildProcessRssBytes(pid) ?? 0,
    dead: !1
  });
}

/** Mark a tracked child process (by pid) as dead so it stops being sampled. */
function markChildProcessDead(pid: number): void {
  let record = childProcessTracker.get(pid);
  if (record) record.dead = !0;
}

/**
 * Sample all live tracked children: update each record's peak RSS, and mark a
 * record dead once its RSS can no longer be read (process gone).
 */
function refreshChildProcessPeakRss(): void {
  if (childProcessTracker.size === 0) return;
  for (let [pid, record] of childProcessTracker) {
    if (record.dead) continue;
    let rssBytes = readChildProcessRssBytes(pid);
    if (rssBytes === void 0) record.dead = !0;else if (rssBytes > record.peakRssBytes) record.peakRssBytes = rssBytes;
  }
}

/**
 * Read a child process's current RSS in bytes by pid.
 *
 * NOTE: this is intentionally a stub that always returns undefined in the
 * shipped build (per-child RSS sampling is disabled); the empty `return;`
 * is preserved verbatim from the original.
 */
function readChildProcessRssBytes(pid: number): number | undefined {
  return;
}

/**
 * Return the system page size in bytes, cached after first read. Derives it
 * from /proc/self/statm (rss pages vs. process RSS), falling back to 4096.
 */
function getPageSizeBytes(): number {
  if (cachedPageSizeBytes !== void 0) return cachedPageSizeBytes;
  try {
    let statm = fs.readFileSync("/proc/self/statm", "utf8"),
      rssPages = Number(statm.split(" ")[1]);
    cachedPageSizeBytes = rssPages > 0 ? Math.round(process.memoryUsage().rss / rssPages) : 4096;
  } catch {
    cachedPageSizeBytes = 4096;
  }
  return cachedPageSizeBytes;
}

/**
 * Build the `tengu_sdk_memory_summary` payload from a startup baseline snapshot:
 * final + peak process memory, per-provider attribution counts/bytes, and
 * per-kind child-process RSS totals.
 */
function buildMemorySummary(baseline: ProcessMemorySnapshot): MemorySummary {
  let current = process.memoryUsage(),
    summary: MemorySummary = {
      uptime_s: Math.round(process.uptime()),
      final_rss_bytes: current.rss,
      final_heap_used_bytes: current.heapUsed,
      final_external_bytes: current.external,
      final_array_buffers_bytes: current.arrayBuffers,
      peak_rss_bytes: Math.max(baseline.rss, current.rss),
      peak_heap_used_bytes: Math.max(baseline.heapUsed, current.heapUsed),
      peak_external_bytes: Math.max(baseline.external, current.external),
      constrained_memory_bytes: process.constrainedMemory?.() || void 0
    };
  for (let [name, provider] of memoryAttributionProviders) try {
    let stats = provider();
    if (summary[`attr_${name}_entries`] = stats.entries, stats.bytes !== void 0) summary[`attr_${name}_bytes`] = stats.bytes;
  } catch {}
  refreshChildProcessPeakRss();
  let totalChildRssBytes = 0,
    rssBytesByKind: Record<string, number> = {};
  for (let record of childProcessTracker.values()) totalChildRssBytes += record.peakRssBytes, rssBytesByKind[record.kind] = (rssBytesByKind[record.kind] ?? 0) + record.peakRssBytes;
  summary.child_count = childProcessCount, summary.child_rss_bytes_total = totalChildRssBytes;
  for (let kind of childKindTelemetryOrder) if (rssBytesByKind[kind] !== void 0) summary[`child_${kind}_rss_bytes`] = rssBytesByKind[kind];
  return summary;
}

/**
 * Emit the memory summary telemetry exactly once. `getBaseline` supplies the
 * startup snapshot; subsequent invocations are ignored.
 */
function reportMemorySummaryOnce(getBaseline: () => ProcessMemorySnapshot): void {
  if (memorySummaryReported) return;
  memorySummaryReported = !0;
  try {
    // `c` is the cross-module telemetry/analytics event logger (external import).
    c("tengu_sdk_memory_summary", buildMemorySummary(getBaseline()));
  } catch {}
}

/**
 * Install the shutdown hook that reports the SDK memory summary, once per
 * process. `getBaseline` returns the startup peak-memory baseline snapshot.
 */
function installMemorySummaryReporter(getBaseline: () => ProcessMemorySnapshot): void {
  if (memoryReporterInstalled) return;
  // `m7` is the cross-module "register shutdown cleanup handler" helper (external
  // import); it returns a handle and runs its callback at process shutdown.
  memoryReporterInstalled = !0, memorySummaryCleanupHandle = m7(() => reportMemorySummaryOnce(getBaseline));
}

var fs: typeof import("fs"),
  /** name → memory-attribution provider registry. */
  memoryAttributionProviders: Map<string, MemoryAttributionProvider>,
  /** Child kinds emitted (in order) as `child_<kind>_rss_bytes` summary fields. */
  childKindTelemetryOrder: ChildProcessKind[],
  /** pid → tracked child-process record. */
  childProcessTracker: Map<number, ChildProcessRecord>,
  /** Count of children ever tracked this session. */
  childProcessCount = 0,
  /** Cached system page size in bytes (see {@link getPageSizeBytes}). */
  cachedPageSizeBytes: number | undefined,
  /** Whether the shutdown reporter has been installed. */
  memoryReporterInstalled = !1,
  /** Whether the memory summary has already been emitted. */
  memorySummaryReported = !1,
  /** Handle returned by the cleanup-handler registration, if installed. */
  memorySummaryCleanupHandle: unknown;

// Lazy module initializer (esbuild `__esm` wrapper). Runs the dependency init
// thunks, then sets up module-level state. Init-thunk names are kept as their
// original bundler symbols to preserve cross-module references exactly.
var init_kind = L(() => {
  y_(); // FIXME: unverified name (dependency init thunk)
  U3(); // FIXME: unverified name (dependency init thunk)
  kh(); // init thunk for the entrypoint module (defines isSdkEntrypoint)
  A6(); // init thunk for the namespace module (defines isSimpleOrBareMode)
  fs = require("fs"), memoryAttributionProviders = new Map();
  childKindTelemetryOrder = ["bash_shell", "mcp_stdio", "lsp", "other"], childProcessTracker = new Map();
});

export {categorizeQuerySource as H1,isMainQuerySource as fFe,extractColonPrefix as iNr,normalizeQuerySource as Fg,registerMemoryAttribution as lNr,trackChildProcess as E_n,markChildProcessDead as Qmi,refreshChildProcessPeakRss as cNr,readChildProcessRssBytes as Zmi,getPageSizeBytes as AJu,buildMemorySummary as hJu,reportMemorySummaryOnce as _Ju,installMemorySummaryReporter as efi,fs as aNr,memoryAttributionProviders as Jmi,childKindTelemetryOrder as fJu,childProcessTracker as XXe,childProcessCount as Xmi,cachedPageSizeBytes as _Ht,memoryReporterInstalled as zmi,memorySummaryReported as Ymi,memorySummaryCleanupHandle as gJu,init_kind as QXe};
