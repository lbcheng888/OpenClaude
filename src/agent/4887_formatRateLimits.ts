// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {formatResetText as YA_,ps as w9} from "../../vendor/m238.ts";
import {MIN_BEHAVIOR_PCT as CF6,collectUsageData as zB_,g6t as $B_} from "../../vendor/m4536.ts";
import {Cn as v6,dr as G8} from "../../vendor/m231.ts";
import {getSubscriptionType as zK,hasProfileScope as ZW,isClaudeAISubscriber as kq,Ao as Xq} from "../config/2031_withOAuthRefreshLock.ts";
import {Hk as LZ,PF as Ux} from "../api/2739_status.ts";
import {getIsNonInteractiveSession as p8,lt as A_} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {oUa as tvK,EIe as dGH,H9 as $u} from "../telemetry/4045_contextWindow.ts";
import {_t as M_,cu as T5} from "../../vendor/m582.ts";
import {Ec as M1} from "../../vendor/m2449.ts";
// @ts-nocheck
var OD4 = {};
J_(OD4, {
  formatRateLimits: () => formatRateLimits,
  formatBehaviors: () => formatBehaviors,
  call: () => usageCommandHandler
});
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
    }] : [])],
    lines = [];
  for (let {
    title: title,
    limit: limit
  } of buckets) {
    if (!limit || limit.utilization === null) continue;
    let resetSuffix = limit.resets_at ? ` \xB7 resets ${YA_(limit.resets_at, true, true, true)}` : "";
    lines.push(`${title}: ${Math.floor(limit.utilization)}% used${resetSuffix}`);
  }
  return lines.length > 0 ? lines.join(`
`) : null;
}
function formatBehaviors(usageData) {
  let {
    behaviors: behaviors
  } = usageData;
  if (!behaviors) return null;
  let sections = [formatBehaviorPeriod("Last 24h", behaviors.day), formatBehaviorPeriod("Last 7d", behaviors.week)].filter(section => section !== null);
  if (sections.length === 0) return null;
  return ["What's contributing to your limits usage?", "Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai. Behaviors are independent characteristics, not a breakdown.", "", sections.join(`

`)].join(`
`);
}
function formatBehaviorPeriod(periodLabel, periodData) {
  let significantBehaviors = periodData.behaviors.filter(b => b.pct >= CF6),
    topListSections = [formatTopList("Top skills", periodData.skills, name => `/${name}`), formatTopList("Top subagents", periodData.agents), formatTopList("Top plugins", periodData.plugins), formatTopList("Top MCP servers", periodData.mcp_servers)].filter(section => section !== null);
  if (significantBehaviors.length === 0 && topListSections.length === 0) return null;
  let requestCountText = `${periodData.request_count} ${v6(periodData.request_count, "request")}`,
    sessionCountText = `${periodData.session_count} ${v6(periodData.session_count, "session")}`;
  return [`${periodLabel} \xB7 ${requestCountText} \xB7 ${sessionCountText}`, ...significantBehaviors.map(b => `  ${BEHAVIOR_FORMAT_FUNCTIONS[b.key](b.pct)}`), ...topListSections.map(section => `  ${section}`)].join(`
`);
}
function formatTopList(title, items, nameTransform) {
  if (items.length === 0) return null;
  let displayItems = items.slice(0, MAX_TOP_LIST_ITEMS).map(item => `${nameTransform ? nameTransform(item.name) : item.name} ${item.pct}%`).join(", "),
    remainingCount = items.length - MAX_TOP_LIST_ITEMS;
  return `${title}: ${displayItems}${remainingCount > 0 ? `, +${remainingCount} more` : ""}`;
}
var usageCommandHandler = async () => {
    let H = zK() !== null || ZW();
    if (kq() && H) {
      let _;
      if (LZ.isUsingOverage) _ = "You are currently using your overages to power your Claude Code usage. We will automatically switch you back to your subscription rate limits when they reset";else _ = "You are currently using your subscription to power your Claude Code usage";
      let q = await zB_({
          includeBehaviors: p8()
        }),
        K = formatRateLimits(q);
      if (K) _ += `

${K}`;
      let O = formatBehaviors(q);
      if (O) _ += `

${O}`;
      if (j_("tengu_amber_lark", false)) {
        let T = tvK();
        if (T) _ += `

${M_.dim(T)}`;
      }
      return {
        type: "text",
        value: _
      };
    }
    return {
      type: "text",
      value: M1(dGH())
    };
  },
  MAX_TOP_LIST_ITEMS = 8,
  BEHAVIOR_FORMAT_FUNCTIONS;
var TD4 = L(() => {
  T5();
  A_();
  $u();
  t6();
  Ux();
  Xq();
  w9();
  G8();
  $B_();
  BEHAVIOR_FORMAT_FUNCTIONS = {
    cache_miss: pct => `${pct}% of your usage hit a >100k-token cache miss`,
    long_context: pct => `${pct}% of your usage was at >150k context`,
    subagent_heavy: pct => `${pct}% of your usage came from subagent-heavy sessions`,
    high_parallel: pct => `${pct}% of your usage was while 4+ sessions ran in parallel`,
    cron: pct => `${pct}% of your usage came from sessions active for 8+ hours`
  };
});

export {OD4 as lCl,formatRateLimits,formatBehaviors,formatBehaviorPeriod as sCl,formatTopList as aVn,usageCommandHandler as Osm,MAX_TOP_LIST_ITEMS as oCl,BEHAVIOR_FORMAT_FUNCTIONS as Lsm,TD4 as cCl};
