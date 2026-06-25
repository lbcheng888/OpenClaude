// @ts-nocheck
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {Tl as Fl,mn as cn} from "../telemetry/0600_feature_name.ts";
import {teleportResumeCodeSession as K3e,qD as wP} from "../permissions/3888_validateSessionRepository.ts";
import {setTeleportedSessionInfo as Dgt,lt as ct} from "./0132_sent.ts";
import {Xy as tT,Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {b,x as L} from "../../runtime.ts";
import {tt as nt} from "../../vendor/m2263.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function useTeleportResume(source) {
  let memoCache = UA4.c(8),
    [isResuming, setIsResuming] = kg6.useState(false),
    [error, setError] = kg6.useState(null),
    [selectedSession, setSelectedSession] = kg6.useState(null),
    resumeSession;
  if (memoCache[0] !== source) resumeSession = async session => {
    setIsResuming(true), setError(null), setSelectedSession(session), j("tengu_teleport_resume_session", {
      source: Ue(source),
      session_id: session.id
    });
    try {
      let result = await Fl("teleport_resume", () => K3e(session.id));
      return Dgt({
        sessionId: session.id
      }), setIsResuming(false), result;
    } catch (err) {
      let caughtErr = err,
        errorInfo = {
          message: caughtErr instanceof tT ? caughtErr.message : Se(caughtErr),
          formattedMessage: caughtErr instanceof tT ? caughtErr.formattedMessage : undefined,
          isOperationError: caughtErr instanceof tT
        };
      return setError(errorInfo), setIsResuming(false), null;
    }
  }, memoCache[0] = source, memoCache[1] = resumeSession;else resumeSession = memoCache[1];
  let resumeSessionFn = resumeSession,
    clearError;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) clearError = () => {
    setError(null);
  }, memoCache[2] = clearError;else clearError = memoCache[2];
  let clearErrorFn = clearError,
    result;
  if (memoCache[3] !== error || memoCache[4] !== isResuming || memoCache[5] !== resumeSessionFn || memoCache[6] !== selectedSession) result = {
    resumeSession: resumeSessionFn,
    isResuming: isResuming,
    error: error,
    selectedSession: selectedSession,
    clearError: clearErrorFn
  }, memoCache[3] = error, memoCache[4] = isResuming, memoCache[5] = resumeSessionFn, memoCache[6] = selectedSession, memoCache[7] = result;else result = memoCache[7];
  return result;
}
var UA4, kg6;
var kg6_2 = b(() => {
  ct();
  Ct();
  cn();
  St();
  wP();
  UA4 = L(nt(), 1), kg6 = L(Te(), 1);
});
export {useTeleportResume as W0l,UA4 as q0l,kg6 as jjn,kg6_2 as G0l};
