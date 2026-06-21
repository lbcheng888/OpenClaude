// @ts-nocheck
import {A8e as nLH,J8t as mO_} from "../../vendor/m5095.ts";
import {X6 as Du,ADe as FAH} from "../../vendor/m4578.ts";
import {yI as xZ,yne as So} from "../../vendor/m4577.ts";
import {x7n as oQ6,R7n as rQ6,k7n as aQ6} from "../../vendor/m5093.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {bgSupervisorNoun as Jf,bv as wP} from "../config/2204_shouldShowLaunchComposer.ts";
import {ac as z1,e_ as Gw} from "../../vendor/m3338.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Bs as z9,rA as Dz} from "../../vendor/m2550.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pr as X8,Yl as g4} from "../../vendor/m2562.ts";
import {oq as Iv,qAe as $7H} from "../../vendor/m2676.ts";
import {isPathTrusted as fXH,setPathTrusted as N0_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {IHe as T4H,fUt as y7_} from "../../vendor/m3815.ts";
import {b as L,M as u} from "../../runtime.ts";
import {lt as w_} from "../session/0131_sent.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * tui/5078_dir.tsx - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
async function W04(): Promise<any> {
  let H = await nLH(Du());
  if (!H.ok) return [];
  let _ = H.config.remoteControl ?? [],
    q = (await xZ()) !== null;
  return _.map((K: any): any => ({
    dir: K.dir,
    name: K.name ?? PwH.basename(K.dir),
    spawnMode: K.spawnMode ?? "same-dir",
    isRunning: q
  }));
}
// FIXME: unverified name
function Z04(H: any): any {
  let _ = gMq.c(41),
    {
      server: q,
      onBack: K,
      onDone: O,
      refresh: T
    } = H,
    [z, $] = Hh.useState(!1),
    [Y, A] = Hh.useState(!1),
    w;
  if (_[0] !== z || _[1] !== O || _[2] !== T || _[3] !== q.dir) w = async function (v: any): Promise<any> {
    if (z) return;
    $(!0);
    try {
      if (v === "remove") await oQ6(q.dir), await T(), O(`Removed remote-control server for ${q.dir}.`, {
        display: "system"
      });else O("The background server picks up config changes automatically \u2014 no restart needed.", {
        display: "system"
      });
    } catch (C) {
      let S = C;
      EH(S), O(`Action failed: ${GH(S)}`, {
        display: "system"
      });
    }
  }, _[0] = z, _[1] = O, _[2] = T, _[3] = q.dir, _[4] = w;else w = _[4];
  let f = w;
  if (Y) {
    let E = q.dir,
      v;
    if (_[5] === Symbol.for("react.memo_cache_sentinel")) v = Jf(), _[5] = v;else v = _[5];
    let C = `Stop serving ${E} to claude.ai. The ${v} will stop the worker on its next reconcile.`,
      S;
    if (_[6] === Symbol.for("react.memo_cache_sentinel")) S = (): any => A(!1), _[6] = S;else S = _[6];
    let I;
    if (_[7] !== f) I = (): any => void f("remove"), _[7] = f, _[8] = I;else I = _[8];
    let p;
    if (_[9] === Symbol.for("react.memo_cache_sentinel")) p = (): any => A(!1), _[9] = p;else p = _[9];
    let b;
    if (_[10] !== I) b = Hh.default.createElement(z1, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, remove",
      cancelLabel: "No, cancel",
      onConfirm: I,
      onCancel: p
    }), _[10] = I, _[11] = b;else b = _[11];
    let x;
    if (_[12] !== C || _[13] !== b) x = Hh.default.createElement(n6, {
      title: "Remove server?",
      subtitle: C,
      onCancel: S,
      color: "error"
    }, b), _[12] = C, _[13] = b, _[14] = x;else x = _[14];
    return x;
  }
  let j;
  if (_[15] === Symbol.for("react.memo_cache_sentinel")) j = [{
    label: `Restart ${Jf()}`,
    value: "restart"
  }, {
    label: "Remove",
    value: "remove"
  }, {
    label: "Back",
    value: "back"
  }], _[15] = j;else j = _[15];
  let J = j,
    D;
  if (_[16] !== q.dir) D = Hh.default.createElement(V, {
    dimColor: !0
  }, "Directory ", q.dir), _[16] = q.dir, _[17] = D;else D = _[17];
  let M;
  if (_[18] !== q.spawnMode) M = Hh.default.createElement(V, {
    dimColor: !0
  }, "Spawn mode ", q.spawnMode), _[18] = q.spawnMode, _[19] = M;else M = _[19];
  let X = q.isRunning ? "success" : "pending",
    P;
  if (_[20] !== X) P = Hh.default.createElement(z9, {
    status: X,
    withSpace: !0
  }), _[20] = X, _[21] = P;else P = _[21];
  let Z = q.isRunning ? "running" : "not running",
    W;
  if (_[22] !== P || _[23] !== Z) W = Hh.default.createElement(V, {
    dimColor: !0
  }, "Status", "     ", P, Z), _[22] = P, _[23] = Z, _[24] = W;else W = _[24];
  let G;
  if (_[25] !== D || _[26] !== M || _[27] !== W) G = Hh.default.createElement(B, {
    flexDirection: "column",
    marginBottom: 1
  }, D, M, W), _[25] = D, _[26] = M, _[27] = W, _[28] = G;else G = _[28];
  let R;
  if (_[29] !== K || _[30] !== f) R = (E: any): any => {
    if (E === "back") return K();
    if (E === "remove") return A(!0);
    f(E);
  }, _[29] = K, _[30] = f, _[31] = R;else R = _[31];
  let h;
  if (_[32] !== z || _[33] !== K || _[34] !== R) h = Hh.default.createElement(X8, {
    options: J,
    isDisabled: z,
    onChange: R,
    onCancel: K
  }), _[32] = z, _[33] = K, _[34] = R, _[35] = h;else h = _[35];
  let y;
  if (_[36] !== K || _[37] !== q.name || _[38] !== h || _[39] !== G) y = Hh.default.createElement(n6, {
    title: q.name,
    onCancel: K
  }, G, h), _[36] = K, _[37] = q.name, _[38] = h, _[39] = G, _[40] = y;else y = _[40];
  return y;
}
// FIXME: unverified name
function G04(H: any): any {
  let _ = gMq.c(48),
    {
      defaultDir: q,
      onCancel: K,
      onAdded: O
    } = H,
    T;
  if (_[0] !== q) T = PwH.basename(q), _[0] = q, _[1] = T;else T = _[1];
  let z;
  if (_[2] !== q || _[3] !== T) z = {
    dir: q,
    name: T,
    spawnMode: "same-dir"
  }, _[2] = q, _[3] = T, _[4] = z;else z = _[4];
  let [$, Y] = Hh.useState(z),
    [A, w] = Hh.useState(!1),
    [f, j] = Hh.useState(null),
    [J, D] = Hh.useState(!1),
    M;
  if (_[5] !== q || _[6] !== A) M = function (U: any, F: any): any {
    if (U === "name") w(!0);
    Y((Q: any): any => {
      if (Q[U] === F) return Q;
      let d = {
        ...Q,
        [U]: F
      };
      if (U === "dir" && !A) d.name = PwH.basename(PwH.resolve(Iv(F.trim() || q)));
      return d;
    });
  }, _[5] = q, _[6] = A, _[7] = M;else M = _[7];
  let X = M,
    P;
  if (_[8] !== q || _[9] !== $.dir) P = PwH.resolve(Iv($.dir?.trim() || q)), _[8] = q, _[9] = $.dir, _[10] = P;else P = _[10];
  let Z = P,
    W;
  if (_[11] !== q) W = (x: any): any => {
    let U = PwH.resolve(Iv(x.trim() || q));
    return fXH(U) ? "Available on claude.ai/code and the Claude mobile app." : `${U} is not yet trusted \u2014 you'll be asked to trust it on submit.`;
  }, _[11] = q, _[12] = W;else W = _[12];
  let G;
  if (_[13] !== q || _[14] !== W) G = {
    type: "text",
    key: "dir",
    label: "Directory",
    placeholder: q,
    required: !0,
    hint: W
  }, _[13] = q, _[14] = W, _[15] = G;else G = _[15];
  let R;
  if (_[16] !== A) R = {
    type: "text",
    key: "name",
    label: "Name",
    hint: (): any => A ? "Shown in the claude.ai session picker." : "Auto-generated from the directory name."
  }, _[16] = A, _[17] = R;else R = _[17];
  let h;
  if (_[18] === Symbol.for("react.memo_cache_sentinel")) h = {
    type: "select",
    key: "spawnMode",
    label: "Spawn mode",
    options: [{
      label: "same-dir",
      value: "same-dir"
    }, {
      label: "worktree",
      value: "worktree"
    }],
    hint: j7T
  }, _[18] = h;else h = _[18];
  let y;
  if (_[19] !== G || _[20] !== R) y = [G, R, h], _[19] = G, _[20] = R, _[21] = y;else y = _[21];
  let E = y,
    v;
  if (_[22] !== O || _[23] !== K || _[24] !== $.name || _[25] !== $.spawnMode) v = async function (U: any): Promise<any> {
    D(!0);
    let F = $.name?.trim() || PwH.basename(U),
      Q = $.spawnMode ?? "same-dir";
    try {
      await rQ6({
        dir: U,
        name: F,
        spawnMode: Q
      }), O(U, void 0);
    } catch (d) {
      EH(d), D(!1), K();
    }
  }, _[22] = O, _[23] = K, _[24] = $.name, _[25] = $.spawnMode, _[26] = v;else v = _[26];
  let C = v,
    S;
  if (_[27] !== J || _[28] !== C || _[29] !== Z) S = function (): any {
    if (J) return;
    if (!fXH(Z)) {
      j(Z);
      return;
    }
    C(Z);
  }, _[27] = J, _[28] = C, _[29] = Z, _[30] = S;else S = _[30];
  let I = S;
  if (f !== null) {
    let x = `${f} hasn't been trusted yet. Trusting allows Claude to read and execute files there.`,
      U;
    if (_[31] === Symbol.for("react.memo_cache_sentinel")) U = (): any => j(null), _[31] = U;else U = _[31];
    let F;
    if (_[32] !== C || _[33] !== f) F = (): any => {
      N0_(f), j(null), C(f);
    }, _[32] = C, _[33] = f, _[34] = F;else F = _[34];
    let Q;
    if (_[35] === Symbol.for("react.memo_cache_sentinel")) Q = (): any => j(null), _[35] = Q;else Q = _[35];
    let d;
    if (_[36] !== F) d = Hh.default.createElement(z1, {
      cancelFirst: !0,
      focus: "cancel",
      confirmLabel: "Yes, trust and add server",
      cancelLabel: "No, go back",
      onConfirm: F,
      onCancel: Q
    }), _[36] = F, _[37] = d;else d = _[37];
    let l;
    if (_[38] !== x || _[39] !== d) l = Hh.default.createElement(n6, {
      title: "Trust this directory?",
      subtitle: x,
      onCancel: U
    }, d), _[38] = x, _[39] = d, _[40] = l;else l = _[40];
    return l;
  }
  let p = J ? "Adding\u2026" : "Add server",
    b;
  if (_[41] !== E || _[42] !== I || _[43] !== K || _[44] !== X || _[45] !== p || _[46] !== $) b = Hh.default.createElement(T4H, {
    title: "New Remote Control server",
    subtitle: "Make a directory available on claude.ai/code and the Claude mobile app",
    fields: E,
    values: $,
    onChange: X,
    onSubmit: I,
    onCancel: K,
    submitLabel: p
  }), _[41] = E, _[42] = I, _[43] = K, _[44] = X, _[45] = p, _[46] = $, _[47] = b;else b = _[47];
  return b;
}
// FIXME: unverified name
function j7T(H: any): any {
  return H === "worktree" ? "Each session gets its own git worktree (requires a git repo)." : "All sessions share the directory.";
}
var gMq, PwH, Hh;
var R04 = L((): any => {
  w_();
  wP();
  g4();
  Gw();
  L7();
  y7_();
  Dz();
  mO_();
  So();
  FAH();
  aQ6();
  nH();
  T8();
  L_();
  S6();
  $7H();
  gMq = u(__(), 1), PwH = require("path"), Hh = u(WH(), 1);
});
export {W04 as GDl,Z04 as VDl,G04 as KDl,j7T as jmm,gMq as Exo,PwH as Dye,Hh as gD,R04 as zDl};
