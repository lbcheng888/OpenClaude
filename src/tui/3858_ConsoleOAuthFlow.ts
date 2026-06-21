// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {eb,pE} from "../../vendor/m2548.ts";
import {SAe,lS} from "../../vendor/m2571.ts";
import {getSettings_DEPRECATED,getSettingsForSource,getPolicySettingsOrigin,yr} from "../config/0740_updateSettingsForSource.ts";
import {isAdminPolicyOrigin} from "../config/0735_settings.ts";
import {VK,F4} from "../../vendor/m2416.ts";
import {useClock} from "../../vendor/m2432.ts";
import {MW,M3e} from "../telemetry/3752_codeChallenge.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {useTimeout} from "../../vendor/m2450.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {useApp} from "../../vendor/m2442.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {kUt,xUt} from "../../vendor/m3856.ts";
import {zR,lg} from "../../vendor/m2269.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,Dc} from "../api/0459_getOauthConfig.ts";
import {exe,txe} from "../../vendor/m2739.ts";
import {D1,Cv} from "../telemetry/2217_names.ts";
import {installOAuthTokens,Iat} from "./3766_installOAuthTokens.ts";
import {validateForceLoginOrg,getOauthAccountInfo,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {Jle,mUt} from "../telemetry/3811_configured_channel.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {Link} from "../../vendor/m2427.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {Qe} from "../../vendor/m5.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {PBn,foo} from "../../vendor/m3842.ts";
import {MBn,Soo} from "../../vendor/m3854.ts";
import {tp,_x} from "./3835_mode.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {ze} from "../../vendor/m2452.ts";
import {SIa} from "../../vendor/m3843.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var r0a = {};
isFullscreenWithTTY(r0a, {
  ConsoleOAuthFlow: () => ConsoleOAuthFlow
});
function ConsoleOAuthFlow({
  onDone: e,
  onAuthSuccess: t,
  startingMessage: n,
  mode: r = "login",
  forceLoginMethod: o,
  urlOutdent: s = 0
}) {
  let a = (eb() ? SAe : 0) + s,
    l = getSettings_DEPRECATED() || {},
    c = getSettingsForSource("policySettings"),
    u = isAdminPolicyOrigin(getPolicySettingsOrigin()),
    d = u && c?.forceLoginMethod === "gateway",
    p = u ? c?.forceLoginGatewayUrl : void 0,
    m = l.forceLoginMethod === "gateway" && !d ? void 0 : l.forceLoginMethod,
    f = o ?? m,
    A = f === "gateway" || p !== void 0,
    h = f === "claudeai" ? "Login method pre-selected: Subscription Plan (Claude Pro/Max)" : f === "console" ? "Login method pre-selected: API usage billing (Anthropic Console)" : null,
    g = A ? "Gateway login is configured in managed settings, but this Claude Code build does not include Cloud gateway support." : null,
    _ = VK(),
    y = useClock(),
    [T, S] = vi.useState(() => {
      if (r === "setup-token") return {
        state: "ready_to_start"
      };
      if (f === "claudeai" || f === "console") return {
        state: "ready_to_start"
      };
      return {
        state: "idle"
      };
    }),
    [v, R] = vi.useState(""),
    [k, x] = vi.useState(0),
    [H] = vi.useState(() => new MW()),
    [I, P] = vi.useState(() => r === "setup-token" || f === "claudeai"),
    L = l.forceLoginMethod !== void 0 && I !== (l.forceLoginMethod === "claudeai"),
    D = typeof l.forceLoginOrgUUID === "string" && !L ? l.forceLoginOrgUUID : void 0,
    [N, O] = vi.useState(!1),
    [$, U] = vi.useState(!1),
    W = mr().columns - n0a.length - 1;
  vi.useEffect(() => {
    if (f === "claudeai") logEvent("tengu_oauth_claudeai_forced", {});else if (f === "console") logEvent("tengu_oauth_console_forced", {});
  }, [f, A, r]), useTimeout(() => {
    if (T.state === "about_to_retry") S(T.nextState);
  }, T.state === "about_to_retry" ? 1000 : null, [T]), Or("confirm:yes", () => {
    logEvent("tengu_oauth_success", {
      loginWithClaudeAi: I
    }), e();
  }, {
    context: "Confirmation",
    isActive: T.state === "success" && r !== "setup-token"
  });
  let G = useApp();
  Or("confirm:yes", () => {
    saveGlobalConfig(Y => ({
      ...Y,
      hasCompletedOnboarding: !0,
      lastOnboardingVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    })), G.exit(), Promise.resolve().then(() => (kUt(), xUt)).then(Y => Y.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: T.state === "bedrock_done" || T.state === "vertex_done" || T.state === "gateway_done"
  }), Or("confirm:yes", () => {
    if (T.state === "error" && T.toRetry) R(""), S({
      state: "about_to_retry",
      nextState: T.toRetry
    });
  }, {
    context: "Confirmation",
    isActive: T.state === "error" && !!T.toRetry
  }), vi.useEffect(() => {
    if (v === "c" && T.state === "waiting_for_login" && N && !$) zR(T.url).then(Y => {
      if (Y) process.stdout.write(Y);
      U(!0), y.setTimeout(() => U(!1), 2000);
    }), R("");
  }, [v, T, N, $, y]);
  async function V(Y, J) {
    try {
      let [ee, te] = Y.split("#");
      if (!ee || !te) {
        S({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url: J
          }
        });
        return;
      }
      logEvent("tengu_oauth_manual_entry", {}), H.handleManualAuthCodeInput({
        authorizationCode: ee,
        state: te
      });
    } catch (ee) {
      De(ee), S({
        state: "error",
        message: Se(ee),
        toRetry: {
          state: "waiting_for_login",
          url: J
        }
      });
    }
  }
  let Q = vi.useCallback(async () => {
      try {
        logEvent("tengu_oauth_flow_start", {
          loginWithClaudeAi: I
        });
        let Y = await H.startOAuthFlow(async J => {
          S({
            state: "waiting_for_login",
            url: J
          }), y.setTimeout(() => O(!0), 3000);
        }, {
          loginWithClaudeAi: I,
          inferenceOnly: r === "setup-token",
          expiresIn: r === "setup-token" ? LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS : void 0,
          orgUUID: D
        }).catch(J => {
          let ee = J.message.includes("Token exchange failed"),
            te = exe(J);
          throw S({
            state: "error",
            message: te ?? (ee ? "Failed to exchange authorization code for access token. Please try again." : J.message),
            toRetry: r === "setup-token" ? {
              state: "ready_to_start"
            } : {
              state: "idle"
            }
          }), logEvent("tengu_oauth_token_exchange_error", {
            ...D1(J),
            ssl_error: te !== null
          }), J;
        });
        if (r === "setup-token") S({
          state: "success",
          token: Y.accessToken
        }), t?.();else {
          await installOAuthTokens(Y);
          let J = await validateForceLoginOrg();
          if (!J.valid) throw Error(J.message);
          S({
            state: "success"
          }), t?.(), Jle({
            message: "Claude Code login successful",
            notificationType: "auth_success"
          }, _);
        }
      } catch (Y) {
        let J = Se(Y),
          ee = exe(Y);
        S({
          state: "error",
          message: ee ?? J,
          toRetry: {
            state: r === "setup-token" ? "ready_to_start" : "idle"
          }
        }), logEvent("tengu_oauth_error", {
          ...D1(Y),
          ssl_error: ee !== null
        });
      }
    }, [H, I, r, D, _, y, t]),
    K = vi.useRef(!1);
  return vi.useEffect(() => {
    if (T.state === "ready_to_start" && !K.current) K.current = !0, process.nextTick((Y, J) => {
      Y().finally(() => {
        J.current = !1;
      });
    }, Q, K);
  }, [T.state, Q]), useTimeout(() => {
    logEvent("tengu_oauth_success", {
      loginWithClaudeAi: I
    }), e();
  }, r === "setup-token" && T.state === "success" ? 500 : null, [r, T, I, e]), vi.useEffect(() => () => {
    H.cleanup();
  }, [H]), vi.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, T.state === "waiting_for_login" && N && vi.default.createElement(Box, {
    flexDirection: "column",
    key: "urlToCopy",
    gap: 1,
    paddingBottom: 1
  }, vi.default.createElement(Box, null, vi.default.createElement(Text, {
    dimColor: !0
  }, "Browser didn't open? Use the url below to sign in", " "), $ ? vi.default.createElement(Text, {
    color: "success"
  }, "(Copied!)") : vi.default.createElement(Text, {
    dimColor: !0
  }, vi.default.createElement(at, {
    chord: "c",
    action: "copy",
    parens: !0
  }))), vi.default.createElement(Box, {
    marginX: a ? -a : void 0
  }, vi.default.createElement(Link, {
    url: T.url
  }, vi.default.createElement(Text, {
    dimColor: !0
  }, T.url)))), r === "setup-token" && T.state === "success" && T.token && vi.default.createElement(Box, {
    key: "tokenOutput",
    flexDirection: "column",
    gap: 1,
    paddingTop: 1
  }, vi.default.createElement(Text, {
    color: "success"
  }, "✓ Long-lived authentication token created successfully!"), vi.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, vi.default.createElement(Text, null, "Your OAuth token (valid for 1 year):"), vi.default.createElement(Text, {
    color: "warning"
  }, T.token), vi.default.createElement(Text, {
    dimColor: !0
  }, "Store this token securely. You won't be able to see it again."), vi.default.createElement(Text, {
    dimColor: !0
  }, "Use this token by setting: export CLAUDE_CODE_OAUTH_TOKEN=<token>"))), vi.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, vi.default.createElement(kAp, {
    oauthStatus: T,
    mode: r,
    startingMessage: n,
    forcedMethodMessage: h,
    gatewayUnsupportedWarning: g,
    forceLoginGatewayUrl: p,
    gatewayScreenLocked: f === "gateway",
    showPastePrompt: N,
    pastedCode: v,
    setPastedCode: R,
    cursorOffset: k,
    setCursorOffset: x,
    textInputColumns: W,
    handleSubmitCode: V,
    setOAuthStatus: S,
    setLoginWithClaudeAi: P
  })));
}
function kAp(e) {
  let t = t0a.c(74),
    {
      oauthStatus: n,
      mode: r,
      startingMessage: o,
      forcedMethodMessage: s,
      gatewayUnsupportedWarning: i,
      forceLoginGatewayUrl: a,
      gatewayScreenLocked: l,
      showPastePrompt: c,
      pastedCode: u,
      setPastedCode: d,
      cursorOffset: p,
      setCursorOffset: m,
      textInputColumns: f,
      handleSubmitCode: A,
      setOAuthStatus: h,
      setLoginWithClaudeAi: g
    } = e;
  switch (n.state) {
    case "idle":
      {
        let _ = o ? o : "Claude Code can be used with your Claude subscription or billed based on API usage through your Console account.",
          y;
        if (t[0] !== _) y = vi.default.createElement(Text, {
          bold: !0
        }, _), t[0] = _, t[1] = y;else y = t[1];
        let T;
        if (t[2] !== i) T = i && vi.default.createElement(Text, {
          color: "warning"
        }, i), t[2] = i, t[3] = T;else T = t[3];
        let S;
        if (t[4] === Symbol.for("react.memo_cache_sentinel")) S = vi.default.createElement(Text, null, "Select login method:"), t[4] = S;else S = t[4];
        let v;
        if (t[5] === Symbol.for("react.memo_cache_sentinel")) v = {
          label: vi.default.createElement(Text, null, "Claude account with subscription \xB7", " ", vi.default.createElement(Text, {
            dimColor: !0
          }, "Pro, Max, Team, or Enterprise"), !1),
          value: "claudeai"
        }, t[5] = v;else v = t[5];
        let R;
        if (t[6] === Symbol.for("react.memo_cache_sentinel")) R = {
          label: vi.default.createElement(Text, null, "Anthropic Console account \xB7", " ", vi.default.createElement(Text, {
            dimColor: !0
          }, "API usage billing")),
          value: "console"
        }, t[6] = R;else R = t[6];
        let k;
        if (t[7] === Symbol.for("react.memo_cache_sentinel")) k = [v, R, {
          label: vi.default.createElement(Text, null, "3rd-party platform \xB7", " ", vi.default.createElement(Text, {
            dimColor: !0
          }, "Amazon Bedrock, Microsoft Foundry, or Vertex AI")),
          value: "platform"
        }], t[7] = k;else k = t[7];
        let x;
        if (t[8] !== g || t[9] !== h) x = vi.default.createElement(Box, null, vi.default.createElement(pr, {
          options: k,
          onChange: I => {
            if (I === "platform") logEvent("tengu_oauth_platform_selected", {}), h({
              state: "platform_setup"
            });else if (h({
              state: "ready_to_start"
            }), I === "claudeai") logEvent("tengu_oauth_claudeai_selected", {}), g(!0);else logEvent("tengu_oauth_console_selected", {}), g(!1);
          }
        })), t[8] = g, t[9] = h, t[10] = x;else x = t[10];
        let H;
        if (t[11] !== y || t[12] !== T || t[13] !== x) H = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, y, T, S, x), t[11] = y, t[12] = T, t[13] = x, t[14] = H;else H = t[14];
        return H;
      }
    case "gateway_setup":
      return null;
    case "gateway_done":
      {
        let _;
        if (t[23] === Symbol.for("react.memo_cache_sentinel")) _ = vi.default.createElement(Text, {
          color: "success"
        }, "Connected to Cloud gateway."), t[23] = _;else _ = t[23];
        let y;
        if (t[24] === Symbol.for("react.memo_cache_sentinel")) y = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1,
          marginTop: 1
        }, _, vi.default.createElement(Text, {
          dimColor: !0
        }, "Press ", vi.default.createElement(Text, {
          bold: !0
        }, "Enter"), " to restart Claude Code.")), t[24] = y;else y = t[24];
        return y;
      }
    case "platform_setup":
      {
        let _;
        if (t[25] === Symbol.for("react.memo_cache_sentinel")) _ = vi.default.createElement(Text, {
          bold: !0
        }, "Using 3rd-party platforms"), t[25] = _;else _ = t[25];
        let y;
        if (t[26] === Symbol.for("react.memo_cache_sentinel")) y = {
          label: vi.default.createElement(Text, null, "Amazon Bedrock \xB7 ", vi.default.createElement(Text, {
            dimColor: !0
          }, "interactive setup")),
          value: "bedrock"
        }, t[26] = y;else y = t[26];
        let T;
        if (t[27] === Symbol.for("react.memo_cache_sentinel")) T = {
          label: vi.default.createElement(Text, null, "Microsoft Foundry \xB7 ", vi.default.createElement(Text, {
            dimColor: !0
          }, "opens docs")),
          value: "foundry"
        }, t[27] = T;else T = t[27];
        let S;
        if (t[28] === Symbol.for("react.memo_cache_sentinel")) S = [y, T, {
          label: vi.default.createElement(Text, null, "Google Vertex AI \xB7 ", vi.default.createElement(Text, {
            dimColor: !0
          }, "interactive setup")),
          value: "vertex"
        }, {
          label: "Go back",
          value: "back"
        }], t[28] = S;else S = t[28];
        let v;
        if (t[29] !== h) v = vi.default.createElement(pr, {
          options: S,
          onChange: x => {
            e: switch (x) {
              case "bedrock":
                {
                  logEvent("tengu_oauth_bedrock_wizard_launched", {}), h({
                    state: "bedrock_wizard"
                  });
                  break e;
                }
              case "foundry":
                {
                  logEvent("tengu_oauth_platform_docs_opened", {
                    platform: Qe("foundry")
                  }), Oc("https://code.claude.com/docs/en/microsoft-foundry"), h({
                    state: "idle"
                  });
                  break e;
                }
              case "vertex":
                {
                  logEvent("tengu_oauth_vertex_wizard_launched", {}), h({
                    state: "vertex_wizard"
                  });
                  break e;
                }
              default:
                h({
                  state: "idle"
                });
            }
          },
          onCancel: () => h({
            state: "idle"
          })
        }), t[29] = h, t[30] = v;else v = t[30];
        let R;
        if (t[31] === Symbol.for("react.memo_cache_sentinel")) R = vi.default.createElement(Text, {
          dimColor: !0
        }, "Foundry: ", vi.default.createElement(Link, {
          url: "https://code.claude.com/docs/en/microsoft-foundry"
        }, "https://code.claude.com/docs/en/microsoft-foundry")), t[31] = R;else R = t[31];
        let k;
        if (t[32] !== v) k = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, _, v, R), t[32] = v, t[33] = k;else k = t[33];
        return k;
      }
    case "bedrock_wizard":
      {
        let _;
        if (t[34] !== h) _ = vi.default.createElement(PBn, {
          onComplete: y => h({
            state: "bedrock_done",
            message: y
          }),
          onCancel: () => h({
            state: "platform_setup"
          })
        }), t[34] = h, t[35] = _;else _ = t[35];
        return _;
      }
    case "bedrock_done":
    case "vertex_done":
      {
        let _;
        if (t[36] !== n.message) _ = vi.default.createElement(Text, {
          color: "success"
        }, n.message), t[36] = n.message, t[37] = _;else _ = t[37];
        let y;
        if (t[38] === Symbol.for("react.memo_cache_sentinel")) y = vi.default.createElement(Text, {
          dimColor: !0
        }, "Press ", vi.default.createElement(Text, {
          bold: !0
        }, "Enter"), " to restart Claude Code."), t[38] = y;else y = t[38];
        let T;
        if (t[39] !== _) T = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, _, y), t[39] = _, t[40] = T;else T = t[40];
        return T;
      }
    case "vertex_wizard":
      {
        let _;
        if (t[41] !== h) _ = vi.default.createElement(MBn, {
          onComplete: y => h({
            state: "vertex_done",
            message: y
          }),
          onCancel: () => h({
            state: "platform_setup"
          })
        }), t[41] = h, t[42] = _;else _ = t[42];
        return _;
      }
    case "waiting_for_login":
      {
        let _;
        if (t[43] !== s) _ = s && vi.default.createElement(Box, null, vi.default.createElement(Text, {
          dimColor: !0
        }, s)), t[43] = s, t[44] = _;else _ = t[44];
        let y;
        if (t[45] !== c) y = !c && vi.default.createElement(Box, null, vi.default.createElement(tp, null), vi.default.createElement(Text, null, "Opening browser to sign in…")), t[45] = c, t[46] = y;else y = t[46];
        let T;
        if (t[47] !== p || t[48] !== A || t[49] !== n.url || t[50] !== u || t[51] !== m || t[52] !== d || t[53] !== c || t[54] !== f) T = c && vi.default.createElement(Box, null, vi.default.createElement(Text, null, n0a), vi.default.createElement(Pa, {
          value: u,
          onChange: d,
          onSubmit: v => A(v, n.url),
          cursorOffset: p,
          onChangeCursorOffset: m,
          columns: f,
          mask: "*"
        })), t[47] = p, t[48] = A, t[49] = n.url, t[50] = u, t[51] = m, t[52] = d, t[53] = c, t[54] = f, t[55] = T;else T = t[55];
        let S;
        if (t[56] !== _ || t[57] !== y || t[58] !== T) S = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, _, y, T), t[56] = _, t[57] = y, t[58] = T, t[59] = S;else S = t[59];
        return S;
      }
    case "creating_api_key":
      {
        let _;
        if (t[60] === Symbol.for("react.memo_cache_sentinel")) _ = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, vi.default.createElement(Box, null, vi.default.createElement(tp, null), vi.default.createElement(Text, null, "Creating API key for Claude Code…"))), t[60] = _;else _ = t[60];
        return _;
      }
    case "about_to_retry":
      {
        let _;
        if (t[61] === Symbol.for("react.memo_cache_sentinel")) _ = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, vi.default.createElement(Text, {
          color: "permission"
        }, "Retrying…")), t[61] = _;else _ = t[61];
        return _;
      }
    case "success":
      {
        let _;
        if (t[62] !== r || t[63] !== n.token) _ = r === "setup-token" && n.token ? null : vi.default.createElement(vi.default.Fragment, null, getOauthAccountInfo()?.emailAddress ? vi.default.createElement(Text, {
          dimColor: !0
        }, "Logged in as", " ", vi.default.createElement(Text, null, getOauthAccountInfo()?.emailAddress)) : null, vi.default.createElement(Text, {
          color: "success"
        }, "Login successful. Press ", vi.default.createElement(Text, {
          bold: !0
        }, "Enter"), " to continue…")), t[62] = r, t[63] = n.token, t[64] = _;else _ = t[64];
        let y;
        if (t[65] !== _) y = vi.default.createElement(Box, {
          flexDirection: "column"
        }, _), t[65] = _, t[66] = y;else y = t[66];
        return y;
      }
    case "error":
      {
        let _;
        if (t[67] !== n.message) _ = vi.default.createElement(Text, {
          color: "error"
        }, "OAuth error: ", n.message), t[67] = n.message, t[68] = _;else _ = t[68];
        let y;
        if (t[69] !== n.toRetry) y = n.toRetry && vi.default.createElement(Box, {
          marginTop: 1
        }, vi.default.createElement(Text, {
          color: "permission"
        }, "Press ", vi.default.createElement(Text, {
          bold: !0
        }, "Enter"), " to retry.")), t[69] = n.toRetry, t[70] = y;else y = t[70];
        let T;
        if (t[71] !== _ || t[72] !== y) T = vi.default.createElement(Box, {
          flexDirection: "column",
          gap: 1
        }, _, y), t[71] = _, t[72] = y, t[73] = T;else T = t[73];
        return T;
      }
    default:
      return null;
  }
}
var t0a,
  vi,
  n0a = "Paste code here if prompted > ";
var HUt = b(() => {
  Ct();
  Iat();
  Dc();
  pE();
  ki();
  lg();
  F4();
  ze();
  Ts();
  txe();
  mUt();
  M3e();
  Ao();
  b_();
  Qn();
  bt();
  Cv();
  Rn();
  yr();
  foo();
  Yl();
  rs();
  lS();
  SIa();
  _x();
  rh();
  Soo();
  t0a = M(rt(), 1), vi = M(Te(), 1);
});
export {r0a,ConsoleOAuthFlow,kAp,t0a,vi,n0a,HUt};
