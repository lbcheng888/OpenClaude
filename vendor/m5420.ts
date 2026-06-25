// @ts-nocheck
import {nBo,bJl} from "../src/api/5419_authorization.ts";
import {gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {ttr,rBo} from "../src/tui/5420_adapter.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function AJl({config:e,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i}){let a=CJl.useMemo(()=>{if(!e)return;return{label:"directConnect",createManager:(l)=>new nBo(e,l),onDisconnected:(l)=>{process.stderr.write(l?`
Server disconnected.
`:`
Failed to connect to server at ${e.wsUrl}
`),gracefulShutdown(1)}}},[e]);return ttr({adapter:a,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i})}
var CJl;
var RJl=b(()=>{bJl();isAmberSentinelEnabled();rBo();CJl=x(et(),1)});
export {AJl,CJl,RJl};
