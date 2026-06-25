// @ts-nocheck
import {$ZodError,formatError,flattenError} from "./m257.ts";
import {b} from "../runtime.ts";
import {NP} from "./m307.ts";
import {$constructor} from "./m255.ts";
var AVo=(e,t)=>{$ZodError.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:(n)=>formatError(e,n)},flatten:{value:(n)=>flattenError(e,n)},addIssue:{value:(n)=>e.issues.push(n)},addIssues:{value:(n)=>e.issues.push(...n)},isEmpty:{get(){return e.issues.length===0}}})},ize,ZodRealError;
var wpr=b(()=>{NP();NP();ize=$constructor("ZodError",AVo),ZodRealError=$constructor("ZodError",AVo,{Parent:Error})});
export {AVo,ize,ZodRealError,wpr};
