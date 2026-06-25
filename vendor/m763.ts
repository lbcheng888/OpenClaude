// @ts-nocheck
import {Q} from "../runtime.ts";
import {ius} from "./m762.ts";
var jK=Q((lus)=>{var duu=ius(),aus=(e)=>{if(typeof e==="string")return aus(new URL(e));let{hostname:t,pathname:n,port:r,protocol:o,search:s}=e,i;if(s)i=duu.parseQueryString(s);return{hostname:t,port:r?parseInt(r):void 0,protocol:o,path:n,query:i}};lus.parseUrl=aus});
export {jK};
