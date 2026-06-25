// @ts-nocheck
import {$O,Aee,Ree,Lge,V4} from "./m3150.ts";
import {hee} from "../src/api/3029_expanded.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {xe,He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {b5e,l6n,i6n,cqt,a6n,c6n} from "./m4212.ts";
import {B2,zM} from "./m2240.ts";
import {shouldSkipHookDueToTrust,Wd} from "../src/tools/5204_shouldSkipHookDueToTrust.ts";
import {Xae,KO} from "../src/agent/3295_code.ts";
import {H$e,Zm} from "../src/config/2709_Zm.ts";
import {Kxe,vG} from "./m4362.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {v4,qz} from "../src/telemetry/2700_qz.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function m$m(e,t){let n=t.manifest.userConfig?$O(Aee(t)):void 0,r=(o)=>{let s=Ree(o,t);if(n)s=Lge(s,n);return hee(s).expanded};return{name:e.name,command:r(e.command),description:e.description,when:e.when,pluginName:t.name,pluginRoot:t.path}}
function f$m(e){let t=[],n=!1;for(let r of e){let o=r.monitors;if(!o)continue;for(let s of o)try{t.push(m$m(s,r))}catch(i){n=!0,logForDebugging(`plugin ${r.name}: failed to resolve monitor "${s.name}": ${i}`,{level:"error"})}}if(n)xe("plugin_load_monitors","plugin_load_monitors_resolve_failed");else He("plugin_load_monitors");return t}
function h$m(e,t,n=b5e,r=l6n(i6n,cqt)){let o=0;function s(){if(o===0)return;n(e.description,`[plugin monitor "${e.name}" suppressed ${o} events \u2014 output rate exceeded]`,t.id),o=0}return{onBatch:(i)=>{if(!r.tryConsume()){o++;return}s(),n(e.description,i,t.id)},onExit:s}}
async function g$m(e,t){if(B2())return;if(shouldSkipHookDueToTrust()){logForDebugging(`Skipping plugin monitor ${e.pluginName}:${e.name} - workspace trust not accepted`);return}let n={},r=h$m(e,n),o=a6n(r.onBatch),s=await Xae(e.command,t.abortController.signal,H$e(),{preventCwdChanges:!0,shouldUseSandbox:!1,onStdout:o.onData});return n.id=s.taskOutput.taskId,await Kxe({command:e.command,description:e.description,shellCommand:s,toolUseId:void 0,agentId:void 0,kind:"monitor"},t),s.result.then(()=>{o.flush(!0),r.onExit()}),n.id}
async function OBo(e,t,n,r=g$m,o=p$m){if(buildMcpToolName("pluginMonitors"))return;if(!v4())return;if(getIsNonInteractiveSession())return;let s=!1;for(let i of f$m(e)){if(!t(i))continue;let a=`${i.pluginName}:${i.name}`;if(o.has(a))continue;o.add(a);try{if(await r(i,n)===void 0)o.delete(a)}catch(l){o.delete(a),s=!0,logForDebugging(`plugin monitor ${a}: failed to arm: ${l}`,{level:"error"})}}if(s)Pt("plugin_arm_monitor","plugin_arm_monitor_failed");else He("plugin_arm_monitor")}
var p$m;
var LQl=b(()=>{lt();mn();vG();c6n();qz();ky();qe();zM();Wd();KO();Zm();V4();p$m=new Set});
export {m$m,f$m,h$m,g$m,OBo,p$m,LQl};
