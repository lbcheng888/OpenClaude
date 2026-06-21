// @ts-nocheck
import {Hk as DZ,XRe as z0H,PF as ux} from "../api/2739_status.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** Event name constant for the pewter-summit telemetry feature flag / event. */
var BC6 = "tengu_pewter_summit";

/**
 * React hook that returns the current API rate-limit / quota status object
 * and re-renders whenever that status changes.
 *
 * Subscribes to `z0H` (the global Set of status-change listeners) on mount and
 * unsubscribes on unmount.  The initial value is spread from `DZ` (the module-level
 * status singleton initialised in `ux`).
 */
function V4H(): typeof DZ {
  // statusState: current quota/rate-limit status snapshot
  // setStatusState: React state setter
  let [statusState, setStatusState] = UC6.useState({
    ...DZ
  });
  return UC6.useEffect(() => {
    // listener: called by MV_ whenever the status changes
    let listener = (newStatus: typeof DZ) => {
      setStatusState({
        ...newStatus
      });
    };
    return z0H.add(listener), () => {
      z0H.delete(listener);
    };
  }, []), statusState;
}

/** React namespace, loaded lazily via WH(). */
var UC6: typeof import("react");

/** Lazy-init block for this module. */
var C4_ = L(() => {
  ux();
  UC6 = u(WH(), 1);
});

export {BC6 as xUn,V4H as _ce,UC6 as kUn,C4_ as fct};
