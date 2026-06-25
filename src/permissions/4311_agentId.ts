// @ts-nocheck
import {Mr,xl} from "../../vendor/m4427.ts";
import {rc,w5n,Xpt,L9n,hS} from "../agent/4362_toolUseCount.ts";
import {getAgentTranscript as sDe,readAgentMetadata as Pye,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {k3,Q5,Ph} from "../agent/1459_agentType.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {A5n,R5n,B5e} from "../core/4310_inFlight.ts";
import {Dqe,Pqe,lut,Mn,T6e,wG,Kl,po} from "../tools/5224_userPromptCount.ts";
import {Ice,HB} from "../agent/4331_register.ts";
import {gf,wE} from "../../vendor/m5177.ts";
import {Yxn,HI} from "../telemetry/3173_error.ts";
import {FORK_AGENT as m$,isForkSubagentEnabled as Yz,Tke} from "./2718_isInForkChild.ts";
import {wye,n4t} from "../core/4090_agentType.ts";
import {ux,CG} from "../agent/5206_len.ts";
import {Fq,Nqe} from "../telemetry/3894_mainThreadAgentDefinition.ts";
import {pte,tce} from "./3892_permissionMode.ts";
import {yye,Tye} from "../telemetry/3989_agentType.ts";
import {Zk} from "../mcp/3159_scope.ts";
import {FY,cx} from "../artifact/4323_cx.ts";
import {fut,y9t} from "../../vendor/m3890.ts";
import {TIe,aat} from "../../vendor/m3329.ts";
import {isBuiltInAgent as Gh,isPluginAgent as Pce,kg} from "./4476_toAgentInfos.ts";
import {mainAgentId as rs,getSdkAgentProgressSummariesEnabled as Nbe,lt} from "../session/0132_sent.ts";
import {ts,oh} from "../../vendor/m2600.ts";
import {H3,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Npe,Po} from "../../vendor/m638.ts";
import {E6e,_Y} from "./3988_toolName.ts";
import {Q$,fye} from "./4104_clients.ts";
import {isCoordinatorMode as dW,NO} from "./2717_matchSessionMode.ts";
import {b} from "../../runtime.ts";
async function resumeAgentBackground({
  agentId: agentId,
  prompt: prompt,
  promptOrigin: promptOrigin,
  promptIsMeta: promptIsMeta,
  continueInterruptedTurn: continueInterruptedTurn,
  awaitCompletion: awaitCompletion,
  toolUseContext: toolUseContext,
  canUseTool: canUseTool,
  invokingRequestId: invokingRequestId
}) {
  let resumeStartTime = Date.now(),
    appState = toolUseContext.getAppState(),
    permCtx = Mr(toolUseContext),
    {
      taskRegistry: taskRegistry
    } = toolUseContext,
    currentPermMode = permCtx.mode,
    existingTask = taskRegistry.get(agentId);
  if (rc(existingTask)) {
    let didSetResuming = !1;
    if (taskRegistry.update(agentId, task => {
      if (task.status === "running" || task.resuming) return task;
      return didSetResuming = !0, {
        ...task,
        resuming: !0
      };
    }), !didSetResuming) throw new r9(`Agent ${agentId} is already running or being resumed`);
  }
  let clearResumingFlag = () => {
      taskRegistry.update(agentId, task => task.resuming ? {
        ...task,
        resuming: !1
      } : task);
    },
    [diskTranscript, agentMetadata] = await Promise.all([sDe(cd(agentId)), Pye(cd(agentId))]).catch(err => {
      throw xe("subagent_launch", "subagent_resume_setup_read_failed"), clearResumingFlag(), err instanceof r9 ? err : new r9(Ce(err));
    }),
    currentTask = taskRegistry.get(agentId),
    spawnDepth = (rc(currentTask) ? currentTask.spawnDepth : agentMetadata?.spawnDepth) ?? k3(toolUseContext.agentContext) + 1,
    originalStartTime = rc(currentTask) ? currentTask.startTime : resumeStartTime,
    resolvedTranscript = diskTranscript;
  if (!resolvedTranscript) {
    let inMemoryMessages = taskRegistry.getTranscript(agentId)?.messages;
    if (inMemoryMessages && inMemoryMessages.length > 0) A(`[resumeAgentBackground ${agentId}] disk transcript missing; using ${inMemoryMessages.length} in-memory messages mirrored during the run`), resolvedTranscript = {
      messages: inMemoryMessages,
      contentReplacements: []
    };
  }
  if (!resolvedTranscript) throw xe("subagent_launch", "subagent_resume_transcript_missing"), clearResumingFlag(), new r9(`No transcript found for agent ID: ${agentId}`);
  let messagesForResume = continueInterruptedTurn ? [...A5n(resolvedTranscript.messages)] : resolvedTranscript.messages,
    restoredMessages = Dqe(Pqe(lut(messagesForResume)));
  if (continueInterruptedTurn && restoredMessages.length > 0 && !R5n(restoredMessages)) return taskRegistry.update(agentId, task => ({
    ...task,
    resuming: !1,
    notified: !0,
    evictAfter: Date.now() + Ice
  })), He("subagent_launch"), {
    agentId: agentId,
    description: agentMetadata?.description ?? "(resumed)",
    outputFile: gf(agentId)
  };
  let contentReplacementState = Yxn(toolUseContext.contentReplacementState, restoredMessages, resolvedTranscript.contentReplacements),
    worktreePath = agentMetadata?.worktreePath ? await ryo.promises.stat(agentMetadata.worktreePath).then(stat => stat.isDirectory() ? agentMetadata.worktreePath : void 0, () => {
      A(`Resumed worktree ${agentMetadata.worktreePath} no longer exists; falling back to parent cwd`);
      return;
    }) : void 0;
  if (worktreePath) {
    let now = new Date();
    await ryo.promises.utimes(worktreePath, now, now);
  }
  let effectiveCwd = agentMetadata?.cwd ?? worktreePath,
    matchedActiveAgent = agentMetadata?.isFork === !0 ? void 0 : agentMetadata?.agentType ? toolUseContext.options.agentDefinitions.activeAgents.find(def => def.agentType === agentMetadata.agentType) : void 0,
    isFork = agentMetadata?.isFork === !0 || !matchedActiveAgent && agentMetadata?.isFork === void 0 && agentMetadata?.agentType === m$.agentType,
    selectedAgent = matchedActiveAgent ?? (isFork ? m$ : wye),
    resolvedDescription = agentMetadata?.description ?? "(resumed)",
    forkSystemPrompt;
  if (isFork) {
    if (toolUseContext.renderedSystemPrompt) forkSystemPrompt = toolUseContext.renderedSystemPrompt;else {
      let mainThreadAgentDef = appState.agent ? appState.agentDefinitions.activeAgents.find(def => def.agentType === appState.agent) : void 0,
        additionalDirs = Array.from(permCtx.additionalWorkingDirectories.keys()),
        defaultSystemPrompt = await ux(toolUseContext.options.tools, toolUseContext.options.mainLoopModel, additionalDirs);
      forkSystemPrompt = Fq({
        mainThreadAgentDefinition: mainThreadAgentDef,
        toolUseContext: toolUseContext,
        customSystemPrompt: toolUseContext.options.customSystemPrompt,
        defaultSystemPrompt: defaultSystemPrompt,
        appendSystemPrompt: toolUseContext.options.appendSystemPrompt
      });
    }
    if (!forkSystemPrompt) throw xe("subagent_launch", "subagent_resume_fork_prompt_missing"), clearResumingFlag(), new r9("Cannot resume fork agent: unable to reconstruct parent system prompt");
  }
  let resolvedAgentModel = pte(yye(selectedAgent, toolUseContext.options.mainLoopModel), toolUseContext.options.mainLoopModel, void 0, currentPermMode),
    resumePermCtx = {
      ...permCtx,
      mode: agentMetadata?.spawnMode ?? selectedAgent.permissionMode ?? "acceptEdits"
    },
    scopedTools = toolUseContext.options.tools.filter(Zk),
    currentAppState = toolUseContext.getAppState(),
    availableTools = isFork ? toolUseContext.options.tools : FY(resumePermCtx, fut(currentAppState.mcp.tools.concat(scopedTools)), {
      skipReplFilter: !0,
      skillTools: currentAppState.skillTools
    }),
    promptMessage = promptOrigin ? Mn({
      content: T6e(prompt, promptOrigin),
      origin: promptOrigin,
      isMeta: !0
    }) : Mn({
      content: prompt,
      ...(promptIsMeta && {
        isMeta: !0
      })
    }),
    queryParams = {
      agentDefinition: selectedAgent,
      promptMessages: continueInterruptedTurn ? restoredMessages : [...restoredMessages, promptMessage],
      toolUseContext: toolUseContext,
      canUseTool: canUseTool,
      isAsync: !0,
      querySource: TIe(selectedAgent.agentType, Gh(selectedAgent)),
      spawnedBySkill: void 0,
      model: void 0,
      override: isFork ? {
        systemPrompt: forkSystemPrompt
      } : void 0,
      availableTools: availableTools,
      forkContextMessages: void 0,
      recordedUuids: new Set(restoredMessages.map(msg => msg.uuid)),
      ...(isFork && {
        useExactTools: !0
      }),
      worktreePath: worktreePath,
      worktreeBranch: agentMetadata?.worktreeBranch,
      cwd: agentMetadata?.cwd,
      spawnMode: agentMetadata?.spawnMode,
      description: agentMetadata?.description,
      name: agentMetadata?.name,
      toolUseId: agentMetadata?.toolUseId,
      contentReplacementState: contentReplacementState
    };
  if (!promptIsMeta && !continueInterruptedTurn) w5n(agentId, wG(promptOrigin) ? promptMessage : Mn({
    content: prompt,
    origin: promptOrigin
  }), taskRegistry);
  let taskHandle = Xpt({
    agentId: agentId,
    ownerAgentId: rs(),
    parentAbortController: awaitCompletion ? toolUseContext.abortController : void 0,
    spawnDepth: spawnDepth,
    description: resolvedDescription,
    prompt: prompt,
    selectedAgent: selectedAgent,
    taskRegistry: taskRegistry,
    toolUseId: toolUseContext.toolUseId,
    cwd: effectiveCwd
  });
  if (L9n(agentId, taskRegistry), agentMetadata?.name && toolUseContext.getAppState().agentNameRegistry.get(agentMetadata.name) === void 0) toolUseContext.agentLifecycle.registerName(agentMetadata.name, cd(agentId));
  let runMetadata = {
      prompt: prompt,
      resolvedAgentModel: resolvedAgentModel,
      isBuiltInAgent: Gh(selectedAgent),
      startTime: originalStartTime,
      agentType: selectedAgent.agentType,
      isAsync: !0,
      agentDepth: spawnDepth,
      source: selectedAgent.source,
      pluginId: Pce(selectedAgent) ? ts(selectedAgent.plugin) : void 0
    },
    agentContext = {
      agentId: agentId,
      parentAgentId: toolUseContext.agentId,
      depth: spawnDepth,
      parentSessionId: H3(),
      agentType: "subagent",
      subagentName: selectedAgent.agentType,
      displayName: agentMetadata?.name,
      isAsync: !0,
      isBuiltIn: Gh(selectedAgent),
      invokingRequestId: invokingRequestId,
      invocationKind: "resume",
      invocationEmitted: !1
    },
    runPromise = Q5(agentContext, () => Npe(effectiveCwd, () => E6e({
      taskId: taskHandle.agentId,
      abortController: taskHandle.abortController,
      makeStream: (onCacheSafeParams, onQueryProgress) => Q$({
        ...queryParams,
        override: {
          ...queryParams.override,
          agentId: cd(taskHandle.agentId),
          agentContext: agentContext,
          abortController: taskHandle.abortController,
          replHydration: {
            kind: "resume"
          }
        },
        onCacheSafeParams: onCacheSafeParams,
        onQueryProgress: onQueryProgress
      }),
      metadata: runMetadata,
      description: resolvedDescription,
      toolUseContext: toolUseContext,
      taskRegistry: taskRegistry,
      agentIdForCleanup: agentId,
      enableSummarization: dW() || isFork || Yz() || Nbe(),
      getWorktreeResult: async () => worktreePath ? {
        worktreePath: worktreePath,
        ...(agentMetadata?.worktreeBranch && {
          worktreeBranch: agentMetadata.worktreeBranch
        })
      } : {},
      shouldNotifyOwner: awaitCompletion ? () => !1 : void 0
    })));
  if (He("subagent_launch"), awaitCompletion) try {
    await runPromise;
    let finishedTask = taskRegistry.get(agentId),
      finalText = rc(finishedTask) ? Kl(finishedTask.result?.content ?? [], `
`) : "";
    return {
      agentId: agentId,
      description: resolvedDescription,
      outputFile: gf(agentId),
      finalText: finalText
    };
  } finally {
    taskRegistry.update(agentId, task => ({
      ...task,
      notified: !0,
      evictAfter: Date.now() + Ice
    }));
  }
  return {
    agentId: agentId,
    description: resolvedDescription,
    outputFile: gf(agentId)
  };
}
var ryo, r9;
var Qqt = b(() => {
  lt();
  B5e();
  CG();
  NO();
  mn();
  hS();
  cx();
  xS();
  Ph();
  xl();
  y9t();
  Po();
  qe();
  Ct();
  po();
  tce();
  oh();
  aat();
  _a();
  Nqe();
  wE();
  HB();
  Op();
  HI();
  _Y();
  Tye();
  n4t();
  Tke();
  kg();
  fye();
  ryo = require("fs");
  r9 = class r9 extends Error {
    constructor(message) {
      super(message);
      this.name = "ResumeAgentStateError";
    }
  };
});

export {resumeAgentBackground as Jye,ryo,r9,Qqt};
