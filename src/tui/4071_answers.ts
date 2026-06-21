// @ts-nocheck
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {wB as _B,eC as JE} from "../../vendor/m717.ts";
import {fc,sl as rl} from "../../vendor/m715.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {b,M as L} from "../../runtime.ts";
import {lt as ct,getQuestionPreviewFormat as J7t,getAllowedChannels as BT,getIsNonInteractiveSession as kr} from "../session/0131_sent.ts";
import {Xr} from "../../vendor/m321.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {zn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Ri,pi as ai} from "../tools/2227_userFacingName.ts";
import {NH as IH,Dh as kh} from "../config/2024_NH.ts";
import {SFe as QCe,WNr as XCe} from "../../vendor/m2201.ts";
import {Z1 as j1,TNi as f1i,Fm as Gm,SNi as A1i,ENi as g1i,fjr as b6r,bNi as h1i} from "../../vendor/m2693.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// @ts-nocheck
function bCp(e) {
  let t = questionSchema.c(6),
    {
      answers: n,
      response: r
    } = e;
  if (!r && Object.keys(n).length === 0) return null;
  let o;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) o = annotationsSchema.createElement(B, {
    flexDirection: "row"
  }, annotationsSchema.createElement(w, {
    color: _B("default")
  }, fc, "\xA0"), annotationsSchema.createElement(w, null, "User answered Claude's questions:")), t[0] = o;else o = t[0];
  let s;
  if (t[1] !== n || t[2] !== r) s = r ? annotationsSchema.createElement(w, {
    color: "inactive"
  }, "\xB7 ", r) : Object.entries(n).map(ECp), t[1] = n, t[2] = r, t[3] = s;else s = t[3];
  let i;
  if (t[4] !== s) i = annotationsSchema.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, o, annotationsSchema.createElement(qn, null, annotationsSchema.createElement(B, {
    flexDirection: "column"
  }, s))), t[4] = s, t[5] = i;else i = t[5];
  return i;
}
function ECp(e) {
  let [t, n] = e;
  return annotationsSchema.createElement(w, {
    key: t,
    color: "inactive"
  }, "\xB7 ", t, " \u2192 ", n);
}
function CCp(e) {
  if (e === undefined) return null;
  if (/<\s*(html|body|!doctype)\b/i.test(e)) return "preview must be an HTML fragment, not a full document (no <html>, <body>, or <!DOCTYPE>)";
  if (/<\s*(script|style)\b/i.test(e)) return "preview must not contain <script> or <style> tags. Use inline styles via the style attribute if needed.";
  if (!/<[a-z][^>]*>/i.test(e)) return 'preview must contain HTML (previewFormat is set to "html"). Wrap content in a tag like <div> or <pre>.';
  return null;
}
var questionSchema,
  annotationsSchema,
  uniquenessRefinement,
  answerValueSchema,
  sharedAnswerFields,
  askUserQuestionInputSchema,
  askUserQuestionOutputSchema,
  NOTES_ONLY_PLACEHOLDER,
  AskUserQuestionTool,
  SCp,
  qao = "(notes only)",
  optionSchema;
