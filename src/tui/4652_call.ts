// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {XW,J4e} from "../telemetry/3768_codeChallenge.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Gqt,_5n,G_o,h5n,Wqt,y5n} from "../config/4301_level.ts";
import {getOauthConfig as Hs,DESIGN_OAUTH_SCOPES as Ppe,Sc} from "../api/0465_getOauthConfig.ts";
import {revokeOAuthToken as vM,aI} from "../config/1293_storeOAuthAccountInfo.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Design-system OAuth login TUI module (Claude Code v2.1.190).
 *
 * Renders an interactive flow that authorizes design-system access
 * (read/write of the organization's claude.ai/design projects) using the
 * user's claude.ai account, separate from the session's own auth.
 *
 * NOTE: The v185 PORT-FROM file for slot 5058 was a different module
 * (remote-control / bridge), so names here were restored from this module's
 * own logic rather than ported.
 */
var rTl = {};
ft(rTl, {
  call: () => call,
  DesignLogin: () => DesignLogin
});

/**
 * Top-level component driving the Design OAuth login flow.
 * @param props.onDone callback invoked with a final status message when the
 *   flow completes, is cancelled, or is authorized.
 */
function DesignLogin({
  onDone: onDone
}) {
  // OAuth flow state machine (starting / waiting_for_login / processing /
  // success / error / about_to_retry).
  let [oauthState, setOauthState] = RL.useState({
      state: "starting"
    }),
    // OAuth flow controller instance.
    [oauthFlow] = RL.useState(() => new XW()),
    // Buffered single-key paste-trigger input (e.g. "c" to copy).
    [pasteTrigger, setPasteTrigger] = RL.useState(""),
    // Cursor offset within the manual-code text input.
    [cursorOffset, setCursorOffset] = RL.useState(0),
    // Whether the paste/url prompt should be shown (after a short delay).
    [showPastePrompt, setShowPastePrompt] = RL.useState(!1),
    // Whether the "(Copied!)" indicator is currently shown.
    [showCopied, setShowCopied] = RL.useState(!1),
    // Timer/cleanup scheduler abstraction.
    scheduler = As(),
    // Set of pending cleanup callbacks for scheduled timers.
    pendingCleanups = RL.useRef(new Set()),
    // Timer handle for clearing the "(Copied!)" indicator.
    copiedResetTimer = RL.useRef(void 0),
    // Flag set when the user cancelled mid-flow, so async results are dropped.
    cancelledRef = RL.useRef(!1),
    // Terminal dimensions.
    terminalSize = _r(),
    // Available columns for the manual-code text input.
    textInputColumns = Math.max(50, terminalSize.columns - tTl.length - 4);

  /**
   * Key handler for the outer container.
   * @param keyEvent keypress event with key/ctrl/meta and preventDefault().
   */
  function handleKeyDown(keyEvent) {
    if (oauthState.state === "success") {
      keyEvent.preventDefault(), onDone("Design-system access authorized.");
      return;
    }
    if (oauthState.state !== "error") {
      if (keyEvent.key === "escape" || (keyEvent.ctrl || keyEvent.meta) && (keyEvent.key === "c" || keyEvent.key === "d")) keyEvent.preventDefault(), cancelledRef.current = !0, onDone("Design login cancelled.");
      return;
    }
    if (keyEvent.preventDefault(), keyEvent.key === "return" && oauthState.toRetry) setPasteTrigger(""), setCursorOffset(0), setOauthState({
      state: "about_to_retry",
      nextState: oauthState.toRetry
    });else cancelledRef.current = !0, onDone("Design login cancelled.");
  }

  /**
   * Handle a manually pasted authorization code (format "<code>#<state>").
   * @param pastedCode the raw pasted string containing code and state.
   * @param loginUrl the login url to retry against on parse failure.
   */
  function handlePastedCode(pastedCode, loginUrl) {
    let [authorizationCode, oauthStateParam] = pastedCode.split("#");
    if (!authorizationCode || !oauthStateParam) {
      setOauthState({
        state: "error",
        message: "Invalid code. Please make sure the full code was copied",
        toRetry: {
          state: "waiting_for_login",
          url: loginUrl
        }
      }), A(`Design login: invalid pasted code for ${loginUrl}`);
      return;
    }
    W("tengu_design_oauth_manual_entry", {}), oauthFlow.handleManualAuthCodeInput({
      authorizationCode: authorizationCode,
      state: oauthStateParam
    });
  }

  /** Kick off (or restart) the OAuth flow from the "starting" state. */
  let startLogin = RL.useCallback(async () => {
    if (pendingCleanups.current.forEach(cleanup => cleanup()), pendingCleanups.current.clear(), !Gqt()) {
      setOauthState({
        state: "error",
        message: "The Claude Design OAuth client is not configured in this build. Set CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID to the registered client id, or update to a build with the registered client."
      });
      return;
    }
    try {
      let config = Hs(),
        clientId = _5n(),
        tokens = await oauthFlow.startOAuthFlow(async loginUrl => {
          setOauthState({
            state: "waiting_for_login",
            url: loginUrl
          }), pendingCleanups.current.add(scheduler.setTimeout(() => setShowPastePrompt(!0), 3000));
        }, {
          loginWithClaudeAi: !0,
          oauthClient: {
            clientId: clientId,
            scopes: Ppe
          },
          skipProfileFetch: !0,
          successRedirectUrl: config.CLAUDEAI_SUCCESS_URL
        });
      if (cancelledRef.current) {
        if (tokens.refreshToken) await vM(tokens.refreshToken, clientId);
        return;
      }
      setOauthState({
        state: "processing"
      });
      let credentialResult = await G_o(tokens, clientId);
      if (!credentialResult.ok) {
        setOauthState({
          state: "error",
          message: credentialResult.message,
          toRetry: {
            state: "starting"
          }
        });
        return;
      }
      if (cancelledRef.current) {
        await vM(credentialResult.slot.refreshToken, credentialResult.slot.clientId);
        return;
      }
      let saveResult = await h5n(credentialResult.slot);
      if (!saveResult.success) {
        await vM(credentialResult.slot.refreshToken, credentialResult.slot.clientId), setOauthState({
          state: "error",
          message: saveResult.warning ?? "Could not save the design credential to secure storage.",
          toRetry: {
            state: "starting"
          }
        });
        return;
      }
      W("tengu_design_oauth_login_success", {}), setOauthState({
        state: "success"
      }), pendingCleanups.current.add(scheduler.setTimeout(() => onDone("Design-system access authorized."), 1500));
    } catch (error) {
      Ie(error), W("tengu_design_oauth_login_error", {}), setOauthState({
        state: "error",
        message: Ce(error),
        toRetry: {
          state: "starting"
        }
      });
    }
  }, [scheduler, oauthFlow, onDone]);

  // Auto-start the flow when entering the "starting" state.
  RL.useEffect(() => {
    if (oauthState.state === "starting") startLogin();
  }, [oauthState.state, startLogin]), md(() => {
    // After the retry delay, transition into the queued next state.
    if (oauthState.state === "about_to_retry") setShowPastePrompt(oauthState.nextState.state === "waiting_for_login"), setOauthState(oauthState.nextState);
  }, oauthState.state === "about_to_retry" ? 500 : null), RL.useEffect(() => {
    // Pressing "c" while waiting copies the login url to the clipboard.
    if (pasteTrigger === "c" && oauthState.state === "waiting_for_login" && showPastePrompt && !showCopied) sw(oauthState.url).then(copyOutput => {
      if (copyOutput) process.stdout.write(copyOutput);
      setShowCopied(!0), copiedResetTimer.current?.(), copiedResetTimer.current = scheduler.setTimeout(() => setShowCopied(!1), 2000);
    }), setPasteTrigger("");
  }, [scheduler, pasteTrigger, oauthState, showPastePrompt, showCopied]), RL.useEffect(() => {
    // Unmount cleanup: tear down the OAuth flow and any pending timers.
    let cleanups = pendingCleanups.current;
    return () => {
      oauthFlow.cleanup(), cleanups.forEach(cleanup => cleanup()), cleanups.clear(), copiedResetTimer.current?.();
    };
  }, [oauthFlow]);

  // Whether a design credential is already stored (shown as a warning).
  let [hasExistingCredential] = RL.useState(() => Wqt() != null);
  return RT.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [oauthState.state !== "success" && RT.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [RT.jsx(v, {
        bold: !0,
        children: "Design login"
      }), RT.jsx(v, {
        dimColor: !0,
        children: "Authorize design-system access (read and write your organization's claude.ai/design projects) with your claude.ai account. This is separate from this session's authentication and changes nothing else."
      }), hasExistingCredential && RT.jsx(v, {
        dimColor: !0,
        children: "A design credential is already stored — completing this flow replaces it."
      })]
    }), oauthState.state === "waiting_for_login" && showPastePrompt && RT.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [RT.jsxs($, {
        paddingX: 1,
        children: [RT.jsxs(v, {
          dimColor: !0,
          children: ["Browser didn't open? Use the url below to sign in", " "]
        }), showCopied ? RT.jsx(v, {
          color: "success",
          children: "(Copied!)"
        }) : RT.jsx(v, {
          dimColor: !0,
          children: RT.jsx(at, {
            chord: "c",
            action: "copy",
            parens: !0
          })
        })]
      }), RT.jsx(Ss, {
        url: oauthState.url,
        children: RT.jsx(v, {
          dimColor: !0,
          children: oauthState.url
        })
      })]
    }), RT.jsx($, {
      paddingLeft: 1,
      flexDirection: "column",
      gap: 1,
      children: RT.jsx(drm, {
        oauthStatus: oauthState,
        showPastePrompt: showPastePrompt,
        pastedCode: pasteTrigger,
        setPastedCode: setPasteTrigger,
        cursorOffset: cursorOffset,
        setCursorOffset: setCursorOffset,
        textInputColumns: textInputColumns,
        onSubmitCode: handlePastedCode
      })
    })]
  });
}

