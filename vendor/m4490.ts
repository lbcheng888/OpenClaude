// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function Ift(e){return Ajp.some((t)=>e.includes(t))}
function lVn(e){return e.some((t)=>{try{return Ift(TeamDeleteToolName(t))}catch{return!0}})}
var Ajp;
var bCo=b(()=>{tn();Ajp=["msg_bdrk_","msg_vrtx_","bolt-inf-","toolu_bdrk_","toolu_vrtx_","srvtoolu_bdrk_","srvtoolu_vrtx_","req_bdrk_","req_vrtx_"]});
export {Ift,lVn,Ajp,bCo};
