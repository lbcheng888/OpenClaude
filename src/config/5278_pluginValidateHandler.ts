// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {VALID_UPDATE_SCOPES as hWe,VALID_INSTALLABLE_SCOPES as vx,Iht,Pht} from "../../vendor/m4707.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Ce,Jo,Ct} from "../../vendor/m197.ts";
import {Rs,fOe,_N} from "../../vendor/m5161.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {setUseCoworkPlugins as OU,lt} from "../session/0132_sent.ts";
import {DWt,ezn,kEl,tzn} from "../../vendor/m4721.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {py,i0e} from "../../vendor/m3768.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {nzn,OWt,rzn,Nwo} from "../../vendor/m4722.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {dGl,YKt,pGl,mGl,q1o} from "../tools/5277_name.ts";
import {Oit,kPn,II} from "../../vendor/m3268.ts";
import {WP,Tu} from "../../vendor/m649.ts";
import {or,dn} from "./0137_namespace.ts";
import {fli,xse,KQ} from "../../vendor/m2039.ts";
import {tb,ts,EI,AD,gNi,oh} from "../../vendor/m2600.ts";
import {getSettings_DEPRECATED as $o,br} from "./0745_updateSettingsForSource.ts";
import {fI,k8} from "../../vendor/m2238.ts";
import {tP,$m,FDe,q5t,bft,sne,ncl,dS} from "./4460_source.ts";
import {V2e,Bnt} from "../../vendor/m2596.ts";
import {t_,fT,EO,Q8} from "../../vendor/m2594.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Uw,rq,rH} from "./4461_operation.ts";
import {mWe,ebl} from "../../vendor/m4693.ts";
import {loadAllPlugins as BC,displaySkillsDirPath as qDe,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {vee,IHe} from "./3152_i.ts";
import {Sht,RWt} from "../../vendor/m4697.ts";
import {nne,KY,dTe} from "../../vendor/m4457.ts";
import {I7n,two} from "../../vendor/m4695.ts";
import {zh,c6} from "../../vendor/m4456.ts";
import {Le,Bo} from "../../vendor/m5.ts";
import {ep} from "../../vendor/m2223.ts";
import {ITe,bPe} from "../../vendor/m4694.ts";
import {Uie,Whe} from "../../vendor/m2607.ts";
import {nGl,oGl,sGl,DOe,lGl,aGl,cGl,$1o} from "../telemetry/5276_level.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "./3348_flushAnalyticsSinks.ts";
import {n$,slowOpTracer as pw} from "../telemetry/2606_skill_name.ts";
import {Rwo,aEl} from "../../vendor/m4714.ts";
import {Xo,AWo} from "../../vendor/m240.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {yT} from "../../vendor/m3150.ts";
import {je} from "../../vendor/m2462.ts";
import {IA} from "../telemetry/2225_names.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Plugin and marketplace CLI command handlers.
 *
 * Implements the `claude plugin ...` and `claude marketplace ...` subcommands:
 * validate, tag, init, list, install, uninstall, prune, enable, disable, update,
 * details, and marketplace add/list/remove/update. Each handler renders Ink/React
 * output and exits the process with an appropriate status code.
 */
var dU = {};
ft(dU, {
  pluginValidateHandler: () => pluginValidateHandler,
  pluginUpdateHandler: () => pluginUpdateHandler,
  pluginUninstallHandler: () => pluginUninstallHandler,
  pluginTagHandler: () => pluginTagHandler,
  pluginPruneHandler: () => pluginPruneHandler,
  pluginListHandler: () => pluginListHandler,
  pluginInstallHandler: () => pluginInstallHandler,
  pluginInitHandler: () => pluginInitHandler,
  pluginEnableHandler: () => pluginEnableHandler,
  pluginDisableHandler: () => pluginDisableHandler,
  pluginDetailsHandler: () => pluginDetailsHandler,
  marketplaceUpdateHandler: () => marketplaceUpdateHandler,
  marketplaceRemoveHandler: () => marketplaceRemoveHandler,
  marketplaceListHandler: () => marketplaceListHandler,
  marketplaceAddHandler: () => marketplaceAddHandler,
  handleMarketplaceError: () => handleMarketplaceError,
  VALID_UPDATE_SCOPES: () => hWe,
  VALID_INSTALLABLE_SCOPES: () => vx
});
/**
 * Report a marketplace operation failure to logs and the terminal.
 * @param error the thrown error
 * @param action human-readable action label, e.g. "add marketplace"
 */
function handleMarketplaceError(error: unknown, action: string) {
  A(`Failed to ${action}: ${Ce(error)}`, {
    level: "error"
  }), Rs(`${Xe.cross} Failed to ${action}: ${Ce(error)}`);
}
/**
 * Build human-readable lines for a validation result's errors and warnings.
 * @param validationResult result carrying `errors` and `warnings` arrays
 * @returns formatted output lines
 */
function W1o(validationResult) {
  let lines: string[] = [];
  if (validationResult.errors.length > 0) lines.push(`${Xe.cross} Found ${validationResult.errors.length} ${Sn(validationResult.errors.length, "error")}:`, ""), validationResult.errors.forEach(issue => {
    lines.push(`  ${Xe.pointer} ${issue.path}: ${issue.message}`);
  }), lines.push("");
  if (validationResult.warnings.length > 0) lines.push(`${Xe.warning} Found ${validationResult.warnings.length} ${Sn(validationResult.warnings.length, "warning")}:`, ""), validationResult.warnings.forEach(issue => {
    lines.push(`  ${Xe.pointer} ${issue.path}: ${issue.message}`);
  }), lines.push("");
  return lines;
}
/**
 * `claude plugin validate <path>` — validate a plugin/marketplace manifest.
 * @param app Ink app instance providing render/waitUntilExit
 * @param targetPath manifest or plugin path to validate
 * @param options command options (`cowork`, `strict`, ...)
 */
async function pluginValidateHandler(app, targetPath, options) {
  if (options.cowork) OU(!0);
  let primaryResult,
    relatedResults = [];
  try {
    if (primaryResult = await DWt(targetPath), primaryResult.fileType === "plugin") {
      let manifestDir = mV.dirname(primaryResult.filePath);
      if (mV.basename(manifestDir) === ".claude-plugin") relatedResults = await ezn(mV.dirname(manifestDir));
    }
  } catch (validationError) {
    if (xe("cli_plugin_validate", "cli_plugin_validate_exception"), Jo(validationError)) A(`Plugin validation failed for ${targetPath}: ${Ce(validationError)}`, {
      level: "error"
    });else Ie(validationError);
    console.error(`${Xe.cross} Unexpected error during validation: ${Ce(validationError)}`), process.exit(2);
    return;
  }
  let {
      allSuccess: allSuccess,
      noErrors: noErrors,
      hasWarnings: hasWarnings
    } = kEl([primaryResult, ...relatedResults], options),
    outputLines = [`Validating ${primaryResult.fileType} manifest: ${primaryResult.filePath}`, "", ...W1o(primaryResult)];
  for (let related of relatedResults) outputLines.push(`Validating ${related.fileType}: ${related.filePath}`, ""), outputLines.push(...W1o(related));
  if (allSuccess) outputLines.push(hasWarnings ? `${Xe.tick} Validation passed with warnings` : `${Xe.tick} Validation passed`);else if (noErrors && hasWarnings) outputLines.push(`${Xe.cross} Validation failed (--strict treats warnings as errors)`);else outputLines.push(`${Xe.cross} Validation failed`);
  if (allSuccess) He("cli_plugin_validate");else Pt("cli_plugin_validate", "cli_plugin_validate_failed");
  app.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: outputLines.join(`
`)
    })
  })), await app.waitUntilExit(), process.exit(allSuccess ? 0 : 1);
}
/**
 * `claude plugin tag [path]` — create (and optionally push) a git tag for a plugin.
 * @param app Ink app instance
 * @param targetPath plugin directory (defaults to ".")
 * @param options tag options (`force`, `remote`, `message`, `dryRun`, `push`)
 */
