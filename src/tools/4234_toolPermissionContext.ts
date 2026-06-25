// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {isForkSubagentEnabled as Yz,FORK_SUBAGENT_TYPE as Jz,Tke,FORK_AGENT as m$,isInForkChild as sKr,buildForkedMessages as iKr,buildWorktreeNotice as aKr} from "../permissions/2718_isInForkChild.ts";
import {normalizeAgentType as Jpt,kg,hasRequiredMcpServers as R6n,isPluginAgent as Pce,isBuiltInAgent as Gh} from "../permissions/4476_toAgentInfos.ts";
import {getDenyRuleForAgent as T5e,ly,filterDeniedAgents as Wxe} from "./5218_toolAlwaysAllowedRule.ts";
import {ls,fg,w8,Kbi} from "../../vendor/m2232.ts";
import {b,x} from "../../runtime.ts";
import {ri,Ks,Gl} from "./2235_userFacingName.ts";
import {aat,TIe} from "../../vendor/m3329.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,mainAgentId as rs,getIsNonInteractiveSession as kr,getSdkAgentProgressSummariesEnabled as Nbe} from "../session/0132_sent.ts";
import {CG,ux,h4t} from "../agent/5206_len.ts";
import {D$e,SMt} from "../../vendor/m2713.ts";
import {jz,yw} from "../config/2716_jz.ts";
import {NO,isCoordinatorMode as dW} from "../permissions/2717_matchSessionMode.ts";
import {mn,xe,He} from "../telemetry/0600_feature_name.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {hS,zza,Xpt,E5e,jza,udt,Cqt,rc,Yza} from "../agent/4362_toolUseCount.ts";
import {mY,Zle,dte,rye,ece} from "./3889_allowBundle.ts";
import {cx,FY} from "../artifact/4323_cx.ts";
import {xS,cd} from "../../vendor/m122.ts";
import {lh,iqi} from "../../vendor/m2739.ts";
import {Ph,k3,Q5} from "../agent/1459_agentType.ts";
import {_9t,aG} from "../../vendor/m3889.ts";
import {lb,isAgentSwarmsEnabled as Wa} from "../config/3314_isAgentSwarmsEnabled.ts";
import {y9t,fut} from "../../vendor/m3890.ts";
import {Po,isTmuxControlMode as Lt,Npe} from "../../vendor/m638.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {Ct,Ce,$c,mo} from "../../vendor/m197.ts";
import {po,Mn,ST,Gye} from "./5224_userPromptCount.ts";
import {tce,pte} from "../permissions/3892_permissionMode.ts";
import {FS,Yas,Won} from "../../vendor/m722.ts";
import {oh,ts} from "../../vendor/m2600.ts";
import {RE,VA} from "../session/2796_uuid.ts";
import {lr,tEe,Sn} from "../../vendor/m233.ts";
import {eW,t$} from "../../vendor/m2601.ts";
import {wB,zFa,hut,mte} from "../config/3893_wB.ts";
import {Nqe,Fq} from "../telemetry/3894_mainThreadAgentDefinition.ts";
import {wE,gf} from "../../vendor/m5177.ts";
import {Op,getDynamicTeamContext as nFe,H3} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {slowOpTracer as pw,Iz} from "../telemetry/2606_skill_name.ts";
import {qD,teleportToRemote as Lq} from "../permissions/3888_validateSessionRepository.ts";
import {g1,fHn} from "../core/2741_input_tokens.ts";
import {YL,OP} from "../../vendor/m123.ts";
import {qI,createAgentWorktree as y5e,agentWorktreeSlug as Qgo,hasWorktreeChanges as tqt,removeAgentWorktree as Bte,unlockAgentWorktree as qye} from "../session/5205_worktreeBranchName.ts";
import {Eqt,Yxe} from "../config/4333_onBackground.ts";
import {dm,vs} from "../../vendor/m2256.ts";
import {$A,I$e} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Bza,Fza} from "../permissions/4231_level.ts";
import {ix,E0e} from "../../vendor/m3842.ts";
import {_Y,m9a,E6e,Kdo,jdo} from "../permissions/3988_toolName.ts";
import {Tye,yye} from "../telemetry/3989_agentType.ts";
import {n4t,wye} from "../core/4090_agentType.ts";
import {Jgo,Gza} from "../agent/4233_tools.ts";
import {Ygo,Sqt,Uza,qza,$za} from "../config/4232_Ygo.ts";
import {fye,E5a,Q$} from "../permissions/4104_clients.ts";
import {s4t,Dmo,Pmo,M6a,N6a,F6a,Axe,B6a,U6a,$6a} from "./4091_type.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {oe} from "../../vendor/m2275.ts";
import {Ne} from "../../vendor/m583.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Zk,OHe} from "../mcp/3159_scope.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {Le,Bo,Ve} from "../../vendor/m5.ts";
import {vc} from "../api/3886_level.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
/**
 * Task / subagent-launch tool definition for Claude Code v2.1.190.
 *
 * This module defines the "Task" tool (`ls` / userFacingName) that lets the main
 * agent spawn subagents — synchronously, in the background (async), as an
 * in-process "fork", as a named teammate, or in a remote cloud session.
 *
 * It owns:
 *  - input/output Zod schemas for the tool,
 *  - the big `call()` orchestration that resolves the agent type, enforces
 *    permission/depth/teammate rules, spawns the agent, and streams progress,
 *  - permission gating helpers (`Vza`), background-task tuning (`rUp`),
 *  - result-block rendering for each terminal status.
 *
 * Structure is 1:1 with the reverse-engineered build; only local identifiers
 * were renamed and types/comments added.
 */

/**
 * Returns the auto-background timeout (ms) for synchronous subagents, or 0 to
 * disable. Enabled only when CLAUDE_AUTO_BACKGROUND_TASKS is truthy.
 */
function rUp(): number {
  if (nt(process.env.CLAUDE_AUTO_BACKGROUND_TASKS)) return 120000;
  return 0;
}

/**
 * Computes whether the "fork" agent type is available given the active agent
 * definitions, the allowed agent-type allowlist, and the current tool
 * permission context. Returns the matching deny rule when fork is blocked.
 *
 * @param activeAgents   list of active agent definitions
 * @param allowedTypes   optional allowlist of agent types (undefined = all)
 * @param ctx            object carrying the current toolPermissionContext
 */
