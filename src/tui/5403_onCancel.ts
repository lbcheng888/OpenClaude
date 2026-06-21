// @ts-nocheck
import {Mc as N1,bo as Vq,mt as X_,configProtoStore as Gq} from "../../vendor/m2458.ts";
import {mcpTools as FZ,sJ as Io} from "../../vendor/m4311.ts";
import {ede as j5H,NAt as hz_} from "../../vendor/m5300.ts";
import {Ui as U7,Ld as s3} from "../../vendor/m2459.ts";
import {xRe as f26,nwn as j26,KAe as mbH} from "../config/2691_reason.ts";
import {E0 as KL,Om as NT} from "../config/2215_level.ts";
import {getMainLoopModel as Q9,Mo as Qq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Qe as K_,fromEnum as QH} from "../../vendor/m5.ts";
import {Yhe as zYH,ele as YYH} from "../../vendor/m3293.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {XOt as Qk_,_m as MT,t9i as Wb7,sA as Fz} from "../../vendor/m2782.ts";
import {fIi as nZ7,ZR as UW} from "../../vendor/m2551.ts";
import {Or as m8,Ts as D9} from "../../vendor/m2542.ts";
import {od as V3,QL as SE,eqn as pm6,nJa as QnK,RE as jX} from "../agent/4342_toolUseCount.ts";
import {KHe as PGH,zHe as EmH} from "../../vendor/m3880.ts";
import {Bh as VY,bC as tM} from "../session/2784_uuid.ts";
import {mainAgentId as S9,lt as A_} from "../session/0131_sent.ts";
import {ZJ as ya,GAt as xz_} from "../../vendor/m5335.ts";
import {pJn as Sr6,jPo as YLq} from "../../vendor/m5330.ts";
import {oj as vU,kue as l1H} from "../agent/4859_evictAfter.ts";
import {qw as hP,UZ as De} from "../telemetry/2468_action.ts";
import {b as L,M as x} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// @ts-nocheck
function gZq(H) {
  let {
      onCancel: _,
      onAgentsKilled: q,
      isMessageSelectorVisible: K,
      screen: O,
      abortSignal: T,
      isExternalLoading: z = false,
      popCommandFromQueue: $,
      isLocalJSXCommand: Y,
      isInputOverlayActive: A_2,
      isVimEditing: w_2,
      inputMode: f,
      isInputEmpty: j,
      getInFlightMessageId: J
    } = H,
    D = N1(),
    M = Vq(),
    X = FZ(),
    P = j5H().length,
    {
      addNotification: Z,
      removeNotification: W
    } = U7(),
    G = UwH.useRef(0),
    R = X_(n => n.viewSelectionMode),
    h = X_(n => n.effortValue),
    [, y] = UwH.useState(0),
    E = f26(),
    v = UwH.useCallback(() => {
      let n = KL(Q9(), h),
        o = J?.(),
        i = {
          source: K_("escape"),
          streamMode: QH(zYH().mode),
          ...(n && {
            effort_level: QH(n)
          }),
          ...(o && {
            message_id: a8(o)
          })
        };
      if (j26() > 0) y(t => t + 1);
      if (T !== undefined && !T.aborted || z) {
        c("tengu_cancel", i), _();
        return;
      }
      if (Qk_()) {
        if ($) {
          $();
          return;
        }
      }
      c("tengu_cancel", i), _();
    }, [T, z, $, _, J, h]),
    C = nZ7(),
    S = T !== undefined && !T.aborted || z,
    I = P > 0,
    p_2 = f !== undefined && f !== "prompt" && j,
    b = R === "viewing-agent",
    x = O !== "transcript" && !K && !Y && !C && !A_2,
    U = x && (S || I || E) && !p_2 && !w_2 && !b,
    F = x && (S || I || E || b);
  m8("chat:cancel", v, {
    context: "Chat",
    isActive: U
  });
  let Q_2 = UwH.useCallback(() => {
      let n = D.getState().tasks,
        o = Object.entries(n).filter(([, a]) => V3(a) && (a.status === "running" || SE(a)) || a.type === "in_process_teammate" && a.status === "running");
      if (o.length === 0) return false;
      for (let [a] of o) pm6(a, X);
      QnK(n, X);
      for (let [t, e] of o) if (e.type === "in_process_teammate") PGH(t, X, M);
      let i = [];
      for (let [t, e] of o) if (i.push(e.description), e.type !== "in_process_teammate") VY(t, "stopped", {
        toolUseId: e.toolUseId,
        summary: e.description
      });
      let a = i.length === 1 ? `Background agent "${i[0]}" was stopped by the user.` : `${i.length} background agents were stopped by the user: ${i.map(t => `"${t}"`).join(", ")}.`;
      return MT({
        agentId: S9(),
        value: a,
        mode: "task-notification"
      }), q(), true;
    }, [D, q, X, M]),
    d = UwH.useCallback(() => {
      if (b) {
        let {
            viewingAgentTaskId: n,
            tasks: o
          } = D.getState(),
          i = n ? o[n] : undefined;
        if (ya(i)) Sr6(i, X, M);
        vU(M);
      }
      if (S || I || E) v();
    }, [b, D, X, M, S, I, E, v]);
  m8("app:interrupt", d, {
    context: "Global",
    isActive: F
  });
  let l = UwH.useCallback(() => {
    let n = D.getState().tasks;
    if (!Object.values(n).some(e => (e.type === "local_agent" || e.type === "in_process_teammate") && e.status === "running")) {
      Z({
        key: "kill-agents-none",
        kind: "feedback",
        text: "No background agents running",
        priority: "immediate",
        timeoutMs: 2000
      });
      return;
    }
    let i = Date.now();
    if (i - G.current <= ix4) {
      G.current = 0, W("kill-agents-confirm");
      let e = KL(Q9(), h);
      c("tengu_cancel", {
        source: K_("kill_agents"),
        ...(e && {
          effort_level: QH(e)
        })
      }), Wb7(), Q_2();
      return;
    }
    G.current = i;
    let a = hP("chat:killAgents", "Chat", "ctrl+x ctrl+k");
    Z({
      key: "kill-agents-confirm",
      kind: "feedback",
      text: `Press ${a} again to stop background agents`,
      priority: "immediate",
      timeoutMs: ix4
    });
  }, [D, Z, W, Q_2, h]);
  return m8("chat:killAgents", l, {
    context: "Chat"
  }), null;
}
var UwH,
  ix4 = 3000;
var rx4 = L(() => {
  A_();
  v_();
  Gq();
  Io();
  NT();
  Qq();
  xz_();
  YYH();
  s3();
  UW();
  hz_();
  De();
  D9();
  mbH();
  LJ();
  YLq();
  l1H();
  jX();
  Fz();
  tM();
  EmH();
  UwH = x(WH(), 1);
});

export {gZq as tLo,UwH as rTe,ix4 as j5l,rx4 as W5l};
