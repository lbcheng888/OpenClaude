// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {WM,E8} from "./2192_terminal.ts";
import {Mee,Rma,WPn,Jae,o_e} from "../../vendor/m3289.ts";
import {cn,Ce,mo,In,Ct} from "../../vendor/m197.ts";
import {u0e,TPa,T$t,sqe,yPa,EUn,Qao} from "../../vendor/m3776.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {zg,E8s} from "../../vendor/m1479.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {nt} from "../../vendor/m127.ts";
import {gPa,_$t,Jao} from "./3776_timeout.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {tqe,Ect,Cct,F_e} from "./3772_minVersion.ts";
import {fE,U0} from "../../vendor/m2214.ts";
import {cT,vu} from "../mcp/2200_mcpServerName.ts";
import {Pt,He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {U_e,c0e} from "../../vendor/m3774.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {_ct,Q4e} from "../../vendor/m3769.ts";
import {a0e,d$t,lUn,cUn,uUn} from "../../vendor/m3770.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {b,x} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
import {t4} from "../../vendor/m2347.ts";
// Native installer lifecycle: resolve platform paths, stage/install binary,
// version-lock acquisition, update orchestration, and cleanup of old versions/locks.
// Ported from v2.1.185 readable module 3762_level.ts; structure follows the v190 ground truth.

/** Resolve the platform/arch slug used to select the native package (e.g. "darwin-arm64", "linux-arm64-android"). */
function ite(): string {
  let platform = Ne.platform,
    arch = "arm64";
  if (!arch) {
    let unsupportedErr = Error("Unsupported architecture: arm64");
    throw A("Native installer does not support architecture: arm64", {
      level: "error"
    }), unsupportedErr;
  }
  if (yEp) arch = "arm64";
  if (platform === "linux") {
    if (WM.isAndroidEnvironment()) return `linux-${arch}-android`;
    if (WM.isMuslEnvironment()) return `linux-${arch}-musl`;
  }
  return `${platform}-${arch}`;
}

/** Executable file name for the given platform slug. */
function SUn(platformSlug: string): string {
  return platformSlug.startsWith("win32") ? "claude.exe" : "claude";
}

/** Compute the on-disk layout (versions/staging/locks dirs + the user-facing executable path). */
function Wle(): {
  versions: string;
  staging: string;
  locks: string;
  executable: string;
} {
  let platformSlug = ite(),
    execName = SUn(platformSlug);
  return {
    versions: gm.join(Mee(), "claude", "versions"),
    staging: gm.join(Rma(), "claude", "staging"),
    locks: gm.join(WPn(), "claude", "locks"),
    executable: gm.join(Jae(), execName)
  };
}

/** True if the path is a non-empty regular file with the owner-execute bit set. */
async function iqe(filePath: string): Promise<boolean> {
  try {
    let stats = await dc.stat(filePath);
    if (!stats.isFile() || stats.size === 0) return !1;
    return (stats.mode & APa.constants.S_IXUSR) !== 0;
  } catch {
    return !1;
  }
}

/** Create the install dirs, validate the version string, reserve the install marker, and return staging/install paths. */
async function nlo(version: string): Promise<{
  stagingPath: string;
  installPath: string;
}> {
  let paths = Wle(),
    baseDirs = [paths.versions, paths.staging, paths.locks];
  await Promise.all(baseDirs.map(dir => dc.mkdir(dir, {
    recursive: !0
  })));
  let execDir = gm.dirname(paths.executable);
  if (await dc.mkdir(execDir, {
    recursive: !0
  }), !/^[a-zA-Z0-9._+-]+$/.test(version) || version.includes("..") || version === ".") throw Error(`Invalid version string "${version}": contains path-unsafe characters`);
  let installPath = gm.join(paths.versions, version);
  try {
    await dc.writeFile(installPath, "", {
      encoding: "utf8",
      flag: "wx"
    });
  } catch (writeErr) {
    if (cn(writeErr) !== "EEXIST") throw writeErr;
  }
  return {
    stagingPath: gm.join(paths.staging, version),
    installPath: installPath
  };
}

/** Run `callback` while holding the version lock for `version`; retries with exponential backoff. Returns true on success. */
async function vPa(version: string, callback: () => Promise<void>, retries: number = 0): Promise<boolean> {
  let paths = Wle(),
    lockPath = S$t(paths, version);
  if (await dc.mkdir(paths.locks, {
    recursive: !0
  }), u0e()) {
    let attempt = 0,
      maxAttempts = retries + 1,
      minTimeout = retries > 0 ? 1000 : 100,
      maxTimeout = retries > 0 ? 5000 : 500;
    while (attempt < maxAttempts) {
      if (await TPa(version, lockPath, async () => {
        try {
          await callback();
        } catch (cbErr) {
          throw A(`Native installer version-lock callback failed: ${cbErr}`, {
            level: "error"
          }), cbErr;
        }
      })) return W("tengu_version_lock_acquired", {
        is_pid_based: !0,
        is_lifetime_lock: !1,
        attempts: attempt + 1
      }), !0;
      if (attempt++, attempt < maxAttempts) {
        let backoff = Math.min(minTimeout * Math.pow(2, attempt - 1), maxTimeout);
        await Kn(backoff);
      }
    }
    return W("tengu_version_lock_failed", {
      is_pid_based: !0,
      is_lifetime_lock: !1,
      attempts: maxAttempts
    }), AUn(version, Error("Lock held by another process")), !1;
  }
  let release: (() => Promise<void>) | null = null;
  try {
    try {
      release = await zg(version, {
        stale: tlo,
        retries: {
          retries: retries,
          minTimeout: retries > 0 ? 1000 : 100,
          maxTimeout: retries > 0 ? 5000 : 500
        },
        lockfilePath: lockPath,
        onCompromised: compromisedErr => {
          A(`NON-FATAL: Version lock was compromised during operation: ${compromisedErr.message}`, {
            level: "info"
          });
        }
      });
    } catch (acquireErr) {
      return W("tengu_version_lock_failed", {
        is_pid_based: !1,
        is_lifetime_lock: !1
      }), AUn(version, acquireErr), !1;
    }
    try {
      return await callback(), W("tengu_version_lock_acquired", {
        is_pid_based: !1,
        is_lifetime_lock: !1
      }), !0;
    } catch (cbErr) {
      throw A(`tryWithVersionLock: callback failed under version lock: ${Ce(cbErr)}`, {
        level: "error"
      }), cbErr;
    }
  } finally {
    if (release) await release();
  }
}

/** Atomically copy `source` into `dest` (copy to temp, chmod 0755, rename). */
async function wPa(source: string, dest: string): Promise<void> {
  await dc.mkdir(gm.dirname(dest), {
    recursive: !0
  });
  let tmpPath = `${dest}.tmp.${process.pid}.${Date.now()}`;
  try {
    await dc.copyFile(source, tmpPath), await dc.chmod(tmpPath, 493), await dc.rename(tmpPath, dest), A(`Atomically installed binary to ${dest}`);
  } catch (err) {
    try {
      await dc.unlink(tmpPath);
    } catch {}
    throw err;
  }
}

/** Install from an npm staged package: locate the platform-specific @anthropic-ai package, then atomically move its cli binary. */
async function TEp(stagingDir: string, dest: string): Promise<void> {
  try {
    let anthropicDir = gm.join(stagingDir, "node_modules", "@anthropic-ai"),
      nativePkg = (await dc.readdir(anthropicDir)).find(entry => entry.startsWith("claude-cli-native-"));
    if (!nativePkg) throw W("tengu_native_install_package_failure", {
      stage_find_package: !0,
      error_package_not_found: !0
    }), Error("Could not find platform-specific native package");
    let cliPath = gm.join(anthropicDir, nativePkg, "cli");
    try {
      await dc.stat(cliPath);
    } catch {
      throw W("tengu_native_install_package_failure", {
        stage_binary_exists: !0,
        error_binary_not_found: !0
      }), Error("Native binary not found in staged package");
    }
    await wPa(cliPath, dest), await dc.rm(stagingDir, {
      recursive: !0,
      force: !0
    }), W("tengu_native_install_package_success", {});
  } catch (err) {
    let msg = Ce(err);
    if (!(msg.includes("Could not find platform-specific") || msg.includes("Native binary not found"))) W("tengu_native_install_package_failure", {
      stage_atomic_move: !0,
      error_move_failed: !0
    }), Ie(mo(err));else A(`installVersionFromPackage: ${msg}`, {
      level: "error"
    });
    throw err;
  }
}

/** Install from a staged native binary: locate the platform executable in the staging dir, then atomically move it. */
async function SEp(stagingDir: string, dest: string): Promise<void> {
  try {
    let platformSlug = ite(),
      execName = SUn(platformSlug),
      stagedBinary = gm.join(stagingDir, execName);
    try {
      await dc.stat(stagedBinary);
    } catch {
      throw W("tengu_native_install_binary_failure", {
        stage_binary_exists: !0,
        error_binary_not_found: !0
      }), Error("Staged binary not found");
    }
    await wPa(stagedBinary, dest), await dc.rm(stagingDir, {
      recursive: !0,
      force: !0
    }), W("tengu_native_install_binary_success", {});
  } catch (err) {
    if (!Ce(err).includes("Staged binary not found")) W("tengu_native_install_binary_failure", {
      stage_atomic_move: !0,
      error_move_failed: !0
    });
    throw Ie(mo(err)), err;
  }
}

/** Dispatch to npm-package or raw-binary install based on the source kind. */
async function bEp(stagingDir: string, dest: string, sourceKind: string): Promise<void> {
  if (sourceKind === "npm") await TEp(stagingDir, dest);else await SEp(stagingDir, dest);
}

/** Download (unless already present or `force`), install, and point the executable symlink at the given version. Returns true if a (re)install happened. */
async function bPa(version: string, force: boolean): Promise<boolean> {
  let {
      stagingPath: stagingPath,
      installPath: installPath
    } = await nlo(version),
    {
      executable: executable
    } = Wle(),
    effectiveStagingPath = nt("true") ? `${stagingPath}.${process.pid}.${Date.now()}` : stagingPath,
    needsInstall = !(await kPa(version)) || force;
  if (needsInstall) {
    A(force ? `Force reinstalling native installer version ${version}` : `Downloading native installer version ${version}`);
    let sourceKind = await gPa(version, effectiveStagingPath);
    await bEp(effectiveStagingPath, installPath, sourceKind);
  } else A(`Version ${version} already installed, updating symlink`);
  if (await AEp(executable), !(await REp(executable, installPath)) && !(await iqe(executable))) {
    let sourceExists = !1;
    try {
      await dc.stat(installPath), sourceExists = !0;
    } catch {}
    throw Error(`Failed to create executable at ${executable}. Source file exists: ${sourceExists}. Check write permissions to ${executable}.`);
  }
  return needsInstall;
}

/** True if the install marker for `version` exists and is an executable file. */
async function kPa(version: string): Promise<boolean> {
  let {
    installPath: installPath
  } = await nlo(version);
  return iqe(installPath);
}

/** Read the canary version override from the GrowthBook feature flag, or null if absent/invalid. */
function EEp(): string | null {
  try {
    let flag = it("tengu_canary", {});
    return typeof flag.external === "string" && RPa.valid(flag.external) || null;
  } catch (err) {
    return A(`getCanaryVersion: GB read failed, falling through: ${Ce(err)}`), null;
  }
}

/** Full native update flow: resolve target version (canary/maxVersion/downgrade aware), install under lock, emit telemetry. */
async function CEp(requestedVersion: string, force: boolean = !1): Promise<{
  success: boolean;
  latestVersion: string | null;
  wasSkipped?: boolean;
  lockFailed?: boolean;
  lockHolderPid?: number;
}> {
  let startTime = Date.now(),
    {
      executable: executable
    } = Wle(),
    isNonSemver = !/^v?\d+\.\d+\.\d+(-\S+)?$/.test(requestedVersion),
    {
      maxVersion: maxVersion,
      forceDowngradeEnabled: forceDowngradeEnabled
    } = await tqe(),
    isForcedDowngrade = forceDowngradeEnabled && !force && isNonSemver && !!maxVersion && Ect({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, maxVersion, "native_update"),
    targetVersion = isForcedDowngrade ? maxVersion : await _$t(requestedVersion);
  if (A(`Checking for native installer update to version ${targetVersion}`), requestedVersion === "latest" && !isForcedDowngrade) {
    let canary = EEp(),
      canaryExceedsMax = canary && maxVersion && fE(canary, maxVersion);
    if (canary && fE(canary, targetVersion) && !canaryExceedsMax) A(`Native installer: canary ${canary} active, overriding ${targetVersion}`), targetVersion = canary;else if (canaryExceedsMax) A(`Native installer: canary ${canary} exceeds maxVersion ${maxVersion}, not applying`);
  }
  if (!isForcedDowngrade && !force && maxVersion && fE(targetVersion, maxVersion)) {
    if (A(`Native installer: maxVersion ${maxVersion} is set, capping update from ${targetVersion} to ${maxVersion}`), U0({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, maxVersion)) return A(`Native installer: current version ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION} is already at or above maxVersion ${maxVersion}, skipping update`), W("tengu_native_update_skipped_max_version", {
      latency_ms: Date.now() - startTime,
      max_version: cT(maxVersion),
      available_version: cT(targetVersion)
    }), {
      success: !0,
      wasSkipped: !0,
      latestVersion: targetVersion
    };
    targetVersion = maxVersion;
  }
  if (!force && targetVersion === {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION && (await kPa(targetVersion)) && (await iqe(executable))) return A(`Found ${targetVersion} at ${executable}, skipping install`), W("tengu_native_update_complete", {
    latency_ms: Date.now() - startTime,
    was_new_install: !1,
    was_force_reinstall: !1,
    was_already_running: !0
  }), {
    success: !0,
    wasSkipped: !0,
    latestVersion: targetVersion
  };
  if (!force && Cct(targetVersion)) return W("tengu_native_update_skipped_minimum_version", {
    latency_ms: Date.now() - startTime,
    target_version: cT(targetVersion)
  }), {
    success: !0,
    wasSkipped: !0,
    latestVersion: targetVersion
  };
  if (isForcedDowngrade) W("tengu_native_update_forced_downgrade", {
    from_version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    to_version: cT(targetVersion)
  });
  let wasNewInstall = !1,
    elapsedMs: number;
  if (nt("true")) wasNewInstall = await bPa(targetVersion, force), elapsedMs = Date.now() - startTime;else {
    let {
      installPath: installPath
    } = await nlo(targetVersion);
    if (force) await wEp(installPath);
    let lockAcquired = await vPa(installPath, async () => {
      wasNewInstall = await bPa(targetVersion, force);
    }, 3);
    if (elapsedMs = Date.now() - startTime, !lockAcquired) {
      let paths = Wle(),
        lockHolderPid: number | undefined;
      if (u0e()) {
        let lockPath = S$t(paths, installPath);
        if (T$t(lockPath)) lockHolderPid = sqe(lockPath)?.pid;
      }
      return Pt("update_apply", "update_apply_native_lock_failed"), W("tengu_native_update_lock_failed", {
        latency_ms: elapsedMs,
        lock_holder_pid: lockHolderPid
      }), {
        success: !1,
        latestVersion: targetVersion,
        lockFailed: !0,
        lockHolderPid: lockHolderPid
      };
    }
  }
  return He("update_apply"), W("tengu_native_update_complete", {
    latency_ms: elapsedMs,
    was_new_install: wasNewInstall,
    was_force_reinstall: force
  }), A(`Successfully updated to version ${targetVersion}`), {
    success: !0,
    latestVersion: targetVersion
  };
}

/** Remove an empty directory, ignoring ENOTDIR/ENOENT/ENOTEMPTY. */
async function AEp(dirPath: string): Promise<void> {
  try {
    await dc.rmdir(dirPath), A(`Removed empty directory at ${dirPath}`);
  } catch (err) {
    let code = cn(err);
    if (code !== "ENOTDIR" && code !== "ENOENT" && code !== "ENOTEMPTY") A(`Could not remove directory at ${dirPath}: ${err}`);
  }
}

/** Point `linkPath` at `target`: on win32 do an atomic file replace (preserving the old copy on failure); elsewhere create an atomic symlink. */
async function REp(linkPath: string, target: string): Promise<boolean> {
  if (ite().startsWith("win32")) try {
    let linkDir = gm.dirname(linkPath);
    await dc.mkdir(linkDir, {
      recursive: !0
    });
    let existing: import("fs").Stats | undefined;
    try {
      existing = await dc.stat(linkPath);
    } catch {}
    if (existing) {
      try {
        let targetStats = await dc.stat(target);
        if (existing.size === targetStats.size) return !1;
      } catch {}
      let backupPath = `${linkPath}.old.${Date.now()}`;
      await dc.rename(linkPath, backupPath);
      try {
        await dc.copyFile(target, linkPath);
        try {
          await dc.unlink(backupPath);
        } catch {}
      } catch (copyErr) {
        try {
          await dc.rename(backupPath, linkPath);
        } catch (restoreErr) {
          let wrappedErr = Error(`Failed to restore old executable: ${restoreErr}`, {
            cause: copyErr
          });
          throw Ie(wrappedErr), wrappedErr;
        }
        throw copyErr;
      }
    } else try {
      await dc.copyFile(target, linkPath);
    } catch (copyErr) {
      if (In(copyErr)) throw Error(`Source file does not exist: ${target}`);
      throw copyErr;
    }
    return !0;
  } catch (err) {
    return A(`Failed to copy executable from ${target} to ${linkPath}: ${err}`, {
      level: "error"
    }), !1;
  }
  let linkDir = gm.dirname(linkPath);
  try {
    await dc.mkdir(linkDir, {
      recursive: !0
    }), A(`Created directory ${linkDir} for symlink`);
  } catch (err) {
    return A(`Failed to create directory ${linkDir}: ${err}`, {
      level: "error"
    }), !1;
  }
  let tmpLink = `${linkPath}.tmp.${process.pid}.${Date.now()}`;
  try {
    return await dc.symlink(target, tmpLink), await dc.rename(tmpLink, linkPath), A(`Atomically updated symlink ${linkPath} -> ${target}`), !0;
  } catch (err) {
    try {
      await dc.unlink(tmpLink);
    } catch {}
    return A(`Failed to create symlink from ${linkPath} to ${target}: ${err}`, {
      level: "error"
    }), !1;
  }
}

/** Diagnose the native install: detect missing bin dir / broken executable / missing PATH entry; returns user-facing issues. */
async function aqe(force: boolean = !1): Promise<Array<{
  message: string;
  userActionRequired: boolean;
  type: string;
}>> {
  if (nt(process.env.DISABLE_INSTALLATION_CHECKS)) return [];
  let installMethod = await U_e();
  if (installMethod === "development") return [];
  let config = Ot();
  if (!(force || installMethod === "native" || config.installMethod === "native")) return [];
  let paths = Wle(),
    issues: Array<{
      message: string;
      userActionRequired: boolean;
      type: string;
    }> = [],
    issueTags: string[] = [],
    binDir = gm.dirname(paths.executable),
    resolvedBinDir = gm.resolve(binDir),
    isWindows = ite().startsWith("win32");
  try {
    await dc.access(binDir);
  } catch {
    issues.push({
      message: `claude command at ${paths.executable} missing or broken (${binDir} does not exist)`,
      userActionRequired: !0,
      type: "error"
    }), issueTags.push("bin_dir_missing");
  }
  if (isWindows) {
    if (!(await iqe(paths.executable))) issues.push({
      message: `claude command at ${paths.executable} missing or broken`,
      userActionRequired: !0,
      type: "error"
    }), issueTags.push("executable_missing");
  } else try {
    let linkTarget = await dc.readlink(paths.executable),
      resolvedTarget = gm.resolve(gm.dirname(paths.executable), linkTarget);
    if (!(await iqe(resolvedTarget))) issues.push({
      message: `claude command at ${paths.executable} missing or broken (symlink points to ${linkTarget})`,
      userActionRequired: !0,
      type: "error"
    }), issueTags.push("executable_invalid");
  } catch (readlinkErr) {
    if (In(readlinkErr)) issues.push({
      message: `claude command at ${paths.executable} missing or broken`,
      userActionRequired: !0,
      type: "error"
    }), issueTags.push("executable_missing");else if (!(await iqe(paths.executable))) issues.push({
      message: `claude command at ${paths.executable} missing or broken (not a valid Claude binary)`,
      userActionRequired: !0,
      type: "error"
    }), issueTags.push("executable_invalid");
  }
  if (!(process.env.PATH || "").split(gm.delimiter).some(pathEntry => {
    try {
      let resolved = gm.resolve(pathEntry);
      if (isWindows) return resolved.toLowerCase() === resolvedBinDir.toLowerCase();
      return resolved === resolvedBinDir;
    } catch {
      return !1;
    }
  })) if (issueTags.push("not_in_path"), isWindows) {
    let winBinDir = binDir.replaceAll("/", "\\");
    issues.push({
      message: `Native installation exists but ${winBinDir} is not in your PATH. Add it by opening: System Properties → Environment Variables → Edit User PATH → New → Add the path above. Then restart your terminal.`,
      userActionRequired: !0,
      type: "path"
    });
  } else {
    let shellKind = _ct(),
      shellConfigPath = a0e()[shellKind],
      displayConfigPath = shellConfigPath ? shellConfigPath.replace(elo.homedir(), "~") : "your shell config file";
    issues.push({
      message: `Native installation exists but ~/.local/bin is not in your PATH. Run:

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ${displayConfigPath} && source ${displayConfigPath}`,
      userActionRequired: !0,
      type: "path"
    });
  }
  if (issueTags.length === 0) He("native_check_install");else Pt("native_check_install", issueTags[0]);
  return issues;
}

/** Public entry to install the latest native version; de-dupes concurrent in-flight calls (unless `force`). */
function lqe(version: string, force: boolean = !1): Promise<{
  latestVersion: string | null;
  wasUpdated: boolean;
  wasSkipped?: boolean;
  lockFailed?: boolean;
  lockHolderPid?: number;
}> {
  if (force) return EPa(version, force);
  if (CUn) return A("installLatest: joining in-flight call"), CUn;
  let pending = EPa(version, force);
  CUn = pending;
  let clear = () => {
    CUn = null;
  };
  return pending.then(clear, clear), pending;
}

/** Run the native update, persist installMethod="native" config on success, and trigger background cleanup. */
async function EPa(version: string, force: boolean = !1): Promise<{
  latestVersion: string | null;
  wasUpdated: boolean;
  wasSkipped?: boolean;
  lockFailed?: boolean;
  lockHolderPid?: number;
}> {
  let result = await CEp(version, force);
  if (!result.success) return {
    latestVersion: null,
    wasUpdated: !1,
    lockFailed: result.lockFailed,
    lockHolderPid: result.lockHolderPid
  };
  if (Ot().installMethod !== "native") hn(config => ({
    ...config,
    installMethod: "native",
    autoUpdates: !1,
    autoUpdatesProtectedForNative: !0
  })), A('Native installer: Set installMethod to "native" and disabled legacy auto-updater for protection');
  return b$t(), {
    latestVersion: result.latestVersion,
    wasUpdated: result.success && !result.wasSkipped,
    wasSkipped: result.wasSkipped,
    lockFailed: !1
  };
}

/** Resolve and return the executable symlink's target if it points at a valid binary, else null. */
async function vEp(linkPath: string): Promise<string | null> {
  try {
    let linkTarget = await dc.readlink(linkPath),
      resolvedTarget = gm.resolve(gm.dirname(linkPath), linkTarget);
    if (await iqe(resolvedTarget)) return resolvedTarget;
  } catch {}
  return null;
}

/** Lock file path for a given install target inside the locks dir. */
function S$t(paths: {
  locks: string;
}, target: string): string {
  let baseName = gm.basename(target);
  return gm.join(paths.locks, `${baseName}.lock`);
}

/** Acquire a lifetime lock on the currently running version so it isn't cleaned up while in use. */
async function cqe(): Promise<void> {
  let paths = Wle();
  if (!process.execPath.includes(paths.versions)) return;
  let currentExec = gm.resolve(process.execPath);
  try {
    let lockPath = S$t(paths, currentExec);
    if (await dc.mkdir(paths.locks, {
      recursive: !0
    }), u0e()) {
      if (!(await yPa(currentExec, lockPath))) {
        W("tengu_version_lock_failed", {
          is_pid_based: !0,
          is_lifetime_lock: !0
        }), AUn(currentExec, Error("Lock already held by another process"));
        return;
      }
      W("tengu_version_lock_acquired", {
        is_pid_based: !0,
        is_lifetime_lock: !0
      }), A(`Acquired PID lock on running version: ${currentExec}`);
    } else {
      let release: (() => Promise<void>) | undefined;
      try {
        release = await zg(currentExec, {
          stale: tlo,
          retries: 0,
          lockfilePath: lockPath,
          onCompromised: compromisedErr => {
            A(`NON-FATAL: Lock on running version was compromised: ${compromisedErr.message}`, {
              level: "info"
            });
          }
        }), W("tengu_version_lock_acquired", {
          is_pid_based: !1,
          is_lifetime_lock: !0
        }), A(`Acquired mtime-based lock on running version: ${currentExec}`), Si(async () => {
          try {
            await release?.();
          } catch {}
        });
      } catch (acquireErr) {
        if (In(acquireErr)) {
          A(`Cannot lock current version - file does not exist: ${currentExec}`, {
            level: "info"
          });
          return;
        }
        W("tengu_version_lock_failed", {
          is_pid_based: !1,
          is_lifetime_lock: !0
        }), AUn(currentExec, acquireErr);
        return;
      }
    }
  } catch (err) {
    if (In(err)) {
      A(`Cannot lock current version - file does not exist: ${currentExec}`, {
        level: "info"
      });
      return;
    }
    A(`NON-FATAL: Failed to lock current version during execution ${Ce(err)}`, {
      level: "info"
    });
  }
}

/** Log a non-fatal lock-acquisition failure (expected in multi-process scenarios). */
function AUn(target: string, err: unknown): void {
  A(`NON-FATAL: Lock acquisition failed for ${target} (expected in multi-process scenarios): ${Ce(err)}`, {
    level: "error"
  });
}

/** Force-remove the lock file for a given install target. */
async function wEp(target: string): Promise<void> {
  let paths = Wle(),
    lockPath = S$t(paths, target);
  try {
    await dc.unlink(lockPath), A(`Force-removed lock file at ${lockPath}`);
  } catch (err) {
    A(`Failed to force-remove lock file: ${Ce(err)}`);
  }
}

/** Background cleanup: prune old win32 executables, stale staging dirs, stale locks, orphaned temp files, and retain only the newest N versions (protecting locked/in-use ones). */
async function b$t(): Promise<void> {
  await Promise.resolve();
  let paths = Wle(),
    cutoffTime = Date.now() - 3600000;
  if (ite().startsWith("win32")) {
    let execDir = gm.dirname(paths.executable);
    try {
      let entries = await dc.readdir(execDir),
        removedCount = 0;
      for (let entry of entries) {
        if (!/^claude\.exe\.old\.\d+$/.test(entry)) continue;
        try {
          await dc.unlink(gm.join(execDir, entry)), removedCount++;
        } catch {}
      }
      if (removedCount > 0) A(`Cleaned up ${removedCount} old Windows executables on startup`);
    } catch (err) {
      if (!In(err)) A(`Failed to clean up old Windows executables: ${err}`);
    }
  }
  try {
    let stagingEntries = await dc.readdir(paths.staging),
      stagingRemoved = 0;
    for (let entry of stagingEntries) {
      let entryPath = gm.join(paths.staging, entry);
      try {
        if ((await dc.stat(entryPath)).mtime.getTime() < cutoffTime) await dc.rm(entryPath, {
          recursive: !0,
          force: !0
        }), stagingRemoved++, A(`Cleaned up old staging directory: ${entry}`);
      } catch {}
    }
    if (stagingRemoved > 0) A(`Cleaned up ${stagingRemoved} orphaned staging directories`), W("tengu_native_staging_cleanup", {
      cleaned_count: stagingRemoved
    });
  } catch (err) {
    if (!In(err)) A(`Failed to clean up staging directories: ${err}`);
  }
  if (u0e()) {
    let staleLocksRemoved = EUn(paths.locks);
    if (staleLocksRemoved > 0) A(`Cleaned up ${staleLocksRemoved} stale version locks`), W("tengu_native_stale_locks_cleanup", {
      cleaned_count: staleLocksRemoved
    });
  }
  let versionEntries: string[];
  try {
    versionEntries = await dc.readdir(paths.versions);
  } catch (err) {
    if (!In(err)) A(`Failed to readdir versions directory: ${err}`), Pt("native_cleanup_versions", "readdir_failed");else He("native_cleanup_versions");
    return;
  }
  let versions: Array<{
      name: string;
      path: string;
      resolvedPath: string;
      mtime: Date;
      size: number;
    }> = [],
    tempRemoved = 0;
  for (let entry of versionEntries) {
    let entryPath = gm.join(paths.versions, entry);
    if (/\.tmp\.\d+\.\d+$/.test(entry)) {
      try {
        if ((await dc.stat(entryPath)).mtime.getTime() < cutoffTime) await dc.unlink(entryPath), tempRemoved++, A(`Cleaned up orphaned temp install file: ${entry}`);
      } catch {}
      continue;
    }
    try {
      let stats = await dc.stat(entryPath);
      if (!stats.isFile()) continue;
      if (stats.size > 0 && (stats.mode & 73) === 0) continue;
      versions.push({
        name: entry,
        path: entryPath,
        resolvedPath: gm.resolve(entryPath),
        mtime: stats.mtime,
        size: stats.size
      });
    } catch {}
  }
  if (tempRemoved > 0) A(`Cleaned up ${tempRemoved} orphaned temp install files`), W("tengu_native_temp_files_cleanup", {
    cleaned_count: tempRemoved
  });
  if (versions.length === 0) {
    He("native_cleanup_versions");
    return;
  }
  try {
    let execPath = process.execPath,
      protectedPaths = new Set<string>();
    if (execPath && execPath.includes(paths.versions)) protectedPaths.add(gm.resolve(execPath));
    let activeTarget = await vEp(paths.executable);
    if (activeTarget) protectedPaths.add(activeTarget);else if (ite().startsWith("win32")) try {
      let execStats = await dc.stat(paths.executable);
      for (let version of versions) if (version.size === execStats.size) protectedPaths.add(version.resolvedPath);
    } catch {}
    for (let version of versions) {
      if (protectedPaths.has(version.resolvedPath)) continue;
      let lockPath = S$t(paths, version.resolvedPath),
        isLocked = !1;
      if (u0e()) isLocked = T$t(lockPath);else try {
        isLocked = await E8s(version.resolvedPath, {
          stale: tlo,
          lockfilePath: lockPath
        });
      } catch {
        isLocked = !1;
      }
      if (isLocked) protectedPaths.add(version.resolvedPath), A(`Protecting locked version from cleanup: ${version.name}`);
    }
    let toDelete = versions.filter(version => !protectedPaths.has(version.resolvedPath)).sort((a, b) => b.mtime.getTime() - a.mtime.getTime()).slice(Zao);
    if (toDelete.length === 0) {
      W("tengu_native_version_cleanup", {
        total_count: versions.length,
        deleted_count: 0,
        protected_count: protectedPaths.size,
        retained_count: Zao,
        lock_failed_count: 0,
        error_count: 0
      }), He("native_cleanup_versions");
      return;
    }
    let deletedCount = 0,
      lockFailedCount = 0,
      errorCount = 0;
    if (await Promise.all(toDelete.map(async version => {
      try {
        if (await vPa(version.path, async () => {
          await dc.unlink(version.path);
        })) deletedCount++;else lockFailedCount++, A(`Skipping deletion of ${version.name} - locked by another process`);
      } catch (err) {
        errorCount++, A(`Failed to delete version ${version.name}: ${err}`, {
          level: "error"
        });
      }
    })), W("tengu_native_version_cleanup", {
      total_count: versions.length,
      deleted_count: deletedCount,
      protected_count: protectedPaths.size,
      retained_count: Zao,
      lock_failed_count: lockFailedCount,
      error_count: errorCount
    }), errorCount > 0) Pt("native_cleanup_versions", "delete_errors");else if (lockFailedCount > 0) Pt("native_cleanup_versions", "lock_failed");else He("native_cleanup_versions");
  } catch (err) {
    if (!In(err)) Ie(Error(`Version cleanup failed: ${err}`)), Pt("native_cleanup_versions", "unexpected_error");else He("native_cleanup_versions");
  }
}

/** True if the resolved executable path is npm-managed (a .js file or under node_modules). */
async function kEp(linkPath: string): Promise<boolean> {
  let realPath = await dc.realpath(linkPath);
  return realPath.endsWith(".js") || realPath.includes("node_modules");
}

/** Remove the claude executable symlink, unless it appears to be npm-managed. */
async function E$t(): Promise<void> {
  let paths = Wle();
  try {
    if (await kEp(paths.executable)) {
      A(`Skipping removal of ${paths.executable} - appears to be npm-managed`), He("native_remove_symlink");
      return;
    }
    await dc.unlink(paths.executable), A(`Removed claude symlink at ${paths.executable}`), He("native_remove_symlink");
  } catch (err) {
    if (In(err)) {
      He("native_remove_symlink");
      return;
    }
    A(`Failed to remove claude symlink: ${err}`, {
      level: "error"
    }), xe("native_remove_symlink", "unlink_failed");
  }
}

/** Remove any `claude` shell aliases from known shell config files; returns user-facing notices. */
async function rlo(): Promise<Array<{
  message: string;
  userActionRequired: boolean;
  type: string;
}>> {
  let notices: Array<{
      message: string;
      userActionRequired: boolean;
      type: string;
    }> = [],
    shellConfigs = a0e(),
    hadError = !1;
  for (let [shellName, configPath] of Object.entries(shellConfigs)) try {
    let contents = await d$t(configPath);
    if (!contents) continue;
    let {
      filtered: filtered,
      hadAlias: hadAlias
    } = lUn(contents);
    if (hadAlias) await cUn(configPath, filtered), notices.push({
      message: `Removed claude alias from ${configPath}. Run: unalias claude`,
      userActionRequired: !0,
      type: "alias"
    }), A(`Cleaned up claude alias from ${shellName} config`);
  } catch (err) {
    hadError = !0, A(`Failed to clean up claude alias from ${configPath}: ${err}`, {
      level: "error"
    }), notices.push({
      message: `Failed to clean up ${configPath}: ${err}`,
      userActionRequired: !1,
      type: "error"
    });
  }
  if (hadError) Pt("native_cleanup_aliases", "config_write_failed");else He("native_cleanup_aliases");
  return notices;
}

/** Fallback manual removal of npm bin scripts/symlinks when `npm uninstall -g` fails (e.g. ENOTEMPTY). */
async function HEp(packageName: string): Promise<{
  success: boolean;
  warning?: string;
  error?: string;
}> {
  try {
    let prefixResult = await Wr("npm", ["config", "get", "prefix"]);
    if (prefixResult.code !== 0 || !prefixResult.stdout) return {
      success: !1,
      error: "Failed to get npm global prefix"
    };
    let prefix = prefixResult.stdout.trim(),
      removedAny = !1;
    async function removeFile(target: string, label: string): Promise<boolean> {
      try {
        return await dc.unlink(target), A(`Manually removed ${label}: ${target}`), !0;
      } catch {
        return !1;
      }
    }
    if (ite().startsWith("win32")) {
      let cmdPath = gm.join(prefix, "claude.cmd"),
        ps1Path = gm.join(prefix, "claude.ps1"),
        binPath = gm.join(prefix, "claude");
      if (await removeFile(cmdPath, "bin script")) removedAny = !0;
      if (await removeFile(ps1Path, "PowerShell script")) removedAny = !0;
      if (await removeFile(binPath, "bin executable")) removedAny = !0;
    } else {
      let binSymlink = gm.join(prefix, "bin", "claude");
      if (await removeFile(binSymlink, "bin symlink")) removedAny = !0;
    }
    if (removedAny) {
      A(`Successfully removed ${packageName} manually`);
      let nodeModulesPath = ite().startsWith("win32") ? gm.join(prefix, "node_modules", packageName) : gm.join(prefix, "lib", "node_modules", packageName);
      return {
        success: !0,
        warning: `${packageName} executables removed, but node_modules directory was left intact for safety. You may manually delete it later at: ${nodeModulesPath}`
      };
    } else return {
      success: !1
    };
  } catch (err) {
    return A(`Manual removal failed: ${err}`, {
      level: "error"
    }), {
      success: !1,
      error: `Manual removal failed: ${err}`
    };
  }
}

/** Uninstall a global npm package; on ENOTEMPTY fall back to manual removal. */
async function CPa(packageName: string): Promise<{
  success: boolean;
  warning?: string;
  error?: string;
}> {
  let {
    code: code,
    stderr: stderr
  } = await Wr("npm", ["uninstall", "-g", packageName], {
    cwd: process.cwd()
  });
  if (code === 0) return A(`Removed global npm installation of ${packageName}`), {
    success: !0
  };else if (stderr && !stderr.includes("npm ERR! code E404")) {
    if (stderr.includes("npm error code ENOTEMPTY")) {
      A(`Failed to uninstall global npm package ${packageName}: ${stderr}`, {
        level: "error"
      }), A("Attempting manual removal due to ENOTEMPTY error");
      let manualResult = await HEp(packageName);
      if (manualResult.success) return {
        success: !0,
        warning: manualResult.warning
      };else if (manualResult.error) return {
        success: !1,
        error: `Failed to remove global npm installation of ${packageName}: ${stderr}. Manual removal also failed: ${manualResult.error}`
      };
    }
    return A(`Failed to uninstall global npm package ${packageName}: ${stderr}`, {
      level: "error"
    }), {
      success: !1,
      error: `Failed to remove global npm installation of ${packageName}: ${stderr}`
    };
  }
  return {
    success: !1
  };
}

/** Remove all npm-managed installs (canonical + branded package) and the local ~/.claude/local dir; returns a summary. */
async function olo(): Promise<{
  removed: number;
  errors: string[];
  warnings: string[];
}> {
  let errors: string[] = [],
    warnings: string[] = [],
    removed = 0,
    npmUninstallFailed = !1,
    localRemoveFailed = !1,
    canonicalResult = await CPa("@anthropic-ai/claude-code");
  if (canonicalResult.success) {
    if (removed++, canonicalResult.warning) warnings.push(canonicalResult.warning);
  } else if (canonicalResult.error) errors.push(canonicalResult.error), npmUninstallFailed = !0;
  if ({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.PACKAGE_URL && {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.PACKAGE_URL !== "@anthropic-ai/claude-code") {
    let brandedResult = await CPa({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.PACKAGE_URL);
    if (brandedResult.success) {
      if (removed++, brandedResult.warning) warnings.push(brandedResult.warning);
    } else if (brandedResult.error) errors.push(brandedResult.error), npmUninstallFailed = !0;
  }
  let localDir = gm.join(elo.homedir(), ".claude", "local");
  try {
    await dc.rm(localDir, {
      recursive: !0
    }), removed++, A(`Removed local installation at ${localDir}`);
  } catch (err) {
    if (!In(err)) errors.push(`Failed to remove ${localDir}: ${err}`), A(`Failed to remove local installation: ${err}`, {
      level: "error"
    }), localRemoveFailed = !0;
  }
  if (errors.length === 0) He("native_cleanup_npm");else if (removed > 0) Pt("native_cleanup_npm", "partial_errors");else if (npmUninstallFailed && !localRemoveFailed) xe("native_cleanup_npm", "npm_uninstall_failed");else if (localRemoveFailed && !npmUninstallFailed) xe("native_cleanup_npm", "local_install_remove_failed");else xe("native_cleanup_npm", "npm_uninstall_failed");
  return {
    removed: removed,
    errors: errors,
    warnings: warnings
  };
}
var APa,
  dc,
  elo,
  gm,
  RPa,
  Zao = 2,
  tlo = 604800000,
  yEp = !1,
  CUn = null;
var Xao = b(() => {
  jn();
  kt();
  mn();
  vu();
  F_e();
  ud();
  tr();
  qe();
  c0e();
  Ir();
  E8();
  dn();
  Ct();
  Ii();
  Q4e();
  vn();
  uUn();
  o_e();
  Jao();
  Qao();
  APa = require("fs"), dc = require("fs/promises"), elo = require("os"), gm = require("path"), RPa = x(t4(), 1);
});

export {ite,SUn,Wle,iqe,nlo,vPa,wPa,TEp,SEp,bEp,bPa,kPa,EEp,CEp,AEp,REp,aqe,lqe,EPa,vEp,S$t,cqe,AUn,wEp,b$t,kEp,E$t,rlo,HEp,CPa,olo,APa,dc,elo,gm,RPa,Zao,tlo,yEp,CUn,Xao};
