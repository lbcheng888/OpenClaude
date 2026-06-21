// @ts-nocheck
import {$ZodError,formatError,flattenError} from "./m255.ts";
import {b} from "../runtime.ts";
import {isLocalAgentTask} from "./m305.ts";
import {$constructor} from "./m253.ts";
var kqo=(e,t)=>{$ZodError.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:(n)=>formatError(e,n)},flatten:{value:(n)=>flattenError(e,n)},addIssue:{value:(n)=>e.issues.push(n)},addIssues:{value:(n)=>e.issues.push(...n)},isEmpty:{get(){return e.issues.length===0}}})},BTt,ZodRealError;
var elr=b(()=>{isLocalAgentTask();isLocalAgentTask();BTt=$constructor("ZodError",kqo),ZodRealError=$constructor("ZodError",kqo,{Parent:Error})});
export {kqo,BTt,ZodRealError,elr};
