// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {oao} from "./m3700.ts";
var s0a=Q((cBn)=>{Object.defineProperty(cBn,"__esModule",{value:!0});cBn.detectResources=void 0;var o0a=xi(),sao=oao(),fTp=(e={})=>(e.detectors||[]).map((n)=>{try{let r=(0,sao.resourceFromDetectedResource)(n.detect(e));return o0a.diag.debug(`${n.constructor.name} found resource.`,r),r}catch(r){return o0a.diag.debug(`${n.constructor.name} failed: ${r.message}`),(0,sao.emptyResource)()}}).reduce((n,r)=>n.merge(r),(0,sao.emptyResource)());cBn.detectResources=fTp});
export {s0a};
