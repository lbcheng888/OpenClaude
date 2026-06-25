// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {c2r} from "./m2143.ts";
var Pyi=Q((wSn)=>{Object.defineProperty(wSn,"__esModule",{value:!0});wSn.detectResources=void 0;var Dyi=xi(),u2r=c2r(),Hsd=(e={})=>(e.detectors||[]).map((n)=>{try{let r=(0,u2r.resourceFromDetectedResource)(n.detect(e));return Dyi.diag.debug(`${n.constructor.name} found resource.`,r),r}catch(r){return Dyi.diag.debug(`${n.constructor.name} failed: ${r.message}`),(0,u2r.emptyResource)()}}).reduce((n,r)=>n.merge(r),(0,u2r.emptyResource)());wSn.detectResources=Hsd});
export {Pyi};
