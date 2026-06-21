// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {je} from "../../vendor/m577.ts";
import {writeToStdout,fO} from "../../vendor/m230.ts";
import {gracefulShutdown,ym} from "./3332_flushAnalyticsSinks.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {hJ,rDe} from "../../vendor/m4516.ts";
import {BFt,xat,j3e,wNn} from "../../vendor/m3757.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {W3e,SHe} from "../../vendor/m3758.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {bNn,vat,SNn,$3e,Eat,NFt,wat,Cge} from "./3756_minVersion.ts";
import {b0,cE,tZ} from "../../vendor/m2206.ts";
import {getInitialSettings,getSettingsForSource,yr} from "./0740_updateSettingsForSource.ts";
import {$Ft,pro} from "./3760_timeout.ts";
import {z3e,VFt} from "./3762_level.ts";
import {L9r,M9r} from "../../vendor/m2516.ts";
import {_T,$u} from "../mcp/2194_mcpServerName.ts";
import {N3e,OFt,B3e} from "../../vendor/m3753.ts";
import {Oe,ln} from "../telemetry/0594_feature_name.ts";
import {q3e,Rat} from "../../vendor/m3756.ts";
import {hcl,yne} from "../../vendor/m4577.ts";
import {bgSupervisorNounCap,bv} from "./2204_shouldShowLaunchComposer.ts";
import {Lr} from "../../vendor/m578.ts";
import {wY} from "../../vendor/m3762.ts";
var Gcc = {};
isFullscreenWithTTY(Gcc, {
  update: () => update
});
async function update() {
  if (je.DISABLE_UPDATES) writeToStdout(`Updates are disabled by your administrator. Contact your IT team to get the latest version.
`), await gracefulShutdown(0);
  logEvent("tengu_update_check", {}), writeToStdout(`Current version: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}
`);
  let channelOverride = hJ(),
    casCkName = BFt(),
    updateChannel = casCkName ? casCkName === "claude-code@latest" ? "latest" : "stable" : xat() ? "stable" : channelOverride,
    channelLabel = updateChannel === "rc" ? "slow" : updateChannel;
  writeToStdout(`Checking for updates to ${channelLabel} version...
`), logForDebugging("update: Starting update check"), logForDebugging("update: Running diagnostic");
  let installDiagnostic = await W3e();
  if (logForDebugging(`update: Installation type: ${installDiagnostic.installationType}`), logForDebugging(`update: Config install method: ${installDiagnostic.configInstallMethod}`), installDiagnostic.multipleInstallations.length > 1) {
    writeToStdout(`
`), writeToStdout(_t.yellow("Warning: Multiple installations found") + `
`);
    for (let installEntry of installDiagnostic.multipleInstallations) {
      let currentMarker = installDiagnostic.installationType === installEntry.type ? " (currently running)" : "";
      writeToStdout(`- ${installEntry.type} at ${installEntry.path}${currentMarker}
`);
    }
  }
  if (installDiagnostic.warnings.length > 0) {
    writeToStdout(`
`);
    for (let warning of installDiagnostic.warnings) logForDebugging(`update: Warning detected: ${warning.issue}`), logForDebugging(`update: Showing warning: ${warning.issue}`), writeToStdout(_t.yellow(`Warning: ${warning.issue}
`)), writeToStdout(_t.bold(`Fix: ${warning.fix.replaceAll("`", "")}
`));
  }
  let globalConfig = getGlobalConfig();
  if (!globalConfig.installMethod && installDiagnostic.installationType !== "package-manager") {
    writeToStdout(`
`), writeToStdout(`Updating configuration to track installation method...
`);
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
    saveGlobalConfig(existingConfig => ({
      ...existingConfig,
      installMethod: detectedMethod
    })), writeToStdout(`Installation method set to: ${detectedMethod}
`);
  }
  if (installDiagnostic.installationType === "development") writeToStdout(`
`), writeToStdout(_t.yellow("Warning: Cannot update development build") + `
`), await gracefulShutdown(1);
  if (installDiagnostic.installationType === "package-manager") {
    let pkgManager = await j3e();
    if (writeToStdout(`
`), pkgManager === "homebrew") {
      writeToStdout(`Claude is managed by Homebrew.
`);
      let brewUpgradeCmd = `brew upgrade ${casCkName ?? "claude-code"}`,
        latestHomebrewVersion = await bNn(casCkName ?? "claude-code", updateChannel);
      if (latestHomebrewVersion === null) writeToStdout(`Could not check for updates (network check skipped or unavailable).
`), writeToStdout(`To update manually, run:
`), writeToStdout(_t.bold(`  ${brewUpgradeCmd}`) + `
`);else if (!b0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION, latestHomebrewVersion)) writeToStdout(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} \u2192 ${latestHomebrewVersion}
`), writeToStdout(`
`), writeToStdout(`To update, run:
`), writeToStdout(_t.bold(`  ${brewUpgradeCmd}`) + `
`);else writeToStdout(`Claude is up to date!
`);
      if (casCkName !== "claude-code@latest") writeToStdout(`
`), writeToStdout(_t.dim(`Tip: For more frequent updates, use the claude-code@latest cask:
`)), writeToStdout(_t.dim(`  brew uninstall --cask ${casCkName ?? "claude-code"} && brew install --cask claude-code@latest`) + `
`);
    } else if (pkgManager === "winget") {
      writeToStdout(`Claude is managed by winget.
`);
      let latestWingetVersion = await vat(updateChannel);
      if (latestWingetVersion && !b0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION, latestWingetVersion)) writeToStdout(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} \u2192 ${latestWingetVersion}
`), writeToStdout(`
`), writeToStdout(`To update, run:
`), writeToStdout(_t.bold("  winget upgrade Anthropic.ClaudeCode") + `
`);else writeToStdout(`Claude is up to date!
`);
    } else if (pkgManager === "apk") {
      writeToStdout(`Claude is managed by apk.
`);
      let latestApkVersion = await vat(updateChannel);
      if (latestApkVersion && !b0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION, latestApkVersion)) writeToStdout(`Update available: ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} \u2192 ${latestApkVersion}
`), writeToStdout(`
`), writeToStdout(`To update, run:
`), writeToStdout(_t.bold("  apk upgrade claude-code") + `
`);else writeToStdout(`Claude is up to date!
`);
    } else writeToStdout(`Claude is managed by a package manager.
`), writeToStdout(`Please use your package manager to update.
`);
    await gracefulShutdown(0);
  }
  if (globalConfig.installMethod && installDiagnostic.configInstallMethod !== "not set" && installDiagnostic.installationType !== "package-manager") {
    let {
        installationType: currentInstallType,
        configInstallMethod: configuredMethod
      } = installDiagnostic,
      normalizedType = {
        "npm-local": "local",
        "npm-global": "global",
        native: "native",
        development: "development",
        unknown: "unknown"
      }[currentInstallType] || currentInstallType;
    if (normalizedType !== configuredMethod && configuredMethod !== "unknown") writeToStdout(`
`), writeToStdout(_t.yellow("Warning: Configuration mismatch") + `
`), writeToStdout(`Config expects: ${configuredMethod} installation
`), writeToStdout(`Currently running: ${currentInstallType}
`), writeToStdout(_t.yellow(`Updating the ${currentInstallType} installation you are currently using`) + `
`), saveGlobalConfig(existingCfg => ({
      ...existingCfg,
      installMethod: normalizedType
    })), writeToStdout(`Config updated to reflect current installation method: ${normalizedType}
`);
  }
  if (installDiagnostic.installationType === "native") {
    if (logForDebugging("update: Detected native installation, using native updater"), getInitialSettings()?.minimumVersion || getSettingsForSource("policySettings")?.requiredMaximumVersion) {
      let targetChannelVersion = await $Ft(updateChannel).catch(() => null),
        policyViolationReason = targetChannelVersion ? SNn(targetChannelVersion) : null;
      if (targetChannelVersion && policyViolationReason) writeToStdout(_t.yellow(`The ${channelLabel} channel is at ${targetChannelVersion}, which is ${policyViolationReason}. Staying on ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION}.`) + `
