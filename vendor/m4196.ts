// @ts-nocheck
import {J_,fp,Mf,SO,__,initKp} from "./m609.ts";
import {isAmberSentinelEnabled,QH} from "./m2784.ts";
import {wRe,V5,aee} from "../src/session/2687_aee.ts";
import {_m,sA} from "./m2782.ts";
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {e3n,K9t} from "./m4195.ts";
import {Rm,zE} from "./m125.ts";
import {b} from "../runtime.ts";
function Zqe(e,t,n,r){let o=n?`
<${J_}>${isAmberSentinelEnabled(n)}</${J_}>`:"",s=!r?.isHousekeeping&&wRe()?`
If this event is something the user would act on now, send a ${V5}. Routine or benign output doesn't need one.`:"",i=`<${fp}>${o}
<${Mf}>Monitor event: "${isAmberSentinelEnabled(e)}"</${Mf}>
<event>${isAmberSentinelEnabled(t)}</event>${s}
</${fp}>`;_m({value:i,mode:"task-notification",priority:"next",agentId:r?.agentId??mainAgentId()})}
function Tja(e){let{taskId:t,toolUseId:n,description:r,ownerAgentId:o,stopperAgentId:s}=e,i=`Task "${r}" was stopped by ${e3n(s)}`,a=n?`
<${SO}>${isAmberSentinelEnabled(n)}</${SO}>`:"",l=`<${fp}>
<${J_}>${isAmberSentinelEnabled(t)}</${J_}>${a}
<${__}>stopped</${__}>
<${Mf}>${isAmberSentinelEnabled(i)}</${Mf}>
</${fp}>`;_m({value:l,mode:"task-notification",priority:"next",agentId:Rm(o)})}
function r3n(e,t=(n)=>{let r=setTimeout(n,z0p);return()=>clearTimeout(r)}){let n="",r=[],o=null;function s(a){if(o)o(),o=null;if(a&&n.trim()){let c=n.trim();if(c.length>t3n)c=c.slice(0,t3n)+"...(truncated)";r.push(c),n=""}if(r.length===0)return;let l=r.join(`
`);if(l.length>gja)l=l.slice(0,gja)+`
...(truncated)`;r=[],e(l)}function i(a){if(n+=a,n.length>_ja)n=n.slice(-_ja);let l;while((l=n.indexOf(`
`))!==-1){let c=n.slice(0,l).trim();if(n=n.slice(l+1),c){if(c.length>t3n)c=c.slice(0,t3n)+"...(truncated)";r.push(c)}}if(r.length>0&&!o)o=t(s)}return{onData:i,flush:s}}
function o3n(e,t,n=Date.now){let r=e,o=n();function s(){let i=n(),a=Math.floor((i-o)/t);if(a>0)r=Math.min(e,r+a),o+=a*t}return{tryConsume(){if(s(),r>0)return r--,!0;return!1}}}
var n3n=10,z9t=2000,yja=30000,t3n=500,gja=3000,z0p=200,_ja=1048576;
var s3n=b(()=>{lt();initKp();zE();K9t();sA();QH();aee()});
export {Zqe,Tja,r3n,o3n,n3n,z9t,yja,t3n,gja,z0p,_ja,s3n};
