// @ts-nocheck
import {uxt} from "./m1773.ts";
import {Ja} from "./m1748.ts";
import {s$,_v} from "./m1778.ts";
import {BQ,BJe} from "./m1875.ts";
import {ProtocolMode} from "./m1734.ts";
import {cJe} from "./m1717.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
function PJs(e,t,n,r){let o=uxt.getStandardAuthorizeRequestParameters({...e.auth,authority:t,redirectUri:n.redirectUri||""},n,r);if(Ja.addLibraryInfo(o,{sku:s$.MSAL_SKU,version:BQ,cpu:"arm64",os:"darwin"}),e.auth.protocolMode!==ProtocolMode.OIDC)Ja.addApplicationTelemetry(o,e.telemetry.application);if(Ja.addResponseType(o,cJe.CODE),n.codeChallenge&&n.codeChallengeMethod)Ja.addCodeChallengeParams(o,n.codeChallenge,n.codeChallengeMethod);return Ja.addExtraQueryParameters(o,n.extraQueryParameters||{}),uxt.getAuthorizeUrl(t,o,e.auth.encodeExtraQueryParams,n.extraQueryParameters)}
var OJs=b(()=>{AT();_v();BJe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {PJs,OJs};
