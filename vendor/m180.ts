// @ts-nocheck
import {b} from "../runtime.ts";
import {_or,X_t} from "./m178.ts";
import {yor,Q_t} from "./m179.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var TLe;
var Tor=b(()=>{_or();_or();yor();yor();Yx();QC();GI();TLe=class TLe extends Rp{constructor(){super(...arguments);this.events=new X_t(this._client),this.resources=new Q_t(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/sessions?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/sessions/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/sessions/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/sessions?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/sessions/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/sessions/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};TLe.Events=X_t;TLe.Resources=Q_t});
export {TLe,Tor};
