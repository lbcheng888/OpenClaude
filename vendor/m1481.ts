// @ts-nocheck
import {getGatewayAuth,getGatewayRefreshInFlight,setGatewayRefreshInFlight,setGatewayAuth,lt} from "../src/session/0131_sent.ts";
import {externalHttp,ek} from "../src/core/0570_isCancel.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {dc,U8} from "./m1480.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
function oCe(){let e=getGatewayAuth();if(!e?.idpRefreshToken||e.expiresAt-Date.now()>=sLu)return Promise.resolve();let t=getGatewayRefreshInFlight();if(t)return t;let n=iLu(e,e.idpRefreshToken).finally(()=>setGatewayRefreshInFlight(null));return setGatewayRefreshInFlight(n),n}
async function iLu(e,t){try{let{data:n}=await externalHttp.post(e.tokenEndpoint??`${e.url}/oauth/token`,new URLSearchParams({grant_type:"refresh_token",refresh_token:t}).toString(),{headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4}),r=Y9s().safeParse(n);if(!r.success){logForDebugging("[gateway-refresh] malformed response; will retry later");return}if(getGatewayAuth()!==e){logForDebugging("[gateway-refresh] auth changed mid-refresh; discarding");return}await z9s(e,t,()=>({url:e.url,jwt:r.data.access_token,expiresAt:Date.now()+r.data.expires_in*1000,idpRefreshToken:r.data.refresh_token??e.idpRefreshToken,...e.tokenEndpoint&&{tokenEndpoint:e.tokenEndpoint}})),logForDebugging("[gateway-refresh] refreshed gateway JWT")}catch(n){if(J9s(n)==="invalid_grant"){if(getGatewayAuth()!==e){logForDebugging("[gateway-refresh] auth changed mid-refresh; discarding invalid_grant");return}logForDebugging("[gateway-refresh] IdP rejected refresh token; clearing it",{level:"warn"});try{await z9s(e,t,(r)=>({...r,idpRefreshToken:void 0}))}catch(r){logForDebugging(`[gateway-refresh] secureStorage write failed: ${Se(r)}`,{level:"warn"})}}else logForDebugging(`[gateway-refresh] transient failure: ${Se(n)}`)}}
async function z9s(e,t,n){let r=n(e);try{await dc().mutate((o)=>{let s=o?.enterpriseGateway;if(s&&s.idpRefreshToken!==t)return r=s,o;return r=n(s??e),{...o,enterpriseGateway:r}})}catch(o){logForDebugging(`[gateway-refresh] secureStorage write failed; applying refreshed credential in-memory only: ${Se(o)}`,{level:"warn"})}if(getGatewayAuth()!==e){logForDebugging("[gateway-refresh] auth changed during persist; discarding outcome");return}setGatewayAuth(r)}
function J9s(e){if(!e||typeof e!=="object"||!("isAxiosError"in e)||!e.isAxiosError)return;let t=e.response?.data;if(typeof t==="object"&&t!==null&&"error"in t){let n=t.error;return typeof n==="string"?n:void 0}return}
var sLu=300000,Y9s;
var PYe=b(()=>{iv();lt();ek();qe();bt();U8();Y9s=we(()=>hn.object({access_token:hn.string(),expires_in:hn.number(),refresh_token:hn.string().nullish()}))});
export {oCe,iLu,z9s,J9s,sLu,Y9s,PYe};
