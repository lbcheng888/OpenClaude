// @ts-nocheck
import {X} from "../runtime.ts";
import {mTr} from "./m906.ts";
import {FS} from "./m788.ts";
var afs=X((Fon)=>{Object.defineProperty(Fon,"__esModule",{value:!0});Fon.toBase64=void 0;var luu=mTr(),cuu=FS(),uuu=(e)=>{let t;if(typeof e==="string")t=(0,cuu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,luu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};Fon.toBase64=uuu});
export {afs};
