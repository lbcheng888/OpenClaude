// @ts-nocheck
import {h1 as Bv,kl as Z4,lh as OY} from "../../vendor/m2739.ts";
import {Mn as U6,fS as qJ,Kl as J1,po as zq} from "../tools/5224_userPromptCount.ts";
import {runForkedAgent as mG,ID as Tk} from "../artifact/4427_withDisallowedCommandTools.ts";
import {qp as WT} from "../../vendor/m137.ts";
import {$E as $M,Opt as cK_} from "../core/4189_input_tokens.ts";
import {b as L} from "../../runtime.ts";
import {jx as ak} from "../../vendor/m196.ts";
// Restored from obfuscated Claude Code 2.1.177 — module "permissions/4443_word".
//
// Implements the `/btw` ("by the way") side-question feature: while the main
// agent keeps running in the background, the user can fire a quick one-off
// question that is answered by a separate, lightweight, tool-less agent.
// This module owns:
//   - the `/btw` command word matcher,
//   - the in-memory side-question conversation history,
//   - `askSideQuestion`, which spins up the side agent and harvests its reply.
//
// 1:1 reverse-engineering: only identifiers, types, and comments were added.
// All control flow, operators, and string literals are preserved exactly.
//
// Cross-module references kept verbatim (defined/remapped elsewhere by the
// bundle): mG (core query/conversation driver), U6 (build user message),
// qJ (build assistant message), J1 (join text content blocks), Bv (create a
// child AbortController linked to a parent), Z4 (create a fresh
// AbortController), WT (abort error class), $M (zero/empty Usage object),
// L (esbuild lazy module-init wrapper), and the init thunks ak/cK_/OY/Tk/zq.

/** A single word match within the input, with its character span. */
interface WordMatch {
  word: string;
  start: number;
  end: number;
}

/** One answered side question retained in history. */
interface SideQuestionEntry {
  question: string;
  response: string;
}

/** In-memory state for the side-question feature. */
interface SideQuestionState {
  history: SideQuestionEntry[];
}

/** Outcome of asking a side question. */
interface SideQuestionResult {
  /** The model's textual answer, or null when none was produced. */
  response: string | null;
  /** True when the "answer" is a synthetic notice (e.g. tool-call/error fallback). */
  synthetic: boolean;
  /** Token usage for the side-question turn. */
  usage?: unknown;
  /** True when the request was aborted before completing. */
  aborted?: boolean;
}

/**
 * Extract every regex match of {@link BTW_COMMAND_REGEX} in the given text,
 * returning each matched word together with its start/end character offsets.
 */
function findBtwCommandMatches(text: string): WordMatch[] {
  let matches: WordMatch[] = [],
    iterator = text.matchAll(BTW_COMMAND_REGEX);
  for (let match of iterator) if (match.index !== void 0) matches.push({
    word: match[0],
    start: match.index,
    end: match.index + match[0].length
  });
  return matches;
}

/** Create the initial, empty side-question state. */
function createSideQuestionState(): SideQuestionState {
  return {
    history: []
  };
}

/** Return the current side-question conversation history. */
function getSideQuestionHistory(): SideQuestionEntry[] {
  return sideQuestionState.history;
}

/** Replace the entire side-question conversation history. */
function setSideQuestionHistory(history: SideQuestionEntry[]): void {
  sideQuestionState.history = history;
}

/**
 * Append a question/response pair to the side-question history, keeping only
 * the most recent {@link MAX_SIDE_QUESTION_HISTORY} entries.
 */
function appendSideQuestionHistory(question: string, response: string): void {
  sideQuestionState.history = [...sideQuestionState.history, {
    question: question,
    response: response
  }].slice(-MAX_SIDE_QUESTION_HISTORY);
}

/** Parameters for {@link askSideQuestion}. */
interface AskSideQuestionParams {
  question: string;
  cacheSafeParams: unknown;
  /** Optional parent AbortController to link the side request to. */
  parentController?: AbortController;
  /** Optional callback invoked when the side request is being retried. */
  onRetry?: (info: {
    retryAttempt: number;
    maxRetries: number;
    retryInMs: number;
    status: unknown;
  }) => void;
  /** When true (default), prior side-question history is threaded in as context. */
  threadHistory?: boolean;
}

/**
 * Ask a one-off "side question" answered by a separate, tool-less, single-turn
 * agent that shares the conversation context but does not interrupt the main
 * agent. Optionally threads prior side-question history as context and records
 * the new answer into history on success.
 */
