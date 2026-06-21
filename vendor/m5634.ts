// @ts-nocheck
import {nW,Snt,f$i,lxe} from "./m2768.ts";
import {cacheHookSessionTitle,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {b} from "../runtime.ts";
async function ATe(e){switch(e.kind){case"session-start":{let t=await nW(e.source,{sessionId:e.sessionId,agentType:e.agentType,model:e.model,forceSyncExecution:e.forceSyncExecution}),n=Snt();if(n)cacheHookSessionTitle(n);return t}case"setup":return f$i(e.trigger,{forceSyncExecution:e.forceSyncExecution})}}
var y1o=b(()=>{lxe();ja()});
export {ATe,y1o};
