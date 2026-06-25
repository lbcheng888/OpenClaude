// @ts-nocheck
import {oJs,COr} from "./m1688.ts";
import {Ehn,aJs} from "./m1690.ts";
import {b} from "../runtime.ts";
function $6u(){return{end:()=>{},isRecording:()=>!1,recordException:()=>{},setAttribute:()=>{},setStatus:()=>{},addEvent:()=>{}}}
function q6u(){return{createRequestHeaders:()=>({}),parseTraceparentHeader:()=>{return},startSpan:(e,t)=>({span:$6u(),tracingContext:oJs({parentContext:t.tracingContext})}),withContext(e,t,...n){return t(...n)}}}
function RHt(){if(!Ehn.instrumenterImplementation)Ehn.instrumenterImplementation=q6u();return Ehn.instrumenterImplementation}
var lJs=b(()=>{COr();aJs()});
export {$6u,q6u,RHt,lJs};
