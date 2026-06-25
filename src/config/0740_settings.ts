// @ts-nocheck
import {fA,wm} from "../../vendor/m707.ts";
import {Fv,qK} from "../../vendor/m709.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {uM,ZEe} from "../../vendor/m710.ts";
import {JX,vyr} from "../../vendor/m637.ts";
import {Wt,Nd,ps} from "../../vendor/m230.ts";
import {cn,In,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Zqo,e6o,$qo,qqo,Xqo,Qqo,QYt,GH,XYt,C_,lk} from "../../vendor/m125.ts";
import {IN,tn} from "./0230_encoding.ts";
import {jpe,aYe,tvt} from "../../vendor/m738.ts";
import {WSr,JN,h3} from "../artifact/0736_allow.ts";
import {Wpe,PRt} from "../../vendor/m717.ts";
import {Ov,GN} from "../../vendor/m640.ts";
import {ba,pd} from "../../vendor/m706.ts";
import {or,dn} from "./0137_namespace.ts";
import {nt} from "../../vendor/m127.ts";
import {xon,Aas} from "../../vendor/m716.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {b} from "../../runtime.ts";
/**
 * Settings loading & merging for Claude Code.
 *
 * Resolves the ordered list of settings sources (user / project / local /
 * policy / flag), reads + validates each settings.json, and deep-merges them
 * into the effective configuration. Also handles managed (admin/policy)
 * settings coming from MDM, remote, parent, helper, and registry origins.
 */

/** Build the ordered list of active settings sources, always including the flag + policy tiers. */
function getActiveSettingsSources(options: any): any {
  let sources = new Set(options.allowedSources);
  return sources.add("flagSettings"), sources.add("policySettings"), fA.filter(source => sources.has(source));
}

/** Absolute path to the OS-managed policy settings file. */
function getManagedSettingsPath(): any {
  return _M.join(Fv(), "managed-settings.json");
}

/** Load managed/file settings, honoring WSL inheritance of Windows-side settings when applicable. */
function loadManagedFileSettings(options: any): any {
  if (Yt() === "wsl" && options.wslInherits?.()) {
    let wslResult = loadManagedFileSettingsFromDir(uM);
    if (wslResult.settings) return wslResult;
    let nativeResult = loadManagedFileSettingsFromDir(Fv());
    return {
      settings: nativeResult.settings,
      errors: [...wslResult.errors, ...nativeResult.errors]
    };
  }
  return loadManagedFileSettingsFromDir(Fv());
}

/** Read managed-settings.json plus the managed-settings.d directory from a base dir and merge them. */
function loadManagedFileSettingsFromDir(baseDir: any): any {
  let errors: any[] = [],
    merged: any = {},
    hasSettings = !1,
    {
      settings: rootSettings,
      errors: rootErrors
    } = O5(_M.join(baseDir, "managed-settings.json"), void 0, !0);
  if (errors.push(...rootErrors), rootSettings && Object.keys(rootSettings).length > 0) merged = JX(merged, rootSettings, settingsMergeCustomizer), hasSettings = !0;
  let dropInDir = _M.join(baseDir, "managed-settings.d");
  try {
    let fileNames = Wt().readdirSync(dropInDir).filter((entry: any) => (entry.isFile() || entry.isSymbolicLink()) && entry.name.endsWith(".json") && !entry.name.startsWith(".")).map((entry: any) => entry.name).sort();
    for (let fileName of fileNames) {
      let {
        settings: dropInSettings,
        errors: dropInErrors
      } = O5(_M.join(dropInDir, fileName), void 0, !0);
      if (errors.push(...dropInErrors), dropInSettings && Object.keys(dropInSettings).length > 0) merged = JX(merged, dropInSettings, settingsMergeCustomizer), hasSettings = !0;
    }
  } catch (err) {
    let code = cn(err);
    if (code !== "ENOENT" && code !== "ENOTDIR") A(`managed-settings.d read failed: ${err}`, {
      level: "error"
    });
  }
  let {
    wslInheritsWindowsSettings: wslInheritsWindowsSettings,
    ...withoutWslFlag
  } = merged;
  return {
    settings: hasSettings && Object.keys(withoutWslFlag).length > 0 ? merged : null,
    errors: errors
  };
}

