// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Di,dr} from "./m231.ts";
import {getWebSocketProxyUrl,Z_} from "../src/config/1021_shouldBypassProxyWithCidr.ts";
import {koe,S7} from "../src/config/0746_bytes.ts";
import {b} from "../runtime.ts";
function vDo(e){let t=e.length,n=[],r=t;while(r>127)n.push(r&127|128),r>>>=7;n.push(r);let o=new Uint8Array(1+n.length+t);return o[0]=10,o.set(n,1),o.set(e,1+n.length),o}
function M$l(e,t=0){let n=[16,e];if(t!==0)n.push(24,t);return new Uint8Array(n)}
function EDo(e,t,n){let r=0,o=0,s=t;while(s<e.length){let i=e[s];if(r+=(i&127)*2**o,s++,(i&128)===0)return{value:r,next:s};if(o+=7,o>n)return null}return null}
function Twm(e){let t={data:e.subarray(0,0),control:O$l,version:0},n=0;while(n<e.length){let r=EDo(e,n,D$l);if(!r)return null;let o=Math.floor(r.value/8),s=r.value&7;switch(n=r.next,s){case 0:{let i=EDo(e,n,D$l);if(!i)return null;if(n=i.next,o===2)t.control=i.value;else if(o===3)t.version=i.value;break}case 1:if(n+8>e.length)return null;n+=8;break;case 2:{let i=EDo(e,n,ywm);if(!i)return null;if(n=i.next,n+i.value>e.length)return null;if(o===1)t.data=e.subarray(n,n+i.value);n+=i.value;break}case 5:if(n+4>e.length)return null;n+=4;break;default:return null}}return t}
function Swm(e,t){return{connectBuf:Buffer.alloc(0),pending:[],pendingBytes:0,wsOpen:!1,established:!1,closed:!1,connectLine:"",wsAttempt:0,paused:!1,limits:e,pool:t,finSeen:!1}}
async function N$l(e){let t="Basic "+Buffer.from(`${e.sessionId}:${e.token}`).toString("base64"),n=`Bearer ${e.token}`,r={..._wm,...e.limits},o=bwm(e.wsUrl,t,n,r);return logForDebugging(`[agent-proxy] relay listening on 127.0.0.1:${o.port}`),o}
function bwm(e,t,n,r){let o=[],s=Bun.listen({hostname:"127.0.0.1",port:0,socket:{open(i){i.data={...Swm(r,o),writeBuf:[],endAfterDrain:!1,destroyAfterDrain:!1}},data(i,a){let l=i.data;if(l.closed)return;Ewm({write:(u)=>{let d=typeof u==="string"?Buffer.from(u,"utf8"):u;if(l.writeBuf.length>0){l.writeBuf.push(d);return}let p=i.write(d);if(p<d.length)l.writeBuf.push(d.subarray(p))},end:()=>{if(l.writeBuf.length>0){l.endAfterDrain=!0;return}i.end()},destroy:()=>{if(l.writeBuf.length>0){l.destroyAfterDrain=!0;return}i.terminate()}},l,a,e,t,n)},drain(i){let a=i.data;while(a.writeBuf.length>0){let l=a.writeBuf[0],c=i.write(l);if(c<l.length){a.writeBuf[0]=l.subarray(c);return}a.writeBuf.shift()}if(a.destroyAfterDrain){a.destroyAfterDrain=!1,i.terminate();return}if(a.endAfterDrain)a.endAfterDrain=!1,i.end()},close(i){let a=i.data;if(F$l(a))return;NPe(a)},error(i,a){logForDebugging(`[agent-proxy] client socket error: ${a.message}`),NPe(i.data)}}});return{port:s.port,stop:()=>{xwm(o),s.stop(!0)}}}
function Ewm(e,t,n,r,o,s){if(!t.ws){t.connectBuf=Buffer.concat([t.connectBuf,n]);let i=t.connectBuf.indexOf(`\r
\r
`);if(i===-1){if(t.connectBuf.length>8192)e.write(`HTTP/1.1 400 Bad Request\r
\r
`),e.end(),Oe("agent_proxy_request","agent_proxy_request_header_too_long");return}let a=t.connectBuf.subarray(0,i).toString("utf8"),l=Di(a,`\r
`);if(!l.match(/^CONNECT\s+(\S+)\s+HTTP\/1\.[01]$/i)){e.write(`HTTP/1.1 405 Method Not Allowed\r
\r
`),e.end(),Oe("agent_proxy_request","agent_proxy_request_not_connect");return}let u=t.connectBuf.subarray(i+4);if(u.length>0)P$l(e,t,Buffer.from(u));t.connectBuf=Buffer.alloc(0),vwm(e,t,l,r,o,s);return}if(!t.wsOpen||t.paused){P$l(e,t,Buffer.from(n));return}t.redialEligible=!1,wDo(t.ws,n),B$l(t)}
function P$l(e,t,n){if(t.pending.push(n),t.pendingBytes+=n.length,t.pendingBytes>t.limits.pendingBytesCap){if(logForDebugging(`[agent-proxy] pending buffer cap (${t.limits.pendingBytesCap}) exceeded; aborting request`,{level:"warn"}),Oe("agent_proxy_request","agent_proxy_request_pending_overflow"),t.closed=!0,!t.established)e.write(`HTTP/1.1 502 Bad Gateway\r
\r
`),e.end();else if(t.wsMeta?.v2)e.destroy();else e.end();NPe(t)}}
function B$l(e){if(e.paused||!e.ws)return;if(e.ws.bufferedAmount>e.limits.sendHighWater)e.paused=!0,e.drainTimer=setInterval(Cwm,e.limits.drainPollMs,e)}
function Cwm(e){let t=e.ws;if(!t||t.readyState!==WebSocket.OPEN||e.closed){EAt(e);return}if(t.bufferedAmount>e.limits.sendLowWater)return;while(e.pending.length>0&&t.bufferedAmount<=e.limits.sendHighWater){let n=e.pending.shift();e.pendingBytes-=n.length,e.redialEligible=!1,wDo(t,n)}if(e.pending.length===0)e.paused=!1,EAt(e)}
function EAt(e){if(e.drainTimer)clearInterval(e.drainTimer),e.drainTimer=void 0}
function vwm(e,t,n,r,o,s){t.connectLine=n;let i=wwm(t);if(i){t.ws=i.ws,t.wsOpen=!0,t.pinger=i.pinger,t.wsMeta=i.meta;let a=t.pending.slice();t.redialEligible=!0;let l=!1,c=(u)=>{if(l||t.closed)return;if(l=!0,t.redialEligible=!1,logForDebugging(`[agent-proxy] pooled ws failed before response (${u}); falling through to fresh dial`),t.openTimer)clearTimeout(t.openTimer),t.openTimer=void 0;if(t.pooledDeadline=void 0,t.pinger)clearInterval(t.pinger),t.pinger=void 0;i.ws.onopen=i.ws.onmessage=i.ws.onerror=i.ws.onclose=null;try{i.ws.close()}catch{}t.ws=void 0,t.wsOpen=!1,t.wsMeta=void 0,EAt(t),t.paused=!1,t.pending=[...a,...t.pending],t.pendingBytes=t.pending.reduce((d,p)=>d+p.length,0),CDo(e,t,r,o,s)};t.pooledDeadline=()=>{if(t.openTimer=void 0,t.closed||t.established)return;if(t.redialEligible){c("pooled ws unresponsive");return}t.closed=!0,Oe("agent_proxy_request","agent_proxy_request_ws_error"),e.write(`HTTP/1.1 502 Bad Gateway\r
\r
`),e.end(),NPe(t)},t.openTimer=setTimeout(Pwm,t.limits.openTimeoutMs,t),U$l(e,t,i.ws,c),$$l(t,i.ws,o);return}CDo(e,t,r,o,s)}
function wwm(e){let{pool:t,limits:n}=e;while(t.length>0){let r=t.pop();if(r.ws.readyState!==WebSocket.OPEN){clearInterval(r.pinger);continue}if(Date.now()-r.idleSince>n.poolIdleTtlMs||Date.now()-r.meta.openedAt>n.poolMaxAgeMs){clearInterval(r.pinger);try{r.ws.close()}catch{}continue}return r}return}
function F$l(e){let{ws:t,wsMeta:n}=e;if(!t||!n?.v2||!e.finSeen||t.readyState!==WebSocket.OPEN||!e.established||e.closed||!e.pinger||e.pool.length>=e.limits.poolMax||Date.now()-n.openedAt>e.limits.poolMaxAgeMs)return!1;EAt(e),t.onmessage=null,t.onerror=null;let r=e.pool;return t.onclose=()=>Rwm(r,t),r.push({ws:t,pinger:e.pinger,idleSince:Date.now(),meta:n}),e.ws=void 0,e.pinger=void 0,e.wsMeta=void 0,!0}
function Rwm(e,t){let n=e.findIndex((r)=>r.ws===t);if(n>=0)clearInterval(e[n].pinger),e.splice(n,1)}
function xwm(e){for(let t of e){clearInterval(t.pinger),t.ws.onclose=null;try{t.ws.close()}catch{}}e.length=0}
function U$l(e,t,n,r){n.onmessage=(o)=>{let s=o.data instanceof ArrayBuffer?new Uint8Array(o.data):new Uint8Array(Buffer.from(o.data)),i=Twm(s);if(!i)return;if(i.control!==O$l){kwm(e,t,n,i);return}if(i.data.length>0){if(!t.established){if(t.established=!0,t.redialEligible=!1,t.pooledDeadline){if(t.openTimer)clearTimeout(t.openTimer),t.openTimer=void 0;t.pooledDeadline=void 0}Ie("agent_proxy_request")}e.write(i.data)}},n.onerror=(o)=>{let s="message"in o?String(o.message):"websocket error";if(logForDebugging(`[agent-proxy] ws error: ${s}`),t.closed)return;if(r&&t.redialEligible&&!t.established){r(`ws error: ${s}`);return}if(t.closed=!0,!t.established)Oe("agent_proxy_request","agent_proxy_request_ws_error"),e.write(`HTTP/1.1 502 Bad Gateway\r
\r
`),e.end();else if(t.wsMeta?.v2)e.destroy();else e.end();NPe(t)},n.onclose=()=>{if(t.closed)return;if(r&&t.redialEligible&&!t.established){r("closed before response");return}if(t.closed=!0,!t.established)Oe("agent_proxy_request","agent_proxy_request_ws_error"),e.write(`HTTP/1.1 502 Bad Gateway\r
\r
`),e.end();else if(t.wsMeta?.v2)e.destroy();else e.end();NPe(t)}}
function kwm(e,t,n,r){if(r.control===Awm){if(t.wsMeta&&r.version===L$l)t.wsMeta.v2=!0,logForDebugging("[agent-proxy] tunnel protocol v2 negotiated");return}if(!t.wsMeta?.v2)return;if(r.control===hwm){Hwm(e,t,n);return}}
function Hwm(e,t,n){if(t.closed||t.finSeen)return;if(t.finSeen=!0,e.end(),EAt(t),t.openTimer)clearTimeout(t.openTimer),t.openTimer=void 0;t.pooledDeadline=void 0,t.paused=!1,t.pending=[],t.pendingBytes=0,n.send(M$l(gwm));let r=F$l(t);if(t.closed=!0,!r)NPe(t)}
function $$l(e,t,n){let r=`${e.connectLine}\r
Proxy-Authorization: ${n}\r
\r
`;t.send(vDo(Buffer.from(r,"utf8")));for(let o of e.pending)wDo(t,o);e.pending=[],e.pendingBytes=0,B$l(e)}
function CDo(e,t,n,r,o){let s={"Content-Type":"application/proto",Authorization:o},i=new globalThis.WebSocket(n,{headers:s,proxy:getWebSocketProxyUrl(n),tls:koe()||void 0});i.binaryType="arraybuffer",t.ws=i,t.wsOpen=!1,t.wsMeta=void 0;let a=()=>{i.onopen=i.onmessage=i.onerror=i.onclose=null;try{i.close()}catch{}},l=(c)=>{if(t.closed)return;if(t.openTimer)clearTimeout(t.openTimer),t.openTimer=void 0;if(a(),t.wsAttempt++,t.wsAttempt<t.limits.openMaxAttempts){let u=t.limits.openBackoffBaseMs*2**(t.wsAttempt-1);logForDebugging(`[agent-proxy] ws open failed (${c}); retry ${t.wsAttempt}/${t.limits.openMaxAttempts-1} in ${u}ms`),t.openTimer=setTimeout(CDo,u,e,t,n,r,o);return}logForDebugging(`[agent-proxy] ws open failed (${c}); attempts exhausted`),t.closed=!0,Oe("agent_proxy_request","agent_proxy_request_ws_error"),e.write(`HTTP/1.1 502 Bad Gateway\r
\r
`),e.end(),NPe(t)};t.failOrRetry=l,t.openTimer=setTimeout(Dwm,t.limits.openTimeoutMs,t),i.onopen=()=>{if(t.closed)return;if(t.openTimer)clearTimeout(t.openTimer),t.openTimer=void 0;t.failOrRetry=void 0,t.wsOpen=!0,t.wsMeta={v2:!1,openedAt:Date.now()},U$l(e,t,i),i.send(M$l(fwm,L$l)),$$l(t,i,r),t.pinger=setInterval(Iwm,mwm,i)},i.onerror=(c)=>{let u="message"in c?String(c.message):"websocket error";logForDebugging(`[agent-proxy] ws error: ${u}`),l(u)},i.onclose=()=>l("closed before open")}
function Iwm(e){if(e.readyState===WebSocket.OPEN)e.send(vDo(new Uint8Array(0)))}
function Dwm(e){if(e.ws&&e.ws.readyState===WebSocket.CONNECTING)logForDebugging("[agent-proxy] ws open timeout"),e.failOrRetry?.("handshake timeout")}
function Pwm(e){e.pooledDeadline?.()}
function wDo(e,t){if(e.readyState!==WebSocket.OPEN)return;for(let n=0;n<t.length;n+=I$l){let r=t.subarray(n,n+I$l);e.send(vDo(r))}}
function NPe(e){if(!e)return;if(e.closed=!0,e.pinger)clearInterval(e.pinger);if(e.openTimer)clearTimeout(e.openTimer),e.openTimer=void 0;if(EAt(e),e.pending=[],e.pendingBytes=0,e.failOrRetry=void 0,e.redialEligible=!1,e.pooledDeadline=void 0,e.ws&&e.ws.readyState<=WebSocket.OPEN)try{e.ws.close()}catch{}e.ws=void 0}
var I$l=524288,mwm=30000,O$l=0,fwm=1,Awm=2,hwm=3,gwm=4,L$l=2,_wm,ywm=28,D$l=63;
var q$l=b(()=>{ln();qe();S7();Z_();dr();_wm={openTimeoutMs:1e4,openMaxAttempts:3,openBackoffBaseMs:100,sendHighWater:4194304,sendLowWater:1048576,drainPollMs:50,pendingBytesCap:33554432,poolMax:4,poolIdleTtlMs:1e4,poolMaxAgeMs:2700000}});
export {vDo,M$l,EDo,Twm,Swm,N$l,bwm,Ewm,P$l,B$l,Cwm,EAt,vwm,wwm,F$l,Rwm,xwm,U$l,kwm,Hwm,$$l,CDo,Iwm,Dwm,Pwm,wDo,NPe,I$l,mwm,O$l,fwm,Awm,hwm,gwm,L$l,_wm,ywm,D$l,q$l};
