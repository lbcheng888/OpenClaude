// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {vf,F0e,pne,q0e,hS} from "./4438_source.ts";
import {nx,$et,XUe} from "../../vendor/m2597.ts";
import {Uv,nI} from "../../vendor/m3252.ts";
import {fqt,qgo} from "./4437_level.ts";
import {Ie,Oe,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {QUe,cDi,sCn} from "../../vendor/m2599.ts";
import {b} from "../../runtime.ts";
import {sn} from "./0047_namespace.ts";
/** Returns true if the official marketplace auto-install is disabled via env var. */
function B2m() {
  return st(process.env.CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL);
}

/** Computes the exponential backoff delay (ms) for a given retry attempt index. */
function GMo(attemptIndex: any) {
  let delayMs = vQn.INITIAL_DELAY_MS * Math.pow(vQn.BACKOFF_MULTIPLIER, attemptIndex);
  return Math.min(delayMs, vQn.MAX_DELAY_MS);
}

/** Returns true if the official marketplace auto-install should be attempted based on current config state. */
function F2m(config: any) {
  if (!config.officialMarketplaceAutoInstallAttempted) return !0;
  if (config.officialMarketplaceAutoInstalled) return !1;
  let failReason = config.officialMarketplaceAutoInstallFailReason,
    retryCount = config.officialMarketplaceAutoInstallRetryCount || 0,
    nextRetryTime = config.officialMarketplaceAutoInstallNextRetryTime,
    now = Date.now();
  if (retryCount >= vQn.MAX_ATTEMPTS) return !1;
  if (failReason === "policy_blocked") return !1;
  if (nextRetryTime && now < nextRetryTime) return !1;
  return failReason === "unknown" || failReason === "git_unavailable" || failReason === "gcs_unavailable" || failReason === void 0;
}

/** Attempts to auto-install the official marketplace plugin, with GCS and git fallback logic. */
async function Eec() {
  let config = getGlobalConfig();
  if (!F2m(config)) {
    let skipReason = config.officialMarketplaceAutoInstalled ? "already_installed" : config.officialMarketplaceAutoInstallFailReason ?? "already_attempted";
    return logForDebugging(`Official marketplace auto-install skipped: ${skipReason}`), {
      installed: !1,
      skipped: !0,
      reason: skipReason
    };
  }
  let usedGit = !1;
  try {
    if (B2m()) return logForDebugging("Official marketplace auto-install disabled via env var, skipping"), saveGlobalConfig(cfg => ({
      ...cfg,
      officialMarketplaceAutoInstallAttempted: !0,
      officialMarketplaceAutoInstalled: !1,
      officialMarketplaceAutoInstallFailReason: "policy_blocked"
    })), logEvent("tengu_official_marketplace_auto_install", {
      installed: !1,
      skipped: !0,
      policy_blocked: !0
    }), {
      installed: !1,
      skipped: !0,
      reason: "policy_blocked"
    };
    if ((await vf())[nx]) return logForDebugging(`Official marketplace '${nx}' already installed, skipping`), saveGlobalConfig(cfg => ({
      ...cfg,
      officialMarketplaceAutoInstallAttempted: !0,
      officialMarketplaceAutoInstalled: !0,
      officialMarketplaceAutoInstallFailReason: void 0,
      officialMarketplaceAutoInstallRetryCount: void 0,
      officialMarketplaceAutoInstallLastAttemptTime: void 0,
      officialMarketplaceAutoInstallNextRetryTime: void 0
    })), {
      installed: !1,
      skipped: !0,
      reason: "already_installed"
    };
    if (!Uv($et)) return logForDebugging("Official marketplace blocked by enterprise policy, skipping"), saveGlobalConfig(cfg => ({
      ...cfg,
      officialMarketplaceAutoInstallAttempted: !0,
      officialMarketplaceAutoInstalled: !1,
      officialMarketplaceAutoInstallFailReason: "policy_blocked"
    })), logEvent("tengu_official_marketplace_auto_install", {
      installed: !1,
      skipped: !0,
      policy_blocked: !0
    }), {
      installed: !1,
      skipped: !0,
      reason: "policy_blocked"
    };
    let pluginsDir = F0e(),
      installPath = bec.join(pluginsDir, nx);
    if ((await fqt(installPath, pluginsDir)) !== null) {
      Ie("plugin_official_marketplace_fetch");
      let plugins = await vf();
      return plugins[nx] = {
        source: $et,
        installLocation: installPath,
        lastUpdated: new Date().toISOString()
      }, await pne(plugins), saveGlobalConfig(cfg => ({
        ...cfg,
        officialMarketplaceAutoInstallAttempted: !0,
        officialMarketplaceAutoInstalled: !0,
        officialMarketplaceAutoInstallFailReason: void 0,
        officialMarketplaceAutoInstallRetryCount: void 0,
        officialMarketplaceAutoInstallLastAttemptTime: void 0,
        officialMarketplaceAutoInstallNextRetryTime: void 0
      })), logEvent("tengu_official_marketplace_auto_install", {
        installed: !0,
        skipped: !1,
        via_gcs: !0
      }), {
        installed: !0,
        skipped: !1
      };
    }
    if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_plugin_official_mkt_git_fallback", !0)) {
      Oe("plugin_official_marketplace_fetch", "gcs_failed_fallback_disabled"), logForDebugging("Official marketplace GCS failed; git fallback disabled by flag — skipping install");
      let retryCount = (config.officialMarketplaceAutoInstallRetryCount || 0) + 1,
        now = Date.now(),
        nextRetry = now + GMo(retryCount);
      return saveGlobalConfig(cfg => ({
        ...cfg,
        officialMarketplaceAutoInstallAttempted: !0,
        officialMarketplaceAutoInstalled: !1,
        officialMarketplaceAutoInstallFailReason: "gcs_unavailable",
        officialMarketplaceAutoInstallRetryCount: retryCount,
        officialMarketplaceAutoInstallLastAttemptTime: now,
        officialMarketplaceAutoInstallNextRetryTime: nextRetry
      })), logEvent("tengu_official_marketplace_auto_install", {
        installed: !1,
        skipped: !0,
        gcs_unavailable: !0,
        retry_count: retryCount
      }), {
        installed: !1,
        skipped: !0,
        reason: "gcs_unavailable"
      };
    }
    if (usedGit = !0, !(await QUe())) {
      Oe("plugin_official_marketplace_fetch", "gcs_failed_git_unavailable"), logForDebugging("Git not available, skipping official marketplace auto-install");
      let retryCount = (config.officialMarketplaceAutoInstallRetryCount || 0) + 1,
        now = Date.now(),
        backoffDelay = GMo(retryCount),
        nextRetry = now + backoffDelay,
        configSaveFailed = !1;
      try {
        saveGlobalConfig(cfg => ({
          ...cfg,
          officialMarketplaceAutoInstallAttempted: !0,
          officialMarketplaceAutoInstalled: !1,
          officialMarketplaceAutoInstallFailReason: "git_unavailable",
          officialMarketplaceAutoInstallRetryCount: retryCount,
          officialMarketplaceAutoInstallLastAttemptTime: now,
          officialMarketplaceAutoInstallNextRetryTime: nextRetry
        }));
      } catch (saveErr) {
        configSaveFailed = !0, logForDebugging(`Failed to save marketplace auto-install git_unavailable state: ${saveErr}`, {
          level: "error"
        });
      }
      return logEvent("tengu_official_marketplace_auto_install", {
        installed: !1,
        skipped: !0,
        git_unavailable: !0,
        retry_count: retryCount
      }), {
        installed: !1,
        skipped: !0,
        reason: "git_unavailable",
        configSaveFailed: configSaveFailed
      };
    }
    logForDebugging("Attempting to auto-install official marketplace"), await q0e($et), logForDebugging("Successfully auto-installed official marketplace");
    let prevRetryCount = config.officialMarketplaceAutoInstallRetryCount || 0;
    return saveGlobalConfig(cfg => ({
      ...cfg,
      officialMarketplaceAutoInstallAttempted: !0,
      officialMarketplaceAutoInstalled: !0,
      officialMarketplaceAutoInstallFailReason: void 0,
      officialMarketplaceAutoInstallRetryCount: void 0,
      officialMarketplaceAutoInstallLastAttemptTime: void 0,
      officialMarketplaceAutoInstallNextRetryTime: void 0
    })), isTmuxControlMode("plugin_official_marketplace_fetch", "gcs_failed_git_fallback"), logEvent("tengu_official_marketplace_auto_install", {
      installed: !0,
      skipped: !1,
      retry_count: prevRetryCount
    }), {
      installed: !0,
      skipped: !1
    };
  } catch (err) {
    let errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes("xcrun: error:")) {
      if (cDi(), usedGit) Oe("plugin_official_marketplace_fetch", "gcs_failed_git_unavailable");
      return logForDebugging("Official marketplace auto-install: git is a non-functional macOS xcrun shim, treating as git_unavailable"), logEvent("tengu_official_marketplace_auto_install", {
        installed: !1,
        skipped: !0,
        git_unavailable: !0,
        macos_xcrun_shim: !0
      }), {
        installed: !1,
        skipped: !0,
        reason: "git_unavailable"
      };
    }
    if (usedGit) Oe("plugin_official_marketplace_fetch", "gcs_and_git_failed");
    logForDebugging(`Failed to auto-install official marketplace: ${errMsg}`, {
      level: "error"
    });
    let retryCount = (config.officialMarketplaceAutoInstallRetryCount || 0) + 1,
      now = Date.now(),
      backoffDelay = GMo(retryCount),
      nextRetry = now + backoffDelay,
      configSaveFailed = !1;
    try {
      saveGlobalConfig(cfg => ({
        ...cfg,
        officialMarketplaceAutoInstallAttempted: !0,
        officialMarketplaceAutoInstalled: !1,
        officialMarketplaceAutoInstallFailReason: "unknown",
        officialMarketplaceAutoInstallRetryCount: retryCount,
        officialMarketplaceAutoInstallLastAttemptTime: now,
        officialMarketplaceAutoInstallNextRetryTime: nextRetry
      }));
    } catch (saveErr) {
      configSaveFailed = !0, logForDebugging(`Failed to save marketplace auto-install failure state: ${saveErr}`, {
        level: "error"
      });
    }
    return logEvent("tengu_official_marketplace_auto_install", {
      installed: !1,
      skipped: !0,
      failed: !0,
      retry_count: retryCount
    }), {
      installed: !1,
      skipped: !0,
      reason: "unknown",
      configSaveFailed: configSaveFailed
    };
  }
}
var bec, vQn;
var Cec = b(() => {
  ln();
  zn();
  Ct();
  Qn();
  qe();
  sn();
  sCn();
  hS();
  XUe();
  qgo();
  nI();
  bec = require("path");
  vQn = {
    MAX_ATTEMPTS: 10,
    INITIAL_DELAY_MS: 3600000,
    BACKOFF_MULTIPLIER: 2,
    MAX_DELAY_MS: 604800000
  };
});
export {B2m,GMo,F2m,Eec,bec,vQn,Cec};
