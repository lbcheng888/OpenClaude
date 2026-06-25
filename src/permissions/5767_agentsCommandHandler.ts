// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {ensureFleetGateHydrated,isAgentsFleetEnabled,fleetGateRejected,consumeAgentViewRelaunchMarker,fC as bv} from "../config/2212_shouldShowLaunchComposer.ts";
import {qTc as Lcc,$Tc as Occ} from "../../vendor/m5765.ts";
import {ZI as vI,_N as qU} from "../../vendor/m5161.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Azt as zGt,Czt as KGt} from "../../vendor/m5576.ts";
import {kyt as cht,_zt as qGt} from "../config/5574_applyFleetViewHostWindowsEnv.ts";
import {je as ze,d4 as _F} from "../../vendor/m2462.ts";
import {qee as zee,_Ln as CDn} from "../telemetry/3372_getBaseRenderOptions.ts";
import {uYt as O7t,iKe as dWe,sKe as uWe} from "../../vendor/m5.ts";
import {gracefulShutdown,isAmberSentinelEnabled as ym} from "../config/3348_flushAnalyticsSinks.ts";
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
export {Bcc as VTc,agentsCommandHandler,Ncc as GTc,Fcc as KTc};
