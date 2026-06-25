// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,bX} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var cbt;
var Rlr=b(()=>{dk();oA();u0();cbt=class cbt extends Jd{retrieve(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/models/${e}?beta=true`,{...n,headers:is([{...r?.toString()!=null?{"anthropic-beta":r?.toString()}:void 0},n?.headers])})}list(e={},t){let{betas:n,...r}=e??{};return this._client.getAPIList("/v1/models?beta=true",bX,{query:r,...t,headers:is([{...n?.toString()!=null?{"anthropic-beta":n?.toString()}:void 0},t?.headers])})}}});
export {cbt,Rlr};
