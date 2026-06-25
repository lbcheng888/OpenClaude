// @ts-nocheck
import {X$t,R2n} from "../../vendor/m3848.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {x2e,TOt} from "../../vendor/m2547.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Mo,Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {bo,uo} from "../../vendor/m2468.ts";
import {Itr,xtr,GBo} from "./5485_char.ts";
import {Jke,E8i} from "../../vendor/m2788.ts";
import {C1t,Sw} from "../../vendor/m2789.ts";
import {U8n,kol,jO} from "../tools/4385_stripAllEnvVars.ts";
import {bma,_eo} from "../../vendor/m3286.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {mha,COn} from "../../vendor/m3321.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {buildDefaultSystemPromptSections as mL,A5e} from "../../vendor/m5213.ts";
import {ktr,Htr} from "../../vendor/m5481.ts";
import {bZl,EZl} from "../../vendor/m5482.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {gU,MSe} from "../../vendor/m5444.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function S9m() {
  let cache = kZl.c(6),
    [glimmerIndex, glimmerIndex_2] = X$t("requesting", wZl, false),
    chars;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) chars = [...wZl], cache[0] = chars;else chars = cache[0];
  let shimmerRow;
  if (cache[1] !== glimmerIndex_2) shimmerRow = Sv.jsx(v, {
    children: chars.map((char, index) => Sv.jsx(x2e, {
      char: char,
      index: index,
      glimmerIndex: glimmerIndex_2,
      messageColor: "inactive",
      shimmerColor: "subtle"
    }, index))
  }), cache[1] = glimmerIndex_2, cache[2] = shimmerRow;else shimmerRow = cache[2];
  let rendered;
  if (cache[3] !== glimmerIndex || cache[4] !== shimmerRow) rendered = Sv.jsx($, {
    ref: glimmerIndex,
    children: shimmerRow
  }), cache[3] = glimmerIndex, cache[4] = shimmerRow, cache[5] = rendered;else rendered = cache[5];
  return rendered;
}
function dzt(choice, request, options = {}) {
  switch (choice) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: request.input,
        ...(options.feedback && {
          feedback: options.feedback
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
        let prefix = (options.editablePrefix ?? "").trim();
        if (!prefix) return {
          behavior: "allow",
          updatedInput: request.input
        };
        return {
          behavior: "allow",
          updatedInput: request.input,
          permissionUpdates: [{
            type: "addRules",
            rules: [{
              toolName: Mo,
              ruleContent: prefix
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        };
      }
    case "no":
      return {
        behavior: "deny",
        ...(options.feedback && {
          feedback: options.feedback
        })
      };
  }
  return {
    behavior: "allow",
    updatedInput: request.input
  };
}
function HZl({
  payload: request,
  answer: respond
}) {
  let updateState = bo(),
    command = request.command,
    decisionReason = request.permissionResult.decisionReason,
    suggestions = request.permissionResult.suggestions ?? [],
    toolUsePreview = Itr({
      toolName: request.toolName,
      toolInput: request.input,
      toolDescription: request.description
    }),
    [acceptFeedback, setAcceptFeedback] = YE.useState(""),
    [rejectFeedback, setRejectFeedback] = YE.useState(""),
    [yesInputMode, setYesInputMode] = YE.useState(false),
    [noInputMode, setNoInputMode] = YE.useState(false),
    [focusedOption, setFocusedOption] = YE.useState("yes"),
    [acceptFeedbackEntered, setAcceptFeedbackEntered] = YE.useState(false),
    [rejectFeedbackEntered, setRejectFeedbackEntered] = YE.useState(false),
    initialDescription = typeof request.input.description === "string" ? request.input.description : "",
    [classifierDescription, setClassifierDescription] = YE.useState(initialDescription),
    [classifierDescriptionEmpty, setClassifierDescriptionEmpty] = YE.useState(!initialDescription.trim());
  YE.useEffect(() => {
    if (!Jke()) return;
    let abortController = new AbortController();
    return E8i(command, initialDescription, abortController.signal).then(generated => {
      if (generated && !abortController.signal.aborted) setClassifierDescription(generated), setClassifierDescriptionEmpty(false);
    }).catch(() => {}), () => abortController.abort();
  }, [command, initialDescription]);
  let isSubcommandResults = decisionReason?.type === "subcommandResults",
    [editablePrefix, setEditablePrefix] = YE.useState(() => {
      if (isSubcommandResults) {
        let matchingRules = C1t(suggestions).filter(rule => rule.toolName === Mo && rule.ruleContent);
        return matchingRules.length === 1 ? matchingRules[0].ruleContent : undefined;
      }
      let prefixA = U8n(command);
      if (prefixA) return `${prefixA} *`;
      let prefixB = kol(command);
      if (prefixB) return `${prefixB} *`;
      return command;
    }),
    prefixEditedByUser = YE.useRef(false),
    onEditablePrefixChange = YE.useCallback(next => {
      prefixEditedByUser.current = true, setEditablePrefix(next);
    }, []);
  YE.useEffect(() => {
    if (isSubcommandResults) return;
    let cancelled = false;
    return bma(command, () => false).then(prefixes => {
      if (cancelled || prefixEditedByUser.current) return;
      if (prefixes.length > 0) setEditablePrefix(`${prefixes[0]} *`);
    }).catch(() => {}), () => {
      cancelled = true;
    };
  }, [command, isSubcommandResults]);
  let {
      destructiveWarning: destructiveWarning,
      sandboxingEnabled: sandboxingEnabled,
      isSandboxed: isSandboxed
    } = YE.useMemo(() => {
      let warning = it("tengu_destructive_command_warning", false) ? mha(command) : null,
        sandboxOn = xo.isSandboxingEnabled(),
        sandboxed = sandboxOn && mL(request.input);
      return {
        destructiveWarning: warning,
        sandboxingEnabled: sandboxOn,
        isSandboxed: sandboxed
      };
    }, [command, request.input]),
    {
      offered: showEnableAutoModeOption,
      enableAutoMode: enableAutoMode
    } = ktr(request.requestSource),
    options = YE.useMemo(() => bZl({
      suggestions: suggestions,
      decisionReason: decisionReason,
      onRejectFeedbackChange: setRejectFeedback,
      onAcceptFeedbackChange: setAcceptFeedback,
      onClassifierDescriptionChange: setClassifierDescription,
      classifierDescription: classifierDescription,
      initialClassifierDescriptionEmpty: classifierDescriptionEmpty,
      existingAllowDescriptions: [...request.existingAllowDescriptions],
      yesInputMode: yesInputMode,
      noInputMode: noInputMode,
      editablePrefix: editablePrefix,
      onEditablePrefixChange: onEditablePrefixChange,
      showEnableAutoModeOption: showEnableAutoModeOption
    }), [suggestions, decisionReason, classifierDescription, classifierDescriptionEmpty, request.existingAllowDescriptions, yesInputMode, noInputMode, editablePrefix, onEditablePrefixChange, showEnableAutoModeOption]),
    analyticsToolName = YE.useMemo(() => Pi(request.toolName), [request.toolName]),
    onChange = YE.useCallback(value => {
      if (W("tengu_permission_request_option_selected", {
        option_index: options.findIndex(opt => opt.value === value) + 1
      }), value === "yes") {
        let trimmed = acceptFeedback.trim();
        W("tengu_accept_submitted", {
          toolName: analyticsToolName,
          isMcp: request.isMcp,
          has_instructions: !!trimmed,
          instructions_length: trimmed.length,
          entered_feedback_mode: acceptFeedbackEntered
        }), respond(dzt("yes", request, {
          feedback: trimmed || undefined
        }));
        return;
      }
      if (value === "no") {
        let trimmed = rejectFeedback.trim();
        W("tengu_reject_submitted", {
          toolName: analyticsToolName,
          isMcp: request.isMcp,
          has_instructions: !!trimmed,
          instructions_length: trimmed.length,
          entered_feedback_mode: rejectFeedbackEntered
        }), respond(dzt("no", request, {
          feedback: trimmed || undefined
        }));
        return;
      }
      if (value === "yes-prefix-edited") {
        respond(dzt("yes-prefix-edited", request, {
          editablePrefix: editablePrefix
        }));
        return;
      }
      if (value === "yes-enable-auto-mode") {
        enableAutoMode(), respond(dzt("yes", request));
        return;
      }
      respond(dzt(value, request));
    }, [respond, request, acceptFeedback, rejectFeedback, editablePrefix, classifierDescription, analyticsToolName, acceptFeedbackEntered, rejectFeedbackEntered, enableAutoMode, options]),
    onCancel = YE.useCallback(() => {
      W("tengu_permission_request_escape", {}), updateState(prev => ({
        ...prev,
        attribution: {
          ...prev.attribution,
          escapeCount: prev.attribution.escapeCount + 1
        }
      })), respond({
        behavior: "deny"
      });
    }, [respond, updateState]),
    onInputModeToggle = YE.useCallback(value => {
      let analyticsProps = {
        toolName: analyticsToolName,
        isMcp: request.isMcp
      };
      if (value === "yes") {
        if (yesInputMode) setYesInputMode(false), W("tengu_accept_feedback_mode_collapsed", analyticsProps);else setYesInputMode(true), setAcceptFeedbackEntered(true), W("tengu_accept_feedback_mode_entered", analyticsProps);
      } else if (value === "no") if (noInputMode) setNoInputMode(false), W("tengu_reject_feedback_mode_collapsed", analyticsProps);else setNoInputMode(true), setRejectFeedbackEntered(true), W("tengu_reject_feedback_mode_entered", analyticsProps);
    }, [yesInputMode, noInputMode, request.isMcp, analyticsToolName]),
    onFocus = YE.useCallback(value => {
      if (value !== "yes" && yesInputMode && !acceptFeedback.trim()) setYesInputMode(false);
      if (value !== "no" && noInputMode && !rejectFeedback.trim()) setNoInputMode(false);
      setFocusedOption(value);
    }, [yesInputMode, noInputMode, acceptFeedback, rejectFeedback]),
    subtitle = YE.useMemo(() => {
      return;
      switch (request.classifierState) {
        case "pending":
          return Sv.jsx(S9m, {});
        case "no-match":
        case "error":
          return Sv.jsx(v, {
            dimColor: true,
            children: "Requires manual approval"
          });
        case "none":
          return;
      }
    }, [request.classifierState]);
  return Sv.jsxs(hm, {
    title: sandboxingEnabled && !isSandboxed ? "Bash command (unsandboxed)" : "Bash command",
    subtitle: subtitle,
    requestSource: request.requestSource,
    children: [Sv.jsxs($, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      children: [Sv.jsx(v, {
        dimColor: toolUsePreview.visible,
        children: request.renderedToolUseMessage
      }), !toolUsePreview.visible && Sv.jsx(v, {
        dimColor: true,
        children: request.description
      }), Sv.jsx(xtr, {
        visible: toolUsePreview.visible,
        promise: toolUsePreview.promise
      })]
    }), Sv.jsxs($, {
      flexDirection: "column",
      children: [Sv.jsx(gU, {
        permissionResult: request.permissionResult,
        toolType: "command"
      }), destructiveWarning && Sv.jsx($, {
        marginBottom: 1,
        children: Sv.jsx(v, {
          color: "warning",
          children: destructiveWarning
        })
      }), Sv.jsx(v, {
        children: "Do you want to proceed?"
      }), Sv.jsx(hr, {
        options: options,
        inlineDescriptions: true,
        onChange: onChange,
        onCancel: onCancel,
        onFocus: onFocus,
        onInputModeToggle: onInputModeToggle
      })]
    }), Sv.jsx($, {
      justifyContent: "space-between",
      marginTop: 1,
      children: Sv.jsx(v, {
        dimColor: true,
        children: Sv.jsxs(bn, {
          children: [Sv.jsx(at, {
            chord: "escape",
            action: "cancel"
          }), (focusedOption === "yes" && !yesInputMode || focusedOption === "no" && !noInputMode) && Sv.jsx(at, {
            chord: "tab",
            action: "amend"
          }), toolUsePreview.enabled && Sv.jsx(at, {
            chord: toolUsePreview.chord,
            action: toolUsePreview.visible ? "hide" : "explain"
          })]
        })
      })
    })]
  });
}
var kZl,
  YE,
  Sv,
  wZl = "Attempting to auto-approve\u2026";
var IZl = b(() => {
  Ol();
  Is();
  Wo();
  EZl();
  DI();
  GBo();
  MSe();
  Htr();
  TOt();
  R2n();
  je();
  jn();
  kt();
  vu();
  uo();
  jO();
  COn();
  A5e();
  _eo();
  Sw();
  Uh();
  kZl = x(tt(), 1), YE = x(et(), 1), Sv = x(oe(), 1);
});

export {S9m,dzt,HZl,kZl,YE,Sv,wZl,IZl};
