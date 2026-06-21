// @ts-nocheck
import {X} from "../runtime.ts";
import {CFt} from "./m3687.ts";
import {tCa} from "./m3694.ts";
import {Cno} from "./m3695.ts";
var oCa=X((w1n)=>{Object.defineProperty(w1n,"__esModule",{value:!0});w1n.hostDetector=void 0;var vno=CFt(),nCa=require("os"),Jlp=tCa(),Xlp=Cno();class rCa{detect(e){return{attributes:{[vno.ATTR_HOST_NAME]:(0,nCa.hostname)(),[vno.ATTR_HOST_ARCH]:(0,Xlp.normalizeArch)((0,nCa.arch)()),[vno.ATTR_HOST_ID]:(0,Jlp.getMachineId)()}}}}w1n.hostDetector=new rCa});
export {oCa};