`), await gracefulShutdown(0);
    }
    $Ft(updateChannel).then(targetVer => {
      if (targetVer && targetVer !== {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION) writeToStdout(`Updating to ${targetVer}...
`);
    }).catch(() => {});
    try {
      let nativeUpdateResult = await z3e(updateChannel, !1);
      if (nativeUpdateResult.lockFailed) {
        let lockHolderSuffix = nativeUpdateResult.lockHolderPid ? ` (PID ${nativeUpdateResult.lockHolderPid})` : "";
        writeToStdout(_t.yellow(`Another Claude process${lockHolderSuffix} is currently running. Please try again in a moment.`) + `
`), await gracefulShutdown(0);
      }
      if (!nativeUpdateResult.latestVersion) process.stderr.write(`Failed to check for updates
`), await gracefulShutdown(1);
      if (nativeUpdateResult.wasUpdated && nativeUpdateResult.latestVersion !== {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION) writeToStdout(_t.green(`Successfully updated from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} to version ${nativeUpdateResult.latestVersion}`) + `
`), await L9r(), await jcc(nativeUpdateResult.latestVersion);else writeToStdout(_t.green(`Claude Code is up to date (${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION})`) + `
`);
      await gracefulShutdown(0);
    } catch (nativeUpdateErr) {
      process.stderr.write(`Error: Failed to install native update
