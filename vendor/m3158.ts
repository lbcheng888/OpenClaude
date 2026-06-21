// @ts-nocheck
import {l3o,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function q$d(e){let t=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return t=t.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),t}
function Yrt(e){let t=l3o(e);for(let n=0;n<10;n++){let r=q$d(t);if(r===t)return t;t=r}return t}
function $7r(e){let t=e,n="",r=0,o=10;while(t!==n&&r<o)n=t,t=t.normalize("NFKC"),t=Yrt(t),r++;if(r>=o)throw Error(`Unicode sanitization reached maximum iterations (${o}) for input: ${e.slice(0,100)}`);return t}
function defineTool(e){if(typeof e==="string")return $7r(e);if(Array.isArray(e))return e.map(defineTool);if(e!==null&&typeof e==="object"){let t={};for(let[n,r]of Object.entries(e))t[defineTool(n)]=defineTool(r);return t}return e}
var F$e=b(()=>{dr()});
export {q$d,Yrt,$7r,defineTool,F$e};
