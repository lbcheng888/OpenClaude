// @ts-nocheck
import {Q} from "../runtime.ts";
import {Wms} from "./m825.ts";
var mEr=Q((Vms)=>{var Gms=Wms(),QN=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0")),bpu=()=>{if(Gms.randomUUID)return Gms.randomUUID();let e=new Uint8Array(16);return crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128,QN[e[0]]+QN[e[1]]+QN[e[2]]+QN[e[3]]+"-"+QN[e[4]]+QN[e[5]]+"-"+QN[e[6]]+QN[e[7]]+"-"+QN[e[8]]+QN[e[9]]+"-"+QN[e[10]]+QN[e[11]]+QN[e[12]]+QN[e[13]]+QN[e[14]]+QN[e[15]]};Vms.v4=bpu});
export {mEr};
