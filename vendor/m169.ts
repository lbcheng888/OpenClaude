// @ts-nocheck
import {b} from "../runtime.ts";
import {Hlr,pbt} from "./m167.ts";
import {Ilr,mbt} from "./m168.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var dMe;
var xlr=b(()=>{Hlr();Hlr();Ilr();Ilr();dk();oA();u0();dMe=class dMe extends Jd{constructor(){super(...arguments);this.memories=new pbt(this._client),this.memoryVersions=new mbt(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/memory_stores?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/memory_stores/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/memory_stores/${e}?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/memory_stores?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/memory_stores/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/memory_stores/${e}/archive?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};dMe.Memories=pbt;dMe.MemoryVersions=mbt});
export {dMe,xlr};
