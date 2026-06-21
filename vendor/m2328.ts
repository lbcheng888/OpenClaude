// @ts-nocheck
import {X} from "../runtime.ts";
import {dF} from "./m2298.ts";
import {MK} from "./m2323.ts";
var hSi=X((Enh,ASi)=>{var wrd=dF(),Rrd=MK(),xrd=(e,t,n)=>{let r=null,o=null,s=null;try{s=new Rrd(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===1)r=i,o=new wrd(r,n)}}),r};ASi.exports=xrd});
export {hSi};
