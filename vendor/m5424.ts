// @ts-nocheck
import {Z4n,A6e,RE} from "../src/agent/4342_toolUseCount.ts";
import {p0e,d0e,D3t} from "../src/permissions/4291_agentId.ts";
import {Q4n,qfo} from "./m4340.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {Se,bt} from "./m195.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function UWl({taskRegistry:e,getToolUseContext:t,canUseTool:n,addNotification:r}){let o=gXn.useCallback(async(s)=>{let i=Z4n(s,e);if(i.length===0)return;let[a,...l]=i;for(let c of l)A6e(s,c.text,e,{origin:c.origin,isMeta:c.isMeta});try{await p0e({agentId:s,prompt:a.text,promptOrigin:a.origin,promptIsMeta:a.isMeta,toolUseContext:t(),canUseTool:n})}catch(c){throw A6e(s,a.text,e,{origin:a.origin,isMeta:a.isMeta}),c}},[e,t,n]);gXn.useEffect(()=>Q4n.subscribe((s)=>{o(s).catch((i)=>{if(i instanceof d0e)return;De(i),r({key:`stranded-resume-failed-${s}`,kind:"warning",text:`Failed to deliver queued message to agent: ${Se(i)}`,color:"error",priority:"low"})})}),[o,r])}
var gXn;
var $Wl=b(()=>{RE();qfo();D3t();bt();Rn();gXn=M(Te(),1)});
export {UWl,gXn,$Wl};
