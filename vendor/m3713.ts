// @ts-nocheck
import {Q} from "../runtime.ts";
import {e$t} from "./m3703.ts";
import {iao} from "./m3711.ts";
var C0a=Q((SBn)=>{Object.defineProperty(SBn,"__esModule",{value:!0});SBn.osDetector=void 0;var S0a=e$t(),b0a=require("os"),BTp=iao();class E0a{detect(e){return{attributes:{[S0a.ATTR_OS_TYPE]:(0,BTp.normalizeType)((0,b0a.platform)()),[S0a.ATTR_OS_VERSION]:(0,b0a.release)()}}}}SBn.osDetector=new E0a});
export {C0a};
