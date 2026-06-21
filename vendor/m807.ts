// @ts-nocheck
import {X} from "../runtime.ts";
import {vgr} from "./m805.ts";
import {FS} from "./m788.ts";
var Fis=X((_rn)=>{Object.defineProperty(_rn,"__esModule",{value:!0});_rn.toBase64=void 0;var ptu=vgr(),mtu=FS(),ftu=(e)=>{let t;if(typeof e==="string")t=(0,mtu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,ptu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};_rn.toBase64=ftu});
export {Fis};
