// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function Zsn(e,t){if(t==null)return t;let n=REs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return GSr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return GSr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return GSr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Zsn(i,r[s]);return o}return t}
var REs,GSr="***SensitiveInformation***";
var xEs=b(()=>{REs=M(US(),1)});
export {Zsn,REs,GSr,xEs};
