// @ts-nocheck
import {b} from "../runtime.ts";
import {oA,Jd,is} from "./m158.ts";
var Ybe;
var ecr=b(()=>{oA();Ybe=class Ybe extends Jd{create(e,t){let{betas:n,...r}=e;return this._client.post("/v1/complete",{body:r,timeout:this._client._options.timeout??600000,...t,headers:is([{...n?.toString()!=null?{"anthropic-beta":n?.toString()}:void 0},t?.headers]),stream:e.stream??!1})}}});
export {Ybe,ecr};
