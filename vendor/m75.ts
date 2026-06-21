// @ts-nocheck
import {b} from "../runtime.ts";
function Fmc(e,t){var n=typeof e;return t=t==null?Nmc:t,!!t&&(n=="number"||n!="symbol"&&Bmc.test(e))&&(e>-1&&e%1==0&&e<t)}
var Nmc=9007199254740991,Bmc,VTe;
var fgt=b(()=>{Bmc=/^(?:0|[1-9]\d*)$/;VTe=Fmc});
export {Fmc,Nmc,Bmc,VTe,fgt};
