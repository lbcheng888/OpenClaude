// @ts-nocheck
import {SIi,bIi} from "./m2393.ts";
import {b} from "../runtime.ts";
var i_d=(e,t)=>{let n=[],r=e-t,o=e+t;for(let s=r;s<=o;s++)n.push(s);return n},a_d=(e,t,n={})=>{var r;if(typeof e!=="string")throw TypeError("Source code is missing.");if(!t||t<1)throw TypeError("Line number must start from `1`.");let o=SIi(e).split(/\r?\n/);if(t>o.length)return;return i_d(t,(r=n.around)!==null&&r!==void 0?r:3).filter((s)=>o[s-1]!==void 0).map((s)=>({line:s,value:o[s-1]}))},EIi;
var CIi=b(()=>{bIi();EIi=a_d});
export {i_d,a_d,EIi,CIi};
