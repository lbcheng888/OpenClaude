// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {fp,Mf,__,initKp} from "./m609.ts";
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {ede,NAt} from "./m5300.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {wT,a_e,Ln,lo} from "../src/tools/5190_userPromptCount.ts";
import {sW,z$i,sA} from "./m2782.ts";
import {RNa,xao} from "./m3993.ts";
import {jY,Hct} from "../src/tui/4025_message.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function k0m(e){try{return qt(e)?.type==="idle_notification"}catch{return!1}}
function H0m(e){return`<${fp}>
<${Mf}>+${e} more tasks completed</${Mf}>
<${__}>completed</${__}>
</${fp}>`}
function I0m(e){let t=e.filter((a)=>typeof a.value!=="string"||!k0m(a.value)),n=t.filter((a)=>a.mode==="task-notification"),r=t.filter((a)=>a.mode!=="task-notification");if(n.length<=xOo)return[...r,...n];let o=n.slice(0,xOo-1),s=n.length-(xOo-1),i={value:H0m(s),mode:"task-notification",agentId:mainAgentId()};return[...r,...o,i]}
function D0m(){let e=Ujl.c(20),t=ede(),n=mt(N0m),r=mt(M0m),o=mt(L0m),s;if(e[0]!==t){e:{if(t.length===0){s=null;break e}let p=t.filter(O0m);if(p.length===0){s=null;break e}let m=I0m(p),f=wT(m.map(P0m)),A;if(e[2]!==f||e[3]!==m)A={messages:f,processedCommands:m},e[2]=f,e[3]=m,e[4]=A;else A=e[4];s=A}e[0]=t,e[1]=s}else s=e[1];let i=s,a;e:{if(r===null||i===null){a=-1;break e}let p;if(e[5]!==r||e[6]!==t||e[7]!==i){let f=t.filter(sW)[r];p=f?i.processedCommands.indexOf(f):-1,e[5]=r,e[6]=t,e[7]=i,e[8]=p}else p=e[8];a=p}let l=a;if(n||i===null)return null;let c=l!==-1,u;if(e[9]!==l||e[10]!==i.messages||e[11]!==c||e[12]!==o){let p;if(e[14]!==l||e[15]!==c||e[16]!==o)p=(m,f)=>tTe.createElement(RNa,{key:f,isFirst:f===0,useBriefLayout:o,selectionHighlight:c?f===l?"on":"off":void 0},tTe.createElement(jY,{message:m,lookups:a_e,addMargin:!1,tools:[],commands:[],verbose:!1,inProgressToolUseIDs:x0m,progressMessagesForMessage:[],shouldAnimate:!1,shouldShowDot:!1,isTranscriptMode:!1,isStatic:!0})),e[14]=l,e[15]=c,e[16]=o,e[17]=p;else p=e[17];u=i.messages.map(p),e[9]=l,e[10]=i.messages,e[11]=c,e[12]=o,e[13]=u}else u=e[13];let d;if(e[18]!==u)d=tTe.createElement(Box,{marginTop:1,flexDirection:"column"},u),e[18]=u,e[19]=d;else d=e[19];return d}
function P0m(e){let t=e.value;if(e.mode==="bash"&&typeof t==="string")t=`<bash-input>${t}</bash-input>`;return Ln({content:t})}
function O0m(e){return z$i(e)}
function L0m(e){return e.isBriefOnly}
function M0m(e){return e.queueEditIndex}
function N0m(e){return!!e.viewingAgentTaskId}
var Ujl,tTe,x0m,xOo=3,UJn;
var kOo=b(()=>{ze();configProtoStore();lt();initKp();xao();NAt();sA();lo();Xt();Hct();Ujl=M(rt(),1),tTe=M(Te(),1),x0m=new Set;UJn=tTe.memo(D0m)});
export {k0m,H0m,I0m,D0m,P0m,O0m,L0m,M0m,N0m,Ujl,tTe,x0m,xOo,UJn,kOo};
