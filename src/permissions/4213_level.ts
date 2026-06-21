// @ts-nocheck
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {t3t,zdo} from "../../vendor/m4211.ts";
import {parseUserSpecifiedModel,Mo} from "./1453_swapShrinksContextWindow.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {execFileNoThrow,oa} from "../../vendor/m684.ts";
import {qW,_lt,np,$W,WHe,aU} from "../config/3875_aU.ts";
import {Oe,ln} from "../telemetry/0594_feature_name.ts";
import {_A} from "../../vendor/m459.ts";
import {getMainLoopModelOverride,getFlagSettingsExpectedContent,getFlagSettingsPath,getInlinePlugins,getInlinePluginsNoMcp,getInlinePluginUrls,getChromeFlagOverride,getSessionId,lt} from "../session/0131_sent.ts";
import {Xa} from "../../vendor/m2509.ts";
import {CDa,lU,Tlt,JUt,XUt} from "../../vendor/m3878.ts";
import {updateTeamFile,removeTeamMember,sanitizeAgentName,sanitizeName,BL} from "../../vendor/m3879.ts";
import {vQ} from "../../vendor/m1454.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {LY,WUt} from "../../vendor/m3871.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {detectAndGetBackend,resetBackendDetection,getBackendByType,isInProcessEnabled,markInProcessFallback,VHe} from "../../vendor/m4209.ts";
import {isTmuxAvailable,Tte} from "../../vendor/m3877.ts";
import {uFn,eso} from "../../vendor/m3876.ts";
import {u8a,d8a,p8a,m8a,f8a} from "../../vendor/m4210.ts";
import {Q9t,Bdo} from "./4206_planModeRequired.ts";
import {clearMailbox,writeToMailbox,isStructuredProtocolMessage,PROTOCOL_FRAME_PROMPT_ERROR,Tx} from "./3886_writeToMailbox.ts";
import {respawnPaneWithCommand,Udo} from "../../vendor/m4207.ts";
import {d9,uI,Ax} from "../../vendor/m5146.ts";
import {isCustomAgent,scrubPathsConfig} from "./4454_toAgentInfos.ts";
import {Clt,zHe} from "../../vendor/m3880.ts";
import {Wut,d3n} from "./4203_TEAMMATE_SYSTEM_PROMPT_ADDENDUM.ts";
import {getTeammateModeFromSnapshot,vke} from "../../vendor/m3296.ts";
import {b} from "../../runtime.ts";
// Resolve the default teammate model from global config, falling back to t3t()
function h3n(inheritedModel: any): any {
  let configDefaultModel = getGlobalConfig().teammateDefaultModel;
  if (configDefaultModel === null) return inheritedModel ?? t3t();
  if (configDefaultModel !== void 0) {
    let parsedModel = parseUserSpecifiedModel(configDefaultModel);
    if (isModelAllowed(parsedModel)) return parsedModel;
    Ydo(configDefaultModel);
  }
  return t3t();
}
// Resolve the subagent model, honouring env override, "inherit" sentinel, and allowlist
function Jdo(requestedModel: any, mainLoopModel: any): any {
  let envModelOverride = process.env.CLAUDE_CODE_SUBAGENT_MODEL;
  if (envModelOverride && envModelOverride !== "inherit") {
    let parsedEnvModel = parseUserSpecifiedModel(envModelOverride);
    if (isModelAllowed(parsedEnvModel)) return parsedEnvModel;
    return Ydo(envModelOverride), h3n(mainLoopModel);
  }
  if (requestedModel === "inherit") return mainLoopModel ?? h3n(mainLoopModel);
  if (requestedModel !== void 0 && !isModelAllowed(requestedModel)) return Ydo(requestedModel), h3n(mainLoopModel);
  return requestedModel ?? h3n(mainLoopModel);
}
// Warn when a specified model is not in the allowlist
function Ydo(disallowedModel: any): void {
  logForDebugging(`Teammate model "${disallowedModel}" is not in the availableModels allowlist; using the default teammate model instead`, {
    level: "warn"
  });
}
// Check whether a named tmux session exists
async function HDp(sessionName: any): Promise<any> {
  return (await execFileNoThrow(qW, ["has-session", "-t", sessionName])).code === 0;
}
// Ensure a tmux session exists, creating it if missing; throws on failure
async function IDp(sessionName: any): Promise<any> {
  if (!(await HDp(sessionName))) {
    let createResult = await execFileNoThrow(qW, ["new-session", "-d", "-s", sessionName]);
    if (createResult.code !== 0) throw Oe("subagent_launch", "subagent_teammate_tmux_session_failed"), Error(`Failed to create tmux session '${sessionName}': ${createResult.stderr || "Unknown error"}`);
  }
}
// Return path to the current Claude Code executable, honouring env override
function h8a(): any {
  if (process.env[_lt]) return process.env[_lt];
  return _A() ? process.execPath : process.argv[1];
}
// Build the CLI flag string appended when spawning a subagent
function g8a(options: any): any {
  let flagParts: any[] = [],
    {
      planModeRequired: planModeRequired,
      permissionMode: permissionMode,
      skipModel: skipModel
    } = options || {};
  if (planModeRequired) ;else if (permissionMode === "bypassPermissions") flagParts.push("--dangerously-skip-permissions");else if (permissionMode === "acceptEdits") flagParts.push("--permission-mode acceptEdits");else if (permissionMode === "auto") flagParts.push("--permission-mode auto");
  if (!skipModel) {
    let modelOverride = getMainLoopModelOverride();
    if (modelOverride) flagParts.push(`--model ${Xa([modelOverride])}`);
  }
  let settingsArg = getFlagSettingsExpectedContent() ?? getFlagSettingsPath();
  if (settingsArg) flagParts.push(`--settings ${Xa([settingsArg])}`);
  let inlinePlugins = getInlinePlugins();
  for (let pluginDir of inlinePlugins) flagParts.push(`--plugin-dir ${Xa([pluginDir])}`);
  for (let pluginDirNoMcp of getInlinePluginsNoMcp()) flagParts.push(`--plugin-dir-no-mcp ${Xa([pluginDirNoMcp])}`);
  for (let pluginUrl of getInlinePluginUrls()) flagParts.push(`--plugin-url ${Xa([pluginUrl])}`);
  let chromeOverride = getChromeFlagOverride();
  if (chromeOverride === !0) flagParts.push("--chrome");else if (chromeOverride === !1) flagParts.push("--no-chrome");
  return flagParts.join(" ");
}
// Reserve a teammate identity in the team file, then run callback; rolls back on error
async function Xdo(agentName: any, teamName: any, spawnOptions: any, teammateColors: any, callback: any): Promise<any> {
  for (let [fieldName, fieldValue] of [["name", agentName], ["team_name", teamName]]) if (CDa(fieldValue)) throw Oe("subagent_launch", "subagent_teammate_control_chars"), Error(fieldName === "name" ? "Invalid name: control characters are not allowed in agent or team names" : "Invalid team_name: control characters are not allowed in agent or team names");
  let reservedIdentity = await updateTeamFile(teamName, (teamFile: any) => {
    let sanitizedName = DDp(agentName, teamFile),
      teammateId = vQ(sanitizedName, teamName),
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
  if (!reservedIdentity) throw Oe("subagent_launch", "subagent_teammate_internal_invariant"), Error("reserveTeammateIdentity: updateTeamFile returned undefined");
  let committed = !1,
    cleanupFn: any;
  try {
    return await callback(reservedIdentity, () => {
      committed = !0;
    }, (fn: any) => {
      cleanupFn = fn;
    });
  } catch (spawnError) {
    if (!committed) {
      if (cleanupFn) try {
        await cleanupFn();
      } catch (cleanupError) {
        logForDebugging(`[spawnTeammate] pane cleanup failed for ${reservedIdentity.teammateId}: ${Se(cleanupError)}`);
      }
      await removeTeamMember(teamName, reservedIdentity.teammateId);
    } else logForDebugging(`[spawnTeammate] post-commit failure for ${reservedIdentity.teammateId}; entry kept (agent already running): ${Se(spawnError)}`);
    throw spawnError;
  }
}
// Persist the tmux pane ID and backend type for a teammate after launch
async function Qdo(teamName: any, teammateId: any, paneInfo: any): Promise<any> {
  await updateTeamFile(teamName, (teamFile: any) => {
    let member = teamFile.members.find((m: any) => m.agentId === teammateId);
    if (!member) return !1;
    member.tmuxPaneId = paneInfo.tmuxPaneId, member.backendType = paneInfo.backendType;
  });
}
// Produce a unique sanitized agent name within the team, appending numeric suffix if needed
function DDp(rawName: any, teamFile: any): any {
  let sanitized = sanitizeAgentName(rawName);
  if (sanitized === LY) throw Error('"main" is a reserved recipient name (SendMessage routes it to the main conversation) — choose another teammate name.');
  let existingNames = new Set(teamFile.members.map((member: any) => member.name.toLowerCase()));
  if (!existingNames.has(sanitized.toLowerCase())) return sanitized;
  let suffix = 2;
  while (existingNames.has(`${sanitized}-${suffix}`.toLowerCase())) suffix++;
  return `${sanitized}-${suffix}`;
}
// Spawn a teammate using the split-pane (iTerm2/native) backend
async function PDp(spawnParams: any, context: any): Promise<any> {
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
    resolvedModel = Jdo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw Oe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let appState = getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!teamName) throw Oe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  let workingDir = cwd || Pt();
  return Xdo(name, teamName, {
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
    let backend = await detectAndGetBackend();
    if (backend.needsIt2Setup && context.requestDialog) {
      let tmuxAvail = await isTmuxAvailable(),
        dialogResult = await context.requestDialog(uFn, {
          tmuxAvailable: tmuxAvail
        });
      if (dialogResult === "cancelled") throw Oe("subagent_launch", "subagent_teammate_iterm_cancelled"), new lU("Teammate spawn cancelled - iTerm2 setup required");
      if (dialogResult === "installed" || dialogResult === "use-tmux") resetBackendDetection(), backend = await detectAndGetBackend();
    }
    let insideTmux = await u8a(),
      {
        paneId: paneId,
        isFirstTeammate: isFirstTeammate
      } = await d8a(sanitizedName, teammateColor);
    if (registerCleanup(() => backend.backend.killPane(paneId, !insideTmux)), await Qdo(teamName, teammateId, {
      tmuxPaneId: paneId,
      backendType: backend.backend.type
    }), isFirstTeammate && insideTmux) await p8a();
    let execPath = h8a(),
      agentFlags = [`--agent-id ${Xa([teammateId])}`, `--agent-name ${Xa([sanitizedName])}`, `--team-name ${Xa([teamName])}`, `--agent-color ${Xa([teammateColor])}`, `--parent-session-id ${Xa([getSessionId()])}`, planModeRequired ? "--plan-mode-required" : "", agentType ? `--agent-type ${Xa([agentType])}` : ""].filter(Boolean).join(" "),
      cliFlags = g8a({
        planModeRequired: planModeRequired,
        permissionMode: appState.toolPermissionContext.mode,
        skipModel: !!resolvedModel
      });
    if (resolvedModel) cliFlags = cliFlags ? `${cliFlags} --model ${Xa([resolvedModel])}` : `--model ${Xa([resolvedModel])}`;
    let cliFlagsSuffix = cliFlags ? ` ${cliFlags}` : "",
      envBlock = Q9t(),
      launchCmd = `cd ${Xa([workingDir])} && env ${envBlock} ${Xa([execPath])} ${agentFlags}${cliFlagsSuffix}`;
    await clearMailbox(sanitizedName, teamName), await writeToMailbox(sanitizedName, {
      from: np,
      text: prompt,
      timestamp: new Date().toISOString()
    }, teamName), await m8a(paneId, launchCmd, !insideTmux), commitFn();
    let tmuxSessionName = insideTmux ? "current" : $W,
      tmuxWindowName = insideTmux ? "current" : "swarm-view";
    return setAppState((prevState: any) => ({
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
    })), _8a(context.taskRegistry, {
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
async function ODp(spawnParams: any, context: any): Promise<any> {
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
    resolvedModel = Jdo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw Oe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let appState = getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!teamName) throw Oe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  let workingDir = cwd || Pt();
  return Xdo(name, teamName, {
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
    let tmuxWindowName = `teammate-${sanitizeName(sanitizedName)}`;
    await IDp($W);
    let newWindowResult = await execFileNoThrow(qW, ["new-window", "-t", $W, "-n", tmuxWindowName, "-P", "-F", "#{pane_id}", "--", WHe]);
    if (newWindowResult.code !== 0) throw Oe("subagent_launch", "subagent_teammate_tmux_window_failed"), Error(`Failed to create tmux window: ${newWindowResult.stderr}`);
    let paneId = newWindowResult.stdout.trim();
    registerCleanup(() => execFileNoThrow(qW, ["kill-pane", "-t", paneId])), await Qdo(teamName, teammateId, {
      tmuxPaneId: paneId,
      backendType: "tmux"
    });
    let execPath = h8a(),
      agentFlags = [`--agent-id ${Xa([teammateId])}`, `--agent-name ${Xa([sanitizedName])}`, `--team-name ${Xa([teamName])}`, `--agent-color ${Xa([teammateColor])}`, `--parent-session-id ${Xa([getSessionId()])}`, planModeRequired ? "--plan-mode-required" : "", agentType ? `--agent-type ${Xa([agentType])}` : ""].filter(Boolean).join(" "),
      cliFlags = g8a({
        planModeRequired: planModeRequired,
        permissionMode: appState.toolPermissionContext.mode,
        skipModel: !!resolvedModel
      });
    if (resolvedModel) cliFlags = cliFlags ? `${cliFlags} --model ${Xa([resolvedModel])}` : `--model ${Xa([resolvedModel])}`;
    let cliFlagsSuffix = cliFlags ? ` ${cliFlags}` : "",
      envBlock = Q9t(),
      launchCmd = `cd ${Xa([workingDir])} && env ${envBlock} ${Xa([execPath])} ${agentFlags}${cliFlagsSuffix}`;
    await clearMailbox(sanitizedName, teamName), await writeToMailbox(sanitizedName, {
      from: np,
      text: prompt,
      timestamp: new Date().toISOString()
    }, teamName);
    try {
      Tlt(launchCmd);
    } catch (controlCharError) {
      throw Oe("subagent_launch", "subagent_teammate_control_chars"), controlCharError;
    }
    try {
      await respawnPaneWithCommand([], paneId, launchCmd);
    } catch (respawnError) {
      throw Oe("subagent_launch", "subagent_teammate_tmux_respawn_failed"), respawnError;
    }
    return commitFn(), setAppState((prevState: any) => ({
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
            tmuxSessionName: $W,
            tmuxPaneId: paneId,
            cwd: workingDir,
            spawnedAt: Date.now()
          }
        }
      }
    })), _8a(context.taskRegistry, {
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
        tmux_session_name: $W,
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
function _8a(taskRegistry: any, {
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
  let taskType = d9("in_process_teammate"),
    promptSnippet = `${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}`,
    abortController = new AbortController(),
    taskEntry: any = {
      ...uI(taskType, "in_process_teammate", promptSnippet, toolUseId),
      type: "in_process_teammate",
      status: "running",
      cwd: cwd,
      identity: {
        agentId: teammateId,
        agentName: sanitizedName,
        teamName: teamName,
        color: teammateColor,
        planModeRequired: planModeRequired ?? !1,
        parentSessionId: getSessionId()
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
    if (JUt(backendType)) getBackendByType(backendType).killPane(paneId, !insideTmux);
  }, {
    once: !0
  });
}
// Spawn a teammate in-process (no tmux/pane required)
async function A8a(spawnParams: any, context: any): Promise<any> {
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
    resolvedModel = Jdo(spawnParams.model, getAppState().mainLoopModel);
  if (!name || !prompt) throw Oe("subagent_launch", "subagent_teammate_missing_params"), Error("name and prompt are required for spawn operation");
  let teamName = getAppState().teamContext?.teamName;
  if (!teamName) throw Oe("subagent_launch", "subagent_teammate_no_team_name"), Error("Internal error: session team not initialized. This should have happened at startup when agent swarms are enabled.");
  return Xdo(name, teamName, {
    agentType: agentType,
    model: resolvedModel,
    prompt: prompt,
    planModeRequired: planModeRequired,
    cwd: Pt()
  }, context.teammateColors, async ({
    sanitizedName: sanitizedName,
    teammateId: teammateId,
    teammateColor: teammateColor
  }, commitFn: any) => {
    await Qdo(teamName, teammateId, {
      tmuxPaneId: "in-process",
      backendType: "in-process"
    });
    let agentDefinition: any;
    if (agentType) {
      let matchedAgent = context.options.agentDefinitions.activeAgents.find((agentDef: any) => agentDef.agentType === agentType);
      if (matchedAgent && isCustomAgent(matchedAgent)) agentDefinition = matchedAgent;
      logForDebugging(`[handleSpawnInProcess] agent_type=${agentType}, found=${!!agentDefinition}`);
    }
    let spawnIdentity = {
      name: sanitizedName,
      teamName: teamName,
      prompt: prompt,
      color: teammateColor,
      planModeRequired: planModeRequired ?? !1,
      model: resolvedModel
    };
    await clearMailbox(sanitizedName, teamName);
    let spawnResult = await Clt(spawnIdentity, context);
    if (!spawnResult.ok) throw Oe("subagent_launch", "subagent_teammate_inprocess_failed"), logForDebugging(`[handleSpawnInProcess] spawn failed: ${spawnResult.error}`), Error("Failed to spawn in-process teammate");
    commitFn(), Wut({
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
    }), logForDebugging(`[handleSpawnInProcess] Started agent execution for ${teammateId}`);
    let existingLeadAgentId = getAppState().teamContext?.leadAgentId,
      isNewLeader = !existingLeadAgentId,
      leadAgentId = existingLeadAgentId ?? vQ(np, teamName),
      leadAgentColor = isNewLeader ? context.teammateColors.assign(leadAgentId) : void 0;
    return setAppState((prevState: any) => {
      let existingTeammates = prevState.teamContext?.teammates || {},
        leaderEntry = isNewLeader ? {
          [leadAgentId]: {
            name: np,
            agentType: np,
            color: leadAgentColor,
            tmuxSessionName: "in-process",
            tmuxPaneId: "leader",
            cwd: Pt(),
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
              cwd: Pt(),
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
async function LDp(spawnParams: any, context: any): Promise<any> {
  if (spawnParams.prompt && isStructuredProtocolMessage(spawnParams.prompt)) throw Oe("subagent_launch", "subagent_teammate_protocol_frame_prompt"), Error(PROTOCOL_FRAME_PROMPT_ERROR);
  if (isInProcessEnabled()) return A8a(spawnParams, context);
  try {
    await detectAndGetBackend();
  } catch (backendError) {
    if (getTeammateModeFromSnapshot() !== "auto") throw Oe("subagent_launch", "subagent_teammate_pane_unavailable"), backendError;
    return logForDebugging(`[handleSpawn] No pane backend available, falling back to in-process: ${Se(backendError)}`), markInProcessFallback(), A8a(spawnParams, context);
  }
  if (spawnParams.use_splitpane !== !1) return PDp(spawnParams, context);
  return ODp(spawnParams, context);
}
// Public entry point for spawning a teammate (delegates to LDp)
async function y8a(spawnParams: any, context: any): Promise<any> {
  return LDp(spawnParams, context);
}
// Module initializer — eagerly load all side-effectful dependency modules
var T8a = b(() => {
  lt();
  eso();
  ln();
  Ax();
  WUt();
  Qn();
  Go();
  qe();
  bt();
  oa();
  Mo();
  MO();
  Tte();
  VHe();
  Udo();
  vke();
  XUt();
  aU();
  d3n();
  zHe();
  Bdo();
  BL();
  f8a();
  zdo();
  Tx();
  scrubPathsConfig();
});
export {h3n,Jdo,Ydo,HDp,IDp,h8a,g8a,Xdo,Qdo,DDp,PDp,ODp,_8a,A8a,LDp,y8a,T8a};
