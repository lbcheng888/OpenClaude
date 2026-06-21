// @ts-nocheck
import {rx,cae,vtt,J1} from "./2678_withFileTypes.ts";
import {YUe,r4r,eCn} from "../../vendor/m2595.ts";
import {getInitialSettings,getSettingsForSource,updateSettingsForSource,yr} from "./0740_updateSettingsForSource.ts";
import {gs,zEn,sh} from "../../vendor/m2589.ts";
import {nx,$et,XUe} from "../../vendor/m2597.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {qt,Le,Xt} from "./0228_encoding.ts";
import {sKe,_7,nhr,g8,ik} from "../agent/0726_level.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {T2,Pn,Se,Fl,_o,dn,bt} from "../../vendor/m195.ts";
import {c8,ok} from "../../vendor/m633.ts";
import {aT,durationUnitMillis} from "../../vendor/m442.ts";
import {execFileNoThrowWithCwd,execFileNoThrow,oa} from "../../vendor/m684.ts";
import {gitExe,Ba} from "../../vendor/m693.ts";
import {isBashAvailable,Jwe,qet} from "./2601_GIT_CONFIG_COUNT.ts";
import {uP,U5,TDt} from "../telemetry/2599_source.ts";
import {st} from "../../vendor/m5.ts";
import {hw,roe} from "../../vendor/m446.ts";
import {externalHttp,ek} from "../core/0570_isCancel.ts";
import {isAxiosError} from "../../vendor/m567.ts";
import {E} from "../../vendor/m319.ts";
import {Uv,S1t,_W,Isa,gYr,nI} from "../../vendor/m3252.ts";
import {j_e,W_e} from "../../vendor/m4435.ts";
import {F2,mf} from "../../vendor/m702.ts";
import {ynl,Mk} from "./4439_operation.ts";
import {N0e,W6} from "../../vendor/m4434.ts";
import {wrt,Hq} from "../../vendor/m3140.ts";
import {Fet,rz} from "../../vendor/m2590.ts";
import {fqt,qgo} from "./4437_level.ts";
import {Ie,Oe,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Xr} from "../../vendor/m321.ts";
import {sn} from "./0047_namespace.ts";
/** Returns the path to the known_marketplaces.json config file */
function _jn() {
  return Fd.join(rx(), "known_marketplaces.json");
}

/** Returns the path to the marketplaces cache directory */
function F0e() {
  return Fd.join(rx(), "marketplaces");
}

/** Clears the marketplace cache (in-memory memoize + dedup map) */
function U0e() {
  tM.cache?.clear?.(), gjn.clear();
}

/** Builds the combined set of known marketplace sources from settings, plugins, and env */
function F9() {
  let mergedPlugins: any = {},
    enabledPlugins = {
      ...YUe(),
      ...(getInitialSettings().enabledPlugins ?? {})
    };
  for (let [pluginId, enabled] of Object.entries(enabledPlugins)) if (enabled && gs(pluginId).marketplace === nx) {
    mergedPlugins[nx] = {
      source: $et,
      sourceIsFallback: !0
    };
    break;
  }
  return {
    ...mergedPlugins,
    ...r4r(),
    ...(getInitialSettings().extraKnownMarketplaces ?? {})
  };
}

/** Returns which settings layer controls the autoUpdate flag for a given marketplace, or null */
function Tqp(marketplaceId: string) {
  if (getSettingsForSource("policySettings")?.extraKnownMarketplaces?.[marketplaceId]?.autoUpdate !== void 0) return "managed settings (managed-settings.json)";
  if (getSettingsForSource("flagSettings")?.extraKnownMarketplaces?.[marketplaceId]?.autoUpdate !== void 0) return "the --settings flag";
  if (r4r()[marketplaceId]?.autoUpdate !== void 0 && getInitialSettings().extraKnownMarketplaces?.[marketplaceId] === void 0) return "an --add-dir directory's settings";
  return null;
}

/** Returns which user-level settings scope declares the given marketplace, or null */
function Sqp(marketplaceId: string) {
  let scopes: any[] = ["localSettings", "projectSettings", "userSettings"];
  for (let scope of scopes) if (getSettingsForSource(scope)?.extraKnownMarketplaces?.[marketplaceId]) return scope;
  return null;
}

/** Persists a marketplace entry into the given settings scope */
function hqt(marketplaceId: string, entry: any, scope: any = "userSettings") {
  let knownMarketplaces: any = {
    ...(getSettingsForSource(scope) ?? {}).extraKnownMarketplaces
  };
  knownMarketplaces[marketplaceId] = entry, updateSettingsForSource(scope, {
    extraKnownMarketplaces: knownMarketplaces
  });
}

/** Reads and validates the known_marketplaces.json file from disk */
async function vf() {
  let fs = jt(),
    filePath = _jn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      parsed = qt(raw),
      result = sKe().safeParse(parsed);
    if (!result.success) {
      let errMsg = `Marketplace configuration file is corrupted: ${result.error.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`;
      throw logForDebugging(errMsg, {
        level: "error"
      }), new T2(errMsg, filePath, parsed);
    }
    return result.data;
  } catch (err) {
    if (Pn(err)) return {};
    if (err instanceof T2) throw err;
    let errMsg = `Failed to load marketplace configuration: ${Se(err)}`;
    throw logForDebugging(errMsg, {
      level: "error"
    }), Error(errMsg);
  }
}

/** Like vf() but returns {} on any error instead of throwing */
async function NP() {
  try {
    return await vf();
  } catch {
    return {};
  }
}

/** Validates and writes marketplace config to known_marketplaces.json */
async function pne(config: any) {
  let validated = sKe().safeParse(config),
    filePath = _jn();
  if (!validated.success) throw new T2(`Invalid marketplace config: ${validated.error.message}`, filePath, config);
  let fs = jt(),
    parentDir = Fd.join(filePath, "..");
  await fs.mkdir(parentDir), c8(filePath, Le(validated.data, null, 2));
}

/** Syncs seed-directory marketplaces into known_marketplaces.json; returns true if any entries changed */
async function yjn() {
  let seedDirs = cae();
  if (seedDirs.length === 0) return !1;
  let knownMarketplaces = await vf(),
    seen = new Set(),
    changeCount = 0;
  for (let seedDir of seedDirs) {
    let seedKnown = await bqp(seedDir);
    if (!seedKnown) continue;
    for (let [name, entry] of Object.entries(seedKnown)) {
      if (seen.has(name)) continue;
      let installLocation = await Eqp(seedDir, name);
      if (!installLocation) {
        logForDebugging(`Seed marketplace '${name}' not found under ${seedDir}/marketplaces/, skipping`, {
          level: "warn"
        });
        continue;
      }
      seen.add(name);
      let newEntry: any = {
        source: (entry as any).source,
        installLocation,
        lastUpdated: (entry as any).lastUpdated,
        autoUpdate: !1
      };
      if (aT(knownMarketplaces[name], newEntry)) continue;
      knownMarketplaces[name] = newEntry, changeCount++;
    }
  }
  if (changeCount > 0) return await pne(knownMarketplaces), logForDebugging(`Synced ${changeCount} marketplace(s) from seed dir(s)`), !0;
  return !1;
}

/** Reads the known_marketplaces.json from a seed directory, returning null on error */
async function bqp(seedDir: string) {
  let filePath = Fd.join(seedDir, "known_marketplaces.json");
  try {
    let raw = await jt().readFile(filePath, {
        encoding: "utf-8"
      }),
      result = sKe().safeParse(qt(raw));
    if (!result.success) return logForDebugging(`Seed known_marketplaces.json invalid at ${seedDir}: ${result.error.message}`, {
      level: "warn"
    }), null;
    return result.data;
  } catch (err) {
    if (!Pn(err)) logForDebugging(`Failed to read seed known_marketplaces.json at ${seedDir}: ${err}`, {
      level: "warn"
    });
    return null;
  }
}

