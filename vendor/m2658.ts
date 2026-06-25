// @ts-nocheck
import {Lo,Jvn,$8r} from "./m2612.ts";
import {pUi,mUi,fUi} from "./m2657.ts";
import {fLt,hLt,jWr,Pwn,Own,QZ,Vwe,YWr,_Lt} from "./m2656.ts";
import {b} from "../runtime.ts";
function _Ui(e){let t=Fwn.createServer(),n=(r)=>{if(!e.proxyAuthToken)return!0;let o=/^basic\s+([a-z0-9+/=]+)\s*$/i.exec(r??"");if(!o)return!1;let s=Buffer.from(o[1],"base64").toString("utf8"),i=s.indexOf(":");return i>0&&s.slice(i+1)===e.proxyAuthToken};return t.on("connect",async(r,o,s)=>{o.on("error",(a)=>{Lo(`Client socket error: ${a.message}`,{level:"error"})});let i=!1;o.once("close",()=>{i=!0});try{if(!n(r.headers["proxy-authorization"])){o.end(`HTTP/1.1 407 Proxy Authentication Required\r
Proxy-Authenticate: Basic realm="srt"\r
\r
`);return}let a=e0d(r.url);if(!a){Lo(`Invalid CONNECT request: ${r.url}`,{level:"error"}),o.end(`HTTP/1.1 400 Bad Request\r
\r
`);return}let{hostname:l,port:c}=a;if(!await e.filter(c,l,o)){Lo(`Connection blocked to ${l}:${c}`,{level:"error"}),o.end(`HTTP/1.1 403 Forbidden\r
Content-Type: text/plain\r
X-Proxy-Error: blocked-by-allowlist\r
\r
Connection blocked by network allowlist`);return}let d=!1;if(e.mitmCA){if(i)return;o.write(`HTTP/1.1 200 Connection Established\r
\r
`),d=!0;let h=await pUi(o,s);if(i)return;if(h.isTLS){mUi(e.mitmCA,e.filterRequest,o,h.head,{hostname:l,port:c,upstreamCA:e.tlsTerminateUpstreamCA});return}Lo(`[tls-terminate] non-TLS bytes on CONNECT ${l}:${c}; opaque-tunnelling`),s=h.head}let p=e.getMitmSocketPath?.(l),m=!p&&e.parentProxy&&!fLt(e.parentProxy,l)?hLt(e.parentProxy,{isHttps:!0}):void 0,f;try{if(p)Lo(`Routing CONNECT ${l}:${c} through MITM proxy at ${p}`),f=await jWr({dial:()=>hUi.connect({path:p}),readyEvent:"connect",destHost:l,destPort:c});else if(m)f=await Pwn(m,l,c);else f=await Own(l,c)}catch(h){if(Lo(`CONNECT tunnel failed: ${h.message}`,{level:"error"}),d)o.destroy();else o.end(`HTTP/1.1 502 Bad Gateway\r
\r
`);return}if(i){f.on("error",()=>{}),f.destroy();return}if(!d)o.write(`HTTP/1.1 200 Connection Established\r
\r
`);if(s.length)f.write(s);f.pipe(o),o.pipe(f),f.on("error",(h)=>{Lo(`CONNECT tunnel failed: ${h.message}`,{level:"error"}),o.destroy()}),o.on("close",()=>f.destroy()),f.on("close",()=>o.destroy())}catch(a){Lo(`Error handling CONNECT: ${a}`,{level:"error"}),o.end(`HTTP/1.1 500 Internal Server Error\r
\r
`)}}),t.on("request",async(r,o)=>{try{if(!n(r.headers["proxy-authorization"])){o.writeHead(407,{"Proxy-Authenticate":'Basic realm="srt"'}),o.end();return}let s=new gUi.URL(r.url),i=QZ(s.hostname),a=s.port?parseInt(s.port,10):s.protocol==="https:"?443:80;if(!await e.filter(a,i,r.socket)){Lo(`HTTP request blocked to ${i}:${a}`,{level:"error"}),o.writeHead(403,{"Content-Type":"text/plain","X-Proxy-Error":"blocked-by-allowlist"}),o.end("Connection blocked by network allowlist");return}if(r.socket.destroyed)return;let c={...Vwe(r.headers),host:s.host},u=e.getMitmSocketPath?.(i),d=!u&&e.parentProxy&&!fLt(e.parentProxy,i)?hLt(e.parentProxy,{isHttps:s.protocol==="https:"}):void 0,p=`${s.protocol}//${s.host}${s.pathname}${s.search}`,m=r;if(e.filterRequest){let h=new AbortController;o.once("close",()=>h.abort());let g=await Jvn(e.filterRequest,r,o,p,h.signal);if(g===null)return;m=g}let f;if(u){Lo(`Routing HTTP ${r.method} ${i}:${a} through MITM proxy at ${u}`);let h=new Fwn.Agent({socketPath:u});f=Nwn.request({agent:h,path:p,method:r.method,headers:c},(g)=>{o.writeHead(g.statusCode,Vwe(g.headers)),g.pipe(o)})}else if(d){let h=QZ(d.hostname),g=Number(d.port)||(d.protocol==="https:"?443:80),_=YWr(d);f=(d.protocol==="https:"?XWr.request:Nwn.request)({hostname:h,port:g,path:p,method:r.method,headers:_?{...c,"proxy-authorization":_}:c},(y)=>{o.writeHead(y.statusCode,Vwe(y.headers)),y.pipe(o)})}else f=(s.protocol==="https:"?XWr.request:Nwn.request)({hostname:i,port:a,path:s.pathname+s.search,method:r.method,headers:c},(g)=>{o.writeHead(g.statusCode,Vwe(g.headers)),g.pipe(o)});f.on("error",(h)=>{if(Lo(`Proxy request failed: ${h.message}`,{level:"error"}),!o.headersSent)o.writeHead(502,{"Content-Type":"text/plain"}),o.end("Bad Gateway");else o.destroy()}),o.on("close",()=>f.destroy()),m.pipe(f)}catch(s){if(Lo(`Error handling HTTP request: ${s}`,{level:"error"}),!o.headersSent)o.writeHead(500,{"Content-Type":"text/plain"}),o.end("Internal Server Error");else o.destroy()}}),t}
function e0d(e){let t=/^\[([^\]]+)\]:(\d+)$/.exec(e)??/^([^:]+):(\d+)$/.exec(e);if(!t)return;let n=Number(t[2]);if(!Number.isInteger(n)||n<1||n>65535)return;return{hostname:t[1],port:n}}
var Fwn,Nwn,XWr,hUi,gUi;
var yUi=b(()=>{$8r();fUi();_Lt();Fwn=require("http"),Nwn=require("http"),XWr=require("https"),hUi=require("net"),gUi=require("url")});
export {_Ui,e0d,Fwn,Nwn,XWr,hUi,gUi,yUi};
