// @ts-nocheck
import {X$t,R2n} from "../../vendor/m3848.ts";
import {x2e,TOt} from "../../vendor/m2547.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {CZl,WBo,AZl} from "../agent/5484_toolName.ts";
import {yI,gwe} from "./2556_current.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Permission-confirmation "explanation" UI (Ink/React, React-Compiler memoized).
 *
 * Renders a shimmering "Loading explanation\u2026" placeholder, fetches a tool-call
 * risk explanation asynchronously, and shows the resolved explanation/reasoning/
 * risk-level once available. Toggled via the "confirm:toggleExplanation" chord.
 *
 * `uzt.c(n)` is the React Compiler memo cache; the interleaved `if (cache[i] !== x)`
 * guards are compiler-generated memoization, not hand-written logic.
 */

/**
 * Animated "Loading explanation\u2026" placeholder.
 * Splits the loading string into per-char shimmer cells driven by a glimmer index.
 */
function f9m() {
  let cache = uzt.c(7),
    [glimmerRef, glimmerIndex] = X$t("responding", RZl, !1),
    chars;
  if (cache[0] !== glimmerIndex) chars = RZl.split("").map((char, charIndex) => TP.jsx(x2e, {
    char: char,
    index: charIndex,
    glimmerIndex: glimmerIndex,
    messageColor: "inactive",
    shimmerColor: "text"
  }, charIndex)), cache[0] = glimmerIndex, cache[1] = chars;else chars = cache[1];
  let textNode;
  if (cache[2] !== chars) textNode = TP.jsx(v, {
    children: chars
  }), cache[2] = chars, cache[3] = textNode;else textNode = cache[3];
  let boxNode;
  if (cache[4] !== glimmerRef || cache[5] !== textNode) boxNode = TP.jsx($, {
    ref: glimmerRef,
    children: textNode
  }), cache[4] = glimmerRef, cache[5] = textNode, cache[6] = boxNode;else boxNode = cache[6];
  return boxNode;
}

/** Map a risk level to a theme color token. */
function h9m(riskLevel: "LOW" | "MEDIUM" | "HIGH"): "success" | "warning" | "error" | undefined {
  switch (riskLevel) {
    case "LOW":
      return "success";
    case "MEDIUM":
      return "warning";
    case "HIGH":
      return "error";
  }
}

/** Map a risk level to its short human-readable label. */
function g9m(riskLevel: "LOW" | "MEDIUM" | "HIGH"): string | undefined {
  switch (riskLevel) {
    case "LOW":
      return "Low risk";
    case "MEDIUM":
      return "Med risk";
    case "HIGH":
      return "High risk";
  }
}

/**
 * Fetch the tool-call risk explanation (CZl), resolving to null on failure.
 * @param request the tool-call descriptor (name/input/description/messages)
 * @param signal  abort signal to cancel the in-flight request
 */
function _9m(request: any, signal: AbortSignal): Promise<any | null> {
  return CZl({
    toolName: request.toolName,
    toolInput: request.toolInput,
    toolDescription: request.toolDescription,
    messages: request.messages ?? [],
    signal: signal
  }).catch(() => null);
}

/**
 * Hook: wires up the "toggle explanation" chord and lazily kicks off the
 * explanation fetch the first time it is shown. Returns visibility/chord/promise.
 */
function Itr(toolRequest: any) {
  let cache = uzt.c(12),
    keyEnabled;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) keyEnabled = WBo(), cache[0] = keyEnabled;else keyEnabled = cache[0];
  let isActive = keyEnabled,
    chord = yI("confirm:toggleExplanation", "Confirmation", "ctrl+e"),
    [isVisible, setVisible] = Yne.useState(!1),
    [explanationPromise, setExplanationPromise] = Yne.useState(null),
    abortRef = Yne.useRef(null),
    onToggle;
  if (cache[1] !== explanationPromise || cache[2] !== toolRequest || cache[3] !== isVisible) onToggle = () => {
    if (!isVisible) {
      if (W("tengu_permission_explainer_shortcut_used", {}), !explanationPromise) {
        let controller = new AbortController();
        abortRef.current = controller, setExplanationPromise(_9m(toolRequest, controller.signal));
      }
    }
    setVisible(y9m);
  }, cache[1] = explanationPromise, cache[2] = toolRequest, cache[3] = isVisible, cache[4] = onToggle;else onToggle = cache[4];
  let chordOptions;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) chordOptions = {
    context: "Confirmation",
    isActive: isActive
  }, cache[5] = chordOptions;else chordOptions = cache[5];
  Or("confirm:toggleExplanation", onToggle, chordOptions);
  let cleanupEffect, cleanupDeps;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) cleanupEffect = () => () => abortRef.current?.abort(), cleanupDeps = [], cache[6] = cleanupEffect, cache[7] = cleanupDeps;else cleanupEffect = cache[6], cleanupDeps = cache[7];
  Yne.useEffect(cleanupEffect, cleanupDeps);
  let result;
  if (cache[8] !== chord || cache[9] !== explanationPromise || cache[10] !== isVisible) result = {
    visible: isVisible,
    enabled: isActive,
    chord: chord,
    promise: explanationPromise
  }, cache[8] = chord, cache[9] = explanationPromise, cache[10] = isVisible, cache[11] = result;else result = cache[11];
  return result;
}

