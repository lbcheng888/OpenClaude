// @ts-nocheck
import {f5,uE,L1} from "./m2232.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {getMainThreadAgentHooks,lt} from "../src/session/0131_sent.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {M1,sie} from "./m2261.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Se,bt} from "./m195.ts";
import {executeFileChangedHooks,executeCwdChangedHooks} from "./m5158.ts";
import {a$i,K2e} from "./m2764.ts";
import {b} from "../runtime.ts";
import {yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
function Vxd(){let e=null,t,n=[],r=[],o=!1,s=!1,i=null,a=null;function l(g){i=g}function c(g){if(o)return;o=!0,t=g;let _=f5();if(s=(_?.CwdChanged?.length??0)>0||(_?.FileChanged?.length??0)>0,s)a=Gi(h);let y=u(_);if(y.length===0)return;d(y)}function u(g){let _=(g??f5())?.FileChanged??[],y=uE()?[]:getMainThreadAgentHooks()?.FileChanged??[],T=[..._,...y],S=[];for(let v of T){if(!v.matcher)continue;for(let R of v.matcher.split("|").map((k)=>k.trim())){if(!R)continue;S.push(ERn.isAbsolute(R)?R:ERn.join(t,R))}}return fs([...S,...n])}function d(g){logForDebugging(`FileChanged: watching ${g.length} paths`),e=M1.watch(g,{persistent:!0,ignoreInitial:!0,awaitWriteFinish:{stabilityThreshold:500,pollInterval:200},ignorePermissionErrors:!0}),e.on("change",(y)=>p(y,"change")),e.on("add",(y)=>p(y,"add")),e.on("unlink",(y)=>p(y,"unlink"));let _=!1;e.on("error",(y)=>{if(!_)_=!0,Oe("file_watcher_start","fs_error");logForDebugging(`FileChanged: watcher error: ${Se(y)}`,{level:"warn"})}),e.on("ready",()=>{if(!_)_=!0,Ie("file_watcher_start")})}function p(g,_){logForDebugging(`FileChanged: ${_} ${g}`),executeFileChangedHooks(g,_).then(({results:y,watchPaths:T,systemMessages:S})=>{if(Ie("file_watcher_change_detected"),T.length>0)m(T);for(let v of S)i?.(v,!1);for(let v of y)if(!v.succeeded&&v.output)i?.(v.output,!0)}).catch((y)=>{Oe("file_watcher_change_detected","hook_exec_failed");let T=Se(y);logForDebugging(`FileChanged hook failed: ${T}`,{level:"error"}),i?.(T,!0)})}function m(g){if(!o)return;let _=g.slice().sort();if(_.length===r.length&&_.every((y,T)=>y===r[T]))return;n=g,r=_,f()}function f(){if(e)e.close(),e=null;let g=u();if(g.length>0)d(g)}async function A(g,_){if(g===_)return;let y=f5(),T=uE()?void 0:getMainThreadAgentHooks();if(!((y?.CwdChanged?.length??0)>0||(y?.FileChanged?.length??0)>0||(T?.CwdChanged?.length??0)>0||(T?.FileChanged?.length??0)>0))return;t=_,await a$i();let v=await executeCwdChangedHooks(g,_).catch((R)=>{let k=Se(R);return logForDebugging(`CwdChanged hook failed: ${k}`,{level:"error"}),i?.(k,!0),{results:[],watchPaths:[],systemMessages:[]}});n=v.watchPaths,r=v.watchPaths.slice().sort();for(let R of v.systemMessages)i?.(R,!1);for(let R of v.results)if(!R.succeeded&&R.output)i?.(R.output,!0);if(o)f()}function h(){if(a)a(),a=null;if(e)e.close(),e=null;n=[],r=[],o=!1,s=!1,i=null}return{initialize:c,setEnvHookNotifier:l,updateWatchPaths:m,onCwdChanged:A,dispose:h,[Symbol.dispose]:h}}
var ERn,CRn,c$i,D5r,u$i,d$i;
var OOt=b(()=>{sie();lt();ln();ReactHooks();qe();bt();yp();K2e();L1();ERn=require("path");CRn=Vxd(),c$i=CRn.initialize,D5r=CRn.setEnvHookNotifier,u$i=CRn.updateWatchPaths,d$i=CRn.onCwdChanged});
export {Vxd,ERn,CRn,c$i,D5r,u$i,d$i,OOt};
