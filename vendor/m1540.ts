// @ts-nocheck
import {_6s,yNe} from "./m1537.ts";
import {aCe,jxr} from "./m1531.ts";
import {b} from "../runtime.ts";
var Zxr=({query:e={}})=>{let t=[],n={};for(let r of Object.keys(e).sort()){if(r.toLowerCase()===_6s)continue;t.push(r);let o=e[r];if(typeof o==="string")n[r]=`${aCe(r)}=${aCe(o)}`;else if(Array.isArray(o))n[r]=o.slice(0).reduce((s,i)=>s.concat([`${aCe(r)}=${aCe(i)}`]),[]).sort().join("&")}return t.map((r)=>n[r]).filter((r)=>r).join("&")};
var ekr=b(()=>{jxr();yNe()});
export {Zxr,ekr};
