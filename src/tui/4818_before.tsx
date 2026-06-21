// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {truncateToWidth} from "../../vendor/m237.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {F0n,U0n,ast} from "../telemetry/3313_prNumber.ts";
import {NMe,Rn} from "../session/0615_length.ts";
import {formatLogMetadata,ps} from "../../vendor/m238.ts";
import {My,pE} from "../../vendor/m2548.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {useTerminalFocus} from "../../vendor/m2380.ts";
import {useClock} from "../../vendor/m2432.ts";
import {isCustomTitleEnabled,getSessionIdFromLog,getFirstMeaningfulUserMessageTextContent,$6,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {useResolvedTheme} from "../../vendor/m2274.ts";
import {Zfe,E5} from "../config/2288_level.ts";
import {getOriginalCwd,getSessionId,lt} from "../session/0131_sent.ts";
import {oH,gne} from "../../vendor/m4532.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {getBranch,Ba} from "../../vendor/m693.ts";
import {d8,WMe} from "../../vendor/m641.ts";
import {TAe,Wu,lS} from "../../vendor/m2571.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {sSl,iSl} from "../../vendor/m4815.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {qP,uue} from "../config/4532_query.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {tp,_x} from "./3835_mode.ts";
import {ic,Ny} from "../../vendor/m2574.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {lSl,cSl} from "../../vendor/m4816.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {b,M} from "../../runtime.ts";
import {JWn} from "../../vendor/m4770.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
function pSl(e: any, t: any) {
  let n = e.replace(/\s+/g, " ").trim();
  return truncateToWidth(n, t);
}
function vCo({
  before: e,
  match: t,
  after: n
}: any, r: any) {
  return _t.dim(e) + r(t) + _t.dim(n);
}
function crm(e: any) {
  return e.replace(new RegExp(F0n.source + '[^,\\s"]*', "g"), (t: any) => {
    let n = U0n(t);
    return n ? `PR #${n.prNumber} ${n.prRepository}` : t;
  });
}
function urm(e: any, t: any, n: any) {
  let r = e.toLowerCase().indexOf(t.toLowerCase());
  if (r === -1) return null;
  let o = r + t.length,
    s = Math.max(0, r - n),
    i = Math.min(e.length, o + n),
    a = e.slice(s, r),
    l = e.slice(r, o),
    c = e.slice(o, i);
  return {
    before: (s > 0 ? "\u2026" : "") + a.replace(/\s+/g, " ").trimStart(),
    match: l.trim(),
    after: c.replace(/\s+/g, " ").trimEnd() + (i < e.length ? "\u2026" : "")
  };
}
function wCo(e: any, t: any, n: any) {
  let {
      isGroupHeader: r = !1,
      isChild: o = !1,
      forkCount: s = 0
    } = n || {},
    i = r && s > 0 ? rrm : o ? orm : 0,
    a = r && s > 0 ? ` (+${s} other ${s === 1 ? "session" : "sessions"})` : "",
    l = e.isSidechain ? " (sidechain)" : "",
    c = t - i - l.length - a.length;
  return `${pSl(NMe(e), c)}${l}${a}`;
}
function RCo(e: any, t: any) {
  let {
      isChild: n = !1,
      showProjectPath: r = !1
    } = t || {},
    o = n ? "    " : "",
    s = formatLogMetadata(e),
    i = r && e.projectPath ? ` \xB7 ${e.projectPath}` : "";
  return o + s + i;
}
function vGn({
  logs: e,
  maxHeight: t = 1 / 0,
  forceWidth: n,
  onCancel: r,
  onSelect: o,
  onLogsChanged: s,
  onLoadMore: i,
  initialSearchQuery: a,
  isLoading: l = !1,
  reloadGeneration: c = 0,
  showAllProjects: u = !1,
  onToggleAllProjects: d,
  onAgenticSearch: p
}: any) {
  let m = My(mr()),
    f = n === void 0 ? m.columns : n,
    A = xA(r),
    h = useTerminalFocus(),
    g = useClock(),
    _ = isCustomTitleEnabled(),
    y = !1,
    T = useResolvedTheme(),
    S = _s.useMemo(() => (Sn: any) => Zfe(Sn, T.warning), [T.warning]),
    v = !1,
    [R, k] = _s.useState(null),
    [x, H] = _s.useState(!0),
    [I, P] = _s.useState(!1),
    [L, D] = _s.useState(!1),
    [N, O] = _s.useState(null),
    [$, U] = _s.useState(null),
    [W, G] = _s.useState([]),
    [V, Q] = _s.useState(!1),
    K = _s.useMemo(() => getOriginalCwd(), []),
    [Y, J] = _s.useState(""),
    [ee, te] = _s.useState(0),
    [ne, re] = _s.useState(new Set()),
    [oe, ce] = _s.useState(null),
    [ue, ae] = _s.useState(1),
    [he, se] = _s.useState(a ? "search" : "list"),
    [le, pe] = _s.useState(null),
    de = _s.useRef(null),
    [_e, fe] = _s.useState({
      status: "idle"
    }),
    [ie, Ae] = _s.useState(!1),
    ge = _s.useRef(null),
    {
      query: Ce,
      setQuery: xe,
      cursorOffset: Re,
      handleKeyDown: Me,
      handlePaste: Ke
    } = oH({
      isActive: he === "search" && _e.status !== "searching",
      onExit: () => {
        se("list"), logEvent("tengu_session_search_toggled", {
          enabled: !1
        });
      },
      onExitUp: () => {
        se("list"), logEvent("tengu_session_search_toggled", {
          enabled: !1
        });
      },
      passthroughCtrlKeys: e.length === 0 ? ["n", "a"] : ["n"],
      initialQuery: a || ""
    }),
    He = crm(Ce),
    Ge = _s.useDeferredValue(He),
    [Ye, ot] = _s.useState("");
  _s.useEffect(() => {
    if (!Ge) {
      ot("");
      return;
    }
    return g.setTimeout(() => ot(Ge), 300);
  }, [Ge, g]);
  let [vt, $e] = _s.useState(null),
    [Je, Rt] = _s.useState(!1);
  _s.useEffect(() => {
    getBranch().then((Mn: any) => k(Mn));
    let Sn = Date.now();
    d8(K).then((Mn: any) => {
      logEvent("tengu_worktree_detection", {
        duration_ms: Date.now() - Sn,
        worktree_count: Mn.length,
        success: !0
      }), D(Mn.length > 1), G(Mn), O(Mn[0] ?? null);
      let Eo = Mn.filter((wr: any) => K === wr || K.startsWith(wr + Ymt.sep));
      Eo.sort((wr: any, Ot: any) => Ot.length - wr.length), U(Eo[0] ?? null), Q(!0);
    }).catch(() => {
      logEvent("tengu_worktree_detection", {
        duration_ms: Date.now() - Sn,
        worktree_count: 0,
        success: !1
      }), Q(!0);
    });
  }, [K]);
  let Et = _s.useMemo(() => new Map(e.map((Sn: any) => [Sn, prm(Sn)])), [e]),
    dt = _s.useMemo(() => null, [e, Et, !1]),
    Dt = _s.useMemo(() => {
      let Sn = e;
      if (_) Sn = e.filter((Mn: any) => {
        let Eo = getSessionId(),
          wr = getSessionIdFromLog(Mn);
        if (Eo && wr === Eo) return !0;
        if (Mn.customTitle ?? Mn.aiTitle) return !0;
        if (getFirstMeaningfulUserMessageTextContent(Mn.messages)) return !0;
        if (Mn.firstPrompt || Mn.customTitle || Mn.aiTitle) return !0;
        return !1;
      });
      if (!x && R) Sn = Sn.filter((Mn: any) => Mn.gitBranch === R);
      if (L && !I && !u) {
        let Mn = $ ?? K;
        Sn = Sn.filter((Eo: any) => {
          if (Eo.isAlias) return !0;
          let wr = Eo.projectPath;
          if (wr === void 0) return !1;
          let Ot = null;
          for (let jn of W) if (wr === jn || wr.startsWith(jn + Ymt.sep)) {
            if (Ot === null || jn.length > Ot.length) Ot = jn;
          }
          if (Ot === null) return wr === Mn;
          return Ot === Mn;
        });
      }
      return Sn;
    }, [e, _, x, R, L, I, u, K, $, W]),
    $t = _s.useMemo(() => {
      if (!He) return Dt;
      let Sn = He.toLowerCase();
      return Dt.filter((Mn: any) => {
        let Eo = NMe(Mn).toLowerCase(),
          wr = (Mn.gitBranch || "").toLowerCase(),
          Ot = (Mn.tag || "").toLowerCase(),
          jn = Mn.prNumber ? `pr #${Mn.prNumber} ${Mn.prRepository || ""}`.toLowerCase() : "";
        return Eo.includes(Sn) || wr.includes(Sn) || Ot.includes(Sn) || jn.includes(Sn);
      });
    }, [Dt, He]);
  _s.useEffect(() => {}, [Ge, Ye, !1]), _s.useEffect(() => {
    if ($e(null), !Ge) Rt(!1);
    return;
  }, [Ye, Ge, dt, !1, g]);
  let {
      filteredLogs: It,
      snippets: Zt
    } = _s.useMemo(() => {
      let Sn = new Map(),
        Mn = $t;
      if (vt && Ye && vt.query === Ye) {
        for (let jn of vt.results) if (jn.searchableText) {
          let yn = urm(jn.searchableText, Ye, lrm);
          if (yn) Sn.set(jn.log, yn);
        }
        let Eo = new Set(Mn.map((jn: any) => jn.messages[0]?.uuid)),
          wr = new Set(Dt),
          Ot = vt.results.map((jn: any) => jn.log).filter((jn: any) => !Eo.has(jn.messages[0]?.uuid) && wr.has(jn));
        Mn = [...Mn, ...Ot];
      }
      return {
        filteredLogs: Mn,
        snippets: Sn
      };
    }, [$t, vt, Ye, Dt]),
    _n = _s.useMemo(() => {
      if (_e.status === "results" && _e.results.length > 0) {
        let Sn = new Set(Dt);
        return _e.results.filter((Mn: any) => Sn.has(Mn));
      }
      return It;
    }, [_e, It, Dt]),
    Nn = f - 2 * TAe,
    Fn = Math.max(30, Nn - 4),
    Dn = _s.useMemo(() => {
      if (!_) return [];
      let Sn = mrm(_n);
      return Array.from(Sn.entries()).map(([Mn, Eo]: any) => {
        let wr = Eo[0],
          Ot = _n.indexOf(wr),
          jn = Zt.get(wr),
          yn = jn ? vCo(jn, S) : null;
        if (Eo.length === 1) {
          let fr = RCo(wr, {
            showProjectPath: u
          });
          return {
            id: `log:${Mn}:0`,
            value: {
              log: wr,
              indexInFiltered: Ot
            },
            label: wCo(wr, Fn),
            description: yn ? `${fr}
  ${yn}` : fr,
            dimDescription: !0
          };
        }
        let en = Eo.length - 1,
          nt = Eo.slice(1).map((fr: any, is: any) => {
            let cs = _n.indexOf(fr),
              Kr = Zt.get(fr),
              vn = Kr ? vCo(Kr, S) : null,
              Hr = RCo(fr, {
                isChild: !0,
                showProjectPath: u
              });
            return {
              id: `log:${Mn}:${is + 1}`,
              value: {
                log: fr,
                indexInFiltered: cs
              },
              label: wCo(fr, Fn, {
                isChild: !0
              }),
              description: vn ? `${Hr}
      ${vn}` : Hr,
              dimDescription: !0
            };
          }),
          Co = RCo(wr, {
            showProjectPath: u
          });
        return {
          id: `group:${Mn}`,
          value: {
            log: wr,
            indexInFiltered: Ot
          },
          label: wCo(wr, Fn, {
            isGroupHeader: !0,
            forkCount: en
          }),
          description: yn ? `${Co}
  ${yn}` : Co,
          dimDescription: !0,
          children: nt
        };
      });
    }, [_, _n, Fn, u, Zt, S]),
    or = _s.useMemo(() => {
      if (_) return [];
      return _n.map((Sn: any, Mn: any) => {
        let wr = NMe(Sn) + (Sn.isSidechain ? " (sidechain)" : ""),
          Ot = pSl(wr, Fn),
          jn = formatLogMetadata(Sn),
          yn = u && Sn.projectPath ? ` \xB7 ${Sn.projectPath}` : "",
          en = Zt.get(Sn),
          nt = en ? vCo(en, S) : null;
        return {
          label: Ot,
          description: nt ? `${jn}${yn}
  ${nt}` : jn + yn,
          dimDescription: !0,
          value: Mn.toString()
        };
      });
    }, [_, _n, S, Fn, u, Zt]),
    vr = oe?.value.log ?? null,
    Yt = () => {
      if (!_ || !vr) return "";
      let Sn = getSessionIdFromLog(vr);
      if (!Sn) return "";
      let Mn = _n.filter((jn: any) => getSessionIdFromLog(jn) === Sn);
      if (!(Mn.length > 1)) return "";
      let wr = ne.has(Sn);
      if (Mn.indexOf(vr) > 0 || wr) return _s.default.createElement(at, {
        chord: "left",
        action: "collapse"
      });
      return _s.default.createElement(at, {
        chord: "right",
        action: "expand"
      });
    },
    ye = _s.useCallback(async () => {
      let Sn = vr ? getSessionIdFromLog(vr) : void 0;
      if (!vr || !Sn) {
        se("list"), J("");
        return;
      }
      if (Y.trim()) {
        if (await $6(Sn, Y.trim(), vr.fullPath), _ && s) s();
      }
      se("list"), J("");
    }, [vr, Y, s, _]),
    ve = _s.useCallback(() => {
      se("list"), xe(""), logEvent("tengu_session_search_toggled", {
        enabled: !1
      });
    }, [xe]),
    Fe = _s.useCallback(() => {
      se("search"), logEvent("tengu_session_search_toggled", {
        enabled: !0
      });
    }, []),
    We = _s.useCallback(async () => {
      Ce.trim();
      return;
    }, [Ce, p, !1, Dt]);
  _s.useEffect(() => {
    if (c === 0) return;
    ge.current?.abort(), fe((Sn: any) => Sn.status === "idle" ? Sn : {
      status: "idle"
    }), Ae(!1), $e(null);
  }, [c]), _s.useEffect(() => {
    if (_e.status !== "idle" && _e.status !== "searching") {
      if (_e.status === "results" && _e.query !== Ce || _e.status === "error") fe({
        status: "idle"
      });
    }
  }, [Ce, _e]), _s.useEffect(() => () => {
    ge.current?.abort();
  }, []);
  let ft = _s.useRef(_e.status);
  _s.useEffect(() => {
    let Sn = ft.current;
    if (ft.current = _e.status, Sn === "searching" && _e.status === "results") {
      if (_ && Dn.length > 0) ce(Dn[0]);else if (!_ && _n.length > 0) {
        let Mn = _n[0];
        ce({
          id: "0",
          value: {
            log: Mn,
            indexInFiltered: 0
          },
          label: ""
        });
      }
    }
  }, [_e.status, _, Dn, _n]);
  let ke = _s.useCallback((Sn: any) => {
      let Mn = parseInt(Sn, 10),
        Eo = _n[Mn];
      if (!Eo || de.current === Mn.toString()) return;
      de.current = Mn.toString(), ce({
        id: Mn.toString(),
        value: {
          log: Eo,
          indexInFiltered: Mn
        },
        label: ""
      }), ae(Mn + 1);
    }, [_n]),
    pt = _s.useCallback((Sn: any) => {
      ce(Sn);
      let Mn = _n.findIndex((Eo: any) => getSessionIdFromLog(Eo) === getSessionIdFromLog(Sn.value.log));
      if (Mn >= 0) ae(Mn + 1);
    }, [_n]);
  Or("confirm:no", () => {
    ge.current?.abort(), fe({
      status: "idle"
    }), logEvent("tengu_agentic_search_cancelled", {});
  }, {
    context: "Confirmation",
    isActive: he !== "preview" && _e.status === "searching"
  }), Or("confirm:no", () => {
    se("list"), J("");
  }, {
    context: "Settings",
    isActive: he === "rename" && _e.status !== "searching"
  }), Or("confirm:no", () => {
    xe(""), Ae(!1), r?.();
  }, {
    context: "Confirmation",
    isActive: he !== "preview" && he !== "rename" && he !== "search" && ie && _e.status !== "searching"
  });
  function ut(Sn: any) {
    if (he === "preview") return;
    if (_e.status === "searching") return;
    if (he === "rename") ;else if (he === "search") {
      if (Me(Sn), Sn.ctrl && Sn.key === "n") Sn.preventDefault(), ve();else if (Sn.ctrl && Sn.key === "a" && d && e.length === 0) Sn.preventDefault(), d(), logEvent("tengu_session_all_projects_toggled", {
        enabled: u
      });else if (Sn.key === "return" || Sn.key === "down") Ce.trim();
    } else {
      if (ie) {
        if (Sn.key === "return") {
          Sn.preventDefault(), We(), Ae(!1);
          return;
        } else if (Sn.key === "down") {
          if (Sn.preventDefault(), Ae(!1), _n.length === 0) se("search");
          return;
        } else if (Sn.key === "up") {
          Sn.preventDefault(), se("search"), Ae(!1);
          return;
        }
      }
      if (_n.length === 0 && !ie && (Sn.key === "up" || Sn.key === "down" || Sn.key === "return")) {
        Sn.preventDefault(), se("search");
        return;
      }
      let Mn = !Sn.ctrl && !Sn.meta,
        Eo = Sn.key.toLowerCase();
      if (Sn.ctrl && Sn.key === "a" && d) Sn.preventDefault(), d(), logEvent("tengu_session_all_projects_toggled", {
        enabled: u
      });else if (Sn.ctrl && Sn.key === "b") {
        Sn.preventDefault();
        let wr = !x;
        H(wr), logEvent("tengu_session_branch_filter_toggled", {
          enabled: !wr
        });
      } else if (Sn.ctrl && Sn.key === "w" && L) {
        Sn.preventDefault();
        let wr = !I;
        P(wr), logEvent("tengu_session_worktree_filter_toggled", {
          enabled: !wr
        });
      } else if (Eo === "/" && Mn) Sn.preventDefault(), se("search"), Ae(!1), logEvent("tengu_session_search_toggled", {
        enabled: !0
      });else if (Sn.ctrl && Sn.key === "r" && vr) Sn.preventDefault(), se("rename"), J(""), logEvent("tengu_session_rename_started", {});else if ((Sn.key === " " && Mn || Sn.ctrl && Sn.key === "v") && vr && !ie) Sn.preventDefault(), pe(vr), se("preview"), logEvent("tengu_session_preview_opened", {
        messageCount: vr.messageCount
      });else if (Mn && Sn.key.length === 1 && Sn.key !== " ") Sn.preventDefault(), se("search"), Ae(!1), xe(Sn.key), logEvent("tengu_session_search_toggled", {
        enabled: !0
      });
    }
  }
  function Ht(Sn: any) {
    if (he === "search") {
      Ke(Sn);
      return;
    }
    let Mn = (Sn.text.split(/\r\n|\r|\n/, 2)[0] ?? "").trim();
    if (he === "preview" || he === "rename" || _e.status === "searching" || ie || !vr || !Mn) return;
    Sn.preventDefault(), se("search"), xe(Mn), logEvent("tengu_session_search_toggled", {
      enabled: !0
    });
  }
  let Ft = [],
    An = !!d && !u && V,
    sr = N ?? K;
  if (An) Ft.push(Ymt.basename(sr));
  if (!x && R) Ft.push(R);
  if (L && !I && !u) {
    let Sn = $ ?? K;
    if (!(An && sr === Sn)) Ft.push(Ymt.basename(Sn));
  }
  let Pr = !!d && !u && !V,
    nr = (Ft.length > 0 || Pr) && he !== "search",
    io = 8 + (nr ? 1 : 0),
    vs = 2,
    ho = Math.max(1, Math.floor((t - io - vs) / 3));
  if (_s.useEffect(() => {
    if (!i) return;
    let Sn = ho * 2;
    if (ue + Sn >= _n.length) i(ho * 3);
  }, [ue, ho, _n.length, i]), e.length === 0 && !d) return null;
  if (he === "preview" && le && _) return _s.default.createElement(sSl, {
    log: le,
    onExit: () => {
      se("list"), pe(null);
    },
    onSelect: o
  });
  return _s.default.createElement(Box, {
    flexDirection: "column",
    height: t - 1,
    onKeyDown: ut,
    onPaste: Ht
  }, _s.default.createElement(Wu, {
    color: "suggestion"
  }, _s.default.createElement(Box, {
    flexShrink: 0
  }, _s.default.createElement(Text, {
    bold: !0,
    color: "suggestion"
  }, "Resume session", he === "list" && _n.length > ho && _s.default.createElement(Text, {
    dimColor: !0
  }, " ", "(", ue, " of ", _n.length, ")"), l && _s.default.createElement(Text, {
    dimColor: !0
  }, " \xB7 Refreshing\u2026"))), _s.default.createElement(qP, {
    query: Ce,
    isFocused: he === "search",
    isTerminalFocused: h,
    cursorOffset: Re
  }), nr && (Ft.length > 0 ? _s.default.createElement(Box, {
    flexShrink: 0,
    paddingLeft: 2
  }, _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, Ft))) : _s.default.createElement(Box, {
    flexShrink: 0,
    height: 1
  })), _s.default.createElement(Box, {
    flexShrink: 0
  }, _s.default.createElement(Text, null, " ")), _e.status === "searching" && _s.default.createElement(Box, {
    paddingLeft: 1,
    flexShrink: 0
  }, _s.default.createElement(tp, null), _s.default.createElement(Text, null, " Searching\u2026")), _e.status === "results" && _e.results.length > 0 && _s.default.createElement(Box, {
    paddingLeft: 1,
    marginBottom: 1,
    flexShrink: 0
  }, _s.default.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, "Claude found these results:")), _e.status === "results" && _e.results.length === 0 && It.length === 0 && _s.default.createElement(Box, {
    paddingLeft: 1,
    marginBottom: 1,
    flexShrink: 0
  }, _s.default.createElement(ic, null, "No matching sessions found.")), _e.status === "error" && It.length === 0 && _s.default.createElement(Box, {
    paddingLeft: 1,
    marginBottom: 1,
    flexShrink: 0
  }, _s.default.createElement(ic, null, "No matching sessions found.")), he === "search" && Boolean(Ce.trim()) && It.length === 0 && !Je && !l && _e.status === "idle" && _s.default.createElement(Box, {
    paddingLeft: 1,
    marginBottom: 1,
    flexShrink: 0
  }, _s.default.createElement(ic, null, 'No sessions match "', Ce, '".')), Boolean(Ce.trim()) && p && !1, e.length === 0 && he === "list" && _e.status === "idle" && !l && !Ce.trim() && _s.default.createElement(Box, {
    paddingLeft: 1,
    marginBottom: 1,
    flexShrink: 0
  }, _s.default.createElement(ic, {
    hint: u ? void 0 : _s.default.createElement(at, {
      chord: "ctrl+a",
      action: "show all projects",
      format: {
        modCase: "title",
        charCase: "upper"
      }
    })
  }, u ? "No conversations found." : "No conversations found in this project.")), _e.status === "searching" ? null : he === "rename" && vr ? _s.default.createElement(Box, {
    paddingLeft: 2,
    flexDirection: "column"
  }, _s.default.createElement(Text, {
    bold: !0
  }, "Rename session:"), _s.default.createElement(Box, {
    paddingTop: 1
  }, _s.default.createElement(Pa, {
    value: Y,
    onChange: J,
    onSubmit: ye,
    placeholder: NMe(vr, "Enter new session name"),
    columns: Nn - 2,
    cursorOffset: ee,
    onChangeCursorOffset: te,
    showCursor: !0
  }))) : _ ? _s.default.createElement(lSl, {
    nodes: Dn,
    onSelect: (Sn: any) => {
      o(Sn.value.log);
    },
    onFocus: pt,
    onCancel: r,
    focusNodeId: oe?.id,
    visibleOptionCount: ho,
    layout: "expanded",
    isDisabled: he === "search" || ie,
    hideIndexes: !1,
    isNodeExpanded: (Sn: any) => {
      if (he === "search" || !x) return !0;
      let Mn = typeof Sn === "string" && Sn.startsWith("group:") ? Sn.substring(6) : null;
      return Mn ? ne.has(Mn) : !1;
    },
    onExpand: (Sn: any) => {
      let Mn = typeof Sn === "string" && Sn.startsWith("group:") ? Sn.substring(6) : null;
      if (Mn) re((Eo: any) => new Set(Eo).add(Mn)), logEvent("tengu_session_group_expanded", {});
    },
    onCollapse: (Sn: any) => {
      let Mn = typeof Sn === "string" && Sn.startsWith("group:") ? Sn.substring(6) : null;
      if (Mn) re((Eo: any) => {
        let wr = new Set(Eo);
        return wr.delete(Mn), wr;
      });
    },
    onUpFromFirstItem: Fe
  }) : _s.default.createElement(pr, {
    options: or,
    onChange: (Sn: any) => {
      let Mn = parseInt(Sn, 10),
        Eo = _n[Mn];
      if (Eo) o(Eo);
    },
    visibleOptionCount: ho,
    onCancel: r,
    onFocus: ke,
    defaultFocusValue: oe?.id.toString(),
    layout: "expanded",
    isDisabled: he === "search" || ie,
    onUpFromFirstItem: Fe
  }), _s.default.createElement(Box, {
    paddingLeft: 2
  }, A.pending ? _s.default.createElement(Text, {
    dimColor: !0
  }, "Press ", A.keyName, " again to exit") : he === "rename" ? _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, _s.default.createElement(at, {
    chord: "enter",
    action: "save"
  }), _s.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }))) : _e.status === "searching" ? _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, _s.default.createElement(Text, null, "Searching with Claude\u2026"), _s.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }))) : ie ? _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, _s.default.createElement(at, {
    chord: "enter",
    action: "search"
  }), _s.default.createElement(at, {
    chord: "down",
    action: "skip"
  }), _s.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }))) : he === "search" ? _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, _s.default.createElement(Text, null, "Type to Search"), e.length === 0 && d && _s.default.createElement(at, {
    chord: "ctrl+a",
    action: u ? "only show current repo" : "show all projects",
    format: {
      modCase: "title",
      charCase: "upper"
    }
  }), _s.default.createElement(at, {
    chord: "enter",
    action: "select"
  }), _s.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "clear"
  }))) : _s.default.createElement(Text, {
    dimColor: !0
  }, _s.default.createElement(Tn, null, d && _s.default.createElement(at, {
    chord: "ctrl+a",
    action: u ? "only show current repo" : "show all projects",
    format: {
      modCase: "title",
      charCase: "upper"
    }
  }), R && _s.default.createElement(at, {
    chord: "ctrl+b",
    action: x ? "only show current branch" : "show all branches",
    format: {
      modCase: "title",
      charCase: "upper"
    }
  }), L && _s.default.createElement(at, {
    chord: "ctrl+w",
    action: I ? "only show current worktree" : "show all worktrees",
    format: {
      modCase: "title",
      charCase: "upper"
    }
  }), vr && _s.default.createElement(at, {
    chord: "space",
    action: "preview"
  }), vr && _s.default.createElement(at, {
    chord: "ctrl+r",
    action: "rename",
    format: {
      modCase: "title",
      charCase: "upper"
    }
  }), _s.default.createElement(Text, null, "Type to search"), _s.default.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }), Yt())))));
}
function drm(e: any) {
  if (e.type !== "user" && e.type !== "assistant") return "";
  let t = "message" in e ? e.message?.content : void 0;
  if (!t) return "";
  if (typeof t === "string") return t;
  if (Array.isArray(t)) return t.map((n: any) => {
    if (typeof n === "string") return n;
    if ("text" in n && typeof n.text === "string") return n.text;
    return "";
  }).filter(Boolean).join(" ");
  return "";
}
function prm(e: any) {
  let n = (e.messages.length <= srm ? e.messages : [...e.messages.slice(0, uSl), ...e.messages.slice(-uSl)]).map(drm).filter(Boolean).join(" "),
    o = `${[e.customTitle, e.aiTitle, e.summary, e.firstPrompt, e.gitBranch, e.tag, e.prNumber ? `PR #${e.prNumber}` : void 0, e.prRepository].filter(Boolean).join(" ")} ${n}`.trim();
  return o.length > dSl ? o.slice(0, dSl) : o;
}
function mrm(e: any) {
  let t = new Map();
  for (let n of e) {
    let r = getSessionIdFromLog(n);
    if (r) {
      let o = t.get(r);
      if (o) o.push(n);else t.set(r, [n]);
    }
  }
  return t.forEach((n: any) => n.sort((r: any, o: any) => new Date(o.modified).getTime() - new Date(r.modified).getTime())), t;
}
var Ymt: any,
  _s: any,
  rrm = 2,
  orm = 4,
  srm = 2000,
  uSl = 1000,
  dSl = 50000,
  irm = 0.3,
  arm = 60000,
  lrm = 50;
var xCo = b(() => {
  cu();
  JWn();
  lt();
  pE();
  jH();
  gne();
  ki();
  E5();
  ze();
  Ts();
  Ct();
  ast();
  ps();
  WMe();
  Ba();
  Rn();
  ja();
  readRoster();
  Yl();
  zs();
  Ny();
  rs();
  lS();
  uue();
  iSl();
  _x();
  rh();
  cSl();
  Ymt = require("path"), _s = M(Te(), 1);
});
export {pSl,vCo,crm,urm,wCo,RCo,vGn,drm,prm,mrm,Ymt,_s,rrm,orm,srm,uSl,dSl,irm,arm,lrm,xCo};
