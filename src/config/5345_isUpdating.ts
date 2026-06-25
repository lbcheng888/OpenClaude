// @ts-nocheck
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {rqe,f$t,_Un} from "../../vendor/m3773.ts";
import {isAutoUpdaterDisabled as nde,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {bct,mUn,p$t,dUn,Cct,F_e} from "./3772_minVersion.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {fE,U0} from "../../vendor/m2214.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {nt} from "../../vendor/m127.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {dn} from "./0137_namespace.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Package-manager auto-updater UI/logic for Claude Code.
 *
 * Builds the upgrade argv / human command for the detected package manager
 * (homebrew / winget / mise / apk), then runs a periodic check that, when an
 * update is available and auto-update is enabled, executes the upgrade and
 * reports start/success/fail telemetry. Renders a small status line.
 *
 * NOTE: the component body uses the React Compiler memoization cache (the
 * `cache[N]` slots). Each slot pair stores a dependency value and the memoized
 * result; the original structure must be preserved exactly.
 */

/** Build the upgrade command argv for a package manager (or null if unhandled). */
function buildUpgradeArgv(packageManager: string, formula: string | null): string[] | null {
  switch (packageManager) {
    case "homebrew":
      return ["brew", "upgrade", "--cask", formula ?? "claude-code"];
    case "winget":
      {
        let localAppData: string | undefined = process.env.LOCALAPPDATA;
        return [localAppData ? M7l.join(localAppData, "Microsoft", "WindowsApps", "winget.exe") : "winget", "upgrade", "--id", "Anthropic.ClaudeCode", "--exact", "--silent", "--disable-interactivity"];
      }
    default:
      return null;
  }
}

/** Human-readable upgrade command string shown to the user. */
function buildUpgradeCommand(packageManager: string, formula: string | null): string {
  switch (packageManager) {
    case "homebrew":
      return `brew upgrade ${formula ?? "claude-code"}`;
    case "winget":
      return "winget upgrade Anthropic.ClaudeCode";
    case "mise":
      return "mise upgrade claude";
    case "apk":
      return "apk upgrade claude-code";
    default:
      return "your package manager update command";
  }
}

interface PackageManagerAutoUpdaterProps {
  isUpdating: boolean;
  onChangeIsUpdating: (updating: boolean) => void;
  showSuccessMessage: boolean;
  verbose: boolean;
}

function N7l(props: PackageManagerAutoUpdaterProps) {
  let cache = O7l.c(37),
    {
      isUpdating: isUpdating,
      onChangeIsUpdating: onChangeIsUpdating,
      showSuccessMessage: showSuccessMessage,
      verbose: verbose
    } = props,
    autoUpdaterResult = _t(S1m),
    dispatch = bo(),
    [availableUpdate, setAvailableUpdate] = UJ.useState(eer),
    [packageManager, setPackageManager] = UJ.useState("unknown"),
    [formula, setFormula] = UJ.useState(null),
    isUpdatingRef = UJ.useRef(isUpdating),
    syncIsUpdatingRef;
  if (cache[0] !== isUpdating) syncIsUpdatingRef = () => {
    isUpdatingRef.current = isUpdating;
  }, cache[0] = isUpdating, cache[1] = syncIsUpdatingRef;else syncIsUpdatingRef = cache[1];
  UJ.useEffect(syncIsUpdatingRef);
  let autoUpdaterResultRef = UJ.useRef(autoUpdaterResult),
    syncAutoUpdaterResultRef;
  if (cache[2] !== autoUpdaterResult) syncAutoUpdaterResultRef = () => {
    autoUpdaterResultRef.current = autoUpdaterResult;
  }, cache[2] = autoUpdaterResult, cache[3] = syncAutoUpdaterResultRef;else syncAutoUpdaterResultRef = cache[3];
  UJ.useEffect(syncAutoUpdaterResultRef);
  let detectPackageManager, detectPackageManagerDeps;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) detectPackageManager = () => {
    rqe().then(detected => {
      if (setPackageManager(detected), detected === "homebrew") setFormula(f$t());
    });
  }, detectPackageManagerDeps = [], cache[4] = detectPackageManager, cache[5] = detectPackageManagerDeps;else detectPackageManager = cache[4], detectPackageManagerDeps = cache[5];
  UJ.useEffect(detectPackageManager, detectPackageManagerDeps);
  let runUpdateCheck;
  if (cache[6] !== onChangeIsUpdating || cache[7] !== dispatch) runUpdateCheck = async () => {
    if (isUpdatingRef.current) return;
    if (autoUpdaterResultRef.current?.status === "success") return;
    if (nde()) return;
    if (bct()) return;
    if (autoUpdaterResultRef.current?.status === "install_failed") {
      if (Date.now() - D7l < P7l) return;
      autoUpdaterResultRef.current = null, dispatch(T1m);
    }
    let [currentVersion, detectedPackageManager] = await Promise.all([eJ(), rqe()]),
      versionForLookup = currentVersion,
      homebrewFormula = null;
    if (detectedPackageManager === "homebrew") homebrewFormula = f$t(), versionForLookup = homebrewFormula === "claude-code@latest" ? "latest" : "stable";
    let latestVersion = detectedPackageManager === "homebrew" ? await mUn(homebrewFormula ?? "claude-code", versionForLookup) : await p$t(versionForLookup),
      maxVersion = await dUn(),
      cappedByMaxVersion = !1;
    if (maxVersion && latestVersion && fE(latestVersion, maxVersion)) {
      if (A(`PackageManagerAutoUpdater: maxVersion ${maxVersion} is set, capping update from ${latestVersion} to ${maxVersion}`), U0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION, maxVersion)) {
        A(`PackageManagerAutoUpdater: current version ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION} is already at or above maxVersion ${maxVersion}, skipping update`), eer = null, setAvailableUpdate(null);
        return;
      }
      latestVersion = maxVersion, cappedByMaxVersion = !0;
    }
    let nextVersion = latestVersion && !U0({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, latestVersion) && !Cct(latestVersion);
    if (eer = nextVersion ? latestVersion : null, setAvailableUpdate(eer), !nextVersion) return;
    A(`PackageManagerAutoUpdater: Update available ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION} -> ${latestVersion}`);
    let autoUpdateEnabled = nt(process.env.CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE),
      upgradeArgv = buildUpgradeArgv(detectedPackageManager, homebrewFormula);
    if (!autoUpdateEnabled || !upgradeArgv || cappedByMaxVersion) return;
    if (isUpdatingRef.current) return;
    onChangeIsUpdating(!0);
    let startedAt = Date.now(),
      telemetryBase = {
        pm_homebrew: detectedPackageManager === "homebrew",
        pm_winget: detectedPackageManager === "winget"
      };
    W("tengu_pkg_manager_auto_updater_start", telemetryBase);
    let [command, ...args] = upgradeArgv,
      result = await Wr(command, args, {
        cwd: L7l.homedir(),
        timeout: 300000,
        env: detectedPackageManager === "homebrew" ? {
          ...process.env,
          HOMEBREW_NO_AUTO_UPDATE: ""
        } : void 0
      }),
      elapsedMs = Date.now() - startedAt;
    if (onChangeIsUpdating(!1), result.code === 0) W("tengu_pkg_manager_auto_updater_success", {
      ...telemetryBase,
      latency_ms: elapsedMs
    }), dispatch(prevState => {
      let prevResult = prevState.autoUpdaterResult;
      if (prevResult?.version === latestVersion && prevResult?.status === "success") return prevState;
      return {
        ...prevState,
        autoUpdaterResult: {
          version: latestVersion,
          status: "success"
        }
      };
    });else A(`PackageManagerAutoUpdater: ${command} exited ${result.code}: ${result.stderr || result.error || result.stdout}`), W("tengu_pkg_manager_auto_updater_fail", {
      ...telemetryBase,
      latency_ms: elapsedMs,
      exit_code: result.code
    }), D7l = Date.now(), dispatch(prevState => {
      if (prevState.autoUpdaterResult?.status === "install_failed") return prevState;
      return {
        ...prevState,
        autoUpdaterResult: {
          version: latestVersion,
          status: "install_failed"
        }
      };
    });
  }, cache[6] = onChangeIsUpdating, cache[7] = dispatch, cache[8] = runUpdateCheck;else runUpdateCheck = cache[8];
  let updateCheck = runUpdateCheck,
    triggerUpdateCheck,
    triggerUpdateCheckDeps;
  if (cache[9] !== updateCheck) triggerUpdateCheck = () => {
    updateCheck();
  }, triggerUpdateCheckDeps = [updateCheck], cache[9] = updateCheck, cache[10] = triggerUpdateCheck, cache[11] = triggerUpdateCheckDeps;else triggerUpdateCheck = cache[10], triggerUpdateCheckDeps = cache[11];
  if (UJ.useEffect(triggerUpdateCheck, triggerUpdateCheckDeps), zc(updateCheck, P7l), autoUpdaterResult?.status === "success") {
    if (!showSuccessMessage) return null;
    let successCurrentLine;
    if (cache[12] !== autoUpdaterResult || cache[13] !== verbose) successCurrentLine = verbose && gV.jsxs(v, {
      dimColor: !0,
      wrap: "truncate",
      children: ["current: ", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION, " \xB7 latest:", " ", autoUpdaterResult.version]
    }), cache[12] = autoUpdaterResult, cache[13] = verbose, cache[14] = successCurrentLine;else successCurrentLine = cache[14];
    let viaSuffix = packageManager !== "unknown" && ` via ${packageManager}`,
      successInstalledLine;
    if (cache[15] !== viaSuffix) successInstalledLine = gV.jsxs(v, {
      color: "success",
      wrap: "truncate",
      children: ["✓ Update installed", viaSuffix, " \xB7 Restart to apply"]
    }), cache[15] = viaSuffix, cache[16] = successInstalledLine;else successInstalledLine = cache[16];
    let successView;
    if (cache[17] !== successInstalledLine || cache[18] !== successCurrentLine) successView = gV.jsxs($, {
      flexDirection: "row",
      gap: 1,
      children: [successCurrentLine, successInstalledLine]
    }), cache[17] = successInstalledLine, cache[18] = successCurrentLine, cache[19] = successView;else successView = cache[19];
    return successView;
  }
  if (isUpdating) {
    let updatingText = packageManager === "unknown" ? "Updating…" : `Updating via ${packageManager}…`,
      updatingView;
    if (cache[20] !== updatingText) updatingView = gV.jsx(v, {
      dimColor: !0,
      wrap: "truncate",
      children: updatingText
    }), cache[20] = updatingText, cache[21] = updatingView;else updatingView = cache[21];
    return updatingView;
  }
  let installFailed = autoUpdaterResult?.status === "install_failed";
  if (!availableUpdate && !installFailed || packageManager === "unknown") return null;
  let currentVersionLine;
  if (cache[22] !== verbose) currentVersionLine = verbose && gV.jsxs(v, {
    dimColor: !0,
    wrap: "truncate",
    children: ["currentVersion: ", {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION]
  }), cache[22] = verbose, cache[23] = currentVersionLine;else currentVersionLine = cache[23];
  let upgradeCommand;
  if (cache[24] !== formula || cache[25] !== packageManager) upgradeCommand = buildUpgradeCommand(packageManager, formula), cache[24] = formula, cache[25] = packageManager, cache[26] = upgradeCommand;else upgradeCommand = cache[26];
  let upgradeCommandText;
  if (cache[27] !== upgradeCommand) upgradeCommandText = gV.jsx(v, {
    bold: !0,
    children: upgradeCommand
  }), cache[27] = upgradeCommand, cache[28] = upgradeCommandText;else upgradeCommandText = cache[28];
  let autoUpdateFailedNote;
  if (cache[29] !== installFailed) autoUpdateFailedNote = installFailed && gV.jsx(v, {
    dimColor: !0,
    children: " (auto-update failed)"
  }), cache[29] = installFailed, cache[30] = autoUpdateFailedNote;else autoUpdateFailedNote = cache[30];
  let updateAvailableLine;
  if (cache[31] !== upgradeCommandText || cache[32] !== autoUpdateFailedNote) updateAvailableLine = gV.jsxs(v, {
    color: "warning",
    wrap: "truncate",
    children: ["Update available! Run:", " ", upgradeCommandText, autoUpdateFailedNote]
  }), cache[31] = upgradeCommandText, cache[32] = autoUpdateFailedNote, cache[33] = updateAvailableLine;else updateAvailableLine = cache[33];
  let updateAvailableView;
  if (cache[34] !== updateAvailableLine || cache[35] !== currentVersionLine) updateAvailableView = gV.jsxs(gV.Fragment, {
    children: [currentVersionLine, updateAvailableLine]
  }), cache[34] = updateAvailableLine, cache[35] = currentVersionLine, cache[36] = updateAvailableView;else updateAvailableView = cache[36];
  return updateAvailableView;
}

/** Reducer: clear a previous install_failed auto-updater result. */
function T1m(state: any) {
  return state.autoUpdaterResult?.status === "install_failed" ? {
    ...state,
    autoUpdaterResult: null
  } : state;
}

/** Selector: read the auto-updater result from app state. */
function S1m(state: any) {
  return state.autoUpdaterResult;
}

var O7l,
  L7l,
  M7l,
  UJ,
  gV,
  D7l = 0,
  P7l = 1800000,
  eer = null;
var F7l = b(() => {
  kt();
  je();
  uo();
  F_e();
  tr();
  qe();
  dn();
  Ii();
  _Un();
  ZDe();
  O7l = x(tt(), 1), L7l = require("os"), M7l = require("path"), UJ = x(et(), 1), gV = x(oe(), 1);
});

export {buildUpgradeArgv as _1m,buildUpgradeCommand as y1m,N7l,T1m,S1m,O7l,L7l,M7l,UJ,gV,D7l,P7l,eer,F7l};
