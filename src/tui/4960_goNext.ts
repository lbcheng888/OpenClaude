// @ts-nocheck
import {Eu as bu} from "../../vendor/m3812.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {iM as XL,q9 as R9} from "../../vendor/m4604.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {nl as Za,v_ as C_} from "../../vendor/m2573.ts";
import {React as Pc,CE as SE} from "../../vendor/m3813.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {$y as Fy} from "../../vendor/m3814.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function LJ4() {
  let memoCache = RJ4.c(20),
    {
      goNext: goNext,
      goBack: goBack,
      updateWizardData: updateWizardData,
      wizardData: wizardData
    } = bu(),
    [systemPromptText, setSystemPromptText] = zy.useState(wizardData.systemPrompt || ""),
    [cursorOffset, setCursorOffset] = zy.useState(systemPromptText.length),
    [errorMessage, setErrorMessage] = zy.useState(null),
    confirmNoContext;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) confirmNoContext = {
    context: "Settings"
  }, memoCache[0] = confirmNoContext;else confirmNoContext = memoCache[0];
  Ir("confirm:no", goBack, confirmNoContext);
  let openExternalEditorHandler;
  if (memoCache[1] !== systemPromptText) openExternalEditorHandler = async () => {
    let R = await XL(systemPromptText);
    if (R.content !== null) setSystemPromptText(R.content), setCursorOffset(R.content.length);
  }, memoCache[1] = systemPromptText, memoCache[2] = openExternalEditorHandler;else openExternalEditorHandler = memoCache[2];
  let openExternalEditor = openExternalEditorHandler,
    chatContext;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) chatContext = {
    context: "Chat"
  }, memoCache[3] = chatContext;else chatContext = memoCache[3];
  Ir("chat:externalEditor", openExternalEditor, chatContext);
  let handleSubmit;
  if (memoCache[4] !== goNext || memoCache[5] !== systemPromptText || memoCache[6] !== updateWizardData) handleSubmit = () => {
    let R = systemPromptText.trim();
    if (!R) {
      setErrorMessage("System prompt is required");
      return;
    }
    setErrorMessage(null), updateWizardData({
      systemPrompt: R
    }), goNext();
  }, memoCache[4] = goNext, memoCache[5] = systemPromptText, memoCache[6] = updateWizardData, memoCache[7] = handleSubmit;else handleSubmit = memoCache[7];
  let onSubmit = handleSubmit,
    footerElement;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) footerElement = zy.default.createElement(hn, null, zy.default.createElement(w, null, "Type to enter text"), zy.default.createElement(lt, {
    chord: "enter",
    action: "continue"
  }), zy.default.createElement(ur, {
    action: "chat:externalEditor",
    context: "Chat",
    fallback: "ctrl+g",
    description: "open in editor"
  }), zy.default.createElement(ur, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "go back"
  })), memoCache[8] = footerElement;else footerElement = memoCache[8];
  let labelElement, hintElement;
  if (memoCache[9] === Symbol.for("react.memo_cache_sentinel")) labelElement = zy.default.createElement(w, null, "Enter the system prompt for your agent:"), hintElement = zy.default.createElement(w, {
    dimColor: true
  }, "Be comprehensive for best results"), memoCache[9] = labelElement, memoCache[10] = hintElement;else labelElement = memoCache[9], hintElement = memoCache[10];
  let inputElement;
  if (memoCache[11] !== cursorOffset || memoCache[12] !== onSubmit || memoCache[13] !== systemPromptText) inputElement = zy.default.createElement(B, {
    marginTop: 1
  }, zy.default.createElement(Pa, {
    value: systemPromptText,
    onChange: setSystemPromptText,
    onSubmit: onSubmit,
    placeholder: "You are a helpful code reviewer who...",
    columns: 80,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset,
    focus: true,
    showCursor: true
  })), memoCache[11] = cursorOffset, memoCache[12] = onSubmit, memoCache[13] = systemPromptText, memoCache[14] = inputElement;else inputElement = memoCache[14];
  let errorElement;
  if (memoCache[15] !== errorMessage) errorElement = errorMessage && zy.default.createElement(B, {
    marginTop: 1
  }, zy.default.createElement(Za, {
    error: errorMessage
  })), memoCache[15] = errorMessage, memoCache[16] = errorElement;else errorElement = memoCache[16];
  let rendered;
  if (memoCache[17] !== inputElement || memoCache[18] !== errorElement) rendered = zy.default.createElement(Pc, {
    subtitle: "System prompt",
    footerText: footerElement
  }, zy.default.createElement(B, {
    flexDirection: "column"
  }, labelElement, hintElement, inputElement, errorElement)), memoCache[17] = inputElement, memoCache[18] = errorElement, memoCache[19] = rendered;else rendered = memoCache[19];
  return rendered;
}
var RJ4, zy;
var hJ4 = b(() => {
  Je();
  _s();
  R9();
  Ec();
  qs();
  C_();
  ts();
  rh();
  Fy();
  SE();
  RJ4 = L(nt(), 1), zy = L(Te(), 1);
});

export {LJ4 as bRl,RJ4 as SRl,zy as mM,hJ4 as ERl};
