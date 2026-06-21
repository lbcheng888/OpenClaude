// @ts-nocheck
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {od as Rd,A4n as k3n,Yut as Eut,rUn as TFn,RE as HC} from "../agent/4342_toolUseCount.ts";
import {getAgentTranscript as jut,readAgentMetadata as sqe,ja as za} from "./5143_writeRemoteAgentMetadata.ts";
import {Rm as Dm,zE as jE} from "../../vendor/m125.ts";
import {POWERSHELL_TOOL_NAME as P7,B8 as T8,S_ as y_} from "../agent/1454_agentType.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {A4e as gUt,h4e as _Ut,clt as hBn,Ln,N4e as A4e,pG as zW,lo} from "../tools/5190_userPromptCount.ts";
import {aHn as qXi,eI as M0} from "../telemetry/3157_error.ts";
import {FORK_AGENT as P$,isForkSubagentEnabled as iz,LRe as _Re} from "./2706_isInForkChild.ts";
import {i_e as Gge,h$t as J2t} from "../core/4026_agentType.ts";
import {J0 as z0,oG as FW} from "../agent/5173_len.ts";
import {E6 as d6,T4e as Y3e} from "../telemetry/3876_mainThreadAgentDefinition.ts";
import {gte as ite,sce as zle} from "./3874_permissionMode.ts";
import {Xge as Oge,Qge as Lge} from "../telemetry/3922_agentType.ts";
import {Pk as kk} from "../mcp/3149_scope.ts";
import {ZY as FY,Y0 as K0} from "../artifact/4303_Y0.ts";
import {Alt as zat,GUt as vUt} from "../../vendor/m3872.ts";
import {Dke as Ake,lst as qot} from "../../vendor/m3313.ts";
import {isBuiltInAgent as c_,isPluginAgent as Cce,scrubPathsConfig as u_} from "./4454_toAgentInfos.ts";
import {mainAgentId as ws,getSdkAgentProgressSummariesEnabled as UTe,lt as ct} from "../session/0131_sent.ts";
import {gs as ms,sh} from "../../vendor/m2589.ts";
import {u4 as X3,Am as Sf} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {kpe as upe,Go as Ko} from "../../vendor/m632.ts";
import {j4e as S4e,FY as CY} from "./3921_toolName.ts";
import {k9 as A9,Yge as Dge} from "./4040_clients.ts";
import {isCoordinatorMode as P5,_L as lL} from "./2705_matchSessionMode.ts";
import {mh,vC as TC} from "../../vendor/m5145.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function resumeAgentBackground({
  agentId: agentId,
  prompt: prompt,
  promptOrigin: promptOrigin,
  promptIsMeta: promptIsMeta,
  toolUseContext: toolUseContext,
  canUseTool: canUseTool,
  invokingRequestId: invokingRequestId
}) {
  let resumeStartTime = Date.now(),
    appState = toolUseContext.getAppState(),
    permCtx = Lr(toolUseContext),
    {
      taskRegistry: taskRegistry
    } = toolUseContext,
    currentPermMode = permCtx.mode,
    existingTask = taskRegistry.get(agentId);
  if (Rd(existingTask)) {
    let didSetResuming = false;
    if (taskRegistry.update(agentId, task => {
      if (task.status === "running" || task.resuming) return task;
      return didSetResuming = true, {
        ...task,
        resuming: true
      };
    }), !didSetResuming) throw new ResumeAgentStateError(`Agent ${agentId} is already running or being resumed`);
  }
  let clearResumingFlag = () => {
      taskRegistry.update(agentId, task => task.resuming ? {
        ...task,
        resuming: false
      } : task);
    },
    [diskTranscript, agentMetadata] = await Promise.all([jut(Dm(agentId)), sqe(Dm(agentId))]).catch(err => {
      throw clearResumingFlag(), err;
    }),
    currentTask = taskRegistry.get(agentId),
    spawnDepth = (Rd(currentTask) ? currentTask.spawnDepth : undefined) ?? P7(toolUseContext.agentContext) + 1,
    originalStartTime = Rd(currentTask) ? currentTask.startTime : resumeStartTime,
    resolvedTranscript = diskTranscript;
  if (!resolvedTranscript) {
    let inMemoryMessages = taskRegistry.getTranscript(agentId)?.messages;
    if (inMemoryMessages && inMemoryMessages.length > 0) v(`[resumeAgentBackground ${agentId}] disk transcript missing; using ${inMemoryMessages.length} in-memory messages mirrored during the run`), resolvedTranscript = {
      messages: inMemoryMessages,
      contentReplacements: []
    };
  }
  if (!resolvedTranscript) throw Pe("subagent_launch", "subagent_resume_transcript_missing"), clearResumingFlag(), new ResumeAgentStateError(`No transcript found for agent ID: ${agentId}`);
  let restoredMessages = gUt(_Ut(hBn(resolvedTranscript.messages))),
    contentReplacementState = qXi(toolUseContext.contentReplacementState, restoredMessages, resolvedTranscript.contentReplacements),
    worktreePath = agentMetadata?.worktreePath ? await fsModule.promises.stat(agentMetadata.worktreePath).then(Y => Y.isDirectory() ? agentMetadata.worktreePath : undefined, () => {
      v(`Resumed worktree ${agentMetadata.worktreePath} no longer exists; falling back to parent cwd`);
      return;
    }) : undefined;
  if (worktreePath) {
    let wPath = new Date();
    await fsModule.promises.utimes(worktreePath, wPath, wPath);
  }
  let k = agentMetadata?.cwd ?? worktreePath,
    effectiveCwd = agentMetadata?.isFork === true ? undefined : agentMetadata?.agentType ? toolUseContext.options.agentDefinitions.activeAgents.find(Y => Y.agentType === agentMetadata.agentType) : undefined,
    isFork = agentMetadata?.isFork === true || !effectiveCwd && agentMetadata?.isFork === undefined && agentMetadata?.agentType === P$.agentType,
    matchedAgentDef = effectiveCwd ?? (isFork ? P$ : Gge),
    P = agentMetadata?.description ?? "(resumed)",
    isForkAgent;
  if (isFork) {
    if (toolUseContext.renderedSystemPrompt) isForkAgent = toolUseContext.renderedSystemPrompt;else {
      let Y = appState.agent ? appState.agentDefinitions.activeAgents.find(te => te.agentType === appState.agent) : undefined,
        J = Array.from(permCtx.additionalWorkingDirectories.keys()),
        ee = await z0(toolUseContext.options.tools, toolUseContext.options.mainLoopModel, J);
      isForkAgent = d6({
        mainThreadAgentDefinition: Y,
        toolUseContext: toolUseContext,
        customSystemPrompt: toolUseContext.options.customSystemPrompt,
        defaultSystemPrompt: ee,
        appendSystemPrompt: toolUseContext.options.appendSystemPrompt
      });
    }
    if (!isForkAgent) throw Pe("subagent_launch", "subagent_resume_fork_prompt_missing"), clearResumingFlag(), new ResumeAgentStateError("Cannot resume fork agent: unable to reconstruct parent system prompt");
  }
  let resolvedDescription = ite(Oge(matchedAgentDef, toolUseContext.options.mainLoopModel), toolUseContext.options.mainLoopModel, undefined, currentPermMode),
    reconstructedSystemPrompt = {
      ...permCtx,
      mode: matchedAgentDef.permissionMode ?? "acceptEdits"
    },
    U = toolUseContext.options.tools.filter(kk),
    resolvedModel = toolUseContext.getAppState(),
    effectivePermCtx = isFork ? toolUseContext.options.tools : FY(reconstructedSystemPrompt, zat(resolvedModel.mcp.tools.concat(U)), {
      skipReplFilter: true,
      skillTools: resolvedModel.skillTools
    }),
    mcpScopeTools = promptOrigin ? Ln({
      content: A4e(prompt, promptOrigin),
      origin: promptOrigin,
      isMeta: true
    }) : Ln({
      content: prompt,
      ...(promptIsMeta && {
        isMeta: true
      })
    }),
    latestAppState = {
      agentDefinition: matchedAgentDef,
      promptMessages: [...restoredMessages, mcpScopeTools],
      toolUseContext: toolUseContext,
      canUseTool: canUseTool,
      isAsync: true,
      querySource: Ake(matchedAgentDef.agentType, c_(matchedAgentDef)),
      spawnedBySkill: undefined,
      model: undefined,
      override: isFork ? {
        systemPrompt: isForkAgent
      } : undefined,
      availableTools: effectivePermCtx,
      forkContextMessages: undefined,
      resumePersistedCount: restoredMessages.length,
      ...(isFork && {
        useExactTools: true
      }),
      worktreePath: worktreePath,
      worktreeBranch: agentMetadata?.worktreeBranch,
      cwd: agentMetadata?.cwd,
      description: agentMetadata?.description,
      name: agentMetadata?.name,
      toolUseId: agentMetadata?.toolUseId,
      contentReplacementState: contentReplacementState
    };
  if (!promptIsMeta) k3n(agentId, zW(promptOrigin) ? mcpScopeTools : Ln({
    content: prompt,
    origin: promptOrigin
  }), taskRegistry);
  let makeStreamOpts = Eut({
    agentId: agentId,
    ownerAgentId: ws(),
    spawnDepth: spawnDepth,
    description: P,
    prompt: prompt,
    selectedAgent: matchedAgentDef,
    taskRegistry: taskRegistry,
    toolUseId: toolUseContext.toolUseId,
    cwd: k
  });
  if (TFn(agentId, taskRegistry), agentMetadata?.name && toolUseContext.getAppState().agentNameRegistry.get(agentMetadata.name) === undefined) toolUseContext.agentLifecycle.registerName(agentMetadata.name, Dm(agentId));
  let Q = {
      prompt: prompt,
      resolvedAgentModel: resolvedDescription,
      isBuiltInAgent: c_(matchedAgentDef),
      startTime: originalStartTime,
      agentType: matchedAgentDef.agentType,
      isAsync: true,
      agentDepth: spawnDepth,
      source: matchedAgentDef.source,
      pluginId: Cce(matchedAgentDef) ? ms(matchedAgentDef.plugin) : undefined
    },
    agentMetadataForRun = {
      agentId: agentId,
      parentAgentId: toolUseContext.agentId,
      depth: spawnDepth,
      parentSessionId: X3(),
      agentType: "subagent",
      subagentName: matchedAgentDef.agentType,
      isBuiltIn: c_(matchedAgentDef),
      invokingRequestId: invokingRequestId,
      invocationKind: "resume",
      invocationEmitted: false
    };
  return T8(agentMetadataForRun, () => upe(k, () => S4e({
    taskId: makeStreamOpts.agentId,
    abortController: makeStreamOpts.abortController,
    makeStream: (Y, J) => A9({
      ...latestAppState,
      override: {
        ...latestAppState.override,
        agentId: Dm(makeStreamOpts.agentId),
        agentContext: agentMetadataForRun,
        abortController: makeStreamOpts.abortController,
        replHydration: {
          kind: "resume"
        }
      },
      onCacheSafeParams: Y,
      onQueryProgress: J
    }),
    metadata: Q,
    description: P,
    toolUseContext: toolUseContext,
    taskRegistry: taskRegistry,
    agentIdForCleanup: agentId,
    enableSummarization: P5() || isFork || iz() || UTe(),
    getWorktreeResult: async () => worktreePath ? {
      worktreePath: worktreePath,
      ...(agentMetadata?.worktreeBranch && {
        worktreeBranch: agentMetadata.worktreeBranch
      })
    } : {}
  }))), He("subagent_launch"), {
    agentId: agentId,
    description: P,
    outputFile: mh(agentId)
  };
}
var fsModule, ResumeAgentStateError;
var initResumeAgent = b(() => {
  ct();
  FW();
  lL();
  cn();
  HC();
  K0();
  jE();
  y_();
  Xl();
  vUt();
  Ko();
  je();
  lo();
  zle();
  sh();
  qot();
  za();
  Y3e();
  TC();
  Sf();
  M0();
  CY();
  Lge();
  J2t();
  _Re();
  u_();
  Dge();
  fsModule = require("fs");
  ResumeAgentStateError = class ResumeAgentStateError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResumeAgentStateError";
    }
  };
});

export {resumeAgentBackground as p0e,fsModule as smo,ResumeAgentStateError as d0e,initResumeAgent as D3t};
