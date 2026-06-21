// @ts-nocheck
import {mt as X_,bo as Vq,configProtoStore as Gq} from "../../vendor/m2458.ts";
import {useTerminalFocus as d$,twe as S2H} from "../../vendor/m2380.ts";
import {Wce as Y1H,Yot as t8_} from "../tools/4310_recursive.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_,fromEnumOpt as f9} from "../../vendor/m5.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {b as L,M as x} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// @ts-nocheck
function usePromptSuggestionTelemetry({
  inputValue: H,
  isAssistantResponding: _
}) {
  let q = X_(W => W.promptSuggestion),
    K = Vq(),
    O = d$(),
    {
      text: T,
      promptId: z,
      shownAt: $,
      acceptedAt: Y,
      generationRequestId: A_2
    } = q,
    w_2 = _ || H.length > 0 ? null : T,
    f = T && $ > 0,
    j = React.useRef(0),
    J = React.useRef(true),
    D = React.useRef(0);
  if ($ > 0 && $ !== D.current) D.current = $, J.current = O, j.current = 0;else if ($ === 0) D.current = 0;
  if (H.length > 0 && j.current === 0 && f) j.current = Date.now();
  let M = React.useCallback(() => {
      Y1H(K), K(W => ({
        ...W,
        promptSuggestion: {
          text: null,
          promptId: null,
          shownAt: 0,
          acceptedAt: 0,
          generationRequestId: null
        }
      }));
    }, [K]),
    X = React.useCallback(() => {
      if (!f) return;
      K(W => ({
        ...W,
        promptSuggestion: {
          ...W.promptSuggestion,
          acceptedAt: Date.now()
        }
      }));
    }, [f, K]),
    P = React.useCallback(() => {
      K(W => {
        if (W.promptSuggestion.shownAt !== 0 || !W.promptSuggestion.text) return W;
        return {
          ...W,
          promptSuggestion: {
            ...W.promptSuggestion,
            shownAt: Date.now()
          }
        };
      });
    }, [K]),
    Z = React.useCallback((W, G) => {
      if (!f) return;
      let R = Y > $,
        h = R || W === T,
        y = h ? Y || Date.now() : Date.now();
      if (c("tengu_prompt_suggestion", {
        source: K_("cli"),
        outcome: K_(h ? "accepted" : "ignored"),
        prompt_id: f9(z),
        ...(A_2 && {
          generationRequestId: a8(A_2)
        }),
        ...(h && {
          acceptMethod: K_(R ? "tab" : "enter")
        }),
        ...(h && {
          timeToAcceptMs: y - $
        }),
        ...(!h && {
          timeToIgnoreMs: y - $
        }),
        ...(j.current > 0 && {
          timeToFirstKeystrokeMs: j.current - $
        }),
        wasFocusedWhenShown: J.current,
        similarity: Math.round(W.length / (T?.length || 1) * 100) / 100,
        ...false
      }), !G?.skipReset) M();
    }, [f, Y, $, T, z, A_2, M]);
  return {
    suggestion: w_2,
    markAccepted: X,
    markShown: P,
    logOutcomeAtSubmission: Z
  };
}
var React;
var MS4 = L(() => {
  S2H();
  v_();
  LJ();
  t8_();
  Gq();
  React = x(WH(), 1);
});

export {usePromptSuggestionTelemetry as dql,React as Qye,MS4 as pql};