/** Visibility toggle reducer: flip the boolean. */
function y9m(prev: boolean): boolean {
  return !prev;
}

/**
 * Renders the resolved explanation payload (explanation, reasoning, risk badge).
 * Suspends on the passed promise via `Yne.use`.
 */
function T9m(props: { promise: Promise<any> }) {
  let cache = uzt.c(21),
    {
      promise: explanationPromise
    } = props,
    resolved = Yne.use(explanationPromise);
  if (!resolved) {
    let unavailableNode;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) unavailableNode = TP.jsx($, {
      marginTop: 1,
      children: TP.jsx(v, {
        dimColor: !0,
        children: "Explanation unavailable"
      })
    }), cache[0] = unavailableNode;else unavailableNode = cache[0];
    return unavailableNode;
  }
  let explanationNode;
  if (cache[1] !== resolved.explanation) explanationNode = TP.jsx(v, {
    children: resolved.explanation
  }), cache[1] = resolved.explanation, cache[2] = explanationNode;else explanationNode = cache[2];
  let reasoningNode;
  if (cache[3] !== resolved.reasoning) reasoningNode = TP.jsx($, {
    marginTop: 1,
    children: TP.jsx(v, {
      children: resolved.reasoning
    })
  }), cache[3] = resolved.reasoning, cache[4] = reasoningNode;else reasoningNode = cache[4];
  let riskColor;
  if (cache[5] !== resolved.riskLevel) riskColor = h9m(resolved.riskLevel), cache[5] = resolved.riskLevel, cache[6] = riskColor;else riskColor = cache[6];
  let riskLabel;
  if (cache[7] !== resolved.riskLevel) riskLabel = g9m(resolved.riskLevel), cache[7] = resolved.riskLevel, cache[8] = riskLabel;else riskLabel = cache[8];
  let riskLabelNode;
  if (cache[9] !== riskColor || cache[10] !== riskLabel) riskLabelNode = TP.jsxs(v, {
    color: riskColor,
    children: [riskLabel, ":"]
  }), cache[9] = riskColor, cache[10] = riskLabel, cache[11] = riskLabelNode;else riskLabelNode = cache[11];
  let riskTextNode;
  if (cache[12] !== resolved.risk) riskTextNode = TP.jsxs(v, {
    children: [" ", resolved.risk]
  }), cache[12] = resolved.risk, cache[13] = riskTextNode;else riskTextNode = cache[13];
  let riskBadgeNode;
  if (cache[14] !== riskLabelNode || cache[15] !== riskTextNode) riskBadgeNode = TP.jsx($, {
    marginTop: 1,
    children: TP.jsxs(v, {
      children: [riskLabelNode, riskTextNode]
    })
  }), cache[14] = riskLabelNode, cache[15] = riskTextNode, cache[16] = riskBadgeNode;else riskBadgeNode = cache[16];
  let containerNode;
  if (cache[17] !== explanationNode || cache[18] !== reasoningNode || cache[19] !== riskBadgeNode) containerNode = TP.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [explanationNode, reasoningNode, riskBadgeNode]
  }), cache[17] = explanationNode, cache[18] = reasoningNode, cache[19] = riskBadgeNode, cache[20] = containerNode;else containerNode = cache[20];
  return containerNode;
}

/**
 * Top-level explanation panel: shows the shimmer fallback while suspended,
 * then the resolved explanation. Renders nothing when hidden or no promise.
 */
function xtr(props: { visible: boolean; promise: Promise<any> | null }) {
  let cache = uzt.c(3),
    {
      visible: isVisible,
      promise: explanationPromise
    } = props;
  if (!isVisible || !explanationPromise) return null;
  let fallbackNode;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) fallbackNode = TP.jsx($, {
    marginTop: 1,
    children: TP.jsx(f9m, {})
  }), cache[0] = fallbackNode;else fallbackNode = cache[0];
  let suspenseNode;
  if (cache[1] !== explanationPromise) suspenseNode = TP.jsx(Yne.Suspense, {
    fallback: fallbackNode,
    children: TP.jsx(T9m, {
      promise: explanationPromise
    })
  }), cache[1] = explanationPromise, cache[2] = suspenseNode;else suspenseNode = cache[2];
  return suspenseNode;
}
var uzt,
  Yne,
  TP,
  RZl = "Loading explanation\u2026";
var GBo = b(() => {
  je();
  gwe();
  ss();
  kt();
  AZl();
  TOt();
  R2n();
  uzt = x(tt(), 1), Yne = x(et(), 1), TP = x(oe(), 1);
});

export {f9m,h9m,g9m,_9m,Itr,y9m,T9m,xtr,uzt,Yne,TP,RZl,GBo};