async function pluginTagHandler(app, targetPath, options) {
  let prepareResult = await nzn(targetPath ?? ".", {
      force: options.force
    }),
    outputLines = [];
  for (let warning of prepareResult.warnings) outputLines.push(`${Xe.warning} ${warning}`);
  if (!prepareResult.ok) {
    xe("cli_plugin_tag", "cli_plugin_tag_prepare_failed"), outputLines.push(`${Xe.cross} ${prepareResult.error}`), MJ(app, outputLines, 1);
    return;
  }
  let {
    plan: plan
  } = prepareResult;
  if (outputLines.push(`Plugin:  ${plan.pluginName}`, `Version: ${plan.version} (from ${plan.versionFrom})`), plan.marketplace) outputLines.push(`Marketplace entry: plugins[${plan.marketplace.entryIndex}] in ${plan.marketplace.path}` + (plan.marketplace.entryVersion ? ` (version: ${plan.marketplace.entryVersion})` : ""));
  outputLines.push(`Tag:     ${plan.tag}`, "");
  let remote = options.remote ?? "origin",
    force = options.force ?? !1,
    tagMessage = OWt(plan, options.message),
    pushCommand = `git -C ${plan.gitRoot} push ${force ? "--force " : ""}${remote} refs/tags/${plan.tag}`;
  if (options.dryRun) {
    He("cli_plugin_tag"), outputLines.push(`${Xe.tick} Dry run — would create tag ${plan.tag} at HEAD in ${plan.gitRoot}`, `  git -C ${plan.gitRoot} tag ${force ? "-f " : ""}-a ${plan.tag} -m ${Pe(tagMessage)}`, `  ${pushCommand}`), MJ(app, outputLines, 0);
    return;
  }
  let tagResult = await rzn(plan, {
    push: options.push ?? !1,
    force: force,
    message: options.message,
    remote: remote
  });
  if (!tagResult.ok) {
    xe("cli_plugin_tag", "cli_plugin_tag_create_failed"), outputLines.push(`${Xe.cross} ${tagResult.error}`), MJ(app, outputLines, 1);
    return;
  }
  if (He("cli_plugin_tag"), outputLines.push(`${Xe.tick} Created tag ${plan.tag}`), tagResult.pushed) outputLines.push(`${Xe.tick} Pushed to ${remote}`);else outputLines.push(`  Push with: ${pushCommand}`);
  MJ(app, outputLines, 0);
}
/**
 * Render output lines and exit with the given status code.
 * @param app Ink app instance
 * @param lines text lines to render
 * @param exitCode process exit code
 */
function MJ(app, lines, exitCode) {
  app.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: lines.join(`
`)
    })
  })), app.waitUntilExit().then(() => process.exit(exitCode));
}
/**
 * `claude plugin init <name>` — scaffold a new plugin in the skills directory.
 * @param app Ink app instance
 * @param pluginName desired plugin name
 * @param options init options (`with`, `author`, `authorEmail`, `description`, `force`)
 */
