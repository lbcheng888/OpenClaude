// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {XD as OP,HB as bY} from "../agent/4331_register.ts";
import {VHl as hTl,vue as fue,zHl as _Tl} from "../core/4867_subtype.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {rd as wm,ef as uA} from "../../vendor/m2794.ts";
import {mainAgentId as ws,lt as ct} from "../session/0132_sent.ts";
import {Le as Ue,Ve as Qe} from "../../vendor/m5.ts";
import {deleteRemoteAgentMetadata as EUt,_a as za} from "./5175_writeRemoteAgentMetadata.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {archiveRemoteSession as l6,teleportToRemote as a6,qD as wP} from "./3888_validateSessionRepository.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG as bte} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {hA as ov,dM as $M,I5 as Jj,Pa as rl} from "../../vendor/m720.ts";
import {Mqe as z3e,dte as ste,Zle as Vle,rye as Cge,mY as TY} from "../tools/3889_allowBundle.ts";
import {gT as AT} from "../core/2809_toInfraSessionId.ts";
import {isPolicyAllowed as ii,Bu as sd} from "../../vendor/m2213.ts";
import {Si as qi,ud as Jd} from "../../vendor/m134.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {yGn as u6n,k5t as P4t} from "../../vendor/m4447.ts";
import {getGlobalConfig as vt,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {pgt as kmt,Rjn as YWn} from "../telemetry/4866_cloneViable.ts";
import {b} from "../../runtime.ts";
import {EGt as vjt,wue as Aue} from "../telemetry/4868_EGt.ts";
import {jHl as yTl} from "../agent/4869_exports.ts";
import {YHl as TTl} from "../agent/4870_exports.ts";
import {JHl as STl} from "../agent/4871_exports.ts";
// @ts-nocheck
function getUltraplanTimeoutMs() {
  return ut("tengu_ultraplan_timeout_seconds", 5400) * 1000;
}
function normalizePromptText(promptOrDefault) {
  return (typeof promptOrDefault === "string" ? promptOrDefault : promptOrDefault.default).trimEnd();
}
function isKnownPromptIdentifier(identifier) {
  return identifier in promptTemplateMap;
}
function getActivePromptIdentifier() {
  let e = ut("tengu_ultraplan_prompt_identifier", DEFAULT_PROMPT_IDENTIFIER);
  return isKnownPromptIdentifier(e) ? e : DEFAULT_PROMPT_IDENTIFIER;
}
function getPromptMetadata(identifier) {
  return promptMetadataMap[identifier ?? getActivePromptIdentifier()];
}
function getPromptTemplate(identifier) {
  return normalizePromptText(promptTemplateMap[identifier]);
}
function buildUltraplanInitialMessage(arg, seedPlan, promptIdentifier) {
  let lines = [];
  if (seedPlan) lines.push("Here is a draft plan to refine:", "", seedPlan, "");
  if (lines.push(getPromptTemplate(promptIdentifier)), arg) lines.push("", arg);
  return lines.join(`
`);
}
function startUltraplanPollLoop(taskId, sessionId, sessionUrl, getAppState, setAppState, onStatusMessage) {
  let taskRegistry = OP(getAppState, setAppState),
    sessionStartMs = Date.now(),
    didFail = false,
    didFirePlanReady = false;
  (async () => {
    try {
      let {
        plan: approvedPlan,
        rejectCount: rejectCount,
        executionTarget: executionTarget
      } = await hTl(sessionId, getUltraplanTimeoutMs(), phase => {
        if (taskRegistry.get(taskId)?.status !== "running") return;
        if (phase === "needs_input") j("tengu_ultraplan_awaiting_input", {});
        if (phase === "plan_ready" && !didFirePlanReady) didFirePlanReady = true, j("tengu_ultraplan_plan_ready", {
          duration_ms: Date.now() - sessionStartMs
        }), onStatusMessage?.(buildPlanReadyStatusMessage(sessionUrl)), wm({
          value: `The cloud ultraplan session produced a plan and is waiting for approval. Tell the user to open ${sessionUrl} to review it.`,
          mode: "task-notification",
          agentId: ws(),
          isMeta: true
        });
        taskRegistry.update(taskId, task => {
          if (task.status !== "running") return task;
          let newPhase = phase === "running" ? undefined : phase;
          return task.ultraplanPhase === newPhase ? task : {
            ...task,
            ultraplanPhase: newPhase
          };
        });
      }, () => taskRegistry.get(taskId)?.status !== "running");
      if (j("tengu_ultraplan_approved", {
        duration_ms: Date.now() - sessionStartMs,
        plan_length: approvedPlan.length,
        reject_count: rejectCount,
        execution_target: Ue(executionTarget)
      }), executionTarget === "remote") {
        if (taskRegistry.get(taskId)?.status !== "running") return;
        EUt(taskId).catch(err => v(`ultraplan meta delete failed: ${String(err)}`)), taskRegistry.update(taskId, task => task.status !== "running" ? task : {
          ...task,
          status: "completed",
          endTime: Date.now()
        }), setAppState(state => state.ultraplanSessionUrl === sessionUrl ? {
          ...state,
          ultraplanSessionUrl: undefined
        } : state), wm({
          value: [`Ultraplan approved \u2014 executing in Claude Code on the web. Follow along at: ${sessionUrl}`, "", "Results will land as a pull request when the cloud session finishes. There is nothing to do here."].join(`
`),
          mode: "task-notification",
          agentId: ws()
        });
      } else setAppState(state => {
        let task = state.tasks?.[taskId];
        if (!task || task.status !== "running") return state;
        return {
          ...state,
          ultraplanPendingChoice: {
            plan: approvedPlan,
            sessionId: sessionId,
            taskId: taskId
          }
        };
      });
    } catch (err) {
      if (taskRegistry.get(taskId)?.status !== "running") return;
      didFail = true;
      let nowMs = Date.now(),
        eventStats = err instanceof fue ? err.eventStats : undefined;
      j("tengu_ultraplan_failed", {
        duration_ms: nowMs - sessionStartMs,
        reason: Ue(err instanceof fue ? err.reason : "network_or_unknown"),
        reject_count: err instanceof fue ? err.rejectCount : undefined,
        events_received: eventStats?.eventsReceived,
        first_event_ms: eventStats?.firstEventAt !== undefined ? eventStats.firstEventAt - sessionStartMs : undefined,
        last_event_age_ms: eventStats?.lastEventAt !== undefined ? nowMs - eventStats.lastEventAt : undefined
      }), wm({
        value: `Ultraplan terminated: ${Se(err)}

Session: ${sessionUrl}`,
        mode: "task-notification",
        agentId: ws()
      }), wm({
        value: "Cloud ultraplan session failed. Wait for the user's next instructions.",
        mode: "task-notification",
        agentId: ws(),
        isMeta: true
      }), l6(sessionId).catch(archiveErr => v(`ultraplan archive failed: ${String(archiveErr)}`)), setAppState(state => state.ultraplanSessionUrl === sessionUrl ? {
        ...state,
        ultraplanSessionUrl: undefined
      } : state);
    } finally {
      if (didFail) taskRegistry.update(taskId, task => task.status !== "running" ? task : {
        ...task,
        status: "failed",
        endTime: Date.now()
      });
    }
  })();
}
function buildLaunchingStatusMessage(isDisconnectedBridge) {
  let prefix = isDisconnectedBridge ? `${bte} ` : "";
  return `${ov} ultraplan
${prefix}Starting Claude Code on the web\u2026`;
}
function buildInProgressStatusMessage(sessionUrl) {
  return `${ov} ultraplan \xB7 Monitor progress in Claude Code on the web ${sessionUrl}
You can continue working \u2014 when the ${ov} fills, press \u2193 to view results`;
}
function buildPlanReadyStatusMessage(sessionUrl) {
  return `${$M} ultraplan ready \xB7 ${sessionUrl}
Press ${Jj} to view results`;
}
function buildAlreadyActiveMessage(existingSessionUrl) {
  return existingSessionUrl ? `ultraplan: already polling. Open ${existingSessionUrl} to check status, or wait for the plan to land here.` : "ultraplan: already launching. Please wait for the session to start.";
}
async function stopUltraplanSession(taskId, sessionId, getAppState, setAppState) {
  await z3e.kill(taskId, getAppState, setAppState), setAppState(state => state.ultraplanSessionUrl || state.ultraplanPendingChoice || state.ultraplanLaunching ? {
    ...state,
    ultraplanSessionUrl: undefined,
    ultraplanPendingChoice: undefined,
    ultraplanLaunching: undefined
  } : state);
  let sessionUrl = AT(sessionId, process.env.SESSION_INGRESS_URL, {
    from: "cli"
  });
  wm({
    value: `Ultraplan stopped.

Session: ${sessionUrl}`,
    mode: "task-notification",
    agentId: ws()
  }), wm({
    value: "The user stopped the ultraplan session above. Do not respond to the stop notification \u2014 wait for their next message.",
    mode: "task-notification",
    agentId: ws(),
    isMeta: true
  });
}
async function stopUltrareviewSession(taskId, sessionId, getAppState, setAppState) {
  await z3e.kill(taskId, getAppState, setAppState), j("tengu_review_remote_stopped", {});
  let sessionUrl = AT(sessionId, process.env.SESSION_INGRESS_URL, {
    from: "cli"
  });
  wm({
    value: `Ultrareview stopped.

Session: ${sessionUrl}`,
    mode: "task-notification",
    agentId: ws()
  }), wm({
    value: "The user stopped the ultrareview session above. Do not respond to the stop notification \u2014 wait for their next message.",
    mode: "task-notification",
    agentId: ws(),
    isMeta: true
  });
}
async function jB_(options) {
  let {
    arg: arg,
    source: source,
    seedPlan: seedPlan,
    promptIdentifier: promptIdentifier,
    getAppState: getAppState,
    setAppState: setAppState,
    signal: signal,
    disconnectedBridge: disconnectedBridge,
    onStatusMessage: onStatusMessage
  } = options;
  if (!ii("allow_remote_sessions")) return j("tengu_ultraplan_create_failed", {
    reason: Qe("policy_blocked")
  }), `ultraplan: ${ste({
    type: "policy_blocked"
  })}`;
  let {
    ultraplanSessionUrl: ultraplanSessionUrl,
    ultraplanLaunching: ultraplanLaunching
  } = getAppState();
  if (ultraplanSessionUrl || ultraplanLaunching) return j("tengu_ultraplan_create_failed", {
    reason: Qe(ultraplanSessionUrl ? "already_polling" : "already_launching")
  }), buildAlreadyActiveMessage(ultraplanSessionUrl);
  if (!arg && !seedPlan) return ['Usage: /ultraplan \\<prompt\\>, or include "ultraplan" anywhere', "in your prompt", "", ...getPromptMetadata().usageBlurb, "", `Terms: ${ULTRAPLAN_TERMS_URL}`].join(`
`);
  return setAppState(state => state.ultraplanLaunching ? state : {
    ...state,
    ultraplanLaunching: true
  }), launchUltraplanSession({
    arg: arg,
    source: source,
    seedPlan: seedPlan,
    promptIdentifier: promptIdentifier,
    getAppState: getAppState,
    setAppState: setAppState,
    signal: signal,
    onStatusMessage: onStatusMessage
  }), buildLaunchingStatusMessage(disconnectedBridge);
}
async function launchUltraplanSession(options) {
  let {
      arg: arg,
      source: source,
      seedPlan: seedPlan,
      getAppState: getAppState,
      setAppState: setAppState,
      signal: signal,
      onStatusMessage: onStatusMessage
    } = options,
    orphanedSessionId;
  try {
    let eligibility = await Vle({
      allowBundle: true
    });
    if (!eligibility.eligible) {
      j("tengu_ultraplan_create_failed", {
        reason: Qe("precondition"),
        precondition_errors: eligibility.errors.map(e => e.type).join(",")
      });
      let errorText = eligibility.errors.map(ste).join(`
`);
      wm({
        value: `ultraplan: cannot launch cloud session \u2014
${errorText}`,
        mode: "task-notification",
        agentId: ws()
      });
      return;
    }
    let resolvedPromptIdentifier = options.promptIdentifier ?? getActivePromptIdentifier(),
      initialMessage = buildUltraplanInitialMessage(arg, seedPlan, resolvedPromptIdentifier),
      bundleFailReason,
      bundleStage,
      createFailReason,
      createdSession = await a6({
        initialMessage: initialMessage,
        source: "ultraplan",
        description: arg || "Refine local plan",
        permissionMode: "plan",
        ultraplan: true,
        signal: signal,
        useDefaultEnvironment: true,
        allowBundle: true,
        onBundleFail: (reason, stage) => {
          bundleFailReason = reason, bundleStage = stage;
        },
        onCreateFail: reason => {
          createFailReason = reason;
        }
      });
    if (!createdSession) {
      let failDetail = bundleFailReason ?? createFailReason;
      j("tengu_ultraplan_create_failed", {
        reason: bundleStage ? `${bundleStage}_fail` : createFailReason ? "create_api_fail" : "teleport_null"
      }), wm({
        value: `ultraplan: session creation failed${failDetail ? ` \u2014 ${failDetail}` : ". See --debug for details."}`,
        mode: "task-notification",
        agentId: ws()
      });
      return;
    }
    orphanedSessionId = createdSession.id;
    let sessionUrl = AT(createdSession.id, process.env.SESSION_INGRESS_URL, {
      from: "cli"
    });
    setAppState(state => ({
      ...state,
      ultraplanSessionUrl: sessionUrl,
      ultraplanLaunching: undefined
    })), onStatusMessage?.(buildInProgressStatusMessage(sessionUrl)), j("tengu_ultraplan_launched", {
      has_seed_plan: Boolean(seedPlan),
      prompt_identifier: Ue(resolvedPromptIdentifier),
      source: Ue(source)
    });
    let {
      taskId: taskId
    } = Cge({
      remoteTaskType: "ultraplan",
      session: {
        id: createdSession.id,
        title: arg || "Ultraplan"
      },
      command: arg,
      context: {
        abortController: new AbortController(),
        taskRegistry: OP(getAppState, setAppState)
      },
      isUltraplan: true
    });
    startUltraplanPollLoop(taskId, createdSession.id, sessionUrl, getAppState, setAppState, onStatusMessage), qi(async () => {
      if (getAppState().ultraplanSessionUrl === sessionUrl) await l6(createdSession.id, 1500);
    });
  } catch (err) {
    if (Ie(err), j("tengu_ultraplan_create_failed", {
      reason: Qe("unexpected_error"),
      error_name: err instanceof Error ? err.name : undefined
    }), wm({
      value: `ultraplan: unexpected error \u2014 ${Se(err)}`,
      mode: "task-notification",
      agentId: ws()
    }), wm({
      value: "Ultraplan hit an unexpected error during launch. Wait for the user's next instructions.",
      mode: "task-notification",
      agentId: ws(),
      isMeta: true
    }), orphanedSessionId) l6(orphanedSessionId).catch(archiveErr => v("ultraplan: failed to archive orphaned session", archiveErr)), setAppState(state => state.ultraplanSessionUrl ? {
      ...state,
      ultraplanSessionUrl: undefined
    } : state);
  } finally {
    setAppState(state => state.ultraplanLaunching ? {
      ...state,
      ultraplanLaunching: undefined
    } : state);
  }
}
var ULTRAPLAN_TERMS_URL = "https://code.claude.com/docs/en/claude-code-on-the-web",
  promptTemplateMap,
  DEFAULT_PROMPT_IDENTIFIER = "simple_plan",
  knownPromptIdentifiers,
  defaultPromptMetadata,
  promptMetadataMap,
  ultraplanSlashCommandHandler = async (reply, context, rawArg) => {
    let trimmedArg = u6n(rawArg).trim();
    if (!ii("allow_remote_sessions")) return reply(ste({
      type: "policy_blocked"
    }), {
      display: "system"
    }), null;
    if (!trimmedArg) {
      let response = await jB_({
        arg: trimmedArg,
        source: "slash",
        getAppState: context.getAppState,
        setAppState: context.setAppState,
        signal: context.abortController.signal
      });
      return reply(response, {
        display: "system"
      }), null;
    }
    let existingSessionUrl = context.options.ultraplanSessionUrl,
      {
        ultraplanLaunching: ultraplanLaunching
      } = context.getAppState();
    if (existingSessionUrl || ultraplanLaunching) return j("tengu_ultraplan_create_failed", {
      reason: Qe(existingSessionUrl ? "already_polling" : "already_launching")
    }), reply(buildAlreadyActiveMessage(existingSessionUrl), {
      display: "system"
    }), null;
    let sourcePromise = vt().hasSeenUltraplanTerms ? undefined : kmt().catch(() => null);
    return context.setAppState(state => ({
      ...state,
      ultraplanLaunchPending: {
        ultraplanArg: trimmedArg,
        source: "slash",
        sourcePromise: sourcePromise
      }
    })), reply(undefined, {
      display: "skip"
    }), null;
  },
  s$4;
var wUH = b(() => {
  ct();
  rl();
  Yn();
  Ct();
  sd();
  TY();
  YWn();
  Jd();
  nr();
  je();
  St();
  wn();
  uA();
  za();
  bY();
  wP();
  _Tl();
  vjt();
  P4t();
  promptTemplateMap = {
    simple_plan: yTl(),
    visual_plan: TTl(),
    three_subagents_with_critique: STl()
  }, knownPromptIdentifiers = Object.keys(promptTemplateMap);
  defaultPromptMetadata = {
    timeEstimate: "a few minutes",
    dialogBody: "Interactive planning on the web where you can edit and leave targeted comments on Claude's plan.",
    dialogPipeline: "Plan \u2192 Edit \u2192 Execute",
    usageBlurb: ["Remote plan mode with rich web editing experience.", "Runs in Claude Code on the web. When the plan is ready,", "you can execute it in the web session or send it back here.", "You can continue to work while the plan is generated remotely."]
  }, promptMetadataMap = {
    simple_plan: defaultPromptMetadata,
    visual_plan: defaultPromptMetadata,
    three_subagents_with_critique: {
      timeEstimate: "~10\u201330 min",
      dialogBody: "Interactive planning on the web where you can edit and leave targeted comments on Claude's plan.",
      dialogPipeline: "Scope \u2192 Critique \u2192 Edit \u2192 Execute",
      usageBlurb: ["Advanced multi-agent plan mode.", "Runs in Claude Code on the web. When the plan is ready,", "you can execute it in the web session or send it back here.", "You can continue to work while the plan is generated remotely."]
    }
  };
  s$4 = {
    type: "local-jsx",
    name: "ultraplan",
    get description() {
      return `Draft an editable plan in Claude Code on the web (${getPromptMetadata().timeEstimate}) \xB7 See ${ULTRAPLAN_TERMS_URL}`;
    },
    argumentHint: "<prompt>",
    isEnabled: () => Aue(),
    load: () => Promise.resolve({
      call: ultraplanSlashCommandHandler
    })
  };
});
export {getUltraplanTimeoutMs as Ypm,normalizePromptText as Jpm,isKnownPromptIdentifier as Xpm,getActivePromptIdentifier as vjn,getPromptMetadata as wjn,getPromptTemplate as Zpm,buildUltraplanInitialMessage as emm,startUltraplanPollLoop as tmm,buildLaunchingStatusMessage as nmm,buildInProgressStatusMessage as rmm,buildPlanReadyStatusMessage as omm,buildAlreadyActiveMessage as ZHl,stopUltraplanSession as aIo,stopUltrareviewSession as lIo,jB_ as CGt,launchUltraplanSession as smm,ULTRAPLAN_TERMS_URL as WPe,promptTemplateMap as iIo,DEFAULT_PROMPT_IDENTIFIER as XHl,knownPromptIdentifiers as ZhS,defaultPromptMetadata as QHl,promptMetadataMap as Qpm,ultraplanSlashCommandHandler as imm,s$4 as eIl,wUH as OWe};
