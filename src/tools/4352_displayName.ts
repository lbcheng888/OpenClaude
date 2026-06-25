// @ts-nocheck
import {Fv,qK} from "../../vendor/m709.ts";
import {or,Ed,dn} from "../config/0137_namespace.ts";
import {pm,l1} from "../core/2694_l1.ts";
import {p3} from "../../vendor/m728.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {hDt,HF,get,Pbn,Dbn,bUe,xf,HA} from "../../vendor/m2219.ts";
import {$ce,WY,n6,Omt,Xq,S5e} from "../agent/5220_bigint.ts";
import {parseUserSpecifiedModel as Qo,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {dynamicTeamContext as IF,gD,iO,Cp} from "../config/2223_level.ts";
import {wPn,Pit,XFt} from "../../vendor/m3267.ts";
import {Aj,Nae,G9e} from "../../vendor/m3168.ts";
import {PW} from "../../vendor/m3266.ts";
import {getSessionId as It,getOriginalCwd as gr,lt,getAdditionalDirectoriesForClaudeMd as KH} from "../session/0132_sent.ts";
import {Kh,xl} from "../../vendor/m4427.ts";
import {u8n,d8n,yTo} from "../config/4349_yTo.ts";
import {Uce,Q5e} from "../../vendor/m4347.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Jo,Xd,In,sp,Ct} from "../../vendor/m197.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {tb,oh} from "../../vendor/m2600.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {kj} from "../../vendor/m3208.ts";
import {Zye,TTo} from "../../vendor/m4349.ts";
import {SUe,fDt} from "../permissions/2218_surface.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {JS,ez} from "../../vendor/m2239.ts";
import {xh,wm} from "../../vendor/m707.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {bon,YTr} from "../../vendor/m699.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {b,x} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Po} from "../../vendor/m638.ts";
import {teo} from "../../vendor/m3269.ts";
import {h3} from "../artifact/0736_allow.ts";
import {ig} from "../../vendor/m130.ts";
import {slowOpTracer as pw,Dwe} from "../telemetry/2606_skill_name.ts";
import {STo} from "../../vendor/m4350.ts";
import {wUe} from "../../vendor/m2236.ts";
import {nt,Ni} from "../../vendor/m127.ts";
import {EWi} from "../../vendor/m2809.ts";
/**
 * Skill / command loading and dynamic discovery.
 *
 * Loads SKILL.md skill definitions and legacy command files from policy/user/project
 * settings directories, parses their frontmatter into skill command objects, handles
 * dedup, conditional skills (activated when matching files are touched), and dynamic
 * (project-tree) skill discovery.
 *
 * NOTE: this is a structure-exact reverse-engineered slice. Identifiers are local-only
 * renames; exported/imported/property names and all literals are preserved verbatim.
 */

