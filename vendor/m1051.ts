// @ts-nocheck
import {oCs,ebr} from "./m1050.ts";
import {b} from "../runtime.ts";
var Ghu,sCs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!Ghu.exec(e))throw TypeError("Invalid base64 string.");let t=oCs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var iCs=b(()=>{ebr();Ghu=/^[A-Za-z0-9+/]*={0,2}$/});
export {Ghu,sCs,iCs};
