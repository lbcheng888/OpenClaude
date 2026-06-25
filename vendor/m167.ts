// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var pbt;
var Hlr=b(()=>{dk();oA();u0();pbt=class pbt extends Jd{create(e,t,n){let{view:r,betas:o,...s}=t;return this._client.post(oa`/v1/memory_stores/${e}/memories?beta=true`,{query:{view:r},body:s,...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}retrieve(e,t,n){let{memory_store_id:r,betas:o,...s}=t;return this._client.get(oa`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:s,...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{memory_store_id:r,view:o,betas:s,...i}=t;return this._client.post(oa`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:{view:o},body:i,...n,headers:is([{"anthropic-beta":[...s??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/memory_stores/${e}/memories?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{memory_store_id:r,expected_content_sha256:o,betas:s}=t;return this._client.delete(oa`/v1/memory_stores/${r}/memories/${e}?beta=true`,{query:{expected_content_sha256:o},...n,headers:is([{"anthropic-beta":[...s??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {pbt,Hlr};
