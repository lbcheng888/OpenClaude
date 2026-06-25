// @ts-nocheck
import {Za as D4,nt as T_} from "../../vendor/m127.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Ve as K_,Le as QH} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,jn as t6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getIsNonInteractiveSession as p8,lt as A_} from "../session/0132_sent.ts";
import {isAgentSwarmsEnabled as Z4,lb as dJ} from "../config/3314_isAgentSwarmsEnabled.ts";
import {isTeammate as yT,Op as Az} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {getInitialSettings as t8,br as v8} from "../config/0745_updateSettingsForSource.ts";
import {Ne as dH} from "../../vendor/m583.ts";
import {zk as LZ,nB as Ux} from "../api/2752_status.ts";
import {zn as s6} from "../api/0465_getOauthConfig.ts";
import {xD as $k,Mn as B6,po as Aq} from "../tools/5224_userPromptCount.ts";
import {iz as fi,GUe as sSH} from "../../vendor/m2276.ts";
import {Ws as h7,vd as wO} from "../session/1465_promise.ts";
import {createCacheSafeParams as dQ,runForkedAgent as lG,ID as zk} from "../artifact/4427_withDisallowedCommandTools.ts";
import {Ie as SH,vn as y6} from "../session/0621_length.ts";
import {Veo as Jr8,Keo as Dr8,jit as t8_} from "../tools/4330_recursive.ts";
import {xe as bH,He as EH,mn as f6} from "../telemetry/0600_feature_name.ts";
import {mo as Wq,Ct as R_} from "../../vendor/m197.ts";
import {kc as g1,aA as xX} from "../../vendor/m234.ts";
import {ec as P1,eb as nM,mT as lM,Oi as AK,Id as VO,Pf as iY} from "../agent/2591_level.ts";
import {xr as a8,QT as LJ} from "../../vendor/m1461.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
import {dn as $6} from "../config/0137_namespace.ts";
// @ts-nocheck
function aG6() {
  return "user_intent";
}
function sG6() {
  let H = process.env.CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION;
  if (D4(H)) return c("tengu_prompt_suggestion_init", {
    enabled: false,
    source: K_("env")
  }), false;
  if (T_(H)) return c("tengu_prompt_suggestion_init", {
    enabled: true,
    source: K_("env")
  }), true;
  if (!j_("tengu_chomp_inflection", false)) return c("tengu_prompt_suggestion_init", {
    enabled: false,
    source: K_("growthbook")
  }), false;
  if (p8()) return c("tengu_prompt_suggestion_init", {
    enabled: false,
    source: K_("non_interactive")
  }), false;
  if (Z4() && yT()) return c("tengu_prompt_suggestion_init", {
    enabled: false,
    source: K_("swarm_teammate")
  }), false;
  let _ = t8()?.promptSuggestionEnabled !== false;
  return c("tengu_prompt_suggestion_init", {
    enabled: _,
    source: K_("setting")
  }), _;
}
function tG6() {
  let H = dH.CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION;
  if (H !== undefined) return H;
  return t8()?.promptSuggestionEnabled !== false;
}
function VqK() {
  if (GxH) GxH.abort(), GxH = null;
}
function getDefaultSuggestionVariant(H) {
  if (!H.promptSuggestionEnabled) return "disabled";
  if (H.pendingWorkerRequest || H.pendingSandboxRequest) return "pending_permission";
  if (H.elicitation.queue.length > 0) return "elicitation_active";
  if (H.toolPermissionContext.mode === "plan") return "plan_mode";
  if (LZ.status !== "allowed") return "rate_limit";
  return null;
}
async function isPromptSuggestionEnabled(H, _, q, K, O) {
  if (H.signal.aborted) return getCacheColdSuppressionReason("aborted", undefined, undefined, O), null;
  if (s6(_, J => J.type === "assistant") < 2) return getCacheColdSuppressionReason("early_conversation", undefined, undefined, O), null;
  let z = $k(_);
  if (z?.isApiErrorMessage) return getCacheColdSuppressionReason("last_response_error", undefined, undefined, O), null;
  let $ = getSuggestionBlockReason(z);
  if ($) return getCacheColdSuppressionReason($, undefined, undefined, O), null;
  let Y = q(),
    w = getDefaultSuggestionVariant(Y);
  if (w) return getCacheColdSuppressionReason(w, undefined, undefined, O), null;
  let A = aG6(),
    {
      suggestion: f,
      generationRequestId: j
    } = await generateSuggestionIfEligible(H, A, K);
  if (H.signal.aborted) return getCacheColdSuppressionReason("aborted", undefined, undefined, O), null;
  if (!f) return getCacheColdSuppressionReason("empty", undefined, A, O), null;
  if (maybeGeneratePromptSuggestion(f, A, O)) return null;
  return {
    suggestion: f,
    promptId: A,
    generationRequestId: j
  };
}
async function isPromptSuggestionEnabledForSdk(H, _) {
  if (!H.querySource?.startsWith("repl_main_thread")) return;
  let q = fi(),
    K = h7(),
    O = K && _?.tempo === "blocked" && !_.block;
  if (K ? q !== "focused" && !O : q === "blurred") {
    getCacheColdSuppressionReason(K ? "bg_unattached" : "unfocused", undefined, undefined, "cli");
    return;
  }
  GxH = new AbortController();
  let T = GxH,
    z = dQ(H);
  try {
    let $ = await isPromptSuggestionEnabled(T, H.messages, H.toolUseContext.getAppState, z, "cli");
    if (!$) return;
    if (H.toolUseContext.setAppState(Y => ({
      ...Y,
      promptSuggestion: {
        text: $.suggestion,
        promptId: $.promptId,
        shownAt: 0,
        acceptedAt: 0,
        generationRequestId: $.generationRequestId
      }
    })), O) cancelPendingSuggestionRequest($.suggestion, _?.needs).catch(SH);
    if ((!K || fi() === "focused") && Jr8() && $.suggestion) Dr8($.suggestion, H, H.toolUseContext.setAppState, false, z);
  } catch ($) {
    if ($ instanceof Error && ($.name === "AbortError" || $.name === "APIUserAbortError")) {
      getCacheColdSuppressionReason("aborted", undefined, undefined, "cli");
      return;
    }
    bH("prompt_suggestion_generate", "api_error"), SH(Wq($));
  } finally {
    if (GxH === T) GxH = null;
  }
}
async function cancelPendingSuggestionRequest(H, _) {
  if (g1(H) !== H) return;
  let q = P1(nM());
  lM(q);
  let K = await AK(q);
  if (K?.tempo !== "blocked" || K.needs !== _ || K.suggestedReply === H) return;
  await VO(q, {
    ...K,
    suggestedReply: H
  });
}
function getSuggestionBlockReason(state) {
  if (!state) return null;
  let _ = state.message.usage,
    q = _.input_tokens ?? 0,
    K = _.cache_creation_input_tokens ?? 0,
    O = _.output_tokens ?? 0;
  return q + K + O > TB3 ? "cache_cold" : null;
}
async function generateSuggestionIfEligible(abortController, messages, getAppState) {
  let K = $B3[messages],
    O = async () => ({
      behavior: "deny",
      message: "No tools needed for suggestion",
      decisionReason: {
        type: "other",
        reason: "suggestion only"
      }
    }),
    T = await lG({
      promptMessages: [B6({
        content: K
      })],
      cacheSafeParams: getAppState,
      canUseTool: O,
      querySource: "prompt_suggestion",
      forkLabel: "prompt_suggestion",
      overrides: {
        abortController: abortController
      },
      skipTranscript: true,
      skipCacheWrite: true
    }),
    z = T.messages.find(Y => Y.type === "assistant"),
    $ = z?.type === "assistant" ? z.requestId ?? null : null;
  for (let Y of T.messages) {
    if (Y.type !== "assistant") continue;
    let w = Y.message.content.find(A => A.type === "text");
    if (w?.type === "text") {
      let A = w.text.trim().replace(/^<(suggestion|response|output|answer|result)>([\s\S]*)<\/\1>$/i, (f, j, J) => J.includes(`</${j.toLowerCase()}>`) || J.includes(`</${j.toUpperCase()}>`) ? f : J).replace(/^\s*(suggested\s+(response|reply|input|prompt)|suggestion|response|reply|answer|output|result)\s*:\s*/i, "").trim();
      if (A) return EH("prompt_suggestion_generate"), {
        suggestion: A,
        generationRequestId: $
      };
    }
  }
  return EH("prompt_suggestion_generate"), {
    suggestion: null,
    generationRequestId: $
  };
}
function maybeGeneratePromptSuggestion(input, mailboxEntry, q) {
  if (!input) return getCacheColdSuppressionReason("empty", undefined, mailboxEntry, q), true;
  let K = input.toLowerCase(),
    O = input.trim().split(/\s+/).length,
    T = [["done", () => K === "done"], ["meta_text", () => K === "nothing found" || K === "nothing found." || K.startsWith("nothing to suggest") || K.startsWith("no suggestion") || /\bsilence is\b|\bstay(s|ing)? silent\b/.test(K) || /^\W*silence\W*$/.test(K)], ["meta_wrapped", () => /^\(.*\)$|^\[.*\]$/.test(input)], ["error_message", () => K.startsWith("api error:") || K.startsWith("prompt is too long") || K.startsWith("request timed out") || K.startsWith("invalid api key") || K.startsWith("image was too large")], ["prefixed_label", () => /^\w+:\s/.test(input)], ["too_few_words", () => {
      if (O >= 2) return false;
      if (input.startsWith("/")) return false;
      return !new Set(["yes", "yeah", "yep", "yea", "yup", "sure", "ok", "okay", "push", "commit", "deploy", "stop", "continue", "check", "exit", "quit", "no"]).has(K);
    }], ["too_many_words", () => O > 12], ["too_long", () => input.length >= 100], ["multiple_sentences", () => /[.!?]\s+[A-Z]/.test(input)], ["has_formatting", () => /[\n*]|\*\*/.test(input)], ["evaluative", () => /thanks|thank you|looks good|sounds good|that works|that worked|that's all|nice|great|perfect|makes sense|awesome|excellent/.test(K)], ["claude_voice", () => /^(let me|i'll|i've|i'm|i can|i would|i think|i notice|here's|here is|here are|that's|this is|this will|you can|you should|you could|sure,|of course|certainly)/i.test(input)]];
  for (let [z, $] of T) if ($()) return getCacheColdSuppressionReason(z, input, mailboxEntry, q), true;
  return false;
}
function persistSuggestedReply(suggestion, needs, q, K, O) {
  let T = Math.round(needs.length / (suggestion.length || 1) * 100) / 100,
    z = needs === suggestion,
    $ = Math.max(0, Date.now() - q);
  c("tengu_prompt_suggestion", {
    source: K_("sdk"),
    outcome: K_(z ? "accepted" : "ignored"),
    prompt_id: QH(K),
    ...(O && {
      generationRequestId: a8(O)
    }),
    ...(z && {
      timeToAcceptMs: $
    }),
    ...(!z && {
      timeToIgnoreMs: $
    }),
    similarity: T,
    ...false
  });
}
function getCacheColdSuppressionReason(lastMessage, _, q, K) {
  let O = q ?? aG6();
  c("tengu_prompt_suggestion", {
    ...(K && {
      source: QH(K)
    }),
    outcome: K_("suppressed"),
    reason: lastMessage,
    prompt_id: QH(O),
    ...false
  });
}
var GxH = null,
  TB3 = 1e4,
  NqK = `[SUGGESTION MODE: Suggest what the user might naturally type next into Claude Code.]

FIRST: Look at the user's recent messages and original request.

Your job is to predict what THEY would type - not what you think they should do.

THE TEST: Would they think "I was just about to type that"?

EXAMPLES:
User asked "fix the bug and run tests", bug is fixed \u2192 "run the tests"
After code written \u2192 "try it out"
Claude offers options \u2192 suggest the one the user would likely pick, based on conversation
Claude asks to continue \u2192 "yes" or "go ahead"
Task complete, obvious follow-up \u2192 "commit this" or "push it"
After error or misunderstanding \u2192 silence (let them assess/correct)

Be specific: "run the tests" beats "continue".

NEVER SUGGEST:
- Evaluative ("looks good", "thanks")
- Questions ("what about...?")
- Claude-voice ("Let me...", "I'll...", "Here's...")
- New ideas they didn't ask about
- Multiple sentences

Stay silent if the next step isn't obvious from what the user said.

Stay silent if a suggestion could be unsafe or inappropriate \u2014 including any sensitive topic (security incidents, credentials, harm, private data). Even when the user is doing legitimate security or cybersecurity work, do not predict potentially unsafe actions.

Format: 2-12 words, match the user's style. Or nothing.

Reply with ONLY the suggestion, no quotes or explanation.`,
  $B3;
var initModule = L(() => {
  A_();
  sSH();
  iY();
  dJ();
  wO();
  l8();
  $6();
  R_();
  zk();
  y6();
  Aq();
  xX();
  v8();
  Az();
  f6();
  t6();
  v_();
  LJ();
  Ux();
  t8_();
  $B3 = {
    user_intent: NqK,
    stated_intent: NqK
  };
});
export {aG6 as pOn,sG6 as mOn,tG6 as fOn,VqK as wfa,getDefaultSuggestionVariant as $eo,isPromptSuggestionEnabled as qeo,isPromptSuggestionEnabledForSdk as kfa,cancelPendingSuggestionRequest as yQd,getSuggestionBlockReason as SQd,generateSuggestionIfEligible as Weo,maybeGeneratePromptSuggestion as Geo,persistSuggestedReply as Hfa,getCacheColdSuppressionReason as zO,GxH as R3e,TB3 as TQd,NqK as vfa,$B3 as bQd,initModule as v3e};
