// @ts-nocheck
import {formatFileSize,Xo} from "./m240.ts";
import {b} from "../runtime.ts";
function K9(){if(!Kcr)Kcr=require("perf_hooks").performance;return Kcr}
function RX(e){return e.toFixed(3)}
function tQt(e,t,n,r,o,s,i=""){let a=r?` | RSS: ${formatFileSize(r.rss)}, Heap: ${formatFileSize(r.heapUsed)}`:"";return`[+${RX(e).padStart(o)}ms] (+${RX(t).padStart(s)}ms) ${n}${i}${a}`}
var Kcr=null;
var nQt=b(()=>{Xo()});
export {K9,RX,tQt,Kcr,nQt};
