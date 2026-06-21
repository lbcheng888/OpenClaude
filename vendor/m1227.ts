// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function hln(e,t){if(t==null)return t;let n=R0s.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return hCr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return hCr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return hCr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=hln(i,r[s]);return o}return t}
var R0s,hCr="***SensitiveInformation***";
var x0s=b(()=>{R0s=M(US(),1)});
export {hln,R0s,hCr,x0s};
