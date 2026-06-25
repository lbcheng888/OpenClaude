// @ts-nocheck
import {zn as Gn} from "../api/0465_getOauthConfig.ts";
import {addToTotalLinesChanged as B7t,getLocCounter as W7t,lt as ct} from "../session/0132_sent.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {FK as QV,Xl as mc} from "../config/0651_maxBytes.ts";
import {Aot as nnt} from "../../vendor/m2772.ts";
import {b} from "../../runtime.ts";
import {J$e as b2e} from "../../vendor/m2773.ts";
import {V$ as h9} from "./3911_contextWindow.ts";
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
export {QUn as H$n,m$t as z9t,FBa as hBa,f$t as j9t,qv6 as W0e,aS_ as pG,_ct as Nut,XUn as k$n,NBa as mBa,BBa as fBa,A4H as oce};
