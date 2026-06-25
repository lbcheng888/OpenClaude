// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Ne} from "../../vendor/m583.ts";
import {writeToStdout as Ei,LP} from "../../vendor/m232.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "./3348_flushAnalyticsSinks.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {f$t,wct,rqe,_Un} from "../../vendor/m3773.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {oqe,c0e} from "../../vendor/m3774.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {mUn,Act,pUn,tqe,Ect,m$t,Rct,F_e} from "./3772_minVersion.ts";
import {U0,fE,QQ} from "../../vendor/m2214.ts";
import {getInitialSettings as Fr,getSettingsForSource as An,br} from "./0745_updateSettingsForSource.ts";
import {_$t,Jao} from "./3776_timeout.ts";
import {lqe,E$t} from "./3778_level.ts";
import {m5r,f5r} from "../../vendor/m2527.ts";
import {cT,vu} from "../mcp/2200_mcpServerName.ts";
import {X4e,u$t,Q4e} from "../../vendor/m3769.ts";
import {xe,mn} from "../telemetry/0600_feature_name.ts";
import {nqe,vct} from "../../vendor/m3772.ts";
import {Xgl,dne} from "../../vendor/m4605.ts";
import {bgSupervisorNounCap as qfe,fC} from "./2212_shouldShowLaunchComposer.ts";
import {Ir} from "../../vendor/m584.ts";
import {rY} from "../../vendor/m3778.ts";
var ZTc = {};
ft(ZTc, {
  update: () => update
});
/**
 * Entry point for the `claude update` command.
 * Detects the current installation type, checks the configured release
 * channel for a newer (or policy-capped) version, and applies the update
 * via the appropriate mechanism (native updater, npm-local, npm-global, or
 * a system package manager). Exits the process with status 0 on success/no-op
 * and 1 on failure.
 */
