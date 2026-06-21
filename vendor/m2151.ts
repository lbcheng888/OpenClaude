// @ts-nocheck
import {X} from "../runtime.ts";
import {uHt} from "./m2141.ts";
import {B1r} from "./m2149.ts";
var nmi=X((s_n)=>{Object.defineProperty(s_n,"__esModule",{value:!0});s_n.osDetector=void 0;var Zpi=uHt(),emi=require("os"),OYu=B1r();class tmi{detect(e){return{attributes:{[Zpi.ATTR_OS_TYPE]:(0,OYu.normalizeType)((0,emi.platform)()),[Zpi.ATTR_OS_VERSION]:(0,emi.release)()}}}}s_n.osDetector=new tmi});
export {nmi};
