// @ts-nocheck
import {X} from "../runtime.ts";
import {Brs} from "./m748.ts";
var Qhr=X((Frs)=>{var Xhr=Brs();function vZc(e){let t=[];for(let n of Object.keys(e).sort()){let r=e[n];if(n=Xhr.escapeUri(n),Array.isArray(r))for(let o=0,s=r.length;o<s;o++)t.push(`${n}=${Xhr.escapeUri(r[o])}`);else{let o=n;if(r||typeof r==="string")o+=`=${Xhr.escapeUri(r)}`;t.push(o)}}return t.join("&")}Frs.buildQueryString=vZc});
export {Qhr};
