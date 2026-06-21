// @ts-nocheck
import {X} from "../runtime.ts";
import {cQ} from "./m916.ts";
import {Kon} from "./m917.ts";
import {V2} from "./m896.ts";
import {vys} from "./m989.ts";
var Hys=X((wsn)=>{Object.defineProperty(wsn,"__esModule",{value:!0});wsn.resolveRuntimeExtensions=void 0;var wys=cQ(),Rys=Kon(),xys=V2(),kys=vys(),Omu=(e,t)=>{let n=Object.assign((0,wys.getAwsRegionExtensionConfiguration)(e),(0,xys.getDefaultExtensionConfiguration)(e),(0,Rys.getHttpHandlerExtensionConfiguration)(e),(0,kys.getHttpAuthExtensionConfiguration)(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,(0,wys.resolveAwsRegionExtensionConfiguration)(n),(0,xys.resolveDefaultRuntimeConfig)(n),(0,Rys.resolveHttpHandlerRuntimeConfig)(n),(0,kys.resolveHttpAuthRuntimeConfig)(n))};wsn.resolveRuntimeExtensions=Omu});
export {Hys};
