// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var N_t;
var Qrr=b(()=>{Yx();QC();GI();N_t=class N_t extends Rp{list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/agents/${e}/versions?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {N_t,Qrr};
