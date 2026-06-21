// @ts-nocheck
import {getSessionId as kt,lt as ct} from "./0131_sent.ts";
import {st as rt} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "../config/0047_namespace.ts";
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

export {createSessionSnapshot as EZa,ClK as CZa};
