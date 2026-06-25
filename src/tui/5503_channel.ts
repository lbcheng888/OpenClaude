// @ts-nocheck
import {Hec,JBo,wec,XBo} from "../../vendor/m5501.ts";
import {JQl,btr,FBo} from "../../vendor/m5470.ts";
import {T9,OGe,NOe} from "../../vendor/m5310.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b7t,WNo} from "../../vendor/m5333.ts";
import {gdt,W9n} from "../../vendor/m3997.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * DialogHost — renders the current dialog from a notification channel.
 *
 * Reads the active dialog via $5l()/JQl(), picks a layout/variant gate,
 * resolves the notification message + dialog component, memoizes the
 * resulting React elements through the React-compiler cache, and wires the
 * channel subscription lifecycle into the dialog store (B9 / T9).
 */
interface DialogHostProps {
  channel?: any;
  variant?: string;
  components?: Record<string, any>;
  layouts?: Record<string, string>;
  notifications?: Record<string, any>;
}

function QBo(props: DialogHostProps) {
  let reactCompilerCache = hzt.c(14),
    {
      channel: channel,
      variant: variant,
      components: components,
      layouts: layouts,
      notifications: notifications
    } = props,
    effectiveVariant = variant === void 0 ? "inline" : variant,
    effectiveComponents = components === void 0 ? Hec : components,
    effectiveLayouts = layouts === void 0 ? JBo : layouts,
    effectiveNotifications = notifications === void 0 ? wec : notifications;
  ZBo(channel);
  let currentDialog = JQl();
  if (!currentDialog) return null;
  if ((effectiveLayouts[currentDialog.kind] ?? "inline") !== effectiveVariant) return null;
  let notificationMessage = effectiveNotifications[currentDialog.kind],
    DialogComponent = effectiveComponents[currentDialog.kind];
  if (!DialogComponent) return T9.dismiss(currentDialog.id), null;
  let notificationEl;
  if (reactCompilerCache[0] !== notificationMessage || reactCompilerCache[1] !== currentDialog.id) notificationEl = notificationMessage !== void 0 && fzt.jsx(m3m, {
    dialogId: currentDialog.id,
    message: notificationMessage
  }), reactCompilerCache[0] = notificationMessage, reactCompilerCache[1] = currentDialog.id, reactCompilerCache[2] = notificationEl;else notificationEl = reactCompilerCache[2];
  let onAnswer;
  if (reactCompilerCache[3] !== currentDialog.id || reactCompilerCache[4] !== currentDialog.swappedAt) onAnswer = (result: any) => {
    if (currentDialog.swappedAt !== void 0 && Date.now() - currentDialog.swappedAt < 150) return;
    T9.answer(currentDialog.id, result);
  }, reactCompilerCache[3] = currentDialog.id, reactCompilerCache[4] = currentDialog.swappedAt, reactCompilerCache[5] = onAnswer;else onAnswer = reactCompilerCache[5];
  let dialogEl;
  if (reactCompilerCache[6] !== DialogComponent || reactCompilerCache[7] !== onAnswer || reactCompilerCache[8] !== currentDialog.payload) dialogEl = fzt.jsx(DialogComponent, {
    payload: currentDialog.payload,
    answer: onAnswer
  }), reactCompilerCache[6] = DialogComponent, reactCompilerCache[7] = onAnswer, reactCompilerCache[8] = currentDialog.payload, reactCompilerCache[9] = dialogEl;else dialogEl = reactCompilerCache[9];
  let wrapperEl;
  if (reactCompilerCache[10] !== notificationEl || reactCompilerCache[11] !== dialogEl || reactCompilerCache[12] !== currentDialog.id) wrapperEl = fzt.jsxs($, {
    flexDirection: "column",
    width: "100%",
    children: [notificationEl, dialogEl]
  }, currentDialog.id), reactCompilerCache[10] = notificationEl, reactCompilerCache[11] = dialogEl, reactCompilerCache[12] = currentDialog.id, reactCompilerCache[13] = wrapperEl;else wrapperEl = reactCompilerCache[13];
  return wrapperEl;
}

interface DialogNotificationProps {
  dialogId: any;
  message: any;
}

