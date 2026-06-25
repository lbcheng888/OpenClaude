// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,bX} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {Dlr,QKe} from "./m171.ts";
import {npe} from "./m170.ts";
import {u0,oa} from "./m159.ts";
import {Qs} from "./m137.ts";
var Mbt;
var ccr=b(()=>{dk();oA();Dlr();npe();u0();Mbt=class Mbt extends Jd{create(e,t){return this._client.post("/v1/messages/batches",{body:e,...t})}retrieve(e,t){return this._client.get(oa`/v1/messages/batches/${e}`,t)}list(e={},t){return this._client.getAPIList("/v1/messages/batches",bX,{query:e,...t})}delete(e,t){return this._client.delete(oa`/v1/messages/batches/${e}`,t)}cancel(e,t){return this._client.post(oa`/v1/messages/batches/${e}/cancel`,t)}async results(e,t){let n=await this.retrieve(e);if(!n.results_url)throw new Qs(`No batch \`results_url\`; Has it finished processing? ${n.processing_status} - ${n.id}`);return this._client.get(n.results_url,{...t,headers:is([{Accept:"application/binary"},t?.headers]),stream:!0,__binaryResponse:!0})._thenUnwrap((r,o)=>QKe.fromResponse(o.response,o.controller))}}});
export {Mbt,ccr};
