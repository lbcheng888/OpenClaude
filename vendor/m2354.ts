// @ts-nocheck
import {Vve,DIt} from "./m2343.ts";
import {tn,Hc} from "./m235.ts";
import {b} from "../runtime.ts";
function Lbi(e,t=_sd){if(!e.includes("\t"))return e;let n=Vve(),r=n.feed(e);r.push(...n.flush());let o="",s=0;for(let i of r)if(i.type==="sequence")o+=i.value;else{let a=i.value.split(/(\t|\n)/);for(let l of a)if(l==="\t"){let c=t-s%t;o+=" ".repeat(c),s+=c}else if(l===`
`)o+=l,s=0;else o+=l,s+=tn(l)}return o}
var _sd=8;
var Mbi=b(()=>{Hc();DIt()});
export {Lbi,_sd,Mbi};