/** Finds the install location for a named marketplace under a seed directory */
async function Eqp(seedDir: string, marketplaceName: string) {
  let dirPath = Fd.join(seedDir, "marketplaces", marketplaceName),
    jsonPath = Fd.join(seedDir, "marketplaces", `${marketplaceName}.json`);
  for (let candidate of [dirPath, jsonPath]) try {
    return await Aqt(candidate), candidate;
  } catch {}
  return null;
}

/** Returns the seed directory that owns the given install path, or undefined */
function $0e(installPath: string) {
  return cae().find((seedDir: string) => installPath === seedDir || installPath.startsWith(seedDir + Fd.sep));
}

/** Returns the git operation timeout in ms (env override or default) */
function G_e() {
  let envVal = process.env.CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS;
  if (envVal) {
    let parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return Cqp;
}

/** Sets the git remote URL for the marketplace repo */
async function mnl(repoPath: string, remoteUrl: string) {
  await execFileNoThrowWithCwd(gitExe(), ["--git-dir=.git", "remote", "set-url", "origin", remoteUrl], {
    cwd: repoPath,
    stdin: "ignore"
  });
}

/** Runs git pull (with optional ref, credential helper disable, LFS skip, sparse paths) */
async function vqp(repoPath: string, ref: any, opts: any) {
  logForDebugging(`git pull: cwd=${repoPath} ref=${ref ?? "default"}`);
  let envVars: any = {
      ...isBashAvailable(),
      ...(opts?.skipLfs && {
        GIT_LFS_SKIP_SMUDGE: "1"
      })
    },
    credArgs = opts?.disableCredentialHelper ? ["-c", "credential.helper="] : [];
  if (ref) {
    if (ref.startsWith("-")) return {
      code: 1,
      stderr: `Invalid ref "${ref}": refs cannot start with "-"`
    };
    let fetchResult = await execFileNoThrowWithCwd(gitExe(), [...credArgs, "fetch", "origin", ref], {
      cwd: repoPath,
      timeout: G_e(),
      stdin: "ignore",
      env: envVars
    });
    if (fetchResult.code !== 0) return hjn(fetchResult);
    let checkoutResult = await execFileNoThrowWithCwd(gitExe(), [...credArgs, "checkout", ref], {
      cwd: repoPath,
      timeout: G_e(),
      stdin: "ignore",
      env: envVars
    });
    if (checkoutResult.code !== 0) return hjn(checkoutResult);
    let pullResult = await execFileNoThrowWithCwd(gitExe(), [...credArgs, "pull", "origin", ref], {
      cwd: repoPath,
      timeout: G_e(),
      stdin: "ignore",
      env: envVars
    });
    if (pullResult.code !== 0) return hjn(pullResult);
    return await unl(repoPath, credArgs, envVars, opts?.sparsePaths), pullResult;
  }
  let defaultPullResult = await execFileNoThrowWithCwd(gitExe(), [...credArgs, "pull", "origin", "HEAD"], {
    cwd: repoPath,
    timeout: G_e(),
    stdin: "ignore",
    env: envVars
  });
  if (defaultPullResult.code !== 0) return hjn(defaultPullResult);
  return await unl(repoPath, credArgs, envVars, opts?.sparsePaths), defaultPullResult;
}

/** Updates git submodules after a pull, skipped when sparse paths are present */
async function unl(repoPath: string, credArgs: any, envVars: any, sparsePaths: any) {
  if (sparsePaths && sparsePaths.length > 0) return;
  if (!(await jt().stat(Fd.join(repoPath, ".gitmodules")).then(() => !0, () => !1))) return;
  let submoduleResult = await execFileNoThrowWithCwd(gitExe(), ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes", ...credArgs, "submodule", "update", "--init", "--recursive", "--depth", "1"], {
    cwd: repoPath,
    timeout: G_e(),
    stdin: "ignore",
    env: envVars
  });
  if (submoduleResult.code !== 0) logForDebugging(`git submodule update failed (non-fatal): ${submoduleResult.stderr}`, {
    level: "warn"
  });
}

/** Enriches a failed git pull result with user-friendly error messages */
function hjn(gitResult: any) {
  if (gitResult.code === 0) return gitResult;
  if (gitResult.error?.includes("timed out")) {
    let timeoutSecs = Math.round(G_e() / 1000);
    return {
      ...gitResult,
      stderr: `Git pull timed out after ${timeoutSecs}s. Try increasing the timeout via CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS environment variable.

Original error: ${gitResult.stderr}`
    };
  }
  if (gitResult.stderr.includes("REMOTE HOST IDENTIFICATION HAS CHANGED")) return {
    ...gitResult,
    stderr: `SSH host key for this marketplace's git host has changed (server key rotation or possible MITM). Remove the stale entry with: ssh-keygen -R <host>
Then connect once manually to accept the new key.

Original error: ${gitResult.stderr}`
  };
  if (gitResult.stderr.includes("Host key verification failed")) return {
    ...gitResult,
    stderr: `SSH host key verification failed while updating marketplace. The host key is not in your known_hosts file. Connect once manually to add it (e.g., ssh -T git@<host>), or remove and re-add the marketplace with an HTTPS URL.

Original error: ${gitResult.stderr}`
  };
  if (gitResult.stderr.includes("Permission denied (publickey)") || gitResult.stderr.includes("Could not read from remote repository")) return {
    ...gitResult,
    stderr: `SSH authentication failed while updating marketplace. Please ensure your SSH keys are configured.

Original error: ${gitResult.stderr}`
  };
  if (gitResult.stderr.includes("timed out") || gitResult.stderr.includes("Could not resolve host")) return {
    ...gitResult,
    stderr: `Network error while updating marketplace. Please check your internet connection.

Original error: ${gitResult.stderr}`
  };
  return gitResult;
}

/** Checks whether SSH to github.com is working (BatchMode, ConnectTimeout=2) */
async function fnl() {
  try {
    let sshResult = await execFileNoThrow("ssh", ["-T", "-o", "BatchMode=yes", "-o", "ConnectTimeout=2", "-o", "StrictHostKeyChecking=yes", "git@github.com"], {
        timeout: 3000
      }),
      configured = sshResult.code === 1 && (sshResult.stderr?.includes("successfully authenticated") || sshResult.stdout?.includes("successfully authenticated"));
    return logForDebugging(`SSH config check: code=${sshResult.code} configured=${configured}`), configured;
  } catch (err) {
    return logForDebugging(`SSH configuration check failed: ${Se(err)}`, {
      level: "warn"
    }), !1;
  }
}

/** Returns true if the stderr indicates HTTPS auth failure */
function wqp(stderr: string) {
  return stderr.includes("Authentication failed") || stderr.includes("could not read Username") || stderr.includes("terminal prompts disabled") || stderr.includes("403") || stderr.includes("401");
}

/** Extracts SSH hostname from an SCP-style git URL, or null for http(s) URLs */
function dnl(gitUrl: string) {
  if (gitUrl.includes("://")) return null;
  return gitUrl.match(/^[^@]+@([^:]+):/)?.[1] ?? null;
}

