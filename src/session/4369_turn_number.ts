// @ts-nocheck
import {R3 as d3,EYt as Ozt} from "../../vendor/m239.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "./0131_sent.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {st as rt} from "../../vendor/m5.ts";
// @ts-nocheck
function gFp() {
  let e = d3(),
    t = e.getEntriesByType("mark");
  for (let n of t) if (n.name.startsWith(Y3t)) e.clearMarks(n.name);
}
function Ffo() {
  if (!kr()) return;
  if (!profilingActive_2) return;
  if (Cdt++, gFp(), d3().mark(`${Y3t}turn_start`), profilingEnabledLogging) v(`[headlessProfiler] Started turn ${Cdt}`);
}
function rR(e) {
  if (!kr()) return;
  if (!profilingActive_2) return;
  let t = d3();
  if (t.mark(`${Y3t}${e}`), profilingEnabledLogging) v(`[headlessProfiler] Checkpoint: ${e} at ${t.now().toFixed(1)}ms`);
}
function Ufo() {
  if (!kr()) return;
  if (!profilingActive_2) return;
  let n = d3().getEntriesByType("mark").filter(u => u.name.startsWith(Y3t));
  if (n.length === 0) return;
  let r = new Map();
  for (let u of n) {
    let d = u.name.slice(Y3t.length);
    r.set(d, u.startTime);
  }
  let o = r.get("turn_start");
  if (o === undefined) return;
  let s = {
    turn_number: Cdt
  };
  if (Cdt === 0) for (let [u, [d, p]] of Object.entries({
    load_initial_messages_ms: ["before_loadInitialMessages", "after_loadInitialMessages"],
    system_prompt_ms: ["before_getSystemPrompt", "after_getSystemPrompt"],
    streaming_setup_ms: ["before_runHeadlessStreaming", "stdin_listen_started"],
    stdin_wait_ms: ["stdin_listen_started", "run_entry"]
  })) {
    let m = r.get(d),
      f = r.get(p);
    if (m !== undefined && f !== undefined && f > m) s[u] = Math.round(f - m);
  }
  let i = r.get("system_message_yielded");
  if (i !== undefined && Cdt === 0) s.time_to_system_message_ms = Math.round(i);
  let a = r.get("query_started");
  if (a !== undefined) s.time_to_query_start_ms = Math.round(a - o);
  let l = r.get("first_chunk");
  if (l !== undefined) s.time_to_first_response_ms = Math.round(l - o);
  let c = r.get("api_request_sent");
  if (a !== undefined && c !== undefined) s.query_overhead_ms = Math.round(c - a);
  if (s.checkpoint_count = n.length, process.env.CLAUDE_CODE_ENTRYPOINT) s.entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;
  if (sampledForTelemetry) j("tengu_headless_latency", s);
  if (profilingEnabledLogging) v(`[headlessProfiler] Turn ${Cdt} metrics: ${Oe(s)}`);
}
var profilingEnabledLogging,
  profilingActive = 0.05,
  sampledForTelemetry,
  profilingActive_2,
  Y3t = "headless_",
  Cdt = -1;
var initHeadlessProfilerModule = b(() => {
  ct();
  Ct();
  je();
  an();
  Ozt();
  Xt();
  profilingEnabledLogging = rt(process.env.CLAUDE_CODE_PROFILE_STARTUP), sampledForTelemetry = Math.random() < profilingActive, profilingActive_2 = profilingEnabledLogging || sampledForTelemetry;
});

export {gFp as X2p,Ffo as KAo,rR as aR,Ufo as zAo,profilingEnabledLogging as Bqn,profilingActive as J2p,sampledForTelemetry as aQa,profilingActive_2 as VAo,Y3t as _4t,Cdt as zdt,initHeadlessProfilerModule as y4t};
