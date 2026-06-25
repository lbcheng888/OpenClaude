// @ts-nocheck
import {MM,Co} from "./m1722.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class M3{static base64Encode(e,t){return Buffer.from(e,t).toString(MM.BASE64)}static base64EncodeUrl(e,t){return M3.base64Encode(e,t).replace(/=/g,Co.EMPTY_STRING).replace(/\+/g,"-").replace(/\//g,"_")}static base64Decode(e){return Buffer.from(e,MM.BASE64).toString("utf8")}static base64DecodeUrl(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");while(t.length%4)t+="=";return M3.base64Decode(t)}}
var WIt=b(()=>{iT();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {M3,WIt};
