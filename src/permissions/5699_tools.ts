// @ts-nocheck
import {J0 as z0,I6n as qqn,oG as FW} from "../agent/5173_len.ts";
import {pS as sS,hE as mE,dq as X4} from "../config/2722_duration_ms.ts";
import {getRuntimeMainLoopModel as a0,getMainLoopModel as Ns,Mo as Fo} from "./1453_swapShrinksContextWindow.ts";
import {Wc as jc} from "../api/3868_level.ts";
import {uh as Lh,sA as uA} from "../../vendor/m2782.ts";
import {Af as yf,S_ as y_} from "../agent/1454_agentType.ts";
import {Rse as gse,isFastModeEligible as g1} from "../telemetry/2027_word.ts";
import {Jl as Yl,ch as uh} from "../../vendor/m2727.ts";
import {LP as OP,MY as bY} from "../agent/4311_register.ts";
import {yqe as X4e,x9 as f9} from "../../vendor/m4033.ts";
import {R5e as i5e} from "../telemetry/5617_t.ts";
import {makeSetWebBrowserSlice as uke} from "../../vendor/m3301.ts";
import {makeSetArtifactReadVersion as wIe,qqe as Sqe} from "../artifact/4153_publishArtifact.ts";
import {Zje as Pje,Jmt as wmt} from "../../vendor/m4818.ts";
import {e8e as Oje,Xmt as Rmt} from "../../vendor/m4820.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function buildPromptContexts({
  tools: H,
  mainLoopModel: _,
  additionalWorkingDirectories: q,
  customSystemPrompt: K,
  excludeDynamicSections: O,
  cacheBreakerPhrase: T
}) {
  let [z, $, Y, A] = await Promise.all([K !== undefined ? Promise.resolve([]) : z0(H, _, q, {
    excludeDynamicSections: O
  }), sS(), K !== undefined ? Promise.resolve({}) : mE(T), O && K === undefined ? qqn(_, q) : Promise.resolve({})]);
  if (O) return {
    defaultSystemPrompt: z,
    userContext: {
      ...Y,
      ...$,
      ...A
    },
    systemContext: {}
  };
  return {
    defaultSystemPrompt: z,
    userContext: $,
    systemContext: Y
  };
}
async function buildToolUseContext({
  tools: H,
  commands: __2,
  mcpClients: q,
  messages: K,
  readFileState: O,
  getAppState: T_2,
  setAppState: z,
  customSystemPrompt: $,
  appendSystemPrompt: Y,
  excludeDynamicSections: A_2,
  thinkingConfig: w,
  agents: f_2
}) {
  let j = T_2(),
    J = a0({
      permissionMode: j.toolPermissionContext.mode,
      mainLoopModel: Ns()
    }),
    {
      defaultSystemPrompt: D,
      userContext: M,
      systemContext: X
    } = await buildPromptContexts({
      tools: H,
      mainLoopModel: J,
      additionalWorkingDirectories: Array.from(j.toolPermissionContext.additionalWorkingDirectories.keys()),
      customSystemPrompt: $,
      excludeDynamicSections: A_2,
      cacheBreakerPhrase: j.cacheBreakerPhrase
    }),
    P = jc([...(typeof $ === "string" ? [$] : Array.isArray($) ? $ : D), ...(Y ? [Y] : [])]),
    Z = K.at(-1),
    W = Z?.type === "assistant" && Z.message.stop_reason === null ? K.slice(0, -1) : K,
    G = {
      messageQueue: Lh,
      agentContext: yf(),
      options: {
        commands: __2,
        debug: false,
        mainLoopModel: J,
        tools: H,
        verbose: false,
        thinkingConfig: w ?? (gse() !== false ? {
          type: "adaptive"
        } : {
          type: "disabled"
        }),
        mcpClients: q,
        mcpResources: {},
        isNonInteractiveSession: true,
        agentDefinitions: {
          activeAgents: f_2,
          allAgents: []
        },
        customSystemPrompt: $,
        appendSystemPrompt: Y,
        autoCompactWindow: j.autoCompactWindow,
        fastMode: j.fastMode,
        cacheBreakerPhrase: j.cacheBreakerPhrase
      },
      abortController: Yl(),
      readFileState: O,
      getAppState: T_2,
      setAppState: z,
      getMcp: () => T_2().mcp,
      getWebBrowser: () => T_2().webBrowser,
      setToolPermissionContext: S => z(C => {
        let R = typeof S === "function" ? S(C.toolPermissionContext) : S;
        return C.toolPermissionContext === R ? C : {
          ...C,
          toolPermissionContext: R
        };
      }),
      taskRegistry: OP(T_2, z),
      sessionHooksRegistry: X4e(z),
      getReplContexts: () => T_2().replContexts,
      setReplContext: i5e(z),
      setWebBrowserSlice: uke(z),
      setArtifactReadVersion: wIe(z),
      agentLifecycle: Pje(T_2, z),
      teammateColors: Oje(T_2, z),
      messages: W,
      turnStartIndex: 0,
      getFileHistoryState: () => {
        return;
      },
      applyFileHistoryOp: () => {},
      applyAttributionOp: () => {}
    };
  return {
    systemPrompt: P,
    userContext: M,
    systemContext: X,
    toolUseContext: G,
    forkContextMessages: W
  };
}
var initToolUseContextBuilder = b(() => {
  FW();
  X4();
  Sqe();
  uh();
  y_();
  wmt();
  f9();
  uA();
  Fo();
  Rmt();
  bY();
  g1();
});

export {buildPromptContexts as aNo,buildToolUseContext as Yac,initToolUseContextBuilder as lNo};
