// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
var aJr=Q((GQg,Mea)=>{var Tst=oT();function V6d(e,t,n,r){Tst.open(e,"r+",(o,s)=>{if(o)return r(o);Tst.futimes(s,t,n,(i)=>{Tst.close(s,(a)=>{if(r)r(i||a)})})})}function K6d(e,t,n){let r=Tst.openSync(e,"r+");return Tst.futimesSync(r,t,n),Tst.closeSync(r)}Mea.exports={utimesMillis:V6d,utimesMillisSync:K6d}});
export {aJr};
