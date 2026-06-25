// @ts-nocheck
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {YN,FS} from "../../vendor/m722.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {b,x} from "../../runtime.ts";
import {lt,getQuestionPreviewFormat as _Jt,getAllowedChannels as Nb,getIsNonInteractiveSession as kr,getPermissionPromptToolName as _St} from "../session/0132_sent.ts";
import {Qr} from "../../vendor/m323.ts";
import {je} from "../../vendor/m2462.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {mI,Mh} from "../config/2029_mI.ts";
import {yUe,T$r} from "../../vendor/m2208.ts";
import {d1,s3i,Zp,i3i,l3i,VVr,a3i} from "../../vendor/m2705.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
/**
 * AskUserQuestion tool — renders and validates multiple-choice questions posed
 * to the user, and maps collected answers back into tool-result blocks.
 *
 * Structure is byte-for-byte preserved from the reverse-engineered source; only
 * local identifier names, TS types, and comments have been added.
 */

/** Props for the answered-questions result renderer. */
interface AnsweredQuestionsProps {
  /** Map of question text -> answer string. */
  answers: Record<string, string>;
  /** Freeform text the user typed instead of selecting structured options. */
  response?: string;
}

/**
 * Renders the "User answered Claude's questions" summary block. Uses the React
 * compiler memo cache (`o2a.c`) to memoize the static header and the answer list.
 */
function bHp(props: AnsweredQuestionsProps) {
  let memoCache = o2a.c(6),
    {
      answers: answers,
      response: response
    } = props;
  if (!response && Object.keys(answers).length === 0) return null;
  let header;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) header = aL.jsxs($, {
    flexDirection: "row",
    children: [aL.jsxs(v, {
      color: YN("default"),
      children: [Ql, "\xA0"]
    }), aL.jsx(v, {
      children: "User answered Claude's questions:"
    })]
  }), memoCache[0] = header;else header = memoCache[0];
  let answerList;
  if (memoCache[1] !== answers || memoCache[2] !== response) answerList = response ? aL.jsxs(v, {
    color: "inactive",
    children: ["\xB7 ", response]
  }) : Object.entries(answers).map(EHp), memoCache[1] = answers, memoCache[2] = response, memoCache[3] = answerList;else answerList = memoCache[3];
  let rendered;
  if (memoCache[4] !== answerList) rendered = aL.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [header, aL.jsx(Yn, {
      children: aL.jsx($, {
        flexDirection: "column",
        children: answerList
      })
    })]
  }), memoCache[4] = answerList, memoCache[5] = rendered;else rendered = memoCache[5];
  return rendered;
}

/** Renders a single "question -> answer" line. `entry` is a [question, answer] tuple. */
function EHp(entry: [string, string]) {
  let [question, answer] = entry;
  return aL.jsxs(v, {
    color: "inactive",
    children: ["\xB7 ", question, " → ", answer]
  }, question);
}

/**
 * Validates an optional HTML preview fragment. Returns an error message string
 * if the preview is not a valid inline HTML fragment, otherwise null.
 */
function CHp(preview: string | undefined): string | null {
  if (preview === void 0) return null;
  if (/<\s*(html|body|!doctype)\b/i.test(preview)) return "preview must be an HTML fragment, not a full document (no <html>, <body>, or <!DOCTYPE>)";
  if (/<\s*(script|style)\b/i.test(preview)) return "preview must not contain <script> or <style> tags. Use inline styles via the style attribute if needed.";
  if (!/<[a-z][^>]*>/i.test(preview)) return 'preview must contain HTML (previewFormat is set to "html"). Wrap content in a tag like <div> or <pre>.';
  return null;
}

var o2a: any,
  aL: any,
  /** Lazy zod schema for a single question option (label/description/preview). */
  gHp: any,
  /** Lazy zod schema for a single question (question/header/options/multiSelect). */
  s2a: any,
  /** Lazy zod schema for optional per-question annotations. */
  i2a: any,
  /** Validation rule: unique question texts and unique option labels. */
  r2a: any,
  /** Lazy zod preprocessor coercing string arrays into comma-joined strings. */
  _Hp: any,
  /** Lazy zod schema fragment for answers/annotations/metadata. */
  yHp: any,
  /** Lazy zod input schema for the AskUserQuestion tool. */
  THp: any,
  /** Lazy zod output schema for the AskUserQuestion tool. */
  SHp: any,
  odo = "(notes only)",
  /** The AskUserQuestion tool definition object. */
  tdt: any;
