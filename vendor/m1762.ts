// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {no,IQ} from "./m1748.ts";
import {pD,ogn,sgn} from "./m1761.ts";
import {Lh,ofe} from "./m1757.ts";
import {jo,x0} from "./m1726.ts";
import {endpointResolutionError,uI} from "./m1725.ts";
var ign={};
ft(ign,{createDiscoveredInstance:()=>createDiscoveredInstance});
async function createDiscoveredInstance(e,t,n,r,o,s,i){i?.addQueueMeasurement(no.AuthorityFactoryCreateDiscoveredInstance,s);let a=pD.transformCIAMAuthority(ogn(e)),l=new pD(a,t,n,r,o,s,i);try{return await Lh(l.resolveEndpointsAsync.bind(l),no.AuthorityResolveEndpointsAsync,o,i,s)(),l}catch(c){throw jo(endpointResolutionError)}}
var nMr=b(()=>{sgn();x0();IQ();ofe();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {ign,createDiscoveredInstance,nMr};
