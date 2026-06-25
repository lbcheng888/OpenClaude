// @ts-nocheck
import {gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {ttr,rBo} from "../src/tui/5420_adapter.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function wJl({session:e,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i}){let a=vJl.useMemo(()=>{if(!e)return;return{label:"ssh",createManager:(l)=>e.createManager(l),onDisconnected:(l)=>{let c=e.getStderrTail().trim(),u=e.proc.exitCode,d=l?"Remote session ended.":"SSH session failed before connecting.";if(c&&(!l||u!==0))d+=`
Remote stderr (exit ${u??"signal "+e.proc.signalCode}):
${c}`;gracefulShutdown(1,"other",{finalMessage:d})},cleanup:()=>e.proxy?.stop()}},[e]);return ttr({adapter:a,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i})}
var vJl;
var kJl=b(()=>{isAmberSentinelEnabled();rBo();vJl=x(et(),1)});
export {wJl,vJl,kJl};
