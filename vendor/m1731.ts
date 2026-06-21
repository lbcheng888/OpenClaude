// @ts-nocheck
import {b} from "../runtime.ts";
function IVs(e,t){return!!e&&!!t&&e===t.split(".")[1]}
function NRt(e,t,n,r){if(r){let{oid:o,sub:s,tid:i,name:a,tfp:l,acr:c,preferred_username:u,upn:d,login_hint:p}=r,m=i||l||c||"";return{tenantId:m,localAccountId:o||s||"",name:a,username:u||d||"",loginHint:p,isHomeTenant:IVs(m,e)}}else return{tenantId:n,localAccountId:t,username:"",isHomeTenant:IVs(n,e)}}
function rmn(e,t,n,r){let o=e;if(t){let{isHomeTenant:s,...i}=t;o={...e,...i}}if(n){let{isHomeTenant:s,...i}=NRt(e.homeAccountId,e.localAccountId,e.tenantId,n);return o={...o,...i,idTokenClaims:n,idToken:r},o}return o}
var omn=b(()=>{/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {IVs,NRt,rmn,omn};
