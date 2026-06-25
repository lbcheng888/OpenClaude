// @ts-nocheck
import {useClock} from "./m2442.ts";
import {formatDuration,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function SY(e,t,n=1000,r=0,o){let s=useClock(),i=()=>formatDuration(Math.max(0,(o??Date.now())-e-r)),a=g3n.useCallback((l)=>{if(!t)return()=>{};let c,u=()=>{try{l()}finally{c=s.setTimeout(u,n)}};return c=s.setTimeout(u,n),()=>c()},[t,n,s]);return g3n.useSyncExternalStore(a,i,i)}
var g3n;
var xdt=b(()=>{je();Xo();g3n=x(et(),1)});
export {SY,g3n,xdt};
