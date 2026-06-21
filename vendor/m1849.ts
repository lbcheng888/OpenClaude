// @ts-nocheck
import {X} from "../runtime.ts";
import {JB} from "./m1820.ts";
import {initSessionMetadataPersistence} from "./m1845.ts";
var uYs=X((XNA,cYs)=>{var Y$u=JB(),J$u=initSessionMetadataPersistence(),X$u=(e,t,n)=>{let r=null,o=null,s=null;try{s=new J$u(t,n)}catch(i){return null}return e.forEach((i)=>{if(s.test(i)){if(!r||o.compare(i)===-1)r=i,o=new Y$u(r,n)}}),r};cYs.exports=X$u});
export {uYs};
