// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function Ipn(e,t){if(t==null)return t;let n=K3s.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return PIr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return PIr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return PIr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Ipn(i,r[s]);return o}return t}
var K3s,PIr="***SensitiveInformation***";
var z3s=b(()=>{K3s=x(US(),1)});
export {Ipn,K3s,PIr,z3s};
