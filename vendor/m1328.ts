// @ts-nocheck
import {O2s,hIr} from "./m1326.ts";
import {b,x} from "../runtime.ts";
import {BS} from "./m793.ts";
var F2s,B2s=(e)=>{let t;if(typeof e==="string")t=F2s.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return O2s(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var U2s=b(()=>{hIr();F2s=x(BS(),1)});
export {F2s,B2s,U2s};
