// @ts-nocheck
import {G$i as L2i} from "../../vendor/m2782.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function iKq(props) {
  let cache = hpK.c(13),
    {
      command: command
    } = props,
    onSelectCommand;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) onSelectCommand = L2i(), cache[0] = onSelectCommand;else onSelectCommand = cache[0];
  let handler = onSelectCommand,
    [isHovered, setIsHovered] = w1_.useState(false);
  if (!handler) {
    let staticTextElement;
    if (cache[1] !== command) staticTextElement = w1_.default.createElement(w, {
      underline: true
    }, "/", command), cache[1] = command, cache[2] = staticTextElement;else staticTextElement = cache[2];
    return staticTextElement;
  }
  let handleClick;
  if (cache[3] !== command) handleClick = () => {
    j("tengu_slash_link_clicked", {
      command: command
    }), handler(command);
  }, cache[3] = command, cache[4] = handleClick;else handleClick = cache[4];
  let handleMouseEnter, handleMouseLeave;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) handleMouseEnter = () => setIsHovered(true), handleMouseLeave = () => setIsHovered(false), cache[5] = handleMouseEnter, cache[6] = handleMouseLeave;else handleMouseEnter = cache[5], handleMouseLeave = cache[6];
  let textElement;
  if (cache[7] !== command || cache[8] !== isHovered) textElement = w1_.default.createElement(w, {
    underline: true,
    bold: isHovered
  }, "/", command), cache[7] = command, cache[8] = isHovered, cache[9] = textElement;else textElement = cache[9];
  let clickableElement;
  if (cache[10] !== handleClick || cache[11] !== textElement) clickableElement = w1_.default.createElement(B, {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, textElement), cache[10] = handleClick, cache[11] = textElement, cache[12] = clickableElement;else clickableElement = cache[12];
  return clickableElement;
}
var hpK, w1_;
var kpK = b(() => {
  Je();
  Ct();
  hpK = L(nt(), 1), w1_ = L(Te(), 1);
});

export {iKq as Vpo,hpK as aVa,w1_ as udt,kpK as lVa};
