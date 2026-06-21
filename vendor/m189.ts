// @ts-nocheck
import {b} from "../runtime.ts";
import {Yx,EX} from "./m152.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {ror,nGe} from "./m169.ts";
import {zde} from "./m168.ts";
import {GI,Ta} from "./m157.ts";
import {mi} from "./m135.ts";
var lyt;
var Lor=b(()=>{Yx();QC();ror();zde();GI();lyt=class lyt extends Rp{create(e,t){return this._client.post("/v1/messages/batches",{body:e,...t})}retrieve(e,t){return this._client.get(Ta`/v1/messages/batches/${e}`,t)}list(e={},t){return this._client.getAPIList("/v1/messages/batches",EX,{query:e,...t})}delete(e,t){return this._client.delete(Ta`/v1/messages/batches/${e}`,t)}cancel(e,t){return this._client.post(Ta`/v1/messages/batches/${e}/cancel`,t)}async results(e,t){let n=await this.retrieve(e);if(!n.results_url)throw new mi(`No batch \`results_url\`; Has it finished processing? ${n.processing_status} - ${n.id}`);return this._client.get(n.results_url,{...t,headers:Ss([{Accept:"application/binary"},t?.headers]),stream:!0,__binaryResponse:!0})._thenUnwrap((r,o)=>nGe.fromResponse(o.response,o.controller))}}});
export {lyt,Lor};
