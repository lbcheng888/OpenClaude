// @ts-nocheck
import {ft as j_,b as L,x as u} from "../../runtime.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Mr as I8,xl as c4} from "../../vendor/m4427.ts";
import {gL as BV,cx as uL} from "../artifact/4323_cx.ts";
import {cPl as af4,uPl as sf4} from "../../vendor/m4957.ts";
import {oe as WH} from "../../vendor/m2275.ts";
var tf4 = {};
j_(tf4, {
  call: () => call
});

/** React module reference, initialized lazily. */
var jJq: typeof import("react");

/**
 * `/hooks` slash-command handler.
 *
 * Logs a `tengu_hooks_command` telemetry event, then renders the interactive
 * hooks-configuration dialog (`HooksDialog`) with the full list of currently
 * enabled tool names.
 *
 * @param onExit  - Callback invoked by the dialog when the user exits/cancels.
 * @param context - Tool-use context (session + permission layers) passed in by
 *                  the command dispatcher.
 * @returns       A React element rendering the hooks configuration dialog.
 */
var call = async (onExit: (msg?: string, opts?: {
  display?: string;
}) => void, context: unknown) => {
  c("tengu_hooks_command", {});
  let permissionContext = I8(context),
    toolNames: string[] = BV(permissionContext).map((tool: {
      name: string;
    }) => tool.name);
  return jJq.createElement(af4, {
    toolNames: toolNames,
    onExit: onExit
  });
};

/** Lazy module initializer — loads hooks dialog, telemetry, tool list, and permission context deps. */
var ef4 = L(() => {
  sf4(); // init hooks dialog module (af4 component)
  y_(); // init telemetry/analytics module (c = logEvent)
  uL(); // init enabled-tools module (BV = getEnabledTools)
  c4(); // init permission-context module (I8 = getToolPermissionContext)
  jJq = u(WH(), 1); // React
});
export {tf4 as dPl,jJq as pPl,call as sgm,ef4 as mPl};
