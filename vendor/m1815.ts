// @ts-nocheck
import {Q} from "../runtime.ts";
import {PQe} from "./m1814.ts";
var $Mr=Q((L8h,NZs)=>{var xGu=PQe();NZs.exports=function(e,t){t=t||{};var n=xGu.decode(e,t);if(!n)return null;var r=n.payload;if(typeof r==="string")try{var o=JSON.parse(r);if(o!==null&&typeof o==="object")r=o}catch(s){}if(t.complete===!0)return{header:n.header,payload:r,signature:n.signature};return r}});
export {$Mr};
