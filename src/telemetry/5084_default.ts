// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {lt as ct,setUserMsgOptIn as aX} from "../session/0132_sent.ts";
import {kt as Ct,logEvent as j} from "../../vendor/m132.ts";
import {parsePermissionRule as vF,BRIEF_TOOL_NAME as CF} from "../../vendor/m2704.ts";
import {n9 as T9,isBriefEntitled as z9n} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {ve as Re} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
// @ts-nocheck
var ZZ4 = {};
pt(ZZ4, {
  default: () => xKT_2
});
function Llm() {
  let e = ut("tengu_kairos_brief_config", GZ4),
    t = xKT().safeParse(e);
  return t.success ? t.data : GZ4;
}
var xKT, GZ4, Mlm, xKT_2;
var Vkl = b(() => {
  Xr();
  ct();
  Yn();
  Ct();
  vF();
  T9();
  xKT = Re(() => E.object({
    enable_slash_command: E.boolean()
  })), GZ4 = {
    enable_slash_command: false
  };
  Mlm = {
    type: "local-jsx",
    name: "brief",
    description: "Toggle brief-only mode",
    isEnabled: () => Llm().enable_slash_command,
    immediate: true,
    load: () => Promise.resolve({
      async call(e, t) {
        let r = !t.getAppState().isBriefOnly;
        if (r && !z9n()) return j("tengu_brief_mode_toggled", {
          enabled: false,
          gated: true,
          source: Qe("slash_command")
        }), e("Brief tool is not enabled for your account", {
          display: "system"
        }), null;
        aX(r), t.onQueryEvent?.({
          type: "apply_flag_settings",
          settings: {
            isBriefOnly: r
          }
        }), j("tengu_brief_mode_toggled", {
          enabled: r,
          gated: false,
          source: Qe("slash_command")
        });
        let o = [`<system-reminder>
${r ? `Brief mode is now enabled. Use the ${CF} tool for all user-facing output \u2014 plain text outside it is hidden from the user's view.` : `Brief mode is now disabled. The ${CF} tool is no longer available \u2014 reply with plain text.`}
</system-reminder>`];
        return e(r ? "Brief-only mode enabled" : "Brief-only mode disabled", {
          display: "system",
          metaMessages: o
        }), null;
      }
    })
  }, xKT_2 = Mlm;
});
export {ZZ4 as BNl,Llm as CSm,xKT as ESm,GZ4 as FNl,Mlm as ASm,xKT_2 as RSm,Vkl as UNl};
