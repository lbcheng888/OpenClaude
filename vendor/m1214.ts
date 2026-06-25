// @ts-nocheck
import {DNe,$kr} from "./m1211.ts";
import {b} from "../runtime.ts";
var jLs=(e)=>e.protocol==="ws:"||e.protocol==="wss:";
class qkr{signer;constructor(e){this.signer=e.signer}presign(e,t={}){return this.signer.presign(e,t)}async sign(e,t){if(DNe.isInstance(e)&&jLs(e))return{...await this.signer.presign({...e,body:""},{...t,expiresIn:60,unsignableHeaders:new Set(Object.keys(e.headers).filter((r)=>r!=="host"))}),body:e.body};else return this.signer.sign(e,t)}}
var YLs=b(()=>{$kr()});
export {jLs,qkr,YLs};