async function askSideQuestion({
  question: question,
  cacheSafeParams: cacheSafeParams,
  parentController: parentController,
  onRetry: onRetry,
  threadHistory = !0
}: AskSideQuestionParams): Promise<SideQuestionResult> {
  let prompt = `<system-reminder>This is a side question from the user. You must answer this question directly in a single response.

IMPORTANT CONTEXT:
- You are a separate, lightweight agent spawned to answer this one question
- The main agent is NOT interrupted - it continues working independently in the background
- You share the conversation context but are a completely separate instance
- Do NOT reference being interrupted or what you were "previously doing" - that framing is incorrect

CRITICAL CONSTRAINTS:
- You have NO tools available - you cannot read files, run commands, search, or take any actions
- This is a one-off response - there will be no follow-up turns
- You can ONLY provide information based on what you already know from the conversation context
- NEVER say things like "Let me try...", "I'll now...", "Let me check...", or promise to take any action
- If you don't know the answer, say so - do not offer to look it up or investigate

Simply answer the question with the information you have.</system-reminder>

${question}`,
    abortController = parentController ? Bv(parentController) : Z4(),
    historyMessages = threadHistory ? sideQuestionState.history.flatMap(entry => [U6({
      content: entry.question
    }), qJ({
      content: entry.response
    })]) : [];
  try {
    let queryResult = await mG({
        promptMessages: [...historyMessages, U6({
          content: prompt
        })],
        cacheSafeParams: cacheSafeParams,
        canUseTool: async () => ({
          behavior: "deny",
          message: "Side questions cannot use tools",
          decisionReason: {
            type: "other",
            reason: "side_question"
          }
        }),
        querySource: "side_question",
        forkLabel: "side_question",
        maxTurns: 1,
        skipCacheWrite: !0,
        skipTranscript: !0,
        overrides: {
          abortController: abortController
        },
        onMessage: onRetry ? message => {
          if (isApiErrorMessage(message)) onRetry({
            retryAttempt: message.retryAttempt,
            maxRetries: message.maxRetries,
            retryInMs: message.retryInMs,
            status: message.error.status
          });
        } : void 0
      }),
      {
        response: response,
        synthetic: synthetic
      } = extractSideQuestionResponse(queryResult.messages);
    if (threadHistory && response && !synthetic) appendSideQuestionHistory(question, response);
    return {
      response: response,
      synthetic: synthetic,
      usage: queryResult.totalUsage
    };
  } catch (error) {
    if (error instanceof WT || abortController.signal.aborted) return {
      response: null,
      synthetic: !1,
      usage: $M,
      aborted: !0
    };
    throw error;
  }
}

/**
 * Derive the side-question reply from the agent's emitted messages.
 *
 * Prefers concatenated assistant text. If the assistant only attempted a tool
 * call, returns a synthetic notice. If the run surfaced an API error, returns a
 * synthetic error notice. Otherwise returns a null response.
 */
function extractSideQuestionResponse(messages: any[]): {
  response: string | null;
  synthetic: boolean;
} {
  let assistantContent = messages.flatMap(message => message.type === "assistant" ? message.message.content : []);
  if (assistantContent.length > 0) {
    let joinedText = J1(assistantContent, `

`).trim();
    if (joinedText) return {
      response: joinedText,
      synthetic: !1
    };
    let toolUseBlock = assistantContent.find((block: any) => block.type === "tool_use");
    if (toolUseBlock) return {
      response: `(The model tried to call ${"name" in toolUseBlock ? toolUseBlock.name : "a tool"} instead of answering directly. Try rephrasing or ask in the main conversation.)`,
      synthetic: !0
    };
  }
  let apiErrorMessage = messages.find(isApiErrorMessage);
  if (apiErrorMessage) return {
    response: `(API error: ${apiErrorMessage.error.formatted})`,
    synthetic: !0
  };
  return {
    response: null,
    synthetic: !1
  };
}

/** Type guard: true for a system message representing an API error. */
function isApiErrorMessage(message: any): boolean {
  return message.type === "system" && "subtype" in message && message.subtype === "api_error";
}
var BTW_COMMAND_REGEX: RegExp,
  MAX_SIDE_QUESTION_HISTORY = 20,
  sideQuestionState: SideQuestionState;

/** Lazy module initializer: pulls in dependencies and seeds module state. */
var initSideQuestionModule = L(() => {
  ak();
  cK_();
  OY();
  Tk();
  zq();
  BTW_COMMAND_REGEX = /^\/btw\b/gi;
  sideQuestionState = createSideQuestionState();
});
export {findBtwCommandMatches as wul,createSideQuestionState as ujp,getSideQuestionHistory as kul,setSideQuestionHistory as Hul,appendSideQuestionHistory as uCo,askSideQuestion as oVn,extractSideQuestionResponse as djp,isApiErrorMessage as Iul,BTW_COMMAND_REGEX as ljp,MAX_SIDE_QUESTION_HISTORY as cjp,sideQuestionState as t8t,initSideQuestionModule as sVn};
