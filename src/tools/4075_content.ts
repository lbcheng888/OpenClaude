// @ts-nocheck
import {rl,ri} from "./2235_userFacingName.ts";
import {Rye,Z3t} from "../../vendor/m4356.ts";
import {goe,pd} from "../../vendor/m706.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Hte,_dt} from "../../vendor/m3999.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Vdt,wmo,C0e} from "../hooks/4360_isCollapsible.ts";
import {Pqa,Oqa,Lqa} from "../../vendor/m4071.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {Rqa,vqa} from "../../vendor/m4068.ts";
import {Cqa,Aqa} from "../../vendor/m4067.ts";
import {f3n,Bpo} from "../../vendor/m4027.ts";
import {formatSecondsShort as EMe,formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {Ansi as nd} from "../../vendor/m2441.ts";
import {J4,$He} from "../../vendor/m3189.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {G6e,U3n} from "../../vendor/m4070.ts";
import {bw,EW} from "../../vendor/m2811.ts";
import {gh,G1} from "../../vendor/m3957.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {dfa,Zae} from "../../vendor/m3309.ts";
import {useAnimationFrame as Dm} from "../config/2452_isVisible.ts";
import {e1,hPt} from "../../vendor/m2376.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {po} from "./5224_userPromptCount.ts";
import {Amo} from "../../vendor/m4073.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Tool-use rendering components for the Claude Code TUI.
 *
 * - `fPp` (ToolUseRow): renders a single `tool_use` content block — its header
 *   (status dot + tool name + rendered use message) and, when resolved, its
 *   result. Uses the React Compiler memo cache (`vmo.c`) for incremental
 *   re-render.
 * - `qqa` (GroupedToolUseSummary): renders the compact, animated one-line
 *   summary of a *group* of tool uses (reads/searches/edits/commits/etc.), or,
 *   in verbose mode, the full per-tool transcript.
 * - `hPp` (ThinkingTimer): live-updating "Thinking for …" duration timer.
 * - `_Pp` (truncateToLineCount): wraps text and clamps it to N display lines
 *   with an ellipsis.
 *
 * NOTE: the previous readable version (v185 module 4336) was an unrelated
 * FileEditTool definition, so no local names could be ported; names/types below
 * are derived directly from this module's structure.
 */

/** Renders one `tool_use` content block (header + optional result). */
function fPp(props: any): any {
  let $cache: any = vmo.c(49),
    {
      content: toolUse,
      tools,
      lookups,
      inProgressToolUseIDs,
      shouldAnimate,
      theme
    } = props,
    Container: any,
    isError: any,
    isResolved: any,
    toolResultMessage: any,
    keyId: any,
    flexDirection: any,
    flexGrow: any,
    headerNode: any,
    resultNode: any,
    earlyReturn: any,
    tool: any;
  if ($cache[0] !== toolUse.id || $cache[1] !== toolUse.input || $cache[2] !== toolUse.name || $cache[3] !== inProgressToolUseIDs || $cache[4] !== lookups || $cache[5] !== shouldAnimate || $cache[6] !== theme || $cache[7] !== tools) {
    earlyReturn = Symbol.for("react.early_return_sentinel");
    e: {
      if (tool = rl(tools, toolUse.name) ?? rl(Rye(), toolUse.name), !tool || tool.isTransparentWrapper?.()) {
        earlyReturn = null;
        break e;
      }
      let isResolvedCached: any;
      if ($cache[19] !== toolUse.id || $cache[20] !== lookups.resolvedToolUseIDs) isResolvedCached = lookups.resolvedToolUseIDs.has(toolUse.id), $cache[19] = toolUse.id, $cache[20] = lookups.resolvedToolUseIDs, $cache[21] = isResolvedCached;else isResolvedCached = $cache[21];
      isResolved = isResolvedCached;
      let isErrorCached: any;
      if ($cache[22] !== toolUse.id || $cache[23] !== lookups.erroredToolUseIDs) isErrorCached = lookups.erroredToolUseIDs.has(toolUse.id), $cache[22] = toolUse.id, $cache[23] = lookups.erroredToolUseIDs, $cache[24] = isErrorCached;else isErrorCached = $cache[24];
      isError = isErrorCached;
      let isInProgressCached: any;
      if ($cache[25] !== toolUse.id || $cache[26] !== inProgressToolUseIDs) isInProgressCached = inProgressToolUseIDs.has(toolUse.id), $cache[25] = toolUse.id, $cache[26] = inProgressToolUseIDs, $cache[27] = isInProgressCached;else isInProgressCached = $cache[27];
      let isInProgress: any = isInProgressCached;
      toolResultMessage = lookups.toolResultByToolUseID.get(toolUse.id);
      let rawToolUseResult: any = toolResultMessage?.type === "user" ? toolResultMessage.toolUseResult : void 0,
        parsedOutput: any = tool.outputSchema?.safeParse(rawToolUseResult),
        outputData: any = parsedOutput?.success ? parsedOutput.data : void 0,
        parsedInput: any = tool.inputSchema.safeParse(toolUse.input),
        inputData: any = parsedInput.success ? parsedInput.data : void 0,
        userFacingName: any = tool.userFacingName(inputData),
        diffSummaryCached: any;
      if ($cache[28] !== toolUse.input) diffSummaryCached = goe(toolUse.input), $cache[28] = toolUse.input, $cache[29] = diffSummaryCached;else diffSummaryCached = $cache[29];
      let diffSummary: any = diffSummaryCached,
        useMessage: any = diffSummary !== null ? diffSummary : inputData ? tool.renderToolUseMessage(inputData, {
          theme,
          verbose: !0
        }) : null;
      Container = $, keyId = toolUse.id, flexDirection = "column", flexGrow = 1;
      let dotAnimating: any = shouldAnimate && isInProgress,
        dotUnresolved: any = !isResolved,
        statusDotCached: any;
      if ($cache[30] !== isError || $cache[31] !== dotAnimating || $cache[32] !== dotUnresolved) statusDotCached = hi.jsx(Hte, {
        shouldAnimate: dotAnimating,
        isUnresolved: dotUnresolved,
        isError
      }), $cache[30] = isError, $cache[31] = dotAnimating, $cache[32] = dotUnresolved, $cache[33] = statusDotCached;else statusDotCached = $cache[33];
      headerNode = hi.jsxs($, {
        flexDirection: "row",
        children: [statusDotCached, hi.jsxs(v, {
          children: [hi.jsx(v, {
            bold: !0,
            children: userFacingName
          }), useMessage && hi.jsxs(v, {
            children: ["(", useMessage, ")"]
          })]
        }), inputData && tool.renderToolUseTag?.(inputData, {
          toolUseId: toolUse.id,
          toolUseResult: rawToolUseResult,
          progressMessages: lookups.progressMessagesByToolUseID.get(toolUse.id)
        })]
      }), resultNode = isResolved && !isError && outputData !== void 0 && hi.jsx($, {
        children: tool.renderToolResultMessage?.(outputData, [], {
          verbose: !0,
          tools,
          theme
        })
      });
    }
    $cache[0] = toolUse.id, $cache[1] = toolUse.input, $cache[2] = toolUse.name, $cache[3] = inProgressToolUseIDs, $cache[4] = lookups, $cache[5] = shouldAnimate, $cache[6] = theme, $cache[7] = tools, $cache[8] = Container, $cache[9] = isError, $cache[10] = isResolved, $cache[11] = toolResultMessage, $cache[12] = keyId, $cache[13] = flexDirection, $cache[14] = flexGrow, $cache[15] = headerNode, $cache[16] = resultNode, $cache[17] = earlyReturn, $cache[18] = tool;
  } else Container = $cache[8], isError = $cache[9], isResolved = $cache[10], toolResultMessage = $cache[11], keyId = $cache[12], flexDirection = $cache[13], flexGrow = $cache[14], headerNode = $cache[15], resultNode = $cache[16], earlyReturn = $cache[17], tool = $cache[18];
  if (earlyReturn !== Symbol.for("react.early_return_sentinel")) return earlyReturn;
  let extraNode: any;
  if ($cache[34] !== toolUse.id || $cache[35] !== isError || $cache[36] !== isResolved || $cache[37] !== toolResultMessage || $cache[38] !== tool || $cache[39] !== tools) extraNode = null, $cache[34] = toolUse.id, $cache[35] = isError, $cache[36] = isResolved, $cache[37] = toolResultMessage, $cache[38] = tool, $cache[39] = tools, $cache[40] = extraNode;else extraNode = $cache[40];
  let rowNode: any;
  if ($cache[41] !== Container || $cache[42] !== keyId || $cache[43] !== flexDirection || $cache[44] !== flexGrow || $cache[45] !== headerNode || $cache[46] !== resultNode || $cache[47] !== extraNode) rowNode = hi.jsxs(Container, {
    flexDirection,
    marginTop: flexGrow,
    children: [headerNode, resultNode, extraNode]
  }, keyId), $cache[41] = Container, $cache[42] = keyId, $cache[43] = flexDirection, $cache[44] = flexGrow, $cache[45] = headerNode, $cache[46] = resultNode, $cache[47] = extraNode, $cache[48] = rowNode;else rowNode = $cache[48];
  return rowNode;
}

/** Renders the compact (or verbose) summary of a group of tool uses. */
function qqa({
  message,
  inProgressToolUseIDs,
  shouldAnimate,
  verbose,
  tools,
  lookups,
  isActiveGroup,
  addMargin = !0
}: any): any {
  let {
      searchCount,
      readCount,
      listCount,
      replCount,
      memorySearchCount,
      memoryReadCount,
      memoryWriteCount,
      messages
    } = message,
    [theme] = ji(),
    {
      columns
    } = _r(),
    groupToolUseIDs: any = Vdt(message),
    hasErroredToolUse: any = groupToolUseIDs.some((toolUseId: any) => lookups.erroredToolUseIDs.has(toolUseId)),
    hasMemoryActivity: any = memorySearchCount > 0 || memoryReadCount > 0 || memoryWriteCount > 0,
    hasHookActivity: any = Pqa(message),
    readCountRef: any = Gdt.useRef(0),
    searchCountRef: any = Gdt.useRef(0),
    listCountRef: any = Gdt.useRef(0),
    mcpCountRef: any = Gdt.useRef(0),
    bashCountRef: any = Gdt.useRef(0);
  readCountRef.current = Math.max(readCountRef.current, readCount), searchCountRef.current = Math.max(searchCountRef.current, searchCount), listCountRef.current = Math.max(listCountRef.current, listCount), mcpCountRef.current = Math.max(mcpCountRef.current, message.mcpCallCount ?? 0), bashCountRef.current = Math.max(bashCountRef.current, message.bashCount ?? 0);
  let otherToolCount: any = message.otherToolCount ?? 0,
    editFileCount: any = message.editFileCount ?? 0,
    frameCount: any = message.frameCount ?? 0,
    linesAdded: any = message.linesAdded ?? 0,
    linesRemoved: any = message.linesRemoved ?? 0,
    stableReadCount: any = readCountRef.current,
    stableSearchCount: any = searchCountRef.current,
    stableListCount: any = listCountRef.current,
    stableMcpCount: any = mcpCountRef.current,
    gitOpBashCount: any = message.gitOpBashCount ?? 0,
    nonGitBashCount: any = Cs() ? Math.max(0, bashCountRef.current - gitOpBashCount) : 0,
    thoughtForMs: any = message.thoughtForMs ?? 0,
    hasThinking: any = thoughtForMs > 0 || message.latestThinkingSummary !== void 0,
    hasAnyActivity: any = stableSearchCount > 0 || stableReadCount > 0 || stableListCount > 0 || replCount > 0 || stableMcpCount > 0 || nonGitBashCount > 0 || gitOpBashCount > 0 || otherToolCount > 0 || editFileCount > 0 || frameCount > 0 || hasThinking,
    readFilePaths: any = message.readFilePaths,
    searchArgs: any = message.searchArgs,
    displayHint: any = message.latestDisplayHint;
  if (displayHint === void 0) {
    let lastSearchArg: any = searchArgs?.at(-1),
      searchHint: any = lastSearchArg !== void 0 ? `"${lastSearchArg}"` : void 0,
      lastReadPath: any = readFilePaths?.at(-1);
    displayHint = lastReadPath !== void 0 ? dd(lastReadPath) : searchHint;
  }
  if (isActiveGroup) for (let toolUseId: any of groupToolUseIDs) {
    if (!inProgressToolUseIDs.has(toolUseId)) continue;
    let progressData: any = lookups.progressMessagesByToolUseID.get(toolUseId)?.at(-1)?.data;
    if (progressData?.type === "repl_tool_call" && (progressData.phase === "start" || progressData.phase === "executing")) {
      let toolInput: any = progressData.toolInput;
      displayHint = toolInput.file_path ?? (toolInput.pattern ? `"${toolInput.pattern}"` : void 0) ?? toolInput.command ?? progressData.toolName;
    } else if (progressData?.type === "mcp_progress") {
      let {
          progress,
          total,
          progressMessage
        } = progressData,
        normalizedMessage: any = progressMessage?.replace(/\s+/g, " ").trim() || void 0,
        truncatedMessage: any = normalizedMessage && normalizedMessage.length > 200 ? normalizedMessage.slice(0, 199) + "…" : normalizedMessage;
      if (progress !== void 0 && total !== void 0 && total > 0) {
        let percent: any = Math.round(Math.min(1, Math.max(0, progress / total)) * 100);
        displayHint = truncatedMessage ? `${truncatedMessage} (${percent}%)` : `${percent}%`;
      } else if (truncatedMessage) displayHint = truncatedMessage;else if (progress !== void 0) displayHint = `Processing… ${progress}`;
    }
  }
  let truncatedHint: any = Rqa(displayHint, uPp),
    thinkingSummary: any = Cqa(isActiveGroup ? message.latestThinkingSummary : void 0, dPp),
    showThinkingSummary: any = isActiveGroup && thinkingSummary !== void 0,
    hintToRender: any = showThinkingSummary ? thinkingSummary : truncatedHint;
  if (verbose) {
    let assistantMessages: any = [];
    for (let msg: any of messages) if (msg.type === "assistant") assistantMessages.push(msg);else if (msg.type === "grouped_tool_use") assistantMessages.push(...msg.messages);
    return hi.jsxs($, {
      flexDirection: "column",
      children: [assistantMessages.map((msg: any) => {
        let firstBlock: any = msg.message.content[0];
        if (firstBlock?.type === "thinking" && firstBlock.thinking) return hi.jsx($, {
          marginTop: 1,
          children: hi.jsx(f3n, {
            param: firstBlock,
            addMargin: !1,
            isTranscriptMode: !0,
            verbose: !0
          })
        }, msg.uuid);
        if (firstBlock?.type !== "tool_use") return null;
        return hi.jsx(fPp, {
          content: firstBlock,
          tools,
          lookups,
          inProgressToolUseIDs,
          shouldAnimate,
          theme
        }, firstBlock.id);
      }), message.hookInfos && message.hookInfos.length > 0 && hi.jsxs(hi.Fragment, {
        children: [hi.jsxs(v, {
          dimColor: !0,
          children: [hi.jsx(v, {
            "aria-hidden": !0,
            children: "  ⎿  "
          }), "Ran ", message.hookCount, " ", "PreToolUse ", message.hookCount === 1 ? "hook" : "hooks", " (", EMe(message.hookTotalMs ?? 0), ")"]
        }), message.hookInfos.map((hookInfo: any, hookIdx: any) => hi.jsxs(v, {
          dimColor: !0,
          children: [hi.jsx(v, {
            "aria-hidden": !0,
            children: "     ⎿ "
          }), hookInfo.command, " (", EMe(hookInfo.durationMs ?? 0), ")"]
        }, `hook-${hookIdx}`))]
      }), message.relevantMemories?.map((memory: any) => hi.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [hi.jsxs(v, {
          dimColor: !0,
          children: [hi.jsx(v, {
            "aria-hidden": !0,
            children: "  ⎿  "
          }), "Recalled", " ", $qa.basename(memory.path)]
        }), hi.jsx($, {
          paddingLeft: 5,
          children: hi.jsx(v, {
            children: hi.jsx(nd, {
              children: memory.content
            })
          })
        })]
      }, memory.path))]
    });
  }
  if (!hasMemoryActivity && !hasHookActivity && !hasAnyActivity) return null;
  let durationSuffix: any = "";
  if (Cs() && isActiveGroup) {
    let maxElapsedSeconds: any,
      maxTotalLines: any = 0;
    for (let toolUseId: any of groupToolUseIDs) {
      if (!inProgressToolUseIDs.has(toolUseId)) continue;
      let progressData: any = lookups.progressMessagesByToolUseID.get(toolUseId)?.at(-1)?.data;
      if (progressData?.type !== "bash_progress" && progressData?.type !== "powershell_progress") continue;
      if (maxElapsedSeconds === void 0 || progressData.elapsedTimeSeconds > maxElapsedSeconds) maxElapsedSeconds = progressData.elapsedTimeSeconds, maxTotalLines = progressData.totalLines;
    }
    if (maxElapsedSeconds !== void 0 && maxElapsedSeconds >= 2) {
      let elapsedLabel: any = Fi(maxElapsedSeconds * 1000);
      durationSuffix = maxTotalLines > 0 ? ` (${elapsedLabel} \xB7 ${maxTotalLines} ${maxTotalLines === 1 ? "line" : "lines"})` : ` (${elapsedLabel})`;
    }
  }
  let primaryParts: any = [];
  if (hasThinking) {
    let thinkingVerb: any = isActiveGroup ? "Thinking" : "Thought",
      thinkingDurationNode: any;
    if (isActiveGroup && Cs()) {
      let lastThinkingAtMs: any = 0;
      for (let i: any = messages.length - 1; i >= 0; i--) {
        let candidate: any = messages[i];
        if (candidate?.type === "assistant" && candidate.message.content[0]?.type === "thinking") {
          let parsedTimestamp: any = Date.parse(candidate.timestamp);
          if (Number.isFinite(parsedTimestamp)) lastThinkingAtMs = parsedTimestamp;
          break;
        }
      }
      thinkingDurationNode = hi.jsx(hPp, {
        baseMs: thoughtForMs,
        lastThinkingAtMs
      });
    } else thinkingDurationNode = hi.jsx(v, {
      bold: !0,
      children: Fi(Math.max(1000, thoughtForMs))
    });
    primaryParts.push(hi.jsxs(v, {
      children: [thinkingVerb, " for ", thinkingDurationNode]
    }, "thought"));
  }
  if (editFileCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      editVerb: any = isActiveGroup ? isFirstPart ? "Editing" : "editing" : isFirstPart ? "Edited" : "edited";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-edit"));
    primaryParts.push(hi.jsxs(v, {
      children: [editVerb, " ", hi.jsx(v, {
        bold: !0,
        children: editFileCount
      }), " ", editFileCount === 1 ? "file" : "files", " ", hi.jsx(J4, {
        added: linesAdded,
        removed: linesRemoved
      })]
    }, "edit"));
  }
  /** Appends a "<verb> <detail>" clause to `primaryParts`, with leading comma if needed. */
  function Se(key: any, verb: any, detail: any): any {
    let isFirstPart: any = primaryParts.length === 0;
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, `comma-${key}`));
    primaryParts.push(hi.jsxs(v, {
      children: [isFirstPart ? verb[0].toUpperCase() + verb.slice(1) : verb, detail != null && hi.jsxs(hi.Fragment, {
        children: [" ", detail]
      })]
    }, key));
  }
  if (Cs() && message.commits?.length) {
    let commitVerbs: any = {
      committed: "committed",
      amended: "amended commit",
      "cherry-picked": "cherry-picked"
    };
    for (let commitKind: any of ["committed", "amended", "cherry-picked"]) {
      let shas: any = message.commits.filter((commit: any) => commit.kind === commitKind).map((commit: any) => commit.sha);
      if (shas.length) Se(commitKind, commitVerbs[commitKind], hi.jsx(v, {
        bold: !0,
        children: shas.join(", ")
      }));
    }
  }
  if (Cs() && message.pushes?.length) {
    let branches: any = os(message.pushes.map((push: any) => push.branch));
    Se("push", "pushed to", hi.jsx(v, {
      bold: !0,
      children: branches.join(", ")
    }));
  }
  if (Cs() && message.branches?.length) {
    let branchVerbs: any = {
      merged: "merged",
      rebased: "rebased onto"
    };
    for (let branch: any of message.branches) Se(`br-${branch.action}-${branch.ref}`, branchVerbs[branch.action], hi.jsx(v, {
      bold: !0,
      children: branch.ref
    }));
  }
  if (Cs() && message.prs?.length) {
    let prVerbs: any = {
      created: "created",
      edited: "edited",
      merged: "merged",
      commented: "commented on",
      closed: "closed",
      ready: "marked ready",
      draft: "marked draft",
      "auto-merge-enabled": "enabled auto-merge on",
      "auto-merge-disabled": "disabled auto-merge on"
    };
    for (let pr: any of message.prs) Se(`pr-${pr.action}-${pr.number}`, prVerbs[pr.action], pr.url ? hi.jsx(G6e, {
      number: pr.number,
      url: pr.url,
      bold: !0
    }) : hi.jsxs(v, {
      bold: !0,
      children: ["PR #", pr.number]
    }));
  }
  if (frameCount > 0) Se("frame", isActiveGroup ? "publishing" : "published", null);
  if (stableSearchCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      searchVerb: any = isActiveGroup ? isFirstPart ? "Searching for" : "searching for" : isFirstPart ? "Searched for" : "searched for";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-s"));
    primaryParts.push(hi.jsxs(v, {
      children: [searchVerb, " ", hi.jsx(v, {
        bold: !0,
        children: stableSearchCount
      }), " ", stableSearchCount === 1 ? "pattern" : "patterns"]
    }, "search"));
  }
  if (stableReadCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      readVerb: any = isActiveGroup ? isFirstPart ? "Reading" : "reading" : isFirstPart ? "Read" : "read";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-r"));
    primaryParts.push(hi.jsxs(v, {
      children: [readVerb, " ", hi.jsx(v, {
        bold: !0,
        children: stableReadCount
      }), " ", stableReadCount === 1 ? "file" : "files"]
    }, "read"));
  }
  if (stableListCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      listVerb: any = isActiveGroup ? isFirstPart ? "Listing" : "listing" : isFirstPart ? "Listed" : "listed";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-l"));
    primaryParts.push(hi.jsxs(v, {
      children: [listVerb, " ", hi.jsx(v, {
        bold: !0,
        children: stableListCount
      }), " ", stableListCount === 1 ? "directory" : "directories"]
    }, "list"));
  }
  if (replCount > 0) {
    let replVerb: any = isActiveGroup ? "REPL'ing" : "REPL'd";
    if (primaryParts.length > 0) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-repl"));
    primaryParts.push(hi.jsxs(v, {
      children: [replVerb, " ", hi.jsx(v, {
        bold: !0,
        children: replCount
      }), " ", replCount === 1 ? "time" : "times"]
    }, "repl"));
  }
  if (stableMcpCount > 0) {
    let mcpServerLabel: any = message.mcpServerNames?.map((name: any) => name.replace(/^claude\.ai /, "")).join(", ") || "MCP",
      isFirstPart: any = primaryParts.length === 0,
      mcpVerb: any = isActiveGroup ? isFirstPart ? "Calling" : "calling" : isFirstPart ? "Called" : "called";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-mcp"));
    primaryParts.push(hi.jsxs(v, {
      children: [mcpVerb, " ", mcpServerLabel, stableMcpCount > 1 && hi.jsxs(hi.Fragment, {
        children: [" ", hi.jsx(v, {
          bold: !0,
          children: stableMcpCount
        }), " times"]
      })]
    }, "mcp"));
  }
  if (otherToolCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      otherVerb: any = isActiveGroup ? isFirstPart ? "Calling" : "calling" : isFirstPart ? "Called" : "called";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-other"));
    primaryParts.push(hi.jsxs(v, {
      children: [otherVerb, " ", hi.jsx(v, {
        bold: !0,
        children: otherToolCount
      }), " ", otherToolCount === 1 ? "tool" : "tools"]
    }, "other"));
  }
  if (Cs() && nonGitBashCount > 0) {
    let isFirstPart: any = primaryParts.length === 0,
      bashVerb: any = isActiveGroup ? isFirstPart ? "Running" : "running" : isFirstPart ? "Ran" : "ran";
    if (!isFirstPart) primaryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-bash"));
    primaryParts.push(hi.jsxs(v, {
      children: [bashVerb, " ", hi.jsx(v, {
        bold: !0,
        children: nonGitBashCount
      }), " shell", " ", nonGitBashCount === 1 ? "command" : "commands"]
    }, "bash"));
  }
  let hasPrimaryParts: any = primaryParts.length > 0,
    memoryParts: any = [];
  if (memoryReadCount > 0) {
    let isFirstPart: any = !hasPrimaryParts && memoryParts.length === 0,
      memoryReadVerb: any = isActiveGroup ? isFirstPart ? "Recalling" : "recalling" : isFirstPart ? "Recalled" : "recalled";
    if (!isFirstPart) memoryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-mr"));
    memoryParts.push(hi.jsxs(v, {
      children: [memoryReadVerb, " ", hi.jsx(v, {
        bold: !0,
        children: memoryReadCount
      }), " ", memoryReadCount === 1 ? "memory" : "memories"]
    }, "mem-read"));
  }
  if (memorySearchCount > 0) {
    let isFirstPart: any = !hasPrimaryParts && memoryParts.length === 0,
      memorySearchVerb: any = isActiveGroup ? isFirstPart ? "Searching" : "searching" : isFirstPart ? "Searched" : "searched";
    if (!isFirstPart) memoryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-ms"));
    memoryParts.push(hi.jsx(v, {
      children: `${memorySearchVerb} memories`
    }, "mem-search"));
  }
  if (memoryWriteCount > 0) {
    let isFirstPart: any = !hasPrimaryParts && memoryParts.length === 0,
      memoryWriteVerb: any = isActiveGroup ? isFirstPart ? "Writing" : "writing" : isFirstPart ? "Wrote" : "wrote";
    if (!isFirstPart) memoryParts.push(hi.jsx(v, {
      children: ", "
    }, "comma-mw"));
    memoryParts.push(hi.jsxs(v, {
      children: [memoryWriteVerb, " ", hi.jsx(v, {
        bold: !0,
        children: memoryWriteCount
      }), " ", memoryWriteCount === 1 ? "memory" : "memories"]
    }, "mem-write"));
  }
  return hi.jsxs($, {
    flexDirection: "column",
    marginTop: addMargin ? 1 : 0,
    children: [hi.jsxs($, {
      flexDirection: "row",
      children: [isActiveGroup ? hi.jsx(Hte, {
        shouldAnimate: !0,
        isUnresolved: !0,
        isError: hasErroredToolUse
      }) : hi.jsx($, {
        minWidth: 2
      }), hi.jsxs(v, {
        dimColor: !isActiveGroup,
        children: [primaryParts, memoryParts, Oqa({
          message,
          isActiveGroup,
          hasPrecedingParts: hasPrimaryParts || memoryParts.length > 0
        }), isActiveGroup && hi.jsx(v, {
          children: "…"
        }, "ellipsis"), " ", hi.jsx(bw, {})]
      })]
    }), isActiveGroup && hintToRender !== void 0 && hi.jsxs($, {
      flexDirection: "row",
      children: [hi.jsx($, {
        width: 5,
        flexShrink: 0,
        children: hi.jsx(v, {
          "aria-hidden": !0,
          dimColor: !0,
          children: "  ⎿  "
        })
      }), hi.jsx($, {
        flexDirection: "column",
        flexGrow: 1,
        children: showThinkingSummary ? hi.jsx(gh, {
          dimColor: !0,
          italic: !0,
          children: _Pp(hintToRender, columns - pPp, mPp)
        }) : hintToRender.split(`
`).map((line: any, lineIdx: any, lines: any) => hi.jsxs(v, {
          dimColor: !0,
          children: [line, lineIdx === lines.length - 1 && durationSuffix]
        }, `hint-${lineIdx}`))
      })]
    }), message.hookTotalMs !== void 0 && message.hookTotalMs > 0 && hi.jsxs(v, {
      dimColor: !0,
      children: [hi.jsx(v, {
        "aria-hidden": !0,
        children: "  ⎿  "
      }), "Ran ", message.hookCount, " PreToolUse", " ", message.hookCount === 1 ? "hook" : "hooks", " (", EMe(message.hookTotalMs), ")"]
    }), isActiveGroup && message.pendingText && hi.jsxs($, {
      flexDirection: "row",
      marginTop: 1,
      children: [hi.jsx($, {
        width: 2,
        flexShrink: 0,
        children: hi.jsx(v, {
          "aria-hidden": !0,
          dimColor: !0,
          children: Ql
        })
      }), hi.jsx($, {
        flexDirection: "column",
        flexGrow: 1,
        children: hi.jsx(gh, {
          dimColor: !0,
          children: message.pendingText
        })
      })]
    })]
  });
}

