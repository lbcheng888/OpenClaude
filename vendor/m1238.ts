// @ts-nocheck
import {x1s,D1s,P1s} from "./m1237.ts";
import {b} from "../runtime.ts";
var O1s=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),L1s=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var tdn=(e)=>Object.assign(x1s(e),O1s(e)),MMu,Xkr=(e)=>Object.assign(D1s(e),L1s(e));
var M1s=b(()=>{P1s();MMu=tdn});
export {O1s,L1s,tdn,MMu,Xkr,M1s};
