// @ts-nocheck
import {hP as Ok,qf as Qz,ry as lw} from "../agent/2772_withFileTypes.ts";
import {jp as pO,jt as Q_,ws as M9} from "../../vendor/m228.ts";
import {JKn as wd6,XMl as JL4,XKn as fd6,U5t as sU_,QKn as jd6} from "../tools/5149_alwaysLoad.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Ln as U6,vPe as CRH,lo as zq} from "../tools/5190_userPromptCount.ts";
import {Jl as Z4,ch as OY} from "../../vendor/m2727.ts";
import {xP as WV,QHe as W0H} from "../../vendor/m3908.ts";
import {Wc as Q1} from "../api/3868_level.ts";
import {bf as gz,aq as Qg} from "../tools/2698_allErrors.ts";
import {getSmallFastModel as PW,Mo as iq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Rm as PT,zE as ZM} from "../../vendor/m125.ts";
import {caughtError as cB,u_e as $AH} from "../permissions/4401_content.ts";
import {hasPermissionsToUseTool as MZ,ay as aw} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {_qe as PmH,x9 as tx} from "../../vendor/m4033.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {createAttachmentMessage as w7,Bv as $2} from "../agent/4429_tryGetPDFReference.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {Lc as o1,Ri as M7} from "../tools/2227_userFacingName.ts";
import {DRe as GPH} from "../../vendor/m2701.ts";
import {Cs as G9,Ph as KA} from "../../vendor/m2224.ts";
import {b as L} from "../../runtime.ts";
import {Y0 as uL} from "../artifact/4303_Y0.ts";
/*
 * session/5130_content.ts - session/transcript restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
async function WL4(hook: any, hookName: any, hookEvent: any, K: any, O: any, T: any, z: any, agentName: any): Promise<any> {
  let toolUseID = z || `hook-${F2q.randomUUID()}`,
    A = T.agentId ? Ok(T.agentId) : Qz(),
    w = pO(Q_(), A).resolvedPath,
    f = Date.now();
  try {
    let content = wd6(hook.prompt, K);
    N(`Hooks: Processing agent hook with prompt: ${content}`);
    let messages = [U6({
      content: content
    })];
    N(`Hooks: Starting agent query with ${messages.length} messages`);
    let timeoutMs = hook.timeout ? hook.timeout * 1000 : 60000,
      abortController = Z4(),
      {
        signal: signal,
        cleanup: cleanup
      } = WV(O, {
        timeoutMs: timeoutMs
      }),
      W = (): any => abortController.abort();
    signal.addEventListener("abort", W);
    let G = abortController.signal;
    try {
      let R = JL4(),
        tools = [...i5T(T.options.tools), R],
        E = hookEvent === "Stop" || hookEvent === "SubagentStop" ? "You are verifying a stop condition in Claude Code. Your task is to verify that the agent completed the given plan." : `You are evaluating a ${hookEvent} hook in Claude Code. Your task is to evaluate the condition described in the user message.`,
        systemPrompt = Q1([`${E} The conversation transcript is available at: ${w}
You can read this file to analyze the conversation history if needed.

Use the available tools to inspect the codebase and verify the condition.
Use as few steps as possible - be efficient and direct.

When done, return your result using the ${gz} tool with:
- ok: true if the condition is met
- ok: false with reason if the condition is not met`]),
        mainLoopModel = hook.model ?? PW(),
        S = 50,
        agentId = PT(`${Jd6}${F2q.randomUUID()}`),
        toolUseContext = {
          ...T,
          agentId: agentId,
          abortController: abortController,
          options: {
            ...T.options,
            tools: tools,
            mainLoopModel: mainLoopModel,
            isNonInteractiveSession: !0,
            thinkingConfig: {
              type: "disabled"
            },
            activeMcpServer: void 0,
            activeMcpTool: void 0,
            refreshTools: void 0,
            refreshMcpClients: void 0
          },
          getAppState(): any {
            let F = T.getAppState(),
              Q = F.toolPermissionContext.alwaysAllowRules.session ?? [];
            return {
              ...F,
              toolPermissionContext: {
                ...F.toolPermissionContext,
                mode: "dontAsk",
                alwaysAllowRules: {
                  ...F.toolPermissionContext.alwaysAllowRules,
                  session: [...Q, `Read(/${w})`]
                }
              }
            };
          }
        };
      fd6(T.setAppState, agentId);
      let b = null,
        turnCount = 0,
        U = !1;
      for await (let F of cB({
        messages: messages,
        systemPrompt: systemPrompt,
        userContext: {},
        systemContext: {},
        canUseTool: MZ,
        toolUseContext: toolUseContext,
        querySource: "hook_agent"
      })) {
        if (CRH(F, {
          onMessage: (): any => {},
          onUpdateLength: (): any => {},
          onSetStreamMode: (): any => {},
          onStreamingToolUses: (): any => {}
        }), F.type === "stream_event" || F.type === "stream_request_start") continue;
        if (F.type === "assistant") {
          if (turnCount++, turnCount >= 50) {
            U = !0, N(`Hooks: Agent turn ${turnCount} hit max turns, aborting`), abortController.abort();
            break;
          }
        }
        if (F.type === "attachment" && F.attachment.type === "structured_output") {
          let Q = sU_().safeParse(F.attachment.data);
          if (Q.success) {
            b = Q.data, N(`Hooks: Got structured output: ${bH(b)}`), abortController.abort();
            break;
          }
        }
      }
      if (signal.removeEventListener("abort", W), cleanup(), PmH(T.setAppState, agentId), !b) {
        if (U) return N("Hooks: Agent hook did not complete within 50 turns"), c("tengu_agent_stop_hook_max_turns", {
          durationMs: Date.now() - f,
          turnCount: turnCount,
          hookEvent: tH(hookEvent),
          agentName: agentName
        }), {
          hook: hook,
          outcome: "cancelled"
        };
        return N("Hooks: Agent hook did not return structured output"), c("tengu_agent_stop_hook_error", {
          durationMs: Date.now() - f,
          turnCount: turnCount,
          errorType: 1,
          hookEvent: tH(hookEvent),
          agentName: agentName
        }), {
          hook: hook,
          outcome: "cancelled"
        };
      }
      if (!b.ok) return N(`Hooks: Agent hook condition was not met: ${b.reason}`), c("tengu_agent_stop_hook_blocking", {
        durationMs: Date.now() - f,
        turnCount: turnCount,
        hookEvent: tH(hookEvent),
        agentName: agentName
      }), {
        hook: hook,
        outcome: "blocking",
        blockingError: {
          blockingError: `Agent hook condition was not met: ${b.reason}`,
          command: hook.prompt
        }
      };
      return N("Hooks: Agent hook condition was met"), c("tengu_agent_stop_hook_success", {
        durationMs: Date.now() - f,
        turnCount: turnCount,
        hookEvent: tH(hookEvent),
        agentName: agentName
      }), {
        hook: hook,
        outcome: "success",
        message: w7({
          type: "hook_success",
          hookName: hookName,
          toolUseID: toolUseID,
          hookEvent: hookEvent,
          content: ""
        })
      };
    } catch (R) {
      if (signal.removeEventListener("abort", W), cleanup(), G.aborted) return {
        hook: hook,
        outcome: "cancelled"
      };
      throw R;
    }
  } catch (j) {
    let J = GH(j);
    return N(`Hooks: Agent hook error: ${J}`), c("tengu_agent_stop_hook_error", {
      durationMs: Date.now() - f,
      errorType: 2,
      hookEvent: tH(hookEvent),
      agentName: agentName
    }), {
      hook: hook,
      outcome: "non_blocking_error",
      message: w7({
        type: "hook_non_blocking_error",
        hookName: hookName,
        toolUseID: toolUseID,
        hookEvent: hookEvent,
        stderr: `Error executing agent hook: ${J}`,
        stdout: "",
        exitCode: 1
      })
    };
  }
}
function i5T(H: any): any {
  return H.filter((_: any): any => !o1(_, gz) && !GPH.has(_.name) && !o1(_, G9));
}
var F2q,
  Jd6 = "hook-agent-";
var ZL4 = L((): any => {
  $AH();
  y_();
  M7();
  KA();
  Qg();
  uL();
  ZM();
  OY();
  $2();
  W0H();
  FH();
  L_();
  M9();
  zq();
  iq();
  aw();
  lw();
  H6();
  jd6();
  tx();
  F2q = require("crypto");
});

export {WL4 as n1l,i5T as V_m,F2q as RHo,Jd6 as ZKn,ZL4 as r1l};
