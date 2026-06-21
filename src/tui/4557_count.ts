// @ts-nocheck
import {z7e as k7e,mf as gf} from "../../vendor/m702.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {formatTokens as gl,formatTokenEstimate as Ire,ps as ds} from "../../vendor/m238.ts";
import {Es as Ss,kte as yte} from "../../vendor/m3926.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {getPublicModelDisplayName as Foe,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Tll as Kil,Sll as zil} from "../../vendor/m4554.ts";
import {Ell as Jil,Cll as Xil} from "../../vendor/m4555.ts";
import {Id as Md,mc} from "../config/0645_maxBytes.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function t5p() {
  let e = reactCompilerRuntime.c(2);
  return null;
}
function Qil(e) {
  let t = new Map();
  for (let r of e) {
    let o = k7e(r.source) + (r.pluginName ? ` (${r.pluginName})` : ""),
      s = t.get(o) || [];
    s.push(r), t.set(o, s);
  }
  for (let [r, o] of t.entries()) t.set(r, o.sort((s, i) => i.tokens - s.tokens));
  let n = new Map();
  for (let r of SOURCE_ORDER) {
    let o = t.get(r);
    if (o) n.set(r, o);
    let s = [...t.keys()].filter(i => i.startsWith(r + " (")).sort();
    for (let i of s) n.set(i, t.get(i));
  }
  for (let [r, o] of t) if (!n.has(r)) n.set(r, o);
  return n;
}
function n8n(e) {
  let t = reactCompilerRuntime.c(9),
    {
      count: n,
      noun: r,
      tokens: o
    } = e,
    s;
  if (t[0] !== n || t[1] !== r) s = En(n, r), t[0] = n, t[1] = r, t[2] = s;else s = t[2];
  let i;
  if (t[3] !== o) i = gl(o), t[3] = o, t[4] = i;else i = t[4];
  let a;
  if (t[5] !== n || t[6] !== s || t[7] !== i) a = React.createElement(Ss, {
    variant: "tree"
  }, React.createElement(Ss.Node, {
    dimColor: true
  }, n, " ", s, " \xB7 ", i, " tokens")), t[5] = n, t[6] = s, t[7] = i, t[8] = a;else a = t[8];
  return a;
}
function iyo(e) {
  let t = reactCompilerRuntime.c(116),
    {
      data: n,
      isRemote: r,
      collapseDetailSections: o
    } = e,
    s = r === undefined ? false : r,
    i = o === undefined ? false : o,
    {
      categories: a,
      totalTokens: l,
      rawMaxTokens: c,
      autocompactSource: u,
      percentage: d,
      gridRows: p,
      model: m,
      memoryFiles: f,
      mcpTools: A,
      deferredBuiltinTools: h,
      systemTools: g,
      systemPromptSections: _,
      agents: y,
      skills: T,
      messageBreakdown: S
    } = n,
    C,
    R,
    k,
    x,
    I,
    H,
    P,
    O,
    D,
    M,
    U,
    $;
  if (t[0] !== y.length || t[1] !== u || t[2] !== a || t[3] !== i || t[4] !== p || t[5] !== s || t[6] !== A || t[7] !== f.length || t[8] !== m || t[9] !== d || t[10] !== c || t[11] !== T?.tokens || t[12] !== _?.length || t[13] !== g || t[14] !== h || t[15] !== l) {
    let ne = h === undefined ? [] : h,
      re = a.filter(renderGridRow),
      oe;
    if (t[28] !== a) oe = a.some(isFreeSpaceCategoryFind), t[28] = a, t[29] = oe;else oe = t[29];
    let ie = oe,
      le = ne.length > 0,
      ce = a.find(isFreeSpaceCategoryFormat);
    if (k = A.length > 0 || y.length > 0 || f.length > 0 || (T?.tokens ?? 0) > 0 || false, R = B, $ = "column", x = 1, t[30] === Symbol.for("react.memo_cache_sentinel")) I = React.createElement(w, {
      bold: true
    }, "Context Usage"), t[30] = I;else I = t[30];
    let me;
    if (t[31] !== p) me = p.map(sumTokens), t[31] = p, t[32] = me;else me = t[32];
    let se;
    if (t[33] !== me) se = React.createElement(B, {
      flexDirection: "column",
      flexShrink: 0
    }, me), t[33] = me, t[34] = se;else se = t[34];
    let ue;
    if (t[35] !== m) ue = Foe(m) && React.createElement(w, null, Foe(m)), t[35] = m, t[36] = ue;else ue = t[36];
    let pe;
    if (t[37] !== m) pe = React.createElement(w, {
      dimColor: true
    }, m), t[37] = m, t[38] = pe;else pe = t[38];
    let de;
    if (t[39] !== l) de = gl(l), t[39] = l, t[40] = de;else de = t[40];
    let _e;
    if (t[41] !== c) _e = gl(c), t[41] = c, t[42] = _e;else _e = t[42];
    let ae;
    if (t[43] !== d || t[44] !== de || t[45] !== _e) ae = React.createElement(w, {
      dimColor: true
    }, de, "/", _e, " tokens (", d, "%)"), t[43] = d, t[44] = de, t[45] = _e, t[46] = ae;else ae = t[46];
    let Ae;
    if (t[47] !== s) Ae = !s && React.createElement(t5p, null), t[47] = s, t[48] = Ae;else Ae = t[48];
    let he, ge;
    if (t[49] === Symbol.for("react.memo_cache_sentinel")) he = React.createElement(w, null, " "), ge = React.createElement(w, {
      dimColor: true,
      italic: true
    }, "Estimated usage by category"), t[49] = he, t[50] = ge;else he = t[49], ge = t[50];
    let Ce;
    if (t[51] !== c) Ce = (ke, We) => {
      let Ye = gl(ke.tokens),
        st = ke.isDeferred ? "N/A" : `${(ke.tokens / c * 100).toFixed(1)}%`,
        Ht = ke.name === o8n,
        qe = ke.name,
        ze = ke.isDeferred ? " " : Ht ? "\u26DD" : "\u26C1";
      return React.createElement(B, {
        key: We
      }, React.createElement(w, {
        color: ke.color
      }, ze), React.createElement(w, null, " ", qe, ": "), React.createElement(w, {
        dimColor: true
      }, Ye, " tokens (", st, ")"));
    }, t[51] = c, t[52] = Ce;else Ce = t[52];
    let xe = re.map(Ce),
      we;
    if (t[53] !== a || t[54] !== c) we = (a.find(isLoadedTool)?.tokens ?? 0) > 0 && React.createElement(B, null, React.createElement(w, {
      dimColor: true
    }, "\u26F6"), React.createElement(w, null, " Free space: "), React.createElement(w, {
      dimColor: true
    }, gl(a.find(isLoadedToolFilter)?.tokens || 0), " ", "(", ((a.find(renderMcpToolNode)?.tokens || 0) / c * 100).toFixed(1), "%)")), t[53] = a, t[54] = c, t[55] = we;else we = t[55];
    let Be = ce && ce.tokens > 0 && React.createElement(B, null, React.createElement(w, {
        color: ce.color
      }, "\u26DD"), React.createElement(w, {
        dimColor: true
      }, " ", ce.name, ": "), React.createElement(w, {
        dimColor: true
      }, gl(ce.tokens), " tokens (", (ce.tokens / c * 100).toFixed(1), "%)")),
      Ke;
    if (t[56] !== ue || t[57] !== pe || t[58] !== ae || t[59] !== Ae || t[60] !== xe || t[61] !== we || t[62] !== Be) Ke = React.createElement(B, {
      flexDirection: "column",
      gap: 0,
      flexShrink: 0
    }, ue, pe, ae, Ae, he, ge, xe, we, Be), t[56] = ue, t[57] = pe, t[58] = ae, t[59] = Ae, t[60] = xe, t[61] = we, t[62] = Be, t[63] = Ke;else Ke = t[63];
    if (t[64] !== se || t[65] !== Ke) H = React.createElement(B, {
      flexDirection: "row",
      gap: 2
    }, se, Ke), t[64] = se, t[65] = Ke, t[66] = H;else H = t[66];
    if (C = B, P = "column", O = -1, t[67] !== u || t[68] !== c) D = u !== "auto" && React.createElement(B, {
      marginTop: 1
    }, React.createElement(w, {
      bold: true
    }, "Auto-compact window: "), React.createElement(w, {
      dimColor: true
    }, u === "experiment" || u === "clientdata" ? `auto (${gl(c)} tokens)` : `${gl(c)} tokens`)), t[67] = u, t[68] = c, t[69] = D;else D = t[69];
    if (t[70] !== i || t[71] !== ie || t[72] !== A) M = A.length > 0 && React.createElement(B, {
      flexDirection: "column",
      marginTop: 1
    }, React.createElement(B, null, React.createElement(w, {
      bold: true
    }, "MCP tools"), React.createElement(w, {
      dimColor: true
    }, " ", "\xB7 /mcp", ie ? " (loaded on-demand)" : "")), i ? React.createElement(n8n, {
      count: A.length,
      noun: "tool",
      tokens: A.filter(ke => !ie || ke.isLoaded).reduce(isUnloadedTool, 0)
    }) : React.createElement(React.Fragment, null, A.some(isUnloadedToolFilter) && React.createElement(B, {
      flexDirection: "column",
      marginTop: 1
    }, React.createElement(w, {
      dimColor: true
    }, "Loaded"), React.createElement(Ss, {
      variant: "tree"
    }, A.filter(renderMcpToolNameNode).map(renderMcpToolNode2))), ie && A.some(sumAgentTokens) && React.createElement(B, {
      flexDirection: "column",
      marginTop: 1
    }, React.createElement(w, {
      dimColor: true
    }, "Available"), React.createElement(Ss, {
      variant: "tree"
    }, A.filter(renderAgentNode).map(renderAgentGroup))), !ie && React.createElement(Ss, {
      variant: "tree"
    }, A.map(sumMemoryTokens)))), t[70] = i, t[71] = ie, t[72] = A, t[73] = M;else M = t[73];
    U = (g && g.length > 0 || le) && false, t[0] = y.length, t[1] = u, t[2] = a, t[3] = i, t[4] = p, t[5] = s, t[6] = A, t[7] = f.length, t[8] = m, t[9] = d, t[10] = c, t[11] = T?.tokens, t[12] = _?.length, t[13] = g, t[14] = h, t[15] = l, t[16] = C, t[17] = R, t[18] = k, t[19] = x, t[20] = I, t[21] = H, t[22] = P, t[23] = O, t[24] = D, t[25] = M, t[26] = U, t[27] = $;
  } else C = t[16], R = t[17], k = t[18], x = t[19], I = t[20], H = t[21], P = t[22], O = t[23], D = t[24], M = t[25], U = t[26], $ = t[27];
  let F;
  if (t[74] !== i || t[75] !== _) F = _ && _.length > 0 && false, t[74] = i, t[75] = _, t[76] = F;else F = t[76];
  let W;
  if (t[77] !== y || t[78] !== i) W = y.length > 0 && React.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, React.createElement(B, null, React.createElement(w, {
    bold: true
  }, "Custom agents"), React.createElement(w, {
    dimColor: true
  }, " \xB7 /agents")), i ? React.createElement(n8n, {
    count: y.length,
    noun: "agent",
    tokens: y.reduce(renderMemoryFileNode, 0)
  }) : Array.from(Qil(y).entries()).map(renderSkillGroup)), t[77] = y, t[78] = i, t[79] = W;else W = t[79];
  let G;
  if (t[80] !== i || t[81] !== f) G = f.length > 0 && React.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, React.createElement(B, null, React.createElement(w, {
    bold: true
  }, "Memory files"), React.createElement(w, {
    dimColor: true
  }, " \xB7 /memory")), i ? React.createElement(n8n, {
    count: f.length,
    noun: "file",
    tokens: f.reduce(ContextUsage, 0)
  }) : React.createElement(Ss, {
    variant: "tree"
  }, f.map(CollapsedSectionSummary))), t[80] = i, t[81] = f, t[82] = G;else G = t[82];
  let K;
  if (t[83] !== i || t[84] !== T) K = T && T.tokens > 0 && React.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, React.createElement(B, null, React.createElement(w, {
    bold: true
  }, "Skills"), React.createElement(w, {
    dimColor: true
  }, " \xB7 /skills")), i ? React.createElement(n8n, {
    count: T.skillFrontmatter.length,
    noun: "skill",
    tokens: T.tokens
  }) : Array.from(Qil(T.skillFrontmatter).entries()).map(HookHolder)), t[83] = i, t[84] = T, t[85] = K;else K = t[85];
  let Q;
  if (t[86] !== S) Q = S && false, t[86] = S, t[87] = Q;else Q = t[87];
  let V;
  if (t[88] !== i || t[89] !== k) V = i && k && React.createElement(B, {
    marginTop: 1
  }, React.createElement(w, {
    dimColor: true
  }, "/context all to expand")), t[88] = i, t[89] = k, t[90] = V;else V = t[90];
  let Y;
  if (t[91] !== C || t[92] !== F || t[93] !== W || t[94] !== G || t[95] !== K || t[96] !== Q || t[97] !== V || t[98] !== P || t[99] !== O || t[100] !== D || t[101] !== M || t[102] !== U) Y = React.createElement(C, {
    flexDirection: P,
    marginLeft: O
  }, D, M, U, F, W, G, K, Q, V), t[91] = C, t[92] = F, t[93] = W, t[94] = G, t[95] = K, t[96] = Q, t[97] = V, t[98] = P, t[99] = O, t[100] = D, t[101] = M, t[102] = U, t[103] = Y;else Y = t[103];
  let J;
  if (t[104] !== n) J = Kil(n), t[104] = n, t[105] = J;else J = t[105];
  let ee;
  if (t[106] !== J) ee = React.createElement(Jil, {
    suggestions: J
  }), t[106] = J, t[107] = ee;else ee = t[107];
  let te;
  if (t[108] !== R || t[109] !== x || t[110] !== I || t[111] !== H || t[112] !== Y || t[113] !== ee || t[114] !== $) te = React.createElement(R, {
    flexDirection: $,
    paddingLeft: x
  }, I, H, Y, ee), t[108] = R, t[109] = x, t[110] = I, t[111] = H, t[112] = Y, t[113] = ee, t[114] = $, t[115] = te;else te = t[115];
  return te;
}
function HookHolder(e) {
  let [t, n] = e;
  return React.createElement(B, {
    key: t,
    flexDirection: "column",
    marginTop: 1
  }, React.createElement(w, {
    dimColor: true
  }, t), React.createElement(Ss, {
    variant: "tree"
  }, n.map(groupBySource)));
}
function groupBySource(entries, t) {
  return React.createElement(Ss.Node, {
    key: t
  }, React.createElement(w, null, entries.name, ":", " ", React.createElement(w, {
    dimColor: true
  }, Ire(entries.tokens), " tokens")));
}
function CollapsedSectionSummary(props, t) {
  return React.createElement(Ss.Node, {
    key: t
  }, React.createElement(w, null, Md(props.path), ":", " ", React.createElement(w, {
    dimColor: true
  }, gl(props.tokens), " tokens")));
}
function ContextUsage(props, t) {
  return props + t.tokens;
}
function renderSkillGroup(entry) {
  let [label, skills] = entry;
  return React.createElement(B, {
    key: label,
    flexDirection: "column",
    marginTop: 1
  }, React.createElement(w, {
    dimColor: true
  }, label), React.createElement(Ss, {
    variant: "tree"
  }, skills.map(renderSkillNode)));
}
function renderSkillNode(skill, index) {
  return React.createElement(Ss.Node, {
    key: index
  }, React.createElement(w, null, skill.agentType, ":", " ", React.createElement(w, {
    dimColor: true
  }, gl(skill.tokens), " tokens")));
}
function renderMemoryFileNode(file, index) {
  return file + index.tokens;
}
function sumMemoryTokens(acc, file) {
  return React.createElement(Ss.Node, {
    key: file
  }, React.createElement(w, null, acc.name, ":", " ", React.createElement(w, {
    dimColor: true
  }, gl(acc.tokens), " tokens")));
}
function renderAgentGroup(entry, t) {
  return React.createElement(Ss.Node, {
    key: t,
    dimColor: true
  }, entry.name);
}
function renderAgentNode(agent) {
  return !agent.isLoaded;
}
function sumAgentTokens(acc) {
  return !acc.isLoaded;
}
function renderMcpToolNode2(tool, index) {
  return React.createElement(Ss.Node, {
    key: index
  }, React.createElement(w, null, tool.name, ":", " ", React.createElement(w, {
    dimColor: true
  }, gl(tool.tokens), " tokens")));
}
function renderMcpToolNameNode(tool) {
  return tool.isLoaded;
}
function isUnloadedToolFilter(tool) {
  return tool.isLoaded;
}
function isUnloadedTool(tool, t) {
  return tool + t.tokens;
}
function renderMcpToolNode(tool) {
  return tool.name === "Free space";
}
function isLoadedToolFilter(tool) {
  return tool.name === "Free space";
}
function isLoadedTool(tool) {
  return tool.name === "Free space";
}
function sumTokens(acc, tool) {
  return React.createElement(B, {
    key: tool,
    flexDirection: "row",
    marginLeft: -1
  }, acc.map(isFreeSpaceCategoryPercent));
}
function isFreeSpaceCategoryPercent(category, t) {
  if (category.categoryName === "Free space") return React.createElement(w, {
    key: t,
    dimColor: true
  }, "\u26F6 ");
  if (category.categoryName === o8n) return React.createElement(w, {
    key: t,
    color: category.color
  }, "\u26DD ");
  return React.createElement(w, {
    key: t,
    color: category.color
  }, category.squareFullness >= 0.7 ? "\u26C1 " : "\u26C0 ");
}
function isFreeSpaceCategoryFormat(category) {
  return category.name === o8n;
}
function isFreeSpaceCategoryFind(category) {
  return category.isDeferred && category.name.includes("MCP");
}
function renderGridRow(row) {
  return row.tokens > 0 && row.name !== "Free space" && row.name !== o8n && !row.isDeferred;
}
var reactCompilerRuntime,
  React,
  o8n = "Autocompact buffer",
  SOURCE_ORDER;
