// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {isFableFamilyOrPinnedModel as sE,getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Tae,Sae,Pke,ej} from "../telemetry/2743_raw.ts";
import {Gtt,FAn} from "../../vendor/m2464.ts";
import {iI,qoe} from "../../vendor/m1290.ts";
import {bae,wHn,_ge} from "../telemetry/2750_title.ts";
import {hot,t5i,e5i,Z6i,VHn,Q6i,n5i,GHn,KHn,r5i,o5i,got} from "../../vendor/m2763.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {__export as j_,Ce,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {initY_ as y_,Adt,bye} from "../../vendor/m4018.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {F4,iHe} from "../../vendor/m2820.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {N6e,vpo} from "../../vendor/m4017.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Extra Usage (usage credits) inline dialog for the Claude Code TUI.
 *
 * Renders a multi-step flow that lets a user turn on usage credits, view their
 * current usage/balance, buy more credits (preset bundles or custom amount),
 * adjust the monthly spend limit, and configure auto-reload. State is driven by
 * a discriminated `step` object whose `.s` tag selects which sub-component renders.
 *
 * Exports: `PlainAwait` (spinner that resolves a promise) and `ExtraUsageDialog`.
 */

/** Help Center article describing extra usage / usage credits for paid plans. */
var V3t = "https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans";
var I3a = {};
ft(I3a, {
  PlainAwait: () => PlainAwait,
  ExtraUsageDialog: () => ExtraUsageDialog
});
/** Refresh cached account/usage state after a successful enable/purchase. */
function v3a() {
  if (sE(gs()) && Tae() && !Sae()) Pke();
}
/**
 * Top-level memoized wrapper. Holds the dialog `step` state and renders the
 * inner controller inside the modal frame.
 */
function ExtraUsageDialog(props: any) {
  let memoCache = zq.c(8),
    {
      onDone: onDone,
      initialStep: initialStep,
      entryReason: entryReason,
      onBeforePurchase: onBeforePurchase,
      onPurchaseSuccess: onPurchaseSuccess
    } = props,
    initialStepValue;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) initialStepValue = {
    s: "loading"
  }, memoCache[0] = initialStepValue;else initialStepValue = memoCache[0];
  let [step, setStep] = Uf.useState(initialStepValue),
    rendered;
  if (memoCache[1] !== entryReason || memoCache[2] !== initialStep || memoCache[3] !== onBeforePurchase || memoCache[4] !== onDone || memoCache[5] !== onPurchaseSuccess || memoCache[6] !== step) rendered = es.jsx(Gtt, {
    children: es.jsx(nxp, {
      onDone: onDone,
      step: step,
      setStep: setStep,
      initialStep: initialStep,
      entryReason: entryReason,
      onBeforePurchase: onBeforePurchase,
      onPurchaseSuccess: onPurchaseSuccess
    })
  }), memoCache[1] = entryReason, memoCache[2] = initialStep, memoCache[3] = onBeforePurchase, memoCache[4] = onDone, memoCache[5] = onPurchaseSuccess, memoCache[6] = step, memoCache[7] = rendered;else rendered = memoCache[7];
  return rendered;
}
/**
 * Controller component: loads usage status, owns the action handlers, and
 * dispatches to the per-step sub-component based on `step.s`.
 */
