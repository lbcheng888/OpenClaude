// @ts-nocheck
import {b} from "../runtime.ts";
function Jo(e,t){if(!process.env.SRT_DEBUG)return;let n=t?.level||"info",r="[SandboxDebug]";switch(n){case"error":console.error(`${r} ${e}`);break;case"warn":console.warn(`${r} ${e}`);break;default:console.error(`${r} ${e}`)}}
async function iCn(e,t,n,r,o){let s,i=t;if(!khd.has(t.method??"GET")){let c=l4r.Readable.toWeb(t),[u,d]=c.tee();s=u,i=l4r.Readable.fromWeb(d)}let a;try{a=new Request(r,{method:t.method,headers:Hhd(t),signal:o,...s?{body:s,duplex:"half"}:{}})}catch(c){return uDi(n,{action:"deny",reason:`malformed request: ${c.message}`}),s?.cancel(),i.destroy(),null}let l;try{l=await e(a)}catch(c){l={action:"deny",reason:`filterRequest threw: ${c.message}`}}if(s&&!a.bodyUsed)s.cancel();if(l.action==="allow")return Jo(`[request-filter] allow ${t.method} ${r}`),i;return uDi(n,l),i.destroy(),null}
function uDi(e,t){let n=t.reason??"denied by filterRequest";if(Jo(`[request-filter] deny: ${n}`),e.headersSent){e.destroy();return}e.writeHead(403,{"Content-Type":"text/plain","X-Proxy-Error":"blocked-by-sandbox-runtime"}),e.end(n+`
`)}
function Hhd(e){let t=new Headers;for(let[n,r]of Object.entries(e.headers)){if(r===void 0)continue;if(Array.isArray(r))for(let o of r)t.append(n,o);else t.append(n,r)}return t}
var l4r,khd;
var c4r=b(()=>{l4r=require("stream"),khd=new Set(["GET","HEAD","OPTIONS"])});
export {Jo,iCn,uDi,Hhd,l4r,khd,c4r};
