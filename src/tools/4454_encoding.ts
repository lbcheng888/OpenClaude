// @ts-nocheck
import {Wt,CX,ps} from "../../vendor/m230.ts";
import {yft,kGn} from "../../vendor/m4452.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {xf,HF,get,Pbn,Dbn,HA} from "../../vendor/m2219.ts";
import {Zye,TTo} from "../../vendor/m4349.ts";
import {$ce,WY,Xq} from "../agent/5220_bigint.ts";
import {Ree,yxn,$O,V4} from "../../vendor/m3150.ts";
import {wPn,Pit,XFt} from "../../vendor/m3267.ts";
import {parseUserSpecifiedModel as Qo,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {dynamicTeamContext as IF,gD,iO,Cp} from "../config/2223_level.ts";
import {p3} from "../../vendor/m728.ts";
import {PW} from "../../vendor/m3266.ts";
import {getSessionId as It,lt,getInlinePlugins as QV,ZV,getInlinePluginUrls as kre} from "../session/0132_sent.ts";
import {Kh,xl} from "../../vendor/m4427.ts";
import {u8n,d8n,yTo} from "../config/4349_yTo.ts";
import {Uce,Q5e} from "../../vendor/m4347.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {mn,xe,He} from "../telemetry/0600_feature_name.ts";
import {$q,Btl} from "./4352_displayName.ts";
import {Q8,fT} from "../../vendor/m2594.ts";
import {ky,buildMcpToolName as Vl} from "../agent/2238_explicitlyRequested.ts";
import {h3} from "../artifact/0736_allow.ts";
import {path as Eg,loadAllPluginsCacheOnly as np} from "../agent/4467_resolvePluginRoot.ts";
// @ts-nocheck
function Lgo(filePath) {
  return /^skill\.md$/i.test(nH.basename(filePath));
}
function tqp(filePath, baseDir, pluginName) {
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
async function nqp(dirPath, baseDir, seenPaths) {
  let results = [],
    fs = Wt();
  return await yft(dirPath, async filePath => {
    if (CX(fs, filePath, seenPaths)) return;
    let fileContent;
    try {
      fileContent = await fs.readFile(filePath, {
        encoding: "utf-8"
      });
    } catch (err) {
      A(`Failed to read plugin command ${filePath}: ${err}`, {
        level: "error"
      });
      return;
    }
    let {
      frontmatter: frontmatter,
      content: content
    } = xf(fileContent, filePath, {
      normalizeKeys: true
    });
    results.push({
      filePath: filePath,
      baseDir: baseDir,
      frontmatter: frontmatter,
      content: Zye(filePath, content)
    });
  }, {
    stopAtSkillDir: true,
    logLabel: "commands"
  }), results.sort((a, b_2) => a.filePath.localeCompare(b_2.filePath));
}
function rqp(fileEntries) {
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
      if (skillFiles.length > 1) A(`Multiple skill files found in ${dirPath}, using ${nH.basename(skillFile.filePath)}`);
      deduped.push(skillFile);
    } else deduped.push(...entries);
  }
  return deduped;
}
async function Gtl(dirPath, pluginName, source, manifest, pluginPath, options = {
  isSkillMode: false
}, seenPaths = new Set()) {
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
function cqt(commandName, fileEntry, source, manifest, pluginPath, isSkill, options = {
  isSkillMode: false
}) {
  try {
    let {
        frontmatter: frontmatter,
        content: content
      } = fileEntry,
      explicitDesc = HF(frontmatter.description, commandName),
      description = explicitDesc ?? $ce(content, isSkill ? "Plugin skill" : "Plugin command"),
      fileDir = nH.dirname(fileEntry.filePath),
      expandEnv = str => {
        let expanded = Ree(str, {
          path: pluginPath,
          source: source
        });
        if (options.isSkillMode) expanded = expanded.replace(/\$\{CLAUDE_SKILL_DIR\}/g, () => fileDir);
        return expanded;
      },
      allowedToolsRaw = frontmatter["allowed-tools"],
      allowedTools = typeof allowedToolsRaw === "string" ? expandEnv(allowedToolsRaw) : Array.isArray(allowedToolsRaw) ? allowedToolsRaw.map(item => typeof item === "string" ? expandEnv(item) : item) : allowedToolsRaw,
      parsedAllowedTools = WY(allowedTools),
      parsedDisallowedTools = WY(frontmatter["disallowed-tools"] ?? frontmatter.disallowedTools),
      argumentHint = frontmatter["argument-hint"] != null ? String(frontmatter["argument-hint"]) : undefined,
      argNames = wPn(frontmatter.arguments),
      whenToUse = frontmatter.when_to_use != null ? String(frontmatter.when_to_use) : undefined,
      version = frontmatter.version != null ? String(frontmatter.version) : undefined,
      nameOverride = frontmatter.name != null ? String(frontmatter.name) : undefined,
      modelRaw = frontmatter.model,
      resolvedModel;
    if (typeof modelRaw === "string" && modelRaw.trim().length > 0) {
      let modelStr = modelRaw.trim();
      resolvedModel = modelStr === "inherit" ? undefined : Qo(modelStr);
    }
    let effortRaw = frontmatter.effort,
      resolvedEffort = effortRaw !== undefined ? IF(effortRaw) : undefined;
    if (effortRaw !== undefined && resolvedEffort === undefined) A(`Plugin command ${commandName} has invalid effort '${effortRaw}'. Valid options: ${gD.join(", ")} or an integer`);
    let disableModelInvocation = get(frontmatter["disable-model-invocation"]),
      userInvocableRaw = frontmatter["user-invocable"],
      userInvocable = userInvocableRaw === undefined ? true : get(userInvocableRaw),
      shellConfig = Pbn(frontmatter.shell, commandName),
      hooks;
    if ((isSkill || options.isSkillMode) && frontmatter.hooks) {
      let parseResult = p3().safeParse(frontmatter.hooks);
      if (parseResult.success) hooks = parseResult.data;else A(`Invalid hooks in plugin skill '${commandName}': ${parseResult.error.message}`);
    }
    return {
      type: "prompt",
      name: commandName,
      description: description,
      hasUserSpecifiedDescription: explicitDesc !== null,
      allowedTools: parsedAllowedTools,
      disallowedTools: parsedDisallowedTools.length > 0 ? parsedDisallowedTools : undefined,
      argumentHint: argumentHint,
      argNames: argNames.length > 0 ? argNames : undefined,
      whenToUse: whenToUse,
      version: version,
      model: resolvedModel,
      effort: resolvedEffort,
      context: frontmatter.context === "fork" ? "fork" : undefined,
      agent: frontmatter.agent != null ? String(frontmatter.agent) : undefined,
      disableModelInvocation: disableModelInvocation,
      userInvocable: userInvocable,
      declaredFields: Dbn(frontmatter),
      contentLength: content.length,
      source: "plugin",
      loadedFrom: isSkill || options.isSkillMode ? "plugin" : undefined,
      hooks: hooks,
      skillRoot: (isSkill || options.isSkillMode) && hooks ? pluginPath : undefined,
      pluginInfo: {
        pluginManifest: manifest,
        repository: source
      },
      isHidden: !userInvocable,
      progressMessage: isSkill || options.isSkillMode ? "loading" : "running",
      userFacingName() {
        return nameOverride || commandName;
      },
      async getPromptForCommand(args, appCtx) {
        let promptText = options.isSkillMode ? `Base directory for this skill: ${nH.dirname(fileEntry.filePath)}

${content}` : content;
        if (promptText = Pit(promptText, args, true, argNames, PW), promptText = Ree(promptText, {
          path: pluginPath,
          source: source
        }), manifest.userConfig) promptText = yxn(promptText, $O(source), manifest.userConfig, PW);
        if (options.isSkillMode) promptText = promptText.replace(/\$\{CLAUDE_SKILL_DIR\}/g, fileDir);
        if (promptText = promptText.replace(/\$\{CLAUDE_SESSION_ID\}/g, It()), promptText = promptText.replaceAll("${CLAUDE_EFFORT}", iO(resolvedModel ?? appCtx.options.mainLoopModel, resolvedEffort ?? Kh(appCtx))), u8n()) promptText = d8n(promptText);else promptText = await Uce(promptText, {
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
    return A(`Failed to create command from ${fileEntry.filePath}: ${err}`, {
      level: "error"
    }), null;
  }
}
function cjn() {
  Q6e.cache?.clear?.();
}
async function Vtl(skillsDir, pluginName, source, manifest, pluginPath, seenPaths) {
  let fs = Wt(),
    results = [],
    skillMdPath = nH.join(skillsDir, "SKILL.md"),
    skillMdContent = null;
  try {
    skillMdContent = await fs.readFile(skillMdPath, {
      encoding: "utf-8"
    });
  } catch (err) {
    if (!In(err)) return A(`Failed to load skill from ${skillMdPath}: ${err}`, {
      level: "error"
    }), results;
  }
  if (skillMdContent !== null) {
    if (CX(fs, skillMdPath, seenPaths)) return results;
    try {
      let {
          frontmatter: frontmatter,
          content: content
        } = xf(skillMdContent, skillMdPath, {
          normalizeKeys: true
        }),
        sanitizedName = ((typeof frontmatter.name === "string" ? frontmatter.name.trim() : "") || nH.basename(skillsDir)).replace(/[^a-zA-Z0-9_-]/g, "-"),
        skillCommandName = `${pluginName}:${sanitizedName}`,
        skillEntry = {
          filePath: skillMdPath,
          baseDir: nH.dirname(skillMdPath),
          frontmatter: frontmatter,
          content: Zye(skillMdPath, content)
        },
        skill = cqt(skillCommandName, skillEntry, source, manifest, pluginPath, true, {
          isSkillMode: true
        });
      if (skill) results.push({
        skill: skill,
        filePath: skillMdPath
      });
    } catch (err) {
      A(`Failed to load skill from ${skillMdPath}: ${err}`, {
        level: "error"
      });
    }
    return results;
  }
  let dirEntries;
  try {
    dirEntries = await fs.readdir(skillsDir);
  } catch (err) {
    if (!In(err)) A(`Failed to load skills from directory ${skillsDir}: ${err}`, {
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
      if (!In(err)) A(`Failed to load skill from ${subSkillMdPath}: ${err}`, {
        level: "error"
      });
      return;
    }
    if (CX(fs, subSkillMdPath, seenPaths)) return;
    try {
      let {
          frontmatter: frontmatter,
          content: content
        } = xf(subContent, subSkillMdPath, {
          normalizeKeys: true
        }),
        subSkillName = `${pluginName}:${dirEntry.name.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
        subSkillEntry = {
          filePath: subSkillMdPath,
          baseDir: nH.dirname(subSkillMdPath),
          frontmatter: frontmatter,
          content: Zye(subSkillMdPath, content)
        },
        skill = cqt(subSkillName, subSkillEntry, source, manifest, pluginPath, true, {
          isSkillMode: true
        });
      if (skill) results.push({
        skill: skill,
        filePath: subSkillMdPath
      });
    } catch (err) {
      A(`Failed to load skill from ${subSkillMdPath}: ${err}`, {
        level: "error"
      });
    }
  })), results.sort((a, b_2) => a.skill.name.localeCompare(b_2.skill.name));
}
function ztl() {
  Mgo.cache?.clear?.();
}
var Ktl, nH, Q6e, Mgo;
var uqt = b(() => {
  Wi();
  lt();
  mn();
  $q();
  TTo();
  Q8();
  XFt();
  xl();
  ky();
  qe();
  Cp();
  Ct();
  HA();
  ps();
  Xq();
  Ro();
  Q5e();
  h3();
  yTo();
  Eg();
  V4();
  kGn();
  Ktl = require("fs/promises"), nH = require("path");
  Q6e = Hn(async () => {
    if (Vl("plugins", {
      explicitlyRequested: QV().length > 0 || ZV().length > 0 || kre().length > 0
    })) return [];
    let {
      enabled: enabledPlugins,
      errors: loadErrors
    } = await np();
    if (loadErrors.length > 0) A(`Plugin loading errors: ${loadErrors.map(err => fT(err)).join(", ")}`);
    let failureType = null,
      allCommands = (await Promise.all(enabledPlugins.map(async plugin => {
        let seenPaths = new Set(),
          pluginCommands = [];
        if (plugin.commandsPath) try {
          let loadedCommands = await Gtl(plugin.commandsPath, plugin.name, plugin.source, plugin.manifest, plugin.path, {
            isSkillMode: false
          }, seenPaths);
          if (pluginCommands.push(...loadedCommands), loadedCommands.length > 0) A(`Loaded ${loadedCommands.length} commands from plugin ${plugin.name} default directory`);
        } catch (err) {
          failureType = "plugin_load_commands_dir_failed", A(`Failed to load commands from plugin ${plugin.name} default directory: ${err}`, {
            level: "error"
          });
        }
        if (plugin.commandsPaths) {
          A(`Plugin ${plugin.name} has commandsPaths: ${plugin.commandsPaths.join(", ")}`);
          let pathResults = await Promise.all(plugin.commandsPaths.map(async cmdPath => {
            try {
              let fs = Wt(),
                stat = await fs.stat(cmdPath);
              if (A(`Checking commandPath ${cmdPath} - isDirectory: ${stat.isDirectory()}, isFile: ${stat.isFile()}`), stat.isDirectory()) {
                let cmds = await Gtl(cmdPath, plugin.name, plugin.source, plugin.manifest, plugin.path, {
                  isSkillMode: false
                }, seenPaths);
                if (cmds.length > 0) A(`Loaded ${cmds.length} commands from plugin ${plugin.name} custom path: ${cmdPath}`);else A(`Warning: No commands found in plugin ${plugin.name} custom directory: ${cmdPath}. Expected .md files or SKILL.md in subdirectories.`, {
                  level: "warn"
                });
                return cmds;
              } else if (stat.isFile() && cmdPath.endsWith(".md")) {
                if (CX(fs, cmdPath, seenPaths)) return [];
                let fileContent = await fs.readFile(cmdPath, {
                    encoding: "utf-8"
                  }),
                  {
                    frontmatter: frontmatter,
                    content: content
                  } = xf(fileContent, cmdPath, {
                    normalizeKeys: true
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
                    content: Zye(cmdPath, content)
                  },
                  cmd = cqt(resolvedName, fileEntry, plugin.source, plugin.manifest, plugin.path, false);
                if (cmd) return A(`Loaded command from plugin ${plugin.name} custom file: ${cmdPath}${metadataOverride ? " (with metadata override)" : ""}`), [cmd];
              }
              return [];
            } catch (err) {
              return failureType = "plugin_load_commands_path_failed", A(`Failed to load commands from plugin ${plugin.name} custom path ${cmdPath}: ${err}`, {
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
              } = xf(metaVal.content, `<inline:${plugin.name}:${metaKey}>`, {
                normalizeKeys: true
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
                content: Zye(inlineFilePath, content)
              },
              inlineCmd = cqt(inlineName, inlineEntry, plugin.source, plugin.manifest, plugin.path, false);
            if (inlineCmd) pluginCommands.push(inlineCmd), A(`Loaded inline content command from plugin ${plugin.name}: ${inlineName}`);
          } catch (err) {
            failureType = "plugin_load_commands_inline_failed", A(`Failed to load inline content command ${metaKey} from plugin ${plugin.name}: ${err}`, {
              level: "error"
            });
          }
        }
        return pluginCommands;
      }))).flat();
    if (A(`Total plugin commands loaded: ${allCommands.length}`), failureType) xe("plugin_load_commands", failureType);else He("plugin_load_commands");
    return allCommands;
  });
  Mgo = Hn(async () => {
    if (Vl("plugins", {
      explicitlyRequested: QV().length > 0 || ZV().length > 0 || kre().length > 0
    })) return [];
    let {
      enabled: enabledPlugins,
      errors: loadErrors
    } = await np();
    if (loadErrors.length > 0) A(`Plugin loading errors: ${loadErrors.map(err => fT(err)).join(", ")}`);
    A(`getPluginSkills: Processing ${enabledPlugins.length} enabled plugins`);
    let failureType = null,
      skillsWithPaths = (await Promise.all(enabledPlugins.map(async plugin => {
        let seenPaths = new Set(),
          pluginSkills = [];
        if (A(`Checking plugin ${plugin.name}: skillsPath=${plugin.skillsPath ? "exists" : "none"}, skillsPaths=${plugin.skillsPaths ? plugin.skillsPaths.length : 0} paths`), plugin.skillsPath) {
          A(`Attempting to load skills from plugin ${plugin.name} default skillsPath: ${plugin.skillsPath}`);
          try {
            let skills = await Vtl(plugin.skillsPath, plugin.name, plugin.source, plugin.manifest, plugin.path, seenPaths);
            pluginSkills.push(...skills), A(`Loaded ${skills.length} skills from plugin ${plugin.name} default directory`);
          } catch (err) {
            failureType = "plugin_load_skills_dir_failed", A(`Failed to load skills from plugin ${plugin.name} default directory: ${err}`, {
              level: "error"
            });
          }
        }
        if (plugin.skillsPaths) {
          A(`Attempting to load skills from plugin ${plugin.name} skillsPaths: ${plugin.skillsPaths.join(", ")}`);
          let pathResults = await Promise.all(plugin.skillsPaths.map(async skillPath => {
            try {
              A(`Loading from skillPath: ${skillPath} for plugin ${plugin.name}`);
              let skills = await Vtl(skillPath, plugin.name, plugin.source, plugin.manifest, plugin.path, seenPaths);
              return A(`Loaded ${skills.length} skills from plugin ${plugin.name} custom path: ${skillPath}`), skills;
            } catch (err) {
              return failureType = "plugin_load_skills_path_failed", A(`Failed to load skills from plugin ${plugin.name} custom path ${skillPath}: ${err}`, {
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
      })), Btl()]),
      seenRealPaths = new Map(),
      dedupedSkills = [];
    for (let idx = 0; idx < skillsWithPaths.length; idx++) {
      let item = skillsWithPaths[idx];
      if (item === undefined) continue;
      let realPath = realPaths[idx];
      if (realPath === null || realPath === undefined) {
        dedupedSkills.push(item.skill);
        continue;
      }
      if (userSkillPaths !== null && userSkillPaths.has(realPath)) {
        A(`Skipping plugin skill '${item.skill.name}' \u2014 ${realPath} is a user-level skill already surfaced by the skills directory loader`);
        continue;
      }
      let existing = seenRealPaths.get(realPath);
      if (existing !== undefined) {
        A(`Skipping duplicate plugin skill '${item.skill.name}' \u2014 ${realPath} already loaded as '${existing}'`);
        continue;
      }
      seenRealPaths.set(realPath, item.skill.name), dedupedSkills.push(item.skill);
    }
    if (A(`Total plugin skills loaded: ${dedupedSkills.length} (${skillsWithPaths.length - dedupedSkills.length} duplicate/user-owned entries skipped)`), failureType) xe("plugin_load_skills", failureType);else He("plugin_load_skills");
    return dedupedSkills;
  });
});

export {Lgo as HEo,tqp as F7p,nqp as B7p,rqp as U7p,Gtl as xll,cqt as L5t,cjn as HGn,Vtl as Dll,ztl as Oll,Ktl as Pll,nH as CH,Q6e as R8e,Mgo as IEo,uqt as M5t};
