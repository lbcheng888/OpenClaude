// @ts-nocheck
import {ctt,$Cn} from "./m2360.ts";
import {b} from "../runtime.ts";
function zkp(e,t,n=1/0){let r=t<=0||!Number.isFinite(t),o=0,s=0;while(s<=e.length){let i=e.indexOf(`
`,s),a=i===-1?e.substring(s):e.substring(s,i);if(r)o++;else{let l=ctt(a);o+=l===0?1:Math.ceil(l/t)}if(o>n)return o;if(i===-1)break;s=i+1}return o}
function _Ua(e,t,n){return zkp(e,t,n)>n}
var yUa=b(()=>{$Cn()});
export {zkp,_Ua,yUa};
