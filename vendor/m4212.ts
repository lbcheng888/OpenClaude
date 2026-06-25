// @ts-nocheck
import {yp,bc,Fu,Dv,Qd,Ud} from "./m615.ts";
import {Ml,Yk} from "./m2796.ts";
import {uke,aW,oee} from "../src/session/2699_oee.ts";
import {rd,ef} from "./m2794.ts";
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {o6n,lqt} from "./m4211.ts";
import {cd,xS} from "./m122.ts";
import {b} from "../runtime.ts";
function b5e(e,t,n,r){let o=n?`
<${yp}>${Ml(n)}</${yp}>`:"",s=!r?.isHousekeeping&&uke()?`
If this event is something the user would act on now, send a ${aW}. Routine or benign output doesn't need one.`:"",i=`<${bc}>${o}
<${Fu}>Monitor event: "${Ml(e)}"</${Fu}>
<event>${Ml(t)}</event>${s}
</${bc}>`;rd({value:i,mode:"task-notification",priority:"next",agentId:r?.agentId??mainAgentId()})}
function D7a(e){let{taskId:t,toolUseId:n,description:r,ownerAgentId:o,stopperAgentId:s}=e,i=`Task "${r}" was stopped by ${o6n(s)}`,a=n?`
<${Dv}>${Ml(n)}</${Dv}>`:"",l=`<${bc}>
<${yp}>${Ml(t)}</${yp}>${a}
<${Qd}>stopped</${Qd}>
<${Fu}>${Ml(i)}</${Fu}>
</${bc}>`;rd({value:l,mode:"task-notification",priority:"next",agentId:cd(o)})}
function a6n(e,t=(n)=>{let r=setTimeout(n,fBp);return()=>clearTimeout(r)}){let n="",r=[],o=null;function s(a){if(o)o(),o=null;if(a&&n.trim()){let c=n.trim();if(c.length>s6n)c=c.slice(0,s6n)+"...(truncated)";r.push(c),n=""}if(r.length===0)return;let l=r.join(`
`);if(l.length>H7a)l=l.slice(0,H7a)+`
...(truncated)`;r=[],e(l)}function i(a){if(n+=a,n.length>I7a)n=n.slice(-I7a);let l;while((l=n.indexOf(`
`))!==-1){let c=n.slice(0,l).trim();if(n=n.slice(l+1),c){if(c.length>s6n)c=c.slice(0,s6n)+"...(truncated)";r.push(c)}}if(r.length>0&&!o)o=t(s)}return{onData:i,flush:s}}
function l6n(e,t,n=Date.now){let r=e,o=n();function s(){let i=n(),a=Math.floor((i-o)/t);if(a>0)r=Math.min(e,r+a),o+=a*t}return{tryConsume(){if(s(),r>0)return r--,!0;return!1}}}
var i6n=10,cqt=2000,x7a=30000,s6n=500,H7a=3000,fBp=200,I7a=1048576;
var c6n=b(()=>{lt();Ud();xS();lqt();ef();Yk();oee()});
export {b5e,D7a,a6n,l6n,i6n,cqt,x7a,s6n,H7a,fBp,I7a,c6n};
