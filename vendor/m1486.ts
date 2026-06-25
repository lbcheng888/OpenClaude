// @ts-nocheck
import {z_,getGatewayRefreshInFlight,setGatewayRefreshInFlight,setGatewayAuth,lt} from "../src/session/0132_sent.ts";
import {externalHttp,_k} from "../src/core/0576_isCancel.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {ql,e8} from "./m1485.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function $Ae(){let e=z_();if(!e?.idpRefreshToken||e.expiresAt-Date.now()>=A3u)return Promise.resolve();let t=getGatewayRefreshInFlight();if(t)return t;let n=R3u(e,e.idpRefreshToken).finally(()=>setGatewayRefreshInFlight(null));return setGatewayRefreshInFlight(n),n}
async function R3u(e,t){try{let{data:n}=await externalHttp.post(e.tokenEndpoint??`${e.url}/oauth/token`,new URLSearchParams({grant_type:"refresh_token",refresh_token:t}).toString(),{headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4}),r=G8s().safeParse(n);if(!r.success){logForDebugging("[gateway-refresh] malformed response; will retry later");return}if(z_()!==e){logForDebugging("[gateway-refresh] auth changed mid-refresh; discarding");return}await W8s(e,t,()=>({url:e.url,jwt:r.data.access_token,expiresAt:Date.now()+r.data.expires_in*1000,idpRefreshToken:r.data.refresh_token??e.idpRefreshToken,...e.tokenEndpoint&&{tokenEndpoint:e.tokenEndpoint}})),logForDebugging("[gateway-refresh] refreshed gateway JWT")}catch(n){if(V8s(n)==="invalid_grant"){if(z_()!==e){logForDebugging("[gateway-refresh] auth changed mid-refresh; discarding invalid_grant");return}logForDebugging("[gateway-refresh] IdP rejected refresh token; clearing it",{level:"warn"});try{await W8s(e,t,(r)=>({...r,idpRefreshToken:void 0}))}catch(r){logForDebugging(`[gateway-refresh] secureStorage write failed: ${Ce(r)}`,{level:"warn"})}}else logForDebugging(`[gateway-refresh] transient failure: ${Ce(n)}`)}}
async function W8s(e,t,n){let r=n(e);try{await ql().mutate((o)=>{let s=o?.enterpriseGateway;if(s&&s.idpRefreshToken!==t)return r=s,o;return r=n(s??e),{...o,enterpriseGateway:r}})}catch(o){logForDebugging(`[gateway-refresh] secureStorage write failed; applying refreshed credential in-memory only: ${Ce(o)}`,{level:"warn"})}if(z_()!==e){logForDebugging("[gateway-refresh] auth changed during persist; discarding outcome");return}setGatewayAuth(r)}
function V8s(e){if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return;let t=e.response?.data;if(typeof t==="object"&&t!==null&&"error"in t){let n=t.error;return typeof n==="string"?n:void 0}return}
var A3u=300000,G8s;
var xXe=b(()=>{MS();lt();_k();qe();Ct();e8();G8s=ve(()=>jt.object({access_token:jt.string(),expires_in:jt.number(),refresh_token:jt.string().nullish()}))});
export {$Ae,R3u,W8s,V8s,A3u,G8s,xXe};