/** git clone with depth 1, sparse checkout support, and detailed error enrichment */
async function Rqp(repoUrl: string, destPath: string, ref: any, sparsePaths: any, skipLfs: any) {
  let hasSparse = sparsePaths && sparsePaths.length > 0,
    envVars: any = {
      ...isBashAvailable(),
      ...(skipLfs && {
        GIT_LFS_SKIP_SMUDGE: "1"
      })
    },
    cloneArgs: any[] = ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes", "clone", "--depth", "1"];
  if (hasSparse) cloneArgs.push("--filter=blob:none", "--no-checkout");else cloneArgs.push("--recurse-submodules", "--shallow-submodules");
  if (ref) cloneArgs.push("--branch", ref);
  cloneArgs.push("--", repoUrl, destPath);
  let timeout = G_e();
  logForDebugging(`git clone: url=${eje(repoUrl)} ref=${ref ?? "default"} timeout=${timeout}ms`);
  let cloneResult = await execFileNoThrowWithCwd(gitExe(), cloneArgs, {
      timeout,
      stdin: "ignore",
      env: envVars
    }),
    redactedUrl = eje(repoUrl);
  if (repoUrl !== redactedUrl) {
    if (cloneResult.error) cloneResult.error = cloneResult.error.replaceAll(repoUrl, redactedUrl);
    if (cloneResult.stderr) cloneResult.stderr = cloneResult.stderr.replaceAll(repoUrl, redactedUrl);
  }
  if (cloneResult.code === 0) {
    if (hasSparse) {
      let sparseResult = await execFileNoThrowWithCwd(gitExe(), ["sparse-checkout", "set", "--cone", "--", ...sparsePaths], {
        cwd: destPath,
        timeout,
        stdin: "ignore",
        env: envVars
      });
      if (sparseResult.code !== 0) return {
        code: sparseResult.code,
        stderr: `git sparse-checkout set failed: ${sparseResult.stderr}`
      };
      let checkoutResult = await execFileNoThrowWithCwd(gitExe(), ["checkout", "HEAD"], {
        cwd: destPath,
        timeout,
        stdin: "ignore",
        env: envVars
      });
      if (checkoutResult.code !== 0) return {
        code: checkoutResult.code,
        stderr: `git checkout after sparse-checkout failed: ${checkoutResult.stderr}`
      };
    }
    return logForDebugging(`git clone succeeded: ${eje(repoUrl)}`), cloneResult;
  }
  if (logForDebugging(`git clone failed: url=${eje(repoUrl)} code=${cloneResult.code} error=${cloneResult.error ?? "none"} stderr=${cloneResult.stderr}`, {
    level: "warn"
  }), cloneResult.error?.includes("timed out")) return {
    ...cloneResult,
    stderr: `Git clone timed out after ${Math.round(timeout / 1000)}s. The repository may be too large for the current timeout. Set CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS to increase it (e.g., 300000 for 5 minutes).

Original error: ${cloneResult.stderr}`
  };
  if (cloneResult.stderr) {
    if (cloneResult.stderr.includes("REMOTE HOST IDENTIFICATION HAS CHANGED")) {
      let sshHost = dnl(repoUrl),
        keyscanCmd = sshHost ? `ssh-keygen -R ${sshHost}` : "ssh-keygen -R <host>";
      return {
        ...cloneResult,
        stderr: `SSH host key has changed (server key rotation or possible MITM). Remove the stale known_hosts entry:
  ${keyscanCmd}
Then connect once manually to verify and accept the new key.

Original error: ${cloneResult.stderr}`
      };
    }
    if (cloneResult.stderr.includes("Host key verification failed")) {
      let sshHost = dnl(repoUrl),
        connectCmd = sshHost ? `ssh -T git@${sshHost}` : "ssh -T git@<host>";
      return {
        ...cloneResult,
        stderr: `SSH host key is not in your known_hosts file. To add it, connect once manually (this will show the fingerprint for you to verify):
  ${connectCmd}

Or use an HTTPS URL instead (recommended for public repos).

Original error: ${cloneResult.stderr}`
      };
    }
    if (cloneResult.stderr.includes("Permission denied (publickey)") || cloneResult.stderr.includes("Could not read from remote repository")) return {
      ...cloneResult,
      stderr: `SSH authentication failed. Please ensure your SSH keys are configured for GitHub, or use an HTTPS URL instead.

Original error: ${cloneResult.stderr}`
    };
    if (wqp(cloneResult.stderr)) return {
      ...cloneResult,
      stderr: `HTTPS authentication failed. Please ensure your credential helper is configured (e.g., gh auth login).

Original error: ${cloneResult.stderr}`
    };
    if (cloneResult.stderr.includes("timed out") || cloneResult.stderr.includes("timeout") || cloneResult.stderr.includes("Could not resolve host")) return {
      ...cloneResult,
      stderr: `Network error or timeout while cloning repository. Please check your internet connection and try again.

Original error: ${cloneResult.stderr}`
    };
  }
  if (!cloneResult.stderr) return {
    code: cloneResult.code,
    stderr: cloneResult.error || `git clone exited with code ${cloneResult.code} (no stderr output). Run with --debug to see the full command.`
  };
  return cloneResult;
}

/** Safely invokes a progress callback, swallowing errors */
function G6(progressCb: any, message: string) {
  if (!progressCb) return;
  try {
    progressCb(message);
  } catch (err) {
    logForDebugging(`Progress callback error: ${Se(err)}`, {
      level: "warn"
    });
  }
}

/** Reconciles sparse-checkout config for a repo path; returns a result object indicating success or need to re-clone */
async function xqp(repoPath: string, sparsePaths: any, skipLfs: any) {
  let envVars: any = {
    ...isBashAvailable(),
    ...(skipLfs && {
      GIT_LFS_SKIP_SMUDGE: "1"
    })
  };
  if (sparsePaths && sparsePaths.length > 0) return execFileNoThrowWithCwd(gitExe(), ["sparse-checkout", "set", "--cone", "--", ...sparsePaths], {
    cwd: repoPath,
    timeout: G_e(),
    stdin: "ignore",
    env: envVars
  });
  let sparseConfigResult = await execFileNoThrowWithCwd(gitExe(), ["config", "--get", "core.sparseCheckout"], {
    cwd: repoPath,
    stdin: "ignore",
    env: envVars
  });
  if (sparseConfigResult.code === 0 && sparseConfigResult.stdout.trim() === "true") return {
    code: 1,
    stderr: "sparsePaths removed from config but repository is sparse; re-cloning for full checkout"
  };
  return {
    code: 0,
    stderr: ""
  };
}

