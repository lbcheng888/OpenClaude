// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
var wVr=X((tjh,jKi)=>{var Art=mT();function uNd(e,t,n,r){Art.open(e,"r+",(o,s)=>{if(o)return r(o);Art.futimes(s,t,n,(i)=>{Art.close(s,(a)=>{if(r)r(i||a)})})})}function dNd(e,t,n){let r=Art.openSync(e,"r+");return Art.futimesSync(r,t,n),Art.closeSync(r)}jKi.exports={utimesMillis:uNd,utimesMillisSync:dNd}});
export {wVr};
