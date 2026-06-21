// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var B_t;
var eor=b(()=>{Yx();QC();GI();B_t=class B_t extends Rp{create(e,t,n){let{view:r,betas:o,...s}=t;return this._client.post(Ta`/v1/memory_stores/${e}/memories?beta=true`,{query:{view:r},body:s,...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}retrieve(e,t,n){let{memory_store_id:r,betas:o,...s}=t;return this._client.get(Ta`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:s,...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{memory_store_id:r,view:o,betas:s,...i}=t;return this._client.post(Ta`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:{view:o},body:i,...n,headers:Ss([{"anthropic-beta":[...s??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/memory_stores/${e}/memories?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{memory_store_id:r,expected_content_sha256:o,betas:s}=t;return this._client.delete(Ta`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:{expected_content_sha256:o},...n,headers:Ss([{"anthropic-beta":[...s??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {B_t,eor};
