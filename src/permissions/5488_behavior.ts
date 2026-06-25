// @ts-nocheck
import {_t,uo} from "../../vendor/m2468.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {handlePlanModeTransition as zde,lt} from "../session/0132_sent.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Plan-mode permission prompt behavior.
 *
 * Renders an Ink confirmation dialog asking the user whether Claude may enter
 * "plan mode" (explore + design before making code changes), and maps the
 * user's yes/no answer to a permission decision that the tool runtime consumes.
 */

/** A permission decision returned to the tool runtime. */
type PlanModePermissionDecision =
  | {
      behavior: "allow";
      updatedInput: Record<string, never>;
      permissionUpdates: Array<{
        type: "setMode";
        mode: "plan";
        destination: "session";
      }>;
    }
  | { behavior: "deny" };

/**
 * Translate a yes/no answer into a permission decision.
 * "yes" -> allow and switch the session into plan mode; "no" -> deny.
 */
function C9m(answer: "yes" | "no"): PlanModePermissionDecision | undefined {
  switch (answer) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: {},
        permissionUpdates: [{
          type: "setMode",
          mode: "plan",
          destination: "session"
        }]
      };
    case "no":
      return {
        behavior: "deny"
      };
  }
}

/**
 * React component for the "Enter plan mode?" permission dialog.
 * Uses the React compiler memo cache (`OZl.c`) to memoize JSX subtrees.
 *
 * @param props - `{ payload, answer }`: the tool request payload (carries the
 *   request source) and the callback used to report the user's decision.
 */
function LZl(props: { payload: { requestSource: unknown }; answer: (decision: PlanModePermissionDecision | undefined) => void }) {
  let memoCache = OZl.c(11),
    {
      payload,
      answer: onAnswer
    } = props,
    permissionContext = _t(A9m),
    handleSelect;
  if (memoCache[0] !== onAnswer || memoCache[1] !== permissionContext) handleSelect = (selection: "yes" | "no") => {
    if (selection === "yes") W("tengu_plan_enter", {
      entryMethod: Ve("tool")
    }), zde(permissionContext, "plan");
    onAnswer(C9m(selection));
  }, memoCache[0] = onAnswer, memoCache[1] = permissionContext, memoCache[2] = handleSelect;else handleSelect = memoCache[2];
  let selectHandler = handleSelect,
    headingNode;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) headingNode = E9.jsx(v, {
    children: "Claude wants to enter plan mode to explore and design an implementation approach."
  }), memoCache[3] = headingNode;else headingNode = memoCache[3];
  let bulletList;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) bulletList = E9.jsxs($, {
    marginTop: 1,
    flexDirection: "column",
    children: [E9.jsx(v, {
      dimColor: !0,
      children: "In plan mode, Claude will:"
    }), E9.jsx(v, {
      dimColor: !0,
      children: " \xB7 Explore the codebase thoroughly"
    }), E9.jsx(v, {
      dimColor: !0,
      children: " \xB7 Identify existing patterns"
    }), E9.jsx(v, {
      dimColor: !0,
      children: " \xB7 Design an implementation strategy"
    }), E9.jsx(v, {
      dimColor: !0,
      children: " \xB7 Present a plan for your approval"
    })]
  }), memoCache[4] = bulletList;else bulletList = memoCache[4];
  let footerNode;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) footerNode = E9.jsx($, {
    marginTop: 1,
    children: E9.jsx(v, {
      dimColor: !0,
      children: "No code changes will be made until you approve the plan."
    })
  }), memoCache[5] = footerNode;else footerNode = memoCache[5];
  let bodyNode;
  if (memoCache[6] !== selectHandler) bodyNode = E9.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    paddingX: 1,
    children: [headingNode, bulletList, footerNode, E9.jsx($, {
      marginTop: 1,
      children: E9.jsx(Bl, {
        confirmLabel: "Yes, enter plan mode",
        cancelLabel: "No, start implementing now",
        onConfirm: () => selectHandler("yes"),
        onCancel: () => selectHandler("no")
      })
    })]
  }), memoCache[6] = selectHandler, memoCache[7] = bodyNode;else bodyNode = memoCache[7];
  let dialogNode;
  if (memoCache[8] !== payload.requestSource || memoCache[9] !== bodyNode) dialogNode = E9.jsx(hm, {
    color: "planMode",
    title: "Enter plan mode?",
    requestSource: payload.requestSource,
    children: bodyNode
  }), memoCache[8] = payload.requestSource, memoCache[9] = bodyNode, memoCache[10] = dialogNode;else dialogNode = memoCache[10];
  return dialogNode;
}

/** Selector: read the current permission mode from the tool permission context. */
function A9m(state: { toolPermissionContext: { mode: unknown } }) {
  return state.toolPermissionContext.mode;
}
var OZl, E9;
var MZl = b(() => {
  lt();
  d_();
  DI();
  je();
  kt();
  uo();
  OZl = x(tt(), 1), E9 = x(oe(), 1);
});

export {C9m,LZl,A9m,OZl,E9,MZl};
