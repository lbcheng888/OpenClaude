// @ts-nocheck
import {dIe as uGH,a$t as wI_} from "../../vendor/m3980.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {fc as m1,sl as J4} from "../../vendor/m715.ts";
import {aD as sV,bne as f1H} from "../../vendor/m4590.ts";
import {Button as msH} from "../../vendor/m2433.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** Restored Claude Code 2.1.177 module. Renders a selectable choice row used by terminal selection menus. */
function ChoiceRow(H: any): any {
  let _ = reactCompilerCache.c(13),
    {
      onSelect: q,
      inputValue: K,
      setInputValue: O
    } = H,
    T;
  if (_[0] !== q) T = (f: any): any => {
    let j = f.toLowerCase();
    if (choiceStatusLabels(j)) q(choiceStyles[j]);
  }, _[0] = q, _[1] = T;else T = _[1];
  let z;
  if (_[2] !== K || _[3] !== O || _[4] !== T) z = {
    inputValue: K,
    setInputValue: O,
    isValidDigit: renderChoiceOption,
    onDigit: T
  }, _[2] = K, _[3] = O, _[4] = T, _[5] = z;else z = _[5];
  uGH(z);
  let $;
  if (_[6] === Symbol.for("react.memo_cache_sentinel")) $ = ReactRuntime.default.createElement(B, null, ReactRuntime.default.createElement(V, {
    color: "ansi:cyan"
  }, m1, " "), ReactRuntime.default.createElement(V, {
    bold: !0
  }, "Can Anthropic look at your session transcript to help us improve Claude Code?")), _[6] = $;else $ = _[6];
  let Y;
  if (_[7] === Symbol.for("react.memo_cache_sentinel")) Y = ReactRuntime.default.createElement(B, {
    marginLeft: 2
  }, ReactRuntime.default.createElement(sV, {
    url: "https://code.claude.com/docs/en/data-usage#session-quality-surveys"
  })), _[7] = Y;else Y = _[7];
  let A;
  if (_[8] !== q || _[9] !== O) A = choiceIconByState.map((f: any): any => {
    let {
      key: j,
      label: J,
      width: D
    } = f;
    return ReactRuntime.default.createElement(B, {
      key: j,
      width: D
    }, ReactRuntime.default.createElement(msH, {
      tabIndex: -1,
      onAction: (): any => {
        O(""), q(choiceStyles[j]);
      }
    }, (M: any): any => {
      let {
        hovered: X
      } = M;
      return ReactRuntime.default.createElement(V, {
        backgroundColor: X ? "userMessageBackgroundHover" : void 0
      }, ReactRuntime.default.createElement(V, {
        color: "ansi:cyan"
      }, j), ": ", J);
    }));
  }), _[8] = q, _[9] = O, _[10] = A;else A = _[10];
  let w;
  if (_[11] !== A) w = ReactRuntime.default.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, $, Y, ReactRuntime.default.createElement(B, {
    marginLeft: 2
  }, A)), _[11] = A, _[12] = w;else w = _[12];
  return w;
}
function renderChoiceOption(H: any): any {
  return choiceStatusLabels(H.toLowerCase());
}
var reactCompilerCache,
  ReactRuntime,
  defaultChoiceColor,
  choiceStyles,
  choiceIconByState,
  choiceStatusLabels = (H: any): any => defaultChoiceColor.includes(H);
var initChoiceRow = L((): any => {
  J4();
  nH();
  f1H();
  wI_();
  reactCompilerCache = u(__(), 1), ReactRuntime = u(WH(), 1), defaultChoiceColor = ["y", "n", "d"], choiceStyles = {
    y: "yes",
    n: "no",
    d: "dont_ask_again"
  }, choiceIconByState = [{
    key: "y",
    label: "Yes",
    width: 10
  }, {
    key: "n",
    label: "No",
    width: 10
  }, {
    key: "d",
    label: "Don't ask again"
  }];
});

export {ChoiceRow as GZl,renderChoiceOption as _2m,reactCompilerCache as WZl,ReactRuntime as oX,defaultChoiceColor as h2m,choiceStyles as jZl,choiceIconByState as g2m,choiceStatusLabels as AQn,initChoiceRow as VZl};
