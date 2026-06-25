// @ts-nocheck
import {getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getCachedClientData as pI,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {usesFirstPartyModelIds as Vu,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {b} from "../../runtime.ts";
import {YU} from "../../vendor/m459.ts";
import {dn} from "./0137_namespace.ts";
import {Hn} from "../../vendor/m100.ts";
import {nt,Za} from "../../vendor/m127.ts";
/**
 * Model identification and "simple system prompt" eligibility logic.
 *
 * This module classifies Claude model identifiers (e.g. "claude-opus-4-8",
 * "claude-fable-5") into coarse families, derives feature-flag suffixes from
 * them, and decides whether a given model should use the simplified/velvet
 * system prompt path.
 */

/**
 * True for the latest-generation "5" models that share the "falcon" prompt family.
 */
function GQ(modelId: string): boolean {
  if (modelId === "claude-fable-5" || modelId === "claude-mythos-5") return !0;
  return !1;
}

/** True for any model in the Fable line. */
function Pyn(modelId: string): boolean {
  return modelId.startsWith("claude-fable-");
}

/** True for any model in the Mythos line. */
function Rai(modelId: string): boolean {
  return modelId.startsWith("claude-mythos-");
}

function vai(modelId: string): boolean {
  return !1;
}

/**
 * Maps a model id to its prompt-family key used to namespace feature flags.
 * Falls back to "base" when no specific family matches.
 */
function W0t(modelId: string): string {
  if (GQ(modelId)) return "falcon";
  if (modelId === "claude-sonnet-4-5") return "sonnet_4_5";
  if (modelId === "claude-haiku-4-5") return "haiku_4_5";
  if (modelId.includes("opus")) return "opus";
  if (modelId.includes("sonnet")) return "sonnet";
  if (modelId.includes("haiku")) return "haiku";
  return "base";
}

/**
 * Appends the model's prompt-family suffix to a base key, except for "base".
 */
function iZe(baseKey: string, modelId: string): string {
  let family = W0t(modelId);
  return family === "base" ? baseKey : `${baseKey}_${family}`;
}

/** Detects an early-access-program (-eap) tagged model id. */
function Sfe(modelId: string): boolean {
  return /-eap($|\[)/i.test(modelId);
}

/**
 * Returns true if the model is explicitly opted into the simple system prompt
 * via either a config map (`simple_system_prompt`) or the
 * `tengu_velvet_cascade` experiment's model list.
 */
function ned(modelId: string): boolean {
  let normalizedId = So(modelId),
    simplePromptConfig = pI()?.simple_system_prompt;
  if (
    typeof simplePromptConfig === "object" &&
    simplePromptConfig !== null &&
    Object.entries(simplePromptConfig).some(([configModel, enabled]) => enabled === !0 && normalizedId.includes(configModel))
  )
    return !0;
  let velvetCascade = it("tengu_velvet_cascade", null);
  if (typeof velvetCascade !== "object" || velvetCascade === null || !("models" in velvetCascade) || !Array.isArray(velvetCascade.models)) return !1;
  return velvetCascade.models.some(model => typeof model === "string" && normalizedId.includes(model));
}

/**
 * Returns true when the model uses the classic (non-simple) system prompt by
 * default. Newer "4-8"/fable/mythos models default to the simple prompt.
 */
function red(modelId: string): boolean {
  if (Sfe(modelId)) return !1;
  let normalizedId = So(modelId);
  if (
    normalizedId.includes("claude-3-") ||
    normalizedId.includes("haiku") ||
    normalizedId.includes("sonnet") ||
    normalizedId === "claude-opus-4-0" ||
    normalizedId === "claude-opus-4-1" ||
    normalizedId === "claude-opus-4-5" ||
    normalizedId === "claude-opus-4-6" ||
    normalizedId === "claude-opus-4-7"
  )
    return !0;
  if (normalizedId === "claude-opus-4-8" || normalizedId === "claude-fable-5" || normalizedId === "claude-mythos-5") return !1;
  return !Vu();
}

var Mh: (modelId: string) => boolean;
var mI = b(() => {
  YU();
  jn();
  tr();
  dn();
  Ro();
  Ps();
  Mh = Hn((modelId: string) => {
    if (!modelId) return !1;
    if (nt(process.env.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT)) return !0;
    if (Za(process.env.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT)) return !1;
    return !red(modelId) || ned(modelId);
  });
});

export {GQ,Pyn,Rai,vai,W0t,iZe,Sfe,ned,red,Mh,mI};
