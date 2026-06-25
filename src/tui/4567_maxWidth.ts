// @ts-nocheck
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {cKn,sRo} from "../agent/4562_day.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/**
 * Usage-breakdown panel ("What's contributing to your limits usage?").
 *
 * Scans local sessions on this machine, computes per-behavior / per-attribution
 * percentages and renders a day/week limits-usage summary inside the Settings UI.
 *
 * Module-level singletons (assigned in the lazy module initializer `usageBreakdownModuleInit`):
 *   memoCache    (iPe) - React-Compiler memo cache factory (`.c(n)`)
 *   react        (Y8e) - React core (`useState` / `use` / `Suspense`)
 *   reactJsx     (Qc)  - JSX runtime (`jsx` / `jsxs` / `Fragment`)
 *   behaviorCopy (yQp) - headline/body copy keyed by behavior id
 */

/** Top-level wrapper: memoizes the inner panel by `maxWidth`. */
function usageBreakdownPanel(props) {
  let memo = iPe.c(2),
    {
      maxWidth: maxWidth
    } = props,
    panel;
  if (memo[0] !== maxWidth) panel = Qc.jsx(usageBreakdownSuspenseHost, {
    maxWidth: maxWidth
  }), memo[0] = maxWidth, memo[1] = panel;else panel = memo[1];
  return panel;
}

/** Kicks off the local-session scan and shows a "Scanning…" fallback via Suspense. */
function usageBreakdownSuspenseHost(props) {
  let memo = iPe.c(5),
    {
      maxWidth: maxWidth
    } = props,
    [scanPromise] = Y8e.useState(startUsageScan),
    header;
  if (memo[0] === Symbol.for("react.memo_cache_sentinel")) header = Qc.jsx(usageBreakdownHeader, {}), memo[0] = header;else header = memo[0];
  let fallback;
  if (memo[1] === Symbol.for("react.memo_cache_sentinel")) fallback = Qc.jsxs($, {
    flexDirection: "column",
    children: [header, Qc.jsx($, {
      marginTop: 1,
      children: Qc.jsx(v, {
        dimColor: !0,
        children: "Scanning local sessions\u2026"
      })
    })]
  }), memo[1] = fallback;else fallback = memo[1];
  let suspenseFallback = fallback,
    suspense;
  if (memo[2] !== maxWidth || memo[3] !== scanPromise) suspense = Qc.jsx(Y8e.Suspense, {
    fallback: suspenseFallback,
    children: Qc.jsx(usageBreakdownBody, {
      maxWidth: maxWidth,
      scanPromise: scanPromise
    })
  }), memo[2] = maxWidth, memo[3] = scanPromise, memo[4] = suspense;else suspense = memo[4];
  return suspense;
}

/** Starts the usage scan, falling back to empty stats on error. */
function startUsageScan() {
  return cKn().catch(onUsageScanError);
}

/** On scan failure: log and return empty day/week stats. */
function onUsageScanError(error) {
  return Ie(error), {
    day: EMPTY_USAGE_STATS,
    week: EMPTY_USAGE_STATS
  };
}

/** Behaviors whose cost share is at or above the significance threshold. */
function significantBehaviors(stats) {
  if (stats.totalCost === 0) return [];
  return stats.behaviors.filter(behavior => behavior.cost / stats.totalCost * 100 >= SIGNIFICANCE_PCT);
}

/** True when there is any agent / skill / plugin / MCP-server attribution data. */
function hasAttributionData(stats) {
  return stats.agents.length > 0 || stats.skills.length > 0 || stats.plugins.length > 0 || stats.mcpServers.length > 0;
}

