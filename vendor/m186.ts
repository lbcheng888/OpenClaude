// @ts-nocheck
import {b} from "../runtime.ts";
import {Xlr,kbt} from "./m185.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var o7e;
var Qlr=b(()=>{Xlr();Xlr();dk();oA();u0();o7e=class o7e extends Jd{constructor(){super(...arguments);this.credentials=new kbt(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/vaults?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/vaults/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/vaults/${e}?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/vaults?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/vaults/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/vaults/${e}/archive?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};o7e.Credentials=kbt});
export {o7e,Qlr};
