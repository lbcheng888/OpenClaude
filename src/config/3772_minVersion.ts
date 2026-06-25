// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT as z7,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {QQ,U0,fet,fE} from "../../vendor/m2214.ts";
import {gracefulShutdownSync as Rc,isAmberSentinelEnabled as Np} from "./3348_flushAnalyticsSinks.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {cT,A8,vu} from "../mcp/2200_mcpServerName.ts";
import {getInitialSettings as Fr,getSettingsForSource as An,br} from "./0745_updateSettingsForSource.ts";
import {or,dn} from "./0137_namespace.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {In,cn,Ct,Fbt} from "../../vendor/m197.ts";
import {Ne} from "../../vendor/m583.ts";
import {Rf} from "../../vendor/m465.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {qt,tn} from "./0230_encoding.ts";
import {Vi,$d} from "./0620_$d.ts";
import {iUn,Oao} from "../../vendor/m3769.ts";
import {Hge,Y1t} from "../api/3029_expanded.ts";
import {externalHttp as $b,_k} from "../core/0576_isCancel.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Le,Ve,isKeybindingCustomizationEnabled as Ng} from "../../vendor/m5.ts";
import {a0e,d$t,lUn,cUn,uUn} from "../../vendor/m3770.ts";
import {b,x} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {t4} from "../../vendor/m2347.ts";
// @ts-nocheck

/**
 * Checks the remotely-configured `tengu_version_config.minVersion`. If the
 * running build is below that minimum, prints an upgrade notice and exits.
 */
