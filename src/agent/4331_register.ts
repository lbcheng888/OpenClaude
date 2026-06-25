// @ts-nocheck
import {aOn,Zae} from "../../vendor/m3309.ts";
import {Bce,jit} from "../tools/4330_recursive.ts";
import {VA,RE} from "../session/2796_uuid.ts";
import {lv,vw} from "../../vendor/m5178.ts";
import {gel,wE} from "../../vendor/m5177.ts";
import {b} from "../../runtime.ts";
import {lt} from "../session/0132_sent.ts";
import {Ud} from "../../vendor/m615.ts";
import {ef} from "../../vendor/m2794.ts";
// @ts-nocheck
/**
 * Task registry store helpers.
 *
 * Provides a façade over an external store (read fn `getState` + writer fn
 * `setState`) that manages background/agent "tasks", their transcripts, and an
 * agent-name registry. Mutations are applied immutably and emit `system`
 * stream events (task_started / task_updated) via VA.
 */

/**
 * Remove every entry of `agentNameRegistry` whose value equals `taskId`.
 * Copy-on-write: returns the same map untouched when nothing matches.
 */
function pruneAgentNameRegistry(registry, taskId) {
  if (registry === void 0 || registry.size === 0) return registry;
  let next;
  for (let [name, owner] of registry) if (owner === taskId) (next ??= new Map(registry)).delete(name);
  return next ?? registry;
}

/**
 * Build the task-registry API bound to a `getState` reader and `setState` writer.
 */
function createTaskRegistry(getState, setState) {
  return {
    register(task) {
      registerTask(task, setState);
    },
    update(taskId, updater) {
      updateTask(taskId, setState, updater);
    },
    updateTranscript(taskId, updater) {
      setState(state => {
        let prevTranscript = state.transcripts?.[taskId] ?? {
            messages: [],
            inProgressToolUseIDs: new Set()
          },
          nextTranscript = updater(prevTranscript);
        if (nextTranscript === prevTranscript) return state;
        return {
          ...state,
          transcripts: {
            ...state.transcripts,
            [taskId]: nextTranscript
          }
        };
      });
    },
    getTranscript(taskId) {
      return getState().transcripts[taskId];
    },
    remove(taskId) {
      aOn(taskId), setState(state => {
        if (!(taskId in state.tasks)) return state;
        let {
            [taskId]: removedTask,
            ...remainingTasks
          } = state.tasks,
          transcripts = state.transcripts ?? {},
          {
            [taskId]: removedTranscript,
            ...remainingTranscripts
          } = transcripts;
        return {
          ...state,
          tasks: remainingTasks,
          transcripts: taskId in transcripts ? remainingTranscripts : transcripts,
          agentNameRegistry: pruneAgentNameRegistry(state.agentNameRegistry, taskId)
        };
      });
    },
    evictTerminal(taskId) {
      evictTerminalTask(taskId, setState);
    },
    applyOffsetsAndEvict(offsets, evictIds) {
      applyOffsetsAndEvict(setState, offsets, evictIds);
    },
    get(taskId) {
      return getState().tasks[taskId];
    },
    all() {
      return getState().tasks;
    },
    abortSpeculation() {
      Bce(setState);
    }
  };
}

/**
 * Apply `updater` to an existing task; if it produced changed fields, write the
 * new task into state and emit a `task_updated` patch event.
 */
function updateTask(taskId, setState, updater) {
  let patch = null;
  if (setState(state => {
    let prevTask = state.tasks?.[taskId];
    if (!prevTask) return state;
    let nextTask = updater(prevTask);
    if (nextTask === prevTask) return state;
    return patch = diffTask(prevTask, nextTask), {
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: nextTask
      }
    };
  }), patch !== null) VA({
    type: "system",
    subtype: "task_updated",
    task_id: taskId,
    patch
  });
}

/**
 * Compute the changed-fields patch between two task snapshots, mapping camelCase
 * task fields to snake_case event keys. Returns null when nothing changed.
 */
function diffTask(prevTask, nextTask) {
  let patch = {};
  if (nextTask.status !== prevTask.status) patch.status = nextTask.status;
  if (nextTask.description !== prevTask.description) patch.description = nextTask.description;
  if (nextTask.endTime !== prevTask.endTime) patch.end_time = nextTask.endTime;
  if (nextTask.totalPausedMs !== prevTask.totalPausedMs) patch.total_paused_ms = nextTask.totalPausedMs;
  let prevError = "error" in prevTask ? prevTask.error : void 0,
    nextError = "error" in nextTask ? nextTask.error : void 0;
  if (nextError !== prevError && nextError !== void 0) patch.error = nextError;
  let prevBackgrounded = "isBackgrounded" in prevTask ? prevTask.isBackgrounded : void 0,
    nextBackgrounded = "isBackgrounded" in nextTask ? nextTask.isBackgrounded : void 0;
  if (nextBackgrounded !== prevBackgrounded && nextBackgrounded !== void 0) patch.is_backgrounded = nextBackgrounded;
  return Object.keys(patch).length > 0 ? patch : null;
}

/**
 * Register a new task. If a task with the same id already existed (and carried
 * `retain`), preserve its retention/lifecycle bookkeeping. Emits `task_started`
 * only for genuinely new tasks.
 */
