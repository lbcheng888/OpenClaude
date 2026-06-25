// @ts-nocheck
import {Q} from "../runtime.ts";
import {TF} from "./m1825.ts";
import {x7} from "./m1850.ts";
var ati=Q((SWh,iti)=>{var _Ku=TF(),yKu=x7(),TKu=(e,t,n)=>{let r=null,o=null,s=null;try{s=new yKu(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===1)r=i,o=new _Ku(r,n)}}),r};iti.exports=TKu});
export {ati};
