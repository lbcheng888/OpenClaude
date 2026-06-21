// @ts-nocheck
import {X} from "../runtime.ts";
import {PL} from "./m3552.ts";
var l3e=X((jga)=>{var EBt=jga,AZd=PL(),hZd=["double","float","int32","uint32","sint32","fixed32","sfixed32","int64","uint64","sint64","fixed64","sfixed64","bool","string","bytes"];function CBt(e,t){var n=0,r=Object.create(null);t|=0;while(n<e.length)r[hZd[n+t]]=e[n++];return r}EBt.basic=CBt([1,5,0,0,0,5,5,0,0,0,1,1,0,2,2]);EBt.defaults=CBt([0,0,0,0,0,0,0,0,0,0,0,0,!1,"",AZd.emptyArray,null]);EBt.long=CBt([0,0,0,1,1],7);EBt.mapKey=CBt([0,0,0,5,5,0,0,0,1,1,0,2],2);EBt.packed=CBt([1,5,0,0,0,5,5,0,0,0,1,1,0])});
export {l3e};
