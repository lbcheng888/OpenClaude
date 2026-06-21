// @ts-nocheck
import {gracefulShutdownSync,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {C4t,am,B6e} from "../config/4375_kind.ts";
import {EF,QK,K4} from "../session/2521_id.ts";
import {sv,Epe} from "../../vendor/m434.ts";
import {X6e} from "./4422_name.ts";
import {MVn,NVn} from "../../vendor/m5013.ts";
import {AWl,iLo} from "./5414_stylepool_styles.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Pct} from "../../vendor/m4035.ts";
import {hIe,isCommandEnabled,getCommandName} from "../tools/4028_maxEditDistance.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {oy,sA} from "../../vendor/m2782.ts";
import {mainAgentId,lt} from "../session/0131_sent.ts";
import {Oe,Ie,ln} from "./0594_feature_name.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {E0,Om} from "../config/2215_level.ts";
import {Qe,fromEnumOpt,fromEnum} from "../../vendor/m5.ts";
import {Q$,Aee,_q} from "./2781_consumer.ts";
import {wc,Rzn,replayableUserMessagesFilter,lo} from "../tools/5190_userPromptCount.ts";
import {Vun,oNe} from "../../vendor/m1454.ts";
import {CHn,jae,Nq} from "../agent/3184_code.ts";
import {RWt,RYn} from "../agent/5263_input.ts";
import {vT,nlt,p4e,_6} from "../session/3862_trackSequence.ts";
import {resolveSkillModelOverride,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {b} from "../../runtime.ts";
import {Sf} from "../tools/5142_toSlashCommands.ts";
import {BYn} from "../tui/5294_selectableUserMessagesFilter.ts";
function AXn(messages: any, targetUuid: any) {
  if (targetUuid === void 0) return;
  for (let msg of messages) if (msg.type === "user" && msg.uuid === targetUuid) msg.verifiedSlackHumanTurn = !0;
}
function WPm() {
  gracefulShutdownSync(0);
}
async function hXn(e: any) {
  let {
      helpers: t,
      queryGuard: n,
      isExternalLoading: r = !1,
      commands: o,
      onInputChange: s,
      setPastedContents: i,
      setToolJSX: a,
      getToolUseContext: l,
      messages: c,
      mainLoopModel: u,
      ideSelection: d,
      setUserInputOnProcessing: p,
      setAbortController: m,
      onQuery: f,
      getAppState: A,
      setAppState: h,
      onBeforeQuery: g,
      canUseTool: _,
      queuedCommands: y,
      uuid: T,
      skipSlashCommands: S
    } = e,
    {
      setCursorOffset: v,
      clearBuffer: R,
      resetHistory: k
    } = t;
  if (y?.length) {
    C4t(), await xWl({
      inputSource: "queued",
      queuedCommands: y,
      messages: c,
      mainLoopModel: u,
      ideSelection: d,
      querySource: e.querySource,
      commands: o,
      queryGuard: n,
      setToolJSX: a,
      getToolUseContext: l,
      setUserInputOnProcessing: p,
      setAbortController: m,
      onQuery: f,
      getAppState: A,
      setAppState: h,
      onBeforeQuery: g,
      resetHistory: k,
      canUseTool: _,
      onInputChange: s,
      deferSlashToEngine: e.deferSlashToEngine
    });
    return;
  }
  let x = e.input ?? "",
    H = e.mode ?? "prompt",
    I = e.pastedContents ?? {},
    P = new Set(EF(x).map((G: any) => G.id)),
    L = sv(I, (G: any) => G.type !== "image" || P.has(G.id)),
    D = Object.values(L).some(X6e);
  if (x.trim() === "") return;
  if (H !== "bash" && !S && MVn.includes(x.trim())) {
    if (o.find((V: any) => V.name === "exit")) hXn({
      ...e,
      input: "/exit"
    });else WPm();
    return;
  }
  AWl();
  let N = QK(x, L),
    O = EF(x).filter((G: any) => L[G.id]?.type === "text"),
    $ = O.length,
    U = O.reduce((G: any, V: any) => G + (L[V.id]?.content.length ?? 0), 0);
  if (logEvent("tengu_paste_text", {
    pastedTextCount: $,
    pastedTextBytes: U
  }), !S && N.trim().startsWith("/")) {
    let G = N.trim(),
      {
        name: V,
        args: Q
      } = Pct(G),
      K = o.find((Y: any) => hIe(Y, Q) && isCommandEnabled(Y) && (Y.name === V || Y.aliases?.includes(V) || getCommandName(Y) === V));
    if (K && K.type === "local-jsx" && (n.isActive || r)) {
      logEvent("tengu_immediate_command_executed", {
        commandName: K.name
      }), s(""), v(0), i({}), R();
      let Y = l(c, [], Jl(), u),
        J = !1,
        ee = (re: any, oe: any) => {
          if (J = !0, a({
            jsx: null,
            shouldHidePromptInput: !1,
            clearLocalJSX: !0
          }), re && oe?.display !== "skip" && e.addNotification) e.addNotification({
            key: `immediate-${K.name}`,
            kind: "feedback",
            text: re,
            priority: "immediate"
          });
          if (oe?.nextInput) if (oe.submitNextInput) oy({
            agentId: mainAgentId(),
            value: oe.nextInput,
            mode: "prompt",
            origin: {
              kind: "auto-continuation"
            }
          });else s(oe.nextInput);
        },
        ne = await (await K.load()).call(ee, {
          ...Y,
          isMidTurn: !0
        }, Q, V);
      if (ne && !J) a({
        jsx: ne,
        shouldHidePromptInput: !1,
        isLocalJSXCommand: !0,
        isImmediate: !0
      });
      return;
    }
  }
  if (n.isActive || r) {
    if (H !== "prompt" && H !== "bash") {
      Oe("prompt_queued", "mode_not_queueable");
      return;
    }
    if (e.hasInterruptibleToolInProgress) {
      logForDebugging(`[interrupt] Aborting current turn: streamMode=${e.streamMode}`);
      let G = E0(u, A().effortValue);
      logEvent("tengu_cancel", {
        source: Qe("interrupt_on_submit"),
        streamMode: fromEnumOpt(e.streamMode),
        ...(G && {
          effort_level: fromEnum(G)
        })
      }), e.abortController?.abort("interrupt");
    }
    oy({
      agentId: mainAgentId(),
      value: N.trim(),
      preExpansionValue: x.trim(),
      mode: H,
      pastedContents: D ? L : void 0,
      skipSlashCommands: S,
      suppressWorkflowKeyword: e.suppressWorkflowKeyword,
      uuid: T,
      origin: {
        kind: "human"
      }
    }), Ie("prompt_queued"), s(""), v(0), i({}), k(), R();
    return;
  }
  C4t();
  let W = {
    value: N,
    preExpansionValue: x,
    mode: H,
    pastedContents: D ? L : void 0,
    skipSlashCommands: S,
    suppressWorkflowKeyword: e.suppressWorkflowKeyword,
    uuid: T,
    agentId: mainAgentId(),
    origin: {
      kind: "human"
    }
  };
  Ie("prompt_submit"), await xWl({
    inputSource: "typed",
    queuedCommands: [W],
    messages: c,
    mainLoopModel: u,
    ideSelection: d,
    querySource: e.querySource,
    commands: o,
    queryGuard: n,
    setToolJSX: a,
    getToolUseContext: l,
    setUserInputOnProcessing: p,
    setAbortController: m,
    onQuery: f,
    getAppState: A,
    setAppState: h,
    onBeforeQuery: g,
    resetHistory: k,
    canUseTool: _,
    onInputChange: s,
    deferSlashToEngine: e.deferSlashToEngine
  });
}
async function xWl(e: any) {
  let {
      messages: t,
      mainLoopModel: n,
      ideSelection: r,
      querySource: o,
      queryGuard: s,
      setToolJSX: i,
      getToolUseContext: a,
      setUserInputOnProcessing: l,
      setAbortController: c,
      onQuery: u,
      getAppState: d,
      setAppState: p,
      onBeforeQuery: m,
      resetHistory: f,
      canUseTool: A,
      queuedCommands: h,
      inputSource: g
    } = e,
    _ = Jl();
  c(_);
  function y() {
    return {
      ...a(t, [], _, n),
      deferSlashToEngine: e.deferSlashToEngine
    };
  }
  try {
    s.reserve(), am("query_process_user_input_start");
    let T: any[] = [],
      S = !1,
      v: any,
      R: any,
      k: any,
      x: any,
      H: any,
      I: any,
      P = h ?? [],
      L = P[0]?.workload,
      D = L !== void 0 && P.every((U: any) => U.workload === L) ? L : void 0,
      N = Math.max(0, P.findIndex((U: any) => Q$(U.origin) && !U.isMeta)),
      O = P[N]?.value,
      $ = typeof O === "string" ? O : O ? wc(O, `
`) : "";
    await Vun(D, () => CHn($, async () => {
      let U = y();
      for (let W = 0; W < P.length; W++) {
        let G = P[W],
          V = W === N,
          Q = G.origin ?? (G.mode === "task-notification" ? {
            kind: "task-notification"
          } : void 0),
          K = G.isMeta || !Aee(Q) ? "system" : g,
          Y = await RWt({
            input: G.value,
            preExpansionInput: G.preExpansionValue,
            promptSource: K,
            suppressWorkflowKeyword: G.suppressWorkflowKeyword,
            mode: G.mode,
            setToolJSX: i,
            context: U,
            pastedContents: G.pastedContents,
            messages: t,
            setUserInputOnProcessing: V ? l : void 0,
            isAlreadyProcessing: !V,
            querySource: o,
            canUseTool: A,
            uuid: G.uuid,
            ideSelection: V ? r : void 0,
            skipSlashCommands: G.skipSlashCommands,
            bridgeOrigin: G.bridgeOrigin,
            isMeta: G.isMeta,
            skipAttachments: !V,
            origin: Q
          });
        if (Q) Rzn(Y.messages, Q);
        if (G.priority === "later") {
          for (let J of Y.messages) if (J.type === "user") J.queuePriority = "later";
        }
        if (G.verifiedSlackHumanTurn) AXn(Y.messages, G.uuid);
        if (T.push(...Y.messages), Y.engineDeferredSlash) I = Y.engineDeferredSlash;
        if (V) S = Y.shouldQuery, v = Y.allowedTools, R = Y.model, k = Y.effort, x = Y.nextInput, H = Y.submitNextInput;
      }
      if (am("query_process_user_input_end"), vT()) am("query_file_history_snapshot_start"), T.filter(replayableUserMessagesFilter).forEach((W: any) => {
        nlt(() => d().fileHistory, (G: any) => p((V: any) => {
          let Q = p4e(V.fileHistory, G);
          if (Q === V.fileHistory) return V;
          return {
            ...V,
            fileHistory: Q
          };
        }), W.uuid);
      }), am("query_file_history_snapshot_end");
      if (T.length) {
        f(), i({
          jsx: null,
          shouldHidePromptInput: !1,
          clearLocalJSX: !0
        });
        let W = P[N],
          G = W?.mode ?? "prompt",
          V = W && typeof W.value === "string" ? W.value : void 0,
          Q = G === "prompt",
          K = P.some((J: any) => J.stopHookActive) ? !0 : void 0,
          Y = W?.clientPlatform;
        await u(T, _, S, v ?? [], R ? resolveSkillModelOverride(R, n) : n, Q ? m : void 0, V, k, K, Y, U.options?.activeSkill, I);
      } else s.cancelReservation(), i({
        jsx: null,
        shouldHidePromptInput: !1,
        clearLocalJSX: !0
      }), f(), c(null), jae();
      if (x) if (H) oy({
        agentId: mainAgentId(),
        value: x,
        mode: "prompt",
        origin: {
          kind: "auto-continuation"
        }
      });else e.onInputChange(x);
    }));
  } finally {
    s.cancelReservation(), l(void 0), jae();
  }
}
var kWl = b(() => {
  Epe();
  lt();
  ln();
  Ct();
  NVn();
  Sf();
  BYn();
  K4();
  ch();
  qe();
  Om();
  _6();
  iLo();
  ym();
  _q();
  sA();
  lo();
  Mo();
  RYn();
  B6e();
  Nq();
  oNe();
});
export {AXn,WPm,hXn,xWl,kWl};
