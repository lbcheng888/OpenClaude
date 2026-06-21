// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {zn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {rd as sd,isPolicyAllowed as ii} from "../../vendor/m2205.ts";
import {GPl as EDl,WPl as bDl} from "./5116_call.ts";
// @ts-nocheck
var ZZ4 = {};
pt(ZZ4, {
  default: () => xKT
});
var webSetupCommand, xKT;
var GZ4 = b(() => {
  Yn();
  sd();
  webSetupCommand = {
    type: "local-jsx",
    name: "web-setup",
    description: "Set up Claude Code on the web with your GitHub account",
    availability: ["claude-ai"],
    isEnabled: () => ut("tengu_cobalt_lantern", false) && ii("allow_remote_sessions") && ii("allow_quick_web_setup"),
    get isHidden() {
      return !ii("allow_remote_sessions") || !ii("allow_quick_web_setup");
    },
    load: () => Promise.resolve().then(() => (EDl(), bDl))
  }, xKT = webSetupCommand;
});

export {ZZ4 as VPl,webSetupCommand as cAm,xKT as uAm,GZ4 as KPl};
