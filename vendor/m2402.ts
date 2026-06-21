// @ts-nocheck
import {cZe,tSn} from "./m2350.ts";
import {b} from "../runtime.ts";
function e0t(e){let t=0,n=0;while(n<=e.length){let r=e.indexOf(`
`,n),o=r===-1?e.substring(n):e.substring(n,r);if(t=Math.max(t,cZe(o)),r===-1)break;n=r+1}return t}
var r$r=b(()=>{tSn()});
export {e0t,r$r};
