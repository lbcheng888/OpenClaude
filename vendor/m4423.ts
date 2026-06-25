// @ts-nocheck
import {nt} from "./m127.ts";
import {In,Ct} from "./m197.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {bu,oS} from "../src/config/2605_event_name.ts";
import {b} from "../runtime.ts";
import {dn} from "../src/config/0137_namespace.ts";
function SVp(e){if(e?.startsWith("file:")){let t=e.slice(5);return t?{mode:"file",dir:MWn.resolve(t)}:{mode:"disabled"}}return nt(e)?{mode:"inline"}:{mode:"disabled"}}
function Lil(){let e=process.env.OTEL_LOG_RAW_API_BODIES;if(!LWn||LWn.raw!==e)LWn={raw:e,config:SVp(e)};return LWn.config}
function Mil(){return Lil().mode!=="disabled"}
async function bVp(e,t,n){try{await y5t.writeFile(t,n)}catch(r){if(!In(r))throw r;await y5t.mkdir(e,{recursive:!0}),await y5t.writeFile(t,n)}}
function Nil(e,t,n){let r=Lil();if(r.mode==="disabled")return;let o=TeamDeleteToolName(t);if(r.mode==="file"){let i=e==="api_request_body"?"request":"response",a=n.request_id??Rbo.randomUUID(),l=/^[A-Za-z0-9_-]+$/.test(a)?a:Rbo.randomUUID(),c=MWn.join(r.dir,`${l}.${i}.json`);bVp(r.dir,c,o).catch((u)=>logForDebugging(`OTEL raw body file write failed: ${u}`,{level:"error"})),bu(e,{body_ref:c,body_length:String(Buffer.byteLength(o)),...n});return}let s=o.length>Oil;bu(e,{body:s?o.slice(0,Oil)+`

[TRUNCATED - Content exceeds 60KB limit]`:o,body_length:String(o.length),...s&&{body_truncated:"true"},...n})}
function Fil(e){return e.map((t)=>{if(t.type==="thinking")return{...t,thinking:"<REDACTED>"};if(t.type==="redacted_thinking")return{...t,data:"<REDACTED>"};return t})}
function EVp(e){return{...e,messages:e.messages.map((t)=>t.role==="assistant"&&Array.isArray(t.content)?{...t,content:Fil(t.content)}:t)}}
function NWn(e,t){if(!Mil())return;let n=EVp(e);Nil("api_request_body",n,{model:e.model,query_source:t})}
function Bil(e,t){if(!Mil()||e.length===0)return;let n=e.at(-1),r=e.flatMap((s)=>s.message.content),o={...n.message,content:Fil(r)};Nil("api_response_body",o,{model:t.model,query_source:t.querySource,request_id:t.requestId??void 0})}
var Rbo,y5t,MWn,Oil=61440,LWn;
var vbo=b(()=>{qe();dn();Ct();tn();oS();Rbo=require("crypto"),y5t=require("fs/promises"),MWn=require("path")});
export {SVp,Lil,Mil,bVp,Nil,Fil,EVp,NWn,Bil,Rbo,y5t,MWn,Oil,LWn,vbo};
