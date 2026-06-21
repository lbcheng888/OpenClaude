// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var F_t;
var tor=b(()=>{Yx();QC();GI();F_t=class F_t extends Rp{retrieve(e,t,n){let{memory_store_id:r,betas:o,...s}=t;return this._client.get(Ta`/v1/memory_stores/${r}/memory_versions/${e}?beta=true`,{query:s,...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/memory_stores/${e}/memory_versions?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}redact(e,t,n){let{memory_store_id:r,betas:o}=t;return this._client.post(Ta`/v1/memory_stores/${r}/memory_versions/${e}/redact?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {F_t,tor};
