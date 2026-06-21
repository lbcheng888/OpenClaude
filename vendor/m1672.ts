// @ts-nocheck
import {UWs,$Ws} from "./m1671.ts";
import {b} from "../runtime.ts";
function WHr(e,t){let n,{abortSignal:r,abortErrorMsg:o}=t!==null&&t!==void 0?t:{};return UWs((s)=>{n=setTimeout(s,e)},{cleanupBeforeAbort:()=>clearTimeout(n),abortSignal:r,abortErrorMsg:o!==null&&o!==void 0?o:SNu})}
var SNu="The delay was aborted.";
var qWs=b(()=>{$Ws()});
export {WHr,SNu,qWs};
