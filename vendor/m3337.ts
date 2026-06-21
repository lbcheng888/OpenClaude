// @ts-nocheck
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function EXr(e){if(Array.isArray(e))return e.map(EXr);if(e!==null&&typeof e==="object"){let t={};for(let n of Object.keys(e).sort())t[n]=EXr(e[n]);return t}return e}
function Vca(e){let t=EXr(e),n=Le(t);return`sha256:${Gca.createHash("sha256").update(n).digest("hex")}`}
var Gca;
var Kca=b(()=>{Xt();Gca=require("crypto")});
export {EXr,Vca,Gca,Kca};
