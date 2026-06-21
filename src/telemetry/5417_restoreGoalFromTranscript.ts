// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {tho as u5q,F6e as opH} from "./4376_condition.ts";
import {isTmuxControlMode as n_,ln as M6} from "./0594_feature_name.ts";
import {E$t as Yb_,x9 as tx} from "../../vendor/m4033.ts";
import {getSessionId as v_,getTotalOutputTokens as JJ,lt as w_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
/*
 * telemetry/5374_restoreGoalFromTranscript.ts - Telemetry and event-state restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
var iZq = {};
j_(iZq, {
  restoreGoalFromTranscript: (): any => restoreGoalFromTranscript,
  findGoalToRestore: (): any => findGoalToRestore
});
// Restored export findGoalToRestore; runtime behavior is unchanged.
function findGoalToRestore(H: any): any {
  if (!H) return null;
  for (let _ = H.length - 1; _ >= 0; _--) {
    let q = H[_];
    if (q?.type !== "attachment" || q.attachment.type !== "goal_status") continue;
    return q.attachment.met || q.attachment.failed ? null : q.attachment.condition;
  }
  return null;
}
// Restored export restoreGoalFromTranscript; runtime behavior is unchanged.
function restoreGoalFromTranscript(H: any, _: any): any {
  let q = findGoalToRestore(H),
    K = q !== null ? u5q() : null;
  if (K !== null) n_("goal_set", K.code);
  if (q === null || K !== null) {
    _((O: any): any => O.activeGoal === void 0 ? O : {
      ...O,
      activeGoal: void 0
    });
    return;
  }
  Yb_(_, v_(), "Stop", "", {
    type: "prompt",
    prompt: q
  }), _((O: any): any => ({
    ...O,
    activeGoal: {
      condition: q,
      iterations: 0,
      setAt: Date.now(),
      tokensAtStart: JJ()
    }
  })), c("tengu_goal_restored_on_resume", {
    promptLength: q.length
  });
}
var rZq = L((): any => {
  w_();
  M6();
  y_();
  tx();
  opH();
});
export {iZq as aLo,findGoalToRestore,restoreGoalFromTranscript,rZq as lLo};
