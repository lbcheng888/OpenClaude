// @ts-nocheck
import {ft as j_,b as L,x as u} from "../../runtime.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {ejn as NF6,kWe as OUH} from "../../vendor/m4827.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {IDl as Wf4,xDl as Zf4} from "../tui/4946_onDone.ts";
import {oe as WH} from "../../vendor/m2275.ts";
var Gf4 = {};
j_(Gf4, {
  call: () => call
});

/**
 * Slash-command handler for /passes — renders the GuestPassesDialog component.
 * On first visit it also snapshots the current remaining-pass count into
 * persisted state and fires the `tengu_guest_passes_visited` telemetry event.
 *
 * @param onDone - Callback invoked when the dialog is dismissed.
 */
async function call(onDone: (...args: unknown[]) => void): Promise<unknown> {
  let isFirstVisit = !C_().hasVisitedPasses;
  if (isFirstVisit) {
    let remainingPassCount = NF6();
    P6((prevState: Record<string, unknown>) => ({
      ...prevState,
      hasVisitedPasses: !0,
      passesLastSeenRemaining: remainingPassCount ?? prevState.passesLastSeenRemaining
    }));
  }
  return c("tengu_guest_passes_visited", {
    is_first_visit: isFirstVisit
  }), TJq.createElement(Wf4, {
    onDone: onDone
  });
}
var TJq: typeof import("react");
var Rf4 = L(() => {
  Zf4();
  y_();
  OUH();
  T8();
  TJq = u(WH(), 1);
});
export {Gf4 as DDl,call as Whm,TJq as PDl,Rf4 as ODl};
