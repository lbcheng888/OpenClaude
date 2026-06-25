// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {jo,x0} from "./m1726.ts";
import {tokenParsingError,nullOrEmptyToken,maxAgeTranspired,uI} from "./m1725.ts";
var Whn={};
ft(Whn,{isKmsi:()=>isKmsi,getJWSPayload:()=>getJWSPayload,extractTokenClaims:()=>extractTokenClaims,checkMaxAge:()=>checkMaxAge});
function extractTokenClaims(e,t){let n=getJWSPayload(e);try{let r=t(n);return JSON.parse(r)}catch(r){throw jo(tokenParsingError)}}
function isKmsi(e){if(!e.signin_state)return!1;let t=["kmsi","dvc_dmjd"];return e.signin_state.some((r)=>t.includes(r.trim().toLowerCase()))}
function getJWSPayload(e){if(!e)throw jo(nullOrEmptyToken);let n=/^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(e);if(!n||n.length<4)throw jo(tokenParsingError);return n[2]}
function checkMaxAge(e,t){if(t===0||Date.now()-300000>e+t)throw jo(maxAgeTranspired)}
var _Qe=b(()=>{x0();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Whn,extractTokenClaims,isKmsi,getJWSPayload,checkMaxAge,_Qe};
