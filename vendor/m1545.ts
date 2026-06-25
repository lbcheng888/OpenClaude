// @ts-nocheck
import {mKs,hFe} from "./m1542.ts";
import {GAe,TDr} from "./m1536.ts";
import {b} from "../runtime.ts";
var HDr=({query:e={}})=>{let t=[],n={};for(let r of Object.keys(e).sort()){if(r.toLowerCase()===mKs)continue;t.push(r);let o=e[r];if(typeof o==="string")n[r]=`${GAe(r)}=${GAe(o)}`;else if(Array.isArray(o))n[r]=o.slice(0).reduce((s,i)=>s.concat([`${GAe(r)}=${GAe(i)}`]),[]).sort().join("&")}return t.map((r)=>n[r]).filter((r)=>r).join("&")};
var IDr=b(()=>{TDr();hFe()});
export {HDr,IDr};