function Vza(
  activeAgents: any[],
  allowedTypes: string[] | undefined,
  { toolPermissionContext: permissionContext }: { toolPermissionContext: any }
): { available: boolean; denyRule: any } {
  if (!Yz() || activeAgents.some(agentDef => Jpt(agentDef.agentType) === Jz) || !(allowedTypes?.includes(Jz) ?? !0)) return {
    available: !1,
    denyRule: null
  };
  let denyRule = T5e(permissionContext, ls, Jz);
  return {
    available: denyRule === null,
    denyRule
  };
}

var Kza: any,
  w5e: any,
  Xgo: any,
  jxe: any,
  /** Delay (ms) before showing the "still running, you can background this" hint. */
  nUp = 2000,
  bqt: any,
  oUp: any,
  sUp: any,
  Omo: any,
  iUp: any,
  A6n: any;
var Lmo = b(() => {
  ri();
  aat();
  Qr();
  lt();
  CG();
  D$e();
  jz();
  NO();
  mn();
  jn();
  kt();
  hS();
  mY();
  cx();
  xS();
  lh();
  Ph();
  _9t();
  lb();
  y9t();
  Po();
  qe();
  Ir();
  dn();
  Ct();
  po();
  tce();
  FS();
  ly();
  oh();
  RE();
  lr();
  eW();
  wB();
  Nqe();
  wE();
  Op();
  pw();
  qD();
  g1();
  YL();
  qI();
  Eqt();
  dm();
  $A();
  Bza();
  ix();
  _Y();
  Tye();
  n4t();
  fg();
  Tke();
  kg();
  Jgo();
  Ygo();
  fye();
  s4t();
  xl();
  Kza = x(oe(), 1);
  /** Error raised when an agent type is invalid / not found. */
  w5e = class w5e extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AgentTypeError";
    }
  };
  /** Error raised when remote-agent preconditions (login, eligibility) fail. */
  Xgo = class Xgo extends Error {
    constructor(message: string) {
      super(message);
      this.name = "RemoteAgentPreconditionError";
    }
  };
  /** Error raised when generic agent-spawn preconditions fail. */
  jxe = class jxe extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AgentPreconditionError";
    }
  };
  bqt = Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS;
  /** Base input schema (description / prompt / subagent_type / model / run_in_background). */
  oUp = ve(() => C.object({
    description: C.string().describe("A short (3-5 word) description of the task"),
    prompt: C.string().describe("The task for the agent to perform"),
    subagent_type: C.string().optional().describe("The type of specialized agent to use for this task"),
    model: C.enum(["sonnet", "opus", "haiku", "fable"]).optional().describe(`Optional model override for this agent. Takes precedence over the agent definition's model frontmatter. If omitted, uses the agent definition's model, or inherits from the parent. Ignored for subagent_type: "fork" — forks always inherit the parent model.`),
    run_in_background: C.boolean().optional().describe("Set to true to run this agent in the background. You will be notified when it completes.")
  })), sUp = ve(() => {
    let teammateFields = C.object({
      name: C.string().regex(zFa, {
        message: "name must start with a letter or digit and contain only letters, digits, underscores, or hyphens (max 64 chars)"
      }).refine(candidateName => candidateName !== aG, {
        message: `"${aG}" is reserved — SendMessage routes it to the main conversation`
      }).optional().describe("Name for the spawned agent. Makes it addressable via SendMessage({to: name}) while running."),
      team_name: C.string().optional().describe("Deprecated; ignored. The session has a single implicit team."),
      mode: Yas().optional().describe('Permission mode for spawned teammate (e.g., "plan" to require plan approval).')
    });
    return oUp().merge(teammateFields).extend({
      isolation: C.enum(["worktree", "remote"]).optional().describe('Isolation mode. "worktree" creates a temporary git worktree so the agent works on an isolated copy of the repo. "remote" launches the agent in a remote cloud environment (always runs in background; availability is gated).'),
      cwd: C.string().optional().describe('Absolute path to run the agent in. Overrides the working directory for all filesystem and shell operations within this agent. Mutually exclusive with isolation: "worktree".')
    });
  }), Omo = ve(() => {
    let schemaWithoutCwd = sUp().omit({
      cwd: !0
    });
    return bqt || Yz() ? schemaWithoutCwd.omit({
      run_in_background: !0
    }) : schemaWithoutCwd;
  }), iUp = ve(() => {
    let completedSchema = m9a().extend({
        status: C.literal("completed"),
        prompt: C.string()
      }),
      asyncLaunchedSchema = C.object({
        status: C.literal("async_launched"),
        agentId: C.string().describe("The ID of the async agent"),
        description: C.string().describe("The description of the task"),
        resolvedModel: C.string().optional().describe("Model the spawn resolved (may differ from the requested one)"),
        prompt: C.string().describe("The prompt for the agent"),
        outputFile: C.string().describe("Path to the output file for checking agent progress"),
        canReadOutputFile: C.boolean().optional().describe("Whether the calling agent has Read/Bash tools to check progress")
      }),
      remoteLaunchedSchema = C.object({
        status: C.literal("remote_launched"),
        taskId: C.string().describe("The ID of the remote agent task"),
        sessionUrl: C.string().describe("The URL of the cloud session"),
        description: C.string().describe("The description of the task"),
        prompt: C.string().describe("The prompt for the agent"),
        outputFile: C.string().describe("Path to the output file for checking agent progress")
      });
    return C.union([completedSchema, asyncLaunchedSchema, remoteLaunchedSchema]);
  }), A6n = Ks({
    async prompt({
      agents: activeAgents,
      getToolPermissionContext: getPermissionContext,
      allowedAgentTypes: allowedTypes,
      model: model
    }) {
      let permissionContext = await getPermissionContext(),
        someSentinel = yw(),
        {
          available: forkAvailable
        } = Vza(activeAgents, allowedTypes, {
          toolPermissionContext: permissionContext
        });
      return await Gza(model, someSentinel, forkAvailable);
    },
    name: ls,
    searchHint: "delegate work to a subagent",
    aliases: [w8],
    maxResultSizeChars: 1e5,
    async description() {
      return "Launch a new agent";
    },
    get inputSchema() {
      return Omo();
    },
    get outputSchema() {
      return iUp();
    },
    async call({
      prompt: prompt,
      subagent_type: subagentType,
      description: description,
      model: requestedModel,
      run_in_background: runInBackground,
      name: spawnName,
      mode: requestedMode,
      isolation: requestedIsolation,
      cwd: requestedCwd
    }, ctx, canUseTool, parentInvocation, emit) {
      let startTime = Date.now(),
        // forks always inherit the parent model, so drop any override
        effectiveRequestedModel = dW() ? void 0 : requestedModel,
        currentDepth = k3(ctx.agentContext);
      if (currentDepth >= SMt) throw xe("subagent_launch", "subagent_depth_cap"), new jxe(`Subagent nesting limit reached (depth ${currentDepth} of ${SMt}). Complete this task directly using your tools instead of spawning another agent.`);
      let appState = ctx.getAppState(),
        parentPermissionContext = Mr(ctx),
        parentMode = parentPermissionContext.mode,
        spawnMode = Won(requestedMode, parentMode),
        {
          taskRegistry: taskRegistry
        } = ctx,
        teamContext = Wa() ? appState.teamContext : void 0,
        isTeammate = !!ctx.teammateContext;
      if ((isTeammate || !!nFe()) && spawnName) throw xe("subagent_launch", "subagent_nested_teammate"), new jxe("Teammates cannot spawn other teammates — the team roster is flat. To spawn a subagent instead, omit the `name` parameter.");
      if (isTeammate && runInBackground === !0) throw xe("subagent_launch", "subagent_teammate_background_denied"), new jxe("In-process teammates cannot spawn background agents. Use run_in_background=false for synchronous subagents.");
      let {
          activeAgents: activeAgents,
          allowedAgentTypes: allowedTypes
        } = ctx.options.agentDefinitions,
        requestedIsFork = subagentType !== void 0 && Jpt(subagentType) === Jz,
        {
          available: forkAvailable,
          denyRule: forkDenyRule
        } = Vza(activeAgents, allowedTypes, {
          toolPermissionContext: parentPermissionContext
        });
      if (requestedIsFork && forkDenyRule) throw xe("subagent_launch", "subagent_type_denied"), new w5e(`Agent type '${Jz}' has been denied by permission rule '${ls}(${Jz})' from ${forkDenyRule.source}.`);
      let useFork = requestedIsFork && forkAvailable;
      if (subagentType !== void 0 && !requestedIsFork) {
        let typeDenyRule = T5e(parentPermissionContext, ls, subagentType);
        if (typeDenyRule) throw xe("subagent_launch", "subagent_type_denied"), new w5e(`Agent type '${subagentType}' has been denied by permission rule '${ls}(${subagentType})' from ${typeDenyRule.source}.`);
        if (allowedTypes && !allowedTypes.includes(subagentType)) {
          xe("subagent_launch", "subagent_type_not_found");
          let availableTypeNames = Wxe(activeAgents.filter(agentDef => allowedTypes.includes(agentDef.agentType)), parentPermissionContext, ls).map(agentDef => agentDef.agentType);
          throw new w5e(`Agent type '${subagentType}' not found. Available agents: ${availableTypeNames.join(", ")}`);
        }
      }
      if (teamContext && spawnName && !useFork && !requestedIsolation && !requestedCwd) {
        let matchedAgentDef = subagentType ? ctx.options.agentDefinitions.activeAgents.find(agentDef => agentDef.agentType === subagentType) : void 0;
        if (matchedAgentDef?.color) E0e(subagentType, matchedAgentDef.color);
        let spawnResult = await Fza({
            name: spawnName,
            prompt: prompt,
            description: description,
            use_splitpane: !0,
            plan_mode_required: spawnMode === "plan",
            model: effectiveRequestedModel ?? (matchedAgentDef ? yye(matchedAgentDef, ctx.options.mainLoopModel) : void 0),
            agent_type: subagentType,
            invokingRequestId: parentInvocation?.requestId
          }, ctx, emit),
          teammateSpawnedData = {
            status: "teammate_spawned",
            prompt: prompt,
            ...spawnResult.data
          };
        return He("subagent_launch"), {
          data: teammateSpawnedData
        };
      }
      let selectedAgent;
      if (useFork) {
        if (requestedIsolation === "remote") throw xe("subagent_launch", "subagent_fork_remote_isolation"), new jxe('Fork cannot use isolation: "remote" — a remote session cannot inherit the conversation context. Omit isolation (or use "worktree"), or spawn a named agent type for remote work.');
        if (ctx.options.querySource === `agent:builtin:${m$.agentType}` || sKr(ctx.messages)) throw xe("subagent_launch", "subagent_recursive_fork"), new jxe("Fork is not available inside a forked worker. Complete your task directly using your tools.");
        selectedAgent = m$;
      } else {
        let resolvedType = subagentType ?? wye.agentType,
          availableAgentDefs = Wxe(allowedTypes ? activeAgents.filter(agentDef => allowedTypes.includes(agentDef.agentType)) : activeAgents, parentPermissionContext, ls),
          matchedAgentDef = availableAgentDefs.find(agentDef => agentDef.agentType === resolvedType);
        if (!matchedAgentDef) {
          let normalizedType = Jpt(resolvedType),
            normalizedLabel = tEe(normalizedType, 60),
            availableTypeNames = availableAgentDefs.map(agentDef => agentDef.agentType),
            availableTypeSet = new Set(availableTypeNames),
            normalizedMatches = normalizedType ? activeAgents.filter(agentDef => Jpt(agentDef.agentType) === normalizedType) : [];
          if (normalizedMatches.length > 1) {
            W("tengu_subagent_type_miss", {
              requestedNormalized: normalizedLabel,
              availableCount: availableAgentDefs.length,
              ambiguousCount: normalizedMatches.length
            }), xe("subagent_launch", "subagent_type_ambiguous");
            let availableNormalizedNames = normalizedMatches.map(agentDef => agentDef.agentType).filter(typeName => availableTypeSet.has(typeName));
            throw new w5e(`Agent type '${resolvedType}' is ambiguous — matches ${normalizedMatches.map(agentDef => availableTypeSet.has(agentDef.agentType) ? agentDef.agentType : `${agentDef.agentType} (unavailable)`).join(", ")}. ${availableNormalizedNames.length > 0 ? `Use the exact name: ${availableNormalizedNames.join(" or ")}` : `None of these are available. Available agents: ${availableTypeNames.join(", ")}`}`);
          }
          if (normalizedMatches.length === 1) {
            let onlyNormalizedMatch = normalizedMatches[0];
            if (availableTypeSet.has(onlyNormalizedMatch.agentType)) {
              if (matchedAgentDef = onlyNormalizedMatch, matchedAgentDef.color) E0e(resolvedType, matchedAgentDef.color);
              W("tengu_subagent_type_normalized", {
                requestedNormalized: normalizedLabel,
                matched: matchedAgentDef.agentType
              });
            } else {
              let unavailableType = onlyNormalizedMatch.agentType,
                unavailableDenyRule = T5e(parentPermissionContext, ls, unavailableType);
              if (unavailableDenyRule) throw xe("subagent_launch", "subagent_type_denied"), new w5e(`Agent type '${unavailableType}' has been denied by permission rule '${ls}(${unavailableType})' from ${unavailableDenyRule.source}.`);
            }
          }
          if (!matchedAgentDef) throw W("tengu_subagent_type_miss", {
            requestedNormalized: normalizedLabel,
            availableCount: availableAgentDefs.length
          }), xe("subagent_launch", "subagent_type_not_found"), new w5e(`Agent type '${resolvedType}' not found. Available agents: ${availableTypeNames.join(", ")}`);
        }
        selectedAgent = matchedAgentDef;
      }
      if (isTeammate && selectedAgent.background === !0) throw xe("subagent_launch", "subagent_teammate_background_denied"), new jxe(`In-process teammates cannot spawn background agents. Agent '${selectedAgent.agentType}' has background: true in its definition.`);
      let requiredMcpServers = selectedAgent.requiredMcpServers,
        replTools = ctx.options.tools.filter(Zk);
      if (requiredMcpServers?.length) {
        let hasPendingRequired = appState.mcp.clients.some(client => client.type === "pending" && requiredMcpServers.some(serverName => client.name.toLowerCase().includes(serverName.toLowerCase()))),
          latestAppState = appState;
        if (hasPendingRequired) {
          let waitDeadline = Date.now() + 30000;
          while (Date.now() < waitDeadline) {
            if (await Kn(500), latestAppState = ctx.getAppState(), latestAppState.mcp.clients.some(client => client.type === "failed" && requiredMcpServers.some(serverName => client.name.toLowerCase().includes(serverName.toLowerCase())))) break;
            if (!latestAppState.mcp.clients.some(client => client.type === "pending" && requiredMcpServers.some(serverName => client.name.toLowerCase().includes(serverName.toLowerCase())))) break;
          }
        }
        let resolvedServerNames = [];
        for (let toolDef of latestAppState.mcp.tools.concat(replTools)) {
          let serverName = OHe(toolDef);
          if (serverName && !resolvedServerNames.includes(serverName)) resolvedServerNames.push(serverName);
        }
        if (!R6n(selectedAgent, resolvedServerNames)) {
          let missingServerNames = requiredMcpServers.filter(serverName => !resolvedServerNames.some(resolved => resolved.toLowerCase().includes(serverName.toLowerCase())));
          throw xe("subagent_launch", "subagent_mcp_required_missing"), new jxe(`Agent '${selectedAgent.agentType}' requires MCP servers matching: ${missingServerNames.join(", ")}. MCP servers with tools: ${resolvedServerNames.length > 0 ? resolvedServerNames.join(", ") : "none"}. Use /mcp to configure and authenticate the required MCP servers.`);
        }
      }
      if (selectedAgent.color) E0e(selectedAgent.agentType, selectedAgent.color);
      let resolvedModel = pte(yye(selectedAgent, ctx.options.mainLoopModel), ctx.options.mainLoopModel, useFork ? void 0 : effectiveRequestedModel, parentMode);
      ctx.agentLifecycle.markTypeInvoked(selectedAgent.agentType);
      let systemPrompt = selectedAgent.getSystemPrompt({
          toolUseContext: ctx
        }),
        pluginId = Pce(selectedAgent) ? ts(selectedAgent.plugin) : void 0;
      if (Pce(selectedAgent)) t$(selectedAgent.plugin);
      let someSentinel2 = yw(),
        forkSummarizationFlag = Yz(),
        isolation = requestedIsolation ?? selectedAgent.isolation;
      if (isolation === "remote" && !Sqt()) isolation = Ne.CLAUDE_CODE_REMOTE || !Uza() ? void 0 : "worktree", A("[remote agent] isolation:'remote' is unavailable " + (Ne.CLAUDE_CODE_REMOTE ? "(already inside a CCR session); running as a local agent" : isolation === "worktree" ? "(no claude.ai login or feature gate off); falling back to isolation:'worktree'" : "(no claude.ai login or feature gate off) and no git root; running as a local agent"));
      let isRemote = isolation === "remote",
        isAsync = isRemote || (runInBackground === !0 || selectedAgent.background === !0 || someSentinel2 || forkSummarizationFlag || !isTeammate && runInBackground !== !1 && it("tengu_amber_heron", !1)) && !bqt,
        spawnDepth = k3(ctx.agentContext) + 1;
      if (W("tengu_agent_tool_selected", {
        agent_type: selectedAgent.agentType,
        model: resolvedModel,
        source: Le(selectedAgent.source),
        color: Bo(selectedAgent.color),
        is_built_in_agent: Gh(selectedAgent),
        is_resume: !1,
        is_async: isAsync,
        is_fork: useFork,
        agent_depth: spawnDepth,
        agent_system_prompt_chars: systemPrompt.length,
        ...(pluginId && Iz(pluginId.name, pluginId.marketplace))
      }), isRemote) {
        let eligibility = await Zle();
        if (!eligibility.eligible) {
          let eligibilityErrors = eligibility.errors.map(dte).join(`
`);
          throw xe("subagent_launch", "subagent_remote_ineligible"), new Xgo(`Cannot launch cloud agent:
${eligibilityErrors}`);
        }
        let remoteFailureMessage,
          remoteSession = await Lq({
            initialMessage: prompt,
            source: "remote_agent",
            description: description,
            model: resolvedModel,
            permissionMode: qza(spawnMode ?? selectedAgent.permissionMode ?? "acceptEdits"),
            branchName: await $za(),
            signal: ctx.abortController.signal,
            onBundleFail: failureMessage => {
              remoteFailureMessage = failureMessage;
            },
            onCreateFail: failureMessage => {
              remoteFailureMessage = failureMessage;
            }
          });
        if (!remoteSession) throw xe("subagent_launch", "subagent_remote_session_failed"), new Xgo(remoteFailureMessage ?? "Failed to create cloud session");
        let {
          taskId: remoteTaskId,
          sessionId: remoteSessionId
        } = rye({
          remoteTaskType: "remote-agent",
          session: {
            id: remoteSession.id,
            title: remoteSession.title || description
          },
          command: prompt,
          context: ctx,
          toolUseId: ctx.toolUseId
        });
        return W("tengu_agent_tool_remote_launched", {
          agent_type: selectedAgent.agentType
        }), He("subagent_launch"), {
          data: {
            status: "remote_launched",
            taskId: remoteTaskId,
            sessionUrl: ece(remoteSessionId),
            description: description,
            prompt: prompt,
            outputFile: gf(remoteTaskId)
          }
        };
      }
      let agentSystemPromptResult, forkedSystemPrompt, promptMessages;
      if (useFork) {
        if (ctx.renderedSystemPrompt) forkedSystemPrompt = ctx.renderedSystemPrompt;else {
          let mainThreadAgentDef = appState.agent ? appState.agentDefinitions.activeAgents.find(agentDef => agentDef.agentType === appState.agent) : void 0,
            additionalDirs = Array.from(parentPermissionContext.additionalWorkingDirectories.keys()),
            defaultSystemPrompt = await ux(ctx.options.tools, ctx.options.mainLoopModel, additionalDirs);
          forkedSystemPrompt = Fq({
            mainThreadAgentDefinition: mainThreadAgentDef,
            toolUseContext: ctx,
            customSystemPrompt: ctx.options.customSystemPrompt,
            defaultSystemPrompt: defaultSystemPrompt,
            appendSystemPrompt: ctx.options.appendSystemPrompt
          });
        }
        promptMessages = iKr(prompt, parentInvocation);
      } else {
        try {
          let additionalDirs = Array.from(parentPermissionContext.additionalWorkingDirectories.keys());
          if (selectedAgent.memory) W("tengu_agent_memory_loaded", {
            ...!1,
            scope: Le(selectedAgent.memory),
            source: Ve("subagent")
          });
          agentSystemPromptResult = await h4t([systemPrompt], resolvedModel, additionalDirs);
        } catch (systemPromptError) {
          A(`Failed to get system prompt for agent ${selectedAgent.agentType}: ${Ce(systemPromptError)}`);
        }
        promptMessages = [Mn({
          content: prompt
        })];
      }
      let spawnMetadata = {
          prompt: prompt,
          resolvedAgentModel: resolvedModel,
          isBuiltInAgent: Gh(selectedAgent),
          startTime: startTime,
          agentType: selectedAgent.agentType,
          isAsync: isAsync,
          agentDepth: spawnDepth,
          source: selectedAgent.source,
          pluginId: pluginId
        },
        childPermissionContext = {
          ...parentPermissionContext,
          mode: spawnMode ?? selectedAgent.permissionMode ?? "acceptEdits"
        },
        currentAppState = ctx.getAppState(),
        childAvailableTools = FY(childPermissionContext, fut(currentAppState.mcp.tools.concat(replTools)), {
          skipReplFilter: !0,
          skillTools: currentAppState.skillTools
        }),
        spawnRequestId = OP(),
        parentAgentId = ctx.agentId,
        ownerAgentId = zza(parentAgentId, taskRegistry) ?? rs(),
        worktree = null;
      if (isolation === "worktree") worktree = await y5e(Qgo(spawnRequestId));
      if (useFork && worktree) promptMessages.push(Mn({
        content: aKr(Lt(), worktree.worktreePath)
      }));
      let spawnOptions = {
          agentDefinition: selectedAgent,
          promptMessages: promptMessages,
          toolUseContext: ctx,
          canUseTool: canUseTool,
          name: spawnName,
          isAsync: isAsync,
          querySource: ctx.options.querySource ?? TIe(selectedAgent.agentType, Gh(selectedAgent)),
          spawnedBySkill: ctx.options.spawnedBySkill ?? ctx.options.activeSkill,
          model: useFork ? void 0 : effectiveRequestedModel,
          override: useFork ? {
            systemPrompt: forkedSystemPrompt,
            replHydration: {
              kind: "fork",
              log: [...(ctx.getReplContexts()[ctx.agentId ?? I$e]?.replayLog ?? [])]
            }
          } : agentSystemPromptResult && !worktree && !requestedCwd ? {
            systemPrompt: vc(agentSystemPromptResult)
          } : void 0,
          availableTools: useFork ? ctx.options.tools : childAvailableTools,
          forkContextMessages: useFork ? ctx.messages : void 0,
          ...(useFork && {
            useExactTools: !0
          }),
          worktreePath: worktree?.worktreePath,
          worktreeBranch: worktree?.worktreeBranch,
          cwd: requestedCwd,
          spawnMode: spawnMode,
          description: description,
          preserveToolUseResults: !kr(),
          toolUseId: ctx.toolUseId,
          onMcpServersBlocked: (blockedServers, blockerLabel) => emit?.({
            type: "notification",
            notification: {
              key: `agent-mcp-blocked-${spawnRequestId}`,
              text: `${selectedAgent.agentType} agent MCP ${Sn(blockedServers.length, "server")} blocked by ${blockerLabel}: ${blockedServers.join(", ")}`,
              priority: "medium",
              color: "warning",
              timeoutMs: 1e4
            }
          }),
          onModelRestricted: (restrictedModel, reason) => emit?.({
            type: "notification",
            notification: {
              key: `agent-model-restricted-${selectedAgent.agentType}-${hut(restrictedModel)}`,
              text: `${selectedAgent.agentType} agent: ${mte(restrictedModel, reason)}`,
              priority: "medium",
              color: "warning",
              timeoutMs: 1e4
            }
          })
        },
        effectiveCwd = requestedCwd ?? worktree?.worktreePath,
        finalizeWorktree = async () => {
          if (!worktree) return {};
          let {
            worktreePath: worktreePath,
            worktreeBranch: worktreeBranch,
            headCommit: headCommit,
            gitRoot: gitRoot,
            hookBased: hookBased
          } = worktree;
          if (worktree = null, hookBased) return A(`Hook-based agent worktree kept at: ${worktreePath}`), {
            worktreePath: worktreePath
          };
          if (headCommit) {
            if (!(await tqt(worktreePath, headCommit)) && (await Bte(worktreePath, worktreeBranch, gitRoot, !1, "agent_tool"))) return E5a({
              agentId: cd(spawnRequestId),
              removedWorktreePath: worktreePath,
              spawnMetadata: {
                agentType: selectedAgent.agentType,
                ...(selectedAgent.agentType === Jz && {
                  isFork: Gh(selectedAgent)
                }),
                ...(requestedCwd && {
                  cwd: requestedCwd
                }),
                description: description,
                ...(spawnName && {
                  name: spawnName
                }),
                ...(spawnMode && {
                  spawnMode: spawnMode
                }),
                ...(ctx.toolUseId && {
                  toolUseId: ctx.toolUseId
                }),
                spawnDepth: spawnDepth
              }
            }).catch(metadataError => A(`Failed to clear worktree metadata: ${metadataError}`)), {};
          }
          if (gitRoot) await qye(worktreePath, gitRoot);
          return A(`Agent worktree kept at: ${worktreePath}`), {
            worktreePath: worktreePath,
            worktreeBranch: worktreeBranch
          };
        };
      if (spawnName && spawnName !== aG) ctx.agentLifecycle.registerName(spawnName, cd(spawnRequestId));
      let displayName = spawnName && spawnName !== aG ? spawnName : void 0;
      if (isAsync) {
        let asyncAgentId = spawnRequestId,
          asyncTask = Xpt({
            agentId: asyncAgentId,
            ownerAgentId: ownerAgentId,
            parentAgentId: parentAgentId,
            spawnDepth: spawnDepth,
            description: description,
            prompt: prompt,
            selectedAgent: selectedAgent,
            taskRegistry: taskRegistry,
            toolUseId: ctx.toolUseId,
            cwd: effectiveCwd
          });
        if (!kr()) E5e(ownerAgentId, `agent:${asyncAgentId}`, taskRegistry);
        let asyncAgentContext = {
          agentId: asyncAgentId,
          parentAgentId: parentAgentId,
          depth: spawnDepth,
          parentSessionId: H3(),
          agentType: "subagent",
          subagentName: selectedAgent.agentType,
          displayName: displayName,
          isAsync: !0,
          isBuiltIn: Gh(selectedAgent),
          invokingRequestId: parentInvocation?.requestId,
          invocationKind: "spawn",
          invocationEmitted: !1
        };
        Q5(asyncAgentContext, () => Npe(effectiveCwd, () => E6e({
          taskId: asyncTask.agentId,
          abortController: asyncTask.abortController,
          makeStream: (onCacheSafeParams, onQueryProgress) => Q$({
            ...spawnOptions,
            override: {
              ...spawnOptions.override,
              agentId: cd(asyncTask.agentId),
              agentContext: asyncAgentContext,
              abortController: asyncTask.abortController
            },
            onCacheSafeParams: onCacheSafeParams,
            onQueryProgress: onQueryProgress
          }),
          metadata: spawnMetadata,
          description: description,
          toolUseContext: ctx,
          taskRegistry: taskRegistry,
          agentIdForCleanup: asyncAgentId,
          enableSummarization: someSentinel2 || forkSummarizationFlag || Nbe(),
          getWorktreeResult: finalizeWorktree
        })));
        let canReadOutputFile = ctx.options.tools.some(toolDef => Gl(toolDef, vs) || Gl(toolDef, Mo));
        return He("subagent_launch"), {
          data: {
            isAsync: !0,
            status: "async_launched",
            agentId: asyncTask.agentId,
            description: description,
            resolvedModel: resolvedModel,
            prompt: prompt,
            outputFile: gf(asyncTask.agentId),
            canReadOutputFile: canReadOutputFile
          }
        };
      } else {
        let syncAgentId = cd(spawnRequestId),
          syncAgentContext = {
            agentId: syncAgentId,
            parentAgentId: parentAgentId,
            depth: spawnDepth,
            parentSessionId: H3(),
            agentType: "subagent",
            subagentName: selectedAgent.agentType,
            displayName: displayName,
            isAsync: !1,
            isBuiltIn: Gh(selectedAgent),
            invokingRequestId: parentInvocation?.requestId,
            invocationKind: "spawn",
            invocationEmitted: !1
          };
        return Q5(syncAgentContext, () => Npe(effectiveCwd, async () => {
          let syncStartTime = Date.now();
          if (promptMessages.length > 0) {
            let firstUserMessage = ST(promptMessages).find(message => message.type === "user");
            if (firstUserMessage && firstUserMessage.type === "user" && emit) emit({
              type: "progress",
              toolUseID: `agent_${parentInvocation.message.id}`,
              data: {
                message: firstUserMessage,
                type: "agent_progress",
                prompt: prompt,
                agentId: syncAgentId,
                agentType: selectedAgent.agentType,
                description: description,
                resolvedModel: resolvedModel
              }
            });
          }
          let syncTask = jza({
              agentId: syncAgentId,
              ownerAgentId: ownerAgentId,
              parentAgentId: parentAgentId,
              spawnDepth: spawnDepth,
              description: description,
              prompt: prompt,
              selectedAgent: selectedAgent,
              taskRegistry: taskRegistry,
              toolUseId: ctx.toolUseId,
              autoBackgroundMs: bqt ? void 0 : rUp() || void 0,
              cwd: effectiveCwd
            }),
            syncTaskId = syncTask.taskId,
            cancelAutoBackground = syncTask.cancelAutoBackground,
            syncAbortController = syncTask.abortController,
            detachAbortLink = iqi(ctx.abortController, syncAbortController),
            backgrounded = !1;
          He("subagent_launch");
          let collectedMessages = [],
            forwardSubagentText = ctx.options.forwardSubagentText,
            onMessage = streamEvent => {
              if (backgrounded) return;
              if (streamEvent.type === "spinner_mode") return;
              if (streamEvent.type !== "api_metrics" && streamEvent.type !== "set_in_progress_tool_use_ids") collectedMessages.push(streamEvent);
              if (!emit) return;
              if (streamEvent.type === "api_metrics") {
                emit(streamEvent);
                return;
              }
              if (streamEvent.type === "set_in_progress_tool_use_ids") return;
              if (streamEvent.type === "progress" && (streamEvent.data.type === "bash_progress" || streamEvent.data.type === "powershell_progress")) emit({
                type: "progress",
                toolUseID: streamEvent.toolUseID,
                data: streamEvent.data
              });
              if (streamEvent.type !== "assistant" && streamEvent.type !== "user") return;
              if (streamEvent.type === "assistant") {
                let responseLength = fHn(streamEvent);
                if (responseLength > 0) emit({
                  type: "response_length",
                  op: "add",
                  delta: responseLength
                });
              }
              for (let message of ST([streamEvent])) {
                let firstContentBlock = message.message.content[0];
                if (!forwardSubagentText && firstContentBlock.type !== "tool_use" && firstContentBlock.type !== "tool_result") continue;
                emit({
                  type: "progress",
                  toolUseID: `agent_${parentInvocation.message.id}`,
                  data: {
                    message: message,
                    type: "agent_progress",
                    prompt: "",
                    agentId: syncAgentId,
                    agentType: selectedAgent.agentType,
                    description: description,
                    resolvedModel: resolvedModel
                  }
                });
              }
            },
            backgroundHintTimer = bqt ? void 0 : setTimeout(timerContext => {
              if (timerContext.setToolJSX?.({
                jsx: Kza.jsx(Yxe, {}),
                shouldHidePromptInput: !1,
                shouldContinueAnimation: !0,
                showSpinner: !0
              }), timerContext.toolUseId) timerContext.emitToolProgress?.({
                kind: "background_hint",
                toolUseId: timerContext.toolUseId
              });
            }, nUp, ctx),
            worktreeResult = {},
            getWorktreeResult = async () => (worktreeResult = await finalizeWorktree(), worktreeResult),
            runPromise = E6e({
              taskId: syncTaskId,
              abortController: syncAbortController,
              makeStream: (onCacheSafeParams, onQueryProgress) => Q$({
                ...spawnOptions,
                override: {
                  ...spawnOptions.override,
                  agentId: syncAgentId,
                  agentContext: syncAgentContext,
                  abortController: syncAbortController
                },
                onCacheSafeParams: onCacheSafeParams,
                onQueryProgress: onQueryProgress
              }),
              metadata: spawnMetadata,
              description: description,
              toolUseContext: ctx,
              taskRegistry: taskRegistry,
              agentIdForCleanup: syncAgentId,
              enableSummarization: Nbe(),
              getWorktreeResult: getWorktreeResult,
              onMessage: onMessage,
              shouldNotifyOwner: () => backgrounded
            }),
            recoveredError;
          try {
            let raceOutcome;
            try {
              raceOutcome = bqt ? await runPromise.then(() => "done") : await Promise.race([runPromise.then(() => "done"), syncTask.backgroundSignal.then(() => "backgrounded")]);
            } catch (runError) {
              if (raceOutcome = "done", runError instanceof $c) {
                if (W("tengu_agent_tool_terminated", {
                  agent_type: spawnMetadata.agentType,
                  model: spawnMetadata.resolvedAgentModel,
                  duration_ms: Date.now() - spawnMetadata.startTime,
                  is_async: !1,
                  is_built_in_agent: spawnMetadata.isBuiltInAgent,
                  agent_depth: spawnMetadata.agentDepth,
                  reason: Ve("user_cancel_sync")
                }), !(syncAbortController.signal.aborted && !ctx.abortController.signal.aborted)) throw runError;
                recoveredError = mo(runError);
              } else A(`Sync agent error: ${Ce(runError)}`, {
                level: "error"
              }), xe("subagent_complete", "subagent_sync_errored"), recoveredError = mo(runError);
            }
            let completedNormally = raceOutcome === "done" && !recoveredError && udt(syncTaskId, taskRegistry);
            if (completedNormally) Cqt(syncTaskId, taskRegistry);
            let registryStatus = taskRegistry.get(syncTaskId)?.status,
              backgroundedWhileFinishing = raceOutcome === "backgrounded" && !completedNormally && registryStatus !== void 0 && registryStatus !== "running" && !udt(syncTaskId, taskRegistry);
            if (raceOutcome === "backgrounded" && !backgroundedWhileFinishing || completedNormally) {
              if (backgrounded = !0, detachAbortLink(), !kr()) E5e(ownerAgentId, `agent:${syncTaskId}`, taskRegistry);
              let canReadOutputFile = ctx.options.tools.some(toolDef => Gl(toolDef, vs) || Gl(toolDef, Mo));
              return {
                data: {
                  isAsync: !0,
                  status: "async_launched",
                  agentId: syncTaskId,
                  description: description,
                  resolvedModel: resolvedModel,
                  prompt: prompt,
                  outputFile: gf(syncTaskId),
                  canReadOutputFile: canReadOutputFile
                }
              };
            }
            let lastMeaningfulMessage = collectedMessages.findLast(message => message.type !== "system" && message.type !== "progress");
            if (lastMeaningfulMessage && Gye(lastMeaningfulMessage)) throw W("tengu_agent_tool_terminated", {
              agent_type: spawnMetadata.agentType,
              model: spawnMetadata.resolvedAgentModel,
              duration_ms: Date.now() - spawnMetadata.startTime,
              is_async: !1,
              is_built_in_agent: spawnMetadata.isBuiltInAgent,
              agent_depth: spawnMetadata.agentDepth,
              reason: Ve("user_cancel_sync")
            }), new $c();
            if (recoveredError) {
              if (!collectedMessages.some(message => message.type === "assistant")) throw recoveredError;
              A(`Sync agent recovering from error with ${collectedMessages.length} messages`);
            }
            let resultSummary = Kdo(collectedMessages, syncAgentId, spawnMetadata, {
              suppressTelemetry: !recoveredError
            });
            {
              let warningText = await jdo({
                agentMessages: collectedMessages,
                tools: ctx.options.tools,
                toolPermissionContext: Mr(ctx),
                abortSignal: ctx.abortController.signal,
                subagentType: selectedAgent.agentType,
                totalToolUseCount: resultSummary.totalToolUseCount
              });
              if (warningText) resultSummary.content = [{
                type: "text",
                text: warningText
              }, ...resultSummary.content];
            }
            return {
              data: {
                status: "completed",
                prompt: prompt,
                ...resultSummary,
                ...worktreeResult
              }
            };
          } finally {
            if (backgroundHintTimer) clearTimeout(backgroundHintTimer);
            if (ctx.setToolJSX?.(null), ctx.toolUseId) ctx.emitToolProgress?.({
              kind: "clear",
              toolUseId: ctx.toolUseId
            });
            if (cancelAutoBackground?.(), detachAbortLink(), !backgrounded) {
              let finalTask = taskRegistry.get(syncTaskId),
                finalProgress = rc(finalTask) ? finalTask.progress : void 0;
              Yza(syncTaskId, taskRegistry), VA({
                type: "system",
                subtype: "task_notification",
                task_id: syncTaskId,
                tool_use_id: ctx.toolUseId,
                status: finalTask?.status === "failed" ? "failed" : finalTask?.status === "killed" ? "stopped" : "completed",
                output_file: "",
                summary: description,
                usage: {
                  total_tokens: finalProgress?.tokenCount ?? 0,
                  tool_uses: finalProgress?.toolUseCount ?? 0,
                  duration_ms: Date.now() - syncStartTime
                }
              });
            }
          }
        }));
      }
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input) {
      let toolInput = input,
        prefixParts = [toolInput.subagent_type, toolInput.mode ? `mode=${toolInput.mode}` : void 0].filter(part => part !== void 0);
      return `${prefixParts.length > 0 ? `(${prefixParts.join(", ")}): ` : ": "}${toolInput.prompt}`;
    },
    isConcurrencySafe() {
      return !0;
    },
    userFacingName: Dmo,
    userFacingNameBackgroundColor: Pmo,
    getActivityDescription(input) {
      return input?.description ?? "Running task";
    },
    async checkPermissions(input, ctx) {
      if (Mr(ctx).mode === "auto") return {
        behavior: "passthrough",
        message: "Agent tool requires permission to spawn subagents."
      };
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      let resultData = result;
      if (typeof resultData === "object" && resultData !== null && "status" in resultData && resultData.status === "teammate_spawned") {
        let teammateResult = resultData;
        return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: [{
            type: "text",
            text: `Spawned successfully.
agent_id: ${teammateResult.teammate_id}
name: ${teammateResult.name}
The agent is now running and will receive instructions via mailbox.`
          }]
        };
      }
      if (result.status === "remote_launched") {
        let remoteResult = result;
        return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: [{
            type: "text",
            text: `Cloud agent launched.
taskId: ${remoteResult.taskId}
session_url: ${remoteResult.sessionUrl}
output_file: ${remoteResult.outputFile}
The agent is running in the cloud. You will be notified automatically when it completes.
Briefly tell the user what you launched and end your response.`
          }]
        };
      }
      if (result.status === "async_launched") {
        let launchSummary = `Async agent launched successfully.
agentId: ${result.agentId} (internal ID - do not mention to user. Use SendMessage with to: '${result.agentId}', summary: '<5-10 word recap>' to continue this agent.)
The agent is working in the background. You will be notified automatically when it completes.`,
          followupHint = result.canReadOutputFile ? `Do not duplicate this agent's work — avoid working with the same files or topics it is using. Work on non-overlapping tasks, or briefly tell the user what you launched and end your response.
output_file: ${result.outputFile}
Do NOT ${vs} or tail this file via the shell tool — it is the full subagent JSONL transcript and reading it will overflow your context. If the user asks for progress, say the agent is still running; you'll get a completion notification.` : "Briefly tell the user what you launched and end your response. Do not generate any other text — agent results will arrive in a subsequent message.",
          asyncText = `${launchSummary}
${followupHint}`;
        return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: [{
            type: "text",
            text: asyncText
          }]
        };
      }
      if (result.status === "completed") {
        let completedResult = result,
          worktreeSuffix = completedResult.worktreePath ? `
worktreePath: ${completedResult.worktreePath}
worktreeBranch: ${completedResult.worktreeBranch}` : "",
          contentBlocks = result.content.length > 0 ? result.content : [{
            type: "text",
            text: "(Subagent completed but returned no output.)"
          }];
        if (result.agentType && Kbi.has(result.agentType) && !worktreeSuffix) return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: contentBlocks
        };
        return {
          tool_use_id: toolUseId,
          type: "tool_result",
          content: [...contentBlocks, {
            type: "text",
            text: `agentId: ${result.agentId} (use SendMessage with to: '${result.agentId}', summary: '<5-10 word recap>' to continue this agent)${worktreeSuffix}
<usage>subagent_tokens: ${result.totalTokens}
tool_uses: ${result.totalToolUseCount}
duration_ms: ${result.totalDurationMs}</usage>`
          }]
        };
      }
      throw xe("subagent_launch", "subagent_unexpected_result_status"), Error(`Unexpected agent tool result status: ${result.status}`);
    },
    renderToolResultMessage: M6a,
    renderToolUseMessage: N6a,
    renderToolUseTag: F6a,
    renderToolUseProgressMessage: Axe,
    renderToolUseRejectedMessage: B6a,
    renderToolUseErrorMessage: U6a,
    renderGroupedToolUse: $6a
  });
});

export {rUp,Vza,Kza,w5e,Xgo,jxe,nUp,bqt,oUp,sUp,Omo,iUp,A6n,Lmo};
