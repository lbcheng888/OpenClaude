// @ts-nocheck
import {Gi,clone} from "./m256.ts";
import {b} from "../runtime.ts";
import {NP} from "./m307.ts";
import {Tpr} from "./m308.ts";
import {$constructor} from "./m255.ts";
import {$ZodType,$ZodObject} from "./m262.ts";
import {parse,safeParse,parseAsync,safeParseAsync} from "./m258.ts";
function Spr(e,t){let n={type:"object",get shape(){return Gi.assignProp(this,"shape",{...e}),this.shape},...Gi.normalizeParams(t)};return new fxc(n)}
var mxc,fxc;
var fVo=b(()=>{NP();NP();Tpr();mxc=$constructor("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");$ZodType.init(e,t),e.def=t,e.parse=(n,r)=>parse(e,n,r,{callee:e.parse}),e.safeParse=(n,r)=>safeParse(e,n,r),e.parseAsync=async(n,r)=>parseAsync(e,n,r,{callee:e.parseAsync}),e.safeParseAsync=async(n,r)=>safeParseAsync(e,n,r),e.check=(...n)=>e.clone({...t,checks:[...t.checks??[],...n.map((r)=>typeof r==="function"?{_zod:{check:r,def:{check:"custom"},onattach:[]}}:r)]}),e.clone=(n,r)=>clone(e,n,r),e.brand=()=>e,e.register=(n,r)=>(n.add(e,r),e)}),fxc=$constructor("ZodMiniObject",(e,t)=>{$ZodObject.init(e,t),mxc.init(e,t),Gi.defineLazy(e,"shape",()=>t.shape)})});
export {Spr,mxc,fxc,fVo};
