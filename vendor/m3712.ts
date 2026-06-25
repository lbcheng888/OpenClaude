// @ts-nocheck
import {Q} from "../runtime.ts";
import {e$t} from "./m3703.ts";
import {g0a} from "./m3710.ts";
import {iao} from "./m3711.ts";
var T0a=Q((TBn)=>{Object.defineProperty(TBn,"__esModule",{value:!0});TBn.hostDetector=void 0;var aao=e$t(),_0a=require("os"),NTp=g0a(),FTp=iao();class y0a{detect(e){return{attributes:{[aao.ATTR_HOST_NAME]:(0,_0a.hostname)(),[aao.ATTR_HOST_ARCH]:(0,FTp.normalizeArch)((0,_0a.arch)()),[aao.ATTR_HOST_ID]:(0,NTp.getMachineId)()}}}}TBn.hostDetector=new y0a});
export {T0a};
