// @ts-nocheck
import {truncate as Ha,XH} from "../../vendor/m239.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Renders a title row (with optional subtitle and a "from …" source suffix)
 * for a permission / request prompt header.
 *
 * Uses the React Compiler memoization cache (`memoCache`) to avoid rebuilding
 * unchanged JSX subtrees across renders.
 *
 * @param props
 *   - title: main heading text
 *   - subtitle: optional secondary line (string is dim-truncated, else rendered as-is)
 *   - color: text color for the title (defaults to "permission")
 *   - requestSource: where the request originated (workflow-agent / subagent)
 *   - srPrefix: screen-reader-only prefix prepended to the aria-label
 */
function wIe(props: {
  title: any;
  subtitle?: any;
  color?: any;
  requestSource?: { type?: string; workflowName?: string; agentName?: string } | null;
  srPrefix?: any;
}) {
  let memoCache = u_a.c(18),
    {
      title: title,
      subtitle: subtitle,
      color: color,
      requestSource: requestSource,
      srPrefix: srPrefix
    } = props,
    titleColor = color === void 0 ? "permission" : color,
    /** Resolved "from …" source description text. */
    sourceLabel;
  e: switch (requestSource?.type) {
    case "workflow-agent":
      {
        let workflowName = requestSource.workflowName,
          workflowLabel;
        if (memoCache[0] !== workflowName) workflowLabel = workflowName !== void 0 ? `from the "${Ha(workflowName, 24, !0)}" workflow` : "from a workflow", memoCache[0] = workflowName, memoCache[1] = workflowLabel;else workflowLabel = memoCache[1];
        sourceLabel = workflowLabel;
        break e;
      }
    case "subagent":
      {
        let agentName = requestSource.agentName,
          agentLabel;
        if (memoCache[2] !== agentName) agentLabel = agentName !== void 0 ? `from the ${Ha(agentName, 24, !0)} agent` : "from a subagent", memoCache[2] = agentName, memoCache[3] = agentLabel;else agentLabel = memoCache[3];
        sourceLabel = agentLabel;
      }
  }
  let ariaLabel = srPrefix !== void 0 ? `${srPrefix} ${title}` : void 0,
    titleNode;
  if (memoCache[4] !== titleColor || memoCache[5] !== ariaLabel || memoCache[6] !== title) titleNode = vIe.jsx(v, {
    "aria-label": ariaLabel,
    bold: !0,
    color: titleColor,
    children: title
  }), memoCache[4] = titleColor, memoCache[5] = ariaLabel, memoCache[6] = title, memoCache[7] = titleNode;else titleNode = memoCache[7];
  let sourceNode;
  if (memoCache[8] !== sourceLabel) sourceNode = sourceLabel !== void 0 && vIe.jsxs(v, {
    children: [vIe.jsx(v, {
      dimColor: !0,
      children: "\xB7 "
    }), sourceLabel]
  }), memoCache[8] = sourceLabel, memoCache[9] = sourceNode;else sourceNode = memoCache[9];
  let titleRow;
  if (memoCache[10] !== titleNode || memoCache[11] !== sourceNode) titleRow = vIe.jsxs($, {
    flexDirection: "row",
    gap: 1,
    children: [titleNode, sourceNode]
  }), memoCache[10] = titleNode, memoCache[11] = sourceNode, memoCache[12] = titleRow;else titleRow = memoCache[12];
  let subtitleNode;
  if (memoCache[13] !== subtitle) subtitleNode = subtitle != null && (typeof subtitle === "string" ? vIe.jsx(v, {
    dimColor: !0,
    wrap: "truncate-start",
    children: subtitle
  }) : subtitle), memoCache[13] = subtitle, memoCache[14] = subtitleNode;else subtitleNode = memoCache[14];
  let container;
  if (memoCache[15] !== titleRow || memoCache[16] !== subtitleNode) container = vIe.jsxs($, {
    flexDirection: "column",
    children: [titleRow, subtitleNode]
  }), memoCache[15] = titleRow, memoCache[16] = subtitleNode, memoCache[17] = container;else container = memoCache[17];
  return container;
}
var u_a, vIe;
var ZBt = b(() => {
  je();
  XH();
  u_a = x(tt(), 1), vIe = x(oe(), 1);
});

export {wIe,u_a,vIe,ZBt};
