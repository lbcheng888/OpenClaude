// @ts-nocheck
import {Q} from "../runtime.ts";
import {IPe} from "./m4729.ts";
var gCl=Q((hCl)=>{var Qwo=IPe(),fCl=Qwo.getBCHDigit(1335);hCl.getEncodedBits=function(t,n){let r=t.bit<<3|n,o=r<<10;while(Qwo.getBCHDigit(o)-fCl>=0)o^=1335<<Qwo.getBCHDigit(o)-fCl;return(r<<10|o)^21522}});
export {gCl};
