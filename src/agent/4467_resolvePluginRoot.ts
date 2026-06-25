// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getOriginalCwd as gr,getInlinePlugins as QV,ZV,getInlinePluginUrls as kre,getSyncedPluginDirs as Ear,lt} from "../session/0132_sent.ts";
import {WP,NK,Tu} from "../../vendor/m649.ts";
import {hw,iae,a1} from "../config/2689_withFileTypes.ts";
import {ts,tb,EI,KZ,oh} from "../../vendor/m2600.ts";
import {Jo,cn,Ce,In,Z5o,Ta,mo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {BDe,z5t,rH} from "../config/4461_operation.ts";
import {Gu,Xl} from "../config/0651_maxBytes.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {OG,DGn,F5t,xDe,DDe} from "../config/4456_path.ts";
import {O5t,wll,kll,wEo,_ft} from "../../vendor/m4451.ts";
import {YGn,Qce} from "../config/4464_ref.ts";
import {WGn,GEo} from "../../vendor/m4461.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {execFileNoThrow as Fn,execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {gitExe as go,findCanonicalGitRoot as zm,ia} from "../../vendor/m698.ts";
import {jZ,nW,Pwe,Z2e} from "../config/2612_GIT_CONFIG_COUNT.ts";
import {RD,tW,XOt} from "../telemetry/2610_source.ts";
import {Q2e,Yvn} from "../../vendor/m2610.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {Vpe,Xon,PSr,tsn,P5,bk} from "./0731_level.ts";
import {DNi,LNi,Whe} from "../../vendor/m2607.ts";
import {Wvn,slowOpTracer as pw} from "../telemetry/2606_skill_name.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {getSettings_DEPRECATED as $o,getSettingsForSource as An,br} from "../config/0745_updateSettingsForSource.ts";
import {Y2e,Gvn} from "../../vendor/m2606.ts";
import {V2e,b8r,Bnt} from "../../vendor/m2596.ts";
import {tP,d6,BEo,dS} from "../config/4460_source.ts";
import {OW,HPn,jA,QFt,II} from "../../vendor/m3268.ts";
import {uTe,dTe} from "../../vendor/m4457.ts";
import {mi,Sn,lr} from "../../vendor/m233.ts";
import {Xce,Y5t} from "../../vendor/m4462.ts";
import {getProxyFetchOptions as nT,ey} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {Upa,Bpa,teo} from "../../vendor/m3269.ts";
import {Z8,BOt} from "../../vendor/m2595.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {fI,k8} from "../../vendor/m2238.ts";
import {Ovn,C8r} from "../../vendor/m2597.ts";
import {QYt,C_,r6o,n6o,lk} from "../../vendor/m125.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Ir} from "../../vendor/m584.ts";
import {D$r} from "../../vendor/m2218.ts";
import {h3,JN} from "../artifact/0736_allow.ts";
import {Acl,Ccl} from "./4465_Acl.ts";
import {jEo} from "../../vendor/m4465.ts";
import {ve} from "../../vendor/m461.ts";
import {Ne} from "../../vendor/m583.ts";
// @ts-nocheck
/**
 * Plugin resolution, caching, installation and loading for Claude Code.
 *
 * This module is the plugin subsystem: it resolves plugin roots, computes the
 * various on-disk cache paths (legacy, versioned, versioned-zip), installs
 * plugins from npm / GitHub / git URLs / git sub-directories, copies plugin
 * source trees into a versioned cache (with symlink-containment handling),
 * parses + validates plugin manifests, builds the in-memory plugin object from
 * a directory (commands / agents / skills / output-styles / themes / workflows
 * / hooks / monitors / settings), and finally assembles the full set of enabled
 * and disabled plugins from marketplaces, session `--plugin-dir`/`--plugin-url`
 * sources and skills-as-plugins.
 *
 * Structure is 1:1 with the shipped bundle; only local identifiers have been
 * renamed and type/comment annotations added.
 */
var Gcl = {};
ft(Gcl, {
  resolvePluginRoot: () => resolvePluginRoot,
  resolvePluginPath: () => resolvePluginPath,
  resolveContainedPluginPath: () => resolveContainedPluginPath,
  probeSeedCacheAnyVersion: () => probeSeedCacheAnyVersion,
  mergePluginSources: () => mergePluginSources,
  loadSkillsAsPlugins: () => loadSkillsAsPlugins,
  loadPluginManifest: () => loadPluginManifest,
  loadAllPluginsForPreview: () => loadAllPluginsForPreview,
  loadAllPluginsCacheOnly: () => loadAllPluginsCacheOnly,
  loadAllPlugins: () => loadAllPlugins,
  installFromNpm: () => installFromNpm,
  installFromGitSubdir: () => installFromGitSubdir,
  gitClone: () => gitClone,
  getVersionedZipCachePath: () => getVersionedZipCachePath,
  getVersionedCachePathIn: () => getVersionedCachePathIn,
  getVersionedCachePath: () => getVersionedCachePath,
  getPluginCachePath: () => getPluginCachePath,
  getLegacyCachePath: () => getLegacyCachePath,
  getEnabledPluginBinPaths: () => getEnabledPluginBinPaths,
  generateTemporaryCacheNameForPlugin: () => generateTemporaryCacheNameForPlugin,
  displaySkillsDirPath: () => displaySkillsDirPath,
  createPluginFromPath: () => createPluginFromPath,
  copyPluginToVersionedCache: () => copyPluginToVersionedCache,
  copyDir: () => copyDir,
  clearPluginCache: () => clearPluginCache,
  cachePluginSettings: () => cachePluginSettings,
  cachePlugin: () => cachePlugin,
  cacheMatchesDeclaredPaths: () => cacheMatchesDeclaredPaths,
  cacheDirHasPluginContent: () => cacheDirHasPluginContent
});
/** Render a skills directory path for display, relativizing project-scope paths. */
function displaySkillsDirPath(skillEntry) {
  if (skillEntry.scope === "project") {
    let projectSkillsDir = ms.join(gr(), ".claude", "skills");
    if (skillEntry.path.startsWith(projectSkillsDir + ms.sep)) return "." + ms.sep + ms.relative(gr(), skillEntry.path);
  }
  return WP(skillEntry.path);
}
/** Root directory that holds all plugin caches. */
function getPluginCachePath() {
  return ms.join(hw(), "cache");
}
/** Build the versioned cache path under `baseDir` for a plugin source + version. */
function getVersionedCachePathIn(baseDir, pluginSource, version) {
  let {
      name: pluginName,
      marketplace: marketplaceName
    } = ts(pluginSource),
    safeMarketplace = (marketplaceName || "unknown").replace(/[^a-zA-Z0-9\-_]/g, "-"),
    safeName = (pluginName || pluginSource).replace(/[^a-zA-Z0-9\-_]/g, "-"),
    safeVersion = version.replace(/[^a-zA-Z0-9\-_.]/g, "-");
  if (safeVersion === "." || safeVersion === "..") safeVersion = "-";
  return ms.join(baseDir, "cache", safeMarketplace, safeName, safeVersion);
}
/** Versioned cache path under the active cache root. */
function getVersionedCachePath(pluginSource, version) {
  return getVersionedCachePathIn(hw(), pluginSource, version);
}
/** Whether the cache dir at `dir` contains any real plugin content (ignores housekeeping entries). */
async function cacheDirHasPluginContent(dir) {
  let entries;
  try {
    entries = await zu.readdir(dir);
  } catch (err) {
    if (Jo(err)) return !1;
    throw err;
  }
  return entries.some(name => !Ezp.has(name));
}
/**
 * Check that a cache directory still contains every component path declared in
 * the manifest entry; if any declared path is missing/wrong-type, the cache is
 * treated as stale.
 */
async function cacheMatchesDeclaredPaths(cacheDir, entry, pluginSource) {
  if (!entry) return !0;
  let declaredPaths = [];
  function collect(value, mustBeDirectory) {
    if (!value) return;
    for (let item of Array.isArray(value) ? value : [value]) if (typeof item === "string") declaredPaths.push({
      relPath: item,
      mustBeDirectory
    });
  }
  if (collect(entry.agents, !1), collect(entry.skills, !0), typeof entry.commands === "string" || Array.isArray(entry.commands)) collect(entry.commands, !1);else if (entry.commands && typeof entry.commands === "object") {
    for (let commandEntry of Object.values(entry.commands)) if (commandEntry && typeof commandEntry === "object" && commandEntry.source) declaredPaths.push({
      relPath: commandEntry.source,
      mustBeDirectory: !1
    });
  }
  if (declaredPaths.length === 0) return !0;
  let missing = (await Promise.all(declaredPaths.map(async ({
    relPath,
    mustBeDirectory
  }) => {
    let fullPath = resolveContainedPluginPath(cacheDir, relPath);
    if (fullPath === null) return {
      relPath,
      ok: !0
    };
    try {
      let stats = await zu.stat(fullPath);
      return {
        relPath,
        ok: mustBeDirectory ? stats.isDirectory() : !0
      };
    } catch {
      return {
        relPath,
        ok: !1
      };
    }
  }))).filter(result => !result.ok).map(result => result.relPath);
  if (missing.length > 0) return A(`Cache at ${cacheDir} for ${pluginSource} is missing entry-declared component paths (${missing.join(", ")}); treating as stale`), !1;
  return !0;
}
/** Best-effort removal of the `.orphaned_at` marker so a reused cache is no longer flagged orphaned. */
async function YEo(cacheDir) {
  await zu.rm(ms.join(cacheDir, ".orphaned_at"), {
    force: !0
  }).catch(() => {});
}
/** From candidate install records, pick the first whose install path actually has content. */
async function Azp(records) {
  let valid = records?.filter(BDe);
  if (!valid || valid.length === 0) return;
  if (valid.length === 1) return valid[0];
  for (let record of valid) {
    let installPath = record.installPath;
    if (!installPath) continue;
    if (installPath.endsWith(".zip") ? await Gu(installPath) : await cacheDirHasPluginContent(installPath)) return record;
  }
  return valid[0];
}
/** Versioned cache path with a `.zip` suffix. */
function getVersionedZipCachePath(pluginSource, version) {
  return `${getVersionedCachePath(pluginSource, version)}.zip`;
}
/** Scan all seed cache roots for a non-empty versioned cache directory. */
async function JEo(pluginSource, version) {
  for (let seedRoot of iae()) {
    let candidate = getVersionedCachePathIn(seedRoot, pluginSource, version);
    try {
      if ((await zu.readdir(candidate)).length > 0) return candidate;
    } catch {}
  }
  return null;
}
/** Find a seed cache for a plugin where exactly one version directory exists, regardless of version. */
async function probeSeedCacheAnyVersion(pluginSource) {
  for (let seedRoot of iae()) {
    let versionsDir = ms.dirname(getVersionedCachePathIn(seedRoot, pluginSource, "_"));
    try {
      let versionDirs = await zu.readdir(versionsDir);
      if (versionDirs.length !== 1) continue;
      let onlyVersionDir = ms.join(versionsDir, versionDirs[0]);
      if ((await zu.readdir(onlyVersionDir)).length > 0) return onlyVersionDir;
    } catch {}
  }
  return null;
}
/** Legacy (unversioned) cache path for a plugin name. */
function getLegacyCachePath(pluginName) {
  let cacheRoot = getPluginCachePath();
  return ms.join(cacheRoot, pluginName.replace(/[^a-zA-Z0-9\-_]/g, "-"));
}
/** Resolve the on-disk path for a plugin, preferring the versioned cache then the legacy cache. */
async function resolvePluginPath(pluginSource, version) {
  if (version) {
    let versionedPath = getVersionedCachePath(pluginSource, version);
    if (await Gu(versionedPath)) return versionedPath;
  }
  let pluginName = ts(pluginSource).name || pluginSource,
    legacyPath = getLegacyCachePath(pluginName);
  if (await Gu(legacyPath)) return legacyPath;
  return version ? getVersionedCachePath(pluginSource, version) : legacyPath;
}
/** Whether `childPath` is equal to or contained within `parentPath`. */
function JGn(childPath, parentPath) {
  if (childPath === parentPath) return !0;
  let parentWithSep = parentPath.endsWith(ms.sep) ? parentPath : parentPath + ms.sep;
  return childPath.startsWith(parentWithSep);
}
/**
 * Recursively copy a directory tree, handling symlinks with containment rules:
 * links pointing inside the copy root are re-pointed at the copied location,
 * links into the original source root are materialized, and links escaping the
 * containment root are skipped.
 */
async function copyDir(srcDir, destDir, copyRootSrc = srcDir, copyRootDest = destDir, containmentRoot = copyRootSrc, visited = new Set()) {
  await Wt().mkdir(destDir);
  let resolvedSrc = ms.resolve(srcDir),
    resolvedDest = ms.resolve(destDir),
    selfNestedName = resolvedDest.startsWith(resolvedSrc + ms.sep) ? ms.relative(resolvedSrc, resolvedDest).split(ms.sep)[0] : void 0,
    dirEntries = await zu.readdir(srcDir, {
      withFileTypes: !0
    });
  for (let entry of dirEntries) {
    if (selfNestedName !== void 0 && entry.name === selfNestedName) continue;
    let srcEntryPath = ms.join(srcDir, entry.name),
      destEntryPath = ms.join(destDir, entry.name);
    if (entry.isDirectory()) await copyDir(srcEntryPath, destEntryPath, copyRootSrc, copyRootDest, containmentRoot, visited);else if (entry.isFile()) await zu.copyFile(srcEntryPath, destEntryPath);else if (entry.isSymbolicLink()) {
      let linkTarget;
      try {
        linkTarget = await zu.readlink(srcEntryPath);
      } catch (readlinkErr) {
        if (cn(readlinkErr) !== "EINVAL") A(`copyDir: readlink failed for ${srcEntryPath}: ${Ce(readlinkErr)}`, {
          level: "warn"
        });
        continue;
      }
      let realTarget;
      try {
        realTarget = await zu.realpath(srcEntryPath);
      } catch {
        if (!ms.isAbsolute(linkTarget)) {
          let resolvedLinkTarget = ms.resolve(ms.dirname(srcEntryPath), linkTarget);
          if (JGn(resolvedLinkTarget, ms.resolve(copyRootSrc))) {
            await zu.symlink(linkTarget, destEntryPath);
            continue;
          }
        }
        A(`copyDir: skipping broken symlink ${srcEntryPath} -> ${linkTarget}`);
        continue;
      }
      let realCopyRootSrc;
      try {
        realCopyRootSrc = await zu.realpath(copyRootSrc);
      } catch {
        realCopyRootSrc = copyRootSrc;
      }
      let realContainmentRoot;
      try {
        realContainmentRoot = await zu.realpath(containmentRoot);
      } catch {
        realContainmentRoot = containmentRoot;
      }
      if (JGn(realTarget, realCopyRootSrc)) {
        let relFromRoot = ms.relative(realCopyRootSrc, realTarget),
          destTarget = ms.join(copyRootDest, relFromRoot),
          relLink = ms.relative(ms.dirname(destEntryPath), destTarget);
        await zu.symlink(relLink, destEntryPath);
      } else if (JGn(realTarget, realContainmentRoot) && !JGn(realCopyRootSrc, realTarget)) {
        if (visited.has(realTarget)) {
          A(`copyDir: skipping cyclic symlink target ${srcEntryPath} -> ${realTarget}`);
          continue;
        }
        let targetStats = await zu.stat(realTarget).catch(statErr => {
          A(`copyDir: stat failed while materializing ${srcEntryPath} -> ${realTarget}: ${Ce(statErr)}`, {
            level: "warn"
          });
          return;
        });
        if (!targetStats) continue;
        if (targetStats.isFile()) await zu.copyFile(realTarget, destEntryPath);else if (targetStats.isDirectory()) {
          visited.add(realTarget);
          try {
            await copyDir(realTarget, destEntryPath, realTarget, destEntryPath, containmentRoot, visited);
          } finally {
            visited.delete(realTarget);
          }
        } else A(`copyDir: skipping non-regular symlink target ${srcEntryPath} -> ${realTarget}`);
      } else A(`copyDir: skipping symlink escaping containment root: ${srcEntryPath} -> ${realTarget}`);
    }
  }
}
/**
 * Copy a plugin into the versioned cache (as a directory, or zip when zip-mode
 * is enabled). Reuses an existing cache when present, defers overwrite if the
 * cache is in use by another session, prefers a seed cache, installs deps, and
 * strips the `.git` directory.
 */
async function copyPluginToVersionedCache(pluginDir, pluginSource, version, entry, containmentRoot, options) {
  let zipMode = OG(),
    forceOverwrite = options?.forceOverwrite ?? !1,
    versionedDir = getVersionedCachePath(pluginSource, version),
    versionedZip = getVersionedZipCachePath(pluginSource, version);
  if (zipMode) {
    if (await Gu(versionedZip)) {
      if (!forceOverwrite) return A(`Plugin ${pluginSource} version ${version} already cached at ${versionedZip}`), versionedZip;
      await zu.rm(versionedZip, {
        force: !0
      });
    }
  } else if (await Gu(versionedDir)) {
    let hasContent = await cacheDirHasPluginContent(versionedDir);
    if (!forceOverwrite && hasContent) return await YEo(versionedDir), A(`Plugin ${pluginSource} version ${version} already cached at ${versionedDir}`), versionedDir;
    if (hasContent) {
      let inUse = !1;
      try {
        inUse = await O5t(versionedDir, {
          excludeSelf: !0
        });
      } catch {
        inUse = !0;
      }
      if (inUse) return A(`Cache for ${pluginSource} at ${versionedDir} is in use by another session; deferring overwrite until it exits`), versionedDir;
    }
    A(`Removing ${hasContent ? "superseded" : "incomplete"} cache directory for ${pluginSource} at ${versionedDir}`), await zu.rm(versionedDir, {
      recursive: !0,
      force: !0
    });
  }
  let seedDir = await JEo(pluginSource, version);
  if (seedDir) return A(`Using seed cache for ${pluginSource}@${version} at ${seedDir}`), seedDir;
  if (await Wt().mkdir(ms.dirname(versionedDir)), entry && typeof entry.source === "string" && containmentRoot) {
    let sourceDir = YGn(containmentRoot, entry.source);
    A(`Copying source directory ${entry.source} for plugin ${pluginSource}`);
    try {
      await copyDir(sourceDir, versionedDir, sourceDir, versionedDir, containmentRoot);
    } catch (copyErr) {
      if (In(copyErr) && Z5o(copyErr) === sourceDir) throw Error(`Plugin source directory not found: ${sourceDir} (from entry.source: ${entry.source})`);
      throw copyErr;
    }
  } else A(`Copying plugin ${pluginSource} to versioned cache (fallback to full copy)`), await copyDir(pluginDir, versionedDir);
  let gitDir = ms.join(versionedDir, ".git");
  if (await zu.rm(gitDir, {
    recursive: !0,
    force: !0
  }), (await zu.readdir(versionedDir)).length === 0) throw Error(`Failed to copy plugin ${pluginSource} to versioned cache: destination is empty after copy`);
  let depInstall = await WGn(versionedDir);
  if (depInstall.error) A(`Plugin dependency install warning for ${pluginSource}: ${depInstall.error}`, {
    level: "warn"
  });
  if (zipMode) return await DGn(versionedDir, versionedZip), A(`Successfully cached plugin ${pluginSource} as ZIP at ${versionedZip}`), versionedZip;
  return A(`Successfully cached plugin ${pluginSource} at ${versionedDir}`), versionedDir;
}
/** Validate a git URL (HTTPS/HTTP/file/SSH); throws on unsupported protocols. */
function Pcl(url) {
  try {
    let parsed = new URL(url);
    if (!["https:", "http:", "file:"].includes(parsed.protocol)) {
      if (!/^git@[a-zA-Z0-9.-]+:/.test(url)) throw Error(`Invalid git URL protocol: ${parsed.protocol}. Only HTTPS, HTTP, file:// and SSH (git@) URLs are supported.`);
    }
    return url;
  } catch {
    if (/^git@[a-zA-Z0-9.-]+:/.test(url)) return url;
    throw Error(`Invalid git URL: ${url}`);
  }
}
/** Install an npm package into the npm cache (skipping when the pinned version is already present) and copy it to `destDir`. */
async function installFromNpm(packageName, destDir, options = {}) {
  let npmCacheDir = ms.join(hw(), "npm-cache");
  await Wt().mkdir(npmCacheDir);
  let packageSpec = `${packageName}@${options.version ?? "latest"}`,
    packageDir = ms.join(npmCacheDir, "node_modules", packageName),
    cachedVersion;
  try {
    let pkg = qt(await zu.readFile(ms.join(packageDir, "package.json"), "utf8"));
    if (typeof pkg.version === "string") cachedVersion = pkg.version;
  } catch {}
  if (!(options.version && options.version === cachedVersion)) {
    A(`Installing npm package ${packageSpec} to cache`);
    let npmArgs = ["install", packageSpec, "--prefix", npmCacheDir, "--no-fund", "--no-audit", "--no-progress", "--loglevel=error"];
    if (options.registry) npmArgs.push("--registry", options.registry);
    let installResult = await Fn("npm", npmArgs, {
      useCwd: !1
    });
    if (installResult.code !== 0) throw Error(`Failed to install npm package: ${installResult.stderr}`);
  } else A(`npm cache hit for ${packageName}@${cachedVersion} (pinned, matches requested)`);
  await copyDir(packageDir, destDir), A(`Copied npm package ${packageName} from cache to ${destDir}`);
}
/** Verify a cloned repo's HEAD matches a pinned SHA; throws if it diverges. */
async function Lcl(repoDir, expectedSha, env) {
  let revParse = await Wr(go(), ["rev-parse", "HEAD"], {
      cwd: repoDir,
      env,
      stdin: "ignore"
    }),
    actualSha = revParse.stdout.trim();
  if (revParse.code !== 0 || actualSha.toLowerCase() !== expectedSha.toLowerCase()) {
    if (revParse.stderr) A(`plugin SHA pin rev-parse stderr: ${revParse.stderr}`);
    throw new Ta(`SHA pin verification failed: expected HEAD to be ${expectedSha}, got ${actualSha || "(rev-parse failed)"}. The pinned commit may have been removed upstream, or a ref with the same name exists. Refusing to install.`, "plugin SHA pin verification failed");
  }
}
/** Shallow-clone a git repository to `destDir`, optionally checking out a ref or pinned SHA. */
async function gitClone(url, destDir, ref, sha) {
  if (sha?.startsWith("-")) throw Error(`Invalid sha "${sha}": cannot start with "-"`);
  if (ref?.startsWith("-")) throw Error(`Invalid ref "${ref}": cannot start with "-"`);
  let cloneArgs = [...jZ, "clone", "--depth", "1", "--recurse-submodules", "--shallow-submodules"];
  if (ref && !sha) cloneArgs.push("--branch", ref);
  if (sha) cloneArgs.push("--no-checkout");
  cloneArgs.push("--", url, destDir);
  let env = nW(),
    startTime = performance.now(),
    cloneResult = await Fn(go(), cloneArgs, {
      useCwd: !0,
      env,
      stdin: "ignore"
    });
  if (cloneResult.code !== 0) throw RD("plugin_clone", url, "failure", performance.now() - startTime, tW(cloneResult.stderr)), Error(`Failed to clone repository: ${cloneResult.stderr}`);
  if (sha) {
    if ((await Wr(go(), [...jZ, "fetch", "--depth", "1", "origin", sha], {
      cwd: destDir,
      env,
      stdin: "ignore"
    })).code !== 0) {
      A(`Shallow fetch of SHA ${sha} failed, falling back to unshallow fetch`);
      let unshallowResult = await Wr(go(), [...jZ, "fetch", "--unshallow", ...(ref ? ["origin", ref] : [])], {
        cwd: destDir,
        env,
        stdin: "ignore"
      });
      if (unshallowResult.code !== 0) throw RD("plugin_clone", url, "failure", performance.now() - startTime, tW(unshallowResult.stderr)), Error(`Failed to fetch commit ${sha}: ${unshallowResult.stderr}`);
    }
    let checkoutResult = await Wr(go(), ["checkout", sha], {
      cwd: destDir,
      env,
      stdin: "ignore"
    });
    if (checkoutResult.code !== 0) throw RD("plugin_clone", url, "failure", performance.now() - startTime, tW(checkoutResult.stderr)), Error(`Failed to checkout commit ${sha}: ${checkoutResult.stderr}`);
    try {
      await Lcl(destDir, sha, env);
    } catch (verifyErr) {
      throw RD("plugin_clone", url, "failure", performance.now() - startTime, "sha_pin_mismatch"), verifyErr;
    }
  }
  RD("plugin_clone", url, "success", performance.now() - startTime);
}
/** Validate a git URL and clone it, logging the resolved url/ref. */
async function Ncl(url, destDir, ref, sha) {
  let validatedUrl = Pcl(url);
  await gitClone(validatedUrl, destDir, ref, sha);
  let refSuffix = ref ? ` (ref: ${ref})` : "";
  A(`Cloned repository from ${validatedUrl}${refSuffix} to ${destDir}`);
}
/** Clone a GitHub `owner/repo` (HTTPS or SSH depending on auth). */
async function vzp(repo, destDir, ref, sha) {
  if (!/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(repo)) throw Error(`Invalid GitHub repository format: ${repo}. Expected format: owner/repo`);
  let url = Pwe() ? `https://github.com/${repo}.git` : `git@github.com:${repo}.git`;
  return Ncl(url, destDir, ref, sha);
}
/** Resolve a clone URL: GitHub `owner/repo` shorthand or a validated git URL. */
function wzp(urlOrRepo) {
  if (/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(urlOrRepo)) return Pwe() ? `https://github.com/${urlOrRepo}.git` : `git@github.com:${urlOrRepo}.git`;
  return Pcl(urlOrRepo);
}
/** Install a plugin from a sub-directory of a git repo using sparse-checkout cone mode. */
async function installFromGitSubdir(urlOrRepo, destDir, subdir, ref, sha) {
  if (!(await Q2e())) throw Error("git-subdir plugin source requires git to be installed and on PATH. Install git (version 2.25 or later for sparse-checkout cone mode) and try again.");
  if (sha?.startsWith("-")) throw Error(`Invalid sha "${sha}": cannot start with "-"`);
  if (ref?.startsWith("-")) throw Error(`Invalid ref "${ref}": cannot start with "-"`);
  let url = wzp(urlOrRepo),
    cloneDir = `${destDir}.clone`,
    cloneArgs = [...jZ, "clone", "--depth", "1", "--filter=tree:0", "--no-checkout"];
  if (ref && !sha) cloneArgs.push("--branch", ref);
  cloneArgs.push("--", url, cloneDir);
  let env = nW(),
    cloneResult = await Fn(go(), cloneArgs, {
      useCwd: !0,
      env,
      stdin: "ignore"
    });
  if (cloneResult.code !== 0) throw Error(`Failed to clone repository for git-subdir source: ${cloneResult.stderr}`);
  try {
    let sparseResult = await Wr(go(), ["sparse-checkout", "set", "--cone", "--", subdir], {
      cwd: cloneDir,
      env,
      stdin: "ignore"
    });
    if (sparseResult.code !== 0) throw Error(`git sparse-checkout set failed (git >= 2.25 required for cone mode): ${sparseResult.stderr}`);
    let resolvedSha;
    if (sha) {
      if ((await Wr(go(), [...jZ, "fetch", "--depth", "1", "origin", sha], {
        cwd: cloneDir,
        env,
        stdin: "ignore"
      })).code !== 0) {
        A(`Shallow fetch of SHA ${sha} failed for git-subdir, falling back to unshallow fetch`);
        let unshallowResult = await Wr(go(), [...jZ, "fetch", "--unshallow", ...(ref ? ["origin", ref] : [])], {
          cwd: cloneDir,
          env,
          stdin: "ignore"
        });
        if (unshallowResult.code !== 0) throw Error(`Failed to fetch commit ${sha}: ${unshallowResult.stderr}`);
      }
      let checkoutResult = await Wr(go(), [...jZ, "checkout", sha], {
        cwd: cloneDir,
        env,
        stdin: "ignore"
      });
      if (checkoutResult.code !== 0) throw Error(`Failed to checkout commit ${sha}: ${checkoutResult.stderr}`);
      await Lcl(cloneDir, sha, env), resolvedSha = sha;
    } else {
      let [checkoutResult, revParseResult] = await Promise.all([Wr(go(), [...jZ, "checkout", "HEAD"], {
        cwd: cloneDir,
        env,
        stdin: "ignore"
      }), Wr(go(), ["rev-parse", "HEAD"], {
        cwd: cloneDir,
        env,
        stdin: "ignore"
      })]);
      if (checkoutResult.code !== 0) throw Error(`git checkout after sparse-checkout failed: ${checkoutResult.stderr}`);
      if (revParseResult.code === 0) resolvedSha = revParseResult.stdout.trim();
    }
    let subdirPath = YGn(cloneDir, subdir);
    try {
      await zu.rename(subdirPath, destDir);
    } catch (renameErr) {
      if (In(renameErr)) throw Error(`Subdirectory '${subdir}' not found in repository ${url}${ref ? ` (ref: ${ref})` : ""}. Check that the path is correct and exists at the specified ref/sha.`);
      throw renameErr;
    }
    let refSuffix = ref ? ` ref=${ref}` : "",
      shaSuffix = resolvedSha ? ` sha=${resolvedSha}` : "";
    return A(`Extracted subdir ${subdir} from ${url}${refSuffix}${shaSuffix} to ${destDir}`), resolvedSha;
  } finally {
    await zu.rm(cloneDir, {
      recursive: !0,
      force: !0
    });
  }
}
/** Copy a local plugin directory to `destDir` and strip its `.git`. */
async function kzp(srcDir, destDir, containmentRoot) {
  if (!(await Gu(srcDir))) throw Error(`Source path does not exist: ${srcDir}`);
  if (containmentRoot) await copyDir(srcDir, destDir, srcDir, destDir, containmentRoot);else await copyDir(srcDir, destDir);
  let gitDir = ms.join(destDir, ".git");
  await zu.rm(gitDir, {
    recursive: !0,
    force: !0
  });
}
/** Generate a unique temporary cache directory name for an in-progress plugin install. */
function generateTemporaryCacheNameForPlugin(source) {
  let timestamp = Date.now(),
    randomSuffix = Math.random().toString(36).substring(2, 8),
    sourceKind;
  if (typeof source === "string") sourceKind = "local";else switch (source.source) {
    case "npm":
      sourceKind = "npm";
      break;
    case "github":
      sourceKind = "github";
      break;
    case "url":
      sourceKind = "git";
      break;
    case "git-subdir":
      sourceKind = "subdir";
      break;
    default:
      sourceKind = "unknown";
  }
  return `temp_${sourceKind}_${timestamp}_${randomSuffix}`;
}
/** Install a plugin from any source into a temp dir, load its manifest, and clean up on failure. */
async function cachePlugin(source, options) {
  let cacheRoot = getPluginCachePath();
  await Wt().mkdir(cacheRoot);
  let tempName = generateTemporaryCacheNameForPlugin(source),
    tempDir = ms.join(cacheRoot, tempName),
    started = !1,
    gitCommitSha;
  try {
    if (A(`Caching plugin from source: ${Pe(source)} to temporary path ${tempDir}`), started = !0, typeof source === "string") await kzp(source, tempDir, options?.containmentRoot);else switch (source.source) {
      case "npm":
        await installFromNpm(source.package, tempDir, {
          registry: source.registry,
          version: source.version
        });
        break;
      case "github":
        await vzp(source.repo, tempDir, source.ref, source.sha);
        break;
      case "url":
        await Ncl(source.url, tempDir, source.ref, source.sha);
        break;
      case "git-subdir":
        gitCommitSha = await installFromGitSubdir(source.url, tempDir, source.path, source.ref, source.sha);
        break;
      default:
        throw Error("This plugin uses a source type your Claude Code version does not support. Update Claude Code and try again.");
    }
  } catch (installErr) {
    if (started && (await Gu(tempDir))) {
      A(`Cleaning up failed installation at ${tempDir}`);
      try {
        await zu.rm(tempDir, {
          recursive: !0,
          force: !0
        });
      } catch (cleanupErr) {
        A(`Failed to clean up installation: ${cleanupErr}`, {
          level: "error"
        });
      }
    }
    throw installErr;
  }
  let sourceLabel = typeof source === "string" ? source : source.source,
    {
      manifest,
      manifestPath,
      depConstraints
    } = await loadPluginManifest(tempDir, tempName, sourceLabel, [ms.join(tempDir, "plugin.json")]),
    resolvedManifest = manifestPath !== null ? manifest : options?.manifest || {
      name: tempName,
      description: `Plugin cached from ${sourceLabel}`
    };
  return A(`Successfully cached plugin ${resolvedManifest.name} to ${tempDir}`), {
    path: tempDir,
    manifest: resolvedManifest,
    ...(gitCommitSha && {
      gitCommitSha
    }),
    ...(depConstraints && {
      depConstraints
    })
  };
}
/**
 * Load and validate a plugin manifest, searching `.claude-plugin/plugin.json`
 * plus any extra candidate paths; returns a synthetic manifest if none found.
 */
async function loadPluginManifest(pluginDir, pluginName, sourceLabel, extraPaths = []) {
  let candidates = [ms.join(pluginDir, ".claude-plugin", "plugin.json"), ...extraPaths];
  for (let candidate of candidates) {
    let raw;
    try {
      raw = await zu.readFile(candidate, {
        encoding: "utf-8"
      });
    } catch (readErr) {
      if (In(readErr) || cn(readErr) === "ENOTDIR") continue;
      let readErrMsg = Ce(readErr);
      throw xe("plugin_load_manifest", "plugin_load_manifest_read_failed"), A(`Plugin ${pluginName}: failed to read manifest file at ${candidate}. Read error: ${readErrMsg}`, {
        level: "error"
      }), Error(`Plugin ${pluginName}: failed to read manifest file at ${candidate}.

Read error: ${readErrMsg}`);
    }
    let parsed;
    try {
      parsed = qt(raw);
    } catch (parseErr) {
      let parseErrMsg = Ce(parseErr);
      throw xe("plugin_load_manifest", "plugin_load_manifest_json_invalid"), A(`Plugin ${pluginName} has a corrupt manifest file at ${candidate}. Parse error: ${parseErrMsg}`, {
        level: "error"
      }), Error(`Plugin ${pluginName} has a corrupt manifest file at ${candidate}.

JSON parse error: ${parseErrMsg}`);
    }
    let validation = Vpe().safeParse(parsed);
    if (validation.success) {
      let validatedManifest = validation.data,
        rawManifest = parsed;
      return He("plugin_load_manifest"), {
        manifest: validatedManifest,
        manifestPath: candidate,
        depConstraints: DNi(rawManifest)
      };
    }
    let issuesMsg = validation.error.issues.map(issue => issue.path.length > 0 ? `${issue.path.join(".")}: ${issue.message}` : issue.message).join(", ");
    throw xe("plugin_load_manifest", "plugin_load_manifest_schema_invalid"), A(`Plugin ${pluginName} has an invalid manifest file at ${candidate}. Validation errors: ${issuesMsg}`, {
      level: "error"
    }), Error(`Plugin ${pluginName} has an invalid manifest file at ${candidate}.

Validation errors: ${issuesMsg}`);
  }
  return He("plugin_load_manifest"), {
    manifest: {
      name: pluginName,
      description: `Plugin from ${sourceLabel}`
    },
    manifestPath: null,
    depConstraints: void 0
  };
}
/** Read and parse a plugin hooks file, returning its `hooks` field. */
async function Rcl(hooksPath, pluginName) {
  if (!(await Gu(hooksPath))) throw Error(`Hooks file not found at ${hooksPath} for plugin ${pluginName}. If the manifest declares hooks, the file must exist.`);
  let raw = await zu.readFile(hooksPath, {
      encoding: "utf-8"
    }),
    parsed = qt(raw);
  return Xon().parse(parsed).hooks;
}
/** Load a plugin's monitors config (inline object, declared path, or default `monitors/monitors.json`). */
async function Hzp(pluginDir, manifest, source, errors) {
  let monitorsSpec = manifest.experimental?.monitors ?? manifest.monitors,
    monitorsPath;
  if (monitorsSpec === void 0) {
    let defaultPath = ms.join(pluginDir, "monitors", "monitors.json");
    if (await Gu(defaultPath)) monitorsPath = defaultPath;
  } else if (typeof monitorsSpec === "string") {
    let resolved = resolveContainedPluginPath(pluginDir, monitorsSpec);
    if (resolved === null) {
      errors.push({
        type: "path-traversal",
        source,
        plugin: manifest.name,
        path: monitorsSpec,
        component: "monitors"
      });
      return;
    }
    monitorsPath = resolved;
  } else return monitorsSpec;
  if (monitorsPath === void 0) return;
  try {
    let raw = await zu.readFile(monitorsPath, {
      encoding: "utf-8"
    });
    return PSr().parse(qt(raw));
  } catch (loadErr) {
    let loadErrMsg = Ce(loadErr);
    A(`Failed to load monitors for ${manifest.name} from ${monitorsPath}: ${loadErrMsg}`, {
      level: "error"
    }), errors.push({
      type: "component-load-failed",
      source,
      plugin: manifest.name,
      component: "monitors",
      path: monitorsPath,
      reason: loadErrMsg
    });
    return;
  }
}
/** Resolve a relative path within a plugin directory, returning null if it escapes containment. */
function resolveContainedPluginPath(pluginDir, relPath) {
  let resolvedRoot = ms.resolve(pluginDir),
    resolved = ms.resolve(resolvedRoot, relPath),
    rel = ms.relative(resolvedRoot, resolved);
  if (rel.startsWith("..") || ms.resolve(rel) === rel) return null;
  return resolved;
}
/**
 * Resolve a list of component relative paths within a plugin, recording
 * path-traversal / not-found / wrong-type errors and returning the existing
 * resolved paths.
 */
async function m6(relPaths, pluginDir, pluginName, source, component, componentLabel, contextPhrase, errors, mustBeDirectory = !1) {
  let resolvedEntries = await Promise.all(relPaths.map(async relPath => {
      let fullPath = resolveContainedPluginPath(pluginDir, relPath);
      if (fullPath === null) return {
        relPath,
        fullPath: null,
        exists: !1,
        isDirectory: !1
      };
      try {
        let stats = await zu.stat(fullPath);
        return {
          relPath,
          fullPath,
          exists: !0,
          isDirectory: stats.isDirectory()
        };
      } catch {
        return {
          relPath,
          fullPath,
          exists: !1,
          isDirectory: !1
        };
      }
    })),
    validPaths = [];
  for (let {
    relPath,
    fullPath,
    exists,
    isDirectory
  } of resolvedEntries) {
    if (fullPath === null) {
      A(`${componentLabel} path ${relPath} ${contextPhrase} escapes plugin directory for ${pluginName}`, {
        level: "error"
      }), errors.push({
        type: "path-traversal",
        source,
        plugin: pluginName,
        path: relPath,
        component
      });
      continue;
    }
    if (!exists) A(`${componentLabel} path ${relPath} ${contextPhrase} not found at ${fullPath} for ${pluginName}`, {
      level: "error"
    }), errors.push({
      type: "path-not-found",
      source,
      plugin: pluginName,
      path: fullPath,
      component
    });else if (mustBeDirectory && !isDirectory) {
      let dirName = ms.dirname(relPath),
        skillHint = component === "skills" && ms.basename(relPath).toLowerCase() === "skill.md" && dirName !== "." ? ` \u2014 point to the parent directory '${dirName}' instead` : "",
        reason = component === "skills" ? `path is a file; skills entries must be directories containing SKILL.md${skillHint}` : "path is a file; expected a directory";
      A(`${componentLabel} path ${relPath} ${contextPhrase} is a file, not a directory, for ${pluginName}`, {
        level: "error"
      }), errors.push({
        type: "component-load-failed",
        source,
        plugin: pluginName,
        path: relPath,
        component,
        reason
      });
    } else validPaths.push(fullPath);
  }
  return validPaths;
}
/** Whether any declared component source resolves under `folderPath` (i.e. the auto-load folder is referenced by the manifest). */
function vcl(componentSpec, pluginDir, folderPath) {
  let sources = [];
  if (typeof componentSpec === "string") sources.push(componentSpec);else if (Array.isArray(componentSpec)) {
    for (let item of componentSpec) if (typeof item === "string") sources.push(item);
  } else if (componentSpec && typeof componentSpec === "object") {
    for (let item of Object.values(componentSpec)) if (item && typeof item === "object" && "source" in item && typeof item.source === "string") sources.push(item.source);
  }
  let folderWithSep = folderPath + ms.sep;
  return sources.some(src => {
    let resolved = resolveContainedPluginPath(pluginDir, src);
    return resolved !== null && (resolved + ms.sep).startsWith(folderWithSep);
  });
}
/**
 * Build an in-memory plugin object from a directory: load its manifest, detect
 * auto-loadable component folders, resolve manifest-declared component paths,
 * load hooks/monitors/settings, and collect errors and warnings.
 */
async function createPluginFromPath(pluginDir, source, enabled, pluginNameHint, strict = !0) {
  let errors = [],
    warnings = [],
    {
      manifest,
      manifestPath,
      depConstraints
    } = await loadPluginManifest(pluginDir, pluginNameHint, source),
    plugin = {
      name: manifest.name,
      manifest,
      path: pluginDir,
      source,
      repository: source,
      enabled,
      depConstraints
    },
    [hasCommandsDir, hasAgentsDir, hasSkillsDir, hasOutputStylesDir, hasThemesDir, hasWorkflowsDir] = await Promise.all([Gu(ms.join(pluginDir, "commands")), Gu(ms.join(pluginDir, "agents")), Gu(ms.join(pluginDir, "skills")), Gu(ms.join(pluginDir, "output-styles")), Gu(ms.join(pluginDir, "themes")), Gu(ms.join(pluginDir, "workflows"))]),
    {
      marketplace
    } = ts(source);
  for (let [manifestKey, hasFolder, component, folderName] of [["commands", hasCommandsDir, "commands", "commands"], ["agents", hasAgentsDir, "agents", "agents"], ["outputStyles", hasOutputStylesDir, "output-styles", "output-styles"], ["themes", hasThemesDir, "themes", "themes"]]) {
    let experimentalSpec = manifest.experimental?.[manifestKey],
      spec = manifest[manifestKey];
    if (manifestKey === "themes") spec = manifest.experimental?.themes ?? manifest.themes;else if (manifestKey === "outputStyles") spec = manifest.outputStyles;
    let manifestFields = [];
    if (experimentalSpec !== void 0) manifestFields.push(`experimental.${manifestKey}`);
    if (manifest[manifestKey] !== void 0 && (experimentalSpec === void 0 || !0)) manifestFields.push(manifestKey);
    if (!spec || !hasFolder) continue;
    Wvn(manifest.name, marketplace, component);
    let folderPath = ms.join(pluginDir, folderName);
    if (vcl(spec, pluginDir, folderPath)) continue;
    A(`Plugin ${manifest.name}: ${folderName}/ folder exists but is not auto-loaded because the manifest sets ${manifestFields.map(field => `"${field}"`).join(" and ")}`), warnings.push({
      type: "folder-shadowed-by-manifest",
      source,
      plugin: manifest.name,
      component,
      folderPath,
      manifestFields
    });
  }
  if (manifest.workflows && hasWorkflowsDir) {
    Wvn(manifest.name, marketplace, "workflows");
    let workflowsFolder = ms.join(pluginDir, "workflows");
    if (!vcl(manifest.workflows, pluginDir, workflowsFolder)) warnings.push({
      type: "folder-shadowed-by-manifest",
      source,
      plugin: manifest.name,
      component: "workflows",
      folderPath: workflowsFolder,
      manifestFields: [manifest.experimental?.workflows !== void 0 ? "experimental.workflows" : "workflows"]
    });
  }
  if ((manifest.experimental?.monitors ?? manifest.monitors) !== void 0 && (await Gu(ms.join(pluginDir, "monitors", "monitors.json")))) Wvn(manifest.name, marketplace, "monitors");
  let autoCommands = !manifest.commands && hasCommandsDir,
    autoAgents = !manifest.agents && hasAgentsDir,
    autoSkills = hasSkillsDir,
    outputStylesSpec = manifest.outputStyles,
    autoOutputStyles = !outputStylesSpec && hasOutputStylesDir,
    autoThemes = !(manifest.experimental?.themes ?? manifest.themes) && hasThemesDir,
    autoWorkflows = !manifest.workflows && hasWorkflowsDir,
    commandsDir = ms.join(pluginDir, "commands");
  if (autoCommands) plugin.commandsPath = commandsDir;
  if (manifest.commands) {
    let firstCommand = Object.values(manifest.commands)[0];
    if (typeof manifest.commands === "object" && !Array.isArray(manifest.commands) && firstCommand && typeof firstCommand === "object" && ("source" in firstCommand || "content" in firstCommand)) {
      let commandsMetadata = {},
        commandsPaths = [],
        commandEntries = Object.entries(manifest.commands),
        resolvedCommands = await Promise.all(commandEntries.map(async ([commandName, metadata]) => {
          if (!metadata || typeof metadata !== "object") return {
            commandName,
            metadata,
            kind: "skip"
          };
          if (metadata.source) {
            let fullPath = resolveContainedPluginPath(pluginDir, metadata.source);
            return {
              commandName,
              metadata,
              kind: "source",
              fullPath,
              exists: fullPath !== null && (await Gu(fullPath))
            };
          }
          if (metadata.content) return {
            commandName,
            metadata,
            kind: "content"
          };
          return {
            commandName,
            metadata,
            kind: "skip"
          };
        }));
      for (let resolved of resolvedCommands) {
        if (resolved.kind === "skip") continue;
        if (resolved.kind === "content") {
          commandsMetadata[resolved.commandName] = resolved.metadata;
          continue;
        }
        if (resolved.fullPath === null) A(`Command ${resolved.commandName} source ${resolved.metadata.source} specified in manifest but escapes plugin directory for ${manifest.name}`, {
          level: "error"
        }), errors.push({
          type: "path-traversal",
          source,
          plugin: manifest.name,
          path: resolved.metadata.source ?? "",
          component: "commands"
        });else if (resolved.exists) commandsPaths.push(resolved.fullPath), commandsMetadata[resolved.commandName] = resolved.metadata;else A(`Command ${resolved.commandName} path ${resolved.metadata.source} specified in manifest but not found at ${resolved.fullPath} for ${manifest.name}`, {
          level: "error"
        }), errors.push({
          type: "path-not-found",
          source,
          plugin: manifest.name,
          path: resolved.fullPath,
          component: "commands"
        });
      }
      if (commandsPaths.length > 0) plugin.commandsPaths = commandsPaths;
      if (Object.keys(commandsMetadata).length > 0) plugin.commandsMetadata = commandsMetadata;
    } else {
      let commandList = Array.isArray(manifest.commands) ? manifest.commands : [manifest.commands],
        resolvedCommands = await Promise.all(commandList.map(async cmdPath => {
          if (typeof cmdPath !== "string") return {
            cmdPath,
            kind: "invalid"
          };
          let fullPath = resolveContainedPluginPath(pluginDir, cmdPath);
          return {
            cmdPath,
            kind: "path",
            fullPath,
            exists: fullPath !== null && (await Gu(fullPath))
          };
        })),
        commandsPaths = [];
      for (let resolved of resolvedCommands) {
        if (resolved.kind === "invalid") {
          A(`Unexpected command format in manifest for ${manifest.name}`, {
            level: "error"
          });
          continue;
        }
        if (resolved.fullPath === null) {
          A(`Command path ${resolved.cmdPath} specified in manifest but escapes plugin directory for ${manifest.name}`, {
            level: "error"
          }), errors.push({
            type: "path-traversal",
            source,
            plugin: manifest.name,
            path: resolved.cmdPath,
            component: "commands"
          });
          continue;
        }
        if (resolved.exists) commandsPaths.push(resolved.fullPath);else A(`Command path ${resolved.cmdPath} specified in manifest but not found at ${resolved.fullPath} for ${manifest.name}`, {
          level: "error"
        }), errors.push({
          type: "path-not-found",
          source,
          plugin: manifest.name,
          path: resolved.fullPath,
          component: "commands"
        });
      }
      if (commandsPaths.length > 0) plugin.commandsPaths = commandsPaths;
    }
  }
  let agentsDir = ms.join(pluginDir, "agents");
  if (autoAgents) plugin.agentsPath = agentsDir;
  if (manifest.agents) {
    let agentSpecs = Array.isArray(manifest.agents) ? manifest.agents : [manifest.agents],
      agentsPaths = await m6(agentSpecs, pluginDir, manifest.name, source, "agents", "Agent", "specified in manifest but", errors);
    if (agentsPaths.length > 0) plugin.agentsPaths = agentsPaths;
  }
  let skillsDir = ms.join(pluginDir, "skills");
  if (autoSkills) plugin.skillsPath = skillsDir;
  if (manifest.skills) {
    let skillSpecs = Array.isArray(manifest.skills) ? manifest.skills : [manifest.skills],
      resolvedSkillsDir = ms.resolve(skillsDir),
      resolvedPluginDir = ms.resolve(pluginDir),
      skillsPaths = (await m6(skillSpecs, pluginDir, manifest.name, source, "skills", "Skill", "specified in manifest but", errors, !0)).filter(path => {
        let resolved = ms.resolve(path);
        if (resolved === resolvedSkillsDir) return !1;
        if (marketplace === tb && resolved === resolvedPluginDir) return !1;
        return !0;
      });
    if (skillsPaths.length > 0) plugin.skillsPaths = skillsPaths;
  } else if (!autoSkills && marketplace !== tb) {
    if (await Gu(ms.join(pluginDir, "SKILL.md"))) plugin.skillsPaths = [pluginDir];
  }
  let outputStylesDir = ms.join(pluginDir, "output-styles");
  if (autoOutputStyles) plugin.outputStylesPath = outputStylesDir;
  if (outputStylesSpec) {
    let outputStyleSpecs = Array.isArray(outputStylesSpec) ? outputStylesSpec : [outputStylesSpec],
      outputStylesPaths = await m6(outputStyleSpecs, pluginDir, manifest.name, source, "output-styles", "Output style", "specified in manifest but", errors);
    if (outputStylesPaths.length > 0) plugin.outputStylesPaths = outputStylesPaths;
  }
  let themesDir = ms.join(pluginDir, "themes");
  if (autoThemes) plugin.themesPath = themesDir;
  let themesSpec = manifest.experimental?.themes ?? manifest.themes;
  if (themesSpec) {
    let themeSpecs = Array.isArray(themesSpec) ? themesSpec : [themesSpec],
      themesPaths = await m6(themeSpecs, pluginDir, manifest.name, source, "themes", "Theme", "specified in manifest but", errors);
    if (themesPaths.length > 0) plugin.themesPaths = themesPaths;
  }
  if (autoWorkflows) plugin.workflowsPath = ms.join(pluginDir, "workflows");
  if (manifest.workflows) {
    let workflowSpecs = Array.isArray(manifest.workflows) ? manifest.workflows : [manifest.workflows],
      workflowsPaths = await m6(workflowSpecs, pluginDir, manifest.name, source, "workflows", "Workflow", "specified in manifest but", errors);
    if (workflowsPaths.length > 0) plugin.workflowsPaths = workflowsPaths;
  }
  let hooksConfig,
    loadedHookPaths = new Set(),
    defaultHooksPath = ms.join(pluginDir, "hooks", "hooks.json");
  if (await Gu(defaultHooksPath)) try {
    hooksConfig = await Rcl(defaultHooksPath, manifest.name);
    try {
      loadedHookPaths.add(await zu.realpath(defaultHooksPath));
    } catch {
      loadedHookPaths.add(defaultHooksPath);
    }
    A(`Read hooks.json for plugin ${manifest.name} (enabled=${enabled}${enabled ? "" : "; will NOT register, plugin is disabled"}): ${defaultHooksPath}`);
  } catch (hooksErr) {
    let hooksErrMsg = Ce(hooksErr);
    A(`Failed to load hooks for ${manifest.name}: ${hooksErrMsg}`, {
      level: "error"
    }), errors.push({
      type: "hook-load-failed",
      source,
      plugin: manifest.name,
      hookPath: defaultHooksPath,
      reason: hooksErrMsg
    });
  }
  if (manifest.hooks) {
    let hookSpecs = Array.isArray(manifest.hooks) ? manifest.hooks : [manifest.hooks];
    for (let hookSpec of hookSpecs) if (typeof hookSpec === "string") {
      let resolved = resolveContainedPluginPath(pluginDir, hookSpec);
      if (resolved === null) {
        A(`Hooks file ${hookSpec} specified in manifest but escapes plugin directory for ${manifest.name}`, {
          level: "error"
        }), errors.push({
          type: "path-traversal",
          source,
          plugin: manifest.name,
          path: hookSpec,
          component: "hooks"
        });
        continue;
      }
      if (!(await Gu(resolved))) {
        A(`Hooks file ${hookSpec} specified in manifest but not found at ${resolved} for ${manifest.name}`, {
          level: "error"
        }), errors.push({
          type: "path-not-found",
          source,
          plugin: manifest.name,
          path: resolved,
          component: "hooks"
        });
        continue;
      }
      let realHookPath;
      try {
        realHookPath = await zu.realpath(resolved);
      } catch {
        realHookPath = resolved;
      }
      if (loadedHookPaths.has(realHookPath)) {
        if (A(`Skipping duplicate hooks file for plugin ${manifest.name}: ${hookSpec} (resolves to already-loaded file: ${realHookPath})`), strict) {
          let dupMsg = `Duplicate hooks file detected: ${hookSpec} resolves to already-loaded file ${realHookPath}. The standard hooks/hooks.json is loaded automatically, so manifest.hooks should only reference additional hook files.`;
          A(dupMsg, {
            level: "error"
          }), errors.push({
            type: "hook-load-failed",
            source,
            plugin: manifest.name,
            hookPath: resolved,
            reason: dupMsg
          });
        }
        continue;
      }
      try {
        let loadedHooks = await Rcl(resolved, manifest.name);
        try {
          hooksConfig = kcl(hooksConfig, loadedHooks), loadedHookPaths.add(realHookPath), A(`Read manifest hooks for plugin ${manifest.name} (enabled=${enabled}${enabled ? "" : "; will NOT register, plugin is disabled"}): ${hookSpec}`);
        } catch (mergeErr) {
          let mergeErrMsg = Ce(mergeErr);
          A(`Failed to merge hooks from ${hookSpec} for ${manifest.name}: ${mergeErrMsg}`, {
            level: "error"
          }), Ie(mo(mergeErr)), errors.push({
            type: "hook-load-failed",
            source,
            plugin: manifest.name,
            hookPath: resolved,
            reason: `Failed to merge: ${mergeErrMsg}`
          });
        }
      } catch (loadErr) {
        let loadErrMsg = Ce(loadErr);
        A(`Failed to load hooks from ${hookSpec} for ${manifest.name}: ${loadErrMsg}`, {
          level: "error"
        }), errors.push({
          type: "hook-load-failed",
          source,
          plugin: manifest.name,
          hookPath: resolved,
          reason: loadErrMsg
        });
      }
    } else if (typeof hookSpec === "object") hooksConfig = kcl(hooksConfig, hookSpec);
  }
  if (hooksConfig) plugin.hooksConfig = hooksConfig;
  let monitors = await Hzp(pluginDir, manifest, source, errors);
  if (monitors) plugin.monitors = monitors;
  let settings = await xzp(pluginDir, manifest);
  if (settings) plugin.settings = settings;
  return {
    plugin,
    errors,
    warnings,
    hasManifest: manifestPath !== null
  };
}
/** Validate and normalize a plugin settings object, returning undefined when empty/invalid. */
function wcl(value) {
  let validation = Izp().safeParse(value);
  if (!validation.success) return;
  let validated = validation.data;
  if (Object.keys(validated).length === 0) return;
  return validated;
}
/** Load plugin settings from `settings.json` (preferred) or the manifest's `settings` field. */
async function xzp(pluginDir, manifest) {
  let settingsPath = ms.join(pluginDir, "settings.json"),
    parseFailed = !1;
  try {
    let raw = await zu.readFile(settingsPath, {
        encoding: "utf-8"
      }),
      parsed = qt(raw);
    if (Bzp(parsed)) {
      let settings = wcl(parsed);
      if (settings) return A(`Loaded settings from settings.json for plugin ${manifest.name}`), He("plugin_load_settings"), settings;
    }
  } catch (readErr) {
    if (!Jo(readErr)) parseFailed = !0, A(`Failed to parse settings.json for plugin ${manifest.name}: ${readErr}`, {
      level: "warn"
    });
  }
  if (manifest.settings) {
    let settings = wcl(manifest.settings);
    if (settings) {
      if (A(`Loaded settings from manifest for plugin ${manifest.name}`), parseFailed) Pt("plugin_load_settings", "plugin_load_settings_parse_failed");else He("plugin_load_settings");
      return settings;
    }
  }
  if (parseFailed) Pt("plugin_load_settings", "plugin_load_settings_parse_failed");else He("plugin_load_settings");
  return;
}
/** Merge two hooks configs, concatenating event arrays for overlapping keys. */
function kcl(base, extra) {
  if (!base) return extra;
  let merged = {
    ...base
  };
  for (let [eventName, handlers] of Object.entries(extra)) if (!merged[eventName]) merged[eventName] = handlers;else merged[eventName] = [...(merged[eventName] || []), ...handlers];
  return merged;
}
/** Load all marketplace plugins from enabled-plugin settings, honoring blocklists and caches. */
async function QEo({
  cacheOnly
}) {
  let settings = $o(),
    enabledPlugins = {
      ...Y2e(),
      ...(settings.enabledPlugins || {})
    },
    loadedPlugins = [],
    errors = [],
    warnings = [],
    pluginEntries = Object.entries(enabledPlugins).filter(([pluginId, enabledValue]) => {
      if (!tsn().safeParse(pluginId).success || enabledValue === void 0) return !1;
      let {
        marketplace
      } = ts(pluginId);
      return marketplace !== V2e && !EI(marketplace);
    }),
    registeredMarketplaces = await tP(),
    blocklist = OW(),
    allowedSourcesList = HPn(),
    hasSourcePolicy = blocklist !== null || allowedSourcesList !== null && allowedSourcesList.some(source => source.source !== "skills-dir"),
    marketplaceNames = new Set(pluginEntries.map(([pluginId]) => ts(pluginId).marketplace).filter(name => !!name)),
    marketplaceCatalogs = new Map();
  await Promise.all([...marketplaceNames].map(async marketplaceName => {
    marketplaceCatalogs.set(marketplaceName, await d6(marketplaceName));
  }));
  let installRecords = z5t(),
    settled = await Promise.allSettled(pluginEntries.map(async ([pluginId, enabledValue]) => {
      let {
          name: pluginName,
          marketplace: marketplaceName
        } = ts(pluginId),
        registration = registeredMarketplaces[marketplaceName];
      if (!registration && hasSourcePolicy) return errors.push({
        type: "marketplace-blocked-by-policy",
        source: pluginId,
        plugin: pluginName,
        marketplace: marketplaceName,
        blockedByBlocklist: blocklist === null,
        allowedSources: (blocklist ?? []).map(source => uTe(source))
      }), null;
      if (registration && !jA(registration.source)) {
        let blockedByBlocklist = QFt(registration.source),
          allowed = OW() || [];
        return errors.push({
          type: "marketplace-blocked-by-policy",
          source: pluginId,
          plugin: pluginName,
          marketplace: marketplaceName,
          blockedByBlocklist,
          allowedSources: blockedByBlocklist ? [] : allowed.map(source => uTe(source))
        }), null;
      }
      let catalogMatch = null,
        catalog = marketplaceCatalogs.get(marketplaceName);
      if (catalog && registration) {
        let entry = catalog.plugins.find(plugin => plugin.name === pluginName);
        if (entry) catalogMatch = {
          entry,
          marketplaceInstallLocation: registration.installLocation
        };
      } else catalogMatch = await BEo(pluginId);
      if (!catalogMatch) {
        let hasInstallRecord = !!installRecords.plugins[pluginId]?.length;
        if (!registration) {
          if (hasInstallRecord) errors.push({
            type: "marketplace-not-found",
            source: pluginId,
            marketplace: marketplaceName,
            availableMarketplaces: Object.keys(registeredMarketplaces)
          });else A(`Skipping orphaned enabledPlugins entry ${pluginId}: marketplace not registered`);
        } else if (!catalog) errors.push({
          type: "marketplace-load-failed",
          source: pluginId,
          marketplace: marketplaceName,
          reason: "cache-miss"
        });else if (hasInstallRecord) errors.push({
          type: "plugin-not-found",
          source: pluginId,
          pluginId: pluginName,
          marketplace: marketplaceName
        });else A(`Skipping orphaned enabledPlugins entry ${pluginId}: not in marketplace catalog`);
        return null;
      }
      let installRecord = await Azp(installRecords.plugins[pluginId]),
        loaded = await (cacheOnly ? Dzp(catalogMatch.entry, catalogMatch.marketplaceInstallLocation, registration?.source, pluginId, enabledValue === !0, errors, warnings, installRecord?.installPath) : Pzp(catalogMatch.entry, catalogMatch.marketplaceInstallLocation, registration?.source, pluginId, enabledValue === !0, errors, warnings, installRecord?.version));
      if (loaded && installRecord?.resolvedVersion !== void 0) loaded.resolvedVersion = installRecord.resolvedVersion;
      return loaded;
    }));
  for (let [index, result] of settled.entries()) if (result.status === "fulfilled" && result.value) loadedPlugins.push(result.value);else if (result.status === "rejected") {
    let err = mo(result.reason),
      pluginId = pluginEntries[index][0];
    A(`Failed to load plugin ${pluginId}: ${err.message}`, {
      level: "error"
    }), errors.push({
      type: "generic-error",
      source: pluginId,
      plugin: mi(pluginId, "@"),
      error: err.message
    });
  }
  return {
    plugins: loadedPlugins,
    errors,
    warnings
  };
}
/** Resolve a marketplace plugin to an on-disk path using cache only (no install), then build it. */
async function Dzp(entry, marketplaceInstallLocation, registrationSource, pluginId, expectExists, errors, warnings, installPath) {
  let resolvedPath;
  if (typeof entry.source === "string") {
    let isLocalMarketplace = registrationSource && P5(registrationSource);
    if (!isLocalMarketplace && installPath && (installPath.endsWith(".zip") ? await Gu(installPath) : await cacheDirHasPluginContent(installPath))) resolvedPath = installPath;else if (!isLocalMarketplace) {
      if (expectExists) errors.push({
        type: "plugin-cache-miss",
        source: pluginId,
        plugin: entry.name,
        installPath: installPath ?? marketplaceInstallLocation
      });
      return null;
    } else {
      let baseDir;
      try {
        baseDir = (await zu.stat(marketplaceInstallLocation)).isDirectory() ? marketplaceInstallLocation : ms.join(marketplaceInstallLocation, "..");
      } catch {
        return errors.push({
          type: "generic-error",
          source: pluginId,
          error: `Marketplace directory not found at path: ${marketplaceInstallLocation}`
        }), null;
      }
      if (resolvedPath = ms.join(baseDir, entry.source), !(await Gu(resolvedPath))) return errors.push({
        type: "generic-error",
        source: pluginId,
        error: `Plugin directory not found at path: ${resolvedPath}. Check that the marketplace entry has the correct path.`
      }), null;
    }
  } else if (installPath && (installPath.endsWith(".zip") ? await Gu(installPath) : await cacheDirHasPluginContent(installPath))) resolvedPath = installPath;else if (!installPath) {
    let isExplicitlyEnabled = ["userSettings", "localSettings", "flagSettings", "policySettings"].some(scope => An(scope)?.enabledPlugins?.[pluginId] === !0),
      version = await Xce(pluginId, entry.source, void 0, void 0, entry.version, "sha" in entry.source ? entry.source.sha : void 0),
      cachePath;
    if (isExplicitlyEnabled) {
      let zipPath = getVersionedZipCachePath(pluginId, version),
        dirPath = getVersionedCachePath(pluginId, version);
      if (OG() && (await Gu(zipPath))) cachePath = zipPath;else if (await cacheDirHasPluginContent(dirPath)) await YEo(dirPath), cachePath = dirPath;
    }
    if (!cachePath) cachePath = (await JEo(pluginId, version)) ?? (version === "unknown" ? await probeSeedCacheAnyVersion(pluginId) : null) ?? void 0;
    if (cachePath) resolvedPath = cachePath;else if (isExplicitlyEnabled) return errors.push({
      type: "plugin-cache-miss",
      source: pluginId,
      plugin: entry.name,
      installPath: "(not recorded)"
    }), null;else return errors.push({
      type: "plugin-not-installed",
      source: pluginId,
      plugin: entry.name
    }), null;
  } else {
    if (expectExists) errors.push({
      type: "plugin-cache-miss",
      source: pluginId,
      plugin: entry.name,
      installPath
    });
    return null;
  }
  if (OG() && resolvedPath.endsWith(".zip")) {
    let extractRoot = await F5t(),
      extractDir = ms.join(extractRoot, pluginId.replace(/[^a-zA-Z0-9@\-_]/g, "-"));
    try {
      await xDe(resolvedPath, extractDir), resolvedPath = extractDir;
    } catch (extractErr) {
      return A(`Failed to extract plugin ZIP ${resolvedPath}: ${extractErr}`, {
        level: "error"
      }), errors.push({
        type: "plugin-cache-miss",
        source: pluginId,
        plugin: entry.name,
        installPath: resolvedPath
      }), null;
    }
  }
  return Ucl(entry, pluginId, expectExists, errors, warnings, resolvedPath);
}
/** Resolve a marketplace plugin to an on-disk path, installing/caching it if necessary, then build it. */
async function Pzp(entry, marketplaceInstallLocation, registrationSource, pluginId, expectExists, errors, warnings, pinnedVersion) {
  A(`Loading plugin ${entry.name} from source: ${Pe(entry.source)}`);
  let resolvedPath;
  if (typeof entry.source === "string") {
    let baseDir = (await zu.stat(marketplaceInstallLocation)).isDirectory() ? marketplaceInstallLocation : ms.join(marketplaceInstallLocation, ".."),
      sourcePath = ms.join(baseDir, entry.source);
    if (!(await Gu(sourcePath))) return A(`Plugin path not found: ${sourcePath}`, {
      level: "error"
    }), errors.push({
      type: "generic-error",
      source: pluginId,
      error: `Plugin directory not found at path: ${sourcePath}. Check that the marketplace entry has the correct path.`
    }), null;
    if (registrationSource && P5(registrationSource)) resolvedPath = sourcePath;else try {
      let sourceManifest;
      try {
        sourceManifest = (await loadPluginManifest(sourcePath, entry.name, entry.source)).manifest;
      } catch {}
      let version = await Xce(pluginId, entry.source, sourceManifest, baseDir, entry.version);
      resolvedPath = await copyPluginToVersionedCache(sourcePath, pluginId, version, entry, baseDir), A(`Copied plugin ${entry.name} to versioned cache: ${resolvedPath}`);
    } catch (cacheErr) {
      let cacheErrMsg = Ce(cacheErr);
      A(`Failed to copy plugin ${entry.name} to versioned cache: ${cacheErrMsg}. Using marketplace path.`, {
        level: "warn"
      }), resolvedPath = sourcePath;
    }
  } else try {
    let version = await Xce(pluginId, entry.source, void 0, void 0, pinnedVersion ?? entry.version, "sha" in entry.source ? entry.source.sha : void 0),
      dirPath = getVersionedCachePath(pluginId, version),
      zipPath = getVersionedZipCachePath(pluginId, version);
    if (OG() && (await Gu(zipPath))) A(`Using versioned cached plugin ZIP ${entry.name} from ${zipPath}`), resolvedPath = zipPath;else if (await cacheDirHasPluginContent(dirPath)) await YEo(dirPath), A(`Using versioned cached plugin ${entry.name} from ${dirPath}`), resolvedPath = dirPath;else {
      let seedPath = (await JEo(pluginId, version)) ?? (version === "unknown" ? await probeSeedCacheAnyVersion(pluginId) : null);
      if (seedPath) resolvedPath = seedPath, A(`Using seed cache for external plugin ${entry.name} at ${seedPath}`);else {
        let cached = await cachePlugin(entry.source, {
            manifest: {
              name: entry.name
            }
          }),
          resolvedVersion = version !== "unknown" ? version : await Xce(pluginId, entry.source, cached.manifest, cached.path, pinnedVersion ?? entry.version, cached.gitCommitSha);
        if (resolvedPath = await copyPluginToVersionedCache(cached.path, pluginId, resolvedVersion, entry, void 0), cached.path !== resolvedPath && !ms.resolve(resolvedPath).startsWith(ms.resolve(cached.path) + ms.sep)) await zu.rm(cached.path, {
          recursive: !0,
          force: !0
        });
      }
    }
  } catch (cacheErr) {
    let cacheErrMsg = Ce(cacheErr);
    return A(`Failed to cache plugin ${entry.name}: ${cacheErrMsg}`, {
      level: "error"
    }), errors.push({
      type: "generic-error",
      source: pluginId,
      error: `Failed to download/cache plugin ${entry.name}: ${cacheErrMsg}`
    }), null;
  }
  if (OG() && resolvedPath.endsWith(".zip")) {
    let extractRoot = await F5t(),
      extractDir = ms.join(extractRoot, pluginId.replace(/[^a-zA-Z0-9@\-_]/g, "-"));
    try {
      await xDe(resolvedPath, extractDir), A(`Extracted plugin ZIP to session dir: ${extractDir}`), resolvedPath = extractDir;
    } catch (extractErr) {
      throw A(`Failed to extract plugin ZIP ${resolvedPath}, deleting corrupt file: ${extractErr}`), await zu.rm(resolvedPath, {
        force: !0
      }).catch(() => {}), extractErr;
    }
  }
  return Ucl(entry, pluginId, expectExists, errors, warnings, resolvedPath);
}
/**
 * Build a plugin from a resolved path and reconcile marketplace-entry component
 * declarations with the manifest (handling strict-mode conflicts and merging
 * entry-declared paths when the plugin has no manifest of its own).
 */
async function Ucl(entry, pluginId, recordWarnings, outerErrors, outerWarnings, resolvedPath) {
  let entryErrors = [],
    {
      plugin,
      errors,
      warnings,
      hasManifest
    } = await createPluginFromPath(resolvedPath, pluginId, recordWarnings, entry.name, entry.strict ?? !0);
  if (entryErrors.push(...errors), typeof entry.source === "object" && "sha" in entry.source && entry.source.sha) plugin.sha = entry.source.sha;
  if (typeof entry.source === "string" && entry.source.split(/[\\/]/).every(part => part === "" || part === ".") && entry.skills !== void 0) {
    let skillSpecs = Array.isArray(entry.skills) ? entry.skills : [entry.skills];
    if (skillSpecs.length > 0) {
      let skillsPaths = await m6(skillSpecs, resolvedPath, entry.name, pluginId, "skills", "Skill", "declared in marketplace entry but", [], !0);
      if (skillsPaths.length > 0) {
        let skillsFolder = ms.join(resolvedPath, "skills"),
          resolvedSkillsFolder = ms.resolve(skillsFolder),
          resolvedPluginDir = ms.resolve(resolvedPath),
          includesRoot = skillsPaths.some(path => {
            let resolved = ms.resolve(path);
            return resolved === resolvedSkillsFolder || resolved === resolvedPluginDir;
          });
        plugin.skillsPath = includesRoot ? plugin.skillsPath : void 0;
        let filteredSkillsPaths = skillsPaths.filter(path => {
          let resolved = ms.resolve(path);
          return resolved !== resolvedSkillsFolder && resolved !== resolvedPluginDir;
        });
        plugin.skillsPaths = filteredSkillsPaths.length > 0 ? filteredSkillsPaths : void 0;
      }
    }
  }
  if (!hasManifest) {
    if (plugin.manifest = {
      ...entry,
      id: void 0,
      source: void 0,
      strict: void 0
    }, plugin.name = plugin.manifest.name, entry.commands) {
      let firstCommand = Object.values(entry.commands)[0];
      if (typeof entry.commands === "object" && !Array.isArray(entry.commands) && firstCommand && typeof firstCommand === "object" && ("source" in firstCommand || "content" in firstCommand)) {
        let commandsMetadata = {},
          commandsPaths = [],
          commandEntries = Object.entries(entry.commands),
          resolvedCommands = await Promise.all(commandEntries.map(async ([commandName, metadata]) => {
            if (!metadata || typeof metadata !== "object" || !metadata.source) return {
              commandName,
              metadata,
              skip: !0
            };
            let fullPath = ms.join(resolvedPath, metadata.source);
            return {
              commandName,
              metadata,
              skip: !1,
              fullPath,
              exists: await Gu(fullPath)
            };
          }));
        for (let resolved of resolvedCommands) {
          if (resolved.skip) continue;
          if (resolved.exists) commandsPaths.push(resolved.fullPath), commandsMetadata[resolved.commandName] = resolved.metadata;else A(`Command ${resolved.commandName} path ${resolved.metadata.source} from marketplace entry not found at ${resolved.fullPath} for ${entry.name}`, {
            level: "error"
          }), entryErrors.push({
            type: "path-not-found",
            source: pluginId,
            plugin: entry.name,
            path: resolved.fullPath,
            component: "commands"
          });
        }
        if (commandsPaths.length > 0) plugin.commandsPaths = commandsPaths, plugin.commandsMetadata = commandsMetadata;
      } else {
        let commandList = Array.isArray(entry.commands) ? entry.commands : [entry.commands],
          resolvedCommands = await Promise.all(commandList.map(async cmdPath => {
            if (typeof cmdPath !== "string") return {
              cmdPath,
              kind: "invalid"
            };
            let fullPath = ms.join(resolvedPath, cmdPath);
            return {
              cmdPath,
              kind: "path",
              fullPath,
              exists: await Gu(fullPath)
            };
          })),
          commandsPaths = [];
        for (let resolved of resolvedCommands) {
          if (resolved.kind === "invalid") {
            A(`Unexpected command format in marketplace entry for ${entry.name}`, {
              level: "error"
            });
            continue;
          }
          if (resolved.exists) commandsPaths.push(resolved.fullPath);else A(`Command path ${resolved.cmdPath} from marketplace entry not found at ${resolved.fullPath} for ${entry.name}`, {
            level: "error"
          }), entryErrors.push({
            type: "path-not-found",
            source: pluginId,
            plugin: entry.name,
            path: resolved.fullPath,
            component: "commands"
          });
        }
        if (commandsPaths.length > 0) plugin.commandsPaths = commandsPaths;
      }
    }
    if (entry.agents) {
      let agentSpecs = Array.isArray(entry.agents) ? entry.agents : [entry.agents],
        agentsPaths = await m6(agentSpecs, resolvedPath, entry.name, pluginId, "agents", "Agent", "from marketplace entry", entryErrors);
      if (agentsPaths.length > 0) plugin.agentsPaths = agentsPaths;
    }
    if (entry.skills) {
      A(`Processing ${Array.isArray(entry.skills) ? entry.skills.length : 1} skill paths for plugin ${entry.name}`);
      let skillSpecs = Array.isArray(entry.skills) ? entry.skills : [entry.skills],
        resolvedSkillsFolder = ms.resolve(ms.join(resolvedPath, "skills")),
        skillsPaths = (await m6(skillSpecs, resolvedPath, entry.name, pluginId, "skills", "Skill", "from marketplace entry", entryErrors, !0)).filter(path => ms.resolve(path) !== resolvedSkillsFolder);
      if (A(`Found ${skillsPaths.length} valid skill paths for plugin ${entry.name}, setting skillsPaths`), skillsPaths.length > 0) plugin.skillsPaths = skillsPaths;
    } else A(`Plugin ${entry.name} has no entry.skills defined`);
    if (entry.outputStyles) {
      let outputStyleSpecs = Array.isArray(entry.outputStyles) ? entry.outputStyles : [entry.outputStyles],
        outputStylesPaths = await m6(outputStyleSpecs, resolvedPath, entry.name, pluginId, "output-styles", "Output style", "from marketplace entry", entryErrors);
      if (outputStylesPaths.length > 0) plugin.outputStylesPaths = outputStylesPaths;
    }
    let themesSpec = entry.experimental?.themes ?? entry.themes;
    if (themesSpec) {
      let themeSpecs = Array.isArray(themesSpec) ? themesSpec : [themesSpec],
        themesPaths = await m6(themeSpecs, resolvedPath, entry.name, pluginId, "themes", "Theme", "from marketplace entry", entryErrors);
      if (themesPaths.length > 0) plugin.themesPaths = themesPaths;
    }
    if (entry.hooks) plugin.hooksConfig = entry.hooks;
  } else if (!entry.strict && hasManifest && (entry.commands || entry.agents || entry.skills || entry.hooks || entry.outputStyles || entry.themes || entry.experimental?.themes)) return A(`Plugin ${entry.name} has both plugin.json and marketplace manifest entries for commands/agents/skills/hooks/outputStyles/themes. This is a conflict.`, {
    level: "error"
  }), outerErrors.push({
    type: "generic-error",
    source: pluginId,
    error: `Plugin ${entry.name} has conflicting manifests: both plugin.json and marketplace entry specify components. Set strict: true in marketplace entry or remove component specs from one location.`
  }), null;else if (hasManifest) {
    if (entry.commands) {
      let firstCommand = Object.values(entry.commands)[0];
      if (typeof entry.commands === "object" && !Array.isArray(entry.commands) && firstCommand && typeof firstCommand === "object" && ("source" in firstCommand || "content" in firstCommand)) {
        let commandsMetadata = {
            ...(plugin.commandsMetadata || {})
          },
          commandsPaths = [],
          commandEntries = Object.entries(entry.commands),
          resolvedCommands = await Promise.all(commandEntries.map(async ([commandName, metadata]) => {
            if (!metadata || typeof metadata !== "object" || !metadata.source) return {
              commandName,
              metadata,
              skip: !0
            };
            let fullPath = ms.join(resolvedPath, metadata.source);
            return {
              commandName,
              metadata,
              skip: !1,
              fullPath,
              exists: await Gu(fullPath)
            };
          }));
        for (let resolved of resolvedCommands) {
          if (resolved.skip) continue;
          if (resolved.exists) commandsPaths.push(resolved.fullPath), commandsMetadata[resolved.commandName] = resolved.metadata;else A(`Command ${resolved.commandName} path ${resolved.metadata.source} from marketplace entry not found at ${resolved.fullPath} for ${entry.name}`, {
            level: "error"
          }), entryErrors.push({
            type: "path-not-found",
            source: pluginId,
            plugin: entry.name,
            path: resolved.fullPath,
            component: "commands"
          });
        }
        if (commandsPaths.length > 0) plugin.commandsPaths = [...(plugin.commandsPaths || []), ...commandsPaths], plugin.commandsMetadata = commandsMetadata;
      } else {
        let commandList = Array.isArray(entry.commands) ? entry.commands : [entry.commands],
          resolvedCommands = await Promise.all(commandList.map(async cmdPath => {
            if (typeof cmdPath !== "string") return {
              cmdPath,
              kind: "invalid"
            };
            let fullPath = ms.join(resolvedPath, cmdPath);
            return {
              cmdPath,
              kind: "path",
              fullPath,
              exists: await Gu(fullPath)
            };
          })),
          commandsPaths = [];
        for (let resolved of resolvedCommands) {
          if (resolved.kind === "invalid") {
            A(`Unexpected command format in marketplace entry for ${entry.name}`, {
              level: "error"
            });
            continue;
          }
          if (resolved.exists) commandsPaths.push(resolved.fullPath);else A(`Command path ${resolved.cmdPath} from marketplace entry not found at ${resolved.fullPath} for ${entry.name}`, {
            level: "error"
          }), entryErrors.push({
            type: "path-not-found",
            source: pluginId,
            plugin: entry.name,
            path: resolved.fullPath,
            component: "commands"
          });
        }
        if (commandsPaths.length > 0) plugin.commandsPaths = [...(plugin.commandsPaths || []), ...commandsPaths];
      }
    }
    if (entry.agents) {
      let agentSpecs = Array.isArray(entry.agents) ? entry.agents : [entry.agents],
        agentsPaths = await m6(agentSpecs, resolvedPath, entry.name, pluginId, "agents", "Agent", "from marketplace entry", entryErrors);
      if (agentsPaths.length > 0) plugin.agentsPaths = [...(plugin.agentsPaths || []), ...agentsPaths];
    }
    if (entry.skills) {
      let skillSpecs = Array.isArray(entry.skills) ? entry.skills : [entry.skills],
        resolvedSkillsFolder = ms.resolve(ms.join(resolvedPath, "skills")),
        skillsPaths = (await m6(skillSpecs, resolvedPath, entry.name, pluginId, "skills", "Skill", "from marketplace entry", entryErrors, !0)).filter(path => ms.resolve(path) !== resolvedSkillsFolder);
      if (skillsPaths.length > 0) {
        let existingSkillsSet = new Set((plugin.skillsPaths || []).map(path => ms.resolve(path))),
          newSkillsPaths = skillsPaths.filter(path => !existingSkillsSet.has(ms.resolve(path)));
        if (newSkillsPaths.length > 0) plugin.skillsPaths = [...(plugin.skillsPaths || []), ...newSkillsPaths];
      }
    }
    if (entry.outputStyles) {
      let outputStyleSpecs = Array.isArray(entry.outputStyles) ? entry.outputStyles : [entry.outputStyles],
        outputStylesPaths = await m6(outputStyleSpecs, resolvedPath, entry.name, pluginId, "output-styles", "Output style", "from marketplace entry", entryErrors);
      if (outputStylesPaths.length > 0) plugin.outputStylesPaths = [...(plugin.outputStylesPaths || []), ...outputStylesPaths];
    }
    let themesSpec = entry.experimental?.themes ?? entry.themes;
    if (themesSpec) {
      let themeSpecs = Array.isArray(themesSpec) ? themesSpec : [themesSpec],
        themesPaths = await m6(themeSpecs, resolvedPath, entry.name, pluginId, "themes", "Theme", "from marketplace entry", entryErrors);
      if (themesPaths.length > 0) plugin.themesPaths = [...(plugin.themesPaths || []), ...themesPaths];
    }
    if (entry.hooks) plugin.hooksConfig = {
      ...(plugin.hooksConfig || {}),
      ...entry.hooks
    };
  }
  if (recordWarnings) outerErrors.push(...entryErrors), outerWarnings.push(...warnings);
  return plugin;
}
/** Resolve the actual plugin root within a directory, unwrapping a single wrapper sub-directory if present. */
async function resolvePluginRoot(dir) {
  let entries = (await zu.readdir(dir, {
    withFileTypes: !0
  })).filter(entry => entry.name !== "__MACOSX" && entry.name !== ".DS_Store");
  if (entries.some(entry => entry.name === ".claude-plugin")) return dir;
  if (entries.length === 1 && entries[0].isDirectory() && (await Gu(ms.join(dir, entries[0].name, ".claude-plugin")))) return ms.join(dir, entries[0].name);
  return dir;
}
/** Load session-only plugins supplied via `--plugin-dir`/`--plugin-url` (path or downloaded zip). */
async function Lzp(sources) {
  if (sources.length === 0) return {
    plugins: [],
    errors: [],
    warnings: []
  };
  let enabledLookup = new Map(Object.entries($o().enabledPlugins ?? {}).map(([id, value]) => [id.toLowerCase(), value])),
    results = await Promise.all(sources.map(async (source, index) => {
      try {
        let pluginPath;
        if (source.kind === "url") {
          let downloadRoot = await F5t(),
            url = new URL(source.value),
            displayUrl = url.origin + url.pathname,
            baseName = ms.basename(url.pathname).replace(/\.zip$/i, "") || "download";
          pluginPath = ms.join(downloadRoot, `url-${index}-${baseName.replace(/[^a-zA-Z0-9\-_]/g, "-")}.zip`);
          try {
            let response = await fetch(source.value, {
              ...nT({
                url: source.value
              }),
              signal: AbortSignal.timeout(Ozp)
            });
            if (!response.ok || !response.body) throw Error(`HTTP ${response.status} ${response.statusText} from ${displayUrl}`);
            let contentLength = Number(response.headers.get("content-length"));
            if (contentLength > XGn) throw Error(`Plugin archive too large (${contentLength} bytes, max ${XGn}) from ${displayUrl}`);
            let bytesRead = 0,
              readable = Icl.Readable.fromWeb(response.body);
            readable.on("data", chunk => {
              if (bytesRead += chunk.byteLength, bytesRead > XGn) readable.destroy(Error(`Plugin archive exceeded ${XGn} bytes from ${displayUrl}`));
            });
            let partPath = `${pluginPath}.part`;
            await xcl.pipeline(readable, Hcl.createWriteStream(partPath)), await zu.rename(partPath, pluginPath), A(`Downloaded inline plugin from ${displayUrl}`);
          } catch (fetchErr) {
            if (!(await Gu(pluginPath))) throw fetchErr;
            A(`Re-fetch of inline plugin from ${displayUrl} failed; reusing cached ${pluginPath}`, {
              level: "warn"
            });
          }
        } else {
          pluginPath = ms.resolve(source.value);
          let statErrno;
          try {
            await zu.stat(pluginPath);
          } catch (statErr) {
            statErrno = cn(statErr) ?? "UNKNOWN";
          }
          let firstStatErrno = statErrno;
          if (statErrno !== void 0 && statErrno !== "ENOENT" && pluginPath.startsWith("/mnt/")) {
            await Kn(250);
            try {
              await zu.stat(pluginPath), A(`Plugin path ${pluginPath}: first stat failed with ${statErrno}, retry succeeded (transient mount race)`, {
                level: "warn"
              }), statErrno = void 0;
            } catch (statErr) {
              statErrno = cn(statErr) ?? "UNKNOWN";
            }
          }
          if (statErrno !== void 0) {
            let errno = statErrno !== "ENOENT" ? statErrno : firstStatErrno !== "ENOENT" ? firstStatErrno : void 0;
            return A(`Plugin path does not exist: ${pluginPath} (${statErrno}${errno && errno !== statErrno ? `, first ${errno}` : ""}), skipping`, {
              level: "warn"
            }), {
              plugin: void 0,
              errors: [{
                type: "path-not-found",
                source: `inline[${index}]`,
                path: pluginPath,
                component: "commands",
                ...(errno && {
                  errno
                })
              }],
              warnings: []
            };
          }
        }
        let isZip = pluginPath.toLowerCase().endsWith(".zip"),
          baseName = isZip ? ms.basename(pluginPath).replace(/\.zip$/i, "") : ms.basename(pluginPath);
        if (isZip) {
          let extractRoot = await F5t(),
            extractDir = ms.join(extractRoot, `inline-${index}-${baseName.replace(/[^a-zA-Z0-9\-_]/g, "-")}`);
          if (await zu.rm(extractDir, {
            recursive: !0,
            force: !0
          }), await xDe(pluginPath, extractDir), A(`Extracted inline plugin zip to ${extractDir}`), pluginPath = await resolvePluginRoot(extractDir), pluginPath !== extractDir) A(`Inline plugin zip had wrapper directory; using ${pluginPath}`);
        }
        let {
          plugin,
          errors,
          warnings
        } = await createPluginFromPath(pluginPath, `${baseName}@${KZ}`, !0, baseName);
        plugin.source = `${plugin.name}@${KZ}`, plugin.repository = `${plugin.name}@${KZ}`;
        let enabledValue = enabledLookup.get(plugin.source.toLowerCase());
        if (plugin.enabled = enabledValue !== void 0 ? enabledValue !== !1 : plugin.manifest.defaultEnabled !== !1, source.kind === "path" && source.skipMcpDiscovery) plugin.skipMcpDiscovery = !0, plugin.mcpServers = {};
        return A(`Loaded inline plugin from path: ${plugin.name}`), {
          plugin,
          errors,
          warnings
        };
      } catch (loadErr) {
        let stripQuery = value => value.replace(/\?[^\s"']*/g, ""),
          loadErrMsg = stripQuery(Ce(loadErr));
        return A(`Failed to load session plugin from ${source.kind === "url" ? stripQuery(source.value) : source.value}: ${loadErrMsg}`, {
          level: "warn"
        }), {
          plugin: void 0,
          errors: [{
            type: "generic-error",
            source: `inline[${index}]`,
            error: `Failed to load plugin: ${loadErrMsg}`
          }],
          warnings: []
        };
      }
    })),
    plugins = results.flatMap(result => result.plugin ? [result.plugin] : []),
    errors = results.flatMap(result => result.errors),
    warnings = results.flatMap(result => result.warnings);
  if (plugins.length > 0) A(`Loaded ${plugins.length} session-only plugins from --plugin-dir`);
  return {
    plugins,
    errors,
    warnings
  };
}
/** Load skills directories as plugins, deduplicating by name and recording trust/shadowing warnings. */
async function loadSkillsAsPlugins() {
  let skillDirs = await Upa(),
    suppressedProjectDirs = [],
    eligibleDirs = skillDirs.filter(dir => {
      if (dir.scope === "project" && !Mzp()) return suppressedProjectDirs.push(dir), !1;
      return !0;
    }),
    loadResults = await Z8(eligibleDirs, async ({
      dir,
      scope
    }) => {
      let dirName = ms.basename(dir);
      try {
        if (!(await zu.readdir(dir).catch(() => [])).includes(".claude-plugin")) return null;
        let {
          plugin,
          errors,
          warnings,
          hasManifest
        } = await createPluginFromPath(dir, `${dirName}@${tb}`, !0, dirName, !1);
        if (!Bpa(plugin, hasManifest)) return errors.length || warnings.length ? {
          plugin: null,
          errors,
          warnings
        } : null;
        if (plugin.source = `${plugin.name}@${tb}`, plugin.repository = plugin.source, plugin.scope = scope, scope === "project") {
          let monitorNames = (plugin.monitors ?? []).map((monitor, idx) => monitor.name ?? `#${idx + 1}`);
          if (monitorNames.length > 0) warnings.push({
            type: "project-scope-server-stripped",
            source: plugin.source,
            plugin: plugin.name,
            monitors: monitorNames,
            warning: `${Sn(monitorNames.length, "monitor")} (${monitorNames.join(", ")}) from project-scope plugin "${plugin.name}" ${Sn(monitorNames.length, "was", "were")} not armed \u2014 project-supplied monitors have no per-item approval flow.`
          });
          plugin.monitors = [];
        }
        return {
          plugin,
          errors,
          warnings
        };
      } catch (loadErr) {
        return {
          plugin: null,
          errors: [{
            type: "generic-error",
            source: `${dirName}@${tb}`,
            error: `Failed to load skill folder as plugin: ${Ce(loadErr)}`
          }],
          warnings: []
        };
      }
    }, {
      concurrency: 32
    }),
    errors = [],
    warnings = [],
    byName = new Map();
  for (let result of loadResults) {
    if (!result) continue;
    if (!result.plugin) {
      errors.push(...result.errors), warnings.push(...result.warnings);
      continue;
    }
    let existing = byName.get(result.plugin.name);
    if (existing) {
      let differentScope = existing.scope !== result.plugin.scope;
      errors.push({
        type: "generic-error",
        orphan: !0,
        source: `${ms.basename(result.plugin.path)}@${tb}`,
        error: differentScope ? `Not loaded \u2014 your ${displaySkillsDirPath(existing)} (same plugin name "${result.plugin.name}") shadowed the project's ${displaySkillsDirPath(result.plugin)}. To use the project's copy here, rename or move yours.` : `Not loaded \u2014 same plugin name "${result.plugin.name}" as ${displaySkillsDirPath(existing)} (which loaded instead). Delete ${displaySkillsDirPath(result.plugin)}, or give it a different "name" in its plugin.json.`
      });
      continue;
    }
    errors.push(...result.errors), warnings.push(...result.warnings), byName.set(result.plugin.name, result.plugin);
  }
  let plugins = [...byName.values()],
    enabledPlugins = $o().enabledPlugins ?? {};
  for (let plugin of plugins) {
    let enabledValue = enabledPlugins[plugin.source];
    plugin.enabled = enabledValue !== void 0 ? enabledValue !== !1 : plugin.manifest.defaultEnabled !== !1;
  }
  let suppressedWithPlugin = (await Z8(suppressedProjectDirs, async dir => {
    try {
      return await zu.readdir(ms.join(dir.dir, ".claude-plugin")), dir;
    } catch {
      return null;
    }
  }, {
    concurrency: 32
  })).filter(dir => dir !== null);
  if (suppressedWithPlugin.length > 0) {
    let count = suppressedWithPlugin.length;
    warnings.push({
      type: "project-scope-suppressed-untrusted",
      source: `(suppressed)@${tb}`,
      count,
      warning: `${count} project-scope plugin ${count === 1 ? "directory" : "directories"} under ./.claude/skills/ ${count === 1 ? "was" : "were"} not loaded because this workspace was not trusted when plugins were scanned. After accepting the trust dialog, run /reload-plugins (or relaunch) to load ${count === 1 ? "it" : "them"}.`
    });
  }
  if (W("tengu_plugin_skills_dir_loaded", {
    count: plugins.length,
    user_count: zn(plugins, plugin => plugin.scope === "user"),
    project_count: zn(plugins, plugin => plugin.scope === "project"),
    project_suppressed_count: suppressedWithPlugin.length,
    error_count: errors.length
  }), plugins.length > 0) A(`Loaded ${plugins.length} skills-as-plugins`);
  return {
    plugins,
    errors,
    warnings
  };
}
/** Whether the current workspace has accepted the trust dialog (gates project-scope skill plugins). */
function Mzp() {
  let cwd = gr(),
    projectKey = NK(zm(cwd) ?? cwd);
  return Ot().projects?.[projectKey]?.hasTrustDialogAccepted === !0;
}
/** Merge plugins from session / marketplace / skill / builtin sources, applying precedence and managed-settings locks. */
function mergePluginSources(sources) {
  let errors = [],
    managedNames = sources.managedNames,
    sessionPlugins = sources.session.filter(plugin => {
      if (managedNames?.has(plugin.name)) return A(`Plugin "${plugin.name}" from --plugin-dir is blocked by managed settings`, {
        level: "warn"
      }), errors.push({
        type: "generic-error",
        source: plugin.source,
        plugin: plugin.name,
        error: `--plugin-dir copy of "${plugin.name}" ignored: plugin is locked by managed settings`
      }), !1;
      return !0;
    }),
    sessionEnabledNames = new Set(sessionPlugins.filter(plugin => plugin.enabled !== !1).map(plugin => plugin.name)),
    marketplacePlugins = sources.marketplace.filter(plugin => {
      if (sessionEnabledNames.has(plugin.name)) return A(`Plugin "${plugin.name}" from --plugin-dir overrides installed version`), !1;
      return !0;
    }),
    skillPlugins = [];
  if (sources.skill?.length) {
    let takenNames = new Map();
    for (let plugin of marketplacePlugins) takenNames.set(plugin.name, `an installed plugin (${plugin.source})`);
    for (let name of sessionEnabledNames) takenNames.set(name, "a session-only plugin (--plugin-dir / --plugin-url)");
    skillPlugins = sources.skill.filter(plugin => {
      let takenBy = managedNames?.has(plugin.name) ? "managed settings" : takenNames.get(plugin.name);
      if (!takenBy) return !0;
      return errors.push({
        type: "generic-error",
        orphan: !0,
        source: `${ms.basename(plugin.path)}@${tb}`,
        error: `Not loaded \u2014 the name "${plugin.name}" is already taken by ${takenBy}, which takes precedence. Give the plugin at ${displaySkillsDirPath(plugin)} a different "name" (in plugin.json or SKILL.md frontmatter) to load this copy.`
      }), !1;
    });
  }
  return {
    plugins: [...sessionPlugins, ...marketplacePlugins, ...skillPlugins, ...sources.builtin],
    errors
  };
}
/** Assemble the full plugin load result for preview mode (cache-only, no side-effects). */
async function loadAllPluginsForPreview() {
  return ZEo(() => QEo({
    cacheOnly: !0
  }), {
    preview: !0
  });
}
/** Compute the `bin` directories of enabled non-builtin plugins, dropping any with shell metacharacters. */
async function getEnabledPluginBinPaths() {
  let {
    enabled
  } = await loadAllPluginsCacheOnly();
  return enabled.filter(plugin => !plugin.isBuiltin && plugin.path).map(plugin => ms.join(plugin.path, "bin")).filter(binPath => {
    if (ms.sep !== "\\" && /[:"'$`\\\n\r]/.test(binPath)) return A(`Dropping plugin bin path with shell metacharacters: ${binPath}`), !1;
    return !0;
  });
}
/**
 * Assemble the final plugin load result: run the marketplace loader together
 * with session and skill loaders, merge them, apply demotions, and (unless
 * preview / cwd changed mid-scan) run side-effects like caching settings and
 * recording telemetry.
 */
async function ZEo(marketplaceLoader, options) {
  let originalCwd = gr(),
    sessionSources = [...QV().map(value => ({
      kind: "path",
      value
    })), ...ZV().map(value => ({
      kind: "path",
      value,
      skipMcpDiscovery: !0
    })), ...kre().map(value => ({
      kind: "url",
      value
    })), ...Ear().map(value => ({
      kind: "path",
      value
    }))],
    emptyResult = {
      plugins: [],
      errors: [],
      warnings: []
    },
    [marketplaceResult, sessionResult, skillResult] = await Promise.all([marketplaceLoader(), sessionSources.length > 0 ? Lzp(sessionSources) : Promise.resolve(emptyResult), loadSkillsAsPlugins()]),
    builtins = b8r(),
    {
      plugins,
      errors: mergeErrors
    } = mergePluginSources({
      session: sessionResult.plugins,
      marketplace: marketplaceResult.plugins,
      skill: skillResult.plugins,
      builtin: [...builtins.enabled, ...builtins.disabled],
      managedNames: fI()
    }),
    errors = [...marketplaceResult.errors, ...sessionResult.errors, ...skillResult.errors, ...mergeErrors],
    warnings = [...marketplaceResult.warnings, ...sessionResult.warnings, ...skillResult.warnings],
    {
      demoted,
      errors: demoteErrors
    } = LNi(plugins);
  for (let plugin of plugins) if (demoted.has(plugin.source)) plugin.enabled = !1;
  errors.push(...demoteErrors);
  let enabledPlugins = plugins.filter(plugin => plugin.enabled);
  if (A(`Found ${plugins.length} plugins (${enabledPlugins.length} enabled, ${plugins.length - enabledPlugins.length} disabled)`), options?.preview) ;else if (originalCwd === gr()) {
    let enabledSources = new Set(enabledPlugins.map(plugin => plugin.source));
    for (let disable of Ovn()) if (enabledSources.has(disable.pluginId)) warnings.push({
      type: "ineffective-disable",
      source: disable.pluginId,
      overriddenBy: disable.overriddenBy
    });
    if (Nzp(enabledPlugins), cachePluginSettings(enabledPlugins), errors.length > 0 && plugins.length === 0) xe("plugin_load_all", "plugin_load_total_failure");else if (errors.length > 0) Pt("plugin_load_all", "plugin_load_partial_failures");else He("plugin_load_all");
  } else A("assemblePluginLoadResult: originalCwd changed mid-scan; skipping side-effects (stale early-kick)");
  return {
    enabled: enabledPlugins,
    disabled: plugins.filter(plugin => !plugin.enabled),
    errors,
    warnings
  };
}
/** Mark cached plugin directories that survived this scan as in-use (and clear stale orphan markers). */
async function Nzp(plugins) {
  let cacheRoot = getPluginCachePath(),
    cachedPaths = plugins.flatMap(plugin => {
      if (!plugin.path || plugin.path.endsWith(".zip")) return [];
      let rel = ms.relative(cacheRoot, plugin.path);
      if (!rel || rel.startsWith(`..${ms.sep}`) || rel === ".." || ms.isAbsolute(rel)) return [];
      return [plugin.path];
    });
  await Promise.all(cachedPaths.map(path => wll(path))), await kll(cachedPaths);
}
/** Invalidate the memoized plugin load caches (and dependent settings). */
function clearPluginCache(reason) {
  if (reason) A(`clearPluginCache: invalidating loadAllPlugins cache (${reason})`);
  if (loadAllPlugins.cache?.clear?.(), loadAllPluginsCacheOnly.cache?.clear?.(), QYt() !== void 0) C_();
  r6o();
}
/** Merge the `settings` of all enabled plugins into one object, last-write-wins per key. */
function Fzp(plugins) {
  let merged;
  for (let plugin of plugins) {
    if (!plugin.settings) continue;
    if (!merged) merged = {};
    for (let [key, value] of Object.entries(plugin.settings)) {
      if (key in merged) A(`Plugin "${plugin.name}" overrides setting "${key}" (previously set by another plugin)`);
      merged[key] = value;
    }
  }
  return merged;
}
/** Compute and cache the merged plugin settings. */
function cachePluginSettings(plugins) {
  let merged = Fzp(plugins);
  if (n6o(merged), merged && Object.keys(merged).length > 0) C_(), A(`Cached plugin settings with keys: ${Object.keys(merged).join(", ")}`);
}
/** Type guard: a plain (non-array) object. */
function Bzp(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var Hcl,
  zu,
  ms,
  Icl,
  xcl,
  Ezp,
  Izp,
  Ozp = 30000,
  XGn = 268435456,
  loadAllPlugins,
  loadAllPluginsCacheOnly;
var Eg = b(() => {
  Wi();
  BOt();
  lt();
  Bnt();
  mn();
  kt();
  tr();
  qe();
  Ir();
  Ct();
  Ii();
  Xl();
  D$r();
  ps();
  ia();
  vn();
  Tu();
  ey();
  C8r();
  br();
  lk();
  h3();
  tn();
  lr();
  pw();
  Gvn();
  Whe();
  XOt();
  Yvn();
  Z2e();
  rH();
  wEo();
  k8();
  dTe();
  dS();
  GEo();
  a1();
  oh();
  Qce();
  II();
  Acl();
  Y5t();
  bk();
  teo();
  jEo();
  DDe();
  Hcl = require("fs"), zu = require("fs/promises"), ms = require("path"), Icl = require("stream"), xcl = require("stream/promises");
  Ezp = new Set(["node_modules", ".orphaned_at", _ft]);
  Izp = ve(() => JN().pick(Object.fromEntries(Ccl.map(e => [e, !0]))).strip());
  loadAllPlugins = Hn(async () => {
    let e = await ZEo(() => QEo({
      cacheOnly: !1
    }));
    return loadAllPluginsCacheOnly.cache?.set(void 0, Promise.resolve(e)), e;
  }), loadAllPluginsCacheOnly = Hn(async () => {
    if (Ne.CLAUDE_CODE_SYNC_PLUGIN_INSTALL) return loadAllPlugins();
    return ZEo(() => QEo({
      cacheOnly: !0
    }));
  });
});

export {Gcl,displaySkillsDirPath,getPluginCachePath,getVersionedCachePathIn,getVersionedCachePath,cacheDirHasPluginContent,cacheMatchesDeclaredPaths,YEo,Azp,getVersionedZipCachePath,JEo,probeSeedCacheAnyVersion,getLegacyCachePath,resolvePluginPath,JGn,copyDir,copyPluginToVersionedCache,Pcl,installFromNpm,Lcl,gitClone,Ncl,vzp,wzp,installFromGitSubdir,kzp,generateTemporaryCacheNameForPlugin,cachePlugin,loadPluginManifest,Rcl,Hzp,resolveContainedPluginPath,m6,vcl,createPluginFromPath,wcl,xzp,kcl,QEo,Dzp,Pzp,Ucl,resolvePluginRoot,Lzp,loadSkillsAsPlugins,Mzp,mergePluginSources,loadAllPluginsForPreview,getEnabledPluginBinPaths,ZEo,Nzp,clearPluginCache,Fzp,cachePluginSettings,Bzp,Hcl,zu,ms,Icl,xcl,Ezp,Izp,Ozp,XGn,loadAllPlugins,loadAllPluginsCacheOnly,Eg as path};
