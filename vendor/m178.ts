// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var X_t;
var _or=b(()=>{Yx();QC();GI();X_t=class X_t extends Rp{list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/sessions/${e}/events?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}send(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/sessions/${e}/events?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}stream(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/sessions/${e}/events/stream?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers]),stream:!0})}}});
export {X_t,_or};
