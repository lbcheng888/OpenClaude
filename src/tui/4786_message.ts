// @ts-nocheck
import {H6e as c6e,$fo as Pmo,XYa as xza,Rct as nct,LHe as gHe} from "../hooks/4340_isCollapsible.ts";
import {pyl as Wgl,aGn as TWn,dyl as jgl,pye as z_e,lo} from "../tools/5190_userPromptCount.ts";
import {uyl as qgl,Ujt as pjt} from "./4815_current.ts";
import {jY as xY,Hct as sct} from "./4025_message.ts";
import {bP as SP,Vhe as khe} from "../../vendor/m3282.ts";
import {oyl as Mgl,syl as Ngl} from "../../vendor/m4784.ts";
import {tyl as Pgl,nyl as Ogl} from "../../vendor/m4783.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function Fgl(e, t, n, r) {
  for (let o = t + 1; o < e.length; o++) {
    let s = e[o];
    if (s?.type === "assistant") {
      let i = s.message.content[0];
      if (i?.type === "thinking" || i?.type === "redacted_thinking") continue;
      if (i?.type === "tool_use") {
        if (c6e(i.name, i.input, n).isCollapsible) continue;
        if (r.has(i.id)) continue;
      }
      return true;
    }
    if (s?.type === "system" || s?.type === "attachment") continue;
    if (s?.type === "user") {
      if (s.message.content[0]?.type === "tool_result") continue;
    }
    if (s?.type === "grouped_tool_use") {
      let i = s.messages[0]?.message.content[0]?.input;
      if (c6e(s.toolName, i, n).isCollapsible) continue;
    }
    return true;
  }
  return false;
}
function iQp(e) {
  let t = Bgl.c(73),
    {
      message: n,
      isUserContinuation: r,
      hasContentAfter: o,
      tools: s,
      commands: i,
      verbose: a,
      showMessageTimestamps: l,
      inProgressToolUseIDs: c,
      streamingToolUseIDs: u,
      screen: d,
      canAnimate: p,
      onOpenRateLimitOptions: m,
      latestBashOutputUUID: f,
      columns: A,
      isLoading: h,
      lookups: g
    } = e,
    _ = d === "transcript",
    y = n.type === "grouped_tool_use",
    T = n.type === "collapsed_read_search",
    S;
  if (t[0] !== o || t[1] !== c || t[2] !== T || t[3] !== h || t[4] !== n) S = T && (Pmo(n, c) || h && !o), t[0] = o, t[1] = c, t[2] = T, t[3] = h, t[4] = n, t[5] = S;else S = t[5];
  let C = S,
    R;
  if (t[6] !== T || t[7] !== y || t[8] !== n) R = y ? n.displayMessage : T ? xza(n) : n, t[6] = T, t[7] = y, t[8] = n, t[9] = R;else R = t[9];
  let k = R,
    x;
  if (t[10] !== T || t[11] !== y || t[12] !== g || t[13] !== n) x = y || T ? [] : Wgl(n, g), t[10] = T, t[11] = y, t[12] = g, t[13] = n, t[14] = x;else x = t[14];
  let I = x,
    H;
  if (t[15] !== c || t[16] !== T || t[17] !== y || t[18] !== g || t[19] !== n || t[20] !== d || t[21] !== u) {
    let Y = y || T ? TWn : jgl(n, g);
    H = qgl(n, u, c, Y, d, g), t[15] = c, t[16] = T, t[17] = y, t[18] = g, t[19] = n, t[20] = d, t[21] = u, t[22] = H;
  } else H = t[22];
  let P = H,
    O = false;
  if (p) if (y) {
    let Y;
    if (t[23] !== c || t[24] !== n.messages) {
      let J;
      if (t[26] !== c) J = ee => {
        let te = ee.message.content[0];
        return te?.type === "tool_use" && c.has(te.id);
      }, t[26] = c, t[27] = J;else J = t[27];
      Y = n.messages.some(J), t[23] = c, t[24] = n.messages, t[25] = Y;
    } else Y = t[25];
    O = Y;
  } else if (T) {
    let Y;
    if (t[28] !== c || t[29] !== n) Y = Pmo(n, c), t[28] = c, t[29] = n, t[30] = Y;else Y = t[30];
    O = Y;
  } else {
    let Y;
    if (t[31] !== c || t[32] !== n) {
      let J = z_e(n);
      Y = !J || c.has(J), t[31] = c, t[32] = n, t[33] = Y;
    } else Y = t[33];
    O = Y;
  }
  let D;
  if (t[34] !== k.message || t[35] !== k.timestamp || t[36] !== k.type || t[37] !== _ || t[38] !== l) D = k.type === "assistant" && (l || _ && k.message.content.some(hasContentAfterCollapsedGroup)) && (k.timestamp || k.message.model), t[34] = k.message, t[35] = k.timestamp, t[36] = k.type, t[37] = _, t[38] = l, t[39] = D;else D = t[39];
  let M = D,
    U = !M,
    $ = M ? undefined : A,
    F;
  if (t[40] !== i || t[41] !== c || t[42] !== C || t[43] !== P || t[44] !== _ || t[45] !== r || t[46] !== f || t[47] !== g || t[48] !== n || t[49] !== m || t[50] !== I || t[51] !== O || t[52] !== U || t[53] !== $ || t[54] !== s || t[55] !== a) F = MN.createElement(xY, {
    message: n,
    lookups: g,
    addMargin: U,
    containerWidth: $,
    tools: s,
    commands: i,
    verbose: a,
    inProgressToolUseIDs: c,
    progressMessagesForMessage: I,
    shouldAnimate: O,
    shouldShowDot: true,
    isTranscriptMode: _,
    isStatic: P,
    onOpenRateLimitOptions: m,
    isActiveCollapsedGroup: C,
    isUserContinuation: r,
    latestBashOutputUUID: f
  }), t[40] = i, t[41] = c, t[42] = C, t[43] = P, t[44] = _, t[45] = r, t[46] = f, t[47] = g, t[48] = n, t[49] = m, t[50] = I, t[51] = O, t[52] = U, t[53] = $, t[54] = s, t[55] = a, t[56] = F;else F = t[56];
  let W = F;
  if (!M) {
    let Y;
    if (t[57] !== W) Y = MN.createElement(SP, null, W), t[57] = W, t[58] = Y;else Y = t[58];
    return Y;
  }
  let G;
  if (t[59] !== k || t[60] !== _ || t[61] !== l) G = MN.createElement(Mgl, {
    message: k,
    isTranscriptMode: _,
    showMessageTimestamps: l
  }), t[59] = k, t[60] = _, t[61] = l, t[62] = G;else G = t[62];
  let K;
  if (t[63] !== k || t[64] !== _) K = MN.createElement(Pgl, {
    message: k,
    isTranscriptMode: _
  }), t[63] = k, t[64] = _, t[65] = K;else K = t[65];
  let Q;
  if (t[66] !== K || t[67] !== G) Q = MN.createElement(B, {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 1,
    marginTop: 1
  }, G, K), t[66] = K, t[67] = G, t[68] = Q;else Q = t[68];
  let V;
  if (t[69] !== A || t[70] !== W || t[71] !== Q) V = MN.createElement(SP, null, MN.createElement(B, {
    width: A,
    flexDirection: "column"
  }, Q, W)), t[69] = A, t[70] = W, t[71] = Q, t[72] = V;else V = t[72];
  return V;
}
function hasContentAfterCollapsedGroup(allMessages) {
  return allMessages.type === "text";
}
function MessageRow(props, t) {
  if (props.type === "grouped_tool_use") return props.messages.some(r => {
    let o = r.message.content[0];
    return o?.type === "tool_use" && t.has(o.id);
  });
  if (props.type === "collapsed_read_search") return nct(props).some(o => t.has(o));
  let n = z_e(props);
  return !!n && t.has(n);
}
function isTextBlock(block, t) {
  if (block.type === "grouped_tool_use") return block.messages.every(r => {
    let o = r.message.content[0];
    return o?.type === "tool_use" && t.has(o.id);
  });
  if (block.type === "collapsed_read_search") return nct(block).every(o => t.has(o));
  if (block.type === "assistant") {
    let r = block.message.content[0];
    if (r?.type === "server_tool_use") return t.has(r.id);
  }
  let n = z_e(block);
  return !n || t.has(n);
}
function isAnyToolUseInProgress(message, streamingToolUseIDs) {
  if (message.message !== streamingToolUseIDs.message) return false;
  if (message.screen !== streamingToolUseIDs.screen) return false;
  if (message.verbose !== streamingToolUseIDs.verbose) return false;
  if (message.showMessageTimestamps !== streamingToolUseIDs.showMessageTimestamps) return false;
  if (message.message.type === "collapsed_read_search" && streamingToolUseIDs.screen !== "transcript") return false;
  if (message.columns !== streamingToolUseIDs.columns) return false;
  let n = message.latestBashOutputUUID === message.message.uuid,
    r = streamingToolUseIDs.latestBashOutputUUID === streamingToolUseIDs.message.uuid;
  if (n !== r) return false;
  let o = MessageRow(message.message, message.streamingToolUseIDs),
    s = isTextBlock(message.message, message.lookups.resolvedToolUseIDs);
  if (o || !s) return false;
  return true;
}
var Bgl, MN, pT4;
var BT4 = b(() => {
  Je();
  gHe();
  lo();
  sct();
  Ogl();
  pjt();
  Ngl();
  khe();
  Bgl = L(nt(), 1), MN = L(Te(), 1);
  pT4 = MN.memo(iQp, isAnyToolUseInProgress);
});

export {Fgl as ayl,iQp as Wem,hasContentAfterCollapsedGroup as Gem,MessageRow as Vem,isTextBlock as Kem,isAnyToolUseInProgress as zem,Bgl as iyl,MN as qN,pT4 as lyl,BT4 as cyl};
