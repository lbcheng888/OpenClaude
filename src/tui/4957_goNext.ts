// @ts-nocheck
import {Eu as bu} from "../../vendor/m3812.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {xu as Ru,tA as iA} from "../config/2201_tA.ts";
import {NFe as mFe,uZ as tZ} from "../config/2245_displayName.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {React as Pc,CE as SE} from "../../vendor/m3813.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {$y as Fy} from "../../vendor/m3814.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function JJ4() {
  let memoCache = jJ4.c(13),
    {
      goNext: goNext,
      goBack: goBack,
      updateWizardData: updateWizardData,
      wizardData: wizardData
    } = bu(),
    confirmContext;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) confirmContext = {
    context: "Confirmation"
  }, memoCache[0] = confirmContext;else confirmContext = memoCache[0];
  Ir("confirm:no", goBack, confirmContext);
  let isUserSettings = wizardData.location === "userSettings",
    memoryOptions;
  if (memoCache[1] !== isUserSettings) memoryOptions = isUserSettings ? [{
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
  }], memoCache[1] = isUserSettings, memoCache[2] = memoryOptions;else memoryOptions = memoCache[2];
  let options = memoryOptions,
    handleMemorySelect;
  if (memoCache[3] !== goNext || memoCache[4] !== updateWizardData || memoCache[5] !== wizardData.finalAgent || memoCache[6] !== wizardData.systemPrompt) handleMemorySelect = m => {
    let f = m === "none" ? undefined : m,
      A = wizardData.finalAgent?.agentType;
    updateWizardData({
      selectedMemory: f,
      finalAgent: wizardData.finalAgent ? {
        ...wizardData.finalAgent,
        memory: f,
        getSystemPrompt: Ru() && f && A ? () => wizardData.systemPrompt + `

` + mFe(A, f) : () => wizardData.systemPrompt
      } : undefined
    }), goNext();
  }, memoCache[3] = goNext, memoCache[4] = updateWizardData, memoCache[5] = wizardData.finalAgent, memoCache[6] = wizardData.systemPrompt, memoCache[7] = handleMemorySelect;else handleMemorySelect = memoCache[7];
  let onMemorySelect = handleMemorySelect,
    footerElement;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) footerElement = mLH.default.createElement(hn, null, mLH.default.createElement(lt, {
    chord: ["up", "down"],
    action: "navigate"
  }), mLH.default.createElement(lt, {
    chord: "enter",
    action: "select"
  }), mLH.default.createElement(ur, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "go back"
  })), memoCache[8] = footerElement;else footerElement = memoCache[8];
  let rendered;
  if (memoCache[9] !== goBack || memoCache[10] !== onMemorySelect || memoCache[11] !== options) rendered = mLH.default.createElement(Pc, {
    subtitle: "Configure agent memory",
    footerText: footerElement
  }, mLH.default.createElement(B, null, mLH.default.createElement(Ar, {
    key: "memory-select",
    options: options,
    onChange: onMemorySelect,
    onCancel: goBack
  }))), memoCache[9] = goBack, memoCache[10] = onMemorySelect, memoCache[11] = options, memoCache[12] = rendered;else rendered = memoCache[12];
  return rendered;
}
var jJ4, mLH;
var DJ4 = b(() => {
  Je();
  _s();
  iA();
  tZ();
  Ec();
  zl();
  qs();
  ts();
  Fy();
  SE();
  jJ4 = L(nt(), 1), mLH = L(Te(), 1);
});

export {JJ4 as mRl,jJ4 as pRl,mLH as nPe,DJ4 as fRl};
