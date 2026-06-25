// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getMemoryToggledOff as Kx,setMemoryToggledOff as bSt,lt} from "../session/0132_sent.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
var fyl = {};
ft(fyl, {
  call: () => call
});

/**
 * Toggle memory pause on or off for the current session and log a telemetry event.
 *
 * Returns a text result explaining the new state to the user.
 */
var call = async (): Promise<{ type: "text"; value: string }> => {
  // If memory is currently active (Kx()===true), then !Kx() is false, meaning we are resuming.
  // If memory is currently paused (Kx()===false), then !Kx() is true, meaning we are pausing.
  let pausing: boolean = !Kx();
  return bSt(pausing), W("tengu_memory_toggled", {
    toggled_off: pausing
  }), {
    type: "text",
    value: pausing ? `Memory paused for this session \xB7 this conversation will not write or read new memories, and previously-loaded memory content should not be referenced.

Run /pause-memory again to resume.` : "Memory resumed \xB7 memory content may be referenced and new memories can be saved."
  };
};

var hyl = b(() => {
  lt();
  kt();
});

export {fyl,call as Mnm,hyl};
