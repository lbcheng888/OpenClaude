// @ts-nocheck
import {X} from "../runtime.ts";
var nds=X((tds)=>{var eds=typeof TextEncoder=="function"?new TextEncoder:null,Bsu=(e)=>{if(typeof e==="string"){if(eds)return eds.encode(e).byteLength;let t=e.length;for(let n=t-1;n>=0;n--){let r=e.charCodeAt(n);if(r>127&&r<=2047)t++;else if(r>2047&&r<=65535)t+=2;if(r>=56320&&r<=57343)n--}return t}else if(typeof e.byteLength==="number")return e.byteLength;else if(typeof e.size==="number")return e.size;throw Error(`Body Length computation failed for ${e}`)};tds.calculateBodyLength=Bsu});
export {nds};
