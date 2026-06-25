// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ozl,ZNo,eFo,rzl,szl} from "../../vendor/m5353.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var lzl = {};
ft(lzl, {
  ClosedIssueNotice: () => ClosedIssueNotice
});
/** Render a single GitHub issue number as a clickable "#<number>" link. */
function izl(issueNumber: number) {
  return der.jsxs(Ss, {
    url: `${G1m}${issueNumber}`,
    children: ["#", issueNumber]
  }, issueNumber);
}
/** Build the success notice JSX for the set of closed issues. */
function V1m(closedIssues: { number: number }[]) {
  if (closedIssues.length === 1) return der.jsxs(v, {
    color: "success",
    children: ["✓ Your issue ", izl(closedIssues[0].number), " has been closed. Thanks for reporting!"]
  });
  let issueLinks = closedIssues.flatMap((issue, index) => [index > 0 ? ", " : "", izl(issue.number)]);
  return der.jsxs(v, {
    color: "success",
    children: ["✓ ", closedIssues.length, " of your issues have been closed (", issueLinks, "). Thanks for reporting!"]
  });
}
/** React component that polls for newly-closed issues and surfaces a notification. */
function ClosedIssueNotice() {
  let cache = azl.c(3),
    {
      addNotification
    } = Ci(),
    hasRun = per.useRef(!1),
    effect: (() => (() => void) | void) | undefined,
    deps: unknown[] | undefined;
  if (cache[0] !== addNotification) effect = () => {
    if (hasRun.current) return;
    if (hasRun.current = !0, it("tengu_gouda_loop", !1)) {
      let cancelled = !1,
        seenIssues: { number: number }[] = [],
        notifyClosed = function (newlyClosed: { number: number }[]) {
          let seenNumbers = new Set(seenIssues.map(Y1m)),
            unseen = newlyClosed.filter(issue => !seenNumbers.has(issue.number));
          if (unseen.length === 0) return;
          seenIssues.push(...unseen), W("tengu_closed_issue_notice_shown", {
            newClosedIssueCount: unseen.length,
            totalClosedIssueCount: seenIssues.length
          }), addNotification({
            key: "closed-issue-notice",
            kind: "event",
            jsx: V1m(seenIssues),
            priority: "low",
            timeoutMs: W1m,
            fold: j1m
          }), ozl(unseen.map(z1m));
        };
      return async function () {
        let firstBatch = await ZNo(),
          firstClosed = eFo(firstBatch);
        if (!cancelled && firstClosed.length > 0) notifyClosed(firstClosed);
        let delayMs = await rzl();
        if (cancelled || delayMs === null || delayMs > q1m) return;
        let secondClosed = eFo(await ZNo());
        if (!cancelled && secondClosed.length > 0) notifyClosed(secondClosed);
      }().catch(Ie), () => {
        cancelled = !0;
      };
    }
  }, deps = [addNotification], cache[0] = addNotification, cache[1] = effect, cache[2] = deps;else effect = cache[1], deps = cache[2];
  return per.useEffect(effect, deps), null;
}
/** Extract the issue number for telemetry mapping. */
function z1m(issue: { number: number }) {
  return issue.number;
}
/** Notification fold reducer: keep the latest notice. */
function j1m(prev: unknown, next: unknown) {
  return next;
}
/** Extract the issue number for dedup set membership. */
function Y1m(issue: { number: number }) {
  return issue.number;
}
var azl,
  per,
  der,
  q1m = 4000,
  W1m = 1e4,
  G1m = "https://github.com/anthropics/claude-code/issues/";
var czl = b(() => {
  fd();
  je();
  jn();
  kt();
  szl();
  vn();
  azl = x(tt(), 1), per = x(et(), 1), der = x(oe(), 1);
});
export {lzl,izl,V1m,ClosedIssueNotice,z1m,j1m,Y1m,azl,per,der,q1m,W1m,G1m,czl};
