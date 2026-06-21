// @ts-nocheck
import {F1e,pCr} from "./m1206.ts";
import {b} from "../runtime.ts";
var eIs=(e)=>e.protocol==="ws:"||e.protocol==="wss:";
class mCr{signer;constructor(e){this.signer=e.signer}presign(e,t={}){return this.signer.presign(e,t)}async sign(e,t){if(F1e.isInstance(e)&&eIs(e))return{...await this.signer.presign({...e,body:""},{...t,expiresIn:60,unsignableHeaders:new Set(Object.keys(e.headers).filter((r)=>r!=="host"))}),body:e.body};else return this.signer.sign(e,t)}}
var tIs=b(()=>{pCr()});
export {eIs,mCr,tIs};