/** Log a read failure for a settings file, distinguishing a broken symlink from a generic read error. */
function logSettingsReadError(err: any, path: any): void {
  if (In(err)) A(`Broken symlink or missing file encountered for settings.json at path: ${path}`);else A(`settings file read failed at ${path}: ${err}`, {
    level: "error"
  });
}

/** Read + parse a settings file, using the cache when available. */
function O5(path: any, expectedContent: any, allowManaged: any): any {
  let cached = Zqo(path);
  if (cached) return {
    settings: cached.settings ? IN(cached.settings) : null,
    errors: cached.errors
  };
  let parsed = parseSettingsFileUncached(path, expectedContent, allowManaged);
  return e6o(path, parsed), {
    settings: parsed.settings ? IN(parsed.settings) : null,
    errors: parsed.errors
  };
}

/** Read MDM-provided settings, if a provider is present. */
function getMdmSettings(options: any): any {
  if (!options.mdm) return {
    settings: null,
    errors: []
  };
  let mdmResult = options.mdm();
  return {
    settings: Object.keys(mdmResult.settings).length > 0 ? mdmResult.settings : null,
    errors: mdmResult.errors
  };
}

/** Validate an already-parsed managed settings object, collecting warning-level issues. */
function validateManagedSettings(rawSettings: any, fileLabel: any): any {
  let normalized = IN(rawSettings),
    preErrors = jpe(normalized, fileLabel, {
      skipMcpServerEntryFilter: !0
    }),
    warnings: any[] = [],
    parseResult = WSr((issue: any) => warnings.push({
      file: fileLabel,
      path: issue.path,
      message: issue.message,
      severity: "warning"
    })).safeParse(normalized);
  if (!parseResult.success) return {
    settings: null,
    errors: [...preErrors, ...aYe(parseResult.error, fileLabel)]
  };
  return {
    settings: Object.keys(parseResult.data).length > 0 ? parseResult.data : null,
    errors: [...preErrors, ...warnings]
  };
}

/** Resolve remote managed settings from the options provider (or the global remote source). */
function getRemoteManagedSettings(options: any): any {
  let remoteSettings = options?.remote ? options.remote() : Wpe();
  if (!remoteSettings || Object.keys(remoteSettings).length === 0) return {
    settings: null,
    errors: []
  };
  return validateManagedSettings(remoteSettings, "remote managed settings");
}

/** Resolve parent-managed settings, if any. */
function getParentManagedSettings(options: any): any {
  let parentSettings = options.parentManaged;
  if (!parentSettings || Object.keys(parentSettings).length === 0) return {
    settings: null,
    errors: []
  };
  return validateManagedSettings(parentSettings, "parent managed settings");
}

/** Resolve SDK inline settings supplied via flag. */
function getFlagInlineSettings(options: any): any {
  let inlineSettings = options.flagInline;
  if (!inlineSettings) return {
    settings: null,
    errors: []
  };
  let normalized = IN(inlineSettings),
    preErrors = jpe(normalized, "SDK inline settings"),
    parseResult = JN().safeParse(normalized);
  if (!parseResult.success) return {
    settings: null,
    errors: [...preErrors, ...aYe(parseResult.error, "SDK inline settings")]
  };
  return {
    settings: parseResult.data,
    errors: preErrors
  };
}

