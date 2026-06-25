// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {zn,os} from "../api/0465_getOauthConfig.ts";
import {Y7,oDt,mE,xm,Kc,Jm} from "../config/2207_Jm.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Pi,Mo,vu} from "../mcp/2200_mcpServerName.ts";
import {brt,nee} from "../../vendor/m2685.ts";
import {getMemoryToggledOff as Kx,lt} from "../session/0132_sent.ts";
import {Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {checkReadNetworkPathSafety as wmt,Xm} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {ws,Yc,Zm} from "../config/2709_Zm.ts";
import {fa,ry} from "../../vendor/m2253.ts";
import {Ec,dw} from "../../vendor/m2593.ts";
import {hI,Zfe,cO} from "../telemetry/2249_cO.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {createCacheSafeParams as BW,runForkedAgent as vI,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {e5t,Z6t,jSo} from "../../vendor/m4400.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {fsl,hsl} from "../agent/4403_hsl.ts";
import {Mn,SWn,po} from "./5224_userPromptCount.ts";
import {tft,_Wn} from "../telemetry/4402__Wn.ts";
import {gE} from "../../vendor/m2246.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {Nu,Wu} from "../../vendor/m438.ts";
// @ts-nocheck
/** Auto-memory extraction module: gates which tool calls the auto-memory agent may run,
 *  and orchestrates the background "extract memories" agent run. */
var TWn = {};
ft(TWn, {
  isAllowedAutoMemWritePath: () => isAllowedAutoMemWritePath,
  initExtractMemories: () => initExtractMemories,
  executeExtractMemories: () => executeExtractMemories,
  drainPendingExtraction: () => drainPendingExtraction,
  createAutoMemCanUseTool: () => createAutoMemCanUseTool
});
/** True for conversation messages that count as a real turn (user or assistant). */
function YSo(message: any): any {
  return message.type === "user" || message.type === "assistant";
}
/** Count user/assistant messages after the last-seen uuid; if uuid not found, count all turns. */
function nGp(messages: any, lastSeenUuid: any): any {
  if (lastSeenUuid === null || lastSeenUuid === void 0) return zn(messages, YSo);
  let found = !1,
    count = 0;
  for (let message of messages) {
    if (!found) {
      if (message.uuid === lastSeenUuid) found = !0;
      continue;
    }
    if (YSo(message)) count++;
  }
  if (!found) return zn(messages, YSo);
  return count;
}
/** Whether any assistant message after the last-seen uuid wrote directly to a memory file. */
function rGp(messages: any, lastSeenUuid: any): any {
  let found = lastSeenUuid === void 0;
  for (let message of messages) {
    if (!found) {
      if (message.uuid === lastSeenUuid) found = !0;
      continue;
    }
    if (message.type !== "assistant") continue;
    let content = message.message.content;
    if (!Array.isArray(content)) continue;
    for (let block of content) {
      let filePath = Ssl(block);
      if (filePath !== void 0 && Y7(filePath)) return !0;
    }
  }
  return !1;
}
/** Count of non-empty whitespace-delimited words in a string. */
function _sl(text: any): any {
  return zn(text.split(/\s+/), Boolean);
}
/** True if a user message contains enough prose (>= gsl words) to warrant extraction. */
function ysl(message: any): any {
  if (message.type !== "user" || message.isMeta) return !1;
  let content = message.message.content;
  if (typeof content === "string") return _sl(content) >= gsl;
  if (!Array.isArray(content)) return !1;
  return content.some((block: any) => block.type === "text" && _sl(block.text) >= gsl);
}
/** Whether there is any user prose after the last-seen uuid (or anywhere if uuid not found). */
function oGp(messages: any, lastSeenUuid: any): any {
  let found = lastSeenUuid === void 0;
  for (let message of messages) {
    if (!found) {
      if (message.uuid === lastSeenUuid) found = !0;
      continue;
    }
    if (ysl(message)) return !0;
  }
  if (!found) return messages.some(ysl);
  return !1;
}
/** Build a "deny" tool-permission result, logging the denial reason. */
function t5t(tool: any, reason: any): any {
  return A(`[autoMem] denied ${tool.name}: ${reason}`), W("tengu_auto_mem_tool_denied", {
    tool_name: Pi(tool.name)
  }), {
    behavior: "deny",
    message: reason,
    decisionReason: {
      type: "other",
      reason: reason
    }
  };
}
/** Validate a PowerShell Remove-Item command: only deletes .md files inside the memory dir. */
function sGp(command: any): any {
  let tokens = command.trim().match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
  if (tokens.length < 2) return !1;
  if (!/^(remove-item|ri|del|erase|rd|rm|rmdir)$/i.test(tokens[0])) return !1;
  let pathCount = 0;
  for (let i = 1; i < tokens.length; i++) {
    let token = tokens[i];
    if (/^-(?:Literal)?Path$/i.test(token)) continue;
    if (token.startsWith("-")) return !1;
    let unquoted = token.startsWith('"') && token.endsWith('"') || token.startsWith("'") && token.endsWith("'") ? token.slice(1, -1) : token;
    if (/[*?[\]$`(){}|;&<>"',]/.test(unquoted)) return !1;
    if (!unquoted.endsWith(".md")) return !1;
    if (!Y7(unquoted)) return !1;
    pathCount++;
  }
  return pathCount > 0;
}
/** Validate a Bash `rm` command: simple, non-recursive, only absolute .md files in the memory dir. */
async function iGp(command: any): Promise<any> {
  let parsed = await brt(command);
  if (parsed.kind !== "simple") return !1;
  if (parsed.commands.length !== 1) return !1;
  let cmd = parsed.commands[0];
  if (!cmd) return !1;
  if (cmd.argv[0] !== "rm") return !1;
  if (cmd.redirects.length > 0) return !1;
  if (cmd.envVars.length > 0) return !1;
  let pathCount = 0,
    afterDoubleDash = !1;
  for (let i = 1; i < cmd.argv.length; i++) {
    let arg = cmd.argv[i];
    if (arg === void 0) continue;
    if (!afterDoubleDash) {
      if (arg === "--") {
        afterDoubleDash = !0;
        continue;
      }
      if (arg.startsWith("-")) {
        if (arg === "--recursive" || /^-[a-zA-Z]*[rR]/.test(arg)) return !1;
        continue;
      }
    }
    if (/[*?[]/.test(arg)) return !1;
    if (!arg.startsWith("/") || !arg.endsWith(".md")) return !1;
    if (!Y7(arg)) return !1;
    pathCount++;
  }
  return pathCount > 0;
}
/** True if the path is a .md file located inside the auto-memory directory. */
function isAllowedAutoMemWritePath(filePath: any): any {
  return filePath.endsWith(".md") && oDt(filePath);
}
/** Build the canUseTool gate for the auto-memory agent, scoped to memory dir `memoryDir`. */
function createAutoMemCanUseTool(memoryDir: any): any {
  return async (tool: any, input: any, ctx: any) => {
    if (Kx()) return t5t(tool, "Memory is paused. Run /pause-memory to resume automemory.");
    if (tool.name === Mf) return {
      behavior: "allow",
      updatedInput: input
    };
    if (tool.name === vs || tool.name === Cc || tool.name === su) {
      let denial = wmt(tool, input, ctx.getAppState().toolPermissionContext);
      if (denial) return t5t(tool, denial.message);
      return {
        behavior: "allow",
        updatedInput: input
      };
    }
    if (tool.name === Mo || tool.name === ws) {
      let parsedInput = tool.inputSchema.safeParse(input);
      if (parsedInput.success) {
        if (tool.isReadOnly(parsedInput.data)) return {
          behavior: "allow",
          updatedInput: input
        };
        let command = parsedInput.data.command;
        if (typeof command === "string") {
          if (tool.name === Mo ? await iGp(command) : sGp(command)) return {
            behavior: "allow",
            updatedInput: input
          };
        }
      }
      let isBash = tool.name === Mo;
      return t5t(tool, `Only read-only shell commands and ${isBash ? "rm" : "Remove-Item"} with all paths inside ${memoryDir} are permitted in this context (${isBash ? "ls, find, grep, cat, stat, wc, head, tail, and similar" : "Get-ChildItem, Get-Content, Select-Object -First/-Last, and similar"})`);
    }
    if ((tool.name === fa || tool.name === Ec) && "file_path" in input) {
      if (tool.name === fa && mE()) return t5t(tool, `${fa} is not permitted in tiny memory mode — memories are immutable, so delete via ${Yc() ? "Bash rm" : "PowerShell Remove-Item"} and rewrite via ${Ec}.`);
      let filePath = input.file_path;
      if (typeof filePath === "string" && isAllowedAutoMemWritePath(filePath)) return {
        behavior: "allow",
        updatedInput: input
      };
    }
    let writeTool = Yc() ? Mo : ws;
    return t5t(tool, `only ${vs}, ${Cc}, ${su}, read-only ${writeTool}, and ${fa}/${Ec} within ${memoryDir} are allowed`);
  };
}
/** Extract the file_path from a write/edit tool_use block, or undefined if not applicable. */
function Ssl(block: any): any {
  if (block.type !== "tool_use" || block.name !== fa && block.name !== Ec) return;
  let input = block.input;
  if (typeof input === "object" && input !== null && "file_path" in input) {
    let filePath = input.file_path;
    return typeof filePath === "string" ? filePath : void 0;
  }
  return;
}
/** Collect the distinct memory file paths written across all assistant messages. */
function aGp(messages: any): any {
  let writtenPaths: any[] = [];
  for (let message of messages) {
    if (message.type !== "assistant") continue;
    let content = message.message.content;
    if (!Array.isArray(content)) continue;
    for (let block of content) {
      let filePath = Ssl(block);
      if (filePath !== void 0 && isAllowedAutoMemWritePath(filePath)) writtenPaths.push(filePath);
    }
  }
  return os(writtenPaths);
}
/** Initialize the background memory-extraction machinery, wiring up the run/drain handlers. */
function initExtractMemories(): any {
  let pendingRuns = new Set(),
    lastSeenUuid: any,
    isRunning = !1,
    isExtracting = !1,
    runCounter = 0,
    stashedRun: any;
  async function runExtraction({
    context: ctx,
    appendSystemMessage: appendSystemMessage,
    isTrailingRun: isTrailingRun
  }: any): Promise<any> {
    let {
        messages: messages
      } = ctx,
      memoryDir = xm(),
      newMessageCount = nGp(messages, lastSeenUuid);
    if (rGp(messages, lastSeenUuid)) {
      A("[extractMemories] skipping — conversation already wrote to memory files");
      let last = messages.at(-1);
      if (last?.uuid) lastSeenUuid = last.uuid;
      W("tengu_extract_memories_skipped_direct_write", {
        message_count: newMessageCount
      });
      return;
    }
    if (!oGp(messages, lastSeenUuid)) {
      A("[extractMemories] skipping — no user prose since last extraction");
      let last = messages.at(-1);
      if (last?.uuid) lastSeenUuid = last.uuid;
      W("tengu_extract_memories_skipped_no_prose", {
        message_count: newMessageCount
      });
      return;
    }
    let extractionPrompt = hI(),
      runEvery = it("tengu_bramble_lintel", null) ?? 1,
      canUseTool = createAutoMemCanUseTool(memoryDir),
      cacheSafeParams = BW(ctx);
    if (!isTrailingRun) {
      if (runCounter++, runCounter < runEvery) return;
    }
    runCounter = 0, isExtracting = !0;
    let startTime = Date.now();
    try {
      A(`[extractMemories] starting — ${newMessageCount} new messages, memoryDir=${memoryDir}`);
      let existingMemories = e5t(await Z6t(memoryDir, kl().signal)),
        promptContent = fsl(newMessageCount, existingMemories, extractionPrompt),
        agentResult = await vI({
          promptMessages: [Mn({
            content: promptContent
          })],
          cacheSafeParams: cacheSafeParams,
          canUseTool: canUseTool,
          querySource: "extract_memories",
          forkLabel: "extract_memories",
          skipTranscript: !0,
          maxTurns: 5,
          skipCacheWrite: tft()
        }),
        last = messages.at(-1);
      if (last?.uuid) lastSeenUuid = last.uuid;
      let writtenPaths = aGp(agentResult.messages),
        turnCount = zn(agentResult.messages, (m: any) => m.type === "assistant"),
        totalTokens = agentResult.totalUsage.input_tokens + agentResult.totalUsage.cache_creation_input_tokens + agentResult.totalUsage.cache_read_input_tokens,
        cacheHitPct = totalTokens > 0 ? (agentResult.totalUsage.cache_read_input_tokens / totalTokens * 100).toFixed(1) : "0.0";
      if (A(`[extractMemories] finished — ${writtenPaths.length} files written, cache: read=${agentResult.totalUsage.cache_read_input_tokens} create=${agentResult.totalUsage.cache_creation_input_tokens} input=${agentResult.totalUsage.input_tokens} (${cacheHitPct}% hit)`), writtenPaths.length > 0) A(`[extractMemories] memories saved: ${writtenPaths.join(", ")}`);else A("[extractMemories] no memories saved this run");
      let memoryPaths = writtenPaths.filter((p: any) => Tsl.basename(p) !== gE),
        teamCount = zn(memoryPaths, Zfe);
      if (W("tengu_extract_memories_extraction", {
        input_tokens: agentResult.totalUsage.input_tokens,
        output_tokens: agentResult.totalUsage.output_tokens,
        cache_read_input_tokens: agentResult.totalUsage.cache_read_input_tokens,
        cache_creation_input_tokens: agentResult.totalUsage.cache_creation_input_tokens,
        message_count: newMessageCount,
        turn_count: turnCount,
        files_written: writtenPaths.length,
        memories_saved: memoryPaths.length,
        team_memories_saved: teamCount,
        duration_ms: Date.now() - startTime
      }), A(`[extractMemories] writtenPaths=${writtenPaths.length} memoryPaths=${memoryPaths.length} appendSystemMessage defined=${appendSystemMessage != null}`), memoryPaths.length > 0) {
        let sysMessage = SWn(memoryPaths);
        sysMessage.teamCount = teamCount, appendSystemMessage?.(sysMessage);
      }
      He("memory_extract");
    } catch (err) {
      A(`[extractMemories] error: ${err}`), W("tengu_extract_memories_error", {
        duration_ms: Date.now() - startTime
      }), xe("memory_extract", "agent_error");
    } finally {
      isExtracting = !1;
      let stashed = stashedRun;
      if (stashedRun = void 0, stashed && runEvery <= 1) A("[extractMemories] running trailing extraction for stashed context"), await runExtraction({
        context: stashed.context,
        appendSystemMessage: stashed.appendSystemMessage,
        isTrailingRun: !0
      });
    }
  }
  async function maybeExtract(ctx: any, appendSystemMessage: any): Promise<any> {
    if (ctx.toolUseContext.agentId) return;
    if (!it("tengu_passport_quail", !1)) return;
    if (!Kc()) return;
    if (Nu() !== null) return;
    if (isExtracting) {
      A("[extractMemories] extraction in progress — stashing for trailing run"), W("tengu_extract_memories_coalesced", {}), stashedRun = {
        context: ctx,
        appendSystemMessage: appendSystemMessage
      };
      return;
    }
    await runExtraction({
      context: ctx,
      appendSystemMessage: appendSystemMessage
    });
  }
  bsl = async (ctx: any, appendSystemMessage: any) => {
    let run = maybeExtract(ctx, appendSystemMessage);
    pendingRuns.add(run);
    try {
      await run;
    } finally {
      pendingRuns.delete(run);
    }
  }, Esl = async (timeoutMs: any = 60000) => {
    if (pendingRuns.size === 0) return;
    await Promise.race([Promise.all(pendingRuns).catch(() => {}), new Promise((resolve: any) => setTimeout(resolve, timeoutMs).unref())]);
  };
}
async function executeExtractMemories(ctx: any, appendSystemMessage: any): Promise<any> {
  await bsl?.(ctx, appendSystemMessage);
}
async function drainPendingExtraction(timeoutMs: any): Promise<any> {
  await Esl(timeoutMs);
}
var Tsl,
  gsl = 3,
  bsl = null,
  Esl = async () => {};
var r5t = b(() => {
  lt();
  jSo();
  Jm();
  cO();
  Wu();
  ry();
  dm();
  dw();
  ow();
  XR();
  $A();
  lh();
  nee();
  qe();
  ID();
  po();
  Xm();
  Zm();
  mn();
  jn();
  kt();
  vu();
  _Wn();
  hsl();
  Tsl = require("path");
});

export {TWn,YSo,nGp,rGp,_sl,ysl,oGp,t5t,sGp,iGp,isAllowedAutoMemWritePath,createAutoMemCanUseTool,Ssl,aGp,initExtractMemories,executeExtractMemories,drainPendingExtraction,Tsl,gsl,bsl,Esl,r5t};
