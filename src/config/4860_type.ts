// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {IHl as y$4,HHl as V$4} from "../tui/4859_call.ts";
/**
 * Registers the "setup-bedrock" local-jsx skill/command descriptor.
 *
 * This command lets the user reconfigure Amazon Bedrock authentication,
 * region, or model pins.  It is hidden unless the `CLAUDE_CODE_USE_BEDROCK`
 * environment variable is set to a truthy value.
 *
 * Lazy-bundle init handle: `E$4` (depends on `A6`).
 */

// ---------------------------------------------------------------------------
// Cross-module symbols (kept AS-IS to preserve linkage)
// ---------------------------------------------------------------------------
//   L   : lazy-bundle factory
//   A6  : lazy-bundle init for the config namespace module
//   q_  : parseBoolEnv – parses an env-var string as a boolean
//   y$4 : lazy-init function for the Bedrock setup JSX component module
//   V$4 : the Bedrock setup JSX component module namespace export
// ---------------------------------------------------------------------------

declare function L(init: () => void): () => void;
declare function A6(): void;
declare function q_(value: string | undefined): boolean;
declare function y$4(): void;
declare const V$4: unknown;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Descriptor shape for a local-jsx skill/command entry. */
interface LocalJsxPluginDescriptor {
  type: "local-jsx";
  name: string;
  description: string;
  readonly isHidden: boolean;
  load: () => Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

/** The "setup-bedrock" command descriptor instance. */
var setupBedrockDescriptor: LocalJsxPluginDescriptor;

// ---------------------------------------------------------------------------
// Lazy-bundle initialiser
// ---------------------------------------------------------------------------

/** Lazy-bundle init handle for the setup-bedrock command descriptor. */
var E$4 = L(() => {
  A6();
  setupBedrockDescriptor = {
    type: "local-jsx",
    name: "setup-bedrock",
    description: "Reconfigure Amazon Bedrock authentication, region, or model pins",
    get isHidden() {
      return !q_(process.env.CLAUDE_CODE_USE_BEDROCK);
    },
    load: () => Promise.resolve().then(() => (y$4(), V$4))
  };
});
export {setupBedrockDescriptor as xHl,E$4 as DHl};
