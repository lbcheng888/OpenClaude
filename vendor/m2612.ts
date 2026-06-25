// @ts-nocheck
import {b} from "../runtime.ts";
function Lo(e,t){if(!process.env.SRT_DEBUG)return;let n=t?.level||"info",r="[SandboxDebug]";switch(n){case"error":console.error(`${r} ${e}`);break;case"warn":console.warn(`${r} ${e}`);break;default:console.error(`${r} ${e}`)}}
async function Jvn(e,t,n,r,o){let s,i=t;if(!ewd.has(t.method??"GET")){let c=U8r.Readable.toWeb(t),[u,d]=c.tee();s=u,i=U8r.Readable.fromWeb(d)}let a;try{a=new Request(r,{method:t.method,headers:twd(t),signal:o,...s?{body:s,duplex:"half"}:{}})}catch(c){return qNi(n,{action:"deny",reason:`malformed request: ${c.message}`}),s?.cancel(),i.destroy(),null}let l;try{l=await e(a)}catch(c){l={action:"deny",reason:`filterRequest threw: ${c.message}`}}if(s&&!a.bodyUsed)s.cancel();if(l.action==="allow")return Lo(`[request-filter] allow ${t.method} ${r}`),i;return qNi(n,l),i.destroy(),null}
function qNi(e,t){let n=t.reason??"denied by filterRequest";if(Lo(`[request-filter] deny: ${n}`),e.headersSent){e.destroy();return}e.writeHead(403,{"Content-Type":"text/plain","X-Proxy-Error":"blocked-by-sandbox-runtime"}),e.end(n+`
`)}
function twd(e){let t=new Headers;for(let[n,r]of Object.entries(e.headers)){if(r===void 0)continue;if(Array.isArray(r))for(let o of r)t.append(n,o);else t.append(n,r)}return t}
var U8r,ewd;
var $8r=b(()=>{U8r=require("stream"),ewd=new Set(["GET","HEAD","OPTIONS"])});
export {Lo,Jvn,qNi,twd,U8r,ewd,$8r};
