// @ts-nocheck
import {g8n,U5e,hS} from "../src/agent/4362_toolUseCount.ts";
import {Jye,r9,Qqt} from "../src/permissions/4311_agentId.ts";
import {h8n,FTo} from "./m4360.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {Ce,Ct} from "./m197.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function CQl({taskRegistry:e,getToolUseContext:t,canUseTool:n,addNotification:r}){let o=ytr.useCallback(async(s)=>{let i=g8n(s,e);if(i.length===0)return;let[a,...l]=i;for(let c of l)U5e(s,c.text,e,{origin:c.origin,isMeta:c.isMeta});try{await Jye({agentId:s,prompt:a.text,promptOrigin:a.origin,promptIsMeta:a.isMeta,toolUseContext:t(),canUseTool:n})}catch(c){throw U5e(s,a.text,e,{origin:a.origin,isMeta:a.isMeta}),c}},[e,t,n]);ytr.useEffect(()=>h8n.subscribe((s)=>{o(s).catch((i)=>{if(i instanceof r9)return;Ie(i),r({key:`stranded-resume-failed-${s}`,kind:"warning",text:`Failed to deliver queued message to agent: ${Ce(i)}`,color:"error",priority:"low"})})}),[o,r])}
var ytr;
var AQl=b(()=>{hS();FTo();Qqt();Ct();vn();ytr=x(et(),1)});
export {CQl,ytr,AQl};
