// @ts-nocheck
import {ug as bA,ZR as PP} from "../../vendor/m2551.ts";
import {mr as R8,ki as v7} from "../../vendor/m2453.ts";
import {Ie as vH,ln as M6} from "../telemetry/0594_feature_name.ts";
import {gHi as rM7,iEn as yf6,K4 as Xp} from "../session/2521_id.ts";
import {formatRelativeTimeAgo as ed,ps as H9} from "../../vendor/m238.ts";
import {tn as K6,Hc as K1} from "../../vendor/m235.ts";
import {qH as ah,Iwe as gSH} from "./2545_current.ts";
import {Or as S8,Ts as w9} from "../../vendor/m2542.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {lVn as Ng6,Rvo as cjq} from "../../vendor/m4888.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {truncateToWidth as U9} from "../../vendor/m237.ts";
import {buildSystemPrompt as Pg,ope as jSH} from "../../vendor/m236.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {initModule as PL,Oz as _Q} from "../../vendor/m2799.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Semantic restoration for tui/5295_initialQuery.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

// FIXME: unverified name
/** Internal restored helper for tui/5295_initialQuery.ts; behavior is preserved. */
function MC4({
  initialQuery: H,
  onSelect: _,
  onCancel: q
}: any): any {
  bA("history-search");
  let {
      columns: K
    } = R8(),
    [O, T] = e_H.useState("everywhere"),
    [z, $] = e_H.useState(null),
    [Y, A] = e_H.useState(H ?? ""),
    w = e_H.useRef({});
  e_H.useEffect((): any => {
    vH("history_search_open");
  }, []), e_H.useEffect((): any => {
    let P = w.current[O];
    if (P) {
      $(P);
      return;
    }
    $(null);
    let Z = !1;
    return (async (): Promise<any> => {
      let W = rM7(O),
        G = [];
      for await (let R of W) {
        if (Z) {
          W.return(void 0);
          return;
        }
        let h = R.display,
          y = h.indexOf(`
`),
          E = ed(new Date(R.timestamp));
        G.push({
          entry: R,
          display: h,
          lower: h.toLowerCase(),
          firstLine: y === -1 ? h : h.slice(0, y),
          age: E + " ".repeat(Math.max(0, DC4 - K6(E)))
        });
      }
      if (!Z) w.current[O] = G, $(G);
    })(), (): any => {
      Z = !0;
    };
  }, [O]);
  let f = ah("historySearch:cycleScope", "HistorySearch", "ctrl+s");
  S8("historySearch:cycleScope", (): any => {
    let P = yf6.indexOf(O),
      Z = yf6[(P + 1) % yf6.length];
    T(Z), c("tengu_history_picker_scope", {
      from: tH(O),
      to: tH(Z)
    });
  }, {
    context: "HistorySearch"
  });
  let j = e_H.useMemo((): any => {
      if (!z) return [];
      let P = Y.trim().toLowerCase();
      if (!P) return z;
      let Z = [],
        W = [];
      for (let G of z) if (G.lower.includes(P)) Z.push(G);else if (matchesSubsequence(G.lower, P)) W.push(G);
      return Z.concat(W);
    }, [z, Y]),
    J = K >= 100,
    D = J ? Math.floor((K - 6) * 0.5) : K - 6,
    M = Math.max(20, D - DC4 - 1),
    X = J ? Math.max(20, K - D - 12) : Math.max(20, K - 10);
  return AR.createElement(Ng6, {
    title: AR.createElement(V, null, "Search prompts ", AR.createElement(V, {
      color: "suggestion"
    }, "\xB7 ", O)),
    placeholder: "Filter history\u2026",
    initialQuery: H,
    items: j,
    getKey: (P: any): any => String(P.entry.timestamp),
    onQueryChange: A,
    onSelect: (P: any): any => {
      c("tengu_history_picker_select", {
        result_count: j.length,
        query_length: Y.length
      }), P.entry.resolve().then(_);
    },
    onCancel: q,
    resetKey: O,
    extraHints: AR.createElement(K_, {
      chord: f,
      action: "scope"
    }),
    emptyMessage: (P: any): any => z === null ? "Loading\u2026" : P ? "No matching prompts" : "No history yet",
    selectAction: "use",
    direction: "up",
    previewPosition: J ? "right" : "bottom",
    renderItem: (P: any, Z: any): any => AR.createElement(V, null, AR.createElement(V, {
      dimColor: !0
    }, P.age), AR.createElement(V, {
      color: Z ? "suggestion" : void 0
    }, " ", U9(P.firstLine, M))),
    renderPreview: (P: any): any => {
      let Z = Pg(P.display, X, {
          hard: !0
        }).split(`
`).filter((h: any): any => h.trim() !== ""),
        W = Z.length > el6,
        G = Z.slice(0, W ? el6 - 1 : el6),
        R = Z.length - G.length;
      return AR.createElement(B, {
        flexDirection: "column",
        borderStyle: "round",
        borderDimColor: !0,
        paddingX: 1,
        height: el6 + 2
      }, G.map((h: any, y: any): any => AR.createElement(V, {
        key: y,
        dimColor: !0
      }, h)), AR.createElement(PL, {
        count: R
      }));
    }
  });
}
/** Internal restored helper for tui/5295_initialQuery.ts; behavior is preserved. */
function matchesSubsequence(H: any, _: any): any {
  let q = 0;
  for (let K = 0; K < H.length && q < _.length; K++) if (H[K] === _[q]) q++;
  return q === _.length;
}
var AR,
  e_H,
  el6 = 6,
  DC4 = 8;
var XC4 = L((): any => {
  PP();
  Xp();
  v7();
  K1();
  jSH();
  nH();
  gSH();
  w9();
  M6();
  y_();
  H9();
  cjq();
  gq();
  _Q();
  AR = u(WH(), 1), e_H = u(WH(), 1);
});

export {MC4 as o6l,matchesSubsequence as FHm,AR as RI,e_H as Jne,el6 as _Jn,DC4 as r6l,XC4 as s6l};
