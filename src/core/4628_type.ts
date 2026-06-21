// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {je as oH} from "../../vendor/m577.ts";
import {pNn as RV6,Vno as he8} from "../session/3747_performLogout.ts";
/** Fleet-host logout command descriptor (local-JSX command type). */

/** Callback context passed to fleetHostCall by the TUI dispatcher. */
interface FleetHostCallContext {
  exit: () => void;
  relaunch: () => void;
  setError: (msg: string) => void;
  setInfo: (msg: string) => void;
}

var B94: {
  type: "local-jsx";
  name: string;
  description: string;
  isEnabled: () => boolean;
  fleetHostCall: (ctx: FleetHostCallContext, args: string) => Promise<unknown>;
  load: () => Promise<typeof he8>;
};

var U94 = L(() => {
  _q();
  B94 = {
    type: "local-jsx",
    name: "logout",
    description: "Sign out from your Anthropic account",
    isEnabled: () => !oH.DISABLE_LOGOUT_COMMAND,
    fleetHostCall: async (ctx: FleetHostCallContext) => {
      let {
        fleetHostLogout: performFleetHostLogout
      } = await Promise.resolve().then(() => (RV6(), he8));
      return performFleetHostLogout(ctx);
    },
    load: () => Promise.resolve().then(() => (RV6(), he8))
  };
});

export {B94 as xdl,U94 as kdl};
