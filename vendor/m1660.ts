// @ts-nocheck
import {IQ,vpn} from "./m1643.ts";
import {b,M} from "../runtime.ts";
import {qEt} from "./m743.ts";
import {pWs} from "./m1659.ts";
function Dpn(e){if(process.env[e])return process.env[e];else if(process.env[e.toLowerCase()])return process.env[e.toLowerCase()];return}
function lNu(){if(!process)return;let e=Dpn(rNu),t=Dpn(sNu),n=Dpn(oNu);return e||t||n}
function cNu(e,t,n){if(t.length===0)return!1;let r=new URL(e).hostname;if(n===null||n===void 0?void 0:n.has(r))return n.get(r);let o=!1;for(let s of t)if(s[0]==="."){if(r.endsWith(s))o=!0;else if(r.length===s.length-1&&r===s.slice(1))o=!0}else if(r===s)o=!0;return n===null||n===void 0||n.set(r,o),o}
function uNu(){let e=Dpn(iNu);if(_Ws=!0,e)return e.split(",").map((t)=>t.trim()).filter((t)=>t.length);return[]}
function dNu(){let e=lNu();return e?new URL(e):void 0}
function fWs(e){let t;try{t=new URL(e.host)}catch(n){throw Error(`Expecting a valid host string in proxy settings, but found "${e.host}".`)}if(t.port=String(e.port),e.username)t.username=e.username;if(e.password)t.password=e.password;return t}
function AWs(e,t,n){if(e.agent)return;let o=new URL(e.url).protocol!=="https:";if(e.tlsSettings)IQ.warning("TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.");let s=e.headers.toJSON();if(o){if(!t.httpProxyAgent)t.httpProxyAgent=new gWs.HttpProxyAgent(n,{headers:s});e.agent=t.httpProxyAgent}else{if(!t.httpsProxyAgent)t.httpsProxyAgent=new hWs.HttpsProxyAgent(n,{headers:s});e.agent=t.httpsProxyAgent}}
function FHr(e,t){if(!_Ws)mWs.push(...uNu());let n=e?fWs(e):dNu(),r={};return{name:BHr,async sendRequest(o,s){var i;if(!o.proxySettings&&n&&!cNu(o.url,(i=t===null||t===void 0?void 0:t.customNoProxyList)!==null&&i!==void 0?i:mWs,(t===null||t===void 0?void 0:t.customNoProxyList)?void 0:aNu))AWs(o,r,n);else if(o.proxySettings)AWs(o,r,fWs(o.proxySettings));return s(o)}}}
var hWs,gWs,rNu="HTTPS_PROXY",oNu="HTTP_PROXY",sNu="ALL_PROXY",iNu="NO_PROXY",BHr="proxyPolicy",mWs,_Ws=!1,aNu;
var yWs=b(()=>{vpn();hWs=M(qEt(),1),gWs=M(pWs(),1),mWs=[],aNu=new Map});
export {Dpn,lNu,cNu,uNu,dNu,fWs,AWs,FHr,hWs,gWs,rNu,oNu,sNu,iNu,BHr,mWs,_Ws,aNu,yWs};
