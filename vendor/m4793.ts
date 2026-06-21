// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {getDynamicConfig_CACHED_MAY_BE_STALE,zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Z1e,KEe} from "./m1446.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function vyl(){let e=Wjt.useMemo(ZEo,[]),t=Wjt.useMemo(()=>getGlobalConfig().lastShownEmergencyTip,[]),n=eCo(e)&&(e.persistent||e.tip!==t);if(Wjt.useEffect(()=>{if(n&&!e.persistent)saveGlobalConfig((r)=>{if(r.lastShownEmergencyTip===e.tip)return r;return{...r,lastShownEmergencyTip:e.tip}})},[n,e.tip,e.persistent]),!n)return null;return jjt.createElement(Box,{paddingLeft:2,flexDirection:"column"},jjt.createElement(Text,{...e.color==="warning"?{color:"warning"}:e.color==="error"?{color:"error"}:{dimColor:!0}},e.tip))}
function ZEo(){return getDynamicConfig_CACHED_MAY_BE_STALE(rtm,otm)}
function eCo(e){if(!e.tip)return!1;if(!Array.isArray(e.taints)||e.taints.length===0)return!0;return e.taints.some(Z1e)}
var jjt,Wjt,rtm="tengu-top-of-feed-tip",otm;
var wyl=b(()=>{ze();zn();KEe();Qn();jjt=M(Te(),1),Wjt=M(Te(),1);otm={tip:"",color:"dim"}});
export {vyl,ZEo,eCo,jjt,Wjt,rtm,otm,wyl};
