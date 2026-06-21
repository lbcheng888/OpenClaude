// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {getSessionId,lt} from "./0131_sent.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {rQo,mc} from "../config/0645_maxBytes.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {_o,qp,bt} from "../../vendor/m195.ts";
import {De,Rn} from "./0615_length.ts";
var cxl = {};
isFullscreenWithTTY(cxl, {
  performHeapDump: () => performHeapDump,
  captureMemoryDiagnostics: () => captureMemoryDiagnostics
});

// Collects comprehensive memory diagnostics without writing a heap snapshot file
async function captureMemoryDiagnostics(trigger: any, dumpNumber: any = 0) {
  let memUsage = process.memoryUsage(),
    v8HeapStats = HVn.getHeapStatistics(),
    resourceUsage = process.resourceUsage(),
    uptimeSeconds = process.uptime(),
    heapSpaces: any;
  try {
    heapSpaces = HVn.getHeapSpaceStatistics();
  } catch {}
  let activeHandles = process._getActiveHandles().length,
    activeRequests = process._getActiveRequests().length,
    openFdCount: any;
  try {
    openFdCount = (await _ft.readdir("/proc/self/fd")).length;
  } catch {}
  let smapsRollup: any;
  try {
    smapsRollup = await _ft.readFile("/proc/self/smaps_rollup", "utf8");
  } catch {}
  // Bun-specific JSC heap stats: object type counts and mimalloc allocator stats
  let objectTypeCounts: any, protectedObjectTypeCounts: any, mimallocStats: any;
  try {
    let {
        heapStats: getHeapStats
      } = await import("bun:jsc"),
      jscStats = getHeapStats(!0);
    objectTypeCounts = jscStats.objectTypeCounts, protectedObjectTypeCounts = jscStats.protectedObjectTypeCounts, mimallocStats = jscStats.mimalloc || void 0;
  } catch {}
  // Derived growth metrics
  let nativeMemory = memUsage.rss - memUsage.heapUsed,
    bytesPerSecond = uptimeSeconds > 0 ? memUsage.rss / uptimeSeconds : 0,
    mbPerHour = bytesPerSecond * 3600 / 1048576,
    potentialLeaks: string[] = [];
  // Heuristic checks for common memory leak patterns
  if (v8HeapStats.number_of_detached_contexts > 0) potentialLeaks.push(`${v8HeapStats.number_of_detached_contexts} detached context(s) - possible iframe/context leak`);
  if (activeHandles > 100) potentialLeaks.push(`${activeHandles} active handles - possible timer/socket leak`);
  if (nativeMemory > memUsage.heapUsed) potentialLeaks.push("Native memory > heap - leak may be in native addons (node-pty, sharp, etc.)");
  if (mbPerHour > 100) potentialLeaks.push(`High memory growth rate: ${mbPerHour.toFixed(1)} MB/hour`);
  if (openFdCount && openFdCount > 500) potentialLeaks.push(`${openFdCount} open file descriptors - possible file/socket leak`);
  return {
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    trigger: trigger,
    dumpNumber: dumpNumber,
    uptimeSeconds: uptimeSeconds,
    memoryUsage: {
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      arrayBuffers: memUsage.arrayBuffers,
      rss: memUsage.rss
    },
    memoryGrowthRate: {
      bytesPerSecond: bytesPerSecond,
      mbPerHour: mbPerHour
    },
    v8HeapStats: {
      heapSizeLimit: v8HeapStats.heap_size_limit,
      mallocedMemory: v8HeapStats.malloced_memory,
      peakMallocedMemory: v8HeapStats.peak_malloced_memory,
      detachedContexts: v8HeapStats.number_of_detached_contexts,
      nativeContexts: v8HeapStats.number_of_native_contexts
    },
    v8HeapSpaces: heapSpaces?.map((spaceInfo: any) => ({
      name: spaceInfo.space_name,
      size: spaceInfo.space_size,
      used: spaceInfo.space_used_size,
      available: spaceInfo.space_available_size
    })),
    resourceUsage: {
      maxRSS: resourceUsage.maxRSS * (zt() === "macos" ? 1 : 1024),
      userCPUTime: resourceUsage.userCPUTime,
      systemCPUTime: resourceUsage.systemCPUTime
    },
    activeHandles: activeHandles,
    activeRequests: activeRequests,
    openFileDescriptors: openFdCount,
    analysis: {
      potentialLeaks: potentialLeaks,
      recommendation: potentialLeaks.length > 0 ? `WARNING: ${potentialLeaks.length} potential leak indicator(s) found. See potentialLeaks array.` : "No obvious leak indicators. Check heap snapshot for retained objects."
    },
    smapsRollup: smapsRollup,
    objectTypeCounts: objectTypeCounts,
    protectedObjectTypeCounts: protectedObjectTypeCounts,
    mimalloc: mimallocStats,
    platform: "darwin",
    nodeVersion: process.version,
    ccVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION
  };
}

