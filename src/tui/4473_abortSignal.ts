// @ts-nocheck
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getIsGit,getGitState,Ba} from "../../vendor/m693.ts";
import {mol,Hqt,O_o,oje} from "../agent/4471_kind.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {Box} from "../../vendor/m2422.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Text} from "../../vendor/m2423.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {nl,v_} from "../../vendor/m2573.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {je} from "../../vendor/m577.ts";
import {Bs,rA} from "../../vendor/m2550.ts";
import {Kc,tv} from "../../vendor/m232.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {iU,rb} from "../permissions/5178_level.ts";
import {Wc} from "../api/3868_level.ts";
import {Af,S_} from "../agent/1454_agentType.ts";
import {sN,fP} from "../api/2741_actualTokens.ts";
import {h_,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../session/0615_length.ts";
import {zd,dr} from "../../vendor/m231.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {fol} from "../../vendor/m4471.ts";
import {Te} from "../../vendor/m2253.ts";
// Main feedback/bug report dialog component
function _ol({
  abortSignal: e,
  messages: t,
  initialDescription: n,
  onDone: r,
  backgroundTasks: o = {},
  mode: s = "post",
  readFileState: i,
  surveyFeedbackSource: a
}) {
  // phase: userInput -> scope -> consent -> submitting -> done
  let [phase, setPhase] = FN.useState("userInput"),
    [cursorOffset, setCursorOffset] = FN.useState(0),
    [description, setDescription] = FN.useState(n ?? ""),
    [feedbackId, setFeedbackId] = FN.useState(null),
    [zipPath, setZipPath] = FN.useState(null),
    [errorMsg, setErrorMsg] = FN.useState(null),
    [gitInfo, setGitInfo] = FN.useState({
      isGit: !1,
      gitState: null
    }),
    [titleSuggestion, setTitleSuggestion] = FN.useState(null),
    [sessionScope, setSessionScope] = FN.useState("session"),
    transcripts = mt(W => W.transcripts),
    terminalCols = mr().columns - 4,
    isAmberLynxEnabled = getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_lynx", !1);
  // Load git state on mount
  FN.useEffect(() => {
    async function loadGitState() {
      let isGit = await getIsGit(),
        gitState = null;
      if (isGit) gitState = await getGitState();
      setGitInfo({
        isGit,
        gitState
      });
    }
    loadGitState();
  }, []);
  let submitFeedback = FN.useCallback(async () => {
      if (setPhase("submitting"), setErrorMsg(null), setFeedbackId(null), s === "bundle") {
        let bundleResult = await mol({
          messages: t,
          description,
          surface: "cli",
          scope: sessionScope,
          backgroundTasks: o,
          transcripts,
          surveyFeedbackSource: a
        });
        if (bundleResult.success) setFeedbackId(bundleResult.bundleId), setZipPath(bundleResult.zipPath), setPhase("done");else setErrorMsg(`Couldn't save the feedback bundle to disk: ${bundleResult.error}`), setPhase("userInput");
        return;
      }
      let [submitResult, generatedTitle] = await Promise.all([Hqt({
        messages: t,
        description,
        surface: "cli",
        scope: sessionScope,
        backgroundTasks: o,
        transcripts,
        signal: e,
        surveyFeedbackSource: a
      }), isAmberLynxEnabled ? Promise.resolve(null) : ojp(description, e)]);
      if (setTitleSuggestion(generatedTitle), submitResult.success) setFeedbackId(submitResult.feedbackId), setPhase("done");else {
        if (submitResult.isZdrOrg) setErrorMsg("Feedback collection is not available for organizations with custom data retention policies.");else if (submitResult.failureReason === "auth_error") setErrorMsg("Couldn't send feedback: not signed in. Run /login, then retry.");else {
          let suffix = submitResult.statusCode ? ` (server returned ${submitResult.statusCode})` : submitResult.failureReason === "timeout" ? " (request timed out)" : submitResult.failureReason === "network_error" ? " (couldn't reach the service)" : "";
          setErrorMsg(`Couldn't send feedback${suffix}. If it keeps failing, you can file at ${gol} instead.`);
        }
        setPhase("userInput");
      }
    }, [description, t, isAmberLynxEnabled, o, transcripts, e, s, sessionScope]),
    handleCancel = FN.useCallback(() => {
      r("Feedback / bug report cancelled", {
        display: "system"
      });
    }, [r]),
    handleDoneClose = FN.useCallback(() => {
      setPhase("done");
    }, []),
    handleSetError = FN.useCallback(errorText => {
      setErrorMsg(errorText), setPhase("userInput");
    }, []);
  Or("confirm:no", handleCancel, {
    context: "Settings",
    isActive: phase === "userInput"
  });
  // Show done state or error-blocked state
  let isDoneOrBlocked = phase === "done" || errorMsg && phase !== "userInput";
  function handleKeyDown(keyEvent) {
    if (keyEvent.ctrl || keyEvent.meta) return;
    if (phase === "done") {
      if (keyEvent.preventDefault(), s === "share") return;
      if (!isAmberLynxEnabled && keyEvent.key === "return" && titleSuggestion) {
        let githubUrl = rjp(feedbackId ?? "", titleSuggestion, description, O_o());
        Oc(githubUrl);
      }
      if (errorMsg) r("Error submitting feedback / bug report", {
        display: "system"
      });else if (s === "bundle" && zipPath) r(`Feedback bundle saved to \`${zipPath}\``, {
        display: "system"
      });else r("Feedback / bug report submitted", {
        display: "system"
      });
      return;
    }
    if (errorMsg && phase !== "userInput") {
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
  return Io.createElement(Box, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown
  }, Io.createElement(Kn, {
    title: "Submit feedback / bug report",
    onCancel: handleCancel,
    isCancelActive: phase !== "userInput" && !isDoneOrBlocked && !(s === "share" && phase === "submitting"),
    hideInputGuide: phase === "submitting" || phase === "done",
    inputGuide: phase === "userInput" ? Io.createElement(Tn, null, Io.createElement(at, {
      chord: "enter",
      action: "continue"
    }), Io.createElement(lr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "cancel"
    })) : phase === "scope" ? Io.createElement(Tn, null, Io.createElement(at, {
      chord: "enter",
      action: "choose"
    }), Io.createElement(lr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "cancel"
    })) : phase === "consent" ? Io.createElement(Tn, null, Io.createElement(at, {
      chord: "enter",
      action: Vjn[s].consentAction
    }), Io.createElement(at, {
      chord: "left",
      action: "change"
    }), Io.createElement(lr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "cancel"
    })) : null
  }, phase === "userInput" && Io.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, Io.createElement(Text, null, "Describe the issue below:"), Io.createElement(Pa, {
    value: description,
    onChange: newVal => {
      if (setDescription(newVal), errorMsg) setErrorMsg(null);
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
    cursorOffset,
    onChangeCursorOffset: setCursorOffset,
    showCursor: !0
  }), errorMsg && Io.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, Io.createElement(nl, {
    error: errorMsg
  }), Io.createElement(Text, {
    dimColor: !0
  }, "Edit and press Enter to retry, or Esc to cancel"))), phase === "scope" && Io.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, Io.createElement(Text, null, "How much session history should we include?"), Io.createElement(pr, {
    options: njp,
    defaultFocusValue: sessionScope,
    onChange: chosen => {
      setSessionScope(chosen), setPhase("consent");
    },
    onCancel: handleCancel
  })), phase === "consent" && Io.createElement(Box, {
    flexDirection: "column"
  }, Io.createElement(Text, null, Vjn[s].consentIntro), Io.createElement(Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, Io.createElement(Text, null, "- Your feedback / bug description:", " ", Io.createElement(Text, {
    dimColor: !0
  }, description)), Io.createElement(Text, null, "- Environment info:", " ", Io.createElement(Text, {
    dimColor: !0
  }, je.platform, ", ", je.terminal, ", v", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION)), s !== "share" && gitInfo.gitState && Io.createElement(Text, null, "- Git repo metadata:", " ", Io.createElement(Text, {
    dimColor: !0
  }, gitInfo.gitState.branchName, gitInfo.gitState.commitHash ? `, ${gitInfo.gitState.commitHash.slice(0, 7)}` : "", gitInfo.gitState.remoteUrl ? ` @ ${gitInfo.gitState.remoteUrl}` : "", !gitInfo.gitState.isHeadOnRemote && ", not synced", !gitInfo.gitState.isClean && ", has local changes")), Io.createElement(Text, null, "- Session transcript:", " ", Io.createElement(Text, {
    dimColor: !0
  }, s === "share" ? hol.session : hol[sessionScope]))), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    wrap: "wrap",
    dimColor: !0
  }, Vjn[s].consentFooter))), phase === "submitting" && Io.createElement(Box, {
    flexDirection: "row",
    gap: 1
  }, Io.createElement(Text, null, Vjn[s].submitting)), phase === "done" && s === "bundle" && Io.createElement(Box, {
    flexDirection: "column"
  }, Io.createElement(Text, {
    color: "success"
  }, Io.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Feedback bundle saved"), zipPath && Io.createElement(Box, {
    marginTop: 1,
    flexDirection: "column"
  }, Io.createElement(Text, null, "Bundle: ", Io.createElement(Text, {
    dimColor: !0
  }, zipPath)), Io.createElement(Text, null, "Reference ID: ", Io.createElement(Text, {
    dimColor: !0
  }, feedbackId)), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    wrap: "wrap"
  }, "Send this file to your Anthropic account representative or attach it to your support request."))), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    dimColor: !0
  }, "Press any key to close"))), phase === "done" && s === "post" && (isAmberLynxEnabled ? Io.createElement(Box, {
    flexDirection: "column"
  }, errorMsg ? Io.createElement(nl, {
    error: errorMsg
  }) : Io.createElement(Text, {
    color: "success"
  }, Io.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Feedback sent"), feedbackId && Io.createElement(Io.Fragment, null, Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, null, "Reference ID: ", Io.createElement(Text, {
    dimColor: !0
  }, feedbackId))), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    wrap: "wrap"
  }, "If you're working with Anthropic support, please include the ID above."))), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, "Any key to close"))) : Io.createElement(Box, {
    flexDirection: "column"
  }, errorMsg ? Io.createElement(nl, {
    error: errorMsg
  }) : Io.createElement(Text, {
    color: "success"
  }, "Thank you for your report!"), feedbackId && Io.createElement(Text, {
    dimColor: !0
  }, "Feedback ID: ", feedbackId), Io.createElement(Box, {
    marginTop: 1
  }, Io.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, Io.createElement(Tn, null, Io.createElement(at, {
    chord: "enter",
    action: "open GitHub issue"
  }), Io.createElement(Text, null, "any key to close")))))), null));
}
// Build a GitHub new-issue URL with pre-filled body (truncated to stay under URL length limit)
function rjp(feedbackId, titleSuggestion, description, errorSnapshot) {
  let encodedTitle = Kc(titleSuggestion),
    bodyPrefix = `**Bug Description**
${Kc(description)}

**Environment Info**
- Platform: ${je.platform}
- Terminal: ${je.terminal}
- Version: ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION || "unknown"}
- Feedback ID: ${feedbackId}

**Errors**
\`\`\`json
`,
    codeBlockClose = "\n```\n",
    encodedErrors = Le(errorSnapshot),
    baseUrl = `${gol}/new?title=${encodeURIComponent(encodedTitle)}&labels=user-reported,bug&body=`,
    truncationNote = `
**Note:** Content was truncated.
`,
    encodedPrefix = encodeURIComponent(bodyPrefix),
    encodedClose = encodeURIComponent("\n```\n"),
    encodedTruncation = encodeURIComponent(`
**Note:** Content was truncated.
`),
    encodedErrorsStr = encodeURIComponent(encodedErrors),
    remainingSpace = Aol - baseUrl.length - encodedPrefix.length - encodedClose.length - encodedTruncation.length;
  if (remainingSpace <= 0) {
    let ellipsis = encodeURIComponent("\u2026"),
      minPad = 50,
      available = Aol - baseUrl.length - ellipsis.length - encodedTruncation.length - 50,
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
// Use a fast LLM to generate a concise GitHub issue title from the bug description
async function ojp(bugDescription, abortSignal) {
  try {
    let response = await iU({
        systemPrompt: Wc(["Generate a concise, technical issue title (max 80 chars) for a public GitHub issue based on this bug report for Claude Code.", "Claude Code is an agentic coding CLI based on the Anthropic API.", "The title should:", "- Include the type of issue [Bug] or [Feature Request] as the first thing in the title", "- Be concise, specific and descriptive of the actual problem", "- Use technical terminology appropriate for a software issue", '- For error messages, extract the key error (e.g., "Missing Tool Result Block" rather than the full message)', "- Be direct and clear for developers to understand the problem", '- If you cannot determine a clear issue, use "Bug Report: [brief description]"', "- Any LLM API errors are from the Anthropic API, not from any other model provider", "Your response will be directly used as the title of the Github issue, and as such should not contain any other commentary or explaination", 'Examples of good titles include: "[Bug] Auto-Compact triggers to soon", "[Bug] Anthropic API Error: Missing Tool Result Block", "[Bug] Error: Invalid Model Name for Opus"']),
        userPrompt: bugDescription,
        signal: abortSignal,
        options: {
          hasAppendSystemPrompt: !1,
          toolChoice: void 0,
          isNonInteractiveSession: !1,
          agents: [],
          querySource: "feedback",
          mcpTools: [],
          agentContext: Af()
        }
      }),
      generatedTitle = response.message.content[0]?.type === "text" ? response.message.content[0].text : "Bug Report";
    if (sN(generatedTitle)) return B_o(bugDescription);
    if (ijp(generatedTitle)) return B_o(bugDescription);
    return generatedTitle;
  } catch (err) {
    if (h_(err)) logForDebugging("Feedback title generation via Haiku aborted, using fallback", {
      level: "debug"
    });else De(err);
    return B_o(bugDescription);
  }
}
// Check if the generated title is a refusal or empty string
function ijp(title) {
  let trimmed = title.trim();
  return trimmed === "" || sjp.test(trimmed);
}
// Fallback: derive a short title from the raw bug description text
function B_o(bugDescription) {
  let cleaned = zd(bugDescription);
  if (cleaned.length <= 60 && cleaned.length > 5) return cleaned;
  let truncated = cleaned.slice(0, 60);
  if (cleaned.length > 60) {
    let lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 30) truncated = truncated.slice(0, lastSpace);
    truncated += "...";
  }
  return truncated.length < 10 ? "Bug Report" : truncated;
}
var Io,
  FN,
  Aol = 7250,
  gol = "https://github.com/anthropics/claude-code/issues",
  hol,
  njp,
  Vjn,
  sjp;
var yol = b(() => {
  ki();
  ze();
  Ts();
  zn();
  rb();
  fP();
  oje();
  configProtoStore();
  S_();
  b_();
  qe();
  Lr();
  bt();
  Ba();
  Rn();
  tv();
  Xt();
  dr();
  readRoster();
  Yl();
  zs();
  Li();
  v_();
  rs();
  rA();
  fol();
  rh();
  Io = M(Te(), 1), FN = M(Te(), 1), hol = {
    session: "this session only",
    day: "this session + this project\u2019s other sessions from the last 24 hours",
    week: "this session + this project\u2019s other sessions from the last 7 days"
  }, njp = [{
    label: "This session only",
    value: "session"
  }, {
    label: "This session + the last 24 hours",
    value: "day"
  }, {
    label: "This session + the last 7 days",
    value: "week"
  }], Vjn = {
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
  sjp = /^(i can['\u2019]t|i cannot|i['\u2019]m unable|i am unable|i['\u2019]m sorry|i am sorry|i apologize|sorry,)/i;
});
export {_ol,rjp,ojp,ijp,B_o,Io,FN,Aol,gol,hol,njp,Vjn,sjp,yol};
