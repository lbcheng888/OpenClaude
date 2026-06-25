// @ts-nocheck
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {Git,rOn} from "./m3300.ts";
import {Box} from "./m2432.ts";
import {S1,sHe} from "./m2816.ts";
import {at,Wo} from "./m2557.ts";
import {C3e,nOn} from "./m3299.ts";
import {wC,initModelResolutionModule} from "../src/core/3298_result.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function ytl(e,{verbose:t,theme:n}){let{command:r}=e;if(!r)return null;let o=r;if(!t){let s=o.split(`
`),i=s.length>_tl,a=o.length>_To;if(i||a){let l=o;if(i)l=s.slice(0,_tl).join(`
`);if(l.length>_To)l=l.slice(0,_To);return serializeToolResult.jsxs(Text,{children:[l.trim(),"\u2026"]})}}return o}
function Ttl(e,{verbose:t,tools:n,terminalSize:r,inProgressToolCallCount:o}){let s=e.at(-1);if(!s||!s.data)return serializeToolResult.jsx(Yn,{height:1,children:serializeToolResult.jsx(Text,{dimColor:!0,children:"Running\u2026"})});let i=s.data;return serializeToolResult.jsx(Git,{fullOutput:i.fullOutput,output:i.output,elapsedTimeSeconds:i.elapsedTimeSeconds,totalLines:i.totalLines,totalBytes:i.totalBytes,timeoutMs:i.timeoutMs,taskId:i.taskId,verbose:t})}
function Stl(){return serializeToolResult.jsx(Yn,{height:1,children:serializeToolResult.jsx(Text,{dimColor:!0,children:"Waiting\u2026"})})}
function btl(e,t,{verbose:n,theme:r,tools:o,style:s}){let a=t.at(-1)?.data?.timeoutMs,{stdout:l,stderr:c,interrupted:u,returnCodeInterpretation:d,isImage:p,backgroundTaskId:m}=e;if(p)return serializeToolResult.jsx(Yn,{height:1,children:serializeToolResult.jsx(Text,{dimColor:!0,children:"[Image data detected and sent to Claude]"})});return serializeToolResult.jsxs(Box,{flexDirection:"column",children:[l!==""?serializeToolResult.jsx(S1,{content:l,verbose:n}):null,c.trim()!==""?serializeToolResult.jsx(S1,{content:c,verbose:n,isError:!0}):null,l===""&&c.trim()===""?serializeToolResult.jsx(Yn,{height:1,children:serializeToolResult.jsx(Text,{dimColor:!0,children:m?serializeToolResult.jsxs(serializeToolResult.Fragment,{children:["Running in the background"," ",serializeToolResult.jsx(at,{chord:"down",action:"manage",parens:!0})]}):u?"Interrupted":d||"(No output)"})}):null,a?serializeToolResult.jsx(Yn,{children:serializeToolResult.jsx(C3e,{timeoutMs:a})}):null]})}
function Etl(e,{verbose:t,progressMessagesForMessage:n,tools:r}){return serializeToolResult.jsx(wC,{result:e,verbose:t})}
var serializeToolResult,_tl=2,_To=160;
var Ctl=b(()=>{Wo();initModelResolutionModule();Pl();sHe();rOn();nOn();je();serializeToolResult=x(oe(),1)});
export {ytl,Ttl,Stl,btl,Etl,serializeToolResult,_tl,_To,Ctl};
