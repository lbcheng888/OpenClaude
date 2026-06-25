// @ts-nocheck
import {M8i} from "../../vendor/m2794.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Renders a slash-command link. When an "onSelectCommand" handler is available
 * it shows a clickable, hover-aware element that logs a telemetry event and
 * invokes the handler; otherwise it renders a plain static underlined label.
 */
function q_o(props) {
  let cache = wXa.c(13),
    {
      command: command
    } = props,
    onSelectCommand;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) onSelectCommand = M8i(), cache[0] = onSelectCommand;else onSelectCommand = cache[0];
  let handler = onSelectCommand,
    [isHovered, setIsHovered] = kXa.useState(!1);
  if (!handler) {
    let staticTextElement;
    if (cache[1] !== command) staticTextElement = qqt.jsxs(v, {
      underline: !0,
      children: ["/", command]
    }), cache[1] = command, cache[2] = staticTextElement;else staticTextElement = cache[2];
    return staticTextElement;
  }
  let handleClick;
  if (cache[3] !== command) handleClick = () => {
    W("tengu_slash_link_clicked", {
      command: command
    }), handler(command);
  }, cache[3] = command, cache[4] = handleClick;else handleClick = cache[4];
  let handleMouseEnter, handleMouseLeave;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) handleMouseEnter = () => setIsHovered(!0), handleMouseLeave = () => setIsHovered(!1), cache[5] = handleMouseEnter, cache[6] = handleMouseLeave;else handleMouseEnter = cache[5], handleMouseLeave = cache[6];
  let textElement;
  if (cache[7] !== command || cache[8] !== isHovered) textElement = qqt.jsxs(v, {
    underline: !0,
    bold: isHovered,
    children: ["/", command]
  }), cache[7] = command, cache[8] = isHovered, cache[9] = textElement;else textElement = cache[9];
  let clickableElement;
  if (cache[10] !== handleClick || cache[11] !== textElement) clickableElement = qqt.jsx($, {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    children: textElement
  }), cache[10] = handleClick, cache[11] = textElement, cache[12] = clickableElement;else clickableElement = cache[12];
  return clickableElement;
}
var wXa, kXa, qqt;
var HXa = b(() => {
  je();
  kt();
  wXa = x(tt(), 1), kXa = x(et(), 1), qqt = x(oe(), 1);
});

export {q_o,wXa,kXa,qqt,HXa};
