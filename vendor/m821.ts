// @ts-nocheck
import {X} from "../runtime.ts";
import {Yas} from "./m820.ts";
var Bgr=X((Xas)=>{var Jas=Yas(),kB=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0")),snu=()=>{if(Jas.randomUUID)return Jas.randomUUID();let e=new Uint8Array(16);return crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128,kB[e[0]]+kB[e[1]]+kB[e[2]]+kB[e[3]]+"-"+kB[e[4]]+kB[e[5]]+"-"+kB[e[6]]+kB[e[7]]+"-"+kB[e[8]]+kB[e[9]]+"-"+kB[e[10]]+kB[e[11]]+kB[e[12]]+kB[e[13]]+kB[e[14]]+kB[e[15]]};Xas.v4=snu});
export {Bgr};
