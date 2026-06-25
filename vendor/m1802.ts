// @ts-nocheck
import {sT,Qf} from "./m1722.ts";
import {dMr,RA} from "./m1783.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
function jQs(e){let t=e.credentialType===sT.REFRESH_TOKEN&&e.familyId||e.clientId,n=e.tokenType&&e.tokenType.toLowerCase()!==Qf.BEARER.toLowerCase()?e.tokenType.toLowerCase():"";return[e.homeAccountId,e.environment,e.credentialType,t,e.realm||"",e.target||"",e.requestedClaimsHash||"",n].join(dMr.KEY_SEPARATOR).toLowerCase()}
function YQs(e){let t=e.homeAccountId.split(".")[1];return[e.homeAccountId,e.environment,t||e.tenantId||""].join(dMr.KEY_SEPARATOR).toLowerCase()}
var JQs=b(()=>{iT();RA();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {jQs,YQs,JQs};
