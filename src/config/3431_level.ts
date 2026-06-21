// @ts-nocheck
import {je as dH} from "../../vendor/m577.ts";
import {logForDebugging as y,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Lr as l8} from "../../vendor/m578.ts";
// @ts-nocheck
class ra8 {
  error(H, ..._) {
    if (dH.CLAUDE_CODE_OTEL_DIAG_STDERR) process.stderr.write(`${y5K} ${H}
`);
    y(`${y5K} ${H}`, {
      level: "error"
    });
  }
  warn(H, ..._) {
    y(`[3P telemetry] OTEL diag warn: ${H}`, {
      level: "warn"
    });
  }
  info(H, ..._) {
    return;
  }
  debug(H, ..._) {
    return;
  }
  verbose(H, ..._) {
    return;
  }
}
var y5K = "[3P telemetry] OTEL diag error:";
var N5K = L(() => {
  UH();
  l8();
});

export {ra8 as RQr,y5K as lma,N5K as cma};
