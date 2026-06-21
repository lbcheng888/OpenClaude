// @ts-nocheck
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {WYn,yPo} from "../../vendor/m5304.ts";
import {N3e,OFt,B3e} from "../../vendor/m3753.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {isAutoUpdaterDisabled,getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {bat,vat,$3e,Eat,Cat,NFt,wat,Cge} from "../config/3756_minVersion.ts";
import {hJ,rDe} from "../../vendor/m4516.ts";
import {cE} from "../../vendor/m2206.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {_T,$u} from "../mcp/2194_mcpServerName.ts";
import {st,fromEnum} from "../../vendor/m5.ts";
import {VFt} from "../config/3762_level.ts";
import {wge,SHe} from "../../vendor/m3758.ts";
import {q3e,Rat} from "../../vendor/m3756.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Bs,rA} from "../../vendor/m2550.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {sn} from "../config/0047_namespace.ts";
import {wY} from "../../vendor/m3762.ts";
import {Te} from "../../vendor/m2253.ts";
function T4l({
  isUpdating: e,
  onChangeIsUpdating: t,
  showSuccessMessage: n,
  verbose: r
}) {
  // Read auto-updater result and store dispatch from global state
  let autoUpdaterResult: any = mt((h: any) => h.autoUpdaterResult),
    storeDispatch: any = bo(),
    // Track known version strings: {global: currentVersion, latest: latestAvailable}
    [versionInfo, setVersionInfo] = ZG.useState({}),
    // Whether the install location is a local npm install
    [isLocalInstall, setIsLocalInstall] = ZG.useState(!1),
    // Whether the latest remote version is newer than currently installed
    latestIsNewer: any = WYn(autoUpdaterResult?.version);
  // Detect local npm install once on mount
  ZG.useEffect(() => {
    N3e().then(setIsLocalInstall);
  }, []);
  // Refs to capture latest values inside async callbacks without stale closures
  let isUpdatingRef: any = ZG.useRef(e),
    statusRef: any = ZG.useRef(autoUpdaterResult?.status),
    exeLockFailuresRef: any = ZG.useRef(autoUpdaterResult?.consecutiveExeLockFailures ?? 0);
  ZG.useEffect(() => {
    isUpdatingRef.current = e, statusRef.current = autoUpdaterResult?.status, exeLockFailuresRef.current = autoUpdaterResult?.consecutiveExeLockFailures ?? 0;
  });
  // Core update-check function — runs on mount and on a 30-minute interval
  let f = ZG.useCallback(async () => {
    // Skip if an update is already in progress
    if (isUpdatingRef.current) return;
    // Skip for the rest of the session if we have no write permissions
    if (statusRef.current === "no_permissions") {
      logForDebugging("AutoUpdater: Skipping update check (no_permissions persists this session)");
      return;
    }
    // Skip if the exe has been locked too many consecutive times (damping)
    if (exeLockFailuresRef.current >= Uxm) {
      logForDebugging("AutoUpdater: Skipping update check (claude.exe locked by another process; damped for this session)");
      return;
    }
    if (isAutoUpdaterDisabled()) return;
    if (bat()) return;
    let currentVersion: any = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION,
      // npm registry client
      npmClient: any = hJ(),
      // Latest version published to npm
      latestPublishedVersion: any = await vat(npmClient),
      // Max version cap and force-downgrade flag from remote config
      {
        maxVersion: maxVersionCap,
        forceDowngradeEnabled: isForceDowngrade
      } = await $3e(),
      // The version we will actually install (null = no update needed)
      targetVersion: any = null,
      // Whether this run is a forced downgrade
      isDowngrade: any = !1;
    // Handle forced downgrade: if enabled and a maxVersion is set, check if we need to step back
    if (isForceDowngrade && maxVersionCap) {
      if (isDowngrade = Eat(currentVersion, maxVersionCap, "auto_updater"), isDowngrade) targetVersion = maxVersionCap;
    }
    // Determine the best version to install, respecting the maxVersion cap
    if (!targetVersion && latestPublishedVersion) {
      if (maxVersionCap && cE(latestPublishedVersion, maxVersionCap)) {
        if (logForDebugging(`AutoUpdater: maxVersion ${maxVersionCap} is set, capping update from ${latestPublishedVersion} to ${maxVersionCap}`), cE(maxVersionCap, currentVersion)) targetVersion = maxVersionCap;else logForDebugging(`AutoUpdater: current version ${currentVersion} is already at or above maxVersion ${maxVersionCap}, skipping update`);
      } else if (cE(latestPublishedVersion, currentVersion)) targetVersion = latestPublishedVersion;
    }
    // Refresh the version display (verbose mode)
    if (setVersionInfo({
      global: currentVersion,
      latest: targetVersion ?? latestPublishedVersion
    }),
    // Nothing to install or already at target
    !targetVersion || Cat(targetVersion)) return;
    if (isDowngrade) logEvent("tengu_auto_updater_forced_downgrade", {
      from_version: _T(currentVersion),
      to_version: _T(targetVersion)
    });
    let updateStartTime: any = Date.now();
    t(!0); // signal "updating" to parent
    let globalConfig: any = getGlobalConfig();
    // Verify npm prefix is writable (skip for native installs)
    if (globalConfig.installMethod !== "native" && !st(process.env.DISABLE_INSTALLATION_CHECKS)) await VFt();
    // Detect which installation type is active
    let installationType: any = await wge();
    if (logForDebugging(`AutoUpdater: Detected installation type: ${installationType}`), installationType === "development") {
      logForDebugging("AutoUpdater: Cannot auto-update development build"), t(!1);
      return;
    }
    // updateOutcome: result status string; installMethod: "local"|"global"; globalUpdateResult: carries failureHint
    let updateOutcome: any, installMethod: any, globalUpdateResult: any;
    if (installationType === "npm-local") logForDebugging("AutoUpdater: Using local update method"), installMethod = "local", updateOutcome = await OFt(npmClient, targetVersion);else if (installationType === "npm-global") logForDebugging("AutoUpdater: Using global update method"), installMethod = "global", globalUpdateResult = await NFt(targetVersion), updateOutcome = globalUpdateResult.status;else if (installationType === "native") {
      logForDebugging("AutoUpdater: Unexpected native installation in non-native updater"), t(!1);
      return;
    } else {
      // Unknown install type — fall back to config-declared install method
      logForDebugging("AutoUpdater: Unknown installation type, falling back to config");
      let isLocalFallback: any = globalConfig.installMethod === "local";
      if (installMethod = isLocalFallback ? "local" : "global", isLocalFallback) updateOutcome = await OFt(npmClient, targetVersion);else globalUpdateResult = await NFt(targetVersion), updateOutcome = globalUpdateResult.status;
    }
    t(!1); // done updating
    let failureHint: any = globalUpdateResult?.failureHint;
    // Record outcome to update-history (unless the install is still in progress)
    if (updateOutcome !== "in_progress") q3e({
      timestamp: new Date().toISOString(),
      path: installMethod === "local" ? "npm-local" : "npm-global",
      outcome: updateOutcome === "success" ? "success" : "failed",
      status: updateOutcome,
      version_from: currentVersion,
      version_to: targetVersion,
      error_code: updateOutcome === "install_failed" && wat() ? "update_apply_restore_failed" : failureHint === "windows_running_exe_lock" ? "update_apply_exe_locked" : null
    });
    if (updateOutcome === "success") logEvent("tengu_auto_updater_success", {
      fromVersion: _T(currentVersion),
      toVersion: _T(targetVersion),
      durationMs: Date.now() - updateStartTime,
      wasMigrated: installMethod === "local",
      installationType: fromEnum(installationType)
    });else if (updateOutcome !== "in_progress") logEvent("tengu_auto_updater_fail", {
      fromVersion: _T(currentVersion),
      attemptedVersion: _T(targetVersion),
      status: updateOutcome,
      durationMs: Date.now() - updateStartTime,
      wasMigrated: installMethod === "local",
      installationType: fromEnum(installationType)
    });
    // Commit the new auto-updater result to global store; skip if nothing changed
    storeDispatch((prevState: any) => {
      let prevResult: any = prevState.autoUpdaterResult,
        prevExeLockFailures: any = prevResult?.consecutiveExeLockFailures ?? 0,
        newExeLockFailures: any = updateOutcome === "in_progress" ? prevExeLockFailures : failureHint === "windows_running_exe_lock" ? prevExeLockFailures + 1 : 0;
      if (prevResult?.version === targetVersion && prevResult?.status === updateOutcome && prevResult?.failureHint === failureHint && (prevResult?.consecutiveExeLockFailures ?? 0) === newExeLockFailures) return prevState;
      return {
        ...prevState,
        autoUpdaterResult: {
          version: targetVersion,
          status: updateOutcome,
          failureHint: failureHint,
          consecutiveExeLockFailures: newExeLockFailures
        }
      };
    });
  }, [storeDispatch]);
  // Run immediately on mount, then every 30 minutes
  if (ZG.useEffect(() => {
    f();
  }, [f]), useInterval(f, 1800000),
  // Render nothing until we have enough data to show something meaningful
  !autoUpdaterResult?.version && (!versionInfo.global || !versionInfo.latest)) return null;
  if (!autoUpdaterResult?.version && !e) return null;
  // Detect restore-failure hint for the "binary could not be restored" error case
  let restoreFailureInfo: any = autoUpdaterResult?.status === "install_failed" ? wat() : null;
  return vp.createElement(Box, {
    flexDirection: "row",
    gap: 1
  },
  // Verbose debug line showing global/latest versions
  r && vp.createElement(Text, {
    dimColor: !0,
    wrap: "truncate"
  }, "globalVersion: ", versionInfo.global, " \xB7 latestVersion:", " ", versionInfo.latest),
  // Currently updating
  e ? vp.createElement(vp.Fragment, null, vp.createElement(Box, null, vp.createElement(Text, {
    color: "text",
    dimColor: !0,
    wrap: "truncate"
  }, "Auto-updating…")))
  // Update succeeded — prompt user to restart
  : autoUpdaterResult?.status === "success" && n && latestIsNewer && vp.createElement(Text, {
    color: "success",
    wrap: "truncate"
  }, vp.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Update installed \xB7 Restart to apply"),
  // No write permissions to npm prefix
  autoUpdaterResult?.status === "no_permissions" && vp.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, vp.createElement(Bs, {
    status: "error",
    withSpace: !0
  }), "Auto-update failed: no write permission to npm prefix \xB7 Run", " ", vp.createElement(Text, {
    bold: !0
  }, "/doctor")),
  // Install failed — show specific recovery instructions
  autoUpdaterResult?.status === "install_failed" && (restoreFailureInfo
  // Binary could not be restored after the failed update
  ? vp.createElement(Box, {
    flexDirection: "column"
  }, vp.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, vp.createElement(Bs, {
    status: "error",
    withSpace: !0
  }), "Update failed and ", TPo.basename(restoreFailureInfo.originalPath), " could not be restored — it was preserved at:"), vp.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, restoreFailureInfo.preservedPath, " \xB7 rename it back to", " ", TPo.basename(restoreFailureInfo.originalPath), " or run", " ", vp.createElement(Text, {
    bold: !0
  }, "npm i -g ", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.PACKAGE_URL)))
  // Windows: claude.exe locked by another running process
  : autoUpdaterResult.failureHint === "windows_running_exe_lock" ? vp.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, vp.createElement(Bs, {
    status: "error",
    withSpace: !0
  }), "Auto-update failed: claude.exe in use (close other Claude Code sessions, including VS Code) \xB7 Run ", vp.createElement(Text, {
    bold: !0
  }, "/doctor"))
  // Generic install failure
  : vp.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, vp.createElement(Bs, {
    status: "error",
    withSpace: !0
  }), "Auto-update failed \xB7 Try ", vp.createElement(Text, {
    bold: !0
  }, "/doctor"), " or", " ", vp.createElement(Text, {
    bold: !0
  },
  // Show local vs global npm command based on installation type
  isLocalInstall ? `cd ~/.claude/local && npm update ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.PACKAGE_URL}` : `npm i -g ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.PACKAGE_URL}`))));
}
var TPo,
  vp,
  ZG,
  Uxm = 2;
var S4l = b(() => {
  Ct();
  $u();
  yPo();
  ze();
  configProtoStore();
  Cge();
  Qn();
  qe();
  SHe();
  sn();
  Rat();
  B3e();
  wY();
  rDe();
  rA();
  TPo = require("path"), vp = M(Te(), 1), ZG = M(Te(), 1);
});
export {T4l,TPo,vp,ZG,Uxm,S4l};
