// @ts-nocheck
import {Q} from "../runtime.ts";
import {xTs} from "./m905.ts";
var DTs=Q((IAr)=>{var oSu=xTs(),HAr=require("buffer"),sSu=(e,t=0,n=e.byteLength-t)=>{if(!oSu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return HAr.Buffer.from(e,t,n)},iSu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?HAr.Buffer.from(e,t):HAr.Buffer.from(e)};IAr.fromArrayBuffer=sSu;IAr.fromString=iSu});
export {DTs};