/** Whether a skill loaded from `loadedFrom` source `e` (with settings source `t`) should use the relative `${CLAUDE_SKILL_DIR}` substitution path. policySettings never qualifies. */
function Yqp(loadedFrom: any, settingsSource: any): any {
  if (settingsSource === "policySettings") return !1;
  return loadedFrom === "skills" || loadedFrom === "commands_DEPRECATED" || loadedFrom === "plugin";
}
/** Resolve the on-disk display path for a settings source `e` and trailing segment `t`. */
function Z5e(settingsSource: any, segment: any): any {
  switch (settingsSource) {
    case "policySettings":
      return Um.join(Fv(), ".claude", segment);
    case "userSettings":
      return Um.join(or(), segment);
    case "projectSettings":
      return `.claude/${segment}`;
    case "plugin":
      return "plugin";
    default:
      return "";
  }
}
/** Build the searchable text blob for a skill (name + description + whenToUse). */
function ETo(skill: any): any {
  return [skill.name, skill.description, skill.whenToUse].filter(Boolean).join(" ");
}
/** Fuzzy-match a skill `e` against query `t`. */
function S6t(skill: any, query: any): any {
  return pm(ETo(skill), query);
}
/** Resolve the real (symlink-followed) path of `e`, or null on failure. */
async function Jqp(path: any): Promise<any> {
  try {
    return await bTo.realpath(path);
  } catch {
    return null;
  }
}
/** Parse and validate the `hooks` frontmatter field of skill `e` (named `t`); logs and returns undefined on invalid input. */
function Xqp(frontmatter: any, skillName: any): any {
  if (!frontmatter.hooks) return;
  let parsed: any = p3().safeParse(frontmatter.hooks);
  if (!parsed.success) {
    A(`Invalid hooks in skill '${skillName}': ${parsed.error.message}`);
    return;
  }
  return parsed.data;
}
/** Normalize the `paths` frontmatter field of skill `e` into a cleaned path list (strips trailing `/**`, drops empties, drops all-`**`). */
function Qqp(frontmatter: any): any {
  if (!frontmatter.paths) return;
  let paths: any = hDt(frontmatter.paths).map((path: any) => path.endsWith("/**") ? path.slice(0, -3) : path).filter((path: any) => path.length > 0);
  if (paths.length === 0 || paths.every((path: any) => path === "**")) return;
  return paths;
}
/** Parse skill frontmatter `e` (with markdown content `t`, display name `n`, default kind label `r`) into the normalized field set consumed by the skill-command factory. */
function CTo(frontmatter: any, markdownContent: any, displayName: any, kindLabel: any = "Skill"): any {
  let resolvedDescription: any = HF(frontmatter.description, displayName),
    description: any = resolvedDescription ?? $ce(markdownContent, kindLabel),
    userInvocable: any = frontmatter["user-invocable"] === void 0 ? !0 : get(frontmatter["user-invocable"]),
    modelField: any = frontmatter.model,
    model: any;
  if (typeof modelField === "string" && modelField.trim().length > 0) {
    let trimmedModel: any = modelField.trim();
    model = trimmedModel === "inherit" ? void 0 : Qo(trimmedModel);
  }
  let effortField: any = frontmatter.effort,
    effort: any = effortField !== void 0 ? IF(effortField) : void 0;
  if (effortField !== void 0 && effort === void 0) A(`Skill ${displayName} has invalid effort '${effortField}'. Valid options: ${gD.join(", ")} or an integer`);
  return {
    displayName: frontmatter.name != null ? String(frontmatter.name) : void 0,
    description: description,
    hasUserSpecifiedDescription: resolvedDescription !== null,
    allowedTools: WY(frontmatter["allowed-tools"]),
    disallowedTools: WY(frontmatter["disallowed-tools"] ?? frontmatter.disallowedTools),
    argumentHint: frontmatter["argument-hint"] != null ? String(frontmatter["argument-hint"]) : void 0,
    argumentNames: wPn(frontmatter.arguments),
    whenToUse: frontmatter.when_to_use != null ? String(frontmatter.when_to_use) : void 0,
    version: frontmatter.version != null ? String(frontmatter.version) : void 0,
    model: model,
    disableModelInvocation: get(frontmatter["disable-model-invocation"]),
    userInvocable: userInvocable,
    hooks: Xqp(frontmatter, displayName),
    executionContext: frontmatter.context === "fork" ? "fork" : void 0,
    agent: frontmatter.agent != null ? String(frontmatter.agent) : void 0,
    effort: effort,
    shell: Pbn(frontmatter.shell, displayName),
    createdBy: frontmatter.created_by === "dream-proposal" || frontmatter.improved_by === "dream-proposal" ? "dream-proposal" : void 0,
    declaredFields: Dbn(frontmatter),
    fallback: bUe(frontmatter.fallback)
  };
}
/** Build the prompt prefix describing an MCP-served skill `e` (server/uri, plus optional directory-read hint). */
function Zqp(mcpResource: any): any {
  let directoryReadHint: any = mcpResource.directoryRead ? ` Call ${Aj} on "${mcpResource.uri}" or a subdirectory URI to list its contents.` : "";
  return `This skill is served by MCP server "${mcpResource.server}" at ${mcpResource.uri}. ` + `To read a supporting file this skill references by a relative path — for example "templates/invoice.md" — call ${Nae} with server "${mcpResource.server}" and uri "${mcpResource.uri}/templates/invoice.md".${directoryReadHint}`;
}
/** Factory: build a prompt-type skill command object from the parsed frontmatter fields. */
function b6t({
  skillName: skillName,
  displayName: displayName,
  description: description,
  hasUserSpecifiedDescription: hasUserSpecifiedDescription,
  markdownContent: markdownContent,
  allowedTools: allowedTools,
  disallowedTools: disallowedTools,
  argumentHint: argumentHint,
  argumentNames: argumentNames,
  whenToUse: whenToUse,
  version: version,
  model: model,
  disableModelInvocation: disableModelInvocation,
  userInvocable: userInvocable,
  source: source,
  baseDir: baseDir,
  mcpResourceRoot: mcpResourceRoot,
  loadedFrom: loadedFrom,
  hooks: hooks,
  executionContext: executionContext,
  agent: agent,
  paths: paths,
  effort: effort,
  shell: shell,
  createdBy: createdBy,
  declaredFields: declaredFields,
  fallback: fallback
}: any): any {
  if (baseDir && allowedTools.length > 0) {
    let resolvedBaseDir: any = baseDir;
    allowedTools = allowedTools.map((tool: any) => tool.replace(/\$\{CLAUDE_SKILL_DIR\}/g, () => resolvedBaseDir));
  }
  return {
    type: "prompt",
    name: skillName,
    description: description,
    hasUserSpecifiedDescription: hasUserSpecifiedDescription,
    allowedTools: allowedTools,
    disallowedTools: disallowedTools?.length ? disallowedTools : void 0,
    argumentHint: argumentHint,
    argNames: argumentNames.length > 0 ? argumentNames : void 0,
    whenToUse: whenToUse,
    version: version,
    model: model,
    disableModelInvocation: disableModelInvocation,
    userInvocable: userInvocable,
    context: executionContext,
    agent: agent,
    effort: effort,
    paths: paths,
    declaredFields: declaredFields,
    contentLength: markdownContent.length,
    isHidden: !userInvocable,
    progressMessage: "running",
    userFacingName() {
      return displayName || skillName;
    },
    source: source,
    loadedFrom: loadedFrom,
    createdBy: createdBy,
    fallback: fallback,
    hooks: hooks,
    skillRoot: baseDir,
    async getPromptForCommand(args: any, context: any) {
      let prompt: any = baseDir ? `Base directory for this skill: ${baseDir}

${markdownContent}` : mcpResourceRoot ? `${Zqp(mcpResourceRoot)}

${markdownContent}` : markdownContent;
      if (prompt = Pit(prompt, args, !0, argumentNames, PW), baseDir) {
        let resolvedBaseDir: any = baseDir;
        prompt = prompt.replaceAll("${CLAUDE_SKILL_DIR}", resolvedBaseDir);
      }
      if (prompt = prompt.replace(/\$\{CLAUDE_SESSION_ID\}/g, It()), prompt = prompt.replaceAll("${CLAUDE_EFFORT}", iO(model ?? context.options.mainLoopModel, effort ?? Kh(context))), Yqp(loadedFrom, source) && u8n()) prompt = d8n(prompt);else if (loadedFrom !== "mcp") prompt = await Uce(prompt, {
        ...context,
        getAppState() {
          let appState: any = context.getAppState();
          return {
            ...appState,
            toolPermissionContext: {
              ...appState.toolPermissionContext,
              alwaysAllowRules: {
                ...appState.toolPermissionContext.alwaysAllowRules,
                command: allowedTools
              }
            }
          };
        }
      }, `/${skillName}`, shell);
      return [{
        type: "text",
        text: prompt
      }];
    }
  };
}
/** Read every SKILL.md under directory `e` for settings source `t`, parse each into a skill command, dedup disabled plugins, and return the sorted list. */
async function Pmt(dir: any, settingsSource: any): Promise<any> {
  let fs: any = Wt(),
    entries: any;
  try {
    entries = await fs.readdir(dir);
  } catch (err: any) {
    if (!Jo(err)) A(`Failed to read skills directory ${dir}: ${err}`, {
      level: "error"
    }), Pt("skill_load_dir", "skill_load_readdir_failed");
    return [];
  }
  if (entries.length === 0 && dir.startsWith("/mnt/")) {
    await Kn(250);
    try {
      let retryEntries: any = await fs.readdir(dir);
      if (retryEntries.length > 0) A(`Skills directory ${dir}: first readdir was empty, retry returned ${retryEntries.length} entries (transient mount race)`, {
        level: "warn"
      }), Pt("skill_load_dir", "skill_load_mnt_transient_empty"), entries = retryEntries;else Pt("skill_load_dir", "skill_load_mnt_persistent_empty");
    } catch (err: any) {
      let errCode: any = Xd(err);
      if (Pt("skill_load_dir", `skill_load_mnt_retry_${(errCode ?? "unknown").toLowerCase()}`), !Jo(err)) A(`Skills directory ${dir}: retry readdir failed: ${err}`, {
        level: "error"
      });
    }
  }
  let failureReason: any = null,
    disabledPluginNames: any = new Set();
  {
    let pluginSuffix: any = `@${tb}`;
    if (settingsSource === "userSettings" && dir === Um.join(or(), "skills") || settingsSource === "projectSettings" && dir === Um.join(gr(), ".claude", "skills")) {
      let enabledPlugins: any = Fr().enabledPlugins;
      for (let pluginName in enabledPlugins) if (enabledPlugins[pluginName] === !1 && pluginName.endsWith(pluginSuffix)) disabledPluginNames.add(pluginName.slice(0, -pluginSuffix.length));
    }
  }
  let loaded: any = await Promise.all(entries.map(async (entry: any) => {
    try {
      if (!entry.isDirectory() && !entry.isSymbolicLink()) return null;
      let skillDir: any = Um.join(dir, entry.name),
        skillFile: any = Um.join(skillDir, "SKILL.md");
      if (disabledPluginNames.size > 0) {
        let pluginName: any = entry.name;
        try {
          let manifestRaw: any = await fs.readFile(Um.join(skillDir, ".claude-plugin", "plugin.json"), {
              encoding: "utf-8"
            }),
            manifest: any = JSON.parse(manifestRaw);
          if (manifest !== null && typeof manifest === "object" && "name" in manifest && typeof manifest.name === "string" && manifest.name) pluginName = manifest.name;
        } catch (err: any) {
          if (!In(err)) ;else pluginName = null;
        }
        if (pluginName !== null && disabledPluginNames.has(pluginName)) return null;
      }
      let fileSize: any = 0;
      try {
        fileSize = (await fs.stat(skillFile)).size ?? 0;
      } catch {}
      if (fileSize > kj) return A(`[skills] skipping ${skillFile}: ${fileSize} bytes exceeds ${kj} byte limit`, {
        level: "warn"
      }), failureReason = "skill_load_too_large", null;
      let raw: any;
      try {
        raw = await fs.readFile(skillFile, {
          encoding: "utf-8"
        });
      } catch (err: any) {
        if (!In(err)) A(`[skills] failed to read ${skillFile}: ${err}`, {
          level: "warn"
        }), failureReason = "skill_load_read_failed";
        return null;
      }
      let {
        frontmatter: frontmatter,
        content: content,
        parseError: parseError
      } = xf(raw, skillFile, {
        normalizeKeys: !0
      });
      if (parseError) A(`[skills] YAML frontmatter in ${skillFile} failed to parse and was ignored: ${parseError}`, {
        level: "error"
      }), Pt("skill_load_dir", "skill_load_yaml_failed");
      let markdownContent: any = Zye(skillFile, content),
        skillName: any = entry.name;
      SUe("skill", frontmatter);
      let parsedFields: any = CTo(frontmatter, markdownContent, skillName),
        paths: any = Qqp(frontmatter);
      return {
        skill: b6t({
          ...parsedFields,
          skillName: skillName,
          markdownContent: markdownContent,
          source: settingsSource,
          baseDir: skillDir,
          loadedFrom: "skills",
          paths: paths
        }),
        filePath: skillFile
      };
    } catch (err: any) {
      return A(`[skills] failed to parse ${Um.join(dir, entry.name, "SKILL.md")}: ${err}`, {
        level: "error"
      }), failureReason = "skill_load_parse_failed", null;
    }
  }));
  if (failureReason) xe("skill_load_dir", failureReason);else He("skill_load_dir");
  return loaded.filter((entry: any) => entry !== null).sort((a: any, b: any) => a.skill.name.localeCompare(b.skill.name));
}
/** Whether path `e` is a SKILL.md file (case-insensitive basename match). */
function ATo(filePath: any): any {
  return /^skill\.md$/i.test(Um.basename(filePath));
}
/** Collapse multiple skill/command files in the same directory: prefer a single SKILL.md, otherwise keep all. */
function e6p(entries: any): any {
  let byDir: any = new Map();
  for (let entry of entries) {
    let dir: any = Um.dirname(entry.filePath),
      group: any = byDir.get(dir) ?? [];
    group.push(entry), byDir.set(dir, group);
  }
  let result: any = [];
  for (let [dir, group] of byDir) {
    let skillFiles: any = group.filter((entry: any) => ATo(entry.filePath));
    if (skillFiles.length > 0) {
      let first: any = skillFiles[0];
      if (skillFiles.length > 1) A(`Multiple skill files found in ${dir}, using ${Um.basename(first.filePath)}`);
      result.push(first);
    } else result.push(...group);
  }
  return result;
}
/** Compute the colon-joined relative path of `e` under base directory `t` (empty if not under base). */
function Ftl(filePath: any, baseDir: any): any {
  let normalizedBase: any = baseDir.endsWith(Um.sep) ? baseDir.slice(0, -1) : baseDir;
  if (!filePath.startsWith(normalizedBase + Um.sep)) return "";
  let relative: any = filePath.slice(normalizedBase.length + 1);
  return relative ? relative.split(Um.sep).join(":") : "";
}
/** Derive the namespaced command name for a SKILL.md file `e` under base `t` (uses parent dir as leaf name). */
function t6p(filePath: any, baseDir: any): any {
  let dir: any = Um.dirname(filePath),
    parentDir: any = Um.dirname(dir),
    leaf: any = Um.basename(dir),
    prefix: any = Ftl(parentDir, baseDir);
  return prefix ? `${prefix}:${leaf}` : leaf;
}
/** Derive the namespaced command name for a plain `.md` command file `e` under base `t`. */
function n6p(filePath: any, baseDir: any): any {
  let base: any = Um.basename(filePath),
    dir: any = Um.dirname(filePath),
    leaf: any = base.replace(/\.md$/, ""),
    prefix: any = Ftl(dir, baseDir);
  return prefix ? `${prefix}:${leaf}` : leaf;
}
/** Resolve the command name for an entry depending on whether it is a SKILL.md or a plain `.md` command. */
function r6p(entry: any): any {
  return ATo(entry.filePath) ? t6p(entry.filePath, entry.baseDir) : n6p(entry.filePath, entry.baseDir);
}
/** Load legacy custom commands from the `commands` source plus per-project `.claude/commands` dirs, parse them into skill commands, and return them sorted. */
async function o6p(e: any, projectDirs: any): Promise<any> {
  try {
    let [builtinCommands, projectCommands]: any = await Promise.all([n6("commands", e), Promise.all(projectDirs.map((projectDir: any) => {
        let commandsDir: any = Um.join(projectDir, ".claude", "commands");
        return Omt(commandsDir).then((cmds: any) => cmds.map((cmd: any) => ({
          ...cmd,
          baseDir: commandsDir,
          source: "projectSettings"
        })));
      }))]),
      allCommands: any = [...builtinCommands, ...projectCommands.flat()],
      dedupedCommands: any = e6p(allCommands),
      result: any = [],
      hadFailure: any = !1;
    for (let {
      baseDir: baseDir,
      filePath: filePath,
      frontmatter: frontmatter,
      content: content,
      source: source
    } of dedupedCommands) try {
      let skillBaseDir: any = ATo(filePath) ? Um.dirname(filePath) : void 0,
        commandName: any = r6p({
          baseDir: baseDir,
          filePath: filePath,
          frontmatter: frontmatter,
          content: content,
          source: source
        });
      SUe("skill", frontmatter);
      let parsedFields: any = CTo(frontmatter, content, commandName, "Custom command");
      result.push({
        skill: b6t({
          ...parsedFields,
          skillName: commandName,
          displayName: void 0,
          markdownContent: Zye(filePath, content),
          source: source,
          baseDir: skillBaseDir,
          loadedFrom: "commands_DEPRECATED",
          paths: void 0
        }),
        filePath: filePath
      });
    } catch (err: any) {
      A(`[skills] failed to load command from ${filePath}: ${err}`, {
        level: "error"
      }), hadFailure = !0;
    }
    if (hadFailure) xe("skill_load_commands_dir", "skill_load_commands_parse_failed");else He("skill_load_commands_dir");
    return result.sort((a: any, b: any) => a.skill.name.localeCompare(b.skill.name));
  } catch (err: any) {
    if (sp(err)) A(`[skills] commands-dir load failed: ${err.code}`, {
      level: "error"
    });else Ie(err);
    return Pt("skill_load_commands_dir", "skill_load_commands_dir_failed"), [];
  }
}
/** Build the set of real (symlink-followed) SKILL.md paths under the user skills dir, skipping disabled plugins; returns null when skills are disabled/unavailable. */
async function Btl(): Promise<any> {
  if (JS("skills") || !xh("userSettings") || Ed() || Vl("skills")) return null;
  let skillsDir: any = Um.join(or(), "skills"),
    entries: any;
  try {
    entries = await Wt().readdir(skillsDir);
  } catch {
    return null;
  }
  let pluginSuffix: any = `@${tb}`,
    enabledPlugins: any = Fr().enabledPlugins,
    disabledPluginNames: any = new Set();
  for (let pluginName in enabledPlugins) if (enabledPlugins[pluginName] === !1 && pluginName.endsWith(pluginSuffix)) disabledPluginNames.add(pluginName.slice(0, -pluginSuffix.length));
  let realPaths: any = await Promise.all(entries.map(async (entry: any) => {
    if (!entry.isDirectory() && !entry.isSymbolicLink()) return null;
    if (disabledPluginNames.has(entry.name)) return null;
    try {
      return await bTo.realpath(Um.join(skillsDir, entry.name, "SKILL.md"));
    } catch {
      return null;
    }
  }));
  return new Set(realPaths.filter((path: any) => path !== null));
}
/** Clear the cached skill-loader result and reset the conditional-skill state of the current dynamic-skill store. */
function e8e(): any {
  T6t.cache?.clear?.(), n6.cache?.clear?.();
  let state: any = A6t();
  if (state) state.conditionalSkills.clear(), state.activatedConditionalSkillNames.clear();
}
/** Create an empty dynamic-skill state record. */
function RTo(): any {
  return {
    dynamicSkillDirs: new Set(),
    dynamicSkills: new Map(),
    conditionalSkills: new Map(),
    activatedConditionalSkillNames: new Set()
  };
}
/** Return the key identifying the current dynamic-skill state bucket. */
function C6t(): any {
  return E6t();
}
/** Get (lazily creating) the dynamic-skill state for the current key. */
function t6(): any {
  let key: any = E6t(),
    state: any = p8n.get(key);
  if (!state) state = RTo(), p8n.set(key, state);
  return state;
}
/** Get the dynamic-skill state for the current key, or null if none exists yet. */
function A6t(): any {
  return p8n.get(E6t()) ?? null;
}
/** Set the dynamic-skill state for the current key. */
function Utl(state: any): any {
  p8n.set(E6t(), state);
}
/** Subscribe `e` to dynamic-skill change notifications, swallowing/logging callback errors. */
function $tl(callback: any): any {
  return vTo.subscribe(() => {
    try {
      callback();
    } catch (err: any) {
      Ie(err);
    }
  });
}
/** Walk up from each path in `e` (bounded by base `t`) collecting not-yet-seen, non-gitignored `.claude/skills` directories. */
async function Yut(paths: any, baseDir: any): Promise<any> {
  if (Vl("skills")) return [];
  let fs: any = Wt(),
    normalizedBase: any = baseDir.endsWith(Um.sep) ? baseDir.slice(0, -1) : baseDir,
    discovered: any = [];
  for (let path of paths) {
    let dir: any = Um.dirname(path);
    while (dir.startsWith(normalizedBase + Um.sep)) {
      let skillsDir: any = Um.join(dir, ".claude", "skills");
      if (!t6().dynamicSkillDirs.has(skillsDir)) {
        t6().dynamicSkillDirs.add(skillsDir);
        try {
          if (await fs.stat(skillsDir), await bon(dir, normalizedBase)) {
            A(`[skills] Skipped gitignored skills dir: ${skillsDir}`);
            continue;
          }
          discovered.push(skillsDir);
        } catch {}
      }
      let parent: any = Um.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return discovered;
}
/** Compute the dedup key for a skill (skillRoot for prompt skills, joined with NUL and the name). */
function qtl(skill: any): any {
  return `${skill.type === "prompt" ? skill.skillRoot ?? "" : ""}\x00${skill.name}`;
}
/** Discover and register dynamic project skills from directories `e`, emitting a change event when new ones appear. */
async function Jut(dirs: any): Promise<any> {
  if (Vl("skills") || !xh("projectSettings") || JS("skills")) {
    A("[skills] Dynamic skill discovery skipped: projectSettings disabled or plugin-only policy");
    return;
  }
  if (dirs.length === 0) return;
  let previousKeys: any = new Set(t6().dynamicSkills.keys()),
    loadedPerDir: any = await Promise.all(dirs.map((dir: any) => Pmt(dir, "projectSettings")));
  for (let loaded of loadedPerDir) for (let {
    skill: skill
  } of loaded) if (skill.type === "prompt") t6().dynamicSkills.set(qtl(skill), skill);
  let totalLoaded: any = loadedPerDir.flat().length;
  if (totalLoaded > 0) {
    let addedKeys: any = [...t6().dynamicSkills.keys()].filter((key: any) => !previousKeys.has(key));
    if (A(`[skills] Dynamically discovered ${totalLoaded} skills from ${dirs.length} directories`), addedKeys.length > 0) W("tengu_dynamic_skills_changed", {
      source: Ve("file_operation"),
      previousCount: previousKeys.size,
      newCount: t6().dynamicSkills.size,
      addedCount: addedKeys.length,
      directoryCount: dirs.length
    });
  }
  vTo.emit();
}
/** Return all dynamic skills sorted by name (tie-broken by dedup key). */
function Wtl(): any {
  return Array.from(A6t()?.dynamicSkills.entries() ?? []).sort(([keyA, skillA], [keyB, skillB]) => skillA.name === skillB.name ? keyA.localeCompare(keyB) : skillA.name.localeCompare(skillB.name)).map(([, skill]) => skill);
}
/** Activate any conditional skills whose path patterns match one of the touched files `e` (relative to base `t`), registering them as dynamic skills. */
function Xut(touchedFiles: any, baseDir: any): any {
  if ((A6t()?.conditionalSkills.size ?? 0) === 0) return [];
  let activated: any = [];
  for (let [name, skill] of t6().conditionalSkills) {
    if (skill.type !== "prompt" || !skill.paths || skill.paths.length === 0) continue;
    let matcher: any = Ntl.default().add(skill.paths);
    for (let file of touchedFiles) {
      let relative: any = Um.isAbsolute(file) ? Um.relative(baseDir, file) : file;
      if (!relative || relative.startsWith("..") || Um.isAbsolute(relative)) continue;
      if (matcher.ignores(relative)) {
        t6().dynamicSkills.set(qtl(skill), skill), t6().conditionalSkills.delete(name), t6().activatedConditionalSkillNames.add(name), activated.push(name), A(`[skills] Activated conditional skill '${name}' (matched path: ${relative})`);
        break;
      }
    }
  }
  if (activated.length > 0) W("tengu_dynamic_skills_changed", {
    source: Ve("conditional_paths"),
    previousCount: t6().dynamicSkills.size - activated.length,
    newCount: t6().dynamicSkills.size,
    addedCount: activated.length,
    directoryCount: 0
  }), vTo.emit();
  return activated;
}
/** Return all currently-stored conditional skills. */
function Gtl(): any {
  return Array.from(A6t()?.conditionalSkills.values() ?? []);
}
/** Fully reset all dynamic-skill state (dirs, skills, conditional skills, activated names). */
function Vtl(): any {
  let state: any = A6t();
  if (!state) return;
  state.dynamicSkillDirs.clear(), state.dynamicSkills.clear(), state.conditionalSkills.clear(), state.activatedConditionalSkillNames.clear();
}
var bTo: any,
  Ntl: any,
  Um: any,
  T6t: any,
  s6p = "cli",
  E6t = () => s6p,
  p8n: any,
  vTo: any;
var $q = b(() => {
  Wi();
  lt();
  fDt();
  mn();
  kt();
  l1();
  G9e();
  XFt();
  xl();
  ky();
  Po();
  qe();
  Cp();
  dn();
  Ct();
  HA();
  ps();
  YTr();
  vn();
  Xq();
  Ro();
  oh();
  teo();
  Q5e();
  wm();
  qK();
  ez();
  br();
  h3();
  ig();
  yTo();
  pw();
  TTo();
  STo();
  bTo = require("fs/promises"), Ntl = x(wUe(), 1), Um = require("path");
  T6t = Hn(async (e: any) => {
    let userSkillsDir: any = Um.join(or(), "skills"),
      managedSkillsDir: any = Um.join(Fv(), ".claude", "skills"),
      projectSkillsDirs: any = S5e("skills", e);
    A(`Loading skills from: managed=${managedSkillsDir}, user=${userSkillsDir}, project=[${projectSkillsDirs.join(", ")}]`);
    let additionalDirs: any = KH(),
      pluginOnly: any = JS("skills"),
      projectEnabled: any = xh("projectSettings") && !pluginOnly;
    if (Vl("skills", {
      explicitlyRequested: additionalDirs.length > 0 && projectEnabled
    })) return A("[reduced mode] Skipping skill dir discovery"), [];
    if (Ed()) return (await Promise.all(additionalDirs.map((dir: any) => Pmt(Um.join(dir, ".claude", "skills"), "projectSettings")))).flat().map((entry: any) => entry.skill);
    let [policySkills, userSkills, projectSkills, additionalSkills, legacyCommands]: any = await Promise.all([nt(process.env.CLAUDE_CODE_DISABLE_POLICY_SKILLS) ? Promise.resolve([]) : Pmt(managedSkillsDir, "policySettings"), xh("userSettings") && !pluginOnly ? Pmt(userSkillsDir, "userSettings") : Promise.resolve([]), projectEnabled ? Promise.all(projectSkillsDirs.map((dir: any) => Pmt(dir, "projectSettings"))) : Promise.resolve([]), projectEnabled ? Promise.all(additionalDirs.map((dir: any) => Pmt(Um.join(dir, ".claude", "skills"), "projectSettings"))) : Promise.resolve([]), pluginOnly ? Promise.resolve([]) : o6p(e, projectEnabled ? additionalDirs : [])]),
      allLoaded: any = [...policySkills, ...userSkills, ...projectSkills.flat(), ...additionalSkills.flat(), ...legacyCommands],
      realPaths: any = await Promise.all(allLoaded.map(({
        skill: skill,
        filePath: filePath
      }: any) => skill.type === "prompt" ? Jqp(filePath) : Promise.resolve(null))),
      seenPaths: any = new Map(),
      uniqueSkills: any = [];
    for (let idx = 0; idx < allLoaded.length; idx++) {
      let entry: any = allLoaded[idx];
      if (entry === void 0 || entry.skill.type !== "prompt") continue;
      let {
          skill: skill
        }: any = entry,
        realPath: any = realPaths[idx];
      if (realPath === null || realPath === void 0) {
        uniqueSkills.push(skill);
        continue;
      }
      let priorSource: any = seenPaths.get(realPath);
      if (priorSource !== void 0) {
        A(`Skipping duplicate skill '${skill.name}' from ${skill.source} (same file already loaded from ${priorSource})`);
        continue;
      }
      seenPaths.set(realPath, skill.source), uniqueSkills.push(skill);
    }
    Dwe("skill", uniqueSkills.map((skill: any) => ({
      name: skill.name,
      source: skill.source
    })), {
      resolves: !1
    });
    let dupCount: any = allLoaded.length - uniqueSkills.length;
    if (dupCount > 0) A(`Deduplicated ${dupCount} skills (same file)`);
    let unconditionalSkills: any = [],
      conditionalSkills: any = [];
    for (let skill of uniqueSkills) if (skill.type === "prompt" && skill.paths && skill.paths.length > 0 && !t6().activatedConditionalSkillNames.has(skill.name)) conditionalSkills.push(skill);else unconditionalSkills.push(skill);
    for (let skill of conditionalSkills) t6().conditionalSkills.set(skill.name, skill);
    if (conditionalSkills.length > 0) A(`[skills] ${conditionalSkills.length} conditional skills stored (activated when matching files are touched)`);
    return A(`Loaded ${uniqueSkills.length} unique skills (${unconditionalSkills.length} unconditional, ${conditionalSkills.length} conditional, managed: ${policySkills.length}, user: ${userSkills.length}, project: ${projectSkills.flat().length}, additional: ${additionalSkills.flat().length}, legacy commands: ${legacyCommands.length})`), unconditionalSkills;
  }, (e: any) => `${E6t()}:${e}`);
  if (!(T6t.cache instanceof Map)) T6t.cache = new Map();
  p8n = new Map();
  vTo = Ni();
  EWi({
    createSkillCommand: b6t,
    parseSkillFrontmatterFields: CTo
  });
});

export {Yqp,Z5e,ETo,S6t,Jqp,Xqp,Qqp,CTo,Zqp,b6t,Pmt,ATo,e6p,Ftl,t6p,n6p,r6p,o6p,Btl,e8e,RTo,C6t as getDynamicSkillStateKey,t6,A6t,Utl,$tl,Yut,qtl,Jut,Wtl,Xut,Gtl,Vtl,bTo,Ntl,Um,T6t,s6p,E6t,p8n,vTo,$q};
