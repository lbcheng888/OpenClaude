// @ts-nocheck
import {Lq as ap,ab as j2} from "../config/3178_path.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Te as WH} from "../../vendor/m2253.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
/**
 * Registers an MCP notification handler on the connected IDE client that
 * forwards arbitrary IDE-originated events to the telemetry sink as
 * `tengu_ide_<eventName>` events.
 *
 * @param ideClients - Array of active MCP client descriptors (IDE connections).
 */
function TE4(ideClients: unknown[]): void {
  OE4.useEffect(() => {
    if (!ideClients.length) return;
    let ideSession = ap(ideClients);
    if (ideSession)
      ideSession.client.setNotificationHandler(
        RAT(),
        (notification: { params: { eventName: string; eventData: Record<string, unknown> } }) => {
          let { eventName: eventName, eventData: eventData } = notification.params;
          c(`tengu_ide_${eventName}`, eventData);
        }
      );
  }, [ideClients]);
}

/** React module, lazily required. */
var OE4: typeof import("react");

/**
 * Lazily-initialised Zod schema factory for the MCP "log_event" notification.
 * Identical in shape to the VSCode counterpart (`sp8`) — reused here for the
 * generic IDE channel.
 */
var RAT: () => unknown;

/** Lazy module initialiser — wires up React and builds the log_event schema. */
var zE4 = L(() => {
  y_();
  a8();
  j2();
  OE4 = u(WH(), 1),
  RAT = kH(() =>
    k.object({
      method: k.literal("log_event"),
      params: k.object({
        eventName: k.string(),
        eventData: k.object({}).passthrough(),
      }),
    })
  );
});

export {TE4 as n4l,OE4 as t4l,RAT as vxm,zE4 as r4l};