/** Live "Thinking for …" timer; ticks every 1s while an agent task is active. */
function hPp(props: any): any {
  let $cache: any = vmo.c(6),
    {
      baseMs,
      lastThinkingAtMs
    } = props,
    agentTaskId: any = _t(gPp),
    resolvedTaskId: any;
  if ($cache[0] !== agentTaskId) resolvedTaskId = agentTaskId ?? rs(), $cache[0] = agentTaskId, $cache[1] = resolvedTaskId;else resolvedTaskId = $cache[1];
  let startedAtMs: any = dfa(resolvedTaskId);
  Dm(startedAtMs !== null ? 1000 : null);
  let elapsedMs: any = startedAtMs !== null ? baseMs + Math.min(wmo, Math.max(0, Date.now() - Math.max(startedAtMs, lastThinkingAtMs))) : baseMs,
    clampedMs: any = Math.max(1000, elapsedMs),
    durationLabel: any;
  if ($cache[2] !== clampedMs) durationLabel = Fi(clampedMs), $cache[2] = clampedMs, $cache[3] = durationLabel;else durationLabel = $cache[3];
  let durationNode: any;
  if ($cache[4] !== durationLabel) durationNode = hi.jsx(v, {
    bold: !0,
    children: durationLabel
  }), $cache[4] = durationLabel, $cache[5] = durationNode;else durationNode = $cache[5];
  return durationNode;
}

