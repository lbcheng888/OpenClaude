// @ts-nocheck
import {bgs,OTr} from "./m953.ts";
import {b,M} from "../runtime.ts";
import {FS} from "./m788.ts";
var wgs,Rgs=(e)=>{let t;if(typeof e==="string")t=wgs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return bgs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var xgs=b(()=>{OTr();wgs=M(FS(),1)});
export {wgs,Rgs,xgs};
