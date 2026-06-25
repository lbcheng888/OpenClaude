// @ts-nocheck
import {truncate} from "./m239.ts";
import {b} from "../runtime.ts";
import {Xo} from "./m240.ts";
function qqn(e){if(typeof e!=="object"||e===null)return"";let t=e;for(let n of["command","file_path","path","pattern","query","prompt"]){let r=t[n];if(typeof r==="string")return truncate(r.replace(/\s+/g," ").trim(),60)}for(let n of Object.values(t))if(typeof n==="string")return truncate(n.replace(/\s+/g," ").trim(),60);return""}
var ego=b(()=>{Xo()});
export {qqn,ego};
