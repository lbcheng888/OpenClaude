// @ts-nocheck
import {djl as Dql,pjl as Pql} from "../agent/5351_columns.ts";
import {SSn as BTn,twe as Uve} from "../../vendor/m2380.ts";
import {ec as Dl,YM as NM,dd as md,Dd as Sd} from "../../vendor/m687.ts";
import {bjl as jql,Ejl as Wql} from "../../vendor/m5354.ts";
import {gjl as Bql,_jl as Fql} from "../../vendor/m5352.ts";
import {mt as ft,bo as vo,configProtoStore as fo} from "../../vendor/m2458.ts";
import {Z1t as P1t,jee as Iee,ost as Bot} from "../telemetry/3312_stdout.ts";
import {rBa as L1a,Pao as Iio,nBa as O1a,Lao as Pio} from "../../vendor/m4004.ts";
import {y2l as YFl,lYn as Tzn} from "../../vendor/m5226.ts";
import {_i as wi,hp as gp} from "../session/1460_promise.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Cne as fne,$6t as f6t} from "../../vendor/m4610.ts";
import {fjl as Lql,Ajl as Mql} from "../../vendor/m5351.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {nqe as O4e,SUn as LFn} from "../core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {ju as xu,wk as bk} from "./2564_current.ts";
import {Tjl as $ql,Sjl as qql} from "../../vendor/m5353.ts";
import {tde as $ue,JWt as gWt} from "../telemetry/5303_user_intent_store.ts";
import {useVoiceState as MH,iAe as $fe} from "../../vendor/m2457.ts";
import {_wi as pvi,useSelection as Zve,m0t as VIt} from "../../vendor/m2447.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {nft as Dmt,_ye as eye} from "../../vendor/m4860.ts";
import {yUt as XFt,kBn as WNn} from "../../vendor/m3826.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {useIsScreenReaderEnabled as tp,dwe as Jve} from "../../vendor/m2434.ts";
import {nns as Kes,wB as _B,nKe as N7e,oQ as YX,eC as JE} from "../../vendor/m717.ts";
import {AJ as tJ,Bpt as hpt} from "../../vendor/m4508.ts";
import {n6l as E4l,ode as jue,ZJ as NJ,GAt as TAt} from "../../vendor/m5335.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {VoiceWarmupHint as x8e,XYn as oYn} from "../../vendor/m5315.ts";
import {A8 as Xj,sl as rl,Fts as Hes} from "../../vendor/m715.ts";
import {fOo as oPo,sjl as wql} from "../../vendor/m5348.ts";
import {Ms as Ds,Pp as tm} from "../config/2273_loggedTmuxCcDisable.ts";
import {getIsRemoteMode as ya,lt as ct} from "../session/0131_sent.ts";
import {Oy as Dy,XS as zS} from "../config/2341_XS.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {Link as Fs,Tie as cie} from "../../vendor/m2427.ts";
import {vjl as Vql,_Oo as lPo} from "../../vendor/m5356.ts";
import {b,M as L,ro as Pr} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {KEe as IEe} from "../../vendor/m1446.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {_L as lL,lq as z4} from "../permissions/2705_matchSessionMode.ts";
// @ts-nocheck
function lb4(H_2) {
  let __2 = Gn6.c(56),
    {
      exitMessage: q,
      leftArrowPending: K_2,
      leftArrowDetachAvailable: O_2,
      vimMode: T_2,
      hideVimModeIndicator: z,
      mode: $_2,
      toolPermissionContext: Y_2,
      suppressHint: A_2,
      suppressHintExceptStatusline: w_2,
      isInputEmpty: f_2,
      isLoading: j,
      tasksSelected: J_2,
      tmuxSelected: D_2,
      isPasting: M_2,
      showExpandPasteHint: X,
      isSearching: W_2,
      historyQuery: G_2,
      setHistoryQuery: R_2,
      historyFailedMatch: h_2,
      onOpenTasksDialog: R_3
    } = H_2,
    E_2 = w_2 === undefined ? A_2 : w_2;
  Dql();
  let v_2 = BTn(),
    C_2;
  if (__2[0] !== v_2) C_2 = kJT(v_2) && !Dl(), __2[0] = v_2, __2[1] = C_2;else C_2 = __2[1];
  let S_2 = C_2,
    I_2 = jql(j, S_2),
    p_2 = Bql(),
    b_2;
  if (__2[2] !== p_2 || __2[3] !== I_2.pr || __2[4] !== S_2) b_2 = S_2 && I_2.pr ? I_2.pr : p_2 ? {
    number: p_2.number,
    url: p_2.url,
    reviewState: undefined,
    kind: undefined
  } : null, __2[2] = p_2, __2[3] = I_2.pr, __2[4] = S_2, __2[5] = b_2;else b_2 = __2[5];
  let x_2 = b_2,
    U_2 = !x_2 && S_2 && I_2.needsAuth,
    F_2 = ft(GJT),
    Q_2;
  if (__2[6] !== x_2 || __2[7] !== F_2) Q_2 = x_2 ? P1t(x_2.url, F_2) : undefined, __2[6] = x_2, __2[7] = F_2, __2[8] = Q_2;else Q_2 = __2[8];
  L1a(Q_2, x_2?.url, x_2?.kind);
  let d_2 = vo(),
    l_2 = x_2?.number,
    n_2 = x_2?.url,
    o_2 = x_2?.reviewState,
    i_2 = x_2?.kind,
    t_2 = I_2.lastUpdated > 0 || Iee.disabled,
    a_2,
    e_2;
  if (__2[9] !== i_2 || __2[10] !== l_2 || __2[11] !== o_2 || __2[12] !== n_2 || __2[13] !== t_2 || __2[14] !== F_2 || __2[15] !== d_2) a_2 = () => {
    d_2(TH => {
      let XH = !t_2 && TH.prStatus !== null && (l_2 === undefined || l_2 === TH.prStatus.number && TH.prStatus.kind === i_2 && o_2 === undefined && TH.prStatus.reviewState !== undefined),
        JH = TH.prStatus?.number === l_2 && TH.prStatus?.url === n_2 && TH.prStatus?.reviewState === o_2 && TH.prStatus?.kind === i_2,
        YH_2 = XH || JH ? TH.prStatus : l_2 !== undefined && n_2 !== undefined ? {
          number: l_2,
          url: n_2,
          reviewState: o_2,
          kind: i_2
        } : null,
        fH_2 = YFl(TH.footerLinks, Iio, O1a(YH_2, YH_2 ? YH_2.kind === "cr" ? YH_2.url : P1t(YH_2.url, F_2) : undefined));
      if (YH_2 === TH.prStatus && fH_2 === TH.footerLinks) return TH;
      return {
        ...TH,
        prStatus: YH_2,
        footerLinks: fH_2
      };
    });
  }, e_2 = [l_2, n_2, o_2, i_2, t_2, F_2, d_2], __2[9] = i_2, __2[10] = l_2, __2[11] = o_2, __2[12] = n_2, __2[13] = t_2, __2[14] = F_2, __2[15] = d_2, __2[16] = a_2, __2[17] = e_2;else a_2 = __2[16], e_2 = __2[17];
  zd.useEffect(a_2, e_2);
  let qH_2, KH_2;
  if (__2[18] !== U_2 || __2[19] !== d_2) qH_2 = () => {
    d_2(TH => TH.prNeedsAuth === U_2 ? TH : {
      ...TH,
      prNeedsAuth: U_2
    });
  }, KH_2 = [U_2, d_2], __2[18] = U_2, __2[19] = d_2, __2[20] = qH_2, __2[21] = KH_2;else qH_2 = __2[20], KH_2 = __2[21];
  if (zd.useEffect(qH_2, KH_2), q.show) {
    let TH = q.action === "clear" ? "/clear" : wi() || NM("catchupReplay") ? "detach (session keeps running)" : "exit",
      XH;
    if (__2[22] !== q.key || __2[23] !== TH) XH = D8.createElement(w, {
      dimColor: true,
      key: "exit-message"
    }, "Press ", q.key, " again to", " ", TH), __2[22] = q.key, __2[23] = TH, __2[24] = XH;else XH = __2[24];
    return XH;
  }
  if (M_2) {
    let TH;
    if (__2[25] === Symbol.for("react.memo_cache_sentinel")) TH = D8.createElement(w, {
      dimColor: true,
      key: "pasting-message"
    }, "Pasting\u2026"), __2[25] = TH;else TH = __2[25];
    return TH;
  }
  if (X && !W_2) {
    let TH;
    if (__2[26] === Symbol.for("react.memo_cache_sentinel")) TH = D8.createElement(w, {
      dimColor: true,
      key: "expand-paste-hint"
    }, "paste again to expand"), __2[26] = TH;else TH = __2[26];
    return TH;
  }
  let zH_2;
  if (__2[27] !== z || __2[28] !== W_2 || __2[29] !== T_2) zH_2 = fne() && !z && T_2 !== "NORMAL" && !W_2, __2[27] = z, __2[28] = W_2, __2[29] = T_2, __2[30] = zH_2;else zH_2 = __2[30];
  let _H_2 = zH_2,
    OH_2;
  if (__2[31] !== h_2 || __2[32] !== G_2 || __2[33] !== W_2 || __2[34] !== R_2) OH_2 = W_2 && D8.createElement(Lql, {
    value: G_2,
    onChange: R_2,
    historyFailedMatch: h_2
  }), __2[31] = h_2, __2[32] = G_2, __2[33] = W_2, __2[34] = R_2, __2[35] = OH_2;else OH_2 = __2[35];
  let AH;
  if (__2[36] !== _H_2 || __2[37] !== T_2) AH = _H_2 ? D8.createElement(w, {
    dimColor: true,
    key: "vim-indicator"
  }, "-- ", T_2, " --") : null, __2[36] = _H_2, __2[37] = T_2, __2[38] = AH;else AH = __2[38];
  let $H = !A_2 && !_H_2,
    wH_2 = !E_2 && !_H_2,
    jH;
  if (__2[39] !== f_2 || __2[40] !== j || __2[41] !== O_2 || __2[42] !== K_2 || __2[43] !== $_2 || __2[44] !== R_3 || __2[45] !== U_2 || __2[46] !== $H || __2[47] !== wH_2 || __2[48] !== J_2 || __2[49] !== D_2 || __2[50] !== Y_2) jH = D8.createElement(RJT, {
    mode: $_2,
    toolPermissionContext: Y_2,
    showHint: $H,
    denseShowHint: wH_2,
    isInputEmpty: f_2,
    isLoading: j,
    leftArrowPending: K_2,
    leftArrowDetachAvailable: O_2,
    tasksSelected: J_2,
    tmuxSelected: D_2,
    onOpenTasksDialog: R_3,
    prNeedsAuth: U_2
  }), __2[39] = f_2, __2[40] = j, __2[41] = O_2, __2[42] = K_2, __2[43] = $_2, __2[44] = R_3, __2[45] = U_2, __2[46] = $H, __2[47] = wH_2, __2[48] = J_2, __2[49] = D_2, __2[50] = Y_2, __2[51] = jH;else jH = __2[51];
  let MH;
  if (__2[52] !== OH_2 || __2[53] !== AH || __2[54] !== jH) MH = D8.createElement(B, {
    justifyContent: "flex-start",
    gap: 1
  }, OH_2, AH, jH), __2[52] = OH_2, __2[53] = AH, __2[54] = jH, __2[55] = MH;else MH = __2[55];
  return MH;
}
function GJT(H) {
  return H.settings?.prUrlTemplate;
}
function RJT({
  mode: H_2,
  toolPermissionContext: __2,
  showHint: q,
  denseShowHint: K_2,
  isInputEmpty: O_2,
  isLoading: T_2,
  leftArrowPending: z,
  leftArrowDetachAvailable: $_2,
  tasksSelected: Y_2,
  tmuxSelected: A_2,
  onOpenTasksDialog: w_2,
  prNeedsAuth: f_2
}) {
  let {
    columns: D_2
  } = hr();
  O4e();
  let M_2 = ut("tengu_copper_thistle", false),
    X_2 = xu("chat:cycleMode", "Chat", "shift+tab"),
    P_2 = ft(cH => cH.tasks),
    Z_2 = ft(cH => cH.taskDecorations),
    W_2 = ft(cH => cH.footerSelection === "tasks" && cH.coordinatorTaskIndex >= 0 || cH.footerSelection === "workflows"),
    G_2 = ft(cH => cH.footerSelection !== null),
    R_2 = ft(cH => cH.viewSelectionMode),
    h_2 = ft(cH => cH.viewingAgentTaskId),
    y_2 = ft(cH => cH.expandedView),
    E_2 = $ql({
      excludeKeyed: M_2
    }),
    v_2 = ft(VH => false),
    C_2 = $ue(),
    S_2 = MH(cH => cH.voiceState),
    I_2 = MH(VH => VH.voiceWarmingUp),
    p_2 = pvi(),
    b_2 = Zve().getState,
    x_2 = WJT?.isCoordinatorMode() === true,
    U_2 = zd.useMemo(() => Gn(Object.values(P_2), Dmt), [P_2]),
    F_2 = XFt(),
    Q_2 = F_2 !== undefined && F_2.length > 0,
    d_2 = xu("chat:cancel", "Chat", "esc").toLowerCase(),
    l_2 = xu("app:toggleTodos", "Global", "ctrl+t"),
    n_2 = xu("voice:pushToTalk", "Chat", "Space"),
    [l_3] = zd.useState(() => (vt().voiceFooterHintSeenCount ?? 0) < ZJT),
    i_2 = zd.useRef(false);
  zd.useEffect(() => {
    {
      if (!C_2 || !l_3) return;
      if (i_2?.current) return;
      if (i_2) i_2.current = true;
      let VH = (vt().voiceFooterHintSeenCount ?? 0) + 1;
      un(FH => {
        if ((FH.voiceFooterHintSeenCount ?? 0) >= VH) return FH;
        return {
          ...FH,
          voiceFooterHintSeenCount: VH
        };
      });
    }
  }, [C_2, l_3, i_2]);
  let a_2 = tp();
  if (H_2 === "bash") return D8.createElement(w, {
    color: "bashBorder"
  }, "! for shell mode");
  let e_2 = __2?.mode,
    qH_2 = !Kes(e_2),
    t_2 = h_2 ? P_2[h_2] : undefined,
    KH_2 = R_2 === "viewing-agent" && t_2?.type === "in_process_teammate",
    zH_2 = KH_2 && t_2 != null && t_2.status !== "running",
    _H_2 = U_2 > 0,
    OH_2 = (x_2 || qH_2 ? 1 : 0) + (_H_2 ? 1 : 0),
    AH_2 = !M_2 && f_2 && !E_2.some(VH => VH.key === Iio) ? D8.createElement(w, {
      key: "pr-status",
      dimColor: true
    }, "gh auth login") : null,
    $H_2 = null,
    wH_2 = OH_2 < 2 && !((AH_2 || E_2.length > 0) && D_2 < 60 + ($H_2 ? 8 : 0)) && !($H_2 && D_2 < 56),
    jH = md(),
    MH_2 = jH ? NM("setPermissionMode") && !jH.viewerOnly : !Dl(),
    TH = !KH_2 && O_2 && !G_2 && !wi() && !T_2 && tJ() && vt().leftArrowOpensAgents !== false,
    ue = !a_2 && h_2 === undefined && ykm(D_2);
  if (W_2) return D8.createElement(B, {
    height: 1,
    overflow: "hidden"
  }, D8.createElement(E4l, null));
  if (M_2) {
    let Be = U_2,
      Ke = Be >= 2,
      ke = U_2 >= 1,
      We = !!e_2 && qH_2 && MH_2,
      Ye = false,
      st = jue(P_2, Z_2, h_2).length > 0 || h_2 !== undefined && NJ(P_2[h_2]),
      Ht = wi() ? !KH_2 && O_2 && !G_2 : TH,
      qe = C_2 && S_2 === "idle" && l_3 && q,
      ze = "none";
    if (C_2 && I_2) ze = "warmup";else if (z && Ht && !a_2) ze = "agents";else if (zH_2) ze = "interrupt";else if (!K_2) ze = "none";else if (T_2 && !p_2) ze = "interrupt";else if ((ke || st) && !W_2) ze = "manage";else if (Q_2) ze = "ctrl_t";else if (Ht && !a_2) ze = "agents";else if (qe) ze = "voice";else if (We) ze = "cycle";else ze = q && !a_2 ? "shortcuts" : "none";
    let wt = y_2 === "tasks" ? "hide tasks" : "show tasks",
      Et = ze === "cycle" ? D8.createElement(w, {
        dimColor: true
      }, " ", D8.createElement(lt, {
        chord: X_2,
        action: "cycle",
        parens: true,
        format: {
          keyCase: "lower"
        }
      })) : null,
      ht = ze === "manage" && ke ? D8.createElement(w, {
        dimColor: true
      }, " ", Y_2 ? D8.createElement(lt, {
        chord: "enter",
        action: "view tasks",
        parens: true
      }) : D8.createElement(lt, {
        chord: "down",
        action: "manage",
        parens: true
      })) : null,
      Dt = null;
    if (ze === "warmup") Dt = D8.createElement(x8e, {
      key: "voice-warmup"
    });else if (ze === "manage" && !ke) Dt = D8.createElement(w, {
      dimColor: true
    }, Y_2 ? D8.createElement(lt, {
      chord: "enter",
      action: "view tasks"
    }) : D8.createElement(lt, {
      chord: "down",
      action: "manage"
    }));else if (ze === "interrupt") Dt = D8.createElement(w, {
      dimColor: true
    }, D8.createElement(lt, {
      chord: d_2,
      action: zH_2 ? "return to team lead" : "interrupt",
      format: {
        keyCase: "lower"
      }
    }));else if (ze === "ctrl_t") Dt = D8.createElement(w, {
      dimColor: true
    }, D8.createElement(lt, {
      chord: l_2,
      action: wt,
      format: {
        keyCase: "lower"
      }
    }));else if (ze === "agents") Dt = D8.createElement(w, {
      dimColor: true
    }, Xj, " ", z ? "again " : "", "for agents");else if (ze === "voice") Dt = D8.createElement(w, {
      dimColor: true
    }, "hold ", n_2, " to speak");else if (ze === "shortcuts") Dt = D8.createElement(w, {
      dimColor: true
    }, "? for shortcuts");
    let Nt = We && e_2 ? D8.createElement(w, {
        color: _B(e_2),
        key: "mode"
      }, D8.createElement(w, {
        "aria-hidden": true
      }, N7e(e_2), " "), YX(e_2).toLowerCase(), " on", Et) : null,
      Lt = null,
      en = ke ? Ke ? D8.createElement(nb4, {
        count: Be,
        selected: Y_2,
        onClick: w_2
      }) : D8.createElement(oPo, {
        tasksSelected: Y_2,
        onOpenDialog: w_2
      }) : null;
    if (!Nt && !Lt && !en && E_2.length === 0 && !Dt) return Ds() ? D8.createElement(w, null, " ") : null;
    let tn = en || E_2.length > 0 || Dt;
    return D8.createElement(B, {
      height: 1,
      overflow: "hidden"
    }, Nt && D8.createElement(B, {
      flexShrink: 0
    }, Nt, (Lt || tn) && D8.createElement(w, {
      dimColor: true
    }, " \xB7 ")), Lt && D8.createElement(B, {
      flexShrink: 0
    }, Lt, tn && D8.createElement(w, {
      dimColor: true
    }, " \xB7 ")), en && D8.createElement(B, {
      flexShrink: 0
    }, en, ht, (E_2.length > 0 || Dt) && D8.createElement(w, {
      dimColor: true
    }, " \xB7 ")), E_2.map((or, gn) => D8.createElement(B, {
      flexShrink: 0,
      key: or.url
    }, D8.createElement(db4, {
      link: or
    }), (gn < E_2.length - 1 || !!Dt) && D8.createElement(w, {
      dimColor: true
    }, " \xB7 "))), Dt && D8.createElement(w, {
      wrap: "truncate"
    }, Dt), null);
  }
  let hH = e_2 && qH_2 && MH_2 ? D8.createElement(w, {
      color: _B(e_2),
      key: "mode"
    }, D8.createElement(w, {
      "aria-hidden": true
    }, N7e(e_2), " "), YX(e_2).toLowerCase(), " on", wH_2 && D8.createElement(w, {
      dimColor: true
    }, " ", D8.createElement(lt, {
      chord: X_2,
      action: "cycle",
      parens: true,
      format: {
        keyCase: "lower"
      }
    }))) : null,
    GH = E_2.map(Be => D8.createElement(db4, {
      key: Be.key ?? Be.url,
      link: Be
    })),
    _e = [...[]],
    NH = q ? hJT(T_2, d_2, l_2, Q_2, y_2, p_2) : [];
  if (zH_2) _e.push(D8.createElement(w, {
    dimColor: true,
    key: "esc-return"
  }, D8.createElement(lt, {
    chord: d_2,
    action: "return to team lead",
    format: {
      keyCase: "lower"
    }
  })));else if (q) _e.push(...NH);
  let CH = (wi() || ya()) && $_2 && O_2 && !G_2 && !a_2 ? D8.createElement(w, {
      dimColor: true,
      key: "bg-detach"
    }, Xj, " for agents") : null,
    uH = TH && !a_2 ? D8.createElement(w, {
      dimColor: true,
      key: "fg-agents"
    }, Xj, " ", z ? "again " : "", "for agents") : null,
    ge = jue(P_2, Z_2, h_2).length > 0 || h_2 !== undefined && NJ(P_2[h_2]),
    Ce = _H_2 ? D8.createElement(oPo, {
      tasksSelected: Y_2,
      onOpenDialog: w_2
    }) : null;
  if (_e.length === 0 && !Ce && !hH && !AH_2 && GH.length === 0 && !CH && q) {
    if (!a_2) _e.push(D8.createElement(w, {
      dimColor: true,
      key: "shortcuts-hint"
    }, "? for shortcuts"));
  }
  if (uH) _e.push(uH);
  let xe = vt().copyOnSelect ?? true,
    we = p_2 && (!xe || Dy());
  if (C_2 && I_2) _e.push(D8.createElement(x8e, {
    key: "voice-warmup"
  }));else if (Ds() && we) {
    let Be = Yt() === "macos",
      Ke = Be && (b_2()?.lastPressHadAlt ?? false);
    _e.push(D8.createElement(w, {
      dimColor: true,
      key: "selection-copy"
    }, D8.createElement(hn, null, !xe && D8.createElement(lt, {
      chord: "ctrl+c",
      action: "copy"
    }), Dy() && (Ke ? D8.createElement(w, null, "set macOptionClickForcesSelection in VS Code settings") : D8.createElement(w, null, Be ? "option+click" : "shift+click", " to native select")))));
  } else if (_e.length > 0 && q && C_2 && S_2 === "idle" && NH.length === 0 && l_3) _e.push(D8.createElement(w, {
    dimColor: true,
    key: "voice-hint"
  }, "hold ", n_2, " to speak"));
  if ((Ce || ge) && q && !W_2) _e.push(D8.createElement(w, {
    dimColor: true,
    key: "manage-tasks"
  }, Y_2 ? D8.createElement(lt, {
    chord: "enter",
    action: "view tasks"
  }) : D8.createElement(lt, {
    chord: "down",
    action: "manage"
  })));
  if (_e.length === 0 && !Ce && !hH && !$H_2 && !AH_2 && GH.length === 0 && !CH) return Ds() ? D8.createElement(w, null, " ") : null;
  return D8.createElement(B, {
    height: 1,
    overflow: "hidden"
  }, hH && D8.createElement(B, {
    flexShrink: 0
  }, hH, ($H_2 || CH || AH_2 || GH.length > 0 || Ce || _e.length > 0) && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), $H_2 && D8.createElement(B, {
    flexShrink: 0
  }, $H_2, (CH || AH_2 || GH.length > 0 || Ce || _e.length > 0) && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), CH && D8.createElement(B, {
    flexShrink: 0
  }, CH, (AH_2 || GH.length > 0 || Ce || _e.length > 0) && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), AH_2 && D8.createElement(B, {
    flexShrink: 0
  }, AH_2, (GH.length > 0 || Ce || _e.length > 0) && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), GH.length > 0 && D8.createElement(B, {
    flexShrink: 0
  }, D8.createElement(hn, null, GH), (Ce || _e.length > 0) && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), Ce && D8.createElement(B, {
    flexShrink: 0
  }, Ce, _e.length > 0 && D8.createElement(w, {
    dimColor: true
  }, " \xB7 ")), _e.length > 0 && D8.createElement(w, {
    wrap: "truncate"
  }, D8.createElement(hn, null, _e)));
}
function hJT(H, _, q, K, O, T) {
  let z = O === "tasks" ? "hide tasks" : "show tasks",
    $ = K;
  return [...(H && !T ? [D8.createElement(w, {
    dimColor: true,
    key: "esc"
  }, D8.createElement(lt, {
    chord: _,
    action: "interrupt",
    format: {
      keyCase: "lower"
    }
  }))] : []), ...($ ? [D8.createElement(w, {
    dimColor: true,
    key: "toggle-tasks"
  }, D8.createElement(lt, {
    chord: q,
    action: z,
    format: {
      keyCase: "lower"
    }
  }))] : [])];
}
function kJT(H) {
  if (wi() && H === "unknown") return false;
  return vt().prStatusFooterEnabled ?? true;
}
function db4(H) {
  let _ = Gn6.c(17),
    {
      link: q
    } = H,
    K;
  if (_[0] !== q.prefix) K = q.prefix !== undefined && D8.createElement(D8.Fragment, null, D8.createElement(w, {
    dimColor: true
  }, q.prefix), " "), _[0] = q.prefix, _[1] = K;else K = _[1];
  let O = !q.color,
    T;
  if (_[2] !== q.color || _[3] !== q.label || _[4] !== O) T = D8.createElement(w, {
    color: q.color,
    dimColor: O
  }, q.label), _[2] = q.color, _[3] = q.label, _[4] = O, _[5] = T;else T = _[5];
  let z = !q.color,
    $;
  if (_[6] !== q.color || _[7] !== q.label || _[8] !== z) $ = D8.createElement(w, {
    color: q.color,
    dimColor: z,
    underline: true
  }, q.label), _[6] = q.color, _[7] = q.label, _[8] = z, _[9] = $;else $ = _[9];
  let Y;
  if (_[10] !== q.url || _[11] !== T || _[12] !== $) Y = D8.createElement(Fs, {
    url: q.url,
    fallback: T,
    assumeSupport: false
  }, $), _[10] = q.url, _[11] = T, _[12] = $, _[13] = Y;else Y = _[13];
  let A;
  if (_[14] !== K || _[15] !== Y) A = D8.createElement(w, null, K, Y), _[14] = K, _[15] = Y, _[16] = A;else A = _[16];
  return A;
}
function ykm(e) {
  return Ds() && e >= Vql;
}
var Gn6,
  D8,
  zd,
  WJT,
  ZJT = 3,
  nb4;
