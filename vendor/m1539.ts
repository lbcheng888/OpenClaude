// @ts-nocheck
import {T6s,S6s,b6s,yNe} from "./m1537.ts";
import {b} from "../runtime.ts";
var qdn=({headers:e},t,n)=>{let r={};for(let o of Object.keys(e).sort()){if(e[o]==null)continue;let s=o.toLowerCase();if(s in T6s||t?.has(s)||S6s.test(s)||b6s.test(s)){if(!n||n&&!n.has(s))continue}r[s]=e[o].trim().replace(/\s+/g," ")}return r};
var Qxr=b(()=>{yNe()});
export {qdn,Qxr};
