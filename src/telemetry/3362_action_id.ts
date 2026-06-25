// @ts-nocheck
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
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
export {fireKeybindingAction as j3e,KEYBINDING_DEBOUNCE_MS as ttp,lastFiredTimestamps as g_a,A7K as __a};
