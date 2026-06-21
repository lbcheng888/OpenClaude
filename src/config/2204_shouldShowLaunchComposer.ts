// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {uQe,GNr,W_n} from "./2203_W_n.ts";
import {hH,Kx} from "../../vendor/m128.ts";
import {yr,y7} from "./0740_updateSettingsForSource.ts";
import {initializeGrowthBook,getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Xx,dr} from "../../vendor/m231.ts";
import {st} from "../../vendor/m5.ts";
import {tk} from "../../vendor/m577.ts";
import {sn} from "./0047_namespace.ts";
/** Module namespace object for all exports in this config module. */
var G_n = {};

// Register all exported symbols onto the module namespace
isFullscreenWithTTY(G_n, {
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
  return !uQe();
}

/** Ensures GrowthBook and settings are hydrated before fleet gate checks. */
async function ensureFleetGateHydrated(options: any = {}) {
  if (hH() === null) {
    let {
      getSettingsWithErrors: getSettingsWithErrors
    } = await Promise.resolve().then(() => (yr(), y7));
    getSettingsWithErrors();
  }
  if (options.kickGrowthBook !== !1) initializeGrowthBook().catch(() => {});
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
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_anchor", !1);
}

/** Checks the GrowthBook feature flag indicating daemon service has been recalled. */
function isDaemonServiceRecalled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_copper_lantern", !1);
}

/** Returns daemon cold-start behavior: "ask" if feature flag set, else "transient". */
function daemonColdStartGbDefault() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_quiet_harbor", !1) ? "ask" : "transient";
}

/** Returns the human-readable noun for the background supervisor. */
function bgSupervisorNoun() {
  return isDaemonServiceInstallEnabled() ? "daemon" : "background service";
}

/** Returns the capitalized version of the background supervisor noun. */
function bgSupervisorNounCap() {
  return Xx(bgSupervisorNoun());
}

/** Returns a CLI hint string for the daemon command, or empty string if daemon CLI is not enabled. */
function daemonHint(command: any) {
  return isDaemonCliEnabled() ? ` — run 'claude daemon ${command}'` : "";
}

/** Prints an error to stderr and exits when a fleet gate is rejected. */
function fleetGateRejected(featureName: any, reason: any) {
  let message = reason ?? GNr() ?? "is not available in this environment";
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
  let markerValue = st(process.env[AGENT_VIEW_RELAUNCH_ENV_KEY]);
  return delete process.env[AGENT_VIEW_RELAUNCH_ENV_KEY], markerValue;
}

/** Environment variable key used to signal an agent view relaunch. */
var AGENT_VIEW_RELAUNCH_ENV_KEY = "CLAUDE_CODE_AGENT_VIEW_RELAUNCH";

// Module initialization: run dependency side-effects
var bv = b(() => {
  zn();
  tk();
  sn();
  Kx();
  dr();
  W_n();
});
export {G_n,isAgentsFleetEnabled,ensureFleetGateHydrated,isDaemonCliEnabled,isDaemonWorkerRegistryEnabled,isDaemonServiceInstallEnabled,isDaemonServiceRecalled,daemonColdStartGbDefault,bgSupervisorNoun,bgSupervisorNounCap,daemonHint,fleetGateRejected,isLaunchComposerEnabled,shouldShowLaunchComposer,consumeAgentViewRelaunchMarker,AGENT_VIEW_RELAUNCH_ENV_KEY,bv};