/** Refreshes a marketplace git repo: pulls if possible, re-clones otherwise */
async function Zce(repoUrl: string, repoPath: string, ref: any, sparsePaths: any, progressCb: any, opts: any) {
  let fs = jt(),
    timeoutSecs = Math.round(G_e() / 1000);
  G6(progressCb, `Refreshing marketplace cache (timeout: ${timeoutSecs}s)…`);
  let sparseResult = await xqp(repoPath, sparsePaths, opts?.skipLfs);
  if (sparseResult.code === 0) {
    let pullStart = performance.now(),
      pullResult = await vqp(repoPath, ref, {
        disableCredentialHelper: opts?.disableCredentialHelper,
        sparsePaths,
        skipLfs: opts?.skipLfs
      });
    if (uP("marketplace_pull", repoUrl, pullResult.code === 0 ? "success" : "failure", performance.now() - pullStart, pullResult.code === 0 ? void 0 : U5(pullResult.stderr)), pullResult.code === 0) return;
    if (st(process.env.CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE)) {
      let marketplaceJson = Fd.join(repoPath, ".claude-plugin", "marketplace.json");
      if (await fs.stat(marketplaceJson).then(() => !0, () => !1)) {
        logForDebugging(`git pull failed, keeping existing clone (CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE): ${pullResult.stderr}`, {
          level: "warn"
        });
        return;
      }
    }
    logForDebugging(`git pull failed, will re-clone: ${pullResult.stderr}`, {
      level: "warn"
    });
  } else logForDebugging(`sparse-checkout reconcile requires re-clone: ${sparseResult.stderr}`);
  let backupPath = `${repoPath}.bak`,
    didRename = !1;
  try {
    await fs.rename(backupPath, repoPath);
  } catch (err) {
    if (!Pn(err)) {
      let marketplaceJson = Fd.join(repoPath, ".claude-plugin", "marketplace.json");
      if (!(await fs.stat(marketplaceJson).then(() => !0, () => !1))) await fs.rm(repoPath, {
        recursive: !0,
        force: !0
      }).catch(() => {}), await fs.rename(backupPath, repoPath);
    }
  }
  try {
    await fs.rm(backupPath, {
      recursive: !0,
      force: !0
    });
  } catch (err) {
    throw Error(`Failed to clean up stale marketplace backup directory. Please manually delete the directory at ${backupPath} and try again.

Technical details: ${Se(err)}`);
  }
  try {
    await fs.rename(repoPath, backupPath), didRename = !0, logForDebugging(`Found stale marketplace directory at ${repoPath}, moving aside to allow re-clone`, {
      level: "warn"
    }), G6(progressCb, "Found stale directory, cleaning up and re-cloning…");
  } catch (err) {
    if (!Pn(err)) throw Error(`Failed to clean up existing marketplace directory. Please manually delete the directory at ${repoPath} and try again.

Technical details: ${Se(err)}`);
  }
  let refSuffix = ref ? ` (ref: ${ref})` : "";
  G6(progressCb, `Cloning repository (timeout: ${timeoutSecs}s): ${eje(repoUrl)}${refSuffix}`);
  let cloneStart = performance.now(),
    cloneResult = await Rqp(repoUrl, repoPath, ref, sparsePaths, opts?.skipLfs);
  if (uP("marketplace_clone", repoUrl, cloneResult.code === 0 ? "success" : "failure", performance.now() - cloneStart, cloneResult.code === 0 ? void 0 : U5(cloneResult.stderr)), cloneResult.code !== 0) {
    try {
      await fs.rm(repoPath, {
        recursive: !0,
        force: !0
      });
    } catch {}
    if (didRename) try {
      await fs.rename(backupPath, repoPath);
    } catch {}
    throw new Fl(`Failed to clone marketplace repository: ${cloneResult.stderr}`, `Failed to clone marketplace repository: ${U5(cloneResult.stderr)} (exit ${cloneResult.code})`);
  }
  if (didRename) try {
    await fs.rm(backupPath, {
      recursive: !0,
      force: !0
    });
  } catch {}
  G6(progressCb, "Clone complete, validating marketplace…");
}

/** Redacts credential values in an object using hw() */
function kqp(headersObj: any) {
  return hw(headersObj, () => "***REDACTED***");
}

/** Redacts username/password from http(s) URLs for logging */
function eje(url: string) {
  try {
    let parsed = new URL(url);
    if ((parsed.protocol === "http:" || parsed.protocol === "https:") && (parsed.username || parsed.password)) {
      if (parsed.username) parsed.username = "***";
      if (parsed.password) parsed.password = "***";
      return parsed.toString();
    }
  } catch {}
  return url;
}

