// @ts-nocheck
import {X} from "../runtime.ts";
import {sis} from "./m783.ts";
var srn=X((Agr)=>{var ueu=sis(),fgr=require("buffer"),deu=(e,t=0,n=e.byteLength-t)=>{if(!ueu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return fgr.Buffer.from(e,t,n)},peu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?fgr.Buffer.from(e,t):fgr.Buffer.from(e)};Agr.fromArrayBuffer=deu;Agr.fromString=peu});
export {srn};
