// @ts-nocheck
import {NOo,N8l} from "../src/api/5385_authorization.ts";
import {gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {eXn,BOo} from "../src/tui/5386_adapter.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function U8l({config:e,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i}){let a=F8l.useMemo(()=>{if(!e)return;return{label:"directConnect",createManager:(l)=>new NOo(e,l),onDisconnected:(l)=>{process.stderr.write(l?`
Server disconnected.
`:`
Failed to connect to server at ${e.wsUrl}
`),gracefulShutdown(1)}}},[e]);return eXn({adapter:a,setMessages:t,setIsLoading:n,requestDialog:r,toolPermissionContext:o,tools:s,permissionMode:i})}
var F8l;
var $8l=b(()=>{N8l();ym();BOo();F8l=M(Te(),1)});
export {U8l,F8l,$8l};
