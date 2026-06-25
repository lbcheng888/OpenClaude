// @ts-nocheck
import {b} from "../runtime.ts";
import {wlr,dbt} from "./m165.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var XKe;
var klr=b(()=>{wlr();wlr();dk();oA();u0();XKe=class XKe extends Jd{constructor(){super(...arguments);this.versions=new dbt(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/agents?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r,...o}=t??{};return this._client.get(oa`/v1/agents/${e}?beta=true`,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/agents/${e}?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/agents?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/agents/${e}/archive?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};XKe.Versions=dbt});
export {XKe,klr};
