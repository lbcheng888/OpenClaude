// @ts-nocheck
import {Q} from "../runtime.ts";
import {bAl} from "./m4770.ts";
import {RAl} from "./m4771.ts";
var vAl=Q((Eko)=>{var Yam=bAl(),Jam=RAl();Eko.read=function(e,t){return Yam(e,t||{})};Eko.write=function(e,t){return Jam(e,t)}});
export {vAl};
