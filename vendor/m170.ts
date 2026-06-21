// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,EX} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {ror,nGe} from "./m169.ts";
import {zde} from "./m168.ts";
import {GI,Ta} from "./m157.ts";
import {mi} from "./m135.ts";
var U_t;
var oor=b(()=>{Yx();QC();ror();zde();GI();U_t=class U_t extends Rp{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/messages/batches?beta=true",{body:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"message-batches-2024-09-24"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(Ta`/v1/messages/batches/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/messages/batches?beta=true",EX,{query:r,...t,headers:Ss([{"anthropic-beta":[...n??[],"message-batches-2024-09-24"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(Ta`/v1/messages/batches/${e}?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}cancel(e,t={},n){let{betas:r}=t??{};return this._client.post(Ta`/v1/messages/batches/${e}/cancel?beta=true`,{...n,headers:Ss([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}async results(e,t={},n){let r=await this.retrieve(e);if(!r.results_url)throw new mi(`No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`);let{betas:o}=t??{};return this._client.get(r.results_url,{...n,headers:Ss([{"anthropic-beta":[...o??[],"message-batches-2024-09-24"].toString(),Accept:"application/binary"},n?.headers]),stream:!0,__binaryResponse:!0})._thenUnwrap((s,i)=>nGe.fromResponse(i.response,i.controller))}}});
export {U_t,oor};
