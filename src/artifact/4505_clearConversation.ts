// @ts-nocheck
import {ft,oo,b} from "../../runtime.ts";
import {getSessionEndHookTimeoutMs as h8t,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {executeSessionEndHooks as L8e} from "../../vendor/m5195.ts";
import {getLastMainRequestId as iSt,getOriginalCwd as gr,getSessionId as It,regenerateSessionId as Lsr,lt} from "../session/0132_sent.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {rc,hS} from "../agent/4362_toolUseCount.ts";
import {mS} from "../../vendor/m3842.ts";
import {clearSessionCaches as KCo,O8e} from "../../vendor/m4503.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {z$e} from "../../vendor/m2765.ts";
import {YA} from "../../vendor/m3366.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {p_,Yye,wE} from "../../vendor/m5177.ts";
import {Yit,UW} from "../config/3317_fileStates.ts";
import {zA,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {Ldl,Dw} from "../core/5176_encoding.ts";
import {getCurrentSessionTitle as ph,getMaterializedSessionFile as px,clearSessionMetadata as f8t,resetSessionFilePointer as XY,saveCustomTitle as i6,_a,P3e,saveWorktreeState as Qq,saveIsolationLatch as tue} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Nm,jk,D_} from "../agent/2784_withFileTypes.ts";
import {Kga,V3e} from "../../vendor/m3348.ts";
import {K1i,Pf} from "../agent/2591_level.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {NO,k4} from "../permissions/2717_matchSessionMode.ts";
import {getCurrentWorktreeSession as _f} from "../config/3348_flushAnalyticsSinks.ts";
import {gW,jke} from "../../vendor/m2780.ts";
import {qI} from "../session/5205_worktreeBranchName.ts";
var Odl = {};
ft(Odl, {
  clearConversation: () => clearConversation
});
/**
 * Generator command that clears the current conversation: runs SessionEnd-style
 * hooks, tears down running/background tasks, resets session/app state, regenerates
 * the conversation id, and emits any "clear" messages.
 */
async function* clearConversation({
  setMessages: setMessages,
  readFileState: readFileState,
  loadedNestedMemoryPaths: loadedNestedMemoryPaths,
  sessionEnvVars: sessionEnvVars,
  memorySelector: memorySelector,
  getAppState: getAppState,
  setAppState: setAppState,
  isolationLatch: isolationLatch,
  clearedSessionTitle: clearedSessionTitle
}) {
  let clearTimeoutMs = h8t();
  await L8e("clear", {
    getAppState: getAppState,
    setAppState: setAppState,
    signal: AbortSignal.timeout(clearTimeoutMs)
  });
  let lastRequestId = iSt();
  if (lastRequestId) W("tengu_cache_eviction_hint", {
    scope: Ve("conversation_clear"),
    last_request_id: xr(lastRequestId)
  });
  let runningAgentIds = new Set(),
    interruptibleTasks = [],
    isForegroundTask = (task: any) => "isBackgrounded" in task && task.isBackgrounded === !1;
  if (getAppState) for (let task of Object.values(getAppState().tasks)) {
    if (isForegroundTask(task)) continue;
    if (rc(task)) runningAgentIds.add(task.agentId), interruptibleTasks.push(task);else if (mS(task)) runningAgentIds.add(task.identity.agentId);
  }
  if (setMessages(() => []), KCo(runningAgentIds, setAppState), O_(gr()), readFileState.clear(), loadedNestedMemoryPaths) for (let memoryPath of Object.keys(loadedNestedMemoryPaths)) delete loadedNestedMemoryPaths[memoryPath];
  if (sessionEnvVars?.clear(), z$e(memorySelector), isolationLatch && runningAgentIds.size === 0) isolationLatch.current = null;
  if (setAppState) setAppState((prev: any) => {
    let retainedTasks: any = {};
    for (let [taskId, task] of Object.entries<any>(prev.tasks)) {
      if (!isForegroundTask(task)) {
        retainedTasks[taskId] = task;
        continue;
      }
      try {
        if (task.status === "running") {
          if (YA(task)) {
            if (task.shellCommand?.kill(), task.shellCommand?.cleanup(), task.cleanupTimeoutId) clearTimeout(task.cleanupTimeoutId);
          }
          if ("abortController" in task) task.abortController?.abort();
        }
      } catch (error) {
        Ie(error);
      }
      p_(taskId);
    }
    return {
      ...prev,
      tasks: retainedTasks,
      attribution: Yit(),
      cacheBreakerPhrase: void 0,
      activeGoal: void 0,
      frameUrls: {},
      frameNavPath: null,
      frameExpanded: !1,
      footerLinks: prev.footerLinks.filter((link: any) => link.key !== void 0),
      standaloneAgentContext: prev.standaloneAgentContext?.prideGradient ? {
        prideGradient: prev.standaloneAgentContext.prideGradient
      } : void 0,
      fileHistory: {
        snapshots: [],
        trackedFiles: new Set(),
        snapshotSequence: 0
      }
    };
  });
  if (getAppState) {
    for (let mcpClient of getAppState().mcp.clients) if (mcpClient.name === "ide" && mcpClient.type === "connected") mcpClient.client.onclose = void 0, await zA(mcpClient.name, mcpClient.config).catch(() => {});
  }
  Ldl();
  let priorSessionMemory = ph(It()),
    priorSessionId = It(),
    clearedSessionLeafUuid = clearedSessionTitle ? px() ?? Nm() : void 0;
  if (f8t(), yield {
    type: "conversation_reset",
    newConversationId: Pdl.randomUUID()
  }, Lsr({
    setCurrentAsParent: !0
  }), Kga(), process.env.CLAUDE_CODE_SESSION_ID) process.env.CLAUDE_CODE_SESSION_ID = It();
  if (await XY(), await K1i(It(), Nm()), clearedSessionTitle) await i6(priorSessionId, clearedSessionTitle, clearedSessionLeafUuid, "user");else if (priorSessionMemory) await i6(It(), priorSessionMemory, void 0, "user");
  for (let task of interruptibleTasks) {
    if (task.status !== "running") continue;
    Yye(task.id, jk(cd(task.agentId)));
  }
  {
    let {
        saveMode: setSaveMode
      } = (_a(), oo(P3e)),
      {
        isCoordinatorMode: isCoordinatorMode
      } = (NO(), oo(k4));
    setSaveMode(isCoordinatorMode() ? "coordinator" : "normal");
  }
  let pendingTodos = _f();
  if (pendingTodos) Qq(pendingTodos);
  if (isolationLatch?.current) tue(isolationLatch.current);
  let clearMessages = await gW("clear");
  if (clearMessages.length > 0) setMessages(() => clearMessages);
}
var Pdl;
var TVn = b(() => {
  lt();
  Pf();
  kt();
  QT();
  Ew();
  hS();
  xS();
  UW();
  Wd();
  vn();
  Dw();
  KO();
  D_();
  jke();
  _a();
  V3e();
  wE();
  qI();
  O8e();
  Pdl = require("crypto");
});

export {Odl,clearConversation,Pdl,TVn};
