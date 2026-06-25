// @ts-nocheck
import {b} from "../../runtime.ts";
import {lt} from "../session/0132_sent.ts";
import {Jm} from "../config/2207_Jm.ts";
import {hyl,fyl} from "../telemetry/4636_call.ts";
// @ts-nocheck
/**
 * Slash-command descriptor module: the "pause-memory" local command.
 *
 * Registers a local (non-JSX) command that pauses automemory for the current
 * session. The descriptor object (Nnm) is published through Tvo via a lazily
 * initialized module body (gyl), following the same command-descriptor shape
 * used by other built-in commands.
 */

/**
 * Nnm: the command descriptor object for "pause-memory".
 * Tvo: the published alias of that descriptor (exported binding).
 */
var Nnm, Tvo;

/**
 * gyl: lazy module initializer (via the `b` runtime helper). Runs its
 * dependency initializers (lt, Jm) once, then builds the command descriptor.
 */
var gyl = b(() => {
  lt();
  Jm();
  Nnm = {
    type: "local",
    name: "pause-memory",
    aliases: ["memory-pause", "toggle-memory"],
    description: "Pause automemory for this session",
    /** Disabled by default (feature-gated off). */
    isEnabled: () => !1,
    isHidden: !1,
    supportsNonInteractive: !1,
    thinClientDispatch: "post-text",
    /** Lazily load the command implementation module (hyl init -> fyl export). */
    load: () => Promise.resolve().then(() => (hyl(), fyl)),
    userFacingName() {
      return "pause-memory";
    }
  }, Tvo = Nnm;
});

export {Nnm,Tvo,gyl};
