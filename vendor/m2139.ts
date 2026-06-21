// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {M1r} from "./m2138.ts";
var Bpi=X((zgn)=>{Object.defineProperty(zgn,"__esModule",{value:!0});zgn.detectResources=void 0;var Npi=Xi(),N1r=M1r(),cYu=(e={})=>(e.detectors||[]).map((n)=>{try{let r=(0,N1r.resourceFromDetectedResource)(n.detect(e));return Npi.diag.debug(`${n.constructor.name} found resource.`,r),r}catch(r){return Npi.diag.debug(`${n.constructor.name} failed: ${r.message}`),(0,N1r.emptyResource)()}}).reduce((n,r)=>n.merge(r),(0,N1r.emptyResource)());zgn.detectResources=cYu});
export {Bpi};
