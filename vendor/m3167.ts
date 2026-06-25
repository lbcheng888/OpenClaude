// @ts-nocheck
import {rWo,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function lKd(e){let t=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return t=t.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),t}
function Kst(e){let t=rWo(e);for(let n=0;n<10;n++){let r=lKd(t);if(r===t)return t;t=r}return t}
function yXr(e){let t=e,n="",r=0,o=10;while(t!==n&&r<o)n=t,t=t.normalize("NFKC"),t=Kst(t),r++;if(r>=o)throw Error(`Unicode sanitization reached maximum iterations (${o}) for input: ${e.slice(0,100)}`);return t}
function O$(e){if(typeof e==="string")return yXr(e);if(Array.isArray(e))return e.map(O$);if(e!==null&&typeof e==="object"){let t={};for(let[n,r]of Object.entries(e))t[O$(n)]=O$(r);return t}return e}
var W9e=b(()=>{lr()});
export {lKd,Kst,yXr,O$,W9e};