async function update() {
  if (Ne.DISABLE_UPDATES) Ei(`Updates are disabled by your administrator. Contact your IT team to get the latest version.
`), await gi(0);
  W("tengu_update_check", {}), Ei(`Current version: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}
`);
  /** Channel override from config/env (e.g. "rc", "stable"). */
  let channelOverride = eJ(),
    /** Homebrew cask name if managed by a cask, else undefined. */
    casCkName = f$t(),
    /** Effective update channel resolved from cask/env/override. */
    updateChannel = casCkName ? casCkName === "claude-code@latest" ? "latest" : "stable" : wct() ? "stable" : channelOverride,
    /** Human-facing channel label ("rc" is shown as "slow"). */
    channelLabel = updateChannel === "rc" ? "slow" : updateChannel;
  Ei(`Checking for updates to ${channelLabel} version...
`), A("update: Starting update check"), A("update: Running diagnostic");
  /** Diagnostic info about how Claude Code is installed on this machine. */
  let installDiagnostic = await oqe();
  if (A(`update: Installation type: ${installDiagnostic.installationType}`), A(`update: Config install method: ${installDiagnostic.configInstallMethod}`), installDiagnostic.multipleInstallations.length > 1) {
    Ei(`
`), Ei(bt.yellow("Warning: Multiple installations found") + `
`);
    for (let installEntry of installDiagnostic.multipleInstallations) {
      let currentMarker = installDiagnostic.installationType === installEntry.type ? " (currently running)" : "";
      Ei(`- ${installEntry.type} at ${installEntry.path}${currentMarker}
`);
    }
  }
  if (installDiagnostic.warnings.length > 0) {
    Ei(`
`);
    for (let warning of installDiagnostic.warnings) A(`update: Warning detected: ${warning.issue}`), A(`update: Showing warning: ${warning.issue}`), Ei(bt.yellow(`Warning: ${warning.issue}
`)), Ei(bt.bold(`Fix: ${warning.fix.replaceAll("`", "")}
`));
  }
  /** Current global config (holds the persisted installMethod). */
  let globalConfig = Ot();
  if (!globalConfig.installMethod && installDiagnostic.installationType !== "package-manager") {
    Ei(`
`), Ei(`Updating configuration to track installation method...
`);
    /** installMethod inferred from the detected installation type. */
    let detectedMethod = "unknown";
    switch (installDiagnostic.installationType) {
      case "npm-local":
        detectedMethod = "local";
        break;
      case "native":
        detectedMethod = "native";
        break;
      case "npm-global":
        detectedMethod = "global";
        break;
      default:
        detectedMethod = "unknown";
    }
    hn(existingConfig => ({
      ...existingConfig,
      installMethod: detectedMethod
    })), Ei(`Installation method set to: ${detectedMethod}
`);
  }
  if (installDiagnostic.installationType === "development") Ei(`
`), Ei(bt.yellow("Warning: Cannot update development build") + `
`), await gi(1);
  if (installDiagnostic.installationType === "package-manager") {
    /** Which system package manager owns this install. */
    let pkgManager = await rqe();
    if (Ei(`
`), pkgManager === "homebrew") {
      Ei(`Claude is managed by Homebrew.
`);
      /** Command the user can run to upgrade via brew. */
      let brewUpgradeCmd = `brew upgrade ${casCkName ?? "claude-code"}`,
        /** Latest version available from the Homebrew cask, or null. */
        latestHomebrewVersion = await mUn(casCkName ?? "claude-code", updateChannel);
      if (latestHomebrewVersion === null) Ei(`Could not check for updates (network check skipped or unavailable).
`), Ei(`To update manually, run:
`), Ei(bt.bold(`  ${brewUpgradeCmd}`) + `
`);else if (!U0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION, latestHomebrewVersion)) Ei(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} \u2192 ${latestHomebrewVersion}
`), Ei(`
`), Ei(`To update, run:
`), Ei(bt.bold(`  ${brewUpgradeCmd}`) + `
`);else Ei(`Claude is up to date!
`);
      if (casCkName !== "claude-code@latest") Ei(`
`), Ei(bt.dim(`Tip: For more frequent updates, use the claude-code@latest cask:
`)), Ei(bt.dim(`  brew uninstall --cask ${casCkName ?? "claude-code"} && brew install --cask claude-code@latest`) + `
`);
    } else if (pkgManager === "winget") {
      Ei(`Claude is managed by winget.
`);
      /** Latest version available from winget, or falsy if unknown. */
      let latestWingetVersion = await Act(updateChannel);
      if (latestWingetVersion && !U0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION, latestWingetVersion)) Ei(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} \u2192 ${latestWingetVersion}
`), Ei(`
`), Ei(`To update, run:
`), Ei(bt.bold("  winget upgrade Anthropic.ClaudeCode") + `
`);else Ei(`Claude is up to date!
`);
    } else if (pkgManager === "apk") {
      Ei(`Claude is managed by apk.
`);
      /** Latest version available from apk, or falsy if unknown. */
      let latestApkVersion = await Act(updateChannel);
      if (latestApkVersion && !U0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION, latestApkVersion)) Ei(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} \u2192 ${latestApkVersion}
`), Ei(`
`), Ei(`To update, run:
`), Ei(bt.bold("  apk upgrade claude-code") + `
`);else Ei(`Claude is up to date!
`);
    } else Ei(`Claude is managed by a package manager.
`), Ei(`Please use your package manager to update.
`);
    await gi(0);
  }
  if (globalConfig.installMethod && installDiagnostic.configInstallMethod !== "not set" && installDiagnostic.installationType !== "package-manager") {
    let {
        installationType: currentInstallType,
        configInstallMethod: configuredMethod
      } = installDiagnostic,
      /** installationType mapped to the config's installMethod vocabulary. */
      normalizedType = {
        "npm-local": "local",
        "npm-global": "global",
        native: "native",
        development: "development",
        unknown: "unknown"
      }[currentInstallType] || currentInstallType;
    if (normalizedType !== configuredMethod && configuredMethod !== "unknown") Ei(`
`), Ei(bt.yellow("Warning: Configuration mismatch") + `
`), Ei(`Config expects: ${configuredMethod} installation
`), Ei(`Currently running: ${currentInstallType}
`), Ei(bt.yellow(`Updating the ${currentInstallType} installation you are currently using`) + `
`), hn(existingCfg => ({
      ...existingCfg,
      installMethod: normalizedType
    })), Ei(`Config updated to reflect current installation method: ${normalizedType}
`);
  }
  if (installDiagnostic.installationType === "native") {
    if (A("update: Detected native installation, using native updater"), Fr()?.minimumVersion || An("policySettings")?.requiredMaximumVersion) {
      /** Version the channel resolves to, used for policy checks. */
      let targetChannelVersion = await _$t(updateChannel).catch(() => null),
        /** Reason the channel version is blocked by policy, or null. */
        policyViolationReason = targetChannelVersion ? pUn(targetChannelVersion) : null;
      if (targetChannelVersion && policyViolationReason) Ei(bt.yellow(`The ${channelLabel} channel is at ${targetChannelVersion}, which is ${policyViolationReason}. Staying on ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION}.`) + `
`), await gi(0);
    }
    _$t(updateChannel).then(targetVer => {
      if (targetVer && targetVer !== {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION) Ei(`Updating to ${targetVer}...
`);
    }).catch(() => {});
    try {
      /** Result of the native self-update attempt. */
      let nativeUpdateResult = await lqe(updateChannel, !1);
      if (nativeUpdateResult.lockFailed) {
        let lockHolderSuffix = nativeUpdateResult.lockHolderPid ? ` (PID ${nativeUpdateResult.lockHolderPid})` : "";
        Ei(bt.yellow(`Another Claude process${lockHolderSuffix} is currently running. Please try again in a moment.`) + `
`), await gi(0);
      }
      if (!nativeUpdateResult.latestVersion) process.stderr.write(`Failed to check for updates
`), await gi(1);
      if (nativeUpdateResult.wasUpdated && nativeUpdateResult.latestVersion !== {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION) Ei(bt.green(`Successfully updated from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} to version ${nativeUpdateResult.latestVersion}`) + `
`), await m5r(), await XTc(nativeUpdateResult.latestVersion);else Ei(bt.green(`Claude Code is up to date (${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION})`) + `
`);
      await gi(0);
    } catch (nativeUpdateErr) {
      process.stderr.write(`Error: Failed to install native update
`), process.stderr.write(String(nativeUpdateErr) + `
`), process.stderr.write(`Try running "claude doctor" for diagnostics
`), await gi(1);
    }
  }
  if (globalConfig.installMethod !== "native") await E$t();
  A("update: Checking npm registry for latest version"), A(`update: Package URL: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.PACKAGE_URL}`);
  /** npm dist-tag to query ("stable" or "latest"). */
  let npmDistTag = updateChannel === "stable" ? "stable" : "latest",
    /** Diagnostic-only string of the npm view command. */
    npmViewCmd = `npm view ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL}@${npmDistTag} version`;
  A(`update: Running: ${npmViewCmd}`);
  /** Latest published version from the npm registry, or falsy on failure. */
  let latestNpmVersion = await Act(updateChannel);
  if (A(`update: Latest version from npm: ${latestNpmVersion || "FAILED"}`), !latestNpmVersion) {
    if (A("update: Failed to get latest version from npm registry"), process.stderr.write(bt.red("Failed to check for updates") + `
`), process.stderr.write(`Unable to fetch latest version from npm registry
`), process.stderr.write(`
`), process.stderr.write(`Possible causes:
`), process.stderr.write(`  \u2022 Network connectivity issues
`), process.stderr.write(`  \u2022 npm registry is unreachable
`), process.stderr.write(`  \u2022 Corporate proxy/firewall blocking npm
`), {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL && !{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL.startsWith("@anthropic")) process.stderr.write(`  \u2022 Internal/development build not published to npm
`);
    process.stderr.write(`
`), process.stderr.write(`Try:
`), process.stderr.write(`  \u2022 Check your internet connection
`), process.stderr.write(`  \u2022 Run with --debug flag for more details
`);
    /** Package URL used in the manual-check hint (defaults if missing). */
    let fallbackPkgUrl = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL || "@anthropic-ai/claude-code";
    process.stderr.write(`  \u2022 Manually check: npm view ${fallbackPkgUrl} version
`), process.stderr.write(`  \u2022 Check if you need to login: npm whoami
`), await gi(1);
  }
  let {
      maxVersion: serverMaxVersion,
      forceDowngradeEnabled: isForceDowngrade
    } = await tqe(),
    /** Version we will attempt to install (may be capped/downgraded). */
    resolvedTargetVersion = latestNpmVersion,
    /** True when the server policy forces a downgrade. */
    isDowngrade = !1;
  if (isForceDowngrade && serverMaxVersion && Ect({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION, serverMaxVersion, "auto_updater")) resolvedTargetVersion = serverMaxVersion, isDowngrade = !0;else if (serverMaxVersion && latestNpmVersion && fE(latestNpmVersion, serverMaxVersion)) A(`update: maxVersion ${serverMaxVersion} is set, capping update from ${latestNpmVersion} to ${serverMaxVersion}`), resolvedTargetVersion = fE(serverMaxVersion, {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION) ? serverMaxVersion : {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION;
  /** Reason the resolved target is blocked by policy, or null. */
  let policyBlockReason = resolvedTargetVersion ? pUn(resolvedTargetVersion) : null;
  if (resolvedTargetVersion && policyBlockReason) {
    let policyDescription = resolvedTargetVersion === latestNpmVersion ? `The ${channelLabel} channel is at ${resolvedTargetVersion}` : `The update target is capped at ${resolvedTargetVersion} by a server-side version policy`;
    Ei(bt.yellow(`${policyDescription}, which is ${policyBlockReason}. Staying on ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}.`) + `
`), await gi(0);
  }
  if (resolvedTargetVersion === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION) Ei(bt.green(`Claude Code is up to date (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION})`) + `
`), await gi(0);
  if (!isDowngrade && resolvedTargetVersion && QQ(resolvedTargetVersion, {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION)) Ei(bt.yellow(`You're running ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}, which is newer than the ${channelLabel} channel's ${resolvedTargetVersion}. Skipping update. To switch back to the channel version, run claude install ${resolvedTargetVersion}.`) + `
`), await gi(0);
  if (isDowngrade) W("tengu_auto_updater_forced_downgrade", {
    from_version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    to_version: cT(resolvedTargetVersion)
  }), Ei(bt.yellow(`Downgrading to ${resolvedTargetVersion} (current: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}) \u2014 required by a server-side version policy.`) + `
`);else Ei(`New version available: ${resolvedTargetVersion} (current: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION})
`);
  Ei(`Installing update...
`);
  /** True when updating a local (~/.claude/local) npm install. */
  let useLocalUpdate = !1,
    /** Human-facing label of the update method ("local"/"global"). */
    updateMethodLabel = "";
  switch (installDiagnostic.installationType) {
    case "npm-local":
      useLocalUpdate = !0, updateMethodLabel = "local";
      break;
    case "npm-global":
      useLocalUpdate = !1, updateMethodLabel = "global";
      break;
    case "unknown":
      {
        /** Whether file detection suggests a local install. */
        let isLocalInstall = await X4e();
        useLocalUpdate = isLocalInstall, updateMethodLabel = isLocalInstall ? "local" : "global", Ei(bt.yellow("Warning: Could not determine installation type") + `
`), Ei(`Attempting ${updateMethodLabel} update based on file detection...
`);
        break;
      }
    default:
      xe("update_apply", "update_apply_unsupported_install_type"), process.stderr.write(`Error: Cannot update ${installDiagnostic.installationType} installation
`), await gi(1);
  }
  Ei(`Using ${updateMethodLabel} installation update method...
`), A(`update: Update method determined: ${updateMethodLabel}`), A(`update: useLocalUpdate: ${useLocalUpdate}`);
  /** Final install status string. */
  let installStatus,
    /** Raw result object from the global install path (may hold failureHint). */
    globalInstallResult;
  if (useLocalUpdate) A("update: Calling installOrUpdateClaudePackage() for local update"), installStatus = await u$t(updateChannel, resolvedTargetVersion);else A("update: Calling installGlobalPackage() for global update"), globalInstallResult = await m$t(resolvedTargetVersion), installStatus = globalInstallResult.status;
  if (A(`update: Installation status: ${installStatus}`), installStatus !== "in_progress") await nqe({
    timestamp: new Date().toISOString(),
    path: useLocalUpdate ? "npm-local" : "npm-global",
    outcome: installStatus === "success" ? "success" : "failed",
    status: installStatus,
    version_from: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    version_to: resolvedTargetVersion,
    error_code: installStatus === "install_failed" && Rct() ? "update_apply_restore_failed" : globalInstallResult?.failureHint === "windows_running_exe_lock" ? "update_apply_exe_locked" : null
  });
  switch (installStatus) {
    case "success":
      Ei(bt.green(isDowngrade ? `Successfully downgraded from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} to version ${resolvedTargetVersion}` : `Successfully updated from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION} to version ${resolvedTargetVersion}`) + `
`), await m5r(), await XTc(resolvedTargetVersion);
      break;
    case "no_permissions":
      if (process.stderr.write(`Error: Insufficient permissions to install update
`), useLocalUpdate) process.stderr.write(`Try manually updating with:
`), process.stderr.write(`  cd ~/.claude/local && npm update ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.PACKAGE_URL}
`);else process.stderr.write(`Try running with sudo or fix npm permissions
`), process.stderr.write(`Or consider using native installation with: claude install
`);
      await gi(1);
      break;
    case "install_failed":
      {
        /** Restore-from-backup info if a prior backup exists, else falsy. */
        let backupInfo = Rct();
        if (!backupInfo && globalInstallResult?.failureHint === "windows_running_exe_lock") {
          process.stderr.write(`Error: Update failed because claude.exe is in use. Close other Claude Code sessions (including VS Code), then run claude update again, or run claude doctor.
`), await gi(1);
          break;
        }
        if (process.stderr.write(`Error: Failed to install update
`), backupInfo) process.stderr.write(`Your Claude Code executable could not be restored after the failed update. It was preserved at ${backupInfo.preservedPath}
`), process.stderr.write(`Rename it back to ${QTc.basename(backupInfo.originalPath)}, or reinstall with: npm i -g ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.PACKAGE_URL}
`);else if (useLocalUpdate) process.stderr.write(`Try manually updating with:
`), process.stderr.write(`  cd ~/.claude/local && npm update ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.PACKAGE_URL}
`);else process.stderr.write(`Or consider using native installation with: claude install
`);
        await gi(1);
        break;
      }
    case "in_progress":
      process.stderr.write(`Error: Another instance is currently performing an update
`), process.stderr.write(`Please wait and try again later
`), await gi(1);
      break;
  }
  await gi(0);
}
/**
 * Notifies any background supervisor that an update was applied, prompting it
 * to restart on the new version without interrupting in-flight jobs.
 * @param newVersion The version that was just installed.
 */
async function XTc(newVersion) {
  if (await Xgl(newVersion)) Ei(bt.dim(`${qfe()} will restart on the new version shortly; background jobs continue uninterrupted`) + `
`);
}
var QTc;
var eSc = b(() => {
  Gc();
  fC();
  dne();
  mn();
  kt();
  vu();
  F_e();
  f5r();
  tr();
  qe();
  c0e();
  Ir();
  Np();
  vct();
  Q4e();
  Jao();
  rY();
  _Un();
  LP();
  ZDe();
  br();
  QTc = require("path");
});
export {ZTc,update,XTc,QTc,eSc};