var o3t = b(() => {
  lt();
  Pl();
  Pa();
  FS();
  Qr();
  je();
  jn();
  ri();
  mI();
  yUe();
  d1();
  o2a = x(tt(), 1), aL = x(oe(), 1), gHp = ve(() => C.object({
    label: C.string().describe("The display text for this option that the user will see and select. Should be concise (1-5 words) and clearly describe the choice."),
    description: C.string().describe("Explanation of what this option means or what will happen if chosen. Useful for providing context about trade-offs or implications."),
    preview: C.string().optional().describe("Optional preview content rendered when this option is focused. Use for mockups, code snippets, or visual comparisons that help users compare options. See the tool description for the expected content format.")
  })), s2a = ve(() => C.object({
    question: C.string().describe('The complete question to ask the user. Should be clear, specific, and end with a question mark. Example: "Which library should we use for date formatting?" If multiSelect is true, phrase it accordingly, e.g. "Which features do you want to enable?"'),
    header: C.string().describe(`Very short label displayed as a chip/tag (max ${s3i} chars). Examples: "Auth method", "Library", "Approach".`),
    options: C.array(gHp()).min(2).max(4).describe(T$r() ? "The available choices for this question. Must have 2-4 options (this cap applies to multiSelect too — group or split if you have more). Each option should be a distinct choice; mutually exclusive unless multiSelect is enabled. There should be no 'Other' option, that will be provided automatically." : "The available choices for this question. Must have 2-4 options. Each option should be a distinct, mutually exclusive choice (unless multiSelect is enabled). There should be no 'Other' option, that will be provided automatically."),
    multiSelect: C.boolean().default(!1).describe("Set to true to allow the user to select multiple options instead of just one. Use when choices are not mutually exclusive.")
  })), i2a = ve(() => {
    let annotationEntry = C.object({
      preview: C.string().optional().describe("The preview content of the selected option, if the question used previews."),
      notes: C.string().optional().describe("Free-text notes the user added to their selection.")
    });
    return C.record(C.string(), annotationEntry).optional().describe("Optional per-question annotations from the user (e.g., notes on preview selections). Keyed by question text.");
  }), r2a = {
    check: (input: { questions: Array<{ question: string; options: Array<{ label: string }> }> }) => {
      let questionTexts = input.questions.map(question => question.question);
      if (questionTexts.length !== new Set(questionTexts).size) return !1;
      for (let question of input.questions) {
        let optionLabels = question.options.map(option => option.label);
        if (optionLabels.length !== new Set(optionLabels).size) return !1;
      }
      return !0;
    },
    message: "Question texts must be unique, option labels must be unique within each question"
  }, _Hp = ve(() => C.preprocess((value: unknown) => Array.isArray(value) && value.every(item => typeof item === "string") ? value.join(", ") : value, C.string())), yHp = ve(() => ({
    answers: C.record(C.string(), _Hp()).optional().describe("User answers collected by the permission component"),
    annotations: i2a(),
    metadata: C.object({
      source: C.string().optional().describe('Optional identifier for the source of this question (e.g., "remember" for /remember command). Used for analytics tracking.')
    }).optional().describe("Optional metadata for tracking and analytics purposes. Not displayed to user.")
  })), THp = ve(() => C.strictObject({
    questions: C.array(s2a()).min(1).max(4).describe(T$r() ? "Questions to ask the user (1-4 questions). The 1-4 questions and 2-4 options bounds are hard schema constraints; do not exceed them even if the user requests more — split into multiple calls instead." : "Questions to ask the user (1-4 questions)"),
    ...yHp()
  }).refine(r2a.check, {
    message: r2a.message
  })), SHp = ve(() => C.object({
    questions: C.array(s2a()).describe("The questions that were asked"),
    answers: C.record(C.string(), C.string()).describe("The answers provided by the user (question text -> answer string; multi-select answers are comma-separated)"),
    response: C.string().optional().describe("Freeform text the user typed instead of selecting a structured option"),
    annotations: i2a()
  }));
  tdt = Ks({
    name: Zp,
    searchHint: "prompt the user with a multiple-choice question",
    maxResultSizeChars: 1e5,
    async description() {
      return i3i;
    },
    async prompt({
      model: model
    }) {
      let cinderSuffix = "";
      if (Mh(model)) {
        let cinderPlover = it("tengu_cinder_plover", "").trim();
        cinderSuffix = cinderPlover ? `
${cinderPlover}
` : l3i;
      }
      let previewFormat = _Jt();
      if (previewFormat === void 0) return VVr + cinderSuffix;
      return VVr + cinderSuffix + a3i[previewFormat];
    },
    get inputSchema() {
      return THp();
    },
    get outputSchema() {
      return SHp();
    },
    userFacingName() {
      return "";
    },
    isEnabled() {
      if (Nb().length > 0 && kr()) return !1;
      if (kr() && !_St()) return !1;
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input: { questions: Array<{ question: string }> }) {
      return input.questions.map(question => question.question).join(" | ");
    },
    requiresUserInteraction() {
      return !0;
    },
    async validateInput({
      questions: questions
    }: { questions: Array<{ question: string; options: Array<{ label: string; preview?: string }> }> }) {
      if (_Jt() !== "html") return {
        result: !0
      };
      for (let question of questions) for (let option of question.options) {
        let previewError = CHp(option.preview);
        if (previewError) return {
          result: !1,
          message: `Option "${option.label}" in question "${question.question}": ${previewError}`,
          errorCode: 1
        };
      }
      return {
        result: !0
      };
    },
    async checkPermissions(input: { questions: unknown; metadata?: unknown }) {
      return {
        behavior: "ask",
        message: "Answer questions?",
        updatedInput: {
          questions: input.questions,
          ...(input.metadata && {
            metadata: input.metadata
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
      answers: answers,
      response: response
    }: AnsweredQuestionsProps, _context: unknown) {
      return aL.jsx(bHp, {
        answers: answers,
        response: response
      });
    },
    renderToolUseRejectedMessage({
      questions: questions
    }: { questions: Array<{ question: string; options: Array<{ label: string }> }> }) {
      return aL.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [aL.jsxs($, {
          flexDirection: "row",
          children: [aL.jsxs(v, {
            color: YN("default"),
            children: [Ql, "\xA0"]
          }), aL.jsx(v, {
            children: "User declined to answer questions"
          })]
        }), aL.jsx(Yn, {
          children: aL.jsx($, {
            flexDirection: "column",
            children: questions.map(question => aL.jsxs(v, {
              color: "inactive",
              children: ["\xB7 ", question.question, " (", question.options.map(option => option.label).join(" / "), ")"]
            }, question.question))
          })
        })]
      });
    },
    renderToolUseErrorMessage() {
      return null;
    },
    async call(input: {
      questions: unknown;
      answers?: Record<string, string>;
      annotations?: unknown;
      response?: string;
    }, _context: unknown) {
      let {
          questions: questions,
          answers: answers = {},
          annotations: annotations
        } = input,
        {
          response: response
        } = input;
      return {
        data: {
          questions: questions,
          answers: answers,
          ...(response?.trim() && {
            response: response
          }),
          ...(annotations && {
            annotations: annotations
          })
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      questions: questions,
      answers: answers,
      response: response,
      annotations: annotations
    }: {
      questions: Array<{ question: string }>;
      answers: Record<string, string>;
      response?: string;
      annotations?: Record<string, { preview?: string; notes?: string }>;
    }, toolUseId: string) {
      let answeredSummary = questions.map(({
          question: questionText
        }) => {
          let answerText = answers[questionText],
            annotation = annotations?.[questionText],
            hasSelection = answerText && answerText !== odo;
          if (!hasSelection && !annotation?.notes) return null;
          let parts = [hasSelection ? `"${questionText}"="${answerText}"` : `"${questionText}"=(no option selected)`];
          if (annotation?.preview) parts.push(`selected preview:
${annotation.preview}`);
          if (annotation?.notes) parts.push(`notes: ${annotation.notes}`);
          return parts.join(" ");
        }).filter(part => part !== null).join(", "),
        resultText;
      if (response?.trim()) resultText = `The user responded: ${response}`;else if (answeredSummary) resultText = `Your questions have been answered: ${answeredSummary}. You can now continue with these answers in mind.`;else resultText = "The user did not answer the questions.";
      return {
        type: "tool_result",
        content: resultText,
        tool_use_id: toolUseId
      };
    }
  });
});

export {bHp,EHp,CHp,o2a,aL,gHp,s2a,i2a,r2a,_Hp,yHp,THp,SHp,odo,tdt,o3t};
