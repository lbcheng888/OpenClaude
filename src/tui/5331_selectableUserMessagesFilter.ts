// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {selectableUserMessagesFilter as CGe,replayableUserMessagesFilter as wKt,Mn,cL,m3n,fl,sut,Gye,po} from "../tools/5224_userPromptCount.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {TT,s9t,K2n,Pq} from "../session/3880_trackSequence.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Le} from "../../vendor/m5.ts";
import {l6,dee} from "../permissions/4431_prompt.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {formatRelativeTimeAgo as gK,Xo} from "../../vendor/m240.ts";
import {gd,xw} from "./3853_mode.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {J4,$He} from "../../vendor/m3189.ts";
import {Rrn,dje} from "../../vendor/m618.ts";
import {xv,Ud} from "../../vendor/m615.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var c7l = {};
ft(c7l, {
  selectableUserMessagesFilter: () => CGe,
  replayableUserMessagesFilter: () => wKt,
  messagesAfterAreOnlySynthetic: () => messagesAfterAreOnlySynthetic,
  MessageSelector: () => MessageSelector
});
/** True when the restore option is one of the two summarize variants. */
function UNo(restoreOption) {
  return restoreOption === "summarize" || restoreOption === "summarize_up_to";
}
/**
 * "Rewind" UI: lets the user pick a past user message and restore the
 * conversation (and optionally code) to the point before it, or summarize.
 */
