// @ts-nocheck
import {fT,eh} from "./m1717.ts";
import {L0r,_v} from "./m1778.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
function Z7s(e){let t=e.credentialType===fT.REFRESH_TOKEN&&e.familyId||e.clientId,n=e.tokenType&&e.tokenType.toLowerCase()!==eh.BEARER.toLowerCase()?e.tokenType.toLowerCase():"";return[e.homeAccountId,e.environment,e.credentialType,t,e.realm||"",e.target||"",e.requestedClaimsHash||"",n].join(L0r.KEY_SEPARATOR).toLowerCase()}
function eKs(e){let t=e.homeAccountId.split(".")[1];return[e.homeAccountId,e.environment,t||e.tenantId||""].join(L0r.KEY_SEPARATOR).toLowerCase()}
var tKs=b(()=>{AT();_v();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {Z7s,eKs,tKs};