async function ePa() {
  try {
    let versionConfig = await z7("tengu_version_config", {
      minVersion: "0.0.0"
    });
    if (versionConfig.minVersion && QQ({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, versionConfig.minVersion)) console.error(`
It looks like your version of Claude Code (${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}) needs an update.
A newer version (${versionConfig.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`), Rc(1);
  } catch (fetchErr) {
    Ie(fetchErr);
  }
}

/** Returns true (and logs) if an auto-update check ran within the throttle window. */
function bct() {
  let nowMs = Date.now();
  if (nowMs - Nao < Wbp) return A(`auto-update check throttled (last check ${Math.round((nowMs - Nao) / 1000)}s ago)`), !0;
  return Nao = nowMs, !1;
}

async function dUn() {
  return (await tqe()).maxVersion;
}

/** Reads and parses `tengu_max_version_config` into a maxVersion + force-downgrade flag. */
async function tqe() {
  let rawConfig = await nPa(),
    forceDowngrade = !1,
    rawExternal = rawConfig.external || void 0,
    parsedExternalVersion = rawExternal ? eqe.parse(rawExternal)?.version ?? void 0 : void 0;
  if (rawExternal && !parsedExternalVersion) A(`tengu_max_version_config has invalid version '${rawExternal}' — ignoring`, {
    level: "error"
  }), W("tengu_max_version_config_invalid", {
    raw_value: cT(rawExternal)
  });
  return {
    maxVersion: parsedExternalVersion,
    forceDowngradeEnabled: rawConfig.external_force_downgrade === !0
  };
}

/** Decides whether a force-downgrade from currentVersion to targetVersion should occur. */
function Ect(currentVersion, targetVersion, installerType) {
  let installerLabel = installerType === "native_update" ? "Native installer" : "AutoUpdater",
    parsedCurrent = eqe.parse(currentVersion);
  if (parsedCurrent && parsedCurrent.compare(targetVersion) > 0) return A(`${installerLabel}: force-downgrade active — moving from ${currentVersion} to ${targetVersion}`), !0;
  return A(`${installerLabel}: force-downgrade flag set but current ${currentVersion} is not above ${targetVersion} — taking normal upgrade path`), !1;
}

async function tPa() {
  return (await nPa()).external_message || void 0;
}

async function nPa() {
  try {
    return await z7("tengu_max_version_config", {});
  } catch (fetchErr) {
    return Ie(fetchErr), {};
  }
}

/** Returns a human-readable reason a candidate version is disallowed by policy, or null. */
function pUn(candidateVersion) {
  let minVersion = Fr()?.minimumVersion;
  if (minVersion && !U0(candidateVersion, minVersion)) return `below your minimumVersion setting (${minVersion})`;
  let requiredMax = An("policySettings")?.requiredMaximumVersion;
  if (requiredMax) {
    let parsedMax = eqe.parse(requiredMax)?.version;
    if (!parsedMax) A(`requiredMaximumVersion '${requiredMax}' is not a valid semver version — ignoring`, {
      level: "error"
    });else if (!fet(candidateVersion, parsedMax)) return `above your organization's requiredMaximumVersion (${requiredMax})`;
  }
  return null;
}

/** True if updating to candidateVersion should be skipped (logs the reason). */
function Cct(candidateVersion) {
  let rejectionReason = pUn(candidateVersion);
  if (rejectionReason) A(`Skipping update to ${candidateVersion}: ${rejectionReason}`);
  return rejectionReason !== null;
}

function rPa() {
  return QW.join(or(), ".update.lock");
}

/** Acquires the update lock file (clearing a stale one). Returns true on success. */
async function Gbp() {
  let fsAsync = Wt(),
    lockFilePath = rPa();
  try {
    let existingStat = await fsAsync.stat(lockFilePath);
    if (Date.now() - existingStat.mtimeMs < YDa) return !1;
    try {
      let recheckStat = await fsAsync.stat(lockFilePath);
      if (Date.now() - recheckStat.mtimeMs < YDa) return !1;
      await fsAsync.unlink(lockFilePath);
    } catch (recheckErr) {
      if (!In(recheckErr)) return Ie(recheckErr), !1;
    }
  } catch (statErr) {
    if (!In(statErr)) return Ie(statErr), !1;
  }
  try {
    return await lH.writeFile(lockFilePath, `${process.pid}`, {
      encoding: "utf8",
      flag: "wx"
    }), !0;
  } catch (writeErr) {
    let errCode = cn(writeErr);
    if (errCode === "EEXIST") return !1;
    if (errCode === "ENOENT") try {
      return await fsAsync.mkdir(or()), await lH.writeFile(lockFilePath, `${process.pid}`, {
        encoding: "utf8",
        flag: "wx"
      }), !0;
    } catch (mkdirErr) {
      if (cn(mkdirErr) === "EEXIST") return !1;
      return A(`Failed to create config dir or update lock file: ${mkdirErr}`, {
        level: "error"
      }), !1;
    }
    return A(`AutoUpdater: failed to create update lock file ${lockFilePath}: ${writeErr}`, {
      level: "error"
    }), !1;
  }
}

/** Releases the update lock file if it belongs to this process. */
async function Vbp() {
  let fsAsync = Wt(),
    lockFilePath = rPa();
  try {
    if ((await fsAsync.readFile(lockFilePath, {
      encoding: "utf8"
    })) === `${process.pid}`) await fsAsync.unlink(lockFilePath);
  } catch (readErr) {
    if (In(readErr)) return;
    A(`AutoUpdater: failed to release update lock file ${lockFilePath}: ${readErr}`, {
      level: "error"
    });
  }
}

/** Detects whether the running install is managed by bun or npm. */
function Fao() {
  let execPath = process.execPath.replace(/\\/g, "/"),
    bunInstallPrefix = (process.env.BUN_INSTALL ?? "").replace(/\\/g, "/").replace(/\/+$/, "");
  if (execPath.includes("/.bun/install/global/") || bunInstallPrefix && execPath.startsWith(bunInstallPrefix + "/install/global/")) return "bun";
  return Ne.isRunningWithBun() && !Rf() ? "bun" : "npm";
}

/** Resolves the global install prefix for the active package manager, or null. */
async function oPa() {
  let isBun = Fao() === "bun",
    result = null;
  if (isBun) result = await Wr("bun", ["pm", "bin", "-g"], {
    cwd: Z4e.homedir()
  });else result = await Wr("npm", ["-g", "config", "get", "prefix"], {
    cwd: Z4e.homedir()
  });
  if (result.code !== 0) return A(`Failed to check ${isBun ? "bun" : "npm"} permissions (exit ${result.code}): ${result.stderr.trim()}`, {
    level: "error"
  }), null;
  return result.stdout.trim() || null;
}

/** Returns candidate paths to the installed `claude` binary for the current platform. */
async function Kbp() {
  let prefix = await oPa();
  if (!prefix) return [];
  if (Fao() === "bun") return [QW.join(prefix, "claude")];
  if (Yt() === "windows") return [QW.join(prefix, "claude.cmd"), QW.join(prefix, "claude.exe")];
  return [QW.join(prefix, "bin", "claude")];
}

/** Checks write permission on the global npm prefix. */
async function sPa() {
  try {
    let prefix = await oPa();
    if (!prefix) return {
      hasPermissions: !1,
      npmPrefix: null
    };
    try {
      return await lH.access(prefix, QDa.constants.W_OK), {
        hasPermissions: !0,
        npmPrefix: prefix
      };
    } catch {
      return A("Insufficient permissions for global npm install.", {
        level: "error"
      }), {
        hasPermissions: !1,
        npmPrefix: prefix
      };
    }
  } catch (err) {
    return Ie(err), {
      hasPermissions: !1,
      npmPrefix: null
    };
  }
}

/** Queries the npm registry for the version published under the given dist-tag. */
async function Act(distTag) {
  let tagName = distTag === "stable" ? "stable" : "latest",
    npmResult = await Wr("npm", ["view", `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL}@${tagName}`, "version", "--prefer-online"], {
      abortSignal: AbortSignal.timeout(5000),
      cwd: Z4e.homedir()
    });
  if (npmResult.code !== 0) {
    let stdoutVersion = npmResult.stdout.trim();
    if (stdoutVersion && eqe.parse(stdoutVersion)) {
      if (Pt("update_check", "update_check_npm_view_stderr_warning"), A(`npm view exited ${npmResult.code} but printed a valid version (${stdoutVersion}) — treating stderr as a warning`), npmResult.stderr) A(`npm stderr: ${npmResult.stderr.trim()}`);
      return stdoutVersion;
    }
    if (xe("update_check", "update_check_npm_view_failed"), A(`npm view failed with code ${npmResult.code}`), npmResult.stderr) A(`npm stderr: ${npmResult.stderr.trim()}`);else A("npm stderr: (empty)");
    if (npmResult.stdout) A(`npm stdout: ${npmResult.stdout.trim()}`);
    return null;
  }
  return He("update_check"), npmResult.stdout.trim() || null;
}

/** Queries npm dist-tags and returns `{ latest, stable }` version strings. */
async function iPa() {
  let distTagsResult = await Wr("npm", ["view", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.PACKAGE_URL, "dist-tags", "--json", "--prefer-online"], {
    abortSignal: AbortSignal.timeout(5000),
    cwd: Z4e.homedir()
  });
  if (distTagsResult.code !== 0) return A(`npm view dist-tags failed with code ${distTagsResult.code}`), {
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
    return A(`Failed to parse dist-tags: ${parseErr}`), {
      latest: null,
      stable: null
    };
  }
}

/** Fetches a release artifact (e.g. "latest"/"stable") from GCS with retries. */
async function p$t(artifactFilename) {
  if (Vi()) return null;
  let attemptCount = 0;
  try {
    let response = await iUn(abortSignal => (attemptCount++, Hge.get(`${qbp}/${artifactFilename}`, {
      timeout: JDa,
      responseType: "text",
      signal: abortSignal
    })), {
      attempts: XDa,
      timeoutMs: JDa,
      onRetry: (attemptNum, retryErr) => {
        A(`Failed to fetch ${artifactFilename} from GCS on attempt ${attemptNum}/${XDa}, retrying: ${retryErr}`);
      }
    });
    if (attemptCount > 1) Pt("update_check", "update_check_gcs_retry");else He("update_check");
    return response.data.trim();
  } catch (gcsErr) {
    return xe("update_check", "update_check_gcs_failed"), A(`Failed to fetch ${artifactFilename} from GCS after ${attemptCount} attempt(s): ${gcsErr}`), null;
  }
}

/** Fetches the published Homebrew cask version from formulae.brew.sh. */
async function zbp(caskName) {
  if (Vi()) return null;
  try {
    let caskVersion = (await $b.get(`https://formulae.brew.sh/api/cask/${caskName}.json`, {
      timeout: 5000,
      responseType: "json"
    })).data?.version;
    return He("update_check"), typeof caskVersion === "string" ? caskVersion : null;
  } catch (fetchErr) {
    return xe("update_check", "update_check_homebrew_failed"), A(`Failed to fetch ${caskName} from formulae.brew.sh: ${fetchErr}`), null;
  }
}

/** Returns the Homebrew cask version if available, otherwise the GCS artifact version. */
async function mUn(caskName, gcsArtifact) {
  let [brewVersion, gcsVersion] = await Promise.all([zbp(caskName), p$t(gcsArtifact)]);
  return brewVersion ?? gcsVersion;
}

/** Fetches the latest and stable release versions from GCS in parallel. */
async function aPa() {
  let [latestVersion, stableVersion] = await Promise.all([p$t("latest"), p$t("stable")]);
  return {
    latest: latestVersion,
    stable: stableVersion
  };
}

function Rct() {
  return Sct;
}

/** Performs a global package-manager install of the target (or latest) version. */
async function m$t(targetVersion) {
  if (!(await Gbp())) return Pt("update_apply", "update_apply_lock_contention"), A("Another process is currently installing an update", {
    level: "error"
  }), W("tengu_auto_updater_lock_contention", {
    pid: process.pid,
    currentVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION
  }), {
    status: "in_progress"
  };
  try {
    await jbp();
    let packageManager = Fao();
    if (packageManager === "npm" && Ne.isNpmFromWindowsPath()) return xe("update_apply", "update_apply_wsl_windows_npm"), A("Windows NPM detected in WSL environment", {
      level: "error"
    }), W("tengu_auto_updater_windows_npm_in_wsl", {
      currentVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
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
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.PACKAGE_URL}@${targetVersion}` : {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.PACKAGE_URL,
      isWindowsBundledMode = Yt() === "windows" && Rf() && process.execPath.replace(/\\/g, "/").includes("/node_modules/@anthropic-ai/"),
      renamedExePairs = [];
    if (isWindowsBundledMode) {
      let installDirParent = QW.join(QW.dirname(process.execPath), "..", ".."),
        grandParent = QW.join(installDirParent, "..");
      for (let scanDir of [grandParent, installDirParent]) for (let dirEntry of await lH.readdir(scanDir, {
        withFileTypes: !0
      }).catch(() => [])) {
        if (!dirEntry.isDirectory() || !dirEntry.name.startsWith(".")) continue;
        let candidateDir = QW.join(scanDir, dirEntry.name);
        if (await Promise.all([lH.readdir(candidateDir).catch(() => []), lH.readdir(QW.join(candidateDir, "bin")).catch(() => [])]).then(([topFiles, binFiles]) => [...topFiles, ...binFiles].some(fileName => /\.exe\.old\.\d+$/.test(fileName)))) await lH.rm(candidateDir, {
          recursive: !0,
          force: !0
        }).catch(rmErr => A(`retired-dir cleanup failed: ${rmErr}`));
      }
      let renameTimestamp = Date.now(),
        currentExeInode = await lH.stat(process.execPath, {
          bigint: !0
        }).then(statResult => statResult.ino).catch(() => 0n),
        exesToRename = [process.execPath];
      for (let siblingEntry of await lH.readdir(installDirParent).catch(() => [])) for (let exeName of ["claude.exe", "cli.exe"]) {
        let candidatePath = QW.join(installDirParent, siblingEntry, exeName);
        if (candidatePath === process.execPath) continue;
        let candidateInode = await lH.stat(candidatePath, {
          bigint: !0
        }).then(statResult => statResult.ino).catch(() => -1n);
        if (currentExeInode && candidateInode === currentExeInode) exesToRename.push(candidatePath);
      }
      for (let exePath of exesToRename) {
        let renamedPath = `${exePath}.old.${renameTimestamp}`;
        await lH.rename(exePath, renamedPath).then(() => renamedExePairs.push([exePath, renamedPath]), () => {});
      }
    }
    let installResult = await Wr(packageManager, ["install", "-g", packageSpec], {
        cwd: Z4e.homedir()
      }),
      restoreFailCount = 0;
    if (renamedExePairs.length && installResult.code !== 0) {
      Sct = null;
      for (let [originalPath, renamedPath] of renamedExePairs) try {
        await lH.rename(renamedPath, originalPath);
      } catch (renameRestoreErr) {
        try {
          await lH.copyFile(renamedPath, originalPath), A(`Restored ${originalPath} by copy after rename failed: ${renameRestoreErr}`), await lH.unlink(renamedPath).catch(unlinkErr => A(`Failed to remove ${renamedPath} after copy-restore: ${unlinkErr}`));
        } catch (copyRestoreErr) {
          if (restoreFailCount++, !Sct) Sct = {
            originalPath: originalPath,
            preservedPath: renamedPath
          }, xe("update_apply", "update_apply_restore_failed");
          Ie(new ZDa(`Failed to restore ${originalPath} after install failure: rename: ${renameRestoreErr}; copy: ${copyRestoreErr}`));
        }
      }
    }
    if (installResult.code !== 0) {
      let combinedOutput = `${installResult.stdout} ${installResult.stderr}`,
        stderrSignature = Ybp(combinedOutput),
        windowsRestoreStatus = renamedExePairs.length === 0 ? "not_attempted" : restoreFailCount === 0 ? "restored" : "partial";
      if (stderrSignature === "warning_only") {
        let installedBinaryPaths = await Kbp(),
          expectedVersion = targetVersion ? eqe.parse(targetVersion)?.version : void 0,
          installedVersion,
          installConfirmed = !1;
        for (let binaryPath of installedBinaryPaths) {
          let versionCheckResult = await Wr(binaryPath, ["--version"], {
            abortSignal: AbortSignal.timeout(45000),
            cwd: Z4e.homedir()
          });
          if (installedVersion = eqe.parse(versionCheckResult.stdout.trim().split(/\s+/)[0])?.version, installConfirmed = versionCheckResult.code === 0 && installedVersion != null && (expectedVersion != null ? installedVersion === expectedVersion : fE(installedVersion, {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.190",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-24T02:21:52Z",
            GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
          }.VERSION)), installConfirmed) break;
        }
        if (installConfirmed) return hn(configObj => ({
          ...configObj,
          installMethod: "global"
        })), Sct = null, Pt("update_apply", "update_apply_npm_install_stderr_warning"), A(`npm/bun exited ${installResult.code} with only warnings on stderr but the install-prefix re-probe confirms the install landed (now ${installedVersion}): ${combinedOutput}`), {
          status: "success"
        };
      }
      if (W("tengu_auto_updater_npm_failure", {
        npm_exit_code: installResult.code,
        package_manager: Le(packageManager),
        is_bundled_mode: Rf(),
        platform: A8(Yt()),
        windows_self_rename: Le(windowsRestoreStatus),
        stderr_signature: Le(stderrSignature),
        npm_error_code: Jbp(combinedOutput) ?? Ve("none")
      }), Yt() === "windows" && /\b(?:claude|cli)\.exe\b/i.test(combinedOutput) && (/\bEBUSY\b|resource busy or locked/i.test(combinedOutput) || /\bEPERM\b|operation not permitted/i.test(combinedOutput) && (renamedExePairs.length > 0 || /\b(?:rename|copyfile|unlink)\b[^\r\n]*\b(?:claude|cli)\.exe\b/i.test(combinedOutput)))) return xe("update_apply", "update_apply_exe_locked"), A(`Failed to install new version of claude (running executable is locked): ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed",
        failureHint: "windows_running_exe_lock"
      };
      if (/\b(EACCES|EPERM|permission denied)\b/i.test(combinedOutput)) return xe("update_apply", "update_apply_no_permissions"), A("Insufficient permissions for global npm install.", {
        level: "error"
      }), {
        status: "no_permissions"
      };
      if (stderrSignature === "warning_only") return xe("update_apply", "update_apply_npm_install_stderr_warning"), A(`npm/bun exited ${installResult.code} with only warnings on stderr but the re-probe did not confirm an advance: ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed"
      };
      return xe("update_apply", "update_apply_npm_install_failed"), A(`Failed to install new version of claude: ${combinedOutput}`, {
        level: "error"
      }), {
        status: "install_failed"
      };
    }
    return hn(configObj => ({
      ...configObj,
      installMethod: "global"
    })), Sct = null, He("update_apply"), {
      status: "success"
    };
  } finally {
    await Vbp();
  }
}

/** Removes any `claude` alias lines from the user's shell config files. */
async function jbp() {
  let shellConfigFiles = a0e();
  for (let [, shellConfigPath] of Object.entries(shellConfigFiles)) try {
    let fileContent = await d$t(shellConfigPath);
    if (!fileContent) continue;
    let {
      filtered: filteredContent,
      hadAlias: hadClaudeAlias
    } = lUn(fileContent);
    if (hadClaudeAlias) await cUn(shellConfigPath, filteredContent), A(`Removed claude alias from ${shellConfigPath}`);
  } catch (shellErr) {
    A(`Failed to remove alias from ${shellConfigPath}: ${shellErr}`, {
      level: "error"
    });
  }
}

/** Classifies combined npm/bun output into a coarse failure signature. */
function Ybp(npmOutput) {
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

/** Extracts the `npm ERR! code <CODE>` token from npm output, if present. */
function Jbp(npmOutput) {
  let codeMatch = /\bnpm (?:ERR!|error) code\s+([A-Z][A-Z0-9_]{1,29})(?![A-Za-z0-9_])/.exec(npmOutput)?.[1];
  return codeMatch === void 0 ? void 0 : Ng(codeMatch);
}
var QDa,
  lH,
  Z4e,
  QW,
  eqe,
  qbp = "https://downloads.claude.ai/claude-code-releases",
  ZDa,
  Nao = 0,
  Wbp = 300000,
  YDa = 300000,
  JDa = 5000,
  XDa = 3,
  Sct = null;
var F_e = b(() => {
  mn();
  jn();
  kt();
  vu();
  Y1t();
  _k();
  tr();
  qe();
  Ir();
  dn();
  Ct();
  Ii();
  ps();
  Np();
  vn();
  Oao();
  Es();
  $d();
  br();
  uUn();
  tn();
  QDa = require("fs"), lH = require("fs/promises"), Z4e = require("os"), QW = require("path"), eqe = x(t4(), 1);
  ZDa = class ZDa extends Fbt {};
});

export {ePa,bct,dUn,tqe,Ect,tPa,nPa,pUn,Cct,rPa,Gbp,Vbp,Fao,oPa,Kbp,sPa,Act,iPa,p$t,zbp,mUn,aPa,Rct,m$t,jbp,Ybp,Jbp,QDa,lH,Z4e,QW,eqe,qbp,ZDa,Nao,Wbp,YDa,JDa,XDa,Sct,F_e};
