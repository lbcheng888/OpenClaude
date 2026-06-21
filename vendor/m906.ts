// @ts-nocheck
import {X} from "../runtime.ts";
import {sfs} from "./m905.ts";
var mTr=X((pTr)=>{var nuu=sfs(),dTr=require("buffer"),ruu=(e,t=0,n=e.byteLength-t)=>{if(!nuu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return dTr.Buffer.from(e,t,n)},ouu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?dTr.Buffer.from(e,t):dTr.Buffer.from(e)};pTr.fromArrayBuffer=ruu;pTr.fromString=ouu});
export {mTr};
