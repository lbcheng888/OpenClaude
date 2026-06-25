// @ts-nocheck
import {xve,iPt} from "./m2353.ts";
import {sn,mc} from "./m237.ts";
import {b} from "../runtime.ts";
function Vki(e,t=Whd){if(!e.includes("\t"))return e;let n=xve(),r=n.feed(e);r.push(...n.flush());let o="",s=0;for(let i of r)if(i.type==="sequence")o+=i.value;else{let a=i.value.split(/(\t|\n)/);for(let l of a)if(l==="\t"){let c=t-s%t;o+=" ".repeat(c),s+=c}else if(l===`
`)o+=l,s=0;else o+=l,s+=sn(l)}return o}
var Whd=8;
var Kki=b(()=>{mc();iPt()});
export {Vki,Whd,Kki};
