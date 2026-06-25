// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
var bJr=Q((bZg,Dna)=>{var Cst=oT();function G8d(e,t,n,r){Cst.open(e,"r+",(o,s)=>{if(o)return r(o);Cst.futimes(s,t,n,(i)=>{Cst.close(s,(a)=>{if(r)r(i||a)})})})}function V8d(e,t,n){let r=Cst.openSync(e,"r+");return Cst.futimesSync(r,t,n),Cst.closeSync(r)}Dna.exports={utimesMillis:G8d,utimesMillisSync:V8d}});
export {bJr};
