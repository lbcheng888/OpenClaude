// @ts-nocheck
import {Q} from "../runtime.ts";
import {ryr} from "./m601.ts";
var oyr=Q((frn)=>{Object.defineProperty(frn,"__esModule",{value:!0});frn.getSSOTokenFilepath=void 0;var Cnu=require("crypto"),Anu=require("path"),Rnu=ryr(),vnu=(e)=>{let n=(0,Cnu.createHash)("sha1").update(e).digest("hex");return(0,Anu.join)((0,Rnu.getHomeDir)(),".aws","sso","cache",`${n}.json`)};frn.getSSOTokenFilepath=vnu});
export {oyr};
