// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function Vcn(e,t){if(t==null)return t;let n=XBs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return owr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return owr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return owr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Vcn(i,r[s]);return o}return t}
var XBs,owr="***SensitiveInformation***";
var QBs=b(()=>{XBs=M(US(),1)});
export {Vcn,XBs,owr,QBs};
