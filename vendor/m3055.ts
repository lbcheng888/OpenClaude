// @ts-nocheck
import {rYr,y9e} from "./m3030.ts";
import {b,x} from "../runtime.ts";
import {lQi} from "./m3041.ts";
import {FQi} from "./m3054.ts";
function eNt(e,t){return e.split(`
`).flatMap((n)=>UQi.default(n,t,{trim:!1,hard:!0}).split(`
`).map((r)=>r.trimEnd())).join(`
`)}
function A0n(){return BQi.default({defaultWidth:80,output:rYr().output})}
var BQi,UQi;
var R0n=b(()=>{y9e();BQi=x(lQi(),1),UQi=x(FQi(),1)});
export {eNt,A0n,BQi,UQi,R0n};
