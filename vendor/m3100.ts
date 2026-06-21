// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
var UVr=X((Djh,FYi)=>{var yrt=mT();function cFd(e,t,n,r){yrt.open(e,"r+",(o,s)=>{if(o)return r(o);yrt.futimes(s,t,n,(i)=>{yrt.close(s,(a)=>{if(r)r(i||a)})})})}function uFd(e,t,n){let r=yrt.openSync(e,"r+");return yrt.futimesSync(r,t,n),yrt.closeSync(r)}FYi.exports={utimesMillis:cFd,utimesMillisSync:uFd}});
export {UVr};