/** Downloads a marketplace JSON file from an HTTP(S) URL and saves it to disk */
async function Anl(downloadUrl: string, destPath: string, headers: any, progressCb: any) {
  let fs = jt(),
    redactedUrl = eje(downloadUrl);
  if (G6(progressCb, `Downloading marketplace from ${redactedUrl}`), logForDebugging(`Downloading marketplace from URL: ${redactedUrl}`), headers && Object.keys(headers).length > 0) logForDebugging(`Using custom headers: ${Le(kqp(headers))}`);
  let requestHeaders: any = {
      ...headers,
      "User-Agent": "Claude-Code-Plugin-Manager"
    },
    response: any,
    downloadStart = performance.now();
  try {
    response = await externalHttp.get(downloadUrl, {
      timeout: 1e4,
      headers: requestHeaders
    });
  } catch (err) {
    if (uP("marketplace_url", downloadUrl, "failure", performance.now() - downloadStart, U5(err)), isAxiosError(err)) {
      if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") throw Error(`Could not connect to ${redactedUrl}. Please check your internet connection and verify the URL is correct.

Technical details: ${err.message}`);
      if (err.code === "ETIMEDOUT") throw Error(`Request timed out while downloading marketplace from ${redactedUrl}. The server may be slow or unreachable.

Technical details: ${err.message}`);
      if (err.response) throw Error(`HTTP ${err.response.status} error while downloading marketplace from ${redactedUrl}. The marketplace file may not exist at this URL.

Technical details: ${err.message}`);
    }
    throw Error(`Failed to download marketplace from ${redactedUrl}: ${Se(err)}`);
  }
  G6(progressCb, "Validating marketplace data");
  let validatedSchema = _7().extend({
    plugins: E.array(E.unknown())
  }).safeParse(response.data);
  if (!validatedSchema.success) throw uP("marketplace_url", downloadUrl, "failure", performance.now() - downloadStart, "invalid_schema"), new T2(`Invalid marketplace schema from URL: ${validatedSchema.error.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`, redactedUrl, response.data);
  uP("marketplace_url", downloadUrl, "success", performance.now() - downloadStart), G6(progressCb, "Saving marketplace to cache");
  let parentDir = Fd.join(destPath, "..");
  await fs.mkdir(parentDir), c8(destPath, Le(response.data, null, 2));
}

/** Derives a filesystem-safe cache directory name from a marketplace source descriptor */
function Hqp(source: any) {
  let n = (source.source === "github" ? source.repo.replaceAll("/", "-") : source.source === "npm" ? source.package.replace("@", "").replaceAll("/", "-") : source.source === "file" ? Fd.basename(source.path).replace(".json", "") : source.source === "directory" ? Fd.basename(source.path) : "temp_" + Date.now()).replace(/[^a-zA-Z0-9\-_]/g, "-");
  return n === "" ? "temp_" + Date.now() : n;
}

/** Reads and validates a marketplace JSON file from a given path using a zod schema */
async function jgo(filePath: string, schema: any) {
  let raw = await jt().readFile(filePath, {
      encoding: "utf-8"
    }),
    parsed: any;
  try {
    parsed = qt(raw);
  } catch (err) {
    throw new T2(`Invalid JSON in ${filePath}: ${Se(err)}`, filePath, raw);
  }
  let validated = schema.safeParse(parsed);
  if (!validated.success) throw new T2(`Invalid schema: ${filePath} ${validated.error?.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`, filePath, parsed);
  return validated.data;
}

/** Materializes a marketplace from its source (git/github/url/file/directory/settings/npm) into the cache */
async function Wgo(source: any, progressCb: any) {
  if (!Uv(source)) throw Error(`Marketplace source '${j_e(source)}' is blocked by enterprise policy.`);
  let fs = jt(),
    cacheDir = F0e();
  await fs.mkdir(cacheDir);
  let cachePath: any,
    marketplaceJsonPath: any,
    didFetch = !1,
    dirName = Hqp(source);
  try {
    switch (source.source) {
      case "url":
        {
          cachePath = Fd.join(cacheDir, `${dirName}.json`), didFetch = !0, await Anl(source.url, cachePath, source.headers, progressCb), marketplaceJsonPath = cachePath;
          break;
        }
      case "github":
        {
          let sshUrl = `git@github.com:${source.repo}.git`,
            httpsUrl = `https://github.com/${source.repo}.git`;
          if (cachePath = Fd.join(cacheDir, dirName), didFetch = !0, Jwe()) {
            G6(progressCb, `Cloning via HTTPS: ${httpsUrl}`), await mnl(cachePath, httpsUrl), await Zce(httpsUrl, cachePath, source.ref, source.sparsePaths, progressCb, {
              skipLfs: source.skipLfs
            }), marketplaceJsonPath = Fd.join(cachePath, source.path || ".claude-plugin/marketplace.json");
            break;
          }
          let caughtError: any = null;
          if (await fnl()) {
            G6(progressCb, `Cloning via SSH: ${sshUrl}`);
            try {
              await Zce(sshUrl, cachePath, source.ref, source.sparsePaths, progressCb, {
                skipLfs: source.skipLfs
              });
            } catch (err) {
              caughtError = _o(err), logForDebugging(`SSH clone failed for ${source.repo}: ${caughtError.message}`, {
                level: "error"
              }), G6(progressCb, `SSH clone failed, retrying with HTTPS: ${httpsUrl}`), logForDebugging(`SSH clone failed for ${source.repo} despite SSH being configured, falling back to HTTPS`, {
                level: "info"
              }), await fs.rm(cachePath, {
                recursive: !0,
                force: !0
              });
              try {
                await Zce(httpsUrl, cachePath, source.ref, source.sparsePaths, progressCb, {
                  skipLfs: source.skipLfs
                }), caughtError = null;
              } catch (retryErr) {
                caughtError = _o(retryErr), logForDebugging(`Failed to clone marketplace repo ${source.repo} via HTTPS after SSH fallback: ${caughtError.message}`, {
                  level: "error"
                });
              }
            }
          } else {
            G6(progressCb, `SSH not configured, cloning via HTTPS: ${httpsUrl}`), logForDebugging(`SSH not configured for GitHub, using HTTPS for ${source.repo}`, {
              level: "info"
            });
            try {
              await Zce(httpsUrl, cachePath, source.ref, source.sparsePaths, progressCb, {
                skipLfs: source.skipLfs
              });
            } catch (err) {
              caughtError = _o(err), logForDebugging(`HTTPS git clone failed for marketplace ${source.repo}: ${caughtError.message}`, {
                level: "error"
              }), G6(progressCb, `HTTPS clone failed, retrying with SSH: ${sshUrl}`), logForDebugging(`HTTPS clone failed for ${source.repo} (${caughtError.message}), falling back to SSH`, {
                level: "info"
              }), await fs.rm(cachePath, {
                recursive: !0,
                force: !0
              });
              try {
                await Zce(sshUrl, cachePath, source.ref, source.sparsePaths, progressCb, {
                  skipLfs: source.skipLfs
                }), caughtError = null;
              } catch (retryErr) {
                caughtError = _o(retryErr), logForDebugging(`SSH clone fallback also failed for ${source.repo}: ${caughtError.message}`, {
                  level: "error"
                });
              }
            }
          }
          if (caughtError) throw caughtError;
          marketplaceJsonPath = Fd.join(cachePath, source.path || ".claude-plugin/marketplace.json");
          break;
        }
      case "git":
        {
          cachePath = Fd.join(cacheDir, dirName), didFetch = !0, await Zce(source.url, cachePath, source.ref, source.sparsePaths, progressCb, {
            skipLfs: source.skipLfs
          }), marketplaceJsonPath = Fd.join(cachePath, source.path || ".claude-plugin/marketplace.json");
          break;
        }
      case "npm":
        throw Error("NPM marketplace sources not yet implemented");
      case "file":
        {
          let resolvedPath = Fd.resolve(source.path);
          marketplaceJsonPath = resolvedPath, cachePath = Fd.dirname(Fd.dirname(resolvedPath)), didFetch = !1;
          break;
        }
      case "directory":
        {
          let resolvedPath = Fd.resolve(source.path);
          marketplaceJsonPath = Fd.join(resolvedPath, ".claude-plugin", "marketplace.json"), cachePath = resolvedPath, didFetch = !1;
          break;
        }
      case "settings":
        {
          cachePath = Fd.join(cacheDir, source.name), marketplaceJsonPath = Fd.join(cachePath, ".claude-plugin", "marketplace.json"), didFetch = !1, await fs.mkdir(Fd.dirname(marketplaceJsonPath)), await pnl.writeFile(marketplaceJsonPath, Le({
            name: source.name,
            owner: source.owner ?? {
              name: "settings"
            },
            plugins: source.plugins
          }, null, 2));
          break;
        }
      default:
        throw Error("Unsupported marketplace source type");
    }
    logForDebugging(`Reading marketplace from ${marketplaceJsonPath}`);
    let marketplaceData: any;
    try {
      marketplaceData = await jgo(marketplaceJsonPath, _7());
    } catch (err) {
      if (Pn(err)) throw Error(`Marketplace file not found at ${marketplaceJsonPath}`);
      throw Error(`Failed to parse marketplace file at ${marketplaceJsonPath}: ${Se(err)}`);
    }
    let validationErr = nhr(marketplaceData.name, source);
    if (validationErr) throw Error(validationErr);
    let canonicalPath = Fd.join(cacheDir, marketplaceData.name),
      resolvedCanonical = Fd.resolve(canonicalPath),
      resolvedCacheDir = Fd.resolve(cacheDir);
    if (!resolvedCanonical.startsWith(resolvedCacheDir + Fd.sep)) throw Error(`Marketplace name '${marketplaceData.name}' resolves to a path outside the cache directory`);
    if (cachePath !== canonicalPath && !g8(source)) {
      let isSame = !1;
      try {
        let [statA, statB] = await Promise.all([fs.stat(cachePath), fs.stat(canonicalPath)]);
        isSame = statA.dev === statB.dev && statA.ino === statB.ino && statA.ino !== 0;
      } catch {}
      if (isSame) cachePath = canonicalPath, didFetch = !1;else try {
        try {
          progressCb?.("Cleaning up old marketplace cache…");
        } catch (cbErr) {
          logForDebugging(`Progress callback error: ${Se(cbErr)}`, {
            level: "warn"
          });
        }
        await fs.rm(canonicalPath, {
          recursive: !0,
          force: !0
        }), await fs.rename(cachePath, canonicalPath), cachePath = canonicalPath, didFetch = !1;
      } catch (err) {
        let errMsg = Se(err);
        throw Error(`Failed to finalize marketplace cache. Please manually delete the directory at ${canonicalPath} if it exists and try again.

Technical details: ${errMsg}`);
      }
    }
    return {
      marketplace: marketplaceData,
      cachePath
    };
  } catch (err) {
    if (didFetch && cachePath && !g8(source)) try {
      await fs.rm(cachePath, {
        recursive: !0,
        force: !0
      });
    } catch (cleanupErr) {
      logForDebugging(`Warning: Failed to clean up temporary marketplace cache at ${cachePath}: ${Se(cleanupErr)}`, {
        level: "warn"
      });
    }
    throw err;
  }
}

/** Adds a new marketplace source; checks policy, deduplication, and handles name conflicts */
async function q0e(source: any, progressCb: any) {
  let resolvedSource = source;
  if (g8(source) && !Fd.isAbsolute(source.path)) resolvedSource = {
    ...source,
    path: Fd.resolve(source.path)
  };
  if (!Uv(resolvedSource)) {
    if (S1t(resolvedSource)) throw Error(`Marketplace source '${j_e(resolvedSource)}' is blocked by enterprise policy.`);
    let allowedSources = _W() || [],
      githubExceptions = Isa(),
      sourceLabel = gYr(resolvedSource),
      errMsg = `Marketplace source '${j_e(resolvedSource)}'`;
    if (sourceLabel) errMsg += ` (${sourceLabel})`;
    if (errMsg += " is blocked by enterprise policy.", allowedSources.length > 0) errMsg += ` Allowed sources: ${allowedSources.map((s: any) => j_e(s)).join(", ")}`;else errMsg += " No external marketplaces are allowed.";
    if (resolvedSource.source === "github" && githubExceptions.length > 0) errMsg += `

Tip: The shorthand "${resolvedSource.repo}" assumes github.com. For internal GitHub Enterprise, use the full URL:
  git@your-github-host.com:${resolvedSource.repo}.git`;
    throw Error(errMsg);
  }
  let knownMarketplaces = await vf();
  for (let [name, entry] of Object.entries(knownMarketplaces)) if (aT((entry as any).source, resolvedSource)) return logForDebugging(`Source already materialized as '${name}', skipping clone`), {
    name,
    alreadyMaterialized: !0,
    resolvedSource
  };
  let {
      marketplace: newMarketplace,
      cachePath
    } = await Wgo(resolvedSource, progressCb),
    nameValidationErr = nhr(newMarketplace.name, resolvedSource);
  if (nameValidationErr) throw Error(nameValidationErr);
  let latestKnown = await vf(),
    existingEntry = latestKnown[newMarketplace.name];
  if (existingEntry) {
    let seedOwner = $0e(existingEntry.installLocation);
    if (seedOwner) throw Error(`Marketplace '${newMarketplace.name}' is seed-managed (${seedOwner}). To use a different source, ask your admin to update the seed, or use a different marketplace name.`);
    if (logForDebugging(`Marketplace '${newMarketplace.name}' exists with different source — overwriting`), !g8(existingEntry.source)) {
      let cacheBase = Fd.resolve(F0e()),
        oldInstall = Fd.resolve(existingEntry.installLocation),
        newInstall = Fd.resolve(cachePath);
      if (oldInstall === newInstall) ;else if (oldInstall === cacheBase || oldInstall.startsWith(cacheBase + Fd.sep)) await jt().rm(existingEntry.installLocation, {
        recursive: !0,
        force: !0
      });else logForDebugging(`Skipping cleanup of old installLocation (${existingEntry.installLocation}) — ` + `outside ${cacheBase}. The path is corrupted; leaving it alone and overwriting the config entry.`, {
        level: "warn"
      });
    }
  }
  return latestKnown[newMarketplace.name] = {
    source: resolvedSource,
    installLocation: cachePath,
    lastUpdated: new Date().toISOString()
  }, await pne(latestKnown), logForDebugging(`Added marketplace source: ${newMarketplace.name}`), {
    name: newMarketplace.name,
    alreadyMaterialized: !1,
    resolvedSource
  };
}

/** Removes a marketplace (and optionally its plugins) from one or all scopes */
async function Spt(marketplaceId: string, scope: any) {
  let knownMarketplaces = await vf();
  if (!knownMarketplaces[marketplaceId]) throw Error(`Marketplace '${marketplaceId}' not found`);
  let entry = knownMarketplaces[marketplaceId],
    seedOwner = $0e(entry.installLocation);
  if (seedOwner && scope === void 0) throw Error(`Marketplace '${marketplaceId}' is registered from the read-only seed directory (${seedOwner}) and will be re-registered on next startup. To stop using its plugins: claude plugin disable <plugin>@${marketplaceId}`);
  let keepStateLayer = !1;
  if (scope !== void 0) {
    if (!getSettingsForSource(scope)?.extraKnownMarketplaces?.[marketplaceId]) {
      let hint = seedOwner ? `It is registered from the read-only seed directory. To stop using its plugins: claude plugin disable <plugin>@${marketplaceId}` : "Omit --scope to remove it from all scopes.";
      throw Error(`Marketplace '${marketplaceId}' is not declared in ${zEn(scope)} settings. ${hint}`);
    }
    keepStateLayer = Boolean(seedOwner) || F2.some((s: any) => s !== scope && getSettingsForSource(s)?.extraKnownMarketplaces?.[marketplaceId]) || Boolean(getSettingsForSource("policySettings")?.extraKnownMarketplaces?.[marketplaceId]);
  }
  if (!keepStateLayer) {
    delete knownMarketplaces[marketplaceId], await pne(knownMarketplaces);
    let fs = jt(),
      cacheDir = F0e(),
      marketplaceDir = Fd.join(cacheDir, marketplaceId);
    await fs.rm(marketplaceDir, {
      recursive: !0,
      force: !0
    }), await fs.rm(`${marketplaceDir}.bak`, {
      recursive: !0,
      force: !0
    });
    let jsonFile = Fd.join(cacheDir, `${marketplaceId}.json`);
    await fs.rm(jsonFile, {
      force: !0
    });
  }
  let removePlugins = !keepStateLayer;
  for (let scopeKey of F2) {
    let shouldRemoveDecl = scope === void 0 || scopeKey === scope;
    if (!shouldRemoveDecl && !removePlugins) continue;
    let scopeSettings = getSettingsForSource(scopeKey);
    if (!scopeSettings) continue;
    let didChange = !1,
      updates: any = {};
    if (shouldRemoveDecl && scopeSettings.extraKnownMarketplaces?.[marketplaceId]) {
      let mutableMarketplaces = {
        ...scopeSettings.extraKnownMarketplaces
      };
      mutableMarketplaces[marketplaceId] = void 0, updates.extraKnownMarketplaces = mutableMarketplaces, didChange = !0;
    }
    if (removePlugins && scopeSettings.enabledPlugins) {
      let suffix = `@${marketplaceId}`,
        mutablePlugins = {
          ...scopeSettings.enabledPlugins
        },
        hadPlugins = !1;
      for (let pluginId in mutablePlugins) if (pluginId.endsWith(suffix)) mutablePlugins[pluginId] = void 0, hadPlugins = !0;
      if (hadPlugins) updates.enabledPlugins = mutablePlugins, didChange = !0;
    }
    if (didChange) {
      let saveResult = updateSettingsForSource(scopeKey, updates);
      if (saveResult.error) logForDebugging(`Failed to clean up marketplace '${marketplaceId}' from ${scopeKey} settings: ${saveResult.error.message}`, {
        level: "error"
      });else logForDebugging(`Cleaned up marketplace '${marketplaceId}' from ${scopeKey} settings`);
    }
  }
  if (keepStateLayer) {
    logForDebugging(`Removed marketplace '${marketplaceId}' declaration from ${scope}; still declared in another scope, keeping state layer and installed plugins`);
    return;
  }
  let {
    orphanedPaths: orphanedPaths,
    removedPluginIds: removedPluginIds
  } = ynl(marketplaceId);
  for (let orphanPath of orphanedPaths) await N0e(orphanPath);
  for (let pluginId of removedPluginIds) await wrt(pluginId), await vtt(pluginId);
  Fet(removedPluginIds), logForDebugging(`Removed marketplace source: ${marketplaceId}`);
}

/** Reads the marketplace.json from a directory (tries .claude-plugin/marketplace.json, then the path itself) */
async function Aqt(dirOrFilePath: string) {
  let marketplaceJsonPath = Fd.join(dirOrFilePath, ".claude-plugin", "marketplace.json");
  try {
    return await jgo(marketplaceJsonPath, _7());
  } catch (err) {
    if (err instanceof T2) throw err;
    let errCode = dn(err);
    if (errCode !== "ENOENT" && errCode !== "ENOTDIR") throw err;
  }
  return await jgo(dirOrFilePath, _7());
}

/** Returns the cached marketplace data for a given marketplace ID, or null */
async function V6(marketplaceId: string) {
  let fs = jt(),
    filePath = _jn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      entry = qt(raw)[marketplaceId];
    if (!entry) return null;
    return await Aqt(entry.installLocation);
  } catch (err) {
    if (Pn(err)) return null;
    return logForDebugging(`Failed to read cached marketplace ${marketplaceId}: ${Se(err)}`, {
      level: "warn"
    }), null;
  }
}

