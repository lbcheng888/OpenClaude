// @ts-nocheck
import {pNs,iHr} from "./m1254.ts";
import {b,x} from "../runtime.ts";
import {BS} from "./m793.ts";
var gNs,_Ns=(e)=>{let t;if(typeof e==="string")t=gNs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return pNs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var yNs=b(()=>{iHr();gNs=x(BS(),1)});
export {gNs,_Ns,yNs};
