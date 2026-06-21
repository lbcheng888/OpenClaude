// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {useApp as k4} from "../../vendor/m2442.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {kUt as aUt,xUt as iUt} from "../../vendor/m3856.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {MBn as XNn,Soo as bro} from "../../vendor/m3854.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var C$4 = {};
pt(C$4, {
  call: () => call
});
async function call(onDone) {
  return j("tengu_vertex_setup_started", {}), Fc.createElement(VertexSetupWizard, {
    onDone: onDone
  });
}
function VertexSetupWizard({
  onDone: onDone
}) {
  let inkApp = k4(),
    [completionMessage, setCompletionMessage] = S$4.useState(null);
  if (Ir("confirm:yes", () => {
    inkApp.exit(), Promise.resolve().then(() => (aUt(), iUt)).then(o => o.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: completionMessage !== null
  }), completionMessage !== null) return Fc.createElement(B, {
    flexDirection: "column",
    gap: 1,
    marginTop: 1
  }, Fc.createElement(w, {
    color: "success"
  }, completionMessage), Fc.createElement(w, {
    dimColor: true
  }, "Press ", Fc.createElement(w, {
    bold: true
  }, "Enter"), " to restart Claude Code."));
  return Fc.createElement(XNn, {
    onComplete: o => setCompletionMessage(o),
    onCancel: () => {
      j("tengu_vertex_setup_cancelled", {}), onDone();
    }
  });
}
var Fc, S$4;
var b$4 = b(() => {
  bro();
  Je();
  _s();
  Ct();
  Fc = L(Te(), 1), S$4 = L(Te(), 1);
});

export {C$4 as RSl,call as Rrm,VertexSetupWizard as xrm,Fc as LG,S$4 as wSl,b$4 as xSl};