function MessageSelector({
  messages: messages,
  onPreRestore: onPreRestore,
  onRestoreMessage: onRestoreMessage,
  onRestoreCode: onRestoreCode,
  onSummarize: onSummarize,
  onClose: onClose,
  preselectedMessage: preselectedMessage
}) {
  let fileHistory = _t(state => state.fileHistory),
    [errorMessage, setErrorMessage] = cR.useState(void 0),
    canRestoreCode = TT(),
    {
      rows: rows
    } = _r(),
    availableRows = Cs() ? Math.floor(rows / 2) : rows,
    rowsPerMessage = canRestoreCode ? 3 : 2,
    chromeRows = 12,
    visibleCount = Math.max(2, Math.floor((availableRows - 12) / rowsPerMessage)),
    sentinelUuid = cR.useMemo(l7l.randomUUID, []),
    selectableMessages = cR.useMemo(() => [...messages.filter(CGe), {
      ...Mn({
        content: ""
      }),
      uuid: sentinelUuid
    }], [messages, sentinelUuid]),
    [selectedIndex, setSelectedIndex] = cR.useState(selectableMessages.length - 1),
    windowStart = Math.max(0, Math.min(selectedIndex - Math.floor(visibleCount / 2), selectableMessages.length - visibleCount)),
    windowEnd = windowStart + visibleCount,
    hasMessages = selectableMessages.length > 1,
    [confirmingMessage, setConfirmingMessage] = cR.useState(preselectedMessage),
    [diffStats, setDiffStats] = cR.useState(void 0);
  cR.useEffect(() => {
    if (!preselectedMessage || !canRestoreCode) return;
    let cancelled = !1;
    return s9t(fileHistory, preselectedMessage.uuid).then(stats => {
      if (!cancelled) setDiffStats(stats);
    }), () => {
      cancelled = !0;
    };
  }, [preselectedMessage, canRestoreCode, fileHistory]);
  let [isRestoring, setIsRestoring] = cR.useState(!1),
    [pendingRestoreOption, setPendingRestoreOption] = cR.useState(null),
    [selectedRestoreOption, setSelectedRestoreOption] = cR.useState("both"),
    [summarizeFromContext, setSummarizeFromContext] = cR.useState(""),
    [summarizeUpToContext, setSummarizeUpToContext] = cR.useState("");
  function buildRestoreOptions(withCode) {
    let options = withCode ? [{
        value: "both",
        label: "Restore code and conversation"
      }, {
        value: "conversation",
        label: "Restore conversation"
      }, {
        value: "code",
        label: "Restore code"
      }] : [{
        value: "conversation",
        label: "Restore conversation"
      }],
      contextInput = {
        type: "input",
        placeholder: "add context (optional)",
        initialValue: "",
        allowEmptySubmitToCancel: !0,
        showLabelWithValue: !0,
        labelValueSeparator: ": "
      };
    return options.push({
      value: "summarize",
      label: "Summarize from here",
      ...contextInput,
      onChange: setSummarizeFromContext
    }), options.push({
      value: "summarize_up_to",
      label: "Summarize up to here",
      ...contextInput,
      onChange: setSummarizeUpToContext
    }), options.push({
      value: "nevermind",
      label: "Never mind"
    }), options;
  }
  cR.useEffect(() => {
    W("tengu_message_selector_opened", {});
  }, []);
  async function restoreConversation(message) {
    onPreRestore(), setIsRestoring(!0);
    try {
      await onRestoreMessage(message), setIsRestoring(!1), onClose();
    } catch (err) {
      Ie(err), setIsRestoring(!1), setErrorMessage(`Failed to restore the conversation:
${err}`);
    }
  }
  async function selectMessage(message) {
    let messageIndex = messages.indexOf(message),
      indexFromEnd = messages.length - 1 - messageIndex;
    if (W("tengu_message_selector_selected", {
      index_from_end: indexFromEnd,
      message_type: Le(message.type),
      is_current_prompt: !1
    }), !messages.includes(message)) {
      onClose();
      return;
    }
    if (!canRestoreCode) {
      await restoreConversation(message);
      return;
    }
    let stats = await s9t(fileHistory, message.uuid);
    setConfirmingMessage(message), setDiffStats(stats);
  }
  async function applyRestoreOption(restoreOption) {
    if (W("tengu_message_selector_restore_option_selected", {
      option: Le(restoreOption)
    }), !confirmingMessage) {
      setErrorMessage("Message not found.");
      return;
    }
    if (restoreOption === "nevermind") {
      if (preselectedMessage) onClose();else setConfirmingMessage(void 0);
      return;
    }
    if (UNo(restoreOption)) {
      onPreRestore(), setIsRestoring(!0), setPendingRestoreOption(restoreOption), setErrorMessage(void 0);
      try {
        let summarizeDirection = restoreOption === "summarize_up_to" ? "up_to" : "from",
          context = (summarizeDirection === "up_to" ? summarizeUpToContext : summarizeFromContext).trim() || void 0;
        await onSummarize(confirmingMessage, context, summarizeDirection), setIsRestoring(!1), setPendingRestoreOption(null), setConfirmingMessage(void 0), onClose();
      } catch (err) {
        if (!(err instanceof l6)) Ie(err);
        setIsRestoring(!1), setPendingRestoreOption(null), setConfirmingMessage(void 0), setErrorMessage(`Failed to summarize:
${err}`);
      }
      return;
    }
    onPreRestore(), setIsRestoring(!0), setErrorMessage(void 0);
    let codeError = null,
      conversationError = null;
    if (restoreOption === "code" || restoreOption === "both") try {
      await onRestoreCode(confirmingMessage);
    } catch (err) {
      codeError = err, Ie(codeError);
    }
    if (restoreOption === "conversation" || restoreOption === "both") try {
      await onRestoreMessage(confirmingMessage);
    } catch (err) {
      conversationError = err, Ie(conversationError);
    }
    if (setIsRestoring(!1), setConfirmingMessage(void 0), conversationError && codeError) setErrorMessage(`Failed to restore the conversation and code:
${conversationError}
${codeError}`);else if (conversationError) setErrorMessage(`Failed to restore the conversation:
${conversationError}`);else if (codeError) setErrorMessage(`Failed to restore the code:
${codeError}`);else onClose();
  }
  let onCancel = cR.useCallback(() => {
      if (confirmingMessage && !preselectedMessage) {
        setConfirmingMessage(void 0);
        return;
      }
      W("tengu_message_selector_cancelled", {}), onClose();
    }, [onClose, confirmingMessage, preselectedMessage]),
    moveUp = cR.useCallback(() => setSelectedIndex(idx => Math.max(0, idx - 1)), []),
    moveDown = cR.useCallback(() => setSelectedIndex(idx => Math.min(selectableMessages.length - 1, idx + 1)), [selectableMessages.length]),
    moveToTop = cR.useCallback(() => setSelectedIndex(0), []),
    moveToBottom = cR.useCallback(() => setSelectedIndex(selectableMessages.length - 1), [selectableMessages.length]),
    confirmSelection = cR.useCallback(() => {
      let message = selectableMessages[selectedIndex];
      if (message) selectMessage(message);
    }, [selectableMessages, selectedIndex, selectMessage]);
  Df(void 0, void 0, !!confirmingMessage), Oo({
    "messageSelector:up": moveUp,
    "messageSelector:down": moveDown,
    "messageSelector:top": moveToTop,
    "messageSelector:bottom": moveToBottom,
    "messageSelector:select": confirmSelection
  }, {
    context: "MessageSelector",
    isActive: !isRestoring && !errorMessage && !confirmingMessage && hasMessages
  });
  let [diffStatsByIndex, setDiffStatsByIndex] = cR.useState({});
  cR.useEffect(() => {
    async function loadDiffStats() {
      if (!canRestoreCode) return;
      Promise.all(selectableMessages.map(async (message, index) => {
        if (message.uuid !== sentinelUuid) {
          let hasHistory = K2n(fileHistory, message.uuid),
            nextMessage = selectableMessages.at(index + 1),
            stats = hasHistory ? ZMm(messages, message.uuid, nextMessage?.uuid !== sentinelUuid ? nextMessage?.uuid : void 0) : void 0;
          if (stats !== void 0) setDiffStatsByIndex(prev => ({
            ...prev,
            [index]: stats
          }));else setDiffStatsByIndex(prev => ({
            ...prev,
            [index]: void 0
          }));
        }
      }));
    }
    loadDiffStats();
  }, [selectableMessages, messages, sentinelUuid, fileHistory, canRestoreCode]);
  let canRestoreSelectedCode = canRestoreCode && diffStats?.filesChanged && diffStats.filesChanged.length > 0,
    showList = !errorMessage && !confirmingMessage && !preselectedMessage && hasMessages;
  return al.jsxs(Jn, {
    title: "Rewind",
    color: "suggestion",
    onCancel: onCancel,
    isCancelActive: !confirmingMessage,
    hideInputGuide: !!confirmingMessage,
    inputGuide: al.jsxs(bn, {
      children: [!errorMessage && hasMessages && al.jsx(at, {
        chord: "enter",
        action: "continue"
      }), al.jsx(at, {
        chord: "escape",
        action: "cancel"
      })]
    }),
    children: [al.jsx(Ba, {
      error: errorMessage
    }), !hasMessages && al.jsx(wl, {
      children: "Nothing to rewind to yet."
    }), !errorMessage && confirmingMessage && hasMessages && al.jsxs(al.Fragment, {
      children: [al.jsxs(v, {
        children: ["Confirm you want to restore", " ", !diffStats && "the conversation ", "to the point before you sent this message:"]
      }), al.jsxs($, {
        flexDirection: "column",
        paddingLeft: 1,
        borderStyle: "single",
        borderRight: !1,
        borderTop: !1,
        borderBottom: !1,
        borderLeft: !0,
        borderLeftDimColor: !0,
        children: [al.jsx(a7l, {
          userMessage: confirmingMessage,
          color: "text",
          isCurrent: !1
        }), al.jsxs(v, {
          dimColor: !0,
          children: ["(", gK(new Date(confirmingMessage.timestamp)), ")"]
        })]
      }), al.jsx(XMm, {
        selectedRestoreOption: selectedRestoreOption,
        canRestoreCode: !!canRestoreSelectedCode,
        diffStatsForRestore: diffStats
      }), isRestoring && UNo(pendingRestoreOption) ? al.jsxs($, {
        flexDirection: "row",
        gap: 1,
        children: [al.jsx(gd, {}), al.jsx(v, {
          children: "Summarizing…"
        })]
      }) : al.jsx(hr, {
        isDisabled: isRestoring,
        options: buildRestoreOptions(!!canRestoreSelectedCode),
        defaultFocusValue: canRestoreSelectedCode ? "both" : "conversation",
        onFocus: option => setSelectedRestoreOption(option),
        onChange: option => applyRestoreOption(option),
        onCancel: () => preselectedMessage ? onClose() : setConfirmingMessage(void 0)
      }), canRestoreSelectedCode && al.jsx($, {
        marginBottom: 1,
        children: al.jsxs(v, {
          dimColor: !0,
          children: [Xe.warning, " Rewinding does not affect files edited manually or via bash."]
        })
      })]
    }), showList && al.jsxs(al.Fragment, {
      children: [canRestoreCode ? al.jsx(v, {
        children: "Restore the code and/or conversation to the point before…"
      }) : al.jsx(v, {
        children: "Restore and fork the conversation to the point before…"
      }), windowStart > 0 && al.jsx($, {
        paddingLeft: 1,
        children: al.jsxs(v, {
          dimColor: !0,
          children: [Xe.arrowUp, " ", windowStart, " more above"]
        })
      }), al.jsx($, {
        width: "100%",
        flexDirection: "column",
        children: selectableMessages.slice(windowStart, windowEnd).map((message, offset) => {
          let index = windowStart + offset,
            isSelected = index === selectedIndex,
            isSentinel = message.uuid === sentinelUuid,
            hasStats = index in diffStatsByIndex,
            stats = diffStatsByIndex[index],
            changedCount = stats?.filesChanged && stats.filesChanged.length;
          return al.jsxs($, {
            height: canRestoreCode ? 3 : 2,
            overflow: "hidden",
            width: "100%",
            flexDirection: "row",
            children: [al.jsx($, {
              width: 2,
              minWidth: 2,
              children: isSelected ? al.jsxs(v, {
                color: "permission",
                bold: !0,
                children: [Xe.pointer, " "]
              }) : al.jsx(v, {
                children: "  "
              })
            }), al.jsxs($, {
              flexDirection: "column",
              children: [al.jsx($, {
                flexShrink: 1,
                height: 1,
                overflow: "hidden",
                children: al.jsx(a7l, {
                  userMessage: message,
                  color: isSelected ? "suggestion" : void 0,
                  isCurrent: isSentinel,
                  paddingRight: 10
                })
              }), canRestoreCode && hasStats && al.jsx($, {
                height: 1,
                flexDirection: "row",
                children: stats ? al.jsx(al.Fragment, {
                  children: al.jsx(v, {
                    dimColor: !isSelected,
                    color: "inactive",
                    children: changedCount ? al.jsxs(al.Fragment, {
                      children: [changedCount === 1 && stats.filesChanged[0] ? `${Q_t.basename(stats.filesChanged[0])} ` : `${changedCount} files changed `, al.jsx(J4, {
                        added: stats.insertions,
                        removed: stats.deletions
                      })]
                    }) : al.jsx(al.Fragment, {
                      children: "No code changes"
                    })
                  })
                }) : al.jsxs(v, {
                  dimColor: !0,
                  color: "warning",
                  children: [Xe.warning, " No code restore"]
                })
              })]
            })]
          }, message.uuid);
        })
      }), windowEnd < selectableMessages.length && al.jsx($, {
        paddingLeft: 1,
        children: al.jsxs(v, {
          dimColor: !0,
          children: [Xe.arrowDown, " ", selectableMessages.length - windowEnd, " ", "more below"]
        })
      })]
    })]
  });
}
/** Human-readable effect description for a given restore option. */
function JMm(restoreOption) {
  switch (restoreOption) {
    case "summarize":
      return "Messages after this point will be summarized.";
    case "summarize_up_to":
      return "Preceding messages will be summarized. This and subsequent messages will remain unchanged — you will stay at the end of the conversation.";
    case "both":
    case "conversation":
      return "The conversation will be forked.";
    case "code":
    case "nevermind":
      return "The conversation will be unchanged.";
  }
}
/** Renders the description of what a restore option will do (memoized). */
function XMm(props) {
  let cache = WZn.c(11),
    {
      selectedRestoreOption: selectedRestoreOption,
      canRestoreCode: canRestoreCode,
      diffStatsForRestore: diffStatsForRestore
    } = props,
    willRestoreCode = canRestoreCode && (selectedRestoreOption === "both" || selectedRestoreOption === "code"),
    description;
  if (cache[0] !== selectedRestoreOption) description = JMm(selectedRestoreOption), cache[0] = selectedRestoreOption, cache[1] = description;else description = cache[1];
  let descriptionNode;
  if (cache[2] !== description) descriptionNode = al.jsx(v, {
    dimColor: !0,
    children: description
  }), cache[2] = description, cache[3] = descriptionNode;else descriptionNode = cache[3];
  let codeNode;
  if (cache[4] !== diffStatsForRestore || cache[5] !== selectedRestoreOption || cache[6] !== willRestoreCode) codeNode = !UNo(selectedRestoreOption) && (willRestoreCode ? al.jsx(QMm, {
    diffStatsForRestore: diffStatsForRestore
  }) : al.jsx(v, {
    dimColor: !0,
    children: "The code will be unchanged."
  })), cache[4] = diffStatsForRestore, cache[5] = selectedRestoreOption, cache[6] = willRestoreCode, cache[7] = codeNode;else codeNode = cache[7];
  let container;
  if (cache[8] !== descriptionNode || cache[9] !== codeNode) container = al.jsxs($, {
    flexDirection: "column",
    children: [descriptionNode, codeNode]
  }), cache[8] = descriptionNode, cache[9] = codeNode, cache[10] = container;else container = cache[10];
  return container;
}
/** Renders the code diff summary line for the chosen restore point (memoized). */
function QMm(props) {
  let cache = WZn.c(15),
    {
      diffStatsForRestore: diffStatsForRestore
    } = props;
  if (diffStatsForRestore === void 0) return;
  if (!diffStatsForRestore.filesChanged || !diffStatsForRestore.filesChanged[0]) {
    let node;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) node = al.jsx(v, {
      dimColor: !0,
      children: "The code has not changed (nothing will be restored)."
    }), cache[0] = node;else node = cache[0];
    return node;
  }
  let fileCount = diffStatsForRestore.filesChanged.length,
    filesLabel;
  if (fileCount === 1) {
    let baseName;
    if (cache[1] !== diffStatsForRestore.filesChanged[0]) baseName = Q_t.basename(diffStatsForRestore.filesChanged[0] || ""), cache[1] = diffStatsForRestore.filesChanged[0], cache[2] = baseName;else baseName = cache[2];
    filesLabel = baseName;
  } else if (fileCount === 2) {
    let firstName;
    if (cache[3] !== diffStatsForRestore.filesChanged[0]) firstName = Q_t.basename(diffStatsForRestore.filesChanged[0] || ""), cache[3] = diffStatsForRestore.filesChanged[0], cache[4] = firstName;else firstName = cache[4];
    let firstLabel = firstName,
      secondName;
    if (cache[5] !== diffStatsForRestore.filesChanged[1]) secondName = Q_t.basename(diffStatsForRestore.filesChanged[1] || ""), cache[5] = diffStatsForRestore.filesChanged[1], cache[6] = secondName;else secondName = cache[6];
    filesLabel = `${firstLabel} and ${secondName}`;
  } else {
    let firstName;
    if (cache[7] !== diffStatsForRestore.filesChanged[0]) firstName = Q_t.basename(diffStatsForRestore.filesChanged[0] || ""), cache[7] = diffStatsForRestore.filesChanged[0], cache[8] = firstName;else firstName = cache[8];
    filesLabel = `${firstName} and ${diffStatsForRestore.filesChanged.length - 1} other files`;
  }
  let diffNode;
  if (cache[9] !== diffStatsForRestore.deletions || cache[10] !== diffStatsForRestore.insertions) diffNode = al.jsx(J4, {
    added: diffStatsForRestore.insertions,
    removed: diffStatsForRestore.deletions
  }), cache[9] = diffStatsForRestore.deletions, cache[10] = diffStatsForRestore.insertions, cache[11] = diffNode;else diffNode = cache[11];
  let result;
  if (cache[12] !== filesLabel || cache[13] !== diffNode) result = al.jsx(al.Fragment, {
    children: al.jsxs(v, {
      dimColor: !0,
      children: ["The code will be restored", " ", diffNode, " ", "in ", filesLabel, "."]
    })
  }), cache[12] = filesLabel, cache[13] = diffNode, cache[14] = result;else result = cache[14];
  return result;
}
/** Renders a single user-message row (current marker, slash command, bash input, or truncated text). */
function a7l(props) {
  let cache = WZn.c(30),
    {
      userMessage: userMessage,
      color: color,
      dimColor: dimColor,
      isCurrent: isCurrent,
      paddingRight: paddingRight
    } = props,
    {
      columns: columns
    } = _r();
  if (isCurrent) {
    let node;
    if (cache[0] !== color || cache[1] !== dimColor) node = al.jsx($, {
      width: "100%",
      children: al.jsx(v, {
        italic: !0,
        color: color,
        dimColor: dimColor,
        children: "(current)"
      })
    }), cache[0] = color, cache[1] = dimColor, cache[2] = node;else node = cache[2];
    return node;
  }
  let TextComp, BoxComp, textColor, textDimColor, textContent, flexDir, boxWidth, earlyResult;
  if (cache[3] !== color || cache[4] !== columns || cache[5] !== dimColor || cache[6] !== paddingRight || cache[7] !== userMessage) {
    earlyResult = Symbol.for("react.early_return_sentinel");
    e: {
      let rawText = cL(userMessage)?.trim() || "(no prompt)",
        promptText = Rrn(rawText);
      if (m3n(promptText)) {
        let emptyNode;
        if (cache[16] !== color || cache[17] !== dimColor) emptyNode = al.jsx($, {
          flexDirection: "row",
          width: "100%",
          children: al.jsx(v, {
            italic: !0,
            color: color,
            dimColor: dimColor,
            children: "((empty message))"
          })
        }), cache[16] = color, cache[17] = dimColor, cache[18] = emptyNode;else emptyNode = cache[18];
        earlyResult = emptyNode;
        break e;
      }
      if (promptText.includes("<bash-input>")) {
        let bashInput = fl(promptText, "bash-input");
        if (bashInput) {
          let bangNode;
          if (cache[19] === Symbol.for("react.memo_cache_sentinel")) bangNode = al.jsx(v, {
            color: "bashBorder",
            children: "!"
          }), cache[19] = bangNode;else bangNode = cache[19];
          earlyResult = al.jsxs($, {
            flexDirection: "row",
            width: "100%",
            children: [bangNode, al.jsxs(v, {
              color: color,
              dimColor: dimColor,
              children: [" ", bashInput]
            })]
          });
          break e;
        }
      }
      if (promptText.includes(`<${xv}>`)) {
        let commandName = fl(promptText, xv),
          commandArgs = fl(promptText, "command-args"),
          isSkill = fl(promptText, "skill-format") === "true";
        if (commandName) if (isSkill) {
          earlyResult = al.jsx($, {
            flexDirection: "row",
            width: "100%",
            children: al.jsxs(v, {
              color: color,
              dimColor: dimColor,
              children: ["Skill(", commandName, ")"]
            })
          });
          break e;
        } else {
          earlyResult = al.jsx($, {
            flexDirection: "row",
            width: "100%",
            children: al.jsxs(v, {
              color: color,
              dimColor: dimColor,
              children: ["/", commandName, " ", commandArgs]
            })
          });
          break e;
        }
      }
      BoxComp = $, flexDir = "row", boxWidth = "100%", TextComp = v, textColor = color, textDimColor = dimColor, textContent = paddingRight ? Ha(promptText, columns - paddingRight, !0) : promptText.slice(0, 500).split(`
`).slice(0, 4).join(`
`);
    }
    cache[3] = color, cache[4] = columns, cache[5] = dimColor, cache[6] = paddingRight, cache[7] = userMessage, cache[8] = TextComp, cache[9] = BoxComp, cache[10] = textColor, cache[11] = textDimColor, cache[12] = textContent, cache[13] = flexDir, cache[14] = boxWidth, cache[15] = earlyResult;
  } else TextComp = cache[8], BoxComp = cache[9], textColor = cache[10], textDimColor = cache[11], textContent = cache[12], flexDir = cache[13], boxWidth = cache[14], earlyResult = cache[15];
  if (earlyResult !== Symbol.for("react.early_return_sentinel")) return earlyResult;
  let textNode;
  if (cache[20] !== TextComp || cache[21] !== textColor || cache[22] !== textDimColor || cache[23] !== textContent) textNode = al.jsx(TextComp, {
    color: textColor,
    dimColor: textDimColor,
    children: textContent
  }), cache[20] = TextComp, cache[21] = textColor, cache[22] = textDimColor, cache[23] = textContent, cache[24] = textNode;else textNode = cache[24];
  let rowNode;
  if (cache[25] !== BoxComp || cache[26] !== flexDir || cache[27] !== boxWidth || cache[28] !== textNode) rowNode = al.jsx(BoxComp, {
    flexDirection: flexDir,
    width: boxWidth,
    children: textNode
  }), cache[25] = BoxComp, cache[26] = flexDir, cache[27] = boxWidth, cache[28] = textNode, cache[29] = rowNode;else rowNode = cache[29];
  return rowNode;
}
/**
 * Computes the aggregate diff stats (files changed, insertions, deletions)
 * for tool results between the message `startUuid` and `endUuid` (exclusive).
 */
