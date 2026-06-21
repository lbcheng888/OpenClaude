// @ts-nocheck
import {dd as O3,jb as VD,Dd as X3} from "../../vendor/m687.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
import {Qn as T8,getGlobalConfig as C_,saveGlobalConfig as P6} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {CQe as NaH,KHt as I0_} from "../../vendor/m2227.ts";
import {Pp as nO,Ms as v9} from "./2273_loggedTmuxCcDisable.ts";
import {yr as N8,getInitialSettings as n8} from "./0740_updateSettingsForSource.ts";
/**
 * Semantic restoration for config/5029_subtype.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/** Internal restored helper for config/5029_subtype.ts; behavior is preserved. */
function sendFocusViewModeControl(H: any): any {
  let _ = O3();
  if (!_) return null;
  if (!VD()) return " (applied locally \u2014 this remote transport can\u2019t update the remote session)";
  return _.sendControlRequest({
    subtype: "apply_flag_settings",
    settings: {
      viewMode: H ? "focus" : null
    }
  }).catch(EH), null;
}
var W8T, QDq;
var D24 = L((): any => {
  X3();
  T8();
  NaH();
  nO();
  S6();
  N8();
  W8T = {
    type: "local-jsx",
    name: "focus",
    description: "Toggle focus view: just your prompt, summary, and response",
    immediate: !0,
    requires: {
      ink: !0
    },
    load: (): any => Promise.resolve({
      async call(H: any, _: any): Promise<any> {
        if (!v9()) {
          if (n8().viewMode === "focus") return H(`Focus view is set by "viewMode": "focus" in settings.json \u2014 remove it there and restart Claude Code to turn it off. ${"Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart."}`, {
            display: "system"
          }), null;
          if (_.getAppState().briefTranscript || C_().briefTranscript) {
            if (_.onQueryEvent?.({
              type: "apply_flag_settings",
              settings: {
                briefTranscript: !1
              }
            }), C_().briefTranscript) P6(($: any): any => ({
              ...$,
              briefTranscript: !1
            }));
            I0_();
            let z = sendFocusViewModeControl(!1);
            return H(`Focus view disabled.${z ?? ""} Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart.`, {
              display: "system"
            }), null;
          }
          return H("Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart.", {
            display: "system"
          }), null;
        }
        let K = !_.getAppState().briefTranscript;
        if (_.onQueryEvent?.({
          type: "apply_flag_settings",
          settings: {
            briefTranscript: K
          }
        }), C_().briefTranscript !== K) P6((z: any): any => ({
          ...z,
          briefTranscript: K
        }));
        I0_();
        let O = n8().viewMode,
          T = sendFocusViewModeControl(O ? O === "focus" : K);
        return H(`${K ? "Focus view enabled" : "Focus view disabled"}${T ?? ""}`, {
          display: "system"
        }), null;
      }
    })
  }, QDq = W8T;
});

export {sendFocusViewModeControl as oIl,W8T as udm,QDq as TRo,D24 as sIl};
