// @ts-nocheck
import {ngs,rgs,ogs} from "./m945.ts";
import {b} from "../runtime.ts";
var sgs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),igs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Zon=(e)=>Object.assign(ngs(e),sgs(e)),hpu,ITr=(e)=>Object.assign(rgs(e),igs(e));
var ags=b(()=>{ogs();hpu=Zon});
export {sgs,igs,Zon,hpu,ITr,ags};
