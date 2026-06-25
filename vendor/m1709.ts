// @ts-nocheck
import {Gme,whn} from "./m1704.ts";
import {b} from "../runtime.ts";
function JJs(e){let t=new Set;for(let n in e.responses){let r=e.responses[n];if(r.bodyMapper&&r.bodyMapper.type.name===Gme.Stream)t.add(Number(n))}return t}
function use(e){let{parameterPath:t,mapper:n}=e,r;if(typeof t==="string")r=t;else if(Array.isArray(t))r=t.join(".");else r=n.serializedName;return r}
var Hhn=b(()=>{whn()});
export {JJs,use,Hhn};
