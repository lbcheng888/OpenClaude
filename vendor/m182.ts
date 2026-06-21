// @ts-nocheck
import {b} from "../runtime.ts";
import {Sor,Z_t} from "./m181.ts";
import {Yx,VT} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {eGe,ZWe} from "./m153.ts";
import {GI,Ta} from "./m157.ts";
var aGe;
var bor=b(()=>{Sor();Sor();Yx();QC();eGe();GI();aGe=class aGe extends Rp{constructor(){super(...arguments);this.versions=new Z_t(this._client)}create(e={},t){let{betas:n,...r}=e??{};return this._client.post("/v1/skills?beta=true",ZWe({body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"skills-2025-10-02"].toString()},t?.headers])},this._client,!1))}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/skills/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/skills?beta=true",VT,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"skills-2025-10-02"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/skills/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"skills-2025-10-02"].toString()},n?.headers])})}};aGe.Versions=Z_t});
export {aGe,bor};
