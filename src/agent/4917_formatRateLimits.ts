// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {cot,Mke,_ge} from "../telemetry/2750_title.ts";
import {formatResetText as Ybt,Xo} from "../../vendor/m240.ts";
import {MIN_BEHAVIOR_PCT as dKn,collectUsageData as W8t,G8t} from "../../vendor/m4562.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {getSubscriptionType as vi,Vv,isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {oF,RM} from "../../vendor/m1289.ts";
import {zk,nB} from "../api/2752_status.ts";
import {getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {pBa,q0e,V$} from "../telemetry/3911_contextWindow.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {cc} from "../../vendor/m2459.ts";
// @ts-nocheck
var yxl = {};
ft(yxl, {
  formatRateLimits: () => formatRateLimits,
  formatBehaviors: () => formatBehaviors,
  call: () => call
});
/**
 * Build the rate-limit summary lines for the usage view.
 * @param usageData - object carrying rate_limits and subscription_type
 * @returns newline-joined "Title: N% used [· resets ...]" lines, or null when nothing to show
 */
function formatRateLimits(usageData) {
  let {
    rate_limits: rateLimits,
    subscription_type: subscriptionType
  } = usageData;
  if (!rateLimits) return null;
  let isMaxOrTeamPlan = subscriptionType === "max" || subscriptionType === "team" || subscriptionType === null,
    buckets = [{
      title: "Current session",
      limit: rateLimits.five_hour
    }, {
      title: "Current week (all models)",
      limit: rateLimits.seven_day
    }, ...(isMaxOrTeamPlan ? [{
      title: "Current week (Sonnet only)",
      limit: rateLimits.seven_day_sonnet
    }] : []), ...cot(rateLimits.limits, Mke())],
    lines = [];
  for (let {
    title: title,
    limit: limit
  } of buckets) {
    if (!limit || limit.utilization === null) continue;
    let resetSuffix = limit.resets_at ? ` \xB7 resets ${Ybt(limit.resets_at, !0, !0, !0)}` : "";
    lines.push(`${title}: ${Math.floor(limit.utilization)}% used${resetSuffix}`);
  }
  return lines.length > 0 ? lines.join(`
`) : null;
}
/**
 * Build the "what's contributing to your limits usage" block.
 * @param usageData - object carrying behaviors (day/week)
 * @returns formatted multi-line block, or null when there is nothing significant
 */
function formatBehaviors(usageData) {
  let {
    behaviors: behaviors
  } = usageData;
  if (!behaviors) return null;
  let sections = [hxl("Last 24h", behaviors.day), hxl("Last 7d", behaviors.week)].filter(section => section !== null);
  if (sections.length === 0) return null;
  return ["What's contributing to your limits usage?", "Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai. Behaviors are independent characteristics, not a breakdown.", "", sections.join(`

`)].join(`
`);
}
/**
 * Format one behavior period (24h / 7d) into its line block.
 * @param periodLabel - heading such as "Last 24h"
 * @param periodData - per-period stats: behaviors, skills, agents, plugins, mcp_servers, counts
 * @returns the formatted block, or null when nothing crosses the significance threshold
 */
function hxl(periodLabel, periodData) {
  let significantBehaviors = periodData.behaviors.filter(behavior => behavior.pct >= dKn),
    topListSections = [Yjn("Top skills", periodData.skills, name => `/${name}`), Yjn("Top subagents", periodData.agents), Yjn("Top plugins", periodData.plugins), Yjn("Top MCP servers", periodData.mcp_servers)].filter(section => section !== null);
  if (significantBehaviors.length === 0 && topListSections.length === 0) return null;
  let requestCountText = `${periodData.request_count} ${Sn(periodData.request_count, "request")}`,
    sessionCountText = `${periodData.session_count} ${Sn(periodData.session_count, "session")}`;
  return [`${periodLabel} \xB7 ${requestCountText} \xB7 ${sessionCountText}`, ...significantBehaviors.map(behavior => `  ${zfm[behavior.key](behavior.pct)}`), ...topListSections.map(section => `  ${section}`)].join(`
`);
}
/**
 * Format a capped "Top X: a 50%, b 30%, +N more" list.
 * @param title - the list heading
 * @param items - array of { name, pct }
 * @param nameTransform - optional name decorator (e.g. prefix skills with "/")
 * @returns the formatted line, or null when items is empty
 */
function Yjn(title, items, nameTransform) {
  if (items.length === 0) return null;
  let displayItems = items.slice(0, fxl).map(item => `${nameTransform ? nameTransform(item.name) : item.name} ${item.pct}%`).join(", "),
    remainingCount = items.length - fxl;
  return `${title}: ${displayItems}${remainingCount > 0 ? `, +${remainingCount} more` : ""}`;
}
/** Slash-command handler producing the usage/limits text block. */
var call = async () => {
    let isSubscriber = vi() !== null || Vv();
    if (Eo() && isSubscriber && !oF()) {
      let message;
      if (zk.isUsingOverage) message = "You are currently using your overages to power your Claude Code usage. We will automatically switch you back to your subscription rate limits when they reset";else message = "You are currently using your subscription to power your Claude Code usage";
      let usageData = await W8t({
          includeBehaviors: kr()
        }),
        rateLimitText = formatRateLimits(usageData);
      if (rateLimitText) message += `

${rateLimitText}`;
      let behaviorText = formatBehaviors(usageData);
      if (behaviorText) message += `

${behaviorText}`;
      if (it("tengu_amber_lark", !1)) {
        let amberText = pBa();
        if (amberText) message += `

${bt.dim(amberText)}`;
      }
      return {
        type: "text",
        value: message
      };
    }
    return {
      type: "text",
      value: cc(q0e())
    };
  },
  /** Max number of items rendered before collapsing into "+N more". */
  fxl = 8,
  /** Map of behavior key -> formatter producing its "% of your usage ..." sentence. */
  zfm;
var Txl = b(() => {
  Gc();
  lt();
  V$();
  jn();
  _ge();
  nB();
  lo();
  RM();
  Xo();
  lr();
  G8t();
  zfm = {
    cache_miss: pct => `${pct}% of your usage hit a >100k-token cache miss`,
    long_context: pct => `${pct}% of your usage was at >150k context`,
    subagent_heavy: pct => `${pct}% of your usage came from subagent-heavy sessions`,
    high_parallel: pct => `${pct}% of your usage was while 4+ sessions ran in parallel`,
    cron: pct => `${pct}% of your usage came from sessions active for 8+ hours`
  };
});

export {yxl,formatRateLimits,formatBehaviors,hxl,Yjn,call as Kfm,fxl,zfm,Txl};
