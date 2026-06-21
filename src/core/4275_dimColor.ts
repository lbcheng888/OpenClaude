// @ts-nocheck
import {Uu as b5,dr as P8} from "../../vendor/m231.ts";
import {Gn as d6,sc as l4} from "../../vendor/m2455.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// ---------------------------------------------------------------------------
// Cross-module (bundler-resolved) references. These are NOT local symbols; the
// bundle resolves them, and the lazy `L(() => { ... })` init block (JpK) below
// wires them up. Their identities are unchanged from the obfuscated source.
// ---------------------------------------------------------------------------

/** Bundle-internal lazy module-initializer wrapper. */
declare function L(init: () => void): unknown;

/** Bundle-internal commonjs/esm interop helper used to load a namespace. */
declare function u<T>(mod: T, interop: 1): T;

/**
 * The bundled React namespace shape used by this module. Typed loosely because
 * the cross-module component refs (`d6`, `V`) are opaque here.
 */
interface BundledReact {
  default: {
    createElement(type: unknown, props: unknown, ...children: unknown[]): ReactElement;
    Fragment: unknown;
  };
}

/** Returns the React-namespace export of the bundled `react` module. */
declare function WH(): BundledReact;

// Module-init triggers (other bundle modules whose side effects this module
// depends on). Names are intrinsic to the bundle and resolved lazily.
declare function l4(): void;
declare function nH(): void;
declare function P8(): void;

// ---- External component refs (Ink/React components from other modules) -----

/** Ink single-line `Box` wrapper used for one-line status rows. */
declare const d6: unknown;
/** Ink text component (`Text`); accepts props such as `dimColor`. */
declare const V: unknown;

// ---- External helper functions ---------------------------------------------

/** Counts occurrences of `needle` within `haystack` (used here for line counts). */
declare function b5(haystack: string, needle: string): number;

// ---------------------------------------------------------------------------
// Tool metadata strings (consumed by sibling module 4251).
// ---------------------------------------------------------------------------

/** Registered name of the RemoteTrigger tool. */
var WpH = "RemoteTrigger",
  /** Short human-facing description shown for the RemoteTrigger tool. */
  ApK = "Manage scheduled remote Claude Code agents (routines) via the claude.ai CCR API. Auth is handled in-process — the token never reaches the shell.",
  /** Model-facing usage prompt describing the supported actions and response shape. */
  wpK = `Call the claude.ai remote-trigger API. Use this instead of curl — the OAuth token is added automatically in-process and never exposed.

Actions:
- list: GET /v1/code/triggers
- get: GET /v1/code/triggers/{trigger_id}
- create: POST /v1/code/triggers (requires body)
- update: POST /v1/code/triggers/{trigger_id} (requires body, partial update)
- run: POST /v1/code/triggers/{trigger_id}/run (optional body)

The response is the raw JSON from the API. For create/update, a summary line is appended with the server-parsed run time and the routine's claude.ai URL — relay both to the user so they can confirm the time is right and know where the result will appear.`;

/** Validated input shape of a RemoteTrigger tool use (see module 4251's schema). */
interface RemoteTriggerToolInput {
  action?: string;
  trigger_id?: string;
  body?: Record<string, unknown>;
}

/** Validated output shape of a RemoteTrigger tool result (see module 4251's schema). */
interface RemoteTriggerToolResult {
  status: number;
  json: string;
  summary?: string;
}

/**
 * Builds the one-line tool-use summary shown in the UI, e.g. `"list"` or
 * `"get abc123"` — the action optionally followed by the trigger id.
 * (Original bundle name `fpK`; preserved because module 4251 references it.)
 */
function fpK(input: RemoteTriggerToolInput): string {
  return `${input.action ?? ""}${input.trigger_id ? ` ${input.trigger_id}` : ""}`;
}

/**
 * Renders the RemoteTrigger tool *result* row: shows the HTTP status plus a
 * dimmed `(N lines)` hint, where N is the number of lines in the JSON response
 * (newline count + 1).
 * (Original bundle name `jpK`; preserved because module 4251 references it.)
 */
function jpK(result: RemoteTriggerToolResult): ReactElement {
  let lineCount = b5(result.json, `
`) + 1;
  return React.default.createElement(d6, null, React.default.createElement(V, null, "HTTP ", result.status, " ", React.default.createElement(V, {
    dimColor: !0
  }, "(", lineCount, " lines)")));
}

/** Bundled React namespace ref, populated by the module initializer (JpK). */
var React: BundledReact;

/**
 * Lazy ESM module initializer: triggers sibling module side effects, then loads
 * the bundled React namespace. Invoked by sibling module 4251 before use.
 */
var JpK = L(() => {
  l4();
  nH();
  P8();
  React = u(WH(), 1);
});
export {WpH as u6e,ApK as KGa,wpK as zGa,fpK as YGa,jpK as JGa,React as s4n,JpK as XGa};
