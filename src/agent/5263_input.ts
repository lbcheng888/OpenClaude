// @ts-nocheck
import {am,B6e} from "../config/4375_kind.ts";
import {Fr,Fh,Ql} from "../../vendor/m4405.ts";
import {A2n,_Ie,h2n,Zao,C$t} from "../../vendor/m4035.ts";
import {qY,nu,Ln,Sx,lo} from "../tools/5190_userPromptCount.ts";
import {executeUserPromptSubmitHooks,applyHookSessionTitle} from "../../vendor/m5167.ts";
import {getUserPromptSubmitHookBlockingMessage,yp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {createAttachmentMessage,getAttachmentMessages,Bv} from "./4429_tryGetPDFReference.ts";
import {tu,_9} from "../config/3864_entrypoint.ts";
import {h9l} from "../../vendor/m5259.ts";
import {initCg,j1} from "../telemetry/2531_ignore1mTag.ts";
import {Dki,aet,ZO,V4} from "../telemetry/2512_error_name.ts";
import {X6e} from "../telemetry/4422_name.ts";
import {c9l,RAt} from "../../vendor/m5257.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {B0,Pee} from "../telemetry/3153_Pee.ts";
import {lUn,nct} from "../../vendor/m3923.ts";
import {findCommand,isBridgeSafeCommand,findBridgeFallback,Sf} from "../tools/5142_toSlashCommands.ts";
import {isCommandEnabled,getCommandName,p2n,gqe} from "../tools/4028_maxEditDistance.ts";
import {xue,Zjt} from "../telemetry/4836_Zjt.ts";
import {atl,Z6n,nqt} from "../../vendor/m4425.ts";
import {Nct,w$t} from "../telemetry/4039_runUserPromptExpansionHook.ts";
import {y9l,_9l} from "../tui/5262_processBashCommand.ts";
import {setPromptId,lt} from "../session/0131_sent.ts";
import {f9l,A9l} from "../permissions/5259_prompt_length.ts";
import {E0,Om} from "../config/2215_level.ts";
import {b} from "../../runtime.ts";
import {s9l} from "../../vendor/m5256.ts";
async function RWt({
  input: e,
  preExpansionInput: t,
  suppressWorkflowKeyword: n,
  mode: r,
  setToolJSX: o,
  context: s,
  pastedContents: i,
  ideSelection: a,
  messages: l,
  setUserInputOnProcessing: c,
  uuid: u,
  isAlreadyProcessing: d,
  querySource: p,
  canUseTool: m,
  skipSlashCommands: f,
  bridgeOrigin: A,
  isMeta: h,
  skipAttachments: g,
  shouldQuery: _,
  promptSource: y,
  origin: T
}) {
  let S = typeof e === "string" ? e : null;
  if (r === "prompt" && S !== null && !h) c?.(S);
  am("query_process_user_input_base_start");
  let v = await Zwm(e, r, o, s, i, a, l, u, d, p, m, Fr(s).mode, f, A, h, g, t, y, n, T);
  if (am("query_process_user_input_base_end"), !d) A2n(s.setToolPermissionContext, v.disallowedTools ?? []);
  if (_ === !1) v.shouldQuery = !1;
  if (!v.shouldQuery) return v;
  am("query_hooks_start");
  let R = qY(e) || "",
    k,
    x = performance.now();
  for await (let H of executeUserPromptSubmitHooks(R, Fr(s).mode, s)) {
    if (H.message?.type === "progress") continue;
    if (H.blockingError) {
      let I = getUserPromptSubmitHookBlockingMessage(H.blockingError),
        P = H.suppressOriginalPrompt ? I : `${I}

Original prompt: ${R}`;
      return {
        messages: [nu(P, "warning", void 0, !0)],
        shouldQuery: !1,
        resultText: P
      };
    }
    if (H.preventContinuation) {
      let I = H.stopReason ? `Operation stopped by hook: ${H.stopReason}` : "Operation stopped by hook";
      return v.messages.push(Ln({
        content: I
      }), nu(I, "warning", void 0, !0)), v.shouldQuery = !1, v.resultText = I, v.allowedTools = void 0, v;
    }
    if (H.sessionTitle) k = H.sessionTitle;
    if (H.additionalContexts && H.additionalContexts.length > 0) v.messages.push(createAttachmentMessage({
      type: "hook_additional_context",
      content: H.additionalContexts,
      hookName: "UserPromptSubmit",
      toolUseID: `hook-${wYn.randomUUID()}`,
      hookEvent: "UserPromptSubmit"
    }));
    if (H.message) switch (H.message.attachment.type) {
      case "hook_success":
        if (!H.message.attachment.content) break;
        v.messages.push(H.message);
        break;
      default:
        v.messages.push(H.message);
        break;
    }
  }
  if (tu("prompt_submit_hooks_ms", performance.now() - x, x), k) await applyHookSessionTitle(k);
  return am("query_hooks_end"), v;
}
async function Zwm(e, t, n, r, o, s, i, a, l, c, u, d, p, m, f, A, h, g, _, y) {
  let T = h9l({
      isNonInteractive: r.options.isNonInteractiveSession,
      isMeta: f,
      callerSource: g
    }),
    S = null,
    v = [],
    R = [],
    k = initCg(r.options.mainLoopModel),
    x = e;
  if (typeof e === "string") S = e;else if (e.length > 0) {
    am("query_image_processing_start");
    let Q = [];
    for (let Y of e) if (Y.type === "image") {
      let J = await Dki(Y, k);
      if (J.dimensions) {
        let ee = aet(J.dimensions);
        if (ee) R.push(ee);
      }
      Q.push(J.block);
    } else Q.push(Y);
    x = Q, am("query_image_processing_end");
    let K = Q.at(-1);
    if (K?.type === "text") S = K.text, v = Q.slice(0, -1);else v = Q;
  }
  if (S === null && t !== "prompt") throw Error(`Mode: ${t} requires a string input.`);
  let H = o ? Object.values(o).filter(X6e) : [],
    I = o ? await c9l(o, r.setAppState) : new Map();
  am("query_pasted_image_processing_start");
  let P = await Promise.all(H.map(async Q => {
      logEvent("tengu_pasted_image_resize_attempt", {
        original_size_bytes: Q.content.length
      });
      let K = await ZO({
        data: Q.content,
        mediaType: Q.mediaType,
        limits: k
      });
      return K.block.type, {
        id: Q.id,
        resized: K,
        originalDimensions: Q.dimensions,
        sourcePath: Q.sourcePath ?? I.get(Q.id)
      };
    })),
    L = [],
    D = [];
  for (let {
    id: Q,
    resized: K,
    originalDimensions: Y,
    sourcePath: J
  } of P) {
    if (L.push(K.block), K.block.type !== "image") continue;
    if (D.push(Q), K.dimensions) {
      let ee = aet(K.dimensions, J);
      if (ee) R.push(ee);
    } else if (Y) {
      let ee = aet(Y, J);
      if (ee) R.push(ee);
    } else if (J) R.push(`[Image source: ${J}]`);
  }
  am("query_pasted_image_processing_end");
  let N = p,
    O = r,
    $ = S;
  if (m && S !== null && S.startsWith("/")) {
    let Q = _Ie(S),
      K = Q?.commandName;
    if (B0()) {
      if (K) {
        let J = lUn(K, r.options.commands);
        if (J) K = J.commandName;
      }
    }
    let Y = K ? findCommand(K, r.options.commands) : void 0;
    if (Y) {
      let J = Q ? h2n(Y, Q.args) : void 0,
        ee = J ? findCommand(J.targetName, r.options.commands) : void 0,
        te = J && ee && isCommandEnabled(ee) ? {
          command: ee,
          consumedToken: J.consumedToken,
          args: J.remainingArgs
        } : void 0,
        ne = te ? te.command : Y;
      if (isBridgeSafeCommand(ne)) N = !1;else {
        let re = findBridgeFallback(ne);
        if (re) N = !1, $ = te ? `/${re.name}${te.args ? ` ${te.args}` : ""}` : S.replace(/^\/\S+/, `/${re.name}`), O = {
          ...r,
          options: {
            ...r.options,
            commands: [re, ...r.options.commands]
          }
        };else {
          let oe = te ? `/${getCommandName(Y)} ${te.consumedToken} isn't available over Remote Control.` : `/${getCommandName(ne)} isn't available over Remote Control.`;
          return {
            messages: [Ln({
              content: S,
              uuid: a,
              origin: y
            }), Sx(`<local-command-stdout>${oe}</local-command-stdout>`)],
            shouldQuery: !1,
            resultText: oe
          };
        }
      }
    }
  }
  if (xue() && t === "prompt" && !r.options.isNonInteractiveSession && S !== null && !N && !S.startsWith("/") && !r.options.ultraplanSessionUrl && !r.getAppState().ultraplanLaunching && atl(h ?? S)) {
    logEvent("tengu_ultraplan_keyword", {});
    let Q = Z6n(S).trim(),
      {
        processSlashCommand: K
      } = await Promise.resolve().then(() => (Nct(), w$t)),
      Y = await K(`/ultraplan ${Q}`, v, L, [], r, n, a, l, u, T);
    return r.setAppState(J => J.ultraplanLaunchPending ? {
      ...J,
      ultraplanLaunchPending: {
        ...J.ultraplanLaunchPending,
        source: "keyword"
      }
    } : J), vYn(Y, R);
  }
  if (S !== null && t === "bash") {
    let {
      processBashCommand: Q
    } = await Promise.resolve().then(() => (y9l(), _9l));
    return vYn(await Q(S, v, r, n), R);
  }
  let U = !A && (t !== "prompt" || N || !S?.startsWith("/")),
    W = wYn.randomUUID();
  setPromptId(W);
  let G = t === "prompt" && !f;
  am("query_attachment_loading_start");
  let V = U ? await p2n(getAttachmentMessages(S, r, s ?? null, [], {
    now: () => new Date().toISOString(),
    uuid: () => wYn.randomUUID()
  }, i, c, {
    isRegularUserPrompt: G,
    preExpansionInput: h,
    suppressWorkflowKeyword: _
  })) : [];
  if (am("query_attachment_loading_end"), $ !== null && !N && $.startsWith("/")) {
    let {
        processSlashCommand: Q
      } = await Promise.resolve().then(() => (Nct(), w$t)),
      K = await Q($, v, L, V, O, n, a, l, u, T);
    return vYn(K, R);
  }
  if (S !== null && t === "prompt") {
    let Q = S.trim(),
      K = V.find(Y => Y.attachment.type === "agent_mention");
    if (K) {
      let Y = `@agent-${K.attachment.agentType}`,
        J = Q === Y,
        ee = Q.startsWith(Y) && !J;
      logEvent("tengu_subagent_at_mention", {
        is_subagent_only: J,
        is_prefix: ee
      });
    }
  }
  return vYn(f9l(x, L, D, V, W, a, d, f, E0(r.options.mainLoopModel, Fh(r)), T, y), R);
}
function vYn(e, t) {
  if (t.length > 0) e.messages.push(Ln({
    content: t.map(n => ({
      type: "text",
      text: n
    })),
    isMeta: !0
  }));
  return e;
}
var wYn;
var RYn = b(() => {
  lt();
  Ct();
  lo();
  Sf();
  Pee();
  nct();
  Bv();
  Ql();
  Om();
  gqe();
  yp();
  s9l();
  V4();
  RAt();
  lo();
  j1();
  Zao();
  B6e();
  C$t();
  _9();
  Zjt();
  nqt();
  A9l();
  wYn = require("crypto");
});
export {RWt,Zwm,vYn,wYn,RYn};
