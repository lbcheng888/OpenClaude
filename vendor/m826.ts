// @ts-nocheck
import {X} from "../runtime.ts";
import {Qgr} from "./m824.ts";
import {FS} from "./m788.ts";
var cls=X((Nrn)=>{Object.defineProperty(Nrn,"__esModule",{value:!0});Nrn.toBase64=void 0;var aru=Qgr(),lru=FS(),cru=(e)=>{let t;if(typeof e==="string")t=(0,lru.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,aru.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};Nrn.toBase64=cru});
export {cls};
