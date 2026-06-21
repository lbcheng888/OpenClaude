// @ts-nocheck
import {RFs,mwr} from "./m1380.ts";
import {b,M} from "../runtime.ts";
import {FS} from "./m788.ts";
var IFs,DFs=(e)=>{let t;if(typeof e==="string")t=IFs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return RFs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var PFs=b(()=>{mwr();IFs=M(FS(),1)});
export {IFs,DFs,PFs};