async function pluginInitHandler(app, pluginName, options) {
  let outputLines = [],
    nameError = dGl(pluginName);
  if (nameError) {
    xe("cli_plugin_init", "invalid_name"), outputLines.push(`${Xe.cross} Invalid plugin name "${pluginName}": ${nameError}`), MJ(app, outputLines, 1);
    return;
  }
  let components = [];
  for (let component of options.with ?? []) if (YKt.includes(component)) components.push(component);else {
    xe("cli_plugin_init", "invalid_component"), outputLines.push(`${Xe.cross} Unknown --with component "${component}". Valid: ${YKt.join(", ")}`), MJ(app, outputLines, 1);
    return;
  }
  if (!Oit()) {
    xe("cli_plugin_init", "policy_blocked"), outputLines.push(`${Xe.cross} ${kPn(WP(mV.join(or(), "skills")))}`), MJ(app, outputLines, 1);
    return;
  }
  let skillsDir = mV.join(or(), "skills"),
    pluginDir = mV.join(skillsDir, pluginName);
  if (mV.relative(skillsDir, mV.resolve(pluginDir)).startsWith("..")) {
    xe("cli_plugin_init", "invalid_name"), outputLines.push(`${Xe.cross} Plugin name "${pluginName}" would write outside ${WP(skillsDir)}`), MJ(app, outputLines, 1);
    return;
  }
  let authorName = options.author ?? (await fli()),
    authorEmail = options.authorEmail ?? (await xse());
  if (!authorName && options.authorEmail) outputLines.push(`${Xe.warning} --author-email was ignored because no author name was found. Pass --author or set git config user.name.`);
  let author = authorName ? authorEmail ? {
      name: authorName,
      email: authorEmail
    } : {
      name: authorName
    } : void 0,
    scaffoldFiles = pGl({
      name: pluginName,
      description: options.description,
      author: author,
      with: components
    }),
    skippedFiles;
  try {
    let writeResult = await mGl(pluginDir, scaffoldFiles, {
      force: options.force
    });
    if (!writeResult.ok) {
      xe("cli_plugin_init", "target_exists"), outputLines.push(`${Xe.cross} ${writeResult.error}`), MJ(app, outputLines, 1);
      return;
    }
    skippedFiles = writeResult.skipped;
  } catch (writeError) {
    xe("cli_plugin_init", "write_failed"), Ie(writeError), outputLines.push(`${Xe.cross} Failed to write scaffold: ${Ce(writeError)}`), MJ(app, outputLines, 1);
    return;
  }
  for (let skipped of skippedFiles) outputLines.push(`  kept existing ${skipped} (use --force to overwrite)`);
  let selfValidation = await DWt(pluginDir);
  if (!selfValidation.success || selfValidation.warnings.length > 0) outputLines.push(...W1o(selfValidation));
  if (!selfValidation.success) {
    xe("cli_plugin_init", "self_validate_failed"), MJ(app, outputLines, 1);
    return;
  }
  He("cli_plugin_init");
  let pluginSource = `${pluginName}@${tb}`;
  outputLines.push(`${Xe.tick} Created plugin "${pluginName}" at ${WP(pluginDir)}`);
  let enabledPlugins = $o().enabledPlugins ?? {},
    isLockedByManaged = fI()?.has(pluginName) ?? !1,
    marketplaces = await tP(),
    conflictingSource = Object.keys(enabledPlugins).find(source => {
      let parsed = ts(source);
      return parsed.name === pluginName && parsed.marketplace !== void 0 && parsed.marketplace !== V2e && !EI(parsed.marketplace) && marketplaces[parsed.marketplace] !== void 0;
    }),
    isExplicitlyDisabled = enabledPlugins[pluginSource] === !1;
  if (isLockedByManaged) outputLines.push(`  ${Xe.warning} A plugin named "${pluginName}" is locked by managed settings, which takes precedence — ${pluginSource} won't load. To load this copy, give it a different "name" in .claude-plugin/plugin.json.`);else if (conflictingSource) outputLines.push(`  ${Xe.warning} The name "${pluginName}" is already taken by ${conflictingSource} — when that plugin loads, ${pluginSource} won't. To load this copy, give it a different "name" in .claude-plugin/plugin.json or uninstall the conflicting plugin.`);else if (isExplicitlyDisabled) {
    let enableHint = t_("plugin enable", pluginSource);
    outputLines.push(`  ${Xe.warning} A disabled setting for ${pluginSource} exists, so it won't load until you re-enable it${enableHint ? `: ${enableHint}` : " in /plugin"}`);
  } else outputLines.push(`  It will auto-load next session as ${pluginSource}. Run /reload-plugins to load it now.`);
  let disableHint = t_("plugin disable", pluginSource);
  outputLines.push(`  ${disableHint ? `Disable: ${disableHint}. ` : "Disable: in /plugin. "}Remove: delete the directory.`), MJ(app, outputLines, 0);
}
/**
 * `claude plugin list` — list installed/session/skills-directory plugins.
 * @param app factory returning an Ink app instance (or the app itself)
 * @param options list options (`cowork`, `json`, `available`)
 */
