// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var kbt;
var Xlr=b(()=>{dk();oA();u0();kbt=class kbt extends Jd{create(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/vaults/${e}/credentials?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}retrieve(e,t,n){let{vault_id:r,betas:o}=t;return this._client.get(oa`/v1/vaults/${r}/credentials/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{vault_id:r,betas:o,...s}=t;return this._client.post(oa`/v1/vaults/${r}/credentials/${e}?beta=true`,{body:s,...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/vaults/${e}/credentials?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{vault_id:r,betas:o}=t;return this._client.delete(oa`/v1/vaults/${r}/credentials/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t,n){let{vault_id:r,betas:o}=t;return this._client.post(oa`/v1/vaults/${r}/credentials/${e}/archive?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {kbt,Xlr};
