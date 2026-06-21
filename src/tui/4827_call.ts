// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as u} from "../../runtime.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {useApp as wi} from "../../vendor/m2442.ts";
import {Or as S8,Ts as w9} from "../../vendor/m2542.ts";
import {kUt as tb_,xUt as sb_} from "../../vendor/m3856.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {PBn as LC6,foo as L9q} from "../../vendor/m3842.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Bedrock setup entry-point (TUI).
 *
 * Exports a single `call` function that emits a telemetry event and returns
 * the {@link BedrockSetupScreen} component. The component drives the
 * interactive Amazon Bedrock configuration wizard (`LC6`) and, on successful
 * completion, restarts Claude Code.
 *
 * This is a 1:1 restoration: only symbol names, types, comments, and the JSX
 * form were changed. All control flow, operators (!0/!1), string literals, and
 * cross-module references are preserved exactly.
 */

// ---------------------------------------------------------------------------
// Cross-module imports (keep minified identifiers to preserve linkage)
// ---------------------------------------------------------------------------

/** Emit a Tengu telemetry event. */
declare function c(event: string, payload: Record<string, unknown>): void;

/** Ink `useApp()` hook — returns the Ink app instance (exit, etc.). */
declare function wi(): {
  exit(): void;
};

/** Register a named keyboard binding for the active context (`S8`). */
declare function S8(action: string, handler: () => void, options: {
  context: string;
  isActive: boolean;
}): void;

/** Lazy-initialize the relaunch module (`tb_`). */
declare function tb_(): void;

/** The relaunch module namespace (`sb_`), providing `execRelaunch`. */
declare const sb_: {
  execRelaunch(): Promise<void>;
};

/** Ink `Box` layout component (`B`). */
declare const B: React.FC<{
  flexDirection?: string;
  gap?: number;
  marginTop?: number;
  children?: React.ReactNode;
}>;

/** Ink `Text` component (`V`). */
declare const V: React.FC<{
  color?: string;
  dimColor?: boolean;
  bold?: boolean;
  children?: React.ReactNode;
}>;

/**
 * Amazon Bedrock interactive setup wizard (`LC6`).
 * Calls `onComplete` with a human-readable success message, or `onCancel`
 * if the user aborts.
 */
declare const LC6: React.FC<{
  onComplete: (message: string) => void;
  onCancel: () => void;
}>;

// ---------------------------------------------------------------------------
// Module wiring
// ---------------------------------------------------------------------------

var V$4 = {};
j_(V$4, {
  call: () => call
});

// ---------------------------------------------------------------------------
// Exported entry-point
// ---------------------------------------------------------------------------

/**
 * Emit the `tengu_bedrock_setup_started` event and return the
 * {@link BedrockSetupScreen} component bound to the provided `onDone`
 * callback.
 */
async function call(onDone: () => void): Promise<React.ReactElement> {
  return c("tengu_bedrock_setup_started", {}), Uc.createElement(BedrockSetupScreen, {
    onDone: onDone
  });
}

// ---------------------------------------------------------------------------
// BedrockSetupScreen component
// ---------------------------------------------------------------------------

/** Props for {@link BedrockSetupScreen}. */
interface BedrockSetupScreenProps {
  /** Called when the user cancels or when the setup flow finishes and
   *  the user presses Enter (triggering a relaunch via the `confirm:yes`
   *  binding instead). */
  onDone: () => void;
}

/**
 * Hosts the Bedrock wizard and handles the post-setup restart prompt.
 *
 * State machine:
 *  - `completionMessage === null`  → render the wizard (`LC6`)
 *  - `completionMessage !== null`  → show success text + "Press Enter to restart"
 *    (the `confirm:yes` binding calls `app.exit()` then `execRelaunch()`)
 */
function BedrockSetupScreen({
  onDone: onDone
}: BedrockSetupScreenProps) {
  let app = wi(),
    [completionMessage, setCompletionMessage] = N$4.useState<string | null>(null);
  if (S8("confirm:yes", () => {
    app.exit(), Promise.resolve().then(() => (tb_(), sb_)).then(relaunchModule => relaunchModule.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: completionMessage !== null
  }), completionMessage !== null) return Uc.createElement(B, {
    flexDirection: "column",
    gap: 1,
    marginTop: 1
  }, Uc.createElement(V, {
    color: "success"
  }, completionMessage), Uc.createElement(V, {
    dimColor: !0
  }, "Press ", Uc.createElement(V, {
    bold: !0
  }, "Enter"), " to restart Claude Code."));
  return Uc.createElement(LC6, {
    onComplete: message => setCompletionMessage(message),
    onCancel: () => {
      c("tengu_bedrock_setup_cancelled", {}), onDone();
    }
  });
}

// ---------------------------------------------------------------------------
// Module-level vars (assigned in lazy initializer below)
// ---------------------------------------------------------------------------

var Uc: typeof import("react") & {
    createElement: typeof import("react").createElement;
  }, N$4: typeof import("react");

// ---------------------------------------------------------------------------
// Lazy initializer — mirrors original `L(() => { ... })` structure exactly
// ---------------------------------------------------------------------------

var y$4 = L(() => {
  L9q();
  nH();
  w9();
  y_();
  Uc = u(WH(), 1), N$4 = u(WH(), 1);
});
export {V$4 as bSl,call as vrm,BedrockSetupScreen as wrm,Uc as OG,N$4 as SSl,y$4 as ESl};
