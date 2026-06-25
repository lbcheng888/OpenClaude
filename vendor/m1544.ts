// @ts-nocheck
import {hKs,gKs,_Ks,hFe} from "./m1542.ts";
import {b} from "../runtime.ts";
var Afn=({headers:e},t,n)=>{let r={};for(let o of Object.keys(e).sort()){if(e[o]==null)continue;let s=o.toLowerCase();if(s in hKs||t?.has(s)||gKs.test(s)||_Ks.test(s)){if(!n||n&&!n.has(s))continue}r[s]=e[o].trim().replace(/\s+/g," ")}return r};
var kDr=b(()=>{hFe()});
export {Afn,kDr};
