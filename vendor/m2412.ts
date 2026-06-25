// @ts-nocheck
import {ctt,$Cn} from "./m2360.ts";
import {b} from "../runtime.ts";
function xPt(e){let t=0,n=0;while(n<=e.length){let r=e.indexOf(`
`,n),o=r===-1?e.substring(n):e.substring(n,r);if(t=Math.max(t,ctt(o)),r===-1)break;n=r+1}return t}
var Oqr=b(()=>{$Cn()});
export {xPt,Oqr};
