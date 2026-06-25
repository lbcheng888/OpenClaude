// @ts-nocheck
import {gc,_t,uo} from "./m2468.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function HJl(e){return{onBeforeQuery:async()=>!0,onTurnComplete:async()=>{},onSessionRestored:async()=>{},render:()=>null,ownsInput:!1}}
function IJl(e){let t=gc(),n=_t((a)=>a.transcripts[e]?.messages??oBo),r=j7t.useRef(n),o=_t((a)=>a.transcripts[e]?.inProgressToolUseIDs??sBo),s=j7t.useCallback((a,l)=>{r.current=a,t.setState((c)=>{let u=c.transcripts[e]??{messages:oBo,inProgressToolUseIDs:sBo};if(u.messages===a&&l?.tokenCount===void 0)return c;return{...c,transcripts:{...c.transcripts,[e]:{...u,messages:a,...l?.tokenCount!==void 0&&{progress:{toolUseCount:0,...u.progress,tokenCount:l.tokenCount}}}}}})},[t,e]),i=j7t.useCallback((a)=>{t.setState((l)=>{let c=l.transcripts[e]??{messages:oBo,inProgressToolUseIDs:sBo},u=c.inProgressToolUseIDs,d;switch(a.action){case"add":{d=new Set(u);for(let p of a.ids)d.add(p);break}case"remove":{d=new Set(u);for(let p of a.ids)d.delete(p);if(d.size===u.size)return l;break}case"clear":if(u.size===0)return l;d=new Set;break;default:return l}return{...l,transcripts:{...l.transcripts,[e]:{...c,inProgressToolUseIDs:d}}}})},[t,e]);return{messages:n,messagesRef:r,setAgentMessages:s,inProgressToolUseIDs:o,setInProgressToolUseIDs:i}}
var j7t,oBo,sBo;
var xJl=b(()=>{uo();j7t=x(et(),1),oBo=[],sBo=new Set});
export {HJl,IJl,j7t,oBo,sBo,xJl};
