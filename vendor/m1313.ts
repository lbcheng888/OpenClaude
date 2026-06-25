// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function npn(e,t){if(t==null)return t;let n=r2s.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return iIr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return iIr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return iIr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=npn(i,r[s]);return o}return t}
var r2s,iIr="***SensitiveInformation***";
var o2s=b(()=>{r2s=x(US(),1)});
export {npn,r2s,iIr,o2s};
