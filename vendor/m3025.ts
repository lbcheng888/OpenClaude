// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ixn,Ynt} from "./m3024.ts";
import {Hxn} from "./m3023.ts";
var Mz,aVi;
var lVi=b(()=>{Ixn();Mz=M(Hxn(),1),aVi={prefix:{idle:Mz.default.blue("?"),done:Mz.default.green(Ynt.tick)},spinner:{interval:80,frames:["\u280B","\u2819","\u2839","\u2838","\u283C","\u2834","\u2826","\u2827","\u2807","\u280F"].map((e)=>Mz.default.yellow(e))},style:{answer:Mz.default.cyan,message:Mz.default.bold,error:(e)=>Mz.default.red(`> ${e}`),defaultAnswer:(e)=>Mz.default.dim(`(${e})`),help:Mz.default.dim,highlight:Mz.default.cyan,key:(e)=>Mz.default.cyan(Mz.default.bold(`<${e}>`))}}});
export {Mz,aVi,lVi};
