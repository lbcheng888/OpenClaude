// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {nO,MR} from "./2033_allowed.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {getCanonicalName as So,parseUserSpecifiedModel as Qo,isFableModelValue as Ime,isFableAvailable as Qoe,isMythosModelValue as TXe,isMythosAvailable as Smn,normalizeModelStringForAPI as Pp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {getInitialSettings as Fr,br} from "./0745_updateSettingsForSource.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck
/**
 * Advisor Tool capability gating for Claude Code.
 *
 * Maps model ids to a numeric capability rank and decides whether the
 * server-side `advisor` tool can be enabled for a given base/advisor model pair.
 * The advisor must be at least as capable as the base model.
 */

/** True if a content block is an advisor tool result or an `advisor` server tool use. */
function jqe(block: { type: string; name?: string }): boolean {
  return block.type === "advisor_tool_result" || block.type === "server_tool_use" && block.name === "advisor";
}

/** Whether the advisor tool is enabled (env flags + first-party gate + feature flag). */
function dG(): boolean {
  if (nt(process.env.CLAUDE_CODE_DISABLE_ADVISOR_TOOL)) return !1;
  if (Rr() !== "firstParty" || !nO()) return !1;
  if (nt(process.env.CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL)) return !0;
  return it("tengu_sage_compass2", {}).enabled ?? !1;
}

/** Raw value of the experimental advisor-tool env flag. */
function guo(): boolean {
  return Ne.CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL;
}

/** Capability rank for a model string (via canonical name), or undefined if unknown. */
function _uo(modelString: string): number | undefined {
  return sBa[So(Qo(modelString))];
}

/** Capability rank for a model string, respecting Fable/Mythos availability in non-interactive sessions. */
function yuo(modelString: string): number | undefined {
  let canonical = So(Qo(modelString));
  if (!kr()) {
    if (Ime(canonical) && !Qoe()) return;
    if (TXe(canonical) && !Smn()) return;
  }
  return sBa[canonical];
}

/** Whether the advisor tool is enabled for the given model. */
function U0e(modelString: string): boolean {
  if (guo()) return !0;
  return _uo(modelString) !== void 0;
}

/** Whether a model string is a valid advisor model. */
function v$n(modelString: string): boolean {
  return $0e(Pp(Qo(modelString)));
}

/** Advisor model families that are currently valid advisor models. */
function Mut(): string[] {
  return jwp.filter(family => v$n(family));
}

/** Whether a normalized model id is a valid advisor model (allowed + rank above threshold). */
function $0e(modelId: string): boolean {
  if (!Oa(modelId)) return !1;
  if (guo()) return !0;
  let canonical = So(modelId),
    rank = yuo(canonical);
  return rank !== void 0 && rank >= zwp;
}

/** Whether the advisor (rank from `e`) is at least as capable as the base model (rank from `t`). */
function Yqe(baseModel: string, advisorModel: string): boolean {
  if (guo()) return !0;
  let baseRank = _uo(baseModel),
    advisorRank = yuo(advisorModel);
  if (baseRank === void 0 || advisorRank === void 0) return !0;
  return baseRank <= advisorRank;
}

/** Whether base-model rank does not exceed advisor-model rank (unknown ranks pass). */
function iBa(baseModel: string, advisorModel: string): boolean {
  let baseRank = _uo(baseModel),
    advisorRank = yuo(advisorModel);
  if (baseRank === void 0 || advisorRank === void 0) return !0;
  return baseRank <= advisorRank;
}

/** Resolve the advisor model for a base model, logging why it is skipped; returns the advisor model id or undefined. */
function aBa(advisorModel: string, baseModel: string): string | undefined {
  if (!dG() || !advisorModel) return;
  let normalizedAdvisor = Pp(Qo(advisorModel));
  if (!U0e(baseModel)) {
    if (A(`[AdvisorTool] Skipping advisor - base model ${baseModel} does not support advisor`), !oBa) oBa = !0, console.warn(`Warning: Advisor disabled — base model '${baseModel}' isn't in the advisor capability table. Switch to a public model alias (opus, sonnet, fable) or set CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL=1.`);
    return;
  }
  if (!$0e(normalizedAdvisor)) {
    A(`[AdvisorTool] Skipping advisor - ${normalizedAdvisor} is not a valid advisor model`);
    return;
  }
  if (!Yqe(baseModel, normalizedAdvisor)) {
    A(`[AdvisorTool] Skipping advisor - ${normalizedAdvisor} cannot advise ${baseModel} (advisor must be at least as capable as the base model)`);
    return;
  }
  return A(`[AdvisorTool] Server-side tool enabled with ${normalizedAdvisor} as the advisor model`), normalizedAdvisor;
}

/** Configured advisor model from settings, or undefined when the advisor tool is disabled. */
function lBa(): string | undefined {
  if (!dG()) return;
  return Fr().advisorModel;
}

/** Extract advisor messages from a model/session iteration list. */
function cBa(session: { iterations?: { type: string }[] }): { type: string }[] {
  let iterations = session.iterations;
  if (!iterations) return [];
  return iterations.filter(iteration => iteration.type === "advisor_message");
}

var sBa: Record<string, number>,
  zwp = 2,
  jwp: string[],
  oBa = !1,
  uBa = `# Advisor Tool

You have access to an \`advisor\` tool backed by a stronger reviewer model. It takes NO parameters -- when you call advisor(), your entire conversation history is automatically forwarded. They see the task, every tool call you've made, every result you've seen.

Call advisor BEFORE substantive work -- before writing, before committing to an interpretation, before building on an assumption. If the task requires orientation first (finding files, fetching a source, seeing what's there), do that, then call advisor. Orientation is not substantive work. Writing, editing, and declaring an answer are.

Also call advisor:
- When you believe the task is complete. BEFORE this call, make your deliverable durable: write the file, save the result, commit the change. The advisor call takes time; if the session ends during it, a durable result persists and an unwritten one doesn't.
- When stuck -- errors recurring, approach not converging, results that don't fit.
- When considering a change of approach.

On tasks longer than a few steps, call advisor at least once before committing to an approach and once before declaring done. On short reactive tasks where the next action is dictated by tool output you just read, you don't need to keep calling -- the advisor adds most of its value on the first call, before the approach crystallizes.

Give the advice serious weight. If you follow a step and it fails empirically, or you have primary-source evidence that contradicts a specific claim (the file says X, the paper states Y), adapt. A passing self-test is not evidence the advice is wrong -- it's evidence your test doesn't check what the advice is checking.

If you've already retrieved data pointing one way and the advisor points another: don't silently switch. Surface the conflict in one more advisor call -- "I found X, you suggest Y, which constraint breaks the tie?" The advisor saw your evidence but may have underweighted it; a reconcile call is cheaper than committing to the wrong branch.`;
var yte = b(() => {
  lt();
  jn();
  MR();
  qe();
  AR();
  dn();
  Ro();
  eO();
  Ps();
  br();
  sBa = {
    "claude-haiku-4-5": 1,
    "claude-sonnet-4-6": 2,
    "claude-opus-4-6": 3,
    "claude-opus-4-7": 4,
    "claude-opus-4-8": 4,
    "claude-mythos-5": 5,
    "claude-fable-5": 5
  };
  jwp = ["fable", "opus", "sonnet"];
});

export {jqe,dG,guo,_uo,yuo,U0e,v$n,Mut,$0e,Yqe,iBa,aBa,lBa,cBa,sBa,zwp,jwp,oBa,uBa,yte};
