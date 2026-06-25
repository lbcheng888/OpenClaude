// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {du as I5,iw as r0} from "../../vendor/m2302.ts";
/**
 * Semantic restoration for telemetry/5643_startEventLoopStallDetector.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
var eventLoopStallExports = {};
j_(eventLoopStallExports, {
  startEventLoopStallDetector: () => startEventLoopStallDetector,
  sampleRss: () => sampleRss
});
/** Samples RSS, heap, and external memory in megabytes. */
function sampleRss(): any {
  try {
    let H = process.memoryUsage();
    return {
      rss_mb: Math.round(H.rss / 1024 / 1024),
      heap_used_mb: Math.round(H.heapUsed / 1024 / 1024),
      ext_mb: Math.round(H.external / 1024 / 1024)
    };
  } catch (H) {
    return N(`[event-loop-stall] process.memoryUsage() failed: ${H instanceof Error ? H.message : String(H)}`, {
      level: "error"
    }), null;
  }
}
/** Starts a singleton event-loop stall detector. */
function startEventLoopStallDetector(): any {
  if (stallIntervalHandle !== null) return;
  lastStallSampleAt = Date.now(), N(`[event-loop-stall] detector started (interval=${STALL_INTERVAL_MS}ms, threshold=${STALL_THRESHOLD_MS}ms)`), stallIntervalHandle = setInterval(() => {
    let H = Date.now(),
      _ = H - lastStallSampleAt,
      q = _ - STALL_INTERVAL_MS;
    if (stallSampleCount++, q > STALL_THRESHOLD_MS) {
      totalStallCount++, cumulativeStallMs += q;
      let K = q > SLEEP_WAKE_THRESHOLD_MS,
        O = sampleRss();
      if (N(`[event-loop-stall] blocked for ${q}ms (expected ${STALL_INTERVAL_MS}ms, actual ${_}ms). Total stalls: ${totalStallCount}, cumulative: ${cumulativeStallMs}ms${K ? " [likely sleep/wake]" : ""}` + (O ? ` rss=${O.rss_mb}MB heap=${O.heap_used_mb}MB ext=${O.ext_mb}MB` : ""), {
        level: "warn"
      }), c("tengu_event_loop_stall", {
        stall_duration_ms: q,
        expected_interval_ms: STALL_INTERVAL_MS,
        actual_interval_ms: _,
        total_stalls: totalStallCount,
        cumulative_stall_ms: cumulativeStallMs,
        likely_sleep: K,
        ...O
      }), K) I5.get(process.stdout)?.reassertTerminalModes();
    }
    lastStallSampleAt = H;
  }, STALL_INTERVAL_MS), stallIntervalHandle.unref();
}
var STALL_INTERVAL_MS = 200,
  STALL_THRESHOLD_MS = 500,
  SLEEP_WAKE_THRESHOLD_MS = 5000,
  stallIntervalHandle = null,
  lastStallSampleAt = 0,
  totalStallCount = 0,
  cumulativeStallMs = 0,
  stallSampleCount = 0;
var Vs4 = L(() => {
  r0();
  y_();
  FH();
});
export {eventLoopStallExports as uhc,sampleRss,startEventLoopStallDetector,STALL_INTERVAL_MS as Zzt,STALL_THRESHOLD_MS as lhc,SLEEP_WAKE_THRESHOLD_MS as d7m,stallIntervalHandle as g$o,lastStallSampleAt as _$o,totalStallCount as y$o,cumulativeStallMs as T$o,stallSampleCount as p7m,Vs4 as dhc};