/** Looks up a plugin entry from the cached marketplace data for a given plugin specifier */
async function Ggo(pluginSpecifier: string) {
  let {
    name: pluginName,
    marketplace: marketplaceId
  } = gs(pluginSpecifier);
  if (!pluginName || !marketplaceId) return null;
  let fs = jt(),
    filePath = _jn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      entry = qt(raw)[marketplaceId];
    if (!entry) return null;
    let marketplaceData = await V6(marketplaceId);
    if (!marketplaceData) return null;
    let pluginEntry = marketplaceData.plugins.find((p: any) => p.name === pluginName);
    if (!pluginEntry) return null;
    return {
      entry: pluginEntry,
      marketplaceInstallLocation: entry.installLocation
    };
  } catch {
    return null;
  }
}

/** Finds a plugin entry in cache first, then falls back to live fetch */
async function U0(pluginSpecifier: string) {
  let cached = await Ggo(pluginSpecifier);
  if (cached) return cached;
  let {
    name: pluginName,
    marketplace: marketplaceId
  } = gs(pluginSpecifier);
  if (!pluginName || !marketplaceId) return null;
  try {
    let marketplaceEntry = (await vf())[marketplaceId];
    if (!marketplaceEntry) return null;
    let pluginEntry = (await tM(marketplaceId)).plugins.find((p: any) => p.name === pluginName);
    if (!pluginEntry) return null;
    return {
      entry: pluginEntry,
      marketplaceInstallLocation: marketplaceEntry.installLocation
    };
  } catch (err) {
    return logForDebugging(`Could not find plugin ${pluginSpecifier}: ${Se(err)}`, {
      level: "debug"
    }), null;
  }
}

