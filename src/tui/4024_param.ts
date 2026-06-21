// @ts-nocheck
import {QBa as HNa,ZBa as INa} from "../../vendor/m4022.ts";
import {yUn as PFn,_Un as DFn,hce as oce,iIe as qHe,act as Nlt} from "./3943_children.ts";
import {s_e as Wge,hqe as z4e,wct as tct,mI as aI,lo} from "../tools/5190_userPromptCount.ts";
import {NBa as ANa,BBa as hNa} from "../../vendor/m4019.ts";
import {UBa as _Na,$Ba as yNa} from "./4021_input.ts";
import {Bao as Mio,Fao as Nio} from "../../vendor/m4009.ts";
import {YBa as RNa,JBa as xNa} from "./4022_classifierApprovals.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {sl as rl} from "../../vendor/m715.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Pp as tm} from "../config/2273_loggedTmuxCcDisable.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function ONa(e) {
  let t = React.c(47),
    {
      param: n,
      message: r,
      lookups: o,
      progressMessagesForMessage: s,
      style: i,
      tools: a,
      verbose: l,
      width: c,
      isTranscriptMode: u
    } = e,
    d = HNa(n.tool_use_id, a, o),
    p = PFn(),
    m = DFn(),
    f = ReactContextRuntime_2.useContext(oce),
    A;
  if (t[0] !== o.assistantUuidByToolUseID || t[1] !== n.tool_use_id) A = o.assistantUuidByToolUseID.get(n.tool_use_id), t[0] = o.assistantUuidByToolUseID, t[1] = n.tool_use_id, t[2] = A;else A = t[2];
  let h = A,
    g = qHe(h),
    [_, y] = ReactContextRuntime_2.useState(false);
  if (!d) return null;
  let T;
  if (typeof n.content === "string" && n.content.startsWith(Wge)) {
    let I;
    if (t[3] === Symbol.for("react.memo_cache_sentinel")) I = ReactContextRuntime.createElement(ANa, null), t[3] = I;else I = t[3];
    T = I;
  } else if (typeof n.content === "string" && (n.content.startsWith(z4e) || n.content.startsWith(tct) && d.tool?.renderToolUseRejectedMessage !== undefined) || n.content === aI) {
    let I = d.toolUse.input,
      H;
    if (t[4] !== u || t[5] !== o || t[6] !== s || t[7] !== i || t[8] !== I || t[9] !== d.tool || t[10] !== a || t[11] !== l) H = ReactContextRuntime.createElement(_Na, {
      input: I,
      progressMessagesForMessage: s,
      tool: d.tool,
      tools: a,
      lookups: o,
      style: i,
      verbose: l,
      isTranscriptMode: u
    }), t[4] = u, t[5] = o, t[6] = s, t[7] = i, t[8] = I, t[9] = d.tool, t[10] = a, t[11] = l, t[12] = H;else H = t[12];
    T = H;
  } else if (n.is_error) {
    let I;
    if (t[13] !== u || t[14] !== n || t[15] !== s || t[16] !== d.tool || t[17] !== a || t[18] !== l) I = ReactContextRuntime.createElement(Mio, {
      progressMessagesForMessage: s,
      tool: d.tool,
      tools: a,
      param: n,
      verbose: l,
      isTranscriptMode: u
    }), t[13] = u, t[14] = n, t[15] = s, t[16] = d.tool, t[17] = a, t[18] = l, t[19] = I;else I = t[19];
    T = I;
  } else {
    let I;
    if (t[20] !== u || t[21] !== o || t[22] !== r || t[23] !== s || t[24] !== i || t[25] !== d.tool || t[26] !== d.toolUse.id || t[27] !== a || t[28] !== l || t[29] !== c) I = ReactContextRuntime.createElement(RNa, {
      message: r,
      lookups: o,
      toolUseID: d.toolUse.id,
      progressMessagesForMessage: s,
      style: i,
      tool: d.tool,
      tools: a,
      verbose: l,
      width: c,
      isTranscriptMode: u
    }), t[20] = u, t[21] = o, t[22] = r, t[23] = s, t[24] = i, t[25] = d.tool, t[26] = d.toolUse.id, t[27] = a, t[28] = l, t[29] = c, t[30] = I;else I = t[30];
    T = I;
  }
  let S = m === n.tool_use_id,
    C;
  if (t[31] !== n.tool_use_id || t[32] !== p) C = undefined, t[31] = n.tool_use_id, t[32] = p, t[33] = C;else C = t[33];
  let R;
  if (t[34] !== p) R = undefined, t[34] = p, t[35] = R;else R = t[35];
  let k;
  if (t[36] !== _ || t[37] !== h || t[38] !== S || t[39] !== f || t[40] !== g) k = null, t[36] = _, t[37] = h, t[38] = S, t[39] = f, t[40] = g, t[41] = k;else k = t[41];
  let x;
  if (t[42] !== T || t[43] !== C || t[44] !== R || t[45] !== k) x = ReactContextRuntime.createElement(B, {
    flexDirection: "column",
    onMouseEnter: C,
    onMouseLeave: R
  }, T, k), t[42] = T, t[43] = C, t[44] = R, t[45] = k, t[46] = x;else x = t[46];
  return x;
}
var React, ReactContextRuntime, ReactContextRuntime_2;
var loadModule4175 = b(() => {
  rl();
  Je();
  tm();
  lo();
  Nlt();
  hNa();
  Nio();
  yNa();
  xNa();
  INa();
  React = L(nt(), 1), ReactContextRuntime = L(Te(), 1), ReactContextRuntime_2 = L(Te(), 1);
});

export {ONa as nFa,React as tFa,ReactContextRuntime as Fte,ReactContextRuntime_2 as a2n,loadModule4175 as rFa};
