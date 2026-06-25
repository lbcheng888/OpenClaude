// @ts-nocheck
import {bMr,UQs} from "./m1799.ts";
import {qIt,SMr} from "./m1796.ts";
import {dBe,Mgn} from "./m1798.ts";
import {M3,WIt} from "./m1797.ts";
import {MM} from "./m1722.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class CryptoProvider{constructor(){this.pkceGenerator=new bMr,this.guidGenerator=new qIt,this.hashUtils=new dBe}base64UrlEncode(){throw Error("Method not implemented.")}encodeKid(){throw Error("Method not implemented.")}createNewGuid(){return this.guidGenerator.generateGuid()}base64Encode(e){return M3.base64Encode(e)}base64Decode(e){return M3.base64Decode(e)}generatePkceCodes(){return this.pkceGenerator.generatePkceCodes()}getPublicKeyThumbprint(){throw Error("Method not implemented.")}removeTokenBindingKey(){throw Error("Method not implemented.")}clearKeystore(){throw Error("Method not implemented.")}signJwt(){throw Error("Method not implemented.")}async hashString(e){return M3.base64EncodeUrl(this.hashUtils.sha256(e).toString(MM.BASE64),MM.BASE64)}}
var GIt=b(()=>{iT();SMr();WIt();UQs();Mgn();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {CryptoProvider,GIt};
