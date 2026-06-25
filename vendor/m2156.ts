// @ts-nocheck
import {Q} from "../runtime.ts";
import {Nxt} from "./m2146.ts";
import {d2r} from "./m2154.ts";
var Xyi=Q((FSn)=>{Object.defineProperty(FSn,"__esModule",{value:!0});FSn.osDetector=void 0;var jyi=Nxt(),Yyi=require("os"),eid=d2r();class Jyi{detect(e){return{attributes:{[jyi.ATTR_OS_TYPE]:(0,eid.normalizeType)((0,Yyi.platform)()),[jyi.ATTR_OS_VERSION]:(0,Yyi.release)()}}}}FSn.osDetector=new Jyi});
export {Xyi};
