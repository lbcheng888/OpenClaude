// @ts-nocheck
import {Q} from "../runtime.ts";
var gme=Q((NTs)=>{var DAr=require("fs"),cSu=(e)=>{if(!e)return 0;if(typeof e==="string")return Buffer.byteLength(e);else if(typeof e.byteLength==="number")return e.byteLength;else if(typeof e.size==="number")return e.size;else if(typeof e.start==="number"&&typeof e.end==="number")return e.end+1-e.start;else if(e instanceof DAr.ReadStream){if(e.path!=null)return DAr.lstatSync(e.path).size;else if(typeof e.fd==="number")return DAr.fstatSync(e.fd).size}throw Error(`Body Length computation failed for ${e}`)};NTs.calculateBodyLength=cSu});
export {gme};
