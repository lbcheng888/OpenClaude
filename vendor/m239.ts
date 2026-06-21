// @ts-nocheck
import {formatFileSize,ps} from "./m238.ts";
import {b} from "../runtime.ts";
function R3(){if(!_sr)_sr=require("perf_hooks").performance;return _sr}
function xX(e){return e.toFixed(3)}
function bYt(e,t,n,r,o,s,i=""){let a=r?` | RSS: ${formatFileSize(r.rss)}, Heap: ${formatFileSize(r.heapUsed)}`:"";return`[+${xX(e).padStart(o)}ms] (+${xX(t).padStart(s)}ms) ${n}${i}${a}`}
var _sr=null;
var EYt=b(()=>{ps()});
export {R3,xX,bYt,_sr,EYt};
