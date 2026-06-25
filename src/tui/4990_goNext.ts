// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {AL,d9} from "../../vendor/m4632.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/**
 * Wizard step: enter the agent's system prompt.
 *
 * Renders a multi-line text input bound to `wizardData.systemPrompt`, wires up
 * the "open in external editor" and "go back" key actions, validates that the
 * prompt is non-empty on submit, then advances to the next wizard step.
 *
 * (v190; ported from v185 background-color step — same wizard/footer/render
 *  scaffold, body adapted to the system-prompt content.)
 */
function UOl() {
  /** React compiler memo cache (20 slots). */
  let memoCache = BOl.c(20),
    {
      goNext: goNext,
      goBack: goBack,
      updateWizardData: updateWizardData,
      wizardData: wizardData
    } = iu(),
    /** Current system prompt text. */
    [systemPrompt, setSystemPrompt] = gYn.useState(wizardData.systemPrompt || ""),
    /** Text-input cursor offset. */
    [cursorOffset, setCursorOffset] = gYn.useState(systemPrompt.length),
    /** Validation error message, or null when valid. */
    [validationError, setValidationError] = gYn.useState(null),
    /** Key-action context for the "go back" handler. */
    settingsContext;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) settingsContext = {
    context: "Settings"
  }, memoCache[0] = settingsContext;else settingsContext = memoCache[0];
  Or("confirm:no", goBack, settingsContext);
  /** Handler that opens the prompt in an external editor. */
  let openInEditor;
  if (memoCache[1] !== systemPrompt) openInEditor = async () => {
    let editorResult = await AL(systemPrompt);
    if (editorResult.content !== null) setSystemPrompt(editorResult.content), setCursorOffset(editorResult.content.length);
  }, memoCache[1] = systemPrompt, memoCache[2] = openInEditor;else openInEditor = memoCache[2];
  let handleExternalEditor = openInEditor,
    /** Key-action context for the external-editor handler. */
    chatContext;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) chatContext = {
    context: "Chat"
  }, memoCache[3] = chatContext;else chatContext = memoCache[3];
  Or("chat:externalEditor", handleExternalEditor, chatContext);
  /** Submit handler: validate the prompt, persist it, then advance. */
  let onSubmit;
  if (memoCache[4] !== goNext || memoCache[5] !== systemPrompt || memoCache[6] !== updateWizardData) onSubmit = () => {
    let trimmedPrompt = systemPrompt.trim();
    if (!trimmedPrompt) {
      setValidationError("System prompt is required");
      return;
    }
    setValidationError(null), updateWizardData({
      systemPrompt: trimmedPrompt
    }), goNext();
  }, memoCache[4] = goNext, memoCache[5] = systemPrompt, memoCache[6] = updateWizardData, memoCache[7] = onSubmit;else onSubmit = memoCache[7];
  let handleSubmit = onSubmit,
    /** Memoized footer with key hints. */
    footerElement;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) footerElement = _9.jsxs(bn, {
    children: [_9.jsx(v, {
      children: "Type to enter text"
    }), _9.jsx(at, {
      chord: "enter",
      action: "continue"
    }), _9.jsx(dr, {
      action: "chat:externalEditor",
      context: "Chat",
      fallback: "ctrl+g",
      description: "open in editor"
    }), _9.jsx(dr, {
      action: "confirm:no",
      context: "Settings",
      fallback: "Esc",
      description: "go back"
    })]
  }), memoCache[8] = footerElement;else footerElement = memoCache[8];
  /** Memoized header/hint lines. */
  let headerLine, hintLine;
  if (memoCache[9] === Symbol.for("react.memo_cache_sentinel")) headerLine = _9.jsx(v, {
    children: "Enter the system prompt for your agent:"
  }), hintLine = _9.jsx(v, {
    dimColor: !0,
    children: "Be comprehensive for best results"
  }), memoCache[9] = headerLine, memoCache[10] = hintLine;else headerLine = memoCache[9], hintLine = memoCache[10];
  /** Memoized text-input element. */
  let inputElement;
  if (memoCache[11] !== cursorOffset || memoCache[12] !== handleSubmit || memoCache[13] !== systemPrompt) inputElement = _9.jsx($, {
    marginTop: 1,
    children: _9.jsx(ga, {
      value: systemPrompt,
      onChange: setSystemPrompt,
      onSubmit: handleSubmit,
      placeholder: "You are a helpful code reviewer who...",
      columns: 80,
      cursorOffset: cursorOffset,
      onChangeCursorOffset: setCursorOffset,
      focus: !0,
      showCursor: !0
    })
  }), memoCache[11] = cursorOffset, memoCache[12] = handleSubmit, memoCache[13] = systemPrompt, memoCache[14] = inputElement;else inputElement = memoCache[14];
  /** Memoized validation-error element (rendered only when error present). */
  let errorElement;
  if (memoCache[15] !== validationError) errorElement = validationError && _9.jsx($, {
    marginTop: 1,
    children: _9.jsx(Ba, {
      error: validationError
    })
  }), memoCache[15] = validationError, memoCache[16] = errorElement;else errorElement = memoCache[16];
  /** Memoized wizard-step container. */
  let rendered;
  if (memoCache[17] !== inputElement || memoCache[18] !== errorElement) rendered = _9.jsx(_c, {
    subtitle: "System prompt",
    footerText: footerElement,
    children: _9.jsxs($, {
      flexDirection: "column",
      children: [headerLine, hintLine, inputElement, errorElement]
    })
  }), memoCache[17] = inputElement, memoCache[18] = errorElement, memoCache[19] = rendered;else rendered = memoCache[19];
  return rendered;
}
var BOl, gYn, _9;
var $Ol = b(() => {
  je();
  ss();
  d9();
  uc();
  Is();
  I_();
  Wo();
  rh();
  Fy();
  PE();
  BOl = x(tt(), 1), gYn = x(et(), 1), _9 = x(oe(), 1);
});

export {UOl,BOl,gYn,_9,$Ol};
