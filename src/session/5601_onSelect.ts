// @ts-nocheck
import {_xe,Y3t} from "../../vendor/m4045.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {Button as Ntt} from "../../vendor/m2443.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Session transcript consent prompt.
 *
 * Renders the "Can Anthropic look at your session transcript to help us improve
 * Claude Code?" question with a digit-driven text input plus clickable
 * Yes / No / Don't-ask-again shortcuts. Each choice maps a single letter
 * (y/n/d) to a consent decision string via `digitToDecision` and forwards it to
 * the supplied `onSelect` callback.
 */
interface SessionConsentProps {
  /** Invoked with the resolved decision string ("yes" | "no" | "dont_ask_again"). */
  onSelect: (decision: string) => void;
  /** Current text in the digit input. */
  inputValue: string;
  /** Updates the digit input text. */
  setInputValue: (value: string) => void;
}

function Plc(e: SessionConsentProps) {
  let memoCache = Dlc.c(13),
    {
      onSelect: onSelectDecision,
      inputValue,
      setInputValue
    } = e,
    handleDigit;
  if (memoCache[0] !== onSelectDecision) handleDigit = (rawDigit: string) => {
    let normalizedDigit = rawDigit.toLowerCase();
    if (ynr(normalizedDigit)) onSelectDecision(xlc[normalizedDigit]);
  }, memoCache[0] = onSelectDecision, memoCache[1] = handleDigit;else handleDigit = memoCache[1];
  let digitInputProps;
  if (memoCache[2] !== inputValue || memoCache[3] !== setInputValue || memoCache[4] !== handleDigit) digitInputProps = {
    inputValue,
    setInputValue,
    isValidDigit: JWm,
    onDigit: handleDigit
  }, memoCache[2] = inputValue, memoCache[3] = setInputValue, memoCache[4] = handleDigit, memoCache[5] = digitInputProps;else digitInputProps = memoCache[5];
  _xe(digitInputProps);
  let questionRow;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) questionRow = wV.jsxs($, {
    children: [wV.jsxs(v, {
      color: "ansi:cyan",
      children: [Ql, " "]
    }), wV.jsx(v, {
      bold: !0,
      children: "Can Anthropic look at your session transcript to help us improve Claude Code?"
    })]
  }), memoCache[6] = questionRow;else questionRow = memoCache[6];
  let docsLinkRow;
  if (memoCache[7] === Symbol.for("react.memo_cache_sentinel")) docsLinkRow = wV.jsx($, {
    marginLeft: 2,
    children: wV.jsx(Sx, {
      url: "https://code.claude.com/docs/en/data-usage#session-quality-surveys"
    })
  }), memoCache[7] = docsLinkRow;else docsLinkRow = memoCache[7];
  let choiceButtons;
  if (memoCache[8] !== onSelectDecision || memoCache[9] !== setInputValue) choiceButtons = YWm.map(choice => {
    let {
      key: choiceKey,
      label: choiceLabel,
      width: choiceWidth
    } = choice;
    return wV.jsx($, {
      width: choiceWidth,
      children: wV.jsx(Ntt, {
        tabIndex: -1,
        onAction: () => {
          setInputValue(""), onSelectDecision(xlc[choiceKey]);
        },
        children: actionState => {
          let {
            hovered: isHovered
          } = actionState;
          return wV.jsxs(v, {
            backgroundColor: isHovered ? "userMessageBackgroundHover" : void 0,
            children: [wV.jsx(v, {
              color: "ansi:cyan",
              children: choiceKey
            }), ": ", choiceLabel]
          });
        }
      })
    }, choiceKey);
  }), memoCache[8] = onSelectDecision, memoCache[9] = setInputValue, memoCache[10] = choiceButtons;else choiceButtons = memoCache[10];
  let container;
  if (memoCache[11] !== choiceButtons) container = wV.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [questionRow, docsLinkRow, wV.jsx($, {
      marginLeft: 2,
      children: choiceButtons
    })]
  }), memoCache[11] = choiceButtons, memoCache[12] = container;else container = memoCache[12];
  return container;
}

/** Validates that a typed character is one of the accepted consent digits (y/n/d). */
function JWm(e: { toLowerCase: () => string }) {
  return ynr(e.toLowerCase());
}

var Dlc: any,
  wV: any,
  jWm: string[],
  xlc: Record<string, string>,
  YWm: Array<{ key: string; label: string; width?: number }>,
  /** Membership test against the accepted consent digit list. */
  ynr = (e: string) => jWm.includes(e);
var Olc = b(() => {
  Pa();
  je();
  fne();
  Y3t();
  Dlc = x(tt(), 1), wV = x(oe(), 1), jWm = ["y", "n", "d"], xlc = {
    y: "yes",
    n: "no",
    d: "dont_ask_again"
  }, YWm = [{
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

export {Plc,JWm,Dlc,wV,jWm,xlc,YWm,ynr,Olc};
