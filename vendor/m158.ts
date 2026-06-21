// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var I_t;
var Krr=b(()=>{Yx();QC();GI();I_t=class I_t extends Rp{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/environments?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/environments/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/environments/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/environments?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/environments/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/environments/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {I_t,Krr};
