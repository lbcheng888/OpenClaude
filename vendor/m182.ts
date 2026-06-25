// @ts-nocheck
import {b} from "../runtime.ts";
import {Klr,Rbt} from "./m180.ts";
import {zlr,vbt} from "./m181.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var fMe;
var jlr=b(()=>{Klr();Klr();zlr();zlr();dk();oA();u0();fMe=class fMe extends Jd{constructor(){super(...arguments);this.events=new Rbt(this._client),this.resources=new vbt(this._client)}create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/sessions?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/sessions/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}update(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/sessions/${e}?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/sessions?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"managed-agents-2026-04-01"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/sessions/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}archive(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/sessions/${e}/archive?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}};fMe.Events=Rbt;fMe.Resources=vbt});
export {fMe,jlr};
