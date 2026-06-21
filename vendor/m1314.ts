// @ts-nocheck
import {_Ms,yMs,TMs} from "./m1313.ts";
import {b} from "../runtime.ts";
var SMs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),bMs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var ycn=(e)=>Object.assign(_Ms(e),SMs(e)),NIu,Nvr=(e)=>Object.assign(yMs(e),bMs(e));
var EMs=b(()=>{TMs();NIu=ycn});
export {SMs,bMs,ycn,NIu,Nvr,EMs};