var YC_ = b(() => {
  ct();
  rc();
  rl();
  JE();
  Xr();
  Je();
  Yn();
  Ri();
  IH();
  QCe();
  j1();
  questionSchema = L(nt(), 1), annotationsSchema = L(Te(), 1), uniquenessRefinement = Re(() => E.object({
    label: E.string().describe("The display text for this option that the user will see and select. Should be concise (1-5 words) and clearly describe the choice."),
    description: E.string().describe("Explanation of what this option means or what will happen if chosen. Useful for providing context about trade-offs or implications."),
    preview: E.string().optional().describe("Optional preview content rendered when this option is focused. Use for mockups, code snippets, or visual comparisons that help users compare options. See the tool description for the expected content format.")
  })), answerValueSchema = Re(() => E.object({
    question: E.string().describe('The complete question to ask the user. Should be clear, specific, and end with a question mark. Example: "Which library should we use for date formatting?" If multiSelect is true, phrase it accordingly, e.g. "Which features do you want to enable?"'),
    header: E.string().describe(`Very short label displayed as a chip/tag (max ${f1i} chars). Examples: "Auth method", "Library", "Approach".`),
    options: E.array(uniquenessRefinement()).min(2).max(4).describe(XCe() ? "The available choices for this question. Must have 2-4 options (this cap applies to multiSelect too \u2014 group or split if you have more). Each option should be a distinct choice; mutually exclusive unless multiSelect is enabled. There should be no 'Other' option, that will be provided automatically." : "The available choices for this question. Must have 2-4 options. Each option should be a distinct, mutually exclusive choice (unless multiSelect is enabled). There should be no 'Other' option, that will be provided automatically."),
    multiSelect: E.boolean().default(false).describe("Set to true to allow the user to select multiple options instead of just one. Use when choices are not mutually exclusive.")
  })), sharedAnswerFields = Re(() => {
    let e = E.object({
      preview: E.string().optional().describe("The preview content of the selected option, if the question used previews."),
      notes: E.string().optional().describe("Free-text notes the user added to their selection.")
    });
    return E.record(E.string(), e).optional().describe("Optional per-question annotations from the user (e.g., notes on preview selections). Keyed by question text.");
  }), askUserQuestionInputSchema = {
    check: e => {
      let t = e.questions.map(n => n.question);
      if (t.length !== new Set(t).size) return false;
      for (let n of e.questions) {
        let r = n.options.map(o => o.label);
        if (r.length !== new Set(r).size) return false;
      }
      return true;
    },
    message: "Question texts must be unique, option labels must be unique within each question"
  }, askUserQuestionOutputSchema = Re(() => E.preprocess(e => Array.isArray(e) && e.every(t => typeof t === "string") ? e.join(", ") : e, E.string())), NOTES_ONLY_PLACEHOLDER = Re(() => ({
    answers: E.record(E.string(), askUserQuestionOutputSchema()).optional().describe("User answers collected by the permission component"),
    annotations: sharedAnswerFields(),
    metadata: E.object({
      source: E.string().optional().describe('Optional identifier for the source of this question (e.g., "remember" for /remember command). Used for analytics tracking.')
    }).optional().describe("Optional metadata for tracking and analytics purposes. Not displayed to user.")
  })), AskUserQuestionTool = Re(() => E.strictObject({
    questions: E.array(answerValueSchema()).min(1).max(4).describe(XCe() ? "Questions to ask the user (1-4 questions). The 1-4 questions and 2-4 options bounds are hard schema constraints; do not exceed them even if the user requests more \u2014 split into multiple calls instead." : "Questions to ask the user (1-4 questions)"),
    ...NOTES_ONLY_PLACEHOLDER()
  }).refine(askUserQuestionInputSchema.check, {
    message: askUserQuestionInputSchema.message
  })), SCp = Re(() => E.object({
    questions: E.array(answerValueSchema()).describe("The questions that were asked"),
    answers: E.record(E.string(), E.string()).describe("The answers provided by the user (question text -> answer string; multi-select answers are comma-separated)"),
    response: E.string().optional().describe("Freeform text the user typed instead of selecting a structured option"),
    annotations: sharedAnswerFields()
  }));
  optionSchema = ai({
    name: Gm,
    searchHint: "prompt the user with a multiple-choice question",
    maxResultSizeChars: 1e5,
    async description() {
      return A1i;
    },
    async prompt({
      model: e
    }) {
      let t = "";
      if (kh(e)) {
        let r = ut("tengu_cinder_plover", "").trim();
        t = r ? `
${r}
` : g1i;
      }
      let n = J7t();
      if (n === undefined) return b6r + t;
      return b6r + t + h1i[n];
    },
    get inputSchema() {
      return AskUserQuestionTool();
    },
    get outputSchema() {
      return SCp();
    },
    userFacingName() {
      return "";
    },
    isEnabled() {
      if (BT().length > 0 && kr()) return false;
      return true;
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    toAutoClassifierInput(e) {
      return e.questions.map(t => t.question).join(" | ");
    },
    requiresUserInteraction() {
      return true;
    },
    async validateInput({
      questions: e
    }) {
      if (J7t() !== "html") return {
        result: true
      };
      for (let t of e) for (let n of t.options) {
        let r = CCp(n.preview);
        if (r) return {
          result: false,
          message: `Option "${n.label}" in question "${t.question}": ${r}`,
          errorCode: 1
        };
      }
      return {
        result: true
      };
    },
    async checkPermissions(e) {
      return {
        behavior: "ask",
        message: "Answer questions?",
        updatedInput: {
          questions: e.questions,
          ...(e.metadata && {
            metadata: e.metadata
          })
        }
      };
    },
    renderToolUseMessage() {
      return null;
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage({
      answers: e,
      response: t
    }, n) {
      return annotationsSchema.createElement(bCp, {
        answers: e,
        response: t
      });
    },
    renderToolUseRejectedMessage({
      questions: e
    }) {
      return annotationsSchema.createElement(B, {
        flexDirection: "column",
        marginTop: 1
      }, annotationsSchema.createElement(B, {
        flexDirection: "row"
      }, annotationsSchema.createElement(w, {
        color: _B("default")
      }, fc, "\xA0"), annotationsSchema.createElement(w, null, "User declined to answer questions")), annotationsSchema.createElement(qn, null, annotationsSchema.createElement(B, {
        flexDirection: "column"
      }, e.map(t => annotationsSchema.createElement(w, {
        key: t.question,
        color: "inactive"
      }, "\xB7 ", t.question, " (", t.options.map(n => n.label).join(" / "), ")")))));
    },
    renderToolUseErrorMessage() {
      return null;
    },
    async call(e, t) {
      let {
          questions: n,
          answers: r = {},
          annotations: o
        } = e,
        {
          response: s
        } = e;
      return {
        data: {
          questions: n,
          answers: r,
          ...(s?.trim() && {
            response: s
          }),
          ...(o && {
            annotations: o
          })
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      questions: e,
      answers: t,
      response: n,
      annotations: r
    }, o) {
      let s = e.map(({
          question: a
        }) => {
          let l = t[a],
            c = r?.[a],
            u = l && l !== qao;
          if (!u && !c?.notes) return null;
          let d = [u ? `"${a}"="${l}"` : `"${a}"=(no option selected)`];
          if (c?.preview) d.push(`selected preview:
${c.preview}`);
          if (c?.notes) d.push(`notes: ${c.notes}`);
          return d.join(" ");
        }).filter(a => a !== null).join(", "),
        i;
      if (n?.trim()) i = `The user responded: ${n}`;else if (s) i = `Your questions have been answered: ${s}. You can now continue with these answers in mind.`;else i = "The user did not answer the questions.";
      return {
        type: "tool_result",
        content: i,
        tool_use_id: o
      };
    }
  });
});

export {bCp as Jwp,ECp as Xwp,CCp as Qwp,questionSchema as k2a,annotationsSchema as I_,uniquenessRefinement as Gwp,answerValueSchema as H2a,sharedAnswerFields as I2a,askUserQuestionInputSchema as x2a,askUserQuestionOutputSchema as Vwp,NOTES_ONLY_PLACEHOLDER as Kwp,AskUserQuestionTool as zwp,SCp as Ywp,qao as Glo,optionSchema as out,YC_ as j$t};