/** Bulk-refreshes all non-seed, non-settings, non-policy-blocked marketplaces */
async function hnl() {
  let knownMarketplaces = await vf();
  for (let [marketplaceId, entry] of Object.entries(knownMarketplaces)) {
    if ($0e(entry.installLocation)) {
      logForDebugging(`Skipping seed-managed marketplace '${marketplaceId}' in bulk refresh`);
      continue;
    }
    if (entry.source.source === "settings") continue;
    if (!Uv(entry.source)) {
      logForDebugging(`Skipping policy-blocked marketplace '${marketplaceId}' in bulk refresh`);
      continue;
    }
    let usedGcsFallback = !1;
    if (marketplaceId === nx) {
      if ((await fqt(entry.installLocation, F0e())) !== null) {
        Ie("plugin_official_marketplace_fetch"), knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString();
        continue;
      }
      if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_plugin_official_mkt_git_fallback", !0)) {
        Oe("plugin_official_marketplace_fetch", "gcs_failed_fallback_disabled"), logForDebugging("Skipping official marketplace bulk refresh: GCS failed, git fallback disabled");
        continue;
      }
      usedGcsFallback = !0;
    }
    try {
      let {
        cachePath: newCachePath
      } = await Wgo(entry.source);
      if (knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), knownMarketplaces[marketplaceId].installLocation = newCachePath, usedGcsFallback) isTmuxControlMode("plugin_official_marketplace_fetch", "gcs_failed_git_fallback");
    } catch (err) {
      if (usedGcsFallback) Oe("plugin_official_marketplace_fetch", "gcs_and_git_failed");
      logForDebugging(`Failed to refresh marketplace ${marketplaceId}: ${Se(err)}`, {
        level: "error"
      });
    }
  }
  await pne(knownMarketplaces);
}

/** Deduplicates concurrent refresh requests for the same marketplace */
function mne(marketplaceId: string, progressCb: any, opts: any) {
  let key = `${marketplaceId}:${opts?.disableCredentialHelper ? 1 : 0}`,
    existing = gjn.get(key);
  if (existing) {
    if (progressCb) existing.listeners.push(progressCb);
    return existing.promise;
  }
  let listeners: any[] = progressCb ? [progressCb] : [],
    promise = Iqp(marketplaceId, (msg: string) => {
      for (let cb of listeners) G6(cb, msg);
    }, opts).finally(() => gjn.delete(key));
  return gjn.set(key, {
    promise,
    listeners
  }), promise;
}

