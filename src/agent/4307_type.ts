// @ts-nocheck
import {Yye,p_,wE} from "../../vendor/m5177.ts";
import {jk,D_} from "./2784_withFileTypes.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {av,vw} from "../../vendor/m5178.ts";
import {mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {recordSidechainTranscript as Ece,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {y7,Q5,Ph} from "./1459_agentType.ts";
import {jq,xye} from "../permissions/4423_content.ts";
import {cce,E3t} from "../../vendor/m3971.ts";
import {pm,l1} from "../core/2694_l1.ts";
import {Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
/**
 * Generates a random task id of the form `s` + 8 lowercase alphanumeric chars.
 * Uses crypto.randomBytes to pick chars from the base-36 alphabet.
 */
function generateTaskId() {
  let randomBytes = kQa.randomBytes(8),
    id = "s";
  for (let i = 0; i < 8; i++) id += RQa[randomBytes[i] % RQa.length];
  return id;
}

/**
 * Creates and registers a local main-session background task.
 * @param prompt        the task prompt / description
 * @param taskRegistry  registry to register the new task into
 * @param selectedAgent optional agent definition (defaults to x9p main-session)
 * @param abortController optional abort controller (defaults to a fresh one)
 * @returns the new task id and its abort signal
 */
function createLocalMainSessionTask(prompt, taskRegistry, selectedAgent, abortController) {
  let taskId = generateTaskId();
  Yye(taskId, jk(cd(taskId)));
  let controller = abortController ?? kl(),
    agentDef = selectedAgent ?? x9p,
    task = {
      ...av(taskId, "local_agent", prompt),
      type: "local_agent",
      status: "running",
      agentId: taskId,
      ownerAgentId: rs(),
      prompt: prompt,
      selectedAgent: agentDef,
      agentType: "main-session",
      abortController: controller,
      retrieved: !1,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: !0,
      pendingMessages: [],
      retain: !1,
      diskLoaded: !1
    };
  return A(`[LocalMainSessionTask] Registering task ${taskId} with description: ${prompt}`), taskRegistry.register(task), A(`[LocalMainSessionTask] After registration, task ${taskId} exists in state: ${taskRegistry.get(taskId) !== void 0}`), {
    taskId: taskId,
    abortSignal: controller.signal
  };
}

/**
 * Marks a running task as completed/failed, trims its transcript to the last
 * message, emits telemetry, and notifies listeners.
 * @param taskId        the task to finalize
 * @param succeeded     whether the task completed successfully
 * @param taskRegistry  the registry holding the task
 */
function finalizeTask(taskId, succeeded, taskRegistry) {
  let status = succeeded ? "completed" : "failed",
    toolUseId,
    description;
  if (taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    return toolUseId = task.toolUseId, description = task.description, {
      ...task,
      status: status,
      endTime: Date.now(),
      notified: !0
    };
  }), taskRegistry.updateTranscript(taskId, transcript => ({
    ...transcript,
    messages: transcript.messages.length ? [transcript.messages.at(-1)] : []
  })), p_(taskId), description === void 0) return;
  if (succeeded) He("task_main_session");else xe("task_main_session", "task_main_session_failed");
  hf(taskId, status, {
    toolUseId: toolUseId,
    summary: description
  });
}

/** Type guard: true if `value` is a local-agent main-session task object. */
function isLocalMainSessionTask(value) {
  if (typeof value !== "object" || value === null || !("type" in value) || !("agentType" in value)) return !1;
  return value.type === "local_agent" && value.agentType === "main-session";
}

/**
 * Spawns a background main-session agent: registers the task, runs the query
 * loop, streams progress/messages into the registry transcript, and finalizes.
 * @returns the new task id
 */
function spawnBackgroundMainSession({
  messages: messages,
  queryParams: queryParams,
  description: description,
  taskRegistry: taskRegistry,
  agentDefinition: agentDefinition,
  setAppState: setAppState
}) {
  let {
    taskId: taskId,
    abortSignal: abortSignal
  } = createLocalMainSessionTask(description, taskRegistry, agentDefinition);
  Ece(messages, taskId).catch(err => A(`bg-session initial transcript write failed: ${err}`));
  let parentContext = queryParams.toolUseContext.agentContext,
    agentContext = {
      agentId: taskId,
      parentAgentId: y7(parentContext) ? void 0 : parentContext.agentId,
      agentType: "subagent",
      subagentName: "main-session",
      isBuiltIn: !0,
      isAsync: !0,
      isMainSession: !0
    };
  return Q5(agentContext, async () => {
    let accumulatedMessages = [...messages],
      preservedHolder = null;
    try {
      let recentActivities = [],
        toolUseCount = 0,
        tokenCount = 0,
        prevUuid = messages.at(-1)?.uuid ?? null;
      for await (let event of jq({
        messages: accumulatedMessages,
        ...queryParams,
        toolUseContext: {
          ...queryParams.toolUseContext,
          agentId: cd(taskId),
          agentContext: agentContext
        }
      })) {
        if (abortSignal.aborted) {
          let alreadyNotified = !1;
          if (taskRegistry.update(taskId, task => (alreadyNotified = task.notified === !0, alreadyNotified ? task : {
            ...task,
            notified: !0
          })), !alreadyNotified) hf(taskId, "stopped", {
            summary: description
          });
          return;
        }
        if (event.type === "progress" && event.data.type === "repl_tool_call" && event.data.phase === "start") {
          if (recentActivities.push({
            toolName: event.data.toolName,
            input: event.data.toolInput
          }), recentActivities.length > wQa) recentActivities.shift();
          let lastActivity = recentActivities.at(-1);
          taskRegistry.update(taskId, task => {
            if (task.progress?.recentActivities?.at(-1) === lastActivity) return task;
            return {
              ...task,
              progress: {
                tokenCount: tokenCount,
                toolUseCount: toolUseCount,
                recentActivities: [...recentActivities]
              }
            };
          });
          continue;
        }
        if (event.type === "active_goal") {
          setAppState?.(state => state.activeGoal === event.value ? state : {
            ...state,
            activeGoal: event.value
          });
          continue;
        }
        if (event.type !== "user" && event.type !== "assistant" && event.type !== "system") continue;
        if (accumulatedMessages.push(event), preservedHolder = cce(accumulatedMessages, event, preservedHolder), Ece([event], taskId, prevUuid).catch(err => A(`bg-session transcript write failed: ${err}`)), prevUuid = event.uuid, event.type === "assistant") {
          for (let block of event.message.content) if (block.type === "text") tokenCount += pm(block.text);else if (block.type === "tool_use") {
            if (toolUseCount++, block.name === Mf) continue;
            let activity = {
              toolName: block.name,
              input: block.input
            };
            if (recentActivities.push(activity), recentActivities.length > wQa) recentActivities.shift();
          }
        }
        taskRegistry.update(taskId, task => {
          let progress = task.progress;
          if (progress?.tokenCount === tokenCount && progress.toolUseCount === toolUseCount) return task;
          return {
            ...task,
            progress: {
              tokenCount: tokenCount,
              toolUseCount: toolUseCount,
              recentActivities: progress?.toolUseCount === toolUseCount ? progress.recentActivities : [...recentActivities]
            }
          };
        }), taskRegistry.updateTranscript(taskId, transcript => transcript.messages === accumulatedMessages ? transcript : {
          ...transcript,
          messages: accumulatedMessages
        });
      }
      finalizeTask(taskId, !0, taskRegistry);
    } catch (err) {
      Ie(err), finalizeTask(taskId, !1, taskRegistry);
    } finally {
      if (preservedHolder) accumulatedMessages.push(...preservedHolder.preserved);
    }
  }), taskId;
}
var kQa,
  x9p,
  RQa = "0123456789abcdefghijklmnopqrstuvwxyz",
  wQa = 5;
var b5n = b(() => {
  lt();
  xye();
  mn();
  E3t();
  l1();
  vw();
  $A();
  xS();
  lh();
  Ph();
  qe();
  vn();
  RE();
  D_();
  _a();
  wE();
  kQa = require("crypto"), x9p = {
    agentType: "main-session",
    whenToUse: "Main session query",
    source: "userSettings",
    getSystemPrompt: () => ""
  };
});

export {generateTaskId as D9p,createLocalMainSessionTask as P9p,finalizeTask as vQa,isLocalMainSessionTask as Jqt,spawnBackgroundMainSession as HQa,kQa,x9p,RQa,wQa,b5n};
