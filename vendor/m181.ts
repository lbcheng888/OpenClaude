// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var vbt;
var zlr=b(()=>{dk();oA();u0();vbt=class vbt extends Jd{retrieve(e,t,n){let{session_id:r,betas:o}=t;return this._client.get(oa`/v1/sessions/${r}/resources/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{session_id:r,betas:o,...s}=t;return this._client.post(oa`/v1/sessions/${r}/resources/${e}?beta=true`,{body:s,...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/sessions/${e}/resources?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{session_id:r,betas:o}=t;return this._client.delete(oa`/v1/sessions/${r}/resources/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}add(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/sessions/${e}/resources?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {vbt,zlr};