async function pluginListHandler(app, options) {
  if (options.cowork) OU(!0);
  W("tengu_plugin_list_command", {});
  let installState = Uw(),
    {
      getPluginEditableScopes: getPluginEditableScopes
    } = await Promise.resolve().then(() => (mWe(), ebl)),
    editableScopes = getPluginEditableScopes(),
    installedSources = Object.keys(installState.plugins),
    {
      enabled: enabledPlugins,
      disabled: disabledPlugins,
      errors: loadErrors,
      warnings: loadWarnings
    } = await BC(),
    loadedPlugins = [...enabledPlugins, ...disabledPlugins],
    sessionPlugins = loadedPlugins.filter(plugin => plugin.source.endsWith("@inline")),
    sessionErrors = loadErrors.filter(issue => issue.source.endsWith("@inline") || issue.source.startsWith("inline[")),
    sessionWarnings = loadWarnings.filter(issue => issue.source.endsWith("@inline") || issue.source.startsWith("inline[")),
    skillsPlugins = loadedPlugins.filter(plugin => plugin.source.endsWith(`@${tb}`)),
    skillsErrors = loadErrors.filter(issue => issue.source.endsWith(`@${tb}`)),
    skillsWarnings = loadWarnings.filter(issue => issue.source.endsWith(`@${tb}`)),
    matchesPlugin = (issue, plugin) => !("orphan" in issue && issue.orphan) && (issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name);
  if (options.json) {
    let pluginBySource = new Map(loadedPlugins.map(plugin => [plugin.source, plugin])),
      installedEntries = [];
    for (let source of installedSources.sort()) {
      let installs = installState.plugins[source];
      if (!installs || installs.length === 0) continue;
      let pluginName = ts(source).name,
        sourceErrors = loadErrors.filter(issue => issue.source === source || "plugin" in issue && issue.plugin === pluginName).map(fT),
        sourceNotes = loadWarnings.filter(issue => issue.source === source || "plugin" in issue && issue.plugin === pluginName).map(EO);
      for (let install of installs) {
        let loadedPlugin = pluginBySource.get(source),
          mcpServers;
        if (loadedPlugin) {
          let servers = loadedPlugin.mcpServers || (await vee(loadedPlugin));
          if (servers && Object.keys(servers).length > 0) mcpServers = servers;
        }
        installedEntries.push({
          id: source,
          version: install.version || "unknown",
          scope: install.scope,
          enabled: editableScopes.has(source),
          installPath: install.installPath,
          installedAt: install.installedAt,
          lastUpdated: install.lastUpdated,
          projectPath: install.projectPath,
          mcpServers: mcpServers,
          errors: sourceErrors.length > 0 ? sourceErrors : void 0,
          notes: sourceNotes.length > 0 ? sourceNotes : void 0
        });
      }
    }
    for (let plugin of sessionPlugins) {
      let servers = plugin.mcpServers || (await vee(plugin)),
        pluginErrors = sessionErrors.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name).map(fT),
        pluginNotes = sessionWarnings.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name).map(EO);
      installedEntries.push({
        id: plugin.source,
        version: plugin.manifest.version ?? "unknown",
        scope: "session",
        enabled: plugin.enabled !== !1,
        installPath: plugin.path,
        mcpServers: servers && Object.keys(servers).length > 0 ? servers : void 0,
        errors: pluginErrors.length > 0 ? pluginErrors : void 0,
        notes: pluginNotes.length > 0 ? pluginNotes : void 0
      });
    }
    for (let issue of sessionErrors.filter(candidate => candidate.source.startsWith("inline["))) installedEntries.push({
      id: issue.source,
      version: "unknown",
      scope: "session",
      enabled: !1,
      installPath: "path" in issue ? issue.path : "",
      errors: [fT(issue)]
    });
    for (let plugin of skillsPlugins) {
      let servers = plugin.mcpServers || (await vee(plugin)),
        pluginErrors = skillsErrors.filter(issue => matchesPlugin(issue, plugin)).map(fT),
        pluginNotes = skillsWarnings.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name).map(EO);
      installedEntries.push({
        id: plugin.source,
        version: plugin.manifest.version ?? "unknown",
        scope: plugin.scope ?? "user",
        enabled: plugin.enabled !== !1,
        installPath: plugin.path,
        mcpServers: servers && Object.keys(servers).length > 0 ? servers : void 0,
        errors: pluginErrors.length > 0 ? pluginErrors : void 0,
        notes: pluginNotes.length > 0 ? pluginNotes : void 0
      });
    }
    for (let issue of skillsErrors.filter(candidate => !skillsPlugins.some(plugin => matchesPlugin(candidate, plugin)))) installedEntries.push({
      id: issue.source,
      version: "unknown",
      scope: "user",
      enabled: !1,
      installPath: "",
      errors: [fT(issue)]
    });
    for (let issue of skillsWarnings.filter(candidate => !skillsPlugins.some(plugin => candidate.source === plugin.source || "plugin" in candidate && candidate.plugin === plugin.name))) installedEntries.push({
      id: issue.source,
      version: "unknown",
      scope: "project",
      enabled: !1,
      installPath: "",
      notes: [EO(issue)]
    });
    let jsonOutput;
    if (options.available) {
      let availableEntries = [];
      try {
        let [marketplaceConfig, installCounts] = await Promise.all([$m(), Sht()]),
          {
            marketplaces: marketplaces
          } = await nne(marketplaceConfig);
        for (let {
          name: marketplaceName,
          data: marketplaceData
        } of marketplaces) if (marketplaceData) for (let entry of marketplaceData.plugins) {
          let pluginId = KY(entry.name, marketplaceName);
          if (!rq(pluginId)) availableEntries.push({
            pluginId: pluginId,
            name: entry.name,
            description: entry.description,
            marketplaceName: marketplaceName,
            version: entry.version,
            source: entry.source,
            installCount: installCounts?.get(pluginId)
          });
        }
      } catch {}
      jsonOutput = Pe({
        installed: installedEntries,
        available: availableEntries
      }, null, 2);
    } else jsonOutput = Pe(installedEntries, null, 2);
    He("cli_plugin_list"), await fOe(jsonOutput + `
`);
    return;
  }
  let textLines = [];
  if (installedSources.length === 0 && sessionPlugins.length === 0 && skillsPlugins.length === 0) {
    if (sessionErrors.length === 0 && skillsErrors.length === 0 && skillsWarnings.length === 0) textLines.push("No plugins installed. Use `claude plugin install` to install a plugin.");
  }
  if (installedSources.length > 0) textLines.push("Installed plugins:", "");
  for (let source of installedSources.sort()) {
    let installs = installState.plugins[source];
    if (!installs || installs.length === 0) continue;
    let pluginName = ts(source).name,
      sourceErrors = loadErrors.filter(issue => issue.source === source || "plugin" in issue && issue.plugin === pluginName),
      sourceNotes = loadWarnings.filter(issue => issue.source === source || "plugin" in issue && issue.plugin === pluginName);
    for (let install of installs) {
      let isEnabled = editableScopes.has(source),
        status = sourceErrors.length > 0 ? `${Xe.cross} failed to load` : isEnabled ? `${Xe.tick} enabled` : `${Xe.cross} disabled`,
        version = install.version || "unknown",
        scope = install.scope;
      textLines.push(`  ${Xe.pointer} ${source}`), textLines.push(`    Version: ${version}`), textLines.push(`    Scope: ${scope}`), textLines.push(`    Status: ${status}`);
      for (let issue of sourceErrors) textLines.push(`    Error: ${fT(issue)}`);
      for (let issue of sourceNotes) textLines.push(`    Note: ${EO(issue)}`);
      textLines.push("");
    }
  }
  if (sessionPlugins.length > 0 || sessionErrors.length > 0) {
    textLines.push("Session-only plugins (--plugin-dir / --plugin-url):", "");
    for (let plugin of sessionPlugins) {
      let pluginErrors = sessionErrors.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name),
        pluginNotes = sessionWarnings.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name),
        status = plugin.enabled === !1 ? `${Xe.cross} disabled` : pluginErrors.length > 0 ? `${Xe.cross} loaded with errors` : `${Xe.tick} loaded`;
      textLines.push(`  ${Xe.pointer} ${plugin.source}`), textLines.push(`    Version: ${plugin.manifest.version ?? "unknown"}`), textLines.push(`    Path: ${plugin.path}`), textLines.push(`    Status: ${status}`);
      for (let issue of pluginErrors) textLines.push(`    Error: ${fT(issue)}`);
      for (let issue of pluginNotes) textLines.push(`    Note: ${EO(issue)}`);
      textLines.push("");
    }
    for (let issue of sessionErrors.filter(candidate => candidate.source.startsWith("inline["))) textLines.push(`  ${Xe.pointer} ${issue.source}: ${Xe.cross} ${fT(issue)}`, "");
  }
  let orphanSkillsWarnings = skillsWarnings.filter(issue => !skillsPlugins.some(plugin => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name));
  if (skillsPlugins.length > 0 || skillsErrors.length > 0 || orphanSkillsWarnings.length > 0) {
    textLines.push("Skills-directory plugins (.claude/skills/*):", "");
    for (let issue of orphanSkillsWarnings) textLines.push(`  ${Xe.warning} ${EO(issue)}`, "");
    for (let plugin of skillsPlugins) {
      let pluginErrors = skillsErrors.filter(issue => matchesPlugin(issue, plugin)),
        pluginNotes = skillsWarnings.filter(issue => issue.source === plugin.source || "plugin" in issue && issue.plugin === plugin.name),
        status = plugin.enabled === !1 ? `${Xe.cross} disabled` : pluginErrors.length > 0 ? `${Xe.cross} loaded with errors` : `${Xe.tick} loaded`;
      textLines.push(`  ${Xe.pointer} ${plugin.source}`), textLines.push(`    Version: ${plugin.manifest.version ?? "unknown"}`), textLines.push(`    Scope: ${plugin.scope ?? "user"}`), textLines.push(`    Path: ${qDe(plugin)}`), textLines.push(`    Status: ${status}`);
      for (let issue of pluginErrors) textLines.push(`    Error: ${fT(issue)}`);
      for (let issue of pluginNotes) textLines.push(`    Note: ${EO(issue)}`);
      textLines.push("");
    }
    for (let issue of skillsErrors.filter(candidate => !skillsPlugins.some(plugin => matchesPlugin(candidate, plugin)))) textLines.push(`  ${Xe.pointer} ${issue.source}: ${Xe.cross} ${fT(issue)}`, "");
  }
  He("cli_plugin_list");
  let appInstance = await app();
  appInstance.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: textLines.join(`
`)
    })
  })), await appInstance.waitUntilExit();
}
/**
 * React component (memoized via the compiler cache) that resolves a promise
 * of message lines and renders them joined by newlines.
 */
