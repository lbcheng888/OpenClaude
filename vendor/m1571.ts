// @ts-nocheck
import {kEe,Uoe} from "./m1186.ts";
import {b} from "../runtime.ts";
var _Mu,rpn=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!_Mu.exec(e))throw TypeError("Invalid base64 string.");let t=kEe(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};
var Ujs=b(()=>{Uoe();_Mu=/^[A-Za-z0-9+/]*={0,2}$/});
export {_Mu,rpn,Ujs};
