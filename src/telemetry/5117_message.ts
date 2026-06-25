// @ts-nocheck
import {K7 as iS,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Xgt as IO_,YBl as nW4} from "../../vendor/m5115.ts";
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
/*
 * telemetry/5068_message.ts - telemetry and background-event restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function cLH(): any {
  let H = iS("tengu_bridge_poll_interval_config", IO_, 300000),
    _ = m9T().safeParse(H);
  return _.success ? _.data : IO_;
}
var iW4, m9T;
var NMq = L((): any => {
  a8();
  o6();
  nW4();
  iW4 = {
    message: "must be 0 (disabled) or \u2265100ms"
  }, m9T = kH((): any => k.object({
    poll_interval_ms_not_at_capacity: k.number().int().min(100),
    poll_interval_ms_at_capacity: k.number().int().refine((H: any): any => H === 0 || H >= 100, iW4),
    non_exclusive_heartbeat_interval_ms: k.number().int().min(0).default(0),
    multisession_poll_interval_ms_not_at_capacity: k.number().int().min(100).default(IO_.multisession_poll_interval_ms_not_at_capacity),
    multisession_poll_interval_ms_partial_capacity: k.number().int().min(100).default(IO_.multisession_poll_interval_ms_partial_capacity),
    multisession_poll_interval_ms_at_capacity: k.number().int().refine((H: any): any => H === 0 || H >= 100, iW4).default(IO_.multisession_poll_interval_ms_at_capacity),
    reclaim_older_than_ms: k.number().int().min(1).default(5000),
    session_keepalive_interval_v2_ms: k.number().int().min(0).default(120000)
  }).refine((H: any): any => H.non_exclusive_heartbeat_interval_ms > 0 || H.poll_interval_ms_at_capacity > 0, {
    message: "at-capacity liveness requires non_exclusive_heartbeat_interval_ms > 0 or poll_interval_ms_at_capacity > 0"
  }).refine((H: any): any => H.non_exclusive_heartbeat_interval_ms > 0 || H.multisession_poll_interval_ms_at_capacity > 0, {
    message: "at-capacity liveness requires non_exclusive_heartbeat_interval_ms > 0 or multisession_poll_interval_ms_at_capacity > 0"
  }));
});
export {cLH as lOe,iW4 as JBl,m9T as EEm,NMq as fDo};
