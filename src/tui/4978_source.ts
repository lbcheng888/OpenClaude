// @ts-nocheck
import {qw,sP} from "../../vendor/m4535.ts";
import {UPl,_0o,FPl,BPl,y0o} from "../../vendor/m4968.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {yg,_4} from "../../vendor/m2581.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {getConfigFilePath as $G,eWe} from "../../vendor/m4595.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Agent list / picker view (TUI).
 *
 * Renders the list of available subagents, grouped by source, with keyboard
 * navigation, a "Create new agent" affordance, running-counts, shadowing
 * indicators, and scroll/pagination ("N more" rows). The component body is
 * compiled with the React forget memo-cache (`Hgt.c(...)`), so the bulk of the
 * code is cache slot bookkeeping (`t[i] !== x ? recompute : reuse`).
 */

interface AgentInfo {
  agentType: string;
  source: string;
  baseDir?: string;
  memory?: string;
  overriddenBy?: AgentInfo | null;
}

interface AgentListProps {
  source: string;
  agents: AgentInfo[];
  runningByType: Map<string, number> | undefined;
  usedThisSession: Set<string> | undefined;
  onSelect: (agent: AgentInfo) => void;
  onCreateNew?: (() => void) | undefined;
  changes?: string[];
}

/** Main agent-picker component. */
function AgentPicker(props: AgentListProps) {
  let cache = Hgt.c(75),
    {
      source: source,
      agents: agents,
      runningByType: runningByType,
      usedThisSession: usedThisSession,
      onSelect: onSelect,
      onCreateNew: onCreateNew,
      changes: changes
    } = props,
    [selected, setSelected] = kgt.useState(null),
    [createNewActive, setCreateNewActive] = kgt.useState(!!onCreateNew),
    {
      headerFocused: headerFocused,
      focusHeader: focusHeader
    } = qw(),
    sortedAgents;
  if (cache[0] !== agents || cache[1] !== source || cache[2] !== usedThisSession) {
    e: {
      let base = [...agents].sort(UPl);
      if (source !== "all" || !usedThisSession || usedThisSession.size === 0) {
        sortedAgents = base;
        break e;
      }
      let usageComparator;
      if (cache[4] !== usedThisSession) usageComparator = (a, b) => {
        let aRank = usedThisSession.has(a.agentType) ? 0 : 1,
          bRank = usedThisSession.has(b.agentType) ? 0 : 1;
        return aRank - bRank;
      }, cache[4] = usedThisSession, cache[5] = usageComparator;else usageComparator = cache[5];
      sortedAgents = base.sort(usageComparator);
    }
    cache[0] = agents, cache[1] = source, cache[2] = usedThisSession, cache[3] = sortedAgents;
  } else sortedAgents = cache[3];
  let allAgents = sortedAgents,
    activeSelection = headerFocused || createNewActive ? null : selected,
    visibleAgents;
  if (cache[6] !== allAgents || cache[7] !== source) {
    e: {
      let nonBuiltIn = allAgents.filter(isNotBuiltIn_Filter);
      if (source === "all") {
        visibleAgents = _0o.filter(isNotBuiltIn_Source).flatMap(entry => {
          let {
            source: entrySource
          } = entry;
          return nonBuiltIn.filter(agent => agent.source === entrySource);
        });
        break e;
      }
      visibleAgents = nonBuiltIn;
    }
    cache[6] = allAgents, cache[7] = source, cache[8] = visibleAgents;
  } else visibleAgents = cache[8];
  let displayedAgents = visibleAgents,
    {
      rows: rows
    } = _r(),
    [scrollOffset, setScrollOffset] = kgt.useState(0),
    pageSize = Math.max(5, rows - 14),
    indexMap;
  if (cache[9] !== displayedAgents) {
    indexMap = new Map();
    for (let i = 0; i < displayedAgents.length; i++) {
      let agent = displayedAgents[i];
      indexMap.set(`${agent.agentType}-${agent.source}`, i);
    }
    cache[9] = displayedAgents, cache[10] = indexMap;
  } else indexMap = cache[10];
  let agentIndexMap = indexMap,
    isInViewport;
  if (cache[11] !== agentIndexMap || cache[12] !== pageSize || cache[13] !== scrollOffset) isInViewport = agent => {
    let idx = agentIndexMap.get(`${agent.agentType}-${agent.source}`);
    if (idx === void 0) return !0;
    return idx >= scrollOffset && idx < scrollOffset + pageSize;
  }, cache[11] = agentIndexMap, cache[12] = pageSize, cache[13] = scrollOffset, cache[14] = isInViewport;else isInViewport = cache[14];
  let inViewport = isInViewport,
    hasAbove = scrollOffset > 0,
    hasBelow = scrollOffset + pageSize < displayedAgents.length,
    autoSelectEffect;
  if (cache[15] !== createNewActive || cache[16] !== onCreateNew || cache[17] !== displayedAgents[0] || cache[18] !== displayedAgents.length || cache[19] !== selected) autoSelectEffect = () => {
    if (!selected && !createNewActive && displayedAgents.length > 0) if (onCreateNew) setCreateNewActive(!0);else setSelected(displayedAgents[0] || null);
  }, cache[15] = createNewActive, cache[16] = onCreateNew, cache[17] = displayedAgents[0], cache[18] = displayedAgents.length, cache[19] = selected, cache[20] = autoSelectEffect;else autoSelectEffect = cache[20];
  let autoSelectDeps;
  if (cache[21] !== createNewActive || cache[22] !== onCreateNew || cache[23] !== displayedAgents || cache[24] !== selected) autoSelectDeps = [displayedAgents, selected, createNewActive, onCreateNew], cache[21] = createNewActive, cache[22] = onCreateNew, cache[23] = displayedAgents, cache[24] = selected, cache[25] = autoSelectDeps;else autoSelectDeps = cache[25];
  kgt.useEffect(autoSelectEffect, autoSelectDeps);
  let onKeyDownHandler;
  if (cache[26] !== focusHeader || cache[27] !== headerFocused || cache[28] !== createNewActive || cache[29] !== onCreateNew || cache[30] !== onSelect || cache[31] !== displayedAgents || cache[32] !== selected || cache[33] !== pageSize || cache[34] !== scrollOffset) onKeyDownHandler = event => {
    if (headerFocused) return;
    if (event.key === "return") {
      if (event.preventDefault(), createNewActive && onCreateNew) onCreateNew();else if (selected) onSelect(selected);
      return;
    }
    if (event.key !== "up" && event.key !== "down") return;
    event.preventDefault();
    let hasCreateNew = !!onCreateNew,
      totalItems = displayedAgents.length + (hasCreateNew ? 1 : 0);
    if (totalItems === 0) {
      if (event.key === "up") focusHeader();
      return;
    }
    let currentIndex = 0;
    if (!createNewActive && selected) {
      let foundIndex = displayedAgents.findIndex(agent => agent.agentType === selected.agentType && agent.source === selected.source);
      if (foundIndex >= 0) currentIndex = hasCreateNew ? foundIndex + 1 : foundIndex;
    }
    if (event.key === "up" && currentIndex === 0) {
      focusHeader();
      return;
    }
    let nextIndex = event.key === "up" ? currentIndex - 1 : Math.min(currentIndex + 1, totalItems - 1);
    if (hasCreateNew && nextIndex === 0) setCreateNewActive(!0), setSelected(null), setScrollOffset(0);else {
      let agentIndex = hasCreateNew ? nextIndex - 1 : nextIndex,
        nextAgent = displayedAgents[agentIndex];
      if (nextAgent) {
        if (setCreateNewActive(!1), setSelected(nextAgent), agentIndex < scrollOffset) setScrollOffset(agentIndex);else if (agentIndex >= scrollOffset + pageSize) setScrollOffset(agentIndex - pageSize + 1);
      }
    }
  }, cache[26] = focusHeader, cache[27] = headerFocused, cache[28] = createNewActive, cache[29] = onCreateNew, cache[30] = onSelect, cache[31] = displayedAgents, cache[32] = selected, cache[33] = pageSize, cache[34] = scrollOffset, cache[35] = onKeyDownHandler;else onKeyDownHandler = cache[35];
  let onKeyDown = onKeyDownHandler,
    mainContent,
    earlyReturn;
  if (cache[36] !== activeSelection || cache[37] !== changes || cache[38] !== onKeyDown || cache[39] !== hasAbove || cache[40] !== hasBelow || cache[41] !== headerFocused || cache[42] !== inViewport || cache[43] !== createNewActive || cache[44] !== onCreateNew || cache[45] !== runningByType || cache[46] !== displayedAgents.length || cache[47] !== allAgents || cache[48] !== source || cache[49] !== pageSize || cache[50] !== scrollOffset) {
    earlyReturn = Symbol.for("react.early_return_sentinel");
    e: {
      let builtInAgents = allAgents.filter(isBuiltIn_Filter);
      if (!allAgents.length || source !== "built-in" && !allAgents.some(isNotBuiltIn_Some)) {
        let autoFocus = !headerFocused,
          createNewRow;
        if (cache[53] !== headerFocused || cache[54] !== createNewActive || cache[55] !== onCreateNew) createNewRow = onCreateNew && hl.jsx($, {
          children: hl.jsx(CreateNewAgentItem, {
            active: createNewActive && !headerFocused
          })
        }), cache[53] = headerFocused, cache[54] = createNewActive, cache[55] = onCreateNew, cache[56] = createNewRow;else createNewRow = cache[56];
        let emptyMessage;
        if (cache[57] !== onCreateNew) emptyMessage = onCreateNew ? hl.jsxs(hl.Fragment, {
          children: [hl.jsx(v, {
            dimColor: !0,
            children: "No agents found. Create specialized subagents that Claude can delegate to."
          }), hl.jsx(v, {
            dimColor: !0,
            children: "Each subagent has its own context window, custom system prompt, and specific tools."
          }), hl.jsx(v, {
            dimColor: !0,
            children: "Try creating: Code Reviewer, Code Simplifier, Security Reviewer, Tech Lead, or UX Reviewer."
          })]
        }) : hl.jsx(v, {
          dimColor: !0,
          children: "No agents found."
        }), cache[57] = onCreateNew, cache[58] = emptyMessage;else emptyMessage = cache[58];
        let builtInSection = source !== "built-in" && builtInAgents.length > 0 && hl.jsxs(hl.Fragment, {
            children: [hl.jsx(yg, {}), hl.jsx(BuiltInAgentsSection, {
              agents: builtInAgents,
              runningByType: runningByType
            })]
          }),
          emptyView;
        if (cache[59] !== onKeyDown || cache[60] !== createNewRow || cache[61] !== emptyMessage || cache[62] !== builtInSection || cache[63] !== autoFocus) emptyView = hl.jsxs($, {
          flexDirection: "column",
          gap: 1,
          tabIndex: 0,
          autoFocus: autoFocus,
          onKeyDown: onKeyDown,
          children: [createNewRow, emptyMessage, builtInSection]
        }), cache[59] = onKeyDown, cache[60] = createNewRow, cache[61] = emptyMessage, cache[62] = builtInSection, cache[63] = autoFocus, cache[64] = emptyView;else emptyView = cache[64];
        earlyReturn = emptyView;
        break e;
      }
      let changesNotice;
      if (cache[65] !== changes) changesNotice = changes && changes.length > 0 && hl.jsx($, {
        marginBottom: 1,
        children: hl.jsx(v, {
          dimColor: !0,
          children: changes.at(-1)
        })
      }), cache[65] = changes, cache[66] = changesNotice;else changesNotice = cache[66];
      let createNewRow;
      if (cache[67] !== hasAbove || cache[68] !== headerFocused || cache[69] !== createNewActive || cache[70] !== onCreateNew) createNewRow = onCreateNew && !hasAbove && hl.jsx($, {
        marginBottom: 1,
        children: hl.jsx(CreateNewAgentItem, {
          active: createNewActive && !headerFocused
        })
      }), cache[67] = hasAbove, cache[68] = headerFocused, cache[69] = createNewActive, cache[70] = onCreateNew, cache[71] = createNewRow;else createNewRow = cache[71];
      let moreAbove;
      if (cache[72] !== hasAbove || cache[73] !== scrollOffset) moreAbove = hasAbove && hl.jsx($, {
        paddingLeft: 2,
        children: hl.jsxs(v, {
          dimColor: !0,
          children: [hl.jsxs(v, {
            "aria-hidden": !0,
            children: [Xe.arrowUp, " "]
          }), scrollOffset, " more"]
        })
      }), cache[72] = hasAbove, cache[73] = scrollOffset, cache[74] = moreAbove;else moreAbove = cache[74];
      mainContent = hl.jsxs($, {
        flexDirection: "column",
        tabIndex: 0,
        autoFocus: !headerFocused,
        onKeyDown: onKeyDown,
        children: [changesNotice, createNewRow, moreAbove, source === "all" ? hl.jsxs(hl.Fragment, {
          children: [_0o.filter(isNotBuiltIn_All).map(entry => {
            let {
              label: label,
              source: entrySource
            } = entry;
            return hl.jsx(AgentSourceGroup, {
              title: label,
              agents: allAgents.filter(agent => agent.source === entrySource).filter(inViewport),
              activeSelection: activeSelection,
              runningByType: runningByType
            }, entrySource);
          }), hasBelow && hl.jsx($, {
            paddingLeft: 2,
            children: hl.jsxs(v, {
              dimColor: !0,
              children: [hl.jsxs(v, {
                "aria-hidden": !0,
                children: [Xe.arrowDown, " "]
              }), displayedAgents.length - scrollOffset - pageSize, " ", "more"]
            })
          }), !hasBelow && builtInAgents.length > 0 && hl.jsxs($, {
            flexDirection: "column",
            marginBottom: 1,
            paddingLeft: 2,
            children: [hl.jsxs(v, {
              dimColor: !0,
              children: [hl.jsx(v, {
                bold: !0,
                children: "Built-in agents"
              }), " (always available)"]
            }), builtInAgents.map(agent => hl.jsx(AgentRow, {
              agent: agent,
              activeSelection: activeSelection,
              runningByType: runningByType
            }, `${agent.agentType}-${agent.source}`))]
          })]
        }) : source === "built-in" ? hl.jsxs(hl.Fragment, {
          children: [hl.jsx(v, {
            dimColor: !0,
            italic: !0,
            children: "Built-in agents are provided by default and cannot be modified."
          }), hl.jsx($, {
            marginTop: 1,
            flexDirection: "column",
            children: allAgents.map(agent => hl.jsx(AgentRow, {
              agent: agent,
              activeSelection: activeSelection,
              runningByType: runningByType
            }, `${agent.agentType}-${agent.source}`))
          })]
        }) : hl.jsxs(hl.Fragment, {
          children: [allAgents.filter(isNotBuiltIn_Default).filter(inViewport).map(agent => hl.jsx(AgentRow, {
            agent: agent,
            activeSelection: activeSelection,
            runningByType: runningByType
          }, `${agent.agentType}-${agent.source}`)), hasBelow && hl.jsx($, {
            paddingLeft: 2,
            children: hl.jsxs(v, {
              dimColor: !0,
              children: [hl.jsxs(v, {
                "aria-hidden": !0,
                children: [Xe.arrowDown, " "]
              }), displayedAgents.length - scrollOffset - pageSize, " ", "more"]
            })
          }), !hasBelow && builtInAgents.length > 0 && hl.jsxs(hl.Fragment, {
            children: [hl.jsx(yg, {}), hl.jsx(BuiltInAgentsSection, {
              agents: builtInAgents,
              runningByType: runningByType
            })]
          })]
        })]
      });
    }
    cache[36] = activeSelection, cache[37] = changes, cache[38] = onKeyDown, cache[39] = hasAbove, cache[40] = hasBelow, cache[41] = headerFocused, cache[42] = inViewport, cache[43] = createNewActive, cache[44] = onCreateNew, cache[45] = runningByType, cache[46] = displayedAgents.length, cache[47] = allAgents, cache[48] = source, cache[49] = pageSize, cache[50] = scrollOffset, cache[51] = mainContent, cache[52] = earlyReturn;
  } else mainContent = cache[51], earlyReturn = cache[52];
  if (earlyReturn !== Symbol.for("react.early_return_sentinel")) return earlyReturn;
  return mainContent;
}
/** Predicate: agent is NOT a built-in (default-mode list filter). */
function isNotBuiltIn_Default(agent: AgentInfo) {
  return agent.source !== "built-in";
}
/** Predicate: agent is NOT a built-in (all-mode entry filter). */
function isNotBuiltIn_All(agent: AgentInfo) {
  return agent.source !== "built-in";
}
/** Predicate: agent is NOT a built-in (has-any check). */
function isNotBuiltIn_Some(agent: AgentInfo) {
  return agent.source !== "built-in";
}
/** Predicate: agent IS a built-in. */
function isBuiltIn_Filter(agent: AgentInfo) {
  return agent.source === "built-in";
}
/** Predicate: agent is NOT a built-in (source-list filter). */
function isNotBuiltIn_Source(agent: AgentInfo) {
  return agent.source !== "built-in";
}
/** Predicate: agent is NOT a built-in (visible-agents filter). */
function isNotBuiltIn_Filter(agent: AgentInfo) {
  return agent.source !== "built-in";
}
/** Row for the "Create new agent" affordance. */
function CreateNewAgentItem(props: { active: boolean }) {
  let cache = Hgt.c(9),
    {
      active: active
    } = props,
    ariaLabel = active ? "selected," : "",
    color = active ? "suggestion" : void 0,
    pointer = active ? `${Xe.pointer} ` : "  ",
    pointerCell;
  if (cache[0] !== ariaLabel || cache[1] !== color || cache[2] !== pointer) pointerCell = hl.jsx(v, {
    "aria-label": ariaLabel,
    color: color,
    children: pointer
  }), cache[0] = ariaLabel, cache[1] = color, cache[2] = pointer, cache[3] = pointerCell;else pointerCell = cache[3];
  let labelColor = active ? "suggestion" : void 0,
    labelCell;
  if (cache[4] !== labelColor) labelCell = hl.jsx(v, {
    color: labelColor,
    children: "Create new agent"
  }), cache[4] = labelColor, cache[5] = labelCell;else labelCell = cache[5];
  let row;
  if (cache[6] !== pointerCell || cache[7] !== labelCell) row = hl.jsxs($, {
    children: [pointerCell, labelCell]
  }), cache[6] = pointerCell, cache[7] = labelCell, cache[8] = row;else row = cache[8];
  return row;
}
/** A single agent row (pointer, type, description, memory, running count, shadow notice). */
function AgentRow(props: { agent: AgentInfo; activeSelection: AgentInfo | null; runningByType: Map<string, number> | undefined }) {
  let cache = Hgt.c(33),
    {
      agent: agent,
      activeSelection: activeSelection,
      runningByType: runningByType
    } = props,
    isBuiltIn = agent.source === "built-in",
    isSelected = !isBuiltIn && activeSelection?.agentType === agent.agentType && activeSelection?.source === agent.source,
    overriddenBy = agent.overriddenBy || null,
    isShadowed = !!overriddenBy,
    isDimmed = isBuiltIn || isShadowed,
    selectedColor = !isBuiltIn && isSelected ? "suggestion" : void 0,
    description;
  if (cache[0] !== agent) description = FPl(agent), cache[0] = agent, cache[1] = description;else description = cache[1];
  let agentDescription = description,
    runningCount;
  if (cache[2] !== agent.agentType || cache[3] !== isShadowed || cache[4] !== runningByType) runningCount = isShadowed ? 0 : runningByType?.get(agent.agentType) ?? 0, cache[2] = agent.agentType, cache[3] = isShadowed, cache[4] = runningByType, cache[5] = runningCount;else runningCount = cache[5];
  let running = runningCount,
    ariaLabel = isSelected ? "selected," : "",
    pointerDimmed = isDimmed && !isSelected,
    pointer = isBuiltIn ? "" : isSelected ? `${Xe.pointer} ` : "  ",
    pointerCell;
  if (cache[6] !== ariaLabel || cache[7] !== pointerDimmed || cache[8] !== pointer || cache[9] !== selectedColor) pointerCell = hl.jsx(v, {
    "aria-label": ariaLabel,
    dimColor: pointerDimmed,
    color: selectedColor,
    children: pointer
  }), cache[6] = ariaLabel, cache[7] = pointerDimmed, cache[8] = pointer, cache[9] = selectedColor, cache[10] = pointerCell;else pointerCell = cache[10];
  let typeDimmed = isDimmed && !isSelected,
    typeCell;
  if (cache[11] !== agent.agentType || cache[12] !== typeDimmed || cache[13] !== selectedColor) typeCell = hl.jsx(v, {
    dimColor: typeDimmed,
    color: selectedColor,
    children: agent.agentType
  }), cache[11] = agent.agentType, cache[12] = typeDimmed, cache[13] = selectedColor, cache[14] = typeCell;else typeCell = cache[14];
  let descriptionCell;
  if (cache[15] !== agentDescription || cache[16] !== selectedColor) descriptionCell = agentDescription && hl.jsxs(v, {
    dimColor: !0,
    color: selectedColor,
    children: [" \xB7 ", agentDescription]
  }), cache[15] = agentDescription, cache[16] = selectedColor, cache[17] = descriptionCell;else descriptionCell = cache[17];
  let memoryCell;
  if (cache[18] !== agent.memory || cache[19] !== selectedColor) memoryCell = agent.memory && hl.jsxs(v, {
    dimColor: !0,
    color: selectedColor,
    children: [" \xB7 ", agent.memory, " memory"]
  }), cache[18] = agent.memory, cache[19] = selectedColor, cache[20] = memoryCell;else memoryCell = cache[20];
  let runningCell;
  if (cache[21] !== running) runningCell = running > 0 && hl.jsxs(v, {
    color: "success",
    children: [" ", hl.jsxs(v, {
      "aria-hidden": !0,
      children: [Ql, " "]
    }), running, " running"]
  }), cache[21] = running, cache[22] = runningCell;else runningCell = cache[22];
  let shadowCell;
  if (cache[23] !== isSelected || cache[24] !== overriddenBy) shadowCell = overriddenBy && hl.jsxs(v, {
    dimColor: !isSelected,
    color: isSelected ? "warning" : void 0,
    children: [" ", hl.jsxs(v, {
      "aria-hidden": !0,
      children: [Xe.warning, " "]
    }), "shadowed by", " ", BPl(overriddenBy)]
  }), cache[23] = isSelected, cache[24] = overriddenBy, cache[25] = shadowCell;else shadowCell = cache[25];
  let row;
  if (cache[26] !== memoryCell || cache[27] !== runningCell || cache[28] !== shadowCell || cache[29] !== pointerCell || cache[30] !== typeCell || cache[31] !== descriptionCell) row = hl.jsxs($, {
    children: [pointerCell, typeCell, descriptionCell, memoryCell, runningCell, shadowCell]
  }), cache[26] = memoryCell, cache[27] = runningCell, cache[28] = shadowCell, cache[29] = pointerCell, cache[30] = typeCell, cache[31] = descriptionCell, cache[32] = row;else row = cache[32];
  return row;
}
/** Section listing built-in agents under a "Built-in (always available):" header. */
function BuiltInAgentsSection(props: { agents: AgentInfo[]; runningByType: Map<string, number> | undefined }) {
  let cache = Hgt.c(8),
    {
      agents: agents,
      runningByType: runningByType
    } = props,
    header;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) header = hl.jsx(v, {
    bold: !0,
    dimColor: !0,
    children: "Built-in (always available):"
  }), cache[0] = header;else header = cache[0];
  let rows;
  if (cache[1] !== agents || cache[2] !== runningByType) {
    let renderRow;
    if (cache[4] !== runningByType) renderRow = agent => hl.jsx(AgentRow, {
      agent: agent,
      activeSelection: null,
      runningByType: runningByType
    }, `${agent.agentType}-${agent.source}`), cache[4] = runningByType, cache[5] = renderRow;else renderRow = cache[5];
    rows = agents.map(renderRow), cache[1] = agents, cache[2] = runningByType, cache[3] = rows;
  } else rows = cache[3];
  let section;
  if (cache[6] !== rows) section = hl.jsxs($, {
    flexDirection: "column",
    marginBottom: 1,
    paddingLeft: 2,
    children: [header, rows]
  }), cache[6] = rows, cache[7] = section;else section = cache[7];
  return section;
}
/** Group of agents from a single source, with a title and optional baseDir subtitle. */
function AgentSourceGroup(props: { title: string; agents: AgentInfo[]; activeSelection: AgentInfo | null; runningByType: Map<string, number> | undefined }) {
  let cache = Hgt.c(18),
    {
      title: title,
      agents: agents,
      activeSelection: activeSelection,
      runningByType: runningByType
    } = props;
  if (!agents.length) return null;
  let baseDir = agents[0]?.baseDir,
    titleCell;
  if (cache[0] !== title) titleCell = hl.jsx(v, {
    bold: !0,
    dimColor: !0,
    children: title
  }), cache[0] = title, cache[1] = titleCell;else titleCell = cache[1];
  let showBaseDir = baseDir ?? !1,
    baseDirCell;
  if (cache[2] !== baseDir || cache[3] !== showBaseDir) baseDirCell = hl.jsx($G, {
    when: showBaseDir,
    children: baseDir
  }), cache[2] = baseDir, cache[3] = showBaseDir, cache[4] = baseDirCell;else baseDirCell = cache[4];
  let headerRow;
  if (cache[5] !== titleCell || cache[6] !== baseDirCell) headerRow = hl.jsxs($, {
    paddingLeft: 2,
    children: [titleCell, baseDirCell]
  }), cache[5] = titleCell, cache[6] = baseDirCell, cache[7] = headerRow;else headerRow = cache[7];
  let rows;
  if (cache[8] !== activeSelection || cache[9] !== agents || cache[10] !== runningByType) {
    let renderRow;
    if (cache[12] !== activeSelection || cache[13] !== runningByType) renderRow = agent => hl.jsx(AgentRow, {
      agent: agent,
      activeSelection: activeSelection,
      runningByType: runningByType
    }, `${agent.agentType}-${agent.source}`), cache[12] = activeSelection, cache[13] = runningByType, cache[14] = renderRow;else renderRow = cache[14];
    rows = agents.map(renderRow), cache[8] = activeSelection, cache[9] = agents, cache[10] = runningByType, cache[11] = rows;
  } else rows = cache[11];
  let group;
  if (cache[15] !== headerRow || cache[16] !== rows) group = hl.jsxs($, {
    flexDirection: "column",
    marginBottom: 1,
    children: [headerRow, rows]
  }), cache[15] = headerRow, cache[16] = rows, cache[17] = group;else group = cache[17];
  return group;
}
var Hgt, kgt, hl;
var lOl = b(() => {
  Zs();
  Pa();
  ui();
  je();
  y0o();
  eWe();
  _4();
  sP();
  Hgt = x(tt(), 1), kgt = x(et(), 1), hl = x(oe(), 1);
});
export {AgentPicker as aOl,isNotBuiltIn_Default as Ogm,isNotBuiltIn_All as Lgm,isNotBuiltIn_Some as Mgm,isBuiltIn_Filter as Ngm,isNotBuiltIn_Source as Fgm,isNotBuiltIn_Filter as Bgm,CreateNewAgentItem as sOl,AgentRow as NGt,BuiltInAgentsSection as iOl,AgentSourceGroup as Ugm,Hgt,kgt,hl,lOl};
