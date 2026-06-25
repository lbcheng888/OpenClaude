// @ts-nocheck
import {getAdditionalDirectoriesForClaudeMd,lt} from "../src/session/0132_sent.ts";
import {parseSettingsFile} from "../src/config/0740_settings.ts";
import {b} from "../runtime.ts";
import {br} from "../src/config/0745_updateSettingsForSource.ts";
function Y2e(){let e={};for(let t of getAdditionalDirectoriesForClaudeMd())for(let n of INi){let{settings:r}=parseSettingsFile(P8r.join(t,".claude",n));if(!r?.enabledPlugins)continue;Object.assign(e,r.enabledPlugins)}return e}
function O8r(){let e={};for(let t of getAdditionalDirectoriesForClaudeMd())for(let n of INi){let{settings:r}=parseSettingsFile(P8r.join(t,".claude",n));if(!r?.extraKnownMarketplaces)continue;Object.assign(e,r.extraKnownMarketplaces)}return e}
var P8r,INi;
var Gvn=b(()=>{lt();br();P8r=require("path"),INi=["settings.json","settings.local.json"]});
export {Y2e,O8r,P8r,INi,Gvn};
