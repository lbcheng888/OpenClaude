// @ts-nocheck
import {QS as UJ,Q2 as Tx} from "../../vendor/m2552.ts";
import {x6r as GS8,nwe as z2H} from "../../vendor/m2476.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {Az as ji} from "../../vendor/m2471.ts";
import {b as L,x as u} from "../../runtime.ts";
import {et as WH} from "../../vendor/m2261.ts";
/**
 * `useKeybindingChord` — React hook that resolves the display string for a
 * keybinding action in a given context, using the lower-level chord-lookup API.
 *
 * This module is a close sibling of `2550_current` (`a1` / `useKeybindingDisplayText`).
 * The difference is that this version calls the standalone `GS8(action, context, bindings)`
 * function (which returns a raw chord array) and then formats it with `ji()`, rather than
 * calling the context object's `getDisplayText` method directly.
 *
 * When the action has no registered binding (or there is no active keybinding context),
 * the hook:
 *  - Returns the caller-supplied `fallback` string.
 *  - Fires a one-shot `tengu_keybinding_fallback_used` telemetry event (the first time
 *    only, guarded by the `hasLoggedFallback` ref).
 *
 * When the action is explicitly unbound (`GS8` returns `null`), an empty string `""` is
 * returned so callers can conditionally hide the hint.
 *
 * Bundle export name: `ah`; lazy-init thunk name: `gSH`.
 * Cross-module linkage symbols kept as-is: `UJ`, `GS8`, `ji`, `tH`, `c`, `L`, `u`,
 * `WH`, `y_`, `Tx`, `z2H`.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Keybinding context object returned by `UJ()`.
 * Exposes the raw `bindings` array used by the standalone chord-lookup function.
 */
interface KeybindingContextWithBindings {
  bindings: unknown[];
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

/**
 * Resolve the formatted chord string (e.g. `"ctrl+k"`) for a keybinding `action`
 * inside `context` (e.g. `"Confirmation"`), falling back to `fallback` when no
 * binding is registered or no keybinding context is active.
 *
 * @param action   - Action identifier, e.g. `"confirm:toggleExplanation"`.
 * @param context  - Keybinding context name, e.g. `"Confirmation"`.
 * @param fallback - Text to display when the binding is absent or the context
 *                   is unavailable.
 * @returns The formatted chord string, `""` for an explicitly unbound action, or
 *          `fallback` when the action is not found.
 */
function useKeybindingChord(action: string, context: string, fallback: string): string {
  let keybindingCtx: KeybindingContextWithBindings | undefined = UJ(),
    chord = keybindingCtx ? GS8(action, context, keybindingCtx.bindings) : void 0,
    isChordMissing = chord === void 0,
    reason: string = keybindingCtx ? "action_not_found" : "no_context",
    hasLoggedFallback = cf6.useRef(!1);
  if (cf6.useEffect(() => {
    if (isChordMissing && !hasLoggedFallback.current) hasLoggedFallback.current = !0, c("tengu_keybinding_fallback_used", {
      action: action,
      context: tH(context),
      fallback: fallback,
      reason: tH(reason)
    });
  }, [isChordMissing, action, context, fallback, reason]), chord === void 0) return fallback;
  return chord === null ? "" : ji(chord);
}

// ---------------------------------------------------------------------------
// Module-level state (assigned inside the lazy init thunk below)
// ---------------------------------------------------------------------------

/** React namespace — assigned by the lazy init thunk below. */
var cf6: typeof import("react");

// ---------------------------------------------------------------------------
// Lazy module init thunk
// ---------------------------------------------------------------------------

/** Lazy-initialisation thunk for this module (`gSH` in the bundle). */
var gSH = L(() => {
  y_();
  Tx();
  z2H();
  cf6 = u(WH(), 1);
});
export {useKeybindingChord as yI,cf6 as dvn,gSH as gwe};
