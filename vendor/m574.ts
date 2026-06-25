// @ts-nocheck
import {b} from "../runtime.ts";
function Wes(e){let t,n=e.startsWith("//")?`https:${e}`:e;try{t=new URL(n).hostname}catch{t=e.match(/^[^/:]+/)?.[0]??e}return t.endsWith(".")?t.slice(0,-1):t}
function orn(e){return FVc.test(Wes(e))}
function g1e(e){return BVc.test(Wes(e))}
var FVc,BVc;
var Xze=b(()=>{FVc=/(^|\.)(anthropic\.com|claude\.ai|claude\.com)$/i,BVc=/(^|\.)downloads\.claude\.ai$/i});
export {Wes,orn,g1e,FVc,BVc,Xze};
