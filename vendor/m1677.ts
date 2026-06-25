// @ts-nocheck
import {LYs,MYs} from "./m1676.ts";
import {b} from "../runtime.ts";
function SOr(e,t){let n,{abortSignal:r,abortErrorMsg:o}=t!==null&&t!==void 0?t:{};return LYs((s)=>{n=setTimeout(s,e)},{cleanupBeforeAbort:()=>clearTimeout(n),abortSignal:r,abortErrorMsg:o!==null&&o!==void 0?o:U6u})}
var U6u="The delay was aborted.";
var NYs=b(()=>{MYs()});
export {SOr,U6u,NYs};