/** Read, parse, and validate a settings file from disk (cache miss path). */
function parseSettingsFileUncached(path: any, expectedContent: any, allowManaged: any): any {
  try {
    let rawText: any;
    if (expectedContent !== void 0) rawText = expectedContent;else {
      let {
        resolvedPath: resolvedPath
      } = Nd(Wt(), path);
      rawText = Ov(resolvedPath);
    }
    if (rawText.trim() === "") return {
      settings: {},
      errors: []
    };
    let parsed = IN(ba(rawText, !1));
    if (allowManaged) {
      let managedPreErrors = jpe(parsed, path, {
          skipMcpServerEntryFilter: !0
        }),
        managedWarnings: any[] = [],
        managedResult = WSr((issue: any) => managedWarnings.push({
          file: path,
          path: issue.path,
          message: issue.message,
          severity: "warning"
        })).safeParse(parsed);
      if (!managedResult.success) return {
        settings: null,
        errors: [...managedPreErrors, ...aYe(managedResult.error, path)]
      };
      return {
        settings: managedResult.data,
        errors: [...managedPreErrors, ...managedWarnings]
      };
    }
    let preErrors = jpe(parsed, path),
      parseResult = JN().safeParse(parsed);
    if (!parseResult.success) {
      let schemaErrors = aYe(parseResult.error, path);
      return {
        settings: null,
        errors: [...preErrors, ...schemaErrors]
      };
    }
    return {
      settings: parseResult.data,
      errors: preErrors
    };
  } catch (err) {
    if (logSettingsReadError(err, path), In(err)) return {
      settings: null,
      errors: []
    };
    return {
      settings: null,
      errors: [{
        file: path,
        path: "",
        message: `Settings file could not be read: ${err instanceof Error ? err.message : String(err)}`,
        severity: "fatal"
      }]
    };
  }
}

/** Resolve the base directory for a given settings source. */
function getSettingsSourceDir(source: any, options: any): any {
  switch (source) {
    case "userSettings":
      return _M.resolve(or());
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      return _M.resolve(options.cwd);
    case "flagSettings":
      return options.flagPath ? _M.dirname(_M.resolve(options.flagPath)) : _M.resolve(options.cwd);
  }
}

/** Pick the user settings filename (cowork variant when the cowork-plugins flag is set). */
function getUserSettingsFileName(options: any): any {
  if (options.coworkPlugins || nt(process.env.CLAUDE_CODE_USE_COWORK_PLUGINS)) return "cowork_settings.json";
  return "settings.json";
}

/** Resolve the absolute settings file path for a given source. */
function getSettingsFilePathForSource(source: any, options: any): any {
  switch (source) {
    case "userSettings":
      return _M.join(getSettingsSourceDir(source, options), getUserSettingsFileName(options));
    case "projectSettings":
    case "localSettings":
      return _M.join(getSettingsSourceDir(source, options), getRelativeSettingsFilePathForSource(source));
    case "policySettings":
      return getManagedSettingsPath();
    case "flagSettings":
      return options.flagPath;
  }
}

/** Relative path under .claude for project/local settings. */
function getRelativeSettingsFilePathForSource(source: any): any {
  switch (source) {
    case "projectSettings":
      return _M.join(".claude", "settings.json");
    case "localSettings":
      return _M.join(".claude", "settings.local.json");
  }
}

/** Get the settings object for a source, using the cache when available. */
function getSettingsForSource(source: any, options: any): any {
  let cached = $qo(source);
  if (cached !== void 0) return cached;
  let computed = computeSettingsForSource(source, options);
  return qqo(source, computed), computed;
}

/** Whether the parent settings tier should be merged in based on its behavior flag. */
function shouldIncludeParentTier(adminSettings: any): any {
  return !adminSettings || adminSettings.parentSettingsBehavior === "merge";
}