function mOm(props) {
  let cache = yZn.c(4),
    {
      promise: promise
    } = props,
    messages = OOe.use(promise),
    joined;
  if (cache[0] !== messages) joined = messages.join(`
`), cache[0] = messages, cache[1] = joined;else joined = cache[1];
  let element;
  if (cache[2] !== joined) element = Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: joined
    })
  }), cache[2] = joined, cache[3] = element;else element = cache[3];
  return element;
}
/**
 * `claude marketplace add <source>` — register a marketplace and auto-resolve deps.
 * @param app Ink app instance
 * @param sourceArg raw source string (owner/repo, URL, or path)
 * @param options add options (`cowork`, `scope`, `sparse`)
 */
async function marketplaceAddHandler(app, sourceArg, options) {
  if (options.cowork) OU(!0);
  let marketplaceSource, settingsScope, scopeName;
  try {
    let parsedSource = await I7n(sourceArg);
    if (!parsedSource) return xe("cli_marketplace_add", "cli_marketplace_add_invalid_source"), Rs(`${Xe.cross} Invalid marketplace source format. Try: owner/repo, https://..., or ./path`);
    if ("error" in parsedSource) return xe("cli_marketplace_add", "cli_marketplace_add_parse_failed"), Rs(`${Xe.cross} ${parsedSource.error}`);
    if (scopeName = options.scope ?? "user", scopeName !== "user" && scopeName !== "project" && scopeName !== "local") return Rs(`${Xe.cross} Invalid scope '${scopeName}'. Use: user, project, or local`);
    if (settingsScope = AD(scopeName), marketplaceSource = parsedSource, options.sparse && options.sparse.length > 0) if (marketplaceSource.source === "github" || marketplaceSource.source === "git") marketplaceSource = {
      ...marketplaceSource,
      sparsePaths: options.sparse
    };else return Rs(`${Xe.cross} --sparse is only supported for github and git marketplace sources (got: ${marketplaceSource.source})`);
  } catch (parseError) {
    return xe("cli_marketplace_add", "cli_marketplace_add_failed"), handleMarketplaceError(parseError, "add marketplace");
  }
  let resultPromise = (async () => {
    try {
      let messages = [],
        {
          name: marketplaceName,
          alreadyMaterialized: alreadyMaterialized,
          resolvedSource: resolvedSource
        } = await FDe(marketplaceSource, message => {
          messages.push(message);
        });
      q5t(marketplaceName, {
        source: resolvedSource
      }, settingsScope), zh(), W("tengu_marketplace_added", {
        source_type: Le(marketplaceSource.source),
        repo_hash: marketplaceSource.source === "github" ? ep(marketplaceSource.repo) : void 0
      }), He("cli_marketplace_add");
      let installedDeps = [];
      try {
        installedDeps = (await ITe((await BC()).errors)).installed;
      } catch (depError) {
        A(`marketplace add: dep auto-resolve skipped: ${Ce(depError)}`, {
          level: "warn"
        });
      }
      let depSummary = Uie(installedDeps);
      return messages.push(alreadyMaterialized ? `${Xe.tick} Marketplace '${marketplaceName}' already on disk — declared in ${scopeName} settings${depSummary}` : `${Xe.tick} Successfully added marketplace: ${marketplaceName} (declared in ${scopeName} settings)${depSummary}`), messages;
    } catch (addError) {
      return xe("cli_marketplace_add", "cli_marketplace_add_failed"), handleMarketplaceError(addError, "add marketplace");
    }
  })();
  app.render(Bp.jsx(OOe.Suspense, {
    fallback: Bp.jsx(v, {
      children: "Adding marketplace…"
    }),
    children: Bp.jsx(mOm, {
      promise: resultPromise
    })
  })), await app.waitUntilExit(), process.exit(0);
}
/**
 * `claude marketplace list` — list configured marketplaces.
 * @param app factory returning an Ink app instance
 * @param options list options (`cowork`, `json`)
 */
async function marketplaceListHandler(app, options) {
  if (options.cowork) OU(!0);
  let marketplaceConfig;
  try {
    marketplaceConfig = await $m();
  } catch (loadError) {
    return xe("cli_marketplace_list", "cli_marketplace_list_load_failed"), handleMarketplaceError(loadError, "list marketplaces");
  }
  let marketplaceNames = Object.keys(marketplaceConfig);
  if (options.json) {
    let jsonEntries = marketplaceNames.sort().map(name => {
      let entry = marketplaceConfig[name],
        source = entry?.source,
        ref = source?.source === "github" || source?.source === "git" ? source.ref : void 0;
      return {
        name: name,
        source: source?.source,
        ...(source?.source === "github" && {
          repo: source.repo
        }),
        ...(source?.source === "git" && {
          url: source.url
        }),
        ...(source?.source === "url" && {
          url: source.url
        }),
        ...(source?.source === "directory" && {
          path: source.path
        }),
        ...(source?.source === "file" && {
          path: source.path
        }),
        ...(ref && {
          ref: ref
        }),
        installLocation: entry?.installLocation
      };
    });
    He("cli_marketplace_list"), await fOe(Pe(jsonEntries, null, 2) + `
`);
    return;
  }
  let element;
  if (marketplaceNames.length === 0) element = Bp.jsx(v, {
    children: "No marketplaces configured"
  });else {
    let lines = ["Configured marketplaces:", ""];
    marketplaceNames.forEach(name => {
      let entry = marketplaceConfig[name];
      if (lines.push(`  ${Xe.pointer} ${name}`), entry?.source) {
        let source = entry.source;
        if (source.source === "github") {
          let refSuffix = source.ref ? `@${source.ref}` : "";
          lines.push(`    Source: GitHub (${source.repo}${refSuffix})`);
        } else if (source.source === "git") {
          let refSuffix = source.ref ? `@${source.ref}` : "";
          lines.push(`    Source: Git (${source.url}${refSuffix})`);
        } else if (source.source === "url") lines.push(`    Source: URL (${source.url})`);else if (source.source === "directory") lines.push(`    Source: Directory (${source.path})`);else if (source.source === "file") lines.push(`    Source: File (${source.path})`);
      }
      lines.push("");
    }), element = Bp.jsx(v, {
      children: lines.join(`
`)
    });
  }
  He("cli_marketplace_list");
  let appInstance = await app();
  appInstance.render(Bp.jsx(py, {
    children: element
  })), await appInstance.waitUntilExit();
}
/**
 * `claude marketplace remove <name>` — unregister a marketplace.
 * @param app Ink app instance
 * @param marketplaceName name of the marketplace to remove
 * @param options remove options (`cowork`, `scope`)
 */
