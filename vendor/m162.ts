// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,bX} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {abt,C5o} from "./m161.ts";
import {JKe,YKe} from "./m155.ts";
import {u0,oa} from "./m159.ts";
var lbt;
var Alr=b(()=>{dk();oA();abt();JKe();u0();lbt=class lbt extends Jd{list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/files?beta=true",bX,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"files-api-2025-04-14"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/files/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString()},n?.headers])})}download(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/files/${e}/content?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString(),Accept:"application/binary"},n?.headers]),__binaryResponse:!0})}retrieveMetadata(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/files/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"files-api-2025-04-14"].toString()},n?.headers])})}upload(e,t){let{betas:n,...r}=e;return this._client.post("/v1/files?beta=true",YKe({body:r,...t,headers:is([{"anthropic-beta":[...n??[],"files-api-2025-04-14"].toString()},C5o(r.file),t?.headers])},this._client))}}});
export {lbt,Alr};
