// @ts-nocheck
import {gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {eXn,BOo} from "../src/tui/5386_adapter.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function j8l({session:e,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i}){let a=q8l.useMemo(()=>{if(!e)return;return{label:"ssh",createManager:(l)=>e.createManager(l),onDisconnected:(l)=>{let c=e.getStderrTail().trim(),u=e.proc.exitCode,d=l?"Remote session ended.":"SSH session failed before connecting.";if(c&&(!l||u!==0))d+=`
Remote stderr (exit ${u??"signal "+e.proc.signalCode}):
${c}`;gracefulShutdown(1,"other",{finalMessage:d})},cleanup:()=>e.proxy?.stop()}},[e]);return eXn({adapter:a,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i})}
var q8l;
var W8l=b(()=>{ym();BOo();q8l=M(Te(),1)});
export {j8l,q8l,W8l};
