// @ts-nocheck
import {wOr} from "./m1700.ts";
import {BYs,XAe} from "./m1679.ts";
import {b} from "../runtime.ts";
import {cse} from "./m1703.ts";
function lri(e){return wOr([{name:"imdsRetryPolicy",retry:({retryCount:t,response:n})=>{if((n===null||n===void 0?void 0:n.status)!==404)return{skipStrategy:!0};return BYs(t,{retryDelayInMs:e.startDelayInMs,maxRetryDelayInMs:lYu})}}],{maxRetries:e.maxRetries})}
var lYu=64000;
var cri=b(()=>{cse();XAe()});
export {lri,lYu,cri};
