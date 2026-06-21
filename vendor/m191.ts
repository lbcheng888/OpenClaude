// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,EX} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var uGe;
var Nor=b(()=>{Yx();QC();GI();uGe=class uGe extends Rp{retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/models/${e}`,{...n,headers:Ss([{...r?.toString()!=null?{"anthropic-beta":r?.toString()}:void 0},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/models",EX,{query:r,...t,headers:Ss([{...n?.toString()!=null?{"anthropic-beta":n?.toString()}:void 0},t?.headers])})}}});
export {uGe,Nor};