/** Extract only the restrictive (security-tightening) fields a parent tier is allowed to contribute. */
function keepRestrictiveFromParent(parentSettings: any, adminAggregate: any): any {
  let restrictive: any = {};
  if (parentSettings.allowManagedHooksOnly === !0) restrictive.allowManagedHooksOnly = !0;
  if (parentSettings.allowManagedMcpServersOnly === !0) restrictive.allowManagedMcpServersOnly = !0;
  if (parentSettings.disableClaudeAiConnectors === !0) restrictive.disableClaudeAiConnectors = !0;
  if (parentSettings.allowManagedPermissionRulesOnly === !0) restrictive.allowManagedPermissionRulesOnly = !0;
  let strictPluginOnly = parentSettings.strictPluginOnlyCustomization;
  if (strictPluginOnly === !0 || Array.isArray(strictPluginOnly) && strictPluginOnly.length > 0) restrictive.strictPluginOnlyCustomization = strictPluginOnly;
  if (parentSettings.deniedMcpServers) restrictive.deniedMcpServers = parentSettings.deniedMcpServers;
  if (adminAggregate.forceLoginOrgUUID === void 0 && parentSettings.forceLoginOrgUUID) restrictive.forceLoginOrgUUID = parentSettings.forceLoginOrgUUID;
  if (adminAggregate.allowedMcpServers === void 0 && parentSettings.allowedMcpServers) restrictive.allowedMcpServers = parentSettings.allowedMcpServers;
  if (adminAggregate.availableModels === void 0 && parentSettings.availableModels) restrictive.availableModels = parentSettings.availableModels;
  if (parentSettings.enforceAvailableModels === !0) restrictive.enforceAvailableModels = !0;
  if (parentSettings.permissions) {
    let permissions = xon(parentSettings.permissions, ["deny", "ask"]);
    if (parentSettings.permissions.disableBypassPermissionsMode === "disable") permissions.disableBypassPermissionsMode = "disable";
    if (adminAggregate.allowManagedPermissionRulesOnly !== !0) {
      let {
        allow: allow,
        additionalDirectories: additionalDirectories
      } = parentSettings.permissions;
      if (allow && adminAggregate.sandbox?.network?.allowManagedDomainsOnly !== !0) permissions.allow = allow;
      if (additionalDirectories) permissions.additionalDirectories = additionalDirectories;
    }
    if (Object.keys(permissions).length > 0) restrictive.permissions = permissions;
  }
  if (parentSettings.sandbox) {
    let {
        network: network,
        filesystem: filesystem,
        credentials: credentials
      } = parentSettings.sandbox,
      sandbox: any = {};
    if (parentSettings.sandbox.enabled === !0) sandbox.enabled = !0;
    if (parentSettings.sandbox.failIfUnavailable === !0) sandbox.failIfUnavailable = !0;
    if (parentSettings.sandbox.allowUnsandboxedCommands === !1) sandbox.allowUnsandboxedCommands = !1;
    if (parentSettings.sandbox.autoAllowBashIfSandboxed === !1) sandbox.autoAllowBashIfSandboxed = !1;
    if (network) {
      let networkSlice = xon(network, ["deniedDomains"]);
      if (network.allowManagedDomainsOnly === !0) networkSlice.allowManagedDomainsOnly = !0;
      if (adminAggregate.sandbox?.network?.allowManagedDomainsOnly !== !0 && network.allowedDomains) networkSlice.allowedDomains = network.allowedDomains;
      if (Object.keys(networkSlice).length > 0) sandbox.network = networkSlice;
    }
    if (filesystem) {
      let filesystemSlice = xon(filesystem, ["denyRead", "denyWrite"]);
      if (filesystem.allowManagedReadPathsOnly === !0) filesystemSlice.allowManagedReadPathsOnly = !0;
      if (adminAggregate.sandbox?.filesystem?.allowManagedReadPathsOnly !== !0 && filesystem.allowRead) filesystemSlice.allowRead = filesystem.allowRead;
      if (Object.keys(filesystemSlice).length > 0) sandbox.filesystem = filesystemSlice;
    }
    if (credentials) {
      let deniedFiles = (credentials.files ?? []).filter((entry: any) => entry.mode === "deny"),
        deniedEnvVars = (credentials.envVars ?? []).filter((entry: any) => entry.mode === "deny");
      if (deniedFiles.length > 0 || deniedEnvVars.length > 0) sandbox.credentials = {
        ...(deniedFiles.length > 0 && {
          files: deniedFiles
        }),
        ...(deniedEnvVars.length > 0 && {
          envVars: deniedEnvVars
        })
      };
    }
    if (Object.keys(sandbox).length > 0) restrictive.sandbox = sandbox;
  }
  return restrictive;
}

