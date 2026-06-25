// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {VRi as XT7,KDt as AZ_,WRi as DT7,QUe as zSH,JRi as RT7,zDt as wZ_,H3r as Xy8,XRi as LT7,QRi as hT7,ett as eaH} from "../../vendor/m2297.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {xy as Pf,nS as pJ} from "../config/2351_nS.ts";
import {getTotalDuration as E6H,lt as w_} from "../session/0132_sent.ts";
import {He as vH,Pt as n_,mn as M6} from "./0600_feature_name.ts";
import {b as L} from "../../runtime.ts";
/*
 * telemetry/5371_stylepool_styles.ts - telemetry and background-event restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function Gu4(): any {
  QMT();
}
function Ru4(): any {
  let H = Y_("tengu_xterm_atlas_reset", !0);
  XT7(H);
  let _ = Y_("tengu_basalt_meadow", !1);
  if (H || _) AZ_(!0);
}
function QMT(): any {
  if (DT7) return;
  if (!Y_("tengu_basalt_meadow", !1)) {
    if (!zSH) AZ_(!1);
    return;
  }
  AZ_(!0);
  let _ = RT7();
  if (!_) return;
  let q = wZ_(),
    K = Xy8();
  if (c("tengu_render_glyph_cardinality", {
    stylepool_styles: _.size,
    stylepool_overflowed: _.overflowed,
    atlas_glyph_keys: q.atlasKeys,
    atlas_keys_saturated: q.saturated,
    term_program: tH(cMT()),
    is_xtermjs: Pf(),
    session_age_bucket: tH(dMT(E6H())),
    proactive_reset_count: K.count,
    proactive_reset_last_reason: tH(K.lastReason)
  }), LT7()) vH("render_stylepool");
  if (_.overflowed && hT7()) n_("render_stylepool", "cap_hit");
}
function cMT(): any {
  if (process.env.CURSOR_TRACE_ID !== void 0) return "cursor";
  switch (process.env.TERM_PROGRAM) {
    case "vscode":
      return "vscode";
    case "iTerm.app":
      return "iterm";
    case "Apple_Terminal":
      return "apple_terminal";
    case "ghostty":
      return "ghostty";
    case "WezTerm":
      return "wezterm";
    case "tmux":
      return "tmux";
  }
  if (process.env.WT_SESSION !== void 0) return "windows_terminal";
  return "other";
}
function dMT(H: any): any {
  let _ = H / 60000;
  if (_ < 5) return "lt_5m";
  if (_ < 30) return "5m_30m";
  if (_ < 120) return "30m_2h";
  if (_ < 480) return "2h_8h";
  return "gt_8h";
}
var nZq = L((): any => {
  w_();
  eaH();
  pJ();
  M6();
  o6();
  y_();
});
export {Gu4 as XXl,Ru4 as QXl,QMT as L2m,cMT as M2m,dMT as N2m,nZq as wBo};
