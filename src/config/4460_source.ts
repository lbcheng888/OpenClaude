// @ts-nocheck
import {hw,iae,krt,a1} from "./2689_withFileTypes.ts";
import {Y2e,O8r,Gvn} from "../../vendor/m2606.ts";
import {getInitialSettings as Fr,getSettingsForSource as An,ao,br} from "./0745_updateSettingsForSource.ts";
import {ts,Fvn,oh} from "../../vendor/m2600.ts";
import {mw,Knt,X2e} from "../../vendor/m2608.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {rYe,GK,DSr,P5,bk} from "../agent/0731_level.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {$U,In,Ce,Ta,mo,cn,Ct} from "../../vendor/m197.ts";
import {R5,Pv} from "../../vendor/m639.ts";
import {J_,$X} from "../../vendor/m446.ts";
import {execFileNoThrowWithCwd as Wr,execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {gitExe as go,ia} from "../../vendor/m698.ts";
import {nW,Pwe,Z2e} from "./2612_GIT_CONFIG_COUNT.ts";
import {RD,tW,XOt} from "../telemetry/2610_source.ts";
import {nt} from "../../vendor/m127.ts";
import {CR,toe} from "../../vendor/m450.ts";
import {externalHttp as $b,_k} from "../core/0576_isCancel.ts";
import {isAxiosError as Zy} from "../../vendor/m573.ts";
import {C} from "../../vendor/m321.ts";
import {jA,QFt,OW,Npa,eeo,II} from "../../vendor/m3268.ts";
import {uTe,dTe} from "../../vendor/m4457.ts";
import {y8r,t_} from "../../vendor/m2594.ts";
import {a2,wm} from "../../vendor/m707.ts";
import {scl,rH} from "./4461_operation.ts";
import {PDe,c6} from "../../vendor/m4456.ts";
import {Ist,V4} from "../../vendor/m3150.ts";
import {Gnt,eW} from "../../vendor/m2601.ts";
import {U5t,MEo} from "./4459_level.ts";
import {He,xe,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Qr} from "../../vendor/m323.ts";
import {dn} from "./0137_namespace.ts";
/** Returns the path to the known_marketplaces.json config file */
function FGn() {
  return _d.join(hw(), "known_marketplaces.json");
}

/** Returns the path to the marketplaces cache directory */
function LDe() {
  return _d.join(hw(), "marketplaces");
}

/** Clears the marketplace cache (in-memory memoize + dedup map) */
function MDe() {
  TL.cache?.clear?.(), NGn.clear();
}

/** Builds the combined set of known marketplace sources from settings, plugins, and env */
function l9() {
  let mergedPlugins: any = {},
    enabledPlugins = {
      ...Y2e(),
      ...(Fr().enabledPlugins ?? {})
    };
  for (let [pluginId, enabled] of Object.entries(enabledPlugins)) if (enabled && ts(pluginId).marketplace === mw) {
    mergedPlugins[mw] = {
      source: Knt,
      sourceIsFallback: !0
    };
    break;
  }
  return {
    ...mergedPlugins,
    ...O8r(),
    ...(Fr().extraKnownMarketplaces ?? {})
  };
}

/** Returns which settings layer controls the autoUpdate flag for a given marketplace, or null */
function rzp(marketplaceId: string) {
  if (An("policySettings")?.extraKnownMarketplaces?.[marketplaceId]?.autoUpdate !== void 0) return "managed settings (managed-settings.json)";
  if (An("flagSettings")?.extraKnownMarketplaces?.[marketplaceId]?.autoUpdate !== void 0) return "the --settings flag";
  if (O8r()[marketplaceId]?.autoUpdate !== void 0 && Fr().extraKnownMarketplaces?.[marketplaceId] === void 0) return "an --add-dir directory's settings";
  return null;
}

/** Returns which user-level settings scope declares the given marketplace, or null */
function ozp(marketplaceId: string) {
  let scopes: any[] = ["localSettings", "projectSettings", "userSettings"];
  for (let scope of scopes) if (An(scope)?.extraKnownMarketplaces?.[marketplaceId]) return scope;
  return null;
}

/** Persists a marketplace entry into the given settings scope */
function q5t(marketplaceId: string, entry: any, scope: any = "userSettings") {
  let knownMarketplaces: any = {
    ...(An(scope) ?? {}).extraKnownMarketplaces
  };
  knownMarketplaces[marketplaceId] = entry, ao(scope, {
    extraKnownMarketplaces: knownMarketplaces
  });
}

/** Reads and validates the known_marketplaces.json file from disk */
async function $m() {
  let fs = Wt(),
    filePath = FGn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      parsed = qt(raw),
      result = rYe().safeParse(parsed);
    if (!result.success) {
      let errMsg = `Marketplace configuration file is corrupted: ${result.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`;
      throw A(errMsg, {
        level: "error"
      }), new $U(errMsg, filePath, parsed);
    }
    return result.data;
  } catch (err) {
    if (In(err)) return {};
    if (err instanceof $U) throw err;
    let errMsg = `Failed to load marketplace configuration: ${Ce(err)}`;
    throw A(errMsg, {
      level: "error"
    }), Error(errMsg);
  }
}

/** Like $m() but returns {} on any error instead of throwing */
async function tP() {
  try {
    return await $m();
  } catch {
    return {};
  }
}

/** Validates and writes marketplace config to known_marketplaces.json */
async function one(config: any) {
  let validated = rYe().safeParse(config),
    filePath = FGn();
  if (!validated.success) throw new $U(`Invalid marketplace config: ${validated.error.message}`, filePath, config);
  let fs = Wt(),
    parentDir = _d.join(filePath, "..");
  await fs.mkdir(parentDir), R5(filePath, Pe(validated.data, null, 2));
}

/** Syncs seed-directory marketplaces into known_marketplaces.json; returns true if any entries changed */
async function BGn() {
  let seedDirs = iae();
  if (seedDirs.length === 0) return !1;
  let knownMarketplaces = await $m(),
    seen = new Set(),
    changeCount = 0;
  for (let seedDir of seedDirs) {
    let seedKnown = await szp(seedDir);
    if (!seedKnown) continue;
    for (let [name, entry] of Object.entries(seedKnown)) {
      if (seen.has(name)) continue;
      let installPath = await izp(seedDir, name);
      if (!installPath) {
        A(`Seed marketplace '${name}' not found under ${seedDir}/marketplaces/, skipping`, {
          level: "warn"
        });
        continue;
      }
      seen.add(name);
      let newEntry = {
        source: entry.source,
        installLocation: installPath,
        lastUpdated: entry.lastUpdated,
        autoUpdate: !1
      };
      if (J_(knownMarketplaces[name], newEntry)) continue;
      knownMarketplaces[name] = newEntry, changeCount++;
    }
  }
  if (changeCount > 0) return await one(knownMarketplaces), A(`Synced ${changeCount} marketplace(s) from seed dir(s)`), !0;
  return !1;
}

