// @ts-nocheck
import {_t,uo} from "../../vendor/m2468.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getIsGit as Ay,getGitState as zTr,ia} from "../../vendor/m698.ts";
import {edl,n8t,HCo,x8e} from "../agent/4493_kind.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Ne} from "../../vendor/m583.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {kc,aA} from "../../vendor/m234.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {vB,rb} from "../permissions/5211_level.ts";
import {vc} from "../api/3886_level.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {_1,kD} from "../api/2754_actualTokens.ts";
import {allTools as R_,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Cd,lr} from "../../vendor/m233.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tdl} from "../../vendor/m4493.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function sdl({
  abortSignal: e,
  messages: t,
  initialDescription: n,
  onDone: r,
  backgroundTasks: o = {},
  mode: s = "post",
  readFileState: i,
  surveyFeedbackSource: a
}) {
  let [phase, setPhase] = iN.useState("userInput"),
    [cursorOffset, setCursorOffset] = iN.useState(0),
    [description, setDescription] = iN.useState(n ?? ""),
    [feedbackId, setFeedbackId] = iN.useState(null),
    [zipPath, setZipPath] = iN.useState(null),
    [titleSuggestion, setErrorMsg] = iN.useState(null),
    [gitInfo, setGitInfo] = iN.useState({
      isGit: false,
      gitState: null
    }),
    [titleSuggestion_2, setTitleSuggestion] = iN.useState(null),
    [sessionScope, setSessionScope] = iN.useState("session"),
    transcripts = _t(V => V.transcripts),
    terminalCols = _r().columns - 4,
    isAmberLynxEnabled = it("tengu_amber_lynx", false);
  iN.useEffect(() => {
    async function loadGitState() {
      let isGit = await Ay(),
        gitState = null;
      if (isGit) gitState = await zTr();
      setGitInfo({
        isGit: isGit,
        gitState: gitState
      });
    }
    loadGitState();
  }, []);
  let submitFeedback = iN.useCallback(async () => {
      if (setPhase("submitting"), setErrorMsg(null), setFeedbackId(null), s === "bundle") {
        let bundleResult = await edl({
          messages: t,
          description: description,
          surface: "cli",
          scope: sessionScope,
          backgroundTasks: o,
          transcripts: transcripts,
          surveyFeedbackSource: a
        });
        if (bundleResult.success) setFeedbackId(bundleResult.bundleId), setZipPath(bundleResult.zipPath), setPhase("done");else setErrorMsg(`Couldn't save the feedback bundle to disk: ${bundleResult.error}`), setPhase("userInput");
        return;
      }
      let [submitResult, generatedTitle] = await Promise.all([n8t({
        messages: t,
        description: description,
        surface: "cli",
        scope: sessionScope,
        backgroundTasks: o,
        transcripts: transcripts,
        signal: e,
        surveyFeedbackSource: a
      }), isAmberLynxEnabled ? Promise.resolve(null) : $jp(description, e)]);
      if (setTitleSuggestion(generatedTitle), submitResult.success) setFeedbackId(submitResult.feedbackId), setPhase("done");else {
        if (submitResult.isZdrOrg) setErrorMsg("Feedback collection is not available for organizations with custom data retention policies.");else if (submitResult.failureReason === "auth_error") setErrorMsg("Couldn't send feedback: not signed in. Run /login, then retry.");else {
          let suffix = submitResult.statusCode ? ` (server returned ${submitResult.statusCode})` : submitResult.failureReason === "timeout" ? " (request timed out)" : submitResult.failureReason === "network_error" ? " (couldn't reach the service)" : "";
          setErrorMsg(`Couldn't send feedback${suffix}. If it keeps failing, you can file at ${odl} instead.`);
        }
        setPhase("userInput");
      }
    }, [description, t, isAmberLynxEnabled, o, transcripts, e, s, sessionScope]),
    handleCancel = iN.useCallback(() => {
      r("Feedback / bug report cancelled", {
        display: "system"
      });
    }, [r]),
    handleDoneClose = iN.useCallback(() => {
      setPhase("done");
    }, []),
    handleSetError = iN.useCallback(errorText => {
      setErrorMsg(errorText), setPhase("userInput");
    }, []);
  Or("confirm:no", handleCancel, {
    context: "Settings",
    isActive: phase === "userInput"
  });
  let isDoneOrBlocked = phase === "done" || titleSuggestion && phase !== "userInput";
  function handleKeyDown(keyEvent) {
    if (keyEvent.ctrl || keyEvent.meta) return;
    if (phase === "done") {
      if (keyEvent.preventDefault(), s === "share") return;
      if (!isAmberLynxEnabled && keyEvent.key === "return" && titleSuggestion_2) {
        let githubUrl = Ujp(feedbackId ?? "", titleSuggestion_2, description, HCo());
        Zl(githubUrl);
      }
      if (titleSuggestion) r("Error submitting feedback / bug report", {
        display: "system"
      });else if (s === "bundle" && zipPath) r(`Feedback bundle saved to \`${zipPath}\``, {
        display: "system"
      });else r("Feedback / bug report submitted", {
        display: "system"
      });
      return;
    }
    if (titleSuggestion && phase !== "userInput") {
      keyEvent.preventDefault(), r("Error submitting feedback / bug report", {
        display: "system"
      });
      return;
    }
    if (phase === "consent") {
      if (keyEvent.key === "left") {
        keyEvent.preventDefault(), setPhase(s === "share" ? "userInput" : "scope");
        return;
      }
      if (keyEvent.key === "return" || keyEvent.key === " ") keyEvent.preventDefault(), submitFeedback();
    }
  }
  return Va.jsx($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown,
    children: Va.jsxs(Jn, {
      title: "Submit feedback / bug report",
      onCancel: handleCancel,
      isCancelActive: phase !== "userInput" && !isDoneOrBlocked,
      hideInputGuide: phase === "done",
      inputGuide: phase === "userInput" ? Va.jsxs(bn, {
        children: [Va.jsx(at, {
          chord: "enter",
          action: "continue"
        }), Va.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "cancel"
        })]
      }) : phase === "scope" ? Va.jsxs(bn, {
        children: [Va.jsx(at, {
          chord: "enter",
          action: "choose"
        }), Va.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "cancel"
        })]
      }) : phase === "consent" ? Va.jsxs(bn, {
        children: [Va.jsx(at, {
          chord: "enter",
          action: pVn[s].consentAction
        }), Va.jsx(at, {
          chord: "left",
          action: "change"
        }), Va.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "cancel"
        })]
      }) : null,
      children: [phase === "userInput" && Va.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [Va.jsx(v, {
          children: "Describe the issue below:"
        }), Va.jsx(ga, {
          value: description,
          onChange: newVal => {
            if (setDescription(newVal), titleSuggestion) setErrorMsg(null);
          },
          columns: terminalCols,
          onSubmit: submitted => {
            if (s !== "share" && submitted.trim() === "") {
              setErrorMsg("Please describe the issue before submitting.");
              return;
            }
            setErrorMsg(null), setPhase(s === "share" ? "consent" : "scope");
          },
          onExitMessage: () => r("Feedback cancelled", {
            display: "system"
          }),
          cursorOffset: cursorOffset,
          onChangeCursorOffset: setCursorOffset,
          showCursor: true
        }), titleSuggestion && Va.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [Va.jsx(Ba, {
            error: titleSuggestion
          }), Va.jsx(v, {
            dimColor: true,
            children: "Edit and press Enter to retry, or Esc to cancel"
          })]
        })]
      }), phase === "scope" && Va.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [Va.jsx(v, {
          children: "How much session history should we include?"
        }), Va.jsx(hr, {
          options: Bjp,
          defaultFocusValue: sessionScope,
          onChange: chosen => {
            setSessionScope(chosen), setPhase("consent");
          },
          onCancel: handleCancel
        })]
      }), phase === "consent" && Va.jsxs($, {
        flexDirection: "column",
        children: [Va.jsx(v, {
          children: pVn[s].consentIntro
        }), Va.jsxs($, {
          marginLeft: 2,
          flexDirection: "column",
          children: [Va.jsxs(v, {
            children: ["- Your feedback / bug description:", " ", Va.jsx(v, {
              dimColor: true,
              children: description
            })]
          }), Va.jsxs(v, {
            children: ["- Environment info:", " ", Va.jsxs(v, {
              dimColor: true,
              children: [Ne.platform, ", ", Ne.terminal, ", v", {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://code.claude.com/docs/en/overview",
                VERSION: "2.1.190",
                FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
                BUILD_TIME: "2026-06-24T02:21:52Z",
                GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
              }.VERSION]
            })]
          }), s !== "share" && gitInfo.gitState && Va.jsxs(v, {
            children: ["- Git repo metadata:", " ", Va.jsxs(v, {
              dimColor: true,
              children: [gitInfo.gitState.branchName, gitInfo.gitState.commitHash ? `, ${gitInfo.gitState.commitHash.slice(0, 7)}` : "", gitInfo.gitState.remoteUrl ? ` @ ${gitInfo.gitState.remoteUrl}` : "", !gitInfo.gitState.isHeadOnRemote && ", not synced", !gitInfo.gitState.isClean && ", has local changes"]
            })]
          }), Va.jsxs(v, {
            children: ["- Session transcript:", " ", Va.jsx(v, {
              dimColor: true,
              children: s === "share" ? rdl.session : rdl[sessionScope]
            })]
          })]
        }), Va.jsx($, {
          marginTop: 1,
          children: Va.jsx(v, {
            wrap: "wrap",
            dimColor: true,
            children: pVn[s].consentFooter
          })
        })]
      }), phase === "submitting" && Va.jsx($, {
        flexDirection: "row",
        gap: 1,
        children: Va.jsx(v, {
          children: pVn[s].submitting
        })
      }), phase === "done" && s === "bundle" && Va.jsxs($, {
        flexDirection: "column",
        children: [Va.jsxs(v, {
          color: "success",
          children: [Va.jsx(bs, {
            status: "success",
            withSpace: true
          }), "Feedback bundle saved"]
        }), zipPath && Va.jsxs($, {
          marginTop: 1,
          flexDirection: "column",
          children: [Va.jsxs(v, {
            children: ["Bundle: ", Va.jsx(v, {
              dimColor: true,
              children: zipPath
            })]
          }), Va.jsxs(v, {
            children: ["Reference ID: ", Va.jsx(v, {
              dimColor: true,
              children: feedbackId
            })]
          }), Va.jsx($, {
            marginTop: 1,
            children: Va.jsx(v, {
              wrap: "wrap",
              children: "Send this file to your Anthropic account representative or attach it to your support request."
            })
          })]
        }), Va.jsx($, {
          marginTop: 1,
          children: Va.jsx(v, {
            dimColor: true,
            children: "Press any key to close"
          })
        })]
      }), phase === "done" && s === "post" && (isAmberLynxEnabled ? Va.jsxs($, {
        flexDirection: "column",
        children: [titleSuggestion ? Va.jsx(Ba, {
          error: titleSuggestion
        }) : Va.jsxs(v, {
          color: "success",
          children: [Va.jsx(bs, {
            status: "success",
            withSpace: true
          }), "Feedback sent"]
        }), feedbackId && Va.jsxs(Va.Fragment, {
          children: [Va.jsx($, {
            marginTop: 1,
            children: Va.jsxs(v, {
              children: ["Reference ID: ", Va.jsx(v, {
                dimColor: true,
                children: feedbackId
              })]
            })
          }), Va.jsx($, {
            marginTop: 1,
            children: Va.jsx(v, {
              wrap: "wrap",
              children: "If you're working with Anthropic support, please include the ID above."
            })
          })]
        }), Va.jsx($, {
          marginTop: 1,
          children: Va.jsx(v, {
            dimColor: true,
            italic: true,
            children: "Any key to close"
          })
        })]
      }) : Va.jsxs($, {
        flexDirection: "column",
        children: [titleSuggestion ? Va.jsx(Ba, {
          error: titleSuggestion
        }) : Va.jsx(v, {
          color: "success",
          children: "Thank you for your report!"
        }), feedbackId && Va.jsxs(v, {
          dimColor: true,
          children: ["Feedback ID: ", feedbackId]
        }), Va.jsx($, {
          marginTop: 1,
          children: Va.jsx(v, {
            dimColor: true,
            italic: true,
            children: Va.jsxs(bn, {
              children: [Va.jsx(at, {
                chord: "enter",
                action: "open GitHub issue"
              }), Va.jsx(v, {
                children: "any key to close"
              })]
            })
          })
        })]
      })), null]
    })
  });
}
function Ujp(e, t, n, r) {
  let encodedTitle = kc(t),
    bodyPrefix = `**Bug Description**
${kc(n)}

**Environment Info**
- Platform: ${Ne.platform}
- Terminal: ${Ne.terminal}
- Version: ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION || "unknown"}
- Feedback ID: ${e}

**Errors**
\`\`\`json
`,
    codeBlockClose = "\n```\n",
    encodedErrors = Pe(r),
    baseUrl = `${odl}/new?title=${encodeURIComponent(encodedTitle)}&labels=user-reported,bug&body=`,
    truncationNote = `
**Note:** Content was truncated.
`,
    encodedPrefix = encodeURIComponent(bodyPrefix),
    encodedClose = encodeURIComponent("\n```\n"),
    encodedTruncation = encodeURIComponent(`
**Note:** Content was truncated.
`),
    encodedErrorsStr = encodeURIComponent(encodedErrors),
    remainingSpace = ndl - baseUrl.length - encodedPrefix.length - encodedClose.length - encodedTruncation.length;
  if (remainingSpace <= 0) {
    let ellipsis = encodeURIComponent("\u2026"),
      minPad = 50,
      available = ndl - baseUrl.length - ellipsis.length - encodedTruncation.length - 50,
      combined = bodyPrefix + encodedErrors + "\n```\n",
      encodedCombined = encodeURIComponent(combined);
    if (encodedCombined.length > available) {
      encodedCombined = encodedCombined.slice(0, available);
      let lastPct = encodedCombined.lastIndexOf("%");
      if (lastPct >= encodedCombined.length - 2) encodedCombined = encodedCombined.slice(0, lastPct);
    }
    return baseUrl + encodedCombined + ellipsis + encodedTruncation;
  }
  if (encodedErrorsStr.length <= remainingSpace) return baseUrl + encodedPrefix + encodedErrorsStr + encodedClose;
  let ellipsis = encodeURIComponent("\u2026"),
    minPad = 50,
    trimmedErrors = encodedErrorsStr.slice(0, remainingSpace - ellipsis.length - minPad),
    lastPct = trimmedErrors.lastIndexOf("%");
  if (lastPct >= trimmedErrors.length - 2) trimmedErrors = trimmedErrors.slice(0, lastPct);
  return baseUrl + encodedPrefix + trimmedErrors + ellipsis + encodedClose + encodedTruncation;
}
async function $jp(e, t) {
  try {
    let response = await vB({
        systemPrompt: vc(["Generate a concise, technical issue title (max 80 chars) for a public GitHub issue based on this bug report for Claude Code.", "Claude Code is an agentic coding CLI based on the Anthropic API.", "The title should:", "- Include the type of issue [Bug] or [Feature Request] as the first thing in the title", "- Be concise, specific and descriptive of the actual problem", "- Use technical terminology appropriate for a software issue", '- For error messages, extract the key error (e.g., "Missing Tool Result Block" rather than the full message)', "- Be direct and clear for developers to understand the problem", '- If you cannot determine a clear issue, use "Bug Report: [brief description]"', "- Any LLM API errors are from the Anthropic API, not from any other model provider", "Your response will be directly used as the title of the Github issue, and as such should not contain any other commentary or explaination", 'Examples of good titles include: "[Bug] Auto-Compact triggers to soon", "[Bug] Anthropic API Error: Missing Tool Result Block", "[Bug] Error: Invalid Model Name for Opus"']),
        userPrompt: e,
        signal: t,
        options: {
          hasAppendSystemPrompt: false,
          toolChoice: undefined,
          isNonInteractiveSession: false,
          agents: [],
          querySource: "feedback",
          mcpTools: [],
          agentContext: Hm()
        }
      }),
      generatedTitle = response.message.content[0]?.type === "text" ? response.message.content[0].text : "Bug Report";
    if (_1(generatedTitle)) return PCo(e);
    if (Wjp(generatedTitle)) return PCo(e);
    return generatedTitle;
  } catch (err) {
    if (R_(err)) A("Feedback title generation via Haiku aborted, using fallback", {
      level: "debug"
    });else Ie(err);
    return PCo(e);
  }
}
function Wjp(e) {
  let trimmed = e.trim();
  return trimmed === "" || qjp.test(trimmed);
}
function PCo(e) {
  let cleaned = Cd(e);
  if (cleaned.length <= 60 && cleaned.length > 5) return cleaned;
  let truncated = cleaned.slice(0, 60);
  if (cleaned.length > 60) {
    let lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 30) truncated = truncated.slice(0, lastSpace);
    truncated += "...";
  }
  return truncated.length < 10 ? "Bug Report" : truncated;
}
var iN,
  Va,
  ndl = 7250,
  odl = "https://github.com/anthropics/claude-code/issues",
  rdl,
  Bjp,
  pVn,
  qjp;
