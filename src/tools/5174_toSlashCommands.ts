// @ts-nocheck
import {ft,b,oo} from "../../runtime.ts";
import {isCommandEnabled as YD,getCommandName as mu} from "./4092_done.ts";
import {getDynamicSkillStateKey as C6t,T6t,Wtl,e8e,$q} from "./4352_displayName.ts";
import {sp,mo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {IEo,HGn,Oll,M5t,R8e} from "./4454_encoding.ts";
import {V0o,Cb} from "../../vendor/m5036.ts";
import {cNi,Bnt} from "../../vendor/m2596.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {isClaudeAISubscriber as Eo,isUsing3PServices as F7,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {isFirstPartyAnthropicBaseUrl as Su,Ps,getAPIProvider as Rr} from "../api/1287_usesFirstPartyModelIds.ts";
import {runForkedQuery as mG,d9n,sxe} from "../config/3967_sxe.ts";
import {axe,p$a,S3t} from "../config/3968_maxEditDistance.ts";
import {Nvo,Mvo} from "../../vendor/m4676.ts";
import {getDisableSlashCommands as LU,lt} from "../session/0132_sent.ts";
import {mcpTools as eH,kee} from "../telemetry/3165_kee.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {yT} from "../../vendor/m3150.ts";
import {d3,wm} from "../../vendor/m707.ts";
import {dn} from "../config/0137_namespace.ts";
import {ful,mul} from "../../vendor/m4477.ts";
import {Aul,Cul} from "./4481_type.ts";
import {vul,Rul} from "../../vendor/m4481.ts";
import {Vul,_Co} from "../../vendor/m4487.ts";
import {Kul,yCo} from "../../vendor/m4488.ts";
import {mdl,LCo} from "../../vendor/m4496.ts";
import {bdl,Sdl} from "../../vendor/m4499.ts";
import {Fdl,SVn} from "../../vendor/m4506.ts";
import {Gdl,jCo,Wdl} from "../../vendor/m4510.ts";
import {opl,JCo} from "../../vendor/m4512.ts";
import {Cpl,Epl} from "../../vendor/m4520.ts";
import {kpl,wpl} from "../../vendor/m4521.ts";
import {Ppl,kVn} from "../../vendor/m4523.ts";
import {Upl,uAo,Bpl} from "./4527_type.ts";
import {Uhl,Bhl,CRo} from "../../vendor/m4579.ts";
import {jhl,Khl,zhl} from "../../vendor/m4581.ts";
import {igl,HRo,IRo} from "../../vendor/m4588.ts";
import {Wgl,qgl} from "../../vendor/m4600.ts";
import {K_l,fvo} from "../../vendor/m4627.ts";
import {myl,pyl} from "../../vendor/m4634.ts";
import {gyl,Tvo} from "./4637_type.ts";
import {Iyl,Evo} from "../../vendor/m4642.ts";
import {$yl,Uyl} from "../../vendor/m4645.ts";
import {Wyl,qyl} from "../computer-use/4647_type.ts";
import {Vyl,Gyl} from "../../vendor/m4647.ts";
import {Zyl,Qyl} from "../../vendor/m4650.ts";
import {iTl,sTl} from "../core/4653_type.ts";
import {lTl,aTl} from "../core/4654_type.ts";
import {uTl,cTl} from "../core/4655_type.ts";
import {cSl,lSl} from "../../vendor/m4670.ts";
import {fSl,mSl} from "../../vendor/m4672.ts";
import {hSl,wvo} from "../../vendor/m4673.ts";
import {zEl,KEl,VEl} from "../../vendor/m4727.ts";
import {tRl,Dko} from "../../vendor/m4787.ts";
import {rRl,nRl} from "../../vendor/m4788.ts";
import {TRl,Fko} from "../../vendor/m4793.ts";
import {xRl,qko} from "../../vendor/m4796.ts";
import {$Rl,Gko,URl} from "../../vendor/m4801.ts";
import {wHl,vHl} from "../../vendor/m4857.ts";
import {DHl,xHl} from "../config/4860_type.ts";
import {NHl,MHl} from "../config/4862_type.ts";
import {pIo,Hjn,aIl} from "../../vendor/m4875.ts";
import {pIl,mIo} from "../../vendor/m4877.ts";
import {fIl,mIl} from "../../vendor/m4878.ts";
import {gIl,hIl} from "../../vendor/m4879.ts";
import {vIl,RIl} from "../../vendor/m4882.ts";
import {MIl,LIl} from "../../vendor/m4885.ts";
import {$Il,UIl} from "../../vendor/m4887.ts";
import {$0l,U0l} from "../../vendor/m4906.ts";
import {rxl,nxl} from "../core/4912_type.ts";
import {ixl,sxl} from "./4913_name.ts";
import {lxl,axl} from "../../vendor/m4913.ts";
import {uxl,$Io} from "../../vendor/m4914.ts";
import {OWe,eIl} from "../permissions/4872_plan.ts";
import {Sxl,qIo,WIo} from "../../vendor/m4917.ts";
import {Hxl,KIo} from "../../vendor/m4921.ts";
import {Uxl,Bxl} from "../../vendor/m4926.ts";
import {fC,isAgentsFleetEnabled as hD,isDaemonWorkerRegistryEnabled as jse} from "../config/2212_shouldShowLaunchComposer.ts";
import {hDl,fDl} from "../../vendor/m4936.ts";
import {TDl,t0o} from "../../vendor/m4938.ts";
import {kDl,i0o,wDl} from "../../vendor/m4944.ts";
import {LDl,a0o} from "../../vendor/m4947.ts";
import {UDl,p0o} from "../../vendor/m4950.ts";
import {hPl,fPl} from "../../vendor/m4959.ts";
import {APl,CPl} from "../../vendor/m4962.ts";
import {vPl,RPl} from "../../vendor/m4963.ts";
import {IPl,HPl} from "../../vendor/m4965.ts";
import {sLl,oLl} from "../../vendor/m4996.ts";
import {pLl,dLl} from "../../vendor/m4999.ts";
import {SLl,SYn} from "../../vendor/m5005.ts";
import {CLl,bYn} from "../../vendor/m5007.ts";
import {vLl,RLl} from "../../vendor/m5008.ts";
import {PLl,DLl} from "../../vendor/m5011.ts";
import {LLl,OLl} from "../../vendor/m5012.ts";
import {NLl,O0o,P0o} from "../../vendor/m5013.ts";
import {BLl,L0o,AYn} from "../../vendor/m5014.ts";
import {ULl,M0o} from "../../vendor/m5015.ts";
import {qLl,$Ll} from "../../vendor/m5016.ts";
import {GLl,WLl} from "../../vendor/m5017.ts";
import {KLl,VLl} from "../../vendor/m5018.ts";
import {aMl,iMl} from "../../vendor/m5024.ts";
import {hMl,fMl} from "../../vendor/m5027.ts";
import {yMl,q0o} from "../../vendor/m5029.ts";
import {bMl,W0o} from "../telemetry/5032_type.ts";
import {kMl,wMl} from "../../vendor/m5033.ts";
import {IMl,HMl} from "../telemetry/5036_type.ts";
import {slowOpTracer as pw,Dwe} from "../telemetry/2606_skill_name.ts";
import {W$,Mc} from "../config/3882_entrypoint.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {PMl,K0o} from "../../vendor/m5037.ts";
import {HYn,Y0o,jMl} from "../../vendor/m5043.ts";
import {n1l,exo} from "../../vendor/m5046.ts";
import {u1l,rxo} from "../../vendor/m5051.ts";
import {I1l,mxo,H1l} from "../../vendor/m5060.ts";
import {q1l,$1l} from "../../vendor/m5064.ts";
import {gxo,iOe} from "../../vendor/m5066.ts";
import {wdt,xte,Lpo,Mpo,Npo} from "../../vendor/m4023.ts";
import {Q1l,X1l} from "../../vendor/m5069.ts";
import {iNl,sNl} from "../../vendor/m5072.ts";
import {lNl,aNl} from "../agent/5074_type.ts";
import {CNl,Rxo,ENl} from "../../vendor/m5076.ts";
import {HNl,wxo} from "../../vendor/m5078.ts";
import {xNl,kxo} from "../config/5080_subtype.ts";
import {PNl,DNl} from "../../vendor/m5080.ts";
import {LNl,ONl} from "../../vendor/m5081.ts";
import {NNl,MNl} from "../../vendor/m5082.ts";
import {UNl,BNl} from "../telemetry/5084_default.ts";
import {eFl,ZNl} from "../core/5089_default.ts";
import {OUl,PUl} from "../../vendor/m5129.ts";
import {JUl,YUl} from "../../vendor/m5134.ts";
import {QUl,XUl} from "../session/5136_default.ts";
import {l2l,a2l} from "../../vendor/m5139.ts";
import {h2l,f2l} from "../../vendor/m5142.ts";
import {C2l,E2l} from "../telemetry/5147_default.ts";
import {I2l,H2l} from "./5149_default.ts";
import {j$l,z$l} from "../../vendor/m5166.ts";
import {e9l,Z$l} from "../../vendor/m5170.ts";
import {d9l,u9l} from "../tui/5172_normalizeSessionMeta.ts";
import {qPo,$Po} from "../../vendor/m5172.ts";
// @ts-nocheck
/**
 * Slash command / skill registry for Claude Code v2.1.190.
 *
 * Aggregates built-in commands, skill-directory commands, plugin skills,
 * bundled skills and dynamic workflow commands into a single command list,
 * applies availability / enablement / shadowing rules, and exposes the
 * `toSlashCommands` projection used by the slash-command UI and tool layer.
 *
 * NOTE: Structure is byte-exact with the reverse-engineered bundle; only
 * function parameters and local bindings are renamed for readability and
 * TS type/comment annotations are added (both are erased before the gate).
 */
var HIo = {};
ft(HIo, {
  toSlashCommands: () => toSlashCommands,
  shippedCommandNames: () => shippedCommandNames,
  scopedSkillName: () => scopedSkillName,
  routeThinClientCommand: () => routeThinClientCommand,
  meetsAvailabilityRequirement: () => meetsAvailabilityRequirement,
  isThinClientSafe: () => isThinClientSafe,
  isSkillToolCommand: () => isSkillToolCommand,
  isSkillOff: () => isSkillOff,
  isSkillExcludedFromModel: () => isSkillExcludedFromModel,
  isCommandEnabled: () => YD,
  isBridgeSafeCommand: () => isBridgeSafeCommand,
  isBridgeDispatchable: () => isBridgeDispatchable,
  hasCommand: () => hasCommand,
  getSlashCommandToolSkills: () => getSlashCommandToolSkills,
  getSkillToolCommands: () => getSkillToolCommands,
  getSkillOverride: () => getSkillOverride,
  getMcpSkillCommands: () => getMcpSkillCommands,
  getDynamicSkillStateKey: () => C6t,
  getCommands: () => getCommands,
  getCommandName: () => mu,
  getCommand: () => getCommand,
  getBuiltinCommands: () => getBuiltinCommands,
  formatDescriptionWithSource: () => formatDescriptionWithSource,
  fleetHostCommands: () => fleetHostCommands,
  findCommand: () => findCommand,
  findBridgeFallback: () => findBridgeFallback,
  filterSkillCommandsByAllowlist: () => filterSkillCommandsByAllowlist,
  filterCommandsForRemoteMode: () => filterCommandsForRemoteMode,
  filterCommandsForHeadless: () => filterCommandsForHeadless,
  dropShadowedFallbackSkills: () => dropShadowedFallbackSkills,
  dropShadowedBundledSkills: () => dropShadowedBundledSkills,
  deriveRequires: () => deriveRequires,
  clearCommandsCache: () => clearCommandsCache,
  clearCommandMemoizationCaches: () => clearCommandMemoizationCaches,
  builtInCommandNames: () => builtInCommandNames,
  attributionSkillName: () => attributionSkillName,
  _resetFallbackTelemetryForTesting: () => _resetFallbackTelemetryForTesting,
  REMOTE_SAFE_COMMANDS: () => REMOTE_SAFE_COMMANDS,
  INTERNAL_ONLY_COMMANDS: () => INTERNAL_ONLY_COMMANDS,
  BRIDGE_SAFE_COMMANDS: () => BRIDGE_SAFE_COMMANDS,
  ANT_GATED_COMMANDS: () => ANT_GATED_COMMANDS
});
/** Return the memoized list of built-in (shipped) commands. */
function getBuiltinCommands() {
  return tKt();
}
/**
 * Load skill commands from every dynamic source (skill directories, plugin
 * skills, bundled skills, builtin plugin skills), tolerating per-source
 * failures and recording the failure reason for telemetry.
 */
async function Gvm(cwd) {
  let failureReason = null;
  try {
    let [skillDirCommands, pluginSkills] = await Promise.all([T6t(cwd).catch(err => {
        if (sp(err)) A(`Skill directory commands failed to load (${err.code}), continuing without them`, {
          level: "error"
        });else Ie(mo(err)), A("Skill directory commands failed to load, continuing without them");
        return failureReason = "cmd_load_skill_dir_failed", [];
      }), IEo().catch(err => (Ie(mo(err)), failureReason = "cmd_load_plugin_skills_failed", A("Plugin skills failed to load, continuing without them"), []))]),
      bundledSkills = V0o(),
      builtinPluginSkills = cNi();
    if (A(`getSkills returning: ${skillDirCommands.length} skill dir commands, ${pluginSkills.length} plugin skills, ${bundledSkills.length} bundled skills, ${builtinPluginSkills.length} builtin plugin skills`), failureReason) xe("cmd_load", failureReason);else He("cmd_load");
    return {
      skillDirCommands: skillDirCommands,
      pluginSkills: pluginSkills,
      bundledSkills: bundledSkills,
      builtinPluginSkills: builtinPluginSkills
    };
  } catch (err) {
    return Ie(mo(err)), Pt("cmd_load", "cmd_load_skills_failed"), A("Unexpected error in getSkills, returning empty"), {
      skillDirCommands: [],
      pluginSkills: [],
      bundledSkills: [],
      builtinPluginSkills: []
    };
  }
}
/**
 * Decide whether a command is available in the current runtime surface
 * (Claude.ai subscriber vs. console/first-party). No `availability` field
 * means "available everywhere".
 */
function meetsAvailabilityRequirement(command) {
  if (!command.availability) return !0;
  for (let surface of command.availability) switch (surface) {
    case "claude-ai":
      if (Eo()) return !0;
      break;
    case "console":
      if (!Eo() && !F7() && Su()) return !0;
      break;
    default:
      {
        let _exhaustive = surface;
        break;
      }
  }
  return !1;
}
/** Build the memoization key for the command-loading cache. */
function YPo(cwd) {
  return `${C6t()}:${mG()}:${cwd}`;
}
/**
 * Resolve the full, deduped, shadow-resolved command list for `cwd`,
 * merging built-in commands with dynamically loaded skills and workflow
 * commands. Handles directory scoping, fallback skills and skill overrides.
 */
async function getCommands(cwd) {
  let allCommands = await TXn(cwd),
    workflowCommands = Wtl(),
    mcpCommands = axe() ? p$a() : [],
    enabledCommands = allCommands.filter(cmd => meetsAvailabilityRequirement(cmd) && YD(cmd));
  if (workflowCommands.length === 0 && mcpCommands.length === 0) return enabledCommands;
  let enabledWorkflowCommands = workflowCommands.filter(cmd => meetsAvailabilityRequirement(cmd) && YD(cmd)),
    existingNames = new Set(),
    seenSkillRoots = new Set();
  for (let cmd of enabledCommands) if (existingNames.add(cmd.name), cmd.type === "prompt" && cmd.skillRoot) seenSkillRoots.add(cmd.skillRoot);
  let nameCounts = new Map();
  for (let cmd of enabledWorkflowCommands) {
    if (cmd.type === "prompt" && cmd.fallback) continue;
    nameCounts.set(cmd.name, (nameCounts.get(cmd.name) ?? 0) + 1);
  }
  let mergedCommands = [],
    addedNames = new Set();
  for (let cmd of enabledWorkflowCommands) {
    if (cmd.type === "prompt" && cmd.skillRoot && seenSkillRoots.has(cmd.skillRoot)) continue;
    let scopeDir = Kvm(cmd, cwd),
      nameTaken = existingNames.has(cmd.name);
    if (cmd.type === "prompt" && cmd.fallback) {
      if (nameTaken || (nameCounts.get(cmd.name) ?? 0) > 0 || addedNames.has(cmd.name)) continue;
      mergedCommands.push(scopeDir ? E9l(cmd, scopeDir) : cmd), addedNames.add(cmd.name);
      continue;
    }
    if (!(nameTaken || (nameCounts.get(cmd.name) ?? 0) > 1)) {
      mergedCommands.push(scopeDir ? E9l(cmd, scopeDir) : cmd), addedNames.add(cmd.name);
      continue;
    }
    if (!scopeDir) {
      if (nameTaken || addedNames.has(cmd.name)) continue;
      mergedCommands.push(cmd), addedNames.add(cmd.name);
      continue;
    }
    let scopedName = scopedSkillName(scopeDir, cmd.name);
    if (existingNames.has(scopedName) || addedNames.has(scopedName)) continue;
    mergedCommands.push(zvm(cmd, scopeDir, nameTaken || addedNames.has(cmd.name))), addedNames.add(scopedName);
  }
  let filteredMcpCommands = mcpCommands.filter(cmd => !existingNames.has(cmd.name) && !addedNames.has(cmd.name) && meetsAvailabilityRequirement(cmd) && YD(cmd)),
    dynamicCommands = [...mergedCommands, ...filteredMcpCommands];
  if (dynamicCommands.length === 0) return enabledCommands;
  let builtinNames = new Set(tKt().map(cmd => cmd.name)),
    firstBuiltinIndex = enabledCommands.findIndex(cmd => builtinNames.has(cmd.name));
  if (firstBuiltinIndex === -1) return dropShadowedFallbackSkills([...enabledCommands, ...dynamicCommands]);
  return dropShadowedFallbackSkills([...enabledCommands.slice(0, firstBuiltinIndex), ...dynamicCommands, ...enabledCommands.slice(firstBuiltinIndex)]);
}
/**
 * Derive the workspace-relative directory under which a `.claude/skills`
 * skill is scoped, or null if it is not directory-scoped relative to `cwd`.
 */
function Kvm(command, cwd) {
  if (command.type !== "prompt" || !command.skillRoot) return null;
  let claudeSegment = `${gOe.sep}.claude${gOe.sep}`,
    claudeIndex = command.skillRoot.lastIndexOf(claudeSegment);
  if (claudeIndex === -1) return null;
  let scopeRoot = command.skillRoot.slice(0, claudeIndex),
    relativeDir = gOe.relative(cwd, scopeRoot);
  if (!relativeDir || relativeDir.startsWith("..") || gOe.isAbsolute(relativeDir)) return null;
  return relativeDir.split(gOe.sep).join("/");
}
/** Build a directory-scoped skill name of the form `<scope>:<name>`. */
function scopedSkillName(scope, name) {
  return `${scope}:${name}`;
}
/** The name to attribute a skill under, preferring its unqualified name. */
function attributionSkillName(command) {
  return command.type === "prompt" && command.unqualifiedName != null ? command.unqualifiedName : command.name;
}
/** Append a directory-scope hint to a prompt skill's description. */
function E9l(command, scopeDir) {
  if (command.type !== "prompt") return command;
  return {
    ...command,
    description: `${command.description} (from ${scopeDir}/.claude/skills \u2014 applies when working on files under ${scopeDir}/)`
  };
}
/**
 * Produce a directory-scoped variant of a prompt skill: rescoped name,
 * preserved unqualified name, and a description explaining the scoping
 * (and whether it shadows an unscoped skill of the same name).
 */
function zvm(command, scopeDir, shadowsUnscoped) {
  if (command.type !== "prompt") return command;
  let scopedName = scopedSkillName(scopeDir, command.name),
    scopeHint = shadowsUnscoped ? `scoped to ${scopeDir}/ \u2014 use this instead of the unscoped "${command.name}" skill when the files being changed are under ${scopeDir}/` : `from ${scopeDir}/.claude/skills \u2014 applies when working on files under ${scopeDir}/`;
  return {
    ...command,
    name: scopedName,
    unqualifiedName: command.name,
    aliases: void 0,
    userFacingName: () => scopedName,
    description: `${command.description} (${scopeHint})`
  };
}
/** Clear every command/skill memoization cache (incl. the skill index). */
function clearCommandMemoizationCaches() {
  TXn.cache?.clear?.(), getSkillToolCommands.cache?.clear?.(), getSlashCommandToolSkills.cache?.clear?.(), Vvm?.(), Promise.resolve().then(() => (Nvo(), Mvo)).then(mod => mod.clearSkillIndexCache(), () => {});
}
/** Clear all command caches plus dependent downstream caches. */
function clearCommandsCache() {
  clearCommandMemoizationCaches(), HGn(), Oll(), e8e();
}
/** Test-only: reset the fallback-skill drop telemetry dedup set. */
function _resetFallbackTelemetryForTesting() {
  jvm.clear();
}
/**
 * Drop `fallback` prompt skills whose suffix collides with a loaded
 * plugin/bundled/MCP skill, so the richer plugin/MCP skill wins.
 */
function dropShadowedFallbackSkills(commands) {
  let loadedSuffixes = new Set(),
    hasMcpSkill = !1;
  for (let cmd of commands) {
    if (cmd.type !== "prompt" || cmd.loadedFrom !== "plugin" && cmd.loadedFrom !== "bundled" && cmd.loadedFrom !== "mcp") continue;
    if (cmd.disableModelInvocation || isSkillExcludedFromModel(cmd)) continue;
    if (cmd.loadedFrom === "mcp") hasMcpSkill = !0;
    let colonIndex = cmd.name.lastIndexOf(":");
    if (colonIndex > 0) loadedSuffixes.add(cmd.name.slice(colonIndex + 1));
  }
  if (loadedSuffixes.size === 0) return commands;
  return commands.filter(cmd => {
    if (cmd.type !== "prompt" || !cmd.fallback) return !0;
    if (!loadedSuffixes.has(cmd.name)) return !0;
    return A(`Dropping fallback skill '${cmd.name}' \u2014 a plugin/MCP skill with the same suffix is loaded`), !1;
  });
}
/**
 * Drop bundled prompt skills that are shadowed by an earlier command of the
 * same name. Memoized on identity of the input array.
 */
function dropShadowedBundledSkills(commands) {
  if (WPo?.input === commands) return WPo.output;
  let seenNames = new Set(),
    droppedAny = !1,
    deduped = commands.filter(cmd => {
      if (cmd.type === "prompt" && cmd.source === "bundled" && seenNames.has(cmd.name)) return droppedAny = !0, !1;
      return seenNames.add(cmd.name), !0;
    }),
    result = droppedAny ? deduped : commands;
  return WPo = {
    input: commands,
    output: result
  }, result;
}
/** Return the model-invocable MCP skill commands (when MCP skills enabled). */
function getMcpSkillCommands(commands) {
  if (LU()) return [];
  if (eH()) return commands.filter(cmd => cmd.type === "prompt" && cmd.loadedFrom === "mcp" && !cmd.disableModelInvocation && !isSkillExcludedFromModel(cmd));
  return [];
}
/**
 * Resolve a skill's override state ("on" / "off" / "user-invocable-only")
 * from user settings, honoring the unqualified name and special skills.
 */
function getSkillOverride(command) {
  if (command.type !== "prompt" || command.source === "plugin") return "on";
  let settings = Fr(),
    overrides = settings.skillOverrides,
    override = overrides?.[command.name] ?? (command.unqualifiedName != null ? overrides?.[command.unqualifiedName] : void 0) ?? "on";
  if (d9n(command, settings)) return override === "off" ? "off" : "user-invocable-only";
  return override;
}
/** True if a skill is hidden from the model (user-invocable-only or off). */
function isSkillExcludedFromModel(command) {
  let override = getSkillOverride(command);
  return override === "user-invocable-only" || override === "off";
}
/** True if a skill is fully turned off. */
function isSkillOff(command) {
  return getSkillOverride(command) === "off";
}
/** True if a command should be exposed as a model-invocable Skill tool. */
function isSkillToolCommand(command) {
  return command.type === "prompt" && !command.disableModelInvocation && !isSkillExcludedFromModel(command) && (command.source === "builtin" || command.loadedFrom === "bundled" || command.loadedFrom === "skills" || command.loadedFrom === "commands_DEPRECATED" || command.hasUserSpecifiedDescription || !!command.whenToUse);
}
/** True if a command is safe to dispatch directly over the bridge. */
function isBridgeSafeCommand(command) {
  if (command.type === "local-jsx") return !1;
  if (command.type === "prompt") return !0;
  return BRIDGE_SAFE_COMMANDS.has(command);
}
/** Find a non-JSX `local` bridge-safe fallback for a JSX command. */
function findBridgeFallback(command) {
  if (command.type !== "local-jsx") return;
  for (let candidate of BRIDGE_SAFE_COMMANDS) if (candidate.name === command.name && candidate.type === "local") return candidate;
  return;
}
/** True if a command can be dispatched over the bridge directly or via fallback. */
function isBridgeDispatchable(command) {
  return isBridgeSafeCommand(command) || findBridgeFallback(command) !== void 0;
}
/** Resolve a command's workspace/ink requirements (explicit or by type). */
function deriveRequires(command) {
  if (command.requires) return {
    workspace: command.requires.workspace ?? !1,
    ink: command.requires.ink ?? !1
  };
  switch (command.type) {
    case "prompt":
      return {
        workspace: !1,
        ink: !1
      };
    case "local":
      return {
        workspace: !0,
        ink: !1
      };
    case "local-jsx":
      return {
        workspace: !0,
        ink: !0
      };
  }
}
/** True if a command can run on a thin client (no workspace, or has dispatch). */
function isThinClientSafe(command) {
  return !deriveRequires(command).workspace || command.thinClientDispatch !== void 0;
}
/** Resolve how a thin client should route a command invocation. */
function routeThinClientCommand(command, hasLocalRuntime) {
  if (command.type === "prompt") return "post-text";
  switch (command.thinClientDispatch) {
    case "post-text":
      return "post-text";
    case "control-request":
    case "local-then-rpc":
      return command.type === "local" && !hasLocalRuntime ? "unavailable" : "local";
    case "twin":
      return "post-text";
    case void 0:
      return command.type === "local-jsx" ? "local" : "post-text";
  }
}
/** Filter commands down to those safe to expose in remote (thin-client) mode. */
function filterCommandsForRemoteMode(commands) {
  return commands.filter(cmd => cmd.type === "prompt" && (cmd.source === "builtin" || cmd.source === "bundled") && isThinClientSafe(cmd) || REMOTE_SAFE_COMMANDS.has(cmd));
}
/** Filter commands down to those usable in headless / non-interactive mode. */
function filterCommandsForHeadless(commands) {
  if (LU()) return [];
  return commands.filter(cmd => cmd.type === "prompt" && !cmd.disableNonInteractive || cmd.type === "local" && cmd.supportsNonInteractive);
}
/** True if a command matches the given name (canonical, display, or alias). */
function k9l(command, name) {
  return command.name === name || mu(command) === name || (command.aliases?.includes(name) ?? !1);
}
/** Find the command in `commands` matching `name`, if any. */
function findCommand(name, commands) {
  return commands.find(cmd => k9l(cmd, name));
}
/** True if a command with `name` exists in `commands`. */
function hasCommand(name, commands) {
  return findCommand(name, commands) !== void 0;
}
/** Restrict commands to those whose name/alias/suffix is in the allowlist. */
function filterSkillCommandsByAllowlist(commands, allowlist) {
  if (allowlist === void 0) return commands;
  return commands.filter(cmd => allowlist.some(allowed => k9l(cmd, allowed) || cmd.name.endsWith(`:${allowed}`)));
}
/** Resolve a command by name, throwing with the available list if not found. */
function getCommand(name, commands) {
  let command = findCommand(name, commands);
  if (!command) throw ReferenceError(`Command ${name} not found. Available commands: ${commands.map(cmd => {
    let displayName = mu(cmd);
    return cmd.aliases ? `${displayName} (aliases: ${cmd.aliases.join(", ")})` : displayName;
  }).sort((a, b) => a.localeCompare(b)).join(", ")}`);
  return command;
}
/** Format a command description, annotating its source (plugin/workflow/etc). */
function formatDescriptionWithSource(command) {
  if (command.type !== "prompt") return command.description;
  if (command.kind === "workflow") return `${command.description} (dynamic workflow)`;
  if (command.source === "plugin") {
    let manifest = command.pluginInfo?.pluginManifest;
    if (manifest) return `(${yT(manifest)}) ${command.description}`;
    return `${command.description} (plugin)`;
  }
  if (command.source === "builtin" || command.source === "mcp" || command.source === "bundled") return command.description;
  return `${command.description} (${d3(command.source)})`;
}
/** Project commands into the slash-command UI shape (name/description/hint/aliases). */
function toSlashCommands(commands) {
  return commands.filter(cmd => cmd.userInvocable !== !1).map(cmd => ({
    name: mu(cmd),
    description: formatDescriptionWithSource(cmd),
    argumentHint: cmd.argumentHint || "",
    aliases: cmd.aliases?.length ? cmd.aliases : void 0
  }));
}
var gOe,
  GPo = null,
  Mvm,
  m9l,
  fXn,
  f9l,
  T_t,
  S_t = null,
  eKt = null,
  VPo = null,
  KPo = null,
  zPo = null,
  C9l,
  Nvm,
  jPo,
  h9l,
  Fvm,
  Bvm,
  g9l,
  hXn = null,
  A9l = null,
  gXn,
  _9l,
  y9l,
  R9l,
  T9l,
  S9l,
  _Xn = null,
  yXn = null,
  Uvm,
  INTERNAL_ONLY_COMMANDS,
  ANT_GATED_COMMANDS,
  tKt,
  builtInCommandNames,
  shippedCommandNames,
  b9l,
  Vvm,
  TXn,
  jvm,
  WPo = null,
  getSkillToolCommands,
  getSlashCommandToolSkills,
  REMOTE_SAFE_COMMANDS,
  BRIDGE_SAFE_COMMANDS,
  fleetHostCommands;
var Mm = b(() => {
  dn();
  ful();
  Aul();
  vul();
  Vul();
  Kul();
  mdl();
  bdl();
  Fdl();
  Gdl();
  opl();
  Cpl();
  kpl();
  Ppl();
  Upl();
  Uhl();
  jhl();
  igl();
  Wgl();
  K_l();
  myl();
  gyl();
  Iyl();
  $yl();
  Wyl();
  Vyl();
  Zyl();
  iTl();
  lTl();
  uTl();
  cSl();
  fSl();
  hSl();
  zEl();
  tRl();
  rRl();
  TRl();
  xRl();
  $Rl();
  wHl();
  DHl();
  NHl();
  pIo();
  pIl();
  fIl();
  gIl();
  vIl();
  MIl();
  $Il();
  $0l();
  rxl();
  ixl();
  lxl();
  uxl();
  OWe();
  Sxl();
  Hxl();
  Uxl();
  fC();
  kee();
  hDl();
  TDl();
  kDl();
  LDl();
  UDl();
  hPl();
  APl();
  vPl();
  IPl();
  sLl();
  pLl();
  SLl();
  CLl();
  vLl();
  PLl();
  LLl();
  NLl();
  BLl();
  ULl();
  qLl();
  GLl();
  KLl();
  aMl();
  hMl();
  yMl();
  bMl();
  kMl();
  IMl();
  vn();
  Ct();
  sxe();
  qe();
  pw();
  mn();
  $q();
  S3t();
  W$();
  Cb();
  Bnt();
  M5t();
  Wi();
  lt();
  lo();
  Ps();
  PMl();
  HYn();
  n1l();
  u1l();
  I1l();
  q1l();
  gxo();
  wdt();
  Q1l();
  iNl();
  lNl();
  CNl();
  HNl();
  xNl();
  PNl();
  LNl();
  NNl();
  wm();
  br();
  gOe = require("path"), Mvm = (UNl(), oo(BNl)).default, m9l = (eFl(), oo(ZNl)).default, fXn = (OUl(), oo(PUl)).default, f9l = (JUl(), oo(YUl)).default, T_t = (QUl(), oo(XUl)).default, C9l = (l2l(), oo(a2l)), Nvm = C9l.default, jPo = C9l.goalNonInteractive, h9l = (h2l(), oo(f2l)).default, Fvm = (C2l(), oo(E2l)).default, Bvm = [], g9l = (I2l(), oo(H2l)).default, gXn = A9l?.default ?? null, _9l = A9l?.prideNonInteractive ?? null, y9l = (j$l(), oo(z$l)).default, R9l = (e9l(), oo(Z$l)), T9l = R9l?.default ?? null, S9l = R9l?.stopNonInteractive ?? null, Uvm = {
    type: "prompt",
    name: "insights",
    description: "Generate a report analyzing your Claude Code sessions",
    contentLength: 0,
    progressMessage: "analyzing your sessions",
    source: "builtin",
    disableModelInvocation: !0,
    requires: {
      workspace: !0
    },
    async getPromptForCommand(args, ctx) {
      let insightsCommand = (await Promise.resolve().then(() => (d9l(), u9l))).default;
      if (insightsCommand.type !== "prompt") throw Error("unreachable");
      return insightsCommand.getPromptForCommand(args, ctx);
    }
  }, INTERNAL_ONLY_COMMANDS = [uAo, Rul, wvo, axl, wpl, yCo, Gyl, ...(_Xn ? [_Xn] : []), OLl, ...(yXn ? [yXn] : []), O0o, P0o, L0o, AYn, M0o, nRl, hIl, mIl, $Ll, WLl, VLl, K0o, DNl, ONl, MNl, GPo].filter(Boolean), ANT_GATED_COMMANDS = [eKt, VPo, KPo, zPo].filter(Boolean), tKt = Hn(() => [mul, wMl, oLl, Bpl, HPl, RPl, _Co, Sdl, fMl, SVn, jCo, ...(gXn ? [gXn] : []), kVn, Bhl, CRo, Khl, zhl, JCo, Epl, HRo, IRo, qgl, ...(y9l && hD() ? [y9l] : []), ...(T9l && hD() ? [T9l] : []), fvo, Rxo, wxo, Y0o, i0o, kxo, DLl, Evo, Uyl, qyl, Qyl, lSl, mSl, KEl, pyl, Dko, Tvo, mxo, $1l, dLl, qko, SYn, bYn, Gko, vHl, xHl, MHl, mIo, LIl, UIl, aNl, q0o, KIo, Bxl, LCo, Hjn, aIl, eIl, RLl, sxl, $Io, RIl, exo, iOe, xte, Lpo, Mpo, Npo, sNl, X1l, qIo, WIo, Uvm, Fvm, Mvm, ...(m9l ? [m9l] : []), ...(fXn && jse() ? [fXn] : []), ...(f9l ? [f9l] : []), ...(T_t ? [T_t] : []), ...(S_t ? [S_t] : []), fDl, t0o, Fko, p0o, Nvm, jPo, fPl, CPl, rxo, iMl, aTl(), sTl(), ...(!F7() || Rr() === "gateway" ? [cTl] : []), a0o, ...(hXn ? [hXn] : []), U0l, Cul, ...[], ...Bvm, nxl, ...(h9l ? [h9l] : []), ...(g9l ? [g9l] : []), W0o, ...(eKt ? [eKt] : []), ...(VPo ? [VPo] : []), ...(KPo ? [KPo] : []), ...(zPo ? [zPo] : []), ...HMl, ...[]]), builtInCommandNames = Hn(() => new Set(tKt().flatMap(cmd => [cmd.name, ...(cmd.aliases ?? [])]))), shippedCommandNames = Hn(() => new Set([...builtInCommandNames(), ...V0o().map(cmd => cmd.name)]));
  b9l = (qPo(), oo($Po)).getWorkflowCommands, Vvm = (qPo(), oo($Po)).invalidateWorkflowCache;
  TXn = Hn(async cwd => {
    let startTime = performance.now(),
      [{
        skillDirCommands: skillDirCommands,
        pluginSkills: pluginSkills,
        bundledSkills: bundledSkills,
        builtinPluginSkills: builtinPluginSkills
      }, watchedSkills, workflowCommands] = await Promise.all([Gvm(cwd).then(loaded => (Mc("skills_load_ms", performance.now() - startTime, startTime), loaded)), R8e(), b9l ? b9l(cwd) : Promise.resolve([])]),
      allCommands = dropShadowedFallbackSkills([...skillDirCommands, ...workflowCommands, ...watchedSkills, ...pluginSkills, ...bundledSkills, ...builtinPluginSkills, ...tKt()]);
    return Dwe("command", allCommands.map(cmd => ({
      name: cmd.name,
      source: cmd.type === "prompt" ? cmd.source : "builtin"
    })).reverse(), {
      resolves: !0
    }), allCommands;
  }, YPo);
  if (!(TXn.cache instanceof Map)) TXn.cache = new Map();
  jvm = new Set();
  getSkillToolCommands = Hn(async cwd => {
    if (LU()) return [];
    return (await getCommands(cwd)).filter(isSkillToolCommand);
  }, YPo);
  if (!(getSkillToolCommands.cache instanceof Map)) getSkillToolCommands.cache = new Map();
  getSlashCommandToolSkills = Hn(async cwd => {
    if (LU()) return [];
    try {
      let skillCommands = (await getCommands(cwd)).filter(cmd => cmd.type === "prompt" && cmd.source !== "builtin" && !isSkillOff(cmd) && (cmd.hasUserSpecifiedDescription || cmd.whenToUse) && (cmd.loadedFrom === "skills" || cmd.loadedFrom === "plugin" || cmd.loadedFrom === "bundled" || cmd.disableModelInvocation));
      return He("cmd_load"), skillCommands;
    } catch (err) {
      return Ie(mo(err)), Pt("cmd_load", "cmd_load_slash_tool_skills_failed"), A("Returning empty skills array due to load failure"), [];
    }
  }, YPo);
  if (!(getSlashCommandToolSkills.cache instanceof Map)) getSlashCommandToolSkills.cache = new Map();
  REMOTE_SAFE_COMMANDS = new Set([mIo, Y0o, Evo, KIo, jCo, ...(gXn ? [gXn] : []), qIo, JCo, LCo, yCo, Dko, qko, rxo, fvo, $Io, p0o, kxo, wxo, Fko, a0o, xte, Mpo, L0o, AYn, ...(GPo ? [GPo] : []), ...(fXn ? [fXn] : []), Gko, _Co, HRo, t0o, Rxo, i0o, mxo, O0o, SVn, kVn, jPo, q0o, W0o, wvo, K0o, Tvo, bYn, SYn, ...(_Xn ? [_Xn] : []), ...(T_t ? [T_t] : []), ...(S_t ? [S_t] : [])]), BRIDGE_SAFE_COMMANDS = new Set([kVn, uAo, SVn, WIo, IRo, CRo, jPo, jMl, ...(S9l ? [S9l] : []), P0o, Lpo, Npo, URl, Wdl, ...(_9l ? [_9l] : []), ...(yXn ? [yXn] : []), wDl, ENl, H1l, VEl, AYn, M0o, ...(T_t ? [T_t] : []), ...(S_t ? [S_t] : []), ...(hXn ? [hXn] : []), ...(eKt ? [eKt] : []), SYn, bYn, exo]);
  fleetHostCommands = Hn(() => tKt().filter(cmd => cmd.fleetHostCall !== void 0));
});

export {HIo,getBuiltinCommands,Gvm,meetsAvailabilityRequirement,YPo,getCommands,Kvm,scopedSkillName,attributionSkillName,E9l,zvm,clearCommandMemoizationCaches,clearCommandsCache,_resetFallbackTelemetryForTesting,dropShadowedFallbackSkills,dropShadowedBundledSkills,getMcpSkillCommands,getSkillOverride,isSkillExcludedFromModel,isSkillOff,isSkillToolCommand,isBridgeSafeCommand,findBridgeFallback,isBridgeDispatchable,deriveRequires,isThinClientSafe,routeThinClientCommand,filterCommandsForRemoteMode,filterCommandsForHeadless,k9l,findCommand,hasCommand,filterSkillCommandsByAllowlist,getCommand,formatDescriptionWithSource,toSlashCommands,gOe,GPo,Mvm,m9l,fXn,f9l,T_t,S_t,eKt,VPo,KPo,zPo,C9l,Nvm,jPo,h9l,Fvm,Bvm,g9l,hXn,A9l,gXn,_9l,y9l,R9l,T9l,S9l,_Xn,yXn,Uvm,INTERNAL_ONLY_COMMANDS,ANT_GATED_COMMANDS,tKt,builtInCommandNames,shippedCommandNames,b9l,Vvm,TXn,jvm,WPo,getSkillToolCommands,getSlashCommandToolSkills,REMOTE_SAFE_COMMANDS,BRIDGE_SAFE_COMMANDS,fleetHostCommands,Mm};
