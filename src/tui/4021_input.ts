// @ts-nocheck
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {useTheme as ga} from "../../vendor/m2274.ts";
import {Ace as rce,W2t as b2t} from "../../vendor/m3929.ts";
import {Eve as ave,Ri} from "../tools/2227_userFacingName.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function _Na(e) {
  let t = gNa.c(13),
    {
      input: n,
      progressMessagesForMessage: r,
      style: o,
      tool: s,
      tools: i,
      verbose: a,
      isTranscriptMode: l
    } = e,
    {
      columns: c
    } = hr(),
    [u] = ga();
  if (!s || !s.renderToolUseRejectedMessage) {
    let f;
    if (t[0] === Symbol.for("react.memo_cache_sentinel")) f = dbK.createElement(rce, null), t[0] = f;else f = t[0];
    return f;
  }
  let d = s.inputSchema,
    p,
    m;
  if (t[1] !== c || t[2] !== n || t[3] !== l || t[4] !== r || t[5] !== o || t[6] !== u || t[7] !== s || t[8] !== i || t[9] !== a) {
    m = Symbol.for("react.early_return_sentinel");
    e: {
      let f = d.safeParse(n);
      if (!f.success) {
        let A;
        if (t[12] === Symbol.for("react.memo_cache_sentinel")) A = dbK.createElement(rce, null), t[12] = A;else A = t[12];
        m = A;
        break e;
      }
      p = s.renderToolUseRejectedMessage(f.data, {
        columns: c,
        messages: [],
        tools: i,
        verbose: a,
        progressMessagesForMessage: ave(r),
        style: o,
        theme: u,
        isTranscriptMode: l
      }) ?? dbK.createElement(rce, null);
    }
    t[1] = c, t[2] = n, t[3] = l, t[4] = r, t[5] = o, t[6] = u, t[7] = s, t[8] = i, t[9] = a, t[10] = p, t[11] = m;
  } else p = t[10], m = t[11];
  if (m !== Symbol.for("react.early_return_sentinel")) return m;
  return p;
}
var gNa, dbK;
var _pH = b(() => {
  Ii();
  Je();
  Ri();
  b2t();
  gNa = L(nt(), 1), dbK = L(Te(), 1);
});

export {_Na as UBa,gNa as FBa,dbK as Aqe,_pH as $Ba};
