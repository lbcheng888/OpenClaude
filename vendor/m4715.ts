// @ts-nocheck
import {loadAllPluginsCacheOnly,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {OW,II} from "./m3268.ts";
import {fI,k8} from "./m2238.ts";
import {iae,a1} from "../src/config/2689_withFileTypes.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {ts,EI,oh} from "./m2600.ts";
import {D8r,slowOpTracer} from "../src/telemetry/2606_skill_name.ts";
import {WOt,w8r,GOt,eW} from "./m2601.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function xWt(){try{if(!loadAllPluginsCacheOnly.cache?.has(void 0))return[];if(OW()!==null)return[];let{enabled:e}=await loadAllPluginsCacheOnly();if(e.length===0)return[];let t=fI(),n=iae(),r=getGlobalConfig().numStartups,o=Date.now(),s=[];for(let i of e){let{marketplace:a}=ts(i.repository);if(!a||EI(a))continue;if(D8r(i,t,n)!=="user-install")continue;if(osm(i))continue;let l=WOt(i.repository);if(!l)continue;if(w8r(i.repository))continue;let{sessionsSinceLastUse:c,daysSinceLastUse:u}=GOt(l,r,o);if(u>=nsm&&c>=rsm)s.push({pluginId:i.repository,name:i.name,daysSinceLastUse:u})}return s.sort((i,a)=>a.daysSinceLastUse-i.daysSinceLastUse),s}catch(e){return logForDebugging(`plugin-disuse tip: failed to compute disused plugins: ${e}`,{level:"error"}),[]}}
function lEl(e){if(OW()!==null)return null;let t=WOt(e);if(!t)return null;if(w8r(e))return 0;return GOt(t,getGlobalConfig().numStartups,Date.now()).daysSinceLastUse}
function osm(e){return Boolean(e.lspServers&&Object.keys(e.lspServers).length>0||e.themesPath||e.themesPaths?.length||e.outputStylesPath||e.outputStylesPaths?.length||e.monitors?.length||e.workflowsPath||e.workflowsPaths?.length)}
var nsm=14,rsm=10;
var vwo=b(()=>{tr();qe();k8();a1();oh();path();II();slowOpTracer();eW()});
export {xWt,lEl,osm,nsm,rsm,vwo};
