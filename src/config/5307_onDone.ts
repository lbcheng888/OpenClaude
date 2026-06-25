// @ts-nocheck
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {hr} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * API spend notice dialog.
 *
 * Restored from the Claude Code 2.1.190 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 *
 * Renders a "$5 spent on the Anthropic API this session" confirmation panel
 * with a learn-more link and a single "Got it, thanks!" option; invokes the
 * caller-supplied onDone callback on selection/cancel. Uses React Forget
 * (memo_cache_sentinel) slots to memoize the static subtrees.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;

function KVl(props: RestoredRecord): RestoredUnknown {
  let cache = VVl.c(7),
    {
      onDone
    } = props,
    learnMore;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) learnMore = DGe.jsxs($, {
    flexDirection: "column",
    children: [DGe.jsx(v, {
      children: "Learn more about how to monitor your spending:"
    }), DGe.jsx(Ss, {
      url: "https://code.claude.com/docs/en/costs"
    })]
  }), cache[0] = learnMore;else learnMore = cache[0];
  let options;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) options = [{
    value: "ok",
    label: "Got it, thanks!"
  }], cache[1] = options;else options = cache[1];
  let select;
  if (cache[2] !== onDone) select = DGe.jsx(hr, {
    options: options,
    onChange: onDone
  }), cache[2] = onDone, cache[3] = select;else select = cache[3];
  let dialog;
  if (cache[4] !== onDone || cache[5] !== select) dialog = DGe.jsxs(Jn, {
    title: "You've spent $5 on the Anthropic API this session.",
    onCancel: onDone,
    children: [learnMore, select]
  }), cache[4] = onDone, cache[5] = select, cache[6] = dialog;else dialog = cache[6];
  return dialog;
}
var VVl, DGe;
var zVl = b(() => {
  je();
  TS();
  di();
  VVl = x(tt(), 1), DGe = x(oe(), 1);
});
export {KVl,VVl,DGe,zVl};
