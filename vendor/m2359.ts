// @ts-nocheck
import {nAe,ZUr} from "./m2358.ts";
import {b} from "../runtime.ts";
function aUe(e,t){let n=new Set(t.map((o)=>o.endCode)),r=new Set(e.map((o)=>o.code));return[...nAe(e.filter((o)=>!n.has(o.endCode))),...t.filter((o)=>!r.has(o.code))]}
var e2r=b(()=>{ZUr()});
export {aUe,e2r};
