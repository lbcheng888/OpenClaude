// @ts-nocheck
import {truncateToWidth as xs,XH} from "../../vendor/m239.ts";
import {Cd,lr} from "../../vendor/m233.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {qw,sP} from "../../vendor/m4535.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {isFastModeReady as JG,Hue} from "../agent/4889_evictAfter.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {formatDuration as Fi,formatNumber as qc,Xo} from "../../vendor/m240.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Fas,Pa} from "../../vendor/m720.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/*
 * tui/4994_onExit.ts - React/Ink terminal UI restoration (subagent exit panel).
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// Predicate: task is a live (non-main-session) local agent that has not finished.
function Kgm(task: any): any {
  return task.type === "local_agent" && task.agentType !== "main-session" && task.status !== "completed" && task.status !== "failed" && task.status !== "killed";
}
// Predicate: task is a finished (completed/failed/killed) non-main-session local agent.
function zgm(task: any): any {
  return task.type === "local_agent" && task.agentType !== "main-session" && (task.status === "completed" || task.status === "failed" || task.status === "killed");
}
// Extract a short truncated result/error/description label for a finished task.
function jgm(task: any): any {
  let text = task.result?.content?.[0]?.text ?? task.error ?? task.description;
  return xs(Cd(text), 60);
}
// Subagent exit panel component: lists running and recently completed subagents.
function XOl(props: any): any {
  let cache = yYn.c(47),
    {
      onExit
    } = props,
    tasks = _t(Zgm),
    agentNameRegistry = _t(Qgm),
    config = bo(),
    {
      headerFocused,
      focusHeader
    } = qw(),
    [selectedId, setSelectedId] = BGt.useState(),
    [, setTick] = BGt.useState(0),
    nameByTaskId;
  if (cache[0] !== agentNameRegistry) {
    nameByTaskId = new Map();
    for (let [name, taskId] of agentNameRegistry) nameByTaskId.set(taskId, name);
    cache[0] = agentNameRegistry, cache[1] = nameByTaskId;
  } else nameByTaskId = cache[1];
  let nameMap = nameByTaskId,
    runningTasks;
  if (cache[2] !== tasks) runningTasks = Object.values(tasks).filter(Kgm).sort(Xgm), cache[2] = tasks, cache[3] = runningTasks;else runningTasks = cache[3];
  let running = runningTasks,
    completedTasks;
  if (cache[4] !== tasks) completedTasks = Object.values(tasks).filter(zgm).sort(Jgm).slice(0, 5), cache[4] = tasks, cache[5] = completedTasks;else completedTasks = cache[5];
  let completed = completedTasks,
    allTasksMemo;
  if (cache[6] !== completed || cache[7] !== running) allTasksMemo = [...running, ...completed], cache[6] = completed, cache[7] = running, cache[8] = allTasksMemo;else allTasksMemo = cache[8];
  let allTasks = allTasksMemo,
    tickCallback;
  if (cache[9] !== setTick) tickCallback = (): any => setTick(Ygm), cache[9] = setTick, cache[10] = tickCallback;else tickCallback = cache[10];
  zc(tickCallback, running.length > 0 ? 1000 : null);
  let selectedIndex = allTasks.findIndex((task: any): any => task.id === selectedId),
    selectedTask = selectedIndex >= 0 ? allTasks[selectedIndex] : selectedId === void 0 ? allTasks[0] : void 0,
    syncSelectionEffect,
    syncSelectionDeps;
  if (cache[11] !== selectedTask || cache[12] !== selectedId) syncSelectionEffect = (): any => {
    if (selectedTask && selectedTask.id !== selectedId) setSelectedId(selectedTask.id);
  }, syncSelectionDeps = [selectedTask, selectedId], cache[11] = selectedTask, cache[12] = selectedId, cache[13] = syncSelectionEffect, cache[14] = syncSelectionDeps;else syncSelectionEffect = cache[13], syncSelectionDeps = cache[14];
  BGt.useEffect(syncSelectionEffect, syncSelectionDeps);
  let keyHandler;
  if (cache[15] !== allTasks || cache[16] !== focusHeader || cache[17] !== headerFocused || cache[18] !== onExit || cache[19] !== selectedTask || cache[20] !== selectedId || cache[21] !== selectedIndex || cache[22] !== config) keyHandler = (key: any): any => {
    if (headerFocused) return;
    if (selectedId !== void 0 && selectedIndex < 0) {
      if (key.key === "up" || key.key === "down") key.preventDefault(), setSelectedId(allTasks[0]?.id);
      return;
    }
    let index = selectedIndex < 0 ? 0 : selectedIndex;
    if (key.key === "up") {
      if (key.preventDefault(), index === 0 || allTasks.length === 0) focusHeader();else setSelectedId(allTasks[index - 1]?.id);
      return;
    }
    if (key.key === "down") {
      key.preventDefault(), setSelectedId(allTasks[Math.min(index + 1, allTasks.length - 1)]?.id);
      return;
    }
    if (!selectedTask) return;
    if (key.key === "return") {
      key.preventDefault(), JG(selectedTask.id, config), onExit();
      return;
    }
    if (key.key === "x" && !key.ctrl && !key.meta && !key.superKey && selectedTask.status === "running") key.preventDefault(), selectedTask.abortController?.abort();
  }, cache[15] = allTasks, cache[16] = focusHeader, cache[17] = headerFocused, cache[18] = onExit, cache[19] = selectedTask, cache[20] = selectedId, cache[21] = selectedIndex, cache[22] = config, cache[23] = keyHandler;else keyHandler = cache[23];
  let onKeyDown = keyHandler,
    autoFocus = !headerFocused,
    emptyState;
  if (cache[24] !== allTasks.length) emptyState = allTasks.length === 0 && jE.jsx(wl, {
    children: "No subagents are currently running."
  }), cache[24] = allTasks.length, cache[25] = emptyState;else emptyState = cache[25];
  let runningRows;
  if (cache[26] !== headerFocused || cache[27] !== nameMap || cache[28] !== running || cache[29] !== selectedTask?.id) {
    let renderRunning;
    if (cache[31] !== headerFocused || cache[32] !== nameMap || cache[33] !== selectedTask?.id) renderRunning = (task: any): any => jE.jsx(e_m, {
      task: task,
      isSelected: task.id === selectedTask?.id && !headerFocused,
      name: nameMap.get(task.id)
    }, task.id), cache[31] = headerFocused, cache[32] = nameMap, cache[33] = selectedTask?.id, cache[34] = renderRunning;else renderRunning = cache[34];
    runningRows = running.map(renderRunning), cache[26] = headerFocused, cache[27] = nameMap, cache[28] = running, cache[29] = selectedTask?.id, cache[30] = runningRows;
  } else runningRows = cache[30];
  let completedSection;
  if (cache[35] !== completed || cache[36] !== headerFocused || cache[37] !== nameMap || cache[38] !== running.length || cache[39] !== selectedTask?.id) completedSection = completed.length > 0 && jE.jsxs(jE.Fragment, {
    children: [jE.jsx($, {
      marginTop: running.length > 0 ? 1 : 0,
      children: jE.jsx(v, {
        bold: !0,
        dimColor: !0,
        children: "Recently completed"
      })
    }), completed.map((task: any): any => jE.jsx(t_m, {
      task: task,
      isSelected: task.id === selectedTask?.id && !headerFocused,
      name: nameMap.get(task.id)
    }, task.id))]
  }), cache[35] = completed, cache[36] = headerFocused, cache[37] = nameMap, cache[38] = running.length, cache[39] = selectedTask?.id, cache[40] = completedSection;else completedSection = cache[40];
  let panel;
  if (cache[41] !== onKeyDown || cache[42] !== runningRows || cache[43] !== completedSection || cache[44] !== autoFocus || cache[45] !== emptyState) panel = jE.jsxs($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: autoFocus,
    onKeyDown: onKeyDown,
    children: [emptyState, runningRows, completedSection]
  }), cache[41] = onKeyDown, cache[42] = runningRows, cache[43] = completedSection, cache[44] = autoFocus, cache[45] = emptyState, cache[46] = panel;else panel = cache[46];
  return panel;
}
// Tick incrementer used to force re-render on the running-tasks interval.
function Ygm(tick: any): any {
  return tick + 1;
}
// Sort comparator: most recently finished tasks first.
function Jgm(a: any, b: any): any {
  return (b.endTime ?? 0) - (a.endTime ?? 0);
}
// Sort comparator: oldest-started running tasks first.
function Xgm(a: any, b: any): any {
  return a.startTime - b.startTime;
}
// Selector: agent name registry from store state.
function Qgm(state: any): any {
  return state.agentNameRegistry;
}
// Selector: tasks map from store state.
function Zgm(state: any): any {
  return state.tasks;
}
// Row component for a single running subagent.
function e_m(props: any): any {
  let cache = yYn.c(30),
    {
      task,
      isSelected,
      name
    } = props,
    summaryText = task.progress?.summary || task.description,
    truncatedSummary;
  if (cache[0] !== summaryText) truncatedSummary = xs(summaryText, 50), cache[0] = summaryText, cache[1] = truncatedSummary;else truncatedSummary = cache[1];
  let summary = truncatedSummary,
    elapsedMs = Math.max(0, Date.now() - task.startTime - (task.totalPausedMs ?? 0)),
    durationLabel;
  if (cache[2] !== elapsedMs) durationLabel = Fi(elapsedMs), cache[2] = elapsedMs, cache[3] = durationLabel;else durationLabel = cache[3];
  let duration = durationLabel,
    tokenCount = task.progress?.tokenCount,
    color = isSelected ? "suggestion" : void 0,
    ariaLabel = isSelected ? "selected, running:" : "running:",
    pointer = isSelected ? `${Xe.pointer} ` : "  ",
    spinner;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) spinner = jE.jsx(v, {
    color: "success",
    children: Fas
  }), cache[4] = spinner;else spinner = cache[4];
  let pointerNode;
  if (cache[5] !== ariaLabel || cache[6] !== pointer) pointerNode = jE.jsxs(v, {
    "aria-label": ariaLabel,
    children: [pointer, spinner]
  }), cache[5] = ariaLabel, cache[6] = pointer, cache[7] = pointerNode;else pointerNode = cache[7];
  let displayName = name || task.agentType,
    nameNode;
  if (cache[8] !== displayName) nameNode = jE.jsx(v, {
    bold: !0,
    children: displayName
  }), cache[8] = displayName, cache[9] = nameNode;else nameNode = cache[9];
  let agentTypeNode;
  if (cache[10] !== name || cache[11] !== task.agentType) agentTypeNode = name && jE.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", task.agentType]
  }), cache[10] = name, cache[11] = task.agentType, cache[12] = agentTypeNode;else agentTypeNode = cache[12];
  let summaryNode;
  if (cache[13] !== summary) summaryNode = jE.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", summary]
  }), cache[13] = summary, cache[14] = summaryNode;else summaryNode = cache[14];
  let durationNode;
  if (cache[15] !== duration) durationNode = jE.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", duration]
  }), cache[15] = duration, cache[16] = durationNode;else durationNode = cache[16];
  let tokensNode;
  if (cache[17] !== tokenCount) tokensNode = tokenCount !== void 0 && tokenCount > 0 && jE.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", qc(tokenCount), " tokens"]
  }), cache[17] = tokenCount, cache[18] = tokensNode;else tokensNode = cache[18];
  let stopHintNode;
  if (cache[19] !== isSelected) stopHintNode = isSelected && jE.jsx(v, {
    dimColor: !0,
    children: " \xB7 x to stop"
  }), cache[19] = isSelected, cache[20] = stopHintNode;else stopHintNode = cache[20];
  let row;
  if (cache[21] !== nameNode || cache[22] !== agentTypeNode || cache[23] !== summaryNode || cache[24] !== durationNode || cache[25] !== tokensNode || cache[26] !== stopHintNode || cache[27] !== color || cache[28] !== pointerNode) row = jE.jsx($, {
    children: jE.jsxs(v, {
      color: color,
      children: [pointerNode, " ", nameNode, agentTypeNode, summaryNode, durationNode, tokensNode, stopHintNode]
    })
  }), cache[21] = nameNode, cache[22] = agentTypeNode, cache[23] = summaryNode, cache[24] = durationNode, cache[25] = tokensNode, cache[26] = stopHintNode, cache[27] = color, cache[28] = pointerNode, cache[29] = row;else row = cache[29];
  return row;
}
// Row component for a single recently-completed subagent.
function t_m(props: any): any {
  let cache = yYn.c(18),
    {
      task,
      isSelected,
      name
    } = props,
    color = isSelected ? "suggestion" : void 0,
    dim = !isSelected,
    ariaLabel = isSelected ? "selected, " : "",
    pointer = isSelected ? `${Xe.pointer} ` : "  ",
    pointerNode;
  if (cache[0] !== ariaLabel || cache[1] !== pointer) pointerNode = jE.jsx(v, {
    "aria-label": ariaLabel,
    children: pointer
  }), cache[0] = ariaLabel, cache[1] = pointer, cache[2] = pointerNode;else pointerNode = cache[2];
  let status = task.status === "completed" ? "success" : "error",
    statusNode;
  if (cache[3] !== status) statusNode = jE.jsx(bs, {
    status: status,
    withSpace: !0
  }), cache[3] = status, cache[4] = statusNode;else statusNode = cache[4];
  let displayName = name || task.agentType,
    nameNode;
  if (cache[5] !== displayName) nameNode = jE.jsx(v, {
    bold: !0,
    children: displayName
  }), cache[5] = displayName, cache[6] = nameNode;else nameNode = cache[6];
  let resultLabel;
  if (cache[7] !== task) resultLabel = jgm(task), cache[7] = task, cache[8] = resultLabel;else resultLabel = cache[8];
  let resultNode;
  if (cache[9] !== resultLabel) resultNode = jE.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", resultLabel]
  }), cache[9] = resultLabel, cache[10] = resultNode;else resultNode = cache[10];
  let row;
  if (cache[11] !== color || cache[12] !== resultNode || cache[13] !== dim || cache[14] !== pointerNode || cache[15] !== statusNode || cache[16] !== nameNode) row = jE.jsx($, {
    children: jE.jsxs(v, {
      color: color,
      dimColor: dim,
      children: [pointerNode, statusNode, nameNode, resultNode]
    })
  }), cache[11] = color, cache[12] = resultNode, cache[13] = dim, cache[14] = pointerNode, cache[15] = statusNode, cache[16] = nameNode, cache[17] = row;else row = cache[17];
  return row;
}
var yYn, BGt, jE;
var QOl = b(() => {
  Zs();
  Pa();
  je();
  uo();
  Hue();
  Xo();
  lr();
  XH();
  sy();
  ff();
  sP();
  yYn = x(tt(), 1), BGt = x(et(), 1), jE = x(oe(), 1);
});

export {Kgm,zgm,jgm,XOl,Ygm,Jgm,Xgm,Qgm,Zgm,e_m,t_m,yYn,BGt,jE,QOl};
