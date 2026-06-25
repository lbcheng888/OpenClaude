// @ts-nocheck
import {Q} from "../runtime.ts";
import {OF} from "./m2308.ts";
import {dz} from "./m2333.ts";
var Ewi=Q((nhg,bwi)=>{var Jmd=OF(),Xmd=dz(),Qmd=(e,t,n)=>{let r=null,o=null,s=null;try{s=new Xmd(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===-1)r=i,o=new Jmd(r,n)}}),r};bwi.exports=Qmd});
export {Ewi};
