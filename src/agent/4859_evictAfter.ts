// @ts-nocheck
import {nR as Qw,Ax as dx} from "../../vendor/m5146.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function JEo(task) {
  return typeof task === "object" && task !== null && "type" in task && task.type === "local_agent";
}
function XEo(task) {
  return typeof task === "object" && task !== null && "type" in task && (task.type === "local_agent" || task.type === "in_process_teammate");
}
function QEo(task) {
  if (task.type === "in_process_teammate") return {
    ...task,
    evictAfter: task.isIdle ? Date.now() + ASl : undefined
  };
  return {
    ...task,
    retain: false,
    diskLoaded: false,
    evictAfter: Qw(task.status) ? Date.now() + ASl : undefined
  };
}
function TG(targetTaskId, setState) {
  j("tengu_transcript_view_enter", {}), setState(n => {
    let r = n.tasks[targetTaskId],
      o = n.viewingAgentTaskId,
      s = o !== undefined ? n.tasks[o] : undefined,
      i = o !== undefined && o !== targetTaskId && XEo(s),
      a = XEo(r) && (JEo(r) && !r.retain || r.evictAfter !== undefined),
      l = n.viewingAgentTaskId !== targetTaskId || n.viewSelectionMode !== "viewing-agent";
    if (!a && !l && !i) return n;
    let c = n.tasks;
    if (i || a) {
      if (c = {
        ...n.tasks
      }, i) c[o] = QEo(s);
      if (a) c[targetTaskId] = JEo(r) ? {
        ...r,
        retain: true,
        evictAfter: undefined
      } : {
        ...r,
        evictAfter: undefined
      };
    }
    return {
      ...n,
      viewingAgentTaskId: targetTaskId,
      viewSelectionMode: "viewing-agent",
      tasks: c
    };
  });
}
function V6(setState) {
  j("tengu_transcript_view_exit", {}), setState(t => {
    let n = t.viewingAgentTaskId,
      r = {
        ...t,
        viewingAgentTaskId: undefined,
        viewSelectionMode: "none"
      };
    if (n === undefined) return t.viewSelectionMode === "none" ? t : r;
    let o = t.tasks[n];
    if (!XEo(o)) return r;
    return {
      ...r,
      tasks: {
        ...t.tasks,
        [n]: QEo(o)
      }
    };
  });
}
function hSl(taskId, setState) {
  setState(state => {
    let task = state.tasks[taskId];
    if (!JEo(task)) return state;
    if (task.status === "running") return state;
    if (task.evictAfter === 0) return state;
    let isViewing = state.viewingAgentTaskId === taskId;
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...QEo(task),
          evictAfter: 0
        }
      },
      ...(isViewing && {
        viewingAgentTaskId: undefined,
        viewSelectionMode: "none"
      })
    };
  });
}
var ASl = 30000;
var hue = b(() => {
  Ct();
  dx();
});

export {JEo as tvo,XEo as nvo,QEo as rvo,TG as NG,V6 as oj,hSl as Bbl,ASl as Nbl,hue as kue};
