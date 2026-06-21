// @ts-nocheck
import {J5r as sp8,Q2e as TbH} from "./2780_eventName.ts";
import {isPolicyAllowed as Y7,rd as i5} from "../../vendor/m2205.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {BaseHookInputSchema as hU,dNo as rLq,pNo as oLq} from "../config/5705_probability.ts";
import {b as L} from "../../runtime.ts";
/** Sets up the MCP notification handler for tengu telemetry events on the active session. */
function we4(sessions: unknown[]): void {
  let session = sessions.find((s: any) => s.name === "ccd_session");
  if (!session || (session as any).type !== "connected") return;
  (session as any).client.setNotificationHandler(sp8(), async (notification: any) => {
    let {
      eventName: eventName,
      eventData: eventData
    } = notification.params;
    if (!CVT.has(eventName)) return;
    if (!Y7("allow_product_feedback")) return;
    let typedData = eventData;
    switch (eventName) {
      case "tengu_message_rated":
        c(eventName, {
          message_uuid: hU(typedData.message_uuid),
          sentiment: hU(typedData.sentiment),
          surface: hU(typedData.surface),
          cleared: typedData.cleared === !0
        });
        break;
      case "tengu_feedback_survey_event":
        rLq(typedData);
        break;
    }
  });
}

/** Set of tengu event names that are allowed to be forwarded as product feedback telemetry. */
var CVT: Set<string>;

/** Lazy initializer: registers dependencies and populates the allowed telemetry event name set. */
var fe4 = L(() => {
  y_();
  i5();
  oLq();
  TbH();
  CVT = new Set(["tengu_message_rated", "tengu_feedback_survey_event"]);
});

export {we4 as dlc,CVT as F4m,fe4 as plc};
