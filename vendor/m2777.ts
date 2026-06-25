// @ts-nocheck
import {Y3,eS,zM} from "./m2240.ts";
import {Si,ud} from "./m134.ts";
import {getMainThreadAgentHooks,lt} from "../src/session/0132_sent.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {Xde,zf} from "./m133.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {jM,oie} from "./m2269.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ce,Ct} from "./m197.ts";
import {executeFileChangedHooks,executeCwdChangedHooks} from "./m5191.ts";
import {Q5i,Z$e} from "./m2776.ts";
import {b} from "../runtime.ts";
import {Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
function DNd(){let e=null,t,n=[],r=[],o=!1,s=!1,i=null,a=null;function l(_){i=_}function c(_){if(o)return;o=!0,t=_;let T=Y3();if(s=(T?.CwdChanged?.length??0)>0||(T?.FileChanged?.length??0)>0,s)a=Si(g);let y=u(T);if(y.length===0)return;d(y)}function u(_){let T=(_??Y3())?.FileChanged??[],y=eS()?[]:getMainThreadAgentHooks()?.FileChanged??[],S=[...T,...y],E=[];for(let H of S){if(!H.matcher)continue;for(let k of H.matcher.split("|").map((I)=>I.trim())){if(!k)continue;E.push(lIn.isAbsolute(k)?k:lIn.join(t,k))}}let R=os([...E,...n]),w=R.filter((H)=>!Xde(H));if(w.length!==R.length)logForDebugging("FileChanged: dropped remote UNC watch path(s)",{level:"warn"});return w}function d(_){logForDebugging(`FileChanged: watching ${_.length} paths`),e=jM.watch(_,{persistent:!0,ignoreInitial:!0,awaitWriteFinish:{stabilityThreshold:500,pollInterval:200},ignorePermissionErrors:!0}),e.on("change",(y)=>p(y,"change")),e.on("add",(y)=>p(y,"add")),e.on("unlink",(y)=>p(y,"unlink"));let T=!1;e.on("error",(y)=>{if(!T)T=!0,xe("file_watcher_start","fs_error");logForDebugging(`FileChanged: watcher error: ${Ce(y)}`,{level:"warn"})}),e.on("ready",()=>{if(!T)T=!0,He("file_watcher_start")})}function p(_,T){logForDebugging(`FileChanged: ${T} ${_}`),executeFileChangedHooks(_,T).then(({results:y,watchPaths:S,systemMessages:E})=>{if(He("file_watcher_change_detected"),S.length>0)m(S);for(let R of E)i?.(R,!1);for(let R of y)if(!R.succeeded&&R.output)i?.(R.output,!0)}).catch((y)=>{xe("file_watcher_change_detected","hook_exec_failed");let S=Ce(y);logForDebugging(`FileChanged hook failed: ${S}`,{level:"error"}),i?.(S,!0)})}function m(_){if(!o)return;let T=_.slice().sort();if(T.length===r.length&&T.every((y,S)=>y===r[S]))return;n=_,r=T,f()}function f(){if(e)e.close(),e=null;let _=u();if(_.length>0)d(_)}async function h(_,T){if(_===T)return;let y=Y3(),S=eS()?void 0:getMainThreadAgentHooks();if(!((y?.CwdChanged?.length??0)>0||(y?.FileChanged?.length??0)>0||(S?.CwdChanged?.length??0)>0||(S?.FileChanged?.length??0)>0))return;t=T,await Q5i();let R=await executeCwdChangedHooks(_,T).catch((w)=>{let H=Ce(w);return logForDebugging(`CwdChanged hook failed: ${H}`,{level:"error"}),i?.(H,!0),{results:[],watchPaths:[],systemMessages:[]}});n=R.watchPaths,r=R.watchPaths.slice().sort();for(let w of R.systemMessages)i?.(w,!1);for(let w of R.results)if(!w.succeeded&&w.output)i?.(w.output,!0);if(o)f()}function g(){if(a)a(),a=null;if(e)e.close(),e=null;n=[],r=[],o=!1,s=!1,i=null}return{initialize:c,setEnvHookNotifier:l,updateWatchPaths:m,onCwdChanged:h,dispose:g,[Symbol.dispose]:g}}
var lIn,cIn,e8i,dzr,t8i,n8i;
var m1t=b(()=>{oie();lt();mn();zf();ud();qe();Ct();Wd();Z$e();zM();lIn=require("path");cIn=DNd(),e8i=cIn.initialize,dzr=cIn.setEnvHookNotifier,t8i=cIn.updateWatchPaths,n8i=cIn.onCwdChanged});
export {DNd,lIn,cIn,e8i,dzr,t8i,n8i,m1t};
