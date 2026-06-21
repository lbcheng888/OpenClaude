// @ts-nocheck
import {NEs,BEs,FEs} from "./m1042.ts";
import {b} from "../runtime.ts";
var UEs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),$Es=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var ein=(e)=>Object.assign(NEs(e),UEs(e)),Dhu,XSr=(e)=>Object.assign(BEs(e),$Es(e));
var qEs=b(()=>{FEs();Dhu=ein});
export {UEs,$Es,ein,Dhu,XSr,qEs};
