// @ts-nocheck
import {b} from "../runtime.ts";
import {QC,Rp,Ss} from "./m156.ts";
var fSe;
var wor=b(()=>{QC();fSe=class fSe extends Rp{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/complete",{body:r,timeout:this._client._options.timeout??600000,...t,headers:Ss([{...n?.toString()!=null?{"anthropic-beta":n?.toString()}:void 0},t?.headers]),stream:e.stream??!1})}}});
export {fSe,wor};
