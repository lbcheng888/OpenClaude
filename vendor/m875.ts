// @ts-nocheck
import {X} from "../runtime.ts";
import {cyr} from "./m873.ts";
import {FS} from "./m788.ts";
var Ids=X((_on)=>{Object.defineProperty(_on,"__esModule",{value:!0});_on.toBase64=void 0;var Miu=cyr(),Niu=FS(),Biu=(e)=>{let t;if(typeof e==="string")t=(0,Niu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,Miu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};_on.toBase64=Biu});
export {Ids};
