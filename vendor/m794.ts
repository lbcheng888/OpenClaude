// @ts-nocheck
import {Q} from "../runtime.ts";
import {qsn} from "./m789.ts";
import {BS} from "./m793.ts";
var ips=Q((Vsn)=>{Object.defineProperty(Vsn,"__esModule",{value:!0});Vsn.toBase64=void 0;var Fuu=qsn(),Buu=BS(),Uuu=(e)=>{let t;if(typeof e==="string")t=(0,Buu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,Fuu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};Vsn.toBase64=Uuu});
export {ips};
