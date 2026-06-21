// @ts-nocheck
import {X} from "../runtime.ts";
import {Bms} from "./m901.ts";
import {FS} from "./m788.ts";
var ame=X((qms)=>{var nTr=Bms(),Gcu=FS(),Vcu=require("buffer"),Fms=require("crypto");class $ms{algorithmIdentifier;secret;hash;constructor(e,t){this.algorithmIdentifier=e,this.secret=t,this.reset()}update(e,t){this.hash.update(Gcu.toUint8Array(Ums(e,t)))}digest(){return Promise.resolve(this.hash.digest())}reset(){this.hash=this.secret?Fms.createHmac(this.algorithmIdentifier,Ums(this.secret)):Fms.createHash(this.algorithmIdentifier)}}function Ums(e,t){if(Vcu.Buffer.isBuffer(e))return e;if(typeof e==="string")return nTr.fromString(e,t);if(ArrayBuffer.isView(e))return nTr.fromArrayBuffer(e.buffer,e.byteOffset,e.byteLength);return nTr.fromArrayBuffer(e)}qms.Hash=$ms});
export {ame};
