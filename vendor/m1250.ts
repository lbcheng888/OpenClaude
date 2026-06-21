// @ts-nocheck
import {yDs,ICr} from "./m1249.ts";
import {b} from "../runtime.ts";
var ORu,TDs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!ORu.exec(e))throw TypeError("Invalid base64 string.");let t=yDs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var SDs=b(()=>{ICr();ORu=/^[A-Za-z0-9+/]*={0,2}$/});
export {ORu,TDs,SDs};
