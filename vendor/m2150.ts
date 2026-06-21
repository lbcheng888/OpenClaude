// @ts-nocheck
import {X} from "../runtime.ts";
import {uHt} from "./m2141.ts";
import {Ypi} from "./m2148.ts";
import {B1r} from "./m2149.ts";
var Qpi=X((o_n)=>{Object.defineProperty(o_n,"__esModule",{value:!0});o_n.hostDetector=void 0;var F1r=uHt(),Jpi=require("os"),DYu=Ypi(),PYu=B1r();class Xpi{detect(e){return{attributes:{[F1r.ATTR_HOST_NAME]:(0,Jpi.hostname)(),[F1r.ATTR_HOST_ARCH]:(0,PYu.normalizeArch)((0,Jpi.arch)()),[F1r.ATTR_HOST_ID]:(0,DYu.getMachineId)()}}}}o_n.hostDetector=new Xpi});
export {Qpi};
