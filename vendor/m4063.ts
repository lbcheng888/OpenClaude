// @ts-nocheck
import {cZe,tSn} from "./m2350.ts";
import {b} from "../runtime.ts";
function Lwp(e,t,n=1/0){let r=t<=0||!Number.isFinite(t),o=0,s=0;while(s<=e.length){let i=e.indexOf(`
`,s),a=i===-1?e.substring(s):e.substring(s,i);if(r)o++;else{let l=cZe(a);o+=l===0?1:Math.ceil(l/t)}if(o>n)return o;if(i===-1)break;s=i+1}return o}
function o2a(e,t,n){return Lwp(e,t,n)>n}
var s2a=b(()=>{tSn()});
export {Lwp,o2a,s2a};