/** Main rendered body once the scan resolves: day/week toggle + breakdown sections. */
function usageBreakdownBody(props) {
  let memo = iPe.c(35),
    {
      maxWidth: maxWidth,
      scanPromise: scanPromise
    } = props,
    scanResult = Y8e.use(scanPromise),
    [period, setPeriod] = Y8e.useState("day"),
    dayHasContent;
  if (memo[0] !== scanResult.day) dayHasContent = significantBehaviors(scanResult.day).length > 0 || hasAttributionData(scanResult.day), memo[0] = scanResult.day, memo[1] = dayHasContent;else dayHasContent = memo[1];
  let hasDay = dayHasContent,
    weekHasContent;
  if (memo[2] !== scanResult.week) weekHasContent = significantBehaviors(scanResult.week).length > 0 || hasAttributionData(scanResult.week), memo[2] = scanResult.week, memo[3] = weekHasContent;else weekHasContent = memo[3];
  let hasWeek = weekHasContent,
    hasAny = hasDay || hasWeek,
    keyHandlers;
  if (memo[4] === Symbol.for("react.memo_cache_sentinel")) keyHandlers = {
    "settings:periodDay": () => setPeriod("day"),
    "settings:periodWeek": () => setPeriod("week")
  }, memo[4] = keyHandlers;else keyHandlers = memo[4];
  let keymapOpts;
  if (memo[5] !== hasAny) keymapOpts = {
    context: "Settings",
    isActive: hasAny
  }, memo[5] = hasAny, memo[6] = keymapOpts;else keymapOpts = memo[6];
  if (Oo(keyHandlers, keymapOpts), !hasDay && !hasWeek) return null;
  let activeStats = period === "day" ? scanResult.day : scanResult.week,
    rootBox,
    columnBox,
    headerEl,
    introEl,
    marginTop,
    flexDir,
    gap,
    sectionsEl,
    rootFlexDir;
  if (memo[7] !== maxWidth || memo[8] !== period || memo[9] !== activeStats) {
    let topBehaviors = significantBehaviors(activeStats);
    if (columnBox = $, rootFlexDir = "column", memo[19] === Symbol.for("react.memo_cache_sentinel")) headerEl = Qc.jsx(usageBreakdownHeader, {}), memo[19] = headerEl;else headerEl = memo[19];
    let windowLabel = period === "day" ? "24h" : "7d";
    if (memo[20] !== windowLabel) introEl = Qc.jsx($, {
      marginTop: 1,
      children: Qc.jsxs(v, {
        dimColor: !0,
        wrap: "wrap",
        children: ["Last ", windowLabel, " \xB7 these are independent characteristics of your usage, not a breakdown"]
      })
    }), memo[20] = windowLabel, memo[21] = introEl;else introEl = memo[21];
    rootBox = $, marginTop = 1, flexDir = "column", gap = 1, sectionsEl = topBehaviors.length === 0 && !hasAttributionData(activeStats) ? Qc.jsxs(v, {
      dimColor: !0,
      children: ["Nothing over ", SIGNIFICANCE_PCT, "% in this period \u2014 try the other window."]
    }) : Qc.jsxs(Qc.Fragment, {
      children: [topBehaviors.map(behavior => Qc.jsx(usageBreakdownStat, {
        stat: behavior,
        totalCost: activeStats.totalCost,
        maxWidth: maxWidth
      }, behavior.key)), Qc.jsx(attributionTip, {
        top: activeStats.agents[0],
        maxWidth: maxWidth,
        headline: subagentHeadline,
        body: "If this runs frequently, consider configuring its subagents with a cheaper model or tightening their prompts."
      }), Qc.jsx(attributionTip, {
        top: activeStats.skills[0],
        maxWidth: maxWidth,
        headline: skillHeadline,
        body: "Heavy skills can be scoped down or run with a cheaper model via skill frontmatter."
      }), Qc.jsx(attributionTip, {
        top: activeStats.plugins[0],
        maxWidth: maxWidth,
        headline: pluginHeadline,
        body: "Review what this plugin contributes \u2014 its agents, skills, and MCP tools all count toward your limit."
      }), Qc.jsx(attributionTip, {
        top: activeStats.mcpServers[0],
        maxWidth: maxWidth,
        headline: mcpServerHeadline,
        body: "MCP tool results stay in context for the rest of the session. /compact to flush them, or disable servers you don't need."
      }), !hasAttributionData(activeStats) ? Qc.jsxs($, {
        flexDirection: "column",
        children: [Qc.jsx(v, {
          bold: !0,
          children: "Skills, subagents, plugins, and MCP servers"
        }), Qc.jsx(v, {
          dimColor: !0,
          wrap: "wrap",
          children: "No attribution data yet \xB7 accumulates as you use Claude"
        })]
      }) : Qc.jsxs(Qc.Fragment, {
        children: [Qc.jsx(attributionSection, {
          title: "Skills",
          rows: activeStats.skills,
          label: skillLabel
        }), Qc.jsx(attributionSection, {
          title: "Subagents",
          rows: activeStats.agents
        }), Qc.jsx(attributionSection, {
          title: "Plugins",
          rows: activeStats.plugins
        }), Qc.jsx(attributionSection, {
          title: "MCP servers",
          rows: activeStats.mcpServers
        })]
      })]
    }), memo[7] = maxWidth, memo[8] = period, memo[9] = activeStats, memo[10] = rootBox, memo[11] = columnBox, memo[12] = headerEl, memo[13] = introEl, memo[14] = marginTop, memo[15] = flexDir, memo[16] = gap, memo[17] = sectionsEl, memo[18] = rootFlexDir;
  } else rootBox = memo[10], columnBox = memo[11], headerEl = memo[12], introEl = memo[13], marginTop = memo[14], flexDir = memo[15], gap = memo[16], sectionsEl = memo[17], rootFlexDir = memo[18];
  let sectionsContainer;
  if (memo[22] !== rootBox || memo[23] !== marginTop || memo[24] !== flexDir || memo[25] !== gap || memo[26] !== sectionsEl) sectionsContainer = Qc.jsx(rootBox, {
    marginTop: marginTop,
    flexDirection: flexDir,
    gap: gap,
    children: sectionsEl
  }), memo[22] = rootBox, memo[23] = marginTop, memo[24] = flexDir, memo[25] = gap, memo[26] = sectionsEl, memo[27] = sectionsContainer;else sectionsContainer = memo[27];
  let footerEl;
  if (memo[28] === Symbol.for("react.memo_cache_sentinel")) footerEl = Qc.jsx($, {
    marginTop: 1,
    children: Qc.jsx(v, {
      dimColor: !0,
      children: Qc.jsxs(bn, {
        children: [Qc.jsx(dr, {
          action: "settings:periodDay",
          context: "Settings",
          fallback: "d",
          description: "day"
        }), Qc.jsx(dr, {
          action: "settings:periodWeek",
          context: "Settings",
          fallback: "w",
          description: "week"
        })]
      })
    })
  }), memo[28] = footerEl;else footerEl = memo[28];
  let root;
  if (memo[29] !== columnBox || memo[30] !== headerEl || memo[31] !== introEl || memo[32] !== sectionsContainer || memo[33] !== rootFlexDir) root = Qc.jsxs(columnBox, {
    flexDirection: rootFlexDir,
    children: [headerEl, introEl, sectionsContainer, footerEl]
  }), memo[29] = columnBox, memo[30] = headerEl, memo[31] = introEl, memo[32] = sectionsContainer, memo[33] = rootFlexDir, memo[34] = root;else root = memo[34];
  return root;
}

