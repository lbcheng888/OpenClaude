// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function _cn(e,t){if(t==null)return t;let n=lMs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return Ivr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return Ivr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return Ivr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=_cn(i,r[s]);return o}return t}
var lMs,Ivr="***SensitiveInformation***";
var cMs=b(()=>{lMs=M(US(),1)});
export {_cn,lMs,Ivr,cMs};
