// @ts-nocheck
import {Q} from "../runtime.ts";
import {Dcs} from "./m753.ts";
var wbr=Q((Pcs)=>{var vbr=Dcs();function $cu(e){let t=[];for(let n of Object.keys(e).sort()){let r=e[n];if(n=vbr.escapeUri(n),Array.isArray(r))for(let o=0,s=r.length;o<s;o++)t.push(`${n}=${vbr.escapeUri(r[o])}`);else{let o=n;if(r||typeof r==="string")o+=`=${vbr.escapeUri(r)}`;t.push(o)}}return t.join("&")}Pcs.buildQueryString=$cu});
export {wbr};
