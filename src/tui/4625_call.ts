// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {MW as _W,M3e as p3e} from "../telemetry/3752_codeChallenge.ts";
import {useClock as Ps} from "../../vendor/m2432.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {v3t as n3t,c4n as E3n,zpo as jdo,a4n as b3n,C3t as t3t,u4n as C3n} from "../config/4283_level.ts";
import {getOauthConfig as Is,DESIGN_OAUTH_SCOPES as ipe,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {revokeOAuthToken as t1,DH as wH} from "../config/1288_storeOAuthAccountInfo.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {useTimeout as Nd} from "../../vendor/m2450.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Jc as zc,vE as bE} from "../../vendor/m3837.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
pt(moduleExports, {
  call: () => designLoginCall,
  DesignLogin: () => DesignLogin
});
function DesignLogin({
  onDone: onDoneCallback
}) {
  let [oauthStatus, setOauthStatus] = Yy.useState({
      state: "starting"
    }),
    [oauthClient] = Yy.useState(() => new _W()),
    [pastedCode, setPastedCode] = Yy.useState(""),
    [cursorOffset, setCursorOffset] = Yy.useState(0),
    [showPastePrompt, setShowPastePrompt] = Yy.useState(false),
    [copySuccess, setCopySuccess] = Yy.useState(false),
    clock = Ps(),
    cleanupTimers = Yy.useRef(new Set()),
    copyResetTimer = Yy.useRef(undefined),
    cancelledRef = Yy.useRef(false),
    termSize = hr(),
    textInputColumns = Math.max(50, termSize.columns - PASTE_PROMPT_PREFIX.length - 4);
  function handleKeyDown(keyEvent) {
    if (oauthStatus.state === "success") {
      keyEvent.preventDefault(), onDoneCallback("Design-system access authorized.");
      return;
    }
    if (oauthStatus.state !== "error") {
      if (keyEvent.key === "escape" || (keyEvent.ctrl || keyEvent.meta) && (keyEvent.key === "c" || keyEvent.key === "d")) keyEvent.preventDefault(), cancelledRef.current = true, onDoneCallback("Design login cancelled.");
      return;
    }
    if (keyEvent.preventDefault(), keyEvent.key === "return" && oauthStatus.toRetry) setPastedCode(""), setCursorOffset(0), setOauthStatus({
      state: "about_to_retry",
      nextState: oauthStatus.toRetry
    });else cancelledRef.current = true, onDoneCallback("Design login cancelled.");
  }
  function handlePasteSubmit(rawCode, authUrl) {
    let [authCode, stateParam] = rawCode.split("#");
    if (!authCode || !stateParam) {
      setOauthStatus({
        state: "error",
        message: "Invalid code. Please make sure the full code was copied",
        toRetry: {
          state: "waiting_for_login",
          url: authUrl
        }
      }), v(`Design login: invalid pasted code for ${authUrl}`);
      return;
    }
    j("tengu_design_oauth_manual_entry", {}), oauthClient.handleManualAuthCodeInput({
      authorizationCode: authCode,
      state: stateParam
    });
  }
  let startOAuthFlow = Yy.useCallback(async () => {
    if (cleanupTimers.current.forEach(fn => fn()), cleanupTimers.current.clear(), !n3t()) {
      setOauthStatus({
        state: "error",
        message: "The Claude Design OAuth client is not configured in this build. Set CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID to the registered client id, or update to a build with the registered client."
      });
      return;
    }
    try {
      let oauthConfig = Is(),
        clientId = E3n(),
        tokenResult = await oauthClient.startOAuthFlow(async authUrl => {
          setOauthStatus({
            state: "waiting_for_login",
            url: authUrl
          }), cleanupTimers.current.add(clock.setTimeout(() => setShowPastePrompt(true), 3000));
        }, {
          loginWithClaudeAi: true,
          oauthClient: {
            clientId: clientId,
            scopes: ipe
          },
          skipProfileFetch: true,
          successRedirectUrl: oauthConfig.CLAUDEAI_SUCCESS_URL
        });
      if (cancelledRef.current) {
        if (tokenResult.refreshToken) await t1(tokenResult.refreshToken, clientId);
        return;
      }
      setOauthStatus({
        state: "processing"
      });
      let markResult = await jdo(tokenResult, clientId);
      if (!markResult.ok) {
        setOauthStatus({
          state: "error",
          message: markResult.message,
          toRetry: {
            state: "starting"
          }
        });
        return;
      }
      if (cancelledRef.current) {
        await t1(markResult.slot.refreshToken, markResult.slot.clientId);
        return;
      }
      let saveResult = await b3n(markResult.slot);
      if (!saveResult.success) {
        await t1(markResult.slot.refreshToken, markResult.slot.clientId), setOauthStatus({
          state: "error",
          message: saveResult.warning ?? "Could not save the design credential to secure storage.",
          toRetry: {
            state: "starting"
          }
        });
        return;
      }
      j("tengu_design_oauth_login_success", {}), setOauthStatus({
        state: "success"
      }), cleanupTimers.current.add(clock.setTimeout(() => onDoneCallback("Design-system access authorized."), 1500));
    } catch (err) {
      Ie(err), j("tengu_design_oauth_login_error", {}), setOauthStatus({
        state: "error",
        message: Se(err),
        toRetry: {
          state: "starting"
        }
      });
    }
  }, [clock, oauthClient, onDoneCallback]);
  Yy.useEffect(() => {
    if (oauthStatus.state === "starting") startOAuthFlow();
  }, [oauthStatus.state, startOAuthFlow]), Nd(() => {
    if (oauthStatus.state === "about_to_retry") setShowPastePrompt(oauthStatus.nextState.state === "waiting_for_login"), setOauthStatus(oauthStatus.nextState);
  }, oauthStatus.state === "about_to_retry" ? 500 : null), Yy.useEffect(() => {
    if (pastedCode === "c" && oauthStatus.state === "waiting_for_login" && showPastePrompt && !copySuccess) VR(oauthStatus.url).then(h => {
      if (h) process.stdout.write(h);
      setCopySuccess(true), copyResetTimer.current?.(), copyResetTimer.current = clock.setTimeout(() => setCopySuccess(false), 2000);
    }), setPastedCode("");
  }, [clock, pastedCode, oauthStatus, showPastePrompt, copySuccess]), Yy.useEffect(() => {
    let h = cleanupTimers.current;
    return () => {
      oauthClient.cleanup(), h.forEach(y => y()), h.clear(), copyResetTimer.current?.();
    };
  }, [oauthClient]);
  let [R] = Yy.useState(() => t3t() != null);
  return P5.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, oauthStatus.state !== "success" && P5.createElement(B, {
    flexDirection: "column",
    gap: 1,
    paddingBottom: 1
  }, P5.createElement(w, {
    bold: true
  }, "Design login"), P5.createElement(w, {
    dimColor: true
  }, "Authorize design-system access (read and write your organization's claude.ai/design projects) with your claude.ai account. This is separate from this session's authentication and changes nothing else."), R && P5.createElement(w, {
    dimColor: true
  }, "A design credential is already stored \u2014 completing this flow replaces it.")), oauthStatus.state === "waiting_for_login" && showPastePrompt && P5.createElement(B, {
    flexDirection: "column",
    gap: 1,
    paddingBottom: 1
  }, P5.createElement(B, {
    paddingX: 1
  }, P5.createElement(w, {
    dimColor: true
  }, "Browser didn't open? Use the url below to sign in", " "), copySuccess ? P5.createElement(w, {
    color: "success"
  }, "(Copied!)") : P5.createElement(w, {
    dimColor: true
  }, P5.createElement(lt, {
    chord: "c",
    action: "copy",
    parens: true
  }))), P5.createElement(Fs, {
    url: oauthStatus.url
  }, P5.createElement(w, {
    dimColor: true
  }, oauthStatus.url))), P5.createElement(B, {
    paddingLeft: 1,
    flexDirection: "column",
    gap: 1
  }, P5.createElement(DesignLoginStatusView, {
    oauthStatus: oauthStatus,
    showPastePrompt: showPastePrompt,
    pastedCode: pastedCode,
    setPastedCode: setPastedCode,
    cursorOffset: cursorOffset,
    setCursorOffset: setCursorOffset,
    textInputColumns: textInputColumns,
    onSubmitCode: handlePasteSubmit
  })));
}
function DesignLoginStatusView(props) {
  let reactCache = reactMemoCache.c(23),
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
        let spinnerElem;
        if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) spinnerElem = P5.createElement(zc, {
          message: "Starting design login\u2026"
        }), reactCache[0] = spinnerElem;else spinnerElem = reactCache[0];
        return spinnerElem;
      }
    case "waiting_for_login":
      {
        let waitSpinner;
        if (reactCache[1] === Symbol.for("react.memo_cache_sentinel")) waitSpinner = P5.createElement(zc, {
          message: "Waiting for browser authorization\u2026"
        }), reactCache[1] = waitSpinner;else waitSpinner = reactCache[1];
        let pasteInput;
        if (reactCache[2] !== cursorOffset || reactCache[3] !== oauthStatus.url || reactCache[4] !== onSubmitCode || reactCache[5] !== pastedCode || reactCache[6] !== setCursorOffset || reactCache[7] !== setPastedCode || reactCache[8] !== showPastePrompt || reactCache[9] !== textInputColumns) pasteInput = showPastePrompt && P5.createElement(B, null, P5.createElement(w, null, PASTE_PROMPT_PREFIX), P5.createElement(Pa, {
          value: pastedCode,
          onChange: setPastedCode,
          onSubmit: code => onSubmitCode(code, oauthStatus.url),
          cursorOffset: cursorOffset,
          onChangeCursorOffset: setCursorOffset,
          columns: textInputColumns
        })), reactCache[2] = cursorOffset, reactCache[3] = oauthStatus.url, reactCache[4] = onSubmitCode, reactCache[5] = pastedCode, reactCache[6] = setCursorOffset, reactCache[7] = setPastedCode, reactCache[8] = showPastePrompt, reactCache[9] = textInputColumns, reactCache[10] = pasteInput;else pasteInput = reactCache[10];
        let combined;
        if (reactCache[11] !== pasteInput) combined = P5.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, waitSpinner, pasteInput), reactCache[11] = pasteInput, reactCache[12] = combined;else combined = reactCache[12];
        return combined;
      }
    case "processing":
      {
        let savingElem;
        if (reactCache[13] === Symbol.for("react.memo_cache_sentinel")) savingElem = P5.createElement(zc, {
          message: "Saving design credential\u2026"
        }), reactCache[13] = savingElem;else savingElem = reactCache[13];
        return savingElem;
      }
    case "success":
      {
        let successElem;
        if (reactCache[14] === Symbol.for("react.memo_cache_sentinel")) successElem = P5.createElement(w, {
          color: "success"
        }, "Design-system access authorized. /design-sync can now reach your claude.ai/design projects."), reactCache[14] = successElem;else successElem = reactCache[14];
        return successElem;
      }
    case "error":
      {
        let errorMsg;
        if (reactCache[15] !== oauthStatus.message) errorMsg = P5.createElement(w, {
          color: "error"
        }, oauthStatus.message), reactCache[15] = oauthStatus.message, reactCache[16] = errorMsg;else errorMsg = reactCache[16];
        let retryHint = oauthStatus.toRetry ? "Press Enter to retry, or any other key to cancel." : "Press any key to close.",
          hintElem;
        if (reactCache[17] !== retryHint) hintElem = P5.createElement(w, {
          dimColor: true
        }, retryHint), reactCache[17] = retryHint, reactCache[18] = hintElem;else hintElem = reactCache[18];
        let errorBox;
        if (reactCache[19] !== errorMsg || reactCache[20] !== hintElem) errorBox = P5.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, errorMsg, hintElem), reactCache[19] = errorMsg, reactCache[20] = hintElem, reactCache[21] = errorBox;else errorBox = reactCache[21];
        return errorBox;
      }
    case "about_to_retry":
      {
        let retryingElem;
        if (reactCache[22] === Symbol.for("react.memo_cache_sentinel")) retryingElem = P5.createElement(w, {
          color: "permission"
        }, "Retrying\u2026"), reactCache[22] = retryingElem;else retryingElem = reactCache[22];
        return retryingElem;
      }
  }
}
async function designLoginCall(onDone) {
  return P5.createElement(DesignLogin, {
    onDone: _ => onDone(_)
  });
}
var reactMemoCache,
  P5,
  Yy,
  PASTE_PROMPT_PREFIX = "Paste code here if prompted > ";
var h14 = b(() => {
  ts();
  bE();
  rh();
  Hc();
  Ii();
  og();
  Je();
  Ct();
  wH();
  p3e();
  C3n();
  je();
  St();
  wn();
  reactMemoCache = L(nt(), 1), P5 = L(Te(), 1), Yy = L(Te(), 1);
});

export {moduleExports as bdl,DesignLogin,DesignLoginStatusView as czp,designLoginCall as uzp,reactMemoCache as ydl,P5 as Cu,Yy as aM,PASTE_PROMPT_PREFIX as Tdl,h14 as Edl};
