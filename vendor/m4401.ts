// @ts-nocheck
import {st} from "./m5.ts";
import {Pn,bt} from "./m195.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ou,uS} from "../src/config/2594_event_name.ts";
import {b} from "../runtime.ts";
import {sn} from "../src/config/0047_namespace.ts";
function N9p(e){if(e?.startsWith("file:")){let t=e.slice(5);return t?{mode:"file",dir:g6n.resolve(t)}:{mode:"disabled"}}return st(e)?{mode:"inline"}:{mode:"disabled"}}
function KZa(){let e=process.env.OTEL_LOG_RAW_API_BODIES;if(!h6n||h6n.raw!==e)h6n={raw:e,config:N9p(e)};return h6n.config}
function zZa(){return KZa().mode!=="disabled"}
async function B9p(e,t,n){try{await V4t.writeFile(t,n)}catch(r){if(!Pn(r))throw r;await V4t.mkdir(e,{recursive:!0}),await V4t.writeFile(t,n)}}
function YZa(e,t,n){let r=KZa();if(r.mode==="disabled")return;let o=Le(t);if(r.mode==="file"){let i=e==="api_request_body"?"request":"response",a=n.request_id??Dho.randomUUID(),l=/^[A-Za-z0-9_-]+$/.test(a)?a:Dho.randomUUID(),c=g6n.join(r.dir,`${l}.${i}.json`);B9p(r.dir,c,o).catch((u)=>logForDebugging(`OTEL raw body file write failed: ${u}`,{level:"error"})),Ou(e,{body_ref:c,body_length:String(Buffer.byteLength(o)),...n});return}let s=o.length>VZa;Ou(e,{body:s?o.slice(0,VZa)+`

[TRUNCATED - Content exceeds 60KB limit]`:o,body_length:String(o.length),...s&&{body_truncated:"true"},...n})}
function JZa(e){return e.map((t)=>{if(t.type==="thinking")return{...t,thinking:"<REDACTED>"};if(t.type==="redacted_thinking")return{...t,data:"<REDACTED>"};return t})}
function F9p(e){return{...e,messages:e.messages.map((t)=>t.role==="assistant"&&Array.isArray(t.content)?{...t,content:JZa(t.content)}:t)}}
function _6n(e,t){if(!zZa())return;let n=F9p(e);YZa("api_request_body",n,{model:e.model,query_source:t})}
function XZa(e,t){if(!zZa()||e.length===0)return;let n=e.at(-1),r=e.flatMap((s)=>s.message.content),o={...n.message,content:JZa(r)};YZa("api_response_body",o,{model:t.model,query_source:t.querySource,request_id:t.requestId??void 0})}
var Dho,V4t,g6n,VZa=61440,h6n;
var Pho=b(()=>{qe();sn();bt();Xt();uS();Dho=require("crypto"),V4t=require("fs/promises"),g6n=require("path")});
export {N9p,KZa,zZa,B9p,YZa,JZa,F9p,_6n,XZa,Dho,V4t,g6n,VZa,h6n,Pho};