// Writes a V8 heap snapshot + diagnostics JSON to the configured dump directory
async function performHeapDump(trigger: any = "manual", dumpNumber: any = 0) {
  try {
    let sessionId = getSessionId(),
      diagnostics = await captureMemoryDiagnostics(trigger, dumpNumber),
      // Convert bytes to GB string for log readability
      toGB = (bytes: number) => (bytes / 1024 / 1024 / 1024).toFixed(3);
    logForDebugging(`[HeapDump] Memory state:
  heapUsed: ${toGB(diagnostics.memoryUsage.heapUsed)} GB (in snapshot)
  external: ${toGB(diagnostics.memoryUsage.external)} GB (NOT in snapshot)
  rss: ${toGB(diagnostics.memoryUsage.rss)} GB (total process)
  ${diagnostics.analysis.recommendation}`);
    let dumpDir = rQo();
    await jt().mkdir(dumpDir);
    // Suffix allows multiple numbered dumps in one session (e.g. -dump1, -dump2)
    let dumpSuffix = dumpNumber > 0 ? `-dump${dumpNumber}` : "",
      snapshotFilename = `${sessionId}${dumpSuffix}.heapsnapshot`,
      diagnosticsFilename = `${sessionId}${dumpSuffix}-diagnostics.json`,
      snapshotPath = gwo.join(dumpDir, snapshotFilename),
      diagnosticsPath = gwo.join(dumpDir, diagnosticsFilename);
    return await _ft.writeFile(diagnosticsPath, Le(diagnostics, null, 2), {
      mode: 384
    }), logForDebugging(`[HeapDump] Diagnostics written to ${diagnosticsPath}`), await Elm(snapshotPath), logForDebugging(`[HeapDump] Heap dump written to ${snapshotPath}`), logEvent("tengu_heap_dump", {
      triggerManual: trigger === "manual",
      triggerAuto15GB: trigger === "auto-1.5GB",
      dumpNumber: dumpNumber,
      success: !0
    }), {
      success: !0,
      heapPath: snapshotPath,
      diagPath: diagnosticsPath,
      diagnostics: diagnostics
    };
  } catch (err: any) {
    let error = _o(err);
    if (qp(error)) logForDebugging(`[HeapDump] Failed to write dump: ${error.message}`, {
      level: "error"
    });else De(error);
    return logEvent("tengu_heap_dump", {
      triggerManual: trigger === "manual",
      triggerAuto15GB: trigger === "auto-1.5GB",
      dumpNumber: dumpNumber,
      success: !1
    }), {
      success: !1,
      error: error.message
    };
  }
}

// Synchronously writes the Bun V8-format heap snapshot then forces a full GC cycle
async function Elm(snapshotPath: any) {
  axl.writeFileSync(snapshotPath, Bun.generateHeapSnapshot("v8", "arraybuffer"), {
    mode: 384
  }), Bun.gc(!0);
}
var axl: any, _ft: any, gwo: any, HVn: any;
var ywo = b(() => {
  lt();
  Ct();
  qe();
  bt();
  mc();
  ws();
  Rn();
  qs();
  Xt();
  axl = require("fs"), _ft = require("fs/promises"), gwo = require("path"), HVn = require("v8");
});
export {cxl,captureMemoryDiagnostics,performHeapDump,Elm,axl,_ft,gwo,HVn,ywo};
