// @ts-nocheck
import {X} from "../runtime.ts";
import {Zfa} from "./m3481.ts";
var tOn=X((zke)=>{Object.defineProperty(zke,"__esModule",{value:!0});zke.getNodeHttpConfigurationDefaults=zke.mergeOtlpNodeHttpConfigurationWithDefaults=zke.httpAgentFactoryFromOptions=void 0;var eAa=Zfa();function tAa(e){return async(t)=>{let n=t==="http:",r=n?import("http"):import("https"),{Agent:o}=await r;if(n){let{ca:s,cert:i,key:a,...l}=e;return new o(l)}return new o(e)}}zke.httpAgentFactoryFromOptions=tAa;function kzd(e,t,n){return{...(0,eAa.mergeOtlpHttpConfigurationWithDefaults)(e,t,n),agentFactory:e.agentFactory??t.agentFactory??n.agentFactory,userAgent:e.userAgent}}zke.mergeOtlpNodeHttpConfigurationWithDefaults=kzd;function Hzd(e,t){return{...(0,eAa.getHttpConfigurationDefaults)(e,t),agentFactory:tAa({keepAlive:!0})}}zke.getNodeHttpConfigurationDefaults=Hzd});
export {tOn};
