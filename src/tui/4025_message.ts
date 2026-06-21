// @ts-nocheck
import {zNa as w1a,JNa as x1a} from "../../vendor/m4001.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pMa as YOa,mMa as JOa} from "../../vendor/m3934.ts";
import {K9i as M$i,HWr as B5r} from "../../vendor/m2802.ts";
import {Ms as Ds,Pp as tm} from "../config/2273_loggedTmuxCcDisable.ts";
import {yBa as J1a,TBa as X1a} from "../../vendor/m4011.ts";
import {dg as ag,J4 as N4} from "../../vendor/m2570.ts";
import {mqe as G4e,ZUn as mUn} from "../../vendor/m4000.ts";
import {IBa as cNa,DBa as uNa} from "../../vendor/m4017.ts";
import {SBa as Q1a,bBa as Z1a} from "../core/4013_message.ts";
import {bP as SP,Vhe as khe} from "../../vendor/m3282.ts";
import {hBa as K1a,gBa as z1a} from "./4011_content.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {OBa as pNa,LBa as mNa} from "../../vendor/m4018.ts";
import {jUn as rUn,yao as gio} from "../../vendor/m3983.ts";
import {nFa as ONa,rFa as LNa} from "./4024_param.ts";
import {XR as Ev,configProtoStore as fo} from "../../vendor/m2458.ts";
import {A$ as o$} from "../../vendor/m2227.ts";
import {k1a as aMa,H1a as lMa} from "./3971_param.ts";
import {eao as Qso,d1a as jLa} from "../../vendor/m3959.ts";
import {EMa as iLa,CMa as aLa} from "../../vendor/m3939.ts";
import {IUn as GFn,tao as Zso} from "../../vendor/m3960.ts";
import {J4e as x4e,Hte as Tte} from "../config/3934_claude_haiku_4_5.ts";
import {TMa as rLa,SMa as oLa} from "./3939_block.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function gbp(e) {
  let t = bUn.c(109),
    {
      message: n,
      lookups: r,
      containerWidth: o,
      addMargin: s,
      tools: i,
      commands: a,
      verbose: l,
      inProgressToolUseIDs: c,
      progressMessagesForMessage: u,
      shouldAnimate: d,
      shouldShowDot: p,
      style: m,
      width: f,
      isTranscriptMode: A,
      onOpenRateLimitOptions: h,
      isActiveCollapsedGroup: g,
      isUserContinuation: _,
      latestBashOutputUUID: y,
      disableDisplayOverride: T
    } = e,
    S = _ === undefined ? false : _;
  switch (n.type) {
    case "attachment":
      {
        let C = o ?? "100%",
          R;
        if (t[0] !== s || t[1] !== A || t[2] !== n.attachment || t[3] !== n.uuid || t[4] !== l) R = Mu.createElement(w1a, {
          addMargin: s,
          attachment: n.attachment,
          verbose: l,
          isTranscriptMode: A,
          messageUuid: n.uuid
        }), t[0] = s, t[1] = A, t[2] = n.attachment, t[3] = n.uuid, t[4] = l, t[5] = R;else R = t[5];
        let k;
        if (t[6] !== C || t[7] !== R) k = Mu.createElement(B, {
          flexDirection: "column",
          width: C
        }, R), t[6] = C, t[7] = R, t[8] = k;else k = t[8];
        return k;
      }
    case "assistant":
      {
        let C;
        if (t[9] !== r.firstTextBlockUuidByMessageID || t[10] !== n.message.id) C = r.firstTextBlockUuidByMessageID.get(n.message.id), t[9] = r.firstTextBlockUuidByMessageID, t[10] = n.message.id, t[11] = C;else C = t[11];
        let R = C,
          k = o ?? "100%",
          x;
        if (t[12] !== s || t[13] !== a || t[14] !== T || t[15] !== R || t[16] !== c || t[17] !== A || t[18] !== r || t[19] !== n.advisorModel || t[20] !== n.message.content || t[21] !== n.message.id || t[22] !== n.uuid || t[23] !== h || t[24] !== u || t[25] !== d || t[26] !== p || t[27] !== i || t[28] !== l || t[29] !== f) {
          let H;
          if (t[31] !== s || t[32] !== a || t[33] !== T || t[34] !== R || t[35] !== c || t[36] !== A || t[37] !== r || t[38] !== n.advisorModel || t[39] !== n.message.id || t[40] !== n.uuid || t[41] !== h || t[42] !== u || t[43] !== d || t[44] !== p || t[45] !== i || t[46] !== l || t[47] !== f) H = (P, O) => Mu.createElement(hasContentAfterCollapsedGroup, {
            key: O,
            param: P,
            addMargin: s,
            tools: i,
            commands: a,
            verbose: l,
            inProgressToolUseIDs: c,
            progressMessagesForMessage: u,
            shouldAnimate: d,
            shouldShowDot: p,
            width: f,
            inProgressToolCallCount: c.size,
            isTranscriptMode: A,
            lookups: r,
            onOpenRateLimitOptions: h,
            advisorModel: n.advisorModel,
            messageUuid: n.uuid,
            apiMessageId: T ? undefined : n.message.id,
            isFirstTextBlock: R === undefined || R === n.uuid
          }), t[31] = s, t[32] = a, t[33] = T, t[34] = R, t[35] = c, t[36] = A, t[37] = r, t[38] = n.advisorModel, t[39] = n.message.id, t[40] = n.uuid, t[41] = h, t[42] = u, t[43] = d, t[44] = p, t[45] = i, t[46] = l, t[47] = f, t[48] = H;else H = t[48];
          x = n.message.content.map(H), t[12] = s, t[13] = a, t[14] = T, t[15] = R, t[16] = c, t[17] = A, t[18] = r, t[19] = n.advisorModel, t[20] = n.message.content, t[21] = n.message.id, t[22] = n.uuid, t[23] = h, t[24] = u, t[25] = d, t[26] = p, t[27] = i, t[28] = l, t[29] = f, t[30] = x;
        } else x = t[30];
        let I;
        if (t[49] !== k || t[50] !== x) I = Mu.createElement(B, {
          flexDirection: "column",
          width: k
        }, x), t[49] = k, t[50] = x, t[51] = I;else I = t[51];
        return I;
      }
    case "user":
      {
        if (n.isCompactSummary) {
          let O = A ? "transcript" : "prompt",
            D;
          if (t[52] !== n || t[53] !== O) D = Mu.createElement(YOa, {
            message: n,
            screen: O
          }), t[52] = n, t[53] = O, t[54] = D;else D = t[54];
          return D;
        }
        let C;
        if (t[55] !== n.imagePasteIds || t[56] !== n.message.content) {
          C = [];
          let O = 0;
          for (let D of n.message.content) if (D.type === "image") {
            let M = n.imagePasteIds?.[O];
            O++, C.push(M ?? O);
          } else C.push(O);
          t[55] = n.imagePasteIds, t[56] = n.message.content, t[57] = C;
        } else C = t[57];
        let R = y === n.uuid,
          k = o ?? "100%",
          x;
        if (t[58] !== s || t[59] !== C || t[60] !== A || t[61] !== S || t[62] !== r || t[63] !== n || t[64] !== u || t[65] !== m || t[66] !== i || t[67] !== l) x = n.message.content.map((O, D) => Mu.createElement(_bp, {
          key: D,
          message: n,
          addMargin: s,
          tools: i,
          progressMessagesForMessage: u,
          param: O,
          style: m,
          verbose: l,
          imageIndex: C[D],
          isUserContinuation: S,
          lookups: r,
          isTranscriptMode: A
        })), t[58] = s, t[59] = C, t[60] = A, t[61] = S, t[62] = r, t[63] = n, t[64] = u, t[65] = m, t[66] = i, t[67] = l, t[68] = x;else x = t[68];
        let I;
        if (t[69] !== k || t[70] !== x) I = Mu.createElement(B, {
          flexDirection: "column",
          width: k
        }, x), t[69] = k, t[70] = x, t[71] = I;else I = t[71];
        let H = I,
          P;
        if (t[72] !== H || t[73] !== R) P = R ? Mu.createElement(M$i, null, H) : H, t[72] = H, t[73] = R, t[74] = P;else P = t[74];
        return P;
      }
    case "system":
      {
        if (n.subtype === "compact_boundary") {
          if (Ds()) return null;
          let R;
          if (t[75] === Symbol.for("react.memo_cache_sentinel")) R = Mu.createElement(J1a, null), t[75] = R;else R = t[75];
          return R;
        }
        if (n.subtype === "microcompact_boundary") return null;
        if (n.subtype === "read_divider") {
          let R;
          if (t[79] !== n.content) R = Mu.createElement(B, {
            marginTop: 1,
            width: "100%"
          }, Mu.createElement(ag, {
            title: n.content,
            color: "inactive"
          })), t[79] = n.content, t[80] = R;else R = t[80];
          return R;
        }
        if (n.subtype === "local_command") {
          let R;
          if (t[81] !== n.content) R = {
            type: "text",
            text: n.content
          }, t[81] = n.content, t[82] = R;else R = t[82];
          let k;
          if (t[83] !== s || t[84] !== A || t[85] !== R || t[86] !== l) k = Mu.createElement(G4e, {
            addMargin: s,
            param: R,
            verbose: l,
            isTranscriptMode: A
          }), t[83] = s, t[84] = A, t[85] = R, t[86] = l, t[87] = k;else k = t[87];
          return k;
        }
        let C;
        if (t[88] !== s || t[89] !== A || t[90] !== n || t[91] !== l) C = Mu.createElement(cNa, {
          message: n,
          addMargin: s,
          verbose: l,
          isTranscriptMode: A
        }), t[88] = s, t[89] = A, t[90] = n, t[91] = l, t[92] = C;else C = t[92];
        return C;
      }
    case "grouped_tool_use":
      {
        let C;
        if (t[93] !== s || t[94] !== c || t[95] !== r || t[96] !== n || t[97] !== d || t[98] !== i) C = Mu.createElement(Q1a, {
          message: n,
          tools: i,
          lookups: r,
          inProgressToolUseIDs: c,
          shouldAnimate: d,
          addMargin: s
        }), t[93] = s, t[94] = c, t[95] = r, t[96] = n, t[97] = d, t[98] = i, t[99] = C;else C = t[99];
        return C;
      }
    case "collapsed_read_search":
      {
        let C = l || A,
          R;
        if (t[100] !== s || t[101] !== c || t[102] !== g || t[103] !== r || t[104] !== n || t[105] !== d || t[106] !== C || t[107] !== i) R = Mu.createElement(SP, null, Mu.createElement(K1a, {
          message: n,
          inProgressToolUseIDs: c,
          shouldAnimate: d,
          verbose: C,
          tools: i,
          lookups: r,
          isActiveGroup: g,
          addMargin: s
        })), t[100] = s, t[101] = c, t[102] = g, t[103] = r, t[104] = n, t[105] = d, t[106] = C, t[107] = i, t[108] = R;else R = t[108];
        return R;
      }
  }
}
function _bp(e) {
  let t = bUn.c(25),
    {
      message: n,
      addMargin: r,
      tools: o,
      progressMessagesForMessage: s,
      param: i,
      style: a,
      verbose: l,
      imageIndex: c,
      isUserContinuation: u,
      lookups: d,
      isTranscriptMode: p
    } = e,
    {
      columns: m
    } = hr();
  switch (i.type) {
    case "text":
      {
        if (n.origin?.kind === "peer" && n.origin.senderTaskId !== undefined) {
          let A;
          if (t[0] !== r || t[1] !== p || t[2] !== n.origin.from || t[3] !== i) A = Mu.createElement(pNa, {
            addMargin: r,
            param: i,
            fromName: n.origin.from,
            isTranscriptMode: p
          }), t[0] = r, t[1] = p, t[2] = n.origin.from, t[3] = i, t[4] = A;else A = t[4];
          return A;
        }
        let f;
        if (t[5] !== r || t[6] !== p || t[7] !== n.planContent || t[8] !== n.timestamp || t[9] !== i || t[10] !== l) f = Mu.createElement(G4e, {
          addMargin: r,
          param: i,
          verbose: l,
          planContent: n.planContent,
          isTranscriptMode: p,
          timestamp: n.timestamp
        }), t[5] = r, t[6] = p, t[7] = n.planContent, t[8] = n.timestamp, t[9] = i, t[10] = l, t[11] = f;else f = t[11];
        return f;
      }
    case "image":
      {
        let f = r && !u,
          A;
        if (t[12] !== c || t[13] !== f) A = Mu.createElement(rUn, {
          imageId: c,
          addMargin: f
        }), t[12] = c, t[13] = f, t[14] = A;else A = t[14];
        return A;
      }
    case "tool_result":
      {
        let f = m - 5,
          A;
        if (t[15] !== p || t[16] !== d || t[17] !== n || t[18] !== i || t[19] !== s || t[20] !== a || t[21] !== f || t[22] !== o || t[23] !== l) A = Mu.createElement(ONa, {
          param: i,
          message: n,
          lookups: d,
          progressMessagesForMessage: s,
          style: a,
          tools: o,
          verbose: l,
          width: f,
          isTranscriptMode: p
        }), t[15] = p, t[16] = d, t[17] = n, t[18] = i, t[19] = s, t[20] = a, t[21] = f, t[22] = o, t[23] = l, t[24] = A;else A = t[24];
        return A;
      }
    default:
      return;
  }
}
function hasContentAfterCollapsedGroup(allMessages) {
  let t = bUn.c(62),
    {
      param: n,
      addMargin: r,
      tools: o,
      commands: s,
      verbose: i,
      inProgressToolUseIDs: a,
      progressMessagesForMessage: l,
      shouldAnimate: c,
      shouldShowDot: u,
      width: d,
      inProgressToolCallCount: p,
      isTranscriptMode: m,
      lookups: f,
      onOpenRateLimitOptions: A,
      advisorModel: h,
      messageUuid: g,
      apiMessageId: _,
      isFirstTextBlock: y
    } = allMessages,
    T;
  if (t[0] !== _ || t[1] !== n.type) T = C => n.type === "text" && _ !== undefined ? C.displayedMessageContent[_] : undefined, t[0] = _, t[1] = n.type, t[2] = T;else T = t[2];
  let S = Ev(T);
  if (o$(n)) return null;
  switch (n.type) {
    case "tool_use":
      {
        let C;
        if (t[15] !== r || t[16] !== s || t[17] !== p || t[18] !== a || t[19] !== m || t[20] !== f || t[21] !== g || t[22] !== n || t[23] !== l || t[24] !== c || t[25] !== u || t[26] !== o || t[27] !== i) C = Mu.createElement(aMa, {
          param: n,
          addMargin: r,
          tools: o,
          commands: s,
          verbose: i,
          inProgressToolUseIDs: a,
          progressMessagesForMessage: l,
          shouldAnimate: c,
          shouldShowDot: u,
          inProgressToolCallCount: p,
          lookups: f,
          isTranscriptMode: m,
          messageUuid: g
        }), t[15] = r, t[16] = s, t[17] = p, t[18] = a, t[19] = m, t[20] = f, t[21] = g, t[22] = n, t[23] = l, t[24] = c, t[25] = u, t[26] = o, t[27] = i, t[28] = C;else C = t[28];
        return C;
      }
    case "text":
      {
        if (S !== undefined && !i) {
          if (!y) return null;
          let R;
          if (t[29] !== S) R = {
            type: "text",
            text: S
          }, t[29] = S, t[30] = R;else R = t[30];
          let k;
          if (t[31] !== r || t[32] !== g || t[33] !== A || t[34] !== u || t[35] !== R || t[36] !== i || t[37] !== d) k = Mu.createElement(Qso, {
            param: R,
            addMargin: r,
            shouldShowDot: u,
            verbose: i,
            width: d,
            onOpenRateLimitOptions: A,
            messageUuid: g
          }), t[31] = r, t[32] = g, t[33] = A, t[34] = u, t[35] = R, t[36] = i, t[37] = d, t[38] = k;else k = t[38];
          return k;
        }
        let C;
        if (t[39] !== r || t[40] !== g || t[41] !== A || t[42] !== n || t[43] !== u || t[44] !== i || t[45] !== d) C = Mu.createElement(Qso, {
          param: n,
          addMargin: r,
          shouldShowDot: u,
          verbose: i,
          width: d,
          onOpenRateLimitOptions: A,
          messageUuid: g
        }), t[39] = r, t[40] = g, t[41] = A, t[42] = n, t[43] = u, t[44] = i, t[45] = d, t[46] = C;else C = t[46];
        return C;
      }
    case "redacted_thinking":
      {
        if (!m && !i) return null;
        let C;
        if (t[47] !== r) C = Mu.createElement(iLa, {
          addMargin: r
        }), t[47] = r, t[48] = C;else C = t[48];
        return C;
      }
    case "thinking":
      {
        if (!m && !i) return null;
        let C;
        if (t[49] !== r || t[50] !== m || t[51] !== n || t[52] !== i) C = Mu.createElement(GFn, {
          addMargin: r,
          param: n,
          isTranscriptMode: m,
          verbose: i
        }), t[49] = r, t[50] = m, t[51] = n, t[52] = i, t[53] = C;else C = t[53];
        return C;
      }
    case "server_tool_use":
    case "advisor_tool_result":
      {
        if (x4e(n)) {
          let C = i || m,
            R;
          if (t[54] !== r || t[55] !== h || t[56] !== f.erroredToolUseIDs || t[57] !== f.resolvedToolUseIDs || t[58] !== n || t[59] !== c || t[60] !== C) R = Mu.createElement(rLa, {
            block: n,
            addMargin: r,
            resolvedToolUseIDs: f.resolvedToolUseIDs,
            erroredToolUseIDs: f.erroredToolUseIDs,
            shouldAnimate: c,
            verbose: C,
            advisorModel: h
          }), t[54] = r, t[55] = h, t[56] = f.erroredToolUseIDs, t[57] = f.resolvedToolUseIDs, t[58] = n, t[59] = c, t[60] = C, t[61] = R;else R = t[61];
          return R;
        }
        return Ie(Error(`Unable to render server tool block: ${n.type}`)), null;
      }
    default:
      return Ie(Error(`Unable to render message type: ${n.type}`)), null;
  }
}
function MessageRow(props, t) {
  if (props.message.uuid !== t.message.uuid) return false;
  if (props.verbose !== t.verbose) return false;
  let n = props.latestBashOutputUUID === props.message.uuid,
    r = t.latestBashOutputUUID === t.message.uuid;
  if (n !== r) return false;
  if (props.isTranscriptMode !== t.isTranscriptMode) return false;
  if (props.containerWidth !== t.containerWidth) return false;
  if (props.isStatic && t.isStatic) {
    let o = props.message.type === "system" && props.message.subtype === "turn_duration" ? props.message.briefHiddenCount : undefined,
      s = t.message.type === "system" && t.message.subtype === "turn_duration" ? t.message.briefHiddenCount : undefined;
    return o === s;
  }
  return false;
}
var bUn, Mu, xY;
var sct = b(() => {
  Ii();
  Je();
  fo();
  Tte();
  tm();
  wn();
  JOa();
  N4();
  oLa();
  aLa();
  jLa();
  Zso();
  lMa();
  x1a();
  z1a();
  X1a();
  Z1a();
  uNa();
  mNa();
  gio();
  mUn();
  LNa();
  khe();
  B5r();
  bUn = L(nt(), 1), Mu = L(Te(), 1);
  xY = Mu.memo(gbp, MessageRow);
});

export {gbp as WCp,_bp as GCp,hasContentAfterCollapsedGroup as VCp,MessageRow as KCp,bUn as l2n,Mu as Lu,xY as jY,sct as Hct};
