// @ts-nocheck
import {b} from "../runtime.ts";
function vXs(e,t){return!!e&&!!t&&e===t.split(".")[1]}
function uIt(e,t,n,r){if(r){let{oid:o,sub:s,tid:i,name:a,tfp:l,acr:c,preferred_username:u,upn:d,login_hint:p}=r,m=i||l||c||"";return{tenantId:m,localAccountId:o||s||"",name:a,username:u||d||"",loginHint:p,isHomeTenant:vXs(m,e)}}else return{tenantId:n,localAccountId:t,username:"",isHomeTenant:vXs(n,e)}}
function Bhn(e,t,n,r){let o=e;if(t){let{isHomeTenant:s,...i}=t;o={...e,...i}}if(n){let{isHomeTenant:s,...i}=uIt(e.homeAccountId,e.localAccountId,e.tenantId,n);return o={...o,...i,idTokenClaims:n,idToken:r},o}return o}
var Uhn=b(()=>{/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {vXs,uIt,Bhn,Uhn};