/** Fires the permission-prompt notification and resets focus once per dialog id. */
function m3m(props: DialogNotificationProps) {
  let reactCompilerCache = hzt.c(4),
    {
      dialogId: dialogId,
      message: message
    } = props;
  b7t(message, "permission_prompt");
  let resetFocus = gdt(),
    effectFn,
    effectDeps;
  if (reactCompilerCache[0] !== resetFocus || reactCompilerCache[1] !== dialogId) effectFn = () => {
    if (Iec === dialogId) return;
    Iec = dialogId, resetFocus();
  }, effectDeps = [resetFocus, dialogId], reactCompilerCache[0] = resetFocus, reactCompilerCache[1] = dialogId, reactCompilerCache[2] = effectFn, reactCompilerCache[3] = effectDeps;else effectFn = reactCompilerCache[2], effectDeps = reactCompilerCache[3];
  return Ltr.useEffect(effectFn, effectDeps), null;
}

/** Logs a telemetry event when a dialog is suppressed while one is waiting. */
function f3m(isSuppressed: boolean) {
  let reactCompilerCache = hzt.c(5),
    isDialogWaiting = OGe(),
    dialogKind = btr(),
    effectFn,
    effectDeps;
  if (reactCompilerCache[0] !== isSuppressed || reactCompilerCache[1] !== isDialogWaiting || reactCompilerCache[2] !== dialogKind) effectFn = () => {
    if (!isSuppressed || !isDialogWaiting || dialogKind === null) return;
    W("tengu_dialoghost_suppressed", {
      reason: Le(dialogKind)
    });
  }, effectDeps = [isSuppressed, isDialogWaiting, dialogKind], reactCompilerCache[0] = isSuppressed, reactCompilerCache[1] = isDialogWaiting, reactCompilerCache[2] = dialogKind, reactCompilerCache[3] = effectFn, reactCompilerCache[4] = effectDeps;else effectFn = reactCompilerCache[3], effectDeps = reactCompilerCache[4];
  Ltr.useEffect(effectFn, effectDeps);
}

/** Subscribes the dialog channel to the dialog store and tears down on unmount. */
function ZBo(channel: any) {
  let reactCompilerCache = hzt.c(3);
  f3m(channel !== void 0);
  let setupEffect, setupDeps;
  if (reactCompilerCache[0] !== channel) setupEffect = () => {
    if (!channel) return;
    let openIds = new Set(),
      unsubOpen = channel.subscribe(dialog => {
        openIds.add(dialog.id), T9.open(dialog);
      }),
      unsubCancel = channel.onCancel(h3m),
      unsubUpdate = channel.onUpdate(event => {
        let {
          id: id,
          payload: payload
        } = event;
        if (openIds.has(id)) T9.update(id, payload);
      }),
      unsubClosed = T9.onClosed(event => {
        if (!openIds.delete(event.id)) return;
        channel.reply(event.type === "answered" ? {
          id: event.id,
          result: event.result
        } : {
          id: event.id,
          cancelled: !0
        });
      });
    return () => {
      unsubOpen(), unsubCancel(), unsubUpdate(), unsubClosed();
      for (let id of openIds) T9.dismiss(id), channel.reply({
        id: id,
        cancelled: !0
      });
      openIds.clear();
    };
  }, setupDeps = [channel], reactCompilerCache[0] = channel, reactCompilerCache[1] = setupEffect, reactCompilerCache[2] = setupDeps;else setupEffect = reactCompilerCache[1], setupDeps = reactCompilerCache[2];
  Ltr.useEffect(setupEffect, setupDeps);
}

/** Channel cancel handler: dismiss the dialog by id. */
function h3m(dialogId: any) {
  T9.dismiss(dialogId);
}
var hzt, Ltr, fzt, Iec;
var xec = b(() => {
  W9n();
  WNo();
  je();
  kt();
  NOe();
  FBo();
  XBo();
  hzt = x(tt(), 1), Ltr = x(et(), 1), fzt = x(oe(), 1);
});

export {QBo,m3m,f3m,ZBo,h3m,hzt,Ltr,fzt,Iec,xec};