var Yql = b(() => {
  Je();
  cie();
  f6t();
  bk();
  JE();
  wql();
  eye();
  TAt();
  Pql();
  fo();
  Sd();
  ct();
  gp();
  hpt();
  rl();
  Yn();
  IEe();
  Mql();
  Fql();
  qql();
  LFn();
  Pio();
  Tzn();
  Bot();
  Wql();
  Jve();
  Uve();
  ts();
  qs();
  Ii();
  WNn();
  oYn();
  gWt();
  $fe();
  tm();
  lPo();
  zS();
  VIt();
  nr();
  $s();
  Gn6 = L(nt(), 1), D8 = L(Te(), 1), zd = L(Te(), 1), WJT = (lL(), Pr(z4));
  nb4 = zd.memo(function (t) {
    let n = Gn6.c(11),
      {
        count: r,
        selected: o,
        onClick: s
      } = t,
      [i, a] = zd.useState(false),
      l = o || i,
      c;
    if (n[0] === Symbol.for("react.memo_cache_sentinel")) c = D8.createElement(w, {
      "aria-hidden": true
    }, Hes, " "), n[0] = c;else c = n[0];
    let u;
    if (n[1] !== r || n[2] !== l) u = D8.createElement(w, {
      color: "background",
      inverse: l
    }, c, r, " background"), n[1] = r, n[2] = l, n[3] = u;else u = n[3];
    let d = u;
    if (!s) return d;
    let p;
    if (n[4] !== s) p = () => s(), n[4] = s, n[5] = p;else p = n[5];
    let m, f;
    if (n[6] === Symbol.for("react.memo_cache_sentinel")) m = () => a(true), f = () => a(false), n[6] = m, n[7] = f;else m = n[6], f = n[7];
    let A;
    if (n[8] !== d || n[9] !== p) A = D8.createElement(B, {
      onClick: p,
      onMouseEnter: m,
      onMouseLeave: f
    }, d), n[8] = d, n[9] = p, n[10] = A;else A = n[10];
    return A;
  });
});

export {lb4 as Rjl,GJT as t0m,RJT as n0m,hJT as o0m,kJT as s0m,db4 as wjl,ykm as i0m,Gn6 as NJn,D8 as br,zd as tV,WJT as ZIm,ZJT as e0m,nb4 as r0m,Yql as xjl};
