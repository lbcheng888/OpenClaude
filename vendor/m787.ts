// @ts-nocheck
import {X} from "../runtime.ts";
import {lis} from "./m786.ts";
var cis=X((ggr)=>{var geu=lis(),hgr=require("buffer"),_eu=(e,t=0,n=e.byteLength-t)=>{if(!geu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return hgr.Buffer.from(e,t,n)},yeu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?hgr.Buffer.from(e,t):hgr.Buffer.from(e)};ggr.fromArrayBuffer=_eu;ggr.fromString=yeu});
export {cis};
