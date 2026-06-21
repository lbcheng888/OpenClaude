// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {W6r as Xqr,bPt as ePt,EPt as tPt,G6r as Qqr,CPt as nPt} from "../../vendor/m2678.ts";
import {getCommandName as id} from "./4028_maxEditDistance.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getSkillOverride as vAe,getSkillToolCommands as fC,filterSkillCommandsByAllowlist as eae,getSlashCommandToolSkills as Zie,Sf as Rf} from "./5142_toSlashCommands.ts";
import {tn as nn,Hc as xc} from "../../vendor/m235.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {truncate as Ga} from "../../vendor/m237.ts";
import {getSessionSkillAllowlist as yV,lt as ct} from "../session/0131_sent.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {_o,bt as St} from "../../vendor/m195.ts";
import {B3 as b3} from "../../vendor/m453.ts";
import {initKp as Dp,O2 as C2} from "../../vendor/m609.ts";
import {Ct} from "../../vendor/m131.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {wn as bn} from "../../vendor/m45.ts";
// @ts-nocheck
var skillToolInfoExports = {};
pt(skillToolInfoExports, {
  getSkillToolInfo: () => getSkillToolInfo,
  getSkillInfo: () => getSkillInfo,
  getPrompt: () => getPrompt,
  getLimitedSkillToolCommands: () => getLimitedSkillToolCommands,
  formatCommandsWithinBudget: () => formatCommandsWithinBudget,
  clearPromptCache: () => clearPromptCache
});
function truncateDescription(cmd) {
  let desc = Xqr(cmd),
    maxLen = ePt();
  return desc.length > maxLen ? desc.slice(0, maxLen - 1) + "\u2026" : desc;
}
function formatCommandLine(cmd) {
  let displayName = id(cmd);
  if (cmd.name !== displayName && cmd.type === "prompt" && cmd.source === "plugin") v(`Skill prompt: showing "${cmd.name}" (userFacingName="${displayName}")`);
  return `- ${cmd.name}: ${truncateDescription(cmd)}`;
}
function formatCommandsWithinBudget(commands, budget, priorityFn, extra) {
  if (commands.length === 0) return "";
  let adjustedBudget = tPt(budget, extra),
    nameOnlySet = new Set(),
    formattedList = commands.map((cmd, idx) => {
      if (vAe(cmd) === "name-only") return nameOnlySet.add(idx), {
        cmd: cmd,
        full: `- ${cmd.name}`
      };
      return {
        cmd: cmd,
        full: formatCommandLine(cmd)
      };
    }),
    totalChars = formattedList.reduce((sum, entry) => sum + nn(entry.full), 0) + (formattedList.length - 1);
  if (totalChars <= adjustedBudget) return formattedList.map(entry => entry.full).join(`
`);
  v(`Skill listing over budget: ${commands.length} skills, ${totalChars} chars > ${adjustedBudget} budget \u2014 descriptions will be truncated. Run /doctor for details.`, {
    level: "warn"
  });
  let budgetedSet = new Set(nameOnlySet),
    overridableCmds = [];
  for (let idx = 0; idx < commands.length; idx++) {
    let cmd = commands[idx];
    if (cmd.type === "prompt" && cmd.source === "bundled") budgetedSet.add(idx);else if (!nameOnlySet.has(idx)) overridableCmds.push(cmd);
  }
  let budgetedChars = formattedList.reduce((sum, entry, idx) => budgetedSet.has(idx) ? sum + nn(entry.full) + 1 : sum, 0),
    remainingBudget = adjustedBudget - budgetedChars;
  if (overridableCmds.length === 0) return formattedList.map(entry => entry.full).join(`
`);
  if (priorityFn) {
    let overridableIdxs = commands.map((_, idx) => idx).filter(idx => !budgetedSet.has(idx)),
      nameOnlyChars = idx => nn(commands[idx].name) + 2,
      fullChars = idx => nn(formattedList[idx].full),
      totalWithNameOnly = commands.reduce((sum, _, idx) => sum + (budgetedSet.has(idx) ? fullChars(idx) : nameOnlyChars(idx)), 0) + (commands.length - 1),
      extraBudget = adjustedBudget - totalWithNameOnly,
      showFullSet = new Set(),
      sortedByPriority = overridableIdxs.slice().sort((a, b) => priorityFn(commands[b]) - priorityFn(commands[a]));
    for (let idx of sortedByPriority) {
      let gain = fullChars(idx) - nameOnlyChars(idx);
      if (gain <= extraBudget) showFullSet.add(idx), extraBudget -= gain;
    }
    return commands.map((_, idx) => budgetedSet.has(idx) || showFullSet.has(idx) ? formattedList[idx].full : `- ${_.name}`).join(`
`);
  }
  let nameOnlyTotal = overridableCmds.reduce((sum, cmd) => sum + nn(cmd.name) + 4, 0) + (overridableCmds.length - 1),
    descBudget = remainingBudget - nameOnlyTotal,
    perCmdBudget = Math.floor(descBudget / overridableCmds.length);
  if (perCmdBudget < Qqr) return commands.map((cmd, idx) => budgetedSet.has(idx) ? formattedList[idx].full : `- ${cmd.name}`).join(`
`);
  let overLimitSet = Gn(overridableCmds, cmd => nn(truncateDescription(cmd)) > perCmdBudget);
  return commands.map((cmd, idx) => {
    if (budgetedSet.has(idx)) return formattedList[idx].full;
    let desc = truncateDescription(cmd);
    return `- ${cmd.name}: ${Ga(desc, perCmdBudget)}`;
  }).join(`
`);
}
async function getSkillToolInfo(session) {
  let allCmds = await fC(session),
    filteredCmds = eae(allCmds, yV());
  return {
    totalCommands: allCmds.length,
    includedCommands: filteredCmds.length
  };
}
async function getLimitedSkillToolCommands(session) {
  return eae(await fC(session), yV());
}
function clearPromptCache() {
  getPrompt.cache?.clear?.();
}
async function getSkillInfo(session) {
  try {
    let skills = await Zie(session);
    return {
      totalSkills: skills.length,
      includedSkills: skills.length
    };
  } catch (err) {
    return Ie(_o(err)), {
      totalSkills: 0,
      includedSkills: 0
    };
  }
}
var getPrompt;
var moduleInit = b(() => {
  b3();
  Rf();
  ct();
  Dp();
  xc();
  Ct();
  je();
  St();
  ds();
  wn();
  nPt();
  getPrompt = bn(async session => `Execute a skill within the main conversation

When users ask you to perform tasks, check if any of the available skills match. Skills provide specialized capabilities and domain knowledge.

When users reference a "slash command" or "/<something>", they are referring to a skill. Use this tool to invoke it.

How to invoke:
- Set \`skill\` to the exact name of an available skill (no leading slash). For plugin-namespaced skills use the fully qualified \`plugin:skill\` form.
- Set \`args\` to pass optional arguments.
- Some skills are scoped to a directory: their name is prefixed with the directory (e.g. \`apps/web:deploy\`) and their description says which directory they apply to. When a skill name has both a scoped and an unscoped variant, pick by the files you are working on: if the files are under a variant's directory, invoke that variant (most specific directory wins); otherwise invoke the unscoped one.

Important:
- Available skills are listed in system-reminder messages in the conversation
- Only invoke a skill that appears in that list, or one the user explicitly typed as \`/<name>\` in their message. Never guess or invent a skill name from training data; otherwise do not call this tool
- When a skill matches the user's request, this is a BLOCKING REQUIREMENT: invoke the relevant Skill tool BEFORE generating any other response about the task
- NEVER mention a skill without actually calling this tool
- Do not invoke a skill that is already running
- Do not use this tool for built-in CLI commands (like /help, /clear, etc.)
- If you see a <${C2}> tag in the current conversation turn, the skill has ALREADY been loaded - follow the instructions directly instead of calling this tool again
`);
});

export {skillToolInfoExports as B1i,truncateDescription as V6r,formatCommandLine as PEd,formatCommandsWithinBudget,getSkillToolInfo,getLimitedSkillToolCommands,clearPromptCache,getSkillInfo,getPrompt,moduleInit as SRe};