async function marketplaceRemoveHandler(app, marketplaceName, options) {
  if (options.cowork) OU(!0);
  let settingsScope;
  if (options.scope !== void 0) {
    let scopeName = options.scope;
    if (scopeName !== "user" && scopeName !== "project" && scopeName !== "local") return Rs(`${Xe.cross} Invalid scope '${scopeName}'. Use: user, project, or local`);
    settingsScope = AD(scopeName);
  }
  try {
    await bft(marketplaceName, settingsScope), zh(), W("tengu_marketplace_removed", {
      marketplace_name: marketplaceName
    });
  } catch (removeError) {
    xe("cli_marketplace_remove", "cli_marketplace_remove_failed"), handleMarketplaceError(removeError, "remove marketplace");
  }
  He("cli_marketplace_remove"), app.render(Bp.jsx(py, {
    children: Bp.jsxs(v, {
      children: [Xe.tick, " Successfully removed marketplace: ", marketplaceName, options.scope ? ` (from ${options.scope} settings)` : ""]
    })
  })), await app.waitUntilExit();
}
/**
 * React component (memoized via the compiler cache) that resolves a promise
 * of `{ messages, success }` and renders the messages plus success line.
 */
function _Om(props) {
  let cache = yZn.c(5),
    {
      promise: promise
    } = props,
    {
      messages: messages,
      success: success
    } = OOe.use(promise),
    lines;
  if (cache[0] !== messages || cache[1] !== success) lines = [...messages, success], cache[0] = messages, cache[1] = success, cache[2] = lines;else lines = cache[2];
  let joined = lines.join(`
`),
    element;
  if (cache[3] !== joined) element = Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: joined
    })
  }), cache[3] = joined, cache[4] = element;else element = cache[4];
  return element;
}
/**
 * `claude marketplace update [name]` — update one or all marketplaces.
 * @param app Ink app instance
 * @param marketplaceName specific marketplace name, or empty to update all
 * @param options update options (`cowork`)
 */
async function marketplaceUpdateHandler(app, marketplaceName, options) {
  if (options.cowork) OU(!0);
  let fallbackText, resultPromise;
  if (marketplaceName) {
    fallbackText = `Updating marketplace: ${marketplaceName}...`;
    let messages = [];
    resultPromise = sne(marketplaceName, message => {
      messages.push(message);
    }).then(() => (zh(), W("tengu_marketplace_updated", {
      marketplace_name: marketplaceName
    }), He("cli_marketplace_update"), {
      messages: messages,
      success: `${Xe.tick} Successfully updated marketplace: ${marketplaceName}`
    })).catch(updateError => (xe("cli_marketplace_update", "cli_marketplace_update_failed"), handleMarketplaceError(updateError, "update marketplace(s)")));
  } else {
    let marketplaceConfig;
    try {
      marketplaceConfig = await $m();
    } catch (loadError) {
      return xe("cli_marketplace_update", "cli_marketplace_update_load_failed"), handleMarketplaceError(loadError, "update marketplace(s)");
    }
    let marketplaceNames = Object.keys(marketplaceConfig);
    if (marketplaceNames.length === 0) {
      app.render(Bp.jsx(py, {
        children: Bp.jsx(v, {
          children: "No marketplaces configured"
        })
      })), await app.waitUntilExit(), process.exit(0);
      return;
    }
    fallbackText = `Updating ${marketplaceNames.length} marketplace(s)...`, resultPromise = ncl().then(() => (zh(), W("tengu_marketplace_updated_all", {
      count: marketplaceNames.length
    }), He("cli_marketplace_update"), {
      messages: [],
      success: `${Xe.tick} Successfully updated ${marketplaceNames.length} marketplace(s)`
    })).catch(updateError => (xe("cli_marketplace_update", "cli_marketplace_update_failed"), handleMarketplaceError(updateError, "update marketplace(s)")));
  }
  app.render(Bp.jsx(OOe.Suspense, {
    fallback: Bp.jsx(v, {
      children: fallbackText
    }),
    children: Bp.jsx(_Om, {
      promise: resultPromise
    })
  })), await app.waitUntilExit(), process.exit(0);
}
/**
 * React component (memoized via the compiler cache) that resolves a promise
 * of a success message and renders it with a tick prefix.
 */
function TOm(props) {
  let cache = yZn.c(2),
    {
      promise: promise
    } = props,
    message = OOe.use(promise),
    element;
  if (cache[0] !== message) element = Bp.jsx(py, {
    children: Bp.jsxs(v, {
      children: [Xe.tick, " ", message]
    })
  }), cache[0] = message, cache[1] = element;else element = cache[1];
  return element;
}
/**
 * `claude plugin install <spec>` — install a plugin from a marketplace.
 * @param app Ink app instance
 * @param spec plugin spec (name or name@marketplace)
 * @param options install options (`cowork`, `scope`, `config`)
 */
async function pluginInstallHandler(app, spec, options) {
  if (options.cowork) OU(!0);
  let scope = options.scope || "user";
  if (options.cowork && scope !== "user") Rs("--cowork can only be used with user scope");
  if (!vx.includes(scope)) Rs(`Invalid scope: ${scope}. Must be one of: ${vx.join(", ")}.`);
  let {
    name: pluginName,
    marketplace: marketplaceName
  } = ts(spec);
  W("tengu_plugin_install_command", {
    _PROTO_plugin_name: pluginName,
    ...(marketplaceName && {
      _PROTO_marketplace_name: marketplaceName
    }),
    scope: scope
  });
  let resultPromise = nGl(spec, scope, options.config).then(message => (He("cli_plugin_install"), message));
  app.render(Bp.jsx(OOe.Suspense, {
    fallback: Bp.jsx(v, {
      children: `Installing plugin "${spec}"...`
    }),
    children: Bp.jsx(TOm, {
      promise: resultPromise
    })
  })), await app.waitUntilExit(), await gi(0);
}
/**
 * `claude plugin uninstall <spec>` — uninstall a plugin.
 * @param app Ink app instance
 * @param spec plugin spec (name or name@marketplace)
 * @param options uninstall options (`cowork`, `scope`, `keepData`, `prune`, `yes`)
 */