`), process.stderr.write(String(nativeUpdateErr) + `
`), process.stderr.write(`Try running "claude doctor" for diagnostics
`), await gracefulShutdown(1);
    }
  }
  if (globalConfig.installMethod !== "native") await VFt();
  logForDebugging("update: Checking npm registry for latest version"), logForDebugging(`update: Package URL: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.PACKAGE_URL}`);
  let npmDistTag = updateChannel === "stable" ? "stable" : "latest",
    npmViewCmd = `npm view ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.PACKAGE_URL}@${npmDistTag} version`;
  logForDebugging(`update: Running: ${npmViewCmd}`);
  let latestNpmVersion = await vat(updateChannel);
  if (logForDebugging(`update: Latest version from npm: ${latestNpmVersion || "FAILED"}`), !latestNpmVersion) {
    if (logForDebugging("update: Failed to get latest version from npm registry"), process.stderr.write(_t.red("Failed to check for updates") + `
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
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.PACKAGE_URL && !{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.PACKAGE_URL.startsWith("@anthropic")) process.stderr.write(`  \u2022 Internal/development build not published to npm
`);
    process.stderr.write(`
`), process.stderr.write(`Try:
`), process.stderr.write(`  \u2022 Check your internet connection
`), process.stderr.write(`  \u2022 Run with --debug flag for more details
`);
    let fallbackPkgUrl = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.PACKAGE_URL || "@anthropic-ai/claude-code";
    process.stderr.write(`  \u2022 Manually check: npm view ${fallbackPkgUrl} version
`), process.stderr.write(`  \u2022 Check if you need to login: npm whoami
`), await gracefulShutdown(1);
  }
  let {
      maxVersion: serverMaxVersion,
      forceDowngradeEnabled: isForceDowngrade
    } = await $3e(),
    resolvedTargetVersion = latestNpmVersion,
    isDowngrade = !1;
  if (isForceDowngrade && serverMaxVersion && Eat({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION, serverMaxVersion, "auto_updater")) resolvedTargetVersion = serverMaxVersion, isDowngrade = !0;else if (serverMaxVersion && latestNpmVersion && cE(latestNpmVersion, serverMaxVersion)) logForDebugging(`update: maxVersion ${serverMaxVersion} is set, capping update from ${latestNpmVersion} to ${serverMaxVersion}`), resolvedTargetVersion = cE(serverMaxVersion, {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION) ? serverMaxVersion : {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION;
  let policyBlockReason = resolvedTargetVersion ? SNn(resolvedTargetVersion) : null;
  if (resolvedTargetVersion && policyBlockReason) {
    let policyDescription = resolvedTargetVersion === latestNpmVersion ? `The ${channelLabel} channel is at ${resolvedTargetVersion}` : `The update target is capped at ${resolvedTargetVersion} by a server-side version policy`;
    writeToStdout(_t.yellow(`${policyDescription}, which is ${policyBlockReason}. Staying on ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}.`) + `
`), await gracefulShutdown(0);
  }
  if (resolvedTargetVersion === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION) writeToStdout(_t.green(`Claude Code is up to date (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION})`) + `
`), await gracefulShutdown(0);
  if (!isDowngrade && resolvedTargetVersion && tZ(resolvedTargetVersion, {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION)) writeToStdout(_t.yellow(`You're running ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}, which is newer than the ${channelLabel} channel's ${resolvedTargetVersion}. Skipping update. To switch back to the channel version, run claude install ${resolvedTargetVersion}.`) + `
`), await gracefulShutdown(0);
  if (isDowngrade) logEvent("tengu_auto_updater_forced_downgrade", {
    from_version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION,
    to_version: _T(resolvedTargetVersion)
  }), writeToStdout(_t.yellow(`Downgrading to ${resolvedTargetVersion} (current: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}) \u2014 required by a server-side version policy.`) + `
`);else writeToStdout(`New version available: ${resolvedTargetVersion} (current: ${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION})
`);
  writeToStdout(`Installing update...
`);
  let useLocalUpdate = !1,
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
        let isLocalInstall = await N3e();
        useLocalUpdate = isLocalInstall, updateMethodLabel = isLocalInstall ? "local" : "global", writeToStdout(_t.yellow("Warning: Could not determine installation type") + `
`), writeToStdout(`Attempting ${updateMethodLabel} update based on file detection...
`);
        break;
      }
    default:
      Oe("update_apply", "update_apply_unsupported_install_type"), process.stderr.write(`Error: Cannot update ${installDiagnostic.installationType} installation
`), await gracefulShutdown(1);
  }
  writeToStdout(`Using ${updateMethodLabel} installation update method...
`), logForDebugging(`update: Update method determined: ${updateMethodLabel}`), logForDebugging(`update: useLocalUpdate: ${useLocalUpdate}`);
  let installStatus, globalInstallResult;
  if (useLocalUpdate) logForDebugging("update: Calling installOrUpdateClaudePackage() for local update"), installStatus = await OFt(updateChannel, resolvedTargetVersion);else logForDebugging("update: Calling installGlobalPackage() for global update"), globalInstallResult = await NFt(resolvedTargetVersion), installStatus = globalInstallResult.status;
  if (logForDebugging(`update: Installation status: ${installStatus}`), installStatus !== "in_progress") await q3e({
    timestamp: new Date().toISOString(),
    path: useLocalUpdate ? "npm-local" : "npm-global",
    outcome: installStatus === "success" ? "success" : "failed",
    status: installStatus,
    version_from: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION,
    version_to: resolvedTargetVersion,
    error_code: installStatus === "install_failed" && wat() ? "update_apply_restore_failed" : globalInstallResult?.failureHint === "windows_running_exe_lock" ? "update_apply_exe_locked" : null
  });
  switch (installStatus) {
    case "success":
      writeToStdout(_t.green(isDowngrade ? `Successfully downgraded from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} to version ${resolvedTargetVersion}` : `Successfully updated from ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION} to version ${resolvedTargetVersion}`) + `
`), await L9r(), await jcc(resolvedTargetVersion);
      break;
    case "no_permissions":
      if (process.stderr.write(`Error: Insufficient permissions to install update
`), useLocalUpdate) process.stderr.write(`Try manually updating with:
`), process.stderr.write(`  cd ~/.claude/local && npm update ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.PACKAGE_URL}
`);else process.stderr.write(`Try running with sudo or fix npm permissions
`), process.stderr.write(`Or consider using native installation with: claude install
`);
      await gracefulShutdown(1);
      break;
    case "install_failed":
      {
        let backupInfo = wat();
        if (!backupInfo && globalInstallResult?.failureHint === "windows_running_exe_lock") {
          process.stderr.write(`Error: Update failed because claude.exe is in use. Close other Claude Code sessions (including VS Code), then run claude update again, or run claude doctor.
`), await gracefulShutdown(1);
          break;
        }
        if (process.stderr.write(`Error: Failed to install update
`), backupInfo) process.stderr.write(`Your Claude Code executable could not be restored after the failed update. It was preserved at ${backupInfo.preservedPath}
`), process.stderr.write(`Rename it back to ${Wcc.basename(backupInfo.originalPath)}, or reinstall with: npm i -g ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.PACKAGE_URL}
`);else if (useLocalUpdate) process.stderr.write(`Try manually updating with:
`), process.stderr.write(`  cd ~/.claude/local && npm update ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.PACKAGE_URL}
`);else process.stderr.write(`Or consider using native installation with: claude install
`);
        await gracefulShutdown(1);
        break;
      }
    case "in_progress":
      process.stderr.write(`Error: Another instance is currently performing an update
`), process.stderr.write(`Please wait and try again later
`), await gracefulShutdown(1);
      break;
  }
  await gracefulShutdown(0);
}
async function jcc(newVersion) {
  if (await hcl(newVersion)) writeToStdout(_t.dim(`${bgSupervisorNounCap()} will restart on the new version shortly; background jobs continue uninterrupted`) + `
`);
}
var Wcc;
var Vcc = b(() => {
  cu();
  bv();
  yne();
  ln();
  Ct();
  $u();
  Cge();
  M9r();
  Qn();
  qe();
  SHe();
  Lr();
  ym();
  Rat();
  B3e();
  pro();
  wY();
  wNn();
  fO();
  rDe();
  yr();
  Wcc = require("path");
});
export {Gcc,update,jcc,Wcc,Vcc};
