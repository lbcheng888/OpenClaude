// @ts-nocheck
import {b} from "../runtime.ts";
async function wN(e,t){try{let n=await XBn.lstat(e);if(!n.isFile()||n.size>t)return null;return await XBn.readFile(e,"utf8")}catch{return null}}
var XBn;
var $He=b(()=>{XBn=require("fs/promises")});
export {wN,XBn,$He};