/** Get the ordered admin/policy settings tiers, using the cache when available. */
function getAdminPolicyTiers(options: any): any {
  let cached = Xqo();
  if (cached !== void 0) return cached;
  let computed = computeAdminPolicyTiers(options);
  return Qqo(computed), computed;
}

/** Whether an origin label denotes an admin-controlled policy source. */
function isAdminPolicyOrigin(origin: any): any {
  return origin === "helper" || origin === "plist" || origin === "hklm" || origin === "file";
}

/** Determine the effective admin-policy origin label for the current environment. */
function resolveAdminPolicyOrigin(options: any): any {
  if (options.helper?.()) return "helper";
  if (getRemoteManagedSettings(options).settings) return "remote";
  if (getMdmSettings(options).settings) return Yt() === "macos" ? "plist" : "hklm";
  if ((options.file?.() ?? loadManagedFileSettings(options)).settings) return "file";
  if (collectAdminPolicySettings(options).parentSlice) return "parent";
  let hkcu = options.hkcu?.();
  return hkcu && Object.keys(hkcu.settings).length > 0 ? "hkcu" : null;
}

/** Collect remote/MDM/file/parent managed tiers, derive the admin aggregate and the parent slice. */
function collectAdminPolicySettings(options: any): any {
  let errors: any[] = [],
    {
      settings: remoteSettings,
      errors: remoteErrors
    } = getRemoteManagedSettings(options);
  errors.push(...remoteErrors);
  let {
    settings: mdmSettings,
    errors: mdmErrors
  } = getMdmSettings(options);
  errors.push(...mdmErrors);
  let {
    settings: fileSettings,
    errors: fileErrors
  } = options.file?.() ?? loadManagedFileSettings(options);
  errors.push(...fileErrors);
  let {
    settings: parentSettings,
    errors: parentErrors
  } = getParentManagedSettings(options);
  errors.push(...parentErrors);
  let tiers = [remoteSettings, mdmSettings, fileSettings].filter((tier: any) => tier !== null),
    adminSettings = tiers[0] ?? null,
    adminAggregate = {
      allowManagedPermissionRulesOnly: tiers.some((tier: any) => tier.allowManagedPermissionRulesOnly === !0) || void 0,
      forceLoginOrgUUID: tiers.find((tier: any) => tier.forceLoginOrgUUID !== void 0)?.forceLoginOrgUUID,
      allowedMcpServers: tiers.find((tier: any) => tier.allowedMcpServers !== void 0)?.allowedMcpServers,
      availableModels: tiers[0]?.availableModels,
      sandbox: {
        network: {
          allowManagedDomainsOnly: tiers.some((tier: any) => tier.sandbox?.network?.allowManagedDomainsOnly === !0) || void 0
        },
        filesystem: {
          allowManagedReadPathsOnly: tiers.some((tier: any) => tier.sandbox?.filesystem?.allowManagedReadPathsOnly === !0) || void 0
        }
      }
    },
    parentRestrictive = parentSettings && shouldIncludeParentTier(adminSettings) ? keepRestrictiveFromParent(parentSettings, adminAggregate) : null,
    parentSlice = parentRestrictive && Object.keys(parentRestrictive).length > 0 ? parentRestrictive : null;
  return {
    tiers: tiers,
    admin: adminSettings,
    parentSlice: parentSlice,
    errors: errors
  };
}

/** Compute the ordered admin policy tiers (helper short-circuit, else collected tiers + parent slice). */
function computeAdminPolicyTiers(options: any): any {
  let helperSettings = options.helper?.();
  if (helperSettings) return [helperSettings];
  let {
    tiers: tiers,
    parentSlice: parentSlice
  } = collectAdminPolicySettings(options);
  return parentSlice ? [...tiers, parentSlice] : tiers;
}

