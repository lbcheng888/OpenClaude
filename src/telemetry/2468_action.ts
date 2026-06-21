// @ts-nocheck
import {ubn as vw6,E$ as kv,FZ as Ji} from "./2465_bindings.ts";
import {dbn as Ew6,gwe as z2H} from "../../vendor/m2466.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH,Qe as O_} from "../../vendor/m5.ts";
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
    if (!warnedFallbackKeys.has(cacheKey))
      warnedFallbackKeys.add(cacheKey),
        c("tengu_keybinding_fallback_used", {
          action: action,
          context: tH(context),
          fallback: fallback,
          reason: O_("action_not_found"),
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

export {XP as qw,warnedFallbackKeys as zwi,dt as UZ};
