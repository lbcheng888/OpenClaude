// @ts-nocheck
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {ZZn,KNo} from "../../vendor/m5341.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {isAutoUpdaterDisabled as nde,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {dUn,tPa,bct,F_e} from "./3772_minVersion.ts";
import {fE} from "../../vendor/m2214.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {lqe} from "./3778_level.ts";
import {nqe,vct} from "../../vendor/m3772.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Xd,Ct} from "../../vendor/m197.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {rY} from "../../vendor/m3778.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function classifyUpdateError(message) {
  if (message.includes("timeout")) return "timeout";
  if (message.includes("Checksum mismatch")) return "checksum_mismatch";
  if (message.includes("ENOENT") || message.includes("not found")) return "not_found";
  if (message.includes("EACCES") || message.includes("permission")) return "permission_denied";
  if (message.includes("ENOSPC")) return "disk_full";
  if (message.includes("npm")) return "npm_error";
  if (message.includes("network") || message.includes("ECONNREFUSED") || message.includes("ENOTFOUND")) return "network_error";
  let lower = message.toLowerCase();
  if (message.includes("ENOEXEC") || lower.includes("exec format error") || lower.includes("bad cpu type") || lower.includes("cannot execute binary") || lower.includes("code signature") || lower.includes("gatekeeper") || lower.includes("killed: 9")) return "exec_format";
  if (lower.includes("virus") || lower.includes("quarantine") || lower.includes("defender") || lower.includes("operation did not complete successfully because the file contains")) return "av_quarantine";
  if (message.includes("EXDEV") || message.includes("EEXIST") || message.includes("EBUSY") || lower.includes("rename") || lower.includes("move failed") || lower.includes("cross-device")) return "swap_failure";
  return "unknown";
}
function AutoUpdaterStatus({
  isUpdating: isUpdating,
  onChangeIsUpdating: onChangeIsUpdating,
  showSuccessMessage: showSuccessMessage,
  verbose: verbose
}) {
  let autoUpdaterResult = _t(state => state.autoUpdaterResult),
    setAppState = bo(),
    [versions, setVersions] = BJ.useState({
      current: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    }),
    [versionWarning, setVersionWarning] = BJ.useState(null),
    showSuccess = ZZn(autoUpdaterResult?.version),
    installMethod = eJ(),
    isUpdatingRef = BJ.useRef(isUpdating);
  BJ.useEffect(() => {
    isUpdatingRef.current = isUpdating;
  });
  let autoUpdaterResultRef = BJ.useRef(autoUpdaterResult);
  BJ.useEffect(() => {
    autoUpdaterResultRef.current = autoUpdaterResult;
  });
  let runUpdate = BJ.useCallback(async () => {
    if (isUpdatingRef.current) return;
    if (autoUpdaterResultRef.current?.status === "success") return;
    if (nde()) return;
    let minVersion = await dUn();
    if (minVersion && fE({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, minVersion)) {
      let warning = await tPa();
      setVersionWarning(warning ?? "affects your version");
    }
    if (bct()) return;
    onChangeIsUpdating(true);
    let startTime = Date.now();
    W("tengu_native_auto_updater_start", {});
    try {
      let updateResult = await lqe(installMethod),
        currentVersion = {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION,
        latencyMs = Date.now() - startTime;
      if (updateResult.lockFailed) {
        W("tengu_native_auto_updater_lock_contention", {
          latency_ms: latencyMs
        });
        return;
      }
      if (setVersions({
        current: currentVersion,
        latest: updateResult.latestVersion
      }), updateResult.wasUpdated) nqe({
        timestamp: new Date().toISOString(),
        path: "native",
        outcome: "success",
        status: "success",
        version_from: currentVersion,
        version_to: updateResult.latestVersion ?? null,
        error_code: null
      }), W("tengu_native_auto_updater_success", {
        latency_ms: latencyMs
      }), setAppState(state => {
        let prevResult = state.autoUpdaterResult;
        if (prevResult?.version === updateResult.latestVersion && prevResult?.status === "success") return state;
        return {
          ...state,
          autoUpdaterResult: {
            version: updateResult.latestVersion,
            status: "success"
          }
        };
      });else W("tengu_native_auto_updater_up_to_date", {
        latency_ms: latencyMs
      });
    } catch (err) {
      let latencyMs = Date.now() - startTime,
        errorMessage = err instanceof Error ? err.message : String(err);
      A(`Native auto-updater failed: ${errorMessage}`, {
        level: "error"
      }), nqe({
        timestamp: new Date().toISOString(),
        path: "native",
        outcome: "failed",
        status: "install_failed",
        version_from: {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION,
        version_to: null,
        error_code: null
      });
      let errorCategory = classifyUpdateError(errorMessage),
        errorCode = Xd(err) ?? "none";
      W("tengu_native_auto_updater_fail", {
        latency_ms: latencyMs,
        error_code: errorCode,
        error_timeout: errorCategory === "timeout",
        error_checksum: errorCategory === "checksum_mismatch",
        error_not_found: errorCategory === "not_found",
        error_permission: errorCategory === "permission_denied",
        error_disk_full: errorCategory === "disk_full",
        error_npm: errorCategory === "npm_error",
        error_network: errorCategory === "network_error",
        error_swap_failure: errorCategory === "swap_failure",
        error_exec_format: errorCategory === "exec_format",
        error_av_quarantine: errorCategory === "av_quarantine"
      }), setAppState(state => {
        let prevResult = state.autoUpdaterResult;
        if (prevResult?.version === null && prevResult?.status === "install_failed") return state;
        return {
          ...state,
          autoUpdaterResult: {
            version: null,
            status: "install_failed"
          }
        };
      });
    } finally {
      onChangeIsUpdating(false);
    }
  }, [setAppState, installMethod]);
  BJ.useEffect(() => {
    runUpdate();
  }, [runUpdate]), zc(runUpdate, 1800000);
  let hasResultStatus = !!autoUpdaterResult?.status,
    hasVersions = !!versions.current && !!versions.latest;
  if (!(!!versionWarning || hasResultStatus || isUpdating && hasVersions)) return null;
  return Gne.jsxs($, {
    flexDirection: "row",
    gap: 1,
    children: [verbose && Gne.jsxs(v, {
      dimColor: true,
      wrap: "truncate",
      children: ["current: ", versions.current, " \xB7 ", installMethod, ": ", versions.latest]
    }), isUpdating ? Gne.jsx($, {
      children: Gne.jsx(v, {
        dimColor: true,
        wrap: "truncate",
        children: "Checking for updates"
      })
    }) : autoUpdaterResult?.status === "success" && showSuccessMessage && showSuccess && Gne.jsxs(v, {
      color: "success",
      wrap: "truncate",
      children: [Gne.jsx(bs, {
        status: "success",
        withSpace: true
      }), "Update installed \xB7 Restart to update"]
    }), autoUpdaterResult?.status === "install_failed" && Gne.jsxs(v, {
      color: "error",
      wrap: "truncate",
      children: [Gne.jsx(bs, {
        status: "error",
        withSpace: true
      }), "Auto-update failed \xB7 Run ", Gne.jsx(v, {
        bold: true,
        children: "/doctor"
      })]
    }), versionWarning && false]
  });
}
var BJ, Gne;
var x7l = b(() => {
  kt();
  qe();
  Ct();
  KNo();
  je();
  uo();
  F_e();
  tr();
  vct();
  rY();
  ZDe();
  ff();
  BJ = x(et(), 1), Gne = x(oe(), 1);
});

export {classifyUpdateError as g1m,AutoUpdaterStatus as I7l,BJ,Gne,x7l};
