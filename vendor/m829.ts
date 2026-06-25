// @ts-nocheck
import {Q} from "../runtime.ts";
import {tfs} from "./m828.ts";
var wEr=Q((vEr)=>{var _mu=tfs(),REr=require("buffer"),ymu=(e,t=0,n=e.byteLength-t)=>{if(!_mu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return REr.Buffer.from(e,t,n)},Tmu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?REr.Buffer.from(e,t):REr.Buffer.from(e)};vEr.fromArrayBuffer=ymu;vEr.fromString=Tmu});
export {wEr};