function nxp({
  onDone: onDone,
  step: step,
  setStep: setStep,
  initialStep: initialStep,
  entryReason: entryReason,
  onBeforePurchase: onBeforePurchase,
  onPurchaseSuccess: onPurchaseSuccess
}) {
  let [currency, setCurrency] = Uf.useState("USD"),
    [presets, setPresets] = Uf.useState([]),
    [stripeProductId, setStripeProductId] = Uf.useState(),
    onDoneRef = Uf.useRef(onDone);
  Uf.useEffect(() => {
    onDoneRef.current = onDone;
  });
  let loadStatus = Uf.useCallback(async (showLoading = !0) => {
    if (showLoading) setStep({
      s: "loading"
    });
    try {
      let localExtraUsage = iI(),
        usage;
      if (localExtraUsage) usage = {
        is_enabled: localExtraUsage.isEnabled,
        monthly_limit: localExtraUsage.spendLimitCents,
        used_credits: localExtraUsage.usedCents,
        currency: localExtraUsage.currency,
        utilization: localExtraUsage.spendLimitCents && localExtraUsage.spendLimitCents > 0 ? localExtraUsage.usedCents / localExtraUsage.spendLimitCents * 100 : 0
      };
      let [statusResult, balance, paymentMethod, productCatalog] = await Promise.all([usage ? Promise.resolve(null) : bae(), hot(), t5i(), e5i()]);
      setCurrency((productCatalog?.currency ?? balance?.currency ?? "USD").toUpperCase());
      let bundles = productCatalog?.bundles ?? [];
      if (setPresets(bundles.length > 0 ? bundles : Z6i), setStripeProductId(productCatalog?.stripe_product_id), !usage && statusResult === null) {
        setStep({
          s: "error",
          msg: "Couldn't load usage credit status — try /login if your session expired."
        });
        return;
      }
      if (usage ??= statusResult?.extra_usage ?? {
        is_enabled: !1,
        monthly_limit: null,
        used_credits: null,
        utilization: null
      }, initialStep === "buy_select") {
        if (!paymentMethod) {
          W("tengu_extra_usage_inline_dialog_fallback_browser", {
            reason: Ve("no_payment_method")
          }), onDoneRef.current(`No card on file — add a payment method at ${TY}`);
          return;
        }
        setStep({
          s: "buy_select",
          pm: paymentMethod
        });
        return;
      }
      if (!wHn(usage)) {
        setStep({
          s: "not_enabled",
          pm: paymentMethod
        });
        return;
      }
      setStep({
        s: "enabled",
        usage: usage,
        balance: balance,
        pm: paymentMethod
      });
    } catch (err) {
      A(`Failed to load extra usage status: ${err}`, {
        level: "error"
      }), setStep({
        s: "error",
        msg: "Couldn't load usage credit status"
      });
    }
  }, [setStep, initialStep]);
  Uf.useEffect(() => {
    W("tengu_extra_usage_inline_dialog_shown", {
      entry_reason: entryReason ? Ve(entryReason) : void 0
    }), loadStatus();
  }, [loadStatus, entryReason]);
  /** Log a cancel event for `fromStep` and dismiss the dialog. */
  function handleCancel(fromStep: any) {
    W("tengu_extra_usage_inline_dialog_cancel", {
      from_step: fromStep
    }), onDone(void 0, {
      display: "skip"
    });
  }
  /** Confirm turning on usage credits; kicks off the enable work promise. */
  function handleEnableConfirm() {
    W("tengu_extra_usage_inline_dialog_enable_confirm", {}), setStep({
      s: "enabling",
      work: VHn().then(async (enabled) => {
        if (W("tengu_extra_usage_inline_dialog_enable_result", {
          success: enabled
        }), !enabled) return !1;
        if (!iI()) v3a(), hn((state) => {
          if (!state.oauthAccount) return state;
          if (state.oauthAccount.hasExtraUsageEnabled === !0) return state;
          return {
            ...state,
            oauthAccount: {
              ...state.oauthAccount,
              hasExtraUsageEnabled: !0
            }
          };
        });
        return await loadStatus(!1), !0;
      })
    });
  }
  /** Result handler for the enable work promise. */
  function handleEnableResult(enabled: any) {
    if (!enabled) setStep({
      s: "error",
      msg: "Couldn't turn on usage credits"
    });
  }
  /** Menu action handler for the "enabled" step. */
  function handleEnabledAction(action: any, enabledStep: any) {
    switch (action) {
      case "continue":
        onDone("Continuing with usage credits");
        break;
      case "buy":
        if (!enabledStep.pm) W("tengu_extra_usage_inline_dialog_fallback_browser", {
          reason: Ve("no_payment_method")
        }), onDone(`No card on file — add a payment method at ${TY}`);else setStep({
          s: "buy_select",
          pm: enabledStep.pm
        });
        break;
      case "adjust":
        setStep({
          s: "adjust_limit",
          current: enabledStep.usage.monthly_limit
        });
        break;
      case "auto_reload":
        if (!enabledStep.pm) W("tengu_extra_usage_inline_dialog_fallback_browser", {
          reason: Ve("no_payment_method")
        }), onDone(`No card on file — add a payment method at ${TY}`);else setStep({
          s: "auto_reload_config",
          current: enabledStep.balance?.auto_reload_settings,
          pm: enabledStep.pm
        });
        break;
      case "manage":
        Zl(TY), onDone(`Opening ${TY}`);
        break;
    }
  }
  /** Save auto-reload settings (or turn off) and transition to the saving step. */
  function handleAutoReloadSave(enabled: any, thresholdCents: any, reloadToCents: any) {
    W("tengu_extra_usage_inline_dialog_auto_reload", {
      enabled: enabled,
      threshold_cents: thresholdCents,
      reload_to_cents: reloadToCents,
      currency: currency
    });
    let saveWork = Q6i(enabled, thresholdCents, reloadToCents, currency),
      work = enabled ? saveWork.then(async (ok) => {
        if (ok) await loadStatus(!1);
        return ok;
      }) : saveWork;
    setStep({
      s: "auto_reload_saving",
      enabled: enabled,
      work: work
    });
  }
  /** Result handler for the auto-reload save/turn-off work promise. */
  function handleAutoReloadResult(ok: any, wasEnable: any) {
    if (!ok) {
      setStep({
        s: "error",
        msg: "Failed to update auto-reload"
      });
      return;
    }
    if (!wasEnable) loadStatus();
  }
  /** Purchase usage credits (preset bundle or custom amount). */
  async function handleBuy(amountCents: any, bundle: any) {
    if (W("tengu_extra_usage_inline_dialog_buy_confirm", {
      amount_cents: amountCents,
      preset: !!bundle,
      currency: currency
    }), setStep({
      s: "buy_purchasing"
    }), onBeforePurchase) {
      if (!(await onBeforePurchase().catch(() => !1))) {
        setStep({
          s: "error",
          msg: "Couldn't turn on usage credits — no charge was made."
        });
        return;
      }
    }
    let creditMinorUnits = bundle?.local_credit_minor_units ?? amountCents;
    try {
      let purchase = await n5i(bundle?.id ? {
        kind: "bundle",
        bundle: bundle
      } : {
        kind: "custom",
        amountCents: amountCents
      });
      if (purchase.payment_status === "success") W("tengu_extra_usage_inline_dialog_buy_result", {
        status: Ve("success")
      }), setStep({
        s: "buy_success",
        credit: creditMinorUnits
      });else if (purchase.payment_status === "pending_invoice" && purchase.purchase_id) setStep({
        s: "buy_polling",
        purchaseId: purchase.purchase_id,
        credit: creditMinorUnits
      });else if (purchase.payment_status === "requires_action") W("tengu_extra_usage_inline_dialog_buy_result", {
        status: Ve("3ds_fallback")
      }), setStep({
        s: "error",
        msg: `Your card requires additional verification — this purchase was not completed. Try again at ${TY}`
      });else setStep({
        s: "error",
        msg: "Unexpected purchase state"
      });
    } catch (err) {
      let purchaseErrorMessage = GHn(err);
      if (j_(err, (e2) => GHn(e2) !== null)) A(`Extra usage credit purchase failed: ${purchaseErrorMessage ?? Ce(err)}`, {
        level: "error"
      });else Ie(err);
      W("tengu_extra_usage_inline_dialog_buy_result", {
        status: Ve("failed")
      }), setStep({
        s: "error",
        msg: purchaseErrorMessage ? `Purchase failed: ${purchaseErrorMessage}` : "Purchase failed"
      });
    }
  }
  /** Adjust the monthly spend limit (null = unlimited). */
  async function handleAdjustLimit(newCents: any, oldCents: any) {
    if (W("tengu_extra_usage_inline_dialog_adjust_limit", {
      old_cents: oldCents ?? void 0,
      new_cents: newCents ?? void 0,
      unlimited: newCents === null,
      currency: currency
    }), setStep({
      s: "adjusting"
    }), !(await KHn(newCents, currency)).ok) {
      setStep({
        s: "error",
        msg: "Failed to update spend limit"
      });
      return;
    }
    onDone(newCents === null ? "Monthly limit set to unlimited" : `Monthly limit updated to ${y_(newCents, currency, "whole")}`);
  }
  switch (step.s) {
    case "loading":
      return es.jsx($, {
        paddingTop: 1,
        children: es.jsx(Hc, {
          message: "Loading usage credit status…"
        })
      });
    case "enabling":
      return es.jsx(k3a, {
        message: "Turning on usage credits…",
        work: step.work,
        onDone: handleEnableResult
      });
    case "adjusting":
      return es.jsx($, {
        paddingTop: 1,
        children: es.jsx(Hc, {
          message: "Updating spend limit…"
        })
      });
    case "auto_reload_saving":
      return step.enabled ? es.jsx(k3a, {
        message: "Turning on auto-reload…",
        work: step.work,
        onDone: (ok) => handleAutoReloadResult(ok, !0)
      }) : es.jsx(PlainAwait, {
        message: "Turning off auto-reload…",
        work: step.work,
        onDone: (ok) => handleAutoReloadResult(ok, !1)
      });
    case "buy_purchasing":
      return es.jsx(H3a, {
        message: "Processing payment… (may take a few seconds)"
      });
    case "buy_success":
      {
        let successMessage = `Added ${y_(step.credit, currency)} of usage credits`;
        return es.jsx(Txp, {
          message: successMessage,
          onDone: () => (v3a(), onPurchaseSuccess ? onPurchaseSuccess(successMessage) : onDone(successMessage))
        });
      }
    case "buy_polling":
      return es.jsx(yxp, {
        purchaseId: step.purchaseId,
        onSuccess: () => setStep({
          s: "buy_success",
          credit: step.credit
        }),
        onError: (msg) => setStep({
          s: "error",
          msg: msg
        })
      });
    case "not_enabled":
      return es.jsx(oxp, {
        pm: step.pm,
        onConfirm: handleEnableConfirm,
        onCancel: () => handleCancel("not_enabled")
      });
    case "enabled":
      return es.jsx(sxp, {
        step: step,
        currency: currency,
        onAction: (action) => handleEnabledAction(action, step),
        onCancel: () => handleCancel("enabled")
      });
    case "buy_select":
      return es.jsx(ixp, {
        pm: step.pm,
        presets: presets,
        currency: currency,
        onConfirm: (bundle) => setStep({
          s: "buy_confirm",
          pm: step.pm,
          cents: bundle.local_price_minor_units,
          bundle: bundle
        }),
        onCustom: () => setStep({
          s: "buy_custom",
          pm: step.pm
        }),
        onCancel: () => initialStep === "buy_select" ? handleCancel("buy_select") : void loadStatus()
      });
    case "buy_custom":
      return es.jsx(cxp, {
        pm: step.pm,
        initialCents: step.cents,
        currency: currency,
        onConfirm: (cents) => setStep({
          s: "buy_confirm",
          pm: step.pm,
          cents: cents
        }),
        onCancel: () => setStep({
          s: "buy_select",
          pm: step.pm
        })
      });
    case "buy_confirm":
      return es.jsx(axp, {
        pm: step.pm,
        cents: step.cents,
        bundle: step.bundle,
        currency: currency,
        stripeProductId: stripeProductId,
        onConfirm: () => handleBuy(step.cents, step.bundle),
        onCancel: () => setStep(step.bundle ? {
          s: "buy_select",
          pm: step.pm
        } : {
          s: "buy_custom",
          pm: step.pm,
          cents: step.cents
        })
      });
    case "adjust_limit":
      return es.jsx(uxp, {
        current: step.current,
        currency: currency,
        onConfirm: (newCents) => handleAdjustLimit(newCents, step.current),
        onCancel: () => void loadStatus()
      });
    case "auto_reload_config":
      return es.jsx(mxp, {
        current: step.current,
        pm: step.pm,
        currency: currency,
        onSave: (thresholdCents, reloadToCents) => handleAutoReloadSave(!0, thresholdCents, reloadToCents),
        onTurnOff: () => handleAutoReloadSave(!1),
        onCancel: () => void loadStatus()
      });
    case "error":
      return es.jsx(rxp, {
        msg: step.msg,
        onClose: () => handleCancel("error")
      });
  }
}
/** Error step: shows a message and offers to open the billing page. */
function rxp(props: any) {
  let memoCache = zq.c(9),
    {
      msg: msg,
      onClose: onClose
    } = props,
    confirmHandlers;
  if (memoCache[0] !== onClose) confirmHandlers = {
    "confirm:yes": () => {
      Zl(TY), onClose();
    }
  }, memoCache[0] = onClose, memoCache[1] = confirmHandlers;else confirmHandlers = memoCache[1];
  let confirmOptions;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) confirmOptions = {
    context: "Confirmation"
  }, memoCache[2] = confirmOptions;else confirmOptions = memoCache[2];
  Oo(confirmHandlers, confirmOptions);
  let inputGuide;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) inputGuide = es.jsxs(bn, {
    children: [es.jsx(at, {
      chord: "enter",
      action: `open ${TY}`
    }), es.jsx(at, {
      chord: "escape",
      action: "cancel"
    })]
  }), memoCache[3] = inputGuide;else inputGuide = memoCache[3];
  let body;
  if (memoCache[4] !== msg) body = es.jsx($, {
    flexDirection: "column",
    gap: 1,
    children: es.jsx(v, {
      color: "error",
      children: msg
    })
  }), memoCache[4] = msg, memoCache[5] = body;else body = memoCache[5];
  let rendered;
  if (memoCache[6] !== onClose || memoCache[7] !== body) rendered = es.jsx(Jn, {
    title: "Usage credits",
    onCancel: onClose,
    color: "error",
    inputGuide: inputGuide,
    children: body
  }), memoCache[6] = onClose, memoCache[7] = body, memoCache[8] = rendered;else rendered = memoCache[8];
  return rendered;
}
/** Format a payment method as e.g. "Visa ····4242". */
function Rdt(paymentMethod: any) {
  return `${paymentMethod.brand ?? paymentMethod.type} \xB7\xB7\xB7\xB7${paymentMethod.last4 ?? ""}`;
}
/** "not_enabled" step: prompt to turn on usage credits. */
function oxp(props: any) {
  let memoCache = zq.c(15),
    {
      pm: paymentMethod,
      onConfirm: onConfirm,
      onCancel: onCancel
    } = props,
    heading;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) heading = es.jsx(v, {
    children: "Keep using Claude when you hit a limit."
  }), memoCache[0] = heading;else heading = memoCache[0];
  let cardText;
  if (memoCache[1] !== paymentMethod) cardText = paymentMethod ? `Card on file: ${Rdt(paymentMethod)}` : `No card on file — add one at ${TY} before buying.`, memoCache[1] = paymentMethod, memoCache[2] = cardText;else cardText = memoCache[2];
  let cardLine;
  if (memoCache[3] !== cardText) cardLine = es.jsx(v, {
    dimColor: !0,
    children: cardText
  }), memoCache[3] = cardText, memoCache[4] = cardLine;else cardLine = memoCache[4];
  let agreementText;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) agreementText = es.jsxs(v, {
    dimColor: !0,
    children: ["By turning on, you agree to turn on usage credits as defined in our Help Center article:", `
`, V3t]
  }), memoCache[5] = agreementText;else agreementText = memoCache[5];
  let confirmButtons;
  if (memoCache[6] !== onCancel || memoCache[7] !== onConfirm) confirmButtons = es.jsx(Bl, {
    confirmLabel: "Turn on",
    cancelLabel: "Cancel",
    onConfirm: onConfirm,
    onCancel: onCancel
  }), memoCache[6] = onCancel, memoCache[7] = onConfirm, memoCache[8] = confirmButtons;else confirmButtons = memoCache[8];
  let body;
  if (memoCache[9] !== cardLine || memoCache[10] !== confirmButtons) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [heading, cardLine, agreementText, confirmButtons]
  }), memoCache[9] = cardLine, memoCache[10] = confirmButtons, memoCache[11] = body;else body = memoCache[11];
  let rendered;
  if (memoCache[12] !== onCancel || memoCache[13] !== body) rendered = es.jsx(Jn, {
    title: "Turn on usage credits",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[12] = onCancel, memoCache[13] = body, memoCache[14] = rendered;else rendered = memoCache[14];
  return rendered;
}
/** "enabled" step: usage summary, progress bar, and action menu. */
function sxp(props: any) {
  let memoCache = zq.c(52),
    {
      step: step,
      currency: currency,
      onAction: onAction,
      onCancel: onCancel
    } = props,
    {
      columns: columns
    } = _r(),
    barWidth = Math.min(columns - 6, 50),
    {
      usage: usage,
      balance: balance
    } = step,
    usedText;
  if (memoCache[0] !== currency || memoCache[1] !== usage.used_credits) usedText = usage.used_credits !== null ? y_(usage.used_credits, currency) : "—", memoCache[0] = currency, memoCache[1] = usage.used_credits, memoCache[2] = usedText;else usedText = memoCache[2];
  let usedDisplay = usedText,
    limitText;
  if (memoCache[3] !== currency || memoCache[4] !== usage.monthly_limit) limitText = usage.monthly_limit !== null ? y_(usage.monthly_limit, currency, "whole") : "Unlimited", memoCache[3] = currency, memoCache[4] = usage.monthly_limit, memoCache[5] = limitText;else limitText = memoCache[5];
  let limitDisplay = limitText,
    utilizationValue;
  if (memoCache[6] !== usage.utilization) utilizationValue = usage.utilization !== null ? Math.round(usage.utilization) : 0, memoCache[6] = usage.utilization, memoCache[7] = utilizationValue;else utilizationValue = memoCache[7];
  let utilizationPct = utilizationValue,
    balanceText;
  if (memoCache[8] !== balance || memoCache[9] !== currency) balanceText = balance ? y_(balance.amount, currency) : "—", memoCache[8] = balance, memoCache[9] = currency, memoCache[10] = balanceText;else balanceText = memoCache[10];
  let balanceDisplay = balanceText,
    autoReloadOn = balance?.auto_reload_settings?.enabled === !0,
    resetDateText;
  if (memoCache[11] === Symbol.for("react.memo_cache_sentinel")) {
    let now = new Date();
    resetDateText = new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }), memoCache[11] = resetDateText;
  } else resetDateText = memoCache[11];
  let resetDateDisplay = resetDateText,
    isDisabled = usage.is_enabled === !1,
    autoReloadLabel = `${balanceDisplay} balance \xB7 auto-reload ${autoReloadOn ? "on" : "off"}
`,
    autoReloadOption;
  if (memoCache[12] !== autoReloadLabel) autoReloadOption = {
    label: autoReloadLabel,
    value: "auto_reload"
  }, memoCache[12] = autoReloadLabel, memoCache[13] = autoReloadOption;else autoReloadOption = memoCache[13];
  let buyOption;
  if (memoCache[14] === Symbol.for("react.memo_cache_sentinel")) buyOption = {
    label: "Buy more",
    value: "buy"
  }, memoCache[14] = buyOption;else buyOption = memoCache[14];
  let continueOptions;
  if (memoCache[15] !== isDisabled) continueOptions = isDisabled ? [] : [{
    label: "Continue with usage credits",
    value: "continue"
  }], memoCache[15] = isDisabled, memoCache[16] = continueOptions;else continueOptions = memoCache[16];
  let adjustOption, manageOption;
  if (memoCache[17] === Symbol.for("react.memo_cache_sentinel")) adjustOption = {
    label: "Adjust monthly limit",
    value: "adjust"
  }, manageOption = {
    label: "Manage on claude.ai",
    value: "manage"
  }, memoCache[17] = adjustOption, memoCache[18] = manageOption;else adjustOption = memoCache[17], manageOption = memoCache[18];
  let allOptions;
  if (memoCache[19] !== autoReloadOption || memoCache[20] !== continueOptions) allOptions = [autoReloadOption, buyOption, ...continueOptions, adjustOption, manageOption], memoCache[19] = autoReloadOption, memoCache[20] = continueOptions, memoCache[21] = allOptions;else allOptions = memoCache[21];
  let options = allOptions,
    disabledWarning;
  if (memoCache[22] !== isDisabled || memoCache[23] !== usage.disabled_reason) disabledWarning = isDisabled && es.jsx(v, {
    color: "warning",
    children: usage.disabled_reason === "out_of_credits" ? "Out of usage credits — buy more below to keep going." : "You've hit your monthly limit — raise it below, or it resets next month."
  }), memoCache[22] = isDisabled, memoCache[23] = usage.disabled_reason, memoCache[24] = disabledWarning;else disabledWarning = memoCache[24];
  let spentNode;
  if (memoCache[25] !== usedDisplay) spentNode = es.jsxs(v, {
    children: [usedDisplay, " spent"]
  }), memoCache[25] = usedDisplay, memoCache[26] = spentNode;else spentNode = memoCache[26];
  let ratio = utilizationPct / 100,
    progressBar;
  if (memoCache[27] !== ratio || memoCache[28] !== barWidth) progressBar = es.jsx(F4, {
    ratio: ratio,
    width: barWidth,
    fillColor: "rate_limit_fill",
    emptyColor: "rate_limit_empty"
  }), memoCache[27] = ratio, memoCache[28] = barWidth, memoCache[29] = progressBar;else progressBar = memoCache[29];
  let usedPctNode;
  if (memoCache[30] !== utilizationPct) usedPctNode = es.jsxs(v, {
    children: [utilizationPct, "% used"]
  }), memoCache[30] = utilizationPct, memoCache[31] = usedPctNode;else usedPctNode = memoCache[31];
  let progressRow;
  if (memoCache[32] !== spentNode || memoCache[33] !== progressBar || memoCache[34] !== usedPctNode) progressRow = es.jsxs($, {
    flexDirection: "row",
    gap: 1,
    children: [spentNode, progressBar, usedPctNode]
  }), memoCache[32] = spentNode, memoCache[33] = progressBar, memoCache[34] = usedPctNode, memoCache[35] = progressRow;else progressRow = memoCache[35];
  let resetLine;
  if (memoCache[36] !== limitDisplay) resetLine = es.jsxs(v, {
    dimColor: !0,
    children: ["Resets ", resetDateDisplay, " \xB7 ", limitDisplay, " monthly limit"]
  }), memoCache[36] = limitDisplay, memoCache[37] = resetLine;else resetLine = memoCache[37];
  let summaryColumn;
  if (memoCache[38] !== progressRow || memoCache[39] !== resetLine) summaryColumn = es.jsxs($, {
    flexDirection: "column",
    children: [progressRow, resetLine]
  }), memoCache[38] = progressRow, memoCache[39] = resetLine, memoCache[40] = summaryColumn;else summaryColumn = memoCache[40];
  let menu;
  if (memoCache[41] !== onAction || memoCache[42] !== onCancel || memoCache[43] !== options) menu = es.jsx(hr, {
    options: options,
    onChange: onAction,
    onCancel: onCancel,
    visibleOptionCount: options.length
  }), memoCache[41] = onAction, memoCache[42] = onCancel, memoCache[43] = options, memoCache[44] = menu;else menu = memoCache[44];
  let body;
  if (memoCache[45] !== disabledWarning || memoCache[46] !== summaryColumn || memoCache[47] !== menu) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [disabledWarning, summaryColumn, menu]
  }), memoCache[45] = disabledWarning, memoCache[46] = summaryColumn, memoCache[47] = menu, memoCache[48] = body;else body = memoCache[48];
  let rendered;
  if (memoCache[49] !== onCancel || memoCache[50] !== body) rendered = es.jsx(Jn, {
    title: "Usage credits",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[49] = onCancel, memoCache[50] = body, memoCache[51] = rendered;else rendered = memoCache[51];
  return rendered;
}
/** "buy_select" step: choose a preset bundle, a custom amount, or cancel. */
function ixp(props: any) {
  let memoCache = zq.c(27),
    {
      pm: paymentMethod,
      presets: presets,
      currency: currency,
      onConfirm: onConfirm,
      onCustom: onCustom,
      onCancel: onCancel
    } = props,
    builtOptions;
  if (memoCache[0] !== currency || memoCache[1] !== presets) {
    let presetToOption;
    if (memoCache[3] !== currency) presetToOption = (bundle, index) => {
      let savePct = bundle.credit_minor_units > 0 ? Math.round(bundle.discount_minor_units / bundle.credit_minor_units * 100) : 0;
      return {
        label: y_(bundle.local_credit_minor_units, currency, "fit"),
        description: savePct > 0 ? `Save ${savePct}%` : void 0,
        value: `p${index}`
      };
    }, memoCache[3] = currency, memoCache[4] = presetToOption;else presetToOption = memoCache[4];
    let customOption, cancelOption;
    if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) customOption = {
      label: "Custom amount…",
      value: "custom"
    }, cancelOption = {
      label: "Cancel",
      value: "cancel"
    }, memoCache[5] = customOption, memoCache[6] = cancelOption;else customOption = memoCache[5], cancelOption = memoCache[6];
    builtOptions = [...presets.map(presetToOption), customOption, cancelOption], memoCache[0] = currency, memoCache[1] = presets, memoCache[2] = builtOptions;
  } else builtOptions = memoCache[2];
  let options = builtOptions,
    handleSelect;
  if (memoCache[7] !== onCancel || memoCache[8] !== onConfirm || memoCache[9] !== onCustom || memoCache[10] !== presets) handleSelect = function (value) {
    if (value === "custom") return onCustom();
    if (value === "cancel") return onCancel();
    let presetIndex = Number(value.slice(1));
    onConfirm(presets[presetIndex]);
  }, memoCache[7] = onCancel, memoCache[8] = onConfirm, memoCache[9] = onCustom, memoCache[10] = presets, memoCache[11] = handleSelect;else handleSelect = memoCache[11];
  let onSelect = handleSelect,
    cardText;
  if (memoCache[12] !== paymentMethod) cardText = Rdt(paymentMethod), memoCache[12] = paymentMethod, memoCache[13] = cardText;else cardText = memoCache[13];
  let paymentLine;
  if (memoCache[14] !== cardText) paymentLine = es.jsxs(v, {
    dimColor: !0,
    children: ["Payment: ", cardText]
  }), memoCache[14] = cardText, memoCache[15] = paymentLine;else paymentLine = memoCache[15];
  let menu;
  if (memoCache[16] !== onSelect || memoCache[17] !== onCancel || memoCache[18] !== options) menu = es.jsx(hr, {
    options: options,
    onChange: onSelect,
    onCancel: onCancel,
    visibleOptionCount: options.length
  }), memoCache[16] = onSelect, memoCache[17] = onCancel, memoCache[18] = options, memoCache[19] = menu;else menu = memoCache[19];
  let chargeNote;
  if (memoCache[20] === Symbol.for("react.memo_cache_sentinel")) chargeNote = es.jsx(v, {
    dimColor: !0,
    children: "By confirming, you allow Anthropic to charge your card in the amount above."
  }), memoCache[20] = chargeNote;else chargeNote = memoCache[20];
  let body;
  if (memoCache[21] !== paymentLine || memoCache[22] !== menu) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [paymentLine, menu, chargeNote]
  }), memoCache[21] = paymentLine, memoCache[22] = menu, memoCache[23] = body;else body = memoCache[23];
  let rendered;
  if (memoCache[24] !== onCancel || memoCache[25] !== body) rendered = es.jsx(Jn, {
    title: "Buy usage credits",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[24] = onCancel, memoCache[25] = body, memoCache[26] = rendered;else rendered = memoCache[26];
  return rendered;
}
/** Label/value row used in the purchase summary. */
function F6e(props: any) {
  let memoCache = zq.c(11),
    {
      label: label,
      value: value,
      bold: bold,
      dim: dim
    } = props,
    labelNode;
  if (memoCache[0] !== bold || memoCache[1] !== dim || memoCache[2] !== label) labelNode = es.jsx(v, {
    dimColor: dim,
    bold: bold,
    children: label
  }), memoCache[0] = bold, memoCache[1] = dim, memoCache[2] = label, memoCache[3] = labelNode;else labelNode = memoCache[3];
  let valueNode;
  if (memoCache[4] !== bold || memoCache[5] !== dim || memoCache[6] !== value) valueNode = es.jsx(v, {
    dimColor: dim,
    bold: bold,
    children: value
  }), memoCache[4] = bold, memoCache[5] = dim, memoCache[6] = value, memoCache[7] = valueNode;else valueNode = memoCache[7];
  let row;
  if (memoCache[8] !== labelNode || memoCache[9] !== valueNode) row = es.jsxs($, {
    justifyContent: "space-between",
    children: [labelNode, valueNode]
  }), memoCache[8] = labelNode, memoCache[9] = valueNode, memoCache[10] = row;else row = memoCache[10];
  return row;
}
/** "buy_confirm" step: itemized total with tax, then confirm/cancel. */
function axp(props: any) {
  let memoCache = zq.c(76),
    {
      pm: paymentMethod,
      cents: cents,
      bundle: bundle,
      currency: currency,
      stripeProductId: stripeProductId,
      onConfirm: onConfirm,
      onCancel: onCancel
    } = props,
    subtotalCents = bundle ? bundle.local_credit_minor_units : cents,
    discountCents = subtotalCents - cents,
    discountPctValue;
  if (memoCache[0] !== subtotalCents || memoCache[1] !== discountCents) discountPctValue = subtotalCents > 0 && discountCents > 0 ? Math.round(discountCents / subtotalCents * 100) : 0, memoCache[0] = subtotalCents, memoCache[1] = discountCents, memoCache[2] = discountPctValue;else discountPctValue = memoCache[2];
  let discountPct = discountPctValue,
    [taxState, setTaxState] = Uf.useState("loading"),
    loadTaxEffect,
    loadTaxDeps;
  if (memoCache[3] !== cents || memoCache[4] !== currency || memoCache[5] !== stripeProductId) loadTaxEffect = () => {
    let active = !0;
    return r5i(cents, currency, stripeProductId).then((tax) => {
      if (active) setTaxState(tax);
    }), () => {
      active = !1;
    };
  }, loadTaxDeps = [cents, currency, stripeProductId], memoCache[3] = cents, memoCache[4] = currency, memoCache[5] = stripeProductId, memoCache[6] = loadTaxEffect, memoCache[7] = loadTaxDeps;else loadTaxEffect = memoCache[6], loadTaxDeps = memoCache[7];
  Uf.useEffect(loadTaxEffect, loadTaxDeps);
  let taxLoading = taxState === "loading",
    taxFailed = taxState === null,
    taxMinorUnits = taxLoading || taxFailed ? 0 : taxState.tax_minor_units,
    totalCents = cents + taxMinorUnits,
    menuOptions;
  if (memoCache[8] !== currency || memoCache[9] !== taxLoading || memoCache[10] !== taxFailed || memoCache[11] !== totalCents) menuOptions = taxFailed ? [{
    label: "Go back",
    value: "no"
  }] : [{
    label: taxLoading ? "Pay (calculating…)" : `Pay ${y_(totalCents, currency)} now`,
    value: "yes",
    disabled: taxLoading
  }, {
    label: "Go back",
    value: "no"
  }], memoCache[8] = currency, memoCache[9] = taxLoading, memoCache[10] = taxFailed, memoCache[11] = totalCents, memoCache[12] = menuOptions;else menuOptions = memoCache[12];
  let options = menuOptions,
    {
      columns: columns
    } = _r(),
    panelWidth = Math.max(0, Math.min(columns - 6, 44)),
    taxLabel = taxLoading || taxFailed ? "Tax" : taxState.tax_label ?? "Tax",
    dividerText;
  if (memoCache[13] !== panelWidth) dividerText = "─".repeat(panelWidth), memoCache[13] = panelWidth, memoCache[14] = dividerText;else dividerText = memoCache[14];
  let dividerNode;
  if (memoCache[15] !== dividerText) dividerNode = es.jsx(v, {
    dimColor: !0,
    children: dividerText
  }), memoCache[15] = dividerText, memoCache[16] = dividerNode;else dividerNode = memoCache[16];
  let divider = dividerNode,
    subtotalText;
  if (memoCache[17] !== subtotalCents || memoCache[18] !== currency) subtotalText = y_(subtotalCents, currency), memoCache[17] = subtotalCents, memoCache[18] = currency, memoCache[19] = subtotalText;else subtotalText = memoCache[19];
  let subtotalRow;
  if (memoCache[20] !== subtotalText) subtotalRow = es.jsx(F6e, {
    label: "Subtotal",
    value: subtotalText
  }), memoCache[20] = subtotalText, memoCache[21] = subtotalRow;else subtotalRow = memoCache[21];
  let discountSection;
  if (memoCache[22] !== cents || memoCache[23] !== currency || memoCache[24] !== discountCents || memoCache[25] !== discountPct || memoCache[26] !== divider) discountSection = discountCents > 0 && es.jsxs(es.Fragment, {
    children: [es.jsx(F6e, {
      label: `Discount${discountPct > 0 ? ` (${discountPct}%)` : ""}`,
      value: `−${y_(discountCents, currency)}`
    }), divider, es.jsx(F6e, {
      label: "Subtotal after discount",
      value: y_(cents, currency)
    })]
  }), memoCache[22] = cents, memoCache[23] = currency, memoCache[24] = discountCents, memoCache[25] = discountPct, memoCache[26] = divider, memoCache[27] = discountSection;else discountSection = memoCache[27];
  let taxRow;
  if (memoCache[28] !== currency || memoCache[29] !== taxState || memoCache[30] !== taxLabel || memoCache[31] !== taxLoading || memoCache[32] !== taxFailed) taxRow = taxLoading ? es.jsx(F6e, {
    label: taxLabel,
    value: "…",
    dim: !0
  }) : taxFailed ? es.jsx(F6e, {
    label: taxLabel,
    value: "—",
    dim: !0
  }) : es.jsx(F6e, {
    label: `${taxLabel} (${lxp(taxState.tax_rate_pct)})`,
    value: y_(taxState.tax_minor_units, currency)
  }), memoCache[28] = currency, memoCache[29] = taxState, memoCache[30] = taxLabel, memoCache[31] = taxLoading, memoCache[32] = taxFailed, memoCache[33] = taxRow;else taxRow = memoCache[33];
  let totalText;
  if (memoCache[34] !== currency || memoCache[35] !== taxLoading || memoCache[36] !== taxFailed || memoCache[37] !== totalCents) totalText = taxLoading ? "…" : taxFailed ? "—" : y_(totalCents, currency), memoCache[34] = currency, memoCache[35] = taxLoading, memoCache[36] = taxFailed, memoCache[37] = totalCents, memoCache[38] = totalText;else totalText = memoCache[38];
  let totalRow;
  if (memoCache[39] !== totalText) totalRow = es.jsx(F6e, {
    label: "Total due",
    value: totalText,
    bold: !0
  }), memoCache[39] = totalText, memoCache[40] = totalRow;else totalRow = memoCache[40];
  let summaryPanel;
  if (memoCache[41] !== panelWidth || memoCache[42] !== divider || memoCache[43] !== taxRow || memoCache[44] !== totalRow || memoCache[45] !== subtotalRow || memoCache[46] !== discountSection) summaryPanel = es.jsxs($, {
    flexDirection: "column",
    width: panelWidth,
    children: [subtotalRow, discountSection, taxRow, divider, totalRow]
  }), memoCache[41] = panelWidth, memoCache[42] = divider, memoCache[43] = taxRow, memoCache[44] = totalRow, memoCache[45] = subtotalRow, memoCache[46] = discountSection, memoCache[47] = summaryPanel;else summaryPanel = memoCache[47];
  let paymentLabelNode;
  if (memoCache[48] === Symbol.for("react.memo_cache_sentinel")) paymentLabelNode = es.jsx(v, {
    children: "Payment "
  }), memoCache[48] = paymentLabelNode;else paymentLabelNode = memoCache[48];
  let cardText;
  if (memoCache[49] !== paymentMethod) cardText = Rdt(paymentMethod), memoCache[49] = paymentMethod, memoCache[50] = cardText;else cardText = memoCache[50];
  let cardNode;
  if (memoCache[51] !== cardText) cardNode = es.jsx(v, {
    dimColor: !0,
    children: cardText
  }), memoCache[51] = cardText, memoCache[52] = cardNode;else cardNode = memoCache[52];
  let paymentRow;
  if (memoCache[53] !== panelWidth || memoCache[54] !== cardNode) paymentRow = es.jsxs($, {
    width: panelWidth,
    children: [paymentLabelNode, cardNode]
  }), memoCache[53] = panelWidth, memoCache[54] = cardNode, memoCache[55] = paymentRow;else paymentRow = memoCache[55];
  let taxFailedWarning;
  if (memoCache[56] !== taxFailed) taxFailedWarning = taxFailed && es.jsx(v, {
    color: "warning",
    children: `Couldn't calculate tax. Try again, or buy at ${TY}`
  }), memoCache[56] = taxFailed, memoCache[57] = taxFailedWarning;else taxFailedWarning = memoCache[57];
  let handleSelect;
  if (memoCache[58] !== onCancel || memoCache[59] !== onConfirm) handleSelect = (value) => value === "yes" ? onConfirm() : onCancel(), memoCache[58] = onCancel, memoCache[59] = onConfirm, memoCache[60] = handleSelect;else handleSelect = memoCache[60];
  let menu;
  if (memoCache[61] !== onCancel || memoCache[62] !== options || memoCache[63] !== handleSelect) menu = es.jsx(hr, {
    options: options,
    onChange: handleSelect,
    onCancel: onCancel,
    visibleOptionCount: 2
  }), memoCache[61] = onCancel, memoCache[62] = options, memoCache[63] = handleSelect, memoCache[64] = menu;else menu = memoCache[64];
  let chargeNote;
  if (memoCache[65] !== taxFailed) chargeNote = !taxFailed && es.jsx(v, {
    dimColor: !0,
    children: "By confirming, you allow Anthropic to charge your card in the amount above."
  }), memoCache[65] = taxFailed, memoCache[66] = chargeNote;else chargeNote = memoCache[66];
  let body;
  if (memoCache[67] !== summaryPanel || memoCache[68] !== paymentRow || memoCache[69] !== taxFailedWarning || memoCache[70] !== menu || memoCache[71] !== chargeNote) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [summaryPanel, paymentRow, taxFailedWarning, menu, chargeNote]
  }), memoCache[67] = summaryPanel, memoCache[68] = paymentRow, memoCache[69] = taxFailedWarning, memoCache[70] = menu, memoCache[71] = chargeNote, memoCache[72] = body;else body = memoCache[72];
  let rendered;
  if (memoCache[73] !== onCancel || memoCache[74] !== body) rendered = es.jsx(Jn, {
    title: "Buy usage credits",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[73] = onCancel, memoCache[74] = body, memoCache[75] = rendered;else rendered = memoCache[75];
  return rendered;
}
/** Format a tax rate percentage, e.g. `8.25%`. */
function lxp(taxRatePct: any) {
  return `${Number(taxRatePct.toFixed(2))}%`;
}
/** "buy_custom" step: prompt for a custom credit amount. */
function cxp(props: any) {
  let memoCache = zq.c(9),
    {
      pm: paymentMethod,
      initialCents: initialCents,
      currency: currency,
      onConfirm: onConfirm,
      onCancel: onCancel
    } = props,
    cardText;
  if (memoCache[0] !== paymentMethod) cardText = Rdt(paymentMethod), memoCache[0] = paymentMethod, memoCache[1] = cardText;else cardText = memoCache[1];
  let subtitle = `Payment: ${cardText}`,
    initialAmount = initialCents ? String(initialCents / 100) : "75",
    minCents = currency === "USD" ? txp : void 0,
    rendered;
  if (memoCache[2] !== currency || memoCache[3] !== onCancel || memoCache[4] !== onConfirm || memoCache[5] !== subtitle || memoCache[6] !== initialAmount || memoCache[7] !== minCents) rendered = es.jsx(_xp, {
    title: "Buy usage credits",
    subtitle: subtitle,
    initial: initialAmount,
    minCents: minCents,
    currency: currency,
    footer: "By confirming, you allow Anthropic to charge your card in the amount above.",
    onSubmit: onConfirm,
    onCancel: onCancel
  }), memoCache[2] = currency, memoCache[3] = onCancel, memoCache[4] = onConfirm, memoCache[5] = subtitle, memoCache[6] = initialAmount, memoCache[7] = minCents, memoCache[8] = rendered;else rendered = memoCache[8];
  return rendered;
}
/** "adjust_limit" step: amount input plus set / unlimited / cancel actions. */
function uxp(props: any) {
  let memoCache = zq.c(45),
    {
      current: current,
      currency: currency,
      onConfirm: onConfirm,
      onCancel: onCancel
    } = props,
    {
      columns: columns
    } = _r(),
    initialAmount;
  if (memoCache[0] !== current) initialAmount = current !== null ? String(Math.round(current / 100)) : "150", memoCache[0] = current, memoCache[1] = initialAmount;else initialAmount = memoCache[1];
  let initialValue = initialAmount,
    [inputValue, setInputValue] = Uf.useState(initialValue),
    [cursorOffset, setCursorOffset] = Uf.useState(initialValue.length),
    [focusRow, setFocusRow] = Uf.useState(0),
    actionKeys;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) actionKeys = ["set", "unlimited", "cancel"], memoCache[2] = actionKeys;else actionKeys = memoCache[2];
  let actions = actionKeys,
    [actionIndex, setActionIndex] = Uf.useState(0),
    cleanedInput;
  if (memoCache[3] !== inputValue) {
    let nonNumeric;
    if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) nonNumeric = /[^0-9.]/g, memoCache[5] = nonNumeric;else nonNumeric = memoCache[5];
    cleanedInput = inputValue.replace(nonNumeric, ""), memoCache[3] = inputValue, memoCache[4] = cleanedInput;
  } else cleanedInput = memoCache[4];
  let parsedAmount = parseFloat(cleanedInput),
    amountCentsValue;
  if (memoCache[6] !== parsedAmount) amountCentsValue = isNaN(parsedAmount) ? 0 : Math.round(parsedAmount * 100), memoCache[6] = parsedAmount, memoCache[7] = amountCentsValue;else amountCentsValue = memoCache[7];
  let amountCents = amountCentsValue,
    submit;
  if (memoCache[8] !== actionIndex || memoCache[9] !== amountCents || memoCache[10] !== onCancel || memoCache[11] !== onConfirm) submit = function () {
    let action = actions[actionIndex];
    if (action === "set") {
      if (amountCents <= 0) return;
      onConfirm(amountCents);
    } else if (action === "unlimited") onConfirm(null);else onCancel();
  }, memoCache[8] = actionIndex, memoCache[9] = amountCents, memoCache[10] = onCancel, memoCache[11] = onConfirm, memoCache[12] = submit;else submit = memoCache[12];
  let onSubmit = submit,
    keyHandler;
  if (memoCache[13] !== onSubmit || memoCache[14] !== focusRow) keyHandler = function (event) {
    if (event.key === "tab") {
      event.preventDefault(), setFocusRow(pxp);
      return;
    }
    if (focusRow !== 1) return;
    if (event.key === "up") event.preventDefault(), setFocusRow(0);else if (event.key === "down") event.preventDefault();else if (event.key === "left") event.preventDefault(), setActionIndex(dxp);else if (event.key === "right") event.preventDefault(), setActionIndex((i2) => Math.min(actions.length - 1, i2 + 1));else if (event.key === "return") event.preventDefault(), onSubmit();
  }, memoCache[13] = onSubmit, memoCache[14] = focusRow, memoCache[15] = keyHandler;else keyHandler = memoCache[15];
  let onKeyDown = keyHandler,
    actionLabels;
  if (memoCache[16] === Symbol.for("react.memo_cache_sentinel")) actionLabels = {
    set: "Set limit",
    unlimited: "Set to unlimited",
    cancel: "Cancel"
  }, memoCache[16] = actionLabels;else actionLabels = memoCache[16];
  let labels = actionLabels,
    intro;
  if (memoCache[17] === Symbol.for("react.memo_cache_sentinel")) intro = es.jsx(v, {
    children: "You can set a maximum amount you can spend on usage credits per month."
  }), memoCache[17] = intro;else intro = memoCache[17];
  let inputBorderColor = focusRow === 0 ? "suggestion" : "inactive",
    currencyPrefixText;
  if (memoCache[18] !== currency) currencyPrefixText = Adt(currency), memoCache[18] = currency, memoCache[19] = currencyPrefixText;else currencyPrefixText = memoCache[19];
  let currencyPrefix;
  if (memoCache[20] !== currencyPrefixText) currencyPrefix = es.jsx(v, {
    children: currencyPrefixText
  }), memoCache[20] = currencyPrefixText, memoCache[21] = currencyPrefix;else currencyPrefix = memoCache[21];
  let onInputSubmit, onInputHistoryDown;
  if (memoCache[22] === Symbol.for("react.memo_cache_sentinel")) onInputSubmit = () => setFocusRow(1), onInputHistoryDown = () => setFocusRow(1), memoCache[22] = onInputSubmit, memoCache[23] = onInputHistoryDown;else onInputSubmit = memoCache[22], onInputHistoryDown = memoCache[23];
  let inputFocused = focusRow === 0,
    showCursor = focusRow === 0,
    input;
  if (memoCache[24] !== columns || memoCache[25] !== cursorOffset || memoCache[26] !== inputFocused || memoCache[27] !== showCursor || memoCache[28] !== inputValue) input = es.jsx(ga, {
    value: inputValue,
    onChange: setInputValue,
    onSubmit: onInputSubmit,
    onHistoryDown: onInputHistoryDown,
    disableCursorMovementForUpDownKeys: !0,
    focus: inputFocused,
    showCursor: showCursor,
    columns: columns,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset
  }), memoCache[24] = columns, memoCache[25] = cursorOffset, memoCache[26] = inputFocused, memoCache[27] = showCursor, memoCache[28] = inputValue, memoCache[29] = input;else input = memoCache[29];
  let inputBox;
  if (memoCache[30] !== currencyPrefix || memoCache[31] !== input || memoCache[32] !== inputBorderColor) inputBox = es.jsxs($, {
    borderStyle: "single",
    borderColor: inputBorderColor,
    paddingX: 1,
    children: [currencyPrefix, input]
  }), memoCache[30] = currencyPrefix, memoCache[31] = input, memoCache[32] = inputBorderColor, memoCache[33] = inputBox;else inputBox = memoCache[33];
  let effectiveNote;
  if (memoCache[34] === Symbol.for("react.memo_cache_sentinel")) effectiveNote = es.jsx(v, {
    dimColor: !0,
    children: "This spend limit goes into effect immediately."
  }), memoCache[34] = effectiveNote;else effectiveNote = memoCache[34];
  let actionsRow;
  if (memoCache[35] !== actionIndex || memoCache[36] !== focusRow) actionsRow = es.jsx($, {
    flexDirection: "row",
    gap: 2,
    children: actions.map((action, index) => es.jsxs(v, {
      color: focusRow === 1 && actionIndex === index ? "suggestion" : void 0,
      children: [focusRow === 1 && actionIndex === index ? Xe.pointer : " ", " ", labels[action]]
    }, action))
  }), memoCache[35] = actionIndex, memoCache[36] = focusRow, memoCache[37] = actionsRow;else actionsRow = memoCache[37];
  let body;
  if (memoCache[38] !== onKeyDown || memoCache[39] !== inputBox || memoCache[40] !== actionsRow) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: onKeyDown,
    children: [intro, inputBox, effectiveNote, actionsRow]
  }), memoCache[38] = onKeyDown, memoCache[39] = inputBox, memoCache[40] = actionsRow, memoCache[41] = body;else body = memoCache[41];
  let rendered;
  if (memoCache[42] !== onCancel || memoCache[43] !== body) rendered = es.jsx(Jn, {
    title: "Set monthly spend limit",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[42] = onCancel, memoCache[43] = body, memoCache[44] = rendered;else rendered = memoCache[44];
  return rendered;
}
/** Decrement an index, clamped at 0. */
function dxp(index: any) {
  return Math.max(0, index - 1);
}
/** Toggle focus row between 0 and 1. */
function pxp(focusRow: any) {
  return focusRow === 0 ? 1 : 0;
}
/** "auto_reload_config" step: threshold + reload-to inputs and save/off/cancel. */
function mxp(props: any) {
  let memoCache = zq.c(103),
    {
      current: current,
      pm: paymentMethod,
      currency: currency,
      onSave: onSave,
      onTurnOff: onTurnOff,
      onCancel: onCancel
    } = props,
    {
      columns: columns
    } = _r(),
    isCurrentlyOn = current?.enabled === !0,
    thresholdInitial;
  if (memoCache[0] !== current) thresholdInitial = current?.threshold_in_minor_units ? String(Math.round(current.threshold_in_minor_units / 100)) : "5", memoCache[0] = current, memoCache[1] = thresholdInitial;else thresholdInitial = memoCache[1];
  let thresholdInitialValue = thresholdInitial,
    reloadToInitial;
  if (memoCache[2] !== current) reloadToInitial = current?.reload_to_in_minor_units ? String(Math.round(current.reload_to_in_minor_units / 100)) : "15", memoCache[2] = current, memoCache[3] = reloadToInitial;else reloadToInitial = memoCache[3];
  let reloadToInitialValue = reloadToInitial,
    [thresholdInput, setThresholdInput] = Uf.useState(thresholdInitialValue),
    [reloadToInput, setReloadToInput] = Uf.useState(reloadToInitialValue),
    [thresholdCursor, setThresholdCursor] = Uf.useState(thresholdInitialValue.length),
    [reloadToCursor, setReloadToCursor] = Uf.useState(reloadToInitialValue.length),
    [focusRow, setFocusRow] = Uf.useState(0),
    actionKeysValue;
  if (memoCache[4] !== isCurrentlyOn) actionKeysValue = isCurrentlyOn ? ["save", "off", "cancel"] : ["save", "cancel"], memoCache[4] = isCurrentlyOn, memoCache[5] = actionKeysValue;else actionKeysValue = memoCache[5];
  let actions = actionKeysValue,
    [actionIndex, setActionIndex] = Uf.useState(0),
    parseCentsValue;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) parseCentsValue = function (raw) {
    let amount = parseFloat(raw.replace(/[^0-9.]/g, ""));
    return isNaN(amount) || amount <= 0 ? 0 : Math.round(amount * 100);
  }, memoCache[6] = parseCentsValue;else parseCentsValue = memoCache[6];
  let parseCents = parseCentsValue,
    thresholdCentsValue;
  if (memoCache[7] !== thresholdInput) thresholdCentsValue = parseCents(thresholdInput), memoCache[7] = thresholdInput, memoCache[8] = thresholdCentsValue;else thresholdCentsValue = memoCache[8];
  let thresholdCents = thresholdCentsValue,
    reloadToCentsValue;
  if (memoCache[9] !== reloadToInput) reloadToCentsValue = parseCents(reloadToInput), memoCache[9] = reloadToInput, memoCache[10] = reloadToCentsValue;else reloadToCentsValue = memoCache[10];
  let reloadToCents = reloadToCentsValue,
    validationErrorValue;
  if (memoCache[11] !== currency || memoCache[12] !== reloadToCents || memoCache[13] !== thresholdCents) validationErrorValue = thresholdCents <= 0 || reloadToCents <= 0 ? "Enter an amount" : reloadToCents <= thresholdCents ? "Reload-to must be above threshold" : currency === "USD" && reloadToCents - thresholdCents < w3a ? `Reload must be at least ${y_(w3a, currency, "whole")} above threshold` : "", memoCache[11] = currency, memoCache[12] = reloadToCents, memoCache[13] = thresholdCents, memoCache[14] = validationErrorValue;else validationErrorValue = memoCache[14];
  let validationError = validationErrorValue,
    isValid = !validationError,
    submit;
  if (memoCache[15] !== actionIndex || memoCache[16] !== actions || memoCache[17] !== onCancel || memoCache[18] !== onSave || memoCache[19] !== onTurnOff || memoCache[20] !== reloadToCents || memoCache[21] !== thresholdCents || memoCache[22] !== isValid) submit = function () {
    let action = actions[actionIndex];
    if (action === "save") {
      if (!isValid) return;
      onSave(thresholdCents, reloadToCents);
    } else if (action === "off") onTurnOff();else onCancel();
  }, memoCache[15] = actionIndex, memoCache[16] = actions, memoCache[17] = onCancel, memoCache[18] = onSave, memoCache[19] = onTurnOff, memoCache[20] = reloadToCents, memoCache[21] = thresholdCents, memoCache[22] = isValid, memoCache[23] = submit;else submit = memoCache[23];
  let onSubmit = submit,
    focusPrevRow;
  if (memoCache[24] === Symbol.for("react.memo_cache_sentinel")) focusPrevRow = () => setFocusRow(gxp), memoCache[24] = focusPrevRow;else focusPrevRow = memoCache[24];
  let onShiftTab = focusPrevRow,
    focusNextRow;
  if (memoCache[25] === Symbol.for("react.memo_cache_sentinel")) focusNextRow = () => setFocusRow(hxp), memoCache[25] = focusNextRow;else focusNextRow = memoCache[25];
  let onTab = focusNextRow,
    keyHandler;
  if (memoCache[26] !== onSubmit || memoCache[27] !== actions.length || memoCache[28] !== focusRow) keyHandler = function (event) {
    if (event.key === "tab") {
      if (event.preventDefault(), event.shift) onShiftTab();else onTab();
      return;
    }
    if (focusRow !== 2) return;
    if (event.key === "up") event.preventDefault(), onShiftTab();else if (event.key === "down") event.preventDefault();else if (event.key === "left") event.preventDefault(), setActionIndex(fxp);else if (event.key === "right") event.preventDefault(), setActionIndex((i2) => Math.min(actions.length - 1, i2 + 1));else if (event.key === "return") event.preventDefault(), onSubmit();
  }, memoCache[26] = onSubmit, memoCache[27] = actions.length, memoCache[28] = focusRow, memoCache[29] = keyHandler;else keyHandler = memoCache[29];
  let onKeyDown = keyHandler,
    saveLabel = isCurrentlyOn ? "Agree and save" : "Agree and turn on",
    actionLabelsValue;
  if (memoCache[30] !== saveLabel) actionLabelsValue = {
    save: saveLabel,
    off: "Turn off",
    cancel: "Cancel"
  }, memoCache[30] = saveLabel, memoCache[31] = actionLabelsValue;else actionLabelsValue = memoCache[31];
  let labels = actionLabelsValue,
    currentlyOnBadge;
  if (memoCache[32] !== isCurrentlyOn) currentlyOnBadge = isCurrentlyOn && es.jsx(v, {
    color: "success",
    children: " \xB7 Currently on"
  }), memoCache[32] = isCurrentlyOn, memoCache[33] = currentlyOnBadge;else currentlyOnBadge = memoCache[33];
  let intro;
  if (memoCache[34] !== currentlyOnBadge) intro = es.jsxs(v, {
    children: ["Automatically buy more usage credits when your balance is low.", currentlyOnBadge]
  }), memoCache[34] = currentlyOnBadge, memoCache[35] = intro;else intro = memoCache[35];
  let cardText;
  if (memoCache[36] !== paymentMethod) cardText = Rdt(paymentMethod), memoCache[36] = paymentMethod, memoCache[37] = cardText;else cardText = memoCache[37];
  let cardLine;
  if (memoCache[38] !== cardText) cardLine = es.jsxs(v, {
    dimColor: !0,
    children: ["Card on file: ", cardText]
  }), memoCache[38] = cardText, memoCache[39] = cardLine;else cardLine = memoCache[39];
  let thresholdLabel;
  if (memoCache[40] === Symbol.for("react.memo_cache_sentinel")) thresholdLabel = es.jsx(v, {
    dimColor: !0,
    children: "When usage credit balance falls below:"
  }), memoCache[40] = thresholdLabel;else thresholdLabel = memoCache[40];
  let thresholdBorderColor = focusRow === 0 ? "suggestion" : "inactive",
    thresholdPrefixText;
  if (memoCache[41] !== currency) thresholdPrefixText = Adt(currency), memoCache[41] = currency, memoCache[42] = thresholdPrefixText;else thresholdPrefixText = memoCache[42];
  let thresholdPrefix;
  if (memoCache[43] !== thresholdPrefixText) thresholdPrefix = es.jsx(v, {
    children: thresholdPrefixText
  }), memoCache[43] = thresholdPrefixText, memoCache[44] = thresholdPrefix;else thresholdPrefix = memoCache[44];
  let onThresholdSubmit, onThresholdHistoryDown;
  if (memoCache[45] === Symbol.for("react.memo_cache_sentinel")) onThresholdSubmit = () => setFocusRow(1), onThresholdHistoryDown = () => setFocusRow(1), memoCache[45] = onThresholdSubmit, memoCache[46] = onThresholdHistoryDown;else onThresholdSubmit = memoCache[45], onThresholdHistoryDown = memoCache[46];
  let thresholdFocused = focusRow === 0,
    thresholdShowCursor = focusRow === 0,
    thresholdInputNode;
  if (memoCache[47] !== columns || memoCache[48] !== thresholdCursor || memoCache[49] !== thresholdFocused || memoCache[50] !== thresholdShowCursor || memoCache[51] !== thresholdInput) thresholdInputNode = es.jsx(ga, {
    value: thresholdInput,
    onChange: setThresholdInput,
    onSubmit: onThresholdSubmit,
    onHistoryDown: onThresholdHistoryDown,
    disableCursorMovementForUpDownKeys: !0,
    focus: thresholdFocused,
    showCursor: thresholdShowCursor,
    columns: columns,
    cursorOffset: thresholdCursor,
    onChangeCursorOffset: setThresholdCursor
  }), memoCache[47] = columns, memoCache[48] = thresholdCursor, memoCache[49] = thresholdFocused, memoCache[50] = thresholdShowCursor, memoCache[51] = thresholdInput, memoCache[52] = thresholdInputNode;else thresholdInputNode = memoCache[52];
  let thresholdSection;
  if (memoCache[53] !== thresholdBorderColor || memoCache[54] !== thresholdPrefix || memoCache[55] !== thresholdInputNode) thresholdSection = es.jsxs($, {
    flexDirection: "column",
    children: [thresholdLabel, es.jsxs($, {
      borderStyle: "single",
      borderColor: thresholdBorderColor,
      paddingX: 1,
      children: [thresholdPrefix, thresholdInputNode]
    })]
  }), memoCache[53] = thresholdBorderColor, memoCache[54] = thresholdPrefix, memoCache[55] = thresholdInputNode, memoCache[56] = thresholdSection;else thresholdSection = memoCache[56];
  let reloadToLabel;
  if (memoCache[57] === Symbol.for("react.memo_cache_sentinel")) reloadToLabel = es.jsx(v, {
    dimColor: !0,
    children: "Reload balance to:"
  }), memoCache[57] = reloadToLabel;else reloadToLabel = memoCache[57];
  let reloadToBorderColor = focusRow === 1 ? "suggestion" : "inactive",
    reloadToPrefixText;
  if (memoCache[58] !== currency) reloadToPrefixText = Adt(currency), memoCache[58] = currency, memoCache[59] = reloadToPrefixText;else reloadToPrefixText = memoCache[59];
  let reloadToPrefix;
  if (memoCache[60] !== reloadToPrefixText) reloadToPrefix = es.jsx(v, {
    children: reloadToPrefixText
  }), memoCache[60] = reloadToPrefixText, memoCache[61] = reloadToPrefix;else reloadToPrefix = memoCache[61];
  let onReloadToSubmit, onReloadToHistoryUp, onReloadToHistoryDown;
  if (memoCache[62] === Symbol.for("react.memo_cache_sentinel")) onReloadToSubmit = () => setFocusRow(2), onReloadToHistoryUp = () => setFocusRow(0), onReloadToHistoryDown = () => setFocusRow(2), memoCache[62] = onReloadToSubmit, memoCache[63] = onReloadToHistoryUp, memoCache[64] = onReloadToHistoryDown;else onReloadToSubmit = memoCache[62], onReloadToHistoryUp = memoCache[63], onReloadToHistoryDown = memoCache[64];
  let reloadToFocused = focusRow === 1,
    reloadToShowCursor = focusRow === 1,
    reloadToInputNode;
  if (memoCache[65] !== columns || memoCache[66] !== reloadToCursor || memoCache[67] !== reloadToInput || memoCache[68] !== reloadToFocused || memoCache[69] !== reloadToShowCursor) reloadToInputNode = es.jsx(ga, {
    value: reloadToInput,
    onChange: setReloadToInput,
    onSubmit: onReloadToSubmit,
    onHistoryUp: onReloadToHistoryUp,
    onHistoryDown: onReloadToHistoryDown,
    disableCursorMovementForUpDownKeys: !0,
    focus: reloadToFocused,
    showCursor: reloadToShowCursor,
    columns: columns,
    cursorOffset: reloadToCursor,
    onChangeCursorOffset: setReloadToCursor
  }), memoCache[65] = columns, memoCache[66] = reloadToCursor, memoCache[67] = reloadToInput, memoCache[68] = reloadToFocused, memoCache[69] = reloadToShowCursor, memoCache[70] = reloadToInputNode;else reloadToInputNode = memoCache[70];
  let reloadToSection;
  if (memoCache[71] !== reloadToBorderColor || memoCache[72] !== reloadToPrefix || memoCache[73] !== reloadToInputNode) reloadToSection = es.jsxs($, {
    flexDirection: "column",
    children: [reloadToLabel, es.jsxs($, {
      borderStyle: "single",
      borderColor: reloadToBorderColor,
      paddingX: 1,
      children: [reloadToPrefix, reloadToInputNode]
    })]
  }), memoCache[71] = reloadToBorderColor, memoCache[72] = reloadToPrefix, memoCache[73] = reloadToInputNode, memoCache[74] = reloadToSection;else reloadToSection = memoCache[74];
  let cardTextForTerms;
  if (memoCache[75] !== paymentMethod) cardTextForTerms = Rdt(paymentMethod), memoCache[75] = paymentMethod, memoCache[76] = cardTextForTerms;else cardTextForTerms = memoCache[76];
  let termsNote;
  if (memoCache[77] !== cardTextForTerms) termsNote = es.jsxs(v, {
    dimColor: !0,
    children: ["By selecting Agree, you authorize Anthropic to automatically charge", " ", cardTextForTerms, " on a recurring basis whenever your balance reaches the threshold, per the Consumer Terms (", Q0p, "). Turn off any time here or at ", TY, "."]
  }), memoCache[77] = cardTextForTerms, memoCache[78] = termsNote;else termsNote = memoCache[78];
  let actionItems;
  if (memoCache[79] !== actionIndex || memoCache[80] !== labels || memoCache[81] !== actions || memoCache[82] !== focusRow) actionItems = actions.map((action, index) => es.jsxs(v, {
    color: focusRow === 2 && actionIndex === index ? "suggestion" : void 0,
    children: [focusRow === 2 && actionIndex === index ? Xe.pointer : " ", " ", labels[action]]
  }, action)), memoCache[79] = actionIndex, memoCache[80] = labels, memoCache[81] = actions, memoCache[82] = focusRow, memoCache[83] = actionItems;else actionItems = memoCache[83];
  let validationNode;
  if (memoCache[84] !== actionIndex || memoCache[85] !== actions || memoCache[86] !== validationError || memoCache[87] !== focusRow) validationNode = validationError && focusRow === 2 && actions[actionIndex] === "save" && es.jsxs(v, {
    color: "error",
    children: ["\xB7 ", validationError]
  }), memoCache[84] = actionIndex, memoCache[85] = actions, memoCache[86] = validationError, memoCache[87] = focusRow, memoCache[88] = validationNode;else validationNode = memoCache[88];
  let actionsRow;
  if (memoCache[89] !== actionItems || memoCache[90] !== validationNode) actionsRow = es.jsxs($, {
    flexDirection: "row",
    gap: 2,
    children: [actionItems, validationNode]
  }), memoCache[89] = actionItems, memoCache[90] = validationNode, memoCache[91] = actionsRow;else actionsRow = memoCache[91];
  let body;
  if (memoCache[92] !== onKeyDown || memoCache[93] !== intro || memoCache[94] !== cardLine || memoCache[95] !== thresholdSection || memoCache[96] !== reloadToSection || memoCache[97] !== termsNote || memoCache[98] !== actionsRow) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: onKeyDown,
    children: [intro, cardLine, thresholdSection, reloadToSection, termsNote, actionsRow]
  }), memoCache[92] = onKeyDown, memoCache[93] = intro, memoCache[94] = cardLine, memoCache[95] = thresholdSection, memoCache[96] = reloadToSection, memoCache[97] = termsNote, memoCache[98] = actionsRow, memoCache[99] = body;else body = memoCache[99];
  let rendered;
  if (memoCache[100] !== onCancel || memoCache[101] !== body) rendered = es.jsx(Jn, {
    title: "Auto-reload",
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[100] = onCancel, memoCache[101] = body, memoCache[102] = rendered;else rendered = memoCache[102];
  return rendered;
}
/** Decrement an index, clamped at 0. */
function fxp(index: any) {
  return Math.max(0, index - 1);
}
/** Advance the focus row toward the last (actions) row, clamped at 2. */
function hxp(focusRow: any) {
  return focusRow === 2 ? 2 : focusRow + 1;
}
/** Move the focus row up by one, clamped at 0. */
function gxp(focusRow: any) {
  return focusRow === 0 ? 0 : focusRow - 1;
}
/** Generic amount-entry dialog used by the custom-amount buy step. */
function _xp(props: any) {
  let memoCache = zq.c(39),
    {
      title: title,
      subtitle: subtitle,
      initial: initial,
      minCents: minCents,
      currency: currency,
      footer: footer,
      onSubmit: onSubmit,
      onCancel: onCancel
    } = props,
    {
      columns: columns
    } = _r(),
    [inputValue, setInputValue] = Uf.useState(initial),
    [cursorOffset, setCursorOffset] = Uf.useState(initial.length),
    cleanedInput;
  if (memoCache[0] !== inputValue) {
    let nonNumeric;
    if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) nonNumeric = /[^0-9.]/g, memoCache[2] = nonNumeric;else nonNumeric = memoCache[2];
    cleanedInput = inputValue.replace(nonNumeric, ""), memoCache[0] = inputValue, memoCache[1] = cleanedInput;
  } else cleanedInput = memoCache[1];
  let parsedAmount = parseFloat(cleanedInput),
    amountCentsValue;
  if (memoCache[3] !== parsedAmount) amountCentsValue = isNaN(parsedAmount) ? 0 : Math.round(parsedAmount * 100), memoCache[3] = parsedAmount, memoCache[4] = amountCentsValue;else amountCentsValue = memoCache[4];
  let amountCents = amountCentsValue,
    belowMinimum = minCents !== void 0 && amountCents > 0 && amountCents < minCents,
    submit;
  if (memoCache[5] !== amountCents || memoCache[6] !== onSubmit || memoCache[7] !== belowMinimum) submit = function () {
    if (amountCents <= 0 || belowMinimum) return;
    onSubmit(amountCents);
  }, memoCache[5] = amountCents, memoCache[6] = onSubmit, memoCache[7] = belowMinimum, memoCache[8] = submit;else submit = memoCache[8];
  let onSubmitAmount = submit,
    subtitleNode;
  if (memoCache[9] !== subtitle) subtitleNode = es.jsx(v, {
    dimColor: !0,
    children: subtitle
  }), memoCache[9] = subtitle, memoCache[10] = subtitleNode;else subtitleNode = memoCache[10];
  let currencyPrefixText;
  if (memoCache[11] !== currency) currencyPrefixText = Adt(currency), memoCache[11] = currency, memoCache[12] = currencyPrefixText;else currencyPrefixText = memoCache[12];
  let currencyPrefix;
  if (memoCache[13] !== currencyPrefixText) currencyPrefix = es.jsx(v, {
    children: currencyPrefixText
  }), memoCache[13] = currencyPrefixText, memoCache[14] = currencyPrefix;else currencyPrefix = memoCache[14];
  let input;
  if (memoCache[15] !== columns || memoCache[16] !== cursorOffset || memoCache[17] !== onCancel || memoCache[18] !== onSubmitAmount || memoCache[19] !== inputValue) input = es.jsx(ga, {
    value: inputValue,
    onChange: setInputValue,
    onSubmit: onSubmitAmount,
    onExit: onCancel,
    focus: !0,
    showCursor: !0,
    columns: columns,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset
  }), memoCache[15] = columns, memoCache[16] = cursorOffset, memoCache[17] = onCancel, memoCache[18] = onSubmitAmount, memoCache[19] = inputValue, memoCache[20] = input;else input = memoCache[20];
  let inputRow;
  if (memoCache[21] !== currencyPrefix || memoCache[22] !== input) inputRow = es.jsxs($, {
    flexDirection: "row",
    gap: 1,
    children: [currencyPrefix, input]
  }), memoCache[21] = currencyPrefix, memoCache[22] = input, memoCache[23] = inputRow;else inputRow = memoCache[23];
  let footerNode;
  if (memoCache[24] !== footer) footerNode = footer && es.jsx(v, {
    dimColor: !0,
    children: footer
  }), memoCache[24] = footer, memoCache[25] = footerNode;else footerNode = memoCache[25];
  let minimumWarning;
  if (memoCache[26] !== currency || memoCache[27] !== minCents || memoCache[28] !== belowMinimum) minimumWarning = belowMinimum && minCents !== void 0 && es.jsxs(v, {
    color: "error",
    children: ["Minimum is ", y_(minCents, currency, "whole")]
  }), memoCache[26] = currency, memoCache[27] = minCents, memoCache[28] = belowMinimum, memoCache[29] = minimumWarning;else minimumWarning = memoCache[29];
  let body;
  if (memoCache[30] !== minimumWarning || memoCache[31] !== subtitleNode || memoCache[32] !== inputRow || memoCache[33] !== footerNode) body = es.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [subtitleNode, inputRow, footerNode, minimumWarning]
  }), memoCache[30] = minimumWarning, memoCache[31] = subtitleNode, memoCache[32] = inputRow, memoCache[33] = footerNode, memoCache[34] = body;else body = memoCache[34];
  let rendered;
  if (memoCache[35] !== onCancel || memoCache[36] !== body || memoCache[37] !== title) rendered = es.jsx(Jn, {
    title: title,
    onCancel: onCancel,
    color: "suggestion",
    children: body
  }), memoCache[35] = onCancel, memoCache[36] = body, memoCache[37] = title, memoCache[38] = rendered;else rendered = memoCache[38];
  return rendered;
}
/** "buy_polling" step: poll for purchase confirmation until success/failure/timeout. */
function yxp({
  purchaseId: purchaseId,
  onSuccess: onSuccess,
  onError: onError
}) {
  let attemptsRef = Uf.useRef(0),
    onSuccessRef = Uf.useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  let onErrorRef = Uf.useRef(onError);
  onErrorRef.current = onError;
  let timers = As();
  return Uf.useEffect(() => {
    let cancelled = !1,
      pendingTimer;
    function logResult(status) {
      W("tengu_extra_usage_inline_dialog_buy_result", {
        status: status
      });
    }
    async function poll() {
      if (cancelled) return;
      let resolveSuccess = onSuccessRef.current,
        resolveError = onErrorRef.current;
      if (attemptsRef.current += 1, attemptsRef.current > exp) {
        cancelled = !0, resolveError("Purchase timed out — check claude.ai/settings/usage");
        return;
      }
      try {
        let result = await o5i(purchaseId);
        if (cancelled) return;
        if (result.status === "paid") cancelled = !0, logResult("success"), resolveSuccess();else if (result.status === "failed") cancelled = !0, logResult("failed"), resolveError("Payment failed");else if (result.status === "action_needed") cancelled = !0, logResult("3ds_fallback"), resolveError(`Your card requires additional verification — this purchase was not completed. Try again at ${TY}`);else pendingTimer = timers.setTimeout(poll, Z0p);
      } catch (err) {
        if (cancelled) return;
        if (cancelled = !0, j_(err)) A(`Purchase status poll failed: ${Ce(err)}`, {
          level: "error"
        });else Ie(err);
        resolveError("Failed to check purchase status");
      }
    }
    return poll(), () => {
      cancelled = !0, pendingTimer?.();
    };
  }, [timers, purchaseId]), es.jsx(H3a, {
    message: "Confirming payment… (may take a few seconds)"
  });
}
/** Spinner row shown while a payment is processing. */
function H3a(props: any) {
  let memoCache = zq.c(3),
    {
      message: message
    } = props,
    spinner;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) spinner = es.jsx(N6e, {
    autoplay: !0
  }), memoCache[0] = spinner;else spinner = memoCache[0];
  let rendered;
  if (memoCache[1] !== message) rendered = es.jsxs($, {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    paddingTop: 2,
    children: [spinner, es.jsx(v, {
      dimColor: !0,
      children: message
    })]
  }), memoCache[1] = message, memoCache[2] = rendered;else rendered = memoCache[2];
  return rendered;
}
/** Celebratory success row shown after credits are added. */
function Txp(props: any) {
  let memoCache = zq.c(7),
    {
      message: message,
      onDone: onDone
    } = props,
    animation;
  if (memoCache[0] !== onDone) animation = es.jsx(N6e, {
    sequence: "celebrate",
    onComplete: onDone
  }), memoCache[0] = onDone, memoCache[1] = animation;else animation = memoCache[1];
  let messageNode;
  if (memoCache[2] !== message) messageNode = es.jsx($, {
    marginTop: 1,
    children: es.jsx(v, {
      color: "success",
      children: message
    })
  }), memoCache[2] = message, memoCache[3] = messageNode;else messageNode = memoCache[3];
  let rendered;
  if (memoCache[4] !== animation || memoCache[5] !== messageNode) rendered = es.jsxs($, {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    paddingTop: 1,
    children: [animation, messageNode]
  }), memoCache[4] = animation, memoCache[5] = messageNode, memoCache[6] = rendered;else rendered = memoCache[6];
  return rendered;
}
/**
 * Spinner that resolves a `work` promise and fires `onDone(value)` once both
 * the promise has settled and the celebrate animation has completed.
 */
