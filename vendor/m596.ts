// @ts-nocheck
import {X} from "../runtime.ts";
import {xmr} from "./m595.ts";
var kmr=X((Pen)=>{Object.defineProperty(Pen,"__esModule",{value:!0});Pen.getSSOTokenFilepath=void 0;var i7c=require("crypto"),a7c=require("path"),l7c=xmr(),c7c=(e)=>{let n=(0,i7c.createHash)("sha1").update(e).digest("hex");return(0,a7c.join)((0,l7c.getHomeDir)(),".aws","sso","cache",`${n}.json`)};Pen.getSSOTokenFilepath=c7c});
export {kmr};
