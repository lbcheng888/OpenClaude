// @ts-nocheck
import {XHs,Hvr} from "./m1055.ts";
import {b,x} from "../runtime.ts";
import {BS} from "./m793.ts";
var tIs,nIs=(e)=>{let t;if(typeof e==="string")t=tIs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return XHs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var rIs=b(()=>{Hvr();tIs=x(BS(),1)});
export {tIs,nIs,rIs};
