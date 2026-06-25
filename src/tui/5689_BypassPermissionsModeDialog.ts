// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {isShuttingDown as ww,gracefulShutdownSync as Rc,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Newline as l4} from "../../vendor/m2446.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Hmc = {};
ft(Hmc, {
  BypassPermissionsModeDialog: () => BypassPermissionsModeDialog
});

/**
 * Dialog component warning the user about Bypass Permissions mode.
 * Prompts for explicit acceptance before enabling the dangerous mode.
 */
function BypassPermissionsModeDialog(props: any) {
  let memoCache = kmc.c(7),
    {
      onAccept: onAccept
    } = props,
    effectDeps: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) effectDeps = [], memoCache[0] = effectDeps;else effectDeps = memoCache[0];

  // Log dialog shown event only once on mount
  mrr.useEffect(PKm, effectDeps);
  let hasResponded = mrr.useRef(!1),
    handleChoice: any;
  if (memoCache[1] !== onAccept) handleChoice = function (choice: any) {
    // Prevent double-handling if already responded or mid-shutdown
    if (hasResponded.current || ww()) return;
    hasResponded.current = !0;
    e: switch (choice) {
      case "accept":
        {
          // Log acceptance, persist skip flag, then invoke parent callback
          W("tengu_bypass_permissions_mode_dialog_accept", {}), ao("userSettings", {
            skipDangerousModePermissionPrompt: !0
          }), onAccept();
          break e;
        }
      case "decline":
        // Exit cleanly when user declines
        Rc(1);
    }
  }, memoCache[1] = onAccept, memoCache[2] = handleChoice;else handleChoice = memoCache[2];
  let dispatchChoice = handleChoice,
    cancelHandler: any;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel"))
    // Cancel means the user closed the dialog (not a button press) — also exit
    cancelHandler = () => {
    hasResponded.current = !0, Rc(0);
  }, memoCache[3] = cancelHandler;else cancelHandler = memoCache[3];
  let onCancel = cancelHandler,
    warningBody: any;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) warningBody = YSe.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [YSe.jsxs(v, {
      children: ["In Bypass Permissions mode, Claude Code will not ask for your approval before running potentially dangerous commands.", YSe.jsx(l4, {}), "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."]
    }), YSe.jsx(v, {
      children: "By proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."
    }), YSe.jsx(Ss, {
      url: "https://code.claude.com/docs/en/security"
    })]
  }), memoCache[4] = warningBody;else warningBody = memoCache[4];
  let dialogElement: any;
  if (memoCache[5] !== dispatchChoice)
    // Render the warning dialog with Accept/No-exit confirm buttons
    dialogElement = YSe.jsxs(Jn, {
    title: "WARNING: Claude Code running in Bypass Permissions mode",
    color: "error",
    onCancel: onCancel,
    children: [warningBody, YSe.jsx(Bl, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, I accept",
      cancelLabel: "No, exit",
      onConfirm: () => dispatchChoice("accept"),
      onCancel: () => dispatchChoice("decline")
    })]
  }), memoCache[5] = dispatchChoice, memoCache[6] = dialogElement;else dialogElement = memoCache[6];
  return dialogElement;
}

/** Effect callback: logs that the bypass-permissions dialog was shown. */
function PKm() {
  W("tengu_bypass_permissions_mode_dialog_shown", {});
}
var kmc, mrr, YSe;
var Imc = b(() => {
  kt();
  je();
  Np();
  br();
  d_();
  di();
  kmc = x(tt(), 1), mrr = x(et(), 1), YSe = x(oe(), 1);
});
export {Hmc,BypassPermissionsModeDialog,PKm,kmc,mrr,YSe,Imc};
