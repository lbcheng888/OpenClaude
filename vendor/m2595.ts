// @ts-nocheck
import {getAdditionalDirectoriesForClaudeMd,lt} from "../src/session/0131_sent.ts";
import {parseSettingsFile} from "../src/config/0735_settings.ts";
import {b} from "../runtime.ts";
import {yr} from "../src/config/0740_updateSettingsForSource.ts";
function YUe(){let e={};for(let t of getAdditionalDirectoriesForClaudeMd())for(let n of Q0i){let{settings:r}=parseSettingsFile(n4r.join(t,".claude",n));if(!r?.enabledPlugins)continue;Object.assign(e,r.enabledPlugins)}return e}
function r4r(){let e={};for(let t of getAdditionalDirectoriesForClaudeMd())for(let n of Q0i){let{settings:r}=parseSettingsFile(n4r.join(t,".claude",n));if(!r?.extraKnownMarketplaces)continue;Object.assign(e,r.extraKnownMarketplaces)}return e}
var n4r,Q0i;
var eCn=b(()=>{lt();yr();n4r=require("path"),Q0i=["settings.json","settings.local.json"]});
export {YUe,r4r,n4r,Q0i,eCn};
