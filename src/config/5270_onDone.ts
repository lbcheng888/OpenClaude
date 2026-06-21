// @ts-nocheck
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Link as I9} from "../../vendor/m2427.ts";
import {pr as X8} from "../../vendor/m2562.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {yb as _D} from "../../vendor/m4521.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * API spend notice dialog.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function gy4(H: RestoredUnknown): RestoredUnknown {
  let _ = Fy4.c(7),
    {
      onDone: q
    } = H,
    K;
  if (_[0] === Symbol.for("react.memo_cache_sentinel")) K = MT_.default.createElement(B, {
    flexDirection: "column"
  }, MT_.default.createElement(V, null, "Learn more about how to monitor your spending:"), MT_.default.createElement(I9, {
    url: "https://code.claude.com/docs/en/costs"
  })), _[0] = K;else K = _[0];
  let O;
  if (_[1] === Symbol.for("react.memo_cache_sentinel")) O = [{
    value: "ok",
    label: "Got it, thanks!"
  }], _[1] = O;else O = _[1];
  let T;
  if (_[2] !== q) T = MT_.default.createElement(X8, {
    options: O,
    onChange: q
  }), _[2] = q, _[3] = T;else T = _[3];
  let z;
  if (_[4] !== q || _[5] !== T) z = MT_.default.createElement(n6, {
    title: "You've spent $5 on the Anthropic API this session.",
    onCancel: q
  }, K, T), _[4] = q, _[5] = T, _[6] = z;else z = _[6];
  return z;
}
var Fy4, MT_;
var Qy4 = L(() => {
  nH();
  _D();
  L7();
  Fy4 = u(__(), 1), MT_ = u(WH(), 1);
});
export {gy4 as B9l,Fy4 as N9l,MT_ as kAt,Qy4 as F9l};
