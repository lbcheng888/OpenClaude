// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
async function rft(e){try{let t=qt(await Bsl.readFile(e,"utf8"));if(t===null||typeof t!=="object")return;let n={};if("rvAuth"in t&&typeof t.rvAuth==="string")n.rvAuth=t.rvAuth;if("ptyAuth"in t&&typeof t.ptyAuth==="string")n.ptyAuth=t.ptyAuth;if("claimAuth"in t&&typeof t.claimAuth==="string")n.claimAuth=t.claimAuth;return n}catch{return}}
function Jte(e,t){if(typeof e!=="string"||!t||e.length===0)return!1;let n=Buffer.from(e),r=Buffer.from(t);if(n.length!==r.length)return!1;return Fsl.timingSafeEqual(n,r)}
var Fsl,Bsl;
var oft=b(()=>{tn();Fsl=require("crypto"),Bsl=require("fs/promises")});
export {rft,Jte,Fsl,Bsl,oft};
