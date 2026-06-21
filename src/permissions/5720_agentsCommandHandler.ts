// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {ensureFleetGateHydrated,isAgentsFleetEnabled,fleetGateRejected,consumeAgentViewRelaunchMarker,bv} from "../config/2204_shouldShowLaunchComposer.ts";
import {Lcc,Occ} from "../../vendor/m5718.ts";
import {vI,qU} from "../../vendor/m5131.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {zGt,KGt} from "../tui/5539_summarizeEvent.ts";
import {cht,qGt} from "../config/5537_applyFleetViewHostWindowsEnv.ts";
import {ze,_F} from "../../vendor/m2452.ts";
import {zee,CDn} from "../telemetry/3356_getBaseRenderOptions.ts";
import {O7t,dWe,uWe} from "../../vendor/m5.ts";
import {gracefulShutdown,ym} from "../config/3332_flushAnalyticsSinks.ts";
var Bcc = {};
isFullscreenWithTTY(Bcc, {
  agentsCommandHandler: () => agentsCommandHandler
});

/**
 * Entry point for the `claude agents` CLI command.
 * Handles both --json (non-TTY machine-readable) and interactive fleet view modes.
 */
async function agentsCommandHandler(opts: any) {
  // --json flag: print agents list as JSON and exit
  if (opts.json) {
    if (await ensureFleetGateHydrated(), !isAgentsFleetEnabled()) {
      fleetGateRejected("claude agents --json", void 0);
      return;
    }
    let {
      printAgentsJson: printJson
    } = await Promise.resolve().then(() => (Lcc(), Occ));
    await printJson(opts.cwd, opts.all === !0), vI();
  }
  // Interactive TTY mode: launch fleet view UI
  if (process.stdout.isTTY) {
    if (await ensureFleetGateHydrated(), isAgentsFleetEnabled()) {
      let relaunchMarker = consumeAgentViewRelaunchMarker();
      logEvent("tengu_fleetview", {
        viaCommander: !0,
        relaunch: relaunchMarker
      });
      // Lazy-load all UI dependencies in parallel
      let [{
        mountFleetView: mountFleetView
      }, {
        applyFleetViewHostWindowsEnv: applyWindowsEnv
      }, {
        createRoot: createRoot
      }, {
        getBaseRenderOptions: getBaseRenderOptions
      }] = await Promise.all([Promise.resolve().then(() => (zGt(), KGt)), Promise.resolve().then(() => (cht(), qGt)), Promise.resolve().then(() => (ze(), _F)), Promise.resolve().then(() => (zee(), CDn))]);
      // Parse CLI config for dispatch args
      let {
        config: config
      } = O7t(process.argv.slice(2));
      applyWindowsEnv();
      let root = await createRoot(getBaseRenderOptions(!1));
      // Build fleet view props from CLI options
      let fleetViewProps = {
        cwdFilter: opts.cwd,
        dispatchExtraArgs: dWe(uWe(config, Ncc.resolve)),
        dispatchDefaults: {
          permissionMode: opts.dangerouslySkipPermissions ? "bypassPermissions" : opts.permissionMode,
          model: opts.model,
          effort: opts.effort,
          agent: opts.agent,
          allowBypass: opts.allowDangerouslySkipPermissions
        }
      };
      await mountFleetView(root, fleetViewProps), await gracefulShutdown(0, "other", {
        suppressResumeHint: !0
      });
      return;
    }
  }
  // Non-TTY or fleet not enabled: reject with helpful message
  fleetGateRejected("claude agents", process.stdout.isTTY ? void 0 : "requires an interactive terminal (stdout is not a TTY) \u2014 use 'claude agents --json' for a machine-readable listing");
}
var Ncc;
var Fcc = b(() => {
  Ct();
  ym();
  bv();
  qU();
  Ncc = require("path");
});
export {Bcc,agentsCommandHandler,Ncc,Fcc};
