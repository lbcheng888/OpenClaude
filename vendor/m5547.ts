// @ts-nocheck
import {ug,ZR} from "./m2551.ts";
import {bo,configProtoStore} from "./m2458.ts";
import {mcpTools,sJ} from "./m4311.ts";
import {_m,oy,sA} from "./m2782.ts";
import {mainAgentId,getSessionId,lt} from "../src/session/0131_sent.ts";
import {qf,ry} from "../src/agent/2772_withFileTypes.ts";
import {clearConversation,Qjn} from "../src/artifact/4483_clearConversation.ts";
import {nu,lo} from "../src/tools/5190_userPromptCount.ts";
import {xT,yx} from "../src/core/5144_encoding.ts";
import {U_n,cQe} from "./m2199.ts";
import {ci,pT} from "./m1289.ts";
import {Id,mc} from "../src/config/0645_maxBytes.ts";
import {S6,RP} from "../src/tui/3870_validateSessionRepository.ts";
import {mr,ki} from "./m2453.ts";
import {$1} from "./m2366.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function cZl(e,t){if(t.kind==="clear"){if(!e.has(t.toolUseId))return e;let o=new Map(e);return o.delete(t.toolUseId),o}let n=e.get(t.toolUseId);if(t.kind==="background_hint"&&n?.kind===t.kind)return e;let r=new Map(e);return r.set(t.toolUseId,t),r}
function uZl(e,t){if(e.size===0)return e;let n=null;for(let r of e.keys())if(t.has(r)){if(n===null)n=new Map(e);n.delete(r)}return n??e}
function mZl({plan:e,sessionId:t,taskId:n,setMessages:r,readFileState:o,memorySelector:s,sessionEnvVars:i,getAppState:a,isolationLatch:l,onQueryEvent:c}){ug("ultraplan-choice");let u=bo(),d=mcpTools();async function p(I){switch(I){case"here":_m({value:["Ultraplan approved in browser. Here is the plan:","","<ultraplan>",e,"</ultraplan>","","The user approved this plan in the cloud session. Give them a brief summary, then start implementing."].join(`
`),mode:"task-notification",agentId:mainAgentId()});break;case"fresh":{let P=getSessionId(),L=await dZl.stat(qf()).then(()=>!0,()=>!1);for await(let D of clearConversation({setMessages:r,readFileState:o,memorySelector:s,sessionEnvVars:i,getAppState:a,setAppState:u,isolationLatch:l}))c(D);if(L)r((D)=>[...D,nu(`Previous session saved \xB7 resume with: claude --resume ${P}`,"suggestion")]);oy({value:`Here is the approved implementation plan:

${e}

Implement this plan.`,mode:"prompt",agentId:mainAgentId(),origin:{kind:"auto-continuation"}});break}case"cancel":{let P=pZl.join(xT(),`${U_n()}-ultraplan.md`);await ci().write(P,e),r((L)=>[...L,nu(`Ultraplan rejected \xB7 Plan saved to ${Id(P)}`,"suggestion")]);break}}d.update(n,(P)=>P.status!=="running"?P:{...P,status:"completed",endTime:Date.now()}),u((P)=>P.ultraplanPendingChoice?{...P,ultraplanPendingChoice:void 0,ultraplanSessionUrl:void 0}:P),S6(t)}let{rows:m,columns:f}=mr(),A=Math.min(WUm,Math.max(1,Math.floor(m/2)-GUm)),h=pht.useMemo(()=>$1(e,Math.max(1,f-4),"wrap").split(`
`),[e,f]),g=Math.max(0,h.length-A),[_,y]=pht.useState(0);pht.useEffect(()=>y((I)=>Math.min(I,g)),[g]);let T=h.length>A;function S(I){if(!T)return;y((P)=>Math.max(0,Math.min(P+I,g)))}function v(I){if(!I.ctrl||I.meta)return;let P=Math.max(1,Math.floor(A/2));if(I.key==="d")I.preventDefault(),S(P);else if(I.key==="u")I.preventDefault(),S(-P)}function R(I){I.preventDefault(),S(I.deltaY>0?3:-3)}let k=h.slice(_,_+A).join(`
`),x=_>0,H=_<g;return aV.createElement(Kn,{title:"Ultraplan approved",subtitle:"How should the plan be implemented?",onCancel:()=>{},isCancelActive:!1,hideInputGuide:!0},aV.createElement(Box,{flexDirection:"column",marginBottom:1,onKeyDown:v,onWheel:R},aV.createElement(Box,{flexDirection:"column",marginBottom:1},aV.createElement(Text,null,k),T&&aV.createElement(Text,{dimColor:!0},x?et.arrowUp:" ",H?et.arrowDown:" "," ",_+1,"\u2013",Math.min(_+A,h.length)," of"," ",h.length," \xB7 ctrl+u/ctrl+d to scroll")),aV.createElement(pr,{options:[{label:"Implement here",value:"here",description:"Inject plan into the current conversation"},{label:"Start new session",value:"fresh",description:"Clear conversation and start with only the plan"},{label:"Cancel",value:"cancel",description:"Don't implement \u2014 save plan and return"}],onChange:(I)=>void p(I)})))}
var dZl,pZl,aV,pht,WUm=24,GUm=11;
var fZl=b(()=>{Ai();lt();sJ();lt();Qjn();ZR();ki();ze();configProtoStore();pT();mc();sA();lo();yx();ry();RP();cQe();Yl();Li();dZl=require("fs/promises"),pZl=require("path"),aV=M(Te(),1),pht=M(Te(),1)});
export {cZl,uZl,mZl,dZl,pZl,aV,pht,WUm,GUm,fZl};
