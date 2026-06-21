// @ts-nocheck
import {xFs,mwr} from "./m1380.ts";
import {b} from "../runtime.ts";
var aDu,kFs=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!aDu.exec(e))throw TypeError("Invalid base64 string.");let t=xFs(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var HFs=b(()=>{mwr();aDu=/^[A-Za-z0-9+/]*={0,2}$/});
export {aDu,kFs,HFs};
