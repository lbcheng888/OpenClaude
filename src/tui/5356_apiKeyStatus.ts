// @ts-nocheck
import {FE,V1} from "../../vendor/m4006.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {xke} from "../config/2739_repl.ts";
import {QZn,VNo} from "../../vendor/m5340.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {hce,kdt} from "../telemetry/4025_kdt.ts";
import {dzr,m1t} from "../../vendor/m2777.ts";
import {getSubscriptionType as vi,getConfiguredApiKeyHelper as mD,getApiKeyHelperElapsedMs as SBr,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {T6,TPe} from "../../vendor/m4631.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {tH,uS} from "../config/3192_path.ts";
import {z7l,j7l} from "../../vendor/m5349.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {J7l,X7l} from "../../vendor/m5350.ts";
import {B6e,_3n} from "../../vendor/m4035.ts";
import {pl,Wu} from "../../vendor/m438.ts";
import {getLastApiCompletionTimestamp as Lbe,lt} from "../session/0132_sent.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {useVoiceState as _I,The} from "../../vendor/m2467.ts";
import {lde,H7t} from "../telemetry/5340_user_intent_store.ts";
import {nt} from "../../vendor/m127.ts";
import {ter,YNo} from "../../vendor/m5345.ts";
import {G7l,V7l} from "../../vendor/m5348.ts";
import {Z7l,ezl} from "../../vendor/m5351.ts";
import {ner,XNo} from "../../vendor/m5346.ts";
import {izr,Gke} from "../mcp/2775_pendingChanges.ts";
import {b,x,oo} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {f1} from "../../vendor/m4432.ts";
import {dn} from "../config/0137_namespace.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {cer,tzl} from "../../vendor/m5352.ts";
import {czl,lzl} from "../telemetry/5355_ClosedIssueNotice.ts";
/**
 * API key / token status bar for the TUI input line.
 *
 * Renders the right-aligned status cluster shown next to the prompt:
 * auth state (invalid/missing), token usage, overage/credits notice,
 * apiKeyHelper slowness, auto-update spinner, voice indicator, and the
 * optional "· stashed" suffix. Also wires up transient notifications
 * (env-hook events, external-editor hint, token-warning).
 */
function fer(props) {
  let cache = dzl.c(40),
    {
      apiKeyStatus,
      isAutoUpdating,
      verbose,
      tokenUsage,
      onChangeIsUpdating,
      isInputWrapped,
      hasStash
    } = props,
    inputWrapped = isInputWrapped === void 0 ? !1 : isInputWrapped,
    stashed = hasStash === void 0 ? !1 : hasStash,
    model = FE(),
    autoCompactWindow = _t(nNm),
    compactStatus;
  if (cache[0] !== autoCompactWindow || cache[1] !== model || cache[2] !== tokenUsage) compactStatus = xke(tokenUsage, model, autoCompactWindow), cache[0] = autoCompactWindow, cache[1] = model, cache[2] = tokenUsage, cache[3] = compactStatus;else compactStatus = cache[3];
  let isShowingCompactMessage = compactStatus.level !== "ok",
    isBriefMode = QZn(),
    isBriefOnly = _t(tNm),
    hasNotifications = _t(eNm),
    {
      addNotification,
      removeNotification
    } = Ci(),
    usageState = hce(),
    envHookEffect,
    envHookDeps;
  if (cache[4] !== addNotification) envHookEffect = () => (dzr((text, isError) => {
    addNotification({
      key: "env-hook",
      kind: "event",
      text: text,
      color: isError ? "error" : void 0,
      priority: isError ? "medium" : "low",
      timeoutMs: isError ? 8000 : 5000
    });
  }), Z1m), envHookDeps = [addNotification], cache[4] = addNotification, cache[5] = envHookEffect, cache[6] = envHookDeps;else envHookEffect = cache[5], envHookDeps = cache[6];
  qOe.useEffect(envHookEffect, envHookDeps);
  let isUsingOverage = usageState.isUsingOverage,
    subscriptionType;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) subscriptionType = vi(), cache[7] = subscriptionType;else subscriptionType = cache[7];
  let sub = subscriptionType,
    isTeamOrEnterprise = sub === "team" || sub === "enterprise",
    externalEditor;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) externalEditor = T6(), cache[8] = externalEditor;else externalEditor = cache[8];
  let editor = externalEditor,
    shouldShowEditorHint = inputWrapped && !isShowingCompactMessage && apiKeyStatus !== "invalid" && apiKeyStatus !== "missing" && editor !== void 0,
    editorHintEffect,
    editorHintDeps;
  if (cache[9] !== addNotification || cache[10] !== removeNotification || cache[11] !== shouldShowEditorHint) editorHintEffect = () => {
    if (shouldShowEditorHint && editor) W("tengu_external_editor_hint_shown", {}), addNotification({
      key: "external-editor-hint",
      kind: "hint",
      jsx: Dg.jsx(v, {
        dimColor: !0,
        children: Dg.jsx(dr, {
          action: "chat:externalEditor",
          context: "Chat",
          fallback: "ctrl+g",
          description: `edit in ${tH(editor)}`
        })
      }),
      priority: "immediate",
      timeoutMs: 5000
    });else removeNotification("external-editor-hint");
  }, editorHintDeps = [shouldShowEditorHint, editor, addNotification, removeNotification], cache[9] = addNotification, cache[10] = removeNotification, cache[11] = shouldShowEditorHint, cache[12] = editorHintEffect, cache[13] = editorHintDeps;else editorHintEffect = cache[12], editorHintDeps = cache[13];
  qOe.useEffect(editorHintEffect, editorHintDeps);
  let tokenWarningEffect, tokenWarningDeps;
  if (cache[14] !== addNotification || cache[15] !== isBriefOnly || cache[16] !== isShowingCompactMessage || cache[17] !== model || cache[18] !== removeNotification || cache[19] !== isBriefMode || cache[20] !== tokenUsage) tokenWarningEffect = () => {
    if (isShowingCompactMessage && !isBriefMode && !isBriefOnly) addNotification({
      key: "token-warning",
      jsx: Dg.jsx(z7l, {
        tokenUsage: tokenUsage,
        model: model
      }),
      priority: "medium",
      timeoutMs: 18000000,
      fold: Q1m
    });else removeNotification("token-warning");
  }, tokenWarningDeps = [isShowingCompactMessage, isBriefMode, isBriefOnly, tokenUsage, model, addNotification, removeNotification], cache[14] = addNotification, cache[15] = isBriefOnly, cache[16] = isShowingCompactMessage, cache[17] = model, cache[18] = removeNotification, cache[19] = isBriefMode, cache[20] = tokenUsage, cache[21] = tokenWarningEffect, cache[22] = tokenWarningDeps;else tokenWarningEffect = cache[21], tokenWarningDeps = cache[22];
  qOe.useEffect(tokenWarningEffect, tokenWarningDeps);
  let hasContent = Boolean(hasNotifications || isUsingOverage && !isTeamOrEnterprise || apiKeyStatus === "invalid" || apiKeyStatus === "missing" || verbose || isAutoUpdating),
    isInOverageMode = isUsingOverage ?? !1,
    statusColumn;
  if (cache[23] !== apiKeyStatus || cache[24] !== isAutoUpdating || cache[25] !== isShowingCompactMessage || cache[26] !== onChangeIsUpdating || cache[27] !== isInOverageMode || cache[28] !== tokenUsage || cache[29] !== verbose) statusColumn = Dg.jsx($, {
    flexDirection: "column",
    alignItems: "flex-end",
    flexShrink: 1,
    overflowX: "hidden",
    children: Dg.jsx(rNm, {
      isInOverageMode: isInOverageMode,
      isTeamOrEnterprise: isTeamOrEnterprise,
      apiKeyStatus: apiKeyStatus,
      verbose: verbose,
      tokenUsage: tokenUsage,
      isAutoUpdating: isAutoUpdating,
      isShowingCompactMessage: isShowingCompactMessage,
      onChangeIsUpdating: onChangeIsUpdating
    })
  }), cache[23] = apiKeyStatus, cache[24] = isAutoUpdating, cache[25] = isShowingCompactMessage, cache[26] = onChangeIsUpdating, cache[27] = isInOverageMode, cache[28] = tokenUsage, cache[29] = verbose, cache[30] = statusColumn;else statusColumn = cache[30];
  let stashSuffix;
  if (cache[31] !== hasContent || cache[32] !== stashed) stashSuffix = stashed && Dg.jsxs($, {
    flexShrink: 0,
    children: [Dg.jsx(v, {
      dimColor: !0,
      children: hasContent ? " \xB7 " : " "
    }), Dg.jsxs(v, {
      dimColor: !0,
      children: [Xe.pointerSmall, " stashed"]
    })]
  }), cache[31] = hasContent, cache[32] = stashed, cache[33] = stashSuffix;else stashSuffix = cache[33];
  let withSeparator = hasContent || stashed,
    separator;
  if (cache[34] !== withSeparator) separator = Dg.jsx(J7l, {
    withSeparator: withSeparator
  }), cache[34] = withSeparator, cache[35] = separator;else separator = cache[35];
  let element;
  if (cache[36] !== statusColumn || cache[37] !== stashSuffix || cache[38] !== separator) element = Dg.jsx(B6e, {
    children: Dg.jsxs($, {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexShrink: 0,
      overflowX: "hidden",
      children: [statusColumn, stashSuffix, separator]
    })
  }), cache[36] = statusColumn, cache[37] = stashSuffix, cache[38] = separator, cache[39] = element;else element = cache[39];
  return element;
}
/** fold reducer for the token-warning notification: keep the latest value. */
function Q1m(prev, next) {
  return next;
}
/** Subscribe to env-hook events; returns the unsubscribe handle. */
function Z1m() {
  return dzr(null);
}
/** Selector: whether there is an active notification. */
function eNm(state) {
  return state.notifications.current !== null;
}
/** Selector: brief-only display mode flag. */
function tNm(state) {
  return state.isBriefOnly;
}
/** Selector: the current auto-compact window. */
function nNm(state) {
  return state.autoCompactWindow;
}
/**
 * Inner status content rendered inside the right-aligned column.
 * Handles voice indicator, overage credits notice, apiKeyHelper slowness,
 * auth errors, token count, uncached-context hint, and update spinner.
 */
