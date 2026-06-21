// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {tZ,b0,mQe,cE} from "../../vendor/m2206.ts";
import {gracefulShutdownSync,ym} from "./3332_flushAnalyticsSinks.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {_T,c5,$u} from "../mcp/2194_mcpServerName.ts";
import {getInitialSettings,getSettingsForSource,yr} from "./0740_updateSettingsForSource.ts";
import {tr,sn} from "./0047_namespace.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {Pn,dn,bt,uyt} from "../../vendor/m195.ts";
import {je} from "../../vendor/m577.ts";
import {_A} from "../../vendor/m459.ts";
import {execFileNoThrowWithCwd,oa} from "../../vendor/m684.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {isTmuxControlMode,Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {qt,Xt} from "./0228_encoding.ts";
import {ra,Ap} from "./0614_Ap.ts";
import {fNn,Jno} from "../../vendor/m3753.ts";
import {_he,SLt} from "../api/3019_get.ts";
import {externalHttp,ek} from "../core/0570_isCancel.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {fromEnum,Qe,fromSanitizer_SANITIZER_OUTPUT_ONLY} from "../../vendor/m5.ts";
import {yHe,LFt,gNn,_Nn,yNn} from "../../vendor/m3754.ts";
import {b,M} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {O4} from "../../vendor/m2337.ts";
async function Mwa() {
  try {
    let versionConfig = await getDynamicConfig_BLOCKS_ON_INIT("tengu_version_config", {
      minVersion: "0.0.0"
    });
    if (versionConfig.minVersion && tZ({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION, versionConfig.minVersion)) console.error(`
It looks like your version of Claude Code (${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}) needs an update.
A newer version (${versionConfig.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`), gracefulShutdownSync(1);
  } catch (fetchErr) {
    De(fetchErr);
  }
}
function bat() {
  let nowMs = Date.now();
  if (nowMs - Zno < ndp) return logForDebugging(`auto-update check throttled (last check ${Math.round((nowMs - Zno) / 1000)}s ago)`), !0;
  return Zno = nowMs, !1;
}
async function TNn() {
  return (await $3e()).maxVersion;
}
async function $3e() {
  let rawConfig = await Bwa(),
    forceDowngrade = !1,
    rawExternal = rawConfig.external || void 0,
    parsedExternalVersion = rawExternal ? U3e.parse(rawExternal)?.version ?? void 0 : void 0;
  if (rawExternal && !parsedExternalVersion) logForDebugging(`tengu_max_version_config has invalid version '${rawExternal}' — ignoring`, {
    level: "error"
  }), logEvent("tengu_max_version_config_invalid", {
    raw_value: _T(rawExternal)
  });
  return {
    maxVersion: parsedExternalVersion,
    forceDowngradeEnabled: rawConfig.external_force_downgrade === !0
  };
}
function Eat(currentVersion, targetVersion, installerType) {
  let installerLabel = installerType === "native_update" ? "Native installer" : "AutoUpdater",
    parsedCurrent = U3e.parse(currentVersion);
  if (parsedCurrent && parsedCurrent.compare(targetVersion) > 0) return logForDebugging(`${installerLabel}: force-downgrade active — moving from ${currentVersion} to ${targetVersion}`), !0;
  return logForDebugging(`${installerLabel}: force-downgrade flag set but current ${currentVersion} is not above ${targetVersion} — taking normal upgrade path`), !1;
}
async function Nwa() {
  return (await Bwa()).external_message || void 0;
}
async function Bwa() {
  try {
    return await getDynamicConfig_BLOCKS_ON_INIT("tengu_max_version_config", {});
  } catch (fetchErr) {
    return De(fetchErr), {};
  }
}
function SNn(candidateVersion) {
  let minVersion = getInitialSettings()?.minimumVersion;
  if (minVersion && !b0(candidateVersion, minVersion)) return `below your minimumVersion setting (${minVersion})`;
  let requiredMax = getSettingsForSource("policySettings")?.requiredMaximumVersion;
  if (requiredMax) {
    let parsedMax = U3e.parse(requiredMax)?.version;
    if (!parsedMax) logForDebugging(`requiredMaximumVersion '${requiredMax}' is not a valid semver version — ignoring`, {
      level: "error"
    });else if (!mQe(candidateVersion, parsedMax)) return `above your organization's requiredMaximumVersion (${requiredMax})`;
  }
  return null;
}
function Cat(candidateVersion) {
  let rejectionReason = SNn(candidateVersion);
  if (rejectionReason) logForDebugging(`Skipping update to ${candidateVersion}: ${rejectionReason}`);
  return rejectionReason !== null;
}
function Fwa() {
  return NW.join(tr(), ".update.lock");
}
async function rdp() {
  let fsAsync = jt(),
    lockFilePath = Fwa();
  try {
    let existingStat = await fsAsync.stat(lockFilePath);
    if (Date.now() - existingStat.mtimeMs < Iwa) return !1;
    try {
      let recheckStat = await fsAsync.stat(lockFilePath);
      if (Date.now() - recheckStat.mtimeMs < Iwa) return !1;
      await fsAsync.unlink(lockFilePath);
    } catch (recheckErr) {
      if (!Pn(recheckErr)) return De(recheckErr), !1;
    }
  } catch (statErr) {
    if (!Pn(statErr)) return De(statErr), !1;
  }
  try {
    return await jk.writeFile(lockFilePath, `${process.pid}`, {
      encoding: "utf8",
      flag: "wx"
    }), !0;
  } catch (writeErr) {
    let errCode = dn(writeErr);
    if (errCode === "EEXIST") return !1;
    if (errCode === "ENOENT") try {
      return await fsAsync.mkdir(tr()), await jk.writeFile(lockFilePath, `${process.pid}`, {
        encoding: "utf8",
        flag: "wx"
      }), !0;
    } catch (mkdirErr) {
      if (dn(mkdirErr) === "EEXIST") return !1;
      return logForDebugging(`Failed to create config dir or update lock file: ${mkdirErr}`, {
        level: "error"
      }), !1;
    }
    return logForDebugging(`AutoUpdater: failed to create update lock file ${lockFilePath}: ${writeErr}`, {
      level: "error"
    }), !1;
  }
}
async function odp() {
  let fsAsync = jt(),
    lockFilePath = Fwa();
  try {
    if ((await fsAsync.readFile(lockFilePath, {
      encoding: "utf8"
    })) === `${process.pid}`) await fsAsync.unlink(lockFilePath);
  } catch (readErr) {
    if (Pn(readErr)) return;
    logForDebugging(`AutoUpdater: failed to release update lock file ${lockFilePath}: ${readErr}`, {
      level: "error"
    });
  }
}
function ero() {
  let execPath = process.execPath.replace(/\\/g, "/"),
    bunInstallPrefix = (process.env.BUN_INSTALL ?? "").replace(/\\/g, "/").replace(/\/+$/, "");
  if (execPath.includes("/.bun/install/global/") || bunInstallPrefix && execPath.startsWith(bunInstallPrefix + "/install/global/")) return "bun";
  return je.isRunningWithBun() && !_A() ? "bun" : "npm";
}
async function Uwa() {
  let isBun = ero() === "bun",
    result = null;
  if (isBun) result = await execFileNoThrowWithCwd("bun", ["pm", "bin", "-g"], {
    cwd: F3e.homedir()
  });else result = await execFileNoThrowWithCwd("npm", ["-g", "config", "get", "prefix"], {
    cwd: F3e.homedir()
  });
  if (result.code !== 0) return logForDebugging(`Failed to check ${isBun ? "bun" : "npm"} permissions (exit ${result.code}): ${result.stderr.trim()}`, {
    level: "error"
  }), null;
  return result.stdout.trim() || null;
}
async function sdp() {
  let prefix = await Uwa();
  if (!prefix) return [];
  if (ero() === "bun") return [NW.join(prefix, "claude")];
  if (zt() === "windows") return [NW.join(prefix, "claude.cmd"), NW.join(prefix, "claude.exe")];
  return [NW.join(prefix, "bin", "claude")];
}
async function $wa() {
  try {
    let prefix = await Uwa();
    if (!prefix) return {
      hasPermissions: !1,
      npmPrefix: null
    };
    try {
      return await jk.access(prefix, Owa.constants.W_OK), {
        hasPermissions: !0,
        npmPrefix: prefix
      };
    } catch {
      return logForDebugging("Insufficient permissions for global npm install.", {
        level: "error"
      }), {
        hasPermissions: !1,
        npmPrefix: prefix
      };
    }
  } catch (err) {
    return De(err), {
      hasPermissions: !1,
      npmPrefix: null
    };
  }
}
async function vat(distTag) {
  let tagName = distTag === "stable" ? "stable" : "latest",
    npmResult = await execFileNoThrowWithCwd("npm", ["view", `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.PACKAGE_URL}@${tagName}`, "version", "--prefer-online"], {
      abortSignal: AbortSignal.timeout(5000),
      cwd: F3e.homedir()
    });
  if (npmResult.code !== 0) {
    let stdoutVersion = npmResult.stdout.trim();
    if (stdoutVersion && U3e.parse(stdoutVersion)) {
      if (isTmuxControlMode("update_check", "update_check_npm_view_stderr_warning"), logForDebugging(`npm view exited ${npmResult.code} but printed a valid version (${stdoutVersion}) — treating stderr as a warning`), npmResult.stderr) logForDebugging(`npm stderr: ${npmResult.stderr.trim()}`);
      return stdoutVersion;
    }
    if (Oe("update_check", "update_check_npm_view_failed"), logForDebugging(`npm view failed with code ${npmResult.code}`), npmResult.stderr) logForDebugging(`npm stderr: ${npmResult.stderr.trim()}`);else logForDebugging("npm stderr: (empty)");
    if (npmResult.stdout) logForDebugging(`npm stdout: ${npmResult.stdout.trim()}`);
    return null;
  }
  return Ie("update_check"), npmResult.stdout.trim() || null;
}
async function qwa() {
  let distTagsResult = await execFileNoThrowWithCwd("npm", ["view", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.PACKAGE_URL, "dist-tags", "--json", "--prefer-online"], {
    abortSignal: AbortSignal.timeout(5000),
    cwd: F3e.homedir()
  });
  if (distTagsResult.code !== 0) return logForDebugging(`npm view dist-tags failed with code ${distTagsResult.code}`), {
    latest: null,
    stable: null
  };
  try {
    let parsedTags = qt(distTagsResult.stdout.trim());
    return {
      latest: typeof parsedTags.latest === "string" ? parsedTags.latest : null,
      stable: typeof parsedTags.stable === "string" ? parsedTags.stable : null
    };
  } catch (parseErr) {
    return logForDebugging(`Failed to parse dist-tags: ${parseErr}`), {
      latest: null,
      stable: null
    };
  }
}
async function MFt(artifactFilename) {
  if (ra()) return null;
  let attemptCount = 0;
  try {
    let response = await fNn(abortSignal => (attemptCount++, _he.get(`${tdp}/${artifactFilename}`, {
      timeout: Dwa,
      responseType: "text",
      signal: abortSignal
    })), {
      attempts: Pwa,
      timeoutMs: Dwa,
      onRetry: (attemptNum, retryErr) => {
        logForDebugging(`Failed to fetch ${artifactFilename} from GCS on attempt ${attemptNum}/${Pwa}, retrying: ${retryErr}`);
      }
    });
    if (attemptCount > 1) isTmuxControlMode("update_check", "update_check_gcs_retry");else Ie("update_check");
    return response.data.trim();
  } catch (gcsErr) {
    return Oe("update_check", "update_check_gcs_failed"), logForDebugging(`Failed to fetch ${artifactFilename} from GCS after ${attemptCount} attempt(s): ${gcsErr}`), null;
  }
}
async function idp(caskName) {
  if (ra()) return null;
  try {
    let caskVersion = (await externalHttp.get(`https://formulae.brew.sh/api/cask/${caskName}.json`, {
      timeout: 5000,
      responseType: "json"
    })).data?.version;
    return Ie("update_check"), typeof caskVersion === "string" ? caskVersion : null;
  } catch (fetchErr) {
    return Oe("update_check", "update_check_homebrew_failed"), logForDebugging(`Failed to fetch ${caskName} from formulae.brew.sh: ${fetchErr}`), null;
  }
}
async function bNn(caskName, gcsArtifact) {
  let [brewVersion, gcsVersion] = await Promise.all([idp(caskName), MFt(gcsArtifact)]);
  return brewVersion ?? gcsVersion;
}
async function jwa() {
  let [latestVersion, stableVersion] = await Promise.all([MFt("latest"), MFt("stable")]);
  return {
    latest: latestVersion,
    stable: stableVersion
  };
}
function wat() {
  return Sat;
}
async function NFt(targetVersion) {
  if (!(await rdp())) return isTmuxControlMode("update_apply", "update_apply_lock_contention"), logForDebugging("Another process is currently installing an update", {
    level: "error"
  }), logEvent("tengu_auto_updater_lock_contention", {
    pid: process.pid,
    currentVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION
  }), {
    status: "in_progress"
  };
  try {
    await adp();
    let packageManager = ero();
    if (packageManager === "npm" && je.isNpmFromWindowsPath()) return Oe("update_apply", "update_apply_wsl_windows_npm"), logForDebugging("Windows NPM detected in WSL environment", {
      level: "error"
    }), logEvent("tengu_auto_updater_windows_npm_in_wsl", {
      currentVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    }), console.error(`
Error: Windows NPM detected in WSL

You're running Claude Code in WSL but using the Windows NPM installation from /mnt/c/.
This configuration is not supported for updates.

To fix this issue:
  1. Install Node.js within your Linux distribution: e.g. sudo apt install nodejs npm
  2. Make sure Linux NPM is in your PATH before the Windows version
  3. Try updating again with 'claude update'
`), {
      status: "install_failed"
    };
    let packageSpec = targetVersion ? `${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.PACKAGE_URL}@${targetVersion}` : {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.PACKAGE_URL,
      isWindowsBundledMode = zt() === "windows" && _A() && process.execPath.replace(/\\/g, "/").includes("/node_modules/@anthropic-ai/"),
      renamedExePairs = [];
    if (isWindowsBundledMode) {
      let installDirParent = NW.join(NW.dirname(process.execPath), "..", ".."),
        grandParent = NW.join(installDirParent, "..");
      for (let scanDir of [grandParent, installDirParent]) for (let dirEntry of await jk.readdir(scanDir, {
        withFileTypes: !0
      }).catch(() => [])) {
        if (!dirEntry.isDirectory() || !dirEntry.name.startsWith(".")) continue;
        let candidateDir = NW.join(scanDir, dirEntry.name);
        if (await Promise.all([jk.readdir(candidateDir).catch(() => []), jk.readdir(NW.join(candidateDir, "bin")).catch(() => [])]).then(([topFiles, binFiles]) => [...topFiles, ...binFiles].some(fileName => /\.exe\.old\.\d+$/.test(fileName)))) await jk.rm(candidateDir, {
          recursive: !0,
          force: !0
        }).catch(rmErr => logForDebugging(`retired-dir cleanup failed: ${rmErr}`));
      }
      let renameTimestamp = Date.now(),
        currentExeInode = await jk.stat(process.execPath, {
          bigint: !0
        }).then(statResult => statResult.ino).catch(() => 0n),
        exesToRename = [process.execPath];
      for (let siblingEntry of await jk.readdir(installDirParent).catch(() => [])) for (let exeName of ["claude.exe", "cli.exe"]) {
        let candidatePath = NW.join(installDirParent, siblingEntry, exeName);
        if (candidatePath === process.execPath) continue;
        let candidateInode = await jk.stat(candidatePath, {
          bigint: !0
        }).then(statResult => statResult.ino).catch(() => -1n);
        if (currentExeInode && candidateInode === currentExeInode) exesToRename.push(candidatePath);
      }
      for (let exePath of exesToRename) {
        let renamedPath = `${exePath}.old.${renameTimestamp}`;
        await jk.rename(exePath, renamedPath).then(() => renamedExePairs.push([exePath, renamedPath]), () => {});
      }
    }
    let installResult = await execFileNoThrowWithCwd(packageManager, ["install", "-g", packageSpec], {
        cwd: F3e.homedir()
      }),
      restoreFailCount = 0;
    if (renamedExePairs.length && installResult.code !== 0) {
      Sat = null;
      for (let [originalPath, renamedPath] of renamedExePairs) try {
        await jk.rename(renamedPath, originalPath);
      } catch (renameRestoreErr) {
        try {
          await jk.copyFile(renamedPath, originalPath), logForDebugging(`Restored ${originalPath} by copy after rename failed: ${renameRestoreErr}`), await jk.unlink(renamedPath).catch(unlinkErr => logForDebugging(`Failed to remove ${renamedPath} after copy-restore: ${unlinkErr}`));
        } catch (copyRestoreErr) {
          if (restoreFailCount++, !Sat) Sat = {
            originalPath: originalPath,
            preservedPath: renamedPath
          }, Oe("update_apply", "update_apply_restore_failed");
          De(new Lwa(`Failed to restore ${originalPath} after install failure: rename: ${renameRestoreErr}; copy: ${copyRestoreErr}`));
        }
      }
    }
    if (installResult.code !== 0) {
      let combinedOutput = `${installResult.stdout} ${installResult.stderr}`,
        stderrSignature = ldp(combinedOutput),
        windowsRestoreStatus = renamedExePairs.length === 0 ? "not_attempted" : restoreFailCount === 0 ? "restored" : "partial";
      if (stderrSignature === "warning_only") {
        let installedBinaryPaths = await sdp(),
          expectedVersion = targetVersion ? U3e.parse(targetVersion)?.version : void 0,
          installedVersion,
          installConfirmed = !1;
        for (let binaryPath of installedBinaryPaths) {
          let versionCheckResult = await execFileNoThrowWithCwd(binaryPath, ["--version"], {
            abortSignal: AbortSignal.timeout(45000),
            cwd: F3e.homedir()
          });
          if (installedVersion = U3e.parse(versionCheckResult.stdout.trim().split(/\s+/)[0])?.version, installConfirmed = versionCheckResult.code === 0 && installedVersion != null && (expectedVersion != null ? installedVersion === expectedVersion : cE(installedVersion, {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.185",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-20T06:38:30Z",
            GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
          }.VERSION)), installConfirmed) break;
        }
        if (installConfirmed) return saveGlobalConfig(configObj => ({
          ...configObj,
          installMethod: "global"
        })), Sat = null, isTmuxControlMode("update_apply", "update_apply_npm_install_stderr_warning"), logForDebugging(`npm/bun exited ${installResult.code} with only warnings on stderr but the install-prefix re-probe confirms the install landed (now ${installedVersion}): ${combinedOutput}`), {
          status: "success"
        };
      }
      if (logEvent("tengu_auto_updater_npm_failure", {
        npm_exit_code: installResult.code,
        package_manager: fromEnum(packageManager),
        is_bundled_mode: _A(),
        platform: c5(zt()),
        windows_self_rename: fromEnum(windowsRestoreStatus),
        stderr_signature: fromEnum(stderrSignature),
        npm_error_code: cdp(combinedOutput) ?? Qe("none")
      }), zt() === "windows" && /\b(?:claude|cli)\.exe\b/i.test(combinedOutput) && (/\bEBUSY\b|resource busy or locked/i.test(combinedOutput) || /\bEPERM\b|operation not permitted/i.test(combinedOutput) && (renamedExePairs.length > 0 || /\b(?:rename|copyfile|unlink)\b[^\r\n]*\b(?:claude|cli)\.exe\b/i.test(combinedOutput)))) return Oe("update_apply", "update_apply_exe_locked"), logForDebugging(`Failed to install new version of claude (running executable is locked): ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed",
        failureHint: "windows_running_exe_lock"
      };
      if (/\b(EACCES|EPERM|permission denied)\b/i.test(combinedOutput)) return Oe("update_apply", "update_apply_no_permissions"), logForDebugging("Insufficient permissions for global npm install.", {
        level: "error"
      }), {
        status: "no_permissions"
      };
      if (stderrSignature === "warning_only") return Oe("update_apply", "update_apply_npm_install_stderr_warning"), logForDebugging(`npm/bun exited ${installResult.code} with only warnings on stderr but the re-probe did not confirm an advance: ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed"
      };
      return Oe("update_apply", "update_apply_npm_install_failed"), logForDebugging(`Failed to install new version of claude: ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed"
      };
    }
    return saveGlobalConfig(configObj => ({
      ...configObj,
      installMethod: "global"
    })), Sat = null, Ie("update_apply"), {
      status: "success"
    };
  } finally {
    await odp();
  }
}
async function adp() {
  let shellConfigFiles = yHe();
  for (let [, shellConfigPath] of Object.entries(shellConfigFiles)) try {
    let fileContent = await LFt(shellConfigPath);
    if (!fileContent) continue;
    let {
      filtered: filteredContent,
      hadAlias: hadClaudeAlias
    } = gNn(fileContent);
    if (hadClaudeAlias) await _Nn(shellConfigPath, filteredContent), logForDebugging(`Removed claude alias from ${shellConfigPath}`);
  } catch (shellErr) {
    logForDebugging(`Failed to remove alias from ${shellConfigPath}: ${shellErr}`, {
      level: "error"
    });
  }
}
function ldp(npmOutput) {
  if (/\b(EACCES|EPERM|permission denied)\b/i.test(npmOutput)) return "eacces_eperm";
  if (/\bENOTEMPTY\b/i.test(npmOutput)) return "enotempty";
  if (/\bETARGET\b/i.test(npmOutput)) return "etarget";
  if (/\bE403\b/i.test(npmOutput) || /\b403 forbidden\b/i.test(npmOutput)) return "e403_forbidden";
  if (/\bENOENT\b/i.test(npmOutput)) return "enoent";
  if (/\bE5\d\d\b/i.test(npmOutput) || /\b5\d\d\s+(internal server error|bad gateway|service unavailable|gateway time-?out)\b/i.test(npmOutput)) return "registry_5xx";
  if (/\b(ETIMEDOUT|ESOCKETTIMEDOUT)\b/i.test(npmOutput) || /\btimed[\s-]?out\b/i.test(npmOutput) || /\btimeout\b/i.test(npmOutput)) return "network_timeout";
  if (/\bENOSPC\b/i.test(npmOutput)) return "disk_full";
  if (/\bEBUSY\b/i.test(npmOutput) || /\bresource busy or locked\b/i.test(npmOutput)) return "ebusy";
  let hasWarnings = /npm warn/i.test(npmOutput) || /unknown user config/i.test(npmOutput) || /npm notice/i.test(npmOutput),
    hasErrors = /npm err/i.test(npmOutput) || /\b(EACCES|EPERM|ETARGET)\b/i.test(npmOutput) || /code E/i.test(npmOutput);
  if (hasWarnings && !hasErrors) return "warning_only";
  return "unknown";
}
function cdp(npmOutput) {
  let codeMatch = /\bnpm (?:ERR!|error) code\s+([A-Z][A-Z0-9_]{1,29})(?![A-Za-z0-9_])/.exec(npmOutput)?.[1];
  return codeMatch === void 0 ? void 0 : fromSanitizer_SANITIZER_OUTPUT_ONLY(codeMatch);
}
var Owa,
  jk,
  F3e,
  NW,
  U3e,
  tdp = "https://downloads.claude.ai/claude-code-releases",
  Lwa,
  Zno = 0,
  ndp = 300000,
  Iwa = 300000,
  Dwa = 5000,
  Pwa = 3,
  Sat = null;
var Cge = b(() => {
  ln();
  zn();
  Ct();
  $u();
  SLt();
  ek();
  Qn();
  qe();
  Lr();
  sn();
  bt();
  oa();
  ws();
  ym();
  Rn();
  Jno();
  qs();
  Ap();
  yr();
  yNn();
  Xt();
  Owa = require("fs"), jk = require("fs/promises"), F3e = require("os"), NW = require("path"), U3e = M(O4(), 1);
  Lwa = class Lwa extends uyt {};
});
export {Mwa,bat,TNn,$3e,Eat,Nwa,Bwa,SNn,Cat,Fwa,rdp,odp,ero,Uwa,sdp,$wa,vat,qwa,MFt,idp,bNn,jwa,wat,NFt,adp,ldp,cdp,Owa,jk,F3e,NW,U3e,tdp,Lwa,Zno,ndp,Iwa,Dwa,Pwa,Sat,Cge};
