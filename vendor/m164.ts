// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var ubt;
var vlr=b(()=>{dk();oA();u0();ubt=class ubt extends Jd{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/user_profiles?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"user-profiles-2026-03-24"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/user_profiles/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/user_profiles/${e}?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/user_profiles?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"user-profiles-2026-03-24"].toString()},t?.headers])})}createEnrollmentURL(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/user_profiles/${e}/enrollment_url?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"user-profiles-2026-03-24"].toString()},n?.headers])})}}});
export {ubt,vlr};