function rNm({
  isInOverageMode,
  isTeamOrEnterprise,
  apiKeyStatus,
  verbose,
  tokenUsage,
  isAutoUpdating,
  isShowingCompactMessage,
  onChangeIsUpdating
}) {
  let [uncachedHint, setUncachedHint] = qOe.useState(null),
    isProUncachedEligible = !pl() && vi() === "pro";
  qOe.useEffect(() => {
    if (!isProUncachedEligible) {
      setUncachedHint(prev => prev === null ? prev : null);
      return;
    }
    let hint = uzl(tokenUsage, Lbe());
    setUncachedHint(prev => prev === hint ? prev : hint);
  }, [tokenUsage, isProUncachedEligible]), zc(() => {
    let hint = uzl(tokenUsage, Lbe());
    setUncachedHint(prev => prev === hint ? prev : hint);
  }, isProUncachedEligible ? 30000 : null);
  let [apiKeyHelperElapsed, setApiKeyHelperElapsed] = qOe.useState(null),
    hasApiKeyHelper = !pl() && Boolean(mD());
  zc(() => {
    let elapsedMs = SBr(),
      formatted = elapsedMs >= 1e4 ? Fi(elapsedMs) : null;
    setApiKeyHelperElapsed(prev => formatted === prev ? prev : formatted);
  }, hasApiKeyHelper ? 1000 : null);
  let voiceState = _I(state => state.voiceState),
    isVoiceEnabled = lde(),
    voiceError = _I(state => state.voiceError);
  if (isVoiceEnabled && (voiceState === "recording" || voiceState === "processing")) return Dg.jsx(J1m, {
    voiceState: voiceState
  });
  return Dg.jsxs(Dg.Fragment, {
    children: [isInOverageMode && !isTeamOrEnterprise && Dg.jsx($, {
      children: Dg.jsx(v, {
        dimColor: !0,
        wrap: "truncate",
        children: "Now using usage credits"
      })
    }), apiKeyHelperElapsed && Dg.jsxs($, {
      children: [Dg.jsxs(v, {
        color: "warning",
        wrap: "truncate",
        children: ["apiKeyHelper is taking a while", " "]
      }), Dg.jsxs(v, {
        dimColor: !0,
        wrap: "truncate",
        children: ["(", apiKeyHelperElapsed, ")"]
      })]
    }), (apiKeyStatus === "invalid" || apiKeyStatus === "missing") && Dg.jsx($, {
      children: Dg.jsx(v, {
        color: "error",
        wrap: "truncate",
        children: nt(process.env.CLAUDE_CODE_REMOTE) ? "Authentication error \xB7 Try again" : "Not logged in \xB7 Run /login"
      })
    }), apiKeyStatus !== "invalid" && apiKeyStatus !== "missing" && verbose && Dg.jsx($, {
      children: Dg.jsxs(v, {
        dimColor: !0,
        wrap: "truncate",
        children: [tokenUsage, " tokens"]
      })
    }), uncachedHint && Dg.jsx($, {
      children: Dg.jsx(v, {
        dimColor: !0,
        wrap: "truncate",
        children: uncachedHint
      })
    }), Dg.jsx(ter, {
      verbose: verbose,
      isUpdating: isAutoUpdating,
      onChangeIsUpdating: onChangeIsUpdating,
      showSuccessMessage: !isShowingCompactMessage
    }), Dg.jsx(X1m, {}), isVoiceEnabled && voiceError && Dg.jsx($, {
      children: Dg.jsx(v, {
        color: "error",
        wrap: "truncate",
        children: voiceError
      })
    }), Dg.jsx(G7l, {}), !pl() && Dg.jsx(Z7l, {}), Dg.jsx(ner, {})]
  });
}
/**
 * Build the "uncached context" hint string for pro users.
 * Returns null unless there is a recent completion, enough tokens, and the
 * last completion was long enough ago to consider the context stale.
 */
function uzl(tokenUsage, lastCompletionTs, now = Date.now()) {
  if (lastCompletionTs === null) return null;
  if (tokenUsage < oNm) return null;
  if (now - lastCompletionTs <= izr) return null;
  return `~${Math.round(tokenUsage / 1000)}k uncached \xB7 /clear to start fresh`;
}
var dzl,
  qOe,
  Dg,
  J1m,
  X1m,
  mer = 5000,
  oNm = 50000;
var her = b(() => {
  Zs();
  fd();
  kt();
  uo();
  lt();
  The();
  V1();
  H7t();
  je();
  Wu();
  Gke();
  kdt();
  f1();
  VNo();
  lo();
  TPe();
  dn();
  Xo();
  m1t();
  uS();
  YNo();
  uc();
  XNo();
  V7l();
  _3n();
  j7l();
  X7l();
  ezl();
  dzl = x(tt(), 1), qOe = x(et(), 1), Dg = x(oe(), 1), J1m = (cer(), oo(tzl)).VoiceIndicator, X1m = (czl(), oo(lzl)).ClosedIssueNotice;
});

export {fer,Q1m,Z1m,eNm,tNm,nNm,rNm,uzl,dzl,qOe,Dg,J1m,X1m,mer,oNm,her};
