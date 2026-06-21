// @ts-nocheck
import {Eu as bu} from "../../vendor/m3812.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {React as Pc,CE as SE} from "../../vendor/m3813.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {bVn as LGn,iwo as tvo} from "../../vendor/m4942.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {$y as Fy} from "../../vendor/m3814.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function ij4() {
  let memoCache = nj4.c(14),
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
  let handleColorSelect;
  if (memoCache[1] !== goNext || memoCache[2] !== updateWizardData || memoCache[3] !== wizardData.agentType || memoCache[4] !== wizardData.location || memoCache[5] !== wizardData.selectedModel || memoCache[6] !== wizardData.selectedTools || memoCache[7] !== wizardData.systemPrompt || memoCache[8] !== wizardData.whenToUse) handleColorSelect = d => {
    updateWizardData({
      selectedColor: d,
      finalAgent: {
        agentType: wizardData.agentType,
        whenToUse: wizardData.whenToUse,
        getSystemPrompt: () => wizardData.systemPrompt,
        tools: wizardData.selectedTools,
        ...(wizardData.selectedModel && {
          model: wizardData.selectedModel
        }),
        ...(d && {
          color: d
        }),
        source: wizardData.location
      }
    }), goNext();
  }, memoCache[1] = goNext, memoCache[2] = updateWizardData, memoCache[3] = wizardData.agentType, memoCache[4] = wizardData.location, memoCache[5] = wizardData.selectedModel, memoCache[6] = wizardData.selectedTools, memoCache[7] = wizardData.systemPrompt, memoCache[8] = wizardData.whenToUse, memoCache[9] = handleColorSelect;else handleColorSelect = memoCache[9];
  let onConfirm = handleColorSelect,
    footerElement;
  if (memoCache[10] === Symbol.for("react.memo_cache_sentinel")) footerElement = ILH.default.createElement(hn, null, ILH.default.createElement(lt, {
    chord: ["up", "down"],
    action: "navigate"
  }), ILH.default.createElement(lt, {
    chord: "enter",
    action: "select"
  }), ILH.default.createElement(ur, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "go back"
  })), memoCache[10] = footerElement;else footerElement = memoCache[10];
  let agentName = wizardData.agentType || "agent",
    rendered;
  if (memoCache[11] !== onConfirm || memoCache[12] !== agentName) rendered = ILH.default.createElement(Pc, {
    subtitle: "Choose background color",
    footerText: footerElement
  }, ILH.default.createElement(B, null, ILH.default.createElement(LGn, {
    agentName: agentName,
    currentColor: "automatic",
    onConfirm: onConfirm
  }))), memoCache[11] = onConfirm, memoCache[12] = agentName, memoCache[13] = rendered;else rendered = memoCache[13];
  return rendered;
}
var nj4, ILH;
var rj4 = b(() => {
  Je();
  _s();
  Ec();
  qs();
  ts();
  Fy();
  SE();
  tvo();
  nj4 = L(nt(), 1), ILH = L(Te(), 1);
});

export {ij4 as Kwl,nj4 as Vwl,ILH as ZDe,rj4 as zwl};
