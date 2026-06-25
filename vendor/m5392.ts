// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Ner(e){return mYl.useMemo(()=>{let t=e.find((o)=>o.name==="ide");if(!t)return{status:null,ideName:null};let n=t.config,r=n.type==="sse-ide"||n.type==="ws-ide"?n.ideName:null;if(t.type==="connected")return{status:"connected",ideName:r};if(t.type==="pending")return{status:"pending",ideName:r};return{status:"disconnected",ideName:r}},[e])}
var mYl;
var $Fo=b(()=>{mYl=x(et(),1)});
export {Ner,mYl,$Fo};
