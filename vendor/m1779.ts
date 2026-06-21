// @ts-nocheck
import {b} from "../runtime.ts";
class dxt{static getNetworkResponse(e,t,n){return{headers:e,body:t,status:n}}static urlToHttpOptions(e){let t={protocol:e.protocol,hostname:e.hostname&&e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:`${e.pathname||""}${e.search||""}`,href:e.href};if(e.port!=="")t.port=Number(e.port);if(e.username||e.password)t.auth=`${decodeURIComponent(e.username)}:${decodeURIComponent(e.password)}`;return t}}
var C7s=b(()=>{/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {dxt,C7s};