/** Reads the known_marketplaces.json from a seed directory, returning null on error */
async function szp(seedDir: string) {
  let filePath = _d.join(seedDir, "known_marketplaces.json");
  try {
    let raw = await Wt().readFile(filePath, {
        encoding: "utf-8"
      }),
      result = rYe().safeParse(qt(raw));
    if (!result.success) return A(`Seed known_marketplaces.json invalid at ${seedDir}: ${result.error.message}`, {
      level: "warn"
    }), null;
    return result.data;
  } catch (err) {
    if (!In(err)) A(`Failed to read seed known_marketplaces.json at ${seedDir}: ${err}`, {
      level: "warn"
    });
    return null;
  }
}

/** Finds the install location for a named marketplace under a seed directory */
async function izp(seedDir: string, marketplaceName: string) {
  let dirPath = _d.join(seedDir, "marketplaces", marketplaceName),
    jsonPath = _d.join(seedDir, "marketplaces", `${marketplaceName}.json`);
  for (let candidate of [dirPath, jsonPath]) try {
    return await $5t(candidate), candidate;
  } catch {}
  return null;
}

/** Returns the seed directory that owns the given install path, or undefined */
function NDe(installPath: string) {
  return iae().find(seedDir => installPath === seedDir || installPath.startsWith(seedDir + _d.sep));
}

/** Returns the git operation timeout in ms (env override or default) */
function pTe() {
  let envVal = process.env.CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS;
  if (envVal) {
    let parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return azp;
}

/** Sets the git remote URL for the marketplace repo */
async function Zll(repoPath: string, remoteUrl: string) {
  await Wr(go(), ["--git-dir=.git", "remote", "set-url", "origin", remoteUrl], {
    cwd: repoPath,
    stdin: "ignore"
  });
}

/** Runs git pull (with optional ref, credential helper disable, LFS skip, sparse paths) */
async function lzp(repoPath: string, ref: any, opts: any) {
  A(`git pull: cwd=${repoPath} ref=${ref ?? "default"}`);
  let envVars: any = {
      ...nW(),
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
    let fetchResult = await Wr(go(), [...credArgs, "fetch", "origin", ref], {
      cwd: repoPath,
      timeout: pTe(),
      stdin: "ignore",
      env: envVars
    });
    if (fetchResult.code !== 0) return MGn(fetchResult);
    let checkoutResult = await Wr(go(), [...credArgs, "checkout", ref], {
      cwd: repoPath,
      timeout: pTe(),
      stdin: "ignore",
      env: envVars
    });
    if (checkoutResult.code !== 0) return MGn(checkoutResult);
    let pullResult = await Wr(go(), [...credArgs, "pull", "origin", ref], {
      cwd: repoPath,
      timeout: pTe(),
      stdin: "ignore",
      env: envVars
    });
    if (pullResult.code !== 0) return MGn(pullResult);
    return await Jll(repoPath, credArgs, envVars, opts?.sparsePaths), pullResult;
  }
  let defaultPullResult = await Wr(go(), [...credArgs, "pull", "origin", "HEAD"], {
    cwd: repoPath,
    timeout: pTe(),
    stdin: "ignore",
    env: envVars
  });
  if (defaultPullResult.code !== 0) return MGn(defaultPullResult);
  return await Jll(repoPath, credArgs, envVars, opts?.sparsePaths), defaultPullResult;
}

/** Updates git submodules after a pull, skipped when sparse paths are present */
async function Jll(repoPath: string, credArgs: any, envVars: any, sparsePaths: any) {
  if (sparsePaths && sparsePaths.length > 0) return;
  if (!(await Wt().stat(_d.join(repoPath, ".gitmodules")).then(() => !0, () => !1))) return;
  let submoduleResult = await Wr(go(), ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes", ...credArgs, "submodule", "update", "--init", "--recursive", "--depth", "1"], {
    cwd: repoPath,
    timeout: pTe(),
    stdin: "ignore",
    env: envVars
  });
  if (submoduleResult.code !== 0) A(`git submodule update failed (non-fatal): ${submoduleResult.stderr}`, {
    level: "warn"
  });
}

