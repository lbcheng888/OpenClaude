// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {kul,Hul,oVn,uCo,sVn} from "../permissions/4484_word.ts";
import {Dy,SE} from "../../vendor/m2559.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Nu,Ub,Wu} from "../../vendor/m438.ts";
import {useInterval as zc,c6r} from "../../vendor/m2456.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {Mn,fS,P_,po} from "../tools/5224_userPromptCount.ts";
import {yw,jz} from "../config/2716_jz.ts";
import {pCo,Dul} from "../agent/4485_spawnForkFromDirective.ts";
import {ly,Gul} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {Yje,Pa} from "../../vendor/m720.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {hCo,fCo} from "../session/4486_deriveFirstPrompt.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {f6,zDe} from "../../vendor/m4482.ts";
import {gh,G1} from "../../vendor/m3957.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {truncateToWidth as xs,XH} from "../../vendor/m239.ts";
import {A0e,J$t} from "../../vendor/m3847.ts";
import {getLastCacheSafeParams as ele,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {ux,CG} from "../agent/5206_len.ts";
import {Py,AE,y$} from "../config/2734_duration_ms.ts";
import {vc} from "../api/3886_level.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * /btw side-question TUI command (Claude Code v2.1.190).
 *
 * Renders an inline "side question" panel: the user asks a one-off question
 * (`/btw <question>`) that is answered out-of-band without disturbing the main
 * conversation. Supports history navigation (left/right), copy (c), fork (f),
 * clear history (x), scrolling (up/down), and close (escape).
 */
var qul = {};
ft(qul, {
  call: () => call
});

/**
 * The /btw side-question panel component.
 *
 * @param question - The current side-question text.
 * @param context  - The tool-use context (carries options, canUseTool, etc.).
 * @param onDone    - Callback to dismiss the panel / emit a system message.
 */
function _jp({
  question: question,
  context: context,
  onDone: onDone
}) {
  let [response, setResponse] = sN.useState(null),
    [isSynthetic, setIsSynthetic] = sN.useState(!1),
    [errorMessage, setErrorMessage] = sN.useState(null),
    [retryInfo, setRetryInfo] = sN.useState(null),
    [spinnerFrame, setSpinnerFrame] = sN.useState(0),
    [history, setHistory] = sN.useState(() => kul()),
    historyRef = sN.useRef(history),
    isForkingRef = sN.useRef(!1),
    [isForking, setIsForking] = sN.useState(!1),
    selectedHistoryIndexRef = sN.useRef(null),
    [selectedHistoryIndex, setSelectedHistoryIndex] = sN.useState(null),
    scrollRef = sN.useRef(null),
    resetSelection = () => {
      selectedHistoryIndexRef.current = null, setSelectedHistoryIndex(null), scrollRef.current?.scrollTo(0);
    },
    [copyFlashCount, setCopyFlashCount] = sN.useState(0),
    {
      rows: terminalRows,
      columns: terminalColumns
    } = Dy(_r()),
    remoteSession = Nu();
  zc(() => setSpinnerFrame(prev => prev + 1), response || errorMessage ? null : 80), md(() => setCopyFlashCount(0), copyFlashCount ? 2000 : null, [copyFlashCount]);

  /**
   * Keyboard handler for the panel. Handles navigation, copy, fork, clear,
   * scroll, and close.
   */
  function onKeyDown(keyEvent) {
    if (isForkingRef.current) {
      keyEvent.preventDefault();
      return;
    }
    // Text currently displayed: a selected history entry's response, or the live response.
    let displayedText = selectedHistoryIndexRef.current !== null ? historyRef.current[selectedHistoryIndexRef.current]?.response : response;
    if (keyEvent.key === "escape" || keyEvent.key === "return" || keyEvent.key === " " || keyEvent.ctrl && (keyEvent.key === "c" || keyEvent.key === "d")) {
      keyEvent.preventDefault(), onDone(void 0, {
        display: "skip"
      });
      return;
    }
    if (keyEvent.key === "left" || keyEvent.key === "right") {
      keyEvent.preventDefault();
      let historyLength = historyRef.current.length;
      if (historyLength === 0) return;
      let minIndex = Math.max(0, historyLength - Uul),
        currentIndex = selectedHistoryIndexRef.current ?? historyLength,
        nextIndex = Math.max(minIndex, Math.min(historyLength, currentIndex + (keyEvent.key === "left" ? -1 : 1)));
      if (nextIndex === currentIndex) return;
      selectedHistoryIndexRef.current = nextIndex === historyLength ? null : nextIndex, setSelectedHistoryIndex(selectedHistoryIndexRef.current), scrollRef.current?.scrollTo(0);
      return;
    }
    if (keyEvent.key === "x" && historyRef.current.length > 0) {
      keyEvent.preventDefault(), Hul(response && !isSynthetic ? [{
        question: question,
        response: response
      }] : []), historyRef.current = [], setHistory([]), resetSelection();
      return;
    }
    if (keyEvent.key === "c" && !keyEvent.ctrl && !keyEvent.meta && displayedText) {
      keyEvent.preventDefault(), sw(displayedText).then(text => {
        if (text) process.stdout.write(text);
      }), setCopyFlashCount(prev => prev + 1);
      return;
    }
    if (keyEvent.key === "f" && response && !isSynthetic && !remoteSession && selectedHistoryIndexRef.current === null) {
      keyEvent.preventDefault(), isForkingRef.current = !0, setIsForking(!0);
      let forkMessages = [Mn({
          content: question
        }), fS({
          content: response
        })],
        cancelForking = () => {
          isForkingRef.current = !1, setIsForking(!1);
        };
      if (!yw()) Promise.all([Promise.resolve().then(() => (pCo(), Dul)), Promise.resolve().then(() => (ly(), Gul))]).then(([{
        spawnForkFromDirective: spawnForkFromDirective
      }, {
        hasPermissionsToUseTool: hasPermissionsToUseTool
      }]) => spawnForkFromDirective(question, context, context.canUseTool ?? hasPermissionsToUseTool, forkMessages)).then(forkResult => {
        if (forkResult) onDone(`${Yje} forked ${forkResult.name} (${forkResult.agentId.slice(-4)})`, {
          display: "system"
        });else cancelForking(), onDone("Cannot fork before the first conversation turn", {
          display: "system"
        });
      }).catch(forkError => {
        cancelForking(), onDone(`Failed to fork: ${Ce(forkError)}`);
      });else Promise.resolve().then(() => (hCo(), fCo)).then(({
        branchAndResume: branchAndResume
      }) => branchAndResume(context, onDone, {
        customTitle: gCo(`btw: ${question}`, 80),
        extraMessages: forkMessages
      }).then(branchResult => {
        if (!branchResult) cancelForking();
      })).catch(branchError => {
        cancelForking(), onDone(`Failed to branch conversation: ${Ce(branchError)}`);
      });
      return;
    }
    if (keyEvent.key === "up" || keyEvent.ctrl && keyEvent.key === "p") keyEvent.preventDefault(), scrollRef.current?.scrollBy(-Bul);
    if (keyEvent.key === "down" || keyEvent.ctrl && keyEvent.key === "n") keyEvent.preventDefault(), scrollRef.current?.scrollBy(Bul);
  }

  sN.useEffect(() => {
    let abortController = kl();
    async function askQuestion() {
      let remote = Nu();
      if (remote && !Ub()) {
        setErrorMessage(remote.viewerOnly ? "Side questions aren't available when viewing a session read-only" : "This remote connection doesn't support side questions");
        return;
      }
      try {
        let result = remote ? await remote.sendControlRequest({
          subtype: "side_question",
          question: question
        }) : await oVn({
          question: question,
          cacheSafeParams: await bjp(context),
          parentController: abortController,
          onRetry: retry => {
            if (abortController.signal.aborted) return;
            setRetryInfo({
              ...retry,
              retryAt: Date.now() + retry.retryInMs
            });
          }
        });
        if (!abortController.signal.aborted) if (result.response) {
          if (selectedHistoryIndexRef.current = null, setSelectedHistoryIndex(null), scrollRef.current?.scrollTo(0), setResponse(result.response), setIsSynthetic(result.synthetic ?? !1), remote && !result.synthetic) uCo(question, result.response);
        } else selectedHistoryIndexRef.current = null, setSelectedHistoryIndex(null), scrollRef.current?.scrollTo(0), setErrorMessage("No response received");
      } catch (caught) {
        if (!abortController.signal.aborted) selectedHistoryIndexRef.current = null, setSelectedHistoryIndex(null), scrollRef.current?.scrollTo(0), setErrorMessage(Ce(caught) || "Failed to get response");
      }
    }
    return askQuestion(), () => {
      abortController.abort();
    };
  }, [question, context]);

  // Window of recent history shown; older entries are summarized as a count.
  let visibleHistory = history.slice(-Uul),
    hiddenHistoryCount = history.length - visibleHistory.length,
    selectedEntry = selectedHistoryIndex !== null ? history[selectedHistoryIndex] : null,
    headerLineCount = visibleHistory.length + (hiddenHistoryCount > 0 ? 1 : 0),
    contentWidth = Math.max(20, terminalColumns - 7),
    contentMaxHeight = Math.max(5, terminalRows - hjp - gjp - headerLineCount);
  return F_.jsxs($, {
    flexDirection: "column",
    paddingLeft: 2,
    marginTop: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: onKeyDown,
    children: [hiddenHistoryCount > 0 && F_.jsxs(v, {
      dimColor: !0,
      children: ["(+", hiddenHistoryCount, " earlier /btw)"]
    }), visibleHistory.map((entry, offset) => {
      let entryIndex = hiddenHistoryCount + offset;
      return F_.jsxs(v, {
        dimColor: selectedHistoryIndex !== entryIndex,
        bold: selectedHistoryIndex === entryIndex,
        children: ["/btw ", gCo(entry.question, contentWidth)]
      }, entryIndex);
    }), F_.jsxs(v, {
      children: [F_.jsxs(v, {
        color: selectedEntry ? void 0 : "warning",
        bold: !selectedEntry,
        dimColor: !!selectedEntry,
        children: ["/btw", " "]
      }), F_.jsx(v, {
        dimColor: !0,
        children: gCo(question, contentWidth)
      })]
    }), F_.jsx($, {
      marginTop: 1,
      marginLeft: 2,
      maxHeight: contentMaxHeight,
      children: F_.jsx(f6, {
        ref: scrollRef,
        flexDirection: "column",
        flexGrow: 1,
        stickyScroll: !1,
        children: selectedEntry ? F_.jsx(gh, {
          children: selectedEntry.response
        }) : errorMessage ? F_.jsx(Ba, {
          error: errorMessage
        }) : response ? F_.jsx(gh, {
          children: response
        }) : F_.jsx(yjp, {
          frame: spinnerFrame,
          retry: retryInfo
        })
      })
    }), F_.jsx($, {
      marginTop: 1,
      children: isForking ? F_.jsx(v, {
        dimColor: !0,
        children: "Forking\u2026"
      }) : F_.jsx(v, {
        dimColor: !0,
        children: F_.jsxs(bn, {
          children: [history.length > 0 ? F_.jsx(at, {
            chord: ["left", "right"],
            action: "switch"
          }) : (selectedEntry || response || errorMessage) && F_.jsx(at, {
            chord: ["up", "down"],
            action: "scroll"
          }), (selectedEntry || response) && (copyFlashCount > 0 ? F_.jsx(v, {
            color: "success",
            children: "Copied to clipboard"
          }) : F_.jsx(at, {
            chord: "c",
            action: "copy"
          })), response && !isSynthetic && !remoteSession && selectedHistoryIndex === null && F_.jsx(at, {
            chord: "f",
            action: "fork"
          }), history.length > 0 && F_.jsx(at, {
            chord: "x",
            action: "clear history"
          }), F_.jsx(at, {
            chord: "escape",
            action: "close"
          })]
        })
      })
    })]
  });
}

/** Collapse whitespace and truncate `text` to fit `width` columns. */
function gCo(text, width) {
  return xs(text.replace(/\s+/g, " ").trim(), width);
}

/**
 * Loading / retry indicator shown while a side question is being answered.
 * Uses React-compiler memoization cache `t`.
 */
function yjp(props) {
  let cache = $ul.c(19),
    {
      frame: frame,
      retry: retry
    } = props;
  if (!retry) {
    let spinner;
    if (cache[0] !== frame) spinner = F_.jsx(A0e, {
      frame: frame,
      messageColor: "warning"
    }), cache[0] = frame, cache[1] = spinner;else spinner = cache[1];
    let answeringText;
    if (cache[2] === Symbol.for("react.memo_cache_sentinel")) answeringText = F_.jsx(v, {
      color: "warning",
      children: "Answering\u2026"
    }), cache[2] = answeringText;else answeringText = cache[2];
    let answeringRow;
    if (cache[3] !== spinner) answeringRow = F_.jsxs($, {
      children: [spinner, answeringText]
    }), cache[3] = spinner, cache[4] = answeringRow;else answeringRow = cache[4];
    return answeringRow;
  }
  let secondsUntilRetry = Math.max(0, Math.ceil((retry.retryAt - Date.now()) / 1000)),
    retrySpinner;
  if (cache[5] !== frame) retrySpinner = F_.jsx(A0e, {
    frame: frame,
    messageColor: "warning"
  }), cache[5] = frame, cache[6] = retrySpinner;else retrySpinner = cache[6];
  let statusLabel;
  if (cache[7] !== retry.status) statusLabel = Tjp(retry.status), cache[7] = retry.status, cache[8] = statusLabel;else statusLabel = cache[8];
  let statusText;
  if (cache[9] !== statusLabel) statusText = F_.jsx(v, {
    color: "warning",
    children: statusLabel
  }), cache[9] = statusLabel, cache[10] = statusText;else statusText = cache[10];
  let retryDetailText;
  if (cache[11] !== secondsUntilRetry || cache[12] !== retry.maxRetries || cache[13] !== retry.retryAttempt) retryDetailText = F_.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 retrying in ", secondsUntilRetry, "s \xB7 attempt ", retry.retryAttempt, "/", retry.maxRetries]

  }), cache[11] = secondsUntilRetry, cache[12] = retry.maxRetries, cache[13] = retry.retryAttempt, cache[14] = retryDetailText;else retryDetailText = cache[14];
  let retryRow;
  if (cache[15] !== retrySpinner || cache[16] !== statusText || cache[17] !== retryDetailText) retryRow = F_.jsxs($, {
    children: [retrySpinner, statusText, retryDetailText]
  }), cache[15] = retrySpinner, cache[16] = statusText, cache[17] = retryDetailText, cache[18] = retryRow;else retryRow = cache[18];
  return retryRow;
}

