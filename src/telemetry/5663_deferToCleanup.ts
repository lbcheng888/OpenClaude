// @ts-nocheck
import {Cnl as FrK,Mk as JZ} from "../config/4439_operation.ts";
import {profileCheckpoint as zK,x3 as Hm} from "../session/0241_profileReport.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_} from "../../vendor/m5.ts";
import {snl as RrK,W6 as HU} from "../../vendor/m4434.ts";
import {Jlt as C8_,L2t as Ay_} from "../../vendor/m3914.ts";
import {Gi as m7,ReactHooks as U3} from "../../vendor/m133.ts";
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
  if (
    (zK("action_after_plugins_init"),
    pluginsInitPromise.then(async () => {
      (c("tengu_timer", {
        event: O_("plugins_init"),
        durationMs: Math.round(performance.now() - startTime),
        headless: headless,
      }),
        await RrK(),
        C8_());
    }),
    headless)
  )
    return m7(() => pluginsInitPromise);
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

export {ka4 as Esc,Na4 as Csc};
