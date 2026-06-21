// @ts-nocheck
import {Ekr} from "./m1572.ts";
import {M1e,Uoe} from "./m1186.ts";
import {b} from "../runtime.ts";
import {jjs} from "./m1575.ts";
var opn=(e)=>{let t;if(typeof e==="string")t=Ekr(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return M1e(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var Wjs=b(()=>{Uoe();jjs()});
export {opn,Wjs};
