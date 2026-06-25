// @ts-nocheck
import {dAe,Foe} from "./m1191.ts";
import {b} from "../runtime.ts";
var N4u,Bfn=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!N4u.exec(e))throw TypeError("Invalid base64 string.");let t=dAe(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var L7s=b(()=>{Foe();N4u=/^[A-Za-z0-9+/]*={0,2}$/});
export {N4u,Bfn,L7s};
