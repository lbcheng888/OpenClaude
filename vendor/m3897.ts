// @ts-nocheck
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function Iyp(e){return e.replace(Hyp,(t)=>t==="\u2028"?"\\u2028":"\\u2029")}
function I4e(e){return Iyp(Le(e))}
var Hyp;
var Nso=b(()=>{Xt();Hyp=/\u2028|\u2029/g});
export {Iyp,I4e,Hyp,Nso};
