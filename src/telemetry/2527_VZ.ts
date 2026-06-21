// @ts-nocheck
import {Oy as Pf,XS as pJ} from "../config/2341_XS.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Determines whether reduced motion should be active, with a VS Code terminal
 * override via the "tengu_cedar_marsh" feature flag.
 *
 * @param prefersReducedMotion - The user's explicit reduced-motion preference
 *   (typically from settings.prefersReducedMotion). When truthy, returns true
 *   immediately. When falsy, falls back to checking whether we are running in
 *   a VS Code terminal AND the feature flag "tengu_cedar_marsh" resolves to
 *   false (i.e. the flag has NOT disabled this VS Code override).
 * @returns true if animations should be suppressed, false otherwise.
 */
function shouldReduceMotion(prefersReducedMotion: boolean | undefined): boolean {
  if (prefersReducedMotion) return !0;
  return Pf() && Y_("tengu_cedar_marsh", !1);
}

/** Lazy initializer: ensures the terminal-output and GrowthBook modules are ready. */
var at = L(() => {
  pJ();
  o6();
});

export {shouldReduceMotion as Dv,at as VZ};
