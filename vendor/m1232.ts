// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function edn(e,t){if(t==null)return t;let n=b1s.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return Vkr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return Vkr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return Vkr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=edn(i,r[s]);return o}return t}
var b1s,Vkr="***SensitiveInformation***";
var E1s=b(()=>{b1s=x(US(),1)});
export {edn,b1s,Vkr,E1s};
