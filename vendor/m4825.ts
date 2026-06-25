// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {getDynamicConfig_CACHED_MAY_BE_STALE,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {zNe,IAe} from "./m1451.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Rwl(){let e=iGt.useMemo(_Ho,[]),t=iGt.useMemo(()=>getGlobalConfig().lastShownEmergencyTip,[]),n=yHo(e)&&(e.persistent||e.tip!==t);if(iGt.useEffect(()=>{if(n&&!e.persistent)saveGlobalConfig((r)=>{if(r.lastShownEmergencyTip===e.tip)return r;return{...r,lastShownEmergencyTip:e.tip}})},[n,e.tip,e.persistent]),!n)return null;return gHo.jsx(Box,{paddingLeft:2,flexDirection:"column",children:gHo.jsx(Text,{...e.color==="warning"?{color:"warning"}:e.color==="error"?{color:"error"}:{dimColor:!0},children:e.tip})})}
function _Ho(){return getDynamicConfig_CACHED_MAY_BE_STALE(gum,_um)}
function yHo(e){if(!e.tip)return!1;if(!Array.isArray(e.taints)||e.taints.length===0)return!0;return e.taints.some(zNe)}
var iGt,gHo,gum="tengu-top-of-feed-tip",_um;
var vwl=b(()=>{je();jn();IAe();tr();iGt=x(et(),1),gHo=x(oe(),1);_um={tip:"",color:"dim"}});
export {Rwl,_Ho,yHo,iGt,gHo,gum,_um,vwl};
