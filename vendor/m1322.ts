// @ts-nocheck
import {UMs,Uvr} from "./m1321.ts";
import {b} from "../runtime.ts";
var JIu,$Ms=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!JIu.exec(e))throw TypeError("Invalid base64 string.");let t=UMs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var qMs=b(()=>{Uvr();JIu=/^[A-Za-z0-9+/]*={0,2}$/});
export {JIu,$Ms,qMs};
