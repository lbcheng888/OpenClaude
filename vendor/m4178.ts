// @ts-nocheck
import {truncate} from "./m237.ts";
import {b} from "../runtime.ts";
import {ps} from "./m238.ts";
function $9n(e){if(typeof e!=="object"||e===null)return"";let t=e;for(let n of["command","file_path","path","pattern","query","prompt"]){let r=t[n];if(typeof r==="string")return truncate(r.replace(/\s+/g," ").trim(),60)}for(let n of Object.values(t))if(typeof n==="string")return truncate(n.replace(/\s+/g," ").trim(),60);return""}
var ddo=b(()=>{ps()});
export {$9n,ddo};
