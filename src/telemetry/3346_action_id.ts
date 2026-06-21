// @ts-nocheck
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L} from "../../runtime.ts";
/**
 * Fires a `tengu_keybinding_fired` telemetry event for the given action ID,
 * debounced to at most once per {@link KEYBINDING_DEBOUNCE_MS} per action.
 * Custom command actions (prefixed with `"command:"`) are normalized to
 * `"command:custom"` before logging.
 */
function fireKeybindingAction(actionId: string): void {
  let normalizedActionId: string = actionId.startsWith("command:") ? "command:custom" : actionId,
    now: number = Date.now(),
    lastFiredAt: number | undefined = lastFiredTimestamps.get(normalizedActionId);
  if (lastFiredAt !== void 0 && now - lastFiredAt < KEYBINDING_DEBOUNCE_MS) return;
  lastFiredTimestamps.set(normalizedActionId, now), c("tengu_keybinding_fired", {
    action_id: normalizedActionId
  });
}

/** Debounce window in milliseconds — one event per action per second. */
var KEYBINDING_DEBOUNCE_MS = 1000,
  lastFiredTimestamps: Map<string, number>;

var A7K = L(() => {
  y_();
  lastFiredTimestamps = new Map();
});

export {fireKeybindingAction as L9e,KEYBINDING_DEBOUNCE_MS as fGd,lastFiredTimestamps as rua,A7K as oua};
