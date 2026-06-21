// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Zr,OQ} from "./m1743.ts";
import {ZD,bmn,Emn} from "./m1756.ts";
import {Ih,Yme} from "./m1752.ts";
import {ls,m0} from "./m1721.ts";
import {endpointResolutionError,LH} from "./m1720.ts";
var Cmn={};
isFullscreenWithTTY(Cmn,{createDiscoveredInstance:()=>createDiscoveredInstance});
async function createDiscoveredInstance(e,t,n,r,o,s,i){i?.addQueueMeasurement(Zr.AuthorityFactoryCreateDiscoveredInstance,s);let a=ZD.transformCIAMAuthority(bmn(e)),l=new ZD(a,t,n,r,o,s,i);try{return await Ih(l.resolveEndpointsAsync.bind(l),Zr.AuthorityResolveEndpointsAsync,o,i,s)(),l}catch(c){throw ls(endpointResolutionError)}}
var w0r=b(()=>{Emn();m0();OQ();Yme();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Cmn,createDiscoveredInstance,w0r};
