// @ts-nocheck
import {jt,wX,ws} from "../../vendor/m228.ts";
import {_pt,ljn} from "../../vendor/m4430.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {RA,iF,AQe,X_n,J_n,Ev} from "../../vendor/m2211.ts";
import {D_e,Efo} from "../../vendor/m4329.ts";
import {Gce,iJ,D6} from "../agent/5186_bigint.ts";
import {kee,kkn,bL,Hq} from "../../vendor/m3140.ts";
import {NIn,Pot,T1t} from "../../vendor/m3251.ts";
import {parseUserSpecifiedModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {aF,nP,jO,Om} from "../config/2215_level.ts";
import {K3} from "../../vendor/m723.ts";
import {nY} from "../../vendor/m3250.ts";
import {getSessionId,lt,getInlinePlugins,getInlinePluginsNoMcp,getInlinePluginUrls} from "../session/0131_sent.ts";
import {Fh,Ql} from "../../vendor/m4405.ts";
import {K4n,z4n,bfo} from "../config/4329_bfo.ts";
import {I_e,Pdt} from "../../vendor/m4327.ts";
import {Pn,bt} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {ln,Oe,Ie} from "../telemetry/0594_feature_name.ts";
import {x6,hYa} from "./4332_displayName.ts";
import {N5,TT} from "../../vendor/m2583.ts";
import {Iy,hc} from "../agent/2230_explicitlyRequested.ts";
import {J3} from "../artifact/0731_allow.ts";
import {gg,loadAllPluginsCacheOnly} from "../agent/4445_resolvePluginRoot.ts";
/** Returns true if the given file path basename is exactly "skill.md" (case-insensitive). */
function Lgo(filePath: string): boolean {
  return /^skill\.md$/i.test(nH.basename(filePath));
}

/** Derives a namespaced command/skill name from the file path relative to its base directory. */
function tqp(filePath: string, baseDir: string, pluginName: string): string {
  if (Lgo(filePath)) {
    let dirPath = nH.dirname(filePath),
      parentDir = nH.dirname(dirPath),
      dirName = nH.basename(dirPath),
      relPath = parentDir.startsWith(baseDir) ? parentDir.slice(baseDir.length).replace(/^[/\\]/, "") : "",
      namespaceParts = relPath ? relPath.split(/[/\\]/).join(":") : "";
    return namespaceParts ? `${pluginName}:${namespaceParts}:${dirName}` : `${pluginName}:${dirName}`;
  } else {
    let dirPath = nH.dirname(filePath),
      baseName = nH.basename(filePath).replace(/\.md$/, ""),
      relPath = dirPath.startsWith(baseDir) ? dirPath.slice(baseDir.length).replace(/^[/\\]/, "") : "",
      namespaceParts = relPath ? relPath.split(/[/\\]/).join(":") : "";
    return namespaceParts ? `${pluginName}:${namespaceParts}:${baseName}` : `${pluginName}:${baseName}`;
  }
}

/** Reads all plugin command markdown files from a directory, returning their frontmatter and content. */
async function nqp(dirPath: string, baseDir: string, seenPaths: any): Promise<any[]> {
  let results = [],
    fs = jt();
  return await _pt(dirPath, async filePath => {
    if (wX(fs, filePath, seenPaths)) return;
    let fileContent;
    try {
      fileContent = await fs.readFile(filePath, {
        encoding: "utf-8"
      });
    } catch (err) {
      logForDebugging(`Failed to read plugin command ${filePath}: ${err}`, {
        level: "error"
      });
      return;
    }
    let {
      frontmatter: frontmatter,
      content: content
    } = RA(fileContent, filePath, {
      normalizeKeys: !0
    });
    results.push({
      filePath: filePath,
      baseDir: baseDir,
      frontmatter: frontmatter,
      content: D_e(filePath, content)
    });
  }, {
    stopAtSkillDir: !0,
    logLabel: "commands"
  }), results.sort((a, b) => a.filePath.localeCompare(b.filePath));
}

/** Groups raw file entries by directory, preferring skill.md files over normal command files in each directory. */
function rqp(fileEntries: any[]): any[] {
  let dirMap = new Map();
  for (let entry of fileEntries) {
    let dirPath = nH.dirname(entry.filePath),
      entries = dirMap.get(dirPath) ?? [];
    entries.push(entry), dirMap.set(dirPath, entries);
  }
  let deduped = [];
  for (let [dirPath, entries] of dirMap) {
    let skillFiles = entries.filter(entry => Lgo(entry.filePath));
    if (skillFiles.length > 0) {
      let skillFile = skillFiles[0];
      if (skillFiles.length > 1) logForDebugging(`Multiple skill files found in ${dirPath}, using ${nH.basename(skillFile.filePath)}`);
      deduped.push(skillFile);
    } else deduped.push(...entries);
  }
  return deduped;
}

/** Loads all plugin commands from a directory, returning an array of command descriptors. */
async function Gtl(dirPath: string, pluginName: string, source: any, manifest: any, pluginPath: string, options: any = {
  isSkillMode: !1
}, seenPaths: any = new Set()): Promise<any[]> {
  let rawEntries = await nqp(dirPath, dirPath, seenPaths),
    deduped = rqp(rawEntries),
    commands = [];
  for (let entry of deduped) {
    let commandName = tqp(entry.filePath, entry.baseDir, pluginName),
      command = cqt(commandName, entry, source, manifest, pluginPath, Lgo(entry.filePath), options);
    if (command) commands.push(command);
  }
  return commands;
}

/** Constructs a single plugin command descriptor from a markdown file entry and its frontmatter. */
function cqt(commandName: string, fileEntry: any, source: any, manifest: any, pluginPath: string, isSkill: boolean, options: any = {
  isSkillMode: !1
}): any | null {
  try {
    let {
        frontmatter: frontmatter,
        content: content
      } = fileEntry,
      explicitDesc = iF(frontmatter.description, commandName),
      description = explicitDesc ?? Gce(content, isSkill ? "Plugin skill" : "Plugin command"),
      fileDir = nH.dirname(fileEntry.filePath),
      expandEnv = (str: string) => {
        let expanded = kee(str, {
          path: pluginPath,
          source: source
        });
        if (options.isSkillMode) expanded = expanded.replace(/\$\{CLAUDE_SKILL_DIR\}/g, () => fileDir);
        return expanded;
      },
      allowedToolsRaw = frontmatter["allowed-tools"],
      allowedTools = typeof allowedToolsRaw === "string" ? expandEnv(allowedToolsRaw) : Array.isArray(allowedToolsRaw) ? allowedToolsRaw.map(item => typeof item === "string" ? expandEnv(item) : item) : allowedToolsRaw,
      parsedAllowedTools = iJ(allowedTools),
      parsedDisallowedTools = iJ(frontmatter["disallowed-tools"] ?? frontmatter.disallowedTools),
      argumentHint = frontmatter["argument-hint"] != null ? String(frontmatter["argument-hint"]) : void 0,
      argNames = NIn(frontmatter.arguments),
      whenToUse = frontmatter.when_to_use != null ? String(frontmatter.when_to_use) : void 0,
      version = frontmatter.version != null ? String(frontmatter.version) : void 0,
      nameOverride = frontmatter.name != null ? String(frontmatter.name) : void 0,
      modelRaw = frontmatter.model,
      resolvedModel;
    if (typeof modelRaw === "string" && modelRaw.trim().length > 0) {
      let modelStr = modelRaw.trim();
      resolvedModel = modelStr === "inherit" ? void 0 : parseUserSpecifiedModel(modelStr);
    }
    let effortRaw = frontmatter.effort,
      resolvedEffort = effortRaw !== void 0 ? aF(effortRaw) : void 0;
    if (effortRaw !== void 0 && resolvedEffort === void 0) logForDebugging(`Plugin command ${commandName} has invalid effort '${effortRaw}'. Valid options: ${nP.join(", ")} or an integer`);
    let disableModelInvocation = AQe(frontmatter["disable-model-invocation"]),
      userInvocableRaw = frontmatter["user-invocable"],
      userInvocable = userInvocableRaw === void 0 ? !0 : AQe(userInvocableRaw),
      shellConfig = X_n(frontmatter.shell, commandName),
      hooks;
    if ((isSkill || options.isSkillMode) && frontmatter.hooks) {
      let parseResult = K3().safeParse(frontmatter.hooks);
      if (parseResult.success) hooks = parseResult.data;else logForDebugging(`Invalid hooks in plugin skill '${commandName}': ${parseResult.error.message}`);
    }
    return {
      type: "prompt",
      name: commandName,
      description: description,
      hasUserSpecifiedDescription: explicitDesc !== null,
      allowedTools: parsedAllowedTools,
      disallowedTools: parsedDisallowedTools.length > 0 ? parsedDisallowedTools : void 0,
      argumentHint: argumentHint,
      argNames: argNames.length > 0 ? argNames : void 0,
      whenToUse: whenToUse,
      version: version,
      model: resolvedModel,
      effort: resolvedEffort,
      context: frontmatter.context === "fork" ? "fork" : void 0,
      agent: frontmatter.agent != null ? String(frontmatter.agent) : void 0,
      disableModelInvocation: disableModelInvocation,
      userInvocable: userInvocable,
      declaredFields: J_n(frontmatter),
      contentLength: content.length,
      source: "plugin",
      loadedFrom: isSkill || options.isSkillMode ? "plugin" : void 0,
      hooks: hooks,
      skillRoot: (isSkill || options.isSkillMode) && hooks ? pluginPath : void 0,
      pluginInfo: {
        pluginManifest: manifest,
        repository: source
      },
      isHidden: !userInvocable,
      progressMessage: isSkill || options.isSkillMode ? "loading" : "running",
      userFacingName() {
        return nameOverride || commandName;
      },
      async getPromptForCommand(args: any, appCtx: any) {
        let promptText = options.isSkillMode ? `Base directory for this skill: ${nH.dirname(fileEntry.filePath)}

${content}` : content;
        if (promptText = Pot(promptText, args, !0, argNames, nY), promptText = kee(promptText, {
          path: pluginPath,
          source: source
        }), manifest.userConfig) promptText = kkn(promptText, bL(source), manifest.userConfig, nY);
        if (options.isSkillMode) promptText = promptText.replace(/\$\{CLAUDE_SKILL_DIR\}/g, fileDir);
        if (promptText = promptText.replace(/\$\{CLAUDE_SESSION_ID\}/g, getSessionId()), promptText = promptText.replaceAll("${CLAUDE_EFFORT}", jO(resolvedModel ?? appCtx.options.mainLoopModel, resolvedEffort ?? Fh(appCtx))), K4n()) promptText = z4n(promptText);else promptText = await I_e(promptText, {
          ...appCtx,
          getAppState() {
            let appState = appCtx.getAppState();
            return {
              ...appState,
              toolPermissionContext: {
                ...appState.toolPermissionContext,
                alwaysAllowRules: {
                  ...appState.toolPermissionContext.alwaysAllowRules,
                  command: parsedAllowedTools
                }
              }
            };
          }
        }, `/${commandName}`, shellConfig);
        return [{
          type: "text",
          text: promptText
        }];
      }
    };
  } catch (err) {
    return logForDebugging(`Failed to create command from ${fileEntry.filePath}: ${err}`, {
      level: "error"
    }), null;
  }
}

/** Clears the cached plugin commands. */
function cjn(): void {
  Q6e.cache?.clear?.();
}

/** Loads plugin skills from a directory (or from a single SKILL.md file). */
async function Vtl(skillsDir: string, pluginName: string, source: any, manifest: any, pluginPath: string, seenPaths: any): Promise<any[]> {
  let fs = jt(),
    results = [],
    skillMdPath = nH.join(skillsDir, "SKILL.md"),
    skillMdContent = null;
  try {
    skillMdContent = await fs.readFile(skillMdPath, {
      encoding: "utf-8"
    });
  } catch (err) {
    if (!Pn(err)) return logForDebugging(`Failed to load skill from ${skillMdPath}: ${err}`, {
      level: "error"
    }), results;
  }
  if (skillMdContent !== null) {
    if (wX(fs, skillMdPath, seenPaths)) return results;
    try {
      let {
          frontmatter: frontmatter,
          content: content
        } = RA(skillMdContent, skillMdPath, {
          normalizeKeys: !0
        }),
        sanitizedName = ((typeof frontmatter.name === "string" ? frontmatter.name.trim() : "") || nH.basename(skillsDir)).replace(/[^a-zA-Z0-9_-]/g, "-"),
        skillCommandName = `${pluginName}:${sanitizedName}`,
        skillEntry = {
          filePath: skillMdPath,
          baseDir: nH.dirname(skillMdPath),
          frontmatter: frontmatter,
          content: D_e(skillMdPath, content)
        },
        skill = cqt(skillCommandName, skillEntry, source, manifest, pluginPath, !0, {
          isSkillMode: !0
        });
      if (skill) results.push({
        skill: skill,
        filePath: skillMdPath
      });
    } catch (err) {
      logForDebugging(`Failed to load skill from ${skillMdPath}: ${err}`, {
        level: "error"
      });
    }
    return results;
  }
  let dirEntries;
  try {
    dirEntries = await fs.readdir(skillsDir);
  } catch (err) {
    if (!Pn(err)) logForDebugging(`Failed to load skills from directory ${skillsDir}: ${err}`, {
      level: "error"
    });
    return results;
  }
  return await Promise.all(dirEntries.map(async dirEntry => {
    if (!dirEntry.isDirectory() && !dirEntry.isSymbolicLink()) return;
    let subDir = nH.join(skillsDir, dirEntry.name),
      subSkillMdPath = nH.join(subDir, "SKILL.md"),
      subContent;
    try {
      subContent = await fs.readFile(subSkillMdPath, {
        encoding: "utf-8"
      });
    } catch (err) {
      if (!Pn(err)) logForDebugging(`Failed to load skill from ${subSkillMdPath}: ${err}`, {
        level: "error"
      });
      return;
    }
    if (wX(fs, subSkillMdPath, seenPaths)) return;
    try {
      let {
          frontmatter: frontmatter,
          content: content
        } = RA(subContent, subSkillMdPath, {
          normalizeKeys: !0
        }),
        subSkillName = `${pluginName}:${dirEntry.name.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
        subSkillEntry = {
          filePath: subSkillMdPath,
          baseDir: nH.dirname(subSkillMdPath),
          frontmatter: frontmatter,
          content: D_e(subSkillMdPath, content)
        },
        skill = cqt(subSkillName, subSkillEntry, source, manifest, pluginPath, !0, {
          isSkillMode: !0
        });
      if (skill) results.push({
        skill: skill,
        filePath: subSkillMdPath
      });
    } catch (err) {
      logForDebugging(`Failed to load skill from ${subSkillMdPath}: ${err}`, {
        level: "error"
      });
    }
  })), results.sort((a, b) => a.skill.name.localeCompare(b.skill.name));
}

/** Clears the cached plugin skills. */
function ztl(): void {
  Mgo.cache?.clear?.();
}
var Ktl, nH, Q6e, Mgo;
var uqt = b(() => {
  ta();
  lt();
  ln();
  x6();
  Efo();
  N5();
  T1t();
  Ql();
  Iy();
  qe();
  Om();
  bt();
  Ev();
  ws();
  D6();
  Mo();
  Pdt();
  J3();
  bfo();
  gg();
  Hq();
  ljn();
  Ktl = require("fs/promises"), nH = require("path");
  Q6e = wn(async () => {
    if (hc("plugins", {
      explicitlyRequested: getInlinePlugins().length > 0 || getInlinePluginsNoMcp().length > 0 || getInlinePluginUrls().length > 0
    })) return [];
    let {
      enabled: enabledPlugins,
      errors: loadErrors
    } = await loadAllPluginsCacheOnly();
    if (loadErrors.length > 0) logForDebugging(`Plugin loading errors: ${loadErrors.map(err => TT(err)).join(", ")}`);
    let failureType = null,
      allCommands = (await Promise.all(enabledPlugins.map(async plugin => {
        let seenPaths = new Set(),
          pluginCommands = [];
        if (plugin.commandsPath) try {
          let loadedCommands = await Gtl(plugin.commandsPath, plugin.name, plugin.source, plugin.manifest, plugin.path, {
            isSkillMode: !1
          }, seenPaths);
          if (pluginCommands.push(...loadedCommands), loadedCommands.length > 0) logForDebugging(`Loaded ${loadedCommands.length} commands from plugin ${plugin.name} default directory`);
        } catch (err) {
          failureType = "plugin_load_commands_dir_failed", logForDebugging(`Failed to load commands from plugin ${plugin.name} default directory: ${err}`, {
            level: "error"
          });
        }
        if (plugin.commandsPaths) {
          logForDebugging(`Plugin ${plugin.name} has commandsPaths: ${plugin.commandsPaths.join(", ")}`);
          let pathResults = await Promise.all(plugin.commandsPaths.map(async cmdPath => {
            try {
              let fs = jt(),
                stat = await fs.stat(cmdPath);
              if (logForDebugging(`Checking commandPath ${cmdPath} - isDirectory: ${stat.isDirectory()}, isFile: ${stat.isFile()}`), stat.isDirectory()) {
                let cmds = await Gtl(cmdPath, plugin.name, plugin.source, plugin.manifest, plugin.path, {
                  isSkillMode: !1
                }, seenPaths);
                if (cmds.length > 0) logForDebugging(`Loaded ${cmds.length} commands from plugin ${plugin.name} custom path: ${cmdPath}`);else logForDebugging(`Warning: No commands found in plugin ${plugin.name} custom directory: ${cmdPath}. Expected .md files or SKILL.md in subdirectories.`, {
                  level: "warn"
                });
                return cmds;
              } else if (stat.isFile() && cmdPath.endsWith(".md")) {
                if (wX(fs, cmdPath, seenPaths)) return [];
                let fileContent = await fs.readFile(cmdPath, {
                    encoding: "utf-8"
                  }),
                  {
                    frontmatter: frontmatter,
                    content: content
                  } = RA(fileContent, cmdPath, {
                    normalizeKeys: !0
                  }),
                  resolvedName,
                  metadataOverride;
                if (plugin.commandsMetadata) {
                  for (let [metaKey, metaVal] of Object.entries(plugin.commandsMetadata)) if (metaVal.source) {
                    let resolvedSource = nH.join(plugin.path, metaVal.source);
                    if (cmdPath === resolvedSource) {
                      resolvedName = `${plugin.name}:${metaKey}`, metadataOverride = metaVal;
                      break;
                    }
                  }
                }
                if (!resolvedName) resolvedName = `${plugin.name}:${nH.basename(cmdPath).replace(/\.md$/, "")}`;
                let mergedFrontmatter = metadataOverride ? {
                    ...frontmatter,
                    ...(metadataOverride.description && {
                      description: metadataOverride.description
                    }),
                    ...(metadataOverride.argumentHint && {
                      "argument-hint": metadataOverride.argumentHint
                    }),
                    ...(metadataOverride.model && {
                      model: metadataOverride.model
                    }),
                    ...(metadataOverride.allowedTools && {
                      "allowed-tools": metadataOverride.allowedTools.join(",")
                    })
                  } : frontmatter,
                  fileEntry = {
                    filePath: cmdPath,
                    baseDir: nH.dirname(cmdPath),
                    frontmatter: mergedFrontmatter,
                    content: D_e(cmdPath, content)
                  },
                  cmd = cqt(resolvedName, fileEntry, plugin.source, plugin.manifest, plugin.path, !1);
                if (cmd) return logForDebugging(`Loaded command from plugin ${plugin.name} custom file: ${cmdPath}${metadataOverride ? " (with metadata override)" : ""}`), [cmd];
              }
              return [];
            } catch (err) {
              return failureType = "plugin_load_commands_path_failed", logForDebugging(`Failed to load commands from plugin ${plugin.name} custom path ${cmdPath}: ${err}`, {
                level: "error"
              }), [];
            }
          }));
          for (let pathCmds of pathResults) pluginCommands.push(...pathCmds);
        }
        if (plugin.commandsMetadata) {
          for (let [metaKey, metaVal] of Object.entries(plugin.commandsMetadata)) if (metaVal.content && !metaVal.source) try {
            let {
                frontmatter: frontmatter,
                content: content
              } = RA(metaVal.content, `<inline:${plugin.name}:${metaKey}>`, {
                normalizeKeys: !0
              }),
              mergedFrontmatter = {
                ...frontmatter,
                ...(metaVal.description && {
                  description: metaVal.description
                }),
                ...(metaVal.argumentHint && {
                  "argument-hint": metaVal.argumentHint
                }),
                ...(metaVal.model && {
                  model: metaVal.model
                }),
                ...(metaVal.allowedTools && {
                  "allowed-tools": metaVal.allowedTools.join(",")
                })
              },
              inlineName = `${plugin.name}:${metaKey}`,
              inlineFilePath = `<inline:${inlineName}>`,
              inlineEntry = {
                filePath: inlineFilePath,
                baseDir: plugin.path,
                frontmatter: mergedFrontmatter,
                content: D_e(inlineFilePath, content)
              },
              inlineCmd = cqt(inlineName, inlineEntry, plugin.source, plugin.manifest, plugin.path, !1);
            if (inlineCmd) pluginCommands.push(inlineCmd), logForDebugging(`Loaded inline content command from plugin ${plugin.name}: ${inlineName}`);
          } catch (err) {
            failureType = "plugin_load_commands_inline_failed", logForDebugging(`Failed to load inline content command ${metaKey} from plugin ${plugin.name}: ${err}`, {
              level: "error"
            });
          }
        }
        return pluginCommands;
      }))).flat();
    if (logForDebugging(`Total plugin commands loaded: ${allCommands.length}`), failureType) Oe("plugin_load_commands", failureType);else Ie("plugin_load_commands");
    return allCommands;
  });
  Mgo = wn(async () => {
    if (hc("plugins", {
      explicitlyRequested: getInlinePlugins().length > 0 || getInlinePluginsNoMcp().length > 0 || getInlinePluginUrls().length > 0
    })) return [];
    let {
      enabled: enabledPlugins,
      errors: loadErrors
    } = await loadAllPluginsCacheOnly();
    if (loadErrors.length > 0) logForDebugging(`Plugin loading errors: ${loadErrors.map(err => TT(err)).join(", ")}`);
    logForDebugging(`getPluginSkills: Processing ${enabledPlugins.length} enabled plugins`);
    let failureType = null,
      skillsWithPaths = (await Promise.all(enabledPlugins.map(async plugin => {
        let seenPaths = new Set(),
          pluginSkills = [];
        if (logForDebugging(`Checking plugin ${plugin.name}: skillsPath=${plugin.skillsPath ? "exists" : "none"}, skillsPaths=${plugin.skillsPaths ? plugin.skillsPaths.length : 0} paths`), plugin.skillsPath) {
          logForDebugging(`Attempting to load skills from plugin ${plugin.name} default skillsPath: ${plugin.skillsPath}`);
          try {
            let skills = await Vtl(plugin.skillsPath, plugin.name, plugin.source, plugin.manifest, plugin.path, seenPaths);
            pluginSkills.push(...skills), logForDebugging(`Loaded ${skills.length} skills from plugin ${plugin.name} default directory`);
          } catch (err) {
            failureType = "plugin_load_skills_dir_failed", logForDebugging(`Failed to load skills from plugin ${plugin.name} default directory: ${err}`, {
              level: "error"
            });
          }
        }
        if (plugin.skillsPaths) {
          logForDebugging(`Attempting to load skills from plugin ${plugin.name} skillsPaths: ${plugin.skillsPaths.join(", ")}`);
          let pathResults = await Promise.all(plugin.skillsPaths.map(async skillPath => {
            try {
              logForDebugging(`Loading from skillPath: ${skillPath} for plugin ${plugin.name}`);
              let skills = await Vtl(skillPath, plugin.name, plugin.source, plugin.manifest, plugin.path, seenPaths);
              return logForDebugging(`Loaded ${skills.length} skills from plugin ${plugin.name} custom path: ${skillPath}`), skills;
            } catch (err) {
              return failureType = "plugin_load_skills_path_failed", logForDebugging(`Failed to load skills from plugin ${plugin.name} custom path ${skillPath}: ${err}`, {
                level: "error"
              }), [];
            }
          }));
          for (let pathSkills of pathResults) pluginSkills.push(...pathSkills);
        }
        return pluginSkills;
      }))).flat(),
      [realPaths, userSkillPaths] = await Promise.all([Promise.all(skillsWithPaths.map(async item => {
        try {
          return await Ktl.realpath(item.filePath);
        } catch {
          return null;
        }
      })), hYa()]),
      seenRealPaths = new Map(),
      dedupedSkills = [];
    for (let idx = 0; idx < skillsWithPaths.length; idx++) {
      let item = skillsWithPaths[idx];
      if (item === void 0) continue;
      let realPath = realPaths[idx];
      if (realPath === null || realPath === void 0) {
        dedupedSkills.push(item.skill);
        continue;
      }
      if (userSkillPaths !== null && userSkillPaths.has(realPath)) {
        logForDebugging(`Skipping plugin skill '${item.skill.name}' \u2014 ${realPath} is a user-level skill already surfaced by the skills directory loader`);
        continue;
      }
      let existing = seenRealPaths.get(realPath);
      if (existing !== void 0) {
        logForDebugging(`Skipping duplicate plugin skill '${item.skill.name}' \u2014 ${realPath} already loaded as '${existing}'`);
        continue;
      }
      seenRealPaths.set(realPath, item.skill.name), dedupedSkills.push(item.skill);
    }
    if (logForDebugging(`Total plugin skills loaded: ${dedupedSkills.length} (${skillsWithPaths.length - dedupedSkills.length} duplicate/user-owned entries skipped)`), failureType) Oe("plugin_load_skills", failureType);else Ie("plugin_load_skills");
    return dedupedSkills;
  });
});
export {Lgo,tqp,nqp,rqp,Gtl,cqt,cjn,Vtl,ztl,Ktl,nH,Q6e,Mgo,uqt};
