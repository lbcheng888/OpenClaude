// @ts-nocheck
import {X} from "../runtime.ts";
import {CFt} from "./m3687.ts";
import {Cno} from "./m3695.ts";
var lCa=X((R1n)=>{Object.defineProperty(R1n,"__esModule",{value:!0});R1n.osDetector=void 0;var sCa=CFt(),iCa=require("os"),Qlp=Cno();class aCa{detect(e){return{attributes:{[sCa.ATTR_OS_TYPE]:(0,Qlp.normalizeType)((0,iCa.platform)()),[sCa.ATTR_OS_VERSION]:(0,iCa.release)()}}}}R1n.osDetector=new aCa});
export {lCa};
