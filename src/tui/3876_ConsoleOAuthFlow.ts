// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {Ohe,rS} from "../../vendor/m2582.ts";
import {getSettings_DEPRECATED as $o,getSettingsForSource as An,getPolicySettingsOrigin as Qpe,br} from "../config/0745_updateSettingsForSource.ts";
import {isAdminPolicyOrigin as lYe} from "../config/0740_settings.ts";
import {bz,i4} from "../../vendor/m2426.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {XW,J4e} from "../telemetry/3768_codeChallenge.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {useApp as c4} from "../../vendor/m2452.ts";
import {saveGlobalConfig as hn,checkHasTrustDialogAccepted as kd,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Cqe,Eqe} from "../../vendor/m3874.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS as s1e,Sc} from "../api/0465_getOauthConfig.ts";
import {Uke,$ke} from "../../vendor/m2752.ts";
import {aO,IA} from "../telemetry/2225_names.ts";
import {installOAuthTokens as uqe,Ict} from "../config/3782_installOAuthTokens.ts";
import {validateForceLoginOrg as Ise,getConfiguredAwsAuthRefresh as $Be,isAwsAuthRefreshFromProjectSettings as txt,refreshAwsAuth as qyn,clearAwsCredentialsCache as wse,resetAwsAuthRefreshCooldown as gZe,getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {jle,W$t} from "../telemetry/3827_configured_channel.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {gd,xw} from "./3853_mode.ts";
import {d2n,Llo} from "../../vendor/m3828.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Ve} from "../../vendor/m5.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {I2n,tco} from "../../vendor/m3860.ts";
import {M2n,uco} from "../../vendor/m3872.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {je} from "../../vendor/m2462.ts";
import {K1a} from "../../vendor/m3861.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * ConsoleOAuthFlow — interactive OAuth / login flow for Claude Code (v2.1.190).
 *
 * Renders the terminal login UI: method selection (Claude subscription, Anthropic
 * Console, 3rd-party platforms), browser-based OAuth, manual auth-code paste,
 * setup-token (long-lived OAuth token) generation, and the Bedrock/Vertex/Foundry
 * platform wizards plus the AWS credential-refresh sub-flow.
 *
 * Structure is 1:1 with the reverse-engineered minified module; only local
 * identifiers, TS types and comments have been restored.
 */
var consoleOAuthFlowExports = {};
ft(consoleOAuthFlowExports, {
  ConsoleOAuthFlow: () => ConsoleOAuthFlow
});
/**
 * @param props.onDone           Called when the flow is finished/dismissed.
 * @param props.onAuthSuccess    Optional callback fired on successful auth.
 * @param props.startingMessage  Optional intro message shown on the idle screen.
 * @param props.mode             "login" (default) or "setup-token".
 * @param props.forceLoginMethod Pre-selected login method override.
 * @param props.urlOutdent       Horizontal outdent applied to the copyable URL box.
 */
function ConsoleOAuthFlow({
  onDone,
  onAuthSuccess,
  startingMessage,
  mode = "login",
  forceLoginMethod,
  urlOutdent = 0
}) {
  let urlMarginX = (ZS() ? Ohe : 0) + urlOutdent,
    settings = $o() || {},
    policySettings = An("policySettings"),
    isManagedPolicy = lYe(Qpe()),
    gatewayForcedByPolicy = isManagedPolicy && policySettings?.forceLoginMethod === "gateway",
    forcedGatewayUrl = isManagedPolicy ? policySettings?.forceLoginGatewayUrl : void 0,
    settingsForcedMethod = settings.forceLoginMethod === "gateway" && !gatewayForcedByPolicy ? void 0 : settings.forceLoginMethod,
    resolvedLoginMethod = forceLoginMethod ?? settingsForcedMethod,
    isGatewayFlow = resolvedLoginMethod === "gateway" || forcedGatewayUrl !== void 0,
    forcedMethodMessage = resolvedLoginMethod === "claudeai" ? "Login method pre-selected: Subscription Plan (Claude Pro/Max)" : resolvedLoginMethod === "console" ? "Login method pre-selected: API usage billing (Anthropic Console)" : null,
    gatewayUnsupportedWarning = isGatewayFlow ? "Gateway login is configured in managed settings, but this Claude Code build does not include Cloud gateway support." : null,
    notificationTarget = bz(),
    clock = As(),
    [oauthStatus, setOAuthStatus] = oL.useState(() => {
      if (mode === "setup-token") return {
        state: "ready_to_start"
      };
      if (resolvedLoginMethod === "claudeai" || resolvedLoginMethod === "console") return {
        state: "ready_to_start"
      };
      return {
        state: "idle"
      };
    }),
    [pastedCode, setPastedCode] = oL.useState(""),
    [cursorOffset, setCursorOffset] = oL.useState(0),
    [oauthFlow] = oL.useState(() => new XW()),
    [loginWithClaudeAi, setLoginWithClaudeAi] = oL.useState(() => mode === "setup-token" || resolvedLoginMethod === "claudeai"),
    methodMismatch = settings.forceLoginMethod !== void 0 && loginWithClaudeAi !== (settings.forceLoginMethod === "claudeai"),
    forcedOrgUUID = typeof settings.forceLoginOrgUUID === "string" && !methodMismatch ? settings.forceLoginOrgUUID : void 0,
    [showPastePrompt, setShowPastePrompt] = oL.useState(!1),
    [copied, setCopied] = oL.useState(!1),
    textInputColumns = _r().columns - wNa.length - 1;
  oL.useEffect(() => {
    if (resolvedLoginMethod === "claudeai") W("tengu_oauth_claudeai_forced", {});else if (resolvedLoginMethod === "console") W("tengu_oauth_console_forced", {});
  }, [resolvedLoginMethod, isGatewayFlow, mode]), md(() => {
    if (oauthStatus.state === "about_to_retry") setOAuthStatus(oauthStatus.nextState);
  }, oauthStatus.state === "about_to_retry" ? 1000 : null, [oauthStatus]), Or("confirm:yes", () => {
    W(oauthStatus.state === "gateway_done" ? "tengu_oauth_gateway_done" : "tengu_oauth_success", {
      loginWithClaudeAi
    }), onDone();
  }, {
    context: "Confirmation",
    isActive: oauthStatus.state === "success" && mode !== "setup-token" || oauthStatus.state === "gateway_done"
  });
  let app = c4();
  Or("confirm:yes", () => {
    hn(prev => ({
      ...prev,
      hasCompletedOnboarding: !0,
      lastOnboardingVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    })), app.exit(), Promise.resolve().then(() => (Cqe(), Eqe)).then(mod => mod.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: oauthStatus.state === "bedrock_done" || oauthStatus.state === "vertex_done"
  }), Or("confirm:yes", () => setOAuthStatus({
    state: "platform_setup"
  }), {
    context: "Confirmation",
    isActive: oauthStatus.state === "aws_refresh_done"
  }), Or("confirm:yes", () => {
    if (oauthStatus.state === "error" && oauthStatus.toRetry) setPastedCode(""), setOAuthStatus({
      state: "about_to_retry",
      nextState: oauthStatus.toRetry
    });
  }, {
    context: "Confirmation",
    isActive: oauthStatus.state === "error" && !!oauthStatus.toRetry
  }), oL.useEffect(() => {
    if (pastedCode === "c" && oauthStatus.state === "waiting_for_login" && showPastePrompt && !copied) sw(oauthStatus.url).then(out => {
      if (out) process.stdout.write(out);
      setCopied(!0), clock.setTimeout(() => setCopied(!1), 2000);
    }), setPastedCode("");
  }, [pastedCode, oauthStatus, showPastePrompt, copied, clock]);
  /** Validate and submit a manually pasted "code#state" auth code. */
  async function handleSubmitCode(code, url) {
    try {
      let [authorizationCode, state] = code.split("#");
      if (!authorizationCode || !state) {
        setOAuthStatus({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url
          }
        });
        return;
      }
      W("tengu_oauth_manual_entry", {}), oauthFlow.handleManualAuthCodeInput({
        authorizationCode,
        state
      });
    } catch (err) {
      Ie(err), setOAuthStatus({
        state: "error",
        message: Ce(err),
        toRetry: {
          state: "waiting_for_login",
          url
        }
      });
    }
  }
  let startLogin = oL.useCallback(async () => {
      try {
        W("tengu_oauth_flow_start", {
          loginWithClaudeAi
        });
        let tokens = await oauthFlow.startOAuthFlow(async url => {
          setOAuthStatus({
            state: "waiting_for_login",
            url
          }), clock.setTimeout(() => setShowPastePrompt(!0), 3000);
        }, {
          loginWithClaudeAi,
          inferenceOnly: mode === "setup-token",
          expiresIn: mode === "setup-token" ? s1e : void 0,
          orgUUID: forcedOrgUUID
        }).catch(err => {
          let isTokenExchangeFailure = err.message.includes("Token exchange failed"),
            sslError = Uke(err);
          throw setOAuthStatus({
            state: "error",
            message: sslError ?? (isTokenExchangeFailure ? "Failed to exchange authorization code for access token. Please try again." : err.message),
            toRetry: mode === "setup-token" ? {
              state: "ready_to_start"
            } : {
              state: "idle"
            }
          }), W("tengu_oauth_token_exchange_error", {
            ...aO(err),
            ssl_error: sslError !== null
          }), err;
        });
        if (mode === "setup-token") setOAuthStatus({
          state: "success",
          token: tokens.accessToken
        }), onAuthSuccess?.();else {
          await uqe(tokens);
          let validation = await Ise();
          if (!validation.valid) throw Error(validation.message);
          setOAuthStatus({
            state: "success"
          }), onAuthSuccess?.(), jle({
            message: "Claude Code login successful",
            notificationType: "auth_success"
          }, notificationTarget);
        }
      } catch (err) {
        let message = Ce(err),
          sslError = Uke(err);
        setOAuthStatus({
          state: "error",
          message: sslError ?? message,
          toRetry: {
            state: mode === "setup-token" ? "ready_to_start" : "idle"
          }
        }), W("tengu_oauth_error", {
          ...aO(err),
          ssl_error: sslError !== null
        });
      }
    }, [oauthFlow, loginWithClaudeAi, mode, forcedOrgUUID, notificationTarget, clock, onAuthSuccess]),
    loginStartedRef = oL.useRef(!1);
  return oL.useEffect(() => {
    if (oauthStatus.state === "ready_to_start" && !loginStartedRef.current) loginStartedRef.current = !0, process.nextTick((run, ref) => {
      run().finally(() => {
        ref.current = !1;
      });
    }, startLogin, loginStartedRef);
  }, [oauthStatus.state, startLogin]), md(() => {
    W("tengu_oauth_success", {
      loginWithClaudeAi
    }), onDone();
  }, mode === "setup-token" && oauthStatus.state === "success" ? 500 : null, [mode, oauthStatus, loginWithClaudeAi, onDone]), oL.useEffect(() => () => {
    oauthFlow.cleanup();
  }, [oauthFlow]), pi.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [oauthStatus.state === "waiting_for_login" && showPastePrompt && pi.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingBottom: 1,
      children: [pi.jsxs($, {
        children: [pi.jsxs(v, {
          dimColor: !0,
          children: ["Browser didn't open? Use the url below to sign in", " "]
        }), copied ? pi.jsx(v, {
          color: "success",
          children: "(Copied!)"
        }) : pi.jsx(v, {
          dimColor: !0,
          children: pi.jsx(at, {
            chord: "c",
            action: "copy",
            parens: !0
          })
        })]
      }), pi.jsx($, {
        marginX: urlMarginX ? -urlMarginX : void 0,
        children: pi.jsx(Ss, {
          url: oauthStatus.url,
          children: pi.jsx(v, {
            dimColor: !0,
            children: oauthStatus.url
          })
        })
      })]
    }, "urlToCopy"), mode === "setup-token" && oauthStatus.state === "success" && oauthStatus.token && pi.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingTop: 1,
      children: [pi.jsx(v, {
        color: "success",
        children: "✓ Long-lived authentication token created successfully!"
      }), pi.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [pi.jsx(v, {
          children: "Your OAuth token (valid for 1 year):"
        }), pi.jsx(v, {
          color: "warning",
          children: oauthStatus.token
        }), pi.jsx(v, {
          dimColor: !0,
          children: "Store this token securely. You won't be able to see it again."
        }), pi.jsx(v, {
          dimColor: !0,
          children: "Use this token by setting: export CLAUDE_CODE_OAUTH_TOKEN=<token>"
        })]
      })]
    }, "tokenOutput"), pi.jsx($, {
      flexDirection: "column",
      gap: 1,
      children: pi.jsx(Tvp, {
        oauthStatus,
        mode,
        startingMessage,
        forcedMethodMessage,
        gatewayUnsupportedWarning,
        forceLoginGatewayUrl: forcedGatewayUrl,
        gatewayScreenLocked: resolvedLoginMethod === "gateway",
        showPastePrompt,
        pastedCode,
        setPastedCode,
        cursorOffset,
        setCursorOffset,
        textInputColumns,
        handleSubmitCode,
        setOAuthStatus,
        setLoginWithClaudeAi,
        onAuthSuccess
      })
    })]
  });
}
/** Runs the AWS credential refresh and reports completion via onComplete. */
function yvp(props) {
  let $memo = pco.c(4),
    {
      onComplete
    } = props,
    runEffect;
  if ($memo[0] !== onComplete) runEffect = () => {
    let awsConfig = $Be();
    if (!awsConfig) {
      onComplete(!1);
      return;
    }
    if (txt() && !kd()) {
      onComplete(!1);
      return;
    }
    let abortController = new AbortController();
    return qyn(awsConfig, abortController.signal).then(ok => {
      if (abortController.signal.aborted) return;
      if (ok) wse(), gZe();
      onComplete(ok);
    }), () => abortController.abort();
  }, $memo[0] = onComplete, $memo[1] = runEffect;else runEffect = $memo[1];
  let effectDeps;
  if ($memo[2] === Symbol.for("react.memo_cache_sentinel")) effectDeps = [], $memo[2] = effectDeps;else effectDeps = $memo[2];
  oL.useEffect(runEffect, effectDeps);
  let element;
  if ($memo[3] === Symbol.for("react.memo_cache_sentinel")) element = pi.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [pi.jsxs($, {
      children: [pi.jsx(gd, {}), pi.jsx(v, {
        children: "Running awsAuthRefresh…"
      })]
    }), pi.jsx(d2n, {})]
  }), $memo[3] = element;else element = $memo[3];
  return element;
}
/** Renders the current OAuth status screen for a given oauthStatus.state. */
function Tvp(props) {
  let $memo = pco.c(85),
    {
      oauthStatus,
      mode,
      startingMessage,
      forcedMethodMessage,
      gatewayUnsupportedWarning,
      forceLoginGatewayUrl,
      gatewayScreenLocked,
      showPastePrompt,
      pastedCode,
      setPastedCode,
      cursorOffset,
      setCursorOffset,
      textInputColumns,
      handleSubmitCode,
      setOAuthStatus,
      setLoginWithClaudeAi,
      onAuthSuccess
    } = props;
  switch (oauthStatus.state) {
    case "idle":
      {
        let introMessage = startingMessage ? startingMessage : "Claude Code can be used with your Claude subscription or billed based on API usage through your Console account.",
          introNode;
        if ($memo[0] !== introMessage) introNode = pi.jsx(v, {
          bold: !0,
          children: introMessage
        }), $memo[0] = introMessage, $memo[1] = introNode;else introNode = $memo[1];
        let warningNode;
        if ($memo[2] !== gatewayUnsupportedWarning) warningNode = gatewayUnsupportedWarning && pi.jsx(v, {
          color: "warning",
          children: gatewayUnsupportedWarning
        }), $memo[2] = gatewayUnsupportedWarning, $memo[3] = warningNode;else warningNode = $memo[3];
        let promptNode;
        if ($memo[4] === Symbol.for("react.memo_cache_sentinel")) promptNode = pi.jsx(v, {
          children: "Select login method:"
        }), $memo[4] = promptNode;else promptNode = $memo[4];
        let claudeAiOption;
        if ($memo[5] === Symbol.for("react.memo_cache_sentinel")) claudeAiOption = {
          label: pi.jsxs(v, {
            children: ["Claude account with subscription \xB7", " ", pi.jsx(v, {
              dimColor: !0,
              children: "Pro, Max, Team, or Enterprise"
            }), !1]
          }),
          value: "claudeai"
        }, $memo[5] = claudeAiOption;else claudeAiOption = $memo[5];
        let consoleOption;
        if ($memo[6] === Symbol.for("react.memo_cache_sentinel")) consoleOption = {
          label: pi.jsxs(v, {
            children: ["Anthropic Console account \xB7", " ", pi.jsx(v, {
              dimColor: !0,
              children: "API usage billing"
            })]
          }),
          value: "console"
        }, $memo[6] = consoleOption;else consoleOption = $memo[6];
        let loginOptions;
        if ($memo[7] === Symbol.for("react.memo_cache_sentinel")) loginOptions = [claudeAiOption, consoleOption, {
          label: pi.jsxs(v, {
            children: ["3rd-party platform \xB7", " ", pi.jsx(v, {
              dimColor: !0,
              children: "Amazon Bedrock, Microsoft Foundry, or Vertex AI"
            })]
          }),
          value: "platform"
        }], $memo[7] = loginOptions;else loginOptions = $memo[7];
        let selectNode;
        if ($memo[8] !== setLoginWithClaudeAi || $memo[9] !== setOAuthStatus) selectNode = pi.jsx($, {
          children: pi.jsx(hr, {
            options: loginOptions,
            onChange: selected => {
              if (selected === "platform") W("tengu_oauth_platform_selected", {}), setOAuthStatus({
                state: "platform_setup"
              });else if (setOAuthStatus({
                state: "ready_to_start"
              }), selected === "claudeai") W("tengu_oauth_claudeai_selected", {}), setLoginWithClaudeAi(!0);else W("tengu_oauth_console_selected", {}), setLoginWithClaudeAi(!1);
            }
          })
        }), $memo[8] = setLoginWithClaudeAi, $memo[9] = setOAuthStatus, $memo[10] = selectNode;else selectNode = $memo[10];
        let idleNode;
        if ($memo[11] !== introNode || $memo[12] !== warningNode || $memo[13] !== selectNode) idleNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [introNode, warningNode, promptNode, selectNode]
        }), $memo[11] = introNode, $memo[12] = warningNode, $memo[13] = selectNode, $memo[14] = idleNode;else idleNode = $memo[14];
        return idleNode;
      }
    case "gateway_setup":
      return null;
    case "gateway_done":
      {
        let connectedNode;
        if ($memo[25] === Symbol.for("react.memo_cache_sentinel")) connectedNode = pi.jsx(v, {
          color: "success",
          children: "Connected to Cloud gateway."
        }), $memo[25] = connectedNode;else connectedNode = $memo[25];
        let gatewayDoneNode;
        if ($memo[26] === Symbol.for("react.memo_cache_sentinel")) gatewayDoneNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          marginTop: 1,
          children: [connectedNode, pi.jsxs(v, {
            dimColor: !0,
            children: ["Press ", pi.jsx(v, {
              bold: !0,
              children: "Enter"
            }), " to continue."]
          })]
        }), $memo[26] = gatewayDoneNode;else gatewayDoneNode = $memo[26];
        return gatewayDoneNode;
      }
    case "platform_setup":
      {
        let awsRefreshAvailable;
        if ($memo[27] === Symbol.for("react.memo_cache_sentinel")) awsRefreshAvailable = $Be(), $memo[27] = awsRefreshAvailable;else awsRefreshAvailable = $memo[27];
        let hasAwsConfig = awsRefreshAvailable,
          headingNode;
        if ($memo[28] === Symbol.for("react.memo_cache_sentinel")) headingNode = pi.jsx(v, {
          bold: !0,
          children: "Using 3rd-party platforms"
        }), $memo[28] = headingNode;else headingNode = $memo[28];
        let bedrockOption, awsRefreshOptions;
        if ($memo[29] === Symbol.for("react.memo_cache_sentinel")) bedrockOption = {
          label: pi.jsxs(v, {
            children: ["Amazon Bedrock \xB7 ", pi.jsx(v, {
              dimColor: !0,
              children: "interactive setup"
            })]
          }),
          value: "bedrock"
        }, awsRefreshOptions = hasAwsConfig ? [{
          label: pi.jsxs(v, {
            children: ["Claude Platform on AWS \xB7", " ", pi.jsx(v, {
              dimColor: !0,
              children: "refresh credentials"
            })]
          }),
          value: "aws_refresh"
        }] : [], $memo[29] = bedrockOption, $memo[30] = awsRefreshOptions;else bedrockOption = $memo[29], awsRefreshOptions = $memo[30];
        let foundryOption;
        if ($memo[31] === Symbol.for("react.memo_cache_sentinel")) foundryOption = {
          label: pi.jsxs(v, {
            children: ["Microsoft Foundry \xB7 ", pi.jsx(v, {
              dimColor: !0,
              children: "opens docs"
            })]
          }),
          value: "foundry"
        }, $memo[31] = foundryOption;else foundryOption = $memo[31];
        let platformOptions;
        if ($memo[32] === Symbol.for("react.memo_cache_sentinel")) platformOptions = [bedrockOption, ...awsRefreshOptions, foundryOption, {
          label: pi.jsxs(v, {
            children: ["Google Vertex AI \xB7 ", pi.jsx(v, {
              dimColor: !0,
              children: "interactive setup"
            })]
          }),
          value: "vertex"
        }, {
          label: "Go back",
          value: "back"
        }], $memo[32] = platformOptions;else platformOptions = $memo[32];
        let platformSelectNode;
        if ($memo[33] !== setOAuthStatus) platformSelectNode = pi.jsx(hr, {
          options: platformOptions,
          onChange: selected => {
            e: switch (selected) {
              case "bedrock":
                {
                  W("tengu_oauth_bedrock_wizard_launched", {}), setOAuthStatus({
                    state: "bedrock_wizard"
                  });
                  break e;
                }
              case "aws_refresh":
                {
                  W("tengu_oauth_aws_refresh_launched", {}), setOAuthStatus({
                    state: "aws_refresh_running"
                  });
                  break e;
                }
              case "foundry":
                {
                  W("tengu_oauth_platform_docs_opened", {
                    platform: Ve("foundry")
                  }), Zl("https://code.claude.com/docs/en/microsoft-foundry"), setOAuthStatus({
                    state: "idle"
                  });
                  break e;
                }
              case "vertex":
                {
                  W("tengu_oauth_vertex_wizard_launched", {}), setOAuthStatus({
                    state: "vertex_wizard"
                  });
                  break e;
                }
              default:
                setOAuthStatus({
                  state: "idle"
                });
            }
          },
          onCancel: () => setOAuthStatus({
            state: "idle"
          })
        }), $memo[33] = setOAuthStatus, $memo[34] = platformSelectNode;else platformSelectNode = $memo[34];
        let foundryLinkNode;
        if ($memo[35] === Symbol.for("react.memo_cache_sentinel")) foundryLinkNode = pi.jsxs(v, {
          dimColor: !0,
          children: ["Foundry: ", pi.jsx(Ss, {
            url: "https://code.claude.com/docs/en/microsoft-foundry",
            children: "https://code.claude.com/docs/en/microsoft-foundry"
          })]
        }), $memo[35] = foundryLinkNode;else foundryLinkNode = $memo[35];
        let platformSetupNode;
        if ($memo[36] !== platformSelectNode) platformSetupNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [headingNode, platformSelectNode, foundryLinkNode]
        }), $memo[36] = platformSelectNode, $memo[37] = platformSetupNode;else platformSetupNode = $memo[37];
        return platformSetupNode;
      }
    case "aws_refresh_running":
      {
        let awsRefreshNode;
        if ($memo[38] !== setOAuthStatus) awsRefreshNode = pi.jsx(yvp, {
          onComplete: ok => setOAuthStatus({
            state: "aws_refresh_done",
            ok
          })
        }), $memo[38] = setOAuthStatus, $memo[39] = awsRefreshNode;else awsRefreshNode = $memo[39];
        return awsRefreshNode;
      }
    case "aws_refresh_done":
      {
        let resultNode;
        if ($memo[40] !== oauthStatus.ok) resultNode = oauthStatus.ok ? pi.jsx(v, {
          color: "success",
          children: "AWS credentials refreshed."
        }) : pi.jsx(v, {
          color: "error",
          children: "awsAuthRefresh failed. Check the command in your settings and try running it in a separate terminal."
        }), $memo[40] = oauthStatus.ok, $memo[41] = resultNode;else resultNode = $memo[41];
        let pressEnterNode;
        if ($memo[42] === Symbol.for("react.memo_cache_sentinel")) pressEnterNode = pi.jsxs(v, {
          dimColor: !0,
          children: ["Press ", pi.jsx(v, {
            bold: !0,
            children: "Enter"
          }), " to continue."]
        }), $memo[42] = pressEnterNode;else pressEnterNode = $memo[42];
        let awsRefreshDoneNode;
        if ($memo[43] !== resultNode) awsRefreshDoneNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [resultNode, pressEnterNode]
        }), $memo[43] = resultNode, $memo[44] = awsRefreshDoneNode;else awsRefreshDoneNode = $memo[44];
        return awsRefreshDoneNode;
      }
    case "bedrock_wizard":
      {
        let bedrockWizardNode;
        if ($memo[45] !== setOAuthStatus) bedrockWizardNode = pi.jsx(I2n, {
          onComplete: message => setOAuthStatus({
            state: "bedrock_done",
            message
          }),
          onCancel: () => setOAuthStatus({
            state: "platform_setup"
          })
        }), $memo[45] = setOAuthStatus, $memo[46] = bedrockWizardNode;else bedrockWizardNode = $memo[46];
        return bedrockWizardNode;
      }
    case "bedrock_done":
    case "vertex_done":
      {
        let doneMessageNode;
        if ($memo[47] !== oauthStatus.message) doneMessageNode = pi.jsx(v, {
          color: "success",
          children: oauthStatus.message
        }), $memo[47] = oauthStatus.message, $memo[48] = doneMessageNode;else doneMessageNode = $memo[48];
        let restartNode;
        if ($memo[49] === Symbol.for("react.memo_cache_sentinel")) restartNode = pi.jsxs(v, {
          dimColor: !0,
          children: ["Press ", pi.jsx(v, {
            bold: !0,
            children: "Enter"
          }), " to restart Claude Code."]
        }), $memo[49] = restartNode;else restartNode = $memo[49];
        let platformDoneNode;
        if ($memo[50] !== doneMessageNode) platformDoneNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [doneMessageNode, restartNode]
        }), $memo[50] = doneMessageNode, $memo[51] = platformDoneNode;else platformDoneNode = $memo[51];
        return platformDoneNode;
      }
    case "vertex_wizard":
      {
        let vertexWizardNode;
        if ($memo[52] !== setOAuthStatus) vertexWizardNode = pi.jsx(M2n, {
          onComplete: message => setOAuthStatus({
            state: "vertex_done",
            message
          }),
          onCancel: () => setOAuthStatus({
            state: "platform_setup"
          })
        }), $memo[52] = setOAuthStatus, $memo[53] = vertexWizardNode;else vertexWizardNode = $memo[53];
        return vertexWizardNode;
      }
    case "waiting_for_login":
      {
        let forcedMessageNode;
        if ($memo[54] !== forcedMethodMessage) forcedMessageNode = forcedMethodMessage && pi.jsx($, {
          children: pi.jsx(v, {
            dimColor: !0,
            children: forcedMethodMessage
          })
        }), $memo[54] = forcedMethodMessage, $memo[55] = forcedMessageNode;else forcedMessageNode = $memo[55];
        let openingBrowserNode;
        if ($memo[56] !== showPastePrompt) openingBrowserNode = !showPastePrompt && pi.jsxs($, {
          children: [pi.jsx(gd, {}), pi.jsx(v, {
            children: "Opening browser to sign in…"
          })]
        }), $memo[56] = showPastePrompt, $memo[57] = openingBrowserNode;else openingBrowserNode = $memo[57];
        let pasteInputNode;
        if ($memo[58] !== cursorOffset || $memo[59] !== handleSubmitCode || $memo[60] !== oauthStatus.url || $memo[61] !== pastedCode || $memo[62] !== setCursorOffset || $memo[63] !== setPastedCode || $memo[64] !== showPastePrompt || $memo[65] !== textInputColumns) pasteInputNode = showPastePrompt && pi.jsxs($, {
          children: [pi.jsx(v, {
            children: wNa
          }), pi.jsx(ga, {
            value: pastedCode,
            onChange: setPastedCode,
            onSubmit: code => handleSubmitCode(code, oauthStatus.url),
            cursorOffset,
            onChangeCursorOffset: setCursorOffset,
            columns: textInputColumns,
            mask: "*"
          })]
        }), $memo[58] = cursorOffset, $memo[59] = handleSubmitCode, $memo[60] = oauthStatus.url, $memo[61] = pastedCode, $memo[62] = setCursorOffset, $memo[63] = setPastedCode, $memo[64] = showPastePrompt, $memo[65] = textInputColumns, $memo[66] = pasteInputNode;else pasteInputNode = $memo[66];
        let waitingNode;
        if ($memo[67] !== forcedMessageNode || $memo[68] !== openingBrowserNode || $memo[69] !== pasteInputNode) waitingNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [forcedMessageNode, openingBrowserNode, pasteInputNode]
        }), $memo[67] = forcedMessageNode, $memo[68] = openingBrowserNode, $memo[69] = pasteInputNode, $memo[70] = waitingNode;else waitingNode = $memo[70];
        return waitingNode;
      }
    case "creating_api_key":
      {
        let creatingNode;
        if ($memo[71] === Symbol.for("react.memo_cache_sentinel")) creatingNode = pi.jsx($, {
          flexDirection: "column",
          gap: 1,
          children: pi.jsxs($, {
            children: [pi.jsx(gd, {}), pi.jsx(v, {
              children: "Creating API key for Claude Code…"
            })]
          })
        }), $memo[71] = creatingNode;else creatingNode = $memo[71];
        return creatingNode;
      }
    case "about_to_retry":
      {
        let retryingNode;
        if ($memo[72] === Symbol.for("react.memo_cache_sentinel")) retryingNode = pi.jsx($, {
          flexDirection: "column",
          gap: 1,
          children: pi.jsx(v, {
            color: "permission",
            children: "Retrying…"
          })
        }), $memo[72] = retryingNode;else retryingNode = $memo[72];
        return retryingNode;
      }
    case "success":
      {
        let successContentNode;
        if ($memo[73] !== mode || $memo[74] !== oauthStatus.token) successContentNode = mode === "setup-token" && oauthStatus.token ? null : pi.jsxs(pi.Fragment, {
          children: [hc()?.emailAddress ? pi.jsxs(v, {
            dimColor: !0,
            children: ["Logged in as", " ", pi.jsx(v, {
              children: hc()?.emailAddress
            })]
          }) : null, pi.jsxs(v, {
            color: "success",
            children: ["Login successful. Press ", pi.jsx(v, {
              bold: !0,
              children: "Enter"
            }), " to continue…"]
          })]
        }), $memo[73] = mode, $memo[74] = oauthStatus.token, $memo[75] = successContentNode;else successContentNode = $memo[75];
        let successNode;
        if ($memo[76] !== successContentNode) successNode = pi.jsx($, {
          flexDirection: "column",
          children: successContentNode
        }), $memo[76] = successContentNode, $memo[77] = successNode;else successNode = $memo[77];
        return successNode;
      }
    case "error":
      {
        let errorMessageNode;
        if ($memo[78] !== oauthStatus.message) errorMessageNode = pi.jsxs(v, {
          color: "error",
          children: ["OAuth error: ", oauthStatus.message]
        }), $memo[78] = oauthStatus.message, $memo[79] = errorMessageNode;else errorMessageNode = $memo[79];
        let retryHintNode;
        if ($memo[80] !== oauthStatus.toRetry) retryHintNode = oauthStatus.toRetry && pi.jsx($, {
          marginTop: 1,
          children: pi.jsxs(v, {
            color: "permission",
            children: ["Press ", pi.jsx(v, {
              bold: !0,
              children: "Enter"
            }), " to retry."]
          })
        }), $memo[80] = oauthStatus.toRetry, $memo[81] = retryHintNode;else retryHintNode = $memo[81];
        let errorNode;
        if ($memo[82] !== errorMessageNode || $memo[83] !== retryHintNode) errorNode = pi.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [errorMessageNode, retryHintNode]
        }), $memo[82] = errorMessageNode, $memo[83] = retryHintNode, $memo[84] = errorNode;else errorNode = $memo[84];
        return errorNode;
      }
    default:
      return null;
  }
}
var pco,
  oL,
  pi,
  wNa = "Paste code here if prompted > ";
var n9t = b(() => {
  kt();
  Ict();
  Sc();
  SE();
  ui();
  hg();
  i4();
  je();
  ss();
  $ke();
  W$t();
  J4e();
  lo();
  Jg();
  tr();
  Ct();
  IA();
  vn();
  br();
  Llo();
  tco();
  Ol();
  Wo();
  rS();
  K1a();
  xw();
  rh();
  uco();
  pco = x(tt(), 1), oL = x(et(), 1), pi = x(oe(), 1);
});

export {consoleOAuthFlowExports as kNa,ConsoleOAuthFlow,yvp,Tvp,pco,oL,pi,wNa,n9t};