/** Headline copy: skill slash-command label. */
function skillLabel(name) {
  return `/${name}`;
}

/** Headline copy for MCP-server attribution. */
function mcpServerHeadline(pct, name) {
  return `${pct}% of your usage came from MCP server "${name}"`;
}

/** Headline copy for plugin attribution. */
function pluginHeadline(pct, name) {
  return `${pct}% of your usage came from plugin "${name}"`;
}

/** Headline copy for skill attribution. */
function skillHeadline(pct, name) {
  return `${pct}% of your usage came from /${name}`;
}

/** Headline copy for subagent attribution. */
function subagentHeadline(pct, name) {
  return `${pct}% of your usage came from subagents under "${name}"`;
}

/** Static panel header. */
function usageBreakdownHeader() {
  let memo = iPe.c(1),
    header;
  if (memo[0] === Symbol.for("react.memo_cache_sentinel")) header = Qc.jsxs($, {
    flexDirection: "column",
    children: [Qc.jsx(v, {
      bold: !0,
      wrap: "wrap",
      children: "What's contributing to your limits usage?"
    }), Qc.jsx(v, {
      dimColor: !0,
      wrap: "wrap",
      children: "Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai"
    })]
  }), memo[0] = header;else header = memo[0];
  return header;
}

/** Renders one attribution section (Skills / Subagents / Plugins / MCP servers). */
function attributionSection(props) {
  let memo = iPe.c(23),
    {
      title: title,
      rows: rows,
      label: label
    } = props;
  if (rows.length === 0) return null;
  let containerBox, containerFlexDir, headerRow, rowEls, overflowCount;
  if (memo[0] !== label || memo[1] !== rows || memo[2] !== title) {
    let visibleRows = rows.slice(0, MAX_ROWS);
    overflowCount = rows.length - MAX_ROWS, containerBox = $, containerFlexDir = "column";
    let titleEl;
    if (memo[8] !== title) titleEl = Qc.jsx(v, {
      children: title
    }), memo[8] = title, memo[9] = titleEl;else titleEl = memo[9];
    let pctHeaderEl;
    if (memo[10] === Symbol.for("react.memo_cache_sentinel")) pctHeaderEl = Qc.jsx(v, {
      dimColor: !0,
      children: "% of usage"
    }), memo[10] = pctHeaderEl;else pctHeaderEl = memo[10];
    if (memo[11] !== titleEl) headerRow = Qc.jsxs($, {
      width: NAME_COL_WIDTH + PCT_COL_WIDTH,
      justifyContent: "space-between",
      children: [titleEl, pctHeaderEl]
    }), memo[11] = titleEl, memo[12] = headerRow;else headerRow = memo[12];
    let renderRow;
    if (memo[13] !== label) renderRow = row => Qc.jsxs($, {
      children: [Qc.jsx($, {
        width: NAME_COL_WIDTH,
        children: Qc.jsx(v, {
          dimColor: !0,
          wrap: "truncate-end",
          children: label ? label(row.name) : row.name
        })
      }), Qc.jsx($, {
        width: PCT_COL_WIDTH,
        justifyContent: "flex-end",
        children: Qc.jsxs(v, {
          dimColor: !0,
          children: [row.pct, "%"]
        })
      })]
    }, row.name), memo[13] = label, memo[14] = renderRow;else renderRow = memo[14];
    rowEls = visibleRows.map(renderRow), memo[0] = label, memo[1] = rows, memo[2] = title, memo[3] = containerBox, memo[4] = containerFlexDir, memo[5] = headerRow, memo[6] = rowEls, memo[7] = overflowCount;
  } else containerBox = memo[3], containerFlexDir = memo[4], headerRow = memo[5], rowEls = memo[6], overflowCount = memo[7];
  let overflowEl;
  if (memo[15] !== overflowCount) overflowEl = overflowCount > 0 && Qc.jsxs(v, {
    dimColor: !0,
    children: ["\u2026 ", overflowCount, " more"]
  }), memo[15] = overflowCount, memo[16] = overflowEl;else overflowEl = memo[16];
  let section;
  if (memo[17] !== containerBox || memo[18] !== containerFlexDir || memo[19] !== headerRow || memo[20] !== rowEls || memo[21] !== overflowEl) section = Qc.jsxs(containerBox, {
    flexDirection: containerFlexDir,
    children: [headerRow, rowEls, overflowEl]
  }), memo[17] = containerBox, memo[18] = containerFlexDir, memo[19] = headerRow, memo[20] = rowEls, memo[21] = overflowEl, memo[22] = section;else section = memo[22];
  return section;
}

