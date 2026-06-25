// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {useApp as c4} from "../../vendor/m2452.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Cqe,Eqe} from "../../vendor/m3874.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {M2n,uco} from "../../vendor/m3872.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/** Module namespace object exporting the Vertex setup `call` entry point. */
var vertexSetupModule = {};
ft(vertexSetupModule, {
  call: () => call
});
/**
 * Entry point: logs the Vertex setup start event and renders the setup wizard.
 * @param onDone callback invoked when setup is cancelled/finished
 */
async function call(onDone) {
  return W("tengu_vertex_setup_started", {}), qPe.jsx(VertexSetupWizard, {
    onDone: onDone
  });
}
/**
 * Wizard component driving the Vertex AI setup flow.
 * On completion it shows a success message and waits for Enter to relaunch.
 */
function VertexSetupWizard({
  onDone: onDone
}) {
  let inkApp = c4(),
    [completionMessage, setCompletionMessage] = PHl.useState(null);
  if (Or("confirm:yes", () => {
    inkApp.exit(), Promise.resolve().then(() => (Cqe(), Eqe)).then(relaunchModule => relaunchModule.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: completionMessage !== null
  }), completionMessage !== null) return qPe.jsxs($, {
    flexDirection: "column",
    gap: 1,
    marginTop: 1,
    children: [qPe.jsx(v, {
      color: "success",
      children: completionMessage
    }), qPe.jsxs(v, {
      dimColor: !0,
      children: ["Press ", qPe.jsx(v, {
        bold: !0,
        children: "Enter"
      }), " to restart Claude Code."]
    })]
  });
  return qPe.jsx(M2n, {
    onComplete: completionResult => setCompletionMessage(completionResult),
    onCancel: () => {
      W("tengu_vertex_setup_cancelled", {}), onDone();
    }
  });
}
var PHl, qPe;
var LHl = b(() => {
  uco();
  je();
  ss();
  kt();
  PHl = x(et(), 1), qPe = x(oe(), 1);
});

export {vertexSetupModule as OHl,call as Upm,VertexSetupWizard as $pm,PHl,qPe,LHl};
