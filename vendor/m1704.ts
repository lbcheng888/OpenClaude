// @ts-nocheck
import {Lme,Gpn} from "./m1699.ts";
import {b} from "../runtime.ts";
function tVs(e){let t=new Set;for(let n in e.responses){let r=e.responses[n];if(r.bodyMapper&&r.bodyMapper.type.name===Lme.Stream)t.add(Number(n))}return t}
function dse(e){let{parameterPath:t,mapper:n}=e,r;if(typeof t==="string")r=t;else if(Array.isArray(t))r=t.join(".");else r=n.serializedName;return r}
var Kpn=b(()=>{Gpn()});
export {tVs,dse,Kpn};
