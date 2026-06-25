// @ts-nocheck
import {L2s,hIr} from "./m1326.ts";
import {b} from "../runtime.ts";
var mUu,M2s=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!mUu.exec(e))throw TypeError("Invalid base64 string.");let t=L2s(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var N2s=b(()=>{hIr();mUu=/^[A-Za-z0-9+/]*={0,2}$/});
export {mUu,M2s,N2s};
