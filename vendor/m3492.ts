// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {tOn} from "./m3482.ts";
import {age} from "./m3493.ts";
import {_Aa} from "./m3490.ts";
import {yAa} from "./m3491.ts";
var SAa=X((uOn)=>{Object.defineProperty(uOn,"__esModule",{value:!0});uOn.convertLegacyHttpOptions=void 0;var _Yd=Xi(),TAa=tOn(),yYd=age(),TYd=_Aa(),SYd=yAa();function bYd(e){if(typeof e.httpAgentOptions==="function")return e.httpAgentOptions;let t=e.httpAgentOptions;if(e.keepAlive!=null)t={keepAlive:e.keepAlive,...t};if(t!=null)return(0,yYd.httpAgentFactoryFromOptions)(t);else return}function EYd(e,t,n,r){if(e.metadata)_Yd.diag.warn("Metadata cannot be set when using http");return(0,TAa.mergeOtlpNodeHttpConfigurationWithDefaults)({url:e.url,headers:(0,SYd.convertLegacyHeaders)(e),concurrencyLimit:e.concurrencyLimit,timeoutMillis:e.timeoutMillis,compression:e.compression,agentFactory:bYd(e),userAgent:e.userAgent},(0,TYd.getNodeHttpConfigurationFromEnvironment)(t,n),(0,TAa.getNodeHttpConfigurationDefaults)(r,n))}uOn.convertLegacyHttpOptions=EYd});
export {SAa};
