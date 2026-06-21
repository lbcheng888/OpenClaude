// @ts-nocheck
import {getSessionIdFromLog as Ah,ja as za} from "./5143_writeRemoteAgentMetadata.ts";
import {NMe as _Me,De as Ie,Rn as wn} from "../session/0615_length.ts";
import {getDefaultAppState as lW,kke as pke} from "../../vendor/m3301.ts";
import {uh as Lh,sA as uA} from "../../vendor/m2782.ts";
import {Af as yf,S_ as y_} from "../agent/1454_agentType.ts";
import {getMainLoopModel as Ns,Mo as Fo} from "./1453_swapShrinksContextWindow.ts";
import {Y$ as N$,DF as RF,xk as Ck} from "../../vendor/m2715.ts";
import {Qmt as xmt,kGn as qWn} from "../../vendor/m4821.ts";
import {RGn as UWn,kCo as CEo} from "../../vendor/m4819.ts";
import {wGn as FWn,Jmt as wmt} from "../../vendor/m4818.ts";
import {xGn as $Wn,Xmt as Rmt} from "../../vendor/m4820.ts";
import {hasPermissionsToUseTool as Wk,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {Ln,lo} from "../tools/5190_userPromptCount.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {caughtError as h6,u_e as Yge} from "./4401_content.ts";
import {Wc as jc} from "../api/3868_level.ts";
import {qt as Wt,Xt} from "../config/0228_encoding.ts";
import {b} from "../../runtime.ts";
import {Rce as fce,gh} from "../tools/4419_tabAwareSeparator.ts";
import {Jge as Pge,UL as IL} from "../tools/3918_items.ts";
// @ts-nocheck
function formatSessionSummaryLines(sessionLogs) {
  return sessionLogs.slice(0, MAX_SUMMARY_SESSIONS).map(entry => {
    let sessionId = Ah(entry) ?? "?",
      title = _Me(entry),
      parts = [sessionId, title];
    if (entry.tag) parts.push(`[tag: ${entry.tag}]`);
    if (entry.gitBranch) parts.push(`[branch: ${entry.gitBranch}]`);
    if (entry.projectPath) parts.push(`[path: ${entry.projectPath}]`);
    return parts.join(" ");
  }).join(`
`);
}
function buildSearchAgentToolUseContext(tools, messages, abortController, transcriptDirs) {
  let currentAppState = lW(),
    dirMap = new Map(transcriptDirs.map(dir => [dir, {
      path: dir,
      source: "session"
    }])),
    appStateWithDirs = {
      ...currentAppState,
      toolPermissionContext: {
        ...currentAppState.toolPermissionContext,
        additionalWorkingDirectories: dirMap
      }
    };
  return {
    messageQueue: Lh,
    agentContext: yf(),
    options: {
      commands: [],
      debug: false,
      mainLoopModel: Ns(),
      tools: tools,
      verbose: false,
      thinkingConfig: {
        type: "disabled"
      },
      mcpClients: [],
      mcpResources: {},
      isNonInteractiveSession: true,
      agentDefinitions: {
        activeAgents: [],
        allAgents: []
      },
      autoCompactWindow: appStateWithDirs.autoCompactWindow,
      fastMode: appStateWithDirs.fastMode,
      cacheBreakerPhrase: appStateWithDirs.cacheBreakerPhrase
    },
    abortController: abortController,
    readFileState: N$(RF),
    getAppState: () => appStateWithDirs,
    setAppState: () => {},
    getMcp: () => appStateWithDirs.mcp,
    getWebBrowser: () => appStateWithDirs.webBrowser,
    setToolPermissionContext: () => {},
    taskRegistry: xmt,
    sessionHooksRegistry: UWn,
    getReplContexts: () => ({}),
    setReplContext: () => {},
    setWebBrowserSlice: () => {},
    setArtifactReadVersion: () => {},
    agentLifecycle: FWn,
    teammateColors: $Wn,
    messages: messages,
    turnStartIndex: 0,
    getFileHistoryState: () => {
      return;
    },
    applyFileHistoryOp: () => {},
    applyAttributionOp: () => {}
  };
}
function buildTranscriptScopedCanUseTool(allowedDirs) {
  let deny = message => ({
    behavior: "deny",
    message: message,
    decisionReason: {
      type: "other",
      reason: "session_search_out_of_scope"
    }
  });
  return async (tool, input, ...rest) => {
    let result = await Wk(tool, input, ...rest);
    if (result.behavior === "ask") return deny(result.message);
    if (result.behavior === "allow") {
      let resolvedPath = tool.getPath?.(input),
        normalizedPath = resolvedPath && Rs(resolvedPath);
      if (normalizedPath && !allowedDirs.some(dir => normalizedPath === dir || normalizedPath.startsWith(dir + pathModule.sep))) return deny(`${normalizedPath} is outside the session transcript directories`);
    }
    return result;
  };
}
function extractLastAssistantText(messages) {
  let lastAssistant = messages.findLast(msg => msg.type === "assistant");
  if (!lastAssistant || lastAssistant.type !== "assistant") return "";
  return lastAssistant.message.content.filter(block => block.type === "text").map(block => block.type === "text" ? block.text : "").join(`
`);
}
async function rF6(query, sessionLogs, abortSignal) {
  if (!query.trim() || sessionLogs.length === 0) return [];
  let transcriptDirs = ps(sessionLogs.map(entry => entry.fullPath && pathModule.dirname(entry.fullPath)).filter(dir => dir != null));
  if (transcriptDirs.length === 0) return [];
  let summaryLines = formatSessionSummaryLines(sessionLogs),
    userPromptText = `Search query: "${query}"

Search ONLY these transcript directories (other paths are out of scope):
${transcriptDirs.join(`
`)}

Recent sessions (id title metadata) \u2014 partial list, the match may not be here:
${summaryLines}

Find sessions whose transcript content matches the query by grepping the .jsonl files under the directories above.`,
    initialMessages = [Ln({
      content: userPromptText
    })];
  if (abortSignal?.aborted) return [];
  let innerAbortController = new AbortController(),
    onOuterAbort = () => innerAbortController.abort();
  abortSignal?.addEventListener("abort", onOuterAbort);
  let toolUseContext = buildSearchAgentToolUseContext(XoO, initialMessages, innerAbortController, transcriptDirs);
  v(`Agentic search: querying ${sessionLogs.length} logs for "${query}" across ${transcriptDirs.length} dirs`);
  let accumulatedMessages = [...initialMessages];
  try {
    for await (let event of h6({
      messages: initialMessages,
      systemPrompt: jc([AGENTIC_SEARCH_SYSTEM_PROMPT]),
      userContext: {},
      systemContext: {},
      canUseTool: buildTranscriptScopedCanUseTool(transcriptDirs),
      toolUseContext: toolUseContext,
      querySource: "session_search",
      maxTurns: MAX_SEARCH_TURNS
    })) {
      if (event.type === "stream_event" || event.type === "stream_request_start") continue;
      if (event.type === "assistant" || event.type === "user") accumulatedMessages.push(event);
    }
  } catch (err) {
    if (innerAbortController.signal.aborted) return [];
    return Ie(err), [];
  } finally {
    abortSignal?.removeEventListener("abort", onOuterAbort);
  }
  let finalText = extractLastAssistantText(accumulatedMessages);
  v(`Agentic search response: ${finalText}`);
  let sessionIdsRawMatch = Array.from(finalText.matchAll(/"session_ids"\s*:\s*(\[[^\]]*\])/g)).at(-1)?.[1];
  if (!sessionIdsRawMatch) return v("Agentic search: no session_ids array in final response"), [];
  let parsedIds;
  try {
    parsedIds = ps(Wt(sessionIdsRawMatch));
  } catch (err) {
    return v(`Agentic search: failed to parse session_ids array from model response: ${err instanceof Error ? err.message : String(err)}`, {
      level: "error"
    }), [];
  }
  let idToLog = new Map();
  for (let entry of sessionLogs) {
    let sessionId = Ah(entry);
    if (sessionId) idToLog.set(sessionId, entry);
  }
  let matchedLogs = parsedIds.map(id => idToLog.get(id)).filter(entry => entry !== undefined);
  return v(`Agentic search found ${matchedLogs.length}/${parsedIds.length} resumable sessions`), matchedLogs;
}
var pathModule,
  MAX_SEARCH_TURNS = 20,
  MAX_SUMMARY_SESSIONS = 50,
  XoO,
  AGENTIC_SEARCH_SYSTEM_PROMPT = `You are searching for past Claude Code conversation sessions on behalf of the user.

Session transcripts are stored as .jsonl files under the projects directory. Each line is a JSON message; user and assistant messages contain a "content" field with the conversation text. The filename (without .jsonl) is the session ID.

You have Grep and Read tools. Use Grep with files_with_matches mode to scan transcript content efficiently before reading individual files.

When you have identified the matching sessions, end with ONLY a JSON object on its own line:
{"session_ids": ["<uuid>", ...]}

Return session IDs ordered by relevance (most relevant first). Return an empty array if nothing matches.`;
var rfq = b(() => {
  Yge();
  pke();
  fce();
  Pge();
  y_();
  wmt();
  je();
  Ck();
  CEo();
  wn();
  uA();
  lo();
  Fo();
  Pu();
  ay();
  za();
  Xt();
  Rmt();
  qWn();
  pathModule = require("path"), XoO = [IL, gh];
});

export {formatSessionSummaryLines as _rm,buildSearchAgentToolUseContext as yrm,buildTranscriptScopedCanUseTool as Trm,extractLastAssistantText as Srm,rF6 as IGn,pathModule as HGn,MAX_SEARCH_TURNS as frm,MAX_SUMMARY_SESSIONS as Arm,XoO as hrm,AGENTIC_SEARCH_SYSTEM_PROMPT as grm,rfq as HCo};
