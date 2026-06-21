// @ts-nocheck
import {X} from "../runtime.ts";
import {OQo} from "./m653.ts";
var MQo=X((Fyf,LQo)=>{var Afr=require("fs"),Qzc=OQo();function Zzc(e){let n=Buffer.alloc(150),r;try{r=Afr.openSync(e,"r"),Afr.readSync(r,n,0,150,0),Afr.closeSync(r)}catch(o){}return Qzc(n.toString())}LQo.exports=Zzc});
export {MQo};
