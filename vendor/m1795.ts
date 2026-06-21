// @ts-nocheck
import {G0r,G7s} from "./m1794.ts";
import {Axt,W0r} from "./m1791.ts";
import {ABe,efn} from "./m1793.ts";
import {g4,hxt} from "./m1792.ts";
import {b1} from "./m1717.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
class CryptoProvider{constructor(){this.pkceGenerator=new G0r,this.guidGenerator=new Axt,this.hashUtils=new ABe}base64UrlEncode(){throw Error("Method not implemented.")}encodeKid(){throw Error("Method not implemented.")}createNewGuid(){return this.guidGenerator.generateGuid()}base64Encode(e){return g4.base64Encode(e)}base64Decode(e){return g4.base64Decode(e)}generatePkceCodes(){return this.pkceGenerator.generatePkceCodes()}getPublicKeyThumbprint(){throw Error("Method not implemented.")}removeTokenBindingKey(){throw Error("Method not implemented.")}clearKeystore(){throw Error("Method not implemented.")}signJwt(){throw Error("Method not implemented.")}async hashString(e){return g4.base64EncodeUrl(this.hashUtils.sha256(e).toString(b1.BASE64),b1.BASE64)}}
var gxt=b(()=>{AT();W0r();hxt();G7s();efn();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {CryptoProvider,gxt};
