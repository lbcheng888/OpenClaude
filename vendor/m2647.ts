// @ts-nocheck
import {Jo,iCn,c4r} from "./m2601.ts";
import {OOi,LOi,MOi} from "./m2646.ts";
import {MDt,NDt,hqr,jCn,WCn,tee,lRe,gqr,FDt} from "./m2645.ts";
import {b} from "../runtime.ts";
function FOi(e){let t=zCn.createServer();return t.on("connect",async(n,r,o)=>{r.on("error",(i)=>{Jo(`Client socket error: ${i.message}`,{level:"error"})});let s=!1;r.once("close",()=>{s=!0});try{let i=kTd(n.url);if(!i){Jo(`Invalid CONNECT request: ${n.url}`,{level:"error"}),r.end(`HTTP/1.1 400 Bad Request\r
\r
`);return}let{hostname:a,port:l}=i;if(!await e.filter(l,a,r)){Jo(`Connection blocked to ${a}:${l}`,{level:"error"}),r.end(`HTTP/1.1 403 Forbidden\r
Content-Type: text/plain\r
X-Proxy-Error: blocked-by-allowlist\r
\r
Connection blocked by network allowlist`);return}let u=!1;if(e.mitmCA){if(s)return;r.write(`HTTP/1.1 200 Connection Established\r
\r
`),u=!0;let f=await OOi(r,o);if(s)return;if(f.isTLS){LOi(e.mitmCA,e.filterRequest,r,f.head,{hostname:a,port:l,upstreamCA:e.tlsTerminateUpstreamCA});return}Jo(`[tls-terminate] non-TLS bytes on CONNECT ${a}:${l}; opaque-tunnelling`),o=f.head}let d=e.getMitmSocketPath?.(a),p=!d&&e.parentProxy&&!MDt(e.parentProxy,a)?NDt(e.parentProxy,{isHttps:!0}):void 0,m;try{if(d)Jo(`Routing CONNECT ${a}:${l} through MITM proxy at ${d}`),m=await hqr({dial:()=>NOi.connect({path:d}),readyEvent:"connect",destHost:a,destPort:l});else if(p)m=await jCn(p,a,l);else m=await WCn(a,l)}catch(f){if(Jo(`CONNECT tunnel failed: ${f.message}`,{level:"error"}),u)r.destroy();else r.end(`HTTP/1.1 502 Bad Gateway\r
\r
`);return}if(s){m.on("error",()=>{}),m.destroy();return}if(!u)r.write(`HTTP/1.1 200 Connection Established\r
\r
`);if(o.length)m.write(o);m.pipe(r),r.pipe(m),m.on("error",(f)=>{Jo(`CONNECT tunnel failed: ${f.message}`,{level:"error"}),r.destroy()}),r.on("close",()=>m.destroy()),m.on("close",()=>r.destroy())}catch(i){Jo(`Error handling CONNECT: ${i}`,{level:"error"}),r.end(`HTTP/1.1 500 Internal Server Error\r
\r
`)}}),t.on("request",async(n,r)=>{try{let o=new BOi.URL(n.url),s=tee(o.hostname),i=o.port?parseInt(o.port,10):o.protocol==="https:"?443:80;if(!await e.filter(i,s,n.socket)){Jo(`HTTP request blocked to ${s}:${i}`,{level:"error"}),r.writeHead(403,{"Content-Type":"text/plain","X-Proxy-Error":"blocked-by-allowlist"}),r.end("Connection blocked by network allowlist");return}if(n.socket.destroyed)return;let l={...lRe(n.headers),host:o.host},c=e.getMitmSocketPath?.(s),u=!c&&e.parentProxy&&!MDt(e.parentProxy,s)?NDt(e.parentProxy,{isHttps:o.protocol==="https:"}):void 0,d=`${o.protocol}//${o.host}${o.pathname}${o.search}`,p=n;if(e.filterRequest){let f=new AbortController;r.once("close",()=>f.abort());let A=await iCn(e.filterRequest,n,r,d,f.signal);if(A===null)return;p=A}let m;if(c){Jo(`Routing HTTP ${n.method} ${s}:${i} through MITM proxy at ${c}`);let f=new zCn.Agent({socketPath:c});m=KCn.request({agent:f,path:d,method:n.method,headers:l},(A)=>{r.writeHead(A.statusCode,lRe(A.headers)),A.pipe(r)})}else if(u){let f=tee(u.hostname),A=Number(u.port)||(u.protocol==="https:"?443:80),h=gqr(u);m=(u.protocol==="https:"?yqr.request:KCn.request)({hostname:f,port:A,path:d,method:n.method,headers:h?{...l,"proxy-authorization":h}:l},(_)=>{r.writeHead(_.statusCode,lRe(_.headers)),_.pipe(r)})}else m=(o.protocol==="https:"?yqr.request:KCn.request)({hostname:s,port:i,path:o.pathname+o.search,method:n.method,headers:l},(A)=>{r.writeHead(A.statusCode,lRe(A.headers)),A.pipe(r)});m.on("error",(f)=>{if(Jo(`Proxy request failed: ${f.message}`,{level:"error"}),!r.headersSent)r.writeHead(502,{"Content-Type":"text/plain"}),r.end("Bad Gateway");else r.destroy()}),r.on("close",()=>m.destroy()),p.pipe(m)}catch(o){if(Jo(`Error handling HTTP request: ${o}`,{level:"error"}),!r.headersSent)r.writeHead(500,{"Content-Type":"text/plain"}),r.end("Internal Server Error");else r.destroy()}}),t}
function kTd(e){let t=/^\[([^\]]+)\]:(\d+)$/.exec(e)??/^([^:]+):(\d+)$/.exec(e);if(!t)return;let n=Number(t[2]);if(!Number.isInteger(n)||n<1||n>65535)return;return{hostname:t[1],port:n}}
var zCn,KCn,yqr,NOi,BOi;
var UOi=b(()=>{c4r();MOi();FDt();zCn=require("http"),KCn=require("http"),yqr=require("https"),NOi=require("net"),BOi=require("url")});
export {FOi,kTd,zCn,KCn,yqr,NOi,BOi,UOi};
