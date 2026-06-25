// @ts-nocheck
import {executeMessageDisplayHooks as KT_,VOo as d2q} from "../../vendor/m5193.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {hasHookForEvent as mV,Wd as YO} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {getSessionId as v_,lt as w_} from "../session/0132_sent.ts";
import {b as L} from "../../runtime.ts";
/**
 * MessageDisplay hook flusher and displayed-content pruning.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function CFH(H: RestoredUnknown): RestoredUnknown {
  return (_, q) => {
    H(K => {
      if (q === void 0) {
        if (!(_ in K.replContexts)) return K;
        let {
          [_]: O,
          ...T
        } = K.replContexts;
        return {
          ...K,
          replContexts: T
        };
      }
      if (K.replContexts[_] === q) return K;
      return {
        ...K,
        replContexts: {
          ...K.replContexts,
          [_]: q
        }
      };
    });
  };
}
function di4({
  getAppState: H,
  onStreamingDisplay: _,
  onMessageDisplay: q
}) {
  let K = HQ_.randomUUID(),
    O = null;
  function T(f: RestoredUnknown): RestoredUnknown {
    if (f.abandoned) return;
    if (f.done) q(f.apiMessageId, f.output);else _(f.output);
  }
  function z(f: RestoredUnknown, j: RestoredUnknown, J: RestoredUnknown, D: RestoredUnknown): RestoredUnknown {
    f.inFlight++;
    let M = Date.now(),
      X = (async () => {
        let P = D;
        try {
          for await (let Z of KT_({
            turnId: f.turnId,
            messageId: f.messageId,
            index: j,
            final: J,
            delta: D
          }, H, f.abortController.signal, ci4)) {
            if (Z.message?.type === "attachment" && (Z.message.attachment.type === "hook_non_blocking_error" || Z.message.attachment.type === "hook_cancelled")) f.stats.errorCount++;
            if (Z.displayContent !== void 0) P = Z.displayContent;
          }
        } catch (Z) {
          f.stats.errorCount++, N(`MessageDisplay hook flush ${j} failed; displaying original delta: ${Z instanceof Error ? Z.message : String(Z)}`, {
            level: "error"
          });
        } finally {
          let Z = Date.now() - M;
          f.stats.totalDurationMs += Z, f.stats.maxDurationMs = Math.max(f.stats.maxDurationMs, Z), f.inFlight--, $(f);
        }
        return P;
      })();
    f.appendChain = f.appendChain.then(async () => {
      f.output += await X, T(f);
    });
  }
  function $(f: RestoredUnknown): RestoredUnknown {
    if (f.abandoned) return;
    if (f.finalized) {
      if (!f.finalDispatched) Y(f, !0);else if (f.inFlight === 0 && !f.stats.summaryEmitted) f.stats.summaryEmitted = !0, c("tengu_message_display_hooks", {
        flushCount: f.index,
        errorCount: f.stats.errorCount,
        totalDurationMs: f.stats.totalDurationMs,
        maxDurationMs: f.stats.maxDurationMs
      });
      return;
    }
    A(f);
  }
  function Y(f: RestoredUnknown, j: RestoredUnknown): RestoredUnknown {
    if (f.flushTimer !== null) clearTimeout(f.flushTimer), f.flushTimer = null;
    if (f.inFlight >= Qi4) return;
    let J = j ? f.raw.length : f.raw.lastIndexOf(`
`) + 1,
      D = f.raw.slice(f.flushedOffset, J);
    if (!j && D === "") return;
    if (j) f.finalDispatched = !0;
    f.flushedOffset = J, f.lastFlushAt = Date.now();
    let M = f.index;
    f.index++, z(f, M, j, D);
  }
  function A(f: RestoredUnknown): RestoredUnknown {
    if (f.flushTimer !== null) return;
    if (f.inFlight >= Qi4) return;
    if (f.raw.lastIndexOf(`
`) + 1 <= f.flushedOffset) return;
    let J = Date.now() - f.lastFlushAt;
    if (J >= gi4) {
      Y(f, !1);
      return;
    }
    f.flushTimer = setTimeout((D, M) => {
      if (D.flushTimer = null, !D.finalized && !D.abandoned) M(D, !1);
    }, gi4 - J, f, Y);
  }
  function w(f: RestoredUnknown): RestoredUnknown {
    if (f.abandoned = !0, f.flushTimer !== null) clearTimeout(f.flushTimer), f.flushTimer = null;
    f.abortController.abort();
  }
  return {
    newTurn() {
      if (O && !O.finalized) w(O);
      O = null, K = HQ_.randomUUID();
    },
    begin(f) {
      if (O && !O.finalized) w(O);
      if (!mV("MessageDisplay", H(), v_())) {
        O = null, _(null);
        return;
      }
      O = {
        apiMessageId: f,
        messageId: HQ_.randomUUID(),
        turnId: K,
        raw: "",
        flushedOffset: 0,
        index: 0,
        output: "",
        appendChain: Promise.resolve(),
        lastFlushAt: 0,
        flushTimer: null,
        inFlight: 0,
        abortController: new AbortController(),
        finalized: !1,
        finalDispatched: !1,
        done: !1,
        abandoned: !1,
        stats: {
          totalDurationMs: 0,
          maxDurationMs: 0,
          errorCount: 0,
          summaryEmitted: !1
        }
      }, _("");
    },
    delta(f) {
      if (O === null || O.finalized) return;
      O.raw += f, A(O);
    },
    entryLanded(f) {
      let j = O;
      if (j === null || j.apiMessageId !== f.message.id) return;
      if (j.raw === "" || !f.message.content.some(J => J.type === "text")) return;
      j.done = !0, T(j), _("");
    },
    finalize() {
      let f = O;
      if (f === null) return;
      if (f.finalized = !0, O = null, _(null), f.raw === "" && f.index === 0) return;
      f.done = !0, Y(f, !0), T(f);
    }
  };
}
function lRq(H: RestoredUnknown, _: RestoredUnknown): RestoredUnknown {
  if (Object.keys(H.displayedMessageContent).length === 0) return H;
  let q = new Set();
  for (let T of _) if (T.type === "assistant") q.add(T.message.id);
  let K = {},
    O = !1;
  for (let [T, z] of Object.entries(H.displayedMessageContent)) if (q.has(T)) K[T] = z;else O = !0;
  if (!O) return H;
  return {
    ...H,
    displayedMessageContent: K
  };
}
async function li4(H: RestoredUnknown, _: RestoredUnknown, q: RestoredUnknown, K: RestoredUnknown): RestoredUnknown {
  if (!mV("MessageDisplay", q(), v_())) return H;
  let O = H.message.content.map($ => $.type === "text" ? $.text : "").join("");
  if (O === "") return H;
  let T;
  try {
    for await (let $ of KT_({
      turnId: _,
      messageId: HQ_.randomUUID(),
      index: 0,
      final: !0,
      delta: O
    }, q, K, ci4)) if ($.displayContent !== void 0) T = $.displayContent;
  } catch ($) {
    return N(`MessageDisplay hook failed for completed message; emitting original text: ${$ instanceof Error ? $.message : String($)}`, {
      level: "error"
    }), H;
  }
  if (T === void 0) return H;
  let z = !0;
  return {
    ...H,
    message: {
      ...H.message,
      content: H.message.content.map($ => {
        if ($.type !== "text") return $;
        let Y = z ? T : "";
        return z = !1, {
          ...$,
          text: Y
        };
      })
    }
  };
}
var HQ_,
  nhT = 10,
  gi4,
  Qi4 = 3,
  ci4 = 1e4;
var nRq = L(() => {
  w_();
  y_();
  FH();
  YO();
  d2q();
  HQ_ = require("crypto"), gi4 = 1000 / nhT;
});
export {CFH as fVe,di4 as Edc,lRq as w2o,li4 as Cdc,HQ_ as Bzt,nhT as AVm,gi4 as Tdc,Qi4 as Sdc,ci4 as bdc,nRq as k2o};
