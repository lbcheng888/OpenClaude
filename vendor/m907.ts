// @ts-nocheck
import {Q} from "../runtime.ts";
import {DTs} from "./m906.ts";
import {BS} from "./m793.ts";
var hme=Q((MTs)=>{var xAr=DTs(),aSu=BS(),lSu=require("buffer"),PTs=require("crypto");class LTs{algorithmIdentifier;secret;hash;constructor(e,t){this.algorithmIdentifier=e,this.secret=t,this.reset()}update(e,t){this.hash.update(aSu.toUint8Array(OTs(e,t)))}digest(){return Promise.resolve(this.hash.digest())}reset(){this.hash=this.secret?PTs.createHmac(this.algorithmIdentifier,OTs(this.secret)):PTs.createHash(this.algorithmIdentifier)}}function OTs(e,t){if(lSu.Buffer.isBuffer(e))return e;if(typeof e==="string")return xAr.fromString(e,t);if(ArrayBuffer.isView(e))return xAr.fromArrayBuffer(e.buffer,e.byteOffset,e.byteLength);return xAr.fromArrayBuffer(e)}MTs.Hash=LTs});
export {hme};
