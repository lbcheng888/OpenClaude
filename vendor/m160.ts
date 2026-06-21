// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,EX} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {P_t,D$o} from "./m159.ts";
import {eGe,ZWe} from "./m153.ts";
import {GI,Ta} from "./m157.ts";
var O_t;
var Yrr=b(()=>{Yx();QC();P_t();eGe();GI();O_t=class O_t extends Rp{list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/files?beta=true",EX,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"files-api-2025-04-14"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/files/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString()},n?.headers])})}download(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/files/${e}/content?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString(),Accept:"application/binary"},n?.headers]),__binaryResponse:!0})}retrieveMetadata(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/files/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString()},n?.headers])})}upload(e,t){let{betas:n,...r}=e;return this._client.post("/v1/files?beta=true",ZWe({body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"files-api-2025-04-14"].toString()},D$o(r.file),t?.headers])},this._client))}}});
export {O_t,Yrr};
