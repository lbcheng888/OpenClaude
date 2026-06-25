// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function Mln(e,t){if(t==null)return t;let n=bHs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return Svr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return Svr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return Svr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Mln(i,r[s]);return o}return t}
var bHs,Svr="***SensitiveInformation***";
var EHs=b(()=>{bHs=x(US(),1)});
export {Mln,bHs,Svr,EHs};