/** Selector: the id of the agent task currently being viewed. */
function gPp(state: any): any {
  return state.viewingAgentTaskId;
}

/** Wraps `text` to `width` columns and clamps it to `maxLines` display lines, appending an ellipsis. */
function _Pp(text: any, width: any, maxLines: any): any {
  if (width < 1) return text;
  let wrappedLines: any = e1(text, width, "wrap").split(`
`);
  if (wrappedLines.length <= maxLines) return text;
  let clamped: any = wrappedLines.slice(0, maxLines).join("").replace(/\s+/g, " ").trim();
  while (clamped.length > 0 && nu(e1(`${clamped}…`, width, "wrap"), `
`) + 1 > maxLines) {
    let secondLastCodePoint: any = clamped.length > 1 ? clamped.codePointAt(clamped.length - 2) : void 0;
    clamped = clamped.slice(0, secondLastCodePoint !== void 0 && secondLastCodePoint > 65535 ? -2 : -1);
  }
  return `${clamped.trimEnd()}…`;
}

var vmo: any,
  $qa: any,
  Gdt: any,
  hi: any,
  uPp = 700,
  dPp = 3000,
  pPp = 5,
  mPp = 10;
var Wqa = b(() => {
  lt();
  Pa();
  Aqa();
  vqa();
  ui();
  hPt();
  je();
  uo();
  ri();
  Z3t();
  C0e();
  Xl();
  Xo();
  tp();
  pd();
  po();
  lr();
  EW();
  $He();
  G1();
  U3n();
  Zae();
  _dt();
  Bpo();
  Lqa();
  Amo();
  vmo = x(tt(), 1), $qa = require("path"), Gdt = x(et(), 1), hi = x(oe(), 1);
});

export {fPp,qqa,hPp,gPp,_Pp,vmo,$qa,Gdt,hi,uPp,dPp,pPp,mPp,Wqa};
