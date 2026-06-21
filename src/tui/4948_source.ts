// @ts-nocheck
import {xx as Ex,$P as FP} from "../../vendor/m4515.ts";
import {vwl as rvl,nwo as XCo,Ewl as tvl,Cwl as nvl,rwo as QCo} from "../../vendor/m4938.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {dg as ag,J4 as N4} from "../../vendor/m2570.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {fc,sl as rl} from "../../vendor/m715.ts";
import {CG as aG,wje as oje} from "../../vendor/m4567.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function isNotBuiltIn_LeO(H_2) {
  let t = jO_.c(75),
    {
      source: n,
      agents: r,
      runningByType: o,
      usedThisSession: s,
      onSelect: i,
      onCreateNew: a,
      changes: l
    } = H_2,
    [c, u] = Bq.useState(null),
    [d, p] = Bq.useState(!!a),
    {
      headerFocused: m,
      focusHeader: f
    } = Ex(),
    A;
  if (t[0] !== r || t[1] !== n || t[2] !== s) {
    e: {
      let G = [...r].sort(rvl);
      if (n !== "all" || !s || s.size === 0) {
        A = G;
        break e;
      }
      let K;
      if (t[4] !== s) K = (Q, V) => {
        let Y = s.has(Q.agentType) ? 0 : 1,
          J = s.has(V.agentType) ? 0 : 1;
        return Y - J;
      }, t[4] = s, t[5] = K;else K = t[5];
      A = G.sort(K);
    }
    t[0] = r, t[1] = n, t[2] = s, t[3] = A;
  } else A = t[3];
  let h = A,
    g = m || d ? null : c,
    _;
  if (t[6] !== h || t[7] !== n) {
    e: {
      let G = h.filter(CreateNewAgentRow);
      if (n === "all") {
        _ = XCo.filter(isNotBuiltIn_yeO).flatMap(K => {
          let {
            source: Q
          } = K;
          return G.filter(V => V.source === Q);
        });
        break e;
      }
      _ = G;
    }
    t[6] = h, t[7] = n, t[8] = _;
  } else _ = t[8];
  let y = _,
    {
      rows: T
    } = hr(),
    [S, C] = Bq.useState(0),
    R = Math.max(5, T - 14),
    k;
  if (t[9] !== y) {
    k = new Map();
    for (let G = 0; G < y.length; G++) {
      let K = y[G];
      k.set(`${K.agentType}-${K.source}`, G);
    }
    t[9] = y, t[10] = k;
  } else k = t[10];
  let x = k,
    I;
  if (t[11] !== x || t[12] !== R || t[13] !== S) I = G => {
    let K = x.get(`${G.agentType}-${G.source}`);
    if (K === undefined) return true;
    return K >= S && K < S + R;
  }, t[11] = x, t[12] = R, t[13] = S, t[14] = I;else I = t[14];
  let H = I,
    P = S > 0,
    O = S + R < y.length,
    D;
  if (t[15] !== d || t[16] !== a || t[17] !== y[0] || t[18] !== y.length || t[19] !== c) D = () => {
    if (!c && !d && y.length > 0) if (a) p(true);else u(y[0] || null);
  }, t[15] = d, t[16] = a, t[17] = y[0], t[18] = y.length, t[19] = c, t[20] = D;else D = t[20];
  let M;
  if (t[21] !== d || t[22] !== a || t[23] !== y || t[24] !== c) M = [y, c, d, a], t[21] = d, t[22] = a, t[23] = y, t[24] = c, t[25] = M;else M = t[25];
  Bq.useEffect(D, M);
  let U;
  if (t[26] !== f || t[27] !== m || t[28] !== d || t[29] !== a || t[30] !== i || t[31] !== y || t[32] !== c || t[33] !== R || t[34] !== S) U = G => {
    if (m) return;
    if (G.key === "return") {
      if (G.preventDefault(), d && a) a();else if (c) i(c);
      return;
    }
    if (G.key !== "up" && G.key !== "down") return;
    G.preventDefault();
    let K = !!a,
      Q = y.length + (K ? 1 : 0);
    if (Q === 0) {
      if (G.key === "up") f();
      return;
    }
    let V = 0;
    if (!d && c) {
      let J = y.findIndex(ee => ee.agentType === c.agentType && ee.source === c.source);
      if (J >= 0) V = K ? J + 1 : J;
    }
    if (G.key === "up" && V === 0) {
      f();
      return;
    }
    let Y = G.key === "up" ? V - 1 : Math.min(V + 1, Q - 1);
    if (K && Y === 0) p(true), u(null), C(0);else {
      let J = K ? Y - 1 : Y,
        ee = y[J];
      if (ee) {
        if (p(false), u(ee), J < S) C(J);else if (J >= S + R) C(J - R + 1);
      }
    }
  }, t[26] = f, t[27] = m, t[28] = d, t[29] = a, t[30] = i, t[31] = y, t[32] = c, t[33] = R, t[34] = S, t[35] = U;else U = t[35];
  let $ = U,
    F,
    W;
  if (t[36] !== g || t[37] !== l || t[38] !== $ || t[39] !== P || t[40] !== O || t[41] !== m || t[42] !== H || t[43] !== d || t[44] !== a || t[45] !== o || t[46] !== y.length || t[47] !== h || t[48] !== n || t[49] !== R || t[50] !== S) {
    W = Symbol.for("react.early_return_sentinel");
    e: {
      let G = h.filter(isNotBuiltIn_VeO);
      if (!h.length || n !== "built-in" && !h.some(isBuiltIn_NeO)) {
        let J = !m,
          ee;
        if (t[53] !== m || t[54] !== d || t[55] !== a) ee = a && jO__2.createElement(B, null, jO__2.createElement(AgentListItem, {
          active: d && !m
        })), t[53] = m, t[54] = d, t[55] = a, t[56] = ee;else ee = t[56];
        let te;
        if (t[57] !== a) te = a ? jO__2.createElement(jO__2.Fragment, null, jO__2.createElement(w, {
          dimColor: true
        }, "No agents found. Create specialized subagents that Claude can delegate to."), jO__2.createElement(w, {
          dimColor: true
        }, "Each subagent has its own context window, custom system prompt, and specific tools."), jO__2.createElement(w, {
          dimColor: true
        }, "Try creating: Code Reviewer, Code Simplifier, Security Reviewer, Tech Lead, or UX Reviewer.")) : jO__2.createElement(w, {
          dimColor: true
        }, "No agents found."), t[57] = a, t[58] = te;else te = t[58];
        let ne = n !== "built-in" && G.length > 0 && jO__2.createElement(jO__2.Fragment, null, jO__2.createElement(ag, null), jO__2.createElement(AgentSourceSection, {
            agents: G,
            runningByType: o
          })),
          re;
        if (t[59] !== $ || t[60] !== ee || t[61] !== te || t[62] !== ne || t[63] !== J) re = jO__2.createElement(B, {
          flexDirection: "column",
          gap: 1,
          tabIndex: 0,
          autoFocus: J,
          onKeyDown: $
        }, ee, te, ne), t[59] = $, t[60] = ee, t[61] = te, t[62] = ne, t[63] = J, t[64] = re;else re = t[64];
        W = re;
        break e;
      }
      let Q;
      if (t[65] !== l) Q = l && l.length > 0 && jO__2.createElement(B, {
        marginBottom: 1
      }, jO__2.createElement(w, {
        dimColor: true
      }, l.at(-1))), t[65] = l, t[66] = Q;else Q = t[66];
      let V;
      if (t[67] !== P || t[68] !== m || t[69] !== d || t[70] !== a) V = a && !P && jO__2.createElement(B, {
        marginBottom: 1
      }, jO__2.createElement(AgentListItem, {
        active: d && !m
      })), t[67] = P, t[68] = m, t[69] = d, t[70] = a, t[71] = V;else V = t[71];
      let Y;
      if (t[72] !== P || t[73] !== S) Y = P && jO__2.createElement(B, {
        paddingLeft: 2
      }, jO__2.createElement(w, {
        dimColor: true
      }, jO__2.createElement(w, {
        "aria-hidden": true
      }, Ze.arrowUp, " "), S, " more")), t[72] = P, t[73] = S, t[74] = Y;else Y = t[74];
      F = jO__2.createElement(B, {
        flexDirection: "column",
        tabIndex: 0,
        autoFocus: !m,
        onKeyDown: $
      }, Q, V, Y, n === "all" ? jO__2.createElement(jO__2.Fragment, null, XCo.filter(isNotBuiltIn_keO).map(J => {
        let {
          label: ee,
          source: te
        } = J;
        return jO__2.createElement(AgentList, {
          key: te,
          title: ee,
          agents: h.filter(ne => ne.source === te).filter(H),
          activeSelection: g,
          runningByType: o
        });
      }), O && jO__2.createElement(B, {
        paddingLeft: 2
      }, jO__2.createElement(w, {
        dimColor: true
      }, jO__2.createElement(w, {
        "aria-hidden": true
      }, Ze.arrowDown, " "), y.length - S - R, " ", "more")), !O && G.length > 0 && jO__2.createElement(B, {
        flexDirection: "column",
        marginBottom: 1,
        paddingLeft: 2
      }, jO__2.createElement(w, {
        dimColor: true
      }, jO__2.createElement(w, {
        bold: true
      }, "Built-in agents"), " (always available)"), G.map(J => jO__2.createElement(BuiltInAgentsList, {
        key: `${J.agentType}-${J.source}`,
        agent: J,
        activeSelection: g,
        runningByType: o
      })))) : n === "built-in" ? jO__2.createElement(jO__2.Fragment, null, jO__2.createElement(w, {
        dimColor: true,
        italic: true
      }, "Built-in agents are provided by default and cannot be modified."), jO__2.createElement(B, {
        marginTop: 1,
        flexDirection: "column"
      }, h.map(J => jO__2.createElement(BuiltInAgentsList, {
        key: `${J.agentType}-${J.source}`,
        agent: J,
        activeSelection: g,
        runningByType: o
      })))) : jO__2.createElement(jO__2.Fragment, null, h.filter(isNotBuiltIn_heO).filter(H).map(J => jO__2.createElement(BuiltInAgentsList, {
        key: `${J.agentType}-${J.source}`,
        agent: J,
        activeSelection: g,
        runningByType: o
      })), O && jO__2.createElement(B, {
        paddingLeft: 2
      }, jO__2.createElement(w, {
        dimColor: true
      }, jO__2.createElement(w, {
        "aria-hidden": true
      }, Ze.arrowDown, " "), y.length - S - R, " ", "more")), !O && G.length > 0 && jO__2.createElement(jO__2.Fragment, null, jO__2.createElement(ag, null), jO__2.createElement(AgentSourceSection, {
        agents: G,
        runningByType: o
      }))));
    }
    t[36] = g, t[37] = l, t[38] = $, t[39] = P, t[40] = O, t[41] = m, t[42] = H, t[43] = d, t[44] = a, t[45] = o, t[46] = y.length, t[47] = h, t[48] = n, t[49] = R, t[50] = S, t[51] = F, t[52] = W;
  } else F = t[51], W = t[52];
  if (W !== Symbol.for("react.early_return_sentinel")) return W;
  return F;
}
function isNotBuiltIn_heO(H) {
  return H.source !== "built-in";
}
function isNotBuiltIn_keO(H) {
  return H.source !== "built-in";
}
function isBuiltIn_NeO(H) {
  return H.source !== "built-in";
}
function isNotBuiltIn_VeO(H) {
  return H.source === "built-in";
}
function isNotBuiltIn_yeO(H) {
  return H.source !== "built-in";
}
function CreateNewAgentRow(H) {
  return H.source !== "built-in";
}
function AgentListItem(H) {
  let _ = jO_.c(9),
    {
      active: q
    } = H,
    T = q ? "selected," : "",
    z = q ? "suggestion" : undefined,
    $ = q ? `${Ze.pointer} ` : "  ",
    Y;
  if (_[0] !== T || _[1] !== z || _[2] !== $) Y = jO__2.createElement(w, {
    "aria-label": T,
    color: z
  }, $), _[0] = T, _[1] = z, _[2] = $, _[3] = Y;else Y = _[3];
  let q_2 = q ? "suggestion" : undefined,
    f;
  if (_[4] !== q_2) f = jO__2.createElement(w, {
    color: q_2
  }, "Create new agent"), _[4] = q_2, _[5] = f;else f = _[5];
  let j;
  if (_[6] !== Y || _[7] !== f) j = jO__2.createElement(B, null, Y, f), _[6] = Y, _[7] = f, _[8] = j;else j = _[8];
  return j;
}
function BuiltInAgentsList(H) {
  let __2 = jO_.c(33),
    {
      agent: q,
      activeSelection: K,
      runningByType: o
    } = H,
    O = q.source === "built-in",
    i = !O && K?.agentType === q.agentType && K?.source === q.source,
    T_2 = q.overriddenBy || null,
    l = !!T_2,
    z = O || l,
    u = !O && i ? "suggestion" : undefined,
    d;
  if (__2[0] !== q) d = tvl(q), __2[0] = q, __2[1] = d;else d = __2[1];
  let p = d,
    m;
  if (__2[2] !== q.agentType || __2[3] !== l || __2[4] !== o) m = l ? 0 : o?.get(q.agentType) ?? 0, __2[2] = q.agentType, __2[3] = l, __2[4] = o, __2[5] = m;else m = __2[5];
  let f = m,
    A = i ? "selected," : "",
    h = z && !i,
    g = O ? "" : i ? `${Ze.pointer} ` : "  ",
    _;
  if (__2[6] !== A || __2[7] !== h || __2[8] !== g || __2[9] !== u) _ = jO__2.createElement(w, {
    "aria-label": A,
    dimColor: h,
    color: u
  }, g), __2[6] = A, __2[7] = h, __2[8] = g, __2[9] = u, __2[10] = _;else _ = __2[10];
  let y = z && !i,
    T;
  if (__2[11] !== q.agentType || __2[12] !== y || __2[13] !== u) T = jO__2.createElement(w, {
    dimColor: y,
    color: u
  }, q.agentType), __2[11] = q.agentType, __2[12] = y, __2[13] = u, __2[14] = T;else T = __2[14];
  let S;
  if (__2[15] !== p || __2[16] !== u) S = p && jO__2.createElement(w, {
    dimColor: true,
    color: u
  }, " \xB7 ", p), __2[15] = p, __2[16] = u, __2[17] = S;else S = __2[17];
  let C;
  if (__2[18] !== q.memory || __2[19] !== u) C = q.memory && jO__2.createElement(w, {
    dimColor: true,
    color: u
  }, " \xB7 ", q.memory, " memory"), __2[18] = q.memory, __2[19] = u, __2[20] = C;else C = __2[20];
  let R;
  if (__2[21] !== f) R = f > 0 && jO__2.createElement(w, {
    color: "success"
  }, " ", jO__2.createElement(w, {
    "aria-hidden": true
  }, fc, " "), f, " running"), __2[21] = f, __2[22] = R;else R = __2[22];
  let k;
  if (__2[23] !== i || __2[24] !== T_2) k = T_2 && jO__2.createElement(w, {
    dimColor: !i,
    color: i ? "warning" : undefined
  }, " ", jO__2.createElement(w, {
    "aria-hidden": true
  }, Ze.warning, " "), "shadowed by", " ", nvl(T_2)), __2[23] = i, __2[24] = T_2, __2[25] = k;else k = __2[25];
  let x;
  if (__2[26] !== C || __2[27] !== R || __2[28] !== k || __2[29] !== _ || __2[30] !== T || __2[31] !== S) x = jO__2.createElement(B, null, _, T, S, C, R, k), __2[26] = C, __2[27] = R, __2[28] = k, __2[29] = _, __2[30] = T, __2[31] = S, __2[32] = x;else x = __2[32];
  return x;
}
function AgentSourceSection(H) {
  let _ = jO_.c(8),
    {
      agents: q,
      runningByType: K
    } = H,
    o;
  if (_[0] === Symbol.for("react.memo_cache_sentinel")) o = jO__2.createElement(w, {
    bold: true,
    dimColor: true
  }, "Built-in (always available):"), _[0] = o;else o = _[0];
  let $;
  if (_[1] !== q || _[2] !== K) {
    let a;
    if (_[4] !== K) a = l => jO__2.createElement(BuiltInAgentsList, {
      key: `${l.agentType}-${l.source}`,
      agent: l,
      activeSelection: null,
      runningByType: K
    }), _[4] = K, _[5] = a;else a = _[5];
    $ = q.map(a), _[1] = q, _[2] = K, _[3] = $;
  } else $ = _[3];
  let Y;
  if (_[6] !== $) Y = jO__2.createElement(B, {
    flexDirection: "column",
    marginBottom: 1,
    paddingLeft: 2
  }, o, $), _[6] = $, _[7] = Y;else Y = _[7];
  return Y;
}
function AgentList(H) {
  let _ = jO_.c(18),
    {
      title: q,
      agents: K,
      activeSelection: O,
      runningByType: T
    } = H;
  if (!K.length) return null;
  let i = K[0]?.baseDir,
    X;
  if (_[0] !== q) X = jO__2.createElement(w, {
    bold: true,
    dimColor: true
  }, q), _[0] = q, _[1] = X;else X = _[1];
  let l = i ?? false,
    X_2;
  if (_[2] !== i || _[3] !== l) X_2 = jO__2.createElement(aG, {
    when: l
  }, i), _[2] = i, _[3] = l, _[4] = X_2;else X_2 = _[4];
  let Z;
  if (_[5] !== X || _[6] !== X_2) Z = jO__2.createElement(B, {
    paddingLeft: 2
  }, X, X_2), _[5] = X, _[6] = X_2, _[7] = Z;else Z = _[7];
  let W;
  if (_[8] !== O || _[9] !== K || _[10] !== T) {
    let m;
    if (_[12] !== O || _[13] !== T) m = f => jO__2.createElement(BuiltInAgentsList, {
      key: `${f.agentType}-${f.source}`,
      agent: f,
      activeSelection: O,
      runningByType: T
    }), _[12] = O, _[13] = T, _[14] = m;else m = _[14];
    W = K.map(m), _[8] = O, _[9] = K, _[10] = T, _[11] = W;
  } else W = _[11];
  let p;
  if (_[15] !== Z || _[16] !== W) p = jO__2.createElement(B, {
    flexDirection: "column",
    marginBottom: 1
  }, Z, W), _[15] = Z, _[16] = W, _[17] = p;else p = _[17];
  return p;
}
var jO_, jO__2, Bq;
var fO_ = b(() => {
  pi();
  rl();
  Ii();
  Je();
  QCo();
  oje();
  N4();
  FP();
  jO_ = L(nt(), 1), jO__2 = L(Te(), 1), Bq = L(Te(), 1);
});

export {isNotBuiltIn_LeO as Wwl,isNotBuiltIn_heO as bam,isNotBuiltIn_keO as Eam,isBuiltIn_NeO as Cam,isNotBuiltIn_VeO as vam,isNotBuiltIn_yeO as wam,CreateNewAgentRow as Ram,AgentListItem as qwl,BuiltInAgentsList as g8t,AgentSourceSection as jwl,AgentList as xam,jO_ as Aft,jO__2 as Vo,Bq as fft,fO_ as Gwl};
