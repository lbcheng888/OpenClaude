// @ts-nocheck
import {_g,zR} from "./m2562.ts";
import {bo,uo} from "./m2468.ts";
import {shellToolNames,isReplMode} from "./m4331.ts";
import {rd,iy,ef} from "./m2794.ts";
import {mainAgentId,getSessionId,lt} from "../src/session/0132_sent.ts";
import {Nm,D_} from "../src/agent/2784_withFileTypes.ts";
import {clearConversation,TVn} from "../src/artifact/4505_clearConversation.ts";
import {wc,po} from "../src/tools/5224_userPromptCount.ts";
import {bT,Dw} from "../src/core/5176_encoding.ts";
import {bbn,cet} from "./m2205.ts";
import {Js,rT} from "./m1294.ts";
import {dd,Xl} from "../src/config/0651_maxBytes.ts";
import {archiveRemoteSession,qD} from "../src/permissions/3888_validateSessionRepository.ts";
import {_r,ui} from "./m2463.ts";
import {e1} from "./m2376.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Xac(e,t){if(t.kind==="clear"){if(!e.has(t.toolUseId))return e;let o=new Map(e);return o.delete(t.toolUseId),o}let n=e.get(t.toolUseId);if(t.kind==="background_hint"&&n?.kind===t.kind)return e;let r=new Map(e);return r.set(t.toolUseId,t),r}
function Qac(e,t){if(e.size===0)return e;let n=null;for(let r of e.keys())if(t.has(r)){if(n===null)n=new Map(e);n.delete(r)}return n??e}
function tlc({plan:e,sessionId:t,taskId:n,setMessages:r,readFileState:o,memorySelector:s,sessionEnvVars:i,getAppState:a,isolationLatch:l,onQueryEvent:c}){_g("ultraplan-choice");let u=bo(),d=shellToolNames();async function p(D){switch(D){case"here":rd({value:["Ultraplan approved in browser. Here is the plan:","","<ultraplan>",e,"</ultraplan>","","The user approved this plan in the cloud session. Give them a brief summary, then start implementing."].join(`
`),mode:"task-notification",agentId:mainAgentId()});break;case"fresh":{let O=getSessionId(),L=await Zac.stat(Nm()).then(()=>!0,()=>!1);for await(let P of clearConversation({setMessages:r,readFileState:o,memorySelector:s,sessionEnvVars:i,getAppState:a,setAppState:u,isolationLatch:l}))c(P);if(L)r((P)=>[...P,wc(`Previous session saved \xB7 resume with: claude --resume ${O}`,"suggestion")]);iy({value:`Here is the approved implementation plan:

${e}

Implement this plan.`,mode:"prompt",agentId:mainAgentId(),origin:{kind:"auto-continuation"}});break}case"cancel":{let O=elc.join(bT(),`${bbn()}-ultraplan.md`);await Js().write(O,e),r((L)=>[...L,wc(`Ultraplan rejected \xB7 Plan saved to ${dd(O)}`,"suggestion")]);break}}d.update(n,(O)=>O.status!=="running"?O:{...O,status:"completed",endTime:Date.now()}),u((O)=>O.ultraplanPendingChoice?{...O,ultraplanPendingChoice:void 0,ultraplanSessionUrl:void 0}:O),archiveRemoteSession(t)}let{rows:m,columns:f}=_r(),h=Math.min(EWm,Math.max(1,Math.floor(m/2)-CWm)),g=Pyt.useMemo(()=>e1(e,Math.max(1,f-4),"wrap").split(`
`),[e,f]),_=Math.max(0,g.length-h),[T,y]=Pyt.useState(0);Pyt.useEffect(()=>y((D)=>Math.min(D,_)),[_]);let S=g.length>h;function E(D){if(!S)return;y((O)=>Math.max(0,Math.min(O+D,_)))}function R(D){if(!D.ctrl||D.meta)return;let O=Math.max(1,Math.floor(h/2));if(D.key==="d")D.preventDefault(),E(O);else if(D.key==="u")D.preventDefault(),E(-O)}function w(D){D.preventDefault(),E(D.deltaY>0?3:-3)}let H=g.slice(T,T+h).join(`
`),k=T>0,I=T<_;return oLe.jsx(preInitQueue,{title:"Ultraplan approved",subtitle:"How should the plan be implemented?",onCancel:()=>{},isCancelActive:!1,hideInputGuide:!0,children:oLe.jsxs(Box,{flexDirection:"column",marginBottom:1,onKeyDown:R,onWheel:w,children:[oLe.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[oLe.jsx(Text,{children:H}),S&&oLe.jsxs(Text,{dimColor:!0,children:[k?Xe.arrowUp:" ",I?Xe.arrowDown:" "," ",T+1,"\u2013",Math.min(T+h,g.length)," of"," ",g.length," \xB7 ctrl+u/ctrl+d to scroll"]})]}),oLe.jsx(hr,{options:[{label:"Implement here",value:"here",description:"Inject plan into the current conversation"},{label:"Start new session",value:"fresh",description:"Clear conversation and start with only the plan"},{label:"Cancel",value:"cancel",description:"Don't implement \u2014 save plan and return"}],onChange:(D)=>void p(D)})]})})}
var Zac,elc,Pyt,oLe,EWm=24,CWm=11;
var nlc=b(()=>{Zs();lt();isReplMode();lt();TVn();zR();ui();je();uo();rT();Xl();ef();po();Dw();D_();qD();cet();Ol();di();Zac=require("fs/promises"),elc=require("path"),Pyt=x(et(),1),oLe=x(oe(),1)});
export {Xac,Qac,tlc,Zac,elc,Pyt,oLe,EWm,CWm,nlc};
