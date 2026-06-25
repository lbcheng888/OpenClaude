// @ts-nocheck
import {Dpa,II} from "../../vendor/m3268.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Plugin trust warning component.
 *
 * Renders a memoized warning box reminding the user to trust a plugin before
 * installing, updating, or using it. Uses React's compiler memo-cache (the
 * `_bl.c(3)` slot array with the `react.memo_cache_sentinel` guard) to build the
 * warning header, the body text, and the surrounding box only once.
 */
function N7n() {
  let cache = _bl.c(3),
    trustMessageText: string;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) trustMessageText = Dpa(), cache[0] = trustMessageText;else trustMessageText = cache[0];
  let trustMessage = trustMessageText,
    warningHeader;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) warningHeader = M7n.jsxs(v, {
    color: "claude",
    children: [Xe.warning, " "]
  }), cache[1] = warningHeader;else warningHeader = cache[1];
  let warningBox;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) warningBox = M7n.jsxs($, {
    marginBottom: 1,
    children: [warningHeader, M7n.jsxs(v, {
      dimColor: !0,
      italic: !0,
      children: ["Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.", trustMessage ? ` ${trustMessage}` : ""]
    })]
  }), cache[2] = warningBox;else warningBox = cache[2];
  return warningBox;
}
var _bl, M7n;
var uwo = b(() => {
  Zs();
  je();
  II();
  _bl = x(tt(), 1), M7n = x(oe(), 1);
});

export {N7n,_bl,M7n,uwo};
