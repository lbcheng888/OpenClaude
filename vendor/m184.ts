// @ts-nocheck
import {b} from "../runtime.ts";
import {Ylr,wbt} from "./m183.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {JKe,YKe} from "./m155.ts";
import {u0,oa} from "./m159.ts";
var r7e;
var Jlr=b(()=>{Ylr();Ylr();dk();oA();JKe();u0();r7e=class r7e extends Jd{constructor(){super(...arguments);this.versions=new wbt(this._client)}create(e={},t){let{betas:n,...r}=e??{};return this._client.post("/v1/skills?beta=true",YKe({body:r,...t,headers:is([{"anthropic-beta":[...n??[],"skills-2025-10-02"].toString()},t?.headers])},this._client,!1))}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/skills/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/skills?beta=true",UT,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"skills-2025-10-02"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/skills/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}};r7e.Versions=wbt});
export {r7e,Jlr};
