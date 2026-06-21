// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {eGe,ZWe} from "./m153.ts";
import {GI,Ta} from "./m157.ts";
var Z_t;
var Sor=b(()=>{Yx();QC();eGe();GI();Z_t=class Z_t extends Rp{create(e,t={},n){let{betas:r,...o}=t??{};return this._client.post(Ta`/v1/skills/${e}/versions?beta=true`,ZWe({body:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])},this._client))}retrieve(e,t,n){let{skill_id:r,betas:o}=t;return this._client.get(Ta`/v1/skills/${r}/versions/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"skills-2025-10-02"].toString()},n?.headers])})}list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(Ta`/v1/skills/${e}/versions?beta=true`,VT,{query:o,...n,headers:Ss([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}delete(e,t,n){let{skill_id:r,betas:o}=t;return this._client.delete(Ta`/v1/skills/${r}/versions/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...o??[],"skills-2025-10-02"].toString()},n?.headers])})}}});
export {Z_t,Sor};
