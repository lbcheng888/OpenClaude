// @ts-nocheck
import {X} from "../runtime.ts";
import {pos} from "./m757.ts";
var b7=X((fos)=>{var YZc=pos(),mos=(e)=>{if(typeof e==="string")return mos(new URL(e));let{hostname:t,pathname:n,port:r,protocol:o,search:s}=e,i;if(s)i=YZc.parseQueryString(s);return{hostname:t,port:r?parseInt(r):void 0,protocol:o,path:n,query:i}};fos.parseUrl=mos});
export {b7};