/**
 * Renders the status/body region for the current OAuth state, memoized via
 * the React compiler cache.
 */
function drm(props) {
  let cache = eTl.c(23),
    {
      oauthStatus: oauthStatus,
      showPastePrompt: showPastePrompt,
      pastedCode: pastedCode,
      setPastedCode: setPastedCode,
      cursorOffset: cursorOffset,
      setCursorOffset: setCursorOffset,
      textInputColumns: textInputColumns,
      onSubmitCode: onSubmitCode
    } = props;
  switch (oauthStatus.state) {
    case "starting":
      {
        let element;
        if (cache[0] === Symbol.for("react.memo_cache_sentinel")) element = RT.jsx(Hc, {
          message: "Starting design login…"
        }), cache[0] = element;else element = cache[0];
        return element;
      }
    case "waiting_for_login":
      {
        let spinner;
        if (cache[1] === Symbol.for("react.memo_cache_sentinel")) spinner = RT.jsx(Hc, {
          message: "Waiting for browser authorization…"
        }), cache[1] = spinner;else spinner = cache[1];
        let pasteInput;
        if (cache[2] !== cursorOffset || cache[3] !== oauthStatus.url || cache[4] !== onSubmitCode || cache[5] !== pastedCode || cache[6] !== setCursorOffset || cache[7] !== setPastedCode || cache[8] !== showPastePrompt || cache[9] !== textInputColumns) pasteInput = showPastePrompt && RT.jsxs($, {
          children: [RT.jsx(v, {
            children: tTl
          }), RT.jsx(ga, {
            value: pastedCode,
            onChange: setPastedCode,
            onSubmit: submitted => onSubmitCode(submitted, oauthStatus.url),
            cursorOffset: cursorOffset,
            onChangeCursorOffset: setCursorOffset,
            columns: textInputColumns
          })]
        }), cache[2] = cursorOffset, cache[3] = oauthStatus.url, cache[4] = onSubmitCode, cache[5] = pastedCode, cache[6] = setCursorOffset, cache[7] = setPastedCode, cache[8] = showPastePrompt, cache[9] = textInputColumns, cache[10] = pasteInput;else pasteInput = cache[10];
        let waitingView;
        if (cache[11] !== pasteInput) waitingView = RT.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [spinner, pasteInput]
        }), cache[11] = pasteInput, cache[12] = waitingView;else waitingView = cache[12];
        return waitingView;
      }
    case "processing":
      {
        let element;
        if (cache[13] === Symbol.for("react.memo_cache_sentinel")) element = RT.jsx(Hc, {
          message: "Saving design credential…"
        }), cache[13] = element;else element = cache[13];
        return element;
      }
    case "success":
      {
        let element;
        if (cache[14] === Symbol.for("react.memo_cache_sentinel")) element = RT.jsx(v, {
          color: "success",
          children: "Design-system access authorized. /design-sync can now reach your claude.ai/design projects."
        }), cache[14] = element;else element = cache[14];
        return element;
      }
    case "error":
      {
        let messageView;
        if (cache[15] !== oauthStatus.message) messageView = RT.jsx(v, {
          color: "error",
          children: oauthStatus.message
        }), cache[15] = oauthStatus.message, cache[16] = messageView;else messageView = cache[16];
        let hint = oauthStatus.toRetry ? "Press Enter to retry, or any other key to cancel." : "Press any key to close.",
          hintView;
        if (cache[17] !== hint) hintView = RT.jsx(v, {
          dimColor: !0,
          children: hint
        }), cache[17] = hint, cache[18] = hintView;else hintView = cache[18];
        let errorView;
        if (cache[19] !== messageView || cache[20] !== hintView) errorView = RT.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [messageView, hintView]
        }), cache[19] = messageView, cache[20] = hintView, cache[21] = errorView;else errorView = cache[21];
        return errorView;
      }
    case "about_to_retry":
      {
        let element;
        if (cache[22] === Symbol.for("react.memo_cache_sentinel")) element = RT.jsx(v, {
          color: "permission",
          children: "Retrying…"
        }), cache[22] = element;else element = cache[22];
        return element;
      }
  }
}

/** Slash-command entry point: render the DesignLogin component. */
async function call(onDone) {
  return RT.jsx(DesignLogin, {
    onDone: status => onDone(status)
  });
}
var eTl,
  RL,
  RT,
  tTl = "Paste code here if prompted > ";
var oTl = b(() => {
  Wo();
  OE();
  rh();
  Sc();
  ui();
  hg();
  je();
  kt();
  aI();
  J4e();
  y5n();
  qe();
  Ct();
  vn();
  eTl = x(tt(), 1), RL = x(et(), 1), RT = x(oe(), 1);
});

export {rTl,DesignLogin,drm,call as prm,eTl,RL,RT,tTl,oTl};