/** Renders a single attribution tip for the top agent/skill/plugin/MCP-server entry. */
function attributionTip(props) {
  let memo = iPe.c(12),
    {
      top: top,
      maxWidth: maxWidth,
      headline: headline,
      body: body
    } = props;
  if (!top || top.pct < SIGNIFICANCE_PCT) return null;
  let headlineText;
  if (memo[0] !== headline || memo[1] !== top.name || memo[2] !== top.pct) headlineText = headline(top.pct, top.name), memo[0] = headline, memo[1] = top.name, memo[2] = top.pct, memo[3] = headlineText;else headlineText = memo[3];
  let headlineEl;
  if (memo[4] !== headlineText) headlineEl = Qc.jsx(v, {
    wrap: "wrap",
    children: headlineText
  }), memo[4] = headlineText, memo[5] = headlineEl;else headlineEl = memo[5];
  let bodyEl;
  if (memo[6] !== body) bodyEl = Qc.jsx($, {
    paddingLeft: 1,
    children: Qc.jsx(v, {
      dimColor: !0,
      wrap: "wrap",
      children: body
    })
  }), memo[6] = body, memo[7] = bodyEl;else bodyEl = memo[7];
  let tip;
  if (memo[8] !== maxWidth || memo[9] !== headlineEl || memo[10] !== bodyEl) tip = Qc.jsxs($, {
    flexDirection: "column",
    width: maxWidth,
    children: [headlineEl, bodyEl]
  }), memo[8] = maxWidth, memo[9] = headlineEl, memo[10] = bodyEl, memo[11] = tip;else tip = memo[11];
  return tip;
}

