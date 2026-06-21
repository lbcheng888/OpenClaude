// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var eyt;
var Eor=b(()=>{Yx();QC();GI();eyt=class eyt extends Rp{create(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/vaults/${e}/credentials?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}retrieve(e,t,n){let{vault_id:r,betas:o}=t;return this._client.get(Ta`/v1/vaults/${r}/credentials/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{vault_id:r,betas:o,...s}=t;return this._client.post(Ta`/v1/vaults/${r}/credentials/${e}?beta=true`,{body:s,...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/vaults/${e}/credentials?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}delete(e,t,n){let{vault_id:r,betas:o}=t;return this._client.delete(Ta`/v1/vaults/${r}/credentials/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t,n){let{vault_id:r,betas:o}=t;return this._client.post(Ta`/v1/vaults/${r}/credentials/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {eyt,Eor};
