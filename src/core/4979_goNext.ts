// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {uYn,b0o} from "../../vendor/m4972.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Wizard step component: pick a background color for a newly-created agent.
 *
 * This is a React function component compiled by the React Compiler, so it uses
 * a memoization cache (`cOl.c(14)`) with a 14-slot array. Each slot caches either
 * a dependency value or a derived/memoized result; the `Symbol.for("react.memo_cache_sentinel")`
 * comparison detects the first render so constants are computed once.
 *
 * On confirm it writes the chosen color plus the finalized agent definition into
 * the wizard data, then advances to the next step.
 */
function uOl(): unknown {
  /** React Compiler memoization cache: 14 slots. */
  let memoCache = cOl.c(14),
    {
      goNext: advanceToNextStep,
      goBack: returnToPreviousStep,
      updateWizardData,
      wizardData
    } = iu(),
    /** Stable options object for the "go back" key handler. */
    backHandlerOptions: { context: string };
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) backHandlerOptions = {
    context: "Confirmation"
  }, memoCache[0] = backHandlerOptions; else backHandlerOptions = memoCache[0];
  Or("confirm:no", returnToPreviousStep, backHandlerOptions);
  /** Memoized confirm callback: persists the selected color + final agent, then advances. */
  let onConfirmSelection: (selectedColor: string | undefined) => void;
  if (memoCache[1] !== advanceToNextStep || memoCache[2] !== updateWizardData || memoCache[3] !== wizardData.agentType || memoCache[4] !== wizardData.location || memoCache[5] !== wizardData.selectedModel || memoCache[6] !== wizardData.selectedTools || memoCache[7] !== wizardData.systemPrompt || memoCache[8] !== wizardData.whenToUse) onConfirmSelection = selectedColor => {
    updateWizardData({
      selectedColor,
      finalAgent: {
        agentType: wizardData.agentType,
        whenToUse: wizardData.whenToUse,
        getSystemPrompt: () => wizardData.systemPrompt,
        tools: wizardData.selectedTools,
        ...(wizardData.selectedModel && {
          model: wizardData.selectedModel
        }),
        ...(selectedColor && {
          color: selectedColor
        }),
        source: wizardData.location
      }
    }), advanceToNextStep();
  }, memoCache[1] = advanceToNextStep, memoCache[2] = updateWizardData, memoCache[3] = wizardData.agentType, memoCache[4] = wizardData.location, memoCache[5] = wizardData.selectedModel, memoCache[6] = wizardData.selectedTools, memoCache[7] = wizardData.systemPrompt, memoCache[8] = wizardData.whenToUse, memoCache[9] = onConfirmSelection; else onConfirmSelection = memoCache[9];
  let confirmCallback = onConfirmSelection,
    /** Memoized footer hint element (navigation keybinding legend). */
    footerHint: unknown;
  if (memoCache[10] === Symbol.for("react.memo_cache_sentinel")) footerHint = JTe.jsxs(bn, {
    children: [JTe.jsx(at, {
      chord: ["up", "down"],
      action: "navigate"
    }), JTe.jsx(at, {
      chord: "enter",
      action: "select"
    }), JTe.jsx(dr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "go back"
    })]
  }), memoCache[10] = footerHint; else footerHint = memoCache[10];
  let agentName = wizardData.agentType || "agent",
    /** Memoized rendered step container. */
    stepElement: unknown;
  if (memoCache[11] !== confirmCallback || memoCache[12] !== agentName) stepElement = JTe.jsx(_c, {
    subtitle: "Choose background color",
    footerText: footerHint,
    children: JTe.jsx($, {
      children: JTe.jsx(uYn, {
        agentName,
        currentColor: "automatic",
        onConfirm: confirmCallback
      })
    })
  }), memoCache[11] = confirmCallback, memoCache[12] = agentName, memoCache[13] = stepElement; else stepElement = memoCache[13];
  return stepElement;
}
var cOl, JTe;
var dOl = b(() => {
  je();
  ss();
  uc();
  Is();
  Wo();
  Fy();
  PE();
  b0o();
  cOl = x(tt(), 1), JTe = x(oe(), 1);
});

export {uOl,cOl,JTe,dOl};
