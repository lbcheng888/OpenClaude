// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
import {st as q_} from "../../vendor/m5.ts";
import {xSl as b$4,RSl as C$4} from "../tui/4829_call.ts";
/**
 * setup-vertex slash command descriptor.
 *
 * Registers the `/setup-vertex` local-JSX command that lets users reconfigure
 * Google Vertex AI authentication, project, region, or model pins.  The command
 * is hidden unless the `CLAUDE_CODE_USE_VERTEX` environment variable is set.
 *
 * Cross-module references kept minified to preserve linkage:
 *   L   — lazy module initializer
 *   A6  — dependency initializer for config subsystem
 *   q_  — env-flag truthiness helper (isTruthy)
 *   b$4 — lazy-load thunk for the Vertex setup JSX module
 *   C$4 — namespace object of the Vertex setup JSX module
 */

/** Lazy-initialized command descriptor for `/setup-vertex`. */
var I$4: {
  type: "local-jsx";
  name: string;
  description: string;
  readonly isHidden: boolean;
  load: () => Promise<typeof C$4>;
};

/** Initializer that populates {@link I$4}; call via the `L` lazy-init harness. */
var x$4 = L(() => {
  A6();
  I$4 = {
    type: "local-jsx",
    name: "setup-vertex",
    description: "Reconfigure Google Vertex AI authentication, project, region, or model pins",
    get isHidden() {
      return !q_(process.env.CLAUDE_CODE_USE_VERTEX);
    },
    load: () => Promise.resolve().then(() => (b$4(), C$4))
  };
});

export {I$4 as kSl,x$4 as HSl};
