// @ts-nocheck
import {Q} from "../runtime.ts";
import {Nxt} from "./m2146.ts";
import {Gyi} from "./m2153.ts";
import {d2r} from "./m2154.ts";
var zyi=Q((NSn)=>{Object.defineProperty(NSn,"__esModule",{value:!0});NSn.hostDetector=void 0;var p2r=Nxt(),Vyi=require("os"),Qsd=Gyi(),Zsd=d2r();class Kyi{detect(e){return{attributes:{[p2r.ATTR_HOST_NAME]:(0,Vyi.hostname)(),[p2r.ATTR_HOST_ARCH]:(0,Zsd.normalizeArch)((0,Vyi.arch)()),[p2r.ATTR_HOST_ID]:(0,Qsd.getMachineId)()}}}}NSn.hostDetector=new Kyi});
export {zyi};
