// @ts-nocheck
import {Q} from "../runtime.ts";
import {yns} from "./m609.ts";
var qN=Q((ayr)=>{var Tns=yns(),lru=(e)=>e[Tns.SMITHY_CONTEXT_KEY]||(e[Tns.SMITHY_CONTEXT_KEY]={}),cru=(e)=>{if(typeof e==="function")return e;let t=Promise.resolve(e);return()=>t};ayr.getSmithyContext=lru;ayr.normalizeProvider=cru});
export {qN};
