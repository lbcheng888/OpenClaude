// @ts-nocheck
import {bG as EZ,hS as vP} from "./4362_toolUseCount.ts";
import {gc as T5,bo as Zq,_t as J_,uo as wq} from "../../vendor/m2468.ts";
import {eS as dD,zM as Pv} from "../../vendor/m2240.ts";
import {OFo as KZq,Bjl as yb4,Ujl as vb4,$jl as Eb4} from "./5382_id.ts";
import {_r as R8,ui as v7} from "../../vendor/m2463.ts";
import {useClock as u9} from "../../vendor/m2442.ts";
import {F7t as IT_,cyt as _g_} from "../../vendor/m5372.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {b as L,x as u} from "../../runtime.ts";
import {je as nH} from "../../vendor/m2462.ts";
import {et as WH} from "../../vendor/m2261.ts";
/**
 * React effect that refreshes task decorations from subagent status-line output.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Compare task decoration maps by rendered content. */
function areTaskDecorationsEqual(H: any, _: any): any {
  let q = Object.keys(H),
    K = Object.keys(_);
  if (q.length !== K.length) return !1;
  for (let O of q) if (H[O]?.content !== _[O]?.content) return !1;
  return !0;
}
/** Select non-evicted tasks eligible for status-line decoration. */
function getDecoratableTasks(H: any): any {
  return Object.values(H).filter(_ => EZ(_) && _.evictAfter !== 0);
}
/** Cross-module React effect: periodically refresh task decorations. */
function Cb4(): any {
  let H = T5(),
    _ = Zq(),
    K = J_(A => A.settings?.subagentStatusLine?.command !== void 0) && (!dD() || KZq() !== void 0),
    O = J_(A => K ? getDecoratableTasks(A.tasks).length : 0),
    {
      columns: T
    } = R8(),
    z = u9(),
    $ = $g_.useRef(!1),
    Y = $g_.useRef(new Map());
  $g_.useEffect(() => {
    if (!K) {
      _(J => Object.keys(J.taskDecorations).length === 0 ? J : {
        ...J,
        taskDecorations: {}
      });
      return;
    }
    let A = !1,
      w = () => {
        if ($.current) return;
        let J = H.getState(),
          D = getDecoratableTasks(J.tasks);
        if (yb4(Y.current, D.map(X => ({
          id: X.id,
          tokenCount: X.progress?.tokenCount ?? 0
        }))), D.length === 0) {
          _(X => Object.keys(X.taskDecorations).length === 0 ? X : {
            ...X,
            taskDecorations: {}
          });
          return;
        }
        $.current = !0;
        let M = new Map();
        for (let [X, P] of J.agentNameRegistry) M.set(P, X);
        vb4(D, Math.max(0, T - IT_()), M, Y.current).then(X => {
          if (A) return;
          _(P => {
            let Z = new Set(D.map(G => G.id)),
              W = {};
            for (let [G, R] of Object.entries(X)) if (Z.has(G)) W[G] = R;
            return areTaskDecorationsEqual(P.taskDecorations, W) ? P : {
              ...P,
              taskDecorations: W
            };
          });
        }).catch(X => {
          N(`subagentStatusLine tick failed: ${X}`, {
            level: "error"
          });
        }).finally(() => {
          if ($.current = !1, getDecoratableTasks(H.getState().tasks).length === 0) w();
        });
      };
    if (O === 0) {
      w();
      return;
    }
    let f = z.setTimeout(w, zJT),
      j = z.setTimeout(function J() {
        try {
          w();
        } finally {
          j = z.setTimeout(J, Sb4);
        }
      }, Sb4);
    return () => {
      A = !0, f(), j();
    };
  }, [K, O, T, H, _, z]);
}
var $g_,
  zJT = 300,
  Sb4 = 5000;
var bb4 = L(() => {
  _g_();
  v7();
  nH();
  wq();
  vP();
  FH();
  Pv();
  Eb4();
  $g_ = u(WH(), 1);
});
export {areTaskDecorationsEqual as zFm,getDecoratableTasks as LFo,Cb4 as Wjl,$g_ as $7t,zJT as KFm,Sb4 as qjl,bb4 as Gjl};