var idl = b(() => {
  ui();
  je();
  ss();
  jn();
  rb();
  kD();
  x8e();
  uo();
  Ph();
  Jg();
  qe();
  Ir();
  Ct();
  ia();
  vn();
  aA();
  tn();
  lr();
  uc();
  Ol();
  Is();
  di();
  I_();
  Wo();
  ff();
  tdl();
  rh();
  iN = x(et(), 1), Va = x(oe(), 1), rdl = {
    session: "this session only",
    day: "this session + this project\u2019s other sessions from the last 24 hours",
    week: "this session + this project\u2019s other sessions from the last 7 days"
  }, Bjp = [{
    label: "This session only",
    value: "session"
  }, {
    label: "This session + the last 24 hours",
    value: "day"
  }, {
    label: "This session + the last 7 days",
    value: "week"
  }], pVn = {
    post: {
      consentAction: "submit",
      consentIntro: "This report will include:",
      consentFooter: "We may use these to debug related issues and improve Claude Code.",
      submitting: "Submitting report\u2026"
    },
    bundle: {
      consentAction: "save",
      consentIntro: "An archive will be saved to disk containing:",
      consentFooter: "Nothing leaves this machine until you send the bundle file. Secrets (API keys, tokens, credentials) are redacted before writing.",
      submitting: "Saving bundle\u2026"
    },
    share: {
      consentAction: "share",
      consentIntro: "This shared conversation will include:",
      consentFooter: "A shareable link will be created so you can post the conversation for debugging and support.",
      submitting: "Uploading share\u2026"
    }
  };
  qjp = /^(i can['\u2019]t|i cannot|i['\u2019]m unable|i am unable|i['\u2019]m sorry|i am sorry|i apologize|sorry,)/i;
});

export {sdl,Ujp,$jp,Wjp,PCo,iN,Va,ndl,odl,rdl,Bjp,pVn,qjp,idl};
