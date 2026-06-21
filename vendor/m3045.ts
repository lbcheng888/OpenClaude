// @ts-nocheck
import {bGr,A$e} from "./m3020.ts";
import {b,M} from "../runtime.ts";
import {AVi} from "./m3031.ts";
import {GVi} from "./m3044.ts";
function wLt(e,t){return e.split(`
`).flatMap((n)=>KVi.default(n,t,{trim:!1,hard:!0}).split(`
`).map((r)=>r.trimEnd())).join(`
`)}
function Lxn(){return VVi.default({defaultWidth:80,output:bGr().output})}
var VVi,KVi;
var Mxn=b(()=>{A$e();VVi=M(AVi(),1),KVi=M(GVi(),1)});
export {wLt,Lxn,VVi,KVi,Mxn};
