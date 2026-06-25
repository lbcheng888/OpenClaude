// @ts-nocheck
import {XAn as vw6,K2 as kv,MZ as Ji} from "./2475_bindings.ts";
import {QAn as Ew6,nwe as z2H} from "../../vendor/m2476.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH,Ve as O_} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/**
 * Resolves a named keybinding action to its bound key string, with fallback
 * logging. If the action is not found in the current bindings, emits a
 * `tengu_keybinding_fallback_used` telemetry event (once per unique
 * action+context pair) and returns the supplied fallback string.
 *
 * @param action   The action identifier (e.g. "chat:cycleMode")
 * @param context  The keybinding context name (e.g. "Chat", "Global")
 * @param fallback The default key string to return when the action is unbound
 * @returns The resolved key string, "" if the action is explicitly unbound, or
 *          the fallback string if the action is not found at all
 */
function XP(action: string, context: string, fallback: string): string {
  let bindings = vw6(kv),
    resolved = Ew6(action, context, bindings);
  if (resolved === void 0) {
    let cacheKey = `${action}:${context}`;
    if (!warnedFallbackKeys.has(cacheKey)) warnedFallbackKeys.add(cacheKey), c("tengu_keybinding_fallback_used", {
      action: action,
      context: tH(context),
      fallback: fallback,
      reason: O_("action_not_found")
    });
    return fallback;
  }
  return resolved === null ? "" : resolved;
}

/** Tracks which action:context pairs have already emitted a fallback warning (dedupe per session). */
var warnedFallbackKeys: Set<string>;
var dt = L(() => {
  y_();
  Ji();
  z2H();
  warnedFallbackKeys = new Set();
});
export {XP as KR,warnedFallbackKeys as hDi,dt as NZ};