async function pluginUninstallHandler(app, spec, options) {
  if (options.cowork) OU(!0);
  let scope = options.scope || "user";
  if (options.cowork && scope !== "user") Rs("--cowork can only be used with user scope");
  if (!vx.includes(scope)) Rs(`Invalid scope: ${scope}. Must be one of: ${vx.join(", ")}.`);
  let {
    name: pluginName,
    marketplace: marketplaceName
  } = ts(spec);
  W("tengu_plugin_uninstall_command", {
    _PROTO_plugin_name: pluginName,
    ...(marketplaceName && {
      _PROTO_marketplace_name: marketplaceName
    }),
    scope: scope
  });
  let resultMessage = await oGl(spec, scope, options.keepData, options.prune, options.yes);
  He("cli_plugin_uninstall"), app.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: options.prune ? resultMessage : `${Xe.tick} ${resultMessage}`
    })
  })), await app.waitUntilExit(), process.exit(0);
}
/**
 * `claude plugin prune` — remove orphaned plugin installs.
 * @param app Ink app instance
 * @param options prune options (`cowork`, `scope`, `dryRun`, `yes`)
 */
async function pluginPruneHandler(app, options) {
  if (options.cowork) OU(!0);
  let scope = options.scope || "user";
  if (options.cowork && scope !== "user") Rs("--cowork can only be used with user scope");
  if (!vx.includes(scope)) Rs(`Invalid scope: ${scope}. Must be one of: ${vx.join(", ")}.`);
  W("tengu_plugin_prune_command", {
    scope: scope,
    dry_run: options.dryRun ?? !1
  });
  let resultMessage = await sGl(scope, {
    dryRun: options.dryRun,
    yes: options.yes
  });
  He("cli_plugin_prune"), app.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: resultMessage
    })
  })), await app.waitUntilExit(), process.exit(0);
}
/**
 * `claude plugin enable <spec>` — enable an installed plugin.
 * @param app Ink app instance
 * @param spec plugin spec (name or name@marketplace)
 * @param options enable options (`cowork`, `scope`)
 */
async function pluginEnableHandler(app, spec, options) {
  if (options.cowork) OU(!0);
  let scope;
  if (options.scope) {
    if (!vx.includes(options.scope)) Rs(`Invalid scope "${options.scope}". Valid scopes: ${vx.join(", ")}`);
    scope = options.scope;
  }
  if (options.cowork && scope !== void 0 && scope !== "user") Rs("--cowork can only be used with user scope");
  if (options.cowork && scope === void 0) scope = "user";
  let {
    name: pluginName,
    marketplace: marketplaceName
  } = ts(spec);
  W("tengu_plugin_enable_command", {
    _PROTO_plugin_name: pluginName,
    ...(marketplaceName && {
      _PROTO_marketplace_name: marketplaceName
    }),
    scope: Le(scope ?? "auto")
  });
  let enableResult;
  try {
    if (enableResult = await Iht(spec, scope), !enableResult.success) throw Error(enableResult.message);
    W("tengu_plugin_enabled_cli", {
      ...n$(enableResult.pluginId || spec, fI()),
      scope: Bo(enableResult.scope)
    });
  } catch (enableError) {
    return xe("cli_plugin_enable", "cli_plugin_enable_failed"), DOe(enableError, "enable", spec);
  }
  He("cli_plugin_enable"), app.render(Bp.jsx(py, {
    children: Bp.jsxs(v, {
      children: [Xe.tick, " ", enableResult.message]
    })
  })), await app.waitUntilExit();
}
/**
 * `claude plugin disable [spec]` — disable one plugin or all plugins.
 * @param app Ink app instance
 * @param spec plugin spec, or empty when `--all` is used
 * @param options disable options (`all`, `cowork`, `scope`)
 */
async function pluginDisableHandler(app, spec, options) {
  if (options.all && spec) Rs("Cannot use --all with a specific plugin");
  if (!options.all && !spec) Rs("Please specify a plugin name or use --all to disable all plugins");
  if (options.cowork) OU(!0);
  let resultMessage;
  if (options.all) {
    if (options.scope) Rs("Cannot use --scope with --all");
    W("tengu_plugin_disable_command", {}), resultMessage = await lGl();
  } else {
    let scope;
    if (options.scope) {
      if (!vx.includes(options.scope)) Rs(`Invalid scope "${options.scope}". Valid scopes: ${vx.join(", ")}`);
      scope = options.scope;
    }
    if (options.cowork && scope !== void 0 && scope !== "user") Rs("--cowork can only be used with user scope");
    if (options.cowork && scope === void 0) scope = "user";
    let {
      name: pluginName,
      marketplace: marketplaceName
    } = ts(spec);
    W("tengu_plugin_disable_command", {
      _PROTO_plugin_name: pluginName,
      ...(marketplaceName && {
        _PROTO_marketplace_name: marketplaceName
      }),
      scope: Le(scope ?? "auto")
    }), resultMessage = await aGl(spec, scope);
  }
  He("cli_plugin_disable"), app.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: resultMessage
    })
  })), await app.waitUntilExit(), process.exit(0);
}
/**
 * `claude plugin update <spec>` — update an installed plugin.
 * @param spec plugin spec (name or name@marketplace)
 * @param options update options (`cowork`, `scope`)
 */
async function pluginUpdateHandler(spec, options) {
  if (options.cowork) OU(!0);
  let {
    name: pluginName,
    marketplace: marketplaceName
  } = ts(spec);
  W("tengu_plugin_update_command", {
    _PROTO_plugin_name: pluginName,
    ...(marketplaceName && {
      _PROTO_marketplace_name: marketplaceName
    })
  });
  let scope = "user";
  if (options.scope) {
    if (!hWe.includes(options.scope)) Rs(`Invalid scope "${options.scope}". Valid scopes: ${hWe.join(", ")}`);
    scope = options.scope;
  }
  if (options.cowork && scope !== "user") Rs("--cowork can only be used with user scope");
  await cGl(spec, scope);
}
/**
 * `claude plugin details <spec>` — show a plugin's component inventory and
 * projected token cost.
 * @param app factory returning an Ink app instance
 * @param spec plugin spec (name or name@marketplace)
 * @param options details options (`cowork`, `json`, `models`)
 */
