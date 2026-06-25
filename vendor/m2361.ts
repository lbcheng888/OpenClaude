// @ts-nocheck
import {ctt,$Cn} from "./m2360.ts";
import {b} from "../runtime.ts";
function qhd(e,t){if(e.length===0)return{width:0,height:0};let n=t<=0||!Number.isFinite(t),r=0,o=0,s=0;while(s<=e.length){let i=e.indexOf(`
`,s),a=i===-1?e.substring(s):e.substring(s,i),l=ctt(a);if(o=Math.max(o,l),n)r++;else r+=l===0?1:Math.ceil(l/t);if(i===-1)break;s=i+1}return{width:o,height:r}}
var o2e;
var C4r=b(()=>{$Cn();o2e=qhd});
export {qhd,o2e,C4r};
