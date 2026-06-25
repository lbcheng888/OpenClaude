// @ts-nocheck
import {n4s,r4s,o4s} from "./m1377.ts";
import {b} from "../runtime.ts";
var s4s=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),i4s=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var xpn=(e)=>Object.assign(n4s(e),s4s(e)),p2u,BIr=(e)=>Object.assign(r4s(e),i4s(e));
var a4s=b(()=>{o4s();p2u=xpn});
export {s4s,i4s,xpn,p2u,BIr,a4s};
