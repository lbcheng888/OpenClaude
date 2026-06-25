// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {yw,jz} from "../config/2716_jz.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {I$e,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {n5n,E_o} from "../core/4260_kind.ts";
import {OP,YL} from "../../vendor/m123.ts";
import {k3,Q5,Ph} from "./1459_agentType.ts";
import {Xpt,hS} from "./4362_toolUseCount.ts";
import {mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {FORK_AGENT as m$,buildChildMessage as bMt,Tke} from "../permissions/2718_isInForkChild.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {pte,tce} from "../permissions/3892_permissionMode.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {H3,Op} from "./1464_waitForTeammatesToBecomeIdle.ts";
import {E6e,_Y} from "../permissions/3988_toolName.ts";
import {Q$,fye} from "../permissions/4104_clients.ts";
import {Mn,po} from "../tools/5224_userPromptCount.ts";
import {TIe,aat} from "../../vendor/m3329.ts";
import {ux,CG} from "./5206_len.ts";
import {Fq,Nqe} from "../telemetry/3894_mainThreadAgentDefinition.ts";
var Dul = {};
ft(Dul, {
  spawnForkFromDirective: () => spawnForkFromDirective,
  deriveForkName: () => deriveForkName
});
/**
 * Spawn an asynchronous "fork" subagent from a directive prompt.
 * @param prompt the user/directive prompt text driving the fork
 * @param toolUseCtx the tool-use context (options, messages, lifecycle, registry, ...)
 * @param canUseTool permission predicate for tool usage in the fork
 * @param extraMessages optional messages prepended to the fork's prompt messages
 * @returns { agentId, name } of the launched fork, or null if it cannot launch
 */
async function spawnForkFromDirective(prompt, toolUseCtx, canUseTool, extraMessages) {
  if (yw()) return xe("subagent_launch", "subagent_fork_coordinator_mode"), null;
  let systemPrompt = toolUseCtx.renderedSystemPrompt;
  if (!systemPrompt) {
    if (systemPrompt = await buildForkSystemPrompt(toolUseCtx), !systemPrompt) return xe("subagent_launch", "subagent_fork_prompt_missing"), null;
  }
  let replHydration = {
      kind: "fork",
      log: (() => {
        let agentId = toolUseCtx.agentId ?? I$e,
          replayLog = toolUseCtx.getReplContexts()[agentId]?.replayLog;
        if (replayLog) return [...replayLog];
        if (toolUseCtx.replHydration?.kind === "resume") return n5n(toolUseCtx.messages);
        return [];
      })()
    },
    forkName = deriveForkName(prompt),
    description = prompt.length > 50 ? prompt.slice(0, 49) + "…" : prompt,
    agentId = OP(forkName),
    {
      taskRegistry: taskRegistry
    } = toolUseCtx,
    startTime = Date.now(),
    spawnDepth = k3(toolUseCtx.agentContext) + 1,
    task = Xpt({
      agentId: agentId,
      ownerAgentId: rs(),
      spawnDepth: spawnDepth,
      description: description,
      prompt: prompt,
      selectedAgent: m$,
      taskRegistry: taskRegistry,
      toolUseId: toolUseCtx.toolUseId
    }),
    abortController = task.abortController;
  toolUseCtx.agentLifecycle.registerName(forkName, cd(agentId));
  let metadata = {
      prompt: prompt,
      resolvedAgentModel: pte(m$.model, toolUseCtx.options.mainLoopModel, void 0, Mr(toolUseCtx).mode),
      isBuiltInAgent: !0,
      startTime: startTime,
      agentType: m$.agentType,
      isAsync: !0,
      agentDepth: spawnDepth,
      source: m$.source
    },
    agentContext = {
      agentId: agentId,
      parentAgentId: toolUseCtx.agentId,
      depth: spawnDepth,
      parentSessionId: H3(),
      agentType: "subagent",
      subagentName: m$.agentType,
      displayName: forkName,
      isAsync: !0,
      isBuiltIn: !0,
      invocationKind: "spawn",
      invocationEmitted: !1
    };
  return Q5(agentContext, () => E6e({
    taskId: task.agentId,
    abortController: abortController,
    makeStream: (onCacheSafeParams, onQueryProgress) => Q$({
      onQueryProgress: onQueryProgress,
      agentDefinition: m$,
      promptMessages: [...(extraMessages ?? []), Mn({
        content: [{
          type: "text",
          text: bMt(prompt)
        }]
      })],
      toolUseContext: toolUseCtx,
      canUseTool: canUseTool,
      isAsync: !0,
      querySource: TIe(m$.agentType, !0),
      spawnedBySkill: toolUseCtx.options.spawnedBySkill ?? toolUseCtx.options.activeSkill,
      model: void 0,
      override: {
        systemPrompt: systemPrompt,
        agentId: cd(task.agentId),
        agentContext: agentContext,
        abortController: abortController,
        replHydration: replHydration
      },
      availableTools: toolUseCtx.options.tools,
      forkContextMessages: toolUseCtx.messages,
      useExactTools: !0,
      onCacheSafeParams: onCacheSafeParams,
      description: description,
      name: forkName
    }),
    metadata: metadata,
    description: description,
    toolUseContext: toolUseCtx,
    taskRegistry: taskRegistry,
    agentIdForCleanup: agentId,
    enableSummarization: !0,
    getWorktreeResult: async () => ({})
  })), He("subagent_launch"), {
    agentId: agentId,
    name: forkName
  };
}
/**
 * Build the system prompt for a fork subagent when none was pre-rendered.
 * Resolves the active main-thread agent definition and the default tool prompt.
 */
async function buildForkSystemPrompt(toolUseCtx) {
  let appState = toolUseCtx.getAppState(),
    mainThreadAgentDef = appState.agent ? appState.agentDefinitions.activeAgents.find(agentDef => agentDef.agentType === appState.agent) : void 0,
    additionalWorkingDirs = Array.from(Mr(toolUseCtx).additionalWorkingDirectories.keys()),
    defaultSystemPrompt = await ux(toolUseCtx.options.tools, toolUseCtx.options.mainLoopModel, additionalWorkingDirs);
  return Fq({
    mainThreadAgentDefinition: mainThreadAgentDef,
    toolUseContext: toolUseCtx,
    customSystemPrompt: toolUseCtx.options.customSystemPrompt,
    defaultSystemPrompt: defaultSystemPrompt,
    appendSystemPrompt: toolUseCtx.options.appendSystemPrompt
  });
}
/**
 * Derive a short, slug-like fork name from a prompt (max 3 words, 24 chars).
 * Falls back to "fork" when nothing usable remains.
 */
function deriveForkName(prompt) {
  return prompt.trim().split(/\s+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "fork";
}
var pCo = b(() => {
  lt();
  CG();
  jz();
  mn();
  hS();
  xS();
  Ph();
  xl();
  po();
  tce();
  aat();
  Nqe();
  Op();
  YL();
  $A();
  E_o();
  _Y();
  Tke();
  fye();
});
export {Dul,spawnForkFromDirective,buildForkSystemPrompt as pjp,deriveForkName,pCo};