function ZMm(messages, startUuid, endUuid) {
  let startIndex = messages.findIndex(m => m.uuid === startUuid);
  if (startIndex === -1) return;
  let endIndex = endUuid ? messages.findIndex(m => m.uuid === endUuid) : messages.length;
  if (endIndex === -1) endIndex = messages.length;
  let filesChanged = [],
    insertions = 0,
    deletions = 0;
  for (let i = startIndex + 1; i < endIndex; i++) {
    let message = messages[i];
    if (!message || !sut(message)) continue;
    let toolUseResult = message.toolUseResult;
    if (!toolUseResult || !toolUseResult.filePath || !toolUseResult.structuredPatch) continue;
    if (!filesChanged.includes(toolUseResult.filePath)) filesChanged.push(toolUseResult.filePath);
    try {
      if ("type" in toolUseResult && toolUseResult.type === "create") insertions += toolUseResult.content.split(/\r?\n/).length;else for (let hunk of toolUseResult.structuredPatch) {
        let added = zn(hunk.lines, line => line.startsWith("+")),
          removed = zn(hunk.lines, line => line.startsWith("-"));
        insertions += added, deletions += removed;
      }
    } catch {
      continue;
    }
  }
  return {
    filesChanged: filesChanged,
    insertions: insertions,
    deletions: deletions
  };
}
/** True when every message after index `t` is synthetic (no real user/assistant content). */
function messagesAfterAreOnlySynthetic(messages, index) {
  for (let i = index + 1; i < messages.length; i++) {
    let message = messages[i];
    if (!message) continue;
    if (Gye(message)) continue;
    if (sut(message)) continue;
    if (message.type === "progress") continue;
    if (message.type === "system") continue;
    if (message.type === "attachment") continue;
    if (message.type === "user" && message.isMeta) continue;
    if (message.type === "assistant") {
      let content = message.message.content;
      if (Array.isArray(content)) {
        if (content.some(part => part.type === "text" && part.text?.trim() || part.type === "tool_use")) return !1;
      }
      continue;
    }
    if (message.type === "user") return !1;
  }
  return !0;
}
var WZn, l7l, Q_t, cR, al;
var GZn = b(() => {
  Zs();
  ui();
  kt();
  dee();
  uo();
  Pq();
  vn();
  Ud();
  TI();
  je();
  ss();
  dje();
  Xo();
  tp();
  po();
  Ol();
  Is();
  di();
  $He();
  sy();
  I_();
  Wo();
  po();
  xw();
  WZn = x(tt(), 1), l7l = require("crypto"), Q_t = x(require("path")), cR = x(et(), 1), al = x(oe(), 1);
});

export {c7l,UNo,MessageSelector,JMm,XMm,QMm,a7l,ZMm,messagesAfterAreOnlySynthetic,WZn,l7l,Q_t,cR,al,GZn};
