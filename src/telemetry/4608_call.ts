// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {getMemoryToggledOff as rb,setMemoryToggledOff as C$_,lt as w_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
var oq4 = {};
j_(oq4, {
  call: () => call
});

/**
 * Toggle automemory on or off for the current session and log a telemetry event.
 *
 * Returns a text result explaining the new state to the user.
 */
var call = async (): Promise<{ type: "text"; value: string }> => {
  // If memory is currently toggled off (rb()===true), then !rb() is false, meaning we are re-enabling.
  // If memory is currently on (rb()===false), then !rb() is true, meaning we are disabling.
  let togglingOff: boolean = !rb();
  return C$_(togglingOff), c("tengu_memory_toggled", {
    toggled_off: togglingOff
  }), {
    type: "text",
    value: togglingOff
      ? `Automemory disabled for this session \xB7 this conversation will not write or read new memories, and previously-loaded memory content should not be referenced.\n\nRun /toggle-memory again to re-enable.`
      : "Automemory re-enabled \xB7 memory content may be referenced and new memories can be saved."
  };
};

var aq4 = L(() => {
  w_();
  y_();
});

export {oq4 as Iul,call as PKp,aq4 as Dul};