/** Renders one significant-behavior stat (headline + body), sized to `maxWidth`. */
function usageBreakdownStat(props) {
  let memo = iPe.c(22),
    {
      stat: stat,
      totalCost: totalCost,
      maxWidth: maxWidth
    } = props,
    copy = yQp[stat.key],
    textComp,
    containerBox,
    wrap,
    headlineText,
    flexDir,
    width;
  if (memo[0] !== maxWidth || memo[1] !== copy || memo[2] !== stat.cost || memo[3] !== totalCost) {
    let pct = Math.round(stat.cost / totalCost * 100);
    containerBox = $, flexDir = "column", width = maxWidth, textComp = v, wrap = "wrap", headlineText = copy.headline(pct), memo[0] = maxWidth, memo[1] = copy, memo[2] = stat.cost, memo[3] = totalCost, memo[4] = textComp, memo[5] = containerBox, memo[6] = wrap, memo[7] = headlineText, memo[8] = flexDir, memo[9] = width;
  } else textComp = memo[4], containerBox = memo[5], wrap = memo[6], headlineText = memo[7], flexDir = memo[8], width = memo[9];
  let headlineEl;
  if (memo[10] !== textComp || memo[11] !== wrap || memo[12] !== headlineText) headlineEl = Qc.jsx(textComp, {
    wrap: wrap,
    children: headlineText
  }), memo[10] = textComp, memo[11] = wrap, memo[12] = headlineText, memo[13] = headlineEl;else headlineEl = memo[13];
  let bodyEl;
  if (memo[14] !== copy.body) bodyEl = Qc.jsx($, {
    paddingLeft: 1,
    children: Qc.jsx(v, {
      dimColor: !0,
      wrap: "wrap",
      children: copy.body
    })
  }), memo[14] = copy.body, memo[15] = bodyEl;else bodyEl = memo[15];
  let statBlock;
  if (memo[16] !== containerBox || memo[17] !== flexDir || memo[18] !== width || memo[19] !== headlineEl || memo[20] !== bodyEl) statBlock = Qc.jsxs(containerBox, {
    flexDirection: flexDir,
    width: width,
    children: [headlineEl, bodyEl]
  }), memo[16] = containerBox, memo[17] = flexDir, memo[18] = width, memo[19] = headlineEl, memo[20] = bodyEl, memo[21] = statBlock;else statBlock = memo[21];
  return statBlock;
}

var iPe,
  Y8e,
  Qc,
  yQp,
  SIGNIFICANCE_PCT = 10,
  EMPTY_USAGE_STATS,
  MAX_ROWS = 8,
  NAME_COL_WIDTH = 28,
  PCT_COL_WIDTH = 6;
var usageBreakdownModuleInit = b(() => {
  je();
  ss();
  sRo();
  vn();
  uc();
  Is();
  iPe = x(tt(), 1), Y8e = x(et(), 1), Qc = x(oe(), 1), yQp = {
    cache_miss: {
      headline: pct => `${pct}% of your usage hit a >100k-token cache miss`,
      body: "Uncached input is expensive, and often happens when sending a message to a session that has gone idle. /compact before stepping away keeps the cold-start small."
    },
    long_context: {
      headline: pct => `${pct}% of your usage was at >150k context`,
      body: "Longer sessions are more expensive even when cached. /compact mid-task, /clear when switching to new tasks."
    },
    subagent_heavy: {
      headline: pct => `${pct}% of your usage came from subagent-heavy sessions`,
      body: "Each subagent runs its own requests. Be deliberate about spawning them \u2014 and consider configuring a cheaper model for simpler subagents."
    },
    high_parallel: {
      headline: pct => `${pct}% of your usage was while 4+ sessions ran in parallel`,
      body: "All sessions share one limit. If you don't need them all at once, queueing uses it more evenly."
    },
    cron: {
      headline: pct => `${pct}% of your usage came from sessions active for 8+ hours`,
      body: "These are often background/loop sessions. Continuous usage can add up quickly so make sure it is intentional."
    }
  }, EMPTY_USAGE_STATS = {
    totalCost: 0,
    requestCount: 0,
    sessionCount: 0,
    behaviors: [],
    agents: [],
    skills: [],
    plugins: [],
    mcpServers: []
  };
});

export {usageBreakdownPanel as jfl,usageBreakdownSuspenseHost as TQp,startUsageScan as SQp,onUsageScanError as bQp,significantBehaviors as lRo,hasAttributionData as pKn,usageBreakdownBody as EQp,skillLabel as CQp,mcpServerHeadline as AQp,pluginHeadline as RQp,skillHeadline as vQp,subagentHeadline as wQp,usageBreakdownHeader as Yfl,attributionSection as mKn,attributionTip as fKn,usageBreakdownStat as kQp,iPe,Y8e,Qc,yQp,SIGNIFICANCE_PCT as cRo,EMPTY_USAGE_STATS as Gfl,MAX_ROWS as Vfl,NAME_COL_WIDTH as Kfl,PCT_COL_WIDTH as zfl,usageBreakdownModuleInit as Jfl};
