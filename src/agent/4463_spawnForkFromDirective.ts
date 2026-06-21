// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {ix as rx,Sz as sz} from "../config/2704_Sz.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {C2e as t2e,Lv as Hv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {K3n as l3n,wpo as Tdo} from "../core/4242_kind.ts";
import {mO as gF,MM as _F} from "../../vendor/m126.ts";
import {POWERSHELL_TOOL_NAME as P7,B8 as T8,S_ as y_} from "./1454_agentType.ts";
import {Yut as Eut,RE as HC} from "./4342_toolUseCount.ts";
import {mainAgentId as ws,lt as ct} from "../session/0131_sent.ts";
import {FORK_AGENT as P$,buildChildMessage as yPt,LRe as _Re} from "../permissions/2706_isInForkChild.ts";
import {Rm as Dm,zE as jE} from "../../vendor/m125.ts";
import {gte as ite,sce as zle} from "../permissions/3874_permissionMode.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {u4 as X3,Am as Sf} from "./1459_waitForTeammatesToBecomeIdle.ts";
import {j4e as S4e,FY as CY} from "../permissions/3921_toolName.ts";
import {k9 as A9,Yge as Dge} from "../permissions/4040_clients.ts";
import {Ln,lo} from "../tools/5190_userPromptCount.ts";
import {Dke as Ake,lst as qot} from "../../vendor/m3313.ts";
import {J0 as z0,oG as FW} from "./5173_len.ts";
import {E6 as d6,T4e as Y3e} from "../telemetry/3876_mainThreadAgentDefinition.ts";
// @ts-nocheck
var qtK = {};
pt(qtK, {
  spawnForkFromDirective: () => spawnForkFromDirective,
  deriveForkName: () => deriveForkName
});
async function spawnForkFromDirective(prompt, toolUseCtx, canUseTool, extraMessages) {
  if (rx()) return Pe("subagent_launch", "subagent_fork_coordinator_mode"), null;
  let systemPrompt = toolUseCtx.renderedSystemPrompt;
  if (!systemPrompt) {
    if (systemPrompt = await buildForkSystemPrompt(toolUseCtx), !systemPrompt) return Pe("subagent_launch", "subagent_fork_prompt_missing"), null;
  }
  let replHydration = {
      kind: "fork",
      log: (() => {
        let agentId = toolUseCtx.agentId ?? t2e,
          replayLog = toolUseCtx.getReplContexts()[agentId]?.replayLog;
        if (replayLog) return [...replayLog];
        if (toolUseCtx.replHydration?.kind === "resume") return l3n(toolUseCtx.messages);
        return [];
      })()
    },
    forkName = deriveForkName(prompt),
    description = prompt.length > 50 ? prompt.slice(0, 49) + "\u2026" : prompt,
    agentId = gF(forkName),
    {
      taskRegistry: taskRegistry
    } = toolUseCtx,
    startTime = Date.now(),
    task = P7(toolUseCtx.agentContext),
    abortController = Eut({
      agentId: agentId,
      ownerAgentId: ws(),
      spawnDepth: task,
      description: description,
      prompt: prompt,
      selectedAgent: P$,
      taskRegistry: taskRegistry,
      toolUseId: toolUseCtx.toolUseId
    }),
    J = abortController.abortController;
  toolUseCtx.agentLifecycle.registerName(forkName, Dm(agentId));
  let D = {
      prompt: prompt,
      resolvedAgentModel: ite(P$.model, toolUseCtx.options.mainLoopModel, undefined, Lr(toolUseCtx).mode),
      isBuiltInAgent: true,
      startTime: startTime,
      agentType: P$.agentType,
      isAsync: true,
      agentDepth: task,
      source: P$.source
    },
    A = {
      agentId: agentId,
      parentAgentId: toolUseCtx.agentId,
      depth: task,
      parentSessionId: X3(),
      agentType: "subagent",
      subagentName: P$.agentType,
      isBuiltIn: true,
      invocationKind: "spawn",
      invocationEmitted: false
    };
  return T8(A, () => S4e({
    taskId: abortController.agentId,
    abortController: J,
    makeStream: (h, g) => A9({
      onQueryProgress: g,
      agentDefinition: P$,
      promptMessages: [...(extraMessages ?? []), Ln({
        content: [{
          type: "text",
          text: yPt(prompt)
        }]
      })],
      toolUseContext: toolUseCtx,
      canUseTool: canUseTool,
      isAsync: true,
      querySource: Ake(P$.agentType, true),
      spawnedBySkill: toolUseCtx.options.spawnedBySkill ?? toolUseCtx.options.activeSkill,
      model: undefined,
      override: {
        systemPrompt: systemPrompt,
        agentId: Dm(abortController.agentId),
        agentContext: A,
        abortController: J,
        replHydration: replHydration
      },
      availableTools: toolUseCtx.options.tools,
      forkContextMessages: toolUseCtx.messages,
      useExactTools: true,
      onCacheSafeParams: h,
      description: description,
      name: forkName
    }),
    metadata: D,
    description: description,
    toolUseContext: toolUseCtx,
    taskRegistry: taskRegistry,
    agentIdForCleanup: agentId,
    enableSummarization: true,
    getWorktreeResult: async () => ({})
  })), He("subagent_launch"), {
    agentId: agentId,
    name: forkName
  };
}
async function buildForkSystemPrompt(toolUseCtx) {
  let appState = toolUseCtx.getAppState(),
    mainThreadAgentDef = appState.agent ? appState.agentDefinitions.activeAgents.find(agentDef => agentDef.agentType === appState.agent) : undefined,
    additionalWorkingDirs = Array.from(Lr(toolUseCtx).additionalWorkingDirectories.keys()),
    defaultSystemPrompt = await z0(toolUseCtx.options.tools, toolUseCtx.options.mainLoopModel, additionalWorkingDirs);
  return d6({
    mainThreadAgentDefinition: mainThreadAgentDef,
    toolUseContext: toolUseCtx,
    customSystemPrompt: toolUseCtx.options.customSystemPrompt,
    defaultSystemPrompt: defaultSystemPrompt,
    appendSystemPrompt: toolUseCtx.options.appendSystemPrompt
  });
}
function deriveForkName(prompt) {
  return prompt.trim().split(/\s+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "fork";
}
var qzq = b(() => {
  ct();
  FW();
  sz();
  cn();
  HC();
  jE();
  y_();
  Xl();
  lo();
  zle();
  qot();
  Y3e();
  Sf();
  _F();
  Hv();
  Tdo();
  CY();
  _Re();
  Dge();
});

export {qtK as Vrl,spawnForkFromDirective,buildForkSystemPrompt as x6p,deriveForkName,qzq as g_o};
