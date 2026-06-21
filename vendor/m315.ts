// @ts-nocheck
import {b} from "../runtime.ts";
import {isLocalAgentTask} from "./m305.ts";
import {elr,ZodRealError} from "./m314.ts";
import {_parse,_parseAsync,_safeParse,_safeParseAsync} from "./m256.ts";
var tlr,nlr,rlr,olr;
var slr=b(()=>{isLocalAgentTask();elr();tlr=_parse(ZodRealError),nlr=_parseAsync(ZodRealError),rlr=_safeParse(ZodRealError),olr=_safeParseAsync(ZodRealError)});
export {tlr,nlr,rlr,olr,slr};
