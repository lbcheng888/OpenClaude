// @ts-nocheck
import {b,x} from "../runtime.ts";
import {US} from "./m823.ts";
function Lan(e,t){if(t==null)return t;let n=UEs.NormalizedSchema.of(e);if(n.getMergedTraits().sensitive)return eRr;if(n.isListSchema()){if(!!n.getValueSchema().getMergedTraits().sensitive)return eRr}else if(n.isMapSchema()){if(!!n.getKeySchema().getMergedTraits().sensitive||!!n.getValueSchema().getMergedTraits().sensitive)return eRr}else if(n.isStructSchema()&&typeof t==="object"){let r=t,o={};for(let[s,i]of n.structIterator())if(r[s]!=null)o[s]=Lan(i,r[s]);return o}return t}
var UEs,eRr="***SensitiveInformation***";
var $Es=b(()=>{UEs=x(US(),1)});
export {Lan,UEs,eRr,$Es};
