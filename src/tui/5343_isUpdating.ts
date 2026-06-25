// @ts-nocheck
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {ZZn,KNo} from "../../vendor/m5341.ts";
import {X4e,u$t,Q4e} from "../../vendor/m3769.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {isAutoUpdaterDisabled as nde,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {bct,Act,tqe,Ect,Cct,m$t,Rct,F_e} from "../config/3772_minVersion.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {fE} from "../../vendor/m2214.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {cT,vu} from "../mcp/2200_mcpServerName.ts";
import {nt} from "../../vendor/m127.ts";
import {E$t} from "../config/3778_level.ts";
import {U_e,c0e} from "../../vendor/m3774.ts";
import {nqe,vct} from "../../vendor/m3772.ts";
import {Le} from "../../vendor/m5.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {dn} from "../config/0137_namespace.ts";
import {rY} from "../../vendor/m3778.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
function k7l({
  isUpdating: e,
  onChangeIsUpdating: t,
  showSuccessMessage: n,
  verbose: r
}) {
  // Read auto-updater result and store dispatch from global state
  let autoUpdaterResult: any = _t((g: any) => g.autoUpdaterResult),
    storeDispatch: any = bo(),
    // Track known version strings: {global: currentVersion, latest: latestAvailable}
    [versionInfo, setVersionInfo] = hV.useState({}),
    // Whether the install location is a local npm install
    [isLocalInstall, setIsLocalInstall] = hV.useState(!1),
    // Whether the latest remote version is newer than currently installed
    latestIsNewer: any = ZZn(autoUpdaterResult?.version);
  // Detect local npm install once on mount
  hV.useEffect(() => {
    X4e().then(setIsLocalInstall);
  }, []);
  // Refs to capture latest values inside async callbacks without stale closures
  let isUpdatingRef: any = hV.useRef(e),
    statusRef: any = hV.useRef(autoUpdaterResult?.status),
    exeLockFailuresRef: any = hV.useRef(autoUpdaterResult?.consecutiveExeLockFailures ?? 0);
  hV.useEffect(() => {
    isUpdatingRef.current = e, statusRef.current = autoUpdaterResult?.status, exeLockFailuresRef.current = autoUpdaterResult?.consecutiveExeLockFailures ?? 0;
  });
  // Core update-check function — runs on mount and on a 30-minute interval
  let f = hV.useCallback(async () => {
    // Skip if an update is already in progress
    if (isUpdatingRef.current) return;
    // Skip for the rest of the session if we have no write permissions
    if (statusRef.current === "no_permissions") {
      A("AutoUpdater: Skipping update check (no_permissions persists this session)");
      return;
    }
    // Skip if the exe has been locked too many consecutive times (damping)
    if (exeLockFailuresRef.current >= h1m) {
      A("AutoUpdater: Skipping update check (claude.exe locked by another process; damped for this session)");
      return;
    }
    if (nde()) return;
    if (bct()) return;
    let currentVersion: any = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      // npm registry client
      npmClient: any = eJ(),
      // Latest version published to npm
      latestPublishedVersion: any = await Act(npmClient),
      // Max version cap and force-downgrade flag from remote config
      {
        maxVersion: maxVersionCap,
        forceDowngradeEnabled: isForceDowngrade
      } = await tqe(),
      // The version we will actually install (null = no update needed)
      targetVersion: any = null,
      // Whether this run is a forced downgrade
      isDowngrade: any = !1;
    // Handle forced downgrade: if enabled and a maxVersion is set, check if we need to step back
    if (isForceDowngrade && maxVersionCap) {
      if (isDowngrade = Ect(currentVersion, maxVersionCap, "auto_updater"), isDowngrade) targetVersion = maxVersionCap;
    }
    // Determine the best version to install, respecting the maxVersion cap
    if (!targetVersion && latestPublishedVersion) {
      if (maxVersionCap && fE(latestPublishedVersion, maxVersionCap)) {
        if (A(`AutoUpdater: maxVersion ${maxVersionCap} is set, capping update from ${latestPublishedVersion} to ${maxVersionCap}`), fE(maxVersionCap, currentVersion)) targetVersion = maxVersionCap;else A(`AutoUpdater: current version ${currentVersion} is already at or above maxVersion ${maxVersionCap}, skipping update`);
      } else if (fE(latestPublishedVersion, currentVersion)) targetVersion = latestPublishedVersion;
    }
    // Refresh the version display (verbose mode); nothing to install or already at target
    if (setVersionInfo({
      global: currentVersion,
      latest: targetVersion ?? latestPublishedVersion
    }), !targetVersion || Cct(targetVersion)) return;
    if (isDowngrade) W("tengu_auto_updater_forced_downgrade", {
      from_version: cT(currentVersion),
      to_version: cT(targetVersion)
    });
    let updateStartTime: any = Date.now();
    t(!0); // signal "updating" to parent
    let globalConfig: any = Ot();
    // Verify npm prefix is writable (skip for native installs)
    if (globalConfig.installMethod !== "native" && !nt(process.env.DISABLE_INSTALLATION_CHECKS)) await E$t();
    // Detect which installation type is active
    let installationType: any = await U_e();
    if (A(`AutoUpdater: Detected installation type: ${installationType}`), installationType === "development") {
      A("AutoUpdater: Cannot auto-update development build"), t(!1);
      return;
    }
    // updateOutcome: result status string; installMethod: "local"|"global"; globalUpdateResult: carries failureHint
    let updateOutcome: any, installMethod: any, globalUpdateResult: any;
    if (installationType === "npm-local") A("AutoUpdater: Using local update method"), installMethod = "local", updateOutcome = await u$t(npmClient, targetVersion);else if (installationType === "npm-global") A("AutoUpdater: Using global update method"), installMethod = "global", globalUpdateResult = await m$t(targetVersion), updateOutcome = globalUpdateResult.status;else if (installationType === "native") {
      A("AutoUpdater: Unexpected native installation in non-native updater"), t(!1);
      return;
    } else {
      // Unknown install type — fall back to config-declared install method
      A("AutoUpdater: Unknown installation type, falling back to config");
      let isLocalFallback: any = globalConfig.installMethod === "local";
      if (installMethod = isLocalFallback ? "local" : "global", isLocalFallback) updateOutcome = await u$t(npmClient, targetVersion);else globalUpdateResult = await m$t(targetVersion), updateOutcome = globalUpdateResult.status;
    }
    t(!1); // done updating
    let failureHint: any = globalUpdateResult?.failureHint;
    // Record outcome to update-history (unless the install is still in progress)
    if (updateOutcome !== "in_progress") nqe({
      timestamp: new Date().toISOString(),
      path: installMethod === "local" ? "npm-local" : "npm-global",
      outcome: updateOutcome === "success" ? "success" : "failed",
      status: updateOutcome,
      version_from: currentVersion,
      version_to: targetVersion,
      error_code: updateOutcome === "install_failed" && Rct() ? "update_apply_restore_failed" : failureHint === "windows_running_exe_lock" ? "update_apply_exe_locked" : null
    });
    if (updateOutcome === "success") W("tengu_auto_updater_success", {
      fromVersion: cT(currentVersion),
      toVersion: cT(targetVersion),
      durationMs: Date.now() - updateStartTime,
      wasMigrated: installMethod === "local",
      installationType: Le(installationType)
    });else if (updateOutcome !== "in_progress") W("tengu_auto_updater_fail", {
      fromVersion: cT(currentVersion),
      attemptedVersion: cT(targetVersion),
      status: updateOutcome,
      durationMs: Date.now() - updateStartTime,
      wasMigrated: installMethod === "local",
      installationType: Le(installationType)
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
  // Run immediately on mount, then every 30 minutes; render nothing until we have enough data to show something meaningful
  if (hV.useEffect(() => {
    f();
  }, [f]), zc(f, 1800000), !autoUpdaterResult?.version && (!versionInfo.global || !versionInfo.latest)) return null;
  if (!autoUpdaterResult?.version && !e) return null;
  // Detect restore-failure hint for the "binary could not be restored" error case
  let restoreFailureInfo: any = autoUpdaterResult?.status === "install_failed" ? Rct() : null;
  return VC.jsxs($, {
    flexDirection: "row",
    gap: 1,
    children: [
      // Verbose debug line showing global/latest versions
      r && VC.jsxs(v, {
      dimColor: !0,
      wrap: "truncate",
      children: ["globalVersion: ", versionInfo.global, " \xB7 latestVersion:", " ", versionInfo.latest]
    }),
      // Currently updating
      e ? VC.jsx(VC.Fragment, {
      children: VC.jsx($, {
        children: VC.jsx(v, {
          color: "text",
          dimColor: !0,
          wrap: "truncate",
          children: "Auto-updating…"
        })
      })
    }) :
      // Update succeeded — prompt user to restart
      autoUpdaterResult?.status === "success" && n && latestIsNewer && VC.jsxs(v, {
      color: "success",
      wrap: "truncate",
      children: [VC.jsx(bs, {
        status: "success",
        withSpace: !0
      }), "Update installed \xB7 Restart to apply"]
    }),
      // No write permissions to npm prefix
      autoUpdaterResult?.status === "no_permissions" && VC.jsxs(v, {
      color: "error",
      wrap: "truncate",
      children: [VC.jsx(bs, {
        status: "error",
        withSpace: !0
      }), "Auto-update failed: no write permission to npm prefix \xB7 Run", " ", VC.jsx(v, {
        bold: !0,
        children: "/doctor"
      })]
    }),
      // Install failed — show specific recovery instructions
      autoUpdaterResult?.status === "install_failed" && (restoreFailureInfo ?
      // Binary could not be restored after the failed update
      VC.jsxs($, {
      flexDirection: "column",
      children: [VC.jsxs(v, {
        color: "error",
        wrap: "truncate",
        children: [VC.jsx(bs, {
          status: "error",
          withSpace: !0
        }), "Update failed and ", zNo.basename(restoreFailureInfo.originalPath), " could not be restored — it was preserved at:"]
      }), VC.jsxs(v, {
        color: "error",
        wrap: "truncate",
        children: [restoreFailureInfo.preservedPath, " \xB7 rename it back to", " ", zNo.basename(restoreFailureInfo.originalPath), " or run", " ", VC.jsxs(v, {
          bold: !0,
          children: ["npm i -g ", {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.190",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-24T02:21:52Z",
            GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
          }.PACKAGE_URL]
        })]
      })]
    }) :
      // Windows: claude.exe locked by another running process
      autoUpdaterResult.failureHint === "windows_running_exe_lock" ? VC.jsxs(v, {
      color: "error",
      wrap: "truncate",
      children: [VC.jsx(bs, {
        status: "error",
        withSpace: !0
      }), "Auto-update failed: claude.exe in use (close other Claude Code sessions, including VS Code) \xB7 Run ", VC.jsx(v, {
        bold: !0,
        children: "/doctor"
      })]
    }) :
      // Generic install failure
      VC.jsxs(v, {
      color: "error",
      wrap: "truncate",
      children: [VC.jsx(bs, {
        status: "error",
        withSpace: !0
      }), "Auto-update failed \xB7 Try ", VC.jsx(v, {
        bold: !0,
        children: "/doctor"
      }), " or", " ", VC.jsx(v, {
        bold: !0,
        // Show local vs global npm command based on installation type
        children: isLocalInstall ? `cd ~/.claude/local && npm update ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.PACKAGE_URL}` : `npm i -g ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.PACKAGE_URL}`
      })]
    }))]
  });
}
var zNo,
  hV,
  VC,
  h1m = 2;
var H7l = b(() => {
  kt();
  vu();
  KNo();
  je();
  uo();
  F_e();
  tr();
  qe();
  c0e();
  dn();
  vct();
  Q4e();
  rY();
  ZDe();
  ff();
  zNo = require("path"), hV = x(et(), 1), VC = x(oe(), 1);
});

export {k7l,zNo,hV,VC,h1m,H7l};
