// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {useApp as c4} from "../../vendor/m2452.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Cqe,Eqe} from "../../vendor/m3874.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {I2n,tco} from "../../vendor/m3860.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var HHl = {};
ft(HHl, {
  call: () => call
});
/**
 * Entry point for the Bedrock setup wizard.
 * Logs the setup-started telemetry event and renders the wizard component.
 * @param onDone Callback invoked when the wizard is dismissed/cancelled.
 */
async function call(onDone) {
  return W("tengu_bedrock_setup_started", {}), $Pe.jsx(BedrockSetupWizard, {
    onDone: onDone
  });
}
/**
 * Bedrock setup wizard component.
 * Walks the user through Bedrock configuration; once complete it shows a
 * success message and prompts the user to restart Claude Code.
 */
function BedrockSetupWizard({
  onDone: onDone
}) {
  let inkApp = c4(),
    [completionMessage, setCompletionMessage] = kHl.useState(null);
  if (Or("confirm:yes", () => {
    inkApp.exit(), Promise.resolve().then(() => (Cqe(), Eqe)).then(relaunchModule => relaunchModule.execRelaunch());
  }, {
    context: "Confirmation",
    isActive: completionMessage !== null
  }), completionMessage !== null) return $Pe.jsxs($, {
    flexDirection: "column",
    gap: 1,
    marginTop: 1,
    children: [$Pe.jsx(v, {
      color: "success",
      children: completionMessage
    }), $Pe.jsxs(v, {
      dimColor: !0,
      children: ["Press ", $Pe.jsx(v, {
        bold: !0,
        children: "Enter"
      }), " to restart Claude Code."]
    })]
  });
  return $Pe.jsx(I2n, {
    onComplete: completion => setCompletionMessage(completion),
    onCancel: () => {
      W("tengu_bedrock_setup_cancelled", {}), onDone();
    }
  });
}
var kHl, $Pe;
var IHl = b(() => {
  tco();
  je();
  ss();
  kt();
  kHl = x(et(), 1), $Pe = x(oe(), 1);
});

export {HHl,call as Fpm,BedrockSetupWizard as Bpm,kHl,$Pe,IHl};
