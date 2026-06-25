// @ts-nocheck
import {gCs,cRr} from "./m958.ts";
import {b,x} from "../runtime.ts";
import {BS} from "./m793.ts";
var SCs,bCs=(e)=>{let t;if(typeof e==="string")t=SCs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return gCs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var ECs=b(()=>{cRr();SCs=x(BS(),1)});
export {SCs,bCs,ECs};
