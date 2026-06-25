// @ts-nocheck
import {getMemoryFiles as qA,isSyntheticMemoryPath as Eke,ZR} from "../config/2729_stripHtmlComments.ts";
import {or,dl,eC,dn} from "../config/0137_namespace.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {getFastModeModelDisplayName as Cm,lr} from "../../vendor/m233.ts";
import {z_l,j_l} from "../../vendor/m4628.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {Kc,xm,Ebn,Jm} from "../config/2207_Jm.ts";
import {hI,_E,cO} from "../telemetry/2249_cO.ts";
import {Det,rz} from "../config/2253_displayName.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {X6t,mWn,zSo} from "../config/4399_zSo.ts";
import {onGrowthBookRefresh as V7,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {k6n,I6n} from "../../vendor/m4236.ts";
import {formatRelativeTimeAgo as gK,Xo} from "../../vendor/m240.ts";
import {ao,getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bE,Pie} from "../../vendor/m2566.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {fxt,Jg} from "../../vendor/m2044.ts";
import {hr} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * MemoryFileSelector — Memory file selector component.
 * Renders a list of CLAUDE.md memory files (user, project, nested),
 * plus auto-memory / auto-dream toggles and an open-folder shortcut.
 */
function MemoryFileSelector(props: any) {
  let cache = MemoryFileSelector_c.c(68),
    {
      onSelect: onSelect,
      onCancel: onCancel
    } = props,
    memoryFiles = WG.use(qA()),
    userMemoryPath = hvo.join(or(), "CLAUDE.md"),
    projectMemoryPath = hvo.join(gr(), "CLAUDE.md"),
    hasUserMemory = memoryFiles.some((file: any) => file.path === userMemoryPath),
    hasProjectMemory = memoryFiles.some((file: any) => file.path === projectMemoryPath),
    fileEntries = [...memoryFiles.filter(isSelectableMemoryFile).map(markExisting), ...(hasUserMemory ? [] : [{
      path: userMemoryPath,
      type: "User",
      content: "",
      exists: !1
    }]), ...(hasProjectMemory ? [] : [{
      path: projectMemoryPath,
      type: "Project",
      content: "",
      exists: !1
    }])],
    nestDepthByPath = new Map(),
    options = fileEntries.map((file: any) => {
      let displayName = dd(file.path),
        newSuffix = file.exists ? "" : " (new)",
        depth = file.parent ? (nestDepthByPath.get(file.parent) ?? 0) + 1 : 0;
      nestDepthByPath.set(file.path, depth);
      let indent = depth > 0 ? Cm("  ", depth - 1) : "",
        label: any;
      if (file.type === "User" && !file.isNested && file.path === userMemoryPath) label = "User memory";else if (file.type === "Project" && !file.isNested && file.path === projectMemoryPath) label = "Project memory";else if (depth > 0) label = `${indent}L ${displayName}${newSuffix}`;else label = `${displayName}`;
      let description: any,
        isCheckedIn = z_l(gr());
      if (file.type === "User" && !file.isNested) description = "Saved in ~/.claude/CLAUDE.md";else if (file.type === "Project" && !file.isNested && file.path === projectMemoryPath) description = `${isCheckedIn ? "Checked in at" : "Saved in"} ./CLAUDE.md`;else if (file.parent) description = "@-imported";else if (file.isNested) description = "dynamically loaded";else description = "";
      return {
        label: label,
        value: file.path,
        description: description
      };
    }),
    folderOptions = [],
    agentStore = _t(selectAgentDefinitions);
  if (Kc() || dl()) {
    let autoMemOption: any;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) autoMemOption = {
      label: "Open auto-memory folder",
      value: `${OPEN_FOLDER_PREFIX}${xm()}`,
      description: ""
    }, cache[0] = autoMemOption;else autoMemOption = cache[0];
    if (folderOptions.push(autoMemOption), hI()) {
      let teamMemOption: any;
      if (cache[1] === Symbol.for("react.memo_cache_sentinel")) teamMemOption = {
        label: "Open team memory folder",
        value: `${OPEN_FOLDER_PREFIX}${_E()}`,
        description: ""
      }, cache[1] = teamMemOption;else teamMemOption = cache[1];
      folderOptions.push(teamMemOption);
    }
    for (let agent of agentStore.activeAgents) if (agent.memory) {
      let agentMemPath = Det(agent.agentType, agent.memory);
      folderOptions.push({
        label: `Open ${bt.bold(agent.agentType)} agent memory`,
        value: `${OPEN_FOLDER_PREFIX}${agentMemPath}`,
        description: `${agent.memory} scope`
      });
    }
  }
  options.push(...folderOptions);
  let defaultFocus: any;
  if (cache[2] !== options) defaultFocus = lastSelectedValue && options.some(matchesLastSelected) ? lastSelectedValue : options[0]?.value || "", cache[2] = options, cache[3] = defaultFocus;else defaultFocus = cache[3];
  let defaultFocusValue = defaultFocus,
    [autoMemoryEnabled, setAutoMemoryEnabled] = WG.useState(Kc),
    [autoDreamEnabled, setAutoDreamEnabled] = WG.useState(X6t),
    [memoryUnavailable, setMemoryUnavailable] = WG.useState(Ebn),
    refreshUnavailableEffect: any,
    refreshUnavailableDeps: any;
  if (cache[4] !== memoryUnavailable) refreshUnavailableEffect = () => V7(() => {
    let next = Ebn();
    if (next !== memoryUnavailable) setMemoryUnavailable(next), setAutoMemoryEnabled(Kc());
  }), refreshUnavailableDeps = [memoryUnavailable], cache[4] = memoryUnavailable, cache[5] = refreshUnavailableEffect, cache[6] = refreshUnavailableDeps;else refreshUnavailableEffect = cache[5], refreshUnavailableDeps = cache[6];
  WG.useEffect(refreshUnavailableEffect, refreshUnavailableDeps);
  let [autoDreamGated, setAutoDreamGated] = WG.useState(mWn),
    refreshDreamGateEffect: any,
    refreshDreamGateDeps: any;
  if (cache[7] !== autoDreamGated) refreshDreamGateEffect = () => {
    if (autoDreamGated) return;
    return V7(() => {
      if (mWn()) setAutoDreamGated(!0), setAutoDreamEnabled(X6t());
    });
  }, refreshDreamGateDeps = [autoDreamGated], cache[7] = autoDreamGated, cache[8] = refreshDreamGateEffect, cache[9] = refreshDreamGateDeps;else refreshDreamGateEffect = cache[8], refreshDreamGateDeps = cache[9];
  WG.useEffect(refreshDreamGateEffect, refreshDreamGateDeps);
  let showUnavailableState = memoryUnavailable && !autoMemoryEnabled,
    dreamRowVisible = autoMemoryEnabled && autoDreamGated,
    dreamRunning = _t(selectDreamRunning),
    [lastDreamRunAt, setLastDreamRunAt] = WG.useState(null),
    fetchLastDreamRunEffect: any;
  if (cache[10] !== dreamRowVisible) fetchLastDreamRunEffect = () => {
    if (!dreamRowVisible) return;
    k6n().then(setLastDreamRunAt);
  }, cache[10] = dreamRowVisible, cache[11] = fetchLastDreamRunEffect;else fetchLastDreamRunEffect = cache[11];
  let fetchLastDreamRunDeps: any;
  if (cache[12] !== dreamRunning || cache[13] !== dreamRowVisible) fetchLastDreamRunDeps = [dreamRowVisible, dreamRunning], cache[12] = dreamRunning, cache[13] = dreamRowVisible, cache[14] = fetchLastDreamRunDeps;else fetchLastDreamRunDeps = cache[14];
  WG.useEffect(fetchLastDreamRunEffect, fetchLastDreamRunDeps);
  let dreamStatusText: any;
  if (cache[15] !== dreamRunning || cache[16] !== lastDreamRunAt) dreamStatusText = dreamRunning ? "running" : lastDreamRunAt === null ? "" : lastDreamRunAt === 0 ? "never" : `last ran ${gK(new Date(lastDreamRunAt))}`, cache[15] = dreamRunning, cache[16] = lastDreamRunAt, cache[17] = dreamStatusText;else dreamStatusText = cache[17];
  let dreamStatus = dreamStatusText,
    [confirmIndex, setConfirmIndex] = WG.useState(null),
    confirmActive = confirmIndex !== null,
    maxConfirmIndex = dreamRowVisible ? 1 : 0,
    toggleAutoMemory: any;
  if (cache[18] !== autoMemoryEnabled || cache[19] !== memoryUnavailable) toggleAutoMemory = function () {
    if (dl()) return;
    if (memoryUnavailable) return;
    let next = !autoMemoryEnabled;
    ao("userSettings", {
      autoMemoryEnabled: next
    }), setAutoMemoryEnabled(next), W("tengu_auto_memory_toggled", {
      enabled: next
    });
  }, cache[18] = autoMemoryEnabled, cache[19] = memoryUnavailable, cache[20] = toggleAutoMemory;else toggleAutoMemory = cache[20];
  let onToggleAutoMemory = toggleAutoMemory,
    toggleAutoDream: any;
  if (cache[21] !== autoDreamEnabled || cache[22] !== dreamRowVisible) toggleAutoDream = function () {
    if (!dreamRowVisible) return;
    let next = !autoDreamEnabled,
      isFirstEnable = next && Fr().autoDreamEnabled === void 0;
    ao("userSettings", {
      autoDreamEnabled: next
    }), setAutoDreamEnabled(next), W("tengu_auto_dream_toggled", {
      enabled: next,
      is_first_enable: isFirstEnable
    });
  }, cache[21] = autoDreamEnabled, cache[22] = dreamRowVisible, cache[23] = toggleAutoDream;else toggleAutoDream = cache[23];
  let onToggleAutoDream = toggleAutoDream;
  Df();
  let confirmNoOptions: any;
  if (cache[24] === Symbol.for("react.memo_cache_sentinel")) confirmNoOptions = {
    context: "Confirmation"
  }, cache[24] = confirmNoOptions;else confirmNoOptions = cache[24];
  Or("confirm:no", onCancel, confirmNoOptions);
  let onConfirmYes: any;
  if (cache[25] !== confirmIndex || cache[26] !== onToggleAutoDream || cache[27] !== onToggleAutoMemory) onConfirmYes = () => {
    if (confirmIndex === 0) onToggleAutoMemory();else if (confirmIndex === 1) onToggleAutoDream();
  }, cache[25] = confirmIndex, cache[26] = onToggleAutoDream, cache[27] = onToggleAutoMemory, cache[28] = onConfirmYes;else onConfirmYes = cache[28];
  let confirmYesOptions: any;
  if (cache[29] !== confirmActive) confirmYesOptions = {
    context: "Confirmation",
    isActive: confirmActive
  }, cache[29] = confirmActive, cache[30] = confirmYesOptions;else confirmYesOptions = cache[30];
  Or("confirm:yes", onConfirmYes, confirmYesOptions);
  let onSelectNext: any;
  if (cache[31] !== maxConfirmIndex) onSelectNext = () => {
    setConfirmIndex((prev: any) => prev !== null && prev < maxConfirmIndex ? prev + 1 : null);
  }, cache[31] = maxConfirmIndex, cache[32] = onSelectNext;else onSelectNext = cache[32];
  let selectNextOptions: any;
  if (cache[33] !== confirmActive) selectNextOptions = {
    context: "Select",
    isActive: confirmActive
  }, cache[33] = confirmActive, cache[34] = selectNextOptions;else selectNextOptions = cache[34];
  Or("select:next", onSelectNext, selectNextOptions);
  let onSelectPrevious: any;
  if (cache[35] === Symbol.for("react.memo_cache_sentinel")) onSelectPrevious = () => {
    setConfirmIndex(decrementConfirmIndex);
  }, cache[35] = onSelectPrevious;else onSelectPrevious = cache[35];
  let selectPreviousOptions: any;
  if (cache[36] !== confirmActive) selectPreviousOptions = {
    context: "Select",
    isActive: confirmActive
  }, cache[36] = confirmActive, cache[37] = selectPreviousOptions;else selectPreviousOptions = cache[37];
  Or("select:previous", onSelectPrevious, selectPreviousOptions);
  let autoMemoryRowFocused = confirmIndex === 0,
    autoMemoryStatusNode: any;
  if (cache[38] !== autoMemoryEnabled || cache[39] !== showUnavailableState) autoMemoryStatusNode = showUnavailableState ? cJ.jsx(v, {
    dimColor: !0,
    children: "unavailable for current model"
  }) : dl() ? cJ.jsxs(v, {
    dimColor: !0,
    children: ["off in safe mode — ", eC(), " to re-enable"]
  }) : autoMemoryEnabled ? "on" : "off", cache[38] = autoMemoryEnabled, cache[39] = showUnavailableState, cache[40] = autoMemoryStatusNode;else autoMemoryStatusNode = cache[40];
  let autoMemoryLineNode: any;
  if (cache[41] !== autoMemoryStatusNode) autoMemoryLineNode = cJ.jsxs(v, {
    children: ["Auto-memory:", " ", autoMemoryStatusNode]
  }), cache[41] = autoMemoryStatusNode, cache[42] = autoMemoryLineNode;else autoMemoryLineNode = cache[42];
  let autoMemoryRowNode: any;
  if (cache[43] !== autoMemoryRowFocused || cache[44] !== autoMemoryLineNode) autoMemoryRowNode = cJ.jsx(bE, {
    isFocused: autoMemoryRowFocused,
    children: autoMemoryLineNode
  }), cache[43] = autoMemoryRowFocused, cache[44] = autoMemoryLineNode, cache[45] = autoMemoryRowNode;else autoMemoryRowNode = cache[45];
  let autoDreamRowNode: any;
  if (cache[46] !== autoDreamEnabled || cache[47] !== dreamStatus || cache[48] !== confirmIndex || cache[49] !== dreamRowVisible) autoDreamRowNode = dreamRowVisible && cJ.jsx(bE, {
    isFocused: confirmIndex === 1,
    styled: !1,
    children: cJ.jsxs(v, {
      color: confirmIndex === 1 ? "suggestion" : void 0,
      children: ["Auto-dream: ", autoDreamEnabled ? "on" : "off", dreamStatus && cJ.jsxs(v, {
        dimColor: !0,
        children: [" \xB7 ", dreamStatus]
      })]
    })
  }), cache[46] = autoDreamEnabled, cache[47] = dreamStatus, cache[48] = confirmIndex, cache[49] = dreamRowVisible, cache[50] = autoDreamRowNode;else autoDreamRowNode = cache[50];
  let togglesNode: any;
  if (cache[51] !== autoMemoryRowNode || cache[52] !== autoDreamRowNode) togglesNode = cJ.jsxs($, {
    flexDirection: "column",
    marginBottom: 1,
    children: [autoMemoryRowNode, autoDreamRowNode]
  }), cache[51] = autoMemoryRowNode, cache[52] = autoDreamRowNode, cache[53] = togglesNode;else togglesNode = cache[53];
  let handleSelect: any;
  if (cache[54] !== onSelect) handleSelect = (value: any) => {
    if (value.startsWith(OPEN_FOLDER_PREFIX)) {
      let folderPath = value.slice(OPEN_FOLDER_PREFIX.length);
      MemoryFileSelector_fs.mkdir(folderPath, {
        recursive: !0
      }).catch(noopSwallowMkdir).then(() => fxt(folderPath)).catch(noopSwallowOpen);
      return;
    }
    lastSelectedValue = value, onSelect(value);
  }, cache[54] = onSelect, cache[55] = handleSelect;else handleSelect = cache[55];
  let onUpFromFirstItem: any;
  if (cache[56] !== maxConfirmIndex) onUpFromFirstItem = () => setConfirmIndex(maxConfirmIndex), cache[56] = maxConfirmIndex, cache[57] = onUpFromFirstItem;else onUpFromFirstItem = cache[57];
  let selectListNode: any;
  if (cache[58] !== defaultFocusValue || cache[59] !== options || cache[60] !== onCancel || cache[61] !== handleSelect || cache[62] !== onUpFromFirstItem || cache[63] !== confirmActive) selectListNode = cJ.jsx(hr, {
    defaultFocusValue: defaultFocusValue,
    options: options,
    isDisabled: confirmActive,
    onChange: handleSelect,
    onCancel: onCancel,
    onUpFromFirstItem: onUpFromFirstItem
  }), cache[58] = defaultFocusValue, cache[59] = options, cache[60] = onCancel, cache[61] = handleSelect, cache[62] = onUpFromFirstItem, cache[63] = confirmActive, cache[64] = selectListNode;else selectListNode = cache[64];
  let rootNode: any;
  if (cache[65] !== togglesNode || cache[66] !== selectListNode) rootNode = cJ.jsxs($, {
    flexDirection: "column",
    width: "100%",
    children: [togglesNode, selectListNode]
  }), cache[65] = togglesNode, cache[66] = selectListNode, cache[67] = rootNode;else rootNode = cache[67];
  return rootNode;
}

