// @ts-nocheck
import {bL,xee,kee,Che,Hq} from "./m3140.ts";
import {_ee} from "./m3017.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {Zqe,o3n,n3n,z9t,r3n,s3n} from "./m4196.ts";
import {h$,L1} from "./m2232.ts";
import {shouldSkipHookDueToTrust,yp} from "../src/tools/5171_shouldSkipHookDueToTrust.ts";
import {Qae,initXL} from "../src/agent/3279_code.ts";
import {E2e,oA} from "../src/config/2697_oA.ts";
import {e0e,eJ} from "./m4342.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {sq,hz} from "../src/telemetry/2688_hz.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function oOm(e,t){let n=t.manifest.userConfig?bL(xee(t)):void 0,r=(o)=>{let s=kee(o,t);if(n)s=Che(s,n);return _ee(s).expanded};return{name:e.name,command:r(e.command),description:e.description,when:e.when,pluginName:t.name,pluginRoot:t.path}}
function sOm(e){let t=[],n=!1;for(let r of e){let o=r.monitors;if(!o)continue;for(let s of o)try{t.push(oOm(s,r))}catch(i){n=!0,logForDebugging(`plugin ${r.name}: failed to resolve monitor "${s.name}": ${i}`,{level:"error"})}}if(n)Oe("plugin_load_monitors","plugin_load_monitors_resolve_failed");else Ie("plugin_load_monitors");return t}
function iOm(e,t,n=Zqe,r=o3n(n3n,z9t)){let o=0;function s(){if(o===0)return;n(e.description,`[plugin monitor "${e.name}" suppressed ${o} events \u2014 output rate exceeded]`,t.id),o=0}return{onBatch:(i)=>{if(!r.tryConsume()){o++;return}s(),n(e.description,i,t.id)},onExit:s}}
async function aOm(e,t){if(h$())return;if(shouldSkipHookDueToTrust()){logForDebugging(`Skipping plugin monitor ${e.pluginName}:${e.name} - workspace trust not accepted`);return}let n={},r=iOm(e,n),o=r3n(r.onBatch),s=await Qae(e.command,t.abortController.signal,E2e(),{preventCwdChanges:!0,shouldUseSandbox:!1,onStdout:o.onData});return n.id=s.taskOutput.taskId,await e0e({command:e.command,description:e.description,shellCommand:s,toolUseId:void 0,agentId:void 0,kind:"monitor"},t),s.result.then(()=>{o.flush(!0),r.onExit()}),n.id}
async function mLo(e,t,n,r=aOm,o=rOm){if(hc("pluginMonitors"))return;if(!sq())return;if(getIsNonInteractiveSession())return;let s=!1;for(let i of sOm(e)){if(!t(i))continue;let a=`${i.pluginName}:${i.name}`;if(o.has(a))continue;o.add(a);try{if(await r(i,n)===void 0)o.delete(a)}catch(l){o.delete(a),s=!0,logForDebugging(`plugin monitor ${a}: failed to arm: ${l}`,{level:"error"})}}if(s)isTmuxControlMode("plugin_arm_monitor","plugin_arm_monitor_failed");else Ie("plugin_arm_monitor")}
var rOm;
var QWl=b(()=>{lt();ln();eJ();s3n();hz();Iy();qe();L1();yp();initXL();oA();Hq();rOm=new Set});
export {oOm,sOm,iOm,aOm,mLo,rOm,QWl};
