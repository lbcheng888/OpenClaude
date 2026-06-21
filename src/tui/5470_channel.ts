// @ts-nocheck
import {GVl as yGl,xLo as SOo,jVl as gGl,kLo as bOo} from "../../vendor/m5468.ts";
import {mGl as $5l,TXn as PJn,hLo as cOo} from "../../vendor/m5437.ts";
import {Q9 as B9,$8e as T8e,FPe as SPe} from "../../vendor/m5273.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {qWt as cWt,hPo as iDo} from "../../vendor/m5296.ts";
import {sct as Llt,hUn as HFn} from "../../vendor/m3935.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function Lhq(props) {
  let reactCompilerCache = zc_.c(13),
    {
      channel: channel,
      variant: variant,
      components: components,
      layouts: layouts,
      notifications: notifications
    } = props,
    effectiveVariant = variant === undefined ? "inline" : variant,
    effectiveComponents = components === undefined ? yGl : components,
    effectiveLayouts = layouts === undefined ? SOo : layouts,
    effectiveNotifications = notifications === undefined ? gGl : notifications;
  initSpareSessions(channel);
  let currentDialog = $5l();
  if (!currentDialog) return null;
  if ((effectiveLayouts[currentDialog.kind] ?? "inline") !== effectiveVariant) return null;
  let notificationMessage = effectiveNotifications[currentDialog.kind],
    DialogComponent = effectiveComponents[currentDialog.kind];
  if (!DialogComponent) return B9.dismiss(currentDialog.id), null;
  let notificationEl;
  if (reactCompilerCache[0] !== notificationMessage || reactCompilerCache[1] !== currentDialog.id) notificationEl = notificationMessage !== undefined && WgH.createElement(ZRT, {
    dialogId: currentDialog.id,
    message: notificationMessage
  }), reactCompilerCache[0] = notificationMessage, reactCompilerCache[1] = currentDialog.id, reactCompilerCache[2] = notificationEl;else notificationEl = reactCompilerCache[2];
  let onAnswer;
  if (reactCompilerCache[3] !== currentDialog.id) onAnswer = result => B9.answer(currentDialog.id, result), reactCompilerCache[3] = currentDialog.id, reactCompilerCache[4] = onAnswer;else onAnswer = reactCompilerCache[4];
  let dialogEl;
  if (reactCompilerCache[5] !== DialogComponent || reactCompilerCache[6] !== onAnswer || reactCompilerCache[7] !== currentDialog.payload) dialogEl = WgH.createElement(DialogComponent, {
    payload: currentDialog.payload,
    answer: onAnswer
  }), reactCompilerCache[5] = DialogComponent, reactCompilerCache[6] = onAnswer, reactCompilerCache[7] = currentDialog.payload, reactCompilerCache[8] = dialogEl;else dialogEl = reactCompilerCache[8];
  let wrapperEl;
  if (reactCompilerCache[9] !== notificationEl || reactCompilerCache[10] !== dialogEl || reactCompilerCache[11] !== currentDialog.id) wrapperEl = WgH.createElement(B, {
    key: currentDialog.id,
    flexDirection: "column",
    width: "100%"
  }, notificationEl, dialogEl), reactCompilerCache[9] = notificationEl, reactCompilerCache[10] = dialogEl, reactCompilerCache[11] = currentDialog.id, reactCompilerCache[12] = wrapperEl;else wrapperEl = reactCompilerCache[12];
  return wrapperEl;
}
function ZRT(props) {
  let reactCompilerCache = zc_.c(4),
    {
      dialogId: dialogId,
      message: message
    } = props;
  cWt(message, "permission_prompt");
  let resetFocus = Llt(),
    effectFn,
    effectDeps;
  if (reactCompilerCache[0] !== resetFocus || reactCompilerCache[1] !== dialogId) effectFn = () => {
    if (HQ4 === dialogId) return;
    HQ4 = dialogId, resetFocus();
  }, effectDeps = [resetFocus, dialogId], reactCompilerCache[0] = resetFocus, reactCompilerCache[1] = dialogId, reactCompilerCache[2] = effectFn, reactCompilerCache[3] = effectDeps;else effectFn = reactCompilerCache[2], effectDeps = reactCompilerCache[3];
  return ro6.useEffect(effectFn, effectDeps), null;
}
function GRT(isSuppressed) {
  let reactCompilerCache = zc_.c(5),
    isDialogWaiting = T8e(),
    dialogKind = PJn(),
    effectFn,
    effectDeps;
  if (reactCompilerCache[0] !== isSuppressed || reactCompilerCache[1] !== isDialogWaiting || reactCompilerCache[2] !== dialogKind) effectFn = () => {
    if (!isSuppressed || !isDialogWaiting || dialogKind === null) return;
    j("tengu_dialoghost_suppressed", {
      reason: Ue(dialogKind)
    });
  }, effectDeps = [isSuppressed, isDialogWaiting, dialogKind], reactCompilerCache[0] = isSuppressed, reactCompilerCache[1] = isDialogWaiting, reactCompilerCache[2] = dialogKind, reactCompilerCache[3] = effectFn, reactCompilerCache[4] = effectDeps;else effectFn = reactCompilerCache[3], effectDeps = reactCompilerCache[4];
  ro6.useEffect(effectFn, effectDeps);
}
function initSpareSessions(channel) {
  let reactCompilerCache = zc_.c(3);
  GRT(channel !== undefined);
  let setupEffect, setupDeps;
  if (reactCompilerCache[0] !== channel) setupEffect = () => {
    if (!channel) return;
    let openIds = new Set(),
      unsubOpen = channel.subscribe(dialog => {
        openIds.add(dialog.id), B9.open(dialog);
      }),
      unsubCancel = channel.onCancel(RRT),
      unsubUpdate = channel.onUpdate(event => {
        let {
          id: id,
          payload: payload
        } = event;
        if (openIds.has(id)) B9.update(id, payload);
      }),
      unsubClosed = B9.onClosed(event => {
        if (!openIds.delete(event.id)) return;
        channel.reply(event.type === "answered" ? {
          id: event.id,
          result: event.result
        } : {
          id: event.id,
          cancelled: true
        });
      });
    return () => {
      unsubOpen(), unsubCancel(), unsubUpdate(), unsubClosed();
      for (let id of openIds) B9.dismiss(id), channel.reply({
        id: id,
        cancelled: true
      });
      openIds.clear();
    };
  }, setupDeps = [channel], reactCompilerCache[0] = channel, reactCompilerCache[1] = setupEffect, reactCompilerCache[2] = setupDeps;else setupEffect = reactCompilerCache[1], setupDeps = reactCompilerCache[2];
  ro6.useEffect(setupEffect, setupDeps);
}
function RRT(dialogId) {
  B9.dismiss(dialogId);
}
var zc_, WgH, ro6, HQ4;
var _Q4 = b(() => {
  HFn();
  iDo();
  Je();
  Ct();
  SPe();
  cOo();
  bOo();
  zc_ = L(nt(), 1), WgH = L(Te(), 1), ro6 = L(Te(), 1);
});

export {Lhq as HLo,ZRT as oMm,GRT as sMm,initSpareSessions as ILo,RRT as iMm,zc_ as $Gt,WgH as g5e,ro6 as OXn,HQ4 as VVl,_Q4 as KVl};
