// @ts-nocheck
import {ec,Dd} from "../../vendor/m687.ts";
import {mql,fql} from "../../vendor/m5323.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Z8e,sJn,kPo,IPo,HPo,DPo,bql} from "../agent/5326_descriptionKey.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {ju,wk} from "./2564_current.ts";
import {getCommandName} from "../tools/4028_maxEditDistance.ts";
import {mt,Mc,bo,configProtoStore} from "../../vendor/m2458.ts";
import {Cra,O0} from "../tools/3222_name.ts";
import {getSettingsSchema,SEn,k$} from "../../vendor/m2541.ts";
import {cJn,MPo,Lql} from "../../vendor/m5328.ts";
import {globalFileIndexCache,startBackgroundCacheRefresh,findLongestCommonPrefix,applyFileSuggestion,Ppt} from "../telemetry/4481_startBackgroundCacheRefresh.ts";
import {j4} from "../../vendor/m2443.ts";
import {Dql,lJn,OPo} from "../../vendor/m5327.ts";
import {vql,PPo} from "../../vendor/m5326.ts";
import {isAgentSwarmsEnabled,cb} from "../config/3298_isAgentSwarmsEnabled.ts";
import {np,aU} from "../config/3875_aU.ts";
import {bEn,sIi,iIi,u3r} from "../../vendor/m2543.ts";
import {searchSessionsByCustomTitle,getSessionIdFromLog,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {formatLogMetadata,ps} from "../../vendor/m238.ts";
import {findCommand,Sf} from "../tools/5142_toSlashCommands.ts";
import {hql,Aql} from "../../vendor/m5324.ts";
import {hYr,Csa,T1t} from "../../vendor/m3251.ts";
import {B0,Pee} from "../telemetry/3153_Pee.ts";
import {HLa,tct,nct} from "../../vendor/m3923.ts";
import {Di,dr} from "../../vendor/m231.ts";
import {Pwe,ug,ZR} from "../../vendor/m2551.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {Ck,TF} from "../../vendor/m2514.ts";
import {Text} from "../../vendor/m2423.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
function uHm(e: any, t: any, n: any): any {
  if (t === void 0) return !1;
  let r = e.length - t.length,
    o = n - r;
  return r > 0 && o >= 0 && e.slice(0, o) + e.slice(n) === t && /^[a-z0-9_+-]*:$/.test(e.slice(o, n));
}
function lGt(e: any): any {
  return typeof e === "object" && e !== null && "type" in e && (e.type === "directory" || e.type === "file");
}
function rde(e: any, t: any, n: any): any {
  if (n.length === 0) return -1;
  if (t < 0) return 0;
  let r = e[t];
  if (!r) return 0;
  let o = n.findIndex((s: any) => s.id === r.id);
  return o >= 0 ? o : 0;
}
function Nql(e: any): any {
  let t = e.metadata;
  return t?.sessionId ? `/resume ${t.sessionId}` : `/resume ${e.displayText}`;
}
function FPo(e: any): any {
  if (e.isQuoted) return e.token.slice(2).replace(/"$/, "");else if (e.token.startsWith("@")) return e.token.substring(1);else return e.token;
}
function UPo(e: any): any {
  let {
      displayText: t,
      mode: n,
      hasAtPrefix: r,
      needsQuotes: o,
      isQuoted: s,
      isComplete: i
    } = e,
    a = i ? " " : "";
  if (s || o) return n === "bash" ? `"${t}"${a}` : `@"${t}"${a}`;else if (r) return n === "bash" ? `${t}${a}` : `@${t}${a}`;else return t;
}
function $Po(e: any, t: any, n: any, r: any, o: any, s: any): any {
  let l = t.slice(0, n).lastIndexOf(" ") + 1,
    c: any;
  if (s === "variable") c = "$" + e.displayText + " ";else if (s === "command") c = e.displayText + " ";else c = e.displayText;
  let u = t.slice(0, l) + c + t.slice(n);
  r(u), o(l + c.length);
}
function jAt(e: any, t: any, n: any, r: any, o: any, s: any): any {
  let i = t.slice(0, n).match(r);
  if (!i || i.index === void 0) return;
  let a = i.index + (i[1]?.length ?? 0),
    l = t.slice(0, a),
    c = l + e.displayText + " " + t.slice(n);
  o(c), s(l.length + e.displayText.length + 1);
}
async function dHm(e: any, t: any, n: any): Promise<any> {
  if (ec()) return [];
  try {
    if (dJn) dJn.abort();
    return dJn = new AbortController(), await mql(e, t, dJn.signal, n);
  } catch {
    return logEvent("tengu_shell_completion_failed", {}), [];
  }
}
function Bql(e: any, t: any, n: any, r: any, o: any): any {
  let s = o ? "/" : " ",
    i = e.slice(0, n),
    a = e.slice(n + r),
    l = "@" + t + s;
  return {
    newInput: i + l + a,
    cursorPos: i.length + l.length
  };
}
function Zye(e: any, t: any, n: any = !1): any {
  if (!e) return null;
  let r = e.substring(0, t);
  if (n) {
    let c = /@"([^"]*)"?$/,
      u = r.match(c);
    if (u && u.index !== void 0) {
      let p = e.substring(t).match(/^[^"]*"?/),
        m = p ? p[0] : "";
      return {
        token: u[0] + m,
        startPos: u.index,
        isQuoted: !0
      };
    }
  }
  if (n) {
    let c = r.lastIndexOf("@");
    if (c >= 0 && (c === 0 || /[\s\u3002\u3001\uFF1F\uFF01]/.test(r[c - 1]))) {
      let u = r.substring(c),
        d = u.match(sHm);
      if (d && d[0].length === u.length) {
        let m = e.substring(t).match(Mql),
          f = m ? m[0] : "";
        return {
          token: d[0] + f,
          startPos: c,
          isQuoted: !1
        };
      }
    }
  }
  let o = n ? iHm : aHm,
    s = r.match(o);
  if (!s || s.index === void 0) return null;
  let a = e.substring(t).match(Mql),
    l = a ? a[0] : "";
  return {
    token: s[0] + l,
    startPos: s.index,
    isQuoted: !1
  };
}
function pHm(e: any): any {
  if (Z8e(e)) {
    let t = e.indexOf(" ");
    if (t === -1) return {
      commandName: e.slice(1),
      args: ""
    };
    return {
      commandName: e.slice(1, t),
      args: e.slice(t + 1)
    };
  }
  return null;
}
function Fql(e: any, t: any): any {
  return !e && t.includes(" ") && !t.endsWith(" ");
}
function Uql({
  commands: e,
  onInputChange: t,
  onSubmit: n,
  setCursorOffset: r,
  input: o,
  cursorOffset: s,
  mode: i,
  agents: a,
  setSuggestionsState: l,
  suggestionsState: {
    suggestions: c,
    selectedSuggestion: u,
    hoveredSuggestionId: d,
    commandArgumentHint: p,
    suggestionsEmptyMessage: m
  },
  suppressSuggestions: f,
  markAccepted: A,
  onModeChange: h,
  sessionEnvVars: g
}: any): any {
  let {
      addNotification: _
    } = Ui(),
    y = ju("chat:thinkingToggle", "Chat", "alt+t"),
    [T, S] = fA.useState("none"),
    v = fA.useRef(d);
  v.current = d ?? null;
  let R = fA.useMemo(() => {
      let $e = e.filter((Rt: any) => !Rt.isHidden);
      if ($e.length === 0) return;
      return Math.max(...$e.map((Rt: any) => getCommandName(Rt).length)) + 6;
    }, [e]),
    [k, x] = fA.useState(void 0),
    H = mt(($e: any) => $e.mcp.resources),
    I = mt(($e: any) => $e.mcp.resourceTemplates),
    P = Mc(),
    L = bo(),
    D = fA.useCallback(() => {
      let $e = P.getState();
      Cra($e.mcp.clients, $e.mcp.resourceTemplates).then((Je: any) => {
        if (Je.length === 0) return;
        let Rt = !1;
        if (L((Et: any) => {
          let dt = Et.mcp.resourceTemplates;
          for (let {
            client: Dt,
            templates: $t
          } of Je) {
            if (Dt.name in dt || !Et.mcp.clients.some((It: any) => It.type === "connected" && It.client === Dt.client)) continue;
            dt = {
              ...dt,
              [Dt.name]: $t
            };
          }
          if (dt === Et.mcp.resourceTemplates) return Et;
          return Rt = !0, {
            ...Et,
            mcp: {
              ...Et.mcp,
              resourceTemplates: dt
            }
          };
        }), Rt && Y.current === "at") K.current = null;
      });
    }, [P, L]),
    N = mt(($e: any) => $e.promptSuggestion),
    O = mt(($e: any) => !!$e.viewingAgentTaskId),
    $ = getSettingsSchema(),
    [U, W] = fA.useState(void 0),
    G = fA.useMemo(() => {
      if (i !== "prompt" || f) return;
      let $e = sJn(o, s);
      if (!$e) return;
      let Je = kPo($e.partialCommand, e);
      if (!Je) return;
      return {
        text: Je.suffix,
        fullCommand: Je.fullCommand,
        insertPosition: $e.startPos + 1 + $e.partialCommand.length
      };
    }, [o, s, i, e, f]),
    V = f ? void 0 : i === "prompt" ? G : U,
    Q = fA.useRef(s);
  Q.current = s;
  let K = fA.useRef(null),
    Y = fA.useRef("file"),
    J = fA.useRef(""),
    ee = fA.useRef(""),
    te = fA.useRef("at-path"),
    ne = fA.useRef(""),
    re = fA.useRef(""),
    oe = fA.useRef(c);
  oe.current = c;
  let ce = fA.useRef(null),
    ue = fA.useCallback(() => {
      l(() => ({
        commandArgumentHint: void 0,
        suggestions: [],
        selectedSuggestion: -1
      })), S("none"), x(void 0), W(void 0);
    }, [l]),
    ae = fA.useCallback(async ($e: any, Je: any = !1) => {
      K.current = $e, Y.current = Je ? "at" : "file";
      let Rt = ec(),
        Et = null,
        dt = Je && !Rt ? P.getState().mcp.resourceTemplates : I;
      if (Je && !Rt) {
        if (D(), Et = await cJn($e, dt, P.getState().mcp.clients, "@"), K.current !== $e) return;
      }
      if (!Et) Et = await MPo(globalFileIndexCache, $e, Rt ? {} : H, Rt ? [] : a, Je, Rt ? {} : dt);
      if (K.current !== $e) return;
      if (Et.length === 0) {
        l(() => ({
          commandArgumentHint: void 0,
          suggestions: [],
          selectedSuggestion: -1
        })), S("none"), x(void 0);
        return;
      }
      l((Dt: any) => ({
        commandArgumentHint: void 0,
        suggestions: Et,
        selectedSuggestion: rde(Dt.suggestions, Dt.selectedSuggestion, Et)
      })), S(Et.length > 0 ? "file" : "none"), x(void 0);
    }, [H, I, P, D, l, S, x, a]);
  fA.useEffect(() => {
    let $e = setImmediate(() => {
        if (!ec()) startBackgroundCacheRefresh(globalFileIndexCache);
      }),
      Je = globalFileIndexCache.indexBuildComplete.subscribe(() => {
        let Rt = K.current;
        if (Rt === null) return;
        let Et = Y.current;
        if (Et === "slash-template") return;
        K.current = null, ae(Rt, Et === "at");
      });
    return () => {
      clearImmediate($e), Je();
    };
  }, [ae]);
  let he = j4(ae, 50),
    se = fA.useCallback(async ($e: any) => {
      re.current = $e;
      let Je = await Dql(P.getState().mcp.clients, $e);
      if (re.current !== $e) return;
      l((Rt: any) => ({
        commandArgumentHint: void 0,
        suggestions: Je,
        selectedSuggestion: rde(Rt.suggestions, Rt.selectedSuggestion, Je)
      })), S(Je.length > 0 ? "slack-channel" : "none"), x(void 0);
    }, [l]),
    le = j4(se, 150),
    pe = fA.useCallback(async ($e: any, Je: any, Rt: any) => {
      K.current = $e, Y.current = "slash-template";
      let Et = await cJn($e, {
        [Je]: Rt
      }, P.getState().mcp.clients, "/");
      if (K.current !== $e) return;
      let dt = Et ?? [];
      l(() => ({
        commandArgumentHint: void 0,
        suggestions: dt,
        selectedSuggestion: dt.length > 0 ? 0 : -1
      })), S(dt.length > 0 ? "command" : "none"), x(void 0);
    }, [l]),
    de = j4(pe, 150),
    _e = fA.useCallback(async ($e: any, Je: any, Rt: any) => {
      let Et = Je ?? Q.current;
      if (f) {
        he.cancel(), de.cancel(), ue();
        return;
      }
      if (i === "prompt") {
        let It = sJn($e, Et);
        if (It) {
          if (kPo(It.partialCommand, e)) {
            l(() => ({
              commandArgumentHint: void 0,
              suggestions: [],
              selectedSuggestion: -1
            })), S("none"), x(void 0);
            return;
          }
        }
      }
      if (i === "bash" && $e.trim()) {
        ne.current = $e;
        let It = await vql($e);
        if (ne.current !== $e) return;
        if (It) {
          W({
            text: It.suffix,
            fullCommand: It.fullCommand,
            insertPosition: $e.length
          }), l(() => ({
            commandArgumentHint: void 0,
            suggestions: [],
            selectedSuggestion: -1
          })), S("none"), x(void 0);
          return;
        } else W(void 0);
      }
      let dt = i !== "bash" ? $e.substring(0, Et).match(uJn) : null;
      if (dt) {
        let It = (dt[2] ?? "").toLowerCase(),
          Zt = P.getState(),
          _n = [],
          Nn = new Set();
        if (isAgentSwarmsEnabled() && Zt.teamContext) for (let Fn of Object.values(Zt.teamContext.teammates ?? {})) {
          if (Fn.name === np) continue;
          if (!Fn.name.toLowerCase().startsWith(It)) continue;
          Nn.add(Fn.name), _n.push({
            id: `dm-${Fn.name}`,
            displayText: `@${Fn.name}`,
            description: "send message"
          });
        }
        for (let [Fn, Dn] of Zt.agentNameRegistry) {
          if (Nn.has(Fn)) continue;
          if (!Fn.toLowerCase().startsWith(It)) continue;
          let or = Zt.tasks[Dn]?.status;
          _n.push({
            id: `dm-${Fn}`,
            displayText: `@${Fn}`,
            description: or ? `send message \xB7 ${or}` : "send message"
          });
        }
        if (_n.length > 0) {
          he.cancel(), de.cancel(), l((Fn: any) => ({
            commandArgumentHint: void 0,
            suggestions: _n,
            selectedSuggestion: rde(Fn.suggestions, Fn.selectedSuggestion, _n)
          })), S("agent"), x(void 0);
          return;
        }
      }
      if (i === "prompt") {
        let It = $e.substring(0, Et).match(NPo);
        if (It && lJn(P.getState().mcp.clients)) {
          le(It[2]);
          return;
        } else if (T === "slack-channel") le.cancel(), ue();
      }
      if (aGt && i === "prompt") {
        let It = $e.substring(0, Et),
          Zt = uHm($e, Rt, Et) ? It.match(cHm) : null;
        if (Zt) {
          let Nn = aGt.getEmoji(Zt[2]);
          if (Nn) {
            let Fn = (Zt.index ?? 0) + (Zt[1]?.length ?? 0),
              Dn = $e.slice(0, Fn) + Nn + $e.slice(Et);
            t(Dn), r(Fn + Nn.length), ue();
            return;
          }
        }
        let _n = It.match(BPo);
        if (_n) {
          let Nn = aGt.getEmojiSuggestions(_n[2]);
          if (Nn.length > 0) {
            l((Fn: any) => ({
              commandArgumentHint: void 0,
              suggestions: Nn,
              selectedSuggestion: rde(Fn.suggestions, Fn.selectedSuggestion, Nn)
            })), S("emoji"), x(void 0);
            return;
          }
        }
        if (T === "emoji") ue();
      }
      let Dt = $e.substring(0, Et).match(lHm),
        $t = Et === $e.length && Et > 0 && $e.length > 0 && $e[Et - 1] === " ";
      if (i === "prompt" && Z8e($e) && Et > 0) {
        let It = pHm($e);
        if (It && It.commandName === "add-dir" && It.args) {
          let {
            args: Zt
          } = It;
          if (Zt.match(/\s+$/)) {
            he.cancel(), de.cancel(), ue();
            return;
          }
          let _n = await bEn(Zt);
          if (_n.length > 0) {
            l((Nn: any) => ({
              suggestions: _n,
              selectedSuggestion: rde(Nn.suggestions, Nn.selectedSuggestion, _n),
              commandArgumentHint: void 0
            })), te.current = "command-arg", S("directory");
            return;
          }
          he.cancel(), de.cancel(), ue();
          return;
        }
        if (It && It.commandName === "resume" && It.args !== void 0 && It.args.trim().length > 0 && $e.includes(" ")) {
          let {
              args: Zt
            } = It,
            Nn = (await searchSessionsByCustomTitle(Zt, {
              limit: 10
            })).map((Fn: any) => {
              let Dn = getSessionIdFromLog(Fn);
              return {
                id: `resume-title-${Dn}`,
                displayText: Fn.customTitle ?? Fn.aiTitle,
                description: formatLogMetadata(Fn),
                metadata: {
                  sessionId: Dn
                }
              };
            });
          if (Nn.length > 0) {
            l((Fn: any) => ({
              suggestions: Nn,
              selectedSuggestion: rde(Fn.suggestions, Fn.selectedSuggestion, Nn),
              commandArgumentHint: void 0
            })), S("custom-title");
            return;
          }
          ue();
          return;
        }
        if (It && $e.includes(" ")) {
          let Zt = findCommand(It.commandName, e);
          if (Zt?.getArgumentCompletions) {
            let _n = await hql($e, Zt.getArgumentCompletions);
            if (_n.length > 0) {
              l((Nn: any) => ({
                suggestions: _n,
                selectedSuggestion: rde(Nn.suggestions, Nn.selectedSuggestion, _n),
                commandArgumentHint: void 0
              })), S("command"), x(void 0);
              return;
            }
            he.cancel(), de.cancel(), ue();
            return;
          }
        }
      }
      if (i === "prompt" && Z8e($e) && Et > 0 && !Fql($t, $e)) {
        let It = void 0;
        if ($e.length > 1) {
          let Nn = $e.indexOf(" "),
            Fn = Nn === -1 ? $e.slice(1) : $e.slice(1, Nn),
            Dn = Nn !== -1 && $e.slice(Nn + 1).trim().length > 0,
            or = Nn !== -1 && $e.length === Nn + 1;
          if (Nn !== -1) {
            let vr = findCommand(Fn, e);
            if (vr || Dn) {
              if (vr?.argumentHint && or) It = vr.argumentHint;else if (vr?.type === "prompt" && vr.argNames?.length && $e.endsWith(" ")) {
                let Yt = $e.slice(Nn + 1),
                  ye = hYr(Yt);
                It = Csa(vr.argNames, ye);
              }
              l(() => ({
                commandArgumentHint: It,
                suggestions: [],
                selectedSuggestion: -1
              })), S("none"), x(void 0);
              return;
            }
          }
        }
        if (B0()) {
          let Nn = $e.slice(1),
            Fn = Nn.indexOf(":");
          if (Fn > 0 && Nn.slice(Fn + 1).includes("://")) {
            let Dn = Nn.slice(0, Fn),
              or = HLa(e, Dn);
            if (or.length > 0) {
              if (K.current === Nn) return;
              he.cancel(), de(Nn, Dn, or);
              return;
            }
          }
          de.cancel();
        }
        let Zt = IPo($e, e),
          _n = Di($e.slice(1), " ");
        if (l((Nn: any) => ({
          commandArgumentHint: It,
          suggestions: Zt,
          selectedSuggestion: $e === Rt ? rde(Nn.suggestions, Nn.selectedSuggestion, Zt) : Zt.length > 0 ? 0 : -1,
          suggestionsEmptyMessage: Zt.length === 0 && $e.length > 1 && HPo(_n) ? `No commands match "${$e}"` : void 0
        })), S("command"), Zt.length > 0) x(R);
        return;
      }
      if (T === "command") he.cancel(), de.cancel(), ue();else if (Z8e($e) && Fql($t, $e)) l((It: any) => It.commandArgumentHint ? {
        ...It,
        commandArgumentHint: void 0
      } : It);
      if (T === "custom-title") ue();
      if (T === "agent" && oe.current.some((It: any) => It.id?.startsWith("dm-"))) {
        if (!$e.substring(0, Et).match(uJn)) ue();
      }
      if (Dt && i !== "bash") {
        let It = Zye($e, Et, !0);
        if (It && It.token.startsWith("@")) {
          let Zt = FPo(It);
          if (sIi(Zt)) {
            ee.current = Zt;
            let _n = await iIi(Zt, {
              maxResults: 10
            });
            if (ee.current !== Zt) return;
            if (_n.length > 0) {
              l((Nn: any) => ({
                suggestions: _n,
                selectedSuggestion: rde(Nn.suggestions, Nn.selectedSuggestion, _n),
                commandArgumentHint: void 0
              })), te.current = "at-path", S("directory");
              return;
            }
          }
          if (K.current === Zt) return;
          he(Zt, !0);
          return;
        }
      }
      if (T === "file") {
        let It = Zye($e, Et, !0);
        if (It) {
          let Zt = FPo(It);
          if (K.current === Zt) return;
          he(Zt, !1);
        } else he.cancel(), de.cancel(), ue();
      }
      if (T === "shell") {
        let It = oe.current[0]?.metadata?.inputSnapshot;
        if (i !== "bash" || $e !== It) he.cancel(), de.cancel(), ue();
      }
    }, [T, e, l, ue, ae, he, le, de, i, f, t, r, R]);
  fA.useEffect(() => {
    if (ce.current === o) return;
    let $e = J.current;
    if ($e !== o) J.current = o, K.current = null;
    ce.current = null, _e(o, void 0, $e);
  }, [o, _e]);
  let fe = fA.useCallback(async () => {
      if (V) {
        if (i === "bash") {
          t(V.fullCommand), r(V.fullCommand.length), W(void 0);
          return;
        }
        let $e = sJn(o, s);
        if ($e) {
          let Je = o.slice(0, $e.startPos),
            Rt = o.slice($e.startPos + $e.token.length),
            Et = Je + "/" + V.fullCommand + " " + Rt,
            dt = $e.startPos + 1 + V.fullCommand.length + 1;
          t(Et), r(dt);
          return;
        }
      }
      if (c.length > 0) {
        he.cancel(), le.cancel(), de.cancel();
        let $e = v.current ? c.findIndex((Et: any) => Et.id === v.current) : -1,
          Je = $e >= 0 ? $e : u === -1 ? 0 : u,
          Rt = c[Je];
        if (T === "command" && Je < c.length) {
          if (Rt) {
            let Et = DPo(Rt, !1, e, t, r, n);
            if (Et?.reSuggest) _e(Et.newInput, Et.newInput.length);else ue();
          }
        } else if (T === "custom-title" && c.length > 0) {
          if (Rt) {
            let Et = Nql(Rt);
            t(Et), r(Et.length), ue();
          }
        } else if (T === "directory" && c.length > 0) {
          let Et = c[Je];
          if (Et) {
            let dt: any;
            if (te.current === "command-arg") {
              let Dt = o.indexOf(" "),
                $t = o.slice(0, Dt + 1),
                It = lGt(Et.metadata) && Et.metadata.type === "directory" ? "/" : " ";
              if (dt = $t + Et.id + It, t(dt), r(dt.length), lGt(Et.metadata) && Et.metadata.type === "directory") l((Zt: any) => ({
                ...Zt,
                commandArgumentHint: void 0
              })), _e(dt, dt.length);else ue();
            } else {
              let $t = Zye(o, s, !0) ?? Zye(o, s, !1);
              if ($t) {
                let It = lGt(Et.metadata) && Et.metadata.type === "directory",
                  Zt = Bql(o, Et.id, $t.startPos, $t.token.length, It);
                if (dt = Zt.newInput, t(dt), r(Zt.cursorPos), It) l((_n: any) => ({
                  ..._n,
                  commandArgumentHint: void 0
                })), _e(dt, Zt.cursorPos);else ue();
              } else ue();
            }
          }
        } else if (T === "shell" && c.length > 0) {
          let Et = c[Je];
          if (Et) {
            let dt = Et.metadata;
            $Po(Et, o, s, t, r, dt?.completionType), ue();
          }
        } else if (T === "agent" && c.length > 0 && c[Je]?.id?.startsWith("dm-")) {
          let Et = c[Je];
          if (Et) jAt(Et, o, s, uJn, t, r), ue();
        } else if (T === "slack-channel" && c.length > 0) {
          let Et = c[Je];
          if (Et) jAt(Et, o, s, NPo, t, r), ue();
        } else if (aGt && T === "emoji" && c.length > 0) {
          let Et = c[Je];
          if (Et) jAt(Et, o, s, BPo, t, r), ue();
        } else if (T === "file" && c.length > 0) {
          let Et = Zye(o, s, !0);
          if (!Et) {
            ue();
            return;
          }
          let Dt = c.some((Zt: any) => tct(Zt.metadata) !== null) ? "" : findLongestCommonPrefix(c),
            $t = Et.token.startsWith("@"),
            It: any;
          if (Et.isQuoted) It = Et.token.slice(2).replace(/"$/, "").length;else if ($t) It = Et.token.length - 1;else It = Et.token.length;
          if (Dt.length > It) {
            let Zt = UPo({
              displayText: Dt,
              mode: i,
              hasAtPrefix: $t,
              needsQuotes: !1,
              isQuoted: Et.isQuoted,
              isComplete: !1
            });
            applyFileSuggestion(Zt, o, Et.token, Et.startPos, t, r), _e(o.replace(Et.token, Zt), s);
          } else if (Je < c.length) {
            let Zt = c[Je];
            if (Zt) {
              let _n = tct(Zt.metadata),
                Nn = _n ? `${_n.replacement}${_n.partial ? "" : " "}` : UPo({
                  displayText: Zt.displayText,
                  mode: i,
                  hasAtPrefix: $t,
                  needsQuotes: Zt.displayText.includes(" "),
                  isQuoted: Et.isQuoted,
                  isComplete: !0
                }),
                Fn = applyFileSuggestion(Nn, o, Et.token, Et.startPos, t, r);
              if (_n?.partial) _e(Fn, Et.startPos + Nn.length);else ue();
            }
          }
        }
      } else if (o.trim() !== "") {
        let $e: any, Je: any;
        if (i === "bash") {
          $e = "shell";
          let Rt = await dHm(o, s, g);
          if (Rt.length === 1) {
            let Et = Rt[0];
            if (Et) {
              let dt = Et.metadata;
              $Po(Et, o, s, t, r, dt?.completionType);
            }
            Je = [];
          } else Je = Rt;
        } else {
          $e = "file";
          let Rt = Zye(o, s, !0);
          if (Rt) {
            let Et = Rt.token.startsWith("@"),
              dt = FPo(Rt),
              Dt = ec();
            K.current = dt, Y.current = Et ? "at" : "file";
            let $t = Et && !Dt ? P.getState().mcp.resourceTemplates : I,
              It = null;
            if (Et && !Dt) {
              if (D(), It = await cJn(dt, $t, P.getState().mcp.clients, "@"), K.current !== dt) return;
            }
            if (Je = It ?? (await MPo(globalFileIndexCache, dt, Dt ? {} : H, Dt ? [] : a, Et, Dt ? {} : $t)), K.current !== dt) return;
          } else Je = [];
        }
        if (Je.length > 0) l((Rt: any) => ({
          commandArgumentHint: void 0,
          suggestions: Je,
          selectedSuggestion: rde(Rt.suggestions, Rt.selectedSuggestion, Je)
        })), S($e), x(void 0);
      }
    }, [c, u, o, T, e, i, t, r, n, ue, s, _e, H, I, P, D, l, a, he, le, de, V, g]),
    ie = fA.useCallback(($e: any) => {
      let Je = v.current ? c.findIndex((dt: any) => dt.id === v.current) : -1,
        Rt = $e ?? (Je >= 0 ? Je : u);
      if (Rt < 0 || c.length === 0) return;
      let Et = c[Rt];
      if (T === "command" && Rt < c.length) {
        if (Et) {
          if ($e === void 0 && Et.id.startsWith(Aql) && /^\/\S+\s+$/.test(o)) {
            he.cancel(), de.cancel(), ue(), n(o, !0);
            return;
          }
          let dt = DPo(Et, $e === void 0, e, t, r, n);
          if (he.cancel(), de.cancel(), dt?.reSuggest) _e(dt.newInput, dt.newInput.length);else ue();
        }
      } else if (T === "custom-title" && Rt < c.length) {
        if (Et) {
          let dt = Nql(Et);
          t(dt), r(dt.length), n(dt, !0), he.cancel(), de.cancel(), ue();
        }
      } else if (T === "shell" && Rt < c.length) {
        if (Et) {
          let dt = Et.metadata;
          $Po(Et, o, s, t, r, dt?.completionType), he.cancel(), de.cancel(), ue();
        }
      } else if (T === "agent" && Rt < c.length && Et?.id?.startsWith("dm-")) jAt(Et, o, s, uJn, t, r), he.cancel(), de.cancel(), ue();else if (T === "slack-channel" && Rt < c.length) {
        if (Et) jAt(Et, o, s, NPo, t, r), le.cancel(), ue();
      } else if (aGt && T === "emoji" && Rt < c.length) {
        if (Et) jAt(Et, o, s, BPo, t, r), ue();
      } else if (T === "file" && Rt < c.length) {
        let dt = Zye(o, s, !0);
        if (dt) {
          if (Et) {
            let Dt = tct(Et.metadata),
              $t = dt.token.startsWith("@"),
              It = Dt ? `${Dt.replacement}${Dt.partial ? "" : " "}` : UPo({
                displayText: Et.displayText,
                mode: i,
                hasAtPrefix: $t,
                needsQuotes: Et.displayText.includes(" "),
                isQuoted: dt.isQuoted,
                isComplete: !0
              }),
              Zt = applyFileSuggestion(It, o, dt.token, dt.startPos, t, r);
            if (he.cancel(), de.cancel(), Dt?.partial) _e(Zt, dt.startPos + It.length);else ue();
          }
        }
      } else if (T === "directory" && Rt < c.length) {
        if (Et) {
          if (te.current === "command-arg") {
            if (he.cancel(), de.cancel(), $e !== void 0) {
              let $t = o.indexOf(" "),
                It = o.slice(0, $t + 1),
                Zt = lGt(Et.metadata) && Et.metadata.type === "directory",
                _n = It + Et.id + (Zt ? "/" : " ");
              if (t(_n), r(_n.length), Zt) _e(_n, _n.length);else ue();
              return;
            }
            ue(), n(o, !0);
            return;
          }
          let Dt = Zye(o, s, !0) ?? Zye(o, s, !1);
          if (Dt) {
            let $t = lGt(Et.metadata) && Et.metadata.type === "directory",
              It = Bql(o, Et.id, Dt.startPos, Dt.token.length, $t);
            t(It.newInput), r(It.cursorPos);
          }
          he.cancel(), de.cancel(), ue();
        }
      }
    }, [c, u, T, e, o, s, i, t, r, n, ue, he, le, de, _e]),
    Ae = fA.useCallback(() => {
      fe();
    }, [fe]),
    ge = fA.useCallback(() => {
      he.cancel(), le.cancel(), de.cancel(), ue(), ce.current = o;
    }, [he, le, de, ue, o]),
    Ce = fA.useCallback(() => {
      l(($e: any) => ({
        ...$e,
        hoveredSuggestionId: null,
        selectedSuggestion: $e.selectedSuggestion <= 0 ? c.length - 1 : $e.selectedSuggestion - 1
      }));
    }, [c.length, l]),
    xe = fA.useCallback(() => {
      l(($e: any) => ({
        ...$e,
        hoveredSuggestionId: null,
        selectedSuggestion: $e.selectedSuggestion >= c.length - 1 ? 0 : $e.selectedSuggestion + 1
      }));
    }, [c.length, l]),
    Re = fA.useCallback(($e: any) => {
      l((Je: any) => Je.hoveredSuggestionId === $e ? Je : {
        ...Je,
        hoveredSuggestionId: $e
      });
    }, [l]),
    Me = fA.useRef(ie);
  Me.current = ie;
  let Ke = fA.useCallback(($e: any) => Me.current($e), []),
    He = fA.useMemo(() => ({
      "autocomplete:accept": Ae,
      "autocomplete:dismiss": ge,
      "autocomplete:previous": Ce,
      "autocomplete:next": xe
    }), [Ae, ge, Ce, xe]),
    Ge = c.length > 0 || !!V,
    Ye = Pwe();
  ug("autocomplete", Ge), SEn("Autocomplete", Ge), Wo(He, {
    context: "Autocomplete",
    isActive: Ge && !Ye
  });
  function ot($e: any): any {
    let Je = Ck($e);
    if (Je !== "prompt") {
      h(Je);
      let Rt = TF($e);
      t(Rt), r(Rt.length);
    } else t($e), r($e.length);
  }
  return {
    suggestions: c,
    selectedSuggestion: u,
    suggestionType: T,
    maxColumnWidth: k,
    commandArgumentHint: p,
    suggestionsEmptyMessage: m,
    inlineGhostText: V,
    handleKeyDown: ($e: any) => {
      if ($e.name === "right" && !O) {
        let {
          text: Rt,
          shownAt: Et
        } = N;
        if (Rt && Et > 0 && o === "") {
          A(), ot(Rt), $e.preventDefault(), $e.stopImmediatePropagation();
          return;
        }
      }
      if ($e.name === "tab" && !$e.shift) {
        if (c.length > 0 || V) return;
        let {
          text: Rt,
          shownAt: Et
        } = N;
        if (Rt && Et > 0 && o === "" && !O) {
          $e.preventDefault(), A(), ot(Rt);
          return;
        }
        if (o.trim() === "") $e.preventDefault(), _({
          key: "thinking-toggle-hint",
          kind: "hint",
          jsx: qPo.createElement(Text, {
            dimColor: !0
          }, "Use ", y, " to toggle thinking"),
          priority: "immediate",
          timeoutMs: 3000
        });
        return;
      }
      if (c.length === 0) return;
      let Je = $?.pendingChord != null;
      if ($e.ctrl && $e.key === "n" && !Je) {
        $e.preventDefault(), xe();
        return;
      }
      if ($e.ctrl && $e.key === "p" && !Je) {
        $e.preventDefault(), Ce();
        return;
      }
      if ($e.name === "return" && !$e.shift && !$e.meta) $e.preventDefault(), ie();
    },
    selectSuggestion: Ke,
    setHoveredSuggestion: Re,
    hoveredSuggestionId: d ?? null
  };
}
var qPo: any,
  fA: any,
  sHm: any,
  Mql: any,
  iHm: any,
  aHm: any,
  lHm: any,
  NPo: any,
  BPo: any,
  cHm: any,
  aGt: any = null,
  uJn: any,
  dJn: any = null;
var $ql = b(() => {
  Ld();
  ze();
  Ct();
  Sf();
  ZR();
  ze();
  k$();
  Ts();
  wk();
  Dd();
  O0();
  Pee();
  nct();
  configProtoStore();
  cb();
  T1t();
  fql();
  ps();
  ja();
  dr();
  bql();
  u3r();
  PPo();
  OPo();
  aU();
  Ppt();
  Lql();
  qPo = M(Te(), 1), fA = M(Te(), 1), sHm = /^@[\p{L}\p{N}\p{M}_\-./\\()[\]~:]*/u, Mql = /^[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+/u, iHm = /(@[\p{L}\p{N}\p{M}_\-./\\()[\]~:]*|[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+)$/u, aHm = /[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+$/u, lHm = /(^|[\s\u3002\u3001\uFF1F\uFF01])@([\p{L}\p{N}\p{M}_\-./\\()[\]~:]*|"[^"]*"?)$/u, NPo = /(^|\s)#([a-z0-9][a-z0-9_-]*)$/, BPo = /(^|\s):([a-z0-9_+-]{2,})$/, cHm = /(^|\s):([a-z0-9_+-]+):$/;
  uJn = /(^|[\s\u3002\u3001\uFF1F\uFF01])@([\w-]*)$/;
});
export {uHm,lGt,rde,Nql,FPo,UPo,$Po,jAt,dHm,Bql,Zye,pHm,Fql,Uql,qPo,fA,sHm,Mql,iHm,aHm,lHm,NPo,BPo,cHm,aGt,uJn,dJn,$ql};
