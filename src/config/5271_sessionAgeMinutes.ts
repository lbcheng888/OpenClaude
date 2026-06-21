// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getGlobalConfig as C_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {RV as cd,sn as A6} from "./0047_namespace.ts";
import {formatTokens as j4,ps as H9} from "../../vendor/m238.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {pr as X8} from "../../vendor/m2562.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {yb as _D} from "../../vendor/m4521.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// FIXME: unverified name: dy4
/* Decides whether a long resumed session should prompt for summary resume. */
/* Restored Claude Code 2.1.177 module: Resume-age warning calculation and dialog..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function dy4(H: any, _: any): any {
  if (!Y_("tengu_gleaming_fair", !1)) return null;
  if (C_().resumeReturnDismissed) return null;
  let q = cd(process.env.CLAUDE_CODE_RESUME_THRESHOLD_MINUTES, 70),
    K = cd(process.env.CLAUDE_CODE_RESUME_TOKEN_THRESHOLD, 1e5),
    O = Date.now() - 60000,
    T = H.findLast((Y: any): any => (Y.type === "user" || Y.type === "assistant") && Date.parse(Y.timestamp) < O)?.timestamp;
  if (!T) return null;
  let z = (Date.now() - Date.parse(T)) / 60000;
  if (z < q) return null;
  let $ = _(H);
  if ($ < K) return null;
  return {
    sessionAgeMinutes: z,
    estimatedTokens: $
  };
}
/* Dialog asking whether to resume a long session from summary or full history. */
// FIXME: unverified name: ly4
function ly4(H: any): any {
  let _ = cy4.c(16),
    {
      sessionAgeMinutes: q,
      estimatedTokens: K,
      onDone: O
    } = H,
    T;
  if (_[0] !== q) T = formatSessionAgeMinutes(q), _[0] = q, _[1] = T;else T = _[1];
  let z = T,
    $;
  if (_[2] !== K) $ = j4(K), _[2] = K, _[3] = $;else $ = _[3];
  let A = `This session is ${z} old and ${$} tokens.`,
    w;
  if (_[4] !== O) w = (): any => O("dismiss"), _[4] = O, _[5] = w;else w = _[5];
  let f;
  if (_[6] === Symbol.for("react.memo_cache_sentinel")) f = PF_.default.createElement(B, {
    flexDirection: "column"
  }, PF_.default.createElement(V, null, "Resuming the full session will consume a substantial portion of your usage limits. We recommend resuming from a summary.")), _[6] = f;else f = _[6];
  let j;
  if (_[7] === Symbol.for("react.memo_cache_sentinel")) j = {
    value: "compact",
    label: "Resume from summary (recommended)"
  }, _[7] = j;else j = _[7];
  let J;
  if (_[8] === Symbol.for("react.memo_cache_sentinel")) J = {
    value: "continue",
    label: "Resume full session as-is"
  }, _[8] = J;else J = _[8];
  let D;
  if (_[9] === Symbol.for("react.memo_cache_sentinel")) D = [j, J, {
    value: "never",
    label: "Don't ask me again"
  }], _[9] = D;else D = _[9];
  let M;
  if (_[10] !== O) M = PF_.default.createElement(X8, {
    options: D,
    onChange: (P: any): any => O(P)
  }), _[10] = O, _[11] = M;else M = _[11];
  let X;
  if (_[12] !== A || _[13] !== w || _[14] !== M) X = PF_.default.createElement(n6, {
    title: A,
    onCancel: w
  }, f, M), _[12] = A, _[13] = w, _[14] = M, _[15] = X;else X = _[15];
  return X;
}
function formatSessionAgeMinutes(H: any): any {
  if (H < 60) return `${Math.floor(H)}m`;
  let _ = Math.floor(H / 60);
  if (_ < 24) {
    let O = Math.floor(H % 60);
    return O === 0 ? `${_}h` : `${_}h ${O}m`;
  }
  let q = Math.floor(_ / 24),
    K = _ % 24;
  return K === 0 ? `${q}d` : `${q}d ${K}h`;
}
var cy4, PF_;
var ny4 = L((): any => {
  nH();
  o6();
  T8();
  A6();
  H9();
  _D();
  L7();
  cy4 = u(__(), 1), PF_ = u(WH(), 1);
});

export {dy4 as $9l,ly4 as q9l,formatSessionAgeMinutes as uRm,cy4 as U9l,PF_ as xWt,ny4 as j9l};
