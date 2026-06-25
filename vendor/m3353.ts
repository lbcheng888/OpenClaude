// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function sno(e){if(Array.isArray(e))return e.map(sno);if(e!==null&&typeof e==="object"){let t={};for(let n of Object.keys(e).sort())t[n]=sno(e[n]);return t}return e}
function o_a(e){let t=sno(e),n=TeamDeleteToolName(t);return`sha256:${r_a.createHash("sha256").update(n).digest("hex")}`}
var r_a;
var s_a=b(()=>{tn();r_a=require("crypto")});
export {sno,o_a,r_a,s_a};
