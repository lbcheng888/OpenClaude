// @ts-nocheck
import {b} from "../runtime.ts";
import {eor,B_t} from "./m165.ts";
import {tor,F_t} from "./m166.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {GI,Ta} from "./m157.ts";
var gLe;
var nor=b(()=>{eor();eor();tor();tor();Yx();QC();GI();gLe=class gLe extends Rp{constructor(){super(...arguments);this.memories=new B_t(this._client),this.memoryVersions=new F_t(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/memory_stores?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/memory_stores/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(Ta`/v1/memory_stores/${e}?beta=true`,{body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/memory_stores?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/memory_stores/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/memory_stores/${e}/archive?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};gLe.Memories=B_t;gLe.MemoryVersions=F_t});
export {gLe,nor};