/** No-op: swallows errors from opening folder after mkdir */
function noopSwallowOpen() {}

/** No-op: swallows errors from mkdir itself */
function noopSwallowMkdir() {}

/** Decrements the confirmation-row index, clamped to 0, or returns null when already null */
function decrementConfirmIndex(index: any) {
  return index !== null && index > 0 ? index - 1 : index;
}

/** Selector: returns true while any task of type "dream" is running */
function selectDreamRunning(state: any) {
  return Object.values(state.tasks).some(isActiveDreamTask);
}

/** Predicate: task is an active dream task */
function isActiveDreamTask(task: any) {
  return task.type === "dream" && task.status === "running";
}

/** Predicate: memory file option matches the currently-selected path */
function matchesLastSelected(option: any) {
  return option.value === lastSelectedValue;
}

/** Selector: extracts agentDefinitions from store state */
function selectAgentDefinitions(state: any) {
  return state.agentDefinitions;
}

/** Maps a raw memory file entry to one flagged as existing */
function markExisting(entry: any) {
  return {
    ...entry,
    exists: !0
  };
}

/** Filters out AutoMem entries and synthetic memory paths */
function isSelectableMemoryFile(entry: any) {
  return entry.type !== "AutoMem" && !Eke(entry.path);
}
var MemoryFileSelector_c: any,
  MemoryFileSelector_fs: any,
  hvo: any,
  WG: any,
  cJ: any,
  lastSelectedValue: any,
  OPEN_FOLDER_PREFIX = "__open_folder__";

/** Module initializer — lazy-initializes all vendor/config imports */
var initMemoryFileSelectorModule = b(() => {
  Gc();
  lt();
  TI();
  je();
  ss();
  Jm();
  cO();
  jn();
  kt();
  zSo();
  I6n();
  uo();
  rz();
  Jg();
  ZR();
  dn();
  Xl();
  Xo();
  j_l();
  br();
  lr();
  TS();
  Pie();
  MemoryFileSelector_c = x(tt(), 1), MemoryFileSelector_fs = require("fs/promises"), hvo = require("path"), WG = x(et(), 1), cJ = x(oe(), 1);
});

export {MemoryFileSelector as X_l,noopSwallowOpen as dnm,noopSwallowMkdir as pnm,decrementConfirmIndex as mnm,selectDreamRunning as fnm,isActiveDreamTask as hnm,matchesLastSelected as gnm,selectAgentDefinitions as _nm,markExisting as ynm,isSelectableMemoryFile as Tnm,MemoryFileSelector_c as Y_l,MemoryFileSelector_fs as J_l,hvo,WG,cJ,lastSelectedValue as s7n,OPEN_FOLDER_PREFIX as cWt,initMemoryFileSelectorModule as Q_l};
