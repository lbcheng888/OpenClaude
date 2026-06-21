// @ts-nocheck
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {H8n as qjn,Yyo as $_o} from "../agent/4536_day.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Wo,Ts as _s} from "../../vendor/m2542.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function Ksl(e) {
  let t = QRH.c(2),
    {
      maxWidth: n
    } = e,
    r;
  if (t[0] !== n) r = R9.createElement(Rjp, {
    maxWidth: n
  }), t[0] = n, t[1] = r;else r = t[1];
  return r;
}
function Rjp(e) {
  let t = QRH.c(5),
    {
      maxWidth: n
    } = e,
    [r] = vBH.useState(xjp),
    o;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) o = R9.createElement(onUsageScanError, null), t[0] = o;else o = t[0];
  let s;
  if (t[1] === Symbol.for("react.memo_cache_sentinel")) s = R9.createElement(B, {
    flexDirection: "column"
  }, o, R9.createElement(B, {
    marginTop: 1
  }, R9.createElement(w, {
    dimColor: true
  }, "Scanning local sessions\u2026"))), t[1] = s;else s = t[1];
  let i = s,
    a;
  if (t[2] !== n || t[3] !== r) a = R9.createElement(vBH.Suspense, {
    fallback: i
  }, R9.createElement(Hjp, {
    maxWidth: n,
    scanPromise: r
  })), t[2] = n, t[3] = r, t[4] = a;else a = t[4];
  return a;
}
function xjp() {
  return qjn().catch(kjp);
}
function kjp(e) {
  return Ie(e), {
    day: V_4,
    week: V_4
  };
}
function q_o(e) {
  if (e.totalCost === 0) return [];
  return e.behaviors.filter(t => t.cost / e.totalCost * 100 >= j_o);
}
function Gjn(e) {
  return e.agents.length > 0 || e.skills.length > 0 || e.plugins.length > 0 || e.mcpServers.length > 0;
}
function Hjp(e) {
  let t = QRH.c(35),
    {
      maxWidth: n,
      scanPromise: r
    } = e,
    o = vBH.use(r),
    [s, i] = vBH.useState("day"),
    a;
  if (t[0] !== o.day) a = q_o(o.day).length > 0 || Gjn(o.day), t[0] = o.day, t[1] = a;else a = t[1];
  let l = a,
    c;
  if (t[2] !== o.week) c = q_o(o.week).length > 0 || Gjn(o.week), t[2] = o.week, t[3] = c;else c = t[3];
  let u = c,
    d = l || u,
    p;
  if (t[4] === Symbol.for("react.memo_cache_sentinel")) p = {
    "settings:periodDay": () => i("day"),
    "settings:periodWeek": () => i("week")
  }, t[4] = p;else p = t[4];
  let m;
  if (t[5] !== d) m = {
    context: "Settings",
    isActive: d
  }, t[5] = d, t[6] = m;else m = t[6];
  if (Wo(p, m), !l && !u) return null;
  let f = s === "day" ? o.day : o.week,
    A,
    h,
    g,
    _,
    y,
    T,
    S,
    C,
    R;
  if (t[7] !== n || t[8] !== s || t[9] !== f) {
    let H = q_o(f);
    if (h = B, R = "column", t[19] === Symbol.for("react.memo_cache_sentinel")) g = R9.createElement(onUsageScanError, null), t[19] = g;else g = t[19];
    let P = s === "day" ? "24h" : "7d";
    if (t[20] !== P) _ = R9.createElement(B, {
      marginTop: 1
    }, R9.createElement(w, {
      dimColor: true,
      wrap: "wrap"
    }, "Last ", P, " \xB7 these are independent characteristics of your usage, not a breakdown")), t[20] = P, t[21] = _;else _ = t[21];
    A = B, y = 1, T = "column", S = 1, C = H.length === 0 && !Gjn(f) ? R9.createElement(w, {
      dimColor: true
    }, "Nothing over ", j_o, "% in this period \u2014 try the other window.") : R9.createElement(R9.Fragment, null, H.map(O => R9.createElement(UsageBreakdownContent, {
      key: O.key,
      stat: O,
      totalCost: f.totalCost,
      maxWidth: n
    })), R9.createElement(hasAttributionData, {
      top: f.agents[0],
      maxWidth: n,
      headline: startUsageScan,
      body: "If this runs frequently, consider configuring its subagents with a cheaper model or tightening their prompts."
    }), R9.createElement(hasAttributionData, {
      top: f.skills[0],
      maxWidth: n,
      headline: UsageBreakdownLoader,
      body: "Heavy skills can be scoped down or run with a cheaper model via skill frontmatter."
    }), R9.createElement(hasAttributionData, {
      top: f.plugins[0],
      maxWidth: n,
      headline: UsageBreakdownPanel,
      body: "Review what this plugin contributes \u2014 its agents, skills, and MCP tools all count toward your limit."
    }), R9.createElement(hasAttributionData, {
      top: f.mcpServers[0],
      maxWidth: n,
      headline: Djp,
      body: "MCP tool results stay in context for the rest of the session. /compact to flush them, or disable servers you don't need."
    }), !Gjn(f) ? R9.createElement(B, {
      flexDirection: "column"
    }, R9.createElement(w, {
      bold: true
    }, "Skills, subagents, plugins, and MCP servers"), R9.createElement(w, {
      dimColor: true,
      wrap: "wrap"
    }, "No attribution data yet \xB7 accumulates as you use Claude")) : R9.createElement(R9.Fragment, null, R9.createElement(significantBehaviors, {
      title: "Skills",
      rows: f.skills,
      label: Ijp
    }), R9.createElement(significantBehaviors, {
      title: "Subagents",
      rows: f.agents
    }), R9.createElement(significantBehaviors, {
      title: "Plugins",
      rows: f.plugins
    }), R9.createElement(significantBehaviors, {
      title: "MCP servers",
      rows: f.mcpServers
    }))), t[7] = n, t[8] = s, t[9] = f, t[10] = A, t[11] = h, t[12] = g, t[13] = _, t[14] = y, t[15] = T, t[16] = S, t[17] = C, t[18] = R;
  } else A = t[10], h = t[11], g = t[12], _ = t[13], y = t[14], T = t[15], S = t[16], C = t[17], R = t[18];
  let k;
  if (t[22] !== A || t[23] !== y || t[24] !== T || t[25] !== S || t[26] !== C) k = R9.createElement(A, {
    marginTop: y,
    flexDirection: T,
    gap: S
  }, C), t[22] = A, t[23] = y, t[24] = T, t[25] = S, t[26] = C, t[27] = k;else k = t[27];
  let x;
  if (t[28] === Symbol.for("react.memo_cache_sentinel")) x = R9.createElement(B, {
    marginTop: 1
  }, R9.createElement(w, {
    dimColor: true
  }, R9.createElement(hn, null, R9.createElement(ur, {
    action: "settings:periodDay",
    context: "Settings",
    fallback: "d",
    description: "day"
  }), R9.createElement(ur, {
    action: "settings:periodWeek",
    context: "Settings",
    fallback: "w",
    description: "week"
  })))), t[28] = x;else x = t[28];
  let I;
  if (t[29] !== h || t[30] !== g || t[31] !== _ || t[32] !== k || t[33] !== R) I = R9.createElement(h, {
    flexDirection: R
  }, g, _, k, x), t[29] = h, t[30] = g, t[31] = _, t[32] = k, t[33] = R, t[34] = I;else I = t[34];
  return I;
}
function Ijp(e) {
  return `/${e}`;
}
function Djp(e, t) {
  return `${e}% of your usage came from MCP server "${t}"`;
}
function UsageBreakdownPanel(props, t) {
  return `${props}% of your usage came from plugin "${t}"`;
}
function UsageBreakdownLoader(props, t) {
  return `${props}% of your usage came from /${t}`;
}
function startUsageScan(e, t) {
  return `${e}% of your usage came from subagents under "${t}"`;
}
function onUsageScanError() {
  let e = QRH.c(1),
    t;
  if (e[0] === Symbol.for("react.memo_cache_sentinel")) t = R9.createElement(B, {
    flexDirection: "column"
  }, R9.createElement(w, {
    bold: true,
    wrap: "wrap"
  }, "What's contributing to your limits usage?"), R9.createElement(w, {
    dimColor: true,
    wrap: "wrap"
  }, "Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai")), e[0] = t;else t = e[0];
  return t;
}
function significantBehaviors(period) {
  let t = QRH.c(23),
    {
      title: n,
      rows: r,
      label: o
    } = period;
  if (r.length === 0) return null;
  let s, i, a, l, c;
  if (t[0] !== o || t[1] !== r || t[2] !== n) {
    let p = r.slice(0, Wsl);
    c = r.length - Wsl, s = B, i = "column";
    let m;
    if (t[8] !== n) m = R9.createElement(w, null, n), t[8] = n, t[9] = m;else m = t[9];
    let f;
    if (t[10] === Symbol.for("react.memo_cache_sentinel")) f = R9.createElement(w, {
      dimColor: true
    }, "% of usage"), t[10] = f;else f = t[10];
    if (t[11] !== m) a = R9.createElement(B, {
      width: Gsl + Vsl,
      justifyContent: "space-between"
    }, m, f), t[11] = m, t[12] = a;else a = t[12];
    let A;
    if (t[13] !== o) A = h => R9.createElement(B, {
      key: h.name
    }, R9.createElement(B, {
      width: Gsl
    }, R9.createElement(w, {
      dimColor: true,
      wrap: "truncate-end"
    }, o ? o(h.name) : h.name)), R9.createElement(B, {
      width: Vsl,
      justifyContent: "flex-end"
    }, R9.createElement(w, {
      dimColor: true
    }, h.pct, "%"))), t[13] = o, t[14] = A;else A = t[14];
    l = p.map(A), t[0] = o, t[1] = r, t[2] = n, t[3] = s, t[4] = i, t[5] = a, t[6] = l, t[7] = c;
  } else s = t[3], i = t[4], a = t[5], l = t[6], c = t[7];
  let u;
  if (t[15] !== c) u = c > 0 && R9.createElement(w, {
    dimColor: true
  }, "\u2026 ", c, " more"), t[15] = c, t[16] = u;else u = t[16];
  let d;
  if (t[17] !== s || t[18] !== i || t[19] !== a || t[20] !== l || t[21] !== u) d = R9.createElement(s, {
    flexDirection: i
  }, a, l, u), t[17] = s, t[18] = i, t[19] = a, t[20] = l, t[21] = u, t[22] = d;else d = t[22];
  return d;
}
function hasAttributionData(period) {
  let t = QRH.c(12),
    {
      top: n,
      maxWidth: r,
      headline: o,
      body: s
    } = period;
  if (!n || n.pct < j_o) return null;
  let i;
  if (t[0] !== o || t[1] !== n.name || t[2] !== n.pct) i = o(n.pct, n.name), t[0] = o, t[1] = n.name, t[2] = n.pct, t[3] = i;else i = t[3];
  let a;
  if (t[4] !== i) a = R9.createElement(w, {
    wrap: "wrap"
  }, i), t[4] = i, t[5] = a;else a = t[5];
  let l;
  if (t[6] !== s) l = R9.createElement(B, {
    paddingLeft: 1
  }, R9.createElement(w, {
    dimColor: true,
    wrap: "wrap"
  }, s)), t[6] = s, t[7] = l;else l = t[7];
  let c;
  if (t[8] !== r || t[9] !== a || t[10] !== l) c = R9.createElement(B, {
    flexDirection: "column",
    width: r
  }, a, l), t[8] = r, t[9] = a, t[10] = l, t[11] = c;else c = t[11];
  return c;
}
function UsageBreakdownContent(props) {
  let $memo = QRH.c(22),
    {
      stat: maxWidth,
      totalCost: scanPromise,
      maxWidth: o
    } = props,
    scan = $uO[maxWidth.key],
    i,
    dayHasContent,
    l,
    hasDay,
    weekHasContent,
    d;
  if ($memo[0] !== o || $memo[1] !== scan || $memo[2] !== maxWidth.cost || $memo[3] !== scanPromise) {
    let A = Math.round(maxWidth.cost / scanPromise * 100);
    dayHasContent = B, weekHasContent = "column", d = o, i = w, l = "wrap", hasDay = scan.headline(A), $memo[0] = o, $memo[1] = scan, $memo[2] = maxWidth.cost, $memo[3] = scanPromise, $memo[4] = i, $memo[5] = dayHasContent, $memo[6] = l, $memo[7] = hasDay, $memo[8] = weekHasContent, $memo[9] = d;
  } else i = $memo[4], dayHasContent = $memo[5], l = $memo[6], hasDay = $memo[7], weekHasContent = $memo[8], d = $memo[9];
  let hasAny;
  if ($memo[10] !== i || $memo[11] !== l || $memo[12] !== hasDay) hasAny = R9.createElement(i, {
    wrap: l
  }, hasDay), $memo[10] = i, $memo[11] = l, $memo[12] = hasDay, $memo[13] = hasAny;else hasAny = $memo[13];
  let m;
  if ($memo[14] !== scan.body) m = R9.createElement(B, {
    paddingLeft: 1
  }, R9.createElement(w, {
    dimColor: true,
    wrap: "wrap"
  }, scan.body)), $memo[14] = scan.body, $memo[15] = m;else m = $memo[15];
  let f;
  if ($memo[16] !== dayHasContent || $memo[17] !== weekHasContent || $memo[18] !== d || $memo[19] !== hasAny || $memo[20] !== m) f = R9.createElement(dayHasContent, {
    flexDirection: weekHasContent,
    width: d
  }, hasAny, m), $memo[16] = dayHasContent, $memo[17] = weekHasContent, $memo[18] = d, $memo[19] = hasAny, $memo[20] = m, $memo[21] = f;else f = $memo[21];
  return f;
}
var QRH,
  R9,
  vBH,
  $uO,
  j_o = 10,
  V_4,
  Wsl = 8,
  Gsl = 28,
  Vsl = 6;
var b_4 = b(() => {
  Je();
  _s();
  $_o();
  wn();
  Ec();
  qs();
  QRH = L(nt(), 1), R9 = L(Te(), 1), vBH = L(Te(), 1), $uO = {
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
  }, V_4 = {
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

export {Ksl as Tal,Rjp as fWp,xjp as AWp,kjp as hWp,q_o as Jyo,Gjn as P8n,Hjp as gWp,Ijp as _Wp,Djp as yWp,UsageBreakdownPanel as TWp,UsageBreakdownLoader as SWp,startUsageScan as bWp,onUsageScanError as Sal,significantBehaviors as O8n,hasAttributionData as L8n,UsageBreakdownContent as EWp,QRH as lDe,R9 as Ps,vBH as yje,$uO as mWp,j_o as Xyo,V_4 as hal,Wsl as gal,Gsl as _al,Vsl as yal,b_4 as bal};