function k3a({
  message: message,
  work: work,
  onDone: onDone
}) {
  let resultRef = Uf.useRef(null),
    animationDoneRef = Uf.useRef(!1),
    unmountedRef = Uf.useRef(!1),
    onDoneRef = Uf.useRef(onDone);
  onDoneRef.current = onDone;
  let maybeFinish = Uf.useCallback(() => {
    if (unmountedRef.current) return;
    if (resultRef.current && animationDoneRef.current) onDoneRef.current(resultRef.current.value);
  }, []);
  return Uf.useEffect(() => (work.then((value) => {
    resultRef.current = {
      value: value
    }, maybeFinish();
  }).catch((err) => {
    Ie(err), resultRef.current = {
      value: !1
    }, maybeFinish();
  }), () => {
    unmountedRef.current = !0;
  }), [work, maybeFinish]), es.jsxs($, {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    paddingTop: 1,
    children: [es.jsx(N6e, {
      sequence: "celebrate",
      onComplete: () => {
        animationDoneRef.current = !0, maybeFinish();
      }
    }), es.jsx($, {
      marginTop: 1,
      children: es.jsx(v, {
        dimColor: !0,
        children: message
      })
    })]
  });
}
/**
 * Plain spinner that awaits a `work` promise and calls `onDone(value)` (or
 * `onDone(false)` on rejection) as soon as it settles, ignoring the result if
 * the component has unmounted.
 */
