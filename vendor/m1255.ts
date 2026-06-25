// @ts-nocheck
import {mNs,iHr} from "./m1254.ts";
import {b} from "../runtime.ts";
var JMu,fNs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!JMu.exec(e))throw TypeError("Invalid base64 string.");let t=mNs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var hNs=b(()=>{iHr();JMu=/^[A-Za-z0-9+/]*={0,2}$/});
export {JMu,fNs,hNs};
