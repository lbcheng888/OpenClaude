// @ts-nocheck
import {b} from "../runtime.ts";
import {Qrr,N_t} from "./m163.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var tGe;
var Zrr=b(()=>{Qrr();Qrr();Yx();QC();GI();tGe=class tGe extends Rp{constructor(){super(...arguments);this.versions=new N_t(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/agents?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r,...o}=t??{};return this._client.get(Ta`/v1/agents/${e}?beta=true`,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/agents/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/agents?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/agents/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};tGe.Versions=N_t});
export {tGe,Zrr};
