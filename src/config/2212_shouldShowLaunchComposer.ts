// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {det,S$r,vbn} from "./2211_vbn.ts";
import {GH,lk} from "../../vendor/m125.ts";
import {br,VK} from "./0745_updateSettingsForSource.ts";
import {initializeGrowthBook as B0,getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {fk,lr} from "../../vendor/m233.ts";
import {nt} from "../../vendor/m127.ts";
import {AR} from "../../vendor/m583.ts";
import {dn} from "./0137_namespace.ts";
import {mg} from "../../vendor/m2209.ts";
/** Module namespace object for all exports in this config module. */
var wbn = {};

// Register all exported symbols onto the module namespace
ft(wbn, {
  shouldShowLaunchComposer: () => shouldShowLaunchComposer,
  isLaunchComposerEnabled: () => isLaunchComposerEnabled,
  isDaemonWorkerRegistryEnabled: () => isDaemonWorkerRegistryEnabled,
  isDaemonServiceRecalled: () => isDaemonServiceRecalled,
  isDaemonServiceInstallEnabled: () => isDaemonServiceInstallEnabled,
  isDaemonCliEnabled: () => isDaemonCliEnabled,
  isAgentsFleetEnabled: () => isAgentsFleetEnabled,
  fleetGateRejected: () => fleetGateRejected,
  ensureFleetGateHydrated: () => ensureFleetGateHydrated,
  daemonHint: () => daemonHint,
  daemonColdStartGbDefault: () => daemonColdStartGbDefault,
  consumeAgentViewRelaunchMarker: () => consumeAgentViewRelaunchMarker,
  bgSupervisorNounCap: () => bgSupervisorNounCap,
  bgSupervisorNoun: () => bgSupervisorNoun,
  AGENT_VIEW_RELAUNCH_ENV_KEY: () => AGENT_VIEW_RELAUNCH_ENV_KEY
});

/** Returns true when the agents fleet feature is enabled (i.e. not explicitly disabled). */
function isAgentsFleetEnabled() {
  return !det();
}

/** Ensures GrowthBook and settings are hydrated before fleet gate checks. */
async function ensureFleetGateHydrated(options: any = {}) {
  if (GH() === null) {
    let {
      getSettingsWithErrors: getSettingsWithErrors
    } = await Promise.resolve().then(() => (br(), VK));
    getSettingsWithErrors();
  }
  if (options.kickGrowthBook !== !1) B0().catch(() => {});
}

/** Daemon CLI is enabled when the agents fleet is enabled. */
function isDaemonCliEnabled() {
  return isAgentsFleetEnabled();
}

/** Worker registry is currently disabled. */
function isDaemonWorkerRegistryEnabled() {
  return !1;
}

/** Checks the GrowthBook feature flag for daemon service install availability. */
function isDaemonServiceInstallEnabled() {
  return it("tengu_amber_anchor", !1);
}

/** Checks the GrowthBook feature flag indicating daemon service has been recalled. */
function isDaemonServiceRecalled() {
  return it("tengu_copper_lantern", !1);
}

/** Returns daemon cold-start behavior: "ask" if feature flag set, else "transient". */
function daemonColdStartGbDefault() {
  return it("tengu_quiet_harbor", !1) ? "ask" : "transient";
}

/** Returns the human-readable noun for the background supervisor. */
function bgSupervisorNoun() {
  return isDaemonServiceInstallEnabled() ? "daemon" : "background service";
}

/** Returns the capitalized version of the background supervisor noun. */
function bgSupervisorNounCap() {
  return fk(bgSupervisorNoun());
}

/** Returns a CLI hint string for the daemon command, or empty string if daemon CLI is not enabled. */
function daemonHint(command: any) {
  return isDaemonCliEnabled() ? ` — run 'claude daemon ${command}'` : "";
}

/** Prints an error to stderr and exits when a fleet gate is rejected. */
function fleetGateRejected(featureName: any, reason: any) {
  let message = reason ?? S$r() ?? "is not available in this environment";
  process.stderr.write(`'${featureName}' ${message}.
`), process.exit(1);
}

/** Launch composer is currently disabled. */
function isLaunchComposerEnabled() {
  return !1;
}

/** shouldShowLaunchComposer always returns false (feature disabled). */
function shouldShowLaunchComposer(context: any) {
  return !1;
}

/** Reads and deletes the agent view relaunch marker from the environment. */
function consumeAgentViewRelaunchMarker() {
  let markerValue = nt(process.env[AGENT_VIEW_RELAUNCH_ENV_KEY]);
  return delete process.env[AGENT_VIEW_RELAUNCH_ENV_KEY], markerValue;
}

/** Environment variable key used to signal an agent view relaunch. */
var AGENT_VIEW_RELAUNCH_ENV_KEY = "CLAUDE_CODE_AGENT_VIEW_RELAUNCH";

// Module initialization: run dependency side-effects
var fC = b(() => {
  jn();
  AR();
  dn();
  mg();
  lk();
  lr();
  vbn();
});

export {wbn,isAgentsFleetEnabled,ensureFleetGateHydrated,isDaemonCliEnabled,isDaemonWorkerRegistryEnabled,isDaemonServiceInstallEnabled,isDaemonServiceRecalled,daemonColdStartGbDefault,bgSupervisorNoun,bgSupervisorNounCap,daemonHint,fleetGateRejected,isLaunchComposerEnabled,shouldShowLaunchComposer,consumeAgentViewRelaunchMarker,AGENT_VIEW_RELAUNCH_ENV_KEY,fC};
