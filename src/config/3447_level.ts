// @ts-nocheck
import {Ne as dH} from "../../vendor/m583.ts";
import {logForDebugging as y,qe as UH} from "./0236_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
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
export {ra8 as cro,y5K as CSa,N5K as ASa};
