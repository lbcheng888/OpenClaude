// @ts-nocheck
import {_Cs,cRr} from "./m958.ts";
import {b} from "../runtime.ts";
var GEu,yCs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!GEu.exec(e))throw TypeError("Invalid base64 string.");let t=_Cs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var TCs=b(()=>{cRr();GEu=/^[A-Za-z0-9+/]*={0,2}$/});
export {GEu,yCs,TCs};
