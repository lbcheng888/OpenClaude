// @ts-nocheck
import {ZDr} from "./m1577.ts";
import {HNe,Foe} from "./m1191.ts";
import {b} from "../runtime.ts";
import {F7s} from "./m1580.ts";
var Ufn=(e)=>{let t;if(typeof e==="string")t=ZDr(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return HNe(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var B7s=b(()=>{Foe();F7s()});
export {Ufn,B7s};
