// @ts-nocheck
import {getSettingsForSource as An,getSettings_DEPRECATED as $o,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {getPluginInventory as Cwo,Rwo} from "../../vendor/m4714.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {F7n} from "../../vendor/m4701.ts";
import {cS,Rj} from "../../vendor/m3188.ts";
import {TL,dS} from "../config/4460_source.ts";
import {nH,II} from "../../vendor/m3268.ts";
import {Sn,fk,lr} from "../../vendor/m233.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {Lht,eEl,tEl,X7n} from "../../vendor/m4713.ts";
import {zbl,jbl} from "../telemetry/4713_auth.ts";
import {useTerminalFocus as nh} from "../../vendor/m2390.ts";
import {getSettingsSchema as ZS,Dy,SE} from "../../vendor/m2559.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {RH,lne} from "../../vendor/m4558.ts";
import {kht,Hht,G7n,vht,Iht,xht,Obl,DTe,Dht,Pht} from "../../vendor/m4707.ts";
import {SPe,Sue} from "../../vendor/m4678.ts";
import {Or,Oo,ss} from "../../vendor/m2553.ts";
import {getPluginEditableScopes as Tne,mWe} from "../../vendor/m4693.ts";
import {ts,tb,EI,oh} from "../../vendor/m2600.ts";
import {Rxn,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getCommandName as mu} from "../tools/4092_done.ts";
import {d3,a2,wm} from "../../vendor/m707.ts";
import {pm,l1} from "../core/2694_l1.ts";
import {xWt,lEl,vwo} from "../../vendor/m4715.ts";
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {n$,slowOpTracer as pw} from "../telemetry/2606_skill_name.ts";
import {_El,Mht,gEl,yEl} from "../../vendor/m4719.ts";
import {Aht,q7n} from "../../vendor/m4702.ts";
import {vW,DNt,wst} from "../../vendor/m3149.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {loadAllPlugins as BC,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {Uw,rH} from "../config/4461_operation.ts";
import {S9i,eMt,a1} from "../config/2689_withFileTypes.ts";
import {zh,c6} from "../../vendor/m4456.ts";
import {yT,Aee,$O,Hst,kst,V4} from "../../vendor/m3150.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {lwo,L7n} from "../../vendor/m4699.ts";
import {vWt,awo} from "../../vendor/m4698.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {uEl,dEl} from "../../vendor/m4717.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {kPe,gWe,wwo} from "../../vendor/m4716.ts";
import {EO,Pvn,Q8} from "../../vendor/m2594.ts";
import {Oht,Swo} from "../../vendor/m4711.ts";
import {Mae,qO} from "../mcp/3159_scope.ts";
import {TWt,E7n} from "../../vendor/m4685.ts";
import {cWe,S7n} from "./4685_message.ts";
import {bWt,R7n} from "../tools/4688_server.ts";
import {SWt,A7n} from "./4687_tool.ts";
import {aP,aue} from "../config/4552_query.ts";
import {dl,eC,dn} from "../config/0137_namespace.ts";
import {mEl,fEl} from "../../vendor/m4718.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// Module: Plugin & MCP server management TUI (Claude Code v2.1.190).
// Renders the "Manage plugins" settings screen: a searchable, scoped list of
// installed plugins, MCP servers, skills, plus failed/flagged plugins, and the
// detail/configuration sub-views for each. State is driven by Ink hooks and a
// React-compiler-style memo cache (the `t = xwo.c(N)` arrays).

/**
 * Compute the skill-override value to persist for a given skill command.
 *
 * Reads the effective override from project settings (falling back to user
 * settings, then "on"). Returns `undefined` when the requested value `t` equals
 * the current effective value — i.e. nothing needs to be written.
 *
 * @param e Skill command name (key into skillOverrides).
 * @param t Desired override value ("on" / "name-only" / "user-invocable-only" / "off").
 */
function TEl(e, t) {
  let n = An("projectSettings")?.skillOverrides?.[e] ?? An("userSettings")?.skillOverrides?.[e] ?? "on";
  return t === n ? void 0 : t;
}

/** Map an internal scope key to its human-readable section label. */
function msm(e) {
  switch (e) {
    case "flagged":
      return "Flagged";
    case "project":
      return "Project";
    case "local":
      return "Local";
    case "user":
      return "User";
    case "enterprise":
      return "Enterprise";
    case "managed":
      return "Managed";
    case "builtin":
    case "dynamic":
      return "Built-in";
    case "skills":
      return "Skills";
    default:
      return e;
  }
}

/**
 * Sub-component shown inside the plugin details view: lists the components a
 * plugin contributes (commands, agents, hooks, etc.). Loads them asynchronously
 * via Cwo and renders loading / error / empty / populated states.
 */
function fsm(e) {
  let t = xwo.c(11),
    {
      plugin: n,
      marketplace: r
    } = e,
    [o, s] = Zc.useState(null),
    [i, a] = Zc.useState(null),
    l,
    c;
  if (t[0] !== r || t[1] !== n) l = () => {
    let p = !1;
    return Cwo(n, r).then(m => {
      if (!p) s(m);
    }).catch(m => {
      if (!p) a(m instanceof Error ? m.message : "Failed to load components");
    }), () => {
      p = !0;
    };
  }, c = [n, r], t[0] = r, t[1] = n, t[2] = l, t[3] = c;else l = t[2], c = t[3];
  if (Zc.useEffect(l, c), i) {
    let p;
    if (t[4] === Symbol.for("react.memo_cache_sentinel")) p = yr.jsx(v, {
      bold: !0,
      children: "Components:"
    }), t[4] = p;else p = t[4];
    let m;
    if (t[5] !== i) m = yr.jsxs($, {
      flexDirection: "column",
      marginBottom: 1,
      children: [p, yr.jsxs(v, {
        dimColor: !0,
        children: ["Error: ", i]
      })]
    }), t[5] = i, t[6] = m;else m = t[6];
    return m;
  }
  if (!o) return null;
  let u, d;
  if (t[7] !== o) {
    d = Symbol.for("react.early_return_sentinel");
    e: {
      let p = F7n(o);
      if (p.length === 0) {
        d = null;
        break e;
      }
      let m;
      if (t[10] === Symbol.for("react.memo_cache_sentinel")) m = yr.jsx(v, {
        bold: !0,
        children: "Installed components:"
      }), t[10] = m;else m = t[10];
      u = yr.jsxs($, {
        flexDirection: "column",
        marginBottom: 1,
        children: [m, p.map(hsm)]
      });
    }
    t[7] = o, t[8] = u, t[9] = d;
  } else u = t[8], d = t[9];
  if (d !== Symbol.for("react.early_return_sentinel")) return d;
  return u;
}

/** Render one "component type: items" row inside the installed-components list. */
function hsm(e) {
  let [t, n] = e;
  return yr.jsx(cS, {
    children: yr.jsxs(v, {
      dimColor: !0,
      children: [t, ": ", n.join(", ")]
    })
  }, t);
}

/**
 * If the named plugin is sourced from a local path, return a message telling the
 * user it cannot be updated remotely (and where to edit the source). Otherwise null.
 */
async function gsm(e, t) {
  let r = (await TL(t))?.plugins.find(o => o.name === e);
  if (r && typeof r.source === "string") return `Local plugins cannot be updated remotely. To update, modify the source at: ${r.source}`;
  return null;
}

/** Filter out plugins that are pinned/locked (nH) for their `name@marketplace` key. */
function _sm(e) {
  return e.filter(t => {
    let n = t.source.split("@")[1] || "local";
    return !nH(`${t.name}@${n}`);
  });
}

/**
 * Sub-component that renders a labelled, coloured block of plugin diagnostics
 * (errors or warnings) with optional guidance per entry. Renders nothing when
 * there are no entries.
 */
function SEl(e) {
  let t = xwo.c(15),
    {
      entries: n,
      color: r,
      noun: o
    } = e;
  if (n.length === 0) return null;
  let s = n.length,
    i;
  if (t[0] !== n.length || t[1] !== o) i = Sn(n.length, o), t[0] = n.length, t[1] = o, t[2] = i;else i = t[2];
  let a;
  if (t[3] !== r || t[4] !== n.length || t[5] !== i) a = yr.jsxs(v, {
    bold: !0,
    color: r,
    children: [s, " ", i, ":"]
  }), t[3] = r, t[4] = n.length, t[5] = i, t[6] = a;else a = t[6];
  let l;
  if (t[7] !== r || t[8] !== n) {
    let u;
    if (t[10] !== r) u = (d, p) => yr.jsxs($, {
      flexDirection: "column",
      marginLeft: 2,
      children: [yr.jsx(v, {
        color: r,
        children: d.message
      }), d.guidance && yr.jsxs(v, {
        dimColor: !0,
        italic: !0,
        children: [Xe.arrowRight, " ", d.guidance]
      })]
    }, p), t[10] = r, t[11] = u;else u = t[11];
    l = n.map(u), t[7] = r, t[8] = n, t[9] = l;
  } else l = t[9];
  let c;
  if (t[12] !== a || t[13] !== l) c = yr.jsxs($, {
    flexDirection: "column",
    children: [a, l]
  }), t[12] = a, t[13] = l, t[14] = c;else c = t[14];
  return c;
}

/**
 * Main "Manage plugins" screen component.
 *
 * Owns the entire plugin/MCP/skill management flow: building the combined item
 * list (ye), search/filter (Be), keyboard navigation, scrolling viewport (Nt),
 * and a view-state machine (R/w) that switches between the list and the various
 * detail, configuration, confirmation and MCP sub-views.
 *
 * Props:
 *  - setViewState (e): navigate the parent settings menu (e.g. back to "menu").
 *  - setResult (t): emit a one-shot status/result string to the parent.
 *  - onManageComplete (n): callback after a plugin mutation completes.
 *  - onSearchModeChange (r): notify parent when the in-list search box is active.
 *  - targetPlugin (o) / targetMarketplace (s): deep-link a specific plugin on open.
 *  - action (i): deep-link action to auto-trigger ("configure", update, ...).
 *  - commands (a): loaded slash/skill commands, used to build the skills section.
 */
function EEl({
  setViewState: e,
  setResult: t,
  onManageComplete: n,
  onSearchModeChange: r,
  targetPlugin: o,
  targetMarketplace: s,
  action: i,
  commands: a
}) {
  let l = _t(Tt => Tt.mcp.clients),
    c = _t(Tt => Tt.mcp.tools),
    u = _t(Tt => Tt.plugins.errors),
    d = _t(Tt => Tt.plugins.warnings),
    p = Lht(),
    m = zbl(),
    [f, h] = Zc.useState(!1),
    g = () => h(!1),
    _ = nh(),
    T = ZS(),
    y = _r(),
    {
      columns: S
    } = y,
    {
      rows: E
    } = Dy(y),
    [R, w] = Zc.useState("plugin-list"),
    {
      query: H,
      setQuery: k,
      cursorOffset: I,
      setCursorOffset: D,
      handleKeyDown: O,
      handlePaste: L
    } = RH({
      isActive: R === "plugin-list" && f,
      onExit: g,
      onExitUp: g
    }),
    P = f && H !== "";
  Zc.useEffect(() => {
    r(P);
  }, [P, r]), Zc.useEffect(() => () => r(!1), [r]);
  let [M, B] = Zc.useState(null),
    N = Zc.useMemo(() => M ? kht(`${M.plugin.name}@${M.marketplace}`) : null, [M]),
    [F, V] = Zc.useState([]),
    [G, z] = Zc.useState([]),
    [J, K] = Zc.useState(!0),
    [j, X] = Zc.useState(0),
    [ee, te] = Zc.useState(() => new Set()),
    [ne, se] = Zc.useState(new Map()),
    [re, ue] = Zc.useState(!1),
    [le, ce] = Zc.useState(null),
    [Se, ie] = Zc.useState(null),
    [ae, pe] = Zc.useState(0),
    me = Zc.useCallback(Tt => {
      ie(Tt), ue(!1), B(null), w("plugin-list"), pe(Cn => Cn + 1), n();
    }, [n]),
    _e = Zc.useRef(!1),
    de = Zc.useRef(void 0),
    ge = SPe(),
    // Escape / "go back" handler: pops one level of the view-state machine,
    // resetting any sub-view-specific state. From the top level it either warns
    // about pending changes or returns to the parent settings menu.
    Te = Zc.useCallback(() => {
      if (R === "plugin-details") w("plugin-list"), B(null), ce(null);else if (typeof R === "object" && R.type === "failed-plugin-details") w("plugin-list"), ce(null);else if (R === "configuring") w("plugin-details"), on(null);else if (R === "plugin-usage") w("plugin-details");else if (typeof R === "object" && R.type === "plugin-options") me("Plugin enabled. Configuration skipped \u2014 run /reload-plugins to apply.");else if (typeof R === "object" && R.type === "configuring-options") t("Configuration cancelled.");else if (typeof R === "object" && R.type === "flagged-detail") w("plugin-list"), ce(null);else if (typeof R === "object" && R.type === "mcp-detail") w("plugin-list"), ce(null);else if (typeof R === "object" && R.type === "skill-detail") w("plugin-list"), ce(null);else if (typeof R === "object" && R.type === "mcp-tools") w({
        type: "mcp-detail",
        client: R.client
      });else if (typeof R === "object" && R.type === "mcp-tool-detail") w({
        type: "mcp-tools",
        client: R.client
      });else {
        if (ne.size > 0) {
          t("Run /reload-plugins to apply plugin changes.");
          return;
        }
        e({
          type: "menu"
        });
      }
    }, [R, e, ne, t, me]);
  Or("confirm:no", Te, {
    context: "Settings",
    isActive: (R !== "plugin-list" || !f) && R !== "confirm-project-uninstall" && !(typeof R === "object" && R.type === "confirm-data-cleanup")
  });
  let he = Tt => {
      if (Tt.type === "connected") return "connected";
      if (Tt.type === "disabled") return "disabled";
      if (Tt.type === "pending") return "pending";
      if (Tt.type === "needs-auth") return "needs-auth";
      return "failed";
    },
    // Core derived list: flattens installed plugins (G), MCP clients (l), plugin
    // errors (u), flagged plugins (p) and skill commands (a) into a single
    // scope-ordered array of list items, with child MCP servers nested under
    // their owning plugin. Recomputed when any of those inputs change.
    ye = Zc.useMemo(() => {
      let Tt = $o(),
        Cn = new Map();
      for (let wt of l) if (wt.name.startsWith("plugin:")) {
        let xn = wt.name.split(":");
        if (xn.length >= 3) {
          let gt = xn[1],
            to = xn.slice(2).join(":"),
            fr = Cn.get(gt) || [];
          fr.push({
            displayName: to,
            client: wt
          }), Cn.set(gt, fr);
        }
      }
      let $n = [];
      for (let wt of G) {
        let xn = kht(`${wt.plugin.name}@${wt.marketplace}`),
          gt = Hht(xn, wt.plugin.manifest, Tt),
          to = u.filter(Nr => !("orphan" in Nr && Nr.orphan) && ("plugin" in Nr && Nr.plugin === wt.plugin.name || Nr.source === xn || Nr.source.startsWith(`${wt.plugin.name}@`))),
          fr = wt.plugin.isBuiltin ? "builtin" : wt.scope || "user";
        $n.push({
          item: {
            type: "plugin",
            id: xn,
            name: wt.plugin.name,
            displayName: wt.plugin.manifest.displayName,
            description: wt.plugin.manifest.description,
            marketplace: wt.marketplace,
            scope: fr,
            isEnabled: gt,
            errorCount: to.length,
            errors: to,
            plugin: wt.plugin,
            pendingEnable: wt.pendingEnable,
            pendingUpdate: wt.pendingUpdate,
            pendingToggle: ne.get(xn)
          },
          originalScope: fr,
          childMcps: gt ? Cn.get(wt.plugin.name) || [] : []
        });
      }
      let Nn = new Set($n.map(({
          item: wt
        }) => wt.id)),
        cr = new Set($n.map(({
          item: wt
        }) => wt.name)),
        Gr = new Map();
      for (let wt of u) {
        let xn = "orphan" in wt && wt.orphan;
        if (!xn && (Nn.has(wt.source) || "plugin" in wt && typeof wt.plugin === "string" && cr.has(wt.plugin))) continue;
        let gt = xn ? `orphan:${wt.source}` : wt.source,
          to = Gr.get(gt) || [];
        to.push(wt), Gr.set(gt, to);
      }
      let To = Tne(),
        rn = [];
      for (let [wt, xn] of Gr) {
        let gt = wt.startsWith("orphan:") ? wt.slice(7) : wt;
        if (gt in p) continue;
        let to = ts(gt),
          fr = to.name || gt,
          Nr = to.marketplace || "unknown",
          Vn = To.get(gt),
          qn = Vn === "flag" || Vn === void 0 ? "user" : Vn;
        rn.push({
          type: "failed-plugin",
          id: wt,
          name: fr,
          marketplace: Nr,
          scope: qn,
          errorCount: xn.length,
          errors: xn
        });
      }
      let Dn = [],
        Io = Rxn();
      for (let wt of l) {
        if (wt.name === "ide") continue;
        if (wt.name.startsWith("plugin:")) continue;
        Dn.push({
          type: "mcp",
          id: `mcp:${wt.name}`,
          name: wt.name,
          description: void 0,
          scope: wt.config.scope,
          status: he(wt),
          client: wt,
          everConnected: wt.config.type === "claudeai-proxy" ? Io.has(wt.name) : void 0
        });
      }
      let Er = [];
      if (a) {
        let wt = new Set(G.filter(Vn => Vn.marketplace === tb).map(Vn => Vn.plugin.name)),
          xn = Ot().skillUsage ?? {},
          gt = Date.now(),
          to = Tt.skillOverrides ?? {},
          fr = An("policySettings")?.skillOverrides ?? {},
          Nr = An("flagSettings")?.skillOverrides ?? {};
        for (let Vn of a) {
          if (Vn.type !== "prompt" || Vn.loadedFrom !== "skills" && Vn.loadedFrom !== "commands_DEPRECATED") continue;
          let qn = mu(Vn);
          if (wt.has(Vn.name) || wt.has(qn)) continue;
          let ur = fr[Vn.name],
            $r = Nr[Vn.name],
            vo = to[Vn.name] ?? (Vn.unqualifiedName != null ? to[Vn.unqualifiedName] : void 0),
            Lr,
            Xt;
          if (ur) Lr = "policy", Xt = ur;else if ($r) Lr = "flag", Xt = $r;else if (Vn.disableModelInvocation) Lr = "author", Xt = vo === "off" ? "off" : "user-invocable-only";else Xt = vo ?? "on";
          Er.push({
            type: "skill",
            id: `skill:${Vn.source}:${Vn.name}`,
            cmdName: Vn.name,
            name: qn,
            description: Vn.description,
            scope: "skills",
            source: d3(Vn.source),
            override: Xt,
            whenToUse: Vn.whenToUse,
            skillRoot: Vn.skillRoot,
            allowedTools: Vn.allowedTools,
            lockSource: Lr,
            tokenEstimate: pm([Vn.name, Vn.description, Vn.whenToUse].filter(Boolean).join(" ")),
            usage: (() => {
              let kn = xn[Vn.name] ?? (Vn.unqualifiedName ? xn[Vn.unqualifiedName] : void 0);
              return kn ? {
                count: kn.usageCount,
                daysSinceUse: Math.max(0, Math.floor((gt - kn.lastUsedAt) / 86400000))
              } : void 0;
            })()
          });
        }
      }
      // Scope sort priority (lower = earlier section). "flagged" floats to top.
      let Ft = {
          flagged: -1,
          project: 0,
          local: 1,
          user: 2,
          enterprise: 3,
          managed: 4,
          dynamic: 5,
          builtin: 6,
          skills: 7
        },
        Wn = [],
        Pr = new Map();
      for (let {
        item: wt,
        originalScope: xn,
        childMcps: gt
      } of $n) {
        let to = wt.scope;
        if (!Pr.has(to)) Pr.set(to, []);
        Pr.get(to).push(wt);
        for (let {
          displayName: fr,
          client: Nr
        } of gt) {
          let Vn = xn === "builtin" ? "user" : xn;
          if (!Pr.has(Vn)) Pr.set(Vn, []);
          Pr.get(Vn).push({
            type: "mcp",
            id: `mcp:${Nr.name}`,
            name: fr,
            description: void 0,
            scope: Vn,
            status: he(Nr),
            client: Nr,
            indented: !0,
            parentId: wt.id
          });
        }
      }
      for (let wt of Dn) {
        let xn = wt.scope;
        if (!Pr.has(xn)) Pr.set(xn, []);
        Pr.get(xn).push(wt);
      }
      if (Er.length > 0) Pr.set("skills", Er);
      for (let wt of rn) {
        let xn = wt.scope;
        if (!Pr.has(xn)) Pr.set(xn, []);
        Pr.get(xn).push(wt);
      }
      for (let [wt, xn] of Object.entries(p)) {
        let gt = ts(wt),
          to = gt.name || wt,
          fr = gt.marketplace || "unknown";
        if (!Pr.has("flagged")) Pr.set("flagged", []);
        Pr.get("flagged").push({
          type: "flagged-plugin",
          id: wt,
          name: to,
          marketplace: fr,
          scope: "flagged",
          reason: "delisted",
          text: "Removed from marketplace",
          flaggedAt: xn.flaggedAt
        });
      }
      // Emit each scope group in priority order; within a group, plugins (with
      // their indented child MCPs) come first, then standalone MCPs, then skills,
      // each alphabetically sorted.
      let Go = [...Pr.keys()].sort((wt, xn) => (Ft[wt] ?? 99) - (Ft[xn] ?? 99));
      for (let wt of Go) {
        let xn = Pr.get(wt),
          gt = [],
          to = [],
          fr = [],
          Nr = 0;
        while (Nr < xn.length) {
          let Vn = xn[Nr];
          if (Vn.type === "plugin" || Vn.type === "failed-plugin" || Vn.type === "flagged-plugin") {
            let qn = [Vn];
            Nr++;
            let ur = xn[Nr];
            while (ur?.type === "mcp" && ur.indented) qn.push(ur), Nr++, ur = xn[Nr];
            gt.push(qn);
          } else if (Vn.type === "mcp" && !Vn.indented) to.push(Vn), Nr++;else if (Vn.type === "skill") fr.push(Vn), Nr++;else Nr++;
        }
        gt.sort((Vn, qn) => Vn[0].name.localeCompare(qn[0].name)), to.sort((Vn, qn) => Vn.name.localeCompare(qn.name)), fr.sort((Vn, qn) => Vn.name.localeCompare(qn.name));
        for (let Vn of gt) Wn.push(...Vn);
        Wn.push(...to), Wn.push(...fr);
      }
      return Wn;
    }, [G, l, u, ne, p, a, j]),
    we = Zc.useMemo(() => ye.filter(Tt => Tt.type === "flagged-plugin").map(Tt => Tt.id), [ye]);
  Zc.useEffect(() => {
    if (we.length > 0) eEl(we);
  }, [we]);
  let [Oe, We] = Zc.useState(() => new Set((Ot().favoritePlugins ?? []).map(kht))),
    // Toggle a plugin id in/out of the favourites set and persist it.
    Fe = Zc.useCallback(Tt => {
      We(Cn => {
        let $n = new Set(Cn);
        if ($n.has(Tt)) $n.delete(Tt);else $n.add(Tt);
        return hn(Nn => ({
          ...Nn,
          favoritePlugins: [...$n]
        })), $n;
      });
    }, []),
    [ke, Ue] = Zc.useState(!1),
    [Ge, ht] = Zc.useState(() => new Map());
  Zc.useEffect(() => {
    let Tt = !1;
    return xWt().then(Cn => {
      if (Tt || Cn.length === 0) return;
      ht(new Map(Cn.map($n => [kht($n.pluginId), $n.daysSinceLastUse])));
    }), () => {
      Tt = !0;
    };
  }, []);
  // Record a disuse-review telemetry action and clear the disused marker.
  let pt = Zc.useCallback((Tt, Cn) => {
      if (Cn === null || !Ge.has(Cn)) return;
      He("cli_plugin_disuse_review"), W("tengu_plugin_disuse_review_action", {
        action: Le(Tt),
        ...n$(Cn)
      }), ht($n => {
        if (!$n.has(Cn)) return $n;
        let Nn = new Map($n);
        return Nn.delete(Cn), Nn;
      });
    }, [Ge]),
    // The visible, filtered/grouped list derived from `ye` plus search and
    // favourite/disabled/disused filters. This is what the viewport renders.
    Be = Zc.useMemo(() => _El(ye, {
      searchQuery: H,
      favoriteIds: Oe,
      showDisabled: ke,
      disusedDays: Ge,
      keepInPlaceIds: ee
    }), [ye, H, Oe, ke, Ge, ee]),
    // Find the next selectable row index from `Tt`, stepping by `Cn` (+1/-1).
    // `Cn === -1` first clamps the start index to the list bounds.
    dt = Zc.useCallback((Tt, Cn) => {
      let $n = Cn === -1 ? Math.min(Tt, Be.length - 1) : Tt;
      for (let Nn = $n; Nn >= 0 && Nn < Be.length; Nn += Cn) if (Mht(Be[Nn])) return Nn;
      return -1;
    }, [Be]),
    [Dt, rt] = Zc.useState(0),
    ot = Zc.useRef(null);
  Zc.useEffect(() => {
    if (Be.length === 0) return;
    let Tt = ot.current;
    if (Tt) {
      ot.current = null;
      let Cn = Be.findIndex($n => $n.kind === "item" && $n.section === Tt.section && $n.item.id === Tt.id);
      if (Cn === -1) Cn = Be.findIndex($n => $n.kind === "item" && $n.item.id === Tt.id);
      if (Cn !== -1) {
        rt(Cn);
        return;
      }
    }
    if (!Mht(Be[Dt])) {
      let Cn = dt(Dt, 1),
        $n = dt(Dt, -1);
      rt(Cn !== -1 ? Cn : $n !== -1 ? $n : 0);
    }
  }, [Be, Dt, dt]);
  let Ht = T ? Math.max(8, E - 10) : 8,
    zt = Zc.useMemo(() => Math.max(0, Be.findIndex(Mht)), [Be]),
    Nt = Aht({
      totalItems: Be.length,
      selectedIndex: Dt,
      maxVisible: Ht,
      firstSelectableIndex: zt
    }),
    [nn, _n] = Zc.useState(0),
    [Rn, on] = Zc.useState(null),
    [En, Qn] = Zc.useState(!1),
    [pr, Jt] = Zc.useState(!1);
  // Determine whether the selected plugin ships a configurable MCPB bundle,
  // checking the manifest first and falling back to the raw marketplace.json.
  Zc.useEffect(() => {
    if (!M) {
      Jt(!1);
      return;
    }
    async function Tt() {
      let Cn = M.plugin.manifest.mcpServers,
        $n = !1;
      if (Cn) $n = typeof Cn === "string" && vW(Cn) || Array.isArray(Cn) && Cn.some(Nn => typeof Nn === "string" && vW(Nn));
      if (!$n) try {
        let Nn = Iwo.join(M.plugin.path, ".."),
          cr = Iwo.join(Nn, ".claude-plugin", "marketplace.json"),
          Gr = await bEl.readFile(cr, "utf-8"),
          rn = qt(Gr).plugins?.find(Dn => Dn.name === M.plugin.name);
        if (rn?.mcpServers) {
          let Dn = rn.mcpServers;
          $n = typeof Dn === "string" && vW(Dn) || Array.isArray(Dn) && Dn.some(Io => typeof Io === "string" && vW(Io));
        }
      } catch (Nn) {
        A(`Failed to read raw marketplace.json: ${Nn}`);
      }
      Jt($n);
    }
    Tt();
  }, [M]), Zc.useEffect(() => {
    // (Re)load the installed-plugins data, grouped by marketplace, whenever the
    // refresh counter `ae` bumps. Builds both the marketplace summaries (F/V) and
    // the flat installed-plugin list (G/z).
    let Tt = ae > 0;
    async function Cn() {
      if (!Tt) K(!0);
      try {
        let {
            enabled: $n,
            disabled: Nn
          } = await BC(),
          cr = $o(),
          Gr = _sm([...$n, ...Nn]),
          To = {};
        for (let Io of Gr) {
          let Er = Io.source.split("@")[1] || "local";
          if (!To[Er]) To[Er] = [];
          To[Er].push(Io);
        }
        let rn = [];
        for (let [Io, Er] of Object.entries(To)) {
          let Ft = zn(Er, Pr => {
              let Go = kht(`${Pr.name}@${Io}`);
              return Hht(Go, Pr.manifest, cr);
            }),
            Wn = Er.length - Ft;
          rn.push({
            name: Io,
            installedPlugins: Er,
            enabledCount: Ft,
            disabledCount: Wn
          });
        }
        rn.sort((Io, Er) => {
          if (Io.name === "claude-plugin-directory") return -1;
          if (Er.name === "claude-plugin-directory") return 1;
          return Io.name.localeCompare(Er.name);
        }), V(rn);
        let Dn = [];
        for (let Io of rn) for (let Er of Io.installedPlugins) {
          let Ft = Er.isBuiltin ? "builtin" : Er.scope ?? G7n(Er.source).scope;
          Dn.push({
            plugin: Er,
            marketplace: Io.name,
            scope: Ft,
            pendingEnable: void 0,
            pendingUpdate: !1
          });
        }
        if (z(Dn), !Tt) rt(0);
      } finally {
        K(!1);
      }
    }
    Cn();
  }, [ae]), Zc.useEffect(() => {
    // One-shot deep-link: if opened targeting a specific plugin, locate it once
    // the data is loaded and jump straight into its detail view (auto-running the
    // requested action), or into the failed-plugin view, or report "not installed".
    if (_e.current) return;
    if (o && F.length > 0 && !J) {
      let {
          name: Tt,
          marketplace: Cn
        } = ts(o),
        $n = s ?? Cn,
        Nn = $n ? F.filter(Gr => Gr.name === $n) : F;
      for (let Gr of Nn) {
        let To = Gr.installedPlugins.find(rn => rn.name === Tt);
        if (To) {
          let rn = To.scope ?? G7n(To.source).scope,
            Dn = {
              plugin: To,
              marketplace: Gr.name,
              scope: rn,
              pendingEnable: void 0,
              pendingUpdate: !1
            };
          B(Dn), w("plugin-details"), de.current = i, _e.current = !0;
          return;
        }
      }
      let cr = ye.find(Gr => Gr.type === "failed-plugin" && Gr.name === Tt);
      if (cr && cr.type === "failed-plugin") w({
        type: "failed-plugin-details",
        plugin: {
          id: cr.id,
          name: cr.name,
          marketplace: cr.marketplace,
          errors: cr.errors,
          scope: cr.scope
        }
      }), _e.current = !0;
      if (!_e.current && i) _e.current = !0, t(`Plugin "${o}" is not installed in this project`);
    }
  }, [o, s, F, J, ye, i, t]);
  // Perform a lifecycle action (enable / disable / uninstall / update) on the
  // currently-selected plugin `M`, including the various confirmation gates
  // (project uninstall, data cleanup) and post-action messaging.
  let Ee = async Tt => {
      if (!M) return;
      let Cn = M.scope || "user",
        $n = Cn === "builtin";
      if ($n && (Tt === "update" || Tt === "uninstall")) {
        ce("Built-in plugins cannot be updated or uninstalled.");
        return;
      }
      if (!$n && !vht(Cn) && Tt !== "update") {
        ce("This plugin is managed by your organization. Contact your admin to disable it.");
        return;
      }
      ue(!0), ce(null);
      try {
        let Nn = N,
          cr;
        switch (Tt) {
          case "enable":
            {
              let Er = await Iht(Nn);
              if (!Er.success) throw Error(Er.message);
              break;
            }
          case "disable":
            {
              let Er = await xht(Nn);
              if (!Er.success) throw Error(Er.message);
              cr = Er.reverseDependents;
              break;
            }
          case "uninstall":
            {
              if ($n) break;
              if (!vht(Cn)) break;
              if (Obl(Nn)) {
                ue(!1), w("confirm-project-uninstall");
                return;
              }
              let Er = Uw().plugins[Nn],
                Wn = !Er || Er.length <= 1 ? await S9i(Nn) : null;
              if (Wn) {
                ue(!1), w({
                  type: "confirm-data-cleanup",
                  size: Wn
                });
                return;
              }
              let Pr = await DTe(Nn, Cn);
              if (!Pr.success) throw Error(Pr.message);
              cr = Pr.reverseDependents;
              break;
            }
          case "update":
            {
              if ($n) break;
              let Er = await Dht(Nn, Cn);
              if (!Er.success) throw Error(Er.message);
              if (Er.alreadyUpToDate || Er.skipped) {
                t(Er.message), await n(), e({
                  type: "menu"
                });
                return;
              }
              break;
            }
        }
        if (zh(), Tt === "disable" || Tt === "uninstall") pt(Tt, N);
        let To = $o()?.enabledPlugins?.[N] !== !1;
        if (Tt !== "uninstall" && Tt !== "update" && To) {
          ue(!1), w({
            type: "plugin-options"
          });
          return;
        }
        let rn = Tt === "enable" ? "Enabled" : Tt === "disable" ? "Disabled" : Tt === "update" ? "Updated" : "Uninstalled",
          Dn = cr && cr.length > 0 ? ` \xB7 required by ${cr.join(", ")}` : "",
          Io = `${Xe.tick} ${rn} ${yT(M.plugin)}${Dn}. Run /reload-plugins to apply.`;
        if (Tt === "update") t(Io), await n(), e({
          type: "menu"
        });else me(Io);
      } catch (Nn) {
        ue(!1);
        let cr = Nn instanceof Error ? Nn.message : String(Nn);
        ce(`Failed to ${Tt}: ${cr}`), A(`Failed to ${Tt} plugin: ${cr}`, {
          level: "error"
        });
      }
    },
    Re = Zc.useRef(Ee);
  // Keep the action ref current, and when navigating into the details view with a
  // pending deep-linked action, dispatch it (special-casing "configure").
  Re.current = Ee, Zc.useEffect(() => {
    if (R === "plugin-details" && M && de.current) {
      let Tt = de.current;
      if (de.current = void 0, Tt === "configure") {
        let Cn = M.plugin.manifest.userConfig;
        if (Cn && Object.keys(Cn).length > 0) w({
          type: "configuring-options",
          schema: Cn
        });else t(`Plugin "${Aee(M.plugin)}" declares no userConfig options.`);
        return;
      }
      Re.current(Tt);
    }
  }, [R, M, t]);
  // Space/toggle handler on the list: flips a plugin enabled/disabled (queuing a
  // pending toggle for non-builtin user-scoped plugins), opens an MCP, or cycles a
  // skill override.
  let Ke = Zc.useCallback(() => {
      let Tt = Be[Dt];
      if (!Mht(Tt)) return;
      if (Tt.kind === "disabled-header") {
        Ue($n => !$n);
        return;
      }
      let Cn = Tt.item;
      if (Cn.type === "flagged-plugin") return;
      if (Cn.type === "plugin") {
        let $n = Cn.id,
          Nn = $o(),
          cr = ne.get($n),
          Gr = Hht($n, Cn.plugin.manifest, Nn),
          To = Cn.scope;
        if (To === "builtin" || vht(To)) {
          let Dn = new Map(ne);
          if (cr) Dn.delete($n), ce(null), (async () => {
            try {
              let Io = cr === "will-disable" ? await Iht($n) : await xht($n);
              if (!Io.success && !Io.alreadyInGoalState) {
                se(Er => {
                  let Ft = new Map(Er);
                  return Ft.set($n, cr), Ft;
                }), ce(Io.message);
                return;
              }
              zh();
            } catch (Io) {
              Ie(Io);
            }
          })();else Dn.set($n, Gr ? "will-disable" : "will-enable"), ce(null), (async () => {
            try {
              let Io = Gr ? await xht($n) : await Iht($n);
              if (!Io.success) {
                se(Er => {
                  let Ft = new Map(Er);
                  return Ft.delete($n), Ft;
                }), ce(Io.message);
                return;
              }
              if (zh(), Gr) pt("disable", $n);
            } catch (Io) {
              Ie(Io);
            }
          })();
          se(Dn);
        }
      } else if (Cn.type === "mcp") ge(Cn.client.name);else if (Cn.type === "skill") {
        let $n = gEl(Cn.override, Cn.lockSource);
        if ($n === Cn.override) return;
        te(cr => new Set(cr).add(Cn.id));
        let {
          error: Nn
        } = ao("localSettings", {
          skillOverrides: {
            [Cn.cmdName]: TEl(Cn.cmdName, $n)
          }
        });
        if (Nn) {
          ce(Nn.message);
          return;
        }
        X(cr => cr + 1);
      }
    }, [Dt, Be, ne, G, ge, pt]),
    // Enter/accept handler on the list: opens the appropriate detail view for the
    // selected item (plugin, flagged, failed, MCP or skill).
    Je = Zc.useCallback(() => {
      let Tt = Be[Dt];
      if (!Mht(Tt)) return;
      if (Tt.kind === "disabled-header") {
        Ue($n => !$n);
        return;
      }
      let Cn = Tt.item;
      if (Cn.type === "plugin") {
        let $n = G.find(Nn => Nn.plugin.name === Cn.plugin.name && Nn.marketplace === Cn.marketplace);
        if ($n) B($n), w("plugin-details"), _n(0), ce(null), ie(null);
      } else if (Cn.type === "flagged-plugin") w({
        type: "flagged-detail",
        plugin: {
          id: Cn.id,
          name: Cn.name,
          marketplace: Cn.marketplace,
          reason: Cn.reason,
          text: Cn.text,
          flaggedAt: Cn.flaggedAt
        }
      }), ce(null);else if (Cn.type === "failed-plugin") w({
        type: "failed-plugin-details",
        plugin: {
          id: Cn.id,
          name: Cn.name,
          marketplace: Cn.marketplace,
          errors: Cn.errors,
          scope: Cn.scope
        }
      }), _n(0), ce(null);else if (Cn.type === "mcp") w({
        type: "mcp-detail",
        client: Cn.client
      }), ce(null);else if (Cn.type === "skill") w({
        type: "skill-detail",
        skill: Cn
      }), ce(null);
    }, [Dt, Be, G]);
  Oo({
    "select:previous": () => {
      let Tt = dt(Dt - 1, -1);
      if (Tt === -1) {
        if (!J && ye.length > 0) h(!0);
      } else Nt.handleSelectionChange(Tt, rt);
    },
    "select:next": () => {
      let Tt = dt(Dt + 1, 1);
      if (Tt !== -1) Nt.handleSelectionChange(Tt, rt);
    },
    "select:accept": Je
  }, {
    context: "Select",
    isActive: R === "plugin-list" && !f
  });
  // Favourite-toggle keybinding handler: remembers the current row so selection
  // can follow it after the list re-sorts, then toggles its favourite state.
  let Rt = Zc.useCallback(() => {
    let Tt = Be[Dt];
    if (Tt?.kind !== "item") return !1;
    ot.current = {
      section: Tt.section,
      id: Tt.item.id
    }, Fe(Tt.item.id);
  }, [Be, Dt, Fe]);
  Oo({
    "plugin:toggle": Ke,
    "plugin:favorite": Rt
  }, {
    context: "Plugin",
    isActive: R === "plugin-list" && !f
  });
  // Dismiss a flagged plugin from its detail view and return to the list.
  let vt = Zc.useCallback(() => {
    if (typeof R !== "object" || R.type !== "flagged-detail") return;
    tEl(R.plugin.id), w("plugin-list");
  }, [R]);
  Oo({
    "select:accept": vt
  }, {
    context: "Select",
    isActive: typeof R === "object" && R.type === "flagged-detail"
  });
  // Build the action menu shown in the plugin-details view (enable/disable,
  // favourite, mark-for-update, configure, update now, uninstall, homepage, etc.),
  // omitting irrelevant actions for built-in/directory-loaded plugins.
  let Et = Zc.useMemo(() => {
    if (R !== "plugin-details" || !M) return [];
    let Tt = $o(),
      Cn = N,
      $n = Hht(Cn, M.plugin.manifest, Tt),
      Nn = M.marketplace === "builtin",
      cr = EI(M.marketplace),
      Gr = [];
    if (Gr.push({
      label: $n ? "Disable plugin" : "Enable plugin",
      action: () => void Ee($n ? "disable" : "enable")
    }), Gr.push({
      label: Oe.has(Cn) ? "Remove from favorites" : "Add to favorites",
      action: () => Fe(Cn)
    }), !Nn && !cr) {
      if (Gr.push({
        label: M.pendingUpdate ? "Unmark for update" : "Mark for update",
        action: async () => {
          try {
            let To = await gsm(M.plugin.name, M.marketplace);
            if (To) {
              ce(To);
              return;
            }
            let rn = [...G],
              Dn = rn.findIndex(Io => Io.plugin.name === M.plugin.name && Io.marketplace === M.marketplace);
            if (Dn !== -1) rn[Dn].pendingUpdate = !M.pendingUpdate, z(rn), B({
              ...M,
              pendingUpdate: !M.pendingUpdate
            });
          } catch (To) {
            ce(To instanceof Error ? To.message : "Failed to check plugin update availability");
          }
        }
      }), pr) Gr.push({
        label: "Configure",
        action: async () => {
          Qn(!0);
          try {
            let To = M.plugin.manifest.mcpServers,
              rn = null;
            if (typeof To === "string" && vW(To)) rn = To;else if (Array.isArray(To)) {
              for (let Er of To) if (typeof Er === "string" && vW(Er)) {
                rn = Er;
                break;
              }
            }
            if (!rn) {
              ce("No MCPB file found in plugin"), Qn(!1);
              return;
            }
            let Dn = N,
              Io = await DNt(rn, M.plugin.path, Dn, void 0, void 0, !0);
            if ("status" in Io && Io.status === "needs-config") on(Io), w("configuring");else ce("Failed to load MCPB for configuration");
          } catch (To) {
            let rn = Ce(To);
            ce(`Failed to load configuration: ${rn}`);
          } finally {
            Qn(!1);
          }
        }
      });
      if (M.plugin.manifest.userConfig && Object.keys(M.plugin.manifest.userConfig).length > 0) Gr.push({
        label: "Configure options",
        action: () => {
          w({
            type: "configuring-options",
            schema: M.plugin.manifest.userConfig
          });
        }
      });
      Gr.push({
        label: "Update now",
        action: () => void Ee("update")
      }), Gr.push({
        label: "Uninstall",
        action: () => void Ee("uninstall")
      });
    }
    if (M.plugin.manifest.homepage) Gr.push({
      label: "Open homepage",
      action: () => void Zl(M.plugin.manifest.homepage)
    });
    if (M.plugin.manifest.repository) Gr.push({
      label: "View repository",
      action: () => void Zl(M.plugin.manifest.repository)
    });
    return Gr.push({
      label: "Back to plugin list",
      action: () => {
        w("plugin-list"), B(null), ce(null);
      }
    }), Gr;
  }, [R, M, pr, G, Oe, Fe]);
  Oo({
    "select:previous": () => {
      if (nn > 0) _n(nn - 1);
    },
    "select:next": () => {
      if (nn < Et.length - 1) _n(nn + 1);
    },
    "select:accept": () => {
      if (Et[nn]) Et[nn].action();
    }
  }, {
    context: "Select",
    isActive: R === "plugin-details" && !!M
  }), Oo({
    // Accept on the failed-plugin-details view: remove the broken plugin, falling
    // back to clearing its enabledPlugins entries across all settings scopes.
    "select:accept": () => {
      if (typeof R === "object" && R.type === "failed-plugin-details") (async () => {
        ue(!0), ce(null);
        let Tt = R.plugin.id,
          Cn = R.plugin.scope,
          $n = vht(Cn) ? await DTe(Tt, Cn, !1) : await DTe(Tt, "user", !1),
          Nn = $n.success;
        if (!Nn) {
          for (let cr of a2) {
            let Gr = An(cr);
            if (Gr?.enabledPlugins?.[Tt] !== void 0) ao(cr, {
              enabledPlugins: {
                ...Gr.enabledPlugins,
                [Tt]: void 0
              }
            }), Nn = !0;
          }
          zh();
        }
        if (Nn) await n(), ue(!1), w("plugin-list");else ue(!1), ce($n.message);
      })();
    }
  }, {
    context: "Select",
    isActive: typeof R === "object" && R.type === "failed-plugin-details" && R.plugin.scope !== "managed" && !EI(R.plugin.marketplace)
  }), Oo({
    // Confirm-project-uninstall: instead of uninstalling a team-shared plugin,
    // disable it locally in .claude/settings.local.json.
    "confirm:yes": () => {
      if (!M) return;
      ue(!0), ce(null);
      let Tt = N,
        {
          error: Cn
        } = ao("localSettings", {
          enabledPlugins: {
            ...An("localSettings")?.enabledPlugins,
            [Tt]: !1
          }
        });
      if (Cn) {
        ue(!1), ce(`Failed to write settings: ${Cn.message}`);
        return;
      }
      zh(), pt("disable", Tt), me(`${Xe.tick} Disabled ${yT(M.plugin)} in .claude/settings.local.json. Run /reload-plugins to apply.`);
    },
    "confirm:no": () => {
      w("plugin-details"), ce(null);
    }
  }, {
    context: "Confirmation",
    isActive: R === "confirm-project-uninstall" && !!M && !re
  });
  // Key handler for the confirm-data-cleanup view: y deletes plugin + data,
  // n keeps data, escape cancels back to details.
  function Ze(Tt) {
    if (Tt.ctrl || Tt.meta || re) return;
    if (!M) return;
    let Cn = N,
      $n = M.scope;
    if (!$n || $n === "builtin" || !vht($n)) return;
    let Nn = async cr => {
      ue(!0), ce(null);
      try {
        let Gr = await DTe(Cn, $n, cr);
        if (!Gr.success) throw Error(Gr.message);
        zh(), pt("uninstall", Cn);
        let To = cr ? "" : " \xB7 data preserved";
        me(`${Xe.tick} ${Gr.message}${To}`);
      } catch (Gr) {
        ue(!1), ce(Gr instanceof Error ? Gr.message : String(Gr));
      }
    };
    if (Tt.key === "y" || Tt.key === "Y") Tt.preventDefault(), Nn(!0);else if (Tt.key === "n" || Tt.key === "N") Tt.preventDefault(), Nn(!1);else if (Tt.key === "escape") Tt.preventDefault(), w("plugin-details"), ce(null);
  }
  Zc.useEffect(() => {
    rt(0);
  }, [H]);
  // List-level key handler: forwards to the search box when focused, otherwise
  // any printable key opens the search box pre-seeded with that character.
  function Gt(Tt) {
    if (f) {
      O(Tt);
      return;
    }
    if (Tt.ctrl || Tt.meta) return;
    if (Tt.key === "/") Tt.preventDefault(), h(!0), k(""), rt(0);else if (Tt.key.length === 1 && Tt.key !== " ") Tt.preventDefault(), h(!0), k(Tt.key), rt(0);
  }
  // Paste handler: when not searching, the first pasted line seeds the search box.
  function en(Tt) {
    if (f) {
      L(Tt);
      return;
    }
    let Cn = (Tt.text.split(/\r\n|\r|\n/, 2)[0] ?? "").trim();
    if (!Cn) return;
    Tt.preventDefault(), h(!0), k(Cn), rt(0);
  }
  if (J) return yr.jsx(v, {
    children: "Loading installed plugins\u2026"
  });
  if (ye.length === 0) return yr.jsxs($, {
    flexDirection: "column",
    children: [yr.jsx($, {
      marginBottom: 1,
      children: yr.jsx(v, {
        bold: !0,
        children: "Manage plugins"
      })
    }), Se && yr.jsx($, {
      marginBottom: 1,
      paddingLeft: 2,
      children: yr.jsx(v, {
        color: "success",
        children: Se
      })
    }), yr.jsx(wl, {
      children: "No plugins or MCP servers installed."
    }), yr.jsx($, {
      marginTop: 1,
      children: yr.jsx(v, {
        dimColor: !0,
        children: yr.jsx(dr, {
          action: "confirm:no",
          context: "Settings",
          fallback: "Esc",
          description: "go back"
        })
      })
    })]
  });
  // View: plugin-options (post-enable configuration prompt).
  if (typeof R === "object" && R.type === "plugin-options" && M) {
    let Tt = N;
    return yr.jsx(lwo, {
      plugin: M.plugin,
      pluginId: Tt,
      onDone: (Cn, $n, Nn) => {
        let cr = yT(M.plugin);
        switch (Cn) {
          case "configured":
          case "skipped":
            me(Cn === "configured" && Nn ? `${Xe.tick} Enabled and configured ${cr}. Run /reload-plugins to apply.` : `${Xe.tick} Enabled ${cr}. Run /reload-plugins to apply.`);
            break;
          case "error":
            ce(`Failed to save configuration: ${$n}`), ue(!1), pe(Gr => Gr + 1), w("plugin-details"), n();
            break;
        }
      }
    });
  }
  // View: configuring-options (edit userConfig values from the manifest schema).
  if (typeof R === "object" && R.type === "configuring-options" && M) {
    let Tt = N;
    return yr.jsx(vWt, {
      title: `Configure ${yT(M.plugin)}`,
      subtitle: "Plugin options",
      configSchema: R.schema,
      initialValues: $O(Tt),
      onSave: async Cn => {
        try {
          await Hst(Tt, Cn, R.schema), zh();
          let $n = Object.keys(Cn).length > 0;
          if ($n) n();
          t($n ? "Configuration saved. Run /reload-plugins for changes to take effect." : "No configuration changes.");
        } catch ($n) {
          ce(`Failed to save configuration: ${Ce($n)}`);
        }
        w("plugin-details");
      },
      onCancel: () => w("plugin-details")
    });
  }
  // View: configuring (MCPB bundle configuration with discovered config schema).
  if (R === "configuring" && Rn && M) {
    let $n = function () {
        on(null), w("plugin-details");
      },
      Tt = N;
    async function Cn(Nn) {
      if (!Rn || !M) return;
      try {
        let cr = M.plugin.manifest.mcpServers,
          Gr = null;
        if (typeof cr === "string" && vW(cr)) Gr = cr;else if (Array.isArray(cr)) {
          for (let To of cr) if (typeof To === "string" && vW(To)) {
            Gr = To;
            break;
          }
        }
        if (!Gr) {
          ce("No MCPB file found"), w("plugin-details");
          return;
        }
        await DNt(Gr, M.plugin.path, Tt, void 0, Nn), ce(null), on(null), w("plugin-details"), t("Configuration saved. Run /reload-plugins for changes to take effect.");
      } catch (cr) {
        let Gr = Ce(cr);
        ce(`Failed to save configuration: ${Gr}`), w("plugin-details");
      }
    }
    return yr.jsx(vWt, {
      title: `Configure ${kst(Rn.manifest.display_name) ?? Rn.manifest.name}`,
      subtitle: `Plugin: ${yT(M.plugin)}`,
      configSchema: Rn.configSchema,
      initialValues: Rn.existingConfig,
      onSave: Cn,
      onCancel: $n
    });
  }
  // View: flagged-detail (a plugin removed from its marketplace; can be dismissed).
  if (typeof R === "object" && R.type === "flagged-detail") {
    let Tt = R.plugin;
    return yr.jsxs($, {
      flexDirection: "column",
      children: [yr.jsx($, {
        children: yr.jsxs(v, {
          bold: !0,
          children: [Tt.name, " @ ", Tt.marketplace]
        })
      }), yr.jsxs($, {
        marginBottom: 1,
        children: [yr.jsx(v, {
          dimColor: !0,
          children: "Status: "
        }), yr.jsx(v, {
          color: "error",
          children: "Removed"
        })]
      }), yr.jsxs($, {
        marginBottom: 1,
        flexDirection: "column",
        children: [yr.jsxs(v, {
          color: "error",
          children: ["Removed from marketplace \xB7 reason: ", Tt.reason]
        }), yr.jsx(v, {
          children: Tt.text
        }), yr.jsxs(v, {
          dimColor: !0,
          children: ["Flagged on ", new Date(Tt.flaggedAt).toLocaleDateString()]
        })]
      }), yr.jsx($, {
        marginTop: 1,
        flexDirection: "column",
        children: yr.jsxs($, {
          children: [yr.jsxs(v, {
            children: [Xe.pointer, " "]
          }), yr.jsx(v, {
            color: "suggestion",
            children: "Dismiss"
          })]
        })
      }), yr.jsxs(bn, {
        children: [yr.jsx(dr, {
          action: "select:accept",
          context: "Select",
          fallback: "Enter",
          description: "dismiss"
        }), yr.jsx(dr, {
          action: "confirm:no",
          context: "Settings",
          fallback: "Esc",
          description: "go back"
        })]
      })]
    });
  }
  // View: plugin-usage (per-plugin usage breakdown).
  if (R === "plugin-usage" && M) return yr.jsx(uEl, {
    plugin: M.plugin
  });
  // View: confirm-project-uninstall (team-shared plugin — offer local disable).
  if (R === "confirm-project-uninstall" && M) return yr.jsxs($, {
    flexDirection: "column",
    children: [yr.jsxs(v, {
      bold: !0,
      color: "warning",
      children: [yT(M.plugin), " is enabled in .claude/settings.json (shared with your team)"]
    }), yr.jsxs($, {
      marginTop: 1,
      flexDirection: "column",
      children: [yr.jsx(v, {
        children: "Disable it just for you in .claude/settings.local.json?"
      }), yr.jsx(v, {
        dimColor: !0,
        children: "This has the same effect as uninstalling, without affecting other contributors."
      })]
    }), le && yr.jsx($, {
      marginTop: 1,
      children: yr.jsx(Ba, {
        error: le
      })
    }), yr.jsx($, {
      marginTop: 1,
      children: re ? yr.jsx(v, {
        dimColor: !0,
        children: "Disabling\u2026"
      }) : yr.jsxs(bn, {
        children: [yr.jsx(dr, {
          action: "confirm:yes",
          context: "Confirmation",
          fallback: "y",
          description: "disable"
        }), yr.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "cancel"
        })]
      })
    })]
  });
  // View: confirm-data-cleanup (plugin has persistent data — keep or delete it).
  if (typeof R === "object" && R.type === "confirm-data-cleanup" && M) return yr.jsxs($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: Ze,
    children: [yr.jsxs(v, {
      bold: !0,
      children: [yT(M.plugin), " has", " ", R.size.human, " of persistent data"]
    }), yr.jsxs($, {
      marginTop: 1,
      flexDirection: "column",
      children: [yr.jsx(v, {
        children: "Delete it along with the plugin?"
      }), yr.jsx(v, {
        dimColor: !0,
        children: eMt(N)
      })]
    }), le && yr.jsx($, {
      marginTop: 1,
      children: yr.jsx(Ba, {
        error: le
      })
    }), yr.jsx($, {
      marginTop: 1,
      children: re ? yr.jsx(v, {
        dimColor: !0,
        children: "Uninstalling\u2026"
      }) : yr.jsxs(bn, {
        children: [yr.jsx(at, {
          chord: "y",
          action: "delete",
          bold: !0
        }), yr.jsx(at, {
          chord: "n",
          action: "keep",
          bold: !0
        }), yr.jsx(at, {
          chord: "escape",
          action: "cancel",
          bold: !0,
          format: {
            keyCase: "lower"
          }
        })]
      })
    })]
  });
  // View: plugin-details (full metadata + diagnostics + the action menu Et).
  if (R === "plugin-details" && M) {
    let Tt = $o(),
      Cn = N,
      $n = Hht(Cn, M.plugin.manifest, Tt),
      Nn = (Dn, Io) => Dn === M.plugin.name || Io === Cn || Io.startsWith(`${M.plugin.name}@`),
      cr = u.filter(Dn => !("orphan" in Dn && Dn.orphan) && Nn("plugin" in Dn ? Dn.plugin : void 0, Dn.source)).map(Dn => ({
        message: kPe(Dn),
        guidance: gWe(Dn)
      })),
      Gr = d.filter(Dn => Nn("plugin" in Dn ? Dn.plugin : void 0, Dn.source)).map(Dn => ({
        message: EO(Dn),
        guidance: Pvn(Dn)
      })),
      To = lEl(M.plugin.repository),
      rn = cr.length === 0 && Gr.length === 0 ? null : yr.jsxs($, {
        flexDirection: "column",
        marginBottom: 1,
        children: [yr.jsx(SEl, {
          entries: cr,
          color: "error",
          noun: "error"
        }), yr.jsx(SEl, {
          entries: Gr,
          color: "warning",
          noun: "note"
        })]
      });
    return yr.jsxs($, {
      flexDirection: "column",
      children: [yr.jsx($, {
        children: yr.jsxs(v, {
          bold: !0,
          children: [yT(M.plugin), " @", " ", M.marketplace]
        })
      }), yr.jsxs($, {
        children: [yr.jsx(v, {
          dimColor: !0,
          children: "Scope: "
        }), yr.jsx(v, {
          children: M.scope || "user"
        })]
      }), M.plugin.manifest.version && yr.jsxs($, {
        children: [yr.jsx(v, {
          dimColor: !0,
          children: "Version: "
        }), yr.jsx(v, {
          children: M.plugin.manifest.version
        })]
      }), M.plugin.manifest.description && yr.jsx($, {
        marginBottom: 1,
        children: yr.jsx(v, {
          children: M.plugin.manifest.description
        })
      }), M.plugin.manifest.author && yr.jsxs($, {
        children: [yr.jsx(v, {
          dimColor: !0,
          children: "Author: "
        }), yr.jsx(v, {
          children: M.plugin.manifest.author.name
        })]
      }), yr.jsxs($, {
        marginBottom: 1,
        children: [yr.jsx(v, {
          dimColor: !0,
          children: "Status: "
        }), yr.jsx(v, {
          color: $n ? "success" : "warning",
          children: $n ? "Enabled" : "Disabled"
        }), M.pendingUpdate && yr.jsx(v, {
          color: "suggestion",
          children: " \xB7 Marked for update"
        }), To !== null && yr.jsxs(v, {
          dimColor: !0,
          children: [" ", "\xB7 Last used:", " ", To === 0 ? "today" : `${To} ${Sn(To, "day")} ago`]
        })]
      }), yr.jsx(fsm, {
        plugin: M.plugin,
        marketplace: M.marketplace
      }), rn, yr.jsx($, {
        marginTop: 1,
        flexDirection: "column",
        children: Et.map((Dn, Io) => {
          let Er = Io === nn;
          return yr.jsxs($, {
            children: [Er && yr.jsxs(v, {
              children: [Xe.pointer, " "]
            }), !Er && yr.jsx(v, {
              children: "  "
            }), yr.jsx(v, {
              bold: Er,
              color: Dn.label.includes("Uninstall") ? "error" : Dn.label.includes("Update") ? "suggestion" : void 0,
              children: Dn.label
            })]
          }, Io);
        })
      }), re && yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(v, {
          children: "Processing\u2026"
        })
      }), le && yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(Ba, {
          error: le
        })
      }), yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: yr.jsxs(bn, {
            children: [yr.jsx(dr, {
              action: "select:previous",
              context: "Select",
              fallback: "\u2191",
              description: "navigate"
            }), yr.jsx(dr, {
              action: "select:accept",
              context: "Select",
              fallback: "Enter",
              description: "select"
            }), yr.jsx(dr, {
              action: "confirm:no",
              context: "Settings",
              fallback: "Esc",
              description: "go back"
            })]
          })
        })
      })]
    });
  }
  // View: failed-plugin-details (load error + option to remove the entry).
  if (typeof R === "object" && R.type === "failed-plugin-details") {
    let Tt = R.plugin,
      Cn = Tt.errors[0],
      $n = Cn ? kPe(Cn) : "Failed to load";
    return yr.jsxs($, {
      flexDirection: "column",
      children: [yr.jsxs(v, {
        children: [yr.jsx(v, {
          bold: !0,
          children: Tt.name
        }), yr.jsxs(v, {
          dimColor: !0,
          children: [" @ ", Tt.marketplace]
        }), yr.jsxs(v, {
          dimColor: !0,
          children: [" (", Tt.scope, ")"]
        })]
      }), yr.jsx(v, {
        color: "error",
        children: $n
      }), Tt.scope === "managed" ? yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(v, {
          dimColor: !0,
          children: "Managed by your organization \u2014 contact your admin"
        })
      }) : yr.jsxs($, {
        marginTop: 1,
        children: [yr.jsxs(v, {
          color: "suggestion",
          children: [Xe.pointer, " "]
        }), yr.jsx(v, {
          bold: !0,
          children: "Remove"
        })]
      }), re && yr.jsx(v, {
        children: "Processing\u2026"
      }), yr.jsx(Ba, {
        error: le
      }), EI(Tt.marketplace) && yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(v, {
          dimColor: !0,
          children: "This is a directory-loaded plugin \u2014 delete the directory to remove it; edits there take effect after /reload-plugins."
        })
      }), yr.jsx($, {
        marginTop: 1,
        children: yr.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: yr.jsxs(bn, {
            children: [Tt.scope !== "managed" && !EI(Tt.marketplace) && yr.jsx(dr, {
              action: "select:accept",
              context: "Select",
              fallback: "Enter",
              description: "remove"
            }), yr.jsx(dr, {
              action: "confirm:no",
              context: "Settings",
              fallback: "Esc",
              description: "go back"
            })]
          })
        })
      })]
    });
  }
  // View: skill-detail (skill metadata + an override-state radio selector).
  if (typeof R === "object" && R.type === "skill-detail") {
    let Tt = R.skill,
      Cn = [Tt.override, ...psm.filter(Nn => Nn !== Tt.override)],
      $n = Nn => {
        if (Nn === Tt.override) return;
        let {
          error: cr
        } = ao("localSettings", {
          skillOverrides: {
            [Tt.cmdName]: TEl(Tt.cmdName, Nn)
          }
        });
        if (cr) {
          ce(cr.message);
          return;
        }
        te(Gr => new Set(Gr).add(Tt.id)), X(Gr => Gr + 1), w({
          type: "skill-detail",
          skill: {
            ...Tt,
            override: Nn
          }
        });
      };
    return yr.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [yr.jsx(v, {
        bold: !0,
        children: Tt.name
      }), Tt.description && yr.jsx(v, {
        dimColor: !0,
        children: Tt.description
      }), Tt.whenToUse && yr.jsxs(v, {
        dimColor: !0,
        children: ["When to use: ", Tt.whenToUse]
      }), yr.jsxs(v, {
        dimColor: !0,
        children: ["Source: ", Tt.source, " \xB7 ~", Tt.tokenEstimate, " tokens"]
      }), yr.jsxs(v, {
        dimColor: !0,
        children: ["Usage:", " ", Tt.usage ? `${Tt.usage.count}\xD7 \xB7 last used ${Tt.usage.daysSinceUse === 0 ? "today" : `${Tt.usage.daysSinceUse}d ago`}` : "never invoked"]
      }), Tt.allowedTools && Tt.allowedTools.length > 0 && yr.jsxs(v, {
        dimColor: !0,
        children: ["Allowed tools: ", Tt.allowedTools.join(", ")]
      }), Tt.skillRoot && yr.jsxs(v, {
        dimColor: !0,
        children: ["Path: ", Tt.skillRoot]
      }), Tt.lockSource === "policy" || Tt.lockSource === "flag" ? yr.jsxs(v, {
        dimColor: !0,
        children: ["State: ", Tt.override, " (locked by ", Tt.lockSource, " settings)"]
      }) : yr.jsxs($, {
        flexDirection: "column",
        children: [yr.jsxs(v, {
          children: ["State:", Tt.lockSource === "author" && yr.jsxs(v, {
            dimColor: !0,
            children: [" ", "(on/name-only locked by frontmatter disable-model-invocation)"]
          })]
        }), yr.jsx(Oht, {
          visibleCount: 4,
          onSelect: Nn => {
            let cr = Cn[Nn];
            if (Tt.lockSource === "author" && cr !== "off") {
              $n("user-invocable-only");
              return;
            }
            $n(cr);
          },
          children: Cn.map(Nn => {
            let cr = Tt.lockSource === "author" && Nn !== "user-invocable-only" && Nn !== "off";
            return yr.jsx(Oht.Item, {
              children: yr.jsxs(v, {
                dimColor: cr,
                children: [Nn === Tt.override ? Xe.radioOn : Xe.radioOff, " ", Nn, cr ? " (locked)" : ""]
              })
            }, Nn);
          })
        }, Tt.override)]
      }), yr.jsxs(bn, {
        children: [yr.jsx(at, {
          chord: "Enter",
          action: "set state"
        }), yr.jsx(v, {
          dimColor: !0,
          children: " \xB7 "
        }), yr.jsx(at, {
          chord: "Esc",
          action: "go back"
        })]
      })]
    });
  }
  // View: mcp-detail. Wraps the MCP client config into a transport-typed server
  // object and renders the matching detail panel (stdio / sse / http / proxy),
  // with a fallback for unknown transports.
  if (typeof R === "object" && R.type === "mcp-detail") {
    let Tt = R.client,
      Cn = Mae(c, Tt.name).length,
      $n = () => {
        w({
          type: "mcp-tools",
          client: Tt
        });
      },
      Nn = () => {
        w("plugin-list");
      },
      cr = rn => {
        if (rn) t(rn);
        w("plugin-list");
      },
      Gr = Tt.config.scope,
      To = Tt.config.type ?? "stdio";
    if (To === "stdio") {
      let rn = {
        name: Tt.name,
        client: Tt,
        scope: Gr,
        transport: "stdio",
        config: Tt.config
      };
      return yr.jsx(TWt, {
        server: rn,
        serverToolsCount: Cn,
        onViewTools: $n,
        onCancel: Nn,
        onComplete: cr,
        borderless: !0
      });
    } else if (To === "sse") {
      let rn = {
        name: Tt.name,
        client: Tt,
        scope: Gr,
        transport: "sse",
        isAuthenticated: void 0,
        config: Tt.config
      };
      return yr.jsx(cWe, {
        server: rn,
        serverToolsCount: Cn,
        onViewTools: $n,
        onCancel: Nn,
        onComplete: cr,
        borderless: !0
      });
    } else if (To === "http") {
      let rn = {
        name: Tt.name,
        client: Tt,
        scope: Gr,
        transport: "http",
        isAuthenticated: void 0,
        config: Tt.config
      };
      return yr.jsx(cWe, {
        server: rn,
        serverToolsCount: Cn,
        onViewTools: $n,
        onCancel: Nn,
        onComplete: cr,
        borderless: !0
      });
    } else if (To === "claudeai-proxy") {
      let rn = {
        name: Tt.name,
        client: Tt,
        scope: Gr,
        transport: "claudeai-proxy",
        isAuthenticated: void 0,
        config: Tt.config
      };
      return yr.jsx(cWe, {
        server: rn,
        serverToolsCount: Cn,
        onViewTools: $n,
        onCancel: Nn,
        onComplete: cr,
        borderless: !0
      });
    }
    return yr.jsxs($, {
      flexDirection: "column",
      paddingX: 1,
      children: [yr.jsxs(v, {
        color: "warning",
        children: ["No details view for ", Tt.name, " (transport: ", To, ")."]
      }), yr.jsx(bn, {
        children: yr.jsx(dr, {
          action: "confirm:no",
          context: "Settings",
          fallback: "Esc",
          description: "go back"
        })
      })]
    });
  }
  // View: mcp-tools (list of tools exposed by the selected MCP server).
  if (typeof R === "object" && R.type === "mcp-tools") {
    let Tt = R.client,
      Cn = Tt.config.scope,
      $n = Tt.config.type ?? "stdio",
      Nn;
    if ($n === "stdio") Nn = {
      name: Tt.name,
      client: Tt,
      scope: Cn,
      transport: "stdio",
      config: Tt.config
    };else if ($n === "sse") Nn = {
      name: Tt.name,
      client: Tt,
      scope: Cn,
      transport: "sse",
      isAuthenticated: void 0,
      config: Tt.config
    };else if ($n === "http") Nn = {
      name: Tt.name,
      client: Tt,
      scope: Cn,
      transport: "http",
      isAuthenticated: void 0,
      config: Tt.config
    };else Nn = {
      name: Tt.name,
      client: Tt,
      scope: Cn,
      transport: "claudeai-proxy",
      isAuthenticated: void 0,
      config: Tt.config
    };
    return yr.jsx(bWt, {
      server: Nn,
      onSelectTool: cr => {
        w({
          type: "mcp-tool-detail",
          client: Tt,
          tool: cr
        });
      },
      onBack: () => w({
        type: "mcp-detail",
        client: Tt
      })
    });
  }
  // View: mcp-tool-detail (full schema/details for one MCP tool).
  if (typeof R === "object" && R.type === "mcp-tool-detail") {
    let {
        client: Tt,
        tool: Cn
      } = R,
      $n = Tt.config.scope,
      Nn = Tt.config.type ?? "stdio",
      cr;
    if (Nn === "stdio") cr = {
      name: Tt.name,
      client: Tt,
      scope: $n,
      transport: "stdio",
      config: Tt.config
    };else if (Nn === "sse") cr = {
      name: Tt.name,
      client: Tt,
      scope: $n,
      transport: "sse",
      isAuthenticated: void 0,
      config: Tt.config
    };else if (Nn === "http") cr = {
      name: Tt.name,
      client: Tt,
      scope: $n,
      transport: "http",
      isAuthenticated: void 0,
      config: Tt.config
    };else cr = {
      name: Tt.name,
      client: Tt,
      scope: $n,
      transport: "claudeai-proxy",
      isAuthenticated: void 0,
      config: Tt.config
    };
    return yr.jsx(SWt, {
      tool: Cn,
      server: cr,
      onBack: () => w({
        type: "mcp-tools",
        client: Tt
      })
    });
  }
  // Default view: the searchable, scrollable plugin/MCP/skill list itself.
  let Un = Nt.getVisibleItems(Be);
  return yr.jsxs($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: Gt,
    onPaste: en,
    children: [yr.jsx($, {
      marginBottom: 1,
      children: yr.jsx(aP, {
        query: H,
        isFocused: f,
        isTerminalFocused: _,
        width: S - 4,
        cursorOffset: I,
        onCursorOffsetChange: D,
        onFocus: () => h(!0)
      })
    }), dl() && yr.jsx($, {
      marginBottom: 1,
      paddingLeft: 2,
      children: yr.jsxs(v, {
        color: "warning",
        children: ["Safe mode: plugins are disabled this session \u2014 changes here save but won't load until safe mode is off.", " ", fk(eC()), " to re-enable."]
      })
    }), Se && yr.jsx($, {
      marginBottom: 1,
      paddingLeft: 2,
      children: yr.jsx(v, {
        color: "success",
        children: Se
      })
    }), Be.length === 0 && H && yr.jsx($, {
      marginBottom: 1,
      children: yr.jsxs(wl, {
        children: ['No items match "', H, '"']
      })
    }), Nt.scrollPosition.canScrollUp && yr.jsx($, {
      children: yr.jsxs(v, {
        dimColor: !0,
        children: [" ", Xe.arrowUp, " more above"]
      })
    }), Un.map((Tt, Cn) => {
      let $n = Nt.toActualIndex(Cn),
        Nn = $n === Dt && !f;
      switch (Tt.kind) {
        case "spacer":
          return yr.jsx($, {
            height: 1
          }, `spacer:${$n}`);
        case "section-header":
          return yr.jsx($, {
            paddingLeft: 2,
            children: yr.jsx(v, {
              dimColor: Tt.section !== "attention",
              color: Tt.section === "attention" ? "warning" : void 0,
              bold: !0,
              children: Tt.section === "attention" ? "Needs attention" : Tt.section === "disused" ? "Not used recently" : "Favorites"
            })
          }, `section:${Tt.section}`);
        case "scope-header":
          return yr.jsx($, {
            paddingLeft: 4,
            children: yr.jsx(v, {
              dimColor: !0,
              children: msm(Tt.scope)
            })
          }, `scope:${$n}`);
        case "disabled-header":
          return yr.jsx($, {
            paddingLeft: 2,
            children: yr.jsxs(v, {
              color: Nn ? "suggestion" : void 0,
              children: [Nn ? `${Xe.pointer} ` : "  ", ke ? Xe.arrowDown : Xe.arrowRight, " Show", Tt.disabledCount > 0 && yr.jsxs(yr.Fragment, {
                children: [" ", "disabled ", yr.jsxs(v, {
                  dimColor: !0,
                  children: ["(", Tt.disabledCount, ")"]
                })]
              }), Tt.disabledCount > 0 && Tt.unusedConnectorCount > 0 && " \xB7", Tt.unusedConnectorCount > 0 && yr.jsxs(yr.Fragment, {
                children: [" ", "unused claude.ai connectors", " ", yr.jsxs(v, {
                  dimColor: !0,
                  children: ["(", Tt.unusedConnectorCount, ")"]
                })]
              })]
            })
          }, "section:disabled");
        case "item":
          return yr.jsx(mEl, {
            item: Tt.item,
            isSelected: Nn,
            health: Tt.item.type === "plugin" ? m?.get(Tt.item.name) : void 0
          }, `${Tt.section}:${Tt.item.id}`);
      }
    }), Nt.scrollPosition.canScrollDown && yr.jsx($, {
      children: yr.jsxs(v, {
        dimColor: !0,
        children: [" ", Xe.arrowDown, " more below"]
      })
    }), yr.jsx($, {
      marginTop: 1,
      marginLeft: 1,
      children: yr.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: yr.jsxs(bn, {
          children: [yr.jsx(v, {
            children: "Type to search"
          }), yr.jsx(dr, {
            action: "plugin:toggle",
            context: "Plugin",
            fallback: "Space",
            description: "toggle"
          }), yr.jsx(dr, {
            action: "plugin:favorite",
            context: "Plugin",
            fallback: "f",
            description: "favorite"
          }), yr.jsx(dr, {
            action: "select:accept",
            context: "Select",
            fallback: "Enter",
            description: "view"
          }), yr.jsx(dr, {
            action: "confirm:no",
            context: "Settings",
            fallback: "Esc",
            description: "go back"
          })]
        })
      })
    }), le && yr.jsx($, {
      marginTop: 1,
      marginLeft: 1,
      children: yr.jsx(Ba, {
        error: le
      })
    }), ne.size > 0 && yr.jsx($, {
      marginLeft: 1,
      children: yr.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: "Run /reload-plugins to apply changes"
      })
    })]
  });
}
var xwo, bEl, Iwo, Zc, yr, psm;
// Lazy module initializer: pulls in all sibling modules this screen depends on
// and binds the late-initialized vars (the React-compiler runtime, fs/promises,
// path, the Ink renderers, and the ordered skill-override choices `psm`).
var CEl = b(() => {
  Zs();
  uc();
  Rj();
  Is();
  sy();
  I_();
  Wo();
  Swo();
  S7n();
  E7n();
  A7n();
  R7n();
  aue();
  SE();
  lne();
  ui();
  je();
  ss();
  mn();
  kt();
  jbl();
  wW();
  Sue();
  qO();
  Pht();
  l1();
  uo();
  Q8();
  Jg();
  tr();
  qe();
  dn();
  Ct();
  vn();
  c6();
  rH();
  dS();
  wst();
  a1();
  X7n();
  oh();
  Rwo();
  Eg();
  V4();
  II();
  mWe();
  wm();
  br();
  tn();
  lr();
  vwo();
  pw();
  wwo();
  awo();
  L7n();
  dEl();
  fEl();
  yEl();
  q7n();
  xwo = x(tt(), 1), bEl = x(require("fs/promises")), Iwo = x(require("path")), Zc = x(et(), 1), yr = x(oe(), 1), psm = ["on", "name-only", "user-invocable-only", "off"];
});

export {TEl,msm,fsm,hsm,gsm,_sm,SEl,EEl,xwo,bEl,Iwo,Zc,yr,psm,CEl};
