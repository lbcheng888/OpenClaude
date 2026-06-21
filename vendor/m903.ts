// @ts-nocheck
import {X} from "../runtime.ts";
var lme=X((jms)=>{var rTr=require("fs"),Kcu=(e)=>{if(!e)return 0;if(typeof e==="string")return Buffer.byteLength(e);else if(typeof e.byteLength==="number")return e.byteLength;else if(typeof e.size==="number")return e.size;else if(typeof e.start==="number"&&typeof e.end==="number")return e.end+1-e.start;else if(e instanceof rTr.ReadStream){if(e.path!=null)return rTr.lstatSync(e.path).size;else if(typeof e.fd==="number")return rTr.fstatSync(e.fd).size}throw Error(`Body Length computation failed for ${e}`)};jms.calculateBodyLength=Kcu});
export {lme};
