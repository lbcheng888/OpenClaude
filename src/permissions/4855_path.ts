// @ts-nocheck
import {getSessionIdFromLog as fh,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {I1e,Ie,vn} from "../session/0621_length.ts";
import {$W,gIe} from "../../vendor/m3317.ts";
import {ch,ef} from "../../vendor/m2794.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {getMainLoopModel as gs,Ro} from "./1458_swapShrinksContextWindow.ts";
import {_$,eB,Gk} from "../../vendor/m2727.ts";
import {dgt,yjn} from "../../vendor/m4853.ts";
import {gjn,jHo} from "../../vendor/m4851.ts";
import {hjn,cgt} from "../../vendor/m4850.ts";
import {_jn,ugt} from "../../vendor/m4852.ts";
import {hasPermissionsToUseTool as lx,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {Mn,po} from "../tools/5224_userPromptCount.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {jq,xye} from "./4423_content.ts";
import {vc} from "../api/3886_level.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {b} from "../../runtime.ts";
import {ace,hh} from "../tools/4441_tabAwareSeparator.ts";
import {dye,iL} from "../tools/3938_items.ts";
// @ts-nocheck
/**
 * Agentic session search: drives a sub-agent to grep past Claude Code
 * conversation transcripts (.jsonl files) and return the matching session IDs.
 */

/**
 * Render a short, human-readable summary line per session log entry
 * (id, title, and optional tag/branch/path metadata), capped at
 * MAX_SUMMARY_SESSIONS entries and joined by newlines.
 */
function xpm(sessionLogs) {
  return sessionLogs.slice(0, kpm).map(entry => {
    let sessionId = fh(entry) ?? "?",
      title = I1e(entry),
      parts = [sessionId, title];
    if (entry.tag) parts.push(`[tag: ${entry.tag}]`);
    if (entry.gitBranch) parts.push(`[branch: ${entry.gitBranch}]`);
    if (entry.projectPath) parts.push(`[path: ${entry.projectPath}]`);
    return parts.join(" ");
  }).join(`
`);
}
/**
 * Build the non-interactive ToolUseContext for the search sub-agent,
 * scoping its permission context to the given transcript directories.
 */
function Dpm(tools, messages, abortController, transcriptDirs) {
  let currentAppState = $W(),
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
    messageQueue: ch,
    agentContext: Hm(),
    options: {
      commands: [],
      debug: !1,
      mainLoopModel: gs(),
      tools: tools,
      verbose: !1,
      thinkingConfig: {
        type: "disabled"
      },
      mcpClients: [],
      mcpResources: {},
      isNonInteractiveSession: !0,
      agentDefinitions: {
        activeAgents: [],
        allAgents: []
      },
      autoCompactWindow: appStateWithDirs.autoCompactWindow,
      fastMode: appStateWithDirs.fastMode,
      cacheBreakerPhrase: appStateWithDirs.cacheBreakerPhrase
    },
    abortController: abortController,
    readFileState: _$(eB),
    getAppState: () => appStateWithDirs,
    setAppState: () => {},
    getMcp: () => appStateWithDirs.mcp,
    getWebBrowser: () => appStateWithDirs.webBrowser,
    setToolPermissionContext: () => {},
    taskRegistry: dgt,
    sessionHooksRegistry: gjn,
    getReplContexts: () => ({}),
    setReplContext: () => {},
    setWebBrowserSlice: () => {},
    setArtifactReadVersion: () => {},
    agentLifecycle: hjn,
    teammateColors: _jn,
    rootToolSurface: {
      tools: tools,
      mainLoopModel: gs()
    },
    messages: messages,
    turnStartIndex: 0,
    getFileHistoryState: () => {
      return;
    },
    applyFileHistoryOp: () => {},
    applyAttributionOp: () => {}
  };
}
/**
 * Wrap the base permission check so the sub-agent can only touch paths
 * inside the allowed transcript directories; anything else (including
 * "ask" decisions) is denied as out of scope.
 */
function Ppm(allowedDirs) {
  let deny = message => ({
    behavior: "deny",
    message: message,
    decisionReason: {
      type: "other",
      reason: "session_search_out_of_scope"
    }
  });
  return async (tool, input, ...rest) => {
    let result = await lx(tool, input, ...rest);
    if (result.behavior === "ask") return deny(result.message);
    if (result.behavior === "allow") {
      let resolvedPath = tool.getPath?.(input),
        normalizedPath = resolvedPath && hs(resolvedPath);
      if (normalizedPath && !allowedDirs.some(dir => normalizedPath === dir || normalizedPath.startsWith(dir + Tjn.sep))) return deny(`${normalizedPath} is outside the session transcript directories`);
    }
    return result;
  };
}
/** Concatenate the text blocks of the last assistant message, or "". */
function Opm(messages) {
  let lastAssistant = messages.findLast(msg => msg.type === "assistant");
  if (!lastAssistant || lastAssistant.type !== "assistant") return "";
  return lastAssistant.message.content.filter(block => block.type === "text").map(block => block.type === "text" ? block.text : "").join(`
`);
}
/**
 * Run the agentic search: feed the query + transcript dirs to the sub-agent,
 * collect its turns, parse the final {"session_ids":[...]} JSON, and map those
 * IDs back to the resumable session log entries.
 */
async function Sjn(query, sessionLogs, abortSignal) {
  if (!query.trim() || sessionLogs.length === 0) return [];
  let transcriptDirs = os(sessionLogs.map(entry => entry.fullPath && Tjn.dirname(entry.fullPath)).filter(dir => dir != null));
  if (transcriptDirs.length === 0) return [];
  let summaryLines = xpm(sessionLogs),
    userPromptText = `Search query: "${query}"

Search ONLY these transcript directories (other paths are out of scope):
${transcriptDirs.join(`
`)}

Recent sessions (id title metadata) \u2014 partial list, the match may not be here:
${summaryLines}

Find sessions whose transcript content matches the query by grepping the .jsonl files under the directories above.`,
    initialMessages = [Mn({
      content: userPromptText
    })];
  if (abortSignal?.aborted) return [];
  let innerAbortController = new AbortController(),
    onOuterAbort = () => innerAbortController.abort();
  abortSignal?.addEventListener("abort", onOuterAbort);
  let toolUseContext = Dpm(Hpm, initialMessages, innerAbortController, transcriptDirs);
  A(`Agentic search: querying ${sessionLogs.length} logs for "${query}" across ${transcriptDirs.length} dirs`);
  let accumulatedMessages = [...initialMessages];
  try {
    for await (let event of jq({
      messages: initialMessages,
      systemPrompt: vc([Ipm]),
      userContext: {},
      systemContext: {},
      canUseTool: Ppm(transcriptDirs),
      toolUseContext: toolUseContext,
      querySource: "session_search",
      maxTurns: wpm
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
  let finalText = Opm(accumulatedMessages);
  A(`Agentic search response: ${finalText}`);
  let sessionIdsRawMatch = Array.from(finalText.matchAll(/"session_ids"\s*:\s*(\[[^\]]*\])/g)).at(-1)?.[1];
  if (!sessionIdsRawMatch) return A("Agentic search: no session_ids array in final response"), [];
  let parsedIds;
  try {
    parsedIds = os(qt(sessionIdsRawMatch));
  } catch (err) {
    return A(`Agentic search: failed to parse session_ids array from model response: ${err instanceof Error ? err.message : String(err)}`, {
      level: "error"
    }), [];
  }
  let idToLog = new Map();
  for (let entry of sessionLogs) {
    let sessionId = fh(entry);
    if (sessionId) idToLog.set(sessionId, entry);
  }
  let matchedLogs = parsedIds.map(id => idToLog.get(id)).filter(entry => entry !== void 0);
  return A(`Agentic search found ${matchedLogs.length}/${parsedIds.length} resumable sessions`), matchedLogs;
}
var Tjn,
  wpm = 20,
  kpm = 50,
  Hpm,
  Ipm = `You are searching for past Claude Code conversation sessions on behalf of the user.

Session transcripts are stored as .jsonl files under the projects directory. Each line is a JSON message; user and assistant messages contain a "content" field with the conversation text. The filename (without .jsonl) is the session ID.

You have Grep and Read tools. Use Grep with files_with_matches mode to scan transcript content efficiently before reading individual files.

When you have identified the matching sessions, end with ONLY a JSON object on its own line:
{"session_ids": ["<uuid>", ...]}

Return session IDs ordered by relevance (most relevant first). Return an empty array if nothing matches.`;
var YHo = b(() => {
  xye();
  gIe();
  ace();
  dye();
  Ph();
  cgt();
  qe();
  Gk();
  jHo();
  vn();
  ef();
  po();
  Ro();
  Tu();
  ly();
  _a();
  tn();
  ugt();
  yjn();
  Tjn = require("path"), Hpm = [iL, hh];
});

export {xpm,Dpm,Ppm,Opm,Sjn,Tjn,wpm,kpm,Hpm,Ipm,YHo};
