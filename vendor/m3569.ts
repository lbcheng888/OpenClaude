// @ts-nocheck
import {Q} from "../runtime.ts";
import {XO} from "./m3568.ts";
var E4e=Q((oRa)=>{var ZUt=oRa,rup=XO(),oup=["double","float","int32","uint32","sint32","fixed32","sfixed32","int64","uint64","sint64","fixed64","sfixed64","bool","string","bytes"];function e2t(e,t){var n=0,r=Object.create(null);t|=0;while(n<e.length)r[oup[n+t]]=e[n++];return r}ZUt.basic=e2t([1,5,0,0,0,5,5,0,0,0,1,1,0,2,2]);ZUt.defaults=e2t([0,0,0,0,0,0,0,0,0,0,0,0,!1,"",rup.emptyArray,null]);ZUt.long=e2t([0,0,0,1,1],7);ZUt.mapKey=e2t([0,0,0,5,5,0,0,0,1,1,0,2],2);ZUt.packed=e2t([1,5,0,0,0,5,5,0,0,0,1,1,0])});
export {E4e};
