// @ts-nocheck
import {Q} from "../runtime.ts";
import {TF} from "./m1825.ts";
import {x7} from "./m1850.ts";
var sti=Q((TWh,oti)=>{var fKu=TF(),hKu=x7(),gKu=(e,t,n)=>{let r=null,o=null,s=null;try{s=new hKu(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===-1)r=i,o=new fKu(r,n)}}),r};oti.exports=gKu});
export {sti};
