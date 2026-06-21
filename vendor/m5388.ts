// @ts-nocheck
import {Mc,mt,configProtoStore} from "./m2458.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function G8l(e){return{onBeforeQuery:async()=>!0,onTurnComplete:async()=>{},onSessionRestored:async()=>{},render:()=>null,ownsInput:!1}}
function V8l(e){let t=Mc(),n=mt((a)=>a.transcripts[e]?.messages??FOo),r=SGt.useRef(n),o=mt((a)=>a.transcripts[e]?.inProgressToolUseIDs??UOo),s=SGt.useCallback((a,l)=>{r.current=a,t.setState((c)=>{let u=c.transcripts[e]??{messages:FOo,inProgressToolUseIDs:UOo};if(u.messages===a&&l?.tokenCount===void 0)return c;return{...c,transcripts:{...c.transcripts,[e]:{...u,messages:a,...l?.tokenCount!==void 0&&{progress:{toolUseCount:0,...u.progress,tokenCount:l.tokenCount}}}}}})},[t,e]),i=SGt.useCallback((a)=>{t.setState((l)=>{let c=l.transcripts[e]??{messages:FOo,inProgressToolUseIDs:UOo},u=c.inProgressToolUseIDs,d;switch(a.action){case"add":{d=new Set(u);for(let p of a.ids)d.add(p);break}case"remove":{d=new Set(u);for(let p of a.ids)d.delete(p);if(d.size===u.size)return l;break}case"clear":if(u.size===0)return l;d=new Set;break;default:return l}return{...l,transcripts:{...l.transcripts,[e]:{...c,inProgressToolUseIDs:d}}}})},[t,e]);return{messages:n,messagesRef:r,setAgentMessages:s,inProgressToolUseIDs:o,setInProgressToolUseIDs:i}}
var SGt,FOo,UOo;
var K8l=b(()=>{configProtoStore();SGt=M(Te(),1),FOo=[],UOo=new Set});
export {G8l,V8l,SGt,FOo,UOo,K8l};