var b64 = b(() => {
  Je();
  zil();
  mc();
  ds();
  Fo();
  gf();
  fr();
  Xil();
  yte();
  reactCompilerRuntime = L(nt(), 1), React = L(Te(), 1);
  SOURCE_ORDER = ["Project", "User", "Managed", "Plugin", "MCP", "Built-in"];
});

export {t5p as $Gp,Qil as vll,n8n as q8n,iyo as pTo,HookHolder as jGp,groupBySource as WGp,CollapsedSectionSummary as GGp,ContextUsage as VGp,renderSkillGroup as KGp,renderSkillNode as zGp,renderMemoryFileNode as YGp,sumMemoryTokens as JGp,renderAgentGroup as XGp,renderAgentNode as QGp,sumAgentTokens as ZGp,renderMcpToolNode2 as eVp,renderMcpToolNameNode as tVp,isUnloadedToolFilter as nVp,isUnloadedTool as rVp,renderMcpToolNode as oVp,isLoadedToolFilter as sVp,isLoadedTool as iVp,sumTokens as aVp,isFreeSpaceCategoryPercent as lVp,isFreeSpaceCategoryFormat as cVp,isFreeSpaceCategoryFind as uVp,renderGridRow as dVp,reactCompilerRuntime as j8n,React as Nr,o8n as W8n,SOURCE_ORDER as qGp,b64 as wll};
