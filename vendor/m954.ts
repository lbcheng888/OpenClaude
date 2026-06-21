// @ts-nocheck
import {Egs,OTr} from "./m953.ts";
import {b} from "../runtime.ts";
var xpu,Cgs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!xpu.exec(e))throw TypeError("Invalid base64 string.");let t=Egs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var vgs=b(()=>{OTr();xpu=/^[A-Za-z0-9+/]*={0,2}$/});
export {xpu,Cgs,vgs};
