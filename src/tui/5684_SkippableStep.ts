// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {isAnthropicAuthEnabled as aT,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bo} from "../../vendor/m5.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Gft,FVn} from "./4543_onThemeSelect.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {drr,jpc} from "../../vendor/m5682.ts";
import {Newline as l4} from "../../vendor/m2446.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {$pc,qpc} from "../../vendor/m5680.ts";
import {Mpc,Npc} from "../config/5679_headers.ts";
import {rA,dn} from "../config/0137_namespace.ts";
import {sF,XJe} from "../../vendor/m1297.ts";
import {getCustomApiKeyStatus as LKt,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {ApproveApiKey as Z2o,e$o} from "../../vendor/m5679.ts";
import {ConsoleOAuthFlow as Aqe,n9t} from "./3876_ConsoleOAuthFlow.ts";
import {shouldOfferTerminalSetup as H2e,setupTerminal as DRn,cwe} from "../../vendor/m2528.ts";
import {Ne} from "../../vendor/m583.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {xOe,KKt} from "../../vendor/m5266.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Xpc = {};
ft(Xpc, {
  SkippableStep: () => SkippableStep,
  Onboarding: () => Onboarding
});
/**
 * Onboarding flow component. Walks the user through a sequence of setup steps
 * (preflight/oauth, theme selection, optional API-key approval, security notes,
 * and optional terminal setup) and invokes `onDone` once the final step completes.
 */
function Onboarding({
  onDone: onDone
}) {
  let [stepIndex, setStepIndex] = jJ.useState(0),
    [oauthSkipped, setOauthSkipped] = jJ.useState(!1),
    [oauthEnabled] = jJ.useState(() => aT()),
    [theme, setTheme] = ji();
  jJ.useEffect(() => {
    W("tengu_began_setup", {
      oauthEnabled: oauthEnabled
    });
  }, [oauthEnabled]);
  /** Advance to the next onboarding step, or finish if on the last one. */
  function advanceStep() {
    if (stepIndex < steps.length - 1) {
      let nextIndex = stepIndex + 1;
      setStepIndex(nextIndex), W("tengu_onboarding_step", {
        oauthEnabled: oauthEnabled,
        stepId: Bo(steps[nextIndex]?.id)
      }), He("onboarding_step_complete");
    } else He("onboarding_complete"), onDone();
  }
  /** Persist the chosen theme and continue to the next step. */
  function handleThemeSelect(selectedTheme) {
    setTheme(selectedTheme), advanceStep();
  }
  let exitState = Df(),
    themeStep = af.jsx($, {
      marginX: 1,
      children: af.jsx(Gft, {
        onThemeSelect: handleThemeSelect,
        showIntroText: !0,
        helpText: "To change this later, run /theme",
        hideEscToCancel: !0,
        skipExitHandling: !0
      })
    }),
    securityStep = af.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1,
      children: [af.jsx(v, {
        bold: !0,
        children: "Security notes:"
      }), af.jsx($, {
        flexDirection: "column",
        width: 70,
        children: af.jsxs(drr, {
          children: [af.jsxs(drr.Item, {
            children: [af.jsx(v, {
              children: "Claude can make mistakes."
            }), af.jsxs(v, {
              dimColor: !0,
              wrap: "wrap",
              children: ["You're responsible for Claude's actions and should always", af.jsx(l4, {}), "review them, especially when running code.", af.jsx(l4, {})]
            })]
          }), af.jsxs(drr.Item, {
            children: [af.jsx(v, {
              children: "Due to prompt injection risks, only use it with code you trust"
            }), af.jsx(Sx, {
              url: "https://code.claude.com/docs/en/security"
            })]
          })]
        })
      }), af.jsx($pc, {})]
    }),
    preflightStep = af.jsx(Mpc, {
      onSuccess: advanceStep
    }),
    customApiKeyTruncated = jJ.useMemo(() => {
      if (!process.env.ANTHROPIC_API_KEY || rA()) return "";
      let truncatedKey = sF(process.env.ANTHROPIC_API_KEY);
      if (LKt(truncatedKey) === "new") return truncatedKey;
    }, []);
  /** Handle API-key approval result; record use of a custom key, then continue. */
  function handleApiKeyDone(usedCustomKey) {
    if (usedCustomKey) setOauthSkipped(!0);
    advanceStep();
  }
  let steps = [];
  if (oauthEnabled) steps.push({
    id: "preflight",
    component: preflightStep
  });
  if (steps.push({
    id: "theme",
    component: themeStep
  }), customApiKeyTruncated) steps.push({
    id: "api-key",
    component: af.jsx(Z2o, {
      customApiKeyTruncated: customApiKeyTruncated,
      onDone: handleApiKeyDone
    })
  });
  if (oauthEnabled) steps.push({
    id: "oauth",
    component: af.jsx(SkippableStep, {
      skip: oauthSkipped,
      onSkip: advanceStep,
      children: af.jsx($, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1,
        children: af.jsx(Aqe, {
          onDone: advanceStep,
          urlOutdent: 1
        })
      })
    })
  });
  if (steps.push({
    id: "security",
    component: securityStep
  }), H2e()) steps.push({
    id: "terminal-setup",
    component: af.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1,
      children: [af.jsx(v, {
        bold: !0,
        children: "Use Claude Code's terminal setup?"
      }), af.jsxs($, {
        flexDirection: "column",
        width: 70,
        gap: 1,
        children: [af.jsxs(v, {
          children: ["For the optimal coding experience, enable the recommended settings", af.jsx(l4, {}), "for your terminal:", " ", Ne.terminal === "Apple_Terminal" ? "Option+Enter for newlines and visual bell" : "Shift+Enter for newlines"]
        }), af.jsx(Bl, {
          confirmLabel: "Yes, use recommended settings",
          cancelLabel: "No, maybe later with /terminal-setup",
          onConfirm: () => void DRn(theme).then(() => He("onboarding_terminal_setup")).catch(() => xe("onboarding_terminal_setup", "onboarding_terminal_setup_failed")).finally(advanceStep),
          onCancel: advanceStep
        }), af.jsx(v, {
          dimColor: !0,
          children: exitState.pending ? af.jsxs(af.Fragment, {
            children: ["Press ", exitState.keyName, " again to exit"]
          }) : af.jsxs(bn, {
            children: [af.jsx(at, {
              chord: "enter",
              action: "confirm"
            }), af.jsx(at, {
              chord: "escape",
              action: "skip"
            })]
          })
        })]
      })]
    })
  });
  let currentStep = steps[stepIndex],
    handleConfirmYes = jJ.useCallback(() => {
      if (stepIndex === steps.length - 1) onDone();else advanceStep();
    }, [stepIndex, onDone, advanceStep]),
    handleConfirmNo = jJ.useCallback(() => {
      advanceStep();
    }, [advanceStep]);
  return Oo({
    "confirm:yes": handleConfirmYes
  }, {
    context: "Confirmation",
    isActive: currentStep?.id === "security"
  }), Oo({
    "confirm:no": handleConfirmNo
  }, {
    context: "Confirmation",
    isActive: currentStep?.id === "terminal-setup"
  }), af.jsxs($, {
    flexDirection: "column",
    children: [af.jsx(xOe, {}), af.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [currentStep?.component, exitState.pending && af.jsx($, {
        padding: 1,
        children: af.jsxs(v, {
          dimColor: !0,
          children: ["Press ", exitState.keyName, " again to exit"]
        })
      })]
    })]
  });
}
/**
 * Wrapper step that auto-skips itself when `skip` becomes true (calling `onSkip`),
 * otherwise renders its children. Uses a forget-compiler memo cache slot array.
 */
function SkippableStep(props) {
  let cache = Ypc.c(4),
    {
      skip: skip,
      onSkip: onSkip,
      children: children
    } = props,
    runSkipEffect,
    effectDeps;
  if (cache[0] !== onSkip || cache[1] !== skip) runSkipEffect = () => {
    if (skip) onSkip();
  }, effectDeps = [skip, onSkip], cache[0] = onSkip, cache[1] = skip, cache[2] = runSkipEffect, cache[3] = effectDeps;else runSkipEffect = cache[2], effectDeps = cache[3];
  if (jJ.useEffect(runSkipEffect, effectDeps), skip) return null;
  return children;
}
var Ypc, jJ, af;
var Qpc = b(() => {
  kt();
  cwe();
  TI();
  je();
  ss();
  mn();
  lo();
  XJe();
  tr();
  Ir();
  dn();
  Npc();
  e$o();
  n9t();
  Is();
  d_();
  fne();
  Wo();
  KKt();
  qpc();
  FVn();
  jpc();
  Ypc = x(tt(), 1), jJ = x(et(), 1), af = x(oe(), 1);
});

export {Xpc,Onboarding,SkippableStep,Ypc,jJ,af,Qpc};
