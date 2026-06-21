// @ts-nocheck
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {addToTotalLinesChanged as B7t,getLocCounter as W7t,lt as ct} from "../session/0131_sent.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {d7 as QV,mc} from "../config/0645_maxBytes.ts";
import {ynt as nnt} from "../../vendor/m2760.ts";
import {b} from "../../runtime.ts";
import {W2e as b2e} from "../../vendor/m2761.ts";
import {H9 as h9} from "./4045_contextWindow.ts";
// @ts-nocheck
function QUn(e, t) {
  if (t === 0) return e;
  return e.map(n => ({
    ...n,
    oldStart: n.oldStart + t,
    newStart: n.newStart + t
  }));
}
function m$t(e) {
  return e.replaceAll("&", NBa).replaceAll("$", BBa);
}
function FBa(e) {
  return e.replaceAll(NBa, "&").replaceAll(BBa, "$");
}
function f$t(e, t, n) {
  let r = 0,
    o = 0;
  if (e.length === 0 && n) r = (n.match(/\n/g)?.length ?? 0) + 1;else r = e.reduce((s, i) => s + Gn(i.lines, a => a.startsWith("+")), 0), o = e.reduce((s, i) => s + Gn(i.lines, a => a.startsWith("-")), 0);
  B7t(r, o), W7t()?.add(r, {
    type: "added",
    model: t
  }), W7t()?.add(o, {
    type: "removed",
    model: t
  }), j("tengu_file_changed", {
    lines_added: r,
    lines_removed: o
  });
}
function qv6({
  filePath: e,
  oldContent: t,
  newContent: n,
  ignoreWhitespace: r = false,
  singleHunk: o = false,
  convertTabs: s = false
}) {
  let i = s ? l => m$t(QV(l)) : m$t,
    a = nnt(e, e, i(t), i(n), undefined, undefined, {
      ignoreWhitespace: r,
      context: o ? 1e5 : _ct,
      timeout: XUn
    });
  if (!a) return [];
  return a.hunks.map(l => ({
    ...l,
    lines: l.lines.map(FBa)
  }));
}
function aS_({
  filePath: e,
  fileContents: t,
  edits: n,
  ignoreWhitespace: r = false
}) {
  let o = m$t(QV(t)),
    s = nnt(e, e, o, n.reduce((i, a) => {
      let {
          old_string: l,
          new_string: c
        } = a,
        u = "replace_all" in a ? a.replace_all : false,
        d = m$t(QV(l)),
        p = m$t(QV(c));
      if (u) return i.replaceAll(d, () => p);else return i.replace(d, () => p);
    }, o), undefined, undefined, {
      context: _ct,
      ignoreWhitespace: r,
      timeout: XUn
    });
  if (!s) return [];
  return s.hunks.map(i => ({
    ...i,
    lines: i.lines.map(FBa)
  }));
}
var _ct = 3,
  XUn = 5000,
  NBa = "<<:AMPERSAND_TOKEN:>>",
  BBa = "<<:DOLLAR_TOKEN:>>";
var A4H = b(() => {
  b2e();
  Ct();
  ct();
  h9();
  mc();
});

export {QUn as B2n,m$t as P$t,FBa as aUa,f$t as O$t,qv6 as CIe,aS_ as sG,_ct as jct,XUn as N2n,NBa as sUa,BBa as iUa,A4H as vce};
