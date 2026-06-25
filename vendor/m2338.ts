// @ts-nocheck
import {Q} from "../runtime.ts";
import {OF} from "./m2308.ts";
import {dz} from "./m2333.ts";
var Awi=Q((rhg,Cwi)=>{var Zmd=OF(),efd=dz(),tfd=(e,t,n)=>{let r=null,o=null,s=null;try{s=new efd(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===1)r=i,o=new Zmd(r,n)}}),r};Cwi.exports=tfd});
export {Awi};
