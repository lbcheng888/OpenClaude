// @ts-nocheck
import {NIt} from "./m1778.ts";
import {La} from "./m1753.ts";
import {k2,RA} from "./m1783.ts";
import {OQ,MQe} from "./m1880.ts";
import {ProtocolMode} from "./m1739.ts";
import {aQe} from "./m1722.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
function kni(e,t,n,r){let o=NIt.getStandardAuthorizeRequestParameters({...e.auth,authority:t,redirectUri:n.redirectUri||""},n,r);if(La.addLibraryInfo(o,{sku:k2.MSAL_SKU,version:OQ,cpu:"arm64",os:"darwin"}),e.auth.protocolMode!==ProtocolMode.OIDC)La.addApplicationTelemetry(o,e.telemetry.application);if(La.addResponseType(o,aQe.CODE),n.codeChallenge&&n.codeChallengeMethod)La.addCodeChallengeParams(o,n.codeChallenge,n.codeChallengeMethod);return La.addExtraQueryParameters(o,n.extraQueryParameters||{}),NIt.getAuthorizeUrl(t,o,e.auth.encodeExtraQueryParams,n.extraQueryParameters)}
var Hni=b(()=>{iT();RA();MQe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {kni,Hni};
