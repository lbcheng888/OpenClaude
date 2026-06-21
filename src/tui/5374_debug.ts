// @ts-nocheck
import {Tct,t_e,z1a,Sce} from "../../vendor/m3981.ts";
import {kE,jL} from "../../vendor/m3944.ts";
import {Pwe,ZR} from "../../vendor/m2551.ts";
import {Cne,Nul,Bul,$6t} from "../../vendor/m4610.ts";
import {Mc,bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {mcpTools,sJ} from "../../vendor/m4311.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {EOo,COo} from "./5361_ideSelection.ts";
import {isBridgeEnabled,Vk} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {isPublishToolEnabled,gae} from "../artifact/2703_isPublishToolEnabled.ts";
import {ede,NAt} from "../../vendor/m5300.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
import {sW,n9i,WRn,sA} from "../../vendor/m2782.ts";
import {uc,dk,Goe,vA,Woe,tE} from "../api/1448_month.ts";
import {O0e,eqt,tqt} from "../../vendor/m4420.ts";
import {i_,NL,K0} from "../../vendor/m3824.ts";
import {aql,lql} from "../../vendor/m5320.ts";
import {gJn,ode,Zql,GAt} from "../../vendor/m5335.ts";
import {nft,_ye} from "../../vendor/m4860.ts";
import {useClock} from "../../vendor/m2432.ts";
import {cGt,WPo} from "../../vendor/m5331.ts";
import {dql,pql} from "../telemetry/5323_inputValue.ts";
import {TF,Ck} from "../../vendor/m2514.ts";
import {ehn,FBe,Z8,isFastModeEligible} from "../telemetry/2027_word.ts";
import {xue,Zjt} from "../telemetry/4836_Zjt.ts";
import {Q6n,itl,ygo,nqt} from "../../vendor/m4425.ts";
import {jW,nIe} from "../config/3923_maxFiles.ts";
import {Ow,tyn,R4} from "../agent/2214_available.ts";
import {ju,wk} from "./2564_current.ts";
import {$rl,Fjn} from "../permissions/4462_word.ts";
import {fGn} from "./4798_start.ts";
import {hasCommand,findCommand,Sf} from "../tools/5142_toSlashCommands.ts";
import {xql,Hql,lJn,Iql,OPo} from "../../vendor/m5327.ts";
import {isAgentSwarmsEnabled,cb} from "../config/3298_isAgentSwarmsEnabled.ts";
import {EF,QK,rEn,hHi,wwe,fet,oEn,K4} from "../session/2521_id.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Text} from "../../vendor/m2423.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {eJn,tJn,nJn} from "./5319_apiKeyStatus.ts";
import {cql,uql} from "../../vendor/m5321.ts";
import {zjl,Yjl} from "../../vendor/m5367.ts";
import {e8l,t8l} from "../../vendor/m5369.ts";
import {Taa,kL,h9e} from "../permissions/3299_enabled.ts";
import {Wce,zKa,Yot} from "../tools/4310_recursive.ts";
import {sql,iql} from "../../vendor/m5319.ts";
import {Y4,Cet} from "../config/2565_Cet.ts";
import {Ie,isTmuxControlMode,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {jql,Wql,fJn,Gql,AJn} from "../../vendor/m5332.ts";
import {writeToMailbox,Tx} from "../permissions/3886_writeToMailbox.ts";
import {_Ie,C$t} from "../../vendor/m4035.ts";
import {Uql,$ql} from "./5330_displayText.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {qwi,J$r,X$r} from "../../vendor/m2465.ts";
import {getNativeCSIuTerminalDisplayName,Cwe} from "../../vendor/m2517.ts";
import {vAt,wAt,RAt} from "../../vendor/m5257.ts";
import {Ec} from "../../vendor/m2449.ts";
import {kUe,Ewe,jki,HUe} from "../../vendor/m2512.ts";
import {logFeatureBadAsync,get} from "../../vendor/m2523.ts";
import {f4l,A4l} from "../../vendor/m5301.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {XBl,C_e,qL,lo} from "../tools/5190_userPromptCount.ts";
import {iM,q9} from "../../vendor/m4604.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {qu,bk} from "../../vendor/m2291.ts";
import {Ms,TZ,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {jjl,Wjl} from "../../vendor/m5365.ts";
import {ec,YM,jb,dd,Dd} from "../../vendor/m687.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {hasAutoModeOptIn,yr} from "../config/0740_updateSettingsForSource.ts";
import {syncTeammateMode,BL} from "../../vendor/m3879.ts";
import {transitionPermissionMode,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {useApp} from "../../vendor/m2442.ts";
import {initCg,j1} from "../telemetry/2531_ignore1mTag.ts";
import {mIt,lg} from "../../vendor/m2269.ts";
import {qw,UZ} from "../telemetry/2468_action.ts";
import {je} from "../../vendor/m577.ts";
import {getSettingsSchema,k$} from "../../vendor/m2541.ts";
import {Wwi,gwe} from "../../vendor/m2466.ts";
import {bUe} from "../../vendor/m2461.ts";
import {Wo,Or,Ts} from "../../vendor/m2542.ts";
import {OJn,G6l,V6l} from "./5345_frameExpanded.ts";
import {NG,oj,kue} from "../agent/4859_evictAfter.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {pJn,qql,jPo} from "../../vendor/m5330.ts";
import {WJn,DOo} from "../../vendor/m5372.ts";
import {useIsScreenReaderEnabled} from "../../vendor/m2434.ts";
import {r8l,o8l} from "../../vendor/m5370.ts";
import {XDe,mVn} from "../../vendor/m4910.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {xil,Hil,Iil,kil,Fyo} from "../../vendor/m4524.ts";
import {sZ,Om} from "../config/2215_level.ts";
import {$jl,hGt,HOo} from "../../vendor/m5364.ts";
import {a8l,l8l} from "../../vendor/m5371.ts";
import {zl,DUe} from "../../vendor/m2521.ts";
import {apiKeyHelperCache,tAe} from "../../vendor/m2352.ts";
import {zIt,YIt} from "../../vendor/m2377.ts";
import {X8n,Q8n} from "../../vendor/m4565.ts";
import {clearRefusalFallbackModelLatch,getIsRemoteMode,lt} from "../session/0131_sent.ts";
import {modelDisplayString,isOpus1mMergeEnabled,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {eDe,e6t} from "../../vendor/m4505.ts";
import {Box} from "../../vendor/m2422.ts";
import {gje,b8n} from "./4526_initial.ts";
import {fJ,r6t,z_e} from "../../vendor/m4507.ts";
import {FastModePicker,qvo} from "./4913_call.ts";
import {l6l,c6l} from "../../vendor/m5337.ts";
import {AutoModeOptInDialog,hJn} from "./5334_AutoModeOptInDialog.ts";
import {TTl,SGn} from "../../vendor/m4804.ts";
import {WorkflowDetailDialog,eVn} from "../../vendor/m4873.ts";
import {killWorkflowTask,pauseWorkflowTask,skipWorkflowAgent,retryWorkflowAgent,zIe} from "../agent/4169_updateWorkflowProgressBatch.ts";
import {sVn,yvo} from "../../vendor/m4874.ts";
import {o6l,s6l} from "./5337_initialQuery.ts";
import {Yql,Jql} from "../../vendor/m5334.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {isInProcessTeammate,Q2} from "../../vendor/m1457.ts";
import {getTeammateColor,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {aOo,j6l} from "../../vendor/m5343.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {ROo,Fjl} from "../../vendor/m5362.ts";
import {UJn,kOo} from "../../vendor/m5363.ts";
import {njl,rjl} from "../../vendor/m5347.ts";
import {Mjl,Njl} from "../../vendor/m5361.ts";
import {WUn,GUn} from "../../vendor/m3984.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {p6n} from "../../vendor/m4395.ts";
import {Te} from "../../vendor/m2253.ts";
function Z0m({
  debug: e,
  ideSelection: t,
  toolPermissionContext: n,
  setToolPermissionContext: r,
  apiKeyStatus: o,
  commands: s,
  agents: i,
  isLoading: a,
  verbose: l,
  messagesRef: c,
  hasMessages: u,
  hasAssistantMessage: d,
  lastAssistantMessageId: p,
  tokenUsage: m,
  onInputChange: f,
  mode: A,
  onModeChange: h,
  stashedPrompt: g,
  setStashedPrompt: _,
  submitCount: y,
  onShowMessageSelector: T,
  mcpClients: S,
  pastedContents: v,
  setPastedContents: R,
  showBashesDialog: k,
  setShowBashesDialog: x,
  onExit: H,
  onLeftArrowOnEmpty: I,
  getToolUseContext: P,
  onSubmit: L,
  onAgentSubmit: D,
  onDismissSideQuestion: N,
  isSideQuestionVisible: O,
  onInputOverlayActiveChange: $,
  onVimEditingChange: U,
  initialVimMode: W,
  onVimModeChange: G,
  hasSuppressedDialogs: V,
  isLocalJSXCommandActive: Q = !1,
  insertTextRef: K,
  voiceInterimRange: Y,
  sessionEnvVars: J
}) {
  let ee = Tct(),
    te = kE(),
    ne = Pwe() || Q,
    [re, oe] = Uo.useState(W ?? "INSERT");
  Uo.useEffect(() => G?.(re), [re, G]);
  let ce = Uo.useRef(!1),
    ue = Uo.useCallback(yt => {
      ce.current = !1, oe(yt);
    }, []),
    ae = Cne(),
    [he, se] = Uo.useState(!1),
    [le, pe] = Uo.useState(!1),
    de = he || le;
  Uo.useEffect(() => ($(de), () => $(!1)), [de, $]);
  let _e = ae && re !== "NORMAL";
  Uo.useEffect(() => (U(_e), () => U(!1)), [_e, U]);
  let [fe, ie] = Uo.useState(!1),
    [Ae, ge] = Uo.useState({
      show: !1
    }),
    [Ce, xe] = Uo.useState(!1),
    [Re, Me] = Uo.useState(ee.length),
    Ke = Uo.useRef(Re);
  Ke.current = Re;
  let He = Uo.useRef(v);
  He.current = v;
  let Ge = Uo.useRef(Promise.resolve()),
    Ye = Uo.useRef(ee);
  if (ee !== Ye.current) Me(ee.length), Ye.current = ee;
  let ot = Uo.useCallback(yt => {
      Ye.current = yt, f(yt);
    }, [f]),
    vt = Uo.useRef(null);
  if (K) K.current = {
    cursorOffset: Re,
    submit: (yt, an) => void vt.current?.(yt, an),
    insert: yt => {
      let hr = Re === ee.length && ee.length > 0 && !/\s$/.test(ee) ? " " + yt : yt,
        ko = ee.slice(0, Re) + hr + ee.slice(Re);
      Ye.current = ko, f(ko), Me(Re + hr.length);
    },
    setInputWithCursor: (yt, an) => {
      Ye.current = yt, f(yt), Me(an);
    }
  };
  let $e = Mc(),
    Je = bo(),
    Rt = mt(yt => yt.queueEditIndex),
    Et = Uo.useCallback(yt => {
      Je(an => an.queueEditIndex === yt ? an : {
        ...an,
        queueEditIndex: yt
      });
    }, [Je]),
    dt = Uo.useRef(ee);
  Uo.useEffect(() => {
    if (dt.current === ee) return;
    if (dt.current = ee, $e.getState().queueEditIndex !== null) Et(null);
  }, [ee, Et, $e]);
  let Dt = mcpTools(),
    $t = mt(yt => yt.tasks),
    It = mt(yt => yt.workflowDetail),
    Zt = It?.taskId;
  Uo.useEffect(() => {
    if (Zt === void 0 || $t[Zt]) return;
    Je(yt => yt.workflowDetail === void 0 ? yt : {
      ...yt,
      workflowDetail: void 0
    });
  }, [Zt, $t, Je]);
  let {
      columns: _n,
      rows: Nn
    } = mr(),
    Dn = mt(yt => yt.replBridgeError === void 0 && yt.replBridgeConnected && (yt.replBridgeExplicit || yt.replBridgeReconnecting)) && _n >= EOo && isBridgeEnabled(),
    or = mt(yt => !1),
    vr = !1,
    Yt = mt(yt => !1),
    ye = mt(yt => Object.keys(yt.frameUrls).length > 0),
    ve = ye && isPublishToolEnabled(),
    Fe = mt(yt => yt.teamContext),
    We = ede();
  Uo.useEffect(() => {
    if (Rt === null) return;
    let yt = Wn(We, sW);
    if (yt === 0) Et(null);else if (Rt > yt - 1) Et(yt - 1);
  }, [We, Rt, Et]);
  let ft = mt(yt => yt.promptSuggestion),
    ke = mt(yt => yt.speculation),
    pt = mt(yt => yt.speculationSessionTimeSavedMs),
    ut = mt(yt => yt.viewingAgentTaskId),
    Ht = mt(yt => yt.viewSelectionMode),
    Ft = mt(yt => yt.isBriefOnly) && !ut,
    An = mt(yt => yt.mainLoopModel),
    sr = mt(yt => yt.mainLoopModelForSession),
    Pr = mt(yt => yt.thinkingEnabled),
    nr = mt(yt => uc() ? yt.fastMode : !1),
    Vr = mt(yt => yt.effortValue),
    io = mt(yt => yt.ultracode),
    vs = O0e($e.getState()),
    ho = vs?.identity.agentName,
    Sn = vs?.identity.color && i_.includes(vs.identity.color) ? vs.identity.color : void 0,
    Mn = eqt($e.getState()),
    Eo = Mn.type === "leader" ? void 0 : $e.getState().transcripts[Mn.task.id]?.messages ?? X0m,
    wr = Uo.useMemo(() => Eo ? tDm(Eo) : void 0, [Eo]),
    Ot = Uo.useMemo(() => {
      if (vs) return {
        ...n,
        mode: vs.permissionMode
      };
      return n;
    }, [vs, n]),
    {
      historyQuery: jn,
      setHistoryQuery: yn,
      historyMatch: en,
      historyFailedMatch: nt,
      handleKeyDown: Co,
      openSearch: fr
    } = aql(yt => {
      R(yt.pastedContents), nO(yt.display);
    }, ee, ot, Me, Re, h, A, he, se, R, v),
    is = Uo.useRef(-1);
  if (is.current === -1) is.current = eDm(c.current);
  let cs = Uo.useRef(!1),
    [Kr, vn] = Uo.useState(!1),
    Hr = mt(yt => yt.coordinatorTaskIndex),
    qo = mt(yt => yt.taskDecorations),
    Bo = Uo.useCallback(yt => Je(an => {
      let hr = typeof yt === "function" ? yt(an.coordinatorTaskIndex) : yt;
      if (hr === an.coordinatorTaskIndex) return an;
      return {
        ...an,
        coordinatorTaskIndex: hr
      };
    }), [Je]),
    Jt = gJn(),
    cn = Uo.useMemo(() => Object.values($t).some(nft), [$t]),
    En = cn ? -1 : 0,
    Un = Uo.useMemo(() => ode($t, qo, ut).map(yt => yt.id), [$t, qo, ut]),
    Cr = Uo.useRef(Un);
  Uo.useEffect(() => {
    let yt = Cr.current;
    Cr.current = Un;
    let an = Zql(Hr, yt, Un);
    if (an !== Hr) Bo(an);else if (Hr >= Jt) Bo(Math.max(En, Jt - 1));else if (Hr < En) Bo(En);
  }, [Un, Jt, Hr, En, Bo]);
  let [Ir, so] = Uo.useState(!1),
    [xs, As] = Uo.useState(!1),
    hl = useClock(),
    us = Uo.useRef(null);
  Uo.useEffect(() => () => {
    if (us.current) us.current();
  }, []);
  let [_c, Ei] = Uo.useState(!1),
    [$i, ti] = Uo.useState(!1),
    [zm, ll] = Uo.useState(!1),
    [Hl, Aa] = Uo.useState(!1),
    [Hs, Ki] = Uo.useState(!1),
    [jo, z] = Uo.useState(!1),
    [be, Ve] = Uo.useState(null),
    Ze = Uo.useRef(null);
  Uo.useEffect(() => () => {
    if (Ze.current) Ze.current(), Ze.current = null;
  }, []);
  let Kt = Uo.useMemo(() => be !== null && !vs ? {
      ...Ot,
      mode: "auto"
    } : Ot, [Ot, be, vs]),
    bn = Uo.useMemo(() => cGt($t), [$t]),
    Jn = Jt > 0 || cn,
    Qo = bn.length > 0 && A === "prompt" && !Ae.show && !Ir,
    Zo = Uo.useMemo(() => [Jn && "tasks", Qo && "workflows", vr && "tmux", Yt && "bagel", Dn && "bridge", ve && "frame"].filter(Boolean), [Jn, Qo, vr, Yt, Dn, ve]),
    hs = mt(yt => yt.workflowFooterIndex),
    Bi = Uo.useCallback(yt => Je(an => {
      let hr = typeof yt === "function" ? yt(an.workflowFooterIndex) : yt;
      if (hr === an.workflowFooterIndex) return an;
      return {
        ...an,
        workflowFooterIndex: hr
      };
    }), [Je]),
    rc = Uo.useMemo(() => bn.map(yt => yt.id), [bn]),
    cp = Uo.useRef(rc);
  Uo.useEffect(() => {
    let yt = cp.current;
    cp.current = rc;
    let an = yt[hs];
    if (an !== void 0) {
      let hr = rc.indexOf(an);
      if (hr !== -1 && hr !== hs) {
        Bi(hr);
        return;
      }
    }
    if (hs >= rc.length) Bi(Math.max(0, rc.length - 1));
  }, [rc, hs, Bi]);
  let Hd = mt(yt => yt.footerSelection),
    Fc = Hd && Zo.includes(Hd) ? Hd : null;
  Uo.useEffect(() => {
    if (Hd && !Fc) Je(yt => yt.footerSelection === null ? yt : {
      ...yt,
      footerSelection: null,
      frameExpanded: !1
    });
  }, [Hd, Fc, Je]);
  let Wd = Fc === "tasks",
    cf = Fc === "workflows",
    Em = Fc === "tmux",
    Yy = Fc === "bagel",
    wp = Fc === "bridge",
    bh = Fc === "frame";
  function U_(yt) {
    if (Je(an => {
      if (an.footerSelection === yt) return an;
      if (yt === "frame") return {
        ...an,
        footerSelection: yt,
        frameNavPath: Object.keys(an.frameUrls).at(-1) ?? null,
        frameExpanded: !1
      };
      if (an.footerSelection === "frame") return {
        ...an,
        footerSelection: yt,
        frameExpanded: !1
      };
      return {
        ...an,
        footerSelection: yt
      };
    }), yt === "tasks") Bo(En);
    if (yt === "workflows") Bi(0);
  }
  function Jy(yt, an = !1) {
    let hr = Fc ? Zo.indexOf(Fc) : -1,
      ko = Zo[hr + yt];
    if (ko) {
      if (U_(ko), ko === "tasks" && yt < 0 && Jt > 0) Bo(Jt - 1);
      if (ko === "workflows" && yt < 0) Bi(Math.max(0, bn.length - 1));
      return !0;
    }
    if (yt < 0 && an) return U_(null), !0;
    return !1;
  }
  let {
      suggestion: kS,
      markAccepted: cw,
      logOutcomeAtSubmission: Jh,
      markShown: HS
    } = dql({
      inputValue: ee,
      isAssistantResponding: a
    }),
    Cm = Uo.useMemo(() => he && en ? TF(typeof en === "string" ? en : en.display) : ee, [he, en, ee]),
    gy = Uo.useMemo(() => ehn(Cm), [Cm]),
    $_ = mt(yt => yt.ultraplanSessionUrl),
    pm = mt(yt => yt.ultraplanLaunching),
    u_ = Uo.useMemo(() => xue() && !$_ && !pm ? Q6n(Cm) : [], [Cm, $_, pm]),
    Xy = Uo.useMemo(() => jW() ? itl(Cm) : [], [Cm]),
    qi = Uo.useMemo(() => Ow() && tyn() ? ygo(Cm) : [], [Cm]),
    [WA, d_] = Uo.useState(!1),
    GC = Uo.useRef(!1),
    Xn = ju("chat:workflowKeywordToggle", "Chat", "alt+w"),
    Xs = Uo.useMemo(() => $rl(Cm), [Cm]),
    xa = Uo.useMemo(() => fGn(Cm).filter(an => {
      let hr = Cm.slice(an.start + 1, an.end);
      return hasCommand(hr, s);
    }), [Cm, s]),
    Ga = Uo.useMemo(() => [], [Cm]),
    Ea = Uo.useSyncExternalStore(xql, Hql),
    Gc = Uo.useMemo(() => lJn($e.getState().mcp.clients) ? Iql(Cm) : [], [Cm, $e.getState]),
    yc = Uo.useMemo(() => {
      if (!isAgentSwarmsEnabled()) return [];
      if (!Fe?.teammates) return [];
      let yt = [],
        an = Fe.teammates;
      if (!an) return yt;
      let hr = /(^|\s)@([\w-]+)/g,
        ko = Object.values(an),
        Ks;
      while ((Ks = hr.exec(Cm)) !== null) {
        let Ml = Ks[1] ?? "",
          VA = Ks.index + Ml.length,
          Zy = Ks[0].trimStart(),
          Qh = Ks[2],
          qx = ko.find(p3 => p3.name === Qh);
        if (qx?.color) {
          let p3 = NL[qx.color];
          if (p3) yt.push({
            start: VA,
            end: VA + Zy.length,
            themeColor: p3
          });
        }
      }
      return yt;
    }, [Cm, Fe]),
    Zc = Uo.useMemo(() => EF(Cm).filter(yt => yt.match.startsWith("[Image")).map(yt => ({
      start: yt.index,
      end: yt.index + yt.match.length
    })), [Cm]),
    Za = Zc.some(yt => yt.start === Re);
  Uo.useEffect(() => {
    let yt = Zc.find(an => Re > an.start && Re < an.end);
    if (yt) {
      let an = (yt.start + yt.end) / 2;
      Me(Re < an ? yt.start : yt.end);
    }
  }, [Re, Zc]);
  let hd = Uo.useMemo(() => {
      let yt = [];
      for (let an of Zc) if (Re === an.start) yt.push({
        start: an.start,
        end: an.end,
        color: void 0,
        inverse: !0,
        priority: 8
      });
      if (he && en && !nt) yt.push({
        start: Re,
        end: Re + jn.length,
        color: "warning",
        priority: 20
      });
      for (let an of Xs) yt.push({
        start: an.start,
        end: an.end,
        color: "warning",
        priority: 15
      });
      for (let an of xa) yt.push({
        start: an.start,
        end: an.end,
        color: "suggestion",
        priority: 5
      });
      for (let an of Ga) yt.push({
        start: an.start,
        end: an.end,
        color: "suggestion",
        priority: 5
      });
      for (let an of Gc) yt.push({
        start: an.start,
        end: an.end,
        color: "suggestion",
        priority: 5
      });
      for (let an of yc) yt.push({
        start: an.start,
        end: an.end,
        color: an.themeColor,
        priority: 5
      });
      if (Y) yt.push({
        start: Y.start,
        end: Y.end,
        color: void 0,
        dimColor: !0,
        priority: 1
      });
      if (FBe()) for (let an of gy) for (let hr = an.start; hr < an.end; hr++) yt.push({
        start: hr,
        end: hr + 1,
        color: Z8(hr - an.start),
        shimmerColor: Z8(hr - an.start, !0),
        priority: 10
      });
      if (xue()) for (let an of u_) for (let hr = an.start; hr < an.end; hr++) yt.push({
        start: hr,
        end: hr + 1,
        color: Z8(hr - an.start),
        shimmerColor: Z8(hr - an.start, !0),
        priority: 10
      });
      if (Ow() && !WA) for (let an of qi) for (let hr = an.start; hr < an.end; hr++) yt.push({
        start: hr,
        end: hr + 1,
        color: "autoAccept",
        shimmerColor: "autoAcceptShimmer",
        priority: 10
      });
      return yt;
    }, [he, jn, en, nt, Re, Xs, Zc, yc, xa, Ga, Gc, Y, gy, u_, qi, WA]),
    {
      addNotification: ka,
      removeNotification: gd
    } = Ui();
  Uo.useEffect(() => {
    if (gy.length && FBe()) ka({
      key: "ultrathink-active",
      kind: "feedback",
      text: "Deeper reasoning requested for this turn",
      priority: "immediate",
      timeoutMs: 5000
    });else gd("ultrathink-active");
  }, [ka, gd, gy.length]), Uo.useEffect(() => {
    if (xue() && u_.length) ka({
      key: "ultraplan-active",
      kind: "feedback",
      text: "This prompt will launch an ultraplan session in Claude Code on the web",
      priority: "immediate",
      timeoutMs: 5000
    });else gd("ultraplan-active");
  }, [ka, gd, u_.length]), Uo.useEffect(() => {
    if (jW() && Xy.length) ka({
      key: "ultrareview-active",
      kind: "contextual",
      text: "Run /code-review ultra after Claude finishes to review these changes in the cloud",
      priority: "immediate",
      timeoutMs: 5000
    });
  }, [ka, Xy.length]), Uo.useEffect(() => {
    if (Ow() && qi.length && !WA) ka({
      key: "workflow-keyword-active",
      text: `Dynamic workflow requested for this turn${Xn ? ` \xB7 ${Xn} to ignore` : ""}`,
      priority: "immediate",
      timeoutMs: 30000
    });else gd("workflow-keyword-active");
  }, [ka, gd, qi.length, WA, Xn]), Uo.useEffect(() => {
    if (qi.length === 0 && WA) d_(!1), GC.current = !1, gd("workflow-keyword-ignored");
  }, [qi.length, WA, gd]);
  let el = Uo.useCallback(() => {
      if (qi.length === 0) return;
      let yt = !GC.current;
      if (d_(yt), GC.current = yt, yt) logEvent("tengu_workflow_keyword_dismissed", {}), ka({
        key: "workflow-keyword-ignored",
        text: `Ultracode keyword ignored for this prompt${Xn ? ` \xB7 ${Xn} to undo` : ""}`,
        priority: "immediate",
        timeoutMs: 5000
      });else logEvent("tengu_workflow_keyword_restored", {}), gd("workflow-keyword-ignored");
    }, [qi.length, Xn, ka, gd]),
    Df = Uo.useRef(ee.length),
    tt = Uo.useRef(ee.length),
    it = Uo.useCallback(() => {
      gd("stash-hint");
    }, [gd]);
  Uo.useEffect(() => {
    let yt = Df.current,
      an = tt.current,
      hr = ee.length;
    if (Df.current = hr, hr > an) {
      tt.current = hr;
      return;
    }
    if (hr === 0) {
      tt.current = 0;
      return;
    }
    let ko = an >= 20 && hr <= 5,
      Ks = yt >= 20 && hr <= 5;
    if (ko && !Ks) {
      if (!getGlobalConfig().hasUsedStash) ka({
        key: "stash-hint",
        kind: "hint",
        jsx: bi.createElement(Text, {
          dimColor: !0
        }, "Tip:", " ", bi.createElement(lr, {
          action: "chat:stash",
          context: "Chat",
          fallback: "ctrl+s",
          description: "stash"
        })),
        priority: "immediate",
        timeoutMs: eJn
      });
      tt.current = hr;
    }
  }, [ee.length, ka]);
  let {
      pushToBuffer: un,
      undo: Dr,
      canUndo: po,
      clearBuffer: Ii
    } = cql({
      maxBufferSize: 50,
      debounceMs: 1000
    }),
    ol = Uo.useCallback((yt, an, hr, ko) => {
      let Ks = !ko?.continuesGesture && ae && (re !== "INSERT" || !ce.current);
      un(yt, an, hr, {
        immediate: Ks
      }), ce.current = ae;
    }, [un, re, ae]);
  zjl({
    input: ee,
    pastedContents: v,
    onInputChange: ot,
    setCursorOffset: Me,
    setPastedContents: R
  });
  let td = e8l({
      input: ee,
      submitCount: y,
      hasMessages: u,
      viewingAgentName: ho
    }),
    mm = Uo.useCallback(yt => {
      if (yt === "?") {
        logEvent("tengu_help_toggled", {}), pe(Ml => !Ml);
        return;
      }
      pe(!1), it(), Taa(), Wce(Je);
      let an = yt.length === ee.length + 1,
        hr = Re === 0,
        ko = Ck(yt);
      if (hr && ko !== "prompt") {
        if (an) {
          h(ko);
          return;
        }
        if (ee.length === 0) {
          h(ko);
          let Ml = TF(yt).replaceAll("\t", "    ");
          ol(ee, Re, v), ot(Ml), Me(Ml.length);
          return;
        }
      }
      let Ks = yt.replaceAll("\t", "    ");
      if (ee !== Ks) ol(ee, Re, v);
      Je(Ml => Ml.footerSelection === null ? Ml : {
        ...Ml,
        footerSelection: null,
        frameExpanded: !1
      }), ot(Ks);
    }, [ot, h, ee, Re, ol, v, it, Je]),
    {
      resetHistory: tl,
      onHistoryUp: Tc,
      onHistoryDown: VC,
      dismissSearchHint: mR,
      historyIndex: Eh,
      historyTotal: IS,
      historyEdited: Ll
    } = sql((yt, an, hr) => {
      mm(yt), h(an), R(hr);
    }, ee, v, Me, A, wr);
  Uo.useEffect(() => {
    tl();
  }, [ut, tl]), Uo.useEffect(() => {
    if (he) mR();
  }, [he, mR]);
  function Xh() {
    if (wM.length > 1) return;
    let yt = ee.indexOf(`
`);
    if (yt !== -1 && Re > yt) return;
    let an = Wn(We, sW);
    if (Y4()) {
      let hr = $e.getState().queueEditIndex;
      if (hr === null && an > 0) {
        Et(an - 1);
        return;
      }
      if (hr !== null) {
        if (hr > 0) Et(hr - 1);else Et(null), Tc();
        return;
      }
    } else if (an > 0) {
      yy();
      return;
    }
    Tc();
  }
  function rB() {
    if (wM.length > 1) return;
    let yt = ee.lastIndexOf(`
`);
    if (yt !== -1 && Re <= yt) return;
    if (Y4()) {
      let an = $e.getState().queueEditIndex;
      if (an !== null) {
        let hr = Wn(We, sW);
        if (an < hr - 1) Et(an + 1);else Et(null);
        return;
      }
    }
    if (VC() && Zo.length > 0) {
      let an = Zo[0];
      if (U_(an), an === "tasks" && !getGlobalConfig().hasSeenTasksHint) saveGlobalConfig(hr => hr.hasSeenTasksHint ? hr : {
        ...hr,
        hasSeenTasksHint: !0
      });
    }
  }
  let [eO, tO] = Uo.useState({
      suggestions: [],
      selectedSuggestion: -1,
      hoveredSuggestionId: null,
      commandArgumentHint: void 0
    }),
    Ej = Uo.useCallback(yt => {
      tO(an => typeof yt === "function" ? yt(an) : yt);
    }, []),
    DI = Uo.useCallback(() => {
      let yt = $e.getState().queueEditIndex;
      if (yt === null) return !1;
      let an = n9i(yt, ee, Re);
      if (Et(null), !an) return !1;
      if (ot(an.text), h("prompt"), Me(an.cursorOffset), an.images.length > 0) R(hr => {
        let ko = {
          ...hr
        };
        for (let Ks of an.images) ko[Ks.id] = Ks;
        return ko;
      });
      return Ie("input_queue_pop_to_edit"), !0;
    }, [ot, h, ee, Re, R, Et, $e]),
    nO = Uo.useCallback(async (yt, an = !1) => {
      yt = yt.trimEnd();
      let hr = $e.getState();
      if (Y4() && hr.queueEditIndex !== null && DI()) return;
      if (hr.footerSelection && Zo.includes(hr.footerSelection)) return;
      if (Ze.current !== null) {
        Ze.current(), Ze.current = null, z(!0), logForDebugging("[auto-mode] onSubmit: consent debounce pending \u2014 showing opt-in dialog instead of submitting");
        return;
      }
      let ko = Object.values(v).some(Qh => Qh.type === "image"),
        Ks = ft.text;
      if (yt === Ks && Ks && !ko && !hr.viewingAgentTaskId) {
        if (ke.status === "active" && Date.now() - ke.startTime > zKa) Wce(Je, "stale");else if (ke.status === "active") {
          cw(), Jh(Ks, {
            skipReset: !0
          }), tl(), L(Ks, {
            setCursorOffset: Me,
            clearBuffer: Ii,
            resetHistory: () => {}
          }, {
            state: ke,
            speculationSessionTimeSavedMs: pt,
            setAppState: Je
          });
          return;
        }
        if (ft.shownAt > 0) cw();
      }
      if (isAgentSwarmsEnabled()) {
        let Qh = jql(yt);
        if (Qh) {
          let qx = await Wql(Qh.recipientName, QK(Qh.message, v), Fe, writeToMailbox);
          if (qx.success) {
            ka({
              key: "direct-message-sent",
              kind: "feedback",
              text: `Sent to @${qx.recipientName}`,
              priority: "immediate",
              timeoutMs: 3000
            }), ot(""), R({}), Me(0), Ii(), tl(), Ie("input_at_member_message");
            return;
          } else if (qx.error === "no_team_context") ;
        }
      }
      if (yt.trim() === "" && !ko) {
        Ie("prompt_submit_empty");
        return;
      }
      let VA = eO.suggestions.length > 0 && eO.suggestions.every(Qh => Qh.description === "directory");
      if (eO.suggestions.length > 0 && !an && !VA) {
        logForDebugging(`[onSubmit] early return: suggestions showing (count=${eO.suggestions.length})`);
        return;
      }
      if (ft.text && ft.shownAt > 0) Jh(yt);
      gd("stash-hint"), tl();
      let Zy = eqt($e.getState());
      if (Zy.type !== "leader" && D) {
        let Qh = _Ie(yt),
          qx = Qh && findCommand(Qh.commandName, s);
        if (!(qx?.type === "local" || qx?.type === "local-jsx")) {
          logEvent("tengu_transcript_input_to_teammate", {}), await D(yt, Zy.task, {
            setCursorOffset: Me,
            clearBuffer: Ii,
            resetHistory: () => {}
          });
          return;
        }
      }
      await L(yt, {
        setCursorOffset: Me,
        clearBuffer: Ii,
        resetHistory: () => {}
      }, void 0, GC.current ? {
        suppressWorkflowKeyword: !0
      } : void 0);
    }, [ft, ke, pt, Fe, $e, Zo, eO.suggestions, s, L, D, Ii, tl, Jh, Je, cw, v, R, gd, ka, ot, DI]);
  vt.current = nO;
  let {
    suggestions: wM,
    selectedSuggestion: n2,
    commandArgumentHint: Cj,
    suggestionsEmptyMessage: rO,
    inlineGhostText: ore,
    maxColumnWidth: dde,
    handleKeyDown: vj,
    selectSuggestion: PI,
    setHoveredSuggestion: pde,
    hoveredSuggestionId: oB
  } = Uql({
    commands: s,
    onInputChange: ot,
    onSubmit: nO,
    setCursorOffset: Me,
    input: ee,
    cursorOffset: Re,
    mode: A,
    agents: i,
    setSuggestionsState: Ej,
    suggestionsState: eO,
    suppressSuggestions: he || Eh > 0,
    markAccepted: cw,
    onModeChange: h,
    sessionEnvVars: J
  });
  function uV(yt) {
    if (zm) return;
    if (Co(yt), yt.defaultPrevented || yt.didStopImmediatePropagation()) return;
    if (vj(yt), yt.defaultPrevented || yt.didStopImmediatePropagation()) return;
    if (Ow() && yt.name === "backspace" && !yt.meta && !yt.ctrl && !yt.superKey && !he && (!Cne() || re === "INSERT") && !GC.current && qi.some(an => an.end === Re)) {
      yt.preventDefault(), el();
      return;
    }
    if (zt() === "macos" && qwi(yt.key)) {
      let an = J$r[yt.key],
        hr = getNativeCSIuTerminalDisplayName();
      ka({
        key: "option-meta-hint",
        kind: "contextual",
        jsx: hr ? bi.createElement(Text, {
          dimColor: !0
        }, "To enable ", an, ", set ", bi.createElement(Text, {
          bold: !0
        }, "Option as Meta"), " in", " ", hr, " preferences (\u2318,)") : bi.createElement(Text, {
          dimColor: !0
        }, "To enable ", an, ", run /terminal-setup"),
        priority: "immediate",
        timeoutMs: 5000
      });
    }
    if (Qy(yt), yt.name === "escape") {
      if (oO()) return;
      if (Cne() && re !== "NORMAL") return;
      if (!Y4()) {
        if (We.some(sW)) {
          yy();
          return;
        }
      }
      if (u && !ee && !a) RM();
    }
    if (yt.name === "return" && le) pe(!1);
  }
  function Qy(yt) {
    let an = Y4() && yt.name === "escape";
    if ((Re === 0 || an) && (yt.name === "escape" || yt.name === "backspace" || yt.name === "delete" || yt.ctrl && yt.key === "u")) h("prompt"), pe(!1);
    if (le && ee === "" && (yt.name === "backspace" || yt.name === "delete")) pe(!1);
  }
  function oO() {
    if ($e.getState().queueEditIndex !== null) return Et(null), !0;
    if (ke.status === "active") return Wce(Je), !0;
    if (O && N) return N(), !0;
    if (le) return pe(!1), !0;
    return !1;
  }
  function sO(yt) {
    if (Qy(yt), yt.ctrl || yt.meta) return;
    if (Cne() && re === "NORMAL") {
      if (yt.key === "j") return yt.preventDefault(), l3();
      if (yt.key === "k") return yt.preventDefault(), mH();
      if (yt.key === "l") return yt.preventDefault(), vD();
      if (yt.key === "h") return yt.preventDefault(), aB();
    }
    if ([...yt.key].length === 1) yt.preventDefault(), mm(ee.slice(0, Re) + yt.key + ee.slice(Re)), Me(Re + yt.key.length);
  }
  let nd = A === "prompt" && wM.length === 0 && kS && !ut;
  if (nd) HS();
  if (ft.text && !kS && ft.shownAt === 0 && !ut) kL("timing", ft.text), Je(yt => ({
    ...yt,
    promptSuggestion: {
      text: null,
      promptId: null,
      shownAt: 0,
      acceptedAt: 0,
      generationRequestId: null
    }
  }));
  function o3(yt, an, hr, ko, Ks, Ml) {
    logEvent("tengu_paste_image", {}), Ie(Ks ? "input_image_drag" : "input_image_paste"), h("prompt");
    let VA = is.current++,
      Zy = {
        id: VA,
        type: "image",
        content: yt,
        mediaType: an || "image/png",
        filename: hr || "Pasted image",
        dimensions: ko,
        sourcePath: Ks
      };
    vAt(Zy, Je), wAt(Zy, Je), R(qx => ({
      ...qx,
      [VA]: Zy
    })), He.current = {
      ...He.current,
      [VA]: Zy
    };
    let Qh = cs.current ? " " : "";
    _y(Qh + rEn(VA), {
      continuesGesture: Ml
    }), cs.current = !0;
  }
  let wj = Uo.useMemo(() => Object.values(v).some(yt => yt.type === "image"), [v]);
  Uo.useEffect(() => {
    if (!wj) return;
    let yt = new Set(EF(ee).map(an => an.id));
    R(an => {
      let hr = Object.values(an).filter(Ks => Ks.type === "image" && !yt.has(Ks.id));
      if (hr.length === 0) return an;
      let ko = {
        ...an
      };
      for (let Ks of hr) delete ko[Ks.id];
      return ko;
    });
  }, [ee, wj, R]);
  function sre(yt) {
    let an = hHi(ee, v);
    if (an?.id !== yt) return !1;
    if (ol(ee, Re, v), ot(an.expanded), Me(an.cursorOffset), R(hr => {
      let {
        [an.id]: ko,
        ...Ks
      } = hr;
      return Ks;
    }), us.current) us.current(), us.current = null;
    return As(!1), !0;
  }
  function dV(yt) {
    cs.current = !1;
    let an = Ec(yt).replace(/\r\n|\r/g, `
`).replaceAll("\t", "    ");
    if (ee.length === 0) {
      let Ml = Ck(an);
      if (Ml !== "prompt") h(Ml), an = TF(an);
    }
    let hr = is.current - 1;
    if (v[hr]?.type === "text" && v[hr].content === an && sre(hr)) return;
    let ko = wwe(an),
      Ks = Math.max(0, Math.min(Nn - 10, 2));
    if (an.length > kUe || ko > Ks) {
      Ie("input_paste_large");
      let Ml = is.current++,
        VA = {
          id: Ml,
          type: "text",
          content: an
        };
      if (R(Zy => ({
        ...Zy,
        [Ml]: VA
      })), _y(fet(Ml, ko)), an.length <= oEn) {
        if (As(!0), us.current) us.current();
        us.current = hl.setTimeout(() => {
          As(!1), us.current = null;
        }, 8000);
      }
    } else _y(an);
  }
  let sB = Uo.useCallback((yt, an) => {
    if (!cs.current) return yt;
    if (cs.current = !1, Nul(yt, an) && !Bul(yt)) return " " + yt;
    return yt;
  }, []);
  function _y(yt, an) {
    let hr = Ye.current,
      ko = Ke.current;
    ol(hr, ko, He.current, an);
    let Ks = hr.slice(0, ko) + yt + hr.slice(ko);
    ot(Ks), Ke.current = ko + yt.length, Me(ko + yt.length);
  }
  let RM = logFeatureBadAsync(() => {}, () => T()),
    yy = Uo.useCallback(() => {
      let yt = WRn(ee, Re);
      if (!yt) return !1;
      if (ot(yt.text), h("prompt"), Me(yt.cursorOffset), yt.images.length > 0) R(an => {
        let hr = {
          ...an
        };
        for (let ko of yt.images) hr[ko.id] = ko;
        return hr;
      });
      return Ie("input_queue_pop_to_edit"), !0;
    }, [ot, h, ee, Re, R]);
  f4l(S, function (yt) {
    logEvent("tengu_ext_at_mentioned", {});
    let an,
      hr = u8l.relative(Pt(), yt.filePath);
    if (yt.lineStart && yt.lineEnd) an = yt.lineStart === yt.lineEnd ? `@${hr}#L${yt.lineStart} ` : `@${hr}#L${yt.lineStart}-${yt.lineEnd} `;else an = `@${hr} `;
    let ko = ee[Re - 1] ?? " ";
    if (!/\s/.test(ko)) an = ` ${an}`;
    _y(an);
  });
  let Pf = Uo.useCallback(() => {
      if (po) {
        let yt = Dr();
        if (yt) ot(yt.text), Me(yt.cursorOffset), R(yt.pastedContents);
      }
    }, [po, Dr, ot, R]),
    s3 = Uo.useCallback(() => {
      ol(ee, Re, v);
      let yt = ee.slice(0, Re) + `
` + ee.slice(Re);
      ot(yt), Me(Re + 1);
    }, [ee, Re, ot, ol, v]),
    i3 = Uo.useCallback(async () => {
      logEvent("tengu_external_editor_used", {}), Ei(!0);
      try {
        let yt = getGlobalConfig().externalEditorContext ? XBl(c.current).messages.join(`

`) || void 0 : void 0,
          an = await iM(ee, v, yt);
        if (an.error) ka({
          key: "external-editor-error",
          kind: "warning",
          text: an.error,
          color: "warning",
          priority: "high"
        }), isTmuxControlMode("input_external_editor", "editor_error");else Ie("input_external_editor");
        if (an.content !== null && an.content !== ee) ol(ee, Re, v), ot(an.content), Me(an.content.length);
      } catch (yt) {
        if (yt instanceof Error) De(yt);
        ka({
          key: "external-editor-error",
          kind: "warning",
          text: `External editor failed: ${Se(yt)}`,
          color: "warning",
          priority: "high"
        }), Oe("input_external_editor", "spawn_failed");
      } finally {
        Ei(!1);
      }
    }, [ee, Re, v, c, ol, ot, ka]),
    iB = Uo.useCallback(() => {
      if (ee.trim() === "" && g !== void 0) {
        if (ot(g.text), Me(g.cursorOffset), R(g.pastedContents), g.launchWarning) t_e(g.launchWarning);
        _(void 0), Ie("input_stash");
      } else if (ee.trim() !== "") _({
        text: ee,
        cursorOffset: Re,
        pastedContents: v,
        launchWarning: z1a() ?? void 0
      }), ot(""), Me(0), R({}), saveGlobalConfig(yt => {
        if (yt.hasUsedStash) return yt;
        return {
          ...yt,
          hasUsedStash: !0
        };
      }), Ie("input_stash");
    }, [ee, Re, g, ot, _, v, R]),
    [Rj, r2] = Uo.useState(0);
  Uo.useLayoutEffect(() => {
    if (Rj === 0) return;
    qu.get(process.stdout)?.forceRedraw();
  }, [Rj]);
  let ire = ju("chat:clearScreen", "Chat", "cmd+k"),
    DS = ju("chat:clearInput", "Chat", "ctrl+l"),
    q_ = Uo.useRef(ire),
    _a = Uo.useCallback(yt => {
      if (!Ms()) return;
      if (yt) ge({
        show: !0,
        key: q_.current,
        action: "clear"
      });else ge(an => an.action === "clear" ? {
        show: !1
      } : an);
    }, []),
    are = Uo.useCallback(() => {
      if (!Ms()) return;
      vt.current?.("/clear", !0);
    }, []),
    OI = logFeatureBadAsync(_a, are, void 0, 2000),
    a3 = Uo.useCallback(() => {
      q_.current = ire, OI();
    }, [ire, OI]);
  jjl(a3);
  let xj = Uo.useCallback(() => {
      r2(yt => yt + 1), q_.current = DS, OI();
    }, [DS, OI]),
    kj = Uo.useCallback(() => {
      if (!ec()) return !1;
      return ka({
        key: "remote-inference-config-unavailable",
        kind: "feedback",
        text: "Fast mode switching in cloud sessions is coming soon \u2014 set at session creation for now",
        priority: "medium"
      }), !0;
    }, [ka]),
    Ty = Uo.useCallback(() => {
      if (ec() && !YM("modelCatalog")) {
        ka({
          key: "remote-model-picker-unavailable",
          kind: "feedback",
          text: "Model picker shows local options in cloud sessions \u2014 pass a model name, e.g. /model sonnet",
          priority: "medium"
        });
        return;
      }
      if (ti(yt => !yt), le) pe(!1);
    }, [le, ka]),
    dX = Uo.useCallback(() => {
      if (!jb() && kj()) return;
      if (Aa(yt => !yt), le) pe(!1);
    }, [le, ka, kj]),
    p_ = Uo.useCallback(() => {
      if (!jb() && kj()) return;
      if (Ki(yt => !yt), le) pe(!1);
    }, [le, kj]),
    KC = Uo.useCallback(() => {
      if (us.current) us.current(), us.current = null;
      if (As(!1), isAgentSwarmsEnabled() && vs && ut) {
        let Ks = {
            ...n,
            mode: vs.permissionMode
          },
          Ml = fJn(Ks, void 0);
        logEvent("tengu_mode_cycle", {
          to: fromEnum(Ml)
        }), Ie("mode_switch");
        let VA = ut;
        if (Je(Zy => {
          let Qh = Zy.tasks[VA];
          if (!Qh || Qh.type !== "in_process_teammate") return Zy;
          if (Qh.permissionMode === Ml) return Zy;
          return {
            ...Zy,
            tasks: {
              ...Zy.tasks,
              [VA]: {
                ...Qh,
                permissionMode: Ml
              }
            }
          };
        }), le) pe(!1);
        return;
      }
      let yt = be !== null ? {
        ...n,
        mode: "auto"
      } : n;
      logForDebugging(`[auto-mode] handleCycleMode: currentMode=${yt.mode} appStateMode=${n.mode} isAutoModeAvailable=${n.isAutoModeAvailable} showAutoModeOptIn=${jo} timeoutPending=${!!Ze.current}`);
      let an = fJn(yt, Fe);
      if (an === yt.mode) {
        if (Oe("mode_switch", "no_other_modes"), ec()) ka({
          key: "remote-permission-mode-noop",
          kind: "feedback",
          text: "No other permission modes are available in this cloud session",
          priority: "medium"
        });
        return;
      }
      let hr = !1;
      if (hr = an === "auto" && yt.mode !== "auto" && !hasAutoModeOptIn() && !ut, hr) {
        if (Ve(n.mode), Ze.current) Ze.current();
        if (Ze.current = hl.setTimeout(() => {
          z(!0), Ze.current = null;
        }, 800), Ie("mode_switch"), le) pe(!1);
        return;
      }
      if (jo || Ze.current) {
        if (jo) logEvent("tengu_auto_mode_opt_in_dialog_decline", {});
        if (z(!1), Ze.current) Ze.current(), Ze.current = null;
        Ve(null);
      }
      let {
        context: ko
      } = Gql(yt, Fe, "shift_tab");
      if (logEvent("tengu_mode_cycle", {
        to: fromEnum(an)
      }), !jb()) Ie("mode_switch");
      if (an === "plan") Ie("mode_plan_enter");else if (n.mode === "plan") Ie("mode_plan_exit");
      if (an === "auto") Ie("mode_auto_enter");
      if (an === "plan") saveGlobalConfig(Ks => ({
        ...Ks,
        lastPlanModeUse: Date.now()
      }));
      if (Je(Ks => ({
        ...Ks,
        toolPermissionContext: {
          ...ko,
          mode: an
        }
      })), r({
        ...ko,
        mode: an
      }), Ge.current = Ge.current.then(() => syncTeammateMode(an, Fe?.teamName)), le) pe(!1);
    }, [n, be, Fe, ut, vs, Je, r, le, jo, ka, hl]),
    FT = Uo.useCallback(() => {
      {
        z(!1), Ve(null);
        let yt = transitionPermissionMode(be ?? n.mode, "auto", n, "auto_opt_in");
        if (Je(an => ({
          ...an,
          toolPermissionContext: {
            ...yt,
            mode: "auto"
          }
        })), r({
          ...yt,
          mode: "auto"
        }), Ie("mode_auto_enter"), le) pe(!1);
      }
    }, [le, be, n, Je, r]),
    xM = Uo.useCallback(yt => {
      if (logForDebugging(`[auto-mode] handleAutoModeOptInDecline(${yt}): clearing pending consent (was ${be})`), Ie("mode_auto_opt_in_decline"), z(!1), Ze.current) Ze.current(), Ze.current = null;
      if (be) {
        if (Ve(null), yt === "dont-ask") Je(an => ({
          ...an,
          toolPermissionContext: {
            ...an.toolPermissionContext,
            isAutoModeAvailable: !1
          }
        })), r({
          ...n,
          isAutoModeAvailable: !1
        });
      }
    }, [be, n, Je, r]),
    {
      dispatchPasteEvent: kM
    } = useApp(),
    CD = Uo.useCallback(() => {
      so(!0), Ewe(initCg(te)).then(async yt => {
        if (yt) {
          o3(yt.base64, yt.mediaType, void 0, yt.dimensions);
          return;
        }
        let an = await mIt("clipboard");
        if (an && !jki(an)) {
          isTmuxControlMode("input_image_paste", "text_fallback"), kM(an);
          return;
        }
        Oe("input_image_paste", an ? "binary_garbage" : "not_found");
        let hr = qw("chat:imagePaste", "Chat", "ctrl+v"),
          ko = je.isSSH() ? "No image found in clipboard. You're SSH'd; try scp?" : `No image found in clipboard. Use ${hr} to paste images.`;
        ka({
          key: "no-image-in-clipboard",
          kind: "feedback",
          text: ko,
          priority: "immediate",
          timeoutMs: 1000
        });
      }).catch(yt => {
        Oe("input_image_paste", "clipboard_read_failed"), De(yt);
      }).finally(() => so(!1));
    }, [ka, o3, kM, te]),
    fR = getSettingsSchema();
  Uo.useEffect(() => {
    if (!fR || ne) return;
    let yt = Wwi(bUe("enter"), "Chat", fR.bindings) === "chat:submit";
    return fR.registerHandler({
      action: "chat:submit",
      context: "Chat",
      handler: () => {
        vt.current?.(Ye.current);
      },
      singleKey: !yt
    });
  }, [fR, ne]);
  let pX = Uo.useMemo(() => ({
    "chat:undo": Pf,
    "chat:newline": s3,
    "chat:clearScreen": a3,
    "chat:externalEditor": i3,
    "chat:stash": iB,
    "chat:clearInput": xj,
    "chat:modelPicker": Ty,
    "chat:thinkingToggle": p_,
    "chat:cycleMode": KC,
    "chat:imagePaste": CD
  }), [Pf, s3, a3, i3, iB, xj, Ty, p_, KC, CD]);
  Wo(pX, {
    context: "Chat",
    isActive: !ne && !he
  }), Or("chat:fastMode", dX, {
    context: "Chat",
    isActive: !ne && uc() && dk()
  }), Or("chat:workflowKeywordToggle", el, {
    context: "Chat",
    isActive: !ne && qi.length > 0
  }), Or("help:dismiss", () => {
    pe(!1);
  }, {
    context: "Help",
    isActive: le
  });
  function pV() {
    if (ec()) {
      ka({
        key: "remote-history-search-unavailable",
        kind: "feedback",
        text: "History search isn't available in cloud sessions yet",
        priority: "medium"
      });
      return;
    }
    ll(!0), pe(!1);
  }
  Or("history:search", pV, {
    context: "Global",
    isActive: TZ() && !ne
  }), Or("app:interrupt", () => {
    Wce(Je);
  }, {
    context: "Global",
    isActive: !a && ke.status === "active"
  });
  function mH() {
    if (Wd && Jt > 0 && Hr > En) {
      Bo(yt => yt - 1);
      return;
    }
    if (cf && hs > 0) {
      Bi(yt => yt - 1);
      return;
    }
    Jy(-1, !0);
  }
  function l3() {
    if (Wd && Jt > 0) {
      if (Hr < Jt - 1) {
        Bo(yt => yt + 1);
        return;
      }
      Jy(1);
      return;
    }
    if (Wd) {
      if (!Jy(1)) x(!0), U_(null);
      return;
    }
    if (cf) {
      if (hs < bn.length - 1) {
        Bi(yt => yt + 1);
        return;
      }
      Jy(1);
      return;
    }
    Jy(1);
  }
  function AR(yt) {
    Je(an => {
      let hr = Object.keys(an.frameUrls),
        ko = hr.length;
      if (ko <= 1) return an;
      let Ks = OJn(Object.entries(an.frameUrls), an.frameNavPath),
        Ml = hr[(Ks + yt + ko) % ko] ?? null;
      if (Ml === an.frameNavPath && !an.frameExpanded) return an;
      return {
        ...an,
        frameNavPath: Ml,
        frameExpanded: !1
      };
    });
  }
  function vD() {
    if (bh) {
      AR(1);
      return;
    }
    Jy(1);
  }
  function aB() {
    if (bh) {
      AR(-1);
      return;
    }
    Jy(-1);
  }
  Wo({
    "footer:up": mH,
    "footer:down": l3,
    "footer:next": vD,
    "footer:previous": aB,
    "footer:openSelected": () => {
      if (le) pe(!1);
      switch (Fc) {
        case "tasks":
          {
            let yt = Hr >= 1 ? ode($t, qo, ut)[Hr - 1]?.id : void 0;
            if (yt) NG(yt, Je);else if (Hr === 0 && Jt > 0) oj(Je);else x(!0), U_(null);
            break;
          }
        case "workflows":
          {
            let yt = bn[hs];
            if (yt) Ie("workflow_progress_preview"), Je(an => an.workflowDetail?.taskId === yt.id ? an : {
              ...an,
              workflowDetail: {
                taskId: yt.id
              }
            }), U_(null);
            break;
          }
        case "tmux":
          break;
        case "bagel":
          break;
        case "bridge":
          vn(!0), U_(null);
          break;
        case "frame":
          {
            let yt = $e.getState(),
              an = Object.entries(yt.frameUrls),
              hr = an[OJn(an, yt.frameNavPath)]?.[1]?.url;
            if (hr) Oc(hr), Ie("frame_link_open");
            Je(ko => ko.frameExpanded ? ko : {
              ...ko,
              frameExpanded: !0
            });
            break;
          }
      }
    },
    "footer:clearSelection": () => {
      if (bh && $e.getState().frameExpanded) {
        Je(yt => !yt.frameExpanded ? yt : {
          ...yt,
          frameExpanded: !1
        });
        return;
      }
      oO(), U_(null);
    },
    "footer:close": () => {
      if (Wd && Hr >= 1) {
        let yt = ode($t, qo, ut)[Hr - 1];
        if (!yt) return !1;
        if (Ht === "viewing-agent" && yt.id === ut) {
          mm(ee.slice(0, Re) + "x" + ee.slice(Re)), Me(Re + 1);
          return;
        }
        if (pJn(yt, Dt, Je) === "dismissed") Bo(hr => Math.max(En, hr - 1));
        return;
      }
      if (cf) {
        let yt = bn[hs];
        if (!yt) return !1;
        qql(yt.id, yt.status, Dt, Je);
        return;
      }
      return !1;
    }
  }, {
    context: "Footer",
    isActive: !!Fc && !ne
  });
  let c3 = WJn(),
    HM = useIsScreenReaderEnabled(),
    wD = uc() ? Goe() : !1,
    Hj = uc() ? nr && (dk() || wD) : !1,
    uw = r8l(Hj ?? !1),
    u3 = Hj ? HM ? wD ? "fast mode (cooling down)" : "fast mode" : uw ? `${XDe(!0, wD)} ${_t.reset.dim("/fast")}` : XDe(!0, wD) : void 0,
    mV = xil(Vr, te, Ft),
    fV = mV !== void 0 && sZ(te, Vr, io),
    mX = Hil(fV),
    STe = Iil([mX, u3]),
    Ij = $jl(Eh, IS, Ll),
    LI = Ij ? {
      content: ` ${_t.dim(Ij)} `,
      position: "top",
      align: "start",
      offset: 2
    } : void 0,
    fX = kil(mV, fV);
  Uo.useEffect(() => {
    if (!fX) {
      gd("effort-level");
      return;
    }
    gd("effort-level"), ka({
      key: "effort-level",
      kind: "feedback",
      text: fX,
      priority: "high",
      timeoutMs: 1e4
    });
  }, [fX, ka, gd]);
  let j_ = _n - Q0m,
    Dj = a8l(io === !0, _n),
    Pj = Ms() ? Math.max(J0m, Math.floor(Nn / 2) - Y0m) : void 0,
    lre = Uo.useCallback(yt => {
      if (he) return;
      if (Je(Ks => Ks.footerSelection === null ? Ks : {
        ...Ks,
        footerSelection: null,
        frameExpanded: !1
      }), !ee) return;
      let an = zl.fromText(ee, j_, Re),
        hr = an.getViewportStartLine(Pj),
        ko = an.measuredText.getOffsetFromPosition({
          line: yt.localRow + hr,
          column: yt.localCol
        });
      Me(ko);
    }, [ee, j_, he, Re, Pj, Je]),
    RD = Uo.useRef(null),
    cre = Uo.useRef(null);
  cre.current = yt => {
    if (!ee || he || ne) return !1;
    let an = RD.current,
      hr = an ? apiKeyHelperCache.get(an) : void 0,
      ko = zIt(yt);
    if (!hr || !ko) return !1;
    let {
      start: Ks,
      end: Ml
    } = ko;
    if (Ks.row < hr.y || Ml.row < hr.y || Ks.row >= hr.y + hr.height || Ml.row >= hr.y + hr.height) return !1;
    let VA = zl.fromText(ee, j_, Re),
      Zy = VA.getViewportStartLine(Pj),
      Qh = (dre, hV) => VA.measuredText.getOffsetFromPosition({
        line: dre - hr.y + Zy,
        column: Math.max(0, hV - hr.x)
      }),
      qx = Math.max(0, Qh(Ks.row, Ks.col)),
      p3 = Math.min(ee.length, Qh(Ml.row, Ml.col + 1));
    if (p3 <= qx) return !1;
    return ol(ee, Re, v), ot(ee.slice(0, qx) + ee.slice(p3)), Me(qx), !0;
  };
  let IM = X8n();
  Uo.useEffect(() => (IM.setHandler(yt => cre.current?.(yt) ?? !1), () => IM.setHandler(null)), [IM]);
  let o2 = Uo.useCallback(yt => x(yt ?? !0), [x]),
    mde = nd && kS ? kS : td,
    d3 = Uo.useMemo(() => ee.includes(`
`), [ee]),
    AV = Uo.useRef(!1),
    ure = Uo.useCallback((yt, an) => {
      let hr = !1;
      clearRefusalFallbackModelLatch(), Je(Ml => (hr = uc() && !vA(yt) && !!Ml.fastMode, {
        ...Ml,
        mainLoopModel: yt,
        mainLoopModelForSession: null,
        ...(hr && {
          fastMode: !1
        })
      })), ti(!1);
      let ko = (nr ?? !1) && !hr,
        Ks = `Model set to ${modelDisplayString(yt)}${AV.current ? " and saved as your default for new sessions" : " for this session only"}`;
      if (AV.current = !1, eDe(yt, ko, isOpus1mMergeEnabled())) Ks += " \xB7 Draws from usage credits";
      if (hr) Ks += " \xB7 Fast mode OFF";
      ka({
        key: "model-switched",
        kind: "feedback",
        jsx: bi.createElement(Text, null, Ks),
        priority: "immediate",
        timeoutMs: 3000
      }), logEvent("tengu_model_picker_hotkey", {
        model: yt
      });
    }, [Je, ka, nr]),
    Oj = Uo.useCallback(() => {
      AV.current = !1, ti(!1);
    }, []),
    fde = Uo.useMemo(() => {
      if (!$i) return null;
      return bi.createElement(Box, {
        flexDirection: "column",
        marginTop: 1
      }, bi.createElement(gje, {
        initial: An,
        sessionModel: sr,
        onSelect: ure,
        onSetDefault: yt => {
          if (fJ(yt)) return;
          AV.current = !0, r6t(yt);
        },
        onCancel: Oj,
        isStandaloneCommand: !0,
        showFastModeNotice: uc() && nr && vA(An) && dk()
      }));
    }, [$i, An, sr, ure, Oj, nr]),
    bTe = Uo.useCallback(yt => {
      if (Aa(!1), yt) ka({
        key: "fast-mode-toggled",
        kind: "feedback",
        jsx: bi.createElement(Text, null, yt),
        priority: "immediate",
        timeoutMs: 3000
      });
    }, [ka]),
    At = Uo.useMemo(() => {
      if (!Hl) return null;
      return bi.createElement(Box, {
        flexDirection: "column",
        marginTop: 1
      }, bi.createElement(FastModePicker, {
        onDone: bTe,
        unavailableReason: Woe()
      }));
    }, [Hl, bTe]),
    ir = Uo.useCallback(yt => {
      Je(an => ({
        ...an,
        thinkingEnabled: yt
      })), Ki(!1), dd()?.sendControlRequest({
        subtype: "set_max_thinking_tokens",
        max_thinking_tokens: yt ? null : 0
      }).catch(an => {
        logForDebugging(`[remote] set_max_thinking_tokens failed: ${an}`);
      }), logEvent("tengu_thinking_toggled_hotkey", {
        enabled: yt
      }), Ie("thinking_toggle"), ka({
        key: "thinking-toggled-hotkey",
        kind: "feedback",
        jsx: bi.createElement(Text, {
          color: yt ? "suggestion" : void 0,
          dimColor: !yt
        }, "Thinking ", yt ? "on" : "off"),
        priority: "immediate",
        timeoutMs: 3000
      });
    }, [Je, ka]),
    Zn = Uo.useCallback(() => {
      Ki(!1);
    }, []),
    Ur = Uo.useMemo(() => {
      if (!Hs) return null;
      return bi.createElement(Box, {
        flexDirection: "column",
        marginTop: 1
      }, bi.createElement(l6l, {
        currentValue: Pr ?? !0,
        onSelect: ir,
        onCancel: Zn,
        isMidConversation: d
      }));
    }, [Hs, Pr, ir, Zn, d]),
    Jr = Uo.useMemo(() => jo ? bi.createElement(AutoModeOptInDialog, {
      onAccept: FT,
      onDecline: xM
    }) : null, [jo, FT, xM]);
  TTl(Ms() ? Jr : null);
  let ui = Zt ? $t[Zt] : void 0;
  if (ui && ui.type === "local_workflow") {
    let yt = ui.status === "running",
      an = hr => {
        if (hr) ka({
          key: "workflow-save-result",
          kind: "feedback",
          text: hr,
          priority: "high",
          timeoutMs: 8000
        });
        Je(ko => ko.workflowDetail === void 0 && ko.footerSelection === null ? ko : {
          ...ko,
          workflowDetail: void 0,
          footerSelection: null
        });
      };
    return bi.createElement(WorkflowDetailDialog, {
      workflow: ui,
      initialPhaseIndex: It?.phaseIndex,
      onDone: an,
      onKill: yt ? () => killWorkflowTask(ui.id, Dt) : void 0,
      onPause: yt ? () => pauseWorkflowTask(ui.id, Dt) : void 0,
      onResume: hr => {
        an(), vt.current?.(hr, !0);
      },
      onSkipAgent: yt ? hr => skipWorkflowAgent(ui.id, hr, Dt) : void 0,
      onRetryAgent: yt ? hr => retryWorkflowAgent(ui.id, hr, Dt) : void 0
    });
  }
  if (k) return bi.createElement(sVn, {
    onDone: () => x(!1),
    toolUseContext: P(c.current, [], new AbortController(), te),
    initialDetailTaskId: typeof k === "string" ? k : void 0
  });
  if (TZ() && zm) return bi.createElement(o6l, {
    initialQuery: ee,
    onSelect: yt => {
      let an = Ck(yt.display),
        hr = TF(yt.display);
      h(an), ot(hr), R(yt.pastedContents), Me(hr.length), ll(!1);
    },
    onCancel: () => ll(!1)
  });
  if (fde) return fde;
  if (At) return At;
  if (Ur) return Ur;
  if (Kr) return bi.createElement(Yql, {
    onDone: () => {
      vn(!1), U_(null);
    }
  });
  let Zi = {
      multiline: !0,
      onKeyDownBefore: uV,
      onSubmit: nO,
      onChange: mm,
      value: en ? TF(typeof en === "string" ? en : en.display) : ee,
      onHistoryUp: Xh,
      onHistoryDown: rB,
      onHistoryReset: tl,
      placeholder: mde,
      onExit: H,
      onExitMessage: (yt, an) => ge(hr => yt ? {
        show: yt,
        key: an
      } : hr.action === "clear" ? hr : {
        show: !1
      }),
      onLeftArrowOnEmpty: I,
      onLeftArrowOnEmptyMessage: _i() || getIsRemoteMode() ? void 0 : xe,
      onImagePaste: o3,
      columns: j_,
      maxVisibleLines: Pj,
      disableCursorMovementForUpDownKeys: wM.length > 0 || !!Fc,
      disableEscapeDoublePress: wM.length > 0,
      cursorOffset: Re,
      onChangeCursorOffset: Me,
      onPaste: dV,
      onIsPastingChange: so,
      focus: !he && !ne,
      showCursor: !Fc && !he && !Za,
      argumentHint: Cj,
      onUndo: po ? () => {
        let yt = Dr();
        if (yt) ot(yt.text), Me(yt.cursorOffset), R(yt.pastedContents);
      } : void 0,
      highlights: hd,
      inlineGhostText: ore,
      inputFilter: sB
    },
    hu = HM ? {} : {
      borderColor: (() => {
        let yt = {
          bash: "bashBorder"
        };
        if (yt[A]) return yt[A];
        if (isInProcessTeammate()) return "promptBorder";
        let an = getTeammateColor();
        if (an && i_.includes(an)) return NL[an];
        return "promptBorder";
      })(),
      borderStyle: "round",
      borderLeft: !1,
      borderRight: !1,
      borderBottom: !0
    };
  if (_c) return bi.createElement(Box, {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...hu,
    width: "100%"
  }, bi.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, "Save and close editor to continue..."));
  let iu = Cne() ? bi.createElement(aOo, {
      ...Zi,
      initialMode: re,
      onModeChange: ue,
      onOpenHistorySearch: TZ() ? pV : fr
    }) : bi.createElement(Pa, {
      ...Zi
    }),
    GA = Ms() && (wM.length > 0 || jo),
    cd = c3 ? bi.createElement(bi.Fragment, null, bi.createElement(hGt, {
      banner: c3,
      columns: _n,
      fastModeTag: u3
    }), bi.createElement(Box, {
      flexDirection: "row",
      width: "100%"
    }, bi.createElement(ROo, {
      mode: A,
      isLoading: a,
      viewingAgentName: ho,
      viewingAgentColor: Sn
    }), bi.createElement(Box, {
      ref: RD,
      flexGrow: 1,
      flexShrink: 1,
      tabIndex: -1,
      onClick: lre
    }, iu)), bi.createElement(hGt, {
      banner: c3,
      columns: _n,
      fastModeTag: u3,
      borderOnly: !0
    })) : bi.createElement(bi.Fragment, null, HM && mX && bi.createElement(Text, null, mX), HM && u3 && bi.createElement(Text, {
      color: "fastMode",
      dimColor: wD
    }, u3), bi.createElement(Box, {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      ...hu,
      width: "100%",
      borderText: HM ? void 0 : Dj ?? LI ?? STe
    }, bi.createElement(ROo, {
      mode: A,
      isLoading: a,
      viewingAgentName: ho,
      viewingAgentColor: Sn
    }), bi.createElement(Box, {
      ref: RD,
      flexGrow: 1,
      flexShrink: 1,
      tabIndex: -1,
      onClick: lre
    }, iu)));
  return bi.createElement(Box, {
    flexDirection: "column",
    marginTop: Ft || GA ? 0 : 1
  }, Fc && !ne && bi.createElement(Box, {
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: sO
  }), !Ms() && bi.createElement(UJn, null), V && bi.createElement(Box, {
    marginTop: 1,
    marginLeft: 2
  }, bi.createElement(Text, {
    dimColor: !0
  }, "Waiting for permission\u2026")), !HM && cd, bi.createElement(njl, null), bi.createElement(Mjl, {
    apiKeyStatus: o,
    debug: e,
    exitMessage: Ae,
    leftArrowPending: Ce,
    leftArrowDetachAvailable: I !== void 0,
    vimMode: Cne() ? re : void 0,
    mode: A,
    isAutoUpdating: fe,
    verbose: l,
    onChangeIsUpdating: ie,
    suggestions: wM,
    selectedSuggestion: n2,
    suggestionsEmptyMessage: rO,
    maxColumnWidth: dde,
    hoveredSuggestionId: oB,
    onSelectSuggestion: PI,
    onHoverSuggestion: pde,
    toolPermissionContext: Kt,
    helpOpen: le,
    suppressHint: ee.length > 0,
    isLoading: a,
    tasksSelected: Wd,
    bridgeSelected: wp,
    tmuxSelected: Em,
    ideSelection: t,
    mcpClients: S,
    isPasting: Ir,
    showExpandPasteHint: xs,
    hasStash: g !== void 0,
    isInputWrapped: d3,
    messagesRef: c,
    lastAssistantMessageId: p,
    tokenUsage: m,
    isSearching: he,
    historyQuery: jn,
    setHistoryQuery: yn,
    historyFailedMatch: nt,
    onOpenTasksDialog: Ms() ? o2 : void 0
  }), ye && isPublishToolEnabled() ? bi.createElement(G6l, null) : null, Ms() ? null : Jr, Ms() ? bi.createElement(Box, {
    position: "absolute",
    marginTop: Ft ? -2 : -1,
    height: wM.length === 0 && !jo ? 1 : 0,
    width: "100%",
    paddingLeft: 2,
    paddingRight: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden"
  }, bi.createElement(tJn, {
    apiKeyStatus: o,
    isAutoUpdating: fe,
    verbose: l,
    tokenUsage: m,
    onChangeIsUpdating: ie,
    isInputWrapped: d3,
    hasStash: g !== void 0
  })) : null, HM && cd);
}
function eDm(e) {
  let t = 0;
  for (let n of e) if (n.type === "user") {
    if (n.imagePasteIds) {
      for (let r of n.imagePasteIds) if (r > t) t = r;
    }
    if (Array.isArray(n.message.content)) {
      for (let r of n.message.content) if (r.type === "text") {
        let o = EF(r.text);
        for (let s of o) if (s.id > t) t = s.id;
      }
    }
  }
  return t + 1;
}
function tDm(e) {
  let t = [];
  for (let n = e.length - 1; n >= 0; n--) {
    let r = e[n];
    if (r.type === "user" && !r.isMeta && !C_e(r) && !(r.origin && r.origin.kind !== "human")) {
      let o = qL(r);
      if (o?.trim() && !WUn(o) && o.length <= oEn) t.push({
        display: o,
        pastedContents: {}
      });
    }
  }
  return t;
}
var u8l,
  bi,
  Uo,
  Y0m = 5,
  J0m = 3,
  X0m,
  Q0m = 3,
  d8l;
var p8l = b(() => {
  cu();
  Ld();
  NAt();
  A4l();
  Ct();
  configProtoStore();
  sJ();
  Go();
  Cet();
  sA();
  lt();
  qvo();
  z_e();
  z_e();
  nIe();
  Cwe();
  Sf();
  ZR();
  SGn();
  K4();
  iql();
  get();
  lql();
  uql();
  jL();
  pql();
  ki();
  $ql();
  bk();
  tAe();
  YIt();
  ze();
  k$();
  gwe();
  UZ();
  Ts();
  wk();
  Dd();
  ln();
  h9e();
  Yot();
  jPo();
  tqt();
  kue();
  zIe();
  K0();
  gae();
  WPo();
  R4();
  cb();
  b_();
  DUe();
  hp();
  Qn();
  qe();
  Om();
  Lr();
  bt();
  e6t();
  tE();
  Pp();
  lg();
  HUe();
  RAt();
  X$r();
  Rn();
  lo();
  j1();
  Mo();
  AJn();
  ly();
  qs();
  q9();
  yr();
  Fjn();
  C$t();
  OPo();
  BL();
  Am();
  Q2();
  Tx();
  isFastModeEligible();
  p6n();
  Zjt();
  nqt();
  hJn();
  Vk();
  Jql();
  readRoster();
  GAt();
  Fyo();
  mVn();
  s6l();
  GUn();
  b8n();
  rh();
  c6l();
  yvo();
  _ye();
  eVn();
  j6l();
  V6l();
  Q8n();
  rjl();
  nJn();
  Njl();
  Fjl();
  kOo();
  Sce();
  COo();
  HOo();
  Wjl();
  Yjl();
  t8l();
  o8l();
  l8l();
  DOo();
  $6t();
  u8l = M(require("path")), bi = M(Te(), 1), Uo = M(Te(), 1), X0m = [];
  d8l = bi.memo(Z0m);
});
export {Z0m,eDm,tDm,u8l,bi,Uo,Y0m,J0m,X0m,Q0m,d8l,p8l};
