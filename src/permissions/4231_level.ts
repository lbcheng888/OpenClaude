// @ts-nocheck
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Tqt,Ggo} from "../../vendor/m4229.ts";
import {parseUserSpecifiedModel as Qo,Ro} from "./1458_swapShrinksContextWindow.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {cG,_ut,Dd,lG,O0e,wB} from "../config/3893_wB.ts";
import {xe,mn} from "../telemetry/0600_feature_name.ts";
import {Rf} from "../../vendor/m465.ts";
import {getMainLoopModelOverride as by,getFlagSettingsExpectedContent as JLe,getFlagSettingsPath as YLe,getInlinePlugins as QV,ZV,getInlinePluginUrls as kre,getChromeFlagOverride as Vde,getSessionId as It,lt} from "../session/0132_sent.ts";
import {Ma} from "../../vendor/m2519.ts";
import {ove,Cp} from "../config/2223_level.ts";
import {YFa,kB,but,E9t,C9t} from "../../vendor/m3896.ts";
import {updateTeamFile as rce,removeTeamMember as Xco,sanitizeAgentName as Jco,sanitizeName as f$n,sL} from "../../vendor/m3897.ts";
import {bQ} from "../../vendor/m1459.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {aG,_9t} from "../../vendor/m3889.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {detectAndGetBackend as zxe,resetBackendDetection as yqt,getBackendByType as _qt,isInProcessEnabled as R5e,markInProcessFallback as qgo,sye} from "../../vendor/m4227.ts";
import {isTmuxAvailable as L0e,isInITerm2 as uG,hte} from "../../vendor/m3895.ts";
import {u$n,Kco} from "../../vendor/m3894.ts";
import {kza,Hza,Iza,xza,Dza} from "../../vendor/m4228.ts";
import {hqt,Ogo} from "./4224_planModeRequired.ts";
import {clearMailbox as D9t,writeToMailbox as Bf,isStructuredProtocolMessage as IB,PROTOCOL_FRAME_PROMPT_ERROR as U9t,Pw} from "./3902_writeToMailbox.ts";
import {respawnPaneWithCommand as y6n,Mgo} from "../../vendor/m4225.ts";
import {M$,av,vw} from "../../vendor/m5178.ts";
import {isCustomAgent as v5e,kg} from "./4476_toAgentInfos.ts";
import {Rut,N0e} from "../../vendor/m3898.ts";
import {Kpt,_6n} from "./4220_TEAMMATE_SYSTEM_PROMPT_ADDENDUM.ts";
import {getTeammateModeFromSnapshot as dIe,pIe} from "../../vendor/m3312.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
// Resolve the default teammate model from global config, falling back to Tqt()
function E6n(inheritedModel: any): any {
  let configDefaultModel = Ot().teammateDefaultModel;
  if (configDefaultModel === null) return inheritedModel ?? Tqt();
  if (configDefaultModel !== void 0) {
    let parsedModel = Qo(configDefaultModel);
    if (Oa(parsedModel)) return parsedModel;
    Vgo(configDefaultModel);
  }
  return Tqt();
}
// Resolve the subagent model, honouring env override, "inherit" sentinel, and allowlist
function Kgo(requestedModel: any, mainLoopModel: any): any {
  let envModelOverride = process.env.CLAUDE_CODE_SUBAGENT_MODEL;
  if (envModelOverride && envModelOverride !== "inherit") {
    let parsedEnvModel = Qo(envModelOverride);
    if (Oa(parsedEnvModel)) return parsedEnvModel;
    return Vgo(envModelOverride), E6n(mainLoopModel);
  }
  if (requestedModel === "inherit") return mainLoopModel ?? E6n(mainLoopModel);
  if (requestedModel !== void 0 && !Oa(requestedModel)) return Vgo(requestedModel), E6n(mainLoopModel);
  return requestedModel ?? E6n(mainLoopModel);
}
// Warn when a specified model is not in the allowlist
function Vgo(disallowedModel: any): void {
  A(`Teammate model "${disallowedModel}" is not in the availableModels allowlist; using the default teammate model instead`, {
    level: "warn"
  });
}
// Check whether a named tmux session exists
async function jBp(sessionName: any): Promise<any> {
  return (await Fn(cG, ["has-session", "-t", sessionName])).code === 0;
}
// Ensure a tmux session exists, creating it if missing; throws on failure
async function YBp(sessionName: any): Promise<any> {
  if (!(await jBp(sessionName))) {
    let createResult = await Fn(cG, ["new-session", "-d", "-s", sessionName]);
    if (createResult.code !== 0) throw xe("subagent_launch", "subagent_teammate_tmux_session_failed"), Error(`Failed to create tmux session '${sessionName}': ${createResult.stderr || "Unknown error"}`);
  }
}
// Return path to the current Claude Code executable, honouring env override
function Lza(): any {
  if (process.env[_ut]) return process.env[_ut];
  return Rf() ? process.execPath : process.argv[1];
}
// Build the CLI flag string appended when spawning a subagent
function Mza(options: any): any {
  let flagParts: any[] = [],
    {
      planModeRequired: planModeRequired,
      permissionMode: permissionMode,
      skipModel: skipModel,
      effortValue: effortValue
    } = options || {};
  if (planModeRequired) ;else if (permissionMode === "bypassPermissions") flagParts.push("--dangerously-skip-permissions");else if (permissionMode === "acceptEdits") flagParts.push("--permission-mode acceptEdits");else if (permissionMode === "auto") flagParts.push("--permission-mode auto");
  if (!skipModel) {
    let modelOverride = by();
    if (modelOverride) flagParts.push(`--model ${Ma([modelOverride])}`);
  }
  if (typeof effortValue === "string" && ove()) flagParts.push(`--effort ${effortValue}`);
  let settingsArg = JLe() ?? YLe();
  if (settingsArg) flagParts.push(`--settings ${Ma([settingsArg])}`);
  let inlinePlugins = QV();
  for (let pluginDir of inlinePlugins) flagParts.push(`--plugin-dir ${Ma([pluginDir])}`);
  for (let pluginDirNoMcp of ZV()) flagParts.push(`--plugin-dir-no-mcp ${Ma([pluginDirNoMcp])}`);
  for (let pluginUrl of kre()) flagParts.push(`--plugin-url ${Ma([pluginUrl])}`);
  let chromeOverride = Vde();
  if (chromeOverride === !0) flagParts.push("--chrome");else if (chromeOverride === !1) flagParts.push("--no-chrome");
  return flagParts.join(" ");
}
// Reserve a teammate identity in the team file, then run callback; rolls back on error
async function zgo(agentName: any, teamName: any, spawnOptions: any, teammateColors: any, callback: any): Promise<any> {
  for (let [fieldName, fieldValue] of [["name", agentName], ["team_name", teamName]]) if (YFa(fieldValue)) throw xe("subagent_launch", "subagent_teammate_control_chars"), Error(fieldName === "name" ? "Invalid name: control characters are not allowed in agent or team names" : "Invalid team_name: control characters are not allowed in agent or team names");
  let reservedIdentity = await rce(teamName, teamFile => {
    let sanitizedName = JBp(agentName, teamFile),
      teammateId = bQ(sanitizedName, teamName),
      teammateColor = teammateColors.assign(teammateId);
    return teamFile.members.push({
      agentId: teammateId,
      name: sanitizedName,
      color: teammateColor,
      joinedAt: Date.now(),
      tmuxPaneId: "",
      subscriptions: [],
      ...spawnOptions
    }), {
      sanitizedName: sanitizedName,
      teammateId: teammateId,
      teammateColor: teammateColor
    };
  });
  if (!reservedIdentity) throw xe("subagent_launch", "subagent_teammate_internal_invariant"), Error("reserveTeammateIdentity: updateTeamFile returned undefined");
  let committed = !1,
    cleanupFn: any;
  try {
    return await callback(reservedIdentity, () => {
      committed = !0;
    }, fn => {
      cleanupFn = fn;
    });
  } catch (spawnError) {
    if (!committed) {
      if (cleanupFn) try {
        await cleanupFn();
      } catch (cleanupError) {
        A(`[spawnTeammate] pane cleanup failed for ${reservedIdentity.teammateId}: ${Ce(cleanupError)}`);
      }
      await Xco(teamName, reservedIdentity.teammateId);
    } else A(`[spawnTeammate] post-commit failure for ${reservedIdentity.teammateId}; entry kept (agent already running): ${Ce(spawnError)}`);
    throw spawnError;
  }
}
// Persist the tmux pane ID and backend type for a teammate after launch
async function jgo(teamName: any, teammateId: any, paneInfo: any): Promise<any> {
  await rce(teamName, teamFile => {
    let member = teamFile.members.find(m => m.agentId === teammateId);
    if (!member) return !1;
    member.tmuxPaneId = paneInfo.tmuxPaneId, member.backendType = paneInfo.backendType;
  });
}
// Produce a unique sanitized agent name within the team, appending numeric suffix if needed
function JBp(rawName: any, teamFile: any): any {
  let sanitized = Jco(rawName);
  if (sanitized === aG) throw Error('"main" is a reserved recipient name (SendMessage routes it to the main conversation) \u2014 choose another teammate name.');
  let existingNames = new Set(teamFile.members.map(member => member.name.toLowerCase()));
  if (!existingNames.has(sanitized.toLowerCase())) return sanitized;
  let suffix = 2;
  while (existingNames.has(`${sanitized}-${suffix}`.toLowerCase())) suffix++;
  return `${sanitized}-${suffix}`;
}
// Spawn a teammate using the split-pane (iTerm2/native) backend
async function XBp(spawnParams: any, context: any): Promise<any> {
  let {
      setAppState: setAppState,
      getAppState: getAppState
    } = context,
    {
      name: name,
      prompt: prompt,
      agent_type: agentType,
      cwd: cwd,
      plan_mode_required: planModeRequired
    } = spawnParams,
    resolvedModel = Kgo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw xe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let appState = getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!teamName) throw xe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  let workingDir = cwd || Lt();
  return zgo(name, teamName, {
    agentType: agentType,
    model: resolvedModel,
    prompt: prompt,
    planModeRequired: planModeRequired,
    cwd: workingDir
  }, context.teammateColors, async ({
    sanitizedName: sanitizedName,
    teammateId: teammateId,
    teammateColor: teammateColor
  }, commitFn: any, registerCleanup: any) => {
    let backend = await zxe();
    if (backend.needsIt2Setup && context.requestDialog) {
      let tmuxAvail = await L0e(),
        dialogResult = await context.requestDialog(u$n, {
          tmuxAvailable: tmuxAvail
        });
      if (dialogResult === "cancelled") throw xe("subagent_launch", "subagent_teammate_iterm_cancelled"), new kB("Teammate spawn cancelled - iTerm2 setup required");
      if (dialogResult === "installed" || dialogResult === "use-tmux") yqt(), backend = await zxe();
    }
    let insideTmux = await kza(),
      {
        paneId: paneId,
        isFirstTeammate: isFirstTeammate
      } = await Hza(sanitizedName, teammateColor);
    if (registerCleanup(() => backend.backend.killPane(paneId, !insideTmux)), await jgo(teamName, teammateId, {
      tmuxPaneId: paneId,
      backendType: backend.backend.type
    }), isFirstTeammate && insideTmux) await Iza();
    let execPath = Lza(),
      agentFlags = [`--agent-id ${Ma([teammateId])}`, `--agent-name ${Ma([sanitizedName])}`, `--team-name ${Ma([teamName])}`, `--agent-color ${Ma([teammateColor])}`, `--parent-session-id ${Ma([It()])}`, planModeRequired ? "--plan-mode-required" : "", agentType ? `--agent-type ${Ma([agentType])}` : ""].filter(Boolean).join(" "),
      cliFlags = Mza({
        planModeRequired: planModeRequired,
        permissionMode: appState.toolPermissionContext.mode,
        effortValue: appState.effortValue,
        skipModel: !!resolvedModel
      });
    if (resolvedModel) cliFlags = cliFlags ? `${cliFlags} --model ${Ma([resolvedModel])}` : `--model ${Ma([resolvedModel])}`;
    let cliFlagsSuffix = cliFlags ? ` ${cliFlags}` : "",
      envBlock = hqt(),
      launchCmd = `cd ${Ma([workingDir])} && env ${envBlock} ${Ma([execPath])} ${agentFlags}${cliFlagsSuffix}`;
    await D9t(sanitizedName, teamName), await Bf(sanitizedName, {
      from: Dd,
      text: prompt,
      timestamp: new Date().toISOString()
    }, teamName), await xza(paneId, launchCmd, !insideTmux), commitFn();
    let tmuxSessionName = insideTmux ? "current" : lG,
      tmuxWindowName = insideTmux ? "current" : "swarm-view";
    return setAppState(prevState => ({
      ...prevState,
      teamContext: {
        ...prevState.teamContext,
        teamName: teamName ?? prevState.teamContext?.teamName ?? "default",
        teamFilePath: prevState.teamContext?.teamFilePath ?? "",
        leadAgentId: prevState.teamContext?.leadAgentId ?? "",
        teammates: {
          ...(prevState.teamContext?.teammates || {}),
          [teammateId]: {
            name: sanitizedName,
            agentType: agentType,
            color: teammateColor,
            tmuxSessionName: tmuxSessionName,
            tmuxPaneId: paneId,
            cwd: workingDir,
            spawnedAt: Date.now()
          }
        }
      }
    })), Nza(context.taskRegistry, {
      teammateId: teammateId,
      sanitizedName: sanitizedName,
      teamName: teamName,
      teammateColor: teammateColor,
      prompt: prompt,
      plan_mode_required: planModeRequired,
      paneId: paneId,
      insideTmux: insideTmux,
      backendType: backend.backend.type,
      toolUseId: context.toolUseId,
      cwd: workingDir
    }), {
      data: {
        teammate_id: teammateId,
        agent_id: teammateId,
        agent_type: agentType,
        model: resolvedModel,
        name: sanitizedName,
        color: teammateColor,
        tmux_session_name: tmuxSessionName,
        tmux_window_name: tmuxWindowName,
        tmux_pane_id: paneId,
        team_name: teamName,
        is_splitpane: !0,
        plan_mode_required: planModeRequired
      }
    };
  });
}
// Spawn a teammate using the classic tmux-window backend
async function QBp(spawnParams: any, context: any): Promise<any> {
  let {
      setAppState: setAppState,
      getAppState: getAppState
    } = context,
    {
      name: name,
      prompt: prompt,
      agent_type: agentType,
      cwd: cwd,
      plan_mode_required: planModeRequired
    } = spawnParams,
    resolvedModel = Kgo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw xe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let appState = getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!teamName) throw xe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  let workingDir = cwd || Lt();
  return zgo(name, teamName, {
    agentType: agentType,
    model: resolvedModel,
    prompt: prompt,
    planModeRequired: planModeRequired,
    cwd: workingDir
  }, context.teammateColors, async ({
    sanitizedName: sanitizedName,
    teammateId: teammateId,
    teammateColor: teammateColor
  }, commitFn: any, registerCleanup: any) => {
    let tmuxWindowName = `teammate-${f$n(sanitizedName)}`;
    await YBp(lG);
    let newWindowResult = await Fn(cG, ["new-window", "-t", lG, "-n", tmuxWindowName, "-P", "-F", "#{pane_id}", "--", O0e]);
    if (newWindowResult.code !== 0) throw xe("subagent_launch", "subagent_teammate_tmux_window_failed"), Error(`Failed to create tmux window: ${newWindowResult.stderr}`);
    let paneId = newWindowResult.stdout.trim();
    registerCleanup(() => Fn(cG, ["kill-pane", "-t", paneId])), await jgo(teamName, teammateId, {
      tmuxPaneId: paneId,
      backendType: "tmux"
    });
    let execPath = Lza(),
      agentFlags = [`--agent-id ${Ma([teammateId])}`, `--agent-name ${Ma([sanitizedName])}`, `--team-name ${Ma([teamName])}`, `--agent-color ${Ma([teammateColor])}`, `--parent-session-id ${Ma([It()])}`, planModeRequired ? "--plan-mode-required" : "", agentType ? `--agent-type ${Ma([agentType])}` : ""].filter(Boolean).join(" "),
      cliFlags = Mza({
        planModeRequired: planModeRequired,
        permissionMode: appState.toolPermissionContext.mode,
        effortValue: appState.effortValue,
        skipModel: !!resolvedModel
      });
    if (resolvedModel) cliFlags = cliFlags ? `${cliFlags} --model ${Ma([resolvedModel])}` : `--model ${Ma([resolvedModel])}`;
    let cliFlagsSuffix = cliFlags ? ` ${cliFlags}` : "",
      envBlock = hqt(),
      launchCmd = `cd ${Ma([workingDir])} && env ${envBlock} ${Ma([execPath])} ${agentFlags}${cliFlagsSuffix}`;
    await D9t(sanitizedName, teamName), await Bf(sanitizedName, {
      from: Dd,
      text: prompt,
      timestamp: new Date().toISOString()
    }, teamName);
    try {
      but(launchCmd);
    } catch (controlCharError) {
      throw xe("subagent_launch", "subagent_teammate_control_chars"), controlCharError;
    }
    try {
      await y6n([], paneId, launchCmd);
    } catch (respawnError) {
      throw xe("subagent_launch", "subagent_teammate_tmux_respawn_failed"), respawnError;
    }
    return commitFn(), setAppState(prevState => ({
      ...prevState,
      teamContext: {
        ...prevState.teamContext,
        teamName: teamName ?? prevState.teamContext?.teamName ?? "default",
        teamFilePath: prevState.teamContext?.teamFilePath ?? "",
        leadAgentId: prevState.teamContext?.leadAgentId ?? "",
        teammates: {
          ...(prevState.teamContext?.teammates || {}),
          [teammateId]: {
            name: sanitizedName,
            agentType: agentType,
            color: teammateColor,
            tmuxSessionName: lG,
            tmuxPaneId: paneId,
            cwd: workingDir,
            spawnedAt: Date.now()
          }
        }
      }
    })), Nza(context.taskRegistry, {
      teammateId: teammateId,
      sanitizedName: sanitizedName,
      teamName: teamName,
      teammateColor: teammateColor,
      prompt: prompt,
      plan_mode_required: planModeRequired,
      paneId: paneId,
      insideTmux: !1,
      backendType: "tmux",
      toolUseId: context.toolUseId,
      cwd: workingDir
    }), {
      data: {
        teammate_id: teammateId,
        agent_id: teammateId,
        agent_type: agentType,
        model: resolvedModel,
        name: sanitizedName,
        color: teammateColor,
        tmux_session_name: lG,
        tmux_window_name: tmuxWindowName,
        tmux_pane_id: paneId,
        team_name: teamName,
        is_splitpane: !1,
        plan_mode_required: planModeRequired
      }
    };
  });
}
// Register an in-process teammate task and wire its abort signal to pane cleanup
function Nza(taskRegistry: any, {
  teammateId: teammateId,
  sanitizedName: sanitizedName,
  teamName: teamName,
  teammateColor: teammateColor,
  prompt: prompt,
  plan_mode_required: planModeRequired,
  paneId: paneId,
  insideTmux: insideTmux,
  backendType: backendType,
  toolUseId: toolUseId,
  cwd: cwd
}: any): void {
  let taskType = M$("in_process_teammate"),
    promptSnippet = `${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}`,
    abortController = new AbortController(),
    taskEntry: any = {
      ...av(taskType, "in_process_teammate", promptSnippet, toolUseId),
      type: "in_process_teammate",
      status: "running",
      cwd: cwd,
      identity: {
        agentId: teammateId,
        agentName: sanitizedName,
        teamName: teamName,
        color: teammateColor,
        planModeRequired: planModeRequired ?? !1,
        parentSessionId: It()
      },
      prompt: prompt,
      abortController: abortController,
      awaitingPlanApproval: !1,
      permissionMode: planModeRequired ? "plan" : "default",
      isIdle: !1,
      shutdownRequested: !1,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      pendingUserMessages: []
    };
  taskRegistry.register(taskEntry), abortController.signal.addEventListener("abort", () => {
    if (E9t(backendType)) _qt(backendType).killPane(paneId, !insideTmux);
  }, {
    once: !0
  });
}
// Spawn a teammate in-process (no tmux/pane required)
async function Pza(spawnParams: any, context: any): Promise<any> {
  let {
      setAppState: setAppState,
      getAppState: getAppState
    } = context,
    {
      name: name,
      prompt: prompt,
      agent_type: agentType,
      plan_mode_required: planModeRequired
    } = spawnParams,
    resolvedModel = Kgo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw xe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let teamName = getAppState().teamContext?.teamName;
  if (!teamName) throw xe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  return zgo(name, teamName, {
    agentType: agentType,
    model: resolvedModel,
    prompt: prompt,
    planModeRequired: planModeRequired,
    cwd: Lt()
  }, context.teammateColors, async ({
    sanitizedName: sanitizedName,
    teammateId: teammateId,
    teammateColor: teammateColor
  }, commitFn: any) => {
    await jgo(teamName, teammateId, {
      tmuxPaneId: "in-process",
      backendType: "in-process"
    });
    let agentDefinition: any;
    if (agentType) {
      let matchedAgent = context.options.agentDefinitions.activeAgents.find(agentDef => agentDef.agentType === agentType);
      if (matchedAgent && v5e(matchedAgent)) agentDefinition = matchedAgent;
      A(`[handleSpawnInProcess] agent_type=${agentType}, found=${!!agentDefinition}`);
    }
    let spawnIdentity = {
      name: sanitizedName,
      teamName: teamName,
      prompt: prompt,
      color: teammateColor,
      planModeRequired: planModeRequired ?? !1,
      model: resolvedModel
    };
    await D9t(sanitizedName, teamName);
    let spawnResult = await Rut(spawnIdentity, context);
    if (!spawnResult.ok) throw xe("subagent_launch", "subagent_teammate_inprocess_failed"), A(`[handleSpawnInProcess] spawn failed: ${spawnResult.error}`), Error("Failed to spawn in-process teammate");
    commitFn(), Kpt({
      identity: spawnResult.identity,
      taskId: spawnResult.taskId,
      prompt: prompt,
      description: spawnParams.description,
      model: resolvedModel,
      agentDefinition: agentDefinition,
      teammateContext: spawnResult.teammateContext,
      toolUseContext: {
        ...context,
        messages: []
      },
      abortController: spawnResult.abortController,
      invokingRequestId: spawnParams.invokingRequestId
    }), A(`[handleSpawnInProcess] Started agent execution for ${teammateId}`);
    let existingLeadAgentId = getAppState().teamContext?.leadAgentId,
      isNewLeader = !existingLeadAgentId,
      leadAgentId = existingLeadAgentId ?? bQ(Dd, teamName),
      leadAgentColor = isNewLeader ? context.teammateColors.assign(leadAgentId) : void 0;
    return setAppState(prevState => {
      let existingTeammates = prevState.teamContext?.teammates || {},
        leaderEntry = isNewLeader ? {
          [leadAgentId]: {
            name: Dd,
            agentType: Dd,
            color: leadAgentColor,
            tmuxSessionName: "in-process",
            tmuxPaneId: "leader",
            cwd: Lt(),
            spawnedAt: Date.now()
          }
        } : {};
      return {
        ...prevState,
        teamContext: {
          ...prevState.teamContext,
          teamName: teamName ?? prevState.teamContext?.teamName ?? "default",
          teamFilePath: prevState.teamContext?.teamFilePath ?? "",
          leadAgentId: leadAgentId,
          teammates: {
            ...existingTeammates,
            ...leaderEntry,
            [teammateId]: {
              name: sanitizedName,
              agentType: agentType,
              color: teammateColor,
              tmuxSessionName: "in-process",
              tmuxPaneId: "in-process",
              cwd: Lt(),
              spawnedAt: Date.now()
            }
          }
        }
      };
    }), {
      data: {
        teammate_id: teammateId,
        agent_id: teammateId,
        agent_type: agentType,
        model: resolvedModel,
        name: sanitizedName,
        color: teammateColor,
        tmux_session_name: "in-process",
        tmux_window_name: "in-process",
        tmux_pane_id: "in-process",
        team_name: teamName,
        is_splitpane: !1,
        plan_mode_required: planModeRequired
      }
    };
  });
}
// Top-level spawn dispatcher: validates prompt then routes to the right backend
async function ZBp(spawnParams: any, context: any, notify: any): Promise<any> {
  if (spawnParams.prompt && IB(spawnParams.prompt)) throw xe("subagent_launch", "subagent_teammate_protocol_frame_prompt"), Error(U9t);
  if (R5e()) return Pza(spawnParams, context);
  try {
    await zxe();
  } catch (backendError) {
    if (dIe() !== "auto") throw xe("subagent_launch", "subagent_teammate_pane_unavailable"), backendError;
    return A(`[handleSpawn] No pane backend available, falling back to in-process: ${Ce(backendError)}`), qgo(), eUp(notify), Pza(spawnParams, context);
  }
  if (spawnParams.use_splitpane !== !1) return XBp(spawnParams, context);
  return QBp(spawnParams, context);
}
// Emit a one-time notification when auto-fallback to in-process teammate occurs
function eUp(notify: any): void {
  if (Oza) return;
  Oza = !0;
  let hint = uG() ? 'To force iTerm2 panes, set teammateMode: "iterm2" in settings and enable the iTerm2 Python API (Preferences > General > Magic).' : 'To use terminal panes, set teammateMode: "tmux" in settings.';
  notify?.({
    type: "notification",
    notification: {
      key: "teammate-auto-fallback",
      text: `Couldn't open a teammate pane \u2014 running in-process instead. ${hint}`,
      color: "warning",
      priority: "high"
    }
  });
}
// Public entry point for spawning a teammate (delegates to ZBp)
async function Fza(spawnParams: any, context: any, notify: any): Promise<any> {
  return ZBp(spawnParams, context, notify);
}
// Guard flag ensuring the auto-fallback notification fires only once
var Oza = !1;
// Module initializer — eagerly load all side-effectful dependency modules
var Bza = b(() => {
  lt();
  Kco();
  mn();
  vw();
  _9t();
  tr();
  Po();
  qe();
  Cp();
  Ct();
  Ii();
  Ro();
  eO();
  hte();
  sye();
  Mgo();
  pIe();
  C9t();
  wB();
  _6n();
  N0e();
  Ogo();
  sL();
  Dza();
  Ggo();
  Pw();
  kg();
});

export {E6n,Kgo,Vgo,jBp,YBp,Lza,Mza,zgo,jgo,JBp,XBp,QBp,Nza,Pza,ZBp,eUp,Fza,Oza,Bza};
