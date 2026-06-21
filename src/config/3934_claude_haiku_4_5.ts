// @ts-nocheck
import {st as rt} from "../../vendor/m5.ts";
import {getAPIProvider as Hr,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {BO as xO,jR} from "./2028_allowed.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {je as Ge,tk as YI} from "../../vendor/m577.ts";
import {getCanonicalName as qo,parseUserSpecifiedModel as gs,isFableModelValue as Noe,isFableAvailable as joe,isMythosModelValue as rYe,isMythosAvailable as Ycn,normalizeModelStringForAPI as Em,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0131_sent.ts";
import {isModelAllowed as Cl,MO as l1} from "../../vendor/m1451.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {getInitialSettings as Kr,yr as Er} from "./0740_updateSettingsForSource.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function x4e(e) {
  return e.type === "advisor_tool_result" || e.type === "server_tool_use" && e.name === "advisor";
}
function RW() {
  if (rt(process.env.CLAUDE_CODE_DISABLE_ADVISOR_TOOL)) return false;
  if (Hr() !== "firstParty" || !xO()) return false;
  if (rt(process.env.CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL)) return true;
  return ut("tengu_sage_compass2", {}).enabled ?? false;
}
function $Oa() {
  return Ge.CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL;
}
function Rso(e) {
  return MODEL_CAPABILITY_RANKS[qo(gs(e))];
}
function isAdvisorRelatedMessage(message) {
  let t = qo(gs(message));
  if (!kr()) {
    if (Noe(t) && !joe()) return;
    if (rYe(t) && !Ycn()) return;
  }
  return MODEL_CAPABILITY_RANKS[t];
}
function isAdvisorToolEnabled(e) {
  if ($Oa()) return true;
  return Rso(e) !== undefined;
}
function isAdvisorToolExperimentalEnvEnabled(e) {
  return getModelCapabilityRankChecked(Em(gs(e)));
}
function getModelCapabilityRank() {
  return ADVISOR_MODEL_FAMILIES.filter(e => isAdvisorToolExperimentalEnvEnabled(e));
}
function getModelCapabilityRankChecked(modelString) {
  if (!Cl(modelString)) return false;
  if (Ge.CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL) return true;
  let t = qo(modelString),
    n = isAdvisorRelatedMessage(t);
  return n !== undefined && n >= syp;
}
function isModelAdvisorCapable(baseModel, t) {
  if ($Oa()) return true;
  let n = Rso(baseModel),
    r = isAdvisorRelatedMessage(t);
  if (n === undefined || r === undefined) return true;
  return n <= r;
}
function isValidAdvisorModel(fullModelId, t) {
  let n = Rso(fullModelId),
    r = isAdvisorRelatedMessage(t);
  if (n === undefined || r === undefined) return true;
  return n <= r;
}
function isAdvisorAtLeastAsCapableAsBase(baseModel, advisorModel) {
  if (!RW() || !baseModel) return;
  let baseRank = Em(gs(baseModel));
  if (!isAdvisorToolEnabled(advisorModel)) {
    v(`[AdvisorTool] Skipping advisor - base model ${advisorModel} does not support advisor`);
    return;
  }
  if (!getModelCapabilityRankChecked(baseRank)) {
    v(`[AdvisorTool] Skipping advisor - ${baseRank} is not a valid advisor model`);
    return;
  }
  if (!isModelAdvisorCapable(advisorModel, baseRank)) {
    v(`[AdvisorTool] Skipping advisor - ${baseRank} cannot advise ${advisorModel} (advisor must be at least as capable as the base model)`);
    return;
  }
  return v(`[AdvisorTool] Server-side tool enabled with ${baseRank} as the advisor model`), baseRank;
}
function isAdvisorRankSufficientForBase() {
  if (!RW()) return;
  return Kr().advisorModel;
}
function isAdvisorModelFamilyAvailable(family) {
  let t = family.iterations;
  if (!t) return [];
  return t.filter(n => n.type === "advisor_message");
}
var MODEL_CAPABILITY_RANKS,
  syp = 2,
  ADVISOR_MODEL_FAMILIES,
  KOa = `# Advisor Tool

You have access to an \`advisor\` tool backed by a stronger reviewer model. It takes NO parameters -- when you call advisor(), your entire conversation history is automatically forwarded. They see the task, every tool call you've made, every result you've seen.

Call advisor BEFORE substantive work -- before writing, before committing to an interpretation, before building on an assumption. If the task requires orientation first (finding files, fetching a source, seeing what's there), do that, then call advisor. Orientation is not substantive work. Writing, editing, and declaring an answer are.

Also call advisor:
- When you believe the task is complete. BEFORE this call, make your deliverable durable: write the file, save the result, commit the change. The advisor call takes time; if the session ends during it, a durable result persists and an unwritten one doesn't.
- When stuck -- errors recurring, approach not converging, results that don't fit.
- When considering a change of approach.

On tasks longer than a few steps, call advisor at least once before committing to an approach and once before declaring done. On short reactive tasks where the next action is dictated by tool output you just read, you don't need to keep calling -- the advisor adds most of its value on the first call, before the approach crystallizes.

Give the advice serious weight. If you follow a step and it fails empirically, or you have primary-source evidence that contradicts a specific claim (the file says X, the paper states Y), adapt. A passing self-test is not evidence the advice is wrong -- it's evidence your test doesn't check what the advice is checking.

If you've already retrieved data pointing one way and the advisor points another: don't silently switch. Surface the conflict in one more advisor call -- "I found X, you suggest Y, which constraint breaks the tie?" The advisor saw your evidence but may have underweighted it; a reconcile call is cheaper than committing to the wrong branch.`;
var _HH = b(() => {
  ct();
  Yn();
  jR();
  je();
  YI();
  an();
  Fo();
  l1();
  si();
  Er();
  MODEL_CAPABILITY_RANKS = {
    "claude-haiku-4-5": 1,
    "claude-sonnet-4-6": 2,
    "claude-opus-4-6": 3,
    "claude-opus-4-7": 4,
    "claude-opus-4-8": 4,
    "claude-mythos-5": 5,
    "claude-fable-5": 5
  };
  ADVISOR_MODEL_FAMILIES = ["fable", "opus", "sonnet"];
});

export {x4e as J4e,RW as VW,$Oa as oMa,Rso as Rio,isAdvisorRelatedMessage as xio,isAdvisorToolEnabled as oIe,isAdvisorToolExperimentalEnvEnabled as AUn,getModelCapabilityRank as oct,getModelCapabilityRankChecked as sIe,isModelAdvisorCapable as X4e,isValidAdvisorModel as iMa,isAdvisorAtLeastAsCapableAsBase as aMa,isAdvisorRankSufficientForBase as lMa,isAdvisorModelFamilyAvailable as cMa,MODEL_CAPABILITY_RANKS as sMa,syp as DSp,ADVISOR_MODEL_FAMILIES as PSp,KOa as uMa,_HH as Hte};
