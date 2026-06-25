// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,bX} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {Dlr,QKe} from "./m171.ts";
import {npe} from "./m170.ts";
import {u0,oa} from "./m159.ts";
import {Qs} from "./m137.ts";
var fbt;
var Plr=b(()=>{dk();oA();Dlr();npe();u0();fbt=class fbt extends Jd{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/messages/batches?beta=true",{body:r,...t,headers:is([{"anthropic-beta":[...n??[],"message-batches-2024-09-24"].toString()},t?.headers])})}retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/messages/batches/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/messages/batches?beta=true",bX,{query:r,...t,headers:is([{"anthropic-beta":[...n??[],"message-batches-2024-09-24"].toString()},t?.headers])})}delete(e,t={},n){let{betas:r}=t??{};return this._client.delete(oa`/v1/messages/batches/${e}?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}cancel(e,t={},n){let{betas:r}=t??{};return this._client.post(oa`/v1/messages/batches/${e}/cancel?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString()},n?.headers])})}async results(e,t={},n){let r=await this.retrieve(e);if(!r.results_url)throw new Qs(`No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`);let{betas:o}=t??{};return this._client.get(r.results_url,{...n,headers:is([{"anthropic-beta":[...o??[],"message-batches-2024-09-24"].toString(),Accept:"application/binary"},n?.headers]),stream:!0,__binaryResponse:!0})._thenUnwrap((s,i)=>QKe.fromResponse(i.response,i.controller))}}});
export {fbt,Plr};
