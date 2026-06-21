// @ts-nocheck
import {hce,_Un,yUn,iIe,act} from "./3943_children.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {useTheme} from "../../vendor/m2274.ts";
import {XR,configProtoStore} from "../../vendor/m2458.ts";
import {b1a,E1a} from "../../vendor/m3967.ts";
import {Cl,myn,Ri} from "../tools/2227_userFacingName.ts";
import {bf,aq} from "../tools/2698_allErrors.ts";
import {$ot,bW} from "../config/3273_bW.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {lao} from "./3966_param.ts";
import {Box} from "../../vendor/m2422.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {Text} from "../../vendor/m2423.ts";
import {fc,sl} from "../../vendor/m715.ts";
import {Ite,ict} from "../../vendor/m3937.ts";
import {Ab,Rte} from "../../vendor/m3925.ts";
import {Gn,sc} from "../../vendor/m2455.ts";
import {_oe,Pd} from "../../vendor/m701.ts";
import {iqe,OUn} from "../../vendor/m3968.ts";
import {LUn,cao} from "../../vendor/m3969.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {S1a} from "../../vendor/m3966.ts";
import {Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function k1a(e: any): any {
  let t = x1a.c(167),
    {
      param: n,
      addMargin: r,
      tools: o,
      commands: s,
      verbose: i,
      inProgressToolUseIDs: a,
      progressMessagesForMessage: l,
      shouldAnimate: c,
      shouldShowDot: u,
      inProgressToolCallCount: d,
      lookups: p,
      isTranscriptMode: m,
      messageUuid: f
    } = e,
    A = rR.useContext(hce),
    h = _Un(),
    g = yUn(),
    _ = h === n.id,
    y = iIe(f),
    [T, S] = rR.useState(!1),
    v = mr(),
    [R] = useTheme(),
    k = XR(Qbp),
    x = b1a(n.id),
    H = XR(Xbp),
    I = XR(Jbp),
    P = H === "auto" || H === "plan" && I,
    L = !1,
    D: any;
  if (t[0] !== n.input || t[1] !== n.name || t[2] !== o) {
    e: {
      if (!o) {
        let He: any;
        if (t[4] === Symbol.for("react.memo_cache_sentinel")) He = {
          notFound: "no-tools"
        }, t[4] = He;else He = t[4];
        D = He;
        break e;
      }
      let Re = Cl(o, n.name);
      if (!Re) {
        let Ge = n.name.startsWith("mcp__") || n.name.startsWith("skill__") || n.name.startsWith("eval_registered__") || n.name === bf || n.name === "WebBrowser" || n.name === "Frame" || n.name === "FrameRead" || $ot().has(n.name) || Cl(myn() ?? [], n.name) !== void 0 ? "expected-absent" : "unknown",
          Ye: any;
        if (t[5] !== Ge) Ye = {
          notFound: Ge
        }, t[5] = Ge, t[6] = Ye;else Ye = t[6];
        D = Ye;
        break e;
      }
      let Me = Re.inputSchema.safeParse(n.input),
        Ke = Me.success ? Me.data : void 0;
      D = {
        tool: Re,
        input: Me,
        userFacingToolName: Re.userFacingName(Ke),
        userFacingToolNameBackgroundColor: Re.userFacingNameBackgroundColor?.(Ke),
        isTransparentWrapper: Re.isTransparentWrapper?.() ?? !1
      };
    }
    t[0] = n.input, t[1] = n.name, t[2] = o, t[3] = D;
  } else D = t[3];
  let N = D,
    O = "notFound" in N ? N.notFound : null,
    $: any,
    U: any;
  if (t[7] !== O || t[8] !== n.name) $ = () => {
    if (O === "no-tools") De(Error(`Tools array is undefined for tool ${n.name}`));else if (O === "expected-absent") logForDebugging(`Tool ${n.name} not found in render-time tools`, {
      level: "error"
    });else if (O === "unknown") De(Error(`Tool ${n.name} not found`));
  }, U = [n.name, O], t[7] = O, t[8] = n.name, t[9] = $, t[10] = U;else $ = t[9], U = t[10];
  rR.useEffect($, U);
  let W = "notFound" in N,
    G: any,
    V: any,
    Q: any,
    K: any,
    Y: any,
    J: any,
    ee: any,
    te: any,
    ne: any,
    re: any,
    oe: any,
    ce: any,
    ue: any,
    ae: any,
    he: any,
    se: any,
    le: any,
    pe: any,
    de: any,
    _e: any,
    fe: any,
    ie: any;
  if (t[11] !== r || t[12] !== T || t[13] !== s || t[14] !== d || t[15] !== a || t[16] !== _ || t[17] !== m || t[18] !== p || t[19] !== f || t[20] !== n || t[21] !== N || t[22] !== k?.toolUseId || t[23] !== l || t[24] !== A || t[25] !== y || t[26] !== g || t[27] !== c || t[28] !== u || t[29] !== W || t[30] !== v || t[31] !== R || t[32] !== o || t[33] !== i) {
    se = Symbol.for("react.early_return_sentinel");
    e: {
      if (W) {
        se = null;
        break e;
      }
      let {
        tool: Re,
        input: Me,
        userFacingToolName: Ke,
        userFacingToolNameBackgroundColor: He,
        isTransparentWrapper: Ge
      } = N;
      if (ie = Re, t[56] !== r || t[57] !== T || t[58] !== s || t[59] !== d || t[60] !== a || t[61] !== Me || t[62] !== _ || t[63] !== m || t[64] !== Ge || t[65] !== p || t[66] !== f || t[67] !== n || t[68] !== k?.toolUseId || t[69] !== l || t[70] !== A || t[71] !== y || t[72] !== g || t[73] !== c || t[74] !== u || t[75] !== v || t[76] !== R || t[77] !== ie || t[78] !== o || t[79] !== Ke || t[80] !== He || t[81] !== i) {
        Y = p.resolvedToolUseIDs.has(n.id), K = !a.has(n.id) && !Y, J = k?.toolUseId === n.id;
        let Ye = p.toolResultByToolUseID.get(n.id),
          ot = Ye?.type === "user" ? Ye.toolUseResult : void 0;
        if (Ge) {
          let Je = lao({
            param: n,
            isQueued: K,
            isResolved: Y,
            isError: p.erroredToolUseIDs.has(n.id),
            shouldAnimate: c,
            shouldShowDot: u,
            addMargin: r,
            progressMessagesForMessage: l,
            resultMsg: Ye
          });
          if (Je !== null) {
            se = Je;
            break e;
          }
          if (Y) {
            se = null;
            break e;
          }
          let Rt: any;
          if (t[102] !== d || t[103] !== m || t[104] !== p || t[105] !== n.id || t[106] !== l || t[107] !== v || t[108] !== ie || t[109] !== o || t[110] !== i) Rt = R1a(ie, o, p, n.id, l, {
            verbose: i,
            inProgressToolCallCount: d,
            isTranscriptMode: m
          }, v), t[102] = d, t[103] = m, t[104] = p, t[105] = n.id, t[106] = l, t[107] = v, t[108] = ie, t[109] = o, t[110] = i, t[111] = Rt;else Rt = t[111];
          se = rR.default.createElement(Box, {
            flexDirection: "column",
            width: "100%"
          }, Rt);
          break e;
        }
        if (Ke === "") {
          se = null;
          break e;
        }
        let vt: any;
        if (t[112] !== s || t[113] !== Me.data || t[114] !== Me.success || t[115] !== R || t[116] !== ie || t[117] !== i) vt = Me.success ? Zbp(ie, Me.data, {
          theme: R,
          verbose: i,
          commands: s
        }) : null, t[112] = s, t[113] = Me.data, t[114] = Me.success, t[115] = R, t[116] = ie, t[117] = i, t[118] = vt;else vt = t[118];
        let $e = vt;
        if ($e === null) {
          se = null;
          break e;
        }
        if (Q = Box, re = "row", oe = "space-between", ce = r ? 1 : 0, ue = "100%", t[119] !== n.id || t[120] !== g) ae = void 0, t[119] = n.id, t[120] = g, t[121] = ae;else ae = t[121];
        if (t[122] !== g) he = void 0, t[122] = g, t[123] = he;else he = t[123];
        if (V = Box, ne = "column", G = Box, le = "row", pe = "nowrap", de = tn(Ke) + (u ? 2 : 0), _e = u && (Y && p.erroredToolUseIDs.has(n.id), K ? rR.default.createElement(Box, {
          minWidth: 2
        }, rR.default.createElement(Text, {
          "aria-label": "tool:",
          dimColor: K
        }, fc)) : rR.default.createElement(Ite, {
          shouldAnimate: c,
          isUnresolved: !Y,
          isError: p.erroredToolUseIDs.has(n.id)
        })), t[124] !== Ke || t[125] !== He) fe = rR.default.createElement(Box, {
          flexShrink: 0
        }, rR.default.createElement(Ab, {
          color: He,
          bold: !0,
          wrap: "truncate-end"
        }, Ke)), t[124] = Ke, t[125] = He, t[126] = fe;else fe = t[126];
        if (t[127] !== $e) ee = $e !== "" && rR.default.createElement(Box, {
          flexWrap: "nowrap"
        }, rR.default.createElement(Text, null, "(", $e, ")")), t[127] = $e, t[128] = ee;else ee = t[128];
        te = Me.success && ie.renderToolUseTag && ie.renderToolUseTag(Me.data, {
          toolUseId: n.id,
          toolUseResult: ot,
          progressMessages: p.progressMessagesByToolUseID.get(n.id)
        }), t[56] = r, t[57] = T, t[58] = s, t[59] = d, t[60] = a, t[61] = Me, t[62] = _, t[63] = m, t[64] = Ge, t[65] = p, t[66] = f, t[67] = n, t[68] = k?.toolUseId, t[69] = l, t[70] = A, t[71] = y, t[72] = g, t[73] = c, t[74] = u, t[75] = v, t[76] = R, t[77] = ie, t[78] = o, t[79] = Ke, t[80] = He, t[81] = i, t[82] = G, t[83] = V, t[84] = Q, t[85] = K, t[86] = Y, t[87] = J, t[88] = ee, t[89] = te, t[90] = ne, t[91] = re, t[92] = oe, t[93] = ce, t[94] = ue, t[95] = ae, t[96] = he, t[97] = le, t[98] = pe, t[99] = de, t[100] = _e, t[101] = fe;
      } else G = t[82], V = t[83], Q = t[84], K = t[85], Y = t[86], J = t[87], ee = t[88], te = t[89], ne = t[90], re = t[91], oe = t[92], ce = t[93], ue = t[94], ae = t[95], he = t[96], le = t[97], pe = t[98], de = t[99], _e = t[100], fe = t[101];
    }
    t[11] = r, t[12] = T, t[13] = s, t[14] = d, t[15] = a, t[16] = _, t[17] = m, t[18] = p, t[19] = f, t[20] = n, t[21] = N, t[22] = k?.toolUseId, t[23] = l, t[24] = A, t[25] = y, t[26] = g, t[27] = c, t[28] = u, t[29] = W, t[30] = v, t[31] = R, t[32] = o, t[33] = i, t[34] = G, t[35] = V, t[36] = Q, t[37] = K, t[38] = Y, t[39] = J, t[40] = ee, t[41] = te, t[42] = ne, t[43] = re, t[44] = oe, t[45] = ce, t[46] = ue, t[47] = ae, t[48] = he, t[49] = se, t[50] = le, t[51] = pe, t[52] = de, t[53] = _e, t[54] = fe, t[55] = ie;
  } else G = t[34], V = t[35], Q = t[36], K = t[37], Y = t[38], J = t[39], ee = t[40], te = t[41], ne = t[42], re = t[43], oe = t[44], ce = t[45], ue = t[46], ae = t[47], he = t[48], se = t[49], le = t[50], pe = t[51], de = t[52], _e = t[53], fe = t[54], ie = t[55];
  if (se !== Symbol.for("react.early_return_sentinel")) return se;
  let Ae: any;
  if (t[129] !== G || t[130] !== ee || t[131] !== te || t[132] !== le || t[133] !== pe || t[134] !== de || t[135] !== _e || t[136] !== fe) Ae = rR.default.createElement(G, {
    flexDirection: le,
    flexWrap: pe,
    minWidth: de
  }, _e, fe, ee, te), t[129] = G, t[130] = ee, t[131] = te, t[132] = le, t[133] = pe, t[134] = de, t[135] = _e, t[136] = fe, t[137] = Ae;else Ae = t[137];
  let ge: any;
  if (t[138] !== d || t[139] !== P || t[140] !== !1 || t[141] !== K || t[142] !== Y || t[143] !== m || t[144] !== J || t[145] !== p || t[146] !== n.id || t[147] !== l || t[148] !== v || t[149] !== ie || t[150] !== o || t[151] !== i) ge = !Y && (J ? rR.default.createElement(Gn, {
    height: 1
  }, rR.default.createElement(Text, {
    dimColor: !0
  }, "Waiting for permission…")) : K ? eEp(ie) : R1a(ie, o, p, n.id, l, {
    verbose: i,
    inProgressToolCallCount: d,
    isTranscriptMode: m
  }, v)), t[138] = d, t[139] = P, t[140] = !1, t[141] = K, t[142] = Y, t[143] = m, t[144] = J, t[145] = p, t[146] = n.id, t[147] = l, t[148] = v, t[149] = ie, t[150] = o, t[151] = i, t[152] = ge;else ge = t[152];
  let Ce: any;
  if (t[153] !== V || t[154] !== ne || t[155] !== Ae || t[156] !== ge) Ce = rR.default.createElement(V, {
    flexDirection: ne
  }, Ae, ge), t[153] = V, t[154] = ne, t[155] = Ae, t[156] = ge, t[157] = Ce;else Ce = t[157];
  let xe: any;
  if (t[158] !== Q || t[159] !== re || t[160] !== oe || t[161] !== ce || t[162] !== ue || t[163] !== ae || t[164] !== he || t[165] !== Ce) xe = rR.default.createElement(Q, {
    flexDirection: re,
    justifyContent: oe,
    marginTop: ce,
    width: ue,
    onMouseEnter: ae,
    onMouseLeave: he
  }, Ce), t[158] = Q, t[159] = re, t[160] = oe, t[161] = ce, t[162] = ue, t[163] = ae, t[164] = he, t[165] = Ce, t[166] = xe;else xe = t[166];
  return xe;
}
function Jbp(e: any): any {
  return !!e.toolPermissionContext.strippedDangerousRules;
}
function Xbp(e: any): any {
  return e.toolPermissionContext.mode;
}
function Qbp(e: any): any {
  return e.pendingWorkerRequest;
}
function Zbp(e: any, t: any, {
  theme: n,
  verbose: r,
  commands: o
}: any): any {
  let s = _oe(t);
  if (s !== null) return s;
  try {
    return e.renderToolUseMessage(t, {
      theme: n,
      verbose: r,
      commands: o
    });
  } catch (i) {
    return De(Error(`Error rendering tool use message for ${e.name}: ${i}`)), "";
  }
}
function R1a(e: any, t: any, n: any, r: any, o: any, {
  verbose: s,
  inProgressToolCallCount: i,
  isTranscriptMode: a
}: any, l: any): any {
  let c = o.filter((u: any) => u.data.type !== "hook_progress");
  try {
    let u = e.renderToolUseProgressMessage?.(c, {
      tools: t,
      verbose: s,
      terminalSize: l,
      inProgressToolCallCount: i ?? 1,
      isTranscriptMode: a
    }) ?? null;
    return rR.default.createElement(rR.default.Fragment, null, rR.default.createElement(iqe, null, rR.default.createElement(LUn, {
      hookEvent: "PreToolUse",
      lookups: n,
      toolUseID: r,
      verbose: s,
      isTranscriptMode: a
    })), u);
  } catch (u) {
    return De(Error(`Error rendering tool use progress message for ${e.name}: ${u}`)), null;
  }
}
function eEp(e: any): any {
  try {
    return e.renderToolUseQueuedMessage?.();
  } catch (t) {
    return De(Error(`Error rendering tool use queued message for ${e.name}: ${t}`)), null;
  }
}
var x1a: any, rR: any;
var H1a = b(() => {
  ki();
  sl();
  Hc();
  ze();
  configProtoStore();
  Ri();
  S1a();
  aq();
  E1a();
  qe();
  bW();
  Pp();
  Pd();
  Rn();
  Rte();
  sc();
  OUn();
  ict();
  cao();
  act();
  x1a = M(rt(), 1), rR = M(Te(), 1);
});
export {k1a,Jbp,Xbp,Qbp,Zbp,R1a,eEp,x1a,rR,H1a};
