// @ts-nocheck
import {phe,x4r} from "./m2368.ts";
import {b} from "../runtime.ts";
function s2e(e,t){let n=new Set(t.map((o)=>o.endCode)),r=new Set(e.map((o)=>o.code));return[...phe(e.filter((o)=>!n.has(o.endCode))),...t.filter((o)=>!r.has(o.code))]}
var D4r=b(()=>{x4r()});
export {s2e,D4r};
