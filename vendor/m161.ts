// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,EX} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var L_t;
var Jrr=b(()=>{Yx();QC();GI();L_t=class L_t extends Rp{retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/models/${e}?beta=true`,{...n,headers:Ss([{...r?.toString()!=null?{"anthropic-beta":r?.toString()}:void 0},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/models?beta=true",EX,{query:r,...t,headers:Ss([{...n?.toString()!=null?{"anthropic-beta":n?.toString()}:void 0},t?.headers])})}}});
export {L_t,Jrr};
