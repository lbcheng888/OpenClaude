// @ts-nocheck
import {getSessionId as kt,lt as ct} from "./0132_sent.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {b} from "../../runtime.ts";
import {dn as an} from "../config/0137_namespace.ts";
// @ts-nocheck
function createSessionSnapshot() {
  return {
    sessionId: kt(),
    gates: {
      emitToolUseSummaries: rt(process.env.CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES),
      isAnt: false,
      fastModeEnabled: !rt(process.env.CLAUDE_CODE_DISABLE_FAST_MODE)
    }
  };
}
var ClK = b(() => {
  ct();
  an();
});
export {createSessionSnapshot as dil,ClK as pil};
