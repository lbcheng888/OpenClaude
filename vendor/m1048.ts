// @ts-nocheck
import {xHs,DHs,PHs} from "./m1047.ts";
import {b} from "../runtime.ts";
var OHs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),LHs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Nln=(e)=>Object.assign(xHs(e),OHs(e)),jvu,vvr=(e)=>Object.assign(DHs(e),LHs(e));
var MHs=b(()=>{PHs();jvu=Nln});
export {OHs,LHs,Nln,jvu,vvr,MHs};
