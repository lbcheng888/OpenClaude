// @ts-nocheck
import {b1,Ho} from "./m1717.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
class g4{static base64Encode(e,t){return Buffer.from(e,t).toString(b1.BASE64)}static base64EncodeUrl(e,t){return g4.base64Encode(e,t).replace(/=/g,Ho.EMPTY_STRING).replace(/\+/g,"-").replace(/\//g,"_")}static base64Decode(e){return Buffer.from(e,b1.BASE64).toString("utf8")}static base64DecodeUrl(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");while(t.length%4)t+="=";return g4.base64Decode(t)}}
var hxt=b(()=>{AT();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {g4,hxt};