/** Resolve the merged policy settings object (helper > admin+parent > registry-HKCU). */
function getPolicySettings(options: any): any {
  let helperSettings = options.helper?.();
  if (helperSettings) return {
    settings: helperSettings,
    errors: options.helperWarnings?.() ?? []
  };
  let {
    admin: adminSettings,
    parentSlice: parentSlice,
    errors: errors
  } = collectAdminPolicySettings(options);
  if (!adminSettings && !parentSlice) {
    let hkcu = options.hkcu?.();
    if (hkcu && Object.keys(hkcu.settings).length > 0) return {
      settings: hkcu.settings,
      errors: [...errors, ...hkcu.errors]
    };
    return {
      settings: null,
      errors: [...errors, ...(hkcu?.errors ?? [])]
    };
  }
  return {
    settings: JX({}, parentSlice ?? {}, adminSettings ?? {}, settingsMergeCustomizer),
    errors: errors
  };
}

/** Compute the settings object for a single source (cache miss path). */
function computeSettingsForSource(source: any, options: any): any {
  if (source === "policySettings") return getPolicySettings(options).settings;
  let filePath = getSettingsFilePathForSource(source, options),
    {
      settings: fileSettings
    } = filePath ? O5(filePath, source === "flagSettings" ? options.flagExpectedContent : void 0) : {
      settings: null
    };
  if (source === "flagSettings") {
    let {
      settings: inlineSettings
    } = getFlagInlineSettings(options);
    if (inlineSettings) return JX(fileSettings || {}, inlineSettings, settingsMergeCustomizer);
  }
  return fileSettings;
}

/** Concatenate + dedupe two arrays during a settings merge. */
function mergeAndDedupeArrays(left: any, right: any): any {
  return os([...left, ...right]);
}

/** Customizer for the deep merge: union arrays (except fallbackModel, which is replaced). */
function settingsMergeCustomizer(left: any, right: any, key: any): any {
  if (Array.isArray(left) && Array.isArray(right)) {
    if (key === "fallbackModel") return right;
    return mergeAndDedupeArrays(left, right);
  }
  return;
}

/** Load and deep-merge all active settings sources into the effective configuration (guarded against reentrancy). */
function loadEffectiveSettings(options: any): any {
  if (isLoadingSettings) return {
    settings: {},
    errors: []
  };
  let startTime = Date.now();
  wn("info", "settings_load_started"), isLoadingSettings = !0;
  try {
    let baseSettings = QYt(),
      merged: any = {};
    if (baseSettings) merged = JX(merged, baseSettings, settingsMergeCustomizer);
    let errors: any[] = [],
      seenErrorKeys = new Set(),
      seenPaths = new Set(),
      policySettings = null;
    for (let source of getActiveSettingsSources(options)) {
      if (source === "policySettings") {
        let {
          settings: policyResult,
          errors: policyErrors
        } = getPolicySettings(options);
        if (policySettings = policyResult, policyResult) merged = JX(merged, policyResult, settingsMergeCustomizer);
        for (let error of policyErrors) {
          let errorKey = `${error.file}:${error.path}:${error.message}`;
          if (!seenErrorKeys.has(errorKey)) seenErrorKeys.add(errorKey), errors.push(error);
        }
        continue;
      }
      let filePath = getSettingsFilePathForSource(source, options);
      if (filePath) {
        let resolvedPath = _M.resolve(filePath);
        if (!seenPaths.has(resolvedPath)) {
          seenPaths.add(resolvedPath);
          let {
            settings: fileSettings,
            errors: fileErrors
          } = O5(filePath, source === "flagSettings" ? options.flagExpectedContent : void 0);
          for (let error of fileErrors) {
            let errorKey = `${error.file}:${error.path}:${error.message}`;
            if (!seenErrorKeys.has(errorKey)) seenErrorKeys.add(errorKey), errors.push(error);
          }
          if (fileSettings) merged = JX(merged, fileSettings, settingsMergeCustomizer);
        }
      }
      if (source === "flagSettings") {
        let {
          settings: inlineSettings,
          errors: inlineErrors
        } = getFlagInlineSettings(options);
        for (let error of inlineErrors) {
          let errorKey = `${error.file}:${error.path}:${error.message}`;
          if (!seenErrorKeys.has(errorKey)) seenErrorKeys.add(errorKey), errors.push(error);
        }
        if (inlineSettings) merged = JX(merged, inlineSettings, settingsMergeCustomizer);
      }
    }
    if (policySettings) {
      if (policySettings.availableModels !== void 0) merged.availableModels = [...policySettings.availableModels];
      if (policySettings.enforceAvailableModels !== void 0) merged.enforceAvailableModels = policySettings.enforceAvailableModels;
    }
    return wn("info", "settings_load_completed", {
      duration_ms: Date.now() - startTime,
      source_count: seenPaths.size,
      error_count: errors.length
    }), {
      settings: merged,
      errors: errors
    };
  } finally {
    isLoadingSettings = !1;
  }
}

