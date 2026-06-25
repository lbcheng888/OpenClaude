// @ts-nocheck
import {ws} from "../config/2709_Zm.ts";
import {bo,uo} from "../../vendor/m2468.ts";
import {Itr,xtr,GBo} from "./5485_char.ts";
import {ZZl,eec} from "../../vendor/m5494.ts";
import {j5e,Imt} from "../../vendor/m4337.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {hha,AOn} from "../../vendor/m3322.ts";
import {JZl,XZl} from "../../vendor/m5493.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {gU,MSe} from "../../vendor/m5444.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Restored Claude Code 2.1.190 module.
 * Builds the permission-behavior result object for a tool-use request, and the
 * PowerShell-command permission prompt component (feedback modes, prefix editing,
 * destructive-command warnings, accept/reject analytics).
 */

/**
 * Map a user answer ("yes" / "yes-apply-suggestions" / "yes-prefix-edited" / "no")
 * to the corresponding permission-behavior result for the given request.
 * @param answer the selected option value
 * @param request the permission request payload (tool name, input, permissionResult)
 * @param extras optional feedback / editablePrefix carried with the answer
 */
function buildBehaviorResult(answer: any, request: any, extras: any = {}): any {
  switch (answer) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: request.input,
        ...(extras.feedback && {
          feedback: extras.feedback
        })
      };
    case "yes-apply-suggestions":
      {
        let suggestions = "suggestions" in request.permissionResult ? request.permissionResult.suggestions ?? [] : [];
        return {
          behavior: "allow",
          updatedInput: request.input,
          permissionUpdates: suggestions
        };
      }
    case "yes-prefix-edited":
      {
        let trimmedPrefix = (extras.editablePrefix ?? "").trim();
        if (!trimmedPrefix) return {
          behavior: "allow",
          updatedInput: request.input
        };
        return {
          behavior: "allow",
          updatedInput: request.input,
          permissionUpdates: [{
            type: "addRules",
            rules: [{
              toolName: ws,
              ruleContent: trimmedPrefix
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        };
      }
    case "no":
      return {
        behavior: "deny",
        ...(extras.feedback && {
          feedback: extras.feedback
        })
      };
  }
}

/**
 * PowerShell-command permission prompt component.
 * Renders the rendered tool-use message, optional description, a destructive-command
 * warning, and the accept/reject option list with feedback and prefix-edit modes.
 */
function PowerShellPermissionPrompt({
  payload: request,
  answer: onAnswer
}: any): any {
  let updateRequestState = bo(),
    command = request.command,
    explanation = Itr({
      toolName: request.toolName,
      toolInput: request.input,
      toolDescription: request.description
    }),
    [acceptFeedback, setAcceptFeedback] = Jw.useState(""),
    [rejectFeedback, setRejectFeedback] = Jw.useState(""),
    [yesInputMode, setYesInputMode] = Jw.useState(!1),
    [noInputMode, setNoInputMode] = Jw.useState(!1),
    [focusedOption, setFocusedOption] = Jw.useState("yes"),
    [enteredAcceptFeedbackMode, setEnteredAcceptFeedbackMode] = Jw.useState(!1),
    [enteredRejectFeedbackMode, setEnteredRejectFeedbackMode] = Jw.useState(!1),
    [editablePrefix, setEditablePrefix] = Jw.useState(command.includes(`
`) ? void 0 : command),
    prefixEdited = Jw.useRef(!1);
  Jw.useEffect(() => {
    let cancelled = !1;
    return ZZl(command, line => j5e(line, line.text)).then(prefixes => {
      if (cancelled || prefixEdited.current) return;
      if (prefixes.length > 0) setEditablePrefix(`${prefixes[0]} *`);
    }).catch(() => {}), () => {
      cancelled = !0;
    };
  }, [command]);
  let onEditablePrefixChange = Jw.useCallback(nextPrefix => {
      prefixEdited.current = !0, setEditablePrefix(nextPrefix);
    }, []),
    destructiveWarning = Jw.useMemo(() => {
      if (!it("tengu_destructive_command_warning", !1)) return null;
      return hha(command);
    }, [command]),
    suggestions = request.permissionResult.suggestions,
    options = Jw.useMemo(() => JZl({
      suggestions,
      onRejectFeedbackChange: setRejectFeedback,
      onAcceptFeedbackChange: setAcceptFeedback,
      yesInputMode,
      noInputMode,
      editablePrefix,
      onEditablePrefixChange
    }), [suggestions, yesInputMode, noInputMode, editablePrefix, onEditablePrefixChange]),
    userFacingToolName = Jw.useMemo(() => Pi(request.toolName), [request.toolName]),
    onSelect = Jw.useCallback(selectedAnswer => {
      if (W("tengu_permission_request_option_selected", {
        option_index: {
          yes: 1,
          "yes-apply-suggestions": 2,
          "yes-prefix-edited": 2,
          no: 3
        }[selectedAnswer]
      }), selectedAnswer === "yes") {
        let instructions = acceptFeedback.trim();
        W("tengu_accept_submitted", {
          toolName: userFacingToolName,
          isMcp: request.isMcp,
          has_instructions: !!instructions,
          instructions_length: instructions.length,
          entered_feedback_mode: enteredAcceptFeedbackMode
        }), onAnswer(buildBehaviorResult("yes", request, {
          feedback: instructions || void 0
        }));
        return;
      }
      if (selectedAnswer === "no") {
        let instructions = rejectFeedback.trim();
        W("tengu_reject_submitted", {
          toolName: userFacingToolName,
          isMcp: request.isMcp,
          has_instructions: !!instructions,
          instructions_length: instructions.length,
          entered_feedback_mode: enteredRejectFeedbackMode
        }), onAnswer(buildBehaviorResult("no", request, {
          feedback: instructions || void 0
        }));
        return;
      }
      if (selectedAnswer === "yes-prefix-edited") {
        onAnswer(buildBehaviorResult("yes-prefix-edited", request, {
          editablePrefix
        }));
        return;
      }
      onAnswer(buildBehaviorResult(selectedAnswer, request));
    }, [onAnswer, request, acceptFeedback, rejectFeedback, editablePrefix, userFacingToolName, enteredAcceptFeedbackMode, enteredRejectFeedbackMode]),
    onCancel = Jw.useCallback(() => {
      W("tengu_permission_request_escape", {}), updateRequestState(prev => ({
        ...prev,
        attribution: {
          ...prev.attribution,
          escapeCount: prev.attribution.escapeCount + 1
        }
      })), onAnswer({
        behavior: "deny"
      });
    }, [onAnswer, updateRequestState]),
    onInputModeToggle = Jw.useCallback(toggledOption => {
      let analyticsContext = {
        toolName: userFacingToolName,
        isMcp: request.isMcp
      };
      if (toggledOption === "yes") {
        if (yesInputMode) setYesInputMode(!1), W("tengu_accept_feedback_mode_collapsed", analyticsContext);else setYesInputMode(!0), setEnteredAcceptFeedbackMode(!0), W("tengu_accept_feedback_mode_entered", analyticsContext);
      } else if (toggledOption === "no") if (noInputMode) setNoInputMode(!1), W("tengu_reject_feedback_mode_collapsed", analyticsContext);else setNoInputMode(!0), setEnteredRejectFeedbackMode(!0), W("tengu_reject_feedback_mode_entered", analyticsContext);
    }, [yesInputMode, noInputMode, request.isMcp, userFacingToolName]),
    onFocus = Jw.useCallback(focused => {
      if (focused !== "yes" && yesInputMode && !acceptFeedback.trim()) setYesInputMode(!1);
      if (focused !== "no" && noInputMode && !rejectFeedback.trim()) setNoInputMode(!1);
      setFocusedOption(focused);
    }, [yesInputMode, noInputMode, acceptFeedback, rejectFeedback]);
  return SP.jsxs(hm, {
    title: "PowerShell command",
    requestSource: request.requestSource,
    children: [SP.jsxs($, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      children: [SP.jsx(v, {
        dimColor: explanation.visible,
        children: request.renderedToolUseMessage
      }), !explanation.visible && SP.jsx(v, {
        dimColor: !0,
        children: request.description
      }), SP.jsx(xtr, {
        visible: explanation.visible,
        promise: explanation.promise
      })]
    }), SP.jsxs($, {
      flexDirection: "column",
      children: [SP.jsx(gU, {
        permissionResult: request.permissionResult,
        toolType: "command"
      }), destructiveWarning && SP.jsx($, {
        marginBottom: 1,
        children: SP.jsx(v, {
          color: "warning",
          children: destructiveWarning
        })
      }), SP.jsx(v, {
        children: "Do you want to proceed?"
      }), SP.jsx(hr, {
        options,
        inlineDescriptions: !0,
        onChange: onSelect,
        onCancel,
        onFocus,
        onInputModeToggle
      })]
    }), SP.jsx($, {
      justifyContent: "space-between",
      marginTop: 1,
      children: SP.jsx(v, {
        dimColor: !0,
        children: SP.jsxs(bn, {
          children: [SP.jsx(at, {
            chord: "escape",
            action: "cancel"
          }), (focusedOption === "yes" && !yesInputMode || focusedOption === "no" && !noInputMode) && SP.jsx(at, {
            chord: "tab",
            action: "amend"
          }), explanation.enabled && SP.jsx(at, {
            chord: explanation.chord,
            action: explanation.visible ? "hide" : "explain"
          })]
        })
      })
    })]
  });
}
var Jw, SP;
var nec = b(() => {
  Ol();
  Is();
  Wo();
  DI();
  GBo();
  MSe();
  XZl();
  je();
  jn();
  kt();
  vu();
  uo();
  AOn();
  Imt();
  eec();
  Jw = x(et(), 1), SP = x(oe(), 1);
});

export {buildBehaviorResult as Dtr,PowerShellPermissionPrompt as tec,Jw,SP,nec};
