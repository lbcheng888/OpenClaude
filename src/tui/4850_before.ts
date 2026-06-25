// @ts-nocheck
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {IOn,xOn,iat} from "../telemetry/3329_prNumber.ts";
import {I1e,vn} from "../session/0621_length.ts";
import {formatLogMetadata as b7e,Xo} from "../../vendor/m240.ts";
import {Dy,SE} from "../../vendor/m2559.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {useTerminalFocus as nh} from "../../vendor/m2390.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {isCustomTitleEnabled as UTe,getSessionIdFromLog as fh,getFirstMeaningfulUserMessageTextContent as SGt,saveCustomTitle as i6,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {useResolvedTheme as TD} from "../../vendor/m2285.ts";
import {che,N8} from "../config/2299_level.ts";
import {getOriginalCwd as gr,getSessionId as It,lt} from "../session/0132_sent.ts";
import {RH,lne} from "../../vendor/m4558.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {getBranch as Ry,ia} from "../../vendor/m698.ts";
import {w5,N1e} from "../../vendor/m647.ts";
import {Phe,ku,rS} from "../../vendor/m2582.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {pHl,mHl} from "../../vendor/m4847.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {aP,aue} from "../config/4552_query.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {gd,xw} from "./3853_mode.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {hHl,gHl} from "../../vendor/m4848.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {b,x} from "../../runtime.ts";
import {Mzn} from "../../vendor/m4802.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// Session resume / search TUI module (Claude Code v2.1.190).
// Ported readable identifiers, TS types and comments from v2.1.185
// (claude-code-ts/src/v185-restored/tui/4818_before.tsx). Structure is taken
// from the v190 byte-exact slice and is authoritative.

/** Collapse whitespace in `text` and truncate to terminal `width`. */
function THl(text: any, width: any) {
  let normalized = text.replace(/\s+/g, " ").trim();
  return xs(normalized, width);
}

/** Render a search snippet: dim the before/after context, highlight the match. */
function GHo({
  before: before,
  match: match,
  after: after
}: any, highlight: any) {
  return bt.dim(before) + highlight(match) + bt.dim(after);
}

/** Expand bare PR references in `text` to `PR #<num> <repo>`. */
function Epm(text: any) {
  return text.replace(new RegExp(IOn.source + '[^,\\s"]*', "g"), (token: any) => {
    let parsed = xOn(token);
    return parsed ? `PR #${parsed.prNumber} ${parsed.prRepository}` : token;
  });
}

/**
 * Find `query` (case-insensitive) in `text` and return a context window of
 * `context` chars on each side, with leading/trailing ellipses when clipped.
 */
function Cpm(text: any, query: any, context: any) {
  let matchStart = text.toLowerCase().indexOf(query.toLowerCase());
  if (matchStart === -1) return null;
  let matchEnd = matchStart + query.length,
    sliceStart = Math.max(0, matchStart - context),
    sliceEnd = Math.min(text.length, matchEnd + context),
    beforeText = text.slice(sliceStart, matchStart),
    matchText = text.slice(matchStart, matchEnd),
    afterText = text.slice(matchEnd, sliceEnd);
  return {
    before: (sliceStart > 0 ? "\u2026" : "") + beforeText.replace(/\s+/g, " ").trimStart(),
    match: matchText.trim(),
    after: afterText.replace(/\s+/g, " ").trimEnd() + (sliceEnd < text.length ? "\u2026" : "")
  };
}

/** Build a session label fitting `width`, accounting for sidechain/fork suffixes. */
function VHo(log: any, width: any, options: any) {
  let {
      isGroupHeader: isGroupHeader = !1,
      isChild: isChild = !1,
      forkCount: forkCount = 0
    } = options || {},
    indent = isGroupHeader && forkCount > 0 ? gpm : isChild ? _pm : 0,
    forkSuffix = isGroupHeader && forkCount > 0 ? ` (+${forkCount} other ${forkCount === 1 ? "session" : "sessions"})` : "",
    sidechainSuffix = log.isSidechain ? " (sidechain)" : "",
    titleWidth = width - indent - sidechainSuffix.length - forkSuffix.length;
  return `${THl(I1e(log), titleWidth)}${sidechainSuffix}${forkSuffix}`;
}

/** Build a session description line: metadata plus optional project path. */
function KHo(log: any, options: any) {
  let {
      isChild: isChild = !1,
      showProjectPath: showProjectPath = !1
    } = options || {},
    indent = isChild ? "    " : "",
    metadata = b7e(log),
    projectSuffix = showProjectPath && log.projectPath ? ` \xB7 ${log.projectPath}` : "";
  return indent + metadata + projectSuffix;
}

/** Resume-session picker with branch/worktree filters, search and rename. */
function fjn({
  logs: logs,
  maxHeight: maxHeight = 1 / 0,
  forceWidth: forceWidth,
  onCancel: onCancel,
  onSelect: onSelect,
  onLogsChanged: onLogsChanged,
  onLoadMore: onLoadMore,
  initialSearchQuery: initialSearchQuery,
  isLoading: isLoading = !1,
  reloadGeneration: reloadGeneration = 0,
  showAllProjects: showAllProjects = !1,
  onToggleAllProjects: onToggleAllProjects,
  onAgenticSearch: onAgenticSearch
}: any) {
  let terminalSize = Dy(_r()),
    columns = forceWidth === void 0 ? terminalSize.columns : forceWidth,
    exitState = Df(onCancel),
    isTerminalFocused = nh(),
    clock = As(),
    customTitleEnabled = UTe(),
    _unusedFlag = !1,
    theme = TD(),
    highlightFn = Cu.useMemo(() => (segment: any) => che(segment, theme.warning), [theme.warning]),
    _unusedFlag2 = !1,
    [gitBranch, setGitBranch] = Cu.useState(null),
    [branchFilterEnabled, setBranchFilterEnabled] = Cu.useState(!0),
    [worktreeFilterDisabled, setWorktreeFilterDisabled] = Cu.useState(!1),
    [hasMultipleWorktrees, setHasMultipleWorktrees] = Cu.useState(!1),
    [firstWorktree, setFirstWorktree] = Cu.useState(null),
    [currentWorktree, setCurrentWorktree] = Cu.useState(null),
    [worktrees, setWorktrees] = Cu.useState([]),
    [worktreesDetected, setWorktreesDetected] = Cu.useState(!1),
    originalCwd = Cu.useMemo(() => gr(), []),
    [renameValue, setRenameValue] = Cu.useState(""),
    [renameCursorOffset, setRenameCursorOffset] = Cu.useState(0),
    [expandedGroups, setExpandedGroups] = Cu.useState(new Set()),
    [focusedItem, setFocusedItem] = Cu.useState(null),
    [selectedIndex, setSelectedIndex] = Cu.useState(1),
    [mode, setMode] = Cu.useState(initialSearchQuery ? "search" : "list"),
    [previewLog, setPreviewLog] = Cu.useState(null),
    lastFocusedIndexRef = Cu.useRef(null),
    [searchState, setSearchState] = Cu.useState({
      status: "idle"
    }),
    [agenticPromptVisible, setAgenticPromptVisible] = Cu.useState(!1),
    agenticAbortRef = Cu.useRef(null),
    {
      query: query,
      setQuery: setQuery,
      cursorOffset: cursorOffset,
      handleKeyDown: handleKeyDown,
      handlePaste: handlePaste
    } = RH({
      isActive: mode === "search" && searchState.status !== "searching",
      onExit: () => {
        setMode("list"), W("tengu_session_search_toggled", {
          enabled: !1
        });
      },
      onExitUp: () => {
        setMode("list"), W("tengu_session_search_toggled", {
          enabled: !1
        });
      },
      passthroughCtrlKeys: logs.length === 0 ? ["n", "a"] : ["n"],
      initialQuery: initialSearchQuery || ""
    }),
    expandedQuery = Epm(query),
    deferredQuery = Cu.useDeferredValue(expandedQuery),
    [debouncedQuery, setDebouncedQuery] = Cu.useState("");
  Cu.useEffect(() => {
    if (!deferredQuery) {
      setDebouncedQuery("");
      return;
    }
    return clock.setTimeout(() => setDebouncedQuery(deferredQuery), 300);
  }, [deferredQuery, clock]);
  let [agenticResult, setAgenticResult] = Cu.useState(null),
    [agenticSearchRan, setAgenticSearchRan] = Cu.useState(!1);
  Cu.useEffect(() => {
    Ry().then((branch: any) => setGitBranch(branch));
    let detectStart = Date.now();
    w5(originalCwd).then((detectedWorktrees: any) => {
      W("tengu_worktree_detection", {
        duration_ms: Date.now() - detectStart,
        worktree_count: detectedWorktrees.length,
        success: !0
      }), setHasMultipleWorktrees(detectedWorktrees.length > 1), setWorktrees(detectedWorktrees), setFirstWorktree(detectedWorktrees[0] ?? null);
      let matchingWorktrees = detectedWorktrees.filter((wt: any) => originalCwd === wt || originalCwd.startsWith(wt + lgt.sep));
      matchingWorktrees.sort((a: any, b: any) => b.length - a.length), setCurrentWorktree(matchingWorktrees[0] ?? null), setWorktreesDetected(!0);
    }).catch(() => {
      W("tengu_worktree_detection", {
        duration_ms: Date.now() - detectStart,
        worktree_count: 0,
        success: !1
      }), setWorktreesDetected(!0);
    });
  }, [originalCwd]);
  let searchableTextByLog = Cu.useMemo(() => new Map(logs.map((log: any) => [log, Rpm(log)])), [logs]),
    _unusedMemo = Cu.useMemo(() => null, [logs, searchableTextByLog, !1]),
    filteredByFilters = Cu.useMemo(() => {
      let result = logs;
      if (customTitleEnabled) result = logs.filter((log: any) => {
        let sessionId = It(),
          logSessionId = fh(log);
        if (sessionId && logSessionId === sessionId) return !0;
        if (log.customTitle ?? log.aiTitle) return !0;
        if (SGt(log.messages)) return !0;
        if (log.firstPrompt || log.customTitle || log.aiTitle) return !0;
        return !1;
      });
      if (!branchFilterEnabled && gitBranch) result = result.filter((log: any) => log.gitBranch === gitBranch);
      if (hasMultipleWorktrees && !worktreeFilterDisabled && !showAllProjects) {
        let activeWorktree = currentWorktree ?? originalCwd;
        result = result.filter((log: any) => {
          if (log.isAlias) return !0;
          let projectPath = log.projectPath;
          if (projectPath === void 0) return !1;
          let bestWorktree = null;
          for (let candidate of worktrees) if (projectPath === candidate || projectPath.startsWith(candidate + lgt.sep)) {
            if (bestWorktree === null || candidate.length > bestWorktree.length) bestWorktree = candidate;
          }
          if (bestWorktree === null) return projectPath === activeWorktree;
          return bestWorktree === activeWorktree;
        });
      }
      return result;
    }, [logs, customTitleEnabled, branchFilterEnabled, gitBranch, hasMultipleWorktrees, worktreeFilterDisabled, showAllProjects, originalCwd, currentWorktree, worktrees]),
    textFilteredLogs = Cu.useMemo(() => {
      if (!expandedQuery) return filteredByFilters;
      let needle = expandedQuery.toLowerCase();
      return filteredByFilters.filter((log: any) => {
        let title = I1e(log).toLowerCase(),
          branch = (log.gitBranch || "").toLowerCase(),
          tag = (log.tag || "").toLowerCase(),
          pr = log.prNumber ? `pr #${log.prNumber} ${log.prRepository || ""}`.toLowerCase() : "";
        return title.includes(needle) || branch.includes(needle) || tag.includes(needle) || pr.includes(needle);
      });
    }, [filteredByFilters, expandedQuery]);
  Cu.useEffect(() => {}, [deferredQuery, debouncedQuery, !1]), Cu.useEffect(() => {
    if (setAgenticResult(null), !deferredQuery) setAgenticSearchRan(!1);
    return;
  }, [debouncedQuery, deferredQuery, _unusedMemo, !1, clock]);
  let {
      filteredLogs: filteredLogs,
      snippets: snippets
    } = Cu.useMemo(() => {
      let snippetMap = new Map(),
        merged = textFilteredLogs;
      if (agenticResult && debouncedQuery && agenticResult.query === debouncedQuery) {
        for (let result of agenticResult.results) if (result.searchableText) {
          let snippet = Cpm(result.searchableText, debouncedQuery, bpm);
          if (snippet) snippetMap.set(result.log, snippet);
        }
        let mergedUuids = new Set(merged.map((log: any) => log.messages[0]?.uuid)),
          filterableSet = new Set(filteredByFilters),
          extraLogs = agenticResult.results.map((result: any) => result.log).filter((log: any) => !mergedUuids.has(log.messages[0]?.uuid) && filterableSet.has(log));
        merged = [...merged, ...extraLogs];
      }
      return {
        filteredLogs: merged,
        snippets: snippetMap
      };
    }, [textFilteredLogs, agenticResult, debouncedQuery, filteredByFilters]),
    visibleLogs = Cu.useMemo(() => {
      if (searchState.status === "results" && searchState.results.length > 0) {
        let filterableSet = new Set(filteredByFilters);
        return searchState.results.filter((log: any) => filterableSet.has(log));
      }
      return filteredLogs;
    }, [searchState, filteredLogs, filteredByFilters]),
    innerWidth = columns - 2 * Phe,
    labelWidth = Math.max(30, innerWidth - 4),
    treeNodes = Cu.useMemo(() => {
      if (!customTitleEnabled) return [];
      let grouped = vpm(visibleLogs);
      return Array.from(grouped.entries()).map(([sessionId, group]: any) => {
        let headLog = group[0],
          headIndex = visibleLogs.indexOf(headLog),
          headSnippet = snippets.get(headLog),
          headSnippetRendered = headSnippet ? GHo(headSnippet, highlightFn) : null;
        if (group.length === 1) {
          let headDescription = KHo(headLog, {
            showProjectPath: showAllProjects
          });
          return {
            id: `log:${sessionId}:0`,
            value: {
              log: headLog,
              indexInFiltered: headIndex
            },
            label: VHo(headLog, labelWidth),
            description: headSnippetRendered ? `${headDescription}
  ${headSnippetRendered}` : headDescription,
            dimDescription: !0
          };
        }
        let forkCount = group.length - 1,
          childNodes = group.slice(1).map((childLog: any, childIndex: any) => {
            let childFilteredIndex = visibleLogs.indexOf(childLog),
              childSnippet = snippets.get(childLog),
              childSnippetRendered = childSnippet ? GHo(childSnippet, highlightFn) : null,
              childDescription = KHo(childLog, {
                isChild: !0,
                showProjectPath: showAllProjects
              });
            return {
              id: `log:${sessionId}:${childIndex + 1}`,
              value: {
                log: childLog,
                indexInFiltered: childFilteredIndex
              },
              label: VHo(childLog, labelWidth, {
                isChild: !0
              }),
              description: childSnippetRendered ? `${childDescription}
      ${childSnippetRendered}` : childDescription,
              dimDescription: !0
            };
          }),
          groupDescription = KHo(headLog, {
            showProjectPath: showAllProjects
          });
        return {
          id: `group:${sessionId}`,
          value: {
            log: headLog,
            indexInFiltered: headIndex
          },
          label: VHo(headLog, labelWidth, {
            isGroupHeader: !0,
            forkCount: forkCount
          }),
          description: headSnippetRendered ? `${groupDescription}
  ${headSnippetRendered}` : groupDescription,
          dimDescription: !0,
          children: childNodes
        };
      });
    }, [customTitleEnabled, visibleLogs, labelWidth, showAllProjects, snippets, highlightFn]),
    listOptions = Cu.useMemo(() => {
      if (customTitleEnabled) return [];
      return visibleLogs.map((log: any, index: any) => {
        let titleText = I1e(log) + (log.isSidechain ? " (sidechain)" : ""),
          label = THl(titleText, labelWidth),
          metadata = b7e(log),
          projectSuffix = showAllProjects && log.projectPath ? ` \xB7 ${log.projectPath}` : "",
          snippet = snippets.get(log),
          snippetRendered = snippet ? GHo(snippet, highlightFn) : null;
        return {
          label: label,
          description: snippetRendered ? `${metadata}${projectSuffix}
  ${snippetRendered}` : metadata + projectSuffix,
          dimDescription: !0,
          value: index.toString()
        };
      });
    }, [customTitleEnabled, visibleLogs, highlightFn, labelWidth, showAllProjects, snippets]),
    focusedLog = focusedItem?.value.log ?? null,
    renderExpandHint = () => {
      if (!customTitleEnabled || !focusedLog) return "";
      let sessionId = fh(focusedLog);
      if (!sessionId) return "";
      let sameSessionLogs = visibleLogs.filter((log: any) => fh(log) === sessionId);
      if (!(sameSessionLogs.length > 1)) return "";
      let isExpanded = expandedGroups.has(sessionId);
      if (sameSessionLogs.indexOf(focusedLog) > 0 || isExpanded) return Dl.jsx(at, {
        chord: "left",
        action: "collapse"
      });
      return Dl.jsx(at, {
        chord: "right",
        action: "expand"
      });
    },
    submitRename = Cu.useCallback(async () => {
      let sessionId = focusedLog ? fh(focusedLog) : void 0;
      if (!focusedLog || !sessionId) {
        setMode("list"), setRenameValue("");
        return;
      }
      if (renameValue.trim()) {
        if (await i6(sessionId, renameValue.trim(), focusedLog.fullPath), customTitleEnabled && onLogsChanged) onLogsChanged();
      }
      setMode("list"), setRenameValue("");
    }, [focusedLog, renameValue, onLogsChanged, customTitleEnabled]),
    exitSearch = Cu.useCallback(() => {
      setMode("list"), setQuery(""), W("tengu_session_search_toggled", {
        enabled: !1
      });
    }, [setQuery]),
    enterSearch = Cu.useCallback(() => {
      setMode("search"), W("tengu_session_search_toggled", {
        enabled: !0
      });
    }, []),
    runAgenticSearch = Cu.useCallback(async () => {
      query.trim();
      return;
    }, [query, onAgenticSearch, !1, filteredByFilters]);
  Cu.useEffect(() => {
    if (reloadGeneration === 0) return;
    agenticAbortRef.current?.abort(), setSearchState((prev: any) => prev.status === "idle" ? prev : {
      status: "idle"
    }), setAgenticPromptVisible(!1), setAgenticResult(null);
  }, [reloadGeneration]), Cu.useEffect(() => {
    if (searchState.status !== "idle" && searchState.status !== "searching") {
      if (searchState.status === "results" && searchState.query !== query || searchState.status === "error") setSearchState({
        status: "idle"
      });
    }
  }, [query, searchState]), Cu.useEffect(() => () => {
    agenticAbortRef.current?.abort();
  }, []);
  let prevSearchStatusRef = Cu.useRef(searchState.status);
  Cu.useEffect(() => {
    let prevStatus = prevSearchStatusRef.current;
    if (prevSearchStatusRef.current = searchState.status, prevStatus === "searching" && searchState.status === "results") {
      if (customTitleEnabled && treeNodes.length > 0) setFocusedItem(treeNodes[0]);else if (!customTitleEnabled && visibleLogs.length > 0) {
        let firstLog = visibleLogs[0];
        setFocusedItem({
          id: "0",
          value: {
            log: firstLog,
            indexInFiltered: 0
          },
          label: ""
        });
      }
    }
  }, [searchState.status, customTitleEnabled, treeNodes, visibleLogs]);
  let handleListFocus = Cu.useCallback((idStr: any) => {
      let index = parseInt(idStr, 10),
        log = visibleLogs[index];
      if (!log || lastFocusedIndexRef.current === index.toString()) return;
      lastFocusedIndexRef.current = index.toString(), setFocusedItem({
        id: index.toString(),
        value: {
          log: log,
          indexInFiltered: index
        },
        label: ""
      }), setSelectedIndex(index + 1);
    }, [visibleLogs]),
    handleTreeFocus = Cu.useCallback((node: any) => {
      setFocusedItem(node);
      let index = visibleLogs.findIndex((log: any) => fh(log) === fh(node.value.log));
      if (index >= 0) setSelectedIndex(index + 1);
    }, [visibleLogs]);
  Or("confirm:no", () => {
    agenticAbortRef.current?.abort(), setSearchState({
      status: "idle"
    }), W("tengu_agentic_search_cancelled", {});
  }, {
    context: "Confirmation",
    isActive: mode !== "preview" && searchState.status === "searching"
  }), Or("confirm:no", () => {
    setMode("list"), setRenameValue("");
  }, {
    context: "Settings",
    isActive: mode === "rename" && searchState.status !== "searching"
  }), Or("confirm:no", () => {
    setQuery(""), setAgenticPromptVisible(!1), onCancel?.();
  }, {
    context: "Confirmation",
    isActive: mode !== "preview" && mode !== "rename" && mode !== "search" && agenticPromptVisible && searchState.status !== "searching"
  });
  function onKeyDown(key: any) {
    if (mode === "preview") return;
    if (searchState.status === "searching") return;
    if (mode === "rename") ;else if (mode === "search") {
      if (handleKeyDown(key), key.ctrl && key.key === "n") key.preventDefault(), exitSearch();else if (key.ctrl && key.key === "a" && onToggleAllProjects && logs.length === 0) key.preventDefault(), onToggleAllProjects(), W("tengu_session_all_projects_toggled", {
        enabled: showAllProjects
      });else if (key.key === "return" || key.key === "down") query.trim();
    } else {
      if (agenticPromptVisible) {
        if (key.key === "return") {
          key.preventDefault(), runAgenticSearch(), setAgenticPromptVisible(!1);
          return;
        } else if (key.key === "down") {
          if (key.preventDefault(), setAgenticPromptVisible(!1), visibleLogs.length === 0) setMode("search");
          return;
        } else if (key.key === "up") {
          key.preventDefault(), setMode("search"), setAgenticPromptVisible(!1);
          return;
        }
      }
      if (visibleLogs.length === 0 && !agenticPromptVisible && (key.key === "up" || key.key === "down" || key.key === "return")) {
        key.preventDefault(), setMode("search");
        return;
      }
      let isPlainKey = !key.ctrl && !key.meta,
        lowerKey = key.key.toLowerCase();
      if (key.ctrl && key.key === "a" && onToggleAllProjects) key.preventDefault(), onToggleAllProjects(), W("tengu_session_all_projects_toggled", {
        enabled: showAllProjects
      });else if (key.ctrl && key.key === "b") {
        key.preventDefault();
        let nextBranchFilter = !branchFilterEnabled;
        setBranchFilterEnabled(nextBranchFilter), W("tengu_session_branch_filter_toggled", {
          enabled: !nextBranchFilter
        });
      } else if (key.ctrl && key.key === "w" && hasMultipleWorktrees) {
        key.preventDefault();
        let nextWorktreeDisabled = !worktreeFilterDisabled;
        setWorktreeFilterDisabled(nextWorktreeDisabled), W("tengu_session_worktree_filter_toggled", {
          enabled: !nextWorktreeDisabled
        });
      } else if (lowerKey === "/" && isPlainKey) key.preventDefault(), setMode("search"), setAgenticPromptVisible(!1), W("tengu_session_search_toggled", {
        enabled: !0
      });else if (key.ctrl && key.key === "r" && focusedLog) key.preventDefault(), setMode("rename"), setRenameValue(""), W("tengu_session_rename_started", {});else if ((key.key === " " && isPlainKey || key.ctrl && key.key === "v") && focusedLog && !agenticPromptVisible) key.preventDefault(), setPreviewLog(focusedLog), setMode("preview"), W("tengu_session_preview_opened", {
        messageCount: focusedLog.messageCount
      });else if (isPlainKey && key.key.length === 1 && key.key !== " ") key.preventDefault(), setMode("search"), setAgenticPromptVisible(!1), setQuery(key.key), W("tengu_session_search_toggled", {
        enabled: !0
      });
    }
  }
  function onPaste(event: any) {
    if (mode === "search") {
      handlePaste(event);
      return;
    }
    let firstLine = (event.text.split(/\r\n|\r|\n/, 2)[0] ?? "").trim();
    if (mode === "preview" || mode === "rename" || searchState.status === "searching" || agenticPromptVisible || !focusedLog || !firstLine) return;
    event.preventDefault(), setMode("search"), setQuery(firstLine), W("tengu_session_search_toggled", {
      enabled: !0
    });
  }
  let filterChips = [],
    showWorktreeChip = !!onToggleAllProjects && !showAllProjects && worktreesDetected,
    primaryWorktree = firstWorktree ?? originalCwd;
  if (showWorktreeChip) filterChips.push(lgt.basename(primaryWorktree));
  if (!branchFilterEnabled && gitBranch) filterChips.push(gitBranch);
  if (hasMultipleWorktrees && !worktreeFilterDisabled && !showAllProjects) {
    let activeWorktree = currentWorktree ?? originalCwd;
    if (!(showWorktreeChip && primaryWorktree === activeWorktree)) filterChips.push(lgt.basename(activeWorktree));
  }
  let showChipsPlaceholder = !!onToggleAllProjects && !showAllProjects && !worktreesDetected,
    showChipsRow = (filterChips.length > 0 || showChipsPlaceholder) && mode !== "search",
    chromeHeight = 8 + (showChipsRow ? 1 : 0),
    footerHeight = 2,
    visibleOptionCount = Math.max(1, Math.floor((maxHeight - chromeHeight - footerHeight) / 3));
  if (Cu.useEffect(() => {
    if (!onLoadMore) return;
    let threshold = visibleOptionCount * 2;
    if (selectedIndex + threshold >= visibleLogs.length) onLoadMore(visibleOptionCount * 3);
  }, [selectedIndex, visibleOptionCount, visibleLogs.length, onLoadMore]), logs.length === 0 && !onToggleAllProjects) return null;
  if (mode === "preview" && previewLog && customTitleEnabled) return Dl.jsx(pHl, {
    log: previewLog,
    onExit: () => {
      setMode("list"), setPreviewLog(null);
    },
    onSelect: onSelect
  });
  return Dl.jsx($, {
    flexDirection: "column",
    height: maxHeight - 1,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    children: Dl.jsxs(ku, {
      color: "suggestion",
      children: [Dl.jsx($, {
        flexShrink: 0,
        children: Dl.jsxs(v, {
          bold: !0,
          color: "suggestion",
          children: ["Resume session", mode === "list" && visibleLogs.length > visibleOptionCount && Dl.jsxs(v, {
            dimColor: !0,
            children: [" ", "(", selectedIndex, " of ", visibleLogs.length, ")"]
          }), isLoading && Dl.jsx(v, {
            dimColor: !0,
            children: " \xB7 Refreshing\u2026"
          })]
        })
      }), Dl.jsx(aP, {
        query: query,
        isFocused: mode === "search",
        isTerminalFocused: isTerminalFocused,
        cursorOffset: cursorOffset
      }), showChipsRow && (filterChips.length > 0 ? Dl.jsx($, {
        flexShrink: 0,
        paddingLeft: 2,
        children: Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsx(bn, {
            children: filterChips
          })
        })
      }) : Dl.jsx($, {
        flexShrink: 0,
        height: 1
      })), Dl.jsx($, {
        flexShrink: 0,
        children: Dl.jsx(v, {
          children: " "
        })
      }), searchState.status === "searching" && Dl.jsxs($, {
        paddingLeft: 1,
        flexShrink: 0,
        children: [Dl.jsx(gd, {}), Dl.jsx(v, {
          children: " Searching\u2026"
        })]
      }), searchState.status === "results" && searchState.results.length > 0 && Dl.jsx($, {
        paddingLeft: 1,
        marginBottom: 1,
        flexShrink: 0,
        children: Dl.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: "Claude found these results:"
        })
      }), searchState.status === "results" && searchState.results.length === 0 && filteredLogs.length === 0 && Dl.jsx($, {
        paddingLeft: 1,
        marginBottom: 1,
        flexShrink: 0,
        children: Dl.jsx(wl, {
          children: "No matching sessions found."
        })
      }), searchState.status === "error" && filteredLogs.length === 0 && Dl.jsx($, {
        paddingLeft: 1,
        marginBottom: 1,
        flexShrink: 0,
        children: Dl.jsx(wl, {
          children: "No matching sessions found."
        })
      }), mode === "search" && Boolean(query.trim()) && filteredLogs.length === 0 && !agenticSearchRan && !isLoading && searchState.status === "idle" && Dl.jsx($, {
        paddingLeft: 1,
        marginBottom: 1,
        flexShrink: 0,
        children: Dl.jsxs(wl, {
          children: ['No sessions match "', query, '".']
        })
      }), Boolean(query.trim()) && onAgenticSearch && !1, logs.length === 0 && mode === "list" && searchState.status === "idle" && !isLoading && !query.trim() && Dl.jsx($, {
        paddingLeft: 1,
        marginBottom: 1,
        flexShrink: 0,
        children: Dl.jsx(wl, {
          hint: showAllProjects ? void 0 : Dl.jsx(at, {
            chord: "ctrl+a",
            action: "show all projects",
            format: {
              modCase: "title",
              charCase: "upper"
            }
          }),
          children: showAllProjects ? "No conversations found." : "No conversations found in this project."
        })
      }), searchState.status === "searching" ? null : mode === "rename" && focusedLog ? Dl.jsxs($, {
        paddingLeft: 2,
        flexDirection: "column",
        children: [Dl.jsx(v, {
          bold: !0,
          children: "Rename session:"
        }), Dl.jsx($, {
          paddingTop: 1,
          children: Dl.jsx(ga, {
            value: renameValue,
            onChange: setRenameValue,
            onSubmit: submitRename,
            placeholder: I1e(focusedLog, "Enter new session name"),
            columns: innerWidth - 2,
            cursorOffset: renameCursorOffset,
            onChangeCursorOffset: setRenameCursorOffset,
            showCursor: !0
          })
        })]
      }) : customTitleEnabled ? Dl.jsx(hHl, {
        nodes: treeNodes,
        onSelect: (node: any) => {
          onSelect(node.value.log);
        },
        onFocus: handleTreeFocus,
        onCancel: onCancel,
        focusNodeId: focusedItem?.id,
        visibleOptionCount: visibleOptionCount,
        layout: "expanded",
        isDisabled: mode === "search" || agenticPromptVisible,
        hideIndexes: !1,
        isNodeExpanded: (nodeId: any) => {
          if (mode === "search" || !branchFilterEnabled) return !0;
          let sessionId = typeof nodeId === "string" && nodeId.startsWith("group:") ? nodeId.substring(6) : null;
          return sessionId ? expandedGroups.has(sessionId) : !1;
        },
        onExpand: (nodeId: any) => {
          let sessionId = typeof nodeId === "string" && nodeId.startsWith("group:") ? nodeId.substring(6) : null;
          if (sessionId) setExpandedGroups((prev: any) => new Set(prev).add(sessionId)), W("tengu_session_group_expanded", {});
        },
        onCollapse: (nodeId: any) => {
          let sessionId = typeof nodeId === "string" && nodeId.startsWith("group:") ? nodeId.substring(6) : null;
          if (sessionId) setExpandedGroups((prev: any) => {
            let next = new Set(prev);
            return next.delete(sessionId), next;
          });
        },
        onUpFromFirstItem: enterSearch
      }) : Dl.jsx(hr, {
        options: listOptions,
        onChange: (idStr: any) => {
          let index = parseInt(idStr, 10),
            log = visibleLogs[index];
          if (log) onSelect(log);
        },
        visibleOptionCount: visibleOptionCount,
        onCancel: onCancel,
        onFocus: handleListFocus,
        defaultFocusValue: focusedItem?.id.toString(),
        layout: "expanded",
        isDisabled: mode === "search" || agenticPromptVisible,
        onUpFromFirstItem: enterSearch
      }), Dl.jsx($, {
        paddingLeft: 2,
        children: exitState.pending ? Dl.jsxs(v, {
          dimColor: !0,
          children: ["Press ", exitState.keyName, " again to exit"]
        }) : mode === "rename" ? Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsxs(bn, {
            children: [Dl.jsx(at, {
              chord: "enter",
              action: "save"
            }), Dl.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "cancel"
            })]
          })
        }) : searchState.status === "searching" ? Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsxs(bn, {
            children: [Dl.jsx(v, {
              children: "Searching with Claude\u2026"
            }), Dl.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "cancel"
            })]
          })
        }) : agenticPromptVisible ? Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsxs(bn, {
            children: [Dl.jsx(at, {
              chord: "enter",
              action: "search"
            }), Dl.jsx(at, {
              chord: "down",
              action: "skip"
            }), Dl.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "cancel"
            })]
          })
        }) : mode === "search" ? Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsxs(bn, {
            children: [Dl.jsx(v, {
              children: "Type to Search"
            }), logs.length === 0 && onToggleAllProjects && Dl.jsx(at, {
              chord: "ctrl+a",
              action: showAllProjects ? "only show current repo" : "show all projects",
              format: {
                modCase: "title",
                charCase: "upper"
              }
            }), Dl.jsx(at, {
              chord: "enter",
              action: "select"
            }), Dl.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "clear"
            })]
          })
        }) : Dl.jsx(v, {
          dimColor: !0,
          children: Dl.jsxs(bn, {
            children: [onToggleAllProjects && Dl.jsx(at, {
              chord: "ctrl+a",
              action: showAllProjects ? "only show current repo" : "show all projects",
              format: {
                modCase: "title",
                charCase: "upper"
              }
            }), gitBranch && Dl.jsx(at, {
              chord: "ctrl+b",
              action: branchFilterEnabled ? "only show current branch" : "show all branches",
              format: {
                modCase: "title",
                charCase: "upper"
              }
            }), hasMultipleWorktrees && Dl.jsx(at, {
              chord: "ctrl+w",
              action: worktreeFilterDisabled ? "only show current worktree" : "show all worktrees",
              format: {
                modCase: "title",
                charCase: "upper"
              }
            }), focusedLog && Dl.jsx(at, {
              chord: "space",
              action: "preview"
            }), focusedLog && Dl.jsx(at, {
              chord: "ctrl+r",
              action: "rename",
              format: {
                modCase: "title",
                charCase: "upper"
              }
            }), Dl.jsx(v, {
              children: "Type to search"
            }), Dl.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "cancel"
            }), renderExpandHint()]
          })
        })
      })]
    })
  });
}

