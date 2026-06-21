// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var Q_t;
var yor=b(()=>{Yx();QC();GI();Q_t=class Q_t extends Rp{retrieve(e,t,n){let{session_id:r,betas:o}=t;return this._client.get(Ta`/v1/sessions/${r}/resources/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{session_id:r,betas:o,...s}=t;return this._client.post(Ta`/v1/sessions/${r}/resources/${e}?beta=true`,{body:s,...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/sessions/${e}/resources?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{session_id:r,betas:o}=t;return this._client.delete(Ta`/v1/sessions/${r}/resources/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}add(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/sessions/${e}/resources?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {Q_t,yor};