async function pluginDetailsHandler(app, spec, options) {
  if (options.cowork) OU(!0);
  W("tengu_plugin_details_command", {});
  let {
      getPluginInventory: getPluginInventory,
      computePluginTokenCost: computePluginTokenCost,
      scaleCharsToTokens: scaleCharsToTokens
    } = await Promise.resolve().then(() => (Rwo(), aEl)),
    {
      formatTokenEstimate: formatTokenEstimate
    } = await Promise.resolve().then(() => (Xo(), AWo)),
    {
      enabled: enabledPlugins,
      disabled: disabledPlugins
    } = await BC(),
    parsedSpec = ts(spec),
    plugin = [...enabledPlugins, ...disabledPlugins].find(candidate => parsedSpec.marketplace ? candidate.source === gNi(parsedSpec.name, parsedSpec.marketplace) : candidate.name === parsedSpec.name);
  if (!plugin) {
    xe("cli_plugin_details", "not_found");
    let notFoundMessage = `Plugin "${spec}" not found. Run \`claude plugin list\` to see installed plugins, or pass --plugin-dir <path> to load one from disk.`;
    if (options.json) return Rs(notFoundMessage);
    let appInstance = await app();
    appInstance.render(Bp.jsx(py, {
      children: Bp.jsx(v, {
        children: notFoundMessage
      })
    })), await appInstance.waitUntilExit(), process.exit(1);
  }
  let marketplaceName = plugin.source.split("@")[1] ?? "inline",
    models = options.models?.length ? options.models : [gs()],
    costResult;
  try {
    let inventory = await getPluginInventory(plugin, marketplaceName);
    costResult = await computePluginTokenCost(inventory, models, plugin.name);
  } catch (inventoryError) {
    Ie(inventoryError), xe("cli_plugin_details", "inventory_failed");
    let errorMessage = `${Xe.cross} Could not load details for "${plugin.name}": ${Ce(inventoryError)}`;
    if (options.json) return Rs(errorMessage);
    let appInstance = await app();
    appInstance.render(Bp.jsx(py, {
      children: Bp.jsx(v, {
        children: errorMessage
      })
    })), await appInstance.waitUntilExit(), process.exit(1);
  }
  let {
    tokens: tokensByModel,
    inventory: inventory
  } = costResult;
  if (options.json) {
    He("cli_plugin_details");
    let stripPath = ({
      path: path,
      ...rest
    }) => rest;
    await fOe(Pe({
      plugin: plugin.name,
      version: plugin.manifest.version,
      source: plugin.source,
      sha: plugin.sha ?? null,
      tokens: tokensByModel,
      components: {
        ...inventory,
        commands: inventory.commands.map(stripPath),
        agents: inventory.agents.map(stripPath),
        skills: inventory.skills.map(stripPath)
      }
    }, null, 2) + `
`);
    return;
  }
  let outputLines = [],
    displayName = yT(plugin),
    title = displayName === plugin.name ? plugin.name : `${displayName} (${plugin.name})`;
  if (outputLines.push(`${title} ${plugin.manifest.version ?? ""}`.trimEnd()), plugin.manifest.description) outputLines.push(`  ${plugin.manifest.description}`);
  outputLines.push(`  Source: ${plugin.source}`), outputLines.push(""), outputLines.push("Component inventory");
  let inventoryRows = [["Skills", [...inventory.skills, ...inventory.commands].map(component => component.name).sort(), ""], ["Agents", inventory.agents.map(component => component.name), ""], ["Hooks", inventory.hooks, "  (harness-only — no model context cost)"], ["MCP servers", inventory.mcpServers, "  (tool schemas resolved at runtime; not counted)"], ["LSP servers", inventory.lspServers, "  (out-of-process tooling; no model context cost)"]];
  for (let [label, items, note] of inventoryRows) outputLines.push(`  ${label} (${items.length})${items.length > 0 ? `  ${items.join(", ")}` : ""}${items.length > 0 ? note : ""}`);
  outputLines.push("");
  let costedComponents = [...inventory.skills, ...inventory.agents, ...inventory.commands].filter(component => component.chars != null),
    totalChars = {
      always_on: costedComponents.reduce((sum, component) => sum + component.chars.always_on, 0),
      on_invoke: costedComponents.reduce((sum, component) => sum + component.chars.on_invoke, 0)
    },
    primaryModelTokens = tokensByModel[models[0]],
    alwaysOnTokens = primaryModelTokens?.always_on ?? scaleCharsToTokens(totalChars.always_on, totalChars.always_on, void 0);
  if (outputLines.push("Projected token cost"), outputLines.push(`  Always-on:   ~${alwaysOnTokens.toLocaleString()} tok   added to every session`), costedComponents.length > 0) {
    outputLines.push(""), outputLines.push("Per-component (rounded)");
    let nameColumnWidth = Math.max(...costedComponents.map(component => component.name.length), 9);
    outputLines.push(`  ${"component".padEnd(nameColumnWidth)}  ${"always-on".padStart(9)}  ${"on-invoke".padStart(9)}`);
    for (let component of costedComponents) {
      let alwaysOn = scaleCharsToTokens(component.chars.always_on, totalChars.always_on, primaryModelTokens?.always_on),
        onInvoke = scaleCharsToTokens(component.chars.on_invoke, totalChars.on_invoke, primaryModelTokens?.on_invoke);
      outputLines.push(`  ${component.name.padEnd(nameColumnWidth)}  ${formatTokenEstimate(alwaysOn).padStart(9)}  ${formatTokenEstimate(onInvoke).padStart(9)}`);
    }
    outputLines.push(""), outputLines.push("  On-invoke cost is paid each time a skill or agent fires."), outputLines.push("  Token counts are estimates and may differ from actual usage.");
  }
  if (primaryModelTokens) He("cli_plugin_details");else Pt("cli_plugin_details", "count_tokens_unreachable");
  let appInstance = await app();
  appInstance.render(Bp.jsx(py, {
    children: Bp.jsx(v, {
      children: outputLines.join(`
`)
    })
  })), await appInstance.waitUntilExit();
}
var yZn, mV, OOe, Bp;
var pU = b(() => {
  Zs();
  lt();
  je();
  Bnt();
  mn();
  kt();
  $1o();
  Pht();
  Q8();
  qe();
  dn();
  Ct();
  IA();
  Np();
  vn();
  Ro();
  Tu();
  c6();
  Whe();
  rH();
  k8();
  dTe();
  dS();
  IHe();
  bPe();
  two();
  RWt();
  oh();
  Eg();
  II();
  Nwo();
  q1o();
  tzn();
  br();
  tn();
  i0e();
  lr();
  pw();
  KQ();
  _N();
  yZn = x(tt(), 1), mV = require("path"), OOe = x(et(), 1), Bp = x(oe(), 1);
});

export {dU,handleMarketplaceError,W1o,pluginValidateHandler,pluginTagHandler,MJ,pluginInitHandler,pluginListHandler,mOm,marketplaceAddHandler,marketplaceListHandler,marketplaceRemoveHandler,_Om,marketplaceUpdateHandler,TOm,pluginInstallHandler,pluginUninstallHandler,pluginPruneHandler,pluginEnableHandler,pluginDisableHandler,pluginUpdateHandler,pluginDetailsHandler,yZn,mV,OOe,Bp,pU};
