// @ts-nocheck
import {getSettingsSchema as UJ,k$ as Tx} from "../../vendor/m2541.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * `useKeybindingDisplayText` — React hook that resolves the display text for a
 * keybinding action in a given context.
 *
 * Wraps the keybinding context returned by `UJ()` (the global keybinding
 * store hook).  When the action has no registered binding (or there is no
 * context at all), the hook:
 *  - Returns the caller-supplied `fallback` string.
 *  - Fires a one-shot `tengu_keybinding_fallback_used` telemetry event (the
 *    first time only, guarded by the `hasLoggedFallback` ref).
 *
 * When the action is explicitly unbound (`getDisplayText` returns `null`), an
 * empty string `""` is returned so callers can conditionally hide the hint.
 *
 * Bundle export name: `a1`; lazy-init thunk name: `IW`.
 * Cross-module linkage symbols kept as-is: `UJ`, `tH`, `c`, `L`, `u`, `WH`,
 * `y_`, `Tx`.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Keybinding context object returned by `UJ()`.
 * `getDisplayText` returns:
 *  - A non-empty string when the action is bound.
 *  - `null`      when the action is explicitly unbound.
 *  - `undefined` when the action is unknown in this context.
 */
interface KeybindingContext {
  getDisplayText(action: string, context: string): string | null | undefined;
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

/**
 * Resolve the display text (e.g. `"ctrl+k"`) for a keybinding `action` inside
 * `context` (e.g. `"Chat"`), falling back to `fallback` when no binding exists.
 *
 * @param action   - Action identifier, e.g. `"chat:thinkingToggle"`.
 * @param context  - Keybinding context name, e.g. `"Chat"`.
 * @param fallback - Text to display when the binding is absent or the context
 *                   is unavailable.
 * @returns The resolved display string, `""` for an unbound action, or
 *          `fallback` when the action is not found.
 */
function useKeybindingDisplayText(action: string, context: string, fallback: string): string {
  let keybindingCtx: KeybindingContext | undefined = UJ(),
    displayText = keybindingCtx?.getDisplayText(action, context),
    isMissing = displayText === void 0,
    reason: string = keybindingCtx ? "action_not_found" : "no_context",
    hasLoggedFallback = Oj6.useRef(!1);

  if (
    Oj6.useEffect(
      () => {
        if (isMissing && !hasLoggedFallback.current)
          hasLoggedFallback.current = !0,
            c("tengu_keybinding_fallback_used", {
              action: action,
              context: tH(context),
              fallback: fallback,
              reason: tH(reason),
            });
      },
      [isMissing, action, context, fallback, reason],
    ),
    isMissing
  )
    return fallback;

  return displayText === null ? "" : displayText;
}

// ---------------------------------------------------------------------------
// Module-level state (assigned inside the lazy init thunk below)
// ---------------------------------------------------------------------------

/** React namespace — assigned by the lazy init thunk below. */
var Oj6: typeof import("react");

// ---------------------------------------------------------------------------
// Lazy module init thunk
// ---------------------------------------------------------------------------

/** Lazy-initialisation thunk for this module (`IW` in the bundle). */
var IW = L(() => {
  y_();
  Tx();
  Oj6 = u(WH(), 1);
});

export {useKeybindingDisplayText as ju,Oj6 as NEn,IW as wk};
