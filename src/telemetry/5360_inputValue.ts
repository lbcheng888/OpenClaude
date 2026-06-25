// @ts-nocheck
import {_t as X_,bo as Vq,uo as Gq} from "../../vendor/m2468.ts";
import {useTerminalFocus as d$,Uve as S2H} from "../../vendor/m2390.ts";
import {Bce as Y1H,jit as t8_} from "../tools/4330_recursive.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Ve as K_,Bo as f9} from "../../vendor/m5.ts";
import {xr as a8,QT as LJ} from "../../vendor/m1461.ts";
import {b as L,x} from "../../runtime.ts";
import {et as WH} from "../../vendor/m2261.ts";
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
export {usePromptSuggestionTelemetry as Tzl,React as xSe,MS4 as Szl};
