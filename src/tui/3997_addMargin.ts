// @ts-nocheck
import {mt as ft,configProtoStore as fo} from "../../vendor/m2458.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {getUserMsgOptIn as Rj,lt as ct} from "../session/0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Uu as Wu,dr as fr} from "../../vendor/m231.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {HNa as l1a,INa as c1a} from "../../vendor/m3995.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function p1a(e) {
  let t = TRUNCATION_HEAD_CHARS.c(23),
    {
      addMargin: n,
      param: r,
      isTranscriptMode: o,
      timestamp: s
    } = e,
    {
      text: i
    } = r,
    a = ft(pSp),
    l = ft(dSp),
    c = Ge.CLAUDE_CODE_BRIEF,
    u;
  if (t[0] !== a || t[1] !== o || t[2] !== l) u = Rj() && (c || ut("tengu_kairos_brief", false)) && a && !o && !l, t[0] = a, t[1] = o, t[2] = l, t[3] = u;else u = t[3];
  let d = u,
    p;
  e: {
    if (i.length <= cSp) {
      p = i;
      break e;
    }
    let T;
    if (t[4] !== i) T = i.slice(0, u1a), t[4] = i, t[5] = T;else T = t[5];
    let S = T,
      C,
      R,
      k;
    if (t[6] !== i) k = i.slice(-uSp), C = Wu(i, `
`, u1a), R = Wu(k, `
`), t[6] = i, t[7] = C, t[8] = R, t[9] = k;else C = t[7], R = t[8], k = t[9];
    let x = C - R,
      I;
    if (t[10] !== S || t[11] !== x || t[12] !== k) I = {
      head: S,
      hiddenLines: x,
      tail: k
    }, t[10] = S, t[11] = x, t[12] = k, t[13] = I;else I = t[13];
    p = I;
  }
  let m = p;
  if (!i) return Ie(Error("No content found in user prompt message")), null;
  let f = n ? 1 : 0,
    A = d ? undefined : "userMessageBackground",
    h = d ? 0 : 1,
    g = d ? s : undefined,
    _;
  if (t[14] !== m || t[15] !== g || t[16] !== d) _ = TRUNCATION_TAIL_CHARS.default.createElement(l1a, {
    text: m,
    useBriefLayout: d,
    timestamp: g
  }), t[14] = m, t[15] = g, t[16] = d, t[17] = _;else _ = t[17];
  let y;
  if (t[18] !== f || t[19] !== A || t[20] !== h || t[21] !== _) y = TRUNCATION_TAIL_CHARS.default.createElement(B, {
    flexDirection: "column",
    marginTop: f,
    backgroundColor: A,
    paddingRight: h
  }, _), t[18] = f, t[19] = A, t[20] = h, t[21] = _, t[22] = y;else y = t[22];
  return y;
}
function dSp(e) {
  return e.viewingAgentTaskId;
}
function pSp(e) {
  return e.isBriefOnly;
}
var TRUNCATION_HEAD_CHARS,
  TRUNCATION_TAIL_CHARS,
  cSp = 1e4,
  u1a = 2500,
  uSp = 2500;
var QCK = b(() => {
  ct();
  Je();
  Yn();
  fo();
  Or();
  wn();
  fr();
  c1a();
  TRUNCATION_HEAD_CHARS = L(nt(), 1), TRUNCATION_TAIL_CHARS = L(Te(), 1);
});

export {p1a as ONa,dSp as UEp,pSp as $Ep,TRUNCATION_HEAD_CHARS as PNa,TRUNCATION_TAIL_CHARS as Dao,cSp as BEp,u1a as DNa,uSp as FEp,QCK as LNa};
