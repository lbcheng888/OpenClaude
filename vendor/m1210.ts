// @ts-nocheck
import {mCr,tIs} from "./m1209.ts";
import {b} from "../runtime.ts";
var nIs=(e)=>{let{signer:t}=e;return Object.assign(e,{signer:async(n)=>{let r=await t(n);if(hRu(r))return new mCr({signer:r});throw Error("Expected WebsocketSignatureV4 signer, please check the client constructor.")}})},hRu=(e)=>!!e;
var rIs=b(()=>{tIs()});
export {nIs,hRu,rIs};
