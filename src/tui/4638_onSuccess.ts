// @ts-nocheck
import {MW as _W,M3e as p3e} from "../telemetry/3752_codeChallenge.ts";
import {useClock as Ps} from "../../vendor/m2432.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS as KLe,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {saveOAuthTokensIfNeeded as _se,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {D1 as b1,Cv as gv} from "../telemetry/2217_names.ts";
import {useTimeout as Nd} from "../../vendor/m2450.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Jc as zc,vE as bE} from "../../vendor/m3837.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function $ul({
  onSuccess: e,
  onCancel: t
}) {
  let [n, r] = Text.useState({
      state: "starting"
    }),
    [o] = Text.useState(() => new _W()),
    [s, i] = Text.useState(""),
    [a, l] = Text.useState(0),
    [c, u] = Text.useState(false),
    [d, p] = Text.useState(false),
    m = Ps(),
    f = Text.useRef(new Set()),
    A = Text.useRef(undefined),
    h = hr(),
    g = Math.max(50, h.columns - Spinner.length - 4);
  function _(S) {
    if (n.state !== "error") return;
    if (S.preventDefault(), S.key === "return" && n.toRetry) i(""), l(0), r({
      state: "about_to_retry",
      nextState: n.toRetry
    });else t();
  }
  async function y(S, C) {
    try {
      let [R, k] = S.split("#");
      if (!R || !k) {
        r({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url: C
          }
        });
        return;
      }
      j("tengu_oauth_manual_entry", {}), o.handleManualAuthCodeInput({
        authorizationCode: R,
        state: k
      });
    } catch (R) {
      Ie(R), r({
        state: "error",
        message: Se(R),
        toRetry: {
          state: "waiting_for_login",
          url: C
        }
      });
    }
  }
  let T = Text.useCallback(async () => {
    f.current.forEach(S => S()), f.current.clear();
    try {
      let S = await o.startOAuthFlow(async C => {
        r({
          state: "waiting_for_login",
          url: C
        }), f.current.add(m.setTimeout(() => u(true), 3000));
      }, {
        loginWithClaudeAi: true,
        inferenceOnly: true,
        expiresIn: KLe
      });
      r({
        state: "processing"
      }), await _se(S), f.current.add(m.setTimeout(() => {
        r({
          state: "success",
          token: S.accessToken
        }), f.current.add(m.setTimeout(() => e(S.accessToken), 1000));
      }, 100));
    } catch (S) {
      let C = Se(S);
      r({
        state: "error",
        message: C,
        toRetry: {
          state: "starting"
        }
      }), v(`OAuth flow failed in install-github-app: ${C}`, {
        level: "error"
      }), j("tengu_oauth_error", {
        ...b1(S)
      });
    }
  }, [m, o, e]);
  return Text.useEffect(() => {
    if (n.state === "starting") T();
  }, [n.state, T]), Nd(() => {
    if (n.state === "about_to_retry") u(n.nextState.state === "waiting_for_login"), r(n.nextState);
  }, n.state === "about_to_retry" ? 500 : null), Text.useEffect(() => {
    if (s === "c" && n.state === "waiting_for_login" && c && !d) VR(n.url).then(S => {
      if (S) process.stdout.write(S);
      p(true), A.current?.(), A.current = m.setTimeout(() => p(false), 2000);
    }), i("");
  }, [m, s, n, c, d]), Text.useEffect(() => {
    let S = f.current;
    return () => {
      o.cleanup(), S.forEach(C => C()), S.clear(), A.current?.();
    };
  }, [o]), Text.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: _
  }, n.state === "starting" && Text.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    paddingBottom: 1
  }, Text.default.createElement(w, {
    bold: true
  }, "Create Authentication Token"), Text.default.createElement(w, {
    dimColor: true
  }, "Creating a long-lived token for GitHub Actions")), n.state !== "success" && n.state !== "starting" && n.state !== "processing" && Text.default.createElement(B, {
    key: "header",
    flexDirection: "column",
    gap: 1,
    paddingBottom: 1
  }, Text.default.createElement(w, {
    bold: true
  }, "Create Authentication Token"), Text.default.createElement(w, {
    dimColor: true
  }, "Creating a long-lived token for GitHub Actions")), n.state === "waiting_for_login" && c && Text.default.createElement(B, {
    flexDirection: "column",
    key: "urlToCopy",
    gap: 1,
    paddingBottom: 1
  }, Text.default.createElement(B, {
    paddingX: 1
  }, Text.default.createElement(w, {
    dimColor: true
  }, "Browser didn't open? Use the url below to sign in", " "), d ? Text.default.createElement(w, {
    color: "success"
  }, "(Copied!)") : Text.default.createElement(w, {
    dimColor: true
  }, Text.default.createElement(lt, {
    chord: "c",
    action: "copy",
    parens: true
  }))), Text.default.createElement(Fs, {
    url: n.url
  }, Text.default.createElement(w, {
    dimColor: true
  }, n.url))), Text.default.createElement(B, {
    paddingLeft: 1,
    flexDirection: "column",
    gap: 1
  }, Text.default.createElement(IVp, {
    oauthStatus: n,
    showPastePrompt: c,
    pastedCode: s,
    setPastedCode: i,
    cursorOffset: a,
    setCursorOffset: l,
    textInputColumns: g,
    onSubmitCode: y
  })));
}
function IVp(e) {
  let t = Box.c(25),
    {
      oauthStatus: n,
      showPastePrompt: r,
      pastedCode: o,
      setPastedCode: s,
      cursorOffset: i,
      setCursorOffset: a,
      textInputColumns: l,
      onSubmitCode: c
    } = e;
  switch (n.state) {
    case "starting":
      {
        let u;
        if (t[0] === Symbol.for("react.memo_cache_sentinel")) u = Text.default.createElement(zc, {
          message: "Starting authentication\u2026"
        }), t[0] = u;else u = t[0];
        return u;
      }
    case "waiting_for_login":
      {
        let u;
        if (t[1] !== r) u = !r && Text.default.createElement(zc, {
          message: "Opening browser to sign in with your Claude account\u2026"
        }), t[1] = r, t[2] = u;else u = t[2];
        let d;
        if (t[3] !== i || t[4] !== n.url || t[5] !== c || t[6] !== o || t[7] !== a || t[8] !== s || t[9] !== r || t[10] !== l) d = r && Text.default.createElement(B, null, Text.default.createElement(w, null, Spinner), Text.default.createElement(Pa, {
          value: o,
          onChange: s,
          onSubmit: m => c(m, n.url),
          cursorOffset: i,
          onChangeCursorOffset: a,
          columns: l
        })), t[3] = i, t[4] = n.url, t[5] = c, t[6] = o, t[7] = a, t[8] = s, t[9] = r, t[10] = l, t[11] = d;else d = t[11];
        let p;
        if (t[12] !== u || t[13] !== d) p = Text.default.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, u, d), t[12] = u, t[13] = d, t[14] = p;else p = t[14];
        return p;
      }
    case "processing":
      {
        let u;
        if (t[15] === Symbol.for("react.memo_cache_sentinel")) u = Text.default.createElement(zc, {
          message: "Processing authentication\u2026"
        }), t[15] = u;else u = t[15];
        return u;
      }
    case "success":
      {
        let u;
        if (t[16] === Symbol.for("react.memo_cache_sentinel")) u = Text.default.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, Text.default.createElement(w, {
          color: "success"
        }, "\u2713 Authentication token created successfully!"), Text.default.createElement(w, {
          dimColor: true
        }, "Using token for GitHub Actions setup\u2026")), t[16] = u;else u = t[16];
        return u;
      }
    case "error":
      {
        let u;
        if (t[17] !== n.message) u = Text.default.createElement(w, {
          color: "error"
        }, "OAuth error: ", n.message), t[17] = n.message, t[18] = u;else u = t[18];
        let d;
        if (t[19] !== n.toRetry) d = n.toRetry ? Text.default.createElement(w, {
          dimColor: true
        }, "Press Enter to try again, or any other key to cancel") : Text.default.createElement(w, {
          dimColor: true
        }, "Press any key to return to API key selection"), t[19] = n.toRetry, t[20] = d;else d = t[20];
        let p;
        if (t[21] !== u || t[22] !== d) p = Text.default.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, u, d), t[21] = u, t[22] = d, t[23] = p;else p = t[23];
        return p;
      }
    case "about_to_retry":
      {
        let u;
        if (t[24] === Symbol.for("react.memo_cache_sentinel")) u = Text.default.createElement(B, {
          flexDirection: "column",
          gap: 1
        }, Text.default.createElement(w, {
          color: "permission"
        }, "Retrying\u2026")), t[24] = u;else u = t[24];
        return u;
      }
    default:
      return null;
  }
}
var Box,
  Text,
  Spinner = "Paste code here if prompted > ";
var KeyHint = b(() => {
  Ct();
  ts();
  bE();
  rh();
  Hc();
  Ii();
  og();
  Je();
  p3e();
  mo();
  je();
  St();
  gv();
  wn();
  Box = L(nt(), 1), Text = L(Te(), 1);
});

export {$ul as cpl,IVp as Azp,Box as apl,Text as Ud,Spinner as lpl,KeyHint as upl};
