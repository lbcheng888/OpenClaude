// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Ir as _q} from "../../vendor/m584.ts";
import {Ne as oH} from "../../vendor/m583.ts";
import {sUn as RV6,wao as he8} from "../session/3763_performLogout.ts";
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
export {B94 as cTl,U94 as uTl};
