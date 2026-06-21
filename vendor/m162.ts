// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var M_t;
var Xrr=b(()=>{Yx();QC();GI();M_t=class M_t extends Rp{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/user_profiles?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"user-profiles-2026-03-24"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/user_profiles/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/user_profiles/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/user_profiles?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"user-profiles-2026-03-24"].toString()},t?.headers])})}createEnrollmentURL(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/user_profiles/${e}/enrollment_url?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}}});
export {M_t,Xrr};
