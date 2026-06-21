// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {bno} from "./m3684.ts";
var WEa=X((h1n)=>{Object.defineProperty(h1n,"__esModule",{value:!0});h1n.detectResources=void 0;var jEa=Xi(),Eno=bno(),Rlp=(e={})=>(e.detectors||[]).map((n)=>{try{let r=(0,Eno.resourceFromDetectedResource)(n.detect(e));return jEa.diag.debug(`${n.constructor.name} found resource.`,r),r}catch(r){return jEa.diag.debug(`${n.constructor.name} failed: ${r.message}`),(0,Eno.emptyResource)()}}).reduce((n,r)=>n.merge(r),(0,Eno.emptyResource)());h1n.detectResources=Rlp});
export {WEa};
