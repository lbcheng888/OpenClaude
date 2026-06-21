// @ts-nocheck
import {b,M} from "../runtime.ts";
import {US} from "./m818.ts";
function Qon(e,t){if(t==null)return t;let n=Vhs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return vTr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return vTr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return vTr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Qon(i,r[s]);return o}return t}
var Vhs,vTr="***SensitiveInformation***";
var Khs=b(()=>{Vhs=M(US(),1)});
export {Qon,Vhs,vTr,Khs};
