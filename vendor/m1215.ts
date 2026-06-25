// @ts-nocheck
import {qkr,YLs} from "./m1214.ts";
import {b} from "../runtime.ts";
var JLs=(e)=>{let{signer:t}=e;return Object.assign(e,{signer:async(n)=>{let r=await t(n);if(DMu(r))return new qkr({signer:r});throw Error("Expected WebsocketSignatureV4 signer, please check the client constructor.")}})},DMu=(e)=>!!e;
var XLs=b(()=>{YLs()});
export {JLs,DMu,XLs};
