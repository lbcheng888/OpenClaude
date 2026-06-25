// @ts-nocheck
import {ucl as FrK,rH as JZ} from "../config/4461_operation.ts";
import {profileCheckpoint as zK,z9 as Hm} from "../session/0243_profileReport.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ve as O_} from "../../vendor/m5.ts";
import {Vll as RrK,c6 as HU} from "../../vendor/m4456.ts";
import {Qut as C8_,r3t as Ay_} from "../../vendor/m3934.ts";
import {Si as m7,ud as U3} from "../../vendor/m134.ts";
import {b as L} from "../../runtime.ts";
/**
 * Fires after plugins initialization completes:
 * - Records a `tengu_timer` telemetry event with the plugins_init duration.
 * - Runs orphaned-plugin-version cleanup and clears the exclusion-pattern cache.
 * - In headless mode, defers the plugins-init promise to the cleanup registry
 *   so the process waits for it before exiting.
 */
function ka4({
  deferToCleanup: headless
}: {
  deferToCleanup: boolean;
}): ReturnType<typeof m7> | undefined {
  let startTime: number = performance.now(),
    pluginsInitPromise: Promise<void> = FrK();
  if (zK("action_after_plugins_init"), pluginsInitPromise.then(async () => {
    c("tengu_timer", {
      event: O_("plugins_init"),
      durationMs: Math.round(performance.now() - startTime),
      headless: headless
    }), await RrK(), C8_();
  }), headless) return m7(() => pluginsInitPromise);
  return;
}

/** Lazy-init module wrapper for the plugins-init telemetry / cleanup handler. */
var Na4 = L(() => {
  y_();
  U3();
  Hm();
  HU();
  JZ();
  Ay_();
});
export {ka4 as pfc,Na4 as mfc};
