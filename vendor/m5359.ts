// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function BJn(e){return Djl.useMemo(()=>{let t=e.find((o)=>o.name==="ide");if(!t)return{status:null,ideName:null};let n=t.config,r=n.type==="sse-ide"||n.type==="ws-ide"?n.ideName:null;if(t.type==="connected")return{status:"connected",ideName:r};if(t.type==="pending")return{status:"pending",ideName:r};return{status:"disconnected",ideName:r}},[e])}
var Djl;
var bOo=b(()=>{Djl=M(Te(),1)});
export {BJn,Djl,bOo};
