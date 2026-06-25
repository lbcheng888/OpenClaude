// @ts-nocheck
import {hot,$7r,got} from "../../vendor/m2763.ts";
import {zHn,q7r,yot} from "../../vendor/m2764.ts";
import {Oke,Pke,Tae,ej} from "../telemetry/2743_raw.ts";
import {Cdt,W3t,s3n} from "../telemetry/4016_openInBrowser.ts";
import {Pt,He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {setFableConsentDialogInteracted as Mbe,lt} from "../session/0132_sent.ts";
import {getFableDeclineFallbackModel as Dme,renderModelName as Tp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {initY_ as y_,bye} from "../../vendor/m4018.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {V3t,ExtraUsageDialog as wpo,PlainAwait as a3n,kpo} from "../tui/4020_PlainAwait.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Fable 5 usage-credits consent dialog.
 *
 * Renders a TUI flow that asks the user to switch to / continue on the Fable 5
 * model, which is billed via "usage credits". The component drives a small state
 * machine (`loading` -> `choose` -> `buy` / `buy-external` / `reenabling`) and
 * reports the outcome back to the caller through `onDone`.
 *
 * @param props.variant - Where the dialog was triggered from:
 *   "picker" | "mid-session" (affects titles and button copy).
 * @param props.onDone - Callback invoked with the user's decision
 *   ("consent" | "switch" | "dismiss", plus an optional message/payload).
 * @param props.startAtChooseForTesting - Test-only override that skips the
 *   async loading phase and starts directly in the "choose" state.
 */
function KGt({
  variant: variant,
  onDone: onDone,
  startAtChooseForTesting: startAtChooseForTesting
}) {
  let [state, setState] = sOe.useState(startAtChooseForTesting ? {
      s: "choose",
      blocked: !1,
      liveDefinite: !0,
      ...startAtChooseForTesting
    } : {
      s: "loading"
    }),
    /** Cached promise for the balance/overage lookup during "loading". */
    loadingPromiseRef = sOe.useRef(null),
    /** Cached promise for the external buy-credits flow. */
    buyExternalPromiseRef = sOe.useRef(null),
    /** Guards the very first onFocus so we don't fire a click sound on mount. */
    hasFocusedRef = sOe.useRef(!1);
  sOe.useEffect(() => {
    if (state.s === "loading") {
      let cancelled = !1;
      return loadingPromiseRef.current ??= Promise.all([hot().catch(() => null), zHn().catch(() => "unknown")]).then(([balance, overageStatus]) => ({
        balance: balance,
        overagesEnabled: overageStatus === "enabled" || overageStatus === "blocked" || overageStatus === "unknown" && Oke(),
        blocked: overageStatus === "blocked",
        liveDefinite: overageStatus !== "unknown"
      })), loadingPromiseRef.current.then(loaded => {
        if (cancelled) return;
        setState({
          s: "choose",
          ...loaded
        });
      }), () => {
        cancelled = !0;
      };
    }
    if (state.s === "buy-external") {
      let cancelled = !1;
      return buyExternalPromiseRef.current ??= Cdt(), buyExternalPromiseRef.current.then(result => {
        if (cancelled) return;
        Pt("model_fable_consent", "overage_enable_deferred"), onDone("dismiss", result.type === "message" ? result.value : result.opened ? `Opened ${result.url} in your browser to ${state.needsSetup ? "turn on" : "manage"} usage credits. Once ${state.needsSetup ? "enabled" : "topped up"}, run /model to switch to Fable 5.` : `Visit ${result.url} to ${state.needsSetup ? "turn on" : "manage"} usage credits. Once ${state.needsSetup ? "enabled" : "topped up"}, run /model to switch to Fable 5.`);
      }), () => {
        cancelled = !0;
      };
    }
  }, [state.s, onDone]);
  /** User accepted: enable credits and report consent. */
  function handleConsent() {
    Mbe(), Pke(), He("model_fable_consent"), onDone("consent");
  }
  /**
   * Route to the in-app buy flow or the external buy flow.
   * @param needsSetup - Whether usage credits are not yet set up.
   * @param skipLiveCheck - Skip the live balance re-check after setup.
   */
  function handleBuy(needsSetup, skipLiveCheck) {
    if (Mbe(), W3t()) setState({
      s: "buy",
      needsSetup: needsSetup,
      skipLiveCheck: needsSetup && skipLiveCheck
    });else setState({
      s: "buy-external",
      needsSetup: needsSetup
    });
  }
  /** Re-enable previously turned-off usage credits. */
  function handleReenable() {
    Mbe(), setState({
      s: "reenabling",
      work: q7r()
    });
  }
  /** User chose to switch away from Fable 5 / keep current model. */
  function handleSwitch() {
    xe("model_fable_consent", "declined"), onDone("switch");
  }
  /** User dismissed the dialog without deciding. */
  function handleDismiss() {
    Pt("model_fable_consent", "dismissed"), onDone("dismiss");
  }
  let fallbackModel = Dme(),
    switchLabel = variant === "mid-session" && fallbackModel !== null ? `Switch to ${Tp(fallbackModel)} and continue` : variant === "mid-session" ? "Not now" : "No, keep my current model",
    overLimit = variant === "mid-session" && !Tae(),
    title = variant === "picker" ? "Switch to Fable 5?" : overLimit ? "You've reached your Fable 5 limit" : "Fable 5 now uses usage credits";
  switch (state.s) {
    case "loading":
      return jw.jsx(Jn, {
        title: title,
        color: "warning",
        onCancel: handleDismiss,
        children: jw.jsx(Hc, {
          message: "Checking usage credits…"
        })
      });
    case "choose":
      {
        let {
            balance: balance,
            overagesEnabled: overagesEnabled,
            blocked: blocked,
            liveDefinite: liveDefinite
          } = state,
          /** Available credit amount (defaults to 0). */
          creditAmount = balance?.amount ?? 0,
          /** Credit currency code (defaults to USD). */
          currency = balance?.currency ?? "USD",
          /** Credits are turned off / not yet enabled. */
          creditsOff = !overagesEnabled,
          /** Credits are off but a positive balance exists -> re-enable. */
          canReenable = creditsOff && creditAmount > 0,
          /** Credits enabled but balance unknown (null). */
          enabledUnknownBalance = overagesEnabled && balance === null,
          /** Credits enabled with a positive balance. */
          enabledWithBalance = overagesEnabled && creditAmount > 0,
          /** Eligible to continue on Fable 5 right now (not blocked, has/unknown credits). */
          canContinue = !blocked && (enabledWithBalance || enabledUnknownBalance),
          /** Whether the in-app purchase flow is available. */
          inAppBuyAvailable = W3t(),
          /** Label for the "go manage credits elsewhere" action. */
          manageLabel = oE() ? creditsOff ? "Set up usage credits on claude.ai" : "Manage usage credits on claude.ai" : creditsOff ? "Request usage credits from your admin" : "Request more from your admin",
          /** Base sentence describing the usage-credits model. */
          baseExplanation = overLimit ? "You've used your included Fable 5 usage for this week. Continuing on Fable 5 uses usage credits" : "Fable 5 runs on usage credits",
          /** Full explanation message shown in the dialog body. */
          explanationMessage = creditsOff && !canReenable || enabledUnknownBalance ? `${baseExplanation}, purchased separately from your plan.` : `${baseExplanation} — you have ${y_(enabledWithBalance || canReenable ? creditAmount : 0, currency)} in credits.`,
          /** Primary confirm-button label, depending on credit state. */
          confirmLabel = canContinue ? "Continue with Fable 5" : canReenable && inAppBuyAvailable ? "Yes, re-enable and continue" : inAppBuyAvailable ? creditsOff ? "Yes, buy usage credits" : "Buy usage credits" : manageLabel;
        return jw.jsx(Jn, {
          title: title,
          color: "warning",
          onCancel: handleDismiss,
          children: jw.jsxs($, {
            flexDirection: "column",
            gap: 1,
            marginBottom: 1,
            children: [jw.jsx(v, {
              children: explanationMessage
            }), canReenable ? jw.jsx(v, {
              dimColor: !0,
              children: "Usage credits are turned off. Re-enable to use Fable 5."
            }) : creditsOff ? jw.jsxs(jw.Fragment, {
              children: [jw.jsx(v, {
                dimColor: !0,
                children: "You don't have usage credits yet."
              }), inAppBuyAvailable && jw.jsxs(jw.Fragment, {
                children: [jw.jsxs(v, {
                  dimColor: !0,
                  children: ["Starts with a", " ", y_($7r, "USD", "whole"), " ", "monthly limit \xB7 run /usage-credits to adjust"]
                }), jw.jsxs(v, {
                  dimColor: !0,
                  children: ["By continuing, you agree to turn on usage credits per our Help Center: ", V3t]
                })]
              })]
            }) : jw.jsx(Sx, {
              url: V3t
            }), jw.jsx(hr, {
              options: [{
                label: confirmLabel,
                value: "confirm"
              }, {
                label: switchLabel,
                value: "switch"
              }],
              onChange: selected => {
                if (selected === "switch") return handleSwitch();
                if (canContinue) return handleConsent();
                if (canReenable && inAppBuyAvailable) return handleReenable();
                return handleBuy(creditsOff && !canReenable, liveDefinite);
              },
              onFocus: () => {
                if (!hasFocusedRef.current) {
                  hasFocusedRef.current = !0;
                  return;
                }
                Mbe();
              },
              onCancel: handleDismiss
            })]
          })
        });
      }
    case "buy":
      return jw.jsx(wpo, {
        initialStep: "buy_select",
        entryReason: "fable",
        onBeforePurchase: state.needsSetup ? () => q7r({
          skipLiveCheck: state.skipLiveCheck
        }) : void 0,
        onPurchaseSuccess: payload => {
          Pke(), He("model_fable_consent"), onDone("consent", payload);
        },
        onDone: result => {
          if (typeof result === "string") {
            Pt("model_fable_consent", "buy_fallback"), onDone("dismiss", result);
            return;
          }
          loadingPromiseRef.current = null, setState({
            s: "loading"
          });
        }
      });
    case "reenabling":
      return jw.jsx(Jn, {
        title: title,
        color: "warning",
        onCancel: handleDismiss,
        children: jw.jsx(a3n, {
          message: "Turning on usage credits…",
          work: state.work,
          onDone: succeeded => {
            if (succeeded) Pke(), He("model_fable_consent"), onDone("consent");else Pt("model_fable_consent", "reenable_failed"), onDone("dismiss", "Couldn't turn on usage credits. Run /usage-credits to try again.");
          }
        })
      });
    case "buy-external":
      return jw.jsx(Jn, {
        title: title,
        color: "warning",
        onCancel: handleDismiss,
        children: jw.jsx(Hc, {
          message: state.needsSetup ? "Setting up usage credits…" : "Opening usage credits…"
        })
      });
  }
}
var sOe, jw;
var sxo = b(() => {
  lt();
  kpo();
  s3n();
  yot();
  je();
  mn();
  got();
  RM();
  bye();
  ej();
  Ro();
  Ol();
  di();
  fne();
  OE();
  sOe = x(et(), 1), jw = x(oe(), 1);
});
export {KGt,sOe,jw,sxo};
