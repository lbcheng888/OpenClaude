// @ts-nocheck
import {gW,vot,s8i,jke} from "./m2780.ts";
import {cacheHookSessionTitle,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {b} from "../runtime.ts";
async function jSe(e){switch(e.kind){case"session-start":{let t=await gW(e.source,{sessionId:e.sessionId,agentType:e.agentType,model:e.model,forceSyncExecution:e.forceSyncExecution}),n=vot();if(n)cacheHookSessionTitle(n);return t}case"setup":return s8i(e.trigger,{forceSyncExecution:e.forceSyncExecution})}}
var q2o=b(()=>{jke();_a()});
export {jSe,q2o};
