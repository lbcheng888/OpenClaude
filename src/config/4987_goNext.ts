// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Kc,Jm} from "./2207_Jm.ts";
import {OUe,rz} from "./2253_displayName.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Wizard step: "Configure agent memory" confirmation screen.
 *
 * Renders a single-select list letting the user pick the persistence scope for
 * an agent's memory (user / project / local / none). The chosen scope is folded
 * back into the wizard's `finalAgent` (including a re-wired `getSystemPrompt`
 * that appends the memory instructions) before advancing to the next step.
 *
 * Uses the React Compiler memoization cache (`IOl.c(13)`): slot `e[i]` caches a
 * value keyed by its inputs, recomputing only when an input changes. The
 * `Symbol.for("react.memo_cache_sentinel")` slots are one-time-init constants.
 */
function xOl() {
  /** React Compiler memo cache: 13 slots. */
  let memoCache = IOl.c(13),
    {
      goNext,
      goBack,
      updateWizardData,
      wizardData
    } = iu(),
    /** Cached config object passed to the back-navigation handler. */
    cancelConfig;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) cancelConfig = {
    context: "Confirmation"
  }, memoCache[0] = cancelConfig;else cancelConfig = memoCache[0];
  Or("confirm:no", goBack, cancelConfig);
  /** Whether the user-settings scope was selected (controls option ordering / "Recommended" tag). */
  let isUserSettingsLocation = wizardData.location === "userSettings",
    /** Memory-scope select options, ordered so the recommended scope comes first. */
    memoryOptions;
  if (memoCache[1] !== isUserSettingsLocation) memoryOptions = isUserSettingsLocation ? [{
    label: "User scope (~/.claude/agent-memory/) (Recommended)",
    value: "user"
  }, {
    label: "None (no persistent memory)",
    value: "none"
  }, {
    label: "Project scope (.claude/agent-memory/)",
    value: "project"
  }, {
    label: "Local scope (.claude/agent-memory-local/)",
    value: "local"
  }] : [{
    label: "Project scope (.claude/agent-memory/) (Recommended)",
    value: "project"
  }, {
    label: "None (no persistent memory)",
    value: "none"
  }, {
    label: "User scope (~/.claude/agent-memory/)",
    value: "user"
  }, {
    label: "Local scope (.claude/agent-memory-local/)",
    value: "local"
  }], memoCache[1] = isUserSettingsLocation, memoCache[2] = memoryOptions;else memoryOptions = memoCache[2];
  let options = memoryOptions,
    /** Selection handler: persists chosen memory scope and advances the wizard. */
    handleSelect;
  if (memoCache[3] !== goNext || memoCache[4] !== updateWizardData || memoCache[5] !== wizardData.finalAgent || memoCache[6] !== wizardData.systemPrompt) handleSelect = (selectedValue: string) => {
    /** Normalize the "none" sentinel to undefined (no persistent memory). */
    let selectedMemory = selectedValue === "none" ? void 0 : selectedValue,
      agentType = wizardData.finalAgent?.agentType;
    updateWizardData({
      selectedMemory: selectedMemory,
      finalAgent: wizardData.finalAgent ? {
        ...wizardData.finalAgent,
        memory: selectedMemory,
        getSystemPrompt: Kc() && selectedMemory && agentType ? () => wizardData.systemPrompt + `

` + OUe(agentType, selectedMemory) : () => wizardData.systemPrompt
      } : void 0
    }), goNext();
  }, memoCache[3] = goNext, memoCache[4] = updateWizardData, memoCache[5] = wizardData.finalAgent, memoCache[6] = wizardData.systemPrompt, memoCache[7] = handleSelect;else handleSelect = memoCache[7];
  let onSelect = handleSelect,
    /** Cached footer hint (key chords) rendered once. */
    footer;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) footer = QTe.jsxs(bn, {
    children: [QTe.jsx(at, {
      chord: ["up", "down"],
      action: "navigate"
    }), QTe.jsx(at, {
      chord: "enter",
      action: "select"
    }), QTe.jsx(dr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "go back"
    })]
  }), memoCache[8] = footer;else footer = memoCache[8];
  /** Memoized rendered screen. */
  let screen;
  if (memoCache[9] !== goBack || memoCache[10] !== onSelect || memoCache[11] !== options) screen = QTe.jsx(_c, {
    subtitle: "Configure agent memory",
    footerText: footer,
    children: QTe.jsx($, {
      children: QTe.jsx(hr, {
        options: options,
        onChange: onSelect,
        onCancel: goBack
      }, "memory-select")
    })
  }), memoCache[9] = goBack, memoCache[10] = onSelect, memoCache[11] = options, memoCache[12] = screen;else screen = memoCache[12];
  return screen;
}
var IOl, QTe;
var DOl = b(() => {
  je();
  ss();
  Jm();
  rz();
  uc();
  Ol();
  Is();
  Wo();
  Fy();
  PE();
  IOl = x(tt(), 1), QTe = x(oe(), 1);
});

export {xOl,IOl,QTe,DOl};
