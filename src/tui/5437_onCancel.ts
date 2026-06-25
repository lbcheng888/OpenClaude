// @ts-nocheck
import {rc,fx,ddt,Rnl,hS} from "../agent/4362_toolUseCount.ts";
import {gc,bo,_t,uo} from "../../vendor/m2468.ts";
import {shellToolNames as mv,isReplMode as IG} from "../../vendor/m4331.ts";
import {ade,eyt} from "../../vendor/m5337.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {pke,Vkn,age} from "../config/2703_reason.ts";
import {M0e,N0e} from "../../vendor/m3898.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {rd,i9e,K8i,ef} from "../../vendor/m2794.ts";
import {mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {$0,Cp} from "../config/2223_level.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {l_e,Zae} from "../../vendor/m3309.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {BMi,zR} from "../../vendor/m2562.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {qJ,cyt} from "../../vendor/m5372.ts";
import {Rer,TFo} from "../../vendor/m5367.ts";
import {logMCPDebug as w6,Hue} from "../agent/4889_evictAfter.ts";
import {KR,NZ} from "../telemetry/2478_action.ts";
import {b,x} from "../../runtime.ts";
import {et} from "../../vendor/m2261.ts";
/**
 * Predicate: is this task an active (running) background agent?
 * Matches local/in-process agent tasks that are currently running.
 */
function isRunningBackgroundAgent(task: any): boolean {
  return rc(task) && (task.status === "running" || fx(task)) || task.type === "in_process_teammate" && task.status === "running";
}

/**
 * Hook wiring up the cancel / interrupt / kill-agents keybindings for the chat UI.
 * Returns null (registers keybinding side effects only).
 */
function useCancelKeybindings(props: {
  onCancel: () => void;
  onAgentsKilled: () => void;
  isMessageSelectorVisible: boolean;
  screen: string;
  abortSignal?: AbortSignal;
  isExternalLoading?: boolean;
  popCommandFromQueue?: () => void;
  isLocalJSXCommand: boolean;
  isInputOverlayActive: boolean;
  isVimEditing: boolean;
  inputMode?: string;
  isInputEmpty: boolean;
  getInFlightMessageId?: () => string | undefined;
}) {
  let {
      onCancel,
      onAgentsKilled,
      isMessageSelectorVisible,
      screen,
      abortSignal,
      isExternalLoading = !1,
      popCommandFromQueue,
      isLocalJSXCommand,
      isInputOverlayActive,
      isVimEditing,
      inputMode,
      isInputEmpty,
      getInFlightMessageId
    } = props,
    store = gc(),
    queueClient = bo(),
    abortController = mv(),
    pendingMessageCount = ade().length,
    {
      addNotification,
      removeNotification
    } = Ci(),
    lastKillAgentsPress = LSe.useRef(0),
    viewSelectionMode = _t(state => state.viewSelectionMode),
    effortValue = _t(state => state.effortValue),
    [, forceRerender] = LSe.useState(0),
    isStreaming = pke(),
    hasRunningAgents = _t(state => Object.values(state.tasks).some(isRunningBackgroundAgent)),
    killRunningAgents = LSe.useCallback(() => {
      let tasks = store.getState().tasks,
        runningAgentEntries = Object.entries(tasks).filter(([, task]) => isRunningBackgroundAgent(task));
      if (runningAgentEntries.length === 0) return !1;
      for (let [taskId] of runningAgentEntries) ddt(taskId, abortController);
      Rnl(tasks, abortController, "user");
      for (let [taskId, task] of runningAgentEntries) if (task.type === "in_process_teammate") M0e(taskId, abortController, queueClient);
      let descriptions = [];
      for (let [taskId, task] of runningAgentEntries) if (descriptions.push(task.description), task.type !== "in_process_teammate") hf(taskId, "stopped", {
        toolUseId: task.toolUseId,
        summary: task.description
      });
      let notificationText = descriptions.length === 1 ? `Background agent "${descriptions[0]}" was stopped by the user.` : `${descriptions.length} background agents were stopped by the user: ${descriptions.map(description => `"${description}"`).join(", ")}.`;
      return rd({
        agentId: rs(),
        value: notificationText,
        mode: "task-notification"
      }), onAgentsKilled(), !0;
    }, [store, onAgentsKilled, abortController, queueClient]),
    handleCancel = LSe.useCallback((skipAgentKill = !1) => {
      let resolvedEffort = $0(gs(), effortValue),
        inFlightMessageId = getInFlightMessageId?.(),
        cancelEvent = {
          source: Ve("escape"),
          streamMode: Le(l_e().mode),
          ...(resolvedEffort && {
            effort_level: Le(resolvedEffort)
          }),
          ...(inFlightMessageId && {
            message_id: xr(inFlightMessageId)
          })
        };
      if (Vkn() > 0) forceRerender(prev => prev + 1);
      if (abortSignal !== void 0 && !abortSignal.aborted || isExternalLoading) {
        W("tengu_cancel", cancelEvent), onCancel();
        return;
      }
      if (i9e()) {
        if (popCommandFromQueue) {
          popCommandFromQueue();
          return;
        }
      }
      if (!skipAgentKill && hasRunningAgents && killRunningAgents()) {
        W("tengu_cancel", cancelEvent);
        return;
      }
      W("tengu_cancel", cancelEvent), onCancel();
    }, [abortSignal, isExternalLoading, popCommandFromQueue, onCancel, getInFlightMessageId, effortValue, hasRunningAgents, killRunningAgents]),
    isInputOverlayBlocking = BMi(),
    isAbortable = abortSignal !== void 0 && !abortSignal.aborted || isExternalLoading,
    hasPendingMessages = pendingMessageCount > 0,
    isEditingInput = inputMode !== void 0 && inputMode !== "prompt" && isInputEmpty,
    isViewingAgent = viewSelectionMode === "viewing-agent",
    isChatActive = screen !== "transcript" && !isMessageSelectorVisible && !isLocalJSXCommand && !isInputOverlayBlocking && !isInputOverlayActive,
    isCancelActive = isChatActive && (isAbortable || hasPendingMessages || isStreaming || hasRunningAgents) && !isEditingInput && !isVimEditing && !isViewingAgent,
    isInterruptActive = isChatActive && (isAbortable || hasPendingMessages || isStreaming || hasRunningAgents || isViewingAgent);
  Or("chat:cancel", handleCancel, {
    context: "Chat",
    isActive: isCancelActive
  });
  let handleInterrupt = LSe.useCallback(() => {
    if (isViewingAgent) {
      let {
          viewingAgentTaskId,
          tasks
        } = store.getState(),
        viewingAgentTask = viewingAgentTaskId ? tasks[viewingAgentTaskId] : void 0;
      if (qJ(viewingAgentTask)) Rer(viewingAgentTask, abortController, queueClient);
      if (w6(queueClient), isAbortable || hasPendingMessages || isStreaming) handleCancel(!0);
      return;
    }
    handleCancel();
  }, [isViewingAgent, store, abortController, queueClient, isAbortable, hasPendingMessages, isStreaming, handleCancel]);
  Or("app:interrupt", handleInterrupt, {
    context: "Global",
    isActive: isInterruptActive
  });
  let handleKillAgents = LSe.useCallback(() => {
    let tasks = store.getState().tasks;
    if (!Object.values(tasks).some(isRunningBackgroundAgent)) {
      addNotification({
        key: "kill-agents-none",
        kind: "feedback",
        text: "No background agents running",
        priority: "immediate",
        timeoutMs: 2000
      });
      return;
    }
    let now = Date.now();
    if (now - lastKillAgentsPress.current <= wXl) {
      lastKillAgentsPress.current = 0, removeNotification("kill-agents-confirm");
      let resolvedEffort = $0(gs(), effortValue);
      W("tengu_cancel", {
        source: Ve("kill_agents"),
        ...(resolvedEffort && {
          effort_level: Le(resolvedEffort)
        })
      }), K8i(), killRunningAgents();
      return;
    }
    lastKillAgentsPress.current = now;
    let killAgentsKeybinding = KR("chat:killAgents", "Chat", "ctrl+x ctrl+k");
    addNotification({
      key: "kill-agents-confirm",
      kind: "feedback",
      text: `Press ${killAgentsKeybinding} again to stop background agents`,
      priority: "immediate",
      timeoutMs: wXl
    });
  }, [store, addNotification, removeNotification, killRunningAgents, effortValue]);
  return Or("chat:killAgents", handleKillAgents, {
    context: "Chat"
  }), null;
}
var LSe,
  wXl = 3000;
var kXl = b(() => {
  lt();
  kt();
  uo();
  IG();
  Cp();
  Ro();
  cyt();
  Zae();
  fd();
  zR();
  eyt();
  NZ();
  ss();
  age();
  QT();
  TFo();
  Hue();
  hS();
  ef();
  RE();
  N0e();
  LSe = x(et(), 1);
});

export {isRunningBackgroundAgent as bBo,useCancelKeybindings as EBo,LSe,wXl,kXl};