/** Enriches a failed git pull result with user-friendly error messages */
function MGn(gitResult: any) {
  if (gitResult.code === 0) return gitResult;
  if (gitResult.error?.includes("timed out")) {
    let timeoutSecs = Math.round(pTe() / 1000);
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
async function ecl() {
  try {
    let sshResult = await Fn("ssh", ["-T", "-o", "BatchMode=yes", "-o", "ConnectTimeout=2", "-o", "StrictHostKeyChecking=yes", "git@github.com"], {
        timeout: 3000
      }),
      configured = sshResult.code === 1 && (sshResult.stderr?.includes("successfully authenticated") || sshResult.stdout?.includes("successfully authenticated"));
    return A(`SSH config check: code=${sshResult.code} configured=${configured}`), configured;
  } catch (err) {
    return A(`SSH configuration check failed: ${Ce(err)}`, {
      level: "warn"
    }), !1;
  }
}

/** Returns true if the stderr indicates HTTPS auth failure */
function czp(stderr: string) {
  return stderr.includes("Authentication failed") || stderr.includes("could not read Username") || stderr.includes("terminal prompts disabled") || stderr.includes("403") || stderr.includes("401");
}

/** Extracts SSH hostname from an SCP-style git URL, or null for http(s) URLs */
function Xll(gitUrl: string) {
  if (gitUrl.includes("://")) return null;
  return gitUrl.match(/^[^@]+@([^:]+):/)?.[1] ?? null;
}

/** git clone with depth 1, sparse checkout support, and detailed error enrichment */
async function uzp(repoUrl: string, destPath: string, ref: any, sparsePaths: any, skipLfs: any) {
  let hasSparse = sparsePaths && sparsePaths.length > 0,
    envVars: any = {
      ...nW(),
      ...(skipLfs && {
        GIT_LFS_SKIP_SMUDGE: "1"
      })
    },
    cloneArgs: any[] = ["-c", "core.sshCommand=ssh -o BatchMode=yes -o StrictHostKeyChecking=yes", "clone", "--depth", "1"];
  if (hasSparse) cloneArgs.push("--filter=blob:none", "--no-checkout");else cloneArgs.push("--recurse-submodules", "--shallow-submodules");
  if (ref) cloneArgs.push("--branch", ref);
  cloneArgs.push("--", repoUrl, destPath);
  let timeoutMs = pTe();
  A(`git clone: url=${w8e(repoUrl)} ref=${ref ?? "default"} timeout=${timeoutMs}ms`);
  let cloneResult = await Wr(go(), cloneArgs, {
      timeout: timeoutMs,
      stdin: "ignore",
      env: envVars
    }),
    redactedUrl = w8e(repoUrl);
  if (repoUrl !== redactedUrl) {
    if (cloneResult.error) cloneResult.error = cloneResult.error.replaceAll(repoUrl, redactedUrl);
    if (cloneResult.stderr) cloneResult.stderr = cloneResult.stderr.replaceAll(repoUrl, redactedUrl);
  }
  if (cloneResult.code === 0) {
    if (hasSparse) {
      let sparseResult = await Wr(go(), ["sparse-checkout", "set", "--cone", "--", ...sparsePaths], {
        cwd: destPath,
        timeout: timeoutMs,
        stdin: "ignore",
        env: envVars
      });
      if (sparseResult.code !== 0) return {
        code: sparseResult.code,
        stderr: `git sparse-checkout set failed: ${sparseResult.stderr}`
      };
      let checkoutResult = await Wr(go(), ["checkout", "HEAD"], {
        cwd: destPath,
        timeout: timeoutMs,
        stdin: "ignore",
        env: envVars
      });
      if (checkoutResult.code !== 0) return {
        code: checkoutResult.code,
        stderr: `git checkout after sparse-checkout failed: ${checkoutResult.stderr}`
      };
    }
    return A(`git clone succeeded: ${w8e(repoUrl)}`), cloneResult;
  }
  if (A(`git clone failed: url=${w8e(repoUrl)} code=${cloneResult.code} error=${cloneResult.error ?? "none"} stderr=${cloneResult.stderr}`, {
    level: "warn"
  }), cloneResult.error?.includes("timed out")) return {
    ...cloneResult,
    stderr: `Git clone timed out after ${Math.round(timeoutMs / 1000)}s. The repository may be too large for the current timeout. Set CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS to increase it (e.g., 300000 for 5 minutes).

Original error: ${cloneResult.stderr}`
  };
  if (cloneResult.stderr) {
    if (cloneResult.stderr.includes("REMOTE HOST IDENTIFICATION HAS CHANGED")) {
      let sshHost = Xll(repoUrl),
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
      let sshHost = Xll(repoUrl),
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
    if (czp(cloneResult.stderr)) return {
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
function u6(progressCb: any, message: string) {
  if (!progressCb) return;
  try {
    progressCb(message);
  } catch (err) {
    A(`Progress callback error: ${Ce(err)}`, {
      level: "warn"
    });
  }
}

/** Reconciles sparse-checkout config for a repo path; returns a result object indicating success or need to re-clone */
async function dzp(repoPath: string, sparsePaths: any, skipLfs: any) {
  let envVars: any = {
    ...nW(),
    ...(skipLfs && {
      GIT_LFS_SKIP_SMUDGE: "1"
    })
  };
  if (sparsePaths && sparsePaths.length > 0) return Wr(go(), ["sparse-checkout", "set", "--cone", "--", ...sparsePaths], {
    cwd: repoPath,
    timeout: pTe(),
    stdin: "ignore",
    env: envVars
  });
  let sparseConfigResult = await Wr(go(), ["config", "--get", "core.sparseCheckout"], {
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
async function Jce(repoUrl: string, repoPath: string, ref: any, sparsePathsArg: any, progressCb: any, opts: any) {
  let fs = Wt(),
    timeoutSecs = Math.round(pTe() / 1000);
  u6(progressCb, `Refreshing marketplace cache (timeout: ${timeoutSecs}s)\u2026`);
  let sparseResult = await dzp(repoPath, sparsePathsArg, opts?.skipLfs);
  if (sparseResult.code === 0) {
    let pullStart = performance.now(),
      pullResult = await lzp(repoPath, ref, {
        disableCredentialHelper: opts?.disableCredentialHelper,
        sparsePaths: sparsePathsArg,
        skipLfs: opts?.skipLfs
      });
    if (RD("marketplace_pull", repoUrl, pullResult.code === 0 ? "success" : "failure", performance.now() - pullStart, pullResult.code === 0 ? void 0 : tW(pullResult.stderr)), pullResult.code === 0) return;
    if (nt(process.env.CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE)) {
      let marketplaceJson = _d.join(repoPath, ".claude-plugin", "marketplace.json");
      if (await fs.stat(marketplaceJson).then(() => !0, () => !1)) {
        A(`git pull failed, keeping existing clone (CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE): ${pullResult.stderr}`, {
          level: "warn"
        });
        return;
      }
    }
    A(`git pull failed, will re-clone: ${pullResult.stderr}`, {
      level: "warn"
    });
  } else A(`sparse-checkout reconcile requires re-clone: ${sparseResult.stderr}`);
  let backupPath = `${repoPath}.bak`,
    didRename = !1;
  try {
    await fs.rename(backupPath, repoPath);
  } catch (err) {
    if (!In(err)) {
      let marketplaceJson = _d.join(repoPath, ".claude-plugin", "marketplace.json");
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

Technical details: ${Ce(err)}`);
  }
  try {
    await fs.rename(repoPath, backupPath), didRename = !0, A(`Found stale marketplace directory at ${repoPath}, moving aside to allow re-clone`, {
      level: "warn"
    }), u6(progressCb, "Found stale directory, cleaning up and re-cloning\u2026");
  } catch (err) {
    if (!In(err)) throw Error(`Failed to clean up existing marketplace directory. Please manually delete the directory at ${repoPath} and try again.

Technical details: ${Ce(err)}`);
  }
  let refSuffix = ref ? ` (ref: ${ref})` : "";
  u6(progressCb, `Cloning repository (timeout: ${timeoutSecs}s): ${w8e(repoUrl)}${refSuffix}`);
  let cloneStart = performance.now(),
    cloneResult = await uzp(repoUrl, repoPath, ref, sparsePathsArg, opts?.skipLfs);
  if (RD("marketplace_clone", repoUrl, cloneResult.code === 0 ? "success" : "failure", performance.now() - cloneStart, cloneResult.code === 0 ? void 0 : tW(cloneResult.stderr)), cloneResult.code !== 0) {
    try {
      await fs.rm(repoPath, {
        recursive: !0,
        force: !0
      });
    } catch {}
    if (didRename) try {
      await fs.rename(backupPath, repoPath);
    } catch {}
    throw new Ta(`Failed to clone marketplace repository: ${cloneResult.stderr}`, `Failed to clone marketplace repository: ${tW(cloneResult.stderr)} (exit ${cloneResult.code})`);
  }
  if (didRename) try {
    await fs.rm(backupPath, {
      recursive: !0,
      force: !0
    });
  } catch {}
  u6(progressCb, "Clone complete, validating marketplace\u2026");
}

/** Redacts credential values in an object using CR() */
function pzp(headersObj: any) {
  return CR(headersObj, () => "***REDACTED***");
}

/** Redacts username/password from http(s) URLs for logging */
function w8e(url: string) {
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
async function tcl(downloadUrl: string, destPath: string, headers: any, progressCb: any) {
  let fs = Wt(),
    redactedUrl = w8e(downloadUrl);
  if (u6(progressCb, `Downloading marketplace from ${redactedUrl}`), A(`Downloading marketplace from URL: ${redactedUrl}`), headers && Object.keys(headers).length > 0) A(`Using custom headers: ${Pe(pzp(headers))}`);
  let requestHeaders: any = {
      ...headers,
      "User-Agent": "Claude-Code-Plugin-Manager"
    },
    response: any,
    downloadStart = performance.now();
  try {
    response = await $b.get(downloadUrl, {
      timeout: 1e4,
      headers: requestHeaders
    });
  } catch (err) {
    if (RD("marketplace_url", downloadUrl, "failure", performance.now() - downloadStart, tW(err)), Zy(err)) {
      if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") throw Error(`Could not connect to ${redactedUrl}. Please check your internet connection and verify the URL is correct.

Technical details: ${err.message}`);
      if (err.code === "ETIMEDOUT") throw Error(`Request timed out while downloading marketplace from ${redactedUrl}. The server may be slow or unreachable.

Technical details: ${err.message}`);
      if (err.response) throw Error(`HTTP ${err.response.status} error while downloading marketplace from ${redactedUrl}. The marketplace file may not exist at this URL.

Technical details: ${err.message}`);
    }
    throw Error(`Failed to download marketplace from ${redactedUrl}: ${Ce(err)}`);
  }
  u6(progressCb, "Validating marketplace data");
  let validatedSchema = GK().extend({
    plugins: C.array(C.unknown())
  }).safeParse(response.data);
  if (!validatedSchema.success) throw RD("marketplace_url", downloadUrl, "failure", performance.now() - downloadStart, "invalid_schema"), new $U(`Invalid marketplace schema from URL: ${validatedSchema.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`, redactedUrl, response.data);
  RD("marketplace_url", downloadUrl, "success", performance.now() - downloadStart), u6(progressCb, "Saving marketplace to cache");
  let parentDir = _d.join(destPath, "..");
  await fs.mkdir(parentDir), R5(destPath, Pe(response.data, null, 2));
}

/** Derives a filesystem-safe cache directory name from a marketplace source descriptor */
function mzp(source: any) {
  let dirName = (source.source === "github" ? source.repo.replaceAll("/", "-") : source.source === "npm" ? source.package.replace("@", "").replaceAll("/", "-") : source.source === "file" ? _d.basename(source.path).replace(".json", "") : source.source === "directory" ? _d.basename(source.path) : "temp_" + Date.now()).replace(/[^a-zA-Z0-9\-_]/g, "-");
  return dirName === "" ? "temp_" + Date.now() : dirName;
}

/** Reads and validates a marketplace JSON file from a given path using a zod schema */
async function NEo(filePath: string, schema: any) {
  let raw = await Wt().readFile(filePath, {
      encoding: "utf-8"
    }),
    parsed: any;
  try {
    parsed = qt(raw);
  } catch (err) {
    throw new $U(`Invalid JSON in ${filePath}: ${Ce(err)}`, filePath, raw);
  }
  let validated = schema.safeParse(parsed);
  if (!validated.success) throw new $U(`Invalid schema: ${filePath} ${validated.error?.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`, filePath, parsed);
  return validated.data;
}

/** Materializes a marketplace from its source (git/github/url/file/directory/settings/npm) into the cache */
async function FEo(source: any, progressCb: any) {
  if (!jA(source)) throw Error(`Marketplace source '${uTe(source)}' is blocked by enterprise policy.`);
  let fs = Wt(),
    cacheDir = LDe();
  await fs.mkdir(cacheDir);
  let cacheTargetPath: any,
    marketplaceJsonPath: any,
    didFetch = !1,
    dirName = mzp(source);
  try {
    switch (source.source) {
      case "url":
        {
          cacheTargetPath = _d.join(cacheDir, `${dirName}.json`), didFetch = !0, await tcl(source.url, cacheTargetPath, source.headers, progressCb), marketplaceJsonPath = cacheTargetPath;
          break;
        }
      case "github":
        {
          let sshUrl = `git@github.com:${source.repo}.git`,
            httpsUrl = `https://github.com/${source.repo}.git`;
          if (cacheTargetPath = _d.join(cacheDir, dirName), didFetch = !0, Pwe()) {
            u6(progressCb, `Cloning via HTTPS: ${httpsUrl}`), await Zll(cacheTargetPath, httpsUrl), await Jce(httpsUrl, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
              skipLfs: source.skipLfs
            }), marketplaceJsonPath = _d.join(cacheTargetPath, source.path || ".claude-plugin/marketplace.json");
            break;
          }
          let caughtError: any = null;
          if (await ecl()) {
            u6(progressCb, `Cloning via SSH: ${sshUrl}`);
            try {
              await Jce(sshUrl, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
                skipLfs: source.skipLfs
              });
            } catch (err) {
              caughtError = mo(err), A(`SSH clone failed for ${source.repo}: ${caughtError.message}`, {
                level: "error"
              }), u6(progressCb, `SSH clone failed, retrying with HTTPS: ${httpsUrl}`), A(`SSH clone failed for ${source.repo} despite SSH being configured, falling back to HTTPS`, {
                level: "info"
              }), await fs.rm(cacheTargetPath, {
                recursive: !0,
                force: !0
              });
              try {
                await Jce(httpsUrl, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
                  skipLfs: source.skipLfs
                }), caughtError = null;
              } catch (retryErr) {
                caughtError = mo(retryErr), A(`Failed to clone marketplace repo ${source.repo} via HTTPS after SSH fallback: ${caughtError.message}`, {
                  level: "error"
                });
              }
            }
          } else {
            u6(progressCb, `SSH not configured, cloning via HTTPS: ${httpsUrl}`), A(`SSH not configured for GitHub, using HTTPS for ${source.repo}`, {
              level: "info"
            });
            try {
              await Jce(httpsUrl, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
                skipLfs: source.skipLfs
              });
            } catch (err) {
              caughtError = mo(err), A(`HTTPS git clone failed for marketplace ${source.repo}: ${caughtError.message}`, {
                level: "error"
              }), u6(progressCb, `HTTPS clone failed, retrying with SSH: ${sshUrl}`), A(`HTTPS clone failed for ${source.repo} (${caughtError.message}), falling back to SSH`, {
                level: "info"
              }), await fs.rm(cacheTargetPath, {
                recursive: !0,
                force: !0
              });
              try {
                await Jce(sshUrl, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
                  skipLfs: source.skipLfs
                }), caughtError = null;
              } catch (retryErr) {
                caughtError = mo(retryErr), A(`SSH clone fallback also failed for ${source.repo}: ${caughtError.message}`, {
                  level: "error"
                });
              }
            }
          }
          if (caughtError) throw caughtError;
          marketplaceJsonPath = _d.join(cacheTargetPath, source.path || ".claude-plugin/marketplace.json");
          break;
        }
      case "git":
        {
          cacheTargetPath = _d.join(cacheDir, dirName), didFetch = !0, await Jce(source.url, cacheTargetPath, source.ref, source.sparsePaths, progressCb, {
            skipLfs: source.skipLfs
          }), marketplaceJsonPath = _d.join(cacheTargetPath, source.path || ".claude-plugin/marketplace.json");
          break;
        }
      case "npm":
        throw Error("NPM marketplace sources not yet implemented");
      case "file":
        {
          let resolvedPath = _d.resolve(source.path);
          marketplaceJsonPath = resolvedPath, cacheTargetPath = _d.dirname(_d.dirname(resolvedPath)), didFetch = !1;
          break;
        }
      case "directory":
        {
          let resolvedPath = _d.resolve(source.path);
          marketplaceJsonPath = _d.join(resolvedPath, ".claude-plugin", "marketplace.json"), cacheTargetPath = resolvedPath, didFetch = !1;
          break;
        }
      case "settings":
        {
          cacheTargetPath = _d.join(cacheDir, source.name), marketplaceJsonPath = _d.join(cacheTargetPath, ".claude-plugin", "marketplace.json"), didFetch = !1, await fs.mkdir(_d.dirname(marketplaceJsonPath)), await Qll.writeFile(marketplaceJsonPath, Pe({
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
    A(`Reading marketplace from ${marketplaceJsonPath}`);
    let marketplaceData: any;
    try {
      marketplaceData = await NEo(marketplaceJsonPath, GK());
    } catch (err) {
      if (In(err)) throw Error(`Marketplace file not found at ${marketplaceJsonPath}`);
      throw Error(`Failed to parse marketplace file at ${marketplaceJsonPath}: ${Ce(err)}`);
    }
    let validationErr = DSr(marketplaceData.name, source);
    if (validationErr) throw Error(validationErr);
    let canonicalPath = _d.join(cacheDir, marketplaceData.name),
      resolvedCanonical = _d.resolve(canonicalPath),
      resolvedCacheDir = _d.resolve(cacheDir);
    if (!resolvedCanonical.startsWith(resolvedCacheDir + _d.sep)) throw Error(`Marketplace name '${marketplaceData.name}' resolves to a path outside the cache directory`);
    if (cacheTargetPath !== canonicalPath && !P5(source)) {
      let isSame = !1;
      try {
        let [statA, statB] = await Promise.all([fs.stat(cacheTargetPath), fs.stat(canonicalPath)]);
        isSame = statA.dev === statB.dev && statA.ino === statB.ino && statA.ino !== 0;
      } catch {}
      if (isSame) cacheTargetPath = canonicalPath, didFetch = !1;else try {
        try {
          progressCb?.("Cleaning up old marketplace cache\u2026");
        } catch (cbErr) {
          A(`Progress callback error: ${Ce(cbErr)}`, {
            level: "warn"
          });
        }
        await fs.rm(canonicalPath, {
          recursive: !0,
          force: !0
        }), await fs.rename(cacheTargetPath, canonicalPath), cacheTargetPath = canonicalPath, didFetch = !1;
      } catch (err) {
        let errMsg = Ce(err);
        throw Error(`Failed to finalize marketplace cache. Please manually delete the directory at ${canonicalPath} if it exists and try again.

Technical details: ${errMsg}`);
      }
    }
    return {
      marketplace: marketplaceData,
      cachePath: cacheTargetPath
    };
  } catch (err) {
    if (didFetch && cacheTargetPath && !P5(source)) try {
      await fs.rm(cacheTargetPath, {
        recursive: !0,
        force: !0
      });
    } catch (cleanupErr) {
      A(`Warning: Failed to clean up temporary marketplace cache at ${cacheTargetPath}: ${Ce(cleanupErr)}`, {
        level: "warn"
      });
    }
    throw err;
  }
}

/** Adds a new marketplace source; checks policy, deduplication, and handles name conflicts */
async function FDe(source: any, progressCb: any) {
  let resolved = source;
  if (P5(source) && !_d.isAbsolute(source.path)) resolved = {
    ...source,
    path: _d.resolve(source.path)
  };
  if (!jA(resolved)) {
    if (QFt(resolved)) throw Error(`Marketplace source '${uTe(resolved)}' is blocked by enterprise policy.`);
    let allowedSources = OW() || [],
      githubExceptions = Npa(),
      sourceLabel = eeo(resolved),
      errMsg = `Marketplace source '${uTe(resolved)}'`;
    if (sourceLabel) errMsg += ` (${sourceLabel})`;
    if (errMsg += " is blocked by enterprise policy.", allowedSources.length > 0) errMsg += ` Allowed sources: ${allowedSources.map(s => uTe(s)).join(", ")}`;else errMsg += " No external marketplaces are allowed.";
    if (resolved.source === "github" && githubExceptions.length > 0) errMsg += `

Tip: The shorthand "${resolved.repo}" assumes github.com. For internal GitHub Enterprise, use the full URL:
  git@your-github-host.com:${resolved.repo}.git`;
    throw Error(errMsg);
  }
  let knownMarketplaces = await $m();
  for (let [existingName, entry] of Object.entries(knownMarketplaces)) if (J_(entry.source, resolved)) return A(`Source already materialized as '${existingName}', skipping clone`), {
    name: existingName,
    alreadyMaterialized: !0,
    resolvedSource: resolved
  };
  let {
      marketplace: newMarketplace,
      cachePath: resolvedCachePath
    } = await FEo(resolved, progressCb),
    nameValidationErr = DSr(newMarketplace.name, resolved);
  if (nameValidationErr) throw Error(nameValidationErr);
  let latestKnown = await $m(),
    existingEntry = latestKnown[newMarketplace.name];
  if (existingEntry) {
    let seedOwner = NDe(existingEntry.installLocation);
    if (seedOwner) throw Error(`Marketplace '${newMarketplace.name}' is seed-managed (${seedOwner}). To use a different source, ask your admin to update the seed, or use a different marketplace name.`);
    if (A(`Marketplace '${newMarketplace.name}' exists with different source \u2014 overwriting`), !P5(existingEntry.source)) {
      let cacheBase = _d.resolve(LDe()),
        oldInstall = _d.resolve(existingEntry.installLocation),
        newInstall = _d.resolve(resolvedCachePath);
      if (oldInstall === newInstall) ;else if (oldInstall === cacheBase || oldInstall.startsWith(cacheBase + _d.sep)) await Wt().rm(existingEntry.installLocation, {
        recursive: !0,
        force: !0
      });else A(`Skipping cleanup of old installLocation (${existingEntry.installLocation}) \u2014 ` + `outside ${cacheBase}. The path is corrupted; leaving it alone and overwriting the config entry.`, {
        level: "warn"
      });
    }
  }
  return latestKnown[newMarketplace.name] = {
    source: resolved,
    installLocation: resolvedCachePath,
    lastUpdated: new Date().toISOString()
  }, await one(latestKnown), A(`Added marketplace source: ${newMarketplace.name}`), {
    name: newMarketplace.name,
    alreadyMaterialized: !1,
    resolvedSource: resolved
  };
}

/** Removes a marketplace (and optionally its plugins) from one or all scopes */
async function bft(marketplaceId: string, scope: any) {
  let knownMarketplaces = await $m();
  if (!knownMarketplaces[marketplaceId]) throw Error(`Marketplace '${marketplaceId}' not found`);
  let entry = knownMarketplaces[marketplaceId],
    seedOwner = NDe(entry.installLocation),
    pluginDisableHint = y8r(marketplaceId) ? ` To stop using its plugins: claude plugin disable <plugin>@${marketplaceId}` : " To stop using its plugins, disable each one in /plugin.";
  if (seedOwner && scope === void 0) throw Error(`Marketplace '${marketplaceId}' is registered from the read-only seed directory (${seedOwner}) and will be re-registered on next startup.${pluginDisableHint}`);
  let keepStateLayer = !1;
  if (scope !== void 0) {
    if (!An(scope)?.extraKnownMarketplaces?.[marketplaceId]) {
      let hint = seedOwner ? `It is registered from the read-only seed directory.${pluginDisableHint}` : "Omit --scope to remove it from all scopes.";
      throw Error(`Marketplace '${marketplaceId}' is not declared in ${Fvn(scope)} settings. ${hint}`);
    }
    keepStateLayer = Boolean(seedOwner) || a2.some(s => s !== scope && An(s)?.extraKnownMarketplaces?.[marketplaceId]) || Boolean(An("policySettings")?.extraKnownMarketplaces?.[marketplaceId]);
  }
  if (!keepStateLayer) {
    delete knownMarketplaces[marketplaceId], await one(knownMarketplaces);
    let fs = Wt(),
      cacheDir = LDe(),
      marketplaceDir = _d.join(cacheDir, marketplaceId);
    await fs.rm(marketplaceDir, {
      recursive: !0,
      force: !0
    }), await fs.rm(`${marketplaceDir}.bak`, {
      recursive: !0,
      force: !0
    });
    let jsonFile = _d.join(cacheDir, `${marketplaceId}.json`);
    await fs.rm(jsonFile, {
      force: !0
    });
  }
  let removePlugins = !keepStateLayer;
  for (let scopeKey of a2) {
    let shouldRemoveDecl = scope === void 0 || scopeKey === scope;
    if (!shouldRemoveDecl && !removePlugins) continue;
    let scopeSettings = An(scopeKey);
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
      let saveResult = ao(scopeKey, updates);
      if (saveResult.error) A(`Failed to clean up marketplace '${marketplaceId}' from ${scopeKey} settings: ${saveResult.error.message}`, {
        level: "error"
      });else A(`Cleaned up marketplace '${marketplaceId}' from ${scopeKey} settings`);
    }
  }
  if (keepStateLayer) {
    A(`Removed marketplace '${marketplaceId}' declaration from ${scope}; still declared in another scope, keeping state layer and installed plugins`);
    return;
  }
  let {
    orphanedPaths: orphanedPaths,
    removedPluginIds: removedPluginIds
  } = scl(marketplaceId);
  for (let orphanPath of orphanedPaths) await PDe(orphanPath);
  for (let pluginId of removedPluginIds) await Ist(pluginId), await krt(pluginId);
  Gnt(removedPluginIds), A(`Removed marketplace source: ${marketplaceId}`);
}

/** Reads the marketplace.json from a directory (tries .claude-plugin/marketplace.json, then the path itself) */
async function $5t(dirOrFilePath: string) {
  let marketplaceJsonPath = _d.join(dirOrFilePath, ".claude-plugin", "marketplace.json");
  try {
    return await NEo(marketplaceJsonPath, GK());
  } catch (err) {
    if (err instanceof $U) throw err;
    let errCode = cn(err);
    if (errCode !== "ENOENT" && errCode !== "ENOTDIR") throw err;
  }
  return await NEo(dirOrFilePath, GK());
}

/** Returns the cached marketplace data for a given marketplace ID, or null */
async function d6(marketplaceId: string) {
  let fs = Wt(),
    filePath = FGn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      entry = qt(raw)[marketplaceId];
    if (!entry) return null;
    return await $5t(entry.installLocation);
  } catch (err) {
    if (In(err)) return null;
    return A(`Failed to read cached marketplace ${marketplaceId}: ${Ce(err)}`, {
      level: "warn"
    }), null;
  }
}

/** Looks up a plugin entry from the cached marketplace data for a given plugin specifier */
async function BEo(pluginSpecifier: string) {
  let {
    name: pluginName,
    marketplace: marketplaceId
  } = ts(pluginSpecifier);
  if (!pluginName || !marketplaceId) return null;
  let fs = Wt(),
    filePath = FGn();
  try {
    let raw = await fs.readFile(filePath, {
        encoding: "utf-8"
      }),
      entry = qt(raw)[marketplaceId];
    if (!entry) return null;
    let marketplaceData = await d6(marketplaceId);
    if (!marketplaceData) return null;
    let pluginEntry = marketplaceData.plugins.find(p => p.name === pluginName);
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
async function Z0(pluginSpecifier: string) {
  let cached = await BEo(pluginSpecifier);
  if (cached) return cached;
  let {
    name: pluginName,
    marketplace: marketplaceId
  } = ts(pluginSpecifier);
  if (!pluginName || !marketplaceId) return null;
  try {
    let marketplaceEntry = (await $m())[marketplaceId];
    if (!marketplaceEntry) return null;
    let pluginEntry = (await TL(marketplaceId)).plugins.find(p => p.name === pluginName);
    if (!pluginEntry) return null;
    return {
      entry: pluginEntry,
      marketplaceInstallLocation: marketplaceEntry.installLocation
    };
  } catch (err) {
    return A(`Could not find plugin ${pluginSpecifier}: ${Ce(err)}`, {
      level: "debug"
    }), null;
  }
}

/** Bulk-refreshes all non-seed, non-settings, non-policy-blocked marketplaces */
async function ncl() {
  let knownMarketplaces = await $m();
  for (let [marketplaceId, entry] of Object.entries(knownMarketplaces)) {
    if (NDe(entry.installLocation)) {
      A(`Skipping seed-managed marketplace '${marketplaceId}' in bulk refresh`);
      continue;
    }
    if (entry.source.source === "settings") continue;
    if (!jA(entry.source)) {
      A(`Skipping policy-blocked marketplace '${marketplaceId}' in bulk refresh`);
      continue;
    }
    let usedGcsFallback = !1;
    if (marketplaceId === mw) {
      if ((await U5t(entry.installLocation, LDe())) !== null) {
        He("plugin_official_marketplace_fetch"), knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString();
        continue;
      }
      if (!it("tengu_plugin_official_mkt_git_fallback", !0)) {
        xe("plugin_official_marketplace_fetch", "gcs_failed_fallback_disabled"), A("Skipping official marketplace bulk refresh: GCS failed, git fallback disabled");
        continue;
      }
      usedGcsFallback = !0;
    }
    try {
      let {
        cachePath: newCachePath
      } = await FEo(entry.source);
      if (knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), knownMarketplaces[marketplaceId].installLocation = newCachePath, usedGcsFallback) Pt("plugin_official_marketplace_fetch", "gcs_failed_git_fallback");
    } catch (err) {
      if (usedGcsFallback) xe("plugin_official_marketplace_fetch", "gcs_and_git_failed");
      A(`Failed to refresh marketplace ${marketplaceId}: ${Ce(err)}`, {
        level: "error"
      });
    }
  }
  await one(knownMarketplaces);
}

/** Deduplicates concurrent refresh requests for the same marketplace */
function sne(marketplaceId: string, progressCb: any, opts: any) {
  let key = `${marketplaceId}:${opts?.disableCredentialHelper ? 1 : 0}`,
    existing = NGn.get(key);
  if (existing) {
    if (progressCb) existing.listeners.push(progressCb);
    return existing.promise;
  }
  let listenerList: any[] = progressCb ? [progressCb] : [],
    refreshPromise = fzp(marketplaceId, msg => {
      for (let cb of listenerList) u6(cb, msg);
    }, opts).finally(() => NGn.delete(key));
  return NGn.set(key, {
    promise: refreshPromise,
    listeners: listenerList
  }), refreshPromise;
}

/** Core implementation: refreshes a single marketplace from its source */
async function fzp(marketplaceId: string, progressCb: any, opts: any) {
  let knownMarketplaces = await $m(),
    entry = knownMarketplaces[marketplaceId];
  if (!entry) throw Error(`Marketplace '${marketplaceId}' not found. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
  if (!jA(entry.source)) throw Error(`Marketplace source '${uTe(entry.source)}' is blocked by enterprise policy.`);
  if (opts?.skipIfRecent && entry.lastUpdated) {
    let ageMs = Date.now() - new Date(entry.lastUpdated).getTime();
    if (ageMs >= 0 && ageMs < 30000) {
      A(`Skipping refresh for marketplace '${marketplaceId}' \u2014 refreshed ${Math.round(ageMs / 1000)}s ago`);
      return;
    }
  }
  if (TL.cache?.delete?.(marketplaceId), entry.source.source === "settings") {
    A(`Skipping refresh for settings-sourced marketplace '${marketplaceId}' \u2014 no upstream`);
    return;
  }
  let usedGcsFallback = !1;
  try {
    let {
        installLocation: installLoc,
        source: src
      } = entry,
      seedOwner = NDe(installLoc);
    if (seedOwner) throw Error(`Marketplace '${marketplaceId}' is seed-managed (${seedOwner}) and its content is controlled by the seed image. To update: ask your admin to update the seed.`);
    if (!P5(src)) {
      let cacheBase = _d.resolve(LDe()),
        resolvedInstall = _d.resolve(installLoc);
      if (resolvedInstall !== cacheBase && !resolvedInstall.startsWith(cacheBase + _d.sep)) {
        let removeCmd = t_("plugin marketplace remove", marketplaceId);
        throw Error(`Marketplace '${marketplaceId}' has a corrupted installLocation (${installLoc}) \u2014 expected a path inside ${cacheBase}. This can happen after cross-platform path writes or manual edits to known_marketplaces.json. ${removeCmd ? `Run \`${removeCmd}\`` : "Remove the entry"} and re-add it.`);
      }
    }
    if (marketplaceId === mw) {
      if ((await U5t(installLoc, LDe())) !== null) {
        He("plugin_official_marketplace_fetch"), knownMarketplaces[marketplaceId] = {
          ...entry,
          lastUpdated: new Date().toISOString()
        }, await one(knownMarketplaces);
        return;
      }
      if (!it("tengu_plugin_official_mkt_git_fallback", !0)) throw xe("plugin_official_marketplace_fetch", "gcs_failed_fallback_disabled"), Error("Official marketplace GCS fetch failed and git fallback is disabled");
      usedGcsFallback = !0, A("Official marketplace GCS failed; falling back to git", {
        level: "warn"
      });
    }
    if (src.source === "github" || src.source === "git") {
      let pullOpts = {
        ...opts,
        skipLfs: src.skipLfs
      };
      if (src.source === "github") {
        let sshUrl = `git@github.com:${src.repo}.git`,
          httpsUrl = `https://github.com/${src.repo}.git`;
        if (Pwe()) await Zll(installLoc, httpsUrl), await Jce(httpsUrl, installLoc, src.ref, src.sparsePaths, progressCb, pullOpts);else {
          let sshConfigured = await ecl(),
            primaryUrl = sshConfigured ? sshUrl : httpsUrl,
            fallbackUrl = sshConfigured ? httpsUrl : sshUrl;
          try {
            await Jce(primaryUrl, installLoc, src.ref, src.sparsePaths, progressCb, pullOpts);
          } catch {
            A(`Marketplace refresh failed with ${sshConfigured ? "SSH" : "HTTPS"} for ${src.repo}, falling back to ${sshConfigured ? "HTTPS" : "SSH"}`, {
              level: "info"
            }), await Jce(fallbackUrl, installLoc, src.ref, src.sparsePaths, progressCb, pullOpts);
          }
        }
      } else await Jce(src.url, installLoc, src.ref, src.sparsePaths, progressCb, pullOpts);
      try {
        await $5t(installLoc);
      } catch {
        let repoLabel = src.source === "github" ? src.repo : w8e(src.url),
          deprecationNote = marketplaceId === "claude-code-plugins" ? `We've deprecated "claude-code-plugins" in favor of "claude-plugins-official".` : "This marketplace may have been deprecated or moved to a new location.",
          removeCmd = t_("plugin marketplace remove", marketplaceId);
        throw Error(`The marketplace.json file is no longer present in this repository.

${deprecationNote}
Source: ${repoLabel}` + (removeCmd ? `

You can remove this marketplace with: ${removeCmd}` : `

You can remove this marketplace from /plugin or by editing known_marketplaces.json.`));
      }
    } else if (src.source === "url") await tcl(src.url, installLoc, src.headers, progressCb);else if (P5(src)) u6(progressCb, "Validating local marketplace"), await $5t(installLoc);else throw Error("Unsupported marketplace source type for refresh");
    if (knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), await one(knownMarketplaces), usedGcsFallback) Pt("plugin_official_marketplace_fetch", "gcs_failed_git_fallback");
    A(`Successfully refreshed marketplace: ${marketplaceId}`);
  } catch (err) {
    if (usedGcsFallback) xe("plugin_official_marketplace_fetch", "gcs_and_git_failed");
    let errMsg = err instanceof Error ? err.message : String(err);
    throw A(`Failed to refresh marketplace ${marketplaceId}: ${errMsg}`, {
      level: "error"
    }), Error(`Failed to refresh marketplace '${marketplaceId}': ${errMsg}`);
  }
}

/** Sets the autoUpdate flag for a marketplace, validating that it's not managed by policy */
async function rcl(marketplaceId: string, autoUpdateValue: any) {
  let knownMarketplaces = await $m(),
    entry = knownMarketplaces[marketplaceId];
  if (!entry) throw Error(`Marketplace '${marketplaceId}' not found. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
  let seedOwner = NDe(entry.installLocation);
  if (seedOwner) throw Error(`Marketplace '${marketplaceId}' is seed-managed (${seedOwner}) and auto-update is always disabled for seed content. To update: ask your admin to update the seed.`);
  let managedBySettings = rzp(marketplaceId);
  if (managedBySettings !== null) throw Error(`Auto-update for '${marketplaceId}' is set by ${managedBySettings} and can't be changed here. Update that settings source (or ask your admin to) instead.`);
  if (entry.autoUpdate === autoUpdateValue) return;
  knownMarketplaces[marketplaceId] = {
    ...entry,
    autoUpdate: autoUpdateValue
  }, await one(knownMarketplaces);
  let declaredScope = ozp(marketplaceId);
  if (declaredScope) {
    let scopeEntry = An(declaredScope)?.extraKnownMarketplaces?.[marketplaceId];
    if (scopeEntry) q5t(marketplaceId, {
      source: scopeEntry.source,
      autoUpdate: autoUpdateValue
    }, declaredScope);
  }
  A(`Set autoUpdate=${autoUpdateValue} for marketplace: ${marketplaceId}`);
}

/** Syncs the autoUpdate flag from settings declarations into known_marketplaces.json */
async function ocl(existingConfig: any) {
  let declaredMarketplaces = l9();
  if (Object.keys(declaredMarketplaces).length === 0) return !1;
  let config: any;
  if (existingConfig) config = existingConfig;else try {
    config = await $m();
  } catch (err) {
    return A(`syncDeclaredAutoUpdateToJson: failed to load known_marketplaces.json: ${Ce(err)}`, {
      level: "error"
    }), !1;
  }
  let didChange = !1;
  for (let [marketplaceId, declared] of Object.entries(declaredMarketplaces)) {
    if (declared.autoUpdate === void 0) continue;
    let existing = config[marketplaceId];
    if (!existing || NDe(existing.installLocation)) continue;
    if (existing.autoUpdate === declared.autoUpdate) continue;
    config[marketplaceId] = {
      ...existing,
      autoUpdate: declared.autoUpdate
    }, didChange = !0, A(`Synced autoUpdate=${declared.autoUpdate} from settings for marketplace: ${marketplaceId}`);
  }
  if (didChange) await one(config);
  return didChange;
}
var Qll: any,
  _d: any,
  azp = 120000,
  TL: any,
  NGn: any;
var dS = b(() => {
  $X();
  toe();
  Wi();
  Qr();
  mn();
  jn();
  _k();
  Pv();
  qe();
  dn();
  Ct();
  Ii();
  ps();
  ia();
  wm();
  br();
  tn();
  eW();
  Gvn();
  c6();
  XOt();
  Z2e();
  rH();
  dTe();
  X2e();
  MEo();
  a1();
  oh();
  V4();
  II();
  bk();
  Qll = require("fs/promises"), _d = require("path");
  TL = Hn(async marketplaceId => {
    let knownMarketplaces = await $m(),
      entry = knownMarketplaces[marketplaceId];
    if (!entry) throw Error(`Marketplace '${marketplaceId}' not found in configuration. Available marketplaces: ${Object.keys(knownMarketplaces).join(", ")}`);
    if (P5(entry.source) && !_d.isAbsolute(entry.source.path)) {
      let removeCmd = t_("plugin marketplace remove", marketplaceId);
      throw Error(`Marketplace "${marketplaceId}" has a relative source path (${entry.source.path}) ` + "in known_marketplaces.json \u2014 this is stale state from an older " + `Claude Code version. ${removeCmd ? `Run \`${removeCmd}\` and re-add` : "Remove and re-add"} it from the original project directory.`);
    }
    try {
      return await $5t(entry.installLocation);
    } catch (err) {
      A(`Cache corrupted or missing for marketplace ${marketplaceId}, re-fetching from source: ${Ce(err)}`, {
        level: "warn"
      });
    }
    let refreshedData: any;
    try {
      ({
        marketplace: refreshedData
      } = await FEo(entry.source));
    } catch (err) {
      throw Error(`Failed to load marketplace "${marketplaceId}" from source (${entry.source.source}): ${Ce(err)}`);
    }
    return knownMarketplaces[marketplaceId].lastUpdated = new Date().toISOString(), await one(knownMarketplaces), refreshedData;
  });
  NGn = new Map();
});

export {FGn,LDe,MDe,l9,rzp,ozp,q5t,$m,tP,one,BGn,szp,izp,NDe,pTe,Zll,lzp,Jll,MGn,ecl,czp,Xll,uzp,u6,dzp,Jce,pzp,w8e,tcl,mzp,NEo,FEo,FDe,bft,$5t,d6,BEo,Z0,ncl,sne,fzp,rcl,ocl,Qll,_d,azp,TL,NGn,dS};
