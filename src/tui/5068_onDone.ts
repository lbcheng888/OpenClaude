// @ts-nocheck
import {rj,q$e} from "../telemetry/2749_q$e.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {JGt,XGt} from "../core/5066_call.ts";
import {K3t,z3t} from "../../vendor/m4020.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Trial-expired prompt component.
 *
 * Renders a message stating the Claude Code trial has ended and offers the
 * user a choice between upgrading to Max or adding usage credits. The selected
 * branch resolves to a React node which is then rendered in place.
 *
 * Uses the React Forget memo-cache (`G1l.c(15)`) to memoize the static option
 * list, the static header element, and the per-prop callbacks/elements.
 */
interface TrialExpiredProps {
  /** Invoked when the user cancels or completes the flow. */
  onDone: () => void;
  /** Opaque context passed through to the upgrade / extra-usage handlers. */
  context: unknown;
}

function K1l(props: TrialExpiredProps): any {
  let cache = G1l.c(15),
    {
      onDone,
      context
    } = props,
    /** Holds the resolved follow-up node once a choice has been made. */
    [resolvedNode, setResolvedNode] = V1l.useState<any>(null);
  if (resolvedNode) return resolvedNode;
  let options: { label: string; value: string }[];
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) options = [...(rj() ? [] : [{
    label: "Upgrade to Max",
    value: "upgrade"
  }]), {
    label: "Add funds to continue with usage credits",
    value: "extra-usage"
  }], cache[0] = options;else options = cache[0];
  let optionList = options,
    header: any;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) header = YWe.jsx($, {
    paddingX: 2,
    children: YWe.jsx(v, {
      color: "error",
      children: "Your Claude Code trial has ended."
    })
  }), cache[1] = header;else header = cache[1];
  let onSelectCancel: () => void;
  if (cache[2] !== onDone) onSelectCancel = () => onDone(), cache[2] = onDone, cache[3] = onSelectCancel;else onSelectCancel = cache[3];
  let onMenuCancel: () => void;
  if (cache[4] !== onDone) onMenuCancel = () => onDone(), cache[4] = onDone, cache[5] = onMenuCancel;else onMenuCancel = cache[5];
  let onChoice: (value: string) => void;
  if (cache[6] !== context || cache[7] !== onDone) onChoice = choice => {
    if (W("tengu_pro_trial_expired_choice", {
      chose_upgrade: choice === "upgrade"
    }), choice === "upgrade") JGt(onDone, context).then(node => setResolvedNode(node));else K3t(onDone, context).then(node => setResolvedNode(node));
  }, cache[6] = context, cache[7] = onDone, cache[8] = onChoice;else onChoice = cache[8];
  let selectElement: any;
  if (cache[9] !== onMenuCancel || cache[10] !== onChoice) selectElement = YWe.jsx(hr, {
    options: optionList,
    onCancel: onMenuCancel,
    onChange: onChoice
  }), cache[9] = onMenuCancel, cache[10] = onChoice, cache[11] = selectElement;else selectElement = cache[11];
  let rootElement: any;
  if (cache[12] !== onSelectCancel || cache[13] !== selectElement) rootElement = YWe.jsxs($, {
    flexDirection: "column",
    children: [header, YWe.jsx(Jn, {
      title: "What do you want to do?",
      onCancel: onSelectCancel,
      children: selectElement
    })]
  }), cache[12] = onSelectCancel, cache[13] = selectElement, cache[14] = rootElement;else rootElement = cache[14];
  return rootElement;
}
var G1l, V1l, YWe;
var z1l = b(() => {
  z3t();
  XGt();
  je();
  kt();
  q$e();
  Ol();
  di();
  G1l = x(tt(), 1), V1l = x(et(), 1), YWe = x(oe(), 1);
});

export {K1l,G1l,V1l,YWe,z1l};
