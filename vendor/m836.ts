// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function Ain(e,t){if(t==null)return t;let n=_fs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return OEr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return OEr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return OEr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Ain(i,r[s]);return o}return t}
var _fs,OEr="***SensitiveInformation***";
var yfs=b(()=>{_fs=x(US(),1)});
export {Ain,_fs,OEr,yfs};
