// @ts-nocheck
import {XW,J4e} from "../telemetry/3768_codeChallenge.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS as s1e,Sc} from "../api/0465_getOauthConfig.ts";
import {saveOAuthTokensIfNeeded as kse,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {aO,IA} from "../telemetry/2225_names.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/** OAuth state machine for the "Create Authentication Token" GitHub Actions flow. */
type OAuthStatus =
  | { state: "starting" }
  | { state: "waiting_for_login"; url: string }
  | { state: "processing" }
  | { state: "success"; token: string }
  | { state: "error"; message: string; toRetry?: OAuthStatus }
  | { state: "about_to_retry"; nextState: OAuthStatus };

/**
 * GitHub Actions long-lived auth-token creation flow.
 * Drives the OAuth login/manual-code-entry state machine and renders the prompt UI.
 */
function zTl({
  onSuccess,
  onCancel
}: {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}) {
  let [oauthStatus, setOauthStatus] = QB.useState<OAuthStatus>({
      state: "starting"
    }),
    [oauthFlow] = QB.useState(() => new XW()),
    [pastedCode, setPastedCode] = QB.useState(""),
    [cursorOffset, setCursorOffset] = QB.useState(0),
    [showPastePrompt, setShowPastePrompt] = QB.useState(!1),
    [copied, setCopied] = QB.useState(!1),
    clock = As(),
    pendingTimeouts = QB.useRef(new Set<() => void>()),
    copyResetTimer = QB.useRef<(() => void) | undefined>(void 0),
    terminalSize = _r(),
    textInputColumns = Math.max(50, terminalSize.columns - KTl.length - 4);
  /** Handle key presses while in the error state: Enter retries, anything else cancels. */
  function handleKeyDown(keyEvent) {
    if (oauthStatus.state !== "error") return;
    if (keyEvent.preventDefault(), keyEvent.key === "return" && oauthStatus.toRetry) setPastedCode(""), setCursorOffset(0), setOauthStatus({
      state: "about_to_retry",
      nextState: oauthStatus.toRetry
    });else onCancel();
  }
  /** Parse a manually pasted "code#state" string and submit it to the OAuth flow. */
  async function submitManualCode(rawCode, loginUrl) {
    try {
      let [authorizationCode, oauthState] = rawCode.split("#");
      if (!authorizationCode || !oauthState) {
        setOauthStatus({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url: loginUrl
          }
        });
        return;
      }
      W("tengu_oauth_manual_entry", {}), oauthFlow.handleManualAuthCodeInput({
        authorizationCode: authorizationCode,
        state: oauthState
      });
    } catch (error) {
      Ie(error), setOauthStatus({
        state: "error",
        message: Ce(error),
        toRetry: {
          state: "waiting_for_login",
          url: loginUrl
        }
      });
    }
  }
  let startFlow = QB.useCallback(async () => {
    pendingTimeouts.current.forEach(cancel => cancel()), pendingTimeouts.current.clear();
    try {
      let tokens = await oauthFlow.startOAuthFlow(async loginUrl => {
        setOauthStatus({
          state: "waiting_for_login",
          url: loginUrl
        }), pendingTimeouts.current.add(clock.setTimeout(() => setShowPastePrompt(!0), 3000));
      }, {
        loginWithClaudeAi: !0,
        inferenceOnly: !0,
        expiresIn: s1e
      });
      setOauthStatus({
        state: "processing"
      }), await kse(tokens), pendingTimeouts.current.add(clock.setTimeout(() => {
        setOauthStatus({
          state: "success",
          token: tokens.accessToken
        }), pendingTimeouts.current.add(clock.setTimeout(() => onSuccess(tokens.accessToken), 1000));
      }, 100));
    } catch (error) {
      let message = Ce(error);
      setOauthStatus({
        state: "error",
        message: message,
        toRetry: {
          state: "starting"
        }
      }), A(`OAuth flow failed in install-github-app: ${message}`, {
        level: "error"
      }), W("tengu_oauth_error", {
        ...aO(error)
      });
    }
  }, [clock, oauthFlow, onSuccess]);
  return QB.useEffect(() => {
    if (oauthStatus.state === "starting") startFlow();
  }, [oauthStatus.state, startFlow]), md(() => {
    if (oauthStatus.state === "about_to_retry") setShowPastePrompt(oauthStatus.nextState.state === "waiting_for_login"), setOauthStatus(oauthStatus.nextState);
  }, oauthStatus.state === "about_to_retry" ? 500 : null), QB.useEffect(() => {
    if (pastedCode === "c" && oauthStatus.state === "waiting_for_login" && showPastePrompt && !copied) sw(oauthStatus.url).then(output => {
      if (output) process.stdout.write(output);
      setCopied(!0), copyResetTimer.current?.(), copyResetTimer.current = clock.setTimeout(() => setCopied(!1), 2000);
    }), setPastedCode("");
  }, [clock, pastedCode, oauthStatus, showPastePrompt, copied]), QB.useEffect(() => {
    let timeouts = pendingTimeouts.current;
    return () => {
      oauthFlow.cleanup(), timeouts.forEach(cancel => cancel()), timeouts.clear(), copyResetTimer.current?.();
    };
  }, [oauthFlow]), Ig.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [oauthStatus.state === "starting" && Ig.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [Ig.jsx(v, {
        bold: !0,
        children: "Create Authentication Token"
      }), Ig.jsx(v, {
        dimColor: !0,
        children: "Creating a long-lived token for GitHub Actions"
      })]
    }), oauthStatus.state !== "success" && oauthStatus.state !== "starting" && oauthStatus.state !== "processing" && Ig.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [Ig.jsx(v, {
        bold: !0,
        children: "Create Authentication Token"
      }), Ig.jsx(v, {
        dimColor: !0,
        children: "Creating a long-lived token for GitHub Actions"
      })]
    }, "header"), oauthStatus.state === "waiting_for_login" && showPastePrompt && Ig.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [Ig.jsxs($, {
        paddingX: 1,
        children: [Ig.jsxs(v, {
          dimColor: !0,
          children: ["Browser didn't open? Use the url below to sign in", " "]
        }), copied ? Ig.jsx(v, {
          color: "success",
          children: "(Copied!)"
        }) : Ig.jsx(v, {
          dimColor: !0,
          children: Ig.jsx(at, {
            chord: "c",
            action: "copy",
            parens: !0
          })
        })]
      }), Ig.jsx(Ss, {
        url: oauthStatus.url,
        children: Ig.jsx(v, {
          dimColor: !0,
          children: oauthStatus.url
        })
      })]
    }, "urlToCopy"), Ig.jsx($, {
      paddingLeft: 1,
      flexDirection: "column",
      gap: 1,
      children: Ig.jsx(_rm, {
        oauthStatus: oauthStatus,
        showPastePrompt: showPastePrompt,
        pastedCode: pastedCode,
        setPastedCode: setPastedCode,
        cursorOffset: cursorOffset,
        setCursorOffset: setCursorOffset,
        textInputColumns: textInputColumns,
        onSubmitCode: submitManualCode
      })
    })]
  });
}
/** Renders the per-state body of the auth-token prompt, memoized via the React compiler cache. */
function _rm(props) {
  let cache = VTl.c(25),
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
        let node;
        if (cache[0] === Symbol.for("react.memo_cache_sentinel")) node = Ig.jsx(Hc, {
          message: "Starting authentication\u2026"
        }), cache[0] = node;else node = cache[0];
        return node;
      }
    case "waiting_for_login":
      {
        let spinner;
        if (cache[1] !== showPastePrompt) spinner = !showPastePrompt && Ig.jsx(Hc, {
          message: "Opening browser to sign in with your Claude account\u2026"
        }), cache[1] = showPastePrompt, cache[2] = spinner;else spinner = cache[2];
        let inputRow;
        if (cache[3] !== cursorOffset || cache[4] !== oauthStatus.url || cache[5] !== onSubmitCode || cache[6] !== pastedCode || cache[7] !== setCursorOffset || cache[8] !== setPastedCode || cache[9] !== showPastePrompt || cache[10] !== textInputColumns) inputRow = showPastePrompt && Ig.jsxs($, {
          children: [Ig.jsx(v, {
            children: KTl
          }), Ig.jsx(ga, {
            value: pastedCode,
            onChange: setPastedCode,
            onSubmit: code => onSubmitCode(code, oauthStatus.url),
            cursorOffset: cursorOffset,
            onChangeCursorOffset: setCursorOffset,
            columns: textInputColumns
          })]
        }), cache[3] = cursorOffset, cache[4] = oauthStatus.url, cache[5] = onSubmitCode, cache[6] = pastedCode, cache[7] = setCursorOffset, cache[8] = setPastedCode, cache[9] = showPastePrompt, cache[10] = textInputColumns, cache[11] = inputRow;else inputRow = cache[11];
        let container;
        if (cache[12] !== spinner || cache[13] !== inputRow) container = Ig.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [spinner, inputRow]
        }), cache[12] = spinner, cache[13] = inputRow, cache[14] = container;else container = cache[14];
        return container;
      }
    case "processing":
      {
        let node;
        if (cache[15] === Symbol.for("react.memo_cache_sentinel")) node = Ig.jsx(Hc, {
          message: "Processing authentication\u2026"
        }), cache[15] = node;else node = cache[15];
        return node;
      }
    case "success":
      {
        let node;
        if (cache[16] === Symbol.for("react.memo_cache_sentinel")) node = Ig.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [Ig.jsx(v, {
            color: "success",
            children: "\u2713 Authentication token created successfully!"
          }), Ig.jsx(v, {
            dimColor: !0,
            children: "Using token for GitHub Actions setup\u2026"
          })]
        }), cache[16] = node;else node = cache[16];
        return node;
      }
    case "error":
      {
        let errorLine;
        if (cache[17] !== oauthStatus.message) errorLine = Ig.jsxs(v, {
          color: "error",
          children: ["OAuth error: ", oauthStatus.message]
        }), cache[17] = oauthStatus.message, cache[18] = errorLine;else errorLine = cache[18];
        let hint;
        if (cache[19] !== oauthStatus.toRetry) hint = oauthStatus.toRetry ? Ig.jsx(v, {
          dimColor: !0,
          children: "Press Enter to try again, or any other key to cancel"
        }) : Ig.jsx(v, {
          dimColor: !0,
          children: "Press any key to return to API key selection"
        }), cache[19] = oauthStatus.toRetry, cache[20] = hint;else hint = cache[20];
        let container;
        if (cache[21] !== errorLine || cache[22] !== hint) container = Ig.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [errorLine, hint]
        }), cache[21] = errorLine, cache[22] = hint, cache[23] = container;else container = cache[23];
        return container;
      }
    case "about_to_retry":
      {
        let node;
        if (cache[24] === Symbol.for("react.memo_cache_sentinel")) node = Ig.jsx($, {
          flexDirection: "column",
          gap: 1,
          children: Ig.jsx(v, {
            color: "permission",
            children: "Retrying\u2026"
          })
        }), cache[24] = node;else node = cache[24];
        return node;
      }
    default:
      return null;
  }
}
var VTl,
  QB,
  Ig,
  KTl = "Paste code here if prompted > ";
var jTl = b(() => {
  kt();
  Wo();
  OE();
  rh();
  Sc();
  ui();
  hg();
  je();
  J4e();
  lo();
  qe();
  Ct();
  IA();
  vn();
  VTl = x(tt(), 1), QB = x(et(), 1), Ig = x(oe(), 1);
});

export {zTl,_rm,VTl,QB,Ig,KTl,jTl};
