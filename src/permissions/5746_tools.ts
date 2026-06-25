// @ts-nocheck
import {ux,JWn,CG} from "../agent/5206_len.ts";
import {Py,AE,y$} from "../config/2734_duration_ms.ts";
import {getRuntimeMainLoopModel as w0,getMainLoopModel as gs,Ro} from "./1458_swapShrinksContextWindow.ts";
import {vc} from "../api/3886_level.ts";
import {ch,ef} from "../../vendor/m2794.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {vse,$M} from "../telemetry/2032_word.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {XD,HB} from "../agent/4331_register.ts";
import {j6e,vY} from "../../vendor/m4097.ts";
import {fVe} from "../telemetry/5654_t.ts";
import {makeSetWebBrowserSlice as fIe} from "../../vendor/m3317.ts";
import {makeSetArtifactReadVersion as Lxe,c5e} from "../artifact/4166_publishArtifact.ts";
import {DWe,cgt} from "../../vendor/m4850.ts";
import {PWe,ugt} from "../../vendor/m4852.ts";
import {b} from "../../runtime.ts";
/**
 * Builds the prompt contexts (default system prompt + user/system context blocks)
 * used when assembling a request to the main loop model.
 */
async function buildPromptContexts({
  tools,
  mainLoopModel,
  additionalWorkingDirectories,
  customSystemPrompt,
  excludeDynamicSections,
  cacheBreakerPhrase
}: {
  tools: any;
  mainLoopModel: any;
  additionalWorkingDirectories: any;
  customSystemPrompt: any;
  excludeDynamicSections: any;
  cacheBreakerPhrase: any;
}) {
  let [defaultSystemPrompt, baseUserContext, systemContext, dynamicUserContext] = await Promise.all([customSystemPrompt !== void 0 ? Promise.resolve([]) : ux(tools, mainLoopModel, additionalWorkingDirectories, {
    excludeDynamicSections
  }), Py(), customSystemPrompt !== void 0 ? Promise.resolve({}) : AE(cacheBreakerPhrase), excludeDynamicSections && customSystemPrompt === void 0 ? JWn(mainLoopModel, additionalWorkingDirectories) : Promise.resolve({})]);
  if (excludeDynamicSections) return {
    defaultSystemPrompt,
    userContext: {
      ...systemContext,
      ...baseUserContext,
      ...dynamicUserContext
    },
    systemContext: {}
  };
  return {
    defaultSystemPrompt,
    userContext: baseUserContext,
    systemContext
  };
}
/**
 * Assembles the full tool-use context (system prompt, options, registries,
 * state accessors) for a non-interactive agent turn.
 */
async function buildToolUseContext({
  tools,
  commands,
  mcpClients,
  messages,
  readFileState,
  getAppState,
  setAppState,
  customSystemPrompt,
  appendSystemPrompt,
  excludeDynamicSections,
  thinkingConfig,
  agents
}: {
  tools: any;
  commands: any;
  mcpClients: any;
  messages: any;
  readFileState: any;
  getAppState: any;
  setAppState: any;
  customSystemPrompt: any;
  appendSystemPrompt: any;
  excludeDynamicSections: any;
  thinkingConfig: any;
  agents: any;
}) {
  let appState = getAppState(),
    resolvedMainLoopModel = w0({
      permissionMode: appState.toolPermissionContext.mode,
      mainLoopModel: gs()
    }),
    {
      defaultSystemPrompt,
      userContext,
      systemContext
    } = await buildPromptContexts({
      tools,
      mainLoopModel: resolvedMainLoopModel,
      additionalWorkingDirectories: Array.from(appState.toolPermissionContext.additionalWorkingDirectories.keys()),
      customSystemPrompt,
      excludeDynamicSections,
      cacheBreakerPhrase: appState.cacheBreakerPhrase
    }),
    systemPrompt = vc([...(typeof customSystemPrompt === "string" ? [customSystemPrompt] : Array.isArray(customSystemPrompt) ? customSystemPrompt : defaultSystemPrompt), ...(appendSystemPrompt ? [appendSystemPrompt] : [])]),
    lastMessage = messages.at(-1),
    forkContextMessages = lastMessage?.type === "assistant" && lastMessage.message.stop_reason === null ? messages.slice(0, -1) : messages,
    toolUseContext = {
      messageQueue: ch,
      agentContext: Hm(),
      options: {
        commands,
        debug: !1,
        mainLoopModel: resolvedMainLoopModel,
        tools,
        verbose: !1,
        thinkingConfig: thinkingConfig ?? (vse() !== !1 ? {
          type: "adaptive"
        } : {
          type: "disabled"
        }),
        mcpClients,
        mcpResources: {},
        isNonInteractiveSession: !0,
        agentDefinitions: {
          activeAgents: agents,
          allAgents: []
        },
        customSystemPrompt,
        appendSystemPrompt,
        autoCompactWindow: appState.autoCompactWindow,
        fastMode: appState.fastMode,
        cacheBreakerPhrase: appState.cacheBreakerPhrase
      },
      abortController: kl(),
      readFileState,
      getAppState,
      setAppState,
      getMcp: () => getAppState().mcp,
      getWebBrowser: () => getAppState().webBrowser,
      setToolPermissionContext: (update: any) => setAppState((state: any) => {
        let nextPermissionContext = typeof update === "function" ? update(state.toolPermissionContext) : update;
        return state.toolPermissionContext === nextPermissionContext ? state : {
          ...state,
          toolPermissionContext: nextPermissionContext
        };
      }),
      taskRegistry: XD(getAppState, setAppState),
      sessionHooksRegistry: j6e(setAppState),
      getReplContexts: () => getAppState().replContexts,
      setReplContext: fVe(setAppState),
      setWebBrowserSlice: fIe(setAppState),
      setArtifactReadVersion: Lxe(setAppState),
      agentLifecycle: DWe(getAppState, setAppState),
      teammateColors: PWe(getAppState, setAppState),
      rootToolSurface: {
        tools,
        mainLoopModel: resolvedMainLoopModel
      },
      messages: forkContextMessages,
      turnStartIndex: 0,
      getFileHistoryState: () => {
        return;
      },
      applyFileHistoryOp: () => {},
      applyAttributionOp: () => {}
    };
  return {
    systemPrompt,
    userContext,
    systemContext,
    toolUseContext,
    forkContextMessages
  };
}
var initToolUseContextBuilder = b(() => {
  CG();
  y$();
  c5e();
  lh();
  Ph();
  cgt();
  vY();
  ef();
  Ro();
  ugt();
  HB();
  $M();
});

export {buildPromptContexts as X$o,buildToolUseContext as oyc,initToolUseContextBuilder as Q$o};
