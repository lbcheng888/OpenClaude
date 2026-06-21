// @ts-nocheck
import {b} from "../runtime.ts";
import {Eor,eyt} from "./m183.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var lGe;
var Cor=b(()=>{Eor();Eor();Yx();QC();GI();lGe=class lGe extends Rp{constructor(){super(...arguments);this.credentials=new eyt(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/vaults?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/vaults/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/vaults/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/vaults?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/vaults/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/vaults/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};lGe.Credentials=eyt});
export {lGe,Cor};