/** Return cached effective settings, computing + caching them on first call. */
function getEffectiveSettings(options: any): any {
  let cached = GH();
  if (cached !== null) return cached;
  let computed = loadEffectiveSettings(options);
  return XYt(computed), computed;
}

/** Get just the effective settings object (empty object when none). */
function getEffectiveSettingsObject(options: any): any {
  let {
    settings: settings
  } = getEffectiveSettings(options);
  return settings || {};
}

/** Return the effective settings plus the per-source breakdown of non-empty contributions. */
function getSettingsWithSources(options: any): any {
  C_();
  let sources: any[] = [];
  for (let source of getActiveSettingsSources(options)) {
    let settings = getSettingsForSource(source, options);
    if (settings && Object.keys(settings).length > 0) sources.push({
      source: source,
      settings: settings
    });
  }
  return {
    effective: getEffectiveSettingsObject(options),
    sources: sources
  };
}

/** Find the highest-priority source that defines a given settings key. */
function findSourceForSettingsKey(key: any, options: any): any {
  let sources = getActiveSettingsSources(options);
  for (let index = sources.length - 1; index >= 0; index--) {
    let source = sources[index];
    if (getSettingsForSource(source, options)?.[key] !== void 0) return source;
  }
  return null;
}
var _M: any,
  isLoadingSettings = !1;
var eNe = b(() => {
  vyr();
  Aas();
  PRt();
  qe();
  pf();
  dn();
  Ct();
  GN();
  ps();
  pd();
  Es();
  tn();
  wm();
  qK();
  ZEe();
  lk();
  h3();
  tvt();
  _M = require("path");
});

export {getActiveSettingsSources as rvt,getManagedSettingsPath as Blu,loadManagedFileSettings as ovt,loadManagedFileSettingsFromDir,logSettingsReadError as handleFileSystemError,O5 as parseSettingsFile,getMdmSettings as Nls,validateManagedSettings as cCe,getRemoteManagedSettings as uCe,getParentManagedSettings as hsn,getFlagInlineSettings as Fls,parseSettingsFileUncached,getSettingsSourceDir as fsn,getUserSettingsFileName as Ulu,getSettingsFilePathForSource as dCe,getRelativeSettingsFilePathForSource,getSettingsForSource as gsn,shouldIncludeParentTier,keepRestrictiveFromParent,getAdminPolicyTiers as Bls,isAdminPolicyOrigin,resolveAdminPolicyOrigin as _sn,collectAdminPolicySettings as JSr,computeAdminPolicyTiers as $lu,getPolicySettings as Uls,computeSettingsForSource as XSr,mergeAndDedupeArrays as qlu,settingsMergeCustomizer,loadEffectiveSettings as QSr,getEffectiveSettings as Wlu,getEffectiveSettingsObject as Glu,getSettingsWithSources as $ls,findSourceForSettingsKey as qls,_M,isLoadingSettings as KSr,eNe};