/** Core implementation: refreshes a single marketplace from its source */
async function Iqp(marketplaceId: string, progressCb: any, opts: any) {
  let knownMarketplaces = await vf(),
    entry = knownMarketplaces[marketplaceId];
  if (!entry) throw Error(`Marketplace '${marketplaceId}' not found. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
  if (!Uv(entry.source)) throw Error(`Marketplace source '${j_e(entry.source)}' is blocked by enterprise policy.`);
  if (opts?.skipIfRecent && entry.lastUpdated) {
    let ageMs = Date.now() - new Date(entry.lastUpdated).getTime();
    if (ageMs >= 0 && ageMs < 30000) {
      logForDebugging(`Skipping refresh for marketplace '${marketplaceId}' — refreshed ${Math.round(ageMs / 1000)}s ago`);
      return;
    }
  }
  if (tM.cache?.delete?.(marketplaceId), entry.source.source === "settings") {
    logForDebugging(`Skipping refresh for settings-sourced marketplace '${marketplaceId}' — no upstream`);
    return;
  }
  let usedGcsFallback = !1;
  try {
    let {
        installLocation,
        source
      } = entry,
      seedOwner = $0e(installLocation);
    if (seedOwner) throw Error(`Marketplace '${marketplaceId}' is seed-managed (${seedOwner}) and its content is controlled by the seed image. To update: ask your admin to update the seed.`);
    if (!g8(source)) {
      let cacheBase = Fd.resolve(F0e()),
        resolvedInstall = Fd.resolve(installLocation);
      if (resolvedInstall !== cacheBase && !resolvedInstall.startsWith(cacheBase + Fd.sep)) throw Error(`Marketplace '${marketplaceId}' has a corrupted installLocation (${installLocation}) — expected a path inside ${cacheBase}. This can happen after cross-platform path writes or manual edits to known_marketplaces.json. Run: claude plugin marketplace remove "${marketplaceId}" and re-add it.`);
    }
    if (marketplaceId === nx) {
      if ((await fqt(installLocation, F0e())) !== null) {
        Ie("plugin_official_marketplace_fetch"), knownMarketplaces[marketplaceId] = {
          ...entry,
          lastUpdated: new Date().toISOString()
        }, await pne(knownMarketplaces);
        return;
      }
      if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_plugin_official_mkt_git_fallback", !0)) throw Oe("plugin_official_marketplace_fetch", "gcs_failed_fallback_disabled"), Error("Official marketplace GCS fetch failed and git fallback is disabled");
      usedGcsFallback = !0, logForDebugging("Official marketplace GCS failed; falling back to git", {
        level: "warn"
      });
    }
    if (source.source === "github" || source.source === "git") {
      let pullOpts = {
        ...opts,
        skipLfs: source.skipLfs
      };
      if (source.source === "github") {
        let sshUrl = `git@github.com:${source.repo}.git`,
          httpsUrl = `https://github.com/${source.repo}.git`;
        if (Jwe()) await mnl(installLocation, httpsUrl), await Zce(httpsUrl, installLocation, source.ref, source.sparsePaths, progressCb, pullOpts);else {
          let sshConfigured = await fnl(),
            primaryUrl = sshConfigured ? sshUrl : httpsUrl,
            fallbackUrl = sshConfigured ? httpsUrl : sshUrl;
          try {
            await Zce(primaryUrl, installLocation, source.ref, source.sparsePaths, progressCb, pullOpts);
          } catch {
            logForDebugging(`Marketplace refresh failed with ${sshConfigured ? "SSH" : "HTTPS"} for ${source.repo}, falling back to ${sshConfigured ? "HTTPS" : "SSH"}`, {
              level: "info"
            }), await Zce(fallbackUrl, installLocation, source.ref, source.sparsePaths, progressCb, pullOpts);
          }
        }
      } else await Zce(source.url, installLocation, source.ref, source.sparsePaths, progressCb, pullOpts);
      try {
        await Aqt(installLocation);
      } catch {
        let repoLabel = source.source === "github" ? source.repo : eje(source.url);
        throw Error(`The marketplace.json file is no longer present in this repository.

${marketplaceId === "claude-code-plugins" ? `We've deprecated "claude-code-plugins" in favor of "claude-plugins-official".` : "This marketplace may have been deprecated or moved to a new location."}
Source: ${repoLabel}

You can remove this marketplace with: claude plugin marketplace remove "${marketplaceId}"`);
      }
    } else if (source.source === "url") await Anl(source.url, installLocation, source.headers, progressCb);else if (g8(source)) G6(progressCb, "Validating local marketplace"), await Aqt(installLocation);else throw Error("Unsupported marketplace source type for refresh");
    if (knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), await pne(knownMarketplaces), usedGcsFallback) isTmuxControlMode("plugin_official_marketplace_fetch", "gcs_failed_git_fallback");
    logForDebugging(`Successfully refreshed marketplace: ${marketplaceId}`);
  } catch (err) {
    if (usedGcsFallback) Oe("plugin_official_marketplace_fetch", "gcs_and_git_failed");
    let errMsg = err instanceof Error ? err.message : String(err);
    throw logForDebugging(`Failed to refresh marketplace ${marketplaceId}: ${errMsg}`, {
      level: "error"
    }), Error(`Failed to refresh marketplace '${marketplaceId}': ${errMsg}`);
  }
}

/** Sets the autoUpdate flag for a marketplace, validating that it's not managed by policy */
async function gnl(marketplaceId: string, autoUpdateValue: any) {
  let knownMarketplaces = await vf(),
    entry = knownMarketplaces[marketplaceId];
  if (!entry) throw Error(`Marketplace '${marketplaceId}' not found. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
  let seedOwner = $0e(entry.installLocation);
  if (seedOwner) throw Error(`Marketplace '${marketplaceId}' is seed-managed (${seedOwner}) and auto-update is always disabled for seed content. To update: ask your admin to update the seed.`);
  let managedBySettings = Tqp(marketplaceId);
  if (managedBySettings !== null) throw Error(`Auto-update for '${marketplaceId}' is set by ${managedBySettings} and can't be changed here. Update that settings source (or ask your admin to) instead.`);
  if (entry.autoUpdate === autoUpdateValue) return;
  knownMarketplaces[marketplaceId] = {
    ...entry,
    autoUpdate: autoUpdateValue
  }, await pne(knownMarketplaces);
  let declaredScope = Sqp(marketplaceId);
  if (declaredScope) {
    let scopeEntry = getSettingsForSource(declaredScope)?.extraKnownMarketplaces?.[marketplaceId];
    if (scopeEntry) hqt(marketplaceId, {
      source: scopeEntry.source,
      autoUpdate: autoUpdateValue
    }, declaredScope);
  }
  logForDebugging(`Set autoUpdate=${autoUpdateValue} for marketplace: ${marketplaceId}`);
}

/** Syncs the autoUpdate flag from settings declarations into known_marketplaces.json */
async function _nl(existingConfig: any) {
  let declaredMarketplaces = F9();
  if (Object.keys(declaredMarketplaces).length === 0) return !1;
  let config: any;
  if (existingConfig) config = existingConfig;else try {
    config = await vf();
  } catch (err) {
    return logForDebugging(`syncDeclaredAutoUpdateToJson: failed to load known_marketplaces.json: ${Se(err)}`, {
      level: "error"
    }), !1;
  }
  let didChange = !1;
  for (let [marketplaceId, declared] of Object.entries(declaredMarketplaces)) {
    if ((declared as any).autoUpdate === void 0) continue;
    let existing = config[marketplaceId];
    if (!existing || $0e(existing.installLocation)) continue;
    if (existing.autoUpdate === (declared as any).autoUpdate) continue;
    config[marketplaceId] = {
      ...existing,
      autoUpdate: (declared as any).autoUpdate
    }, didChange = !0, logForDebugging(`Synced autoUpdate=${(declared as any).autoUpdate} from settings for marketplace: ${marketplaceId}`);
  }
  if (didChange) await pne(config);
  return didChange;
}
var pnl: any,
  Fd: any,
  Cqp = 120000,
  tM: any,
  gjn: any;
var hS = b(() => {
  durationUnitMillis();
  roe();
  ta();
  Xr();
  ln();
  zn();
  ek();
  ok();
  qe();
  sn();
  bt();
  oa();
  ws();
  Ba();
  mf();
  yr();
  Xt();
  rz();
  eCn();
  W6();
  TDt();
  qet();
  Mk();
  W_e();
  XUe();
  qgo();
  J1();
  sh();
  Hq();
  nI();
  ik();
  pnl = require("fs/promises"), Fd = require("path");
  tM = wn(async (marketplaceId: string) => {
    let knownMarketplaces = await vf(),
      entry = knownMarketplaces[marketplaceId];
    if (!entry) throw Error(`Marketplace '${marketplaceId}' not found in configuration. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
    if (g8(entry.source) && !Fd.isAbsolute(entry.source.path)) throw Error(`Marketplace "${marketplaceId}" has a relative source path (${entry.source.path}) ` + "in known_marketplaces.json — this is stale state from an older " + `Claude Code version. Run 'claude plugin marketplace remove ${marketplaceId}' and re-add it from the original project directory.`);
    try {
      return await Aqt(entry.installLocation);
    } catch (err) {
      logForDebugging(`Cache corrupted or missing for marketplace ${marketplaceId}, re-fetching from source: ${Se(err)}`, {
        level: "warn"
      });
    }
    let refreshedData: any;
    try {
      ({
        marketplace: refreshedData
      } = await Wgo(entry.source));
    } catch (err) {
      throw Error(`Failed to load marketplace "${marketplaceId}" from source (${entry.source.source}): ${Se(err)}`);
    }
    return knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), await pne(knownMarketplaces), refreshedData;
  });
  gjn = new Map();
});
export {_jn,F0e,U0e,F9,Tqp,Sqp,hqt,vf,NP,pne,yjn,bqp,Eqp,$0e,G_e,mnl,vqp,unl,hjn,fnl,wqp,dnl,Rqp,G6,xqp,Zce,kqp,eje,Anl,Hqp,jgo,Wgo,q0e,Spt,Aqt,V6,Ggo,U0,hnl,mne,Iqp,gnl,_nl,pnl,Fd,Cqp,tM,gjn,hS};
