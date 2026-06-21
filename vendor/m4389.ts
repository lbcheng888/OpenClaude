// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
async function rpt(e){try{let t=qt(await nZa.readFile(e,"utf8"));if(t===null||typeof t!=="object")return;let n={};if("rvAuth"in t&&typeof t.rvAuth==="string")n.rvAuth=t.rvAuth;if("ptyAuth"in t&&typeof t.ptyAuth==="string")n.ptyAuth=t.ptyAuth;if("claimAuth"in t&&typeof t.claimAuth==="string")n.claimAuth=t.claimAuth;return n}catch{return}}
function one(e,t){if(typeof e!=="string"||!t||e.length===0)return!1;let n=Buffer.from(e),r=Buffer.from(t);if(n.length!==r.length)return!1;return tZa.timingSafeEqual(n,r)}
var tZa,nZa;
var opt=b(()=>{Xt();tZa=require("crypto"),nZa=require("fs/promises")});
export {rpt,one,tZa,nZa,opt};
