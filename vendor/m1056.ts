// @ts-nocheck
import {QHs,Hvr} from "./m1055.ts";
import {b} from "../runtime.ts";
var awu,ZHs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!awu.exec(e))throw TypeError("Invalid base64 string.");let t=QHs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var eIs=b(()=>{Hvr();awu=/^[A-Za-z0-9+/]*={0,2}$/});
export {awu,ZHs,eIs};
