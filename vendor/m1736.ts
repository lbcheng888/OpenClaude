// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {ls,m0} from "./m1721.ts";
import {tokenParsingError,nullOrEmptyToken,maxAgeTranspired,LH} from "./m1720.ts";
var amn={};
isFullscreenWithTTY(amn,{isKmsi:()=>isKmsi,getJWSPayload:()=>getJWSPayload,extractTokenClaims:()=>extractTokenClaims,checkMaxAge:()=>checkMaxAge});
function extractTokenClaims(e,t){let n=getJWSPayload(e);try{let r=t(n);return JSON.parse(r)}catch(r){throw ls(tokenParsingError)}}
function isKmsi(e){if(!e.signin_state)return!1;let t=["kmsi","dvc_dmjd"];return e.signin_state.some((r)=>t.includes(r.trim().toLowerCase()))}
function getJWSPayload(e){if(!e)throw ls(nullOrEmptyToken);let n=/^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(e);if(!n||n.length<4)throw ls(tokenParsingError);return n[2]}
function checkMaxAge(e,t){if(t===0||Date.now()-300000>e+t)throw ls(maxAgeTranspired)}
var yJe=b(()=>{m0();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {amn,extractTokenClaims,isKmsi,getJWSPayload,checkMaxAge,yJe};
