// @ts-nocheck
import {useClock} from "./m2432.ts";
import {formatDuration,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function fileReadTool(e,t,n=1000,r=0,o){let s=useClock(),i=()=>formatDuration(Math.max(0,(o??Date.now())-e-r)),a=PUn.useCallback((l)=>{if(!t)return()=>{};let c,u=()=>{try{l()}finally{c=s.setTimeout(u,n)}};return c=s.setTimeout(u,n),()=>c()},[t,n,s]);return PUn.useSyncExternalStore(a,i,i)}
var PUn;
var gct=b(()=>{ze();ps();PUn=M(Te(),1)});
export {fileReadTool,PUn,gct};
