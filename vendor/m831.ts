// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function $rn(e,t){if(t==null)return t;let n=Els.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return s_r;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return s_r}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return s_r}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=$rn(i,r[s]);return o}return t}
var Els,s_r="***SensitiveInformation***";
var Cls=b(()=>{Els=M(US(),1)});
export {$rn,Els,s_r,Cls};
