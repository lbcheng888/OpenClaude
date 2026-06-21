// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {Bk,gracefulShutdownSync,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Newline} from "../../vendor/m2436.ts";
import {Link} from "../../vendor/m2427.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var Ooc = {};
isFullscreenWithTTY(Ooc, {
  BypassPermissionsModeDialog: () => BypassPermissionsModeDialog
});

/**
 * Dialog component warning the user about Bypass Permissions mode.
 * Prompts for explicit acceptance before enabling the dangerous mode.
 */
function BypassPermissionsModeDialog(props: any) {
  let memoCache = Poc.c(7),
    {
      onAccept: onAccept
    } = props,
    effectDeps: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) effectDeps = [], memoCache[0] = effectDeps;else effectDeps = memoCache[0];

  // Log dialog shown event only once on mount
  iX.useEffect(K9m, effectDeps);
  let hasResponded = iX.useRef(!1),
    handleChoice: any;
  if (memoCache[1] !== onAccept) handleChoice = function (choice: any) {
    // Prevent double-handling if already responded or mid-shutdown
    if (hasResponded.current || Bk()) return;
    hasResponded.current = !0;
    e: switch (choice) {
      case "accept":
        {
          // Log acceptance, persist skip flag, then invoke parent callback
          logEvent("tengu_bypass_permissions_mode_dialog_accept", {}), updateSettingsForSource("userSettings", {
            skipDangerousModePermissionPrompt: !0
          }), onAccept();
          break e;
        }
      case "decline":
        // Exit cleanly when user declines
        gracefulShutdownSync(1);
    }
  }, memoCache[1] = onAccept, memoCache[2] = handleChoice;else handleChoice = memoCache[2];
  let dispatchChoice = handleChoice,
    cancelHandler: any;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel"))
    // Cancel means the user closed the dialog (not a button press) — also exit
    cancelHandler = () => {
      hasResponded.current = !0, gracefulShutdownSync(0);
    }, memoCache[3] = cancelHandler;else cancelHandler = memoCache[3];
  let onCancel = cancelHandler,
    warningBody: any;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) warningBody = iX.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, iX.default.createElement(Text, null, "In Bypass Permissions mode, Claude Code will not ask for your approval before running potentially dangerous commands.", iX.default.createElement(Newline, null), "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."), iX.default.createElement(Text, null, "By proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."), iX.default.createElement(Link, {
    url: "https://code.claude.com/docs/en/security"
  })), memoCache[4] = warningBody;else warningBody = memoCache[4];
  let dialogElement: any;
  if (memoCache[5] !== dispatchChoice)
    // Render the warning dialog with Accept/No-exit confirm buttons
    dialogElement = iX.default.createElement(Kn, {
      title: "WARNING: Claude Code running in Bypass Permissions mode",
      color: "error",
      onCancel: onCancel
    }, warningBody, iX.default.createElement(ac, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, I accept",
      cancelLabel: "No, exit",
      onConfirm: () => dispatchChoice("accept"),
      onCancel: () => dispatchChoice("decline")
    })), memoCache[5] = dispatchChoice, memoCache[6] = dialogElement;else dialogElement = memoCache[6];
  return dialogElement;
}

/** Effect callback: logs that the bypass-permissions dialog was shown. */
function K9m() {
  logEvent("tengu_bypass_permissions_mode_dialog_shown", {});
}
var Poc, iX;
var Loc = b(() => {
  Ct();
  ze();
  ym();
  yr();
  e_();
  Li();
  Poc = M(rt(), 1), iX = M(Te(), 1);
});
export {Ooc,BypassPermissionsModeDialog,K9m,Poc,iX,Loc};
