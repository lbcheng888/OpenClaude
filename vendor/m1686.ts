// @ts-nocheck
import {cGs,KHr} from "./m1683.ts";
import {Upn,pGs} from "./m1685.ts";
import {b} from "../runtime.ts";
function bNu(){return{end:()=>{},isRecording:()=>!1,recordException:()=>{},setAttribute:()=>{},setStatus:()=>{},addEvent:()=>{}}}
function ENu(){return{createRequestHeaders:()=>({}),parseTraceparentHeader:()=>{return},startSpan:(e,t)=>({span:bNu(),tracingContext:cGs({parentContext:t.tracingContext})}),withContext(e,t,...n){return t(...n)}}}
function Qwt(){if(!Upn.instrumenterImplementation)Upn.instrumenterImplementation=ENu();return Upn.instrumenterImplementation}
var mGs=b(()=>{KHr();pGs()});
export {bNu,ENu,Qwt,mGs};