function registerTask(task, setState) {
  let existed = !1;
  if (setState(state => {
    let prevTask = state.tasks[task.id];
    existed = prevTask !== void 0;
    let nextTask = prevTask && "retain" in prevTask ? {
      ...task,
      retain: prevTask.retain,
      startTime: prevTask.startTime,
      diskLoaded: prevTask.diskLoaded,
      pendingMessages: prevTask.pendingMessages,
      keepaliveReasons: prevTask.keepaliveReasons,
      ownerAgentId: prevTask.ownerAgentId,
      parentAgentId: prevTask.parentAgentId,
      spawnDepth: prevTask.spawnDepth
    } : task;
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [task.id]: nextTask
      }
    };
  }), existed) return;
  VA({
    type: "system",
    subtype: "task_started",
    task_id: task.id,
    tool_use_id: task.toolUseId,
    description: task.description,
    subagent_type: "agentType" in task ? task.agentType : void 0,
    task_type: task.type,
    workflow_name: "workflowName" in task ? task.workflowName : void 0,
    prompt: "prompt" in task ? task.prompt : void 0,
    skip_transcript: task.skipTranscript
  });
}

/**
 * Evict a single terminal, notified task whose retention/keepalive/evict-after
 * guards all permit removal. Drops its transcript and registry entries.
 */
function evictTerminalTask(taskId, setState) {
  let evicted = !1;
  if (setState(state => {
    let task = state.tasks?.[taskId];
    if (!task) return state;
    if (!lv(task.status)) return state;
    if (!task.notified) return state;
    if ("retain" in task && (task.evictAfter ?? 1 / 0) > Date.now()) return state;
    if ("retain" in task && (task.keepaliveReasons?.size ?? 0) > 0) return state;
    if (task.type === "local_workflow" && (task.evictAfter ?? 0) > Date.now()) return state;
    evicted = !0;
    let {
        [taskId]: removedTask,
        ...remainingTasks
      } = state.tasks,
      transcripts = state.transcripts ?? {},
      {
        [taskId]: removedTranscript,
        ...remainingTranscripts
      } = transcripts;
    return {
      ...state,
      tasks: remainingTasks,
      transcripts: taskId in transcripts ? remainingTranscripts : transcripts,
      agentNameRegistry: pruneAgentNameRegistry(state.agentNameRegistry, taskId)
    };
  }), evicted) aOn(taskId);
}

/** Return all tasks currently in the `running` status. */
function getRunningTasks(state) {
  let tasks = state.tasks ?? {};
  return Object.values(tasks).filter(task => task.status === "running");
}

/**
 * Collect transcript attachments / output offsets for running tasks and the ids
 * of notified terminal tasks that should be evicted.
 */
async function collectTaskAttachments(tasks) {
  let attachments = [],
    updatedTaskOffsets = {},
    evictedTaskIds = [];
  for (let task of Object.values(tasks)) {
    if (task.notified) switch (task.status) {
      case "completed":
      case "failed":
      case "killed":
        evictedTaskIds.push(task.id);
        continue;
      case "pending":
        continue;
      case "running":
        break;
    }
    if (task.status === "running") {
      let result = await gel(task.id, task.outputOffset);
      if (result.content) updatedTaskOffsets[task.id] = result.newOffset;
    }
  }
  return {
    attachments,
    updatedTaskOffsets,
    evictedTaskIds
  };
}

/**
 * In a single state write: apply new output offsets to running tasks and evict
 * the given terminal tasks (subject to retain/keepalive/evict-after guards),
 * pruning transcripts and the agent-name registry for everything removed.
 */
function applyOffsetsAndEvict(setState, offsets, evictIds) {
  let offsetTaskIds = Object.keys(offsets);
  if (offsetTaskIds.length === 0 && evictIds.length === 0) return;
  let removedIds = [];
  setState(state => {
    let changed = !1,
      tasks = {
        ...state.tasks
      };
    for (let taskId of offsetTaskIds) {
      let task = tasks[taskId];
      if (task?.status === "running") tasks[taskId] = {
        ...task,
        outputOffset: offsets[taskId]
      }, changed = !0;
    }
    for (let taskId of evictIds) {
      let task = tasks[taskId];
      if (!task || !lv(task.status) || !task.notified) continue;
      if ("retain" in task && (task.evictAfter ?? 1 / 0) > Date.now()) continue;
      if ("retain" in task && (task.keepaliveReasons?.size ?? 0) > 0) continue;
      if (task.type === "local_workflow" && (task.evictAfter ?? 0) > Date.now()) continue;
      delete tasks[taskId], removedIds.push(taskId), changed = !0;
    }
    if (!changed) return state;
    let agentNameRegistry = state.agentNameRegistry,
      nextTranscripts;
    for (let taskId of removedIds) if (agentNameRegistry = pruneAgentNameRegistry(agentNameRegistry, taskId), state.transcripts && taskId in state.transcripts) nextTranscripts ??= {
      ...state.transcripts
    }, delete nextTranscripts[taskId];
    return {
      ...state,
      tasks,
      agentNameRegistry,
      ...(nextTranscripts && {
        transcripts: nextTranscripts
      })
    };
  });
  for (let taskId of removedIds) aOn(taskId);
}
var SPECULATION_TIMEOUT_MS = 3000,
  Ice = 30000,
  fel = 30000;
var HB = b(() => {
  lt();
  Zae();
  Ud();
  jit();
  vw();
  ef();
  RE();
  wE();
});

export {pruneAgentNameRegistry as Yyo,createTaskRegistry as XD,updateTask as j3p,diffTask as Y3p,registerTask as J3p,evictTerminalTask as X3p,getRunningTasks as p6t,collectTaskAttachments as hel,applyOffsetsAndEvict as Q3p,SPECULATION_TIMEOUT_MS as vut,Ice,fel,HB};
