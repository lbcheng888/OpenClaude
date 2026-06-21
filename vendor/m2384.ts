// @ts-nocheck
import {lCi,cCi} from "./m2383.ts";
import {b} from "../runtime.ts";
var Lid=(e,t)=>{let n=[],r=e-t,o=e+t;for(let s=r;s<=o;s++)n.push(s);return n},Mid=(e,t,n={})=>{var r;if(typeof e!=="string")throw TypeError("Source code is missing.");if(!t||t<1)throw TypeError("Line number must start from `1`.");let o=lCi(e).split(/\r?\n/);if(t>o.length)return;return Lid(t,(r=n.around)!==null&&r!==void 0?r:3).filter((s)=>o[s-1]!==void 0).map((s)=>({line:s,value:o[s-1]}))},uCi;
var dCi=b(()=>{cCi();uCi=Mid});
export {Lid,Mid,uCi,dCi};
