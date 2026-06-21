// @ts-nocheck
import {XHr} from "./m1695.ts";
import {WWs,fCe} from "./m1674.ts";
import {b} from "../runtime.ts";
import {use} from "./m1698.ts";
function mXs(e){return XHr([{name:"imdsRetryPolicy",retry:({retryCount:t,response:n})=>{if((n===null||n===void 0?void 0:n.status)!==404)return{skipStrategy:!0};return WWs(t,{retryDelayInMs:e.startDelayInMs,maxRetryDelayInMs:jqu})}}],{maxRetries:e.maxRetries})}
var jqu=64000;
var fXs=b(()=>{use();fCe()});
export {mXs,jqu,fXs};
