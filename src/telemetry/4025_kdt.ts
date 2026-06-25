// @ts-nocheck
import {zk as DZ,Nke as z0H,nB as ux} from "../api/2752_status.ts";
import {b as L,x as u} from "../../runtime.ts";
import {et as WH} from "../../vendor/m2261.ts";
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
export {BC6 as u3n,V4H as hce,UC6 as d3n,C4_ as kdt};
