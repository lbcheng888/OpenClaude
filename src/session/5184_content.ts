// @ts-nocheck
import {jk,Nm,D_} from "../agent/2784_withFileTypes.ts";
import {Nd,Wt,ps} from "../../vendor/m230.ts";
import {KXn,L3l,hKt,UOo} from "../tools/5182_alwaysLoad.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Mn,COe,po} from "../tools/5224_userPromptCount.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {zD,lxe} from "../../vendor/m3979.ts";
import {vc} from "../api/3886_level.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {getSmallFastModel as xR,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {jq,xye} from "../permissions/4423_content.ts";
import {hasPermissionsToUseTool as lx,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {createAttachmentMessage as ti,GA} from "../agent/4451_tryGetPDFReference.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {Gl,ri} from "../tools/2235_userFacingName.ts";
import {gke} from "../../vendor/m2713.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {b} from "../../runtime.ts";
import {cx} from "../artifact/4323_cx.ts";
/**
 * session/5184_content.ts - agent-hook evaluation for Claude Code hooks.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 *
 * U3l runs an "agent hook": it spawns a sub-agent query (jq) with a structured-output
 * tool, lets the agent inspect the transcript/codebase, and turns the returned
 * { ok, reason } verdict into a hook outcome (success / blocking / cancelled / error).
 */
async function U3l(hook: any, hookName: any, hookEvent: any, K: any, O: any, T: any, z: any, agentName: any): Promise<any> {
  let toolUseID = z || `hook-${$Oo.randomUUID()}`,
    agentId = T.agentId ? jk(T.agentId) : Nm(),
    transcriptPath = Nd(Wt(), agentId).resolvedPath,
    startTime = Date.now();
  try {
    let content = KXn(hook.prompt, K);
    A(`Hooks: Processing agent hook with prompt: ${content}`);
    let messages = [Mn({
      content: content
    })];
    A(`Hooks: Starting agent query with ${messages.length} messages`);
    let timeoutMs = hook.timeout ? hook.timeout * 1000 : 60000,
      abortController = kl(),
      {
        signal: signal,
        cleanup: cleanup
      } = zD(O, {
        timeoutMs: timeoutMs
      }),
      onAbort = (): any => abortController.abort();
    signal.addEventListener("abort", onAbort);
    let childSignal = abortController.signal;
    try {
      let structuredOutputTool = L3l(),
        tools = [...hkm(T.options.tools), structuredOutputTool],
        roleText = hookEvent === "Stop" || hookEvent === "SubagentStop" ? "You are verifying a stop condition in Claude Code. Your task is to verify that the agent completed the given plan." : `You are evaluating a ${hookEvent} hook in Claude Code. Your task is to evaluate the condition described in the user message.`,
        systemPrompt = vc([`${roleText} The conversation transcript is available at: ${transcriptPath}
You can read this file to analyze the conversation history if needed.

Use the available tools to inspect the codebase and verify the condition.
Use as few steps as possible - be efficient and direct.

When done, return your result using the ${Rp} tool with:
- ok: true if the condition is met
- ok: false with reason if the condition is not met`]),
        mainLoopModel = hook.model ?? xR(),
        maxTurns = 50,
        childAgentId = cd(`${zXn}${$Oo.randomUUID()}`),
        toolUseContext = {
          ...T,
          agentId: childAgentId,
          abortController: abortController,
          options: {
            ...T.options,
            tools: tools,
            mainLoopModel: mainLoopModel,
            isNonInteractiveSession: !0,
            requiresStructuredOutput: !0,
            thinkingConfig: {
              type: "disabled"
            },
            activeMcpServer: void 0,
            activeMcpTool: void 0,
            refreshTools: void 0,
            refreshMcpClients: void 0
          },
          getAppState(): any {
            let appState = T.getAppState(),
              sessionRules = appState.toolPermissionContext.alwaysAllowRules.session ?? [];
            return {
              ...appState,
              toolPermissionContext: {
                ...appState.toolPermissionContext,
                mode: "dontAsk",
                alwaysAllowRules: {
                  ...appState.toolPermissionContext.alwaysAllowRules,
                  session: [...sessionRules, `Read(/${transcriptPath})`]
                }
              }
            };
          }
        },
        structuredResult = null,
        turnCount = 0,
        hitMaxTurns = !1;
      for await (let message of jq({
        messages: messages,
        systemPrompt: systemPrompt,
        userContext: {},
        systemContext: {},
        canUseTool: lx,
        toolUseContext: toolUseContext,
        querySource: "hook_agent"
      })) {
        if (COe(message, {
          onMessage: (): any => {},
          onUpdateLength: (): any => {},
          onSetStreamMode: (): any => {},
          onStreamingToolUses: (): any => {}
        }), message.type === "stream_event" || message.type === "stream_request_start") continue;
        if (message.type === "assistant") {
          if (turnCount++, turnCount >= 50) {
            hitMaxTurns = !0, A(`Hooks: Agent turn ${turnCount} hit max turns, aborting`), abortController.abort();
            break;
          }
        }
        if (message.type === "attachment" && message.attachment.type === "structured_output") {
          let parsed = hKt().safeParse(message.attachment.data);
          if (parsed.success) {
            structuredResult = parsed.data, A(`Hooks: Got structured output: ${Pe(structuredResult)}`), abortController.abort();
            break;
          }
        }
      }
      if (signal.removeEventListener("abort", onAbort), cleanup(), !structuredResult) {
        if (hitMaxTurns) return A("Hooks: Agent hook did not complete within 50 turns"), W("tengu_agent_stop_hook_max_turns", {
          durationMs: Date.now() - startTime,
          turnCount: turnCount,
          hookEvent: Le(hookEvent),
          agentName: agentName
        }), {
          hook: hook,
          outcome: "cancelled"
        };
        return A("Hooks: Agent hook did not return structured output"), W("tengu_agent_stop_hook_error", {
          durationMs: Date.now() - startTime,
          turnCount: turnCount,
          errorType: 1,
          hookEvent: Le(hookEvent),
          agentName: agentName
        }), {
          hook: hook,
          outcome: "cancelled"
        };
      }
      if (!structuredResult.ok) return A(`Hooks: Agent hook condition was not met: ${structuredResult.reason}`), W("tengu_agent_stop_hook_blocking", {
        durationMs: Date.now() - startTime,
        turnCount: turnCount,
        hookEvent: Le(hookEvent),
        agentName: agentName
      }), {
        hook: hook,
        outcome: "blocking",
        blockingError: {
          blockingError: `Agent hook condition was not met: ${structuredResult.reason}`,
          command: hook.prompt
        }
      };
      return A("Hooks: Agent hook condition was met"), W("tengu_agent_stop_hook_success", {
        durationMs: Date.now() - startTime,
        turnCount: turnCount,
        hookEvent: Le(hookEvent),
        agentName: agentName
      }), {
        hook: hook,
        outcome: "success",
        message: ti({
          type: "hook_success",
          hookName: hookName,
          toolUseID: toolUseID,
          hookEvent: hookEvent,
          content: ""
        })
      };
    } catch (err) {
      if (signal.removeEventListener("abort", onAbort), cleanup(), childSignal.aborted) return {
        hook: hook,
        outcome: "cancelled"
      };
      throw err;
    }
  } catch (err) {
    let errorMessage = Ce(err);
    return A(`Hooks: Agent hook error: ${errorMessage}`), W("tengu_agent_stop_hook_error", {
      durationMs: Date.now() - startTime,
      errorType: 2,
      hookEvent: Le(hookEvent),
      agentName: agentName
    }), {
      hook: hook,
      outcome: "non_blocking_error",
      message: ti({
        type: "hook_non_blocking_error",
        hookName: hookName,
        toolUseID: toolUseID,
        hookEvent: hookEvent,
        stderr: `Error executing agent hook: ${errorMessage}`,
        stdout: "",
        exitCode: 1
      })
    };
  }
}
/**
 * Filters the available tool set for the hook sub-agent: removes the structured-output
 * tool (Rp), any tools blocklisted by name (gke), and the agent-spawn tool (ls), so the
 * hook agent cannot recurse into itself.
 */
function hkm(toolList: any): any {
  return toolList.filter(tool => !Gl(tool, Rp) && !gke.has(tool.name) && !Gl(tool, ls));
}
var $Oo,
  zXn = "hook-agent-";
var $3l = b((): any => {
  xye();
  kt();
  ri();
  fg();
  MO();
  cx();
  xS();
  lh();
  GA();
  lxe();
  qe();
  Ct();
  ps();
  po();
  Ro();
  ly();
  D_();
  tn();
  UOo();
  $Oo = require("crypto");
});

export {U3l,hkm,$Oo,zXn,$3l};
