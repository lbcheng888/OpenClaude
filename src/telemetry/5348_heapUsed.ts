// @ts-nocheck
import {useInterval as B1} from "../../vendor/m2456.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {b as L,x as u} from "../../runtime.ts";
import {je as nH} from "../../vendor/m2462.ts";
import {et as WH} from "../../vendor/m2261.ts";
/**
 * React memory usage threshold hook.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function pE4(): RestoredUnknown {
  let [H, _] = Sl6.useState(null),
    q = Sl6.useRef("normal");
  return B1(() => {
    let K, O;
    try {
      ({
        heapUsed: K,
        rss: O
      } = process.memoryUsage());
    } catch (z) {
      N(`[useMemoryUsage] process.memoryUsage() failed: ${z instanceof Error ? z.message : String(z)}`, {
        level: "error"
      });
      return;
    }
    let T = K >= dAT ? "critical" : K >= cAT ? "high" : "normal";
    if (mE4[T] > mE4[q.current]) c("tengu_memory_threshold_crossed", {
      rss_mb: Math.round(O / 1024 / 1024),
      heap_used_mb: Math.round(K / 1024 / 1024),
      status: tH(T)
    }), q.current = T;
    _(z => {
      if (T === "normal") return z === null ? z : null;
      return {
        heapUsed: K,
        status: T
      };
    });
  }, 1e4), H;
}
var Sl6,
  cAT = 1610612736,
  dAT = 2684354560,
  mE4;
var BE4 = L(() => {
  nH();
  y_();
  FH();
  Sl6 = u(WH(), 1), mE4 = {
    normal: 0,
    high: 1,
    critical: 2
  };
});
export {pE4 as q7l,Sl6 as rer,cAT as E1m,dAT as C1m,mE4 as $7l,BE4 as W7l};