/** Extract plain text content from a user/assistant message. */
function Apm(message: any) {
  if (message.type !== "user" && message.type !== "assistant") return "";
  let content = "message" in message ? message.message?.content : void 0;
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((block: any) => {
    if (typeof block === "string") return block;
    if ("text" in block && typeof block.text === "string") return block.text;
    return "";
  }).filter(Boolean).join(" ");
  return "";
}

/** Build the searchable text blob for a log (metadata + sampled message text). */
function Rpm(log: any) {
  let messageText = (log.messages.length <= ypm ? log.messages : [...log.messages.slice(0, _Hl), ...log.messages.slice(-_Hl)]).map(Apm).filter(Boolean).join(" "),
    combined = `${[log.customTitle, log.aiTitle, log.summary, log.firstPrompt, log.gitBranch, log.tag, log.prNumber ? `PR #${log.prNumber}` : void 0, log.prRepository].filter(Boolean).join(" ")} ${messageText}`.trim();
  return combined.length > yHl ? combined.slice(0, yHl) : combined;
}

/** Group logs by session id, sorting each group newest-first by modified time. */
function vpm(logs: any) {
  let groups = new Map();
  for (let log of logs) {
    let sessionId = fh(log);
    if (sessionId) {
      let existing = groups.get(sessionId);
      if (existing) existing.push(log);else groups.set(sessionId, [log]);
    }
  }
  return groups.forEach((group: any) => group.sort((a: any, b: any) => new Date(b.modified).getTime() - new Date(a.modified).getTime())), groups;
}
var lgt: any,
  Cu: any,
  Dl: any,
  gpm = 2,
  _pm = 4,
  ypm = 2000,
  _Hl = 1000,
  yHl = 50000,
  Tpm = 0.3,
  Spm = 60000,
  bpm = 50;
var zHo = b(() => {
  Gc();
  Mzn();
  lt();
  SE();
  TI();
  lne();
  ui();
  N8();
  je();
  ss();
  kt();
  iat();
  Xo();
  N1e();
  ia();
  vn();
  _a();
  uc();
  Ol();
  Is();
  sy();
  Wo();
  rS();
  aue();
  mHl();
  xw();
  rh();
  gHl();
  lgt = require("path"), Cu = x(et(), 1), Dl = x(oe(), 1);
});

export {THl,GHo,Epm,Cpm,VHo,KHo,fjn,Apm,Rpm,vpm,lgt,Cu,Dl,gpm,_pm,ypm,_Hl,yHl,Tpm,Spm,bpm,zHo};