function PlainAwait({
  message: message,
  work: work,
  onDone: onDone
}) {
  let onDoneRef = Uf.useRef(onDone);
  return onDoneRef.current = onDone, Uf.useEffect(() => {
    let unmounted = !1;
    return work.then((value) => {
      if (!unmounted) onDoneRef.current(value);
    }).catch((err) => {
      if (Ie(err), !unmounted) onDoneRef.current(!1);
    }), () => {
      unmounted = !0;
    };
  }, [work]), es.jsx($, {
    paddingTop: 1,
    children: es.jsx(Hc, {
      message: message
    })
  });
}
var zq,
  Uf,
  es,
  TY = "https://claude.ai/settings/usage",
  Q0p = "https://www.anthropic.com/legal/consumer-terms",
  Z0p = 2000,
  exp = 30,
  txp = 500,
  w3a = 1000;
var kpo = b(() => {
  Zs();
  Ol();
  Is();
  d_();
  di();
  Wo();
  OE();
  iHe();
  FAn();
  vpo();
  rh();
  ui();
  je();
  ss();
  kt();
  got();
  _ge();
  qoe();
  Jg();
  tr();
  bye();
  qe();
  Ct();
  vn();
  ej();
  Ro();
  zq = x(tt(), 1), Uf = x(et(), 1), es = x(oe(), 1);
});

export {V3t,I3a,v3a,ExtraUsageDialog,nxp,rxp,Rdt,oxp,sxp,ixp,F6e,axp,lxp,cxp,uxp,dxp,pxp,mxp,fxp,hxp,gxp,_xp,yxp,H3a,Txp,k3a,PlainAwait,zq,Uf,es,TY,Q0p,Z0p,exp,txp,w3a,kpo};
