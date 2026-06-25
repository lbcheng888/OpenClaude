// @ts-nocheck
import {E4s,qIr} from "./m1385.ts";
import {b,x} from "../runtime.ts";
import {BS} from "./m793.ts";
var v4s,w4s=(e)=>{let t;if(typeof e==="string")t=v4s.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return E4s(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var k4s=b(()=>{qIr();v4s=x(BS(),1)});
export {v4s,w4s,k4s};