/** Map an HTTP status code to a human-readable retry status label. */
function Tjp(status) {
  switch (status) {
    case 429:
      return "Rate limited";
    case 529:
      return "API overloaded";
    case 401:
    case 403:
      return "Authentication failed";
    default:
      return "API error";
  }
}

/**
 * Drop a trailing in-progress assistant message (stop_reason null) so the
 * fork context only contains completed turns.
 */
function Sjp(messages) {
  let last = messages.at(-1);
  if (last?.type === "assistant" && last.message.stop_reason === null) return messages.slice(0, -1);
  return messages;
}

/**
 * Build the cache-safe params used to ask a side question, reusing cached
 * prompt/context state when available, otherwise computing it fresh.
 */
async function bjp(context) {
  let forkContextMessages = P_(Sjp(context.messages)),
    cached = ele();
  if (cached) return {
    systemPrompt: cached.systemPrompt,
    userContext: cached.userContext,
    systemContext: cached.systemContext,
    toolUseContext: context,
    forkContextMessages: forkContextMessages
  };
  let [systemPromptParts, userContext, systemContext] = await Promise.all([ux(context.options.tools, context.options.mainLoopModel, []), Py(), AE(context.options.cacheBreakerPhrase)]);
  return {
    systemPrompt: vc(systemPromptParts),
    userContext: userContext,
    systemContext: systemContext,
    toolUseContext: context,
    forkContextMessages: forkContextMessages
  };
}

/**
 * Slash-command entry point for /btw. Validates the question, bumps usage
 * count, and returns the side-question panel element.
 */
async function call(onDone, context, rawArgs) {
  let question = rawArgs?.trim();
  if (!question) return onDone("Usage: /btw <your question>", {
    display: "system"
  }), null;
  return hn(prev => ({
    ...prev,
    btwUseCount: prev.btwUseCount + 1
  })), F_.jsx(_jp, {
    question: question,
    context: context,
    onDone: onDone
  });
}

var $ul,
  sN,
  F_,
  hjp = 5,
  gjp = 6,
  Bul = 3,
  Uul = 5;
var Wul = b(() => {
  Is();
  I_();
  Wo();
  G1();
  J$t();
  Pa();
  CG();
  SE();
  y$();
  jz();
  ui();
  zDe();
  c6r();
  hg();
  je();
  Wu();
  lh();
  tr();
  Ct();
  ID();
  po();
  sVn();
  XH();
  $ul = x(tt(), 1), sN = x(et(), 1), F_ = x(oe(), 1);
});

export {qul,_jp,gCo,yjp,Tjp,Sjp,bjp,call as Ejp,$ul,sN,F_,hjp,gjp,Bul,Uul,Wul};
