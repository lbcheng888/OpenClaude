// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {bc,Fu,Qd,Ud} from "./m615.ts";
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {ade,eyt} from "./m5337.ts";
import {_t,uo} from "./m2468.ts";
import {ST,kye,Mn,po} from "../src/tools/5224_userPromptCount.ts";
import {bW,B8i,ef} from "./m2794.ts";
import {Z4a,pmo} from "./m4058.ts";
import {RY,Ydt} from "../src/session/4089_message.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function NBm(e){try{return qt(e)?.type==="idle_notification"}catch{return!1}}
function FBm(e){return`<${bc}>
<${Fu}>+${e} more tasks completed</${Fu}>
<${Qd}>completed</${Qd}>
</${bc}>`}
function BBm(e){let t=e.filter((a)=>typeof a.value!=="string"||!NBm(a.value)),n=t.filter((a)=>a.mode==="task-notification"),r=t.filter((a)=>a.mode!=="task-notification");if(n.length<=zFo)return[...r,...n];let o=n.slice(0,zFo-1),s=n.length-(zFo-1),i={value:FBm(s),mode:"task-notification",agentId:mainAgentId()};return[...r,...o,i]}
function UBm(){let e=EYl.c(20),t=ade(),n=_t(VBm),r=_t(GBm),o=_t(WBm),s;if(e[0]!==t){e:{if(t.length===0){s=null;break e}let p=t.filter(qBm);if(p.length===0){s=null;break e}let m=BBm(p),f=ST(m.map($Bm)),h;if(e[2]!==f||e[3]!==m)h={messages:f,processedCommands:m},e[2]=f,e[3]=m,e[4]=h;else h=e[4];s=h}e[0]=t,e[1]=s}else s=e[1];let i=s,a;e:{if(r===null||i===null){a=-1;break e}let p;if(e[5]!==r||e[6]!==t||e[7]!==i){let f=t.filter(bW)[r];p=f?i.processedCommands.indexOf(f):-1,e[5]=r,e[6]=t,e[7]=i,e[8]=p}else p=e[8];a=p}let l=a;if(n||i===null)return null;let c=l!==-1,u;if(e[9]!==l||e[10]!==i.messages||e[11]!==c||e[12]!==o){let p;if(e[14]!==l||e[15]!==c||e[16]!==o)p=(m,f)=>Ber.jsx(Z4a,{isFirst:f===0,useBriefLayout:o,selectionHighlight:c?f===l?"on":"off":void 0,children:Ber.jsx(RY,{message:m,lookups:kye,addMargin:!1,tools:[],commands:[],verbose:!1,inProgressToolUseIDs:MBm,progressMessagesForMessage:[],shouldAnimate:!1,shouldShowDot:!1,isTranscriptMode:!1,isStatic:!0})},f),e[14]=l,e[15]=c,e[16]=o,e[17]=p;else p=e[17];u=i.messages.map(p),e[9]=l,e[10]=i.messages,e[11]=c,e[12]=o,e[13]=u}else u=e[13];let d;if(e[18]!==u)d=Ber.jsx(Box,{marginTop:1,flexDirection:"column",children:u}),e[18]=u,e[19]=d;else d=e[19];return d}
function $Bm(e){let t=e.value;if(e.mode==="bash"&&typeof t==="string")t=`<bash-input>${t}</bash-input>`;return Mn({content:t})}
function qBm(e){return B8i(e)}
function WBm(e){return e.isBriefOnly}
function GBm(e){return e.queueEditIndex}
function VBm(e){return!!e.viewingAgentTaskId}
var EYl,CYl,Ber,MBm,zFo=3,Uer;
var jFo=b(()=>{je();uo();lt();Ud();pmo();eyt();ef();po();tn();Ydt();EYl=x(tt(),1),CYl=x(et(),1),Ber=x(oe(),1),MBm=new Set;Uer=CYl.memo(UBm)});
export {NBm,FBm,BBm,UBm,$Bm,qBm,WBm,GBm,VBm,EYl,CYl,Ber,MBm,zFo,Uer,jFo};
