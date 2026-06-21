// @ts-nocheck
import {na,clone} from "./m254.ts";
import {b} from "../runtime.ts";
import {isLocalAgentTask} from "./m305.ts";
import {Var} from "./m306.ts";
import {$constructor} from "./m253.ts";
import {$ZodType,$ZodObject} from "./m260.ts";
import {parse,safeParse,parseAsync,safeParseAsync} from "./m256.ts";
function Kar(e,t){let n={type:"object",get shape(){return na.assignProp(this,"shape",{...e}),this.shape},...na.normalizeParams(t)};return new ubc(n)}
var cbc,ubc;
var yqo=b(()=>{isLocalAgentTask();isLocalAgentTask();Var();cbc=$constructor("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");$ZodType.init(e,t),e.def=t,e.parse=(n,r)=>parse(e,n,r,{callee:e.parse}),e.safeParse=(n,r)=>safeParse(e,n,r),e.parseAsync=async(n,r)=>parseAsync(e,n,r,{callee:e.parseAsync}),e.safeParseAsync=async(n,r)=>safeParseAsync(e,n,r),e.check=(...n)=>e.clone({...t,checks:[...t.checks??[],...n.map((r)=>typeof r==="function"?{_zod:{check:r,def:{check:"custom"},onattach:[]}}:r)]}),e.clone=(n,r)=>clone(e,n,r),e.brand=()=>e,e.register=(n,r)=>(n.add(e,r),e)}),ubc=$constructor("ZodMiniObject",(e,t)=>{$ZodObject.init(e,t),cbc.init(e,t),na.defineLazy(e,"shape",()=>t.shape)})});
export {Kar,cbc,ubc,yqo};
