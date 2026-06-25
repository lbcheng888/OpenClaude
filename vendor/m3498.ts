// @ts-nocheck
import {Q} from "../runtime.ts";
import {fEa} from "./m3497.ts";
var jMn=Q((LIe)=>{Object.defineProperty(LIe,"__esModule",{value:!0});LIe.getNodeHttpConfigurationDefaults=LIe.mergeOtlpNodeHttpConfigurationWithDefaults=LIe.httpAgentFactoryFromOptions=void 0;var hEa=fEa();function gEa(e){return async(t)=>{let n=t==="http:",r=n?import("http"):import("https"),{Agent:o}=await r;if(n){let{ca:s,cert:i,key:a,...l}=e;return new o(l)}return new o(e)}}LIe.httpAgentFactoryFromOptions=gEa;function gsp(e,t,n){return{...(0,hEa.mergeOtlpHttpConfigurationWithDefaults)(e,t,n),agentFactory:e.agentFactory??t.agentFactory??n.agentFactory,userAgent:e.userAgent}}LIe.mergeOtlpNodeHttpConfigurationWithDefaults=gsp;function _sp(e,t){return{...(0,hEa.getHttpConfigurationDefaults)(e,t),agentFactory:gEa({keepAlive:!0})}}LIe.getNodeHttpConfigurationDefaults=_sp});
export {jMn};
