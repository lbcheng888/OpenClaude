// @ts-nocheck
import {wQ,ahn} from "./m1648.ts";
import {b,x} from "../runtime.ts";
import {hvt} from "./m748.ts";
import {aYs} from "./m1664.ts";
function fhn(e){if(process.env[e])return process.env[e];else if(process.env[e.toLowerCase()])return process.env[e.toLowerCase()];return}
function w6u(){if(!process)return;let e=fhn(E6u),t=fhn(A6u),n=fhn(C6u);return e||t||n}
function k6u(e,t,n){if(t.length===0)return!1;let r=new URL(e).hostname;if(n===null||n===void 0?void 0:n.has(r))return n.get(r);let o=!1;for(let s of t)if(s[0]==="."){if(r.endsWith(s))o=!0;else if(r.length===s.length-1&&r===s.slice(1))o=!0}else if(r===s)o=!0;return n===null||n===void 0||n.set(r,o),o}
function H6u(){let e=fhn(R6u);if(mYs=!0,e)return e.split(",").map((t)=>t.trim()).filter((t)=>t.length);return[]}
function I6u(){let e=w6u();return e?new URL(e):void 0}
function cYs(e){let t;try{t=new URL(e.host)}catch(n){throw Error(`Expecting a valid host string in proxy settings, but found "${e.host}".`)}if(t.port=String(e.port),e.username)t.username=e.username;if(e.password)t.password=e.password;return t}
function uYs(e,t,n){if(e.agent)return;let o=new URL(e.url).protocol!=="https:";if(e.tlsSettings)wQ.warning("TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.");let s=e.headers.toJSON();if(o){if(!t.httpProxyAgent)t.httpProxyAgent=new pYs.HttpProxyAgent(n,{headers:s});e.agent=t.httpProxyAgent}else{if(!t.httpsProxyAgent)t.httpsProxyAgent=new dYs.HttpsProxyAgent(n,{headers:s});e.agent=t.httpsProxyAgent}}
function hOr(e,t){if(!mYs)lYs.push(...H6u());let n=e?cYs(e):I6u(),r={};return{name:fOr,async sendRequest(o,s){var i;if(!o.proxySettings&&n&&!k6u(o.url,(i=t===null||t===void 0?void 0:t.customNoProxyList)!==null&&i!==void 0?i:lYs,(t===null||t===void 0?void 0:t.customNoProxyList)?void 0:v6u))uYs(o,r,n);else if(o.proxySettings)uYs(o,r,cYs(o.proxySettings));return s(o)}}}
var dYs,pYs,E6u="HTTPS_PROXY",C6u="HTTP_PROXY",A6u="ALL_PROXY",R6u="NO_PROXY",fOr="proxyPolicy",lYs,mYs=!1,v6u;
var fYs=b(()=>{ahn();dYs=x(hvt(),1),pYs=x(aYs(),1),lYs=[],v6u=new Map});
export {fhn,w6u,k6u,H6u,I6u,cYs,uYs,hOr,dYs,pYs,E6u,C6u,A6u,R6u,fOr,lYs,mYs,v6u,fYs};
