// @ts-nocheck
import {C4s,qIr} from "./m1385.ts";
import {b} from "../runtime.ts";
var A2u,A4s=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!A2u.exec(e))throw TypeError("Invalid base64 string.");let t=C4s(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var R4s=b(()=>{qIr();A2u=/^[A-Za-z0-9+/]*={0,2}$/});
export {A2u,A4s,R4s};
