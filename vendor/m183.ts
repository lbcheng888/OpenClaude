// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {JKe,YKe} from "./m155.ts";
import {u0,oa} from "./m159.ts";
var wbt;
var Ylr=b(()=>{dk();oA();JKe();u0();wbt=class wbt extends Jd{create(e,t={},n){let{betas:r,...o}=t??{};return this._client.post(oa`/v1/skills/${e}/versions?beta=true`,YKe({body:o,...n,headers:is([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])},this._client))}retrieve(e,t,n){let{skill_id:r,betas:o}=t;return this._client.get(oa`/v1/skills/${r}/versions/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"skills-2025-10-02"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/skills/${e}/versions?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}delete(e,t,n){let{skill_id:r,betas:o}=t;return this._client.delete(oa`/v1/skills/${r}/versions/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...o??[],"skills-2025-10-02"].toString()},n?.headers])})}}});
export {wbt,Ylr};
