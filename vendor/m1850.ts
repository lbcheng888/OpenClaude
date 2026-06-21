// @ts-nocheck
import {X} from "../runtime.ts";
import {JB} from "./m1820.ts";
import {initSessionMetadataPersistence} from "./m1845.ts";
var pYs=X((QNA,dYs)=>{var Q$u=JB(),Z$u=initSessionMetadataPersistence(),e9u=(e,t,n)=>{let r=null,o=null,s=null;try{s=new Z$u(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===1)r=i,o=new Q$u(r,n)}}),r};dYs.exports=e9u});
export {pYs};
