// @ts-nocheck
import {X} from "../runtime.ts";
import {LJe} from "./m1809.ts";
var dDr=X((mNA,qKs)=>{var p2u=LJe();qKs.exports=function(e,t){t=t||{};var n=p2u.decode(e,t);if(!n)return null;var r=n.payload;if(typeof r==="string")try{var o=JSON.parse(r);if(o!==null&&typeof o==="object")r=o}catch(s){}if(t.complete===!0)return{header:n.header,payload:r,signature:n.signature};return r}});
export {dDr};
