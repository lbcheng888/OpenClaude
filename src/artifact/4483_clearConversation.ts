// @ts-nocheck
import {isFullscreenWithTTY as J_,ro as g8,b as L} from "../../runtime.ts";
import {getSessionEndHookTimeoutMs as pp_,yp as jO} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {executeSessionEndHooks as PUH} from "../../vendor/m5162.ts";
import {getLastMainRequestId as WY_,getOriginalCwd as Z8,getSessionId as E_,regenerateSessionId as be6,lt as A_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_} from "../../vendor/m5.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {od as V3,RE as jX} from "../agent/4342_toolUseCount.ts";
import {yS as G2} from "../../vendor/m3824.ts";
import {clearSessionCaches as qAq,aje as XUH} from "../../vendor/m4481.ts";
import {x_ as ZA,initXL as DN} from "../agent/3279_code.ts";
import {$2e as nbH} from "../../vendor/m2753.ts";
import {oI as tG} from "../../vendor/m3350.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {iy as rA,f6e as RBH,vC as _X} from "../../vendor/m5145.ts";
import {Jot as e8_,vW as lQ} from "../config/3301_fileStates.ts";
import {mx as ZZ,O0 as NL} from "../tools/3222_name.ts";
import {zol as U84,yx as _0} from "../core/5144_encoding.ts";
import {getCurrentSessionTitle as qY,getMaterializedSessionFile as FN,clearSessionMetadata as mp_,resetSessionFilePointer as no,$6 as jU,ja as aK,b9e as VxH,saveWorktreeState as OU,saveIsolationLatch as R1H} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {qf as Uz,hP as Tk,ry as lA} from "../agent/2772_withFileTypes.ts";
import {Oca as e7K,Tst as Vq_} from "../../vendor/m3332.ts";
import {Rm as lT,zE as LM} from "../../vendor/m125.ts";
import {_L as KN,lq as xp} from "../permissions/2705_matchSessionMode.ts";
import {getCurrentWorktreeSession as q$} from "../config/3332_flushAnalyticsSinks.ts";
import {nW as GQ,lxe as SWH} from "../../vendor/m2768.ts";
import {hI as AR} from "../session/5172_worktreeBranchName.ts";
// @ts-nocheck
var _eK = {};
J_(_eK, {
  clearConversation: () => clearConversation
});
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
  let clearTimeoutMs = pp_();
  await PUH("clear", {
    getAppState: getAppState,
    setAppState: setAppState,
    signal: AbortSignal.timeout(clearTimeoutMs)
  });
  let lastRequestId = WY_();
  if (lastRequestId) c("tengu_cache_eviction_hint", {
    scope: K_("conversation_clear"),
    last_request_id: a8(lastRequestId)
  });
  let runningAgentIds = new Set(),
    interruptibleTasks = [],
    isForegroundTask = task => "isBackgrounded" in task && task.isBackgrounded === false;
  if (getAppState) for (let task of Object.values(getAppState().tasks)) {
    if (isForegroundTask(task)) continue;
    if (V3(task)) runningAgentIds.add(task.agentId), interruptibleTasks.push(task);else if (G2(task)) runningAgentIds.add(task.identity.agentId);
  }
  if (setMessages(() => []), qAq(runningAgentIds, setAppState), ZA(Z8()), readFileState.clear(), loadedNestedMemoryPaths) for (let memoryPath of Object.keys(loadedNestedMemoryPaths)) delete loadedNestedMemoryPaths[memoryPath];
  if (sessionEnvVars?.clear(), nbH(memorySelector), isolationLatch && runningAgentIds.size === 0) isolationLatch.current = null;
  if (setAppState) setAppState(prev => {
    let retainedTasks = {};
    for (let [taskId, task] of Object.entries(prev.tasks)) {
      if (!isForegroundTask(task)) {
        retainedTasks[taskId] = task;
        continue;
      }
      try {
        if (task.status === "running") {
          if (tG(task)) {
            if (task.shellCommand?.kill(), task.shellCommand?.cleanup(), task.cleanupTimeoutId) clearTimeout(task.cleanupTimeoutId);
          }
          if ("abortController" in task) task.abortController?.abort();
        }
      } catch (error) {
        SH(error);
      }
      rA(taskId);
    }
    return {
      ...prev,
      tasks: retainedTasks,
      attribution: e8_(),
      cacheBreakerPhrase: undefined,
      activeGoal: undefined,
      frameUrls: {},
      frameNavPath: null,
      frameExpanded: false,
      footerLinks: prev.footerLinks.filter(link => link.key !== undefined),
      standaloneAgentContext: prev.standaloneAgentContext?.prideGradient ? {
        prideGradient: prev.standaloneAgentContext.prideGradient
      } : undefined,
      fileHistory: {
        snapshots: [],
        trackedFiles: new Set(),
        snapshotSequence: 0
      }
    };
  });
  if (getAppState) {
    for (let mcpClient of getAppState().mcp.clients) if (mcpClient.name === "ide" && mcpClient.type === "connected") mcpClient.client.onclose = undefined, await ZZ(mcpClient.name, mcpClient.config).catch(() => {});
  }
  U84();
  let priorSessionMemory = qY(E_()),
    priorSessionId = E_(),
    clearedSessionLeafUuid = clearedSessionTitle ? FN() ?? Uz() : undefined;
  if (mp_(), yield {
    type: "conversation_reset",
    newConversationId: HeK.randomUUID()
  }, be6({
    setCurrentAsParent: true
  }), e7K(), process.env.CLAUDE_CODE_SESSION_ID) process.env.CLAUDE_CODE_SESSION_ID = E_();
  if (await no(), clearedSessionTitle) await jU(priorSessionId, clearedSessionTitle, clearedSessionLeafUuid, "user");else if (priorSessionMemory) await jU(E_(), priorSessionMemory, undefined, "user");
  for (let task of interruptibleTasks) {
    if (task.status !== "running") continue;
    RBH(task.id, Tk(lT(task.agentId)));
  }
  {
    let {
        saveMode: setSaveMode
      } = (aK(), g8(VxH)),
      {
        isCoordinatorMode: isCoordinatorMode
      } = (KN(), g8(xp));
    setSaveMode(isCoordinatorMode() ? "coordinator" : "normal");
  }
  let pendingTodos = q$();
  if (pendingTodos) OU(pendingTodos);
  if (isolationLatch?.current) R1H(isolationLatch.current);
  let clearMessages = await GQ("clear");
  if (clearMessages.length > 0) setMessages(() => clearMessages);
}
var HeK;
var Vp6 = L(() => {
  A_();
  v_();
  LJ();
  NL();
  jX();
  LM();
  lQ();
  jO();
  y6();
  _0();
  DN();
  lA();
  SWH();
  aK();
  Vq_();
  _X();
  AR();
  XUH();
  HeK = require("crypto");
});

export {_eK as Kol,clearConversation,HeK as Vol,Vp6 as Qjn};
