// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {jMn} from "./m3498.ts";
import {b_e} from "./m3509.ts";
import {PEa} from "./m3506.ts";
import {OEa} from "./m3507.ts";
var MEa=Q((r1n)=>{Object.defineProperty(r1n,"__esModule",{value:!0});r1n.convertLegacyHttpOptions=void 0;var sip=xi(),LEa=jMn(),iip=b_e(),aip=PEa(),lip=OEa();function cip(e){if(typeof e.httpAgentOptions==="function")return e.httpAgentOptions;let t=e.httpAgentOptions;if(e.keepAlive!=null)t={keepAlive:e.keepAlive,...t};if(t!=null)return(0,iip.httpAgentFactoryFromOptions)(t);else return}function uip(e,t,n,r){if(e.metadata)sip.diag.warn("Metadata cannot be set when using http");return(0,LEa.mergeOtlpNodeHttpConfigurationWithDefaults)({url:e.url,headers:(0,lip.convertLegacyHeaders)(e),concurrencyLimit:e.concurrencyLimit,timeoutMillis:e.timeoutMillis,compression:e.compression,agentFactory:cip(e),userAgent:e.userAgent},(0,aip.getNodeHttpConfigurationFromEnvironment)(t,n),(0,LEa.getNodeHttpConfigurationDefaults)(r,n))}r1n.convertLegacyHttpOptions=uip});
export {MEa};
