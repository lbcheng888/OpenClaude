// @ts-nocheck
import {X} from "../runtime.ts";
import {dF} from "./m2298.ts";
import {MK} from "./m2323.ts";
var fSi=X((bnh,mSi)=>{var Erd=dF(),Crd=MK(),vrd=(e,t,n)=>{let r=null,o=null,s=null;try{s=new Crd(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===-1)r=i,o=new Erd(r,n)}}),r};mSi.exports=vrd});
export {fSi};
